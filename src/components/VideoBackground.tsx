import { useState, useRef, useEffect } from 'react';

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

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
    }
  }, [isActive]);

  useEffect(() => {
    if (autoTrigger && !isZooming) {
      setIsZooming(true);
      hasTransitionedRef.current = false;
      onTransition();
      hasTransitionedRef.current = true;
      zoomVideoRef.current?.play();
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
    window.setTimeout(() => {
      setIsVisible(false);
      setIsZooming(false);
    }, 800);
  };

  // Keep mounted while zoom video is playing/fading, even after parent switches to state 1
  if (!isActive && !isVisible && !isZooming) return null;

  return (
    <div

      className="video-background fixed inset-0 z-10 cursor-pointer flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#000000',
        opacity: isFadingOut ? 0 : 1,
        transition: isFadingOut ? 'opacity 0.8s ease-out' : 'none',
        pointerEvents: isFadingOut ? 'none' : 'auto',
      }}
    >
      {/* Idle brain video - slow rotation */}
      {!isZooming && (
        <video
          src="/idle_brain.webm"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"

          className="w-full h-full object-contain"
        />
      )}

      {/* Zoom transition video - plays full with alpha, fades at end */}
      <video
        ref={zoomVideoRef}
        src="/brain_zoom.webm"
        muted
        playsInline
        preload="auto"
        className={`
          absolute inset-0 w-full h-full object-cover
          ${isZooming ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        style={{
          transition: 'opacity 0.3s ease-out',
        }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleZoomEnded}
      />
      

    </div>
  );
}
