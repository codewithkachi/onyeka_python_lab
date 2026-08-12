// Matplotlib & Seaborn
//
// Target: 14 questions = 2 flashcard + 1 order + 11 graded
// Graded tier split: easy 4 / intermediate 4 / hard 3
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'viz-matplotlib-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'viz-matplotlib-e-001',
    topic: 'viz-matplotlib',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is the conventional import for matplotlib plotting?',
    options: [
      'import matplotlib.pyplot as plt',
      'import matplotlib as plt',
      'from matplotlib import plot as plt',
      'import pyplot as plt',
    ],
    answerIndex: 0,
    explanation:
      'pyplot is the state-machine interface, aliased plt by near-universal convention. The object-oriented API via fig, ax is preferred for anything beyond a quick look.',
    tags: ['import', 'convention'],
  },
  {
    id: 'viz-matplotlib-e-002',
    topic: 'viz-matplotlib',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which chart type best shows the DISTRIBUTION of a single continuous variable?',
    options: ['Histogram', 'Line chart', 'Pie chart', 'Scatter plot'],
    answerIndex: 0,
    explanation:
      'A histogram bins values to reveal shape, spread and skew. A box plot or KDE also works; a line chart implies sequence and a pie chart shows parts of a whole.',
    tags: ['chart-choice', 'distribution'],
  },
  {
    id: 'viz-matplotlib-e-003',
    topic: 'viz-matplotlib',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does fig, ax = plt.subplots() return?',
    options: [
      'A Figure (the whole canvas) and an Axes (one plotting area)',
      'Two independent figures',
      'The x and y data arrays',
      'A figure and its saved filename',
    ],
    answerIndex: 0,
    explanation:
      'The Figure is the container; the Axes is where data is drawn. Working with ax explicitly is what makes multi-panel figures and reusable plotting functions manageable.',
    tags: ['figure', 'axes', 'api'],
  },
  {
    id: 'viz-matplotlib-i-001',
    topic: 'viz-matplotlib',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'Which chart best shows the relationship between two continuous variables?',
    options: ['Scatter plot', 'Bar chart', 'Pie chart', 'Histogram'],
    answerIndex: 0,
    explanation:
      'A scatter plot maps each observation to a point, revealing correlation, clusters and outliers. Bar charts compare categories; histograms show one variable at a time.',
    tags: ['chart-choice', 'scatter'],
  },
  {
    id: 'viz-matplotlib-i-002',
    topic: 'viz-matplotlib',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What does seaborn add on top of matplotlib?',
    options: [
      'Statistical plot types and sensible defaults, with DataFrame columns addressed by name',
      'A completely separate rendering engine',
      'GPU-accelerated drawing',
      'Interactive plots in the browser',
    ],
    answerIndex: 0,
    explanation:
      'Seaborn is a higher-level wrapper: it returns matplotlib objects, so you can still fine-tune with plt. Browser interactivity is what Plotly and Bokeh provide instead.',
    tags: ['seaborn'],
  },
  {
    id: 'viz-matplotlib-i-003',
    topic: 'viz-matplotlib',
    tier: 'intermediate',
    type: 'bug',
    prompt: 'Why does this save an empty image file?',
    code: String.raw`import matplotlib.pyplot as plt

plt.plot([1, 2, 3], [4, 5, 6])
plt.show()
plt.savefig("out.png")`,
    options: [
      'plt.show() clears the current figure, so savefig writes a blank canvas',
      'savefig needs the data passed to it again',
      'The file extension must be .jpg',
      'plot() must be called after show()',
    ],
    answerIndex: 0,
    explanation:
      'With most backends show() displays and then resets the figure. Always call savefig BEFORE show, or keep a reference and use fig.savefig().',
    tags: ['savefig', 'pitfall'],
  },
  {
    id: 'viz-matplotlib-h-001',
    topic: 'viz-matplotlib',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which practices make a chart easier to read and harder to misinterpret?',
    options: [
      'Labelling both axes including units',
      'Starting a bar chart\'s value axis at zero',
      'Choosing a colourblind-safe palette',
      'Using a 3-D effect to make bars stand out',
    ],
    answerIndices: [0, 1, 2],
    explanation:
      'Labels, honest baselines and accessible colour all aid comprehension. 3-D effects distort the visual encoding of length and area, making values genuinely harder to compare.',
    tags: ['best-practice', 'accessibility'],
  },
  {
    id: 'viz-matplotlib-h-002',
    topic: 'viz-matplotlib',
    tier: 'hard',
    type: 'mcq',
    prompt: 'When is a log scale on an axis appropriate?',
    options: [
      'When the data spans several orders of magnitude or you want to compare growth rates',
      'Whenever the chart looks cluttered',
      'Only for negative values',
      'When the data is perfectly linear',
    ],
    answerIndex: 0,
    explanation:
      'A log axis compresses wide ranges and turns exponential growth into a straight line. It cannot display zero or negative values, and the axis must be clearly labelled as log.',
    tags: ['scales', 'log'],
  },
  {
    id: 'viz-matplotlib-h-003',
    topic: 'viz-matplotlib',
    tier: 'hard',
    type: 'mcq',
    prompt: 'A scatter plot of 500,000 points is a solid unreadable blob. What is the best fix?',
    options: [
      'Use a 2-D histogram or hexbin, or sample with low alpha',
      'Make the figure larger',
      'Switch to a pie chart',
      'Sort the data before plotting',
    ],
    answerIndex: 0,
    explanation:
      'This is overplotting: points are drawn on top of each other so density is invisible. Binning with hexbin, or transparency plus sampling, restores the information.',
    tags: ['overplotting', 'large-data'],
  },
  {
    id: 'viz-matplotlib-e-004',
    topic: 'viz-matplotlib',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the difference between the pyplot and object-oriented matplotlib interfaces?',
    back: 'pyplot (plt.plot, plt.title) acts on an implicit "current" figure — quick but ambiguous with several plots. The OO interface (fig, ax = plt.subplots(); ax.plot()) names its target explicitly and is preferred for anything reusable.',
    tags: ['api'],
  },
  {
    id: 'viz-matplotlib-e-005',
    topic: 'viz-matplotlib',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'Which chart should you reach for, for which question?',
    back: 'Distribution of one variable: histogram or box plot. Relationship between two: scatter. Comparison across categories: bar. Change over time: line. Correlation across many variables: heatmap.',
    tags: ['chart-choice'],
  },
  {
    id: 'viz-matplotlib-i-004',
    topic: 'viz-matplotlib',
    tier: 'intermediate',
    type: 'order',
    prompt: 'Put these lines in order to build and save a labelled chart.',
    items: [
      'import matplotlib.pyplot as plt',
      'fig, ax = plt.subplots(figsize=(8, 5))',
      'ax.plot(months, revenue, marker="o")',
      'ax.set_xlabel("Month")',
      'ax.set_title("Revenue by month")',
      'fig.savefig("revenue.png", dpi=150)',
    ],
    explanation:
      'Create the figure and axes, draw the data, add labels and a title, then save. Saving must come before any show() call, which would clear the figure.',
    tags: ['workflow', 'flow'],
  },
]

export default questions
