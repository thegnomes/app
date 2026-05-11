import { useEffect, useMemo, useRef, useState, useCallback, type ReactNode } from 'react';
import type { PortfolioProject } from '@/data/portfolio-projects';
import { isSafari } from '@/lib/isSafari';
import { useScrollLock } from '@/hooks/useScrollLock';
import { Preloader } from './Preloader';
import { resolveAssetUrl } from '@/lib/assets';

/* ─── Hooks ─── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const frameId = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.top < windowH && rect.bottom > 0) {
        setInView(true);
      }
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Primitives ─── */

function AuroraTextReveal({
  children,
  className = '',
  as: Tag = 'span',
  fromColor = '#f59e0b',
  toColor = '#ea580c',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'h2' | 'p';
  fromColor?: string;
  toColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = windowH * 0.85;
      const end = windowH * 0.25;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const CustomTag = Tag as React.ElementType;

  return (
    <div ref={ref} className={className}>
      <CustomTag
        className="inline"
        style={{
          backgroundImage: `linear-gradient(90deg, ${fromColor} 0%, ${toColor} ${progress * 100}%, #a3a3a3 ${progress * 100}%, #a3a3a3 100%)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {children}
      </CustomTag>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="portfolio-template-mono mb-4 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
      {children}
    </p>
  );
}

function FadeIn({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function VideoPlayer({
  src,
  className = '',
  poster,
}: {
  src: string;
  className?: string;
  poster?: string;
}) {
  const resolved = resolveAssetUrl(src);
  const isExternal = resolved.startsWith('http');
  const safariStyle = isSafari ? { mixBlendMode: 'screen' as const, filter: 'brightness(1)' as const } : undefined;
  if (isExternal) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster ? resolveAssetUrl(poster) : undefined}
        className={className}
        style={safariStyle}
      >
        <source src={resolved} type={`video/${resolved.replace(/.*\./, '')}`} />
      </video>
    );
  }
  const base = resolved.replace(/\.(mp4|webm|mov|ogg)$/i, '');
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster ? resolveAssetUrl(poster) : undefined}
      className={className}
      style={safariStyle}
    >
      <source src={`${base}.webm`} type="video/webm" />
      <source src={`${base}.mp4`} type="video/mp4" />
    </video>
  );
}

function ScrollFlowTextFX({ top, bottom, accentColor }: { top: string; bottom: string; accentColor?: string }) {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const pos1Ref = useRef(0);
  const pos2Ref = useRef(0);
  const speedRef = useRef(0.5);
  const boostRef = useRef(0);
  const lastScrollRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollDelta = window.scrollY - lastScrollRef.current;
      lastScrollRef.current = window.scrollY;
      boostRef.current = Math.min(boostRef.current + Math.abs(scrollDelta) * 0.015, 3);
    };

    const animate = () => {
      boostRef.current *= 0.96;
      speedRef.current = 0.5 + boostRef.current;

      const s = speedRef.current;

      const r1 = row1Ref.current;
      if (r1) {
        const first = r1.children[0] as HTMLElement | undefined;
        if (first) {
          const w = first.offsetWidth;
          pos1Ref.current -= s;
          if (Math.abs(pos1Ref.current) >= w) pos1Ref.current += w;
          r1.style.transform = `translateX(${pos1Ref.current}px)`;
        }
      }

      const r2 = row2Ref.current;
      if (r2) {
        const first = r2.children[0] as HTMLElement | undefined;
        if (first) {
          const w = first.offsetWidth;
          pos2Ref.current += s;
          if (pos2Ref.current >= 0) pos2Ref.current -= w;
          r2.style.transform = `translateX(${pos2Ref.current}px)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const textTop = Array(6).fill(top.toUpperCase()).join(' \u2014 ') + ' \u2014 ';
  const textBottom = Array(6).fill(bottom.toUpperCase()).join(' \u2014 ') + ' \u2014 ';

  return (
    <div className="overflow-hidden select-none font-russo">
      <div className="relative whitespace-nowrap text-[3rem] tracking-tight leading-[0.95] text-white md:text-[4.5rem] lg:text-[6rem]">
        <div ref={row1Ref} className="inline-flex will-change-transform">
          <span className="inline-block whitespace-nowrap pr-8">{textTop}</span>
          <span className="inline-block whitespace-nowrap pr-8">{textTop}</span>
        </div>
      </div>
      <div className="relative whitespace-nowrap text-[1.5rem] tracking-tight leading-none md:text-[2.25rem] lg:text-[3rem]" style={{ color: accentColor || 'rgba(255,255,255,0.9)' }}>
        <div ref={row2Ref} className="inline-flex will-change-transform">
          <span className="inline-block whitespace-nowrap pr-8">{textBottom}</span>
          <span className="inline-block whitespace-nowrap pr-8">{textBottom}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Timeline Indicator ─── */

const SECTION_LABELS = [
  { id: 'problem', label: 'Problem / Brief', short: 'Brief' },
  { id: 'strategic', label: 'Strategic Move', short: 'Strategy' },
  { id: 'execution', label: 'Execution / Proof', short: 'Proof' },
  { id: 'outcome', label: 'Outcome', short: 'Outcome' },
  { id: 'next', label: 'Next Project', short: 'Next' },
];

function SectionTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const centers = SECTION_LABELS.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return Infinity;
        const rect = el.getBoundingClientRect();
        return Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
      });
      const min = Math.min(...centers);
      const idx = centers.indexOf(min);
      if (idx !== -1) setActiveIndex(idx);

      const first = document.getElementById(SECTION_LABELS[0].id);
      const last = document.getElementById(SECTION_LABELS[SECTION_LABELS.length - 1].id);
      if (first && last) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = window.scrollY / docHeight;
        setProgress(Math.min(1, Math.max(0, scrollProgress)));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-0">
      <div className="relative flex flex-col items-center">
        {/* Vertical track */}
        <div className="absolute top-0 bottom-0 w-px bg-neutral-800" />
        {/* Progress fill */}
        <div
          className="absolute top-0 w-px bg-neutral-400 transition-all duration-300"
          style={{ height: `${(activeIndex / (SECTION_LABELS.length - 1)) * 100}%` }}
        />
        {SECTION_LABELS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => handleClick(s.id)}
            className="group relative flex items-center py-3"
          >
            {/* Node */}
            <span
              className={`relative z-10 block rounded-full border transition-all duration-500 ${
                i === activeIndex
                  ? 'w-3 h-3 bg-neutral-100 border-neutral-100 scale-110'
                  : i < activeIndex
                  ? 'w-2 h-2 bg-neutral-500 border-neutral-500'
                  : 'w-2 h-2 bg-transparent border-neutral-600 group-hover:border-neutral-400'
              }`}
            />
            {/* Label */}
            <span
              className={`absolute right-5 whitespace-nowrap text-[10px] uppercase tracking-widest transition-all duration-300 ${
                i === activeIndex
                  ? 'text-neutral-200 translate-x-0 opacity-100'
                  : 'text-neutral-600 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {s.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Sections ─── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10 transition-all duration-500 ${
        scrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <a href="/" className="text-[0.5625rem] font-medium tracking-tight text-neutral-100 transition-opacity uppercase hover:opacity-70 sm:text-[0.675rem] md:text-[0.875rem]">
        LEAVEEVERYTHINGTOCHANCE
      </a>
      <div className="flex items-center gap-6 md:gap-8">
        {[
          { label: 'TOTO', href: '/toto-portfolio.html' },
          { label: 'NFT11', href: '/nft11-portfolio.html' },
          { label: 'OXYTAP', href: '/oxytap-portfolio.html' },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="hidden text-[0.75rem] font-medium tracking-wide text-neutral-400 transition-colors hover:text-neutral-100 md:block"
          >
            {item.label}
          </a>
        ))}
        <a
          href="/mywork.html"
          className="rounded-full bg-neutral-100 px-4 py-2 text-[0.5rem] font-medium tracking-wide text-neutral-900 transition-colors hover:bg-neutral-300 sm:text-[0.6rem] md:text-[0.75rem]"
        >
          Back to Work
        </a>
      </div>
    </nav>
  );
}

function Hero({ project }: { project: PortfolioProject }) {
  const heroImage = project.gallery[0]?.src ?? '/portfolio/hero.jpg';

  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-10 md:pb-16 px-6 md:px-10 overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 z-0">
        {project.heroVideo ? (
          <VideoPlayer
            src={project.heroVideo}
            poster={heroImage}
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
        ) : (
          <img src={resolveAssetUrl(heroImage)} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105" />
        )}
        <div className="absolute inset-0 bg-white/5" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[55vh] bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-[5]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-widest text-neutral-300 border border-neutral-700 rounded-full">
            {project.tag}
          </span>
          <span className="font-orbitron text-[13px] md:text-sm lg:text-base uppercase tracking-[0.15em] text-neutral-200 font-medium bg-neutral-800/60 px-3 py-1 rounded-full">
            {project.year}
          </span>
        </div>

        {project.scrollFlowTitle ? (
          <div className="mb-8">
            <ScrollFlowTextFX
              top={project.scrollFlowTitle.top}
              bottom={project.scrollFlowTitle.bottom}
              accentColor={project.accentColor}
            />
          </div>
        ) : (
          <h1
            className="mb-8 font-russo text-[3rem] font-medium tracking-tight leading-[0.95] text-white md:text-[4.5rem] lg:text-[6rem]"
          >
            {project.title}
            {project.titleAccent && (
              <>
                <br />
                <span className="font-russo">{project.titleAccent}</span>
              </>
            )}
          </h1>
        )}

        <div className="flex flex-wrap items-center gap-8 md:gap-12">
          {[
            { label: 'Role', value: project.role },
            { label: 'Core Competency', value: project.coreCompetency },
            { label: 'Client', value: project.client },
            { label: 'Deliverables', value: project.deliverables },
          ].map((meta) => (
            <div key={meta.label} className="max-w-[18rem]">
              <p className="mb-1 text-[10px] uppercase tracking-widest text-neutral-500">{meta.label}</p>
              <p className="text-[0.875rem] font-medium text-neutral-100">{meta.value}</p>
            </div>
          ))}
        </div>

        {/* Quick outcome stats — recruiter scanability */}
        {project.outcomeStats.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-6 md:gap-10">
            {project.outcomeStats.slice(0, 2).map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-1.5">
                <span className="text-[11px] text-neutral-400">{stat.prefix ?? ''}</span>
                <span
                  className="font-russo text-[1.25rem] font-medium tracking-tight md:text-[1.5rem]"
                  style={{ color: project.accentColor || '#f59e0b' }}
                >
                  {stat.value}
                </span>
                <span className="text-[11px] text-neutral-400">{stat.suffix ?? ''}</span>
                <span className="ml-1 text-[10px] uppercase tracking-widest text-neutral-500">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProblemBrief({ project }: { project: PortfolioProject }) {
  return (
    <section id="problem" className="px-6 md:px-10 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <Label>{project.philosophyLabel}</Label>
        </FadeIn>
        <FadeIn delay={100}>
          <AuroraTextReveal
            as="p"
            className="mb-8 font-russo text-[1.5rem] font-medium leading-snug md:text-[1.875rem] lg:text-[2.25rem]"
            fromColor={project.accentColor || '#f59e0b'}
            toColor={project.accentSecondaryColor || '#ea580c'}
          >
            {project.philosophyHeading}
          </AuroraTextReveal>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="max-w-none text-[1rem] leading-relaxed text-neutral-400 md:text-[1.125rem]">
            {project.philosophyBody}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Mobile Accordion PoW ─── */

function MobilePoWAccordion({ project }: { project: PortfolioProject }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [carouselMap, setCarouselMap] = useState<Record<number, number>>({});

  const getStepImages = (stepIndex: number) => {
    const step = project.proof[stepIndex];
    if (step?.images !== undefined) return step.images;
    const total = project.gallery.length;
    if (total === 0) return [];
    const perStep = 2;
    const start = (stepIndex * perStep) % total;
    return Array.from({ length: perStep }, (_, i) =>
      project.gallery[(start + i) % total]
    ).filter(Boolean);
  };

  const isVideo = (src: string) => /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(src);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleCarouselPrev = (stepIndex: number, imageCount: number) => {
    setCarouselMap((prev) => ({
      ...prev,
      [stepIndex]: (prev[stepIndex] || 0) === 0 ? imageCount - 1 : (prev[stepIndex] || 0) - 1,
    }));
  };

  const handleCarouselNext = (stepIndex: number, imageCount: number) => {
    setCarouselMap((prev) => ({
      ...prev,
      [stepIndex]: (prev[stepIndex] || 0) === imageCount - 1 ? 0 : (prev[stepIndex] || 0) + 1,
    }));
  };

  return (
    <section className="lg:hidden px-6 py-4 border-y border-neutral-900 bg-[#0a0a0a]" style={{ height: '100dvh', maxHeight: '100dvh' }}>
      <div className="h-full flex flex-col max-w-7xl mx-auto">
        <FadeIn>
          <Label>Proof of Work</Label>
        </FadeIn>
        <div className="flex-1 flex flex-col min-h-0 mt-3">
          {project.proof.map((step, index) => {
            const isOpen = openIndex === index;
            const images = getStepImages(index);
            const cIndex = carouselMap[index] || 0;
            const currentImage = images[cIndex];

            return (
              <div
                key={step.num}
                className={`flex flex-col min-h-0 transition-all duration-300 ${
                  index < project.proof.length - 1 ? 'border-b border-neutral-800/60' : ''
                }`}
                style={{
                  flex: isOpen ? '1 1 0%' : '0 0 auto',
                }}
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="w-full text-left flex items-center gap-3 py-2.5 flex-shrink-0"
                >
                  <span
                    className="font-russo text-[0.7rem] tracking-[0.18em] text-neutral-500 transition-colors"
                    style={{ color: isOpen ? (project.accentColor || '#eab308') : undefined }}
                  >
                    {step.num}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className="block font-russo text-[1.05rem] font-medium leading-snug text-neutral-100"
                      style={{ color: isOpen ? (project.accentColor || '#eab308') : undefined }}
                    >
                      {step.title}
                    </span>
                    <span className="block text-[0.78rem] leading-relaxed text-neutral-500 truncate">
                      {step.desc}
                    </span>
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-neutral-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* Accordion Content */}
                <div
                  className={`transition-all duration-300 ${isOpen ? 'overflow-y-auto' : 'overflow-hidden'}`}
                  style={{
                    maxHeight: isOpen ? 'calc(100dvh - 180px)' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="pb-3 space-y-3">
                    <p className="text-[0.875rem] leading-relaxed text-neutral-400">
                      {step.detail}
                    </p>
                    {step.link && (
                      <a
                        href={step.link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[0.84rem] font-medium transition-opacity hover:opacity-80"
                        style={{ color: project.accentColor || '#eab308' }}
                      >
                        {step.link.label}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                      </a>
                    )}

                    {/* Media Gallery */}
                    {currentImage && (
                      <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950">
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
                          {isVideo(currentImage.src) ? (
                            <VideoPlayer
                              src={currentImage.src}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <img
                              src={resolveAssetUrl(currentImage.src)}
                              alt={currentImage.alt}
                              className="h-full w-full object-contain"
                            />
                          )}
                        </div>

                        {images.length > 1 && (
                          <div className="flex items-center justify-between px-3 py-2.5 border-t border-neutral-800">
                            <button
                              type="button"
                              onClick={() => handleCarouselPrev(index, images.length)}
                              className="flex size-8 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition-colors hover:border-neutral-500 hover:text-neutral-100"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>

                            <div className="flex items-center gap-1.5">
                              {images.map((_, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => setCarouselMap((prev) => ({ ...prev, [index]: i }))}
                                  className={`size-2 rounded-full transition-all duration-300 ${
                                    i === cIndex
                                      ? 'scale-110 bg-neutral-300'
                                      : 'bg-neutral-700 hover:bg-neutral-600'
                                  }`}
                                />
                              ))}
                            </div>

                            <button
                              type="button"
                              onClick={() => handleCarouselNext(index, images.length)}
                              className="flex size-8 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition-colors hover:border-neutral-500 hover:text-neutral-100"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DesktopPoW({ project }: { project: PortfolioProject }) {
  const [activeStep, setActiveStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('right');
  const sectionRef = useRef<HTMLElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const getStepImages = (stepIndex: number) => {
    const step = project.proof[stepIndex];
    if (step?.images !== undefined) return step.images;
    const total = project.gallery.length;
    if (total === 0) return [];
    const perStep = 2;
    const start = (stepIndex * perStep) % total;
    return Array.from({ length: perStep }, (_, i) =>
      project.gallery[(start + i) % total]
    ).filter(Boolean);
  };

  const handleNavigate = (dir: 'up' | 'down'): boolean => {
    if (!hasScrolled) setHasScrolled(true);

    if (dir === 'down' && activeStep < project.proof.length - 1) {
      setSlideDir('right');
      setPrevStep(activeStep);
      setActiveStep((s) => s + 1);
      setCarouselIndex(0);
      return true;
    }

    if (dir === 'up' && activeStep > 0) {
      setSlideDir('left');
      setPrevStep(activeStep);
      setActiveStep((s) => s - 1);
      setCarouselIndex(0);
      return true;
    }

    return false;
  };

  useScrollLock(sectionRef, handleNavigate);

  const isVideo = (src: string) => /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(src);

  const stepImages = getStepImages(activeStep);
  const currentImage = stepImages[carouselIndex] ?? stepImages[0];
  const activeLink = project.proof[activeStep]?.link;

  const handleStepClick = (index: number) => {
    if (index === activeStep) return;
    setPrevStep(activeStep);
    setSlideDir(index > activeStep ? 'right' : 'left');
    setActiveStep(index);
    setCarouselIndex(0);
  };

  const handlePrev = () => {
    setCarouselIndex((i) => (i === 0 ? stepImages.length - 1 : i - 1));
  };

  const handleNext = () => {
    setCarouselIndex((i) => (i === stepImages.length - 1 ? 0 : i + 1));
  };

  const stepIcons: React.ReactNode[] = [];

  const lineDelay = (index: number) => {
    const dist = Math.abs(index - Math.min(prevStep, activeStep));
    return dist * 80;
  };

  const iconDelay = (index: number) => {
    const dist = Math.abs(index - prevStep);
    return dist * 80;
  };

  return (
    <section ref={sectionRef} className="hidden lg:block relative px-6 md:px-10 py-4 md:py-6 border-y border-neutral-900 bg-[#0a0a0a] h-[100dvh] max-h-[100dvh] overflow-hidden">
      <style>{`
        @keyframes gallerySlideInRight {
          from { transform: translateX(60px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes gallerySlideInLeft {
          from { transform: translateX(-60px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
      <div className="max-w-7xl mx-auto h-full">
        <div className="grid grid-cols-12 gap-16 h-full">
          {/* Left: Steps Timeline */}
          <div className="col-span-5 h-full overflow-hidden">
            <FadeIn>
              <Label>Proof of Work</Label>
            </FadeIn>
            <div className="mt-4 space-y-0 relative">
              {project.proof.map((step, index) => {
                const isActive = index === activeStep;
                return (
                  <FadeIn key={step.num} delay={index * 100}>
                    <button
                      type="button"
                      onClick={() => handleStepClick(index)}
                      className={`w-full text-left group flex gap-4 py-3 ${
                        index < project.proof.length - 1 ? 'border-b border-neutral-800/60' : ''
                      }`}
                    >
                      {/* Icon + line */}
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-out ${
                            isActive
                              ? 'text-black scale-110'
                              : 'bg-neutral-800 text-neutral-400 group-hover:bg-neutral-700'
                          }`}
                          style={{
                            transitionDelay: `${iconDelay(index)}ms`,
                            backgroundColor: isActive ? (project.accentColor || '#eab308') : undefined,
                            boxShadow: isActive ? `0 0 20px ${project.accentColor || '#eab308'}59` : undefined,
                          }}
                        >
                          {stepIcons[index] ?? null}
                        </div>
                        {index < project.proof.length - 1 && (
                          <div className="relative w-px flex-1 min-h-[32px] bg-neutral-800 mt-2 overflow-hidden">
                            <div
                              className="absolute inset-0 origin-top transition-transform duration-500 ease-out"
                              style={{
                                backgroundColor: project.accentColor || '#eab308',
                                transform: activeStep > index ? 'scaleY(1)' : 'scaleY(0)',
                                transitionDelay: `${lineDelay(index)}ms`,
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Text */}
                      <div className="pb-2">
                        <h3
                          className={`mb-1 font-russo text-[1.25rem] font-semibold transition-colors duration-500 md:text-[1.5rem] ${
                            isActive ? 'text-neutral-100' : 'text-neutral-600 group-hover:text-neutral-500'
                          }`}
                          style={{ transitionDelay: `${iconDelay(index)}ms` }}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`mb-1.5 font-russo text-[0.875rem] font-medium transition-colors duration-500 md:text-[1rem] ${
                            isActive ? '' : 'text-neutral-600 group-hover:text-neutral-500'
                          }`}
                          style={{ color: isActive ? (project.accentColor || '#eab308') : undefined }}
                        >
                          {step.desc}
                        </p>
                        <p
                          className={`text-[0.875rem] leading-relaxed transition-colors duration-500 ${
                            isActive ? 'text-neutral-500' : 'text-neutral-700 group-hover:text-neutral-600'
                          }`}
                        >
                          {step.detail}
                        </p>
                        {step.link && (
                          <a
                            href={step.link.href}
                            target="_blank"
                            rel="noreferrer"
                            className={`mt-2 inline-flex items-center gap-1.5 text-[0.875rem] transition-colors ${
                              isActive ? '' : 'text-neutral-600 group-hover:text-neutral-500'
                            }`}
                            style={{ color: isActive ? (project.accentColor || '#eab308') : undefined }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {step.link.label}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                          </a>
                        )}
                      </div>
                    </button>
                  </FadeIn>
                );
              })}
            </div>
          </div>

          {/* Right: Media Viewer */}
          <div className="col-span-7 flex min-h-0 max-h-[calc(100dvh-3rem)] flex-col justify-center h-full">
            <FadeIn delay={150} className="flex h-full min-h-0 w-full max-h-[calc(100dvh-3rem)] flex-col justify-center">
              {stepImages.length > 0 && currentImage && (
                <div className="flex h-full min-h-0 w-full max-h-[calc(100dvh-3rem)] flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
                  <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-neutral-950">
                    <div
                      key={`${activeStep}-${carouselIndex}`}
                      className="flex h-full max-h-full w-full items-center justify-center"
                      style={{
                        animation: slideDir === 'right'
                          ? 'gallerySlideInRight 0.55s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                          : 'gallerySlideInLeft 0.55s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                      }}
                    >
                      {activeLink ? (
                        <a
                          href={activeLink.href}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-full max-h-full w-full items-center justify-center"
                        >
                          {isVideo(currentImage.src) ? (
                            <VideoPlayer
                              src={currentImage.src}
                              className="h-full max-h-full w-full max-w-full object-contain"
                            />
                          ) : (
                            <img
                              src={resolveAssetUrl(currentImage.src)}
                              alt={currentImage.alt}
                              className="h-full max-h-full w-full max-w-full object-contain"
                            />
                          )}
                        </a>
                      ) : (
                        isVideo(currentImage.src) ? (
                          <VideoPlayer
                            src={currentImage.src}
                            className="h-full max-h-full w-full max-w-full object-contain"
                          />
                        ) : (
                          <img
                            src={resolveAssetUrl(currentImage.src)}
                            alt={currentImage.alt}
                            className="h-full max-h-full w-full max-w-full object-contain"
                          />
                        )
                      )}
                    </div>
                  </div>

                  {stepImages.length > 1 && (
                    <div className="flex items-center justify-between px-5 py-4 border-t border-neutral-800 flex-shrink-0">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-neutral-100 hover:border-neutral-500 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                      </button>

                      <div className="flex items-center gap-2">
                        {stepImages.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setCarouselIndex(i)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                              i === carouselIndex
                                ? 'bg-neutral-300 scale-110'
                                : 'bg-neutral-700 hover:bg-neutral-600'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-neutral-100 hover:border-neutral-500 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 ${
          hasScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <span className="text-[10px] uppercase tracking-widest text-neutral-500">Scroll to explore</span>
        <svg
          className="animate-bounce text-neutral-500"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

function ExecutionProof({ project }: { project: PortfolioProject }) {
  return (
    <div id="execution">
      <MobilePoWAccordion project={project} />
      <DesktopPoW project={project} />
    </div>
  );
}

function StrategicMove({ project }: { project: PortfolioProject }) {
  return (
    <section id="strategic" className="px-6 md:px-10 py-24 md:py-40">
      <div className="max-w-5xl mx-auto text-center">
        <FadeIn>
          <Label>Strategic Move</Label>
        </FadeIn>
        <FadeIn delay={150}>
          <AuroraTextReveal
            as="h2"
            className="font-russo text-[1.875rem] font-normal leading-tight md:text-[3rem] lg:text-[3.75rem]"
            fromColor={project.accentColor || '#f59e0b'}
            toColor={project.accentSecondaryColor || '#ea580c'}
          >
            &ldquo;{project.visionQuote}&rdquo;
          </AuroraTextReveal>
        </FadeIn>
      </div>
    </section>
  );
}

function AnimatedStat({
  prefix = '',
  value,
  suffix = '',
  label,
  accentColor,
  delay = 0,
}: {
  prefix?: string;
  value: string;
  suffix?: string;
  label: string;
  accentColor?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView(0.3);
  const [display, setDisplay] = useState('0');
  const numericValue = parseFloat(value);
  const hasDecimal = value.includes('.');
  const isNumeric = !isNaN(numericValue);

  useEffect(() => {
    if (!inView || !isNumeric) {
      if (!isNumeric) setDisplay(value);
      return;
    }
    const duration = 2000;
    const startTime = performance.now();
    const startVal = 0;
    const endVal = numericValue;

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = startVal + (endVal - startVal) * eased;
      if (hasDecimal) {
        setDisplay(current.toFixed(1));
      } else {
        setDisplay(Math.round(current).toString());
      }
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [inView, numericValue, hasDecimal, isNumeric, value, delay]);

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-russo text-[2.5rem] font-medium tracking-tight text-white md:text-[3.5rem] lg:text-[4rem] transition-all duration-700"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: `${delay}ms`,
        }}
      >
        <span className="text-neutral-400">{prefix}</span>
        <span style={{ color: accentColor || '#f59e0b' }}>{display}</span>
        <span className="text-neutral-400">{suffix}</span>
      </div>
      <p
        className="mt-2 text-[0.75rem] uppercase tracking-widest text-neutral-500 md:text-[0.8125rem] transition-all duration-700"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(12px)',
          transitionDelay: `${delay + 100}ms`,
        }}
      >
        {label}
      </p>
    </div>
  );
}

const OXYTAP_CHECKLIST = [
  'Brand, voice and website established',
  'Event and campaign assets shipped',
  'Product education layer created',
  'Support portal, warranty and servicing flows structured',
  'International customer support pathway built',
  'Affiliate programme designed from comp plan to dashboard logic',
];

function useChecklistInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function CheckIcon({ visible }: { visible: boolean }) {
  return (
    <span
      className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-full border transition-all duration-500 ease-out"
      style={{
        borderColor: visible ? '#67e8f9' : 'rgba(82,82,82,0.5)',
        backgroundColor: visible ? 'rgba(103,232,249,0.12)' : 'transparent',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.6)',
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-500 ease-out"
        style={{
          color: '#67e8f9',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.6)',
        }}
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

function ChecklistOutcome() {
  const { ref, inView } = useChecklistInView();
  const staggerMs = 150;

  return (
    <section id="outcome" className="px-6 md:px-10 py-24 md:py-32 border-t border-neutral-900">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(28px)',
          }}
        >
          <p className="portfolio-template-mono mb-10 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
            Infrastructure Built
          </p>
        </div>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5 max-w-4xl">
          {OXYTAP_CHECKLIST.map((item, i) => {
            const visible = inView;
            const delay = i * staggerMs;
            return (
              <div
                key={item}
                className="flex items-start gap-4 transition-all duration-500 ease-out"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(8px)',
                  transitionDelay: `${delay}ms`,
                }}
              >
                <CheckIcon visible={visible} />
                <span
                  className="text-[0.9375rem] leading-relaxed text-neutral-300 md:text-[1rem] transition-all duration-500 ease-out"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(8px)',
                    transitionDelay: `${delay + 40}ms`,
                  }}
                >
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Outcome({ project }: { project: PortfolioProject }) {
  if (project.slug === 'oxytap') {
    return <ChecklistOutcome />;
  }

  return (
    <section id="outcome" className="px-6 md:px-10 py-24 md:py-32 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <Label>Outcome</Label>
        </FadeIn>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {project.outcomeStats.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              prefix={stat.prefix}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              accentColor={project.accentColor}
              delay={i * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const ALL_PORTFOLIO_LINKS = [
  {
    slug: 'toto',
    name: 'TOTO',
    accent: '#washnotwipe',
    href: '/toto-portfolio.html',
    year: '2018 - 2021',
    accentColor: '#3b82f6',
  },
  {
    slug: 'nft11',
    name: 'NFT11',
    accent: '0-to-1 Web3 Launch',
    href: '/nft11-portfolio.html',
    year: '2021 - 2023',
    accentColor: '#f59e0b',
  },
  {
    slug: 'oxytap',
    name: 'OxyTap',
    accent: 'Brand-to-System Build',
    href: '/oxytap-portfolio.html',
    year: '2023 - 2025',
    accentColor: '#67e8f9',
  },
];

function NextProject({ project }: { project: PortfolioProject }) {
  const otherProjects = ALL_PORTFOLIO_LINKS.filter((p) => p.slug !== project.slug)
    .sort((a, b) => parseInt(a.year.slice(0, 4)) - parseInt(b.year.slice(0, 4)));

  const earlier = otherProjects[0];
  const later = otherProjects[1];

  return (
    <footer id="next" className="px-6 md:px-10 py-16 md:py-24 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 mb-16">
            {/* Earlier project — left */}
            {earlier && (
              <div className="text-left">
                <p className="portfolio-template-mono mb-3 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                  Earlier
                </p>
                <a
                  href={earlier.href}
                  className="group inline-block font-russo text-[1.5rem] font-medium transition-colors md:text-[2.25rem] lg:text-[3rem]"
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = earlier.accentColor;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)';
                  }}
                >
                  <span className="inline-block mr-3 align-middle text-neutral-500 transition-colors group-hover:text-neutral-300">←</span>
                  {earlier.name}{' '}
                  <span className="font-russo">{earlier.accent}</span>
                </a>
              </div>
            )}

            {/* Later project — right */}
            {later && (
              <div className="text-left md:text-right">
                <p className="portfolio-template-mono mb-3 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                  Later
                </p>
                <a
                  href={later.href}
                  className="group inline-block font-russo text-[1.5rem] font-medium transition-colors md:text-[2.25rem] lg:text-[3rem]"
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = later.accentColor;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)';
                  }}
                >
                  {later.name}{' '}
                  <span className="font-russo">{later.accent}</span>
                  <span className="inline-block ml-3 align-middle text-neutral-500 transition-colors group-hover:text-neutral-300">→</span>
                </a>
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="flex flex-col gap-6 mb-12 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-6">
              {project.socials
                .filter((s) => !s.href.includes('instagram.com') && !s.href.includes('twitter.com') && !s.href.includes('x.com'))
                .map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.external ? '_blank' : undefined}
                    rel={social.external ? 'noreferrer' : undefined}
                    className="text-[0.75rem] font-medium text-neutral-400 transition-colors hover:text-neutral-100"
                  >
                    {social.label}
                  </a>
                ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="flex flex-col gap-4 text-[0.75rem] text-neutral-600 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} LEAVEEVERYTHINGTOCHANCE. All rights reserved.</p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}

/* ─── Page ─── */

function extractProjectAssets(project: PortfolioProject): string[] {
  const assets = new Set<string>();

  if (project.heroVideo) assets.add(project.heroVideo);

  project.gallery.forEach((item) => assets.add(item.src));

  project.proof.forEach((step) => {
    step.images?.forEach((img) => assets.add(img.src));
  });

  return Array.from(assets).map(resolveAssetUrl);
}

export default function PortfolioTemplate({ project, children }: { project: PortfolioProject; children?: ReactNode }) {
  const [ready, setReady] = useState(false);
  const assets = useMemo(() => extractProjectAssets(project), [project]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.overflow = 'auto';
    return () => {
      document.documentElement.style.scrollBehavior = '';
      document.body.style.overflow = '';
    };
  }, []);

  if (!ready) {
    return (
      <div className="portfolio-template-shell min-h-screen bg-[#0a0a0a]">
        <Preloader assets={assets} onComplete={() => setReady(true)} />
      </div>
    );
  }

  return (
    <main className="portfolio-template-shell min-h-screen bg-[#0a0a0a]">
      <Nav />
      <Hero project={project} />
      <SectionTimeline />
      <ProblemBrief project={project} />
      <StrategicMove project={project} />
      <ExecutionProof project={project} />
      <Outcome project={project} />
      {children}
      <NextProject project={project} />
    </main>
  );
}
