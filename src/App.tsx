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
  
  // Original state transition refs
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inState2Ref = useRef(false);
  
  // Camera pan state
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const cameraOffsetRef = useRef({ x: 0, y: 0 });
  const targetOffsetRef = useRef({ x: 0, y: 0 });
  const panEnabledRef = useRef(true);

  // Expose camera pan controls to ParticleCanvas via ref
  const cameraPanRef = useRef({
    isDragging: false,
    offset: { x: 0, y: 0 },
    targetOffset: { x: 0, y: 0 },
  });

  // Update camera pan ref
  useEffect(() => {
    cameraPanRef.current.offset = cameraOffsetRef.current;
    cameraPanRef.current.targetOffset = targetOffsetRef.current;
    cameraPanRef.current.isDragging = isDraggingRef.current;
  }, []);

  // Original state transition logic (hold to charge)
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      if ('button' in e && e.button !== 0) return;
      if ('touches' in e) e.preventDefault();
      
      // Don't trigger state changes if clicking on control panel
      if ((e.target as HTMLElement).closest('.fixed')) return;
      
      // State 0 is handled by VideoBackground click
      if (state === 1) {
        // Disable camera pan during state transition hold
        panEnabledRef.current = false;
        setState(2);
        inState2Ref.current = true;
        holdTimerRef.current = setTimeout(() => {
          inState2Ref.current = false;
          setState(3);
        }, 5000);
      }
    };

    const handleMouseUp = () => {
      if (inState2Ref.current) {
        if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
        inState2Ref.current = false;
        setState(4);
      }
      // Re-enable camera pan
      panEnabledRef.current = true;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleMouseDown, { passive: false });
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleMouseDown);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [state]);

  useEffect(() => {
    if (state === 4) {
      const t = setTimeout(() => setState(1), 2500);
      return () => clearTimeout(t);
    }
  }, [state]);

  // Mouse event handlers for camera pan (only when enabled)
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      // Don't pan if clicking on control panel or if pan is disabled
      if ((e.target as HTMLElement).closest('.fixed')) return;
      if (!panEnabledRef.current) return;
      
      isDraggingRef.current = true;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      cameraPanRef.current.isDragging = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !panEnabledRef.current) return;
      
      const dx = (e.clientX - dragStartRef.current.x) * 0.05;
      const dy = (e.clientY - dragStartRef.current.y) * 0.05;
      
      targetOffsetRef.current = {
        x: cameraOffsetRef.current.x + dx,
        y: cameraOffsetRef.current.y - dy // Invert Y for natural feel
      };
      
      // Clamp values
      targetOffsetRef.current.x = Math.max(-50, Math.min(50, targetOffsetRef.current.x));
      targetOffsetRef.current.y = Math.max(-50, Math.min(50, targetOffsetRef.current.y));
      
      cameraPanRef.current.targetOffset = targetOffsetRef.current;
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        cameraOffsetRef.current = { ...targetOffsetRef.current };
        cameraPanRef.current.offset = cameraOffsetRef.current;
      }
      isDraggingRef.current = false;
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
  }, []);

  const handleVideoTransition = useCallback(() => {
    // Go to State 1 (starfield) after video zoom
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
