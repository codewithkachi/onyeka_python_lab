// Read-only queries over the question bank.
//
// Pure -- no React, no window.

import { shuffle, pickN } from './random.js'

export const GRADED_TYPES = ['mcq', 'multi', 'output', 'bug']

export function byTopic(questions, topicId) {
  return questions.filter((q) => q.topic === topicId)
}

export function byTier(questions, tier) {
  return questions.filter((q) => q.tier === tier)
}

/** Everything that can be scored in a quiz (excludes flashcards and ordering). */
export function gradableOnly(questions) {
  return questions.filter((q) => GRADED_TYPES.includes(q.type))
}

export function flashcardsOnly(questions) {
  return questions.filter((q) => q.type === 'flashcard')
}

export function orderingOnly(questions) {
  return questions.filter((q) => q.type === 'order')
}

/**
 * A quiz run for one topic: graded questions, easy first, capped at `limit`.
 * Ordering within a tier is shuffled so a retry is not identical.
 */
export function buildTopicQuiz(questions, topicId, limit = 10, rng = Math.random) {
  const pool = gradableOnly(byTopic(questions, topicId))
  const tiers = ['easy', 'intermediate', 'hard']
  const ordered = tiers.flatMap((t) => shuffle(byTier(pool, t), rng))
  return ordered.slice(0, limit)
}

/** Count of questions per topic id. */
export function countsByTopic(questions) {
  const counts = {}
  for (const q of questions) counts[q.topic] = (counts[q.topic] || 0) + 1
  return counts
}

/** A mixed-difficulty set drawn from the whole bank, for Daily and Boss. */
export function buildMixedSet(questions, count, rng = Math.random) {
  return pickN(gradableOnly(questions), count, rng)
}

/** Graded questions of one tier from the whole bank, shuffled. */
export function tierPool(questions, tier, rng = Math.random) {
  return shuffle(byTier(gradableOnly(questions), tier), rng)
}
