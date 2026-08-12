import { useState } from "react";

const topics = [
  {
    id: 1,
    title: "Basic Syntax & Data Types",
    icon: "🐍",
    color: "#3FB950",
    questions: [
      {
        q: "What is the output of: `type(3.14)`?",
        options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'number'>"],
        answer: 1,
        explanation: "3.14 is a floating-point number, so type() returns <class 'float'>."
      },
      {
        q: "Which of the following is a valid variable name in Python?",
        options: ["2name", "my-var", "_myVar", "class"],
        answer: 2,
        explanation: "Variable names can start with a letter or underscore. '2name' starts with a digit, 'my-var' uses a hyphen, and 'class' is a reserved keyword."
      },
      {
        q: "What does `bool('')` evaluate to?",
        options: ["True", "False", "None", "Error"],
        answer: 1,
        explanation: "An empty string is falsy in Python, so bool('') returns False."
      },
      {
        q: "What is the result of `10 // 3`?",
        options: ["3.33", "3", "4", "1"],
        answer: 1,
        explanation: "// is the floor division operator. 10 // 3 = 3 (discards the remainder)."
      },
      {
        q: "Which data type is immutable in Python?",
        options: ["list", "dict", "set", "tuple"],
        answer: 3,
        explanation: "Tuples are immutable — once created, their elements cannot be changed."
      }
    ]
  },
  {
    id: 2,
    title: "Data Structures",
    icon: "🗂️",
    color: "#58A6FF",
    questions: [
      {
        q: "How do you add an element to the end of a list `lst`?",
        options: ["lst.add(x)", "lst.append(x)", "lst.push(x)", "lst.insert(x)"],
        answer: 1,
        explanation: "list.append(x) adds element x to the end of the list."
      },
      {
        q: "What does `{1, 2, 2, 3}` evaluate to?",
        options: ["{1, 2, 2, 3}", "{1, 2, 3}", "[1, 2, 3]", "Error"],
        answer: 1,
        explanation: "Sets automatically remove duplicates, so {1, 2, 2, 3} becomes {1, 2, 3}."
      },
      {
        q: "What is the output of `d = {'a': 1}; d.get('b', 0)`?",
        options: ["None", "KeyError", "0", "1"],
        answer: 2,
        explanation: "dict.get(key, default) returns the default value (0 here) if the key is not found."
      },
      {
        q: "Which of these creates a tuple with a single element?",
        options: ["(1)", "(1,)", "[1]", "{1}"],
        answer: 1,
        explanation: "A trailing comma is needed: (1,) is a tuple, but (1) is just the integer 1 in parentheses."
      },
      {
        q: "What does `list('abc')` return?",
        options: ["['abc']", "['a','b','c']", "('a','b','c')", "Error"],
        answer: 1,
        explanation: "Passing a string to list() creates a list of individual characters: ['a', 'b', 'c']."
      }
    ]
  },
  {
    id: 3,
    title: "Control Structures",
    icon: "🔀",
    color: "#F78166",
    questions: [
      {
        q: "What keyword is used to skip the rest of a loop iteration?",
        options: ["break", "pass", "continue", "skip"],
        answer: 2,
        explanation: "'continue' skips the rest of the current iteration and moves to the next one."
      },
      {
        q: "What does `for i in range(3)` iterate over?",
        options: ["[1, 2, 3]", "[0, 1, 2]", "[0, 1, 2, 3]", "[1, 2]"],
        answer: 1,
        explanation: "range(3) generates 0, 1, 2 — it starts at 0 and stops before 3."
      },
      {
        q: "Which loop is guaranteed to execute at least once?",
        options: ["for loop", "while loop", "Python has no such loop", "do-while loop"],
        answer: 2,
        explanation: "Python does not have a do-while loop. Both for and while check their condition before executing."
      },
      {
        q: "What is the purpose of the `else` clause in a `for` loop?",
        options: ["Runs if an exception occurs", "Runs if the loop completes without a break", "Always runs after the loop", "It's invalid syntax"],
        answer: 1,
        explanation: "The else block in a for loop executes only if the loop finished normally (without hitting a break)."
      },
      {
        q: "What does `pass` do?",
        options: ["Exits the function", "Skips an iteration", "Does nothing; acts as a placeholder", "Raises an error"],
        answer: 2,
        explanation: "'pass' is a null statement used as a placeholder where code is syntactically required but nothing should happen."
      }
    ]
  },
  {
    id: 4,
    title: "Functions & Scope",
    icon: "⚙️",
    color: "#D2A8FF",
    questions: [
      {
        q: "What does a function return if no `return` statement is present?",
        options: ["0", "False", "None", "Error"],
        answer: 2,
        explanation: "Python functions implicitly return None if no return statement is provided."
      },
      {
        q: "What does `*args` allow in a function definition?",
        options: ["Keyword arguments only", "A variable number of positional arguments", "A single argument", "Default argument values"],
        answer: 1,
        explanation: "*args collects any extra positional arguments into a tuple."
      },
      {
        q: "What is the scope of a variable defined inside a function?",
        options: ["Global", "Built-in", "Local", "Enclosing"],
        answer: 2,
        explanation: "Variables defined inside a function have local scope — they're only accessible within that function."
      },
      {
        q: "How do you modify a global variable inside a function?",
        options: ["Use 'extern x'", "Use 'global x'", "Use 'modify x'", "Just assign to it"],
        answer: 1,
        explanation: "The 'global' keyword tells Python to use the global variable rather than creating a local one."
      },
      {
        q: "What is a default argument?",
        options: ["An argument that is always required", "An argument with a preset value used if none is provided", "The first argument of any function", "An argument passed with a keyword"],
        answer: 1,
        explanation: "Default arguments are defined with '=' in the function signature (e.g., def f(x=10)) and are optional when calling the function."
      }
    ]
  },
  {
    id: 5,
    title: "Classes & Inheritance",
    icon: "🧬",
    color: "#FFA657",
    questions: [
      {
        q: "What method is automatically called when an object is created?",
        options: ["__start__", "__init__", "__new__", "__create__"],
        answer: 1,
        explanation: "__init__ is the constructor method that initializes a newly created object."
      },
      {
        q: "Which keyword is used to inherit from a parent class?",
        options: ["extends", "inherits", "class Child(Parent):", "super()"],
        answer: 2,
        explanation: "In Python, inheritance is specified by passing the parent class in parentheses: class Child(Parent)."
      },
      {
        q: "How do you call a method from the parent class inside a child class?",
        options: ["parent.method()", "super().method()", "base.method()", "this.method()"],
        answer: 1,
        explanation: "super() returns a proxy object that allows you to call the parent class's methods."
      },
      {
        q: "What is method overriding?",
        options: ["Deleting a parent method", "Defining a method in a child class with the same name as in the parent", "Adding extra parameters to a method", "Calling two methods simultaneously"],
        answer: 1,
        explanation: "Method overriding means redefining a method in a subclass to change its behavior."
      },
      {
        q: "What does `isinstance(obj, MyClass)` return?",
        options: ["The class of obj", "True if obj is an instance of MyClass or its subclass", "True only for exact class match", "The parent class"],
        answer: 1,
        explanation: "isinstance() returns True if the object is an instance of the class or any subclass thereof."
      }
    ]
  },
  {
    id: 6,
    title: "Lambda Functions",
    icon: "λ",
    color: "#79C0FF",
    questions: [
      {
        q: "What is a lambda function?",
        options: ["A function from the math library", "An anonymous, single-expression function", "A recursive function", "A built-in function"],
        answer: 1,
        explanation: "A lambda is an anonymous function defined with the 'lambda' keyword that can have any number of arguments but only one expression."
      },
      {
        q: "What is the output of `f = lambda x: x * 2; f(5)`?",
        options: ["25", "10", "52", "Error"],
        answer: 1,
        explanation: "The lambda multiplies its argument by 2, so f(5) = 10."
      },
      {
        q: "How do you write a lambda that adds two numbers?",
        options: ["lambda x, y: return x+y", "lambda(x, y): x+y", "lambda x, y: x+y", "def lambda(x,y): x+y"],
        answer: 2,
        explanation: "Lambda syntax is: lambda arguments: expression. No 'return' keyword is used."
      },
      {
        q: "What built-in function uses a lambda to sort a list of tuples by the second element?",
        options: ["filter()", "map()", "sorted(key=lambda x: x[1])", "reduce()"],
        answer: 2,
        explanation: "sorted() accepts a 'key' argument — a lambda makes it easy to specify any sort criteria."
      },
      {
        q: "What is the result of `list(map(lambda x: x**2, [1,2,3]))`?",
        options: ["[1,2,3]", "[2,4,6]", "[1,4,9]", "[1,8,27]"],
        answer: 2,
        explanation: "map() applies the lambda (squares each element) to every item: [1²,2²,3²] = [1,4,9]."
      }
    ]
  },
  {
    id: 7,
    title: "Classes",
    icon: "🏛️",
    color: "#56D364",
    questions: [
      {
        q: "What does `self` refer to in a class method?",
        options: ["The class itself", "The current instance of the class", "The parent class", "The module"],
        answer: 1,
        explanation: "'self' is a reference to the current object/instance and must be the first parameter of instance methods."
      },
      {
        q: "How do you define a class attribute (shared across all instances)?",
        options: ["Inside __init__ with self.x", "Inside the class body but outside any method", "Using @classattr", "In a separate config file"],
        answer: 1,
        explanation: "Class attributes are defined directly inside the class body (not inside __init__) and are shared by all instances."
      },
      {
        q: "What is a `@staticmethod`?",
        options: ["A method that cannot be called", "A method bound to the class that takes no self/cls argument", "A method that modifies class state", "A private method"],
        answer: 1,
        explanation: "Static methods don't receive self or cls — they behave like regular functions that live inside a class's namespace."
      },
      {
        q: "What does `__str__` define for a class?",
        options: ["How the class is stored in memory", "The string representation when print() or str() is called", "The comparison logic", "How two objects are added"],
        answer: 1,
        explanation: "__str__ defines the human-readable string representation, used by print() and str()."
      },
      {
        q: "What is encapsulation in Python classes?",
        options: ["Inheriting from multiple classes", "Bundling data and methods together, restricting direct access", "Defining methods outside the class", "Using only static methods"],
        answer: 1,
        explanation: "Encapsulation bundles data (attributes) and behavior (methods) in one unit and hides internal details using name mangling (__attr)."
      }
    ]
  },
  {
    id: 8,
    title: "Methods",
    icon: "🔧",
    color: "#FF7B72",
    questions: [
      {
        q: "What decorator creates a class method?",
        options: ["@staticmethod", "@classmethod", "@instancemethod", "@method"],
        answer: 1,
        explanation: "@classmethod creates a method that receives the class (cls) as its first argument instead of the instance."
      },
      {
        q: "What is a dunder (magic) method?",
        options: ["A method starting with double underscores", "A private method", "A method with default values", "A deprecated method"],
        answer: 0,
        explanation: "Dunder methods (like __init__, __str__) are surrounded by double underscores and have special meaning in Python."
      },
      {
        q: "What does `__len__` allow you to do?",
        options: ["Rename the class", "Use len() on your custom object", "Compare two objects", "Iterate over the object"],
        answer: 1,
        explanation: "Defining __len__ lets Python's built-in len() function work on your custom objects."
      },
      {
        q: "Which method is called when you use `+` between two objects?",
        options: ["__plus__", "__add__", "__sum__", "__concat__"],
        answer: 1,
        explanation: "__add__ is the magic method that defines behavior for the + operator."
      },
      {
        q: "What is a property in Python?",
        options: ["A class-level variable", "A method accessed like an attribute using @property", "A static variable", "An imported module attribute"],
        answer: 1,
        explanation: "The @property decorator lets you define a method that's accessed like an attribute, enabling controlled access."
      }
    ]
  },
  {
    id: 9,
    title: "Modules & Packages",
    icon: "📦",
    color: "#E3B341",
    questions: [
      {
        q: "How do you import only the `sqrt` function from the `math` module?",
        options: ["import math.sqrt", "from math import sqrt", "include math.sqrt", "using math: sqrt"],
        answer: 1,
        explanation: "'from module import name' lets you import specific names from a module directly into your namespace."
      },
      {
        q: "What file makes a directory a Python package?",
        options: ["main.py", "setup.py", "__init__.py", "package.py"],
        answer: 2,
        explanation: "A directory becomes a package when it contains an __init__.py file (can be empty)."
      },
      {
        q: "What does `import module as m` do?",
        options: ["Creates a copy of the module", "Imports and gives the module an alias 'm'", "Imports only a part of the module", "Reloads the module"],
        answer: 1,
        explanation: "The 'as' keyword creates an alias — useful for long module names (e.g., import numpy as np)."
      },
      {
        q: "What is `pip` used for?",
        options: ["Running Python scripts", "Installing and managing third-party packages", "Compiling Python code", "Debugging programs"],
        answer: 1,
        explanation: "pip is Python's package installer, used to install packages from PyPI (e.g., pip install requests)."
      },
      {
        q: "What does the `__name__ == '__main__'` check do?",
        options: ["Checks if the file has a main() function", "Runs code only when the file is executed directly, not imported", "Defines the entry point for a class", "Checks the module version"],
        answer: 1,
        explanation: "When a file is run directly, __name__ is '__main__'. When imported, it's the module's name — so this guard prevents code from running on import."
      }
    ]
  },
  {
    id: 10,
    title: "File Handling",
    icon: "📁",
    color: "#89DDFF",
    questions: [
      {
        q: "What is the correct way to open a file for reading?",
        options: ["open('f.txt', 'w')", "open('f.txt', 'r')", "open('f.txt', 'a')", "open('f.txt', 'x')"],
        answer: 1,
        explanation: "'r' mode opens a file for reading (default). 'w' writes, 'a' appends, 'x' creates exclusively."
      },
      {
        q: "What does the `with` statement do when opening files?",
        options: ["Locks the file", "Automatically closes the file after the block", "Opens the file in binary mode", "Catches file errors"],
        answer: 1,
        explanation: "The 'with' statement (context manager) ensures the file is automatically closed even if an error occurs."
      },
      {
        q: "What does `file.readlines()` return?",
        options: ["A single string", "A list of lines", "A generator object", "An integer count of lines"],
        answer: 1,
        explanation: "readlines() reads all lines and returns them as a list of strings, each ending with '\\n'."
      },
      {
        q: "Which mode appends to an existing file without truncating it?",
        options: ["'r'", "'w'", "'a'", "'x'"],
        answer: 2,
        explanation: "'a' (append) mode adds content to the end of an existing file without deleting its contents."
      },
      {
        q: "How do you read a file as bytes (binary mode)?",
        options: ["open('f', 'b')", "open('f', 'rb')", "open('f', 'bytes')", "open('f', 'r', binary=True)"],
        answer: 1,
        explanation: "Combine 'r' with 'b' to get 'rb' — binary read mode returns bytes instead of strings."
      }
    ]
  },
  {
    id: 11,
    title: "Error / Exception Handling",
    icon: "🚨",
    color: "#FF6E6E",
    questions: [
      {
        q: "Which block runs regardless of whether an exception occurred?",
        options: ["except", "else", "finally", "catch"],
        answer: 2,
        explanation: "The 'finally' block always runs after try/except, making it ideal for cleanup operations."
      },
      {
        q: "How do you raise a custom exception?",
        options: ["throw ValueError('msg')", "raise ValueError('msg')", "error ValueError('msg')", "except ValueError('msg')"],
        answer: 1,
        explanation: "Python uses 'raise' to throw exceptions. You can raise built-in or custom exception types."
      },
      {
        q: "What happens if an exception is not caught?",
        options: ["The program ignores it", "The program crashes and prints a traceback", "The exception is logged silently", "Python retries the block"],
        answer: 1,
        explanation: "Uncaught exceptions propagate up the call stack. If unhandled, the program terminates and prints the traceback."
      },
      {
        q: "What does the `else` clause in a try-except block do?",
        options: ["Runs only if an exception occurred", "Runs only if NO exception occurred", "Always runs after the try", "Catches all exceptions"],
        answer: 1,
        explanation: "The else clause in try-except runs only when the try block succeeds without raising an exception."
      },
      {
        q: "How do you create a custom exception class?",
        options: ["class MyError:", "class MyError(Exception):", "def MyError(Exception):", "exception MyError:"],
        answer: 1,
        explanation: "Custom exceptions inherit from Exception (or another exception class): class MyError(Exception): pass"
      }
    ]
  },
  {
    id: 12,
    title: "OOP Concepts",
    icon: "🎯",
    color: "#C9D1D9",
    questions: [
      {
        q: "What are the four pillars of OOP?",
        options: ["Compile, Link, Run, Debug", "Encapsulation, Abstraction, Inheritance, Polymorphism", "Variables, Loops, Functions, Classes", "Input, Process, Output, Store"],
        answer: 1,
        explanation: "The four pillars are: Encapsulation, Abstraction, Inheritance, and Polymorphism."
      },
      {
        q: "What is polymorphism?",
        options: ["Hiding internal details", "Multiple classes sharing the same interface or method name", "Creating multiple objects", "Inheriting from two parents"],
        answer: 1,
        explanation: "Polymorphism means many forms — different classes can implement the same method name differently."
      },
      {
        q: "What is abstraction in OOP?",
        options: ["Combining data and methods", "Hiding complex implementation and showing only essentials", "Sharing behavior via inheritance", "Using many class instances"],
        answer: 1,
        explanation: "Abstraction focuses on exposing only what's necessary, hiding the underlying complexity."
      },
      {
        q: "What keyword creates a private attribute (by convention) in Python?",
        options: ["private x", "__x (double underscore)", "#x", "!x"],
        answer: 1,
        explanation: "Prefixing with __ (double underscore) triggers name mangling, making the attribute harder to access from outside the class."
      },
      {
        q: "What is multiple inheritance?",
        options: ["Creating multiple instances", "A class inheriting from more than one parent class", "Overriding more than one method", "Having many child classes"],
        answer: 1,
        explanation: "Python supports multiple inheritance: class C(A, B) inherits from both A and B."
      }
    ]
  },
  {
    id: 13,
    title: "Regular Expressions",
    icon: "🔍",
    color: "#A5D6FF",
    questions: [
      {
        q: "Which module provides regular expression support in Python?",
        options: ["regex", "re", "regexp", "pattern"],
        answer: 1,
        explanation: "The built-in 're' module provides regular expression operations."
      },
      {
        q: "What does `re.match()` do?",
        options: ["Searches entire string", "Checks for a match only at the beginning of the string", "Replaces matches", "Returns all matches"],
        answer: 1,
        explanation: "re.match() only matches at the start of the string. Use re.search() to find a match anywhere."
      },
      {
        q: "What does the pattern `\\d+` match?",
        options: ["Any letter", "One or more digits", "Whitespace", "Any character except digits"],
        answer: 1,
        explanation: "\\d matches any digit [0-9], and + means one or more. So \\d+ matches sequences of digits."
      },
      {
        q: "What does `re.sub(pattern, repl, string)` do?",
        options: ["Finds all matches", "Replaces matches of pattern with repl in string", "Splits string by pattern", "Compiles the pattern"],
        answer: 1,
        explanation: "re.sub() replaces all occurrences of the pattern with the replacement string."
      },
      {
        q: "What does the `^` character mean inside a character class `[^abc]`?",
        options: ["Start of string", "Matches a, b, or c", "Matches any character NOT in the set", "End of line"],
        answer: 2,
        explanation: "Inside square brackets, ^ negates the set: [^abc] matches any character that is NOT a, b, or c."
      }
    ]
  },
  {
    id: 14,
    title: "Debugging & Testing",
    icon: "🐛",
    color: "#FFAB70",
    questions: [
      {
        q: "Which built-in module is used for unit testing in Python?",
        options: ["pytest", "unittest", "testlib", "doctest"],
        answer: 1,
        explanation: "'unittest' is Python's built-in testing framework, inspired by Java's JUnit."
      },
      {
        q: "What does `assert x == 5` do?",
        options: ["Assigns 5 to x", "Raises AssertionError if x is not 5", "Prints x", "Returns True or False"],
        answer: 1,
        explanation: "assert checks a condition — if it's False, it raises an AssertionError. Used in tests and debugging."
      },
      {
        q: "What is the purpose of `pdb`?",
        options: ["A package database", "Python's built-in interactive debugger", "A profiling tool", "A logging library"],
        answer: 1,
        explanation: "pdb (Python Debugger) lets you step through code, inspect variables, and set breakpoints interactively."
      },
      {
        q: "What does a test that 'passes' mean in unittest?",
        options: ["The function returned a value", "No AssertionError was raised", "The function was imported successfully", "The test was skipped"],
        answer: 1,
        explanation: "A test passes when all assertions succeed — no AssertionError is raised during execution."
      },
      {
        q: "What does `print()` debugging mean?",
        options: ["Using a GUI debugger", "Inserting print statements to trace variable values", "Running the code in verbose mode", "Using the logging module"],
        answer: 1,
        explanation: "Print debugging is the simple practice of adding print() calls to inspect values at runtime — quick but not scalable."
      }
    ]
  },
  {
    id: 15,
    title: "Recursion",
    icon: "🔄",
    color: "#7EE8A2",
    questions: [
      {
        q: "What is the base case in recursion?",
        options: ["The first recursive call", "The condition that stops further recursive calls", "The return value", "The function name"],
        answer: 1,
        explanation: "The base case is the condition that terminates recursion, preventing infinite loops."
      },
      {
        q: "What error occurs with infinite recursion in Python?",
        options: ["OverflowError", "RecursionError", "MemoryError", "InfiniteLoopError"],
        answer: 1,
        explanation: "Python raises RecursionError (maximum recursion depth exceeded) when the call stack overflows."
      },
      {
        q: "What is the recursive formula for factorial(n)?",
        options: ["n + factorial(n-1)", "n * factorial(n-1)", "n * factorial(n+1)", "factorial(n) * factorial(n)"],
        answer: 1,
        explanation: "factorial(n) = n × factorial(n-1), with base case factorial(0) = 1."
      },
      {
        q: "What does `sys.setrecursionlimit(n)` do?",
        options: ["Sets the maximum value of n", "Changes Python's maximum recursion depth", "Disables recursion", "Sets the number of function calls per second"],
        answer: 1,
        explanation: "sys.setrecursionlimit() changes the maximum depth of the Python call stack (default ~1000)."
      },
      {
        q: "Which concept can often replace recursion for better performance?",
        options: ["Classes", "Decorators", "Dynamic programming / memoization", "Regular expressions"],
        answer: 2,
        explanation: "Memoization (caching results) or iterative approaches with dynamic programming can eliminate redundant recursive calls."
      }
    ]
  },
  {
    id: 16,
    title: "Threading",
    icon: "🧵",
    color: "#D2A8FF",
    questions: [
      {
        q: "Which module provides threading in Python?",
        options: ["multiprocessing", "concurrent", "threading", "asyncio"],
        answer: 2,
        explanation: "The 'threading' module provides Thread class and synchronization primitives for multi-threaded programs."
      },
      {
        q: "What is the GIL in Python?",
        options: ["Global Import Library", "Global Interpreter Lock — prevents true parallel thread execution", "A garbage collection mechanism", "A type of thread lock"],
        answer: 1,
        explanation: "The GIL (Global Interpreter Lock) allows only one thread to execute Python bytecode at a time, limiting CPU-bound parallelism."
      },
      {
        q: "How do you start a thread?",
        options: ["thread.run()", "thread.begin()", "thread.start()", "thread.execute()"],
        answer: 2,
        explanation: "thread.start() begins execution in a new thread. Note: thread.run() calls the target directly without a new thread."
      },
      {
        q: "What does `thread.join()` do?",
        options: ["Merges two threads", "Waits for the thread to finish before continuing", "Stops the thread immediately", "Connects threads together"],
        answer: 1,
        explanation: "join() blocks the calling thread until the specified thread completes its execution."
      },
      {
        q: "What is a race condition?",
        options: ["Two threads running at the same speed", "Unpredictable behavior when threads access shared data simultaneously", "A thread finishing too quickly", "A threading performance benchmark"],
        answer: 1,
        explanation: "A race condition occurs when multiple threads read/write shared state simultaneously, producing unpredictable results."
      }
    ]
  }
];

export default function PythonQuiz() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [topicScores, setTopicScores] = useState({});
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const completedTopics = Object.keys(topicScores).length;
  const totalQuestions = topics.reduce((a, t) => a + t.questions.length, 0);
  const totalAnswered = Object.values(topicScores).reduce((a, b) => a + b.total, 0);
  const totalCorrect = Object.values(topicScores).reduce((a, b) => a + b.score, 0);

  function startTopic(topic) {
    setSelectedTopic(topic);
    setCurrentQ(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setFinished(false);
    setWrongAnswers([]);
  }

  function handleSelect(i) {
    if (!confirmed) setSelected(i);
  }

  function handleConfirm() {
    if (selected === null) return;
    setConfirmed(true);
    if (selected === selectedTopic.questions[currentQ].answer) {
      setScore(s => s + 1);
    } else {
      setWrongAnswers(w => [...w, { ...selectedTopic.questions[currentQ], chosen: selected }]);
    }
  }

  function handleNext() {
    if (currentQ + 1 < selectedTopic.questions.length) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      const finalScore = score + (confirmed && selected === selectedTopic.questions[currentQ].answer ? 0 : 0);
      const s = confirmed && selected === selectedTopic.questions[currentQ].answer ? score : score;
      setTopicScores(ts => ({
        ...ts,
        [selectedTopic.id]: { score: s, total: selectedTopic.questions.length }
      }));
      setFinished(true);
    }
  }

  const topic = selectedTopic;
  const q = topic ? topic.questions[currentQ] : null;
  const isCorrect = confirmed && selected === q?.answer;

  if (!selectedTopic) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0d1117",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        padding: "32px 20px",
        color: "#e6edf3"
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Sora:wght@400;700;800&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #161b22; } ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 3px; }
          .topic-card { transition: all 0.18s cubic-bezier(.4,0,.2,1); cursor: pointer; background: #161b22; border: 1.5px solid #30363d; border-radius: 14px; padding: 18px 16px; display: flex; flex-direction: column; gap: 8px; }
          .topic-card:hover { transform: translateY(-3px); border-color: var(--c); box-shadow: 0 0 18px -4px var(--c); }
          .badge { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-family: 'JetBrains Mono', monospace; }
          .pulse { animation: pulse 2s infinite; }
          @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        `}</style>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🐍</div>
            <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 800, background: "linear-gradient(90deg, #3FB950, #58A6FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Onyeka Python Lab
            </h1>
            <p style={{ color: "#8b949e", marginTop: 8, fontSize: 14 }}>
              {topics.length} topics · {totalQuestions} questions · track your progress
            </p>
            {totalAnswered > 0 && (
              <div style={{ marginTop: 16, background: "#161b22", border: "1px solid #30363d", borderRadius: 10, padding: "10px 20px", display: "inline-flex", gap: 24, fontSize: 13 }}>
                <span>✅ <b style={{ color: "#3FB950" }}>{totalCorrect}</b> correct</span>
                <span>📋 <b style={{ color: "#58A6FF" }}>{totalAnswered}</b> answered</span>
                <span>🏆 <b style={{ color: "#FFA657" }}>{completedTopics}/{topics.length}</b> topics</span>
              </div>
            )}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
            {topics.map(t => {
              const ts = topicScores[t.id];
              const pct = ts ? Math.round((ts.score / ts.total) * 100) : null;
              return (
                <div key={t.id} className="topic-card" style={{ "--c": t.color }} onClick={() => startTopic(t)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 22 }}>{t.icon}</span>
                    {pct !== null ? (
                      <span className="badge" style={{ background: pct >= 80 ? "#1a3a1e" : pct >= 50 ? "#2d2a14" : "#2a1a1a", color: pct >= 80 ? "#3FB950" : pct >= 50 ? "#E3B341" : "#FF6E6E", border: `1px solid ${pct >= 80 ? "#3FB950" : pct >= 50 ? "#E3B341" : "#FF6E6E"}` }}>
                        {pct}%
                      </span>
                    ) : (
                      <span className="badge" style={{ background: "#1c2129", color: "#8b949e", border: "1px solid #30363d" }}>5 Qs</span>
                    )}
                  </div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 14, color: "#e6edf3" }}>{t.title}</div>
                  {pct !== null && (
                    <div style={{ background: "#0d1117", borderRadius: 999, height: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: t.color, borderRadius: 999 }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    const finalScore = topicScores[topic.id]?.score ?? score;
    const pct = Math.round((finalScore / topic.questions.length) * 100);
    const emoji = pct === 100 ? "🎉" : pct >= 80 ? "✨" : pct >= 60 ? "👍" : "💪";
    return (
      <div style={{ minHeight: "100vh", background: "#0d1117", fontFamily: "'Sora', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;700;800&display=swap'); * { box-sizing: border-box; }`}</style>
        <div style={{ maxWidth: 520, width: "100%", background: "#161b22", border: `2px solid ${topic.color}`, borderRadius: 20, padding: 36, textAlign: "center" }}>
          <div style={{ fontSize: 56 }}>{emoji}</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 12, color: "#e6edf3" }}>{topic.title}</h2>
          <div style={{ fontSize: 64, fontWeight: 800, color: topic.color, margin: "20px 0" }}>{pct}%</div>
          <p style={{ color: "#8b949e", fontSize: 15 }}>{finalScore} of {topic.questions.length} correct</p>
          {wrongAnswers.length > 0 && (
            <div style={{ marginTop: 24, textAlign: "left" }}>
              <p style={{ color: "#FF6E6E", fontWeight: 700, marginBottom: 12, fontSize: 13 }}>Review mistakes:</p>
              {wrongAnswers.map((w, i) => (
                <div key={i} style={{ background: "#0d1117", borderRadius: 10, padding: 12, marginBottom: 10, borderLeft: `3px solid #FF6E6E` }}>
                  <p style={{ fontSize: 12, color: "#e6edf3", marginBottom: 6 }}>{w.q}</p>
                  <p style={{ fontSize: 11, color: "#FF6E6E" }}>✗ You: {w.options[w.chosen]}</p>
                  <p style={{ fontSize: 11, color: "#3FB950" }}>✓ Answer: {w.options[w.answer]}</p>
                  <p style={{ fontSize: 11, color: "#8b949e", marginTop: 4 }}>{w.explanation}</p>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <button onClick={() => startTopic(topic)} style={{ flex: 1, padding: "12px", background: topic.color + "22", color: topic.color, border: `1.5px solid ${topic.color}`, borderRadius: 10, fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              Retry
            </button>
            <button onClick={() => setSelectedTopic(null)} style={{ flex: 1, padding: "12px", background: "#21262d", color: "#e6edf3", border: "1.5px solid #30363d", borderRadius: 10, fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              All Topics
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0d1117", fontFamily: "'Sora', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Sora:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; }
        .opt { transition: all 0.15s; cursor: pointer; }
        .opt:hover { border-color: var(--tc) !important; background: color-mix(in srgb, var(--tc) 8%, #161b22) !important; }
      `}</style>
      <div style={{ maxWidth: 580, width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <button onClick={() => setSelectedTopic(null)} style={{ background: "none", border: "none", color: "#8b949e", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
            ← All Topics
          </button>
          <span style={{ fontSize: 13, color: "#8b949e" }}>{topic.icon} {topic.title}</span>
          <span style={{ fontSize: 13, color: topic.color, fontWeight: 700 }}>{currentQ + 1} / {topic.questions.length}</span>
        </div>

        <div style={{ background: "#161b22", borderRadius: 4, height: 4, marginBottom: 24, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${((currentQ) / topic.questions.length) * 100}%`, background: topic.color, transition: "width 0.3s", borderRadius: 4 }} />
        </div>

        <div style={{ background: "#161b22", border: `1.5px solid #30363d`, borderRadius: 16, padding: 28 }}>
          <p style={{ fontSize: 17, fontWeight: 700, color: "#e6edf3", lineHeight: 1.5, marginBottom: 24, fontFamily: "'JetBrains Mono', monospace" }}>
            {q.q}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.options.map((opt, i) => {
              let bg = "#0d1117", border = "#30363d", color = "#c9d1d9";
              if (confirmed) {
                if (i === q.answer) { bg = "#1a3a1e"; border = "#3FB950"; color = "#3FB950"; }
                else if (i === selected && i !== q.answer) { bg = "#2a1a1a"; border = "#FF6E6E"; color = "#FF6E6E"; }
              } else if (selected === i) { bg = `color-mix(in srgb, ${topic.color} 10%, #161b22)`; border = topic.color; color = topic.color; }
              return (
                <div key={i} className={confirmed ? "" : "opt"} onClick={() => handleSelect(i)}
                  style={{ "--tc": topic.color, background: bg, border: `1.5px solid ${border}`, borderRadius: 10, padding: "12px 16px", color, fontSize: 14, fontWeight: 600, cursor: confirmed ? "default" : "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: border + "33", border: `1.5px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>
                    {confirmed && i === q.answer ? "✓" : confirmed && i === selected && i !== q.answer ? "✗" : String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </div>
              );
            })}
          </div>

          {confirmed && (
            <div style={{ marginTop: 18, background: isCorrect ? "#1a3a1e" : "#2a1a1a", border: `1px solid ${isCorrect ? "#3FB950" : "#FF6E6E"}`, borderRadius: 10, padding: "12px 16px", fontSize: 13, color: isCorrect ? "#7EE8A2" : "#FF9999", lineHeight: 1.5 }}>
              <b>{isCorrect ? "✓ Correct! " : "✗ Not quite. "}</b>{q.explanation}
            </div>
          )}

          <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
            {!confirmed ? (
              <button onClick={handleConfirm} disabled={selected === null}
                style={{ flex: 1, padding: "13px", background: selected !== null ? topic.color : "#21262d", color: selected !== null ? "#0d1117" : "#484f58", border: "none", borderRadius: 10, fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, cursor: selected !== null ? "pointer" : "not-allowed", transition: "all 0.15s" }}>
                Confirm Answer
              </button>
            ) : (
              <button onClick={handleNext}
                style={{ flex: 1, padding: "13px", background: topic.color, color: "#0d1117", border: "none", borderRadius: 10, fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                {currentQ + 1 < topic.questions.length ? "Next Question →" : "See Results 🏁"}
              </button>
            )}
          </div>
        </div>
        <p style={{ textAlign: "center", color: "#484f58", fontSize: 12, marginTop: 14 }}>
          Score: {score} / {currentQ + (confirmed ? 1 : 0)}
        </p>
      </div>
    </div>
  );
}
