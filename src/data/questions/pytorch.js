// PyTorch
//
// Target: 16 questions = 2 flashcard + 1 order + 13 graded
// Graded tier split: easy 5 / intermediate 5 / hard 3
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'pytorch-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'pytorch-e-001',
    topic: 'pytorch',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is a torch.Tensor?',
    options: [
      'A multi-dimensional array that can track gradients and live on a GPU',
      'A Python list optimised for strings',
      'A wrapper around a pandas DataFrame',
      'A model checkpoint format',
    ],
    answerIndex: 0,
    explanation:
      'Tensors are NumPy-like arrays with two additions that matter: device placement (CPU or GPU) and autograd history for gradient computation.',
    tags: ['tensor', 'basics'],
  },
  {
    id: 'pytorch-e-002',
    topic: 'pytorch',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does requires_grad=True on a tensor mean?',
    options: [
      'Autograd will record operations on it so gradients can be computed',
      'The tensor is moved to the GPU',
      'The tensor becomes read-only',
      'The tensor is excluded from the optimiser',
    ],
    answerIndex: 0,
    explanation:
      'It opts the tensor into the autograd graph. Model parameters created by nn.Module have it set automatically; input data normally does not need it.',
    tags: ['autograd', 'gradients'],
  },
  {
    id: 'pytorch-e-003',
    topic: 'pytorch',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which method must a custom nn.Module subclass define?',
    options: ['forward()', 'backward()', 'predict()', 'run()'],
    answerIndex: 0,
    explanation:
      'You define forward(); autograd derives the backward pass automatically. Call the module as model(x) rather than model.forward(x), so hooks fire correctly.',
    tags: ['nn-module', 'api'],
  },
  {
    id: 'pytorch-i-001',
    topic: 'pytorch',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'Why is optimizer.zero_grad() called each iteration?',
    options: [
      'Because PyTorch accumulates gradients into .grad rather than replacing them',
      'Because it frees GPU memory between steps',
      'Because it resets the learning rate schedule',
      'Because it reshuffles the training data',
    ],
    answerIndex: 0,
    explanation:
      'Accumulation is deliberate — it enables gradient accumulation across micro-batches — but it means forgetting to zero produces a running sum of gradients and wrecks training.',
    tags: ['training-loop', 'gradients', 'pitfall'],
  },
  {
    id: 'pytorch-i-002',
    topic: 'pytorch',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What is the difference between model.train() and model.eval()?',
    options: [
      'They switch layers such as dropout and batch-norm between training and inference behaviour',
      'model.train() runs the training loop for you',
      'model.eval() computes the accuracy',
      'They control whether the model is on the GPU',
    ],
    answerIndex: 0,
    explanation:
      'They only set a mode flag. In eval mode dropout is disabled and batch-norm uses running statistics. Forgetting model.eval() gives inconsistent, usually worse, validation numbers.',
    tags: ['train-eval', 'dropout', 'batchnorm'],
  },
  {
    id: 'pytorch-i-003',
    topic: 'pytorch',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What does torch.no_grad() achieve during evaluation?',
    options: [
      'It stops autograd tracking, saving memory and time',
      'It freezes the model weights permanently',
      'It disables dropout layers',
      'It moves tensors to the CPU',
    ],
    answerIndex: 0,
    explanation:
      'Without it, inference still builds the autograd graph and wastes memory. Note it is orthogonal to model.eval() — a correct evaluation loop uses BOTH.',
    tags: ['no-grad', 'inference'],
  },
  {
    id: 'pytorch-i-004',
    topic: 'pytorch',
    tier: 'intermediate',
    type: 'bug',
    prompt: 'This evaluation loop is wrong in two related ways. What is missing?',
    code: String.raw`for x, y in val_loader:
    preds = model(x)
    total += (preds.argmax(1) == y).sum().item()`,
    options: [
      'model.eval() and torch.no_grad() are both missing',
      'argmax should be argmin',
      'The loop should call loss.backward()',
      'The data must be converted to NumPy first',
    ],
    answerIndex: 0,
    explanation:
      'Without model.eval() dropout stays active and batch-norm keeps updating; without no_grad() memory balloons. Both are needed for a correct and efficient validation pass.',
    tags: ['evaluation', 'pitfall'],
  },
  {
    id: 'pytorch-h-001',
    topic: 'pytorch',
    tier: 'hard',
    type: 'mcq',
    prompt: 'What is the recommended way to save a trained model for later use?',
    options: [
      'Save model.state_dict() and load it into a freshly constructed model',
      'Pickle the entire model object',
      'Save only the optimiser state',
      'Export the printed model summary',
    ],
    answerIndex: 0,
    explanation:
      'A state_dict is just the tensors, so it survives refactors of your code. Pickling the whole object ties the file to the exact class definition and import paths.',
    tags: ['serialisation', 'state-dict'],
  },
  {
    id: 'pytorch-h-002',
    topic: 'pytorch',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which statements about PyTorch devices are true?',
    options: [
      'Every tensor in an operation must be on the same device',
      'tensor.to("cuda") returns a new tensor rather than moving it in place',
      'Model parameters and input data must both be moved to the GPU',
      'PyTorch automatically transfers CPU tensors to the GPU as needed',
    ],
    answerIndices: [0, 1, 2],
    explanation:
      'There is no implicit transfer — mixing devices raises a RuntimeError, which is why "expected all tensors to be on the same device" is such a common first-GPU error.',
    tags: ['device', 'gpu'],
  },
  {
    id: 'pytorch-h-003',
    topic: 'pytorch',
    tier: 'hard',
    type: 'mcq',
    prompt: 'Why does calling .item() on a loss tensor matter when logging?',
    options: [
      'It extracts a plain Python float, releasing the tensor and its autograd graph',
      'It converts the loss to a percentage',
      'It moves the loss to the GPU',
      'It applies gradient clipping',
    ],
    answerIndex: 0,
    explanation:
      'Accumulating raw loss tensors keeps their whole computation graph alive and leaks memory across an epoch. .item() detaches a scalar, which is all you need for logging.',
    tags: ['memory', 'logging'],
  },
  {
    id: 'pytorch-e-004',
    topic: 'pytorch',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What do Dataset and DataLoader do?',
    back: 'Dataset defines __len__ and __getitem__ to expose individual samples. DataLoader wraps it to handle batching, shuffling and parallel worker processes, yielding ready-to-use batches.',
    tags: ['data', 'dataloader'],
  },
  {
    id: 'pytorch-e-005',
    topic: 'pytorch',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is autograd?',
    back: "PyTorch's automatic differentiation engine. It records operations on tensors that require gradients into a dynamic graph, then loss.backward() walks it to populate every parameter's .grad.",
    tags: ['autograd'],
  },
  {
    id: 'pytorch-i-005',
    topic: 'pytorch',
    tier: 'intermediate',
    type: 'order',
    prompt: 'Put these lines in order for one PyTorch training step.',
    items: [
      'optimizer.zero_grad()',
      'preds = model(x)',
      'loss = criterion(preds, y)',
      'loss.backward()',
      'optimizer.step()',
    ],
    explanation:
      'Clear the accumulated gradients, run the forward pass, compute the loss, backpropagate, then update. Zeroing after backward() would erase the gradients you just computed.',
    tags: ['training-loop', 'flow'],
  },
]

export default questions
