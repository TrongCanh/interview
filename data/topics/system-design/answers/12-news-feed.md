# 12. News Feed

## Tổng quan về News Feed

### Mục đích của News Feed / Purpose

**News Feed** là một feature hiển thị updates từ connections (friends, pages, groups) theo chronological hoặc relevance order.

**Mục đích chính:**

- Hiển thị updates từ connections
- Personalized content
- Real-time updates
- Engagement tracking
- Content discovery

### Khi nào cần hiểu về News Feed / When to Use

Hiểu về News Feed là cần thiết khi:

- Thiết kế social network
- Xây dựng content discovery
- Cần personalized feeds
- Xử lý real-time updates
- Implement engagement features

### Giúp ích gì / Benefits

**Lợi ích:**

- **Engagement**: Tăng user engagement
- **Personalization**: Personalized content
- **Discovery**: Content discovery
- **Real-time**: Real-time updates
- **Retention**: User retention

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm             |
| ------------------- | ---------------------- |
| - Tăng engagement   | Complexity cao         |
| - Personalized      | Scalability challenges |
| - Real-time         | Performance issues     |
| - Content discovery | Data consistency       |

---

## Generate news feed?

**News feed generation** là quá trình collect và rank content để hiển thị cho users.

### Mục đích / Purpose

Generate personalized, relevant content cho users.

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng                 |
| ------------------- | ---------------------------- |
| - Social network    | Khi cần social feed          |
| - Content discovery | Khi cần content discovery    |
| - Personalization   | Khi cần personalized content |
| - Real-time updates | Khi cần real-time            |

### Giúp ích gì / Benefits

- **Personalization**: Personalized content
- **Relevance**: Relevant content
- **Engagement**: Tăng engagement
- **Discovery**: Content discovery

### Ưu nhược điểm / Pros & Cons

| Approach        | Ưu điểm           | Nhược điểm          |
| --------------- | ----------------- | ------------------- |
| Fanout on write | Real-time updates | High write load     |
| Fanout on read  | Lower write load  | Higher read latency |
| - Hybrid        | Balance           | Complexity          |

### Ví dụ:

```javascript
// News Feed Generation Approaches

const approaches = {
  fanoutOnWrite: {
    description: "Pre-compute feeds when content is created",
    pros: ["Fast read", "Real-time updates"],
    cons: ["High write load", "Storage cost"],
    useCase: "When read is much more frequent than write",
  },

  fanoutOnRead: {
    description: "Compute feed on demand when user reads",
    pros: ["Lower write load", "Lower storage"],
    cons: ["Slower read", "Higher latency"],
    useCase: "When write is frequent and read is less frequent",
  },

  hybrid: {
    description: "Combine both approaches",
    pros: ["Balance read and write"],
    cons: ["Complexity", "More storage"],
    useCase: "When both read and write are frequent",
  },
};

// Fanout on Write Implementation
class FanoutOnWrite {
  constructor(database, cache) {
    this.database = database;
    this.cache = cache;
  }

  async createPost(post) {
    // Save post
    const saved = await this.database.insert("posts", post);

    // Get followers
    const followers = await this.getFollowers(post.userId);

    // Fanout to followers
    for (const followerId of followers) {
      await this.addToFeed(followerId, saved.id);
    }

    return saved;
  }

  async addToFeed(userId, postId) {
    // Add to user's feed
    await this.database.insert("feeds", {
      userId,
      postId,
      timestamp: new Date(),
    });

    // Invalidate cache
    await this.cache.del(`feed:${userId}`);
  }

  async getFeed(userId, options = {}) {
    // Check cache
    const cached = await this.cache.get(`feed:${userId}`);
    if (cached) {
      return cached;
    }

    // Get from database
    const feed = await this.database.query(
      `SELECT f.*, p.*, u.name as authorName, u.avatar as authorAvatar
       FROM feeds f
       JOIN posts p ON f.postId = p.id
       JOIN users u ON p.userId = u.id
       WHERE f.userId = $1
       ORDER BY f.timestamp DESC
       LIMIT $2 OFFSET $3`,
      [userId, options.limit || 50, options.offset || 0],
    );

    // Cache for 5 minutes
    await this.cache.set(`feed:${userId}`, feed, { ttl: 300 });

    return feed;
  }

  async getFollowers(userId) {
    // Get user's followers
    const result = await this.database.query(
      "SELECT followerId FROM follows WHERE followingId = ?",
      [userId],
    );
    return result.map((r) => r.followerId);
  }
}

// Fanout on Read Implementation
class FanoutOnRead {
  constructor(database, cache) {
    this.database = database;
    this.cache = cache;
  }

  async createPost(post) {
    // Just save post, no fanout
    return await this.database.insert("posts", post);
  }

  async getFeed(userId, options = {}) {
    // Check cache
    const cached = await this.cache.get(`feed:${userId}`);
    if (cached) {
      return cached;
    }

    // Get following
    const following = await this.getFollowing(userId);

    // Get posts from following
    const feed = await this.database.query(
      `SELECT p.*, u.name as authorName, u.avatar as authorAvatar
       FROM posts p
       JOIN users u ON p.userId = u.id
       WHERE p.userId IN ($1)
       ORDER BY p.timestamp DESC
       LIMIT $2 OFFSET $3`,
      [following.map((f) => f.id), options.limit || 50, options.offset || 0],
    );

    // Cache for 5 minutes
    await this.cache.set(`feed:${userId}`, feed, { ttl: 300 });

    return feed;
  }

  async getFollowing(userId) {
    // Get user's following
    const result = await this.database.query(
      "SELECT followingId FROM follows WHERE followerId = ?",
      [userId],
    );
    return result.map((r) => r.followingId);
  }
}

// Hybrid Implementation
class HybridFeed {
  constructor(database, cache) {
    this.database = database;
    this.cache = cache;
    this.writeFanoutThreshold = 1000; // Fanout on write for users with < 1000 followers
  }

  async createPost(post) {
    // Save post
    const saved = await this.database.insert("posts", post);

    // Get followers
    const followers = await this.getFollowers(post.userId);

    // Fanout based on follower count
    if (followers.length < this.writeFanoutThreshold) {
      // Fanout on write
      for (const followerId of followers) {
        await this.addToFeed(followerId, saved.id);
      }
    } else {
      // Don't fanout, will compute on read
      await this.markForFanout(saved.id, followers);
    }

    return saved;
  }

  async addToFeed(userId, postId) {
    await this.database.insert("feeds", {
      userId,
      postId,
      timestamp: new Date(),
    });
    await this.cache.del(`feed:${userId}`);
  }

  async markForFanout(postId, followers) {
    // Mark post for lazy fanout
    await this.database.insert("fanout_queue", {
      postId,
      followers: JSON.stringify(followers),
      createdAt: new Date(),
      completed: false,
    });
  }

  async processFanoutQueue() {
    // Process pending fanouts
    const pending = await this.database.query(
      "SELECT * FROM fanout_queue WHERE completed = FALSE LIMIT 100",
    );

    for (const item of pending) {
      const followers = JSON.parse(item.followers);
      for (const followerId of followers) {
        await this.addToFeed(followerId, item.postId);
      }
      await this.database.update(
        "fanout_queue",
        { completed: true, completedAt: new Date() },
        { id: item.id },
      );
    }
  }

  async getFeed(userId, options = {}) {
    // Check cache
    const cached = await this.cache.get(`feed:${userId}`);
    if (cached) {
      return cached;
    }

    // Check if user has pre-computed feed
    const feedCount = await this.database.query(
      "SELECT COUNT(*) as count FROM feeds WHERE userId = ?",
      [userId],
    );

    let feed;

    if (feedCount[0].count > 0) {
      // Get pre-computed feed
      feed = await this.database.query(
        `SELECT f.*, p.*, u.name as authorName, u.avatar as authorAvatar
         FROM feeds f
         JOIN posts p ON f.postId = p.id
         JOIN users u ON p.userId = u.id
         WHERE f.userId = $1
         ORDER BY f.timestamp DESC
         LIMIT $2 OFFSET $3`,
        [userId, options.limit || 50, options.offset || 0],
      );
    } else {
      // Compute on read
      const following = await this.getFollowing(userId);
      feed = await this.database.query(
        `SELECT p.*, u.name as authorName, u.avatar as authorAvatar
         FROM posts p
         JOIN users u ON p.userId = u.id
         WHERE p.userId IN ($1)
         ORDER BY p.timestamp DESC
         LIMIT $2 OFFSET $3`,
        [following.map((f) => f.id), options.limit || 50, options.offset || 0],
      );
    }

    // Cache for 5 minutes
    await this.cache.set(`feed:${userId}`, feed, { ttl: 300 });

    return feed;
  }

  async getFollowers(userId) {
    const result = await this.database.query(
      "SELECT followerId FROM follows WHERE followingId = ?",
      [userId],
    );
    return result.map((r) => r.followerId);
  }

  async getFollowing(userId) {
    const result = await this.database.query(
      "SELECT followingId FROM follows WHERE followerId = ?",
      [userId],
    );
    return result.map((r) => r.followingId);
  }
}

// Comparison
const comparison = {
  fanoutOnWrite: {
    description: "Pre-compute feeds when content is created",
    writeLatency: "High (fanout to all followers)",
    readLatency: "Low (just fetch)",
    storage: "High (store feed for each user)",
    useCase: "When read >> write (e.g., 1000:1 ratio)",
  },

  fanoutOnRead: {
    description: "Compute feed on demand",
    writeLatency: "Low (just save post)",
    readLatency: "High (query following + posts)",
    storage: "Low (just store posts)",
    useCase: "When write >> read (e.g., 1:1 ratio)",
  },

  hybrid: {
    description: "Combine both approaches",
    writeLatency: "Variable (depends on follower count)",
    readLatency: "Variable (depends on pre-computed feed)",
    storage: "Medium",
    useCase: "When both read and write are frequent",
  },
};
```

### Best Practices:

1. **Use caching**: Dùng caching
2. **Batch operations**: Batch operations
3. **Use background jobs**: Dùng background jobs cho fanout
4. **Monitor performance**: Theo dõi performance

```javascript
// ✅ Nên: Use caching cho feeds
const cached = await cache.get(`feed:${userId}`);
if (cached) {
  return cached;
}

// ✅ Nên: Batch fanout operations
const followers = await getFollowers(userId);
for (let i = 0; i < followers.length; i += 100) {
  const batch = followers.slice(i, i + 100);
  await batchAddToFeed(batch, postId);
}

// ✅ Nên: Use background jobs cho fanout
await queue.add("fanout", { postId, followers });

// ❌ Không nên: Fanout synchronously cho large follower lists
const followers = await getFollowers(userId); // 1M followers
for (const followerId of followers) {
  await addToFeed(followerId, postId); // Too slow!
}
```

---

## Fanout on write vs Fanout on read?

**Fanout on write** là pre-compute feeds khi content được tạo. **Fanout on read** là compute feeds khi user đọc.

### Mục đích / Purpose

Chọn strategy phù hợp với read/write ratio.

### Khi nào dùng / When to Use

| Strategy        | Khi nào dùng          |
| --------------- | --------------------- |
| Fanout on write | Read >> Write (100:1) |
| Fanout on read  | Write >> Read (1:1)   |
| - Hybrid        | Read ≈ Write          |

### Giúp ích gì / Benefits

- **Fanout on write**: Fast reads
- **Fanout on read**: Fast writes

### Ưu nhược điểm / Pros & Cons

| Strategy        | Ưu điểm     | Nhược điểm                |
| --------------- | ----------- | ------------------------- |
| Fanout on write | Fast reads  | Slow writes, high storage |
| Fanout on read  | Fast writes | Slow reads                |
| - Hybrid        | Balance     | Complexity                |

### Ví dụ:

```javascript
// Fanout on Write
class FanoutOnWrite {
  async createPost(post) {
    // Save post
    const saved = await database.insert("posts", post);

    // Get followers
    const followers = await this.getFollowers(post.userId);

    // Fanout to all followers
    for (const followerId of followers) {
      await this.addToFeed(followerId, saved.id);
    }

    return saved;
  }

  async addToFeed(userId, postId) {
    await database.insert("feeds", {
      userId,
      postId,
      timestamp: new Date(),
    });
  }
}

// Fanout on Read
class FanoutOnRead {
  async createPost(post) {
    // Just save post, no fanout
    return await database.insert("posts", post);
  }

  async getFeed(userId) {
    // Get following
    const following = await this.getFollowing(userId);

    // Get posts from following
    return await database.query(
      `SELECT p.*, u.name as authorName
       FROM posts p
       JOIN users u ON p.userId = u.id
       WHERE p.userId IN ($1)
       ORDER BY p.timestamp DESC
       LIMIT 50`,
      [following.map((f) => f.id)],
    );
  }
}

// Decision Tree
function chooseStrategy(followerCount, readWriteRatio) {
  if (followerCount < 1000 && readWriteRatio > 10) {
    return "fanout_on_write";
  } else if (followerCount > 10000 || readWriteRatio < 1) {
    return "fanout_on_read";
  } else {
    return "hybrid";
  }
}

// Usage
const followerCount = await getFollowerCount(userId);
const readWriteRatio = await getReadWriteRatio();
const strategy = chooseStrategy(followerCount, readWriteRatio);

switch (strategy) {
  case "fanout_on_write":
    return new FanoutOnWrite();
  case "fanout_on_read":
    return new FanoutOnRead();
  case "hybrid":
    return new HybridFeed();
}
```

### Best Practices:

1. **Analyze ratios**: Phân tích read/write ratios
2. **Use hybrid**: Dùng hybrid cho flexibility
3. **Monitor performance**: Theo dõi performance
4. **Adjust thresholds**: Điều chỉnh thresholds

```javascript
// ✅ Nên: Analyze read/write ratios
const ratio = await getReadWriteRatio();
if (ratio > 10) {
  // Use fanout on write
}

// ✅ Nên: Use hybrid cho flexibility
if (followerCount < 1000) {
  // Fanout on write
} else {
  // Fanout on read
}

// ✅ Nên: Monitor performance
const metrics = {
  writeLatency: await measureWriteLatency(),
  readLatency: await measureReadLatency(),
};

// ❌ Không nên: Hardcode strategy
const feed = new FanoutOnWrite();
// May not be optimal for all users
```

---

## Caching strategies?

**Caching strategies** cho news feed để giảm database load.

### Mục đích / Purpose

Giảm database load và improve performance.

### Khi nào dùng / When to Use

| Strategy            | Khi nào dùng            |
| ------------------- | ----------------------- |
| - User feed cache   | Cache user's feed       |
| - Post cache        | Cache individual posts  |
| - Timeline cache    | Cache timeline segments |
| - Materialized view | Pre-computed feeds      |

### Giúp ích gì / Benefits

- **Performance**: Tăng performance
- **Reduced load**: Giảm database load
- **Scalability**: Tăng scalability

### Ưu nhược điểm / Pros & Cons

| Strategy            | Ưu điểm      | Nhược điểm         |
| ------------------- | ------------ | ------------------ |
| - User feed cache   | Fast reads   | Stale data         |
| - Post cache        | Flexible     | Cache invalidation |
| - Timeline cache    | Balance      | Complexity         |
| - Materialized view | Pre-computed | High storage       |

### Ví dụ:

```javascript
// Caching Strategies for News Feed

class FeedCache {
  constructor(cache, database) {
    this.cache = cache;
    this.database = database;
  }

  async getUserFeed(userId, options = {}) {
    const cacheKey = `feed:${userId}:${options.offset || 0}:${options.limit || 50}`;

    // Check cache
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Get from database
    const feed = await this.database.query(
      `SELECT f.*, p.*, u.name as authorName
       FROM feeds f
       JOIN posts p ON f.postId = p.id
       JOIN users u ON p.userId = u.id
       WHERE f.userId = $1
       ORDER BY f.timestamp DESC
       LIMIT $2 OFFSET $3`,
      [userId, options.limit || 50, options.offset || 0],
    );

    // Cache for 5 minutes
    await this.cache.set(cacheKey, feed, { ttl: 300 });

    return feed;
  }

  async getPost(postId) {
    const cacheKey = `post:${postId}`;

    // Check cache
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Get from database
    const post = await this.database.query(
      `SELECT p.*, u.name as authorName, u.avatar as authorAvatar
       FROM posts p
       JOIN users u ON p.userId = u.id
       WHERE p.id = $1`,
      [postId],
    );

    if (post.length === 0) {
      return null;
    }

    // Cache for 10 minutes
    await this.cache.set(cacheKey, post[0], { ttl: 600 });

    return post[0];
  }

  async invalidateUserFeed(userId) {
    // Invalidate all user's feed cache
    const pattern = `feed:${userId}:*`;
    const keys = await this.cache.keys(pattern);

    for (const key of keys) {
      await this.cache.del(key);
    }
  }

  async invalidatePost(postId) {
    // Invalidate post cache
    await this.cache.del(`post:${postId}`);

    // Also invalidate feeds that contain this post
    // This is more complex, may need to track which feeds contain which posts
  }

  async getTimeline(userId, options = {}) {
    const cacheKey = `timeline:${userId}:${options.offset || 0}:${options.limit || 50}`;

    // Check cache
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Get from database
    const timeline = await this.database.query(
      `SELECT p.*, u.name as authorName
       FROM posts p
       JOIN users u ON p.userId = u.id
       WHERE p.userId IN (
         SELECT followingId FROM follows WHERE followerId = $1
       )
       ORDER BY p.timestamp DESC
       LIMIT $2 OFFSET $3`,
      [userId, options.limit || 50, options.offset || 0],
    );

    // Cache for 5 minutes
    await this.cache.set(cacheKey, timeline, { ttl: 300 });

    return timeline;
  }
}

// Usage
const feedCache = new FeedCache(redis, database);

// Get user's feed
const feed = await feedCache.getUserFeed(userId, { limit: 50 });

// Get individual post
const post = await feedCache.getPost(123);

// Invalidate user's feed when new post is created
await feedCache.invalidateUserFeed(userId);

// Get timeline
const timeline = await feedCache.getTimeline(userId, { limit: 50 });
```

### Best Practices:

1. **Cache user feeds**: Cache user feeds
2. **Use appropriate TTL**: Dùng TTL phù hợp
3. **Invalidate properly**: Invalidate properly
4. **Use cache warming**: Dùng cache warming

```javascript
// ✅ Nên: Cache user feeds
const cached = await cache.get(`feed:${userId}`);
if (cached) {
  return cached;
}

// ✅ Nên: Use appropriate TTL
await cache.set(`feed:${userId}`, feed, { ttl: 300 }); // 5 minutes

// ✅ Nên: Invalidate properly on new post
await cache.del(`feed:${userId}:*`);

// ✅ Nên: Warm cache for active users
await warmCacheForActiveUsers();

// ❌ Không nên: Cache too long
await cache.set(`feed:${userId}`, feed, { ttl: 3600 }); // 1 hour - too stale
```

---

## References

- [Facebook News Feed Architecture](https://www.youtube.com/watch?v=Oqnm9SjX1Y)
- [Twitter Timeline Architecture](https://blog.twitter.com/engineering/en_us/topics/infrastructure/2017/the-infrastructure-behind-twitter-scale)
- [Feed Generation Strategies](https://highscalability.com/blog/2016/9/20/the-feed-architecture-the-easy-parts/)
