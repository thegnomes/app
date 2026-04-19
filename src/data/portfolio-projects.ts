export interface PortfolioProject {
  slug: string;
  title: string;
  titleAccent: string;
  tag: string;
  year: string;
  description: string;
  client: string;
  role: string;
  deliverables: string;
  philosophyLabel: string;
  philosophyHeading: string;
  philosophyBody: string;
  stats: { num: string; title: string; desc: string; detail: string }[];
  visionLabel: string;
  visionQuote: string;
  gallery: { src: string; alt: string; layout: 'full' | 'half'; speed?: number }[];
  approachLabel: string;
  approachItems: { label: string; heading: string; body: string }[];
  nextProject: { name: string; accent: string; href: string };
  socials: { label: string; href: string; external?: boolean }[];
  accentColor?: string;
}

export const moraeProject: PortfolioProject = {
  slug: 'morae',
  title: 'Sonic',
  titleAccent: 'Identity',
  tag: 'Case Study',
  year: '2026',
  description:
    'A complete brand and digital experience for a single-product audio company. Designed to eliminate distraction and center the listener.',
  client: 'MORAE Audio',
  role: 'Design & Development',
  deliverables: 'Web, 3D, Motion',
  philosophyLabel: 'Philosophy',
  philosophyHeading:
    "At MORAE, we don't follow trends. We study the subtle patterns of sound and the ways people interact with it.",
  philosophyBody:
    'Our philosophy is simple: eliminate distractions, highlight essence. Every design decision is deliberate—nothing is accidental. The goal isn’t to impress, but to allow clarity, focus, and awareness to emerge naturally.',
  stats: [
    { num: '01', title: '40 Hours', desc: 'Battery Endurance', detail: 'Engineered for long listening sessions without interruptions.' },
    { num: '02', title: '32%', desc: 'Enhanced Noise Reduction', detail: 'Advanced ANC algorithms delivering noticeably deeper isolation.' },
    { num: '03', title: '0.08s', desc: 'Instant Response Time', detail: 'Ultra-fast touch and sensor feedback for seamless control.' },
    { num: '04', title: '+27%', desc: 'Improved Acoustic Clarity', detail: 'Refined drivers and adaptive tuning for a cleaner, more balanced sound.' },
  ],
  visionLabel: 'Vision',
  visionQuote:
    'In a world full of distraction, we design for those who notice. MORAE is about clarity, detail, and pure listening—tools for focus, not show.',
  gallery: [
    { src: '/portfolio/product1.png', alt: 'Product detail', layout: 'full', speed: 0.25 },
    { src: '/portfolio/lifestyle.jpg', alt: 'Lifestyle', layout: 'half', speed: 0.2 },
    { src: '/portfolio/product2.png', alt: 'Product angle', layout: 'half', speed: 0.35 },
    { src: '/portfolio/detail.png', alt: 'Detail shot', layout: 'full' },
  ],
  approachLabel: 'Approach',
  approachItems: [
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
  ],
  nextProject: { name: 'Stellar', accent: 'Motion', href: '/portfolio.html' },
  socials: [
    { label: 'Instagram', href: 'https://instagram.com', external: true },
    { label: 'Twitter', href: 'https://twitter.com', external: true },
    { label: 'Email', href: 'mailto:hello@morae.audio' },
  ],
};

export const totoProject: PortfolioProject = {
  slug: 'toto',
  title: 'Fluid',
  titleAccent: 'Systems',
  tag: 'Product Design',
  year: '2025',
  description:
    'An immersive Web3 hydration tracker that turns daily water intake into a living, breathing digital ecosystem. Playful precision meets utility.',
  client: 'Toto Labs',
  role: 'Product & Frontend',
  deliverables: 'App, Brand, Motion',
  philosophyLabel: 'Concept',
  philosophyHeading:
    'Toto believes ritual creates rhythm. We designed an interface that celebrates the quiet act of drinking water as a moment of presence.',
  philosophyBody:
    'Instead of gamification through competition, Toto rewards consistency through visual evolution. Your daily hydration becomes a living world—calm, personal, and entirely yours. Every drop matters, and the interface makes that felt.',
  stats: [
    { num: '01', title: '2.4M', desc: 'Active Sessions', detail: 'Monthly engaged users returning to log and reflect.' },
    { num: '02', title: '98%', desc: 'Retention Rate', detail: 'Users maintaining a 7-day streak within the first month.' },
    { num: '03', title: '0.4s', desc: 'Entry Time', detail: 'From lock-screen widget to logged drink.' },
    { num: '04', title: '+64%', desc: 'Daily Intake', detail: 'Average increase in hydration among active users.' },
  ],
  visionLabel: 'Intent',
  visionQuote:
    'Toto is not a reminder. It is a ritual. In a world of notifications, we built something that waits quietly—and rewards presence over urgency.',
  gallery: [
    { src: '/portfolio/hero.jpg', alt: 'Toto interface', layout: 'full', speed: 0.25 },
    { src: '/portfolio/lifestyle.jpg', alt: 'Daily ritual', layout: 'half', speed: 0.2 },
    { src: '/portfolio/feature.png', alt: 'Widget detail', layout: 'half', speed: 0.35 },
    { src: '/portfolio/detail.png', alt: 'Motion study', layout: 'full' },
  ],
  approachLabel: 'Process',
  approachItems: [
    {
      label: 'Behavior',
      heading: 'Habit is invisible until you name it.',
      body: 'We spent months studying when people actually drink water—not when they think they should. The result is an interface that meets users in the micro-moments: between meetings, after coffee, before sleep.',
    },
    {
      label: 'Motion',
      heading: 'Animation as feedback, not decoration.',
      body: 'Every interaction in Toto produces a visual ripple. These are not cosmetic flourishes; they are confirmations of action. The liquid physics engine was tuned to feel viscous, responsive, and satisfying.',
    },
  ],
  nextProject: { name: 'NFT11', accent: 'Gallery', href: '/nft11-portfolio.html' },
  socials: [
    { label: 'Instagram', href: 'https://instagram.com', external: true },
    { label: 'Twitter', href: 'https://twitter.com', external: true },
    { label: 'Email', href: 'mailto:hello@toto.io' },
  ],
};

export const nft11Project: PortfolioProject = {
  slug: 'nft11',
  title: 'Digital',
  titleAccent: 'Curators',
  tag: 'Platform',
  year: '2025',
  description:
    'A minimal, high-performance NFT gallery platform designed for collectors who value curation over noise. Every pixel serves the art.',
  client: 'NFT11 Studio',
  role: 'Design & Engineering',
  deliverables: 'Platform, Identity, 3D',
  philosophyLabel: 'Ethos',
  philosophyHeading:
    'NFT11 treats digital scarcity as an opportunity for editorial clarity. We built a space where the work speaks first.',
  philosophyBody:
    'Most marketplaces overwhelm. NFT11 does the opposite: one artwork at a time, full-screen, with provenance and detail available on demand. The interface disappears so the collection can breathe.',
  stats: [
    { num: '01', title: '11K', desc: 'Works Listed', detail: 'Curated drops from 300+ international artists.' },
    { num: '02', title: '340ms', desc: 'Load Time', detail: 'Optimized image pipeline with instant previews.' },
    { num: '03', title: '0 Gas', desc: 'Lazy Minting', detail: 'Creators list free; buyers cover mint on purchase.' },
    { num: '04', title: '+89%', desc: 'Collector Return', detail: 'Average resale premium within 90 days.' },
  ],
  visionLabel: 'Perspective',
  visionQuote:
    'The future of collecting is not louder. It is quieter, slower, and more intentional. NFT11 is built for collectors who look before they buy.',
  gallery: [
    { src: '/portfolio/product2.png', alt: 'Gallery view', layout: 'full', speed: 0.25 },
    { src: '/portfolio/hero.jpg', alt: 'Artist profile', layout: 'half', speed: 0.2 },
    { src: '/portfolio/product1.png', alt: 'Detail view', layout: 'half', speed: 0.35 },
    { src: '/portfolio/lifestyle.jpg', alt: 'Exhibition', layout: 'full' },
  ],
  approachLabel: 'Method',
  approachItems: [
    {
      label: 'Curation',
      heading: 'Editorial restraint is a feature.',
      body: 'We designed the submission and review flow to feel like a gallery application, not a upload form. Artists provide context; curators provide placement. The result is a collection with narrative coherence.',
    },
    {
      label: 'Performance',
      heading: 'Speed is respect.',
      body: 'High-resolution artwork demands intelligent loading. We built a progressive texture pipeline that serves a pixel-perfect preview in under 100ms, then resolves full detail on interaction. No spinner culture.',
    },
  ],
  nextProject: { name: 'Oxytap', accent: 'Essence', href: '/oxytap-portfolio.html' },
  socials: [
    { label: 'Instagram', href: 'https://instagram.com', external: true },
    { label: 'Twitter', href: 'https://twitter.com', external: true },
    { label: 'Email', href: 'mailto:hello@nft11.studio' },
  ],
};

export const oxytapProject: PortfolioProject = {
  slug: 'oxytap',
  title: 'Pure',
  titleAccent: 'Oxygen',
  tag: 'Brand Experience',
  year: '2024',
  description:
    'A sensorial brand identity and e-commerce experience for a molecular water company. Science and serenity in equal measure.',
  client: 'Oxytap',
  role: 'Brand & Web',
  deliverables: 'Identity, Web, Packaging',
  philosophyLabel: 'Belief',
  philosophyHeading:
    'Oxytap believes water is the original technology. We gave that belief a visual language: precise, translucent, and alive.',
  philosophyBody:
    'The brand walks a narrow line between clinical credibility and emotional resonance. Every gradient references dissolved oxygen dispersion. Every type choice balances authority with softness. The result feels like drinking from a mountain stream in a laboratory.',
  stats: [
    { num: '01', title: '5×', desc: 'Oxygen Content', detail: 'Proprietary dissolution process vs standard tap.' },
    { num: '02', title: '12°C', desc: 'Optimal Chill', detail: 'Temperature at which dissolved oxygen peaks.' },
    { num: '03', title: '0.3s', desc: 'Pour Response', detail: 'Tap-to-flow with laminar stream control.' },
    { num: '04', title: '-40%', desc: 'Plastic Use', detail: 'Refillable glass system with local exchange.' },
  ],
  visionLabel: 'Promise',
  visionQuote:
    'Oxytap is not selling water. It is selling the moment after thirst—when the body says thank you, and the mind goes quiet.',
  gallery: [
    { src: '/portfolio/lifestyle.jpg', alt: 'Product hero', layout: 'full', speed: 0.25 },
    { src: '/portfolio/detail.png', alt: 'Pour detail', layout: 'half', speed: 0.2 },
    { src: '/portfolio/feature.png', alt: 'Packaging', layout: 'half', speed: 0.35 },
    { src: '/portfolio/hero.jpg', alt: 'Lifestyle', layout: 'full' },
  ],
  approachLabel: 'Practice',
  approachItems: [
    {
      label: 'Material',
      heading: 'Transparency as truth.',
      body: 'We designed the packaging to reveal rather than conceal. The glass vessel shows oxygen saturation in real time. The label is etched, not printed, because permanence matters more than disposability.',
    },
    {
      label: 'Digital',
      heading: 'The site is a sip, not a meal.',
      body: 'The e-commerce experience is intentionally brief: three screens from landing to checkout. No upsells, no popups. We optimized for decision confidence, not cart value. The numbers followed.',
    },
  ],
  nextProject: { name: 'Toto', accent: 'Systems', href: '/toto-portfolio.html' },
  socials: [
    { label: 'Instagram', href: 'https://instagram.com', external: true },
    { label: 'Twitter', href: 'https://twitter.com', external: true },
    { label: 'Email', href: 'mailto:hello@oxytap.co' },
  ],
};
