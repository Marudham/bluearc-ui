# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

BlueArk is a single-page marketing/portfolio site (Create React App, React 19) for a B2B services company (lead generation, B2B data, web development, BI reporting). It is a static, content-driven site with no backend, routing, or state management library — the entire page is one long scroll of sections rendered from `App.js`.

## Commands

- `npm start` — run the dev server (react-scripts, default port 3000)
- `npm run build` — production build (note: `set CI=false` is prefixed in the build script, a Windows-style env-var syntax — this only works as-is on Windows/cmd; on macOS/Linux use `CI=false npm run build` or `react-scripts build` directly if `npm run build` fails)
- `npm test` — run tests in watch mode via `react-scripts test` (Jest + React Testing Library). To run a single test file non-interactively: `CI=true npx react-scripts test src/App.test.js`
- `npm run deploy` — builds and publishes `build/` to GitHub Pages via `gh-pages` (runs `predeploy` → `build` automatically)

There is no lint script; ESLint runs as part of `react-scripts start`/`build` using the `react-app` config from `package.json`. `.env` sets `DISABLE_ESLINT_PLUGIN=true`, so lint errors are currently suppressed during build/start — don't rely on CRA's build-time lint to catch issues.

## Architecture

**Composition, not routing.** `App.js` renders a fixed, ordered stack of section components — `Header`, `Hero`, `Services`, `WhyUs`, `ClientVoice`, `Contact`, `Footer` — plus a fixed-position `ParticlesBackground` canvas layered behind everything. Navigation (`Header`) uses in-page anchor links (`#services`, `#why-us`, etc.) that scroll to each section's `id`, not client-side routing. There's no `src/pages` or router — new sections are added by creating a component and inserting it into the `App.js` stack in scroll order.

**One component = one JS file + one same-named CSS file.** Every component in `src/components/*.js` imports its styles directly from `src/styles/components/<Name>.css`. When adding a component, follow this pairing rather than adding to a shared stylesheet.

**Theming is CSS-variable-driven, not per-component logic.** `src/context/ThemeContext.js` provides `isDarkTheme`/`toggleTheme`/`themeTitle` via React Context, persisted to `localStorage` under `blueark-theme` (defaults to dark). The provider wraps children in a `<div className="dark-theme">` or `<div className="light-theme">`. All actual theming lives in `src/styles/App.css` as CSS custom properties (`--bg-primary`, `--text-primary`, `--accent`, `--card-bg`, etc.) redefined per theme class — components' CSS should consume these variables (`var(--accent)`) rather than hardcoding colors, and component JS should only branch on `isDarkTheme` when a variable can't express the difference (e.g. `ParticlesBackground` picks a canvas fill color imperatively since canvas can't read CSS vars).

**`ParticlesBackground`** is an imperative `<canvas>` animation (mouse-reactive particles + connecting lines) driven entirely by refs and `requestAnimationFrame` inside a single `useEffect`, re-run when `isDarkTheme` changes. It's fixed/full-viewport with `pointerEvents: none` and `zIndex: 1`, sitting behind the rest of the app.

**Expandable-card pattern**: `Services` owns `expandedCard` state (index of the open card) and passes `isExpanded`/`onClick` down to each `ServiceCard`; only one card can be expanded at a time. Follow this "parent owns which-item-is-open state" pattern for any future accordion/expandable UI rather than putting open/closed state in the child.

**Content is inlined in components**, not pulled from JSON/CMS/props — e.g. `Services.js` hardcodes `servicesData` (icons are Font Awesome classes like `fas fa-bullseye`) directly in the component. Update copy by editing the component file directly.

**Easter egg**: `App.js` listens for the Konami code (`useEffect` + keydown listener) and reveals a `developer-signature` overlay for 10s when matched — this is intentional and self-contained; don't "clean it up" as dead code.

## Environment

`.env` sets `CI=false`, `GENERATE_SOURCEMAP=false`, and `DISABLE_ESLINT_PLUGIN=true`. `homepage` in `package.json` is `"."` (relative paths, suited for GitHub Pages / static hosting from any subpath) — asset references use `${process.env.PUBLIC_URL}/...` (see `Header.js`'s logo) to stay correct regardless of deploy path.
