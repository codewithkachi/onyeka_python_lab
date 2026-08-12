// Numbers, Strings & Formatting
//
// Target: 18 questions = 2 flashcard + 1 order + 15 graded
// Graded tier split: easy 6 / intermediate 5 / hard 4
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'datatypes-numbers-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'datatypes-numbers-e-001',
    topic: 'datatypes-numbers',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is the output of type(3.14)?',
    options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'number'>"],
    answerIndex: 1,
    explanation:
      'Python has no "double" type name: all floats are 64-bit double-precision values, and the type is simply called float.',
    tags: ['types', 'float'],
  },
  {
    id: 'datatypes-numbers-e-002',
    topic: 'datatypes-numbers',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is the result of 10 // 3?',
    options: ['3.33', '3', '4', '1'],
    answerIndex: 1,
    explanation:
      '// is floor division: it divides and rounds DOWN to the nearest integer, giving 3. Use / for true division (3.333...) and % for the remainder (1).',
    tags: ['operators', 'division'],
  },
  {
    id: 'datatypes-numbers-i-001',
    topic: 'datatypes-numbers',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`print(-7 // 2)`,
    options: ['-3', '-4', '-3.5', '3'],
    answerIndex: 1,
    explanation:
      'Floor division rounds towards negative infinity, not towards zero. -7 / 2 is -3.5, and the floor of -3.5 is -4. This trips up people who expect C-style truncation.',
    tags: ['operators', 'division', 'negatives'],
  },
  {
    id: 'datatypes-numbers-i-002',
    topic: 'datatypes-numbers',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`print(0.1 + 0.2 == 0.3)`,
    options: ['True', 'False', 'None', 'ValueError'],
    answerIndex: 1,
    explanation:
      'Binary floating point cannot represent 0.1 or 0.2 exactly, so the sum is 0.30000000000000004. Compare floats with math.isclose(a, b) rather than ==.',
    tags: ['float', 'precision'],
  },
  {
    id: 'datatypes-numbers-i-003',
    topic: 'datatypes-numbers',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'Given name = "Ada", which f-string prints exactly: Hello, Ada!',
    options: [
      'f"Hello, {name}!"',
      'f"Hello, name!"',
      '"Hello, {name}!"',
      'f"Hello, \\{name\\}!"',
    ],
    answerIndex: 0,
    explanation:
      'An f-string substitutes the expression inside braces. Without the f prefix the braces are literal text, and without braces the name is not substituted at all.',
    tags: ['fstrings', 'formatting'],
  },
  {
    id: 'datatypes-numbers-h-001',
    topic: 'datatypes-numbers',
    tier: 'hard',
    type: 'bug',
    prompt: 'This function is meant to strip a suffix, but returns the wrong result for "trial.txt". Why?',
    code: String.raw`def strip_ext(name):
    return name.strip(".txt")

print(strip_ext("trial.txt"))`,
    options: [
      'strip() removes any of the characters ".txt" from BOTH ends, not the substring',
      'strip() only removes whitespace, so it does nothing here',
      'strip() needs a second argument specifying the side',
      'strip() mutates the string in place and returns None',
    ],
    answerIndex: 0,
    explanation:
      'strip() treats its argument as a SET of characters, so it also eats the leading "t" and gives "rial". Use removesuffix(".txt") (Python 3.9+) to strip an actual substring.',
    tags: ['strings', 'strip'],
  },
]

export default questions
