import * as THREE from 'three';
import type { ParticleAttributes, ParticleData } from '@/types';
import {
  TOTAL_MAIN,
  TRAIL_LENGTH,
  SHELL_RADIUS,
  MIGRATOR_RATIO,
  SHELL_PARTICLE_RATIO,
  STATE2_SPIKE_CLUSTER_LEADER_RATIO,
  STATE2_SPIKE_LEADER_WEIGHT,
  STATE2_SPIKE_RING1_WEIGHT,
  STATE2_SPIKE_RING2_WEIGHT,
} from './constants';
import {
  generateHomePositions,
  generateSpherePositions,
  generateDirections,
  shuffleIndices,
  calculateState2Radius,
  generateBrainPositions,
  generateFibonacciPositions,
} from './geometry';

const STATE2_SPIKE_RING1_COUNT = 5;
const STATE2_SPIKE_RING2_COUNT = 10;

function deterministicUnit(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function assignClusterParticle(
  index: number,
  weight: number,
  phase: number,
  lag: number,
  clusterWeight: Float32Array,
  clusterPhase: Float32Array,
  clusterPhaseLag: Float32Array
): void {
  if (weight <= clusterWeight[index]) return;

  clusterWeight[index] = weight;
  clusterPhase[index] = phase;
  clusterPhaseLag[index] = lag;
}

function initializeState2SpikeClusters(data: ParticleData): void {
  const shellIndices: number[] = [];
  for (let i = 1; i < TOTAL_MAIN; i++) {
    if (data.shellParticle[i]) {
      shellIndices.push(i);
    }
  }

  const shellCount = shellIndices.length;
  const leaderCount = Math.max(1, Math.round(shellCount * STATE2_SPIKE_CLUSTER_LEADER_RATIO));
  const leaderStride = shellCount / leaderCount;

  for (let leaderSlot = 0; leaderSlot < leaderCount; leaderSlot++) {
    const leaderIndex = shellIndices[Math.floor(leaderSlot * leaderStride + leaderStride * 0.37) % shellCount];
    const leaderI3 = leaderIndex * 3;
    const leaderX = data.fibonacciPositions[leaderI3];
    const leaderY = data.fibonacciPositions[leaderI3 + 1];
    const leaderZ = data.fibonacciPositions[leaderI3 + 2];
    const phase = deterministicUnit(leaderIndex + leaderSlot * 101) * Math.PI * 2;
    const nearest: { index: number; distSq: number }[] = [];

    for (const i of shellIndices) {
      if (i === leaderIndex) continue;

      const i3 = i * 3;
      const dx = data.fibonacciPositions[i3] - leaderX;
      const dy = data.fibonacciPositions[i3 + 1] - leaderY;
      const dz = data.fibonacciPositions[i3 + 2] - leaderZ;
      nearest.push({ index: i, distSq: dx * dx + dy * dy + dz * dz });
    }

    nearest.sort((a, b) => a.distSq - b.distSq);
    assignClusterParticle(
      leaderIndex,
      STATE2_SPIKE_LEADER_WEIGHT,
      phase,
      0,
      data.state2ClusterWeight,
      data.state2ClusterPhase,
      data.state2ClusterPhaseLag
    );

    for (let n = 0; n < STATE2_SPIKE_RING1_COUNT && n < nearest.length; n++) {
      assignClusterParticle(
        nearest[n].index,
        STATE2_SPIKE_RING1_WEIGHT,
        phase,
        0.1 + n * 0.018,
        data.state2ClusterWeight,
        data.state2ClusterPhase,
        data.state2ClusterPhaseLag
      );
    }

    for (
      let n = STATE2_SPIKE_RING1_COUNT;
      n < STATE2_SPIKE_RING1_COUNT + STATE2_SPIKE_RING2_COUNT && n < nearest.length;
      n++
    ) {
      assignClusterParticle(
        nearest[n].index,
        STATE2_SPIKE_RING2_WEIGHT,
        phase,
        0.22 + (n - STATE2_SPIKE_RING1_COUNT) * 0.014,
        data.state2ClusterWeight,
        data.state2ClusterPhase,
        data.state2ClusterPhaseLag
      );
    }
  }
}

/**
 * Initialize all particle data arrays
 * Returns both the particle data and buffer attributes for Three.js
 */
export function initializeParticleData(): {
  data: ParticleData;
  attributes: ParticleAttributes;
} {
  // Data arrays (not directly used by GPU)
  const data: ParticleData = {
    homePositions: new Float32Array(TOTAL_MAIN * 3),
    spherePositions: new Float32Array(TOTAL_MAIN * 3),
    directions: new Float32Array(TOTAL_MAIN * 3),
    random: new Float32Array(TOTAL_MAIN),
    migrator: new Uint8Array(TOTAL_MAIN),
    shellParticle: new Uint8Array(TOTAL_MAIN),
    migratorDelay: new Float32Array(TOTAL_MAIN),
    nonMigratorDelay: new Float32Array(TOTAL_MAIN),
    burstVelocity: new Float32Array(TOTAL_MAIN * 3),
    migratorIndexMap: new Int32Array(TOTAL_MAIN),
    state2Radius: new Float32Array(TOTAL_MAIN),
    state2ClusterWeight: new Float32Array(TOTAL_MAIN),
    state2ClusterPhase: new Float32Array(TOTAL_MAIN),
    state2ClusterPhaseLag: new Float32Array(TOTAL_MAIN),
    brainPositions: new Float32Array(TOTAL_MAIN * 3),
    fibonacciPositions: new Float32Array(TOTAL_MAIN * 3),
  };

  // Buffer attributes (directly used by GPU)
  const attributes: ParticleAttributes = {
    positions: new Float32Array(TOTAL_MAIN * 3),
    colors: new Float32Array(TOTAL_MAIN * 3),
    sizes: new Float32Array(TOTAL_MAIN),
    alphas: new Float32Array(TOTAL_MAIN),
    random: new Float32Array(TOTAL_MAIN),
    migrator: new Float32Array(TOTAL_MAIN),
  };

  // Generate positions
  generateHomePositions(TOTAL_MAIN, data.homePositions);
  generateSpherePositions(TOTAL_MAIN, data.spherePositions, SHELL_RADIUS);
  generateDirections(data.spherePositions, data.directions);
  generateBrainPositions(TOTAL_MAIN, data.brainPositions, 1.2);
  // Generate Fibonacci positions for all particles (particle 0 is core, will be at origin)
  generateFibonacciPositions(TOTAL_MAIN, data.fibonacciPositions, SHELL_RADIUS);

  // Initialize random values and calculate state 2 radii
  for (let i = 0; i < TOTAL_MAIN; i++) {
    data.random[i] = Math.random();
    data.state2Radius[i] = calculateState2Radius(SHELL_RADIUS, data.random[i]);
    data.migratorIndexMap[i] = -1;
  }

  const shellParticleCount = Math.round((TOTAL_MAIN - 1) * SHELL_PARTICLE_RATIO);
  let assignedShellParticles = 0;
  for (let i = 1; i < TOTAL_MAIN && assignedShellParticles < shellParticleCount; i += 2) {
    data.shellParticle[i] = 1;
    assignedShellParticles++;
  }
  for (let i = 2; i < TOTAL_MAIN && assignedShellParticles < shellParticleCount; i += 2) {
    data.shellParticle[i] = 1;
    assignedShellParticles++;
  }

  initializeState2SpikeClusters(data);

  // Assign migrators
  const shuffledIndices = shuffleIndices(TOTAL_MAIN);
  const migratorCount = Math.floor(TOTAL_MAIN * MIGRATOR_RATIO);

  for (let i = 0; i < migratorCount; i++) {
    data.migrator[shuffledIndices[i]] = 1;
  }

  // Calculate delays for migrators and non-migrators
  let migratorIdx = 0;
  let nonMigratorIdx = 0;

  for (let i = 0; i < TOTAL_MAIN; i++) {
    if (data.migrator[i]) {
      data.migratorDelay[i] = migratorIdx * (1000 / (migratorCount - 1 || 1));
      data.migratorIndexMap[i] = migratorIdx;
      migratorIdx++;
    } else {
      data.nonMigratorDelay[i] = nonMigratorIdx * (1000 / (migratorCount - 1 || 1));
      nonMigratorIdx++;
    }
  }

  // Initialize buffer attributes
  const initialColor = new THREE.Color('#ffd700');
  
  for (let i = 0; i < TOTAL_MAIN; i++) {
    const i3 = i * 3;
    
    // Start all particles at origin
    attributes.positions[i3] = 0;
    attributes.positions[i3 + 1] = 0;
    attributes.positions[i3 + 2] = 0;
    
    // First particle is the core (larger, visible)
    if (i === 0) {
      attributes.sizes[i] = 20;
      attributes.alphas[i] = 1;
    } else {
      attributes.sizes[i] = 0;
      attributes.alphas[i] = 0;
    }
    
    // Copy random and migrator data
    attributes.random[i] = data.random[i];
    attributes.migrator[i] = data.migrator[i];
    
    // Set initial color
    attributes.colors[i3] = initialColor.r;
    attributes.colors[i3 + 1] = initialColor.g;
    attributes.colors[i3 + 2] = initialColor.b;
  }

  return { data, attributes };
}

/**
 * Create BufferGeometry from particle attributes
 */
export function createParticleGeometry(
  attributes: ParticleAttributes
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(attributes.positions, 3)
  );
  geometry.setAttribute(
    'color',
    new THREE.BufferAttribute(attributes.colors, 3)
  );
  geometry.setAttribute(
    'size',
    new THREE.BufferAttribute(attributes.sizes, 1)
  );
  geometry.setAttribute(
    'alpha',
    new THREE.BufferAttribute(attributes.alphas, 1)
  );
  geometry.setAttribute(
    'random',
    new THREE.BufferAttribute(attributes.random, 1)
  );
  geometry.setAttribute(
    'migrator',
    new THREE.BufferAttribute(attributes.migrator, 1)
  );

  return geometry;
}

/**
 * Calculate migrator count from data
 */
export function getMigratorCount(data: ParticleData): number {
  return data.migrator.filter((m) => m === 1).length;
}

/**
 * Initialize trail history array
 */
export function initializeTrailHistory(migratorCount: number): Float32Array {
  return new Float32Array(migratorCount * TRAIL_LENGTH * 3);
}

/**
 * Initialize trail position array for LineSegments
 */
export function initializeTrailPositions(migratorCount: number): Float32Array {
  return new Float32Array(migratorCount * (TRAIL_LENGTH - 1) * 6);
}
