import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { PortfolioProject } from '@/data/portfolio-projects';

/* ─── Hooks ─── */

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = windowH;
      const end = -rect.height;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);
  return progress;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
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
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'h2' | 'p';
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
          backgroundImage: `linear-gradient(90deg, #f59e0b 0%, #ea580c ${progress * 100}%, #525252 ${progress * 100}%, #525252 100%)`,
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
    <p
      className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-4"
      style={{ fontFamily: "'Fragment Mono', monospace" }}
    >
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

function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 0.3,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(containerRef);
  const offset = (progress - 0.5) * speed * 100;

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover will-change-transform"
        style={{ transform: `translateY(${offset}px) scale(1.08)` }}
      />
    </div>
  );
}

function RevealImage({
  src,
  alt,
  className = '',
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover will-change-transform transition-transform ease-out"
        style={{
          transform: inView ? 'scale(1)' : 'scale(1.12)',
          opacity: inView ? 1 : 0,
          transitionDelay: `${delay}ms`,
          transitionDuration: '1200ms',
        }}
      />
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
      <a href="/" className="text-sm font-medium tracking-tight text-neutral-100 hover:opacity-70 transition-opacity">
        MORAE<span className="align-super text-[10px] ml-0.5">®</span>
      </a>
      <div className="flex items-center gap-6 md:gap-8">
        {['Overview', 'Process'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hidden md:block text-xs font-medium tracking-wide text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            {item}
          </a>
        ))}
        <a
          href="/"
          className="text-xs font-medium tracking-wide text-neutral-900 bg-neutral-100 px-4 py-2 rounded-full hover:bg-neutral-300 transition-colors"
        >
          Back to site
        </a>
      </div>
    </nav>
  );
}

function Hero({ project }: { project: PortfolioProject }) {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);
  const heroY = progress * 120;
  const contentY = progress * 60;
  const contentOp = 1 - progress * 1.5;
  const heroImage = project.gallery[0]?.src ?? '/portfolio/hero.jpg';

  return (
    <section ref={sectionRef} className="relative h-[120vh] flex flex-col justify-end pb-10 md:pb-16 pt-32 px-6 md:px-10 overflow-hidden">
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: `translateY(${heroY}px)` }}
      >
        <img src={heroImage} alt="Project hero" className="w-full h-full object-cover opacity-50 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]/20" />
      </div>

      <div
        className="relative z-10 max-w-7xl mx-auto w-full will-change-transform"
        style={{ transform: `translateY(${contentY}px)`, opacity: Math.max(0, contentOp) }}
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-widest text-neutral-300 border border-neutral-700 rounded-full">
            {project.tag}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-neutral-500">{project.year}</span>
        </div>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.95] text-white mb-8"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {project.title}
          {project.titleAccent && (
            <>
              <br />
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>{project.titleAccent}</span>
            </>
          )}
        </h1>

        <p className="max-w-xl text-base md:text-lg text-neutral-300 leading-relaxed mb-10">{project.description}</p>

        <div className="flex flex-wrap items-center gap-8 md:gap-12">
          {[
            { label: 'Client', value: project.client },
            { label: 'Role', value: project.role },
            { label: 'Deliverables', value: project.deliverables },
          ].map((meta) => (
            <div key={meta.label}>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">{meta.label}</p>
              <p className="text-sm font-medium text-neutral-100">{meta.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Overview({ project }: { project: PortfolioProject }) {
  return (
    <section id="overview" className="px-6 md:px-10 py-24 md:py-36">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-4">
          <FadeIn>
            <Label>{project.philosophyLabel}</Label>
          </FadeIn>
        </div>
        <div className="md:col-span-8">
          <FadeIn delay={100}>
            <AuroraTextReveal
              as="p"
              className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug mb-8"
            >
              {project.philosophyHeading}
            </AuroraTextReveal>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-2xl">{project.philosophyBody}</p>
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

  const getStepImages = (stepIndex: number) => {
    const total = project.gallery.length;
    if (total === 0) return [];
    const perStep = 2;
    const start = (stepIndex * perStep) % total;
    return Array.from({ length: perStep }, (_, i) =>
      project.gallery[(start + i) % total]
    ).filter(Boolean);
  };

  const stepImages = getStepImages(activeStep);
  const currentImage = stepImages[carouselIndex] ?? stepImages[0];

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
    <section className="px-6 md:px-10 py-16 md:py-24 border-y border-neutral-900 bg-[#0a0a0a]">
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
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: Steps Timeline */}
          <div className="lg:col-span-5">
            <FadeIn>
              <Label>Proof of Work</Label>
            </FadeIn>
            <div className="mt-8 space-y-0 relative">
              {project.proof.map((step, index) => {
                const isActive = index === activeStep;
                return (
                  <FadeIn key={step.num} delay={index * 100}>
                    <button
                      type="button"
                      onClick={() => handleStepClick(index)}
                      className={`w-full text-left group flex gap-4 py-5 ${
                        index < project.proof.length - 1 ? 'border-b border-neutral-800/60' : ''
                      }`}
                    >
                      {/* Icon + line */}
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-out ${
                            isActive
                              ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.35)] scale-110'
                              : 'bg-neutral-800 text-neutral-400 group-hover:bg-neutral-700'
                          }`}
                          style={{
                            transitionDelay: `${iconDelay(index)}ms`,
                          }}
                        >
                          {stepIcons[index] ?? stepIcons[0]}
                        </div>
                        {index < project.proof.length - 1 && (
                          <div className="relative w-px flex-1 min-h-[32px] bg-neutral-800 mt-2 overflow-hidden">
                            <div
                              className="absolute inset-0 bg-blue-600 origin-top transition-transform duration-500 ease-out"
                              style={{
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
                          className={`text-lg md:text-xl font-semibold mb-1 transition-colors duration-500 ${
                            isActive ? 'text-neutral-100' : 'text-neutral-300 group-hover:text-neutral-100'
                          }`}
                          style={{ transitionDelay: `${iconDelay(index)}ms` }}
                        >
                          {step.title}
                        </h3>
                        <p className="text-sm font-medium text-neutral-400 mb-1.5">
                          {step.desc}
                        </p>
                        <p className="text-sm text-neutral-500 leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    </button>
                  </FadeIn>
                );
              })}
            </div>
          </div>

          {/* Right: Media Viewer */}
          <div className="lg:col-span-7">
            <FadeIn delay={150}>
              {/* Slider only */}
                <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {currentImage && (
                      <div
                        key={`${activeStep}-${carouselIndex}`}
                        className="absolute inset-0"
                        style={{
                          animation: slideDir === 'right'
                            ? 'gallerySlideInRight 0.55s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                            : 'gallerySlideInLeft 0.55s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                        }}
                      >
                        <img
                          src={currentImage.src}
                          alt={currentImage.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between px-5 py-4 border-t border-neutral-800">
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
                </div>
              {/* /Slider only */}
            </FadeIn>
          </div>
        </div>
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
            className="text-3xl md:text-5xl lg:text-6xl font-normal leading-tight"
          >
            &ldquo;{project.visionQuote}&rdquo;
          </AuroraTextReveal>
        </FadeIn>
      </div>
    </section>
  );
}

/* Gallery removed — images now shown in DualModeView */
function _Gallery({ project }: { project: PortfolioProject }) {
  const halfImages = project.gallery.filter((g) => g.layout === 'half');
  const fullImages = project.gallery.filter((g) => g.layout === 'full');

  return (
    <section id="gallery" className="px-6 md:px-10 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {fullImages[0] && (
          <FadeIn>
            <ParallaxImage
              src={fullImages[0].src}
              alt={fullImages[0].alt}
              className="rounded-2xl aspect-[16/10]"
              speed={fullImages[0].speed ?? 0.25}
            />
          </FadeIn>
        )}

        {halfImages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {halfImages.map((img, i) => (
              <FadeIn key={img.src} delay={100 + i * 100}>
                <ParallaxImage
                  src={img.src}
                  alt={img.alt}
                  className="rounded-2xl aspect-[4/5]"
                  speed={img.speed ?? 0.2 + i * 0.15}
                />
              </FadeIn>
            ))}
          </div>
        )}

        {fullImages[1] && (
          <FadeIn delay={100}>
            <RevealImage src={fullImages[1].src} alt={fullImages[1].alt} className="rounded-2xl" />
          </FadeIn>
        )}

        {fullImages.slice(2).map((img, i) => (
          <FadeIn key={img.src} delay={200 + i * 100}>
            <RevealImage src={img.src} alt={img.alt} className="rounded-2xl" />
          </FadeIn>
        ))}
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
              <h3 className="text-2xl md:text-3xl font-medium text-neutral-100 mb-6">{item.heading}</h3>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-base md:text-lg text-neutral-400 leading-relaxed">{item.body}</p>
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
                className="text-3xl md:text-5xl font-medium text-neutral-100 hover:text-neutral-400 transition-colors"
              >
                {project.nextProject.name}{' '}
                <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>
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
                  className="text-xs font-medium text-neutral-400 hover:text-neutral-100 transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-neutral-600">
            <p>© {new Date().getFullYear()} MORAE®. All rights reserved.</p>
            <p>Template replicated for portfolio showcase.</p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}

/* ─── Page ─── */

export default function PortfolioTemplate({ project, children }: { project: PortfolioProject; children?: ReactNode }) {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.overflow = 'auto';
    return () => {
      document.documentElement.style.scrollBehavior = '';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
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
