// The 29 topics of Onyeka Python Lab.
//
// FROZEN after Phase 3 -- do not add, remove or rename topics. Content work
// only ever edits the arrays inside src/data/questions/<topicId>.js.
//
// Fields:
//   id      unique slug. Every question id in this topic MUST start with `id + "-"`.
//   title   display name
//   icon    single emoji for the topic card
//   accent  hex colour, applied as the --topic-accent custom property
//   group   "core" | "ml"  -- drives the two home-screen sections and the 60/40 split
//   target  how many questions this topic should hold when the bank is complete
//
// Per-topic recipe for authors (see docs/AUTHORING.md): for target N, write
// 2 flashcards + 1 order + (N-3) graded questions.

export const TOPIC_GROUPS = {
  core: 'Core Python',
  ml: 'Python for Machine Learning & AI',
}

export const TIERS = ['easy', 'intermediate', 'hard']

export const TIER_LABELS = {
  easy: 'Easy',
  intermediate: 'Intermediate',
  hard: 'Hard',
}

const topics = [
  // ---------------------------------------------------------------- core (18)
  { id: 'syntax-basics', title: 'Syntax, Variables & I/O', icon: '🐍', accent: '#3fb950', group: 'core', target: 16 },
  { id: 'datatypes-numbers', title: 'Numbers, Strings & Formatting', icon: '🔢', accent: '#58a6ff', group: 'core', target: 18 },
  { id: 'lists-tuples', title: 'Lists & Tuples', icon: '📋', accent: '#f78166', group: 'core', target: 18 },
  { id: 'dicts-sets', title: 'Dictionaries & Sets', icon: '🗂️', accent: '#d2a8ff', group: 'core', target: 16 },
  { id: 'control-flow', title: 'Conditionals & Loops', icon: '🔀', accent: '#ffa657', group: 'core', target: 16 },
  { id: 'functions', title: 'Functions, Arguments & Scope', icon: '⚙️', accent: '#79c0ff', group: 'core', target: 18 },
  { id: 'comprehensions', title: 'Comprehensions & Generator Expressions', icon: '🧩', accent: '#56d364', group: 'core', target: 16 },
  { id: 'oop', title: 'Classes & Objects', icon: '🏛️', accent: '#ff7b72', group: 'core', target: 18 },
  { id: 'oop-advanced', title: 'Inheritance, Dunders & Properties', icon: '🧬', accent: '#e3b341', group: 'core', target: 14 },
  { id: 'errors-exceptions', title: 'Errors & Exception Handling', icon: '🚨', accent: '#ff6e6e', group: 'core', target: 14 },
  { id: 'modules-packaging', title: 'Modules, Imports & Packaging', icon: '📦', accent: '#89ddff', group: 'core', target: 14 },
  { id: 'files-io', title: 'Files, Paths & Context Managers', icon: '📁', accent: '#a5d6ff', group: 'core', target: 14 },
  { id: 'stdlib', title: 'Standard Library Toolbox', icon: '🧰', accent: '#7ee8a2', group: 'core', target: 18 },
  { id: 'decorators-closures', title: 'Decorators, Closures & functools', icon: '🎀', accent: '#c9a0ff', group: 'core', target: 14 },
  { id: 'iterators-protocols', title: 'Iterators, Generators & Protocols', icon: '🔁', accent: '#ffab70', group: 'core', target: 12 },
  { id: 'concurrency-async', title: 'Threads, Processes & asyncio', icon: '🧵', accent: '#6ee7d7', group: 'core', target: 14 },
  { id: 'testing-quality', title: 'Testing, Typing & Tooling', icon: '🐛', accent: '#f0883e', group: 'core', target: 16 },
  { id: 'performance-memory', title: 'Performance, Memory & Big-O', icon: '⚡', accent: '#ffd866', group: 'core', target: 14 },

  // ------------------------------------------------------------------ ml (11)
  { id: 'numpy', title: 'NumPy Arrays & Broadcasting', icon: '🧮', accent: '#4d9bf5', group: 'ml', target: 20 },
  { id: 'pandas', title: 'pandas DataFrames', icon: '🐼', accent: '#c792ea', group: 'ml', target: 22 },
  { id: 'viz-matplotlib', title: 'Matplotlib & Seaborn', icon: '📊', accent: '#ff9e64', group: 'ml', target: 14 },
  { id: 'feature-engineering', title: 'Preprocessing & Feature Engineering', icon: '🔧', accent: '#7ee787', group: 'ml', target: 16 },
  { id: 'sklearn-core', title: 'scikit-learn Workflow', icon: '🤖', accent: '#f9a03f', group: 'ml', target: 18 },
  { id: 'model-evaluation', title: 'Metrics, Validation & Overfitting', icon: '🎯', accent: '#ff7b9c', group: 'ml', target: 18 },
  { id: 'neural-nets', title: 'Neural Network Fundamentals', icon: '🧠', accent: '#a5b4fc', group: 'ml', target: 16 },
  { id: 'pytorch', title: 'PyTorch', icon: '🔥', accent: '#ee4c2c', group: 'ml', target: 16 },
  { id: 'tensorflow-keras', title: 'TensorFlow & Keras', icon: '🧱', accent: '#ff8f00', group: 'ml', target: 14 },
  { id: 'llms-transformers', title: 'LLMs, Transformers & Prompting', icon: '💬', accent: '#8b5cf6', group: 'ml', target: 16 },
  { id: 'mlops-deploy', title: 'MLOps, Serving & Monitoring', icon: '🚀', accent: '#22d3ee', group: 'ml', target: 14 },
]

export const topicIds = topics.map((t) => t.id)

export function getTopic(id) {
  return topics.find((t) => t.id === id) || null
}

export default topics
