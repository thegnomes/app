import { useEffect, useRef } from 'react';

interface Scene02Props {
  isActive: boolean;
  playAstro: boolean;
}

export function Scene02({ isActive, playAstro }: Scene02Props) {
  const astroRef = useRef<HTMLVideoElement>(null);

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

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-30 overflow-hidden bg-black">
      {/* Nebula background - scale 100% */}
      <img
        src="/scene02/nebula_space_only2x.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Astronaut video - scale 56.6%, centered, no autoplay initially */}
      <video
        ref={astroRef}
        src="/scene02/looking-astro-loop2.webm"
        muted
        playsInline
        loop
        preload="auto"
        className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 scale-[0.566] object-contain"
      />
    </div>
  );
}
