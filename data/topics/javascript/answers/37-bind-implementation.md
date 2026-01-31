# 37. Implement `bind` / Triển Khai Bind

## Tổng quan về Bind

### Mục đích của Bind / Purpose

**Bind** là method tạo mới function với `this` context được set và optional pre-specified arguments.

**Mục đích chính:**

- Set `this` context cho function
- Pre-specify arguments
- Create bound functions
- Function borrowing

### Khi nào nên dùng / When to Use

- Khi cần set `this` context
- Khi cần partial application
- Khi muốn borrow methods
- Khi làm việc với event handlers

### Giúp ích gì / Benefits

**Lợi ích:**

- **Context**: Set `this` context
- **Partial**: Pre-specify arguments
- **Reusable**: Tạo reusable bound functions
- **Borrowing**: Borrow methods từ objects

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm   | Giải thích                   |
| --------- | ---------------------------- |
| Context   | Set `this` context           |
| Partial   | Pre-specify arguments        |
| Reusable  | Tạo reusable bound functions |
| Borrowing | Borrow methods từ objects    |

**Nhược điểm (Cons):**

| Nhược điểm  | Giải thích                      |
| ----------- | ------------------------------- |
| Performance | Có thể chậm hơn arrow functions |
| Complexity  | Code phức tạp hơn               |
| Not needed  | Arrow functions không cần bind  |

---

## Implement `bind`?

**Implement `bind`** là viết function để mimic `Function.prototype.bind` behavior.

### Mục đích / Purpose

- Tạo bind implementation
- Set `this` context
- Pre-specify arguments

### Khi nào dùng / When to Use

- Khi cần bind polyfill
- Khi muốn hiểu bind behavior
- Khi muốn custom bind

### Ví dụ:

```javascript
// Method 1: Basic bind implementation
Function.prototype.myBind = function (context, ...boundArgs) {
  const fn = this;

  return function (...args) {
    return fn.apply(context, [...boundArgs, ...args]);
  };
};

// Usage
const person = {
  name: "John",
  greet: function (greeting) {
    return `${greeting}, ${this.name}!`;
  },
};

const boundGreet = person.greet.myBind(person);
console.log(boundGreet("Hello")); // Hello, John!

// Method 2: Bind với partial application
const add = (a, b, c) => a + b + c;
const add5and10 = add.myBind(null, 5, 10);
console.log(add5and10(3)); // 18

// Method 3: Bind cho event handlers
const button = document.getElementById("button");
const handler = {
  handleClick: function (event) {
    console.log("Clicked:", event.target);
  },
};

button.addEventListener("click", handler.handleClick.myBind(handler));

// Method 4: Bind cho setTimeout/setInterval
const obj = {
  value: 10,
  increment: function () {
    this.value++;
    console.log(this.value);
  },
};

setTimeout(obj.increment.myBind(obj), 1000);

// Method 5: Bind với constructor
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function (greeting) {
  return `${greeting}, ${this.name}!`;
};

const BoundPerson = Person.myBind(null, "John");
const person = new BoundPerson();
console.log(person.greet("Hello")); // Hello, John!
```

### Best Practices:

```javascript
// ✅ Dùng bind để set `this` context
const boundFn = fn.myBind(context);

// ✅ Dùng bind cho partial application
const add5 = add.myBind(null, 5);

// ✅ Dùng bind cho event handlers
button.addEventListener('click', handler.handleClick.myBind(handler));

// ✅ Dùng bind cho setTimeout/setInterval
setTimeout(obj.method.myBind(obj), 1000);

// ✅ Dùng arrow functions thay vì bind (nếu phù hợp)
button.addEventListener('click', (e) => handler.handleClick.call(handler, e)));

// ❌ Tránh bind khi không cần
const badBind = fn.myBind(null); // Không cần bind

// ✅ Dùng arrow functions hoặc bind khi cần
const goodArrow = (e) => handler.handleClick.call(handler, e));
```

---

## Test Cases

```javascript
// Test 1: Bind với `this` context
const obj = {
  value: 10,
  getValue: function () {
    return this.value;
  },
};

const boundGetValue = obj.getValue.myBind(obj);
console.log(boundGetValue()); // 10

// Test 2: Bind với partial application
const add = (a, b, c) => a + b + c;
const add5and10 = add.myBind(null, 5, 10);
console.log(add5and10(3)); // 18

// Test 3: Bind với event handlers
const handler = {
  handleClick: function (event) {
    console.log("Clicked:", event.target);
  },
};

const button = document.getElementById("button");
button.addEventListener("click", handler.handleClick.myBind(handler));

// Test 4: Bind với constructor
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, ${this.name}!`;
};

const BoundPerson = Person.myBind(null, "John");
const person = new BoundPerson();
console.log(person.greet()); // Hello, John!

// Test 5: Bind preserves function length
function add(a, b) {
  return a + b;
}

const boundAdd = add.myBind(null, 5);
console.log(boundAdd.length); // 1

// Test 6: Bind với multiple contexts
const obj1 = { value: 10 };
const obj2 = { value: 20 };

const fn = function () {
  return this.value;
};

const bound1 = fn.myBind(obj1);
const bound2 = fn.myBind(obj2);

console.log(bound1()); // 10
console.log(bound2()); // 20
```

---

## Complete Implementation

```javascript
/**
 * Implement bind method
 * @param {*} context - Context để bind
 * @param {...*} boundArgs - Arguments để pre-specify
 * @returns {Function} Bound function
 */
Function.prototype.myBind = function (context, ...boundArgs) {
  const fn = this;

  // Return bound function
  const bound = function (...args) {
    // Combine bound args với call args
    const allArgs = [...boundArgs, ...args];
    // Call original function với context và args
    return fn.apply(context, allArgs);
  };

  // Set function name (debugging)
  bound.name = `bound ${fn.name || "anonymous"}`;

  // Set function length (arity)
  bound.length = Math.max(0, fn.length - boundArgs.length);

  return bound;
};

// Usage examples

// Example 1: Bind `this` context
const person = {
  name: "John",
  greet: function (greeting) {
    return `${greeting}, ${this.name}!`;
  },
};

const boundGreet = person.greet.myBind(person);
console.log(boundGreet("Hello")); // Hello, John!

// Example 2: Partial application
const multiply = (a, b, c) => a * b * c;
const multiply2and3 = multiply.myBind(null, 2, 3);
console.log(multiply2and3(4)); // 24

// Example 3: Event handler binding
const button = document.getElementById("button");
const handler = {
  handleClick: function (event) {
    console.log("Button clicked:", event.target);
    console.log("This:", this);
  },
};

button.addEventListener("click", handler.handleClick.myBind(handler));

// Example 4: setTimeout/setInterval binding
const obj = {
  counter: 0,
  increment: function () {
    this.counter++;
    console.log("Counter:", this.counter);
  },
};

setInterval(obj.increment.myBind(obj), 1000);

// Example 5: Method borrowing
const obj1 = {
  value: 10,
  getValue: function () {
    return this.value;
  },
};

const obj2 = {};

obj2.getValue = obj1.getValue.myBind(obj1);
console.log(obj2.getValue()); // 10

// Example 6: Bind cho constructor
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, ${this.name}!`;
};

const BoundPerson = Person.myBind(null, "John");
const person = new BoundPerson();
console.log(person.greet()); // Hello, John!
```

---

## Use Cases

```javascript
// 1. Event handler binding
const button = document.getElementById("button");
const handler = {
  handleClick: function (event) {
    console.log("Clicked:", event.target);
  },
};

button.addEventListener("click", handler.handleClick.myBind(handler));

// 2. Partial application
const fetchWithAuth = fetch.myBind(null, {
  headers: {
    Authorization: "Bearer token",
  },
});

fetchWithAuth("/api/data");
fetchWithAuth("/api/users");

// 3. Method borrowing
const obj1 = {
  value: 10,
  getValue: function () {
    return this.value;
  },
};

const obj2 = {};
obj2.getValue = obj1.getValue.myBind(obj1);
console.log(obj2.getValue()); // 10

// 4. setTimeout/setInterval binding
const obj = {
  counter: 0,
  increment: function () {
    this.counter++;
    console.log("Counter:", this.counter);
  },
};

setInterval(obj.increment.myBind(obj), 1000);

// 5. Constructor binding
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, ${this.name}!`;
};

const BoundPerson = Person.myBind(null, "John");
const person = new BoundPerson();
console.log(person.greet()); // Hello, John!
```

---

## Anti-patterns cần tránh

```javascript
// ❌ Bind khi không cần `this` context
const badBind = fn.myBind(null);
// Không cần bind nếu function không dùng `this`

// ✅ Dùng arrow functions hoặc bind khi cần
const goodArrow = () => fn();

// ❌ Bind trong loops (performance issue)
for (let i = 0; i < 1000; i++) {
  const boundFn = fn.myBind(context); // Creates 1000 bound functions
  boundFn();
}

// ✅ Dùng bind outside loops
const boundFn = fn.myBind(context);
for (let i = 0; i < 1000; i++) {
  boundFn();
}

// ❌ Quên bind cho event handlers
button.addEventListener("click", handler.handleClick);
// `this` sẽ là button, không handler

// ✅ Bind `this` context
button.addEventListener("click", handler.handleClick.myBind(handler));

// ❌ Bind arrow functions (không cần)
const arrowFn = () => console.log(this);
const boundArrow = arrowFn.myBind(obj);
// `this` trong arrow function không bị bind
```

---

_References: [MDN Bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)_
