# Onboarding (macOS)

Everything needed to go from a fresh Mac to running this site locally.
Estimated time: ~10 minutes.

## 1. Prerequisites

### Homebrew

macOS package manager, used to install everything else:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Git

```bash
brew install git
```

### Node.js (via nvm)

Use **nvm** rather than installing Node directly — it lets you switch Node
versions per project without breaking other tools:

```bash
brew install nvm
mkdir -p ~/.nvm
```

Add to `~/.zshrc`:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"
```

Then restart your terminal and install a current LTS Node:

```bash
nvm install --lts
nvm use --lts
node -v   # should print v22.x or newer
```

### Yarn 4 (via Corepack)

This project pins **Yarn 4** in `package.json` (`packageManager` field).
Don't install Yarn globally with brew or npm — enable Corepack instead, which
ships with Node and automatically uses the pinned version:

```bash
corepack enable
```

That's it. The first `yarn` command run inside the repo will fetch the exact
pinned Yarn version.

## 2. Clone and run

```bash
git clone https://github.com/lucpellinger/lucpellinger.github.io.git
cd lucpellinger.github.io
yarn install
yarn dev
```

Open http://localhost:5173 — edits to any `.jsx`/`.css` file hot-reload
instantly.

## 3. Everyday commands

| Command | Use |
|---|---|
| `yarn dev` | Local development with hot reload |
| `yarn lint` | Check code style before committing |
| `yarn build` | Production build → `dist/` |
| `yarn preview` | Test the production build locally (do this before deploying) |
| `yarn deploy` | Publish to GitHub Pages (`gh-pages` branch) |

## 4. Recommended workflow

1. Create a branch for the change: `git checkout -b feature/my-change`
2. Develop with `yarn dev`, checking both desktop and mobile widths
   (browser dev tools → device toolbar, ⌘⇧M in Chrome).
3. Run `yarn lint` and `yarn build` before committing — the build must pass
   cleanly since there's no CI or test suite to catch regressions.
4. Merge to `main`, then `yarn deploy` when ready to publish.

## 5. Troubleshooting

**`yarn: command not found`** — run `corepack enable` again, and make sure
you're using the nvm-managed Node (`which node` should point into `~/.nvm`).

**Wrong Yarn version / strange install errors** — delete nothing manually;
just confirm Corepack is active: `corepack enable && yarn --version` should
match the version pinned in `package.json`.

**Site works locally but is broken after deploy** — check that `dist/CNAME`
exists after `yarn build` (the `postbuild` script copies it). A missing CNAME
detaches the custom domain. Also verify `base: "/"` is still set in
`vite.config.js` — changing it breaks asset paths on lucpellinger.eu.

**Port 5173 already in use** — `yarn dev --port 3000` or kill the other Vite
process.
