// Live Python playground, powered by Pyodide.
//
// The screen renders instantly and makes NO network request until the user
// clicks Load. See pyodideLoader.js for why it is loaded that way.

import { useEffect, useRef, useState } from 'react'
import { loadPyodideRuntime, runPython, loadPackage, getPyodideState, PRESETS } from './pyodideLoader.js'
import { IS_PORTABLE } from '../lib/buildMode.js'
import { Button, Card, Badge, ProgressBar, Notice, BackLink } from '../components/ui.jsx'

const STARTER = 'print("Hello from Onyeka Python Lab!")\n\nfor i in range(3):\n    print(i, i ** 2)\n'

export default function PlaygroundScreen() {
  const [phase, setPhase] = useState(() => (getPyodideState() === 'ready' ? 'ready' : 'gate'))
  const [status, setStatus] = useState('')
  const [error, setError] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const [code, setCode] = useState(STARTER)
  const [output, setOutput] = useState('')
  const [running, setRunning] = useState(false)
  const timerRef = useRef(null)

  // Elapsed seconds during the download. Pyodide exposes no byte-level
  // progress, so this is what actually reassures the user nothing is frozen.
  useEffect(() => {
    if (phase !== 'loading') return undefined
    const t0 = Date.now()
    timerRef.current = setInterval(() => setElapsed(Math.floor((Date.now() - t0) / 1000)), 1000)
    return () => clearInterval(timerRef.current)
  }, [phase])

  async function startLoad() {
    setPhase('loading')
    setError(null)
    try {
      await loadPyodideRuntime(setStatus)
      setPhase('ready')
    } catch (err) {
      setError(String(err.message || err))
      setPhase('error')
    }
  }

  async function run() {
    setRunning(true)
    setOutput('')
    const result = await runPython(code)
    setOutput(result.error ? `${result.output}\n${result.error}`.trim() : result.output || '(no output)')
    setRunning(false)
  }

  async function applyPreset(preset) {
    setCode(preset.code)
    setOutput('')
    if (preset.needsPackage) {
      setRunning(true)
      try {
        await loadPackage(preset.needsPackage, setStatus)
      } catch (err) {
        setOutput(`Could not load ${preset.needsPackage}: ${err.message || err}`)
      }
      setRunning(false)
    }
  }

  function onKeyDown(e) {
    // Tab should indent, not move focus out of the editor.
    if (e.key === 'Tab') {
      e.preventDefault()
      const el = e.target
      const { selectionStart: s, selectionEnd: end } = el
      const next = `${code.slice(0, s)}    ${code.slice(end)}`
      setCode(next)
      requestAnimationFrame(() => el.setSelectionRange(s + 4, s + 4))
    }
  }

  return (
    <div className="stage">
      <div className="stage__bar">
        <BackLink />
        <span>🐍 Python Playground</span>
        <span />
      </div>

      {(phase === 'gate' || phase === 'loading' || phase === 'error') && (
        <Card>
          <h2>Run real Python in your browser</h2>
          <p className="muted mt-2">
            This uses Pyodide — a full CPython build compiled to WebAssembly. It downloads about
            10&nbsp;MB the first time you use it, then your browser caches it.
          </p>

          {IS_PORTABLE && (
            <Notice>
              You’re running the portable offline copy, so this one feature needs an internet
              connection. Everything else in this file works completely offline.
            </Notice>
          )}

          {phase === 'loading' && (
            <div className="mt-4">
              <ProgressBar indeterminate label="Loading the Python runtime" />
              <p className="muted mt-2 mono">
                {status} · {elapsed}s
              </p>
              <p className="muted mt-2">
                On a slow connection this can take 30–60 seconds.
              </p>
            </div>
          )}

          {phase === 'error' && (
            <div className="explain explain--wrong mt-4">
              <strong className="explain__verdict">Could not load Python</strong>
              {error}
            </div>
          )}

          {phase !== 'loading' && (
            <div className="mt-4">
              <Button variant="primary" block onClick={startLoad}>
                {phase === 'error' ? 'Try again' : 'Load Python runtime (~10 MB)'}
              </Button>
            </div>
          )}
        </Card>
      )}

      {phase === 'ready' && (
        <>
          <div className="row mt-3">
            {PRESETS.map((p) => (
              <Button key={p.label} variant="secondary" onClick={() => applyPreset(p)}>
                {p.label}
              </Button>
            ))}
          </div>

          <Card className="mt-3">
            <label className="muted" htmlFor="editor">
              Python
            </label>
            <textarea
              id="editor"
              className="code mt-2"
              rows={12}
              spellCheck={false}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <p className="muted mt-2">
              Tip: an infinite loop will freeze this tab — press F5 to reload if that happens.
            </p>

            <div className="mt-3">
              <Button variant="primary" block onClick={run} disabled={running}>
                {running ? 'Running…' : '▶ Run'}
              </Button>
            </div>

            {output && (
              <>
                <p className="muted mt-4">
                  Output <Badge>stdout</Badge>
                </p>
                <pre className="code mt-2" tabIndex={0} aria-label="Program output">
                  <code>{output}</code>
                </pre>
              </>
            )}
          </Card>
        </>
      )}
    </div>
  )
}
