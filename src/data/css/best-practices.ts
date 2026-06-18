import type { InterviewQuestion } from '../../types'

export const bestPracticesQuestions: InterviewQuestion[] = [
  {
    id: 92,
    category: 'Best Practices',
    question: 'What is the BEM methodology and how do you name classes with it?',
    answer: 'BEM (Block, Element, Modifier) is a naming convention that structures CSS classes into three parts: Block (standalone component), Element (part of a block, separated by __), and Modifier (variant or state, separated by --). This creates predictable, self-documenting class names like .card__title--highlighted that avoid specificity wars and make HTML intent clear. Elements are never nested in the class name (avoid .card__header__title—use .card__title instead). In a real app, a product listing might use .product-card, .product-card__image, and .product-card--featured to style components without relying on descendant selectors or !important overrides.',
    code: `.product-card { }
.product-card__image { }
.product-card__title { }
.product-card__price { }
.product-card--featured {
  border: 2px solid #2563eb;
}
.product-card--featured .product-card__title {
  color: #2563eb;
}`,
  },
  {
    id: 93,
    category: 'Best Practices',
    question: 'How do you manage CSS specificity effectively?',
    answer: 'Specificity determines which rule wins when multiple selectors target the same element, calculated from inline styles, IDs, classes/attributes, and element types. The best practice is to keep specificity flat and low—prefer single-class selectors over long chained selectors or ID-based rules. Avoid !important except for utility overrides or third-party workarounds, because it creates an arms race that makes future changes harder. In a real app, using a single .btn-primary class instead of .sidebar nav ul li a.btn keeps specificity at (0, 1, 0) and makes overrides predictable when the design system evolves.',
    code: `/* Low specificity — easy to override */
.btn-primary {
  background: #2563eb;
  color: white;
}

/* High specificity — hard to override without !important */
.sidebar nav ul li a.btn-primary {
  background: #2563eb;
}

/* Prefer :where() to zero out specificity when grouping */
:where(h1, h2, h3) {
  margin-block: 0;
  line-height: 1.2;
}`,
  },
  {
    id: 94,
    category: 'Best Practices',
    question: 'What are ITCSS and OOCSS and how do they organize CSS architecture?',
    answer: 'OOCSS (Object-Oriented CSS) separates structure from skin and container from content, encouraging reusable "objects" like .media or .btn that combine independently rather than monolithic component styles. ITCSS (Inverted Triangle CSS) organizes stylesheets into layers from generic to specific: Settings, Tools, Generic, Elements, Objects, Components, and Utilities—each layer increasing in specificity. Both approaches combat specificity creep and make large codebases maintainable by enforcing where different types of rules belong. In a real app, an ITCSS folder structure might put variables in Settings, mixins in Tools, resets in Generic, and page-specific components last so they can override earlier layers naturally.',
    code: `/* ITCSS layer examples */

/* 1. Settings — variables, no CSS output */
/* _settings.colors.scss: $primary: #2563eb; */

/* 2. Generic — resets, box-sizing */
*, *::before, *::after { box-sizing: border-box; }

/* 3. Objects — undecorated patterns (OOCSS) */
.o-media { display: flex; align-items: flex-start; }
.o-media__body { flex: 1; }

/* 4. Components — styled UI pieces */
.c-card { padding: 16px; border-radius: 8px; }

/* 5. Utilities — single-purpose helpers */
.u-text-center { text-align: center; }`,
  },
  {
    id: 95,
    category: 'Best Practices',
    question: 'What CSS accessibility practices should you follow for focus styles and color contrast?',
    answer: 'Never remove focus outlines without providing a visible replacement—use :focus-visible to show focus rings only for keyboard navigation, not mouse clicks. Focus indicators need at least a 3:1 contrast ratio against adjacent colors per WCAG 2.2 guidelines. Text contrast requires 4.5:1 for normal text and 3:1 for large text (18px+ or 14px+ bold) against its background. In a real app, a custom button might use outline: 2px solid var(--focus-ring) with outline-offset: 2px on :focus-visible, and you verify contrast with tools like the browser DevTools accessibility panel or axe.',
    code: `.button {
  background: #2563eb;
  color: #ffffff; /* 4.5:1+ contrast against #2563eb */
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
}

.button:focus {
  outline: none; /* remove default only if replacing it */
}

.button:focus-visible {
  outline: 2px solid #fbbf24;
  outline-offset: 2px;
}

/* Respect user motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`,
  },
  {
    id: 96,
    category: 'Best Practices',
    question: 'How do you optimize CSS performance with critical CSS and unused CSS removal?',
    answer: 'Critical CSS is the minimal stylesheet needed to render above-the-fold content—it is inlined in the HTML head so the first paint is not blocked waiting for full CSS downloads. Unused CSS removal (tree-shaking) analyzes your HTML/JS to strip selectors never referenced in the application, reducing file size significantly in large projects. Tools like PurgeCSS, Tailwind\'s JIT compiler, and Vite\'s built-in CSS code splitting automate this analysis. In a real app, a landing page might inline 4KB of critical hero and navigation styles while deferring the full 80KB stylesheet, cutting First Contentful Paint by hundreds of milliseconds on slow connections.',
    code: `<!-- Inline critical CSS in <head> for fast first paint -->
<head>
  <style>
    .hero { min-height: 60vh; display: flex; align-items: center; }
    .nav { display: flex; justify-content: space-between; }
  </style>
  <!-- Full stylesheet loaded asynchronously -->
  <link rel="preload" href="/styles/main.css" as="style"
        onload="this.onload=null;this.rel='stylesheet'">
</head>

/* Build tools strip unused selectors automatically */
/* Input: 500 utility classes → Output: only 47 used in your app */`,
  },
  {
    id: 97,
    category: 'Best Practices',
    question: 'What is Stylelint and how do you configure CSS linting?',
    answer: 'Stylelint is a CSS linter that catches errors, enforces conventions, and prevents bad patterns like unknown properties, duplicate selectors, or invalid hex colors before they reach production. It supports plain CSS, SCSS, and CSS-in-JS through syntax parsers and a rich ecosystem of shareable configs like stylelint-config-standard. You configure it in stylelint.config.js with rules tailored to your team—banning ID selectors, requiring kebab-case class names, or limiting nesting depth in SCSS. In a real app, running stylelint in a pre-commit hook or CI pipeline catches a mistyped property like dispaly: flex before it silently fails in the browser.',
    code: `// stylelint.config.js
export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'selector-max-id': 0,
    'selector-class-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
    'max-nesting-depth': 3,
    'color-no-invalid-hex': true,
    'declaration-block-no-duplicate-properties': true,
    'no-descending-specificity': null,
  },
};

// package.json scripts
// "lint:css": "stylelint 'src/**/*.scss'"`,
  },
  {
    id: 98,
    category: 'Best Practices',
    question: 'What naming conventions should you follow for maintainable CSS?',
    answer: 'Consistent naming is more important than which specific convention you choose—pick one system (BEM, camelCase modules, or utility prefixes) and apply it project-wide. Use semantic names describing purpose, not appearance: .is-error beats .text-red because the design might change to an icon instead of red text. Prefix types help organize intent: c- for components, u- for utilities, l- for layout, js- for JavaScript hooks (never styled). In a real app, a js-submit-button class hooks event listeners while .c-button--primary handles styling, keeping behavior and presentation cleanly separated.',
    code: `/* Semantic component naming */
.c-alert { }
.c-alert--warning { }
.c-alert__icon { }

/* Layout vs component vs utility prefixes */
.l-sidebar { }          /* layout structure */
.c-navigation { }       /* styled component */
.u-visually-hidden { }  /* single-purpose utility */

/* JavaScript hooks — never add CSS rules to these */
.js-toggle-menu { }
.js-close-modal { }`,
  },
  {
    id: 99,
    category: 'Best Practices',
    question: 'What are design tokens and how do you implement them in CSS?',
    answer: 'Design tokens are named, platform-agnostic variables that store design decisions—colors, spacing, typography, shadows—as the single source of truth shared between design tools and code. In CSS, they are implemented as custom properties on :root or scoped to themes, often generated from a JSON token file by tools like Style Dictionary. Tokens create a bridge between designers and developers so a rebrand updates --color-brand-primary once instead of searching for hundreds of hardcoded hex values. In a real app, a tokens.css file defines --spacing-md: 16px and --color-text-primary: #111827, and components reference tokens rather than magic numbers.',
    code: `:root {
  /* Color tokens */
  --color-brand-primary: #2563eb;
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
  --color-surface-default: #ffffff;

  /* Spacing tokens */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;

  /* Typography tokens */
  --font-size-body: 1rem;
  --font-size-heading: 1.5rem;
  --line-height-body: 1.5;
}

.card {
  padding: var(--spacing-md);
  color: var(--color-text-primary);
  background: var(--color-surface-default);
}`,
  },
  {
    id: 100,
    category: 'Best Practices',
    question: 'When should you use utility-first CSS (like Tailwind) versus component CSS?',
    answer: 'Utility-first CSS applies small, single-purpose classes directly in HTML (flex, p-4, text-blue-600) instead of writing custom CSS for every element, which speeds prototyping and keeps bundle size predictable through purging. It excels for rapid development, design system consistency, and teams that prefer colocating layout decisions in markup. Component CSS (BEM, CSS Modules) is better when styles are complex, heavily reused with variants, or when designers hand off detailed component specs that do not map cleanly to utilities. In a real app, a startup might use Tailwind for the admin dashboard for speed, while a design system team ships CSS Module components for the public-facing marketing site where pixel-perfect brand control matters more.',
    code: `/* Utility-first approach (Tailwind-style) */
<button class="inline-flex items-center px-4 py-2 bg-blue-600
               text-white rounded hover:bg-blue-700
               focus-visible:ring-2 focus-visible:ring-amber-400">
  Submit
</button>

/* Component CSS approach (CSS Modules) */
/* Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background: var(--color-brand-primary);
  color: white;
  border-radius: 4px;
}

/* <button className={styles.button}>Submit</button> */`,
  },
]
