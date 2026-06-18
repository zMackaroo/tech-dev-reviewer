import type { InterviewQuestion } from '../../types'

export const patternsQuestions: InterviewQuestion[] = [
  {
    id: 86,
    category: 'Patterns',
    question: 'What is a Higher-Order Component (HOC)?',
    answer: 'A Higher-Order Component (HOC) is a function that takes a component and returns a new component with extra behavior or props injected in. HOCs were popular for cross-cutting concerns like authentication, logging, and data fetching before hooks existed. They wrap the original component rather than modifying it directly, which keeps concerns separated but can create deep nesting and naming confusion in DevTools. Hooks have largely replaced HOCs for most use cases, but understanding them helps when reading older codebases. For example, withAuth(Dashboard) might check login state and either render Dashboard with a user prop or redirect to Login.',
    code: `function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const { user } = useAuth();
    if (!user) return <Login />;
    return <WrappedComponent {...props} user={user} />;
  };
}
const ProtectedDashboard = withAuth(Dashboard);`,
    output: ['Component wrapper pattern — hooks often replace this'],
  },
  {
    id: 87,
    category: 'Patterns',
    question: 'What is the render props pattern?',
    answer: 'The render props pattern passes a function as a prop (often named render or children) that the parent calls with shared state or data, and the caller returns the JSX to display. It inverts control so one component owns the logic while another decides how to render the result, similar to HOCs but often more explicit. This pattern shines when multiple consumers need the same behavior with different UI. In a real app, a DataFetcher component might fetch users and call render({ data, loading }) so one screen shows a table and another shows cards from the same logic.',
    code: `<MouseTracker render={({ x, y }) => (
  <p>Mouse: {x}, {y}</p>
)} />`,
    output: ['Share logic via function prop returning JSX'],
  },
  {
    id: 88,
    category: 'Patterns',
    question: 'What are compound components?',
    answer: 'Compound components are a set of related components that work together through implicit shared state, usually via React Context, while exposing a flexible compositional API. The parent manages state and coordination; children like Trigger and Content communicate without the consumer wiring props manually. This mirrors how native HTML works, where <select> and <option> cooperate without you passing IDs between them. It matters because it produces intuitive, readable JSX for complex widgets like tabs, accordions, and menus. For example, Radix or your own Accordion lets you nest Item, Trigger, and Content in any order while the parent tracks which section is open.',
    code: `<Accordion>
  <Accordion.Item value="1">
    <Accordion.Trigger>Section 1</Accordion.Trigger>
    <Accordion.Content>Content 1</Accordion.Content>
  </Accordion.Item>
</Accordion>`,
    output: ['Implicit shared state — flexible API'],
  },
  {
    id: 89,
    category: 'Patterns',
    question: 'What is forwardRef?',
    answer: 'forwardRef lets a functional component receive a ref from its parent and attach it to an internal DOM node or child component, because refs are not passed through like normal props. This is essential for reusable UI primitives where the parent needs direct DOM access for focus, measurement, or animation. Without forwardRef, a custom Input wrapper would break ref={inputRef} on the underlying element. In a real app, a design-system TextField built with forwardRef allows form libraries and parent components to call inputRef.current.focus() on mount or after validation errors.',
    code: `const Input = forwardRef(function Input(props, ref) {
  return <input ref={ref} {...props} />;
});

const ref = useRef();
<Input ref={ref} placeholder="Focus me" />`,
    demo: 'react-ref',
  },
  {
    id: 90,
    category: 'Patterns',
    question: 'What is an Error Boundary?',
    answer: 'An Error Boundary is a React component that catches JavaScript errors thrown during rendering, in lifecycle methods, or in child components, and displays a fallback UI instead of crashing the whole tree. Class components implement this with getDerivedStateFromError and componentDidCatch; the react-error-boundary library offers a simpler functional API. They do not catch errors in event handlers, async code, or during SSR, so those still need try/catch. This matters because one broken widget should not white-screen an entire dashboard. In a real app, wrapping each chart or third-party widget in an Error Boundary shows "Failed to load chart" while the rest of the page keeps working.',
    code: `class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    return this.state.hasError ? <h1>Something went wrong.</h1> : this.props.children;
  }
}`,
    output: ['Catch render errors — show fallback UI'],
  },
  {
    id: 91,
    category: 'Patterns',
    question: 'What is the container/presenter pattern with hooks?',
    answer: 'The container/presenter pattern originally split data-fetching container components from dumb presentational ones; with hooks, custom hooks like useUserData absorb the container logic while the component focuses purely on rendering. The component calls the hook, gets data and loading state, and renders UI accordingly, without wrapper components or prop drilling. This keeps separation of concerns while reducing boilerplate compared to the class-era approach. It matters because it scales well as features grow: logic stays testable in hooks and UI stays easy to read. For example, UserProfile might call useUserData(id) and render either a Card or Spinner based on what the hook returns.',
    code: `function useUserData(id) {
  const [user, setUser] = useState(null);
  useEffect(() => { fetchUser(id).then(setUser); }, [id]);
  return user;
}
function UserProfile({ id }) {
  const user = useUserData(id);
  return user ? <Card name={user.name} /> : <Spinner />;
}`,
    output: ['Custom hooks replace container components'],
  },
  {
    id: 92,
    category: 'Patterns',
    question: 'What is the slot pattern in React?',
    answer: 'The slot pattern composes layouts by accepting multiple named props (header, sidebar, footer) instead of relying on a single children prop, giving callers explicit places to inject content. This avoids prop explosion where one component takes dozens of boolean flags like showHeader or showSidebar. Named slots make layout APIs self-documenting and flexible for different page structures. In a real app, a DashboardLayout might accept header={<TopNav />}, sidebar={<NavMenu />}, and children for the main content area, so each route assembles its shell without duplicating markup.',
    code: `function Layout({ header, sidebar, children }) {
  return (
    <div className="layout">
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}`,
    output: ['Named composition slots for layouts'],
  },
  {
    id: 93,
    category: 'Patterns',
    question: 'What is inversion of control in React?',
    answer: 'Inversion of control in React means you declare what the UI should look like for a given state, and React decides when and how to update the DOM to match, rather than you imperatively manipulating elements. You hand control of rendering to the framework; headless libraries like Headless UI invert it again by giving you behavior and state while you supply the markup. Understanding this shift explains why React favors declarative JSX over manual DOM APIs. In a real app, you set open to true and React mounts the Modal; you do not call document.createElement or appendChild yourself.',
    code: `// React controls rendering
function App() {
  const [open, setOpen] = useState(false);
  return open ? <Modal onClose={() => setOpen(false)} /> : null;
}`,
    output: ['You describe UI; React updates DOM'],
  },
]
