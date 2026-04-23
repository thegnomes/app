import { useEffect, useRef, useState } from 'react';

/* ─── Hooks ─── */

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const p = rect.height > 0 ? Math.min(1, Math.max(0, -rect.top / rect.height)) : 0;
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
        style={{
          transform: `translateY(${offset}px) scale(1.08)`,
        }}
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
      <a href="/" className="text-sm font-medium tracking-tight text-neutral-100 hover:opacity-70 transition-opacity uppercase">
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
            className="hidden md:block text-xs font-medium tracking-wide text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            {item.label}
          </a>
        ))}
        <a
          href="/scene02"
          className="text-xs font-medium tracking-wide text-neutral-900 bg-neutral-100 px-4 py-2 rounded-full hover:bg-neutral-300 transition-colors"
        >
          Back to site
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);
  const heroY = progress * 120;
  const contentY = progress * 60;
  const contentOp = 1 - progress * 1.5;

  return (
    <section ref={sectionRef} className="relative flex flex-col justify-start pt-20 pb-6 px-6 md:px-10 overflow-hidden bg-[#0a0a0a]">
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: `translateY(${heroY}px)` }}
      >
        <img
          src="/portfolio/hero.jpg"
          alt="Project hero"
          className="w-full h-full object-cover opacity-50 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]/20" />
      </div>

      <div
        className="relative z-10 max-w-7xl mx-auto w-full will-change-transform"
        style={{ transform: `translateY(${contentY}px)`, opacity: Math.max(0, contentOp) }}
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-widest text-neutral-300 border border-neutral-700 rounded-full">
            Case Study
          </span>
          <span className="text-[10px] uppercase tracking-widest text-neutral-500">2026</span>
        </div>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.95] text-white mb-8"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Sonic
          <br />
          <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>Identity</span>
        </h1>

        <p className="max-w-xl text-base md:text-lg text-neutral-300 leading-relaxed mb-10">
          A complete brand and digital experience for a single-product audio company. Designed to eliminate distraction and center the listener.
        </p>

        <div className="flex flex-wrap items-center gap-8 md:gap-12">
          {[
            { label: 'Client', value: 'MORAE Audio' },
            { label: 'Role', value: 'Design & Development' },
            { label: 'Deliverables', value: 'Web, 3D, Motion' },
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

function Overview() {
  return (
    <section id="overview" className="px-6 md:px-10 py-8 md:py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        <div className="md:col-span-4">
          <FadeIn>
            <Label>Philosophy</Label>
          </FadeIn>
        </div>
        <div className="md:col-span-8">
          <FadeIn delay={100}>
            <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug text-neutral-100 mb-8">
              At MORAE, we don’t follow trends. We study the subtle patterns of sound and the ways people interact with it.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-2xl">
              Our philosophy is simple: eliminate distractions, highlight essence. Every design decision is deliberate—nothing is accidental. The goal isn’t to impress, but to allow clarity, focus, and awareness to emerge naturally.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { num: '01', title: '40 Hours', desc: 'Battery Endurance', detail: 'Engineered for long listening sessions without interruptions.' },
  { num: '02', title: '32%', desc: 'Enhanced Noise Reduction', detail: 'Advanced ANC algorithms delivering noticeably deeper isolation.' },
  { num: '03', title: '0.08s', desc: 'Instant Response Time', detail: 'Ultra-fast touch and sensor feedback for seamless control.' },
  { num: '04', title: '+27%', desc: 'Improved Acoustic Clarity', detail: 'Refined drivers and adaptive tuning for a cleaner, more balanced sound.' },
];

function Stats() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-24 border-y border-neutral-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
        {STATS.map((s, i) => (
          <FadeIn key={s.num} delay={i * 100}>
            <p className="text-sm text-neutral-600 mb-6" style={{ fontFamily: "'Doto', sans-serif" }}>
              {s.num}
            </p>
            <h3 className="text-2xl md:text-3xl font-medium text-neutral-100 mb-2">{s.title}</h3>
            <p className="text-sm font-medium text-neutral-300 mb-3">{s.desc}</p>
            <p className="text-sm text-neutral-500 leading-relaxed">{s.detail}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section className="px-6 md:px-10 py-24 md:py-40">
      <div className="max-w-5xl mx-auto text-center">
        <FadeIn>
          <Label>Vision</Label>
        </FadeIn>
        <FadeIn delay={150}>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-normal leading-tight text-neutral-100"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            “In a world full of distraction, we design for those who notice. MORAE is about clarity, detail, and pure listening—tools for focus, not show.”
          </h2>
        </FadeIn>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="px-6 md:px-10 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        <FadeIn>
          <ParallaxImage
            src="/portfolio/product1.png"
            alt="Product detail"
            className="rounded-2xl aspect-[16/10]"
            speed={0.25}
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <FadeIn delay={100}>
            <ParallaxImage
              src="/portfolio/lifestyle.jpg"
              alt="Lifestyle"
              className="rounded-2xl aspect-[4/5]"
              speed={0.2}
            />
          </FadeIn>
          <FadeIn delay={200}>
            <ParallaxImage
              src="/portfolio/product2.png"
              alt="Product angle"
              className="rounded-2xl aspect-[4/5]"
              speed={0.35}
            />
          </FadeIn>
        </div>

        <FadeIn delay={100}>
          <RevealImage src="/portfolio/detail.png" alt="Detail shot" className="rounded-2xl" />
        </FadeIn>
      </div>
    </section>
  );
}

function Approach() {
  const items = [
    {
      label: 'Craft',
      heading: 'Precision matters more than extravagance.',
      body: 'Every material is chosen for function first, form second. Metals are cool to the touch, plastics durable yet unassuming. Even the smallest joint is considered for both performance and longevity. Craft is not about beauty for attention—it is honesty in construction, visible to those who look closely.',
    },
    {
      label: 'Sound',
      heading: 'Sound isn’t just heard; it is experienced.',
      body: 'MORAE captures subtle layers and textures that often go unnoticed. We don’t aim for loudness or flashy bass; we seek authenticity. Every note, every frequency, every silence is intentional. Listening becomes a conscious act, a moment to focus on what really matters.',
    },
  ];

  return (
    <section id="approach" className="px-6 md:px-10 py-24 md:py-36 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {items.map((item) => (
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

function Footer() {
  return (
    <footer className="px-6 md:px-10 py-16 md:py-24 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16">
            <div>
              <Label>Next Project</Label>
              <a
                href="/portfolio.html"
                className="text-3xl md:text-5xl font-medium text-neutral-100 hover:text-neutral-400 transition-colors"
              >
                Stellar <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>Motion</span>
                <span className="inline-block ml-3 align-middle">→</span>
              </a>
            </div>
            <div className="flex items-center gap-6">
              {['Instagram', 'Twitter', 'Email'].map((social) => (
                <a
                  key={social}
                  href={social === 'Email' ? 'mailto:hello@morae.audio' : `https://${social.toLowerCase()}.com`}
                  target={social !== 'Email' ? '_blank' : undefined}
                  rel={social !== 'Email' ? 'noreferrer' : undefined}
                  className="text-xs font-medium text-neutral-400 hover:text-neutral-100 transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-neutral-600">
            <p>© {new Date().getFullYear()} LEAVEEVERYTHINGTOCHANCE. All rights reserved.</p>
            <p>Template replicated for portfolio showcase.</p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}

/* ─── Page ─── */

export default function PortfolioWork() {
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
      <Hero />
      <Overview />
      <Stats />
      <Vision />
      <Gallery />
      <Approach />
      <Footer />
    </main>
  );
}
