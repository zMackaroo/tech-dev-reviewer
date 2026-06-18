import type { InterviewQuestion } from '../../types'

export const tailwindQuestions: InterviewQuestion[] = [
  {
    id: 52,
    category: 'Tailwind CSS',
    question: 'What is utility-first CSS and why does Tailwind use it?',
    answer: 'Utility-first CSS applies small, single-purpose classes directly in HTML instead of writing custom CSS rules for each element. Tailwind provides utilities like flex, pt-4, text-center, and bg-blue-500 that compose visually without leaving your markup. This eliminates inventing class names, reduces context-switching between HTML and CSS files, and keeps styling colocated with structure. The approach trades larger HTML class lists for faster development and consistent design tokens.',
    code: `<!-- Utility-first: compose styles in markup -->
<div class="rounded-lg shadow-md p-6 bg-white max-w-sm">
  <h2 class="text-xl font-semibold text-gray-900">Product Name</h2>
  <p class="mt-2 text-gray-600">Description text here.</p>
  <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
    Add to Cart
  </button>
</div>`,
  },
  {
    id: 53,
    category: 'Tailwind CSS',
    question: 'How does tailwind.config.js work?',
    answer: 'The Tailwind config file customizes the design system — colors, spacing, fonts, breakpoints, plugins, and content paths for purging unused CSS. The theme section extends or overrides default tokens so bg-brand maps to your primary color. The content array tells Tailwind which files to scan for class names during the build. Plugins add new utilities, components, or variants like @tailwindcss/forms.',
    code: `// tailwind.config.js
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#2563eb', dark: '#1d4ed8' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};`,
  },
  {
    id: 54,
    category: 'Tailwind CSS',
    question: 'What is the @apply directive?',
    answer: '@apply lets you compose utility classes into a reusable CSS class within a @layer components or @layer utilities block. It extracts repeated utility combinations into a named class while still using Tailwind\'s design tokens. This is useful when the same utility pattern appears dozens of times and a component class improves readability. However, overusing @apply defeats the utility-first purpose — prefer utilities inline for one-off styles.',
    code: `/* styles/components.css */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-brand text-white rounded-md font-medium;
    @apply hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand;
  }

  .card {
    @apply rounded-lg shadow-md p-6 bg-white;
  }
}`,
  },
  {
    id: 55,
    category: 'Tailwind CSS',
    question: 'How does Tailwind\'s JIT (Just-In-Time) compiler work?',
    answer: 'The JIT engine generates CSS on demand by scanning source files for class names at build time instead of shipping a massive pre-built stylesheet. Only classes you actually use appear in the final CSS bundle, keeping production files small. JIT also enables arbitrary values like w-[137px] and bg-[#1da1f2] without config changes. It replaced the older PurgeCSS approach and is the default engine in Tailwind v3+.',
    code: `<!-- Arbitrary values (JIT generates on demand) -->
<div class="w-[137px] top-[117px] bg-[#1da1f2]">
  Custom dimensions
</div>

<!-- Only these specific utilities exist in the output CSS -->
<!-- .w-\\[137px\\] { width: 137px; } -->
<!-- .bg-\\[\\#1da1f2\\] { background-color: #1da1f2; } -->`,
  },
  {
    id: 56,
    category: 'Tailwind CSS',
    question: 'How do you implement dark mode in Tailwind?',
    answer: 'Tailwind supports dark mode via the darkMode config set to "media" (follows prefers-color-scheme) or "class" (toggles via a .dark class on html or body). With class strategy, JavaScript toggles the dark class and all dark: prefixed utilities activate. Define paired light and dark utilities like bg-white dark:bg-gray-900 on the same element. The class strategy gives users manual control independent of OS settings.',
    code: `// tailwind.config.js
export default { darkMode: 'class' };

// HTML
<html class="dark">
  <body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <h1 class="text-2xl font-bold">Dashboard</h1>
  </body>
</html>

// Toggle: document.documentElement.classList.toggle('dark');`,
  },
  {
    id: 57,
    category: 'Tailwind CSS',
    question: 'How do responsive prefixes work in Tailwind?',
    answer: 'Responsive prefixes like sm:, md:, lg:, xl:, and 2xl: prepend utilities to apply them at specific breakpoints and above, following a mobile-first approach. Unprefixed utilities apply to all screen sizes, and prefixed ones override at larger viewports. Default breakpoints are sm:640px, md:768px, lg:1024px, xl:1280px, and 2xl:1536px, customizable in the config. Stack prefixes with state variants like md:hover:bg-blue-700.',
    code: `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="p-4 text-sm md:text-base lg:text-lg">
    Responsive card
  </div>
</div>

<!-- Mobile: 1 column, small: 2 columns, large: 3 columns -->`,
  },
  {
    id: 58,
    category: 'Tailwind CSS',
    question: 'What are component extraction patterns in Tailwind?',
    answer: 'Component extraction pulls repeated utility combinations into reusable abstractions without losing Tailwind\'s benefits. Common patterns include React/Vue components with className props, @apply in CSS layers, and libraries like tailwind-variants or cva for variant management. The key is extracting structure and repeated patterns while keeping one-off styles as inline utilities. Over-extraction into CSS classes reintroduces the naming problem Tailwind avoids.',
    code: `// Component extraction with variants (cva pattern)
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-white hover:bg-brand-dark',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);`,
  },
  {
    id: 59,
    category: 'Tailwind CSS',
    question: 'How does Tailwind CSS compare to CSS Modules?',
    answer: 'CSS Modules scope styles to components via hashed class names, keeping traditional CSS syntax with colocated .module.css files. Tailwind applies utility classes directly in markup without separate stylesheets for most styling needs. CSS Modules excel when you need complex, unique styles that are awkward as utilities. Tailwind excels for rapid prototyping, consistent design tokens, and avoiding unused CSS. Many teams use both — Tailwind for layout and common patterns, CSS Modules for complex animations or third-party overrides.',
    code: `/* CSS Modules: Chart.module.css */
.chartTooltip {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  padding: 8px 12px;
}

// Chart.tsx
import styles from './Chart.module.css';
<div className={styles.chartTooltip}>{label}</div>

// Page layout uses Tailwind instead
<div className="grid grid-cols-12 gap-6 p-8">`,
  },
  {
    id: 60,
    category: 'Tailwind CSS',
    question: 'What is the content configuration for purging unused CSS?',
    answer: 'The content array in tailwind.config.js specifies file globs Tailwind scans to detect which utility classes are used. Only classes found in those files appear in the production CSS output, keeping bundles tiny. Missing a path means classes in those files get purged, causing missing styles in production. Include all template files — HTML, JSX, TSX, Vue, Svelte, and even MDX.',
    code: `// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // Tailwind scans these files and includes only used utilities
};`,
  },
  {
    id: 61,
    category: 'Tailwind CSS',
    question: 'How do Tailwind plugins extend the framework?',
    answer: 'Plugins add new utilities, components, base styles, or variants through a functional API in the config plugins array. Official plugins include @tailwindcss/forms (better form defaults), @tailwindcss/typography (prose class for rich text), and @tailwindcss/container-queries. Custom plugins use addUtilities, addComponents, and addBase to register new CSS. Plugins keep the core framework lean while enabling opt-in features.',
    code: `// tailwind.config.js
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

export default {
  plugins: [typography, forms],
};

// Usage
<article class="prose lg:prose-xl dark:prose-invert">
  <h1>Blog Post Title</h1>
  <p>Rich text content styled automatically.</p>
</article>`,
  },
  {
    id: 62,
    category: 'Tailwind CSS',
    question: 'What are @layer directives in Tailwind?',
    answer: '@layer organizes custom CSS into three categories — base, components, and utilities — that Tailwind processes in the correct order respecting specificity. Base layer holds resets and element defaults, components layer holds reusable classes via @apply, and utilities layer holds custom utilities. This ensures custom styles do not accidentally override Tailwind utilities due to source order issues.',
    code: `/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 { @apply text-2xl font-bold text-gray-900; }
  a { @apply text-brand hover:underline; }
}

@layer components {
  .btn { @apply px-4 py-2 rounded-md font-medium; }
}`,
  },
  {
    id: 63,
    category: 'Tailwind CSS',
    question: 'What are arbitrary values in Tailwind?',
    answer: 'Arbitrary values let you use one-off CSS values not in the default theme by wrapping them in square brackets. Syntax like w-[300px], bg-[#1da1f2], grid-cols-[1fr_500px_2fr], and top-[117px] generates utilities on the fly via JIT. Arbitrary properties extend this to any CSS property: [mask-type:luminance]. Use arbitrary values sparingly — repeated values should become theme tokens in the config.',
    code: `<!-- Arbitrary values for one-off needs -->
<div class="w-[300px] h-[calc(100vh-64px)] bg-[#f0f4ff]">
  Sidebar
</div>

<!-- Arbitrary property -->
<div class="[mask-type:luminance] [scrollbar-width:none]">
  Custom properties
</div>`,
  },
  {
    id: 64,
    category: 'Tailwind CSS',
    question: 'How do you implement design tokens with Tailwind?',
    answer: 'Design tokens map to the theme section of tailwind.config.js, extending colors, spacing, fontSize, borderRadius, and other scales with semantic names. Instead of bg-blue-500, tokens like bg-brand-primary communicate intent and enable systematic theming. Tools like Tailwind CSS v4 CSS-first configuration define tokens as CSS custom properties in @theme. Token-driven configs make rebranding a config change instead of a find-and-replace across files.',
    code: `// tailwind.config.js — design tokens
theme: {
  extend: {
    colors: {
      semantic: {
        success: '#059669',
        warning: '#d97706',
        error: '#dc2626',
        info: '#2563eb',
      },
    },
    spacing: { '18': '4.5rem', '88': '22rem' },
    borderRadius: { '4xl': '2rem' },
  },
}`,
  },
  {
    id: 65,
    category: 'Tailwind CSS',
    question: 'What is Tailwind Preflight?',
    answer: 'Preflight is Tailwind\'s opinionated CSS reset built on modern-normalize that removes inconsistent default browser styles. It strips margins from headings, makes images block-level, removes default list styles, and sets border-box on all elements. Preflight injects in the base layer when you include @tailwind base in your CSS entry. It creates a clean, predictable foundation so utilities behave consistently across browsers.',
    code: `/* Preflight runs automatically with @tailwind base */
/* Key resets: */
/* - box-sizing: border-box on all elements */
/* - margin: 0 on headings and paragraphs */
/* - images: display: block, max-width: 100% */
/* - buttons: inherit font, no default background */

@tailwind base;    /* includes Preflight */
@tailwind components;
@tailwind utilities;`,
  },
  {
    id: 66,
    category: 'Tailwind CSS',
    question: 'How do state variants work in Tailwind?',
    answer: 'State variants prefix utilities to apply styles on interaction or element states — hover:, focus:, active:, disabled:, focus-visible:, and group-hover: for parent-triggered styles. They compose with responsive prefixes: md:hover:bg-blue-700 applies hover styles only on medium screens and up. group and peer classes enable styling children or siblings based on parent/sibling state.',
    code: `<button
  class="bg-brand text-white px-4 py-2 rounded-md
         hover:bg-brand-dark
         focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand
         active:scale-95
         disabled:opacity-50 disabled:cursor-not-allowed"
  disabled
>
  Submit
</button>`,
  },
  {
    id: 67,
    category: 'Tailwind CSS',
    question: 'How do container queries work in Tailwind?',
    answer: 'Container queries let components respond to their parent container\'s width instead of the viewport, using the @container class on the parent and @sm:, @md:, @lg: prefixes on child utilities. The @tailwindcss/container-queries plugin (now built into Tailwind v4) enables this pattern. Container queries solve the problem of reusable components that need different layouts depending on where they are placed, not the screen size.',
    code: `<!-- Parent marked as container -->
<div class="@container">
  <div class="flex flex-col @md:flex-row @md:gap-6">
    <img class="w-full @md:w-1/3" src="photo.jpg" alt="" />
    <div class="p-4">
      <h3 class="text-lg @md:text-xl">Card Title</h3>
    </div>
  </div>
</div>`,
  },
  {
    id: 68,
    category: 'Tailwind CSS',
    question: 'How do you use Tailwind CSS with React?',
    answer: 'Install tailwindcss, postcss, and autoprefixer, configure content paths to scan JSX/TSX files, and import the generated CSS in your app entry. Apply utilities via className on JSX elements. For dynamic classes, use clsx or cn (clsx + tailwind-merge) to conditionally compose and deduplicate conflicting utilities. Avoid string interpolation for full class names — Tailwind\'s scanner needs complete class strings visible in source code.',
    code: `import { cn } from '@/lib/utils';

function Button({ variant, disabled, children }) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium transition-colors',
        variant === 'primary' && 'bg-brand text-white hover:bg-brand-dark',
        variant === 'secondary' && 'bg-gray-100 text-gray-900',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}`,
  },
  {
    id: 69,
    category: 'Tailwind CSS',
    question: 'What is tailwind-merge and why is it needed?',
    answer: 'tailwind-merge intelligently merges Tailwind class strings, resolving conflicts by keeping the last conflicting utility — unlike string concatenation which leaves both p-2 and p-4 active with unpredictable results. It understands Tailwind\'s class groups so px-4 py-2 merged with p-6 correctly produces p-6. Combined with clsx in a cn helper, it is the standard pattern for conditional classes in component libraries. Without it, overriding a component\'s default padding via className prop often fails silently.',
    code: `import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Without twMerge: 'p-2 p-6' → both apply, unpredictable
// With twMerge: cn('p-2', 'p-6') → 'p-6' (last wins)`,
  },
  {
    id: 70,
    category: 'Tailwind CSS',
    question: 'What is the clsx/cn pattern in Tailwind projects?',
    answer: 'clsx conditionally constructs className strings from strings, objects, and arrays, filtering out falsy values. The cn utility combines clsx with tailwind-merge for conditional composition with conflict resolution. This pattern is standard in shadcn/ui and most Tailwind component libraries. It replaces template literal concatenation which cannot resolve Tailwind conflicts. Every shadcn/ui component uses cn to merge default styles with consumer overrides.',
    code: `const alertVariants = {
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  error: 'bg-red-50 text-red-800 border-red-200',
};

function Alert({ variant = 'info', className, children }) {
  return (
    <div className={cn(
      'rounded-md border p-4',
      alertVariants[variant],
      className,
    )}>
      {children}
    </div>
  );
}`,
  },
  {
    id: 71,
    category: 'Tailwind CSS',
    question: 'How do component libraries like shadcn/ui use Tailwind?',
    answer: 'shadcn/ui copies component source code into your project rather than installing a package, using Tailwind utilities and CSS variables for theming. Components are built on Radix UI primitives for accessibility with Tailwind styling via the cn helper and cva for variants. The approach gives full ownership — you can modify any component file directly. CSS variables defined in globals.css enable theming without config changes.',
    code: `// components/ui/button.tsx (shadcn/ui pattern)
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-input bg-background hover:bg-accent',
      },
    },
  },
);

function Button({ className, variant, ...props }) {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props} />
  );
}`,
  },
]
