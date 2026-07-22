#!/bin/bash
set -euo pipefail

SOURCE_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET_DIR="${1:-$HOME/Downloads/second-sunrise-photo-update}"

if [ ! -d "$TARGET_DIR/.git" ]; then
  echo "Could not find a Git repository at: $TARGET_DIR"
  echo "Run this again with the correct path, for example:"
  echo "  bash APPLY_TO_EXISTING_REPO.sh /path/to/second-sunrise-photo-update"
  exit 1
fi

cd "$TARGET_DIR"
if [ -n "$(git status --porcelain)" ]; then
  echo "Your repository has uncommitted changes. Commit or stash them first, then rerun this script."
  exit 1
fi

BACKUP_BRANCH="backup-before-full-catalog-$(date +%Y%m%d-%H%M%S)"
git branch "$BACKUP_BRANCH"
echo "Created backup branch: $BACKUP_BRANCH"

rm -rf "$TARGET_DIR/public"
rsync -a --exclude='.git' --exclude='node_modules' --exclude='.next' "$SOURCE_DIR/" "$TARGET_DIR/"

echo
echo "Files applied. Now run:"
echo "  cd \"$TARGET_DIR\""
echo "  npm install"
echo "  npm run dev"
echo
echo "After reviewing http://localhost:3000, deploy with:"
echo "  git add ."
echo "  git commit -m \"Add full Second Sunrise catalog and lookbook\""
echo "  git push origin main"
