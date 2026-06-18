import type { InterviewQuestion } from '../../types'

export const contextQuestions: InterviewQuestion[] = [
  {
    id: 56,
    category: 'Context & Data',
    question: 'What is the Context API?',
    answer: 'The Context API provides a way to pass data through the component tree without manually threading props through every intermediate component, a problem often called prop drilling. You create a context with createContext, supply a value via a Provider wrapper, and consume it in any descendant with useContext. It works best for data that many components need at different depths, such as theme, locale, authentication status, or feature flags.',
    code: `const AuthContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Dashboard />
    </AuthContext.Provider>
  );
}`,
    demo: 'react-context',
  },
  {
    id: 57,
    category: 'Context & Data',
    question: 'When should you NOT use Context?',
    answer: 'Avoid Context for data that changes frequently, such as keystrokes in a search field or mouse position, because every context change re-renders all consuming components in the subtree. It is also a poor fit for state that only two or three nearby components need — local state or composition is simpler and more performant. Context should not be treated as a full replacement for dedicated state managers in large apps with complex update patterns and middleware needs.',
    code: `// Bad: entire tree re-renders on every keystroke
<SearchContext.Provider value={searchQuery}>

// Better: colocate or use state manager with selectors`,
    output: ['Avoid frequent updates — causes broad re-renders'],
  },
  {
    id: 58,
    category: 'Context & Data',
    question: 'How do you optimize Context performance?',
    answer: 'Split contexts by concern so consumers only subscribe to the data they actually need — for example, separate ThemeContext from UserContext instead of one giant AppContext. Memoize the Provider value with useMemo to avoid creating a new object reference on every parent render, which would trigger re-renders even when the underlying data has not changed. You can also split state and dispatch into separate contexts, or use selector libraries like use-context-selector to subscribe to slices of context.',
    code: `const value = useMemo(() => ({ user, theme }), [user, theme]);
return <AppContext.Provider value={value}>{children}</AppContext.Provider>;`,
    demo: 'react-context',
  },
  {
    id: 59,
    category: 'Context & Data',
    question: 'What is Redux and when is it needed?',
    answer: 'Redux is a predictable state container that holds application state in a single store, with changes made through dispatched actions processed by pure reducer functions. It shines when you have complex global state shared across many features, need time-travel debugging, or want a strict unidirectional data flow enforced by conventions. For small apps with simple shared state, Context or Zustand is often enough and involves far less boilerplate.',
    code: `// Redux Toolkit (modern)
const slice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: { increment: (state) => { state.value += 1; } },
});`,
    demo: 'react-reducer',
  },
  {
    id: 60,
    category: 'Context & Data',
    question: 'What is Redux Toolkit (RTK)?',
    answer: 'Redux Toolkit is the official, recommended way to write Redux logic today, bundling best practices into a smaller API with less boilerplate than classic Redux. It provides createSlice to define reducers and auto-generate action creators, configureStore for sensible defaults, createAsyncThunk for async logic, and RTK Query for data fetching and caching. Immer is built in, so you can write seemingly mutating reducer code that is actually immutable under the hood.',
    code: `const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    add: (state, action) => { state.push(action.payload); },
  },
});
export const { add } = todosSlice.actions;`,
    output: ['createSlice, configureStore, RTK Query'],
  },
  {
    id: 61,
    category: 'Context & Data',
    question: 'What is Zustand vs Redux?',
    answer: 'Zustand offers a minimal, hook-based API with no Provider wrapper required — you create a store and call useStore() directly in any component. Redux enforces stricter patterns with actions, reducers, and a single store, plus a mature ecosystem of devtools, middleware, and team conventions. Zustand tends to win on simplicity and speed of development for small to medium apps, while Redux fits larger teams that benefit from standardized architecture and extensive debugging tooling.',
    code: `// Zustand
const useStore = create((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
}));`,
    demo: 'react-state',
  },
  {
    id: 62,
    category: 'Context & Data',
    question: 'What is React Query (TanStack Query)?',
    answer: 'TanStack Query (formerly React Query) is a library for fetching, caching, synchronizing, and updating server state in React applications. It handles loading and error states, background refetching, request deduplication, stale-while-revalidate caching, and cache invalidation after mutations — concerns that useState and useEffect alone handle poorly at scale. It is designed for async data from APIs, not for local UI state like modal open/closed or form field values.',
    code: `const { data, isLoading, error } = useQuery({
  queryKey: ["users", id],
  queryFn: () => fetchUser(id),
});`,
    output: ['Server state: cache, refetch, dedupe'],
  },
  {
    id: 63,
    category: 'Context & Data',
    question: 'What is the difference between client and server state?',
    answer: 'Client state lives entirely in the browser and describes UI concerns — modal visibility, form inputs, selected tab, sidebar collapsed — typically managed with useState, Context, or Zustand. Server state originates from APIs or databases, is asynchronous, may be shared across users, and can become stale as the backend changes over time. Treating server data like simple local state leads to duplicated fetch logic, missing loading states, and no cache invalidation strategy.',
    code: `// Client state
const [isOpen, setIsOpen] = useState(false);

// Server state
const { data: posts } = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });`,
    output: ['Client: UI state; Server: async cached data'],
  },
  {
    id: 64,
    category: 'Context & Data',
    question: 'What is SWR?',
    answer: 'SWR (Stale-While-Revalidate) is a data fetching library from Vercel that returns cached data immediately while revalidating against the server in the background. Its API centers on the useSWR hook with a key and fetcher function, and it handles deduplication, focus revalidation, and error retry with minimal configuration. It solves similar problems to TanStack Query but with a lighter, more opinionated API that many teams find faster to adopt.',
    code: `const { data, error, isLoading } = useSWR("/api/user", fetcher);
// Shows cached data instantly, refetches in background`,
    output: ['Stale-while-revalidate caching strategy'],
  },
  {
    id: 65,
    category: 'Context & Data',
    question: 'What is prop drilling vs global state?',
    answer: 'Prop drilling is passing data through many intermediate components that do not use the data themselves, just to reach a deeply nested child that needs it. Global state solutions like Context, Redux, or Zustand make data accessible anywhere in the tree without intermediate components knowing about it. The right choice depends on scope — local props for parent-child communication, Context for a shared subtree, and dedicated stores or query libraries for app-wide or server-backed data.',
    code: `// Local: 2 components → props
// Shared subtree → Context
// App-wide complex → Redux/Zustand
// Server data → React Query`,
    demo: 'react-context',
  },
]
