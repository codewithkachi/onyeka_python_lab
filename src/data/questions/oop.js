// Classes & Objects
//
// Target: 18 questions = 2 flashcard + 1 order + 15 graded
// Graded tier split: easy 6 / intermediate 5 / hard 4
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'oop-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'oop-e-001',
    topic: 'oop',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which method initializes a newly created instance, receiving it as self?',
    options: ['__start__', '__init__', '__new__', '__create__'],
    answerIndex: 1,
    explanation:
      '__new__ allocates and returns the raw object; __init__ then receives that object as self and sets up its attributes. Almost all classes customise __init__ and leave __new__ alone.',
    tags: ['init', 'constructor'],
  },
  {
    id: 'oop-e-002',
    topic: 'oop',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What does self refer to inside an instance method?',
    options: ['The class itself', 'The particular instance the method was called on', 'The parent class', 'The module'],
    answerIndex: 1,
    explanation:
      'self is the instance. Python passes it automatically when you call obj.method(), which is why it is written as the first parameter but not supplied at the call site.',
    tags: ['self', 'methods'],
  },
  {
    id: 'oop-e-003',
    topic: 'oop',
    tier: 'easy',
    type: 'mcq',
    prompt: 'How do you define a class attribute shared by every instance?',
    options: [
      'Assign to self.x inside __init__',
      'Assign it in the class body, outside any method',
      'Decorate it with @classattr',
      'Declare it in a separate config file',
    ],
    answerIndex: 1,
    explanation:
      'A name bound in the class body belongs to the CLASS and is seen by all instances. Assigning self.x in __init__ instead creates a separate per-instance attribute.',
    tags: ['class-attributes'],
  },
  {
    id: 'oop-e-004',
    topic: 'oop',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is a @staticmethod?',
    options: [
      'A method that cannot be called from outside the class',
      'A method that receives neither self nor cls',
      'A method that may only read class state',
      'A method that runs once at import time',
    ],
    answerIndex: 1,
    explanation:
      'A staticmethod is a plain function living in the class namespace for organisational reasons. Use @classmethod instead when you need access to the class via cls.',
    tags: ['staticmethod', 'decorators'],
  },
  {
    id: 'oop-e-005',
    topic: 'oop',
    tier: 'easy',
    type: 'mcq',
    prompt: 'Which decorator creates a method that receives the class as its first argument?',
    options: ['@staticmethod', '@classmethod', '@instancemethod', '@property'],
    answerIndex: 1,
    explanation:
      '@classmethod passes the class as cls, which makes it the standard way to write alternative constructors such as MyClass.from_json(...) that must work for subclasses too.',
    tags: ['classmethod', 'decorators'],
  },
  {
    id: 'oop-e-006',
    topic: 'oop',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What are the four pillars of object-oriented programming?',
    options: [
      'Compile, Link, Run, Debug',
      'Encapsulation, Abstraction, Inheritance, Polymorphism',
      'Variables, Loops, Functions, Classes',
      'Input, Process, Output, Store',
    ],
    answerIndex: 1,
    explanation:
      'Encapsulation bundles state with behaviour, abstraction hides detail behind an interface, inheritance shares implementation, and polymorphism lets different types answer the same call.',
    tags: ['theory', 'pillars'],
  },
  {
    id: 'oop-i-001',
    topic: 'oop',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What does defining __str__ control?',
    options: [
      'How the object is stored in memory',
      'The readable string shown by print() and str()',
      'How two objects compare for equality',
      'How the object is pickled',
    ],
    answerIndex: 1,
    explanation:
      '__str__ is the human-facing form used by print() and str(). __repr__ is the unambiguous developer-facing form shown in the REPL, and is what str() falls back to if __str__ is absent.',
    tags: ['dunder', 'str'],
  },
  {
    id: 'oop-i-002',
    topic: 'oop',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What is encapsulation?',
    options: [
      'Inheriting from more than one class',
      'Bundling data with the methods that operate on it, and limiting direct outside access',
      'Defining methods outside the class body',
      'Creating many instances of one class',
    ],
    answerIndex: 1,
    explanation:
      'Encapsulation keeps state and behaviour together and exposes a deliberate interface. Python signals intent by convention (_private) rather than enforcing access like Java.',
    tags: ['theory', 'encapsulation'],
  },
  {
    id: 'oop-i-003',
    topic: 'oop',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What is polymorphism?',
    options: [
      'Hiding an object\'s internal details',
      'Different types responding to the same method call in their own way',
      'Creating several objects from one class',
      'Inheriting from two parents at once',
    ],
    answerIndex: 1,
    explanation:
      'Polymorphism means code can call len(x) or x.draw() without knowing x\'s exact type. Python leans on duck typing: if the object supports the operation, it works.',
    tags: ['theory', 'polymorphism'],
  },
  {
    id: 'oop-i-004',
    topic: 'oop',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What is abstraction in OOP?',
    options: [
      'Combining data and methods into one unit',
      'Exposing only the essential interface and hiding the implementation',
      'Sharing behaviour through a base class',
      'Instantiating a class many times',
    ],
    answerIndex: 1,
    explanation:
      'Abstraction lets a caller use sort() without knowing the algorithm. In Python it is often expressed with abstract base classes from the abc module or simply a documented interface.',
    tags: ['theory', 'abstraction'],
  },
  {
    id: 'oop-h-001',
    topic: 'oop',
    tier: 'hard',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`class Counter:
    count = 0
    def __init__(self):
        self.count += 1

a = Counter()
b = Counter()
print(Counter.count, a.count)`,
    options: ['2 1', '0 1', '1 1', '2 2'],
    answerIndex: 1,
    explanation:
      'self.count += 1 READS the class attribute 0 then WRITES a new instance attribute of 1, shadowing it. The class attribute itself is never modified, so it stays 0.',
    tags: ['class-attributes', 'shadowing', 'pitfall'],
  },
  {
    id: 'oop-h-002',
    topic: 'oop',
    tier: 'hard',
    type: 'bug',
    prompt: 'Why does calling p.greet() raise TypeError?',
    code: String.raw`class Person:
    def greet():
        print("hi")

p = Person()
p.greet()`,
    options: [
      'The method is missing the self parameter',
      'greet must be decorated with @staticmethod to print',
      'The class needs an explicit __init__',
      'print() cannot be called inside a class body',
    ],
    answerIndex: 0,
    explanation:
      'p.greet() automatically passes p as the first argument, but greet accepts none, so Python reports it got 1 argument and expected 0. Add self, or mark it @staticmethod if it needs no instance.',
    tags: ['self', 'methods', 'typeerror'],
  },
  {
    id: 'oop-h-003',
    topic: 'oop',
    tier: 'hard',
    type: 'multi',
    prompt: 'Which statements about a leading double underscore, as in self.__x, are true?',
    options: [
      'It triggers name mangling to _ClassName__x',
      'It makes the attribute genuinely inaccessible from outside',
      'It helps avoid accidental attribute clashes in subclasses',
      'It is enforced by the interpreter as a private access modifier',
    ],
    answerIndices: [0, 2],
    explanation:
      'Double underscore renames the attribute to avoid subclass collisions, but the mangled name is still reachable. Python has no true private access; the convention communicates intent.',
    tags: ['name-mangling', 'privacy'],
  },
  {
    id: 'oop-e-007',
    topic: 'oop',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the difference between a class and an instance?',
    back: 'A class is the blueprint describing structure and behaviour; an instance is one concrete object built from it. Dog is the class, my_dog = Dog() is an instance with its own attribute values.',
    tags: ['terminology'],
  },
  {
    id: 'oop-i-005',
    topic: 'oop',
    tier: 'intermediate',
    type: 'order',
    prompt: 'Put these lines in order to define a class with an initializer and use it.',
    items: [
      'class Dog:',
      '    def __init__(self, name):',
      '        self.name = name',
      '    def speak(self):',
      '        return f"{self.name} says woof"',
      'print(Dog("Rex").speak())',
    ],
    explanation:
      '__init__ stores the constructor argument on the instance, and speak reads it back through self. Both methods must be indented inside the class body.',
    tags: ['classes', 'flow'],
  },
]

export default questions
