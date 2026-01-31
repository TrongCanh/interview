# 4. Function Declarations & Expressions

## Tổng quan về Function Declarations & Expressions

### Mục đích của Functions / Purpose

**Functions** là reusable blocks of code để thực hiện các tasks cụ thể trong JavaScript.

**Mục đích chính:**

- Reuse code logic
- Organize code thành modules
- Implement algorithms
- Handle events và callbacks

### Khi nào cần hiểu về Functions / When to Use

Hiểu về functions là cần thiết khi:

- Viết bất kỳ code JavaScript nào
- Implement business logic
- Handle user interactions
- Process và transform data

### Giúp ích gì / Benefits

**Lợi ích:**

- **Code reuse**: Reuse logic ở nhiều nơi
- **Modularity**: Organize code thành modules
- **Maintainability**: Dễ maintain và debug
- **Abstraction**: Hide implementation details

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm                         |
| --------------- | ---------------------------------- |
| Code reuse      | Callback hell với nested functions |
| Modularity      | `this` binding confusion           |
| Maintainability | Performance overhead với closures  |
| Abstraction     | Debugging với async functions      |

---

## Function declaration vs Function expression?

**Function declaration vs Function expression** - Function declaration được hoisted, function expression không.

### Mục đích / Purpose

**Function declaration** và **Function expression** được thiết kế cho các use cases khác nhau:

- **Function declaration**: Hàm chính, cần hoisting
- **Function expression**: Callback, IIFE, conditional functions

### Khi nào dùng / When to Use

| Type                 | Khi nào dùng                          |
| -------------------- | ------------------------------------- |
| Function declaration | Hàm chính, cần hoisting, đệ quy       |
| Function expression  | Callback, IIFE, conditional functions |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Function declaration**: Hoisted, dễ dùng trước khi khai báo
- **Function expression**: Flexible, dùng làm callback

### Ưu nhược điểm / Pros & Cons

| Type                 | Ưu điểm                 | Nhược điểm                   |
| -------------------- | ----------------------- | ---------------------------- |
| Function declaration | Hoisted, dễ debug       | Không dùng cho IIFE          |
| Function expression  | Flexible, dùng callback | Không hoisted, khó debug hơn |

### Bảng so sánh:

| Đặc điểm                | Function Declaration | Function Expression                     |
| ----------------------- | -------------------- | --------------------------------------- |
| Hoisting                | ✅ Có                | ❌ Không                                |
| Tên function            | ✅ Có                | ❌ Không (anonymous) hoặc ✅ Có (named) |
| Dùng trước khi khai báo | ✅ Có                | ❌ Không                                |
| Stack trace             | ✅ Hiển thị tên      | ❌ "anonymous" hoặc tên đã đặt          |
| IIFE                    | ❌ Không             | ✅ Có                                   |

### Ví dụ:

```javascript
// Function Declaration - hoisted
console.log(add(1, 2)); // 3 - OK

function add(a, b) {
  return a + b;
}

// Function Expression - không hoisted
// console.log(subtract(5, 3));  // TypeError

const subtract = function (a, b) {
  return a - b;
};

console.log(subtract(5, 3)); // 2 - OK
```

### Best Practices:

```javascript
// ✅ Dùng Function Declaration cho:
// - Hàm chính, được dùng ở nhiều nơi
// - Hàm cần hoisting
// - Hàm đệ quy
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ Dùng Function Expression cho:
// - Hàm callback
// - Hàm gán cho biến
// - IIFE
const processItems = function (items) {
  return items.map((item) => item * 2);
};
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng Function Expression cho hàm chính
const calculateTotal = function (items) {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// ✅ Nên dùng Function Declaration
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ Không nên dùng Function Declaration cho callback
// setTimeout(function handleTimeout() { ... }, 1000);

// ✅ Nên dùng Function Expression
setTimeout(function () {
  console.log("Timeout");
}, 1000);
```

---

## Named function expressions?

**Named function expression** là function expression có tên, tên này chỉ có thể truy cập được bên trong chính function đó.

### Mục đích / Purpose

**Named function expression** được thiết kế để:

- Hiển thị tên trong stack trace
- Hỗ trợ đệ quy
- Self-reference trong event handlers

### Khi nào dùng / When to Use

Named function expressions nên dùng khi:

- Cần stack trace rõ ràng
- Hàm cần đệ quy
- Cần self-reference

### Giúp ích gì / Benefits

**Lợi ích:**

- **Debugging**: Stack trace hiển thị tên rõ ràng
- **Recursion**: Hỗ trợ đệ quy
- **Self-reference**: Có thể self-reference

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm                           |
| ------------------- | ------------------------------------ |
| Stack trace rõ ràng | Verbose hơn                          |
| Hỗ trợ đệ quy       | Tên chỉ truy cập được trong function |

### Ví dụ:

```javascript
// Named function expression
const factorial = function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1); // Tên 'factorial' dùng ở đây
};

console.log(factorial.name); // 'factorial'
console.log(factorial(5)); // 120
```

### Best Practices:

```javascript
// ✅ Named function expression cho đệ quy
const deepClone = function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }

  return cloned;
};
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng anonymous function cho đệ quy
const factorial = function (n) {
  if (n <= 1) return 1;
  // return n * factorial(n - 1);  // ReferenceError nếu không có tên
};

// ✅ Nên dùng named function expression
const factorial = function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};
```

---

## Anonymous functions?

**Anonymous function** là function không có tên, thường dùng làm callback hoặc IIFE.

### Mục đích / Purpose

**Anonymous function** được thiết kế để:

- Dùng làm callback
- Tạo IIFE
- Short-lived functions

### Khi nào dùng / When to Use

Anonymous functions nên dùng khi:

- Callback đơn giản, ngắn
- Hàm chỉ dùng một lần
- IIFE

### Giúp ích gì / Benefits

**Lợi ích:**

- **Concise**: Code ngắn gọn
- **Inline**: Dùng trực tiếp làm callback
- **No naming**: Không cần đặt tên

### Ưu nhược điểm / Pros & Cons

| Ưu điểm      | Nhược điểm                              |
| ------------ | --------------------------------------- |
| Concise code | Stack trace khó đọc ("anonymous")       |
| Inline usage | Không thể tự gọi lại (không đệ quy)     |
| No naming    | Không thể remove event listener dễ dàng |

### Ví dụ:

```javascript
// Anonymous function
setTimeout(function () {
  console.log("Delayed message");
}, 1000);

// Arrow function (cũng là anonymous)
const add = (a, b) => a + b;
```

### Best Practices:

```javascript
// ✅ Dùng anonymous functions cho:
// - Callback đơn giản, ngắn
// - Hàm chỉ dùng một lần
setTimeout(() => console.log("Timeout"), 1000);

// ✅ Dùng named function expressions cho:
// - Hàm phức tạp
// - Hàm cần đệ quy
// - Hàm cần debug
const factorial = function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng anonymous functions phức tạp
setTimeout(function () {
  // Nhiều code
  // Khó debug
}, 1000);

// ✅ Nên dùng named function cho logic phức tạp
function handleTimeout() {
  // Logic phức tạp
  // Dễ debug
}
setTimeout(handleTimeout, 1000);
```

---

## IIFE (Immediately Invoked Function Expression)?

**IIFE** (Immediately Invoked Function Expression) là function được thực thi ngay sau khi được định nghĩa.

### Mục đích / Purpose

**IIFE** được thiết kế để:

- Tạo private scope
- Module pattern
- Tránh global scope pollution

### Khi nào dùng / When to Use

IIFE nên dùng khi:

- Code cần thực thi ngay lập tức
- Tạo private scope
- Module pattern (trước ES6)

### Giúp ích gì / Benefits

**Lợi ích:**

- **Private scope**: Tạo scope riêng
- **No pollution**: Không gây global scope pollution
- **Module pattern**: Hỗ trợ module pattern

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm           |
| -------------- | -------------------- |
| Private scope  | Verbose              |
| No pollution   | ES6 modules thay thế |
| Module pattern | Khó debug hơn        |

### Ví dụ:

```javascript
// IIFE - thực thi ngay
(function () {
  console.log("IIFE executed");
})();

// IIFE với parameters
(function (name, age) {
  console.log(`Name: ${name}, Age: ${age}`);
})("John", 25);
```

### Best Practices:

```javascript
// ✅ Dùng IIFE cho:
// - Code cần thực thi ngay lập tức
// - Tạo private scope
// - Module pattern (trước ES6)

// ✅ Async IIFE cho async code
(async function () {
  const user = await fetchUser();
  const posts = await fetchPosts(user.id);
  renderPosts(posts);
})();
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không cần IIFE khi dùng ES6 modules
// module.js
// (function() {
//   const helper = () => {};
// })();

// ✅ Nên dùng ES6 modules
// module.js
export const helper = () => {};
```

---

## Arrow functions là gì?

**Arrow function** là cú pháp ngắn gọn để định nghĩa function, được giới thiệu từ ES6.

### Mục đích / Purpose

**Arrow function** được thiết kế để:

- Ngắn gọn hơn regular function
- Lexical `this` binding
- Dùng cho callbacks

### Khi nào dùng / When to Use

Arrow functions nên dùng khi:

- Callback ngắn gọn
- Hàm không cần `this`
- Array methods

### Giúp ích gì / Benefits

**Lợi ích:**

- **Concise**: Cú pháp ngắn gọn
- **Lexical this**: `this` từ scope cha
- **Implicit return**: Return implicit cho một dòng

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm                  |
| --------------- | --------------------------- |
| Concise syntax  | Không có `arguments` object |
| Lexical `this`  | Không thể dùng `new`        |
| Implicit return | Không có `prototype`        |
|                 | Không có `super`            |

### Bảng so sánh:

| Đặc điểm           | Arrow Function         | Regular Function      |
| ------------------ | ---------------------- | --------------------- |
| `this` binding     | Lexical (từ scope cha) | Dynamic (từ cách gọi) |
| `arguments` object | ❌ Không có            | ✅ Có                 |
| `new` operator     | ❌ Không thể dùng      | ✅ Có thể dùng        |
| `super`            | ❌ Không có            | ✅ Có                 |
| Hoisting           | ❌ Không hoisted       | ✅ Hoisted            |
| `prototype`        | ❌ Không có            | ✅ Có                 |

### Ví dụ:

```javascript
// Arrow function - ngắn gọn
const add = (a, b) => a + b;

// Regular function - dài hơn
function addRegular(a, b) {
  return a + b;
}

// Arrow function - lexical this
const obj = {
  name: "John",
  greet: function () {
    setTimeout(() => {
      console.log(`Hello, ${this.name}`); // 'this' từ obj
    }, 1000);
  },
};

obj.greet(); // 'Hello, John'
```

### Best Practices:

```javascript
// ✅ Dùng arrow functions cho:
// - Callback ngắn gọn
// - Hàm không cần this
// - Array methods
const doubled = numbers.map((n) => n * 2);
const sum = numbers.reduce((a, b) => a + b, 0);

// ✅ Dùng arrow functions cho methods khi cần lexical this
class Counter {
  constructor() {
    this.count = 0;
    this.increment = () => this.count++;
  }
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không dùng arrow functions cho:
// - Object methods (thường)
const obj = {
  // ❌ Không nên
  // greet: () => console.log(this.name),

  // ✅ Nên
  greet() {
    console.log(this.name);
  },
};

// ❌ Không dùng arrow functions cho prototype methods
// Person.prototype.greet = () => console.log(this.name);  // Sai
Person.prototype.greet = function () {
  console.log(this.name);
};

// ❌ Không dùng arrow functions cho constructor
// const Person = (name) => { this.name = name; };
// new Person('John');  // TypeError

// ✅ Nên dùng regular function
function Person(name) {
  this.name = name;
}
```

---

## Sự khác biệt giữa arrow function và regular function?

**Arrow function vs Regular function** - Arrow function có lexical `this`, không có `arguments`, không thể dùng `new`.

### Mục đích / Purpose

Hiểu sự khác biệt giúp:

- Chọn đúng function type
- Tránh `this`-related bugs
- Write predictable code

### Khi nào dùng / When to Use

| Type             | Khi nào dùng                          |
| ---------------- | ------------------------------------- |
| Arrow function   | Callback, hàm không cần `this`        |
| Regular function | Constructor, methods, cần `arguments` |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Arrow function**: Concise, lexical `this`
- **Regular function**: Flexible, có `arguments`, có thể dùng `new`

### Ưu nhược điểm / Pros & Cons

| Type             | Ưu điểm                  | Nhược điểm                             |
| ---------------- | ------------------------ | -------------------------------------- |
| Arrow function   | Concise, lexical `this`  | Không có `arguments`, không dùng `new` |
| Regular function | Flexible, có `arguments` | Verbose, dynamic `this`                |

### Bảng so sánh chi tiết:

| Đặc điểm                  | Arrow Function         | Regular Function      |
| ------------------------- | ---------------------- | --------------------- |
| **Syntax**                | Ngắn gọn               | Dài hơn               |
| **`this` binding**        | Lexical (từ scope cha) | Dynamic (từ cách gọi) |
| **`arguments`**           | ❌ Không có            | ✅ Có                 |
| **`new` operator**        | ❌ Không thể dùng      | ✅ Có thể dùng        |
| **`super`**               | ❌ Không có            | ✅ Có                 |
| **`prototype`**           | ❌ Không có            | ✅ Có                 |
| **Hoisting**              | ❌ Không hoisted       | ✅ Hoisted            |
| **Named function**        | ❌ Không thể đặt tên   | ✅ Có thể đặt tên     |
| **Return implicit**       | ✅ Có (một dòng)       | ❌ Không              |
| **Object literal return** | Cần `()`               | Không cần             |

### Ví dụ:

```javascript
// Arrow function - lexical this
const obj = {
  name: "John",
  greetArrow: () => {
    console.log(this.name); // undefined (this là global)
  },
  greetRegular: function () {
    console.log(this.name); // 'John' (this là obj)
  },
};

obj.greetArrow(); // undefined
obj.greetRegular(); // 'John'
```

### Best Practices:

```javascript
// ✅ Arrow functions cho:
// - Callback ngắn gọn
// - Hàm không cần this
const doubled = numbers.map((n) => n * 2);

// ✅ Regular functions cho:
// - Constructor functions
// - Methods cần dynamic this
// - Hàm cần arguments object
function Person(name) {
  this.name = name;
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên - arrow function cho object method
const calculator = {
  value: 0,
  // ❌ this không phải calculator
  add: (n) => (this.value += n),

  // ✅ this là calculator
  addRegular: function (n) {
    this.value += n;
  },

  // ✅ method shorthand
  subtract(n) {
    this.value -= n;
  },
};
```
