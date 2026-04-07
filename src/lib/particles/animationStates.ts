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

// Pre-allocated color constants to avoid GC pressure
const DARK_BLUE_R = 0.024;
const DARK_BLUE_G = 0.102;
const DARK_BLUE_B = 0.180;
const SOFT_CYAN_R = 0.102;
const SOFT_CYAN_G = 0.373;
const SOFT_CYAN_B = 0.478;
const COLOR_DIFF_R = SOFT_CYAN_R - DARK_BLUE_R;
const COLOR_DIFF_G = SOFT_CYAN_G - DARK_BLUE_G;
const COLOR_DIFF_B = SOFT_CYAN_B - DARK_BLUE_B;

export function animateState0(
  attributes: ParticleAttributes,
  data: ParticleData,
  time: number,
  _coreColor: THREE.Color
): void {
  const { positions, colors, sizes, alphas } = attributes;
  const { brainPositions, random } = data;

  // Pre-calculate time-based values outside the loop
  const pulse = 1 + Math.sin(time * 0.6) * 0.01;
  const coreSize = 2.5 + Math.sin(time * 2.0) * 0.4;

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
      sizes[i] = coreSize;
      alphas[i] = 0.7;
      continue;
    }

    const rnd = random[i];

    // Apply pulsing animation
    positions[i3] = brainPositions[i3] * pulse;
    positions[i3 + 1] = brainPositions[i3 + 1] * pulse;
    positions[i3 + 2] = brainPositions[i3 + 2] * pulse;

    // Twinkle calculation
    const twinkle = Math.sin(time * (0.8 + rnd * 1.2) + rnd * 6.283);
    const neuralIntensity = (twinkle + 1) * 0.25; // 0 to 0.5
    
    // Interpolate colors manually (no object allocation)
    const brightness = 0.15 + neuralIntensity * 0.4;
    colors[i3] = (DARK_BLUE_R + COLOR_DIFF_R * neuralIntensity) * brightness;
    colors[i3 + 1] = (DARK_BLUE_G + COLOR_DIFF_G * neuralIntensity) * brightness;
    colors[i3 + 2] = (DARK_BLUE_B + COLOR_DIFF_B * neuralIntensity) * brightness;

    // Size with glow
    sizes[i] = 0.25 + rnd * 0.15 + neuralIntensity * (0.6 + rnd * 0.4);

    // Alpha
    alphas[i] = 0.25 + rnd * 0.15 + neuralIntensity * 0.2;
  }
}

// ============================================
// State 1: Into the Mind - Brain expands as we zoom in, becomes star field
// The brain particles spread outward like entering a vast neural universe
// ============================================

// Pre-calculated color constants for State 1
const BRAIN_COLOR_R = 0.102;
const BRAIN_COLOR_G = 0.373;
const BRAIN_COLOR_B = 0.478;
const STAR_COLOR_R = 0.878;
const STAR_COLOR_G = 0.969;
const STAR_COLOR_B = 1.0;
const STAR1_DIFF_R = STAR_COLOR_R - BRAIN_COLOR_R;
const STAR1_DIFF_G = STAR_COLOR_G - BRAIN_COLOR_G;
const STAR1_DIFF_B = STAR_COLOR_B - BRAIN_COLOR_B;

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
      // Core particle - bright center of starfield
      positions[i3] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = 0;
      colors[i3] = coreColor.r;
      colors[i3 + 1] = coreColor.g;
      colors[i3 + 2] = coreColor.b;
      // Keep core visible with pulsing effect
      sizes[i] = 3.0 + Math.sin(time * 3) * 0.5;
      alphas[i] = 0.9;
      continue;
    }

    const rnd = random[i];
    
    // Calculate animation progress
    const brainX = brainPositions[i3];
    const brainY = brainPositions[i3 + 1];
    const brainZ = brainPositions[i3 + 2];
    const distFromCenter = Math.sqrt(brainX * brainX + brainY * brainY + brainZ * brainZ);
    const distDelay = (distFromCenter / 25) * 0.3;
    const delay = distDelay + rnd * 0.3;
    
    let t = (stateElapsed / STATE1_DURATION - delay) / (1 - delay);
    t = Math.max(0, Math.min(1, t));
    const eased = easeOutCubic(t);

    const sx = snapshotPositions[i3];
    const sy = snapshotPositions[i3 + 1];
    const sz = snapshotPositions[i3 + 2];
    const tx = homePositions[i3];
    const ty = homePositions[i3 + 1];
    const tz = homePositions[i3 + 2];

    // Two-phase animation
    if (t < 0.4) {
      const expandEased = easeOutCubic(t / 0.4);
      const currentExpansion = 1 + expandEased * 2.5;
      positions[i3] = sx * currentExpansion;
      positions[i3 + 1] = sy * currentExpansion;
      positions[i3 + 2] = sz * currentExpansion;
    } else {
      const disperseEased = easeOutCubic((t - 0.4) / 0.6);
      const maxExpandX = sx * 3.5;
      const maxExpandY = sy * 3.5;
      const maxExpandZ = sz * 3.5;
      
      positions[i3] = maxExpandX + (tx - maxExpandX) * disperseEased;
      positions[i3 + 1] = maxExpandY + (ty - maxExpandY) * disperseEased;
      positions[i3 + 2] = maxExpandZ + (tz - maxExpandZ) * disperseEased;
    }

    // Twinkle effect - brighter for more visible starfield
    const twinkle = Math.sin(time * (1.0 + rnd * 2.0) + rnd * 6.283);
    const glimmerIntensity = (Math.max(0, twinkle) * 0.4 + 0.2) * eased;
    
    // Manual color interpolation (no object allocation) - increased brightness
    const brightness = 0.3 + glimmerIntensity * 0.8;
    colors[i3] = (BRAIN_COLOR_R + STAR1_DIFF_R * eased) * brightness;
    colors[i3 + 1] = (BRAIN_COLOR_G + STAR1_DIFF_G * eased) * brightness;
    colors[i3 + 2] = (BRAIN_COLOR_B + STAR1_DIFF_B * eased) * brightness;

    // Size and alpha - brighter and more visible
    const baseSize = 0.5 + rnd * 0.3 + (0.7 + rnd * 0.5) * eased;
    sizes[i] = (baseSize + glimmerIntensity * 0.8) * eased;
    alphas[i] = (0.4 + rnd * 0.3) * eased + glimmerIntensity * 0.5;
  }
}

// ============================================
// State 2 & 3: Charging Shell and Solar System
// ============================================

// Pre-calculated color constants for white/cool white interpolation
const WHITE_R = 1.0;
const WHITE_G = 1.0;
const WHITE_B = 1.0;
const COOL_WHITE_R = 0.878;
const COOL_WHITE_G = 0.949;
const COOL_WHITE_B = 0.996;
const COOL_DIFF_R = COOL_WHITE_R - WHITE_R;
const COOL_DIFF_G = COOL_WHITE_G - WHITE_G;
const COOL_DIFF_B = COOL_WHITE_B - WHITE_B;

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

  // Pre-extract color components to avoid repeated property access
  const primaryR = primaryColor.r;
  const primaryG = primaryColor.g;
  const primaryB = primaryColor.b;
  const secondaryR = secondaryColor.r;
  const secondaryG = secondaryColor.g;
  const secondaryB = secondaryColor.b;
  const primaryDiffR = secondaryR - primaryR;
  const primaryDiffG = secondaryG - primaryG;
  const primaryDiffB = secondaryB - primaryB;

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
    if (state === 2 && !isMigrator) {
      const hx = homePositions[i3];
      const hy = homePositions[i3 + 1];
      const hz = homePositions[i3 + 2];

      positions[i3] = hx + Math.sin(time + i) * 0.2;
      positions[i3 + 1] = hy + Math.cos(time + i) * 0.2;
      positions[i3 + 2] = hz + Math.sin(time + i * 0.5) * 0.2;

      const rnd = random[i];
      const mixFactor = rnd * 0.5;
      const brightness = 0.8 + rnd * 0.4;
      // Manual interpolation: white -> cool white
      colors[i3] = (WHITE_R + COOL_DIFF_R * mixFactor) * brightness;
      colors[i3 + 1] = (WHITE_G + COOL_DIFF_G * mixFactor) * brightness;
      colors[i3 + 2] = (WHITE_B + COOL_DIFF_B * mixFactor) * brightness;
      sizes[i] = rnd * 0.8 + 0.3;
      alphas[i] = 0.6 + rnd * 0.3;
      continue;
    }

    // Before delay: particles hover at home positions
    if (globalT < delay) {
      const hx = homePositions[i3];
      const hy = homePositions[i3 + 1];
      const hz = homePositions[i3 + 2];

      positions[i3] = hx + Math.sin(time + i) * 0.2;
      positions[i3 + 1] = hy + Math.cos(time + i) * 0.2;
      positions[i3 + 2] = hz + Math.sin(time + i * 0.5) * 0.2;

      const rnd = random[i];
      if (!isMigrator) {
        const mixFactor = rnd * 0.5;
        const brightness = 0.8 + rnd * 0.4;
        colors[i3] = (WHITE_R + COOL_DIFF_R * mixFactor) * brightness;
        colors[i3 + 1] = (WHITE_G + COOL_DIFF_G * mixFactor) * brightness;
        colors[i3 + 2] = (WHITE_B + COOL_DIFF_B * mixFactor) * brightness;
        sizes[i] = rnd * 0.8 + 0.3;
        alphas[i] = 0.6 + rnd * 0.3;
      } else {
        // Migrators start transitioning to shell colors
        const brightness = 0.7 + rnd * 0.6;
        colors[i3] = (primaryR + primaryDiffR * rnd) * brightness;
        colors[i3 + 1] = (primaryG + primaryDiffG * rnd) * brightness;
        colors[i3 + 2] = (primaryB + primaryDiffB * rnd) * brightness;
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

      const rnd = random[i];
      const brightness = 0.7 + easedTravel * 0.6;
      colors[i3] = (primaryR + primaryDiffR * rnd) * brightness;
      colors[i3 + 1] = (primaryG + primaryDiffG * rnd) * brightness;
      colors[i3 + 2] = (primaryB + primaryDiffB * rnd) * brightness;
      sizes[i] = 0.8 + easedTravel * 1.6;
      alphas[i] = 0.3 + easedTravel * 0.7;
    } else {
      // Stabilized phase: orbit on shell
      const activeLife = life - TRAVEL_DURATION;
      
      // State 2: Keep volatile with constant chaos
      // State 3: Gradually stabilize
      const isState3 = state === 3;
      const stabilizeT = isState3 ? Math.min(activeLife / STABILIZE_DURATION, 1) : 0;
      const easedStabilize = isState3 ? easeOutCubic(stabilizeT) : 0;

      const baseR = entryR + (targetR - entryR) * easedStabilize;
      
      // State 2: Large chaotic pulse that never settles
      // State 3: Reducing pulse as it stabilizes
      const pulseAmp = isState3 
        ? (1 - easedStabilize) * (12 + random[i] * 10)
        : (15 + random[i] * 12); // Constant large amplitude in State 2
      
      // State 2: Faster, more chaotic movement with multiple frequencies
      // State 3: Slower, settling movement
      const pulseFreq = isState3 ? 0.005 : 0.015;
      const pulse = Math.sin(activeLife * pulseFreq + random[i] * 10) * pulseAmp;
      
      // State 2: Add extra noise/chaos
      const chaosOffset = isState3 ? 0 : Math.sin(activeLife * 0.008 + i) * (3 + random[i] * 4);
      
      const r = Math.max(0, baseR + pulse + chaosOffset);

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

      const rnd = random[i];
      
      // State 2: Brighter, more energetic colors
      // State 3: Stabilizing brightness
      const brightness = isState3 
        ? 0.5 + easedStabilize * 0.8
        : 0.7 + Math.sin(activeLife * 0.01 + rnd * 5) * 0.3; // Pulsing brightness in State 2
        
      colors[i3] = (primaryR + primaryDiffR * rnd) * brightness;
      colors[i3 + 1] = (primaryG + primaryDiffG * rnd) * brightness;
      colors[i3 + 2] = (primaryB + primaryDiffB * rnd) * brightness;
      
      // State 2: Pulsing sizes
      // State 3: Settling sizes
      sizes[i] = isState3
        ? 0.6 + easedStabilize * 1.4 + (1 - easedStabilize) * 0.8
        : 0.8 + Math.sin(activeLife * 0.012 + rnd * 8) * 0.6 + rnd * 0.5;
        
      alphas[i] = isState3
        ? 0.2 + easedStabilize * 0.8
        : 0.5 + Math.sin(activeLife * 0.008 + rnd * 3) * 0.2;
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

  // Pre-extract color components
  const primaryR = primaryColor.r;
  const primaryG = primaryColor.g;
  const primaryB = primaryColor.b;
  const secondaryR = secondaryColor.r;
  const secondaryG = secondaryColor.g;
  const secondaryB = secondaryColor.b;
  const primaryDiffR = secondaryR - primaryR;
  const primaryDiffG = secondaryG - primaryG;
  const primaryDiffB = secondaryB - primaryB;

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

        const rnd = random[i];
        colors[i3] = primaryR + primaryDiffR * rnd;
        colors[i3 + 1] = primaryG + primaryDiffG * rnd;
        colors[i3 + 2] = primaryB + primaryDiffB * rnd;
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
        const brightness = 0.7 + rnd * 0.6;
        colors[i3] = secondaryR * brightness;
        colors[i3 + 1] = secondaryG * brightness;
        colors[i3 + 2] = secondaryB * brightness;
        sizes[i] = rnd * 0.8 + 0.2;
        alphas[i] = 0.5;
      }
    }
  } else {
    // Burst phase
    const burstElapsed = stateElapsed - STATE4_CONCENTRATE;

    if (burstElapsed < BURST_DURATION) {
      const fadeNorm = 1 / BURST_DURATION;
      
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
          const fade = Math.max(0, 1 - burstElapsed * fadeNorm);
          const rnd = random[i];
          const colorMix = fade * 0.5 + rnd * 0.5;
          const brightness = 1.0 + fade * 0.5;
          colors[i3] = (primaryR + primaryDiffR * colorMix) * brightness;
          colors[i3 + 1] = (primaryG + primaryDiffG * colorMix) * brightness;
          colors[i3 + 2] = (primaryB + primaryDiffB * colorMix) * brightness;
          sizes[i] = (4 + rnd * 6) * fade;
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
          const brightness = 0.7 + rnd * 0.6;
          colors[i3] = secondaryR * brightness;
          colors[i3 + 1] = secondaryG * brightness;
          colors[i3 + 2] = secondaryB * brightness;
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
