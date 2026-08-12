// Spaced repetition, an SM-2-lite scheduler for flashcards.
//
// Three grades rather than SM-2's six: recalling a fact is really "no", "yes"
// or "instantly", and more buttons just slow the review down.
//
// Pure -- no React, no window.

import { dayKey, daysBetween, todayKey } from './dates.js'

export const EASE_MIN = 1.3
export const EASE_MAX = 2.8
export const EASE_START = 2.5

export const GRADES = ['again', 'good', 'easy']

export function newCard() {
  return { ease: EASE_START, intervalDays: 0, dueISO: todayKey(), reps: 0, lapses: 0 }
}

const clampEase = (e) => Math.min(EASE_MAX, Math.max(EASE_MIN, e))

function addDays(fromKey, days) {
  const d = new Date(`${fromKey}T00:00:00`)
  d.setDate(d.getDate() + Math.round(days))
  return dayKey(d)
}

/**
 * Advance a card after a review.
 *
 *   again -> interval resets to 0 (due again today), ease drops, lapse counted
 *   good  -> interval grows by the ease factor
 *   easy  -> interval grows faster and the ease rises slightly
 *
 * A first successful review is always 1 day, so a new card is not thrown
 * three weeks into the future on its very first sighting.
 */
export function reviewCard(card, grade, today = todayKey()) {
  const c = card && typeof card === 'object' ? card : newCard()
  const ease = Number.isFinite(c.ease) ? c.ease : EASE_START
  const reps = Number.isFinite(c.reps) ? c.reps : 0
  const lapses = Number.isFinite(c.lapses) ? c.lapses : 0
  const prev = Number.isFinite(c.intervalDays) ? c.intervalDays : 0

  if (grade === 'again') {
    return {
      ease: clampEase(ease - 0.2),
      intervalDays: 0,
      dueISO: today,
      reps: reps + 1,
      lapses: lapses + 1,
    }
  }

  let interval
  if (prev <= 0) {
    interval = 1
  } else {
    const good = Math.max(1, Math.round(prev * ease))
    if (grade === 'easy') {
      // Rounding alone is not enough: at prev=1 and ease=2.5 both good and
      // easy land on 3, so pressing Easy would gain the user nothing. Force
      // easy to be strictly the longer interval.
      interval = Math.max(Math.round(prev * ease * 1.3), good + 1)
    } else {
      interval = good
    }
  }
  interval = Math.max(1, Math.round(interval))

  const nextEase = grade === 'easy' ? clampEase(ease + 0.15) : clampEase(ease)

  return {
    ease: nextEase,
    intervalDays: interval,
    dueISO: addDays(today, interval),
    reps: reps + 1,
    lapses,
  }
}

/** Is this card due for review on `today`? Unseen cards are always due. */
export function isDue(card, today = todayKey()) {
  if (!card || !card.dueISO) return true
  return daysBetween(card.dueISO, today) >= 0
}

/** The subset of `cards` due today, unseen ones first. */
export function dueCards(cards, srsState, today = todayKey()) {
  const state = srsState || {}
  return cards
    .filter((c) => isDue(state[c.id], today))
    .sort((a, b) => {
      const ra = state[a.id]?.reps ?? -1
      const rb = state[b.id]?.reps ?? -1
      return ra - rb
    })
}
