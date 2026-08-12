// Inheritance, Dunders & Properties
//
// Target: 14 questions = 2 flashcard + 1 order + 11 graded
// Graded tier split: easy 4 / intermediate 4 / hard 3
// Graded type mix: at least 2 output, at least 1 bug, at least 1 multi, rest mcq
//
// Every id in this file MUST start with 'oop-advanced-'. See docs/AUTHORING.md.
// Only the contents of this array change. Do not edit the barrel or topics.js.

/** @type {import('../../lib/validateBank.js').Question[]} */
const questions = [
  {
    id: 'oop-advanced-e-001',
    topic: 'oop-advanced',
    tier: 'easy',
    type: 'mcq',
    prompt: 'How do you declare that class Child inherits from class Parent?',
    options: ['class Child extends Parent:', 'class Child inherits Parent:', 'class Child(Parent):', 'class Child: super(Parent)'],
    answerIndex: 2,
    explanation:
      'Python names base classes in parentheses after the class name. Listing more than one, as in class C(A, B), gives multiple inheritance.',
    tags: ['inheritance', 'syntax'],
  },
  {
    id: 'oop-advanced-e-002',
    topic: 'oop-advanced',
    tier: 'easy',
    type: 'mcq',
    prompt: 'How do you call a parent class implementation from inside a child class?',
    options: ['parent.method()', 'super().method()', 'base.method()', 'this.method()'],
    answerIndex: 1,
    explanation:
      'super() walks the method resolution order to find the next implementation. Naming the parent directly also works but breaks down with multiple inheritance.',
    tags: ['inheritance', 'super'],
  },
  {
    id: 'oop-advanced-e-003',
    topic: 'oop-advanced',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is method overriding?',
    options: [
      'Deleting a method inherited from the parent',
      'Redefining an inherited method in the child class to change its behaviour',
      'Adding extra parameters to an existing method',
      'Calling two methods at the same time',
    ],
    answerIndex: 1,
    explanation:
      'A child defines a method with the same name as the parent, and instances of the child use the new version. The parent version stays reachable through super().',
    tags: ['inheritance', 'overriding'],
  },
  {
    id: 'oop-advanced-e-004',
    topic: 'oop-advanced',
    tier: 'easy',
    type: 'mcq',
    prompt: 'What is a dunder (magic) method?',
    options: [
      'A method whose name is wrapped in double underscores and hooks into built-in syntax',
      'A method that can only be called once',
      'A method with default parameter values',
      'A method scheduled for removal from the language',
    ],
    answerIndex: 0,
    explanation:
      'Names like __init__, __len__ and __add__ let your class plug into language-level operations. Python calls them implicitly when you use the corresponding syntax.',
    tags: ['dunder'],
  },
  {
    id: 'oop-advanced-i-001',
    topic: 'oop-advanced',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What does isinstance(obj, MyClass) return?',
    options: [
      'The class of obj',
      'True if obj is an instance of MyClass or any subclass of it',
      'True only when obj\'s type is exactly MyClass',
      'The parent class of obj',
    ],
    answerIndex: 1,
    explanation:
      'isinstance honours the inheritance chain, which is usually what you want. Use type(obj) is MyClass when you deliberately need to reject subclasses.',
    tags: ['isinstance', 'inheritance'],
  },
  {
    id: 'oop-advanced-i-002',
    topic: 'oop-advanced',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What does defining __len__ enable?',
    options: [
      'Renaming the class at runtime',
      'Calling the built-in len() on your objects',
      'Comparing two objects with <',
      'Iterating the object in a for loop',
    ],
    answerIndex: 1,
    explanation:
      'len(obj) delegates to obj.__len__(). It must return a non-negative int. Iteration is provided by __iter__ instead, and ordering by __lt__ and friends.',
    tags: ['dunder', 'len'],
  },
  {
    id: 'oop-advanced-i-003',
    topic: 'oop-advanced',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'Which dunder method implements the + operator between two objects?',
    options: ['__plus__', '__add__', '__sum__', '__concat__'],
    answerIndex: 1,
    explanation:
      'a + b tries a.__add__(b) first, and if that returns NotImplemented Python falls back to b.__radd__(a). That fallback is how sum() works with custom types on the right-hand side.',
    tags: ['dunder', 'operators'],
  },
  {
    id: 'oop-advanced-i-004',
    topic: 'oop-advanced',
    tier: 'intermediate',
    type: 'mcq',
    prompt: 'What does the @property decorator do?',
    options: [
      'Defines a class-level constant',
      'Lets a method be accessed like a plain attribute',
      'Marks an attribute as read-only for the interpreter',
      'Registers the attribute for serialisation',
    ],
    answerIndex: 1,
    explanation:
      '@property turns obj.area() into obj.area while still running your code, so you can add validation or computed values later without changing every caller.',
    tags: ['property', 'decorators'],
  },
  {
    id: 'oop-advanced-h-001',
    topic: 'oop-advanced',
    tier: 'hard',
    type: 'mcq',
    prompt: 'What is multiple inheritance, and what resolves ambiguity between the parents?',
    options: [
      'Creating multiple instances; ambiguity is resolved alphabetically',
      'A class inheriting from several parents; the MRO (C3 linearisation) decides lookup order',
      'Overriding several methods at once; the last definition wins',
      'Having many child classes; the interpreter picks at random',
    ],
    answerIndex: 1,
    explanation:
      'class C(A, B) inherits from both. Python computes a deterministic method resolution order, visible as C.__mro__, so attribute lookup is predictable rather than ambiguous.',
    tags: ['inheritance', 'mro'],
  },
  {
    id: 'oop-advanced-h-002',
    topic: 'oop-advanced',
    tier: 'hard',
    type: 'output',
    prompt: 'What is printed?',
    code: String.raw`class A:
    def who(self):
        return "A"

class B(A):
    def who(self):
        return "B" + super().who()

print(B().who())`,
    options: ['B', 'BA', 'AB', 'A'],
    answerIndex: 1,
    explanation:
      'B.who runs first and returns "B" concatenated with super().who(), which resolves to A.who returning "A". The result is "BA".',
    tags: ['inheritance', 'super', 'mro'],
  },
  {
    id: 'oop-advanced-h-003',
    topic: 'oop-advanced',
    tier: 'hard',
    type: 'bug',
    prompt: 'Instances of Square have no side attribute. What is missing?',
    code: String.raw`class Shape:
    def __init__(self, name):
        self.name = name

class Square(Shape):
    def __init__(self, side):
        self.side = side

s = Square(4)
print(s.name)`,
    options: [
      'Square.__init__ never calls super().__init__, so name is never set',
      'Shape must define name as a class attribute',
      'Square must list Shape twice to inherit attributes',
      'print() cannot read inherited attributes',
    ],
    answerIndex: 0,
    explanation:
      'Overriding __init__ replaces the parent entirely; Python does not chain constructors automatically. Call super().__init__(...) so the base class can set up its own state.',
    tags: ['inheritance', 'super', 'init'],
  },
  {
    id: 'oop-advanced-e-005',
    topic: 'oop-advanced',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is the difference between __str__ and __repr__?',
    back: '__str__ is the friendly form for end users, shown by print(). __repr__ is the unambiguous form for developers, shown in the REPL and in containers. If only __repr__ exists it is used for both.',
    tags: ['dunder'],
  },
  {
    id: 'oop-advanced-e-006',
    topic: 'oop-advanced',
    tier: 'easy',
    type: 'flashcard',
    prompt: 'What is composition, and when is it preferred over inheritance?',
    back: 'Composition means holding another object as an attribute and delegating to it. Prefer it when the relationship is "has a" rather than "is a" - it avoids deep fragile hierarchies and is easier to change later.',
    tags: ['design', 'composition'],
  },
]

export default questions
