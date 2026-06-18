import type { InterviewQuestion } from '../../types'

export const scssQuestions: InterviewQuestion[] = [
  {
    id: 78,
    category: 'SCSS / Sass',
    question: 'What is the difference between SCSS and Sass syntax?',
    answer: 'Sass originally used an indented, brace-free syntax where nesting was expressed through indentation alone and semicolons were omitted. SCSS (Sassy CSS) uses the same curly-brace and semicolon syntax as standard CSS, making it a strict superset that any valid CSS file is also valid SCSS. Most modern projects use SCSS because it lowers the learning curve and allows you to rename existing .css files to .scss incrementally.',
    code: `/* SCSS syntax (most common today) */
$primary: #2563eb;

.button {
  background: $primary;
  &:hover {
    background: darken($primary, 10%);
  }
}

/* Original indented Sass syntax (less common) */
// $primary: #2563eb
// .button
//   background: $primary
//   &:hover
//     background: darken($primary, 10%)`,
  },
  {
    id: 79,
    category: 'SCSS / Sass',
    question: 'How do SCSS variables work and how do they differ from CSS custom properties?',
    answer: 'SCSS variables are declared with a dollar sign ($primary: #2563eb) and are resolved entirely at compile time—their values are baked into the output CSS and cannot change at runtime. CSS custom properties (--primary: #2563eb) live in the browser and can be updated dynamically via JavaScript or media queries. SCSS variables are ideal for build-time constants like breakpoints and brand colors, while CSS custom properties handle theming and per-component overrides.',
    code: `$spacing-unit: 8px;
$brand-primary: #2563eb;

.card {
  padding: $spacing-unit * 2;
  border: 1px solid $brand-primary;
}

/* Compiled CSS — variables replaced with literal values */
/* .card { padding: 16px; border: 1px solid #2563eb; } */`,
  },
  {
    id: 80,
    category: 'SCSS / Sass',
    question: 'What are the benefits and pitfalls of SCSS nesting?',
    answer: 'Nesting lets you write selectors hierarchically, mirroring your HTML structure and keeping related rules grouped together visually. The parent selector reference (&) lets you append pseudo-classes and modifiers without repeating the parent name. The main pitfall is over-nesting—deep chains like .nav .list .item .link .icon compile into overly specific selectors that are hard to override and hurt maintainability. A common rule of thumb is to limit nesting to three levels deep. } } } } is readable, but going five levels deep creates brittle, high-specificity CSS.',
    code: `.nav {
  display: flex;
  gap: 16px;

  /* Good — shallow nesting with & */
  &__link {
    color: #374151;
    &:hover {
      color: #2563eb;
    }
  }

  /* Avoid — excessive depth creates .nav ul li a span.icon */
}`,
  },
  {
    id: 81,
    category: 'SCSS / Sass',
    question: 'What are SCSS mixins and how do you use @mixin and @include?',
    answer: 'Mixins are reusable blocks of declarations that you define once with @mixin and inject into selectors with @include, optionally accepting parameters for flexibility. They differ from functions in that they output CSS rules rather than returning a single computed value. Mixins are ideal for vendor-prefix patterns, responsive breakpoint wrappers, and repeated property clusters like flex-centering.',
    code: `@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin respond-to($breakpoint) {
  @if $breakpoint == tablet {
    @media (min-width: 768px) { @content; }
  } @else if $breakpoint == desktop {
    @media (min-width: 1024px) { @content; }
  }
}

.hero {
  @include flex-center;
  @include respond-to(tablet) {
    min-height: 400px;
  }
}`,
  },
  {
    id: 82,
    category: 'SCSS / Sass',
    question: 'What is @extend in SCSS and when should you use it?',
    answer: '@extend lets one selector inherit the rules of another by grouping their selectors together in the compiled output, rather than duplicating the declaration block like @include does. It reduces CSS output size when many classes share identical base styles, but it can produce unexpected selector combinations and specificity issues if overused.',
    code: `%btn-base {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary {
  @extend %btn-base;
  background: #2563eb;
  color: white;
}

.btn-danger {
  @extend %btn-base;
  background: #dc2626;
  color: white;
}`,
  },
  {
    id: 83,
    category: 'SCSS / Sass',
    question: 'How do SCSS partials work with @import and @use?',
    answer: 'Partials are SCSS files prefixed with an underscore (_variables.scss) that are not compiled into standalone CSS files—they exist only to be pulled into other files. The modern @use rule loads a partial once, namespaces its members, and is the recommended replacement for the legacy @import, which could cause duplicate CSS output and global namespace pollution. @forward re-exports a partial\'s members so a single entry file can expose an entire design system.',
    code: `/* _variables.scss (partial) */
$spacing-unit: 8px;
$brand-primary: #2563eb;

/* _mixins.scss (partial) */
@use "variables" as vars;

@mixin card-padding {
  padding: vars.$spacing-unit * 2;
}

/* main.scss */
@use "variables" as vars;
@use "mixins";

.card {
  @include mixins.card-padding;
  color: vars.$brand-primary;
}`,
  },
  {
    id: 84,
    category: 'SCSS / Sass',
    question: 'What are SCSS @function and how do they differ from mixins?',
    answer: 'SCSS functions are defined with @function and return a single computed value using @return, similar to JavaScript functions but operating at compile time. They are used for calculations—converting px to rem, generating z-index scales, or picking colors from a map—rather than outputting CSS declaration blocks. Mixins output actual CSS rules; functions produce values you assign to properties. Sass also ships built-in functions like darken(), lighten(), and map-get() for color and data manipulation.',
    code: `$base-font-size: 16px;

@function px-to-rem($px) {
  @return calc($px / $base-font-size) * 1rem;
}

@function spacing($multiplier) {
  @return px-to-rem(8 * $multiplier);
}

.container {
  padding: spacing(2);    /* compiles to 1rem */
  font-size: px-to-rem(18); /* compiles to 1.125rem */
}`,
  },
  {
    id: 85,
    category: 'SCSS / Sass',
    question: 'How does SCSS fit into the build pipeline and how do you use it with BEM?',
    answer: 'A bundler like Vite, Webpack (sass-loader), or Next.js compiles .scss files to plain CSS as part of the build or dev server pipeline—browsers never receive SCSS directly. The compiler resolves variables, mixins, nesting, and @use imports, then outputs standard CSS for PostCSS or autoprefixer to process further. SCSS pairs naturally with BEM naming through the & parent selector, letting you write &__element and &--modifier instead of repeating the block name manually. } &--compact { ... } } to generate clean BEM class names with less repetition and better readability.',
    code: `.search-bar {
  display: flex;
  gap: 8px;

  &__input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #d1d5db;
  }

  &__button {
    padding: 8px 16px;
    background: #2563eb;
    color: white;
  }

  &--compact {
    gap: 4px;

    .search-bar__input {
      padding: 4px 8px;
    }
  }
}`,
  },
]
