# 11. Chat System

## Tổng quan về Chat System

### Mục đích của Chat System / Purpose

**Chat System** là một application cho phép users gửi và nhận messages real-time.

**Mục đích chính:**

- Real-time communication giữa users
- Group chats và direct messages
- Message persistence
- Online/offline status
- Media sharing

### Khi nào cần hiểu về Chat System / When to Use

Hiểu về Chat System là cần thiết khi:

- Thiết kế messaging application
- Xử lý real-time communication
- Cần message persistence
- Xây dựng group chat features
- Implement presence/online status

### Giúp ích gì / Benefits

**Lợi ích:**

- **Real-time**: Real-time communication
- **Persistence**: Messages được lưu trữ
- **Scalability**: Scale cho nhiều users
- **Features**: Rich features (media, reactions, etc.)

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                   | Nhược điểm               |
| ------------------------- | ------------------------ |
| - Real-time communication | Complexity cao           |
| - Message persistence     | Scalability challenges   |
| - Rich features           | Real-time infrastructure |
| - Multi-platform          | Sync challenges          |

---

## Real-time communication?

**Real-time communication** là gửi và nhận messages ngay lập tức.

### Mục đích / Purpose

Enable real-time messaging giữa users.

### Khi nào dùng / When to Use

| Tình huống           | Khi nào dùng               |
| -------------------- | -------------------------- |
| - Instant messaging  | Khi cần real-time messages |
| - Live updates       | Khi cần live updates       |
| - Collaborative apps | Khi cần collaboration      |

### Giúp ích gì / Benefits

- **Instant delivery**: Messages được gửi ngay lập tức
- **Low latency**: Low latency
- **Better UX**: Better user experience

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm                  |
| ------------------- | --------------------------- |
| - Low latency       | Complexity cao              |
| - Real-time updates | Infrastructure requirements |
| - Better UX         | Connection management       |

### Ví dụ:

```javascript
// Real-time Communication Technologies

const technologies = {
  webSockets: {
    description: "Full-duplex communication over TCP",
    pros: ["Low latency", "Full-duplex", "Efficient"],
    cons: ["Requires persistent connection", "Not HTTP-compatible"],
    useCase: "Real-time chat, live updates",
  },

  serverSentEvents: {
    description: "Server-to-client push over HTTP",
    pros: ["HTTP-compatible", "Simple", "Auto-reconnect"],
    cons: ["Server-to-client only", "Text-only"],
    useCase: "Notifications, live updates",
  },

  polling: {
    description: "Client requests updates periodically",
    pros: ["Simple", "HTTP-compatible"],
    cons: ["High latency", "High server load"],
    useCase: "Fallback when WebSockets not available",
  },

  longPolling: {
    description: "Client holds request open until server has data",
    pros: ["Lower latency than polling", "HTTP-compatible"],
    cons: ["Server resources", "Timeout handling"],
    useCase: "Real-time updates when WebSockets not available",
  },
};

// WebSocket Implementation
const WebSocket = require("ws");
const http = require("http");

const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Store connections
const connections = new Map(); // userId -> Set of WebSocket connections

wss.on("connection", (ws, req) => {
  const userId = getUserIdFromRequest(req);

  // Store connection
  if (!connections.has(userId)) {
    connections.set(userId, new Set());
  }
  connections.get(userId).add(ws);

  console.log(`User ${userId} connected`);

  // Handle incoming messages
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    handleMessage(userId, data);
  });

  // Handle disconnection
  ws.on("close", () => {
    connections.get(userId)?.delete(ws);
    console.log(`User ${userId} disconnected`);

    // Notify other users
    broadcastUserStatus(userId, "offline");
  });

  // Handle errors
  ws.on("error", (error) => {
    console.error(`WebSocket error for user ${userId}:`, error);
  });
});

// Handle messages
function handleMessage(userId, data) {
  switch (data.type) {
    case "message":
      handleDirectMessage(userId, data);
      break;
    case "group_message":
      handleGroupMessage(userId, data);
      break;
    case "typing":
      handleTypingIndicator(userId, data);
      break;
    case "read_receipt":
      handleReadReceipt(userId, data);
      break;
  }
}

// Send direct message
function handleDirectMessage(userId, data) {
  const message = {
    id: generateMessageId(),
    from: userId,
    to: data.to,
    content: data.content,
    timestamp: Date.now(),
    type: "direct",
  };

  // Save to database
  saveMessage(message);

  // Send to recipient
  const recipientConnections = connections.get(data.to);
  if (recipientConnections) {
    for (const ws of recipientConnections) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            type: "new_message",
            message,
          }),
        );
      }
    }
  }
}

// Send group message
function handleGroupMessage(userId, data) {
  const message = {
    id: generateMessageId(),
    from: userId,
    groupId: data.groupId,
    content: data.content,
    timestamp: Date.now(),
    type: "group",
  };

  // Save to database
  saveMessage(message);

  // Get group members
  const members = getGroupMembers(data.groupId);

  // Send to all members
  for (const memberId of members) {
    const memberConnections = connections.get(memberId);
    if (memberConnections) {
      for (const ws of memberConnections) {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(
            JSON.stringify({
              type: "new_message",
              message,
            }),
          );
        }
      }
    }
  }
}

// Handle typing indicator
function handleTypingIndicator(userId, data) {
  const typing = {
    userId,
    groupId: data.groupId,
    isTyping: data.isTyping,
    timestamp: Date.now(),
  };

  // Broadcast to group members
  if (data.groupId) {
    const members = getGroupMembers(data.groupId);
    for (const memberId of members) {
      if (memberId !== userId) {
        const memberConnections = connections.get(memberId);
        if (memberConnections) {
          for (const ws of memberConnections) {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(
                JSON.stringify({
                  type: "typing_indicator",
                  typing,
                }),
              );
            }
          }
        }
      }
    }
  }
}

// Broadcast user status
function broadcastUserStatus(userId, status) {
  const userStatus = {
    userId,
    status, // 'online', 'offline', 'away'
    timestamp: Date.now(),
  };

  // Get user's friends
  const friends = getUserFriends(userId);

  // Notify friends
  for (const friendId of friends) {
    const friendConnections = connections.get(friendId);
    if (friendConnections) {
      for (const ws of friendConnections) {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(
            JSON.stringify({
              type: "user_status",
              status: userStatus,
            }),
          );
        }
      }
    }
  }
}

// Start server
server.listen(3000, () => {
  console.log("WebSocket server running on port 3000");
});
```

### Best Practices:

1. **Handle disconnections**: Xử lý disconnections
2. **Reconnection logic**: Implement reconnection logic
3. **Message persistence**: Lưu trữ messages
4. **Heartbeat/ping**: Dùng heartbeat/ping

```javascript
// ✅ Nên: Handle disconnections
ws.on("close", () => {
  connections.get(userId)?.delete(ws);
});

// ✅ Nên: Implement reconnection logic
let reconnectAttempts = 0;
function connect() {
  const ws = new WebSocket("ws://localhost:3000");

  ws.on("open", () => {
    reconnectAttempts = 0;
  });

  ws.on("close", () => {
    setTimeout(
      () => {
        reconnectAttempts++;
        if (reconnectAttempts < 5) {
          connect();
        }
      },
      1000 * Math.pow(2, reconnectAttempts),
    );
  });
}

// ✅ Nên: Use heartbeat/ping
setInterval(() => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.ping();
  }
}, 30000);

// ❌ Không nên: Không handle disconnections
// Connection lost = user offline
```

---

## WebSockets vs Server-Sent Events?

**WebSockets** là full-duplex communication. **Server-Sent Events** là server-to-client push.

### Mục đích / Purpose

Chọn công nghệ phù hợp cho use case.

### Khi nào dùng / When to Use

| Use Case                | WebSockets | SSE |
| ----------------------- | ---------- | --- |
| Bi-directional          | ✅         | ❌  |
| - Server-to-client only | Limited    | ✅  |
| - Low latency           | ✅         | ✅  |
| - Binary data           | ✅         | ❌  |
| - HTTP-compatible       | ❌         | ✅  |

### Giúp ích gì / Benefits

- **WebSockets**: Full-duplex, low latency
- **SSE**: Simple, HTTP-compatible

### Ưu nhược điểm / Pros & Cons

| Feature        | WebSockets     | SSE              |
| -------------- | -------------- | ---------------- |
| Direction      | Bi-directional | Server-to-client |
| Protocol       | WebSocket      | HTTP             |
| Binary support | Yes            | No               |
| Auto-reconnect | No             | Yes              |
| Complexity     | High           | Low              |

### Ví dụ:

```javascript
// WebSocket Implementation
const WebSocket = require("ws");

class WebSocketChat {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.connections = new Map();

    this.wss.on("connection", (ws, req) => {
      const userId = this.getUserId(req);
      this.addConnection(userId, ws);

      ws.on("message", (data) => {
        this.handleMessage(userId, JSON.parse(data));
      });

      ws.on("close", () => {
        this.removeConnection(userId, ws);
      });
    });
  }

  getUserId(req) {
    // Extract user ID from request (cookie, token, etc.)
    return req.headers["x-user-id"];
  }

  addConnection(userId, ws) {
    if (!this.connections.has(userId)) {
      this.connections.set(userId, new Set());
    }
    this.connections.get(userId).add(ws);
  }

  removeConnection(userId, ws) {
    this.connections.get(userId)?.delete(ws);
  }

  handleMessage(userId, message) {
    // Handle message
    console.log(`Message from ${userId}:`, message);
  }

  sendToUser(userId, message) {
    const connections = this.connections.get(userId);
    if (connections) {
      for (const ws of connections) {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(message));
        }
      }
    }
  }
}

// Server-Sent Events Implementation
class SSEChat {
  constructor() {
    this.clients = new Map(); // userId -> Response
  }

  handleConnection(req, res) {
    const userId = this.getUserId(req);

    // Set SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");

    // Store client
    this.clients.set(userId, res);

    // Send initial data
    this.sendEvent(userId, "connected", { timestamp: Date.now() });

    // Handle client disconnect
    req.on("close", () => {
      this.clients.delete(userId);
    });
  }

  getUserId(req) {
    return req.headers["x-user-id"];
  }

  sendEvent(userId, event, data) {
    const res = this.clients.get(userId);
    if (res && !res.writableEnded) {
      res.write(`event: ${event}\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    }
  }

  broadcastToAll(event, data) {
    for (const [userId, res] of this.clients) {
      if (!res.writableEnded) {
        res.write(`event: ${event}\n`);
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      }
    }
  }
}

// Comparison
const comparison = {
  webSockets: {
    communication: "Bi-directional",
    protocol: "WebSocket (ws:// or wss://)",
    connection: "Persistent",
    pros: ["Full-duplex", "Low latency", "Binary support", "Efficient"],
    cons: [
      "Not HTTP-compatible",
      "Requires persistent connection",
      "No auto-reconnect",
    ],
    useCases: [
      "Real-time chat",
      "Collaborative editing",
      "Gaming",
      "Live trading",
    ],
  },

  sse: {
    communication: "Server-to-client only",
    protocol: "HTTP",
    connection: "Persistent",
    pros: [
      "HTTP-compatible",
      "Simple",
      "Auto-reconnect",
      "Works through proxies",
    ],
    cons: ["Server-to-client only", "No binary support", "Text-only"],
    useCases: ["Notifications", "Live updates", "Stock prices", "News feeds"],
  },
};

// Usage
// WebSocket server
const http = require("http");
const server = http.createServer();
const wsChat = new WebSocketChat(server);

// SSE server
const sseChat = new SSEChat();

// Express routes
const express = require("express");
const app = express();

// WebSocket endpoint (upgrade request)
app.get("/chat/ws", (req, res) => {
  // WebSocket upgrade is handled by WebSocket.Server
});

// SSE endpoint
app.get("/chat/sse", (req, res) => {
  sseChat.handleConnection(req, res);
});

// Send message via WebSocket (bi-directional)
app.post("/chat/send", (req, res) => {
  const { userId, message } = req.body;
  wsChat.sendToUser(userId, { type: "message", content: message });
  res.json({ success: true });
});

// Send notification via SSE (server-to-client)
app.post("/chat/notify", (req, res) => {
  const { userId, notification } = req.body;
  sseChat.sendEvent(userId, "notification", notification);
  res.json({ success: true });
});

// Broadcast to all via SSE
app.post("/chat/broadcast", (req, res) => {
  const { event, data } = req.body;
  sseChat.broadcastToAll(event, data);
  res.json({ success: true });
});
```

### Best Practices:

1. **Use WebSockets for bi-directional**: Dùng WebSockets cho bi-directional
2. **Use SSE for server-to-client**: Dùng SSE cho server-to-client
3. **Handle reconnection**: Xử lý reconnection
4. **Use heartbeat/ping**: Dùng heartbeat/ping

```javascript
// ✅ Nên: WebSockets cho real-time chat
const ws = new WebSocket("ws://localhost:3000");
ws.on("message", (data) => {
  console.log("Received:", data);
});
ws.send(JSON.stringify({ type: "message", content: "Hello" }));

// ✅ Nên: SSE cho notifications
const eventSource = new EventSource("/notifications/sse");
eventSource.addEventListener("notification", (event) => {
  console.log("Notification:", JSON.parse(event.data));
});

// ✅ Nên: Implement reconnection logic
function connectWebSocket() {
  const ws = new WebSocket("ws://localhost:3000");

  ws.on("close", () => {
    setTimeout(connectWebSocket, 1000);
  });
}

// ❌ Không nên: Dùng SSE cho bi-directional
// SSE chỉ server-to-client
```

---

## Storing messages?

**Message storage** là lưu trữ messages để retrieve và search.

### Mục đích / Purpose

Persist messages cho retrieval và search.

### Khi nào dùng / When to Use

| Tình huống        | Khi nào dùng            |
| ----------------- | ----------------------- |
| - Message history | Khi cần message history |
| - Search          | Khi cần search messages |
| - Offline access  | Khi cần offline access  |
| - Compliance      | Khi cần compliance      |

### Giúp ích gì / Benefits

- **Persistence**: Messages được lưu trữ
- **Search**: Có thể search messages
- **History**: Có thể xem history
- **Compliance**: Đảm bảo compliance

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm       |
| --------------------- | ---------------- |
| - Message persistence | Storage cost     |
| - Search capabilities | Query complexity |
| - History access      | Data retention   |
| - Compliance          | Privacy concerns |

### Ví dụ:

```javascript
// Message Storage Schema
const messageSchema = {
  messages: {
    id: "SERIAL PRIMARY KEY",
    conversationId: "VARCHAR(50) NOT NULL",
    senderId: "INTEGER NOT NULL",
    content: "TEXT NOT NULL",
    messageType: "VARCHAR(20) NOT NULL", // 'text', 'image', 'video', 'file'
    mediaUrl: "VARCHAR(500)",
    timestamp: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    isRead: "BOOLEAN DEFAULT FALSE",
    isDeleted: "BOOLEAN DEFAULT FALSE",
    indexes: [
      "CREATE INDEX idx_conversationId ON messages(conversationId, timestamp DESC)",
      "CREATE INDEX idx_senderId ON messages(senderId)",
      "CREATE INDEX idx_timestamp ON messages(timestamp DESC)",
    ],
  },

  conversations: {
    id: "SERIAL PRIMARY KEY",
    type: "VARCHAR(20) NOT NULL", // 'direct', 'group'
    participants: "JSONB NOT NULL", // Array of user IDs
    createdAt: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    updatedAt: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    lastMessageAt: "TIMESTAMP",
    indexes: [
      "CREATE INDEX idx_participants ON conversations USING GIN(participants)",
      "CREATE INDEX idx_updatedAt ON conversations(updatedAt DESC)",
    ],
  },

  readReceipts: {
    id: "SERIAL PRIMARY KEY",
    messageId: "INTEGER NOT NULL",
    userId: "INTEGER NOT NULL",
    readAt: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    uniqueConstraint: "UNIQUE(messageId, userId)",
    indexes: [
      "CREATE INDEX idx_messageId ON readReceipts(messageId)",
      "CREATE INDEX idx_userId ON readReceipts(userId)",
    ],
  },
};

// Message Storage Service
class MessageStorage {
  constructor(database, cache) {
    this.database = database;
    this.cache = cache;
  }

  async saveMessage(message) {
    // Save to database
    const saved = await this.database.insert("messages", message);

    // Update conversation last message time
    await this.database.update(
      "conversations",
      { lastMessageAt: message.timestamp },
      { id: message.conversationId },
    );

    // Invalidate cache
    await this.cache.del(`conversation:${message.conversationId}`);

    return saved;
  }

  async getMessages(conversationId, options = {}) {
    const cacheKey = `conversation:${conversationId}`;

    // Check cache first
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch from database
    const messages = await this.database.query(
      `SELECT * FROM messages
       WHERE conversationId = $1
         AND isDeleted = FALSE
       ORDER BY timestamp DESC
       LIMIT $2 OFFSET $3`,
      [conversationId, options.limit || 50, options.offset || 0],
    );

    // Cache results
    await this.cache.set(cacheKey, messages, { ttl: 300 }); // 5 minutes

    return messages;
  }

  async markAsRead(messageId, userId) {
    // Update message read status
    await this.database.update("messages", { isRead: true }, { id: messageId });

    // Save read receipt
    await this.database.insert("readReceipts", {
      messageId,
      userId,
      readAt: new Date(),
    });

    // Invalidate cache
    await this.cache.del(`conversation:${messageId}`);

    // Notify sender
    await this.notifyReadReceipt(messageId, userId);
  }

  async deleteMessage(messageId, userId) {
    // Soft delete
    await this.database.update(
      "messages",
      { isDeleted: true, deletedBy: userId, deletedAt: new Date() },
      { id: messageId },
    );

    // Invalidate cache
    await this.cache.del(`conversation:${messageId}`);
  }

  async searchMessages(userId, query, options = {}) {
    // Search messages
    const results = await this.database.query(
      `SELECT m.*, c.type as conversationType
       FROM messages m
       JOIN conversations c ON m.conversationId = c.id
       WHERE c.participants @> $1
         AND m.content ILIKE $2
         AND m.isDeleted = FALSE
         AND m.timestamp >= $3
       ORDER BY m.timestamp DESC
       LIMIT $4`,
      [
        JSON.stringify([userId]),
        `%${query}%`,
        options.since || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        options.limit || 50,
      ],
    );

    return results;
  }

  async getConversations(userId, options = {}) {
    // Get user's conversations
    const conversations = await this.database.query(
      `SELECT c.*, m.content as lastMessage, m.senderId as lastMessageSender, m.timestamp as lastMessageAt
       FROM conversations c
       JOIN messages m ON c.id = m.conversationId
       WHERE c.participants @> $1
         AND m.isDeleted = FALSE
       ORDER BY c.lastMessageAt DESC
       LIMIT $2 OFFSET $3`,
      [JSON.stringify([userId]), options.limit || 20, options.offset || 0],
    );

    return conversations;
  }

  async getUnreadCount(userId) {
    // Get unread message count
    const result = await this.database.query(
      `SELECT COUNT(*) as count
       FROM messages m
       JOIN conversations c ON m.conversationId = c.id
       WHERE c.participants @> $1
         AND m.senderId != $1
         AND m.isRead = FALSE
         AND m.isDeleted = FALSE`,
      [userId],
    );

    return result[0].count;
  }

  async notifyReadReceipt(messageId, userId) {
    // Notify sender about read receipt
    const message = await this.database.query(
      "SELECT * FROM messages WHERE id = $1",
      [messageId],
    );

    if (message && message.senderId !== userId) {
      // Send notification via WebSocket
      const connections = this.connections.get(message.senderId);
      if (connections) {
        for (const ws of connections) {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(
              JSON.stringify({
                type: "read_receipt",
                messageId,
                readBy: userId,
                readAt: new Date(),
              }),
            );
          }
        }
      }
    }
  }
}

// Usage
const messageStorage = new MessageStorage(database, redis);

// Save message
await messageStorage.saveMessage({
  conversationId: "conv123",
  senderId: 456,
  content: "Hello!",
  messageType: "text",
  timestamp: new Date(),
});

// Get messages
const messages = await messageStorage.getMessages("conv123", { limit: 50 });

// Mark as read
await messageStorage.markAsRead(789, 456);

// Search messages
const results = await messageStorage.searchMessages(456, "hello", {
  limit: 20,
});

// Get conversations
const conversations = await messageStorage.getConversations(456, { limit: 20 });

// Get unread count
const unreadCount = await messageStorage.getUnreadCount(456);
```

### Best Practices:

1. **Use pagination**: Dùng pagination
2. **Cache recent messages**: Cache recent messages
3. **Soft delete**: Dùng soft delete
4. **Index properly**: Index properly

```javascript
// ✅ Nên: Use pagination
const messages = await getMessages(conversationId, { limit: 50, offset: 0 });

// ✅ Nên: Cache recent messages
await cache.set(`conversation:${id}`, messages, { ttl: 300 });

// ✅ Nên: Soft delete
await database.update('messages', { isDeleted: true }, { id });

// ✅ Nên: Index properly
CREATE INDEX idx_conversation_timestamp ON messages(conversationId, timestamp DESC);

// ❌ Không nên: Load all messages at once
const messages = await database.query('SELECT * FROM messages WHERE conversationId = ?', [id]);
// Too many messages, slow query
```

---

## References

- [WebSocket RFC](https://tools.ietf.org/html/rfc6455)
- [Server-Sent Events MDN](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [Real-time Chat Architecture](https://www.youtube.com/watch?v=Z2X4eK3xOc)
