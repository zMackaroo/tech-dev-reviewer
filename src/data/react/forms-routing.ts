import type { InterviewQuestion } from '../../types'

export const formsRoutingQuestions: InterviewQuestion[] = [
  {
    id: 76,
    category: 'Forms & Routing',
    question: 'How do you handle forms in React?',
    answer: 'React forms typically use controlled components, where each input\'s value is stored in state and updated via onChange handlers. For simple forms, useState per field works well; for complex validation and many fields, libraries like React Hook Form or Formik reduce boilerplate and re-renders. Always call e.preventDefault() in onSubmit to stop the browser from doing a full page reload.',
    code: `function LoginForm() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}`,
    demo: 'react-lifting-state',
  },
  {
    id: 77,
    category: 'Forms & Routing',
    question: 'What is React Hook Form?',
    answer: 'React Hook Form is a performant library that registers inputs via refs instead of tying every keystroke to React state, which dramatically cuts down re-renders on large forms. It provides built-in validation, easy error handling, and integrates cleanly with schema libraries like Yup and Zod. You connect fields with register() and wrap submission with handleSubmit().',
    code: `const { register, handleSubmit, formState: { errors } } = useForm();

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register("email", { required: true })} />
  {errors.email && <span>Required</span>}
</form>`,
    output: ['Uncontrolled inputs — fewer re-renders'],
  },
  {
    id: 78,
    category: 'Forms & Routing',
    question: 'What is client-side routing?',
    answer: 'Client-side routing lets a single-page app change the URL and displayed view without requesting a new HTML document from the server. React Router listens for navigation events and renders the component that matches the current path, using the browser History API (pushState) to update the address bar. This gives users fast transitions and shareable URLs while keeping the app feeling like a native experience. It matters because SPAs need routing to feel like multi-page sites without sacrificing performance.',
    code: `import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>`,
    output: ['URL changes without full page reload'],
  },
  {
    id: 79,
    category: 'Forms & Routing',
    question: 'What is the difference between BrowserRouter and HashRouter?',
    answer: 'BrowserRouter produces clean URLs like /about by using the History API, but the server must be configured to serve index.html for all routes so direct links and refreshes work. HashRouter puts routes after a hash (#/about), which works on any static host without server rewrites because everything before the hash is ignored by the server. Clean URLs are better for SEO and professionalism, while hash routing is a quick fix for static deployments.',
    code: `// BrowserRouter — needs server fallback to index.html
<BrowserRouter>

// HashRouter — works on static hosts
<HashRouter>`,
    output: ['BrowserRouter: clean URLs; HashRouter: # paths'],
  },
  {
    id: 80,
    category: 'Forms & Routing',
    question: 'What are route parameters and query strings?',
    answer: 'Route parameters are dynamic segments baked into the path, such as /users/:id where :id becomes a variable you read with useParams(). Query strings are optional key-value pairs after ? in the URL, like ?page=2&sort=name, accessed via useSearchParams(). Params identify a specific resource; query strings filter, paginate, or configure the view. This distinction matters because mixing them up leads to broken links or lost filter state on refresh.',
    code: `// Route: /users/:id
const { id } = useParams();
const [searchParams] = useSearchParams();
const page = searchParams.get("page");`,
    output: ['useParams() for /:id; useSearchParams() for ?key=val'],
  },
  {
    id: 81,
    category: 'Forms & Routing',
    question: 'What is nested routing?',
    answer: 'Nested routing defines child routes inside a parent route, with the parent rendering an Outlet where the matched child appears. The parent layout (sidebar, nav, header) stays mounted while only the inner content swaps as the URL changes. This avoids duplicating shared chrome on every page and keeps navigation state stable. It matters for any app with a persistent shell around changing content, like dashboards or admin panels.',
    code: `<Route path="/dashboard" element={<Layout />}>
  <Route index element={<Overview />} />
  <Route path="settings" element={<Settings />} />
</Route>
// Layout renders <Outlet /> for child`,
    output: ['Outlet renders nested child routes'],
  },
  {
    id: 82,
    category: 'Forms & Routing',
    question: 'What is a protected route?',
    answer: 'A protected route is a wrapper component that checks whether the user is authenticated before rendering the requested page. If auth fails, it redirects to login (often with Navigate); if it passes, it renders the child route or component. This centralizes access control so you do not repeat auth checks on every sensitive page. It matters because exposing admin or account pages to anonymous users is a common security mistake.',
    code: `function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}`,
    output: ['Auth guard → redirect or render children'],
  },
  {
    id: 83,
    category: 'Forms & Routing',
    question: 'What is form validation in React?',
    answer: 'Form validation in React checks user input against rules before or during submission, typically on submit, on blur, or on change depending on UX needs. Manually, you inspect values in handlers and store error messages in state; with libraries, you define schemas in Zod or Yup and let React Hook Form apply them declaratively. Good validation prevents bad data from reaching your API and gives users immediate, actionable feedback.',
    code: `const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
const result = schema.safeParse(formData);`,
    output: ['Manual checks or schema libraries (Zod/Yup)'],
  },
  {
    id: 84,
    category: 'Forms & Routing',
    question: 'What is the Navigate component?',
    answer: 'Navigate is a React Router component that declaratively redirects the user to a new path when it renders, without returning visible UI itself. Use the replace prop when you do not want the redirect added to the browser history stack, so the back button skips it. Declarative redirects fit naturally in JSX alongside conditional rendering, unlike imperative navigate() calls.',
    code: `<Navigate to="/dashboard" replace />

// Conditional redirect
{!isAuthed && <Navigate to="/login" />}`,
    output: ['Declarative redirect in JSX'],
  },
  {
    id: 85,
    category: 'Forms & Routing',
    question: 'What is useNavigate hook?',
    answer: 'useNavigate returns a function for imperative, programmatic navigation when a redirect should happen in response to an event rather than during render. Call navigate("/path") to go somewhere, navigate(-1) to go back, or pass { replace: true } to swap the current history entry instead of pushing a new one. This is the right tool after form submits, logout, or successful API calls where JSX conditionals are awkward.',
    code: `const navigate = useNavigate();

const handleLogout = () => {
  clearSession();
  navigate("/login", { replace: true });
};`,
    output: ['Programmatic navigation after actions'],
  },
]
