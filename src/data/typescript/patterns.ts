import type { InterviewQuestion } from '../../types'

export const patternsQuestions: InterviewQuestion[] = [
  {
    id: 98,
    category: 'Advanced Patterns',
    question: 'What does the satisfies operator do?',
    answer: 'The satisfies operator checks that a value matches a type while preserving the value\'s inferred literal types instead of widening them. Unlike a type annotation, satisfies validates structure without losing specific string literals or readonly tuple shapes. It is ideal for config objects, theme tokens, and route maps where you want both validation and precise inference.',
    code: `type RouteConfig = Record<string, { component: string; protected?: boolean }>;

const routes = {
  home: { component: 'HomePage' },
  settings: { component: 'SettingsPage', protected: true },
} satisfies RouteConfig;

// routes.home.component is inferred as "HomePage", not string
type HomeComponent = typeof routes.home.component; // "HomePage"`,
  },
  {
    id: 99,
    category: 'Advanced Patterns',
    question: 'What are const type parameters?',
    answer: 'Const type parameters, declared with <const T>, infer literal types from arguments instead of widening primitives to string or number. They let generic functions preserve readonly tuples, exact string unions, and as-const-like behavior without forcing callers to use as const. This is especially useful for typed event names, CSS class lists, and SQL column selections.',
    code: `function pick<const T extends readonly string[]>(keys: T): T {
  return keys;
}

const fields = pick(['name', 'email'] as const);
// fields: readonly ["name", "email"]

function createState<const T extends string>(initial: T) {
  return { value: initial };
}

const status = createState('idle');
// status.value: "idle" (not string)`,
  },
  {
    id: 100,
    category: 'Advanced Patterns',
    question: 'What are TypeScript decorators (Stage 3) and how do they work?',
    answer: 'Decorators are a Stage 3 ECMAScript feature that TypeScript supports for attaching metadata and wrapping classes, methods, accessors, fields, and parameters. They are functions invoked at class definition time, often used for dependency injection, logging, validation, and ORM mapping in frameworks like Angular and NestJS. TypeScript 5+ aligns with the standard decorator semantics when "experimentalDecorators" is disabled and "useDefineForClassFields" is configured appropriately.',
    code: `function logged<This, Args extends unknown[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext
) {
  const methodName = String(context.name);
  return function (this: This, ...args: Args): Return {
    console.log(\`Calling \${methodName}\`, args);
    return target.apply(this, args);
  };
}

class UserService {
  @logged
  findById(id: string) {
    return { id, name: 'Ada' };
  }
}`,
  },
]
