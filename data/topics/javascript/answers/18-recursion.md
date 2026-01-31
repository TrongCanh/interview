# 18. Recursion

## Tổng quan về Recursion

### Mục đích của Recursion / Purpose

**Recursion** là technique function gọi chính nó để giải quyết vấn đề.

**Mục đích chính:**

- Divide and conquer
- Problem solving
- Data structure traversal
- Functional programming

### Khi nào cần hiểu về Recursion / When to Use

Hiểu về Recursion là cần thiết khi:

- Problem solving
- Data structure traversal
- Functional programming
- Algorithm design

### Giúp ích gì / Benefits

**Lợi ích:**

- **Divide and conquer**: Chia nhỏ vấn đề
- **Problem solving**: Giải quyết vấn đề
- **Data traversal**: Duyệt data structures
- **Functional**: Functional programming

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm             |
| ------------------ | ---------------------- | ------------------------- |
| Divide and conquer | Chia nhỏ vấn đề        | Stack overflow            |
| Problem solving    | Giải quyết vấn đề      | Verbose hơn iteration     |
| Data traversal     | Duyệt data structures  | Learning curve            |
| Functional         | Functional programming | Có thể chậm hơn iteration |

---

## Recursion là gì?

**Recursion** là technique function gọi chính nó để giải quyết vấn đề.

### Mục đích / Purpose

**Recursion** được thiết kế để:

- Divide and conquer
- Problem solving
- Data structure traversal
- Functional programming

### Khi nào dùng / When to Use

Recursion nên dùng khi:

- Problem solving
- Data structure traversal
- Functional programming
- Algorithm design

### Giúp ích gì / Benefits

**Lợi ích:**

- **Divide and conquer**: Chia nhỏ vấn đề
- **Problem solving**: Giải quyết vấn đề
- **Data traversal**: Duyệt data structures
- **Functional**: Functional programming

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm             |
| ------------------ | ---------------------- | ------------------------- |
| Divide and conquer | Chia nhỏ vấn đề        | Stack overflow            |
| Problem solving    | Giải quyết vấn đề      | Verbose hơn iteration     |
| Data traversal     | Duyệt data structures  | Learning curve            |
| Functional         | Functional programming | Có thể chậm hơn iteration |

### Recursion cơ bản:

```javascript
// Recursion - function gọi chính nó
function factorial(n) {
  // Base case
  if (n <= 1) return 1;

  // Recursive case
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
```

### Recursion với Fibonacci:

```javascript
// Fibonacci với recursion
function fibonacci(n) {
  // Base cases
  if (n <= 1) return n;

  // Recursive case
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
```

### Best Practices:

```javascript
// ✅ Dùng recursion cho:
// - Divide and conquer
// - Data structure traversal
// - Functional programming
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng recursion mà không có base case
function badFactorial(n) {
  return n * badFactorial(n - 1);
  // Stack overflow!
}

// ✅ Nên dùng recursion với base case
function goodFactorial(n) {
  if (n <= 1) return 1;
  return n * goodFactorial(n - 1);
}
```

---

## Base case và Recursive case?

**Base case** - Điều kiện dừng recursion.
**Recursive case** - Gọi function đệ quy.

### Mục đích / Purpose

**Base case và Recursive case** được thiết kế để:

- Dừng recursion
- Divide problem
- Problem solving
- Algorithm design

### Khi nào dùng / When to Use

Base case và Recursive case nên dùng khi:

- Recursion
- Problem solving
- Algorithm design
- Functional programming

### Giúp ích gì / Benefits

**Lợi ích:**

- **Stop recursion**: Dừng recursion
- **Divide problem**: Chia nhỏ vấn đề
- **Problem solving**: Giải quyết vấn đề
- **Algorithm design**: Thiết kế algorithm

### Ưu nhược điểm / Pros & Cons

| Ưu điểm          | Nhược điểm         |
| ---------------- | ------------------ | ------------------------- |
| Stop recursion   | Dừng recursion     | Có thể gây bugs           |
| Divide problem   | Chia nhỏ vấn đề    | Learning curve            |
| Problem solving  | Giải quyết vấn đề  | Verbose hơn iteration     |
| Algorithm design | Thiết kế algorithm | Có thể gây stack overflow |

### Base case và Recursive case:

```javascript
// Base case và Recursive case
function factorial(n) {
  // Base case - dừng recursion
  if (n <= 1) return 1;

  // Recursive case - gọi đệ quy
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
```

### Multiple base cases:

```javascript
// Multiple base cases
function fibonacci(n) {
  // Base cases
  if (n === 0) return 0;
  if (n === 1) return 1;

  // Recursive case
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
```

### Best Practices:

```javascript
// ✅ Dùng base case cho:
// - Dừng recursion
// - Prevent stack overflow
function factorial(n) {
  if (n <= 1) return 1; // Base case
  return n * factorial(n - 1); // Recursive case
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng recursion mà không có base case
function badFactorial(n) {
  return n * badFactorial(n - 1);
  // Stack overflow!
}

// ✅ Nên dùng recursion với base case
function goodFactorial(n) {
  if (n <= 1) return 1; // Base case
  return n * goodFactorial(n - 1); // Recursive case
}
```

---

## Tail recursion?

**Tail recursion** - Recursive call là operation cuối cùng trong function.

### Mục đích / Purpose

**Tail recursion** được thiết kế để:

- Optimize recursion
- Avoid stack overflow
- Performance optimization
- Functional programming

### Khi nào dùng / When to Use

Tail recursion nên dùng khi:

- Performance optimization
- Avoid stack overflow
- Functional programming
- Algorithm design

### Giúp ích gì / Benefits

**Lợi ích:**

- **Optimize**: Tối ưu recursion
- **Avoid stack overflow**: Tránh stack overflow
- **Performance**: Performance tốt hơn
- **Functional**: Functional programming

### Ưu nhược điểm / Pros & Cons

| Ưu điểm              | Nhược điểm             |
| -------------------- | ---------------------- | -------------------------------- |
| Optimize             | Tối ưu recursion       | Không support trong mọi browsers |
| Avoid stack overflow | Tránh stack overflow   | Learning curve                   |
| Performance          | Performance tốt hơn    | Verbose hơn iteration            |
| Functional           | Functional programming | Có thể gây bugs                  |

### Tail recursion:

```javascript
// Tail recursion - recursive call là operation cuối cùng
function factorialTail(n, acc = 1) {
  // Base case
  if (n <= 1) return acc;

  // Recursive case - tail call
  return factorialTail(n - 1, n * acc);
}

console.log(factorialTail(5)); // 120
```

### Tail recursion vs Regular recursion:

```javascript
// Regular recursion - không phải tail call
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1); // Không phải tail call
}

// Tail recursion - tail call
function factorialTail(n, acc = 1) {
  if (n <= 1) return acc;
  return factorialTail(n - 1, n * acc); // Tail call
}
```

### Best Practices:

```javascript
// ✅ Dùng tail recursion cho:
// - Performance optimization
// - Avoid stack overflow
// - Functional programming
function factorialTail(n, acc = 1) {
  if (n <= 1) return acc;
  return factorialTail(n - 1, n * acc);
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng regular recursion cho large inputs
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
  // Stack overflow với n lớn!
}

// ✅ Nên dùng tail recursion cho large inputs
function factorialTail(n, acc = 1) {
  if (n <= 1) return acc;
  return factorialTail(n - 1, n * acc);
  // Không stack overflow
}
```

---

## Stack overflow?

**Stack overflow** - Call stack tràn khi recursion quá sâu.

### Mục đích / Purpose

Hiểu về **stack overflow** giúp:

- Tránh stack overflow
- Debug recursion
- Performance optimization
- Algorithm design

### Khi nào gặp vấn đề / When to Use

Vấn đề stack overflow xuất hiện khi:

- Recursion quá sâu
- Không có base case
- Large inputs
- Debug recursion

### Giúp ích gì / Benefits

Hiểu về stack overflow giúp:

- **Avoid**: Tránh stack overflow
- **Debug**: Dễ dàng debug
- **Optimize**: Tối ưu algorithm
- **Design**: Thiết kế tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm  | Nhược điểm           |
| -------- | -------------------- | --------------------- |
| Avoid    | Tránh stack overflow | Verbose hơn iteration |
| Debug    | Dễ dàng debug        | Learning curve        |
| Optimize | Tối ưu algorithm     | Có thể gây bugs       |
| Design   | Thiết kế tốt hơn     | Verbose hơn           |

### Stack overflow với recursion:

```javascript
// Stack overflow - recursion quá sâu
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Stack overflow với n lớn
// factorial(10000);  // RangeError: Maximum call stack size exceeded
```

### Tránh stack overflow với tail recursion:

```javascript
// Tail recursion - tránh stack overflow
function factorialTail(n, acc = 1) {
  if (n <= 1) return acc;
  return factorialTail(n - 1, n * acc);
}

// Không stack overflow với tail recursion
console.log(factorialTail(10000)); // OK
```

### Tránh stack overflow với iteration:

```javascript
// Iteration - tránh stack overflow
function factorialIterative(n) {
  let result = 1;

  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

// Không stack overflow
console.log(factorialIterative(10000)); // OK
```

### Best Practices:

```javascript
// ✅ Dùng tail recursion để:
// - Tránh stack overflow
// - Performance optimization
function factorialTail(n, acc = 1) {
  if (n <= 1) return acc;
  return factorialTail(n - 1, n * acc);
}

// ✅ Dùng iteration khi:
// - Tránh stack overflow
// - Performance
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng regular recursion cho large inputs
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
  // Stack overflow với n lớn!
}

// ✅ Nên dùng tail recursion hoặc iteration
function factorialTail(n, acc = 1) {
  if (n <= 1) return acc;
  return factorialTail(n - 1, n * acc);
  // Không stack overflow
}
```

---

## Recursion vs Iteration?

### Mục đích / Purpose

Hiểu sự khác biệt giữa **Recursion** và **Iteration** giúp:

- Chọn đúng approach
- Hiểu JavaScript
- Performance optimization
- Algorithm design

### Khi nào dùng / When to Use

| Approach    | Khi nào dùng       |
| ----------- | ------------------ | ------------------------------------------------ |
| `Recursion` | Divide and conquer | Data structure traversal, functional programming |
| `Iteration` | Loop operations    | Simple loops, performance                        |

### Giúp ích gì / Benefits

Hiểu sự khác biệt giúp:

- **Choose right**: Chọn đúng approach
- **Understand**: Hiểu JavaScript
- **Performance**: Tối ưu performance
- **Algorithm design**: Thiết kế algorithm

### Ưu nhược điểm / Pros & Cons

| Approach    | Ưu điểm             | Nhược điểm            |
| ----------- | ------------------- | --------------------- |
| `Recursion` | Divide and conquer  | Stack overflow        |
| `Iteration` | Performance tốt hơn | Verbose hơn recursion |

### Recursion - Divide and conquer:

```javascript
// Recursion - divide and conquer
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
```

### Iteration - Loop:

```javascript
// Iteration - loop
function factorialIterative(n) {
  let result = 1;

  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

console.log(factorialIterative(5)); // 120
```

### So sánh:

```javascript
// Recursion
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Iteration
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Cả 2 đều trả về cùng kết quả
console.log(factorial(5)); // 120
console.log(factorialIterative(5)); // 120
```

### Best Practices:

```javascript
// ✅ Dùng recursion cho:
// - Divide and conquer
// - Data structure traversal
// - Functional programming
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// ✅ Dùng iteration cho:
// - Simple loops
// - Performance
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng recursion cho simple loops
function sumArray(arr, index = 0) {
  if (index >= arr.length) return 0;
  return arr[index] + sumArray(arr, index + 1);
}

// ✅ Nên dùng iteration cho simple loops
function sumArrayIterative(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// ❌ Không nên dùng iteration cho complex divide and conquer
function fibonacciIterative(n) {
  // Verbose và khó hiểu
  // ...
}

// ✅ Nên dùng recursion cho divide and conquer
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

---

## Tree traversal?

**Tree traversal** - Duyệt tree data structure với recursion.

### Mục đích / Purpose

**Tree traversal** được thiết kế để:

- Duyệt tree data structure
- Process tree nodes
- Algorithm design
- Data structure manipulation

### Khi nào dùng / When to Use

Tree traversal nên dùng khi:

- Duyệt tree data structure
- Process tree nodes
- Algorithm design
- Data structure manipulation

### Giúp ích gì / Benefits

**Lợi ích:**

- **Traversal**: Duyệt tree
- **Process nodes**: Process tree nodes
- **Algorithm**: Algorithm design
- **Data structure**: Data structure manipulation

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm                  |
| -------------- | --------------------------- | ----------------------------- |
| Traversal      | Duyệt tree                  | Stack overflow với deep trees |
| Process nodes  | Process tree nodes          | Verbose hơn iteration         |
| Algorithm      | Algorithm design            | Learning curve                |
| Data structure | Data structure manipulation | Có thể gây bugs               |

### Tree traversal - Pre-order:

```javascript
// Tree traversal - pre-order
function preOrder(node) {
  if (!node) return;

  console.log(node.value); // Visit root
  preOrder(node.left); // Visit left
  preOrder(node.right); // Visit right
}

// Tree structure
const tree = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4 },
    right: { value: 5 },
  },
  right: {
    value: 3,
    left: { value: 6 },
    right: { value: 7 },
  },
};

preOrder(tree);
// 1, 2, 4, 5, 3, 6, 7
```

### Tree traversal - In-order:

```javascript
// Tree traversal - in-order
function inOrder(node) {
  if (!node) return;

  inOrder(node.left); // Visit left
  console.log(node.value); // Visit root
  inOrder(node.right); // Visit right
}

inOrder(tree);
// 4, 2, 5, 1, 6, 3, 7
```

### Tree traversal - Post-order:

```javascript
// Tree traversal - post-order
function postOrder(node) {
  if (!node) return;

  postOrder(node.left); // Visit left
  postOrder(node.right); // Visit right
  console.log(node.value); // Visit root
}

postOrder(tree);
// 4, 5, 2, 6, 7, 3, 1
```

### Best Practices:

```javascript
// ✅ Dùng tree traversal cho:
// - Duyệt tree data structure
// - Process tree nodes
// - Algorithm design
function preOrder(node) {
  if (!node) return;
  console.log(node.value);
  preOrder(node.left);
  preOrder(node.right);
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng tree traversal mà không có base case
function badPreOrder(node) {
  console.log(node.value);
  badPreOrder(node.left);
  badPreOrder(node.right);
  // Stack overflow với null nodes!
}

// ✅ Nên dùng tree traversal với base case
function goodPreOrder(node) {
  if (!node) return; // Base case
  console.log(node.value);
  goodPreOrder(node.left);
  goodPreOrder(node.right);
}
```

---

## Memoized recursion?

**Memoized recursion** - Recursion với caching để tránh tính toán lại.

### Mục đích / Purpose

**Memoized recursion** được thiết kế để:

- Cache results
- Performance optimization
- Avoid recomputation
- Functional programming

### Khi nào dùng / When to Use

Memoized recursion nên dùng khi:

- Performance optimization
- Avoid recomputation
- Functional programming
- Algorithm design

### Giúp ích gì / Benefits

**Lợi ích:**

- **Cache**: Cache results
- **Performance**: Tối ưu performance
- **Avoid recomputation**: Tránh tính toán lại
- **Functional**: Functional programming

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm             |
| ------------------- | ---------------------- | ----------------------------- |
| Cache               | Cache results          | Memory overhead               |
| Performance         | Tối ưu performance     | Verbose hơn regular recursion |
| Avoid recomputation | Tránh tính toán lại    | Learning curve                |
| Functional          | Functional programming | Có thể gây bugs               |

### Memoized recursion:

```javascript
// Memoized recursion - cache results
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

### Memoized recursion với closure:

```javascript
// Memoized recursion với closure
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
// ✅ Dùng memoized recursion cho:
// - Performance optimization
// - Avoid recomputation
// - Functional programming
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

// ✅ Nên dùng memoized recursion
const fibonacci = memoize(function (n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});
console.log(fibonacci(50)); // Nhanh hơn nhiều
```
