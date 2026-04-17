import { useEffect, useRef, useState } from 'react';

interface Scene02Props {
  isActive: boolean;
  playAstro: boolean;
}

interface DriftPoint {
  x: number;
  y: number;
}

const ASTRO_DRIFT_LAG = 0.055;
const ASTRO_DESKTOP_DRIFT_PCT = { x: 0.45, y: 0.45 };
const ASTRO_MOBILE_DRIFT_PCT = { x: 0.35, y: 0.35 };

function getIdleAstronautDriftTarget(clientX: number, clientY: number): DriftPoint {
  const viewportWidth = window.innerWidth || 1;
  const viewportHeight = window.innerHeight || 1;
  const driftRange = viewportWidth >= 1024 ? ASTRO_DESKTOP_DRIFT_PCT : ASTRO_MOBILE_DRIFT_PCT;

  const normalizedX = (clientX / viewportWidth - 0.5) * 2;
  const normalizedY = (clientY / viewportHeight - 0.5) * 2;

  return {
    x: normalizedX * driftRange.x * viewportWidth,
    y: normalizedY * driftRange.y * viewportHeight,
  };
}

function driftIdleAstronautTowardMouse(current: DriftPoint, target: DriftPoint): DriftPoint {
  return {
    x: current.x + (target.x - current.x) * ASTRO_DRIFT_LAG,
    y: current.y + (target.y - current.y) * ASTRO_DRIFT_LAG,
  };
}

export function Scene02({ isActive, playAstro }: Scene02Props) {
  const astroRef = useRef<HTMLVideoElement>(null);
  const astroMoveRef = useRef<HTMLDivElement>(null);
  const astroDriftTargetRef = useRef<DriftPoint>({ x: 0, y: 0 });
  const astroDriftCurrentRef = useRef<DriftPoint>({ x: 0, y: 0 });
  const [scaleNebula, setScaleNebula] = useState(2);
  const [scaleAstro, setScaleAstro] = useState(1);
  const [drifted, setDrifted] = useState(false);

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
          setDrifted(true);
        });
      });
      return () => cancelAnimationFrame(raf1);
    } else {
      requestAnimationFrame(() => {
        setScaleNebula(2);
        setScaleAstro(1);
        setDrifted(false);
      });
    }
  }, [playAstro]);

  useEffect(() => {
    if (!isActive) return;

    const el = astroMoveRef.current;
    if (!el) return;

    astroDriftTargetRef.current = { x: 0, y: 0 };
    astroDriftCurrentRef.current = { x: 0, y: 0 };
    el.style.transform = 'translate3d(0, 0, 0)';

    const handleMove = (e: PointerEvent) => {
      astroDriftTargetRef.current = getIdleAstronautDriftTarget(e.clientX, e.clientY);
    };

    let frameId = 0;
    const animateDrift = () => {
      const nextPosition = driftIdleAstronautTowardMouse(
        astroDriftCurrentRef.current,
        astroDriftTargetRef.current
      );

      astroDriftCurrentRef.current = nextPosition;
      el.style.transform = `translate3d(${nextPosition.x.toFixed(2)}px, ${nextPosition.y.toFixed(2)}px, 0)`;
      frameId = requestAnimationFrame(animateDrift);
    };

    window.addEventListener('pointermove', handleMove);
    frameId = requestAnimationFrame(animateDrift);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      cancelAnimationFrame(frameId);
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
      {/* Astronaut video - top-middle anchored at screen center, drifts in, follows mouse */}
      <div className="astro-float absolute left-1/2 top-1/2 h-full w-full">
        <div
          className={`h-full w-full transition-all duration-[1500ms] ease-out ${
            drifted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div
            ref={astroMoveRef}
            className="h-full w-full will-change-transform"
            style={{
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            <video
              ref={astroRef}
              src="/scene02/looking-astro-loop2.webm"
              muted
              playsInline
              loop
              preload="auto"
              className="h-full w-full origin-top object-contain object-top"
              style={{
                transform: `scale(${scaleAstro})`,
                transition: 'transform 10s ease-out',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
