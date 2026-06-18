import type { InterviewQuestion } from '../../types'

export const stateQuestions: InterviewQuestion[] = [
  {
    id: 28,
    category: 'State',
    question: 'What is useState and how does it work?',
    answer: 'useState is a React hook that returns a pair: the current state value and a setter function to update it. When you call the setter, React schedules a re-render with the new value and preserves state between renders for that component instance. You can pass a direct value or a functional updater like setCount(prev => prev + 1), which is safer when the new state depends on the previous state. This matters because useState is the foundation of interactive UI — every click, toggle, and input typically relies on it. For example, a like button uses useState to track whether the user has liked a post and update the count on click. In a real app, a settings panel might hold dozens of useState calls for form fields, toggles, and UI visibility.',
    code: `const [count, setCount] = useState(0);

// Direct update
setCount(count + 1);

// Functional update (safer in callbacks)
setCount(prev => prev + 1);`,
    demo: 'react-state',
  },
  {
    id: 29,
    category: 'State',
    question: 'Why does React batch state updates?',
    answer: 'React batches multiple setState calls that occur in the same event loop tick into a single re-render to avoid redundant work and keep the UI performant. Instead of re-rendering after every individual setter call, React queues updates and applies them all before painting once. In React 18+, automatic batching extends to promises, setTimeout, and native event handlers — not just React event handlers. This matters because firing five setters in one click handler would cause five expensive re-renders without batching. For example, updating both count and flag in handleClick results in one render where both values are already updated. In a real app, a form submission might update loading, error, and data state simultaneously and the user sees one smooth transition instead of flickering intermediate states.',
    code: `function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 18: one re-render, not two
}
// Both updates applied before next render`,
    output: ['Multiple setStates → single re-render (React 18)'],
  },
  {
    id: 30,
    category: 'State',
    question: 'What is the difference between state and refs?',
    answer: 'State holds data that affects what is rendered — when state changes, React re-renders the component with the new value. Refs hold a mutable .current value that persists across renders but does not trigger a re-render when changed. Use state for anything that should appear in the UI, and refs for DOM node access, storing timer IDs, or tracking values that do not need to drive rendering. This matters because choosing wrong leads to either stale UI (using refs for display data) or unnecessary re-renders (using state for values that never appear on screen). For example, a ref stores the previous scroll position while state stores whether a "scroll to top" button is visible. In a real app, you might use a ref to focus an input after a modal opens without causing an extra render cycle.',
    code: `const [count, setCount] = useState(0); // triggers re-render
const renderCount = useRef(0);          // no re-render
renderCount.current += 1;`,
    demo: 'react-ref',
  },
  {
    id: 31,
    category: 'State',
    question: 'What happens if you mutate state directly?',
    answer: 'If you mutate state directly — such as pushing to an array or assigning a property on an object — React may not detect the change because it compares references, not deep values. Since the reference stays the same, React skips the re-render and your UI shows stale data. This matters because mutation bugs are subtle and common, especially with arrays and nested objects. For example, calling items.push(newItem) then setItems(items) passes the same array reference, so nothing updates on screen. In a real app, always create new objects and arrays with spread syntax or methods like map/filter when updating state, such as setItems([...items, newItem]) when adding a todo.',
    code: `// Wrong
state.items.push(newItem);
setItems(state); // same reference — no re-render!

// Correct
setItems([...items, newItem]);
setUser({ ...user, name: "Alice" });`,
    output: ['Always new reference — immutability required'],
  },
  {
    id: 32,
    category: 'State',
    question: 'What is lazy initial state in useState?',
    answer: 'Lazy initial state means passing a function to useState instead of a direct value, so React calls that function only once on the initial render to compute the starting state. If you pass computeExpensive() directly, the function runs on every render even though its result is only used the first time. This matters when initialization involves parsing localStorage, filtering a large dataset, or building a complex default object. For example, useState(() => JSON.parse(localStorage.getItem("draft") ?? "{}")) avoids parsing on every re-render. In a real app, a data table might lazily initialize column sort preferences from user settings stored in session storage.',
    code: `// Runs every render (bad for expensive init)
const [data] = useState(computeExpensive());

// Runs once (good)
const [data] = useState(() => computeExpensive());`,
    output: ['useState(() => init) — computed once only'],
  },
  {
    id: 33,
    category: 'State',
    question: 'What is derived state?',
    answer: 'Derived state is any value computed from props or existing state during render, rather than stored in its own useState. If you can calculate it from other data, you should derive it inline instead of syncing it with useEffect, which adds complexity and bug risk. This matters because redundant state creates synchronization problems — two sources of truth can drift out of sync. For example, fullName should be computed as `${first} ${last}` during render, not stored in separate state updated whenever first or last changes. In a real app, a shopping cart might derive totalPrice by reducing over items on each render rather than maintaining a separate total state that could become incorrect.',
    code: `function FullName({ first, last }) {
  // Derived — no extra state needed
  const full = \`\${first} \${last}\`;
  return <p>{full}</p>;
}`,
    output: ['Compute during render — avoid redundant state'],
  },
  {
    id: 34,
    category: 'State',
    question: 'When should state be colocated?',
    answer: 'State should live in the component that uses it, and only be lifted to a parent when a sibling or ancestor also needs access to it. Keeping state local reduces complexity, limits re-render scope, and makes components easier to reason about and reuse independently. This matters because premature lifting creates prop drilling and causes unrelated components to re-render when shared state changes. For example, a SearchInput can keep its query string in local state if only it reads the value before submitting on Enter. In a real app, you lift state to a parent only when both a sidebar filter and a main content list need the same selected category.',
    code: `// Local: only this component needs it
function SearchInput() {
  const [query, setQuery] = useState("");
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}`,
    output: ['Colocate state — lift only when shared'],
  },
  {
    id: 35,
    category: 'State',
    question: 'What is useReducer and when to use it over useState?',
    answer: 'useReducer manages state through a reducer function that takes the current state and an action, returning the next state — similar to Redux but built into React. You dispatch actions like dispatch({ type: "increment" }) instead of calling multiple setters, centralizing update logic in one testable function. This matters when state transitions are complex, involve multiple related fields, or depend on the previous state in non-trivial ways. For example, a form wizard with steps, validation errors, and dirty flags is cleaner as a reducer than a dozen useState calls. In a real app, useReducer works well for shopping carts, authentication flows, and any state machine-like behavior with defined transitions.',
    code: `function reducer(state, action) {
  switch (action.type) {
    case "inc": return { count: state.count + 1 };
    case "dec": return { count: state.count - 1 };
    default: return state;
  }
}
const [state, dispatch] = useReducer(reducer, { count: 0 });`,
    demo: 'react-reducer',
  },
  {
    id: 36,
    category: 'State',
    question: 'What is the difference between useState and useReducer?',
    answer: 'useState is ideal for simple, independent pieces of state where you update values directly with a setter function. useReducer is better when updates follow defined action types, involve multiple sub-values, or the next state depends on complex logic involving the previous state. The reducer pattern centralizes update logic in one pure function that is easy to unit test in isolation. This matters when choosing the right tool — overusing useReducer adds boilerplate, while overusing useState scatters related logic across many setters. For example, a simple boolean toggle uses useState, but a todo list with add, toggle, delete, and filter actions fits useReducer naturally. In a real app, a notification system with dismiss, snooze, and mark-read actions is a common useReducer candidate.',
    code: `// useState — simple
const [open, setOpen] = useState(false);

// useReducer — complex transitions
dispatch({ type: "TOGGLE" });
dispatch({ type: "RESET" });`,
    demo: 'react-reducer',
  },
  {
    id: 37,
    category: 'State',
    question: 'How do you update nested state immutably?',
    answer: 'To update nested state immutably, you must spread each level of the object to create new references at every depth that changes, leaving unchanged levels structurally shared. React detects changes by reference equality, so mutating a nested property in place will not trigger a re-render. This matters because real-world state is often nested — user profiles, settings objects, and form data all have deep structures. For example, updating a user\'s city requires spreading both the top-level user object and the nested address object. In a real app, deeply nested updates become verbose quickly, which is why many teams adopt Immer, flatten state shape, or use normalized patterns like byId/allIds for collections.',
    code: `setUser(prev => ({
  ...prev,
  address: {
    ...prev.address,
    city: "NYC",
  },
}));`,
    output: ['Spread each nested level for immutability'],
  },
  {
    id: 38,
    category: 'State',
    question: 'What is state initialization from props?',
    answer: 'When you write useState(propValue), React uses propValue only as the initial state on the first render — subsequent prop changes do not automatically update the state. This is intentional because state and props serve different roles: props configure the component, state tracks internal changes after mount. This matters when building edit forms or resettable components where you need to understand when state syncs with props. For example, an EditForm initialized with initialName="Alice" keeps that name in state even if the parent later passes initialName="Bob". In a real app, use the key prop — like <EditForm key={userId} initialName={name} /> — to force a full remount and reinitialize state when switching to a different user.',
    code: `function EditForm({ initialName }) {
  const [name, setName] = useState(initialName);
  // Reset when user changes: <EditForm key={userId} initialName={name} />
}`,
    output: ['useState(prop) — initial only; use key to reset'],
  },
  {
    id: 39,
    category: 'State',
    question: 'What is stale closure in React?',
    answer: 'A stale closure occurs when a callback or effect captures outdated state or props from a previous render because its dependency array is incomplete or it closed over old values. The function still runs, but it reads variables frozen at the time it was created, leading to bugs like counters that always log 0 or effects that use expired data. This matters because closures are everywhere in React — event handlers, setInterval callbacks, and useEffect bodies all create them. For example, a setInterval inside useEffect with an empty dependency array will forever log the initial count value. In a real app, fix stale closures with functional state updates (setCount(c => c + 1)), useRef to hold the latest value, or by adding the correct dependencies to useEffect and useCallback.',
    code: `// Stale: count is 0 in closure
useEffect(() => {
  const id = setInterval(() => console.log(count), 1000);
  return () => clearInterval(id);
}, []); // missing count dependency

// Fix: functional update or add dependency`,
    output: ['Fix with deps array, useRef, or functional updates'],
  },
]
