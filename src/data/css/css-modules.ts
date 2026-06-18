import type { InterviewQuestion } from '../../types'

export const cssModulesQuestions: InterviewQuestion[] = [
  {
    id: 70,
    category: 'CSS Modules',
    question: 'What are CSS Modules and what problem do they solve?',
    answer: 'CSS Modules are a build-time convention where every class name in a .module.css file is transformed into a unique, locally scoped identifier at compile time. This prevents the global namespace collisions that plague traditional CSS, where two components both using .title can accidentally override each other. Each file exports a JavaScript object mapping your original class names to the generated hashed names.',
    code: `/* Button.module.css */
.container {
  display: inline-flex;
  padding: 8px 16px;
}

/* Compiled output (conceptually) */
/* .Button_container_a3f2b { display: inline-flex; ... } */`,
  },
  {
    id: 71,
    category: 'CSS Modules',
    question: 'How does local scoping work by default in CSS Modules?',
    answer: 'In a CSS Module file, every class selector is automatically scoped to that file only—the bundler rewrites .header into something like .Dashboard_header_x7k9m so it cannot match elements outside this module. Global styles are opt-in via :global(), not the default behavior. This means you write plain class names like .active or .error without inventing long BEM-style prefixes for every component.',
    code: `/* Modal.module.css — all classes scoped locally */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.content {
  background: white;
  border-radius: 8px;
  padding: 24px;
}`,
  },
  {
    id: 72,
    category: 'CSS Modules',
    question: 'How do you import and use CSS Modules in React?',
    answer: 'You import the module as a default export and reference classes through the imported object, typically on the className prop. The bundler (Vite, Webpack, or Next.js) processes the .module.css file and gives you an object like { button: "Button_button_a1b2c" }. You can combine multiple classes with template literals or a utility like clsx.',
    code: `import styles from './Button.module.css';

export function Button({ label, primary }) {
  return (
    <button
      className={\`\${styles.button} \${primary ? styles.primary : ''}\`}
    >
      {label}
    </button>
  );
}`,
  },
  {
    id: 73,
    category: 'CSS Modules',
    question: 'What is the composes keyword in CSS Modules?',
    answer: 'The composes property lets one class inherit all declarations from another class within the same module or from an external file, similar to mixins but at the class level. It keeps shared base styles DRY without duplicating property blocks across selectors. You can compose from a local class or import styles from another .module.css file using composes: otherClass from "./shared.module.css".',
    code: `.btnBase {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
}

.btnPrimary {
  composes: btnBase;
  background: #2563eb;
  color: white;
}

.btnSecondary {
  composes: btnBase;
  background: #e5e7eb;
  color: #111827;
}`,
  },
  {
    id: 74,
    category: 'CSS Modules',
    question: 'What are :global and :local in CSS Modules?',
    answer: ':local() is the default wrapping for selectors in CSS Modules, explicitly marking a selector as file-scoped when you need clarity. :global() opts a selector out of scoping so it applies to the global stylesheet—useful for styling third-party library markup or applying styles to unscoped HTML injected at runtime. You can mix them, such as scoping a wrapper locally while targeting a global child selector inside it.',
    code: `/* Scope the wrapper locally, pierce into library markup globally */
.wrapper :global(.react-datepicker__day--selected) {
  background: var(--brand-primary);
}

/* Explicit local (default behavior, shown for clarity) */
:local(.title) {
  font-size: 1.25rem;
}

/* Fully global class — no hash appended */
:global(.sr-only) {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
}`,
  },
  {
    id: 75,
    category: 'CSS Modules',
    question: 'What naming conventions work best with CSS Modules?',
    answer: 'Because CSS Modules handle scoping automatically, you can use short, semantic class names like .header, .active, or .error instead of verbose BEM blocks like .product-card__title--highlighted. Many teams name the file after the component (UserProfile.module.css) and use camelCase for multi-word classes (styles.navItem) since they are accessed as JavaScript object keys. Consistency matters more than the specific convention—pick camelCase or kebab-case and stick with it across the project.',
    code: `/* UserProfile.module.css */
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.displayName {
  font-weight: 600;
  font-size: 1.125rem;
}

.isOnline {
  border: 2px solid #22c55e;
}`,
  },
  {
    id: 76,
    category: 'CSS Modules',
    question: 'How do CSS Modules compare to styled-components?',
    answer: 'CSS Modules keep styles in separate .css files with standard CSS syntax, while styled-components embed styles as JavaScript template literals with full programmatic access to props and theme objects. CSS Modules have zero runtime cost—the scoping happens at build time—whereas styled-components injects styles dynamically and adds a small runtime library. Styled-components excel when styles depend heavily on props (e.g., background based on a status prop), while CSS Modules pair well with conditional className logic and design token variables.',
    code: `/* CSS Modules approach */
import styles from './Badge.module.css';

function Badge({ status }) {
  const className = status === 'error'
    ? styles.error
    : styles.success;
  return <span className={className}>{status}</span>;
}

/* styled-components approach (for comparison) */
// const Badge = styled.span\`
//   padding: 4px 8px;
//   background: \${(p) => (p.$status === 'error' ? '#fee2e2' : '#dcfce7')};
// \`;`,
  },
  {
    id: 77,
    category: 'CSS Modules',
    question: 'How do CSS Modules work with Vite and Next.js?',
    answer: 'Both Vite and Next.js support CSS Modules out of the box with no extra configuration—simply name your file with the .module.css extension and import it in your component. Vite uses its built-in CSS pipeline to scope classes during dev and production builds, while Next.js handles CSS Modules in both the App Router and Pages Router automatically. Next.js also supports .module.scss for SCSS Modules with the same import pattern.',
    code: `/* Vite + React — works with zero config */
import styles from './Card.module.css';

export function Card({ children }) {
  return <div className={styles.card}>{children}</div>;
}

/* Next.js App Router — same pattern */
// app/components/Navbar.tsx
// import styles from './Navbar.module.css';
// export function Navbar() {
//   return <nav className={styles.nav}>...</nav>;
// }`,
  },
]
