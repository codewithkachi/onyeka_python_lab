// Decorators, Closures & functools
//
// Target: 14 questions = 2 flashcard + 1 order + 11 graded
// Graded tier split: easy 4 / intermediate 4 / hard 3
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'decorators-closures-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'decorators-closures-e-001',
    topic: 'decorators-closures',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is a decorator in Python?',
    options: [
      'A callable that takes a function and returns a replacement, applied with @',
      'A comment that documents a function',
      'A type annotation on the return value',
      'A special kind of class attribute',
    ],
    answerIndex: 0,
    explanation:
      '@my_decorator above a def is simply sugar for f = my_decorator(f). That single equivalence explains almost everything decorators do.',
    tags: ['decorators'],
  },
  {
    id: 'decorators-closures-e-002',
    topic: 'decorators-closures',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is a closure?',
    options: [
      'A nested function that remembers variables from the scope it was defined in',
      'A function that closes a file automatically',
      'A function with no arguments',
      'The final statement of a function body',
    ],
    answerIndex: 0,
    explanation:
      'The inner function keeps a live reference to the enclosing scope\'s variables even after the outer call has returned. This is the mechanism decorators are built on.',
    tags: ['closures', 'scope'],
  },
  {
    id: 'decorators-closures-e-003',
    topic: 'decorators-closures',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does functools.lru_cache do to a function?',
    options: [
      'Caches results by arguments so repeated calls return instantly',
      'Limits how many times the function may be called',
      'Runs the function in a background thread',
      'Logs every call to a file',
    ],
    answerIndex: 0,
    explanation:
      'It memoises: identical arguments skip the work entirely. Arguments must be hashable, and it turns naive recursive fibonacci from exponential into linear.',
    tags: ['functools', 'lru-cache', 'memoisation'],
  },
  {
    id: 'decorators-closures-i-001',
    topic: 'decorators-closures',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`def outer():
    count = 0
    def inner():
        nonlocal count
        count += 1
        return count
    return inner

f = outer()
print(f(), f(), f())`,
    options: ['1 2 3', '1 1 1', '0 1 2', 'UnboundLocalError'],
    answerIndex: 0,
    explanation:
      'The closure keeps one shared count alive across calls, and nonlocal allows rebinding it. Without nonlocal the += would raise UnboundLocalError.',
    tags: ['closures', 'nonlocal'],
  },
  {
    id: 'decorators-closures-i-002',
    topic: 'decorators-closures',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`def shout(fn):
    def wrapper(*args, **kwargs):
        return fn(*args, **kwargs).upper()
    return wrapper

@shout
def greet(name):
    return f"hi {name}"

print(greet("ada"))`,
    options: ['HI ADA', 'hi ada (decorator has no effect)', 'ADA', 'TypeError'],
    answerIndex: 0,
    explanation:
      'greet is replaced by wrapper, which calls the original and uppercases its result. Using *args and **kwargs is what lets one decorator wrap any signature.',
    tags: ['decorators', 'wrapper'],
  },
  {
    id: 'decorators-closures-i-003',
    topic: 'decorators-closures',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'Why should a decorator wrap its inner function with @functools.wraps(fn)?',
    options: [
      'To copy the original __name__, __doc__ and signature onto the wrapper',
      'To make the decorator run faster',
      'To allow the decorator to take arguments',
      'To prevent the function from being called twice',
    ],
    answerIndex: 0,
    explanation:
      'Without it, help(), tracebacks and introspection all report "wrapper" instead of the real function, which quietly breaks debugging and documentation tools.',
    tags: ['functools', 'wraps'],
  },
  {
    id: 'decorators-closures-h-001',
    topic: 'decorators-closures',
    tier: 'hard',
    type: 'bug',
    prompt: 'Every function in funcs prints 2. Why?',
    code: String.raw`funcs = []
for i in range(3):
    funcs.append(lambda: i)

print([f() for f in funcs])`,
    options: [
      'The closures capture the VARIABLE i, not its value, and i is 2 after the loop',
      'lambda cannot be stored in a list',
      'append overwrites the previous entry each time',
      'The list comprehension re-runs the loop',
    ],
    answerIndex: 0,
    explanation:
      'All three lambdas share the same i, whose final value is 2. Bind per-iteration with a default argument — lambda i=i: i — to capture the value at definition time.',
    tags: ['closures', 'late-binding', 'pitfall'],
  },
  {
    id: 'decorators-closures-h-002',
    topic: 'decorators-closures',
    tier: 'hard',
    type: 'mcq',
    prompt: 'How does a decorator that takes arguments, such as @retry(times=3), differ structurally?',
    options: [
      'It needs an extra layer: a factory that takes the arguments and returns the real decorator',
      'It cannot be written in Python',
      'It must be a class rather than a function',
      'It takes the arguments as the second parameter of the wrapper',
    ],
    answerIndex: 0,
    explanation:
      '@retry(times=3) CALLS retry first, and the result is what decorates the function. So you need three nested levels: factory, decorator, wrapper.',
    tags: ['decorators', 'parameterised'],
  },
  {
    id: 'decorators-closures-h-003',
    topic: 'decorators-closures',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which are common, legitimate uses for decorators?',
    options: [
      'Caching expensive results',
      'Logging or timing function calls',
      'Enforcing authentication before a view runs',
      'Changing a function\'s local variable names',
    ],
    answerIndices: [0, 1, 2],
    explanation:
      'Decorators wrap behaviour AROUND a call — caching, logging, access control, retries. They cannot reach inside and rewrite the function body\'s local names.',
    tags: ['decorators', 'use-cases'],
  },
  {
    id: 'decorators-closures-e-004',
    topic: 'decorators-closures',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What does @staticmethod, @classmethod or @property have in common with a custom decorator?',
    back: 'They are all just callables applied with @ that replace or wrap the function beneath. The built-in ones return descriptor objects that change how attribute access works on the class.',
    tags: ['decorators', 'builtins'],
  },
  {
    id: 'decorators-closures-e-005',
    topic: 'decorators-closures',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the difference between global and nonlocal?',
    back: 'global rebinds a name at MODULE level. nonlocal rebinds a name in the nearest ENCLOSING FUNCTION scope — it is what lets a closure mutate the variable it captured.',
    tags: ['scope', 'nonlocal'],
  },
  {
    id: 'decorators-closures-i-004',
    topic: 'decorators-closures',
    tier: 'intermediate',
    type: 'order',
    prompt: 'Put these lines in order to define a timing decorator.',
    items: [
      'import functools, time',
      'def timed(fn):',
      '    @functools.wraps(fn)',
      '    def wrapper(*args, **kwargs):',
      '        start = time.perf_counter()',
      '        result = fn(*args, **kwargs)',
      '        return result',
    ],
    explanation:
      'The decorator takes the function, defines a wrapper that records the time around the real call, and returns the result. @functools.wraps preserves the original identity.',
    tags: ['decorators', 'flow'],
  },
]

export default questions
