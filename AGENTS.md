# NebulaHero - AI Agent Guide

## Project Overview

NebulaHero is a React, TypeScript, and vanilla Three.js WebGL experience about ideas forming in the mind. It pairs video transitions with a modular particle system, a debug/control panel, and poetic text overlays.

The particle system is not a generic preset-based demo. It is a state-driven cinematic sequence implemented through `ParticleCanvas` plus particle-specific hooks and library modules.

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

- State 0: Hidden. The particle canvas is transparent/disabled while the video brain handles the visual.
- State 1: Star Field. Particles spread into starfield/home positions and support subtle camera panning.
- State 2: Charging Shell. Holding interaction drives migrators into a shell with staged absorption, bounce/stabilization, and color shift.
- State 3: Solar System. The shell stabilizes while planets enter, orbit, and draw orbit lines progressively.
- State 4: Collapse. Early release during charging drives burst/collapse motion with migrator trails, then returns to State 1.

`App.tsx` owns the high-level state machine and mouse interaction. Particle state changes are consumed by the particle hooks and animation modules.

## Particle Architecture

The particle system is intentionally split across a thin React wrapper, hooks, and pure-ish Three.js helpers:

- `src/components/ParticleCanvas.tsx`: Orchestration wrapper. It wires React props into `useParticleScene` and `useParticleAnimation`, owns the container element, and sets canvas-level cursor/opacity/pointer behavior. Do not treat this as the sole renderer.
- `src/hooks/particles/useParticleScene.ts`: Scene, renderer, camera, refs, object creation, resize handling, buffer setup, and cleanup.
- `src/hooks/particles/useParticleAnimation.ts`: `requestAnimationFrame` loop, state transition handling, shader uniform updates, camera drift/panning, novas, flash cleanup, planets, trails, and calls into state animation functions.
- `src/lib/particles/constants.ts`: Timing, particle counts, trail length, orbit segment counts, renderer limits, camera values, colors, planet config, and animation tuning constants.
- `src/lib/particles/particleData.ts`: Particle data initialization, migrator selection/indexing, typed arrays, buffers, trail sizing, shell/home positions, and burst data.
- `src/lib/particles/animationStates.ts`: State-specific motion logic for hidden/starfield/charging shell/solar system/collapse behavior, including trail updates and burst velocity initialization.
- `src/lib/particles/geometry.ts`: Position generation, easing helpers, and orbit geometry helpers.
- `src/lib/particles/shaders.ts`: GLSL shaders for particles, core/glow, and related visual treatments.
- `src/lib/particles/scene.ts`: Three.js object creation for particles, core/glow, planets, trails, flashes, and novas.

## Source Of Truth For Motion And Performance

Use the module that owns the behavior you are changing:

- Counts, timing constants, renderer limits, trail length, orbit segment count, camera constants, colors, and planet config belong in `src/lib/particles/constants.ts`.
- Migrator ratios, generated particle buffers, trail buffer sizing, and per-particle initialization belong in `src/lib/particles/particleData.ts`.
- Frame progression, shader uniform time updates, transition hooks, camera drift/panning, planet/orbit frame work, nova cleanup, and render-loop concerns belong in `src/hooks/particles/useParticleAnimation.ts`.
- Per-state motion curves, easing, shell formation, State 2 bounce/stabilization, State 3 shell/planet behavior, State 4 burst/trails, and particle position/color/alpha/size updates belong in `src/lib/particles/animationStates.ts`.
- Scene object construction and disposal behavior belong in `src/lib/particles/scene.ts` or `src/hooks/particles/useParticleScene.ts`, depending on whether the change creates objects or wires lifecycle.
- Canvas DOM wiring, container style, and hook orchestration belong in `src/components/ParticleCanvas.tsx`.

Prefer changing the narrowest owner rather than pushing new logic up into `ParticleCanvas`.

## Quality Direction For Future Particle Work

For cinematic smoothness, favor calm motion over raw particle density:

- Prefer fewer particles with smoother motion over denser noisy visuals.
- Prefer controlled easing and lower-frequency movement.
- Treat softness/glow as a shader or post-process problem, not a density problem.
- Reduce motion aggressiveness before increasing particle count.
- Keep State 2 especially restrained; high-frequency shell bounce reads as jitter before it reads as energy.
- Keep twinkle subtle. It should add life, not fight the main motion.

## Preferred Optimisation Targets

These are recommended starting points for future patches, not a description of the current implementation:

- `TOTAL_MAIN` target: 1200-1600.
- `TRAIL_LENGTH` target: 4-6.
- `ORBIT_SEGMENTS` target: 72-96.
- Migrator ratio target: 20-30%.
- Prefer delta-time animation over fixed-step time progression.
- Reduce State 2 bounce frequency and amplitude substantially.
- Reduce twinkle intensity to subtle levels.

Current values may differ. Check `src/lib/particles/constants.ts`, `src/lib/particles/particleData.ts`, and `src/lib/particles/shaders.ts` before editing.

## Agent Editing Rules

- Avoid making motion-quality edits in `src/components/ParticleCanvas.tsx` unless you are changing React wiring, canvas visibility, pointer behavior, or hook orchestration.
- Prefer motion and performance edits in `src/lib/particles/constants.ts`, `src/lib/particles/particleData.ts`, `src/hooks/particles/useParticleAnimation.ts`, and `src/lib/particles/animationStates.ts`.
- Preserve renderer, geometry, material, event listener, and animation-frame cleanup behavior.
- Preserve strict TypeScript style: no unused locals/parameters, explicit types where local patterns expect them, and no loose `any` unless the surrounding code already requires it.
- Distinguish current facts from recommended guidance in docs and comments. If a value is a target, label it as a target.
- Keep particle changes measurable. When possible, run `npm run build` after behavior changes and inspect the visual result with the dev server.
- Do not edit generated `dist/` output unless the user explicitly asks for it.

## Code Style Notes

- React components are functional and hook-based.
- Refs are used heavily for animation state to avoid stale closures and unnecessary React renders.
- Tailwind CSS is the default styling approach.
- Use `cn()` from `@/lib/utils` for conditional class merging.
- shadcn/ui components live in `src/components/ui/` and follow the local component patterns.
- Keep comments short and useful; prefer naming and local structure over narration.

## Video And UI Layers

- `src/components/VideoBackground.tsx` handles the idle brain video and zoom transition video.
- Expected video assets live in `public/`: `idle_brain.webm` and `brain_zoom.webm`.
- `src/components/StateText.tsx` handles the typewriter text overlay.
- `src/components/ControlPanel.tsx` handles debug/state controls.
- `src/components/Footer.tsx` handles the attribution link.

## Adding A Particle State

1. Add the state number to the `AppState` type in `src/types/index.ts`.
2. Add state labels or UI mappings where needed.
3. Add colors/timing constants in `src/lib/particles/constants.ts`.
4. Add or update state-specific logic in `src/lib/particles/animationStates.ts`.
5. Wire the state into the animation switch in `src/hooks/particles/useParticleAnimation.ts`.
6. Update `StateText.tsx` and `ControlPanel.tsx` if the state should be visible in UI.

## Deployment And Testing

Vercel deployment is configured in `vercel.json`:

- Framework: Vite.
- Build command: `node ./node_modules/vite/bin/vite.js build`.
- Output directory: `dist`.
- Install command: `npm ci --prefer-offline --no-audit`.

No dedicated test framework is currently configured. For code changes, use `npm run build` and `npm run lint` as the baseline checks unless the task calls for a narrower verification.

## Troubleshooting

- Video 404s: confirm `.webm` files are present in `public/`.
- Strict TypeScript errors: check unused imports, locals, and parameters first.
- Particle performance issues: start with counts, trail length, orbit segment count, migrator ratio, fixed-step time progression, State 2 bounce tuning, and shader twinkle/glow intensity.
- Visual cleanup or memory issues: inspect object disposal in `useParticleScene.ts`, `useParticleAnimation.ts`, and `scene.ts`.
