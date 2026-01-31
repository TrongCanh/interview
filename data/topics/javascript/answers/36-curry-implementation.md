# 36. Implement `curry` / Triển Khai Curry

## Tổng quan về Curry

### Mục đích của Curry / Purpose

**Curry** là kỹ thuật transform function nhận nhiều arguments thành chuỗi của functions nhận một argument mỗi function.

**Mục đích chính:**

- Tạo reusable functions
- Function composition
- Partial application
- Functional programming

### Khi nào nên dùng / When to Use

- Khi muốn create reusable functions
- Khi làm functional programming
- Khi muốn partial application
- Khi muốn function composition

### Giúp ích gì / Benefits

**Lợi ích:**

- **Reusable**: Tạo reusable functions
- **Partial**: Partial application
- **Composition**: Dễ compose functions
- **Functional**: Functional programming style

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm     | Giải thích                   |
| ----------- | ---------------------------- |
| Reusable    | Tạo reusable functions       |
| Partial     | Partial application          |
| Composition | Dễ compose functions         |
| Functional  | Functional programming style |

**Nhược điểm (Cons):**

| Nhược điểm     | Giải thích           |
| -------------- | -------------------- |
| Complexity     | Code phức tạp hơn    |
| Performance    | Có thể chậm hơn      |
| Learning curve | Cần thời gian để học |
| Debugging      | Khó debug hơn        |

---

## Implement `curry`?

**Implement `curry`** là viết function để curry functions.

### Mục đích / Purpose

- Tạo curry function
- Transform functions thành curried functions
- Enable partial application

### Khi nào dùng / When to Use

- Khi cần curry functions
- Khi muốn partial application
- Khi làm functional programming

### Ví dụ:

```javascript
// Method 1: Basic curry implementation
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}

// Usage
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6

// Partial application
const add1 = curriedAdd(1);
const add1and2 = add1(2);
console.log(add1and2(3)); // 6

// Method 2: Curry với placeholder
function curry(fn, placeholder = Symbol()) {
  return function curried(...args) {
    const filledArgs = args.map((arg) =>
      arg === placeholder ? undefined : arg,
    );
    const argCount = filledArgs.filter((arg) => arg !== undefined).length;

    if (argCount >= fn.length) {
      return fn.apply(this, filledArgs);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}

// Usage
const _ = Symbol();
const curriedAdd = curry(add, _);

console.log(curriedAdd(_, 2, 3)(1)); // 6 (fill placeholder later)

// Method 3: Curry cho async functions
function curryAsync(fn) {
  return async function curried(...args) {
    if (args.length >= fn.length) {
      return await fn.apply(this, args);
    }
    return async (...moreArgs) => await curried(...args, ...moreArgs);
  };
}

// Usage
async function add(a, b) {
  return a + b;
}

const curriedAdd = curryAsync(add);
console.log(await curriedAdd(1)(2)); // 3

// Method 4: Curry với validation
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    if (args.some((arg) => arg === undefined)) {
      throw new Error("Missing arguments");
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}

// Method 5: Arrow function curry
const curry = (fn) => {
  const curried = (...args) =>
    args.length >= fn.length
      ? fn(...args)
      : (...moreArgs) => curried(...args, ...moreArgs);
  return curried;
};
```

### Best Practices:

```javascript
// ✅ Dùng curry cho reusable functions
const curriedAdd = curry((a, b) => a + b);
const add5 = curriedAdd(5);
console.log(add5(10)); // 15

// ✅ Dùng curry cho partial application
const curriedFetch = curry((url, method) => fetch(url, { method }));
const get = curriedFetch("GET");
const post = curriedFetch("POST");

// ✅ Dùng curry cho function composition
const curriedMap = curry((fn, arr) => arr.map(fn));
const curriedFilter = curry((fn, arr) => arr.filter(fn));

// ❌ Tránh curry cho functions có side effects
// Curry chỉ nên dùng cho pure functions

// ❌ Tránh quá nhiều levels của currying
const deeplyCurried = curry((a) => (b) => (c) => (d) => a + b + c + d);
// Khó đọc và debug
```

---

## Test Cases

```javascript
// Test 1: Basic currying
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6

// Test 2: Partial application
const curriedAdd = curry((a, b) => a + b);
const add5 = curriedAdd(5);
console.log(add5(10)); // 15

// Test 3: Curry với different argument counts
function sum(a, b, c, d) {
  return a + b + c + d;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)(4)); // 10

// Test 4: Curry với function composition
const curriedMap = curry((fn, arr) => arr.map(fn));
const curriedFilter = curry((fn, arr) => arr.filter(fn));

const numbers = [1, 2, 3, 4, 5];
const doubled = curriedMap((x) => x * 2)(numbers);
const evens = curriedFilter((x) => x % 2 === 0)(numbers);

console.log(doubled); // [2, 4, 6, 8, 10]
console.log(evens); // [2, 4]

// Test 5: Curry với placeholder
const _ = Symbol();
const curriedAdd = curry((a, b, c) => a + b + c, _);

console.log(curriedAdd(_, 2, 3)(1)); // 6
```

---

## Complete Implementation

```javascript
/**
 * Curry function
 * @param {Function} fn - Function to curry
 * @returns {Function} Curried function
 */
function curry(fn) {
  return function curried(...args) {
    // Nếu đã có đủ arguments, execute function
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    // Nếu chưa đủ, trả về function nhận thêm arguments
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}

/**
 * Curry function với placeholder
 * @param {Function} fn - Function to curry
 * @param {*} [placeholder] - Placeholder symbol
 * @returns {Function} Curried function
 */
function curryWithPlaceholder(fn, placeholder = Symbol()) {
  return function curried(...args) {
    const filledArgs = args.map((arg) =>
      arg === placeholder ? undefined : arg,
    );
    const argCount = filledArgs.filter((arg) => arg !== undefined).length;

    if (argCount >= fn.length) {
      return fn.apply(this, filledArgs);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}

// Usage examples

// Example 1: Basic currying
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6

// Example 2: Partial application
const curriedFetch = curry((url, method, body) => {
  return fetch(url, { method, body });
});

const apiGet = curriedFetch("/api/data");
const apiPost = curriedFetch("/api/data", "POST");

apiGet("GET", null); // GET /api/data
apiPost(null, JSON.stringify({ data: "test" })); // POST /api/data

// Example 3: Function composition
const curriedMap = curry((fn, arr) => arr.map(fn));
const curriedFilter = curry((fn, arr) => arr.filter(fn));

const numbers = [1, 2, 3, 4, 5];
const doubled = curriedMap((x) => x * 2)(numbers);
const evens = curriedFilter((x) => x % 2 === 0)(numbers);

// Example 4: Placeholder usage
const _ = Symbol();
const curriedAdd = curryWithPlaceholder((a, b, c) => a + b + c, _);

console.log(curriedAdd(_, 2, 3)(1)); // 6
console.log(curriedAdd(1, _, 3)(2)); // 6
console.log(curriedAdd(1, 2, _)(3)); // 6

// Example 5: Real-world use case
const curriedFetch = curry((url, method, headers, body) => {
  return fetch(url, { method, headers, body });
});

const apiGet = curriedFetch("/api/users");
const apiPost = curriedFetch("/api/users", "POST");
const apiPostWithAuth = curriedFetch("/api/users", "POST", {
  Authorization: "Bearer token",
});

apiGet("GET", null, null);
apiPost("POST", null, JSON.stringify({ name: "John" }));
apiPostWithAuth("POST", null, JSON.stringify({ name: "Jane" }));
```

---

## Use Cases

```javascript
// 1. Partial application cho API calls
const curriedFetch = curry((url, method, body) => {
  return fetch(url, { method, body });
});

const getUser = curriedFetch("/api/users", "GET");
const createUser = curriedFetch("/api/users", "POST");

getUser(null, null);
createUser(null, JSON.stringify({ name: "John" }));

// 2. Function composition
const curriedMap = curry((fn, arr) => arr.map(fn));
const curriedFilter = curry((fn, arr) => arr.filter(fn));
const curriedReduce = curry((fn, initial, arr) => arr.reduce(fn, initial));

const numbers = [1, 2, 3, 4, 5];
const doubled = curriedMap((x) => x * 2)(numbers);
const evens = curriedFilter((x) => x % 2 === 0)(numbers);
const sum = curriedReduce((acc, x) => acc + x, 0)(numbers);

// 3. Validation functions
const curriedValidate = curry((rules, value) => {
  return rules.every((rule) => rule(value));
});

const validateEmail = curriedValidate([
  (v) => v.includes("@"),
  (v) => v.includes("."),
]);

console.log(validateEmail("test@example.com")); // true
console.log(validateEmail("invalid")); // false

// 4. Data transformation
const curriedTransform = curry((transform, data) => {
  return data.map(transform);
});

const transformUsers = curriedTransform((user) => ({
  ...user,
  fullName: `${user.firstName} ${user.lastName}`,
}));

const users = [
  { firstName: "John", lastName: "Doe" },
  { firstName: "Jane", lastName: "Smith" },
];

console.log(transformUsers(users));

// 5. Configuration functions
const curriedConfig = curry((defaults, overrides) => ({
  ...defaults,
  ...overrides,
}));

const defaultConfig = { debug: false, port: 3000 };
const devConfig = curriedConfig(defaultConfig)({ debug: true });
const prodConfig = curriedConfig(defaultConfig)({ port: 8080 });
```

---

## Anti-patterns cần tránh

```javascript
// ❌ Curry functions với side effects
let counter = 0;
const curriedIncrement = curry(() => {
  counter++;
  return counter;
});

console.log(curriedIncrement()()); // 1
console.log(curriedIncrement()()); // 2
console.log(curriedIncrement()()); // 3

// ✅ Dùng curry cho pure functions
const curriedAdd = curry((a, b) => a + b);

// ❌ Quá nhiều levels của currying
const deeplyCurried = curry(
  (a) => (b) => (c) => (d) => (e) => a + b + c + d + e,
);
// Khó đọc và debug

// ✅ Dùng reasonable levels của currying
const curriedAdd = curry((a, b) => a + b);

// ❌ Không handle missing arguments
const curriedAdd = curry((a, b) => a + b);
console.log(curriedAdd(1)); // Returns function, not result

// ✅ Dùng validation hoặc default values
const curriedAdd = curry((a, b = 0) => a + b);
console.log(curriedAdd(1)); // 1
```

---

_References: [Currying Pattern](https://www.patternsjs.dev/patterns/currying-pattern), [Functional Programming](https://www.patternsjs.dev/patterns/functional-programming-patterns)_
