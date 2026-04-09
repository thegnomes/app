import { useState, useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  isActive: boolean;
  onTransition: () => void;
}

// Transition to starfield at 1:35 (95 seconds)
const TRANSITION_TIME = 95;

export function VideoBackground({ isActive, onTransition }: VideoBackgroundProps) {
  const [isZooming, setIsZooming] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const zoomVideoRef = useRef<HTMLVideoElement>(null);
  const hasTransitionedRef = useRef(false);

  const handleClick = () => {
    if (!isZooming && isActive) {
      setIsZooming(true);
      hasTransitionedRef.current = false;
      // Play the zoom video
      if (zoomVideoRef.current) {
        zoomVideoRef.current.play();
      }
    }
  };

  const handleTimeUpdate = () => {
    const video = zoomVideoRef.current;
    if (!video || hasTransitionedRef.current) return;
    
    // Transition at 1:35 mark
    if (video.currentTime >= TRANSITION_TIME) {
      hasTransitionedRef.current = true;
      // Start fading out the video while starfield fades in
      setIsFadingOut(true);
      // Trigger transition to starfield
      onTransition();
    }
  };

  const handleZoomEnded = () => {
    // Fallback: if video ends before transition (shouldn't happen), trigger it
    if (!hasTransitionedRef.current) {
      hasTransitionedRef.current = true;
      setIsFadingOut(true);
      onTransition();
    }
  };

  if (!isActive) return null;

  return (
    <div
      onClick={handleClick}
      className="video-background fixed inset-0 z-10 cursor-pointer bg-black flex items-center justify-center overflow-hidden"
      style={{
        opacity: isFadingOut ? 0 : 1,
        transition: isFadingOut ? 'opacity 1.5s ease-out' : 'none',
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
          className="w-full h-full object-cover"
        />
      )}

      {/* Zoom transition video - transitions at 1:35 mark */}
      <video
        ref={zoomVideoRef}
        src="/brain_zoom.webm"
        muted
        playsInline
        className={`
          absolute inset-0 w-full h-full object-cover
          ${isZooming ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        style={{
          transition: 'opacity 0.5s ease-out',
        }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleZoomEnded}
      />
      
      {/* Click hint */}
      {!isZooming && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest uppercase animate-pulse pointer-events-none">
          Click to enter
        </div>
      )}
    </div>
  );
}
