// Testing, Typing & Tooling
//
// Target: 16 questions = 2 flashcard + 1 order + 13 graded
// Graded tier split: easy 5 / intermediate 5 / hard 3
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'testing-quality-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'testing-quality-e-001',
    topic: 'testing-quality',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which testing framework ships with the Python standard library?',
    options: ['pytest', 'unittest', 'testlib', 'nose'],
    answerIndex: 1,
    explanation:
      'unittest is built in and modelled on JUnit. pytest is a hugely popular third-party alternative with terser syntax, and it can run unittest test cases too.',
    tags: ['unittest'],
  },
  {
    id: 'testing-quality-e-002',
    topic: 'testing-quality',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does assert x == 5 do?',
    options: [
      'Assigns 5 to x',
      'Raises AssertionError when the comparison is false',
      'Prints the value of x',
      'Returns True or False without side effects',
    ],
    answerIndex: 1,
    explanation:
      'assert raises AssertionError when the expression is falsy. Note that running Python with -O strips assertions entirely, so never rely on them for production validation.',
    tags: ['assert'],
  },
  {
    id: 'testing-quality-e-003',
    topic: 'testing-quality',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is pdb?',
    options: [
      'A package database format',
      "Python's built-in interactive debugger",
      'A performance profiler',
      'A structured logging library',
    ],
    answerIndex: 1,
    explanation:
      'pdb lets you set breakpoints, step through code and inspect state. Since Python 3.7 the simplest entry point is the built-in breakpoint() call.',
    tags: ['pdb', 'debugging'],
  },
  {
    id: 'testing-quality-e-004',
    topic: 'testing-quality',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does it mean for a test to pass?',
    options: [
      'The function under test returned a non-None value',
      'The test ran to completion without any assertion failing or exception escaping',
      'The module imported successfully',
      'The test was skipped deliberately',
    ],
    answerIndex: 1,
    explanation:
      'A passing test is one that completes with no failed assertion and no uncaught exception. A test with no assertions at all also "passes", which is why empty tests are dangerous.',
    tags: ['unittest', 'assertions'],
  },
  {
    id: 'testing-quality-i-001',
    topic: 'testing-quality',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What do type hints such as def f(x: int) -> str do at runtime?',
    options: [
      'They are enforced and raise TypeError on a mismatch',
      'Nothing; they are metadata checked only by external tools such as mypy',
      'They convert arguments to the annotated type automatically',
      'They make the function run faster',
    ],
    answerIndex: 1,
    explanation:
      'Python does not enforce annotations at runtime, so passing a str to an int parameter still works. Static checkers such as mypy or pyright read them and report mismatches before you run.',
    tags: ['typing', 'mypy'],
  },
  {
    id: 'testing-quality-i-002',
    topic: 'testing-quality',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'Why is print-based debugging considered limited compared to a debugger?',
    options: [
      'print() cannot display variable values',
      'It requires editing and re-running the code for each new question you have',
      'It only works inside functions',
      'It changes the program\'s behaviour in every case',
    ],
    answerIndex: 1,
    explanation:
      'Every new question means another edit-and-rerun cycle, and the statements tend to be left behind. A debugger lets you inspect any variable at a breakpoint without touching the source.',
    tags: ['debugging'],
  },
  {
    id: 'testing-quality-i-003',
    topic: 'testing-quality',
    tier: 'intermediate',
    type: 'bug',
    prompt: 'This test always passes, even when add() is broken. Why?',
    code: String.raw`def test_add():
    add(2, 2) == 4`,
    options: [
      'The comparison result is discarded; there is no assert',
      'The test function name must start with check_',
      'add() must be imported inside the test body',
      'Comparisons cannot be used inside test functions',
    ],
    answerIndex: 0,
    explanation:
      'The expression is evaluated and thrown away, so nothing can ever fail. It needs assert add(2, 2) == 4. A test that cannot fail is worse than no test, because it looks like coverage.',
    tags: ['assert', 'pitfall'],
  },
  {
    id: 'testing-quality-h-001',
    topic: 'testing-quality',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which practices make a unit test suite trustworthy?',
    options: [
      'Each test is independent of the others and of execution order',
      'Tests avoid real network and database calls, using fakes or fixtures instead',
      'A test asserts one clear behaviour with a descriptive name',
      'Tests share module-level mutable state to run faster',
    ],
    answerIndices: [0, 1, 2],
    explanation:
      'Independence, isolation from external systems and focused assertions all make failures easy to interpret. Shared mutable state creates order-dependent tests that fail mysteriously.',
    tags: ['best-practice'],
  },
  {
    id: 'testing-quality-h-002',
    topic: 'testing-quality',
    tier: 'hard',
    type: 'output',
    prompt: 'What does this print?',
    code: String.raw`def f(x: int) -> int:
    return x * 2

print(f("ab"))`,
    options: ['TypeError', 'abab', '4', 'None'],
    answerIndex: 1,
    explanation:
      'Annotations are not enforced, so the str is accepted and * repeats it, giving "abab". This is exactly the class of bug a static type checker would have caught before runtime.',
    tags: ['typing', 'annotations'],
  },
  {
    id: 'testing-quality-e-005',
    topic: 'testing-quality',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the difference between a unit test and an integration test?',
    back: 'A unit test exercises one piece of logic in isolation, with its collaborators faked, and runs in milliseconds. An integration test checks that several real components work together, and is slower but catches wiring mistakes.',
    tags: ['terminology'],
  },
  {
    id: 'testing-quality-e-006',
    topic: 'testing-quality',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What does code coverage measure, and what does it NOT tell you?',
    back: 'It measures which lines or branches ran during the tests. It does not tell you whether the assertions were meaningful - code can be 100% covered by tests that assert nothing useful.',
    tags: ['coverage'],
  },
  {
    id: 'testing-quality-i-004',
    topic: 'testing-quality',
    tier: 'intermediate',
    type: 'order',
    prompt: 'Put these lines in order to form a minimal unittest test case.',
    items: [
      'import unittest',
      'class TestMath(unittest.TestCase):',
      '    def test_add(self):',
      '        self.assertEqual(1 + 1, 2)',
      "if __name__ == '__main__':",
      '    unittest.main()',
    ],
    explanation:
      'Import the framework, subclass TestCase, write a method whose name starts with test_, then run the suite under the main guard so the file stays importable.',
    tags: ['unittest', 'flow'],
  },
]

export default questions
