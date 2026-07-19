# Onboarding (macOS)

From zero to editing and deploying this site, with no googling required.
Written so it still works if you come back to this in three years.

**How to use this guide:** run every command in a code block, in order, and
check the ✅ **Verify** line after each step before moving on. If a verify
step fails, fix it (see [Troubleshooting](#troubleshooting)) before
continuing — later steps depend on earlier ones.

> ⚠️ **Pasting tip:** don't paste the `# comment` parts of commands — plain
> zsh treats `#` as a literal argument and you'll get weird
> `ls: #: No such file or directory` errors. (Or run
> `setopt interactive_comments` first.)

---

## Fast path (machine already set up)

If this machine has worked on this project before:

```bash
git clone https://github.com/lucpellinger/lucpellinger.github.io.git
cd lucpellinger.github.io
./scripts/setup.sh
```

Site runs at http://localhost:5173. To publish: see [Deploying](#deploying).
That's it — everything below is for a fresh machine.

---

## Full setup (fresh Mac)

### Step 1 — Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

The installer prints two `echo ... >> ~/.zprofile` commands at the end —
**you must run those too**, then open a new terminal.

✅ **Verify:** `brew --version` prints a version number.

### Step 2 — Git

```bash
brew install git
```

✅ **Verify:** `git --version` prints a version number.

### Step 3 — nvm (Node version manager)

Three sub-steps. All three are required — installing the package alone is
**not** enough, and the config does nothing until you reload the shell.

**3a. Install the package:**

```bash
brew install nvm
mkdir -p ~/.nvm
```

**3b. Add nvm to your shell config.** Append this to `~/.zshrc`
(e.g. `nano ~/.zshrc`, paste at the bottom, save):

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$(brew --prefix nvm 2>/dev/null)/nvm.sh" ] && . "$(brew --prefix nvm)/nvm.sh"
```

**3c. Reload your shell** — `.zshrc` changes never apply to the terminal
you're already in:

```bash
exec zsh
```

✅ **Verify:** `nvm --version` prints a version number. If you get
`zsh: command not found: nvm`, one of 3a–3c was skipped — see
[Troubleshooting](#troubleshooting).

### Step 4 — Node.js

Run this **inside the project folder** if you've already cloned it (nvm then
reads the pinned version from `.nvmrc`), or use `--lts` otherwise:

```bash
nvm install    # inside the repo: installs the version pinned in .nvmrc
nvm use
```

or, outside the repo:

```bash
nvm install --lts
nvm use --lts
```

✅ **Verify:** `node -v` prints a version, and `which node` points into
`~/.nvm/versions/...` — **not** into `/opt/anaconda3` or `/usr/local`. If
conda is shadowing node, run `conda config --set auto_activate_base false`
and `exec zsh`.

### Step 5 — Yarn (via Corepack — do NOT `brew install yarn`)

This project pins its exact Yarn version in `package.json`. Corepack (ships
with Node) reads that pin automatically:

```bash
corepack enable
```

✅ **Verify:** `cd` into the project folder and run `yarn --version` — it
prints a 4.x version. (Outside the project it may differ; that's fine.)

### Step 6 — Clone and run

```bash
git clone https://github.com/lucpellinger/lucpellinger.github.io.git
cd lucpellinger.github.io
./scripts/setup.sh
```

The script re-checks steps 4–5, installs dependencies, and starts the dev
server. Use `./scripts/setup.sh --no-dev` to set up without starting it.

✅ **Verify:** http://localhost:5173 shows the site. Edit any `.jsx`/`.css`
file — the browser updates instantly.

---

## Everyday commands

| Command | Use |
|---|---|
| `yarn dev` | Local development with hot reload |
| `yarn lint` | Check code style (must pass before committing) |
| `yarn test` | Run the test suite once (`yarn test:watch` for watch mode) |
| `yarn build` | Production build → `dist/` |
| `yarn preview` | Serve the production build locally — final check before deploying |
| `./scripts/release.sh` | Release: all checks + merge to main + push, CI deploys (see below) |

## Deploying

One command does everything:

```bash
./scripts/release.sh
```

It refuses to run with uncommitted changes, runs lint + tests + build
locally, merges your branch into `main`, and pushes. GitHub Actions then
re-runs all checks and publishes to GitHub Pages — the live site always
matches a commit on `main` that passed CI. Watch progress at
github.com/LucPellinger/lucpellinger.github.io/actions.

If CI is ever broken and you need an emergency deploy from your machine,
`yarn deploy` still works (it also refuses a dirty tree — deploying
uncommitted changes once cost us a project's source).

✅ **Verify:** https://lucpellinger.eu shows your changes (hard-refresh with
⌘⇧R to skip the browser cache).

## Recommended workflow

1. Branch: `git checkout -b feature/my-change`
2. Develop with `yarn dev`; check desktop **and** mobile widths
   (⌘⇧M in Chrome dev tools).
3. `yarn lint && yarn test && yarn build` must all pass (CI enforces this
   on every push, but catching it locally is faster).
4. Run `./scripts/release.sh` — it merges to `main`, pushes, and CI deploys.

---

## Troubleshooting

**`zsh: command not found: nvm`** — in order of likelihood:
1. Shell not reloaded after editing `~/.zshrc` → `exec zsh`.
2. Package not actually installed → `brew list nvm` errors → `brew install nvm`.
3. The source line in `~/.zshrc` points to a path that doesn't exist →
   `ls "$(brew --prefix nvm)/nvm.sh"` must show a file. Use the
   `brew --prefix` form from Step 3b, which works on both Apple Silicon
   (`/opt/homebrew`) and Intel (`/usr/local`).

**`yarn: command not found`** — run `corepack enable`, then `exec zsh`. Also
confirm `which node` points into `~/.nvm` (Corepack belongs to that Node).

**`node`/`npm` behave strangely, `which node` shows `/opt/anaconda3/...`** —
conda's base env is shadowing nvm's Node:
`conda config --set auto_activate_base false` then `exec zsh`.

**Wrong Node version after 3 years away** — just run `nvm install && nvm use`
inside the repo; `.nvmrc` pins the version this project expects.

**Site works locally, broken after deploy** — check `dist/CNAME` exists after
`yarn build` and that `base: "/"` is unchanged in `vite.config.js`. A missing
CNAME detaches the lucpellinger.eu domain.

**Port 5173 already in use** — `yarn dev --port 3000`, or kill the other
Vite process.
