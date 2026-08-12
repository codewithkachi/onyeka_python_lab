// localStorage with a guaranteed-safe fallback.
//
// The ONE module in src/lib/ permitted to touch a browser global, and every
// access is wrapped. This is not defensive padding -- it is load-bearing:
//
//   - Under an opaque origin (verified: a data: URL throws SecurityError with
//     "Storage is disabled"), reading localStorage throws on ACCESS, not just
//     on write. Even `typeof localStorage` can throw.
//   - Firefox's privacy.file_unique_origin gives each file:// document an
//     opaque origin, so the portable build may hit exactly this.
//   - Private-browsing modes and a full quota also throw on setItem.
//
// If any of that happens the app degrades to an in-memory Map for the session
// and shows a quiet notice. It must never white-screen over saved progress.

const PREFIX = 'opl.v1.'

const memory = new Map()

function probe() {
  try {
    const k = `${PREFIX}__probe__`
    window.localStorage.setItem(k, '1')
    window.localStorage.removeItem(k)
    return true
  } catch {
    return false
  }
}

/** True when real localStorage is usable. False means the memory fallback. */
export const storageAvailable = (() => {
  try {
    return typeof window !== 'undefined' && Boolean(window.localStorage) && probe()
  } catch {
    return false
  }
})()

export function safeGet(key, fallback = null) {
  const full = PREFIX + key
  try {
    if (storageAvailable) {
      const raw = window.localStorage.getItem(full)
      return raw === null ? fallback : JSON.parse(raw)
    }
    return memory.has(full) ? memory.get(full) : fallback
  } catch {
    // Corrupt JSON from an older version should not brick the app.
    return fallback
  }
}

export function safeSet(key, value) {
  const full = PREFIX + key
  try {
    if (storageAvailable) {
      window.localStorage.setItem(full, JSON.stringify(value))
    } else {
      memory.set(full, value)
    }
    return true
  } catch {
    // Quota exceeded or storage revoked mid-session: keep it in memory.
    try {
      memory.set(full, value)
    } catch {
      /* nothing further we can do */
    }
    return false
  }
}

export function safeRemove(key) {
  const full = PREFIX + key
  try {
    if (storageAvailable) window.localStorage.removeItem(full)
    memory.delete(full)
    return true
  } catch {
    return false
  }
}

/** Remove every key this app owns. Used by "Reset all progress". */
export function clearAll() {
  try {
    if (storageAvailable) {
      const doomed = []
      for (let i = 0; i < window.localStorage.length; i += 1) {
        const k = window.localStorage.key(i)
        if (k && k.startsWith(PREFIX)) doomed.push(k)
      }
      doomed.forEach((k) => window.localStorage.removeItem(k))
    }
    memory.clear()
    return true
  } catch {
    return false
  }
}

export const STORAGE_KEYS = {
  theme: 'theme',
  progress: 'progress',
  srs: 'srs',
  daily: 'daily',
  boss: 'boss',
  seen: 'seen',
}
