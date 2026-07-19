# WORK_ITEMS

Development roadmap for lucpellinger.eu. Status: `[ ]` open · `[~]` in progress · `[x]` done.

## Now (current session)

- [x] **Full-width layout** — removed the 1060px `.container` cap; full-bleed `.band` / `.band__inner` system (fluid inner width up to 1700px, `clamp()` padding). Alternating band backgrounds (`--band-bg`) for visual rhythm.
- [x] **Stabilize Hero** — replaced pixel-positioned social links (3 sets of hardcoded x/y per breakpoint) with a flex-based social rail; removed `transform: scale()` and negative-margin hacks.
- [x] **Scroll-reveal animations** — reusable `<Reveal>` component (`src/components/reveal/`), IntersectionObserver + CSS, respects `prefers-reduced-motion`.
- [x] **Journey section** — horizontal timeline of places lived (`src/components/sections/Journey/`, data in `utils/Data.js` → `journeyStops`). Precursor to the 3D globe. Notes for Munich/Porto left empty — fill in if wanted.

## Next

- [ ] **Extend "My Technology Skills"** — add Snowflake, dbt, and other current tools (candidates: Airflow/orchestration, cloud warehouses, BI tooling) to the skills cards in `utils/Data.js`. Curate rather than list everything — keep the section scannable. (Luc will do this later; not urgent.)

- [x] **Mobile optimization per component** — fixed the broken ≤400px type scale (h2 was smaller than h4; now monotonic), hero title sized down at ≤400px, interlude bands shrink on mobile (38vh vs 55vh), skills cards tighter gap. Slider/Card/Portfolio/Journey/Globe already had working breakpoints. Remaining: visual spot-check on real devices.
- [x] **Componentization pass** — everything reusable now: `layout/Band` (full-bleed band with alt/opaque/interlude/hero variants), `layout/SectionHeading`, `layout/ScrollDownHint`; inline Home sections extracted to `sections/Experience`, `sections/Academic/Education.jsx`, `sections/TechSkills`, `sections/LanguageSkills` (owns its progress-bar observer). `Home.jsx` is now a pure composition of Bands; `Home.css` is 5 lines.
- [x] **Portfolio filter tabs — role type** — tabs derived from `roleTypes` on `portfolioItems` ("All" + only roles that have projects). Current roles: AI Engineering, Data Engineering, Data Science, ML Engineering, Web Development. **Review the tagging in `utils/Data.js`** — assigned conservatively from repo contents; Analytics Engineering / Strategic Advisory appear automatically once a project is tagged with them.
- [x] **Portfolio filter — tech stack** — multi-select chips derived from `stack` field (OR within stack, AND with role tab). Empty state with clear-filters button. Covered by 4 new Vitest cases.
- [x] **Scroll-driven background animation** — canvas particle layer (`src/components/background/ScrollBackground.jsx`, no dependencies). ~200 dots morph by scroll position: scattered (hero) → puzzle cube missing a corner (Portfolio) → location pin (Journey) → X (Skills) → LP monogram (page bottom). Shapes form centered in dedicated empty "interlude" bands (`.band--interlude`, ~55vh) placed between sections, so the animation has its own stage. Theme-aware color, static fallback for `prefers-reduced-motion`. Band backgrounds became translucent rgba so the layer shows through.

## Later

- [x] **TypeScript migration** — done in one pass: `tsconfig.json` (strict, `allowJs`), `typescript ^5.8` devDep (TS 7 breaks yarn's compat patch — stay on 5.x for now), `yarn typecheck` script (also runs in `predeploy`). `utils/Data.ts` exports typed models (`SkillCard`, `Slide`, `PortfolioItem`, `RoleType`, `AcademicItem`, `JourneyStop`, ...); all active components/pages/context are `.tsx`/`.ts` with prop interfaces (PropTypes removed). Test files stay `.jsx` (work via allowJs).
  - **Run `yarn install` locally once** — package.json/yarn.lock changed, `.pnp.cjs` must be regenerated.
  - [x] `typescript-eslint ^8` added; `eslint.config.js` now lints `.ts/.tsx` (TS recommended + react-hooks/react-refresh).
  - [x] Dead code removed: `src/components/sections/Skills/`, `src/utils/ExperienceData.js`.
- [x] **3D globe journey** — built without three.js: canvas-2D orthographic dotted globe (`src/components/sections/GlobeJourney/`), lazy-loaded in its own chunk (~53KB gzip). Dotted land, DE/CH/PT highlighted denser + accent-colored, faint country borders, city pins with pulse, great-circle path, drag rotation, idle auto-spin, step chips + prev/next, auto-plays through the stops on first view. Toggle between Timeline and Globe views in the Journey section (`JourneySection.jsx`).
  - Chapter texts are lorem ipsum placeholders in `utils/Data.js` (`journeyStops[].chapter`) — **Luc fills in real wording** (Munich/Deloitte, Porsche Stuttgart-Zuffenhausen & Ludwigsburg, conceito Stuttgart, ...).
  - To highlight more countries: add the ISO numeric id in `scripts/generate-globe-data.mjs` and re-run it (needs `npm i --no-save world-atlas@2 topojson-client`).
  - Possible upgrade: three.js version with lighting/texture if the dotted look ever feels too plain; scrollytelling variant (sticky globe stepping per scroll) also an option.
- [ ] **Contact section** — currently commented out in `Home.jsx`; finish or remove.

## Content for Luc to fill in

- [ ] Badges section (`sections/Badges`, data in `utils/Data.ts` → `badges`): replace the three placeholders with real Accredible/Snowflake badges — set `title`, `date`, credential `url`, and `image` (hosted badge image URL; themed award icon shows when absent). To remove the section entirely: delete the `<Band><Reveal><Badges /></Reveal></Band>` block in `Home.tsx`, the `sections/Badges/` folder, and the `badges` export.

- [ ] Experience modal texts in `utils/Data.ts` (`slidesData`): `companyDescription`, `projectDescription`, `impact` are lorem placeholders; `skills` seeded from categories — extend; `logo` currently reuses the banner image — swap in real logo assets.
- [ ] Journey dates: Karlsruhe/Rapperswil/Lisbon filled from academic data; add `date_from`/`date_to` (YYYY-MM) for Mittelhaardt, Munich, Porto, Hamburg.
- [ ] Journey chapter texts still lorem (Munich → Deloitte, Porsche Zuffenhausen/Ludwigsburg, conceito Stuttgart, ...).

## Cleanup / debt

- [ ] Remove unused `src/components/sections/Skills/` (not imported anywhere).
- [ ] Hero "watch my introduction video" link was removed (was a dead `href=''` marked "not available") — re-add if a video ever exists.
- [ ] Consolidate duplicated hero styles that lived in both `Home.css` and `Hero.css`.
- [ ] Slider.css defines global `img` and `*` resets — scope them to the slider.
- [ ] Review image sizes: hero image is rendered at 60% scale of natural size; export a right-sized asset.
