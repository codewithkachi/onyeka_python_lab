// Neural Network Fundamentals
//
// Target: 16 questions = 2 flashcard + 1 order + 13 graded
// Graded tier split: easy 5 / intermediate 5 / hard 3
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'neural-nets-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'neural-nets-e-001',
    topic: 'neural-nets',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Why does a neural network need a non-linear activation function?',
    options: [
      'Without one, stacked linear layers collapse into a single linear transformation',
      'It makes training numerically faster',
      'It guarantees the loss reaches zero',
      'It normalises the inputs automatically',
    ],
    answerIndex: 0,
    explanation:
      'A composition of linear maps is still linear, so depth would buy nothing. Non-linearity between layers is exactly what lets a network approximate complex functions.',
    tags: ['activation', 'theory'],
  },
  {
    id: 'neural-nets-e-002',
    topic: 'neural-nets',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does the ReLU activation compute?',
    options: ['max(0, x)', '1 / (1 + exp(-x))', 'tanh(x)', 'x squared'],
    answerIndex: 0,
    explanation:
      'ReLU passes positives through and zeroes negatives. It is cheap and avoids the vanishing gradients that plague sigmoid and tanh in deep networks.',
    tags: ['activation', 'relu'],
  },
  {
    id: 'neural-nets-e-003',
    topic: 'neural-nets',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is an epoch?',
    options: [
      'One complete pass over the entire training dataset',
      'One update of the weights',
      'One mini-batch of samples',
      'One layer of the network',
    ],
    answerIndex: 0,
    explanation:
      'An epoch is a full sweep. Within it the data is divided into mini-batches, and each batch produces one weight update — so one epoch means many steps.',
    tags: ['training', 'terminology'],
  },
  {
    id: 'neural-nets-i-001',
    topic: 'neural-nets',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What does backpropagation actually do?',
    options: [
      'Applies the chain rule backwards through the network to get each weight\'s gradient',
      'Reverses the order of the layers during training',
      'Sends the prediction back to the input for another pass',
      'Randomly perturbs the weights and keeps improvements',
    ],
    answerIndex: 0,
    explanation:
      'It computes the gradient of the loss with respect to every parameter efficiently by reusing intermediate results. The optimiser then uses those gradients to update the weights.',
    tags: ['backpropagation', 'gradients'],
  },
  {
    id: 'neural-nets-i-002',
    topic: 'neural-nets',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'Which output activation and loss suit multi-class single-label classification?',
    options: [
      'Softmax with cross-entropy loss',
      'Sigmoid with mean squared error',
      'ReLU with hinge loss',
      'Linear output with mean absolute error',
    ],
    answerIndex: 0,
    explanation:
      'Softmax turns the logits into probabilities summing to 1, and cross-entropy scores that distribution against the true class. Sigmoid plus binary cross-entropy is for MULTI-label.',
    tags: ['softmax', 'loss'],
  },
  {
    id: 'neural-nets-i-003',
    topic: 'neural-nets',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What does dropout do during training?',
    options: [
      'Randomly zeroes a fraction of activations so the network cannot rely on any one unit',
      'Removes training samples that produce a high loss',
      'Deletes layers that are not improving',
      'Reduces the learning rate over time',
    ],
    answerIndex: 0,
    explanation:
      'Dropout is a regulariser that forces redundant representations. It is active only during training — at inference the full network is used, with activations scaled accordingly.',
    tags: ['dropout', 'regularisation'],
  },
  {
    id: 'neural-nets-i-004',
    topic: 'neural-nets',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What usually happens if the learning rate is far too high?',
    options: [
      'The loss oscillates or diverges to NaN instead of settling',
      'Training becomes extremely slow but still converges',
      'The model overfits more quickly',
      'The gradients become exactly zero',
    ],
    answerIndex: 0,
    explanation:
      'Overly large steps overshoot the minimum and can blow up. Too LOW a rate gives the opposite symptom: slow but steady progress. A loss that turns NaN is the classic sign.',
    tags: ['learning-rate', 'optimisation'],
  },
  {
    id: 'neural-nets-h-001',
    topic: 'neural-nets',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which of these help combat overfitting in a neural network?',
    options: [
      'Dropout layers',
      'Early stopping on validation loss',
      'Weight decay (L2 regularisation)',
      'Training for many more epochs on the same data',
    ],
    answerIndices: [0, 1, 2],
    explanation:
      'Dropout, early stopping and weight decay all constrain the model. Simply training longer on the same data drives it further into memorising the training set.',
    tags: ['regularisation', 'overfitting'],
  },
  {
    id: 'neural-nets-h-002',
    topic: 'neural-nets',
    tier: 'hard',
    type: 'mcq',
    prompt: 'What is the vanishing gradient problem?',
    options: [
      'Gradients shrink toward zero through many layers, so early layers barely learn',
      'The optimiser loses the gradient array in memory',
      'Gradients grow without bound and overflow',
      'The loss function has no derivative',
    ],
    answerIndex: 0,
    explanation:
      'Repeatedly multiplying small derivatives — as saturating sigmoids produce — drives the signal to zero. ReLU, residual connections and normalisation layers are the standard remedies.',
    tags: ['gradients', 'depth'],
  },
  {
    id: 'neural-nets-h-003',
    topic: 'neural-nets',
    tier: 'hard',
    type: 'mcq',
    prompt: 'What is the practical effect of a larger mini-batch size?',
    options: [
      'Less noisy gradient estimates and better hardware use, but more memory and sometimes worse generalisation',
      'Strictly faster convergence in every respect',
      'It removes the need for a learning rate',
      'It guarantees the model escapes local minima',
    ],
    answerIndex: 0,
    explanation:
      'Bigger batches average over more samples, giving smoother updates and better GPU utilisation. The gradient noise of small batches is itself mildly regularising.',
    tags: ['batch-size', 'training'],
  },
  {
    id: 'neural-nets-e-004',
    topic: 'neural-nets',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is gradient descent, in one sentence?',
    back: 'An optimisation method that repeatedly nudges each parameter in the direction that most reduces the loss, with the step size controlled by the learning rate.',
    tags: ['optimisation'],
  },
  {
    id: 'neural-nets-e-005',
    topic: 'neural-nets',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the difference between a loss function and a metric?',
    back: 'The loss is what the optimiser actually minimises, so it must be differentiable. A metric is what humans judge the model by (accuracy, F1) and need not be differentiable — which is why the two often differ.',
    tags: ['loss', 'metrics'],
  },
  {
    id: 'neural-nets-i-005',
    topic: 'neural-nets',
    tier: 'intermediate',
    type: 'order',
    prompt: 'Put these steps of one training iteration in order.',
    items: [
      'Run the forward pass to produce predictions',
      'Compute the loss against the true labels',
      'Zero the gradients from the previous step',
      'Backpropagate to compute new gradients',
      'Let the optimiser update the weights',
    ],
    explanation:
      'Gradients must be cleared before the backward pass, because frameworks such as PyTorch ACCUMULATE them by default. Forgetting this is one of the most common training bugs.',
    tags: ['training-loop', 'flow'],
  },
]

export default questions
