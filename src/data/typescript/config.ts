import type { InterviewQuestion } from '../../types'

export const configQuestions: InterviewQuestion[] = [
  {
    id: 91,
    category: 'Config & Tooling',
    question: 'What is tsconfig.json and what does it control?',
    answer: 'tsconfig.json is the configuration file for the TypeScript compiler (tsc) and language service in your editor. It defines which files to compile, compiler options like strictness and output format, and project references for monorepos. Tools such as Vite, ESLint, and VS Code read the same file for consistent behavior across build and IDE.',
    code: `// tsconfig.json (excerpt)
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true,
    "jsx": "react-jsx",
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}`,
  },
  {
    id: 92,
    category: 'Config & Tooling',
    question: 'What does strict mode enable and which flags matter most?',
    answer: 'Setting "strict": true turns on a family of checks that catch common bugs: strictNullChecks, strictFunctionTypes, noImplicitAny, strictBindCallApply, and others. strictNullChecks prevents accessing properties on null or undefined without narrowing, while noImplicitAny forces you to type untyped parameters instead of silently using any. Individual flags can be toggled, but most teams enable strict wholesale for consistency.',
    code: `{
  "compilerOptions": {
    "strict": true,
    // Equivalent to enabling all of these:
    // "noImplicitAny": true,
    // "strictNullChecks": true,
    // "strictFunctionTypes": true,
    // "strictBindCallApply": true,
    // "strictPropertyInitialization": true,
    // "noImplicitThis": true,
    // "alwaysStrict": true
  }
}`,
  },
  {
    id: 93,
    category: 'Config & Tooling',
    question: 'What is moduleResolution and which values should you use?',
    answer: 'moduleResolution tells TypeScript how to resolve import paths to files, especially for node_modules and package.json exports fields. "node16" and "nodenext" align with modern Node.js ESM/CJS rules and are recommended for Node projects using "module": "NodeNext". "bundler" matches how Vite, webpack, and esbuild resolve modules, allowing extensionless imports and package exports. Choosing the wrong setting causes false "cannot find module" errors or mismatches between tsc and your bundler.',
    code: `// Vite / modern bundler setup
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}

// Node.js ESM package
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext"
  }
}`,
  },
  {
    id: 94,
    category: 'Config & Tooling',
    question: 'What are target and lib in tsconfig.json?',
    answer: 'target sets the ECMAScript version tsc emits when compiling (e.g., ES2020), controlling downleveling of async/await, optional chaining, and class fields. lib specifies which built-in type definitions (DOM, ES2022, WebWorker) are available for type-checking regardless of target. You can use a modern lib for APIs while targeting an older runtime if your bundler polyfills gaps.',
    code: `{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    // Type-check against ES2022 + DOM APIs,
    // emit syntax compatible with ES2020 runtimes
  }
}`,
  },
  {
    id: 95,
    category: 'Config & Tooling',
    question: 'What are declaration files (.d.ts) and when do you need them?',
    answer: 'Declaration files (.d.ts) describe the shape of JavaScript code without implementation, giving TypeScript types for plain JS libraries or ambient globals. They can be hand-written, generated with "declaration": true when publishing a TS library, or installed via @types packages from DefinitelyTyped. The compiler uses them for type-checking only; they are erased at runtime along with all types.',
    code: `// types/analytics.d.ts — ambient declaration
declare global {
  interface Window {
    analytics: {
      track(event: string, props?: Record<string, unknown>): void;
    };
  }
}
export {};

// Usage in .ts files
window.analytics.track('page_view', { path: '/home' });`,
  },
  {
    id: 96,
    category: 'Config & Tooling',
    question: 'How do path aliases work in TypeScript?',
    answer: 'Path aliases map short import prefixes like @/components to directories via "paths" and "baseUrl" in tsconfig.json. They reduce fragile relative imports such as ../../../utils and make refactors easier. TypeScript uses paths for type resolution; your bundler or runtime must also resolve the same aliases via its own config (e.g., Vite resolve.alias).',
    code: `// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}

// vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
});`,
  },
  {
    id: 97,
    category: 'Config & Tooling',
    question: 'How does TypeScript integrate with Vite?',
    answer: 'Vite uses esbuild to transpile TypeScript to JavaScript during development without full type-checking, so it is fast but does not catch type errors on its own. You run tsc --noEmit or vite-plugin-checker separately to enforce types in dev or CI. Vite respects tsconfig paths via resolve.alias and handles .tsx for React via the jsx setting. Setting "noEmit": true in tsconfig is common because Vite handles bundling, not tsc.',
    code: `// tsconfig.json for Vite
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "isolatedModules": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}

// package.json scripts
// "typecheck": "tsc --noEmit",
// "dev": "vite",
// "build": "tsc --noEmit && vite build"`,
  },
]
