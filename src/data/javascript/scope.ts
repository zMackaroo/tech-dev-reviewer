import type { InterviewQuestion } from '../../types'

export const scopeQuestions: InterviewQuestion[] = [
  {
    id: 40,
    category: 'Scope & Closures',
    question: 'What is lexical scope?',
    answer: 'Lexical scope means a function\'s access to variables is determined by where it is written in the source code, not where it is called. Inner functions can look up and use variables from enclosing scopes, while outer functions cannot see what is declared inside a nested function. This predictable lookup order is what makes closures work and is how JavaScript resolves identifiers at compile time.',
    code: `const outer = "I am outer";
function inner() {
  const local = "I am local";
  console.log(outer); // accessible
  return local;
}
console.log(inner());`,
    output: ['I am outer', 'I am local'],
  },
  {
    id: 41,
    category: 'Scope & Closures',
    question: 'What is the classic closure loop problem with var?',
    answer: 'With var, all callbacks created inside a for loop share the same function-scoped i variable. By the time the setTimeout callbacks run, the loop has finished and i equals the final value, so every callback logs the same number. Using let gives each iteration its own block-scoped binding, which is why the fixed loop prints 0, 1, and 2.',
    code: `// Problem with var
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 0);
}
// Fix with let
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 100);
}`,
    output: ['var: 3', 'var: 3', 'var: 3', 'let: 0', 'let: 1', 'let: 2'],
  },
  {
    id: 42,
    category: 'Scope & Closures',
    question: 'How do closures enable data privacy?',
    answer: 'Closures let you keep variables inside a function scope and expose only the methods you choose to return. The balance variable in a bank account factory is never reachable from outside, but deposit and getBalance can read and update it through their closure. This pattern gave you encapsulation before ES modules and private class fields existed.',
    code: `function createBankAccount(initial) {
  let balance = initial;
  return {
    deposit: (n) => { balance += n; },
    getBalance: () => balance,
  };
}
const account = createBankAccount(100);
account.deposit(50);
console.log(account.getBalance()); // 150
// balance is not accessible directly`,
    output: ['150'],
  },
  {
    id: 43,
    category: 'Scope & Closures',
    question: 'What is the module pattern?',
    answer: 'The module pattern wraps code in an IIFE so private state lives inside the closure and only a chosen public API is returned. Consumers call methods like add without ever touching the internal history array directly. It was the standard way to organize JavaScript before import/export became native.',
    code: `const Calculator = (function() {
  let history = [];
  return {
    add(a, b) {
      const r = a + b;
      history.push(\`\${a}+\${b}=\${r}\`);
      return r;
    },
    getHistory: () => [...history],
  };
})();
console.log(Calculator.add(2, 3));
console.log(Calculator.getHistory());`,
    output: ['5', '["2+3=5"]'],
  },
  {
    id: 44,
    category: 'Scope & Closures',
    question: 'What happens to closures in memory?',
    answer: 'A closure keeps its outer lexical environment alive for as long as the inner function can still be reached by your program. That is useful when you need persistent state, but it can cause memory leaks if a closure holds references to large objects you no longer need. Setting fn = null (or removing event listeners) drops the last reference so the garbage collector can reclaim the scope.',
    code: `function makeHeavy() {
  const bigData = new Array(1e6).fill("x");
  return () => bigData.length;
}
let fn = makeHeavy();
console.log(fn()); // 1000000
fn = null; // allow GC if no other refs`,
    output: ['1000000'],
  },
  {
    id: 45,
    category: 'Scope & Closures',
    question: 'What is block scope?',
    answer: 'Block scope confines let and const declarations to the nearest enclosing {} block, including if, for, while, and standalone blocks. Variables declared inside a block are not visible outside it, which prevents accidental leaks and name collisions. This is why a for loop with let gives each iteration a fresh binding instead of sharing one counter.',
    code: `{
  const blockScoped = "inside block";
  let alsoBlock = true;
}
// blockScoped not accessible here
const scopes = [];
for (let i = 0; i < 3; i++) scopes.push(i);
console.log(scopes);`,
    output: ['[0, 1, 2]'],
  },
  {
    id: 46,
    category: 'Scope & Closures',
    question: 'What is the difference between function scope and block scope?',
    answer: 'Function scope means var is hoisted and visible throughout the entire function, even before its declaration and outside the if block where it was written. Block scope means let and const exist only inside the {} where they are declared, so blockScoped would throw a ReferenceError if accessed outside the if. Understanding the difference helps you avoid subtle bugs when mixing var with modern declarations.',
    code: `function demo() {
  if (true) {
    var funcScoped = 1;
    let blockScoped = 2;
  }
  console.log(funcScoped); // 1
  // console.log(blockScoped); // ReferenceError
}
demo();`,
    output: ['1'],
  },
  {
    id: 47,
    category: 'Scope & Closures',
    question: 'What is a factory function?',
    answer: 'A factory function is a regular function that creates and returns a new object each time you call it, without using new or a constructor. It is often paired with closures to bake in configuration or private state for each instance. This keeps object creation flexible and avoids the confusion of this binding inside constructors.',
    code: `function createUser(name, role = "user") {
  return {
    name,
    role,
    greet() { return \`Hi, I'm \${this.name}\`; },
  };
}
const admin = createUser("Alice", "admin");
console.log(admin.greet());`,
    output: ["Hi, I'm Alice"],
  },
  {
    id: 48,
    category: 'Scope & Closures',
    question: 'What is the revealing module pattern?',
    answer: 'The revealing module pattern defines all internal logic as private functions inside an IIFE, then returns an object that exposes only the methods you want public. Unlike mixing public and private members in one literal, every helper stays hidden unless you deliberately add it to the return value. That makes the API surface clear and reduces accidental coupling to internals.',
    code: `const Counter = (function() {
  let count = 0;
  function increment() { return ++count; }
  function reset() { count = 0; }
  return { increment, reset };
})();
console.log(Counter.increment());
console.log(Counter.increment());`,
    output: ['1', '2'],
  },
  {
    id: 49,
    category: 'Scope & Closures',
    question: 'Can you modify closed-over variables?',
    answer: 'Yes—closures hold live references to outer variables, not frozen snapshots of their values at creation time. Reassigning or mutating a closed-over variable is visible to every inner function that shares that scope, which is how inc, dec, and get all stay in sync on the same count. Primitives are updated in place through reassignment; objects are shared by reference so mutations propagate too.',
    code: `function outer() {
  let count = 0;
  return {
    inc: () => ++count,
    dec: () => --count,
    get: () => count,
  };
}
const c = outer();
c.inc(); c.inc(); c.dec();
console.log(c.get());`,
    output: ['1'],
  },
]
