// pandas DataFrames
//
// Target: 22 questions = 2 flashcard + 1 order + 19 graded
// Graded tier split: easy 8 / intermediate 7 / hard 4
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'pandas-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'pandas-e-001',
    topic: 'pandas',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is the difference between a pandas Series and a DataFrame?',
    options: [
      'A Series is one labelled column; a DataFrame is a labelled table of columns',
      'A Series holds strings and a DataFrame holds numbers',
      'A Series is mutable and a DataFrame is immutable',
      'They are aliases for the same class',
    ],
    answerIndex: 0,
    explanation:
      'A Series is a 1-D labelled array. A DataFrame is a 2-D table whose columns are Series sharing one index. Selecting a single column with df["a"] hands you a Series.',
    tags: ['series', 'dataframe'],
  },
  {
    id: 'pandas-e-002',
    topic: 'pandas',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which method shows the first five rows of a DataFrame?',
    options: ['df.top()', 'df.head()', 'df.first()', 'df.peek()'],
    answerIndex: 1,
    explanation:
      'head(n) returns the first n rows, defaulting to 5, and tail(n) the last. Both return a new DataFrame rather than printing, so they chain.',
    tags: ['inspection'],
  },
  {
    id: 'pandas-e-003',
    topic: 'pandas',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is the key difference between df.loc and df.iloc?',
    options: [
      'loc selects by LABEL, iloc selects by integer POSITION',
      'loc is for rows and iloc is for columns',
      'loc returns a copy and iloc returns a view',
      'loc works only on sorted indexes',
    ],
    answerIndex: 0,
    explanation:
      'loc uses index labels and its slices are INCLUSIVE of the endpoint; iloc uses 0-based positions with the usual exclusive stop. Mixing them up is a very common source of off-by-one bugs.',
    tags: ['loc', 'iloc', 'indexing'],
  },
  {
    id: 'pandas-e-004',
    topic: 'pandas',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which call reads a CSV file into a DataFrame?',
    options: ['pd.open_csv("f.csv")', 'pd.read_csv("f.csv")', 'pd.load_csv("f.csv")', 'pd.DataFrame.csv("f.csv")'],
    answerIndex: 1,
    explanation:
      'read_csv is the workhorse loader, with options for separators, dtypes, missing-value markers and column subsets. Its siblings are read_parquet, read_json and read_sql.',
    tags: ['io', 'csv'],
  },
  {
    id: 'pandas-i-001',
    topic: 'pandas',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`import pandas as pd
df = pd.DataFrame({"a": [1, 2, 3], "b": [4, 5, 6]})
print(df.shape)`,
    options: ['(3, 2)', '(2, 3)', '(3,)', '6'],
    answerIndex: 0,
    explanation:
      'shape is (rows, columns): three rows and two columns. The same row-major convention as NumPy, which matters when you hand a DataFrame to scikit-learn.',
    tags: ['shape'],
  },
  {
    id: 'pandas-i-002',
    topic: 'pandas',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What does df.groupby("city")["sales"].mean() return?',
    options: [
      'A Series of average sales indexed by city',
      'A DataFrame with one row per sale',
      'The overall mean of the sales column',
      'A list of city names',
    ],
    answerIndex: 0,
    explanation:
      'groupby splits by the key, applies the aggregation per group and combines the results — here a Series indexed by city. Add reset_index() if you want it back as a flat DataFrame.',
    tags: ['groupby', 'aggregation'],
  },
  {
    id: 'pandas-i-003',
    topic: 'pandas',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'How do you select the rows where the age column exceeds 30?',
    options: ['df[df["age"] > 30]', 'df.where(age > 30)', 'df.select("age > 30")', 'df[age > 30]'],
    answerIndex: 0,
    explanation:
      'The inner expression builds a boolean Series, and indexing the frame with it keeps the True rows. df.query("age > 30") is an equivalent, often more readable, alternative.',
    tags: ['filtering', 'boolean-indexing'],
  },
  {
    id: 'pandas-i-004',
    topic: 'pandas',
    tier: 'intermediate',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`import pandas as pd
import numpy as np
s = pd.Series([1, np.nan, 3])
print(s.sum(), s.mean())`,
    options: ['4.0 2.0', 'nan nan', '4.0 1.3333333333333333', '4 2'],
    answerIndex: 0,
    explanation:
      'pandas SKIPS NaN by default, so the sum is 4 and the mean divides by the 2 valid values, giving 2.0. NumPy would return nan for both — a real difference worth knowing.',
    tags: ['missing-data', 'nan'],
  },
  {
    id: 'pandas-i-005',
    topic: 'pandas',
    tier: 'intermediate',
    type: 'bug',
    prompt: 'Why does this often fail to change df, and warn about chained assignment?',
    code: String.raw`import pandas as pd
df = pd.DataFrame({"a": [1, 2, 3]})
df[df["a"] > 1]["a"] = 99
print(df)`,
    options: [
      'The first index returns a temporary copy, so the write lands on the copy',
      'Boolean masks are read-only in pandas',
      'The column name must be given before the row filter',
      'Assignment needs an explicit .apply() call',
    ],
    answerIndex: 0,
    explanation:
      'This is chained indexing: df[mask] produces a new object and the assignment mutates that throwaway. Use a single .loc call — df.loc[df["a"] > 1, "a"] = 99 — which writes in place.',
    tags: ['chained-assignment', 'loc', 'pitfall'],
  },
  {
    id: 'pandas-i-006',
    topic: 'pandas',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What does df.merge(other, on="id", how="left") do?',
    options: [
      'Keeps every row of df and attaches matching columns from other, filling NaN where there is no match',
      'Keeps only the ids present in both frames',
      'Stacks the two frames vertically',
      'Keeps every row of other instead',
    ],
    answerIndex: 0,
    explanation:
      'A left join preserves the left frame\'s rows and widens them with matched columns. Use how="inner" for the intersection. Stacking vertically is pd.concat, not merge.',
    tags: ['merge', 'joins'],
  },
  {
    id: 'pandas-h-001',
    topic: 'pandas',
    tier: 'hard',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`import pandas as pd
df = pd.DataFrame({"g": ["a", "a", "b"], "v": [1, 2, 3]})
print(df.groupby("g")["v"].sum().to_dict())`,
    options: ["{'a': 3, 'b': 3}", "{'a': 1, 'b': 3}", "{'a': 2, 'b': 3}", "{'a': 3, 'b': 0}"],
    answerIndex: 0,
    explanation:
      'Group a sums 1 + 2 = 3 and group b has the single value 3, so both come to 3. A neat reminder that equal aggregates do not imply equal group sizes.',
    tags: ['groupby'],
  },
  {
    id: 'pandas-h-002',
    topic: 'pandas',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which are sensible ways to handle missing values before modelling?',
    options: [
      'Impute with a statistic computed on the TRAINING split only',
      'Drop rows when the missing fraction is tiny and loss is acceptable',
      'Add a boolean "was missing" indicator column',
      'Impute using the mean of the full dataset before splitting',
    ],
    answerIndices: [0, 1, 2],
    explanation:
      'Imputing from the full dataset before splitting leaks test information into training and inflates your validation score. Fit the imputer on train, then apply it to test.',
    tags: ['missing-data', 'leakage'],
  },
  {
    id: 'pandas-h-003',
    topic: 'pandas',
    tier: 'hard',
    type: 'mcq',
    prompt: 'Why is df.apply(some_func, axis=1) usually slow on a large frame?',
    options: [
      'It calls a Python function once per row instead of operating on whole columns',
      'It copies the DataFrame for every row',
      'It always converts the frame to a list of dicts first',
      'It disables the pandas index',
    ],
    answerIndex: 0,
    explanation:
      'Row-wise apply is a Python-level loop, so you lose the vectorised C paths. Prefer column arithmetic, np.where or a groupby transform; they operate on whole arrays at once.',
    tags: ['performance', 'apply', 'vectorisation'],
  },
  {
    id: 'pandas-e-005',
    topic: 'pandas',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What does df.info() tell you?',
    back: 'Row count, each column with its non-null count and dtype, and total memory use. It is the fastest way to spot missing data and columns wrongly typed as object.',
    tags: ['inspection'],
  },
  {
    id: 'pandas-e-006',
    topic: 'pandas',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the split-apply-combine pattern?',
    back: 'The idea behind groupby: SPLIT rows into groups by a key, APPLY an aggregation or transform to each group, then COMBINE the results into one Series or DataFrame.',
    tags: ['groupby', 'concepts'],
  },
  {
    id: 'pandas-i-007',
    topic: 'pandas',
    tier: 'intermediate',
    type: 'order',
    prompt: 'Put these lines in order to load a CSV and report mean sales per city, biggest first.',
    items: [
      'import pandas as pd',
      'df = pd.read_csv("sales.csv")',
      'df = df.dropna(subset=["sales"])',
      'by_city = df.groupby("city")["sales"].mean()',
      'print(by_city.sort_values(ascending=False))',
    ],
    explanation:
      'Load, clean the rows that cannot contribute, aggregate, then sort for presentation. Dropping missing sales before grouping keeps the per-group means honest.',
    tags: ['groupby', 'flow'],
  },
]

export default questions
