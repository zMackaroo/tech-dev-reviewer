import type { InterviewQuestion } from '../../types'

export const advancedQuestions: InterviewQuestion[] = [
  {
    id: 94,
    category: 'Advanced',
    question: 'What is event delegation?',
    answer: 'Event delegation attaches a single event listener to a parent element instead of registering one on every child. When an event bubbles up, you inspect `event.target` (or use `matches()`) to determine which child was actually interacted with. This pattern matters because it reduces memory usage and automatically handles dynamically added elements without re-binding listeners.',
    code: `// Parent handles clicks for all li elements
// list.addEventListener("click", (e) => {
//   if (e.target.matches("li")) {
//     console.log("Clicked:", e.target.textContent);
//   }
// });
console.log("One listener on parent vs N on children");`,
    output: ['One listener on parent vs N on children'],
  },
  {
    id: 95,
    category: 'Advanced',
    question: 'What is the difference between event bubbling and capturing?',
    answer: 'During the capturing phase, an event travels from the window down through ancestors to the target element. During the bubbling phase, it travels back up from the target to the window. By default, `addEventListener` handlers run in the bubbling phase, but passing `{ capture: true }` (or `true` as the third argument) runs them during capturing instead. Understanding this order matters when nested elements both have listeners and you need to control which handler runs first or stop propagation with `stopPropagation()`.',
    code: `// div > button click:
// Capture: window → div → button
// Bubble:  button → div → window
console.log("addEventListener 3rd arg: useCapture");
console.log("stopPropagation() stops further propagation");`,
    output: ['addEventListener 3rd arg: useCapture', 'stopPropagation() stops further propagation'],
  },
  {
    id: 96,
    category: 'Advanced',
    question: 'What is the difference between localStorage and sessionStorage?',
    answer: 'Both `localStorage` and `sessionStorage` store key-value pairs as strings in the browser, so objects must be serialized with `JSON.stringify`. `localStorage` persists data until explicitly cleared, even after the browser is closed, while `sessionStorage` is scoped to the tab and cleared when the tab closes. Both are subject to the same-origin policy and share an approximate 5 MB limit per origin.',
    code: `// localStorage.setItem("user", JSON.stringify({ id: 1 }));
// sessionStorage.setItem("token", "abc");
// JSON.parse(localStorage.getItem("user"));
console.log("Both are synchronous — avoid large data");`,
    output: ['Both are synchronous — avoid large data'],
  },
  {
    id: 97,
    category: 'Advanced',
    question: 'What is a memory leak in JavaScript?',
    answer: 'A memory leak occurs when objects that are no longer needed remain reachable through lingering references, preventing the garbage collector from freeing that memory. Common causes include uncleared timers, closures that hold references to removed DOM nodes, forgotten event listeners, and globals that accumulate data over time. Even though JavaScript has automatic garbage collection, leaks matter in long-running single-page apps where memory usage grows until the tab slows down or crashes.',
    code: `// Leak: interval never cleared
// const id = setInterval(() => {}, 1000);

// Fix: clearInterval(id) when done
console.log("Clear timers, remove listeners, null refs");`,
    output: ['Clear timers, remove listeners, null refs'],
  },
  {
    id: 98,
    category: 'Advanced',
    question: 'What is the difference between synchronous and asynchronous code?',
    answer: 'Synchronous code runs to completion on the call stack before anything else executes, blocking further JavaScript until it finishes. Asynchronous code schedules work — via callbacks, Promises, or `async/await` — to run later, allowing the call stack to stay free in the meantime. JavaScript is single-threaded but non-blocking thanks to the event loop, which processes the stack first and then picks up queued async tasks.',
    code: `console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
// A, C print immediately; B later`,
    output: ['A', 'C', 'B'],
  },
  {
    id: 99,
    category: 'Advanced',
    question: 'What is polyfill vs transpilation?',
    answer: 'A polyfill is runtime code that adds a missing API to the environment — for example, shimmed `Array.prototype.at` on an older browser that lacks it natively. Transpilation (via tools like Babel) converts newer syntax such as optional chaining or class fields into equivalent older syntax at build time. They solve different problems and are often used together: transpilation handles syntax the engine cannot parse, while polyfills handle APIs the engine can parse but does not implement.',
    code: `// Polyfill example
if (!Array.prototype.at) {
  Array.prototype.at = function(n) {
    return this[n >= 0 ? n : this.length + n];
  };
}
console.log([1, 2, 3].at(-1)); // 3`,
    output: ['3'],
  },
  {
    id: 100,
    category: 'Advanced',
    question: 'Explain the output: typeof typeof 1',
    answer: 'The inner `typeof 1` evaluates first and returns the string `"number"`, because `typeof` always returns a string describing the operand\'s type. The outer `typeof "number"` then returns `"string"`, since the operand is now a string literal, not a number. This is a classic trick question that tests whether you understand that `typeof`\'s return value is always a string, not a type name used as an identifier. In interviews, breaking it into two steps — `typeof 1` → `"number"`, then `typeof "number"` → `"string"` — shows you understand operator evaluation order and return types.',
    code: `console.log(typeof 1);         // "number"
console.log(typeof "number");  // "string"
console.log(typeof typeof 1);  // "string"`,
    output: ['number', 'string', 'string'],
  },
]
