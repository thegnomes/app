import { useState, useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  isActive: boolean;
  onTransition: () => void;
}

export function VideoBackground({ isActive, onTransition }: VideoBackgroundProps) {
  const [isZooming, setIsZooming] = useState(false);
  const idleVideoRef = useRef<HTMLVideoElement>(null);
  const zoomVideoRef = useRef<HTMLVideoElement>(null);

  // Slow down the idle video playback speed
  useEffect(() => {
    if (idleVideoRef.current) {
      idleVideoRef.current.playbackRate = 0.5; // Slow down to 50% speed
    }
  }, [isActive]);

  const handleClick = () => {
    if (!isZooming && isActive) {
      setIsZooming(true);
      // Play the zoom video
      if (zoomVideoRef.current) {
        zoomVideoRef.current.play();
      }
      // Transition to starfield after zoom video starts
      setTimeout(() => {
        onTransition();
      }, 1500);
    }
  };

  if (!isActive) return null;

  return (
    <div
      onClick={handleClick}
      className="video-background fixed inset-0 z-10 cursor-pointer bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Idle brain video - slow rotation */}
      {!isZooming && (
        <video
          ref={idleVideoRef}
          src="/brain.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-contain"
          style={{
            width: 'min(45vh, 450px)',
            height: 'min(45vh, 450px)',
          }}
        />
      )}

      {/* Zoom transition video */}
      <video
        ref={zoomVideoRef}
        src="/brain_zoom.mp4"
        muted
        playsInline
        className={`
          absolute inset-0 w-full h-full object-contain transition-opacity duration-500
          ${isZooming ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onEnded={() => {
          onTransition();
        }}
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
