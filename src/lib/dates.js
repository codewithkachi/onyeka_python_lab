// Date helpers for the Daily Challenge streak.
//
// Everything works in LOCAL time on purpose: "today" should mean the user's
// today, not UTC's. Using toISOString() here would roll the day over at the
// wrong moment for anyone west of Greenwich.
//
// Pure -- no React, no window.

/** "YYYY-MM-DD" for a Date, in local time. */
export function dayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** "YYYY-MM-DD" for today. */
export function todayKey() {
  return dayKey(new Date())
}

/** Parse "YYYY-MM-DD" back into a local midnight Date. */
export function parseDayKey(key) {
  const [y, m, d] = String(key).split('-').map(Number)
  return new Date(y, (m || 1) - 1, d || 1)
}

/** Whole days from key a to key b (b - a). Negative if b is earlier. */
export function daysBetween(a, b) {
  const msPerDay = 24 * 60 * 60 * 1000
  const diff = parseDayKey(b).getTime() - parseDayKey(a).getTime()
  return Math.round(diff / msPerDay)
}

/** True when b is exactly the day after a. */
export function isConsecutiveDay(a, b) {
  return daysBetween(a, b) === 1
}

/**
 * Streak transition.
 *
 * same day     -> unchanged (replaying today must not inflate the streak)
 * next day     -> +1
 * any bigger gap, or no history -> reset to 1
 */
export function nextStreak(lastKey, streak, todayK = todayKey()) {
  if (!lastKey) return 1
  if (lastKey === todayK) return streak || 1
  if (isConsecutiveDay(lastKey, todayK)) return (streak || 0) + 1
  return 1
}
