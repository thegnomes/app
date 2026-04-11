import { useEffect, useRef, type MutableRefObject } from 'react';
import * as THREE from 'three';
import type { AppState, ParticleConfig, ParticleAttributes } from '@/types';
import type { SceneRefs, AnimationData } from './useParticleScene';
import {
  STATE4_CONCENTRATE,
  STATE2_ABSORPTION_DURATION,
  STATE2_STABILIZE_DURATION,
  STATE2_DURATION,
  TARGET_FRAME_MS,
  MAX_FRAME_DELTA_MS,
  TOTAL_MAIN,
  TRAIL_LENGTH,
  CORE_COLOR_LERP,
  AMBIENT_COLOR_LERP,
  CAMERA_MOVE_AMPLITUDE,
  CAMERA_MOVE_FREQUENCY,
  CAMERA_Z,
  FLASH_SCALE_FACTOR,
  FLASH_OPACITY_DECAY,
  STATE_PRIMARY_COLORS,
  STATE_SECONDARY_COLORS,
  PLANETS,
  ORBIT_SEGMENTS,
  GLOW_RADIUS,
  GLOW_OPACITY,
  SHELL_RADIUS,
  PARTICLE_SIZE_MULTIPLIER,
  CORE_VIDEO_TRANSITION_DURATION,
  CORE_VIDEO_GLOW_BOOST,
  CORE_VIDEO_PROCEDURAL_FADE,
} from '@/lib/particles/constants';
import { createOrbitGeometryFromAngle } from '@/lib/particles/geometry';
import {
  animateState0,
  animateState1,
  animateState2And3,
  animatePlanets,
  animateState4,
  updateTrail,
  initializeBurstVelocities,
} from '@/lib/particles/animationStates';
import { createFlashMesh, createNovaMesh } from '@/lib/particles/scene';

const scaleFrameLerp = (factor: number, frameScale: number) => 1 - Math.pow(1 - factor, frameScale);
const smoothstep01 = (value: number) => {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
};

interface CameraPanRef {
  isDragging: boolean;
  offset: { x: number; y: number };
  targetOffset: { x: number; y: number };
}

interface UseParticleAnimationProps {
  state: AppState;
  config: ParticleConfig;
  refs: SceneRefs;
  data: AnimationData;
  cameraPanRef: MutableRefObject<CameraPanRef>;
}

/**
 * Hook to manage particle animation loop
 */
export function useParticleAnimation({ state, config, refs, data, cameraPanRef }: UseParticleAnimationProps) {
  const stateRef = useRef(state);
  const speedRef = useRef(config.speed);
  const lastFrameTimeRef = useRef<number | null>(null);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    speedRef.current = config.speed;
  }, [config.speed]);

  // Main animation loop
  useEffect(() => {
    if (!refs.scene.current || !refs.camera.current || !refs.renderer.current) return;

    // Mouse move listener for camera drift
    const handleMouseMove = (e: MouseEvent) => {
      data.mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      data.mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // State change handler (defined inside effect to avoid linter immutability warnings)
    const handleStateChange = (transitionTime: number) => {
      const { scene, particles, trail, flashMesh, planets, orbitGroup } = refs;
      const { lastState, stateStart, snapshotPositions, particleData } = data;

      if (!particles.current || !particleData.current) return;

      const nextState = stateRef.current;

      lastState.current = nextState;
      stateStart.current = transitionTime;

      // Capture position snapshot
      const pos = particles.current.geometry.attributes.position.array as Float32Array;
      snapshotPositions.current.set(pos);

      // State 4: Initialize burst velocities and trail history
      if (nextState === 4 && particleData.current) {
        initializeBurstVelocities(particleData.current.burstVelocity);

        if (trail.current) {
          const hist = data.trailHistory.current;
          for (let i = 0; i < TOTAL_MAIN; i++) {
            const mIdx = particleData.current.migratorIndexMap[i];
            if (mIdx >= 0) {
              const i3 = i * 3;
              for (let h = 0; h < TRAIL_LENGTH; h++) {
                hist[mIdx * TRAIL_LENGTH * 3 + h * 3] = snapshotPositions.current[i3];
                hist[mIdx * TRAIL_LENGTH * 3 + h * 3 + 1] = snapshotPositions.current[i3 + 1];
                hist[mIdx * TRAIL_LENGTH * 3 + h * 3 + 2] = snapshotPositions.current[i3 + 2];
              }
            }
          }
        }
      }

      // State 3: Reset planet first-orbit tracking and orbit geometries
      if (nextState === 3) {
        planets.current?.forEach((p) => {
          p.hasCompletedFirstOrbit = false;
          p.angleTraveled = 0;
          p.startAngle = p.angle;
        });

        if (orbitGroup.current) {
          orbitGroup.current.children.forEach((child) => {
            const idx = child.userData.idx;
            if (typeof idx === 'number') {
              const planetConfig = PLANETS[idx];
              const p = planets.current![idx];
              const newGeo = createOrbitGeometryFromAngle(planetConfig.radius, ORBIT_SEGMENTS, p.startAngle);
              newGeo.setDrawRange(0, 0); // Start invisible
              if (child.type === 'Line') {
                (child as THREE.Line).geometry.dispose();
                (child as THREE.Line).geometry = newGeo;
              }
            }
          });
        }
      }

      // State 1: Create flash effect
      if (nextState === 1 && !flashMesh.current && scene.current) {
        flashMesh.current = createFlashMesh(scene.current, new THREE.Color('#ffffff'), 0.6, 0.05);
      }

      // Trigger nova effect on state changes except State 1 (starfield)
      if (refs.systemGroup.current && nextState !== 1) {
        // Clean up any existing novas first (including their containers)
        if (refs.novaMeshes.current.length > 0) {
          refs.novaMeshes.current.forEach((nova) => {
            const container = (nova as THREE.Mesh & { container?: THREE.Group }).container;
            nova.geometry.dispose();
            (nova.material as THREE.Material).dispose();
            if (container) {
              refs.systemGroup.current?.remove(container);
            } else {
              refs.systemGroup.current?.remove(nova);
            }
          });
          refs.novaMeshes.current = [];
        }
        
        // Create 4 new nova rings at 0, 45, 90, 135 degree rotations
        const novaColor = STATE_PRIMARY_COLORS[nextState].clone();
        for (let i = 0; i < 4; i++) {
          // Pass rotation to createNovaMesh
          const rotationZ = (i * Math.PI) / 4;
          const nova = createNovaMesh(refs.systemGroup.current, novaColor, 0.5, rotationZ);
          refs.novaMeshes.current.push(nova);
        }
        refs.novaState.current = { active: true, startTime: transitionTime };
      }
    };

    lastFrameTimeRef.current = null;

    const animate = (frameTime: number = performance.now()) => {
      data.animationId.current = requestAnimationFrame(animate);

      const now = frameTime;
      const rawDeltaMs =
        lastFrameTimeRef.current === null ? TARGET_FRAME_MS : now - lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;
      const deltaMs = Math.min(MAX_FRAME_DELTA_MS, Math.max(0, rawDeltaMs));
      const deltaSeconds = deltaMs / 1000;
      const frameScale = deltaMs / TARGET_FRAME_MS;
      const coreColorLerp = scaleFrameLerp(CORE_COLOR_LERP, frameScale);
      const ambientColorLerp = scaleFrameLerp(AMBIENT_COLOR_LERP, frameScale);
      let stateElapsed = now - data.stateStart.current;
      const currentState = stateRef.current;
      const speed = speedRef.current;

      // Update time
      data.time.current += deltaSeconds * speed;

      // Update shader uniforms
      if (refs.particles.current) {
        (refs.particles.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
          data.time.current;
      }

      if (refs.coreGroup.current && refs.coreGroup.current.children.length >= 2) {
        const mesh = refs.coreGroup.current.children[0] as THREE.Mesh;
        const glow = refs.coreGroup.current.children[1] as THREE.Mesh;
        const videoMesh = refs.coreVideoMesh.current;
        if (mesh && (mesh.material as THREE.ShaderMaterial).uniforms?.uTime) {
          (mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = data.time.current;
        }
        if (glow && (glow.material as THREE.ShaderMaterial).uniforms?.uTime) {
          (glow.material as THREE.ShaderMaterial).uniforms.uTime.value = data.time.current;
        }
        if (videoMesh && (videoMesh.material as THREE.ShaderMaterial).uniforms?.uTime) {
          (videoMesh.material as THREE.ShaderMaterial).uniforms.uTime.value = data.time.current;
        }
      }

      if (refs.solarVideoShell.current) {
        const material = refs.solarVideoShell.current.material as THREE.ShaderMaterial;
        if (material.uniforms?.uTime) {
          material.uniforms.uTime.value = data.time.current;
        }
      }

      // Update planet glow shader uniforms
      refs.planets.current?.forEach((p) => {
        const glowMesh = p.group.children[1] as THREE.Mesh;
        if (glowMesh && (glowMesh.material as THREE.ShaderMaterial).uniforms.uTime) {
          (glowMesh.material as THREE.ShaderMaterial).uniforms.uTime.value = data.time.current;
        }
      });

      // Update flash mesh
      if (refs.flashMesh.current && refs.scene.current) {
        const mesh = refs.flashMesh.current;
        mesh.scale.multiplyScalar(Math.pow(FLASH_SCALE_FACTOR, frameScale));
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity -= FLASH_OPACITY_DECAY * frameScale;

        if (mat.opacity <= 0) {
          refs.scene.current.remove(mesh);
          mesh.geometry.dispose();
          mat.dispose();
          refs.flashMesh.current = null;
        }
      }

      // Handle state transitions
      if (currentState !== data.lastState.current) {
        handleStateChange(now);
        stateElapsed = now - data.stateStart.current;
      }

      // Get attribute arrays
      const posAttr = refs.particles.current!.geometry.attributes.position;
      const colAttr = refs.particles.current!.geometry.attributes.color;
      const sizeAttr = refs.particles.current!.geometry.attributes.size;
      const alphaAttr = refs.particles.current!.geometry.attributes.alpha;
      const positions = posAttr.array as Float32Array;
      const colors = colAttr.array as Float32Array;
      const sizes = sizeAttr.array as Float32Array;
      const alphas = alphaAttr.array as Float32Array;

      const attributes: ParticleAttributes = {
        positions,
        colors,
        sizes,
        alphas,
        random: refs.particles.current!.geometry.attributes.random.array as Float32Array,
        migrator: refs.particles.current!.geometry.attributes.migrator.array as Float32Array,
      };

      const particleData = data.particleData.current!;

      // Determine target colors for current state
      const targetPrimaryColor = STATE_PRIMARY_COLORS[currentState];
      const targetSecondaryColor = STATE_SECONDARY_COLORS[currentState];
      const state3VideoMix =
        currentState === 3
          ? 0.08 + smoothstep01(stateElapsed / CORE_VIDEO_TRANSITION_DURATION) * 0.92
          : 0;
      data.coreVideoMix.current = state3VideoMix;
      data.coreGlowBoost.current = 1 + state3VideoMix * (CORE_VIDEO_GLOW_BOOST - 1);

      // Animate based on state
      switch (currentState) {
        case 0:
          animateState0(
            attributes,
            particleData,
            data.time.current,
            data.currentCoreColor.current
          );
          if (refs.coreGroup.current) refs.coreGroup.current.visible = false;
          if (refs.orbitGroup.current) refs.orbitGroup.current.visible = false;
          refs.planets.current?.forEach((p) => (p.group.visible = false));
          if (refs.trail.current) refs.trail.current.visible = false;
          break;

        case 1:
          animateState1(
            attributes,
            particleData,
            stateElapsed,
            data.snapshotPositions.current,
            data.time.current,
            data.currentCoreColor.current,
            data.currentPrimaryColor.current,
            data.currentSecondaryColor.current
          );
          // Show core group in State 1 for the central particle glow
          if (refs.coreGroup.current) {
            refs.coreGroup.current.visible = true;
            refs.coreGroup.current.scale.set(1, 1, 1);
            refs.coreGroup.current.children[1]?.scale.set(1, 1, 1);
          }
          if (refs.orbitGroup.current) refs.orbitGroup.current.visible = false;
          refs.planets.current?.forEach((p) => (p.group.visible = false));
          if (refs.trail.current) refs.trail.current.visible = false;
          break;

        case 2:
        case 3:
          // Faster shell rotation for visible spinning effect
          data.shellAngle.current += 0.012 * speed * frameScale;
          animateState2And3(
            attributes,
            particleData,
            currentState,
            stateElapsed,
            data.snapshotPositions.current,
            data.time.current,
            speed,
            data.shellAngle.current,
            data.currentCoreColor.current,
            data.currentPrimaryColor.current,
            data.currentSecondaryColor.current
          );

          if (refs.coreGroup.current) {
            refs.coreGroup.current.visible = true;
            const [, glow] = refs.coreGroup.current.children;
            refs.coreGroup.current.scale.set(1, 1, 1);
            const substate3Start = STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION;
            const isState2Substate3 =
              currentState === 2 &&
              stateElapsed >= substate3Start;
            const substate3T = isState2Substate3
              ? Math.min(1, (stateElapsed - substate3Start) / (STATE2_DURATION - substate3Start))
              : 0;
            const easedSubstate3T = substate3T * substate3T * (3 - 2 * substate3T);
            const state3Continuity = currentState === 3 ? 1 : 0;
            const glowEntrance = Math.max(state3Continuity, easedSubstate3T);
            const spreadScale = 1 + ((SHELL_RADIUS / GLOW_RADIUS) * 1.08 - 1) * glowEntrance;
            glow?.scale.set(spreadScale, spreadScale, spreadScale);
          }
          if (refs.orbitGroup.current)
            refs.orbitGroup.current.visible = currentState === 3;
          refs.planets.current?.forEach((p) => (p.group.visible = false));
          if (refs.trail.current) refs.trail.current.visible = false;

          // State 3: Animate planets
          if (currentState === 3) {
            const proceduralCoreMix = 1 - state3VideoMix;
            sizes[0] = (18 + Math.sin(data.time.current * 2.1) * 2) * proceduralCoreMix;
            alphas[0] = 0.34 * proceduralCoreMix;
            colors[0] = targetPrimaryColor.r * (1.15 + state3VideoMix * 0.25);
            colors[1] = targetPrimaryColor.g * (1.08 + state3VideoMix * 0.12);
            colors[2] = targetPrimaryColor.b * (1 + state3VideoMix * 0.08);

            if (refs.coreGroup.current) {
              const cg = refs.coreGroup.current;
              const scale = 1 + Math.min(stateElapsed / 1000, 0.5);
              const spreadScale = ((SHELL_RADIUS / GLOW_RADIUS) * 1.08) / scale;
              cg.scale.set(scale, scale, scale);
              cg.children[1]?.scale.set(spreadScale, spreadScale, spreadScale);
            }

            if (refs.planets.current) {
              animatePlanets(refs.planets.current, refs.orbitGroup.current, stateElapsed, speed, frameScale);
            }

            const coronaMix = state3VideoMix * 0.22;
            for (let i = 1; i < TOTAL_MAIN; i++) {
              if (!particleData.shellParticle[i]) continue;

              const i3 = i * 3;
              colors[i3] += (targetPrimaryColor.r * 1.2 - colors[i3]) * coronaMix;
              colors[i3 + 1] += (targetPrimaryColor.g * 1.12 - colors[i3 + 1]) * coronaMix;
              colors[i3 + 2] += (targetSecondaryColor.b * 0.45 - colors[i3 + 2]) * coronaMix;
              sizes[i] *= 1 + state3VideoMix * 0.08;
            }
          }
          break;

        case 4: {
          if (refs.coreGroup.current) refs.coreGroup.current.visible = false;
          if (refs.orbitGroup.current) refs.orbitGroup.current.visible = false;
          refs.planets.current?.forEach((p) => (p.group.visible = false));
          if (refs.trail.current) refs.trail.current.visible = true;

          animateState4(
            attributes,
            particleData,
            stateElapsed,
            data.snapshotPositions.current,
            particleData.burstVelocity,
            data.time.current,
            frameScale,
            data.currentPrimaryColor.current,
            data.currentSecondaryColor.current
          );

          // State 4 burst flash
          const burstElapsed = stateElapsed - STATE4_CONCENTRATE;
          if (!refs.flashMesh.current && burstElapsed < 200 && refs.scene.current) {
            refs.flashMesh.current = createFlashMesh(
              refs.scene.current,
              data.currentPrimaryColor.current,
              0.95,
              4
            );
          }

          // Update trail
          if (refs.trail.current) {
            updateTrail(
              refs.trail.current,
              positions,
              particleData.migratorIndexMap,
              data.trailHistory.current,
              stateElapsed,
              data.currentPrimaryColor.current
            );
          }
          break;
        }
      }

      // Lerp core color towards primary state color
      const state2CoreGlowActive =
        currentState === 2 &&
        stateElapsed >= STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION;
      if (!state2CoreGlowActive) {
        data.currentCoreColor.current.lerp(targetPrimaryColor, coreColorLerp);
      }

      // Lerp primary and secondary ambient colors
      data.currentPrimaryColor.current.lerp(targetPrimaryColor, ambientColorLerp);
      data.currentSecondaryColor.current.lerp(targetSecondaryColor, ambientColorLerp);

      // Update core group colors
      if (refs.coreGroup.current) {
        const cg = refs.coreGroup.current;
        const mesh = cg.children[0] as THREE.Mesh;
        const glow = cg.children[1] as THREE.Mesh;
        const videoMesh = refs.coreVideoMesh.current;
        const meshUniforms = (mesh.material as THREE.ShaderMaterial).uniforms;
        const glowUniforms = (glow.material as THREE.ShaderMaterial).uniforms;
        meshUniforms.uColor.value.copy(data.currentCoreColor.current);
        if (meshUniforms.uOpacity) {
          meshUniforms.uOpacity.value = 1 - data.coreVideoMix.current * CORE_VIDEO_PROCEDURAL_FADE;
        }
        glowUniforms.uColor.value.copy(data.currentCoreColor.current);
        glowUniforms.uOpacity.value = GLOW_OPACITY * (1 + data.coreVideoMix.current * 0.4);
        if (glowUniforms.uGlowBoost) {
          glowUniforms.uGlowBoost.value = data.coreGlowBoost.current;
        }
        if (videoMesh) {
          const videoUniforms = (videoMesh.material as THREE.ShaderMaterial).uniforms;
          const shouldShowVideo = data.coreVideoMix.current > 0.001;
          videoMesh.visible = shouldShowVideo;
          videoUniforms.uMix.value = data.coreVideoMix.current;
          videoUniforms.uGlowBoost.value = data.coreGlowBoost.current;
          if (refs.coreVideo.current) {
            if (shouldShowVideo && refs.coreVideo.current.paused) {
              void refs.coreVideo.current.play();
            } else if (!shouldShowVideo && !refs.coreVideo.current.paused) {
              refs.coreVideo.current.pause();
            }
          }
        }
      }

      if (refs.solarVideoShell.current) {
        const solarVideoShell = refs.solarVideoShell.current;
        const shellUniforms = (solarVideoShell.material as THREE.ShaderMaterial).uniforms;
        const shouldShowSolarShell = currentState === 3 && data.coreVideoMix.current > 0.001;
        solarVideoShell.visible = shouldShowSolarShell;
        solarVideoShell.rotation.y += 0.0012 * speed * frameScale;
        shellUniforms.uMix.value = shouldShowSolarShell ? data.coreVideoMix.current : 0;

        if (refs.solarVideoShellVideo.current) {
          if (shouldShowSolarShell && refs.solarVideoShellVideo.current.paused) {
            void refs.solarVideoShellVideo.current.play();
          } else if (!shouldShowSolarShell && !refs.solarVideoShellVideo.current.paused) {
            refs.solarVideoShellVideo.current.pause();
          }
        }
      }

      // Update sun light color
      if (refs.sunLight.current) {
        refs.sunLight.current.color.copy(data.currentCoreColor.current);
      }

      for (let i = 0; i < TOTAL_MAIN; i++) {
        sizes[i] *= PARTICLE_SIZE_MULTIPLIER;
      }

      // Mark attributes as needing update
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      sizeAttr.needsUpdate = true;
      alphaAttr.needsUpdate = true;

      // System group rotation
      if (refs.systemGroup.current) {
        refs.systemGroup.current.rotation.y += 0.0005 * speed * frameScale;
        refs.systemGroup.current.rotation.x = Math.sin(data.time.current * 0.1) * 0.02;
      }

      // Animate nova effect (multiple rings)
      if (refs.novaMeshes.current.length > 0 && refs.novaState.current.active) {
        const novaElapsed = performance.now() - refs.novaState.current.startTime;
        const novaDuration = 1800; // Longer for softer effect
        const progress = Math.min(novaElapsed / novaDuration, 1);

        // Expand and fade
        const startScale = 0.5;
        const maxScale = 120; // Smaller for softer look
        const scale = startScale + progress * maxScale;

        // Softer fade - start fading earlier
        // Material starts at 0.35 opacity, we modulate it down from there
        const fadeProgress = Math.max(0, (progress - 0.15) / 0.85);
        const opacity = 0.35 * (1 - fadeProgress * fadeProgress); // Quadratic fade for softness

        refs.novaMeshes.current.forEach((nova) => {
          nova.scale.set(scale, scale, scale);
          (nova.material as THREE.MeshBasicMaterial).opacity = Math.max(0, opacity);
        });

        if (progress >= 1) {
          // Remove all novas when done (including their containers)
          refs.novaMeshes.current.forEach((nova) => {
            const container = (nova as THREE.Mesh & { container?: THREE.Group }).container;
            nova.geometry.dispose();
            (nova.material as THREE.Material).dispose();
            if (container) {
              refs.systemGroup.current?.remove(container);
            } else {
              refs.systemGroup.current?.remove(nova);
            }
          });
          refs.novaMeshes.current = [];
          refs.novaState.current.active = false;
        }
      }

      // Camera movement with mouse drift and pan
      if (refs.camera.current) {
        const targetX = data.mousePosition.current.x * 8;
        const targetY = data.mousePosition.current.y * 8;
        const driftLerp = scaleFrameLerp(0.05, frameScale);
        data.cameraDrift.current.x += (targetX - data.cameraDrift.current.x) * driftLerp;
        data.cameraDrift.current.y += (targetY - data.cameraDrift.current.y) * driftLerp;

        // Get pan offset from cameraPanRef with smooth interpolation
        const panOffset = cameraPanRef.current?.targetOffset || { x: 0, y: 0 };
        const currentPanX = refs.camera.current.userData.panX || 0;
        const currentPanY = refs.camera.current.userData.panY || 0;
        const panLerp = scaleFrameLerp(0.1, frameScale);
        const smoothPanX = currentPanX + (panOffset.x - currentPanX) * panLerp;
        const smoothPanY = currentPanY + (panOffset.y - currentPanY) * panLerp;
        refs.camera.current.userData.panX = smoothPanX;
        refs.camera.current.userData.panY = smoothPanY;

        // Camera Z position - no zoom needed since video handles State 0
        // Just use standard position for all states
        const targetZ = CAMERA_Z;
        
        // Smooth camera Z transition
        refs.camera.current.position.z += (targetZ - refs.camera.current.position.z) * scaleFrameLerp(0.03, frameScale);

        refs.camera.current.position.x =
          Math.sin(data.time.current * CAMERA_MOVE_FREQUENCY) * CAMERA_MOVE_AMPLITUDE +
          data.cameraDrift.current.x +
          smoothPanX;
        refs.camera.current.position.y =
          Math.cos(data.time.current * CAMERA_MOVE_FREQUENCY) * CAMERA_MOVE_AMPLITUDE +
          data.cameraDrift.current.y +
          smoothPanY;
        refs.camera.current.lookAt(0, 0, 0);
      }

      // Render
      refs.renderer.current!.render(refs.scene.current!, refs.camera.current!);
    };

    animate();

    return () => {
      cancelAnimationFrame(data.animationId.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [refs, data, cameraPanRef]);
}
