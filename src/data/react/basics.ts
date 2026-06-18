import type { InterviewQuestion } from '../../types'

export const basicsQuestions: InterviewQuestion[] = [
  {
    id: 1,
    category: 'Fundamentals',
    question: 'What is React and why use it?',
    answer: 'React is a JavaScript library for building user interfaces using a component-based architecture, where each piece of UI is a reusable, self-contained unit. It uses a virtual DOM to diff changes efficiently, JSX for declarative markup, and a unidirectional data flow that makes state predictable.',
    code: `// React lets you describe UI as a function of state
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
// UI = f(state)`,
    output: ['UI = f(state)'],
  },
  {
    id: 2,
    category: 'Fundamentals',
    question: 'What is JSX?',
    answer: 'JSX is a syntax extension that lets you write HTML-like markup directly inside JavaScript, making UI code more readable than nested function calls. At build time, tools like Babel transpile JSX into React.createElement() calls that React can render. You can embed any JavaScript expression inside curly braces and must return a single root element or wrap siblings in a Fragment.',
    code: `const element = (
  <>
    <h1>Title</h1>
    <p>{2 + 2}</p>
  </>
);
// Transpiles to React.createElement calls`,
    output: ['Transpiles to React.createElement calls'],
  },
  {
    id: 3,
    category: 'Fundamentals',
    question: 'What is the Virtual DOM?',
    answer: 'The Virtual DOM is a lightweight in-memory JavaScript representation of the real DOM tree that React maintains between renders. When state changes, React builds a new virtual tree, compares it to the previous one through a process called reconciliation, and applies only the minimal set of changes to the actual DOM.',
    code: `// State change → new VDOM → diff → patch real DOM
setState(newValue);
// React only updates changed nodes, not the whole page`,
    output: ['React only updates changed nodes, not the whole page'],
  },
  {
    id: 4,
    category: 'Fundamentals',
    question: 'What is the difference between React and ReactDOM?',
    answer: 'React is the core library containing components, hooks, and the createElement API — it is platform-agnostic and defines how UI is described. ReactDOM is the browser-specific renderer that takes React elements and mounts them into the real DOM. This separation matters because the same React core can target different environments: React Native uses a different renderer for mobile, and React DOM Server renders HTML on the server.',
    code: `import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(<App />);`,
    output: ['createRoot → render → DOM updated'],
  },
  {
    id: 5,
    category: 'Fundamentals',
    question: 'What is a React component?',
    answer: 'A React component is a reusable piece of UI defined as either a function that returns JSX or a class extending React.Component. Components accept inputs called props and can manage internal state to determine what they render.',
    code: `function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

// Usage
<Button label="Save" onClick={() => alert("saved")} />`,
    output: ['Reusable, composable UI building blocks'],
  },
  {
    id: 6,
    category: 'Fundamentals',
    question: 'What are props in React?',
    answer: 'Props (short for properties) are read-only inputs passed from a parent component to a child, enabling data to flow down the component tree. They make components configurable and composable — the same component can render differently depending on what the parent passes in.',
    code: `function UserCard({ name, role }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <span>{role}</span>
    </div>
  );
}
<UserCard name="Alice" role="Admin" />`,
    output: ['Props flow down — read-only in child'],
  },
  {
    id: 7,
    category: 'Fundamentals',
    question: 'What is the difference between functional and class components?',
    answer: 'Functional components are plain JavaScript functions that return JSX and use hooks like useState and useEffect for state and side effects. Class components extend React.Component, use this.state for state, and rely on lifecycle methods like componentDidMount. Functional components are now the standard because they involve less boilerplate, are easier to read, and work better with React\'s modern optimization features.',
    code: `// Functional (modern)
function Counter() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}

// Class (legacy)
class Counter extends React.Component {
  state = { n: 0 };
  render() { return <button onClick={() => this.setState({ n: this.state.n + 1 })}>{this.state.n}</button>; }
}`,
    demo: 'react-state',
  },
  {
    id: 8,
    category: 'Fundamentals',
    question: 'What is one-way data flow in React?',
    answer: 'One-way data flow means data travels down the component tree via props, while events and updates travel back up through callback functions passed as props. The parent owns the state and passes both the current value and an onChange handler to children, keeping a single source of truth.',
    code: `function Parent() {
  const [text, setText] = useState("");
  return <Child value={text} onChange={setText} />;
}
function Child({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}`,
    demo: 'react-lifting-state',
  },
  {
    id: 9,
    category: 'Fundamentals',
    question: 'What is React.Fragment and why use it?',
    answer: 'React.Fragment lets you group multiple JSX elements as siblings without adding an extra DOM node like a wrapper div. The shorthand syntax is <>...</>, which produces the same result as an explicit <React.Fragment>.',
    code: `function List() {
  return (
    <>
      <li>One</li>
      <li>Two</li>
    </>
  );
}
// No extra <div> in the DOM`,
    output: ['No extra wrapper div in DOM'],
  },
  {
    id: 10,
    category: 'Fundamentals',
    question: 'What is the difference between element and component?',
    answer: 'A React element is a plain JavaScript object describing what to render — it has a type, props, and children, like { type: "h1", props: { children: "Hello" } }. A component is a function or class that returns elements when invoked by React. This distinction matters because elements are immutable snapshots of UI at a point in time, while components are reusable factories that produce new elements on each render.',
    code: `const element = <h1 className="title">Hello</h1>;
// { type: "h1", props: { className: "title", children: "Hello" } }

const Component = () => element;`,
    output: ['Elements describe UI; components produce elements'],
  },
  {
    id: 11,
    category: 'Fundamentals',
    question: 'What is conditional rendering in React?',
    answer: 'Conditional rendering means displaying different UI depending on a condition, using patterns like if/else before the return, ternary operators, logical AND (&&), or early returns. You cannot use if statements directly inside JSX curly braces — only expressions are allowed there.',
    code: `function Status({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <LogoutButton /> : <LoginButton />}
      {isLoggedIn && <Dashboard />}
    </div>
  );
}`,
    output: ['Ternary, &&, and early return are common patterns'],
  },
  {
    id: 12,
    category: 'Fundamentals',
    question: 'How do you render lists in React?',
    answer: 'You render lists by calling array.map() to transform each data item into a JSX element inside your component\'s return. Each element in the list must have a unique, stable key prop so React can track items efficiently during updates and reordering.',
    code: `const todos = [{ id: 1, text: "Learn React" }, { id: 2, text: "Build app" }];

function TodoList() {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`,
    demo: 'react-keys',
  },
  {
    id: 13,
    category: 'Fundamentals',
    question: 'What is the purpose of key prop?',
    answer: 'The key prop gives React a stable identity for each item in a list so it can determine which items were added, removed, or reordered during reconciliation. Without proper keys, React may reuse the wrong DOM nodes, causing lost input focus, stale state, or incorrect animations.',
    code: `// Good: stable unique id
items.map(item => <Row key={item.id} data={item} />)

// Bad: index as key when list reorders
items.map((item, i) => <Row key={i} data={item} />)`,
    demo: 'react-keys',
  },
  {
    id: 14,
    category: 'Fundamentals',
    question: 'What is CRA and what replaced it?',
    answer: 'Create React App (CRA) was the official zero-configuration tool for bootstrapping React projects with webpack, Babel, and a dev server out of the box. It has been deprecated because its build tooling became slow and hard to customize compared to modern alternatives.',
    code: `// Modern setup with Vite
npm create vite@latest my-app -- --template react-ts
cd my-app && npm install && npm run dev`,
    output: ['Vite, Next.js, and Remix are modern choices'],
  },
  {
    id: 15,
    category: 'Fundamentals',
    question: 'What is StrictMode in React?',
    answer: 'StrictMode is a development-only wrapper component that activates additional checks and warnings to help you write safer React code. It intentionally double-invokes certain functions like render, state updaters, and effects in development to surface side effects and impure logic.',
    code: `<StrictMode>
  <App />
</StrictMode>
// Effects run twice in dev to surface side-effect bugs`,
    output: ['Dev-only checks — effects may run twice'],
  },
]
