import * as THREE from 'three';
import type { AppState, ParticleData, ParticleAttributes } from '@/types';
import {
  STATE2_ABSORPTION_DURATION,
  STATE2_STABILIZE_DURATION,
  STATE2_DURATION,
  STATE4_CONCENTRATE,
  BURST_DURATION,
  BURST_DAMPING,
  PLANET_ENTRY_DURATION,
  PLANET_ENTRY_DELAY,
  SHELL_RADIUS,
  TOTAL_MAIN,
  TRAIL_LENGTH,
  SHARED_ROTATION,
  ORBIT_SEGMENTS,
  STATE2_SPIKE_BOUNCE_STRENGTH,
  STATE2_SPIKE_MIN_RADIUS_RATIO,
  STATE2_SPIKE_FREQUENCY,
  STATE2_SPIKE_FREQUENCY_JITTER,
} from './constants';
import { easeOutCubic, easeInOutCubic } from './geometry';
import type { PlanetInstance } from './scene';

// ============================================
// State 0: Neural Brain - Particles form a 3D brain shape
// Starting state - the brain with subtle neural network
// ============================================

export function animateState0(
  attributes: ParticleAttributes,
  _data: ParticleData,
  _time: number,
  _coreColor: THREE.Color
): void {
  void _data;
  void _time;
  void _coreColor;
  const { positions, colors, sizes, alphas } = attributes;

  for (let i = 0; i < TOTAL_MAIN; i++) {
    const i3 = i * 3;
    positions[i3] = 0;
    positions[i3 + 1] = 0;
    positions[i3 + 2] = 0;
    colors[i3] = 0;
    colors[i3 + 1] = 0;
    colors[i3 + 2] = 0;
    sizes[i] = 0;
    alphas[i] = 0;
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
  void _primaryColor;
  void _secondaryColor;
  const { positions, colors, sizes, alphas } = attributes;
  const { homePositions, brainPositions, random } = data;

  // BACKGROUND PARTICLES - appear FIRST (0-600ms, fully visible by ~800ms)
  // CORE PARTICLE - appears AFTER background is established (1200ms-2200ms)
  
  for (let i = 0; i < TOTAL_MAIN; i++) {
    const i3 = i * 3;

    if (i === 0) {
      // CORE PARTICLE - INVISIBLE until background is established
      // Background stars appear first (0-600ms), then core fades in (1200-2200ms)
      const CORE_VISIBLE_START = 1200; // Core starts appearing AFTER background is fully visible
      const CORE_DURATION = 1000; // 1s to fully appear for dramatic effect
      const coreT = Math.max(0, Math.min(1, (stateElapsed - CORE_VISIBLE_START) / CORE_DURATION));
      const coreEased = easeOutCubic(coreT);
      
      positions[i3] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = 0;
      colors[i3] = coreColor.r;
      colors[i3 + 1] = coreColor.g;
      colors[i3 + 2] = coreColor.b;
      sizes[i] = (3.0 + Math.sin(time * 2) * 0.25) * coreEased;
      alphas[i] = 0.9 * coreEased;
      continue;
    }

    const rnd = random[i];
    
    // BACKGROUND PARTICLES - appear FIRST before core
    const brainX = brainPositions[i3];
    const brainY = brainPositions[i3 + 1];
    const brainZ = brainPositions[i3 + 2];
    const distFromCenter = Math.sqrt(brainX * brainX + brainY * brainY + brainZ * brainZ);
    
    // Background appears quickly over 600ms - completes WELL BEFORE core starts (1200ms)
    const BG_ENTRY = 600; // 0.6s for full appearance
    // Particles closer to center appear first, outer particles follow
    const distDelay = (distFromCenter / 150) * 0.08;
    const rndDelay = rnd * 0.03;
    const t = Math.max(0, Math.min(1, (stateElapsed / BG_ENTRY) - distDelay - rndDelay));
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

    // Subtle twinkle for depth without noisy brightness pumping.
    const twinkle = Math.sin(time * (0.35 + rnd * 0.8) + rnd * 6.283);
    const glimmerIntensity = (Math.max(0, twinkle) * 0.12 + 0.08) * eased;
    
    const brightness = 0.62 + glimmerIntensity * 0.35;
    colors[i3] = (BRAIN_COLOR_R + STAR1_DIFF_R * eased) * brightness;
    colors[i3 + 1] = (BRAIN_COLOR_G + STAR1_DIFF_G * eased) * brightness;
    colors[i3 + 2] = (BRAIN_COLOR_B + STAR1_DIFF_B * eased) * brightness;

    const baseSize = 0.5 + rnd * 0.3 + (0.7 + rnd * 0.5) * eased;
    sizes[i] = (baseSize + glimmerIntensity * 0.2) * eased;
    // Background fully visible before core starts
    alphas[i] = (0.4 + rnd * 0.3) * eased + glimmerIntensity * 0.12;
  }
}

// ============================================
// State 2 & 3: Charging Shell and Solar System
// ============================================

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
const CORE_WHITE_R = 1.0;
const CORE_WHITE_G = 1.0;
const CORE_WHITE_B = 1.0;
const CORE_WHITE_TO_ORANGE_R = ORANGE_R - CORE_WHITE_R;
const CORE_WHITE_TO_ORANGE_G = ORANGE_G - CORE_WHITE_G;
const CORE_WHITE_TO_ORANGE_B = ORANGE_B - CORE_WHITE_B;

// Event milestone tracking for State 2 text animations
export const STATE2_MILESTONES = {
  SUBSTATE_1_START: 0,
  SUBSTATE_1_END: 6000,
  SUBSTATE_2_START: 6000,
  SUBSTATE_2_END: 10000,
  SUBSTATE_3_START: 10000,
  SUBSTATE_3_END: 13000,
} as const;

function getClusteredSpikeRadius(
  time: number,
  stableRadius: number,
  envelope: number,
  clusterWeight: number,
  clusterPhase: number,
  clusterPhaseLag: number
): number {
  if (clusterWeight <= 0 || envelope <= 0) return stableRadius;

  const frequency = STATE2_SPIKE_FREQUENCY + Math.sin(clusterPhase * 1.7) * STATE2_SPIKE_FREQUENCY_JITTER;
  const amplitude = SHELL_RADIUS * STATE2_SPIKE_BOUNCE_STRENGTH;
  const signedOffset = envelope * clusterWeight * amplitude * Math.sin(time * frequency + clusterPhase + clusterPhaseLag);
  const minRadius = stableRadius * STATE2_SPIKE_MIN_RADIUS_RATIO;

  return Math.max(minRadius, stableRadius + signedOffset);
}

function animateBackgroundStarfieldParticle(
  attributes: ParticleAttributes,
  data: ParticleData,
  index: number,
  stateElapsed: number,
  snapshotPositions: Float32Array,
  time: number,
  state: AppState
): void {
  const { positions, colors, sizes, alphas } = attributes;
  const { homePositions, random } = data;
  const i3 = index * 3;
  const rnd = random[index];
  const settleT = easeOutCubic(Math.min(1, stateElapsed / 1400));
  const drift = state === 3 ? 0.42 : 0.28;
  const phase = rnd * 6.283 + index * 0.07;
  const hx = homePositions[i3];
  const hy = homePositions[i3 + 1];
  const hz = homePositions[i3 + 2];
  const sx = snapshotPositions[i3];
  const sy = snapshotPositions[i3 + 1];
  const sz = snapshotPositions[i3 + 2];

  positions[i3] = sx + (hx - sx) * settleT + Math.sin(time * 0.22 + phase) * drift;
  positions[i3 + 1] = sy + (hy - sy) * settleT + Math.cos(time * 0.18 + phase) * drift;
  positions[i3 + 2] = sz + (hz - sz) * settleT + Math.sin(time * 0.16 + phase * 0.7) * drift;

  const twinkle = Math.sin(time * (0.22 + rnd * 0.35) + phase) * 0.5 + 0.5;
  const warmth = state === 3 ? 0.12 : 0;
  const brightness = 0.52 + twinkle * 0.12 + rnd * 0.1;
  colors[i3] = (STAR_COLOR_R + warmth * (ORANGE_R - STAR_COLOR_R)) * brightness;
  colors[i3 + 1] = (STAR_COLOR_G + warmth * (ORANGE_G - STAR_COLOR_G)) * brightness;
  colors[i3 + 2] = (STAR_COLOR_B + warmth * (ORANGE_B - STAR_COLOR_B)) * brightness;
  sizes[index] = 0.75 + rnd * 0.45 + twinkle * 0.12;
  alphas[index] = 0.42 + rnd * 0.28 + twinkle * 0.08;
}

export function animateState2And3(
  attributes: ParticleAttributes,
  data: ParticleData,
  state: AppState,
  stateElapsed: number,
  snapshotPositions: Float32Array,
  time: number,
  _speed: number,
  shellAngle: number,
  coreColor: THREE.Color,
  _primaryColor: THREE.Color,
  _secondaryColor: THREE.Color
): void {
  void _speed;
  void _primaryColor;
  void _secondaryColor;
  const { positions, colors, sizes, alphas } = attributes;
  const {
    random,
    shellParticle,
    fibonacciPositions,
    state2ClusterWeight,
    state2ClusterPhase,
    state2ClusterPhaseLag,
  } = data;

  // Core particle hidden in state 3
  if (state === 3) {
    sizes[0] = 0;
    alphas[0] = 0;
  }

  for (let i = 1; i < TOTAL_MAIN; i++) {
    const i3 = i * 3;
    const rnd = random[i];

    if (!shellParticle[i]) {
      animateBackgroundStarfieldParticle(
        attributes,
        data,
        i,
        stateElapsed,
        snapshotPositions,
        time,
        state
      );
      continue;
    }

    // Rotation for shell positioning
    const cosA = Math.cos(shellAngle);
    const sinA = Math.sin(shellAngle);
    
    // Fibonacci sphere target position (pre-calculated)
    const fibTargetX = fibonacciPositions[i3];
    const fibTargetY = fibonacciPositions[i3 + 1];
    const fibTargetZ = fibonacciPositions[i3 + 2];
    const stableX = fibTargetX * cosA - fibTargetZ * sinA;
    const stableZ = fibTargetX * sinA + fibTargetZ * cosA;
    const stableY = fibTargetY;
    const stableRadius = Math.sqrt(stableX * stableX + stableY * stableY + stableZ * stableZ) || 1;
    const stableUnitX = stableX / stableRadius;
    const stableUnitY = stableY / stableRadius;
    const stableUnitZ = stableZ / stableRadius;

    if (state === 2) {
      // STATE 2: CHARGING SHELL with 3 substates (0-13000ms)
      // 
      // Substate 1 (0-6000ms): Particles flow from starfield to Fibonacci positions
      // Substate 2 (6000-10000ms): Calm damped overshoot with decay
      // Substate 3 (10000-13000ms): Stable sphere with color shift + compression
      
      // Start from starfield position
      const startX = snapshotPositions[i3];
      const startY = snapshotPositions[i3 + 1];
      const startZ = snapshotPositions[i3 + 2];
      
      // Fibonacci target (final destination)
      const fibX = fibTargetX;
      const fibY = fibTargetY;
      const fibZ = fibTargetZ;
      
      // Substate 1 draw-in duration (0-6000ms)
      const drawInDuration = STATE2_ABSORPTION_DURATION;
      const transitionStart = STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION * 0.35;
      const transitionDuration = STATE2_DURATION - transitionStart;
      
      // Keep a small stagger for texture, but ensure everyone moves early enough
      // to avoid a late jump right before substate 2.
      const indexDelay = (i / TOTAL_MAIN) * 420;
      const randomDelay = rnd * 280;
      const phaseOffset = Math.sin((i % 23) * 0.27) * 120;
      const particleDelay = indexDelay + randomDelay + phaseOffset;
      
      const drawInElapsed = Math.max(0, stateElapsed - particleDelay);
      const drawInProgress = Math.min(1, drawInElapsed / drawInDuration);
      const stabilizationEnd = STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION;
      const transitionT = Math.min(1, Math.max(0, (stateElapsed - transitionStart) / transitionDuration));
      const colorT = transitionT;
      const transitionEased = easeOutCubic(transitionT);
      const substate3Start = STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION;
      const substate3T = Math.min(1, Math.max(0, (stateElapsed - substate3Start) / (STATE2_DURATION - substate3Start)));
      const bounceDecayProgress = Math.min(
        1,
        Math.max(0, (stateElapsed - transitionStart) / (stabilizationEnd - transitionStart))
      );
      const compressionFactor = 1 - transitionEased * 0.2;
      const compressedStableRadius = stableRadius * compressionFactor;
      const volatilityEnvelope =
        easeOutCubic(drawInProgress) *
        Math.pow(Math.max(0, 1 - bounceDecayProgress), 0.9);
      const clusterWeight = state2ClusterWeight[i];
      const clusterPhase = state2ClusterPhase[i];
      const clusterPhaseLag = state2ClusterPhaseLag[i];
      // Faster early pull-in to avoid sluggish start.
      const drawInEased = easeOutCubic(drawInProgress);
      if (i === 1 && substate3T > 0) {
        const coreColorT = easeOutCubic(substate3T);
        const glowEntrance = easeInOutCubic(substate3T);
        const orangePulse = Math.sin(time * 4.4) * 0.5 + 0.5;
        const glowBoost = 1 + orangePulse * 1.5 * glowEntrance;
        const coreR = (CORE_WHITE_R + CORE_WHITE_TO_ORANGE_R * coreColorT) * glowBoost;
        const coreG = (CORE_WHITE_G + CORE_WHITE_TO_ORANGE_G * coreColorT) * glowBoost;
        const coreB = (CORE_WHITE_B + CORE_WHITE_TO_ORANGE_B * coreColorT) * glowBoost;

        coreColor.setRGB(coreR, coreG, coreB);
        colors[0] = coreR;
        colors[1] = coreG;
        colors[2] = coreB;
        sizes[0] = 4.2 + glowEntrance * (38 + orangePulse * 18);
        alphas[0] = 0.95 + glowEntrance * 0.05;
      }
      
      // Calculate progress and base position based on substate
      if (stateElapsed < STATE2_ABSORPTION_DURATION) {
        // Substate 1: Particles coming from starfield
        // Radial approach with volatile bounce that decays as the shell forms.
        
        // Calculate direction from start to Fibonacci target
        const toFibX = fibX - startX;
        const toFibY = fibY - startY;
        const toFibZ = fibZ - startZ;
        
        // Current position: interpolate from starfield toward Fibonacci
        // Full progress to reach target by end of substate 1
        const cx = startX + toFibX * drawInEased;
        const cy = startY + toFibY * drawInEased;
        const cz = startZ + toFibZ * drawInEased;
        
        // Apply rotation to create spinning effect
        const rx = cx * cosA - cz * sinA;
        const rz = cx * sinA + cz * cosA;
        const ry = cy;
        
        const displacedRadius = getClusteredSpikeRadius(
          time,
          compressedStableRadius,
          volatilityEnvelope,
          clusterWeight,
          clusterPhase,
          clusterPhaseLag
        );
        const displacedX = stableUnitX * displacedRadius;
        const displacedY = stableUnitY * displacedRadius;
        const displacedZ = stableUnitZ * displacedRadius;

        positions[i3] = rx + (displacedX - rx) * drawInEased;
        positions[i3 + 1] = ry + (displacedY - ry) * drawInEased;
        positions[i3 + 2] = rz + (displacedZ - rz) * drawInEased;
        
      } else if (stateElapsed < STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION) {
        // Substate 2: Calm shell overshoot with smooth ramp in and decay out
        const s2Elapsed = stateElapsed - STATE2_ABSORPTION_DURATION;
        const s2Progress = s2Elapsed / STATE2_STABILIZE_DURATION;
        const preFx = startX + (fibX - startX) * drawInEased;
        const preFy = startY + (fibY - startY) * drawInEased;
        const preFz = startZ + (fibZ - startZ) * drawInEased;

        const hasReachedShell = drawInProgress >= 1;

        // Before arrival, continue settling towards circumference.
        const settleToAnchor = hasReachedShell ? 1 : Math.min(1, s2Progress / 0.2);
        const anchorX = preFx + (fibX - preFx) * settleToAnchor;
        const anchorY = preFy + (fibY - preFy) * settleToAnchor;
        const anchorZ = preFz + (fibZ - preFz) * settleToAnchor;

        // Apply rotation for spinning
        const fx = anchorX * cosA - anchorZ * sinA;
        const fz = anchorX * sinA + anchorZ * cosA;
        const fy = anchorY;
        
        const displacedRadius = getClusteredSpikeRadius(
          time,
          compressedStableRadius,
          volatilityEnvelope,
          clusterWeight,
          clusterPhase,
          clusterPhaseLag
        );
        const settleMix = Math.min(1, s2Progress / 0.18);
        const baseX = fx + (stableUnitX * compressedStableRadius - fx) * settleMix;
        const baseY = fy + (stableUnitY * compressedStableRadius - fy) * settleMix;
        const baseZ = fz + (stableUnitZ * compressedStableRadius - fz) * settleMix;
        const displacedX = stableUnitX * displacedRadius;
        const displacedY = stableUnitY * displacedRadius;
        const displacedZ = stableUnitZ * displacedRadius;
        
        positions[i3] = baseX + (displacedX - baseX) * drawInEased;
        positions[i3 + 1] = baseY + (displacedY - baseY) * drawInEased;
        positions[i3 + 2] = baseZ + (displacedZ - baseZ) * drawInEased;
        
      } else {
        // Substate 3: Stable Fibonacci sphere with compression + color
        // Final Fibonacci position with compression
        const fx = fibX * compressionFactor;
        const fy = fibY * compressionFactor;
        const fz = fibZ * compressionFactor;
        
        const rx = fx * cosA - fz * sinA;
        const rz = fx * sinA + fz * cosA;
        
        positions[i3] = rx;
        positions[i3 + 1] = fy;
        positions[i3 + 2] = rz;
      }
      
      // Color interpolation begins when the bounce decay starts.
      const colorEased = easeOutCubic(colorT);
      const shellGlow = easeInOutCubic(substate3T);
      const shellPulse = Math.sin(time * 3.1 + rnd * 2.4) * 0.5 + 0.5;
      const flicker = (1 - colorT) * Math.sin(time * 0.7 + rnd * 5) * 0.04;
      const brightness = 0.88 + flicker + shellGlow * (0.32 + shellPulse * 0.14);
      colors[i3] = (BLUE_R + BLUE_TO_ORANGE_R * colorEased) * brightness;
      colors[i3 + 1] = (BLUE_G + BLUE_TO_ORANGE_G * colorEased) * brightness;
      colors[i3 + 2] = (BLUE_B + BLUE_TO_ORANGE_B * colorEased) * brightness;
      
      // Size with variation
      sizes[i] = 1.6 + rnd * 0.4 + shellGlow * (0.7 + shellPulse * 0.35);
      alphas[i] = 0.9 + shellGlow * 0.08;
      
    } else {
      // STATE 3: SOLAR SYSTEM - stable Fibonacci sphere with 20% compression
      const compressionFactor = 0.8;
      
      // Apply compression and rotation to Fibonacci position
      const fx = fibTargetX * compressionFactor;
      const fy = fibTargetY * compressionFactor;
      const fz = fibTargetZ * compressionFactor;
      
      const rx = fx * cosA - fz * sinA;
      const rz = fx * sinA + fz * cosA;
      
      const breathe = Math.sin(stateElapsed * 0.001 + random[i] * 10) * 0.2;
      const breatheScale = 1 + breathe / (SHELL_RADIUS * compressionFactor);
      
      positions[i3] = rx * breatheScale;
      positions[i3 + 1] = fy * breatheScale;
      positions[i3 + 2] = rz * breatheScale;

      const shellPulse = Math.sin(stateElapsed * 0.0031 + rnd * 2.4) * 0.5 + 0.5;
      const brightness = 1.18 + shellPulse * 0.12;
      colors[i3] = ORANGE_R * brightness;
      colors[i3 + 1] = ORANGE_G * brightness;
      colors[i3 + 2] = ORANGE_B * brightness;

      sizes[i] = 2.3 + rnd * 0.3 + shellPulse * 0.25;
      alphas[i] = 0.98;
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
  speed: number,
  frameScale: number
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
    const linearEntry = entryProgress;

    const endPos = new THREE.Vector3(
      Math.cos(planet.angle) * planet.radius,
      0,
      Math.sin(planet.angle) * planet.radius
    );
    endPos.applyEuler(SHARED_ROTATION);

    planet.group.position.lerpVectors(startPos, endPos, linearEntry);

    const startScale = 5.0;
    const endScale = 1.0;
    const s = startScale + (endScale - startScale) * linearEntry;
    planet.group.scale.set(s, s, s);

    // Once entered, orbit at 2x speed
    if (entryProgress >= 1) {
      const prevAngle = planet.angle;
      planet.angle += planet.speed * 0.06 * speed * frameScale; // 2x faster orbit speed
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
  frameScale: number,
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
      const damping = Math.pow(BURST_DAMPING, frameScale);
      
      for (let i = 0; i < TOTAL_MAIN; i++) {
        const i3 = i * 3;

        if (migrator[i]) {
          // Apply damping to velocity
          burstVelocities[i3] *= damping;
          burstVelocities[i3 + 1] *= damping;
          burstVelocities[i3 + 2] *= damping;

          // Update position
          positions[i3] += burstVelocities[i3] * frameScale;
          positions[i3 + 1] += burstVelocities[i3 + 1] * frameScale;
          positions[i3 + 2] += burstVelocities[i3 + 2] * frameScale;

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
