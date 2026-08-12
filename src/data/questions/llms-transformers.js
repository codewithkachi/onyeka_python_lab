// LLMs, Transformers & Prompting
//
// Target: 16 questions = 2 flashcard + 1 order + 13 graded
// Graded tier split: easy 5 / intermediate 5 / hard 3
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'llms-transformers-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'llms-transformers-e-001',
    topic: 'llms-transformers',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is a token in the context of a language model?',
    options: [
      'A chunk of text — often a word piece — that the model treats as one unit',
      'Exactly one character',
      'Exactly one English word',
      'A security credential for the API',
    ],
    answerIndex: 0,
    explanation:
      'Tokenisers split text into sub-word pieces, so "unhappiness" may become several tokens while "the" is one. Context limits and API pricing are both counted in tokens, not words.',
    tags: ['tokens', 'tokenisation'],
  },
  {
    id: 'llms-transformers-e-002',
    topic: 'llms-transformers',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is the context window of a language model?',
    options: [
      'The maximum number of tokens it can attend to at once, prompt and response together',
      'The time limit for generating a response',
      'The number of documents it was trained on',
      'The size of its vocabulary',
    ],
    answerIndex: 0,
    explanation:
      'Everything the model can "see" must fit in this budget. Exceeding it forces truncation, which is why long-document work needs chunking or retrieval rather than pasting everything in.',
    tags: ['context-window'],
  },
  {
    id: 'llms-transformers-e-003',
    topic: 'llms-transformers',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does raising the temperature of a language model do?',
    options: [
      'Makes sampling more random and varied',
      'Makes the model run faster',
      'Increases the context window',
      'Improves factual accuracy',
    ],
    answerIndex: 0,
    explanation:
      'Temperature flattens the probability distribution over next tokens. Near 0 the output is nearly deterministic and repetitive; higher values add variety and risk incoherence.',
    tags: ['temperature', 'sampling'],
  },
  {
    id: 'llms-transformers-i-001',
    topic: 'llms-transformers',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What is the key innovation of the transformer architecture?',
    options: [
      'Self-attention, letting every token attend to every other in parallel',
      'Recurrent connections that process tokens strictly in order',
      'Convolutions over fixed-size windows',
      'Storing the training data for lookup at inference time',
    ],
    answerIndex: 0,
    explanation:
      'Self-attention removed the sequential bottleneck of RNNs, so whole sequences train in parallel and long-range dependencies are one hop apart rather than many.',
    tags: ['transformer', 'attention'],
  },
  {
    id: 'llms-transformers-i-002',
    topic: 'llms-transformers',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What is an embedding?',
    options: [
      'A dense numeric vector representing text, where similar meanings sit close together',
      'A compressed copy of the model weights',
      'The raw token ids of a sentence',
      'A cached model response',
    ],
    answerIndex: 0,
    explanation:
      'Embeddings turn text into vectors whose geometry encodes meaning, which is what makes semantic search and retrieval possible via cosine similarity.',
    tags: ['embeddings', 'semantic-search'],
  },
  {
    id: 'llms-transformers-i-003',
    topic: 'llms-transformers',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What problem does retrieval-augmented generation (RAG) address?',
    options: [
      'It supplies relevant external documents at query time so answers rest on real sources',
      'It makes the model generate more tokens per second',
      'It removes the need for a tokeniser',
      'It compresses the model for mobile devices',
    ],
    answerIndex: 0,
    explanation:
      'RAG retrieves passages and puts them in the prompt, grounding answers in current, private or citable data without retraining the model.',
    tags: ['rag', 'retrieval'],
  },
  {
    id: 'llms-transformers-i-004',
    topic: 'llms-transformers',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What is few-shot prompting?',
    options: [
      'Including a handful of worked examples in the prompt to demonstrate the desired behaviour',
      'Training the model on a few new samples',
      'Limiting the response to a few tokens',
      'Sending the same prompt several times and voting',
    ],
    answerIndex: 0,
    explanation:
      'The examples steer the model at inference time with no weight updates — this is in-context learning. Zero-shot gives instructions only, with no examples.',
    tags: ['prompting', 'few-shot'],
  },
  {
    id: 'llms-transformers-h-001',
    topic: 'llms-transformers',
    tier: 'hard',
    type: 'mcq',
    prompt: 'What does it mean when a language model "hallucinates"?',
    options: [
      'It produces fluent, confident text that is factually wrong or fabricated',
      'It fails to generate any output',
      'It repeats the prompt verbatim',
      'It exceeds the context window',
    ],
    answerIndex: 0,
    explanation:
      'The model predicts plausible continuations, and plausibility is not truth. Grounding with retrieval, asking for citations and verifying externally are the standard mitigations.',
    tags: ['hallucination', 'reliability'],
  },
  {
    id: 'llms-transformers-h-002',
    topic: 'llms-transformers',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which are practical ways to adapt a general LLM to a specialised domain?',
    options: [
      'Retrieval-augmented generation over your own documents',
      'Parameter-efficient fine-tuning such as LoRA',
      'Careful prompt engineering with worked examples',
      'Raising the temperature to encourage domain vocabulary',
    ],
    answerIndices: [0, 1, 2],
    explanation:
      'RAG, light fine-tuning and prompt design all genuinely adapt behaviour. Temperature only controls sampling randomness and cannot add knowledge the model lacks.',
    tags: ['fine-tuning', 'rag', 'prompting'],
  },
  {
    id: 'llms-transformers-h-003',
    topic: 'llms-transformers',
    tier: 'hard',
    type: 'mcq',
    prompt: 'Why is a vector database typically used in a RAG system?',
    options: [
      'To find the passages whose embeddings are nearest the query embedding, quickly',
      'To store the model weights',
      'To cache generated responses by exact text match',
      'To tokenise incoming documents',
    ],
    answerIndex: 0,
    explanation:
      'It indexes embeddings for fast approximate nearest-neighbour search, so semantic retrieval stays fast over millions of chunks where a brute-force scan would not.',
    tags: ['rag', 'vector-database'],
  },
  {
    id: 'llms-transformers-e-004',
    topic: 'llms-transformers',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the difference between fine-tuning and prompting?',
    back: 'Prompting changes only the input and leaves the weights alone — instant, cheap, reversible. Fine-tuning updates the weights on your own data — more capable for consistent style or format, but slower, costlier and harder to undo.',
    tags: ['fine-tuning', 'prompting'],
  },
  {
    id: 'llms-transformers-e-005',
    topic: 'llms-transformers',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is chain-of-thought prompting?',
    back: 'Asking the model to reason step by step before answering. Giving it room to work through intermediate steps measurably improves accuracy on multi-step arithmetic and logic problems.',
    tags: ['prompting', 'reasoning'],
  },
  {
    id: 'llms-transformers-i-005',
    topic: 'llms-transformers',
    tier: 'intermediate',
    type: 'order',
    prompt: 'Put these steps of a retrieval-augmented generation pipeline in order.',
    items: [
      'Split the source documents into chunks',
      'Embed each chunk and store it in a vector index',
      'Embed the incoming user question',
      'Retrieve the most similar chunks from the index',
      'Put those chunks in the prompt and generate the answer',
    ],
    explanation:
      'The first two steps happen offline at indexing time; the last three run per query. Keeping that split in mind is what makes RAG systems fast enough to be usable.',
    tags: ['rag', 'flow'],
  },
]

export default questions
