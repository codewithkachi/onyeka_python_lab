// Errors & Exception Handling
//
// Target: 14 questions = 2 flashcard + 1 order + 11 graded
// Graded tier split: easy 4 / intermediate 4 / hard 3
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'errors-exceptions-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'errors-exceptions-e-001',
    topic: 'errors-exceptions',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which block runs whether or not an exception was raised?',
    options: ['except', 'else', 'finally', 'catch'],
    answerIndex: 2,
    explanation:
      'finally always runs, including when the try block returns or re-raises, which makes it the right place for cleanup. Python has no catch keyword; it uses except.',
    tags: ['try', 'finally'],
  },
  {
    id: 'errors-exceptions-e-002',
    topic: 'errors-exceptions',
    tier: 'easy',
    type: 'mcq',
    prompt: 'How do you signal an error condition deliberately?',
    options: [
      "throw ValueError('msg')",
      "raise ValueError('msg')",
      "error ValueError('msg')",
      "except ValueError('msg')",
    ],
    answerIndex: 1,
    explanation:
      'raise takes an exception instance or class. throw belongs to other languages, and except only CATCHES exceptions rather than producing them.',
    tags: ['raise'],
  },
  {
    id: 'errors-exceptions-e-003',
    topic: 'errors-exceptions',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What happens when an exception is never caught?',
    options: [
      'It is silently ignored',
      'It propagates up the call stack and terminates the program with a traceback',
      'It is written to a log file automatically',
      'Python retries the failing block',
    ],
    answerIndex: 1,
    explanation:
      'The exception unwinds each frame looking for a handler. With none found the interpreter prints the traceback and exits with a non-zero status.',
    tags: ['propagation', 'traceback'],
  },
  {
    id: 'errors-exceptions-e-004',
    topic: 'errors-exceptions',
    tier: 'easy',
    type: 'mcq',
    prompt: 'How do you define a custom exception type?',
    options: [
      'class MyError:',
      'class MyError(Exception):',
      'def MyError(Exception):',
      'exception MyError:',
    ],
    answerIndex: 1,
    explanation:
      'Custom exceptions inherit from Exception (or a more specific built-in). Inheriting from Exception rather than BaseException keeps them catchable by ordinary except Exception handlers.',
    tags: ['custom-exceptions'],
  },
  {
    id: 'errors-exceptions-i-001',
    topic: 'errors-exceptions',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What does the else clause of a try statement do?',
    options: [
      'Runs only when an exception occurred',
      'Runs only when the try block completed without raising',
      'Always runs after the try block',
      'Catches any exception not named in an except clause',
    ],
    answerIndex: 1,
    explanation:
      'try/else runs on success only. Putting the follow-up work there rather than in try keeps the protected region narrow, so you do not accidentally catch exceptions from unrelated code.',
    tags: ['try', 'else'],
  },
  {
    id: 'errors-exceptions-i-002',
    topic: 'errors-exceptions',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`def f():
    try:
        return "try"
    finally:
        print("finally")

print(f())`,
    options: ['try', 'finally then try', 'try then finally', 'finally'],
    answerIndex: 1,
    explanation:
      'The return value is computed, then finally runs BEFORE the function actually returns, so "finally" prints first and "try" is printed afterwards by the caller.',
    tags: ['finally', 'return'],
  },
  {
    id: 'errors-exceptions-i-003',
    topic: 'errors-exceptions',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`try:
    x = int("abc")
except ValueError:
    print("bad value")
except Exception:
    print("other")`,
    options: ['bad value', 'other', 'bad value then other', 'Nothing'],
    answerIndex: 0,
    explanation:
      'int("abc") raises ValueError, and only the FIRST matching except clause runs. Ordering from most specific to most general is what makes this pattern work.',
    tags: ['except', 'ordering'],
  },
  {
    id: 'errors-exceptions-h-001',
    topic: 'errors-exceptions',
    tier: 'hard',
    type: 'bug',
    prompt: 'Why is this except clause considered harmful?',
    code: String.raw`try:
    result = compute()
except:
    result = None`,
    options: [
      'A bare except also swallows KeyboardInterrupt and SystemExit, and hides real bugs',
      'except must always name a variable',
      'Assigning None inside except is a syntax error',
      'A bare except only catches errors raised on the first line',
    ],
    answerIndex: 0,
    explanation:
      'Bare except catches BaseException, so Ctrl-C and interpreter shutdown are captured too, and genuine bugs vanish silently. Catch the specific exceptions you can actually handle.',
    tags: ['antipattern', 'bare-except'],
  },
  {
    id: 'errors-exceptions-h-002',
    topic: 'errors-exceptions',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which of these are good exception-handling practices?',
    options: [
      'Catch the narrowest exception type that you can actually recover from',
      'Use finally or a context manager to release resources',
      'Catch Exception broadly at every call site to keep the program running',
      'Chain with "raise NewError(...) from err" to preserve the original cause',
    ],
    answerIndices: [0, 1, 3],
    explanation:
      'Narrow catches, guaranteed cleanup and preserved causes all aid debugging. Catching broadly everywhere converts real failures into corrupted state that surfaces much later.',
    tags: ['best-practice'],
  },
  {
    id: 'errors-exceptions-e-005',
    topic: 'errors-exceptions',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the difference between a syntax error and an exception?',
    back: 'A syntax error is raised while Python is parsing the file, so nothing runs at all. An exception happens at runtime in otherwise valid code and can be caught with try/except.',
    tags: ['terminology'],
  },
  {
    id: 'errors-exceptions-i-004',
    topic: 'errors-exceptions',
    tier: 'intermediate',
    type: 'order',
    prompt: 'Put these lines in the correct order for a complete try statement.',
    items: [
      'try:',
      '    value = int(raw)',
      'except ValueError:',
      '    print("not a number")',
      'else:',
      '    print("parsed", value)',
    ],
    explanation:
      'Python requires this exact order: try, then except clauses, then else, and finally last of all. Putting else before except is a SyntaxError.',
    tags: ['try', 'syntax', 'flow'],
  },
]

export default questions
