import type { InterviewQuestion } from '../../types'

export const componentsQuestions: InterviewQuestion[] = [
  {
    id: 16,
    category: 'Components',
    question: 'What are children props?',
    answer: 'The children prop is a special prop that holds whatever JSX is nested between a component\'s opening and closing tags. It enables flexible composition patterns where a wrapper component defines structure while the caller decides the inner content. This matters because it lets you build reusable layout and container components without hardcoding their contents. For example, a Card component might render a title prop and place children in the body slot for any content — text, forms, or other components. In a real app, a Modal component uses children to display different dialogs (confirm delete, edit profile) while sharing the same overlay and close behavior.',
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
    answer: 'Prop drilling occurs when you pass props through many intermediate components that do not need the data themselves, just to reach a deeply nested child. It leads to verbose, brittle code where unrelated components become coupled to props they never use. This matters as apps grow — a user object passed through five layers is hard to refactor and creates maintenance overhead. For example, passing theme or auth data from App down through Layout, Sidebar, and Nav just to reach Avatar is classic drilling. In a real app, you can avoid it with Context API for shared global values, component composition to colocate consumers, or state libraries like Zustand for complex shared state.',
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
    answer: 'Default props provide fallback values when a parent does not pass a particular prop, ensuring components behave predictably even with missing inputs. In modern functional components, you set defaults using JavaScript default parameter syntax in the function signature. This matters because it reduces defensive checks inside components and makes the API self-documenting. For example, a Button with label = "Click me" renders a sensible default without requiring every caller to pass a label. In a real app, an Icon component might default size to 24 and color to "currentColor" so most usages need only the icon name prop.',
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
    answer: 'React favors composition — building complex UIs by nesting components and passing children or render props — over class inheritance hierarchies. Instead of extending a base Button class for every variant, you compose behavior through props, children, and smaller specialized components. This matters because inheritance creates tight coupling and deep hierarchies that are hard to change, while composition keeps components flexible and independent. For example, a Dialog component accepts title, children, and actions props to assemble a modal from slots rather than subclassing BaseDialog. In a real app, a design system might offer a flexible Stack layout that composes any child components rather than forcing them to extend a shared base class.',
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
    answer: 'A controlled component has its form value driven by React state — you set value and handle onChange so React is the single source of truth. An uncontrolled component lets the DOM hold the value internally, and you read it via a ref when needed, typically using defaultValue instead of value. Controlled components matter when you need live validation, formatting, disabling submit until valid, or syncing multiple inputs. For example, a controlled email input can show an error message as the user types because React knows the current value on every keystroke. In a real app, a multi-step checkout form is usually fully controlled so you can validate, persist draft state, and conditionally show fields based on prior answers.',
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
    answer: 'React.PureComponent is a class component base that implements shouldComponentUpdate with a shallow comparison of props and state, skipping re-renders when neither has changed by reference. The modern equivalent for functional components is React.memo, which wraps a component and performs the same shallow prop comparison. This matters for performance when a parent re-renders frequently but passes the same props to expensive child components. For example, memoizing a list of 500 rows prevents re-rendering every row when unrelated parent state changes. In a real app, you might wrap a heavy Chart or DataGrid in React.memo and stabilize callback props with useCallback to avoid unnecessary redraws.',
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
    answer: 'Presentational components focus on how things look — they receive data via props and render UI without fetching data or managing global state. Container components (or components using data hooks) focus on how things work — they fetch data, manage state, and pass results to presentational children. This separation matters because it keeps UI components reusable, testable, and free of data-fetching logic. For example, a UserList presentational component just maps over users and renders buttons, while a UserContainer fetches from /api/users and handles loading errors. In a real app, hooks like useFetch often blur this line since a single component can call hooks and render UI, but the conceptual split still helps organize larger codebases.',
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
    answer: 'Lifting state up means moving shared state from child components to their closest common parent so both children can access it via props. The parent becomes the owner of the state and passes down both the value and update callbacks to each child. This matters when two or more siblings need to stay in sync — without a shared parent, they would hold duplicate, conflicting state. For example, a temperature converter lifts fahrenheit state to the parent so both the input field and the celsius display always reflect the same value. In a real app, a filter bar and a product grid might share search query state in a parent page component so filtering updates the grid immediately.',
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
    answer: 'Props are external inputs passed from a parent component — they are read-only and define how a component is configured from outside. State is internal data owned by the component itself, updated via setState or a setter from useState, and changes to state trigger a re-render. This distinction matters because it clarifies ownership: parents control props, while the component controls its own state. For example, a Counter might receive initial={0} as a prop but manage count in state as the user clicks. In a real app, a CommentForm receives postId as a prop (which post to comment on) but keeps the draft text in local state until the user submits.',
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
    answer: 'Synthetic events are React\'s cross-browser wrapper around native DOM events, providing a consistent API regardless of browser differences. React attaches a single event listener at the root and delegates events down, rather than attaching handlers to every individual element. This matters because you can use the same event handler patterns everywhere without worrying about IE vs Chrome quirks. For example, e.preventDefault() on a synthetic submit event works reliably across browsers to stop form reload. In a real app, a click handler on a nested button inside a card still receives a synthetic event with stopPropagation to prevent the card\'s onClick from firing too.',
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
    answer: 'dangerouslySetInnerHTML is React\'s escape hatch for setting raw HTML inside an element, equivalent to the DOM\'s innerHTML property — you pass an object like { __html: htmlString }. It is named "dangerous" because inserting unsanitized user content can lead to cross-site scripting (XSS) attacks. This matters whenever you render rich text from external sources like CMS content, markdown, or user-generated HTML. For example, you should always run user content through a sanitizer like DOMPurify before passing it to dangerouslySetInnerHTML. In a real app, a blog platform might use it to render formatted article bodies from a CMS while never passing raw user input directly.',
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
    answer: 'A Portal lets you render a component\'s children into a DOM node that exists outside the parent component\'s DOM hierarchy, using createPortal from react-dom. Even though the DOM node is elsewhere, the component still behaves as a child in the React tree — context, events, and state all work normally. This matters for UI elements that need to break out of overflow:hidden containers or z-index stacking contexts. For example, a dropdown menu portaled to document.body escapes a sidebar with overflow:hidden that would otherwise clip it. In a real app, modals, tooltips, and toast notifications almost always use portals to render at the top level of the DOM while staying logically nested in your component tree.',
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
