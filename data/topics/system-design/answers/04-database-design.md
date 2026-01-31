# 4. Database Design

## Tổng quan về Database Design

### Mục đích của Database Design / Purpose

**Database Design** là quá trình thiết kế cấu trúc database để lưu trữ, quản lý và truy xuất data hiệu quả.

**Mục đích chính:**

- Lưu trữ data một cách có tổ chức
- Đảm bảo data integrity và consistency
- Tối ưu performance cho queries
- Hỗ trợ scalability
- Đảm bảo security và compliance

### Khi nào cần hiểu về Database Design / When to Use

Hiểu về Database Design là cần thiết khi:

- Thiết kế hệ thống mới
- Mở rộng hệ thống hiện tại
- Tối ưu database performance
- Xử lý data consistency issues
- Chuẩn bị cho scaling

### Giúp ích gì / Benefits

**Lợi ích:**

- **Data integrity**: Đảm bảo data integrity
- **Performance**: Tối ưu query performance
- **Scalability**: Hỗ trợ scaling
- **Maintainability**: Dễ maintain và evolve
- **Security**: Đảm bảo data security

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                  | Nhược điểm              |
| ------------------------ | ----------------------- |
| - Đảm bảo data integrity | Tốn thời gian thiết kế  |
| - Tối ưu performance     | Trade-offs phức tạp     |
| - Hỗ trợ scaling         | Cần chuyên môn          |
| - Dễ maintain            | Schema changes khó khăn |

---

## SQL vs NoSQL?

**SQL** (Relational Database) và **NoSQL** (Non-relational Database) là hai loại database chính với các trade-offs khác nhau.

### Mục đích / Purpose

Chọn loại database phù hợp với use case.

### Khi nào dùng / When to Use

| Use Case                | SQL     | NoSQL   |
| ----------------------- | ------- | ------- |
| Structured data         | ✅      | ❌      |
| Complex queries         | ✅      | Limited |
| - Transactions          | ✅      | Limited |
| - Flexible schema       | ❌      | ✅      |
| - Horizontal scaling    | Limited | ✅      |
| - High write throughput | Limited | ✅      |
| - ACID required         | ✅      | Limited |
| - Big data              | Limited | ✅      |

### Giúp ích gì / Benefits

- **SQL**: ACID transactions, complex queries, mature ecosystem
- **NoSQL**: Flexible schema, horizontal scaling, high performance

### Ưu nhược điểm / Pros & Cons

| Feature        | SQL                       | NoSQL                              |
| -------------- | ------------------------- | ---------------------------------- |
| Schema         | Fixed, rigid              | Flexible, dynamic                  |
| Scalability    | Vertical scaling          | Horizontal scaling                 |
| Transactions   | ACID                      | BASE (eventual consistency)        |
| Query language | SQL (powerful)            | Various (limited)                  |
| Consistency    | Strong                    | Eventual                           |
| Data model     | Relational                | Document, Key-value, Column, Graph |
| Examples       | MySQL, PostgreSQL, Oracle | MongoDB, Cassandra, Redis          |

### Ví dụ:

```javascript
// SQL Example (PostgreSQL)
const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  database: "mydb",
  user: "user",
  password: "password",
});

// Create table with schema
await pool.query(`
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// Insert data
await pool.query("INSERT INTO users (name, email) VALUES ($1, $2)", [
  "John Doe",
  "john@example.com",
]);

// Query with JOIN
const result = await pool.query(
  `
  SELECT u.name, o.order_date
  FROM users u
  JOIN orders o ON u.id = o.user_id
  WHERE u.id = $1
`,
  [userId],
);

// Transaction
await pool.query("BEGIN");
try {
  await pool.query("INSERT INTO accounts (user_id, balance) VALUES ($1, $2)", [
    userId,
    100,
  ]);
  await pool.query(
    "UPDATE accounts SET balance = balance - $1 WHERE user_id = $2",
    [50, userId],
  );
  await pool.query("COMMIT");
} catch (error) {
  await pool.query("ROLLBACK");
  throw error;
}

// NoSQL Example (MongoDB)
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");

// Insert document (no schema required)
await db.collection("users").insertOne({
  name: "John Doe",
  email: "john@example.com",
  address: {
    street: "123 Main St",
    city: "New York",
    country: "USA",
  },
  tags: ["premium", "verified"],
  createdAt: new Date(),
});

// Query (flexible)
const user = await db.collection("users").findOne({
  "address.city": "New York",
  tags: "premium",
});

// Aggregation pipeline
const result = await db
  .collection("orders")
  .aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: "$userId", total: { $sum: "$amount" } } },
    { $sort: { total: -1 } },
    { $limit: 10 },
  ])
  .toArray();

// Comparison
const databaseComparison = {
  sql: {
    databases: ["MySQL", "PostgreSQL", "Oracle", "SQL Server", "SQLite"],
    dataModel: "Relational (tables, rows, columns)",
    schema: "Fixed, predefined",
    queryLanguage: "SQL (Structured Query Language)",
    transactions: "ACID (Atomicity, Consistency, Isolation, Durability)",
    consistency: "Strong consistency",
    scaling: "Vertical scaling, limited horizontal scaling",
    useCases: [
      "Financial applications (banking, accounting)",
      "E-commerce (orders, inventory)",
      "CRM systems",
      "Enterprise applications",
      "Applications requiring complex queries and joins",
    ],
    pros: [
      "ACID transactions",
      "Powerful query language",
      "Data integrity",
      "Mature ecosystem",
      "Strong consistency",
    ],
    cons: [
      "Rigid schema",
      "Limited horizontal scaling",
      "Complex joins can be slow",
      "Not suitable for unstructured data",
    ],
  },

  nosql: {
    databases: ["MongoDB", "Cassandra", "Redis", "DynamoDB", "Couchbase"],
    dataModel: "Document, Key-value, Column-family, Graph",
    schema: "Flexible, dynamic",
    queryLanguage: "Various (MongoDB Query Language, CQL, etc.)",
    transactions:
      "Limited (BASE - Basically Available, Soft state, Eventual consistency)",
    consistency: "Eventual consistency (tunable in some)",
    scaling: "Horizontal scaling",
    useCases: [
      "Social media (posts, comments, likes)",
      "Real-time analytics",
      "Content management systems",
      "IoT data",
      "Big data applications",
      "Applications with rapid schema changes",
    ],
    pros: [
      "Flexible schema",
      "Horizontal scaling",
      "High performance",
      "Handles unstructured data",
      "Easy to evolve schema",
    ],
    cons: [
      "Limited query capabilities",
      "Eventual consistency",
      "Less mature ecosystem",
      "No standard query language",
      "Limited transactions",
    ],
  },
};

// Decision Tree
function chooseDatabase(requirements) {
  if (requirements.acidTransactions && requirements.complexQueries) {
    return "SQL";
  }

  if (requirements.flexibleSchema && requirements.horizontalScaling) {
    return "NoSQL";
  }

  if (requirements.structuredData && requirements.dataIntegrity) {
    return "SQL";
  }

  if (requirements.unstructuredData && requirements.highWriteThroughput) {
    return "NoSQL";
  }

  // Default to SQL for most traditional applications
  return "SQL";
}
```

### Best Practices:

1. **Understand requirements**: Hiểu rõ requirements trước khi chọn
2. **Consider CAP theorem**: Xem xét CAP theorem
3. **Think about scalability**: Cân nhắc scalability
4. **Don't over-engineer**: Đừng over-engineer với NoSQL khi SQL là đủ

```javascript
// ✅ Nên: SQL cho financial applications
// ACID transactions are critical
await pool.query("BEGIN");
await pool.query("UPDATE accounts SET balance = balance - $1 WHERE id = $2", [
  amount,
  fromAccount,
]);
await pool.query("UPDATE accounts SET balance = balance + $1 WHERE id = $2", [
  amount,
  toAccount,
]);
await pool.query("COMMIT");

// ✅ Nên: NoSQL cho social media feeds
// Flexible schema and high write throughput
await db.collection("posts").insertOne({
  userId,
  content,
  media: ["image1.jpg", "video1.mp4"],
  tags: ["#fun", "#life"],
  createdAt: new Date(),
});

// ❌ Không nên: Sử dụng NoSQL khi cần ACID transactions
// Eventual consistency can cause issues
await db
  .collection("accounts")
  .updateOne({ id: fromAccount }, { $inc: { balance: -amount } });
// No guarantee that the next operation will succeed
```

---

## ACID properties?

**ACID** là một set của properties đảm bảo database transactions được xử lý một cách đáng tin cậy.

### Mục đích / Purpose

Đảm bảo data integrity và consistency trong database transactions.

### Khi nào dùng / When to Use

| Property    | Khi nào dùng                      |
| ----------- | --------------------------------- |
| Atomicity   | Khi cần all-or-nothing operations |
| Consistency | Khi cần data validity             |
| Isolation   | Khi cần concurrent transactions   |
| Durability  | Khi cần data persistence          |

### Giúp ích gì / Benefits

- **Data integrity**: Đảm bảo data integrity
- **Reliability**: Tăng reliability
- **Consistency**: Đảm bảo data consistency
- **Predictability**: Hành vi predictable

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm             |
| ---------------------- | ---------------------- |
| Đảm bảo data integrity | Performance overhead   |
| - Tăng reliability     | Limit concurrency      |
| - Predictable behavior | Complex implementation |

### Ví dụ:

```javascript
// ACID Properties Explained

const acidProperties = {
  atomicity: {
    definition: "All operations in a transaction succeed or all fail",
    example: "Bank transfer: debit and credit must both succeed or both fail",
    guarantee: "No partial updates",
  },

  consistency: {
    definition: "Database must transition from one valid state to another",
    example: "Account balance cannot be negative",
    guarantee: "Data validity constraints are enforced",
  },

  isolation: {
    definition: "Concurrent transactions do not interfere with each other",
    example: "Two users updating the same record see consistent data",
    guarantee: "Transactions appear to execute sequentially",
  },

  durability: {
    definition: "Once a transaction commits, changes are permanent",
    example:
      "After money transfer, balance change persists even after power failure",
    guarantee: "Committed data is never lost",
  },
};

// ACID Transaction Example (Bank Transfer)
async function transferMoney(fromAccountId, toAccountId, amount) {
  await pool.query("BEGIN"); // Start transaction

  try {
    // Check balance
    const result = await pool.query(
      "SELECT balance FROM accounts WHERE id = $1 FOR UPDATE",
      [fromAccountId],
    );

    if (result.rows[0].balance < amount) {
      throw new Error("Insufficient balance");
    }

    // Debit from account
    await pool.query(
      "UPDATE accounts SET balance = balance - $1 WHERE id = $2",
      [amount, fromAccountId],
    );

    // Credit to account
    await pool.query(
      "UPDATE accounts SET balance = balance + $1 WHERE id = $2",
      [amount, toAccountId],
    );

    // Log transaction
    await pool.query(
      "INSERT INTO transactions (from_account, to_account, amount) VALUES ($1, $2, $3)",
      [fromAccountId, toAccountId, amount],
    );

    await pool.query("COMMIT"); // All operations succeed
    console.log("Transfer successful");
  } catch (error) {
    await pool.query("ROLLBACK"); // All operations fail
    console.error("Transfer failed:", error);
    throw error;
  }
}

// Isolation Levels
const isolationLevels = {
  readUncommitted: {
    description: "Lowest isolation, allows dirty reads",
    dirtyRead: "Can read uncommitted changes from other transactions",
    useCase: "Rarely used, only for special cases",
  },

  readCommitted: {
    description: "Prevents dirty reads, allows non-repeatable reads",
    nonRepeatableRead: "Same query can return different results",
    useCase: "Default in many databases",
  },

  repeatableRead: {
    description:
      "Prevents dirty and non-repeatable reads, allows phantom reads",
    phantomRead: "New rows can appear in subsequent reads",
    useCase: "Default in MySQL InnoDB",
  },

  serializable: {
    description: "Highest isolation, prevents all anomalies",
    guarantee: "Transactions appear to execute sequentially",
    useCase: "When absolute consistency is required",
  },
};

// Setting Isolation Level
await pool.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");

// BASE (Alternative to ACID for NoSQL)
const baseProperties = {
  basicallyAvailable: {
    description: "System guarantees availability",
    tradeoff: "May return stale or inconsistent data",
  },

  softState: {
    description: "State may change over time even without input",
    tradeoff: "Data may not be consistent across all nodes",
  },

  eventualConsistency: {
    description: "System will become consistent given enough time",
    tradeoff: "Temporary inconsistencies are possible",
  },
};

// Comparison: ACID vs BASE
const acidVsBase = {
  acid: {
    focus: "Consistency",
    useCase: "Traditional RDBMS",
    examples: ["Banking", "Financial systems", "Inventory management"],
    tradeoff: "Lower availability, higher latency",
  },

  base: {
    focus: "Availability",
    useCase: "NoSQL databases",
    examples: ["Social media", "CDNs", "DNS"],
    tradeoff: "Eventual consistency, potential data loss",
  },
};
```

### Best Practices:

1. **Use transactions when needed**: Dùng transactions khi cần ACID
2. **Keep transactions short**: Giữ transactions ngắn
3. **Choose appropriate isolation level**: Chọn isolation level phù hợp
4. **Handle errors properly**: Xử lý errors properly

```javascript
// ✅ Nên: Sử dụng transactions cho multi-step operations
async function placeOrder(userId, items) {
  await pool.query("BEGIN");

  try {
    // Check inventory
    for (const item of items) {
      const result = await pool.query(
        "SELECT quantity FROM inventory WHERE product_id = $1 FOR UPDATE",
        [item.productId],
      );

      if (result.rows[0].quantity < item.quantity) {
        throw new Error(`Insufficient inventory for product ${item.productId}`);
      }
    }

    // Create order
    const orderResult = await pool.query(
      "INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING id",
      [userId, calculateTotal(items)],
    );

    const orderId = orderResult.rows[0].id;

    // Update inventory
    for (const item of items) {
      await pool.query(
        "UPDATE inventory SET quantity = quantity - $1 WHERE product_id = $2",
        [item.quantity, item.productId],
      );

      await pool.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
        [orderId, item.productId, item.quantity, item.price],
      );
    }

    await pool.query("COMMIT");
    return orderId;
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
}

// ❌ Không nên: Không sử dụng transactions khi cần
async function placeOrder(userId, items) {
  // Create order
  const orderResult = await pool.query(
    "INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING id",
    [userId, calculateTotal(items)],
  );

  const orderId = orderResult.rows[0].id;

  // Update inventory (may fail!)
  for (const item of items) {
    await pool.query(
      "UPDATE inventory SET quantity = quantity - $1 WHERE product_id = $2",
      [item.quantity, item.productId],
    );
  }
  // If inventory update fails, order is still created - data inconsistency!
}
```

---

## Indexing strategies?

**Indexing** là kỹ thuật tạo data structures để tăng tốc độ queries.

### Mục đích / Purpose

Tăng performance của database queries.

### Khi nào dùng / When to Use

| Tình huống        | Khi nào dùng                  |
| ----------------- | ----------------------------- |
| Frequent queries  | Khi queries chạy thường xuyên |
| Large tables      | Khi table có nhiều rows       |
| - WHERE clauses   | Khi dùng WHERE clauses        |
| - JOIN operations | Khi dùng JOINs                |
| - ORDER BY        | Khi dùng ORDER BY             |

### Giúp ích gì / Benefits

- **Faster queries**: Queries nhanh hơn
- **Better performance**: Performance tốt hơn
- **Reduced I/O**: Giảm I/O operations

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm                    |
| ------------------- | ----------------------------- |
| - Queries nhanh hơn | Tốn disk space                |
| - Giảm I/O          | Làm chậm INSERT/UPDATE/DELETE |
| - Tăng performance  | Cần maintenance               |

### Ví dụ:

```javascript
// Indexing Strategies

// 1. Single Column Index
await pool.query(`
  CREATE INDEX idx_users_email ON users(email)
`);

// 2. Composite Index (Multiple columns)
await pool.query(`
  CREATE INDEX idx_orders_user_date ON orders(user_id, order_date)
`);

// 3. Unique Index
await pool.query(`
  CREATE UNIQUE INDEX idx_users_email ON users(email)
`);

// 4. Partial Index (Index only rows matching condition)
await pool.query(`
  CREATE INDEX idx_active_users ON users(email) WHERE status = 'active'
`);

// 5. Covering Index (Index includes all columns needed)
await pool.query(`
  CREATE INDEX idx_orders_covering ON orders(user_id, order_date) INCLUDE (total, status)
`);

// 6. Hash Index (Good for equality, not range)
await pool.query(`
  CREATE INDEX idx_users_id_hash ON users USING HASH(id)
`);

// 7. B-Tree Index (Default, good for range queries)
await pool.query(`
  CREATE INDEX idx_users_name_btree ON users USING BTREE(name)
`);

// 8. GIN Index (Good for array/jsonb)
await pool.query(`
  CREATE INDEX idx_posts_tags ON posts USING GIN(tags)
`);

// Index Usage Examples

// Without index - Full table scan
const result1 = await pool.query(`
  SELECT * FROM users WHERE email = 'john@example.com'
`);
// Scans all rows in users table

// With index - Index seek
const result2 = await pool.query(`
  SELECT * FROM users WHERE email = 'john@example.com'
`);
// Uses index to find row directly

// Composite index usage
const result3 = await pool.query(`
  SELECT * FROM orders WHERE user_id = 123 AND order_date >= '2024-01-01'
`);
// Uses composite index (user_id, order_date)

// Index not used (wrong order)
const result4 = await pool.query(`
  SELECT * FROM orders WHERE order_date >= '2024-01-01' AND user_id = 123
`);
// May not use index efficiently (columns in wrong order)

// Indexing Best Practices
const indexingBestPractices = {
  indexColumns: {
    description: "Index columns used in WHERE, JOIN, ORDER BY",
    examples: [
      "WHERE email = ?",
      "WHERE user_id = ? AND status = ?",
      "ORDER BY created_at DESC",
    ],
  },

  compositeIndex: {
    description: "Use composite index for multiple columns",
    rule: "Column order matters - most selective first",
    example: "CREATE INDEX idx (user_id, created_at)",
  },

  selectiveColumns: {
    description: "Index columns with high cardinality (many unique values)",
    good: ["email", "username", "id"],
    bad: ["status (few values)", "gender", "is_active"],
  },

  limitIndexes: {
    description: "Too many indexes slow down writes",
    recommendation: "Only index columns used in queries",
  },

  monitorUsage: {
    description: "Monitor index usage and remove unused indexes",
    command: "SELECT * FROM pg_stat_user_indexes",
  },
};

// Index Analysis
async function analyzeIndexUsage() {
  // Check which indexes are used
  const result = await pool.query(`
    SELECT 
      schemaname,
      tablename,
      indexname,
      idx_scan as index_scans,
      idx_tup_read as tuples_read,
      idx_tup_fetch as tuples_fetched
    FROM pg_stat_user_indexes
    ORDER BY idx_scan DESC
  `);

  // Find unused indexes
  const unused = await pool.query(`
    SELECT 
      schemaname,
      tablename,
      indexname
    FROM pg_stat_user_indexes
    WHERE idx_scan = 0
  `);

  return { used: result.rows, unused: unused.rows };
}

// Explain Query Plan
async function explainQuery(query, params) {
  const result = await pool.query("EXPLAIN ANALYZE " + query, params);
  return result.rows;
}

// Example: Check if index is used
const plan = await explainQuery("SELECT * FROM users WHERE email = $1", [
  "john@example.com",
]);
console.log(plan);
// Look for "Index Scan" vs "Seq Scan"
```

### Best Practices:

1. **Index frequently queried columns**: Index columns được query thường xuyên
2. **Use composite indexes wisely**: Dùng composite indexes một cách khôn ngoan
3. **Monitor index usage**: Theo dõi index usage
4. **Remove unused indexes**: Xóa indexes không dùng

```javascript
// ✅ Nên: Index columns used in WHERE clauses
await pool.query("CREATE INDEX idx_users_email ON users(email)");
await pool.query(
  "CREATE INDEX idx_orders_user_date ON orders(user_id, order_date)",
);

// ✅ Nên: Monitor index usage
const usage = await analyzeIndexUsage();
// Remove indexes that are never used

// ❌ Không nên: Index columns with low cardinality
await pool.query("CREATE INDEX idx_users_status ON users(status)");
// status only has a few values, index won't help much

// ❌ Không nên: Too many indexes on write-heavy tables
await pool.query("CREATE INDEX idx_col1 ON table(col1)");
await pool.query("CREATE INDEX idx_col2 ON table(col2)");
await pool.query("CREATE INDEX idx_col3 ON table(col3)");
// ... many more indexes
// This will slow down INSERT/UPDATE/DELETE
```

---

## Sharding vs Replication?

**Sharding** và **Replication** là hai kỹ thuật để scale database.

### Mục đích / Purpose

- **Sharding**: Scale horizontally bằng cách phân chia data
- **Replication**: Tăng availability và read scalability

### Khi nào dùng / When to Use

| Technique   | Khi nào dùng                                  |
| ----------- | --------------------------------------------- |
| Sharding    | Khi single node không đủ storage/capacity     |
| Replication | Khi cần high availability và read scalability |

### Giúp ích gì / Benefits

- **Sharding**: Horizontal scaling, distributed load
- **Replication**: High availability, read scalability

### Ưu nhược điểm / Pros & Cons

| Feature           | Sharding                | Replication              |
| ----------------- | ----------------------- | ------------------------ |
| Purpose           | Scale horizontally      | High availability        |
| Data distribution | Data split across nodes | Data copied across nodes |
| Write scalability | Yes                     | Limited (single master)  |
| Read scalability  | Yes                     | Yes                      |
| Complexity        | High                    | Medium                   |
| Consistency       | Eventual                | Strong (master-slave)    |

### Ví dụ:

```javascript
// Sharding Strategies

// 1. Hash-based Sharding
function getShard(key, numShards) {
  const hash = crypto.createHash('md5').update(key).digest('hex');
  const shardId = parseInt(hash.substring(0, 8), 16) % numShards;
  return shardId;
}

// Example: Shard users by user ID
const userId = 12345;
const shardId = getShard(userId.toString(), 4); // Shard 0, 1, 2, or 3

// 2. Range-based Sharding
function getShardByRange(value, ranges) {
  for (let i = 0; i < ranges.length; i++) {
    if (value >= ranges[i].min && value < ranges[i].max) {
      return i;
    }
  }
  return ranges.length - 1; // Last shard
}

// Example: Shard orders by date
const shardRanges = [
  { min: 0, max: 1000000 },    // Shard 0: orders 0-999999
  { min: 1000000, max: 2000000 }, // Shard 1: orders 1000000-1999999
  { min: 2000000, max: 3000000 }  // Shard 2: orders 2000000-2999999
];

const orderId = 1500000;
const shardId = getShardByRange(orderId, shardRanges); // Shard 1

// 3. Directory-based Sharding
class DirectorySharding {
  constructor() {
    this.directory = new Map(); // key -> shard ID
  }

  addShard(shardId, shard) {
    this.shards.set(shardId, shard);
  }

  assignKey(key, shardId) {
    this.directory.set(key, shardId);
  }

  getShard(key) {
    const shardId = this.directory.get(key);
    return this.shards.get(shardId);
  }

  moveKey(key, newShardId) {
    const oldShardId = this.directory.get(key);
    const oldShard = this.shards.get(oldShardId);
    const newShard = this.shards.get(newShardId);

    // Move data
    const data = await oldShard.get(key);
    await newShard.set(key, data);
    await oldShard.delete(key);

    // Update directory
    this.directory.set(key, newShardId);
  }
}

// Replication Strategies

// 1. Master-Slave Replication
const masterSlaveReplication = {
  master: {
    role: 'Handles all writes',
    reads: 'Can also handle reads'
  },

  slaves: [
    { role: 'Handle reads', sync: 'Async replication from master' },
    { role: 'Handle reads', sync: 'Async replication from master' }
  ],

  writes: 'Go to master',
  reads: 'Can go to any slave',

  pros: [
    'Read scalability',
    'High availability (if master fails, promote slave)',
    'Geographic distribution'
  ],

  cons: [
    'Replication lag (slaves may be behind)',
    'Single point of failure for writes (master)',
    'Complex failover'
  ]
};

// 2. Multi-Master Replication
const multiMasterReplication = {
  masters: [
    { role: 'Handle writes and reads' },
    { role: 'Handle writes and reads' }
  ],

  writes: 'Can go to any master',
  reads: 'Can go to any master',

  sync: 'Replicate changes to other masters',

  pros: [
    'Write scalability',
    'No single point of failure',
    'Geographic distribution'
  ],

  cons: [
    'Conflict resolution (same data updated on multiple masters)',
    'Complex',
    'Eventual consistency'
  ]
};

// Sharded Database with Replication
class ShardedReplicatedDatabase {
  constructor() {
    this.shards = new Map();
  }

  addShard(shardId, master, slaves = []) {
    this.shards.set(shardId, {
      master,
      slaves,
      writePool: [master],
      readPool: [master, ...slaves]
    });
  }

  async write(key, value) {
    const shardId = this.getShardId(key);
    const shard = this.shards.get(shardId);

    // Write to master
    return await this.writeToPool(shard.writePool, key, value);
  }

  async read(key) {
    const shardId = this.getShardId(key);
    const shard = this.shards.get(shardId);

    // Read from any replica
    return await this.readFromPool(shard.readPool, key);
  }

  getShardId(key) {
    // Hash-based sharding
    const hash = crypto.createHash('md5').update(key).digest('hex');
    return parseInt(hash.substring(0, 8), 16) % this.shards.size;
  }

  async writeToPool(pool, key, value) {
    // Try each node in pool until success
    for (const node of pool) {
      try {
        return await node.set(key, value);
      } catch (error) {
        console.error(`Failed to write to ${node.id}:`, error);
      }
    }
    throw new Error('Failed to write to all nodes');
  }

  async readFromPool(pool, key) {
    // Try each node in pool until success
    for (const node of pool) {
      try {
        return await node.get(key);
      } catch (error) {
        console.error(`Failed to read from ${node.id}:`, error);
      }
    }
    throw new Error('Failed to read from all nodes');
  }
}

// Comparison
const shardingVsReplication = {
  sharding: {
    purpose: 'Horizontal scaling',
    data: 'Split across nodes',
    writes: 'Distributed across shards',
    reads: 'Distributed across shards',
    complexity: 'High',
    useCase: 'When single node is not enough'
  },

  replication: {
    purpose: 'High availability',
    data: 'Copied across nodes',
    writes: 'Master (or multi-master)',
    reads: 'Any replica',
    complexity: 'Medium',
    useCase: 'When need high availability and read scalability'
  }
};
```

### Best Practices:

1. **Use replication first**: Dùng replication trước khi sharding
2. **Choose sharding key carefully**: Chọn sharding key cẩn thận
3. **Plan for rebalancing**: Lập kế hoạch cho rebalancing
4. **Monitor shard distribution**: Theo dõi shard distribution

```javascript
// ✅ Nên: Sử dụng replication trước khi sharding
// Master-slave replication for read scalability
const master = new Database("master-db");
const slave1 = new Database("slave-db-1");
const slave2 = new Database("slave-db-2");

// Writes go to master
async function writeData(key, value) {
  await master.set(key, value);
}

// Reads can go to any slave
async function readData(key) {
  const slave = [slave1, slave2][Math.floor(Math.random() * 2)];
  return await slave.get(key);
}

// ✅ Nên: Chọn sharding key cẩn thận
// Shard by user ID for user-specific data
const shardId = hash(userId) % numShards;

// ❌ Không nên: Shard bằng key có skew
// Shard by status (only a few values)
const shardId = hash(status) % numShards;
// Most data will go to one shard, defeating the purpose
```

---

## References

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Database Indexing Best Practices](https://use-the-index-luke.com/)
