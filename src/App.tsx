import { useState, useRef, useEffect, useCallback } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { StateText, type TextSceneState } from './components/StateText';
import { Footer } from './components/Footer';
import { VideoBackground } from './components/VideoBackground';
import { FinalVideoOverlay } from './components/FinalVideoOverlay';
import './App.css';
import { DEFAULT_CONFIG, type AppState } from '@/types';
import {
  STATE2_ABSORPTION_DURATION,
  STATE2_STABILIZE_DURATION,
  STATE2_DURATION,
} from '@/lib/particles/constants';

const FINAL_VIDEO_DELAY_MS = 7600;

function App() {
  const [state, setState] = useState<AppState>(0);
  const [textState, setTextState] = useState<TextSceneState>(0);
  const [showFinalVideo, setShowFinalVideo] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [autoZoom, setAutoZoom] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  
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
    setTextState(1);
    setShowFinalVideo(false);
  }, []);

  // Explicitly preload critical video assets before starting the experience
  useEffect(() => {
    const sources = ['/idle_brain.webm', '/brain_zoom.webm', '/zoom-compiled-edit-latest-web.webm'];
    const videos: HTMLVideoElement[] = [];
    let fontsReady = false;

    const updateProgress = () => {
      let total = 0;
      videos.forEach((v) => {
        if (v.readyState >= 4) {
          total += 1;
        } else if (v.duration && v.buffered.length > 0) {
          const buffered = v.buffered.end(v.buffered.length - 1);
          total += Math.min(1, buffered / v.duration);
        }
      });
      total += fontsReady ? 1 : 0;
      const pct = Math.min(100, Math.round((total / (sources.length + 1)) * 100));
      setLoadProgress(pct);
    };

    const interval = setInterval(updateProgress, 100);

    const promises = sources.map((src) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;
      video.playsInline = true;
      video.src = src;
      videos.push(video);
      return new Promise<void>((resolve) => {
        const cleanup = () => {
          video.removeEventListener('canplaythrough', onReady);
          video.removeEventListener('error', onReady);
        };
        const onReady = () => {
          cleanup();
          resolve();
        };
        video.addEventListener('canplaythrough', onReady);
        video.addEventListener('error', onReady);
        if (video.readyState >= 4) {
          onReady();
        }
      });
    });

    promises.push(
      document.fonts.ready.then(() => {
        fontsReady = true;
      })
    );

    Promise.all(promises).then(() => {
      clearInterval(interval);
      setLoadProgress(100);
      setAssetsLoaded(true);
    });

    return () => clearInterval(interval);
  }, []);

  // Auto-play text after assets load, then auto-transition to starfield
  useEffect(() => {
    if (!assetsLoaded) return;
    const timer = setTimeout(() => {
      setAutoZoom(true);
      setState(1);
      setTextState(1);
      setShowFinalVideo(false);
    }, 3800);
    return () => clearTimeout(timer);
  }, [assetsLoaded]);

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
      if (inState2Ref.current || planetEntryReadyRef.current || holdTimerRef.current) return;
      
      // Start charging (hold to charge shell) - 7000ms for 3 substages
      stateRef.current = 2;
      setState(2);
      setTextState('2.1');
      setShowFinalVideo(false);
      inState2Ref.current = true;

      dispatchState2SubstateEvent(1, 0, STATE2_ABSORPTION_DURATION);
      const substate3Start = STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION;
      substateTimersRef.current.push(
        setTimeout(() => {
          setTextState('2.2');
          dispatchState2SubstateEvent(
            2,
            STATE2_ABSORPTION_DURATION,
            STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION
          );
        }, STATE2_ABSORPTION_DURATION)
      );
      substateTimersRef.current.push(
        setTimeout(() => {
          setTextState('2.3');
          dispatchState2SubstateEvent(
            3,
            substate3Start,
            STATE2_DURATION
          );
        }, substate3Start)
      );

      holdTimerRef.current = setTimeout(() => {
        // State 2 complete - ready for planet entry on mouse release
        inState2Ref.current = false;
        planetEntryReadyRef.current = true;
        holdTimerRef.current = null;
      }, STATE2_DURATION);
    };

    const handleMouseUp = () => {
      if (inState2Ref.current) {
        // Released early during State 2 - go to collapse
        clearState2Timers();
        inState2Ref.current = false;
        setState(4);
        setTextState(5);
        setShowFinalVideo(false);
      } else if (planetEntryReadyRef.current) {
        // Released after State 2 completed - planets start entering orbit
        planetEntryReadyRef.current = false;
        window.dispatchEvent(
          new CustomEvent('particle:state3-release-trigger', {
            detail: { releasedAtMs: performance.now() },
          })
        );
        setState(3);
        setTextState(4);
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
      const t = setTimeout(() => {
        setState(1);
        setTextState(1);
        setShowFinalVideo(false);
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [state]);

  useEffect(() => {
    if (textState !== 4) return;

    const timerId = setTimeout(() => {
      setShowFinalVideo(true);
    }, FINAL_VIDEO_DELAY_MS);

    return () => clearTimeout(timerId);
  }, [textState]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black select-none">
      <div className="video-background">
        <VideoBackground 
          isActive={state === 0} 
          onTransition={handleVideoTransition}
          autoTrigger={autoZoom}
          loadProgress={loadProgress}
        />
      </div>
      <div className="particle-canvas-container">
        <ParticleCanvas 
          state={state} 
          config={DEFAULT_CONFIG}
          cameraPanRef={cameraPanRef}
        />
      </div>
      {assetsLoaded && <StateText state={textState} />}
      <FinalVideoOverlay isActive={showFinalVideo} />
      <Footer />
    </div>
  );
}

export default App;
