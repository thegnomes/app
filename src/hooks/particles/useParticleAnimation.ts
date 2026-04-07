import { useEffect, type MutableRefObject } from 'react';
import * as THREE from 'three';
import type { AppState, ParticleConfig, ParticleAttributes } from '@/types';
import type { SceneRefs, AnimationData } from './useParticleScene';
import {
  STATE4_CONCENTRATE,
  STATE1_DURATION,
  TIME_STEP,
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
    const handleStateChange = () => {
      const { scene, particles, trail, flashMesh, planets, orbitGroup } = refs;
      const { lastState, stateStart, snapshotPositions, particleData } = data;

      if (!particles.current || !particleData.current) return;

      lastState.current = state;
      stateStart.current = performance.now();

      // Capture position snapshot
      const pos = particles.current.geometry.attributes.position.array as Float32Array;
      snapshotPositions.current.set(pos);

      // State 4: Initialize burst velocities and trail history
      if (state === 4 && particleData.current) {
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
      if (state === 3) {
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
      if (state === 1 && !flashMesh.current && scene.current) {
        flashMesh.current = createFlashMesh(scene.current, new THREE.Color('#ffffff'), 0.6, 0.05);
      }

      // Trigger nova effect on every state change - create 4 rings at 45 degree angles
      if (refs.systemGroup.current) {
        // Clean up any existing novas first
        if (refs.novaMeshes.current.length > 0) {
          refs.novaMeshes.current.forEach((nova) => {
            nova.geometry.dispose();
            (nova.material as THREE.Material).dispose();
            refs.systemGroup.current?.remove(nova);
          });
          refs.novaMeshes.current = [];
        }
        
        // Create 4 new nova rings at 0, 45, 90, 135 degree rotations
        const novaColor = STATE_PRIMARY_COLORS[state].clone();
        for (let i = 0; i < 4; i++) {
          const nova = createNovaMesh(refs.systemGroup.current, novaColor, 0.5);
          // Rotate each nova ring by i * 45 degrees around Z axis
          nova.rotation.z = (i * Math.PI) / 4;
          refs.novaMeshes.current.push(nova);
        }
        refs.novaState.current = { active: true, startTime: performance.now() };
      }
    };

    const animate = () => {
      data.animationId.current = requestAnimationFrame(animate);

      const now = performance.now();
      const stateElapsed = now - data.stateStart.current;
      const currentState = state;

      // Update time
      data.time.current += TIME_STEP * config.speed;

      // Update shader uniforms
      if (refs.particles.current) {
        (refs.particles.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
          data.time.current;
      }

      if (refs.coreGroup.current) {
        const mesh = refs.coreGroup.current.children[0] as THREE.Mesh;
        const glow = refs.coreGroup.current.children[1] as THREE.Mesh;
        (mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = data.time.current;
        (glow.material as THREE.ShaderMaterial).uniforms.uTime.value = data.time.current;
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
        mesh.scale.multiplyScalar(FLASH_SCALE_FACTOR);
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity -= FLASH_OPACITY_DECAY;

        if (mat.opacity <= 0) {
          refs.scene.current.remove(mesh);
          mesh.geometry.dispose();
          mat.dispose();
          refs.flashMesh.current = null;
        }
      }

      // Handle state transitions
      if (currentState !== data.lastState.current) {
        handleStateChange();
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
          if (refs.neuralConnections.current) refs.neuralConnections.current.visible = true;
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
          if (refs.coreGroup.current) refs.coreGroup.current.visible = true;
          if (refs.orbitGroup.current) refs.orbitGroup.current.visible = false;
          refs.planets.current?.forEach((p) => (p.group.visible = false));
          if (refs.trail.current) refs.trail.current.visible = false;
          if (refs.neuralConnections.current) refs.neuralConnections.current.visible = false;
          break;

        case 2:
        case 3:
          data.shellAngle.current += 0.003 * config.speed;
          animateState2And3(
            attributes,
            particleData,
            currentState,
            stateElapsed,
            data.snapshotPositions.current,
            data.time.current,
            config.speed,
            data.shellAngle.current,
            data.currentPrimaryColor.current,
            data.currentSecondaryColor.current
          );

          if (refs.coreGroup.current) refs.coreGroup.current.visible = true;
          if (refs.orbitGroup.current)
            refs.orbitGroup.current.visible = currentState === 3;
          refs.planets.current?.forEach((p) => (p.group.visible = false));
          if (refs.trail.current) refs.trail.current.visible = false;
          if (refs.neuralConnections.current) refs.neuralConnections.current.visible = false;

          // State 3: Animate planets
          if (currentState === 3) {
            sizes[0] = 0;
            alphas[0] = 0;

            if (refs.coreGroup.current) {
              const cg = refs.coreGroup.current;
              const scale = 1 + Math.min(stateElapsed / 1000, 0.5);
              cg.scale.set(scale, scale, scale);
            }

            if (refs.planets.current) {
              animatePlanets(refs.planets.current, refs.orbitGroup.current, stateElapsed, config.speed);
            }
          }
          break;

        case 4: {
          if (refs.coreGroup.current) refs.coreGroup.current.visible = false;
          if (refs.orbitGroup.current) refs.orbitGroup.current.visible = false;
          refs.planets.current?.forEach((p) => (p.group.visible = false));
          if (refs.trail.current) refs.trail.current.visible = true;
          if (refs.neuralConnections.current) refs.neuralConnections.current.visible = false;

          animateState4(
            attributes,
            particleData,
            stateElapsed,
            data.snapshotPositions.current,
            particleData.burstVelocity,
            data.time.current,
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
      data.currentCoreColor.current.lerp(targetPrimaryColor, CORE_COLOR_LERP);

      // Lerp primary and secondary ambient colors
      data.currentPrimaryColor.current.lerp(targetPrimaryColor, AMBIENT_COLOR_LERP);
      data.currentSecondaryColor.current.lerp(targetSecondaryColor, AMBIENT_COLOR_LERP);

      // Update core group colors
      if (refs.coreGroup.current) {
        const cg = refs.coreGroup.current;
        const mesh = cg.children[0] as THREE.Mesh;
        const glow = cg.children[1] as THREE.Mesh;
        (mesh.material as THREE.ShaderMaterial).uniforms.uColor.value.copy(
          data.currentCoreColor.current
        );
        (glow.material as THREE.ShaderMaterial).uniforms.uColor.value.copy(
          data.currentCoreColor.current
        );
      }

      // Update sun light color
      if (refs.sunLight.current) {
        refs.sunLight.current.color.copy(data.currentCoreColor.current);
      }

      // Mark attributes as needing update
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      sizeAttr.needsUpdate = true;
      alphaAttr.needsUpdate = true;

      // System group rotation
      if (refs.systemGroup.current) {
        refs.systemGroup.current.rotation.y += 0.0005 * config.speed;
        refs.systemGroup.current.rotation.x = Math.sin(data.time.current * 0.1) * 0.02;
      }

      // Animate nova effect (multiple rings)
      if (refs.novaMeshes.current.length > 0 && refs.novaState.current.active) {
        const novaElapsed = performance.now() - refs.novaState.current.startTime;
        const novaDuration = 1500; // Slightly longer for softer effect
        const progress = Math.min(novaElapsed / novaDuration, 1);

        // Expand and fade
        const startScale = 0.5;
        const maxScale = 150; // Slightly smaller for softer look
        const scale = startScale + progress * maxScale;

        // Softer fade - start fading earlier, lower max opacity
        const fadeProgress = Math.max(0, (progress - 0.2) / 0.8);
        const opacity = 0.5 * (1 - fadeProgress); // Lower opacity (0.5 instead of 0.9)

        refs.novaMeshes.current.forEach((nova) => {
          nova.scale.set(scale, scale, scale);
          (nova.material as THREE.MeshBasicMaterial).opacity = opacity;
        });

        if (progress >= 1) {
          // Remove all novas when done
          refs.novaMeshes.current.forEach((nova) => {
            nova.geometry.dispose();
            (nova.material as THREE.Material).dispose();
            refs.systemGroup.current?.remove(nova);
          });
          refs.novaMeshes.current = [];
          refs.novaState.current.active = false;
        }
      }

      // Camera movement with mouse drift and pan
      if (refs.camera.current) {
        const targetX = data.mousePosition.current.x * 8;
        const targetY = data.mousePosition.current.y * 8;
        data.cameraDrift.current.x += (targetX - data.cameraDrift.current.x) * 0.05;
        data.cameraDrift.current.y += (targetY - data.cameraDrift.current.y) * 0.05;

        // Get pan offset from cameraPanRef with smooth interpolation
        const panOffset = cameraPanRef.current?.targetOffset || { x: 0, y: 0 };
        const currentPanX = refs.camera.current.userData.panX || 0;
        const currentPanY = refs.camera.current.userData.panY || 0;
        const smoothPanX = currentPanX + (panOffset.x - currentPanX) * 0.1;
        const smoothPanY = currentPanY + (panOffset.y - currentPanY) * 0.1;
        refs.camera.current.userData.panX = smoothPanX;
        refs.camera.current.userData.panY = smoothPanY;

        // Camera Z position - no zoom needed since video handles State 0
        // Just use standard position for all states
        const targetZ = CAMERA_Z;
        
        // Smooth camera Z transition
        refs.camera.current.position.z += (targetZ - refs.camera.current.position.z) * 0.03;

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
  }, [state, config.speed, refs, data, cameraPanRef]);
}
