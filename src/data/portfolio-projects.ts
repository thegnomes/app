﻿﻿﻿﻿export interface PortfolioProject {
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
  proof: { num: string; title: string; desc: string; detail: string; images?: { src: string; alt: string }[]; link?: { href: string; label: string } }[];
  heroVideo?: string;
  visionLabel: string;
  visionQuote: string;
  gallery: { src: string; alt: string; layout: 'full' | 'half'; speed?: number }[];
  approachLabel: string;
  approachItems: { label: string; heading: string; body: string }[];
  nextProject: { name: string; accent: string; href: string };
  socials: { label: string; href: string; external?: boolean }[];
  accentColor?: string;
  accentSecondaryColor?: string;
  scrollFlowTitle?: { top: string; bottom: string };
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
  proof: [
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
  title: 'TOTO',
  titleAccent: '#washnotwipe',
  tag: 'Creative Direction',
  year: '2024',
  description:
    'Developed a platform idea that could travel across channels while keeping the message, visual identity, and campaign logic coherent.',
  client: 'TOTO via Onezine',
  role: 'Creative Direction',
  deliverables: 'Platform idea, KV, OOH, social, influencer, V2, Home Tour',
  philosophyLabel: 'Overview',
  philosophyHeading:
    'This project was not about creating a single campaign asset. It was about building a central idea strong enough to hold across multiple touchpoints without losing clarity.',
  philosophyBody:
    'The work centred on developing a platform spine that could carry the message through key visuals, outdoor, social, influencer content, and later extensions. The result was a system that could scale, not just a one-off campaign expression.',
  accentColor: '#06b6d4',
  accentSecondaryColor: '#2dd4bf',
  heroVideo: '/portfolio/TOTO/wnw-toilet.mp4',
  proof: [
    {
      num: '01',
      title: '#washnotwipe',
      desc: 'Platform originated',
      detail: 'Developed the core idea and message spine that anchored the campaign across formats.',
      images: [
        { src: '/portfolio/TOTO/wnwv1.png', alt: 'Wash Not Wipe hero' },
        { src: '/portfolio/TOTO/feature-01.jpg', alt: 'Feature 01' },
        { src: '/portfolio/TOTO/feature-02.jpg', alt: 'Feature 02' },
        { src: '/portfolio/TOTO/feature-03.jpg', alt: 'Feature 03' },
      ],
    },
    {
      num: '02',
      title: 'Multi-channel',
      desc: 'Applied across major touchpoints',
      detail: 'Rolled out across KV, OOH, social, and influencer while maintaining recognisability.',
      images: [
        { src: '/portfolio/TOTO/wnw-toilet.mp4', alt: 'Toilet spot' },
        { src: '/portfolio/TOTO/wnw-kitchen.mp4', alt: 'Kitchen spot' },
        { src: '/portfolio/TOTO/wnw-laundry.mp4', alt: 'Laundry spot' },
      ],
    },
    {
      num: '03',
      title: 'V2 + Home Tour',
      desc: 'Extended beyond launch',
      detail: 'Built a campaign structure that could evolve into later phases instead of peaking once.',
      images: [
        { src: '/portfolio/TOTO/wnw2.mp4', alt: 'V2 campaign' },
        { src: '/portfolio/TOTO/wnw2-home-tour.mp4', alt: 'Home Tour' },
      ],
    },
    {
      num: '04',
      title: '~S$250k',
      desc: 'Marketing arm in year one',
      detail: "Helped build Onezine's marketing arm around the account to roughly S$250k in the first year.",
      images: [],
    },
  ],
  visionLabel: 'Vision',
  visionQuote:
    'A good campaign can land once. A strong platform can keep extending without losing its centre.',
  gallery: [
    // TODO: Hero + first full gallery image. Replace with strongest flagship visual from campaign launch.
    { src: '/portfolio/toto-hero-placeholder.svg', alt: '[Placeholder Image — TOTO master key visual for #washnotwipe]', layout: 'full', speed: 0.25 },
    // TODO: Show how the central idea translated into large-format media.
    { src: '/portfolio/toto-gallery-1.svg', alt: '[Placeholder Image — OOH execution]', layout: 'half', speed: 0.2 },
    // TODO: Show adaptation without losing campaign identity.
    { src: '/portfolio/toto-gallery-2.svg', alt: '[Placeholder Image — Social campaign rollout]', layout: 'half', speed: 0.35 },
    // TODO: Demonstrate the platform travelling across channels.
    { src: '/portfolio/toto-gallery-3.svg', alt: '[Placeholder Image — Influencer or digital extension]', layout: 'full' },
    // TODO: Should show how the idea evolved after launch. Replace with video if available.
    { src: '/portfolio/toto-gallery-4.svg', alt: '[Placeholder Video — V2 / Home Tour extension]', layout: 'full' },
  ],
  approachLabel: 'Process',
  approachItems: [
    {
      label: 'Platform',
      heading: 'The idea has to hold before the executions can travel.',
      body: 'The first job was to find an idea clear enough to anchor message, tone, and visuals. It needed to be direct enough to work in public-facing channels, while giving the wider campaign enough structure to remain recognisable as it expanded.',
    },
    {
      label: 'System',
      heading: 'Consistency matters more when more hands are involved.',
      body: 'A platform becomes more valuable when it can be reused without dilution. Part of the work was turning creative direction into reusable kits and templates so the campaign could scale while keeping its logic intact.',
    },
  ],
  nextProject: { name: 'OxyTap', accent: 'Ecosystem', href: '/oxytap-portfolio.html' },
  socials: [
    { label: 'Instagram', href: 'https://instagram.com', external: true },
    { label: 'Twitter', href: 'https://twitter.com', external: true },
    { label: 'Email', href: 'mailto:hello@onezine.co' },
  ],
};

export const nft11Project: PortfolioProject = {
  slug: 'nft11',
  title: 'NFT11',
  titleAccent: 'Universe Building',
  tag: 'Universe Building',
  year: '2023',
  description:
    'Built the rituals, programming, and community cadence that gave the project momentum and made participation feel continuous rather than episodic.',
  client: 'NFT11',
  role: 'Community Strategy / Narrative Programming',
  deliverables: 'Quests, AMAs, creator programme, newsletters, engagement systems',
  philosophyLabel: 'Overview',
  philosophyHeading:
    'At NFT11, the work was less about posting content and more about building a world people wanted to keep returning to.',
  philosophyBody:
    'That meant shaping the rhythm of participation through recurring formats, community programming, and narrative continuity. The goal was not to fill channels, but to create enough structure and momentum for people to feel involved in something active and unfolding.',
  heroVideo: '/portfolio/NFT11/final/nft11-trailer.mp4',
  scrollFlowTitle: { top: 'NFT11', bottom: 'Universe Building' },
  proof: [
    {
      num: '01',
      title: '~60k Community + US$1.5M Raise',
      desc: 'Built organically, funded rapidly',
      detail: 'Built and maintained an audience base through repeatable programming, then channelled that momentum into a rapid fundraising window.',
      images: [
        { src: '/portfolio/NFT11/final/presales.jpg', alt: 'Presales overview' },
        { src: '/portfolio/NFT11/final/presales02.jpg', alt: 'Presales detail' },
        { src: '/portfolio/NFT11/final/stats-01.jpg', alt: 'Stats snapshot 01' },
        { src: '/portfolio/NFT11/final/stats-02.jpg', alt: 'Stats snapshot 02' },
      ],
    },
    {
      num: '02',
      title: '150+',
      desc: 'Newsletters sent',
      detail: 'Used newsletters as an editorial backbone to maintain continuity and reinforce the project\u2019s internal rhythm.',
      images: [
        { src: '/portfolio/NFT11/final/newsletter01%20(1).jpg', alt: 'Newsletter issue 1' },
        { src: '/portfolio/NFT11/final/newsletter01%20(2).jpg', alt: 'Newsletter issue 2' },
        { src: '/portfolio/NFT11/final/newsletter01%20(3).jpg', alt: 'Newsletter issue 3' },
      ],
      link: { href: 'https://medium.com/@nfteleven', label: 'Read on Medium' },
    },
    {
      num: '03',
      title: '+200%',
      desc: 'Engagement during quest cycles',
      detail: 'Structured quest-based activity that materially increased participation when the system was active.',
      images: [
        { src: '/portfolio/NFT11/final/weekly_q01.png', alt: 'Weekly quest 1' },
        { src: '/portfolio/NFT11/final/weekly_q02.png', alt: 'Weekly quest 2' },
        { src: '/portfolio/NFT11/final/weekly_q03.png', alt: 'Weekly quest 3' },
      ],
    },
  ],
  visionLabel: 'Vision',
  visionQuote:
    'A strong community is not held together by noise. It is held together by rhythm, meaning, and the sense that something is always in motion.',
  gallery: [
    // TODO: Hero + first full gallery image. Replace with strongest visual that conveys scale, participation, or atmosphere.
    { src: '/portfolio/nft11-hero-placeholder.svg', alt: '[Placeholder Image — NFT11 community ecosystem / event energy / visual world-building key art]', layout: 'full', speed: 0.25 },
    // TODO: Show actual newsletter or communication artefact.
    { src: '/portfolio/nft11-gallery-1.svg', alt: '[Placeholder Image — Newsletter issue layout or editorial cadence sample]', layout: 'half', speed: 0.2 },
    // TODO: Should demonstrate how the ritual was structured.
    { src: '/portfolio/nft11-gallery-2.svg', alt: '[Placeholder Image — Quest mechanic / weekly participation prompt]', layout: 'half', speed: 0.35 },
    // TODO: Could be event screen, community post, or creator-facing asset.
    { src: '/portfolio/nft11-gallery-3.svg', alt: '[Placeholder Image or Video — AMA / creator programme touchpoint]', layout: 'full' },
    // TODO: Should support the idea of sustained participation.
    { src: '/portfolio/nft11-gallery-4.svg', alt: '[Placeholder Image — Community activity snapshot / ecosystem map / engagement proof visual]', layout: 'full' },
  ],
  approachLabel: 'Process',
  approachItems: [
    {
      label: 'Programming',
      heading: 'Build reasons to return, not just reasons to notice.',
      body: 'The foundation of the work was recurring participation. Quests, AMAs, creator activity, and newsletters were designed as recognisable formats that gave the community shape over time. Instead of isolated pushes, the system created return behaviour.',
    },
    {
      label: 'Momentum',
      heading: 'Energy only lasts when there is structure behind it.',
      body: 'Community activity can spike easily and fade just as fast. The work here focused on turning interest into a repeatable operating rhythm that could hold attention, encourage contribution, and support larger business goals without feeling mechanical.',
    },
  ],
  nextProject: { name: 'TOTO', accent: '#washnotwipe', href: '/toto-portfolio.html' },
  socials: [
    { label: 'Instagram', href: 'https://instagram.com', external: true },
    { label: 'Twitter', href: 'https://twitter.com', external: true },
    { label: 'Email', href: 'mailto:hello@nft11.co' },
  ],
};

export const oxytapProject: PortfolioProject = {
  slug: 'oxytap',
  title: 'OxyTap',
  titleAccent: 'Ecosystem',
  tag: 'Prototype-to-Ship',
  year: '2024',
  description:
    'Turned fragmented business needs into connected digital systems across brand, support, affiliate operations, and future automation planning.',
  client: 'OxyTap',
  role: 'Systems Design / Product Thinking / Build',
  deliverables: 'Corporate site, support infrastructure, knowledge base, warranty flow, Botpress planning, affiliate system',
  philosophyLabel: 'Overview',
  philosophyHeading:
    'This work extended beyond a single product or interface.',
  philosophyBody:
    'Across OxyTap, the challenge was to translate a growing set of business needs into working digital systems — from the public-facing brand site, to the support and warranty infrastructure, to affiliate operations, and future conversational support planning.\n\nMy role was to turn these moving parts into something more coherent: shaping the user-facing experience, defining system logic, and building the structures needed for the brand to operate more clearly across multiple touchpoints.',
  proof: [
    {
      num: '01',
      title: 'Corporate site',
      desc: 'Brand presence and landing experience',
      detail: 'Built the public-facing digital layer for oxytap.com, including branded landing experience and marketing collateral.',
      images: [
        { src: '/portfolio/oxytap/oxytap-corporate-hero-placeholder.svg', alt: '[Placeholder Image — OxyTap corporate landing page hero section]' },
        { src: '/portfolio/oxytap/oxytap-brand-collateral-placeholder.svg', alt: '[Placeholder Image — OxyTap marketing collateral or campaign visual]' },
        { src: '/portfolio/oxytap/oxytap-site-sections-placeholder.svg', alt: '[Placeholder Image — OxyTap corporate site section layout]' },
      ],
    },
    {
      num: '02',
      title: 'Support live',
      desc: 'Knowledge base and warranty infrastructure',
      detail: 'Built support.oxytap.com as a structured support environment with articles, guidance, and warranty pathways.',
      images: [
        { src: '/portfolio/oxytap/oxytap-support-home-placeholder.svg', alt: '[Placeholder Image — support.oxytap.com homepage or support hub]' },
        { src: '/portfolio/oxytap/oxytap-knowledgebase-placeholder.svg', alt: '[Placeholder Image — knowledge base article listing or support content structure]' },
        { src: '/portfolio/oxytap/oxytap-warranty-placeholder.svg', alt: '[Placeholder Image — warranty registration or warranty support flow]' },
      ],
    },
    {
      num: '03',
      title: 'OxyBot planned',
      desc: 'Support automation architecture',
      detail: 'Planned and designed OxyBot flows in Botpress as part of the wider support ecosystem, though implementation was not fully completed.',
      images: [
        { src: '/portfolio/oxytap/oxytap-botpress-flow-placeholder.svg', alt: '[Placeholder Image — Botpress workflow planning for OxyBot]' },
        { src: '/portfolio/oxytap/oxytap-bot-logic-placeholder.svg', alt: '[Placeholder Image — support automation logic or onboarding flow map]' },
        { src: '/portfolio/oxytap/oxytap-support-journey-placeholder.svg', alt: '[Placeholder Image — support journey mapping or conversational support design]' },
      ],
    },
    {
      num: '04',
      title: 'Affiliate implemented',
      desc: 'Payout logic to runnable system',
      detail: 'Designed the payout structure and carried OxyAffiliate through to a working affiliate system.',
      images: [
        { src: '/portfolio/oxytap/oxytap-affiliate-dashboard-placeholder.svg', alt: '[Placeholder Image — OxyAffiliate dashboard or user-facing interface]' },
        { src: '/portfolio/oxytap/oxytap-payout-logic-placeholder.svg', alt: '[Placeholder Image — affiliate payout structure or commission logic diagram]' },
        { src: '/portfolio/oxytap/oxytap-affiliate-system-placeholder.svg', alt: '[Placeholder Image — implemented affiliate system or architecture overview]' },
      ],
    },
  ],
  visionLabel: 'Vision',
  visionQuote:
    'Digital work becomes valuable when separate functions begin to operate like one system.',
  gallery: [
    // TODO: Hero + first full gallery image. Replace with strongest overall visual representing brand, support, and systems together.
    { src: '/portfolio/oxytap/oxytap-ecosystem-hero-placeholder.svg', alt: '[Placeholder Image — OxyTap ecosystem overview or strongest flagship brand/system visual]', layout: 'full', speed: 0.25 },
    // TODO: Replace with landing page, branding, or corporate presentation screenshot.
    { src: '/portfolio/oxytap/oxytap-corporate-gallery-placeholder.svg', alt: '[Placeholder Image — oxytap.com landing page or branded corporate presentation]', layout: 'half', speed: 0.2 },
    // TODO: Replace with support site, KB, or warranty interface screenshot.
    { src: '/portfolio/oxytap/oxytap-support-gallery-placeholder.svg', alt: '[Placeholder Image — support site / knowledge base / warranty interface]', layout: 'half', speed: 0.35 },
    // TODO: Replace with Botpress planning, affiliate implementation, or a combined systems collage.
    { src: '/portfolio/oxytap/oxytap-bot-affiliate-gallery-placeholder.svg', alt: '[Placeholder Image — OxyBot planning and OxyAffiliate implementation collage or representative visual]', layout: 'full' },
  ],
  approachLabel: 'Process',
  approachItems: [
    {
      label: 'Structure',
      heading: 'Turning separate needs into connected systems.',
      body: 'The work began with fragmented requirements across different parts of the business: public-facing brand presence, support infrastructure, affiliate mechanics, and future automation. The challenge was not just execution, but organising these needs into clearer systems that could support actual use.',
    },
    {
      label: 'Implementation',
      heading: 'From logic and content to live operational layers.',
      body: 'This included shaping the corporate site and marketing collateral, building support structures such as knowledge base and warranty flows, planning OxyBot in Botpress, and carrying OxyAffiliate from payout design through to full system implementation. The value was not in a single deliverable, but in how these parts began to work together.',
    },
  ],
  nextProject: { name: 'NFT11', accent: 'Universe Building', href: '/nft11-portfolio.html' },
  socials: [
    { label: 'Instagram', href: 'https://instagram.com', external: true },
    { label: 'Twitter', href: 'https://twitter.com', external: true },
    { label: 'Email', href: 'mailto:hello@oxytap.co' },
  ],
};
