import type { InterviewQuestion } from '../../types'

export const stateQuestions: InterviewQuestion[] = [
  {
    id: 28,
    category: 'State',
    question: 'What is useState and how does it work?',
    answer: 'useState is a React hook that returns a pair: the current state value and a setter function to update it. When you call the setter, React schedules a re-render with the new value and preserves state between renders for that component instance. You can pass a direct value or a functional updater like setCount(prev => prev + 1), which is safer when the new state depends on the previous state.',
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
    answer: 'React batches multiple setState calls that occur in the same event loop tick into a single re-render to avoid redundant work and keep the UI performant. Instead of re-rendering after every individual setter call, React queues updates and applies them all before painting once. In React 18+, automatic batching extends to promises, setTimeout, and native event handlers — not just React event handlers.',
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
    answer: 'State holds data that affects what is rendered — when state changes, React re-renders the component with the new value. Refs hold a mutable .current value that persists across renders but does not trigger a re-render when changed. Use state for anything that should appear in the UI, and refs for DOM node access, storing timer IDs, or tracking values that do not need to drive rendering.',
    code: `const [count, setCount] = useState(0); // triggers re-render
const renderCount = useRef(0);          // no re-render
renderCount.current += 1;`,
    demo: 'react-ref',
  },
  {
    id: 31,
    category: 'State',
    question: 'What happens if you mutate state directly?',
    answer: 'If you mutate state directly — such as pushing to an array or assigning a property on an object — React may not detect the change because it compares references, not deep values. Since the reference stays the same, React skips the re-render and your UI shows stale data.',
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
    answer: 'Lazy initial state means passing a function to useState instead of a direct value, so React calls that function only once on the initial render to compute the starting state. If you pass computeExpensive() directly, the function runs on every render even though its result is only used the first time.',
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
    answer: 'Derived state is any value computed from props or existing state during render, rather than stored in its own useState. If you can calculate it from other data, you should derive it inline instead of syncing it with useEffect, which adds complexity and bug risk.',
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
    answer: 'State should live in the component that uses it, and only be lifted to a parent when a sibling or ancestor also needs access to it. Keeping state local reduces complexity, limits re-render scope, and makes components easier to reason about and reuse independently.',
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
    answer: 'useReducer manages state through a reducer function that takes the current state and an action, returning the next state — similar to Redux but built into React. You dispatch actions like dispatch({ type: "increment" }) instead of calling multiple setters, centralizing update logic in one testable function.',
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
    answer: 'useState is ideal for simple, independent pieces of state where you update values directly with a setter function. useReducer is better when updates follow defined action types, involve multiple sub-values, or the next state depends on complex logic involving the previous state. The reducer pattern centralizes update logic in one pure function that is easy to unit test in isolation.',
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
    answer: 'To update nested state immutably, you must spread each level of the object to create new references at every depth that changes, leaving unchanged levels structurally shared. React detects changes by reference equality, so mutating a nested property in place will not trigger a re-render.',
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
    answer: 'When you write useState(propValue), React uses propValue only as the initial state on the first render — subsequent prop changes do not automatically update the state. This is intentional because state and props serve different roles: props configure the component, state tracks internal changes after mount.',
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
    answer: 'A stale closure occurs when a callback or effect captures outdated state or props from a previous render because its dependency array is incomplete or it closed over old values. The function still runs, but it reads variables frozen at the time it was created, leading to bugs like counters that always log 0 or effects that use expired data.',
    code: `// Stale: count is 0 in closure
useEffect(() => {
  const id = setInterval(() => console.log(count), 1000);
  return () => clearInterval(id);
}, []); // missing count dependency

// Fix: functional update or add dependency`,
    output: ['Fix with deps array, useRef, or functional updates'],
  },
]
