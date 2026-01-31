# 38. Implement `call` / Triển Khai Call

## Tổng quan về Call

### Mục đích của Call / Purpose

**Call** là method gọi function với specified `this` context và individual arguments.

**Mục đích chính:**

- Call function với custom `this` context
- Pass arguments individually
- Function borrowing
- Method invocation

### Khi nào nên dùng / When to Use

- Khi cần set `this` context
- Khi cần pass arguments as array
- Khi muốn borrow methods
- Khi làm việc với function invocation

### Giúp ích gì / Benefits

**Lợi ích:**

- **Context**: Set `this` context
- **Flexible**: Pass arguments individually
- **Borrowing**: Borrow methods từ objects
- **Explicit**: Explicit function invocation

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm   | Giải thích                   |
| --------- | ---------------------------- |
| Context   | Set `this` context           |
| Flexible  | Pass arguments individually  |
| Borrowing | Borrow methods từ objects    |
| Explicit  | Explicit function invocation |

**Nhược điểm (Cons):**

| Nhược điểm  | Giải thích                |
| ----------- | ------------------------- |
| Complexity  | Code phức tạp hơn         |
| Not needed  | Arrow functions không cần |
| Less common | Ít dùng hơn apply         |

---

## Implement `call`?

**Implement `call`** là viết function để mimic `Function.prototype.call` behavior.

### Mục đích / Purpose

- Tạo call implementation
- Set `this` context
- Pass arguments individually

### Khi nào dùng / When to Use

- Khi cần call polyfill
- Khi muốn understand call behavior
- Khi muốn custom call

### Ví dụ:

```javascript
// Method 1: Basic call implementation
Function.prototype.myCall = function (context, ...args) {
  const fn = this;

  // Create unique property để avoid conflicts
  const prop = Symbol();
  context[prop] = fn;

  // Call function với context và args
  const result = context[prop](...args);

  // Clean up
  delete context[prop];

  return result;
};

// Usage
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: "John" };
console.log(greet.myCall(person, "Hello", "!")); // Hello, John!

// Method 2: Call với method borrowing
const obj1 = {
  value: 10,
  getValue: function () {
    return this.value;
  },
};

const obj2 = {};
console.log(obj1.getValue.myCall(obj2)); // 10

// Method 3: Call với constructor
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, ${this.name}!`;
};

const obj = {};
console.log(Person.prototype.greet.myCall(obj, "John")); // Hello, undefined (obj không có name)
console.log(Person.prototype.greet.myCall({ name: "Jane" })); // Hello, Jane!

// Method 4: Call với multiple arguments
function sum(a, b, c, d) {
  return a + b + c + d;
}

console.log(sum.myCall(null, 1, 2, 3, 4)); // 10

// Method 5: Call với `this` context
const obj = {
  value: 10,
  double: function () {
    return this.value * 2;
  },
};

console.log(obj.double.myCall(obj)); // 20
```

### Best Practices:

```javascript
// ✅ Dùng call để set `this` context
const result = fn.myCall(context, arg1, arg2);

// ✅ Dùng call cho method borrowing
const borrowedResult = obj1.method.myCall(obj2);

// ✅ Dùng call với constructor
const result = Constructor.prototype.method.myCall(context, arg1);

// ✅ Dùng call để pass arguments individually
const result = fn.myCall(null, arg1, arg2, arg3);

// ❌ Tránh call khi không cần `this` context
const badCall = fn.myCall(null, arg1); // Không cần call

// ✅ Dùng direct call khi không cần context
const goodCall = fn(arg1);
```

---

## Test Cases

```javascript
// Test 1: Call với `this` context
const obj = {
  value: 10,
  getValue: function () {
    return this.value;
  },
};

console.log(obj.getValue.myCall(obj)); // 10

// Test 2: Call với arguments
function add(a, b, c) {
  return a + b + c;
}

console.log(add.myCall(null, 1, 2, 3)); // 6

// Test 3: Call với method borrowing
const obj1 = {
  value: 10,
  getValue: function () {
    return this.value;
  },
};

const obj2 = {};
console.log(obj1.getValue.myCall(obj2)); // 10

// Test 4: Call với constructor
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, ${this.name}!`;
};

const obj = {};
console.log(Person.prototype.greet.myCall(obj, "John")); // Hello, undefined
console.log(Person.prototype.greet.myCall({ name: "Jane" })); // Hello, Jane!

// Test 5: Call preserves `this`
const obj = {
  value: 10,
  method: function () {
    return this.value;
  },
};

console.log(obj.method.myCall(obj)); // 10
console.log(obj.method.myCall({ value: 20 })); // 20
```

---

## Complete Implementation

```javascript
/**
 * Implement call method
 * @param {*} context - Context để call function
 * @param {...*} args - Arguments để pass
 * @returns {*} Result của function call
 */
Function.prototype.myCall = function (context, ...args) {
  const fn = this;

  // Create unique property để avoid conflicts
  const prop = Symbol();
  context[prop] = fn;

  // Call function với context và args
  const result = context[prop](...args);

  // Clean up
  delete context[prop];

  return result;
};

// Usage examples

// Example 1: Basic call usage
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: "John" };
console.log(greet.myCall(person, "Hello", "!")); // Hello, John!

// Example 2: Method borrowing
const obj1 = {
  value: 10,
  getValue: function () {
    return this.value;
  },
};

const obj2 = {};
console.log(obj1.getValue.myCall(obj2)); // 10

// Example 3: Constructor call
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, ${this.name}!`;
};

const obj = {};
console.log(Person.prototype.greet.myCall(obj, "John")); // Hello, undefined
console.log(Person.prototype.greet.myCall({ name: "Jane" })); // Hello, Jane!

// Example 4: Multiple arguments
function sum(a, b, c, d) {
  return a + b + c + d;
}

console.log(sum.myCall(null, 1, 2, 3, 4)); // 10

// Example 5: Context preservation
const obj = {
  value: 10,
  nested: {
    value: 20,
    method: function () {
      return this.value;
    },
  },
};

console.log(obj.nested.method.myCall(obj.nested)); // 20
```

---

## Use Cases

```javascript
// 1. Method borrowing
const obj1 = {
  value: 10,
  getValue: function () {
    return this.value;
  },
};

const obj2 = {};
console.log(obj1.getValue.myCall(obj2)); // 10

// 2. Constructor invocation
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, ${this.name}!`;
};

const obj = {};
console.log(Person.prototype.greet.myCall(obj, "John")); // Hello, undefined

// 3. Context switching
const obj1 = { value: 10 };
const obj2 = { value: 20 };

const fn = function () {
  return this.value;
};

console.log(fn.myCall(obj1)); // 10
console.log(fn.myCall(obj2)); // 20

// 4. Arguments passing
function multiply(a, b, c) {
  return a * b * c;
}

console.log(multiply.myCall(null, 2, 3, 4)); // 24

// 5. Array-like objects
const arrayLike = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};

function logFirst() {
  console.log(this[0]);
}

logFirst.myCall(arrayLike); // 'a'
```

---

## Anti-patterns cần tránh

```javascript
// ❌ Call khi không cần `this` context
const badCall = fn.myCall(null, arg1);
// Không cần call

// ✅ Dùng direct call khi không cần context
const goodCall = fn(arg1);

// ❌ Call với null/undefined context khi function cần `this`
const badCall = fn.myCall(null, arg1);
// Function cần `this` context

// ✅ Dùng appropriate context
const goodCall = fn.myCall(context, arg1);

// ❌ Quên clean up temporary properties
Function.prototype.badCall = function(context, ...args) {
  context.temp = this;
  return context.temp(...args);
  // Không clean up - memory leak

// ✅ Luôn clean up temporary properties
Function.prototype.goodCall = function(context, ...args) {
  const prop = Symbol();
  context[prop] = this;
  const result = context[prop](...args);
  delete context[prop];
  return result;
};
```

---

_References: [MDN Call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)_
