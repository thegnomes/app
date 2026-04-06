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
  
  // Camera pan state
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const cameraOffsetRef = useRef({ x: 0, y: 0 });
  const targetOffsetRef = useRef({ x: 0, y: 0 });

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

  // Mouse event handlers for camera pan
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      // Don't pan if clicking on control panel
      if ((e.target as HTMLElement).closest('.fixed')) return;
      
      isDraggingRef.current = true;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      cameraPanRef.current.isDragging = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      
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
