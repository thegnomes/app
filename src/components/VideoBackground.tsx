import { useRef, useEffect, useState } from 'react';

interface VideoBackgroundProps {
  isActive: boolean;
  onTransition: () => void;
}

export function VideoBackground({ isActive, onTransition }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    if (videoRef.current && isActive) {
      videoRef.current.play();
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) {
      setIsZooming(false);
    }
  }, [isActive]);

  const handleClick = () => {
    if (!isZooming && isActive) {
      setIsZooming(true);
      // Wait for zoom animation to complete before transitioning
      setTimeout(() => {
        onTransition();
      }, 1500);
    }
  };

  if (!isActive) return null;

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 z-10 cursor-pointer bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Video container - centered and sized */}
      <div
        className={`
          relative transition-all duration-[1500ms] ease-out
          ${isZooming ? 'scale-[4] opacity-0' : 'scale-100 opacity-100'}
        `}
        style={{
          width: 'min(50vh, 500px)',
          height: 'min(50vh, 500px)',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-contain rounded-full"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(0, 212, 255, 0.3))',
          }}
          src="/brain.mp4"
        />
      </div>
      
      {/* Click hint */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest uppercase animate-pulse pointer-events-none">
        Click to enter
      </div>
    </div>
  );
}
