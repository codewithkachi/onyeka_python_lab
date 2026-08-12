// NumPy Arrays & Broadcasting
//
// Target: 20 questions = 2 flashcard + 1 order + 17 graded
// Graded tier split: easy 7 / intermediate 6 / hard 4
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'numpy-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'numpy-e-001',
    topic: 'numpy',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is the conventional import for NumPy?',
    options: ['import numpy as np', 'import numpy as numpy', 'from numpy import *', 'import np'],
    answerIndex: 0,
    explanation:
      'np is the near-universal alias. Following the convention matters more than it looks: almost every tutorial, error message and code review assumes it.',
    tags: ['import', 'convention'],
  },
  {
    id: 'numpy-e-002',
    topic: 'numpy',
    tier: 'easy',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`import numpy as np
a = np.arange(6).reshape(2, 3)
print(a.shape)`,
    options: ['(2, 3)', '(3, 2)', '(6,)', '6'],
    answerIndex: 0,
    explanation:
      'arange(6) gives [0..5] and reshape(2, 3) arranges it as 2 rows by 3 columns. shape always reads outermost dimension first.',
    tags: ['shape', 'reshape'],
  },
  {
    id: 'numpy-e-003',
    topic: 'numpy',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is the main advantage of a NumPy array over a Python list for numerical work?',
    options: [
      'It can hold values of mixed types',
      'It stores one dtype in contiguous memory and operates on whole arrays in compiled code',
      'It automatically sorts its contents',
      'It has no fixed size limit',
    ],
    answerIndex: 1,
    explanation:
      'A homogeneous, contiguous buffer lets NumPy push loops down into C, which is where the order-of-magnitude speed-up comes from. Mixed types are a LIST feature, not an array one.',
    tags: ['performance', 'dtype'],
  },
  {
    id: 'numpy-e-004',
    topic: 'numpy',
    tier: 'easy',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`import numpy as np
a = np.array([1, 2, 3])
print(a * 2)`,
    options: ['[1 2 3 1 2 3]', '[2 4 6]', '[1 2 3 2]', 'TypeError'],
    answerIndex: 1,
    explanation:
      'Arithmetic on arrays is elementwise, so every element doubles. Note this is exactly where arrays differ from lists: [1, 2, 3] * 2 would REPEAT the list instead.',
    tags: ['vectorisation', 'elementwise'],
  },
  {
    id: 'numpy-e-005',
    topic: 'numpy',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which function creates an array of evenly spaced values over a closed interval?',
    options: ['np.arange', 'np.linspace', 'np.random.rand', 'np.eye'],
    answerIndex: 1,
    explanation:
      'linspace(start, stop, num) includes the endpoint and lets you fix HOW MANY points you get. arange takes a step instead, and excludes the stop value.',
    tags: ['creation', 'linspace'],
  },
  {
    id: 'numpy-i-001',
    topic: 'numpy',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'Under broadcasting, what is the resulting shape of an operation between arrays of shape (3, 1) and (1, 4)?',
    options: ['(3, 4)', '(3, 1)', '(1, 4)', 'It raises a ValueError'],
    answerIndex: 0,
    explanation:
      'Dimensions are compared from the right; a length-1 axis is stretched to match the other. So (3,1) and (1,4) both expand to (3,4). This is how you build an outer product without a loop.',
    tags: ['broadcasting', 'shape'],
  },
  {
    id: 'numpy-i-002',
    topic: 'numpy',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`import numpy as np
a = np.array([1, 2, 3, 4])
print(a[a > 2])`,
    options: ['[3 4]', '[False False True True]', '[1 2]', '[2 3]'],
    answerIndex: 0,
    explanation:
      'a > 2 builds a boolean mask, and indexing with that mask selects the elements where it is True. Boolean masking is the idiomatic NumPy replacement for a filtering loop.',
    tags: ['boolean-indexing', 'masking'],
  },
  {
    id: 'numpy-i-003',
    topic: 'numpy',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What does axis=0 mean when calling a.mean(axis=0) on a 2-D array?',
    options: [
      'Average across the rows, producing one value per column',
      'Average across the columns, producing one value per row',
      'Average every element into a single number',
      'Average only the first row',
    ],
    answerIndex: 0,
    explanation:
      'The axis argument names the dimension that is COLLAPSED. Collapsing axis 0 (rows) leaves one value per column. Remembering "the axis disappears" resolves most confusion here.',
    tags: ['axis', 'aggregation'],
  },
  {
    id: 'numpy-i-004',
    topic: 'numpy',
    tier: 'intermediate',
    type: 'bug',
    prompt: 'Why does modifying b also change a?',
    code: String.raw`import numpy as np
a = np.array([1, 2, 3, 4])
b = a[:2]
b[0] = 99
print(a)`,
    options: [
      'Basic slicing returns a VIEW into the same memory, not a copy',
      'NumPy arrays are always passed by reference to any function',
      'Assigning to b[0] rebinds the whole array a',
      'Integer arrays are interned and shared',
    ],
    answerIndex: 0,
    explanation:
      'A basic slice is a view sharing the parent buffer, which is what makes slicing free. Use a[:2].copy() when you need independence. Fancy and boolean indexing DO copy.',
    tags: ['views', 'copy', 'pitfall'],
  },
  {
    id: 'numpy-i-005',
    topic: 'numpy',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What does np.array([1, 2, 3]).dtype report, and why does dtype matter in ML?',
    options: [
      'int64 (or int32 on Windows); dtype fixes memory use and numeric precision',
      'float64 always; dtype only affects printing',
      'object; NumPy stores Python ints directly',
      'int8; NumPy always picks the smallest type that fits',
    ],
    answerIndex: 0,
    explanation:
      'NumPy infers an integer dtype here, platform-dependent in width. dtype drives memory footprint and precision, which is why models are often cast to float32 to halve memory.',
    tags: ['dtype', 'memory'],
  },
  {
    id: 'numpy-h-001',
    topic: 'numpy',
    tier: 'hard',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`import numpy as np
a = np.arange(6).reshape(2, 3)
print(a.sum(axis=1))`,
    options: ['[3 12]', '[3 5 7]', '15', '[[3] [12]]'],
    answerIndex: 0,
    explanation:
      'Collapsing axis 1 sums across each row: 0+1+2 = 3 and 3+4+5 = 12. Summing axis 0 instead would give the per-column totals [3 5 7].',
    tags: ['axis', 'aggregation'],
  },
  {
    id: 'numpy-h-002',
    topic: 'numpy',
    tier: 'hard',
    type: 'mcq',
    prompt: 'Arrays of shape (3, 4) and (3,) are added. What happens?',
    options: [
      'ValueError: broadcasting aligns from the right, so 4 and 3 are incompatible',
      'It works, adding the vector to each column',
      'It works, adding the vector to each row',
      'The smaller array is padded with zeros',
    ],
    answerIndex: 0,
    explanation:
      'Shapes align from the trailing axis: 4 against 3 matches neither rule (equal, or one of them 1). Reshape to (3, 1) to add per-row, which is the classic fix.',
    tags: ['broadcasting', 'errors'],
  },
  {
    id: 'numpy-h-003',
    topic: 'numpy',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which statements about NumPy performance are true?',
    options: [
      'Vectorised operations avoid the per-element Python interpreter overhead',
      'np.vectorize makes a Python function run at C speed',
      'Operations on a contiguous array are usually faster than on a strided view',
      'Preallocating an output array beats repeatedly np.append-ing to one',
    ],
    answerIndices: [0, 2, 3],
    explanation:
      'np.vectorize is only a convenience wrapper around a Python loop — it is NOT a speed optimisation, and the docs say so. The other three are genuine performance properties.',
    tags: ['performance', 'vectorisation'],
  },
  {
    id: 'numpy-h-004',
    topic: 'numpy',
    tier: 'hard',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`import numpy as np
a = np.array([1.0, 2.0])
a[0] = 5
print(a.dtype, a[0])`,
    options: ['float64 5.0', 'int64 5', 'object 5', 'float64 5'],
    answerIndex: 0,
    explanation:
      'An array has ONE fixed dtype. Assigning the int 5 into a float64 array casts it to 5.0 rather than changing the array type. Storing a string there would raise ValueError.',
    tags: ['dtype', 'casting'],
  },
  {
    id: 'numpy-e-006',
    topic: 'numpy',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is broadcasting in NumPy?',
    back: 'Rules that let arrays of different shapes combine without copying data. Shapes are compared right to left; axes must be equal or one of them must be 1, and length-1 axes are stretched to fit.',
    tags: ['broadcasting'],
  },
  {
    id: 'numpy-e-007',
    topic: 'numpy',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the difference between a view and a copy?',
    back: 'A view shares the original buffer, so writing to it changes the parent — basic slicing gives views. A copy owns its own memory. Fancy indexing and boolean masking always return copies.',
    tags: ['views', 'copy'],
  },
  {
    id: 'numpy-i-006',
    topic: 'numpy',
    tier: 'intermediate',
    type: 'order',
    prompt: 'Put these lines in order to standardise a feature matrix column by column.',
    items: [
      'import numpy as np',
      'X = np.random.rand(100, 5)',
      'mu = X.mean(axis=0)',
      'sigma = X.std(axis=0)',
      'X_scaled = (X - mu) / sigma',
    ],
    explanation:
      'Compute the per-column mean and standard deviation first, then subtract and divide. Broadcasting applies the length-5 statistics across all 100 rows automatically.',
    tags: ['standardisation', 'broadcasting', 'flow'],
  },
]

export default questions
