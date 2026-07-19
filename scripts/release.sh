#!/usr/bin/env bash
#
# One-command release: verify everything locally, push main, let CI deploy.
#
#   ./scripts/release.sh
#
# What it does:
#   1. Refuses to run with uncommitted changes (predeploy-check.sh)
#   2. Runs lint + tests + build locally (fail fast, before anything is pushed)
#   3. Merges your current branch into main (if you're not already on main)
#   4. Pushes main — GitHub Actions then re-runs all checks and deploys
#
# The deploy itself happens in CI (.github/workflows/ci.yml), so the live
# site always corresponds to a pushed commit on main that passed checks.
#
set -euo pipefail
cd "$(dirname "$0")/.."

if command -v yarn >/dev/null 2>&1; then
  run_yarn() { yarn "$@"; }
else
  run_yarn() { corepack yarn "$@"; }
fi

branch=$(git branch --show-current)
echo "→ Releasing from branch: $branch"

echo "→ [1/5] Checking working tree..."
./scripts/predeploy-check.sh

echo "→ [2/5] Syncing dependencies..."
run_yarn install --immutable

echo "→ [3/5] Running checks locally (lint, test, build)..."
run_yarn lint
run_yarn test
run_yarn build
echo "✓ All local checks passed"

echo "→ [4/5] Updating main..."
git fetch origin
if [[ "$branch" != "main" ]]; then
  git checkout main
  git pull --ff-only origin main
  if ! git merge --no-edit "$branch"; then
    echo "✗ Merge conflict merging '$branch' into main." >&2
    echo "  Resolve the conflicts, commit, then run this script again from main." >&2
    exit 1
  fi
else
  git pull --rebase origin main
fi

echo "→ [5/5] Pushing main (CI will verify again and deploy)..."
git push origin main

if [[ "$branch" != "main" ]]; then
  git checkout "$branch"
fi

echo ""
echo "✓ Pushed. GitHub Actions is now deploying:"
echo "  https://github.com/LucPellinger/lucpellinger.github.io/actions"
echo "  Live in ~2-3 min at https://lucpellinger.eu (hard-refresh with Cmd+Shift+R)"
