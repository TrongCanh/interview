# JavaScript Interview Notes / Ghi chú Phỏng vấn JavaScript

> Ghi chú câu trả lời cho các câu hỏi phỏng vấn JavaScript / Notes for JavaScript interview answers

---

## 📚 Cơ bản / Basics

### 1. Về `var`, `let`, và `const`

**Sự khác biệt:**

- `var`: Function-scoped, có hoisting, có thể re-declare
- `let`: Block-scoped, có temporal dead zone, không thể re-declare
- `const`: Block-scoped, phải khởi tạo giá trị, không thể re-assign (nhưng object/array có thể mutate)

**Khi nào dùng:**

- Dùng `const` cho các giá trị không thay đổi (default choice)
- Dùng `let` khi cần re-assign giá trị
- Không dùng `var` trong code hiện đại

**Hoisting:**

```javascript
console.log(x); // undefined (not ReferenceError)
var x = 5;

console.log(y); // ReferenceError
let y = 5;
```

### 2. Data Types

**8 kiểu dữ liệu trong JS:**

- Primitive: `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, `null`
- Reference: `object`

**null vs undefined:**

```javascript
typeof null; // "object" (bug lịch sử)
typeof undefined; // "undefined"

null === undefined; // false
null == undefined; // true
```

### 3. Equality

**== vs ===:**

- `==`: Type coercion trước khi so sánh
- `===`: Strict equality, không có type coercion

**`[] == ![]` = true:**

```javascript
[] == ![]
[] == false      // ![] = false
[] == 0          // false = 0
"" == 0          // [].toString() = ""
0 == 0           // "" = 0
true
```

---

## 🔥 Functions & Closures

### 4. Closures

**Definition:** Closure là function có quyền truy cập vào variables từ outer scope, ngay cả khi outer function đã return.

```javascript
function outer() {
  let count = 0;

  return function inner() {
    count++;
    return count;
  };
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```

**Use cases:**

- Data privacy (module pattern)
- Function factories
- Event handlers
- Memoization

### 5. `this` Keyword

**`this` rules:**

1. Default: global object (undefined in strict mode)
2. Implicit: object before `.`
3. Explicit: `call()`, `apply()`, `bind()`
4. `new`: new object
5. Arrow: inherits from outer scope

```javascript
const obj = {
  name: "John",
  regular: function () {
    console.log(this.name);
  },
  arrow: () => {
    console.log(this.name);
  },
};

obj.regular(); // "John"
obj.arrow(); // undefined (inherits from outer scope)
```

### 6. Higher-Order Functions

**Implement `map`:**

```javascript
function map(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i], i, arr));
  }
  return result;
}
```

**Implement `filter`:**

```javascript
function filter(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}
```

---

## 🔄 Async JavaScript

### 7. Promises

**States:** Pending → Fulfilled/Rejected

**`Promise.all` vs `Promise.race`:**

```javascript
// Promise.all: chờ tất cả, reject nếu 1 fail
Promise.all([p1, p2, p3]);

// Promise.race: trả về kết quả đầu tiên
Promise.race([p1, p2, p3]);

// Promise.allSettled: chờ tất cả, không reject
Promise.allSettled([p1, p2, p3]);
```

### 8. Async/Await

**Parallel execution:**

```javascript
// Sequential (slow)
const a = await fetch(url1);
const b = await fetch(url2);

// Parallel (fast)
const [a, b] = await Promise.all([fetch(url1), fetch(url2)]);
```

### 9. Event Loop

**Order of execution:**

```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

// Output: 1, 4, 3, 2
// Call stack: 1, 4
// Microtask queue: 3
// Macrotask queue: 2
```

---

## 🎯 OOP trong JavaScript

### 10. Prototypes

**Prototype chain:**

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hello, I'm ${this.name}`);
};

const john = new Person("John");
john.greet(); // "Hello, I'm John"

john.__proto__ === Person.prototype; // true
Person.prototype.__proto__ === Object.prototype; // true
```

### 11. Classes (ES6+)

**Private fields:**

```javascript
class Counter {
  #count = 0;

  increment() {
    this.#count++;
  }

  getCount() {
    return this.#count;
  }
}
```

### 12. Inheritance

**Class inheritance:**

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks`);
  }
}
```

---

## 🛠️ Advanced Concepts

### 13. Currying

```javascript
function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

// Usage
add(1)(2)(3); // 6

// Arrow function version
const add = (a) => (b) => (c) => a + b + c;
```

### 14. Memoization

```javascript
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
```

### 15. Debounce & Throttle

**Debounce:**

```javascript
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
```

**Throttle:**

```javascript
function throttle(func, limit) {
  let inThrottle;

  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

---

## 📦 ES6+ Features

### 16. Destructuring

```javascript
// Array
const [a, b, ...rest] = [1, 2, 3, 4, 5];

// Object
const { name, age, ...rest } = person;

// Nested
const {
  user: { name: userName },
} = data;
```

### 17. Spread & Rest

```javascript
// Spread
const arr = [1, 2, 3];
const newArr = [...arr, 4, 5];

const obj = { a: 1, b: 2 };
const newObj = { ...obj, c: 3 };

// Rest
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
```

### 18. Modules

```javascript
// Export
export const PI = 3.14;
export function add(a, b) {
  return a + b;
}
export default class Calculator {}

// Import
import Calculator, { PI, add } from "./math.js";
```

---

## 🐛 Debugging & Best Practices

### 19. Error Handling

```javascript
// Custom Error
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

try {
  // code that might throw
} catch (error) {
  if (error instanceof ValidationError) {
    // handle validation error
  }
} finally {
  // cleanup
}
```

### 20. Performance

**Tips:**

- Avoid unnecessary re-renders (React)
- Use lazy loading
- Debounce/throttle event handlers
- Use requestAnimationFrame for animations
- Optimize loops (cache length)

---

## 📝 Coding Challenges

### 21. Deep Clone

```javascript
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (hash.has(obj)) {
    return hash.get(obj);
  }

  const clone = Array.isArray(obj) ? [] : {};
  hash.set(obj, clone);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], hash);
    }
  }

  return clone;
}
```

### 22. Debounce (xem ở trên)

### 23. Promise.all

```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an array"));
    }

    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      return resolve(results);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}
```

---

_Last updated: 2026-01-30_
