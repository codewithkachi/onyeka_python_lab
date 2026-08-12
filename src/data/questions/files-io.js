// Files, Paths & Context Managers
//
// Target: 14 questions = 2 flashcard + 1 order + 11 graded
// Graded tier split: easy 4 / intermediate 4 / hard 3
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'files-io-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'files-io-e-001',
    topic: 'files-io',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which mode string opens an existing file for reading?',
    options: ["open('f.txt', 'w')", "open('f.txt', 'r')", "open('f.txt', 'a')", "open('f.txt', 'x')"],
    answerIndex: 1,
    explanation:
      "'r' reads and is the default. Be careful with 'w': it TRUNCATES an existing file immediately. 'a' appends and 'x' fails if the file already exists.",
    tags: ['open', 'modes'],
  },
  {
    id: 'files-io-e-002',
    topic: 'files-io',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which mode appends to a file without discarding its current contents?',
    options: ["'r'", "'w'", "'a'", "'x'"],
    answerIndex: 2,
    explanation:
      "'a' opens for writing with the position at the end, so existing data survives. 'w' would erase the file the moment it is opened, even if you never write anything.",
    tags: ['open', 'modes'],
  },
  {
    id: 'files-io-e-003',
    topic: 'files-io',
    tier: 'easy',
    type: 'mcq',
    prompt: 'How do you open a file so that reads return bytes rather than str?',
    options: ["open('f', 'b')", "open('f', 'rb')", "open('f', 'bytes')", "open('f', 'r', binary=True)"],
    answerIndex: 1,
    explanation:
      "Combine the mode with 'b' to get 'rb'. Binary mode skips text decoding, which is what you want for images, pickles and anything that is not UTF-8 text.",
    tags: ['open', 'binary'],
  },
  {
    id: 'files-io-e-004',
    topic: 'files-io',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does file.readlines() return?',
    options: ['One string containing the whole file', 'A list of lines', 'A generator of lines', 'The number of lines'],
    answerIndex: 1,
    explanation:
      'readlines() returns a list of strings, each keeping its trailing newline. For large files iterate the file object directly instead, which streams one line at a time.',
    tags: ['reading'],
  },
  {
    id: 'files-io-i-001',
    topic: 'files-io',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What does the with statement give you when opening a file?',
    options: [
      'It locks the file against other processes',
      'It closes the file automatically when the block exits, even on an exception',
      'It always opens the file in binary mode',
      'It suppresses any IOError raised inside the block',
    ],
    answerIndex: 1,
    explanation:
      'with calls the context manager\'s __exit__ on the way out, so the file is closed on both the success and the exception path. It does NOT swallow the exception.',
    tags: ['with', 'context-manager'],
  },
  {
    id: 'files-io-i-002',
    topic: 'files-io',
    tier: 'intermediate',
    type: 'bug',
    prompt: 'This writes an unreadable file on some systems. What is missing?',
    code: String.raw`with open("notes.txt", "w") as f:
    f.write("café")`,
    options: [
      'No encoding was specified, so the platform default is used',
      'write() cannot accept non-ASCII characters at all',
      'The mode should be "wb" for any text',
      'The file must be flushed manually before closing',
    ],
    answerIndex: 0,
    explanation:
      'Without encoding=, Python uses the locale default, which is still cp1252 on many Windows systems. Always pass encoding="utf-8" for text you intend to share.',
    tags: ['encoding', 'unicode', 'pitfall'],
  },
  {
    id: 'files-io-i-003',
    topic: 'files-io',
    tier: 'intermediate',
    type: 'output',
    prompt: 'A file contains exactly three lines. What is printed?',
    code: String.raw`with open("f.txt", encoding="utf-8") as f:
    first = f.read()
    second = f.read()
print(len(second))`,
    options: ['0', 'The full file length', '3', 'ValueError'],
    answerIndex: 0,
    explanation:
      'The first read() consumes the whole stream and leaves the cursor at the end, so the second returns an empty string. Call f.seek(0) to rewind before reading again.',
    tags: ['reading', 'file-position'],
  },
  {
    id: 'files-io-h-001',
    topic: 'files-io',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which are genuine advantages of pathlib.Path over manual string paths?',
    options: [
      'The / operator joins path segments correctly on every OS',
      'Methods like .exists() and .read_text() live on the object itself',
      'It removes the need to handle FileNotFoundError',
      'It normalises separators so code written on Windows still runs on Linux',
    ],
    answerIndices: [0, 1, 3],
    explanation:
      'Path gives OS-correct joining, convenient methods and portability. It does not change the fact that a missing file still raises FileNotFoundError when you open it.',
    tags: ['pathlib'],
  },
  {
    id: 'files-io-h-002',
    topic: 'files-io',
    tier: 'hard',
    type: 'output',
    prompt: 'What is printed, given a file whose lines are "a", "b" and "c"?',
    code: String.raw`with open("f.txt", encoding="utf-8") as f:
    lines = [line.strip() for line in f]
print(lines)`,
    options: ["['a\\n', 'b\\n', 'c\\n']", "['a', 'b', 'c']", "['abc']", 'TypeError'],
    answerIndex: 1,
    explanation:
      'Iterating a file yields one line at a time INCLUDING the trailing newline, and strip() removes it. This streaming pattern uses constant memory regardless of file size.',
    tags: ['reading', 'iteration'],
  },
  {
    id: 'files-io-e-005',
    topic: 'files-io',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What are the two methods a class must define to work with the with statement?',
    back: '__enter__, which runs on entry and supplies the value bound by "as", and __exit__, which runs on the way out and receives any exception details so it can clean up.',
    tags: ['context-manager', 'dunder'],
  },
  {
    id: 'files-io-i-004',
    topic: 'files-io',
    tier: 'intermediate',
    type: 'order',
    prompt: 'Put these lines in order to safely append a timestamped line to a log file.',
    items: [
      'from datetime import datetime',
      'stamp = datetime.now().isoformat()',
      'with open("app.log", "a", encoding="utf-8") as f:',
      '    f.write(f"{stamp} started\\n")',
    ],
    explanation:
      'Import first, compute the timestamp, then open in append mode inside a with block so the file is closed automatically. The write is indented because it belongs to the with body.',
    tags: ['with', 'append', 'flow'],
  },
]

export default questions
