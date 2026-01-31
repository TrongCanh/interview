# 26. Code Quality / Chất Lượng Code

## Tổng quan về Code Quality

### Mục đích của Code Quality / Purpose

**Code Quality** là việc viết code clean, maintainable, và dễ đọc để dễ bảo trì và mở rộng.

**Mục đích chính:**

- Tăng maintainability
- Giảm bugs
- Dễ đọc và hiểu
- Dễ test
- Dễ collaborate

### Khi nào nên quan tâm / When to Care

**Nên quan tâm code quality khi:**

- Làm việc trong team
- Làm việc với large codebase
- Long-term projects
- Open source projects
- Production code

### Giúp ích gì / Benefits

**Lợi ích:**

- **Maintainable**: Dễ bảo trì và mở rộng
- **Fewer bugs**: Ít bugs hơn
- **Readable**: Dễ đọc và hiểu
- **Testable**: Dễ viết tests
- **Collaborative**: Dễ làm việc trong team

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm       | Giải thích             |
| ------------- | ---------------------- |
| Maintainable  | Dễ bảo trì và mở rộng  |
| Fewer bugs    | Ít bugs hơn            |
| Readable      | Dễ đọc và hiểu         |
| Testable      | Dễ viết tests          |
| Collaborative | Dễ làm việc trong team |

**Nhược điểm (Cons):**

| Nhược điểm     | Giải thích             |
| -------------- | ---------------------- |
| Initial effort | Tốn thời gian ban đầu  |
| Learning curve | Cần học best practices |
| Tooling setup  | Cần setup tools        |

---

## Strict mode (`'use strict'`)?

**Strict mode** là một feature của JavaScript giúp viết code an toàn hơn bằng cách enable stricter parsing và error handling.

### Mục đích / Purpose

- Catch common coding mistakes
- Enable optimizations
- Disable unsafe features
- Make code more predictable

### Khi nào dùng / When to Use

- Luôn nên dùng strict mode cho new code
- Dùng cho modules (tự động enabled)
- Dùng cho scripts

### Ví dụ:

```javascript
// Enable strict mode
"use strict";

// 1. Prevent accidental globals
// Without strict mode
function test() {
  x = 10; // Creates global variable
}

// With strict mode
("use strict");
function test() {
  x = 10; // ReferenceError: x is not defined
}

// 2. Silent errors become errors
// Without strict mode
const obj = {};
Object.defineProperty(obj, "x", { value: 42, writable: false });
obj.x = 9; // Silent failure

// With strict mode
("use strict");
obj.x = 9; // TypeError: Cannot assign to read only property

// 3. Duplicate parameter names
// Without strict mode
function sum(a, a, c) {
  return a + a + c;
}

// With strict mode
("use strict");
function sum(a, a, c) {
  // SyntaxError: Duplicate parameter name
  return a + a + c;
}

// 4. Reserved words
// With strict mode
("use strict");
const private = 10; // SyntaxError: Unexpected strict mode reserved word

// 5. this is undefined in functions
// Without strict mode
function test() {
  console.log(this); // window (or global)
}

// With strict mode
("use strict");
function test() {
  console.log(this); // undefined
}

// 6. eval creates its own scope
("use strict");
eval("var x = 10");
console.log(x); // ReferenceError: x is not defined
```

### Best Practices:

```javascript
// ✅ Luôn dùng 'use strict' ở đầu file
"use strict";

// ✅ Modules tự động có strict mode
// Không cần 'use strict' trong ES modules

// ✅ Dùng strict mode để catch errors sớm
"use strict";
function test() {
  x = 10; // ReferenceError ngay lập tức
}

// ❌ Tránh không dùng strict mode
// Code có thể có silent errors
```

---

## Linting với ESLint?

**ESLint** là một tool để lint JavaScript code, giúp phát hiện errors và enforce code style.

### Mục đích / Purpose

- Catch errors và potential bugs
- Enforce code style
- Improve code quality
- Consistent code across team

### Khi nào dùng / When to Use

- Luôn nên dùng ESLint cho JavaScript projects
- Khi làm việc trong team
- Khi muốn enforce code style

### Ví dụ:

```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "warn",
    "no-console": "warn",
    "prefer-const": "error",
    "no-var": "error",
  },
};

// ESLint catches errors
// Bad: unused variable
const x = 10;
// ESLint: 'x' is assigned a value but never used

// Bad: var instead of const/let
var y = 10;
// ESLint: Unexpected var, use let or const instead

// Bad: console.log in production
console.log("Debug");
// ESLint: Unexpected console statement

// Good: const instead of var
const z = 10;

// Good: use variable
const a = 10;
console.log(a);
```

### Best Practices:

```javascript
// ✅ Dùng ESLint cho tất cả projects
// npm install --save-dev eslint

// ✅ Cấu hình ESLint với extends
extends: ['eslint:recommended', 'plugin:react/recommended']

// ✅ Dùng Prettier với ESLint
extends: ['plugin:prettier/recommended']

// ✅ Tự động fix ESLint errors
// eslint --fix

// ✅ Integrate với editor (VSCode)
// Cài đặt ESLint extension

// ❌ Tránh tắt ESLint rules không cần thiết
// eslint-disable-next-line
const x = 10; // Bad practice
```

---

## Formatting với Prettier?

**Prettier** là một code formatter để format code tự động theo style rules.

### Mục đích / Purpose

- Consistent code style
- Tự động format code
- Giảm debates về style
- Save time

### Khi nào dùng / When to Use

- Luôn nên dùng Prettier cho JavaScript projects
- Khi làm việc trong team
- Khi muốn consistent code style

### Ví dụ:

```javascript
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}

// Before Prettier
const obj={name:"John",age:30}
function sum(a,b){return a+b}

// After Prettier
const obj = { name: 'John', age: 30 };
function sum(a, b) {
  return a + b;
}

// Prettier format code tự động
// npm install --save-dev prettier
// npx prettier --write "src/**/*.js"

// Format on save trong VSCode
// Settings: "editor.formatOnSave": true
```

### Best Practices:

```javascript
// ✅ Dùng Prettier cho tất cả projects
// npm install --save-dev prettier

// ✅ Cấu hình Prettier với .prettierrc
{
  "semi": true,
  "singleQuote": true
}

// ✅ Dùng Prettier với ESLint
// npm install --save-dev eslint-config-prettier

// ✅ Format on save
// "editor.formatOnSave": true

// ✅ Dùng .prettierignore cho files không cần format
// node_modules/
// dist/
```

---

## Code conventions?

**Code conventions** là một set of rules và guidelines để viết code consistent.

### Mục đích / Purpose

- Consistent code style
- Dễ đọc và hiểu
- Dễ collaborate
- Giảm debates về style

### Khi nào dùng / When to Use

- Khi làm việc trong team
- Khi có large codebase
- Khi muốn consistent code

### Ví dụ:

```javascript
// Naming conventions
// Variables: camelCase
const userName = "John";
const isLoggedIn = true;

// Constants: UPPER_SNAKE_CASE
const API_URL = "https://api.example.com";
const MAX_RETRIES = 3;

// Classes: PascalCase
class UserService {}
class HttpClient {}

// Functions: camelCase
function getUser() {}
function calculateTotal() {}

// Private members: underscore prefix
class UserService {
  _apiUrl = "https://api.example.com";

  _fetchUser(id) {
    // ...
  }
}

// File naming
// kebab-case cho files
// user-service.js
// http-client.js

// PascalCase cho React components
// UserService.js
// HttpClient.js

// Code organization
// Imports ở đầu file
import React from "react";
import { useState } from "react";
import UserService from "./services/UserService";

// Constants sau imports
const API_URL = "https://api.example.com";

// Components/Functions
function App() {
  // ...
}

// Exports ở cuối file
export default App;
```

### Best Practices:

```javascript
// ✅ Dùng camelCase cho variables và functions
const userName = "John";
function getUser() {}

// ✅ Dùng PascalCase cho classes và components
class UserService {}
function UserList() {}

// ✅ Dùng UPPER_SNAKE_CASE cho constants
const API_URL = "https://api.example.com";

// ✅ Dùng underscore prefix cho private members
class UserService {
  _apiUrl = "https://api.example.com";
}

// ✅ Dùng kebab-case cho file names
// user-service.js

// ✅ Tổ chức code theo thứ tự: imports -> constants -> functions -> exports
```

---

## Naming conventions?

**Naming conventions** là rules về cách đặt tên cho variables, functions, classes, etc.

### Mục đích / Purpose

- Code dễ đọc hơn
- Self-documenting code
- Consistent naming
- Dễ hiểu ý định

### Khi nào dùng / When to Use

- Luôn nên follow naming conventions
- Khi viết new code
- Khi review code

### Ví dụ:

```javascript
// Variables: camelCase, descriptive
const userName = "John"; // Good
const x = 10; // Bad - không descriptive

const isLoggedIn = true; // Good - boolean starts with is/has/should
const userActive = true; // Good
const flag = true; // Bad - không descriptive

// Constants: UPPER_SNAKE_CASE
const API_URL = "https://api.example.com"; // Good
const apiUrl = "https://api.example.com"; // Bad - không rõ là constant

const MAX_RETRIES = 3; // Good
const maxRetries = 3; // Bad

// Functions: camelCase, verb-first
function getUser(id) {} // Good
function user(id) {} // Bad - không rõ là action

function calculateTotal(price, tax) {} // Good
function total(price, tax) {} // Bad

function hasPermission(user, permission) {} // Good - boolean return
function permission(user, permission) {} // Bad

// Classes: PascalCase, noun
class UserService {} // Good
class userService {} // Bad

class HttpClient {} // Good
class client {} // Bad

// Boolean variables: is/has/should prefix
const isLoggedIn = true; // Good
const active = true; // Bad - không rõ

const hasPermission = true; // Good
const permission = true; // Bad

const shouldUpdate = true; // Good
const update = true; // Bad

// Array: plural
const users = []; // Good
const user = []; // Bad - không rõ là array

// Function returning array: plural
function getUsers() {} // Good
function getUser() {} // Bad - trả về nhiều users

// Private members: underscore prefix
class UserService {
  _apiUrl = "https://api.example.com"; // Good - private
  apiUrl = "https://api.example.com"; // Bad - không rõ là private

  _fetchUser(id) {} // Good - private
  fetchUser(id) {} // Bad - không rõ là private
}

// Event handlers: handle prefix
function handleClick() {} // Good
function click() {} // Bad

function handleSubmit() {} // Good
function submit() {} // Bad
```

### Best Practices:

```javascript
// ✅ Dùng camelCase cho variables và functions
const userName = "John";
function getUser() {}

// ✅ Dùng PascalCase cho classes
class UserService {}

// ✅ Dùng UPPER_SNAKE_CASE cho constants
const API_URL = "https://api.example.com";

// ✅ Dùng is/has/should prefix cho booleans
const isLoggedIn = true;
const hasPermission = true;
const shouldUpdate = true;

// ✅ Dùng plural cho arrays
const users = [];

// ✅ Dùng handle prefix cho event handlers
function handleClick() {}

// ✅ Dùng underscore prefix cho private members
class UserService {
  _apiUrl = "https://api.example.com";
}

// ❌ Tránh single-letter names (trừ loop variables)
const x = 10; // Bad
const userName = "John"; // Good

// ❌ Tránh abbreviations (trừ common ones)
const usrNm = "John"; // Bad
const userName = "John"; // Good

// ❌ Tránh magic numbers
const size = 100; // Bad
const MAX_SIZE = 100; // Good
```

---

## Comments và documentation?

**Comments và documentation** là việc thêm explanations vào code để dễ hiểu hơn.

### Mục đích / Purpose

- Giải thích code phức tạp
- Document API
- Giúp người khác hiểu code
- Self-documenting code

### Khi nào dùng / When to Use

- Khi code phức tạp
- Khi document API
- Khi giải thích "why" không phải "what"
- Khi có business logic phức tạp

### Ví dụ:

```javascript
// Bad: comment giải thích những gì đã rõ ràng
// Set user name
userName = "John";

// Good: code tự giải thích
const userName = "John";

// Good: comment giải thích "why" không phải "what"
// Use setTimeout to allow UI to update before heavy computation
setTimeout(() => {
  heavyComputation();
}, 0);

// Good: JSDoc cho function documentation
/**
 * Fetches a user by ID from the API
 * @param {number} id - The user ID
 * @returns {Promise<User>} The user object
 * @throws {Error} If the API request fails
 */
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
}

// Good: comment cho complex algorithm
// Using the Sieve of Eratosthenes algorithm to find all primes up to n
function findPrimes(n) {
  const primes = [];
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) {
      primes.push(i);
    }
  }

  return primes;
}

// Good: TODO comment cho future work
// TODO: Add error handling for invalid inputs
function process(data) {
  return data.map((item) => item * 2);
}

// Good: FIXME comment cho known issues
// FIXME: This function has a race condition when called concurrently
async function updateData(id) {
  const data = await fetchData(id);
  await saveData(id, data);
}
```

### Best Practices:

```javascript
// ✅ Dùng JSDoc cho function documentation
/**
 * Fetches a user by ID
 * @param {number} id - The user ID
 * @returns {Promise<User>}
 */
async function fetchUser(id) {}

// ✅ Comment giải thích "why" không phải "what"
// Use setTimeout to allow UI to update
setTimeout(() => {}, 0);

// ✅ Comment cho complex algorithms
// Using the Sieve of Eratosthenes algorithm
function findPrimes(n) {}

// ✅ Dùng TODO/FIXME cho future work
// TODO: Add error handling
// FIXME: Fix race condition

// ❌ Tránh comment những gì đã rõ ràng
// Set user name
const userName = "John";

// ❌ Tránh comment out code (dùng git)
// const oldCode = function() {};

// ✅ Code nên tự giải thích (self-documenting)
const userName = "John"; // Good - không cần comment
```

---

## Code smell?

**Code smell** là indicators của potential problems trong code, không phải bugs nhưng có thể dẫn đến problems.

### Mục đích / Purpose

- Identify potential problems
- Improve code quality
- Refactor code
- Prevent technical debt

### Khi nào dùng / When to Use

- Khi review code
- Khi refactor
- Khi maintain legacy code

### Ví dụ:

```javascript
// 1. Long function
// Bad
function processUserData(data) {
  // 100+ lines of code
}

// Good - split thành smaller functions
function processUserData(data) {
  const validated = validateData(data);
  const transformed = transformData(validated);
  const saved = saveData(transformed);
  return saved;
}

// 2. Duplicate code
// Bad
function calculateDiscount(price) {
  if (price > 100) {
    return price * 0.1;
  }
  return 0;
}

function calculateTax(price) {
  if (price > 100) {
    return price * 0.1;
  }
  return 0;
}

// Good - extract common logic
function applyThreshold(price, rate) {
  return price > 100 ? price * rate : 0;
}

function calculateDiscount(price) {
  return applyThreshold(price, 0.1);
}

// 3. Magic numbers
// Bad
function calculatePrice(quantity) {
  return quantity * 100 + 10;
}

// Good - dùng constants
const PRICE_PER_UNIT = 100;
const SHIPPING_COST = 10;

function calculatePrice(quantity) {
  return quantity * PRICE_PER_UNIT + SHIPPING_COST;
}

// 4. Large class
// Bad - class với quá nhiều methods
class UserService {
  // 50+ methods
}

// Good - split thành smaller classes
class UserService {
  // Core user operations
}

class UserValidator {
  // Validation logic
}

class UserSerializer {
  // Serialization logic
}

// 5. God object
// Bad - object làm quá nhiều việc
class App {
  handleUser() {}
  handleOrder() {}
  handlePayment() {}
  handleShipping() {}
  // ...
}

// Good - separate concerns
class UserService {}
class OrderService {}
class PaymentService {}
class ShippingService {}

// 6. Feature envy
// Bad - method sử dụng nhiều data từ object khác
class Order {
  calculateTotal(user) {
    return user.cart.items.reduce((sum, item) => sum + item.price, 0);
  }
}

// Good - move method đến nơi data thuộc về
class Order {
  calculateTotal() {
    return this.cart.items.reduce((sum, item) => sum + item.price, 0);
  }
}

// 7. Long parameter list
// Bad
function createUser(name, email, age, address, phone, country) {}

// Good - dùng object parameter
function createUser({ name, email, age, address, phone, country }) {}

// 8. Dead code
// Bad - code không được dùng
function oldFunction() {
  // This is never called
}

// Good - remove dead code
```

### Best Practices:

```javascript
// ✅ Split long functions thành smaller functions
function processUserData(data) {
  const validated = validateData(data);
  const transformed = transformData(validated);
  return saveData(transformed);
}

// ✅ Extract duplicate code thành reusable functions
function applyThreshold(price, rate) {
  return price > 100 ? price * rate : 0;
}

// ✅ Dùng constants thay vì magic numbers
const PRICE_PER_UNIT = 100;

// ✅ Split large classes thành smaller classes
class UserService {}
class UserValidator {}

// ✅ Dùng object parameter thay vì long parameter list
function createUser({ name, email }) {}

// ✅ Remove dead code
// Code không được dùng nên được xóa
```

---

## Use Cases & Patterns

### Common Code Quality Patterns:

```javascript
// 1. Single Responsibility Principle
class UserService {
  async getUser(id) {
    return await this.userRepository.findById(id);
  }
}

class UserValidator {
  validate(user) {
    if (!user.email) {
      throw new Error("Email is required");
    }
  }
}

// 2. DRY (Don't Repeat Yourself)
function formatDate(date) {
  return date.toLocaleDateString("en-US");
}

function formatDateTime(date) {
  return date.toLocaleString("en-US");
}

// 3. KISS (Keep It Simple, Stupid)
function sum(a, b) {
  return a + b;
}

// 4. YAGNI (You Aren't Gonna Need It)
// Bad - viết code cho feature không cần
function getUserWithCache(id) {
  // Cache logic not needed yet
}

// Good - chỉ viết code cần thiết
function getUser(id) {
  return fetchUser(id);
}

// 5. Early return
function processUser(user) {
  if (!user) {
    return null;
  }

  if (!user.email) {
    return null;
  }

  // Process user...
  return processedUser;
}

// 6. Guard clauses
function calculateDiscount(user, price) {
  if (!user) {
    return 0;
  }

  if (!user.isPremium) {
    return 0;
  }

  return price * 0.1;
}

// 7. Composition over inheritance
const withAuth = (Component) => {
  return (props) => {
    if (!isAuthenticated()) {
      return <Login />;
    }
    return <Component {...props} />;
  };
};

const ProtectedPage = withAuth(Dashboard);

// 8. Pure functions
function add(a, b) {
  return a + b;
}

// Bad - impure
let count = 0;
function increment() {
  count++;
  return count;
}

// Good - pure
function increment(count) {
  return count + 1;
}
```

---

## Anti-patterns cần tránh

```javascript
// ❌ Magic numbers
function calculatePrice(quantity) {
  return quantity * 100 + 10;
}

// ✅ Dùng constants
const PRICE_PER_UNIT = 100;
const SHIPPING_COST = 10;

// ❌ Long functions
function process(data) {
  // 100+ lines
}

// ✅ Split thành smaller functions
function process(data) {
  const validated = validate(data);
  return save(validated);
}

// ❌ Duplicate code
function discount(price) {
  return price > 100 ? price * 0.1 : 0;
}

function tax(price) {
  return price > 100 ? price * 0.1 : 0;
}

// ✅ Extract common logic
function applyThreshold(price, rate) {
  return price > 100 ? price * rate : 0;
}

// ❌ Comment out code
// const oldFunction = function() {};

// ✅ Dùng git để track history

// ❌ Dead code
function unusedFunction() {}

// ✅ Remove dead code
```

---

_References: [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882), [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)_
