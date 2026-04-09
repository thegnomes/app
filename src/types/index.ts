// ============================================
// Global Application Types
// ============================================

/** Application state representing different animation phases */
export type AppState = 0 | 1 | 2 | 3 | 4;

/** Configuration for particle system behavior and appearance */
export interface ParticleConfig {
  speed: number;
  centerColor: string;
  ambientColor: string;
}

/** Planet configuration for solar system state */
export interface PlanetConfig {
  radius: number;
  size: number;
  speed: number;
  color: string;
}

/** Particle attribute arrays for Three.js buffer geometry */
export interface ParticleAttributes {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  alphas: Float32Array;
  random: Float32Array;
  migrator: Float32Array;
}

/** References to particle data arrays */
export interface ParticleData {
  homePositions: Float32Array;
  spherePositions: Float32Array;
  directions: Float32Array;
  random: Float32Array;
  migrator: Uint8Array;
  migratorDelay: Float32Array;
  nonMigratorDelay: Float32Array;
  burstVelocity: Float32Array;
  migratorIndexMap: Int32Array;
  state2Radius: Float32Array;
  brainPositions: Float32Array;
  fibonacciPositions: Float32Array; // Target positions on Fibonacci sphere
}

/** State labels for UI display */
export const STATE_LABELS: Record<AppState, string> = {
  0: 'Neural Brain',
  1: 'Starfield',
  2: 'Charging Shell',
  3: 'Solar System',
  4: 'Collapse',
};

/** Default particle configuration */
export const DEFAULT_CONFIG: ParticleConfig = {
  speed: 1.0,
  centerColor: '#ffd700',
  ambientColor: '#60a5fa',
};
