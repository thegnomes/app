import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { GalaxyColumn } from './GalaxyColumn';
import { GravityParticles } from './GravityParticles';
import { Scene02MobileCarousel, type Scene02GalaxyItem } from './Scene02MobileCarousel';
import { getAlphaVideoSources } from '@/lib/alphaVideoSources';
import { resolveAssetUrl } from '@/lib/assets';
import { nft11Project, oxytapProject, totoProject } from '@/data/portfolio-projects';

const PORTFOLIO_VIDEO_SOURCES = [
  '/webm/toto-ga2.webm',
  '/webm/toto-ga2.mov',
  '/webm/nft11-ga2.webm',
  '/webm/nft11-ga2.mov',
  '/webm/oxytap-ga2.webm',
  '/webm/oxytap-ga2.mov',
  '/webm/target-lock.webm',
  '/webm/target-lock.mov',
];

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
const MARQUEE_SPEED = 0.42;
const MARQUEE_LINE_ONE = 'CHANCE WOON - CREATIVE STRATEGIST';

type CompetencyId = 'creative-direction' | 'universe-building' | 'prototype-to-ship';

const SCENE02_GALAXIES: Scene02GalaxyItem[] = [
  {
    srcWebm: '/webm/toto-ga2.webm',
    srcMov: '/webm/toto-ga2.mov',
    href: '/toto-portfolio.html',
    hoverId: 'creative-direction',
    project: totoProject,
  },
  {
    srcWebm: '/webm/nft11-ga2.webm',
    srcMov: '/webm/nft11-ga2.mov',
    href: '/nft11-portfolio.html',
    hoverId: 'universe-building',
    project: nft11Project,
    alignTop: true,
  },
  {
    srcWebm: '/webm/oxytap-ga2.webm',
    srcMov: '/webm/oxytap-ga2.mov',
    href: '/oxytap-portfolio.html',
    hoverId: 'prototype-to-ship',
    project: oxytapProject,
    displayTitle: oxytapProject.title.toUpperCase(),
  },
];

interface CompetencyItem {
  id: CompetencyId;
  label: string;
  accent: string;
}

const MARQUEE_COMPETENCIES: CompetencyItem[] = [
  { id: 'creative-direction', label: 'Creative Direction', accent: '#60a5fa' },
  { id: 'universe-building', label: 'Universe Building', accent: '#f59e0b' },
  { id: 'prototype-to-ship', label: 'Prototype-To-Ship', accent: '#67e8f9' },
];

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

function toCompetencyId(hoverId: string | null): CompetencyId | null {
  if (hoverId === 'creative-direction' || hoverId === 'universe-building' || hoverId === 'prototype-to-ship') {
    return hoverId;
  }

  return null;
}

function Scene02MarqueeLine({
  hoveredCompetency,
  copyIndex,
}: {
  hoveredCompetency: CompetencyId | null;
  copyIndex: number;
}) {
  const isHovering = hoveredCompetency !== null;

  const getWordStyle = (item?: CompetencyItem): CSSProperties => {
    const isActive = Boolean(item && item.id === hoveredCompetency);

    return {
      color: isActive && item ? item.accent : '#ffffff',
      opacity: isHovering ? (isActive ? 1 : 0.3) : 1,
      textShadow: isActive && item ? `0 0 24px ${item.accent}` : 'none',
      transition: 'color 500ms ease, opacity 500ms ease, text-shadow 500ms ease',
    };
  };

  return (
    <span className="inline-flex items-center whitespace-nowrap pr-10">
      {MARQUEE_COMPETENCIES.map((item, index) => (
        <span key={`${copyIndex}-${item.id}`} className="inline-flex items-center">
          <span style={getWordStyle(item)}>{item.label}</span>
          {index < MARQUEE_COMPETENCIES.length - 1 && (
            <span className="px-3" style={getWordStyle()}>
              |
            </span>
          )}
        </span>
      ))}
    </span>
  );
}

function Scene02BottomMarquee({
  hoveredCompetency,
  isVisible,
}: {
  hoveredCompetency: CompetencyId | null;
  isVisible: boolean;
}) {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const pos1Ref = useRef(0);
  const pos2Ref = useRef(0);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const animate = (time: number) => {
      const elapsed = lastTimeRef.current === 0 ? 16.67 : Math.min(time - lastTimeRef.current, 50);
      lastTimeRef.current = time;
      const frameScale = elapsed / 16.67;
      const speed = MARQUEE_SPEED * frameScale;

      const row1 = row1Ref.current;
      if (row1) {
        const first = row1.children[0] as HTMLElement | undefined;
        if (first) {
          const width = first.offsetWidth;
          pos1Ref.current -= speed;
          if (Math.abs(pos1Ref.current) >= width) pos1Ref.current += width;
          row1.style.transform = `translate3d(${pos1Ref.current}px, 0, 0)`;
        }
      }

      const row2 = row2Ref.current;
      if (row2) {
        const first = row2.children[0] as HTMLElement | undefined;
        if (first) {
          const width = first.offsetWidth;
          pos2Ref.current += speed * 0.78;
          if (pos2Ref.current >= 0) pos2Ref.current -= width;
          row2.style.transform = `translate3d(${pos2Ref.current}px, 0, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const lineOneText = Array(6).fill(MARQUEE_LINE_ONE).join(' - ') + ' - ';

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-[100px] z-20 hidden select-none overflow-hidden transition-opacity duration-[1500ms] ease-out md:block ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      <div className="font-russo text-white drop-shadow-[0_0_24px_rgba(0,0,0,0.85)]">
        <div className="relative whitespace-nowrap text-4xl leading-[0.92] tracking-normal sm:text-5xl md:text-7xl lg:text-8xl">
          <div ref={row1Ref} className="inline-flex will-change-transform">
            <span className="inline-block whitespace-nowrap pr-10">{lineOneText}</span>
            <span className="inline-block whitespace-nowrap pr-10">{lineOneText}</span>
          </div>
        </div>
        <div className="relative mt-1 whitespace-nowrap text-sm leading-none tracking-normal sm:text-xl md:mt-2 md:text-2xl lg:text-3xl">
          <div ref={row2Ref} className="inline-flex will-change-transform">
            <Scene02MarqueeLine hoveredCompetency={hoveredCompetency} copyIndex={0} />
            <Scene02MarqueeLine hoveredCompetency={hoveredCompetency} copyIndex={1} />
            <Scene02MarqueeLine hoveredCompetency={hoveredCompetency} copyIndex={2} />
          </div>
        </div>
      </div>
    </div>
  );
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
  const [hoveredCompetency, setHoveredCompetency] = useState<CompetencyId | null>(null);
  const [, setPortfolioVideosReady] = useState(false);
  const astroVideoSources = getAlphaVideoSources(
    '/scene02/looking-astro-loop2.webm',
    '/scene02/looking-astro-loop2.mov'
  );

  // Preload portfolio showcase videos when Scene02 becomes active
  useEffect(() => {
    if (!isActive) return;
    let cancelled = false;
    let loadedCount = 0;
    const total = PORTFOLIO_VIDEO_SOURCES.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= total && !cancelled) {
        setPortfolioVideosReady(true);
      }
    };

    const preloaders: HTMLVideoElement[] = [];
    for (const src of PORTFOLIO_VIDEO_SOURCES) {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = 'anonymous';
      video.src = resolveAssetUrl(src);
      video.oncanplaythrough = checkAllLoaded;
      video.onerror = checkAllLoaded; // Don't block on individual failures
      preloaders.push(video);
    }

    // Fallback: mark ready after 8s regardless
    const fallbackTimer = setTimeout(() => {
      if (!cancelled) setPortfolioVideosReady(true);
    }, 8000);

    return () => {
      cancelled = true;
      clearTimeout(fallbackTimer);
      for (const v of preloaders) {
        v.src = '';
        v.load();
      }
    };
  }, [isActive]);

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
    <div className="scene02-shell absolute inset-0 z-30 overflow-hidden bg-black">
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
            transition: 'transform 5s ease-out',
          }}
        />
      </div>
      {/* Gravity particles layer - floating interactive particles above nebula */}
      <GravityParticles isActive={isActive} />
      <Scene02MobileCarousel items={SCENE02_GALAXIES} isVisible={drifted} />
      {/* Galaxy columns - 3 columns spanning full viewport */}
      <div
        className={`absolute inset-0 z-10 hidden transition-opacity duration-[1500ms] ease-out md:flex ${
          drifted ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {SCENE02_GALAXIES.map((galaxy) => (
          <GalaxyColumn
            key={galaxy.hoverId}
            srcWebm={galaxy.srcWebm}
            srcMov={galaxy.srcMov}
            label={galaxy.displayTitle ?? galaxy.project.title}
            year={galaxy.project.year}
            href={galaxy.href}
            alignTop={galaxy.alignTop}
            hoverId={galaxy.hoverId}
            onHoverChange={(hoverId) => setHoveredCompetency(toCompetencyId(hoverId))}
          />
        ))}
      </div>
      {/* Astronaut video - centered in viewport, drifts down on entrance, follows mouse */}
      <div className="astro-float pointer-events-none absolute left-1/2 top-1/2 z-40 hidden h-full w-full -translate-x-1/2 -translate-y-1/2 md:block">
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
              muted
              playsInline
              loop
              preload="auto"
              className="h-full w-full origin-center object-contain object-center"
              style={{
                transform: `scale(${scaleAstro})`,
                transition: 'transform 10s ease-out',
              }}
            >
              {astroVideoSources.map((source) => (
                <source key={source.src} src={source.src} type={source.type} />
              ))}
            </video>
          </div>
        </div>
      </div>
      <Scene02BottomMarquee hoveredCompetency={hoveredCompetency} isVisible={drifted} />
    </div>
  );
}
