// Boss Battle rules.
//
// Three lives, a countdown per question, a combo multiplier that rewards
// streaks, and difficulty that escalates as the run goes on.
//
// Pure -- no React, no window.

import { tierPoints } from './grading.js'

export const START_LIVES = 3
export const SECONDS_PER_QUESTION = 20
export const MAX_MULTIPLIER = 5

/** Difficulty escalation: easy for Q1-5, intermediate Q6-12, hard from Q13. */
export function tierForIndex(index) {
  if (index < 5) return 'easy'
  if (index < 12) return 'intermediate'
  return 'hard'
}

/** 1x, then +1 for every 3 consecutive correct answers, capped. */
export function comboMultiplier(streak) {
  const n = Number.isFinite(streak) && streak > 0 ? streak : 0
  return Math.min(MAX_MULTIPLIER, 1 + Math.floor(n / 3))
}

/** Points for a correct answer at `tier` with `streak` already banked. */
export function pointsFor(tier, streak) {
  return tierPoints(tier) * comboMultiplier(streak)
}

export function initBossState(questions = []) {
  return {
    questions,
    index: 0,
    lives: START_LIVES,
    score: 0,
    streak: 0,
    bestStreak: 0,
    over: questions.length === 0,
  }
}

/**
 * Resolve one answer.
 *   { type: 'ANSWER', correct }  a graded response
 *   { type: 'TIMEOUT' }          the clock ran out: costs a life, breaks the combo
 */
export function bossReducer(state, action) {
  if (state.over) return state

  switch (action.type) {
    case 'ANSWER': {
      if (action.correct) {
        const tier = tierForIndex(state.index)
        const gained = pointsFor(tier, state.streak)
        const streak = state.streak + 1
        return advance({
          ...state,
          score: state.score + gained,
          streak,
          bestStreak: Math.max(state.bestStreak, streak),
        })
      }
      return loseLife(state)
    }

    case 'TIMEOUT':
      return loseLife(state)

    case 'RESET':
      return initBossState(action.questions ?? state.questions)

    default:
      return state
  }
}

function loseLife(state) {
  const lives = state.lives - 1
  const next = { ...state, lives, streak: 0 }
  if (lives <= 0) return { ...next, over: true }
  return advance(next)
}

function advance(state) {
  const index = state.index + 1
  if (index >= state.questions.length) return { ...state, index: state.questions.length - 1, over: true }
  return { ...state, index }
}

export function currentBossQuestion(state) {
  return state.questions[state.index] || null
}
