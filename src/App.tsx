import { useState, useRef, useEffect, useCallback } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { ControlPanel } from './components/ControlPanel';
import { StateText } from './components/StateText';
import { Footer } from './components/Footer';
import { VideoBackground } from './components/VideoBackground';
import './App.css';

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
  
  // State transition refs
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inState2Ref = useRef(false);
  
  // Camera pan state - consolidated into a single ref to avoid closure issues
  const panStateRef = useRef({
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    cameraOffset: { x: 0, y: 0 },
    targetOffset: { x: 0, y: 0 },
    enabled: true,
  });

  // Expose camera pan controls to ParticleCanvas via ref
  const cameraPanRef = useRef({
    isDragging: false,
    offset: { x: 0, y: 0 },
    targetOffset: { x: 0, y: 0 },
  });

  // Single unified mouse handler
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      
      // Don't handle if clicking on control panel
      if ((e.target as HTMLElement).closest('.fixed')) return;
      
      const panState = panStateRef.current;
      
      // State 1: Start charging (hold to charge shell)
      if (state === 1 && panState.enabled) {
        panState.enabled = false; // Disable pan during state transition
        setState(2);
        inState2Ref.current = true;
        holdTimerRef.current = setTimeout(() => {
          inState2Ref.current = false;
          setState(3);
        }, 5000);
      }
      
      // Start camera pan drag (only if enabled and in appropriate states)
      if (panState.enabled && state >= 1) {
        panState.isDragging = true;
        panState.dragStart = { x: e.clientX, y: e.clientY };
        cameraPanRef.current.isDragging = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const panState = panStateRef.current;
      if (!panState.isDragging) return;
      
      const dx = (e.clientX - panState.dragStart.x) * 0.05;
      const dy = (e.clientY - panState.dragStart.y) * 0.05;
      
      panState.targetOffset = {
        x: panState.cameraOffset.x + dx,
        y: panState.cameraOffset.y - dy
      };
      
      // Clamp values
      panState.targetOffset.x = Math.max(-50, Math.min(50, panState.targetOffset.x));
      panState.targetOffset.y = Math.max(-50, Math.min(50, panState.targetOffset.y));
      
      cameraPanRef.current.targetOffset = panState.targetOffset;
    };

    const handleMouseUp = () => {
      const panState = panStateRef.current;
      
      // Handle state transition release
      if (inState2Ref.current) {
        if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
        inState2Ref.current = false;
        setState(4);
      }
      
      // Handle camera pan end
      if (panState.isDragging) {
        panState.cameraOffset = { ...panState.targetOffset };
        cameraPanRef.current.offset = panState.cameraOffset;
      }
      
      panState.isDragging = false;
      panState.enabled = true; // Re-enable pan
      cameraPanRef.current.isDragging = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [state]);

  // Touch handlers
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      
      if ((e.target as HTMLElement).closest('.fixed')) return;
      
      const touch = e.touches[0];
      const panState = panStateRef.current;
      
      if (state === 1 && panState.enabled) {
        panState.enabled = false;
        setState(2);
        inState2Ref.current = true;
        holdTimerRef.current = setTimeout(() => {
          inState2Ref.current = false;
          setState(3);
        }, 5000);
      }
    };

    const handleTouchEnd = () => {
      const panState = panStateRef.current;
      
      if (inState2Ref.current) {
        if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
        inState2Ref.current = false;
        setState(4);
      }
      
      panState.enabled = true;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [state]);

  // Auto-return from state 4 to state 1
  useEffect(() => {
    if (state === 4) {
      const t = setTimeout(() => setState(1), 2500);
      return () => clearTimeout(t);
    }
  }, [state]);

  const handleVideoTransition = useCallback(() => {
    setState(1);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black select-none">
      <VideoBackground isActive={state === 0} onTransition={handleVideoTransition} />
      <ParticleCanvas state={state} config={config} cameraPanRef={cameraPanRef} />
      <StateText state={state} />
      <ControlPanel state={state} setState={setState} config={config} setConfig={setConfig} />
      <Footer />
    </div>
  );
}

export default App;
