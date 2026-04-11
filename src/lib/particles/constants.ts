import * as THREE from 'three';
import type { PlanetConfig } from '@/types';

// ============================================
// Timing Constants (milliseconds)
// ============================================

/** Duration of state 1 animation (particles spreading to home positions) */
export const STATE1_DURATION = 2000;

/** Duration of concentration phase in state 4 */
export const STATE4_CONCENTRATE = 1000;

/** Substate 1: Particle absorption with radial approach (0-6000ms) */
export const STATE2_ABSORPTION_DURATION = 6000;

/** Substate 2: Spike/thorn bounce decay to stable sphere (6000-10000ms) */
export const STATE2_STABILIZE_DURATION = 4000;

/** Substate 3: Compression + color shift (10000-11500ms) - reduced by half */
export const STATE2_COLOR_SHIFT_DURATION = 1500;

/** Duration of state 2 (charging shell phase) */
export const STATE2_DURATION =
  STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION + STATE2_COLOR_SHIFT_DURATION;

/** Duration for particles to stabilize in their orbits */
export const STABILIZE_DURATION = 5000;

/** Duration of travel animation for particles moving to shell */
export const TRAVEL_DURATION = 600;

/** Duration of planet entry animation */
export const PLANET_ENTRY_DURATION = 800;

/** Target frame duration used to normalize per-frame damping and rotation */
export const TARGET_FRAME_MS = 1000 / 60;

/** Maximum delta applied after frame stalls or tab inactivity */
export const MAX_FRAME_DELTA_MS = 50;

// ============================================
// Particle Counts
// ============================================

/** Total number of main particles */
export const TOTAL_MAIN = 1400;

/** Number of segments in orbit lines */
export const ORBIT_SEGMENTS = 84;

/** Length of trail for migrating particles */
export const TRAIL_LENGTH = 5;

/** Share of particles that migrate into shells and collapse trails */
export const MIGRATOR_RATIO = 0.25;

/** Share of non-core particles used to form the State 2/3 sphere shell */
export const SHELL_PARTICLE_RATIO = 0.5;

/** Global multiplier for particle point sizes */
export const PARTICLE_SIZE_MULTIPLIER = 1.5;

/** Share of shell particles that lead State 2 spike clusters */
export const STATE2_SPIKE_CLUSTER_LEADER_RATIO = 0.1;

/** Full radial weight for State 2 spike cluster leaders */
export const STATE2_SPIKE_LEADER_WEIGHT = 1.0;

/** Radial weight for the first nearby ring around a State 2 spike leader */
export const STATE2_SPIKE_RING1_WEIGHT = 0.65;

/** Radial weight for the second nearby ring around a State 2 spike leader */
export const STATE2_SPIKE_RING2_WEIGHT = 0.35;

/** Base amplitude multiplier for State 2 bipolar spike motion */
export const STATE2_SPIKE_BOUNCE_STRENGTH = 0.42;

/** Minimum radius ratio allowed for inward State 2 spike motion */
export const STATE2_SPIKE_MIN_RADIUS_RATIO = 0.38;

/** Base oscillation frequency for coherent State 2 spike clusters */
export const STATE2_SPIKE_FREQUENCY = 3.4;

/** Small per-cluster frequency spread for State 2 spike clusters */
export const STATE2_SPIKE_FREQUENCY_JITTER = 0.45;

// ============================================
// Geometry Constants
// ============================================

/** Radius of the shell sphere in state 2/3 */
export const SHELL_RADIUS = 27;

/** Shared rotation applied to orbit groups */
export const SHARED_ROTATION = new THREE.Euler(Math.PI * 0.12, Math.PI * 0.08, 0);

/** Camera initial Z position */
export const CAMERA_Z = 130;

/** Camera FOV */
export const CAMERA_FOV = 75;

/** Camera near plane */
export const CAMERA_NEAR = 0.1;

/** Camera far plane */
export const CAMERA_FAR = 1000;

/** Maximum pixel ratio for renderer */
export const MAX_PIXEL_RATIO = 2;

// ============================================
// Color Constants
// ============================================

/** Primary colors per state for particle interpolation */
export const STATE_PRIMARY_COLORS: THREE.Color[] = [
  new THREE.Color('#ffffff'), // State 0: Singularity (white)
  new THREE.Color('#ffffff'), // State 1: Star Field (white)
  new THREE.Color('#22d3ee'), // State 2: Cyan / Blue (cyan)
  new THREE.Color('#f97316'), // State 3: Orange / Red (orange)
  new THREE.Color('#a855f7'), // State 4: Purple / Green (purple)
];

/** Secondary colors per state for particle combination effect */
export const STATE_SECONDARY_COLORS: THREE.Color[] = [
  new THREE.Color('#ffffff'), // State 0: Singularity (white)
  new THREE.Color('#f8fafc'), // State 1: Star Field (slight cool white)
  new THREE.Color('#3b82f6'), // State 2: Cyan / Blue (blue)
  new THREE.Color('#ef4444'), // State 3: Orange / Red (red)
  new THREE.Color('#22c55e'), // State 4: Purple / Green (green)
];

/** Legacy color aliases for compatibility */
export const COLOR_S0 = STATE_PRIMARY_COLORS[0];
export const COLOR_S1 = STATE_PRIMARY_COLORS[1];
export const COLOR_S2 = STATE_PRIMARY_COLORS[2];
export const COLOR_S3 = STATE_PRIMARY_COLORS[3];
export const COLOR_S4A = STATE_PRIMARY_COLORS[4];
export const COLOR_S4B = STATE_SECONDARY_COLORS[4];

/** Default flash color */
export const FLASH_COLOR = new THREE.Color('#ffffff');

/** Trail color */
export const TRAIL_COLOR = new THREE.Color('#ffaa00');

// ============================================
// Planet Configurations
// ============================================

export const PLANETS: PlanetConfig[] = [
  { radius: 34, size: 3.2, speed: 1.1, color: '#60a5fa' },
  { radius: 46, size: 2.6, speed: 0.85, color: '#818cf8' },
  { radius: 60, size: 3.8, speed: 0.65, color: '#a78bfa' },
  { radius: 76, size: 2.2, speed: 0.48, color: '#f472b6' },
  { radius: 94, size: 2.9, speed: 0.36, color: '#34d399' },
  { radius: 114, size: 4.6, speed: 0.27, color: '#fbbf24' },
  { radius: 136, size: 2.4, speed: 0.2, color: '#fb7185' },
  { radius: 160, size: 3.5, speed: 0.15, color: '#22d3ee' },
];

// ============================================
// Core/Glow Mesh Constants
// ============================================

/** Core sphere geometry detail */
export const CORE_GEOMETRY_DETAIL = 64;

/** Core sphere radius */
export const CORE_RADIUS = 1.5;

/** Glow sphere radius */
export const GLOW_RADIUS = 6;

/** Glow opacity */
export const GLOW_OPACITY = 0.55;

/** Duration for the State 3 textured sun sphere to reveal */
export const SOLAR_VIDEO_CORE_TRANSITION_DURATION = 1000;

/** Share of procedural core intensity faded as the State 3 video surface enters */
export const SOLAR_VIDEO_CORE_PROCEDURAL_FADE = 0.86;

/** Radius for the State 3 textured sun sphere */
export const SOLAR_VIDEO_CORE_RADIUS = SHELL_RADIUS * 0.82;

/** Segment count for the State 3 textured sun sphere */
export const SOLAR_VIDEO_CORE_SEGMENTS = 96;

/** Peak opacity for the State 3 textured sun sphere */
export const SOLAR_VIDEO_CORE_OPACITY = 0.96;

/** Starting scale for the State 3 textured sun sphere reveal */
export const SOLAR_VIDEO_CORE_ENTRY_SCALE = 0.72;

/** Glow size multiplier for planet glow effect */
export const PLANET_GLOW_MULTIPLIER = 2.0;

/** Glow opacity for planet glow effect */
export const PLANET_GLOW_OPACITY = 0.45;

// ============================================
// Light Constants
// ============================================

/** Ambient light intensity */
export const AMBIENT_LIGHT_INTENSITY = 0x222222;

/** Sun (point) light intensity */
export const SUN_LIGHT_INTENSITY = 3;

/** Sun light distance */
export const SUN_LIGHT_DISTANCE = 300;

// ============================================
// Animation Constants
// ============================================

/** Camera movement amplitude */
export const CAMERA_MOVE_AMPLITUDE = 1.5;

/** Camera movement frequency */
export const CAMERA_MOVE_FREQUENCY = 0.05;

/** Flash mesh scale factor per frame */
export const FLASH_SCALE_FACTOR = 1.08;

/** Flash mesh opacity decay */
export const FLASH_OPACITY_DECAY = 0.02;

/** Burst velocity damping factor */
export const BURST_DAMPING = 0.992;

/** Burst duration in milliseconds */
export const BURST_DURATION = 1500;

/** Core color lerp factor */
export const CORE_COLOR_LERP = 0.04;

/** Ambient/secondary color lerp factor */
export const AMBIENT_COLOR_LERP = 0.04;

// ============================================
// State Timing Offsets
// ============================================

/** Delay between planet entries in state 3 */
export const PLANET_ENTRY_DELAY = 250;

/** Base entry time for planets in state 3 */
export const PLANET_ENTRY_BASE_TIME = 3000;

/** Auto-return timeout from state 4 to state 1 */
export const STATE4_RETURN_TIMEOUT = 2500;
