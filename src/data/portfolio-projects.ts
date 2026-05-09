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
  outcomeStats: { value: string; prefix?: string; suffix?: string; label: string }[];
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
    'TOTO needed an evergreen campaign platform that could be reused across multiple channels while staying family-friendly. Toilet hygiene is a sensitive subject, and the campaign needed to be memorable without becoming crude, overly clinical, or cheesy. Instead of avoiding that sensitivity, the strategic angle was to use it carefully \u2014 neutralising discomfort through tongue-in-cheek humour while keeping the message clean, direct, and easy to recognise.',
  accentColor: '#3b82f6',
  accentSecondaryColor: '#60a5fa',
  heroVideo: '/portfolio/TOTO/wnw-toilet.mp4',
  scrollFlowTitle: { top: 'TOTO', bottom: '#washnotwipe' },
  proof: [
    {
      num: '01',
      title: '#washnotwipe',
      desc: 'A direct behavioural proposition',
      detail: 'I championed #washnotwipe as the campaign spine \u2014 simple enough to remember, clean enough to stay family-friendly, and flexible enough to translate across OOH, social, influencer content, and later campaign extensions.',
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
  outcomeStats: [
    { value: '4', suffix: ' Years', label: 'Agency relationship' },
    { prefix: 'S$', value: '200', suffix: 'K', label: 'First-year revenue' },
    { value: '3', suffix: '+', label: 'Campaign extensions' },
    { value: '6', suffix: '+', label: 'Channel types' },
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
    'Built the community rhythm and participation rituals behind an early football manager game on the blockchain.',
  client: 'NFT11',
  role: 'Community Strategy / Narrative Programming',
  deliverables: 'Community strategy, newsletters, quests, AMAs, creator programme, engagement systems, narrative programming',
  philosophyLabel: 'Brief',
  philosophyHeading:
    'NFT11 set out to ride the NFT wave by building one of the first football manager games on the blockchain, from scratch.',
  philosophyBody:
    'The ambition was clear, but the product was still early. NFT11 needed attention, belief, and participation before the game itself had fully matured. The strategic challenge was not to convince football fans that football is fun, or crypto users that NFTs had upside. It was to create a shared rhythm where both worlds could meet \u2014 recurring rituals that gave the community reasons to return, participate, and feel involved in the making of something early.',
  accentColor: '#f59e0b',
  accentSecondaryColor: '#fb923c',
  heroVideo: '/portfolio/NFT11/final/nft11-trailer.mp4',
  scrollFlowTitle: { top: 'NFT11', bottom: 'Universe Building' },
  proof: [
    {
      num: '01',
      title: '~60k Organic Community',
      desc: 'Built belief before the product fully matured',
      detail: 'NFT11 needed more than launch hype. I helped shape the project\u2019s community backbone so football and crypto audiences had a shared world to gather around while the game was still developing.',
      images: [
        { src: '/portfolio/NFT11/final/presales.jpg', alt: 'Presales overview' },
        { src: '/portfolio/NFT11/final/presales02.jpg', alt: 'Presales detail' },
        { src: '/portfolio/NFT11/final/stats-01.jpg', alt: 'Stats snapshot 01' },
        { src: '/portfolio/NFT11/final/stats-02.jpg', alt: 'Stats snapshot 02' },
      ],
    },
    {
      num: '02',
      title: '150+ Newsletters',
      desc: 'A recurring communication spine',
      detail: 'The weekly newsletter became one of the project\u2019s core rituals. It kept the community updated, involved, and connected to the project\u2019s momentum instead of treating updates as isolated announcements.',
      images: [
        { src: '/portfolio/NFT11/final/newsletter01%20(1).jpg', alt: 'Newsletter issue 1' },
        { src: '/portfolio/NFT11/final/newsletter01%20(2).jpg', alt: 'Newsletter issue 2' },
        { src: '/portfolio/NFT11/final/newsletter01%20(3).jpg', alt: 'Newsletter issue 3' },
      ],
      link: { href: 'https://medium.com/@nfteleven', label: 'Read on Medium' },
    },
    {
      num: '03',
      title: 'Quest Cycles',
      desc: '+200% unique engagement during active cycles',
      detail: 'Quest-based programming gave the community recurring reasons to participate instead of passively observe. The goal was not just to generate noise, but to give members structured ways to act, contribute, and feel part of the project\u2019s movement.',
      images: [
        { src: '/portfolio/NFT11/final/weekly_q01.png', alt: 'Weekly quest 1' },
        { src: '/portfolio/NFT11/final/weekly_q02.png', alt: 'Weekly quest 2' },
        { src: '/portfolio/NFT11/final/weekly_q03.png', alt: 'Weekly quest 3' },
      ],
    },
    {
      num: '04',
      title: 'US$1.5M Raise',
      desc: 'Supported fundraising momentum in under 30 days',
      detail: 'The community rhythm helped turn attention into belief, participation, and launch momentum. The work supported a US$1.5M raise in under 30 days through narrative, community activity, and belief-building.',
      images: [],
    },
  ],
  visionLabel: 'Strategic Thesis',
  visionQuote:
    'A community is not held together by noise. It is held together by rhythm, ritual, and the feeling that something is always in motion.',
  gallery: [
    { src: '/portfolio/NFT11/2fd5464f-fc5c-4067-b984-50653c85ed79_rw_1920.png', alt: 'NFT11 world-building hero \u2014 football manager on the blockchain', layout: 'full', speed: 0.25 },
    { src: '/portfolio/NFT11/final/stats-01.jpg', alt: 'Community scale proof', layout: 'half', speed: 0.2 },
    { src: '/portfolio/NFT11/final/newsletter01%20(1).jpg', alt: 'Newsletter system', layout: 'half', speed: 0.35 },
    { src: '/portfolio/NFT11/14676f24-4b74-47d2-bbb3-039275cec6c2_rw_1920.png', alt: 'Quest mechanics \u2014 weekly participation', layout: 'full' },
    { src: '/portfolio/NFT11/final/presales.jpg', alt: 'Presale and fundraising momentum', layout: 'full' },
  ],
  approachLabel: 'Process',
  approachItems: [
    {
      label: 'Thinking',
      heading: 'Football gave the emotion. Crypto gave the speculation. The missing piece was rhythm.',
      body: 'The strategy was not to oversell either world. Football fans already understood the emotional pull of the game. Crypto users already understood the speculative upside. NFT11 needed a structure that could bring both audiences into the same universe.',
    },
    {
      label: 'Execution',
      heading: 'Community needed cadence, not noise.',
      body: 'Newsletters, quests, AMAs, creator activity, and recurring updates gave the project structure while the product was still developing. The work helped turn NFT11 from an early concept into a world people could keep returning to.',
    },
  ],
  nextProject: { name: 'TOTO', accent: '#washnotwipe', href: '/toto-portfolio.html' },
  socials: [
    { label: 'Email', href: 'mailto:hello@nft11.co' },
  ],
  outcomeStats: [
    { prefix: '~', value: '60', suffix: 'K', label: 'Organic community' },
    { value: '150', suffix: '+', label: 'Newsletters sent' },
    { prefix: '+', value: '200', suffix: '%', label: 'Engagement lift' },
    { prefix: 'US$', value: '1.5', suffix: 'M', label: 'Raised in under 30 days' },
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
    'Diagnosed an unclear brand problem and turned it into a connected digital ecosystem across marketing, support, and affiliate systems.',
  client: 'OxyTap',
  role: 'Systems Design / Product Thinking / Build',
  deliverables: 'Corporate site, campaign assets, product education, support portal, warranty flow, knowledge base, Telegram/Botpress planning, affiliate and stockist logic',
  philosophyLabel: 'Brief',
  philosophyHeading:
    'OxyTap did not come with a clean brief. The brand had existed for five years and everyone knew something was missing, but no one could clearly name it.',
  philosophyBody:
    'The brief was unusual because the problem was not clearly defined. OxyTap had already existed for around five years, and the team knew the brand was lacking something, but there was no single obvious campaign, website, or product problem to solve. The first task was not execution. It was diagnosis. Before building more assets or adding more systems, I had to understand what was actually missing and where the work should begin.',
  accentColor: '#67e8f9',
  accentSecondaryColor: '#22d3ee',
  heroVideo: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/oxytap-hero.webm',
  scrollFlowTitle: { top: 'OxyTap', bottom: 'Ecosystem' },
  proof: [
    {
      num: '01',
      title: 'Finding the Voice',
      desc: 'The brief was unclear, so the first task was diagnosis',
      detail: 'OxyTap had existed for five years and everyone knew something was missing, but no one could clearly name it. I started by finding the brand\u2019s voice so the rest of the gaps could reveal themselves \u2014 what OxyTap is, what it does, why it matters, and how it should speak to customers.',
      images: [
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/oxytap-hero.mp4', alt: 'OxyTap brand hero' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/web_banner02.png', alt: 'OxyTap web banner' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/moutai_horizontal_CTA.png', alt: 'OxyTap campaign CTA' },
      ],
    },
    {
      num: '02',
      title: 'Product-Led to Brand-Led',
      desc: 'Corporate site, messaging, education, and campaign assets',
      detail: 'Once the voice was clearer, OxyTap could move beyond simply presenting a product. The work shaped how the brand explained oxygen infusion, product usage, customer value, and campaign messaging across public-facing touchpoints.',
      images: [
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/biohack_fa_poster.jpg', alt: 'OxyTap Biohack campaign poster' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/merc.jpg', alt: 'OxyTap campaign visual' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/oxy_energy_v4_fa_vo.webm', alt: 'OxyTap energy product education video' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/how_to_oxytap_fa_edits.webm', alt: 'How to use OxyTap product education video' },
      ],
    },
    {
      num: '03',
      title: 'Support Infrastructure',
      desc: 'Support portal, knowledge base, warranty flow',
      detail: 'I helped structure support.oxytap.com into a clearer support environment for product education, warranty registration, setup guidance, customer support, and knowledge base content. This gave customers a more coherent path after interest or purchase.',
      images: [
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/supportOxytap.mp4', alt: 'OxyTap support portal walkthrough' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/drink_fresh_water_extended.mp4', alt: 'OxyTap product support and education content' },
      ],
    },
    {
      num: '04',
      title: 'OxyAffiliate Logic',
      desc: 'Rank, payout, group sales, stockist flows, dashboard planning',
      detail: 'The work extended into operational systems. I helped translate sales, affiliate, and stockist needs into rank logic, payout structures, group sales mechanics, onboarding flows, and dashboard planning for OxyAffiliate and OxyStockist. This moved the work beyond marketing into the business infrastructure behind growth.',
      images: [
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/logout_REC.webm', alt: 'OxyAffiliate dashboard recording' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/logout-close.webm', alt: 'OxyAffiliate dashboard close interaction' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/oxystockist-ss.mp4', alt: 'OxyStockist interface walkthrough' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/oxyaff-onboard.mp4', alt: 'OxyAffiliate onboarding flow' },
      ],
    },
  ],
  visionLabel: 'Strategic Thesis',
  visionQuote:
    'When a brand learns how to communicate, the systems it needs become easier to see.',
  gallery: [
    { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/oxytap-hero.mp4', alt: 'OxyTap ecosystem hero', layout: 'full', speed: 0.25 },
    { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/biohack_fa_poster.jpg', alt: 'OxyTap Biohack campaign poster', layout: 'half', speed: 0.2 },
    { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/merc.jpg', alt: 'OxyTap campaign visual', layout: 'half', speed: 0.35 },
    { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/supportOxytap.mp4', alt: 'OxyTap support ecosystem', layout: 'full' },
    { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/logout_REC.webm', alt: 'OxyAffiliate system layer', layout: 'full' },
  ],
  approachLabel: 'Process',
  approachItems: [
    {
      label: 'Thinking',
      heading: 'The problem was not a missing asset. It was a missing centre.',
      body: 'OxyTap\u2019s challenge was unclear at the beginning. The brand had many needs, but no obvious starting point. Finding the voice gave the work a centre, allowing the missing touchpoints to reveal themselves more clearly.',
    },
    {
      label: 'Execution',
      heading: 'The work became a connected ecosystem.',
      body: 'Website, product education, campaign assets, support portal, warranty flow, Botpress planning, affiliate logic, and stockist flows were shaped as connected parts of the same brand system \u2014 not isolated deliverables.',
    },
  ],
  nextProject: { name: 'NFT11', accent: 'Universe Building', href: '/nft11-portfolio.html' },
  socials: [
    { label: 'Email', href: 'mailto:hello@oxytap.co' },
  ],
  outcomeStats: [
    { value: '4', suffix: '+', label: 'Integrated systems' },
    { value: '5', suffix: '', label: 'Years of brand history' },
    { value: '2', suffix: '+', label: 'Operational platforms' },
    { value: '1', suffix: '', label: 'Unified brand voice' },
  ],
};
