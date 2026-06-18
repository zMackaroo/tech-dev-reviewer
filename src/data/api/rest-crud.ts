import type { InterviewQuestion } from '../../types'

export const restCrudQuestions: InterviewQuestion[] = [
  {
    id: 21,
    category: 'CRUD Operations',
    question: 'How do you fetch a list of resources with the Fetch API?',
    answer: 'Call fetch with the collection URL, await the Response, check res.ok or res.status, then parse JSON with res.json(). GET is the default method and requires no body. Handle network errors separately from HTTP error statuses because fetch only rejects on network failure, not 404 or 500. For example, const res = await fetch("/api/todos") followed by const todos = await res.json() loads all todos. In a real app, a React component calls this in useEffect or a data library like TanStack Query wraps it with caching and refetch logic.',
    code: `async function fetchTodos() {
  const res = await fetch('/api/todos');
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json() as Promise<{ id: string; title: string; done: boolean }[]>;
}

const todos = await fetchTodos();`,
  },
  {
    id: 22,
    category: 'CRUD Operations',
    question: 'How do you create a resource with fetch and JSON?',
    answer: 'Use method POST, set Content-Type to application/json, and pass JSON.stringify(payload) as the body. Read the response status—201 Created often includes the new resource and a Location header. Validate the response before assuming success because fetch resolves even on 4xx errors. For example, POST /api/tasks with { title: "Ship feature" } returns the created task with a server-generated id. In a real app, the form submit handler disables the button, posts the payload, then appends the returned item to local state or invalidates a query cache.',
    code: `async function createTask(title: string) {
  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error('Create failed');
  return res.json();
}`,
  },
  {
    id: 23,
    category: 'CRUD Operations',
    question: 'How do you update a resource with PATCH using fetch?',
    answer: 'Send PATCH to the resource URL with only the fields you want to change in the JSON body. Include Content-Type and any auth headers required by the API. Prefer PATCH over PUT when the client does not have the full resource representation. For example, PATCH /api/users/me with { theme: "dark" } updates just the theme field. In a real app, a settings toggle optimistically updates the UI, sends PATCH, and rolls back if the server returns 422 validation errors.',
    code: `async function updateTheme(theme: 'light' | 'dark') {
  const res = await fetch('/api/users/me', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: \`Bearer \${token}\`,
    },
    body: JSON.stringify({ theme }),
  });
  return res.json();
}`,
  },
  {
    id: 24,
    category: 'CRUD Operations',
    question: 'How do you delete a resource with fetch?',
    answer: 'Call fetch with method DELETE on the resource URL. A successful delete often returns 204 No Content with an empty body, so check status instead of always calling res.json(). Include authentication headers when the endpoint is protected. For example, DELETE /api/comments/55 removes comment 55 permanently or soft-deletes depending on API design. In a real app, the UI removes the item from the list immediately on success and shows undo if the API supports soft delete with a grace period.',
    code: `async function deleteComment(id: string) {
  const res = await fetch(\`/api/comments/\${id}\`, {
    method: 'DELETE',
    headers: { Authorization: \`Bearer \${token}\` },
  });
  if (res.status === 204) return;
  if (!res.ok) throw new Error('Delete failed');
  return res.json();
}`,
  },
  {
    id: 25,
    category: 'CRUD Operations',
    question: 'What are the advantages of using Axios over fetch?',
    answer: 'Axios automatically transforms JSON request and response bodies, throws on non-2xx status codes by default, supports request and response interceptors for auth tokens and global error handling, and can cancel requests with AbortController integration. It also works consistently in Node and browsers with optional timeout configuration. For example, axios.get("/api/users") returns parsed data in response.data without manual res.json(). In a real app, an interceptor attaches the refresh token flow so every 401 triggers one coordinated retry instead of duplicating logic in each API module.',
    code: `import axios from 'axios';

const api = axios.create({ baseURL: '/api', timeout: 10000 });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

const { data: users } = await api.get('/users');`,
  },
  {
    id: 26,
    category: 'CRUD Operations',
    question: 'How do you pass query parameters for filtering with fetch?',
    answer: 'Build a URL with URLSearchParams or template strings to append filter keys to the query string on GET requests. Encode values properly so spaces and special characters do not break the URL. The server parses query params and applies filters against the database or search index. For example, GET /api/products?category=shoes&inStock=true&minPrice=50 returns filtered products. In a real app, filter UI state syncs to the URL search params so users can bookmark and share filtered views.',
    code: `const params = new URLSearchParams({
  category: 'shoes',
  inStock: 'true',
  minPrice: '50',
});

const res = await fetch(\`/api/products?\${params}\`);
const products = await res.json();`,
  },
  {
    id: 27,
    category: 'CRUD Operations',
    question: 'How do you implement sorting in REST API requests from the client?',
    answer: 'Pass sort field and direction as query parameters agreed with the API contract, such as sort=createdAt or sort=-price for descending price. Some APIs use separate order=asc|desc parameters or multi-field sort like sort=name,createdAt. The client rebuilds the URL when the user clicks column headers in a table. For example, GET /api/orders?sort=-createdAt lists newest orders first. In a real app, the datagrid stores sort state in React and refetches when sort changes, showing a loading skeleton during the request.',
    code: `function buildOrdersUrl(sortField: string, direction: 'asc' | 'desc') {
  const prefix = direction === 'desc' ? '-' : '';
  return \`/api/orders?sort=\${prefix}\${sortField}\`;
}

const res = await fetch(buildOrdersUrl('createdAt', 'desc'));`,
  },
  {
    id: 28,
    category: 'CRUD Operations',
    question: 'How do you handle pagination on the client side?',
    answer: 'Track current page or cursor in component state, request the next slice with page/limit or cursor query params, and merge or replace results depending on UX (table page vs infinite scroll). Read pagination metadata from the response to enable next/prev buttons and total page counts. For example, page=3&limit=20 fetches items 41–60 when the API uses offset pagination. In a real app, TanStack Query useInfiniteQuery manages cursor pages and deduplicates overlapping fetches during fast scrolling.',
    code: `async function fetchPage(page: number, limit = 20) {
  const res = await fetch(\`/api/items?page=\${page}&limit=\${limit}\`);
  const { data, meta } = await res.json();
  return { data, hasNext: meta.page < meta.totalPages };
}

const [page, setPage] = useState(1);
const { data, hasNext } = await fetchPage(page);`,
  },
  {
    id: 29,
    category: 'CRUD Operations',
    question: 'What is optimistic updating and when should you use it?',
    answer: 'Optimistic updating applies the expected result to the UI immediately before the server confirms, then rolls back or reconciles if the request fails. It makes apps feel instant for toggles, likes, and reordering where success is likely and failure is recoverable. Pair it with error toasts and rollback logic to avoid lying to the user for long periods. For example, checking a todo box updates local state instantly while PATCH runs in the background. In a real app, React Query useMutation onMutate snapshots prior cache data and restores it onError if the API rejects the change.',
    code: `// Optimistic toggle
setTodos((prev) =>
  prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
);

try {
  await fetch(\`/api/todos/\${id}\`, {
    method: 'PATCH',
    body: JSON.stringify({ done: true }),
    headers: { 'Content-Type': 'application/json' },
  });
} catch {
  setTodos(previousSnapshot); // rollback
}`,
  },
  {
    id: 30,
    category: 'CRUD Operations',
    question: 'How should you handle API loading states in the UI?',
    answer: 'Track isLoading separately from isFetching if your library distinguishes initial load from background refresh. Show skeletons or spinners on first load, subtle indicators on refetch, and disable submit buttons during mutations to prevent double submission. Avoid blank screens by keeping stale data visible while revalidating when possible (stale-while-revalidate). For example, isLoading shows a skeleton table while isFetching shows a small top progress bar. In a real app, a dashboard displays cached metrics immediately and dims values only while a silent refetch updates them.',
    code: `const { data, isLoading, isFetching, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});

if (isLoading) return <TableSkeleton />;
if (error) return <ErrorBanner error={error} />;

return (
  <>
    {isFetching && <TopProgressBar />}
    <UserTable users={data} />
  </>
);`,
  },
  {
    id: 31,
    category: 'CRUD Operations',
    question: 'How do you handle API errors gracefully on the client?',
    answer: 'Distinguish network errors, HTTP errors, and validation errors—parse error bodies when the API returns structured JSON with field messages. Surface user-friendly messages in the UI while logging technical details for developers. Retry only idempotent reads or requests with idempotency keys, not blindly on every failure. For example, 422 responses map to inline form errors while 500 shows a generic retry banner. In a real app, a centralized handleApiError function normalizes Axios and fetch errors into one shape the toast and form components consume.',
    code: `async function safeFetch<T>(url: string, init?: RequestInit): Promise<T> {
  try {
    const res = await fetch(url, init);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw { status: res.status, ...body };
    }
    return res.json();
  } catch (err) {
    if (err instanceof TypeError) throw { status: 0, message: 'Network error' };
    throw err;
  }
}`,
  },
  {
    id: 32,
    category: 'CRUD Operations',
    question: 'How do you cancel in-flight fetch requests?',
    answer: 'Pass an AbortSignal from AbortController to fetch via the signal option, then call controller.abort() when the component unmounts or when a new search supersedes the old one. Aborted fetches reject with DOMException named AbortError, which you should catch and ignore intentionally. This prevents race conditions where a slow stale response overwrites newer results. For example, typing in search aborts the previous query before starting the next. In a real app, useEffect cleanup calls abort() so navigating away mid-request does not setState on an unmounted component.',
    code: `useEffect(() => {
  const controller = new AbortController();

  fetch(\`/api/search?q=\${query}\`, { signal: controller.signal })
    .then((r) => r.json())
    .then(setResults)
    .catch((err) => {
      if (err.name !== 'AbortError') setError(err);
    });

  return () => controller.abort();
}, [query]);`,
  },
  {
    id: 33,
    category: 'CRUD Operations',
    question: 'How do you upload files with fetch in a CRUD workflow?',
    answer: 'Use POST or PUT with FormData as the body and omit Content-Type so the browser sets multipart/form-data with the correct boundary. Append file blobs and metadata fields to FormData before sending. For large files, consider chunked uploads or presigned S3 URLs instead of posting megabytes through your API server. For example, formData.append("avatar", file) with POST /api/users/me/avatar updates the profile picture. In a real app, show upload progress with XMLHttpRequest or axios onUploadProgress because fetch progress support is limited in some environments.',
    code: `async function uploadAvatar(file: File) {
  const form = new FormData();
  form.append('avatar', file);

  const res = await fetch('/api/users/me/avatar', {
    method: 'POST',
    headers: { Authorization: \`Bearer \${token}\` },
    body: form, // do not set Content-Type manually
  });
  return res.json();
}`,
  },
  {
    id: 34,
    category: 'CRUD Operations',
    question: 'What is the difference between client-side and server-side validation?',
    answer: 'Client-side validation gives instant feedback and better UX but can be bypassed, so it is never sufficient for security or data integrity. Server-side validation is authoritative and must enforce business rules, authorization, and uniqueness constraints before persisting data. Good APIs return 422 with field errors that the client displays inline. For example, the client checks email format before submit, but the server rejects duplicate emails with 409 Conflict. In a real app, Zod schemas validate on the client for speed and the same rules run on the server in the Route Handler for trust.',
    code: `// Client — instant UX
const schema = z.object({ email: z.string().email(), age: z.number().min(18) });

// Server — authoritative (must always run)
export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return Response.json({ fields: parsed.error.flatten() }, { status: 422 });
  // save to database...
}`,
  },
  {
    id: 35,
    category: 'CRUD Operations',
    question: 'How do you read a single resource by ID with proper error handling?',
    answer: 'Request GET /resource/:id, handle 404 as a distinct user-facing state (not found page), and handle 403 when the user lacks access to that specific record. Type the response so downstream components know the expected shape. For example, GET /api/invoices/999 returns 404 when the id does not exist or belongs to another tenant filtered out as 404 for privacy. In a real app, Next.js dynamic routes call the API in a Server Component and call notFound() when the API returns 404.',
    code: `async function fetchInvoice(id: string) {
  const res = await fetch(\`/api/invoices/\${id}\`, {
    headers: { Authorization: \`Bearer \${token}\` },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(\`Failed: \${res.status}\`);
  return res.json();
}`,
  },
  {
    id: 36,
    category: 'CRUD Operations',
    question: 'How do you batch multiple CRUD reads efficiently?',
    answer: 'Prefer a dedicated batch endpoint or parallel Promise.all when the API lacks batch support, but respect rate limits and connection caps. GraphQL and some REST APIs offer POST /batch or ?ids=1,2,3 to reduce round trips. Deduplicate ids and cache individual results when the same entity appears in multiple views. For example, Promise.all(ids.map(id => fetch(`/api/users/${id}`))) loads ten users in parallel. In a real app, a DataLoader on the server batches N+1 user lookups into one SQL IN query while the client uses a normalized cache keyed by id.',
    code: `const ids = ['u1', 'u2', 'u3'];

// Parallel REST reads
const users = await Promise.all(
  ids.map((id) => fetch(\`/api/users/\${id}\`).then((r) => r.json()))
);

// Or dedicated batch endpoint
const batch = await fetch('/api/users/batch', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ids }),
}).then((r) => r.json());`,
  },
  {
    id: 37,
    category: 'CRUD Operations',
    question: 'How do you implement debounced search against a REST API?',
    answer: 'Debounce user input so you only fire a request after typing pauses, reducing load and avoiding race conditions from every keystroke. Combine debounce with AbortController to cancel superseded searches. Reset results or show a searching indicator while waiting. For example, 300ms after the user stops typing, fetch /api/search?q=react. In a real app, lodash debounce or a custom useDebouncedValue hook drives the query key in TanStack Query so the library handles caching per search term.',
    code: `function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

const debouncedQuery = useDebouncedValue(searchInput);
const { data } = useQuery({
  queryKey: ['search', debouncedQuery],
  queryFn: () => fetch(\`/api/search?q=\${debouncedQuery}\`).then((r) => r.json()),
  enabled: debouncedQuery.length > 2,
});`,
  },
  {
    id: 38,
    category: 'CRUD Operations',
    question: 'What is cache invalidation after a mutation?',
    answer: 'After create, update, or delete, refresh or invalidate cached queries so the UI reflects server truth without a full page reload. Strategies include refetching affected query keys, optimistically updating cache entries, or using mutation response data to patch the cache directly. Stale lists after POST are a common bug when developers forget invalidation. For example, after createTodo succeeds, invalidate ["todos"] or append the returned todo to the list cache. In a real app, queryClient.invalidateQueries({ queryKey: ["projects"] }) after creating a project refreshes both the list and dependent detail views.',
    code: `const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: createTodo,
  onSuccess: (newTodo) => {
    queryClient.setQueryData(['todos'], (old: Todo[] = []) => [...old, newTodo]);
    // or: queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});`,
  },
  {
    id: 39,
    category: 'CRUD Operations',
    question: 'How do you handle empty states and zero-result responses?',
    answer: 'Treat HTTP 200 with an empty array as success, not an error—show helpful empty UI with a call to action rather than an error banner. Distinguish "no data yet" from "filters returned nothing" with copy that guides the user. For search, suggest broadening terms when results are empty. For example, GET /api/notifications returns [] for a new user. In a real app, the inbox shows "No notifications yet" with illustration instead of a broken-looking blank table.',
    code: `const { data: notifications = [], isLoading } = useQuery({
  queryKey: ['notifications'],
  queryFn: () => fetch('/api/notifications').then((r) => r.json()),
});

if (isLoading) return <Spinner />;
if (notifications.length === 0) return <EmptyState title="No notifications yet" />;

return <NotificationList items={notifications} />;`,
  },
  {
    id: 40,
    category: 'CRUD Operations',
    question: 'How do you implement soft delete versus hard delete on the client?',
    answer: 'Hard delete removes the resource permanently—after DELETE succeeds, remove it from lists and navigate away from detail pages. Soft delete marks deletedAt or isDeleted; the API may still return the item with a flag or exclude it from default lists. Client UI may show trash views and restore actions for soft-deleted records. For example, DELETE /api/documents/1 sets deletedAt server-side while GET /api/documents?includeDeleted=true shows trash. In a real app, Gmail-style undo calls POST /api/documents/1/restore within a few seconds instead of immediate hard delete.',
    code: `// Hard delete — remove from UI
await deleteDocument(id);
setDocuments((docs) => docs.filter((d) => d.id !== id));

// Soft delete — mark or move to trash
await fetch(\`/api/documents/\${id}\`, { method: 'DELETE' });
setDocuments((docs) => docs.map((d) =>
  d.id === id ? { ...d, deletedAt: new Date().toISOString() } : d
));`,
  },
  {
    id: 41,
    category: 'CRUD Operations',
    question: 'How do you type REST API responses in TypeScript?',
    answer: 'Define interfaces or types for response entities and wrap fetch/axios calls with generic return types so components get autocomplete and compile-time checks. Generate types from OpenAPI with tools like openapi-typescript when the schema is the source of truth. Narrow union types for status-specific responses when error shapes differ. For example, interface User { id: string; email: string } types fetchUsers(): Promise<User[]>. In a real app, shared types live in a package imported by both the Next.js frontend and mobile app so field renames break all consumers at build time.',
    code: `interface User {
  id: string;
  email: string;
  role: 'member' | 'admin';
}

async function fetchUsers(): Promise<User[]> {
  const res = await fetch('/api/users');
  if (!res.ok) throw new Error('Failed');
  return res.json();
}`,
  },
  {
    id: 42,
    category: 'CRUD Operations',
    question: 'What is a normalized client cache for CRUD data?',
    answer: 'Normalization stores entities by id in a flat map (e.g., users.byId) instead of duplicating nested objects across list and detail responses. Updates to one entity propagate everywhere it appears without refetching all lists. Libraries like Redux Toolkit, Apollo Client, and TanStack Query support normalized patterns. For example, updating user 5 in byId automatically refreshes their name in every list component selecting that id. In a real app, a comment edit PATCH updates entities.comments[id] and all thread views re-render with consistent text.',
    code: `// Normalized shape
const state = {
  users: {
    byId: { '1': { id: '1', name: 'Ada' }, '2': { id: '2', name: 'Lin' } },
    allIds: ['1', '2'],
  },
};

// Update once, reflect everywhere
state.users.byId['1'] = { ...state.users.byId['1'], name: 'Ada L.' };`,
  },
  {
    id: 43,
    category: 'CRUD Operations',
    question: 'How do you prevent duplicate form submissions on create?',
    answer: 'Disable the submit button while the mutation is pending, ignore duplicate clicks, and use idempotency keys on the server for critical POST endpoints. Track isSubmitting in form state and re-enable only after success or failure. For example, a "Create account" button stays disabled until the 201 response returns. In a real app, Stripe-style Idempotency-Key headers ensure network retries do not create duplicate subscriptions even if the user double-clicks.',
    code: `const [isSubmitting, setIsSubmitting] = useState(false);

async function onSubmit(values: FormValues) {
  if (isSubmitting) return;
  setIsSubmitting(true);
  try {
    await fetch('/api/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': crypto.randomUUID(),
      },
      body: JSON.stringify(values),
    });
  } finally {
    setIsSubmitting(false);
  }
}`,
  },
  {
    id: 44,
    category: 'CRUD Operations',
    question: 'How do you sync URL query params with list filters?',
    answer: 'Read filter state from URLSearchParams on load and write back with router.replace when filters change so URLs are shareable and survive refresh. Debounce text filters before updating the URL to avoid history spam. Keep param names aligned with API query parameter names when possible. For example, ?status=open&assignee=me maps directly to GET /api/tasks?status=open&assignee=me. In a real app, React Router useSearchParams drives both the address bar and the fetch URL so support staff can paste a filtered view link to reproduce a bug.',
    code: `const [searchParams, setSearchParams] = useSearchParams();
const status = searchParams.get('status') ?? 'open';

useEffect(() => {
  fetch(\`/api/tasks?status=\${status}\`)
    .then((r) => r.json())
    .then(setTasks);
}, [status]);

function setStatus(next: string) {
  setSearchParams({ status: next });
}`,
  },
  {
    id: 45,
    category: 'CRUD Operations',
    question: 'How do you handle concurrent edits to the same resource?',
    answer: 'Use ETags with If-Match on PATCH/PUT so the server rejects stale updates with 412 Precondition Failed, then prompt the user to merge or reload. Alternatively, expose version fields or updatedAt timestamps the client must send back. Show who else is editing with presence when using WebSockets for collaborative apps. For example, PATCH with If-Match: "rev-4" fails if another tab saved rev-5 first. In a real app, a document editor displays "Ada updated this page—refresh to see changes" when the save returns 409 or 412.',
    code: `const res = await fetch(\`/api/documents/\${id}\`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'If-Match': etag, // from last GET
  },
  body: JSON.stringify({ title: 'Updated title' }),
});

if (res.status === 412) {
  showConflictDialog(); // someone else saved first
}`,
  },
]
