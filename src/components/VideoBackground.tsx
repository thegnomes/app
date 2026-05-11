import { useState, useRef, useEffect } from 'react';
import { isSafari } from '@/lib/isSafari';
import { resolveAssetUrl } from '@/lib/assets';

interface VideoBackgroundProps {
  isActive: boolean;
  onTransition: () => void;
  autoTrigger?: boolean;
}

// Trigger starfield immediately on click so it starts as early as possible under zoom overlay.
const TRANSITION_TIME = 0;

export function VideoBackground({ isActive, onTransition, autoTrigger }: VideoBackgroundProps) {
  const [isZooming, setIsZooming] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const zoomVideoRef = useRef<HTMLVideoElement>(null);
  const hasTransitionedRef = useRef(false);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isActive) {
      requestAnimationFrame(() => setIsVisible(true));
    }
  }, [isActive]);

  useEffect(() => {
    if (autoTrigger && !isZooming) {
      requestAnimationFrame(() => {
        setIsZooming(true);
        hasTransitionedRef.current = false;
        onTransition();
        hasTransitionedRef.current = true;
        zoomVideoRef.current?.play().catch(() => {
          // Zoom video failed — still fade out and clean up
          setIsFadingOut(true);
          fadeTimerRef.current = window.setTimeout(() => {
            fadeTimerRef.current = null;
            setIsVisible(false);
            setIsZooming(false);
          }, 800);
        });
      });
    }
  }, [autoTrigger, isZooming, onTransition]);

  const handleTimeUpdate = () => {
    const video = zoomVideoRef.current;
    if (!video || hasTransitionedRef.current) return;
    
    // Transition at specified mark - trigger starfield but DON'T fade video
    // Video has alpha transparency so it overlays on top of starfield
    if (video.currentTime >= TRANSITION_TIME) {
      hasTransitionedRef.current = true;
      // Trigger transition to starfield (starts rendering underneath)
      onTransition();
      // Note: Video keeps playing with alpha, no fade out
    }
  };

  const handleZoomEnded = () => {
    // Video ended naturally, now fade it out
    setIsFadingOut(true);
    fadeTimerRef.current = window.setTimeout(() => {
      fadeTimerRef.current = null;
      setIsVisible(false);
      setIsZooming(false);
    }, 800);
  };

  useEffect(() => {
    const video = zoomVideoRef.current;
    return () => {
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
      video?.pause();
    };
  }, []);

  const handleClick = () => {
    if (!isZooming && isActive) {
      setIsZooming(true);
      zoomVideoRef.current?.play().catch(() => {
        // Zoom video failed on click — still transition
        onTransition();
      });
      onTransition();
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
