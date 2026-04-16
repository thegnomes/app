import { useEffect, useRef, useState } from 'react';

interface Scene02Props {
  isActive: boolean;
  playAstro: boolean;
}

export function Scene02({ isActive, playAstro }: Scene02Props) {
  const astroRef = useRef<HTMLVideoElement>(null);
  const [scaleNebula, setScaleNebula] = useState(2);
  const [scaleAstro, setScaleAstro] = useState(2);

  useEffect(() => {
    const video = astroRef.current;
    if (!video) return;
    if (playAstro) {
      void video.play();
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [playAstro]);

  useEffect(() => {
    if (playAstro) {
      const t = setTimeout(() => {
        setScaleNebula(1);
        setScaleAstro(0.5);
      }, 50);
      return () => clearTimeout(t);
    } else {
      requestAnimationFrame(() => {
        setScaleNebula(2);
        setScaleAstro(2);
      });
    }
  }, [playAstro]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-30 overflow-hidden bg-black">
      {/* Nebula background - starts at 200%, zooms out to 100% */}
      <img
        src="/scene02/nebula_space_only2x.png"
        alt=""
        className="absolute left-1/2 top-1/2 h-full w-full object-cover"
        style={{
          transform: `translate(-50%, -50%) scale(${scaleNebula})`,
          transition: 'transform 10s ease-out',
        }}
      />
      {/* Astronaut video - starts at 100%, zooms out to 50% */}
      <video
        ref={astroRef}
        src="/scene02/looking-astro-loop2.webm"
        muted
        playsInline
        loop
        preload="auto"
        className="absolute left-1/2 top-1/2 h-full w-full object-contain"
        style={{
          transform: `translate(-50%, -50%) scale(${scaleAstro})`,
          transition: 'transform 10s ease-out',
        }}
      />
    </div>
  );
}
