# NebulaHero - AI Agent Guide

## Project Overview

NebulaHero is a React, TypeScript, and vanilla Three.js WebGL experience about ideas forming in the mind. It pairs video transitions with a modular particle system, a debug/control panel, and poetic text overlays.

The particle system is **state-driven and modular**, not a preset-based demo. It is implemented through `ParticleCanvas` (orchestration wrapper) plus particle-specific hooks and library modules.

## Core Stack

| Category | Technology |
| --- | --- |
| Framework | React 19 |
| Language | TypeScript 5.9 |
| Build Tool | Vite 7 |
| 3D Graphics | Three.js 0.183 |
| Styling | Tailwind CSS 3.4 |
| UI Components | shadcn/ui, Radix UI |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |

Path alias: `@/` maps to `./src/` through Vite and TypeScript config.

## Build Commands

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Current State Flow

`ParticleCanvas` renders the WebGL layer for five app states:

| State | Name | Description |
|-------|------|-------------|
| 0 | Hidden | Canvas is transparent/disabled while video brain handles visuals. |
| 1 | Star Field | Particles spread to starfield/home positions with subtle camera panning. |
| 2 | Charging Shell | Holding interaction drives particles into a shell with staged absorption, clustered bipolar spike volatility, bounce decay, compression, shell color shift, and substate 3 glow. |
| 3 | Solar System | The stabilized shell carries forward into the solar-system state while planets enter, orbit, and draw orbit lines progressively. |
| 4 | Collapse | Early release during charging drives burst/collapse motion with migrator trails, then returns to State 1. |

`App.tsx` owns the high-level state machine and mouse interaction. Particle state changes are consumed by hooks and animation modules.

## Particle Architecture

The system is split across a thin React wrapper, hooks, and pure-ish Three.js helpers:

| File | Responsibility |
|------|----------------|
| `src/components/ParticleCanvas.tsx` | **Orchestration wrapper**. Wires React props into `useParticleScene` and `useParticleAnimation`. Owns the container element, canvas-level cursor/opacity/pointer behavior. **Not the sole renderer.** |
| `src/hooks/particles/useParticleScene.ts` | Scene, renderer, camera, refs, object creation, resize handling, buffer setup, and cleanup. |
| `src/hooks/particles/useParticleAnimation.ts` | `requestAnimationFrame` loop, delta-time progression, state transition handling, shader uniform updates, camera drift/panning, novas, flash cleanup, planets, trails, State 2/3 core glow scale continuity, and calls into state animation functions. |
| `src/lib/particles/constants.ts` | Timing, particle counts, trail length, orbit segment counts, renderer limits, camera values, colors, planet config, State 2 spike-cluster tuning, and animation tuning constants. |
| `src/lib/particles/particleData.ts` | Particle data initialization, migrator selection/indexing, typed arrays, buffers, trail sizing, shell/home positions, burst data, and precomputed State 2 spike cluster membership/weights/phases. |
| `src/lib/particles/animationStates.ts` | State-specific motion logic for hidden/starfield/charging shell/solar system/collapse behavior, including clustered State 2 shell motion, shell/core color and glow timing, trail updates, and burst velocity initialization. |
| `src/lib/particles/geometry.ts` | Position generation, easing helpers, and orbit geometry helpers. |
| `src/lib/particles/shaders.ts` | GLSL shaders for particles, core/glow, and related visual treatments. |
| `src/lib/particles/scene.ts` | Three.js object creation for particles, core/glow, planets, trails, flashes, and novas. |

## Source of Truth for Motion and Performance

Use the module that owns the behavior you are changing:

| If changing... | Edit... |
|----------------|---------|
| Counts, timing constants, renderer limits, trail length, orbit segment count, camera constants, colors, planet config, State 2 spike-cluster tuning | `src/lib/particles/constants.ts` |
| Migrator ratios, generated particle buffers, trail buffer sizing, per-particle initialization, State 2 cluster membership/weights/phases | `src/lib/particles/particleData.ts` |
| Frame progression, shader uniform time updates, transition hooks, camera drift/panning, planet/orbit frame work, nova cleanup, render-loop concerns, core glow scale continuity | `src/hooks/particles/useParticleAnimation.ts` |
| Per-state motion curves, easing, shell formation, State 2 clustered bipolar spike motion, State 2/3 shell glow and color continuity, State 4 burst/trails, particle position/color/alpha/size updates | `src/lib/particles/animationStates.ts` |
| Scene object construction and disposal | `src/lib/particles/scene.ts` or `src/hooks/particles/useParticleScene.ts` (depending on lifecycle) |
| Canvas DOM wiring, container style, hook orchestration | `src/components/ParticleCanvas.tsx` |

Prefer changing the narrowest owner rather than pushing new logic up into `ParticleCanvas`.

## Current Particle Motion Notes

Current particle budgets and motion defaults are intentionally lighter than the original demo:

| Value | Current implementation |
|-------|------------------------|
| `TOTAL_MAIN` | 1400 |
| `MIGRATOR_RATIO` | 0.25 |
| `TRAIL_LENGTH` | 5 |
| `ORBIT_SEGMENTS` | 84 |
| Time progression | Delta-time based, clamped by `MAX_FRAME_DELTA_MS` and normalized with `TARGET_FRAME_MS` |

State 2 uses precomputed clustered spike metadata:

- Cluster leaders are selected once in `particleData.ts` using `STATE2_SPIKE_CLUSTER_LEADER_RATIO`.
- Cluster weights use leader, ring 1, and ring 2 weights from `constants.ts`.
- If clusters overlap, the higher cluster weight wins rather than adding stacked amplitude.
- Cluster motion is bipolar and radial around the stable shell anchor: particles move inward and outward around the shell, with an inward clamp from `STATE2_SPIKE_MIN_RADIUS_RATIO`.
- Cluster phase and small phase lag are precomputed so neighbouring particles move coherently as visible spike/thorn clusters rather than random glitter.
- Bounce decay, shell color interpolation, and sphere compression share timing in `animationStates.ts`; avoid reintroducing separate envelopes that make the shell snap stable and restart.
- State 2 substate 3 adds eased shell glow, white-to-orange core color, stronger core particle glow, and glow spread just outside the shell.
- State 3 preserves the stabilized shell and glow scale continuity so the transition from charging shell to solar system does not visibly drop in intensity.

## Quality Direction for Future Particle Work

For cinematic smoothness, favor **calm motion over raw particle density**:

- Prefer fewer particles with smoother motion over denser noisy visuals.
- Prefer controlled easing and lower-frequency movement.
- Treat softness/glow as a shader or post-process problem, not a density problem.
- Reduce motion aggressiveness before increasing particle count.
- Keep State 2 structured: prefer coherent clustered bipolar spikes over fully random per-particle jitter.
- Keep twinkle subtle. It should add life, not fight the main motion.

## Preferred Optimisation Targets

> **Note:** These are recommended starting points for future patches, **not** a description of the current implementation.

| Target | Value |
|--------|-------|
| `TOTAL_MAIN` | 1200-1600 |
| `TRAIL_LENGTH` | 4-6 |
| `ORBIT_SEGMENTS` | 72-96 |
| Migrator ratio | 20-30% |
| Time progression | Prefer delta-time animation over fixed-step |
| State 2 bounce | Use coherent clustered bipolar spikes and a single continuous decay envelope |
| Twinkle | Reduce intensity to subtle levels |

Current values may differ. Check `src/lib/particles/constants.ts`, `src/lib/particles/particleData.ts`, and `src/lib/particles/shaders.ts` before editing.

## Agent Editing Rules

- **Avoid** making motion-quality edits in `src/components/ParticleCanvas.tsx` unless you are changing React wiring, canvas visibility, pointer behavior, or hook orchestration.
- **Prefer** motion and performance edits in `src/lib/particles/constants.ts`, `src/lib/particles/particleData.ts`, `src/hooks/particles/useParticleAnimation.ts`, and `src/lib/particles/animationStates.ts`.
- For State 2 spike changes, update cluster tuning in `constants.ts`, cluster membership generation in `particleData.ts`, and runtime motion/color/glow timing in `animationStates.ts`; keep render-loop glow scale continuity in `useParticleAnimation.ts`.
- Preserve renderer, geometry, material, event listener, and animation-frame cleanup behavior.
- Preserve strict TypeScript style: no unused locals/parameters, explicit types where local patterns expect them, and no loose `any` unless the surrounding code already requires it.
- Distinguish current facts from recommended guidance in docs and comments. If a value is a target, label it as a target.
- Keep particle changes measurable. When possible, run `npm run build` after behavior changes and inspect the visual result with the dev server.
- Do not edit generated `dist/` output unless explicitly asked.

## Code Style Notes

- React components are functional and hook-based.
- Refs are used heavily for animation state to avoid stale closures and unnecessary React renders.
- Tailwind CSS is the default styling approach.
- Use `cn()` from `@/lib/utils` for conditional class merging.
- shadcn/ui components live in `src/components/ui/` and follow the local component patterns.
- Keep comments short and useful; prefer naming and local structure over narration.

## Video and UI Layers

- `src/components/VideoBackground.tsx` handles the idle brain video and zoom transition video.
- Expected video assets live in `public/`: `idle_brain.webm` and `brain_zoom.webm`.
- `src/components/StateText.tsx` handles the typewriter text overlay.
- `src/components/ControlPanel.tsx` handles debug/state controls.
- `src/components/Footer.tsx` handles the attribution link.

## Adding a Particle State

1. Add the state number to the `AppState` type in `src/types/index.ts`.
2. Add state labels or UI mappings where needed.
3. Add colors/timing constants in `src/lib/particles/constants.ts`.
4. Add or update state-specific logic in `src/lib/particles/animationStates.ts`.
5. Wire the state into the animation switch in `src/hooks/particles/useParticleAnimation.ts`.
6. Update `StateText.tsx` and `ControlPanel.tsx` if the state should be visible in UI.

## Deployment and Testing

Vercel deployment is configured in `vercel.json`:

- Framework: Vite
- Build command: `node ./node_modules/vite/bin/vite.js build`
- Output directory: `dist`
- Install command: `npm ci --prefer-offline --no-audit`

No dedicated test framework is currently configured. For code changes, use `npm run build` and `npm run lint` as the baseline checks unless the task calls for a narrower verification.

## Troubleshooting

- **Video 404s:** confirm `.webm` files are present in `public/`.
- **Strict TypeScript errors:** check unused imports, locals, and parameters first.
- **Particle performance issues:** start with counts, trail length, orbit segment count, migrator ratio, fixed-step time progression, State 2 bounce tuning, and shader twinkle/glow intensity.
- **Visual cleanup or memory issues:** inspect object disposal in `useParticleScene.ts`, `useParticleAnimation.ts`, and `scene.ts`.
