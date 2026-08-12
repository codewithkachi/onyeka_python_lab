// Iterators, Generators & Protocols
//
// Target: 12 questions = 2 flashcard + 1 order + 9 graded
// Graded tier split: easy 4 / intermediate 3 / hard 2
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'iterators-protocols-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'iterators-protocols-e-001',
    topic: 'iterators-protocols',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What makes an object iterable in Python?',
    options: [
      'It defines __iter__, returning an iterator',
      'It defines __len__',
      'It is a subclass of list',
      'It defines __getattr__',
    ],
    answerIndex: 0,
    explanation:
      'A for loop calls iter(obj), which calls __iter__. The returned iterator must then supply __next__. (An old-style __getitem__ protocol also works, but __iter__ is the modern way.)',
    tags: ['iterable', 'protocol'],
  },
  {
    id: 'iterators-protocols-e-002',
    topic: 'iterators-protocols',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does the yield keyword turn a function into?',
    options: [
      'A generator function, which returns a lazy iterator when called',
      'A coroutine that must be awaited',
      'A function that returns a list',
      'A recursive function',
    ],
    answerIndex: 0,
    explanation:
      'Calling it runs no code at all — it hands back a generator. Each next() runs until the following yield, so state is suspended and resumed rather than rebuilt.',
    tags: ['generators', 'yield'],
  },
  {
    id: 'iterators-protocols-e-003',
    topic: 'iterators-protocols',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What exception signals that an iterator is exhausted?',
    options: ['StopIteration', 'IndexError', 'EOFError', 'RuntimeError'],
    answerIndex: 0,
    explanation:
      'next() raises StopIteration when there is nothing left, and for loops catch it silently. That is why a bare next() on a spent iterator crashes but a for loop simply ends.',
    tags: ['iterators', 'stopiteration'],
  },
  {
    id: 'iterators-protocols-i-001',
    topic: 'iterators-protocols',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`def gen():
    print("start")
    yield 1
    yield 2

g = gen()
print("created")
print(next(g))`,
    options: ['created then start then 1', 'start then created then 1', 'created then 1', 'start then 1'],
    answerIndex: 0,
    explanation:
      'Calling gen() executes NO body code — it only builds the generator. The body runs up to the first yield on the first next(), so "created" prints before "start".',
    tags: ['generators', 'laziness'],
  },
  {
    id: 'iterators-protocols-i-002',
    topic: 'iterators-protocols',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`nums = iter([1, 2, 3])
print(sum(nums))
print(sum(nums))`,
    options: ['6 then 0', '6 then 6', '0 then 6', 'StopIteration'],
    answerIndex: 0,
    explanation:
      'An iterator is single-use: the first sum drains it, so the second sees an empty stream and returns 0. Iterate the underlying LIST if you need more than one pass.',
    tags: ['iterators', 'exhaustion', 'pitfall'],
  },
  {
    id: 'iterators-protocols-i-003',
    topic: 'iterators-protocols',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What is the main advantage of a generator over building and returning a list?',
    options: [
      'It produces values on demand, using memory that does not grow with the sequence length',
      'It is always faster for small inputs',
      'It can be indexed and sliced directly',
      'It automatically removes duplicates',
    ],
    answerIndex: 0,
    explanation:
      'Constant memory is the point: a generator can stream a multi-gigabyte file or an infinite sequence. The trade-off is that you cannot index it or take its len().',
    tags: ['generators', 'memory'],
  },
  {
    id: 'iterators-protocols-h-001',
    topic: 'iterators-protocols',
    tier: 'hard',
    type: 'bug',
    prompt: 'Why does the second loop print nothing?',
    code: String.raw`squares = (x * x for x in range(4))

for s in squares:
    print(s)

for s in squares:
    print("again", s)`,
    options: [
      'A generator expression can only be iterated once; it is exhausted after the first loop',
      'The second for loop needs a different variable name',
      'Generator expressions require a list() call to be used in a for loop',
      'print cannot be called twice on the same object',
    ],
    answerIndex: 0,
    explanation:
      'Generators do not rewind. Either rebuild the expression or materialise it once with list() if two passes are genuinely needed.',
    tags: ['generators', 'exhaustion', 'pitfall'],
  },
  {
    id: 'iterators-protocols-h-002',
    topic: 'iterators-protocols',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which statements about iterables and iterators are true?',
    options: [
      'Every iterator is also an iterable',
      'A list is an iterable but not itself an iterator',
      'iter() on a list returns a new iterator each time',
      'Calling len() works on any iterator',
    ],
    answerIndices: [0, 1, 2],
    explanation:
      'Iterators implement __iter__ returning self, so they are iterable. Lists are re-iterable containers that hand out a fresh iterator on demand. Iterators have no len().',
    tags: ['iterable', 'iterator', 'protocol'],
  },
  {
    id: 'iterators-protocols-e-004',
    topic: 'iterators-protocols',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the difference between an iterable and an iterator?',
    back: 'An iterable can PRODUCE an iterator (it defines __iter__) and can usually be looped over many times, like a list. An iterator is the cursor itself (it defines __next__), is consumed as you go, and works exactly once.',
    tags: ['terminology', 'protocol'],
  },
  {
    id: 'iterators-protocols-e-005',
    topic: 'iterators-protocols',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What does yield from do?',
    back: 'Delegates to another iterable, yielding all of its values as if they were written inline. yield from sub() replaces "for x in sub(): yield x" and also forwards values sent into the generator.',
    tags: ['generators', 'yield-from'],
  },
  {
    id: 'iterators-protocols-i-004',
    topic: 'iterators-protocols',
    tier: 'intermediate',
    type: 'order',
    prompt: 'Put these lines in order to stream a large file and count matching lines.',
    items: [
      'def error_lines(path):',
      '    with open(path, encoding="utf-8") as f:',
      '        for line in f:',
      '            if "ERROR" in line:',
      '                yield line',
      'print(sum(1 for _ in error_lines("app.log")))',
    ],
    explanation:
      'Iterating the file object streams one line at a time, and yield passes matches straight through. Memory stays constant no matter how large the log grows.',
    tags: ['generators', 'streaming', 'flow'],
  },
]

export default questions
