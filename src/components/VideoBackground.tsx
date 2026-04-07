import { useState } from 'react';

interface VideoBackgroundProps {
  isActive: boolean;
  onTransition: () => void;
}

export function VideoBackground({ isActive, onTransition }: VideoBackgroundProps) {
  const [isZooming, setIsZooming] = useState(false);

  const handleClick = () => {
    if (!isZooming && isActive) {
      setIsZooming(true);
      // Wait for zoom animation to complete before transitioning
      setTimeout(() => {
        onTransition();
      }, 2000);
    }
  };

  if (!isActive) return null;

  return (
    <div
      onClick={handleClick}
      className="video-background fixed inset-0 z-10 cursor-pointer bg-black flex items-center justify-center overflow-hidden"
    >
      {/* GIF container - centered and sized */}
      <div
        className={`
          relative transition-all duration-[2000ms] ease-out
          ${isZooming ? 'scale-[6] opacity-0' : 'scale-100 opacity-100'}
        `}
        style={{
          width: 'min(45vh, 450px)',
          height: 'min(45vh, 450px)',
        }}
      >
        <img
          src="/brain.gif"
          alt="Brain"
          className="w-full h-full object-contain rounded-full"
          style={{
            filter: 'drop-shadow(0 0 40px rgba(0, 212, 255, 0.4))',
          }}
        />
      </div>
      
      {/* Click hint */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest uppercase animate-pulse pointer-events-none">
        Click to enter
      </div>
    </div>
  );
}
