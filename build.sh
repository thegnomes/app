#!/bin/bash
# Custom build script for Vercel

set -euo pipefail

# Run TypeScript check + production bundle using project-local binaries.
npm exec -- tsc -b
npm exec -- vite build
