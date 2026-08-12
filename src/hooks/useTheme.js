import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage.js'
import { STORAGE_KEYS } from '../lib/storage.js'

function systemPrefersLight() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-color-scheme: light)').matches
}

/**
 * Theme lives on <html data-theme>, so CSS custom properties propagate it to
 * the whole tree. No context provider is needed.
 */
export function useTheme() {
  const [theme, setTheme] = useLocalStorage(
    STORAGE_KEYS.theme,
    systemPrefersLight() ? 'light' : 'dark',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'light' ? '#ffffff' : '#0d1117')
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return { theme, setTheme, toggle }
}

export default useTheme
