// The gate for every content-authoring batch.
//
// This must be green before any batch is committed. It checks STRUCTURE, which
// is everything a machine can check. It cannot check whether answerIndex points
// at the genuinely correct option -- that requires playing the topic in the
// browser and reading the explanations, which is a required manual step in the
// per-batch acceptance criteria.

import { describe, it, expect } from 'vitest'
import topics, { topicIds } from '../data/topics.js'
import { allQuestions } from '../data/questions/index.js'
import { validateBank, validateQuestion, dupKey } from '../lib/validateBank.js'

describe('question bank', () => {
  it('has no validation errors', () => {
    const { errors } = validateBank(allQuestions, topics)
    if (errors.length > 0) {
      const shown = errors
        .slice(0, 20)
        .map((e) => `  ${e.id ?? `#${e.index}`}: ${e.message}`)
        .join('\n')
      throw new Error(`${errors.length} invalid question(s):\n${shown}`)
    }
    expect(errors).toHaveLength(0)
  })

  it('has unique ids', () => {
    const ids = allQuestions.map((q) => q.id)
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
    expect(dupes).toEqual([])
  })

  it('every question id is prefixed with its topic', () => {
    const bad = allQuestions.filter((q) => !q.id.startsWith(`${q.topic}-`)).map((q) => q.id)
    expect(bad).toEqual([])
  })

  it('every question points at a topic that exists', () => {
    const known = new Set(topicIds)
    const bad = allQuestions.filter((q) => !known.has(q.topic)).map((q) => `${q.id} -> ${q.topic}`)
    expect(bad).toEqual([])
  })

  it('has no two questions with the same prompt and code', () => {
    const seen = new Map()
    const dupes = []
    for (const q of allQuestions) {
      const key = dupKey(q)
      if (seen.has(key)) dupes.push(`${q.id} == ${seen.get(key)}`)
      else seen.set(key, q.id)
    }
    expect(dupes).toEqual([])
  })
})

describe('topics.js', () => {
  it('defines 29 topics with unique ids', () => {
    expect(topics).toHaveLength(29)
    expect(new Set(topicIds).size).toBe(29)
  })

  it('targets sum to 464 with a 60/40 core-to-ml split', () => {
    const total = topics.reduce((a, t) => a + t.target, 0)
    const core = topics.filter((t) => t.group === 'core').reduce((a, t) => a + t.target, 0)
    expect(total).toBe(464)
    expect(core / total).toBeGreaterThan(0.55)
    expect(core / total).toBeLessThan(0.65)
  })

  it('gives every topic an id, title, icon, accent and group', () => {
    for (const t of topics) {
      expect(t.id, `${t.id}.id`).toMatch(/^[a-z0-9-]+$/)
      expect(t.title.length, `${t.id}.title`).toBeGreaterThan(2)
      expect(t.icon.length, `${t.id}.icon`).toBeGreaterThan(0)
      expect(t.accent, `${t.id}.accent`).toMatch(/^#[0-9a-f]{6}$/i)
      expect(['core', 'ml'], `${t.id}.group`).toContain(t.group)
    }
  })
})

describe('validateQuestion', () => {
  const known = new Set(['numpy'])
  const valid = {
    id: 'numpy-e-001',
    topic: 'numpy',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does np.zeros(3) return?',
    options: ['array([0., 0., 0.])', 'array([0, 0, 0])', '[0, 0, 0]', 'TypeError'],
    answerIndex: 0,
    explanation: 'np.zeros defaults to float64, so the values print with a trailing dot.',
  }

  it('accepts a well-formed question', () => {
    expect(validateQuestion(valid, known)).toEqual([])
  })

  it('rejects an id whose prefix disagrees with its topic', () => {
    const errs = validateQuestion({ ...valid, id: 'pandas-e-001' }, known)
    expect(errs.join(' ')).toMatch(/must start with "numpy-"/)
  })

  it('rejects an out-of-range answerIndex', () => {
    expect(validateQuestion({ ...valid, answerIndex: 4 }, known).join(' ')).toMatch(/out of range/)
  })

  it('rejects duplicated options', () => {
    const q = { ...valid, options: ['a value', 'a value', 'other', 'more'] }
    expect(validateQuestion(q, known).join(' ')).toMatch(/duplicates an earlier option/)
  })

  it('rejects a stray answer field left over from another type', () => {
    const q = { ...valid, items: ['a', 'b', 'c'] }
    expect(validateQuestion(q, known).join(' ')).toMatch(/must not define "items"/)
  })

  it('requires code on output and bug questions', () => {
    const q = { ...valid, type: 'output' }
    expect(validateQuestion(q, known).join(' ')).toMatch(/requires a non-empty code block/)
  })

  it('rejects an unknown topic', () => {
    expect(validateQuestion({ ...valid, topic: 'nope', id: 'nope-e-001' }, known).join(' ')).toMatch(
      /does not exist/,
    )
  })

  it('rejects non-ascending or complete answerIndices on multi', () => {
    const base = {
      ...valid,
      type: 'multi',
      options: ['a', 'b', 'c', 'd'],
      answerIndex: undefined,
    }
    delete base.answerIndex
    expect(validateQuestion({ ...base, answerIndices: [2, 1] }, known).join(' ')).toMatch(/ascending/)
    expect(validateQuestion({ ...base, answerIndices: [0, 1, 2, 3] }, known).join(' ')).toMatch(
      /cannot have every option correct/,
    )
  })

  it('rejects a truncated explanation', () => {
    expect(validateQuestion({ ...valid, explanation: 'too short' }, known).join(' ')).toMatch(
      /explanation must be/,
    )
  })
})
