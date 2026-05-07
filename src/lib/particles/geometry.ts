import * as THREE from 'three';
import { SHELL_RADIUS } from './constants';

/**
 * Easing function: ease out cubic
 * Fast start, slow end
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Easing function: ease in cubic
 * Slow start, fast end
 * Good for gravitational acceleration feel
 */
export function easeInCubic(t: number): number {
  return t * t * t;
}

/**
 * Easing function: ease in-out cubic
 * Slow start, fast middle, slow end
 */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Easing function: ease in quad
 * Slight slow start, then linear-ish
 * Good for maintaining constant speed with gentle ramp
 */
export function easeInQuad(t: number): number {
  return t * t;
}

/**
 * Easing function: smooth step
 * Very gentle curve, nearly linear in middle
 */
export function smoothStep(t: number): number {
  return t * t * (3 - 2 * t);
}

/**
 * Generate random positions within a cube for home positions
 * @param count - Number of particles
 * @param out - Output Float32Array (length = count * 3)
 * @param spread - Spread range (default 260)
 */
export function generateHomePositions(
  count: number,
  out: Float32Array,
  spread: number = 260
): void {
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    out[i3] = (Math.random() - 0.5) * spread;
    out[i3 + 1] = (Math.random() - 0.5) * spread;
    out[i3 + 2] = (Math.random() - 0.5) * spread;
  }
}

/**
 * Generate positions on a sphere surface using golden spiral
 * @param count - Number of particles
 * @param out - Output Float32Array (length = count * 3)
 * @param radius - Sphere radius
 */
export function generateSpherePositions(
  count: number,
  out: Float32Array,
  radius: number = SHELL_RADIUS
): void {
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const y = 1 - (i / (count - 1)) * 2;
    const rAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;
    
    out[i3] = Math.cos(theta) * rAtY * radius;
    out[i3 + 1] = y * radius;
    out[i3 + 2] = Math.sin(theta) * rAtY * radius;
  }
}

/**
 * Generate Fibonacci sphere positions (same as generateSpherePositions but for clarity)
 * This creates a uniform distribution of points on a sphere surface
 * @param count - Number of particles (includes particle 0 which will be at origin)
 * @param out - Output Float32Array (length = count * 3)
 * @param radius - Sphere radius
 */
export function generateFibonacciPositions(
  count: number,
  out: Float32Array,
  radius: number = SHELL_RADIUS
): void {
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
  
  // Particle 0 (core) stays at origin
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  
  // Generate Fibonacci sphere positions for particles 1 to count-1
  // These will be the shell particles forming the sphere
  const shellCount = count - 1;
  
  for (let i = 1; i < count; i++) {
    const i3 = i * 3;
    // Use (i-1) for 0-indexed shell particles
    const particleIndex = i - 1;
    const y = 1 - (particleIndex / (shellCount - 1)) * 2; // Range: 1 to -1
    const rAtY = Math.sqrt(1 - y * y);
    const theta = phi * particleIndex;
    
    out[i3] = Math.cos(theta) * rAtY * radius;
    out[i3 + 1] = y * radius;
    out[i3 + 2] = Math.sin(theta) * rAtY * radius;
  }
}

/**
 * Generate direction vectors from sphere positions
 * @param spherePositions - Source sphere positions
 * @param out - Output Float32Array for directions
 */
export function generateDirections(
  spherePositions: Float32Array,
  out: Float32Array
): void {
  const count = spherePositions.length / 3;
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const len = Math.sqrt(
      spherePositions[i3] ** 2 + 
      spherePositions[i3 + 1] ** 2 + 
      spherePositions[i3 + 2] ** 2
    ) || 1;
    
    out[i3] = spherePositions[i3] / len;
    out[i3 + 1] = spherePositions[i3 + 1] / len;
    out[i3 + 2] = spherePositions[i3 + 2] / len;
  }
}

/**
 * Shuffle an array of indices using Fisher-Yates algorithm
 * @param length - Array length
 * @returns Shuffled array of indices
 */
export function shuffleIndices(length: number): number[] {
  const idxs = Array.from({ length }, (_, i) => i);
  
  for (let i = idxs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
  }
  
  return idxs;
}

/**
 * Generate orbit line geometry for a planet
 * @param radius - Orbit radius
 * @param segments - Number of segments
 * @returns BufferGeometry for the orbit line
 */
export function createOrbitGeometry(
  radius: number,
  segments: number
): THREE.BufferGeometry {
  const points: number[] = [];
  
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    );
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(points, 3)
  );
  
  return geometry;
}

/**
 * Generate orbit line geometry starting from a specific angle
 * @param radius - Orbit radius
 * @param segments - Number of segments
 * @param startAngle - Starting angle in radians
 * @returns BufferGeometry for the orbit line
 */
export function createOrbitGeometryFromAngle(
  radius: number,
  segments: number,
  startAngle: number
): THREE.BufferGeometry {
  const points: number[] = [];
  
  for (let i = 0; i <= segments; i++) {
    const angle = startAngle + (i / segments) * Math.PI * 2;
    points.push(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    );
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(points, 3)
  );
  
  return geometry;
}

/**
 * Calculate random radius for state 2 particles
 * @param baseRadius - Base shell radius
 * @param random - Random value (0-1)
 * @returns Varied radius
 */
export function calculateState2Radius(
  baseRadius: number,
  random: number
): number {
  return baseRadius * (0.2 + random * 1.3);
}

// ============================================
// Brain Geometry Generation
// ============================================

/**
 * Calculate distance from point to brain surface
 * Returns negative if inside, positive if outside
 */
function brainSDF(x: number, y: number, z: number): number {
  // Brain dimensions - more realistic proportions
  const width = 22;      // x-axis (left-right)
  const height = 16;     // y-axis (top-bottom)
  const depth = 18;      // z-axis (front-back)
  
  // Hemisphere separation
  const separation = 2;
  
  // Determine which hemisphere
  const isLeft = x < 0;
  const centerX = isLeft ? -separation : separation;
  
  // Normalized coordinates relative to hemisphere center
  const nx = (x - centerX) / width;
  const ny = y / height;
  const nz = z / depth;
  
  // Base ellipsoid shape
  let dist = Math.sqrt(nx * nx + ny * ny + nz * nz) - 1.0;
  
  // Add gyri/sulci (brain folds) using multiple sine waves
  // This creates the wrinkled surface appearance
  const foldFreqX = 4.0;
  const foldFreqY = 6.0;
  const foldFreqZ = 3.0;
  const foldAmp = 0.15;
  
  const folds = Math.sin(x * foldFreqX) * 
                Math.cos(y * foldFreqY) * 
                Math.sin(z * foldFreqZ);
  
  // Secondary finer folds
  const fineFolds = Math.sin(x * 8.0 + z * 2.0) * 
                    Math.cos(y * 10.0) * 0.5;
  
  // Combine distance with surface detail
  dist += (folds + fineFolds * 0.3) * foldAmp;
  
  // Flatten the bottom (brain stem area)
  if (y < -height * 0.6) {
    const stemFactor = Math.abs(y + height * 0.6) / (height * 0.4);
    dist += stemFactor * stemFactor * 0.5;
  }
  
  // Round the top
  if (y > height * 0.7) {
    const topFactor = (y - height * 0.7) / (height * 0.3);
    dist += topFactor * topFactor * 0.3;
  }
  
  return dist;
}

/**
 * Get random point on brain surface using rejection sampling
 */
function getBrainSurfacePoint(): { x: number; y: number; z: number } {
  let attempts = 0;
  const maxAttempts = 100;
  
  while (attempts < maxAttempts) {
    attempts++;
    
    // Generate random point in bounding box
    const x = (Math.random() - 0.5) * 50;
    const y = (Math.random() - 0.5) * 35;
    const z = (Math.random() - 0.5) * 40;
    
    const dist = brainSDF(x, y, z);
    
    // Accept points near the surface (within a small threshold)
    // This creates a shell/surface distribution rather than volume
    if (Math.abs(dist) < 0.15 && dist <= 0) {
      return { x, y, z };
    }
  }
  
  // Fallback: return a point on an ellipsoid approximation
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  
  return {
    x: Math.cos(theta) * Math.sin(phi) * 20,
    y: Math.cos(phi) * 14,
    z: Math.sin(theta) * Math.sin(phi) * 16
  };
}

/**
 * Generate 3D brain-shaped particle positions on the surface
 * @param count - Number of particles to generate
 * @param out - Output Float32Array (length = count * 3)
 * @param scale - Scale factor (default 1)
 */
export function generateBrainPositions(
  count: number,
  out: Float32Array,
  scale: number = 1
): void {
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const point = getBrainSurfacePoint();
    
    out[i3] = point.x * scale;
    out[i3 + 1] = point.y * scale;
    out[i3 + 2] = point.z * scale;
  }
}

/**
 * Generate neural connection lines between nearby brain particles
 * Creates a dense neural network appearance
 * @param positions - Particle positions
 * @param maxConnections - Max connections per particle
 * @param connectionDistance - Max distance for connection
 * @returns Float32Array of line segment positions
 */
export function generateBrainConnections(
  positions: Float32Array,
  maxConnections: number = 4,
  connectionDistance: number = 5
): Float32Array {
  const count = positions.length / 3;
  const connections: number[] = [];
  
  // Build a spatial hash for faster neighbor finding
  const gridSize = connectionDistance;
  const grid = new Map<string, number[]>();
  
  // Add all points to grid
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const gx = Math.floor(positions[i3] / gridSize);
    const gy = Math.floor(positions[i3 + 1] / gridSize);
    const gz = Math.floor(positions[i3 + 2] / gridSize);
    const key = `${gx},${gy},${gz}`;
    
    if (!grid.has(key)) grid.set(key, []);
    grid.get(key)!.push(i);
  }
  
  // Find connections using spatial hashing
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const gx = Math.floor(positions[i3] / gridSize);
    const gy = Math.floor(positions[i3 + 1] / gridSize);
    const gz = Math.floor(positions[i3 + 2] / gridSize);
    
    let connectionCount = 0;
    
    // Check neighboring grid cells
    for (let dx = -1; dx <= 1 && connectionCount < maxConnections; dx++) {
      for (let dy = -1; dy <= 1 && connectionCount < maxConnections; dy++) {
        for (let dz = -1; dz <= 1 && connectionCount < maxConnections; dz++) {
          const key = `${gx + dx},${gy + dy},${gz + dz}`;
          const cell = grid.get(key);
          
          if (!cell) continue;
          
          for (const j of cell) {
            if (j <= i || connectionCount >= maxConnections) continue;
            
            const j3 = j * 3;
            const distX = positions[i3] - positions[j3];
            const distY = positions[i3 + 1] - positions[j3 + 1];
            const distZ = positions[i3 + 2] - positions[j3 + 2];
            const dist = Math.sqrt(distX * distX + distY * distY + distZ * distZ);
            
            if (dist < connectionDistance) {
              connections.push(
                positions[i3], positions[i3 + 1], positions[i3 + 2],
                positions[j3], positions[j3 + 1], positions[j3 + 2]
              );
              connectionCount++;
            }
          }
        }
      }
    }
  }
  
  return new Float32Array(connections);
}
