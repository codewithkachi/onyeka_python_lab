import { describe, it, expect } from 'vitest'
import { dayKey, todayKey, parseDayKey, daysBetween, isConsecutiveDay, nextStreak } from '../lib/dates.js'

describe('dayKey', () => {
  it('formats as YYYY-MM-DD with zero padding', () => {
    expect(dayKey(new Date(2026, 0, 5))).toBe('2026-01-05')
    expect(dayKey(new Date(2026, 11, 31))).toBe('2026-12-31')
  })

  it('todayKey matches the expected shape', () => {
    expect(todayKey()).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('uses local time, so late-evening dates do not roll over', () => {
    // 23:30 local would already be tomorrow in UTC for positive offsets.
    expect(dayKey(new Date(2026, 5, 10, 23, 30))).toBe('2026-06-10')
  })

  it('round-trips through parseDayKey', () => {
    expect(dayKey(parseDayKey('2026-03-09'))).toBe('2026-03-09')
  })
})

describe('daysBetween', () => {
  it('counts forward and backward', () => {
    expect(daysBetween('2026-08-12', '2026-08-13')).toBe(1)
    expect(daysBetween('2026-08-13', '2026-08-12')).toBe(-1)
    expect(daysBetween('2026-08-12', '2026-08-12')).toBe(0)
  })

  it('crosses a month boundary', () => {
    expect(daysBetween('2026-01-31', '2026-02-01')).toBe(1)
  })

  it('crosses a year boundary', () => {
    expect(daysBetween('2025-12-31', '2026-01-01')).toBe(1)
  })

  it('handles a leap day', () => {
    expect(daysBetween('2028-02-28', '2028-02-29')).toBe(1)
    expect(daysBetween('2028-02-29', '2028-03-01')).toBe(1)
  })

  it('is unaffected by a daylight-saving transition', () => {
    // Late March in most of Europe/North America shifts the clock by an hour.
    expect(daysBetween('2026-03-28', '2026-03-29')).toBe(1)
    expect(daysBetween('2026-10-24', '2026-10-25')).toBe(1)
  })
})

describe('isConsecutiveDay', () => {
  it('is true only for exactly one day later', () => {
    expect(isConsecutiveDay('2026-08-12', '2026-08-13')).toBe(true)
    expect(isConsecutiveDay('2026-08-12', '2026-08-12')).toBe(false)
    expect(isConsecutiveDay('2026-08-12', '2026-08-14')).toBe(false)
  })
})

describe('nextStreak', () => {
  it('starts at 1 with no history', () => {
    expect(nextStreak(null, 0, '2026-08-12')).toBe(1)
  })

  it('increments on a consecutive day', () => {
    expect(nextStreak('2026-08-11', 4, '2026-08-12')).toBe(5)
  })

  it('is unchanged when replaying the same day', () => {
    expect(nextStreak('2026-08-12', 4, '2026-08-12')).toBe(4)
  })

  it('resets to 1 after a gap', () => {
    expect(nextStreak('2026-08-09', 9, '2026-08-12')).toBe(1)
  })
})
