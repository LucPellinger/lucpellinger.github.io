#!/usr/bin/env bash
#
# One-command bootstrap: fresh clone -> running dev server.
#
#   ./scripts/setup.sh            # install everything, then start `yarn dev`
#   ./scripts/setup.sh --no-dev   # install everything, but don't start the dev server
#
set -euo pipefail
cd "$(dirname "$0")/.."

# --- 1. Node ---------------------------------------------------------------
if ! command -v node >/dev/null 2>&1; then
  echo "✗ Node.js not found. Install it first (see ONBOARDING.md):" >&2
  echo "    brew install nvm && nvm install --lts" >&2
  exit 1
fi

wanted="$(tr -d '[:space:]' < .nvmrc)"
current="$(node -v)"
if [[ "${current#v}" != "$wanted"* ]]; then
  echo "⚠ Node $current active, project targets v$wanted (.nvmrc)."
  if command -v nvm >/dev/null 2>&1 || [[ -s "${NVM_DIR:-$HOME/.nvm}/nvm.sh" ]]; then
    echo "  Run: nvm install && nvm use"
  fi
  echo "  Continuing anyway — usually fine for nearby versions."
fi
echo "✓ Node $current"

# --- 2. Yarn (via Corepack, pinned in package.json) ------------------------
if ! command -v corepack >/dev/null 2>&1; then
  echo "✗ Corepack not found (it ships with Node >= 16.9). Reinstall Node via nvm." >&2
  exit 1
fi

# Prefer the global `yarn` shim; fall back to `corepack yarn` if enabling fails
# (e.g. no write permission to the Node bin directory).
corepack enable >/dev/null 2>&1 || true
if command -v yarn >/dev/null 2>&1; then
  run_yarn() { yarn "$@"; }
else
  echo "⚠ 'corepack enable' couldn't create the yarn shim; using 'corepack yarn' instead."
  run_yarn() { corepack yarn "$@"; }
fi
echo "✓ Yarn $(run_yarn --version)"

# --- 3. Dependencies -------------------------------------------------------
echo "→ Installing dependencies..."
run_yarn install
echo "✓ Dependencies installed"

# --- 4. Dev server ---------------------------------------------------------
if [[ "${1:-}" == "--no-dev" ]]; then
  echo "Done. Start developing with: yarn dev"
else
  echo "→ Starting dev server (Ctrl+C to stop)..."
  run_yarn dev
fi
