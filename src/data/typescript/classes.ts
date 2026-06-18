import type { InterviewQuestion } from '../../types'

export const classesQuestions: InterviewQuestion[] = [
  {
    id: 56,
    category: 'Classes',
    question: 'What is the basic syntax for defining a class in TypeScript?',
    answer: 'A TypeScript class combines the ECMAScript class syntax with optional type annotations on fields, parameters, and return types. You declare properties with types, a constructor for initialization, and methods that define behavior. TypeScript also checks that instances match the declared shape at compile time. For example, a Product class with typed name and price fields ensures every instance created in an e-commerce app satisfies the same contract before the code ever runs in the browser.',
    code: `class Product {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  getLabel(): string {
    return \`\${this.name} — $\${this.price}\`;
  }
}

const item = new Product("Keyboard", 79);
console.log(item.getLabel());`,
  },
  {
    id: 57,
    category: 'Classes',
    question: 'What are access modifiers (public, private, protected) in TypeScript classes?',
    answer: 'TypeScript adds public, private, and protected modifiers to control where class members can be accessed. public members are available everywhere, which is the default if you omit a modifier. private restricts access to the declaring class only, while protected allows the declaring class and its subclasses to access the member. In a real app, marking internal validation helpers as private prevents other modules from depending on implementation details that you may change later.',
    code: `class BankAccount {
  public readonly id: string;
  private balance: number;
  protected owner: string;

  constructor(id: string, owner: string, balance: number) {
    this.id = id;
    this.owner = owner;
    this.balance = balance;
  }

  public deposit(amount: number): void {
    this.balance += amount;
  }

  // this.balance accessible here
  // external code cannot read this.balance directly
}`,
  },
  {
    id: 58,
    category: 'Classes',
    question: 'What are readonly properties in TypeScript classes?',
    answer: 'The readonly modifier marks a property as assignable only during initialization, either at declaration or inside the constructor. After construction, TypeScript reports an error if code tries to reassign the property, which helps enforce immutability for identifiers and configuration. readonly applies to references, so a readonly array can still have elements pushed or popped unless you also use a deeply immutable pattern. For example, setting readonly id on a User class guarantees the primary key cannot be accidentally overwritten after the object is created from an API response.',
    code: `class User {
  readonly id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;   // OK — constructor can assign
    this.name = name;
  }

  rename(newName: string): void {
    this.name = newName;
    // this.id = "other"; // Error — readonly
  }
}`,
  },
  {
    id: 59,
    category: 'Classes',
    question: 'What is an abstract class in TypeScript?',
    answer: 'An abstract class cannot be instantiated directly and is meant to be extended by concrete subclasses. It can define abstract methods without implementations that subclasses must override, plus concrete methods with shared behavior. This pattern captures a common base contract while forcing each subtype to fill in specific details. For example, an abstract PaymentProcessor class might implement shared logging and retry logic while requiring each gateway subclass to define processPayment with its own API integration.',
    code: `abstract class PaymentProcessor {
  abstract processPayment(amount: number): Promise<string>;

  async execute(amount: number): Promise<string> {
    console.log("Processing...");
    return this.processPayment(amount);
  }
}

class StripeProcessor extends PaymentProcessor {
  async processPayment(amount: number): Promise<string> {
    return \`stripe-charge-\${amount}\`;
  }
}`,
  },
  {
    id: 60,
    category: 'Classes',
    question: 'How does a class implement an interface in TypeScript?',
    answer: 'The implements keyword tells TypeScript that a class must satisfy the shape of an interface, including required properties and method signatures. Unlike extending a class, implementing an interface does not inherit any implementation—it is purely a compile-time contract. A class can implement multiple interfaces, which is useful when an object must satisfy several roles. In a real app, a LocalStorageCache class might implement Cacheable and Serializable interfaces so it can be swapped with an in-memory implementation behind the same typed API.',
    code: `interface Cacheable {
  get(key: string): string | undefined;
  set(key: string, value: string): void;
}

class MemoryCache implements Cacheable {
  private store = new Map<string, string>();

  get(key: string): string | undefined {
    return this.store.get(key);
  }

  set(key: string, value: string): void {
    this.store.set(key, value);
  }
}`,
  },
  {
    id: 61,
    category: 'Classes',
    question: 'What are static members in TypeScript classes?',
    answer: 'Static properties and methods belong to the class constructor itself rather than to individual instances, so you access them via ClassName.member instead of this. They are commonly used for factory methods, shared counters, and utility functions that do not need instance state. TypeScript lets you annotate static members with access modifiers and types just like instance members. For example, a User.fromJson static factory on a User class centralizes deserialization logic so callers write User.fromJson(data) instead of duplicating parsing at every API boundary.',
    code: `class User {
  constructor(
    public id: string,
    public name: string
  ) {}

  static fromJson(json: string): User {
    const data = JSON.parse(json) as { id: string; name: string };
    return new User(data.id, data.name);
  }

  static readonly MAX_NAME_LENGTH = 100;
}

const user = User.fromJson('{"id":"1","name":"Ada"}');`,
  },
  {
    id: 62,
    category: 'Classes',
    question: 'What are parameter properties in TypeScript classes?',
    answer: 'Parameter properties combine a constructor parameter with a class field declaration by adding an access modifier or readonly directly on the constructor parameter. TypeScript automatically creates and assigns the property, reducing boilerplate compared to manually declaring fields and assigning this.name = name. They work with public, private, protected, and readonly modifiers. In a real app, constructor(public id: string, private email: string) on a Contact class replaces three repetitive lines per field and keeps the class focused on behavior instead of wiring.',
    code: `class Contact {
  // Shorthand — these three declarations in one:
  constructor(
    public id: string,
    public name: string,
    private email: string
  ) {}

  getEmail(): string {
    return this.email;
  }
}

const c = new Contact("1", "Ada", "ada@example.com");
console.log(c.name); // public field`,
  },
  {
    id: 63,
    category: 'Classes',
    question: 'When should you use a class versus an interface in TypeScript?',
    answer: 'Interfaces describe shapes and contracts at compile time only—they emit no JavaScript and cannot contain implementation. Classes produce runtime constructors, support access modifiers, and can hold both behavior and state. Use interfaces for typing plain objects, API payloads, and when you only need structural checking. Use classes when you need instances with methods, inheritance, or runtime identity checks. For example, model a User API response as an interface, but implement a DataStore class when multiple methods share private state and lifecycle logic.',
    code: `// Interface — shape only, erased at compile time
interface User {
  id: string;
  name: string;
}

// Class — runtime value with behavior
class UserService {
  private users: User[] = [];

  add(user: User): void {
    this.users.push(user);
  }

  findById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }
}`,
  },
  {
    id: 64,
    category: 'Classes',
    question: 'What does the override keyword do in TypeScript?',
    answer: 'The override keyword marks a method in a subclass as intentionally replacing a method from its base class. With noImplicitOverride enabled, TypeScript requires override on overridden methods and errors if you misspell the base method name, catching bugs where you thought you overrode behavior but actually added a new method. It documents intent for readers and tooling alike. For example, if a base Logger class defines log(message: string), a subclass FileLogger must use override log(message: string) so a typo like logs does not silently compile as an unrelated method.',
    code: `class Logger {
  log(message: string): void {
    console.log(message);
  }
}

class FileLogger extends Logger {
  override log(message: string): void {
    // write to file instead of console
    console.log("[file]", message);
  }
}`,
  },
  {
    id: 65,
    category: 'Classes',
    question: 'What are private fields with the # syntax in TypeScript classes?',
    answer: 'The # prefix declares a true JavaScript private field that is enforced at runtime, not only by TypeScript\'s compile-time checking. Unlike the private keyword, # fields are genuinely inaccessible outside the class even in plain JavaScript after compilation, which prevents reflection-based access. They must be declared in the class body and referenced with #fieldName syntax throughout. In a real app, using #token on an AuthSession class guarantees the token cannot be read from outside the class in production bundles, even if someone strips type information.',
    code: `class AuthSession {
  #token: string;

  constructor(token: string) {
    this.#token = token;
  }

  getAuthorizationHeader(): string {
    return \`Bearer \${this.#token}\`;
  }
}

const session = new AuthSession("abc123");
// session.#token; // SyntaxError at runtime — truly private`,
  },
]
