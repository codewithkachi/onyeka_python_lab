// Renames the portable build output to a human-friendly filename and reports
// its size. Run automatically by `npm run build:portable`.
//
// The size warning is deliberate: the portable file should be well under 1.5 MB.
// If it suddenly balloons, something got bundled that should not have been
// (most likely Pyodide, which must stay a CDN-only runtime load).
import { existsSync, renameSync, statSync } from 'node:fs'
import { join } from 'node:path'

const OUT_DIR = 'dist-portable'
const SRC = join(OUT_DIR, 'index.html')
const DEST = join(OUT_DIR, 'onyeka-python-lab.html')
const WARN_BYTES = 2 * 1024 * 1024

if (!existsSync(SRC)) {
  console.error(`\n  ERROR: ${SRC} not found. Did "vite build --config vite.config.portable.js" run?\n`)
  process.exit(1)
}

renameSync(SRC, DEST)

const bytes = statSync(DEST).size
const kb = (bytes / 1024).toFixed(0)

console.log(`\n  Portable build ready: ${DEST}  (${kb} KB)`)

if (bytes > WARN_BYTES) {
  console.warn(
    `  WARNING: that is over 2 MB. Something large was bundled that should not be.\n` +
      `  Check that Pyodide is still loaded from the CDN at runtime, not imported.`,
  )
} else {
  console.log('  Double-click it to run. No npm and no web server required.\n')
}
