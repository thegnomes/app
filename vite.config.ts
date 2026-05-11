import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        scene02: path.resolve(__dirname, 'scene02.html'),
        mywork: path.resolve(__dirname, 'mywork.html'),
        portfolio: path.resolve(__dirname, 'portfolio.html'),
        'toto-portfolio': path.resolve(__dirname, 'toto-portfolio.html'),
        'nft11-portfolio': path.resolve(__dirname, 'nft11-portfolio.html'),
        'oxytap-portfolio': path.resolve(__dirname, 'oxytap-portfolio.html'),
      },
    },
  },
});
