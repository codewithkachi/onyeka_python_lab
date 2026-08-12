// Comprehensions & Generator Expressions
//
// Target: 16 questions = 2 flashcard + 1 order + 13 graded
// Graded tier split: easy 5 / intermediate 5 / hard 3
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'comprehensions-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'comprehensions-e-001',
    topic: 'comprehensions',
    tier: 'easy',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`print(list(map(lambda x: x ** 2, [1, 2, 3])))`,
    options: ['[1, 2, 3]', '[2, 4, 6]', '[1, 4, 9]', '[1, 8, 27]'],
    answerIndex: 2,
    explanation:
      'map applies the lambda to each element, squaring it. The equivalent comprehension [x ** 2 for x in nums] is usually considered more readable in Python.',
    tags: ['map', 'lambda'],
  },
  {
    id: 'comprehensions-e-002',
    topic: 'comprehensions',
    tier: 'easy',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`print([x for x in range(6) if x % 2 == 0])`,
    options: ['[0, 2, 4]', '[2, 4]', '[0, 1, 2, 3, 4, 5]', '[1, 3, 5]'],
    answerIndex: 0,
    explanation:
      'The if clause filters the source before the expression is collected, keeping the even values 0, 2 and 4. Note 0 is even and range(6) stops before 6.',
    tags: ['list-comprehension', 'filter'],
  },
  {
    id: 'comprehensions-i-001',
    topic: 'comprehensions',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What is the key practical difference between [x for x in data] and (x for x in data)?',
    options: [
      'The parentheses version is a tuple comprehension',
      'The parentheses version is a lazy generator that yields items one at a time',
      'They are identical; the brackets are only style',
      'The parentheses version evaluates in reverse order',
    ],
    answerIndex: 1,
    explanation:
      'There is no tuple comprehension. Parentheses build a GENERATOR that produces values on demand, using constant memory - ideal for large or infinite sources.',
    tags: ['generator-expression', 'laziness'],
  },
  {
    id: 'comprehensions-i-002',
    topic: 'comprehensions',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`gen = (x for x in range(3))
print(sum(gen), sum(gen))`,
    options: ['3 3', '3 0', '0 3', 'TypeError'],
    answerIndex: 1,
    explanation:
      'A generator is exhausted after one full pass, so the second sum sees nothing and returns 0. Build a list first if you need to iterate more than once.',
    tags: ['generator-expression', 'exhaustion', 'pitfall'],
  },
  {
    id: 'comprehensions-h-001',
    topic: 'comprehensions',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which of these comprehension forms are valid Python?',
    options: [
      '{k: v for k, v in pairs}',
      '{x for x in data}',
      '[x for x in data for y in x]',
      '[x, y for x in data]',
    ],
    answerIndices: [0, 1, 2],
    explanation:
      'Dict and set comprehensions exist, and multiple for clauses nest left to right. The last is a SyntaxError: an unparenthesised comma is not a valid element expression, so you need [(x, y) for ...].',
    tags: ['syntax', 'dict-comprehension', 'set-comprehension'],
  },
]

export default questions
