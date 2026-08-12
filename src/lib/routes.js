// Hash routing.
//
// Hash rather than the History API because the app must run identically from
// localhost, a GitHub Pages subpath, Netlify, Vercel AND file:// (where
// pushState is unavailable). It also means no server rewrite rules anywhere.
//
// Pure -- no React, no window. useHashRoute() supplies the browser wiring.

export const ROUTES = [
  'home',
  'quiz',
  'boss',
  'daily',
  'flashcards',
  'ordering',
  'playground',
  'stats',
  'about',
  'notfound',
]

/**
 * "#/quiz/numpy" -> { name: 'quiz', params: { topicId: 'numpy' } }
 * "", "#", "#/" -> { name: 'home', params: {} }
 * anything else -> { name: 'notfound', params: {} }
 */
export function parseHash(hash) {
  const raw = String(hash || '').replace(/^#/, '')
  const path = raw.replace(/^\/+/, '').replace(/\/+$/, '')

  if (path === '') return { name: 'home', params: {} }

  const [head, ...rest] = path.split('/')

  switch (head) {
    case 'quiz': {
      const topicId = rest[0]
      if (!topicId) return { name: 'notfound', params: {} }
      return { name: 'quiz', params: { topicId } }
    }
    case 'boss':
    case 'daily':
    case 'flashcards':
    case 'ordering':
    case 'playground':
    case 'stats':
    case 'about':
      return { name: head, params: {} }
    default:
      return { name: 'notfound', params: {} }
  }
}

/** Inverse of parseHash. buildHash('quiz', { topicId }) -> "#/quiz/numpy" */
export function buildHash(name, params = {}) {
  if (name === 'home') return '#/'
  if (name === 'quiz') return `#/quiz/${params.topicId}`
  return `#/${name}`
}
