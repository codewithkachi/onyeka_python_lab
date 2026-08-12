import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Web build -> dist/
// `base: './'` keeps every asset URL relative, so the same dist/ works on a
// GitHub Pages project site (/repo/), a user site (/), Netlify and Vercel with
// no per-host configuration. Combined with hash routing there are no rewrite
// rules to maintain anywhere.
export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    __PORTABLE__: false,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2019',
    sourcemap: false,
  },
  test: {
    include: ['src/tests/**/*.test.js'],
    environment: 'node',
    reporters: 'default',
  },
})
