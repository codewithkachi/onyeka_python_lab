// Dictionaries & Sets
//
// Target: 16 questions = 2 flashcard + 1 order + 13 graded
// Graded tier split: easy 5 / intermediate 5 / hard 3
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'dicts-sets-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'dicts-sets-e-001',
    topic: 'dicts-sets',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does the set literal {1, 2, 2, 3} evaluate to?',
    options: ['{1, 2, 2, 3}', '{1, 2, 3}', '[1, 2, 3]', 'ValueError'],
    answerIndex: 1,
    explanation:
      'A set stores each distinct value once, so the repeated 2 collapses. This makes set() the idiomatic way to deduplicate, at the cost of losing order guarantees.',
    tags: ['set', 'deduplication'],
  },
  {
    id: 'dicts-sets-e-002',
    topic: 'dicts-sets',
    tier: 'easy',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`d = {'a': 1}
print(d.get('b', 0))`,
    options: ['None', 'KeyError', '0', '1'],
    answerIndex: 2,
    explanation:
      'get(key, default) returns the default when the key is missing instead of raising. With no default it returns None, whereas d["b"] would raise KeyError.',
    tags: ['dict', 'get'],
  },
  {
    id: 'dicts-sets-i-001',
    topic: 'dicts-sets',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`d = {'a': 1, 'b': 2}
d['a'] = 3
print(len(d))`,
    options: ['1', '2', '3', 'KeyError'],
    answerIndex: 1,
    explanation:
      'Assigning to an existing key REPLACES its value rather than adding an entry, so the dict still holds two keys. Keys are unique; values are not.',
    tags: ['dict', 'keys'],
  },
  {
    id: 'dicts-sets-i-002',
    topic: 'dicts-sets',
    tier: 'intermediate',
    type: 'bug',
    prompt: 'Why does this raise TypeError?',
    code: String.raw`seen = set()
seen.add([1, 2])`,
    options: [
      'A list is mutable and therefore unhashable, so it cannot go in a set',
      'add() only accepts a single scalar value',
      'Sets cannot hold more than one element at a time',
      'The set must be created with a size in advance',
    ],
    answerIndex: 0,
    explanation:
      'Sets and dict keys require hashable objects, and Python refuses to hash mutable containers because a later mutation would corrupt the lookup. Use a tuple: seen.add((1, 2)).',
    tags: ['set', 'hashable'],
  },
  {
    id: 'dicts-sets-h-001',
    topic: 'dicts-sets',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which of these can legally be used as a dictionary key?',
    options: ['(1, 2)', "'name'", '[1, 2]', '3.5'],
    answerIndices: [0, 1, 3],
    explanation:
      'Keys must be hashable. Tuples of hashable items, strings and floats all qualify. A list does not, because mutating it after insertion would leave it unfindable in its own dict.',
    tags: ['dict', 'hashable'],
  },
  {
    id: 'dicts-sets-e-003',
    topic: 'dicts-sets',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the average-case time complexity of a dict or set lookup, and why does it matter?',
    back: 'O(1), because both are hash tables. Checking membership in a list is O(n), so converting a large list to a set before repeated "in" tests turns an O(n*m) loop into O(n+m).',
    tags: ['dict', 'set', 'complexity'],
  },
]

export default questions
