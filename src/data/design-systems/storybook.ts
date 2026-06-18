import type { InterviewQuestion } from '../../types'

export const storybookQuestions: InterviewQuestion[] = [
  {
    id: 16,
    category: 'Storybook',
    question: 'What is Storybook?',
    answer: 'Storybook is an open-source tool for developing, documenting, and testing UI components in isolation outside the main application. Each component gets "stories" that render it in different states — default, loading, error, disabled — without navigating through your full app. Designers, developers, and QA can review components interactively in a dedicated environment. Storybook integrates with frameworks like React, Vue, Angular, and Svelte.',
    code: `// .storybook/main.ts
export default {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/react-vite',
};`,
  },
  {
    id: 17,
    category: 'Storybook',
    question: 'What is the Component Story Format (CSF)?',
    answer: 'CSF is Storybook\'s standard file format for defining stories using plain JavaScript or TypeScript module exports. A default export defines metadata about the component (title, component reference, decorators), and named exports define individual stories. CSF replaced the older storiesOf API with a cleaner, more tooling-friendly syntax that supports hot reloading and TypeScript inference. Each named export becomes a story in the Storybook sidebar.',
    code: `// Button.stories.tsx (CSF 3)
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Click me' },
};`,
  },
  {
    id: 18,
    category: 'Storybook',
    question: 'What are Meta and Story objects in CSF 3?',
    answer: 'The Meta object (default export) configures shared settings for all stories in a file: title, component, parameters, decorators, and argTypes. Each Story object (named export) defines a specific rendered state using args, render functions, and story-level overrides. TypeScript generics like Meta<typeof Button> and StoryObj<typeof Button> provide autocomplete for props. This separation keeps configuration DRY while letting individual stories customize behavior.',
    code: `const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'centered' },
  argTypes: { disabled: { control: 'boolean' } },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { placeholder: 'Enter email' } };
export const WithError: Story = {
  args: { placeholder: 'Enter email', error: 'Invalid email' },
};`,
  },
  {
    id: 19,
    category: 'Storybook',
    question: 'What are args and controls in Storybook?',
    answer: 'Args are the props passed to a component in a story, defined inline in the story object or inherited from meta defaults. Controls automatically generate an interactive UI panel from argTypes, letting you toggle booleans, pick colors, and edit strings without changing code. When you adjust a control, Storybook re-renders the story with updated args in real time. This makes Storybook a live playground for exploring component APIs.',
    code: `export const Playground: Story = {
  args: {
    title: 'Product Name',
    variant: 'elevated',
    showActions: true,
  },
};

// argTypes customize the Controls panel
argTypes: {
  variant: {
    control: 'select',
    options: ['elevated', 'outlined', 'flat'],
  },
  showActions: { control: 'boolean' },
}`,
  },
  {
    id: 20,
    category: 'Storybook',
    question: 'What are decorators in Storybook?',
    answer: 'Decorators are wrapper functions that surround a story\'s rendered output to provide context like themes, routers, or padding. Global decorators in preview.ts apply to every story, while story-level decorators target specific cases. A common pattern wraps stories in a ThemeProvider or MemoryRouter so components render with the same context they expect in production. Decorators receive the story component and return JSX that includes it.',
    code: `// .storybook/preview.tsx — global decorator
import { ThemeProvider } from '@company/design-system';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={defaultTheme}>
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    </ThemeProvider>
  ),
];

// Story-level decorator
export const InSidebar: Story = {
  decorators: [(Story) => <aside style={{ width: 240 }}><Story /></aside>],
};`,
  },
  {
    id: 21,
    category: 'Storybook',
    question: 'How do you write documentation with MDX in Storybook?',
    answer: 'MDX files combine Markdown prose with embedded Storybook stories and components, letting you write rich documentation pages alongside live examples. You import Meta and Story blocks from @storybook/blocks to embed stories directly in the docs narrative. MDX docs pages appear in the Storybook sidebar under the Docs tab for each component. This keeps documentation co-located with stories so examples never drift from the actual component.',
    code: `// Button.docs.mdx
import { Meta, Story, Canvas } from '@storybook/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Button

Use buttons for user actions. Limit one primary button per view.

<Canvas of={ButtonStories.Primary} />

## Disabled State

<Canvas of={ButtonStories.Disabled} />`,
  },
  {
    id: 22,
    category: 'Storybook',
    question: 'What are Storybook addons?',
    answer: 'Addons extend Storybook with extra panels, toolbars, and features beyond basic story rendering. Popular addons include essentials (controls, actions, docs), a11y (accessibility auditing), interactions (testing user flows), and viewport (responsive preview). Addons register in main.ts and can add toolbar icons, panel tabs, or decorators. The addon ecosystem covers design tokens, Figma integration, and performance profiling.',
    code: `// .storybook/main.ts
export default {
  addons: [
    '@storybook/addon-essentials',  // controls, actions, docs, backgrounds
    '@storybook/addon-a11y',        // accessibility panel
    '@storybook/addon-interactions', // play function testing
    '@storybook/addon-viewport',    // responsive breakpoints
  ],
};`,
  },
  {
    id: 23,
    category: 'Storybook',
    question: 'What is the Actions addon in Storybook?',
    answer: 'The Actions addon logs event handler calls in a dedicated panel so you can verify callbacks fire with the correct arguments without wiring up a full app. When a component calls onClick, onChange, or custom handlers, Storybook captures the event name and payload in the Actions tab. You can use the fn() helper from @storybook/test to create mock functions with built-in action logging. This is especially useful for presentational components where you want to confirm behavior without a real backend.',
    code: `import { fn } from '@storybook/test';
import { Modal } from './Modal';

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Confirm Delete',
    onClose: fn(),    // logged in Actions panel
    onConfirm: fn(),
  },
};`,
  },
  {
    id: 24,
    category: 'Storybook',
    question: 'How does visual testing work with Storybook and Chromatic?',
    answer: 'Visual testing captures screenshots of every story and compares them against approved baselines to detect unintended UI changes. Chromatic is a cloud service built by the Storybook team that runs visual diffs on every pull request. When a developer changes a Button component, Chromatic flags stories where pixels differ from the baseline for human review. Approved changes become the new baseline. This catches CSS regressions that unit tests miss.',
    code: `// CI pipeline (GitHub Actions example)
// - name: Publish to Chromatic
//   run: npx chromatic --project-token=\${CHROMATIC_TOKEN}
//
// Chromatic:
// 1. Builds Storybook static site
// 2. Captures screenshot of each story
// 3. Compares to baseline
// 4. Reports diffs in PR checks`,
  },
  {
    id: 25,
    category: 'Storybook',
    question: 'How do you publish and share Storybook?',
    answer: 'Storybook builds to a static site using storybook build, outputting HTML, JS, and CSS that can be hosted anywhere. Common hosting targets include Chromatic, Netlify, Vercel, GitHub Pages, and internal S3 buckets. Published Storybook becomes a living component catalog that designers and PMs browse without cloning the repo. CI pipelines rebuild and deploy on every merge to keep the catalog current.',
    code: `// package.json scripts
{
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build -o storybook-static"
}

// Deploy storybook-static/ to any static host
// npx storybook build
// aws s3 sync storybook-static/ s3://design-system-docs/`,
  },
  {
    id: 26,
    category: 'Storybook',
    question: 'What is story composition in Storybook?',
    answer: 'Story composition lets one Storybook instance embed stories from another Storybook deployment via a remote URL, useful for monorepos or federated design systems. A host Storybook references remote stories so you browse components from multiple packages in one sidebar. This avoids rebuilding all stories locally when working on a single package. Composition is configured in main.ts with refs pointing to published Storybook URLs.',
    code: `// .storybook/main.ts
export default {
  refs: {
    'design-system': {
      title: 'Design System',
      url: 'https://design-system.company.com',
    },
    'icons': {
      title: 'Icons',
      url: 'https://icons.company.com',
    },
  },
};`,
  },
  {
    id: 27,
    category: 'Storybook',
    question: 'What are play functions in Storybook?',
    answer: 'Play functions are async functions attached to stories that simulate user interactions after the story renders, enabling interaction testing in the browser. They use testing-library queries and userEvent to click, type, and navigate like a real user. Play functions run automatically in the Interactions panel and can assert expected outcomes with expect from @storybook/test. This bridges the gap between visual documentation and automated testing without a separate test file.',
    code: `import { expect, userEvent, within } from '@storybook/test';

export const SuccessfulLogin: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('Email'), 'user@example.com');
    await userEvent.type(canvas.getByLabelText('Password'), 'secret');
    await userEvent.click(canvas.getByRole('button', { name: 'Sign In' }));
    await expect(canvas.getByText('Welcome back!')).toBeInTheDocument();
  },
};`,
  },
  {
    id: 28,
    category: 'Storybook',
    question: 'What is Autodocs in Storybook?',
    answer: 'Autodocs automatically generates documentation pages from component metadata, args, and TypeScript prop types without writing MDX manually. Enable it by setting tags: [\'autodocs\'] in the meta object or configuring docs.autodocs in preview.ts. The generated page includes a props table, controls, and all exported stories embedded as live examples. Autodocs works best when components have well-typed props and descriptive argTypes.',
    code: `const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],  // auto-generates docs page
  argTypes: {
    variant: {
      description: 'Visual style of the card',
      control: 'select',
      options: ['elevated', 'outlined'],
    },
  },
};
export default meta;`,
  },
  {
    id: 29,
    category: 'Storybook',
    question: 'How do you configure Storybook for a React project?',
    answer: 'Initialize Storybook with npx storybook@latest init, which detects your framework and installs the matching preset like @storybook/react-vite. The .storybook/main.ts file configures story globs, addons, and the framework builder. preview.ts sets global parameters, decorators, and default args shared across all stories. Stories live alongside components as *.stories.tsx files.',
    code: `// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: { name: '@storybook/react-vite', options: {} },
};
export default config;`,
  },
  {
    id: 30,
    category: 'Storybook',
    question: 'What are parameters in Storybook?',
    answer: 'Parameters are static metadata that configure story behavior, addon settings, and layout without affecting component props. Common parameters include layout (centered, fullscreen, padded), backgrounds (surface colors for preview), and docs settings. Global parameters in preview.ts apply to all stories; meta and story objects can override them. Parameters keep configuration separate from args so you do not pollute component props with Storybook-specific values.',
    code: `// Global default in preview.ts
export const parameters = {
  layout: 'centered',
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#1a1a1a' },
    ],
  },
};

// Story override
export const FullPage: Story = {
  parameters: { layout: 'fullscreen' },
};`,
  },
  {
    id: 31,
    category: 'Storybook',
    question: 'How do you integrate Storybook into CI pipelines?',
    answer: 'CI integration typically runs three checks: build-storybook to verify stories compile, test-runner or interaction tests for behavior, and Chromatic for visual regression. Failing any check blocks the pull request. Caching node_modules and Storybook\'s build cache speeds up CI runs. Static builds also serve as deployable artifacts for design review.',
    code: `# .github/workflows/storybook.yml
# - run: npm ci
# - run: npm run build-storybook
# - run: npx test-storybook --ci
# - run: npx chromatic --exit-zero-on-changes

// package.json
"test-storybook": "test-storybook"`,
  },
  {
    id: 32,
    category: 'Storybook',
    question: 'What is interaction testing in Storybook?',
    answer: 'Interaction testing validates that components respond correctly to user input by running play functions and asserting DOM state in a real browser environment. The Interactions panel shows each step — click, type, assert — with pass/fail status and debuggable traces. Unlike unit tests in JSDOM, interaction tests render the full component with real CSS and event handling. The test-runner addon executes all play functions headlessly in CI.',
    code: `export const SelectOption: Story = {
  args: { options: ['Apple', 'Banana', 'Cherry'] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('combobox'));
    await userEvent.click(canvas.getByRole('option', { name: 'Banana' }));
    await expect(canvas.getByRole('combobox')).toHaveTextContent('Banana');
  },
};`,
  },
  {
    id: 33,
    category: 'Storybook',
    question: 'What are argTypes in Storybook?',
    answer: 'ArgTypes define how each component prop appears and behaves in the Controls panel and docs props table. You can set control types (boolean, select, color, text), default values, descriptions, and conditional visibility. Storybook auto-generates argTypes from TypeScript prop types, but manual argTypes add select options, disable controls for callback props, and write human-readable descriptions. Well-configured argTypes make Storybook self-documenting for designers and QA.',
    code: `const meta: Meta<typeof Badge> = {
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Visual style indicating severity or category',
    },
    children: { control: 'text' },
    onDismiss: { action: 'dismissed' }, // logs in Actions panel
  },
};`,
  },
]
