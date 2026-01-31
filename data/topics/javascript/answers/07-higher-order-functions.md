# 7. Higher-Order Functions

## Tổng quan về Higher-Order Functions

### Mục đích của Higher-Order Functions / Purpose

**Higher-order function** là function có thể nhận function làm parameter hoặc trả về function.

**Mục đích chính:**

- Function composition
- Abstraction
- Code reuse
- Functional programming patterns

### Khi nào cần hiểu về Higher-Order Functions / When to Use

Hiểu về higher-order functions là cần thiết khi:

- Làm việc với array methods
- Implement functional patterns
- Function composition
- Callbacks và async operations

### Giúp ích gì / Benefits

**Lợi ích:**

- **Abstraction**: Trừu tượng hóa logic
- **Reusability**: Reuse logic
- **Composition**: Kết hợp functions
- **Functional programming**: Hỗ trợ FP patterns

### Ưu nhược điểm / Pros & Cons

| Ưu điểm          | Nhược điểm              |
| ---------------- | ----------------------- |
| Code reuse       | Có thể khó debug        |
| Abstraction      | Verbose hơn             |
| Composition      | Learning curve          |
| Functional style | Không phù hợp mọi cases |

---

## Higher-order function là gì?

**Higher-order function** là function có thể nhận function làm parameter hoặc trả về function.

### Mục đích / Purpose

**Higher-order function** được thiết kế để:

- Nhận function làm parameter
- Trả về function
- Function composition
- Abstraction

### Khi nào dùng / When to Use

Higher-order functions nên dùng khi:

- Cần function composition
- Implement callbacks
- Create function factories
- Functional programming

### Giúp ích gì / Benefits

**Lợi ích:**

- **Abstraction**: Trừu tượng hóa logic
- **Reusability**: Reuse logic
- **Composition**: Kết hợp functions
- **Flexibility**: Flexible programming

### Ưu nhược điểm / Pros & Cons

| Ưu điểm     | Nhược điểm       |
| ----------- | ---------------- |
| Abstraction | Có thể khó debug |
| Code reuse  | Verbose hơn      |
| Composition | Learning curve   |

### Ví dụ cơ bản:

```javascript
// Higher-order function - nhận function làm parameter
function withLogging(fn) {
  return function (...args) {
    console.log("Calling function with args:", args);
    const result = fn(...args);
    console.log("Result:", result);
    return result;
  };
}

// Sử dụng
function add(a, b) {
  return a + b;
}

const loggedAdd = withLogging(add);
loggedAdd(5, 3);
// 'Calling function with args: [5, 3]'
// 'Result: 8'

// Higher-order function - trả về function
function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### Best Practices:

```javascript
// ✅ Dùng higher-order functions cho:
// - Function composition
// - Callbacks
// - Function factories
const withLogging =
  (fn) =>
  (...args) => {
    console.log("Calling:", args);
    return fn(...args);
  };
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên lồng quá nhiều higher-order functions
const result = withLogging(withRetry(withCache(fn)));

// ✅ Nên tách thành các steps rõ ràng
const cached = withCache(fn);
const retried = withRetry(cached);
const logged = withLogging(retried);
```

---

## Ví dụ về `map`, `filter`, `reduce`

### Mục đích / Purpose

**Array methods** được thiết kế để:

- Transform data (`map`)
- Filter data (`filter`)
- Accumulate values (`reduce`)

### Khi nào dùng / When to Use

| Method     | Khi nào dùng                        |
| ---------- | ----------------------------------- |
| `map()`    | Transform mỗi element               |
| `filter()` | Lọc elements theo điều kiện         |
| `reduce()` | Accumulate values thành một giá trị |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Functional**: Declarative style
- **Immutable**: Không thay đổi original array
- **Chainable**: Có thể chain methods
- **Readable**: Code dễ đọc hơn loops

### Ưu nhược điểm / Pros & Cons

| Method     | Ưu điểm        | Nhược điểm             |
| ---------- | -------------- | ---------------------- |
| `map()`    | Transform data | Tạo array mới (memory) |
| `filter()` | Filter data    | Tạo array mới (memory) |
| `reduce()` | Flexible       | Có thể khó hiểu        |

### `map()` - Transform mỗi element:

```javascript
// Syntax: array.map(callback(element, index, array))

// Basic usage
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Transform objects
const users = [
  { name: "John", age: 25 },
  { name: "Jane", age: 30 },
];

const names = users.map((user) => user.name);
console.log(names); // ['John', 'Jane']

// With index
const indexed = numbers.map((num, index) => ({
  index,
  value: num,
}));
console.log(indexed);
// [{index: 0, value: 1}, {index: 1, value: 2}, ...]
```

### `filter()` - Lọc elements:

```javascript
// Syntax: array.filter(callback(element, index, array))

// Basic usage
const numbers = [1, 2, 3, 4, 5, 6];
const even = numbers.filter((num) => num % 2 === 0);
console.log(even); // [2, 4, 6]

// Filter objects
const users = [
  { name: "John", age: 25, active: true },
  { name: "Jane", age: 17, active: true },
  { name: "Bob", age: 30, active: false },
];

const adults = users.filter((user) => user.age >= 18);
console.log(adults); // [{name: 'John', age: 25, active: true}, ...]
```

### `reduce()` - Accumulate values:

```javascript
// Syntax: array.reduce(callback(accumulator, element, index, array), initialValue)

// Sum numbers
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

// Group by property
const users = [
  { name: "John", role: "admin" },
  { name: "Jane", role: "user" },
  { name: "Bob", role: "admin" },
];

const grouped = users.reduce((acc, user) => {
  const role = user.role;
  if (!acc[role]) {
    acc[role] = [];
  }
  acc[role].push(user);
  return acc;
}, {});
```

### Best Practices:

```javascript
// ✅ Dùng map cho transform
const doubled = numbers.map((n) => n * 2);

// ✅ Dùng filter cho filter
const evens = numbers.filter((n) => n % 2 === 0);

// ✅ Dùng reduce cho accumulation
const sum = numbers.reduce((a, b) => a + b, 0);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng map khi không cần return value
numbers.map((n) => {
  console.log(n); // Không return
});

// ✅ Nên dùng forEach
numbers.forEach((n) => console.log(n));
```

---

## Implement `map` từ scratch?

### Mục đích / Purpose

Implement [`map()`](interview-practice/topics/javascript/answers/07-higher-order-functions.md:1) giúp:

- Hiểu cách array methods hoạt động
- Implement custom array methods
- Deep understanding of JavaScript

### Khi nào cần implement / When to Use

Cần implement khi:

- Learning purposes
- Custom behavior
- Polyfill cho old browsers

### Giúp ích gì / Benefits

**Lợi ích:**

- **Understanding**: Deep understanding
- **Custom behavior**: Custom logic
- **Polyfill**: Support old browsers

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm     |
| ------------------ | -------------- |
| Deep understanding | Verbose hơn    |
| Custom behavior    | Có thể có bugs |

### Implement:

```javascript
// Implement map từ scratch
Array.prototype.myMap = function (callback, thisArg) {
  // Kiểm tra callback là function
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  // Tạo mảng mới với cùng độ dài
  const result = new Array(this.length);

  // Lặp qua từng element
  for (let i = 0; i < this.length; i++) {
    // Bỏ qua empty slots
    if (i in this) {
      // Gọi callback với thisArg nếu có
      result[i] = callback.call(thisArg, this[i], i, this);
    }
  }

  return result;
};

// Test
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.myMap((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

### Best Practices:

```javascript
// ✅ Kiểm tra callback là function
if (typeof callback !== "function") {
  throw new TypeError(callback + " is not a function");
}

// ✅ Bỏ qua empty slots
if (i in this) {
  result[i] = callback.call(thisArg, this[i], i, this);
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên bỏ qua empty slots check
for (let i = 0; i < this.length; i++) {
  result[i] = callback.call(thisArg, this[i], i, this);
}

// ✅ Nên check empty slots
for (let i = 0; i < this.length; i++) {
  if (i in this) {
    result[i] = callback.call(thisArg, this[i], i, this);
  }
}
```

---

## Implement `filter` từ scratch?

### Mục đích / Purpose

Implement [`filter()`](interview-practice/topics/javascript/answers/07-higher-order-functions.md:1) giúp:

- Hiểu cách array methods hoạt động
- Implement custom array methods
- Deep understanding of JavaScript

### Khi nào cần implement / When to Use

Cần implement khi:

- Learning purposes
- Custom behavior
- Polyfill cho old browsers

### Giúp ích gì / Benefits

**Lợi ích:**

- **Understanding**: Deep understanding
- **Custom behavior**: Custom logic
- **Polyfill**: Support old browsers

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm     |
| ------------------ | -------------- |
| Deep understanding | Verbose hơn    |
| Custom behavior    | Có thể có bugs |

### Implement:

```javascript
// Implement filter từ scratch
Array.prototype.myFilter = function (callback, thisArg) {
  // Kiểm tra callback là function
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  // Tạo mảng mới
  const result = [];

  // Lặp qua từng element
  for (let i = 0; i < this.length; i++) {
    // Bỏ qua empty slots
    if (i in this) {
      // Gọi callback, nếu true thì thêm vào result
      if (callback.call(thisArg, this[i], i, this)) {
        result.push(this[i]);
      }
    }
  }

  return result;
};

// Test
const numbers = [1, 2, 3, 4, 5, 6];
const even = numbers.myFilter((num) => num % 2 === 0);
console.log(even); // [2, 4, 6]
```

### Best Practices:

```javascript
// ✅ Kiểm tra callback là function
if (typeof callback !== "function") {
  throw new TypeError(callback + " is not a function");
}

// ✅ Bỏ qua empty slots
if (i in this) {
  if (callback.call(thisArg, this[i], i, this)) {
    result.push(this[i]);
  }
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên bỏ qua empty slots check
for (let i = 0; i < this.length; i++) {
  if (callback.call(thisArg, this[i], i, this)) {
    result.push(this[i]);
  }
}

// ✅ Nên check empty slots
for (let i = 0; i < this.length; i++) {
  if (i in this) {
    if (callback.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }
}
```

---

## Implement `reduce` từ scratch?

### Mục đích / Purpose

Implement [`reduce()`](interview-practice/topics/javascript/answers/07-higher-order-functions.md:1) giúp:

- Hiểu cách array methods hoạt động
- Implement custom array methods
- Deep understanding of JavaScript

### Khi nào cần implement / When to Use

Cần implement khi:

- Learning purposes
- Custom behavior
- Polyfill cho old browsers

### Giúp ích gì / Benefits

**Lợi ích:**

- **Understanding**: Deep understanding
- **Custom behavior**: Custom logic
- **Polyfill**: Support old browsers

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm     |
| ------------------ | -------------- |
| Deep understanding | Verbose hơn    |
| Custom behavior    | Có thể có bugs |

### Implement:

```javascript
// Implement reduce từ scratch
Array.prototype.myReduce = function (callback, initialValue) {
  // Kiểm tra callback là function
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  // Xử lý empty array
  if (this.length === 0 && initialValue === undefined) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let accumulator;
  let startIndex;

  // Xác định initial value
  if (initialValue !== undefined) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    // Tìm element đầu tiên không phải empty slot
    for (let i = 0; i < this.length; i++) {
      if (i in this) {
        accumulator = this[i];
        startIndex = i + 1;
        break;
      }
    }

    // Nếu không tìm thấy và không có initialValue
    if (startIndex === undefined) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
  }

  // Lặp qua các elements còn lại
  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }

  return accumulator;
};

// Test - sum
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.myReduce((acc, num) => acc + num, 0);
console.log(sum); // 15
```

### Best Practices:

```javascript
// ✅ Kiểm tra callback là function
if (typeof callback !== "function") {
  throw new TypeError(callback + " is not a function");
}

// ✅ Xử lý empty array
if (this.length === 0 && initialValue === undefined) {
  throw new TypeError("Reduce of empty array with no initial value");
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên bỏ qua empty array check
if (this.length === 0) {
  return callback();
}

// ✅ Nên check empty array
if (this.length === 0 && initialValue === undefined) {
  throw new TypeError("Reduce of empty array with no initial value");
}
```

---

## `forEach` vs `map`?

### Mục đích / Purpose

Hiểu sự khác biệt giữa [`forEach()`](interview-practice/topics/javascript/answers/07-higher-order-functions.md:1) và [`map()`](interview-practice/topics/javascript/answers/07-higher-order-functions.md:1) giúp:

- Chọn đúng method
- Tránh bugs
- Write efficient code

### Khi nào dùng / When to Use

| Method      | Khi nào dùng                    |
| ----------- | ------------------------------- |
| `forEach()` | Side effects, không cần kết quả |
| `map()`     | Transform, cần mảng mới         |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Correct usage**: Chọn đúng method
- **Efficient**: Code hiệu quả
- **Clear intent**: Code rõ ràng

### Ưu nhược điểm / Pros & Cons

| Method      | Ưu điểm           | Nhược điểm             |
| ----------- | ----------------- | ---------------------- |
| `forEach()` | Side effects      | Không trả về giá trị   |
| `map()`     | Transform, trả về | Tạo array mới (memory) |

### Bảng so sánh:

| Đặc điểm          | `forEach()`  | `map()`   |
| ----------------- | ------------ | --------- |
| Trả về giá trị    | `undefined`  | Array mới |
| Thay đổi original | Có thể       | Không     |
| Chainable         | Không        | Có        |
| Use case          | Side effects | Transform |

### Best Practices:

```javascript
// ✅ Dùng forEach khi:
// - Chỉ cần side effects
numbers.forEach((num) => console.log(num));

// ✅ Dùng map khi:
// - Cần transform data
const doubled = numbers.map((num) => num * 2);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng forEach để tạo mảng mới
let doubled = [];
numbers.forEach((num) => {
  doubled.push(num * 2);
});

// ✅ Nên dùng map
const doubled = numbers.map((num) => num * 2);
```

---

## `find`, `findIndex`, `some`, `every`?

### Mục đích / Purpose

Các array methods này được thiết kế để:

- [`find()`](interview-practice/topics/javascript/answers/07-higher-order-functions.md:1): Tìm element đầu tiên
- [`findIndex()`](interview-practice/topics/javascript/answers/07-higher-order-functions.md:1): Tìm index
- [`some()`](interview-practice/topics/javascript/answers/07-higher-order-functions.md:1): Kiểm tra có element nào thỏa
- [`every()`](interview-practice/topics/javascript/answers/07-higher-order-functions.md:1): Kiểm tra tất cả thỏa

### Khi nào dùng / When to Use

| Method        | Khi nào dùng                         |
| ------------- | ------------------------------------ |
| `find()`      | Tìm element đầu tiên thỏa điều kiện  |
| `findIndex()` | Tìm index của element thỏa điều kiện |
| `some()`      | Kiểm tra có element nào thỏa         |
| `every()`     | Kiểm tra tất cả thỏa điều kiện       |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Concise**: Code ngắn gọn
- **Declarative**: Declarative style
- **Readable**: Dễ đọc hơn loops

### Ưu nhược điểm / Pros & Cons

| Method        | Ưu điểm              | Nhược điểm                            |
| ------------- | -------------------- | ------------------------------------- |
| `find()`      | Tìm element đầu tiên | Trả về `undefined` nếu không tìm thấy |
| `findIndex()` | Tìm index            | Trả về `-1` nếu không tìm thấy        |
| `some()`      | Boolean result       | Dừng khi tìm thấy element đầu tiên    |
| `every()`     | Boolean result       | Dừng khi không thỏa điều kiện         |

### Bảng so sánh:

| Method        | Trả về                   | Dừng khi                  |
| ------------- | ------------------------ | ------------------------- |
| `find()`      | Element hoặc `undefined` | Tìm thấy element đầu tiên |
| `findIndex()` | Index hoặc `-1`          | Tìm thấy element đầu tiên |
| `some()`      | `true` hoặc `false`      | Tìm thấy element đầu tiên |
| `every()`     | `true` hoặc `false`      | Không thỏa điều kiện      |

### Best Practices:

```javascript
// ✅ Dùng find khi cần element
const user = users.find((u) => u.id === 1);

// ✅ Dùng findIndex khi cần index
const index = users.findIndex((u) => u.id === 1);

// ✅ Dùng some khi cần kiểm tra tồn tại
const exists = users.some((u) => u.id === 1);

// ✅ Dùng every khi cần tất cả thỏa
const allValid = users.every((u) => u.age >= 18);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng find khi chỉ cần kiểm tra tồn tại
const user = users.find((u) => u.id === 1);
if (user) {
  /* ... */
}

// ✅ Nên dùng some
const exists = users.some((u) => u.id === 1);
if (exists) {
  /* ... */
}
```

---

## Chaining array methods?

### Mục đích / Purpose

**Chaining array methods** - kết nối nhiều array methods với nhau để tạo data transformations.

### Khi nào dùng / When to Use

Chaining nên dùng khi:

- Cần nhiều transformations
- Code dễ đọc hơn nested loops
- Cần immutable operations

### Giúp ích gì / Benefits

**Lợi ích:**

- **Readable**: Code dễ đọc
- **Immutable**: Không thay đổi original data
- **Declarative**: Declarative style

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm                    |
| ------------- | ----------------------------- |
| Readable code | Có thể khó debug              |
| Immutable     | Tạo nhiều intermediate arrays |
| Declarative   | Learning curve                |

### Ví dụ:

```javascript
// Chain map và filter
const numbers = [1, 2, 3, 4, 5, 6];

const result = numbers
  .filter((num) => num % 2 === 0) // [2, 4, 6]
  .map((num) => num * 2); // [4, 8, 12]

console.log(result); // [4, 8, 12]
```

### Best Practices:

```javascript
// ✅ Dùng chaining khi:
// - Cần nhiều transformations
const result = data
  .filter(...)
  .map(...)
  .sort(...);

// ✅ Tách thành các steps có tên nếu quá dài
const filtered = data.filter(...);
const transformed = filtered.map(...);
const sorted = transformed.sort(...);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên chain quá dài
const result = data.filter(...).map(...).filter(...).map(...).sort(...).map(...);

// ✅ Nên tách thành các steps có tên
const filtered = data.filter(...);
const transformed = filtered.map(...);
const sorted = transformed.sort(...);
```
