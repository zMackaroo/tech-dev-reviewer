import type { InterviewQuestion } from '../../types'

export const performanceQuestions: InterviewQuestion[] = [
  {
    id: 66,
    category: 'Performance',
    question: 'What is reconciliation in React?',
    answer: 'Reconciliation is React\'s process of comparing the new element tree from a render with the previous one and determining the minimal set of DOM changes needed to update the UI. React uses diffing heuristics — such as assuming elements of different types replace entire subtrees and using keys to match list items — rather than a full O(n³) tree comparison. Understanding reconciliation helps you write code that avoids unnecessary unmounting and remounting, which destroys component state and hurts performance.',
    code: `// Same type → update props
<div className="old" />  →  <div className="new" />

// Different type → unmount + mount
<div />  →  <span />`,
    output: ['Diff VDOM trees → minimal DOM patches'],
  },
  {
    id: 67,
    category: 'Performance',
    question: 'What is React.memo?',
    answer: 'React.memo is a higher-order component that wraps a function component and skips re-rendering it when its props are shallowly equal to the previous render. It is most effective for pure components that render frequently with the same props, especially expensive leaf components like charts or complex table rows. It is not a default optimization — wrapping every component adds comparison overhead and can obscure data flow issues.',
    code: `const Chart = React.memo(function Chart({ data }) {
  return <ExpensiveChart data={data} />;
});
// Skips re-render if data reference unchanged`,
    demo: 'react-memo',
  },
  {
    id: 68,
    category: 'Performance',
    question: 'What causes unnecessary re-renders?',
    answer: 'Common causes include creating new object, array, or function references inline on every render and passing them as props, which breaks memoization in child components. Context value changes propagate re-renders to all consumers, and by default every parent re-render also re-renders all children even if their props are unchanged. Missing memo, useMemo, or useCallback in hot paths can amplify these issues, but the first step should always be profiling rather than blindly adding optimizations.',
    code: `// New object every render → child always re-renders
<Child style={{ color: "red" }} />

// Fix: hoist or useMemo
const style = useMemo(() => ({ color: "red" }), []);`,
    demo: 'react-memo',
  },
  {
    id: 69,
    category: 'Performance',
    question: 'What is code splitting in React?',
    answer: 'Code splitting breaks your JavaScript bundle into smaller chunks that are loaded on demand rather than shipping the entire app on the first page load. In React, React.lazy() dynamically imports a component module, and Suspense provides a fallback UI while the chunk downloads. Route-level splitting is the most common pattern, but you can also split heavy components like rich text editors or admin panels that most users never visit.',
    code: `const Dashboard = React.lazy(() => import("./Dashboard"));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Dashboard />
    </Suspense>
  );
}`,
    output: ['React.lazy + Suspense — load on demand'],
  },
  {
    id: 70,
    category: 'Performance',
    question: 'What is Suspense?',
    answer: 'Suspense lets components suspend rendering while waiting for something asynchronous — most commonly a lazy-loaded code chunk, and increasingly data fetching with compatible libraries — and shows a fallback UI in the meantime. Multiple Suspense boundaries can be nested to provide granular loading states at different levels of the UI rather than one full-page spinner. It integrates with Concurrent React to avoid blocking urgent updates while slower content loads.',
    code: `<Suspense fallback={<PageLoader />}>
  <LazyComponent />
</Suspense>`,
    output: ['Fallback UI while children load'],
  },
  {
    id: 71,
    category: 'Performance',
    question: 'What is the React Profiler?',
    answer: 'The React Profiler, available in React DevTools and programmatically via the Profiler component, records how long components take to render and why they re-rendered. It produces flame charts and ranked lists that highlight expensive components and unnecessary update cascades.',
    code: `<Profiler id="Navigation" onRender={onRenderCallback}>
  <Navigation />
</Profiler>`,
    output: ['Measure render performance in DevTools'],
  },
  {
    id: 72,
    category: 'Performance',
    question: 'What is windowing/virtualization?',
    answer: 'Windowing (or virtualization) renders only the visible subset of a large list instead of mounting thousands of DOM nodes at once, dramatically reducing memory usage and layout cost. Libraries like react-window, react-virtualized, and TanStack Virtual calculate which items fall within the viewport and render just those rows with absolute positioning. This is essential for data-heavy UIs like long tables, chat histories, and infinite feeds where rendering every item would freeze the browser.',
    code: `// react-window example
<FixedSizeList height={400} itemCount={10000} itemSize={35}>
  {({ index, style }) => <div style={style}>Row {index}</div>}
</FixedSizeList>`,
    output: ['Render visible rows only — 10k+ items'],
  },
  {
    id: 73,
    category: 'Performance',
    question: 'What is Concurrent React?',
    answer: 'Concurrent React refers to React 18+ features that enable interruptible, priority-based rendering so urgent updates like typing or clicking are not blocked by expensive re-renders. Hooks like useTransition and useDeferredValue, along with improved Suspense, let React pause lower-priority work and resume it when the main thread is free. This keeps the UI feeling responsive even during heavy computation or large tree updates.',
    code: `startTransition(() => {
  setSearchResults(filter(allItems, query));
});
// Input stays responsive during filter`,
    output: ['Interruptible rendering — priority scheduling'],
  },
  {
    id: 74,
    category: 'Performance',
    question: 'Should you optimize every component with memo?',
    answer: 'No — wrapping every component in React.memo is premature optimization that adds memory overhead, comparison cost, and code complexity without guaranteed benefit. Most components render quickly enough that memoization costs more than it saves, and it can hide bugs caused by stale closures or incorrect dependency arrays. The right approach is to profile first with React DevTools, identify actual bottlenecks, and optimize hot paths like expensive charts, large lists, or frequently re-rendered pure leaf components.',
    code: `// Don't wrap everything in memo
// Do wrap: expensive charts, big lists, pure leaf components`,
    demo: 'react-memo',
  },
  {
    id: 75,
    category: 'Performance',
    question: 'What is the Fiber architecture?',
    answer: 'Fiber is React\'s reconciliation engine introduced in React 16, replacing the old stack-based reconciler with a linked-list of work units called fibers that represent components and their state. It enables incremental rendering by breaking work into small chunks that can be paused, resumed, and prioritized, which is the foundation for Concurrent React, Suspense, and error boundaries. Each fiber node tracks its own pending work, allowing React to schedule updates based on urgency rather than blocking the main thread until a full tree walk completes.',
    code: `// Fiber enables:
// - Concurrent mode
// - Suspense
// - Priority-based scheduling
// - Error boundaries at fiber level`,
    output: ['Incremental rendering engine since React 16'],
  },
]
