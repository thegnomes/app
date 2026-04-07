import * as THREE from 'three';
import type { ParticleConfig } from '@/types';
import {
  CAMERA_FOV,
  CAMERA_NEAR,
  CAMERA_FAR,
  CAMERA_Z,
  MAX_PIXEL_RATIO,
  AMBIENT_LIGHT_INTENSITY,
  SUN_LIGHT_INTENSITY,
  SUN_LIGHT_DISTANCE,
  CORE_GEOMETRY_DETAIL,
  CORE_RADIUS,
  GLOW_RADIUS,
  GLOW_OPACITY,
  PLANETS,
  PLANET_GLOW_MULTIPLIER,
  PLANET_GLOW_OPACITY,
  ORBIT_SEGMENTS,
  SHARED_ROTATION,
  TRAIL_COLOR,
} from './constants';
import { particleVertexShader, particleFragmentShader, glowVertexShader, planetGlowFragmentShader } from './shaders';
import { createParticleGeometry } from './particleData';
import type { ParticleAttributes } from '@/types';
import { createOrbitGeometryFromAngle, generateBrainConnections } from './geometry';

/**
 * Initialize the Three.js scene
 */
export function initializeScene(): {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
} {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    CAMERA_FOV,
    window.innerWidth / window.innerHeight,
    CAMERA_NEAR,
    CAMERA_FAR
  );
  camera.position.z = CAMERA_Z;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  return { scene, camera, renderer };
}

/**
 * Initialize lighting in the scene
 */
export function initializeLighting(
  scene: THREE.Scene,
  config: ParticleConfig
): {
  ambient: THREE.AmbientLight;
  sun: THREE.PointLight;
} {
  const ambient = new THREE.AmbientLight(AMBIENT_LIGHT_INTENSITY);
  scene.add(ambient);

  const sun = new THREE.PointLight(
    config.centerColor,
    SUN_LIGHT_INTENSITY,
    SUN_LIGHT_DISTANCE
  );
  sun.position.set(0, 0, 0);
  sun.castShadow = true;
  sun.shadow.mapSize.width = 2048;
  sun.shadow.mapSize.height = 2048;
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 500;
  scene.add(sun);

  return { ambient, sun };
}

/**
 * Create the main particle system
 */
export function createParticleSystem(
  attributes: ParticleAttributes
): THREE.Points {
  const geometry = createParticleGeometry(attributes);

  const material = new THREE.ShaderMaterial({
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    uniforms: { uTime: { value: 0 } },
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return new THREE.Points(geometry, material);
}

/**
 * Create core group with mesh and glow
 */
export function createCoreGroup(
  config: ParticleConfig
): {
  group: THREE.Group;
  mesh: THREE.Mesh;
  glow: THREE.Mesh;
} {
  const group = new THREE.Group();
  group.visible = false;

  // Core mesh
  const meshGeometry = new THREE.SphereGeometry(
    CORE_RADIUS,
    CORE_GEOMETRY_DETAIL,
    CORE_GEOMETRY_DETAIL
  );
  const meshMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        float diff = max(dot(normal, vec3(0.5, 0.8, 0.3)), 0.0);
        float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.5);
        float detail = sin(normal.x * 10.0 + uTime * 1.5) * sin(normal.y * 10.0 + uTime * 1.2) * 0.5 + 0.5;
        vec3 base = uColor * (0.25 + diff * 0.55);
        vec3 rim = uColor * 1.4 * fresnel;
        gl_FragColor = vec4(base + rim + detail * 0.08, 1.0);
      }
    `,
    uniforms: {
      uColor: { value: new THREE.Color(config.centerColor) },
      uTime: { value: 0 },
    },
  });
  const mesh = new THREE.Mesh(meshGeometry, meshMaterial);

  // Glow mesh
  const glowGeometry = new THREE.SphereGeometry(
    GLOW_RADIUS,
    CORE_GEOMETRY_DETAIL,
    CORE_GEOMETRY_DETAIL
  );
  const glowMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 1.6);
        float breathe = 1.0 + sin(uTime * 2.5) * 0.2;
        float alpha = fresnel * uOpacity * breathe;
        vec3 inner = uColor * 1.3;
        vec3 outer = uColor * 0.1;
        vec3 grad = mix(inner, outer, fresnel);
        gl_FragColor = vec4(grad, alpha);
      }
    `,
    uniforms: {
      uColor: { value: new THREE.Color(config.centerColor) },
      uOpacity: { value: GLOW_OPACITY },
      uTime: { value: 0 },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);

  group.add(mesh);
  group.add(glow);

  return { group, mesh, glow };
}

/**
 * Planet instance type
 */
export interface PlanetInstance {
  group: THREE.Group;
  radius: number;
  speed: number;
  angle: number;
  startAngle: number;
  angleTraveled: number;
  hasCompletedFirstOrbit: boolean;
}

/**
 * Create planet objects
 */
export function createPlanets(parent: THREE.Object3D, angles: number[]): PlanetInstance[] {
  return PLANETS.map((planetConfig, idx) => {
    const group = new THREE.Group();
    group.visible = false;

    // Main planet mesh with dark grey standard material for 3D depth and shadows
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(planetConfig.size, 32, 32),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#444444'),
        roughness: 0.6,
        metalness: 0.3,
      })
    );
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Outer glow with custom shader (unique color per planet)
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(planetConfig.size * PLANET_GLOW_MULTIPLIER, 32, 32),
      new THREE.ShaderMaterial({
        vertexShader: glowVertexShader,
        fragmentShader: planetGlowFragmentShader,
        uniforms: {
          uColor: { value: new THREE.Color(planetConfig.color) },
          uOpacity: { value: PLANET_GLOW_OPACITY },
          uTime: { value: 0 },
          uOffset: { value: idx * 0.5 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );

    group.add(mesh);
    group.add(glow);
    parent.add(group);

    return {
      group,
      radius: planetConfig.radius,
      speed: planetConfig.speed,
      angle: angles[idx],
      startAngle: angles[idx],
      angleTraveled: 0,
      hasCompletedFirstOrbit: false,
    };
  });
}

/**
 * Create orbit line group with progressive draw support
 */
export function createOrbitGroup(angles: number[]): THREE.Group {
  const group = new THREE.Group();
  group.visible = false;

  PLANETS.forEach((planet, idx) => {
    const geometry = createOrbitGeometryFromAngle(planet.radius, ORBIT_SEGMENTS, angles[idx]);
    // Start with draw range 0 - invisible until planet starts orbiting
    geometry.setDrawRange(0, 0);

    // Glowing orbit line that gets drawn progressively
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(planet.color),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const line = new THREE.Line(geometry, lineMat);
    line.rotation.copy(SHARED_ROTATION);
    line.userData = { radius: planet.radius, idx, totalVertices: ORBIT_SEGMENTS + 1, type: 'orbitLine' };
    group.add(line);
  });

  return group;
}

/**
 * Create trail lines for state 4
 */
export function createTrail(
  _migratorCount: number,
  positions: Float32Array
): THREE.LineSegments {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.LineBasicMaterial({
    color: TRAIL_COLOR,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const lines = new THREE.LineSegments(geometry, material);
  lines.visible = false;

  return lines;
}

/**
 * Create neural connection lines for brain visualization
 */
export function createNeuralConnections(
  brainPositions: Float32Array,
  maxConnections: number = 4,
  connectionDistance: number = 5
): THREE.LineSegments {
  const connectionPositions = generateBrainConnections(
    brainPositions,
    maxConnections,
    connectionDistance
  );

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(connectionPositions, 3)
  );

  // Use a custom shader material for glowing lines
  const material = new THREE.ShaderMaterial({
    vertexShader: `
      varying float vAlpha;
      void main() {
        vAlpha = 1.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vAlpha;
      void main() {
        gl_FragColor = vec4(uColor, uOpacity * vAlpha);
      }
    `,
    uniforms: {
      uColor: { value: new THREE.Color('#00d4ff') },
      uOpacity: { value: 0.25 },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const lines = new THREE.LineSegments(geometry, material);
  lines.visible = true; // Visible in State 0

  return lines;
}

/**
 * Create flash mesh effect
 */
export function createFlashMesh(
  scene: THREE.Scene,
  color: THREE.Color = new THREE.Color('#ffffff'),
  opacity: number = 0.6,
  scale: number = 0.05
): THREE.Mesh {
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(scale, scale, scale);
  scene.add(mesh);

  return mesh;
}

/**
 * Create nova/shockwave effect for state transitions
 */
export function createNovaMesh(
  parent: THREE.Object3D,
  color: THREE.Color,
  initialScale: number = 0.5
): THREE.Mesh {
  // Ring geometry for shockwave effect - thicker ring for more visibility
  const geometry = new THREE.RingGeometry(0.85, 1, 128);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(initialScale, initialScale, initialScale);
  mesh.lookAt(0, 0, 1);
  parent.add(mesh);

  return mesh;
}

/**
 * Handle window resize
 */
export function handleResize(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
): void {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
