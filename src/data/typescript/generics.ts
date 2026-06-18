import type { InterviewQuestion } from '../../types'

export const genericsQuestions: InterviewQuestion[] = [
  {
    id: 40,
    category: 'Generics',
    question: 'What are generics in TypeScript and why use them?',
    answer: 'Generics let you write reusable code that works with multiple types while keeping full type safety, instead of duplicating functions for each type or falling back to any. A generic type parameter acts as a placeholder that callers fill in with a concrete type, so the compiler can check correctness at compile time. They are essential for collections, API wrappers, and utility functions where the shape of data varies but the logic stays the same.',
    code: `function identity<T>(value: T): T {
  return value;
}

const num = identity(42);       // T inferred as number
const str = identity("hello");  // T inferred as string`,
  },
  {
    id: 41,
    category: 'Generics',
    question: 'How do you write a generic function in TypeScript?',
    answer: 'Declare a type parameter in angle brackets after the function name, then use that parameter in parameter and return types. TypeScript can often infer T from the arguments you pass, so explicit type arguments are optional when inference is unambiguous. You can also provide explicit type arguments like wrap<string>("hi") when inference would pick a wider type than you want.',
    code: `function wrap<T>(value: T): { data: T; timestamp: number } {
  return { data: value, timestamp: Date.now() };
}

const result = wrap({ id: 1, name: "Ada" });
// result.data is { id: number; name: string }`,
  },
  {
    id: 42,
    category: 'Generics',
    question: 'How do you define a generic interface?',
    answer: 'Generic interfaces declare one or more type parameters in angle brackets after the interface name, then reference those parameters in property types. This pattern models containers, API responses, and configuration objects whose structure is fixed but whose payload type varies. Callers specialize the interface by supplying concrete type arguments, either explicitly or through contextual typing.',
    code: `interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

const userResponse: ApiResponse<{ id: string; name: string }> = {
  data: { id: "u1", name: "Ada" },
  status: 200,
};`,
  },
  {
    id: 43,
    category: 'Generics',
    question: 'What are generic constraints with extends?',
    answer: 'A generic constraint limits what types can be passed to a type parameter by requiring T extends SomeType. This lets you safely access properties or call methods that exist on the constraint type inside the generic body. Without constraints, TypeScript treats T as unknown for property access unless you narrow it further.',
    code: `function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

getLength("hello");     // OK — string has length
getLength([1, 2, 3]);   // OK — array has length
// getLength(42);       // Error — number has no length`,
  },
  {
    id: 44,
    category: 'Generics',
    question: 'What are default type parameters in generics?',
    answer: 'Default type parameters let you specify a fallback type when callers omit the type argument, similar to default values for function parameters. You write T = SomeDefault in the generic declaration, and TypeScript uses that default unless a concrete type is provided or inferred. This keeps APIs ergonomic for the common case while still allowing specialization when needed.',
    code: `interface Result<T = void> {
  success: boolean;
  data?: T;
}

const ok: Result = { success: true };
const withData: Result<string> = { success: true, data: "done" };`,
  },
  {
    id: 45,
    category: 'Generics',
    question: 'How do you create a generic class in TypeScript?',
    answer: 'Generic classes declare type parameters on the class itself and use them for fields, constructor parameters, and methods throughout the class body. Each instance is tied to the concrete type arguments used when the class was constructed or referenced. This is the standard pattern for reusable data structures like stacks, queues, and caches.',
    code: `class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

const numStack = new Stack<number>();
numStack.push(1);
const top = numStack.pop(); // number | undefined`,
  },
  {
    id: 46,
    category: 'Generics',
    question: 'What is the keyof operator in TypeScript?',
    answer: 'The keyof operator produces a union of all string, number, or symbol keys of a given type. It is commonly combined with generics to build type-safe property accessors that only accept valid key names. When paired with indexed access types, keyof enables patterns like Pick and mapped types without hard-coding field names.',
    code: `interface User {
  id: number;
  name: string;
  email: string;
}

type UserKeys = keyof User; // "id" | "name" | "email"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { id: 1, name: "Ada", email: "a@x.com" };
const name = getProperty(user, "name"); // string`,
  },
  {
    id: 47,
    category: 'Generics',
    question: 'How is typeof used in type positions?',
    answer: 'In type positions, typeof takes a value and produces that value\'s TypeScript type, which is different from the runtime typeof operator that returns a string. It is especially useful for deriving types from const objects, function return values, or imported configuration without manually duplicating interfaces. typeof pairs naturally with generics when you want a function to accept the same shape as an existing value.',
    code: `const defaultConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
} as const;

type Config = typeof defaultConfig;

function mergeConfig(overrides: Partial<Config>): Config {
  return { ...defaultConfig, ...overrides };
}`,
  },
  {
    id: 48,
    category: 'Generics',
    question: 'How does TypeScript infer generic types?',
    answer: 'TypeScript infers generic type parameters from function arguments, return contexts, and assignment targets so callers often do not need to pass explicit type arguments. Inference picks the best common type or widens to a constraint depending on how arguments are used. When inference fails or produces an overly wide type, you can guide it with explicit type arguments or helper annotations.',
    code: `function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const nums = first([1, 2, 3]);     // number | undefined
const names = first(["a", "b"]);   // string | undefined

// Explicit when needed:
const mixed = first<number | string>([1, "two"]);`,
  },
  {
    id: 49,
    category: 'Generics',
    question: 'How do you use multiple type parameters in generics?',
    answer: 'Functions, interfaces, and classes can declare several type parameters separated by commas, each representing an independent type variable. Multiple parameters model relationships between types, such as mapping input types to output types or pairing keys with values. Constraints and defaults can be applied to each parameter independently.',
    code: `function map<T, U>(items: T[], fn: (item: T) => U): U[] {
  return items.map(fn);
}

const lengths = map(["hi", "bye"], (s) => s.length);
// string[] → number[]`,
  },
  {
    id: 50,
    category: 'Generics',
    question: 'What are common generic utility patterns in TypeScript?',
    answer: 'Beyond built-in utility types, teams routinely write small generic helpers such as Nullable<T>, AsyncReturnType<T>, or DeepPartial<T> to express recurring type transformations. These patterns usually combine mapped types, conditional types, and constraints to reshape types safely. Keeping them generic avoids copy-pasting nearly identical type definitions across modules.',
    code: `type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

type UserList = Paginated<{ id: string; name: string }>;

function fetchUsers(): Promise<UserList> {
  return fetch("/api/users").then((r) => r.json());
}`,
  },
  {
    id: 51,
    category: 'Generics',
    question: 'What are const generics in TypeScript?',
    answer: 'Const generics, introduced in TypeScript 5.0, let a type parameter capture a literal type when the caller passes a const assertion or a literal value, using the const modifier on the type parameter. Without const generics, a generic function might widen string literals to string, losing precise union types. This is valuable for route builders, event names, and configuration keys that must stay narrowly typed.',
    code: `function createAction<const T extends string>(type: T) {
  return (payload: unknown) => ({ type, payload }) as { type: T; payload: unknown };
}

const login = createAction("auth/login");
// login().type is "auth/login", not string`,
  },
  {
    id: 52,
    category: 'Generics',
    question: 'How do you combine keyof with generic constraints?',
    answer: 'Pairing K extends keyof T with a generic object type T is the foundation of type-safe pick, pluck, and update helpers. The constraint guarantees K is a valid key of T, and the return type T[K] ties the output to that specific property\'s type. This pattern prevents typos in property names and mismatched return types at compile time.',
    code: `function updateField<T, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): T {
  return { ...obj, [key]: value };
}

const user = { id: 1, name: "Ada", active: true };
const updated = updateField(user, "name", "Grace");
// updateField(user, "name", 42); // Error — number not assignable to string`,
  },
  {
    id: 53,
    category: 'Generics',
    question: 'What is the difference between generic functions and function overloads?',
    answer: 'Function overloads declare multiple call signatures for a single implementation, which is useful when parameters and return types follow fixed patterns per arity or argument shape. Generics parameterize types with variables, making one signature work across many types without listing every combination. Overloads can be clearer for highly specific APIs, while generics scale better for reusable utilities.',
    code: `// Overloads — fixed patterns
function parse(input: string): number;
function parse(input: string, format: "json"): unknown;
function parse(input: string, format?: "json"): number | unknown {
  return format === "json" ? JSON.parse(input) : Number(input);
}

// Generic — one flexible pattern
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}`,
  },
  {
    id: 54,
    category: 'Generics',
    question: 'How do generic type aliases work?',
    answer: 'A generic type alias uses the type keyword with type parameters to define a reusable type expression, similar to a generic interface but often more concise for unions, intersections, and mapped types. Type aliases can represent primitives, tuples, and complex conditional types that interfaces cannot express as cleanly. They are frequently used to name generic utility types for readability across a codebase.',
    code: `type Nullable<T> = T | null;
type ID = string | number;

type Entity<T extends ID> = {
  id: T;
  createdAt: Date;
};

type User = Entity<string>;
type LegacyUser = Entity<number>;`,
  },
  {
    id: 55,
    category: 'Generics',
    question: 'When should you prefer generics over any or unknown?',
    answer: 'Use generics when the same logic should operate on different types while preserving the relationship between inputs and outputs. any disables type checking entirely, and unknown requires narrowing at every use site without carrying type information through a pipeline. Generics strike the balance: flexible like any, but safe because the compiler tracks the concrete type through the call chain.',
    code: `// Avoid
function unsafeGet(key: string): any {
  return JSON.parse(localStorage.getItem(key) ?? "null");
}

// Prefer
function safeGet<T>(key: string): T | undefined {
  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : undefined;
}

const profile = safeGet<{ name: string }>("profile");`,
  },
]
