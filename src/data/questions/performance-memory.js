// Performance, Memory & Big-O
//
// Target: 14 questions = 2 flashcard + 1 order + 11 graded
// Graded tier split: easy 4 / intermediate 4 / hard 3
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'performance-memory-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'performance-memory-i-001',
    topic: 'performance-memory',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'Which technique most directly eliminates the redundant work in naive recursive algorithms such as fibonacci?',
    options: [
      'Rewriting the function as a class',
      'Memoisation, for example with functools.lru_cache',
      'Adding type annotations',
      'Converting the arguments to tuples',
    ],
    answerIndex: 1,
    explanation:
      'Naive fibonacci recomputes the same subproblems exponentially often. Caching results turns it from O(2^n) into O(n); @lru_cache adds this in a single line.',
    tags: ['memoisation', 'recursion', 'lru-cache'],
  },
  {
    id: 'performance-memory-e-001',
    topic: 'performance-memory',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is the average time complexity of checking "x in collection" for a list versus a set?',
    options: [
      'O(1) for both',
      'O(n) for a list, O(1) for a set',
      'O(1) for a list, O(n) for a set',
      'O(log n) for both',
    ],
    answerIndex: 1,
    explanation:
      'A list is scanned element by element, while a set hashes straight to the bucket. Converting a list to a set before repeated membership tests is one of the highest-value optimisations available.',
    tags: ['complexity', 'set', 'list'],
  },
  {
    id: 'performance-memory-h-001',
    topic: 'performance-memory',
    tier: 'hard',
    type: 'bug',
    prompt: 'Why is this loop quadratic rather than linear?',
    code: String.raw`out = ""
for chunk in chunks:
    out += chunk`,
    options: [
      'Strings are immutable, so each += builds a whole new string',
      'The loop variable shadows the list name',
      '+= is not defined for strings and falls back to repeated concat',
      'The list must be sorted before joining',
    ],
    answerIndex: 0,
    explanation:
      'Every += copies the accumulated text into a fresh string, so total work grows with the square of the output size. Use "".join(chunks), which allocates once.',
    tags: ['strings', 'complexity', 'join'],
  },
  {
    id: 'performance-memory-i-002',
    topic: 'performance-memory',
    tier: 'intermediate',
    type: 'multi',
    prompt: 'Which statements about optimising Python are sound advice?',
    options: [
      'Measure with a profiler before changing anything',
      'Prefer vectorised NumPy operations over element-by-element Python loops',
      'Use a generator instead of a list when you only iterate once over a large sequence',
      'Rewrite every loop as a comprehension, because comprehensions are always faster',
    ],
    answerIndices: [0, 1, 2],
    explanation:
      'Profile first, push heavy numeric work into NumPy, and stream with generators to save memory. Comprehensions are often slightly faster but not universally, and readability matters more.',
    tags: ['optimisation', 'profiling'],
  },
  {
    id: 'performance-memory-e-002',
    topic: 'performance-memory',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What does Big-O notation describe?',
    back: 'How the running time or memory of an algorithm GROWS as the input size grows, ignoring constant factors. O(n) work doubles when the input doubles; O(n^2) work quadruples.',
    tags: ['complexity'],
  },
]

export default questions
