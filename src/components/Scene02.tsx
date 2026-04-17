import { useEffect, useRef, useState } from 'react';

interface Scene02Props {
  isActive: boolean;
  playAstro: boolean;
}

export function Scene02({ isActive, playAstro }: Scene02Props) {
  const astroRef = useRef<HTMLVideoElement>(null);
  const astroMoveRef = useRef<HTMLDivElement>(null);
  const [scaleNebula, setScaleNebula] = useState(2);
  const [scaleAstro, setScaleAstro] = useState(1);

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
      const raf1 = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setScaleNebula(1);
          setScaleAstro(0.5);
        });
      });
      return () => cancelAnimationFrame(raf1);
    } else {
      requestAnimationFrame(() => {
        setScaleNebula(2);
        setScaleAstro(1);
      });
    }
  }, [playAstro]);

  useEffect(() => {
    if (!isActive) return;

    const el = astroMoveRef.current;
    if (!el) return;

    const handleMove = (e: PointerEvent) => {
      const isDesktop = window.innerWidth >= 1024;
      const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1 .. 1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2; // -1 .. 1
      const maxX = isDesktop ? 90 : 36;
      const maxY = isDesktop ? 60 : 24;
      const x = nx * maxX;
      const y = ny * maxY;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    };

    window.addEventListener('pointermove', handleMove);
    return () => {
      window.removeEventListener('pointermove', handleMove);
    };
  }, [isActive]);

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
      {/* Astronaut video - centered with subtle float hover + mouse follow */}
      <div className="astro-float absolute left-1/2 top-1/2 h-full w-full">
        <div
          ref={astroMoveRef}
          className="h-full w-full will-change-transform"
          style={{
            transform: 'translate3d(0, 0, 0)',
            transition: 'transform 0.15s ease-out',
          }}
        >
          <video
            ref={astroRef}
            src="/scene02/looking-astro-loop2.webm"
            muted
            playsInline
            loop
            preload="auto"
            className="h-full w-full object-contain"
            style={{
              transform: `scale(${scaleAstro})`,
              transition: 'transform 10s ease-out',
            }}
          />
        </div>
      </div>
    </div>
  );
}
