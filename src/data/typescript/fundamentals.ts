import type { InterviewQuestion } from '../../types'

export const fundamentalsQuestions: InterviewQuestion[] = [
  {
    id: 1,
    category: 'Fundamentals',
    question: 'What is TypeScript?',
    answer: 'TypeScript is a strongly typed programming language developed by Microsoft that builds on JavaScript by adding optional static types and modern language features. It is a superset of JavaScript, meaning any valid JavaScript file is also valid TypeScript, so you can adopt it incrementally without rewriting existing code. TypeScript code is compiled (transpiled) to plain JavaScript that runs in browsers, Node.js, or any JS runtime.',
    code: `// TypeScript adds types to JavaScript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);`,
  },
  {
    id: 2,
    category: 'Fundamentals',
    question: 'What is the difference between JavaScript and TypeScript?',
    answer: 'JavaScript is a dynamically typed language where variable types are determined at runtime and can change freely. TypeScript extends JavaScript with a static type system checked at compile time, catching type errors before the code runs. TypeScript does not execute directly in the browser—you compile it to JavaScript first using the TypeScript compiler (tsc) or a bundler like Vite or Webpack.',
    code: `// JavaScript — no compile-time type check
function add(a, b) {
  return a + b;
}
add("1", 2); // "12" at runtime, no warning

// TypeScript — catches the mistake early
function addTyped(a: number, b: number): number {
  return a + b;
}
// addTyped("1", 2); // Error: Argument of type 'string' is not assignable`,
  },
  {
    id: 3,
    category: 'Fundamentals',
    question: 'What is static typing in TypeScript?',
    answer: 'Static typing means the types of variables, function parameters, and return values are known and checked at compile time rather than discovered only when the program runs. TypeScript analyzes your code before execution and reports errors like assigning a boolean to a string variable or calling a method that does not exist on a type. This catches an entire class of bugs early and makes refactoring safer because the compiler verifies all usages when you rename or restructure types.',
    code: `let username: string = "alice";
// username = 42; // Error: Type 'number' is not assignable to type 'string'

interface User {
  id: number;
  email: string;
}

function sendWelcome(user: User): void {
  console.log(\`Welcome, \${user.email}\`);
}`,
  },
  {
    id: 4,
    category: 'Fundamentals',
    question: 'What is the TypeScript compiler (tsc) and what does it do?',
    answer: 'The TypeScript compiler (tsc) is the official tool that converts TypeScript source files into JavaScript while performing type checking along the way. It reads tsconfig.json for project settings like target ECMAScript version, module format, and strictness flags. tsc can emit JavaScript files to disk or be used in noEmit mode where it only type-checks without producing output—common in projects that use Vite or esbuild for bundling.',
    code: `// tsconfig.json (simplified)
// {
//   "compilerOptions": {
//     "target": "ES2020",
//     "module": "ESNext",
//     "strict": true,
//     "noEmit": true
//   }
// }

// Run: npx tsc          — compile .ts to .js
// Run: npx tsc --noEmit — type-check only`,
  },
  {
    id: 5,
    category: 'Fundamentals',
    question: 'What is transpilation in the context of TypeScript?',
    answer: 'Transpilation (or transcompilation) is the process of converting source code from one language or version to another while keeping the same behavior at runtime. TypeScript transpiles to JavaScript because browsers and Node.js do not natively execute TypeScript—they only understand JavaScript. During transpilation, type annotations are stripped away entirely since they exist only for the compiler.',
    code: `// Input: TypeScript
const price: number = 29.99;
const label: string = \`Price: $\${price}\`;

// Output after transpilation (types removed):
// const price = 29.99;
// const label = \`Price: $\${price}\`;`,
  },
  {
    id: 6,
    category: 'Fundamentals',
    question: 'What are type annotations in TypeScript?',
    answer: 'Type annotations are explicit type declarations you add to variables, function parameters, and return values using a colon syntax like name: string or count: number. They tell the compiler what kind of value is expected and enable autocomplete and error checking in your editor. Annotations are optional when TypeScript can infer the type from the initial value, but they are required in function signatures and when inference would be too broad.',
    code: `let count: number = 0;
let active: boolean = true;

function formatPrice(amount: number, currency: string): string {
  return \`\${currency}\${amount.toFixed(2)}\`;
}

const total: string = formatPrice(19.5, "USD");`,
  },
  {
    id: 7,
    category: 'Fundamentals',
    question: 'What is type inference in TypeScript?',
    answer: 'Type inference is TypeScript\'s ability to automatically determine the type of a variable or expression without an explicit annotation. When you write const name = "Alice", the compiler infers string because the initial value is a string literal. Inference also works for function return types and complex expressions, reducing boilerplate while still providing type safety.',
    code: `const items = [1, 2, 3];        // inferred as number[]
const first = items[0];           // inferred as number

function double(n: number) {
  return n * 2;                   // return type inferred as number
}

const result = double(5);       // inferred as number
console.log(result);`,
  },
  {
    id: 8,
    category: 'Fundamentals',
    question: 'Why use TypeScript instead of plain JavaScript?',
    answer: 'TypeScript improves developer experience with early error detection, better IDE autocomplete, and safer refactoring across large codebases. Types serve as living documentation that stays in sync with the code, making it easier for new team members to understand function contracts and data shapes. It scales well in teams where many people touch the same modules, reducing regressions during refactors.',
    code: `interface Product {
  id: string;
  name: string;
  price: number;
}

function renderProduct(product: Product): string {
  return \`\${product.name} — $\${product.price}\`;
}

// IDE autocomplete shows id, name, price
// Typos like product.nmae are caught instantly`,
  },
  {
    id: 9,
    category: 'Fundamentals',
    question: 'What is gradual typing in TypeScript?',
    answer: 'Gradual typing means you can mix typed and untyped code in the same project, adopting TypeScript at your own pace rather than converting everything at once. You can rename .js files to .ts one at a time, use any for legacy modules, and tighten types over time as you refactor. This is a major reason TypeScript succeeded in large existing JavaScript codebases where a full rewrite would be impractical.',
    code: `// Legacy module — loosely typed for now
function legacyHelper(data: any) {
  return data.value;
}

// New module — fully typed
interface Config {
  apiUrl: string;
  timeout: number;
}

function createClient(config: Config) {
  return { url: config.apiUrl, timeout: config.timeout };
}`,
  },
  {
    id: 10,
    category: 'Fundamentals',
    question: 'What is the difference between .ts and .tsx files?',
    answer: 'Both .ts and .tsx are TypeScript source files, but .tsx is required when the file contains JSX syntax used by React and similar frameworks. The .tsx extension tells the compiler to parse angle-bracket tags as JSX rather than generic type syntax or comparison operators. Regular .ts files should not contain JSX—putting JSX in a .ts file causes a parse error.',
    code: `// Button.tsx — JSX requires .tsx extension
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}`,
  },
  {
    id: 11,
    category: 'Fundamentals',
    question: 'What is type erasure in TypeScript?',
    answer: 'Type erasure means all type information is removed during compilation and does not exist at runtime in the resulting JavaScript. Interfaces, type aliases, and generic type parameters are compile-time constructs only—you cannot inspect them with typeof or instanceof at runtime. This design keeps the runtime identical to hand-written JavaScript with zero type-related performance overhead.',
    code: `interface User {
  id: number;
  name: string;
}

const user: User = { id: 1, name: "Bob" };

// After compilation, "User" is gone:
// const user = { id: 1, name: "Bob" };

// typeof user === "object" — no "User" at runtime
console.log(typeof user);`,
  },
  {
    id: 12,
    category: 'Fundamentals',
    question: 'How do TypeScript versions relate to JavaScript (ECMAScript) versions?',
    answer: 'Each TypeScript release targets specific ECMAScript versions and adds support for newer JS features as they stabilize in the spec. The target option in tsconfig.json controls which JS version tsc emits, such as ES2015, ES2020, or ESNext. TypeScript also ships its own features—like enums, decorators, and namespace syntax—that may not map directly to standard JavaScript.',
    code: `// tsconfig.json
// {
//   "compilerOptions": {
//     "target": "ES2020",
//     "lib": ["ES2020", "DOM"]
//   }
// }

// Modern syntax compiles cleanly to ES2020
const city = user?.address?.city ?? "Unknown";
console.log(city);`,
  },
  {
    id: 13,
    category: 'Fundamentals',
    question: 'How do you install and set up TypeScript in a project?',
    answer: 'Install TypeScript as a dev dependency with npm install -D typescript, which gives you the tsc compiler and type definitions tooling. Initialize a project with npx tsc --init to generate a tsconfig.json file that controls compiler options. Most modern frameworks like Vite, Next.js, and Create React App include TypeScript support out of the box or via a simple flag during setup.',
    code: `// package.json scripts
// {
//   "scripts": {
//     "typecheck": "tsc --noEmit",
//     "build": "tsc && node dist/index.js"
//   },
//   "devDependencies": {
//     "typescript": "^5.4.0"
//   }
// }

// Terminal:
// npm install -D typescript
// npx tsc --init`,
  },
  {
    id: 14,
    category: 'Fundamentals',
    question: 'How is TypeScript used in React projects?',
    answer: 'In React projects, TypeScript types component props, state, event handlers, and refs so UI code is self-documenting and less prone to runtime errors. You define props with interfaces or type aliases and destructure them in function components, while hooks like useState can be given explicit generic types when inference is insufficient. Tools like @types/react provide type definitions for React APIs.',
    code: `import { useState } from "react";

interface CounterProps {
  initialCount?: number;
  label: string;
}

export function Counter({ initialCount = 0, label }: CounterProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <p>{label}: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
    </div>
  );
}`,
  },
  {
    id: 15,
    category: 'Fundamentals',
    question: 'What is the difference between compile-time and runtime type checking?',
    answer: 'Compile-time type checking happens when TypeScript analyzes your source code before it runs, reporting errors in the editor or during the build step. Runtime type checking happens while the program executes, using JavaScript mechanisms like typeof, instanceof, or validation libraries. TypeScript types are erased at compile time, so they provide zero runtime protection against bad data from external sources like APIs.',
    code: `interface User {
  id: number;
  name: string;
}

// Compile-time only — TypeScript trusts you
function greet(user: User) {
  return \`Hello, \${user.name}\`;
}

// Runtime check for untrusted data
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}`,
  },
]
