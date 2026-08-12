import { describe, it, expect } from 'vitest'
import {
  initQuizState,
  quizReducer,
  scoreOf,
  canConfirm,
  currentQuestion,
  isLastQuestion,
  mistakesOf,
} from '../lib/quizEngine.js'

const mcq = (id, answerIndex) => ({
  id,
  topic: 'numpy',
  tier: 'easy',
  type: 'mcq',
  prompt: `q ${id}`,
  options: ['a', 'b', 'c', 'd'],
  answerIndex,
  explanation: 'because',
})

const five = [mcq('q1', 0), mcq('q2', 1), mcq('q3', 2), mcq('q4', 3), mcq('q5', 0)]

/** Answer the current question with `pick`, then advance. */
function answer(state, pick) {
  let s = quizReducer(state, { type: 'SELECT', index: pick })
  s = quizReducer(s, { type: 'CONFIRM' })
  return quizReducer(s, { type: 'NEXT' })
}

describe('initQuizState', () => {
  it('starts on the first question in the answering phase', () => {
    const s = initQuizState(five)
    expect(s.index).toBe(0)
    expect(s.phase).toBe('answering')
    expect(s.selection).toBeNull()
    expect(s.results).toEqual([])
  })

  it('is immediately finished when given no questions', () => {
    expect(initQuizState([]).phase).toBe('finished')
  })
})

describe('the confirm-then-reveal contract', () => {
  it('SELECT updates the selection while answering', () => {
    const s = quizReducer(initQuizState(five), { type: 'SELECT', index: 2 })
    expect(s.selection).toBe(2)
    expect(s.phase).toBe('answering')
  })

  it('SELECT is a no-op after CONFIRM', () => {
    let s = quizReducer(initQuizState(five), { type: 'SELECT', index: 1 })
    s = quizReducer(s, { type: 'CONFIRM' })
    const after = quizReducer(s, { type: 'SELECT', index: 3 })
    expect(after.selection).toBe(1)
    expect(after).toBe(s) // identical reference: nothing changed
  })

  it('CONFIRM with no selection is a no-op', () => {
    const s = initQuizState(five)
    expect(quizReducer(s, { type: 'CONFIRM' })).toBe(s)
  })

  it('CONFIRM appends exactly one result and reveals', () => {
    let s = quizReducer(initQuizState(five), { type: 'SELECT', index: 0 })
    s = quizReducer(s, { type: 'CONFIRM' })
    expect(s.phase).toBe('revealed')
    expect(s.results).toHaveLength(1)
    expect(s.results[0]).toMatchObject({ id: 'q1', correct: true })
  })

  it('NEXT before CONFIRM is a no-op', () => {
    const s = quizReducer(initQuizState(five), { type: 'SELECT', index: 0 })
    expect(quizReducer(s, { type: 'NEXT' })).toBe(s)
  })
})

describe('progression', () => {
  it('NEXT advances the index and clears the selection', () => {
    const s = answer(initQuizState(five), 0)
    expect(s.index).toBe(1)
    expect(s.selection).toBeNull()
    expect(s.phase).toBe('answering')
  })

  it('NEXT on the last question finishes instead of advancing', () => {
    let s = initQuizState(five)
    for (let i = 0; i < 5; i += 1) s = answer(s, 0)
    expect(s.phase).toBe('finished')
    expect(s.index).toBe(4)
  })

  it('isLastQuestion is only true on the final index', () => {
    let s = initQuizState(five)
    expect(isLastQuestion(s)).toBe(false)
    for (let i = 0; i < 4; i += 1) s = answer(s, 0)
    expect(isLastQuestion(s)).toBe(true)
  })
})

describe('derived score', () => {
  it('equals the count of correct results after a scripted run', () => {
    // Correct answers are 0,1,2,3,0. Answer 0 every time -> q1 and q5 correct.
    let s = initQuizState(five)
    for (let i = 0; i < 5; i += 1) s = answer(s, 0)
    expect(s.results).toHaveLength(5)
    expect(scoreOf(s)).toBe(2)
    expect(scoreOf(s)).toBe(s.results.filter((r) => r.correct).length)
  })

  it('is 0 for a fresh state', () => {
    expect(scoreOf(initQuizState(five))).toBe(0)
  })
})

describe('multi-select', () => {
  const multi = {
    id: 'm1',
    topic: 'numpy',
    tier: 'hard',
    type: 'multi',
    prompt: 'pick two',
    options: ['a', 'b', 'c', 'd'],
    answerIndices: [0, 2],
    explanation: 'because',
  }

  it('starts with an empty array and toggles membership', () => {
    let s = initQuizState([multi])
    expect(s.selection).toEqual([])
    s = quizReducer(s, { type: 'TOGGLE', index: 2 })
    s = quizReducer(s, { type: 'TOGGLE', index: 0 })
    expect(s.selection).toEqual([0, 2]) // kept sorted
    s = quizReducer(s, { type: 'TOGGLE', index: 0 })
    expect(s.selection).toEqual([2])
  })

  it('cannot confirm with nothing selected', () => {
    expect(canConfirm(initQuizState([multi]))).toBe(false)
  })

  it('scores an exact set match regardless of pick order', () => {
    let s = initQuizState([multi])
    s = quizReducer(s, { type: 'TOGGLE', index: 2 })
    s = quizReducer(s, { type: 'TOGGLE', index: 0 })
    s = quizReducer(s, { type: 'CONFIRM' })
    expect(s.results[0].correct).toBe(true)
  })
})

describe('RESET and review', () => {
  it('RESET returns a state deep-equal to a fresh one', () => {
    let s = answer(initQuizState(five), 3)
    s = quizReducer(s, { type: 'RESET' })
    expect(s).toEqual(initQuizState(five))
  })

  it('mistakesOf lists only the wrong answers with their questions', () => {
    let s = initQuizState(five)
    for (let i = 0; i < 5; i += 1) s = answer(s, 0)
    const wrong = mistakesOf(s)
    expect(wrong.map((m) => m.question.id)).toEqual(['q2', 'q3', 'q4'])
    expect(wrong[0].result.selection).toBe(0)
  })

  it('currentQuestion returns null past the end', () => {
    expect(currentQuestion({ questions: [], index: 0 })).toBeNull()
  })
})
