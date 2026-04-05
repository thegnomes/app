import { useState, useRef, useEffect } from 'react';
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
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inState2Ref = useRef(false);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      if ('button' in e && e.button !== 0) return;
      if ('touches' in e) e.preventDefault();
      // State 0 is handled by VideoBackground click
      if (state === 1) {
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

  const handleVideoTransition = () => {
    // Go to State 1 (starfield) after video zoom
    setState(1);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black select-none">
      <VideoBackground isActive={state === 0} onTransition={handleVideoTransition} />
      <ParticleCanvas state={state} config={config} />
      <StateText state={state} />
      <ControlPanel state={state} config={config} setConfig={setConfig} />
      <Footer />
    </div>
  );
}

export default App;
