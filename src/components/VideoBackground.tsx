import { useRef, useEffect, useState } from 'react';

interface VideoBackgroundProps {
  isActive: boolean;
  onTransition: () => void;
}

export function VideoBackground({ isActive, onTransition }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
      }, 1200);
    }
  };

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={`
        fixed inset-0 z-10 cursor-pointer
        transition-transform duration-[1200ms] ease-out
        ${isZooming ? 'scale-[3.5] opacity-0' : 'scale-100 opacity-100'}
      `}
      style={{
        transformOrigin: 'center center',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        src="/brain.mp4"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest uppercase animate-pulse">
        Click to enter
      </div>
    </div>
  );
}
