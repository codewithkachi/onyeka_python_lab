// Syntax, Variables & I/O
//
// Target: 16 questions = 2 flashcard + 1 order + 13 graded
// Graded tier split: easy 5 / intermediate 5 / hard 3
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'syntax-basics-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'syntax-basics-e-001',
    topic: 'syntax-basics',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which of the following is a valid variable name in Python?',
    options: ['2name', 'my-var', '_myVar', 'class'],
    answerIndex: 2,
    explanation:
      'Names may start with a letter or underscore and contain letters, digits and underscores. "2name" starts with a digit, "my-var" contains a hyphen (parsed as subtraction), and "class" is a reserved keyword.',
    tags: ['identifiers', 'naming'],
  },
  {
    id: 'syntax-basics-e-002',
    topic: 'syntax-basics',
    tier: 'easy',
    type: 'mcq',
    prompt: "What does bool('') evaluate to?",
    options: ['True', 'False', 'None', 'Error'],
    answerIndex: 1,
    explanation:
      'An empty string is falsy, so bool(\'\') is False. Empty containers ([], {}, set(), ()), 0 and None are also falsy. Note that a non-empty string like "False" is truthy.',
    tags: ['truthiness', 'bool'],
  },
  {
    id: 'syntax-basics-e-003',
    topic: 'syntax-basics',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What type does input() always return, regardless of what the user types?',
    options: ['str', 'int', 'It depends on the input', 'bytes'],
    answerIndex: 0,
    explanation:
      'input() always returns a str. Typing 42 gives the string "42", so you must convert explicitly with int() or float() before doing arithmetic.',
    tags: ['input', 'io'],
  },
  {
    id: 'syntax-basics-i-001',
    topic: 'syntax-basics',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`x = 5
y = x
x = 10
print(y)`,
    options: ['10', '5', 'None', 'Error'],
    answerIndex: 1,
    explanation:
      'y = x binds y to the object 5. Rebinding x to 10 does not touch y, because assignment rebinds a name rather than mutating the value it pointed to. So y is still 5.',
    tags: ['assignment', 'references'],
  },
  {
    id: 'syntax-basics-i-002',
    topic: 'syntax-basics',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`print("a", "b", sep="-", end="!")`,
    options: ['a-b!', 'a b!', 'a-b', 'a - b!'],
    answerIndex: 0,
    explanation:
      'sep controls what goes BETWEEN the arguments (default a space) and end controls what goes AFTER the last one (default a newline). So the output is a-b! with no trailing newline.',
    tags: ['print', 'io'],
  },
  {
    id: 'syntax-basics-i-003',
    topic: 'syntax-basics',
    tier: 'intermediate',
    type: 'bug',
    prompt: 'This code raises an error. What is wrong?',
    code: String.raw`age = input("Age: ")
if age > 18:
    print("adult")`,
    options: [
      'input() returns a str, which cannot be compared to an int with >',
      'The if statement is missing an else branch',
      'input() does not accept a prompt argument',
      'The comparison should use >= instead of >',
    ],
    answerIndex: 0,
    explanation:
      'input() returns a str, and Python refuses to order-compare str with int, raising TypeError. Fix it with age = int(input("Age: ")). Python deliberately does not guess a conversion here.',
    tags: ['input', 'typeerror'],
  },
  {
    id: 'syntax-basics-i-004',
    topic: 'syntax-basics',
    tier: 'intermediate',
    type: 'multi',
    prompt: 'Which of these are reserved Python keywords that cannot be used as variable names?',
    options: ['lambda', 'print', 'None', 'list'],
    answerIndices: [0, 2],
    explanation:
      'lambda and None are keywords. print and list are builtins, not keywords, so assigning to them is legal but shadows the builtin for the rest of the scope, which is a common source of confusing bugs.',
    tags: ['keywords', 'builtins'],
  },
  {
    id: 'syntax-basics-h-001',
    topic: 'syntax-basics',
    tier: 'hard',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`x = 1
def f():
    x = 2
f()
print(x)`,
    options: ['2', '1', 'None', 'UnboundLocalError'],
    answerIndex: 1,
    explanation:
      'Assigning to x inside f() creates a new LOCAL name that shadows the global. The global x is untouched, so 1 is printed. You would need the global keyword to rebind the module-level x.',
    tags: ['scope', 'shadowing'],
  },
  {
    id: 'syntax-basics-e-004',
    topic: 'syntax-basics',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the difference between = and == in Python?',
    back: '= assigns a value to a name. == compares two values for equality and returns a bool. Using = inside an if condition is a SyntaxError in Python (unlike C).',
    tags: ['operators'],
  },
  {
    id: 'syntax-basics-e-005',
    topic: 'syntax-basics',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'How does Python know where a block of code starts and ends?',
    back: 'By indentation, not braces. Every line in a block must be indented the same amount. PEP 8 recommends 4 spaces, and mixing tabs with spaces raises TabError.',
    tags: ['indentation', 'blocks'],
  },
  {
    id: 'syntax-basics-i-005',
    topic: 'syntax-basics',
    tier: 'intermediate',
    type: 'order',
    prompt: 'Put these lines in order to read a number from the user and print its square.',
    items: [
      'raw = input("Enter a number: ")',
      'n = int(raw)',
      'squared = n ** 2',
      'print(f"{n} squared is {squared}")',
    ],
    explanation:
      'Read the raw string, convert it to an int, compute the square, then format the result. The conversion must happen before any arithmetic, because input() always hands back a str.',
    tags: ['io', 'flow'],
  },
]

export default questions
