<!--
Guidance for AI coding agents working on the Echi Solar website (Vite + React + TypeScript).
Keep these instructions short and actionable. Reference concrete files and commands found in the repo.
-->

# Echi Solar — Copilot instructions

Short, actionable notes to help AI coding agents be productive immediately.

- Project type: Single-page app using Vite + React + TypeScript. Key files: `package.json`, `vite.config.ts`, `tsconfig.json`.
- Start dev server: `npm run dev` (uses `vite`). Build: `npm run build` (runs `tsc -b && vite build`). Preview production build: `npm run preview`.

- Big picture architecture
  - UI-only front-end. Routing is client-side via `react-router-dom`.
    - Entry: `src/main.tsx` (wraps `App` in `BrowserRouter`).
    - Routes defined in `src/navigation/index.tsx` (currently only `/` → `src/pages/Home.tsx`).
  - Layout pattern: `src/navigation/TopNav.tsx`, `src/navigation/Footer.tsx`, and page components under `src/pages` compose the app.
  - Re-usable UI pieces live in `src/components/*` (e.g. `src/components/Home/*`).

- Conventions and patterns to follow
  - TypeScript: prefer typed props and explicit exports (project uses TS; see `tsconfig.json`).
  - Styling: global CSS in `src/index.css` and component-level styles via MUI `sx` prop (Material UI v5 used across components).
  - Routing: use `react-router-dom` v6 patterns (see `Routes`/`Route` in `src/navigation/index.tsx`).
  - Images/assets: served from `public/images/*` and referenced with absolute paths like `/images/logo.png` (see `TopNav.tsx`).

- Build/test/debug notes
  - No test framework present. If adding tests, pick Jest + React Testing Library and wire scripts in `package.json`.
  - Linting: run `npm run lint` (eslint is configured; file: `eslint.config.js`).
  - To reproduce production build locally: `npm run build` then `npm run preview`.
  - Common dev problems: missing DOM root element (entry expects an element with id "root" in `index.html`), type errors are surfaced by `tsc -b` during `npm run build`.

- Integration & external dependencies
  - MUI (Material UI) components used across UI (`@mui/material`, icons). Check `package.json` for versions.
  - No backend or API integration visible in repo — the app appears UI-only. If adding API calls, keep them in a new `src/api` or `src/services` folder and centralize base URL in one place.

- Small examples to copy/paste
  - Add a new route: update `src/navigation/index.tsx` with a new `Route path="/about" element={<About />} />` and add `src/pages/About.tsx`.
  - Use images from `public`: reference `/images/logo.png` (components already reference this path).

- When editing files, run these checks before committing
  - `npm run lint` — ensure ESLint passes.
  - Type-check/build: `npm run build` — ensures TypeScript build works.

- Where to look first when bugs are reported
  - Rendering/layout issues: `src/components/*` and `src/navigation/*`.
  - Routing issues: `src/navigation/index.tsx` and `src/main.tsx`.
  - Asset issues: `public/images/*` and `index.html`.

- Keep instructions minimal. If you need clarification about project intent (API, hosting, CI), ask a human and point to `README.md` and `package.json`.

If anything here is unclear or you need additional project context (hosting, CI, or intended backend), tell me what to open and I will extract it.
