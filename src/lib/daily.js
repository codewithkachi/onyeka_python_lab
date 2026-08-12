// Daily Challenge.
//
// The question set is derived from the DATE, not from stored state, so every
// device picks the same ten questions on the same day with no server involved.
//
// Pure -- no React, no window.

import { mulberry32, hashString, pickN } from './random.js'
import { gradableOnly } from './selectors.js'
import { todayKey, nextStreak } from './dates.js'

export const DAILY_COUNT = 10

/** Seed for a date key. Same date in, same seed out, on any machine. */
export function dailySeed(dateKey) {
  return hashString(`onyeka-python-lab:${dateKey}`)
}

/**
 * The ten questions for a given day. Sorted by id before sampling so the
 * result depends only on the date and the bank contents, never on the order
 * the topic files happened to be concatenated in.
 */
export function pickDailySet(bank, dateKey = todayKey(), count = DAILY_COUNT) {
  const pool = gradableOnly(bank).slice().sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
  return pickN(pool, count, mulberry32(dailySeed(dateKey)))
}

export function initDailyState() {
  return { lastCompletedKey: null, streak: 0, longest: 0, history: [] }
}

/** Has today's challenge already been completed? */
export function isCompletedToday(state, today = todayKey()) {
  return Boolean(state) && state.lastCompletedKey === today
}

/**
 * Record a completed run.
 *
 * Replaying the same day does not inflate the streak, and does not append a
 * second history entry -- it overwrites the day's score.
 */
export function completeDaily(state, score, total, today = todayKey()) {
  const s = state || initDailyState()
  const streak = nextStreak(s.lastCompletedKey, s.streak, today)
  const history = (s.history || []).filter((h) => h.key !== today)
  history.push({ key: today, score, total })

  return {
    lastCompletedKey: today,
    streak,
    longest: Math.max(s.longest || 0, streak),
    history: history.slice(-60),
  }
}
