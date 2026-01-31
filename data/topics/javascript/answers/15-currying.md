# 15. Currying

## Tổng quan về Currying

### Mục đích của Currying / Purpose

**Currying** là technique chuyển đổi function nhận nhiều arguments thành chuỗi các functions nhận từng argument một.

**Mục đích chính:**

- Function composition
- Partial application
- Code reuse
- Functional programming

### Khi nào cần hiểu về Currying / When to Use

Hiểu về Currying là cần thiết khi:

- Functional programming
- Function composition
- Partial application
- Code reuse

### Giúp ích gì / Benefits

**Lợi ích:**

- **Composition**: Kết hợp functions
- **Partial application**: Gán một số arguments
- **Code reuse**: Reuse logic
- **Functional**: Functional programming

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm             |
| ------------------- | ---------------------- | ----------------------------- |
| Composition         | Code gọn hơn           | Verbose hơn regular functions |
| Partial application | Flexible               | Learning curve                |
| Code reuse          | Reuse logic            | Có thể gây confusion          |
| Functional          | Functional programming | Verbose hơn                   |

---

## Currying là gì?

**Currying** là technique chuyển đổi function nhận nhiều arguments thành chuỗi các functions nhận từng argument một.

### Mục đích / Purpose

**Currying** được thiết kế để:

- Function composition
- Partial application
- Code reuse
- Functional programming

### Khi nào dùng / When to Use

Currying nên dùng khi:

- Functional programming
- Function composition
- Partial application
- Code reuse

### Giúp ích gì / Benefits

**Lợi ích:**

- **Composition**: Kết hợp functions
- **Partial application**: Gán một số arguments
- **Code reuse**: Reuse logic
- **Functional**: Functional programming

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm             |
| ------------------- | ---------------------- | ----------------------------- |
| Composition         | Code gọn hơn           | Verbose hơn regular functions |
| Partial application | Flexible               | Learning curve                |
| Code reuse          | Reuse logic            | Có thể gây confusion          |
| Functional          | Functional programming | Verbose hơn                   |

### Currying cơ bản:

```javascript
// Currying - chuyển đổi function nhận nhiều args thành chuỗi functions
function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

// Sử dụng curried function
const result = add(1)(2)(3);
console.log(result); // 6
```

### Currying với arrow functions:

```javascript
// Currying với arrow functions
const add = (a) => (b) => (c) => a + b + c;

const result = add(1)(2)(3);
console.log(result); // 6
```

### Partial application:

```javascript
// Partial application - gán một số arguments
const addFive = add(5);

const result = addFive(10)(15);
console.log(result); // 30
```

### Best Practices:

```javascript
// ✅ Dùng currying cho:
// - Function composition
// - Partial application
// - Code reuse
const add = (a) => (b) => a + b;
const addFive = add(5);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng currying cho mọi functions
const add = (a) => (b) => (c) => a + b + c;

// ✅ Nên dùng currying khi cần partial application
const add = (a) => (b) => a + b;
const addFive = add(5);
```

---

## Partial application?

**Partial application** - Gán một số arguments của function, trả về function mới nhận các arguments còn lại.

### Mục đích / Purpose

**Partial application** được thiết kế để:

- Gán một số arguments
- Code reuse
- Function composition
- Functional programming

### Khi nào dùng / When to Use

Partial application nên dùng khi:

- Gán một số arguments
- Code reuse
- Function composition
- Functional programming

### Giúp ích gì / Benefits

**Lợi ích:**

- **Partial application**: Gán một số arguments
- **Code reuse**: Reuse logic
- **Composition**: Kết hợp functions
- **Functional**: Functional programming

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm             |
| ------------------- | ---------------------- | ----------------------------- |
| Partial application | Flexible               | Verbose hơn regular functions |
| Code reuse          | Reuse logic            | Learning curve                |
| Composition         | Kết hợp functions      | Có thể gây confusion          |
| Functional          | Functional programming | Verbose hơn                   |

### Partial application cơ bản:

```javascript
// Partial application - gán một số arguments
function add(a, b, c) {
  return a + b + c;
}

// Gán a = 5
const addFive = add.bind(null, 5);

const result = addFive(10, 15);
console.log(result); // 30
```

### Partial application với arrow functions:

```javascript
// Partial application với arrow functions
const add = (a, b, c) => a + b + c;

// Gán a = 5
const addFive = (b, c) => add(5, b, c);

const result = addFive(10, 15);
console.log(result); // 30
```

### Partial application với currying:

```javascript
// Partial application với currying
const add = (a) => (b) => (c) => a + b + c;

// Gán a = 5, b = 10
const addFiveTen = add(5)(10);

const result = addFiveTen(15);
console.log(result); // 30
```

### Best Practices:

```javascript
// ✅ Dùng partial application cho:
// - Gán một số arguments
// - Code reuse
// - Function composition
const add = (a, b, c) => a + b + c;
const addFive = (b, c) => add(5, b, c);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng partial application cho mọi functions
const addFive = add.bind(null, 5);

// ✅ Nên dùng partial application khi cần reuse
const addFive = (b, c) => add(5, b, c);
```

---

## Function composition?

**Function composition** - Kết hợp nhiều functions thành một function.

### Mục đích / Purpose

**Function composition** được thiết kế để:

- Kết hợp functions
- Code reuse
- Functional programming
- Clean code

### Khi nào dùng / When to Use

Function composition nên dùng khi:

- Kết hợp functions
- Code reuse
- Functional programming
- Clean code

### Giúp ích gì / Benefits

**Lợi ích:**

- **Composition**: Kết hợp functions
- **Code reuse**: Reuse logic
- **Functional**: Functional programming
- **Clean**: Code gọn hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm     | Nhược điểm             |
| ----------- | ---------------------- | ----------------------------- |
| Composition | Code gọn hơn           | Verbose hơn regular functions |
| Code reuse  | Reuse logic            | Learning curve                |
| Functional  | Functional programming | Có thể gây confusion          |
| Clean       | Code gọn hơn           | Verbose hơn                   |

### Function composition cơ bản:

```javascript
// Function composition - kết hợp 2 functions
const compose = (f, g) => (x) => f(g(x));

const addOne = (x) => x + 1;
const double = (x) => x * 2;

const addOneThenDouble = compose(double, addOne);

const result = addOneThenDouble(5);
console.log(result); // 12 (addOne: 6, double: 12)
```

### Function composition với nhiều functions:

```javascript
// Function composition với nhiều functions
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((acc, fn) => fn(acc), x);

const addOne = (x) => x + 1;
const double = (x) => x * 2;
const square = (x) => x * x;

const pipeline = compose(square, double, addOne);

const result = pipeline(3);
console.log(result); // 64 (addOne: 4, double: 8, square: 64)
```

### Function composition với currying:

```javascript
// Function composition với currying
const compose = (f, g) => (x) => f(g(x));

const add = (a) => (b) => a + b;
const multiply = (a) => (b) => a * b;

const addFiveThenMultiplyTwo = compose(multiply(2), add(5));

const result = addFiveThenMultiplyTwo(10);
console.log(result); // 30 (addFive: 15, multiplyTwo: 30)
```

### Best Practices:

```javascript
// ✅ Dùng function composition cho:
// - Kết hợp functions
// - Code reuse
// - Functional programming
const compose = (f, g) => (x) => f(g(x));
const addOneThenDouble = compose(double, addOne);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng function composition cho mọi cases
const result = compose(f, g, h)(x);

// ✅ Nên dùng function composition khi cần reuse
const pipeline = compose(f, g, h);
const result = pipeline(x);
```

---

## `bind()` vs currying?

### Mục đích / Purpose

Hiểu sự khác biệt giữa **`bind()`** và **currying** giúp:

- Chọn đúng technique
- Hiểu JavaScript
- Functional programming
- Code reuse

### Khi nào dùng / When to Use

| Technique  | Khi nào dùng                       |
| ---------- | ---------------------------------- | ----------------------------------- |
| `bind()`   | Gán `this` và partial application  | Gán `this`, partial application     |
| `currying` | Chuỗi functions nhận từng argument | Functional programming, composition |

### Giúp ích gì / Benefits

Hiểu sự khác biệt giúp:

- **Choose right**: Chọn đúng technique
- **Understand**: Hiểu JavaScript
- **Functional**: Functional programming
- **Code reuse**: Code reuse

### Ưu nhược điểm / Pros & Cons

| Technique  | Ưu điểm    | Nhược điểm           |
| ---------- | ---------- | -------------------- |
| `bind()`   | Gán `this` | Verbose hơn currying |
| `currying` | Flexible   | Learning curve       |

### `bind()` - Gán `this` và partial application:

```javascript
// bind() - gán `this` và partial application
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "John" };

// Gán `this` và greeting
const greetHello = greet.bind(person, "Hello");

greetHello("!"); // 'Hello, John!'
```

### `currying` - Chuỗi functions:

```javascript
// currying - chuỗi functions nhận từng argument
const greet = (greeting) => (punctuation) => (name) => {
  console.log(`${greeting}, ${name}${punctuation}`);
};

// Partial application
const greetHello = greet("Hello")("!");

greetHello("John"); // 'Hello, John!'
```

### So sánh:

```javascript
// bind() - gán `this` và partial application
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "John" };
const greetHello = greet.bind(person, "Hello");
greetHello("!"); // 'Hello, John!'

// currying - chuỗi functions
const greetCurried = (greeting) => (punctuation) => (name) => {
  console.log(`${greeting}, ${name}${punctuation}`);
};

const greetHelloCurried = greetCurried("Hello")("!");
greetHelloCurried("John"); // 'Hello, John!'
```

### Best Practices:

```javascript
// ✅ Dùng bind() cho:
// - Gán `this`
// - Partial application
const greetHello = greet.bind(person, "Hello");
greetHello("!");

// ✅ Dùng currying cho:
// - Functional programming
// - Function composition
const greetHelloCurried = greetCurried("Hello")("!");
greetHelloCurried("John");
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng bind() cho functional programming
const addFive = add.bind(null, 5);

// ✅ Nên dùng currying cho functional programming
const addFive = (b) => add(5, b);
```

---

## Implement `curry` function?

### Mục đích / Purpose

Implement [`curry()`](interview-practice/topics/javascript/answers/15-currying.md:1) function giúp:

- Tự động currying
- Functional programming
- Code reuse
- Clean code

### Khi nào cần implement / When to Use

Cần implement [`curry()`](interview-practice/topics/javascript/answers/15-currying.md:1) khi:

- Functional programming
- Code reuse
- Clean code
- Learning purposes

### Giúp ích gì / Benefits

**Lợi ích:**

- **Automatic**: Tự động currying
- **Functional**: Functional programming
- **Code reuse**: Reuse logic
- **Clean**: Code gọn hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm    | Nhược điểm             |
| ---------- | ---------------------- | --------------------------- |
| Automatic  | Tự động currying       | Verbose hơn manual currying |
| Functional | Functional programming | Learning curve              |
| Code reuse | Reuse logic            | Có thể gây bugs             |

### Implement `curry` function:

```javascript
// Implement curry function
function curry(fn) {
  return function curried(...args) {
    // Nếu đủ arguments, gọi function
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    // Nếu chưa đủ, trả về function mới
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}

// Sử dụng
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
console.log(curriedAdd(1, 2, 3)); // 6
```

### Implement `curry` với arrow function:

```javascript
// Implement curry với arrow function
const curry = (fn) => {
  const curried = (...args) => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
  return curried;
};

// Sử dụng
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
```

### Best Practices:

```javascript
// ✅ Implement curry cho:
// - Functional programming
// - Code reuse
// - Clean code
const curry = (fn) => {
  const curried = (...args) => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
  return curried;
};
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên implement curry với bugs
function badCurry(fn) {
  return function (args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    // Không trả về function mới!
  };
}

// ✅ Nên implement curry đúng
function goodCurry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}
```

---

## `pipe` và `compose`?

**`pipe`** và **`compose`** - Kết hợp nhiều functions thành một function theo thứ tự khác nhau.

### Mục đích / Purpose

**`pipe` và `compose`** được thiết kế để:

- Kết hợp functions
- Code reuse
- Functional programming
- Clean code

### Khi nào dùng / When to Use

`pipe` và `compose` nên dùng khi:

- Kết hợp functions
- Code reuse
- Functional programming
- Clean code

### Giúp ích gì / Benefits

**Lợi ích:**

- **Composition**: Kết hợp functions
- **Code reuse**: Reuse logic
- **Functional**: Functional programming
- **Clean**: Code gọn hơn

### Ưu nhược điểm / Pros & Cons

| Method    | Ưu điểm       | Nhược điểm                    |
| --------- | ------------- | ----------------------------- |
| `pipe`    | Left-to-right | Verbose hơn regular functions |
| `compose` | Right-to-left | Learning curve                |

### `pipe` - Left-to-right:

```javascript
// pipe - kết hợp functions theo thứ tự left-to-right
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((acc, fn) => fn(acc), x);

const addOne = (x) => x + 1;
const double = (x) => x * 2;
const square = (x) => x * x;

const pipeline = pipe(addOne, double, square);

const result = pipeline(3);
console.log(result); // 64 (addOne: 4, double: 8, square: 64)
```

### `compose` - Right-to-left:

```javascript
// compose - kết hợp functions theo thứ tự right-to-left
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((acc, fn) => fn(acc), x);

const addOne = (x) => x + 1;
const double = (x) => x * 2;
const square = (x) => x * x;

const pipeline = compose(square, double, addOne);

const result = pipeline(3);
console.log(result); // 64 (addOne: 4, double: 8, square: 64)
```

### So sánh:

```javascript
// pipe - left-to-right
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((acc, fn) => fn(acc), x);
const pipelinePipe = pipe(addOne, double, square);

// compose - right-to-left
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((acc, fn) => fn(acc), x);
const pipelineCompose = compose(square, double, addOne);

const resultPipe = pipelinePipe(3);
console.log(resultPipe); // 64

const resultCompose = pipelineCompose(3);
console.log(resultCompose); // 64
```

### Best Practices:

```javascript
// ✅ Dùng pipe cho:
// - Left-to-right execution
// - Functional programming
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((acc, fn) => fn(acc), x);
const pipeline = pipe(addOne, double, square);

// ✅ Dùng compose cho:
// - Right-to-left execution
// - Functional programming
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((acc, fn) => fn(acc), x);
const pipeline = compose(square, double, addOne);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng pipe/compose cho mọi cases
const result = pipe(f, g, h)(x);

// ✅ Nên dùng pipe/compose khi cần reuse
const pipeline = pipe(f, g, h);
const result = pipeline(x);
```
