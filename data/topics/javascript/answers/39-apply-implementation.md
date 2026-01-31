# 39. Implement `apply` / Triển Khai Apply

## Tổng quan về Apply

### Mục đích của Apply / Purpose

**Apply** là method gọi function với specified `this` context và arguments được cung cấp như array.

**Mục đích chính:**

- Call function với `this` context
- Pass arguments as array
- Function borrowing
- Spread operator alternative

### Khi nào nên dùng / When to Use

- Khi cần set `this` context
- Khi có arguments as array
- Khi muốn borrow methods
- Khi làm việc với function invocation

### Giúp ích gì / Benefits

**Lợi ích:**

- **Context**: Set `this` context
- **Array args**: Pass arguments as array
- **Borrowing**: Borrow methods từ objects
- **Flexible**: Flexible function invocation

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm    | Giải thích                   |
| ---------- | ---------------------------- |
| Context    | Set `this` context           |
| Array args | Pass arguments as array      |
| Borrowing  | Borrow methods từ objects    |
| Flexible   | Flexible function invocation |

**Nhược điểm (Cons):**

| Nhược điểm  | Giải thích             |
| ----------- | ---------------------- |
| Complexity  | Code phức tạp hơn      |
| Performance | Có thể chậm hơn spread |
| Less common | Ít dùng hơn spread     |

---

## Implement `apply`?

**Implement `apply`** là viết function để mimic `Function.prototype.apply` behavior.

### Mục đích / Purpose

- Tạo apply implementation
- Set `this` context
- Pass arguments as array

### Khi nào dùng / When to Use

- Khi cần apply polyfill
- Khi muốn understand apply behavior
- Khi muốn custom apply

### Ví dụ:

```javascript
// Method 1: Basic apply implementation
Function.prototype.myApply = function (context, args) {
  const fn = this;
  // Handle null/undefined context
  if (context == null) {
    context = globalThis;
  }
  // Handle non-array args
  if (!Array.isArray(args)) {
    throw new TypeError("Arguments must be an array");
  }
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
console.log(greet.myApply(person, ["Hello", "!"])); // Hello, John!

// Method 2: Apply với method borrowing
const obj1 = {
  value: 10,
  getValue: function () {
    return this.value;
  },
};

const obj2 = {};
console.log(obj1.getValue.myApply(obj2, [])); // 10

// Method 3: Apply với constructor
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function (greeting) {
  return `${greeting}, ${this.name}!`;
};

const obj = {};
console.log(Person.prototype.greet.myApply(obj, ["Hello"])); // Hello, undefined

// Method 4: Apply với array methods
const numbers = [1, 2, 3, 4, 5];
const max = Math.max.myApply(null, numbers);
console.log(max); // 5

// Method 5: Apply với custom function
function sum(...args) {
  return args.reduce((acc, val) => acc + val, 0);
}

console.log(sum.myApply(null, [1, 2, 3, 4, 5])); // 15
```

### Best Practices:

```javascript
// ✅ Dùng apply để set `this` context
const result = fn.myApply(context, [arg1, arg2]);

// ✅ Dùng apply để pass arguments as array
const result = fn.myApply(context, argsArray);

// ✅ Dùng apply cho method borrowing
const borrowedResult = obj1.method.myApply(obj2, []);

// ✅ Dùng apply với array methods
const max = Math.max.myApply(null, numbers);

// ✅ Dùng spread operator thay vì apply (nếu phù hợp)
const result = fn(...args);

// ❌ Tránh apply khi không cần `this` context
const badApply = fn.myApply(null, args);
// Không cần apply nếu function không dùng `this`

// ✅ Dùng direct call khi không cần context
const goodCall = fn(...args);
```

---

## Test Cases

```javascript
// Test 1: Apply với `this` context
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: "John" };
console.log(greet.myApply(person, ["Hello", "!"])); // Hello, John!

// Test 2: Apply với method borrowing
const obj1 = {
  value: 10,
  getValue: function () {
    return this.value;
  },
};

const obj2 = {};
console.log(obj1.getValue.myApply(obj2, [])); // 10

// Test 3: Apply với constructor
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, ${this.name}!`;
};

const obj = {};
console.log(Person.prototype.greet.myApply(obj, ["John"])); // Hello, undefined

// Test 4: Apply với array methods
const numbers = [1, 2, 3, 4, 5];
console.log(Math.max.myApply(null, numbers)); // 5
console.log(Math.min.myApply(null, numbers)); // 1

// Test 5: Apply với spread operator
function sum(...args) {
  return args.reduce((acc, val) => acc + val, 0);
}

console.log(sum.myApply(null, [1, 2, 3])); // 6

// Test 6: Apply với empty args
function getValue() {
  return this.value;
}

const obj = { value: 10 };
console.log(getValue.myApply(obj, [])); // 10
```

---

## Complete Implementation

```javascript
/**
 * Implement apply method
 * @param {*} context - Context để call function
 * @param {Array} args - Arguments array
 * @returns {*} Result của function call
 */
Function.prototype.myApply = function (context, args) {
  const fn = this;

  // Handle null/undefined context
  if (context == null) {
    context = globalThis;
  }

  // Handle non-array args
  if (!Array.isArray(args)) {
    throw new TypeError("Arguments must be an array");
  }

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

// Example 1: Basic apply usage
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: "John" };
console.log(greet.myApply(person, ["Hello", "!"])); // Hello, John!

// Example 2: Method borrowing
const obj1 = {
  value: 10,
  getValue: function () {
    return this.value;
  },
};

const obj2 = {};
console.log(obj1.getValue.myApply(obj2, [])); // 10

// Example 3: Constructor apply
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, ${this.name}!`;
};

const obj = {};
console.log(Person.prototype.greet.myApply(obj, ["John"])); // Hello, undefined

// Example 4: Array method apply
const numbers = [1, 2, 3, 4, 5];
const max = Math.max.myApply(null, numbers);
console.log(max); // 5

// Example 5: Custom function apply
function sum(...args) {
  return args.reduce((acc, val) => acc + val, 0);
}

console.log(sum.myApply(null, [1, 2, 3, 4, 5])); // 15
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
console.log(obj1.getValue.myApply(obj2, [])); // 10

// 2. Constructor invocation
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, ${this.name}!`;
};

const obj = {};
console.log(Person.prototype.greet.myApply(obj, ["John"])); // Hello, undefined

// 3. Array method invocation
const numbers = [1, 2, 3, 4, 5];
console.log(Math.max.myApply(null, numbers)); // 5
console.log(Math.min.myApply(null, numbers)); // 1

// 4. Custom function invocation
function sum(...args) {
  return args.reduce((acc, val) => acc + val, 0);
}

console.log(sum.myApply(null, [1, 2, 3, 4, 5])); // 15

// 5. Function composition
function compose(...fns) {
  return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const addThenMultiply = compose(multiply, add);
console.log(addThenMultiply(2)(3)); // 9

// 6. Array-like object invocation
const arrayLike = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};

const toArray = Array.prototype.slice.myApply(arrayLike, []);
console.log(toArray); // ['a', 'b', 'c']
```

---

## Anti-patterns cần tránh

```javascript
// ❌ Apply khi không cần `this` context
const badApply = fn.myApply(null, args);
// Không cần apply nếu function không dùng `this`

// ✅ Dùng spread operator khi phù hợp
const goodSpread = fn(...args);

// ❌ Apply với non-array args
const badApply = fn.myApply(null, "not-an-array");
// Sẽ throw TypeError

// ✅ Validate args trước khi apply
if (!Array.isArray(args)) {
  throw new TypeError("Arguments must be an array");
}
const goodApply = fn.myApply(context, args);

// ❌ Quên clean up temporary properties
Function.prototype.badApply = function (context, args) {
  context.temp = this;
  return context.temp(...args);
  // Không clean up - memory leak
};

// ✅ Luôn clean up temporary properties
Function.prototype.goodApply = function (context, args) {
  const prop = Symbol();
  context[prop] = this;
  const result = context[prop](...args);
  delete context[prop];
  return result;
};
```

---

_References: [MDN Apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)_
