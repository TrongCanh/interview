# System Design Interview Questions / Câu hỏi Phỏng vấn System Design

> Danh sách câu hỏi phỏng vấn về System Design / List of System Design interview questions

---

## 🏗️ Cơ bản / Basics

### 1. System Design Fundamentals

- Scalability là gì? Vertical vs Horizontal scaling?
- Availability vs Reliability?
- CAP Theorem là gì?
- Consistency models: Strong, Eventual, Causal?
- Latency vs Throughput?
- How to estimate system capacity?
- What is QPS (Queries Per Second)?
- How to handle system failures?
- Graceful degradation strategies?
- Circuit breaker pattern?

### 2. Load Balancing

- Load balancer là gì?
- Algorithms: Round Robin, Least Connections, IP Hash?
- L4 vs L7 load balancer?
- Health check mechanisms?
- Session persistence / Sticky sessions?
- Load balancer placement?
- Global Server Load Balancing (GSLB)?
- DNS load balancing vs Application load balancing?
- Connection draining?
- How to handle load balancer failures?

### 3. Caching

- Caching strategies?
- Cache invalidation?
- Redis vs Memcached?
- Cache aside, Read through, Write through, Write back?
- Cache eviction policies: LRU, LFU, FIFO?
- Distributed caching?
- Cache warming?
- Cache stampede prevention?
- CDN caching?
- Browser caching strategies?

### 4. Database Design

- SQL vs NoSQL?
- ACID properties?
- Indexing strategies?
- Sharding vs Replication?
- Master-slave replication?
- Database partitioning?
- Consistent hashing?
- Read replicas?
- Connection pooling?
- Database transactions isolation levels?
- Optimistic vs Pessimistic locking?
- Database normalization vs denormalization?

### 5. Message Queues

- Khi nào nên dùng message queue?
- Kafka vs RabbitMQ vs SQS?
- Publisher-Subscriber pattern?
- Message ordering?
- At-least-once vs At-most-once vs Exactly-once delivery?
- Dead letter queues?
- Message batching?
- Backpressure handling?
- Message durability?
- Consumer groups?
- Message filtering?

### 6. Microservices Architecture

- Monolith vs Microservices?
- Service discovery?
- API Gateway?
- Service mesh?
- Inter-service communication: REST vs gRPC?
- Distributed tracing?
- Service deployment strategies?
- Data consistency across services?
- Circuit breaker in microservices?
- Service versioning?

### 7. Security & Authentication

- Authentication vs Authorization?
- OAuth 2.0 flow?
- JWT vs Session-based auth?
- API security best practices?
- Rate limiting for security?
- DDoS protection?
- Data encryption at rest and in transit?
- HTTPS/TLS termination?
- Secrets management?
- OWASP Top 10 vulnerabilities?

### 8. Monitoring & Observability

- Monitoring vs Observability?
- Metrics, Logs, Traces (The Three Pillars)?
- APM (Application Performance Monitoring)?
- Alerting strategies?
- SLA, SLO, SLI?
- Distributed tracing tools?
- Log aggregation?
- Error tracking?
- Uptime monitoring?
- Synthetic monitoring?

---

## 🌐 Common System Design Problems

### 9. URL Shortener (TinyURL)

- Thiết kế URL shortener
- Hash function?
- Handling collisions?
- Base62 encoding?
- Analytics and tracking?
- Custom short URLs?
- Expiration of URLs?
- Rate limiting for URL creation?
- Distributed ID generation?
- Storage optimization?

### 10. Rate Limiter

- Token bucket vs Leaky bucket?
- Fixed window vs Sliding window?
- Distributed rate limiting?
- Rate limiting at different layers?
- How to handle burst traffic?
- Rate limiting algorithms comparison?
- Redis-based rate limiting?
- Per-user vs Per-IP rate limiting?
- Rate limiting for APIs?
- Graceful handling of rate limit exceeded?

### 11. Chat System

- Real-time communication?
- WebSockets vs Server-Sent Events?
- Storing messages?
- Message delivery guarantees?
- Online/offline status?
- Group chats vs Direct messages?
- Message encryption?
- Media sharing?
- Read receipts?
- Typing indicators?
- Message search?

### 12. News Feed

- Generate news feed?
- Fanout on write vs Fanout on read?
- Caching strategies?
- Ranking algorithms?
- Handling large user bases?
- Feed pagination?
- Real-time feed updates?
- Content filtering?
- Personalization?
- Handling viral content?
- Story features?

### 13. File Storage System

- Upload/download files?
- Chunking?
- Deduplication?
- File versioning?
- Access control?
- CDN integration?
- Thumbnail generation?
- File compression?
- Large file handling?
- Storage tiers (Hot/Cold)?

### 14. E-commerce System

- Product catalog?
- Inventory management?
- Order processing?
- Shopping cart design?
- Payment integration?
- Search functionality?
- Recommendation engine?
- Flash sale handling?
- Order tracking?
- Returns and refunds?

### 15. Streaming System

- Video streaming?
- Adaptive bitrate?
- CDN integration?
- Live streaming vs VOD?
- Video transcoding?
- DRM protection?
- Playback synchronization?
- Buffer management?
- Quality of Service (QoS)?
- Multi-language support?

### 16. Social Network

- User profiles?
- Friend relationships?
- News feed generation?
- Graph database usage?
- Privacy controls?
- Blocking and muting?
- Content moderation?
- Notification system?
- Search and discovery?
- Analytics and insights?

### 17. Search Engine

- Inverted index?
- Ranking algorithm?
- Distributed search?
- Query processing?
- Spell correction?
- Auto-complete?
- Faceted search?
- Search relevance?
- Handling synonyms?
- Real-time indexing?

### 18. Payment System

- Transaction processing?
- Idempotency?
- Handling failures?
- PCI DSS compliance?
- Fraud detection?
- Payment gateway integration?
- Multi-currency support?
- Refund processing?
- Transaction history?
- Webhook handling?

### 19. Notification System

- Push notifications?
- Email notifications?
- SMS notifications?
- In-app notifications?
- Notification preferences?
- Batching notifications?
- Delivery tracking?
- Template management?
- Rate limiting?
- Cross-platform support?

### 20. API Gateway

- API Gateway patterns?
- Request routing?
- Rate limiting at gateway?
- Authentication and authorization?
- Request/response transformation?
- Caching at gateway level?
- API versioning?
- Logging and monitoring?
- Circuit breaking?
- GraphQL gateway?

### 21. Logging System

- Log collection?
- Log parsing?
- Log storage?
- Log search and analysis?
- Distributed logging?
- Log retention policies?
- Structured logging?
- Log levels?
- Real-time log monitoring?
- Log aggregation tools?

### 22. Distributed Lock

- When to use distributed locks?
- Redis-based distributed locks?
- ZooKeeper for distributed locking?
- Lock expiration?
- Deadlock prevention?
- Redlock algorithm?
- Lock granularity?
- Lock ownership?
- Lock renewal?
- Fencing tokens?

### 23. Data Replication

- Synchronous vs Asynchronous replication?
- Multi-master replication?
- Conflict resolution?
- Replication lag?
- Consistency in replication?
- Quorum-based replication?
- Geo-replication?
- Replication topologies?
- Failover strategies?
- Data consistency models?

### 24. Content Delivery Network (CDN)

- How CDN works?
- Edge locations?
- Cache invalidation in CDN?
- CDN selection criteria?
- Dynamic content caching?
- CDN security?
- Multi-CDN strategies?
- CDN performance monitoring?
- Origin protection?
- CDN pricing models?

### 25. Database Migration

- Zero-downtime migration?
- Data consistency during migration?
- Rollback strategies?
- Schema migration tools?
- Data validation after migration?
- Performance impact during migration?
- Migration testing?
- Blue-green deployment for databases?
- Canary migration?
- Post-migration optimization?

---

## 🔗 Resources / Tài liệu tham khảo

- [System Design Primer](https://github.com/donnemartin/system-design-primer)
- [The System Design Interview](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)
- [High Scalability](https://highscalability.com/)
- [Designing Data-Intensive Applications](https://dataintensive.net/)
- [System Design Interview - An Insider's Guide](https://www.amazon.com/System-Design-Interview-Insiders-Guide/dp/1736049119)
