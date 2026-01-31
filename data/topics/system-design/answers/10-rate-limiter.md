# 10. Rate Limiter

## Tổng quan về Rate Limiter

### Mục đích của Rate Limiter / Purpose

**Rate Limiter** là một component giới hạn số lượng requests mà một user hoặc client có thể thực hiện trong một khoảng thời gian.

**Mục đích chính:**

- Bảo vệ system khỏi abuse
- Đảm bảo fair resource allocation
- Ngăn DDoS attacks
- Tăng availability
- Implement usage quotas

### Khi nào cần hiểu về Rate Limiter / When to Use

Hiểu về Rate Limiter là cần thiết khi:

- Thiết kế public APIs
- Xử lý high traffic
- Cần bảo vệ khỏi abuse
- Implement usage quotas
- Ngăn DDoS attacks

### Giúp ích gì / Benefits

**Lợi ích:**

- **Protection**: Bảo vệ system khỏi abuse
- **Fairness**: Đảm bảo fair resource allocation
- **Availability**: Tăng availability
- **Cost control**: Kiểm soát chi phí
- **DDoS protection**: Ngăn DDoS attacks

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm             |
| ------------------- | ---------------------- |
| - Bảo vệ system     | Thêm complexity        |
| - Tăng availability | False positives        |
| - Cost control      | Performance overhead   |
| - DDoS protection   | Distributed challenges |

---

## Token bucket vs Leaky bucket?

**Token bucket** và **Leaky bucket** là hai algorithms phổ biến cho rate limiting.

### Mục đích / Purpose

Giới hạn rate requests trong khi cho phép burst traffic.

### Khi nào dùng / When to Use

| Algorithm    | Khi nào dùng                |
| ------------ | --------------------------- |
| Token bucket | Khi cần allow burst traffic |
| Leaky bucket | Khi cần smooth output rate  |

### Giúp ích gì / Benefits

- **Token bucket**: Allow burst, flexible
- **Leaky bucket**: Smooth rate, predictable

### Ưu nhược điểm / Pros & Cons

| Feature        | Token Bucket      | Leaky Bucket    |
| -------------- | ----------------- | --------------- |
| Burst handling | Allows burst      | Smooths burst   |
| Complexity     | Medium            | Low             |
| Memory         | Fixed             | Fixed           |
| Use case       | API rate limiting | Traffic shaping |

### Ví dụ:

```javascript
// Token Bucket Algorithm
class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity; // Maximum tokens
    this.refillRate = refillRate; // Tokens per second
    this.tokens = capacity; // Current tokens
    this.lastRefill = Date.now();
  }

  async consume(tokens = 1) {
    // Refill tokens
    this.refill();

    // Check if enough tokens
    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return { allowed: true, remaining: this.tokens };
    }

    return {
      allowed: false,
      remaining: this.tokens,
      retryAfter: this.getRetryAfter(tokens),
    };
  }

  refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000; // seconds

    if (elapsed > 0) {
      const newTokens = elapsed * this.refillRate;
      this.tokens = Math.min(this.capacity, this.tokens + newTokens);
      this.lastRefill = now;
    }
  }

  getRetryAfter(tokens) {
    const needed = tokens - this.tokens;
    return needed / this.refillRate;
  }
}

// Leaky Bucket Algorithm
class LeakyBucket {
  constructor(capacity, leakRate) {
    this.capacity = capacity; // Maximum tokens
    this.leakRate = leakRate; // Tokens per second
    this.tokens = 0; // Current tokens
    this.lastLeak = Date.now();
  }

  async add(tokens = 1) {
    // Leak tokens
    this.leak();

    // Check if bucket is full
    if (this.tokens + tokens <= this.capacity) {
      this.tokens += tokens;
      return { allowed: true, remaining: this.capacity - this.tokens };
    }

    return {
      allowed: false,
      remaining: this.capacity - this.tokens,
      retryAfter: this.getRetryAfter(tokens),
    };
  }

  leak() {
    const now = Date.now();
    const elapsed = (now - this.lastLeak) / 1000; // seconds

    if (elapsed > 0) {
      const leaked = elapsed * this.leakRate;
      this.tokens = Math.max(0, this.tokens - leaked);
      this.lastLeak = now;
    }
  }

  getRetryAfter(tokens) {
    const needed = this.tokens + tokens - this.capacity;
    return needed / this.leakRate;
  }
}

// Comparison
const comparison = {
  tokenBucket: {
    description: "Tokens are added at a fixed rate, consumed by requests",
    parameters: {
      capacity: "Maximum tokens in bucket",
      refillRate: "Tokens added per second",
    },
    behavior: {
      refill: "Tokens added continuously",
      consume: "Tokens removed on request",
      overflow: "Excess tokens discarded",
    },
    pros: ["Allows burst traffic", "Flexible", "Good for API rate limiting"],
    cons: ["More complex", "Burst may deplete tokens"],
    useCases: [
      "API rate limiting",
      "Allow burst traffic",
      "Throttling with burst allowance",
    ],
  },

  leakyBucket: {
    description: "Requests are added to bucket, leak out at fixed rate",
    parameters: {
      capacity: "Maximum tokens in bucket",
      leakRate: "Tokens removed per second",
    },
    behavior: {
      add: "Tokens added on request",
      leak: "Tokens removed continuously",
      overflow: "Excess requests rejected",
    },
    pros: ["Simple", "Predictable output rate", "Good for traffic shaping"],
    cons: ["Doesn't allow burst", "Requests may queue"],
    useCases: ["Traffic shaping", "Network throttling", "Smooth output rate"],
  },
};

// Usage Examples
// Token Bucket for API Rate Limiting
const tokenBucket = new TokenBucket(100, 10); // 100 capacity, 10 tokens/second

app.use(async (req, res, next) => {
  const result = await tokenBucket.consume(1); // 1 token per request

  if (!result.allowed) {
    res.setHeader("X-RateLimit-Limit", 100);
    res.setHeader("X-RateLimit-Remaining", result.remaining);
    res.setHeader(
      "X-RateLimit-Reset",
      Math.ceil(Date.now() / 1000) + result.retryAfter,
    );
    return res
      .status(429)
      .json({ error: "Rate limit exceeded", retryAfter: result.retryAfter });
  }

  res.setHeader("X-RateLimit-Limit", 100);
  res.setHeader("X-RateLimit-Remaining", result.remaining);
  next();
});

// Leaky Bucket for Traffic Shaping
const leakyBucket = new LeakyBucket(100, 10); // 100 capacity, 10 tokens/second

app.use(async (req, res, next) => {
  const result = await leakyBucket.add(1); // 1 token per request

  if (!result.allowed) {
    res.setHeader("X-RateLimit-Limit", 100);
    res.setHeader("X-RateLimit-Remaining", result.remaining);
    return res
      .status(429)
      .json({ error: "Rate limit exceeded", retryAfter: result.retryAfter });
  }

  res.setHeader("X-RateLimit-Limit", 100);
  res.setHeader("X-RateLimit-Remaining", result.remaining);
  next();
});
```

### Best Practices:

1. **Choose algorithm based on use case**: Chọn algorithm phù hợp
2. **Set appropriate parameters**: Đặt parameters phù hợp
3. **Return rate limit headers**: Return rate limit headers
4. **Log rate limit events**: Log rate limit events

```javascript
// ✅ Nên: Token bucket cho API rate limiting
const tokenBucket = new TokenBucket(100, 10);

// ✅ Nên: Return rate limit headers
res.setHeader("X-RateLimit-Limit", 100);
res.setHeader("X-RateLimit-Remaining", remaining);

// ✅ Nên: Leaky bucket cho traffic shaping
const leakyBucket = new LeakyBucket(100, 10);

// ❌ Không nên: Không return rate limit headers
if (!allowed) {
  return res.status(429).json({ error: "Rate limit exceeded" });
  // User doesn't know when to retry
}
```

---

## Fixed window vs Sliding window?

**Fixed window** và **Sliding window** là hai methods để count requests trong một khoảng thời gian.

### Mục đích / Purpose

Count requests trong một khoảng thời gian để enforce rate limits.

### Khi nào dùng / When to Use

| Method         | Khi nào dùng                      |
| -------------- | --------------------------------- |
| Fixed window   | Đơn giản, không cần precision     |
| Sliding window | Cần precision, avoid edge effects |

### Giúp ích gì / Benefits

- **Fixed window**: Đơn giản, dễ implement
- **Sliding window**: Precision cao, avoid edge effects

### Ưu nhược điểm / Pros & Cons

| Feature      | Fixed Window | Sliding Window |
| ------------ | ------------ | -------------- |
| Complexity   | Low          | High           |
| Precision    | Low          | High           |
| Edge effects | Yes          | No             |
| Memory       | Low          | Higher         |

### Ví dụ:

```javascript
// Fixed Window Rate Limiter
class FixedWindowRateLimiter {
  constructor(maxRequests, windowSeconds) {
    this.maxRequests = maxRequests;
    this.windowSeconds = windowSeconds;
    this.requests = new Map(); // key -> count
  }

  async check(key) {
    const now = Date.now();
    const windowStart = now - this.windowSeconds * 1000;

    // Get or create request count
    let count = this.requests.get(key) || { count: 0, windowStart };

    // Reset if window expired
    if (count.windowStart < windowStart) {
      count = { count: 0, windowStart: now };
    }

    // Check if limit exceeded
    if (count.count >= this.maxRequests) {
      const resetTime = count.windowStart + this.windowSeconds * 1000;
      const retryAfter = Math.ceil((resetTime - now) / 1000);
      return { allowed: false, retryAfter };
    }

    // Increment count
    count.count++;
    this.requests.set(key, count);

    return { allowed: true, remaining: this.maxRequests - count.count };
  }
}

// Sliding Window Rate Limiter
class SlidingWindowRateLimiter {
  constructor(maxRequests, windowSeconds) {
    this.maxRequests = maxRequests;
    this.windowSeconds = windowSeconds;
    this.requests = new Map(); // key -> array of timestamps
  }

  async check(key) {
    const now = Date.now();
    const windowStart = now - this.windowSeconds * 1000;

    // Get or create request timestamps
    let timestamps = this.requests.get(key) || [];

    // Remove old requests outside window
    timestamps = timestamps.filter((t) => t > windowStart);

    // Check if limit exceeded
    if (timestamps.length >= this.maxRequests) {
      const oldestRequest = timestamps[0];
      const retryAfter = Math.ceil(
        (oldestRequest + this.windowSeconds * 1000 - now) / 1000,
      );
      return { allowed: false, retryAfter };
    }

    // Add current request
    timestamps.push(now);
    this.requests.set(key, timestamps);

    return { allowed: true, remaining: this.maxRequests - timestamps.length };
  }
}

// Comparison
const comparison = {
  fixedWindow: {
    description: "Count requests in fixed time windows",
    example: "100 requests per minute",
    reset: "Resets at the start of each window",
    pros: ["Simple", "Easy to understand", "Low memory usage"],
    cons: [
      "Edge effects at window boundaries",
      "Burst at start of window",
      "Lower precision",
    ],
    useCases: ["Simple rate limiting", "When precision is not critical"],
  },

  slidingWindow: {
    description: "Count requests in sliding time window",
    example: "100 requests in any 1-minute period",
    reset: "Continuously slides window",
    pros: ["No edge effects", "Higher precision", "Smoother rate limiting"],
    cons: ["More complex", "Higher memory usage", "More computation"],
    useCases: [
      "Precise rate limiting",
      "When edge effects are problematic",
      "API rate limiting",
    ],
  },
};

// Usage Examples
// Fixed Window
const fixedLimiter = new FixedWindowRateLimiter(100, 60); // 100 requests per minute

app.use(async (req, res, next) => {
  const key = req.ip; // or req.user.id

  const result = await fixedLimiter.check(key);

  if (!result.allowed) {
    res.setHeader("X-RateLimit-Limit", 100);
    res.setHeader("X-RateLimit-Remaining", 0);
    res.setHeader(
      "X-RateLimit-Reset",
      Math.ceil((Date.now() + result.retryAfter * 1000) / 1000),
    );
    return res
      .status(429)
      .json({ error: "Rate limit exceeded", retryAfter: result.retryAfter });
  }

  res.setHeader("X-RateLimit-Limit", 100);
  res.setHeader("X-RateLimit-Remaining", result.remaining);
  next();
});

// Sliding Window
const slidingLimiter = new SlidingWindowRateLimiter(100, 60); // 100 requests per minute

app.use(async (req, res, next) => {
  const key = req.ip; // or req.user.id

  const result = await slidingLimiter.check(key);

  if (!result.allowed) {
    res.setHeader("X-RateLimit-Limit", 100);
    res.setHeader("X-RateLimit-Remaining", 0);
    res.setHeader(
      "X-RateLimit-Reset",
      Math.ceil((Date.now() + result.retryAfter * 1000) / 1000),
    );
    return res
      .status(429)
      .json({ error: "Rate limit exceeded", retryAfter: result.retryAfter });
  }

  res.setHeader("X-RateLimit-Limit", 100);
  res.setHeader("X-RateLimit-Remaining", result.remaining);
  next();
});

// Visualizing the difference
// Fixed Window: 100 requests per minute
// Time: 0:00  0:30  1:00  1:30  2:00
// Window: [0:00-1:00] [0:00-1:00] [1:00-2:00] [1:00-2:00] [2:00-3:00]
// Requests: 100 at 0:59, then reset, 100 at 1:59
// Problem: Can send 100 requests at 0:59 and 100 at 1:00 (200 in 1 second)

// Sliding Window: 100 requests in any 1-minute period
// Time: 0:00  0:30  1:00  1:30  2:00
// Window: [now-1min, now]
// Requests: Smooth distribution, no burst at boundaries
// Solution: Cannot send 200 requests in 1 second
```

### Best Practices:

1. **Choose window based on use case**: Chọn window phù hợp
2. **Return retry-after header**: Return retry-after header
3. **Use appropriate key**: Dùng key phù hợp (IP, user ID)
4. **Clean up old data**: Clean up old data

```javascript
// ✅ Nên: Sliding window cho precision
const slidingLimiter = new SlidingWindowRateLimiter(100, 60);

// ✅ Nên: Return retry-after header
res.setHeader("Retry-After", retryAfter);

// ✅ Nên: Use appropriate key (user ID for authenticated, IP for anonymous)
const key = req.user?.id || req.ip;

// ❌ Không nên: Fixed window khi cần precision
const fixedLimiter = new FixedWindowRateLimiter(100, 60);
// Edge effects at window boundaries
```

---

## Distributed rate limiting?

**Distributed rate limiting** là rate limiting across multiple servers/nodes.

### Mục đích / Purpose

Enforce rate limits khi system có multiple servers.

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng            |
| ---------------------- | ----------------------- |
| - Multiple API servers | Khi có multiple servers |
| - Load balanced system | Khi dùng load balancer  |
| - Microservices        | Khi dùng microservices  |
| - Global rate limits   | Khi cần global limits   |

### Giúp ích gì / Benefits

- **Global limits**: Global rate limits
- **Consistent**: Consistent limits across servers
- **Scalable**: Scalable solution

### Ưu nhược điểm / Pros & Cons

| Approach          | Ưu điểm    | Nhược điểm              |
| ----------------- | ---------- | ----------------------- |
| Centralized store | Consistent | Single point of failure |
| Distributed cache | Scalable   | Eventual consistency    |
| - Sticky sessions | Đơn giản   | Load imbalance          |

### Ví dụ:

```javascript
// Distributed Rate Limiting Approaches

const approaches = {
  centralizedRedis: {
    description: "Use Redis as centralized store for rate limits",
    pros: ["Consistent", "Fast", "Atomic operations"],
    cons: ["Single point of failure", "Network latency"],
    useCase: "Most common approach",
  },

  distributedCache: {
    description: "Use distributed cache with eventual consistency",
    pros: ["Scalable", "No single point of failure"],
    cons: ["Eventual consistency", "Complex"],
    useCase: "When consistency is not critical",
  },

  stickySessions: {
    description: "Route same user to same server",
    pros: ["Simple", "No network calls"],
    cons: ["Load imbalance", "Not truly distributed"],
    useCase: "When load imbalance is acceptable",
  },
};

// Redis-based Distributed Rate Limiter
class RedisRateLimiter {
  constructor(redis, maxRequests, windowSeconds) {
    this.redis = redis;
    this.maxRequests = maxRequests;
    this.windowSeconds = windowSeconds;
    this.keyPrefix = "rate_limit:";
  }

  async check(key) {
    const redisKey = `${this.keyPrefix}${key}`;
    const now = Date.now();
    const windowStart = now - this.windowSeconds * 1000;

    // Use Redis Lua script for atomic operation
    const script = `
      local key = KEYS[1]
      local now = tonumber(ARGV[1])
      local window = tonumber(ARGV[2])
      local max = tonumber(ARGV[3])

      -- Remove old entries
      redis.call('ZREMRANGEBYSCORE', key, '-inf', now - window)

      -- Count current requests
      local count = redis.call('ZCARD', key)

      if count >= max then
        -- Get oldest request time for retry-after
        local oldest = redis.call('ZRANGE', key, 0, 0, 'WITHSCORES')
        local retryAfter = math.ceil((tonumber(oldest[2]) + window - now) / 1000)
        return {0, retryAfter}
      end

      -- Add current request
      redis.call('ZADD', key, now, now)
      redis.call('EXPIRE', key, window)

      local remaining = max - count - 1
      return {1, remaining}
    `;

    const result = await this.redis.eval(
      script,
      1,
      redisKey,
      now,
      this.windowSeconds * 1000,
      this.maxRequests,
    );

    const [allowed, data] = result;

    if (allowed === 1) {
      return { allowed: true, remaining: data };
    } else {
      return { allowed: false, retryAfter: data };
    }
  }
}

// Usage
const redis = require("ioredis").createClient();
const rateLimiter = new RedisRateLimiter(redis, 100, 60); // 100 requests per minute

app.use(async (req, res, next) => {
  const key = req.user?.id || req.ip;

  const result = await rateLimiter.check(key);

  res.setHeader("X-RateLimit-Limit", 100);

  if (!result.allowed) {
    res.setHeader("X-RateLimit-Remaining", 0);
    res.setHeader(
      "X-RateLimit-Reset",
      Math.ceil((Date.now() + result.retryAfter * 1000) / 1000),
    );
    return res
      .status(429)
      .json({ error: "Rate limit exceeded", retryAfter: result.retryAfter });
  }

  res.setHeader("X-RateLimit-Remaining", result.remaining);
  next();
});

// Distributed Cache with Consistent Hashing
class DistributedRateLimiter {
  constructor(cacheNodes, maxRequests, windowSeconds) {
    this.cacheNodes = cacheNodes;
    this.maxRequests = maxRequests;
    this.windowSeconds = windowSeconds;
    this.hashRing = new ConsistentHash(cacheNodes);
  }

  getCacheNode(key) {
    return this.hashRing.getNode(key);
  }

  async check(key) {
    const node = this.getCacheNode(key);
    return await node.check(key, this.maxRequests, this.windowSeconds);
  }
}

// Sticky Sessions with Local Rate Limiting
class StickySessionRateLimiter {
  constructor(maxRequests, windowSeconds) {
    this.localLimiters = new Map(); // server -> rate limiter
    this.maxRequests = maxRequests;
    this.windowSeconds = windowSeconds;
  }

  getLimiter(serverId) {
    if (!this.localLimiters.has(serverId)) {
      this.localLimiters.set(
        serverId,
        new SlidingWindowRateLimiter(this.maxRequests, this.windowSeconds),
      );
    }
    return this.localLimiters.get(serverId);
  }

  async check(key, serverId) {
    const limiter = this.getLimiter(serverId);
    return await limiter.check(key);
  }
}

// Usage with load balancer
// Load balancer routes requests to same server based on user ID
const stickyLimiter = new StickySessionRateLimiter(100, 60);

app.use(async (req, res, next) => {
  const key = req.user?.id || req.ip;
  const serverId = req.serverId; // Set by load balancer

  const result = await stickyLimiter.check(key, serverId);

  res.setHeader("X-RateLimit-Limit", 100);

  if (!result.allowed) {
    res.setHeader("X-RateLimit-Remaining", 0);
    res.setHeader(
      "X-RateLimit-Reset",
      Math.ceil((Date.now() + result.retryAfter * 1000) / 1000),
    );
    return res
      .status(429)
      .json({ error: "Rate limit exceeded", retryAfter: result.retryAfter });
  }

  res.setHeader("X-RateLimit-Remaining", result.remaining);
  next();
});

// Comparison
const comparison = {
  redis: {
    pros: ["Consistent", "Atomic", "Fast"],
    cons: ["Network latency", "Single point of failure"],
    complexity: "Medium",
    useCase: "Most common, when consistency is important",
  },

  distributed: {
    pros: ["Scalable", "No single point of failure"],
    cons: ["Eventual consistency", "Complex"],
    complexity: "High",
    useCase: "When scalability is more important than consistency",
  },

  sticky: {
    pros: ["No network calls", "Simple"],
    cons: ["Load imbalance", "Not truly distributed"],
    complexity: "Low",
    useCase: "When load imbalance is acceptable",
  },
};
```

### Best Practices:

1. **Use Redis for consistency**: Dùng Redis để đảm bảo consistency
2. **Use atomic operations**: Dùng atomic operations
3. **Handle network failures**: Xử lý network failures
4. **Monitor rate limit hits**: Theo dõi rate limit hits

```javascript
// ✅ Nên: Redis với Lua script cho atomic operations
const result = await redis.eval(script, 1, key, now, window, max);

// ✅ Nên: Handle Redis failures
try {
  const result = await rateLimiter.check(key);
} catch (error) {
  // Fallback to local rate limiting
  return localLimiter.check(key);
}

// ✅ Nên: Monitor rate limit hits
if (!result.allowed) {
  metrics.increment("rate_limit.exceeded", { key });
}

// ❌ Không nên: Local rate limiting cho distributed system
const localLimiter = new SlidingWindowRateLimiter(100, 60);
// User can bypass by hitting different servers
```

---

## References

- [Rate Limiting Algorithms](https://cloud.google.com/architecture/rate-limiting-algorithms)
- [Redis Rate Limiting](https://redis.io/docs/manual/patterns/distributed-rate-limiting-pattern/)
- [API Rate Limiting Best Practices](https://restfulapi.net/rate-limiting/)
