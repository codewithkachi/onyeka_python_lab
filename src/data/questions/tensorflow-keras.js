// TensorFlow & Keras
//
// Target: 14 questions = 2 flashcard + 1 order + 11 graded
// Graded tier split: easy 4 / intermediate 4 / hard 3
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'tensorflow-keras-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'tensorflow-keras-e-001',
    topic: 'tensorflow-keras',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does model.compile() configure in Keras?',
    options: [
      'The optimiser, loss function and metrics used during training',
      'The C++ code generated for the model',
      'The number of layers',
      'The dataset to train on',
    ],
    answerIndex: 0,
    explanation:
      'Despite the name nothing is compiled to machine code — it simply attaches the training configuration. It must be called before fit().',
    tags: ['keras', 'compile'],
  },
  {
    id: 'tensorflow-keras-e-002',
    topic: 'tensorflow-keras',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is a Keras Sequential model?',
    options: [
      'A linear stack of layers where each feeds directly into the next',
      'A model that processes data in chronological order only',
      'A model trained one sample at a time',
      'A model with exactly one layer',
    ],
    answerIndex: 0,
    explanation:
      'Sequential covers the common straight-line case. Branching, multiple inputs or multiple outputs need the Functional API or a Model subclass.',
    tags: ['keras', 'sequential'],
  },
  {
    id: 'tensorflow-keras-e-003',
    topic: 'tensorflow-keras',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does the validation_split argument to model.fit() do?',
    options: [
      'Holds back that fraction of the training data to evaluate after each epoch',
      'Splits the model across several GPUs',
      'Divides the data into mini-batches',
      'Reserves data for the final test score',
    ],
    answerIndex: 0,
    explanation:
      'It carves a validation slice off the END of the training data before shuffling, so pre-shuffle your data. It is not a substitute for a properly held-out test set.',
    tags: ['keras', 'validation'],
  },
  {
    id: 'tensorflow-keras-i-001',
    topic: 'tensorflow-keras',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'Which loss should you use for multi-class classification with integer labels?',
    options: [
      'sparse_categorical_crossentropy',
      'categorical_crossentropy',
      'binary_crossentropy',
      'mean_squared_error',
    ],
    answerIndex: 0,
    explanation:
      'The sparse variant takes integer class indices directly. Plain categorical_crossentropy expects one-hot labels — picking the wrong one is a very common shape-mismatch error.',
    tags: ['loss', 'keras'],
  },
  {
    id: 'tensorflow-keras-i-002',
    topic: 'tensorflow-keras',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What does an EarlyStopping callback do?',
    options: [
      'Halts training when a monitored metric stops improving, optionally restoring the best weights',
      'Stops training after a fixed wall-clock time',
      'Skips batches that produce a high loss',
      'Reduces the learning rate when progress stalls',
    ],
    answerIndex: 0,
    explanation:
      'It watches something like val_loss with a patience setting. Set restore_best_weights=True, otherwise you keep the weights from the final, already-degrading epoch. Reducing the learning rate is ReduceLROnPlateau.',
    tags: ['callbacks', 'early-stopping'],
  },
  {
    id: 'tensorflow-keras-i-003',
    topic: 'tensorflow-keras',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What does a tf.data.Dataset pipeline give you over feeding NumPy arrays directly?',
    options: [
      'Streaming, shuffling, batching and prefetching so the GPU is not starved of data',
      'Automatically better model accuracy',
      'Removal of the need to define a loss function',
      'Conversion of the model to ONNX',
    ],
    answerIndex: 0,
    explanation:
      'It handles datasets too large for memory and overlaps input processing with training via prefetch, which is often the difference between an idle and a saturated GPU.',
    tags: ['tf-data', 'performance'],
  },
  {
    id: 'tensorflow-keras-h-001',
    topic: 'tensorflow-keras',
    tier: 'hard',
    type: 'bug',
    prompt: 'A 10-class classifier ends with this layer and will not train properly. What is wrong?',
    code: String.raw`model.add(Dense(10, activation="relu"))
model.compile(optimizer="adam",
              loss="sparse_categorical_crossentropy",
              metrics=["accuracy"])`,
    options: [
      'The output layer should use softmax, not relu, to produce a probability distribution',
      'Dense should have 1 unit for classification',
      'The optimiser must be sgd for classification',
      'metrics cannot include accuracy',
    ],
    answerIndex: 0,
    explanation:
      'ReLU clamps negatives to zero and does not normalise, so the outputs are not probabilities. Use softmax, or keep the layer linear and pass from_logits=True to the loss.',
    tags: ['softmax', 'output-layer', 'pitfall'],
  },
  {
    id: 'tensorflow-keras-h-002',
    topic: 'tensorflow-keras',
    tier: 'hard',
    type: 'mcq',
    prompt: 'In transfer learning, why are the base model layers usually frozen at first?',
    options: [
      'To preserve the pretrained features while the new head learns from random initialisation',
      'To reduce the model file size',
      'Because frozen layers train faster and more accurately',
      'Because pretrained layers cannot be updated at all',
    ],
    answerIndex: 0,
    explanation:
      'Large gradients from an untrained head would otherwise destroy the pretrained weights. Once the head has settled you can unfreeze and fine-tune at a much lower learning rate.',
    tags: ['transfer-learning', 'fine-tuning'],
  },
  {
    id: 'tensorflow-keras-h-003',
    topic: 'tensorflow-keras',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which statements about Keras callbacks are true?',
    options: [
      'ModelCheckpoint can save only the best model by a monitored metric',
      'ReduceLROnPlateau lowers the learning rate when a metric stagnates',
      'TensorBoard logs metrics for later visualisation',
      'Callbacks can only run at the very end of training',
    ],
    answerIndices: [0, 1, 2],
    explanation:
      'Callbacks hook into many points — batch start and end, epoch start and end, training start and end — which is exactly what makes checkpointing and scheduling possible.',
    tags: ['callbacks'],
  },
  {
    id: 'tensorflow-keras-e-004',
    topic: 'tensorflow-keras',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the relationship between TensorFlow and Keras?',
    back: 'Keras is the high-level API for building and training models; TensorFlow is the underlying numerical and execution engine. Since TF 2.x Keras ships as tf.keras and is the recommended entry point.',
    tags: ['keras', 'tensorflow'],
  },
  {
    id: 'tensorflow-keras-e-005',
    topic: 'tensorflow-keras',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What does model.summary() show?',
    back: 'Each layer with its output shape and parameter count, plus the totals for trainable and non-trainable parameters. It is the quickest way to catch a shape mismatch before training starts.',
    tags: ['keras', 'inspection'],
  },
  {
    id: 'tensorflow-keras-i-004',
    topic: 'tensorflow-keras',
    tier: 'intermediate',
    type: 'order',
    prompt: 'Put these lines in order to build, train and evaluate a Keras model.',
    items: [
      'model = Sequential([Dense(64, activation="relu"), Dense(10, activation="softmax")])',
      'model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])',
      'model.fit(X_train, y_train, epochs=10, validation_split=0.2)',
      'loss, acc = model.evaluate(X_test, y_test)',
      'print(f"test accuracy: {acc:.3f}")',
    ],
    explanation:
      'Define the architecture, attach the training configuration with compile, fit on the training data, then evaluate once on the held-out test set.',
    tags: ['keras', 'workflow', 'flow'],
  },
]

export default questions
