# NebulaHero - AI Agent Guide

## Project Overview

**NebulaHero** is an interactive WebGL particle system demo built with React, TypeScript, and Three.js. It showcases a visually stunning, customizable 3D particle animation with a galaxy/nebula aesthetic and a glassmorphism-style control panel.

The application features:
- Real-time WebGL particle rendering using Three.js
- 5 different particle presets (Galaxy, Nebula, Star Field, Swarm, Vortex)
- Interactive control panel for live customization
- Mouse-influenced camera movement
- Custom GLSL shaders for particle effects

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | React 19.2 |
| Language | TypeScript 5.9 |
| Build Tool | Vite 7.2 |
| Styling | Tailwind CSS 3.4 |
| UI Components | shadcn/ui (New York style) |
| 3D Graphics | Three.js 0.183 |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |

## Project Structure

```
app/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components (50+ pre-built)
│   │   ├── ParticleCanvas.tsx   # Main WebGL particle renderer
│   │   ├── ControlPanel.tsx     # Settings panel with sliders
│   │   ├── HeroText.tsx         # Animated hero text overlay
│   │   └── Footer.tsx           # Footer with Framer link
│   ├── hooks/
│   │   └── use-mobile.ts    # Mobile breakpoint detection
│   ├── lib/
│   │   └── utils.ts         # Utility functions (cn helper)
│   ├── App.tsx              # Root application component
│   ├── App.css              # App-specific styles
│   ├── index.css            # Global styles + Tailwind
│   └── main.tsx             # Application entry point
├── dist/                    # Production build output
├── index.html               # HTML entry point
├── components.json          # shadcn/ui configuration
├── tailwind.config.js       # Tailwind + theme configuration
├── vite.config.ts           # Vite configuration
├── tsconfig.app.json        # TypeScript config (app)
├── tsconfig.node.json       # TypeScript config (node)
└── package.json
```

## Build Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Code Style Guidelines

### TypeScript
- Strict mode enabled (`strict: true`)
- No unused locals or parameters allowed
- ES2022 target with modern module resolution
- Path alias `@/` maps to `./src/`

### React Patterns
- Uses React 19 with StrictMode
- Functional components with hooks
- Custom hooks in `src/hooks/`
- Props interfaces defined inline or exported from components

### Styling Conventions
- Tailwind CSS for all styling
- CSS variables for theming (HSL color format)
- Dark theme as default (deep purple/violet palette)
- Custom utility `cn()` from `@/lib/utils` for conditional classes
- Glassmorphism effects: `bg-[#1a1625]/95 backdrop-blur-xl`

### Component Patterns

**UI Components** (shadcn/ui style):
```typescript
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

// Use cva for variant-based styling
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

### WebGL Particle System (`ParticleCanvas.tsx`)
- Uses Three.js with custom ShaderMaterial
- Vertex and fragment shaders written in GLSL
- 5 geometry generators for different presets
- Mouse tracking with smooth interpolation
- Animation loop with requestAnimationFrame
- Proper cleanup on unmount (dispose geometries/materials)

### State Management
- React useState for local component state
- Props drilling for component communication
- No external state management library

### Path Aliases
Configured in `vite.config.ts` and `tsconfig.json`:
- `@/` → `./src/`
- `@/components` → `./src/components`
- `@/lib` → `./src/lib`
- `@/hooks` → `./src/hooks`

## Testing

No test framework is currently configured. To add testing:
- Consider Vitest (works well with Vite)
- React Testing Library for component tests
- Add test scripts to package.json

## Deployment

The build output goes to `dist/` directory:
- `dist/index.html` - Entry HTML
- `dist/assets/` - Bundled JS and CSS

Configured for relative paths (`base: './'` in vite.config.ts), suitable for:
- Static hosting (Netlify, Vercel, GitHub Pages)
- Embedded in other applications

## Adding New shadcn/ui Components

```bash
npx shadcn add <component-name>
```

Components are installed to `src/components/ui/` with proper imports.

## Dependencies Notes

**Important runtime dependencies:**
- `@react-three/fiber` - React renderer for Three.js (available but using vanilla Three.js)
- `three` - Core 3D library
- `zod` - Schema validation
- `lucide-react` - Icon library

**Key dev dependencies:**
- `kimi-plugin-inspect-react` - Vite plugin for React inspection
- `tailwindcss-animate` - Animation utilities

## Security Considerations

- No authentication or sensitive data handling
- External links use `target="_blank"` with `rel="noopener noreferrer"`
- All user input is through controlled sliders/color pickers (safe)

## Performance Notes

- WebGL renderer limits pixel ratio to 2 (retina displays)
- Particle count configurable (1000-20000)
- Animation frame properly canceled on cleanup
- Geometry and materials disposed to prevent memory leaks
