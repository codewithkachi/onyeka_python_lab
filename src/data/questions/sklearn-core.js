// scikit-learn Workflow
//
// Target: 18 questions = 2 flashcard + 1 order + 15 graded
// Graded tier split: easy 6 / intermediate 5 / hard 4
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'sklearn-core-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'sklearn-core-e-001',
    topic: 'sklearn-core',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What do fit() and predict() do in the scikit-learn estimator API?',
    options: [
      'fit() learns parameters from training data; predict() applies them to new data',
      'fit() reshapes the data; predict() evaluates accuracy',
      'fit() splits the data; predict() trains the model',
      'They are interchangeable',
    ],
    answerIndex: 0,
    explanation:
      'Every estimator follows this contract, which is why models are interchangeable in scikit-learn. Transformers add transform(), and fit_transform() does both in one step.',
    tags: ['api', 'estimator'],
  },
  {
    id: 'sklearn-core-e-002',
    topic: 'sklearn-core',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What shape does scikit-learn expect for the feature matrix X?',
    options: ['(n_features, n_samples)', '(n_samples, n_features)', '(n_samples,)', 'Any shape'],
    answerIndex: 1,
    explanation:
      'Rows are samples, columns are features. A single sample must therefore be reshaped to (1, n_features), which is why predicting on one row often raises a shape error.',
    tags: ['api', 'shape'],
  },
  {
    id: 'sklearn-core-e-003',
    topic: 'sklearn-core',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does train_test_split do?',
    options: [
      'Randomly partitions the data into a training set and a held-out test set',
      'Splits each feature into bins',
      'Divides the data across CPU cores',
      'Separates the features from the labels',
    ],
    answerIndex: 0,
    explanation:
      'It holds out data the model never sees during training, so the test score estimates real-world performance. Pass random_state for reproducibility and stratify for imbalanced classes.',
    tags: ['validation', 'splitting'],
  },
  {
    id: 'sklearn-core-i-001',
    topic: 'sklearn-core',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'Why should a scaler be fitted on the training set only?',
    options: [
      'Fitting on all the data leaks test statistics into training and inflates the score',
      'Fitting on the test set is computationally slower',
      'The scaler cannot handle more than one split',
      'It is only a stylistic convention',
    ],
    answerIndex: 0,
    explanation:
      'The mean and variance used for scaling are learned parameters. Computing them over the test rows lets information about unseen data into training — a textbook case of data leakage.',
    tags: ['leakage', 'preprocessing'],
  },
  {
    id: 'sklearn-core-i-002',
    topic: 'sklearn-core',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What problem does a Pipeline solve?',
    options: [
      'It chains preprocessing and a model into one estimator, so fitting cannot leak across the split',
      'It runs several models in parallel and averages them',
      'It stores the dataset on disk between runs',
      'It automatically tunes hyperparameters',
    ],
    answerIndex: 0,
    explanation:
      'A Pipeline makes the whole chain a single fit/predict unit, so cross-validation refits the preprocessing inside each fold. That is the structural fix for leakage, not just tidiness.',
    tags: ['pipeline', 'leakage'],
  },
  {
    id: 'sklearn-core-i-003',
    topic: 'sklearn-core',
    tier: 'intermediate',
    type: 'bug',
    prompt: 'What is wrong with this evaluation?',
    code: String.raw`from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

X_scaled = StandardScaler().fit_transform(X)
X_tr, X_te, y_tr, y_te = train_test_split(X_scaled, y)`,
    options: [
      'The scaler is fitted on all the data before splitting, leaking test statistics',
      'StandardScaler cannot be used before train_test_split at all',
      'train_test_split must come before any import',
      'fit_transform should be called twice',
    ],
    answerIndex: 0,
    explanation:
      'Split FIRST, then fit the scaler on the training split and merely transform the test split. Wrapping the scaler and model in a Pipeline makes this ordering automatic.',
    tags: ['leakage', 'preprocessing', 'pitfall'],
  },
  {
    id: 'sklearn-core-i-004',
    topic: 'sklearn-core',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What is the difference between a parameter and a hyperparameter?',
    options: [
      'Parameters are learned from data during fit; hyperparameters are set by you beforehand',
      'Hyperparameters are learned and parameters are fixed',
      'They mean the same thing in scikit-learn',
      'Parameters apply to classifiers and hyperparameters to regressors',
    ],
    answerIndex: 0,
    explanation:
      'Regression coefficients are parameters, learned by fit(). The regularisation strength or tree depth is a hyperparameter you choose, usually by searching over a validation set.',
    tags: ['terminology', 'hyperparameters'],
  },
  {
    id: 'sklearn-core-h-001',
    topic: 'sklearn-core',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which of these are supervised learning algorithms?',
    options: ['RandomForestClassifier', 'LinearRegression', 'KMeans', 'LogisticRegression'],
    answerIndices: [0, 1, 3],
    explanation:
      'Supervised methods learn from labelled targets. KMeans is unsupervised clustering — it never sees a y. Note LogisticRegression is a CLASSIFIER despite the name.',
    tags: ['algorithms', 'supervised'],
  },
  {
    id: 'sklearn-core-h-002',
    topic: 'sklearn-core',
    tier: 'hard',
    type: 'mcq',
    prompt: 'What does GridSearchCV(estimator, param_grid, cv=5) actually do?',
    options: [
      'Trains and cross-validates every hyperparameter combination, keeping the best by mean validation score',
      'Trains one model and reports five scores',
      'Randomly samples five hyperparameter settings',
      'Splits the data into five test sets and averages the test scores',
    ],
    answerIndex: 0,
    explanation:
      'It is an exhaustive search: every combination is fitted cv times. Cost grows multiplicatively with the grid, which is why RandomizedSearchCV is often preferred for large grids.',
    tags: ['hyperparameters', 'grid-search'],
  },
  {
    id: 'sklearn-core-h-003',
    topic: 'sklearn-core',
    tier: 'hard',
    type: 'mcq',
    prompt: 'Why does calling fit() a second time on most scikit-learn estimators not continue training?',
    options: [
      'fit() resets the estimator and learns from scratch unless warm_start is enabled',
      'fit() raises an error if called twice',
      'fit() always appends to the previously learned parameters',
      'The second call is silently ignored',
    ],
    answerIndex: 0,
    explanation:
      'fit() is defined to be idempotent: it discards prior state. Incremental learning needs partial_fit() or warm_start=True on estimators that support them.',
    tags: ['api', 'fit'],
  },
  {
    id: 'sklearn-core-e-004',
    topic: 'sklearn-core',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the difference between fit_transform and transform?',
    back: 'fit_transform LEARNS the parameters and applies them — use it on the training split. transform only applies already-learned parameters — use it on validation and test data, so nothing leaks.',
    tags: ['api', 'preprocessing'],
  },
  {
    id: 'sklearn-core-e-005',
    topic: 'sklearn-core',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is data leakage?',
    back: 'When information unavailable at prediction time reaches the model during training — scaling before splitting, using future values, or fitting on the test set. It makes validation scores look great and production performance collapse.',
    tags: ['leakage', 'concepts'],
  },
  {
    id: 'sklearn-core-i-005',
    topic: 'sklearn-core',
    tier: 'intermediate',
    type: 'order',
    prompt: 'Put these lines in order for a leak-free scikit-learn workflow.',
    items: [
      'X_tr, X_te, y_tr, y_te = train_test_split(X, y, random_state=0)',
      'pipe = Pipeline([("scale", StandardScaler()), ("clf", LogisticRegression())])',
      'pipe.fit(X_tr, y_tr)',
      'preds = pipe.predict(X_te)',
      'print(accuracy_score(y_te, preds))',
    ],
    explanation:
      'Split before anything is fitted, build the pipeline, fit only on training data, then predict and score on the held-out test set. The pipeline guarantees the scaler never sees the test rows.',
    tags: ['pipeline', 'workflow', 'flow'],
  },
]

export default questions
