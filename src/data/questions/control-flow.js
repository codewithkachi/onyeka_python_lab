// Conditionals & Loops
//
// Target: 16 questions = 2 flashcard + 1 order + 13 graded
// Graded tier split: easy 5 / intermediate 5 / hard 3
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'control-flow-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'control-flow-e-001',
    topic: 'control-flow',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which keyword skips the rest of the current loop iteration and moves to the next one?',
    options: ['break', 'pass', 'continue', 'skip'],
    answerIndex: 2,
    explanation:
      'continue jumps straight to the next iteration. break exits the loop entirely, pass does nothing at all, and skip is not a Python keyword.',
    tags: ['loops', 'keywords'],
  },
  {
    id: 'control-flow-e-002',
    topic: 'control-flow',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What values does for i in range(3) iterate over?',
    options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', '1, 2'],
    answerIndex: 1,
    explanation:
      'range(stop) starts at 0 and stops BEFORE the stop value, yielding 0, 1, 2. This half-open convention means range(len(x)) covers exactly the valid indices of x.',
    tags: ['range', 'loops'],
  },
  {
    id: 'control-flow-e-003',
    topic: 'control-flow',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which loop in Python is guaranteed to execute its body at least once?',
    options: ['for loop', 'while loop', 'Python has no such loop', 'do-while loop'],
    answerIndex: 2,
    explanation:
      'Python has no do-while construct. Both for and while test before entering the body. The usual workaround is while True with a break at the bottom.',
    tags: ['loops'],
  },
  {
    id: 'control-flow-e-004',
    topic: 'control-flow',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does the pass statement do?',
    options: [
      'Exits the enclosing function',
      'Skips one loop iteration',
      'Nothing at all; it is a syntactic placeholder',
      'Raises NotImplementedError',
    ],
    answerIndex: 2,
    explanation:
      'pass is a no-op used where the grammar demands a statement but you have nothing to run yet, such as an empty class or a stub branch you intend to fill in later.',
    tags: ['keywords'],
  },
  {
    id: 'control-flow-i-001',
    topic: 'control-flow',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What is the purpose of the else clause attached to a for loop?',
    options: [
      'It runs if an exception occurred',
      'It runs only if the loop finished without hitting a break',
      'It always runs after the loop',
      'It is a syntax error',
    ],
    answerIndex: 1,
    explanation:
      'for/else runs the else block only when the loop was NOT broken out of, which makes it a clean way to express "searched everything and found nothing".',
    tags: ['loops', 'for-else'],
  },
  {
    id: 'control-flow-i-002',
    topic: 'control-flow',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`for i in range(5):
    if i == 3:
        break
else:
    print("done")
print(i)`,
    options: ['done then 3', '3', 'done then 4', '4'],
    answerIndex: 1,
    explanation:
      'The break skips the else block entirely, so "done" is never printed. The loop variable survives the loop and holds the value it had when the break fired, which is 3.',
    tags: ['loops', 'for-else', 'scope'],
  },
  {
    id: 'control-flow-i-003',
    topic: 'control-flow',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`x = 0
while x < 3:
    x += 1
print(x)`,
    options: ['2', '3', '4', 'Infinite loop'],
    answerIndex: 1,
    explanation:
      'The loop exits as soon as the condition is false, which first happens when x reaches 3. The body does not run for x == 3, but x keeps that value afterwards.',
    tags: ['while', 'loops'],
  },
  {
    id: 'control-flow-h-001',
    topic: 'control-flow',
    tier: 'hard',
    type: 'bug',
    prompt: 'This is meant to print each index and value, but crashes. What is wrong?',
    code: String.raw`items = ['a', 'b', 'c']
for i, val in items:
    print(i, val)`,
    options: [
      'Unpacking two names requires pairs; use enumerate(items)',
      'The list must be converted to a tuple first',
      'print() cannot take two arguments',
      'The loop variables must be declared before the loop',
    ],
    answerIndex: 0,
    explanation:
      'Iterating a list of strings yields one string per step, and Python cannot unpack "a" into two names. enumerate(items) yields (index, value) pairs, which unpack correctly.',
    tags: ['enumerate', 'unpacking'],
  },
]

export default questions
