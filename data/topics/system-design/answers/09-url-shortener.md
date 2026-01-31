# 9. URL Shortener (TinyURL)

## Tổng quan về URL Shortener

### Mục đích của URL Shortener / Purpose

**URL Shortener** là một service chuyển đổi long URLs thành short URLs và redirect users đến original URL.

**Mục đích chính:**

- Chuyển đổi long URLs thành short URLs
- Track clicks và analytics
- Hide long URLs trong messages
- Easy sharing on social media
- QR code generation

### Khi nào cần hiểu về URL Shortener / When to Use

Hiểu về URL Shortener là cần thiết khi:

- Thiết kế link shortening service
- Xử lý high volume redirects
- Cần track link analytics
- Xây dựng QR code generator

### Giúp ích gì / Benefits

**Lợi ích:**

- **Short URLs**: Dễ chia sẻ
- **Analytics**: Track clicks và user behavior
- **Branding**: Custom short domains
- **QR Codes**: Dễ tạo QR codes
- **Hide parameters**: Ẩn URL parameters

### Ưu nhược điểm / Pros & Cons

| Ưu điểm      | Nhược điểm         |
| ------------ | ------------------ |
| - Dễ chia sẻ | Cần infrastructure |
| - Analytics  | Phishing risk      |
| - QR codes   | Link rot           |
| - Branding   | Cần maintenance    |

---

## Thiết kế URL shortener?

**URL Shortener design** cần xử lý high volume requests với low latency.

### Mục đích / Purpose

Thiết kế system có thể xử lý millions of requests per day.

### Khi nào dùng / When to Use

| Tình huống       | Khi nào dùng           |
| ---------------- | ---------------------- |
| - High traffic   | Khi có nhiều users     |
| - Low latency    | Khi cần fast redirects |
| - Analytics      | Khi cần track clicks   |
| - Custom domains | Khi cần branded URLs   |

### Giúp ích gì / Benefits

- **Scalability**: Scale horizontally
- **Low latency**: Fast redirects
- **Analytics**: Track clicks
- **Custom domains**: Branded URLs

### Ưu nhược điểm / Pros & Cons

| Ưu điểm          | Nhược điểm         |
| ---------------- | ------------------ |
| - Fast redirects | Caching complexity |
| - Scalable       | Database load      |
| - Analytics      | Link rot           |

### Ví dụ:

```javascript
// URL Shortener Architecture

const architecture = {
  components: [
    "Load Balancer",
    "API Server",
    "Cache (Redis)",
    "Database",
    "Analytics Service",
    "CDN (optional)",
  ],

  flow: [
    "1. Client: POST /shorten with long URL",
    "2. API Server: Generate short code, save to DB",
    "3. API Server: Return short URL",
    "4. Client: GET /:code",
    "5. API Server: Lookup long URL, redirect",
    "6. Analytics: Log click event",
  ],
};

// URL Shortener Implementation
class URLShortener {
  constructor(database, cache) {
    this.database = database;
    this.cache = cache;
    this.base62 =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  }

  async shorten(longUrl, options = {}) {
    // Check if URL already shortened
    const existing = await this.database.findByLongUrl(longUrl);
    if (existing) {
      return this.buildShortUrl(existing.code);
    }

    // Generate short code
    const code = await this.generateCode();

    // Save to database
    const record = {
      code,
      longUrl,
      createdAt: new Date(),
      expiresAt: options.expiresAt,
      userId: options.userId,
      customAlias: options.customAlias,
    };

    await this.database.save(record);

    // Cache for faster lookups
    await this.cache.set(`url:${code}`, longUrl, { ttl: 3600 });

    return this.buildShortUrl(code);
  }

  async expand(code) {
    // Check cache first
    let longUrl = await this.cache.get(`url:${code}`);

    if (!longUrl) {
      // Lookup in database
      const record = await this.database.findByCode(code);

      if (!record) {
        throw new Error("URL not found");
      }

      // Check expiration
      if (record.expiresAt && record.expiresAt < new Date()) {
        throw new Error("URL expired");
      }

      longUrl = record.longUrl;

      // Cache for future requests
      await this.cache.set(`url:${code}`, longUrl, { ttl: 3600 });
    }

    // Log analytics
    await this.logClick(code);

    return longUrl;
  }

  async generateCode() {
    // Method 1: Random base62
    let code;
    let attempts = 0;
    const maxAttempts = 10;

    do {
      const id = await this.getNextId();
      code = this.encodeBase62(id);
      attempts++;

      // Check collision
      const existing = await this.database.findByCode(code);
      if (!existing) {
        return code;
      }
    } while (attempts < maxAttempts);

    throw new Error("Failed to generate unique code");
  }

  async getNextId() {
    // Get next ID from database
    return await this.database.getNextId();
  }

  encodeBase62(num) {
    let encoded = "";

    while (num > 0) {
      encoded = this.base62[num % 62] + encoded;
      num = Math.floor(num / 62);
    }

    return encoded || "0";
  }

  decodeBase62(str) {
    let decoded = 0;

    for (let i = 0; i < str.length; i++) {
      const charIndex = this.base62.indexOf(str[i]);
      decoded = decoded * 62 + charIndex;
    }

    return decoded;
  }

  buildShortUrl(code) {
    return `https://short.domain/${code}`;
  }

  async logClick(code) {
    // Log click asynchronously (don't block redirect)
    setImmediate(async () => {
      await this.database.logClick(code, {
        timestamp: new Date(),
        userAgent: this.getUserAgent(),
        ip: this.getIP(),
        referrer: this.getReferrer(),
      });
    });
  }

  getUserAgent() {
    // Get user agent from request
    return req.headers["user-agent"];
  }

  getIP() {
    // Get IP from request
    return req.ip;
  }

  getReferrer() {
    // Get referrer from request
    return req.headers["referer"];
  }
}

// API Endpoints
const express = require("express");
const app = express();

const urlShortener = new URLShortener(database, redis);

// Shorten URL
app.post("/shorten", async (req, res) => {
  const { longUrl, expiresAt, customAlias } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "longUrl is required" });
  }

  // Validate URL
  if (!isValidUrl(longUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    const shortUrl = await urlShortener.shorten(longUrl, {
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      userId: req.user?.id,
      customAlias,
    });

    res.json({ shortUrl });
  } catch (error) {
    if (error.message === "Custom alias already taken") {
      return res.status(409).json({ error: "Custom alias already taken" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// Expand URL (redirect)
app.get("/:code", async (req, res) => {
  const code = req.params.code;

  try {
    const longUrl = await urlShortener.expand(code);
    res.redirect(301, longUrl);
  } catch (error) {
    if (error.message === "URL not found" || error.message === "URL expired") {
      return res.status(404).json({ error: "URL not found" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get analytics
app.get("/analytics/:code", async (req, res) => {
  const code = req.params.code;

  try {
    const analytics = await urlShortener.getAnalytics(code);
    res.json(analytics);
  } catch (error) {
    res.status(404).json({ error: "URL not found" });
  }
});

// Database Schema
const databaseSchema = {
  urls: {
    id: "SERIAL PRIMARY KEY",
    code: "VARCHAR(10) UNIQUE NOT NULL",
    longUrl: "TEXT NOT NULL",
    createdAt: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    expiresAt: "TIMESTAMP",
    userId: "INTEGER",
    customAlias: "VARCHAR(50) UNIQUE",
    indexes: [
      "CREATE INDEX idx_code ON urls(code)",
      "CREATE INDEX idx_customAlias ON urls(customAlias)",
      "CREATE INDEX idx_createdAt ON urls(createdAt)",
    ],
  },

  clicks: {
    id: "SERIAL PRIMARY KEY",
    code: "VARCHAR(10) NOT NULL",
    timestamp: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    userAgent: "VARCHAR(500)",
    ip: "VARCHAR(45)",
    referrer: "VARCHAR(500)",
    indexes: [
      "CREATE INDEX idx_code ON clicks(code)",
      "CREATE INDEX idx_timestamp ON clicks(timestamp)",
    ],
  },
};

// Capacity Estimation
const capacity = {
  assumptions: {
    dailyActiveUsers: 1_000_000,
    shortenRequestsPerUser: 5,
    redirectRequestsPerShortUrl: 10,
    shortUrlLength: 7, // 7 characters = 62^7 = 3.5 trillion combinations
    dataRetentionDays: 90,
  },

  calculations: {
    dailyShortenRequests: 5_000_000,
    dailyRedirectRequests: 50_000_000,
    peakQPS: 5000,
    storagePerUrl: 500, // bytes
    dailyStorage: 2.5, // GB
    totalStorage: 225, // GB (90 days)
  },

  requirements: {
    apiServers: 5, // 1000 RPS per server
    database: "PostgreSQL with read replicas",
    cache: "Redis cluster",
    cdn: "Optional for redirect caching",
  },
};
```

### Best Practices:

1. **Use cache**: Dùng cache cho redirects
2. **Generate unique codes**: Generate unique codes
3. **Handle collisions**: Xử lý collisions
4. **Log analytics**: Log clicks asynchronously

```javascript
// ✅ Nên: Cache long URLs for fast redirects
const longUrl = await cache.get(`url:${code}`);
if (!longUrl) {
  longUrl = await database.findByCode(code);
  await cache.set(`url:${code}`, longUrl, { ttl: 3600 });
}

// ✅ Nên: Log clicks asynchronously
await logClick(code); // Don't block redirect

// ✅ Nên: Use base62 encoding for short URLs
const code = encodeBase62(id); // Shorter than base64

// ❌ Không nên: Synchronous database calls for analytics
await database.logClick(code); // Blocks redirect
```

---

## Hash function?

**Hash function** cho URL shortener chuyển đổi URL thành short code.

### Mục đích / Purpose

Generate unique, short codes từ long URLs.

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng        |
| ---------------------- | ------------------- |
| - Generate short codes | Khi cần short codes |
| - Unique identifiers   | Khi cần unique IDs  |
| - Obfuscate URLs       | Khi muốn ẩn URLs    |

### Giúp ích gì / Benefits

- **Short codes**: Codes ngắn gọn
- **Unique**: Unique identifiers
- **Deterministic**: Same input = same output

### Ưu nhược điểm / Pros & Cons

| Method          | Ưu điểm              | Nhược điểm              |
| --------------- | -------------------- | ----------------------- |
| Base62 encoding | Short, URL-safe      | Sequential, predictable |
| MD5 hash        | Fixed length, unique | Long, not URL-safe      |
| Custom hash     | Flexible             | Collision handling      |

### Ví dụ:

```javascript
// Hash Functions for URL Shortener

const hashFunctions = {
  base62Encoding: {
    description: "Encode ID using base62",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    pros: ["Short", "URL-safe", "No special characters"],
    cons: ["Sequential", "Predictable"],
  },

  md5Hash: {
    description: "Use MD5 hash of URL",
    pros: ["Fixed length", "Unique", "Not sequential"],
    cons: ["Longer", "Not URL-safe", "Collision handling needed"],
  },

  murmurHash: {
    description: "Use MurmurHash for fast, uniform distribution",
    pros: ["Fast", "Uniform distribution", "Low collision"],
    cons: ["Not URL-safe", "Need base encoding"],
  },
};

// Base62 Encoding
class Base62Encoder {
  constructor() {
    this.alphabet =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  }

  encode(num) {
    let encoded = "";

    while (num > 0) {
      encoded = this.alphabet[num % 62] + encoded;
      num = Math.floor(num / 62);
    }

    return encoded || "0";
  }

  decode(str) {
    let decoded = 0;

    for (let i = 0; i < str.length; i++) {
      const charIndex = this.alphabet.indexOf(str[i]);
      decoded = decoded * 62 + charIndex;
    }

    return decoded;
  }
}

// MD5 Hash
const crypto = require("crypto");

function md5Hash(url) {
  const hash = crypto.createHash("md5").update(url).digest("hex");

  // Take first 7 characters for short code
  return hash.substring(0, 7);
}

// MurmurHash (simplified)
function murmurHash(key) {
  // Simplified MurmurHash implementation
  const m = 0x5bd1e995;
  const r = 24;

  let h = key.length ^ m;
  const len = key.length;
  const index = 0;

  while (len >= 4) {
    const k =
      (key.charCodeAt(index) & 0xff) |
      ((key.charCodeAt(index + 1) & 0xff) << 8) |
      ((key.charCodeAt(index + 2) & 0xff) << 16) |
      ((key.charCodeAt(index + 3) & 0xff) << 24);

    k = (k * m) & 0xffffffff;
    k ^= k >>> r;
    k = (k * m) & 0xffffffff;

    h = (h * m) & 0xffffffff;
    h ^= k;

    index += 4;
    len -= 4;
  }

  switch (len) {
    case 3:
      h ^= (key.charCodeAt(index + 2) & 0xff) << 16;
    case 2:
      h ^= (key.charCodeAt(index + 1) & 0xff) << 8;
    case 1:
      h ^= key.charCodeAt(index) & 0xff;
      h = (h * m) & 0xffffffff;
  }

  h ^= h >>> 13;
  h = (h * m) & 0xffffffff;
  h ^= h >>> 15;

  return h >>> 0;
}

// Comparison
const comparison = {
  base62: {
    length: "7 characters = 3.5 trillion combinations",
    distribution: "Sequential",
    predictability: "High",
    collisionHandling: "Retry with next ID",
  },

  md5: {
    length: "7 characters (from 128-bit hash)",
    distribution: "Uniform",
    predictability: "Low",
    collisionHandling: "Check database, retry if exists",
  },

  murmur: {
    length: "7 characters (from 32-bit hash)",
    distribution: "Uniform",
    predictability: "Low",
    collisionHandling: "Check database, retry if exists",
  },
};

// Usage
const base62 = new Base62Encoder();

// Method 1: Base62 encoding with sequential ID
const id = 123456789;
const code1 = base62.encode(id); // '8M0kX'

// Method 2: MD5 hash
const url = "https://example.com/very/long/url/path?param=value";
const code2 = md5Hash(url); // 'a1b2c3d'

// Method 3: MurmurHash + Base62
const hash = murmurHash(url);
const code3 = base62.encode(hash); // 'xYzAbC'

// Collision Handling
async function generateUniqueCode(url, maxAttempts = 10) {
  for (let i = 0; i < maxAttempts; i++) {
    // Generate code
    const code = generateCode(url, i);

    // Check if code exists
    const existing = await database.findByCode(code);

    if (!existing) {
      return code;
    }
  }

  throw new Error("Failed to generate unique code");
}

function generateCode(url, attempt) {
  // Add salt to avoid same code for same URL
  const saltedUrl = url + (attempt > 0 ? `:${attempt}` : "");
  const hash = murmurHash(saltedUrl);
  return base62.encode(hash);
}
```

### Best Practices:

1. **Use base62**: Dùng base62 cho URL-safe characters
2. **Handle collisions**: Xử lý collisions
3. **Add randomness**: Thêm randomness để tránh predictable
4. **Consider custom aliases**: Xem xét custom aliases

```javascript
// ✅ Nên: Base62 encoding cho URL-safe codes
const code = base62.encode(id);

// ✅ Nên: Handle collisions
for (let i = 0; i < 10; i++) {
  const code = generateCode(url, i);
  if (!(await exists(code))) {
    return code;
  }
}

// ✅ Nên: Support custom aliases
if (customAlias && !(await exists(customAlias))) {
  code = customAlias;
}

// ❌ Không nên: MD5 without collision handling
const code = md5Hash(url);
// May collide with existing code
```

---

## Handling collisions?

**Collision handling** là xử lý khi generated code đã tồn tại trong database.

### Mục đích / Purpose

Đảm bảo mỗi short code là unique.

### Khi nào dùng / When to Use

| Tình huống        | Khi nào dùng                           |
| ----------------- | -------------------------------------- |
| - Hash collisions | Khi hash function produces same output |
| - Sequential IDs  | Khi IDs có thể collide                 |
| - Custom aliases  | Khi user chọn alias đã tồn tại         |

### Giúp ích gì / Benefits

- **Uniqueness**: Đảm bảo uniqueness
- **Reliability**: Tăng reliability
- **User experience**: Tăng UX

### Ưu nhược điểm / Pros & Cons

| Strategy    | Ưu điểm        | Nhược điểm            |
| ----------- | -------------- | --------------------- |
| Retry       | Đơn giản       | Có thể fail nhiều lần |
| Salt        | Giảm collision | Code dài hơn          |
| Check first | Efficient      | Thêm database call    |

### Ví dụ:

```javascript
// Collision Handling Strategies

const collisionStrategies = {
  retryWithNewHash: {
    description: "Generate new hash and retry",
    pros: ["Simple", "Guaranteed unique"],
    cons: ["Multiple attempts", "Slower"],
  },

  addSalt: {
    description: "Add random salt to URL before hashing",
    pros: ["Reduces collision probability", "Single attempt"],
    cons: ["Code depends on salt", "Not deterministic"],
  },

  checkAndRetry: {
    description: "Check if code exists, retry if it does",
    pros: ["Efficient", "No wasted attempts"],
    cons: ["Extra database call", "Race condition possible"],
  },
};

// Implementation
class CollisionHandler {
  constructor(database) {
    this.database = database;
    this.maxAttempts = 10;
  }

  async generateUniqueCode(url, generator) {
    for (let attempt = 0; attempt < this.maxAttempts; attempt++) {
      // Generate code
      const code = generator(url, attempt);

      // Check if exists
      const existing = await this.database.findByCode(code);

      if (!existing) {
        return { code, attempts: attempt + 1 };
      }
    }

    throw new Error("Failed to generate unique code after max attempts");
  }

  async generateWithSalt(url, generator) {
    let code;
    let attempt = 0;

    do {
      // Add random salt
      const salt = Math.random().toString(36).substring(2, 8);
      const saltedUrl = `${url}:${salt}`;

      // Generate code
      code = generator(saltedUrl, 0);

      // Check if exists
      const existing = await this.database.findByCode(code);

      if (!existing) {
        return { code, attempts: attempt + 1, salt };
      }

      attempt++;
    } while (attempt < this.maxAttempts);

    throw new Error("Failed to generate unique code after max attempts");
  }

  async generateWithCheck(url, generator) {
    // Generate code
    const code = generator(url, 0);

    // Check if exists
    const existing = await this.database.findByCode(code);

    if (!existing) {
      return { code, attempts: 1 };
    }

    // Retry with modified URL
    return await this.generateUniqueCode(url, generator);
  }
}

// Usage
const collisionHandler = new CollisionHandler(database);

// Strategy 1: Retry with new hash
const result1 = await collisionHandler.generateUniqueCode(
  url,
  (url, attempt) => {
    const hash = murmurHash(url + (attempt > 0 ? `:${attempt}` : ""));
    return base62.encode(hash);
  },
);

console.log(
  `Generated code: ${result1.code} after ${result1.attempts} attempts`,
);

// Strategy 2: Add salt
const result2 = await collisionHandler.generateWithSalt(url, (url) => {
  const hash = murmurHash(url);
  return base62.encode(hash);
});

console.log(`Generated code: ${result2.code} with salt: ${result2.salt}`);

// Strategy 3: Check first
const result3 = await collisionHandler.generateWithCheck(url, (url) => {
  const hash = murmurHash(url);
  return base62.encode(hash);
});

console.log(`Generated code: ${result3.code}`);

// Custom Alias Collision Handling
async function createCustomAlias(longUrl, customAlias) {
  // Check if custom alias exists
  const existing = await database.findByCode(customAlias);

  if (existing) {
    throw new Error("Custom alias already taken");
  }

  // Save with custom alias
  await database.save({
    code: customAlias,
    longUrl,
    isCustom: true,
  });

  return buildShortUrl(customAlias);
}

// Race Condition Handling
async function generateWithLock(url, generator) {
  const lockKey = `generate:${url}`;

  // Acquire lock
  const lock = await redis.set(lockKey, "1", { nx: true, ex: 10 });

  if (!lock) {
    // Another process is generating, wait and retry
    await sleep(100);
    return await generateWithLock(url, generator);
  }

  try {
    // Generate code
    const code = generator(url, 0);

    // Check if exists
    const existing = await database.findByCode(code);

    if (!existing) {
      return code;
    }

    // Retry
    return await generateUniqueCode(url, generator);
  } finally {
    // Release lock
    await redis.del(lockKey);
  }
}
```

### Best Practices:

1. **Set max attempts**: Đặt max attempts
2. **Use locks**: Dùng locks để tránh race conditions
3. **Handle custom aliases**: Xử lý custom aliases
4. **Log collisions**: Log collisions để monitor

```javascript
// ✅ Nên: Retry with max attempts
for (let i = 0; i < 10; i++) {
  const code = generateCode(url, i);
  if (!(await exists(code))) {
    return code;
  }
}

// ✅ Nên: Use distributed locks
const lock = await redis.set(`lock:${url}`, "1", { nx: true, ex: 10 });

// ✅ Nên: Handle custom alias collisions
if (await exists(customAlias)) {
  throw new Error("Custom alias already taken");
}

// ❌ Không nên: Infinite retry loop
while (true) {
  const code = generateCode(url);
  if (!(await exists(code))) {
    return code;
  }
  // May never exit!
}
```

---

## References

- [Bitly Engineering Blog](https://blog.bitly.com/)
- [URL Shortener Design](https://www.youtube.com/watch?v=5xQ9e2J0pA)
- [Base62 Encoding](https://en.wikipedia.org/wiki/Base62)
