import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Portable build -> dist-portable/onyeka-python-lab.html
//
// Emits ONE self-contained .html with all JS and CSS inlined, so the file can
// be emailed or copied to a USB stick and opened by double-click. No npm, no
// web server, no internet (except the Pyodide playground, which says so).
//
// This is a separate config file rather than an env var on the normal build
// because `BUILD_TARGET=portable vite build` does not work on Windows (cmd.exe
// has no inline env-var prefix) and cross-env would be another dependency.
//
// NOTE: the regular dist/ build CANNOT be opened via file:// -- browsers block
// external `<script type="module" src=...>` from the filesystem. Only the
// inline script that this config emits works there.
export default defineConfig({
  plugins: [
    react(),
    // If the portable file ever renders blank, flip removeViteModuleLoader to
    // false FIRST before changing anything else.
    viteSingleFile({ removeViteModuleLoader: true }),
  ],
  base: './',
  define: {
    __PORTABLE__: true,
  },
  build: {
    outDir: 'dist-portable',
    emptyOutDir: true,
    target: 'es2019',
    sourcemap: false,
  },
})
