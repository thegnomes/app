import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
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
    <p className="portfolio-template-mono mb-4 text-[22px] uppercase tracking-[0.2em] text-neutral-500">
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
  // External URLs (Vercel Blob, CDN) are used directly.
  // Local paths still try both .webm and .mp4 variants.
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

      // Row 1 moves left
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

      // Row 2 moves right
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
      <div className="relative whitespace-nowrap text-[6rem] tracking-tight leading-[0.95] text-white md:text-[9rem] lg:text-[12rem]">
        <div ref={row1Ref} className="inline-flex will-change-transform">
          <span className="inline-block whitespace-nowrap pr-8">{textTop}</span>
          <span className="inline-block whitespace-nowrap pr-8">{textTop}</span>
        </div>
      </div>
      <div className="relative whitespace-nowrap text-[3rem] tracking-tight leading-none md:text-[4.5rem] lg:text-[6rem]" style={{ color: accentColor || 'rgba(255,255,255,0.9)' }}>
        <div ref={row2Ref} className="inline-flex will-change-transform">
          <span className="inline-block whitespace-nowrap pr-8">{textBottom}</span>
          <span className="inline-block whitespace-nowrap pr-8">{textBottom}</span>
        </div>
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
      <a href="/" className="text-[1.75rem] font-medium tracking-tight text-neutral-100 transition-opacity uppercase hover:opacity-70">
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
            className="hidden text-[1.5rem] font-medium tracking-wide text-neutral-400 transition-colors hover:text-neutral-100 md:block"
          >
            {item.label}
          </a>
        ))}
        <a
          href="/scene02"
          className="bg-neutral-100 px-4 py-2 text-[1.5rem] font-medium tracking-wide text-neutral-900 transition-colors hover:bg-neutral-300 rounded-full"
        >
          Back to site
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
          <span className="inline-block px-3 py-1 text-[20px] uppercase tracking-widest text-neutral-300 border border-neutral-700 rounded-full">
            {project.tag}
          </span>
          <span className="text-[20px] uppercase tracking-widest text-neutral-500">{project.year}</span>
        </div>

        {project.scrollFlowTitle ? (
          <div className="mb-8">
            <ScrollFlowTextFX top={project.scrollFlowTitle.top} bottom={project.role} accentColor={project.accentColor} />
          </div>
        ) : (
          <h1
            className="mb-8 font-russo text-[6rem] font-medium tracking-tight leading-[0.95] text-white md:text-[9rem] lg:text-[12rem]"
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
            { label: 'Client', value: project.client },
            { label: 'Deliverables', value: project.deliverables },
          ].map((meta) => (
            <div key={meta.label}>
              <p className="mb-1 text-[20px] uppercase tracking-widest text-neutral-500">{meta.label}</p>
              <p className="text-[1.75rem] font-medium text-neutral-100">{meta.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Overview({ project }: { project: PortfolioProject }) {
  return (
    <section id="overview" className="px-6 md:px-10 py-2 md:py-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        <div className="md:col-span-4">
          <FadeIn>
            <Label>{project.philosophyLabel}</Label>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="mt-6 space-y-2">
              <p className="font-russo text-[3.75rem] font-medium text-white md:text-[4.5rem]">{project.year}</p>
              <p className="font-russo text-[2.5rem] font-medium text-white md:text-[3rem]">{project.coreCompetency}</p>
            </div>
          </FadeIn>
        </div>
        <div className="md:col-span-8">
          <FadeIn delay={100}>
            <AuroraTextReveal
              as="p"
              className="mb-8 font-russo text-[3rem] font-medium leading-snug md:text-[3.75rem] lg:text-[4.5rem]"
              fromColor={project.accentColor || '#f59e0b'}
              toColor={project.accentSecondaryColor || '#ea580c'}
            >
              {project.philosophyHeading}
            </AuroraTextReveal>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="max-w-2xl text-[2rem] leading-relaxed text-neutral-400 md:text-[2.25rem]">{project.philosophyBody}</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function DualModeView({ project }: { project: PortfolioProject }) {
  const [activeStep, setActiveStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);
  // viewMode removed — always Slider
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

  const stepIcons = [
    <svg key="1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
    <svg key="2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
    <svg key="3" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
    <svg key="4" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  ];

  const lineDelay = (index: number) => {
    const dist = Math.abs(index - Math.min(prevStep, activeStep));
    return dist * 80;
  };

  const iconDelay = (index: number) => {
    const dist = Math.abs(index - prevStep);
    return dist * 80;
  };

  return (
    <section ref={sectionRef} className="relative px-6 md:px-10 py-4 md:py-6 border-y border-neutral-900 bg-[#0a0a0a] min-h-[100dvh] lg:h-[100dvh] lg:max-h-[100dvh] lg:overflow-hidden">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 h-full">
          {/* Left: Steps Timeline */}
          <div className="lg:col-span-5 h-full overflow-hidden">
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
                          {stepIcons[index] ?? stepIcons[0]}
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
                          className={`mb-1 font-russo text-[2.5rem] font-semibold transition-colors duration-500 md:text-[3rem] ${
                            isActive ? 'text-neutral-100' : 'text-neutral-600 group-hover:text-neutral-500'
                          }`}
                          style={{ transitionDelay: `${iconDelay(index)}ms` }}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`mb-1.5 font-russo text-[1.75rem] font-medium transition-colors duration-500 md:text-[2rem] ${
                            isActive ? '' : 'text-neutral-600 group-hover:text-neutral-500'
                          }`}
                          style={{ color: isActive ? (project.accentColor || '#eab308') : undefined }}
                        >
                          {step.desc}
                        </p>
                        <p
                          className={`text-[1.75rem] leading-relaxed transition-colors duration-500 ${
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
                            className={`mt-2 inline-flex items-center gap-1.5 text-[1.75rem] transition-colors ${
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
          <div className="lg:col-span-7 flex min-h-0 max-h-[calc(100dvh-2rem)] flex-col justify-center lg:h-full lg:max-h-[calc(100dvh-3rem)]">
            <FadeIn delay={150} className="flex h-[70dvh] min-h-0 w-full max-h-[calc(100dvh-2rem)] flex-col justify-center lg:h-full lg:max-h-[calc(100dvh-3rem)]">
              {/* Slider only */}
                {stepImages.length > 0 && currentImage && (
                  <div className="flex h-full min-h-0 w-full max-h-[calc(100dvh-2rem)] flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 lg:max-h-[calc(100dvh-3rem)]">
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
              {/* /Slider only */}
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
        <span className="text-[20px] uppercase tracking-widest text-neutral-500">Scroll to explore</span>
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

function Vision({ project }: { project: PortfolioProject }) {
  return (
    <section className="px-6 md:px-10 py-24 md:py-40">
      <div className="max-w-5xl mx-auto text-center">
        <FadeIn>
          <Label>{project.visionLabel}</Label>
        </FadeIn>
        <FadeIn delay={150}>
          <AuroraTextReveal
            as="h2"
            className="font-russo text-[3.75rem] font-normal leading-tight md:text-[6rem] lg:text-[7.5rem]"
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

function Process({ project }: { project: PortfolioProject }) {
  return (
    <section id="process" className="px-6 md:px-10 py-24 md:py-36 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {project.approachItems.map((item) => (
          <div key={item.label}>
            <FadeIn>
              <Label>{item.label}</Label>
            </FadeIn>
            <FadeIn delay={100}>
              <h3 className="mb-6 font-russo text-[3rem] font-medium text-neutral-100 md:text-[3.75rem]">{item.heading}</h3>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-[2rem] leading-relaxed text-neutral-400 md:text-[2.25rem]">{item.body}</p>
            </FadeIn>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer({ project }: { project: PortfolioProject }) {
  return (
    <footer className="px-6 md:px-10 py-16 md:py-24 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16">
            <div>
              <Label>Next Project</Label>
              <a
                href={project.nextProject.href}
                className="font-russo text-[3.75rem] font-medium text-neutral-100 transition-colors hover:text-neutral-400 md:text-[6rem]"
              >
                {project.nextProject.name}{' '}
                <span className="font-russo">
                  {project.nextProject.accent}
                </span>
                <span className="inline-block ml-3 align-middle">→</span>
              </a>
            </div>
            <div className="flex items-center gap-6">
              {project.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.external ? '_blank' : undefined}
                  rel={social.external ? 'noreferrer' : undefined}
                  className="text-[1.5rem] font-medium text-neutral-400 transition-colors hover:text-neutral-100"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="flex flex-col gap-4 text-[1.5rem] text-neutral-600 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} LEAVEEVERYTHINGTOCHANCE. All rights reserved.</p>
            <p>Template replicated for portfolio showcase.</p>
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
      <Overview project={project} />
      <DualModeView project={project} />
      <Vision project={project} />

      <Process project={project} />
      {children}
      <Footer project={project} />
    </main>
  );
}
