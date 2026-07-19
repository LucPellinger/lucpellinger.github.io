#!/usr/bin/env bash
#
# Deploy guard: refuse to publish from a dirty working tree.
#
# Why: `yarn deploy` builds whatever is in the working folder — committed or
# not. Deploying uncommitted changes once caused a portfolio project to exist
# only on the live site, with no source in git (recovered later from the
# gh-pages bundle). The live site should always match a commit.
#
set -euo pipefail
cd "$(dirname "$0")/.."

if ! git diff --quiet HEAD --; then
  echo "✗ Uncommitted changes in tracked files:" >&2
  git status --short --untracked-files=no >&2
  echo "" >&2
  echo "Commit (or stash) before deploying, so the live site always matches a commit." >&2
  exit 1
fi

untracked=$(git ls-files --others --exclude-standard)
if [ -n "$untracked" ]; then
  echo "⚠ Untracked files present (not blocking, but if the site imports any of"
  echo "  them, they'd go live without being in git — consider committing them):"
  echo "$untracked" | sed 's/^/    /'
fi

echo "✓ Working tree clean — deploying from commit $(git rev-parse --short HEAD)"
