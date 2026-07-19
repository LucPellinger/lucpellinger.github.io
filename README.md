# lucpellinger.eu — Personal Website & Portfolio

My personal website and online CV, live at **[lucpellinger.eu](https://lucpellinger.eu/)**.

A fast, responsive single-page site built with React and Vite, presenting my
experience, education, skills, and selected projects. Includes a light/dark
theme, interactive experience modals, and a downloadable résumé.

## Tech stack

| Layer | Choice |
|---|---|
| UI | [React 18](https://react.dev/) |
| Build tool / dev server | [Vite 5](https://vite.dev/) |
| Package manager | [Yarn 4](https://yarnpkg.com/) (Corepack) |
| Styling | Plain CSS, one co-located `.css` file per component (flexbox/grid) |
| Animation | [Motion](https://motion.dev/) |
| Icons | lucide-react, react-icons |
| Carousel | Swiper |
| Hosting | GitHub Pages + custom domain (`CNAME`) |

No CSS framework, no state-management library, no test suite (yet) — the site
is intentionally small and low-maintenance.

## Getting started

One command from fresh clone to running dev server:

```bash
./scripts/setup.sh
```

This checks Node (`.nvmrc` pins v22), enables Corepack/Yarn, installs
dependencies, and starts the dev server at http://localhost:5173.
Use `--no-dev` to set up without starting the server. Or do it manually:

```bash
yarn install   # install dependencies
yarn dev       # start dev server
```

New machine without Node? See **[ONBOARDING.md](./ONBOARDING.md)** for setting
up Homebrew, nvm, Node, and Corepack from scratch.

## Scripts

| Command | What it does |
|---|---|
| `yarn dev` | Start the Vite dev server with hot reload |
| `yarn build` | Production build into `dist/` (copies `CNAME` via `postbuild`) |
| `yarn preview` | Serve the production build locally |
| `yarn lint` | Run ESLint over the codebase |
| `yarn test` | Run the test suite (Vitest) once |
| `yarn test:watch` | Run tests in watch mode during development |
| `./scripts/release.sh` | **Release**: run all checks, merge to main, push — CI deploys |
| `yarn deploy` | Manual fallback deploy from your machine (avoid; use release.sh) |

## Project structure

```
src/
├── App.jsx               # Root component: theme provider, modals, layout
├── main.jsx              # Entry point
├── theme.css             # Global theme variables (light/dark)
├── pages/
│   └── Home.jsx          # Composes all page sections
├── components/
│   ├── header/           # Top navigation
│   ├── footer/           # Footer
│   ├── contact/          # Contact section
│   ├── card/             # Reusable card
│   ├── modal/            # CV + experience detail modals
│   ├── slider/           # Swiper-based slider
│   ├── switch/           # Theme toggle
│   └── sections/         # Page sections: Hero, Academic, Portfolio, Skills
├── context/              # ThemeContext + useTheme hook
├── utils/                # Content data (Data.js, ExperienceData.js)
└── assets/               # Images, organized per section
```

**Convention:** every component lives in its own folder with a `.jsx` file and
a co-located `.css` file imported by that component. Content (experience
entries, cards, languages) is kept as plain data in `src/utils/`, separate from
markup.

## Deployment

Deploys are automated via GitHub Actions (`.github/workflows/ci.yml`):
every push and PR runs lint + tests + build; pushes to `main` additionally
publish `dist/` to the `gh-pages` branch, which serves `lucpellinger.eu`.

To release:

```bash
./scripts/release.sh
```

This verifies everything locally first (clean tree, lint, tests, build),
merges your branch into `main`, and pushes — CI re-runs the checks and
deploys. The live site therefore always matches a commit on `main` that
passed all checks.

`yarn deploy` still exists as a manual fallback (it refuses to run from a
dirty working tree), but the normal path is `release.sh`.

## License

Personal project — content and design © Luc Pellinger. Feel free to browse the
code for inspiration, but please don't republish the content as your own.
