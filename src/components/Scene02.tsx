import { useEffect, useRef, useState } from 'react';
import { GalaxyColumn } from './GalaxyColumn';
import { GravityParticles } from './GravityParticles';
import { isSafari } from '@/lib/isSafari';
import { resolveAssetUrl } from '@/lib/assets';

interface Scene02Props {
  isActive: boolean;
  playAstro: boolean;
}

interface DriftPoint {
  x: number;
  y: number;
}

const ASTRO_DRIFT_LAG = 0.055;
const ASTRO_DESKTOP_DRIFT_PCT = { x: 0.15, y: 0.15 };
const ASTRO_MOBILE_DRIFT_PCT = { x: 0.1, y: 0.1 };
const NEBULA_PARALLAX_RATIO = 0.12;

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
  const nebulaParallaxRef = useRef<HTMLDivElement>(null);
  const astroDriftTargetRef = useRef<DriftPoint>({ x: 0, y: 0 });
  const astroDriftCurrentRef = useRef<DriftPoint>({ x: 0, y: 0 });
  const nebulaDriftTargetRef = useRef<DriftPoint>({ x: 0, y: 0 });
  const nebulaDriftCurrentRef = useRef<DriftPoint>({ x: 0, y: 0 });
  const [scaleNebula, setScaleNebula] = useState(2);
  const [scaleAstro, setScaleAstro] = useState(1);
  const [drifted, setDrifted] = useState(false);

  useEffect(() => {
    const video = astroRef.current;
    if (!video) return;
    if (playAstro) {
      // Reset drift to centre so astronaut fades in at centre before following cursor
      astroDriftTargetRef.current = { x: 0, y: 0 };
      astroDriftCurrentRef.current = { x: 0, y: 0 };
      nebulaDriftTargetRef.current = { x: 0, y: 0 };
      nebulaDriftCurrentRef.current = { x: 0, y: 0 };
      if (astroMoveRef.current) {
        astroMoveRef.current.style.transform = 'translate3d(0, 0, 0)';
      }
      if (nebulaParallaxRef.current) {
        nebulaParallaxRef.current.style.transform = 'translate3d(0, 0, 0)';
      }
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
    nebulaDriftTargetRef.current = { x: 0, y: 0 };
    nebulaDriftCurrentRef.current = { x: 0, y: 0 };
    if (nebulaParallaxRef.current) {
      nebulaParallaxRef.current.style.transform = 'translate3d(0, 0, 0)';
    }

    const handleMove = (e: PointerEvent) => {
      const target = getIdleAstronautDriftTarget(e.clientX, e.clientY);
      astroDriftTargetRef.current = target;
      nebulaDriftTargetRef.current = {
        x: -target.x * NEBULA_PARALLAX_RATIO,
        y: -target.y * NEBULA_PARALLAX_RATIO,
      };
    };

    let frameId = 0;
    const animateDrift = () => {
      const nextPosition = driftIdleAstronautTowardMouse(
        astroDriftCurrentRef.current,
        astroDriftTargetRef.current
      );
      const nextNebulaPosition = driftIdleAstronautTowardMouse(
        nebulaDriftCurrentRef.current,
        nebulaDriftTargetRef.current
      );

      astroDriftCurrentRef.current = nextPosition;
      nebulaDriftCurrentRef.current = nextNebulaPosition;
      el.style.transform = `translate3d(${nextPosition.x.toFixed(2)}px, ${nextPosition.y.toFixed(2)}px, 0)`;
      if (nebulaParallaxRef.current) {
        nebulaParallaxRef.current.style.transform = `translate3d(${nextNebulaPosition.x.toFixed(2)}px, ${nextNebulaPosition.y.toFixed(2)}px, 0)`;
      }
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
      <div
        ref={nebulaParallaxRef}
        className="absolute will-change-transform"
        style={{
          top: '-7.5%',
          left: '-7.5%',
          width: '115%',
          height: '115%',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        <img
          src={resolveAssetUrl('/scene02/nebula_space_only2x.png')}
          alt=""
          className="absolute left-1/2 top-1/2 h-full w-full object-cover"
          style={{
            transform: `translate(-50%, -50%) scale(${scaleNebula})`,
            transition: 'transform 10s ease-out',
          }}
        />
      </div>
      {/* Gravity particles layer - floating interactive particles above nebula */}
      <GravityParticles isActive={isActive} />
      {/* Galaxy columns - 3 columns spanning full viewport */}
      <div
        className={`absolute inset-0 z-10 flex transition-opacity duration-[1500ms] ease-out ${
          drifted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <GalaxyColumn
          srcWebm="/webm/toto-ga2.webm"
          srcMov="/webm/toto-ga2.mov"
          label="TOTO"
          href="/toto-portfolio.html"
        />
        <GalaxyColumn
          srcWebm="/webm/nft11-ga2.webm"
          srcMov="/webm/nft11-ga2.mov"
          label="NFT11"
          href="/nft11-portfolio.html"
          alignTop
        />
        <GalaxyColumn
          srcWebm="/webm/oxytap-ga2.webm"
          srcMov="/webm/oxytap-ga2.mov"
          label="OXYTAP"
          href="/oxytap-portfolio.html"
        />
      </div>
      {/* Astronaut video - centered in viewport, drifts down on entrance, follows mouse */}
      <div className="astro-float pointer-events-none absolute left-1/2 top-1/2 z-20 h-full w-full -translate-x-1/2 -translate-y-1/2">
        <div
          className={`h-full w-full transition-all duration-[1500ms] ease-out ${
            drifted ? 'translate-y-10 opacity-100' : 'translate-y-0 opacity-0'
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
              src={resolveAssetUrl('/scene02/looking-astro-loop2.webm')}
              muted
              playsInline
              loop
              preload="auto"
              className={`h-full w-full origin-center object-contain object-center ${isSafari ? 'mix-blend-screen' : ''}`}
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
