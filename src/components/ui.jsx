// Small shared presentational components.
//
// Grouped in one file deliberately: each is a handful of lines, and a dozen
// separate modules for them would be more navigation than substance.

import { buildHash } from '../lib/routes.js'

export function Button({ variant = 'secondary', block, className = '', ...rest }) {
  const classes = ['btn', `btn--${variant}`, block ? 'btn--block' : '', className]
    .filter(Boolean)
    .join(' ')
  return <button type="button" className={classes} {...rest} />
}

export function Card({ className = '', children, style }) {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  )
}

export function Badge({ tone, children, className = '' }) {
  return <span className={`badge ${tone ? `badge--${tone}` : ''} ${className}`}>{children}</span>
}

/**
 * Progress bar. `value` is 0-100. Pass indeterminate for unknown-length work
 * such as the Pyodide download, which omits aria-valuenow per ARIA guidance.
 */
export function ProgressBar({ value = 0, label = 'Progress', indeterminate = false }) {
  return (
    <div
      className={`progress ${indeterminate ? 'progress--indeterminate' : ''}`}
      role="progressbar"
      aria-label={label}
      aria-valuemin={indeterminate ? undefined : 0}
      aria-valuemax={indeterminate ? undefined : 100}
      aria-valuenow={indeterminate ? undefined : Math.round(value)}
    >
      <div className="progress__fill" style={indeterminate ? undefined : { width: `${value}%` }} />
    </div>
  )
}

/** Code block. tabIndex makes it scrollable by keyboard when it overflows. */
export function CodeBlock({ code, label = 'Python code' }) {
  if (!code) return null
  return (
    <pre className="code" tabIndex={0} aria-label={label}>
      <code>{String(code).replace(/^\n+|\n+$/g, '')}</code>
    </pre>
  )
}

export function EmptyState({ icon = '🚧', title, children, action }) {
  return (
    <div className="empty">
      <div className="empty__icon" aria-hidden="true">
        {icon}
      </div>
      <p className="empty__title">{title}</p>
      {children && <p>{children}</p>}
      {action}
    </div>
  )
}

export function Notice({ icon = '⚠️', children }) {
  return (
    <div className="notice">
      <span aria-hidden="true">{icon}</span>
      <span>{children}</span>
    </div>
  )
}

/** Polite live region: announces correct/incorrect to screen readers. */
export function ScreenReaderLive({ message }) {
  return (
    <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
      {message}
    </div>
  )
}

export function BackLink({ to = 'home', params, children = '← All topics' }) {
  return (
    <a className="btn btn--ghost" href={buildHash(to, params)}>
      {children}
    </a>
  )
}
