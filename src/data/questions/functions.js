// Functions, Arguments & Scope
//
// Target: 18 questions = 2 flashcard + 1 order + 15 graded
// Graded tier split: easy 6 / intermediate 5 / hard 4
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'functions-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'functions-e-001',
    topic: 'functions',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does a function return if it has no return statement?',
    options: ['0', 'False', 'None', 'It raises an error'],
    answerIndex: 2,
    explanation:
      'Every Python function returns something; with no return statement (or a bare return) the result is None. This is why forgetting a return silently yields None instead of failing loudly.',
    tags: ['return', 'none'],
  },
  {
    id: 'functions-e-002',
    topic: 'functions',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does *args allow in a function definition?',
    options: [
      'Keyword arguments only',
      'A variable number of positional arguments, collected into a tuple',
      'Exactly one argument',
      'Default values for every parameter',
    ],
    answerIndex: 1,
    explanation:
      '*args gathers any extra POSITIONAL arguments into a tuple. Its counterpart **kwargs gathers extra keyword arguments into a dict.',
    tags: ['args', 'parameters'],
  },
  {
    id: 'functions-e-003',
    topic: 'functions',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is the scope of a variable first assigned inside a function body?',
    options: ['Global', 'Built-in', 'Local to that function', 'Enclosing module'],
    answerIndex: 2,
    explanation:
      'Assignment inside a function creates a local name that disappears when the call ends. Python resolves reads outward through Local, Enclosing, Global then Built-in (the LEGB rule).',
    tags: ['scope', 'legb'],
  },
  {
    id: 'functions-e-004',
    topic: 'functions',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which keyword lets a function rebind a module-level variable?',
    options: ['extern', 'global', 'nonlocal', 'static'],
    answerIndex: 1,
    explanation:
      'global x tells Python that assignments to x inside the function target the module-level name. nonlocal does the same for a variable in an enclosing FUNCTION, not the module.',
    tags: ['scope', 'global'],
  },
  {
    id: 'functions-e-005',
    topic: 'functions',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is a lambda in Python?',
    options: [
      'A function imported from the math module',
      'An anonymous function limited to a single expression',
      'A function that calls itself',
      'A function that runs in a separate thread',
    ],
    answerIndex: 1,
    explanation:
      'lambda builds a small unnamed function from ONE expression, whose value is returned automatically. Anything needing a statement, such as a loop or try, requires def.',
    tags: ['lambda'],
  },
  {
    id: 'functions-e-006',
    topic: 'functions',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which is the correct syntax for a lambda that adds two numbers?',
    options: [
      'lambda x, y: return x + y',
      'lambda(x, y): x + y',
      'lambda x, y: x + y',
      'def lambda(x, y): x + y',
    ],
    answerIndex: 2,
    explanation:
      'The form is lambda parameters: expression. Writing return inside a lambda is a SyntaxError, because the expression is already the return value.',
    tags: ['lambda', 'syntax'],
  },
  {
    id: 'functions-i-001',
    topic: 'functions',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`f = lambda x: x * 2
print(f(5))`,
    options: ['25', '10', '52', 'TypeError'],
    answerIndex: 1,
    explanation:
      'The lambda doubles its argument, so f(5) is 10. Note that if x were the string "5" the same code would print 55, because * repeats sequences.',
    tags: ['lambda'],
  },
  {
    id: 'functions-i-002',
    topic: 'functions',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'How do you sort a list of tuples by each tuple\'s second element?',
    options: [
      'sorted(pairs, key=lambda t: t[1])',
      'sorted(pairs, order=1)',
      'sorted(pairs, column=1)',
      'pairs.sort(2)',
    ],
    answerIndex: 0,
    explanation:
      'sorted() calls key on each item and orders by the results. operator.itemgetter(1) does the same job slightly faster and reads well for this case.',
    tags: ['sorting', 'lambda', 'key'],
  },
  {
    id: 'functions-i-003',
    topic: 'functions',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What is the base case in a recursive function?',
    options: [
      'The first recursive call',
      'The condition under which the function returns without recursing again',
      'The value the function returns on success',
      'The name the function calls itself by',
    ],
    answerIndex: 1,
    explanation:
      'The base case terminates the recursion. Without one (or if the recursive step never approaches it) the calls nest until Python raises RecursionError.',
    tags: ['recursion'],
  },
  {
    id: 'functions-i-004',
    topic: 'functions',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'Which error does unbounded recursion raise in CPython?',
    options: ['OverflowError', 'RecursionError', 'MemoryError', 'StackOverflowError'],
    answerIndex: 1,
    explanation:
      'CPython caps call depth at roughly 1000 frames and raises RecursionError ("maximum recursion depth exceeded") rather than letting the C stack overflow and crash the process.',
    tags: ['recursion', 'errors'],
  },
  {
    id: 'functions-i-005',
    topic: 'functions',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What is the recursive definition of factorial(n) for n > 0?',
    options: [
      'n + factorial(n - 1)',
      'n * factorial(n - 1)',
      'n * factorial(n + 1)',
      'factorial(n) * factorial(n)',
    ],
    answerIndex: 1,
    explanation:
      'factorial(n) = n * factorial(n - 1), bottoming out at factorial(0) = 1. Option 3 recurses upward and would never reach a base case.',
    tags: ['recursion', 'factorial'],
  },
  {
    id: 'functions-h-001',
    topic: 'functions',
    tier: 'hard',
    type: 'bug',
    prompt: 'Every call appends to the SAME list. Why?',
    code: String.raw`def add(item, bucket=[]):
    bucket.append(item)
    return bucket

print(add(1))
print(add(2))`,
    options: [
      'The default value is created once at definition time and reused by every call',
      'append() always writes to a global list',
      'The parameter needs the global keyword',
      'Lists cannot be used as parameters at all',
    ],
    answerIndex: 0,
    explanation:
      'Default arguments are evaluated ONCE when the def executes, so every call that omits bucket shares one list: [1] then [1, 2]. The fix is bucket=None plus "if bucket is None: bucket = []".',
    tags: ['defaults', 'mutable', 'pitfall'],
  },
  {
    id: 'functions-h-002',
    topic: 'functions',
    tier: 'hard',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`def f(a, b=2, *args, **kwargs):
    print(a, b, args, kwargs)

f(1, 3, 4, x=5)`,
    options: ['1 3 (4,) {\'x\': 5}', '1 2 (3, 4) {\'x\': 5}', '1 3 (4,) {}', 'TypeError'],
    answerIndex: 0,
    explanation:
      'a takes 1 and b takes 3 positionally, overriding its default. The leftover positional 4 lands in args as a one-tuple, and the keyword x goes into kwargs.',
    tags: ['args', 'kwargs', 'parameters'],
  },
  {
    id: 'functions-h-003',
    topic: 'functions',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which statements about Python argument passing are true?',
    options: [
      'Mutating a list argument inside a function is visible to the caller',
      'Rebinding a parameter name inside a function is visible to the caller',
      'Arguments are passed by object reference',
      'Integers passed to a function can be modified in place by the function',
    ],
    answerIndices: [0, 2],
    explanation:
      'Python passes references to objects. Mutating a shared mutable object is visible outside, but rebinding the local name is not. Integers are immutable, so nothing can modify one in place.',
    tags: ['arguments', 'references'],
  },
  {
    id: 'functions-e-007',
    topic: 'functions',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the difference between a parameter and an argument?',
    back: 'A parameter is the name in the function definition; an argument is the actual value passed at the call site. In def greet(name) name is the parameter; in greet("Ada") the string is the argument.',
    tags: ['terminology'],
  },
  {
    id: 'functions-e-008',
    topic: 'functions',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What does the * in def f(a, *, b) mean?',
    back: 'Everything after the bare * is keyword-only. f(1, b=2) works but f(1, 2) raises TypeError. It is used to force callers to name confusing boolean or option arguments at the call site.',
    tags: ['parameters', 'keyword-only'],
  },
  {
    id: 'functions-i-006',
    topic: 'functions',
    tier: 'intermediate',
    type: 'order',
    prompt: 'Put these lines in order to define and use a recursive factorial function.',
    items: [
      'def factorial(n):',
      '    if n <= 1:',
      '        return 1',
      '    return n * factorial(n - 1)',
      'print(factorial(5))',
    ],
    explanation:
      'The base case must be checked before recursing, otherwise the calls never terminate. The recursive step reduces n each time so it converges on the base case.',
    tags: ['recursion', 'flow'],
  },
]

export default questions
