// Metrics, Validation & Overfitting
//
// Target: 18 questions = 2 flashcard + 1 order + 15 graded
// Graded tier split: easy 6 / intermediate 5 / hard 4
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'model-evaluation-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'model-evaluation-e-001',
    topic: 'model-evaluation',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is overfitting?',
    options: [
      'The model learns noise specific to the training data and generalises poorly',
      'The model is too simple to capture the pattern',
      'The training data is too large for the model',
      'The learning rate is set too low',
    ],
    answerIndex: 0,
    explanation:
      'The signature is a large gap between training and validation scores: near-perfect on data it has seen, much worse on data it has not. Being too simple is UNDERfitting.',
    tags: ['overfitting', 'concepts'],
  },
  {
    id: 'model-evaluation-e-002',
    topic: 'model-evaluation',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Why is accuracy a poor metric when 99% of samples belong to one class?',
    options: [
      'A model that always predicts the majority class scores 99% while being useless',
      'Accuracy cannot be computed on imbalanced data',
      'Accuracy always underestimates performance',
      'Accuracy only works for regression',
    ],
    answerIndex: 0,
    explanation:
      'Accuracy hides total failure on the class you usually care about. Use precision, recall, F1 or ROC-AUC, and always look at the confusion matrix on imbalanced problems.',
    tags: ['metrics', 'imbalance'],
  },
  {
    id: 'model-evaluation-e-003',
    topic: 'model-evaluation',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does precision measure?',
    options: [
      'Of the samples predicted positive, the fraction that really were positive',
      'Of the actual positives, the fraction the model found',
      'The proportion of all predictions that were correct',
      'How tightly clustered the predictions are',
    ],
    answerIndex: 0,
    explanation:
      'Precision is TP / (TP + FP) — it answers "when it says yes, how often is it right?". Recall is TP / (TP + FN), answering "how many of the real positives did it catch?".',
    tags: ['metrics', 'precision'],
  },
  {
    id: 'model-evaluation-i-001',
    topic: 'model-evaluation',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'A cancer screening test must miss as few real cases as possible. Which metric should be prioritised?',
    options: ['Recall', 'Precision', 'Training accuracy', 'Mean squared error'],
    answerIndex: 0,
    explanation:
      'A missed case is a false negative, and recall is precisely the metric that penalises those. You accept more false positives — a follow-up test — to avoid missing a real case.',
    tags: ['metrics', 'recall', 'tradeoffs'],
  },
  {
    id: 'model-evaluation-i-002',
    topic: 'model-evaluation',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What does k-fold cross-validation give you over a single train/test split?',
    options: [
      'Every sample is used for validation exactly once, giving a more stable performance estimate',
      'It trains the model k times faster',
      'It removes the need for a test set entirely',
      'It guarantees the model will not overfit',
    ],
    answerIndex: 0,
    explanation:
      'k-fold reduces the variance that comes from one lucky or unlucky split, at k times the compute. You still keep a final untouched test set for the last honest estimate.',
    tags: ['cross-validation'],
  },
  {
    id: 'model-evaluation-i-003',
    topic: 'model-evaluation',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What is the F1 score?',
    options: [
      'The harmonic mean of precision and recall',
      'The arithmetic mean of precision and recall',
      'Accuracy weighted by class frequency',
      'The area under the ROC curve',
    ],
    answerIndex: 0,
    explanation:
      'The HARMONIC mean punishes imbalance: 1.0 precision with 0.0 recall gives F1 = 0, whereas the arithmetic mean would flatter it with 0.5.',
    tags: ['metrics', 'f1'],
  },
  {
    id: 'model-evaluation-i-004',
    topic: 'model-evaluation',
    tier: 'intermediate',
    type: 'bug',
    prompt: 'Why is this reported accuracy meaningless?',
    code: String.raw`model.fit(X_train, y_train)
preds = model.predict(X_train)
print(accuracy_score(y_train, preds))`,
    options: [
      'It scores the model on the data it was trained on, so it measures memorisation',
      'accuracy_score needs probabilities rather than labels',
      'predict() cannot be called on training data',
      'The arguments to accuracy_score are the wrong way round',
    ],
    answerIndex: 0,
    explanation:
      'Training accuracy tells you the model can recall what it saw, not that it generalises. A deep tree hits 100% here and still fails on new data. Always score on held-out data.',
    tags: ['validation', 'pitfall'],
  },
  {
    id: 'model-evaluation-h-001',
    topic: 'model-evaluation',
    tier: 'hard',
    type: 'mcq',
    prompt: 'Training error is very low and validation error is high. What does this indicate?',
    options: [
      'High variance — the model is overfitting',
      'High bias — the model is underfitting',
      'The learning rate is too high',
      'The dataset is too small to train on at all',
    ],
    answerIndex: 0,
    explanation:
      'A large train/validation gap is the classic high-variance signature. Remedies: more data, stronger regularisation, or a simpler model. High bias shows as BOTH errors being poor.',
    tags: ['bias-variance', 'overfitting'],
  },
  {
    id: 'model-evaluation-h-002',
    topic: 'model-evaluation',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which techniques help reduce overfitting?',
    options: [
      'L1 or L2 regularisation',
      'Collecting more training data',
      'Early stopping on a validation metric',
      'Increasing model capacity until training loss reaches zero',
    ],
    answerIndices: [0, 1, 2],
    explanation:
      'Regularisation, more data and early stopping all constrain the model or give it more signal. Driving training loss to zero by adding capacity is how you CAUSE overfitting.',
    tags: ['regularisation', 'overfitting'],
  },
  {
    id: 'model-evaluation-h-003',
    topic: 'model-evaluation',
    tier: 'hard',
    type: 'mcq',
    prompt: 'Why should stratified splitting be used for an imbalanced classification problem?',
    options: [
      'It preserves the class proportions in each split, so rare classes appear in every fold',
      'It makes the classes perfectly balanced by duplicating rare samples',
      'It sorts the data by class before splitting',
      'It removes the rare class from the test set',
    ],
    answerIndex: 0,
    explanation:
      'Without stratification a rare class can be absent from a fold entirely, making its metrics undefined or wildly noisy. Stratifying keeps each split representative — it does not resample.',
    tags: ['stratification', 'imbalance'],
  },
  {
    id: 'model-evaluation-h-004',
    topic: 'model-evaluation',
    tier: 'hard',
    type: 'mcq',
    prompt: 'What does an ROC-AUC of 0.5 mean?',
    options: [
      'The model ranks positives no better than random guessing',
      'The model is correct half the time',
      'The model is perfectly calibrated',
      'Half the features are useless',
    ],
    answerIndex: 0,
    explanation:
      'AUC is the probability that a random positive is ranked above a random negative. 0.5 is chance and 1.0 is perfect. Note it measures RANKING, not whether the probabilities are calibrated.',
    tags: ['metrics', 'roc-auc'],
  },
  {
    id: 'model-evaluation-e-004',
    topic: 'model-evaluation',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the bias-variance tradeoff?',
    back: 'Bias is error from wrong assumptions (too simple, underfits). Variance is sensitivity to the particular training sample (too complex, overfits). Lowering one usually raises the other; the goal is the balance that minimises total error on unseen data.',
    tags: ['bias-variance', 'concepts'],
  },
  {
    id: 'model-evaluation-e-005',
    topic: 'model-evaluation',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What does a confusion matrix show?',
    back: 'Counts of true positives, false positives, true negatives and false negatives. Every classification metric — accuracy, precision, recall, F1 — is derived from these four numbers, which is why it is the first thing to look at.',
    tags: ['metrics', 'confusion-matrix'],
  },
  {
    id: 'model-evaluation-i-005',
    topic: 'model-evaluation',
    tier: 'intermediate',
    type: 'order',
    prompt: 'Put these steps in the correct order for honestly evaluating a model.',
    items: [
      'Hold out a test set and set it aside untouched',
      'Split the remaining data into training and validation folds',
      'Tune hyperparameters using the validation scores',
      'Refit the chosen model on all the non-test data',
      'Report the final score on the untouched test set once',
    ],
    explanation:
      'The test set is spent the moment you make a decision from it. Tune on validation, then touch the test set exactly once at the end for an unbiased estimate.',
    tags: ['validation', 'workflow', 'flow'],
  },
]

export default questions
