import type { InterviewQuestion } from '../../types'

export const fundamentalsQuestions: InterviewQuestion[] = [
  {
    id: 1,
    category: 'Design System Fundamentals',
    question: 'What is a design system?',
    answer: 'A design system is a shared collection of reusable components, design tokens, patterns, guidelines, and documentation that teams use to build consistent user interfaces at scale. It goes beyond a component library by defining the principles, visual language, and interaction standards that tie products together. Design systems reduce duplicated effort because engineers and designers reference the same building blocks instead of reinventing buttons and spacing on every feature. In a real app, a design system might ship a Button component, a color palette, and docs explaining when to use primary vs secondary actions across web and mobile.',
    code: `// Design system package consumed by product apps
import { Button, tokens } from '@company/design-system';

function CheckoutPage() {
  return (
    <Button variant="primary" size="md">
      Place Order
    </Button>
  );
}

// tokens.color.brand.primary → "#2563eb"`,
  },
  {
    id: 2,
    category: 'Design System Fundamentals',
    question: 'What is the difference between a design system, a style guide, and a component library?',
    answer: 'A style guide documents visual rules like colors, typography, and spacing but may not include runnable code. A component library is the coded implementation of UI elements like buttons, inputs, and modals that developers import into applications. A design system combines both plus governance, accessibility standards, content guidelines, and processes for contribution and versioning. Think of the style guide as the recipe book, the component library as the pre-made ingredients, and the design system as the full kitchen operation. In a real app, Figma tokens might live in the style guide while npm packages like @company/ui deliver the component library inside the broader design system.',
    code: `// Style guide (documentation only)
// Primary color: #2563eb, used for main CTAs

// Component library (code)
export function Button({ variant, children }) {
  return <button className={\`btn btn--\${variant}\`}>{children}</button>;
}

// Design system = tokens + components + docs + governance + versioning`,
  },
  {
    id: 3,
    category: 'Design System Fundamentals',
    question: 'What are design tokens?',
    answer: 'Design tokens are named variables that store design decisions such as colors, spacing, typography, border radii, and shadows in a platform-agnostic format. They act as the single source of truth so a change to token color.brand.primary updates every button, link, and badge that references it. Tokens are typically organized in JSON or CSS custom properties and transformed for different platforms like web, iOS, and Android. In a real app, replacing a hard-coded #2563eb with var(--color-brand-primary) means a rebrand updates hundreds of files from one token change.',
    code: `// tokens.json (source of truth)
{
  "color": {
    "brand": { "primary": { "value": "#2563eb" } },
    "text": { "default": { "value": "#1a1a1a" } }
  },
  "spacing": {
    "md": { "value": "16px" }
  }
}

// Generated CSS custom property
:root {
  --color-brand-primary: #2563eb;
  --spacing-md: 16px;
}`,
  },
  {
    id: 4,
    category: 'Design System Fundamentals',
    question: 'What is the token hierarchy (global, alias, and component tokens)?',
    answer: 'Global (or primitive) tokens hold raw values like blue-500 or spacing-4 without semantic meaning. Alias (or semantic) tokens map those primitives to purpose-driven names like color.action.primary or color.text.muted. Component tokens further specialize aliases for a specific element, such as button.background.default referencing color.action.primary. This three-tier hierarchy lets you rebrand by swapping primitive values while component code keeps stable semantic names. In a real app, changing the alias color.action.primary from blue-500 to green-500 updates every primary button without touching individual component files.',
    code: `// Global (primitive)
--blue-500: #2563eb;

// Alias (semantic)
--color-action-primary: var(--blue-500);
--color-text-muted: var(--gray-500);

// Component
--button-bg-default: var(--color-action-primary);
--button-bg-hover: var(--blue-600);

.button {
  background: var(--button-bg-default);
}`,
  },
  {
    id: 5,
    category: 'Design System Fundamentals',
    question: 'What is atomic design?',
    answer: 'Atomic design is a methodology by Brad Frost that organizes UI into five levels: atoms, molecules, organisms, templates, and pages. Atoms are the smallest building blocks like buttons, labels, and inputs. Molecules combine atoms into simple functional units like a search field made of an input and button. Organisms are larger sections like a header or card grid built from molecules and atoms. This hierarchy helps teams think systematically about composition and reuse. In a real app, an Input atom and Label atom combine into a FormField molecule, which joins other molecules inside a LoginForm organism.',
    code: `// Atom
function Input(props) {
  return <input className="input" {...props} />;
}

// Molecule
function SearchField() {
  return (
    <div className="search-field">
      <Input placeholder="Search..." />
      <Button>Go</Button>
    </div>
  );
}

// Organism
function SiteHeader() {
  return (
    <header>
      <Logo />
      <SearchField />
      <Nav />
    </header>
  );
}`,
  },
  {
    id: 6,
    category: 'Design System Fundamentals',
    question: 'What are atoms, molecules, and organisms in practice?',
    answer: 'Atoms are indivisible UI elements that cannot be broken down further without losing meaning, such as a Button, Icon, or Text component. Molecules group two or more atoms into a single reusable unit with a shared purpose, like a FormField combining a Label and Input. Organisms are distinct interface sections composed of molecules and atoms, such as a ProductCard or NavigationBar that users recognize as a complete chunk of UI. The naming is a mental model for composition, not a strict file structure. In a real app, your design system npm package might export atoms and molecules while product teams assemble organisms specific to their domain.',
    code: `// Atoms: Button, Icon, Text, Input
// Molecule: FormField = Label + Input + ErrorMessage
function FormField({ label, error, ...inputProps }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input {...inputProps} />
      {error && <Text variant="error">{error}</Text>}
    </div>
  );
}

// Organism: LoginForm = FormField molecules + Button atom
function LoginForm() {
  return (
    <form>
      <FormField label="Email" type="email" />
      <FormField label="Password" type="password" />
      <Button type="submit">Sign In</Button>
    </form>
  );
}`,
  },
  {
    id: 7,
    category: 'Design System Fundamentals',
    question: 'Why does consistency matter in design systems?',
    answer: 'Consistency builds user trust because familiar patterns reduce cognitive load — users know a primary button always means the main action. It also speeds up development since teams reuse proven components instead of debating spacing and colors on every pull request. Consistent accessibility behavior, like focus rings and ARIA labels, applies everywhere rather than being reimplemented inconsistently. For stakeholders, a unified visual language strengthens brand recognition across products and platforms. In a real app, using the design system Alert component everywhere ensures error messages look and behave the same in checkout, settings, and onboarding.',
    code: `// Inconsistent (each team rolls their own)
<div style={{ color: 'red', padding: 12 }}>Error!</div>
<p className="error-text">Something went wrong</p>

// Consistent (design system component)
<Alert variant="error" title="Error">
  Something went wrong
</Alert>`,
  },
  {
    id: 8,
    category: 'Design System Fundamentals',
    question: 'What role does documentation play in a design system?',
    answer: 'Documentation explains not just what components exist but when and how to use them, including do-and-don\'t examples, accessibility notes, and code snippets. Good docs bridge the gap between designers in Figma and engineers in the codebase so both teams share the same vocabulary. Usage guidelines prevent misuse, such as explaining that destructive actions should use the danger variant rather than a red primary button. Living documentation tied to the actual component source stays accurate as the system evolves. In a real app, a Button docs page might show all variants, list keyboard behavior, and link to Storybook stories engineers can interact with.',
    code: `// Documentation structure (often in Storybook MDX or a docs site)
// ## Button
// Use for user actions. One primary button per view.
//
// ### Variants
// - primary: main call to action
// - secondary: alternative actions
// - ghost: low-emphasis actions
//
// ### Accessibility
// Always provide visible focus styles and an accessible name.

<Button variant="primary">Save Changes</Button>`,
  },
  {
    id: 9,
    category: 'Design System Fundamentals',
    question: 'How do you version a design system?',
    answer: 'Design systems follow semantic versioning: major bumps for breaking API changes like renamed props or removed components, minor bumps for backward-compatible additions, and patches for bug fixes. Breaking changes require migration guides and often codemods to help consuming teams upgrade safely. Release channels like alpha, beta, and stable let early adopters test changes before a general rollout. Changelogs and deprecation warnings give product teams time to migrate before removals. In a real app, bumping from @company/ui v2 to v3 might rename variant="contained" to variant="primary", documented in a migration guide with a search-and-replace codemod.',
    code: `// package.json
// "@company/design-system": "^2.4.1"
//  2 = major (breaking changes)
//  4 = minor (new features, backward compatible)
//  1 = patch (bug fixes)

// Deprecation pattern in component code
function Button({ variant, ...props }) {
  if (variant === 'contained') {
    console.warn('variant="contained" is deprecated. Use variant="primary".');
    variant = 'primary';
  }
  // ...
}`,
  },
  {
    id: 10,
    category: 'Design System Fundamentals',
    question: 'What is the difference between semantic and primitive design tokens?',
    answer: 'Primitive tokens store raw values with no contextual meaning, such as blue-500, gray-100, or spacing-16. Semantic tokens assign purpose to those values, like color.text.primary mapping to gray-900 or color.feedback.error mapping to red-500. Semantic tokens make theming and dark mode easier because you swap what primary text means without changing every component. Primitives remain useful as the palette from which semantic aliases are built. In a real app, a dark theme redefines color.text.primary from gray-900 to gray-50 while components keep using the same semantic token name.',
    code: `:root {
  /* Primitives */
  --gray-900: #111827;
  --gray-50: #f9fafb;

  /* Semantic */
  --color-text-primary: var(--gray-900);
  --color-bg-surface: var(--gray-50);
}

[data-theme="dark"] {
  --color-text-primary: var(--gray-50);
  --color-bg-surface: var(--gray-900);
}

.card {
  color: var(--color-text-primary);
  background: var(--color-bg-surface);
}`,
  },
  {
    id: 11,
    category: 'Design System Fundamentals',
    question: 'What does "single source of truth" mean for design systems?',
    answer: 'Single source of truth means one authoritative definition for each design decision that flows automatically to every consumer — Figma, code, mobile apps, and marketing sites. When colors or spacing live in one token file, there is no drift between a designer\'s mockup and the production CSS. Tooling like Style Dictionary or Tokens Studio syncs values from design tools into code repositories. This eliminates the classic problem of engineers eyeballing hex codes from outdated Figma exports. In a real app, updating spacing.lg in the token repo triggers a CI pipeline that regenerates CSS variables, Swift constants, and Figma variables from the same JSON source.',
    code: `// tokens/spacing.json — single source
{ "spacing": { "lg": { "value": "24px" } } }

// Style Dictionary transforms to multiple platforms
// → dist/web/spacing.css     (--spacing-lg: 24px)
// → dist/ios/Spacing.swift   (static let lg: CGFloat = 24)
// → dist/android/spacing.xml (<dimen name="spacing_lg">24dp</dimen>)`,
  },
  {
    id: 12,
    category: 'Design System Fundamentals',
    question: 'How do design systems improve design-dev handoff?',
    answer: 'Design systems give designers and developers a shared component vocabulary so a "Button primary md" in Figma maps directly to <Button variant="primary" size="md" /> in code. Tokens ensure spacing and colors match without manual translation or screenshot-based specs. Component properties in design tools mirror props in code, reducing ambiguity about states like hover, disabled, and loading. Engineers spend less time interpreting mockups and more time wiring business logic. In a real app, a designer places the design system Card component in Figma and the developer imports the same Card from npm — no pixel-pushing required for standard UI.',
    code: `// Figma component: Button / Primary / Medium
// Maps 1:1 to code:

import { Button } from '@company/design-system';

<Button variant="primary" size="md" disabled={isSubmitting}>
  {isSubmitting ? 'Saving...' : 'Save'}
</Button>`,
  },
  {
    id: 13,
    category: 'Design System Fundamentals',
    question: 'What is design system governance?',
    answer: 'Governance defines who can contribute, how changes are reviewed, and how the system evolves without becoming chaotic. A common model includes a core team maintaining foundations and tokens, plus contribution guidelines for product teams proposing new patterns. RFC or ADR processes help evaluate whether a new component belongs in the system or stays product-specific. Clear criteria — like three use cases across two teams — prevent the library from bloating with one-off components. In a real app, a product team submits a PR adding a DateRangePicker, the design system council reviews it for API consistency and accessibility, then merges it into the shared package.',
    code: `// Contribution checklist (governance doc)
// 1. Used by 3+ teams or 3+ products
// 2. Accessible (WCAG 2.1 AA tested)
// 3. Documented with Storybook stories
// 4. API follows existing naming conventions
// 5. Approved by design system council

// Product-specific component stays in app code:
// apps/checkout/components/PromoBanner.tsx

// Shared component goes in design system:
// packages/ui/src/Alert/Alert.tsx`,
  },
  {
    id: 14,
    category: 'Design System Fundamentals',
    question: 'How do design systems support multi-brand or white-label theming?',
    answer: 'Multi-brand theming swaps semantic tokens or theme objects at runtime or build time so the same components render with different colors, fonts, and logos per brand. The component API stays identical — only the theme context changes. CSS custom properties and theme providers make switching brands straightforward without duplicating component code. Build-time theming generates separate CSS bundles per brand for static sites. In a real app, a SaaS platform serving Acme Corp and Beta Inc might load different theme JSON files while both apps import the same Button and Card components from the shared library.',
    code: `// Theme per brand
const acmeTheme = {
  color: { brand: { primary: '#2563eb' } },
  font: { family: 'Inter, sans-serif' },
};

const betaTheme = {
  color: { brand: { primary: '#059669' } },
  font: { family: 'Roboto, sans-serif' },
};

<ThemeProvider theme={isAcme ? acmeTheme : betaTheme}>
  <App />
</ThemeProvider>`,
  },
  {
    id: 15,
    category: 'Design System Fundamentals',
    question: 'How do you measure design system success?',
    answer: 'Adoption metrics track how many product teams import design system components versus building custom UI, often measured by component usage analytics or bundle analysis. Efficiency metrics include reduced design-to-dev time, fewer UI-related bugs, and faster feature delivery after adoption. Consistency audits compare live products against the system to find rogue colors, spacing, and one-off components. Developer satisfaction surveys reveal whether the system helps or hinders daily work. In a real app, tracking that 85% of buttons site-wide use the design system Button component — up from 40% six months ago — demonstrates clear ROI to leadership.',
    code: `// Adoption tracking (example script)
// Scan codebase for design system imports vs custom buttons

const dsButtons = countImports('@company/design-system', 'Button');
const customButtons = countFilesMatching(/function.*Button|<button className/);

const adoptionRate = dsButtons / (dsButtons + customButtons);
// adoptionRate: 0.85 → 85% using design system`,
  },
]
