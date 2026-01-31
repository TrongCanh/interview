# 16. Memoization

## Tổng quan về Memoization

### Mục đích của Memoization / Purpose

**Memoization** là technique cache kết quả của expensive function calls để tránh tính toán lại.

**Mục đích chính:**

- Performance optimization
- Cache results
- Avoid redundant computations
- Functional programming

### Khi nào cần hiểu về Memoization / When to Use

Hiểu về Memoization là cần thiết khi:

- Performance optimization
- Expensive function calls
- Functional programming
- Caching strategies

### Giúp ích gì / Benefits

**Lợi ích:**

- **Performance**: Tối ưu performance
- **Cache**: Cache results
- **Avoid recomputation**: Tránh tính toán lại
- **Functional**: Functional programming

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm             |
| ------------------- | ---------------------- | ----------------------------- |
| Performance         | Tối ưu performance     | Memory overhead               |
| Cache               | Cache results          | Có thể gây bugs               |
| Avoid recomputation | Tránh tính toán lại    | Learning curve                |
| Functional          | Functional programming | Verbose hơn regular functions |

---

## Memoization là gì?

**Memoization** là technique cache kết quả của expensive function calls để tránh tính toán lại.

### Mục đích / Purpose

**Memoization** được thiết kế để:

- Performance optimization
- Cache results
- Avoid redundant computations
- Functional programming

### Khi nào dùng / When to Use

Memoization nên dùng khi:

- Performance optimization
- Expensive function calls
- Functional programming
- Caching strategies

### Giúp ích gì / Benefits

**Lợi ích:**

- **Performance**: Tối ưu performance
- **Cache**: Cache results
- **Avoid recomputation**: Tránh tính toán lại
- **Functional**: Functional programming

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm             |
| ------------------- | ---------------------- | ----------------------------- |
| Performance         | Tối ưu performance     | Memory overhead               |
| Cache               | Cache results          | Có thể gây bugs               |
| Avoid recomputation | Tránh tính toán lại    | Learning curve                |
| Functional          | Functional programming | Verbose hơn regular functions |

### Memoization cơ bản:

```javascript
// Memoization - cache kết quả
function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache[key]) {
      console.log("Cache hit");
      return cache[key];
    }

    console.log("Cache miss");
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// Expensive function
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Memoized version
const memoizedFibonacci = memoize(fibonacci);

console.log(memoizedFibonacci(10)); // 55
console.log(memoizedFibonacci(10)); // 55 (from cache)
```

### Memoization với closure:

```javascript
// Memoization với closure
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log("Cache hit");
      return cache.get(key);
    }

    console.log("Cache miss");
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Sử dụng
const memoizedFn = memoize(expensiveFunction);
```

### Best Practices:

```javascript
// ✅ Dùng memoization cho:
// - Expensive function calls
// - Pure functions
// - Performance optimization
const memoized = memoize(expensiveFunction);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng memoization cho side effects
const memoized = memoize(functionWithSideEffects);

// ✅ Nên dùng memoization cho pure functions
const memoized = memoize(pureFunction);
```

---

## Implement `memoize` function?

### Mục đích / Purpose

Implement [`memoize()`](interview-practice/topics/javascript/answers/16-memoization.md:1) function giúp:

- Tự động memoization
- Performance optimization
- Functional programming
- Code reuse

### Khi nào cần implement / When to Use

Cần implement [`memoize()`](interview-practice/topics/javascript/answers/16-memoization.md:1) khi:

- Performance optimization
- Functional programming
- Code reuse
- Learning purposes

### Giúp ích gì / Benefits

**Lợi ích:**

- **Automatic**: Tự động memoization
- **Performance**: Tối ưu performance
- **Code reuse**: Reuse logic
- **Functional**: Functional programming

### Ưu nhược điểm / Pros & Cons

| Ưu điểm     | Nhược điểm             |
| ----------- | ---------------------- | -------------------------- |
| Automatic   | Tự động memoization    | Verbose hơn manual caching |
| Performance | Tối ưu performance     | Có thể gây bugs            |
| Code reuse  | Reuse logic            | Learning curve             |
| Functional  | Functional programming | Verbose hơn                |

### Implement `memoize` function:

```javascript
// Implement memoize function
function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache[key]) {
      return cache[key];
    }

    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// Sử dụng
const memoizedFibonacci = memoize(fibonacci);
console.log(memoizedFibonacci(10)); // 55
```

### Implement `memoize` với Map:

```javascript
// Implement memoize với Map
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

### Implement `memoize` với limit:

```javascript
// Implement memoize với cache limit
function memoize(fn, limit = 100) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);

    // Cache limit
    if (cache.size >= limit) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    cache.set(key, result);
    return result;
  };
}
```

### Best Practices:

```javascript
// ✅ Implement memoize cho:
// - Performance optimization
// - Functional programming
// - Code reuse
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên implement memoize với bugs
function badMemoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    // Không kiểm tra cache!
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// ✅ Nên implement memoize đúng
function goodMemoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}
```

---

## Cache invalidation?

**Cache invalidation** - Xóa hoặc cập nhật cache khi data thay đổi.

### Mục đích / Purpose

**Cache invalidation** được thiết kế để:

- Xóa cache khi data thay đổi
- Cập nhật cache
- Performance optimization
- Data consistency

### Khi nào dùng / When to Use

Cache invalidation nên dùng khi:

- Data thay đổi
- Cập nhật cache
- Performance optimization
- Data consistency

### Giúp ích gì / Benefits

**Lợi ích:**

- **Consistency**: Data consistency
- **Update**: Cập nhật cache
- **Performance**: Tối ưu performance
- **Clean**: Xóa cache cũ

### Ưu nhược điểm / Pros & Cons

| Ưu điểm     | Nhược điểm         |
| ----------- | ------------------ | --------------- |
| Consistency | Data consistency   | Verbose hơn     |
| Update      | Cập nhật cache     | Có thể gây bugs |
| Performance | Tối ưu performance | Learning curve  |
| Clean       | Xóa cache cũ       | Có thể gây bugs |

### Cache invalidation với TTL:

```javascript
// Cache invalidation với TTL (Time To Live)
function memoize(fn, ttl = 5000) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache[key]) {
      const { result, timestamp } = cache[key];

      // Check TTL
      if (Date.now() - timestamp < ttl) {
        return result;
      }
    }

    const result = fn.apply(this, args);
    cache[key] = { result, timestamp: Date.now() };
    return result;
  };
}
```

### Cache invalidation với size limit:

```javascript
// Cache invalidation với size limit
function memoize(fn, limit = 100) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);

    // Cache limit - xóa oldest
    if (cache.size >= limit) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    cache.set(key, result);
    return result;
  };
}
```

### Manual cache invalidation:

```javascript
// Manual cache invalidation
function createMemoized(fn) {
  const cache = {};

  const memoized = function (...args) {
    const key = JSON.stringify(args);

    if (cache[key]) {
      return cache[key];
    }

    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };

  // Method để xóa cache
  memoized.clearCache = () => {
    Object.keys(cache).forEach((key) => delete cache[key]);
  };

  return memoized;
}

// Sử dụng
const memoizedFn = createMemoized(expensiveFunction);
memoizedFn(1, 2);
memoizedFn(1, 2); // From cache

// Xóa cache
memoizedFn.clearCache();
memoizedFn(1, 2); // Recomputed
```

### Best Practices:

```javascript
// ✅ Dùng cache invalidation cho:
// - Data thay đổi
// - Cập nhật cache
// - Performance optimization
function memoize(fn, ttl = 5000) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key] && Date.now() - cache[key].timestamp < ttl) {
      return cache[key].result;
    }
    const result = fn.apply(this, args);
    cache[key] = { result, timestamp: Date.now() };
    return result;
  };
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng cache không invalidation
const cache = {};
function memoize(fn) {
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// ✅ Nên dùng cache với invalidation
function memoizeWithTTL(fn, ttl = 5000) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key] && Date.now() - cache[key].timestamp < ttl) {
      return cache[key].result;
    }
    const result = fn.apply(this, args);
    cache[key] = { result, timestamp: Date.now() };
    return result;
  };
}
```

---

## Memoization vs Caching?

### Mục đích / Purpose

Hiểu sự khác biệt giữa **Memoization** và **Caching** giúp:

- Chọn đúng technique
- Hiểu JavaScript
- Performance optimization
- Data consistency

### Khi nào dùng / When to Use

| Technique     | Khi nào dùng           |
| ------------- | ---------------------- | ------------------------ |
| `Memoization` | Cache function results | Expensive function calls |
| `Caching`     | Cache data             | Data fetching, API calls |

### Giúp ích gì / Benefits

Hiểu sự khác biệt giúp:

- **Choose right**: Chọn đúng technique
- **Understand**: Hiểu JavaScript
- **Performance**: Tối ưu performance
- **Consistency**: Data consistency

### Ưu nhược điểm / Pros & Cons

| Technique     | Ưu điểm                | Nhược điểm      |
| ------------- | ---------------------- | --------------- |
| `Memoization` | Cache function results | Memory overhead |
| `Caching`     | Cache data             | Có thể gây bugs |

### Memoization - Cache function results:

```javascript
// Memoization - cache function results
function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache[key]) {
      return cache[key];
    }

    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// Expensive function
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = memoize(fibonacci);
console.log(memoizedFibonacci(10)); // 55
```

### Caching - Cache data:

```javascript
// Caching - cache data
class DataCache {
  constructor() {
    this.cache = new Map();
  }

  async get(url) {
    // Check cache
    if (this.cache.has(url)) {
      console.log("Cache hit");
      return this.cache.get(url);
    }

    // Fetch data
    console.log("Cache miss");
    const response = await fetch(url);
    const data = await response.json();

    // Cache data
    this.cache.set(url, data);
    return data;
  }

  clear() {
    this.cache.clear();
  }
}

// Sử dụng
const cache = new DataCache();
const data1 = await cache.get("/api/data");
const data2 = await cache.get("/api/data"); // From cache
```

### So sánh:

```javascript
// Memoization - cache function results
const memoizedFibonacci = memoize(fibonacci);
console.log(memoizedFibonacci(10)); // 55

// Caching - cache data
const cache = new DataCache();
const data = await cache.get("/api/data");
```

### Best Practices:

```javascript
// ✅ Dùng memoization cho:
// - Expensive function calls
// - Pure functions
const memoized = memoize(expensiveFunction);

// ✅ Dùng caching cho:
// - Data fetching
// - API calls
const data = await cache.get("/api/data");
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng memoization cho side effects
const memoized = memoize(functionWithSideEffects);

// ✅ Nên dùng memoization cho pure functions
const memoized = memoize(pureFunction);

// ❌ Không nên dùng caching cho volatile data
const cache = new DataCache();
const data = await cache.get("/api/volatile-data");

// ✅ Nên dùng caching với TTL cho volatile data
const cache = new DataCache({ ttl: 5000 });
const data = await cache.get("/api/volatile-data");
```

---

## Recursive memoization?

**Recursive memoization** - Memoization cho recursive functions.

### Mục đích / Purpose

**Recursive memoization** được thiết kế để:

- Tối ưu recursive functions
- Avoid redundant computations
- Performance optimization
- Functional programming

### Khi nào dùng / When to Use

Recursive memoization nên dùng khi:

- Recursive functions
- Performance optimization
- Avoid redundant computations
- Functional programming

### Giúp ích gì / Benefits

**Lợi ích:**

- **Performance**: Tối ưu performance
- **Avoid recomputation**: Tránh tính toán lại
- **Recursive**: Recursive functions
- **Functional**: Functional programming

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm             |
| ------------------- | ---------------------- | --------------- |
| Performance         | Tối ưu performance     | Memory overhead |
| Avoid recomputation | Tránh tính toán lại    | Learning curve  |
| Recursive           | Recursive functions    | Có thể gây bugs |
| Functional          | Functional programming | Verbose hơn     |

### Recursive memoization:

```javascript
// Recursive memoization
function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache[key]) {
      return cache[key];
    }

    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// Recursive function
const fibonacci = memoize(function (n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(10)); // 55
console.log(fibonacci(50)); // 12586269025 (không có memoization sẽ rất chậm)
```

### Recursive memoization với closure:

```javascript
// Recursive memoization với closure
function createMemoizedFibonacci() {
  const cache = {};

  function fibonacci(n) {
    if (n <= 1) return n;

    const key = n.toString();

    if (cache[key]) {
      return cache[key];
    }

    const result = fibonacci(n - 1) + fibonacci(n - 2);
    cache[key] = result;
    return result;
  }

  return fibonacci;
}

const fibonacci = createMemoizedFibonacci();
console.log(fibonacci(10)); // 55
```

### Best Practices:

```javascript
// ✅ Dùng recursive memoization cho:
// - Recursive functions
// - Performance optimization
// - Avoid redundant computations
const fibonacci = memoize(function (n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng recursive function mà không memoize
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(50)); // Rất chậm!

// ✅ Nên dùng recursive memoization
const fibonacci = memoize(function (n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});
console.log(fibonacci(50)); // Nhanh hơn nhiều
```

---

## Memoization với multiple arguments?

**Memoization với multiple arguments** - Cache kết quả dựa trên tất cả arguments.

### Mục đích / Purpose

**Memoization với multiple arguments** được thiết kế để:

- Cache kết quả với nhiều arguments
- Performance optimization
- Functional programming
- Code reuse

### Khi nào dùng / When to Use

Memoization với multiple arguments nên dùng khi:

- Function nhận nhiều arguments
- Performance optimization
- Functional programming
- Code reuse

### Giúp ích gì / Benefits

**Lợi ích:**

- **Multiple args**: Cache với nhiều arguments
- **Performance**: Tối ưu performance
- **Functional**: Functional programming
- **Code reuse**: Code reuse

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm                |
| ------------- | ------------------------- | -------------------- |
| Multiple args | Cache với nhiều arguments | Verbose hơn          |
| Performance   | Tối ưu performance        | Có thể gây bugs      |
| Functional    | Functional programming    | Learning curve       |
| Code reuse    | Code reuse                | Có thể gây confusion |

### Memoization với multiple arguments:

```javascript
// Memoization với multiple arguments
function memoize(fn) {
  const cache = {};

  return function (...args) {
    // Cache key dựa trên tất cả arguments
    const key = JSON.stringify(args);

    if (cache[key]) {
      return cache[key];
    }

    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// Function với nhiều arguments
function multiply(a, b, c) {
  console.log("Computing...");
  return a * b * c;
}

const memoizedMultiply = memoize(multiply);

console.log(memoizedMultiply(2, 3, 4)); // Computing... 24
console.log(memoizedMultiply(2, 3, 4)); // 24 (from cache)
```

### Memoization với custom key:

```javascript
// Memoization với custom key
function memoize(fn, keyFn = JSON.stringify) {
  const cache = {};

  return function (...args) {
    // Custom key function
    const key = keyFn(args);

    if (cache[key]) {
      return cache[key];
    }

    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// Custom key function - chỉ dùng first argument
const memoizedById = memoize(fetchUser, (args) => args[0]);

console.log(memoizedById(1)); // Fetch user 1
console.log(memoizedById(1)); // From cache
console.log(memoizedById(2)); // Fetch user 2
```

### Best Practices:

```javascript
// ✅ Dùng memoization với multiple arguments cho:
// - Function nhận nhiều arguments
// - Performance optimization
// - Functional programming
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng memoization với key không chính xác
function badMemoize(fn) {
  const cache = {};
  return function (...args) {
    const key = args[0]; // Chỉ dùng first argument!
    if (cache[key]) return cache[key];
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// ✅ Nên dùng memoization với key chính xác
function goodMemoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}
```
