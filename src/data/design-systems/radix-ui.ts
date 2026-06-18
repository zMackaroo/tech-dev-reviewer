import type { InterviewQuestion } from '../../types'

export const radixUiQuestions: InterviewQuestion[] = [
  {
    id: 72,
    category: 'Radix UI',
    question: 'What is Radix UI?',
    answer: 'Radix UI is a library of unstyled, accessible React components (primitives) that handle behavior, state management, and WAI-ARIA attributes without imposing visual design. It provides low-level building blocks like Dialog, Dropdown Menu, Popover, and Tabs that you style with your own CSS or Tailwind. Radix handles complex interaction patterns like focus trapping, keyboard navigation, and portal rendering that are tedious to implement correctly. In a real app, Radix Dialog gives you a modal with escape-to-close, focus trap, and screen reader announcements — you only add visual styling.',
    code: `import * as Dialog from '@radix-ui/react-dialog';

function Modal({ open, onOpenChange, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}`,
  },
  {
    id: 73,
    category: 'Radix UI',
    question: 'What does "headless" mean in the context of Radix UI?',
    answer: 'Headless components provide functionality and accessibility without any default visual styling — no colors, borders, padding, or animations ship with the component. You supply all presentation through className, CSS modules, or styled wrappers while Radix manages the underlying behavior. This separation lets design systems apply any visual language without fighting pre-built styles. Headless is the opposite of styled libraries like Material UI that ship opinionated appearances. In a real app, Radix Select renders a fully functional, keyboard-navigable dropdown — it just looks like unstyled HTML until you add Tailwind classes.',
    code: `import * as Select from '@radix-ui/react-select';

// Radix provides behavior, you provide ALL styling
<Select.Root>
  <Select.Trigger className="flex items-center gap-2 border rounded-md px-3 py-2">
    <Select.Value placeholder="Choose a fruit" />
    <Select.Icon>▼</Select.Icon>
  </Select.Trigger>
  <Select.Portal>
    <Select.Content className="bg-white border rounded-md shadow-lg">
      <Select.Item className="px-3 py-2 hover:bg-gray-100" value="apple">
        Apple
      </Select.Item>
    </Select.Content>
  </Select.Portal>
</Select.Root>`,
  },
  {
    id: 74,
    category: 'Radix UI',
    question: 'How does Radix UI handle accessibility?',
    answer: 'Radix implements WAI-ARIA roles, states, and properties automatically — dialog role on modals, listbox on selects, and aria-expanded on collapsible triggers. It manages focus trapping in modals, roving tabindex in menus, and returns focus to the trigger when overlays close. Keyboard support follows WAI-ARIA authoring practices: Escape closes dialogs, arrow keys navigate menus, and Enter/Space activate items. Screen reader announcements for dynamic content happen through aria-live regions. In a real app, Radix DropdownMenu works with VoiceOver and NVDA out of the box without you writing a single aria attribute.',
    code: `// Radix automatically applies:
// - role="dialog" + aria-modal="true" on Dialog.Content
// - Focus trap within the dialog
// - Escape key closes the dialog
// - Focus returns to trigger on close
// - aria-expanded on DropdownMenu.Trigger
// - Arrow key navigation in DropdownMenu.Content

<Dialog.Root>
  <Dialog.Trigger>Open Settings</Dialog.Trigger>
  <Dialog.Content>
    {/* Fully accessible without manual ARIA */}
  </Dialog.Content>
</Dialog.Root>`,
  },
  {
    id: 75,
    category: 'Radix UI',
    question: 'What are composition patterns in Radix UI?',
    answer: 'Radix components compose from small parts — Root, Trigger, Content, Portal, Overlay — that you assemble explicitly in JSX rather than configuring through props. This compound component pattern gives fine-grained control over structure and styling of each part. You choose which parts to render, wrap them, or omit them entirely. Named parts replace magic prop APIs like renderOverlay or hideCloseButton. In a real app, you compose Dialog.Root + Dialog.Trigger + Dialog.Portal + Dialog.Overlay + Dialog.Content + Dialog.Title to build a modal with exactly the structure your design requires.',
    code: `import * as Dialog from '@radix-ui/react-dialog';

<Dialog.Root>
  <Dialog.Trigger asChild>
    <button>Open</button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title>Delete Item</Dialog.Title>
      <Dialog.Description>This action cannot be undone.</Dialog.Description>
      <Dialog.Close asChild>
        <button>Cancel</button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>`,
  },
  {
    id: 76,
    category: 'Radix UI',
    question: 'What is the difference between Radix Primitives and Radix Themes?',
    answer: 'Radix Primitives (@radix-ui/react-*) are unstyled, headless components where you provide all CSS and visual design. Radix Themes (@radix-ui/themes) is a styled component library built on top of the primitives with pre-built appearance, theming via CSS variables, and a cohesive visual language. Primitives offer maximum flexibility for custom design systems. Themes offer faster development when Radix\'s default aesthetic fits your product. In a real app, a company with strict brand guidelines uses Primitives + Tailwind, while a startup prototype might use Themes for instant polished UI.',
    code: `// Primitives — unstyled, full control
import * as Dialog from '@radix-ui/react-dialog';
<Dialog.Content className="bg-white rounded-lg p-6 shadow-xl">...</Dialog.Content>

// Themes — pre-styled
import { Dialog } from '@radix-ui/themes';
<Dialog.Root>
  <Dialog.Trigger><Button>Open</Button></Dialog.Trigger>
  <Dialog.Content>...</Dialog.Content>
</Dialog.Root>`,
  },
  {
    id: 77,
    category: 'Radix UI',
    question: 'What is the relationship between Radix UI and shadcn/ui?',
    answer: 'shadcn/ui is not a component library installed via npm — it is a collection of copy-paste components built on top of Radix UI primitives with Tailwind CSS styling. shadcn/ui wraps Radix parts in styled React components using cn, cva, and CSS variables for theming. When you run shadcn add dialog, you get source files that import @radix-ui/react-dialog and add visual design. You own and can modify every line of code. In a real app, shadcn/ui Dialog is essentially a pre-styled wrapper around Radix Dialog primitives that you customize in components/ui/dialog.tsx.',
    code: `// shadcn/ui dialog.tsx (simplified)
import * as DialogPrimitive from '@radix-ui/react-dialog';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;

const DialogContent = ({ className, children, ...props }) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/80" />
    <DialogPrimitive.Content
      className={cn('fixed bg-background rounded-lg p-6 shadow-lg', className)}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);`,
  },
  {
    id: 78,
    category: 'Radix UI',
    question: 'How does Radix Dialog work?',
    answer: 'Dialog.Root manages open/closed state via open and onOpenChange props in controlled or uncontrolled mode. Dialog.Trigger opens the dialog, and Dialog.Content renders in a portal outside the DOM hierarchy to avoid z-index and overflow issues. Dialog.Overlay covers the page behind the modal, and focus is trapped within Content until the dialog closes. Dialog.Title and Dialog.Description provide accessible labels announced by screen readers. In a real app, a confirmation dialog uses Dialog.Close on both Cancel and Confirm buttons to dismiss with proper focus restoration.',
    code: `import * as Dialog from '@radix-ui/react-dialog';

function ConfirmDialog({ open, onConfirm, onCancel }) {
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onCancel()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title>Confirm Delete</Dialog.Title>
          <Dialog.Description>Are you sure?</Dialog.Description>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Delete</button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}`,
  },
  {
    id: 79,
    category: 'Radix UI',
    question: 'How does Radix Dropdown Menu work?',
    answer: 'DropdownMenu.Root wraps the entire menu, Trigger opens it on click, and Content renders menu items in a portal positioned relative to the trigger. Items support keyboard navigation with arrow keys, typeahead search, and Enter to select. SubMenu components create nested menus with automatic positioning. CheckboxItem and RadioItem handle toggle and single-select patterns with proper ARIA checked states. In a real app, a user profile menu uses DropdownMenu with items for Settings, Profile, and Sign Out, all keyboard-accessible without custom event handlers.',
    code: `import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild>
    <button>Account</button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content className="bg-white rounded-md shadow-lg p-1">
      <DropdownMenu.Item className="px-3 py-2 hover:bg-gray-100 rounded">
        Profile
      </DropdownMenu.Item>
      <DropdownMenu.Item className="px-3 py-2 hover:bg-gray-100 rounded">
        Settings
      </DropdownMenu.Item>
      <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
      <DropdownMenu.Item className="px-3 py-2 hover:bg-gray-100 rounded text-red-600">
        Sign Out
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>`,
  },
  {
    id: 80,
    category: 'Radix UI',
    question: 'What is the Radix Slot component?',
    answer: 'Slot merges its props onto its immediate child element instead of rendering its own DOM node, enabling flexible composition without wrapper divs. Combined with asChild on Radix components, Slot lets a Radix Trigger render as your custom Button component while receiving trigger behavior and ARIA attributes. Slot passes className, event handlers, and refs through to the child via React.cloneElement. This avoids button-inside-button HTML violations and extra DOM nesting. In a real app, Dialog.Trigger asChild merges dialog open behavior onto your styled Button without rendering a redundant wrapper element.',
    code: `import { Slot } from '@radix-ui/react-slot';

// Without asChild — renders a button wrapping your button (invalid HTML)
<Dialog.Trigger>
  <button className="btn-primary">Open</button>
</Dialog.Trigger>

// With asChild — merges props onto your button (correct)
<Dialog.Trigger asChild>
  <button className="btn-primary">Open</button>
</Dialog.Trigger>

// Slot implementation concept:
// <Slot className="extra">{child}</Slot>
// → cloneElement(child, { className: merge(child.props.className, "extra") })`,
  },
  {
    id: 81,
    category: 'Radix UI',
    question: 'What does the asChild prop do in Radix UI?',
    answer: 'asChild tells a Radix component to render its child element as the component\'s DOM node instead of creating its own default element. Radix merges its props — event handlers, ARIA attributes, refs — onto the child via the Slot component. This is essential for composing Radix behavior with your own styled components without invalid HTML nesting. Without asChild, Dialog.Trigger renders a button wrapping your button. In a real app, Popover.Trigger asChild on a Link component makes the link open the popover without converting it to a button element.',
    code: `import * as Popover from '@radix-ui/react-popover';

// asChild merges popover trigger behavior onto the Link
<Popover.Root>
  <Popover.Trigger asChild>
    <a href="/help" className="text-brand underline">Help</a>
  </Popover.Trigger>
  <Popover.Content>
    <p>Need assistance? Contact support.</p>
  </Popover.Content>
</Popover.Root>`,
  },
  {
    id: 82,
    category: 'Radix UI',
    question: 'What is the difference between controlled and uncontrolled Radix components?',
    answer: 'Uncontrolled components manage their own internal state — Dialog.Root without an open prop opens and closes autonomously via Trigger and Close. Controlled components accept open and onOpenChange props so the parent React state drives the open/closed behavior. Controlled mode is required when dialog visibility depends on external state like API responses or route changes. Both modes support defaultOpen for initial uncontrolled state. In a real app, a delete confirmation uses controlled mode because open is tied to which item ID is selected for deletion in parent state.',
    code: `// Uncontrolled — Radix manages state internally
<Dialog.Root defaultOpen={false}>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>...</Dialog.Content>
</Dialog.Root>

// Controlled — parent state drives visibility
const [open, setOpen] = useState(false);
const [itemId, setItemId] = useState(null);

<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Content>Delete item {itemId}?</Dialog.Content>
</Dialog.Root>`,
  },
  {
    id: 83,
    category: 'Radix UI',
    question: 'How do you style Radix UI components with Tailwind CSS?',
    answer: 'Apply Tailwind classes directly to each Radix part — Trigger, Content, Overlay, Item — via className props since Radix renders standard DOM elements you control. Use data attributes Radix sets automatically for state-based styling: data-[state=open]:animate-in, data-[state=closed]:animate-out, and data-[side=bottom]:slide-in-from-top. CSS variables like --radix-dropdown-menu-content-transform-origin enable origin-aware animations. In a real app, Dialog.Content with className="data-[state=open]:animate-in data-[state=closed]:animate-out fade-in-0 zoom-in-95" creates smooth enter/exit animations.',
    code: `<Dialog.Content
  className="fixed bg-white rounded-lg p-6 shadow-lg
             data-[state=open]:animate-in data-[state=closed]:animate-out
             data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
             data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
>
  Dialog content
</Dialog.Content>`,
  },
  {
    id: 84,
    category: 'Radix UI',
    question: 'How do Radix data attributes enable state-based styling?',
    answer: 'Radix sets data-state (open/closed/active/inactive), data-side (top/bottom/left/right), data-highlighted, and data-disabled attributes on component parts automatically. CSS and Tailwind target these attributes for state-dependent styles without JavaScript toggling classes. This keeps styling declarative and synchronized with Radix\'s internal state machine. The pattern replaces manual isOpen && "visible" class toggling. In a real app, data-[state=open]:opacity-100 data-[state=closed]:opacity-0 on Accordion.Content creates smooth expand/collapse transitions driven entirely by Radix state.',
    code: `import * as Accordion from '@radix-ui/react-accordion';

<Accordion.Content
  className="overflow-hidden
             data-[state=closed]:animate-accordion-up
             data-[state=open]:animate-accordion-down"
>
  <div className="pb-4">Accordion panel content</div>
</Accordion.Content>

// Radix sets data-state="open" or data-state="closed" automatically`,
  },
  {
    id: 85,
    category: 'Radix UI',
    question: 'When should you choose Radix UI over a styled component library?',
    answer: 'Choose Radix when you need full control over visual design, are building a custom design system, or the styled library\'s aesthetic does not match your brand. Radix excels for design-system-first teams using Tailwind or CSS Modules who want accessible behavior without visual opinions. Choose a styled library like MUI when speed matters more than custom branding and the default aesthetic is acceptable. Radix also suits wrapping in your own component library — as shadcn/ui demonstrates. In a real app, a fintech product with strict brand guidelines picks Radix + Tailwind over MUI to avoid fighting Material Design defaults.',
    code: `// Radix + Tailwind: full visual control
import * as Tabs from '@radix-ui/react-tabs';

<Tabs.Root defaultValue="overview">
  <Tabs.List className="flex border-b">
    <Tabs.Trigger value="overview" className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-brand">
      Overview
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview" className="pt-4">
    Dashboard content
  </Tabs.Content>
</Tabs.Root>`,
  },
]
