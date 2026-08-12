// Modules, Imports & Packaging
//
// Target: 14 questions = 2 flashcard + 1 order + 11 graded
// Graded tier split: easy 4 / intermediate 4 / hard 3
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'modules-packaging-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'modules-packaging-e-001',
    topic: 'modules-packaging',
    tier: 'easy',
    type: 'mcq',
    prompt: 'How do you import only the sqrt function from the math module?',
    options: ['import math.sqrt', 'from math import sqrt', 'include math.sqrt', 'using math: sqrt'],
    answerIndex: 1,
    explanation:
      'from module import name binds that name directly in your namespace. import math.sqrt is invalid because the import statement expects a MODULE path, and sqrt is a function.',
    tags: ['import'],
  },
  {
    id: 'modules-packaging-e-002',
    topic: 'modules-packaging',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does import numpy as np do?',
    options: [
      'Creates a copy of the module',
      'Imports the module and binds it to the shorter alias np',
      'Imports only part of the module',
      'Reloads the module if it was already imported',
    ],
    answerIndex: 1,
    explanation:
      'as renames the binding in your namespace. The module object is identical; only the local name changes. np and pd are near-universal conventions.',
    tags: ['import', 'alias'],
  },
  {
    id: 'modules-packaging-e-003',
    topic: 'modules-packaging',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is pip used for?',
    options: [
      'Running Python scripts',
      'Installing and managing third-party packages',
      'Compiling Python to machine code',
      'Stepping through code in a debugger',
    ],
    answerIndex: 1,
    explanation:
      'pip installs distributions from PyPI into the active environment. Prefer python -m pip install X so you can be certain which interpreter receives the package.',
    tags: ['pip', 'packaging'],
  },
  {
    id: 'modules-packaging-e-004',
    topic: 'modules-packaging',
    tier: 'easy',
    type: 'mcq',
    prompt: "Which file marks a directory as a regular (non-namespace) package?",
    options: ['main.py', 'setup.py', '__init__.py', 'package.py'],
    answerIndex: 2,
    explanation:
      '__init__.py makes a directory a regular package and runs on first import. Since PEP 420 a directory without it can still be imported as a NAMESPACE package, but regular packages remain the norm.',
    tags: ['packages', 'init'],
  },
  {
    id: 'modules-packaging-i-001',
    topic: 'modules-packaging',
    tier: 'intermediate',
    type: 'mcq',
    prompt: "What does the if __name__ == '__main__': guard achieve?",
    options: [
      'It verifies the file defines a main() function',
      'It runs the guarded code only when the file is executed directly, not when imported',
      'It marks the entry point of a class',
      'It checks the installed version of the module',
    ],
    answerIndex: 1,
    explanation:
      '__name__ is "__main__" only in the file you launched; in an imported module it is the module name. The guard keeps scripts importable without side effects.',
    tags: ['main-guard'],
  },
  {
    id: 'modules-packaging-i-002',
    topic: 'modules-packaging',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'How many times does a module execute if it is imported from three different files in one run?',
    options: ['Three times', 'Once; later imports reuse the cached module', 'Once per thread', 'It depends on the import style'],
    answerIndex: 1,
    explanation:
      'The first import runs the module and caches it in sys.modules; subsequent imports just rebind the cached object. That is why import-time side effects happen exactly once.',
    tags: ['import', 'caching'],
  },
  {
    id: 'modules-packaging-i-003',
    topic: 'modules-packaging',
    tier: 'intermediate',
    type: 'bug',
    prompt: 'Why is this import style discouraged?',
    code: String.raw`from os import *
from numpy import *

print(open("f.txt"))`,
    options: [
      'Wildcard imports let later modules silently shadow earlier names',
      'Wildcard imports are a syntax error inside functions only',
      'It imports the modules twice, doubling memory use',
      'It prevents the modules from being cached in sys.modules',
    ],
    answerIndex: 0,
    explanation:
      'Two star-imports can bind the same name, and the last one wins silently, so you cannot tell which open() you called. Import the module or the specific names you need.',
    tags: ['import', 'antipattern'],
  },
  {
    id: 'modules-packaging-h-001',
    topic: 'modules-packaging',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which statements about Python virtual environments are true?',
    options: [
      'They isolate a project\'s dependencies from other projects',
      'They let different projects pin conflicting versions of one package',
      'They must be committed to version control to work',
      'python -m venv .venv creates one using the standard library',
    ],
    answerIndices: [0, 1, 3],
    explanation:
      'A venv is a per-project package directory built by the stdlib venv module. It is generated, not source, so it belongs in .gitignore; the pinned requirements file is what gets committed.',
    tags: ['venv', 'packaging'],
  },
  {
    id: 'modules-packaging-h-002',
    topic: 'modules-packaging',
    tier: 'hard',
    type: 'output',
    prompt: 'A file named random.py sits next to this script. What happens?',
    code: String.raw`import random
print(random.randint(1, 6))`,
    options: [
      'It prints a random integer as normal',
      'It imports the local random.py instead and likely raises AttributeError',
      'Python refuses to run and reports a name clash',
      'Both modules are merged automatically',
    ],
    answerIndex: 1,
    explanation:
      'The script directory comes first on sys.path, so your file shadows the stdlib module and randint is missing. Never name a file after a module you intend to import.',
    tags: ['shadowing', 'sys-path', 'pitfall'],
  },
  {
    id: 'modules-packaging-e-005',
    topic: 'modules-packaging',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the difference between a module and a package?',
    back: 'A module is a single .py file. A package is a directory of modules, normally containing __init__.py. Both are imported with the same import statement.',
    tags: ['terminology'],
  },
  {
    id: 'modules-packaging-e-006',
    topic: 'modules-packaging',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What does requirements.txt do, and how is it used?',
    back: 'It lists a project\'s dependencies, ideally with pinned versions. pip install -r requirements.txt recreates the environment, which is what makes a project reproducible on another machine.',
    tags: ['packaging', 'pip'],
  },
]

export default questions
