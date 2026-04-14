import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"

// ============================================================
// TYPES
// ============================================================

type AppState = 0 | 1 | 2 | 3 | 4

interface ParticleAttributes {
    positions: Float32Array
    colors: Float32Array
    sizes: Float32Array
    alphas: Float32Array
    random: Float32Array
    migrator: Float32Array
}

interface ParticleData {
    homePositions: Float32Array
    spherePositions: Float32Array
    directions: Float32Array
    random: Float32Array
    migrator: Uint8Array
    shellParticle: Uint8Array
    migratorDelay: Float32Array
    nonMigratorDelay: Float32Array
    burstVelocity: Float32Array
    migratorIndexMap: Int32Array
    state2Radius: Float32Array
    state2ClusterWeight: Float32Array
    state2ClusterPhase: Float32Array
    state2ClusterPhaseLag: Float32Array
    brainPositions: Float32Array
    fibonacciPositions: Float32Array
}

interface PlanetConfig {
    radius: number
    size: number
    speed: number
    color: string
}

interface StarFormationFramerProps {
    phase: AppState
    autoPlay: boolean
    speed: number
    particleCount: number
    backgroundColor: string
    centerColor: string
    starTextureVideo: string
    collapseEnabled: boolean
    width: number
    height: number
}

// ============================================================
// CONSTANTS
// ============================================================

const STATE1_DURATION = 2000
const STATE4_CONCENTRATE = 1000
const STATE2_ABSORPTION_DURATION = 6000
const STATE2_STABILIZE_DURATION = 4000
const STATE2_COLOR_SHIFT_DURATION = 1500
const STATE2_DURATION =
    STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION + STATE2_COLOR_SHIFT_DURATION
const TARGET_FRAME_MS = 1000 / 60
const MAX_FRAME_DELTA_MS = 50
const ORBIT_SEGMENTS = 84
const TRAIL_LENGTH = 5
const MIGRATOR_RATIO = 0.25
const SHELL_PARTICLE_RATIO = 0.5
const PARTICLE_SIZE_MULTIPLIER = 1.5
const STATE2_SPIKE_CLUSTER_LEADER_RATIO = 0.1
const STATE2_SPIKE_LEADER_WEIGHT = 1.0
const STATE2_SPIKE_RING1_WEIGHT = 0.65
const STATE2_SPIKE_RING2_WEIGHT = 0.35
const STATE2_SPIKE_BOUNCE_STRENGTH = 0.42
const STATE2_SPIKE_MIN_RADIUS_RATIO = 0.38
const STATE2_SPIKE_FREQUENCY = 3.4
const STATE2_SPIKE_FREQUENCY_JITTER = 0.45
const SHELL_RADIUS = 27
const CAMERA_Z = 130
const CAMERA_FOV = 75
const CAMERA_NEAR = 0.1
const CAMERA_FAR = 1000
const MAX_PIXEL_RATIO = 2
const CORE_RADIUS = 1.5
const GLOW_RADIUS = 6
const GLOW_OPACITY = 0.55
const SOLAR_VIDEO_CORE_TRANSITION_DURATION = 1000
const SOLAR_VIDEO_CORE_REVEAL_DELAY = 420
const SOLAR_VIDEO_CORE_PROCEDURAL_FADE = 0.86
const SOLAR_VIDEO_CORE_RADIUS = SHELL_RADIUS * 0.98
const SOLAR_VIDEO_CORE_SEGMENTS = 96
const SOLAR_VIDEO_CORE_OPACITY = 1.0
const SOLAR_VIDEO_CORE_ENTRY_SCALE = 0.72
const CORE_COLOR_LERP = 0.04
const AMBIENT_COLOR_LERP = 0.04
const CAMERA_MOVE_AMPLITUDE = 1.5
const CAMERA_MOVE_FREQUENCY = 0.05
const PLANET_ENTRY_DURATION = 800
const PLANET_ENTRY_DELAY = 250
const PLANET_ENTRY_BASE_TIME = 3000
const BURST_DURATION = 1500
const BURST_DAMPING = 0.992
const PLANET_GLOW_MULTIPLIER = 2.0
const PLANET_GLOW_OPACITY = 0.45
const AMBIENT_LIGHT_INTENSITY = 0x222222
const SUN_LIGHT_INTENSITY = 3
const SUN_LIGHT_DISTANCE = 300
const SHARED_ROTATION = new THREE.Euler(Math.PI * 0.12, Math.PI * 0.08, 0)
const TRAIL_COLOR = new THREE.Color("#ffaa00")

const STATE_PRIMARY_COLORS: THREE.Color[] = [
    new THREE.Color("#ffffff"),
    new THREE.Color("#ffffff"),
    new THREE.Color("#22d3ee"),
    new THREE.Color("#f97316"),
    new THREE.Color("#a855f7"),
]

const STATE_SECONDARY_COLORS: THREE.Color[] = [
    new THREE.Color("#ffffff"),
    new THREE.Color("#f8fafc"),
    new THREE.Color("#3b82f6"),
    new THREE.Color("#ef4444"),
    new THREE.Color("#22c55e"),
]

const PLANETS: PlanetConfig[] = [
    { radius: 34, size: 3.2, speed: 1.1, color: "#60a5fa" },
    { radius: 46, size: 2.6, speed: 0.85, color: "#818cf8" },
    { radius: 60, size: 3.8, speed: 0.65, color: "#a78bfa" },
    { radius: 76, size: 2.2, speed: 0.48, color: "#f472b6" },
    { radius: 94, size: 2.9, speed: 0.36, color: "#34d399" },
    { radius: 114, size: 4.6, speed: 0.27, color: "#fbbf24" },
    { radius: 136, size: 2.4, speed: 0.2, color: "#fb7185" },
    { radius: 160, size: 3.5, speed: 0.15, color: "#22d3ee" },
]

// ============================================================
// EASING + GEOMETRY HELPERS
// ============================================================

function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3)
}

function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function smoothstep01(value: number): number {
    const t = Math.min(1, Math.max(0, value))
    return t * t * (3 - 2 * t)
}

function scaleFrameLerp(factor: number, frameScale: number): number {
    return 1 - Math.pow(1 - factor, frameScale)
}

function generateHomePositions(count: number, out: Float32Array, spread = 260): void {
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        out[i3] = (Math.random() - 0.5) * spread
        out[i3 + 1] = (Math.random() - 0.5) * spread
        out[i3 + 2] = (Math.random() - 0.5) * spread
    }
}

function generateFibonacciPositions(count: number, out: Float32Array, radius = SHELL_RADIUS): void {
    const phi = Math.PI * (3 - Math.sqrt(5))
    out[0] = 0
    out[1] = 0
    out[2] = 0
    const shellCount = count - 1
    for (let i = 1; i < count; i++) {
        const i3 = i * 3
        const particleIndex = i - 1
        const y = 1 - (particleIndex / (shellCount - 1)) * 2
        const rAtY = Math.sqrt(1 - y * y)
        const theta = phi * particleIndex
        out[i3] = Math.cos(theta) * rAtY * radius
        out[i3 + 1] = y * radius
        out[i3 + 2] = Math.sin(theta) * rAtY * radius
    }
}

function brainSDF(x: number, y: number, z: number): number {
    const width = 22
    const height = 16
    const depth = 18
    const separation = 2
    const isLeft = x < 0
    const centerX = isLeft ? -separation : separation
    const nx = (x - centerX) / width
    const ny = y / height
    const nz = z / depth
    let dist = Math.sqrt(nx * nx + ny * ny + nz * nz) - 1.0
    const foldFreqX = 4.0
    const foldFreqY = 6.0
    const foldFreqZ = 3.0
    const foldAmp = 0.15
    const folds = Math.sin(x * foldFreqX) * Math.cos(y * foldFreqY) * Math.sin(z * foldFreqZ)
    const fineFolds = Math.sin(x * 8.0 + z * 2.0) * Math.cos(y * 10.0) * 0.5
    dist += (folds + fineFolds * 0.3) * foldAmp
    if (y < -height * 0.6) {
        const stemFactor = Math.abs(y + height * 0.6) / (height * 0.4)
        dist += stemFactor * stemFactor * 0.5
    }
    if (y > height * 0.7) {
        const topFactor = (y - height * 0.7) / (height * 0.3)
        dist += topFactor * topFactor * 0.3
    }
    return dist
}

function getBrainSurfacePoint(): { x: number; y: number; z: number } {
    let attempts = 0
    const maxAttempts = 100
    while (attempts < maxAttempts) {
        attempts++
        const x = (Math.random() - 0.5) * 50
        const y = (Math.random() - 0.5) * 35
        const z = (Math.random() - 0.5) * 40
        const dist = brainSDF(x, y, z)
        if (Math.abs(dist) < 0.15 && dist <= 0) {
            return { x, y, z }
        }
    }
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    return {
        x: Math.cos(theta) * Math.sin(phi) * 20,
        y: Math.cos(phi) * 14,
        z: Math.sin(theta) * Math.sin(phi) * 16,
    }
}

function generateBrainPositions(count: number, out: Float32Array, scale = 1): void {
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const point = getBrainSurfacePoint()
        out[i3] = point.x * scale
        out[i3 + 1] = point.y * scale
        out[i3 + 2] = point.z * scale
    }
}

function generateSpherePositions(count: number, out: Float32Array, radius = SHELL_RADIUS): void {
    const phi = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const y = 1 - (i / (count - 1)) * 2
        const rAtY = Math.sqrt(1 - y * y)
        const theta = phi * i
        out[i3] = Math.cos(theta) * rAtY * radius
        out[i3 + 1] = y * radius
        out[i3 + 2] = Math.sin(theta) * rAtY * radius
    }
}

function generateDirections(spherePositions: Float32Array, out: Float32Array): void {
    const count = spherePositions.length / 3
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const len =
            Math.sqrt(
                spherePositions[i3] ** 2 +
                    spherePositions[i3 + 1] ** 2 +
                    spherePositions[i3 + 2] ** 2
            ) || 1
        out[i3] = spherePositions[i3] / len
        out[i3 + 1] = spherePositions[i3 + 1] / len
        out[i3 + 2] = spherePositions[i3 + 2] / len
    }
}

function shuffleIndices(length: number): number[] {
    const idxs = Array.from({ length }, (_, i) => i)
    for (let i = idxs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [idxs[i], idxs[j]] = [idxs[j], idxs[i]]
    }
    return idxs
}

function calculateState2Radius(baseRadius: number, random: number): number {
    return baseRadius * (0.2 + random * 1.3)
}

function createOrbitGeometryFromAngle(radius: number, segments: number, startAngle: number): THREE.BufferGeometry {
    const points: number[] = []
    for (let i = 0; i <= segments; i++) {
        const angle = startAngle + (i / segments) * Math.PI * 2
        points.push(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3))
    return geometry
}

// ============================================================
// SHADERS
// ============================================================

const particleVertexShader = `
  attribute float size;
  attribute float alpha;
  attribute float random;
  attribute float migrator;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vRandom;
  uniform float uTime;
  void main() {
    vColor = color;
    vAlpha = alpha;
    vRandom = random;
    float finalSize = size;
    if (gl_VertexID == 0) {
      finalSize = size * (1.0 + sin(uTime * 3.0) * 0.15);
    }
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = finalSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vRandom;
  uniform float uTime;
  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float dist = length(c);
    if (dist > 0.5) discard;
    float a = (1.0 - smoothstep(0.18, 0.5, dist)) * vAlpha;
    float twinkle = sin(uTime * 0.8 + vRandom * 10.0) * 0.06 + 0.94;
    gl_FragColor = vec4(vColor * twinkle, a);
  }
`

const glowVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const planetGlowFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uTime;
  uniform float uOffset;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 1.2);
    float breathe = 1.0 + sin(uTime * 2.0 + uOffset) * 0.25;
    float alpha = fresnel * uOpacity * breathe * 1.5;
    vec3 inner = uColor * 1.8;
    vec3 outer = uColor * 0.4;
    vec3 grad = mix(inner, outer, fresnel);
    gl_FragColor = vec4(grad, alpha);
  }
`

// ============================================================
// PARTICLE DATA
// ============================================================

function deterministicUnit(seed: number): number {
    const x = Math.sin(seed * 12.9898) * 43758.5453
    return x - Math.floor(x)
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
    if (weight <= clusterWeight[index]) return
    clusterWeight[index] = weight
    clusterPhase[index] = phase
    clusterPhaseLag[index] = lag
}

function initializeState2SpikeClusters(data: ParticleData, totalMain: number): void {
    const shellIndices: number[] = []
    for (let i = 1; i < totalMain; i++) {
        if (data.shellParticle[i]) shellIndices.push(i)
    }
    const shellCount = shellIndices.length
    const leaderCount = Math.max(1, Math.round(shellCount * STATE2_SPIKE_CLUSTER_LEADER_RATIO))
    const leaderStride = shellCount / leaderCount
    const STATE2_SPIKE_RING1_COUNT = 5
    const STATE2_SPIKE_RING2_COUNT = 10

    for (let leaderSlot = 0; leaderSlot < leaderCount; leaderSlot++) {
        const leaderIndex = shellIndices[Math.floor(leaderSlot * leaderStride + leaderStride * 0.37) % shellCount]
        const leaderI3 = leaderIndex * 3
        const leaderX = data.fibonacciPositions[leaderI3]
        const leaderY = data.fibonacciPositions[leaderI3 + 1]
        const leaderZ = data.fibonacciPositions[leaderI3 + 2]
        const phase = deterministicUnit(leaderIndex + leaderSlot * 101) * Math.PI * 2
        const nearest: { index: number; distSq: number }[] = []

        for (const i of shellIndices) {
            if (i === leaderIndex) continue
            const i3 = i * 3
            const dx = data.fibonacciPositions[i3] - leaderX
            const dy = data.fibonacciPositions[i3 + 1] - leaderY
            const dz = data.fibonacciPositions[i3 + 2] - leaderZ
            nearest.push({ index: i, distSq: dx * dx + dy * dy + dz * dz })
        }
        nearest.sort((a, b) => a.distSq - b.distSq)

        assignClusterParticle(
            leaderIndex,
            STATE2_SPIKE_LEADER_WEIGHT,
            phase,
            0,
            data.state2ClusterWeight,
            data.state2ClusterPhase,
            data.state2ClusterPhaseLag
        )
        for (let n = 0; n < STATE2_SPIKE_RING1_COUNT && n < nearest.length; n++) {
            assignClusterParticle(
                nearest[n].index,
                STATE2_SPIKE_RING1_WEIGHT,
                phase,
                0.1 + n * 0.018,
                data.state2ClusterWeight,
                data.state2ClusterPhase,
                data.state2ClusterPhaseLag
            )
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
            )
        }
    }
}

function initializeParticleData(totalMain: number): {
    data: ParticleData
    attributes: ParticleAttributes
} {
    const data: ParticleData = {
        homePositions: new Float32Array(totalMain * 3),
        spherePositions: new Float32Array(totalMain * 3),
        directions: new Float32Array(totalMain * 3),
        random: new Float32Array(totalMain),
        migrator: new Uint8Array(totalMain),
        shellParticle: new Uint8Array(totalMain),
        migratorDelay: new Float32Array(totalMain),
        nonMigratorDelay: new Float32Array(totalMain),
        burstVelocity: new Float32Array(totalMain * 3),
        migratorIndexMap: new Int32Array(totalMain),
        state2Radius: new Float32Array(totalMain),
        state2ClusterWeight: new Float32Array(totalMain),
        state2ClusterPhase: new Float32Array(totalMain),
        state2ClusterPhaseLag: new Float32Array(totalMain),
        brainPositions: new Float32Array(totalMain * 3),
        fibonacciPositions: new Float32Array(totalMain * 3),
    }

    const attributes: ParticleAttributes = {
        positions: new Float32Array(totalMain * 3),
        colors: new Float32Array(totalMain * 3),
        sizes: new Float32Array(totalMain),
        alphas: new Float32Array(totalMain),
        random: new Float32Array(totalMain),
        migrator: new Float32Array(totalMain),
    }

    generateHomePositions(totalMain, data.homePositions)
    generateSpherePositions(totalMain, data.spherePositions, SHELL_RADIUS)
    generateDirections(data.spherePositions, data.directions)
    generateBrainPositions(totalMain, data.brainPositions, 1.2)
    generateFibonacciPositions(totalMain, data.fibonacciPositions, SHELL_RADIUS)

    for (let i = 0; i < totalMain; i++) {
        data.random[i] = Math.random()
        data.state2Radius[i] = calculateState2Radius(SHELL_RADIUS, data.random[i])
        data.migratorIndexMap[i] = -1
    }

    const shellParticleCount = Math.round((totalMain - 1) * SHELL_PARTICLE_RATIO)
    let assignedShellParticles = 0
    for (let i = 1; i < totalMain && assignedShellParticles < shellParticleCount; i += 2) {
        data.shellParticle[i] = 1
        assignedShellParticles++
    }
    for (let i = 2; i < totalMain && assignedShellParticles < shellParticleCount; i += 2) {
        data.shellParticle[i] = 1
        assignedShellParticles++
    }

    initializeState2SpikeClusters(data, totalMain)

    const shuffledIndices = shuffleIndices(totalMain)
    const migratorCount = Math.floor(totalMain * MIGRATOR_RATIO)
    for (let i = 0; i < migratorCount; i++) {
        data.migrator[shuffledIndices[i]] = 1
    }

    let migratorIdx = 0
    let nonMigratorIdx = 0
    for (let i = 0; i < totalMain; i++) {
        if (data.migrator[i]) {
            data.migratorDelay[i] = migratorIdx * (1000 / (migratorCount - 1 || 1))
            data.migratorIndexMap[i] = migratorIdx
            migratorIdx++
        } else {
            data.nonMigratorDelay[i] = nonMigratorIdx * (1000 / (migratorCount - 1 || 1))
            nonMigratorIdx++
        }
    }

    const initialColor = new THREE.Color("#ffd700")
    for (let i = 0; i < totalMain; i++) {
        const i3 = i * 3
        attributes.positions[i3] = 0
        attributes.positions[i3 + 1] = 0
        attributes.positions[i3 + 2] = 0
        if (i === 0) {
            attributes.sizes[i] = 20
            attributes.alphas[i] = 1
        } else {
            attributes.sizes[i] = 0
            attributes.alphas[i] = 0
        }
        attributes.random[i] = data.random[i]
        attributes.migrator[i] = data.migrator[i]
        attributes.colors[i3] = initialColor.r
        attributes.colors[i3 + 1] = initialColor.g
        attributes.colors[i3 + 2] = initialColor.b
    }

    return { data, attributes }
}

function createParticleGeometry(attributes: ParticleAttributes): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(attributes.positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(attributes.colors, 3))
    geometry.setAttribute("size", new THREE.BufferAttribute(attributes.sizes, 1))
    geometry.setAttribute("alpha", new THREE.BufferAttribute(attributes.alphas, 1))
    geometry.setAttribute("random", new THREE.BufferAttribute(attributes.random, 1))
    geometry.setAttribute("migrator", new THREE.BufferAttribute(attributes.migrator, 1))
    return geometry
}

function getMigratorCount(data: ParticleData): number {
    return data.migrator.filter((m) => m === 1).length
}

// ============================================================
// SCENE OBJECTS
// ============================================================

interface PlanetInstance {
    group: THREE.Group
    radius: number
    speed: number
    angle: number
    startAngle: number
    angleTraveled: number
    hasCompletedFirstOrbit: boolean
}

function createParticleSystem(attributes: ParticleAttributes): THREE.Points {
    const geometry = createParticleGeometry(attributes)
    const material = new THREE.ShaderMaterial({
        vertexShader: particleVertexShader,
        fragmentShader: particleFragmentShader,
        uniforms: { uTime: { value: 0 } },
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    })
    return new THREE.Points(geometry, material)
}

function createCoreGroup(centerColor: string): { group: THREE.Group; mesh: THREE.Mesh; glow: THREE.Mesh } {
    const group = new THREE.Group()
    group.visible = false

    const meshGeometry = new THREE.SphereGeometry(CORE_RADIUS, 64, 64)
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
          uniform float uOpacity;
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
            gl_FragColor = vec4(base + rim + detail * 0.08, uOpacity);
          }
        `,
        uniforms: {
            uColor: { value: new THREE.Color(centerColor) },
            uTime: { value: 0 },
            uOpacity: { value: 1 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    })
    const mesh = new THREE.Mesh(meshGeometry, meshMaterial)

    const glowGeometry = new THREE.SphereGeometry(GLOW_RADIUS, 64, 64)
    const glowMaterial = new THREE.ShaderMaterial({
        vertexShader: glowVertexShader,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uOpacity;
          uniform float uTime;
          uniform float uGlowBoost;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          void main() {
            float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 1.6);
            float breathe = 1.0 + sin(uTime * 2.5) * 0.2;
            float alpha = fresnel * uOpacity * breathe * uGlowBoost;
            vec3 inner = uColor * (1.3 + uGlowBoost * 0.35);
            vec3 outer = uColor * 0.1;
            vec3 grad = mix(inner, outer, fresnel);
            gl_FragColor = vec4(grad, alpha);
          }
        `,
        uniforms: {
            uColor: { value: new THREE.Color(centerColor) },
            uOpacity: { value: GLOW_OPACITY },
            uTime: { value: 0 },
            uGlowBoost: { value: 1 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    })
    const glow = new THREE.Mesh(glowGeometry, glowMaterial)

    group.add(mesh)
    group.add(glow)
    return { group, mesh, glow }
}

function createSolarVideoCoreLayer(videoTexture: THREE.Texture): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(
        SOLAR_VIDEO_CORE_RADIUS,
        SOLAR_VIDEO_CORE_SEGMENTS,
        SOLAR_VIDEO_CORE_SEGMENTS
    )
    const material = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          varying vec2 vUv;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vUv = uv;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform sampler2D uVideo;
          uniform float uMix;
          uniform float uOpacity;
          uniform float uTime;
          varying vec3 vNormal;
          varying vec3 vViewPosition;
          varying vec2 vUv;
          void main() {
            vec2 flowUv = vUv;
            flowUv.x += sin((vUv.y + uTime * 0.012) * 6.28318) * 0.006;
            flowUv.y += cos((vUv.x - uTime * 0.01) * 6.28318) * 0.005;
            vec3 videoColor = texture2D(uVideo, fract(flowUv)).rgb;
            float luminance = dot(videoColor, vec3(0.299, 0.587, 0.114));
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            float facing = clamp(dot(normal, viewDir), 0.0, 1.0);
            float rim = pow(1.0 - facing, 2.0);
            float limbSoftness = 0.5 + facing * 0.5;
            vec3 warmColor = mix(videoColor, videoColor * vec3(1.0, 0.48, 0.16), 0.34);
            vec3 orangeGlow = vec3(1.0, 0.32, 0.04);
            float alpha = uMix * uOpacity * limbSoftness * (0.9 + luminance * 0.18);
            vec3 emissive = warmColor * (0.9 + luminance * 0.86 + facing * 0.28);
            emissive += orangeGlow * (rim * 0.85 + luminance * 0.18);
            gl_FragColor = vec4(emissive, alpha);
          }
        `,
        uniforms: {
            uVideo: { value: videoTexture },
            uMix: { value: 0 },
            uOpacity: { value: SOLAR_VIDEO_CORE_OPACITY },
            uTime: { value: 0 },
        },
        transparent: true,
        blending: THREE.NormalBlending,
        depthWrite: false,
        depthTest: true,
        side: THREE.FrontSide,
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.visible = false
    mesh.renderOrder = 2
    return mesh
}

function createPlanets(parent: THREE.Object3D, angles: number[]): PlanetInstance[] {
    return PLANETS.map((planetConfig, idx) => {
        const group = new THREE.Group()
        group.visible = false

        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(planetConfig.size, 32, 32),
            new THREE.MeshStandardMaterial({
                color: new THREE.Color(planetConfig.color),
                roughness: 0.5,
                metalness: 0.4,
            })
        )
        mesh.castShadow = true
        mesh.receiveShadow = true

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
        )

        group.add(mesh)
        group.add(glow)
        parent.add(group)

        return {
            group,
            radius: planetConfig.radius,
            speed: planetConfig.speed,
            angle: angles[idx],
            startAngle: angles[idx],
            angleTraveled: 0,
            hasCompletedFirstOrbit: false,
        }
    })
}

function createOrbitGroup(angles: number[]): THREE.Group {
    const group = new THREE.Group()
    group.visible = false
    PLANETS.forEach((planet, idx) => {
        const geometry = createOrbitGeometryFromAngle(planet.radius, ORBIT_SEGMENTS, angles[idx])
        geometry.setDrawRange(0, 0)
        const lineMat = new THREE.LineBasicMaterial({
            color: new THREE.Color(planet.color),
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
        })
        const line = new THREE.Line(geometry, lineMat)
        line.rotation.copy(SHARED_ROTATION)
        line.userData = { radius: planet.radius, idx, totalVertices: ORBIT_SEGMENTS + 1, type: "orbitLine" }
        group.add(line)
    })
    return group
}

function createTrail(migratorCount: number, positions: Float32Array): THREE.LineSegments {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const material = new THREE.LineBasicMaterial({
        color: TRAIL_COLOR,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    })
    const lines = new THREE.LineSegments(geometry, material)
    lines.visible = false
    return lines
}

function createFlashMesh(scene: THREE.Scene, color: THREE.Color = new THREE.Color("#ffffff"), opacity = 0.6, scale = 0.05): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(1, 32, 32)
    const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.scale.set(scale, scale, scale)
    scene.add(mesh)
    return mesh
}

// ============================================================
// ANIMATION STATES
// ============================================================

const BRAIN_COLOR_R = 0.102
const BRAIN_COLOR_G = 0.373
const BRAIN_COLOR_B = 0.478
const STAR_COLOR_R = 0.878
const STAR_COLOR_G = 0.969
const STAR_COLOR_B = 1.0
const STAR1_DIFF_R = STAR_COLOR_R - BRAIN_COLOR_R
const STAR1_DIFF_G = STAR_COLOR_G - BRAIN_COLOR_G
const STAR1_DIFF_B = STAR_COLOR_B - BRAIN_COLOR_B

const BLUE_R = 0.133
const BLUE_G = 0.827
const BLUE_B = 0.933
const ORANGE_R = 0.976
const ORANGE_G = 0.451
const ORANGE_B = 0.086
const BLUE_TO_ORANGE_R = ORANGE_R - BLUE_R
const BLUE_TO_ORANGE_G = ORANGE_G - BLUE_G
const BLUE_TO_ORANGE_B = ORANGE_B - BLUE_B
const CORE_BLUE_R = BLUE_R
const CORE_BLUE_G = BLUE_G
const CORE_BLUE_B = BLUE_B
const CORE_BLUE_TO_ORANGE_R = ORANGE_R - CORE_BLUE_R
const CORE_BLUE_TO_ORANGE_G = ORANGE_G - CORE_BLUE_G
const CORE_BLUE_TO_ORANGE_B = ORANGE_B - CORE_BLUE_B

function animateState0(attributes: ParticleAttributes, totalMain: number): void {
    const { positions, colors, sizes, alphas } = attributes
    for (let i = 0; i < totalMain; i++) {
        const i3 = i * 3
        positions[i3] = 0
        positions[i3 + 1] = 0
        positions[i3 + 2] = 0
        colors[i3] = 0
        colors[i3 + 1] = 0
        colors[i3 + 2] = 0
        sizes[i] = 0
        alphas[i] = 0
    }
}

function animateState1(
    attributes: ParticleAttributes,
    data: ParticleData,
    totalMain: number,
    stateElapsed: number,
    snapshotPositions: Float32Array,
    time: number,
    coreColor: THREE.Color
): void {
    const { positions, colors, sizes, alphas } = attributes
    const { homePositions, brainPositions, random } = data

    for (let i = 0; i < totalMain; i++) {
        const i3 = i * 3
        if (i === 0) {
            const CORE_VISIBLE_START = 1200
            const CORE_DURATION = 1000
            const coreT = Math.max(0, Math.min(1, (stateElapsed - CORE_VISIBLE_START) / CORE_DURATION))
            const coreEased = easeOutCubic(coreT)
            positions[i3] = 0
            positions[i3 + 1] = 0
            positions[i3 + 2] = 0
            colors[i3] = coreColor.r
            colors[i3 + 1] = coreColor.g
            colors[i3 + 2] = coreColor.b
            sizes[i] = (3.0 + Math.sin(time * 2) * 0.25) * coreEased
            alphas[i] = 0.9 * coreEased
            continue
        }

        const rnd = random[i]
        const brainX = brainPositions[i3]
        const brainY = brainPositions[i3 + 1]
        const brainZ = brainPositions[i3 + 2]
        const distFromCenter = Math.sqrt(brainX * brainX + brainY * brainY + brainZ * brainZ)

        const BG_ENTRY = 600
        const distDelay = (distFromCenter / 150) * 0.08
        const rndDelay = rnd * 0.03
        const t = Math.max(0, Math.min(1, stateElapsed / BG_ENTRY - distDelay - rndDelay))
        const eased = easeOutCubic(t)

        const sx = snapshotPositions[i3]
        const sy = snapshotPositions[i3 + 1]
        const sz = snapshotPositions[i3 + 2]
        const tx = homePositions[i3]
        const ty = homePositions[i3 + 1]
        const tz = homePositions[i3 + 2]

        if (t < 0.4) {
            const expandEased = easeOutCubic(t / 0.4)
            const currentExpansion = 1 + expandEased * 2.5
            positions[i3] = sx * currentExpansion
            positions[i3 + 1] = sy * currentExpansion
            positions[i3 + 2] = sz * currentExpansion
        } else {
            const disperseEased = easeOutCubic((t - 0.4) / 0.6)
            const maxExpandX = sx * 3.5
            const maxExpandY = sy * 3.5
            const maxExpandZ = sz * 3.5
            positions[i3] = maxExpandX + (tx - maxExpandX) * disperseEased
            positions[i3 + 1] = maxExpandY + (ty - maxExpandY) * disperseEased
            positions[i3 + 2] = maxExpandZ + (tz - maxExpandZ) * disperseEased
        }

        const twinkle = Math.sin(time * (0.35 + rnd * 0.8) + rnd * 6.283)
        const glimmerIntensity = (Math.max(0, twinkle) * 0.12 + 0.08) * eased
        const brightness = 0.62 + glimmerIntensity * 0.35
        colors[i3] = (BRAIN_COLOR_R + STAR1_DIFF_R * eased) * brightness
        colors[i3 + 1] = (BRAIN_COLOR_G + STAR1_DIFF_G * eased) * brightness
        colors[i3 + 2] = (BRAIN_COLOR_B + STAR1_DIFF_B * eased) * brightness

        const baseSize = 0.5 + rnd * 0.3 + (0.7 + rnd * 0.5) * eased
        sizes[i] = (baseSize + glimmerIntensity * 0.2) * eased
        alphas[i] = (0.4 + rnd * 0.3) * eased + glimmerIntensity * 0.12
    }
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
    const { positions, colors, sizes, alphas } = attributes
    const { homePositions, random } = data
    const i3 = index * 3
    const rnd = random[index]
    const settleT = easeOutCubic(Math.min(1, stateElapsed / 1400))
    const drift = state === 3 ? 0.42 : 0.28
    const phase = rnd * 6.283 + index * 0.07
    const hx = homePositions[i3]
    const hy = homePositions[i3 + 1]
    const hz = homePositions[i3 + 2]
    const sx = snapshotPositions[i3]
    const sy = snapshotPositions[i3 + 1]
    const sz = snapshotPositions[i3 + 2]

    positions[i3] = sx + (hx - sx) * settleT + Math.sin(time * 0.22 + phase) * drift
    positions[i3 + 1] = sy + (hy - sy) * settleT + Math.cos(time * 0.18 + phase) * drift
    positions[i3 + 2] = sz + (hz - sz) * settleT + Math.sin(time * 0.16 + phase * 0.7) * drift

    const twinkle = Math.sin(time * (0.22 + rnd * 0.35) + phase) * 0.5 + 0.5
    const warmth = state === 3 ? 0.12 : 0
    const brightness = 0.52 + twinkle * 0.12 + rnd * 0.1
    colors[i3] = (STAR_COLOR_R + warmth * (ORANGE_R - STAR_COLOR_R)) * brightness
    colors[i3 + 1] = (STAR_COLOR_G + warmth * (ORANGE_G - STAR_COLOR_G)) * brightness
    colors[i3 + 2] = (STAR_COLOR_B + warmth * (ORANGE_B - STAR_COLOR_B)) * brightness
    sizes[index] = 0.75 + rnd * 0.45 + twinkle * 0.12
    alphas[index] = 0.42 + rnd * 0.28 + twinkle * 0.08
}

function getClusteredSpikeRadius(
    time: number,
    stableRadius: number,
    envelope: number,
    clusterWeight: number,
    clusterPhase: number,
    clusterPhaseLag: number
): number {
    if (clusterWeight <= 0 || envelope <= 0) return stableRadius
    const frequency = STATE2_SPIKE_FREQUENCY + Math.sin(clusterPhase * 1.7) * STATE2_SPIKE_FREQUENCY_JITTER
    const amplitude = SHELL_RADIUS * STATE2_SPIKE_BOUNCE_STRENGTH
    const signedOffset = envelope * clusterWeight * amplitude * Math.sin(time * frequency + clusterPhase + clusterPhaseLag)
    const minRadius = stableRadius * STATE2_SPIKE_MIN_RADIUS_RATIO
    return Math.max(minRadius, stableRadius + signedOffset)
}

function animateState2And3(
    attributes: ParticleAttributes,
    data: ParticleData,
    totalMain: number,
    state: AppState,
    stateElapsed: number,
    snapshotPositions: Float32Array,
    time: number,
    shellAngle: number,
    coreColor: THREE.Color
): void {
    const { positions, colors, sizes, alphas } = attributes
    const { random, shellParticle, fibonacciPositions, state2ClusterWeight, state2ClusterPhase, state2ClusterPhaseLag } = data

    if (state === 3) {
        sizes[0] = 0
        alphas[0] = 0
    } else if (state === 2) {
        const substate3Start = STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION
        if (stateElapsed < substate3Start) {
            sizes[0] = 0
            alphas[0] = 0
        }
    }

    for (let i = 1; i < totalMain; i++) {
        const i3 = i * 3
        const rnd = random[i]

        if (!shellParticle[i]) {
            animateBackgroundStarfieldParticle(
                attributes,
                data,
                i,
                stateElapsed,
                snapshotPositions,
                time,
                state
            )
            continue
        }

        const cosA = Math.cos(shellAngle)
        const sinA = Math.sin(shellAngle)
        const fibTargetX = fibonacciPositions[i3]
        const fibTargetY = fibonacciPositions[i3 + 1]
        const fibTargetZ = fibonacciPositions[i3 + 2]
        const stableX = fibTargetX * cosA - fibTargetZ * sinA
        const stableZ = fibTargetX * sinA + fibTargetZ * cosA
        const stableY = fibTargetY
        const stableRadius = Math.sqrt(stableX * stableX + stableY * stableY + stableZ * stableZ) || 1
        const stableUnitX = stableX / stableRadius
        const stableUnitY = stableY / stableRadius
        const stableUnitZ = stableZ / stableRadius

        if (state === 2) {
            const startX = snapshotPositions[i3]
            const startY = snapshotPositions[i3 + 1]
            const startZ = snapshotPositions[i3 + 2]
            const fibX = fibTargetX
            const fibY = fibTargetY
            const fibZ = fibTargetZ
            const drawInDuration = STATE2_ABSORPTION_DURATION
            const transitionStart = STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION * 0.35
            const transitionDuration = STATE2_DURATION - transitionStart
            const indexDelay = (i / totalMain) * 420
            const randomDelay = rnd * 280
            const phaseOffset = Math.sin((i % 23) * 0.27) * 120
            const particleDelay = indexDelay + randomDelay + phaseOffset
            const drawInElapsed = Math.max(0, stateElapsed - particleDelay)
            const drawInProgress = Math.min(1, drawInElapsed / drawInDuration)
            const stabilizationEnd = STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION
            const transitionT = Math.min(1, Math.max(0, (stateElapsed - transitionStart) / transitionDuration))
            const colorT = transitionT
            const transitionEased = easeOutCubic(transitionT)
            const substate3Start = STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION
            const substate3T = Math.min(1, Math.max(0, (stateElapsed - substate3Start) / (STATE2_DURATION - substate3Start)))
            const bounceDecayProgress = Math.min(
                1,
                Math.max(0, (stateElapsed - transitionStart) / (stabilizationEnd - transitionStart))
            )
            const compressionFactor = 1 - transitionEased * 0.2
            const compressedStableRadius = stableRadius * compressionFactor
            const volatilityEnvelope = easeOutCubic(drawInProgress) * Math.pow(Math.max(0, 1 - bounceDecayProgress), 0.9)
            const clusterWeight = state2ClusterWeight[i]
            const clusterPhase = state2ClusterPhase[i]
            const clusterPhaseLag = state2ClusterPhaseLag[i]
            const drawInEased = easeOutCubic(drawInProgress)

            if (i === 1 && substate3T > 0) {
                const coreColorT = easeOutCubic(substate3T)
                const glowEntrance = easeInOutCubic(substate3T)
                const orangePulse = Math.sin(time * 4.4) * 0.5 + 0.5
                const coreR = CORE_BLUE_R + CORE_BLUE_TO_ORANGE_R * coreColorT + ORANGE_R * orangePulse * 0.2 * glowEntrance
                const coreG = CORE_BLUE_G + CORE_BLUE_TO_ORANGE_G * coreColorT + ORANGE_G * orangePulse * 0.1 * glowEntrance
                const coreB = CORE_BLUE_B + CORE_BLUE_TO_ORANGE_B * coreColorT
                coreColor.setRGB(coreR, coreG, coreB)
                colors[0] = coreR
                colors[1] = coreG
                colors[2] = coreB
                sizes[0] = 4.2 + glowEntrance * (18 + orangePulse * 8)
                alphas[0] = 0.95 + glowEntrance * 0.05
            }

            if (stateElapsed < STATE2_ABSORPTION_DURATION) {
                const toFibX = fibX - startX
                const toFibY = fibY - startY
                const toFibZ = fibZ - startZ
                const cx = startX + toFibX * drawInEased
                const cy = startY + toFibY * drawInEased
                const cz = startZ + toFibZ * drawInEased
                const rx = cx * cosA - cz * sinA
                const rz = cx * sinA + cz * cosA
                const ry = cy
                const displacedRadius = getClusteredSpikeRadius(
                    time,
                    compressedStableRadius,
                    volatilityEnvelope,
                    clusterWeight,
                    clusterPhase,
                    clusterPhaseLag
                )
                const displacedX = stableUnitX * displacedRadius
                const displacedY = stableUnitY * displacedRadius
                const displacedZ = stableUnitZ * displacedRadius
                positions[i3] = rx + (displacedX - rx) * drawInEased
                positions[i3 + 1] = ry + (displacedY - ry) * drawInEased
                positions[i3 + 2] = rz + (displacedZ - rz) * drawInEased
            } else if (stateElapsed < STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION) {
                const s2Elapsed = stateElapsed - STATE2_ABSORPTION_DURATION
                const s2Progress = s2Elapsed / STATE2_STABILIZE_DURATION
                const preFx = startX + (fibX - startX) * drawInEased
                const preFy = startY + (fibY - startY) * drawInEased
                const preFz = startZ + (fibZ - startZ) * drawInEased
                const hasReachedShell = drawInProgress >= 1
                const settleToAnchor = hasReachedShell ? 1 : Math.min(1, s2Progress / 0.2)
                const anchorX = preFx + (fibX - preFx) * settleToAnchor
                const anchorY = preFy + (fibY - preFy) * settleToAnchor
                const anchorZ = preFz + (fibZ - preFz) * settleToAnchor
                const fx = anchorX * cosA - anchorZ * sinA
                const fz = anchorX * sinA + anchorZ * cosA
                const fy = anchorY
                const displacedRadius = getClusteredSpikeRadius(
                    time,
                    compressedStableRadius,
                    volatilityEnvelope,
                    clusterWeight,
                    clusterPhase,
                    clusterPhaseLag
                )
                const settleMix = Math.min(1, s2Progress / 0.18)
                const baseX = fx + (stableUnitX * compressedStableRadius - fx) * settleMix
                const baseY = fy + (stableUnitY * compressedStableRadius - fy) * settleMix
                const baseZ = fz + (stableUnitZ * compressedStableRadius - fz) * settleMix
                const displacedX = stableUnitX * displacedRadius
                const displacedY = stableUnitY * displacedRadius
                const displacedZ = stableUnitZ * displacedRadius
                positions[i3] = baseX + (displacedX - baseX) * drawInEased
                positions[i3 + 1] = baseY + (displacedY - baseY) * drawInEased
                positions[i3 + 2] = baseZ + (displacedZ - baseZ) * drawInEased
            } else {
                const fx = fibX * compressionFactor
                const fy = fibY * compressionFactor
                const fz = fibZ * compressionFactor
                const rx = fx * cosA - fz * sinA
                const rz = fx * sinA + fz * cosA
                positions[i3] = rx
                positions[i3 + 1] = fy
                positions[i3 + 2] = rz
            }

            const colorEased = easeOutCubic(colorT)
            const shellGlow = easeInOutCubic(substate3T)
            const shellPulse = Math.sin(time * 3.1 + rnd * 2.4) * 0.5 + 0.5
            const flicker = (1 - colorT) * Math.sin(time * 0.7 + rnd * 5) * 0.04
            const brightness = 0.88 + flicker + shellGlow * (0.32 + shellPulse * 0.14)
            colors[i3] = (BLUE_R + BLUE_TO_ORANGE_R * colorEased) * brightness
            colors[i3 + 1] = (BLUE_G + BLUE_TO_ORANGE_G * colorEased) * brightness
            colors[i3 + 2] = (BLUE_B + BLUE_TO_ORANGE_B * colorEased) * brightness
            sizes[i] = 1.6 + rnd * 0.4 + shellGlow * (0.7 + shellPulse * 0.35)
            alphas[i] = 0.9 + shellGlow * 0.08
        } else {
            const compressionFactor = 0.8
            const fx = fibTargetX * compressionFactor
            const fy = fibTargetY * compressionFactor
            const fz = fibTargetZ * compressionFactor
            const rx = fx * cosA - fz * sinA
            const rz = fx * sinA + fz * cosA
            const breathe = Math.sin(stateElapsed * 0.001 + random[i] * 10) * 0.2
            const breatheScale = 1 + breathe / (SHELL_RADIUS * compressionFactor)
            positions[i3] = rx * breatheScale
            positions[i3 + 1] = fy * breatheScale
            positions[i3 + 2] = rz * breatheScale
            const shellPulse = Math.sin(stateElapsed * 0.0031 + rnd * 2.4) * 0.5 + 0.5
            const brightness = 1.18 + shellPulse * 0.12
            colors[i3] = ORANGE_R * brightness
            colors[i3 + 1] = ORANGE_G * brightness
            colors[i3 + 2] = ORANGE_B * brightness
            sizes[i] = 2.3 + rnd * 0.3 + shellPulse * 0.25
            alphas[i] = 0.98
        }
    }
}

function animatePlanets(
    planets: PlanetInstance[],
    orbitGroup: THREE.Group | null,
    stateElapsed: number,
    speed: number,
    frameScale: number
): void {
    const startPos = new THREE.Vector3(-90, -70, 30)
    planets.forEach((planet, idx) => {
        const entryTime = idx * (PLANET_ENTRY_DELAY * 0.6)
        if (stateElapsed < entryTime) {
            planet.group.visible = false
            return
        }
        planet.group.visible = true
        const entryProgress = Math.min((stateElapsed - entryTime) / (PLANET_ENTRY_DURATION * 0.7), 1)
        const linearEntry = entryProgress
        const endPos = new THREE.Vector3(
            Math.cos(planet.angle) * planet.radius,
            0,
            Math.sin(planet.angle) * planet.radius
        )
        endPos.applyEuler(SHARED_ROTATION)
        planet.group.position.lerpVectors(startPos, endPos, linearEntry)
        const startScale = 5.0
        const endScale = 1.0
        const s = startScale + (endScale - startScale) * linearEntry
        planet.group.scale.set(s, s, s)

        if (entryProgress >= 1) {
            const prevAngle = planet.angle
            planet.angle += planet.speed * 0.06 * speed * frameScale
            const delta = planet.angle - prevAngle
            if (!planet.hasCompletedFirstOrbit) {
                planet.angleTraveled += delta
                if (planet.angleTraveled >= Math.PI * 2) {
                    planet.hasCompletedFirstOrbit = true
                    planet.angleTraveled = Math.PI * 2
                }
            }
            const v = new THREE.Vector3(
                Math.cos(planet.angle) * planet.radius,
                0,
                Math.sin(planet.angle) * planet.radius
            )
            v.applyEuler(SHARED_ROTATION)
            planet.group.position.copy(v)

            if (orbitGroup) {
                const progress = planet.hasCompletedFirstOrbit
                    ? 1
                    : Math.min(1, planet.angleTraveled / (Math.PI * 2))
                const totalVertices = ORBIT_SEGMENTS + 1
                const drawCount = Math.max(1, Math.floor(progress * totalVertices))
                orbitGroup.children.forEach((child) => {
                    if (child.userData.idx === idx) {
                        const geo = (child as THREE.Line | THREE.Points).geometry
                        geo.setDrawRange(0, drawCount)
                    }
                })
            }
        }
    })
}

function animateState4(
    attributes: ParticleAttributes,
    data: ParticleData,
    totalMain: number,
    stateElapsed: number,
    snapshotPositions: Float32Array,
    burstVelocities: Float32Array,
    time: number,
    frameScale: number,
    primaryColor: THREE.Color,
    secondaryColor: THREE.Color
): void {
    const { positions, colors, sizes, alphas } = attributes
    const { homePositions, random, migrator } = data
    const primaryR = primaryColor.r
    const primaryG = primaryColor.g
    const primaryB = primaryColor.b
    const secondaryR = secondaryColor.r
    const secondaryG = secondaryColor.g
    const secondaryB = secondaryColor.b
    const primaryDiffR = secondaryR - primaryR
    const primaryDiffG = secondaryG - primaryG
    const primaryDiffB = secondaryB - primaryB

    if (stateElapsed < STATE4_CONCENTRATE) {
        const t = stateElapsed / STATE4_CONCENTRATE
        const eased = easeInOutCubic(t)
        for (let i = 0; i < totalMain; i++) {
            const i3 = i * 3
            if (migrator[i]) {
                const sx = snapshotPositions[i3]
                const sy = snapshotPositions[i3 + 1]
                const sz = snapshotPositions[i3 + 2]
                positions[i3] = sx * (1 - eased)
                positions[i3 + 1] = sy * (1 - eased)
                positions[i3 + 2] = sz * (1 - eased)
                const rnd = random[i]
                colors[i3] = primaryR + primaryDiffR * rnd
                colors[i3 + 1] = primaryG + primaryDiffG * rnd
                colors[i3 + 2] = primaryB + primaryDiffB * rnd
                sizes[i] = 1.5
                alphas[i] = 1
            } else {
                const hx = homePositions[i3]
                const hy = homePositions[i3 + 1]
                const hz = homePositions[i3 + 2]
                positions[i3] = hx + Math.sin(time + i) * 0.2
                positions[i3 + 1] = hy + Math.cos(time + i) * 0.2
                positions[i3 + 2] = hz + Math.sin(time + i * 0.5) * 0.2
                const rnd = random[i]
                const brightness = 0.7 + rnd * 0.6
                colors[i3] = secondaryR * brightness
                colors[i3 + 1] = secondaryG * brightness
                colors[i3 + 2] = secondaryB * brightness
                sizes[i] = rnd * 0.8 + 0.2
                alphas[i] = 0.5
            }
        }
    } else {
        const burstElapsed = stateElapsed - STATE4_CONCENTRATE
        if (burstElapsed < BURST_DURATION) {
            const fadeNorm = 1 / BURST_DURATION
            const damping = Math.pow(BURST_DAMPING, frameScale)
            for (let i = 0; i < totalMain; i++) {
                const i3 = i * 3
                if (migrator[i]) {
                    burstVelocities[i3] *= damping
                    burstVelocities[i3 + 1] *= damping
                    burstVelocities[i3 + 2] *= damping
                    positions[i3] += burstVelocities[i3] * frameScale
                    positions[i3 + 1] += burstVelocities[i3 + 1] * frameScale
                    positions[i3 + 2] += burstVelocities[i3 + 2] * frameScale
                    const fade = Math.max(0, 1 - burstElapsed * fadeNorm)
                    const rnd = random[i]
                    const colorMix = fade * 0.5 + rnd * 0.5
                    const brightness = 1.0 + fade * 0.5
                    colors[i3] = (primaryR + primaryDiffR * colorMix) * brightness
                    colors[i3 + 1] = (primaryG + primaryDiffG * colorMix) * brightness
                    colors[i3 + 2] = (primaryB + primaryDiffB * colorMix) * brightness
                    sizes[i] = (4 + rnd * 6) * fade
                    alphas[i] = fade * 0.9
                } else {
                    const hx = homePositions[i3]
                    const hy = homePositions[i3 + 1]
                    const hz = homePositions[i3 + 2]
                    positions[i3] = hx + Math.sin(time + i) * 0.2
                    positions[i3 + 1] = hy + Math.cos(time + i) * 0.2
                    positions[i3 + 2] = hz + Math.sin(time + i * 0.5) * 0.2
                    const rnd = random[i]
                    const brightness = 0.7 + rnd * 0.6
                    colors[i3] = secondaryR * brightness
                    colors[i3 + 1] = secondaryG * brightness
                    colors[i3 + 2] = secondaryB * brightness
                    sizes[i] = rnd * 0.8 + 0.2
                    alphas[i] = 0.5
                }
            }
        }
    }
}

function updateTrail(
    trail: THREE.LineSegments,
    positions: Float32Array,
    migratorIndexMap: Int32Array,
    trailHistory: Float32Array,
    stateElapsed: number,
    totalMain: number,
    trailColor?: THREE.Color,
    fadeStart = STATE4_CONCENTRATE,
    fadeDuration = BURST_DURATION
): void {
    const trailPos = trail.geometry.attributes.position.array as Float32Array
    const fade = Math.max(0, 1 - Math.max(0, stateElapsed - fadeStart) / fadeDuration)
    if (trailColor) {
        ;(trail.material as THREE.LineBasicMaterial).color.copy(trailColor)
    }
    ;(trail.material as THREE.LineBasicMaterial).opacity = fade * 0.8
    let tIdx = 0
    for (let i = 0; i < totalMain; i++) {
        const mIdx = migratorIndexMap[i]
        if (mIdx < 0) continue
        const i3 = i * 3
        const base = mIdx * TRAIL_LENGTH * 3
        for (let h = 0; h < TRAIL_LENGTH - 1; h++) {
            trailHistory[base + h * 3] = trailHistory[base + (h + 1) * 3]
            trailHistory[base + h * 3 + 1] = trailHistory[base + (h + 1) * 3 + 1]
            trailHistory[base + h * 3 + 2] = trailHistory[base + (h + 1) * 3 + 2]
        }
        trailHistory[base + (TRAIL_LENGTH - 1) * 3] = positions[i3]
        trailHistory[base + (TRAIL_LENGTH - 1) * 3 + 1] = positions[i3 + 1]
        trailHistory[base + (TRAIL_LENGTH - 1) * 3 + 2] = positions[i3 + 2]
        for (let h = 0; h < TRAIL_LENGTH - 1; h++) {
            trailPos[tIdx++] = trailHistory[base + h * 3]
            trailPos[tIdx++] = trailHistory[base + h * 3 + 1]
            trailPos[tIdx++] = trailHistory[base + h * 3 + 2]
            trailPos[tIdx++] = trailHistory[base + (h + 1) * 3]
            trailPos[tIdx++] = trailHistory[base + (h + 1) * 3 + 1]
            trailPos[tIdx++] = trailHistory[base + (h + 1) * 3 + 2]
        }
    }
    trail.geometry.attributes.position.needsUpdate = true
}

function initializeBurstVelocities(burstVelocities: Float32Array, minSpeed = 10, maxSpeed = 14): void {
    const count = burstVelocities.length / 3
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const speed = minSpeed + Math.random() * (maxSpeed - minSpeed)
        burstVelocities[i3] = Math.sin(phi) * Math.cos(theta) * speed
        burstVelocities[i3 + 1] = Math.sin(phi) * Math.sin(theta) * speed
        burstVelocities[i3 + 2] = Math.cos(phi) * speed
    }
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export function StarFormationFramer(props: StarFormationFramerProps) {
    const {
        phase = 1,
        autoPlay = false,
        speed = 1,
        particleCount = 1400,
        backgroundColor = "#000000",
        centerColor = "#ffd700",
        starTextureVideo,
        collapseEnabled = true,
        width,
        height,
    } = props

    const containerRef = useRef<HTMLDivElement>(null)
    const isStatic = useIsStaticRenderer()

    // Three.js refs
    const sceneRef = useRef<THREE.Scene | null>(null)
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const particlesRef = useRef<THREE.Points | null>(null)
    const coreGroupRef = useRef<THREE.Group | null>(null)
    const solarVideoCoreLayerRef = useRef<THREE.Mesh | null>(null)
    const solarVideoCoreVideoRef = useRef<HTMLVideoElement | null>(null)
    const solarVideoCoreTextureRef = useRef<THREE.VideoTexture | null>(null)
    const orbitGroupRef = useRef<THREE.Group | null>(null)
    const planetsRef = useRef<PlanetInstance[]>([])
    const sunLightRef = useRef<THREE.PointLight | null>(null)
    const trailRef = useRef<THREE.LineSegments | null>(null)
    const flashMeshRef = useRef<THREE.Mesh | null>(null)
    const systemGroupRef = useRef<THREE.Group | null>(null)

    // Animation refs
    const timeRef = useRef(0)
    const stateStartRef = useRef(performance.now())
    const lastStateRef = useRef<AppState>(phase)
    const snapshotPosRef = useRef<Float32Array>(new Float32Array(particleCount * 3))
    const currentCoreColorRef = useRef(new THREE.Color(centerColor))
    const currentPrimaryColorRef = useRef(STATE_PRIMARY_COLORS[phase].clone())
    const currentSecondaryColorRef = useRef(STATE_SECONDARY_COLORS[phase].clone())
    const solarVideoCoreMixRef = useRef(0)
    const shellAngleRef = useRef(0)
    const trailHistoryRef = useRef<Float32Array>(new Float32Array(0))
    const particleDataRef = useRef<ParticleData | null>(null)
    const particleAttributesRef = useRef<ParticleAttributes | null>(null)
    const animationRef = useRef<number>(0)
    const mouseRef = useRef({ x: 0, y: 0 })
    const cameraDriftRef = useRef({ x: 0, y: 0 })
    const speedRef = useRef(speed)
    const stateRef = useRef<AppState>(phase)
    const lastFrameTimeRef = useRef<number | null>(null)
    const autoPlayTimerRef = useRef<number | null>(null)
    const hasInitRef = useRef(false)

    // Clamp particle count
    const totalMain = Math.max(100, Math.min(3000, Math.floor(particleCount)))

    useEffect(() => {
        stateRef.current = phase
    }, [phase])

    useEffect(() => {
        speedRef.current = speed
    }, [speed])

    useEffect(() => {
        currentCoreColorRef.current.set(centerColor)
    }, [centerColor])

    // Initialize scene
    useEffect(() => {
        if (!containerRef.current || hasInitRef.current) return
        hasInitRef.current = true
        const initialContainer = containerRef.current

        const scene = new THREE.Scene()
        sceneRef.current = scene

        const camera = new THREE.PerspectiveCamera(
            CAMERA_FOV,
            width / height || 1,
            CAMERA_NEAR,
            CAMERA_FAR
        )
        camera.position.z = CAMERA_Z
        cameraRef.current = camera

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(width, height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO))
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFShadowMap
        rendererRef.current = renderer
        initialContainer.appendChild(renderer.domElement)

        const ambient = new THREE.AmbientLight(AMBIENT_LIGHT_INTENSITY)
        scene.add(ambient)

        const sun = new THREE.PointLight(centerColor, SUN_LIGHT_INTENSITY, SUN_LIGHT_DISTANCE)
        sun.position.set(0, 0, 0)
        sun.castShadow = true
        sun.shadow.mapSize.width = 2048
        sun.shadow.mapSize.height = 2048
        sun.shadow.camera.near = 0.5
        sun.shadow.camera.far = 500
        scene.add(sun)
        sunLightRef.current = sun

        const { data, attributes } = initializeParticleData(totalMain)
        particleDataRef.current = data
        particleAttributesRef.current = attributes

        const systemGroup = new THREE.Group()
        scene.add(systemGroup)
        systemGroupRef.current = systemGroup

        const particles = createParticleSystem(attributes)
        systemGroup.add(particles)
        particlesRef.current = particles

        const { group: coreGroup } = createCoreGroup(centerColor)
        systemGroup.add(coreGroup)
        coreGroupRef.current = coreGroup

        // Solar video core
        const solarVideoCoreVideo = document.createElement("video")
        if (starTextureVideo) {
            solarVideoCoreVideo.src = starTextureVideo
        }
        solarVideoCoreVideo.loop = true
        solarVideoCoreVideo.muted = true
        solarVideoCoreVideo.playsInline = true
        solarVideoCoreVideo.preload = "metadata"
        solarVideoCoreVideo.crossOrigin = "anonymous"
        solarVideoCoreVideoRef.current = solarVideoCoreVideo

        const solarVideoCoreTexture = new THREE.VideoTexture(solarVideoCoreVideo)
        solarVideoCoreTexture.colorSpace = THREE.SRGBColorSpace
        solarVideoCoreTexture.minFilter = THREE.LinearFilter
        solarVideoCoreTexture.magFilter = THREE.LinearFilter
        solarVideoCoreTexture.generateMipmaps = false
        solarVideoCoreTexture.wrapS = THREE.RepeatWrapping
        solarVideoCoreTexture.wrapT = THREE.RepeatWrapping
        solarVideoCoreTextureRef.current = solarVideoCoreTexture

        const solarVideoCoreLayer = createSolarVideoCoreLayer(solarVideoCoreTexture)
        systemGroup.add(solarVideoCoreLayer)
        solarVideoCoreLayerRef.current = solarVideoCoreLayer

        const angles = PLANETS.map(() => Math.random() * Math.PI * 2)
        planetsRef.current = createPlanets(systemGroup, angles)

        const orbitGroup = createOrbitGroup(angles)
        systemGroup.add(orbitGroup)
        orbitGroupRef.current = orbitGroup

        const migratorCount = getMigratorCount(data)
        trailHistoryRef.current = new Float32Array(migratorCount * TRAIL_LENGTH * 3)
        const trailPositions = new Float32Array(migratorCount * (TRAIL_LENGTH - 1) * 6)
        const trail = createTrail(migratorCount, trailPositions)
        systemGroup.add(trail)
        trailRef.current = trail

        snapshotPosRef.current = new Float32Array(totalMain * 3)
        snapshotPosRef.current.set(attributes.positions)
        stateStartRef.current = performance.now()
        lastStateRef.current = phase

        // Static render one frame
        if (isStatic) {
            renderStaticFrame()
        }

        return () => {
            cancelAnimationFrame(animationRef.current)
            if (autoPlayTimerRef.current) {
                window.clearTimeout(autoPlayTimerRef.current)
            }

            if (rendererRef.current && initialContainer) {
                initialContainer.removeChild(rendererRef.current.domElement)
                rendererRef.current.dispose()
            }

            if (solarVideoCoreVideoRef.current) {
                solarVideoCoreVideoRef.current.pause()
                solarVideoCoreVideoRef.current.removeAttribute("src")
                solarVideoCoreVideoRef.current.load()
                solarVideoCoreVideoRef.current = null
            }

            if (solarVideoCoreLayerRef.current) {
                solarVideoCoreLayerRef.current.geometry.dispose()
                ;(solarVideoCoreLayerRef.current.material as THREE.Material).dispose()
            }
            solarVideoCoreTextureRef.current?.dispose()
            solarVideoCoreTextureRef.current = null
            solarVideoCoreLayerRef.current = null

            if (particlesRef.current) {
                particlesRef.current.geometry.dispose()
                ;(particlesRef.current.material as THREE.Material).dispose()
            }

            sceneRef.current = null
            cameraRef.current = null
            rendererRef.current = null
            hasInitRef.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalMain, width, height, isStatic])

    // Update video src when prop changes
    useEffect(() => {
        if (solarVideoCoreVideoRef.current && starTextureVideo) {
            solarVideoCoreVideoRef.current.src = starTextureVideo
            solarVideoCoreVideoRef.current.load()
        }
    }, [starTextureVideo])

    function renderStaticFrame() {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return
        // Run a single simulation frame for a representative state look
        const currentState = stateRef.current
        const now = performance.now()
        const stateElapsed = 1000 // simulate 1s into state for a good visual

        if (particlesRef.current && particleDataRef.current) {
            const posAttr = particlesRef.current.geometry.attributes.position
            const colAttr = particlesRef.current.geometry.attributes.color
            const sizeAttr = particlesRef.current.geometry.attributes.size
            const alphaAttr = particlesRef.current.geometry.attributes.alpha
            const positions = posAttr.array as Float32Array
            const colors = colAttr.array as Float32Array
            const sizes = sizeAttr.array as Float32Array
            const alphas = alphaAttr.array as Float32Array

            const attrs: ParticleAttributes = {
                positions,
                colors,
                sizes,
                alphas,
                random: particlesRef.current.geometry.attributes.random.array as Float32Array,
                migrator: particlesRef.current.geometry.attributes.migrator.array as Float32Array,
            }
            const pdata = particleDataRef.current

            switch (currentState) {
                case 0:
                    animateState0(attrs, totalMain)
                    break
                case 1:
                    animateState1(attrs, pdata, totalMain, stateElapsed, snapshotPosRef.current, 0, currentCoreColorRef.current)
                    break
                case 2:
                case 3:
                    animateState2And3(
                        attrs,
                        pdata,
                        totalMain,
                        currentState,
                        currentState === 3 ? stateElapsed : stateElapsed + STATE2_DURATION - 500,
                        snapshotPosRef.current,
                        0,
                        0,
                        currentCoreColorRef.current
                    )
                    break
                case 4:
                    animateState4(
                        attrs,
                        pdata,
                        totalMain,
                        stateElapsed + STATE4_CONCENTRATE + 200,
                        snapshotPosRef.current,
                        pdata.burstVelocity,
                        0,
                        1,
                        currentPrimaryColorRef.current,
                        currentSecondaryColorRef.current
                    )
                    break
            }

            posAttr.needsUpdate = true
            colAttr.needsUpdate = true
            sizeAttr.needsUpdate = true
            alphaAttr.needsUpdate = true
        }

        // Hide/show objects for static frame
        if (coreGroupRef.current) {
            coreGroupRef.current.visible = currentState !== 0 && currentState !== 4
        }
        if (orbitGroupRef.current) {
            orbitGroupRef.current.visible = currentState === 3
        }
        planetsRef.current.forEach((p) => {
            p.group.visible = currentState === 3
        })
        if (trailRef.current) {
            trailRef.current.visible = currentState === 4
        }
        if (solarVideoCoreLayerRef.current) {
            solarVideoCoreLayerRef.current.visible = currentState === 3
            if (currentState === 3) {
                solarVideoCoreLayerRef.current.scale.set(1, 1, 1)
            }
        }

        rendererRef.current.render(sceneRef.current, cameraRef.current)
    }

    // Animation loop
    useEffect(() => {
        if (!sceneRef.current || !cameraRef.current || !rendererRef.current || isStatic) return

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }
        window.addEventListener("mousemove", handleMouseMove)

        const handleStateChange = (transitionTime: number, nextState: AppState) => {
            if (!particlesRef.current || !particleDataRef.current) return

            lastStateRef.current = nextState
            stateStartRef.current = transitionTime

            const pos = particlesRef.current.geometry.attributes.position.array as Float32Array
            snapshotPosRef.current.set(pos)

            if (nextState === 4) {
                initializeBurstVelocities(particleDataRef.current.burstVelocity)
                if (trailRef.current) {
                    const hist = trailHistoryRef.current
                    for (let i = 0; i < totalMain; i++) {
                        const mIdx = particleDataRef.current.migratorIndexMap[i]
                        if (mIdx >= 0) {
                            const i3 = i * 3
                            for (let h = 0; h < TRAIL_LENGTH; h++) {
                                hist[mIdx * TRAIL_LENGTH * 3 + h * 3] = snapshotPosRef.current[i3]
                                hist[mIdx * TRAIL_LENGTH * 3 + h * 3 + 1] = snapshotPosRef.current[i3 + 1]
                                hist[mIdx * TRAIL_LENGTH * 3 + h * 3 + 2] = snapshotPosRef.current[i3 + 2]
                            }
                        }
                    }
                }
            }

            if (nextState !== 1 && flashMeshRef.current && sceneRef.current) {
                sceneRef.current.remove(flashMeshRef.current)
                flashMeshRef.current.geometry.dispose()
                ;(flashMeshRef.current.material as THREE.Material).dispose()
                flashMeshRef.current = null
            }

            if (nextState === 3) {
                planetsRef.current.forEach((p) => {
                    p.hasCompletedFirstOrbit = false
                    p.angleTraveled = 0
                    p.startAngle = p.angle
                })
                if (orbitGroupRef.current) {
                    orbitGroupRef.current.children.forEach((child) => {
                        const idx = child.userData.idx
                        if (typeof idx === "number") {
                            const planetConfig = PLANETS[idx]
                            const p = planetsRef.current[idx]
                            const newGeo = createOrbitGeometryFromAngle(planetConfig.radius, ORBIT_SEGMENTS, p.startAngle)
                            newGeo.setDrawRange(0, 0)
                            if (child.type === "Line") {
                                ;(child as THREE.Line).geometry.dispose()
                                ;(child as THREE.Line).geometry = newGeo
                            }
                        }
                    })
                }
            }

            if (nextState === 1 && !flashMeshRef.current && sceneRef.current) {
                flashMeshRef.current = createFlashMesh(sceneRef.current, new THREE.Color("#ffffff"), 0.6, 0.05)
            }
        }

        lastFrameTimeRef.current = null

        const animate = (frameTime: number = performance.now()) => {
            animationRef.current = requestAnimationFrame(animate)

            const now = frameTime
            const rawDeltaMs = lastFrameTimeRef.current === null ? TARGET_FRAME_MS : now - lastFrameTimeRef.current
            lastFrameTimeRef.current = now
            const deltaMs = Math.min(MAX_FRAME_DELTA_MS, Math.max(0, rawDeltaMs))
            const deltaSeconds = deltaMs / 1000
            const frameScale = deltaMs / TARGET_FRAME_MS
            const coreColorLerp = scaleFrameLerp(CORE_COLOR_LERP, frameScale)
            const ambientColorLerp = scaleFrameLerp(AMBIENT_COLOR_LERP, frameScale)
            let stateElapsed = now - stateStartRef.current
            const currentState = stateRef.current
            const currentSpeed = speedRef.current

            timeRef.current += deltaSeconds * currentSpeed

            if (particlesRef.current) {
                ;(particlesRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = timeRef.current
            }
            if (coreGroupRef.current && coreGroupRef.current.children.length >= 2) {
                const mesh = coreGroupRef.current.children[0] as THREE.Mesh
                const glow = coreGroupRef.current.children[1] as THREE.Mesh
                if (mesh && (mesh.material as THREE.ShaderMaterial).uniforms?.uTime) {
                    ;(mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = timeRef.current
                }
                if (glow && (glow.material as THREE.ShaderMaterial).uniforms?.uTime) {
                    ;(glow.material as THREE.ShaderMaterial).uniforms.uTime.value = timeRef.current
                }
            }
            if (solarVideoCoreLayerRef.current) {
                const material = solarVideoCoreLayerRef.current.material as THREE.ShaderMaterial
                if (material.uniforms?.uTime) {
                    material.uniforms.uTime.value = timeRef.current
                }
            }
            planetsRef.current.forEach((p) => {
                const glowMesh = p.group.children[1] as THREE.Mesh
                if (glowMesh && (glowMesh.material as THREE.ShaderMaterial).uniforms.uTime) {
                    ;(glowMesh.material as THREE.ShaderMaterial).uniforms.uTime.value = timeRef.current
                }
            })

            if (flashMeshRef.current && sceneRef.current) {
                const mesh = flashMeshRef.current
                mesh.scale.multiplyScalar(Math.pow(1.08, frameScale))
                const mat = mesh.material as THREE.MeshBasicMaterial
                mat.opacity -= 0.02 * frameScale
                if (mat.opacity <= 0) {
                    sceneRef.current.remove(mesh)
                    mesh.geometry.dispose()
                    mat.dispose()
                    flashMeshRef.current = null
                }
            }

            if (currentState !== lastStateRef.current) {
                handleStateChange(now, currentState)
                stateElapsed = now - stateStartRef.current
            }

            if (!particlesRef.current || !particleDataRef.current) return
            const posAttr = particlesRef.current.geometry.attributes.position
            const colAttr = particlesRef.current.geometry.attributes.color
            const sizeAttr = particlesRef.current.geometry.attributes.size
            const alphaAttr = particlesRef.current.geometry.attributes.alpha
            const positions = posAttr.array as Float32Array
            const colors = colAttr.array as Float32Array
            const sizes = sizeAttr.array as Float32Array
            const alphas = alphaAttr.array as Float32Array

            const attributes: ParticleAttributes = {
                positions,
                colors,
                sizes,
                alphas,
                random: particlesRef.current.geometry.attributes.random.array as Float32Array,
                migrator: particlesRef.current.geometry.attributes.migrator.array as Float32Array,
            }
            const pdata = particleDataRef.current

            const targetPrimaryColor = STATE_PRIMARY_COLORS[currentState]
            const targetSecondaryColor = STATE_SECONDARY_COLORS[currentState]
            const solarVideoCoreMix =
                currentState === 3
                    ? smoothstep01((stateElapsed - SOLAR_VIDEO_CORE_REVEAL_DELAY) / SOLAR_VIDEO_CORE_TRANSITION_DURATION)
                    : 0
            solarVideoCoreMixRef.current = solarVideoCoreMix

            switch (currentState) {
                case 0:
                    animateState0(attributes, totalMain)
                    if (coreGroupRef.current) coreGroupRef.current.visible = false
                    if (orbitGroupRef.current) orbitGroupRef.current.visible = false
                    planetsRef.current.forEach((p) => (p.group.visible = false))
                    if (trailRef.current) trailRef.current.visible = false
                    break
                case 1:
                    animateState1(
                        attributes,
                        pdata,
                        totalMain,
                        stateElapsed,
                        snapshotPosRef.current,
                        timeRef.current,
                        currentCoreColorRef.current
                    )
                    if (coreGroupRef.current) {
                        coreGroupRef.current.visible = true
                        coreGroupRef.current.scale.set(1, 1, 1)
                        coreGroupRef.current.children[1]?.scale.set(1, 1, 1)
                    }
                    if (orbitGroupRef.current) orbitGroupRef.current.visible = false
                    planetsRef.current.forEach((p) => (p.group.visible = false))
                    if (trailRef.current) trailRef.current.visible = false
                    break
                case 2:
                case 3:
                    shellAngleRef.current += 0.012 * currentSpeed * frameScale
                    animateState2And3(
                        attributes,
                        pdata,
                        totalMain,
                        currentState,
                        stateElapsed,
                        snapshotPosRef.current,
                        timeRef.current,
                        shellAngleRef.current,
                        currentCoreColorRef.current
                    )

                    if (coreGroupRef.current) {
                        coreGroupRef.current.visible = true
                        const [, glow] = coreGroupRef.current.children
                        coreGroupRef.current.scale.set(1, 1, 1)
                        const substate3Start = STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION
                        const isState2Substate3 = currentState === 2 && stateElapsed >= substate3Start
                        const substate3T = isState2Substate3
                            ? Math.min(1, (stateElapsed - substate3Start) / (STATE2_DURATION - substate3Start))
                            : 0
                        const easedSubstate3T = substate3T * substate3T * (3 - 2 * substate3T)
                        const state3Continuity = currentState === 3 ? 1 : 0
                        const glowEntrance = Math.max(state3Continuity, easedSubstate3T)
                        const spreadScale = 1 + ((SHELL_RADIUS / GLOW_RADIUS) * 1.08 - 1) * glowEntrance
                        glow.visible = false
                        glow.scale.set(spreadScale, spreadScale, spreadScale)
                    }
                    if (orbitGroupRef.current) orbitGroupRef.current.visible = currentState === 3
                    planetsRef.current.forEach((p) => (p.group.visible = false))
                    if (trailRef.current) trailRef.current.visible = false

                    if (currentState === 3) {
                        const proceduralCoreMix = 1 - solarVideoCoreMix
                        sizes[0] = (18 + Math.sin(timeRef.current * 2.1) * 2) * proceduralCoreMix
                        alphas[0] = 0.34 * proceduralCoreMix
                        colors[0] = targetPrimaryColor.r * (1.15 + solarVideoCoreMix * 0.25)
                        colors[1] = targetPrimaryColor.g * (1.08 + solarVideoCoreMix * 0.12)
                        colors[2] = targetPrimaryColor.b * (1 + solarVideoCoreMix * 0.08)

                        if (coreGroupRef.current) {
                            const cg = coreGroupRef.current
                            const scale = 1 + Math.min(stateElapsed / 1000, 0.5)
                            const spreadScale = ((SHELL_RADIUS / GLOW_RADIUS) * 1.08) / scale
                            cg.scale.set(scale, scale, scale)
                            const glow = cg.children[1]
                            glow.visible = false
                            glow.scale.set(spreadScale, spreadScale, spreadScale)
                        }

                        animatePlanets(planetsRef.current, orbitGroupRef.current, stateElapsed, currentSpeed, frameScale)

                        const coronaMix = solarVideoCoreMix * 0.22
                        for (let i = 1; i < totalMain; i++) {
                            if (!pdata.shellParticle[i]) continue
                            const i3 = i * 3
                            colors[i3] += (targetPrimaryColor.r * 1.2 - colors[i3]) * coronaMix
                            colors[i3 + 1] += (targetPrimaryColor.g * 1.12 - colors[i3 + 1]) * coronaMix
                            colors[i3 + 2] += (targetSecondaryColor.b * 0.45 - colors[i3 + 2]) * coronaMix
                            sizes[i] *= 1 + solarVideoCoreMix * 0.08
                        }
                    }
                    break
                case 4: {
                    if (coreGroupRef.current) coreGroupRef.current.visible = false
                    if (orbitGroupRef.current) orbitGroupRef.current.visible = false
                    planetsRef.current.forEach((p) => (p.group.visible = false))
                    if (trailRef.current) trailRef.current.visible = true

                    animateState4(
                        attributes,
                        pdata,
                        totalMain,
                        stateElapsed,
                        snapshotPosRef.current,
                        pdata.burstVelocity,
                        timeRef.current,
                        frameScale,
                        currentPrimaryColorRef.current,
                        currentSecondaryColorRef.current
                    )

                    const burstElapsed = stateElapsed - STATE4_CONCENTRATE
                    if (!flashMeshRef.current && burstElapsed < 200 && sceneRef.current) {
                        flashMeshRef.current = createFlashMesh(
                            sceneRef.current,
                            currentPrimaryColorRef.current,
                            0.95,
                            4
                        )
                    }

                    if (trailRef.current) {
                        updateTrail(
                            trailRef.current,
                            positions,
                            pdata.migratorIndexMap,
                            trailHistoryRef.current,
                            stateElapsed,
                            totalMain,
                            currentPrimaryColorRef.current
                        )
                    }
                    break
                }
            }

            const state2CoreGlowActive =
                currentState === 2 && stateElapsed >= STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION
            if (!state2CoreGlowActive) {
                currentCoreColorRef.current.lerp(targetPrimaryColor, coreColorLerp)
            }
            currentPrimaryColorRef.current.lerp(targetPrimaryColor, ambientColorLerp)
            currentSecondaryColorRef.current.lerp(targetSecondaryColor, ambientColorLerp)

            if (coreGroupRef.current) {
                const cg = coreGroupRef.current
                const mesh = cg.children[0] as THREE.Mesh
                const glow = cg.children[1] as THREE.Mesh
                const meshUniforms = (mesh.material as THREE.ShaderMaterial).uniforms
                const glowUniforms = (glow.material as THREE.ShaderMaterial).uniforms
                meshUniforms.uColor.value.copy(currentCoreColorRef.current)
                if (meshUniforms.uOpacity) {
                    meshUniforms.uOpacity.value = 1 - solarVideoCoreMixRef.current * SOLAR_VIDEO_CORE_PROCEDURAL_FADE
                }
                glowUniforms.uColor.value.copy(currentCoreColorRef.current)
                const showProceduralGlow = currentState === 1
                glow.visible = showProceduralGlow
                glowUniforms.uOpacity.value = showProceduralGlow ? GLOW_OPACITY : 0
                if (glowUniforms.uGlowBoost) {
                    glowUniforms.uGlowBoost.value = 1
                }
            }

            if (solarVideoCoreLayerRef.current) {
                const solarVideoCoreLayer = solarVideoCoreLayerRef.current
                const coreUniforms = (solarVideoCoreLayer.material as THREE.ShaderMaterial).uniforms
                const shouldShowSolarCore = currentState === 3 && solarVideoCoreMixRef.current > 0.001
                solarVideoCoreLayer.visible = shouldShowSolarCore
                coreUniforms.uMix.value = shouldShowSolarCore ? solarVideoCoreMixRef.current : 0
                const revealScale =
                    SOLAR_VIDEO_CORE_ENTRY_SCALE +
                    (1 - SOLAR_VIDEO_CORE_ENTRY_SCALE) * solarVideoCoreMixRef.current
                solarVideoCoreLayer.position.set(0, 0, 0)
                solarVideoCoreLayer.scale.set(revealScale, revealScale, revealScale)
                solarVideoCoreLayer.rotation.y += 0.0014 * currentSpeed * frameScale
                solarVideoCoreLayer.rotation.x = Math.sin(timeRef.current * 0.08) * 0.025

                if (solarVideoCoreVideoRef.current) {
                    if (shouldShowSolarCore && solarVideoCoreVideoRef.current.paused) {
                        void solarVideoCoreVideoRef.current.play()
                    } else if (!shouldShowSolarCore && !solarVideoCoreVideoRef.current.paused) {
                        solarVideoCoreVideoRef.current.pause()
                    }
                }
            }

            if (sunLightRef.current) {
                sunLightRef.current.color.copy(currentCoreColorRef.current)
            }

            for (let i = 0; i < totalMain; i++) {
                sizes[i] *= PARTICLE_SIZE_MULTIPLIER
            }

            posAttr.needsUpdate = true
            colAttr.needsUpdate = true
            sizeAttr.needsUpdate = true
            alphaAttr.needsUpdate = true

            if (systemGroupRef.current) {
                systemGroupRef.current.rotation.y += 0.0005 * currentSpeed * frameScale
                systemGroupRef.current.rotation.x = Math.sin(timeRef.current * 0.1) * 0.02
            }

            if (cameraRef.current) {
                const targetX = mouseRef.current.x * 8
                const targetY = mouseRef.current.y * 8
                const driftLerp = scaleFrameLerp(0.05, frameScale)
                cameraDriftRef.current.x += (targetX - cameraDriftRef.current.x) * driftLerp
                cameraDriftRef.current.y += (targetY - cameraDriftRef.current.y) * driftLerp

                const targetZ = CAMERA_Z
                cameraRef.current.position.z +=
                    (targetZ - cameraRef.current.position.z) * scaleFrameLerp(0.03, frameScale)
                cameraRef.current.position.x =
                    Math.sin(timeRef.current * CAMERA_MOVE_FREQUENCY) * CAMERA_MOVE_AMPLITUDE +
                    cameraDriftRef.current.x
                cameraRef.current.position.y =
                    Math.cos(timeRef.current * CAMERA_MOVE_FREQUENCY) * CAMERA_MOVE_AMPLITUDE +
                    cameraDriftRef.current.y
                cameraRef.current.lookAt(0, 0, 0)
            }

            rendererRef.current!.render(sceneRef.current!, cameraRef.current!)
        }

        animate()

        return () => {
            cancelAnimationFrame(animationRef.current)
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [isStatic, totalMain])

    // Local state for autoplay override; props take precedence when not autoplaying
    const [effectivePhase, setEffectivePhase] = useState<AppState>(phase)

    useEffect(() => {
        setEffectivePhase(phase)
    }, [phase])

    useEffect(() => {
        stateRef.current = effectivePhase
    }, [effectivePhase])

    useEffect(() => {
        if (!autoPlay || isStatic) return
        const STATE_DURATIONS: Record<AppState, number> = {
            0: 2000,
            1: 4000,
            2: STATE2_DURATION + 500,
            3: 6000,
            4: collapseEnabled ? STATE4_CONCENTRATE + BURST_DURATION + 800 : 2000,
        }

        const run = () => {
            const current = effectivePhase
            const duration = STATE_DURATIONS[current]
            autoPlayTimerRef.current = window.setTimeout(() => {
                const next: AppState = ((current + 1) % 5) as AppState
                setEffectivePhase(next)
            }, duration)
        }

        run()
        return () => {
            if (autoPlayTimerRef.current) window.clearTimeout(autoPlayTimerRef.current)
        }
    }, [autoPlay, isStatic, collapseEnabled, effectivePhase])

    // Keep camera aspect in sync with Framer-provided dimensions
    useEffect(() => {
        if (cameraRef.current && rendererRef.current) {
            cameraRef.current.aspect = width / (height || 1)
            cameraRef.current.updateProjectionMatrix()
            rendererRef.current.setSize(width, height)
        }
    }, [width, height])

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "100%",
                background: effectivePhase === 0 ? backgroundColor : `radial-gradient(ellipse at center, #0a0a0a 0%, ${backgroundColor} 100%)`,
                opacity: effectivePhase === 0 ? 0 : 1,
                transition: "none",
                pointerEvents: effectivePhase === 0 ? "none" : "auto",
                position: "relative",
                overflow: "hidden",
            }}
        />
    )
}

// ============================================================
// FRAMER PROPERTY CONTROLS
// ============================================================

addPropertyControls(StarFormationFramer, {
    phase: {
        type: ControlType.Number,
        title: "Phase",
        defaultValue: 1,
        min: 0,
        max: 4,
        step: 1,
        displayStepper: true,
    },
    autoPlay: {
        type: ControlType.Boolean,
        title: "Auto Play",
        defaultValue: false,
    },
    speed: {
        type: ControlType.Number,
        title: "Speed",
        defaultValue: 1,
        min: 0.1,
        max: 3,
        step: 0.1,
    },
    particleCount: {
        type: ControlType.Number,
        title: "Particle Count",
        defaultValue: 1400,
        min: 200,
        max: 3000,
        step: 100,
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#000000",
    },
    centerColor: {
        type: ControlType.Color,
        title: "Center Color",
        defaultValue: "#ffd700",
    },
    starTextureVideo: {
        type: ControlType.File,
        title: "Star Texture Video",
        allowedFileTypes: ["video/mp4", "video/webm"],
    },
    collapseEnabled: {
        type: ControlType.Boolean,
        title: "Collapse Enabled",
        defaultValue: true,
    },
})

export default StarFormationFramer
