import type { InterviewQuestion } from '../../types'

export const componentsQuestions: InterviewQuestion[] = [
  {
    id: 16,
    category: 'Components',
    question: 'What are children props?',
    answer: 'The children prop is a special prop that holds whatever JSX is nested between a component\'s opening and closing tags. It enables flexible composition patterns where a wrapper component defines structure while the caller decides the inner content.',
    code: `function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="body">{children}</div>
    </div>
  );
}
<Card title="Profile"><p>Content here</p></Card>`,
    output: ['children = nested JSX between tags'],
  },
  {
    id: 17,
    category: 'Components',
    question: 'What is prop drilling and how to avoid it?',
    answer: 'Prop drilling occurs when you pass props through many intermediate components that do not need the data themselves, just to reach a deeply nested child. It leads to verbose, brittle code where unrelated components become coupled to props they never use.',
    code: `// Drilling: App → Layout → Sidebar → UserMenu → Avatar
// Fix: Context or colocate state closer to consumers
const UserContext = createContext(null);
function App() {
  return (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  );
}`,
    demo: 'react-context',
  },
  {
    id: 18,
    category: 'Components',
    question: 'What are default props?',
    answer: 'Default props provide fallback values when a parent does not pass a particular prop, ensuring components behave predictably even with missing inputs. In modern functional components, you set defaults using JavaScript default parameter syntax in the function signature.',
    code: `function Button({ label = "Click me", variant = "primary" }) {
  return <button className={variant}>{label}</button>;
}
<Button />           // label="Click me"
<Button label="Go" /> // label="Go"`,
    output: ['Default params replace defaultProps for functions'],
  },
  {
    id: 19,
    category: 'Components',
    question: 'What is component composition vs inheritance?',
    answer: 'React favors composition — building complex UIs by nesting components and passing children or render props — over class inheritance hierarchies. Instead of extending a base Button class for every variant, you compose behavior through props, children, and smaller specialized components.',
    code: `function Dialog({ title, children, actions }) {
  return (
    <div className="dialog">
      <header>{title}</header>
      <main>{children}</main>
      <footer>{actions}</footer>
    </div>
  );
}`,
    output: ['Compose with children and slots, not extends'],
  },
  {
    id: 20,
    category: 'Components',
    question: 'What is a controlled vs uncontrolled component?',
    answer: 'A controlled component has its form value driven by React state — you set value and handle onChange so React is the single source of truth. An uncontrolled component lets the DOM hold the value internally, and you read it via a ref when needed, typically using defaultValue instead of value. Controlled components matter when you need live validation, formatting, disabling submit until valid, or syncing multiple inputs.',
    code: `// Controlled
const [email, setEmail] = useState("");
<input value={email} onChange={e => setEmail(e.target.value)} />

// Uncontrolled
const ref = useRef(null);
<input ref={ref} defaultValue="" />
// ref.current.value to read`,
    demo: 'react-lifting-state',
  },
  {
    id: 21,
    category: 'Components',
    question: 'What is the purpose of React.PureComponent?',
    answer: 'React.PureComponent is a class component base that implements shouldComponentUpdate with a shallow comparison of props and state, skipping re-renders when neither has changed by reference. The modern equivalent for functional components is React.memo, which wraps a component and performs the same shallow prop comparison.',
    code: `const ExpensiveList = React.memo(function List({ items }) {
  return items.map(i => <li key={i.id}>{i.name}</li>);
});
// Re-renders only when items reference changes`,
    demo: 'react-memo',
  },
  {
    id: 22,
    category: 'Components',
    question: 'What are presentational vs container components?',
    answer: 'Presentational components focus on how things look — they receive data via props and render UI without fetching data or managing global state. Container components (or components using data hooks) focus on how things work — they fetch data, manage state, and pass results to presentational children. This separation matters because it keeps UI components reusable, testable, and free of data-fetching logic.',
    code: `// Presentational
function UserList({ users, onSelect }) {
  return users.map(u => <button key={u.id} onClick={() => onSelect(u)}>{u.name}</button>);
}
// Container (with hook)
function UserContainer() {
  const users = useFetch("/api/users");
  return <UserList users={users} onSelect={console.log} />;
}`,
    output: ['Separate UI from data logic — hooks blur the line'],
  },
  {
    id: 23,
    category: 'Components',
    question: 'What is lifting state up?',
    answer: 'Lifting state up means moving shared state from child components to their closest common parent so both children can access it via props. The parent becomes the owner of the state and passes down both the value and update callbacks to each child.',
    code: `function Converter() {
  const [fahrenheit, setFahrenheit] = useState("");
  const celsius = fahrenheit ? ((fahrenheit - 32) * 5/9).toFixed(1) : "";
  return (
    <>
      <FahrenheitInput value={fahrenheit} onChange={setFahrenheit} />
      <CelsiusDisplay value={celsius} />
    </>
  );
}`,
    demo: 'react-lifting-state',
  },
  {
    id: 24,
    category: 'Components',
    question: 'What is the difference between state and props?',
    answer: 'Props are external inputs passed from a parent component — they are read-only and define how a component is configured from outside. State is internal data owned by the component itself, updated via setState or a setter from useState, and changes to state trigger a re-render. This distinction matters because it clarifies ownership: parents control props, while the component controls its own state.',
    code: `function Counter({ initial = 0 }) {  // prop — read-only
  const [count, setCount] = useState(initial); // state — internal
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`,
    demo: 'react-state',
  },
  {
    id: 25,
    category: 'Components',
    question: 'What are synthetic events in React?',
    answer: 'Synthetic events are React\'s cross-browser wrapper around native DOM events, providing a consistent API regardless of browser differences. React attaches a single event listener at the root and delegates events down, rather than attaching handlers to every individual element.',
    code: `function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };
  return <form onSubmit={handleSubmit}><button type="submit">Go</button></form>;
}`,
    output: ['Cross-browser wrapper around native events'],
  },
  {
    id: 26,
    category: 'Components',
    question: 'What is dangerouslySetInnerHTML?',
    answer: 'dangerouslySetInnerHTML is React\'s escape hatch for setting raw HTML inside an element, equivalent to the DOM\'s innerHTML property — you pass an object like { __html: htmlString }. It is named "dangerous" because inserting unsanitized user content can lead to cross-site scripting (XSS) attacks.',
    code: `const html = DOMPurify.sanitize(userContent);
<div dangerouslySetInnerHTML={{ __html: html }} />

// Never:
// <div dangerouslySetInnerHTML={{ __html: userInput }} />`,
    output: ['Only with sanitized/trusted HTML — XSS risk'],
  },
  {
    id: 27,
    category: 'Components',
    question: 'What is a Portal in React?',
    answer: 'A Portal lets you render a component\'s children into a DOM node that exists outside the parent component\'s DOM hierarchy, using createPortal from react-dom. Even though the DOM node is elsewhere, the component still behaves as a child in the React tree — context, events, and state all work normally.',
    code: `import { createPortal } from "react-dom";

function Modal({ children }) {
  return createPortal(
    <div className="modal">{children}</div>,
    document.getElementById("modal-root")
  );
}`,
    output: ['Render outside parent DOM — modals, tooltips'],
  },
]
