import { useState, useRef, useEffect, useCallback } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { StateText, type TextSceneState } from './components/StateText';
import { Footer } from './components/Footer';
import { VideoBackground } from './components/VideoBackground';
import { FinalVideoOverlay } from './components/FinalVideoOverlay';
import { AstronautTextOverlay } from './components/AstronautTextOverlay';
import { DisclaimerDialog } from './components/DisclaimerDialog';
import './App.css';
import { DEFAULT_CONFIG, type AppState } from '@/types';
import { resolveAssetUrl } from '@/lib/assets';
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
  const autoZoomTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showAstronautText, setShowAstronautText] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const showDisclaimerRef = useRef(true);
  useEffect(() => {
    showDisclaimerRef.current = showDisclaimer;
  }, [showDisclaimer]);
  const redirectedRef = useRef(false);
  const textSequenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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
    if (showDisclaimerRef.current) return; // block until disclaimer is dismissed
    if (autoZoomTimerRef.current) {
      clearTimeout(autoZoomTimerRef.current);
      autoZoomTimerRef.current = null;
    }
    setAutoZoom(false);
    setState(1);
    setTextState(1);
    setShowFinalVideo(false);

  }, []);

  const redirectToScene02 = useCallback(() => {
    if (redirectedRef.current) return;
    redirectedRef.current = true;
    window.location.href = '/scene02.html';
  }, []);

  const handleSkipToScene02 = useCallback(() => {
    setShowDisclaimer(false);
    redirectToScene02();
  }, [redirectToScene02]);

  const handleFinalVideoEnded = useCallback(() => {
    setShowFinalVideo(false);
    redirectToScene02();
  }, [redirectToScene02]);

  const handleAstronautPhase = useCallback(() => {
    setShowAstronautText(true);
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

  // Preload scene02 assets in background so no preloader is needed on transition
  useEffect(() => {
    if (!assetsLoaded) return;
    const scene02Assets = [
      '/scene02/nebula_space_only2x.png',
      '/scene02/looking-astro-loop2.webm',
      '/scene02/looking-astro-loop2.mov',
      '/webm/toto-ga2.webm',
      '/webm/toto-ga2.mov',
      '/webm/nft11-ga2.webm',
      '/webm/nft11-ga2.mov',
      '/webm/oxytap-ga2.webm',
      '/webm/oxytap-ga2.mov',
      '/webm/target-lock.webm',
      '/webm/target-lock.mov',
    ];
    scene02Assets.forEach((src) => {
      const url = resolveAssetUrl(src);
      const isVideo = /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url);
      if (isVideo) {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.muted = true;
        video.playsInline = true;
        video.src = url;
        video.load();
      } else {
        const img = new Image();
        img.src = url;
      }
    });
  }, [assetsLoaded]);

  // Auto-play text after assets load and disclaimer is dismissed, then auto-transition to starfield
  useEffect(() => {
    if (!assetsLoaded) return;
    if (showDisclaimer) return;
    autoZoomTimerRef.current = setTimeout(() => {
      autoZoomTimerRef.current = null;
      if (stateRef.current !== 0) return; // user already transitioned manually
      setAutoZoom(true);
      setState(1);
      setTextState(1);
      setShowFinalVideo(false);
    }, 3800);
    return () => {
      if (autoZoomTimerRef.current) {
        clearTimeout(autoZoomTimerRef.current);
        autoZoomTimerRef.current = null;
      }
    };
  }, [assetsLoaded, showDisclaimer]);

  // Separate pointer handler for canvas pan (works with mouse + touch)
  useEffect(() => {
    const canvas = document.querySelector('.particle-canvas-container');
    if (!canvas) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (stateRef.current !== 1) return; // Only pan in State 1

      (canvas as HTMLElement).setPointerCapture?.(e.pointerId);
      panStateRef.current.isDragging = true;
      panStateRef.current.dragStart = { x: e.clientX, y: e.clientY };
      cameraPanRef.current.isDragging = true;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!panStateRef.current.isDragging) return;

      const dx = (e.clientX - panStateRef.current.dragStart.x) * 0.12;
      const dy = (e.clientY - panStateRef.current.dragStart.y) * 0.12;

      panStateRef.current.targetOffset = {
        x: panStateRef.current.cameraOffset.x + dx,
        y: panStateRef.current.cameraOffset.y - dy,
      };

      panStateRef.current.targetOffset.x = Math.max(-80, Math.min(80, panStateRef.current.targetOffset.x));
      panStateRef.current.targetOffset.y = Math.max(-80, Math.min(80, panStateRef.current.targetOffset.y));

      cameraPanRef.current.targetOffset = panStateRef.current.targetOffset;
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (panStateRef.current.isDragging) {
        panStateRef.current.cameraOffset = { ...panStateRef.current.targetOffset };
        cameraPanRef.current.offset = panStateRef.current.cameraOffset;
        try {
          (canvas as HTMLElement).releasePointerCapture?.(e.pointerId);
        } catch {
          // ignore if capture was not set
        }
      }
      panStateRef.current.isDragging = false;
      cameraPanRef.current.isDragging = false;
    };

    const handlePointerCancel = (e: PointerEvent) => {
      handlePointerUp(e);
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerCancel);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerCancel);
    };
  }, []);

  // Global pointer handler for state transitions (works with mouse + touch)
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;

      // Only handle clicks on the particle canvas, not on UI
      const target = e.target as HTMLElement;
      if (target.closest('.control-panel')) return;
      if (target.closest('.video-background')) return;

      // Only work in State 1
      if (stateRef.current !== 1) return;
      if (inState2Ref.current || planetEntryReadyRef.current || holdTimerRef.current) return;

      // Cancel any active pan drag before transitioning to State 2
      panStateRef.current.isDragging = false;
      cameraPanRef.current.isDragging = false;

      // Cancel any lingering text sequence timers
      if (textSequenceTimerRef.current) {
        clearTimeout(textSequenceTimerRef.current);
        textSequenceTimerRef.current = null;
      }

      // Start charging (hold to charge shell) - 7000ms for 3 substages
      stateRef.current = 2;
      setState(2);
      setTextState(8); // spark beat
      setShowFinalVideo(false);
      inState2Ref.current = true;

      // Transition from spark to State 2 marker text after brief beat
      substateTimersRef.current.push(
        setTimeout(() => {
          if (stateRef.current === 2 && inState2Ref.current) {
            setTextState('2');
          }
        }, 1200)
      );

      dispatchState2SubstateEvent(1, 0, STATE2_ABSORPTION_DURATION);
      const substate3Start = STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION;
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

    const handlePointerUp = () => {
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
        setTextState(3);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      clearState2Timers();
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
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

  // Sequence through successful orbit text beats: 3.1 -> 3.2 -> ignition
  useEffect(() => {
    if (textState !== 3 && textState !== 7) return;
    if (textSequenceTimerRef.current) return;

    const timerId = setTimeout(() => {
      textSequenceTimerRef.current = null;
      setTextState((prev) => {
        if (prev === 3) return 7;
        if (prev === 7) return 4;
        return prev;
      });
    }, 4000);

    textSequenceTimerRef.current = timerId;
    return () => {
      clearTimeout(timerId);
      textSequenceTimerRef.current = null;
    };
  }, [textState]);

  useEffect(() => {
    if (textState !== 7) return;

    // Start final video immediately when ignition text (state 7) appears
    setShowFinalVideo(true);

    // Cancel the auto text-sequence timer so state 7 text stays visible during the video
    if (textSequenceTimerRef.current) {
      clearTimeout(textSequenceTimerRef.current);
      textSequenceTimerRef.current = null;
    }
  }, [textState]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black select-none">
      <div className="video-background">
        <VideoBackground
          isActive={state === 0}
          onTransition={handleVideoTransition}
          autoTrigger={autoZoom}
        />
      </div>
      <div className="particle-canvas-container">
        <ParticleCanvas 
          state={state} 
          config={DEFAULT_CONFIG}
          cameraPanRef={cameraPanRef}
        />
      </div>
      {assetsLoaded && !showDisclaimer && <StateText state={textState} />}
      <FinalVideoOverlay isActive={showFinalVideo} onEnded={handleFinalVideoEnded} onAstronautPhase={handleAstronautPhase} />
      <AstronautTextOverlay isActive={showAstronautText} />
      <DisclaimerDialog
        open={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
        onSkip={handleSkipToScene02}
        loadProgress={loadProgress}
        assetsLoaded={assetsLoaded}
      />
      <Footer />
    </div>
  );
}

export default App;
