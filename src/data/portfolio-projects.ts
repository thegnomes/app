export interface PortfolioProject {
  slug: string;
  title: string;
  titleAccent: string;
  tag: string;
  year: string;
  coreCompetency: string;
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

export const totoProject: PortfolioProject = {
  slug: 'toto',
  title: 'TOTO',
  titleAccent: '#washnotwipe',
  tag: 'Creative Direction',
  year: '2018 - 2021',
  coreCompetency: 'Creative Direction',
  description:
    'Turned a sensitive hygiene category into a reusable, family-friendly campaign platform through tongue-in-cheek humour.',
  client: 'TOTO via Onezine',
  role: 'Creative Direction',
  deliverables: 'Campaign platform, KV, OOH, social, influencer, V2, Home Tour, creative kits',
  philosophyLabel: 'Brief',
  philosophyHeading:
    'The challenge was to build top-of-mind awareness without making toilet hygiene feel awkward, crude, or overly functional.',
  philosophyBody:
    'TOTO needed an evergreen campaign platform that could be reused across multiple channels while staying family-friendly. Toilet hygiene is a sensitive subject, and the campaign needed to be memorable without becoming crude, overly clinical, or cheesy. Instead of avoiding that sensitivity, the strategic angle was to use it carefully — neutralising discomfort through tongue-in-cheek humour while keeping the message clean, direct, and easy to recognise.',
  accentColor: '#3b82f6',
  accentSecondaryColor: '#60a5fa',
  heroVideo: '/portfolio/TOTO/wnw-toilet.mp4',
  scrollFlowTitle: { top: 'TOTO', bottom: '#washnotwipe' },
  proof: [
    {
      num: '01',
      title: '#washnotwipe',
      desc: 'A direct behavioural proposition',
      detail: 'I championed #washnotwipe as the campaign spine — simple enough to remember, clean enough to stay family-friendly, and flexible enough to translate across OOH, social, influencer content, and later campaign extensions.',
      images: [
        { src: '/portfolio/TOTO/wnwv1.png', alt: 'Wash Not Wipe hero' },
        { src: '/portfolio/TOTO/feature-01.jpg', alt: 'Feature 01' },
        { src: '/portfolio/TOTO/feature-02.jpg', alt: 'Feature 02' },
        { src: '/portfolio/TOTO/feature-03.jpg', alt: 'Feature 03' },
      ],
    },
    {
      num: '02',
      title: 'Built to Travel',
      desc: 'OOH, social, influencer, and campaign extensions',
      detail: 'The platform was designed for reusability. It gave the campaign a repeatable verbal hook and visual logic that could hold across different formats without losing the central behaviour.',
      images: [
        { src: '/portfolio/TOTO/wnw-toilet.mp4', alt: 'Toilet spot' },
        { src: '/portfolio/TOTO/wnw-kitchen.mp4', alt: 'Kitchen spot' },
        { src: '/portfolio/TOTO/wnw-laundry.mp4', alt: 'Laundry spot' },
      ],
    },
    {
      num: '03',
      title: 'Beyond Launch',
      desc: 'V2 and Home Tour adaptation',
      detail: 'The idea extended beyond a single launch phase. Because the campaign was built around a behaviour rather than one execution, it had enough flexibility to support future campaign expressions.',
      images: [
        { src: '/portfolio/TOTO/wnw2.mp4', alt: 'V2 campaign' },
        { src: '/portfolio/TOTO/wnw2-home-tour.mp4', alt: 'Home Tour' },
      ],
    },
    {
      num: '04',
      title: 'Agency-of-Choice Account',
      desc: 'Four-year account relationship',
      detail: 'The campaign platform contributed to TOTO becoming Onezine\u2019s agency-of-choice account for four years, with the account growing to roughly S$200k in the first year.',
      images: [],
    },
  ],
  visionLabel: 'Strategic Thesis',
  visionQuote:
    'A good campaign does not just land once. It gives the brand a line of behaviour people can remember, repeat, and recognise.',
  gallery: [
    { src: '/portfolio/TOTO/wnwv1.png', alt: '#washnotwipe master key visual', layout: 'full', speed: 0.25 },
    { src: '/portfolio/TOTO/feature-01.jpg', alt: 'OOH / campaign visual', layout: 'half', speed: 0.2 },
    { src: '/portfolio/TOTO/feature-02.jpg', alt: 'Social rollout visual', layout: 'half', speed: 0.35 },
    { src: '/portfolio/TOTO/feature-03.jpg', alt: 'Influencer / digital extension', layout: 'full' },
    { src: '/portfolio/TOTO/wnw2.mp4', alt: 'V2 / Home Tour extension', layout: 'full' },
  ],
  approachLabel: 'Process',
  approachItems: [
    {
      label: 'Thinking',
      heading: 'The sensitivity of the category became the hook.',
      body: 'Instead of hiding the awkwardness of toilet hygiene, the campaign used it carefully. Tongue-in-cheek humour allowed the message to stay direct and memorable without becoming crude.',
    },
    {
      label: 'Execution',
      heading: 'The line had to work beyond one asset.',
      body: '#washnotwipe was shaped as a campaign spine that could travel across key visuals, OOH, social, influencer content, and later extensions while keeping the central behaviour intact.',
    },
  ],
  nextProject: { name: 'OxyTap', accent: 'Ecosystem', href: '/oxytap-portfolio.html' },
  socials: [
    { label: 'Email', href: 'mailto:hello@onezine.co' },
  ],
};

export const nft11Project: PortfolioProject = {
  slug: 'nft11',
  title: 'NFT11',
  titleAccent: 'Universe Building',
  tag: 'Universe Building',
  year: '2021 - 2023',
  coreCompetency: 'Community Strategy',
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
  accentColor: '#f59e0b',
  accentSecondaryColor: '#fb923c',
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
      title: '150+ Newsletters Sent',
      desc: 'Editorial cadence that kept the community connected',
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
      title: '+200% Unique Engagement During Quest Cycles',
      desc: 'Quest programming that turned attention into participation',
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
    { label: 'Email', href: 'mailto:hello@nft11.co' },
  ],
};

export const oxytapProject: PortfolioProject = {
  slug: 'oxytap',
  title: 'OxyTap',
  titleAccent: 'Ecosystem',
  tag: 'Prototype-to-Ship',
  year: '2023 - 2025',
  coreCompetency: 'Systems Design',
  description:
    'Turned fragmented business needs into connected digital systems across brand, support, affiliate operations, and future automation planning.',
  client: 'OxyTap',
  role: 'Systems Design / Product Thinking / Build',
  deliverables: 'Corporate site, support infrastructure, knowledge base, warranty flow, Botpress planning, affiliate system',
  philosophyLabel: 'Overview',
  philosophyHeading:
    'This project was not about building a single website or tool. It was about turning a growing set of business needs into a connected digital system that could operate across multiple touchpoints.',
  philosophyBody:
    'Across OxyTap, the work centred on translating brand, support, warranty, affiliate, and future conversational support needs into clearer user experiences and system logic. The result was a more coherent digital structure for the brand — not a one-off interface, but an operating layer that could support the business as it grew.',
  accentColor: '#67e8f9',
  accentSecondaryColor: '#22d3ee',
  heroVideo: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/oxytap-hero.webm',
  scrollFlowTitle: { top: 'OxyTap', bottom: 'Ecosystem' },
  proof: [
    {
      num: '01',
      title: 'A Flexible Brand Language',
      desc: 'Campaigns, events, landing pages, and brand consistency.',
      detail: 'Built the public-facing digital layer for oxytap.com, including branded landing experience, marketing collateral, and campaign visuals that maintained consistency across touchpoints.',
      images: [
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/oxytap-hero.mp4', alt: 'OxyTap brand hero' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/biohack_fa_poster.jpg', alt: 'Biohack poster' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/merc.jpg', alt: 'Merc campaign visual' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/moutai_horizontal_CTA.png', alt: 'Moutai horizontal CTA' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/web_banner02.png', alt: 'Web banner' },
      ],
    },
    {
      num: '02',
      title: 'Product & Support Ecosystem',
      desc: 'Product education, support portal, warranty, knowledge base, and Telegram support flow.',
      detail: 'Built support.oxytap.com as a structured support environment with articles, guidance, warranty pathways, and integrated product education content.',
      images: [
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/supportOxytap.mp4', alt: 'OxyTap support video' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/oxy_energy_v4_fa_vo.webm', alt: 'OxyTap energy video' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/how_to_oxytap_fa_edits.webm', alt: 'How to OxyTap guide' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/drink_fresh_water_extended.mp4', alt: 'Drink fresh water campaign' },
      ],
    },
    {
      num: '03',
      title: 'Affiliate & Sales Infrastructure',
      desc: 'Referral system, rank logic, group sales, dashboard planning, and sales network operations.',
      detail: 'Designed the payout structure and carried OxyAffiliate through to a working affiliate system with rank logic, group sales tracking, and dashboard planning.',
      images: [],
    },
  ],
  visionLabel: 'Vision',
  visionQuote:
    'Digital work becomes valuable when separate functions begin to operate like one system.',
  gallery: [
    { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/oxytap-hero.mp4', alt: 'OxyTap ecosystem hero', layout: 'full', speed: 0.25 },
    { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/biohack_fa_poster.jpg', alt: 'Biohack poster', layout: 'half', speed: 0.2 },
    { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/merc.jpg', alt: 'Merc campaign visual', layout: 'half', speed: 0.35 },
    { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/oxy_energy_v4_fa_vo.webm', alt: 'OxyTap brand energy', layout: 'full' },
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
    { label: 'Email', href: 'mailto:hello@oxytap.co' },
  ],
};
