import type { InterviewQuestion } from '../../types'

export const interfacesQuestions: InterviewQuestion[] = [
  {
    id: 28,
    category: 'Interfaces & Types',
    question: 'What is the difference between interface and type alias?',
    answer: 'Both interfaces and type aliases define object shapes and can describe unions, but they differ in capabilities and conventions. Interfaces support declaration merging (multiple declarations with the same name combine) and are typically used for object and class contracts. Type aliases can represent primitives, unions, intersections, and tuples with a single syntax, but cannot be merged. In a real app, use interface for public API object shapes like User or ApiResponse, and type for unions like Status = "idle" | "loading" | "error" or utility combinations that interfaces cannot express cleanly.',
    code: `// Interface — great for object shapes
interface User {
  id: number;
  name: string;
}

// Type alias — flexible for unions and primitives
type ID = string | number;
type Status = "active" | "inactive";

type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };`,
  },
  {
    id: 29,
    category: 'Interfaces & Types',
    question: 'How do you extend interfaces in TypeScript?',
    answer: 'You extend an interface using the extends keyword to inherit all properties from a base interface and add or override members. Multiple interfaces can extend the same base, enabling shared contracts across related types. Extended interfaces form a hierarchy that mirrors object-oriented inheritance without runtime cost. For example, extending a BaseEntity interface with id and createdAt lets every domain model like User, Product, and Order share common fields while adding their own specific properties.',
    code: `interface BaseEntity {
  id: string;
  createdAt: Date;
}

interface User extends BaseEntity {
  email: string;
  role: "admin" | "user";
}

interface Product extends BaseEntity {
  name: string;
  price: number;
}

const user: User = {
  id: "u1",
  createdAt: new Date(),
  email: "alice@example.com",
  role: "admin",
};`,
  },
  {
    id: 30,
    category: 'Interfaces & Types',
    question: 'What are intersection types in TypeScript?',
    answer: 'An intersection type combines multiple types into one using the & operator, requiring a value to satisfy all constituent types simultaneously. Unlike extending (which adds to a single base), intersections merge independent types—useful for mixing in capabilities or combining object shapes. Intersection types work with both interfaces and type aliases. For example, type AdminUser = User & { permissions: string[] } creates a type that must have every User property plus a permissions array, useful when augmenting objects with role-specific fields.',
    code: `type Named = { name: string };
type Aged = { age: number };
type Employee = Named & Aged & { department: string };

const employee: Employee = {
  name: "Bob",
  age: 30,
  department: "Engineering",
};

type Timestamped = { createdAt: Date; updatedAt: Date };
type AuditableUser = User & Timestamped;`,
  },
  {
    id: 31,
    category: 'Interfaces & Types',
    question: 'How do optional properties work in interfaces?',
    answer: 'Optional properties are marked with a ? after the property name, indicating the key may be absent or explicitly set to undefined. This is essential for modeling partial data like form drafts, API responses with nullable fields, or configuration objects with sensible defaults. Optional properties differ from properties typed as T | undefined because the key itself can be missing from the object. In a real app, an optional middleName?: string on a UserProfile lets you render profiles without requiring every user to have a middle name field in the database.',
    code: `interface UserProfile {
  firstName: string;
  lastName: string;
  middleName?: string;
  bio?: string;
}

const minimal: UserProfile = {
  firstName: "Alice",
  lastName: "Smith",
};

const full: UserProfile = {
  firstName: "Bob",
  lastName: "Jones",
  middleName: "Lee",
  bio: "Developer",
};`,
  },
  {
    id: 32,
    category: 'Interfaces & Types',
    question: 'What does readonly do on interface properties?',
    answer: 'The readonly modifier prevents reassignment of a property after the object is created—the value can be read but not written to. This applies to the property binding, not deep immutability: readonly on an array property still allows mutating the array contents unless you use readonly string[]. Readonly helps enforce immutability patterns and makes intent clear to other developers. For example, marking config values as readonly in a shared constants object prevents accidental mutation that could cause bugs across modules importing the same reference.',
    code: `interface Point {
  readonly x: number;
  readonly y: number;
}

const point: Point = { x: 10, y: 20 };
// point.x = 5; // Error: Cannot assign to 'x' because it is read-only

interface Config {
  readonly apiUrl: string;
  readonly maxRetries: number;
}

const config: Config = {
  apiUrl: "https://api.example.com",
  maxRetries: 3,
};`,
  },
  {
    id: 33,
    category: 'Interfaces & Types',
    question: 'What are index signatures in TypeScript?',
    answer: 'An index signature defines the type of values for properties accessed by dynamic string or number keys, written as [key: string]: Type inside an interface. It is useful when you know the value type but not the exact property names ahead of time, such as dictionaries, lookup tables, or string-keyed caches. Index signatures must be compatible with all explicitly named properties on the same interface. In a real app, a translations interface like { [key: string]: string } maps locale keys to translated strings while still allowing TypeScript to verify every value is a string.',
    code: `interface StringDictionary {
  [key: string]: string;
}

const translations: StringDictionary = {
  greeting: "Hello",
  farewell: "Goodbye",
};

interface Scores {
  [playerId: string]: number;
  highScore: number; // must also be number
}

const scores: Scores = { highScore: 1000, player1: 850 };`,
  },
  {
    id: 34,
    category: 'Interfaces & Types',
    question: 'How do you extend type aliases?',
    answer: 'Type aliases do not support the extends keyword like interfaces do. Instead, you extend them using intersection types (&) to combine an existing type alias with additional properties. You can also use utility types like Omit and Pick to derive new types from existing ones. This flexibility makes type aliases powerful for composition. For example, type PublicUser = Omit<User, "password"> & { displayName: string } removes sensitive fields and adds a new one without duplicating the entire User definition.',
    code: `type Person = {
  name: string;
  age: number;
};

type Employee = Person & {
  employeeId: string;
  department: string;
};

type PublicUser = Omit<User, "password"> & {
  displayName: string;
};

type UserPreview = Pick<User, "id" | "name">;`,
  },
  {
    id: 35,
    category: 'Interfaces & Types',
    question: 'What is declaration merging in TypeScript?',
    answer: 'Declaration merging is a TypeScript feature where multiple declarations with the same name combine into a single definition. Interfaces support merging automatically—declaring interface Window twice merges their members into one interface. Type aliases do not support merging; a duplicate name is a compile error. This feature is how TypeScript augments global types like Window or NodeJS globals across different files. For example, a library might declare interface Window { myApp: AppAPI } to add a custom property to the browser window type without modifying lib.dom.d.ts.',
    code: `interface Window {
  myAppVersion: string;
}

interface Window {
  myAppConfig: { theme: string };
}

// Merged into one interface with both properties
window.myAppVersion = "1.0.0";
window.myAppConfig = { theme: "dark" };

// Type aliases CANNOT merge:
// type Foo = { a: string };
// type Foo = { b: number }; // Error: Duplicate identifier`,
  },
  {
    id: 36,
    category: 'Interfaces & Types',
    question: 'What are excess property checks in TypeScript?',
    answer: 'Excess property checking flags object literals that contain properties not defined in the target type, catching typos and unintended extra fields. This check applies to fresh object literals assigned directly to a typed variable or passed as arguments, but not when assigning from a variable or using spread syntax in certain cases. It is a key reason TypeScript catches mistakes that structural typing alone might miss. For example, passing { name: "Alice", emial: "a@b.com" } to a function expecting { name: string; email: string } triggers an error on the misspelled emial property.',
    code: `interface User {
  name: string;
  email: string;
}

// Excess property error on typo
// const bad: User = { name: "Alice", emial: "a@b.com" };

// OK — no excess check on indirect assignment
const extra = { name: "Bob", email: "b@c.com", age: 30 };
const user: User = extra; // allowed (age not checked here)

function createUser(u: User) {
  return u;
}

createUser({ name: "Carol", email: "c@d.com" }); // excess check applies`,
  },
  {
    id: 37,
    category: 'Interfaces & Types',
    question: 'What are callable interfaces in TypeScript?',
    answer: 'A callable interface describes an object that can be invoked as a function by defining a call signature with (args): ReturnType syntax alongside regular properties. This pattern models functions that also carry metadata, such as a debounced function with a .cancel() method or a React component with static properties. Callable interfaces bridge the gap between function types and object types. For example, a counter function that also exposes a .reset() method is naturally typed as an interface with both a call signature and a reset property.',
    code: `interface Counter {
  (step?: number): number;
  reset(): void;
  readonly count: number;
}

function createCounter(): Counter {
  let count = 0;
  const fn = ((step = 1) => {
    count += step;
    return count;
  }) as Counter;
  fn.reset = () => { count = 0; };
  Object.defineProperty(fn, "count", { get: () => count });
  return fn;
}

const counter = createCounter();
counter(5);
counter.reset();`,
  },
  {
    id: 38,
    category: 'Interfaces & Types',
    question: 'What are hybrid types in TypeScript?',
    answer: 'Hybrid types are types that act as more than one kind of value—most commonly an object that is also callable, or a type that combines function, object, and constructor signatures. TypeScript allows interfaces to declare call signatures, construct signatures, and property members on the same type. This is how libraries type jQuery-like ($) functions that are callable yet have attached properties and methods. In a real app, typing a styled-components-like API as a callable interface with attached .div and .span properties gives full autocomplete for both invoking the function and accessing its sub-components.',
    code: `interface Logger {
  (message: string): void;
  level: "info" | "warn" | "error";
  history: string[];
}

function createLogger(level: Logger["level"]): Logger {
  const history: string[] = [];
  const log = ((message: string) => {
    history.push(\`[\${level}] \${message}\`);
    console.log(\`[\${level}] \${message}\`);
  }) as Logger;
  log.level = level;
  log.history = history;
  return log;
}

const logger = createLogger("info");
logger("Server started");
console.log(logger.history);`,
  },
  {
    id: 39,
    category: 'Interfaces & Types',
    question: 'How do classes implement interfaces in TypeScript?',
    answer: 'Classes implement interfaces using the implements keyword, promising the class instance will have all properties and methods defined by the interface. Unlike extends (which inherits implementation), implements is a compile-time contract—the class must provide its own implementation for every interface member. A class can implement multiple interfaces simultaneously. In a real app, implementing a Repository<T> interface across UserRepository and ProductRepository classes ensures both follow the same findById, save, and delete method signatures, making them interchangeable in dependency injection.',
    code: `interface Identifiable {
  id: string;
}

interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

class User implements Identifiable, Timestamped {
  constructor(
    public id: string,
    public name: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  greet(): string {
    return \`Hello, \${this.name}\`;
  }
}

const user = new User("1", "Alice", new Date(), new Date());`,
  },
]
