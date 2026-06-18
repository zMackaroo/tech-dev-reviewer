import type { InterviewQuestion } from '../../types'

export const typesQuestions: InterviewQuestion[] = [
  {
    id: 16,
    category: 'Types & Coercion',
    question: 'What is type coercion in JavaScript?',
    answer: 'Type coercion is the conversion of a value from one type to another, either automatically by JavaScript or explicitly by the developer. Implicit coercion happens in operations like == comparisons, string concatenation with +, and boolean contexts in if statements. Explicit coercion uses functions like String(), Number(), or Boolean() when you intentionally convert types. Understanding coercion matters because it causes many interview trick questions and real bugs—for example, adding a user input string to a number can concatenate instead of adding unless you convert first.',
    code: `console.log("5" + 3);     // "53" string concat
console.log("5" - 3);     // 2 number subtraction
console.log(!!"hello");   // true boolean
console.log(Number("42")); // 42`,
    demo: 'coercion',
  },
  {
    id: 17,
    category: 'Types & Coercion',
    question: 'What is the output of [] + [] and [] + {}?',
    answer: 'When + is used with arrays or objects, JavaScript converts operands to strings using toString(). An empty array [] becomes an empty string "", so [] + [] evaluates to "" + "" which is "". An empty object {} becomes "[object Object]", so [] + {} is "" + "[object Object]" which is "[object Object]". These surprising results illustrate why implicit coercion makes + dangerous with mixed types.',
    code: `console.log([] + []);
console.log([] + {});
console.log({} + []); // in expression context
console.log(true + true);`,
    output: ['""', '"[object Object]"', '"[object Object]"', '2'],
  },
  {
    id: 18,
    category: 'Types & Coercion',
    question: 'What is the difference between implicit and explicit coercion?',
    answer: 'Implicit coercion is automatic conversion performed by JavaScript when an operation needs a different type, such as multiplying two numeric strings with *. Explicit coercion is when you deliberately convert using String(x), Number(x), parseInt(x, 10), or similar APIs. Implicit coercion is convenient but harder to predict; explicit conversion makes intent clear to readers and static analysis tools.',
    code: `// Implicit
console.log("5" * "2"); // 10

// Explicit
console.log(Number("5") * Number("2"));
console.log(String(123));
console.log(parseInt("42px")); // 42`,
    output: ['10', '10', '123', '42'],
  },
  {
    id: 19,
    category: 'Types & Coercion',
    question: 'How does the + operator work with mixed types?',
    answer: 'The + operator is overloaded in JavaScript: if either operand is a string, it performs string concatenation after coercing the other operand to a string. If both operands are numbers (or coercible to numbers without string involvement), it performs addition. This asymmetry is why "5" + 3 gives "53" but "5" - 3 gives 2, since subtraction always prefers numbers.',
    code: `console.log(1 + 2);       // 3
console.log("1" + 2);     // "12"
console.log(1 + "2");     // "12"
console.log(1 + true);    // 2 (true → 1)
console.log("1" + true);  // "1true"`,
    output: ['3', '"12"', '"12"', '2', '"1true"'],
  },
  {
    id: 20,
    category: 'Types & Coercion',
    question: 'What is Symbol and when would you use it?',
    answer: 'Symbol is a primitive type that creates guaranteed-unique values, even when two symbols share the same description string. They are commonly used as object property keys that will not collide with other keys or user-provided field names. Well-known symbols like Symbol.iterator define hooks for language features such as for...of loops.',
    code: `const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2); // false — always unique

const user = { [id1]: 123, name: "Bob" };
console.log(user[id1]); // 123`,
    output: ['false', '123'],
  },
  {
    id: 21,
    category: 'Types & Coercion',
    question: 'What is BigInt and how is it different from Number?',
    answer: 'BigInt represents integers of arbitrary precision, unlike Number which loses accuracy beyond Number.MAX_SAFE_INTEGER (2^53 - 1). You create BigInt values with the n suffix (9007199254740991n) or the BigInt() constructor. BigInt and Number cannot be mixed in arithmetic without explicit conversion—you must choose one type for the operation.',
    code: `const big = 9007199254740991n;
const bigger = big + 1n;
console.log(bigger.toString());
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991`,
    output: ['9007199254740992', '9007199254740991'],
  },
  {
    id: 22,
    category: 'Types & Coercion',
    question: 'What is the difference between shallow and deep copy?',
    answer: 'A shallow copy duplicates only the top level of an object; nested objects and arrays still share references with the original. A deep copy recursively clones every nested level so changes to the copy do not affect the original at any depth. Spread syntax ({ ...obj }) and Object.assign() are shallow; structuredClone() or custom recursive functions provide deep copies.',
    code: `const original = { a: 1, nested: { b: 2 } };
const shallow = { ...original };
shallow.nested.b = 99;
console.log(original.nested.b); // 99 — shared ref

const deep = structuredClone(original);
deep.nested.b = 42;
console.log(original.nested.b); // 99 — unchanged`,
    output: ['99', '99'],
  },
  {
    id: 23,
    category: 'Types & Coercion',
    question: 'What are the limitations of JSON.parse/stringify for cloning?',
    answer: 'JSON.parse(JSON.stringify(obj)) is a quick deep-copy hack but drops or transforms many JavaScript types. Functions, undefined, and Symbol properties are omitted; Date becomes an ISO string; Map, Set, and circular references break or fail entirely. structuredClone() handles most built-in types and cycles but still cannot clone functions.',
    code: `const obj = {
  date: new Date(),
  fn: () => {},
  undef: undefined,
};
const cloned = JSON.parse(JSON.stringify(obj));
console.log(Object.keys(cloned)); // only "date"
console.log(typeof cloned.date); // "string"`,
    output: ['["date"]', '"string"'],
  },
  {
    id: 24,
    category: 'Types & Coercion',
    question: 'What is Object.is() and how does it differ from ===?',
    answer: 'Object.is() compares two values like === but handles two edge cases differently. Object.is(NaN, NaN) returns true, while NaN === NaN is false; Object.is(+0, -0) returns false, while 0 === -0 is true. Most everyday comparisons still use ===, but Object.is is useful in libraries implementing precise equality or Map-like structures.',
    code: `console.log(NaN === NaN);           // false
console.log(Object.is(NaN, NaN));   // true
console.log(0 === -0);              // true
console.log(Object.is(0, -0));      // false`,
    output: ['false', 'true', 'true', 'false'],
  },
  {
    id: 25,
    category: 'Types & Coercion',
    question: 'What is the difference between undefined and undeclared variables?',
    answer: 'An undefined variable has been declared with let, const, or var but not yet assigned a value, so reading it returns undefined. An undeclared variable was never defined in scope, and accessing it throws a ReferenceError in strict mode (or creates an accidental global in sloppy mode). This distinction matters when debugging typos versus missing initialization.',
    code: `let declared;
console.log(declared); // undefined

try {
  console.log(notDeclared);
} catch (e) {
  console.log(e.name); // ReferenceError
}`,
    output: ['undefined', 'ReferenceError'],
  },
  {
    id: 26,
    category: 'Types & Coercion',
    question: 'How do you check if a value is an array?',
    answer: 'Array.isArray(value) is the reliable standard way to check whether a value is an array. typeof returns "object" for arrays, which cannot distinguish arrays from plain objects. instanceof Array works in most cases but fails across different JavaScript realms such as iframes.',
    code: `const arr = [1, 2, 3];
console.log(Array.isArray(arr));     // true
console.log(typeof arr);             // "object"
console.log(arr instanceof Array);   // true`,
    output: ['true', 'object', 'true'],
  },
  {
    id: 27,
    category: 'Types & Coercion',
    question: 'What is optional chaining (?.)?',
    answer: 'Optional chaining (?.) safely accesses nested properties, methods, or array elements when the left side might be null or undefined. If any part of the chain is nullish, the expression short-circuits and returns undefined instead of throwing a TypeError. It replaces verbose patterns like user && user.profile && user.profile.name.',
    code: `const user = { profile: { name: "Alice" } };
console.log(user?.profile?.name);  // "Alice"
console.log(user?.address?.city);  // undefined
console.log(user?.missing?.());    // undefined (no error)`,
    output: ['Alice', 'undefined', 'undefined'],
  },
]
