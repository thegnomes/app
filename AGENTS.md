# NebulaHero - AI Agent Guide

## Project Overview

**NebulaHero** is an interactive WebGL experience that tells a metaphorical story about ideas forming in the mind. It combines video transitions with a sophisticated particle system to create an immersive visual narrative with 5 distinct states:

- **State 0 (Neural Brain)**: A 3D brain video with subtle neural network visualization. Clicking triggers a zoom transition.
- **State 1 (Starfield)**: Particles expand from the brain into a vast starfield, representing thoughts and ideas spreading.
- **State 2 (Charging Shell)**: A 13-second "hold to charge" interaction where particles form a rotating shell with 3 substages:
  - Substate 1 (0-6s): Particles flow from starfield to Fibonacci sphere positions
  - Substate 2 (6-10s): Spike/thorn bounce effect with continuous oscillation
  - Substate 3 (10-13s): Stable sphere with compression and blue-to-orange color shift
- **State 3 (Solar System)**: Shell stabilizes, 8 planets enter orbit with progressive orbit line drawing
- **State 4 (Collapse)**: Early release during charging causes particles to burst outward with trails, then auto-returns to State 1

The application features a glassmorphism control panel for debugging/state control and poetic text overlays that type out during state transitions.

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | 19.2.0 |
| Language | TypeScript | 5.9.3 |
| Build Tool | Vite | 7.2.4 |
| 3D Graphics | Three.js | 0.183.2 |
| Styling | Tailwind CSS | 3.4.19 |
| UI Components | shadcn/ui | New York style |
| Icons | Lucide React | 0.562.0 |
| Forms | React Hook Form + Zod | 7.70.0 / 4.3.5 |

## Project Structure

```
app/
├── src/
│   ├── components/
│   │   ├── ui/                    # 50+ shadcn/ui components (accordion, dialog, slider, etc.)
│   │   ├── ParticleCanvas.tsx     # Main WebGL particle renderer - thin wrapper
│   │   ├── ControlPanel.tsx       # Settings panel with state toggles, speed slider, color pickers
│   │   ├── StateText.tsx          # Animated typewriter text overlay for each state
│   │   ├── VideoBackground.tsx    # Handles idle brain video and zoom transition
│   │   └── Footer.tsx             # Framer attribution link
│   ├── hooks/
│   │   ├── particles/
│   │   │   ├── useParticleScene.ts      # Scene initialization, refs, cleanup
│   │   │   └── useParticleAnimation.ts  # Main animation loop, state handlers
│   │   └── use-mobile.ts          # Mobile breakpoint detection (768px)
│   ├── lib/
│   │   ├── particles/
│   │   │   ├── constants.ts       # Timing, counts, colors, planet configs
│   │   │   ├── geometry.ts        # Position generators, easing functions, SDF brain shape
│   │   │   ├── shaders.ts         # GLSL vertex/fragment shaders
│   │   │   ├── scene.ts           # Three.js scene creation (core, planets, trails, novas)
│   │   │   ├── particleData.ts    # Particle buffer initialization
│   │   │   └── animationStates.ts # State-specific animation logic (750+ lines)
│   │   └── utils.ts               # cn() helper for Tailwind class merging
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces and constants
│   ├── App.tsx                    # Root component, state machine, mouse handlers
│   ├── App.css                    # Component-specific styles
│   ├── index.css                  # Global styles, CSS variables, custom scrollbar
│   └── main.tsx                   # React entry point
├── public/                        # Static assets (videos referenced but not in repo)
├── dist/                          # Production build output
├── index.html                     # HTML entry point
├── components.json                # shadcn/ui configuration
├── tailwind.config.js             # Tailwind + theme configuration
├── vite.config.ts                 # Vite configuration with @/ alias
├── tsconfig.app.json              # TypeScript config (app) - strict mode
├── tsconfig.node.json             # TypeScript config (node)
├── vercel.json                    # Vercel deployment configuration
└── package.json
```

## Build Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## Code Style Guidelines

### TypeScript Configuration
- **Strict mode enabled** (`strict: true` in tsconfig.app.json)
- No unused locals or parameters allowed (`noUnusedLocals: true`, `noUnusedParameters: true`)
- ES2022 target with modern module resolution
- Path alias `@/` maps to `./src/` (configured in vite.config.ts and tsconfig.json)

### React Patterns
- Uses React 19 with StrictMode
- Functional components with hooks
- Custom hooks in `src/hooks/` with clear separation of concerns
- Props interfaces defined inline or in types file
- Refs used extensively for animation state to avoid closure issues

### Styling Conventions
- Tailwind CSS for all styling
- CSS variables for theming (HSL color format in index.css)
- Dark theme as default (deep purple/violet palette)
- Custom utility `cn()` from `@/lib/utils` for conditional classes
- Glassmorphism effects: `bg-[#1a1625]/95 backdrop-blur-xl`
- Custom scrollbar styling in `index.css`

### Component Patterns

**UI Components** (shadcn/ui style):
```typescript
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva("base-classes", {
  variants: { /* ... */ },
  defaultVariants: { /* ... */ }
})
```

**Custom Components**:
- Props interfaces defined at top of file
- Export both component and type definitions
- Use `type` keyword for TypeScript types

## Key Architecture Details

### State Machine
The application uses a 5-state system managed in `App.tsx`:
- State transitions triggered by mouse events (click/hold/release)
- Custom events dispatched for substate notifications (`particle:state2-substate-change`, `particle:state3-release-trigger`)
- Auto-return from State 4 to State 1 after 2.5 seconds

### WebGL Particle System

**Initialization** (`useParticleScene.ts`):
- 4000 particles total
- 50% are "migrators" that move to form shells
- Particle 0 is special (core particle, larger, center)
- BufferGeometry with custom attributes: position, color, size, alpha, random, migrator

**Animation Loop** (`useParticleAnimation.ts`):
- Runs at 60fps via requestAnimationFrame
- Updates shader uniforms (uTime) each frame
- Handles mouse-based camera drift and panning
- Nova effect (shockwave rings) on most state transitions
- Color interpolation between state colors

**State Animations** (`animationStates.ts`):
- State 0: All particles at origin, hidden (video handles visuals)
- State 1: Two-phase entry (background first, then core particle)
- State 2: Complex 3-substage animation with Fibonacci sphere formation
- State 3: Stable shell + 8 orbiting planets with progressive orbit drawing
- State 4: Concentration then burst with trails

### Custom GLSL Shaders

**Particle Shader** (`shaders.ts`):
- Vertex shader handles size attenuation and pulsing
- Fragment shader creates soft-edged circular particles with twinkling

**Core/Glow Shaders**:
- Fresnel rim effects for glow
- Breathing animation via sine waves
- Detail noise for surface texture

**Planet Glow Shader**:
- Enhanced fresnel for visibility
- Per-planet phase offset for varied pulsing

### Video System

**VideoBackground Component**:
- Idle video: `idle_brain.webm` (slow rotation, looping)
- Zoom video: `brain_zoom.webm` (click triggers, alpha transparency)
- Videos play from `/public/` directory
- Transition happens at time=0 (immediate on click)

### Camera System
- Perspective camera at Z=130
- Mouse-based drift (subtle parallax)
- Click-and-drag panning in State 1 (50px limit each direction)
- Smooth interpolation for all movements

### Text Animation System

**StateText Component**:
- Typewriter effect with cursor blinking
- Supports `<br>` tags in text
- Smooth transitions (old text shifts up and fades, new text types in)
- 12ms per character typing speed

## Dependencies Notes

**Important runtime dependencies:**
- `@react-three/fiber` - Available but not currently used (using vanilla Three.js)
- `three` - Core 3D library with custom shaders
- `@radix-ui/*` - 20+ headless UI primitives for shadcn/ui
- `zod` - Schema validation (used with React Hook Form)
- `lucide-react` - Icon library
- `class-variance-authority` - Component variant management

**Key dev dependencies:**
- `kimi-plugin-inspect-react` - Vite plugin for React inspection
- `tailwindcss-animate` - Animation utilities
- `typescript-eslint` - TypeScript linting

## Performance Considerations

- WebGL renderer limits pixel ratio to 2 (retina displays)
- Animation frame properly canceled on cleanup
- Geometry and materials disposed to prevent memory leaks
- Pre-allocated arrays to minimize GC pressure in animation loop
- Spatial hashing for brain connection generation
- Nova meshes cleaned up after animation completes

## Deployment

Configured for Vercel deployment (`vercel.json`):
- **Framework**: Vite
- **Build Command**: `node ./node_modules/vite/bin/vite.js build`
- **Output Directory**: `dist`
- **Install Command**: `npm ci --prefer-offline --no-audit`

Static assets (videos) should be placed in `public/` directory:
- `idle_brain.webm` - Idle brain rotation
- `brain_zoom.webm` - Zoom transition with alpha

See `DEPLOY.md` for detailed deployment instructions including GitHub integration.

## Testing

No test framework is currently configured. To add testing:
- Consider Vitest (works well with Vite)
- React Testing Library for component tests
- Add test scripts to package.json

## Security Considerations

- No authentication or sensitive data handling
- External links use `target="_blank"` with `rel="noopener noreferrer"`
- All user input is through controlled sliders/color pickers (safe)
- Video files should be served with proper CORS headers if on CDN

## Adding New Features

### Adding a New shadcn/ui Component
```bash
npx shadcn add <component-name>
```
Components are installed to `src/components/ui/` with proper imports.

### Adding a New Particle State
1. Add state number to `AppState` type in `types/index.ts`
2. Add state label to `STATE_LABELS`
3. Add colors to `STATE_PRIMARY_COLORS` and `STATE_SECONDARY_COLORS` in `constants.ts`
4. Implement animation function in `animationStates.ts`
5. Add case to animation switch in `useParticleAnimation.ts`
6. Update `StateText.tsx` with new state content
7. Add state button to `ControlPanel.tsx`

### Modifying Planet Configuration
Edit `PLANETS` array in `src/lib/particles/constants.ts`:
```typescript
export const PLANETS: PlanetConfig[] = [
  { radius: 34, size: 3.2, speed: 1.1, color: '#60a5fa' },
  // ...
];
```

## Troubleshooting

### Video not playing
- Ensure `.webm` files are in `public/` directory
- Check browser console for 404 errors
- Verify video codecs (VP9 with alpha for brain_zoom)

### Performance issues
- Reduce `TOTAL_MAIN` in `constants.ts` (default: 4000)
- Lower `MAX_PIXEL_RATIO` (default: 2)
- Disable shadows in `scene.ts`

### Build errors
- Check Node.js version (should be 18+)
- Delete `node_modules` and `package-lock.json`, then `npm install`
- Ensure all TypeScript strict mode rules are satisfied

## Environment Variables

No environment variables are required for basic operation. Optional variables for deployment:
- `VERCEL_TOKEN` - For CLI deployments
