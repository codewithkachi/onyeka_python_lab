// MLOps, Serving & Monitoring
//
// Target: 14 questions = 2 flashcard + 1 order + 11 graded
// Graded tier split: easy 4 / intermediate 4 / hard 3
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'mlops-deploy-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'mlops-deploy-e-001',
    topic: 'mlops-deploy',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is model drift?',
    options: [
      'Performance degrading over time as live data diverges from the training distribution',
      'The model file becoming corrupted on disk',
      'Predictions arriving slower as traffic grows',
      'Weights changing during inference',
    ],
    answerIndex: 0,
    explanation:
      'The world moves and the model does not. Data drift means the inputs shift; concept drift means the input-to-output relationship itself changes. Both call for monitoring and retraining.',
    tags: ['drift', 'monitoring'],
  },
  {
    id: 'mlops-deploy-e-002',
    topic: 'mlops-deploy',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Why pin dependency versions in a requirements or lock file for an ML project?',
    options: [
      'So the environment can be rebuilt exactly, keeping results reproducible',
      'So the model trains faster',
      'So the model file is smaller',
      'Because pip refuses to install unpinned packages',
    ],
    answerIndex: 0,
    explanation:
      'A minor version bump in a numerics library can silently change results. Pinning is the cheapest reproducibility guarantee available, and the first thing to do on any real project.',
    tags: ['reproducibility', 'dependencies'],
  },
  {
    id: 'mlops-deploy-e-003',
    topic: 'mlops-deploy',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is the difference between batch and real-time (online) inference?',
    options: [
      'Batch scores many rows on a schedule; online scores single requests on demand with low latency',
      'Batch is always more accurate',
      'Online inference cannot use a GPU',
      'Batch inference requires a different model architecture',
    ],
    answerIndex: 0,
    explanation:
      'The choice is driven by how fresh the prediction must be. Batch is simpler and cheaper per row; online adds latency budgets, autoscaling and much more operational surface.',
    tags: ['serving', 'inference'],
  },
  {
    id: 'mlops-deploy-i-001',
    topic: 'mlops-deploy',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'Why is training/serving skew a serious problem?',
    options: [
      'Features computed differently in production than in training silently degrade predictions',
      'It makes the model file larger',
      'It prevents the model from loading',
      'It only affects deep learning models',
    ],
    answerIndex: 0,
    explanation:
      'If training used one preprocessing path and serving another, the model receives inputs it was never trained on and quality drops with no error raised. Sharing one code path is the fix.',
    tags: ['skew', 'serving'],
  },
  {
    id: 'mlops-deploy-i-002',
    topic: 'mlops-deploy',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What should be versioned to make an ML experiment reproducible?',
    options: [
      'Code, data, hyperparameters, environment and the random seed',
      'Only the model weights',
      'Only the training script',
      'Only the final accuracy number',
    ],
    answerIndex: 0,
    explanation:
      'A result is reproducible only if every input to it is captured. Data and seeds are the ones most often forgotten, and they are usually the ones that make a run impossible to repeat.',
    tags: ['reproducibility', 'versioning'],
  },
  {
    id: 'mlops-deploy-i-003',
    topic: 'mlops-deploy',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'Why containerise a model service with Docker?',
    options: [
      'It packages the code, dependencies and runtime so the service behaves identically everywhere',
      'It makes the model mathematically more accurate',
      'It removes the need to pin dependency versions',
      'It automatically retrains the model',
    ],
    answerIndex: 0,
    explanation:
      'A container eliminates "works on my machine" by shipping the whole environment. It complements pinned dependencies rather than replacing them.',
    tags: ['docker', 'deployment'],
  },
  {
    id: 'mlops-deploy-h-001',
    topic: 'mlops-deploy',
    tier: 'hard',
    type: 'multi',
    prompt: 'What should be monitored for a model already in production?',
    options: [
      'Input feature distributions compared with training',
      'Prediction distribution over time',
      'Latency and error rates of the service',
      'The training loss curve from the original run',
    ],
    answerIndices: [0, 1, 2],
    explanation:
      'Live inputs, live outputs and service health all reveal problems as they emerge. The original training curve is a fixed historical artefact and tells you nothing about today.',
    tags: ['monitoring', 'observability'],
  },
  {
    id: 'mlops-deploy-h-002',
    topic: 'mlops-deploy',
    tier: 'hard',
    type: 'mcq',
    prompt: 'What is a shadow deployment?',
    options: [
      'Running the new model alongside the current one on live traffic without serving its predictions',
      'Deploying to a private network only',
      'Serving predictions from a cached copy',
      'Training on production data overnight',
    ],
    answerIndex: 0,
    explanation:
      'Shadow mode measures the candidate on real traffic with zero user risk, because its output is logged rather than returned. Canary releases, by contrast, do expose a small slice of users.',
    tags: ['deployment', 'rollout'],
  },
  {
    id: 'mlops-deploy-h-003',
    topic: 'mlops-deploy',
    tier: 'hard',
    type: 'mcq',
    prompt: 'Why is a feature store useful in a mature ML setup?',
    options: [
      'It provides one definition of each feature for both training and serving, preventing skew',
      'It compresses the training dataset',
      'It replaces the need for a database',
      'It automatically selects the best features',
    ],
    answerIndex: 0,
    explanation:
      'A single computed definition, reused by offline training and online serving, removes the most common source of training/serving skew and stops teams reimplementing the same logic.',
    tags: ['feature-store', 'skew'],
  },
  {
    id: 'mlops-deploy-e-004',
    topic: 'mlops-deploy',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is CI/CD in the context of machine learning?',
    back: 'Continuous integration runs tests and data checks on every change; continuous delivery automates packaging and deployment. For ML it also covers validating data schemas and gating releases on model metrics, not just unit tests.',
    tags: ['ci-cd'],
  },
  {
    id: 'mlops-deploy-e-005',
    topic: 'mlops-deploy',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'Why log model inputs and predictions in production?',
    back: 'They are the only way to detect drift, debug a bad prediction after the fact, and build a labelled dataset for the next retrain. Without them a live model is a black box you cannot improve.',
    tags: ['logging', 'monitoring'],
  },
  {
    id: 'mlops-deploy-i-004',
    topic: 'mlops-deploy',
    tier: 'intermediate',
    type: 'order',
    prompt: 'Put these stages of a model deployment lifecycle in order.',
    items: [
      'Train and validate the model offline',
      'Package the model and its preprocessing into a versioned artefact',
      'Deploy behind an API in shadow or canary mode',
      'Monitor live inputs, predictions and latency',
      'Retrain when drift or degradation is detected',
    ],
    explanation:
      'The loop matters more than any single step: monitoring feeds retraining, which produces the next artefact. Deployment is the middle of the cycle, not the end of it.',
    tags: ['lifecycle', 'flow'],
  },
]

export default questions
