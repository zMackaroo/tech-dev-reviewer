import type { InterviewQuestion } from '../../types'

export const functionsQuestions: InterviewQuestion[] = [
  {
    id: 28,
    category: 'Functions',
    question: 'What is a closure in JavaScript?',
    answer: 'A closure is formed when an inner function retains access to variables from its outer lexical scope, even after the outer function has finished executing. The inner function "closes over" those variables, keeping them alive in memory. Closures enable private state, factory functions, and callbacks that remember context.',
    code: `function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2`,
    demo: 'closure-counter',
  },
  {
    id: 29,
    category: 'Functions',
    question: 'What is the difference between arrow functions and regular functions?',
    answer: 'Regular functions have their own dynamic this binding, an arguments object, can be used as constructors with new, and have a prototype property. Arrow functions inherit this lexically from the enclosing scope, have no arguments object, cannot be used with new, and are ideal for short callbacks. This difference causes the most bugs when passing methods as event handlers.',
    code: `const obj = {
  name: "Test",
  regular: function() { return this.name; },
  arrow: () => this?.name ?? "no this",
};
console.log(obj.regular()); // "Test"
console.log(obj.arrow());   // "no this"`,
    demo: 'this-binding',
  },
  {
    id: 30,
    category: 'Functions',
    question: 'What are the rules of "this" binding?',
    answer: 'this in JavaScript is determined by how a function is called, not where it is defined. Default binding applies to standalone calls (global or undefined in strict mode); implicit binding applies when called as obj.method(); explicit binding uses call, apply, or bind to set this manually; new binding creates a fresh object when used with new. Arrow functions ignore these rules and capture this from the surrounding scope.',
    code: `function show() { return this.val; }
const o = { val: 42, show };
console.log(o.show());        // 42 implicit
console.log(show.call({ val: 99 })); // 99 explicit`,
    output: ['42', '99'],
  },
  {
    id: 31,
    category: 'Functions',
    question: 'What is the difference between call, apply, and bind?',
    answer: 'call and apply both invoke a function immediately with a specified this value—the difference is call takes arguments individually while apply takes them as an array. bind does not invoke the function; it returns a new function with this permanently bound and optional partial arguments pre-filled. All three let you borrow methods or fix context when a function is passed as a callback.',
    code: `function greet(greeting, punct) {
  return \`\${greeting}, \${this.name}\${punct}\`;
}
const person = { name: "Alice" };
console.log(greet.call(person, "Hello", "!"));
console.log(greet.apply(person, ["Hi", "."]));
const bound = greet.bind(person, "Hey");
console.log(bound("?"));`,
    output: ['Hello, Alice!', 'Hi, Alice.', 'Hey, Alice?'],
  },
  {
    id: 32,
    category: 'Functions',
    question: 'What is currying?',
    answer: 'Currying transforms a function that takes multiple arguments into a series of functions that each take one argument and return the next function until all arguments are collected. It enables partial application and creates specialized reusable functions from general ones. While related to partial application, currying strictly returns nested unary functions.',
    code: `const add = (a) => (b) => (c) => a + b + c;
const add5 = add(5);
const add5and3 = add5(3);
console.log(add5and3(2)); // 10
console.log(add(1)(2)(3)); // 6`,
    demo: 'currying',
  },
  {
    id: 33,
    category: 'Functions',
    question: 'What is partial application?',
    answer: 'Partial application fixes some arguments of a function ahead of time, producing a new function that needs fewer arguments when called. Unlike currying, which always splits into one-argument steps, partial application can fix any number of arguments in any order using bind or a wrapper. This promotes reuse without rewriting the original function.',
    code: `function multiply(a, b, c) {
  return a * b * c;
}
const doubleFirst = multiply.bind(null, 2);
console.log(doubleFirst(3, 4)); // 2 * 3 * 4 = 24

const withPartial = (fn, ...fixed) =>
  (...rest) => fn(...fixed, ...rest);
console.log(withPartial(multiply, 2)(3, 4));`,
    output: ['24', '24'],
  },
  {
    id: 34,
    category: 'Functions',
    question: 'What is a higher-order function?',
    answer: 'A higher-order function either takes one or more functions as arguments, returns a function, or both. Built-in examples include map, filter, reduce, and forEach, which accept callback functions to customize behavior. HOFs are the foundation of functional patterns in JavaScript and keep logic composable and declarative.',
    code: `const nums = [1, 2, 3, 4];
const doubled = nums.map(n => n * 2);
const evens = nums.filter(n => n % 2 === 0);
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log(doubled, evens, sum);`,
    output: ['[2, 4, 6, 8]', '[2, 4]', '10'],
  },
  {
    id: 35,
    category: 'Functions',
    question: 'What is debouncing?',
    answer: 'Debouncing wraps a function so it only runs after a quiet period with no new calls within a specified delay. Each new trigger resets the timer, canceling the previous scheduled execution. This prevents expensive work from running on every keystroke or resize event.',
    code: `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
// Only executes after 300ms of no calls
const search = debounce((q) => console.log("Search:", q), 300);`,
    demo: 'debounce',
  },
  {
    id: 36,
    category: 'Functions',
    question: 'What is throttling?',
    answer: 'Throttling ensures a function runs at most once per time window, even if it is triggered continuously. Unlike debouncing, which waits for activity to stop, throttling fires on a steady cadence during ongoing events. This caps execution rate while still providing periodic updates.',
    code: `function throttle(fn, limit) {
  let inThrottle = false;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
const onScroll = throttle(() => console.log("scroll"), 200);`,
    output: ['Executes at most once per 200ms during scroll'],
  },
  {
    id: 37,
    category: 'Functions',
    question: 'What is recursion and when should you use it?',
    answer: 'Recursion is when a function calls itself to solve a problem by breaking it into smaller subproblems of the same type. Every recursive function needs a base case to stop the chain; without one, you get infinite recursion and a stack overflow. Recursion fits tree traversal, divide-and-conquer algorithms, and nested data structures naturally.',
    code: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5)); // 120

function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
console.log(fib(6)); // 8`,
    output: ['120', '8'],
  },
  {
    id: 38,
    category: 'Functions',
    question: 'What is memoization?',
    answer: 'Memoization caches the results of a function for specific inputs so repeated calls with the same arguments return instantly without recomputing. It trades memory for speed and works best on pure functions where output depends only on input. Dynamic programming and expensive calculations like Fibonacci benefit greatly from memoization.',
    code: `function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
const fib = memoize(function f(n) {
  if (n <= 1) return n;
  return f(n-1) + f(n-2);
});
console.log(fib(40)); // fast!`,
    output: ['102334155'],
  },
  {
    id: 39,
    category: 'Functions',
    question: 'What is the rest parameter vs the arguments object?',
    answer: 'The rest parameter (...args) collects remaining function arguments into a real Array, supporting array methods like reduce directly. The legacy arguments object is array-like—not a true array—and is not available in arrow functions at all. Rest parameters also pair cleanly with destructuring and default values in modern ES6+ syntax.',
    code: `function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

function legacy() {
  return Array.from(arguments).length;
}
console.log(legacy(1, 2, 3)); // 3`,
    output: ['10', '3'],
  },
]
