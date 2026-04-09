import { useState, useRef } from 'react';

interface VideoBackgroundProps {
  isActive: boolean;
  onTransition: () => void;
}

// Let the zoom video play - trigger starfield earlier to overlay with zoom
// Video is ~1480ms, transition at 500ms so starfield appears during zoom
const TRANSITION_TIME = 0.5; // Trigger starfield at 500ms, video continues playing

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
  };

  if (!isActive) return null;

  return (
    <div
      onClick={handleClick}
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
          className="w-full h-full object-contain"
        />
      )}

      {/* Zoom transition video - plays full with alpha, fades at end */}
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
          transition: 'opacity 0.3s ease-out',
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
