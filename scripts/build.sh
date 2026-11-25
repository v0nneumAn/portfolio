#!/bin/bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "${REPO_ROOT}/app"

echo "[*] Installing dependencies..."
npm ci

echo "[*] Building site..."
npm run build

echo "[*] Build complete: ${REPO_ROOT}/app/dist"
