#!/bin/bash
# Custom build script for Vercel

# Make tsc executable
chmod +x ./node_modules/.bin/tsc
chmod +x ./node_modules/typescript/bin/tsc

# Run TypeScript check
./node_modules/.bin/tsc -b

# Run Vite build
./node_modules/.bin/vite build
