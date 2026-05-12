import { useState, useRef, useEffect, useCallback } from 'react';
import { isSafari } from '@/lib/isSafari';
import { resolveAssetUrl } from '@/lib/assets';

interface VideoBackgroundProps {
  isActive: boolean;
  onTransition: () => void;
  autoTrigger?: boolean;
}

// Trigger starfield immediately on click so it starts as early as possible under zoom overlay.
const TRANSITION_TIME = 0;
const FADE_DURATION_MS = 800;
const PLAY_FAILURE_VISUAL_DELAY_MS = 1200;

export function VideoBackground({ isActive, onTransition, autoTrigger }: VideoBackgroundProps) {
  const [isZooming, setIsZooming] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const zoomVideoRef = useRef<HTMLVideoElement>(null);
  const hasTransitionedRef = useRef(false);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playFailureTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPlayFailureTimer = useCallback(() => {
    if (playFailureTimerRef.current) {
      clearTimeout(playFailureTimerRef.current);
      playFailureTimerRef.current = null;
    }
  }, []);

  const transitionOnce = useCallback(() => {
    if (hasTransitionedRef.current) return;
    hasTransitionedRef.current = true;
    onTransition();
  }, [onTransition]);

  const startFadeOut = useCallback(() => {
    if (fadeTimerRef.current) return;
    clearPlayFailureTimer();
    setIsFadingOut(true);
    fadeTimerRef.current = window.setTimeout(() => {
      fadeTimerRef.current = null;
      setIsVisible(false);
      setIsZooming(false);
      setIsFadingOut(false);
    }, FADE_DURATION_MS);
  }, [clearPlayFailureTimer]);

  const handleZoomPlaybackFailure = useCallback(() => {
    transitionOnce();
    if (playFailureTimerRef.current) return;
    playFailureTimerRef.current = window.setTimeout(() => {
      playFailureTimerRef.current = null;
      startFadeOut();
    }, PLAY_FAILURE_VISUAL_DELAY_MS);
  }, [startFadeOut, transitionOnce]);

  const playZoomVideo = useCallback(() => {
    const playPromise = zoomVideoRef.current?.play();
    if (!playPromise) {
      handleZoomPlaybackFailure();
      return;
    }
    void playPromise.catch(handleZoomPlaybackFailure);
  }, [handleZoomPlaybackFailure]);

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
        transitionOnce();
        playZoomVideo();
      });
    }
  }, [autoTrigger, isZooming, playZoomVideo, transitionOnce]);

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
      clearPlayFailureTimer();
      video?.pause();
    };
  }, [clearPlayFailureTimer]);

  const handleClick = () => {
    if (!isZooming && isActive) {
      setIsZooming(true);
      setIsFadingOut(false);
      transitionOnce();
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
          >
            <source src={resolveAssetUrl('/idle_brain.webm')} type="video/webm" />
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
