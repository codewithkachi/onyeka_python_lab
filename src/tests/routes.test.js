import { describe, it, expect } from 'vitest'
import { parseHash, buildHash } from '../lib/routes.js'

describe('parseHash', () => {
  it('treats every empty form as home', () => {
    for (const h of ['', '#', '#/', '/', undefined, null]) {
      expect(parseHash(h)).toEqual({ name: 'home', params: {} })
    }
  })

  it('parses the simple named routes', () => {
    for (const name of ['boss', 'daily', 'flashcards', 'ordering', 'playground', 'stats', 'about']) {
      expect(parseHash(`#/${name}`)).toEqual({ name, params: {} })
    }
  })

  it('parses a quiz route with its topic id', () => {
    expect(parseHash('#/quiz/numpy')).toEqual({ name: 'quiz', params: { topicId: 'numpy' } })
    expect(parseHash('#/quiz/oop-advanced')).toEqual({
      name: 'quiz',
      params: { topicId: 'oop-advanced' },
    })
  })

  it('rejects a quiz route with no topic', () => {
    expect(parseHash('#/quiz')).toEqual({ name: 'notfound', params: {} })
    expect(parseHash('#/quiz/')).toEqual({ name: 'notfound', params: {} })
  })

  it('maps anything unknown to notfound', () => {
    expect(parseHash('#/nope')).toEqual({ name: 'notfound', params: {} })
    expect(parseHash('#/quiz/a/b/c').name).toBe('quiz') // extra segments ignored
  })

  it('tolerates trailing slashes', () => {
    expect(parseHash('#/stats/')).toEqual({ name: 'stats', params: {} })
  })
})

describe('buildHash', () => {
  it('round-trips every route', () => {
    const cases = [
      ['home', {}],
      ['boss', {}],
      ['daily', {}],
      ['flashcards', {}],
      ['ordering', {}],
      ['playground', {}],
      ['stats', {}],
      ['about', {}],
      ['quiz', { topicId: 'pandas' }],
    ]
    for (const [name, params] of cases) {
      const hash = buildHash(name, params)
      expect(parseHash(hash)).toEqual({ name, params })
    }
  })

  it('builds the expected strings', () => {
    expect(buildHash('home')).toBe('#/')
    expect(buildHash('quiz', { topicId: 'numpy' })).toBe('#/quiz/numpy')
    expect(buildHash('stats')).toBe('#/stats')
  })
})
