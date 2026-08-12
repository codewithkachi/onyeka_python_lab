import { describe, it, expect } from 'vitest'
import {
  tierForIndex,
  comboMultiplier,
  pointsFor,
  initBossState,
  bossReducer,
  START_LIVES,
} from '../lib/boss.js'
import { dailySeed, pickDailySet, initDailyState, completeDaily, isCompletedToday } from '../lib/daily.js'
import { newCard, reviewCard, isDue, dueCards, EASE_MIN, EASE_MAX } from '../lib/srs.js'
import { allQuestions } from '../data/questions/index.js'

// ------------------------------------------------------------------- boss

const bossQs = Array.from({ length: 20 }, (_, i) => ({
  id: `q${i}`,
  topic: 'numpy',
  tier: 'easy',
  type: 'mcq',
  prompt: 'p',
  options: ['a', 'b'],
  answerIndex: 0,
  explanation: 'e',
}))

describe('boss difficulty and scoring', () => {
  it('escalates tier at the 5 and 12 boundaries', () => {
    expect(tierForIndex(0)).toBe('easy')
    expect(tierForIndex(4)).toBe('easy')
    expect(tierForIndex(5)).toBe('intermediate')
    expect(tierForIndex(11)).toBe('intermediate')
    expect(tierForIndex(12)).toBe('hard')
    expect(tierForIndex(99)).toBe('hard')
  })

  it('steps the combo multiplier every 3 and caps at 5', () => {
    expect(comboMultiplier(0)).toBe(1)
    expect(comboMultiplier(2)).toBe(1)
    expect(comboMultiplier(3)).toBe(2)
    expect(comboMultiplier(6)).toBe(3)
    expect(comboMultiplier(9)).toBe(4)
    expect(comboMultiplier(12)).toBe(5)
    expect(comboMultiplier(100)).toBe(5)
  })

  it('multiplies tier points by the combo', () => {
    expect(pointsFor('easy', 0)).toBe(10)
    expect(pointsFor('easy', 3)).toBe(20)
    expect(pointsFor('hard', 6)).toBe(90)
  })
})

describe('boss run', () => {
  it('scores a correct answer and grows the streak', () => {
    let s = initBossState(bossQs)
    s = bossReducer(s, { type: 'ANSWER', correct: true })
    expect(s.score).toBe(10)
    expect(s.streak).toBe(1)
    expect(s.lives).toBe(START_LIVES)
    expect(s.index).toBe(1)
  })

  it('a wrong answer costs a life and resets the combo', () => {
    let s = initBossState(bossQs)
    s = bossReducer(s, { type: 'ANSWER', correct: true })
    s = bossReducer(s, { type: 'ANSWER', correct: false })
    expect(s.lives).toBe(START_LIVES - 1)
    expect(s.streak).toBe(0)
  })

  it('a timeout costs a life too', () => {
    const s = bossReducer(initBossState(bossQs), { type: 'TIMEOUT' })
    expect(s.lives).toBe(START_LIVES - 1)
  })

  it('ends the run at zero lives', () => {
    let s = initBossState(bossQs)
    for (let i = 0; i < START_LIVES; i += 1) s = bossReducer(s, { type: 'ANSWER', correct: false })
    expect(s.lives).toBe(0)
    expect(s.over).toBe(true)
  })

  it('ignores further actions once over', () => {
    let s = initBossState(bossQs)
    for (let i = 0; i < START_LIVES; i += 1) s = bossReducer(s, { type: 'ANSWER', correct: false })
    expect(bossReducer(s, { type: 'ANSWER', correct: true })).toBe(s)
  })

  it('remembers the best streak', () => {
    let s = initBossState(bossQs)
    for (let i = 0; i < 4; i += 1) s = bossReducer(s, { type: 'ANSWER', correct: true })
    s = bossReducer(s, { type: 'ANSWER', correct: false })
    expect(s.bestStreak).toBe(4)
    expect(s.streak).toBe(0)
  })
})

// ------------------------------------------------------------------ daily

describe('daily challenge', () => {
  it('gives the same seed and the same set for one date', () => {
    expect(dailySeed('2026-08-12')).toBe(dailySeed('2026-08-12'))
    const a = pickDailySet(allQuestions, '2026-08-12')
    const b = pickDailySet(allQuestions, '2026-08-12')
    expect(a.map((q) => q.id)).toEqual(b.map((q) => q.id))
  })

  it('gives a different set on a different date', () => {
    const a = pickDailySet(allQuestions, '2026-08-12').map((q) => q.id)
    const b = pickDailySet(allQuestions, '2026-08-13').map((q) => q.id)
    expect(a).not.toEqual(b)
  })

  it('returns ten distinct gradable questions', () => {
    const set = pickDailySet(allQuestions, '2026-08-12')
    expect(set).toHaveLength(10)
    expect(new Set(set.map((q) => q.id)).size).toBe(10)
    expect(set.every((q) => q.type !== 'flashcard' && q.type !== 'order')).toBe(true)
  })

  it('increments the streak on a consecutive day', () => {
    let s = initDailyState()
    s = completeDaily(s, 8, 10, '2026-08-11')
    expect(s.streak).toBe(1)
    s = completeDaily(s, 9, 10, '2026-08-12')
    expect(s.streak).toBe(2)
    expect(s.longest).toBe(2)
  })

  it('does not inflate the streak when replaying the same day', () => {
    let s = completeDaily(initDailyState(), 8, 10, '2026-08-12')
    s = completeDaily(s, 10, 10, '2026-08-12')
    expect(s.streak).toBe(1)
    expect(s.history.filter((h) => h.key === '2026-08-12')).toHaveLength(1)
    expect(s.history.at(-1).score).toBe(10) // the replay overwrote the score
  })

  it('resets the streak after a missed day but keeps the record', () => {
    let s = completeDaily(initDailyState(), 8, 10, '2026-08-10')
    s = completeDaily(s, 8, 10, '2026-08-11')
    s = completeDaily(s, 8, 10, '2026-08-20')
    expect(s.streak).toBe(1)
    expect(s.longest).toBe(2)
  })

  it('knows whether today is done', () => {
    const s = completeDaily(initDailyState(), 5, 10, '2026-08-12')
    expect(isCompletedToday(s, '2026-08-12')).toBe(true)
    expect(isCompletedToday(s, '2026-08-13')).toBe(false)
  })
})

// -------------------------------------------------------------------- srs

describe('spaced repetition', () => {
  it('a new card is due immediately', () => {
    expect(isDue(newCard(), '2026-08-12')).toBe(true)
    expect(isDue(undefined, '2026-08-12')).toBe(true)
  })

  it('the first successful review schedules one day out', () => {
    const c = reviewCard(newCard(), 'good', '2026-08-12')
    expect(c.intervalDays).toBe(1)
    expect(c.dueISO).toBe('2026-08-13')
  })

  it('good multiplies the interval by the ease', () => {
    let c = reviewCard(newCard(), 'good', '2026-08-12') // interval 1
    c = reviewCard(c, 'good', '2026-08-13')
    expect(c.intervalDays).toBe(3) // 1 * 2.5 rounded
  })

  it('easy grows faster and raises the ease', () => {
    const good = reviewCard(reviewCard(newCard(), 'good', '2026-08-12'), 'good', '2026-08-13')
    const easy = reviewCard(reviewCard(newCard(), 'good', '2026-08-12'), 'easy', '2026-08-13')
    expect(easy.intervalDays).toBeGreaterThan(good.intervalDays)
    expect(easy.ease).toBeGreaterThan(good.ease)
  })

  it('again resets the interval, drops the ease and counts a lapse', () => {
    let c = reviewCard(newCard(), 'good', '2026-08-12')
    c = reviewCard(c, 'again', '2026-08-13')
    expect(c.intervalDays).toBe(0)
    expect(c.dueISO).toBe('2026-08-13')
    expect(c.lapses).toBe(1)
    expect(c.ease).toBeLessThan(2.5)
  })

  it('clamps the ease into its range however it is graded', () => {
    let c = newCard()
    for (let i = 0; i < 20; i += 1) c = reviewCard(c, 'again', '2026-08-12')
    expect(c.ease).toBeGreaterThanOrEqual(EASE_MIN)
    for (let i = 0; i < 40; i += 1) c = reviewCard(c, 'easy', '2026-08-12')
    expect(c.ease).toBeLessThanOrEqual(EASE_MAX)
  })

  it('dueCards returns only what is due, unseen first', () => {
    const cards = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    const state = {
      a: { dueISO: '2026-09-01', reps: 3 }, // future
      b: { dueISO: '2026-08-01', reps: 2 }, // overdue
    }
    const due = dueCards(cards, state, '2026-08-12')
    expect(due.map((c) => c.id)).toEqual(['c', 'b']) // c unseen (reps -1) sorts first
  })
})
