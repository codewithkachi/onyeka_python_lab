// Lists & Tuples
//
// Target: 18 questions = 2 flashcard + 1 order + 15 graded
// Graded tier split: easy 6 / intermediate 5 / hard 4
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'lists-tuples-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'lists-tuples-e-001',
    topic: 'lists-tuples',
    tier: 'easy',
    type: 'mcq',
    prompt: 'How do you add an element x to the end of a list lst?',
    options: ['lst.add(x)', 'lst.append(x)', 'lst.push(x)', 'lst.insert(x)'],
    answerIndex: 1,
    explanation:
      'append(x) adds a single item to the end. add() belongs to sets, push() does not exist in Python, and insert() requires an index as its first argument.',
    tags: ['list', 'methods'],
  },
  {
    id: 'lists-tuples-e-002',
    topic: 'lists-tuples',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which of these creates a tuple containing a single element?',
    options: ['(1)', '(1,)', '[1]', '{1}'],
    answerIndex: 1,
    explanation:
      'It is the COMMA that makes a tuple, not the parentheses. (1) is just the integer 1 in brackets; (1,) is a one-element tuple. [1] is a list and {1} is a set.',
    tags: ['tuple', 'syntax'],
  },
  {
    id: 'lists-tuples-e-003',
    topic: 'lists-tuples',
    tier: 'easy',
    type: 'mcq',
    prompt: "What does list('abc') return?",
    options: ["['abc']", "['a', 'b', 'c']", "('a', 'b', 'c')", 'TypeError'],
    answerIndex: 1,
    explanation:
      'list() consumes any iterable, and iterating a string yields its characters one at a time. To get ["abc"] you would write ["abc"] or list(["abc"]).',
    tags: ['list', 'iterables'],
  },
  {
    id: 'lists-tuples-e-004',
    topic: 'lists-tuples',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which of these built-in types is immutable?',
    options: ['list', 'dict', 'set', 'tuple'],
    answerIndex: 3,
    explanation:
      'A tuple cannot be changed after creation, which is why tuples can be dict keys and set members. Lists, dicts and sets are all mutable and therefore unhashable.',
    tags: ['tuple', 'immutability'],
  },
  {
    id: 'lists-tuples-i-001',
    topic: 'lists-tuples',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`a = [1, 2, 3]
b = a
b.append(4)
print(a)`,
    options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4, 1, 2, 3]', 'Error'],
    answerIndex: 1,
    explanation:
      'b = a copies the REFERENCE, not the list, so both names point at one object and the append is visible through either. Use a.copy() or list(a) for an independent shallow copy.',
    tags: ['aliasing', 'mutation'],
  },
  {
    id: 'lists-tuples-i-002',
    topic: 'lists-tuples',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`nums = [1, 2, 3, 4, 5]
print(nums[1:4])`,
    options: ['[1, 2, 3, 4]', '[2, 3, 4]', '[2, 3, 4, 5]', '[1, 2, 3]'],
    answerIndex: 1,
    explanation:
      'Slicing is start-inclusive and stop-exclusive, so [1:4] takes indices 1, 2 and 3. A handy consequence: the length of the slice is stop - start.',
    tags: ['slicing'],
  },
  {
    id: 'lists-tuples-h-001',
    topic: 'lists-tuples',
    tier: 'hard',
    type: 'bug',
    prompt: 'This code is meant to remove every even number, but leaves some behind. Why?',
    code: String.raw`nums = [1, 2, 4, 6, 7]
for n in nums:
    if n % 2 == 0:
        nums.remove(n)
print(nums)`,
    options: [
      'Removing items while iterating shifts the remaining elements and skips one',
      'remove() deletes by index, not by value',
      'The modulo test should be n % 2 == 1',
      'Lists cannot be modified inside a for loop at all',
    ],
    answerIndex: 0,
    explanation:
      'The loop walks by index while the list shrinks underneath it, so each removal skips the next element. Build a new list instead: nums = [n for n in nums if n % 2].',
    tags: ['mutation', 'iteration', 'pitfall'],
  },
  {
    id: 'lists-tuples-h-002',
    topic: 'lists-tuples',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which of these produce an independent copy of a flat list lst (mutating the copy leaves lst unchanged)?',
    options: ['lst.copy()', 'lst[:]', 'lst', 'list(lst)'],
    answerIndices: [0, 1, 3],
    explanation:
      'copy(), a full slice and list() all build a new outer list. Plain assignment only creates another name for the SAME object. Note all three are shallow: nested lists are still shared.',
    tags: ['copying', 'aliasing'],
  },
  {
    id: 'lists-tuples-e-005',
    topic: 'lists-tuples',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'When should you reach for a tuple instead of a list?',
    back: 'When the collection is a fixed record that should not change: coordinates, database rows, function returns of several values, or anything you need as a dict key or set member (lists are unhashable).',
    tags: ['tuple', 'design'],
  },
]

export default questions
