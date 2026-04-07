import { useState, useRef } from 'react';

interface VideoBackgroundProps {
  isActive: boolean;
  onTransition: () => void;
}

export function VideoBackground({ isActive, onTransition }: VideoBackgroundProps) {
  const [isZooming, setIsZooming] = useState(false);
  const zoomVideoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    if (!isZooming && isActive) {
      setIsZooming(true);
      // Play the zoom video
      if (zoomVideoRef.current) {
        zoomVideoRef.current.play();
      }
    }
  };

  const handleZoomEnded = () => {
    // Transition to starfield when zoom video finishes
    onTransition();
  };

  if (!isActive) return null;

  return (
    <div
      onClick={handleClick}
      className="video-background fixed inset-0 z-10 cursor-pointer bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Idle brain GIF - slow rotation (using CSS animation for slower speed) */}
      {!isZooming && (
        <img
          src="/Brain_7.gif"
          alt="Brain"
          className="w-full h-full object-contain"
          style={{
            width: 'min(45vh, 450px)',
            height: 'min(45vh, 450px)',
          }}
        />
      )}

      {/* Zoom transition video - plays to completion */}
      <video
        ref={zoomVideoRef}
        src="/brain_zoom.mp4"
        muted
        playsInline
        className={`
          absolute inset-0 w-full h-full object-contain transition-opacity duration-500
          ${isZooming ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
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
