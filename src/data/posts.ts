export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  metaDescription: string;
}

export const categories = [
  "JavaScript",
  "Python",
  "Web Development",
  "Data Structures",
  "DevOps",
  "React",
  "Career",
  "Best Practices",
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "understanding-javascript-closures",
    title: "Understanding JavaScript Closures: A Complete Guide for Developers",
    excerpt:
      "Master one of JavaScript's most powerful concepts. Learn how closures work, why they matter, and how to use them effectively in your code.",
    category: "JavaScript",
    tags: ["JavaScript", "Closures", "Functions", "Scope"],
    author: "Dhethi Team",
    date: "2026-02-15",
    readTime: "8 min read",
    featured: true,
    metaDescription:
      "Learn JavaScript closures with practical examples. Understand scope, lexical environment, and real-world use cases for closures in modern JavaScript development.",
    content: `Closures are one of the most fundamental and powerful concepts in JavaScript. Whether you are a beginner just starting your journey or an experienced developer looking to deepen your understanding, mastering closures is essential for writing clean, efficient, and maintainable code.

## What Is a Closure?

A closure is a function that has access to variables from its outer (enclosing) function's scope, even after that outer function has returned. In simpler terms, a closure "remembers" the environment in which it was created.

This might sound abstract, so let us look at a concrete example:

\`\`\`javascript
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
\`\`\`

In this example, the inner function maintains access to the \`count\` variable even after \`createCounter\` has finished executing. This is a closure in action.

## How Closures Work Under the Hood

To understand closures properly, you need to understand how JavaScript handles scope and the execution context. When a function is created, it captures a reference to its surrounding lexical environment. This environment contains all the variables that were in scope at the time the function was defined.

### The Lexical Environment

Every time a function is called, a new execution context is created. This context includes a lexical environment, which is essentially a mapping of variable names to their values. When a function is defined inside another function, the inner function's lexical environment includes a reference to the outer function's lexical environment.

\`\`\`javascript
function outer() {
  const message = "Hello from outer!";
  
  function inner() {
    console.log(message);
  }
  
  return inner;
}

const greet = outer();
greet(); // "Hello from outer!"
\`\`\`

Even though \`outer\` has finished executing, the \`inner\` function still has access to \`message\` because the closure preserves the reference to the outer lexical environment.

### The Scope Chain

When JavaScript looks up a variable, it first checks the current scope. If the variable is not found, it moves up the scope chain to the enclosing scope, and continues until it reaches the global scope. Closures leverage this scope chain to access variables from outer functions.

## Practical Use Cases for Closures

Understanding the theory is important, but the real value comes from knowing when and how to use closures in practice.

### Data Privacy and Encapsulation

One of the most common uses of closures is creating private variables. JavaScript does not have built-in support for private variables in the traditional sense, but closures provide a way to achieve this:

\`\`\`javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  
  return {
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
        return balance;
      }
      throw new Error("Deposit amount must be positive");
    },
    withdraw(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        return balance;
      }
      throw new Error("Invalid withdrawal amount");
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);
console.log(account.getBalance()); // 1000
account.deposit(500);
console.log(account.getBalance()); // 1500
\`\`\`

The \`balance\` variable is completely inaccessible from outside the function. Only the methods returned by \`createBankAccount\` can read or modify it. This is a powerful pattern for data encapsulation.

### Function Factories

Closures allow you to create specialized functions from more general ones:

\`\`\`javascript
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
\`\`\`

This pattern is incredibly useful for creating reusable, configurable functions without repeating code.

### Event Handlers and Callbacks

Closures are extensively used in event-driven programming. When you attach an event handler, the handler function often needs access to variables from the surrounding scope:

\`\`\`javascript
function setupClickCounter(buttonId) {
  let clicks = 0;
  
  const button = document.getElementById(buttonId);
  button.addEventListener('click', function() {
    clicks++;
    console.log("Button clicked " + clicks + " times");
  });
}

setupClickCounter('myButton');
\`\`\`

The event handler maintains access to the \`clicks\` variable through a closure, allowing it to track the number of clicks across multiple invocations.

### Memoization

Closures enable efficient memoization patterns, where you cache the results of expensive function calls:

\`\`\`javascript
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      return cache[key];
    }
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

const expensiveCalculation = memoize(function(n) {
  console.log("Computing...");
  return n * n;
});

expensiveCalculation(4); // "Computing..." -> 16
expensiveCalculation(4); // 16 (cached, no "Computing...")
\`\`\`

## Common Pitfalls with Closures

While closures are powerful, they can lead to unexpected behavior if not understood properly.

### The Classic Loop Problem

One of the most common mistakes involves closures inside loops:

\`\`\`javascript
// This does NOT work as expected
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
// Outputs: 5, 5, 5, 5, 5
\`\`\`

Because \`var\` is function-scoped, all five callbacks share the same \`i\` variable. By the time the callbacks execute, the loop has completed and \`i\` is 5. The solution is to use \`let\`, which is block-scoped:

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
// Outputs: 0, 1, 2, 3, 4
\`\`\`

### Memory Leaks

Closures keep references to their outer scope's variables, which means those variables cannot be garbage collected as long as the closure exists. In large applications, this can lead to memory leaks if closures are not properly managed.

Be mindful of closures that reference large objects or DOM elements. If the closure outlives the usefulness of those references, consider setting them to null when they are no longer needed.

## Closures in Modern JavaScript

Modern JavaScript features like arrow functions, classes, and modules have not diminished the importance of closures. In fact, many modern patterns rely heavily on closures.

React hooks, for example, are built on closures. The \`useState\` hook uses closures to maintain state between renders:

\`\`\`javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(count + 1);
  };
  
  return <button onClick={increment}>{count}</button>;
}
\`\`\`

The \`increment\` function forms a closure over \`count\`, capturing its value at the time of render.

## Summary

Closures are not just a theoretical concept to understand for interviews. They are a practical tool that you use every day in JavaScript development. From data privacy to function factories, from event handlers to modern framework patterns, closures are woven into the fabric of JavaScript.

The key takeaways are: closures capture references to variables, not copies of values. They persist as long as the closure itself is accessible. They enable powerful patterns like encapsulation, memoization, and partial application. Understanding closures deeply will make you a more effective JavaScript developer and help you write cleaner, more maintainable code.`,
  },
  {
    id: "2",
    slug: "python-list-comprehensions-guide",
    title: "Python List Comprehensions: Write Cleaner Code in Less Time",
    excerpt:
      "Transform your Python code with list comprehensions. Learn syntax, best practices, and when to use them over traditional loops.",
    category: "Python",
    tags: ["Python", "List Comprehensions", "Clean Code"],
    author: "Dhethi Team",
    date: "2026-02-12",
    readTime: "7 min read",
    featured: true,
    metaDescription:
      "Master Python list comprehensions with examples. Learn syntax, nested comprehensions, conditional filtering, and performance tips for cleaner Python code.",
    content: `List comprehensions are one of Python's most beloved features. They provide a concise and readable way to create lists, transforming multiple lines of loop-based code into a single expressive line. If you are writing Python without list comprehensions, you are missing out on one of the language's greatest strengths.

## What Are List Comprehensions?

A list comprehension is a compact way to process all or part of the elements in a sequence and return a list with the results. The basic syntax is:

\`\`\`python
new_list = [expression for item in iterable]
\`\`\`

Compare this traditional loop approach:

\`\`\`python
squares = []
for x in range(10):
    squares.append(x ** 2)
\`\`\`

With its list comprehension equivalent:

\`\`\`python
squares = [x ** 2 for x in range(10)]
\`\`\`

Both produce the same result, but the list comprehension is more readable and Pythonic.

## Basic Syntax and Examples

The simplest list comprehension takes each element from an iterable, optionally transforms it, and creates a new list.

### Simple Transformation

\`\`\`python
# Convert temperatures from Celsius to Fahrenheit
celsius = [0, 10, 20, 30, 40]
fahrenheit = [(temp * 9/5) + 32 for temp in celsius]
# [32.0, 50.0, 68.0, 86.0, 104.0]
\`\`\`

### String Operations

\`\`\`python
names = ["alice", "bob", "charlie"]
capitalized = [name.capitalize() for name in names]
# ["Alice", "Bob", "Charlie"]
\`\`\`

### Working with Methods

\`\`\`python
words = ["  hello  ", "  world  ", "  python  "]
cleaned = [word.strip() for word in words]
# ["hello", "world", "python"]
\`\`\`

## Adding Conditions with Filtering

You can add an \`if\` clause to filter elements:

\`\`\`python
new_list = [expression for item in iterable if condition]
\`\`\`

### Filter Even Numbers

\`\`\`python
numbers = range(20)
evens = [n for n in numbers if n % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
\`\`\`

### Filter by String Length

\`\`\`python
words = ["hi", "hello", "hey", "greetings", "yo"]
long_words = [w for w in words if len(w) > 3]
# ["hello", "greetings"]
\`\`\`

### Multiple Conditions

\`\`\`python
numbers = range(100)
special = [n for n in numbers if n % 3 == 0 if n % 5 == 0]
# [0, 15, 30, 45, 60, 75, 90]
\`\`\`

## Conditional Expressions (If-Else)

You can also use if-else expressions in the output portion:

\`\`\`python
numbers = range(10)
labels = ["even" if n % 2 == 0 else "odd" for n in numbers]
# ["even", "odd", "even", "odd", ...]
\`\`\`

Note the difference in placement: filtering \`if\` goes after the \`for\`, while conditional expression \`if-else\` goes before the \`for\`.

## Nested List Comprehensions

You can nest comprehensions to work with multi-dimensional data:

\`\`\`python
# Flatten a 2D list
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [num for row in matrix for num in row]
# [1, 2, 3, 4, 5, 6, 7, 8, 9]
\`\`\`

### Creating a Matrix

\`\`\`python
# Create a 3x3 identity matrix
identity = [[1 if i == j else 0 for j in range(3)] for i in range(3)]
# [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
\`\`\`

### Nested with Conditions

\`\`\`python
# Find all pairs where sum is even
pairs = [(x, y) for x in range(5) for y in range(5) if (x + y) % 2 == 0]
\`\`\`

## Dictionary and Set Comprehensions

The comprehension syntax extends beyond lists:

### Dictionary Comprehension

\`\`\`python
words = ["hello", "world", "python"]
word_lengths = {word: len(word) for word in words}
# {"hello": 5, "world": 5, "python": 6}
\`\`\`

### Set Comprehension

\`\`\`python
sentence = "hello world hello python world"
unique_lengths = {len(word) for word in sentence.split()}
# {5, 6}
\`\`\`

## Generator Expressions

For large datasets, use generator expressions (with parentheses instead of brackets) to save memory:

\`\`\`python
# Generator expression - lazy evaluation
sum_of_squares = sum(x ** 2 for x in range(1000000))
\`\`\`

Generators compute values on-the-fly instead of storing the entire list in memory. This is crucial when working with large datasets.

## Performance Considerations

List comprehensions are generally faster than equivalent for loops because they are optimized at the C level in CPython. However, there are important considerations:

### When Comprehensions Are Faster

\`\`\`python
import timeit

# List comprehension
time1 = timeit.timeit('[x**2 for x in range(1000)]', number=10000)

# Traditional loop
time2 = timeit.timeit('''
result = []
for x in range(1000):
    result.append(x**2)
''', number=10000)

# Comprehension is typically 20-30% faster
\`\`\`

### When to Avoid Comprehensions

Do not use comprehensions when the logic is complex, when you need error handling inside the loop, or when the comprehension would span multiple lines and become unreadable. Readability should always take precedence over cleverness.

\`\`\`python
# Bad: Too complex
result = [transform(x) for x in data if validate(x) and process(x) or fallback(x)]

# Good: Use a regular loop
result = []
for x in data:
    if validate(x) and process(x):
        result.append(transform(x))
    elif fallback(x):
        result.append(transform(x))
\`\`\`

## Real-World Examples

### Processing CSV Data

\`\`\`python
import csv

with open('data.csv') as f:
    reader = csv.reader(f)
    headers = next(reader)
    data = [dict(zip(headers, row)) for row in reader]
\`\`\`

### File Processing

\`\`\`python
# Read non-empty lines from a file
with open('log.txt') as f:
    lines = [line.strip() for line in f if line.strip()]
\`\`\`

### API Response Processing

\`\`\`python
users = [
    {"name": user["name"], "email": user["email"]}
    for user in api_response["data"]
    if user["active"]
]
\`\`\`

## Best Practices

Here are guidelines for using list comprehensions effectively:

First, keep them simple. If a comprehension needs more than two lines, use a regular loop. Second, use meaningful variable names even in comprehensions. Third, prefer generator expressions for large datasets. Fourth, do not nest more than two levels deep. Fifth, add comments for non-obvious comprehensions.

## Common Patterns

### Enumerate with Comprehension

\`\`\`python
indexed = [(i, val) for i, val in enumerate(my_list)]
\`\`\`

### Zip with Comprehension

\`\`\`python
combined = [f"{name}: {score}" for name, score in zip(names, scores)]
\`\`\`

### Walrus Operator (Python 3.8+)

\`\`\`python
results = [y for x in data if (y := expensive_function(x)) is not None]
\`\`\`

## Summary

List comprehensions are a cornerstone of Pythonic code. They make your code more readable, often more performant, and more expressive. Start with simple transformations and filtering, then gradually incorporate more advanced patterns as you become comfortable. Remember that clarity always trumps brevity. A well-written loop is better than an unreadable comprehension.`,
  },
  {
    id: "3",
    slug: "css-grid-layout-complete-tutorial",
    title: "CSS Grid Layout: The Complete Tutorial You Need in 2026",
    excerpt:
      "Stop struggling with layouts. Learn CSS Grid from scratch with practical examples and build complex layouts with ease.",
    category: "Web Development",
    tags: ["CSS", "Grid", "Layout", "Web Development"],
    author: "Dhethi Team",
    date: "2026-02-10",
    readTime: "10 min read",
    featured: true,
    metaDescription:
      "Complete CSS Grid tutorial with practical examples. Learn grid containers, grid items, template areas, responsive layouts, and advanced techniques.",
    content: `CSS Grid Layout is the most powerful layout system available in CSS. It is a two-dimensional system, meaning it can handle both columns and rows, unlike Flexbox which is largely a one-dimensional system. If you have been relying solely on Flexbox for your layouts, it is time to add Grid to your toolkit.

## Why CSS Grid?

Before Grid, creating complex web layouts required hacks with floats, positioning, tables, and eventually Flexbox. While Flexbox excels at one-dimensional layouts (a row or a column), Grid was designed from the ground up to handle two-dimensional layouts where you need to control both rows and columns simultaneously.

Grid does not replace Flexbox. They complement each other. Use Flexbox for component-level layouts and Grid for page-level layouts, though this is not a strict rule.

## Getting Started with Grid

To create a grid container, apply \`display: grid\` to the parent element:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px;
  gap: 10px;
}
\`\`\`

This creates a 3-column, 2-row grid with fixed sizes and a 10px gap between cells.

### The fr Unit

The \`fr\` (fraction) unit is unique to Grid. It represents a fraction of the available space:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
}
\`\`\`

This creates three columns where the middle column is twice as wide as the side columns.

### The repeat() Function

For repetitive patterns, use \`repeat()\`:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
\`\`\`

This creates four equal-width columns.

## Grid Template Areas

One of Grid's most intuitive features is template areas, which let you name regions of your grid:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr 40px;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
\`\`\`

This creates a classic layout with a header spanning the full width, a sidebar and main content area in the middle, and a full-width footer.

## Placing Grid Items

You can explicitly place items on the grid using line numbers:

\`\`\`css
.item {
  grid-column: 1 / 3;  /* Spans from line 1 to line 3 */
  grid-row: 1 / 2;     /* Spans from line 1 to line 2 */
}
\`\`\`

### Spanning Multiple Cells

\`\`\`css
.featured {
  grid-column: span 2;  /* Spans 2 columns */
  grid-row: span 2;     /* Spans 2 rows */
}
\`\`\`

## Responsive Grid with auto-fill and auto-fit

The real power of Grid for responsive design comes from \`auto-fill\` and \`auto-fit\` combined with \`minmax()\`:

\`\`\`css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
\`\`\`

This creates a responsive grid where each column is at least 250px wide. As the viewport shrinks, columns automatically wrap to the next row. No media queries needed.

### auto-fill vs auto-fit

The difference is subtle but important. \`auto-fill\` creates as many tracks as possible, even if they are empty. \`auto-fit\` collapses empty tracks, allowing items to stretch to fill the available space.

\`\`\`css
/* auto-fill: may leave empty columns */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

/* auto-fit: items stretch to fill space */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
\`\`\`

## Alignment in Grid

Grid provides comprehensive alignment controls:

### Align Items (Vertical)

\`\`\`css
.container {
  align-items: start;    /* Top of cell */
  align-items: center;   /* Center of cell */
  align-items: end;      /* Bottom of cell */
  align-items: stretch;  /* Fill cell height (default) */
}
\`\`\`

### Justify Items (Horizontal)

\`\`\`css
.container {
  justify-items: start;
  justify-items: center;
  justify-items: end;
  justify-items: stretch;
}
\`\`\`

### Place Items (Shorthand)

\`\`\`css
.container {
  place-items: center; /* Centers both vertically and horizontally */
}
\`\`\`

### Align and Justify Content

When the grid is smaller than its container:

\`\`\`css
.container {
  justify-content: space-between;
  align-content: center;
}
\`\`\`

## Advanced Grid Techniques

### Implicit Grid

When items are placed outside the explicit grid, the browser creates implicit tracks:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto);
}
\`\`\`

\`grid-auto-rows\` controls the size of implicitly created rows.

### Dense Packing

By default, Grid places items in order, which can leave gaps. Use \`grid-auto-flow: dense\` to fill gaps:

\`\`\`css
.masonry-like {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: dense;
}
\`\`\`

### Subgrid

Subgrid allows nested grids to inherit the parent grid's track sizing:

\`\`\`css
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.child {
  grid-column: span 3;
  display: grid;
  grid-template-columns: subgrid;
}
\`\`\`

## Building a Real Layout

Let us build a complete blog layout using Grid:

\`\`\`css
.blog-layout {
  display: grid;
  grid-template-columns: 1fr min(65ch, 100%) 1fr;
  row-gap: 2rem;
}

.blog-layout > * {
  grid-column: 2;
}

.blog-layout .full-width {
  grid-column: 1 / -1;
}
\`\`\`

This centers content at a readable width while allowing certain elements to break out to full width.

### Responsive Card Grid

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 24px;
}

.card-grid .featured-card {
  grid-column: span 2;
  grid-row: span 2;
}

@media (max-width: 640px) {
  .card-grid .featured-card {
    grid-column: span 1;
    grid-row: span 1;
  }
}
\`\`\`

## Grid vs Flexbox: When to Use What

Use Grid when you need to control layout in two dimensions, when you have a complex layout structure, when you want items to align across both rows and columns, or when using template areas makes the layout clearer.

Use Flexbox when you need to distribute items along a single axis, when you want items to wrap naturally, for navigation bars and toolbars, or for centering a single item.

Often the best approach combines both: Grid for the overall page layout and Flexbox for the components within grid cells.

## Browser Support and Progressive Enhancement

CSS Grid is supported in all modern browsers. For older browsers, consider using \`@supports\`:

\`\`\`css
.container {
  display: flex;
  flex-wrap: wrap;
}

@supports (display: grid) {
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
\`\`\`

## Summary

CSS Grid is an essential tool for modern web development. Its two-dimensional nature, combined with powerful features like template areas, auto-fill, and minmax, makes complex layouts achievable with minimal code. Start with simple grids and progressively incorporate advanced features as you become more comfortable. The key is practice. Take an existing layout and rebuild it with Grid to see the difference firsthand.`,
  },
  {
    id: "4",
    slug: "git-branching-strategies-teams",
    title: "Git Branching Strategies Every Development Team Should Know",
    excerpt:
      "Choose the right Git workflow for your team. Compare Git Flow, GitHub Flow, and trunk-based development with pros and cons.",
    category: "DevOps",
    tags: ["Git", "Version Control", "DevOps", "Team Workflow"],
    author: "Dhethi Team",
    date: "2026-02-08",
    readTime: "9 min read",
    featured: false,
    metaDescription:
      "Compare Git branching strategies: Git Flow, GitHub Flow, and trunk-based development. Learn which workflow suits your team size and release cycle.",
    content: `Choosing the right Git branching strategy can make or break your team's productivity. A good strategy provides structure without bureaucracy, enables parallel development, and makes releases predictable. A poor choice leads to merge conflicts, deployment bottlenecks, and frustrated developers.

## Why Branching Strategies Matter

Without a defined branching strategy, teams often fall into chaos. Developers create branches with inconsistent naming. Merges become painful. Nobody knows which branch represents the latest stable code. Deployments become risky because it is unclear what code is going where.

A branching strategy provides answers to critical questions: Where does new development happen? How do we handle releases? What happens when a critical bug is found in production? How do we review code before it reaches users?

## Git Flow

Git Flow, introduced by Vincent Driessen in 2010, is one of the most well-known branching models. It uses two main branches and three types of supporting branches.

### Main Branches

The \`main\` branch (sometimes called \`master\`) always reflects the production-ready state. Every commit on main represents a release.

The \`develop\` branch serves as an integration branch for features. It contains the latest development changes for the next release.

### Supporting Branches

Feature branches are created from \`develop\` and merged back into \`develop\`. They contain the work for a specific feature or user story:

\`\`\`bash
git checkout develop
git checkout -b feature/user-authentication
# ... work on the feature ...
git checkout develop
git merge --no-ff feature/user-authentication
git branch -d feature/user-authentication
\`\`\`

Release branches are created from \`develop\` when you are ready to prepare a release. They allow last-minute fixes and version bumping:

\`\`\`bash
git checkout develop
git checkout -b release/1.2.0
# ... fix bugs, update version numbers ...
git checkout main
git merge --no-ff release/1.2.0
git tag -a v1.2.0
git checkout develop
git merge --no-ff release/1.2.0
\`\`\`

Hotfix branches are created from \`main\` to quickly fix production issues:

\`\`\`bash
git checkout main
git checkout -b hotfix/critical-security-fix
# ... fix the issue ...
git checkout main
git merge --no-ff hotfix/critical-security-fix
git tag -a v1.2.1
git checkout develop
git merge --no-ff hotfix/critical-security-fix
\`\`\`

### Pros of Git Flow

Git Flow provides clear separation between development, staging, and production code. It supports parallel development of multiple features. It handles hotfixes elegantly without disrupting ongoing development. It is well-suited for projects with scheduled releases.

### Cons of Git Flow

The complexity can be overwhelming for small teams. The develop branch can become a bottleneck. Long-lived feature branches increase merge conflict risk. It is overkill for projects that deploy continuously.

## GitHub Flow

GitHub Flow is a simpler alternative designed for teams that deploy frequently. It has a single rule: anything in the \`main\` branch is always deployable.

### The Workflow

The entire workflow consists of six steps:

1. Create a branch from \`main\`
2. Add commits to your branch
3. Open a pull request
4. Discuss and review code
5. Deploy and test (optionally deploy from the branch)
6. Merge to \`main\`

\`\`\`bash
git checkout main
git checkout -b add-search-feature
# ... make changes, commit ...
git push origin add-search-feature
# Open a pull request on GitHub
# After review and approval:
git checkout main
git merge add-search-feature
git push origin main
# Deploy
\`\`\`

### Pros of GitHub Flow

It is simple to understand and follow. It encourages frequent integration and deployment. Pull requests provide natural code review opportunities. It works well with continuous deployment pipelines.

### Cons of GitHub Flow

It does not handle multiple environments well (staging, production). There is no explicit concept of releases. It can be risky if the team does not have good automated testing. It assumes main is always deployable, which requires discipline.

## Trunk-Based Development

Trunk-based development takes simplicity to the extreme. All developers work on a single branch (the trunk, usually \`main\`), committing small, frequent changes.

### How It Works

Developers either commit directly to the trunk or use very short-lived branches (lasting hours, not days):

\`\`\`bash
# Direct trunk commit
git checkout main
git pull
# ... make small, complete change ...
git commit -m "Add validation to email field"
git push

# Or with a short-lived branch
git checkout main
git checkout -b short-lived/email-validation
# ... work for a few hours ...
git checkout main
git merge short-lived/email-validation
git push
\`\`\`

### Feature Flags

Trunk-based development relies heavily on feature flags to manage incomplete features:

\`\`\`javascript
if (featureFlags.isEnabled('new-search')) {
  return <NewSearchComponent />;
} else {
  return <OldSearchComponent />;
}
\`\`\`

This allows you to merge incomplete code to the trunk without exposing it to users.

### Pros of Trunk-Based Development

It eliminates merge conflicts almost entirely. It encourages small, incremental changes. It supports continuous integration naturally. It reduces the complexity of the branching model. Google, Facebook, and other large companies use this approach successfully.

### Cons of Trunk-Based Development

It requires mature CI/CD practices and extensive automated testing. Feature flags add complexity to the codebase. It can be scary for teams not used to committing to main frequently. It requires developer discipline to keep changes small and complete.

## Choosing the Right Strategy

The best strategy depends on your team's context:

For small teams (1-5 developers) with continuous deployment, GitHub Flow or trunk-based development works well. The simplicity reduces overhead and keeps things moving fast.

For medium teams (5-20 developers) with scheduled releases, Git Flow provides the structure needed to coordinate multiple features and manage releases. GitHub Flow with release tags can also work.

For large teams (20+ developers) with continuous deployment, trunk-based development with feature flags is often the best choice, as demonstrated by major tech companies.

For open-source projects, Git Flow or GitHub Flow with fork-based contributions provides the control needed when working with external contributors.

## Practical Tips

Regardless of which strategy you choose, follow these practices: keep branches short-lived, write meaningful commit messages, use pull requests for code review, automate your CI/CD pipeline, document your chosen strategy, and be willing to evolve your approach as your team grows.

## Summary

There is no universally best branching strategy. The right choice depends on your team size, deployment frequency, and release requirements. Start simple with GitHub Flow, adopt Git Flow if you need release management, and consider trunk-based development as your team and CI/CD pipeline mature. The goal is to enable your team to deliver quality code efficiently, not to follow a rigid process.`,
  },
  {
    id: "5",
    slug: "react-hooks-complete-reference",
    title: "React Hooks Complete Reference: useState, useEffect, and Beyond",
    excerpt:
      "The definitive guide to React Hooks. Learn every built-in hook with practical examples and common patterns.",
    category: "React",
    tags: ["React", "Hooks", "JavaScript", "Frontend"],
    author: "Dhethi Team",
    date: "2026-02-05",
    readTime: "12 min read",
    featured: false,
    metaDescription:
      "Complete React Hooks guide covering useState, useEffect, useContext, useReducer, useMemo, useCallback, and custom hooks with practical examples.",
    content: `React Hooks revolutionized how we write React components. Introduced in React 16.8, they allow you to use state and other React features in functional components, eliminating the need for class components in most cases. This guide covers every built-in hook with practical examples.

## useState: Managing Component State

\`useState\` is the most fundamental hook. It lets you add state variables to functional components:

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
\`\`\`

### Key Points About useState

The argument to \`useState\` is the initial state value. It returns an array with the current state and a setter function. The setter function replaces the state entirely, it does not merge like \`this.setState\` in class components.

### Updating State Based on Previous State

When the new state depends on the previous state, use the functional form of the setter:

\`\`\`jsx
setCount(prevCount => prevCount + 1);
\`\`\`

This is important because state updates may be batched, and the functional form ensures you are always working with the latest state.

### State with Objects

\`\`\`jsx
const [user, setUser] = useState({ name: '', email: '' });

// Always spread existing state when updating objects
setUser(prev => ({ ...prev, name: 'John' }));
\`\`\`

### Lazy Initialization

If the initial state is expensive to compute, pass a function:

\`\`\`jsx
const [data, setData] = useState(() => {
  return expensiveComputation();
});
\`\`\`

The function runs only on the first render.

## useEffect: Side Effects

\`useEffect\` handles side effects in functional components: data fetching, subscriptions, DOM manipulation, and more.

\`\`\`jsx
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(\`/api/users/\${userId}\`);
      const data = await response.json();
      setUser(data);
    }
    fetchUser();
  }, [userId]);

  if (!user) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}
\`\`\`

### The Dependency Array

The second argument to \`useEffect\` is the dependency array:

- No array: effect runs after every render
- Empty array \`[]\`: effect runs only once, after the first render
- With dependencies \`[a, b]\`: effect runs when \`a\` or \`b\` changes

\`\`\`jsx
// Runs once
useEffect(() => {
  console.log('Component mounted');
}, []);

// Runs when count changes
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);
\`\`\`

### Cleanup Functions

Return a function from \`useEffect\` to clean up:

\`\`\`jsx
useEffect(() => {
  const subscription = dataSource.subscribe(handleData);
  
  return () => {
    subscription.unsubscribe();
  };
}, [dataSource]);
\`\`\`

The cleanup runs before the effect re-runs and when the component unmounts.

## useContext: Consuming Context

\`useContext\` provides a way to pass data through the component tree without prop drilling:

\`\`\`jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light');

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button
      style={{ background: theme === 'dark' ? '#333' : '#fff' }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Toggle Theme
    </button>
  );
}
\`\`\`

## useReducer: Complex State Logic

For complex state logic, \`useReducer\` is often a better choice than \`useState\`:

\`\`\`jsx
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error('Unknown action');
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
\`\`\`

\`useReducer\` is particularly useful when state transitions depend on previous state, when multiple state values are related, or when state logic is complex enough to benefit from being extracted.

## useMemo: Expensive Computations

\`useMemo\` memoizes the result of an expensive computation:

\`\`\`jsx
import { useMemo } from 'react';

function ProductList({ products, filter }) {
  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  return (
    <ul>
      {filteredProducts.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

Only use \`useMemo\` when the computation is genuinely expensive. Premature memoization adds complexity without benefit.

## useCallback: Memoizing Functions

\`useCallback\` returns a memoized version of a callback function:

\`\`\`jsx
import { useCallback } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(() => {
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
\`\`\`

\`useCallback\` is primarily useful when passing callbacks to child components that rely on reference equality to prevent unnecessary re-renders.

## useRef: Mutable References

\`useRef\` creates a mutable reference that persists across renders:

\`\`\`jsx
import { useRef, useEffect } from 'react';

function TextInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} />;
}
\`\`\`

\`useRef\` is also useful for storing previous values or any mutable value that should not trigger a re-render when changed.

## Custom Hooks

Custom hooks let you extract and reuse stateful logic:

\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  return <button onClick={() => setTheme('dark')}>Switch to Dark</button>;
}
\`\`\`

### Rules for Custom Hooks

Custom hooks must start with \`use\`. They can call other hooks. They share logic, not state. Each call to a custom hook gets its own isolated state.

## Hook Rules

Two rules must be followed: only call hooks at the top level of your component or custom hook (never inside loops, conditions, or nested functions), and only call hooks from React function components or custom hooks.

## Summary

React Hooks provide a powerful, composable way to manage state and side effects in functional components. Start with \`useState\` and \`useEffect\`, and gradually incorporate other hooks as your needs grow. Custom hooks are the key to building reusable, testable logic. Understanding hooks deeply will make you a more effective React developer and enable you to write cleaner, more maintainable code.`,
  },
  {
    id: "6",
    slug: "binary-search-algorithm-explained",
    title:
      "Binary Search Algorithm Explained with Examples in Multiple Languages",
    excerpt:
      "Learn the binary search algorithm step by step. Understand time complexity, variations, and implement it in JavaScript, Python, and Java.",
    category: "Data Structures",
    tags: ["Algorithms", "Binary Search", "Data Structures", "Interview Prep"],
    author: "Dhethi Team",
    date: "2026-02-02",
    readTime: "8 min read",
    featured: false,
    metaDescription:
      "Master binary search algorithm with step-by-step explanation. Implementations in JavaScript, Python, and Java with time complexity analysis.",
    content: `Binary search is one of the most fundamental algorithms in computer science. It is elegant, efficient, and appears everywhere, from searching in databases to finding bugs in code through bisection. Every developer should understand it thoroughly, not just for interviews, but for everyday problem-solving.

## What Is Binary Search?

Binary search is an efficient algorithm for finding a target value within a sorted array. Instead of checking every element (linear search), binary search repeatedly divides the search interval in half.

The basic idea is simple: compare the target with the middle element. If the target equals the middle element, you found it. If the target is less than the middle element, search the left half. If it is greater, search the right half.

## How Binary Search Works

Let us walk through an example. Consider searching for 23 in this sorted array:

\`\`\`
[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
\`\`\`

Step 1: low = 0, high = 9, mid = 4. Array[4] = 16. Since 23 > 16, search the right half.

Step 2: low = 5, high = 9, mid = 7. Array[7] = 56. Since 23 < 56, search the left half.

Step 3: low = 5, high = 6, mid = 5. Array[5] = 23. Found it.

We found the target in 3 steps instead of 6 with linear search. For larger arrays, the difference is dramatic.

## Time Complexity

Binary search has a time complexity of O(log n), where n is the number of elements. This is because we halve the search space with each step.

To put this in perspective:
- An array of 1,000 elements: at most 10 comparisons
- An array of 1,000,000 elements: at most 20 comparisons
- An array of 1,000,000,000 elements: at most 30 comparisons

Compare this with linear search's O(n), where you might need to check every element. Binary search's logarithmic complexity makes it incredibly efficient for large datasets.

## Implementation in JavaScript

\`\`\`javascript
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1; // Target not found
}

// Usage
const numbers = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
console.log(binarySearch(numbers, 23)); // 5
console.log(binarySearch(numbers, 50)); // -1
\`\`\`

## Implementation in Python

\`\`\`python
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1

# Usage
numbers = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(binary_search(numbers, 23))  # 5
\`\`\`

## Implementation in Java

\`\`\`java
public static int binarySearch(int[] arr, int target) {
    int low = 0;
    int high = arr.length - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
}
\`\`\`

Note the use of \`low + (high - low) / 2\` instead of \`(low + high) / 2\` to prevent integer overflow in Java.

## Recursive Implementation

Binary search can also be implemented recursively:

\`\`\`javascript
function binarySearchRecursive(arr, target, low = 0, high = arr.length - 1) {
  if (low > high) return -1;

  const mid = Math.floor((low + high) / 2);

  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, high);
  return binarySearchRecursive(arr, target, low, mid - 1);
}
\`\`\`

The iterative version is generally preferred because it avoids the overhead of function calls and potential stack overflow with very large arrays.

## Common Variations

### Find First Occurrence

When there are duplicate values, find the first occurrence:

\`\`\`javascript
function findFirst(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  let result = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    if (arr[mid] === target) {
      result = mid;
      high = mid - 1; // Continue searching left
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return result;
}
\`\`\`

### Find Insert Position

Find where a value should be inserted to maintain sorted order:

\`\`\`javascript
function findInsertPosition(arr, target) {
  let low = 0;
  let high = arr.length;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    
    if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}
\`\`\`

### Search in Rotated Sorted Array

A classic interview problem. The array was sorted but then rotated:

\`\`\`javascript
function searchRotated(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    if (arr[mid] === target) return mid;

    if (arr[low] <= arr[mid]) {
      if (target >= arr[low] && target < arr[mid]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    } else {
      if (target > arr[mid] && target <= arr[high]) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  }

  return -1;
}
\`\`\`

## Common Mistakes

The most common mistakes with binary search are off-by-one errors in the loop condition and mid calculation, forgetting that the array must be sorted, and using \`(low + high) / 2\` which can overflow in languages with fixed-size integers.

## Real-World Applications

Binary search is used in database indexing (B-trees are based on binary search principles), debugging (git bisect uses binary search to find the commit that introduced a bug), finding values in sorted collections, search autocomplete suggestions, and numerical methods like the bisection method for finding roots.

## Summary

Binary search is a must-know algorithm. Its O(log n) efficiency makes it indispensable for working with sorted data. Practice implementing it from scratch, understand the variations, and learn to recognize problems where binary search applies. It appears frequently in coding interviews and real-world applications alike.`,
  },
  {
    id: "7",
    slug: "docker-containers-beginners-guide",
    title:
      "Docker Containers for Beginners: Everything You Need to Get Started",
    excerpt:
      "New to Docker? This beginner-friendly guide covers containers, images, Dockerfiles, and essential commands to containerize your first application.",
    category: "DevOps",
    tags: ["Docker", "Containers", "DevOps", "Deployment"],
    author: "Dhethi Team",
    date: "2026-01-30",
    readTime: "11 min read",
    featured: false,
    metaDescription:
      "Beginner-friendly Docker tutorial covering containers, images, Dockerfiles, volumes, networking, and Docker Compose with practical examples.",
    content: `Docker has fundamentally changed how we build, ship, and run applications. If you are a developer who has heard about Docker but never used it, or if you have used it casually without fully understanding it, this guide is for you.

## What Is Docker?

Docker is a platform that enables you to package an application along with all its dependencies into a standardized unit called a container. A container includes everything the application needs to run: the code, runtime, system tools, libraries, and settings.

Think of it like a shipping container in the real world. Just as shipping containers standardized the transport of goods regardless of what is inside them, Docker containers standardize the deployment of applications regardless of their technology stack.

## Containers vs Virtual Machines

The key difference is that containers share the host operating system's kernel, while virtual machines include a full OS. This makes containers significantly lighter: they start in seconds (not minutes), use less memory, and allow you to run many more instances on the same hardware.

A virtual machine might be 1-2 GB in size and take a minute to start. A container might be 50-200 MB and start in under a second.

## Core Concepts

### Images

An image is a read-only template that contains the instructions for creating a container. Think of it as a blueprint or recipe. You build images from a Dockerfile, and you can share them through registries like Docker Hub.

### Containers

A container is a running instance of an image. You can create, start, stop, move, and delete containers. Each container is isolated from other containers and from the host machine.

### Dockerfile

A Dockerfile is a text file that contains the instructions for building an image:

\`\`\`dockerfile
# Start with a base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose the port
EXPOSE 3000

# Define the command to run
CMD ["npm", "start"]
\`\`\`

### Docker Hub

Docker Hub is a cloud-based registry where you can find and share container images. It hosts thousands of official images for popular software like Node.js, Python, PostgreSQL, Redis, and more.

## Installing Docker

Docker Desktop is available for Windows, macOS, and Linux. Download it from the official Docker website and follow the installation instructions. After installation, verify it works:

\`\`\`bash
docker --version
docker run hello-world
\`\`\`

## Essential Docker Commands

### Working with Images

\`\`\`bash
# Pull an image from Docker Hub
docker pull node:18-alpine

# List all images
docker images

# Remove an image
docker rmi node:18-alpine

# Build an image from a Dockerfile
docker build -t my-app:latest .
\`\`\`

### Working with Containers

\`\`\`bash
# Run a container
docker run -d -p 3000:3000 --name my-app my-app:latest

# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop a container
docker stop my-app

# Start a stopped container
docker start my-app

# Remove a container
docker rm my-app

# View container logs
docker logs my-app

# Execute a command inside a running container
docker exec -it my-app sh
\`\`\`

## Building Your First Docker Image

Let us containerize a simple Node.js application.

### The Application

Create a simple Express server in \`index.js\`:

\`\`\`javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Docker!' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

### The Dockerfile

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["node", "index.js"]
\`\`\`

### Build and Run

\`\`\`bash
docker build -t my-node-app .
docker run -d -p 3000:3000 my-node-app
\`\`\`

Visit http://localhost:3000 to see your containerized application running.

## Docker Volumes

Containers are ephemeral. When a container is removed, its data is lost. Volumes solve this by providing persistent storage:

\`\`\`bash
# Create a named volume
docker volume create my-data

# Run a container with a volume
docker run -d -v my-data:/app/data my-app

# Bind mount (map host directory to container)
docker run -d -v $(pwd)/data:/app/data my-app
\`\`\`

Volumes are essential for databases and any application that needs to persist data beyond the container's lifecycle.

## Docker Networking

Docker creates a default network for containers. You can create custom networks to control communication between containers:

\`\`\`bash
# Create a network
docker network create my-network

# Run containers on the same network
docker run -d --network my-network --name db postgres
docker run -d --network my-network --name api my-api

# Containers can reach each other by name
# The API can connect to postgres using "db" as the hostname
\`\`\`

## Docker Compose

Docker Compose allows you to define and run multi-container applications. You define your services in a \`docker-compose.yml\` file:

\`\`\`yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
\`\`\`

Then start everything with:

\`\`\`bash
docker compose up -d
\`\`\`

This starts both the API server and the PostgreSQL database, connected on the same network.

## Best Practices for Dockerfiles

Use official base images and pin specific versions. Use multi-stage builds to reduce image size. Copy dependency files first to leverage build caching. Do not run containers as root. Use .dockerignore to exclude unnecessary files. Keep images small by using Alpine-based images.

### Multi-Stage Build Example

\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
USER node
CMD ["node", "dist/index.js"]
\`\`\`

The final image only contains the built output and production dependencies, resulting in a much smaller image.

## Common Docker Patterns

### Development Environment

\`\`\`yaml
services:
  dev:
    build: .
    volumes:
      - .:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    command: npm run dev
\`\`\`

The volume mount syncs your local code changes into the container.

### Health Checks

\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD curl -f http://localhost:3000/health || exit 1
\`\`\`

## Summary

Docker simplifies the process of building, distributing, and running applications. Start by containerizing a simple application, then explore volumes, networking, and Docker Compose as your needs grow. The investment in learning Docker pays off quickly through easier deployments, consistent environments, and simplified collaboration. Once you start using Docker, you will wonder how you ever worked without it.`,
  },
  {
    id: "8",
    slug: "typescript-generics-practical-guide",
    title: "TypeScript Generics: A Practical Guide with Real-World Examples",
    excerpt:
      "Demystify TypeScript generics. Learn how to write flexible, type-safe code with generic functions, classes, and interfaces.",
    category: "JavaScript",
    tags: ["TypeScript", "Generics", "Type Safety"],
    author: "Dhethi Team",
    date: "2026-01-27",
    readTime: "9 min read",
    featured: false,
    metaDescription:
      "Learn TypeScript generics with practical examples. Master generic functions, interfaces, constraints, and utility types for type-safe, reusable code.",
    content: `TypeScript generics are one of the most powerful features of the type system. They allow you to write code that works with multiple types while maintaining type safety. If you have been avoiding generics because they look intimidating, this guide will help you understand and use them confidently.

## Why Generics?

Consider a function that returns the first element of an array:

\`\`\`typescript
function getFirst(arr: any[]): any {
  return arr[0];
}

const num = getFirst([1, 2, 3]); // type: any
const str = getFirst(['a', 'b', 'c']); // type: any
\`\`\`

Using \`any\` works but loses type information. The return type is always \`any\`, so TypeScript cannot help you catch errors. Generics solve this:

\`\`\`typescript
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const num = getFirst([1, 2, 3]); // type: number
const str = getFirst(['a', 'b', 'c']); // type: string
\`\`\`

Now TypeScript correctly infers the return type based on the input.

## Generic Functions

The \`<T>\` syntax introduces a type parameter. You can name it anything, but \`T\` (for Type) is conventional:

\`\`\`typescript
function identity<T>(value: T): T {
  return value;
}

// TypeScript infers the type
const result = identity(42); // type: number
const text = identity('hello'); // type: string

// Or specify explicitly
const explicit = identity<string>('hello');
\`\`\`

### Multiple Type Parameters

Functions can have multiple type parameters:

\`\`\`typescript
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p = pair('hello', 42); // type: [string, number]
\`\`\`

### Generic Arrow Functions

\`\`\`typescript
const getFirst = <T>(arr: T[]): T => arr[0];

// In TSX files, add a trailing comma to avoid JSX ambiguity
const getFirst = <T,>(arr: T[]): T => arr[0];
\`\`\`

## Generic Interfaces

Interfaces can also be generic:

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
}

// The interface adapts to different data types
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: 'John', email: 'john@example.com' },
  status: 200,
  message: 'Success'
};

const productResponse: ApiResponse<Product> = {
  data: { id: 1, title: 'Widget', price: 9.99 },
  status: 200,
  message: 'Success'
};
\`\`\`

## Generic Constraints

Sometimes you need to restrict what types can be used with a generic. Use \`extends\` to add constraints:

\`\`\`typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength('hello'); // OK: strings have length
logLength([1, 2, 3]); // OK: arrays have length
logLength({ length: 10, name: 'test' }); // OK: has length property
// logLength(42); // Error: number doesn't have length
\`\`\`

### The keyof Constraint

A common pattern is constraining a type parameter to be a key of an object:

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'John', age: 30, email: 'john@example.com' };

const name = getProperty(user, 'name'); // type: string
const age = getProperty(user, 'age'); // type: number
// getProperty(user, 'address'); // Error: 'address' is not a key of user
\`\`\`

## Generic Classes

Classes can be generic too:

\`\`\`typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
const num = numberStack.pop(); // type: number | undefined

const stringStack = new Stack<string>();
stringStack.push('hello');
\`\`\`

## Generic Utility Types

TypeScript provides several built-in generic utility types:

### Partial<T>

Makes all properties optional:

\`\`\`typescript
interface User {
  name: string;
  email: string;
  age: number;
}

function updateUser(id: number, updates: Partial<User>): void {
  // Can pass any subset of User properties
}

updateUser(1, { name: 'Jane' }); // OK
updateUser(1, { email: 'jane@example.com', age: 25 }); // OK
\`\`\`

### Pick<T, K> and Omit<T, K>

Select or exclude specific properties:

\`\`\`typescript
type UserPreview = Pick<User, 'name' | 'email'>;
// { name: string; email: string }

type UserWithoutEmail = Omit<User, 'email'>;
// { name: string; age: number }
\`\`\`

### Record<K, T>

Create a type with specific keys and value type:

\`\`\`typescript
type Role = 'admin' | 'user' | 'guest';

const permissions: Record<Role, string[]> = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
};
\`\`\`

## Real-World Patterns

### Generic HTTP Client

\`\`\`typescript
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  return response.json() as Promise<T>;
}

interface User {
  id: number;
  name: string;
}

const users = await fetchData<User[]>('/api/users');
// type: User[]
\`\`\`

### Generic Event Emitter

\`\`\`typescript
type EventMap = {
  userLogin: { userId: string; timestamp: Date };
  pageView: { path: string; referrer: string };
  error: { message: string; code: number };
};

class TypedEventEmitter<T extends Record<string, any>> {
  private handlers: Partial<{ [K in keyof T]: ((data: T[K]) => void)[] }> = {};

  on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event]!.push(handler);
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    this.handlers[event]?.forEach(handler => handler(data));
  }
}

const emitter = new TypedEventEmitter<EventMap>();
emitter.on('userLogin', (data) => {
  // data is typed as { userId: string; timestamp: Date }
  console.log(data.userId);
});
\`\`\`

### Generic React Components

\`\`\`typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage with type inference
<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
  keyExtractor={(user) => user.id.toString()}
/>
\`\`\`

## Conditional Types

Advanced generics can include conditional logic:

\`\`\`typescript
type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<string[]>; // true
type B = IsArray<number>;   // false
\`\`\`

### Infer Keyword

Extract types from within other types:

\`\`\`typescript
type ElementType<T> = T extends (infer U)[] ? U : never;

type A = ElementType<string[]>; // string
type B = ElementType<number[]>; // number
\`\`\`

## Summary

Generics are essential for writing reusable, type-safe TypeScript code. Start with simple generic functions, then progress to interfaces, classes, and constraints. Use built-in utility types like Partial, Pick, and Record to avoid reinventing the wheel. The key insight is that generics let you defer type decisions to the caller while maintaining full type safety throughout your code.`,
  },
  {
    id: "9",
    slug: "rest-api-design-best-practices",
    title: "REST API Design Best Practices: Building APIs Developers Love",
    excerpt:
      "Design REST APIs that are intuitive, consistent, and maintainable. Learn naming conventions, error handling, pagination, and versioning.",
    category: "Web Development",
    tags: ["REST API", "API Design", "Backend", "Web Development"],
    author: "Dhethi Team",
    date: "2026-01-24",
    readTime: "10 min read",
    featured: false,
    metaDescription:
      "Learn REST API design best practices including resource naming, HTTP methods, error handling, pagination, versioning, and authentication patterns.",
    content: `A well-designed REST API is a joy to work with. It is intuitive, consistent, and self-documenting. A poorly designed one causes confusion, bugs, and endless support requests. Whether you are building an API for internal use or public consumption, following established best practices will save you and your consumers significant time and frustration.

## Resource Naming Conventions

Resources are the fundamental concept in REST. They represent the entities your API manages. Use nouns, not verbs, for resource names:

\`\`\`
Good:
GET /users
GET /users/123
GET /users/123/orders

Bad:
GET /getUsers
GET /getUserById/123
POST /createUser
\`\`\`

### Pluralization

Use plural nouns for consistency:

\`\`\`
GET /users         (not /user)
GET /products      (not /product)
GET /categories    (not /category)
\`\`\`

### Nested Resources

Express relationships through nesting, but do not nest more than two levels deep:

\`\`\`
GET /users/123/orders          (orders for user 123)
GET /users/123/orders/456      (order 456 for user 123)

# Too deep - flatten instead
Bad:  GET /users/123/orders/456/items/789
Good: GET /order-items/789
\`\`\`

### Kebab Case

Use kebab-case for multi-word resource names:

\`\`\`
GET /order-items       (not /orderItems or /order_items)
GET /user-profiles     (not /userProfiles)
\`\`\`

## HTTP Methods

Use HTTP methods according to their intended semantics:

### GET - Retrieve Resources

\`\`\`
GET /users              Retrieve all users
GET /users/123          Retrieve user 123
GET /users?role=admin   Retrieve users filtered by role
\`\`\`

GET requests should never modify data. They should be idempotent and safe.

### POST - Create Resources

\`\`\`
POST /users
Body: { "name": "John", "email": "john@example.com" }
Response: 201 Created
\`\`\`

### PUT - Replace Resources

\`\`\`
PUT /users/123
Body: { "name": "John", "email": "john@new-email.com" }
Response: 200 OK
\`\`\`

PUT replaces the entire resource. All fields should be provided.

### PATCH - Partial Update

\`\`\`
PATCH /users/123
Body: { "email": "john@new-email.com" }
Response: 200 OK
\`\`\`

PATCH updates only the specified fields.

### DELETE - Remove Resources

\`\`\`
DELETE /users/123
Response: 204 No Content
\`\`\`

## Status Codes

Use appropriate HTTP status codes to communicate the result of each request:

### Success Codes

- 200 OK: General success for GET, PUT, PATCH
- 201 Created: Resource successfully created (POST)
- 204 No Content: Successful deletion (DELETE)

### Client Error Codes

- 400 Bad Request: Invalid request body or parameters
- 401 Unauthorized: Authentication required
- 403 Forbidden: Authenticated but not authorized
- 404 Not Found: Resource does not exist
- 409 Conflict: Resource conflict (e.g., duplicate email)
- 422 Unprocessable Entity: Valid syntax but semantic errors

### Server Error Codes

- 500 Internal Server Error: Unexpected server failure
- 503 Service Unavailable: Server temporarily unavailable

## Error Handling

Consistent error responses are crucial. Define a standard error format:

\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request body contains invalid data.",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address."
      },
      {
        "field": "age",
        "message": "Must be a positive integer."
      }
    ]
  }
}
\`\`\`

### Error Response Guidelines

Always return a machine-readable error code. Include a human-readable message. Provide field-level details for validation errors. Never expose internal implementation details (stack traces, SQL queries). Use consistent error format across all endpoints.

## Pagination

For endpoints that return collections, always implement pagination:

### Offset-Based Pagination

\`\`\`
GET /users?page=2&limit=20

Response:
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 156,
    "totalPages": 8
  }
}
\`\`\`

### Cursor-Based Pagination

Better for large datasets and real-time data:

\`\`\`
GET /users?cursor=eyJpZCI6MTIzfQ&limit=20

Response:
{
  "data": [...],
  "pagination": {
    "nextCursor": "eyJpZCI6MTQzfQ",
    "hasMore": true
  }
}
\`\`\`

## Filtering, Sorting, and Searching

### Filtering

Use query parameters for filtering:

\`\`\`
GET /products?category=electronics&min_price=100&max_price=500
GET /users?status=active&role=admin
\`\`\`

### Sorting

\`\`\`
GET /products?sort=price&order=asc
GET /products?sort=-price  (prefix with - for descending)
\`\`\`

### Searching

\`\`\`
GET /products?search=wireless+headphones
GET /users?q=john
\`\`\`

## Versioning

APIs evolve. Versioning allows you to make breaking changes without disrupting existing consumers:

### URL Versioning (Recommended)

\`\`\`
GET /v1/users
GET /v2/users
\`\`\`

This is the most common and most visible approach.

### Header Versioning

\`\`\`
GET /users
Accept: application/vnd.myapi.v2+json
\`\`\`

More RESTful but less discoverable.

## Authentication

### Bearer Tokens

The most common approach for APIs:

\`\`\`
GET /users
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
\`\`\`

### API Keys

Simple but less secure than OAuth:

\`\`\`
GET /users
X-API-Key: your-api-key-here
\`\`\`

## Rate Limiting

Protect your API from abuse with rate limiting. Communicate limits through response headers:

\`\`\`
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
\`\`\`

Return 429 Too Many Requests when the limit is exceeded.

## Documentation

Good API documentation includes clear descriptions of every endpoint, request and response examples, authentication instructions, error code reference, rate limiting details, and changelog for version updates.

Tools like OpenAPI (Swagger) help generate interactive documentation from your API specification.

## Summary

A well-designed REST API follows conventions that developers already know. Use proper HTTP methods and status codes. Be consistent with naming, error handling, and pagination. Version your API from day one. Document everything. The effort you invest in API design pays dividends through easier integration, fewer support requests, and happier developers.`,
  },
  {
    id: "10",
    slug: "software-developer-resume-tips",
    title: "How to Write a Software Developer Resume That Gets Interviews",
    excerpt:
      "Land more interviews with a resume that stands out. Learn formatting tips, what to include, and common mistakes to avoid.",
    category: "Career",
    tags: ["Career", "Resume", "Job Search", "Interview"],
    author: "Dhethi Team",
    date: "2026-01-21",
    readTime: "8 min read",
    featured: false,
    metaDescription:
      "Write a software developer resume that lands interviews. Learn formatting tips, quantifying achievements, tailoring for ATS, and avoiding common mistakes.",
    content: `Your resume is often the first impression you make on a potential employer. In the competitive software development job market, a well-crafted resume can be the difference between landing an interview and being overlooked. This guide will help you create a resume that effectively showcases your skills and experience.

## The Foundation: Format and Structure

### Keep It Concise

For most developers, one page is sufficient. Two pages are acceptable if you have ten or more years of experience. Recruiters spend an average of six to seven seconds on an initial resume scan. Make every word count.

### Choose the Right Format

Use a clean, professional format with clear sections. Avoid elaborate designs, graphics, or unusual fonts. Your resume needs to pass through Applicant Tracking Systems (ATS), which often struggle with complex formatting.

A recommended structure is:

1. Contact Information
2. Professional Summary (optional, 2-3 lines)
3. Technical Skills
4. Work Experience
5. Projects (especially for early-career developers)
6. Education

### Use a Simple, Readable Layout

\`\`\`
[Your Name]
[Email] | [Phone] | [LinkedIn] | [GitHub] | [Portfolio]

TECHNICAL SKILLS
Languages: JavaScript, TypeScript, Python, SQL
Frameworks: React, Node.js, Express, Django
Tools: Git, Docker, AWS, PostgreSQL, Redis

EXPERIENCE
Senior Software Engineer | Company Name | Jan 2022 - Present
• Achievement-focused bullet points...
\`\`\`

## Writing Effective Bullet Points

The most important part of your resume is how you describe your experience. Follow the accomplishment formula: Action Verb + What You Did + Quantifiable Result.

### Bad Examples

\`\`\`
• Responsible for the frontend
• Worked on various projects
• Helped the team with code reviews
• Used React and Node.js
\`\`\`

### Good Examples

\`\`\`
• Rebuilt the checkout flow in React, reducing cart abandonment by 23% and 
  increasing monthly revenue by $45,000
• Designed and implemented a caching layer with Redis that reduced API 
  response times from 800ms to 50ms, improving user satisfaction scores by 15%
• Led migration from monolithic architecture to microservices, enabling 
  independent deployments and reducing release cycle from 2 weeks to 2 days
• Mentored 4 junior developers through weekly code reviews and pair 
  programming sessions, resulting in 40% fewer production bugs
\`\`\`

### Quantify Everything

Numbers make your achievements concrete and believable. Include metrics like performance improvements (percentages), revenue impact (dollar amounts), scale (users served, requests handled), time saved (hours per week, deployment frequency), and team contributions (people mentored, code reviewed).

## Technical Skills Section

### Do Not List Everything

Only include technologies you can discuss confidently in an interview. Listing 50 technologies suggests you are a jack of all trades and master of none.

### Organize by Category

\`\`\`
Languages: JavaScript, TypeScript, Python, Go
Frontend: React, Next.js, Tailwind CSS, Redux
Backend: Node.js, Express, FastAPI, GraphQL
Database: PostgreSQL, MongoDB, Redis, Elasticsearch
Cloud/DevOps: AWS (EC2, S3, Lambda), Docker, Kubernetes, CI/CD
Tools: Git, Jira, Figma, Postman
\`\`\`

### Match the Job Description

Tailor your skills section to match the job posting. If the job requires React and TypeScript, make sure those are prominently listed. This helps with ATS keyword matching.

## Projects Section

For early-career developers or career changers, projects can be more impactful than limited work experience.

### What Makes a Good Project

A good portfolio project demonstrates problem-solving ability, uses relevant technologies, has clean code on GitHub, is deployed and accessible, and solves a real problem.

### How to Describe Projects

\`\`\`
Task Management App | React, Node.js, PostgreSQL, AWS
• Built a full-stack task management application with real-time 
  collaboration features using WebSockets
• Implemented role-based access control with JWT authentication, 
  supporting 3 permission levels
• Deployed on AWS with CI/CD pipeline, achieving 99.9% uptime
• GitHub: github.com/yourname/task-app | Live: taskapp.com
\`\`\`

## Education Section

### For Experienced Developers

Keep it brief. Degree, university, and graduation year are sufficient:

\`\`\`
B.S. Computer Science | University Name | 2018
\`\`\`

### For Recent Graduates

Include relevant coursework, GPA if above 3.5, academic projects, and relevant extracurricular activities.

### For Self-Taught Developers

Replace or supplement education with relevant certifications, bootcamp completion, and notable online courses.

## Applicant Tracking Systems

Most companies use ATS to filter resumes before a human sees them. To pass ATS screening: use standard section headings, avoid tables, columns, and graphics, include keywords from the job description, use a common file format (PDF is safest), and do not put important information in headers or footers.

## Common Mistakes to Avoid

Listing responsibilities instead of achievements is the most common mistake. Saying you were "responsible for" something tells nothing about your impact. Using buzzwords without substance is another pitfall. Saying you are a "passionate problem-solver" without evidence is meaningless. Including irrelevant experience, having typos and grammatical errors, using an unprofessional email address, and making the resume too long or too short are all common problems.

## Tailoring Your Resume

The most effective approach is to have a base resume and customize it for each application. Read the job description carefully. Identify the key requirements. Reorder your bullet points to highlight the most relevant experience. Add keywords from the posting to your skills and descriptions. Remove irrelevant details to keep the resume focused.

## The Cover Letter Question

While not always required, a thoughtful cover letter can set you apart, especially for competitive positions. Keep it brief (3-4 paragraphs), specific to the company, and focused on what you can contribute. Never use a generic template.

## Summary

Your resume is a marketing document, not an autobiography. Every line should serve the purpose of getting you an interview. Focus on achievements over responsibilities, quantify your impact, tailor for each application, and keep the format clean and ATS-friendly. Review and update your resume regularly, even when you are not actively job hunting. The best time to update your resume is right after a significant achievement, when the details are fresh.`,
  },
  {
    id: "11",
    slug: "async-await-javascript-complete-guide",
    title:
      "Async/Await in JavaScript: The Complete Guide to Asynchronous Programming",
    excerpt:
      "Master asynchronous JavaScript with async/await. Learn promises, error handling, parallel execution, and common patterns.",
    category: "JavaScript",
    tags: ["JavaScript", "Async", "Promises", "Asynchronous"],
    author: "Dhethi Team",
    date: "2026-01-18",
    readTime: "9 min read",
    featured: false,
    metaDescription:
      "Master async/await in JavaScript. Learn promises, error handling, parallel execution with Promise.all, and best practices for asynchronous code.",
    content: `Asynchronous programming is essential in JavaScript. From fetching data from APIs to reading files, many operations do not complete instantly. Understanding async/await is crucial for writing clean, readable asynchronous code.

## The Evolution of Async JavaScript

Before async/await, JavaScript developers used callbacks and then promises. Each iteration improved readability and error handling.

### Callbacks (The Old Way)

\`\`\`javascript
function fetchUser(id, callback) {
  setTimeout(() => {
    callback(null, { id, name: 'John' });
  }, 1000);
}

function fetchOrders(userId, callback) {
  setTimeout(() => {
    callback(null, [{ id: 1, item: 'Widget' }]);
  }, 1000);
}

// Callback hell
fetchUser(1, (err, user) => {
  if (err) { console.error(err); return; }
  fetchOrders(user.id, (err, orders) => {
    if (err) { console.error(err); return; }
    console.log(user, orders);
  });
});
\`\`\`

### Promises (Better)

\`\`\`javascript
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ id, name: 'John' }), 1000);
  });
}

fetchUser(1)
  .then(user => fetchOrders(user.id))
  .then(orders => console.log(orders))
  .catch(err => console.error(err));
\`\`\`

### Async/Await (Best)

\`\`\`javascript
async function getUserWithOrders(id) {
  try {
    const user = await fetchUser(id);
    const orders = await fetchOrders(user.id);
    console.log(user, orders);
  } catch (err) {
    console.error(err);
  }
}
\`\`\`

## Understanding Promises

Async/await is built on top of promises, so understanding promises is essential.

A promise represents a value that may not be available yet. It can be in one of three states: pending (initial state), fulfilled (operation completed successfully), or rejected (operation failed).

### Creating Promises

\`\`\`javascript
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  
  if (success) {
    resolve('Operation succeeded');
  } else {
    reject(new Error('Operation failed'));
  }
});
\`\`\`

### Consuming Promises

\`\`\`javascript
myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log('Always runs'));
\`\`\`

## The async Keyword

The \`async\` keyword before a function declaration makes it return a promise:

\`\`\`javascript
async function greet() {
  return 'Hello!';
}

// Equivalent to:
function greet() {
  return Promise.resolve('Hello!');
}

greet().then(msg => console.log(msg)); // "Hello!"
\`\`\`

## The await Keyword

\`await\` pauses the execution of an async function until the promise resolves:

\`\`\`javascript
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}
\`\`\`

\`await\` can only be used inside an \`async\` function (or at the top level of a module).

## Error Handling

### Try/Catch

The most straightforward way to handle errors with async/await:

\`\`\`javascript
async function fetchUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error.message);
    throw error; // Re-throw if you want the caller to handle it
  }
}
\`\`\`

### Error Handling Patterns

You can also handle errors at the call site:

\`\`\`javascript
async function main() {
  const user = await fetchUser(1).catch(err => {
    console.error('Error:', err);
    return null;
  });
  
  if (user) {
    console.log(user.name);
  }
}
\`\`\`

### Handling Multiple Errors

\`\`\`javascript
async function processData() {
  try {
    const users = await fetchUsers();
    const orders = await fetchOrders();
    const products = await fetchProducts();
    
    return { users, orders, products };
  } catch (error) {
    if (error instanceof NetworkError) {
      console.error('Network issue:', error.message);
    } else if (error instanceof ValidationError) {
      console.error('Validation issue:', error.message);
    } else {
      throw error; // Unexpected error
    }
  }
}
\`\`\`

## Parallel Execution

### Promise.all

Run multiple async operations in parallel:

\`\`\`javascript
async function fetchDashboardData() {
  const [users, orders, analytics] = await Promise.all([
    fetchUsers(),
    fetchOrders(),
    fetchAnalytics()
  ]);
  
  return { users, orders, analytics };
}
\`\`\`

This is significantly faster than sequential execution because all three requests run simultaneously.

### Promise.allSettled

When you want all results regardless of failures:

\`\`\`javascript
async function fetchMultiple(urls) {
  const results = await Promise.allSettled(
    urls.map(url => fetch(url).then(r => r.json()))
  );
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(\`URL \${index}: Success\`, result.value);
    } else {
      console.log(\`URL \${index}: Failed\`, result.reason);
    }
  });
}
\`\`\`

### Promise.race

Returns the result of the first promise to settle:

\`\`\`javascript
async function fetchWithTimeout(url, timeout = 5000) {
  const fetchPromise = fetch(url);
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timed out')), timeout);
  });
  
  return Promise.race([fetchPromise, timeoutPromise]);
}
\`\`\`

## Common Patterns

### Sequential Processing

\`\`\`javascript
async function processItems(items) {
  const results = [];
  
  for (const item of items) {
    const result = await processItem(item);
    results.push(result);
  }
  
  return results;
}
\`\`\`

### Controlled Concurrency

Process items in batches:

\`\`\`javascript
async function processBatch(items, batchSize = 5) {
  const results = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(item => processItem(item))
    );
    results.push(...batchResults);
  }
  
  return results;
}
\`\`\`

### Retry Logic

\`\`\`javascript
async function fetchWithRetry(url, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
      throw new Error(\`Status: \${response.status}\`);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
}
\`\`\`

## Common Mistakes

### Forgetting await

\`\`\`javascript
// Bug: response is a Promise, not the actual data
async function getData() {
  const response = fetch('/api/data'); // Missing await!
  const data = response.json(); // Error: response.json is not a function
}
\`\`\`

### Unnecessary Sequential Execution

\`\`\`javascript
// Slow: sequential execution
const users = await fetchUsers();
const products = await fetchProducts();

// Fast: parallel execution (when operations are independent)
const [users, products] = await Promise.all([
  fetchUsers(),
  fetchProducts()
]);
\`\`\`

### Using await in forEach

\`\`\`javascript
// Does NOT work as expected
items.forEach(async (item) => {
  await processItem(item); // These run in parallel, not sequentially
});

// Use for...of for sequential processing
for (const item of items) {
  await processItem(item);
}

// Or Promise.all for parallel processing
await Promise.all(items.map(item => processItem(item)));
\`\`\`

## Summary

Async/await transforms asynchronous JavaScript from callback spaghetti into clean, readable code. Master the fundamentals of promises, use try/catch for error handling, leverage Promise.all for parallel execution, and avoid common pitfalls like forgetting await or unnecessary sequential execution. Asynchronous code is at the heart of modern JavaScript. Investing time in understanding these patterns will make you a significantly more effective developer.`,
  },
  {
    id: "12",
    slug: "web-accessibility-developers-checklist",
    title: "Web Accessibility for Developers: A Practical Checklist",
    excerpt:
      "Make your websites accessible to everyone. Learn WCAG guidelines, ARIA attributes, and practical techniques for inclusive web development.",
    category: "Web Development",
    tags: ["Accessibility", "A11y", "WCAG", "HTML"],
    author: "Dhethi Team",
    date: "2026-01-15",
    readTime: "9 min read",
    featured: false,
    metaDescription:
      "Practical web accessibility guide for developers. Learn WCAG guidelines, semantic HTML, ARIA attributes, keyboard navigation, and testing techniques.",
    content: `Web accessibility ensures that websites and applications are usable by everyone, including people with disabilities. Beyond being the right thing to do, accessibility is a legal requirement in many jurisdictions and improves the experience for all users. This guide provides practical, actionable steps to make your web applications accessible.

## Why Accessibility Matters

Approximately 15% of the world's population lives with some form of disability. Visual impairments, hearing loss, motor difficulties, and cognitive disabilities all affect how people interact with the web. Accessible websites reach more users, rank better in search engines, and are generally better designed.

Accessibility is not just about screen readers. It benefits users with temporary injuries, situational limitations (bright sunlight, noisy environment), slow internet connections, and aging-related limitations.

## Semantic HTML: The Foundation

The single most impactful thing you can do for accessibility is use semantic HTML. Semantic elements convey meaning to assistive technologies:

\`\`\`html
<!-- Bad: div soup -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>
<div class="main">
  <div class="article">
    <div class="title">Article Title</div>
  </div>
</div>

<!-- Good: semantic HTML -->
<header>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>
<main>
  <article>
    <h1>Article Title</h1>
  </article>
</main>
\`\`\`

### Key Semantic Elements

Use \`header\`, \`nav\`, \`main\`, \`article\`, \`section\`, \`aside\`, and \`footer\` to define page structure. Use \`h1\` through \`h6\` for headings in proper hierarchical order. Use \`button\` for clickable actions and \`a\` for navigation. Use \`ul\`, \`ol\`, and \`li\` for lists. Use \`table\`, \`th\`, and \`td\` for tabular data.

## Heading Hierarchy

Headings provide structure and navigation for screen reader users. They should follow a logical hierarchy:

\`\`\`html
<h1>Page Title</h1>
  <h2>Section One</h2>
    <h3>Subsection</h3>
  <h2>Section Two</h2>
    <h3>Subsection</h3>
    <h3>Another Subsection</h3>
\`\`\`

Never skip heading levels (h1 to h3 without h2). Never use headings for styling purposes. Every page should have exactly one h1.

## Images and Alt Text

Every image needs an \`alt\` attribute. The content depends on the image's purpose:

### Informative Images

\`\`\`html
<img src="chart.png" alt="Bar chart showing Q4 revenue increased 23% year-over-year">
\`\`\`

### Decorative Images

\`\`\`html
<img src="decorative-border.png" alt="">
\`\`\`

Use an empty alt attribute for decorative images. This tells screen readers to skip them.

### Complex Images

For complex images like charts or infographics, provide a detailed description:

\`\`\`html
<figure>
  <img src="architecture.png" alt="System architecture diagram">
  <figcaption>
    The system uses a microservices architecture with three main services: 
    user management, order processing, and notification. All services 
    communicate through a message queue.
  </figcaption>
</figure>
\`\`\`

## Keyboard Navigation

Many users navigate with keyboards. Ensure all interactive elements are keyboard accessible:

### Focus Management

\`\`\`css
/* Never remove focus outlines without providing an alternative */
/* Bad */
*:focus { outline: none; }

/* Good: Custom focus styles */
*:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
\`\`\`

### Tab Order

Interactive elements should follow a logical tab order. Use \`tabindex="0"\` to add custom elements to the tab order, and \`tabindex="-1"\` to make elements programmatically focusable but not in the tab order.

\`\`\`html
<!-- Avoid positive tabindex values -->
<!-- Bad -->
<input tabindex="3">
<input tabindex="1">
<input tabindex="2">

<!-- Good: natural DOM order -->
<input>
<input>
<input>
\`\`\`

### Keyboard Event Handlers

If you add click handlers to non-interactive elements, also handle keyboard events:

\`\`\`javascript
// Bad: only handles mouse clicks
<div onClick={handleAction}>Do something</div>

// Good: use a button
<button onClick={handleAction}>Do something</button>

// If you must use a div (rare), add keyboard support
<div 
  role="button" 
  tabIndex={0} 
  onClick={handleAction}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAction();
    }
  }}
>
  Do something
</div>
\`\`\`

## ARIA Attributes

ARIA (Accessible Rich Internet Applications) attributes enhance accessibility for dynamic content and custom widgets. However, the first rule of ARIA is: do not use ARIA if you can use native HTML.

### Common ARIA Attributes

\`\`\`html
<!-- Labels -->
<input aria-label="Search articles">
<input aria-labelledby="search-heading">

<!-- Descriptions -->
<input aria-describedby="password-requirements">
<p id="password-requirements">Must be at least 8 characters</p>

<!-- States -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
<nav id="menu" aria-hidden="true">...</nav>

<!-- Live regions -->
<div aria-live="polite" aria-atomic="true">
  3 items in your cart
</div>
\`\`\`

### ARIA Roles

\`\`\`html
<div role="alert">Form submitted successfully!</div>
<div role="dialog" aria-labelledby="dialog-title">...</div>
<div role="tablist">
  <button role="tab" aria-selected="true">Tab 1</button>
  <button role="tab" aria-selected="false">Tab 2</button>
</div>
\`\`\`

## Color and Contrast

### Minimum Contrast Ratios

WCAG 2.1 requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (18px or 14px bold). Use tools like the WebAIM Contrast Checker to verify your color combinations.

### Do Not Rely on Color Alone

\`\`\`html
<!-- Bad: only color indicates error -->
<input style="border-color: red;">

<!-- Good: color plus icon and text -->
<input style="border-color: red;" aria-describedby="error-msg">
<span id="error-msg">
  <svg aria-hidden="true"><!-- error icon --></svg>
  Email address is required
</span>
\`\`\`

## Forms

Accessible forms are critical. Every input needs a label:

\`\`\`html
<!-- Method 1: label element -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email">

<!-- Method 2: aria-label -->
<input type="search" aria-label="Search articles">

<!-- Method 3: aria-labelledby -->
<h2 id="contact">Contact Information</h2>
<input aria-labelledby="contact">
\`\`\`

### Error Messages

\`\`\`html
<label for="email">Email</label>
<input 
  type="email" 
  id="email" 
  aria-invalid="true" 
  aria-describedby="email-error"
>
<span id="email-error" role="alert">
  Please enter a valid email address
</span>
\`\`\`

### Required Fields

\`\`\`html
<label for="name">Name <span aria-label="required">*</span></label>
<input type="text" id="name" required aria-required="true">
\`\`\`

## Testing for Accessibility

### Automated Testing

Use tools like axe-core, Lighthouse, and WAVE to catch common issues. But remember: automated tools catch only about 30% of accessibility issues.

### Manual Testing

Test with keyboard only (no mouse). Test with a screen reader (VoiceOver on Mac, NVDA on Windows). Test with browser zoom at 200%. Test with high contrast mode. Test with reduced motion preference.

### Screen Reader Testing Checklist

Verify that page title is announced, headings are navigable, images have appropriate alt text, form labels are announced, error messages are announced, dynamic content changes are communicated, and modals trap focus correctly.

## Quick Wins

Start with these high-impact, low-effort improvements: add alt text to all images, ensure all form inputs have labels, use semantic HTML elements, maintain heading hierarchy, ensure sufficient color contrast, make all interactive elements keyboard accessible, and add skip navigation links.

## Summary

Web accessibility is not an afterthought. It is a fundamental aspect of quality web development. Start with semantic HTML, ensure keyboard accessibility, provide proper labels and alt text, maintain sufficient color contrast, and test regularly with assistive technologies. The goal is not perfection from day one but continuous improvement toward an inclusive web experience.`,
  },
  {
    id: "13",
    slug: "sql-joins-explained-visually",
    title: "SQL Joins Explained Visually: INNER, LEFT, RIGHT, and FULL Joins",
    excerpt:
      "Finally understand SQL joins. Visual explanations with practical examples for INNER, LEFT, RIGHT, FULL, and CROSS joins.",
    category: "Data Structures",
    tags: ["SQL", "Database", "Joins", "Data"],
    author: "Dhethi Team",
    date: "2026-01-12",
    readTime: "8 min read",
    featured: false,
    metaDescription:
      "Understand SQL joins with visual explanations. Learn INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN, and CROSS JOIN with practical database examples.",
    content: `SQL joins are one of the most important concepts in relational databases. They allow you to combine data from two or more tables based on related columns. Despite being fundamental, joins often confuse developers. This guide uses clear explanations and practical examples to help you understand each type of join.

## Setting Up Our Example

Throughout this guide, we will use two simple tables:

\`\`\`sql
-- Employees table
CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  department_id INT
);

INSERT INTO employees VALUES
(1, 'Alice', 1),
(2, 'Bob', 2),
(3, 'Charlie', 1),
(4, 'Diana', 3),
(5, 'Eve', NULL);

-- Departments table
CREATE TABLE departments (
  id INT PRIMARY KEY,
  name VARCHAR(50)
);

INSERT INTO departments VALUES
(1, 'Engineering'),
(2, 'Marketing'),
(3, 'Sales'),
(4, 'HR');
\`\`\`

Notice that Eve has no department (NULL), and the HR department has no employees. These edge cases will help illustrate the differences between join types.

## INNER JOIN

An INNER JOIN returns only the rows where there is a match in both tables. Think of it as the intersection of two sets.

\`\`\`sql
SELECT e.name AS employee, d.name AS department
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;
\`\`\`

Result:

\`\`\`
employee  | department
----------|------------
Alice     | Engineering
Bob       | Marketing
Charlie   | Engineering
Diana     | Sales
\`\`\`

Eve is excluded because she has no department_id. HR is excluded because no employee belongs to it. Only matching rows from both tables appear.

### When to Use INNER JOIN

Use INNER JOIN when you only want results where the relationship exists in both tables. This is the most common type of join and should be your default choice unless you have a specific reason to include non-matching rows.

## LEFT JOIN (LEFT OUTER JOIN)

A LEFT JOIN returns all rows from the left table and the matched rows from the right table. If there is no match, NULL values are returned for the right table's columns.

\`\`\`sql
SELECT e.name AS employee, d.name AS department
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
\`\`\`

Result:

\`\`\`
employee  | department
----------|------------
Alice     | Engineering
Bob       | Marketing
Charlie   | Engineering
Diana     | Sales
Eve       | NULL
\`\`\`

Eve appears with NULL for department because she has no matching department. All employees are included regardless of whether they have a department.

### When to Use LEFT JOIN

Use LEFT JOIN when you want all records from the primary (left) table, even if they do not have related records in the secondary (right) table. Common use cases include listing all users with their optional profile data, showing all products with their reviews (including products with no reviews), and generating reports that should include all entities.

## RIGHT JOIN (RIGHT OUTER JOIN)

A RIGHT JOIN returns all rows from the right table and the matched rows from the left table. It is the mirror of LEFT JOIN.

\`\`\`sql
SELECT e.name AS employee, d.name AS department
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;
\`\`\`

Result:

\`\`\`
employee  | department
----------|------------
Alice     | Engineering
Charlie   | Engineering
Bob       | Marketing
Diana     | Sales
NULL      | HR
\`\`\`

HR appears with NULL for employee because no employee belongs to it. Eve is excluded because there is no matching department.

### When to Use RIGHT JOIN

RIGHT JOIN is less common than LEFT JOIN because you can always rewrite a RIGHT JOIN as a LEFT JOIN by swapping the table order. Most developers prefer LEFT JOIN for consistency.

## FULL JOIN (FULL OUTER JOIN)

A FULL JOIN returns all rows from both tables. When there is no match, NULL values appear for the missing side.

\`\`\`sql
SELECT e.name AS employee, d.name AS department
FROM employees e
FULL JOIN departments d ON e.department_id = d.id;
\`\`\`

Result:

\`\`\`
employee  | department
----------|------------
Alice     | Engineering
Charlie   | Engineering
Bob       | Marketing
Diana     | Sales
Eve       | NULL
NULL      | HR
\`\`\`

Both Eve (no department) and HR (no employees) appear. Every row from both tables is included.

### When to Use FULL JOIN

Use FULL JOIN when you need a complete picture of both tables, including unmatched rows from either side. This is useful for data reconciliation, finding orphaned records, and comprehensive reporting.

## CROSS JOIN

A CROSS JOIN produces the Cartesian product of two tables. Every row from the first table is combined with every row from the second table.

\`\`\`sql
SELECT e.name AS employee, d.name AS department
FROM employees e
CROSS JOIN departments d;
\`\`\`

This produces 5 x 4 = 20 rows (every combination of employee and department). Cross joins are rarely used but can be useful for generating all possible combinations, creating test data, and pairing every item with every category.

## SELF JOIN

A self join joins a table with itself. This is useful for hierarchical data:

\`\`\`sql
-- Employees with their managers
SELECT 
  e.name AS employee,
  m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
\`\`\`

## Multiple Joins

You can chain multiple joins together:

\`\`\`sql
SELECT 
  e.name AS employee,
  d.name AS department,
  p.title AS project
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
LEFT JOIN projects p ON e.id = p.lead_id;
\`\`\`

## Join Performance Tips

Use indexes on join columns. They dramatically improve performance. Choose the appropriate join type. Do not use LEFT JOIN when INNER JOIN suffices, as it can return more rows and be slower. Filter early with WHERE clauses to reduce the number of rows being joined. Be careful with CROSS JOIN on large tables as the result set grows multiplicatively.

### Index Example

\`\`\`sql
-- Create index on the foreign key
CREATE INDEX idx_employees_department_id ON employees(department_id);
\`\`\`

## Common Mistakes

### Forgetting the ON Clause

\`\`\`sql
-- This becomes a CROSS JOIN!
SELECT * FROM employees, departments;

-- Always use explicit JOIN syntax with ON
SELECT * FROM employees JOIN departments ON employees.department_id = departments.id;
\`\`\`

### Joining on Wrong Columns

Always verify that you are joining on the correct related columns. Joining on unrelated columns will produce incorrect results without any error.

### Not Handling NULLs

When using LEFT or FULL joins, remember that joined columns can be NULL. Account for this in your WHERE clauses and application code.

## Summary

SQL joins are fundamental to working with relational databases. INNER JOIN gives you matching rows from both tables. LEFT JOIN gives you all rows from the left table plus matches. RIGHT JOIN gives you all rows from the right table plus matches. FULL JOIN gives you all rows from both tables. CROSS JOIN gives you every combination. Master these five types and you can handle any data relationship in your database.`,
  },
  {
    id: "14",
    slug: "clean-code-principles-every-developer",
    title: "10 Clean Code Principles Every Developer Should Follow",
    excerpt:
      "Write code that humans can read. Learn fundamental clean code principles with before-and-after examples that will transform your coding habits.",
    category: "Best Practices",
    tags: ["Clean Code", "Best Practices", "Software Engineering"],
    author: "Dhethi Team",
    date: "2026-01-09",
    readTime: "10 min read",
    featured: false,
    metaDescription:
      "Learn 10 essential clean code principles with practical examples. Improve code readability, maintainability, and collaboration with these proven practices.",
    content: `Clean code is not just about making code work. It is about making code that is easy to read, understand, and maintain. As Martin Fowler said, "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." Here are ten principles that will fundamentally improve the quality of your code.

## 1. Meaningful Names

Names should reveal intent. A reader should understand the purpose of a variable, function, or class just from its name.

\`\`\`javascript
// Bad
const d = new Date();
const x = users.filter(u => u.a > 18);
function calc(a, b) { return a * b * 0.08; }

// Good
const currentDate = new Date();
const adultUsers = users.filter(user => user.age > 18);
function calculateSalesTax(price, quantity) { return price * quantity * 0.08; }
\`\`\`

### Naming Conventions

Use nouns for variables and classes. Use verbs for functions. Use descriptive names, not abbreviations. Be consistent with naming conventions throughout the codebase.

\`\`\`javascript
// Variables: descriptive nouns
const userCount = users.length;
const isAuthenticated = token !== null;
const maxRetryAttempts = 3;

// Functions: verb phrases
function getUserById(id) { }
function validateEmail(email) { }
function calculateTotalPrice(items) { }

// Classes: noun phrases
class ShoppingCart { }
class UserAuthentication { }
class PaymentProcessor { }
\`\`\`

## 2. Small Functions

Functions should do one thing and do it well. If a function needs a comment to explain what it does, it is probably doing too much.

\`\`\`javascript
// Bad: one function doing everything
function processOrder(order) {
  // Validate order
  if (!order.items || order.items.length === 0) {
    throw new Error('Order must have items');
  }
  if (!order.customer) {
    throw new Error('Order must have a customer');
  }
  
  // Calculate total
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
    if (item.discount) {
      total -= item.discount;
    }
  }
  
  // Apply tax
  total *= 1.08;
  
  // Save to database
  database.save({ ...order, total });
  
  // Send confirmation email
  emailService.send(order.customer.email, 'Order Confirmed', total);
}

// Good: each function does one thing
function validateOrder(order) {
  if (!order.items?.length) throw new Error('Order must have items');
  if (!order.customer) throw new Error('Order must have a customer');
}

function calculateOrderTotal(items) {
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.price * item.quantity) - (item.discount || 0);
  }, 0);
  return subtotal * 1.08;
}

function processOrder(order) {
  validateOrder(order);
  const total = calculateOrderTotal(order.items);
  database.save({ ...order, total });
  emailService.sendConfirmation(order.customer.email, total);
}
\`\`\`

## 3. Avoid Magic Numbers and Strings

Replace unexplained numbers and strings with named constants:

\`\`\`javascript
// Bad
if (user.age >= 21) { }
if (password.length < 8) { }
setTimeout(callback, 86400000);

// Good
const MINIMUM_DRINKING_AGE = 21;
const MINIMUM_PASSWORD_LENGTH = 8;
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

if (user.age >= MINIMUM_DRINKING_AGE) { }
if (password.length < MINIMUM_PASSWORD_LENGTH) { }
setTimeout(callback, ONE_DAY_IN_MS);
\`\`\`

## 4. Do Not Repeat Yourself (DRY)

Duplicated code is a maintenance nightmare. When you need to change logic, you have to find and update every copy:

\`\`\`javascript
// Bad: duplicated validation logic
function createUser(data) {
  if (!data.email || !data.email.includes('@')) {
    throw new Error('Invalid email');
  }
  // ... create user
}

function updateUser(data) {
  if (!data.email || !data.email.includes('@')) {
    throw new Error('Invalid email');
  }
  // ... update user
}

// Good: extract shared logic
function validateEmail(email) {
  if (!email || !email.includes('@')) {
    throw new Error('Invalid email');
  }
}

function createUser(data) {
  validateEmail(data.email);
  // ... create user
}

function updateUser(data) {
  validateEmail(data.email);
  // ... update user
}
\`\`\`

However, do not over-apply DRY. Sometimes similar-looking code serves different purposes and should remain separate. Premature abstraction can be worse than duplication.

## 5. Comments: When and How

The best code is self-documenting. Comments should explain why, not what:

\`\`\`javascript
// Bad: explaining what the code does (the code itself should be clear)
// Loop through users and check if age is greater than 18
const adults = users.filter(user => user.age > 18);

// Good: explaining why
// Users under 18 are excluded due to COPPA compliance requirements
const eligibleUsers = users.filter(user => user.age >= 18);

// Good: explaining complex business rules
// Discount is applied in tiers: 10% for orders over $100,
// 20% for orders over $500, based on 2024 pricing strategy
function calculateDiscount(orderTotal) {
  if (orderTotal > 500) return 0.20;
  if (orderTotal > 100) return 0.10;
  return 0;
}
\`\`\`

### Types of Useful Comments

Documentation comments for public APIs. TODO comments for planned improvements. Warning comments for non-obvious consequences. Legal comments when required.

## 6. Error Handling

Handle errors gracefully. Do not swallow exceptions or return ambiguous results:

\`\`\`javascript
// Bad: swallowing errors
async function fetchUser(id) {
  try {
    const response = await api.get(\`/users/\${id}\`);
    return response.data;
  } catch (error) {
    return null; // What went wrong? Network error? Not found? Auth failure?
  }
}

// Good: meaningful error handling
async function fetchUser(id) {
  try {
    const response = await api.get(\`/users/\${id}\`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new UserNotFoundError(\`User \${id} not found\`);
    }
    if (error.response?.status === 401) {
      throw new AuthenticationError('Authentication required');
    }
    throw new ApiError(\`Failed to fetch user: \${error.message}\`);
  }
}
\`\`\`

## 7. Single Responsibility Principle

Each module, class, or function should have one reason to change:

\`\`\`javascript
// Bad: class does too many things
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  save() { database.save(this); }
  sendEmail(message) { emailService.send(this.email, message); }
  generateReport() { return reportBuilder.build(this); }
}

// Good: separate concerns
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class UserRepository {
  save(user) { database.save(user); }
  findById(id) { return database.find(id); }
}

class UserNotificationService {
  sendEmail(user, message) { emailService.send(user.email, message); }
}
\`\`\`

## 8. Keep It Simple (KISS)

Do not over-engineer. Choose the simplest solution that works:

\`\`\`javascript
// Over-engineered
class StringReverserFactory {
  createReverser() {
    return new StringReverser();
  }
}

class StringReverser {
  reverse(str) {
    return new StringBuilder(str).reverse().build();
  }
}

// Simple
function reverseString(str) {
  return str.split('').reverse().join('');
}
\`\`\`

## 9. Consistent Formatting

Consistent formatting makes code easier to scan and understand. Use a formatter like Prettier and a linter like ESLint to enforce consistency automatically.

Key formatting rules: consistent indentation (2 or 4 spaces), consistent brace style, line length limits (80-120 characters), blank lines to separate logical sections, and consistent ordering of imports and class members.

## 10. Write Tests

Tests are documentation that never goes out of date. They demonstrate how code is intended to be used and catch regressions:

\`\`\`javascript
describe('calculateDiscount', () => {
  it('returns 0 for orders under $100', () => {
    expect(calculateDiscount(50)).toBe(0);
    expect(calculateDiscount(99.99)).toBe(0);
  });

  it('returns 10% for orders over $100', () => {
    expect(calculateDiscount(100.01)).toBe(0.10);
    expect(calculateDiscount(499.99)).toBe(0.10);
  });

  it('returns 20% for orders over $500', () => {
    expect(calculateDiscount(500.01)).toBe(0.20);
    expect(calculateDiscount(1000)).toBe(0.20);
  });
});
\`\`\`

## Applying These Principles

You do not need to apply all ten principles perfectly from day one. Start with meaningful names and small functions. Then gradually incorporate the others. The goal is continuous improvement, not perfection.

When working with existing code, follow the Boy Scout Rule: leave the code cleaner than you found it. Make small improvements each time you touch a file. Over time, the cumulative effect transforms the entire codebase.

## Summary

Clean code is a skill developed through practice and discipline. These ten principles provide a foundation: use meaningful names, keep functions small, avoid magic numbers, do not repeat yourself, write purposeful comments, handle errors properly, follow single responsibility, keep things simple, format consistently, and write tests. Apply them consistently and your code will be easier to read, maintain, and extend.`,
  },
  {
    id: "15",
    slug: "react-performance-optimization-techniques",
    title: "React Performance Optimization: Techniques That Actually Matter",
    excerpt:
      "Speed up your React applications with proven optimization techniques. Learn memoization, code splitting, virtualization, and profiling.",
    category: "React",
    tags: ["React", "Performance", "Optimization", "Frontend"],
    author: "Dhethi Team",
    date: "2026-01-06",
    readTime: "10 min read",
    featured: false,
    metaDescription:
      "Optimize React performance with memoization, code splitting, lazy loading, virtualization, and profiling. Practical techniques for faster React apps.",
    content: `React is fast by default, but as applications grow in complexity, performance can degrade. The key is knowing which optimizations matter and when to apply them. Premature optimization wastes time, but targeted optimization can dramatically improve user experience.

## Measure Before Optimizing

The most important rule of performance optimization: measure first. Never optimize based on assumptions. Use React DevTools Profiler, Chrome DevTools Performance tab, and Lighthouse to identify actual bottlenecks.

### React DevTools Profiler

The Profiler records renders and shows you which components rendered, why they rendered, how long they took, and what props and state changed.

\`\`\`jsx
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log(\`\${id} rendered in \${actualDuration}ms during \${phase}\`);
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <MyComponent />
    </Profiler>
  );
}
\`\`\`

## React.memo: Preventing Unnecessary Re-renders

\`React.memo\` is a higher-order component that skips re-rendering when props have not changed:

\`\`\`jsx
const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});
\`\`\`

### When to Use React.memo

Use it for components that render often with the same props, components that are expensive to render, and components in frequently updating parent components.

### When Not to Use React.memo

Do not use it for components that almost always receive new props, simple components that render quickly, or everywhere "just in case." The shallow comparison has its own cost.

### Custom Comparison

\`\`\`jsx
const UserCard = React.memo(
  function UserCard({ user, onSelect }) {
    return <div onClick={() => onSelect(user.id)}>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    return prevProps.user.id === nextProps.user.id &&
           prevProps.user.name === nextProps.user.name;
  }
);
\`\`\`

## useMemo and useCallback

### useMemo for Expensive Computations

\`\`\`jsx
function ProductList({ products, searchQuery }) {
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => a.price - b.price);
  }, [products, searchQuery]);

  return <ul>{filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}</ul>;
}
\`\`\`

### useCallback for Stable Function References

\`\`\`jsx
function TodoList({ todos }) {
  const [items, setItems] = useState(todos);

  const handleDelete = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return items.map(item => (
    <TodoItem key={item.id} item={item} onDelete={handleDelete} />
  ));
}

const TodoItem = React.memo(function TodoItem({ item, onDelete }) {
  return (
    <div>
      {item.text}
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
});
\`\`\`

\`useCallback\` is most valuable when passed to memoized child components. Without \`React.memo\` on the child, \`useCallback\` alone does not prevent re-renders.

## Code Splitting with React.lazy

Split your bundle so users only download the code they need:

\`\`\`jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Analytics = lazy(() => import('./pages/Analytics'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

### Route-Based Splitting

The most impactful code splitting strategy is route-based. Each page becomes its own chunk, loaded only when the user navigates to it.

### Component-Based Splitting

For heavy components within a page:

\`\`\`jsx
const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Analytics</button>
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
\`\`\`

## Virtualization for Long Lists

When rendering hundreds or thousands of items, render only what is visible:

\`\`\`jsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(virtualItem => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: virtualItem.start,
              height: virtualItem.size,
              width: '100%',
            }}
          >
            {items[virtualItem.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
\`\`\`

## State Management Optimization

### Lift State Down

Keep state as close to where it is used as possible. When state is lifted too high, every update causes the entire subtree to re-render:

\`\`\`jsx
// Bad: search state causes entire page to re-render
function Page() {
  const [search, setSearch] = useState('');
  return (
    <div>
      <SearchBar value={search} onChange={setSearch} />
      <ExpensiveComponent />
      <AnotherExpensiveComponent />
    </div>
  );
}

// Good: search state is isolated
function Page() {
  return (
    <div>
      <SearchSection />
      <ExpensiveComponent />
      <AnotherExpensiveComponent />
    </div>
  );
}

function SearchSection() {
  const [search, setSearch] = useState('');
  return <SearchBar value={search} onChange={setSearch} />;
}
\`\`\`

### Context Splitting

Split context into multiple providers to prevent unnecessary re-renders:

\`\`\`jsx
// Instead of one large context
const AppContext = createContext();

// Split into focused contexts
const UserContext = createContext();
const ThemeContext = createContext();
const NotificationContext = createContext();
\`\`\`

## Image Optimization

Images are often the largest assets on a page:

\`\`\`jsx
// Lazy load images
<img loading="lazy" src="image.jpg" alt="Description" />

// Use appropriate sizes
<img
  srcSet="image-300.jpg 300w, image-600.jpg 600w, image-1200.jpg 1200w"
  sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
  src="image-600.jpg"
  alt="Description"
/>

// Use modern formats
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <source srcSet="image.jpg" type="image/jpeg" />
  <img src="image.jpg" alt="Description" />
</picture>
\`\`\`

## Debouncing and Throttling

Prevent excessive updates from rapid user input:

\`\`\`jsx
function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');

  const debouncedSearch = useMemo(
    () => debounce((q) => onSearch(q), 300),
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return <input value={query} onChange={handleChange} />;
}
\`\`\`

## Summary

React performance optimization is about measuring, identifying bottlenecks, and applying targeted fixes. Start with the React DevTools Profiler to find problems. Use React.memo, useMemo, and useCallback to prevent unnecessary work. Apply code splitting to reduce initial load time. Virtualize long lists. Optimize images. And always remember: premature optimization is the root of all evil. Measure first, optimize second.`,
  },
  {
    id: "16",
    slug: "introduction-to-testing-javascript",
    title: "Introduction to Testing in JavaScript: Unit, Integration, and E2E",
    excerpt:
      "Build confidence in your code with testing. Learn the testing pyramid, popular frameworks, and how to write your first tests.",
    category: "JavaScript",
    tags: ["Testing", "Jest", "JavaScript", "Quality"],
    author: "Dhethi Team",
    date: "2026-01-03",
    readTime: "10 min read",
    featured: false,
    metaDescription:
      "Learn JavaScript testing from scratch. Understand unit, integration, and E2E testing with Jest, Testing Library, and Playwright examples.",
    content: `Testing is one of the most valuable skills a developer can learn. Tests catch bugs before they reach production, enable confident refactoring, serve as living documentation, and speed up development in the long run. Despite these benefits, many developers skip testing or do it poorly. This guide will help you start testing effectively.

## The Testing Pyramid

The testing pyramid describes the ideal distribution of tests:

At the base are unit tests: many, fast, testing individual functions and components. In the middle are integration tests: fewer, testing how components work together. At the top are end-to-end (E2E) tests: fewest, testing complete user workflows.

### Unit Tests

Test individual units of code in isolation. They should be fast, deterministic, and independent of external systems.

\`\`\`javascript
// Function to test
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Unit tests
describe('calculateTotal', () => {
  it('returns 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });

  it('calculates total for single item', () => {
    const items = [{ price: 10, quantity: 2 }];
    expect(calculateTotal(items)).toBe(20);
  });

  it('calculates total for multiple items', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ];
    expect(calculateTotal(items)).toBe(35);
  });

  it('handles decimal prices', () => {
    const items = [{ price: 9.99, quantity: 1 }];
    expect(calculateTotal(items)).toBeCloseTo(9.99);
  });
});
\`\`\`

### Integration Tests

Test how multiple units work together. For React applications, this often means testing components with their dependencies:

\`\`\`javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoApp } from './TodoApp';

describe('TodoApp', () => {
  it('adds a new todo', () => {
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText('Add a todo');
    const button = screen.getByText('Add');
    
    fireEvent.change(input, { target: { value: 'Buy groceries' } });
    fireEvent.click(button);
    
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
  });

  it('marks a todo as complete', () => {
    render(<TodoApp />);
    
    // Add a todo first
    const input = screen.getByPlaceholderText('Add a todo');
    fireEvent.change(input, { target: { value: 'Buy groceries' } });
    fireEvent.click(screen.getByText('Add'));
    
    // Mark as complete
    fireEvent.click(screen.getByText('Buy groceries'));
    
    expect(screen.getByText('Buy groceries')).toHaveClass('completed');
  });
});
\`\`\`

### E2E Tests

Test complete user workflows in a real browser:

\`\`\`javascript
import { test, expect } from '@playwright/test';

test('user can sign up and create a post', async ({ page }) => {
  await page.goto('/signup');
  
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'SecurePass123');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('/dashboard');
  
  await page.click('text=New Post');
  await page.fill('[name="title"]', 'My First Post');
  await page.fill('[name="content"]', 'Hello, world!');
  await page.click('text=Publish');
  
  await expect(page.locator('text=My First Post')).toBeVisible();
});
\`\`\`

## Setting Up Jest

Jest is the most popular JavaScript testing framework. For a React project:

\`\`\`bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
\`\`\`

### Basic Jest Configuration

\`\`\`javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterSetup: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};

// jest.setup.js
import '@testing-library/jest-dom';
\`\`\`

## Writing Effective Tests

### The AAA Pattern

Structure tests with Arrange, Act, Assert:

\`\`\`javascript
it('applies discount to order total', () => {
  // Arrange
  const order = { items: [{ price: 100, quantity: 1 }] };
  const discount = 0.1;

  // Act
  const total = calculateDiscountedTotal(order, discount);

  // Assert
  expect(total).toBe(90);
});
\`\`\`

### Test Naming

Use descriptive test names that explain the expected behavior:

\`\`\`javascript
// Bad
it('test1', () => {});
it('works', () => {});

// Good
it('returns null when user is not found', () => {});
it('throws an error when email is invalid', () => {});
it('sends notification email after successful registration', () => {});
\`\`\`

### Testing Edge Cases

Always test boundary conditions and error cases:

\`\`\`javascript
describe('divide', () => {
  it('divides two positive numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });

  it('handles division by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero');
  });

  it('handles negative numbers', () => {
    expect(divide(-10, 2)).toBe(-5);
  });

  it('handles decimal results', () => {
    expect(divide(10, 3)).toBeCloseTo(3.333, 3);
  });
});
\`\`\`

## Mocking

Mocking replaces real dependencies with controlled substitutes:

### Function Mocking

\`\`\`javascript
const mockFetch = jest.fn();
global.fetch = mockFetch;

it('fetches user data', async () => {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: 1, name: 'John' }),
  });

  const user = await fetchUser(1);

  expect(mockFetch).toHaveBeenCalledWith('/api/users/1');
  expect(user.name).toBe('John');
});
\`\`\`

### Module Mocking

\`\`\`javascript
jest.mock('./emailService', () => ({
  sendEmail: jest.fn().mockResolvedValue(true),
}));

import { sendEmail } from './emailService';

it('sends welcome email on registration', async () => {
  await registerUser({ email: 'test@example.com' });
  
  expect(sendEmail).toHaveBeenCalledWith(
    'test@example.com',
    'Welcome!',
    expect.any(String)
  );
});
\`\`\`

## React Testing Library

React Testing Library encourages testing from the user's perspective:

\`\`\`javascript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('LoginForm', () => {
  it('shows error for invalid email', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    
    await user.type(screen.getByLabelText('Email'), 'invalid');
    await user.click(screen.getByRole('button', { name: 'Log In' }));
    
    expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
  });

  it('calls onSubmit with form data', async () => {
    const handleSubmit = jest.fn();
    const user = userEvent.setup();
    render(<LoginForm onSubmit={handleSubmit} />);
    
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Log In' }));
    
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password123',
    });
  });
});
\`\`\`

## What to Test and What Not to Test

### Test

Business logic and calculations. User interactions and their outcomes. Error handling. Edge cases and boundary conditions. Component rendering based on different props and states.

### Do Not Test

Third-party library internals. Implementation details (state values, internal method calls). Styling (unless it affects functionality). Constants.

## Summary

Testing is an investment that pays dividends in code quality, confidence, and development speed. Start with unit tests for your business logic, add integration tests for component interactions, and use E2E tests for critical user journeys. Focus on testing behavior, not implementation. And remember: some tests are better than no tests. Start small and build your testing practice over time.`,
  },
  {
    id: "17",
    slug: "linux-command-line-essential-commands",
    title: "Linux Command Line: 30 Essential Commands Every Developer Needs",
    excerpt:
      "Boost your productivity with essential Linux commands. From file management to process control, learn the commands you will use daily.",
    category: "DevOps",
    tags: ["Linux", "Command Line", "Terminal", "DevOps"],
    author: "Dhethi Team",
    date: "2024-12-30",
    readTime: "11 min read",
    featured: false,
    metaDescription:
      "Learn 30 essential Linux commands for developers. Master file management, text processing, process control, networking, and system administration.",
    content: `The command line is a developer's superpower. While graphical interfaces are convenient, the terminal lets you automate tasks, manage servers, and work more efficiently. These 30 commands form the foundation of command-line proficiency.

## File and Directory Navigation

### pwd - Print Working Directory

Shows your current location in the file system:

\`\`\`bash
$ pwd
/home/username/projects
\`\`\`

### cd - Change Directory

Navigate between directories:

\`\`\`bash
cd /var/log          # Absolute path
cd projects          # Relative path
cd ..                # Parent directory
cd ~                 # Home directory
cd -                 # Previous directory
\`\`\`

### ls - List Directory Contents

\`\`\`bash
ls                   # Basic listing
ls -la               # Long format, including hidden files
ls -lh               # Human-readable file sizes
ls -lt               # Sort by modification time
ls -lS               # Sort by file size
\`\`\`

## File Management

### cp - Copy Files

\`\`\`bash
cp file.txt backup.txt           # Copy file
cp -r directory/ backup/         # Copy directory recursively
cp -i file.txt destination/      # Interactive (confirm overwrites)
\`\`\`

### mv - Move or Rename Files

\`\`\`bash
mv old-name.txt new-name.txt     # Rename
mv file.txt /path/to/directory/  # Move
mv *.txt documents/              # Move all .txt files
\`\`\`

### rm - Remove Files

\`\`\`bash
rm file.txt                      # Remove file
rm -r directory/                 # Remove directory and contents
rm -i file.txt                   # Interactive (confirm deletion)
# NEVER run: rm -rf /            # This would destroy everything
\`\`\`

### mkdir - Make Directory

\`\`\`bash
mkdir new-directory              # Create directory
mkdir -p path/to/nested/dir      # Create nested directories
\`\`\`

### touch - Create Empty Files

\`\`\`bash
touch newfile.txt                # Create file or update timestamp
touch file1.txt file2.txt        # Create multiple files
\`\`\`

## Viewing and Editing Files

### cat - Concatenate and Display

\`\`\`bash
cat file.txt                     # Display file contents
cat file1.txt file2.txt          # Display multiple files
cat -n file.txt                  # Display with line numbers
\`\`\`

### less - Page Through Files

\`\`\`bash
less large-file.log              # Navigate through file
# Use: Space (next page), b (previous), / (search), q (quit)
\`\`\`

### head and tail - View File Extremes

\`\`\`bash
head -20 file.txt                # First 20 lines
tail -20 file.txt                # Last 20 lines
tail -f /var/log/app.log         # Follow file in real-time
\`\`\`

## Text Processing

### grep - Search Text

\`\`\`bash
grep "error" log.txt             # Search for "error"
grep -i "error" log.txt          # Case-insensitive
grep -r "TODO" src/              # Recursive search in directory
grep -n "function" script.js     # Show line numbers
grep -c "error" log.txt          # Count matches
grep -v "debug" log.txt          # Invert match (exclude)
\`\`\`

### sed - Stream Editor

\`\`\`bash
sed 's/old/new/' file.txt        # Replace first occurrence per line
sed 's/old/new/g' file.txt       # Replace all occurrences
sed -i 's/old/new/g' file.txt    # Edit file in-place
sed '5d' file.txt                # Delete line 5
sed -n '10,20p' file.txt         # Print lines 10-20
\`\`\`

### awk - Pattern Processing

\`\`\`bash
awk '{print $1}' file.txt        # Print first column
awk -F',' '{print $2}' data.csv  # Print second CSV column
awk '{sum += $1} END {print sum}' numbers.txt  # Sum a column
\`\`\`

### sort and uniq

\`\`\`bash
sort file.txt                    # Sort alphabetically
sort -n numbers.txt              # Sort numerically
sort -r file.txt                 # Reverse sort
sort file.txt | uniq             # Remove duplicates
sort file.txt | uniq -c          # Count occurrences
\`\`\`

### wc - Word Count

\`\`\`bash
wc file.txt                      # Lines, words, bytes
wc -l file.txt                   # Line count only
wc -w file.txt                   # Word count only
\`\`\`

## File Permissions

### chmod - Change Permissions

\`\`\`bash
chmod 755 script.sh              # rwxr-xr-x
chmod +x script.sh               # Add execute permission
chmod u+w file.txt               # Add write for owner
chmod -R 644 directory/          # Recursive
\`\`\`

### chown - Change Ownership

\`\`\`bash
chown user:group file.txt        # Change owner and group
chown -R user:group directory/   # Recursive
\`\`\`

## Process Management

### ps - Process Status

\`\`\`bash
ps aux                           # All processes, detailed
ps aux | grep node               # Find Node.js processes
\`\`\`

### top and htop

\`\`\`bash
top                              # Real-time process monitor
htop                             # Enhanced process monitor (if installed)
\`\`\`

### kill - Terminate Processes

\`\`\`bash
kill 12345                       # Graceful termination (SIGTERM)
kill -9 12345                    # Force kill (SIGKILL)
killall node                     # Kill all Node.js processes
\`\`\`

## Networking

### curl - Transfer Data

\`\`\`bash
curl https://api.example.com/data           # GET request
curl -X POST -d '{"key":"value"}' URL       # POST request
curl -H "Authorization: Bearer token" URL   # With headers
curl -o output.json URL                     # Save to file
\`\`\`

### ssh - Secure Shell

\`\`\`bash
ssh user@server.com              # Connect to remote server
ssh -i key.pem user@server.com   # Connect with key file
ssh -p 2222 user@server.com      # Connect on custom port
\`\`\`

### scp - Secure Copy

\`\`\`bash
scp file.txt user@server:/path/  # Upload file
scp user@server:/path/file.txt . # Download file
scp -r directory/ user@server:/  # Copy directory
\`\`\`

## Pipes and Redirection

Combine commands for powerful workflows:

\`\`\`bash
# Pipe output of one command to another
cat log.txt | grep "error" | wc -l          # Count error lines
ps aux | grep node | awk '{print $2}'       # Get Node process IDs

# Redirect output
echo "Hello" > file.txt          # Write (overwrite)
echo "World" >> file.txt         # Append
command 2> errors.log            # Redirect errors
command > output.log 2>&1        # Redirect all output
\`\`\`

## Disk and System

### df - Disk Free Space

\`\`\`bash
df -h                            # Human-readable disk usage
\`\`\`

### du - Directory Usage

\`\`\`bash
du -sh directory/                # Size of directory
du -sh * | sort -rh | head -10   # Top 10 largest items
\`\`\`

### find - Search for Files

\`\`\`bash
find . -name "*.js"              # Find by name
find . -type f -size +10M        # Files larger than 10MB
find . -name "*.log" -mtime +30  # Log files older than 30 days
find . -name "*.tmp" -delete     # Find and delete
\`\`\`

## Compression

### tar - Archive Files

\`\`\`bash
tar -czf archive.tar.gz directory/   # Create compressed archive
tar -xzf archive.tar.gz              # Extract archive
tar -tzf archive.tar.gz              # List archive contents
\`\`\`

## Combining Commands

The true power of the command line comes from combining commands:

\`\`\`bash
# Find the 10 most common error messages
grep "ERROR" app.log | sort | uniq -c | sort -rn | head -10

# Find all JavaScript files containing "TODO"
find . -name "*.js" -exec grep -l "TODO" {} \\;

# Monitor a log file for errors in real-time
tail -f /var/log/app.log | grep --color "ERROR"

# Disk usage of subdirectories, sorted by size
du -sh */ | sort -rh
\`\`\`

## Summary

These 30 commands form the foundation of command-line fluency. You do not need to memorize every option. Focus on the commands you use most frequently and use \`man command-name\` or \`command --help\` when you need details. The command line becomes more powerful the more you use it, and these fundamentals will serve you throughout your career.`,
  },
  {
    id: "18",
    slug: "python-virtual-environments-explained",
    title:
      "Python Virtual Environments Explained: venv, virtualenv, and Poetry",
    excerpt:
      "Stop polluting your global Python installation. Learn how to manage project dependencies with virtual environments and modern tools.",
    category: "Python",
    tags: [
      "Python",
      "Virtual Environments",
      "Dependencies",
      "Package Management",
    ],
    author: "Dhethi Team",
    date: "2024-12-27",
    readTime: "8 min read",
    featured: false,
    metaDescription:
      "Learn Python virtual environments with venv, virtualenv, and Poetry. Manage project dependencies, avoid conflicts, and set up reproducible environments.",
    content: `If you have ever struggled with conflicting Python package versions between projects, or broken your system Python by installing the wrong package, virtual environments are the solution. They create isolated spaces for each project's dependencies, preventing conflicts and ensuring reproducibility.

## Why Virtual Environments?

Without virtual environments, all Python packages install globally. This causes several problems:

Version conflicts arise when Project A needs Django 3.2 and Project B needs Django 4.1. You cannot have both installed globally. System stability issues occur when a package update breaks your operating system's Python-dependent tools. Reproducibility problems make it difficult to know which packages a specific project actually needs. Deployment becomes uncertain because you might install packages in development that are not available on the server.

Virtual environments solve all of these by creating isolated Python installations for each project.

## venv: The Built-in Solution

Python 3.3+ includes the \`venv\` module. It is the simplest way to create virtual environments:

### Creating a Virtual Environment

\`\`\`bash
# Create a virtual environment
python3 -m venv myproject-env

# Or create it inside your project directory
cd myproject
python3 -m venv venv
\`\`\`

This creates a directory containing a copy of the Python interpreter, pip, and a \`lib\` directory for installed packages.

### Activating the Environment

\`\`\`bash
# On macOS/Linux
source venv/bin/activate

# On Windows
venv\\Scripts\\activate

# Your prompt changes to show the active environment
(venv) $ python --version
\`\`\`

### Installing Packages

\`\`\`bash
(venv) $ pip install requests flask sqlalchemy
(venv) $ pip install -r requirements.txt
\`\`\`

### Saving and Sharing Dependencies

\`\`\`bash
# Save current packages
(venv) $ pip freeze > requirements.txt

# Example requirements.txt
Flask==3.0.0
requests==2.31.0
SQLAlchemy==2.0.23
\`\`\`

### Deactivating

\`\`\`bash
(venv) $ deactivate
$
\`\`\`

### Best Practices with venv

Always add the virtual environment directory to .gitignore:

\`\`\`
# .gitignore
venv/
env/
.venv/
\`\`\`

Use descriptive names or a consistent convention. Many developers use \`venv\` or \`.venv\` as the directory name.

## virtualenv: The Enhanced Version

\`virtualenv\` is a third-party tool that predates \`venv\` and offers additional features:

\`\`\`bash
# Install virtualenv
pip install virtualenv

# Create environment
virtualenv myenv

# Create with a specific Python version
virtualenv -p python3.11 myenv

# Create without pip (lighter weight)
virtualenv --no-pip myenv
\`\`\`

\`virtualenv\` is faster than \`venv\`, supports older Python versions, and has more configuration options. However, for most use cases, \`venv\` is sufficient.

## pip-tools: Better Dependency Management

\`pip-tools\` improves on plain \`requirements.txt\` by separating direct dependencies from their transitive dependencies:

\`\`\`bash
pip install pip-tools
\`\`\`

### Create requirements.in

\`\`\`
# requirements.in - your direct dependencies
flask
requests
sqlalchemy
\`\`\`

### Compile to Pinned Requirements

\`\`\`bash
pip-compile requirements.in
\`\`\`

This generates a \`requirements.txt\` with all dependencies pinned to specific versions, including transitive dependencies.

### Sync Your Environment

\`\`\`bash
pip-sync requirements.txt
\`\`\`

This installs the exact packages listed and removes any packages not in the requirements, keeping your environment clean.

## Poetry: Modern Python Dependency Management

Poetry is a comprehensive tool that handles dependency management, packaging, and publishing:

### Installation

\`\`\`bash
curl -sSL https://install.python-poetry.org | python3 -
\`\`\`

### Creating a Project

\`\`\`bash
poetry new myproject
# Or initialize in an existing directory
cd existing-project
poetry init
\`\`\`

### The pyproject.toml File

Poetry uses \`pyproject.toml\` instead of \`requirements.txt\`:

\`\`\`toml
[tool.poetry]
name = "myproject"
version = "0.1.0"
description = "My awesome project"

[tool.poetry.dependencies]
python = "^3.9"
flask = "^3.0"
requests = "^2.31"
sqlalchemy = "^2.0"

[tool.poetry.group.dev.dependencies]
pytest = "^7.4"
black = "^23.0"
mypy = "^1.7"
\`\`\`

### Managing Dependencies

\`\`\`bash
# Add a dependency
poetry add flask

# Add a development dependency
poetry add --group dev pytest

# Remove a dependency
poetry remove flask

# Update dependencies
poetry update

# Install all dependencies
poetry install
\`\`\`

### Running Commands

\`\`\`bash
# Run a command in the virtual environment
poetry run python script.py
poetry run pytest

# Or activate the shell
poetry shell
\`\`\`

### The Lock File

Poetry generates a \`poetry.lock\` file that pins exact versions of all dependencies and their transitive dependencies. Always commit this file to version control. It ensures every developer and deployment uses identical package versions.

## Comparing the Tools

### venv

Best for simple projects, learning Python, and when you do not want external tools. Use with \`pip freeze\` for basic dependency tracking.

### virtualenv

Best when you need support for older Python versions or when venv is too slow. Largely interchangeable with venv for most use cases.

### pip-tools

Best when you want better dependency management than plain pip but do not want to learn a completely new tool. Great upgrade from raw requirements.txt files.

### Poetry

Best for serious projects, libraries, and teams. Handles dependency resolution, virtual environments, and packaging in one tool.

## Common Workflows

### Project Setup with venv

\`\`\`bash
mkdir myproject && cd myproject
python3 -m venv venv
source venv/bin/activate
pip install flask requests
pip freeze > requirements.txt
git init
echo "venv/" >> .gitignore
\`\`\`

### Project Setup with Poetry

\`\`\`bash
poetry new myproject && cd myproject
poetry add flask requests
poetry add --group dev pytest black
git init
# poetry.lock and pyproject.toml are already ready for git
\`\`\`

### Cloning a Project (venv)

\`\`\`bash
git clone https://github.com/user/project.git
cd project
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
\`\`\`

### Cloning a Project (Poetry)

\`\`\`bash
git clone https://github.com/user/project.git
cd project
poetry install
\`\`\`

## Troubleshooting

If you encounter "command not found" after activating a venv, make sure you are using the correct activation script for your shell. If packages are not found after installation, verify you activated the virtual environment before installing. If you have version conflicts, try deleting the virtual environment and recreating it from your requirements file.

## Summary

Virtual environments are a fundamental part of Python development. For simple projects, venv is built in and sufficient. For more sophisticated dependency management, Poetry offers a modern, comprehensive solution. The key principle is simple: never install project dependencies globally. Always use a virtual environment, commit your dependency specifications to version control, and document how to set up the project for new contributors.`,
  },
  {
    id: "19",
    slug: "responsive-web-design-modern-approach",
    title: "Responsive Web Design in 2026: A Modern Approach",
    excerpt:
      "Build websites that look great on every device. Learn modern responsive design techniques beyond media queries.",
    category: "Web Development",
    tags: ["CSS", "Responsive Design", "Mobile First", "Web Development"],
    author: "Dhethi Team",
    date: "2024-12-24",
    readTime: "9 min read",
    featured: false,
    metaDescription:
      "Modern responsive web design techniques for 2026. Learn CSS Grid, Flexbox, container queries, fluid typography, and mobile-first design strategies.",
    content: `Responsive web design has evolved significantly since Ethan Marcotte coined the term in 2010. While the core principle remains the same, making websites work well on any screen size, the tools and techniques available today are far more powerful. This guide covers modern responsive design strategies that go beyond basic media queries.

## Mobile-First Design

Mobile-first design means starting with the mobile layout and progressively enhancing for larger screens. This approach forces you to prioritize content and provides a better foundation for responsive design.

\`\`\`css
/* Base styles (mobile) */
.container {
  padding: 1rem;
}

.grid {
  display: grid;
  gap: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
  
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem;
  }
  
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
\`\`\`

## Fluid Typography

Instead of fixed font sizes that jump at breakpoints, use fluid typography that scales smoothly with the viewport:

\`\`\`css
/* Using clamp() for fluid typography */
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}

h2 {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
}

p {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
}
\`\`\`

The \`clamp()\` function takes three values: minimum, preferred, and maximum. The font size scales with the viewport but never goes below the minimum or above the maximum.

### Fluid Spacing

Apply the same concept to spacing:

\`\`\`css
:root {
  --space-sm: clamp(0.5rem, 1vw, 1rem);
  --space-md: clamp(1rem, 3vw, 2rem);
  --space-lg: clamp(2rem, 5vw, 4rem);
  --space-xl: clamp(3rem, 8vw, 6rem);
}

section {
  padding-block: var(--space-lg);
}

.card {
  padding: var(--space-md);
  gap: var(--space-sm);
}
\`\`\`

## Intrinsic Layouts with CSS Grid

CSS Grid enables layouts that respond to content rather than viewport size:

### Auto-Fill Responsive Grid

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 1.5rem;
}
\`\`\`

This creates a grid where cards are at least 300px wide but expand to fill available space. No media queries needed.

### Content-Aware Layouts

\`\`\`css
.article-layout {
  display: grid;
  grid-template-columns: 1fr min(65ch, 100%) 1fr;
}

.article-layout > * {
  grid-column: 2;
}

.article-layout .full-bleed {
  grid-column: 1 / -1;
}
\`\`\`

This centers content at a readable width while allowing certain elements to span the full width.

## Container Queries

Container queries let components respond to their container's size rather than the viewport:

\`\`\`css
.card-container {
  container-type: inline-size;
}

.card {
  display: grid;
  gap: 1rem;
}

@container (min-width: 400px) {
  .card {
    grid-template-columns: 200px 1fr;
  }
}

@container (min-width: 700px) {
  .card {
    grid-template-columns: 300px 1fr;
    gap: 2rem;
  }
}
\`\`\`

This is powerful because the same component adapts to different container sizes regardless of viewport width. A card in a sidebar behaves differently from the same card in a main content area.

## Responsive Images

### The srcset Attribute

\`\`\`html
<img
  src="image-800.jpg"
  srcset="
    image-400.jpg 400w,
    image-800.jpg 800w,
    image-1200.jpg 1200w
  "
  sizes="
    (max-width: 600px) 100vw,
    (max-width: 1000px) 50vw,
    33vw
  "
  alt="Description"
  loading="lazy"
>
\`\`\`

### The Picture Element

\`\`\`html
<picture>
  <source media="(min-width: 1024px)" srcset="desktop.jpg">
  <source media="(min-width: 768px)" srcset="tablet.jpg">
  <img src="mobile.jpg" alt="Description" loading="lazy">
</picture>
\`\`\`

### CSS Object-Fit

\`\`\`css
.responsive-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center;
}
\`\`\`

## Responsive Navigation

### Mobile Navigation Pattern

\`\`\`css
.nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.nav-links {
  display: none;
  width: 100%;
  flex-direction: column;
}

.nav-links.active {
  display: flex;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
    width: auto;
    flex-direction: row;
  }
  
  .nav-toggle {
    display: none;
  }
}
\`\`\`

## Modern CSS Units

### Viewport Units

\`\`\`css
/* Dynamic viewport height (accounts for mobile browser chrome) */
.hero {
  min-height: 100dvh;
}

/* Small viewport height (smallest possible viewport) */
.section {
  min-height: 100svh;
}

/* Large viewport height (largest possible viewport) */
.tall-section {
  min-height: 100lvh;
}
\`\`\`

### Logical Properties

Use logical properties for better internationalization support:

\`\`\`css
/* Instead of */
margin-left: 1rem;
padding-top: 2rem;
border-right: 1px solid gray;

/* Use */
margin-inline-start: 1rem;
padding-block-start: 2rem;
border-inline-end: 1px solid gray;
\`\`\`

## Responsive Design Testing

### Device Testing Checklist

Test on real devices when possible, not just browser DevTools. Check on various phone sizes (320px to 428px), tablets in portrait and landscape, laptops and desktops, and high-DPI (Retina) displays.

### Common Breakpoints

\`\`\`css
/* Common breakpoints in 2026 */
/* Small phones: 320px - 375px */
/* Large phones: 376px - 428px */
/* Tablets: 768px - 1024px */
/* Laptops: 1025px - 1440px */
/* Desktops: 1441px+ */
\`\`\`

However, design for content, not devices. Let the content determine where breakpoints should occur rather than targeting specific device sizes.

## Performance Considerations

Responsive design should not sacrifice performance:

\`\`\`css
/* Prefer CSS over JavaScript for responsive behavior */
/* Use CSS Grid/Flexbox instead of JS layout libraries */
/* Use srcset instead of loading all image sizes */
/* Use CSS custom properties for responsive values */

:root {
  --columns: 1;
}

@media (min-width: 768px) {
  :root { --columns: 2; }
}

@media (min-width: 1024px) {
  :root { --columns: 3; }
}

.grid {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
}
\`\`\`

## Accessibility in Responsive Design

Responsive design and accessibility go hand in hand:

\`\`\`css
/* Ensure touch targets are at least 44x44px on mobile */
button, a {
  min-height: 44px;
  min-width: 44px;
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Support high contrast mode */
@media (prefers-contrast: high) {
  :root {
    --border-color: black;
    --text-color: black;
    --bg-color: white;
  }
}
\`\`\`

## Summary

Modern responsive design goes far beyond media queries. Fluid typography with clamp(), intrinsic layouts with CSS Grid, container queries, and modern viewport units create designs that adapt naturally to any screen. Start mobile-first, use fluid values, let content drive breakpoints, and test on real devices. The goal is not pixel-perfect reproduction across devices but providing an optimal experience on every screen.`,
  },
  {
    id: "20",
    slug: "debugging-strategies-for-developers",
    title: "Debugging Strategies: How to Find and Fix Bugs Efficiently",
    excerpt:
      "Stop wasting hours on bugs. Learn systematic debugging strategies, essential tools, and mental models for finding and fixing issues fast.",
    category: "Best Practices",
    tags: ["Debugging", "Problem Solving", "Developer Tools", "Best Practices"],
    author: "Dhethi Team",
    date: "2024-12-21",
    readTime: "9 min read",
    featured: false,
    metaDescription:
      "Learn systematic debugging strategies for faster bug resolution. Master browser DevTools, logging, binary search debugging, and common bug patterns.",
    content: `Every developer spends a significant portion of their time debugging. The difference between an efficient debugger and a frustrated one is not intelligence but strategy. Debugging is a skill that can be learned and improved with practice and the right mental models.

## The Debugging Mindset

Before diving into techniques, understand the fundamental truth about debugging: the code is doing exactly what you told it to do. Bugs occur because there is a gap between what you intended and what you wrote. Your job is to find that gap.

Resist the urge to immediately start changing code. Instead, slow down and understand the problem first. Random changes based on hunches lead to more bugs, not fewer.

## Step 1: Reproduce the Bug

You cannot fix what you cannot reproduce. Before doing anything else, establish a reliable way to trigger the bug:

Ask specific questions: What were the exact steps? What data was being used? What environment is this happening in? Is it consistent or intermittent?

\`\`\`javascript
// Create a minimal reproduction
// Instead of debugging the entire application:
const testData = {
  user: { name: "John", email: "invalid-email" },
  items: [{ price: -5, quantity: 0 }]
};

// Call the specific function that fails
const result = processOrder(testData);
console.log(result);
\`\`\`

If you cannot reproduce the bug, add logging to gather more information about when and how it occurs.

## Step 2: Understand the Expected vs Actual Behavior

Clearly define two things: what should happen and what actually happens.

\`\`\`
Expected: User submits form → data saves to database → success message appears
Actual: User submits form → loading spinner appears → nothing happens → no error shown
\`\`\`

The more specific you are about the discrepancy, the easier it is to find the cause.

## Step 3: Form a Hypothesis

Based on the symptoms, hypothesize about the cause. Consider the most likely explanations first:

Was this code recently changed? Has the data format changed? Are external dependencies available? Is this an environment-specific issue?

## Step 4: Test Your Hypothesis

Use the appropriate tools to verify or disprove your hypothesis.

### Console Logging (Strategic)

\`\`\`javascript
// Bad: console.log everywhere
console.log("here");
console.log("here2");
console.log(data);

// Good: structured, informative logging
console.log("[processOrder] Input:", JSON.stringify(order, null, 2));
console.log("[processOrder] Validation result:", isValid);
console.log("[processOrder] Calculated total:", total);
console.log("[processOrder] API response:", response.status, response.data);
\`\`\`

### Browser DevTools

The browser's developer tools are incredibly powerful:

The Console shows errors, warnings, and your log output. The Network tab reveals API calls, their request and response data, status codes, and timing. The Sources tab lets you set breakpoints, step through code, and inspect variables. The Elements tab shows the current DOM state and computed styles.

### Debugger Statements

\`\`\`javascript
function processPayment(amount, method) {
  debugger; // Execution pauses here when DevTools is open
  
  const fee = calculateFee(amount, method);
  const total = amount + fee;
  
  return chargePayment(total, method);
}
\`\`\`

When execution pauses, you can inspect all variables, step through line by line, and evaluate expressions in the console.

### Breakpoints

Use conditional breakpoints in DevTools for more targeted debugging:

Right-click a line number in the Sources tab and select "Add conditional breakpoint." Enter a condition like \`userId === 42\` to pause only when that condition is true.

## Binary Search Debugging

When you do not know where the bug is, use binary search. Comment out or add logging to the middle of the suspected code range. If the bug persists, the cause is in the remaining code. If it disappears, the cause is in the removed section. Repeat, narrowing the range each time.

\`\`\`javascript
async function complexProcess() {
  const data = await fetchData();        // Step 1
  const transformed = transform(data);    // Step 2
  const validated = validate(transformed); // Step 3
  const enriched = enrich(validated);     // Step 4
  const result = save(enriched);          // Step 5
  return result;
}

// Binary search: add logging after step 3
// If data is correct at step 3, bug is in steps 4-5
// If data is wrong at step 3, bug is in steps 1-3
\`\`\`

## Common Bug Patterns

Recognizing common patterns speeds up debugging:

### Off-by-One Errors

\`\`\`javascript
// Bug: misses the last element
for (let i = 0; i < array.length - 1; i++) { }

// Fix:
for (let i = 0; i < array.length; i++) { }
\`\`\`

### Null/Undefined References

\`\`\`javascript
// Bug: crashes if user.address is undefined
const city = user.address.city;

// Fix: optional chaining
const city = user?.address?.city;
\`\`\`

### Async Timing Issues

\`\`\`javascript
// Bug: using data before it is loaded
const data = fetchData(); // Missing await!
console.log(data.length); // Error: data is a Promise

// Fix:
const data = await fetchData();
console.log(data.length);
\`\`\`

### State Mutation

\`\`\`javascript
// Bug: mutating state directly in React
const handleAdd = (item) => {
  items.push(item); // Direct mutation
  setItems(items);  // Same reference, no re-render
};

// Fix: create new array
const handleAdd = (item) => {
  setItems([...items, item]);
};
\`\`\`

### Scope and Closure Issues

\`\`\`javascript
// Bug: all callbacks reference the same variable
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 5, 5, 5, 5, 5

// Fix: use let
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 0, 1, 2, 3, 4
\`\`\`

## Rubber Duck Debugging

Explain the problem out loud, step by step, as if explaining to someone who knows nothing about your code. The act of verbalizing your assumptions often reveals the flaw. You do not need an actual rubber duck. A colleague, a notebook, or even an empty room works.

The key is being thorough: explain what each line does, what data it operates on, and what you expect to happen. Often, you will hear yourself say something that does not sound right, and that is where the bug is.

## Git Bisect

When a bug was introduced at some unknown point in the commit history, use \`git bisect\`:

\`\`\`bash
git bisect start
git bisect bad              # Current commit has the bug
git bisect good abc123      # This commit was working

# Git checks out a commit in the middle
# Test it, then mark:
git bisect good             # or
git bisect bad

# Repeat until Git finds the exact commit
git bisect reset            # When done
\`\`\`

## Prevention Is Better Than Cure

The best debugging strategy is preventing bugs in the first place:

Write tests that catch regressions. Use TypeScript for type safety. Use linters to catch common mistakes. Review code before merging. Add input validation at system boundaries. Use error boundaries in React to catch rendering errors.

## When to Ask for Help

If you have spent more than 30 minutes on a bug without making progress, it is time to get a fresh perspective. Describe the problem clearly, share what you have already tried, and provide reproduction steps. Often, a fresh pair of eyes will spot what you have been overlooking.

## Summary

Effective debugging is systematic, not random. Reproduce the bug, understand the expected versus actual behavior, form and test hypotheses, and use the right tools. Learn to recognize common bug patterns and use binary search to narrow down elusive issues. Most importantly, resist the temptation to randomly change code. Take a step back, think clearly, and approach the problem methodically. Debugging is a skill that improves with practice, and every bug you fix teaches you something new.`,
  },
  {
    id: "21",
    slug: "mastering-typescript-generics",
    title: "Mastering TypeScript Generics: Write Reusable, Type-Safe Code",
    excerpt:
      "Unlock the full power of TypeScript with generics. Learn how to write flexible, reusable functions and components while maintaining complete type safety.",
    category: "JavaScript",
    tags: ["TypeScript", "Generics", "Type Safety", "JavaScript"],
    author: "Dhethi Team",
    date: "2026-04-03",
    readTime: "9 min read",
    featured: true,
    metaDescription:
      "Learn TypeScript generics from scratch. Understand generic functions, interfaces, classes, constraints, and utility types with practical examples for real-world development.",
    content: `TypeScript generics are one of the most powerful features the language has to offer. They allow you to write code that is both flexible and type-safe, eliminating the need to choose between reusability and correctness. If you have been avoiding generics because they look intimidating, this guide will change your mind.

## What Are Generics?

Generics allow you to write functions, interfaces, and classes that work with a variety of types while still preserving type information. Think of them as type-level variables. Where a regular variable holds a value, a generic type parameter holds a type.

Without generics, you face a dilemma. Either you write a function that accepts \`any\`, losing type safety, or you write multiple overloaded versions of the same function for each type. Generics solve both problems.

\`\`\`typescript

  // Without generics - loses type information
  function identity(value: any): any {
    return value;
  }

  const result = identity(42);
  // result is 'any' - TypeScript cannot help you here

  // With generics - preserves type information
  function identity<T>(value: T): T {
    return value;
  }

  const result = identity(42);
  // result is inferred as 'number' - full type safety!
  
\`\`\`

The \`<T>\` syntax declares a type parameter named \`T\`. When you call the function, TypeScript infers what \`T\` should be based on the argument you pass.

## Generic Functions

Generic functions are the most common use of generics. Let us look at several practical examples.

### A Type-Safe Array Wrapper

\`\`\`typescript

  function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
  }

  const firstNum = firstElement([1, 2, 3]);     // number | undefined
  const firstStr = firstElement(["a", "b"]);    // string | undefined
  const firstBool = firstElement([true, false]); // boolean | undefined

\`\`\`

### Multiple Type Parameters

You can use multiple type parameters when a function works with more than one type:

\`\`\`typescript

  function pair<K, V>(key: K, value: V): [K, V] {
    return [key, value];
  }

  const entry = pair("name", "Alice");
  // Type is [string, string]

  const indexed = pair(1, { label: "item" });
  // Type is [number, { label: string }]

\`\`\`

### Mapping and Transforming

\`\`\`typescript

  function mapArray<T, U>(arr: T[], transform: (item: T) => U): U[] {
    return arr.map(transform);
  }

  const lengths = mapArray(["hello", "world"], (s) => s.length);
  // lengths is number[]

  const doubled = mapArray([1, 2, 3], (n) => n * 2);
  // doubled is number[]
  
\`\`\`

## Generic Interfaces

Interfaces can also be generic, making them incredibly flexible building blocks.

\`\`\`typescript

  interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    timestamp: Date;
  }

  interface User {
    id: number;
    name: string;
    email: string;
  }

  interface Product {
    id: number;
    title: string;
    price: number;
  }

  // Fully typed API responses
  const userResponse: ApiResponse<User> = {
    data: { id: 1, name: "Alice", email: "alice@example.com" },
    status: 200,
    message: "Success",
    timestamp: new Date(),
  };

  const productResponse: ApiResponse<Product[]> = {
    data: [{ id: 1, title: "Laptop", price: 999 }],
    status: 200,
    message: "Success",
    timestamp: new Date(),
  };

\`\`\`

### Generic Repository Pattern

\`\`\`typescript

  interface Repository<T, ID> {
    findById(id: ID): Promise<T | null>;
    findAll(): Promise<T[]>;
    save(entity: T): Promise<T>;
    delete(id: ID): Promise<void>;
  }

  class UserRepository implements Repository<User, number> {
    async findById(id: number): Promise<User | null> {
      // Implementation
      return null;
    }
    async findAll(): Promise<User[]> {
      return [];
    }
    async save(user: User): Promise<User> {
      return user;
    }
    async delete(id: number): Promise<void> {}
  }

\`\`\`

## Generic Classes

Classes can accept generic type parameters, enabling powerful abstractions.

\`\`\`typescript

  class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
      this.items.push(item);
    }

    pop(): T | undefined {
      return this.items.pop();
    }

    peek(): T | undefined {
      return this.items[this.items.length - 1];
    }

    get size(): number {
      return this.items.length;
    }

    isEmpty(): boolean {
      return this.items.length === 0;
    }
  }

  const numStack = new Stack<number>();
  numStack.push(1);
  numStack.push(2);
  console.log(numStack.pop()); // 2 (type: number)

  const strStack = new Stack<string>();
  strStack.push("hello");
  // strStack.push(42); // Error! Only strings allowed
  
\`\`\`

## Generic Constraints

Sometimes you need to restrict what types can be used as a generic parameter. That is where constraints come in using the \`extends\` keyword.

\`\`\`typescript
// T must have a 'length' property
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

getLength("hello");        // Works: strings have .length
getLength([1, 2, 3]);      // Works: arrays have .length
getLength({ length: 10 }); // Works: object has .length
// getLength(42);           // Error! numbers have no .length
\`\`\`

### Constraining to Object Keys

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 30, city: "NYC" };

const name = getProperty(person, "name"); // string
const age = getProperty(person, "age");   // number
// getProperty(person, "email"); // Error! 'email' is not a key of person
\`\`\`

### Multiple Constraints

\`\`\`typescript
interface Serializable {
  serialize(): string;
}

interface Identifiable {
  id: string | number;
}

function saveEntity<T extends Serializable & Identifiable>(entity: T): void {
  console.log(\`Saving entity \${entity.id}: \${entity.serialize()}\`);
}
\`\`\`

## Default Type Parameters

TypeScript supports default values for type parameters, similar to default function parameters:

\`\`\`typescript
interface PaginatedList<T, Cursor = string> {
  items: T[];
  nextCursor: Cursor | null;
  totalCount: number;
}

// Uses default cursor type (string)
const list: PaginatedList<User> = {
  items: [],
  nextCursor: "abc123",
  totalCount: 100,
};

// Override cursor type to number
const numCursorList: PaginatedList<User, number> = {
  items: [],
  nextCursor: 42,
  totalCount: 50,
};
\`\`\`

## Conditional Types with Generics

Conditional types take generics to the next level, allowing types that depend on other types.

\`\`\`typescript
type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<string[]>;  // true
type B = IsArray<number>;    // false

// Extract the element type from an array
type ElementType<T> = T extends (infer U)[] ? U : never;

type StrElement = ElementType<string[]>;  // string
type NumElement = ElementType<number[]>;  // number
type Never = ElementType<boolean>;        // never
\`\`\`

## Built-In Utility Types (Powered by Generics)

TypeScript ships with many built-in utility types that are implemented using generics. Understanding the pattern helps you create your own.

\`\`\`typescript
// Partial<T> - makes all properties optional
type Partial<T> = { [K in keyof T]?: T[K] };

// Required<T> - makes all properties required
type Required<T> = { [K in keyof T]-?: T[K] };

// Readonly<T> - makes all properties readonly
type Readonly<T> = { readonly [K in keyof T]: T[K] };

// Pick<T, K> - picks a subset of properties
type Pick<T, K extends keyof T> = { [P in K]: T[P] };

// Record<K, V> - creates a type with keys K and values V
type Record<K extends keyof any, V> = { [P in K]: V };
\`\`\`

### Practical Usage

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Only update some fields - no field is required
function updateUser(id: number, updates: Partial<User>): Promise<User> {
  // Implementation
  return Promise.resolve({ id, name: "", email: "", age: 0, ...updates });
}

// Only expose public-facing fields
type PublicUser = Pick<User, "id" | "name">;

// Map user IDs to users
const userCache: Record<number, User> = {};
\`\`\`

## Creating Your Own Utility Types

Once you understand the patterns, you can write powerful utility types for your domain:

\`\`\`typescript
// Make certain keys required, leave others optional
type RequireFields<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type UserWithRequiredEmail = RequireFields<Partial<User>, "email">;
// email is required, all other fields optional

// Deep partial - make nested types optional too
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

// Nullable<T> - add null to a type
type Nullable<T> = T | null;

type MaybeUser = Nullable<User>;
\`\`\`

## Real-World Example: A Type-Safe Event Emitter

\`\`\`typescript

  type EventMap = Record<string, any>;

  class TypedEventEmitter<Events extends EventMap> {
    private listeners: {
      [K in keyof Events]?: Array<(data: Events[K]) => void>;
    } = {};

    on<K extends keyof Events>(
      event: K,
      listener: (data: Events[K]) => void
    ): void {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event]!.push(listener);
    }

    emit<K extends keyof Events>(event: K, data: Events[K]): void {
      this.listeners[event]?.forEach((listener) => listener(data));
    }
  }

  // Define your event types
  interface AppEvents {
    login: { userId: string; timestamp: Date };
    logout: { userId: string };
    error: { message: string; code: number };
  }

  const emitter = new TypedEventEmitter<AppEvents>();

  emitter.on("login", ({ userId, timestamp }) => {
    console.log(\`User \${userId} logged in at \${timestamp}\`);
  });

  emitter.emit("login", { userId: "u123", timestamp: new Date() });
  // emitter.emit("login", { userId: 42 }); // Error! userId must be string

\`\`\`

## Common Pitfalls

### Over-Constraining Too Early

Avoid adding constraints before you know you need them. Start generic, add constraints as the compiler tells you they are needed.

### Using \`any\` as a Constraint Escape Hatch

If you find yourself writing \`<T extends any>\`, you have lost the benefit of generics entirely. Revisit your design instead.

### Overly Complex Nested Generics

Deeply nested generic types become hard to read and reason about. If your type definition spans more than two or three levels deep, consider breaking it into named intermediate types.

## Summary

TypeScript generics transform the way you write reusable code. Generic functions preserve type information through transformations. Generic interfaces define flexible contracts. Generic classes create type-safe data structures. Constraints ensure your generics are used correctly. Built-in and custom utility types give you powerful tools for type manipulation.

The key insight is that generics are not magic. They are simply variables for types, following the same logical patterns as regular code. Once you internalize that mental model, complex generic signatures become readable specifications. Start applying generics in your own code whenever you find yourself writing similar logic for different types, and your TypeScript will become dramatically more expressive and safe.`,
  },
  {
    id: "22",
    slug: "how-to-setup-claude-api-and-earn-money-2026",
    title: "How to Set Up the Claude API and Earn Money With It in 2026",
    excerpt:
      "Anthropic's Claude is exploding with new capabilities in 2026. Learn the latest news, how to get started with the API in minutes, and the most profitable ways to monetize it.",
    category: "Career",
    tags: ["Claude", "Anthropic", "AI", "API", "Make Money", "SaaS"],
    author: "Dhethi Team",
    date: "2026-04-03",
    readTime: "11 min read",
    featured: true,
    metaDescription:
      "Learn how to set up the Anthropic Claude API and build a profitable business around it in 2026. Covers the latest model releases (Claude Opus 4.6, Sonnet 4.6, Claude Mythos), step-by-step API setup, and proven monetization strategies.",
    content: `Anthropic has had a remarkable start to 2026. With the release of Claude Opus 4.6 and Claude Sonnet 4.6 in February, the reveal of the secretive Claude Mythos model, a 1-million-token context window now generally available to everyone, and the launch of Claude Code's computer-use capabilities, there has never been a better time to build something on top of Claude and turn it into income.

This guide covers what is new, how to get set up in minutes, and the most practical paths to earning real money with Anthropic's API today.

## What Is New With Claude in April 2026?

Before we dive into setup, here is a quick snapshot of the developments that make Claude especially powerful right now.

### Claude Opus 4.6 and Claude Sonnet 4.6

Anthropic launched Claude Opus 4.6 on February 5, 2026, followed by Claude Sonnet 4.6 on February 17, 2026. These are not minor point releases. Both models deliver significant improvements in reasoning, coding, and instruction-following. For developers, the headline change is the 1-million-token context window now available at standard pricing, with no extra long-context surcharge. You no longer have to choose between a large context and an affordable API bill.

The pricing is straightforward:

| Model             | Input (per 1M tokens) | Output (per 1M tokens) |
| ----------------- | --------------------- | ---------------------- |
| Claude Opus 4.6   | $5.00                 | $25.00                 |
| Claude Sonnet 4.6 | $3.00                 | $15.00                 |


Two cost optimizations are also available. Prompt caching can cut costs by up to 90 percent on repeated context, and the Batch API offers a 50 percent discount on asynchronous workloads. If your application re-sends large system prompts repeatedly, these features alone can make a previously unprofitable product viable.

### Claude Mythos: Anthropic's Most Capable Model Yet

A configuration error in late March accidentally exposed unpublished internal documents, through which Anthropic confirmed the existence of **Claude Mythos**. Described internally as the company's most capable system to date, Mythos reportedly delivers major leaps in reasoning, coding, and cybersecurity analysis. No public release date has been announced yet, but early access programs are expected to open to enterprise customers first. Staying on the waiting list now could give your business a significant early-mover advantage.

### Claude Code Gets Computer Use

Claude Code, Anthropic's agentic coding tool, received a game-changing update in late March 2026: **computer use**. Claude can now see your screen, move the mouse, click buttons, type text, open files, run terminal commands, and navigate any desktop or browser application. This works across macOS and, as of early April, Windows as well.

This makes Claude Code far more useful than a traditional code assistant. It can work inside GUIs where no API exists, fill out legacy forms, manage cross-application workflows, and run as a persistent agent that you can assign tasks from your phone while Claude works on your desktop. The feature is available to Claude Pro and Max subscribers.

### Increased Token Limits for Batch API

Anthropic has also raised the \`max_tokens\` cap on the Message Batches API to 300,000 for Claude Opus 4.6 and Claude Sonnet 4.6, accessible via the \`output-300k-2026-03-24\` beta header. This is significant for anyone building document-processing pipelines or large-scale content-generation systems.

---

## Step-by-Step: Setting Up the Claude API

Getting started takes about ten minutes.

### Step 1: Create an Anthropic Account

Go to [console.anthropic.com](https://console.anthropic.com) and sign up with your email or Google account. During onboarding you will be asked about your intended use case. Be honest but broad here so your account is not unnecessarily restricted.

### Step 2: Add a Payment Method

Before making any API calls you need to add a credit card. Navigate to **Settings → Billing**. At this point, immediately set a monthly spending limit. Even $20 is enough to experiment extensively. This protects you from runaway costs during development.

### Step 3: Generate an API Key

In the left sidebar, click **API Keys → Create Key**. Give it a descriptive name such as \`production-app\` or \`local-dev\`. Copy the key immediately since Anthropic will not show it again. Store it in a \`.env\` file or a secrets manager. Never commit it to a public repository.

### Step 4: Install the SDK

For Node.js and TypeScript projects:

\`\`\`bash

  npm install @anthropic-ai/sdk

\`\`\`

For Python projects:

\`\`\`bash

  pip install anthropic

\`\`\`

### Step 5: Make Your First API Call

Here is a minimal Node.js example that calls Claude Sonnet 4.6:

\`\`\`javascript 

  import Anthropic from "@anthropic-ai/sdk";
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  async function main() {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: "Explain how compound interest works in two sentences.",
        },
      ],
    });
    console.log(message.content[0]);
  }
  main();

\`\`\`

And the Python equivalent:

\`\`\`python

  import anthropic
  client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY from env
  message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Explain compound interest in two sentences."}],
    )
  print(message.content[0].text)

\`\`\`

Both examples will produce a response within seconds. You are now integrated with one of the most powerful AI APIs in the world.

### Step 6: Leverage the 1M Token Context Window

The 1-million-token context window is available by default on Opus 4.6 and Sonnet 4.6. A practical way to use it:

\`\`\`typescript

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: "You are a financial analyst. Analyze the following annual reports thoroughly.",
    messages: [
      {
        role: "user",
        // You can now pass entire codebases, legal documents, or full books here
        content: massiveDocumentString,
      },
    ],
  });
  
\`\`\`

### Step 7: Cut Costs with Prompt Caching

If your application sends the same large system prompt or document repeatedly, enable prompt caching:

\`\`\`typescript

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: [
      {
        type: "text",
        text: "You are a legal document analyst...",
        cache_control: { type: "ephemeral" }, // This section is cached
      },
    ],
    messages: [{ role: "user", content: userQuestion }],
  });

\`\`\`

Cached tokens cost 90 percent less than standard input tokens, turning expensive repeated calls into affordable ones.

---

## How to Earn Money With Claude in 2026

Now for the part that matters. Here are the highest-potential monetization paths, ranked by realistic earning potential for a solo developer or small team.

### 1. Build a Niche SaaS Product

The biggest opportunity is building a narrow, specialized product that solves one expensive problem for a specific audience. Generic "AI writing tools" are saturated. Niche tools are not.

**High-value niches to consider:**

- **Legal document review**: Law firms pay thousands per month for software that can review contracts using a 1M token context window.
- **Medical record summarization**: Clinics and hospitals have enormous documentation loads that Claude can summarize and structure.
- **Code review assistant**: Use Claude's coding improvements to build a PR review bot that integrates with GitHub or GitLab.
- **E-commerce copywriter**: Product description generation at scale for large online stores with hundreds of SKUs.
- **Compliance and audit tools**: Regulated industries (finance, healthcare, manufacturing) will pay a premium for AI-assisted compliance checking.

**Monetization model**: Monthly subscriptions tiered by usage (Starter / Professional / Enterprise). Aim for recurring revenue rather than one-time payments.

### 2. Build and Sell Claude Code Automations

With Claude Code's new computer-use capabilities, you can build automation workflows that operate like a human sitting at a computer. This opens up:

- Legacy system data entry (systems with no API)
- Cross-application reporting (pulling data from one tool, formatting it in another)
- Automated GUI testing
- Scheduled research and reporting tasks using the \`/loop\` feature

**Monetization model**: Sell pre-built automation templates or offer a "done-for-you" setup service for businesses. Monthly retainer for ongoing maintenance.

### 3. Consulting and Implementation Services

Many businesses want Claude integrated into their workflows but do not have the technical expertise to do it. You can charge handsomely for:

- **API Integration**: Setting up Claude in a business's internal tools or CRM
- **Prompt Engineering**: Writing and testing production-quality system prompts for a company's specific use case
- **RAG Systems**: Building Retrieval-Augmented Generation pipelines that connect Claude to a company's internal knowledge base

**Rate**: Experienced AI consultants are currently charging $150 to $300 per hour for this work. Even at the low end, ten hours a week is a meaningful income stream.

### 4. Freelancing at Scale

If you already freelance in writing, software development, or data analysis, Claude can dramatically increase your throughput. You can take on three times as many clients if Claude handles research, first drafts, and boilerplate code while you handle the final polish and client communication.

This is not about replacing your skills. It is about using Claude as a force multiplier so you can charge more and deliver faster.

### 5. Content Platforms and Affiliate Funnels

The 1M token context window makes it practical to have Claude deeply analyze a topic before generating authoritative content. You can build content sites in high-value niches (finance, health, legal) where Claude generates well-researched articles that rank in search engines and monetize through affiliate marketing or display advertising.

This is a longer-term play but can produce passive income once articles gain organic traffic.

---

## Tips for Building a Profitable Claude-Powered Business

**Start smaller than you think you should.** Build an MVP in a weekend, get it in front of five to ten real users, and listen to what they say before investing weeks of development time.

**Solve a painful problem, not a convenient one.** The best Claude products address problems where a business is currently paying someone a significant amount of time or money. If you can automate even 60 percent of that work, you have a product worth paying for.

**Price on value, not on tokens.** Your cost per API call is irrelevant to your customer. They care about time saved or risk reduced. A tool that saves a lawyer two hours a week is worth hundreds of dollars per month, not the $0.30 it costs you in API fees.

**Handle security seriously from day one.** Store API keys in environment variables and never in source code. If you handle user data, understand your obligations under GDPR, CCPA, or HIPAA depending on your market. Anthropic's enterprise agreements include data processing agreements for regulated industries.

**Watch for Claude Mythos.** When Anthropic opens early access to Claude Mythos, its most capable model yet, getting in early on reasoning and cybersecurity capabilities could unlock entirely new product categories. Subscribe to Anthropic's newsletter and monitor the console for announcements.

---

## Summary

Anthropic is moving fast in 2026. Claude Opus 4.6 and Sonnet 4.6 are the strongest models the company has shipped, the 1M token context window is now free to use at standard rates, Claude Code can now operate your entire computer, and the mysterious Claude Mythos is waiting in the wings.

For developers and entrepreneurs, this is an exceptional moment. The API is easy to set up, the pricing is competitive, and businesses are actively looking for people who can integrate these capabilities into real workflows. Pick a niche, build something small, charge for it, and iterate. The opportunity is here right now.`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  return blogPosts
    .filter(
      (post) => post.slug !== currentSlug && post.category === current.category,
    )
    .slice(0, limit);
}

export function getAllCategories(): string[] {
  return categories;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
