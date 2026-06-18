import type { InterviewQuestion } from '../../types'

export const graphqlAdvancedQuestions: InterviewQuestion[] = [
  {
    id: 106,
    category: 'GraphQL Advanced',
    question: 'Explain the N+1 problem in GraphQL in detail.',
    answer: 'The N+1 problem happens when resolving a list of N parent objects triggers N separate resolver calls for a nested field, each hitting the database independently—one query for posts plus N queries for each post author. GraphQL field-level resolvers make this easy to introduce accidentally because the query shape is client-driven. The symptom is latency and database load scaling with list size even for simple pages.',
    code: `// Problem: 1 query for posts + N queries for authors
const resolvers = {
  Query: { posts: () => db.post.findMany() },
  Post: {
    author: (post) => db.user.findById(post.authorId), // called per post!
  },
};`,
  },
  {
    id: 107,
    category: 'GraphQL Advanced',
    question: 'What is DataLoader and how does it solve N+1?',
    answer: 'DataLoader is a utility that batches multiple load(id) calls within the same event loop tick into one fetch function receiving all keys, and caches results for the request lifetime. You create a new loader per HTTP request in context so cache does not leak across users. The batch function typically runs one SQL IN query or Redis MGET.',
    code: `import DataLoader from 'dataloader';

function createUserLoader(db) {
  return new DataLoader(async (ids: readonly string[]) => {
    const users = await db.user.findMany({ where: { id: { in: [...ids] } } });
    const map = new Map(users.map((u) => [u.id, u]));
    return ids.map((id) => map.get(id) ?? null);
  });
}

// Resolver
Post: { author: (post, _args, ctx) => ctx.loaders.user.load(post.authorId) }`,
  },
  {
    id: 108,
    category: 'GraphQL Advanced',
    question: 'What is Apollo Federation at a high level?',
    answer: 'Apollo Federation composes multiple GraphQL subgraph services into one unified supergraph gateway schema, each team owning a slice of the graph. Subgraphs declare entities with @key fields and extend types with @extends and @external so the gateway resolves references across services. Clients query one endpoint while data lives in separate microservices.',
    code: `# Users subgraph
type User @key(fields: "id") {
  id: ID!
  email: String!
}

# Orders subgraph
extend type User @key(fields: "id") {
  id: ID! @external
  orders: [Order!]!
}`,
  },
  {
    id: 109,
    category: 'GraphQL Advanced',
    question: 'How should you handle errors in GraphQL mutations vs queries?',
    answer: 'Expected business failures like validation should return in mutation payload fields { errors: [{ field, message }] } with HTTP 200 so clients read structured data from data.createUser.errors. Unexpected server faults appear in the top-level errors array with extensions.code for monitoring. Queries use null with errors path for missing resources when partial results are acceptable. Avoid leaking stack traces in production extensions.',
    code: `mutation {
  createAccount(input: { email: "taken@co.com" }) {
    user { id }
    errors { field message code }
  }
}

// { "data": { "createAccount": { "user": null, "errors": [{ "field": "email", "message": "Already registered" }] } } }`,
  },
  {
    id: 110,
    category: 'GraphQL Advanced',
    question: 'How does cursor-based pagination work in GraphQL (Relay connections)?',
    answer: 'The Relay connection spec models pagination with Connection types containing edges { node, cursor } and pageInfo { hasNextPage, endCursor }. Arguments first/after (and last/before) fetch slices using opaque cursors encoding sort position. This pattern is stable for live lists and self-documents in schema.',
    code: `query UserFeed($after: String) {
  users(first: 10, after: $after) {
    edges {
      cursor
      node { id name }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`,
  },
  {
    id: 111,
    category: 'GraphQL Advanced',
    question: 'What is GraphQL codegen and why use it?',
    answer: 'GraphQL Code Generator introspects your schema and operations to produce TypeScript types, typed document nodes, React hooks (Apollo, urql), and resolver types—eliminating manual typing drift between client and server. Run it in CI on schema changes so broken queries fail at compile time. Plugins target your stack: typescript-operations, typescript-react-apollo, etc.',
    code: `# codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://api.staging.example.com/graphql',
  documents: ['src/**/*.graphql'],
  generates: {
    './src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
};
export default config;`,
  },
  {
    id: 112,
    category: 'GraphQL Advanced',
    question: 'How do you secure a GraphQL API against malicious queries?',
    answer: 'Depth limiting caps nested field depth; complexity analysis assigns costs to fields and rejects expensive queries; timeout and query allowlisting protect production. Persisted queries (APQ) send a hash instead of full query text so only known operations run. Rate limit by IP and authenticated user. Disable introspection in production if needed. depth 15 is rejected at depth 10.',
    code: `import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import depthLimit from 'graphql-depth-limit';
import { createComplexityLimitRule } from 'graphql-validation-complexity';

const validationRules = [
  depthLimit(10),
  createComplexityLimitRule(1000),
];`,
  },
  {
    id: 113,
    category: 'GraphQL Advanced',
    question: 'What are persisted queries (APQ) in GraphQL?',
    answer: 'Automatic Persisted Queries let clients send a SHA-256 hash of the query document instead of the full query string on repeat requests, reducing payload size and enabling server-side allowlists. First request sends query + hash to register; subsequent requests send extensions { persistedQuery: { version: 1, sha256Hash } } only. CDN can cache GET persisted query requests.',
    code: `// Client sends hash after registration
{
  "extensions": {
    "persistedQuery": { "version": 1, "sha256Hash": "abc123..." }
  },
  "variables": { "id": "42" }
}`,
  },
  {
    id: 114,
    category: 'GraphQL Advanced',
    question: 'How do you implement authorization in GraphQL resolvers?',
    answer: 'Authenticate once in context middleware, then enforce authorization in each resolver or a schema directive @auth(requires: ADMIN) before returning sensitive fields. Field-level auth prevents over-fetching leaks where public queries access private nested fields. Return null or FORBIDDEN errors consistently per your error policy.',
    code: `const resolvers = {
  User: {
    salary: (user, _args, ctx) => {
      if (ctx.user?.role !== 'ADMIN') {
        throw new GraphQLError('Forbidden', { extensions: { code: 'FORBIDDEN' } });
      }
      return payrollService.getSalary(user.id);
    },
  },
};`,
  },
  {
    id: 115,
    category: 'GraphQL Advanced',
    question: 'What is schema stitching versus federation?',
    answer: 'Schema stitching merges multiple GraphQL schemas into one by configuring links between types and delegating fields to subschemas—older approach, flexible but brittle at scale. Federation is the modern standard with explicit @key entity ownership and a gateway that plans queries across subgraphs with better tooling and team boundaries. Stitching suits consolidating legacy APIs; federation suits greenfield microservices graphs.',
    code: `// Federation — entity keys across services
type Product @key(fields: "sku") {
  sku: ID!
  name: String!
}

// Stitching — manual delegation (conceptual)
// subschemaConfig: { merge: { Product: { fieldName: 'productBySku' } } }`,
  },
  {
    id: 116,
    category: 'GraphQL Advanced',
    question: 'How do you handle file uploads in GraphQL?',
    answer: 'The GraphQL multipart request spec sends operations, map, and file parts in one multipart/form-data POST because JSON bodies cannot embed binary efficiently. Libraries like graphql-upload (server) and apollo-upload-client handle the protocol. Alternatively, use REST or presigned S3 URLs for large files and pass resulting URLs in GraphQL mutations.',
    code: `mutation UploadAvatar($file: Upload!) {
  uploadAvatar(file: $file) {
    url
    errors { message }
  }
}

// Multipart POST: operations, map, and binary file parts`,
  },
  {
    id: 117,
    category: 'GraphQL Advanced',
    question: 'What is query deduplication in Apollo Client?',
    answer: 'When multiple components mount simultaneously with identical queries and variables, Apollo deduplicates them into one network request and shares the result across subscribers. This prevents request storms on app load when many child components use the same useQuery. It works per client instance for in-flight requests; cached results serve subsequent mounts without network.',
    code: `const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  queryDeduplication: true, // default true
});

// 10 components: useQuery(GET_USER, { variables: { id: '5' } })
// → 1 network request`,
  },
  {
    id: 118,
    category: 'GraphQL Advanced',
    question: 'How do you migrate from REST to GraphQL incrementally?',
    answer: 'Start with a GraphQL layer (BFF) that wraps existing REST services in resolvers, migrate high-churn screens first, and keep REST for webhooks and file downloads during transition. Use codegen against the growing schema and run both APIs in parallel until clients switch. Strangler fig pattern replaces REST endpoints as GraphQL coverage matures.',
    code: `const resolvers = {
  Query: {
    user: async (_p, { id }) => {
      // Phase 1 — REST wrapper
      const res = await fetch(\`\${REST_BASE}/users/\${id}\`);
      return res.json();
      // Phase 2 — direct service layer
      // return userService.findById(id);
    },
  },
};`,
  },
  {
    id: 119,
    category: 'GraphQL Advanced',
    question: 'What are GraphQL subscription scaling considerations?',
    answer: 'Subscriptions require persistent connections (usually WebSockets) and pub/sub infrastructure—Redis, Kafka, or Postgres LISTEN—to fan out events to the right subscribers. Horizontal scaling needs sticky sessions or shared pub/sub because WebSocket connections are stateful. Filter events server-side by subscription arguments so clients do not receive irrelevant payloads.',
    code: `// Pub/sub backing subscriptions
const pubsub = new RedisPubSub();

const resolvers = {
  Subscription: {
    messageAdded: {
      subscribe: (_p, { roomId }) =>
        pubsub.asyncIterator(\`MESSAGE_ADDED_\${roomId}\`),
    },
  },
  Mutation: {
    sendMessage: async (_p, { roomId, body }, ctx) => {
      const msg = await ctx.messages.create({ roomId, body });
      pubsub.publish(\`MESSAGE_ADDED_\${roomId}\`, { messageAdded: msg });
      return msg;
    },
  },
};`,
  },
  {
    id: 120,
    category: 'GraphQL Advanced',
    question: 'How do you test GraphQL operations in integration tests?',
    answer: 'Use execute from graphql package or supertest against an in-memory Apollo Server with mocked context and data sources. Snapshot operation results for regression but prefer asserting specific fields. Factory-seed database fixtures for e2e tests hitting real resolvers. Mock external services at the service layer, not every resolver.',
    code: `import { ApolloServer } from '@apollo/server';
import { execute, parse } from 'graphql';

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

const result = await server.executeOperation({
  query: 'mutation { createTodo(input: { title: "Test" }) { todo { id title } } }',
}, { contextValue: mockContext });

expect(result.body.singleResult.data?.createTodo.todo.title).toBe('Test');`,
  },
]
