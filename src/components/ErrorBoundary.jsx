import React from 'react'

/**
 * Catches render-time crashes so one broken screen cannot white-screen the app.
 * Wraps the Pyodide playground in particular, where a third-party runtime can
 * throw from inside its own callbacks.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="card">
          <h2>Something went wrong here</h2>
          <p className="muted mt-2">
            {this.props.hint || 'The rest of the app is still fine — try going back.'}
          </p>
          <pre className="code mt-3">
            <code>{String(this.state.error)}</code>
          </pre>
          <div className="row mt-4">
            <button type="button" className="btn btn--secondary" onClick={() => this.setState({ error: null })}>
              Try again
            </button>
            <a className="btn btn--ghost" href="#/">
              Back to home
            </a>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
