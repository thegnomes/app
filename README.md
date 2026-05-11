# LeaveEverythingtoChance — Portfolio '26

An interactive portfolio built with React, TypeScript, Three.js, and Vite. It opens with a short particle experience (NebulaHero) and leads into a curated work showcase.

## Route Structure

| Route | Description |
|-------|-------------|
| `/` | Intro — interactive particle experience with video transitions |
| `/mywork.html` | Work showcase — project galaxies and case study index |
| `/toto-portfolio.html` | TOTO — Creative Direction case study |
| `/nft11-portfolio.html` | NFT11 — Universe Building case study |
| `/oxytap-portfolio.html` | OxyTap — Prototype-to-Ship case study |
| `/portfolio.html` | Redirects to `/toto-portfolio.html` |

Legacy `/scene02` and `/scene02.html` URLs redirect to `/mywork.html`.

## Tech Stack

- **Framework:** React 19
- **Language:** TypeScript 5.9
- **Build Tool:** Vite 7
- **3D Graphics:** Three.js 0.183
- **Styling:** Tailwind CSS 3.4
- **UI Components:** shadcn/ui, Radix UI

## Setup

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Build & Deploy

- Build command: `node ./node_modules/vite/bin/vite.js build`
- Output directory: `dist`
- Deployed on Vercel
