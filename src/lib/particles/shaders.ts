import type * as THREE from 'three';

// ============================================
// GLSL Shaders for Particle System
// ============================================

/**
 * Vertex shader for main particle system
 * Handles particle positioning, size attenuation, and time-based animation
 */
export const particleVertexShader = `
  attribute float size;
  attribute float alpha;
  attribute float random;
  attribute float migrator;
  
  varying vec3 vColor;
  varying float vAlpha;
  varying float vRandom;
  
  uniform float uTime;
  uniform float uSizeMultiplier;
  
  void main() {
    vColor = color;
    vAlpha = alpha;
    vRandom = random;
    
    float finalSize = size;
    
    // Core particle pulsing animation
    if (gl_VertexID == 0) {
      finalSize = size * (1.0 + sin(uTime * 3.0) * 0.15);
    }
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = finalSize * uSizeMultiplier * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

/**
 * Fragment shader for main particle system
 * Creates soft-edged circular particles with twinkling effect
 */
export const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vRandom;
  
  uniform float uTime;
  
  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float dist = length(c);
    
    // Discard pixels outside circle
    if (dist > 0.5) discard;
    
    // Smooth edge fade with a wider falloff for softer particles.
    float a = (1.0 - smoothstep(0.18, 0.5, dist)) * vAlpha;
    
    // Subtle twinkle; most shimmer is driven by state logic.
    float twinkle = sin(uTime * 0.8 + vRandom * 10.0) * 0.06 + 0.94;
    
    gl_FragColor = vec4(vColor * twinkle, a);
  }
`;

/**
 * Vertex shader for core mesh
 * Passes normal and view position for lighting calculations
 */
export const coreVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

/**
 * Fragment shader for core mesh
 * Creates a detailed, lit sphere with fresnel rim effect
 */
export const coreFragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    
    // Diffuse lighting
    float diff = max(dot(normal, vec3(0.5, 0.8, 0.3)), 0.0);
    
    // Fresnel rim effect
    float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.5);
    
    // Detail noise
    float detail = sin(normal.x * 10.0 + uTime * 1.5) * sin(normal.y * 10.0 + uTime * 1.2) * 0.5 + 0.5;
    
    vec3 base = uColor * (0.25 + diff * 0.55);
    vec3 rim = uColor * 1.4 * fresnel;
    
    gl_FragColor = vec4(base + rim + detail * 0.08, 1.0);
  }
`;

/**
 * Vertex shader for glow mesh
 * Similar to core but for the outer glow effect
 */
export const glowVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

/**
 * Fragment shader for glow mesh
 * Creates a breathing, gradient glow effect around the core
 */
export const glowFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uTime;
  
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    // Fresnel for glow intensity
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 1.6);
    
    // Breathing animation
    float breathe = 1.0 + sin(uTime * 2.5) * 0.2;
    float alpha = fresnel * uOpacity * breathe;
    
    // Gradient from inner to outer
    vec3 inner = uColor * 1.3;
    vec3 outer = uColor * 0.1;
    vec3 grad = mix(inner, outer, fresnel);
    
    gl_FragColor = vec4(grad, alpha);
  }
`;

/**
 * Fragment shader for planet outer glow
 * Enhanced pulsing fresnel glow with per-planet phase offset
 */
export const planetGlowFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uTime;
  uniform float uOffset;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    // Stronger fresnel for more visible rim glow
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 1.2);
    // Enhanced breathing animation
    float breathe = 1.0 + sin(uTime * 2.0 + uOffset) * 0.25;
    // Boost alpha for visibility
    float alpha = fresnel * uOpacity * breathe * 1.5;
    // Brighter inner color, less fade to outer
    vec3 inner = uColor * 1.8;
    vec3 outer = uColor * 0.4;
    vec3 grad = mix(inner, outer, fresnel);
    gl_FragColor = vec4(grad, alpha);
  }
`;

/**
 * Shader uniforms interface
 */
export interface ParticleUniforms {
  uTime: { value: number };
  uSizeMultiplier: { value: number };
}

/**
 * Core mesh shader uniforms
 */
export interface CoreUniforms {
  uColor: { value: THREE.Color };
  uTime: { value: number };
}

/**
 * Glow mesh shader uniforms
 */
export interface GlowUniforms {
  uColor: { value: THREE.Color };
  uOpacity: { value: number };
  uTime: { value: number };
}
