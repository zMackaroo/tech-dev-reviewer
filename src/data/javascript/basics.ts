import type { InterviewQuestion } from '../../types'

export const basicsQuestions: InterviewQuestion[] = [
  {
    id: 1,
    category: 'Basics',
    question: 'What is JavaScript and where does it run?',
    answer: 'JavaScript is a high-level, interpreted programming language and the core language of the web. Originally designed for browsers, it now runs in many environments thanks to engines like V8 (Chrome), SpiderMonkey (Firefox), and JavaScriptCore (Safari), as well as on servers through Node.js. Understanding where JS runs matters because the same language powers front-end UI, back-end APIs, and tooling like build scripts. For example, a React app in the browser and an Express API on a server both use JavaScript, following the ECMAScript specification that defines the language itself.',
    code: `// JavaScript runs everywhere
console.log(typeof window !== 'undefined' ? 'Browser' : 'Node.js');
console.log('ECMAScript is the language spec');`,
    output: ['Browser or Node.js', 'ECMAScript is the language spec'],
  },
  {
    id: 2,
    category: 'Basics',
    question: 'What is the difference between var, let, and const?',
    answer: 'var is function-scoped and hoisted with an initial value of undefined, which can lead to surprising behavior in nested blocks. let and const are block-scoped, are not initialized until their declaration line runs (the temporal dead zone), and are generally preferred in modern code. const must be assigned at declaration and cannot be reassigned, though the contents of objects and arrays it points to can still change. In a real app, you would use const for values that should not be reassigned, let for loop counters or reassignable state, and avoid var to prevent hard-to-debug scope leaks.',
    code: `var a = 1;
let b = 2;
const c = 3;

if (true) {
  var a = 10;   // affects outer
  let b = 20;   // block scoped
  const d = 4;
}
console.log(a, b, c); // 10, 2, 3`,
    output: ['10', '2', '3'],
  },
  {
    id: 3,
    category: 'Basics',
    question: 'What is hoisting in JavaScript?',
    answer: 'Hoisting is JavaScript\'s behavior of processing declarations before the rest of the code in a scope runs, as if they were moved to the top. var declarations are hoisted and initialized as undefined, so you can reference them before the assignment line without a ReferenceError. function declarations are fully hoisted, which is why you can call a function before its definition in the source. let and const are hoisted too but stay in the temporal dead zone until initialized, so accessing them early throws. For example, legacy code mixing var and function declarations often works by accident, while switching to let without understanding hoisting can cause ReferenceErrors.',
    code: `console.log(x); // undefined
var x = 5;

sayHi(); // "Hi!"
function sayHi() { console.log("Hi!"); }

// console.log(y); // ReferenceError
let y = 10;`,
    demo: 'hoisting',
  },
  {
    id: 4,
    category: 'Basics',
    question: 'What is the Temporal Dead Zone (TDZ)?',
    answer: 'The temporal dead zone (TDZ) is the period from when a scope begins until a let or const declaration is executed. During the TDZ, the variable name exists but cannot be accessed—doing so throws a ReferenceError, unlike var which would return undefined. This prevents bugs from using variables before they are properly initialized. In a real app, this is why you cannot reference a const config object at the top of a module before the line where it is declared, even though function hoisting might have worked differently with var.',
    code: `{ // new block scope
  // TDZ for 'value' starts here
  // console.log(value); // ReferenceError!
  let value = 42;
  console.log(value); // 42 — TDZ ended
}`,
    output: ['42'],
  },
  {
    id: 5,
    category: 'Basics',
    question: 'What are the primitive data types in JavaScript?',
    answer: 'JavaScript has seven primitive types: string, number, bigint, boolean, undefined, null, and symbol. Primitives are immutable and compared by value, meaning two strings with the same characters are equal if their values match. Everything else—including arrays, functions, and plain objects—is an object type and is compared by reference. For example, when you pass a number into a function, a copy is made, but passing an object shares the reference, which is why mutating nested data can affect the original.',
    code: `const types = [
  typeof "hello",   // string
  typeof 42,        // number
  typeof true,      // boolean
  typeof undefined, // undefined
  typeof null,      // "object" (historical bug)
  typeof Symbol(),  // symbol
  typeof 10n,       // bigint
];
console.log(types.join(", "));`,
    output: ['string, number, boolean, undefined, object, symbol, bigint'],
  },
  {
    id: 6,
    category: 'Basics',
    question: 'What is the difference between == and ===?',
    answer: 'The == operator compares values after converting types if needed, which can produce surprising results like 0 == false being true. The === operator performs strict equality, checking both value and type without coercion, so 5 === "5" is false. Using === consistently avoids subtle bugs and is the standard in professional codebases and linters like ESLint. For example, in a form validation check, userId === 0 is clear, while userId == 0 might also match an empty string depending on coercion rules.',
    code: `console.log(5 == "5");   // true  (coerced)
console.log(5 === "5");   // false (different types)
console.log(null == undefined);  // true
console.log(null === undefined); // false
console.log(0 == false);  // true
console.log(0 === false); // false`,
    output: ['true', 'false', 'true', 'false', 'true', 'false'],
  },
  {
    id: 7,
    category: 'Basics',
    question: 'What is strict mode ("use strict")?',
    answer: 'Strict mode ("use strict") opts into a stricter variant of JavaScript that catches common mistakes and disables some unsafe features. It turns silent failures into thrown errors, such as assigning to undeclared variables, and changes how this behaves inside plain functions. Modules and many modern tools enable strict mode automatically. In a real app, strict mode helps prevent accidental global variable creation and makes debugging easier when refactoring legacy sloppy-mode scripts.',
    code: `"use strict";
// x = 10; // ReferenceError: x is not defined
function strictFn() {
  console.log(this); // undefined (not window)
}
strictFn();`,
    output: ['undefined'],
  },
  {
    id: 8,
    category: 'Basics',
    question: 'What is the difference between null and undefined?',
    answer: 'undefined means a variable has been declared but no value has been assigned yet, or a function returns nothing. null is an intentional assignment representing "no value" or an empty result that the developer chose explicitly. typeof undefined is "undefined", while typeof null is "object" due to a long-standing spec quirk. In a real app, an API might return null for a missing optional field while an uninitialized local variable stays undefined until you assign something to it.',
    code: `let a;
const b = null;
console.log(a);          // undefined
console.log(b);          // null
console.log(a == null);  // true (matches null OR undefined)
console.log(a === null); // false`,
    output: ['undefined', 'null', 'true', 'false'],
  },
  {
    id: 9,
    category: 'Basics',
    question: 'What are truthy and falsy values?',
    answer: 'JavaScript treats certain values as falsy in boolean contexts: false, 0, -0, 0n, empty string, null, undefined, and NaN. Every other value is truthy, including non-empty strings, arrays, objects, and even the strings "0" and "false". This matters in conditionals, logical operators, and default-value patterns like value || "default". For example, an empty array [] is truthy, so if (items) will run even when items.length is 0—often you need an explicit length check instead.',
    code: `const falsy = [false, 0, "", null, undefined, NaN];
falsy.forEach(v => console.log(Boolean(v)));
console.log("---");
console.log(Boolean([]));    // true
console.log(Boolean("0"));   // true`,
    output: ['false', 'false', 'false', 'false', 'false', 'false', '---', 'true', 'true'],
  },
  {
    id: 10,
    category: 'Basics',
    question: 'What is the difference between function declaration and expression?',
    answer: 'A function declaration defines a named function in a scope and is fully hoisted, so you can call it before its line in the file. A function expression assigns a function to a variable (often const) and only the variable name is hoisted—not the function body—so you cannot call it before that assignment runs. Arrow functions are always expressions. In a real app, you might use declarations for top-level helpers that need hoisting, and expressions for callbacks passed to array methods where the function is created inline.',
    code: `greet(); // works — hoisted
function greet() { console.log("Hello!"); }

// farewell(); // TypeError
const farewell = function() { console.log("Bye!"); };
farewell(); // works now`,
    output: ['Hello!', 'Bye!'],
  },
  {
    id: 11,
    category: 'Basics',
    question: 'What is an IIFE (Immediately Invoked Function Expression)?',
    answer: 'An IIFE (Immediately Invoked Function Expression) is a function defined and executed in one expression, usually wrapped in parentheses. It creates a private scope so variables inside do not leak into the global namespace. Before ES modules, IIFEs were a common pattern for libraries and bundling code without naming collisions. For example, jQuery-era plugins often wrapped code in (function() { ... })(); to keep internal helpers private while exposing only a public API.',
    code: `(function() {
  const secret = "hidden";
  console.log("IIFE ran:", secret);
})();

// console.log(secret); // ReferenceError`,
    output: ['IIFE ran: hidden'],
  },
  {
    id: 12,
    category: 'Basics',
    question: 'What is the difference between pass by value and pass by reference?',
    answer: 'Primitives (numbers, strings, booleans, etc.) are passed by value, meaning the function receives a copy and reassigning the parameter does not affect the original. Objects, arrays, and functions are passed by sharing a reference—the copy points to the same underlying data, so mutating properties inside a function changes the original object. This distinction explains why incrementing a number parameter does not change the outer variable, but updating obj.name inside a helper does. In a real app, always clone or spread objects when you want to update state immutably in React without mutating shared references.',
    code: `let num = 5;
function changeVal(n) { n = 10; }
changeVal(num);
console.log(num); // 5

const obj = { x: 1 };
function changeObj(o) { o.x = 99; }
changeObj(obj);
console.log(obj.x); // 99`,
    output: ['5', '99'],
  },
  {
    id: 13,
    category: 'Basics',
    question: 'What is NaN and how do you check for it?',
    answer: 'NaN (Not-a-Number) is the value returned when a numeric operation fails, such as parsing a non-numeric string with Number(). Uniquely, NaN is not equal to itself, so NaN === NaN is false. The global isNaN() coerces its argument first, which can give false positives, while Number.isNaN() only returns true for actual NaN values. For example, after parseFloat("abc"), you should use Number.isNaN(result) rather than isNaN to reliably detect an invalid numeric conversion.',
    code: `console.log(NaN === NaN);           // false
console.log(Number.isNaN(NaN));     // true
console.log(Number.isNaN("hello")); // false
console.log(isNaN("hello"));        // true (coerced!)`,
    output: ['false', 'true', 'false', 'true'],
  },
  {
    id: 14,
    category: 'Basics',
    question: 'What is the typeof operator used for?',
    answer: 'typeof is a unary operator that returns a string naming the type of a value, such as "number", "string", or "boolean". It works well for primitives but has limitations: typeof null returns "object", and arrays also return "object". Functions return "function", which is a special case. In a real app, use typeof for quick primitive checks, Array.isArray() for arrays, and more precise checks when handling API payloads that could be null or an array.',
    code: `console.log(typeof 42);
console.log(typeof "hi");
console.log(typeof function(){});
console.log(typeof []);
console.log(typeof null);`,
    output: ['number', 'string', 'function', 'object', 'object'],
  },
  {
    id: 15,
    category: 'Basics',
    question: 'What are template literals?',
    answer: 'Template literals use backticks instead of quotes and allow embedded expressions with ${expression} syntax. They support multi-line strings without escape characters and produce cleaner, more readable dynamic strings than concatenation. Tagged template literals can also pipe the string parts and values through a custom function for advanced formatting. For example, in a real app you might build an HTML email body with `Hello ${user.name},\\nYour order #${orderId} shipped.` instead of clumsy string concatenation.',
    code: `const name = "World";
const greeting = \`Hello, \${name}!
Multi-line
supported.\`;
console.log(greeting);`,
    output: ['Hello, World!', 'Multi-line', 'supported.'],
  },
]
