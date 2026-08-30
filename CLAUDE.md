# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

BlueArk is a single-page-feel marketing/portfolio site (Create React App, React 19) for a B2B services company (lead generation, B2B data, Meta Ads, demand generation, web development, BI reporting). It is a static, content-driven site with no backend or state management library — the whole thing is one continuous scroll of sections rendered from `App.js`, with `react-router-dom` layered on top so each section is also a real, independently indexable path (see Architecture below).

## Commands

- `npm start` — run the dev server (react-scripts, default port 3000)
- `npm run build` — production build (note: `set CI=false` is prefixed in the build script, a Windows-style env-var syntax — this only works as-is on Windows/cmd; on macOS/Linux use `CI=false npm run build` or `react-scripts build` directly if `npm run build` fails). A `postbuild` script (`scripts/generate-static-routes.js`) then runs automatically and writes `build/services/index.html`, `build/why-us/index.html`, `build/contact/index.html` — if you build via `react-scripts build` directly instead of `npm run build`, run `node scripts/generate-static-routes.js` afterward yourself, or those static route files won't be regenerated.
- `npm test` — run tests in watch mode via `react-scripts test` (Jest + React Testing Library). To run a single test file non-interactively: `CI=true npx react-scripts test src/App.test.js`
- `npm run deploy` — builds and publishes `build/` to GitHub Pages via `gh-pages` (runs `predeploy` → `build` automatically)

There is no lint script; ESLint runs as part of `react-scripts start`/`build` using the `react-app` config from `package.json`. `.env` sets `DISABLE_ESLINT_PLUGIN=true`, so lint errors are currently suppressed during build/start — don't rely on CRA's build-time lint to catch issues.

## Architecture

**Composition, not pages.** `App.js` renders a fixed, ordered stack of section components — `Header`, `Hero`, `Services`, `WhyUs`, `ClientVoice`, `Contact`, `Footer` — plus a fixed-position `ParticlesBackground` canvas layered behind everything. There's no `src/pages` directory and every route renders the *same* component stack (`PageLayout` in `App.js`) — new sections are added by creating a component and inserting it into that stack in scroll order, same as before.

**Section-as-route (`src/sectionsConfig.js` + `src/hooks/useSectionRouting.js`).** Each top-level section is both a scroll target (`id`) and a real `react-router-dom` path (`/`, `/services`, `/why-us`, `/contact`), listed in `sectionsConfig.js` alongside its own `title`/`description`. `Header`'s nav and `Hero`'s CTA use `<Link>` to these paths instead of `#anchor` hrefs. `useSectionRouting` (called once, in `PageLayout`) does two things every route renders: (1) on path change, smooth-scrolls to the matching section and sets `document.title`/meta description/canonical; (2) an `IntersectionObserver` scroll-spy keeps the URL in sync (via `navigate(path, { replace: true })`) as the user scrolls past each section, without adding history entries. A `isProgrammaticScroll` ref suppresses the spy for ~700ms after a programmatic scroll so the two don't fight each other. Adding/removing a routed section means editing `sectionsConfig.js` (which both `Header` and `App`'s `<Routes>` read from) — nothing else needs to change. "Voice of Our Clients" (`ClientVoice`, id `clients`) is intentionally absent from `sectionsConfig.js` — it's commented out in `App.js`/`Header.js`, not deleted.

**Static per-route HTML for crawlers (`scripts/generate-static-routes.js`).** GitHub Pages can't rewrite requests server-side, so a bare CRA build only has a real file at `/index.html` — direct hits or crawler requests to `/services` etc. would 404 (or need a 404.html SPA-redirect trick, which serves a real 404 HTTP status and undermines indexing, the actual goal of having these paths). Instead, the `postbuild` npm script copies `build/index.html` into `build/services/index.html`, `build/why-us/index.html`, `build/contact/index.html`, swapping in each route's title/description/canonical/OG tags. GitHub Pages then serves these as ordinary directory-index files (a bare `/services` 301s to `/services/`, which 200s) — real distinct HTML per path, no JS execution required to see it. Keep the title/description text in this script and in `sectionsConfig.js` identical, or the pre-rendered HTML and the client-side-hydrated title will disagree.

**One component = one JS file + one same-named CSS file.** Every component in `src/components/*.js` imports its styles directly from `src/styles/components/<Name>.css`. When adding a component, follow this pairing rather than adding to a shared stylesheet.

**Theming is CSS-variable-driven, not per-component logic.** `src/context/ThemeContext.js` provides `isDarkTheme`/`toggleTheme`/`themeTitle` via React Context, persisted to `localStorage` under `blueark-theme` (defaults to dark). The provider wraps children in a `<div className="dark-theme">` or `<div className="light-theme">`. All actual theming lives in `src/styles/App.css` as CSS custom properties (`--bg-primary`, `--text-primary`, `--accent`, `--card-bg`, etc.) redefined per theme class — components' CSS should consume these variables (`var(--accent)`) rather than hardcoding colors, and component JS should only branch on `isDarkTheme` when a variable can't express the difference (e.g. `ParticlesBackground` picks a canvas fill color imperatively since canvas can't read CSS vars).

**`ParticlesBackground`** is an imperative `<canvas>` animation (mouse-reactive particles + connecting lines) driven entirely by refs and `requestAnimationFrame` inside a single `useEffect`, re-run when `isDarkTheme` changes. It's fixed/full-viewport with `pointerEvents: none` and `zIndex: 1`, sitting behind the rest of the app.

**Expandable-card pattern**: `Services` owns `expandedCard` state (index of the open card) and passes `isExpanded`/`onClick` down to each `ServiceCard`; only one card can be expanded at a time. Follow this "parent owns which-item-is-open state" pattern for any future accordion/expandable UI rather than putting open/closed state in the child.

**Content is inlined in components**, not pulled from JSON/CMS/props — e.g. `Services.js` hardcodes `servicesData` (icons are Font Awesome classes like `fas fa-bullseye`) directly in the component. Update copy by editing the component file directly.

**Easter egg**: `App.js` listens for the Konami code (`useEffect` + keydown listener) and reveals a `developer-signature` overlay for 10s when matched — this is intentional and self-contained; don't "clean it up" as dead code.

## Environment

`.env` sets `CI=false`, `GENERATE_SOURCEMAP=false`, and `DISABLE_ESLINT_PLUGIN=true`. `homepage` in `package.json` is `"/"` (root-absolute, not the CRA-subpath-friendly `"."` it used to be) — the site is served from the domain root (`blueark.co.in` via `public/CNAME`), and root-absolute asset paths are required for the routed paths (`/services`, `/why-us`, `/contact`) to resolve `${process.env.PUBLIC_URL}/...` assets correctly; a relative `homepage` would resolve assets relative to the current route depth and break on any path other than `/`.
