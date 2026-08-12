import { describe, it, expect } from 'vitest'
import { isCorrect, scorePercent, tierPoints, gradeLabel, masteryBand, isGradable } from '../lib/grading.js'

const mcq = { type: 'mcq', options: ['a', 'b', 'c', 'd'], answerIndex: 2 }
const multi = { type: 'multi', options: ['a', 'b', 'c', 'd'], answerIndices: [0, 2] }
const order = { type: 'order', items: ['one', 'two', 'three'] }

describe('isCorrect - single choice', () => {
  it('accepts the right index', () => expect(isCorrect(mcq, 2)).toBe(true))
  it('rejects a wrong index', () => expect(isCorrect(mcq, 1)).toBe(false))
  it('rejects an unanswered question', () => expect(isCorrect(mcq, null)).toBe(false))
  it('rejects a non-integer selection', () => expect(isCorrect(mcq, '2')).toBe(false))
  it('applies the same rule to output and bug types', () => {
    expect(isCorrect({ ...mcq, type: 'output' }, 2)).toBe(true)
    expect(isCorrect({ ...mcq, type: 'bug' }, 0)).toBe(false)
  })
})

describe('isCorrect - multi select', () => {
  it('accepts an exact match in any order', () => {
    expect(isCorrect(multi, [0, 2])).toBe(true)
    expect(isCorrect(multi, [2, 0])).toBe(true)
  })
  it('rejects a partial answer', () => expect(isCorrect(multi, [0])).toBe(false))
  it('rejects a superset', () => expect(isCorrect(multi, [0, 1, 2])).toBe(false))
  it('rejects duplicates padding the length', () => expect(isCorrect(multi, [0, 0])).toBe(false))
  it('rejects a non-array selection', () => expect(isCorrect(multi, 0)).toBe(false))
})

describe('isCorrect - ordering', () => {
  it('accepts the exact sequence', () => {
    expect(isCorrect(order, ['one', 'two', 'three'])).toBe(true)
  })
  it('rejects a single swap', () => {
    expect(isCorrect(order, ['two', 'one', 'three'])).toBe(false)
  })
  it('rejects a wrong length', () => expect(isCorrect(order, ['one', 'two'])).toBe(false))
})

describe('isCorrect - edge cases', () => {
  it('returns false for a flashcard', () => {
    expect(isCorrect({ type: 'flashcard', back: 'x' }, 0)).toBe(false)
  })
  it('returns false for a null question', () => expect(isCorrect(null, 0)).toBe(false))
})

describe('scorePercent', () => {
  it('handles none, some and all', () => {
    expect(scorePercent(0, 5)).toBe(0)
    expect(scorePercent(3, 5)).toBe(60)
    expect(scorePercent(5, 5)).toBe(100)
  })
  it('guards divide-by-zero without producing NaN', () => {
    expect(scorePercent(0, 0)).toBe(0)
    expect(Number.isNaN(scorePercent(0, 0))).toBe(false)
    expect(scorePercent(1, undefined)).toBe(0)
  })
  it('rounds to the nearest whole percent', () => {
    expect(scorePercent(1, 3)).toBe(33)
    expect(scorePercent(2, 3)).toBe(67)
  })
})

describe('scoring helpers', () => {
  it('tierPoints rises with difficulty and falls back safely', () => {
    expect(tierPoints('easy')).toBe(10)
    expect(tierPoints('intermediate')).toBe(20)
    expect(tierPoints('hard')).toBe(30)
    expect(tierPoints('nonsense')).toBe(10)
  })

  it('gradeLabel bands the final percentage', () => {
    expect(gradeLabel(100).label).toBe('Outstanding')
    expect(gradeLabel(80).label).toBe('Strong')
    expect(gradeLabel(60).label).toBe('Getting there')
    expect(gradeLabel(10).label).toBe('Keep practising')
  })

  it('masteryBand matches the home-card colour bands', () => {
    expect(masteryBand(80)).toBe('good')
    expect(masteryBand(79)).toBe('mid')
    expect(masteryBand(50)).toBe('mid')
    expect(masteryBand(49)).toBe('low')
  })

  it('isGradable excludes flashcards only', () => {
    expect(isGradable({ type: 'mcq' })).toBe(true)
    expect(isGradable({ type: 'flashcard' })).toBe(false)
    expect(isGradable(null)).toBe(false)
  })
})
