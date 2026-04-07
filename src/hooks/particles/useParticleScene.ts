import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import type { ParticleConfig } from '@/types';
import {
  initializeScene,
  initializeLighting,
  createParticleSystem,
  createCoreGroup,
  createPlanets,
  createOrbitGroup,
  createTrail,
  createNeuralConnections,
  handleResize,
} from '@/lib/particles/scene';
import { initializeParticleData, initializeTrailHistory, initializeTrailPositions, getMigratorCount } from '@/lib/particles/particleData';
import { TOTAL_MAIN, STATE_PRIMARY_COLORS, STATE_SECONDARY_COLORS, PLANETS } from '@/lib/particles/constants';


export interface SceneRefs {
  scene: React.MutableRefObject<THREE.Scene | null>;
  camera: React.MutableRefObject<THREE.PerspectiveCamera | null>;
  renderer: React.MutableRefObject<THREE.WebGLRenderer | null>;
  particles: React.MutableRefObject<THREE.Points | null>;
  coreGroup: React.MutableRefObject<THREE.Group | null>;
  orbitGroup: React.MutableRefObject<THREE.Group | null>;
  planets: React.MutableRefObject<{ group: THREE.Group; radius: number; speed: number; angle: number; startAngle: number; angleTraveled: number; hasCompletedFirstOrbit: boolean }[] | null>;
  sunLight: React.MutableRefObject<THREE.PointLight | null>;
  trail: React.MutableRefObject<THREE.LineSegments | null>;
  flashMesh: React.MutableRefObject<THREE.Mesh | null>;
  systemGroup: React.MutableRefObject<THREE.Group | null>;
  novaMeshes: React.MutableRefObject<THREE.Mesh[]>;
  novaState: React.MutableRefObject<{ active: boolean; startTime: number }>;
  neuralConnections: React.MutableRefObject<THREE.LineSegments | null>;
}

export interface AnimationData {
  time: React.MutableRefObject<number>;
  stateStart: React.MutableRefObject<number>;
  lastState: React.MutableRefObject<number>;
  snapshotPositions: React.MutableRefObject<Float32Array>;
  currentCoreColor: React.MutableRefObject<THREE.Color>;
  currentPrimaryColor: React.MutableRefObject<THREE.Color>;
  currentSecondaryColor: React.MutableRefObject<THREE.Color>;
  shellAngle: React.MutableRefObject<number>;
  trailHistory: React.MutableRefObject<Float32Array>;
  particleData: React.MutableRefObject<ReturnType<typeof initializeParticleData>['data'] | null>;
  particleAttributes: React.MutableRefObject<ReturnType<typeof initializeParticleData>['attributes'] | null>;
  animationId: React.MutableRefObject<number>;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
  cameraDrift: React.MutableRefObject<{ x: number; y: number }>;
}

/**
 * Hook to initialize and manage the Three.js scene for particles
 */
export function useParticleScene(config: ParticleConfig) {
  // DOM container ref
  const containerRef = useRef<HTMLDivElement>(null);

  // Three.js object refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const coreGroupRef = useRef<THREE.Group | null>(null);
  const orbitGroupRef = useRef<THREE.Group | null>(null);
  const planetsRef = useRef<{ group: THREE.Group; radius: number; speed: number; angle: number; startAngle: number; angleTraveled: number; hasCompletedFirstOrbit: boolean }[]>([]);
  const sunLightRef = useRef<THREE.PointLight | null>(null);
  const trailRef = useRef<THREE.LineSegments | null>(null);
  const flashMeshRef = useRef<THREE.Mesh | null>(null);
  const systemGroupRef = useRef<THREE.Group | null>(null);
  const novaMeshesRef = useRef<THREE.Mesh[]>([]);
  const novaStateRef = useRef({ active: false, startTime: 0 });
  const neuralConnectionsRef = useRef<THREE.LineSegments | null>(null);

  // Animation data refs
  const timeRef = useRef(0);
  const stateStartRef = useRef(performance.now());
  const lastStateRef = useRef(0);
  const snapshotPosRef = useRef<Float32Array>(new Float32Array(TOTAL_MAIN * 3));
  const currentCoreColorRef = useRef(new THREE.Color(config.centerColor));
  const currentPrimaryColorRef = useRef(STATE_PRIMARY_COLORS[0].clone());
  const currentSecondaryColorRef = useRef(STATE_SECONDARY_COLORS[0].clone());
  const shellAngleRef = useRef(0);
  const trailHistoryRef = useRef<Float32Array>(new Float32Array(0));
  const particleDataRef = useRef<ReturnType<typeof initializeParticleData>['data'] | null>(null);
  const particleAttributesRef = useRef<ReturnType<typeof initializeParticleData>['attributes'] | null>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cameraDriftRef = useRef({ x: 0, y: 0 });

  // Initialize scene on mount
  useEffect(() => {
    if (!containerRef.current) return;
    const initialContainer = containerRef.current;

    // Initialize scene, camera, renderer
    const { scene, camera, renderer } = initializeScene();
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    initialContainer.appendChild(renderer.domElement);

    // Initialize lighting
    const { sun } = initializeLighting(scene, config);
    sunLightRef.current = sun;

    // Initialize particle data
    const { data, attributes } = initializeParticleData();
    particleDataRef.current = data;
    particleAttributesRef.current = attributes;

    // System group for global rotation
    const systemGroup = new THREE.Group();
    scene.add(systemGroup);
    systemGroupRef.current = systemGroup;

    // Create particle system
    const particles = createParticleSystem(attributes);
    systemGroup.add(particles);
    particlesRef.current = particles;

    // Create core group
    const { group: coreGroup } = createCoreGroup(config);
    systemGroup.add(coreGroup);
    coreGroupRef.current = coreGroup;

    // Create planets with shared angles
    const angles = PLANETS.map(() => Math.random() * Math.PI * 2);
    planetsRef.current = createPlanets(systemGroup, angles);

    // Create orbit group
    const orbitGroup = createOrbitGroup(angles);
    systemGroup.add(orbitGroup);
    orbitGroupRef.current = orbitGroup;

    // Create trail
    const migratorCount = getMigratorCount(data);
    trailHistoryRef.current = initializeTrailHistory(migratorCount);
    const trailPositions = initializeTrailPositions(migratorCount);
    const trail = createTrail(migratorCount, trailPositions);
    systemGroup.add(trail);
    trailRef.current = trail;

    // Create neural connections for brain state
    const neuralConnections = createNeuralConnections(data.brainPositions, 3, 7);
    systemGroup.add(neuralConnections);
    neuralConnectionsRef.current = neuralConnections;

    // Handle resize
    const onResize = () => {
      if (cameraRef.current && rendererRef.current) {
        handleResize(cameraRef.current, rendererRef.current);
      }
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    const animId = animationRef.current;
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);

      if (rendererRef.current && initialContainer) {
        initialContainer.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update config color when it changes
  useEffect(() => {
    currentCoreColorRef.current.set(config.centerColor);
  }, [config.centerColor]);

  const refs: SceneRefs = {
    scene: sceneRef,
    camera: cameraRef,
    renderer: rendererRef,
    particles: particlesRef,
    coreGroup: coreGroupRef,
    orbitGroup: orbitGroupRef,
    planets: planetsRef,
    sunLight: sunLightRef,
    trail: trailRef,
    flashMesh: flashMeshRef,
    systemGroup: systemGroupRef,
    novaMeshes: novaMeshesRef,
    novaState: novaStateRef,
    neuralConnections: neuralConnectionsRef,
  };

  const data: AnimationData = {
    time: timeRef,
    stateStart: stateStartRef,
    lastState: lastStateRef,
    snapshotPositions: snapshotPosRef,
    currentCoreColor: currentCoreColorRef,
    currentPrimaryColor: currentPrimaryColorRef,
    currentSecondaryColor: currentSecondaryColorRef,
    shellAngle: shellAngleRef,
    trailHistory: trailHistoryRef,
    particleData: particleDataRef,
    particleAttributes: particleAttributesRef,
    animationId: animationRef,
    mousePosition: mouseRef,
    cameraDrift: cameraDriftRef,
  };

  return { refs, data, containerRef: containerRef };
}
