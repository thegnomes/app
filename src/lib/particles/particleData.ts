import * as THREE from 'three';
import type { ParticleAttributes, ParticleData } from '@/types';
import { TOTAL_MAIN, TRAIL_LENGTH, SHELL_RADIUS } from './constants';
import {
  generateHomePositions,
  generateSpherePositions,
  generateDirections,
  shuffleIndices,
  calculateState2Radius,
  generateBrainPositions,
  generateFibonacciPositions,
} from './geometry';

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
    migratorDelay: new Float32Array(TOTAL_MAIN),
    nonMigratorDelay: new Float32Array(TOTAL_MAIN),
    burstVelocity: new Float32Array(TOTAL_MAIN * 3),
    migratorIndexMap: new Int32Array(TOTAL_MAIN),
    state2Radius: new Float32Array(TOTAL_MAIN),
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

  // Assign migrators (50% of particles)
  const shuffledIndices = shuffleIndices(TOTAL_MAIN);
  const migratorCount = Math.floor(TOTAL_MAIN / 2);

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
