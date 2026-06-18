import type { InterviewQuestion } from '../../types'

export const asyncQuestions: InterviewQuestion[] = [
  {
    id: 60,
    category: 'Async',
    question: 'What is the JavaScript event loop?',
    answer: 'The event loop is JavaScript\'s mechanism for handling concurrency on a single thread: it runs synchronous code on the call stack, then drains queued work when the stack is empty. Microtasks (such as Promise callbacks) run before the next macrotask (such as setTimeout or I/O callbacks), which is why the log order is 1, 4, 3, then 2. This ordering is what makes async code non-blocking without true parallel threads in the browser or Node.',
    code: `console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// Order: 1, 4, 3, 2`,
    demo: 'event-loop',
  },
  {
    id: 61,
    category: 'Async',
    question: 'What is the difference between microtasks and macrotasks?',
    answer: 'Microtasks are high-priority jobs scheduled by Promises, queueMicrotask, and MutationObserver; the engine runs the entire microtask queue before painting or picking up the next macrotask. Macrotasks include setTimeout, setInterval, I/O completion, and user events—typically one macrotask per event loop turn after microtasks finish. That is why sync logs first, then both Promise callbacks, then the timeout.',
    code: `setTimeout(() => console.log("macrotask"), 0);
Promise.resolve().then(() => console.log("microtask 1"));
Promise.resolve().then(() => console.log("microtask 2"));
console.log("sync");`,
    output: ['sync', 'microtask 1', 'microtask 2', 'macrotask'],
  },
  {
    id: 62,
    category: 'Async',
    question: 'What is a Promise and its three states?',
    answer: 'A Promise represents a value that may not exist yet, wrapping async work so you can attach reactions with then and catch. It starts pending, moves to fulfilled when resolve runs with a value, or rejected when reject runs with a reason—and once settled it cannot change state again. That immutability makes Promise chains predictable and composable.',
    code: `const p = new Promise((resolve, reject) => {
  resolve(42);
});
p.then(val => console.log("Fulfilled:", val));
p.catch(err => console.log("Rejected:", err));`,
    demo: 'promise-chain',
  },
  {
    id: 63,
    category: 'Async',
    question: 'What is the difference between Promise.then and async/await?',
    answer: 'Promise.then chains asynchronous steps through callbacks, while async/await lets you write the same flow with synchronous-looking code inside an async function. await pauses only that async function until the Promise settles, and errors bubble to try/catch instead of requiring .catch on every link. Under the hood, async functions still return Promises and compile to the same thenable machinery.',
    code: `async function fetchData() {
  try {
    const result = await Promise.resolve(42);
    return result * 2;
  } catch (e) {
    return null;
  }
}
fetchData().then(console.log);`,
    output: ['84'],
  },
  {
    id: 64,
    category: 'Async',
    question: 'What is Promise.all vs Promise.allSettled?',
    answer: 'Promise.all waits for every input Promise to fulfill and resolves with an array of results, but it rejects immediately on the first rejection—useful when all parts must succeed. Promise.allSettled always waits for every Promise to finish and returns an array of { status, value or reason } objects regardless of failures. That makes allSettled better for batch operations where partial success is acceptable.',
    code: `const p1 = Promise.resolve(1);
const p2 = Promise.reject("fail");
Promise.allSettled([p1, p2]).then(console.log);
// [{status:"fulfilled",value:1},{status:"rejected",reason:"fail"}]`,
    output: ['[{status:"fulfilled",value:1},{status:"rejected",reason:"fail"}]'],
  },
  {
    id: 65,
    category: 'Async',
    question: 'What is Promise.race?',
    answer: 'Promise.race settles as soon as the first Promise in the array either fulfills or rejects, mirroring whichever finishes first and ignoring the rest unless you handle them separately. It is commonly used for timeouts—racing fetch(url) against a timer Promise—or choosing the fastest mirror among redundant requests. The losing Promises still run; race only stops waiting on them.',
    code: `const slow = new Promise(r => setTimeout(() => r("slow"), 200));
const fast = new Promise(r => setTimeout(() => r("fast"), 50));
Promise.race([slow, fast]).then(console.log);`,
    output: ['fast'],
  },
  {
    id: 66,
    category: 'Async',
    question: 'How do you handle errors in async/await?',
    answer: 'Wrap await expressions in try/catch inside async functions to handle rejections and thrown errors the same way you handle synchronous exceptions. An uncaught throw inside an async function becomes a rejected Promise returned by that function, which can surface as an unhandled rejection if nothing catches it upstream. Always handle errors at a meaningful boundary—often the top-level caller or a route handler—rather than silently swallowing them.',
    code: `async function risky() {
  throw new Error("oops");
}
async function main() {
  try {
    await risky();
  } catch (e) {
    console.log("Caught:", e.message);
  }
}
main();`,
    output: ['Caught: oops'],
  },
  {
    id: 67,
    category: 'Async',
    question: 'What is callback hell and how to avoid it?',
    answer: 'Callback hell is deeply nested asynchronous callbacks that form a pyramid shape, making error handling and control flow hard to follow and test. Each step depends on the previous callback, so adding a new stage or handling errors at each level multiplies complexity quickly. Promises flatten the chain into sequential then calls, and async/await makes it read like synchronous code while preserving non-blocking behavior.',
    code: `// Before: callback hell
// getData(id, (err, data) => {
//   processData(data, (err, result) => { ... });
// });

// After: async/await
async function pipeline(id) {
  const data = await getData(id);
  return processData(data);
}`,
    output: ['Use Promises/async-await for flat, readable async code'],
  },
  {
    id: 68,
    category: 'Async',
    question: 'What is the difference between setTimeout(fn, 0) and queueMicrotask?',
    answer: 'setTimeout(fn, 0) schedules a macrotask, so it runs only after the current script finishes and every microtask in the queue has been processed. queueMicrotask schedules work in the microtask queue, which runs immediately after the current synchronous code and before the next macrotask or render. That is why the output order is sync, then microtask, then timeout.',
    code: `setTimeout(() => console.log("timeout"), 0);
queueMicrotask(() => console.log("microtask"));
console.log("sync");`,
    output: ['sync', 'microtask', 'timeout'],
  },
  {
    id: 69,
    category: 'Async',
    question: 'What is async iteration (for await...of)?',
    answer: 'for await...of consumes async iterables—objects that expose Symbol.asyncIterator and yield Promises for each step, awaiting each one before continuing the loop. It is the natural way to read async generators, paginated API results, or Node.js streams without manually chaining .then in a loop. Each iteration waits for the previous Promise to settle, keeping order while staying non-blocking.',
    code: `async function* gen() {
  yield Promise.resolve(1);
  yield Promise.resolve(2);
}
(async () => {
  for await (const val of gen()) {
    console.log(val);
  }
})();`,
    output: ['1', '2'],
  },
  {
    id: 70,
    category: 'Async',
    question: 'What is the Fetch API?',
    answer: 'The Fetch API provides a Promise-based interface for HTTP requests, returning a Response you can inspect for status, headers, and body content. Unlike many HTTP libraries, fetch does not reject on 404 or 500—you must check response.ok or response.status and throw or handle errors yourself. It supports streaming bodies, custom headers, and Request/Response objects for advanced use cases.',
    code: `// fetch("https://api.example.com/data")
//   .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
//   .then(console.log);

// Mock pattern:
const mockResponse = { ok: true, json: async () => ({ id: 1 }) };
console.log("Check response.ok before parsing");`,
    output: ['Check response.ok before parsing'],
  },
  {
    id: 71,
    category: 'Async',
    question: 'What is an AbortController?',
    answer: 'AbortController creates an AbortSignal you pass into APIs like fetch so you can cancel in-flight work from the outside. Calling controller.abort() marks the signal as aborted, which causes fetch to reject and lets your abort event listener run cleanup logic. It is also used to remove long-lived listeners when a component unmounts.',
    code: `const controller = new AbortController();
const { signal } = controller;

// fetch(url, { signal })
setTimeout(() => controller.abort(), 100);

signal.addEventListener("abort", () => {
  console.log("Request aborted!");
});`,
    output: ['Request aborted!'],
  },
]
