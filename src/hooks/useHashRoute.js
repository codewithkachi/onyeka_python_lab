import { useEffect, useState } from 'react'
import { parseHash, buildHash } from '../lib/routes.js'

/**
 * Subscribes to the URL hash. All the parsing logic lives in lib/routes.js so
 * it stays unit-testable; this hook is only the browser wiring.
 */
export function useHashRoute() {
  const [route, setRoute] = useState(() =>
    parseHash(typeof window === 'undefined' ? '' : window.location.hash),
  )

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

/** Imperative navigation. Assigning to location.hash fires hashchange. */
export function navigate(name, params) {
  window.location.hash = buildHash(name, params)
}

export default useHashRoute
