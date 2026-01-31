# JavaScript Interview Questions / Câu hỏi Phỏng vấn JavaScript

> Danh sách câu hỏi phỏng vấn về JavaScript / List of JavaScript interview questions

---

## 📚 Cơ bản / Basics

### 1. Data Types / Kiểu dữ liệu

- JavaScript có bao nhiêu kiểu dữ liệu?
- Primitive types là gì? Có những loại nào?
- Reference types là gì? Có những loại nào?
- Sự khác biệt giữa `null` và `undefined` là gì?
- `Symbol` là gì? Khi nào dùng?
- `BigInt` là gì? Khi nào dùng?
- Kiểm tra type trong JS: `typeof`, `instanceof`, `Object.prototype.toString`?
- `NaN` là gì? Tại sao `typeof NaN === 'number'`?
- Sự khác biệt giữa `== null` và `=== null`?

### 2. Variables & Hoisting

- Sự khác biệt giữa `var`, `let`, và `const` là gì?
- Scope của `var`, `let`, `const`?
- Temporal Dead Zone (TDZ) là gì?
- `var` có vấn đề gì với hoisting?
- Block scope vs Function scope?
- Global scope pollution với `var`?
- Redeclaration và reassignment?
- Khi nào nên dùng `let` và khi nào nên dùng `const`?

### 3. Equality & Type Coercion

- Sự khác biệt giữa `==` và `===`?
- Type coercion là gì?
- Abstract Equality Comparison Algorithm?
- Kết quả của: `[] == ![]`?
- Kết quả của: `null == undefined`?
- Kết quả của: `'0' == 0`?
- Kết quả của: `[] == 0`?
- Kết quả của: `'' == false`?
- Tránh type coercion như thế nào?

---

## 🔥 Functions & Closures / Hàm & Closures

### 4. Function Declarations & Expressions

- Function declaration vs Function expression?
- Named function expressions?
- Anonymous functions?
- IIFE (Immediately Invoked Function Expression)?
- Arrow functions là gì?
- Sự khác biệt giữa arrow function và regular function?

### 5. Closures

- Closure là gì? Giải thích với ví dụ.
- Use cases của closures?
- Memory leak liên quan đến closures?
- Closure trong loops?
- Module pattern với closures?
- Private variables với closures?

### 6. `this` Keyword

- `this` trong JavaScript hoạt động như thế nào?
- `this` trong different contexts (global, function, method, constructor, arrow)?
- `call()`, `apply()`, `bind()` khác nhau như thế nào?
- Arrow function và `this`?
- Explicit binding vs Implicit binding?
- `new` binding?
- Default binding?

### 7. Higher-Order Functions

- Higher-order function là gì?
- Ví dụ về `map`, `filter`, `reduce`
- Implement `map` từ scratch?
- Implement `filter` từ scratch?
- Implement `reduce` từ scratch?
- `forEach` vs `map`?
- `find`, `findIndex`, `some`, `every`?
- Chaining array methods?

---

## 🔄 Async JavaScript

### 8. Callbacks

- Callback là gì?
- Callback hell là gì?
- Inversion of Control?
- Error-first callback pattern?
- Sync vs Async callbacks?

### 9. Promises

- Promise là gì? Các trạng thái của Promise?
- Promise states: Pending, Fulfilled, Rejected?
- `Promise.all()` vs `Promise.race()` vs `Promise.allSettled()`?
- `Promise.any()`?
- Chain promises và error handling?
- `then()`, `catch()`, `finally()`?
- Error propagation trong promises?
- Creating promises: `Promise.resolve()`, `Promise.reject()`?
- Promise constructor?

### 10. Async/Await

- Async/await hoạt động như thế nào?
- Error handling với try/catch?
- Parallel vs sequential execution?
- `await` với non-promise values?
- Top-level await?
- Async function luôn trả về Promise?
- `for await...of`?

### 11. Event Loop

- Event Loop là gì?
- Call stack là gì?
- Callback queue (Task queue) là gì?
- Microtask queue vs Macrotask queue?
- Thứ tự thực thi: Microtasks vs Macrotasks?
- `setTimeout`, `setImmediate`, `process.nextTick` (Node.js)?
- `requestAnimationFrame`?
- `requestIdleCallback`?
- Zero-delay `setTimeout(fn, 0)`?

---

## 🎯 OOP trong JavaScript

### 12. Prototypes

- Prototype chain là gì?
- `__proto__` vs `prototype`?
- `Object.create()`, `Object.getPrototypeOf()`?
- `hasOwnProperty` vs `in` operator?
- `Object.keys()`, `Object.values()`, `Object.entries()`?
- `Object.assign()`?
- `Object.freeze()`, `Object.seal()`?
- Prototype inheritance?

### 13. Classes (ES6+)

- Class trong JS thực chất là gì?
- Constructor method?
- Static methods và properties?
- Private fields (`#`)?
- Getters và Setters?
- Class fields?
- `extends` keyword?
- `super` keyword?

### 14. Inheritance

- Prototype-based inheritance?
- Class inheritance với `extends`?
- Mixin pattern?
- Object composition vs Inheritance?
- `Object.create()` cho inheritance?
- Parasitic inheritance?

---

## 🛠️ Advanced Concepts

### 15. Currying

- Currying là gì?
- Implement một hàm curried?
- Partial application vs currying?
- Use cases của currying?
- Arrow function currying?

### 16. Memoization

- Memoization là gì?
- Implement memoization function?
- Trade-offs?
- Memoization với closures?
- Memoization với objects?

### 17. Debounce & Throttle

- Sự khác biệt giữa debounce và throttle?
- Implement debounce?
- Implement throttle?
- Use cases?
- Leading vs Trailing edge?
- `requestAnimationFrame` throttle?

### 18. Recursion

- Recursion là gì?
- Base case vs Recursive case?
- Call stack trong recursion?
- Tail recursion?
- Stack overflow?
- Memoization trong recursion?

---

## 📦 ES6+ Features

### 19. Destructuring

- Array destructuring?
- Object destructuring?
- Nested destructuring?
- Default values trong destructuring?
- Rest operator trong destructuring?
- Renaming trong destructuring?
- Destructuring function parameters?

### 20. Spread & Rest Operators

- Sự khác biệt giữa spread (`...`) và rest (`...`)?
- Spread với arrays?
- Spread với objects?
- Rest parameters?
- Use cases?

### 21. Modules

- ES Modules vs CommonJS?
- `import`, `export`?
- Default exports vs named exports?
- Re-exports?
- Dynamic imports (`import()`)?
- Module namespace?
- `import.meta`?

### 22. Template Literals

- Template literals là gì?
- String interpolation?
- Tagged template literals?
- Multi-line strings?
- Raw strings?

### 23. Enhanced Object Literals

- Computed property names?
- Method shorthand?
- Property shorthand?
- Destructuring trong object literals?

---

## 🐛 Debugging & Best Practices

### 24. Error Handling

- `try/catch/finally`?
- Custom Error classes?
- Global error handlers?
- `throw` statement?
- `Error` object?
- Error propagation?
- Synchronous vs Asynchronous errors?
- Unhandled promise rejections?

### 25. Performance

- V8 engine optimization?
- Hidden classes?
- Inline caching?
- Memory management?
- Garbage collection?
- Common performance pitfalls?
- DOM manipulation performance?
- Event delegation?
- Lazy loading?

### 26. Code Quality

- Strict mode (`'use strict'`)?
- Linting với ESLint?
- Formatting với Prettier?
- Code conventions?
- Naming conventions?
- Comments và documentation?
- Code smell?

---

## 🌐 DOM & Browser APIs

### 27. DOM Manipulation

- DOM tree là gì?
- Selecting elements: `querySelector`, `getElementById`, etc.?
- Creating elements: `createElement`, `createTextNode`?
- Modifying elements: `innerHTML`, `textContent`, `setAttribute`?
- Adding/removing elements?
- Event listeners?
- Event bubbling vs Capturing?
- Event delegation?

### 28. Storage APIs

- `localStorage` vs `sessionStorage`?
- Cookies?
- IndexedDB?
- Cache API?
- Service Workers?
- Storage limits?

### 29. Browser APIs

- Fetch API?
- XMLHttpRequest (XHR)?
- WebSocket?
- Geolocation API?
- Web Workers?
- WebSockets?
- BroadcastChannel?

---

## 🔒 Security

### 30. Security Best Practices

- XSS (Cross-Site Scripting)?
- CSRF (Cross-Site Request Forgery)?
- Content Security Policy (CSP)?
- Same-Origin Policy?
- CORS (Cross-Origin Resource Sharing)?
- Secure cookies?
- Input sanitization?
- Output encoding?

---

## 📝 Coding Challenges / Thử thách Coding

### 31. Implement `deepClone`

```javascript
function deepClone(obj) {
  // TODO: Implement deep clone
}
```

### 32. Implement `debounce`

```javascript
function debounce(func, delay) {
  // TODO: Implement debounce
}
```

### 33. Implement `throttle`

```javascript
function throttle(func, limit) {
  // TODO: Implement throttle
}
```

### 34. Implement `Promise.all`

```javascript
function promiseAll(promises) {
  // TODO: Implement Promise.all
}
```

### 35. Implement `memoize`

```javascript
function memoize(func) {
  // TODO: Implement memoization
}
```

### 36. Implement `curry`

```javascript
function curry(fn) {
  // TODO: Implement currying
}
```

### 37. Implement `bind`

```javascript
Function.prototype.myBind = function (context, ...args) {
  // TODO: Implement bind
};
```

### 38. Implement `call`

```javascript
Function.prototype.myCall = function (context, ...args) {
  // TODO: Implement call
};
```

### 39. Implement `apply`

```javascript
Function.prototype.myApply = function (context, args) {
  // TODO: Implement apply
};
```

### 40. Implement `new` operator

```javascript
function myNew(Constructor, ...args) {
  // TODO: Implement new operator
}
```

### 41. Implement `EventEmitter`

```javascript
class EventEmitter {
  // TODO: Implement EventEmitter with on, off, emit
}
```

### 42. Flatten nested array

```javascript
function flatten(arr) {
  // TODO: Flatten nested array
}
```

### 43. Implement `reduce`

```javascript
Array.prototype.myReduce = function (callback, initialValue) {
  // TODO: Implement reduce
};
```

### 44. Implement `map`

```javascript
Array.prototype.myMap = function (callback) {
  // TODO: Implement map
};
```

### 45. Implement `filter`

```javascript
Array.prototype.myFilter = function (callback) {
  // TODO: Implement filter
};
```

### 46. Implement `Promise.race`

```javascript
function promiseRace(promises) {
  // TODO: Implement Promise.race
}
```

### 47. Implement `Promise.allSettled`

```javascript
function promiseAllSettled(promises) {
  // TODO: Implement Promise.allSettled
}
```

### 48. Implement `Promise.any`

```javascript
function promiseAny(promises) {
  // TODO: Implement Promise.any
}
```

### 49. Throttle with requestAnimationFrame

```javascript
function throttleRAF(func) {
  // TODO: Implement throttle with requestAnimationFrame
}
```

### 50. Implement `once` function

```javascript
function once(func) {
  // TODO: Implement once - function only runs once
}
```

---

## 🔗 Resources / Tài liệu tham khảo

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)
- [JavaScript.info](https://javascript.info/)
- [ECMAScript Specification](https://tc39.es/ecma262/)
- [JavaScript Patterns](https://www.patternsjs.org/)
- [JavaScript Performance](https://web.dev/fast/)

---

## 📊 Difficulty Levels / Mức độ khó

| Level / Mức độ                 | Topics / Chủ đề                                                               |
| ------------------------------ | ----------------------------------------------------------------------------- |
| ⭐ Basic / Cơ bản              | Data Types, Variables, Functions, Arrays, Objects                             |
| ⭐⭐ Intermediate / Trung bình | Closures, `this`, Promises, Async/Await, Event Loop, Prototypes               |
| ⭐⭐⭐ Advanced / Nâng cao     | Currying, Memoization, Debounce/Throttle, Recursion, Performance Optimization |
| ⭐⭐⭐⭐ Expert / Chuyên gia   | V8 Internals, Advanced Patterns, Memory Management, Browser APIs, Security    |

---

_Last updated: 2026-01-30_
