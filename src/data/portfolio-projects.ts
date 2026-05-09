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
  titleAccent: '0-to-1 Web3 Launch',
  tag: 'Universe Building',
  year: '2021 - 2023',
  coreCompetency: 'Brand, Launch & Community Systems',
  description:
    'Helped turn a raw Web3 football game idea into a launch-ready project through brand design, product narrative, IFO strategy, and community operations.',
  client: 'NFT11',
  role: '0-to-1 Brand / Launch / Community Build',
  deliverables: 'Logo design, first website mockup, copywriting, whitepaper foundation, game concept structure, IFO strategy, social management, AMAs, newsletters, community assets',
  philosophyLabel: 'Problem',
  philosophyHeading:
    'NFT11 began as an idea, not a developed product.',
  philosophyBody:
    'When I became involved, NFT11 had no finished brand, no website, no developed game structure, and no community engine \u2014 only the ambition to build a football manager game on the blockchain. The challenge was not simply to market a game. It was to make the project feel real, understandable, and worth believing in before the product was ready.',
  accentColor: '#f59e0b',
  accentSecondaryColor: '#fb923c',
  heroVideo: '/portfolio/NFT11/final/nft11-trailer.mp4',
  scrollFlowTitle: { top: 'NFT11', bottom: '0-to-1 Web3 Launch' },
  proof: [
    {
      num: '01',
      title: 'Brand & Creative Build',
      desc: 'Logo, first site mockup, copy, whitepaper, visual assets',
      detail: 'I designed NFT11\u2019s early brand and creative foundation \u2014 including the logo, first website mockup, early copy, initial whitepaper structure, and visual assets that gave the project its first public-facing identity.',
      images: [
        { src: '/portfolio/NFT11/2fd5464f-fc5c-4067-b984-50653c85ed79_rw_1920.png', alt: 'NFT11 brand and world-building visual' },
        { src: '/portfolio/NFT11/14676f24-4b74-47d2-bbb3-039275cec6c2_rw_1920.png', alt: 'NFT11 game concept and creative direction' },
        { src: '/portfolio/NFT11/final/nft11-trailer.mp4', alt: 'NFT11 product narrative trailer' },
      ],
    },
    {
      num: '02',
      title: 'IFO Launch System',
      desc: 'Go-to-market strategy, platform planning, launch communications',
      detail: 'I helped build the go-to-market system for the first IFO \u2014 shaping the launch positioning, platform strategy, campaign communications, and community preparation that supported the raise. The first IFO raised US$1.5M in 3 days.',
      images: [
        { src: '/portfolio/NFT11/final/presales.jpg', alt: 'NFT11 IFO presale proof' },
        { src: '/portfolio/NFT11/final/presales02.jpg', alt: 'NFT11 presale detail' },
        { src: '/portfolio/NFT11/final/stats-01.jpg', alt: 'NFT11 launch stats 01' },
        { src: '/portfolio/NFT11/final/stats-02.jpg', alt: 'NFT11 launch stats 02' },
      ],
    },
    {
      num: '03',
      title: 'Community & Content Engine',
      desc: 'Social management, AMAs, newsletters, updates, quest assets',
      detail: 'After the IFO, I managed the community while the game was being developed \u2014 running socials, communicating with members, conducting AMAs, producing newsletters and updates, and designing assets that kept the project active.',
      images: [
        { src: '/portfolio/NFT11/final/newsletter01%20(1).jpg', alt: 'NFT11 newsletter issue 1' },
        { src: '/portfolio/NFT11/final/newsletter01%20(2).jpg', alt: 'NFT11 newsletter issue 2' },
        { src: '/portfolio/NFT11/final/newsletter01%20(3).jpg', alt: 'NFT11 newsletter issue 3' },
        { src: '/portfolio/NFT11/final/weekly_q01.png', alt: 'NFT11 weekly quest 1' },
        { src: '/portfolio/NFT11/final/weekly_q02.png', alt: 'NFT11 weekly quest 2' },
        { src: '/portfolio/NFT11/final/weekly_q03.png', alt: 'NFT11 weekly quest 3' },
      ],
      link: { href: 'https://medium.com/@nfteleven', label: 'Read on Medium' },
    },
  ],
  visionLabel: 'Strategic Move',
  visionQuote:
    'Make football and Web3 feel like one world.',
  gallery: [
    { src: '/portfolio/NFT11/2fd5464f-fc5c-4067-b984-50653c85ed79_rw_1920.png', alt: 'NFT11 brand and world-building visual', layout: 'full', speed: 0.25 },
    { src: '/portfolio/NFT11/final/nft11-trailer.mp4', alt: 'NFT11 game and product narrative', layout: 'full', speed: 0.2 },
    { src: '/portfolio/NFT11/final/presales.jpg', alt: 'NFT11 IFO and presale proof', layout: 'half', speed: 0.25 },
    { src: '/portfolio/NFT11/final/newsletter01%20(1).jpg', alt: 'NFT11 newsletter and content cadence', layout: 'half', speed: 0.35 },
    { src: '/portfolio/NFT11/final/weekly_q01.png', alt: 'NFT11 quest and community activation', layout: 'full' },
  ],
  approachLabel: 'Closing',
  approachItems: [
    {
      label: 'Strategy',
      heading: 'The task was to make an unfinished idea feel real enough to believe in.',
      body: 'NFT11 did not begin with a polished product. The work was to build the foundation around it \u2014 identity, narrative, game logic, token launch strategy, and community structure \u2014 so people could understand what the project was and why it was worth joining.',
    },
    {
      label: 'Execution',
      heading: 'I worked across brand, product, launch, and community.',
      body: 'The work included logo design, first site mockup, copywriting, whitepaper development, game mechanic thinking, IFO go-to-market strategy, social management, AMAs, newsletters, community communication, and ongoing asset creation while the game was being developed.',
    },
  ],
  nextProject: { name: 'TOTO', accent: '#washnotwipe', href: '/toto-portfolio.html' },
  socials: [
    { label: 'Email', href: 'mailto:hello@nft11.co' },
  ],
  outcomeStats: [
    { prefix: 'US$', value: '1.5', suffix: 'M', label: 'Raised in 3 days' },
    { prefix: '~', value: '60', suffix: 'K', label: 'Organic community' },
    { value: '150', suffix: '+', label: 'Newsletters / updates' },
    { prefix: '+', value: '200', suffix: '%', label: 'Quest-cycle engagement' },
  ],
};

export const oxytapProject: PortfolioProject = {
  slug: 'oxytap',
  title: 'OxyTap',
  titleAccent: 'Brand-to-System Build',
  tag: 'Prototype-to-Ship',
  year: '2023 - 2025',
  coreCompetency: 'Brand, Web, Support & Affiliate Infrastructure',
  description:
    'Built OxyTap\u2019s brand, web, support, and affiliate infrastructure as the business moved from local selling to international growth.',
  client: 'OxyTap',
  role: 'Brand / Web / Support / Affiliate Systems Build',
  deliverables: 'Brand identity, website, event collaterals, campaign assets, marketing direction, support platform, knowledge base, warranty and servicing flows, affiliate compensation plan, rank logic, group sales mechanics, onboarding flow, dashboard planning',
  philosophyLabel: 'Problem',
  philosophyHeading:
    'OxyTap had no clear brand identity, website, online capability, or structured marketing plan.',
  philosophyBody:
    'I was first engaged to build the website, but the need quickly expanded. OxyTap had three back-to-back events planned and needed collaterals to support them. Beyond immediate execution, it became clear the business was operating short-term and needed a clearer brand direction, vision, and mission. As sales picked up and moved internationally, customers needed a proper support platform for product servicing, education, warranty, and post-purchase guidance. Later, the business also needed a scalable sales capability, which led to the affiliate programme.',
  accentColor: '#67e8f9',
  accentSecondaryColor: '#22d3ee',
  heroVideo: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/oxytap-hero.webm',
  scrollFlowTitle: { top: 'OxyTap', bottom: 'Brand-to-System Build' },
  proof: [
    {
      num: '01',
      title: 'Brand, Web & Event Launch',
      desc: 'Brand identity, website, event collaterals, marketing direction',
      detail: 'I started with the immediate need: building OxyTap\u2019s website and creating collaterals for three back-to-back events. But the work quickly became broader than production. I helped shape the brand\u2019s identity, voice, vision, mission, and marketing direction so OxyTap had a clearer foundation for how it presented itself.',
      images: [
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/oxytap-hero.mp4', alt: 'OxyTap brand hero' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/web_banner02.png', alt: 'OxyTap web banner' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/moutai_horizontal_CTA.png', alt: 'OxyTap campaign CTA' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/biohack_fa_poster.jpg', alt: 'OxyTap event campaign poster' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/merc.jpg', alt: 'OxyTap campaign visual' },
      ],
    },
    {
      num: '02',
      title: 'International Support Infrastructure',
      desc: 'Support platform, knowledge base, warranty and servicing flows',
      detail: 'As OxyTap\u2019s sales grew internationally, the business needed more than a marketing site. Customers needed a support platform that could help them learn about the product, register purchases, request servicing, and find guidance after purchase. I helped build the support infrastructure and organise the customer journey around product education and post-purchase support.',
      images: [
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/supportOxytap.mp4', alt: 'OxyTap support portal walkthrough' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/drink_fresh_water_extended.mp4', alt: 'OxyTap product support and education content' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/oxy_energy_v4_fa_vo.webm', alt: 'OxyTap product education video' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/how_to_oxytap_fa_edits.webm', alt: 'How to use OxyTap education video' },
      ],
    },
    {
      num: '03',
      title: 'Affiliate Sales System',
      desc: 'Comp plan, rank logic, group sales, onboarding flow, dashboard planning',
      detail: 'When the business needed a scalable sales capability, I designed the affiliate programme from the ground up \u2014 from compensation plan and rank logic to group sales mechanics, payout thinking, onboarding flow, stockist flow, and dashboard planning. This moved OxyTap from simple direct selling towards a structured affiliate sales system.',
      images: [
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/logout_REC.webm', alt: 'OxyAffiliate dashboard recording' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/logout-close.webm', alt: 'OxyAffiliate dashboard close interaction' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/oxystockist-ss.mp4', alt: 'OxyStockist interface walkthrough' },
        { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/oxyaff-onboard.mp4', alt: 'OxyAffiliate onboarding flow' },
      ],
    },
  ],
  visionLabel: 'Strategic Move',
  visionQuote:
    'Build the missing infrastructure layer by layer as the business grew.',
  gallery: [
    { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/oxytap-hero.mp4', alt: 'OxyTap brand and product hero', layout: 'full', speed: 0.25 },
    { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/biohack_fa_poster.jpg', alt: 'OxyTap event collateral', layout: 'half', speed: 0.2 },
    { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/how_to_oxytap_fa_edits.webm', alt: 'OxyTap product education content', layout: 'half', speed: 0.35 },
    { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/supportOxytap.mp4', alt: 'OxyTap support infrastructure', layout: 'full' },
    { src: 'https://chnsb9h6s6psbc0a.public.blob.vercel-storage.com/oxytap/logout_REC.webm', alt: 'OxyAffiliate system layer', layout: 'full' },
  ],
  approachLabel: 'Closing',
  approachItems: [
    {
      label: 'Strategy',
      heading: 'The problem was not one missing asset. It was missing infrastructure.',
      body: 'OxyTap needed more than a website. It needed the foundation to communicate, sell, support customers, and scale internationally. The work was to identify which layer was missing at each stage and build the next system around the business need.',
    },
    {
      label: 'Execution',
      heading: 'I built across brand, web, support, and sales systems.',
      body: 'The work moved from website and event collaterals into brand direction, product education, support platform structure, warranty and servicing flows, and finally the affiliate programme \u2014 including compensation planning, rank logic, group sales mechanics, onboarding flow, and dashboard planning.',
    },
  ],
  nextProject: { name: 'NFT11', accent: '0-to-1 Web3 Launch', href: '/nft11-portfolio.html' },
  socials: [
    { label: 'Email', href: 'mailto:hello@oxytap.co' },
  ],
  outcomeStats: [
    { value: '1', label: 'Brand/web foundation' },
    { value: '3', suffix: '+', label: 'Events supported' },
    { value: '1', label: 'Support platform' },
    { value: '1', label: 'Affiliate system' },
  ],
};
