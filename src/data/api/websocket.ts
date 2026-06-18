import type { InterviewQuestion } from '../../types'

export const websocketQuestions: InterviewQuestion[] = [
  {
    id: 121,
    category: 'WebSockets',
    question: 'What is the WebSocket API and how does it differ from HTTP?',
    answer: 'WebSocket provides a full-duplex, persistent connection between client and server over a single TCP socket, started by an HTTP Upgrade handshake then switching to the ws:// or wss:// protocol. Unlike request-response HTTP, either side can push messages anytime without polling overhead. It suits low-latency bidirectional communication like chat and live dashboards. For example, after connect, the server pushes score updates without the client requesting each time. In a real app, wss://api.example.com/live replaces polling GET /scores every second with instant pushes.',
    code: `const socket = new WebSocket('wss://api.example.com/live');

socket.addEventListener('open', () => {
  socket.send(JSON.stringify({ type: 'subscribe', channel: 'scores' }));
});

socket.addEventListener('message', (event) => {
  const update = JSON.parse(event.data);
  console.log('Score update', update);
});`,
  },
  {
    id: 122,
    category: 'WebSockets',
    question: 'What is the WebSocket connection lifecycle?',
    answer: 'A WebSocket moves through connecting, open, closing, and closed states tracked by readyState. The client calls new WebSocket(url), the browser sends HTTP Upgrade, and on success the open event fires. Either side sends close frames to shut down gracefully; abrupt disconnects trigger close without clean handshake. Listen to open, message, error, and close events for full lifecycle handling. For example, disable chat input until open and show reconnecting UI on close code 1006 (abnormal). In a real app, state machines map readyState to UI badges: Connecting, Live, Disconnected.',
    code: `const ws = new WebSocket('wss://chat.example.com');

ws.onopen = () => console.log('Connected', ws.readyState); // 1 OPEN
ws.onmessage = (e) => handleMessage(e.data);
ws.onerror = (e) => console.error('WebSocket error', e);
ws.onclose = (e) => console.log('Closed', e.code, e.reason);

// ws.readyState: 0 CONNECTING, 1 OPEN, 2 CLOSING, 3 CLOSED`,
  },
  {
    id: 123,
    category: 'WebSockets',
    question: 'What is Socket.io and how does it relate to raw WebSockets?',
    answer: 'Socket.io is a library that provides WebSocket-like APIs with automatic fallback to long polling, built-in reconnection, rooms, namespaces, and event-based messaging on top of raw sockets. It adds framing and heartbeats so developers avoid reinventing connection reliability. The wire protocol is not raw WebSocket frames—you need Socket.io client and server pairs. For example, io.emit("chat message", payload) broadcasts to connected clients with ack callbacks supported. In a real app, Node Express uses socket.io for team chat while a low-level trading feed might use raw WebSockets for minimal overhead.',
    code: `// Server (Node)
import { Server } from 'socket.io';
const io = new Server(httpServer, { cors: { origin: 'https://app.example.com' } });

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => io.emit('chat message', msg));
});

// Client
import { io } from 'socket.io-client';
const socket = io('https://api.example.com');
socket.emit('chat message', 'Hello room');`,
  },
  {
    id: 124,
    category: 'WebSockets',
    question: 'How do you implement automatic reconnection for WebSockets?',
    answer: 'On close or error, wait with exponential backoff then create a new WebSocket and resubscribe to channels—track reconnect attempt count and cap max delay. Resend auth tokens and session state after reconnect because server memory of the old socket is gone. Socket.io handles this built-in; raw WebSockets need custom logic. For example, retry at 1s, 2s, 4s up to 30s after Wi-Fi drop on a laptop. In a real app, a collaboration editor replays missed operations fetched via REST GET /doc/ops?since=revision after reconnect completes.',
    code: `function connectWithRetry(url: string, attempt = 0) {
  const ws = new WebSocket(url);

  ws.onopen = () => {
    attempt = 0;
    ws.send(JSON.stringify({ type: 'auth', token: getToken() }));
  };

  ws.onclose = () => {
    const delay = Math.min(1000 * 2 ** attempt, 30000);
    attempt++;
    setTimeout(() => connectWithRetry(url, attempt), delay);
  };

  return ws;
}`,
  },
  {
    id: 125,
    category: 'WebSockets',
    question: 'What are Socket.io rooms and namespaces?',
    answer: 'Namespaces partition the server into separate communication channels at the path level—/chat vs /admin—each with its own connection handlers. Rooms are arbitrary groups within a namespace; sockets join rooms and broadcasts target room members with io.to("roomId").emit. This scopes messages so users only receive relevant events. For example, socket.join("match-991") receives goal updates for that match only. In a real app, a support dashboard namespace /agent and room per ticketId routes customer messages only to the assigned agent sockets.',
    code: `io.of('/chat').on('connection', (socket) => {
  socket.on('join room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('message', ({ roomId, text }) => {
    io.of('/chat').to(roomId).emit('message', { text, sender: socket.id });
  });
});`,
  },
  {
    id: 126,
    category: 'WebSockets',
    question: 'How do you authenticate WebSocket connections?',
    answer: 'Pass short-lived JWTs during the handshake via query string, Sec-WebSocket-Protocol, or first message after connect—query tokens leak in logs so prefer post-connect auth message over wss. Validate token server-side before joining rooms or accepting messages; disconnect on expiry. Cookie-based auth works for same-site connections with credentials. For example, client sends { type: "auth", token } immediately after open and server closes with 4401 if invalid. In a real app, Socket.io middleware socket.handshake.auth.token verifies JWT before the connection event handler runs.',
    code: `// Socket.io auth middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    socket.data.user = verifyJwt(token);
    next();
  } catch {
    next(new Error('Unauthorized'));
  }
});

io.on('connection', (socket) => {
  console.log('User connected', socket.data.user.id);
});`,
  },
  {
    id: 127,
    category: 'WebSockets',
    question: 'What is a heartbeat (ping/pong) in WebSocket connections?',
    answer: 'Heartbeats detect dead connections through NAT timeouts and network drops by periodically sending ping frames or application-level ping messages and expecting pong responses within a timeout. Without heartbeats, apps think they are connected while the server has already garbage-collected the socket. Server and client should agree on interval and timeout policy. For example, ping every 25 seconds and close if no pong within 10 seconds. In a real app, load balancers drop idle WebSockets after 60s unless application pings keep the flow active.',
    code: `// Application-level heartbeat (raw WebSocket)
let heartbeat: ReturnType<typeof setInterval>;

ws.onopen = () => {
  heartbeat = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: 'ping' }));
  }, 25000);
};

ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.type === 'pong') lastPong = Date.now();
};`,
  },
  {
    id: 128,
    category: 'WebSockets',
    question: 'When should you use Server-Sent Events (SSE) instead of WebSockets?',
    answer: 'SSE is a one-way HTTP stream from server to client over text/event-stream, auto-reconnecting in browsers with EventSource—ideal for live feeds, notifications, and progress updates where the client rarely sends data. WebSockets suit bidirectional high-frequency chat, gaming, and collaborative editing. SSE works through standard HTTP proxies and does not need a special protocol upgrade. For example, GET /events/stream pushing stock ticks fits SSE; typing indicators and chat need WebSockets. In a real app, deployment logs tail via SSE while the debugger console uses WebSocket for stdin/stdout both ways.',
    code: `// Client — SSE
const source = new EventSource('/api/events/stream');
source.onmessage = (event) => {
  const payload = JSON.parse(event.data);
  appendLog(payload);
};
source.onerror = () => console.log('SSE reconnecting...');

// Server sends: data: {"line":"Build started"}\\n\\n`,
  },
  {
    id: 129,
    category: 'WebSockets',
    question: 'How do you build a real-time chat with WebSockets?',
    answer: 'On connect, authenticate the user, load recent messages via REST, then join a room per channel over WebSocket for live messages. Broadcast new messages to room members and persist each message server-side before ack so reconnect can backfill history. Handle typing indicators as ephemeral events not stored. For example, send { type: "message", roomId, text } and server emits message to room after DB insert returns id. In a real app, Slack-like unread counts update via separate lightweight events while message bodies stream over the socket.',
    code: `socket.on('send message', async ({ roomId, text }) => {
  const message = await db.messages.create({
    roomId,
    userId: socket.data.user.id,
    text,
  });
  io.to(roomId).emit('message', message);
});

socket.on('typing', ({ roomId }) => {
  socket.to(roomId).emit('typing', { userId: socket.data.user.id });
});`,
  },
  {
    id: 130,
    category: 'WebSockets',
    question: 'How do you handle WebSocket message ordering and delivery?',
    answer: 'WebSockets preserve message order on a single connection but not across reconnections—assign sequence numbers or timestamps server-side so clients detect gaps and fetch missed messages via REST. At-least-once delivery may duplicate; idempotent handlers or client-side dedup by message id solve this. For critical events, use ack callbacks and retry unacked sends. For example, each event includes seq: 1042 and client requests GET /events?after=1040 on gap detection. In a real app, financial tick feeds sequence every payload and clients buffer out-of-order ticks until the chain is complete.',
    code: `// Server message with sequence
io.emit('event', { seq: 1042, type: 'price', value: 189.5 });

// Client gap recovery
let lastSeq = 0;
socket.on('event', (msg) => {
  if (msg.seq > lastSeq + 1) fetchMissed(lastSeq + 1, msg.seq - 1);
  lastSeq = msg.seq;
});`,
  },
  {
    id: 131,
    category: 'WebSockets',
    question: 'What are WebSocket close codes and why do they matter?',
    answer: 'Close codes in the 1000–4999 range indicate why a connection ended—1000 normal closure, 1001 going away, 1006 abnormal closure (no close frame), 4401 custom unauthorized in some apps. Clients and servers should use appropriate codes for debugging and reconnection logic—do not reconnect on 1000 intentional logout but do on 1006 network blip. For example, server sends close 4001 with reason Token expired so client refreshes JWT before reconnect. In a real app, monitoring aggregates close code rates to detect proxy misconfiguration causing mass 1006 disconnects.',
    code: `// Server-initiated close
socket.close(4401, 'Token expired');

ws.onclose = (event) => {
  if (event.code === 4401) refreshTokenAndReconnect();
  else if (event.code === 1006) scheduleReconnect();
  else if (event.code === 1000) showLoggedOut();
};`,
  },
  {
    id: 132,
    category: 'WebSockets',
    question: 'How do you scale WebSockets horizontally?',
    answer: 'WebSocket connections stick to one server instance, so scale with a shared pub/sub backbone—Redis, NATS, or Kafka—where each instance publishes events and forwards to its local connected clients. Sticky sessions at the load balancer route reconnections consistently when state is local. Alternatively, externalize connection registry in Redis. For example, server A publishes chat message to Redis channel room:5 and server B delivers to its sockets in room:5. In a real app, Socket.io Redis adapter synchronizes rooms across ten Node pods behind AWS ALB.',
    code: `// Socket.io Redis adapter (conceptual)
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const pub = createClient({ url: process.env.REDIS_URL });
const sub = pub.duplicate();
io.adapter(createAdapter(pub, sub));`,
  },
  {
    id: 133,
    category: 'WebSockets',
    question: 'What message format should WebSocket apps use?',
    answer: 'JSON is the default for readability and JavaScript interoperability—wrap payloads in { type, payload } envelopes for routing on the client. MessagePack or protobuf reduce bandwidth for high-frequency binary feeds. Always validate and parse safely; never eval incoming data. Version your message types for backward compatibility. For example, { type: "ORDER_FILLED", payload: { orderId, price } } lets one handler switch route messages. In a real app, a schema validator like Zod parses inbound socket messages before updating Redux state.',
    code: `type ServerMessage =
  | { type: 'SCORE_UPDATE'; payload: { home: number; away: number } }
  | { type: 'GAME_OVER'; payload: { winner: string } };

function handleMessage(raw: string) {
  const msg = JSON.parse(raw) as ServerMessage;
  switch (msg.type) {
    case 'SCORE_UPDATE': updateScoreboard(msg.payload); break;
    case 'GAME_OVER': showWinner(msg.payload.winner); break;
  }
}`,
  },
  {
    id: 134,
    category: 'WebSockets',
    question: 'How do you integrate WebSockets with React?',
    answer: 'Encapsulate connection logic in a custom hook or context provider that connects on mount, disconnects on unmount, and exposes latest messages via state or useReducer. Avoid creating new WebSocket instances on every render—use useRef for the socket and useEffect for lifecycle. Derive connection status for UI indicators. For example, useChatSocket(roomId) returns { messages, sendMessage, status }. In a real app, ChatProvider wraps the tree, subscribes once, and child components consume messages through useContext without duplicate connections.',
    code: `function useChatSocket(roomId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<'connecting' | 'open' | 'closed'>('connecting');
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(\`wss://chat.example.com/\${roomId}\`);
    socketRef.current = ws;
    ws.onopen = () => setStatus('open');
    ws.onmessage = (e) => setMessages((m) => [...m, JSON.parse(e.data)]);
    ws.onclose = () => setStatus('closed');
    return () => ws.close();
  }, [roomId]);

  const send = (text: string) => socketRef.current?.send(JSON.stringify({ text }));
  return { messages, send, status };
}`,
  },
  {
    id: 135,
    category: 'WebSockets',
    question: 'What security risks affect WebSocket applications?',
    answer: 'WebSockets bypass same-origin policy once established—validate Origin header server-side to block cross-site connection hijacking from malicious pages. Authenticate and authorize every message, not just the handshake; rate limit message frequency. Protect against XSS stealing tokens used in query strings; prefer post-connect auth over wss. Do not expose admin namespaces without strict checks. For example, reject handshakes where Origin is not https://app.example.com. In a real app, WAF rules and per-user message quotas prevent bot spam in public chat rooms.',
    code: `// Validate Origin on upgrade
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (req, socket, head) => {
  const origin = req.headers.origin;
  if (origin !== 'https://app.example.com') {
    socket.destroy();
    return;
  }
  wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws, req));
});`,
  },
  {
    id: 136,
    category: 'WebSockets',
    question: 'How does WebSocket work with load balancers and proxies?',
    answer: 'Load balancers must support HTTP Upgrade and Connection: Upgrade headers end-to-end; misconfigured proxies strip them and WebSocket handshakes fail with 400 errors. Enable sticky sessions or shared pub/sub when connections are stateful. Idle timeout on ALB/nginx must exceed heartbeat interval or connections drop silently. For example, nginx proxy_set_header Upgrade $http_upgrade and proxy_read_timeout 3600s keep sockets alive. In a real app, AWS ALB target groups enable stickiness for Socket.io while Redis adapter handles cross-node broadcasts.',
    code: `# nginx WebSocket proxy (simplified)
location /socket.io/ {
  proxy_pass http://backend;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
  proxy_read_timeout 3600s;
}`,
  },
  {
    id: 137,
    category: 'WebSockets',
    question: 'What is the difference between WebSocket broadcast, emit, and multicast?',
    answer: 'Broadcast sends to all connected clients on the server—io.emit in Socket.io. Emit to a room sends only to sockets that joined that room—io.to(roomId).emit. Direct emit targets one socket by id—io.to(socketId).emit for private messages. Choose the narrowest scope to reduce bandwidth and privacy leaks. For example, game state updates broadcast to match room only, not every connected player globally. In a real app, private DM uses socket.to(recipientSocketId) while channel posts use room broadcast.',
    code: `// All clients
io.emit('maintenance', { in: '5 minutes' });

// Room only
io.to(\`match-\${matchId}\`).emit('goal', { team: 'home' });

// Single socket
io.to(socket.id).emit('private', { text: 'Hello just you' });`,
  },
  {
    id: 138,
    category: 'WebSockets',
    question: 'How do you test WebSocket applications?',
    answer: 'Use ws client in Node integration tests connecting to a test server instance, assert message sequences with async timeouts, and mock pub/sub dependencies. Libraries like socket.io-client connected to io(server) in beforeAll hooks work well. Test reconnection by forcibly closing server-side sockets. For example, client connects, server emits welcome, test expects message within 1s. In a real app, CI spins up the chat server on a random port, connects a test client, sends a message, and verifies broadcast receipt without flakiness using done callbacks or Promises.',
    code: `import { io as ioc } from 'socket.io-client';
import { Server } from 'socket.io';

test('broadcasts chat messages', (done) => {
  const io = new Server(0);
  const port = io.httpServer.address().port;
  io.on('connection', (s) => s.on('msg', (m) => io.emit('msg', m)));

  const client = ioc(\`http://localhost:\${port}\`);
  client.on('msg', (m) => {
    expect(m).toBe('hello');
    client.close();
    io.close();
    done();
  });
  client.emit('msg', 'hello');
});`,
  },
  {
    id: 139,
    category: 'WebSockets',
    question: 'When should you fall back from WebSockets to polling?',
    answer: 'Corporate firewalls and proxies sometimes block WebSocket upgrades; libraries like Socket.io automatically fall back to HTTP long polling with slightly higher latency but functional delivery. Detect failure after timeout on WebSocket connect and degrade gracefully in UI copy. Mobile backgrounding may suspend sockets—sync on foreground via REST catch-up. For example, Socket.io tries websocket transport first then polling if upgrade fails. In a real app, enterprise users on restrictive networks still receive notifications via long polling while consumer users get full WebSocket performance.',
    code: `import { io } from 'socket.io-client';

const socket = io('https://api.example.com', {
  transports: ['websocket', 'polling'], // try WebSocket first
  reconnectionAttempts: 10,
});

socket.io.on('upgrade', () => console.log('Upgraded to', socket.io.engine.transport.name));`,
  },
  {
    id: 140,
    category: 'WebSockets',
    question: 'How do you combine REST and WebSockets in one application?',
    answer: 'Use REST for CRUD, authentication, historical data, and file uploads; use WebSockets for live deltas after the initial REST hydrate. The client loads GET /messages?roomId=5 history then subscribes to message events for new items. Keep WebSocket payloads small—send ids and deltas, not full snapshots. For example, REST POST /messages still creates messages for clients offline while WebSocket pushes to online room members instantly. In a real app, React Query fetches paginated comments and a socket listener appendComment invalidates or patches the cache on commentAdded events.',
    code: `// 1. Hydrate via REST
const history = await fetch('/api/rooms/5/messages?limit=50').then((r) => r.json());
setMessages(history);

// 2. Subscribe for live updates
socket.emit('join', { roomId: '5' });
socket.on('message', (msg) => setMessages((m) => [...m, msg]));

// 3. Send via REST or socket depending on API design
await fetch('/api/rooms/5/messages', {
  method: 'POST',
  body: JSON.stringify({ text: 'Hello' }),
});`,
  },
]
