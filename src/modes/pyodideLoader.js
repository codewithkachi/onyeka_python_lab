// Pyodide loader.
//
// Pyodide is a ~10 MB WebAssembly build of CPython, loaded from a CDN on
// demand. Deliberate choices here:
//
//  - Nothing loads at app boot, or even when the playground screen mounts. The
//    user must click a button. A 10 MB download must never be a surprise.
//  - The classic UMD pyodide.js is injected as a <script> tag rather than
//    import()ed, so the bundler never sees it. A bare dynamic import would be
//    rewritten by Rollup and interacts badly with the single-file build's
//    inlineDynamicImports.
//  - Workers are not used: they are blocked under file://, which the portable
//    build runs from.

const PYODIDE_VERSION = 'v0.28.3'
const CDN = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`
const LOAD_TIMEOUT_MS = 90_000

let state = 'idle' // idle | loading | ready | error
let pyodide = null
let loadPromise = null

export function getPyodideState() {
  return state
}

function injectScript() {
  return new Promise((resolve, reject) => {
    if (window.loadPyodide) return resolve()
    const el = document.createElement('script')
    el.src = `${CDN}pyodide.js`
    el.onload = () => resolve()
    el.onerror = () => reject(new Error('Could not download the Pyodide loader.'))
    document.head.appendChild(el)
  })
}

/**
 * Load the runtime. Idempotent: concurrent callers share one promise.
 * @param {(msg: string) => void} onStatus progress messages for the UI
 */
export function loadPyodideRuntime(onStatus = () => {}) {
  if (state === 'ready') return Promise.resolve(pyodide)
  if (loadPromise) return loadPromise

  state = 'loading'

  const work = (async () => {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      throw new Error('You appear to be offline. The Python runtime downloads from the internet.')
    }
    onStatus('Fetching the Pyodide loader…')
    await injectScript()

    onStatus('Downloading the Python runtime (~10 MB)…')
    const py = await window.loadPyodide({ indexURL: CDN })

    onStatus('Starting the interpreter…')
    pyodide = py
    state = 'ready'
    onStatus('Ready')
    return py
  })()

  // Without this, a stalled fetch inside Pyodide hangs forever with no feedback.
  const timeout = new Promise((_, reject) =>
    setTimeout(
      () => reject(new Error('Timed out after 90 seconds. Check your connection and try again.')),
      LOAD_TIMEOUT_MS,
    ),
  )

  loadPromise = Promise.race([work, timeout]).catch((err) => {
    state = 'error'
    loadPromise = null
    throw err
  })

  return loadPromise
}

/** Load an extra package such as numpy. Requires the runtime to be ready. */
export async function loadPackage(name, onStatus = () => {}) {
  if (state !== 'ready') throw new Error('The Python runtime is not loaded yet.')
  onStatus(`Loading ${name}…`)
  await pyodide.loadPackage(name)
  onStatus(`${name} ready`)
}

/**
 * Run Python and return its stdout/stderr as text.
 *
 * stdout is redirected inside Python rather than via setStdout(), because that
 * API has moved between Pyodide versions and this approach works on all of
 * them. Errors are returned as text, never thrown, so a SyntaxError in user
 * code cannot crash React.
 */
export async function runPython(code) {
  if (state !== 'ready') throw new Error('The Python runtime is not loaded yet.')

  const preamble = `
import sys, io, traceback
__opl_out = io.StringIO()
__opl_prev_out, __opl_prev_err = sys.stdout, sys.stderr
sys.stdout = sys.stderr = __opl_out
`
  const epilogue = `
sys.stdout, sys.stderr = __opl_prev_out, __opl_prev_err
__opl_out.getvalue()
`

  try {
    await pyodide.runPythonAsync(preamble)
    try {
      await pyodide.runPythonAsync(code)
    } catch (err) {
      // Surface the Python traceback in the output pane.
      const text = await pyodide.runPythonAsync(epilogue)
      return { output: String(text || ''), error: String(err.message || err) }
    }
    const text = await pyodide.runPythonAsync(epilogue)
    return { output: String(text || ''), error: null }
  } catch (err) {
    return { output: '', error: String(err.message || err) }
  }
}

export const PRESETS = [
  {
    label: 'Comprehension',
    code: 'squares = [x**2 for x in range(10)]\nprint(squares)\nprint(sum(squares))',
  },
  {
    label: 'Dict + Counter',
    code: 'from collections import Counter\n\ntext = "mississippi"\nprint(Counter(text).most_common(3))',
  },
  {
    label: 'Classes',
    code: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return f"{self.name} says woof"\n\nprint(Dog("Rex").speak())',
  },
  {
    label: 'Generators',
    code: 'def fib():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\ng = fib()\nprint([next(g) for _ in range(10)])',
  },
  {
    label: 'NumPy (extra download)',
    code: 'import numpy as np\n\na = np.arange(12).reshape(3, 4)\nprint(a)\nprint("shape:", a.shape)\nprint("col means:", a.mean(axis=0))',
    needsPackage: 'numpy',
  },
]
