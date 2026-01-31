# 31. Implement `deepClone` / Triển Khai Deep Clone

## Tổng quan về Deep Clone

### Mục đích của Deep Clone / Purpose

**Deep Clone** là tạo một bản copy hoàn toàn độc lập của một object, bao gồm cả nested objects.

**Mục đích chính:**

- Tạo bản copy độc lập của object
- Tránh mutation của original object
- Handle nested objects
- Preserve object structure

### Khi nào nên dùng / When to Use

- Khi cần copy object với nested structures
- Khi muốn avoid mutation
- Khi cần immutable state
- Khi làm việc với Redux/React state

### Giúp ích gì / Benefits

**Lợi ích:**

- **Immutable**: Original object không bị thay đổi
- **Independent**: Clone không ảnh hưởng original
- **Nested**: Handle nested objects
- **Flexible**: Works với các data types khác nhau

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm     | Giải thích                        |
| ----------- | --------------------------------- |
| Immutable   | Original object không bị thay đổi |
| Independent | Clone độc lập hoàn toàn           |
| Nested      | Handle nested objects             |
| Flexible    | Works với nhiều data types        |

**Nhược điểm (Cons):**

| Nhược điểm          | Giải thích                     |
| ------------------- | ------------------------------ |
| Performance         | Có thể chậm với large objects  |
| Complexity          | Code phức tạp hơn              |
| Circular references | Cần handle circular references |

---

## Implement `deepClone`?

**Implement `deepClone`** là viết function để deep clone objects.

### Mục đích / Purpose

- Tạo deep clone function
- Handle nested objects
- Handle circular references
- Preserve data types

### Khi nào dùng / When to Use

- Khi cần deep clone objects
- Khi muốn avoid mutation
- Khi làm việc với immutable state

### Ví dụ:

```javascript
// Method 1: JSON.parse(JSON.stringify()) - Simple but limited
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Usage
const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);
cloned.b.c = 3;
console.log(original.b.c); // 2 (unchanged)
console.log(cloned.b.c); // 3 (changed)

// Limitations:
// - Cannot clone functions
// - Cannot clone undefined
// - Cannot clone Symbol
// - Cannot clone circular references
// - Loses special objects (Date, RegExp, Map, Set)

// Method 2: Recursive deep clone - More comprehensive
function deepClone(obj, hash = new WeakMap()) {
  // Handle primitives and null
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Handle circular references
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // Handle Date
  if (obj instanceof Date) {
    const copy = new Date(obj);
    hash.set(obj, copy);
    return copy;
  }

  // Handle RegExp
  if (obj instanceof RegExp) {
    const copy = new RegExp(obj);
    hash.set(obj, copy);
    return copy;
  }

  // Handle Map
  if (obj instanceof Map) {
    const copy = new Map();
    hash.set(obj, copy);
    obj.forEach((value, key) => {
      copy.set(key, deepClone(value, hash));
    });
    return copy;
  }

  // Handle Set
  if (obj instanceof Set) {
    const copy = new Set();
    hash.set(obj, copy);
    obj.forEach((value) => {
      copy.add(deepClone(value, hash));
    });
    return copy;
  }

  // Handle Array
  if (Array.isArray(obj)) {
    const copy = [];
    hash.set(obj, copy);
    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepClone(obj[i], hash);
    }
    return copy;
  }

  // Handle Object
  const copy = {};
  hash.set(obj, copy);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key], hash);
    }
  }
  return copy;
}

// Method 3: Using structuredClone (modern browsers)
function deepClone(obj) {
  return structuredClone(obj);
}

// Usage
const original = { a: 1, b: { c: 2 }, d: new Date() };
const cloned = deepClone(original);
cloned.b.c = 3;
console.log(original.b.c); // 2 (unchanged)
console.log(cloned.b.c); // 3 (changed)
console.log(cloned.d instanceof Date); // true

// Method 4: Using lodash.cloneDeep (library)
import { cloneDeep } from "lodash";

const cloned = cloneDeep(original);

// Method 5: Using jQuery.extend (if using jQuery)
const cloned = $.extend(true, {}, original);
```

### Best Practices:

```javascript
// ✅ Dùng structuredClone nếu supported
if (typeof structuredClone !== "undefined") {
  return structuredClone(obj);
}

// ✅ Dùng WeakMap để handle circular references
function deepClone(obj, hash = new WeakMap()) {
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  // ...
}

// ✅ Handle special objects (Date, RegExp, Map, Set)
if (obj instanceof Date) {
  return new Date(obj);
}

// ✅ Handle Arrays
if (Array.isArray(obj)) {
  const copy = [];
  for (let i = 0; i < obj.length; i++) {
    copy[i] = deepClone(obj[i]);
  }
  return copy;
}

// ❌ Tránh JSON.parse(JSON.stringify()) cho complex objects
// Không handle functions, undefined, Symbol, circular references
```

---

## Test Cases

```javascript
// Test 1: Simple object
const original = { a: 1, b: 2 };
const cloned = deepClone(original);
cloned.a = 3;
console.log(original.a); // 1 (unchanged)
console.log(cloned.a); // 3 (changed)

// Test 2: Nested object
const original = { a: { b: { c: 1 } } };
const cloned = deepClone(original);
cloned.a.b.c = 2;
console.log(original.a.b.c); // 1 (unchanged)
console.log(cloned.a.b.c); // 2 (changed)

// Test 3: Array
const original = [1, 2, { a: 3 }];
const cloned = deepClone(original);
cloned[2].a = 4;
console.log(original[2].a); // 3 (unchanged)
console.log(cloned[2].a); // 4 (changed)

// Test 4: Date
const original = { date: new Date("2024-01-01") };
const cloned = deepClone(original);
cloned.date.setFullYear(2025);
console.log(original.date.getFullYear()); // 2024 (unchanged)
console.log(cloned.date.getFullYear()); // 2025 (changed)

// Test 5: RegExp
const original = { regex: /test/g };
const cloned = deepClone(original);
console.log(cloned.regex instanceof RegExp); // true

// Test 6: Map
const original = {
  map: new Map([
    ["a", 1],
    ["b", 2],
  ]),
};
const cloned = deepClone(original);
cloned.map.set("a", 3);
console.log(original.map.get("a")); // 1 (unchanged)
console.log(cloned.map.get("a")); // 3 (changed)

// Test 7: Set
const original = { set: new Set([1, 2, 3]) };
const cloned = deepClone(original);
cloned.set.add(4);
console.log(original.set.has(4)); // false (unchanged)
console.log(cloned.set.has(4)); // true (changed)

// Test 8: Circular reference
const original = { a: 1 };
original.self = original;
const cloned = deepClone(original);
console.log(cloned.self === cloned); // true (circular handled)

// Test 9: Function (JSON method fails)
const original = { fn: () => console.log("Hello") };
const cloned = deepClone(original);
console.log(typeof cloned.fn); // 'function' (preserved)

// Test 10: Symbol (JSON method fails)
const original = { sym: Symbol("test") };
const cloned = deepClone(original);
console.log(typeof cloned.sym); // 'symbol' (preserved)
```

---

## Performance Comparison

```javascript
// Test performance
const largeObj = { a: 1 };
for (let i = 0; i < 10000; i++) {
  largeObj[`prop${i}`] = { nested: { value: i } };
}

// JSON.parse(JSON.stringify())
console.time("JSON method");
const jsonClone = JSON.parse(JSON.stringify(largeObj));
console.timeEnd("JSON method");

// Recursive deep clone
console.time("Recursive method");
const recursiveClone = deepClone(largeObj);
console.timeEnd("Recursive method");

// structuredClone
console.time("structuredClone method");
const structuredCloneObj = structuredClone(largeObj);
console.timeEnd("structuredClone method");

// lodash.cloneDeep
console.time("lodash method");
const lodashClone = cloneDeep(largeObj);
console.timeEnd("lodash method");

// Results (approximate):
// JSON method: ~50ms
// Recursive method: ~30ms
// structuredClone method: ~20ms
// lodash method: ~40ms
```

---

## Complete Implementation

```javascript
/**
 * Deep clone an object or array
 * @param {*} obj - Object to clone
 * @param {WeakMap} [hash=new WeakMap()] - WeakMap to handle circular references
 * @returns {*} Deep cloned object
 */
function deepClone(obj, hash = new WeakMap()) {
  // Handle primitives and null
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Handle circular references
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // Handle Date
  if (obj instanceof Date) {
    const copy = new Date(obj);
    hash.set(obj, copy);
    return copy;
  }

  // Handle RegExp
  if (obj instanceof RegExp) {
    const copy = new RegExp(obj);
    hash.set(obj, copy);
    return copy;
  }

  // Handle Map
  if (obj instanceof Map) {
    const copy = new Map();
    hash.set(obj, copy);
    obj.forEach((value, key) => {
      copy.set(key, deepClone(value, hash));
    });
    return copy;
  }

  // Handle Set
  if (obj instanceof Set) {
    const copy = new Set();
    hash.set(obj, copy);
    obj.forEach((value) => {
      copy.add(deepClone(value, hash));
    });
    return copy;
  }

  // Handle Array
  if (Array.isArray(obj)) {
    const copy = [];
    hash.set(obj, copy);
    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepClone(obj[i], hash);
    }
    return copy;
  }

  // Handle ArrayBuffer
  if (obj instanceof ArrayBuffer) {
    const copy = obj.slice(0);
    hash.set(obj, copy);
    return copy;
  }

  // Handle TypedArray
  if (ArrayBuffer.isView(obj)) {
    const copy = new obj.constructor(obj.buffer.slice(0));
    hash.set(obj, copy);
    return copy;
  }

  // Handle Object
  const copy = Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, copy);

  // Copy all properties including symbols
  Reflect.ownKeys(obj).forEach((key) => {
    copy[key] = deepClone(obj[key], hash);
  });

  return copy;
}

// Alternative: Using structuredClone (modern browsers)
function deepCloneModern(obj) {
  if (typeof structuredClone !== "undefined") {
    return structuredClone(obj);
  }
  // Fallback to recursive implementation
  return deepClone(obj);
}

// Alternative: Simple JSON method (limited but fast)
function deepCloneSimple(obj) {
  return JSON.parse(JSON.stringify(obj));
}
```

---

## Use Cases

```javascript
// 1. Immutable state updates (Redux)
function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        user: deepClone(action.payload),
      };
    default:
      return state;
  }
}

// 2. Clone form data
function cloneFormData(formData) {
  return deepClone(formData);
}

// 3. Deep clone for comparison
function areDeepEqual(obj1, obj2) {
  const cloned1 = deepClone(obj1);
  const cloned2 = deepClone(obj2);
  return JSON.stringify(cloned1) === JSON.stringify(cloned2);
}

// 4. Undo/Redo functionality
class History {
  constructor() {
    this.past = [];
    this.present = null;
    this.future = [];
  }

  push(state) {
    this.past.push(deepClone(this.present));
    this.present = deepClone(state);
    this.future = [];
  }

  undo() {
    if (this.past.length === 0) return;
    this.future.push(deepClone(this.present));
    this.present = this.past.pop();
  }

  redo() {
    if (this.future.length === 0) return;
    this.past.push(deepClone(this.present));
    this.present = this.future.pop();
  }
}
```

---

## Anti-patterns cần tránh

```javascript
// ❌ JSON.parse(JSON.stringify()) cho complex objects
// Không handle functions, undefined, Symbol, circular references
const cloned = JSON.parse(JSON.stringify(obj));

// ✅ Dùng deepClone function
const cloned = deepClone(obj);

// ❌ Shallow copy cho nested objects
const cloned = { ...original }; // Shallow copy
cloned.nested.prop = "changed";
console.log(original.nested.prop); // 'changed' (mutated!)

// ✅ Dùng deep clone
const cloned = deepClone(original);

// ❌ Không handle circular references
function deepCloneBad(obj) {
  if (typeof obj !== "object") return obj;
  const clone = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    clone[key] = deepCloneBad(obj[key]); // Infinite loop!
  }
  return clone;
}

// ✅ Dùng WeakMap để handle circular references
function deepCloneGood(obj, hash = new WeakMap()) {
  if (hash.has(obj)) return hash.get(obj);
  // ...
}
```

---

_References: [MDN Structured Clone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone), [Lodash cloneDeep](https://lodash.com/docs/4.17.15#cloneDeep)_
