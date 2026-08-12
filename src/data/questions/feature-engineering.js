// Preprocessing & Feature Engineering
//
// Target: 16 questions = 2 flashcard + 1 order + 13 graded
// Graded tier split: easy 5 / intermediate 5 / hard 3
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'feature-engineering-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'feature-engineering-e-001',
    topic: 'feature-engineering',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does one-hot encoding do to a categorical column?',
    options: [
      'Creates a binary column per category, with a 1 in the matching column',
      'Replaces each category with an integer rank',
      'Removes the column',
      'Scales the column to zero mean and unit variance',
    ],
    answerIndex: 0,
    explanation:
      'One-hot avoids implying an order between categories. Assigning integers instead would tell a linear model that "green" (2) is somehow twice "red" (1), which is meaningless.',
    tags: ['encoding', 'categorical'],
  },
  {
    id: 'feature-engineering-e-002',
    topic: 'feature-engineering',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does StandardScaler do to a feature?',
    options: [
      'Subtracts the mean and divides by the standard deviation',
      'Squeezes values into the range 0 to 1',
      'Takes the natural logarithm',
      'Removes outliers beyond three standard deviations',
    ],
    answerIndex: 0,
    explanation:
      'The result has zero mean and unit variance. MinMaxScaler is the one that maps to [0, 1]; RobustScaler uses the median and IQR when outliers would distort the mean.',
    tags: ['scaling', 'standardisation'],
  },
  {
    id: 'feature-engineering-e-003',
    topic: 'feature-engineering',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which of these models genuinely needs feature scaling?',
    options: ['Decision tree', 'k-nearest neighbours', 'Random forest', 'Naive Bayes on counts'],
    answerIndex: 1,
    explanation:
      'kNN measures distances, so a feature with a big numeric range dominates unless scaled. Tree-based models split on thresholds one feature at a time and are unaffected by scale.',
    tags: ['scaling', 'algorithms'],
  },
  {
    id: 'feature-engineering-i-001',
    topic: 'feature-engineering',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'When is ordinal encoding more appropriate than one-hot encoding?',
    options: [
      'When the categories have a genuine order, such as small < medium < large',
      'Whenever there are more than three categories',
      'Only for the target variable',
      'When the column contains missing values',
    ],
    answerIndex: 0,
    explanation:
      'Ordinal encoding preserves real order and keeps the matrix narrow. Using it on unordered categories invents a false ranking that linear and distance-based models will believe.',
    tags: ['encoding', 'ordinal'],
  },
  {
    id: 'feature-engineering-i-002',
    topic: 'feature-engineering',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What is the curse of dimensionality?',
    options: [
      'As features multiply, data becomes sparse and distances lose meaning, so more data is needed',
      'Models with many features always train faster',
      'High-dimensional data cannot be stored efficiently',
      'Adding features always reduces accuracy',
    ],
    answerIndex: 0,
    explanation:
      'In high dimensions points spread out and nearest neighbours stop being meaningfully near. This is why feature selection and dimensionality reduction such as PCA matter.',
    tags: ['dimensionality', 'concepts'],
  },
  {
    id: 'feature-engineering-i-003',
    topic: 'feature-engineering',
    tier: 'intermediate',
    type: 'bug',
    prompt: 'This encodes a categorical column but breaks at prediction time. Why?',
    code: String.raw`import pandas as pd
X_train = pd.get_dummies(df_train)
X_test = pd.get_dummies(df_test)
model.fit(X_train, y_train)
model.predict(X_test)`,
    options: [
      'Each frame is encoded independently, so the two can end up with different columns',
      'get_dummies cannot be used on training data',
      'predict() requires the original DataFrame, not an encoded one',
      'get_dummies must be called on the target as well',
    ],
    answerIndex: 0,
    explanation:
      'If a category appears in only one split, the column sets diverge and the model receives the wrong shape or misaligned features. Use OneHotEncoder(handle_unknown="ignore") inside a Pipeline.',
    tags: ['encoding', 'pitfall', 'pipeline'],
  },
  {
    id: 'feature-engineering-h-001',
    topic: 'feature-engineering',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which of these are legitimate feature-engineering steps for a tabular problem?',
    options: [
      'Deriving a ratio or difference between two related columns',
      'Extracting day-of-week and month from a timestamp',
      'Binning a skewed continuous variable into quantiles',
      'Including a column recorded only after the outcome is known',
    ],
    answerIndices: [0, 1, 2],
    explanation:
      'The last is target leakage: a feature unavailable at prediction time will look brilliant in validation and be unusable in production. The others encode real domain structure.',
    tags: ['leakage', 'feature-creation'],
  },
  {
    id: 'feature-engineering-h-002',
    topic: 'feature-engineering',
    tier: 'hard',
    type: 'mcq',
    prompt: 'Why can high-cardinality one-hot encoding be a problem, and what is a common alternative?',
    options: [
      'It explodes the feature count and creates sparsity; target or frequency encoding is often used instead',
      'It is mathematically invalid above ten categories',
      'It always causes the model to underfit',
      'It converts the column to strings, which models reject',
    ],
    answerIndex: 0,
    explanation:
      'A column with 10,000 IDs becomes 10,000 sparse columns. Target encoding replaces a category with a statistic of the target — but it must be computed within folds, or it leaks.',
    tags: ['encoding', 'cardinality'],
  },
  {
    id: 'feature-engineering-e-004',
    topic: 'feature-engineering',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the difference between normalisation and standardisation?',
    back: 'Normalisation (MinMaxScaler) rescales into a fixed range, usually [0, 1], and is sensitive to outliers. Standardisation (StandardScaler) shifts to zero mean and unit variance, leaving the distribution shape unchanged.',
    tags: ['scaling'],
  },
  {
    id: 'feature-engineering-e-005',
    topic: 'feature-engineering',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is target leakage, and how do you spot it?',
    back: 'A feature that encodes information unavailable at prediction time. The tell-tale sign is a validation score that seems too good to be true — then check whether each feature could really have been known before the outcome.',
    tags: ['leakage'],
  },
  {
    id: 'feature-engineering-i-004',
    topic: 'feature-engineering',
    tier: 'intermediate',
    type: 'order',
    prompt: 'Put these preprocessing steps into a leak-free order.',
    items: [
      'Split the data into training and test sets',
      'Fit the imputer and scaler on the training set only',
      'Transform the training set with the fitted objects',
      'Transform the test set with those same fitted objects',
      'Fit the model on the transformed training set',
    ],
    explanation:
      'Everything learned from data — imputation values, scaling statistics, encodings — must be fitted on training data alone, then merely applied to the test set.',
    tags: ['leakage', 'workflow', 'flow'],
  },
]

export default questions
