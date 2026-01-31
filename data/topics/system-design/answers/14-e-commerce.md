# 14. E-commerce System

## Tổng quan về E-commerce System

### Mục đích của E-commerce System / Purpose

**E-commerce System** là một platform cho phép users browse, search, và purchase products online.

**Mục đích chính:**

- Product catalog management
- Shopping cart functionality
- Order processing
- Payment integration
- Inventory management

### Khi nào cần hiểu về E-commerce System / When to Use

Hiểu về E-commerce System là cần thiết khi:

- Thiết kế online store
- Xử lý high traffic sales
- Cần inventory management
- Implement payment processing
- Xây dựng order management

### Giúp ích gì / Benefits

**Lợi ích:**

- **Sales**: Tăng sales
- **Scalability**: Scale cho high traffic
- **Automation**: Tự động hóa processes
- **Analytics**: Sales analytics
- **Customer experience**: Better UX

### Ưu nhược điểm / Pros & Cons

| Ưu điểm          | Nhược điểm           |
| ---------------- | -------------------- |
| - Online sales   | Competition cao      |
| - Global reach   | Logistics complexity |
| - 24/7 operation | Inventory challenges |
| - Data insights  | Security concerns    |

---

## Product catalog?

**Product catalog** là nơi lưu trữ và quản lý product information.

### Mục đích / Purpose

Lưu trữ và quản lý product information.

### Khi nào dùng / When to Use

| Tình huống           | Khi nào dùng                    |
| -------------------- | ------------------------------- |
| - Product management | Khi quản lý products            |
| - Search             | Khi cần search functionality    |
| - Category browsing  | Khi cần browse categories       |
| - Recommendations    | Khi cần product recommendations |

### Giúp ích gì / Benefits

- **Centralized storage**: Centralized product data
- **Fast search**: Fast product search
- **Easy management**: Easy product management
- **Analytics**: Product analytics

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm              |
| ----------------- | ----------------------- |
| - Centralized     | Single point of failure |
| - Fast search     | Indexing overhead       |
| - Easy management | Data consistency        |
| - Analytics       | Storage cost            |

### Ví dụ:

```javascript
// Product Catalog Schema
const productSchema = {
  products: {
    id: "SERIAL PRIMARY KEY",
    sku: "VARCHAR(50) UNIQUE NOT NULL",
    name: "VARCHAR(255) NOT NULL",
    description: "TEXT",
    price: "DECIMAL(10,2) NOT NULL",
    compareAtPrice: "DECIMAL(10,2)",
    categoryId: "INTEGER NOT NULL",
    brandId: "INTEGER",
    images: "JSONB", // Array of image URLs
    attributes: "JSONB", // Product attributes (color, size, etc.)
    inventory: "INTEGER DEFAULT 0",
    status: "VARCHAR(20) NOT NULL", // 'active', 'inactive', 'out_of_stock'
    createdAt: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    updatedAt: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    indexes: [
      "CREATE INDEX idx_sku ON products(sku)",
      "CREATE INDEX idx_categoryId ON products(categoryId)",
      "CREATE INDEX idx_brandId ON products(brandId)",
      "CREATE INDEX idx_status ON products(status)",
      "CREATE INDEX idx_price ON products(price)",
      "CREATE INDEX idx_name ON products USING gin(to_tsvector('english', name))", // Full-text search
    ],
  },

  categories: {
    id: "SERIAL PRIMARY KEY",
    name: "VARCHAR(255) NOT NULL",
    parentId: "INTEGER", // For nested categories
    slug: "VARCHAR(255) UNIQUE NOT NULL",
    description: "TEXT",
    image: "VARCHAR(500)",
    sortOrder: "INTEGER DEFAULT 0",
    indexes: [
      "CREATE INDEX idx_parentId ON categories(parentId)",
      "CREATE INDEX idx_slug ON categories(slug)",
    ],
  },

  brands: {
    id: "SERIAL PRIMARY KEY",
    name: "VARCHAR(255) NOT NULL",
    slug: "VARCHAR(255) UNIQUE NOT NULL",
    logo: "VARCHAR(500)",
    description: "TEXT",
    indexes: ["CREATE INDEX idx_slug ON brands(slug)"],
  },

  product_attributes: {
    id: "SERIAL PRIMARY KEY",
    productId: "INTEGER NOT NULL",
    name: "VARCHAR(100) NOT NULL",
    value: "TEXT",
    type: "VARCHAR(50)", // 'text', 'number', 'color', 'size', etc.
    indexes: [
      "CREATE INDEX idx_productId ON product_attributes(productId)",
      "CREATE INDEX idx_type ON product_attributes(type)",
    ],
  },
};

// Product Catalog Service
class ProductCatalog {
  constructor(database, cache, searchService) {
    this.database = database;
    this.cache = cache;
    this.searchService = searchService;
  }

  async createProduct(product) {
    // Validate product
    this.validateProduct(product);

    // Check if SKU exists
    const existing = await this.database.query(
      "SELECT id FROM products WHERE sku = $1",
      [product.sku],
    );

    if (existing.length > 0) {
      throw new Error("SKU already exists");
    }

    // Save product
    const saved = await this.database.insert("products", {
      ...product,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Save product attributes
    for (const attribute of product.attributes || []) {
      await this.database.insert("product_attributes", {
        productId: saved.id,
        ...attribute,
      });
    }

    // Index for search
    await this.searchService.index("products", saved.id, {
      name: product.name,
      description: product.description,
      category: await this.getCategory(product.categoryId),
      attributes: product.attributes,
    });

    // Invalidate cache
    await this.invalidateProductCache(saved.id);

    return saved;
  }

  async getProduct(productId) {
    // Check cache
    const cached = await this.cache.get(`product:${productId}`);
    if (cached) {
      return cached;
    }

    // Get from database
    const product = await this.database.query(
      `SELECT p.*, c.name as categoryName, b.name as brandName, b.logo as brandLogo
       FROM products p
       LEFT JOIN categories c ON p.categoryId = c.id
       LEFT JOIN brands b ON p.brandId = b.id
       WHERE p.id = $1`,
      [productId],
    );

    if (product.length === 0) {
      throw new Error("Product not found");
    }

    // Get product attributes
    const attributes = await this.database.query(
      "SELECT * FROM product_attributes WHERE productId = ?",
      [productId],
    );

    product[0].attributes = attributes;

    // Cache for 5 minutes
    await this.cache.set(`product:${productId}`, product[0], { ttl: 300 });

    return product[0];
  }

  async searchProducts(query, options = {}) {
    const {
      category,
      brand,
      minPrice,
      maxPrice,
      status = "active",
      limit = 20,
      offset = 0,
    } = options;

    // Build search query
    const conditions = ["p.status = $1"];
    const params = [status];

    if (query) {
      conditions.push("(p.name ILIKE $2 OR p.description ILIKE $2)");
      params.push(`%${query}%`, query);
    }

    if (category) {
      conditions.push("p.categoryId = $3");
      params.push(category);
    }

    if (brand) {
      conditions.push("p.brandId = $4");
      params.push(brand);
    }

    if (minPrice !== undefined) {
      conditions.push("p.price >= $5");
      params.push(minPrice);
    }

    if (maxPrice !== undefined) {
      conditions.push("p.price <= $6");
      params.push(maxPrice);
    }

    const whereClause = conditions.join(" AND ");
    const sql = `
      SELECT p.*, c.name as categoryName
      FROM products p
      LEFT JOIN categories c ON p.categoryId = c.id
      WHERE ${whereClause}
      ORDER BY p.createdAt DESC
      LIMIT $7 OFFSET $8
    `;

    const products = await this.database.query(sql, [...params, limit, offset]);

    return products;
  }

  async updateProduct(productId, updates) {
    // Validate updates
    if (updates.sku) {
      const existing = await this.database.query(
        "SELECT id FROM products WHERE sku = $1 AND id != $2",
        [updates.sku, productId],
      );

      if (existing.length > 0) {
        throw new Error("SKU already exists");
      }
    }

    // Update product
    const updated = await this.database.update(
      "products",
      { ...updates, updatedAt: new Date() },
      { id: productId },
    );

    // Update search index
    const product = await this.getProduct(productId);
    await this.searchService.update("products", productId, {
      name: updates.name || product.name,
      description: updates.description || product.description,
      category: await this.getCategory(product.categoryId),
      attributes: updates.attributes || product.attributes,
    });

    // Invalidate cache
    await this.invalidateProductCache(productId);

    return updated;
  }

  async updateInventory(productId, quantityChange) {
    // Update inventory
    const result = await this.database.query(
      `UPDATE products 
       SET inventory = inventory + $1,
           updatedAt = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [quantityChange, productId],
    );

    // Invalidate cache
    await this.invalidateProductCache(productId);

    // Check if product is out of stock
    if (result[0].inventory <= 0) {
      await this.markOutOfStock(productId);
    }

    return result[0];
  }

  async getProductsByCategory(categoryId, options = {}) {
    const { limit = 50, offset = 0 } = options;

    const products = await this.database.query(
      `SELECT p.*, c.name as categoryName
       FROM products p
       JOIN categories c ON p.categoryId = c.id
       WHERE p.categoryId = $1
         AND p.status = 'active'
       ORDER BY p.sortOrder ASC, p.createdAt DESC
       LIMIT $2 OFFSET $3`,
      [categoryId, limit, offset],
    );

    return products;
  }

  async getProductsByBrand(brandId, options = {}) {
    const { limit = 50, offset = 0 } = options;

    const products = await this.database.query(
      `SELECT p.*, b.name as brandName
       FROM products p
       JOIN brands b ON p.brandId = b.id
       WHERE p.brandId = $1
         AND p.status = 'active'
       ORDER BY p.createdAt DESC
       LIMIT $2 OFFSET $3`,
      [brandId, limit, offset],
    );

    return products;
  }

  async markOutOfStock(productId) {
    await this.database.update(
      "products",
      { status: "out_of_stock", updatedAt: new Date() },
      { id: productId },
    );

    // Invalidate cache
    await this.invalidateProductCache(productId);

    // Notify inventory system
    await this.notifyOutOfStock(productId);
  }

  async getCategory(categoryId) {
    const category = await this.database.query(
      "SELECT * FROM categories WHERE id = ?",
      [categoryId],
    );
    return category[0];
  }

  validateProduct(product) {
    if (!product.sku || !product.name || !product.price) {
      throw new Error("SKU, name, and price are required");
    }

    if (product.price <= 0) {
      throw new Error("Price must be positive");
    }

    if (!product.categoryId) {
      throw new Error("Category is required");
    }
  }

  async invalidateProductCache(productId) {
    // Invalidate product cache
    await this.cache.del(`product:${productId}`);

    // Invalidate category cache
    const product = await this.database.query(
      "SELECT categoryId FROM products WHERE id = ?",
      [productId],
    );
    if (product.length > 0) {
      await this.cache.del(`category:products:${product[0].categoryId}`);
    }
  }
}

// Usage
const productCatalog = new ProductCatalog(database, redis, elasticsearch);

// Create product
const product = await productCatalog.createProduct({
  sku: "PROD-001",
  name: "Awesome Product",
  description: "This is an awesome product",
  price: 99.99,
  compareAtPrice: 129.99,
  categoryId: 1,
  brandId: 1,
  images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  attributes: [
    { name: "Color", value: "Red", type: "text" },
    { name: "Size", value: "Large", type: "text" },
  ],
});

// Get product
const product = await productCatalog.getProduct(1);

// Search products
const results = await productCatalog.searchProducts("awesome", {
  category: 1,
  minPrice: 50,
  maxPrice: 150,
});

// Update inventory
await productCatalog.updateInventory(1, -5); // Sold 5 items
```

### Best Practices:

1. **Use caching**: Dùng caching cho products
2. **Index properly**: Index properly
3. **Use search service**: Dùng search service
4. **Handle out of stock**: Xử lý out of stock

```javascript
// ✅ Nên: Cache product data
const cached = await cache.get(`product:${productId}`);
if (cached) {
  return cached;
}

// ✅ Nên: Index properly
CREATE INDEX idx_category_price ON products(categoryId, price, status);

// ✅ Nên: Use search service
await searchService.index('products', productId, productData);

// ✅ Nên: Handle out of stock
if (inventory <= 0) {
  await markOutOfStock(productId);
}

// ❌ Không nên: N+1 queries cho product details
const product = await database.query('SELECT * FROM products WHERE id = ?', [id]);
const category = await database.query('SELECT * FROM categories WHERE id = ?', [product.categoryId]);
const brand = await database.query('SELECT * FROM brands WHERE id = ?', [product.brandId]);
// Use JOIN instead
```

---

## Inventory management?

**Inventory management** là quá trình track và manage product stock levels.

### Mục đích / Purpose

Track và manage product stock levels.

### Khi nào dùng / When to Use

| Tình huống         | Khi nào dùng             |
| ------------------ | ------------------------ |
| - Stock tracking   | Khi cần track stock      |
| - Order processing | Khi process orders       |
| - Restocking       | Khi restock products     |
| - Low stock alerts | Khi cần low stock alerts |

### Giúp ích gì / Benefits

- **Stock accuracy**: Accurate stock levels
- **Prevent overselling**: Prevent overselling
- **Automated reordering**: Automated reordering
- **Analytics**: Inventory analytics

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm           |
| ---------------------- | -------------------- |
| - Accurate tracking    | Complexity           |
| - Prevent overselling  | Storage overhead     |
| - Automated reordering | Configuration needed |
| - Analytics            | Real-time challenges |

### Ví dụ:

```javascript
// Inventory Management Schema
const inventorySchema = {
  inventory: {
    id: "SERIAL PRIMARY KEY",
    productId: "INTEGER NOT NULL",
    warehouseId: "INTEGER NOT NULL",
    quantity: "INTEGER NOT NULL",
    reservedQuantity: "INTEGER DEFAULT 0",
    availableQuantity:
      "INTEGER GENERATED ALWAYS AS (quantity - reservedQuantity) STORED",
    lowStockThreshold: "INTEGER DEFAULT 10",
    lastRestockDate: "TIMESTAMP",
    createdAt: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    updatedAt: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    indexes: [
      "CREATE INDEX idx_productId ON inventory(productId)",
      "CREATE INDEX idx_warehouseId ON inventory(warehouseId)",
      "CREATE INDEX idx_availableQuantity ON inventory(availableQuantity)",
    ],
    uniqueConstraint: "UNIQUE(productId, warehouseId)",
  },

  inventory_transactions: {
    id: "SERIAL PRIMARY KEY",
    inventoryId: "INTEGER NOT NULL",
    type: "VARCHAR(20) NOT NULL", // 'purchase', 'sale', 'adjustment', 'restock'
    quantity: "INTEGER NOT NULL",
    referenceId: "INTEGER", // Order ID, restock ID, etc.
    referenceType: "VARCHAR(20)", // 'order', 'restock', 'adjustment'
    notes: "TEXT",
    createdAt: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    indexes: [
      "CREATE INDEX idx_inventoryId ON inventory_transactions(inventoryId)",
      "CREATE INDEX idx_type ON inventory_transactions(type)",
      "CREATE INDEX idx_referenceId ON inventory_transactions(referenceId)",
    ],
  },

  warehouses: {
    id: "SERIAL PRIMARY KEY",
    name: "VARCHAR(255) NOT NULL",
    address: "TEXT",
    location: "VARCHAR(255)",
    isDefault: "BOOLEAN DEFAULT FALSE",
    indexes: ["CREATE INDEX idx_isDefault ON warehouses(isDefault)"],
  },
};

// Inventory Management Service
class InventoryManager {
  constructor(database, cache, eventBus) {
    this.database = database;
    this.cache = cache;
    this.eventBus = eventBus;
  }

  async reserveStock(orderId, items) {
    // Reserve stock for order
    const reservations = [];

    for (const item of items) {
      // Get inventory
      const inventory = await this.database.query(
        `SELECT * FROM inventory
         WHERE productId = $1
         AND warehouseId = (SELECT id FROM warehouses WHERE isDefault = TRUE LIMIT 1)
         FOR UPDATE`,
        [item.productId],
      );

      if (inventory.length === 0) {
        throw new Error(`Product ${item.productId} not found in inventory`);
      }

      // Check if enough stock
      if (inventory[0].availableQuantity < item.quantity) {
        throw new Error(`Insufficient stock for product ${item.productId}`);
      }

      // Reserve stock
      const newReservedQuantity = inventory[0].reservedQuantity + item.quantity;
      await this.database.update(
        "inventory",
        { reservedQuantity: newReservedQuantity, updatedAt: new Date() },
        { id: inventory[0].id },
      );

      // Log transaction
      await this.database.insert("inventory_transactions", {
        inventoryId: inventory[0].id,
        type: "sale",
        quantity: -item.quantity,
        referenceId: orderId,
        referenceType: "order",
        notes: `Reserved for order ${orderId}`,
      });

      // Invalidate cache
      await this.cache.del(`inventory:${item.productId}`);

      // Check low stock
      const newAvailableQuantity = inventory[0].quantity - newReservedQuantity;
      if (newAvailableQuantity <= inventory[0].lowStockThreshold) {
        await this.notifyLowStock(item.productId, newAvailableQuantity);
      }

      reservations.push({
        productId: item.productId,
        quantity: item.quantity,
        inventoryId: inventory[0].id,
      });
    }

    return reservations;
  }

  async releaseStock(orderId, items) {
    // Release reserved stock (order cancelled)
    for (const item of items) {
      // Get inventory
      const inventory = await this.database.query(
        `SELECT * FROM inventory WHERE productId = $1`,
        [item.productId],
      );

      if (inventory.length === 0) {
        continue;
      }

      // Release stock
      const newReservedQuantity = inventory[0].reservedQuantity - item.quantity;
      await this.database.update(
        "inventory",
        {
          reservedQuantity: Math.max(0, newReservedQuantity),
          updatedAt: new Date(),
        },
        { id: inventory[0].id },
      );

      // Log transaction
      await this.database.insert("inventory_transactions", {
        inventoryId: inventory[0].id,
        type: "adjustment",
        quantity: item.quantity,
        referenceId: orderId,
        referenceType: "order",
        notes: `Released from order ${orderId}`,
      });

      // Invalidate cache
      await this.cache.del(`inventory:${item.productId}`);
    }
  }

  async restock(productId, quantity, warehouseId = null) {
    // Get default warehouse if not specified
    if (!warehouseId) {
      const warehouse = await this.database.query(
        "SELECT id FROM warehouses WHERE isDefault = TRUE LIMIT 1",
      );
      warehouseId = warehouse[0].id;
    }

    // Get or create inventory
    let inventory = await this.database.query(
      `SELECT * FROM inventory WHERE productId = $1 AND warehouseId = $2`,
      [productId, warehouseId],
    );

    if (inventory.length === 0) {
      // Create new inventory
      inventory = await this.database.insert("inventory", {
        productId,
        warehouseId,
        quantity: 0,
        reservedQuantity: 0,
        lowStockThreshold: 10,
      });
    } else {
      // Update existing inventory
      inventory = await this.database.update(
        "inventory",
        {
          quantity: inventory[0].quantity + quantity,
          lastRestockDate: new Date(),
        },
        { id: inventory[0].id },
      );
    }

    // Log transaction
    await this.database.insert("inventory_transactions", {
      inventoryId: inventory.id,
      type: "restock",
      quantity,
      notes: `Restocked ${quantity} units`,
    });

    // Invalidate cache
    await this.cache.del(`inventory:${productId}`);

    // Notify restock
    await this.eventBus.publish("inventory.restocked", {
      productId,
      quantity,
      warehouseId,
    });

    return inventory;
  }

  async adjustStock(productId, quantity, reason) {
    // Manual stock adjustment
    const inventory = await this.database.query(
      `SELECT * FROM inventory WHERE productId = $1
         AND warehouseId = (SELECT id FROM warehouses WHERE isDefault = TRUE LIMIT 1)
         FOR UPDATE`,
      [productId],
    );

    if (inventory.length === 0) {
      throw new Error(`Product ${productId} not found in inventory`);
    }

    // Adjust stock
    await this.database.update(
      "inventory",
      { quantity: inventory[0].quantity + quantity, updatedAt: new Date() },
      { id: inventory[0].id },
    );

    // Log transaction
    await this.database.insert("inventory_transactions", {
      inventoryId: inventory[0].id,
      type: "adjustment",
      quantity,
      notes: reason,
    });

    // Invalidate cache
    await this.cache.del(`inventory:${productId}`);

    return inventory;
  }

  async getAvailableStock(productId, warehouseId = null) {
    // Get default warehouse if not specified
    if (!warehouseId) {
      const warehouse = await this.database.query(
        "SELECT id FROM warehouses WHERE isDefault = TRUE LIMIT 1",
      );
      warehouseId = warehouse[0].id;
    }

    // Check cache
    const cacheKey = `inventory:${productId}:${warehouseId}`;
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Get from database
    const inventory = await this.database.query(
      `SELECT * FROM inventory WHERE productId = $1 AND warehouseId = $2`,
      [productId, warehouseId],
    );

    if (inventory.length === 0) {
      return 0;
    }

    // Cache for 5 minutes
    await this.cache.set(cacheKey, inventory[0].availableQuantity, {
      ttl: 300,
    });

    return inventory[0].availableQuantity;
  }

  async notifyLowStock(productId, availableQuantity) {
    // Notify about low stock
    const product = await this.getProduct(productId);

    // Send notification
    await this.eventBus.publish("inventory.low_stock", {
      productId,
      productName: product.name,
      sku: product.sku,
      availableQuantity,
      threshold: product.lowStockThreshold || 10,
    });

    // Create restock order if below threshold
    if (availableQuantity === 0) {
      await this.createRestockOrder(productId, product.reorderQuantity || 100);
    }
  }

  async createRestockOrder(productId, quantity) {
    // Create restock order
    const order = await this.database.insert("restock_orders", {
      productId,
      quantity,
      status: "pending",
      createdAt: new Date(),
    });

    // Notify purchasing
    await this.eventBus.publish("restock.created", {
      orderId: order.id,
      productId,
      quantity,
    });

    return order;
  }

  async getProduct(productId) {
    const product = await this.database.query(
      "SELECT * FROM products WHERE id = ?",
      [productId],
    );
    return product[0];
  }
}

// Usage
const inventoryManager = new InventoryManager(database, redis, eventBus);

// Reserve stock for order
const orderItems = [
  { productId: 1, quantity: 2 },
  { productId: 2, quantity: 1 },
];
const reservations = await inventoryManager.reserveStock(orderId, orderItems);

// Release stock (order cancelled)
await inventoryManager.releaseStock(orderId, orderItems);

// Restock product
await inventoryManager.restock(1, 100);

// Get available stock
const stock = await inventoryManager.getAvailableStock(1);

// Manual adjustment
await inventoryManager.adjustStock(1, -5, "Damaged goods");
```

### Best Practices:

1. **Use transactions**: Dùng transactions
2. **Implement caching**: Implement caching
3. **Use events**: Dùng events cho notifications
4. **Handle edge cases**: Xử lý edge cases

```javascript
// ✅ Nên: Use transactions cho stock operations
await database.transaction(async (trx) => {
  await trx.query(
    "UPDATE inventory SET reservedQuantity = reservedQuantity + ? WHERE id = ?",
    [quantity, inventoryId],
  );
  await trx.query("INSERT INTO inventory_transactions ...");
});

// ✅ Nên: Cache available stock
const cached = await cache.get(`inventory:${productId}`);
if (cached !== null) {
  return cached;
}

// ✅ Nên: Use events cho notifications
await eventBus.publish("inventory.low_stock", { productId, availableQuantity });

// ✅ Nên: Handle edge cases
if (availableQuantity < 0) {
  availableQuantity = 0;
}

// ❌ Không nên: Update stock without transactions
await database.query(
  "UPDATE inventory SET quantity = quantity + ? WHERE id = ?",
  [quantity, id],
);
// Race conditions possible
```

---

## Order processing?

**Order processing** là quá trình process customer orders từ creation đến fulfillment.

### Mục đích / Purpose

Process customer orders efficiently.

### Khi nào dùng / When to Use

| Tình huống           | Khi nào dùng              |
| -------------------- | ------------------------- |
| - Order creation     | Khi customer places order |
| - Payment processing | Khi process payments      |
| - Inventory update   | Khi update inventory      |
| - Fulfillment        | Khi ship products         |

### Giúp ích gì / Benefits

- **Efficiency**: Efficient order processing
- **Accuracy**: Accurate order processing
- **Tracking**: Order tracking
- **Customer satisfaction**: Better customer experience

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                 | Nhược điểm             |
| ----------------------- | ---------------------- |
| - Efficient             | Complexity             |
| - Accurate              | Integration challenges |
| - Tracking              | System dependencies    |
| - Customer satisfaction | Error handling         |

### Ví dụ:

```javascript
// Order Processing Schema
const orderSchema = {
  orders: {
    id: "SERIAL PRIMARY KEY",
    userId: "INTEGER NOT NULL",
    status: "VARCHAR(20) NOT NULL", // 'pending', 'confirmed', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'
    totalAmount: "DECIMAL(10,2) NOT NULL",
    currency: "VARCHAR(3) NOT NULL",
    shippingAddress: "JSONB NOT NULL",
    billingAddress: "JSONB NOT NULL",
    paymentMethod: "VARCHAR(20)",
    paymentStatus: "VARCHAR(20)", // 'pending', 'paid', 'failed', 'refunded'
    createdAt: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    updatedAt: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    indexes: [
      "CREATE INDEX idx_userId ON orders(userId)",
      "CREATE INDEX idx_status ON orders(status)",
      "CREATE INDEX idx_createdAt ON orders(createdAt DESC)",
    ],
  },

  order_items: {
    id: "SERIAL PRIMARY KEY",
    orderId: "INTEGER NOT NULL",
    productId: "INTEGER NOT NULL",
    quantity: "INTEGER NOT NULL",
    unitPrice: "DECIMAL(10,2) NOT NULL",
    totalPrice: "DECIMAL(10,2) NOT NULL",
    status: "VARCHAR(20)", // 'pending', 'confirmed', 'cancelled'
    createdAt: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    indexes: [
      "CREATE INDEX idx_orderId ON order_items(orderId)",
      "CREATE INDEX idx_productId ON order_items(productId)",
    ],
    uniqueConstraint: "UNIQUE(orderId, productId)",
  },

  order_status_history: {
    id: "SERIAL PRIMARY KEY",
    orderId: "INTEGER NOT NULL",
    status: "VARCHAR(20) NOT NULL",
    notes: "TEXT",
    createdAt: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    indexes: [
      "CREATE INDEX idx_orderId ON order_status_history(orderId)",
      "CREATE INDEX idx_createdAt ON order_status_history(createdAt DESC)",
    ],
  },
};

// Order Processing Service
class OrderProcessor {
  constructor(database, cache, paymentService, inventoryManager, eventBus) {
    this.database = database;
    this.cache = cache;
    this.paymentService = paymentService;
    this.inventoryManager = inventoryManager;
    this.eventBus = eventBus;
  }

  async createOrder(userId, orderData) {
    // Validate order data
    this.validateOrder(orderData);

    // Calculate total
    let totalAmount = 0;
    const items = [];

    for (const item of orderData.items) {
      const product = await this.getProduct(item.productId);
      const unitPrice = product.price;
      const totalPrice = unitPrice * item.quantity;
      totalAmount += totalPrice;

      items.push({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice,
        totalPrice,
      });
    }

    // Calculate shipping
    const shippingCost = await this.calculateShipping(
      orderData.shippingAddress,
      items,
    );

    // Calculate tax
    const tax = await this.calculateTax(totalAmount, orderData.billingAddress);

    const finalAmount = totalAmount + shippingCost + tax;

    // Create order
    const order = await this.database.insert("orders", {
      userId,
      status: "pending",
      totalAmount: finalAmount,
      currency: orderData.currency || "USD",
      shippingAddress: JSON.stringify(orderData.shippingAddress),
      billingAddress: JSON.stringify(orderData.billingAddress),
      paymentMethod: orderData.paymentMethod,
      paymentStatus: "pending",
      createdAt: new Date(),
    });

    // Create order items
    for (const item of items) {
      await this.database.insert("order_items", {
        orderId: order.id,
        ...item,
        status: "pending",
      });
    }

    // Update order status
    await this.updateOrderStatus(order.id, "confirmed", "Order confirmed");

    // Reserve inventory
    await this.inventoryManager.reserveStock(order.id, items);

    // Notify user
    await this.eventBus.publish("order.created", {
      orderId: order.id,
      userId,
      totalAmount: finalAmount,
    });

    return {
      orderId: order.id,
      totalAmount: finalAmount,
      items,
    };
  }

  async processPayment(orderId, paymentData) {
    // Get order
    const order = await this.database.query(
      "SELECT * FROM orders WHERE id = ?",
      [orderId],
    );

    if (order.length === 0) {
      throw new Error("Order not found");
    }

    // Process payment
    const paymentResult = await this.paymentService.processPayment({
      orderId,
      amount: order[0].totalAmount,
      currency: order[0].currency,
      ...paymentData,
    });

    if (paymentResult.success) {
      // Update order payment status
      await this.database.update(
        "orders",
        { paymentStatus: "paid", updatedAt: new Date() },
        { id: orderId },
      );

      // Update order status
      await this.updateOrderStatus(orderId, "processing", "Payment received");

      // Notify
      await this.eventBus.publish("order.paid", {
        orderId,
        userId: order[0].userId,
        amount: order[0].totalAmount,
      });

      return { success: true, paymentId: paymentResult.paymentId };
    } else {
      // Update order payment status
      await this.database.update(
        "orders",
        { paymentStatus: "failed", updatedAt: new Date() },
        { id: orderId },
      );

      // Notify
      await this.eventBus.publish("order.payment_failed", {
        orderId,
        userId: order[0].userId,
        error: paymentResult.error,
      });

      return { success: false, error: paymentResult.error };
    }
  }

  async fulfillOrder(orderId) {
    // Get order
    const order = await this.database.query(
      "SELECT * FROM orders WHERE id = ?",
      [orderId],
    );

    if (order.length === 0) {
      throw new Error("Order not found");
    }

    // Get order items
    const items = await this.database.query(
      "SELECT * FROM order_items WHERE orderId = ?",
      [orderId],
    );

    // Update order status
    await this.updateOrderStatus(orderId, "shipped", "Order shipped");

    // Process each item
    for (const item of items) {
      // Update item status
      await this.database.update(
        "order_items",
        { status: "shipped" },
        { id: item.id },
      );

      // Create shipment
      await this.createShipment(orderId, item);
    }

    // Update order status
    await this.updateOrderStatus(orderId, "delivered", "Order delivered");

    // Notify
    await this.eventBus.publish("order.delivered", {
      orderId,
      userId: order[0].userId,
    });

    return { success: true };
  }

  async cancelOrder(orderId, reason) {
    // Get order
    const order = await this.database.query(
      "SELECT * FROM orders WHERE id = ?",
      [orderId],
    );

    if (order.length === 0) {
      throw new Error("Order not found");
    }

    // Check if order can be cancelled
    if (!["pending", "confirmed"].includes(order[0].status)) {
      throw new Error("Order cannot be cancelled");
    }

    // Get order items
    const items = await this.database.query(
      "SELECT * FROM order_items WHERE orderId = ?",
      [orderId],
    );

    // Release inventory
    await this.inventoryManager.releaseStock(orderId, items);

    // Update order status
    await this.updateOrderStatus(
      orderId,
      "cancelled",
      `Order cancelled: ${reason}`,
    );

    // Refund payment if paid
    if (order[0].paymentStatus === "paid") {
      await this.refundPayment(orderId, order[0].totalAmount);
    }

    // Notify
    await this.eventBus.publish("order.cancelled", {
      orderId,
      userId: order[0].userId,
      reason,
    });

    return { success: true };
  }

  async updateOrderStatus(orderId, status, notes = null) {
    // Update order status
    await this.database.update(
      "orders",
      { status, updatedAt: new Date() },
      { id: orderId },
    );

    // Log status change
    await this.database.insert("order_status_history", {
      orderId,
      status,
      notes,
    });

    // Invalidate cache
    await this.cache.del(`order:${orderId}`);

    // Notify
    await this.eventBus.publish("order.status_changed", {
      orderId,
      status,
    });
  }

  async getOrder(orderId) {
    // Check cache
    const cached = await this.cache.get(`order:${orderId}`);
    if (cached) {
      return cached;
    }

    // Get from database
    const order = await this.database.query(
      `SELECT o.*, u.email as userEmail, u.name as userName
       FROM orders o
       JOIN users u ON o.userId = u.id
       WHERE o.id = ?`,
      [orderId],
    );

    if (order.length === 0) {
      throw new Error("Order not found");
    }

    // Get order items
    const items = await this.database.query(
      `SELECT oi.*, p.name as productName, p.sku as productSku
       FROM order_items oi
       JOIN products p ON oi.productId = p.id
       WHERE oi.orderId = ?`,
      [orderId],
    );

    order[0].items = items;

    // Cache for 5 minutes
    await this.cache.set(`order:${orderId}`, order[0], { ttl: 300 });

    return order[0];
  }

  async calculateShipping(address, items) {
    // Calculate shipping cost
    // This is a simplified example
    const baseRate = 5; // $5 per order
    const weightRate = 0.5; // $0.5 per kg

    // Calculate total weight
    let totalWeight = 0;
    for (const item of items) {
      const product = await this.getProduct(item.productId);
      totalWeight += product.weight * item.quantity;
    }

    const shippingCost = baseRate + weightRate * totalWeight;

    return shippingCost;
  }

  async calculateTax(amount, address) {
    // Calculate tax based on address
    // This is a simplified example
    const taxRate = 0.1; // 10%
    return amount * taxRate;
  }

  async refundPayment(orderId, amount) {
    // Process refund
    const refundResult = await this.paymentService.refundPayment(
      orderId,
      amount,
    );

    if (refundResult.success) {
      // Update order payment status
      await this.database.update(
        "orders",
        { paymentStatus: "refunded", updatedAt: new Date() },
        { id: orderId },
      );

      // Notify
      await this.eventBus.publish("order.refunded", {
        orderId,
        amount,
      });
    }

    return refundResult;
  }

  async getProduct(productId) {
    const product = await this.database.query(
      "SELECT * FROM products WHERE id = ?",
      [productId],
    );
    return product[0];
  }

  validateOrder(orderData) {
    if (!orderData.items || orderData.items.length === 0) {
      throw new Error("Order must have at least one item");
    }

    if (!orderData.shippingAddress) {
      throw new Error("Shipping address is required");
    }

    if (!orderData.billingAddress) {
      throw new Error("Billing address is required");
    }
  }
}

// Usage
const orderProcessor = new OrderProcessor(
  database,
  redis,
  paymentService,
  inventoryManager,
  eventBus,
);

// Create order
const order = await orderProcessor.createOrder(userId, {
  items: [
    { productId: 1, quantity: 2 },
    { productId: 2, quantity: 1 },
  ],
  shippingAddress: { street: "123 Main St", city: "New York", zip: "10001" },
  billingAddress: { street: "123 Main St", city: "New York", zip: "10001" },
  paymentMethod: "credit_card",
});

// Process payment
const paymentResult = await orderProcessor.processPayment(order.orderId, {
  cardNumber: "4242424242424",
  cardExpiry: "12/25",
  cvv: "123",
});

// Fulfill order
await orderProcessor.fulfillOrder(order.orderId);

// Cancel order
await orderProcessor.cancelOrder(order.orderId, "Customer requested");
```

### Best Practices:

1. **Use transactions**: Dùng transactions
2. **Event-driven**: Event-driven architecture
3. **Idempotent operations**: Idempotent operations
4. **Compensating transactions**: Compensating transactions

```javascript
// ✅ Nên: Use transactions cho order creation
await database.transaction(async (trx) => {
  const order = await trx.query("INSERT INTO orders ...");
  for (const item of items) {
    await trx.query("INSERT INTO order_items ...");
  }
});

// ✅ Nên: Use events cho notifications
await eventBus.publish("order.created", { orderId, userId });

// ✅ Nên: Make operations idempotent
const idempotencyKey = `order:${orderId}:${userId}`;
if (await cache.get(idempotencyKey)) {
  return { orderId: await cache.get(idempotencyKey) };
}

// ✅ Nên: Implement compensating transactions
async function processOrder(orderId) {
  try {
    await step1();
    await step2();
    await step3();
  } catch (error) {
    await compensate(orderId);
    throw error;
  }
}

// ❌ Không nên: Process payment without idempotency
// Duplicate charges possible
```

---

## References

- [E-commerce Architecture](https://www.youtube.com/watch?v=Qwz8qF7JkE)
- [Microservices for E-commerce](https://microservices.io/patterns/microservices-pattern/e-commerce)
- [Payment Gateway Integration](https://stripe.com/docs)
