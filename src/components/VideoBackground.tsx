import { useState, useRef, useEffect, useCallback } from 'react';
import { isSafari } from '@/lib/isSafari';
import { resolveAssetUrl } from '@/lib/assets';

interface VideoBackgroundProps {
  isActive: boolean;
  onTransition: () => void;
  autoTrigger?: boolean;
  inputLockedUntil?: number;
}

const TRANSITION_TIME = 0;
const FADE_DURATION_MS = 800;
const ZOOM_HANDOFF_FALLBACK_DELAY_MS = 1200;
const PLAY_FAILURE_FADE_DELAY_MS = 2400;

export function VideoBackground({
  isActive,
  onTransition,
  autoTrigger,
  inputLockedUntil = 0,
}: VideoBackgroundProps) {
  const [isZooming, setIsZooming] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const zoomVideoRef = useRef<HTMLVideoElement>(null);
  const hasTransitionedRef = useRef(false);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const zoomHandoffTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playFailureFadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearZoomHandoffTimer = useCallback(() => {
    if (zoomHandoffTimerRef.current) {
      clearTimeout(zoomHandoffTimerRef.current);
      zoomHandoffTimerRef.current = null;
    }
  }, []);

  const clearPlaybackFallbackTimers = useCallback(() => {
    clearZoomHandoffTimer();
    if (playFailureFadeTimerRef.current) {
      clearTimeout(playFailureFadeTimerRef.current);
      playFailureFadeTimerRef.current = null;
    }
  }, [clearZoomHandoffTimer]);

  const transitionOnce = useCallback(() => {
    if (hasTransitionedRef.current) return;
    hasTransitionedRef.current = true;
    clearZoomHandoffTimer();
    onTransition();
  }, [clearZoomHandoffTimer, onTransition]);

  const startFadeOut = useCallback(() => {
    if (fadeTimerRef.current) return;
    clearPlaybackFallbackTimers();
    setIsFadingOut(true);
    fadeTimerRef.current = window.setTimeout(() => {
      fadeTimerRef.current = null;
      setIsVisible(false);
      setIsZooming(false);
      setIsFadingOut(false);
    }, FADE_DURATION_MS);
  }, [clearPlaybackFallbackTimers]);

  const scheduleZoomHandoffFallback = useCallback(() => {
    if (hasTransitionedRef.current || zoomHandoffTimerRef.current) return;
    zoomHandoffTimerRef.current = window.setTimeout(() => {
      zoomHandoffTimerRef.current = null;
      transitionOnce();
    }, ZOOM_HANDOFF_FALLBACK_DELAY_MS);
  }, [transitionOnce]);

  const handleZoomPlaybackFailure = useCallback(() => {
    if (playFailureFadeTimerRef.current) return;
    playFailureFadeTimerRef.current = window.setTimeout(() => {
      playFailureFadeTimerRef.current = null;
      startFadeOut();
    }, PLAY_FAILURE_FADE_DELAY_MS);
  }, [startFadeOut]);

  const playZoomVideo = useCallback(() => {
    scheduleZoomHandoffFallback();
    const playPromise = zoomVideoRef.current?.play();
    if (!playPromise) {
      handleZoomPlaybackFailure();
      return;
    }
    void playPromise.catch(handleZoomPlaybackFailure);
  }, [handleZoomPlaybackFailure, scheduleZoomHandoffFallback]);

  useEffect(() => {
    if (isActive) {
      hasTransitionedRef.current = false;
      requestAnimationFrame(() => {
        setIsFadingOut(false);
        setIsVisible(true);
      });
    }
  }, [isActive]);

  useEffect(() => {
    if (autoTrigger && !isZooming) {
      requestAnimationFrame(() => {
        setIsZooming(true);
        setIsFadingOut(false);
        playZoomVideo();
      });
    }
  }, [autoTrigger, isZooming, playZoomVideo]);

  const handleTimeUpdate = () => {
    const video = zoomVideoRef.current;
    if (!video) return;
    
    // Transition at specified mark - trigger starfield but DON'T fade video
    // Video has alpha transparency so it overlays on top of starfield
    if (video.currentTime >= TRANSITION_TIME) {
      // Trigger transition to starfield (starts rendering underneath)
      transitionOnce();
      // Note: Video keeps playing with alpha, no fade out
    }
  };

  const handleZoomEnded = () => {
    // Video ended naturally, now fade it out
    startFadeOut();
  };

  useEffect(() => {
    const video = zoomVideoRef.current;
    return () => {
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
      clearPlaybackFallbackTimers();
      video?.pause();
    };
  }, [clearPlaybackFallbackTimers]);

  const handleClick = () => {
    if (Date.now() < inputLockedUntil) return;
    if (!isZooming && isActive) {
      setIsZooming(true);
      setIsFadingOut(false);
      playZoomVideo();
    }
  };

  // Keep mounted while zoom video is playing/fading, even after parent switches to state 1
  if (!isActive && !isVisible && !isZooming) return null;

  return (
    <div
      className="video-background fixed inset-0 z-10 cursor-pointer flex items-center justify-center overflow-hidden"
      onClick={handleClick}
      style={{
        opacity: isFadingOut ? 0 : 1,
        transition: isFadingOut ? 'opacity 0.8s ease-out' : 'none',
        pointerEvents: isFadingOut ? 'none' : 'auto',
      }}
    >
      {/* Idle brain video - slow rotation */}
      {!isZooming && (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={`w-full h-full object-contain ${isSafari ? 'mix-blend-screen' : ''}`}
            onLoadedData={(e) => {
              void (e.currentTarget as HTMLVideoElement).play().catch(() => {});
            }}
          >
            <source src={resolveAssetUrl('/idle_brain.webm')} type="video/webm" />
            <source src={resolveAssetUrl('/idle_brain.mp4')} type="video/mp4" />
          </video>
        </>
      )}

      {/* Zoom transition video - plays full with alpha, fades at end */}
      <video
        ref={zoomVideoRef}
        muted
        playsInline
        preload="metadata"
        className={`
          absolute inset-0 w-full h-full object-cover
          ${isZooming ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        style={{
          transition: 'opacity 0.3s ease-out',
          ...(isSafari ? { mixBlendMode: 'screen', filter: 'brightness(1)' } : {}),
        }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleZoomEnded}
      >
        <source src={resolveAssetUrl('/brain_zoom.webm')} type="video/webm" />
        <source src={resolveAssetUrl('/brain_zoom.mp4')} type="video/mp4" />
      </video>
    </div>
  );
}
