// Threads, Processes & asyncio
//
// Target: 14 questions = 2 flashcard + 1 order + 11 graded
// Graded tier split: easy 4 / intermediate 4 / hard 3
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'concurrency-async-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'concurrency-async-e-001',
    topic: 'concurrency-async',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which standard-library module provides the Thread class?',
    options: ['multiprocessing', 'concurrent', 'threading', 'asyncio'],
    answerIndex: 2,
    explanation:
      'threading supplies Thread plus synchronisation primitives such as Lock and Event. concurrent.futures wraps it in a higher-level pool API that is usually easier to use.',
    tags: ['threading'],
  },
  {
    id: 'concurrency-async-e-002',
    topic: 'concurrency-async',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which method actually begins execution in a new thread?',
    options: ['thread.run()', 'thread.begin()', 'thread.start()', 'thread.execute()'],
    answerIndex: 2,
    explanation:
      'start() spawns the OS thread and then invokes run() inside it. Calling run() yourself just executes the target synchronously in the CURRENT thread, defeating the point.',
    tags: ['threading', 'start'],
  },
  {
    id: 'concurrency-async-e-003',
    topic: 'concurrency-async',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does thread.join() do?',
    options: [
      'Merges two threads into one',
      'Blocks the calling thread until that thread finishes',
      'Terminates the thread immediately',
      'Connects the thread to a thread pool',
    ],
    answerIndex: 1,
    explanation:
      'join() waits for completion, which is how you ensure results are ready before continuing. Python provides no safe way to kill a running thread outright.',
    tags: ['threading', 'join'],
  },
  {
    id: 'concurrency-async-i-001',
    topic: 'concurrency-async',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What is the GIL?',
    options: [
      'The Global Import Library that caches modules',
      'The Global Interpreter Lock, allowing only one thread to run Python bytecode at a time',
      'A garbage-collection strategy for cyclic references',
      'A lock object you must acquire before starting any thread',
    ],
    answerIndex: 1,
    explanation:
      'The GIL serialises bytecode execution in CPython, so threads give no speed-up for CPU-bound work. It is released during I/O and inside many C extensions such as NumPy.',
    tags: ['gil'],
  },
  {
    id: 'concurrency-async-i-002',
    topic: 'concurrency-async',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What is a race condition?',
    options: [
      'Two threads running at identical speed',
      'Unpredictable behaviour when threads access shared mutable state without synchronisation',
      'A thread that finishes before it is joined',
      'A benchmark comparing threads to processes',
    ],
    answerIndex: 1,
    explanation:
      'When interleaving determines the result, you get a race. Even x += 1 is several bytecodes and can be interrupted, so shared counters need a Lock or an atomic structure like Queue.',
    tags: ['race-condition', 'threading'],
  },
  {
    id: 'concurrency-async-i-003',
    topic: 'concurrency-async',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'For a CPU-bound workload on multiple cores, which approach actually helps in CPython?',
    options: [
      'threading, because threads run in parallel',
      'multiprocessing, because each process has its own interpreter and GIL',
      'asyncio, because coroutines are faster than threads',
      'None; Python cannot use more than one core',
    ],
    answerIndex: 1,
    explanation:
      'Separate processes sidestep the GIL entirely and use all cores, at the cost of pickling data between them. Threads and asyncio help with I/O-bound work, not CPU-bound work.',
    tags: ['multiprocessing', 'gil'],
  },
  {
    id: 'concurrency-async-h-001',
    topic: 'concurrency-async',
    tier: 'hard',
    type: 'bug',
    prompt: 'This coroutine never runs. Why?',
    code: String.raw`import asyncio

async def work():
    print("working")

work()`,
    options: [
      'Calling a coroutine function returns a coroutine object; it must be awaited or run',
      'async functions must be decorated with @asyncio.coroutine',
      'print() is not permitted inside a coroutine',
      'The module must be imported as import asyncio.run',
    ],
    answerIndex: 0,
    explanation:
      'Calling work() only builds a coroutine object and Python warns it was never awaited. Drive it with asyncio.run(work()) at the top level, or await it from another coroutine.',
    tags: ['asyncio', 'coroutines', 'pitfall'],
  },
  {
    id: 'concurrency-async-h-002',
    topic: 'concurrency-async',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which workloads are a good fit for asyncio?',
    options: [
      'Thousands of concurrent HTTP requests',
      'Reading from many network sockets at once',
      'Multiplying large matrices',
      'Compressing a large file with a pure-Python algorithm',
    ],
    answerIndices: [0, 1],
    explanation:
      'asyncio shines when tasks spend their time WAITING on I/O, letting one thread juggle many of them. CPU-bound work blocks the event loop and belongs in a process pool.',
    tags: ['asyncio', 'io-bound'],
  },
  {
    id: 'concurrency-async-e-004',
    topic: 'concurrency-async',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the difference between concurrency and parallelism?',
    back: 'Concurrency is structuring a program so multiple tasks are in progress and can be interleaved. Parallelism is literally executing them at the same instant on multiple cores. asyncio gives concurrency without parallelism.',
    tags: ['terminology'],
  },
  {
    id: 'concurrency-async-e-005',
    topic: 'concurrency-async',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What does a threading.Lock protect against?',
    back: 'It ensures only one thread at a time runs a critical section that touches shared mutable state, preventing interleaved reads and writes. Use it as "with lock:" so it is always released.',
    tags: ['threading', 'lock'],
  },
]

export default questions
