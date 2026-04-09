import { useState, useRef, useEffect, useCallback } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { ControlPanel } from './components/ControlPanel';
import { StateText } from './components/StateText';
import { Footer } from './components/Footer';
import { VideoBackground } from './components/VideoBackground';
import './App.css';
import {
  STATE2_ABSORPTION_DURATION,
  STATE2_STABILIZE_DURATION,
  STATE2_DURATION,
} from '@/lib/particles/constants';

export type AppState = 0 | 1 | 2 | 3 | 4;

export interface ParticleConfig {
  speed: number;
  centerColor: string;
  ambientColor: string;
}

const defaultConfig: ParticleConfig = {
  speed: 1.0,
  centerColor: '#ffd700',
  ambientColor: '#60a5fa',
};

function App() {
  const [state, setState] = useState<AppState>(0);
  const [config, setConfig] = useState<ParticleConfig>(defaultConfig);
  
  // Use refs to track current state to avoid closure issues
  const stateRef = useRef<AppState>(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);
  
  // State transition refs
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const substateTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const inState2Ref = useRef(false);
  const planetEntryReadyRef = useRef(false); // Set when State 2 completes, triggers planets on mouse up
  
  // Camera pan state
  const panStateRef = useRef({
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    cameraOffset: { x: 0, y: 0 },
    targetOffset: { x: 0, y: 0 },
  });

  // Expose camera pan controls to ParticleCanvas via ref
  const cameraPanRef = useRef({
    isDragging: false,
    offset: { x: 0, y: 0 },
    targetOffset: { x: 0, y: 0 },
  });

  const clearState2Timers = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    substateTimersRef.current.forEach((timerId) => clearTimeout(timerId));
    substateTimersRef.current = [];
  }, []);

  const dispatchState2SubstateEvent = useCallback((substate: 1 | 2 | 3, startMs: number, endMs: number) => {
    window.dispatchEvent(
      new CustomEvent('particle:state2-substate-change', {
        detail: { substate, startMs, endMs },
      })
    );
  }, []);

  // Handle transition from State 0 (video brain) to State 1 (starfield)
  const handleVideoTransition = useCallback(() => {
    setState(1);
  }, []);

  // Separate mouse handler for canvas pan (only works on particle canvas)
  useEffect(() => {
    const canvas = document.querySelector('.particle-canvas-container');
    if (!canvas) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (stateRef.current !== 1) return; // Only pan in State 1
      
      panStateRef.current.isDragging = true;
      panStateRef.current.dragStart = { x: e.clientX, y: e.clientY };
      cameraPanRef.current.isDragging = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!panStateRef.current.isDragging) return;
      
      const dx = (e.clientX - panStateRef.current.dragStart.x) * 0.05;
      const dy = (e.clientY - panStateRef.current.dragStart.y) * 0.05;
      
      panStateRef.current.targetOffset = {
        x: panStateRef.current.cameraOffset.x + dx,
        y: panStateRef.current.cameraOffset.y - dy
      };
      
      panStateRef.current.targetOffset.x = Math.max(-50, Math.min(50, panStateRef.current.targetOffset.x));
      panStateRef.current.targetOffset.y = Math.max(-50, Math.min(50, panStateRef.current.targetOffset.y));
      
      cameraPanRef.current.targetOffset = panStateRef.current.targetOffset;
    };

    const handleMouseUp = () => {
      if (panStateRef.current.isDragging) {
        panStateRef.current.cameraOffset = { ...panStateRef.current.targetOffset };
        cameraPanRef.current.offset = panStateRef.current.cameraOffset;
      }
      panStateRef.current.isDragging = false;
      cameraPanRef.current.isDragging = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Global mouse handler for state transitions (only in State 1, on canvas only)
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      
      // Only handle clicks on the particle canvas, not on UI
      const target = e.target as HTMLElement;
      if (target.closest('.control-panel')) return;
      if (target.closest('.video-background')) return;
      
      // Only work in State 1
      if (stateRef.current !== 1) return;
      
      // Start charging (hold to charge shell) - 7000ms for 3 substages
      setState(2);
      inState2Ref.current = true;

      dispatchState2SubstateEvent(1, 0, STATE2_ABSORPTION_DURATION);
      substateTimersRef.current.push(
        setTimeout(() => {
          dispatchState2SubstateEvent(
            2,
            STATE2_ABSORPTION_DURATION,
            STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION
          );
        }, STATE2_ABSORPTION_DURATION)
      );
      substateTimersRef.current.push(
        setTimeout(() => {
          dispatchState2SubstateEvent(
            3,
            STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION,
            80000
          );
        }, STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION)
      );

      holdTimerRef.current = setTimeout(() => {
        // State 2 complete - ready for planet entry on mouse release
        inState2Ref.current = false;
        planetEntryReadyRef.current = true;
      }, STATE2_DURATION);
    };

    const handleMouseUp = () => {
      if (inState2Ref.current) {
        // Released early during State 2 - go to collapse
        clearState2Timers();
        inState2Ref.current = false;
        setState(4);
      } else if (planetEntryReadyRef.current) {
        // Released after State 2 completed - planets start entering orbit
        planetEntryReadyRef.current = false;
        setState(3);
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      clearState2Timers();
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [clearState2Timers, dispatchState2SubstateEvent]);

  // Auto-return from state 4 to state 1
  useEffect(() => {
    if (state === 4) {
      const t = setTimeout(() => setState(1), 2500);
      return () => clearTimeout(t);
    }
  }, [state]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black select-none">
      <div className="video-background">
        <VideoBackground isActive={state === 0} onTransition={handleVideoTransition} />
      </div>
      <div className="particle-canvas-container">
        <ParticleCanvas 
          state={state} 
          config={config} 
          cameraPanRef={cameraPanRef}
        />
      </div>
      <StateText state={state} />
      <div className="control-panel">
        <ControlPanel state={state} setState={setState} config={config} setConfig={setConfig} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
