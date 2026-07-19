# CLAUDE.md

This file gives Claude Code context when working in this repository.

## Project overview

This is Luc Pellinger's personal website — a React single-page site that
serves as an online CV/portfolio. Live at: https://lucpellinger.eu/

## Tech stack

- **React** — UI library
- **Vite** — dev server and build tool
- **Yarn** — package manager (use `yarn`, not `npm`, for all install/scripts)
- **Plain CSS** — no Tailwind, no CSS-in-JS, no CSS modules; each component has
  its own co-located `.css` file
- **GitHub Pages** — deployment target
- No test framework is set up yet

## Common commands

```bash
yarn install       # install dependencies
yarn dev           # start local dev server
yarn build         # production build (outputs to dist/ by default)
yarn preview        # locally preview the production build
```

If a deploy script exists in package.json (e.g. `yarn deploy`, often via the
`gh-pages` package), use that rather than pushing `dist/` manually. Check
`package.json` scripts before assuming the exact command.

## Architecture & conventions

- The site is organized by **section/component**: each page section (e.g.
  Hero, About, Experience, Skills, Contact, Footer) lives in its own folder
  under `src/components/`, containing:
  - a `.jsx` file with the component's markup/logic
  - a `.css` file with that component's layout and styling, imported directly
    into the `.jsx` file
- Keep this one-folder-per-component pattern for any new sections. Don't
  introduce a global stylesheet approach or a CSS-in-JS/utility-class library
  unless explicitly asked.
- Prefer semantic HTML elements (`<section>`, `<header>`, `<nav>`, `<article>`)
  over generic `<div>`s where it fits — this is a CV site, so accessibility and
  clean markup matter for both real users and any automated parsing (e.g.
  recruiters skimming, screen readers).
- Keep styling in plain CSS using flexbox/grid; avoid adding new dependencies
  for styling or layout.

## Priorities for this project

1. **Performance** — this is a lightweight personal site; keep bundle size and
   load time low. Be cautious about adding heavy dependencies.
2. **Accessibility** — semantic HTML, meaningful `alt` text on images, visible
   focus states, keyboard navigability.
3. **Responsiveness** — verify changes look correct on mobile widths, not just
   desktop.
4. **Professional presentation** — this represents the owner professionally;
   avoid placeholder-looking or inconsistent styling.

## Deployment notes (GitHub Pages)

- GitHub Pages typically serves from a subpath or via a custom domain
  (`CNAME` file) — when editing routing, asset paths, or the Vite `base`
  config, check that the change won't break the deployed site.
- If the repo uses a custom domain (as implied by lucpellinger.eu), make sure
  any `CNAME` file in `public/` is preserved through builds/deploys.
- After a build-related change, confirm `yarn build` completes cleanly before
  assuming a deploy will work.

## Testing

There is currently no test suite. Until one exists:
- Be conservative with changes that touch shared/layout components, since
  regressions won't be caught automatically.
- After any non-trivial change, note what should be manually checked (e.g.
  "verify the nav collapses correctly on mobile after this edit").
- If asked to add testing, ask which framework is preferred (e.g. Vitest,
  since it integrates naturally with Vite) before installing anything.

## Things to avoid

- Don't add new dependencies (styling libraries, state management, routing
  libraries, etc.) without checking first — this is meant to stay a small,
  low-maintenance site.
- Don't restructure the component/folder pattern without discussing it first.
- Don't silently introduce tooling (linters, CI, test frameworks) — ask first.
