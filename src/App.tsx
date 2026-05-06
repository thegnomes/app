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

const FINAL_VIDEO_DELAY_MS = 2200;
const CORE_REVEAL_DURATION_MS = 2000;

function App() {
  const [state, setState] = useState<AppState>(0);
  const [textState, setTextState] = useState<TextSceneState>(0);
  const [showFinalVideo, setShowFinalVideo] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [autoZoom, setAutoZoom] = useState(false);
  const autoZoomTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const astronautTextTriggeredRef = useRef(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const showDisclaimerRef = useRef(true);
  useEffect(() => {
    showDisclaimerRef.current = showDisclaimer;
  }, [showDisclaimer]);
  const redirectedRef = useRef(false);
  const textSequenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finalVideoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Use refs to track current state to avoid closure issues
  const stateRef = useRef<AppState>(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // State transition refs
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const coreRevealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const substateTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const inState2Ref = useRef(false);
  const planetEntryReadyRef = useRef(false);
  const sparkFadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerDownRef = useRef(false);

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
    if (coreRevealTimerRef.current) {
      clearTimeout(coreRevealTimerRef.current);
      coreRevealTimerRef.current = null;
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
    if (showDisclaimerRef.current) return;
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
    if (astronautTextTriggeredRef.current) return;
    astronautTextTriggeredRef.current = true;
    setTextState(6);
  }, []);

  // Preload main app videos + scene02 videos for continuity
  useEffect(() => {
    const mainSources = ['/idle_brain.webm', '/brain_zoom.webm', '/zoom-compiled-edit-latest-web.webm'];
    const scene02Sources = [
      '/scene02/nebula_space_only2x.png',
      '/scene02/looking-astro-loop2.webm',
      '/scene02/looking-astro-loop2.mov',
    ];
    const allSources = [...mainSources, ...scene02Sources];
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
      const pct = Math.min(100, Math.round((total / (allSources.length + 1)) * 100));
      setLoadProgress(pct);
    };

    const interval = setInterval(updateProgress, 100);

    const promises = allSources.map((src) => {
      const url = resolveAssetUrl(src);
      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;
      video.playsInline = true;
      video.src = url;
      video.load();
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

  // Auto-play text after assets load and disclaimer is dismissed
  useEffect(() => {
    if (!assetsLoaded) return;
    if (showDisclaimer) return;
    autoZoomTimerRef.current = setTimeout(() => {
      autoZoomTimerRef.current = null;
      if (stateRef.current !== 0) return;
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
      if (stateRef.current !== 1) return;

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
          // ignore
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

  // Global pointer handler for state transitions
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;

      const target = e.target as HTMLElement;
      if (target.closest('.control-panel')) return;
      if (target.closest('.video-background')) return;

      // Only work in State 1
      if (stateRef.current !== 1) return;
      if (inState2Ref.current || planetEntryReadyRef.current || holdTimerRef.current) return;

      pointerDownRef.current = true;

      // Cancel any active pan drag
      panStateRef.current.isDragging = false;
      cameraPanRef.current.isDragging = false;

      // Cancel lingering timers
      if (textSequenceTimerRef.current) {
        clearTimeout(textSequenceTimerRef.current);
        textSequenceTimerRef.current = null;
      }
      if (sparkFadeTimerRef.current) {
        clearTimeout(sparkFadeTimerRef.current);
        sparkFadeTimerRef.current = null;
      }
      if (coreRevealTimerRef.current) {
        clearTimeout(coreRevealTimerRef.current);
        coreRevealTimerRef.current = null;
      }

      // NO text during core reveal — only the particle core appears
      // Dispatch core activation pulse (2000ms reveal)
      window.dispatchEvent(
        new CustomEvent('particle:core-activation-pulse', {
          detail: { startedAtMs: performance.now(), durationMs: CORE_REVEAL_DURATION_MS },
        })
      );

      // After 2000ms core reveal, determine if click-only or click-hold
      coreRevealTimerRef.current = setTimeout(() => {
        coreRevealTimerRef.current = null;

        if (pointerDownRef.current) {
          // Pointer is still held after the core reveal.
          // Commit into the actual State 2 formation sequence.
          commitToState2();
          return;
        }

        // Pointer was released during reveal — click-only spark.
        setTextState(8);
        sparkFadeTimerRef.current = setTimeout(() => {
          sparkFadeTimerRef.current = null;
          if (stateRef.current === 1) {
            setTextState(1);
          }
        }, 1500);
      }, CORE_REVEAL_DURATION_MS);
    };

    const commitToState2 = () => {
      if (inState2Ref.current) return;
      if (stateRef.current !== 1) return;

      if (sparkFadeTimerRef.current) {
        clearTimeout(sparkFadeTimerRef.current);
        sparkFadeTimerRef.current = null;
      }

      stateRef.current = 2;
      setState(2);
      setTextState('2');
      setShowFinalVideo(false);
      inState2Ref.current = true;

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
        inState2Ref.current = false;
        planetEntryReadyRef.current = true;
        holdTimerRef.current = null;
      }, STATE2_DURATION);
    };

    const handlePointerUp = () => {
      pointerDownRef.current = false;

      // If core reveal is still in progress
      if (coreRevealTimerRef.current) {
        // User released during the 2000ms core reveal
        clearTimeout(coreRevealTimerRef.current);
        coreRevealTimerRef.current = null;
        // The core reveal timeout handler will show spark text after the remaining time
        // But since pointer is up, we show spark text now
        setTextState(8);
        sparkFadeTimerRef.current = setTimeout(() => {
          sparkFadeTimerRef.current = null;
          if (stateRef.current === 1) {
            setTextState(1);
          }
        }, 1500);
        return;
      }

      if (inState2Ref.current) {
        // Released early during State 2 - go to collapse
        clearState2Timers();
        inState2Ref.current = false;
        setState(4);
        setTextState(5);
        setShowFinalVideo(false);
      } else if (planetEntryReadyRef.current) {
        // Released after State 2 completed
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

      if (sparkFadeTimerRef.current) {
        clearTimeout(sparkFadeTimerRef.current);
        sparkFadeTimerRef.current = null;
      }

      if (textSequenceTimerRef.current) {
        clearTimeout(textSequenceTimerRef.current);
        textSequenceTimerRef.current = null;
      }

      if (finalVideoTimerRef.current) {
        clearTimeout(finalVideoTimerRef.current);
        finalVideoTimerRef.current = null;
      }

      pointerDownRef.current = false;

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

  // Sequence through successful orbit text beats:
  // State 3 (payoff) -> [2000ms delay] -> State 7 (resolution) -> [2500ms] -> State 4 (fadeout)
  useEffect(() => {
    if (textState !== 3 && textState !== 7) return;
    if (textSequenceTimerRef.current) return;

    const delay = textState === 3 ? 2000 : 2500;
    const timerId = setTimeout(() => {
      textSequenceTimerRef.current = null;
      setTextState((prev) => {
        if (prev === 3) return 7;
        if (prev === 7) return 4;
        return prev;
      });
    }, delay);

    textSequenceTimerRef.current = timerId;
    return () => {
      clearTimeout(timerId);
      textSequenceTimerRef.current = null;
    };
  }, [textState]);

  useEffect(() => {
    if (textState !== 7) return;

    if (finalVideoTimerRef.current) {
      clearTimeout(finalVideoTimerRef.current);
      finalVideoTimerRef.current = null;
    }

    finalVideoTimerRef.current = setTimeout(() => {
      finalVideoTimerRef.current = null;
      setShowFinalVideo(true);
    }, FINAL_VIDEO_DELAY_MS);

    return () => {
      if (finalVideoTimerRef.current) {
        clearTimeout(finalVideoTimerRef.current);
        finalVideoTimerRef.current = null;
      }
    };
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
      {/* Astronaut text is now rendered through StateText as textState 6 */}
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
