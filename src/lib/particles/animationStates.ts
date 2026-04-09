import * as THREE from 'three';
import type { AppState, ParticleData, ParticleAttributes } from '@/types';
import {
  STATE1_DURATION,
  STATE2_DURATION,
  STATE2_ABSORPTION_DURATION,
  STATE2_STABILIZE_DURATION,
  STATE2_COLOR_SHIFT_DURATION,
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
      // Core particle - appears AFTER background particles are visible
      // Background stars appear first, then core fades in as the center anchor
      const CORE_DELAY = 800; // 800ms delay - background stars visible first
      const CORE_SPEED = 1200; // 1.2s to fully appear
      let coreT = Math.max(0, Math.min(1, (stateElapsed - CORE_DELAY) / CORE_SPEED));
      const coreEased = easeOutCubic(coreT);
      
      positions[i3] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = 0;
      colors[i3] = coreColor.r;
      colors[i3 + 1] = coreColor.g;
      colors[i3 + 2] = coreColor.b;
      // Core fades in after background
      sizes[i] = (3.0 + Math.sin(time * 3) * 0.5) * coreEased;
      alphas[i] = 0.9 * coreEased;
      continue;
    }

    const rnd = random[i];
    
    // Calculate animation progress for entry effect
    // Background particles appear FIRST (immediately), core comes later
    const brainX = brainPositions[i3];
    const brainY = brainPositions[i3 + 1];
    const brainZ = brainPositions[i3 + 2];
    const distFromCenter = Math.sqrt(brainX * brainX + brainY * brainY + brainZ * brainZ);
    
    // Background appears over 1.5s - starts immediately
    const BG_ENTRY = 1500; // 1.5s for full appearance
    let t = Math.min(1, stateElapsed / BG_ENTRY);
    // Slight variation based on distance from center for organic feel
    t = Math.max(0, t - (distFromCenter / 100) * 0.2 - rnd * 0.1);
    const eased = easeOutCubic(t);

    const sx = snapshotPositions[i3];
    const sy = snapshotPositions[i3 + 1];
    const sz = snapshotPositions[i3 + 2];
    const tx = homePositions[i3];
    const ty = homePositions[i3 + 1];
    const tz = homePositions[i3 + 2];

    // Two-phase entry animation
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

// Color constants for blue to orange interpolation (State 2 substage 3)
const BLUE_R = 0.133;
const BLUE_G = 0.827;
const BLUE_B = 0.933; // Cyan/blue base
const ORANGE_R = 0.976;
const ORANGE_G = 0.451;
const ORANGE_B = 0.086; // Orange
const BLUE_TO_ORANGE_R = ORANGE_R - BLUE_R;
const BLUE_TO_ORANGE_G = ORANGE_G - BLUE_G;
const BLUE_TO_ORANGE_B = ORANGE_B - BLUE_B;

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

  // Determine which substate of State 2 we're in
  // Substage 1: 0-3000ms - Absorption (max volatility)
  // Substage 2: 3000-5000ms - Stabilization (forming stable sphere)
  // Substage 3: 5000-7000ms - Color shift (blue to orange, different speeds)
  let subStage: 1 | 2 | 3 = 1;
  let subStageProgress = 0;
  
  if (state === 2) {
    if (stateElapsed < STATE2_ABSORPTION_DURATION) {
      subStage = 1;
      subStageProgress = stateElapsed / STATE2_ABSORPTION_DURATION;
    } else if (stateElapsed < STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION) {
      subStage = 2;
      subStageProgress = (stateElapsed - STATE2_ABSORPTION_DURATION) / STATE2_STABILIZE_DURATION;
    } else {
      subStage = 3;
      subStageProgress = (stateElapsed - STATE2_ABSORPTION_DURATION - STATE2_STABILIZE_DURATION) / STATE2_COLOR_SHIFT_DURATION;
    }
  }

  // Core particle hidden in state 3
  if (state === 3) {
    sizes[0] = 0;
    alphas[0] = 0;
  }

  for (let i = 1; i < TOTAL_MAIN; i++) {
    const i3 = i * 3;
    const isMigrator = migrator[i] === 1;
    const rnd = random[i];
    
    // All particles (migrators and non-migrators) participate in State 2 shell formation
    const delay = isMigrator
      ? migratorDelay[i] * 0.5 // Faster absorption for migrators
      : nonMigratorDelay[i] * 0.3; // Slightly delayed for non-migrators

    // Rotation for shell positioning
    const cosA = Math.cos(shellAngle);
    const sinA = Math.sin(shellAngle);
    const entryR = 6 + random[i] * 22;

    // Calculate base target position on shell
    let tx = directions[i3] * entryR;
    const ty = directions[i3 + 1] * entryR;
    let tz = directions[i3 + 2] * entryR;
    const rx = tx * cosA - tz * sinA;
    const rz = tx * sinA + tz * cosA;
    tx = rx;
    tz = rz;

    if (state === 2) {
      // STATE 2: Three substages
      
      if (subStage === 1) {
        // SUBSTAGE 1: Absorption (0-3000ms) - FAST CHAOTIC BOUNCING ONLY
        const absorptionProgress = Math.min(1, Math.max(0, (stateElapsed - delay) / STATE2_ABSORPTION_DURATION));
        const easedAbsorption = easeOutCubic(absorptionProgress);
        
        // FAST chaotic bouncing - higher frequency for more energy
        const bounceFreq = 8 + random[i] * 6; // 8-14 Hz - very fast bouncing
        const bouncePhase = time * bounceFreq + random[i] * 100;
        
        // Large bounce amplitude that starts high and decays toward end of substate 1
        const amplitudeDecay = 1 - (easedAbsorption * 0.3); // Only 30% decay by end of substate 1
        const bounceAmp = entryR * (0.5 + random[i] * 0.3) * amplitudeDecay;
        
        // Base radius grows toward shell
        const baseR = entryR * easedAbsorption;
        
        // CHAOTIC bounce - multiple sine waves for irregular motion
        const bounceOffset = Math.sin(bouncePhase) * bounceAmp + 
                            Math.sin(bouncePhase * 1.3 + i) * bounceAmp * 0.5 +
                            Math.cos(bouncePhase * 0.7) * bounceAmp * 0.3;
        
        const currentR = Math.max(0, baseR + bounceOffset);
        
        // HIGH chaos/vibration for energetic look
        const chaosFreq = 0.05 + random[i] * 0.03;
        const chaosAmp = (4 + random[i] * 3) * (1 - easedAbsorption * 0.2);
        const vibX = Math.sin(time * chaosFreq + i * 2) * chaosAmp;
        const vibY = Math.cos(time * chaosFreq * 1.4 + i * 3) * chaosAmp;
        const vibZ = Math.sin(time * chaosFreq * 0.8 + i * 5) * chaosAmp;
        
        let sx = directions[i3] * currentR;
        const sy = directions[i3 + 1] * currentR;
        let sz = directions[i3 + 2] * currentR;
        
        // Apply rotation
        const srx = sx * cosA - sz * sinA;
        const srz = sx * sinA + sz * cosA;
        sx = srx;
        sz = srz;
        
        positions[i3] = sx + vibX;
        positions[i3 + 1] = sy + vibY;
        positions[i3 + 2] = sz + vibZ;
        
        // Bright cyan/blue colors - energetic
        const brightness = 0.7 + easedAbsorption * 0.5 + Math.sin(time * 0.02 + rnd * 5) * 0.3;
        colors[i3] = BLUE_R * brightness;
        colors[i3 + 1] = BLUE_G * brightness;
        colors[i3 + 2] = BLUE_B * brightness;
        
        // Size pulses with fast bounce
        const bounceSize = 1 + Math.abs(Math.sin(bouncePhase)) * 0.4;
        sizes[i] = (0.8 + easedAbsorption * 1.0) * bounceSize;
        alphas[i] = 0.5 + easedAbsorption * 0.4;
        
      } else if (subStage === 2) {
        // SUBSTAGE 2: Stabilization (3000-5000ms) - Bouncing decays to form stable sphere
        const stabilizeEased = easeOutCubic(subStageProgress);
        const decayFactor = 1 - stabilizeEased; // 1 -> 0 as we stabilize
        
        // Target radius interpolates from entry to final
        const targetR = entryR + (state2Radius[i] - entryR) * stabilizeEased;
        
        // CONTINUOUS BOUNCING that decays to zero by end of substate 2
        const bounceFreq = 6 + random[i] * 4; // Slower than substate 1 but still bouncy
        const bouncePhase = time * bounceFreq + random[i] * 50;
        
        // Bounce amplitude decays from large to ZERO
        const bounceDecay = Math.exp(-subStageProgress * 4); // Strong decay
        const bounceAmp = entryR * 0.3 * bounceDecay;
        
        // Bounce offset that fades to zero
        const bounceOffset = Math.sin(bouncePhase) * bounceAmp * decayFactor;
        
        // Final radius with decaying bounce
        const currentR = targetR + bounceOffset;
        
        // Chaos/vibration also decays to zero
        const chaosDecay = Math.exp(-subStageProgress * 3);
        const chaosAmp = 2 * chaosDecay;
        const vibX = Math.sin(time * 0.02 + i) * chaosAmp;
        const vibY = Math.cos(time * 0.025 + i) * chaosAmp;
        const vibZ = Math.sin(time * 0.018 + i * 2) * chaosAmp;
        
        let sx = directions[i3] * currentR;
        const sy = directions[i3 + 1] * currentR;
        let sz = directions[i3 + 2] * currentR;
        const srx = sx * cosA - sz * sinA;
        const srz = sx * sinA + sz * cosA;
        sx = srx;
        sz = srz;
        
        positions[i3] = sx + vibX;
        positions[i3 + 1] = sy + vibY;
        positions[i3 + 2] = sz + vibZ;
        
        // Bright cyan/blue colors - calming down
        const flicker = Math.sin(stateElapsed * 0.01 + rnd * 5) * 0.2 * decayFactor;
        const brightness = 0.85 + flicker;
        colors[i3] = BLUE_R * brightness;
        colors[i3 + 1] = BLUE_G * brightness;
        colors[i3 + 2] = BLUE_B * brightness;
        
        // Size stabilizes
        sizes[i] = 1.8 + stabilizeEased * 0.3;
        alphas[i] = 0.85 + stabilizeEased * 0.1;
        
      } else {
        // SUBSTAGE 3: Color shift (5000-7000ms) - Blue to orange, stable rotating sphere
        // STABLE SPHERE - no bouncing, just rotation
        const colorSpeedFactor = 0.5 + rnd * 1.0;
        const adjustedProgress = Math.min(1, subStageProgress * colorSpeedFactor);
        const colorEased = easeOutCubic(adjustedProgress);
        
        // Stable compressed radius (80% of original)
        const targetR = state2Radius[i] * 0.8;
        
        // STABLE - minimal pulse for breathing effect only, not bouncing
        const breathe = Math.sin(stateElapsed * 0.001 + random[i] * 10) * 0.3;
        const r = Math.max(0, targetR + breathe);
        
        let sx = directions[i3] * r;
        const sy = directions[i3 + 1] * r;
        let sz = directions[i3 + 2] * r;
        const srx = sx * cosA - sz * sinA;
        const srz = sx * sinA + sz * cosA;
        sx = srx;
        sz = srz;
        
        positions[i3] = sx;
        positions[i3 + 1] = sy;
        positions[i3 + 2] = sz;
        
        // Color interpolation from blue to orange
        const brightness = 0.9 + Math.sin(stateElapsed * 0.001 + rnd * 3) * 0.05;
        colors[i3] = (BLUE_R + BLUE_TO_ORANGE_R * colorEased) * brightness;
        colors[i3 + 1] = (BLUE_G + BLUE_TO_ORANGE_G * colorEased) * brightness;
        colors[i3 + 2] = (BLUE_B + BLUE_TO_ORANGE_B * colorEased) * brightness;
        
        // Stable sizes
        sizes[i] = 2.0 + rnd * 0.3;
        alphas[i] = 0.9;
      }
      
    } else {
      // STATE 3: Solar System - Stable rotating orange sphere with planets orbiting
      // STABLE SPHERE - matches substate 3 exactly
      const targetR = state2Radius[i] * 0.8; // 80% compressed
      
      // STABLE - minimal breathing only
      const breathe = Math.sin(stateElapsed * 0.001 + random[i] * 10) * 0.3;
      const r = Math.max(0, targetR + breathe);

      let sx = directions[i3] * r;
      const sy = directions[i3 + 1] * r;
      let sz = directions[i3 + 2] * r;
      const srx = sx * cosA - sz * sinA;
      const srz = sx * sinA + sz * cosA;
      sx = srx;
      sz = srz;

      positions[i3] = sx;
      positions[i3 + 1] = sy;
      positions[i3 + 2] = sz;

      // Orange/yellow colors for solar system state
      const brightness = 0.8 + Math.sin(stateElapsed * 0.002 + rnd * 3) * 0.15;
      colors[i3] = ORANGE_R * brightness;
      colors[i3 + 1] = ORANGE_G * brightness;
      colors[i3 + 2] = ORANGE_B * brightness;

      sizes[i] = 1.8 + rnd * 0.4;
      alphas[i] = 0.9;
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
    // Faster planet entry - reduced delay between planets
    const entryTime = idx * (PLANET_ENTRY_DELAY * 0.6); // 40% faster entry timing

    if (stateElapsed < entryTime) {
      planet.group.visible = false;
      return;
    }

    planet.group.visible = true;
    // Faster entry animation - reduced duration
    const entryProgress = Math.min(
      (stateElapsed - entryTime) / (PLANET_ENTRY_DURATION * 0.7), // 30% faster entry
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

    // Once entered, orbit at 2x speed
    if (entryProgress >= 1) {
      const prevAngle = planet.angle;
      planet.angle += planet.speed * 0.06 * speed; // 2x faster orbit speed
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
