# 35. Implement `memoize` / Triển Khai Memoize

## Tổng quan về Memoize

### Mục đích của Memoize / Purpose

**Memoize** là kỹ thuật cache kết quả của expensive function calls để tránh tính toán lại với cùng arguments.

**Mục đích chính:**

- Cache function results
- Avoid expensive recalculations
- Improve performance
- Reduce CPU usage

### Khi nào nên dùng / When to Use

- Khi có expensive functions
- Khi function được gọi nhiều lần với cùng arguments
- Khi muốn optimize performance
- Khi có pure functions

### Giúp ích gì / Benefits

**Lợi ích:**

- **Performance**: Faster execution với cached results
- **Efficient**: Avoid expensive recalculations
- **Simple**: Dễ implement
- **Effective**: Hiệu quả cho expensive operations

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm     | Giải thích                        |
| ----------- | --------------------------------- |
| Performance | Faster execution                  |
| Efficient   | Avoid recalculations              |
| Simple      | Dễ implement                      |
| Effective   | Hiệu quả cho expensive operations |

**Nhược điểm (Cons):**

| Nhược điểm | Giải thích                      |
| ---------- | ------------------------------- |
| Memory     | Sử dụng nhiều memory để cache   |
| Stale data | Cached data có thể outdated     |
| Complexity | Code phức tạp hơn               |
| Limited    | Chỉ hiệu quả cho pure functions |

---

## Implement `memoize`?

**Implement `memoize`** là viết function để cache kết quả của expensive functions.

### Mục đích / Purpose

- Tạo memoize function
- Cache function results
- Improve performance

### Khi nào dùng / When to Use

- Khi cần memoize expensive functions
- Khi muốn optimize performance
- Khi có pure functions

### Ví dụ:

```javascript
// Method 1: Basic memoize implementation
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

// Usage
const expensiveFunction = (n) => {
  console.log("Calculating...");
  return n * n;
};

const memoizedFunction = memoize(expensiveFunction);

console.log(memoizedFunction(5)); // Calculating... 25
console.log(memoizedFunction(5)); // 25 (cached)
console.log(memoizedFunction(10)); // Calculating... 100

// Method 2: Memoize với custom key generator
function memoize(fn, keyGenerator = (...args) => JSON.stringify(args)) {
  const cache = new Map();

  return function (...args) {
    const key = keyGenerator(...args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage
const memoizedFunction = memoize(
  (n) => n * n,
  (n) => `square_${n}`, // Custom key generator
);

// Method 3: Memoize với cache size limit
function memoize(fn, maxSize = 100) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    // Remove oldest entry nếu cache quá lớn
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Method 4: Memoize cho async functions
function memoizeAsync(fn) {
  const cache = new Map();

  return async function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = await fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage
const expensiveAsyncFunction = async (n) => {
  console.log("Calculating...");
  await new Promise((resolve) => setTimeout(resolve, 100));
  return n * n;
};

const memoizedAsyncFunction = memoizeAsync(expensiveAsyncFunction);

memoizedAsyncFunction(5).then(console.log); // Calculating... 25
memoizedAsyncFunction(5).then(console.log); // 25 (cached)
```

### Best Practices:

```javascript
// ✅ Dùng memoize cho expensive functions
const memoizedFibonacci = memoize(fibonacci);

// ✅ Dùng memoize cho pure functions
const memoizedCalculate = memoize(calculate);

// ✅ Dùng custom key generator cho complex arguments
const memoizedFunction = memoize(fn, (...args) => JSON.stringify(args));

// ✅ Set cache size limit để tránh memory issues
const memoizedFunction = memoize(fn, 100);

// ✅ Dùng memoizeAsync cho async functions
const memoizedFetch = memoizeAsync(fetchData);

// ❌ Tránh memoize cho impure functions
// Memoize chỉ hiệu quả cho pure functions

// ❌ Tránh memoize cho functions với side effects
// Side effects sẽ không được execute khi cache hit
```

---

## Test Cases

```javascript
// Test 1: Basic memoization
let callCount = 0;
const expensiveFunction = (n) => {
  callCount++;
  return n * n;
};

const memoizedFunction = memoize(expensiveFunction);

console.log(memoizedFunction(5)); // Calculating... 25
console.log(callCount); // 1
console.log(memoizedFunction(5)); // 25 (cached)
console.log(callCount); // 1 (không tăng)

// Test 2: Memoize với different arguments
const memoizedFunction = memoize((n) => n * n);

console.log(memoizedFunction(5)); // 25
console.log(memoizedFunction(10)); // 100
console.log(memoizedFunction(5)); // 25 (cached)

// Test 3: Memoize với object arguments
const memoizedFunction = memoize(({ x, y }) => x * y);

console.log(memoizedFunction({ x: 5, y: 10 })); // 50
console.log(memoizedFunction({ x: 5, y: 10 })); // 50 (cached)

// Test 4: Memoize với cache size limit
const memoizedFunction = memoize((n) => n * n, 2);

console.log(memoizedFunction(1)); // 1
console.log(memoizedFunction(2)); // 4
console.log(memoizedFunction(3)); // 9 (oldest entry removed)

// Test 5: Memoize async function
const memoizedAsyncFunction = memoizeAsync(async (n) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return n * n;
});

memoizedAsyncFunction(5).then(console.log); // 25
memoizedAsyncFunction(5).then(console.log); // 25 (cached)
```

---

## Complete Implementation

```javascript
/**
 * Memoize function
 * @param {Function} fn - Function to memoize
 * @param {Function} [keyGenerator] - Custom key generator
 * @param {number} [maxSize] - Maximum cache size
 * @returns {Function} Memoized function
 */
function memoize(fn, keyGenerator, maxSize = Infinity) {
  const cache = new Map();

  // Default key generator
  if (!keyGenerator) {
    keyGenerator = (...args) => JSON.stringify(args);
  }

  const memoized = function (...args) {
    const key = keyGenerator(...args);

    // Return cached result if exists
    if (cache.has(key)) {
      return cache.get(key);
    }

    // Remove oldest entry nếu cache quá lớn
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    // Execute function và cache result
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };

  // Add clear method
  memoized.clear = function () {
    cache.clear();
  };

  // Add size method
  memoized.size = function () {
    return cache.size;
  };

  return memoized;
}

/**
 * Memoize async function
 * @param {Function} fn - Async function to memoize
 * @param {Function} [keyGenerator] - Custom key generator
 * @param {number} [maxSize] - Maximum cache size
 * @returns {Function} Memoized async function
 */
function memoizeAsync(fn, keyGenerator, maxSize = Infinity) {
  const cache = new Map();

  if (!keyGenerator) {
    keyGenerator = (...args) => JSON.stringify(args);
  }

  const memoized = async function (...args) {
    const key = keyGenerator(...args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    const result = await fn.apply(this, args);
    cache.set(key, result);
    return result;
  };

  memoized.clear = function () {
    cache.clear();
  };

  memoized.size = function () {
    return cache.size;
  };

  return memoized;
}

// Usage examples

// Example 1: Fibonacci with memoization
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(10)); // 55 (fast với memoization)

// Example 2: Expensive calculation
const expensiveCalculation = memoize((n) => {
  let result = 0;
  for (let i = 0; i < n; i++) {
    result += Math.sqrt(i);
  }
  return result;
});

console.log(expensiveCalculation(100000)); // First call - slow
console.log(expensiveCalculation(100000)); // Cached - fast

// Example 3: API call memoization
const fetchUser = memoizeAsync(async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

// Multiple calls với same userId
const user1 = await fetchUser(1); // First call - makes API request
const user2 = await fetchUser(1); // Cached - no API request

// Example 4: Clear cache
const memoizedFunction = memoize(expensiveFunction);
memoizedFunction(5);
memoizedFunction.clear(); // Clear cache
memoizedFunction(5); // Recalculate
```

---

## Use Cases

```javascript
// 1. Fibonacci sequence
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

// 2. Expensive calculations
const calculatePi = memoize((iterations) => {
  let pi = 0;
  for (let i = 0; i < iterations; i++) {
    pi += (4 * Math.pow(-1, i)) / (2 * i + 1);
  }
  return pi;
});

// 3. API response caching
const fetchUser = memoizeAsync(async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

// 4. DOM operations
const getElement = memoize((selector) => {
  return document.querySelector(selector);
});

// 5. Data transformation
const transformData = memoize((data) => {
  return data.map((item) => ({
    ...item,
    calculated: item.value * item.multiplier,
  }));
});
```

---

## Anti-patterns cần tránh

```javascript
// ❌ Memoize impure functions
const memoizedRandom = memoize(() => Math.random());
console.log(memoizedRandom()); // 0.5
console.log(memoizedRandom()); // 0.5 (wrong - random should change)

// ✅ Chỉ memoize pure functions
const pureFunction = (n) => n * n;
const memoizedPure = memoize(pureFunction);

// ❌ Memoize functions với side effects
let sideEffectCount = 0;
const memoizedFunction = memoize((n) => {
  sideEffectCount++;
  return n * n;
});

memoizedFunction(5); // sideEffectCount = 1
memoizedFunction(5); // sideEffectCount = 1 (side effect không execute)

// ✅ Dùng memoize cho functions không có side effects

// ❌ Quên clear cache khi data thay đổi
const memoizedFetch = memoize(fetchUser);
const user1 = await memoizedFetch(1);
// User data changes on server...
const user2 = await memoizedFetch(1); // Still returns old cached data

// ✅ Clear cache khi data thay đổi
memoizedFetch.clear();
const user3 = await memoizedFetch(1); // Fetches fresh data

// ❌ Không set cache size limit cho infinite cache
const memoizedFunction = memoize(fn); // Cache có thể quá lớn

// ✅ Set cache size limit
const memoizedFunction = memoize(fn, 100);
```

---

_References: [Memoization Pattern](https://www.patternsjs.dev/patterns/memoization-pattern), [Lodash memoize](https://lodash.com/docs/4.17.15#memoize)_
