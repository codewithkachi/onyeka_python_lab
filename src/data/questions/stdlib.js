// Standard Library Toolbox
//
// Target: 18 questions = 2 flashcard + 1 order + 15 graded
// Graded tier split: easy 6 / intermediate 5 / hard 4
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'stdlib-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'stdlib-e-001',
    topic: 'stdlib',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which module provides regular expression support in Python?',
    options: ['regex', 're', 'regexp', 'pattern'],
    answerIndex: 1,
    explanation:
      'The built-in re module handles regular expressions. There is a third-party regex package with extra features, but re ships with Python and covers almost every need.',
    tags: ['re', 'regex'],
  },
  {
    id: 'stdlib-e-002',
    topic: 'stdlib',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does the pattern \\d+ match?',
    options: ['Any single letter', 'One or more digits', 'One or more whitespace characters', 'Anything except a digit'],
    answerIndex: 1,
    explanation:
      '\\d matches a digit and + means one or more, so \\d+ matches runs of digits. The uppercase \\D is the negation, matching any non-digit.',
    tags: ['regex', 'patterns'],
  },
  {
    id: 'stdlib-e-003',
    topic: 'stdlib',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does re.sub(pattern, repl, string) do?',
    options: [
      'Returns every match as a list',
      'Returns a new string with matches of pattern replaced by repl',
      'Splits the string on the pattern',
      'Compiles the pattern for reuse',
    ],
    answerIndex: 1,
    explanation:
      're.sub returns a NEW string; Python strings are immutable so nothing is edited in place. Pass count= to limit how many occurrences are replaced.',
    tags: ['regex', 'sub'],
  },
  {
    id: 'stdlib-i-001',
    topic: 'stdlib',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'How does re.match() differ from re.search()?',
    options: [
      'match() searches the whole string; search() only checks the start',
      'match() only anchors at the start of the string; search() scans anywhere in it',
      'They are identical aliases',
      'match() returns a bool; search() returns a match object',
    ],
    answerIndex: 1,
    explanation:
      're.match anchors at position 0, so it fails if the pattern appears later. re.search scans the whole string. Both return a match object or None, never a bool.',
    tags: ['regex', 'match', 'search'],
  },
  {
    id: 'stdlib-i-002',
    topic: 'stdlib',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What does ^ mean inside a character class, as in [^abc]?',
    options: [
      'The start of the string',
      'Literally one of a, b or c',
      'Any single character that is NOT a, b or c',
      'The end of the line',
    ],
    answerIndex: 2,
    explanation:
      'Inside square brackets a leading ^ negates the set. Outside brackets the same character anchors the match to the start of the string, which is a classic source of confusion.',
    tags: ['regex', 'character-class'],
  },
  {
    id: 'stdlib-i-003',
    topic: 'stdlib',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`from collections import Counter
c = Counter("mississippi")
print(c.most_common(1))`,
    options: ["[('i', 4)]", "[('s', 4)]", "[('i', 4), ('s', 4)]", "['i']"],
    answerIndex: 0,
    explanation:
      'Counter tallies each character: i and s both appear 4 times, but most_common breaks ties by first encounter, and i appears before s in "mississippi".',
    tags: ['collections', 'counter'],
  },
  {
    id: 'stdlib-i-004',
    topic: 'stdlib',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`from collections import defaultdict
d = defaultdict(list)
d["a"].append(1)
print(dict(d))`,
    options: ["{'a': [1]}", '{}', 'KeyError', "{'a': 1}"],
    answerIndex: 0,
    explanation:
      'defaultdict calls its factory for a missing key, so d["a"] creates an empty list that can be appended to immediately. A plain dict would raise KeyError here.',
    tags: ['collections', 'defaultdict'],
  },
  {
    id: 'stdlib-h-001',
    topic: 'stdlib',
    tier: 'hard',
    type: 'bug',
    prompt: 'Why does this regex fail to match a Windows path?',
    code: String.raw`import re
print(re.match("C:\new\file", r"C:\new\file"))`,
    options: [
      'The pattern is not a raw string, so \\n and \\f become control characters',
      're.match cannot handle backslashes at all',
      'The arguments are the right way round but the colon must be escaped',
      'Windows paths require re.fullmatch instead',
    ],
    answerIndex: 0,
    explanation:
      'In a normal string \\n is a newline and \\f is a form feed, so the pattern never matches the literal text. Always write regex patterns as raw strings: r"C:\\new\\file".',
    tags: ['regex', 'raw-strings', 'pitfall'],
  },
  {
    id: 'stdlib-h-002',
    topic: 'stdlib',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which standard-library modules would you reach for as described?',
    options: [
      'json - to serialise a dict to a text file',
      'itertools - for lazy combinatorics such as product and groupby',
      'datetime - for timezone-aware timestamps',
      'os - as the modern, preferred way to build filesystem paths',
    ],
    answerIndices: [0, 1, 2],
    explanation:
      'json, itertools and datetime match their descriptions. For path construction the modern recommendation is pathlib, which supersedes the older os.path string helpers.',
    tags: ['stdlib', 'modules'],
  },
  {
    id: 'stdlib-e-004',
    topic: 'stdlib',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'Why should regex patterns be written as raw strings?',
    back: 'Because regex and Python both use backslash escapes. Without the r prefix you must double every backslash, so r"\\d+" is far clearer and safer than "\\\\d+".',
    tags: ['regex', 'raw-strings'],
  },
  {
    id: 'stdlib-e-005',
    topic: 'stdlib',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What does collections.namedtuple give you over a plain tuple?',
    back: 'Named field access (p.x instead of p[0]) while staying an immutable tuple, so it still unpacks and compares like one. For mutable equivalents use a dataclass.',
    tags: ['collections', 'namedtuple'],
  },
]

export default questions
