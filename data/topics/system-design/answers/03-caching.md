# 3. Caching

## Tổng quan về Caching

### Mục đích của Caching / Purpose

**Caching** là kỹ thuật lưu trữ tạm thời dữ liệu thường xuyên truy cập ở vị trí có thể truy cập nhanh hơn để giảm latency và giảm tải cho hệ thống.

**Mục đích chính:**

- Giảm latency cho data access
- Giảm tải cho database/backend
- Tăng throughput của hệ thống
- Cải thiện user experience
- Giảm chi phí infrastructure

### Khi nào cần hiểu về Caching / When to Use

Hiểu về Caching là cần thiết khi:

- Xử lý high traffic
- Cần giảm latency
- Database đang bị overload
- Caching expensive computations
- Caching API responses

### Giúp ích gì / Benefits

**Lợi ích:**

- **Performance**: Giảm latency đáng kể
- **Scalability**: Giảm tải cho backend
- **Cost savings**: Giảm chi phí database
- **User experience**: Tốc độ response nhanh hơn
- **Availability**: Cache có thể serve khi DB down

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm                  |
| ----------------- | --------------------------- |
| Giảm latency      | Cache invalidation phức tạp |
| - Tăng throughput | Có thể serve stale data     |
| - Giảm tải DB     | Thêm complexity             |
| - Cải thiện UX    | Cần thêm infrastructure     |

---

## Caching strategies?

**Caching strategies** là các pattern để quyết định khi nào và cách populate, invalidate cache.

### Mục đích / Purpose

Đảm bảo cache được sử dụng hiệu quả và data consistency.

### Khi nào dùng / When to Use

| Strategy      | Khi nào dùng                     |
| ------------- | -------------------------------- |
| Cache Aside   | Khi đọc nhiều, viết ít           |
| Read Through  | Khi muốn đơn giản hóa code       |
| Write Through | Khi cần data consistency cao     |
| Write Back    | Khi write performance quan trọng |

### Giúp ích gì / Benefits

- **Cache Aside**: Đơn giản, cache miss chỉ khi cần
- **Read Through**: Code client đơn giản hơn
- **Write Through**: Data consistency cao
- **Write Back**: Write performance cao

### Ưu nhược điểm / Pros & Cons

| Strategy      | Ưu điểm            | Nhược điểm               |
| ------------- | ------------------ | ------------------------ |
| Cache Aside   | Đơn giản, flexible | Cache miss có latency    |
| Read Through  | Code đơn giản      | Cache hit vẫn có latency |
| Write Through | Consistency cao    | Write chậm hơn           |
| Write Back    | Write nhanh        | Có thể mất data          |

### Ví dụ:

```javascript
// 1. Cache Aside (Lazy Loading)
// App kiểm tra cache trước, nếu không có thì lấy từ DB và lưu vào cache
class CacheAside {
  constructor(cache, database) {
    this.cache = cache;
    this.database = database;
  }

  async get(key) {
    // Check cache first
    let value = await this.cache.get(key);

    if (value === null) {
      // Cache miss, get from database
      value = await this.database.get(key);

      // Store in cache for next time
      await this.cache.set(key, value, { ttl: 3600 });
    }

    return value;
  }

  async set(key, value) {
    // Write to database
    await this.database.set(key, value);

    // Invalidate cache
    await this.cache.delete(key);
  }

  async delete(key) {
    // Delete from database
    await this.database.delete(key);

    // Invalidate cache
    await this.cache.delete(key);
  }
}

// 2. Read Through
// Cache tự động load data từ DB khi miss
class ReadThroughCache {
  constructor(cache, database) {
    this.cache = cache;
    this.database = database;
    // Wrap cache to auto-load from DB
    this.cache.get = this.getWithLoad.bind(this);
  }

  async getWithLoad(key) {
    let value = await this.cache.get(key);

    if (value === null) {
      value = await this.database.get(key);
      await this.cache.set(key, value, { ttl: 3600 });
    }

    return value;
  }

  async get(key) {
    return await this.cache.get(key);
  }
}

// 3. Write Through
// Ghi vào cả cache và DB cùng lúc
class WriteThroughCache {
  constructor(cache, database) {
    this.cache = cache;
    this.database = database;
  }

  async set(key, value) {
    // Write to both cache and database
    await Promise.all([
      this.cache.set(key, value),
      this.database.set(key, value),
    ]);
  }

  async get(key) {
    return await this.cache.get(key);
  }
}

// 4. Write Back (Write Behind)
// Ghi vào cache trước, async ghi vào DB sau
class WriteBackCache {
  constructor(cache, database) {
    this.cache = cache;
    this.database = database;
    this.writeQueue = [];
    this.processing = false;
  }

  async set(key, value) {
    // Write to cache immediately
    await this.cache.set(key, value);

    // Queue for async write to database
    this.writeQueue.push({ key, value, timestamp: Date.now() });

    // Start processing if not already
    if (!this.processing) {
      this.processQueue();
    }
  }

  async processQueue() {
    this.processing = true;

    while (this.writeQueue.length > 0) {
      const { key, value } = this.writeQueue.shift();

      try {
        await this.database.set(key, value);
      } catch (error) {
        // Retry logic
        console.error("Failed to write to database:", error);
        this.writeQueue.push({ key, value, timestamp: Date.now() });
        await this.sleep(1000);
      }
    }

    this.processing = false;
  }

  async get(key) {
    return await this.cache.get(key);
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Comparison
const cachingStrategies = {
  cacheAside: {
    description: "App manages cache",
    read: "Check cache → DB if miss → Update cache",
    write: "Write DB → Invalidate cache",
    pros: ["Simple", "Flexible", "Cache only what needed"],
    cons: ["Cache miss latency", "Stale data possible"],
    useCase: "Most common pattern",
  },

  readThrough: {
    description: "Cache manages loading",
    read: "Check cache → Cache loads from DB if miss",
    write: "Write DB → Invalidate cache",
    pros: ["Simple client code", "Consistent"],
    cons: ["Cache hit still has latency", "Cache miss latency"],
    useCase: "When you want to simplify client code",
  },

  writeThrough: {
    description: "Write to both cache and DB",
    read: "Check cache → DB if miss → Update cache",
    write: "Write cache AND DB",
    pros: ["Data consistency", "Cache always fresh"],
    cons: ["Slower writes", "Higher write load"],
    useCase: "When data consistency is critical",
  },

  writeBack: {
    description: "Write to cache, async write to DB",
    read: "Check cache",
    write: "Write cache → Queue for DB write",
    pros: ["Fast writes", "Batch writes", "Reduced DB load"],
    cons: ["Data loss risk", "Complexity", "Stale data"],
    useCase: "Write-heavy workloads",
  },
};
```

### Best Practices:

1. **Choose strategy based on workload**: Chọn strategy phù hợp với workload
2. **Handle cache failures**: Xử lý khi cache fail
3. **Monitor cache hit ratio**: Theo dõi cache hit ratio
4. **Set appropriate TTL**: Đặt TTL phù hợp

```javascript
// ✅ Nên: Sử dụng Cache Aside cho read-heavy workloads
const cache = new CacheAside(redis, database);

async function getUser(userId) {
  return await cache.get(`user:${userId}`);
}

// ✅ Nên: Sử dụng Write Through cho critical data
const writeThroughCache = new WriteThroughCache(redis, database);

async function updateUser(userId, userData) {
  await writeThroughCache.set(`user:${userId}`, userData);
  // Data is always consistent
}

// ❌ Không nên: Sử dụng Write Back cho critical data
const writeBackCache = new WriteBackCache(redis, database);

async function updateBalance(userId, amount) {
  await writeBackCache.set(`balance:${userId}`, amount);
  // Risk of data loss if cache fails before DB write
}
```

---

## Cache invalidation?

**Cache invalidation** là quá trình xóa hoặc cập nhật cache khi data thay đổi để đảm bảo data consistency.

### Mục đích / Purpose

Đảm bảo cache không chứa stale data.

### Khi nào dùng / When to Use

| Tình huống       | Khi nào dùng           |
| ---------------- | ---------------------- |
| Data updated     | Khi data được cập nhật |
| Data deleted     | Khi data được xóa      |
| - TTL expired    | Khi TTL hết hạn        |
| - Manual refresh | Khi cần refresh cache  |

### Giúp ích gì / Benefits

- **Data consistency**: Đảm bảo data consistency
- **Fresh data**: Luôn serve fresh data
- **User trust**: Tăng trust của người dùng

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                      | Nhược điểm              |
| ---------------------------- | ----------------------- |
| Đảm bảo fresh data           | Thêm complexity         |
| - Tăng consistency           | Có thể giảm performance |
| - Control khi nào invalidate | Hard to get right       |

### Invalidation Strategies:

```javascript
// Cache Invalidation Strategies

// 1. Time-based Expiration (TTL)
const ttlInvalidation = {
  description: "Cache expires after a fixed time",
  implementation: "Set TTL when writing to cache",

  example: `
    await cache.set('key', value, { ttl: 3600 }); // Expires in 1 hour
  `,

  pros: ["Simple", "Automatic", "No manual invalidation"],
  cons: ["May serve stale data", "May serve expired data"],
  useCase: "Data that changes infrequently",
};

// 2. Write-through Invalidation
const writeThroughInvalidation = {
  description: "Invalidate cache on write",
  implementation: "Delete cache entry when data changes",

  example: `
    async function updateUser(userId, userData) {
      await database.updateUser(userId, userData);
      await cache.delete(\`user:\${userId}\`); // Invalidate cache
    }
  `,

  pros: ["Immediate consistency", "Simple"],
  cons: ["Cache miss on next read", "Multiple invalidations for same data"],
  useCase: "When data consistency is critical",
};

// 3. Cache Tagging
const cacheTagging = {
  description: "Tag cache entries and invalidate by tag",
  implementation: "Associate tags with cache keys",

  example: `
    // Set cache with tags
    await cache.set('user:123', userData, { tags: ['user', 'profile'] });
    await cache.set('user:456', userData, { tags: ['user', 'profile'] });
    
    // Invalidate all user caches
    await cache.invalidateByTag('user');
  `,

  pros: ["Batch invalidation", "Flexible"],
  cons: ["More complex", "Need to track tags"],
  useCase: "When multiple keys share same data source",
};

// 4. Version-based Invalidation
const versionInvalidation = {
  description: "Include version in cache key",
  implementation: "Increment version on data change",

  example: `
    // Get version
    const version = await database.getVersion(userId);
    
    // Cache with version
    await cache.set(\`user:\${userId}:v\${version}\`, userData);
    
    // On update, increment version
    await database.incrementVersion(userId);
    // Old cache entries become invalid automatically
  `,

  pros: ["No explicit invalidation", "Atomic"],
  cons: ["Need version tracking", "Old entries linger"],
  useCase: "When you want automatic invalidation",
};

// Cache Invalidation Implementation
class CacheInvalidator {
  constructor(cache, database) {
    this.cache = cache;
    this.database = database;
    this.tagIndex = new Map(); // tag -> Set of keys
  }

  // Set with TTL
  async set(key, value, options = {}) {
    const { ttl = 3600, tags = [] } = options;
    await this.cache.set(key, value, { ttl });

    // Index by tags
    for (const tag of tags) {
      if (!this.tagIndex.has(tag)) {
        this.tagIndex.set(tag, new Set());
      }
      this.tagIndex.get(tag).add(key);
    }
  }

  // Invalidate by key
  async invalidate(key) {
    await this.cache.delete(key);

    // Remove from tag index
    for (const [tag, keys] of this.tagIndex) {
      keys.delete(key);
    }
  }

  // Invalidate by tag
  async invalidateByTag(tag) {
    const keys = this.tagIndex.get(tag);

    if (keys) {
      for (const key of keys) {
        await this.cache.delete(key);
      }
      this.tagIndex.delete(tag);
    }
  }

  // Invalidate multiple tags
  async invalidateByTags(tags) {
    for (const tag of tags) {
      await this.invalidateByTag(tag);
    }
  }

  // Write-through with invalidation
  async writeThrough(key, value, tags = []) {
    // Write to database
    await this.database.set(key, value);

    // Invalidate old cache
    await this.invalidate(key);

    // Set new cache
    await this.set(key, value, { tags });
  }
}

// Usage
const invalidator = new CacheInvalidator(redis, database);

// Set cache with tags
await invalidator.set("user:123", userData, {
  ttl: 3600,
  tags: ["user", "profile"],
});
await invalidator.set("user:456", userData, {
  ttl: 3600,
  tags: ["user", "profile"],
});

// Invalidate all user caches
await invalidator.invalidateByTag("user");

// Write-through with invalidation
await invalidator.writeThrough("user:123", newUserData, ["user", "profile"]);
```

### Best Practices:

1. **Invalidate on write**: Luôn invalidate khi data thay đổi
2. **Use TTL**: Sử dụng TTL như fallback
3. **Consider cache stampede**: Xem xét cache stampede
4. **Monitor stale data**: Theo dõi stale data

```javascript
// ✅ Nên: Invalidation với TTL fallback
class RobustCache {
  async get(key) {
    let value = await this.cache.get(key);

    if (value === null) {
      value = await this.database.get(key);
      await this.cache.set(key, value, { ttl: 3600 }); // TTL fallback
    }

    return value;
  }

  async set(key, value) {
    await this.database.set(key, value);
    await this.cache.delete(key); // Invalidate immediately
  }
}

// ✅ Nên: Cache tagging cho batch invalidation
await cache.set("user:123", data, { tags: ["user"] });
await cache.set("user:456", data, { tags: ["user"] });
await cache.invalidateByTag("user"); // Invalidate all user caches

// ❌ Không nên: Không có invalidation
async function updateUser(userId, userData) {
  await database.updateUser(userId, userData);
  // Cache still has old data!
}
```

---

## Redis vs Memcached?

**Redis** và **Memcached** là hai in-memory data stores phổ biến cho caching.

### Mục đích / Purpose

Lưu trữ data in-memory để truy cập nhanh.

### Khi nào dùng / When to Use

| Use Case                | Redis | Memcached |
| ----------------------- | ----- | --------- |
| Simple caching          | ✅    | ✅        |
| Complex data structures | ✅    | ❌        |
| Persistence             | ✅    | ❌        |
| - Replication           | ✅    | Limited   |
| - Transactions          | ✅    | ❌        |
| - Pub/Sub               | ✅    | ❌        |
| - Simple key-value      | ✅    | ✅        |

### Giúp ích gì / Benefits

- **Redis**: Nhiều tính năng, persistence, replication
- **Memcached**: Đơn giản, nhanh, multi-threaded

### Ưu nhược điểm / Pros & Cons

| Feature           | Redis                               | Memcached      |
| ----------------- | ----------------------------------- | -------------- |
| Data types        | String, Hash, List, Set, Sorted Set | String only    |
| Persistence       | RDB, AOF                            | No             |
| Replication       | Master-slave                        | Limited        |
| Transactions      | Yes (MULTI/EXEC)                    | No             |
| Pub/Sub           | Yes                                 | No             |
| Memory management | LRU, LFU                            | LRU            |
| Threading         | Single-threaded                     | Multi-threaded |
| Performance       | Fast                                | Very fast      |

### Ví dụ:

```javascript
// Redis Examples
const redis = require("redis");
const redisClient = redis.createClient();

// String
await redisClient.set("key", "value");
await redisClient.get("key");

// Hash
await redisClient.hset("user:123", "name", "John");
await redisClient.hset("user:123", "email", "john@example.com");
await redisClient.hgetall("user:123");

// List
await redisClient.lpush("queue", "task1");
await redisClient.lpush("queue", "task2");
await redisClient.rpop("queue");

// Set
await redisClient.sadd("tags", "redis", "cache", "database");
await redisClient.smembers("tags");

// Sorted Set (Leaderboard)
await redisClient.zadd("leaderboard", 100, "user1");
await redisClient.zadd("leaderboard", 200, "user2");
await redisClient.zrevrange("leaderboard", 0, -1);

// Transactions
await redisClient.multi().set("key1", "value1").set("key2", "value2").exec();

// Pub/Sub
await redisClient.subscribe("channel");
await redisClient.publish("channel", "message");

// Memcached Examples
const Memcached = require("memcached");
const memcached = new Memcached("localhost:11211");

// Set and get (only strings)
memcached.set("key", "value", 3600, (err) => {
  if (err) console.error(err);
});

memcached.get("key", (err, data) => {
  if (err) console.error(err);
  console.log(data);
});

// Multi-get
memcached.getMulti(["key1", "key2", "key3"], (err, data) => {
  if (err) console.error(err);
  console.log(data);
});

// Comparison
const comparison = {
  redis: {
    dataTypes: [
      "String",
      "Hash",
      "List",
      "Set",
      "Sorted Set",
      "Bitmap",
      "HyperLogLog",
      "Geospatial",
    ],
    persistence: ["RDB (snapshot)", "AOF (append-only file)"],
    replication: "Master-slave replication",
    transactions: "MULTI/EXEC commands",
    pubSub: "Publish/Subscribe messaging",
    clustering: "Redis Cluster",
    scripting: "Lua scripting",
    useCases: [
      "Caching",
      "Session store",
      "Leaderboards",
      "Rate limiting",
      "Message queue",
      "Pub/Sub",
      "Real-time analytics",
    ],
  },

  memcached: {
    dataTypes: ["String only"],
    persistence: "No persistence",
    replication: "Limited",
    transactions: "No",
    pubSub: "No",
    clustering: "Client-side sharding",
    scripting: "No",
    useCases: [
      "Simple caching",
      "Session store",
      "Page caching",
      "Database query caching",
    ],
  },
};

// Decision Tree
function chooseCacheStore(requirements) {
  if (requirements.simpleCaching && !requirements.persistence) {
    if (requirements.multiThreaded) {
      return "Memcached";
    }
  }

  if (
    requirements.complexData ||
    requirements.persistence ||
    requirements.replication
  ) {
    return "Redis";
  }

  if (requirements.transactions || requirements.pubSub) {
    return "Redis";
  }

  // Default to Redis for most use cases
  return "Redis";
}
```

### Best Practices:

1. **Use Redis for most cases**: Dùng Redis cho hầu hết trường hợp
2. **Use Memcached for simple caching**: Dùng Memcached cho simple caching
3. **Consider persistence**: Xem xét persistence requirements
4. **Monitor memory usage**: Theo dõi memory usage

```javascript
// ✅ Nên: Redis cho complex use cases
const redis = require("redis");
const client = redis.createClient();

// Leaderboard with sorted set
async function updateLeaderboard(userId, score) {
  await client.zadd("leaderboard", score, userId);
}

async function getTopUsers(count = 10) {
  return await client.zrevrange("leaderboard", 0, count - 1, "WITHSCORES");
}

// ✅ Nên: Memcached cho simple caching
const Memcached = require("memcached");
const memcached = new Memcached("localhost:11211");

async function cacheResponse(key, data, ttl = 3600) {
  return new Promise((resolve, reject) => {
    memcached.set(key, JSON.stringify(data), ttl, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// ❌ Không nên: Sử dụng Memcached cho complex data structures
// Memcached only supports strings, cannot do this:
await client.hset("user:123", "name", "John"); // Not available in Memcached
```

---

## Cache eviction policies?

**Cache eviction policies** quyết định data nào sẽ bị xóa khỏi cache khi cache đầy.

### Mục đích / Purpose

Quản lý cache memory hiệu quả bằng cách loại bỏ data ít quan trọng nhất.

### Khi nào dùng / When to Use

| Policy | Khi nào dùng                         |
| ------ | ------------------------------------ |
| LRU    | Khi data gần đây được truy cập nhiều |
| LFU    | Khi data được truy cập thường xuyên  |
| FIFO   | Khi đơn giản là cần một policy       |
| Random | Khi không có pattern rõ ràng         |

### Giúp ích gì / Benefits

- **LRU**: Giữ data gần đây được truy cập
- **LFU**: Giữ data được truy cập thường xuyên
- **FIFO**: Đơn giản, dễ implement
- **Random**: Không cần tracking

### Ưu nhược điểm / Pros & Cons

| Policy | Ưu điểm                                | Nhược điểm                    |
| ------ | -------------------------------------- | ----------------------------- |
| LRU    | Phổ biến, hiệu quả cho nhiều use cases | Cần tracking access time      |
| LFU    | Giữ popular data                       | Cần tracking access count     |
| FIFO   | Đơn giản                               | Không consider access pattern |
| Random | Không cần tracking                     | Không hiệu quả                |

### Ví dụ:

```javascript
// Cache Eviction Policies

// 1. LRU (Least Recently Used)
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      // Move to end (most recently used)
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return null;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

// 2. LFU (Least Frequently Used)
class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // key -> { value, frequency }
    this.frequencyMap = new Map(); // frequency -> Set of keys
    this.minFrequency = 0;
  }

  get(key) {
    if (!this.cache.has(key)) {
      return null;
    }

    const item = this.cache.get(key);
    const oldFreq = item.frequency;
    const newFreq = oldFreq + 1;

    // Update frequency
    item.frequency = newFreq;
    this.cache.set(key, item);

    // Update frequency map
    this.frequencyMap.get(oldFreq).delete(key);
    if (this.frequencyMap.get(oldFreq).size === 0) {
      this.frequencyMap.delete(oldFreq);
      if (this.minFrequency === oldFreq) {
        this.minFrequency++;
      }
    }

    if (!this.frequencyMap.has(newFreq)) {
      this.frequencyMap.set(newFreq, new Set());
    }
    this.frequencyMap.get(newFreq).add(key);

    return item.value;
  }

  set(key, value) {
    if (this.capacity === 0) {
      return;
    }

    if (this.cache.has(key)) {
      // Update existing
      const item = this.cache.get(key);
      item.value = value;
      this.cache.set(key, item);
      this.get(key); // Update frequency
      return;
    }

    if (this.cache.size >= this.capacity) {
      // Evict least frequently used
      const keys = this.frequencyMap.get(this.minFrequency);
      const evictKey = keys.values().next().value;
      keys.delete(evictKey);
      this.cache.delete(evictKey);
    }

    // Add new item
    this.cache.set(key, { value, frequency: 1 });
    this.minFrequency = 1;

    if (!this.frequencyMap.has(1)) {
      this.frequencyMap.set(1, new Set());
    }
    this.frequencyMap.get(1).add(key);
  }
}

// 3. FIFO (First In First Out)
class FIFOCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.queue = [];
    this.cache = new Map();
  }

  get(key) {
    return this.cache.get(key) || null;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.set(key, value);
      return;
    }

    if (this.queue.length >= this.capacity) {
      // Remove first item
      const evictKey = this.queue.shift();
      this.cache.delete(evictKey);
    }

    this.queue.push(key);
    this.cache.set(key, value);
  }
}

// 4. Random Eviction
class RandomCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    return this.cache.get(key) || null;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.set(key, value);
      return;
    }

    if (this.cache.size >= this.capacity) {
      // Remove random item
      const keys = Array.from(this.cache.keys());
      const evictKey = keys[Math.floor(Math.random() * keys.length)];
      this.cache.delete(evictKey);
    }

    this.cache.set(key, value);
  }
}

// Comparison
const evictionPolicies = {
  lru: {
    name: "Least Recently Used",
    description: "Evict items that haven't been accessed for the longest time",
    pros: ["Good for temporal locality", "Widely supported"],
    cons: ["Requires tracking access time", "Scan-resistant"],
    useCase: "General-purpose caching",
  },

  lfu: {
    name: "Least Frequently Used",
    description: "Evict items with the lowest access frequency",
    pros: ["Keeps popular items", "Good for stable access patterns"],
    cons: ["Requires tracking access count", "Complex implementation"],
    useCase: "When access frequency is stable",
  },

  fifo: {
    name: "First In First Out",
    description: "Evict items in the order they were added",
    pros: ["Simple implementation", "No tracking needed"],
    cons: ["Doesn't consider access patterns", "Can evict popular items"],
    useCase: "When simplicity is more important than hit rate",
  },

  random: {
    name: "Random Eviction",
    description: "Evict items randomly",
    pros: ["No tracking needed", "Simple"],
    cons: ["Low hit rate", "Unpredictable"],
    useCase: "When access patterns are random",
  },
};

// Redis LRU Configuration
const redisLRUConfig = {
  maxmemory: "256mb", // Maximum memory
  "maxmemory-policy": "allkeys-lru", // LRU eviction
  "maxmemory-samples": 5, // Number of keys to sample for LRU
};

// Redis Eviction Policies
const redisEvictionPolicies = {
  noeviction: "Return errors when memory limit reached",
  "allkeys-lru": "Evict any key using LRU",
  "volatile-lru": "Evict keys with expiry using LRU",
  "allkeys-random": "Evict any key randomly",
  "volatile-random": "Evict keys with expiry randomly",
  "volatile-ttl": "Evict keys with shortest TTL first",
  "allkeys-lfu": "Evict any key using LFU (Redis 4.0+)",
  "volatile-lfu": "Evict keys with expiry using LFU (Redis 4.0+)",
};
```

### Best Practices:

1. **Choose policy based on access pattern**: Chọn policy phù hợp với access pattern
2. **Monitor hit ratio**: Theo dõi cache hit ratio
3. **Adjust capacity**: Điều chỉnh capacity khi cần
4. **Test different policies**: Thử nghiệm các policies khác nhau

```javascript
// ✅ Nên: Sử dụng LRU cho general-purpose caching
const lruCache = new LRUCache(1000);

// ✅ Nên: Sử dụng LFU cho stable access patterns
const lfuCache = new LFUCache(1000);

// ✅ Nên: Configure Redis with appropriate eviction policy
await redis.config("SET", "maxmemory", "256mb");
await redis.config("SET", "maxmemory-policy", "allkeys-lru");

// ❌ Không nên: Sử dụng Random khi có clear access pattern
const randomCache = new RandomCache(1000);
// Hit ratio will be low for most workloads
```

---

## Distributed caching?

**Distributed caching** là caching trên nhiều nodes để tăng scalability và availability.

### Mục đích / Purpose

Tăng scalability và availability của cache layer.

### Khi nào dùng / When to Use

| Tình huống                | Khi nào dùng                    |
| ------------------------- | ------------------------------- |
| Single cache not enough   | Khi một cache node không đủ     |
| High availability needed  | Khi cần high availability       |
| - Geographic distribution | Khi cần geographic distribution |
| - Horizontal scaling      | Khi cần horizontal scaling      |

### Gihelp ích gì / Benefits

- **Scalability**: Có thể scale horizontally
- **Availability**: Có redundancy
- **Performance**: Có thể distribute load
- **Geographic**: Có thể distribute geographically

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                     | Nhược điểm             |
| --------------------------- | ---------------------- |
| Tăng scalability            | Thêm complexity        |
| - Tăng availability         | Network latency        |
| - Có thể scale horizontally | Consistency challenges |
| - Geographic distribution   | Harder to manage       |

### Ví dụ:

```javascript
// Distributed Caching with Redis Cluster
const Redis = require("ioredis");
const redisCluster = new Redis.Cluster([
  { host: "redis-node1", port: 6379 },
  { host: "redis-node2", port: 6379 },
  { host: "redis-node3", port: 6379 },
]);

// Keys are automatically distributed across nodes
await redisCluster.set("key1", "value1"); // May go to node1
await redisCluster.set("key2", "value2"); // May go to node2
await redisCluster.set("key3", "value3"); // May go to node3

// Consistent Hashing for Distributed Cache
class ConsistentHash {
  constructor(nodes = [], replicas = 150) {
    this.replicas = replicas;
    this.ring = new Map();
    this.sortedKeys = [];

    for (const node of nodes) {
      this.addNode(node);
    }
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  addNode(node) {
    for (let i = 0; i < this.replicas; i++) {
      const virtualNode = `${node}:${i}`;
      const key = this.hash(virtualNode);
      this.ring.set(key, node);
      this.sortedKeys.push(key);
    }
    this.sortedKeys.sort((a, b) => a - b);
  }

  removeNode(node) {
    for (let i = 0; i < this.replicas; i++) {
      const virtualNode = `${node}:${i}`;
      const key = this.hash(virtualNode);
      this.ring.delete(key);
      this.sortedKeys = this.sortedKeys.filter((k) => k !== key);
    }
  }

  getNode(key) {
    if (this.sortedKeys.length === 0) {
      return null;
    }

    const hash = this.hash(key);

    // Find first node with key >= hash
    for (const ringKey of this.sortedKeys) {
      if (ringKey >= hash) {
        return this.ring.get(ringKey);
      }
    }

    // Wrap around to first node
    return this.ring.get(this.sortedKeys[0]);
  }
}

// Distributed Cache with Consistent Hashing
class DistributedCache {
  constructor(nodes) {
    this.hashRing = new ConsistentHash(nodes);
    this.nodes = new Map();

    for (const node of nodes) {
      this.nodes.set(node, new Map());
    }
  }

  async get(key) {
    const node = this.hashRing.getNode(key);
    return this.nodes.get(node).get(key);
  }

  async set(key, value, options = {}) {
    const node = this.hashRing.getNode(key);
    this.nodes.get(node).set(key, value);

    if (options.ttl) {
      setTimeout(() => {
        this.nodes.get(node).delete(key);
      }, options.ttl * 1000);
    }
  }

  async delete(key) {
    const node = this.hashRing.getNode(key);
    this.nodes.get(node).delete(key);
  }

  addNode(node) {
    this.hashRing.addNode(node);
    this.nodes.set(node, new Map());
  }

  removeNode(node) {
    this.hashRing.removeNode(node);
    this.nodes.delete(node);
  }
}

// Usage
const distributedCache = new DistributedCache(["node1", "node2", "node3"]);

await distributedCache.set("user:123", userData);
await distributedCache.set("user:456", userData);
await distributedCache.set("user:789", userData);

// Keys are distributed across nodes
const user123 = await distributedCache.get("user:123");
const user456 = await distributedCache.get("user:456");
const user789 = await distributedCache.get("user:789");

// Add new node
distributedCache.addNode("node4");

// Remove node
distributedCache.removeNode("node2");
```

### Best Practices:

1. **Use consistent hashing**: Dùng consistent hashing để minimize data movement
2. **Handle node failures**: Xử lý khi node fail
3. **Monitor cache distribution**: Theo dõi distribution
4. **Consider data locality**: Xem xét data locality

```javascript
// ✅ Nên: Sử dụng Redis Cluster cho distributed caching
const cluster = new Redis.Cluster([
  { host: "redis-1", port: 6379 },
  { host: "redis-2", port: 6379 },
  { host: "redis-3", port: 6379 },
]);

// ✅ Nên: Handle node failures gracefully
cluster.on("error", (err) => {
  console.error("Redis Cluster Error:", err);
  // Implement retry logic
});

// ❌ Không nên: Không có redundancy
// Single node cache is a single point of failure
const singleNodeCache = new Map();
// If node fails, all cache is lost
```

---

## References

- [Redis Documentation](https://redis.io/documentation)
- [Memcached Wiki](https://github.com/memcached/memcached/wiki)
- [Caching Best Practices](https://aws.amazon.com/caching/best-practices/)
