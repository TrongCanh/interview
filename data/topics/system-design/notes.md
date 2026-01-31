# System Design Interview Notes / Ghi chú Phỏng vấn System Design

> Ghi chú câu trả lời cho các câu hỏi phỏng vấn System Design / Notes for System Design interview answers

---

## 🏗️ Cơ bản / Basics

### 1. System Design Fundamentals

**Scalability:**

- **Vertical Scaling**: Add more resources to single server (CPU, RAM)
  - Pros: Simple, no code changes
  - Cons: Limited, single point of failure
- **Horizontal Scaling**: Add more servers
  - Pros: Unlimited, fault tolerance
  - Cons: Complex, load balancing needed

**Availability vs Reliability:**

- **Availability**: System is operational when needed (uptime %)
- **Reliability**: System performs correctly over time

**CAP Theorem:**

- **Consistency**: All nodes see same data simultaneously
- **Availability**: Every request gets response (success/failure)
- **Partition Tolerance**: System continues despite network failures
- Can only pick 2 out of 3

### 2. Load Balancing

**Algorithms:**

- **Round Robin**: Distribute sequentially
- **Least Connections**: Route to server with fewest connections
- **IP Hash**: Route based on client IP (session stickiness)
- **Weighted Round Robin**: Based on server capacity

**L4 vs L7:**

- **L4 (Transport)**: IP, port - faster, less flexible
- **L7 (Application)**: HTTP content - smarter, slower

### 3. Caching

**Strategies:**

- **Cache Aside**: Application manages cache
- **Read Through**: Cache manages loading
- **Write Through**: Write to cache + DB
- **Write Back**: Write to cache, async to DB

**Invalidation:**

- Time-based (TTL)
- Event-based (on update)
- Cache stampede prevention

**Redis vs Memcached:**
| Feature | Redis | Memcached |
|---------|-------|-----------|
| Data types | Rich (strings, lists, sets, etc.) | Simple (strings) |
| Persistence | Yes | No |
| Replication | Yes | No |
| Memory usage | Higher | Lower |

### 4. Database Design

**SQL vs NoSQL:**
| Aspect | SQL | NoSQL |
|--------|-----|-------|
| Schema | Fixed | Flexible |
| Scale | Vertical | Horizontal |
| Transactions | ACID | BASE |
| Query | SQL | Various |
| Use case | Structured data | Unstructured, high scale |

**ACID:**

- **Atomicity**: All or nothing
- **Consistency**: Valid state transition
- **Isolation**: Concurrent transactions don't interfere
- **Durability**: Committed data persists

**Indexing:**

- B-Tree for range queries
- Hash for exact match
- Composite indexes for multiple columns

**Sharding vs Replication:**

- **Sharding**: Split data across servers (scale writes)
- **Replication**: Copy data across servers (scale reads, HA)

### 5. Message Queues

**When to use:**

- Decouple services
- Async processing
- Rate limiting
- Buffer spikes

**Kafka vs RabbitMQ vs SQS:**
| Feature | Kafka | RabbitMQ | SQS |
|---------|-------|----------|-----|
| Throughput | Very high | Medium | High |
| Ordering | Per partition | Per queue | FIFO only |
| Retention | Configurable | No | 4 days |
| Managed | Self-hosted | Self-hosted | AWS |

---

## 🌐 Common System Design Problems

### 6. URL Shortener (TinyURL)

**Requirements:**

- Generate short URL from long URL
- Redirect short URL to long URL
- High availability
- Low latency

**Design:**

```
Client → Load Balancer → API Server → Redis (cache) → DB
                              ↓
                          Hash Function
```

**Hash Function:**

- Base62 encoding (0-9, a-z, A-Z)
- MD5/SHA-256 + truncate
- Counter-based (predictable)

**Handling Collisions:**

- Open addressing
- Chaining
- Use longer hash

**Database Schema:**

```sql
CREATE TABLE urls (
    id BIGINT PRIMARY KEY,
    short_code VARCHAR(10) UNIQUE,
    long_url TEXT,
    created_at TIMESTAMP,
    expires_at TIMESTAMP
);
```

### 7. Rate Limiter

**Algorithms:**

- **Token Bucket**: Tokens refill at fixed rate
- **Leaky Bucket**: Requests drain at fixed rate
- **Fixed Window**: Count per time window
- **Sliding Window**: Rolling time window

**Implementation (Token Bucket):**

```javascript
class RateLimiter {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  allow() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(
      this.capacity,
      this.tokens + elapsed * this.refillRate,
    );
    this.lastRefill = now;

    if (this.tokens >= 1) {
      this.tokens--;
      return true;
    }
    return false;
  }
}
```

**Distributed Rate Limiting:**

- Redis with atomic operations
- `INCR` + `EXPIRE`
- Consistent hashing

### 8. Chat System

**Components:**

- WebSocket server
- Message broker (Kafka)
- Database (MongoDB/Cassandra)
- Cache (Redis)

**Real-time Communication:**

- **WebSockets**: Bidirectional, persistent
- **Server-Sent Events**: Server to client only
- **Polling**: Client requests periodically

**Storing Messages:**

```javascript
{
    messageId: "uuid",
    conversationId: "uuid",
    senderId: "uuid",
    content: "text",
    timestamp: "ISO8601",
    status: "sent/delivered/read"
}
```

### 9. News Feed

**Approaches:**

- **Fanout on Write**: Pre-compute for all followers
  - Pros: Fast read
  - Cons: Slow write for popular users
- **Fanout on Read**: Compute on demand
  - Pros: Fast write
  - Cons: Slow read
- **Hybrid**: Mix of both

**Caching:**

- Cache top N posts
- Cache user's feed
- Invalidate on new post

### 10. File Storage System

**Components:**

- Upload service
- Storage service (S3)
- Metadata DB
- CDN

**Chunking:**

- Split large files into chunks
- Parallel upload/download
- Resume capability

**Deduplication:**

- Content-addressable storage (hash-based)
- Save storage space

### 11. E-commerce System

**Components:**

- Product catalog service
- Inventory service
- Order service
- Payment service
- User service

**Inventory Management:**

- Optimistic locking
- Message queue for updates
- Cache product availability

**Order Processing:**

```
Create Order → Reserve Inventory → Process Payment → Confirm Order
                ↓ (if fail)
           Release Inventory
```

### 12. Streaming System

**Components:**

- Upload service
- Transcoding service
- Storage service
- CDN
- Streaming server

**Adaptive Bitrate:**

- Multiple quality versions
- Client switches based on bandwidth
- HLS/DASH protocols

### 13. Social Network

**User Profiles:**

- Basic info
- Privacy settings
- Activity feed

**Friend Relationships:**

- Follow model (Twitter)
- Friend model (Facebook)
- Graph database (Neo4j)

**News Feed Generation:**

- Merge posts from friends
- Rank by relevance
- Apply filters

### 14. Search Engine

**Components:**

- Crawler
- Indexer
- Search service
- Ranker

**Inverted Index:**

```
Term → [doc1, doc2, doc3]
```

**Ranking:**

- TF-IDF
- PageRank
- Machine learning models

### 15. Payment System

**Requirements:**

- Consistent transactions
- Idempotency
- Audit trail
- Security (PCI DSS)

**Idempotency:**

- Unique transaction ID
- Check before processing
- Store transaction status

**Handling Failures:**

- Retry with exponential backoff
- Dead letter queue
- Manual reconciliation

---

## 📐 System Design Framework

**4-Step Approach:**

1. **Understand Requirements**
   - Functional requirements
   - Non-functional requirements (scale, latency, availability)
   - Constraints

2. **High-Level Design**
   - Identify key components
   - Define data flow
   - Choose technologies

3. **Deep Dive**
   - Database schema
   - API design
   - Caching strategy
   - Scaling approach

4. **Bottlenecks & Trade-offs**
   - Identify bottlenecks
   - Propose solutions
   - Discuss trade-offs

---

_Last updated: 2026-01-30_
