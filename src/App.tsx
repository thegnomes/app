import { useState, useRef, useEffect, useCallback } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { preloadVideo, preloadFont } from '@/lib/safeMediaPreload';
import { warmMyWorkCriticalAssets } from '@/lib/preloadMyWorkAssets';
import type { PreloadResult } from '@/lib/safeMediaPreload';
import { StateText, type TextSceneState } from './components/StateText';
import { Footer } from './components/Footer';
import { VideoBackground } from './components/VideoBackground';
import { FinalVideoOverlay } from './components/FinalVideoOverlay';
import { DisclaimerDialog } from './components/DisclaimerDialog';
import './App.css';
import { DEFAULT_CONFIG, type AppState } from '@/types';
import { resolveAssetUrl } from '@/lib/assets';
import { getAlphaVideoSources } from '@/lib/alphaVideoSources';
import {
  STATE2_ABSORPTION_DURATION,
  STATE2_STABILIZE_DURATION,
  STATE2_DURATION,
} from '@/lib/particles/constants';

const FINAL_VIDEO_DELAY_MS = 1800;
const SPARK_TO_FORMATION_DELAY_MS = 420;
const POST_DISCLAIMER_INPUT_LOCK_MS = 1400;
const AUTO_ZOOM_DELAY_MS = 12000;

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
  const [introInputLockedUntil, setIntroInputLockedUntil] = useState(0);
  const showDisclaimerRef = useRef(true);
  useEffect(() => {
    showDisclaimerRef.current = showDisclaimer;
  }, [showDisclaimer]);
  const redirectedRef = useRef(false);
  const textSequenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finalVideoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdIntentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activePointerIdRef = useRef<number>(-1);
  // Use refs to track current state to avoid closure issues
  const stateRef = useRef<AppState>(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // State transition refs
  const substateTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const inState2Ref = useRef(false);
  const pointerDownRef = useRef(false);
  const state2StartTimeRef = useRef<number>(0);

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

  const myWorkWarmupRef = useRef<Promise<void> | null>(null);

  const redirectToScene02 = useCallback(() => {
    if (redirectedRef.current) return;
    redirectedRef.current = true;

    const warmup = myWorkWarmupRef.current ?? warmMyWorkCriticalAssets();
    const timeout = new Promise<void>((resolve) => window.setTimeout(resolve, 1200));

    void Promise.race([warmup, timeout]).then(() => {
      window.location.href = '/mywork.html';
    });
  }, []);

  const handleSkipToScene02 = useCallback(() => {
    setShowDisclaimer(false);
    redirectToScene02();
  }, [redirectToScene02]);

  const handleFullExperience = useCallback(() => {
    setIntroInputLockedUntil(Date.now() + POST_DISCLAIMER_INPUT_LOCK_MS);
    setShowDisclaimer(false);
  }, []);

  const handleFinalVideoEnded = useCallback(() => {
    redirectToScene02();
  }, [redirectToScene02]);

  const handleAstronautPhase = useCallback(() => {
    if (astronautTextTriggeredRef.current) return;
    astronautTextTriggeredRef.current = true;
    setTextState(6);
  }, []);

  useEffect(() => {
    const existing = document.head.querySelector('link[data-mywork-prefetch="true"]');
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'document';
    link.href = '/mywork.html';
    link.dataset.myworkPrefetch = 'true';
    document.head.appendChild(link);

    return () => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, []);

  // Preload critical first-screen assets (main videos + fonts).
  // Scene02 assets are loaded non-blockingly in the background.
  useEffect(() => {
    const criticalVideoSources = [
      resolveAssetUrl('/idle_brain.webm'),
      resolveAssetUrl('/brain_zoom.webm'),
      resolveAssetUrl('/zoom-compiled-edit-latest-web.webm'),
    ];
    const scene02ImageSources = [resolveAssetUrl('/scene02/nebula_space_only2x.png')];
    const scene02VideoSources = getAlphaVideoSources(
      '/scene02/looking-astro-loop2.webm',
      '/scene02/looking-astro-loop2.mov'
    ).map((source) => source.src);

    const images: HTMLImageElement[] = [];
    let loadedImages = 0;
    let fontsReady = false;
    const videoResults = new Map<string, PreloadResult>();
    // Critical assets: main videos + images + fonts
    const criticalTotal = criticalVideoSources.length + scene02ImageSources.length + 1;

    const updateProgress = () => {
      let total = 0;
      criticalVideoSources.forEach((src) => {
        const r = videoResults.get(src);
        if (r?.success) {
          total += 1;
        } else if (r && r.readyState >= 1) {
          total += 0.5;
        }
      });
      total += loadedImages;
      total += fontsReady ? 1 : 0;
      const pct = Math.min(100, Math.round((total / criticalTotal) * 100));
      setLoadProgress(pct);
    };

    const interval = setInterval(updateProgress, 100);

    const criticalVideoPromises = criticalVideoSources.map((src) =>
      preloadVideo(src, { timeoutMs: 5000, preload: 'metadata' }).then((res) => {
        videoResults.set(src, res);
        return res;
      })
    );

    const imagePromises = scene02ImageSources.map((src) => {
      const image = new Image();
      image.decoding = 'async';
      images.push(image);
      return new Promise<void>((resolve) => {
        const onReady = async () => {
          image.onload = null;
          image.onerror = null;
          try {
            if ('decode' in image) {
              await image.decode();
            }
          } catch {
            // Ignore decode failures and continue.
          }
          loadedImages += 1;
          resolve();
        };

        image.onload = () => {
          void onReady();
        };
        image.onerror = () => {
          loadedImages += 1;
          resolve();
        };
        image.src = src;
      });
    });

    const promises = [...criticalVideoPromises, ...imagePromises];

    promises.push(
      preloadFont(3000).then((ok) => {
        fontsReady = ok;
      })
    );

    Promise.all(promises).then(() => {
      clearInterval(interval);
      setLoadProgress(100);
      setAssetsLoaded(true);
    });

    // Non-blocking background preload for Scene02 videos
    scene02VideoSources.forEach((src) => {
      preloadVideo(src, { timeoutMs: 8000, preload: 'metadata' }).catch(() => {});
    });

    return () => {
      clearInterval(interval);
      images.forEach((image) => {
        image.onload = null;
        image.onerror = null;
        image.src = '';
      });
    };
  }, []);

  // Keep the opening calm after the disclaimer closes. If the user does not
  // begin the experience manually, advance after a long idle period.
  useEffect(() => {
    if (!assetsLoaded) return;
    if (showDisclaimer) return;
    autoZoomTimerRef.current = setTimeout(() => {
      autoZoomTimerRef.current = null;
      if (stateRef.current !== 0) return;
      setAutoZoom(true);
      setShowFinalVideo(false);
    }, AUTO_ZOOM_DELAY_MS);
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
      if (target.closest('a, button, [role="button"]')) return;

      // Only work in State 1
      if (stateRef.current !== 1) return;
      if (inState2Ref.current) return;

      activePointerIdRef.current = e.pointerId;

      // Cancel any active pan drag
      panStateRef.current.isDragging = false;
      cameraPanRef.current.isDragging = false;

      // Cancel lingering timers
      if (textSequenceTimerRef.current) {
        clearTimeout(textSequenceTimerRef.current);
        textSequenceTimerRef.current = null;
      }

      setTextState(8);

      // One continuous press: spark appears first, then formation begins if held.
      pointerDownRef.current = true;
      holdIntentTimerRef.current = window.setTimeout(() => {
        holdIntentTimerRef.current = null;
        commitToState2();
      }, SPARK_TO_FORMATION_DELAY_MS);
    };

    const commitToState2 = () => {
      if (inState2Ref.current) return;
      if (stateRef.current !== 1) return;

      stateRef.current = 2;
      setState(2);
      setTextState('2');
      setShowFinalVideo(false);
      inState2Ref.current = true;
      state2StartTimeRef.current = performance.now();

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
          dispatchState2SubstateEvent(3, substate3Start, STATE2_DURATION);
        }, substate3Start)
      );
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerId !== activePointerIdRef.current) return;
      activePointerIdRef.current = -1;

      // If hold-intent timer is pending and State 2 hasn't started, cancel it
      if (holdIntentTimerRef.current && !inState2Ref.current) {
        clearTimeout(holdIntentTimerRef.current);
        holdIntentTimerRef.current = null;
        pointerDownRef.current = false;
        return;
      }

      pointerDownRef.current = false;

      if (inState2Ref.current) {
        clearState2Timers();
        inState2Ref.current = false;

        // Determine if we are in substate 3 based on elapsed time
        const state2Elapsed = performance.now() - state2StartTimeRef.current;
        const substate3Start = STATE2_ABSORPTION_DURATION + STATE2_STABILIZE_DURATION;
        const inSubstate3 = state2Elapsed >= substate3Start;

        if (inSubstate3) {
          // Released during substate 3 — success
          stateRef.current = 3;
          setState(3);
          setTextState(3);
          setShowFinalVideo(false);
        } else {
          // Released before substate 3 — fail / collapse
          stateRef.current = 4;
          setState(4);
          setTextState(5);
          setShowFinalVideo(false);
        }
        return;
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      clearState2Timers();

      if (textSequenceTimerRef.current) {
        clearTimeout(textSequenceTimerRef.current);
        textSequenceTimerRef.current = null;
      }

      if (finalVideoTimerRef.current) {
        clearTimeout(finalVideoTimerRef.current);
        finalVideoTimerRef.current = null;
      }

      if (holdIntentTimerRef.current) {
        clearTimeout(holdIntentTimerRef.current);
        holdIntentTimerRef.current = null;
      }

      pointerDownRef.current = false;
      activePointerIdRef.current = -1;

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
  // State 3 (payoff) -> [2000ms delay] -> State 7 (resolution) -> [2000ms] -> State 6 (reveal)
  useEffect(() => {
    if (textState !== 3 && textState !== 7) return;
    if (textSequenceTimerRef.current) return;

    const delay = textState === 3 ? 2000 : 2000;
    const timerId = setTimeout(() => {
      textSequenceTimerRef.current = null;
      setTextState((prev) => {
        if (prev === 3) return 7;
        if (prev === 7) return 6;
        return prev;
      });
    }, delay);

    textSequenceTimerRef.current = timerId;
    return () => {
      clearTimeout(timerId);
      textSequenceTimerRef.current = null;
    };
  }, [textState]);

  // Begin warming mywork assets as soon as the successful path reaches textState 7
  useEffect(() => {
    if (textState !== 7) return;
    myWorkWarmupRef.current = warmMyWorkCriticalAssets();
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
    <div className="relative h-[100dvh] min-h-[100svh] w-full overflow-hidden bg-black select-none">
      <div>
        <VideoBackground
          isActive={state === 0}
          onTransition={handleVideoTransition}
          autoTrigger={autoZoom}
          inputLockedUntil={introInputLockedUntil}
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
        onClose={handleFullExperience}
        onSkip={handleSkipToScene02}
        loadProgress={loadProgress}
        assetsLoaded={assetsLoaded}
      />
      <Footer />

      {/* Persistent View Work CTA — visible after disclaimer closes */}
      {assetsLoaded && !showDisclaimer && !showFinalVideo && (
        <div className="pointer-events-none fixed top-3 right-3 z-50 sm:top-4 sm:right-4">
          <a
            href="/mywork.html"
            className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest text-white/80 backdrop-blur-md transition-all hover:border-white/25 hover:bg-black/60 hover:text-white sm:px-4 sm:py-2 sm:text-[11px] sm:gap-2"
          >
            View Work
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
