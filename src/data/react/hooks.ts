import type { InterviewQuestion } from '../../types'

export const hooksQuestions: InterviewQuestion[] = [
  {
    id: 40,
    category: 'Hooks',
    question: 'What are React Hooks?',
    answer: 'Hooks are functions that let functional components use state, lifecycle behavior, context, and other React features without writing class components. They must be called at the top level of a component or custom hook — never inside loops, conditions, or nested functions — so React can track them consistently across renders. Custom hooks let you extract and reuse stateful logic between components while keeping UI code separate from business logic. This matters because hooks became the standard way to build React apps, replacing most class-based patterns with simpler, composable functions. For example, a shopping cart page might use useState for item count, useEffect to sync totals to the document title, and a custom useCart hook shared across checkout and header components.',
    code: `function Example() {
  const [n, setN] = useState(0);
  useEffect(() => { document.title = \`Count: \${n}\`; }, [n]);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}`,
    demo: 'react-state',
  },
  {
    id: 41,
    category: 'Hooks',
    question: 'What are the Rules of Hooks?',
    answer: 'The first rule is to only call hooks at the top level — never inside conditions, loops, or nested functions — because React relies on call order to associate state with the correct component instance. The second rule is to only call hooks from React function components or custom hooks, not from regular JavaScript functions or class components. Breaking these rules causes subtle bugs like state getting mixed between renders or hooks throwing errors at runtime. In a real app, you might be tempted to call useState inside an if (isLoggedIn) block, but the correct pattern is to call the hook unconditionally and conditionally use its value inside the block instead.',
    code: `// Wrong
if (condition) useState(0);

// Correct
const [value, setValue] = useState(0);
if (condition) { /* use value */ }`,
    output: ['Top level only — same order every render'],
  },
  {
    id: 42,
    category: 'Hooks',
    question: 'What is useEffect and what is its purpose?',
    answer: 'useEffect runs side effects after React commits changes to the DOM, such as fetching data, setting up subscriptions, or syncing with non-React systems like analytics or third-party widgets. You can return a cleanup function from the effect to tear down subscriptions, cancel requests, or remove event listeners when the component unmounts or before the effect re-runs. The dependency array controls when the effect re-executes, which helps prevent stale data and infinite loops. This matters because rendering should stay pure — effects are where you coordinate with the outside world without blocking the UI. For example, a chat component might use useEffect to open a WebSocket on mount and close it in the cleanup when the user navigates away.',
    code: `useEffect(() => {
  const sub = api.subscribe(data);
  return () => sub.unsubscribe(); // cleanup
}, [dependency]);`,
    demo: 'react-effect',
  },
  {
    id: 43,
    category: 'Hooks',
    question: 'What are the useEffect dependency array options?',
    answer: 'Omitting the dependency array runs the effect after every render, which is rarely what you want but can be useful for logging or syncing with props on each pass. An empty array [] runs the effect once after the initial mount, similar to componentDidMount in class components. Passing specific values like [userId] re-runs the effect only when those dependencies change, keeping data in sync without unnecessary work. Getting dependencies wrong is one of the most common sources of bugs, which is why the exhaustive-deps ESLint rule flags missing values. In a real app, fetching a user profile when userId changes looks like useEffect(() => { fetchProfile(userId) }, [userId]) — omitting userId would show stale profile data after navigation.',
    code: `useEffect(() => {}, []);      // mount only
useEffect(() => {}, [id]);     // when id changes
useEffect(() => {});            // every render (rare)`,
    demo: 'react-effect',
  },
  {
    id: 44,
    category: 'Hooks',
    question: 'What is useLayoutEffect vs useEffect?',
    answer: 'useLayoutEffect fires synchronously after DOM mutations but before the browser paints, making it suitable for reading layout or applying DOM changes that must happen before the user sees anything. useEffect fires asynchronously after paint, so it does not block the browser from showing the updated UI — this is preferred for most side effects like data fetching or analytics. useLayoutEffect can hurt performance if overused because it delays painting until the effect completes. In a real app, you might use useLayoutEffect to measure a tooltip\'s position and adjust it before it flickers into the wrong spot, while using useEffect to load tooltip content from an API.',
    code: `useLayoutEffect(() => {
  const height = ref.current.offsetHeight;
  setHeight(height); // before browser paint
}, []);

useEffect(() => {
  fetchData(); // after paint — non-blocking
}, []);`,
    output: ['useLayoutEffect: sync before paint; useEffect: after paint'],
  },
  {
    id: 45,
    category: 'Hooks',
    question: 'What is useRef used for?',
    answer: 'useRef returns a mutable object with a .current property that persists across renders without triggering a re-render when it changes. The most common use is holding a reference to a DOM element so you can imperatively call methods like focus(), scrollIntoView(), or measure dimensions. Refs are also useful for storing timers, previous prop values, or any mutable value that should survive renders but should not cause updates when modified. This matters because some interactions are inherently imperative and awkward to model purely with state. For example, a search page might attach a ref to an input and call inputRef.current.focus() when the user clicks a "Search" button elsewhere on the page.',
    code: `const inputRef = useRef(null);
const focus = () => inputRef.current.focus();
return <input ref={inputRef} />;`,
    demo: 'react-ref',
  },
  {
    id: 46,
    category: 'Hooks',
    question: 'What is useMemo?',
    answer: 'useMemo caches the result of an expensive computation between renders and only recalculates when its dependencies change. It helps avoid redoing heavy work — like sorting thousands of rows or filtering a large dataset — on every render when the inputs have not changed. However, useMemo itself has overhead, so it should not be applied everywhere by default; profile first to confirm the calculation is actually costly. In a real app, a product catalog might use useMemo to sort and filter items only when the sort key or filter criteria change, keeping typing in the search box smooth while the parent re-renders for other reasons.',
    code: `const sorted = useMemo(
  () => items.slice().sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);`,
    demo: 'react-memo',
  },
  {
    id: 47,
    category: 'Hooks',
    question: 'What is useCallback?',
    answer: 'useCallback returns a memoized function reference that stays stable between renders as long as its dependencies have not changed. This is especially useful when passing callbacks to memoized child components wrapped in React.memo, because a new inline function on every render would defeat the memoization and cause unnecessary re-renders. It does not make the function itself faster to execute — it only preserves referential equality. In a real app, a virtualized list might pass an onRowClick handler via useCallback so each row component, wrapped in memo, skips re-rendering when unrelated parent state changes.',
    code: `const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

return <MemoChild onClick={handleClick} />;`,
    demo: 'react-memo',
  },
  {
    id: 48,
    category: 'Hooks',
    question: 'What is the difference between useMemo and useCallback?',
    answer: 'useMemo memoizes the return value of a function — you pass a function and get back the computed result, like a sorted array or filtered list. useCallback memoizes the function reference itself — you pass a function and get back that same function (or an equivalent one) when deps are unchanged. Technically, useCallback(fn, deps) is equivalent to useMemo(() => fn, deps), so the choice is really about intent and readability. This distinction matters when deciding what to stabilize: memoize values that are expensive to compute with useMemo, and memoize callbacks passed to optimized children with useCallback. For example, useMemo might cache filteredProducts while useCallback stabilizes the onAddToCart handler passed to each ProductCard.',
    code: `const value = useMemo(() => compute(a), [a]);
const fn = useCallback(() => action(a), [a]);
// useCallback = useMemo for functions`,
    output: ['useMemo → value; useCallback → function reference'],
  },
  {
    id: 49,
    category: 'Hooks',
    question: 'What is useContext?',
    answer: 'useContext reads the current value from the nearest matching Provider above the component in the tree, letting deeply nested components access shared data without passing props through every intermediate layer. It is the consumer side of the Context API, paired with createContext and Provider. Any component using useContext re-renders when the context value changes, so splitting contexts by concern helps avoid unnecessary updates across the tree. In a real app, a theme context might let a Settings page, sidebar, and modal all read the current dark/light mode without threading a theme prop through dozens of components.',
    code: `const ThemeContext = createContext("light");

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}`,
    demo: 'react-context',
  },
  {
    id: 50,
    category: 'Hooks',
    question: 'What is a custom hook?',
    answer: 'A custom hook is a JavaScript function whose name starts with "use" and that calls one or more built-in hooks to encapsulate reusable stateful logic. It is not a separate React API — it is a convention for sharing behavior like data fetching, form handling, or local storage sync across components. Custom hooks let you extract logic while keeping each component focused on rendering UI. This matters because duplication of hook logic across components leads to inconsistent behavior and harder maintenance. For example, a useDebounce hook might wrap useState and useEffect so every search field in the app debounces input the same way without copying timer logic.',
    code: `function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const inc = () => setCount(c => c + 1);
  const dec = () => setCount(c => c - 1);
  return { count, inc, dec };
}`,
    demo: 'react-state',
  },
  {
    id: 51,
    category: 'Hooks',
    question: 'What is useImperativeHandle?',
    answer: 'useImperativeHandle customizes the instance value that a parent component receives when it attaches a ref to a child wrapped in forwardRef. By default, refs point to DOM nodes, but this hook lets you expose a curated API — such as focus(), scrollTo(), or reset() — instead of the entire DOM element. It is intentionally rare because React favors declarative data flow over imperative parent-child control. In a real app, a design system DatePicker component might expose only focus() and clear() to the parent form, hiding internal input refs and validation logic behind a clean imperative interface.',
    code: `const Input = forwardRef((props, ref) => {
  const innerRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => innerRef.current.focus(),
  }));
  return <input ref={innerRef} {...props} />;
});`,
    output: ['Customize ref handle exposed to parent'],
  },
  {
    id: 52,
    category: 'Hooks',
    question: 'What is useId?',
    answer: 'useId generates a stable, unique ID that is consistent between server and client renders, avoiding hydration mismatches that occur when IDs are created with Math.random() or incrementing counters. It is primarily intended for accessibility attributes like htmlFor, id, aria-labelledby, and aria-describedby that link labels to inputs. The generated IDs are unique within the component tree but are not meant to be used as keys in lists. In a real app, a reusable FormField component might call useId() to wire a label to its input, ensuring accessible forms work correctly with server-side rendering in Next.js or Remix.',
    code: `function Field({ label }) {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </>
  );
}`,
    output: ['Stable IDs for a11y — SSR-safe'],
  },
  {
    id: 53,
    category: 'Hooks',
    question: 'What is useTransition?',
    answer: 'useTransition lets you mark certain state updates as non-urgent transitions, so React can keep the UI responsive by prioritizing urgent updates like typing or clicking over expensive re-renders. It returns a boolean isPending flag and a startTransition function that wraps the lower-priority update. This is part of Concurrent React and works well when a state change triggers a slow render, such as filtering a large list or switching tabs with heavy content. In a real app, a tabbed dashboard might call startTransition when switching tabs so the tab highlight updates instantly while the heavy chart panel renders in the background without freezing the interface.',
    code: `const [isPending, startTransition] = useTransition();

function handleChange(e) {
  setInput(e.target.value); // urgent
  startTransition(() => setFilter(e.target.value)); // non-urgent
}`,
    output: ['Non-urgent updates — keeps UI responsive'],
  },
  {
    id: 54,
    category: 'Hooks',
    question: 'What is useDeferredValue?',
    answer: 'useDeferredValue takes a value and returns a deferred version that may lag behind during urgent updates, letting React finish high-priority work like keystrokes before applying the slower downstream render. It is similar in spirit to debouncing but integrated with React\'s scheduler rather than using a fixed timer delay. This keeps inputs feeling instant while expensive derived UI catches up shortly after. In a real app, a search box might store the raw query in state for immediate display while useDeferredValue feeds a filtered product list, so typing stays smooth even when filtering thousands of items on every character.',
    code: `const [query, setQuery] = useState("");
const deferredQuery = useDeferredValue(query);
const results = useMemo(() => filter(items, deferredQuery), [deferredQuery]);`,
    output: ['Lag behind urgent updates — smooth filtering'],
  },
  {
    id: 55,
    category: 'Hooks',
    question: 'What is useSyncExternalStore?',
    answer: 'useSyncExternalStore subscribes to an external data source outside React\'s state system — such as browser APIs, Redux, Zustand, or a custom event emitter — and reads a snapshot of its current value during render. React 18 introduced it to ensure consistent reads during concurrent rendering and to support server-side rendering with a separate getServerSnapshot function. This matters because external stores can update outside React\'s render cycle, and the hook provides a safe bridge that avoids tearing and hydration bugs. For example, a responsive layout hook might subscribe to window resize events and read window.innerWidth, returning 0 on the server via getServerSnapshot to match SSR output.',
    code: `const width = useSyncExternalStore(
  (cb) => { window.addEventListener("resize", cb); return () => window.removeEventListener("resize", cb); },
  () => window.innerWidth,
  () => 0 // server snapshot
);`,
    output: ['Subscribe to external stores — SSR-safe'],
  },
]
