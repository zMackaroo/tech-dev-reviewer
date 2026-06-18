import type { InterviewQuestion } from '../../types'

export const basicTypesQuestions: InterviewQuestion[] = [
  {
    id: 16,
    category: 'Basic Types',
    question: 'What are the primitive types string, number, and boolean in TypeScript?',
    answer: 'string, number, and boolean are TypeScript\'s primitive types for text, numeric values, and true/false flags respectively. Unlike JavaScript, TypeScript distinguishes these at compile time so you cannot assign incompatible values without an error. string covers any textual data, number includes integers and floats (there is no separate int or float type), and boolean is strictly true or false.',
    code: `let title: string = "TypeScript Basics";
let count: number = 42;
let isActive: boolean = true;

// title = 123;   // Error
// count = "10";  // Error
// isActive = 1;  // Error

console.log(typeof title, typeof count, typeof isActive);`,
  },
  {
    id: 17,
    category: 'Basic Types',
    question: 'What is the difference between any and unknown?',
    answer: 'any disables type checking entirely, allowing you to assign any value and access any property without compiler errors—it is an escape hatch that sacrifices safety. unknown is the type-safe counterpart: you can assign anything to it, but you must narrow or assert the type before using it in operations. Prefer unknown over any when handling values from external sources because it forces you to validate before use.',
    code: `let flexible: any = "hello";
flexible = 42;
flexible.foo.bar; // No error — dangerous!

let safe: unknown = "hello";
// safe.toUpperCase(); // Error: Object is of type 'unknown'

if (typeof safe === "string") {
  console.log(safe.toUpperCase()); // OK after narrowing
}`,
  },
  {
    id: 18,
    category: 'Basic Types',
    question: 'What is the void type in TypeScript?',
    answer: 'void represents the absence of a return value, most commonly used as the return type of functions that perform side effects but do not return anything meaningful. A function declared as returning void may still have a return statement with no value, or implicitly return undefined. void is different from undefined as a type—void is for function return types while undefined is a value type.',
    code: `function logMessage(msg: string): void {
  console.log(msg);
  // no return needed
}

function noop(): void {
  return; // allowed — returns undefined
}

logMessage("Application started");`,
  },
  {
    id: 19,
    category: 'Basic Types',
    question: 'What is the never type in TypeScript?',
    answer: 'never represents values that never occur—it is the return type of functions that always throw an error or run forever, like an infinite loop. TypeScript also uses never in exhaustive checking: if a switch statement covers all cases of a union, the default branch type becomes never, and assigning anything there is an error. This helps catch missing cases when you add a new variant to a union.',
    code: `function fail(message: string): never {
  throw new Error(message);
}

function exhaustiveCheck(value: never): never {
  throw new Error(\`Unhandled: \${value}\`);
}

type Status = "ok" | "fail";

function handle(status: Status) {
  switch (status) {
    case "ok": return "Done";
    case "fail": return "Error";
    default: return exhaustiveCheck(status);
  }
}`,
  },
  {
    id: 20,
    category: 'Basic Types',
    question: 'How do null and undefined work in TypeScript?',
    answer: 'null and undefined are both primitive types representing the absence of a value, but they carry different intent—undefined typically means not yet assigned, while null means intentionally empty. With strictNullChecks enabled (recommended), null and undefined are not assignable to other types unless you explicitly include them in a union like string | null. This prevents the common bug of calling methods on a value that might not exist.',
    code: `let name: string | undefined;
let avatar: string | null = null;

name = "Alice";
// name.toUpperCase(); // Error if name is still undefined

if (name !== undefined) {
  console.log(name.toUpperCase());
}

function findUser(id: string): { name: string } | null {
  return id === "1" ? { name: "Bob" } : null;
}`,
  },
  {
    id: 21,
    category: 'Basic Types',
    question: 'What are literal types in TypeScript?',
    answer: 'Literal types are specific values used as types rather than broad categories—like the literal "success" instead of the general string type. They are often combined with unions to create a fixed set of allowed values, similar to an enum but more lightweight. Literal types enable exhaustive checking and precise autocomplete in the editor.',
    code: `type Direction = "north" | "south" | "east" | "west";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

let heading: Direction = "north";
// heading = "up"; // Error: not in the union

const answer = 42; // inferred as literal type 42, not number
let count: number = answer; // OK — 42 is assignable to number`,
  },
  {
    id: 22,
    category: 'Basic Types',
    question: 'What are enums in TypeScript and when should you use them?',
    answer: 'Enums declare a set of named constants, either as numeric enums (auto-incrementing numbers) or string enums (explicit string values). They give readable names to magic values and can improve autocomplete when a fixed set of options is shared across a codebase. However, enums generate runtime JavaScript code unlike most type-only constructs, and many teams prefer const objects with as const or union types instead.',
    code: `enum Status {
  Pending = "PENDING",
  Active = "ACTIVE",
  Archived = "ARCHIVED",
}

function setStatus(status: Status) {
  console.log(\`Status: \${status}\`);
}

setStatus(Status.Active);

// Numeric enum (auto-increment)
enum Priority {
  Low,    // 0
  Medium, // 1
  High,   // 2
}`,
  },
  {
    id: 23,
    category: 'Basic Types',
    question: 'What are tuple types in TypeScript?',
    answer: 'A tuple is an array type with a fixed number of elements where each position has a specific, known type. Unlike a regular array type like number[], a tuple enforces both length and per-index types, such as [string, number] for a key-value pair. Tuples are useful for returning multiple values from a function or representing structured rows like CSV records.',
    code: `type Point = [number, number];
type NamedEntry = [string, number];

const origin: Point = [0, 0];
const entry: NamedEntry = ["age", 30];

function getMinMax(nums: number[]): [number, number] {
  return [Math.min(...nums), Math.max(...nums)];
}

const [min, max] = getMinMax([3, 1, 4, 1, 5]);
console.log(min, max);`,
  },
  {
    id: 24,
    category: 'Basic Types',
    question: 'How does the object type work in TypeScript?',
    answer: 'The object type represents any non-primitive value—anything that is not string, number, boolean, symbol, bigint, null, or undefined. It is rarely used alone because it only guarantees the value is an object, not what properties it has. In practice, you define specific object shapes with interfaces or type aliases listing named properties and their types.',
    code: `// Generic object — rarely useful alone
let value: object = { x: 1 };
// value.x; // Error: Property 'x' does not exist on type 'object'

// Specific object shape — preferred
type ServerConfig = {
  host: string;
  port: number;
  ssl: boolean;
};

const config: ServerConfig = {
  host: "localhost",
  port: 3000,
  ssl: false,
};`,
  },
  {
    id: 25,
    category: 'Basic Types',
    question: 'What is the bigint type in TypeScript?',
    answer: 'bigint is TypeScript\'s type for arbitrary-precision integers, matching JavaScript\'s BigInt primitive introduced in ES2020. You create bigint values with the n suffix (100n) or the BigInt() constructor, and they are needed when numbers exceed Number.MAX_SAFE_INTEGER. TypeScript prevents mixing bigint and number in arithmetic without explicit conversion, avoiding silent precision loss.',
    code: `const large: bigint = 9007199254740991n;
const next: bigint = large + 1n;

console.log(next.toString()); // "9007199254740992"

// Cannot mix bigint and number without conversion
const num = 42;
// const bad = large + num; // Error
const converted = large + BigInt(num);`,
  },
  {
    id: 26,
    category: 'Basic Types',
    question: 'What is the symbol type in TypeScript?',
    answer: 'symbol is TypeScript\'s type for JavaScript Symbol values—unique, immutable identifiers often used as object property keys to avoid naming collisions. Each Symbol() call creates a distinct value even if the description string is identical. TypeScript treats symbol as a primitive type alongside string and number.',
    code: `const id: unique symbol = Symbol("id") as unique symbol;
const id2 = Symbol("id");

console.log(id === id2); // false — always unique

const cacheKey: unique symbol = Symbol("cache");

interface Service {
  [cacheKey]?: Map<string, unknown>;
  name: string;
}`,
  },
  {
    id: 27,
    category: 'Basic Types',
    question: 'How do you type arrays in TypeScript?',
    answer: 'TypeScript offers two equivalent syntaxes for array types: Type[] (shorthand) and Array<Type> (generic syntax). Arrays are homogeneous by default—number[] means every element must be a number. For arrays that may contain multiple types, use a union like (string | number)[]. Readonly arrays prevent mutation with readonly string[] or ReadonlyArray<string>.',
    code: `const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["Alice", "Bob"];

const mixed: (string | number)[] = ["one", 2, "three"];

const frozen: readonly string[] = ["a", "b"];
// frozen.push("c"); // Error: Property 'push' does not exist

function sum(nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}`,
  },
]
