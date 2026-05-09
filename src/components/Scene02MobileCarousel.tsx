import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PortfolioProject } from '@/data/portfolio-projects';
import { getAlphaVideoSources } from '@/lib/alphaVideoSources';
import { cn } from '@/lib/utils';

const MOBILE_MARQUEE_TEXT = 'CHANCE WOON \u2014 CREATIVE STRATEGIST';
const MOBILE_MARQUEE_SPEED = 0.35;

type Scene02MobileProject = Pick<
  PortfolioProject,
  'title' | 'year' | 'coreCompetency' | 'accentColor' | 'accentSecondaryColor'
>;

export interface Scene02GalaxyItem {
  srcWebm: string;
  srcMov: string;
  href: string;
  hoverId: string;
  project: Scene02MobileProject;
  displayTitle?: string;
  alignTop?: boolean;
}

interface Scene02MobileCarouselProps {
  items: Scene02GalaxyItem[];
  isVisible: boolean;
}

const SWIPE_THRESHOLD = 48;
const PARALLAX_HINT_DURATION = 2200;
const PARALLAX_HINT_DELAY = 800;

export function Scene02MobileCarousel({ items, isVisible }: Scene02MobileCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const currentX = useRef(0);
  const hintTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const hintRafRef = useRef(0);
  const hintOffsetRef = useRef(0);
  const hintStartTimeRef = useRef(0);

  // Play/pause videos based on active index and visibility
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (isVisible && index === activeIndex) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex, isVisible]);

  // Parallax hint animation - subtle horizontal drift to suggest swipeability
  useEffect(() => {
    if (!isVisible || !showHint) return;

    const animate = (time: number) => {
      if (hintStartTimeRef.current === 0) {
        hintStartTimeRef.current = time;
      }
      const elapsed = time - hintStartTimeRef.current - PARALLAX_HINT_DELAY;

      if (elapsed > 0 && elapsed < PARALLAX_HINT_DURATION) {
        const t = elapsed / PARALLAX_HINT_DURATION;
        // Ease in-out sine for smooth, gentle motion
        const eased = Math.sin(t * Math.PI);
        // Drift ~18px left then back, very subtle
        hintOffsetRef.current = eased * -18;
      } else if (elapsed >= PARALLAX_HINT_DURATION) {
        hintOffsetRef.current = 0;
        setShowHint(false);
        return;
      }

      if (containerRef.current) {
        containerRef.current.style.setProperty('--hint-offset', `${hintOffsetRef.current}px`);
      }
      hintRafRef.current = requestAnimationFrame(animate);
    };

    hintStartTimeRef.current = 0;
    hintRafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(hintRafRef.current);
    };
  }, [isVisible, showHint, activeIndex]);

  // Reset hint when index changes (only show on first view)
  useEffect(() => {
    if (activeIndex !== 0) {
      setShowHint(false);
    }
  }, [activeIndex]);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, items.length - 1));
      setActiveIndex(clamped);
      setDragOffset(0);
    },
    [items.length]
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1 >= items.length ? 0 : activeIndex + 1);
  }, [activeIndex, items.length, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1 < 0 ? items.length - 1 : activeIndex - 1);
  }, [activeIndex, items.length, goTo]);

  // Touch handlers for swipe
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    currentX.current = touch.clientX;
    setIsDragging(true);
    setShowHint(false);
  }, []);

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      currentX.current = touch.clientX;
      const deltaX = currentX.current - touchStartX.current;
      const deltaY = touch.clientY - touchStartY.current;

      // Only track horizontal if dominant
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Add resistance at edges
        const atStart = activeIndex === 0 && deltaX > 0;
        const atEnd = activeIndex === items.length - 1 && deltaX < 0;
        const resistance = atStart || atEnd ? 0.35 : 1;
        setDragOffset(deltaX * resistance);
      }
    },
    [isDragging, activeIndex, items.length]
  );

  const onTouchEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaX = currentX.current - touchStartX.current;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX > 0) {
        goPrev();
      } else {
        goNext();
      }
    } else {
      setDragOffset(0);
    }
  }, [isDragging, goNext, goPrev]);

  // Pointer handlers for mouse drag (desktop testing)
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    touchStartX.current = e.clientX;
    currentX.current = e.clientX;
    setIsDragging(true);
    setShowHint(false);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || e.pointerType === 'touch') return;
      currentX.current = e.clientX;
      const deltaX = currentX.current - touchStartX.current;
      const atStart = activeIndex === 0 && deltaX > 0;
      const atEnd = activeIndex === items.length - 1 && deltaX < 0;
      const resistance = atStart || atEnd ? 0.35 : 1;
      setDragOffset(deltaX * resistance);
    },
    [isDragging, activeIndex, items.length]
  );

  const onPointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const deltaX = currentX.current - touchStartX.current;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX > 0) {
        goPrev();
      } else {
        goNext();
      }
    } else {
      setDragOffset(0);
    }
  }, [isDragging, goNext, goPrev]);

  // Spring-back transition when not dragging
  const transitionStyle = isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)';

  return (
    <div
      className={cn(
        'absolute inset-0 z-20 md:hidden',
        'transition-opacity duration-[1500ms] ease-out',
        isVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      )}
      aria-label="Project galaxies"
    >
      {/* Swipeable container */}
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          touchAction: 'pan-y',
          '--hint-offset': '0px',
        } as React.CSSProperties}
      >
        <div
          className="flex h-full will-change-transform"
          style={{
            transform: `translate3d(calc(${-activeIndex * 100}% + ${dragOffset}px + var(--hint-offset)), 0, 0)`,
            transition: transitionStyle,
          }}
        >
          {items.map((item, index) => (
            <GalaxySlide
              key={item.hoverId}
              item={item}
              isActive={activeIndex === index}
              videoRef={(node) => {
                videoRefs.current[index] = node;
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between px-3">
        <button
          type="button"
          onClick={goPrev}
          className={cn(
            'pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white/70 backdrop-blur-sm transition-all duration-300',
            'active:scale-90 active:bg-black/50 active:text-white',
            items.length <= 1 && 'hidden'
          )}
          aria-label="Previous project"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className={cn(
            'pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white/70 backdrop-blur-sm transition-all duration-300',
            'active:scale-90 active:bg-black/50 active:text-white',
            items.length <= 1 && 'hidden'
          )}
          aria-label="Next project"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Shared marquee */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-30 px-4">
        <MobileMarquee />
      </div>

      {/* Dot indicators */}
      <div className="pointer-events-auto absolute inset-x-0 bottom-[calc(21svh+env(safe-area-inset-bottom))] z-30 flex justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={item.hoverId}
            type="button"
            aria-label={`Show ${item.project.title}`}
            className={cn(
              'h-2.5 rounded-full transition-all duration-300',
              activeIndex === index ? 'w-8 bg-white' : 'w-2.5 bg-white/35'
            )}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
}

function MobileMarquee() {
  const rowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      const row = rowRef.current;
      if (row) {
        const first = row.children[0] as HTMLElement | undefined;
        if (first) {
          const w = first.offsetWidth;
          posRef.current -= MOBILE_MARQUEE_SPEED;
          if (Math.abs(posRef.current) >= w) posRef.current += w;
          row.style.transform = `translateX(${posRef.current}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const repeated = Array(4).fill(MOBILE_MARQUEE_TEXT).join('  \u2014  ') + '  \u2014  ';

  return (
    <div className="overflow-hidden select-none">
      <div className="relative whitespace-nowrap font-russo text-lg tracking-wider text-white/70">
        <div ref={rowRef} className="inline-flex will-change-transform">
          <span className="inline-block whitespace-nowrap pr-10">{repeated}</span>
          <span className="inline-block whitespace-nowrap pr-10">{repeated}</span>
        </div>
      </div>
    </div>
  );
}

interface GalaxySlideProps {
  item: Scene02GalaxyItem;
  isActive: boolean;
  videoRef: (node: HTMLVideoElement | null) => void;
}

function GalaxySlide({ item, isActive, videoRef }: GalaxySlideProps) {
  const videoSources = getAlphaVideoSources(item.srcWebm, item.srcMov);
  const title = item.displayTitle ?? item.project.title;
  const accentColor = item.project.accentColor ?? '#ffffff';
  const accentSecondaryColor = item.project.accentSecondaryColor ?? accentColor;

  return (
    <a
      href={item.href}
      aria-label={`Open ${item.project.title} profile`}
      className="group relative block h-full w-full flex-shrink-0 overflow-hidden text-white"
      draggable={false}
      style={{ height: '100svh' }}
    >
      {/* Accent radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-700"
        style={{
          background: [
            `radial-gradient(circle at 50% 48%, ${accentColor}3f 0%, transparent 42%)`,
            `radial-gradient(circle at 50% 70%, ${accentSecondaryColor}24 0%, transparent 34%)`,
          ].join(', '),
        }}
      />
      {/* Vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.48),rgba(0,0,0,0)_28%,rgba(0,0,0,0)_62%,rgba(0,0,0,0.72))]" />

      {/* Galaxy video */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          preload="auto"
          className={cn(
            'h-[62svh] w-[150vw] max-w-none object-contain transition-all duration-700 ease-out',
            isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-35 blur-[1px]'
          )}
        >
          {videoSources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
      </div>

      {/* Top text */}
      <div className="pointer-events-none absolute inset-x-0 top-[calc(2.75rem+env(safe-area-inset-top))] z-20 px-6 text-center">
        <p className="scene02-mono text-xs uppercase text-white/65">{item.project.year}</p>
        <h2 className="mt-3 font-russo text-[4rem] uppercase leading-none text-white drop-shadow-[0_0_28px_rgba(0,0,0,0.85)]">
          {title}
        </h2>
        <p className="mx-auto mt-2 max-w-[16rem] font-russo text-sm uppercase leading-tight tracking-wide text-white/80">
          {item.project.coreCompetency}
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[calc(2rem+env(safe-area-inset-bottom))] z-20 px-6 text-center">
        <span
          className="inline-flex h-12 min-w-56 items-center justify-center gap-2 rounded-full border bg-white/10 px-5 text-sm font-semibold uppercase text-white shadow-[0_0_28px_rgba(255,255,255,0.16)] backdrop-blur-md transition-all duration-300 group-active:scale-95"
          style={{
            borderColor: `${accentColor}8a`,
            boxShadow: `0 0 28px ${accentColor}38`,
          }}
        >
          Tap to Enter Profile
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
