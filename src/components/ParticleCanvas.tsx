import type { MutableRefObject } from 'react';
import type { AppState, ParticleConfig } from '@/types';
import { useParticleScene } from '@/hooks/particles/useParticleScene';
import { useParticleAnimation } from '@/hooks/particles/useParticleAnimation';

interface CameraPanRef {
  isDragging: boolean;
  offset: { x: number; y: number };
  targetOffset: { x: number; y: number };
}

interface ParticleCanvasProps {
  state: AppState;
  config: ParticleConfig;
  cameraPanRef: MutableRefObject<CameraPanRef>;
  zoomTriggered?: boolean;
}

/**
 * ParticleCanvas Component
 * 
 * Renders a WebGL particle system with 5 states:
 * - State 0: Neural Brain (3D particle brain)
 * - State 1: Star Field (particles spread to random positions)
 * - State 2: Charging Shell (migrating particles form a rotating shell)
 * - State 3: Solar System (shell stabilizes, planets appear and orbit)
 * - State 4: Collapse (particles burst outward with trails)
 * 
 * The component is fully modular, using custom hooks and separated
 * utility functions for maintainability.
 */
export function ParticleCanvas({ state, config, cameraPanRef, zoomTriggered }: ParticleCanvasProps) {
  // Initialize scene and get refs/data
  const { refs, data, containerRef } = useParticleScene(config);

  // Run animation loop
  useParticleAnimation({ state, config, refs, data, cameraPanRef, zoomTriggered });

  // Update cursor style based on state and drag
  const cursorStyle = cameraPanRef.current?.isDragging ? 'grabbing' : state === 0 ? 'pointer' : state === 1 ? 'grab' : 'default';

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)',
        cursor: cursorStyle,
      }}
    />
  );
}

export default ParticleCanvas;
