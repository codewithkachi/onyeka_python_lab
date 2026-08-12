import { describe, it, expect } from 'vitest'
import { mulberry32, hashString, shuffle, pickN, shuffleDifferent } from '../lib/random.js'

describe('mulberry32', () => {
  it('is deterministic for a given seed', () => {
    const a = mulberry32(42)
    const b = mulberry32(42)
    expect([a(), a(), a()]).toEqual([b(), b(), b()])
  })

  it('produces different streams for different seeds', () => {
    expect(mulberry32(1)()).not.toBe(mulberry32(2)())
  })

  it('stays within [0, 1)', () => {
    const rng = mulberry32(7)
    for (let i = 0; i < 200; i += 1) {
      const v = rng()
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
    }
  })
})

describe('hashString', () => {
  it('is stable for the same input', () => {
    expect(hashString('2026-08-12')).toBe(hashString('2026-08-12'))
  })
  it('differs for different inputs', () => {
    expect(hashString('2026-08-12')).not.toBe(hashString('2026-08-13'))
  })
  it('returns a non-negative 32-bit integer', () => {
    const h = hashString('anything')
    expect(Number.isInteger(h)).toBe(true)
    expect(h).toBeGreaterThanOrEqual(0)
  })
})

describe('shuffle', () => {
  const source = [1, 2, 3, 4, 5, 6, 7, 8]

  it('preserves length and multiset', () => {
    const out = shuffle(source, mulberry32(3))
    expect(out).toHaveLength(source.length)
    expect([...out].sort((a, b) => a - b)).toEqual(source)
  })

  it('does not mutate the input', () => {
    const copy = [...source]
    shuffle(source, mulberry32(3))
    expect(source).toEqual(copy)
  })

  it('is reproducible under a fixed seed', () => {
    expect(shuffle(source, mulberry32(9))).toEqual(shuffle(source, mulberry32(9)))
  })
})

describe('pickN', () => {
  const source = [1, 2, 3, 4, 5]

  it('returns n distinct items', () => {
    const out = pickN(source, 3, mulberry32(1))
    expect(out).toHaveLength(3)
    expect(new Set(out).size).toBe(3)
  })

  it('clamps when n exceeds the source length', () => {
    expect(pickN(source, 99, mulberry32(1))).toHaveLength(5)
  })

  it('returns an empty array for non-positive n or a non-array', () => {
    expect(pickN(source, 0)).toEqual([])
    expect(pickN(source, -1)).toEqual([])
    expect(pickN(null, 3)).toEqual([])
  })
})

describe('shuffleDifferent', () => {
  it('never returns the original order for a multi-item array', () => {
    const source = ['a', 'b', 'c', 'd']
    for (let seed = 0; seed < 50; seed += 1) {
      const out = shuffleDifferent(source, mulberry32(seed))
      expect(out).not.toEqual(source)
      expect([...out].sort()).toEqual([...source].sort())
    }
  })

  it('handles degenerate inputs without looping forever', () => {
    expect(shuffleDifferent([], mulberry32(1))).toEqual([])
    expect(shuffleDifferent(['only'], mulberry32(1))).toEqual(['only'])
    expect(shuffleDifferent(['x', 'x'], mulberry32(1))).toEqual(['x', 'x'])
  })
})
