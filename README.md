# SatsVerdant • Circularity Nexus

A modern, elegant Next.js application for visualizing and orchestrating circular-economy flows. This repo currently contains the frontend app built with Next.js 15, React 19, and Tailwind CSS v4, with a design system leveraging Radix UI and related utilities.

> Explore the product vision and implementation plans in:
>
> - `wireframe.md` — UX flows and screens
> - `frontendprd.md` — Frontend PRD and scope
> - `backendPRD.md` — Backend PRD and interfaces
> - `circularityNexus.md` — Concept notes and domain model


## ✨ Features

- Next.js 15 (App Router) with React 19
- Tailwind CSS v4 + utility enhancements
- Radix UI primitives and Headless components
- Typed end-to-end with TypeScript
- Modular components under `frontend/components/`
- Project-ready scripts for development, build, and production start


## 🗂️ Repository Structure

```
SatsVerdant/
├─ frontend/                # Next.js application
│  ├─ app/                  # App Router pages, layout, and styles
│  ├─ components/           # UI and feature components
│  ├─ hooks/                # Reusable hooks
│  ├─ lib/                  # Utilities
│  ├─ package.json          # Scripts & deps for the frontend app
│  └─ next.config.mjs       # Next.js configuration
├─ wireframe.md             # UX wireframes and flows
├─ frontendprd.md           # Frontend product requirements
├─ backendPRD.md            # Backend product requirements
├─ circularityNexus.md      # Concept and domain narrative
└─ README.md                # You are here
```


## 🚀 Quickstart

Prerequisites:

- Node.js 18.18+ (recommended 20.x LTS)
- npm 9+ (or your preferred package manager)

Steps:

1) Install dependencies

```
cd frontend
npm install
```

2) Start the dev server

```
npm run dev
```

3) Open http://localhost:3000 in your browser


## 🔧 Scripts (from `frontend/package.json`)

- `npm run dev` — Start Next.js in development mode
- `npm run build` — Production build
- `npm run start` — Start the production server (after build)
- `npm run lint` — Run Next.js lint


## 🧩 Tech Stack

- Next.js `15.2.x`
- React `19`
- TypeScript `5.x`
- Tailwind CSS `4.x`
- Radix UI (multiple packages)
- Additional libs: `zod`, `react-hook-form`, `embla-carousel-react`, `recharts`, `@vercel/analytics`, etc.

See `frontend/package.json` for full dependency list.


## 🧱 Notable Code Areas

- `frontend/app/page.tsx` — Entry route (home)
- `frontend/app/layout.tsx` — Root layout and metadata
- `frontend/app/globals.css` — Global styles (Tailwind layer)
- `frontend/components/` — Feature and UI elements (e.g., `satsverdant.tsx`, `circularity-nexus.tsx`)
- `frontend/hooks/` — Utilities like `use-toast.ts`, `use-mobile.ts`


## 🛠️ Development Notes

- Tailwind v4 uses the new PostCSS pipeline (`@tailwindcss/postcss`). Ensure IDE Tailwind plugin targets v4.
- React 19 and Next 15 may require up-to-date TypeScript types. If type issues appear, run `npm i` to update local deps.
- If you introduce environment variables, add a `.env.local` inside `frontend/` and reference via `process.env.NEXT_PUBLIC_*` for client-side exposure.


## 📦 Production

Build and run production server from `frontend/`:

```
npm run build
npm run start
```

Deployments can target platforms like Vercel, Netlify, or your own Node hosting. For Vercel, the defaults work well with Next.js 15.


## 🧪 Testing (future)

- Add unit tests (Vitest/Jest) and component tests (Playwright) as the project grows.
- Add CI (GitHub Actions) for lint, type-check, build, and tests.


## 🧭 Roadmap

- Integrate backend endpoints defined in `backendPRD.md`
- Data models and adapters for the Circularity Nexus graph
- AuthN/Z and role-based UI gating
- Expand charts and dashboards using `recharts`
- Accessibility and i18n hardening


## ❓ Troubleshooting

- "Port 3000 in use": stop an existing server or run `PORT=3001 npm run dev`.
- TypeScript misses DOM types: ensure `@types/react` and `@types/react-dom` match React 19.
- Tailwind classes not applied: confirm `globals.css` includes Tailwind directives and that files are within the content scan.


## 📄 License

Copyright © SatsVerdant. All rights reserved.


## 🙏 Acknowledgements

Built with love, TypeScript, and a touch of verdant ambition 🌿.
