import { useEffect, useRef, useState } from 'react';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, revealed };
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, revealed } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
      <a href="/" className="text-sm font-medium tracking-tight text-neutral-100 hover:opacity-70 transition-opacity">
        MORAE<span className="align-super text-[10px] ml-0.5">®</span>
      </a>
      <div className="flex items-center gap-6 md:gap-8">
        <a href="#overview" className="hidden md:block text-xs font-medium tracking-wide text-neutral-400 hover:text-neutral-100 transition-colors">
          Overview
        </a>
        <a href="#gallery" className="hidden md:block text-xs font-medium tracking-wide text-neutral-400 hover:text-neutral-100 transition-colors">
          Gallery
        </a>
        <a href="#approach" className="hidden md:block text-xs font-medium tracking-wide text-neutral-400 hover:text-neutral-100 transition-colors">
          Approach
        </a>
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

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-10 md:pb-16 pt-32 px-6 md:px-10">
      <div className="absolute inset-0 z-0">
        <img
          src="/portfolio/hero.jpg"
          alt="Project hero"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <Reveal delay={0}>
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-widest text-neutral-300 border border-neutral-700 rounded-full">
              Case Study
            </span>
            <span className="text-[10px] uppercase tracking-widest text-neutral-500">2026</span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.95] text-white mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Sonic
            <br />
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>Identity</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="max-w-xl text-base md:text-lg text-neutral-300 leading-relaxed mb-10">
            A complete brand and digital experience for a single-product audio company. Designed to eliminate distraction and center the listener.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Client</p>
              <p className="text-sm font-medium text-neutral-100">MORAE Audio</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Role</p>
              <p className="text-sm font-medium text-neutral-100">Design & Development</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Deliverables</p>
              <p className="text-sm font-medium text-neutral-100">Web, 3D, Motion</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Overview() {
  return (
    <section id="overview" className="px-6 md:px-10 py-24 md:py-36">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-4">
          <Reveal>
            <p
              className="text-xs uppercase tracking-widest text-neutral-500 mb-4"
              style={{ fontFamily: "'Fragment Mono', monospace" }}
            >
              Philosophy
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <Reveal delay={100}>
            <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug text-neutral-100 mb-8">
              At MORAE, we don’t follow trends. We study the subtle patterns of sound and the ways people interact with it.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-2xl">
              Our philosophy is simple: eliminate distractions, highlight essence. Every design decision is deliberate—nothing is accidental. The goal isn’t to impress, but to allow clarity, focus, and awareness to emerge naturally.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const stats = [
  {
    num: '01',
    title: '40 Hours',
    desc: 'Battery Endurance',
    detail: 'Engineered for long listening sessions without interruptions.',
  },
  {
    num: '02',
    title: '32%',
    desc: 'Enhanced Noise Reduction',
    detail: 'Advanced ANC algorithms delivering noticeably deeper isolation.',
  },
  {
    num: '03',
    title: '0.08s',
    desc: 'Instant Response Time',
    detail: 'Ultra-fast touch and sensor feedback for seamless control.',
  },
  {
    num: '04',
    title: '+27%',
    desc: 'Improved Acoustic Clarity',
    detail: 'Refined drivers and adaptive tuning for a cleaner, more balanced sound.',
  },
];

function Stats() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-24 border-y border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.num} delay={i * 100}>
              <div className="group">
                <p
                  className="text-sm text-neutral-600 mb-6"
                  style={{ fontFamily: "'Doto', sans-serif" }}
                >
                  {s.num}
                </p>
                <h3 className="text-2xl md:text-3xl font-medium text-neutral-100 mb-2">{s.title}</h3>
                <p className="text-sm font-medium text-neutral-300 mb-3">{s.desc}</p>
                <p className="text-sm text-neutral-500 leading-relaxed">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section className="px-6 md:px-10 py-24 md:py-40">
      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <p
            className="text-xs uppercase tracking-widest text-neutral-500 mb-8"
            style={{ fontFamily: "'Fragment Mono', monospace" }}
          >
            Vision
          </p>
        </Reveal>
        <Reveal delay={150}>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-normal leading-tight text-neutral-100"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            “In a world full of distraction, we design for those who notice. MORAE is about clarity, detail, and pure listening—tools for focus, not show.”
          </h2>
        </Reveal>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="px-6 md:px-10 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        <Reveal>
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/portfolio/product1.png"
              alt="Product detail"
              className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700"
            />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-2xl h-full">
              <img
                src="/portfolio/lifestyle.jpg"
                alt="Lifestyle"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="overflow-hidden rounded-2xl h-full">
              <img
                src="/portfolio/product2.png"
                alt="Product angle"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/portfolio/detail.png"
              alt="Detail shot"
              className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="approach" className="px-6 md:px-10 py-24 md:py-36 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        <div>
          <Reveal>
            <p
              className="text-xs uppercase tracking-widest text-neutral-500 mb-6"
              style={{ fontFamily: "'Fragment Mono', monospace" }}
            >
              Craft
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h3 className="text-2xl md:text-3xl font-medium text-neutral-100 mb-6">
              Precision matters more than extravagance.
            </h3>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
              Every material is chosen for function first, form second. Metals are cool to the touch, plastics durable yet unassuming. Even the smallest joint is considered for both performance and longevity. Craft is not about beauty for attention—it is honesty in construction, visible to those who look closely.
            </p>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p
              className="text-xs uppercase tracking-widest text-neutral-500 mb-6"
              style={{ fontFamily: "'Fragment Mono', monospace" }}
            >
              Sound
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h3 className="text-2xl md:text-3xl font-medium text-neutral-100 mb-6">
              Sound isn’t just heard; it is experienced.
            </h3>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
              MORAE captures subtle layers and textures that often go unnoticed. We don’t aim for loudness or flashy bass; we seek authenticity. Every note, every frequency, every silence is intentional. Listening becomes a conscious act, a moment to focus on what really matters.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 md:px-10 py-16 md:py-24 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16">
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Next Project</p>
              <a
                href="/portfolio.html"
                className="text-3xl md:text-5xl font-medium text-neutral-100 hover:text-neutral-400 transition-colors"
              >
                Stellar <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>Motion</span>
                <span className="inline-block ml-3 align-middle">→</span>
              </a>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-xs font-medium text-neutral-400 hover:text-neutral-100 transition-colors">
                Instagram
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-xs font-medium text-neutral-400 hover:text-neutral-100 transition-colors">
                Twitter
              </a>
              <a href="mailto:hello@morae.audio" className="text-xs font-medium text-neutral-400 hover:text-neutral-100 transition-colors">
                Email
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-neutral-600">
            <p>
              © {new Date().getFullYear()} MORAE®. All rights reserved.
            </p>
            <p>
              Template replicated for portfolio showcase.
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

export default function PortfolioWork() {
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
