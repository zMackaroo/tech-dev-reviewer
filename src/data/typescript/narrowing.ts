import type { InterviewQuestion } from '../../types'

export const narrowingQuestions: InterviewQuestion[] = [
  {
    id: 81,
    category: 'Type Narrowing',
    question: 'What are typeof type guards and when do they work?',
    answer: 'typeof guards are conditional checks like typeof value === "string" that tell TypeScript to treat a union type as a specific primitive inside that branch. They work reliably for string, number, boolean, bigint, symbol, undefined, function, and object. They do not distinguish between null and object, and they cannot identify class instances or custom types on their own. For example, a function accepting string | number can return value.toUpperCase() only after confirming typeof value === "string". In a real app, typeof guards are the first tool you reach for when handling unknown API values or form inputs that might be strings or numbers.',
    code: `function format(value: string | number): string {
  if (typeof value === 'string') {
    return value.trim().toUpperCase();
  }
  return value.toFixed(2);
}

format('  hello  '); // "HELLO"
format(3.14159);      // "3.14"`,
  },
  {
    id: 82,
    category: 'Type Narrowing',
    question: 'How does instanceof narrow types?',
    answer: 'instanceof checks whether an object\'s prototype chain includes a constructor\'s prototype, and TypeScript narrows the variable to that class type inside the true branch. It is most useful for distinguishing between Error subclasses, DOM nodes, or custom classes in a union. instanceof does not work across realms (iframes) or for plain objects that mimic class shapes. For example, error instanceof TypeError lets you access error-specific properties safely. In a real app, a global error handler might use instanceof to route TypeError instances to validation UI while sending generic Error objects to a logging service.',
    code: `class NetworkError extends Error {
  statusCode: number;
  constructor(statusCode: number) {
    super('Network failed');
    this.statusCode = statusCode;
  }
}

function handleError(error: Error) {
  if (error instanceof NetworkError) {
    console.log('Retry with status', error.statusCode);
    return;
  }
  console.log('Unknown error:', error.message);
}`,
  },
  {
    id: 83,
    category: 'Type Narrowing',
    question: 'How does the in operator narrow union types?',
    answer: 'The in operator checks whether a property name exists on an object, and TypeScript uses that to narrow discriminated or structurally different union members. Each branch must have a unique property signature that TypeScript can correlate with a specific type. Unlike typeof, in works well when union members are object types with different shapes rather than primitives. For example, "flySpeed" in animal distinguishes a Bird from a Fish when both are in an Animal union. In a real app, you might use in to distinguish between a UserWithProfile and a GuestSession object returned from an auth endpoint without relying on a shared kind field.',
    code: `type Bird = { flySpeed: number };
type Fish = { swimSpeed: number };

function move(animal: Bird | Fish) {
  if ('flySpeed' in animal) {
    console.log('Flying at', animal.flySpeed);
  } else {
    console.log('Swimming at', animal.swimSpeed);
  }
}`,
  },
  {
    id: 84,
    category: 'Type Narrowing',
    question: 'What are discriminated unions and how do they enable narrowing?',
    answer: 'A discriminated union is a union of object types that share a common literal property, usually called kind, type, or status, with a different value for each member. Checking that discriminator property narrows the union to exactly one member, giving you precise access to the fields that exist on that variant. This pattern is safer than optional fields on a single interface because impossible states become unrepresentable. For example, a Result type with kind: "success" | "error" ensures success carries data while error carries a message, never both or neither. In a real app, Redux actions and API response handlers commonly use discriminated unions so switch statements stay exhaustive and type-safe.',
    code: `type ApiResult =
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; message: string };

function render(result: ApiResult) {
  switch (result.status) {
    case 'loading':
      return 'Spinner...';
    case 'success':
      return result.data.join(', ');
    case 'error':
      return result.message;
  }
}`,
  },
  {
    id: 85,
    category: 'Type Narrowing',
    question: 'What are user-defined type predicates (is)?',
    answer: 'A type predicate is a return type of the form value is SomeType on a function, telling TypeScript that returning true means the argument is that type. Unlike a plain boolean return, a predicate actually narrows the caller\'s variable in the if branch. You implement the runtime check yourself, so the predicate must be honest or you risk unsound typing. For example, isFish(pet) lets TypeScript treat pet as Fish inside the block after the check passes. In a real app, custom validators like isValidUser(obj): obj is User centralize shape checks and keep components free of repeated property guards.',
    code: `type Cat = { meow: () => void };
type Dog = { bark: () => void };
type Pet = Cat | Dog;

function isDog(pet: Pet): pet is Dog {
  return 'bark' in pet;
}

function greet(pet: Pet) {
  if (isDog(pet)) {
    pet.bark();
  } else {
    pet.meow();
  }
}`,
  },
  {
    id: 86,
    category: 'Type Narrowing',
    question: 'What are assertion functions (asserts)?',
    answer: 'Assertion functions use an asserts return type, such as asserts value is string, to tell TypeScript that if the function returns normally, the argument is narrowed to that type. If the function throws, execution stops, so the narrowed type applies only on the code path after a successful call. They are ideal for reusable validation that should fail fast rather than return false. For example, assertIsNumber(x) throws on invalid input and lets you use x as a number on the next line without an if wrapper. In a real app, assertion functions appear in test helpers and runtime schema validators that double as TypeScript narrowing utilities at API boundaries.',
    code: `function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error('Expected a number');
  }
}

function double(input: unknown) {
  assertIsNumber(input);
  return input * 2; // input is number here
}`,
  },
  {
    id: 87,
    category: 'Type Narrowing',
    question: 'How do you narrow null and undefined safely?',
    answer: 'Strict null checks treat null and undefined as distinct types, so you must explicitly narrow before accessing properties on a possibly empty value. Common patterns include if (value !== null), optional chaining (value?.prop), and nullish coalescing (value ?? default). The non-null assertion operator (!) bypasses checks but should be reserved for cases you can prove logically. For example, after if (user !== null), TypeScript knows user.email is safe to read. In a real app, fetching a user by ID returns User | null, and you narrow before rendering profile details rather than risking a runtime crash on a missing record.',
    code: `type User = { id: string; name: string };

function displayName(user: User | null) {
  if (user === null) {
    return 'Guest';
  }
  return user.name; // narrowed to User
}

function getLength(value: string | undefined) {
  return value?.length ?? 0;
}`,
  },
  {
    id: 88,
    category: 'Type Narrowing',
    question: 'What is control flow analysis in TypeScript?',
    answer: 'Control flow analysis is how TypeScript tracks a variable\'s type as code branches through if/else, switch, early returns, throw statements, and loop guards. Each branch refines the type based on conditions already checked, so you do not repeat the same guard manually. Assignments and destructuring can also update the inferred type within a scope. For example, after if (!data) return, TypeScript knows data is defined for the rest of the function. In a real app, this is why a single guard at the top of a handler lets every later line use a narrowed type without additional casts, keeping business logic clean and type-safe.',
    code: `function process(input: string | null) {
  if (!input) {
    return 'No input';
  }
  // input is string here (null removed)

  if (input.length === 0) {
    return 'Empty';
  }

  return input.toUpperCase(); // still string
}`,
  },
  {
    id: 89,
    category: 'Type Narrowing',
    question: 'How does never help with exhaustiveness checking?',
    answer: 'When every union member is handled in a switch or if-else chain, TypeScript narrows the remaining type to never in the default branch because no value should reach it. Assigning the value to a variable of type never, often via a helper like assertNever(x), produces a compile error if a new union member is added but not handled. This turns forgotten cases into build failures instead of silent runtime bugs. For example, adding "pending" to a Status union without updating the switch triggers an error on assertNever(status). In a real app, exhaustiveness checks protect payment state machines and permission enums as they grow over time.',
    code: `type Status = 'idle' | 'loading' | 'done';

function assertNever(value: never): never {
  throw new Error('Unexpected value: ' + value);
}

function label(status: Status): string {
  switch (status) {
    case 'idle': return 'Ready';
    case 'loading': return 'Loading...';
    case 'done': return 'Complete';
    default:
      return assertNever(status);
  }
}`,
  },
  {
    id: 90,
    category: 'Type Narrowing',
    question: 'What is the difference between type narrowing and as assertions?',
    answer: 'Type narrowing is driven by runtime checks that TypeScript understands, so the compiler can prove a type is safe inside a branch. An as assertion tells the compiler to trust a type without evidence, which can hide bugs if the assumption is wrong at runtime. Narrowing is preferred because it keeps types and runtime behavior aligned; assertions are an escape hatch for gaps in the type system or legacy interop. For example, narrowing with Array.isArray(data) is safer than casting data as string[]. In a real app, reach for guards and predicates first, and use as only when integrating untyped third-party data you have validated elsewhere.',
    code: `function sum(values: unknown) {
  // Narrowing — safe
  if (Array.isArray(values) && values.every(v => typeof v === 'number')) {
    return values.reduce((a, b) => a + b, 0);
  }

  // Assertion — no runtime check, risky
  const forced = values as number[];
  // forced.reduce(...) could crash if values is not an array
  return 0;
}`,
  },
]
