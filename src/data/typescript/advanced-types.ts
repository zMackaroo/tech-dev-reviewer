import type { InterviewQuestion } from '../../types'

export const advancedTypesQuestions: InterviewQuestion[] = [
  {
    id: 66,
    category: 'Advanced Types',
    question: 'What are union types in TypeScript?',
    answer: 'A union type written as A | B means a value can be one of several types, giving you flexibility while still constraining what is allowed. TypeScript only lets you use members common to all members of the union unless you narrow the type with checks like typeof or in. Unions model optional states, heterogeneous inputs, and result types cleanly.',
    code: `function formatDate(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : input;
  return date.toISOString().slice(0, 10);
}

formatDate("2024-06-15");
formatDate(new Date());`,
  },
  {
    id: 67,
    category: 'Advanced Types',
    question: 'What are intersection types in TypeScript?',
    answer: 'An intersection type A & B combines multiple types into one that must satisfy all of them at once, merging properties and requirements. Intersections are useful for composing mixins, layering capabilities onto a base type, and merging object shapes. If two constituents have conflicting property types, TypeScript resolves to never for that property.',
    code: `interface Named {
  name: string;
}

interface Timestamped {
  createdAt: Date;
}

type Document = Named & Timestamped;

const doc: Document = {
  name: "Report",
  createdAt: new Date(),
};`,
  },
  {
    id: 68,
    category: 'Advanced Types',
    question: 'What are discriminated unions in TypeScript?',
    answer: 'A discriminated union is a union of object types that share a common literal property, called the discriminant, which TypeScript uses to narrow the type in switch or if statements. Once you check the discriminant, the compiler knows which variant you have and exposes the correct fields with full type safety. This pattern replaces fragile optional-field models where many properties are undefined on every variant.',
    code: `type ApiResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; message: string };

function handleResult(result: ApiResult<User>): void {
  switch (result.status) {
    case "success":
      console.log(result.data.name); // User
      break;
    case "error":
      console.log(result.message);   // string
      break;
  }
}`,
  },
  {
    id: 69,
    category: 'Advanced Types',
    question: 'What are mapped types in TypeScript?',
    answer: 'Mapped types transform each property of an existing type by iterating over its keys with a [K in keyof T] pattern and producing a new shape. They power many built-in utilities like Partial and Readonly and let you define reusable type transformations in your own codebase. Optional modifiers, readonly modifiers, and remapping via as can be applied during the mapping.',
    code: `type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

type DraftConfig = Mutable<Config>;
// { apiUrl: string; timeout: number }`,
  },
  {
    id: 70,
    category: 'Advanced Types',
    question: 'What are conditional types in TypeScript?',
    answer: 'Conditional types use the T extends U ? X : Y syntax to pick one of two types based on whether T is assignable to U. They enable type-level logic such as unwrap functions, filtering unions, and branching on primitive versus object types. When T is a union, conditional types distribute over each member unless wrapped in brackets.',
    code: `type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

type Flatten<T> = T extends (infer U)[] ? U : T;
type Element = Flatten<string[]>; // string`,
  },
  {
    id: 71,
    category: 'Advanced Types',
    question: 'What does the infer keyword do in conditional types?',
    answer: 'The infer keyword declares a type variable inside a conditional type that TypeScript infers from the matched position in the extends clause. It is most commonly used to extract return types, parameter types, or element types from functions and arrays. infer only works within the extends side of a conditional type, not in arbitrary type expressions.',
    code: `type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type A = UnwrapPromise<Promise<number>>; // number
type B = UnwrapPromise<string>;          // string

type FirstArg<T> = T extends (first: infer F, ...rest: unknown[]) => unknown ? F : never;
type Arg = FirstArg<(name: string, age: number) => void>; // string`,
  },
  {
    id: 72,
    category: 'Advanced Types',
    question: 'How do Partial and Required utility types work?',
    answer: 'Partial<T> makes every property in T optional, which is ideal for update payloads where callers send only changed fields. Required<T> does the opposite, making every property required, including those originally marked optional with ?. Both are implemented as mapped types over keyof T.',
    code: `interface User {
  id: string;
  name: string;
  email?: string;
}

type UserUpdate = Partial<User>;
// { id?: string; name?: string; email?: string }

type StrictUser = Required<User>;
// { id: string; name: string; email: string }`,
  },
  {
    id: 73,
    category: 'Advanced Types',
    question: 'How do Pick and Omit utility types work?',
    answer: 'Pick<T, K> constructs a type with only the properties listed in K, where K is a union of keys of T. Omit<T, K> removes the listed keys and keeps everything else, which is often cleaner when a type has many fields and you only need to exclude a few. Both are built on mapped types and keyof.',
    code: `interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

type PublicProfile = Pick<User, "id" | "name">;
// { id: string; name: string }

type UserWithoutRole = Omit<User, "role">;
// { id: string; name: string; email: string }`,
  },
  {
    id: 74,
    category: 'Advanced Types',
    question: 'How does the Record utility type work?',
    answer: 'Record<Keys, Type> builds an object type whose keys are Keys and whose every property has Type. It is useful for dictionaries, lookup tables, and mapping known string or number literals to a uniform value type. Keys can be a union of string, number, or symbol literals, giving you a precise key set.',
    code: `type Status = "pending" | "approved" | "rejected";

type StatusCounts = Record<Status, number>;

const counts: StatusCounts = {
  pending: 5,
  approved: 12,
  rejected: 2,
};`,
  },
  {
    id: 75,
    category: 'Advanced Types',
    question: 'How do Exclude and Extract utility types work?',
    answer: 'Exclude<T, U> removes from union T any types assignable to U, while Extract<T, U> keeps only the members of T that are assignable to U. They operate on unions at the type level and are helpful for filtering tagged unions or pruning unwanted variants. Think of Exclude as subtraction and Extract as intersection filtering.',
    code: `type Shape = Circle | Square | Triangle;

type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; side: number };
type Triangle = { kind: "triangle"; base: number; height: number };

type Polygons = Exclude<Shape, Circle>;
// Square | Triangle

type CircleOnly = Extract<Shape, { kind: "circle" }>;
// Circle`,
  },
  {
    id: 76,
    category: 'Advanced Types',
    question: 'How do ReturnType and Parameters utility types work?',
    answer: 'ReturnType<T> extracts the return type of a function type T, and Parameters<T> extracts its parameters as a tuple type. They are implemented with conditional types and infer, so they work on any function signature without executing code. These utilities are invaluable for wrapping functions, building decorators, and typing callbacks that must match an existing function.',
    code: `function fetchUser(id: string): Promise<{ id: string; name: string }> {
  return fetch(\`/api/users/\${id}\`).then((r) => r.json());
}

type FetchUserResult = ReturnType<typeof fetchUser>;
// Promise<{ id: string; name: string }>

type FetchUserArgs = Parameters<typeof fetchUser>;
// [id: string]`,
  },
  {
    id: 77,
    category: 'Advanced Types',
    question: 'What are template literal types in TypeScript?',
    answer: 'Template literal types build string union types using backtick syntax, combining literal types the same way template strings combine values at runtime. They can interpolate unions, which distributes to produce every combination, making them powerful for API routes, CSS values, and event names. Template literals pair well with mapped types for string manipulation at the type level.',
    code: `type Color = "red" | "blue";
type Size = "sm" | "lg";

type ColorSize = \`\${Color}-\${Size}\`;
// "red-sm" | "red-lg" | "blue-sm" | "blue-lg"

type Getter<K extends string> = \`get\${Capitalize<K>}\`;
type Methods = Getter<"name" | "age">;
// "getName" | "getAge"`,
  },
  {
    id: 78,
    category: 'Advanced Types',
    question: 'What are index access types in TypeScript?',
    answer: 'Index access types use the bracket notation T[K] to look up the type of a property or element in T, where K can be a key, union of keys, or number for arrays and tuples. They let you derive related types from an existing interface without duplicating field definitions. Combined with keyof, they underpin utilities like Pick and safe property getters.',
    code: `interface User {
  id: string;
  name: string;
  address: {
    city: string;
    zip: string;
  };
}

type UserName = User["name"];           // string
type Address = User["address"];         // { city: string; zip: string }
type CityOrZip = User["address"]["city"]; // string`,
  },
  {
    id: 79,
    category: 'Advanced Types',
    question: 'What does the as const assertion do?',
    answer: 'The as const assertion tells TypeScript to infer the narrowest possible literal types for a value, making strings, numbers, and booleans into readonly literal unions instead of widening to string or number. Arrays and objects become deeply readonly with literal keys preserved. This is essential for defining constant maps, route paths, and action types that other types depend on.',
    code: `const routes = ["/", "/about", "/contact"] as const;
type Route = (typeof routes)[number];
// "/" | "/about" | "/contact"

const config = {
  theme: "dark",
  version: 2,
} as const;
// { readonly theme: "dark"; readonly version: 2 }`,
  },
  {
    id: 80,
    category: 'Advanced Types',
    question: 'How do you combine advanced types in practice?',
    answer: 'Real-world TypeScript types layer unions, mapped types, conditionals, and utility types together to model precise APIs without repeating yourself. The key is starting from concrete values or interfaces and deriving variants with keyof, indexed access, and infer rather than maintaining parallel type hierarchies. Combining techniques keeps types DRY and aligned with runtime code.',
    code: `const events = {
  login: (user: { id: string }) => {},
  logout: () => {},
} as const;

type EventMap = typeof events;
type EventName = keyof EventMap;

type Listeners = {
  [K in EventName]: Array<EventMap[K]>;
};

const listeners: Listeners = {
  login: [],
  logout: [],
};`,
  },
]
