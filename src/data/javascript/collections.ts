import type { InterviewQuestion } from '../../types'

export const collectionsQuestions: InterviewQuestion[] = [
  {
    id: 84,
    category: 'Arrays & Objects',
    question: 'What is the difference between map, filter, and reduce?',
    answer: '`map` transforms every element and returns a new array of the same length. `filter` keeps only elements that pass a test, returning a potentially shorter array. `reduce` accumulates all elements into a single value — a number, object, or even another array — using a callback and an initial accumulator. All three are non-mutating, which makes them safe for functional-style data pipelines. In a real app, you might filter active users, map them to email addresses, and reduce the list into a comma-separated string for a bulk notification.',
    code: `const nums = [1, 2, 3, 4];
console.log(nums.map(n => n * 2));
console.log(nums.filter(n => n % 2 === 0));
console.log(nums.reduce((s, n) => s + n, 0));`,
    output: ['[2, 4, 6, 8]', '[2, 4]', '10'],
  },
  {
    id: 85,
    category: 'Arrays & Objects',
    question: 'What is the difference between forEach and map?',
    answer: '`forEach` executes a callback for each element and always returns `undefined` — it is meant for side effects like logging or mutating external variables. `map` returns a new array with whatever your callback returns for each element, making it the right choice when you need transformed data. Choosing the wrong one is a common interview trap because both iterate over arrays but serve different purposes. For example, use `map` when rendering a list of products into price strings, and `forEach` when you just need to send an analytics event for each item without collecting results.',
    code: `const arr = [1, 2, 3];
const mapped = arr.map(x => x * 2);
let sum = 0;
arr.forEach(x => sum += x);
console.log(mapped, sum);`,
    output: ['[2, 4, 6]', '6'],
  },
  {
    id: 86,
    category: 'Arrays & Objects',
    question: 'What are array mutating vs non-mutating methods?',
    answer: 'Mutating methods like `push`, `pop`, `splice`, `sort`, and `reverse` modify the original array in place. Non-mutating methods like `map`, `filter`, `slice`, and `concat` return a new array or value without touching the source. This distinction matters because mutating shared arrays causes hard-to-debug side effects, especially in React or Redux where immutability is expected. For example, always copy before sorting with `[...items].sort()` or use the ES2023 `toSorted()` method so the original array stays unchanged for comparison or undo logic.',
    code: `const original = [3, 1, 2];
const sorted = [...original].sort((a, b) => a - b);
console.log(original);  // [3, 1, 2] unchanged
console.log(sorted);    // [1, 2, 3]`,
    output: ['[3, 1, 2]', '[1, 2, 3]'],
  },
  {
    id: 87,
    category: 'Arrays & Objects',
    question: 'What is array.flat and flatMap?',
    answer: '`flat(depth)` flattens nested arrays by one level by default, or by a specified depth for deeply nested structures. `flatMap` combines `map` and `flat(1)` in a single pass, which is useful when your mapping function returns arrays you want merged into one flat result. Both are non-mutating and help you avoid manual nested loops or `reduce` boilerplate. In a real app, fetching comments that each contain an array of replies and using `flatMap` lets you produce a single flat list of all reply texts in one readable expression.',
    code: `const nested = [1, [2, [3, 4]]];
console.log(nested.flat());
console.log(nested.flat(2));
const words = ["hello world", "foo bar"];
console.log(words.flatMap(w => w.split(" ")));`,
    output: ['[1, 2, [3, 4]]', '[1, 2, 3, 4]', '["hello", "world", "foo", "bar"]'],
  },
  {
    id: 88,
    category: 'Arrays & Objects',
    question: 'What is Object.keys, values, and entries?',
    answer: '`Object.keys()` returns an array of an object\'s own enumerable property names. `Object.values()` returns the corresponding values, and `Object.entries()` returns `[key, value]` pairs. All three skip inherited properties, so they only reflect what was defined directly on the object. These methods matter because they are the standard way to iterate objects when you need arrays you can `.map()` or loop over. For example, rendering a settings form from `Object.entries(config)` lets you dynamically create a label and input for each key-value pair.',
    code: `const obj = { a: 1, b: 2, c: 3 };
console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log(Object.entries(obj)[0]);`,
    output: ['["a", "b", "c"]', '[1, 2, 3]', '["a", 1]'],
  },
  {
    id: 89,
    category: 'Arrays & Objects',
    question: 'What is the difference between Object.freeze and Object.seal?',
    answer: '`Object.freeze()` makes an object fully immutable — you cannot add, delete, or modify any properties. `Object.seal()` prevents adding or deleting properties but still allows changing existing values. Both operations are shallow, meaning nested objects inside can still be mutated unless you freeze them separately. This matters when you want to guard configuration objects or constants from accidental modification at runtime. In a real app, freezing a theme config object after initialization ensures no component accidentally overwrites shared color tokens.',
    code: `const sealed = Object.seal({ a: 1 });
sealed.a = 2;       // OK
// sealed.b = 3;    // fails silently (strict: TypeError)
console.log(sealed.a);`,
    output: ['2'],
  },
  {
    id: 90,
    category: 'Arrays & Objects',
    question: 'How do you deep merge objects?',
    answer: 'Spread syntax and `Object.assign()` only perform shallow merges — nested objects are replaced entirely rather than merged field by field. For a true deep merge you need a recursive function or a utility like lodash\'s `merge`, while `structuredClone()` deep-copies but does not combine two sources. Deep merging matters when combining default config with user overrides, where both objects may have nested structures that should be merged, not overwritten. For example, merging `{ api: { timeout: 5000, retries: 3 } }` with `{ api: { retries: 5 } }` should produce `{ api: { timeout: 5000, retries: 5 } }`, not lose the timeout value.',
    code: `function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === "object") {
      target[key] = deepMerge(target[key] ?? {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
const result = deepMerge({ a: { b: 1 } }, { a: { c: 2 } });
console.log(JSON.stringify(result));`,
    output: ['{"a":{"b":1,"c":2}}'],
  },
  {
    id: 91,
    category: 'Arrays & Objects',
    question: 'What is find vs findIndex vs includes?',
    answer: '`find()` returns the first element that matches a predicate, or `undefined` if none match. `findIndex()` returns the index of that element, or `-1` if not found. `includes()` checks whether a specific value exists in the array using SameValueZero equality, which correctly handles `NaN`. Knowing which to use matters because `find` gives you the object itself, while `includes` is a simple boolean check best for primitives. In a real app, `users.find(u => u.id === selectedId)` retrieves a full user record, while `roles.includes("admin")` quickly checks permissions.',
    code: `const arr = [10, 20, 30];
console.log(arr.find(n => n > 15));
console.log(arr.findIndex(n => n > 15));
console.log(arr.includes(20));
console.log(arr.includes(NaN)); // false unless NaN in array`,
    output: ['20', '1', 'true', 'false'],
  },
  {
    id: 92,
    category: 'Arrays & Objects',
    question: 'What is the difference between slice and splice?',
    answer: '`slice(start, end)` returns a shallow copy of a portion of the array without modifying the original — it is non-mutating. `splice(start, deleteCount, ...items)` modifies the array in place by removing and/or inserting elements and returns the removed items. Confusing these two is one of the most common JavaScript mistakes because their names sound similar but behave oppositely. In a real app, use `slice` to paginate a list for display without affecting the source data, and use `splice` when you need to remove an item from a todo list the user just completed.',
    code: `const a = [1, 2, 3, 4];
const b = a.slice(1, 3);
console.log(b); // [2, 3]
const removed = a.splice(1, 2, 99);
console.log(a, removed);`,
    output: ['[2, 3]', '[1, 99, 4]', '[2, 3]'],
  },
  {
    id: 93,
    category: 'Arrays & Objects',
    question: 'What is structuredClone?',
    answer: '`structuredClone()` creates a deep copy of a value using the structured clone algorithm built into the runtime. Unlike `JSON.parse(JSON.stringify(obj))`, it correctly handles `Date`, `Map`, `Set`, `ArrayBuffer`, and even circular references. It does not clone functions, DOM nodes, or certain host objects, so it is not a universal deep-copy solution. In a real app, cloning form state with `structuredClone(originalForm)` before editing lets users cancel changes and revert to the exact original, including nested objects and dates.',
    code: `const original = {
  date: new Date("2024-01-01"),
  map: new Map([["k", "v"]]),
  nested: { a: 1 },
};
const copy = structuredClone(original);
copy.nested.a = 99;
console.log(original.nested.a); // 1`,
    output: ['1'],
  },
]
