import type { InterviewQuestion } from '../../types'

export const postcssQuestions: InterviewQuestion[] = [
  {
    id: 86,
    category: 'PostCSS',
    question: 'What is PostCSS and how does it differ from preprocessors like SCSS?',
    answer: 'PostCSS is a tool for transforming CSS with JavaScript plugins—it is not a preprocessor language but a processing framework that operates on standard CSS (or CSS-like syntax) through an AST. Preprocessors like SCSS add new syntax (variables, nesting, mixins) that must compile to CSS first, while PostCSS plugins transform already-valid CSS to add prefixes, polyfill future features, or optimize output. You can use both together: SCSS compiles to CSS, then PostCSS plugins run on the result. In a real app, your pipeline might compile SCSS to CSS, then run Autoprefixer and cssnano through PostCSS before shipping to production.',
    code: `/* Input CSS */
.grid {
  display: grid;
  gap: 1rem;
  user-select: none;
}

/* After Autoprefixer (PostCSS plugin) */
/* .grid {
     display: -ms-grid;
     display: grid;
     gap: 1rem;
     -webkit-user-select: none;
     user-select: none;
   } */`,
  },
  {
    id: 87,
    category: 'PostCSS',
    question: 'What is Autoprefixer and why is it essential?',
    answer: 'Autoprefixer is a PostCSS plugin that automatically adds vendor prefixes (-webkit-, -moz-, -ms-) to CSS properties based on browser support data from Can I Use, driven by your Browserslist configuration. Instead of manually writing -webkit-transform alongside transform, you write the standard property once and Autoprefixer handles compatibility. It also removes outdated prefixes you no longer need as browser support improves. In a real app, setting Browserslist to "defaults" in package.json ensures every developer\'s build adds the same prefixes consistently without memorizing which properties still need -webkit- in Safari.',
    code: `/* You write */
.card {
  display: flex;
  backdrop-filter: blur(8px);
  appearance: none;
}

/* Autoprefixer outputs (based on your Browserslist) */
/* .card {
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
     -webkit-backdrop-filter: blur(8px);
     backdrop-filter: blur(8px);
     -webkit-appearance: none;
     appearance: none;
   } */`,
  },
  {
    id: 88,
    category: 'PostCSS',
    question: 'How do you configure PostCSS with postcss.config.js?',
    answer: 'PostCSS is configured via postcss.config.js (or .mjs/.cjs) at the project root, exporting a plugins object that lists each plugin and its options. Build tools like Vite, Webpack, and Next.js automatically detect this file and run PostCSS on every CSS file they process. Plugins run in the order they are listed, which matters when one plugin depends on another\'s output. For example, a typical config runs postcss-import first to resolve @import statements, then Autoprefixer, then cssnano for minification in production builds.',
    code: `// postcss.config.js
export default {
  plugins: {
    'postcss-import': {},
    'postcss-nesting': {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? { cssnano: { preset: 'default' } }
      : {}),
  },
};`,
  },
  {
    id: 89,
    category: 'PostCSS',
    question: 'What does the PostCSS nesting plugin do?',
    answer: 'The postcss-nesting plugin (or the nesting rules in postcss-preset-env) lets you write nested selectors in plain CSS files, similar to SCSS nesting, without a preprocessor. Nested rules are flattened into standard CSS selectors at build time, so browsers receive fully expanded rules they understand natively. Native CSS nesting is now supported in modern browsers, but the PostCSS plugin ensures consistent behavior across older targets and handles edge cases during the transition period. For example, you can nest &:hover inside .button { } in a regular .css file and the plugin compiles it to .button:hover { }.',
    code: `/* Input — nested CSS */
.card {
  padding: 16px;
  border-radius: 8px;

  & .title {
    font-size: 1.25rem;
  }

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

/* Compiled output */
/* .card { padding: 16px; border-radius: 8px; }
   .card .title { font-size: 1.25rem; }
   .card:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); } */`,
  },
  {
    id: 90,
    category: 'PostCSS',
    question: 'What is postcss-preset-env and what features does it polyfill?',
    answer: 'postcss-preset-env is a bundled PostCSS plugin that polyfills and transpiles modern CSS features based on your Browserslist targets, similar to how Babel polyfills JavaScript. It can enable nesting, custom media queries, color functions (oklch, color-mix), gap in flexbox, and other stage-level CSS features before they reach universal browser support. You configure which features to enable or disable via the features option, giving fine-grained control over output. In a real app, enabling custom-properties with preserve: false lets you use CSS variables with fallbacks that compile away for browsers that do not support them.',
    code: `// postcss.config.js
export default {
  plugins: {
    'postcss-preset-env': {
      stage: 2,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'oklab-function': { preserve: true },
      },
      browsers: 'defaults',
    },
  },
};`,
  },
  {
    id: 91,
    category: 'PostCSS',
    question: 'How do you write custom PostCSS plugins and integrate PostCSS with Vite/Webpack?',
    answer: 'A custom PostCSS plugin is a JavaScript function that receives the CSS AST (via postcss.parse) and transforms it using the PostCSS API—walking rules, declarations, and at-rules to modify or inject styles. Plugins export a function with a postcss: true marker and optionally a plugin name for debugging. Vite runs PostCSS automatically when postcss.config.js exists, processing both plain CSS and CSS extracted from Vue/Svelte components. Webpack uses postcss-loader in its rule chain, typically after css-loader and before MiniCssExtractPlugin. In a real app, a custom plugin might scan for a @design-token directive and replace token references with computed values from your design system JSON.',
    code: `// Simple custom PostCSS plugin
const plugin = () => {
  return {
    postcssPlugin: 'add-custom-property-fallback',
    Declaration(decl) {
      if (decl.prop === 'color' && decl.value.startsWith('oklch')) {
        decl.cloneBefore({ prop: 'color', value: '#333' });
      }
    },
  };
};
plugin.postcss = true;
export default plugin;

/* Vite picks up postcss.config.js automatically — no extra setup */`,
  },
]
