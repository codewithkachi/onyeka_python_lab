// Seeded pseudo-random helpers.
//
// Deterministic by design: the Daily Challenge must pick the SAME questions on
// every device for a given date, and ordering puzzles must shuffle reproducibly
// within one attempt. Math.random() cannot do either.
//
// Pure -- no React, no window.

/**
 * mulberry32: a small, fast, well-distributed 32-bit PRNG.
 * Returns a function producing floats in [0, 1).
 */
export function mulberry32(seed) {
  let a = seed >>> 0
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** FNV-1a: turn a string such as "2026-08-12" into a 32-bit seed. */
export function hashString(str) {
  let h = 2166136261 >>> 0
  const s = String(str)
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/**
 * Fisher-Yates shuffle. Returns a NEW array; the input is never mutated.
 * @param {any[]} arr
 * @param {() => number} rng defaults to Math.random
 */
export function shuffle(arr, rng = Math.random) {
  const out = Array.from(arr)
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/**
 * Pick n distinct items. Clamps when n exceeds the array length, and returns
 * an empty array for non-positive n, so callers never have to guard.
 */
export function pickN(arr, n, rng = Math.random) {
  if (!Array.isArray(arr) || n <= 0) return []
  return shuffle(arr, rng).slice(0, Math.min(n, arr.length))
}

/**
 * Shuffle that guarantees a different order from the input when possible.
 * Used by ordering puzzles: presenting the already-correct order would give
 * the answer away.
 */
export function shuffleDifferent(arr, rng = Math.random) {
  if (!Array.isArray(arr) || arr.length < 2) return Array.from(arr || [])
  const same = (a, b) => a.every((v, i) => v === b[i])
  // All-identical inputs can never differ; the validator forbids them anyway.
  if (arr.every((v) => v === arr[0])) return Array.from(arr)
  let out = shuffle(arr, rng)
  for (let attempt = 0; attempt < 10 && same(out, arr); attempt += 1) {
    out = shuffle(arr, rng)
  }
  if (same(out, arr)) {
    // Deterministic fallback so this can never loop forever.
    out = Array.from(arr)
    ;[out[0], out[1]] = [out[1], out[0]]
  }
  return out
}
