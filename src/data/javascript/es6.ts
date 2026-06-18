import type { InterviewQuestion } from '../../types'

export const es6Questions: InterviewQuestion[] = [
  {
    id: 72,
    category: 'ES6+',
    question: 'What is destructuring assignment?',
    answer: 'Destructuring assignment lets you unpack values from arrays or properties from objects into separate variables in a single statement. It supports default values, rest patterns, and nested unpacking, which cuts down on repetitive dot notation and index access.',
    code: `const [a, b, ...rest] = [1, 2, 3, 4];
const { name, age = 18 } = { name: "Alice" };
console.log(a, b, rest, name, age);`,
    output: ['1', '2', '[3, 4]', 'Alice', '18'],
  },
  {
    id: 73,
    category: 'ES6+',
    question: 'What is the spread operator (...)?',
    answer: 'The spread operator expands an iterable (like an array or object) into individual elements or key-value pairs. You can use it to copy collections, merge them, or pass array elements as separate function arguments without mutating the original. It matters because it gives you a concise, immutable way to combine data — a pattern you will use constantly in modern JavaScript.',
    code: `const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];
const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 };
console.log(arr2, obj2);`,
    output: ['[1, 2, 3, 4]', '{ a: 1, b: 2 }'],
  },
  {
    id: 74,
    category: 'ES6+',
    question: 'What are default parameters?',
    answer: 'Default parameters let you assign fallback values to function arguments when `undefined` is passed — note that `null` does not trigger the default. The default expression is evaluated at call time, not at definition time, so it can reference other parameters.',
    code: `function greet(name = "Guest", punct = "!") {
  return \`Hello, \${name}\${punct}\`;
}
console.log(greet());
console.log(greet("Bob", "?"));`,
    output: ['Hello, Guest!', 'Hello, Bob?'],
  },
  {
    id: 75,
    category: 'ES6+',
    question: 'What are ES6 modules (import/export)?',
    answer: 'ES modules provide a static `import`/`export` syntax for splitting code into separate files with explicit dependencies. Because imports are resolved at parse time, bundlers can tree-shake unused exports and load only what your app needs. Modules run in strict mode automatically, and each file has its own scope, which prevents accidental global pollution.',
    code: `// math.js
// export const add = (a, b) => a + b;
// export default function multiply(a, b) { return a * b; }

// app.js
// import multiply, { add } from './math.js';
console.log("Modules are statically analyzable");`,
    output: ['Modules are statically analyzable'],
  },
  {
    id: 76,
    category: 'ES6+',
    question: 'What is a generator function?',
    answer: 'A generator function (`function*`) returns a special iterator that can pause execution with `yield` and resume when `.next()` is called. Each `yield` produces a value without running the entire function at once, making generators ideal for lazy sequences and custom iteration. They matter because they give you fine-grained control over iteration flow — something async/await built upon before becoming the standard.',
    code: `function* range(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
for (const n of range(1, 3)) {
  console.log(n);
}`,
    output: ['1', '2', '3'],
  },
  {
    id: 77,
    category: 'ES6+',
    question: 'What is the nullish coalescing operator (??)?',
    answer: 'The nullish coalescing operator (`??`) returns the right-hand value only when the left side is `null` or `undefined`, leaving other falsy values like `0`, `""`, and `false` untouched. This is different from `||`, which treats every falsy value as a reason to use the fallback. It matters because using `||` for defaults silently overwrites legitimate values — a common source of bugs in forms and configuration.',
    code: `console.log(0 ?? 42);        // 0
console.log(null ?? 42);     // 42
console.log("" ?? "default"); // ""
console.log(undefined ?? "x"); // "x"
console.log(0 || 42);         // 42`,
    output: ['0', '42', '""', 'x', '42'],
  },
  {
    id: 78,
    category: 'ES6+',
    question: 'What is optional chaining with nullish coalescing?',
    answer: 'Optional chaining (`?.`) safely accesses nested properties and returns `undefined` instead of throwing when an intermediate value is nullish, while nullish coalescing (`??`) supplies a default when the result is `null` or `undefined`. Together they replace long chains of manual null checks with readable one-liners. This pattern matters whenever you consume external data — APIs, user profiles, or feature flags — where missing fields are normal, not exceptional.',
    code: `const config = { theme: { color: null } };
const color = config?.theme?.color ?? "blue";
const size = config?.layout?.width ?? 100;
console.log(color, size);`,
    output: ['blue', '100'],
  },
  {
    id: 79,
    category: 'ES6+',
    question: 'What are Map and Set?',
    answer: 'A `Map` is a key-value collection where keys can be any type — objects, functions, or primitives — not just strings like plain objects. A `Set` stores unique values and automatically deduplicates entries while preserving insertion order. Both provide a `.size` property and iteration methods that are cleaner than workarounds with plain objects or arrays.',
    code: `const map = new Map([["a", 1], ["b", 2]]);
const set = new Set([1, 2, 2, 3]);
console.log(map.get("a"));
console.log(set.size);
console.log([...set]);`,
    output: ['1', '3', '[1, 2, 3]'],
  },
  {
    id: 80,
    category: 'ES6+',
    question: 'What is WeakMap and WeakSet?',
    answer: 'WeakMap and WeakSet hold weak references to objects, meaning they do not prevent garbage collection when nothing else references those objects. Keys in a WeakMap must be objects, and neither structure supports iteration or a `.size` property. They matter when you need to attach metadata to objects without creating memory leaks — a problem regular Maps cause if you forget to delete entries.',
    code: `const wm = new WeakMap();
let obj = { id: 1 };
wm.set(obj, "metadata");
console.log(wm.get(obj));
obj = null; // metadata can be GC'd`,
    output: ['metadata'],
  },
  {
    id: 81,
    category: 'ES6+',
    question: 'What are Proxy and Reflect?',
    answer: 'A `Proxy` wraps an object and intercepts operations like property reads, writes, and deletes through handler traps, letting you customize behavior transparently. `Reflect` provides built-in methods that mirror those same operations and is commonly used inside Proxy traps to delegate to the original behavior. Together they enable metaprogramming patterns such as validation, logging, and reactive data binding.',
    code: `const handler = {
  get(target, prop) {
    return prop in target ? target[prop] : "N/A";
  },
};
const p = new Proxy({ name: "Alice" }, handler);
console.log(p.name, p.age);`,
    output: ['Alice', 'N/A'],
  },
  {
    id: 82,
    category: 'ES6+',
    question: 'What is the logical assignment (??=, ||=, &&=)?',
    answer: 'Logical assignment operators combine a conditional check with assignment in a single expression: `??=` assigns when the value is nullish, `||=` when it is falsy, and `&&=` when it is truthy. They are shorthand for patterns like `a = a ?? b` that appear frequently in initialization and configuration code. Knowing the distinction matters because `??=` preserves `0` and `""` while `||=` does not — picking the wrong one can introduce subtle bugs.',
    code: `let a = null;
a ??= 10;
let b = 0;
b ||= 20;
let c = 5;
c &&= 30;
console.log(a, b, c);`,
    output: ['10', '20', '30'],
  },
  {
    id: 83,
    category: 'ES6+',
    question: 'What are tagged template literals?',
    answer: 'Tagged template literals let you prefix a template string with a function that receives the string segments and interpolated values, and return any transformed result. The tag function has full control over how literals and expressions are combined, which goes far beyond simple string concatenation.',
    code: `function tag(strings, ...values) {
  return strings.reduce((acc, s, i) =>
    acc + s + (values[i] ?? ""), "");
}
const name = "World";
console.log(tag\`Hello \${name}!\`);`,
    output: ['Hello World!'],
  },
]
