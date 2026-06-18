import type { InterviewQuestion } from '../../types'

export const graphqlQuestions: InterviewQuestion[] = [
  {
    id: 84,
    category: 'GraphQL',
    question: 'What is GraphQL and how does it differ from REST?',
    answer: 'GraphQL is a query language and runtime where clients request exactly the fields they need from a single endpoint, usually POST /graphql, instead of multiple REST URLs with fixed response shapes. The server exposes a typed schema and resolves each requested field, reducing over-fetching and under-fetching. REST uses HTTP methods and resource URLs; GraphQL uses queries, mutations, and subscriptions over one route.',
    code: `query HomeScreen {
  me {
    displayName
    orders(limit: 3) {
      id
      total
      status
    }
  }
}`,
  },
  {
    id: 85,
    category: 'GraphQL',
    question: 'What is a GraphQL query?',
    answer: 'A query is a read operation that mirrors the shape of the JSON response—you ask for fields on types and the server returns data matching that tree. Queries should be side-effect free on the server, similar to GET in REST. Nested fields trigger resolver chains for related data.',
    code: `query GetUser($id: ID!) {
  user(id: $id) {
    id
    email
    profile {
      avatarUrl
      bio
    }
  }
}`,
  },
  {
    id: 86,
    category: 'GraphQL',
    question: 'What is a GraphQL mutation?',
    answer: 'Mutations are operations that create, update, or delete data—GraphQL equivalent of POST, PUT, PATCH, DELETE. They return affected objects and optionally payload fields for errors, similar to a structured write response. Multiple mutations in one document run sequentially, not in parallel.',
    code: `mutation CreateTodo($input: CreateTodoInput!) {
  createTodo(input: $input) {
    todo {
      id
      title
      done
    }
    errors {
      field
      message
    }
  }
}`,
  },
  {
    id: 87,
    category: 'GraphQL',
    question: 'What is the GraphQL schema?',
    answer: 'The schema defines all types, fields, arguments, interfaces, unions, enums, queries, mutations, and subscriptions available in the API—it is the contract between client and server. Schema-first teams write SDL (.graphql files) then implement resolvers; code-first tools generate schema from server code. Introspection lets tools like GraphiQL explore the schema at runtime.',
    code: `type Query {
  user(id: ID!): User
  users(limit: Int = 20): [User!]!
}

type User {
  id: ID!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  author: User!
}`,
  },
  {
    id: 88,
    category: 'GraphQL',
    question: 'What scalar and object types are common in GraphQL schemas?',
    answer: 'Built-in scalars are Int, Float, String, Boolean, and ID (opaque identifier serialized as string). Object types group fields; lists use [Type] or [Type!]! for nullability constraints. Custom scalars like DateTime, Email, or JSON extend the type system for domain-specific validation.',
    code: `scalar DateTime

type Order {
  id: ID!
  totalCents: Int!
  placedAt: DateTime!
  tags: [String!]!
  metadata: JSON
}`,
  },
  {
    id: 89,
    category: 'GraphQL',
    question: 'What are GraphQL resolvers?',
    answer: 'Resolvers are functions that fetch the data for each schema field—given parent object, arguments, context, and info, they return a value or Promise. Default resolvers read properties from parent when field names match. Resolver trees execute depth-first: user resolver runs, then posts resolver for each user.',
    code: `const resolvers = {
  Query: {
    user: (_parent, { id }, ctx) => ctx.users.findById(id),
  },
  User: {
    posts: (user, _args, ctx) => ctx.posts.findByAuthorId(user.id),
  },
  Post: {
    author: (post, _args, ctx) => ctx.users.load(post.authorId),
  },
};`,
  },
  {
    id: 90,
    category: 'GraphQL',
    question: 'What are GraphQL variables and why use them?',
    answer: 'Variables let you parameterize operations instead of string-interpolating values into query strings, preventing injection and enabling query reuse with different inputs. The client sends a variables JSON object alongside the query document. Server-side validation ensures types match the declared variable definitions.',
    code: `const GET_USER = gql\`
  query GetUser($id: ID!) {
    user(id: $id) { id email }
  }
\`;

const { data } = useQuery(GET_USER, { variables: { id: userId } });`,
  },
  {
    id: 91,
    category: 'GraphQL',
    question: 'What are GraphQL fragments?',
    answer: 'Fragments are reusable field selections on a type—you define once and spread with ...FragmentName in queries to avoid duplicating field lists across operations. Colocated fragments keep components declarative: each component declares the fields it needs. Fragment masking and codegen tools enforce that components only access their declared fields.',
    code: `fragment UserAvatar on User {
  id
  avatarUrl
  displayName
}

query UserList {
  users {
    ...UserAvatar
  }
}

query UserDetail($id: ID!) {
  user(id: $id) {
    ...UserAvatar
    email
    bio
  }
}`,
  },
  {
    id: 92,
    category: 'GraphQL',
    question: 'What is Apollo Client and how do you use it in React?',
    answer: 'Apollo Client is a GraphQL client that manages queries, mutations, caching, and local state with React hooks like useQuery, useMutation, and useSubscription. It normalizes cache by __typename and id, deduplicates in-flight requests, and supports optimistic updates. You wrap the app in ApolloProvider with a configured client pointing at your GraphQL HTTP link.',
    code: `import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const { data, loading, error } = useQuery(gql\`
  query { todos { id title done } }
\`);`,
  },
  {
    id: 93,
    category: 'GraphQL',
    question: 'How does Apollo Client cache GraphQL responses?',
    answer: 'InMemoryCache stores normalized entities keyed by cache ID (default __typename:id) and merges field data from queries. fetchPolicy controls behavior: cache-first reads cache then network, network-only always hits server, cache-and-network shows stale then updates. writeQuery, updateQuery, and cache.modify patch cache after mutations.',
    code: `const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          todos: { merge(_existing, incoming) { return incoming; } },
        },
      },
    },
  }),
});`,
  },
  {
    id: 94,
    category: 'GraphQL',
    question: 'What is the __typename field in GraphQL?',
    answer: '__typename is a meta field returning the GraphQL type name of any object, automatically available on every object type without schema declaration. Apollo Client uses it with id for cache normalization—User:42 vs Post:42 stay distinct. You can request __typename explicitly in queries for logging or polymorphic UI rendering.',
    code: `query Search($q: String!) {
  search(q: $q) {
    __typename
    ... on User { id name }
    ... on Post { id title }
  }
}`,
  },
  {
    id: 95,
    category: 'GraphQL',
    question: 'What are GraphQL input types?',
    answer: 'Input types group mutation arguments into structured objects—input CreateUserInput { email: String!, password: String! }—keeping mutation signatures clean and reusable. Input types cannot contain object types or interfaces, only scalars, enums, and other input types. They often mirror create/update DTOs in REST.',
    code: `input CreateCommentInput {
  postId: ID!
  body: String!
  parentId: ID
}

type Mutation {
  createComment(input: CreateCommentInput!): CreateCommentPayload!
}`,
  },
  {
    id: 96,
    category: 'GraphQL',
    question: 'What is nullability in GraphQL (!) and why does it matter?',
    answer: 'The ! suffix marks fields or list items as non-null—the server promise to never return null for that field, and clients can rely on it in TypeScript types. Nullable fields may be absent when data is missing or unauthorized partial results are returned. List nullability has four combinations: [User] vs [User!]! affects whether list or items can be null.',
    code: `type User {
  id: ID!              # never null
  email: String!       # never null
  nickname: String     # nullable
  posts: [Post!]!      # non-null list, non-null items
  favorites: [Product] # nullable list, nullable items
}`,
  },
  {
    id: 97,
    category: 'GraphQL',
    question: 'How do you handle errors in GraphQL?',
    answer: 'GraphQL often returns HTTP 200 with errors array in the response body for partial failures—some fields succeed while others error with path and message. Application errors belong in mutation payload errors fields for expected validation failures. Distinguish auth errors (top-level) from field-level not found.',
    code: `const { data, error } = useQuery(GET_USER, { errorPolicy: 'all' });

// Response shape
// {
//   "data": { "user": null },
//   "errors": [{ "message": "User not found", "path": ["user"], "extensions": { "code": "NOT_FOUND" } }]
// }`,
  },
  {
    id: 98,
    category: 'GraphQL',
    question: 'What is GraphQL introspection?',
    answer: 'Introspection queries the __schema and __type meta-fields to discover types, fields, and directives programmatically—powering GraphiQL, Apollo Studio, and codegen tools. Production APIs often disable introspection in public environments to reduce attack surface while keeping it in dev.',
    code: `query IntrospectUserType {
  __type(name: "User") {
    name
    fields {
      name
      type { name kind ofType { name } }
    }
  }
}`,
  },
  {
    id: 99,
    category: 'GraphQL',
    question: 'What are GraphQL aliases?',
    answer: 'Aliases rename fields in the response when you need the same field twice with different arguments or clearer client-side keys. The response uses the alias as the JSON key instead of the field name. Useful for comparing two users or fetching renamed counts in one round trip.',
    code: `query CompareUsers {
  first: user(id: "1") { name role }
  second: user(id: "2") { name role }
}

// Response: { "first": { ... }, "second": { ... } }`,
  },
  {
    id: 100,
    category: 'GraphQL',
    question: 'What are GraphQL directives (@include, @skip)?',
    answer: 'Directives annotate fields or fragments with conditional or metadata behavior defined in the schema or built-in. @include(if: Boolean) and @skip(if: Boolean) conditionally include fields based on variables—useful for optional UI sections without separate queries. Custom directives like @deprecated or @auth implement cross-cutting schema concerns.',
    code: `query Dashboard($isAdmin: Boolean!) {
  me { name }
  teamStats { activeUsers }
  billingDetails @include(if: $isAdmin) {
    mrr
    invoices { id amount }
  }
}`,
  },
  {
    id: 101,
    category: 'GraphQL',
    question: 'What is a brief introduction to GraphQL subscriptions?',
    answer: 'Subscriptions are long-lived operations where the server pushes updates when events occur—new messages, live scores, stock ticks—typically over WebSockets using the graphql-ws protocol. Clients subscribe with subscription OnMessageAdded { messageAdded(roomId: $id) { id body } } and receive payloads as events fire. They complement queries and mutations for real-time UX.',
    code: `subscription OnMessageAdded($roomId: ID!) {
  messageAdded(roomId: $roomId) {
    id
    body
    author { displayName }
    createdAt
  }
}

// Client: useSubscription(ON_MESSAGE_ADDED, { variables: { roomId } })`,
  },
  {
    id: 102,
    category: 'GraphQL',
    question: 'How do you send GraphQL requests over HTTP?',
    answer: 'Send POST with Content-Type: application/json and body { query, variables, operationName }. GET with query params is supported for cached reads but limited by URL length and logging concerns. Auth headers attach the same way as REST. Batching sends an array of operations in one HTTP request on servers that support it.',
    code: `await fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: \`Bearer \${token}\`,
  },
  body: JSON.stringify({
    query: \`query ($id: ID!) { user(id: $id) { email } }\`,
    variables: { id: '42' },
  }),
});`,
  },
  {
    id: 103,
    category: 'GraphQL',
    question: 'What are interfaces and unions in GraphQL?',
    answer: 'Interfaces define shared fields that implementing types must provide—interface Node { id: ID! } with User and Post implementing Node. Unions represent a value that is one of several types without common fields—union SearchResult = User | Post. Clients use inline fragments ... on User to select type-specific fields.',
    code: `interface Node {
  id: ID!
}

type User implements Node {
  id: ID!
  email: String!
}

union SearchResult = User | Post

query {
  search(q: "ada") {
    ... on User { email }
    ... on Post { title }
  }
}`,
  },
  {
    id: 104,
    category: 'GraphQL',
    question: 'What is the N+1 problem in GraphQL at a high level?',
    answer: 'N+1 occurs when a list resolver returns N items and a nested field resolver runs one database query per item instead of one batched query—classic with posts each loading author separately. DataLoader batches and caches per-request loads to collapse N queries into one. Without fixing N+1, GraphQL flexible queries amplify database load.',
    code: `// Without batching — N+1 queries
posts.map((post) => db.user.findById(post.authorId));

// With DataLoader — 1 batched query
posts.map((post) => userLoader.load(post.authorId));`,
  },
  {
    id: 105,
    category: 'GraphQL',
    question: 'When should you choose GraphQL over REST for a project?',
    answer: 'GraphQL shines when multiple clients need different field sets from complex graphs, when aggregating many REST calls causes waterfall latency, and when strong typing and introspection accelerate frontend iteration. REST remains simpler for file uploads, heavy caching on CDN, public CRUD APIs, and teams wanting HTTP semantics and mature tooling without resolver complexity.',
    code: `// REST — multiple round trips
const user = await fetch('/api/me').then((r) => r.json());
const projects = await fetch('/api/projects').then((r) => r.json());
const notifications = await fetch('/api/notifications').then((r) => r.json());

// GraphQL — one request, exact fields
const { data } = await client.query({
  query: gql\`query { me { name } projects { id name } notifications { id text } }\`,
});`,
  },
]
