import * as THREE from 'three';
import type { AppState, ParticleData, ParticleAttributes } from '@/types';
import {
  STATE1_DURATION,
  STATE2_DURATION,
  TRAVEL_DURATION,
  STABILIZE_DURATION,
  STATE4_CONCENTRATE,
  BURST_DURATION,
  BURST_DAMPING,
  PLANET_ENTRY_DURATION,
  PLANET_ENTRY_BASE_TIME,
  PLANET_ENTRY_DELAY,
  SHELL_RADIUS,
  TOTAL_MAIN,
  TRAIL_LENGTH,
  SHARED_ROTATION,
  ORBIT_SEGMENTS,
} from './constants';
import { easeOutCubic, easeInOutCubic } from './geometry';
import type { PlanetInstance } from './scene';

// ============================================
// State 0: Neural Brain - Particles form a 3D brain shape
// Starting state - the brain with subtle neural network
// ============================================

export function animateState0(
  attributes: ParticleAttributes,
  data: ParticleData,
  time: number,
  _coreColor: THREE.Color
): void {
  const { positions, colors, sizes, alphas } = attributes;
  const { brainPositions, random } = data;

  for (let i = 0; i < TOTAL_MAIN; i++) {
    const i3 = i * 3;

    if (i === 0) {
      // Central glow - subtle neural core
      positions[i3] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = 0;
      // Soft cyan core - reduced brightness
      colors[i3] = 0.1;
      colors[i3 + 1] = 0.5;
      colors[i3 + 2] = 0.6;
      sizes[i] = 2.5 + Math.sin(time * 2.0) * 0.4;
      alphas[i] = 0.7;
      continue;
    }

    const rnd = random[i];

    // Gentle pulsing animation for entire brain
    const pulse = 1 + Math.sin(time * 0.6) * 0.01;
    positions[i3] = brainPositions[i3] * pulse;
    positions[i3 + 1] = brainPositions[i3 + 1] * pulse;
    positions[i3 + 2] = brainPositions[i3 + 2] * pulse;

    // Subtle twinkle for neural activity - much slower and dimmer
    const twinkleSpeed = 0.8 + rnd * 1.2;
    const twinklePhase = rnd * Math.PI * 2;
    const twinkle = Math.sin(time * twinkleSpeed + twinklePhase);
    
    // Gentle glow only - no harsh sparks
    const neuralIntensity = (twinkle + 1) * 0.25; // 0 to 0.5
    
    // Color gradient: dark blue base to soft cyan glow
    const darkBlue = new THREE.Color('#061a2e');
    const softCyan = new THREE.Color('#1a5f7a');
    
    // Mix colors based on intensity - very subtle
    const finalColor = new THREE.Color().lerpColors(
      darkBlue,
      softCyan,
      neuralIntensity
    );
    
    // Very subtle brightness
    const brightness = 0.15 + neuralIntensity * 0.4;
    
    colors[i3] = finalColor.r * brightness;
    colors[i3 + 1] = finalColor.g * brightness;
    colors[i3 + 2] = finalColor.b * brightness;

    // Size: small base with gentle glow increase
    const baseSize = 0.25 + rnd * 0.15;
    const glowSize = 0.6 + rnd * 0.4;
    sizes[i] = baseSize + neuralIntensity * glowSize;

    // Alpha: subtle visibility
    const baseAlpha = 0.25 + rnd * 0.15;
    const glowAlpha = 0.6;
    alphas[i] = baseAlpha + neuralIntensity * (glowAlpha - baseAlpha);
  }
}

// ============================================
// State 1: Into the Mind - Brain expands as we zoom in, becomes star field
// The brain particles spread outward like entering a vast neural universe
// ============================================

export function animateState1(
  attributes: ParticleAttributes,
  data: ParticleData,
  stateElapsed: number,
  snapshotPositions: Float32Array,
  time: number,
  coreColor: THREE.Color,
  _primaryColor: THREE.Color,
  _secondaryColor: THREE.Color
): void {
  const { positions, colors, sizes, alphas } = attributes;
  const { homePositions, brainPositions, random } = data;

  for (let i = 0; i < TOTAL_MAIN; i++) {
    const i3 = i * 3;

    if (i === 0) {
      // Core particle fades out
      positions[i3] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = 0;
      colors[i3] = coreColor.r;
      colors[i3 + 1] = coreColor.g;
      colors[i3 + 2] = coreColor.b;
      sizes[i] = 2.5 * (1 - Math.min(1, stateElapsed / 500));
      alphas[i] = Math.max(0, 1 - stateElapsed / 500);
      continue;
    }

    const rnd = random[i];
    
    // Calculate animation progress with per-particle delay
    // Delay based on distance from center for wave-like expansion
    const brainX = brainPositions[i3];
    const brainY = brainPositions[i3 + 1];
    const brainZ = brainPositions[i3 + 2];
    const distFromCenter = Math.sqrt(brainX * brainX + brainY * brainY + brainZ * brainZ);
    const distDelay = (distFromCenter / 25) * 0.3; // Outer particles start later
    const delay = distDelay + rnd * 0.3;
    
    let t = (stateElapsed / STATE1_DURATION - delay) / (1 - delay);
    t = Math.max(0, Math.min(1, t));
    const eased = easeOutCubic(t);

    // Interpolate from snapshot (brain surface) to expanded brain, then to star field
    const sx = snapshotPositions[i3];
    const sy = snapshotPositions[i3 + 1];
    const sz = snapshotPositions[i3 + 2];
    
    // Target star field position
    const tx = homePositions[i3];
    const ty = homePositions[i3 + 1];
    const tz = homePositions[i3 + 2];

    // Two-phase animation: expand brain first, then disperse to stars
    if (t < 0.4) {
      // Phase 1: Brain expands outward (0% to 40% of animation)
      const expandT = t / 0.4;
      const expandEased = easeOutCubic(expandT);
      const currentExpansion = 1 + expandEased * 2.5;
      
      positions[i3] = sx * currentExpansion;
      positions[i3 + 1] = sy * currentExpansion;
      positions[i3 + 2] = sz * currentExpansion;
    } else {
      // Phase 2: Explode outward to star field positions (40% to 100%)
      const disperseT = (t - 0.4) / 0.6;
      const disperseEased = easeOutCubic(disperseT);
      
      // Max expanded brain position (3.5x original)
      const maxExpandX = sx * 3.5;
      const maxExpandY = sy * 3.5;
      const maxExpandZ = sz * 3.5;
      
      positions[i3] = maxExpandX + (tx - maxExpandX) * disperseEased;
      positions[i3 + 1] = maxExpandY + (ty - maxExpandY) * disperseEased;
      positions[i3 + 2] = maxExpandZ + (tz - maxExpandZ) * disperseEased;
    }

    // Twinkle effect: subtle neural glow transitioning to star glimmers
    const twinkleSpeed = 1.0 + rnd * 2.0;
    const twinklePhase = rnd * Math.PI * 2;
    const twinkle = Math.sin(time * twinkleSpeed + twinklePhase);
    
    // Glimmer intensity - starts as neural glow, becomes star twinkle
    const glimmerIntensity = (Math.max(0, twinkle) * 0.3 + 0.1) * eased;
    
    // Color transition: from soft cyan (brain) to cool white (stars)
    const brainColor = new THREE.Color('#1a5f7a');
    const starColor = new THREE.Color('#e0f7ff');
    const finalColor = new THREE.Color().lerpColors(brainColor, starColor, eased);
    
    const brightness = 0.1 + glimmerIntensity * 0.6;
    
    colors[i3] = finalColor.r * brightness;
    colors[i3 + 1] = finalColor.g * brightness;
    colors[i3 + 2] = finalColor.b * brightness;

    // Size transition: small brain particles to star glimmers
    const brainSize = 0.3 + rnd * 0.2;
    const starSize = 0.8 + rnd * 0.6;
    const baseSize = brainSize + (starSize - brainSize) * eased;
    sizes[i] = (baseSize + glimmerIntensity * 0.8) * eased;
    
    // Alpha: transitioning visibility
    const baseAlpha = 0.2 + rnd * 0.2;
    alphas[i] = baseAlpha * eased + glimmerIntensity * 0.5;
  }
}

// ============================================
// State 2 & 3: Charging Shell and Solar System
// ============================================

export function animateState2And3(
  attributes: ParticleAttributes,
  data: ParticleData,
  state: AppState,
  stateElapsed: number,
  _snapshotPositions: Float32Array,
  time: number,
  _speed: number,
  shellAngle: number,
  primaryColor: THREE.Color,
  secondaryColor: THREE.Color
): void {
  const { positions, colors, sizes, alphas } = attributes;
  const {
    homePositions,
    random,
    migrator,
    migratorDelay,
    nonMigratorDelay,
    directions,
    state2Radius,
  } = data;

  // Global time for state 3 calculations
  const globalT = state === 3 ? stateElapsed + STATE2_DURATION : stateElapsed;

  // Core particle hidden in state 3
  if (state === 3) {
    sizes[0] = 0;
    alphas[0] = 0;
  }

  for (let i = 1; i < TOTAL_MAIN; i++) {
    const i3 = i * 3;
    const isMigrator = migrator[i] === 1;
    const delay = isMigrator
      ? migratorDelay[i]
      : nonMigratorDelay[i] + STATE2_DURATION;

    // State 2: Non-migrators stay at home positions with subtle movement
    // Keep white/bright colors for visual continuity with star field
    if (state === 2 && !isMigrator) {
      const hx = homePositions[i3];
      const hy = homePositions[i3 + 1];
      const hz = homePositions[i3 + 2];

      positions[i3] = hx + Math.sin(time + i) * 0.2;
      positions[i3 + 1] = hy + Math.cos(time + i) * 0.2;
      positions[i3 + 2] = hz + Math.sin(time + i * 0.5) * 0.2;

      const rnd = random[i];
      // Use white/cool white colors to maintain star field appearance
      const white = new THREE.Color('#ffffff');
      const coolWhite = new THREE.Color('#e0f2fe');
      const baseColor = new THREE.Color().lerpColors(white, coolWhite, rnd * 0.5);
      const brightness = 0.8 + rnd * 0.4;
      colors[i3] = baseColor.r * brightness;
      colors[i3 + 1] = baseColor.g * brightness;
      colors[i3 + 2] = baseColor.b * brightness;
      sizes[i] = rnd * 0.8 + 0.3;
      alphas[i] = 0.6 + rnd * 0.3;
      continue;
    }

    // Before delay: particles hover at home positions
    // Keep star field appearance for non-migrators, migrators start transitioning
    if (globalT < delay) {
      const hx = homePositions[i3];
      const hy = homePositions[i3 + 1];
      const hz = homePositions[i3 + 2];

      positions[i3] = hx + Math.sin(time + i) * 0.2;
      positions[i3 + 1] = hy + Math.cos(time + i) * 0.2;
      positions[i3 + 2] = hz + Math.sin(time + i * 0.5) * 0.2;

      const rnd = random[i];
      if (!isMigrator) {
        // Non-migrators keep star field white colors
        const white = new THREE.Color('#ffffff');
        const coolWhite = new THREE.Color('#e0f2fe');
        const baseColor = new THREE.Color().lerpColors(white, coolWhite, rnd * 0.5);
        const brightness = 0.8 + rnd * 0.4;
        colors[i3] = baseColor.r * brightness;
        colors[i3 + 1] = baseColor.g * brightness;
        colors[i3 + 2] = baseColor.b * brightness;
        sizes[i] = rnd * 0.8 + 0.3;
        alphas[i] = 0.6 + rnd * 0.3;
      } else {
        // Migrators start transitioning to shell colors
        const baseColor = new THREE.Color().lerpColors(primaryColor, secondaryColor, rnd);
        const brightness = 0.7 + rnd * 0.6;
        colors[i3] = baseColor.r * brightness;
        colors[i3 + 1] = baseColor.g * brightness;
        colors[i3 + 2] = baseColor.b * brightness;
        sizes[i] = rnd * 0.8 + 0.2;
        alphas[i] = 0.5;
      }
      continue;
    }

    // After delay: particles travel to shell
    const life = globalT - delay;
    const entryR = 6 + random[i] * 22;

    // Calculate target radius (expands to shell radius in state 3)
    const state3Elapsed = Math.max(0, globalT - STATE2_DURATION);
    const state3T = Math.min(state3Elapsed / 2500, 1);
    const state3Ease = easeOutCubic(state3T);
    const targetR = state2Radius[i] + (SHELL_RADIUS - state2Radius[i]) * state3Ease;

    // Rotation for shell positioning
    const cosA = Math.cos(shellAngle);
    const sinA = Math.sin(shellAngle);

    if (life < TRAVEL_DURATION) {
      // Travel phase: move from home to entry point
      const travelT = life / TRAVEL_DURATION;
      const easedTravel = easeOutCubic(travelT);

      let tx = directions[i3] * entryR;
      const ty = directions[i3 + 1] * entryR;
      let tz = directions[i3 + 2] * entryR;

      // Apply shell rotation
      const rx = tx * cosA - tz * sinA;
      const rz = tx * sinA + tz * cosA;
      tx = rx;
      tz = rz;

      const hx = homePositions[i3];
      const hy = homePositions[i3 + 1];
      const hz = homePositions[i3 + 2];

      positions[i3] = hx + (tx - hx) * easedTravel;
      positions[i3 + 1] = hy + (ty - hy) * easedTravel;
      positions[i3 + 2] = hz + (tz - hz) * easedTravel;

      const baseColor = new THREE.Color().lerpColors(primaryColor, secondaryColor, random[i]);
      const brightness = 0.7 + easedTravel * 0.6;
      colors[i3] = baseColor.r * brightness;
      colors[i3 + 1] = baseColor.g * brightness;
      colors[i3 + 2] = baseColor.b * brightness;
      sizes[i] = 0.8 + easedTravel * 1.6;
      alphas[i] = 0.3 + easedTravel * 0.7;
    } else {
      // Stabilized phase: orbit on shell with pulse
      const activeLife = life - TRAVEL_DURATION;
      const stabilizeT = Math.min(activeLife / STABILIZE_DURATION, 1);
      const easedStabilize = easeOutCubic(stabilizeT);

      const baseR = entryR + (targetR - entryR) * easedStabilize;
      const pulseAmp = (1 - easedStabilize) * (12 + random[i] * 10);
      const pulse = Math.sin(activeLife * 0.005 + random[i] * 10) * pulseAmp;
      const r = Math.max(0, baseR + pulse);

      let tx = directions[i3] * r;
      const ty = directions[i3 + 1] * r;
      let tz = directions[i3 + 2] * r;

      const rx = tx * cosA - tz * sinA;
      const rz = tx * sinA + tz * cosA;
      tx = rx;
      tz = rz;

      positions[i3] = tx;
      positions[i3 + 1] = ty;
      positions[i3 + 2] = tz;

      const baseColor = new THREE.Color().lerpColors(primaryColor, secondaryColor, random[i]);
      const brightness = 0.5 + easedStabilize * 0.8;
      colors[i3] = baseColor.r * brightness;
      colors[i3 + 1] = baseColor.g * brightness;
      colors[i3 + 2] = baseColor.b * brightness;
      sizes[i] = 0.6 + easedStabilize * 1.4 + (1 - easedStabilize) * 0.8;
      alphas[i] = 0.2 + easedStabilize * 0.8;
    }
  }
}

// ============================================
// State 3: Planet Animation
// ============================================

export function animatePlanets(
  planets: PlanetInstance[],
  orbitGroup: THREE.Group | null,
  stateElapsed: number,
  speed: number
): void {
  const startPos = new THREE.Vector3(-90, -70, 30);

  planets.forEach((planet, idx) => {
    const entryTime = PLANET_ENTRY_BASE_TIME + idx * PLANET_ENTRY_DELAY;

    if (stateElapsed < entryTime) {
      planet.group.visible = false;
      return;
    }

    planet.group.visible = true;
    const entryProgress = Math.min(
      (stateElapsed - entryTime) / PLANET_ENTRY_DURATION,
      1
    );
    const easedEntry = easeOutCubic(entryProgress);

    const endPos = new THREE.Vector3(
      Math.cos(planet.angle) * planet.radius,
      0,
      Math.sin(planet.angle) * planet.radius
    );
    endPos.applyEuler(SHARED_ROTATION);

    planet.group.position.lerpVectors(startPos, endPos, easedEntry);

    const startScale = 5.0;
    const endScale = 1.0;
    const s = startScale + (endScale - startScale) * easedEntry;
    planet.group.scale.set(s, s, s);

    // Once entered, orbit normally
    if (entryProgress >= 1) {
      const prevAngle = planet.angle;
      planet.angle += planet.speed * 0.03 * speed;
      const delta = planet.angle - prevAngle;

      if (!planet.hasCompletedFirstOrbit) {
        planet.angleTraveled += delta;
        if (planet.angleTraveled >= Math.PI * 2) {
          planet.hasCompletedFirstOrbit = true;
          planet.angleTraveled = Math.PI * 2;
        }
      }

      const v = new THREE.Vector3(
        Math.cos(planet.angle) * planet.radius,
        0,
        Math.sin(planet.angle) * planet.radius
      );
      v.applyEuler(SHARED_ROTATION);
      planet.group.position.copy(v);

      // Update orbit draw range
      if (orbitGroup) {
        const progress = planet.hasCompletedFirstOrbit
          ? 1
          : Math.min(1, planet.angleTraveled / (Math.PI * 2));
        const totalVertices = ORBIT_SEGMENTS + 1;
        const drawCount = Math.max(1, Math.floor(progress * totalVertices));

        orbitGroup.children.forEach((child) => {
          if (child.userData.idx === idx) {
            const geo = (child as THREE.Line | THREE.Points).geometry;
            geo.setDrawRange(0, drawCount);
          }
        });
      }
    }
  });
}

// ============================================
// State 4: Collapse - Particles burst outward
// ============================================

export function animateState4(
  attributes: ParticleAttributes,
  data: ParticleData,
  stateElapsed: number,
  snapshotPositions: Float32Array,
  burstVelocities: Float32Array,
  time: number,
  primaryColor: THREE.Color,
  secondaryColor: THREE.Color
): void {
  const { positions, colors, sizes, alphas } = attributes;
  const { homePositions, random, migrator } = data;

  if (stateElapsed < STATE4_CONCENTRATE) {
    // Concentration phase: migrators move to center
    const t = stateElapsed / STATE4_CONCENTRATE;
    const eased = easeInOutCubic(t);

    for (let i = 0; i < TOTAL_MAIN; i++) {
      const i3 = i * 3;

      if (migrator[i]) {
        const sx = snapshotPositions[i3];
        const sy = snapshotPositions[i3 + 1];
        const sz = snapshotPositions[i3 + 2];

        positions[i3] = sx * (1 - eased);
        positions[i3 + 1] = sy * (1 - eased);
        positions[i3 + 2] = sz * (1 - eased);

        const c = primaryColor.clone().lerp(secondaryColor, random[i]);
        colors[i3] = c.r;
        colors[i3 + 1] = c.g;
        colors[i3 + 2] = c.b;
        sizes[i] = 1.5;
        alphas[i] = 1;
      } else {
        const hx = homePositions[i3];
        const hy = homePositions[i3 + 1];
        const hz = homePositions[i3 + 2];

        positions[i3] = hx + Math.sin(time + i) * 0.2;
        positions[i3 + 1] = hy + Math.cos(time + i) * 0.2;
        positions[i3 + 2] = hz + Math.sin(time + i * 0.5) * 0.2;

        const rnd = random[i];
        const baseColor = secondaryColor.clone().multiplyScalar(0.7 + rnd * 0.6);
        colors[i3] = baseColor.r;
        colors[i3 + 1] = baseColor.g;
        colors[i3 + 2] = baseColor.b;
        sizes[i] = rnd * 0.8 + 0.2;
        alphas[i] = 0.5;
      }
    }
  } else {
    // Burst phase
    const burstElapsed = stateElapsed - STATE4_CONCENTRATE;

    if (burstElapsed < BURST_DURATION) {
      for (let i = 0; i < TOTAL_MAIN; i++) {
        const i3 = i * 3;

        if (migrator[i]) {
          // Apply damping to velocity
          burstVelocities[i3] *= BURST_DAMPING;
          burstVelocities[i3 + 1] *= BURST_DAMPING;
          burstVelocities[i3 + 2] *= BURST_DAMPING;

          // Update position
          positions[i3] += burstVelocities[i3];
          positions[i3 + 1] += burstVelocities[i3 + 1];
          positions[i3 + 2] += burstVelocities[i3 + 2];

          // Fade out with enhanced glow
          const fade = Math.max(0, 1 - burstElapsed / BURST_DURATION);
          const c = primaryColor.clone().lerp(
            secondaryColor,
            fade * 0.5 + random[i] * 0.5
          );
          // Boost brightness for glow effect
          const brightness = 1.0 + fade * 0.5;
          colors[i3] = c.r * brightness;
          colors[i3 + 1] = c.g * brightness;
          colors[i3 + 2] = c.b * brightness;
          // Larger sizes for more visible glow
          sizes[i] = (4 + random[i] * 6) * fade;
          alphas[i] = fade * 0.9;
        } else {
          // Non-migrators continue hovering
          const hx = homePositions[i3];
          const hy = homePositions[i3 + 1];
          const hz = homePositions[i3 + 2];

          positions[i3] = hx + Math.sin(time + i) * 0.2;
          positions[i3 + 1] = hy + Math.cos(time + i) * 0.2;
          positions[i3 + 2] = hz + Math.sin(time + i * 0.5) * 0.2;

          const rnd = random[i];
          const c = secondaryColor.clone().multiplyScalar(0.7 + rnd * 0.6);
          colors[i3] = c.r;
          colors[i3 + 1] = c.g;
          colors[i3 + 2] = c.b;
          sizes[i] = rnd * 0.8 + 0.2;
          alphas[i] = 0.5;
        }
      }
    }
  }
}

// ============================================
// Trail Animation
// ============================================

export function updateTrail(
  trail: THREE.LineSegments,
  positions: Float32Array,
  migratorIndexMap: Int32Array,
  trailHistory: Float32Array,
  stateElapsed: number,
  trailColor?: THREE.Color,
  fadeStart: number = STATE4_CONCENTRATE,
  fadeDuration: number = BURST_DURATION
): void {
  const trailPos = trail.geometry.attributes.position.array as Float32Array;
  const fade = Math.max(0, 1 - Math.max(0, stateElapsed - fadeStart) / fadeDuration);

  if (trailColor) {
    (trail.material as THREE.LineBasicMaterial).color.copy(trailColor);
  }
  (trail.material as THREE.LineBasicMaterial).opacity = fade * 0.8;

  let tIdx = 0;

  for (let i = 0; i < TOTAL_MAIN; i++) {
    const mIdx = migratorIndexMap[i];
    if (mIdx < 0) continue;

    const i3 = i * 3;
    const base = mIdx * TRAIL_LENGTH * 3;

    // Shift history
    for (let h = 0; h < TRAIL_LENGTH - 1; h++) {
      trailHistory[base + h * 3] = trailHistory[base + (h + 1) * 3];
      trailHistory[base + h * 3 + 1] = trailHistory[base + (h + 1) * 3 + 1];
      trailHistory[base + h * 3 + 2] = trailHistory[base + (h + 1) * 3 + 2];
    }

    // Add current position
    trailHistory[base + (TRAIL_LENGTH - 1) * 3] = positions[i3];
    trailHistory[base + (TRAIL_LENGTH - 1) * 3 + 1] = positions[i3 + 1];
    trailHistory[base + (TRAIL_LENGTH - 1) * 3 + 2] = positions[i3 + 2];

    // Build line segments from history
    for (let h = 0; h < TRAIL_LENGTH - 1; h++) {
      trailPos[tIdx++] = trailHistory[base + h * 3];
      trailPos[tIdx++] = trailHistory[base + h * 3 + 1];
      trailPos[tIdx++] = trailHistory[base + h * 3 + 2];
      trailPos[tIdx++] = trailHistory[base + (h + 1) * 3];
      trailPos[tIdx++] = trailHistory[base + (h + 1) * 3 + 1];
      trailPos[tIdx++] = trailHistory[base + (h + 1) * 3 + 2];
    }
  }

  trail.geometry.attributes.position.needsUpdate = true;
}

// ============================================
// Initialize Burst Velocities
// ============================================

export function initializeBurstVelocities(
  burstVelocities: Float32Array,
  minSpeed: number = 10,
  maxSpeed: number = 14
): void {
  const count = burstVelocities.length / 3;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);

    burstVelocities[i3] = Math.sin(phi) * Math.cos(theta) * speed;
    burstVelocities[i3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
    burstVelocities[i3 + 2] = Math.cos(phi) * speed;
  }
}
