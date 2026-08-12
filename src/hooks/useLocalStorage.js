import { useCallback, useState } from 'react'
import { safeGet, safeSet } from '../lib/storage.js'

/**
 * useState backed by localStorage, via the guarded wrapper in lib/storage.js.
 * When storage is unavailable this still behaves like ordinary state for the
 * session, so the UI never has to branch on it.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => safeGet(key, initialValue))

  const update = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next
        safeSet(key, resolved)
        return resolved
      })
    },
    [key],
  )

  return [value, update]
}

export default useLocalStorage
