# 12. Prototypes

## Tổng quan về Prototypes

### Mục đích của Prototypes / Purpose

**Prototype** là cơ chế inheritance trong JavaScript, cho phép objects truy cập properties từ prototype của chúng.

**Mục đích chính:**

- Inheritance
- Code reuse
- Memory efficiency
- Dynamic behavior

### Khi nào cần hiểu về Prototypes / When to Use

Hiểu về Prototypes là cần thiết khi:

- Implement inheritance
- Code reuse
- Understand JavaScript internals
- Debug prototype-related issues

### Giúp ích gì / Benefits

**Lợi ích:**

- **Inheritance**: Kế thừa properties
- **Code reuse**: Reuse methods
- **Memory efficiency**: Shared methods
- **Dynamic behavior**: Dynamic property access

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm        |
| ----------------- | ----------------- | ------------------- |
| Inheritance       | Code reuse        | Verbose hơn classes |
| Memory efficiency | Debugging khó hơn | Có thể gây bugs     |
| Dynamic behavior  | Flexible          | Không type safety   |

---

## Prototype chain là gì?

**Prototype chain** là cơ chế inheritance trong JavaScript, cho phép objects truy cập properties từ prototype của chúng.

### Mục đích / Purpose

**Prototype chain** được thiết kế để:

- Inheritance
- Property lookup
- Code reuse
- Dynamic behavior

### Khi nào dùng / When to Use

Prototype chain nên dùng khi:

- Implement inheritance
- Property access
- Code reuse
- Understand JavaScript internals

### Giúp ích gì / Benefits

**Lợi ích:**

- **Inheritance**: Kế thừa properties
- **Code reuse**: Reuse methods
- **Memory efficiency**: Shared methods
- **Dynamic behavior**: Dynamic property access

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm        |
| ----------------- | ----------------- | ------------------- |
| Inheritance       | Code reuse        | Verbose hơn classes |
| Memory efficiency | Debugging khó hơn | Có thể gây bugs     |
| Dynamic behavior  | Flexible          | Không type safety   |

### Prototype chain hoạt động:

```javascript
// Object có prototype
const person = {
  name: "John",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};

// Tạo object với person làm prototype
const john = Object.create(person);
john.name = "Jane";

john.greet(); // 'Hello, Jane' (method từ prototype)
console.log(john.__proto__ === person); // true
```

### Prototype chain lookup:

```javascript
// Prototype chain
const grandParent = {
  grandMethod() {
    console.log("Grand method");
  },
};

const parent = Object.create(grandParent);
parent.parentMethod = function () {
  console.log("Parent method");
};

const child = Object.create(parent);
child.childMethod = function () {
  console.log("Child method");
};

// Lookup chain:
child.childMethod(); // 'Child method' (từ child)
child.parentMethod(); // 'Parent method' (từ parent)
child.grandMethod(); // 'Grand method' (từ grandParent)
```

### Ví dụ thực tế:

```javascript
// Built-in prototype chain
const arr = [1, 2, 3];
console.log(arr.map((x) => x * 2)); // [2, 4, 6]

// map không phải là own property của arr
console.log(arr.hasOwnProperty("map")); // false
console.log(arr.__proto__.hasOwnProperty("map")); // true (Array.prototype)
```

### Best Practices:

```javascript
// ✅ Dùng prototype chain cho:
// - Inheritance
// - Code reuse
const person = {
  name: "John",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};

const john = Object.create(person);
john.greet();
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên thay đổi prototype của built-in objects
Array.prototype.map = function () {
  console.log("Modified map");
};

// ✅ Nên dùng Object.create cho inheritance
const person = {
  name: "John",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};

const john = Object.create(person);
john.greet();
```

---

## `__proto__` vs `prototype`?

### Mục đích / Purpose

Hiểu sự khác biệt giữa **`__proto__`** và **`prototype`** giúp:

- Chọn đúng property
- Hiểu prototype chain
- Debug inheritance
- Write correct code

### Khi nào dùng / When to Use

| Property    | Khi nào dùng                       |
| ----------- | ---------------------------------- | ---------------------------------- |
| `__proto__` | Truy cập prototype của instance    | Debugging, inspect prototype chain |
| `prototype` | Prototype của constructor function | Define methods cho constructor     |

### Giúp ích gì / Benefits

Hiểu sự khác biệt giúp:

- **Debugging**: Dễ dàng debug
- **Prototype access**: Truy cập prototype
- **Correct code**: Viết code đúng
- **Inheritance**: Hiểu inheritance

### Ưu nhược điểm / Pros & Cons

| Property    | Ưu điểm            | Nhược điểm                                  |
| ----------- | ------------------ | ------------------------------------------- |
| `__proto__` | Truy cập prototype | Deprecated, không nên dùng trong production |
| `prototype` | Define methods     | Chỉ có trên constructor functions           |

### `__proto__` - Prototype của instance:

```javascript
// __proto__ trỏ đến prototype của object
const obj = { name: "John" };
console.log(obj.__proto__); // {}

const person = {
  name: "John",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};

const john = Object.create(person);
console.log(john.__proto__ === person); // true

// __proto__ có thể thay đổi
john.__proto__ = { custom: true };
console.log(john.greet()); // 'Hello, undefined' (this là new object)
```

### `prototype` - Prototype của constructor:

```javascript
// prototype thuộc về constructor function
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hello, ${this.name}`);
};

const john = new Person("John");
john.greet(); // 'Hello, John'

// prototype không phải property của instance
console.log(john.prototype); // { greet: [Function] }
console.log(john.__proto__ === Person.prototype); // true
```

### So sánh:

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hello, ${this.name}`);
};

const john = new Person("John");

// __proto__ - prototype của instance
console.log(john.__proto__ === Person.prototype); // true

// prototype - prototype của constructor
console.log(john.prototype); // { greet: [Function] }
console.log(john.prototype); // undefined (không phải property của instance)
```

### Best Practices:

```javascript
// ✅ Dùng Object.getPrototypeOf() thay vì __proto__
const proto = Object.getPrototypeOf(john);
console.log(proto === Person.prototype); // true

// ✅ Dùng Object.setPrototypeOf() thay vì __proto__
Object.setPrototypeOf(john, { custom: true });
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng __proto__ trong production
john.__proto__ = { custom: true };

// ✅ Nên dùng Object.getPrototypeOf()
const proto = Object.getPrototypeOf(john);

// ✅ Nên dùng Object.setPrototypeOf()
Object.setPrototypeOf(john, { custom: true });
```

---

## `Object.create()`, `Object.getPrototypeOf()`?

### Mục đích / Purpose

**Object.create()** và **Object.getPrototypeOf()** được thiết kế để:

- Tạo object với prototype
- Lấy prototype của object
- Implement inheritance
- Null prototype objects

### Khi nào dùng / When to Use

| Method                    | Khi nào dùng             |
| ------------------------- | ------------------------ | ----------------------------------- |
| `Object.create()`         | Tạo object với prototype | Inheritance, null prototype objects |
| `Object.getPrototypeOf()` | Lấy prototype của object | Debugging, inspect prototype chain  |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Create objects**: Tạo objects với prototype
- **Get prototype**: Lấy prototype
- **Inheritance**: Implement inheritance
- **Null prototype**: Tạo objects không có prototype

### Ưu nhược điểm / Pros & Cons

| Method                    | Ưu điểm  | Nhược điểm                   |
| ------------------------- | -------- | ---------------------------- |
| `Object.create()`         | Flexible | Verbose hơn object literals  |
| `Object.getPrototypeOf()` | Rõ ràng  | Chỉ truy cập, không thay đổi |

### `Object.create()` - Tạo object với prototype:

```javascript
// Tạo object với prototype
const person = {
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};

const john = Object.create(person);
john.name = "Jane";

john.greet(); // 'Hello, Jane'
console.log(john.__proto__ === person); // true
```

### `Object.getPrototypeOf()` - Lấy prototype:

```javascript
// Lấy prototype của object
const arr = [1, 2, 3];
const arrProto = Object.getPrototypeOf(arr);
console.log(arrProto === Array.prototype); // true

const obj = { name: "John" };
const objProto = Object.getPrototypeOf(obj);
console.log(objProto === Object.prototype); // true

function Person(name) {
  this.name = name;
}

const john = new Person("John");
const johnProto = Object.getPrototypeOf(john);
console.log(johnProto === Person.prototype); // true
```

### Ví dụ thực tế:

```javascript
// Tạo object không có prototype
const nullProtoObj = Object.create(null);
console.log(Object.getPrototypeOf(nullProtoObj)); // null

console.log(nullProtoObj.toString); // TypeError (không có toString)
```

### Best Practices:

```javascript
// ✅ Dùng Object.create() cho inheritance
const person = {
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};

const john = Object.create(person);

// ✅ Dùng Object.getPrototypeOf() để inspect prototype
const proto = Object.getPrototypeOf(john);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng __proto__
const proto = obj.__proto__;

// ✅ Nên dùng Object.getPrototypeOf()
const proto = Object.getPrototypeOf(obj);
```

---

## `hasOwnProperty` vs `in` operator?

### Mục đích / Purpose

Hiểu sự khác biệt giữa **`hasOwnProperty()`** và **`in` operator** giúp:

- Kiểm tra property ownership
- Debug property access
- Tránh prototype pollution
- Chọn đúng method

### Khi nào dùng / When to Use

| Operator           | Khi nào dùng              |
| ------------------ | ------------------------- | ------------------------------------ |
| `hasOwnProperty()` | Kiểm tra own properties   | Debugging, avoid prototype pollution |
| `in` operator      | Kiểm tra property tồn tại | Check property existence             |

### Giúp ích gì / Benefits

Hiểu sự khác biệt giúp:

- **Debugging**: Dễ dàng debug
- **Correct access**: Chọn đúng method
- **Avoid pollution**: Tránh prototype pollution
- **Clear intent**: Code rõ ràng

### Ưu nhược điểm / Pros & Cons

| Operator           | Ưu điểm             | Nhược điểm                     |
| ------------------ | ------------------- | ------------------------------ |
| `hasOwnProperty()` | Own properties only | Không kiểm tra prototype chain |
| `in` operator      | Tồn tại trong chain | Có thể gây confusion           |

### `hasOwnProperty()` - Kiểm tra own property:

```javascript
// hasOwnProperty chỉ kiểm tra own properties
const person = {
  name: "John",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};

console.log(person.hasOwnProperty("name")); // true
console.log(person.hasOwnProperty("greet")); // true
console.log(person.hasOwnProperty("toString")); // false (từ prototype)
```

### `in` operator - Kiểm tra property trong prototype chain:

```javascript
// in operator kiểm tra cả prototype chain
const person = {
  name: "John",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};

console.log("name" in person); // true (own)
console.log("greet" in person); // true (own)
console.log("toString" in person); // true (từ prototype)
```

### So sánh:

```javascript
const arr = [1, 2, 3];

// hasOwnProperty - chỉ own properties
console.log(arr.hasOwnProperty("0")); // true
console.log(arr.hasOwnProperty("map")); // false (từ prototype)

// in operator - cả prototype chain
console.log("0" in arr); // true
console.log("map" in arr); // true (từ prototype)
```

### Use cases:

```javascript
// ✅ Dùng hasOwnProperty khi:
// - Chỉ muốn own properties
function copyOwnProperties(source, target) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
  return target;
}

// ✅ Dùng in operator khi:
// - Kiểm tra property tồn tại
function hasProperty(obj, prop) {
  return prop in obj;
}
```

### Best Practices:

```javascript
// ✅ Dùng hasOwnProperty cho:
// - Copy own properties
// - Enumerate own properties
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key, obj[key]);
  }
}

// ✅ Dùng Object.keys() cho own properties
const keys = Object.keys(obj);
keys.forEach((key) => console.log(key, obj[key]));
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng in khi chỉ muốn own properties
for (const key in obj) {
  console.log(key, obj[key]); // Có thể lấy từ prototype
}

// ✅ Nên dùng hasOwnProperty hoặc Object.keys()
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key, obj[key]);
  }
}
```

---

## `Object.keys()`, `Object.values()`, `Object.entries()`?

### Mục đích / Purpose

Các **Object methods** này được thiết kế để:

- Lấy keys/values/entries
- Transform objects
- Iterate properties
- Create maps/arrays

### Khi nào dùng / When to Use

| Method             | Khi nào dùng           |
| ------------------ | ---------------------- | --------------------- |
| `Object.keys()`    | Lấy keys của object    | Enumerate properties  |
| `Object.values()`  | Lấy values của object  | Transform data        |
| `Object.entries()` | Lấy [key, value] pairs | Convert object to Map |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Iteration**: Dễ dàng iterate properties
- **Transformation**: Convert objects
- **Functional**: Functional programming
- **Clean code**: Code gọn hơn loops

### Ưu nhược điểm / Pros & Cons

| Method             | Ưu điểm          | Nhược điểm                |
| ------------------ | ---------------- | ------------------------- |
| `Object.keys()`    | Functional style | Không bao gồm symbol keys |
| `Object.values()`  | Concise          | Không bao gồm keys        |
| `Object.entries()` | Flexible         | Verbose hơn loops         |

### `Object.keys()` - Lấy keys:

```javascript
// Object.keys() - trả về array của own enumerable keys
const obj = {
  name: "John",
  age: 25,
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};

console.log(Object.keys(obj)); // ['name', 'age', 'greet']

// Không bao gồm prototype properties
Object.prototype.extra = "extra";
console.log(Object.keys(obj)); // ['name', 'age', 'greet'] (không có 'extra')
```

### `Object.values()` - Lấy values:

```javascript
// Object.values() - trả về array của own enumerable values
const obj = {
  name: "John",
  age: 25,
};

console.log(Object.values(obj)); // ['John', 25]
```

### `Object.entries()` - Lấy [key, value] pairs:

```javascript
// Object.entries() - trả về array của [key, value] pairs
const obj = {
  name: "John",
  age: 25,
};

console.log(Object.entries(obj));
// [['name', 'John'], ['age', 25]]

// Dùng với for...of
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`);
}
```

### Best Practices:

```javascript
// ✅ Dùng Object.keys() cho:
// - Enumerate properties
// - Functional operations
const keys = Object.keys(obj);
keys.forEach((key) => console.log(key, obj[key]));

// ✅ Dùng Object.values() cho:
// - Extract values
const values = Object.values(obj);
console.log(values);

// ✅ Dùng Object.entries() cho:
// - Convert object to Map
const map = new Map(Object.entries(obj));
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng Object.keys() với for...in
const keys = Object.keys(obj);
for (const i = 0; i < keys.length; i++) {
  console.log(keys[i], obj[keys[i]]);
}

// ✅ Nên dùng forEach
Object.keys(obj).forEach((key) => console.log(key, obj[key]));
```

---

## `Object.assign()`?

### Mục đích / Purpose

**Object.assign()** được thiết kế để:

- Merge objects
- Copy properties
- Default values
- Shallow copy

### Khi nào dùng / When to Use

Object.assign() nên dùng khi:

- Merge objects
- Copy properties
- Default values
- Shallow copy

### Giúp ích gì / Benefits

**Lợi ích:**

- **Merge**: Kết hợp objects
- **Copy**: Copy properties
- **Defaults**: Set default values
- **Clean**: Code gọn hơn spread operator

### Ưu nhược điểm / Pros & Cons

| Ưu điểm          | Nhược điểm   |
| ---------------- | ------------ | ------------------------------ |
| Clean syntax     | Shallow copy | Có thể gây unexpected behavior |
| Defaults support | Flexible     | Mutates target object          |

### Shallow copy:

```javascript
// Object.assign() là shallow copy
const original = {
  name: "John",
  address: {
    city: "New York",
  },
};

const copy = Object.assign({}, original);

copy.address.city = "Boston";
console.log(original.address.city); // 'New York'
console.log(copy.address.city); // 'Boston' (original bị ảnh hưởng)
```

### Merge objects:

```javascript
// Merge objects
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };

const result = Object.assign(target, source1, source2);
console.log(result); // { a: 1, b: 2, c: 3 }
console.log(target); // { a: 1, b: 2, c: 3 } (target bị thay đổi)
```

### Default values:

```javascript
// Set default values
function createUser(options) {
  const defaults = {
    name: "Anonymous",
    age: 0,
    active: true,
  };

  return Object.assign({}, defaults, options);
}

const user1 = createUser({ name: "John" });
console.log(user1); // { name: 'John', age: 0, active: true }

const user2 = createUser({ age: 25 });
console.log(user2); // { name: 'Anonymous', age: 25, active: true }
```

### Best Practices:

```javascript
// ✅ Dùng Object.assign() cho:
// - Merge objects
const result = Object.assign({}, defaults, options);

// ✅ Tạo object mới để tránh mutation
const result = Object.assign({}, defaults, options);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng Object.assign() để deep copy
const deepCopy = Object.assign(original);
deepCopy.nested.prop = "modified"; // original cũng bị ảnh hưởng

// ✅ Nên dùng deep copy function
const deepCopy = JSON.parse(JSON.stringify(original));
```

---

## `Object.freeze()`, `Object.seal()`?

### Mục đích / Purpose

**Object.freeze()** và **Object.seal()** được thiết kế để:

- Đóng băng object
- Đóng object
- Prevent modifications
- Immutability

### Khi nào dùng / When to Use

| Method            | Khi nào dùng     |
| ----------------- | ---------------- | ------------------------------------ |
| `Object.freeze()` | Đóng băng object | Immutability, prevent changes        |
| `Object.seal()`   | Đóng object      | Prevent add/delete, cho phép sửa đổi |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Immutability**: Không thể thay đổi
- **Prevent bugs**: Tránh unintended changes
- **Predictable**: Code dự đoán được
- **Safety**: Data protection

### Ưu nhược điểm / Pros & Cons

| Method            | Ưu điểm            | Nhược điểm        |
| ----------------- | ------------------ | ----------------- | ------------------ |
| `Object.freeze()` | Immutability       | Không thể sửa đổi | Shallow copy       |
| `Object.seal()`   | Prevent add/delete | Có thể sửa đổi    | Verbose hơn freeze |

### `Object.freeze()` - Đóng băng object:

```javascript
// Object.freeze() - ngăn thêm/xóa/sửa đổi
const obj = {
  name: "John",
  age: 25,
};

Object.freeze(obj);

// Không thể thêm property
obj.city = "New York"; // Bị bỏ qua (strict mode: TypeError)

// Không thể xóa property
delete obj.age; // false (strict mode: TypeError)

// Không thể sửa đổi
obj.name = "Jane"; // Bị bỏ qua (strict mode: TypeError)

// Có thể đọc
console.log(obj.name); // 'John'
```

### `Object.seal()` - Đóng object:

```javascript
// Object.seal() - ngăn thêm/xóa, cho phép sửa đổi
const obj = {
  name: "John",
  age: 25,
};

Object.seal(obj);

// Không thể thêm property
obj.city = "New York"; // Bị bỏ qua (strict mode: TypeError)

// Không thể xóa property
delete obj.age; // false (strict mode: TypeError)

// Có thể sửa đổi
obj.name = "Jane"; // OK
console.log(obj.name); // 'Jane'
```

### So sánh:

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { a: 1, b: 2 };

Object.freeze(obj1);
Object.seal(obj2);

// freeze - không thể sửa đổi
obj1.a = 10; // Bị bỏ qua

// seal - có thể sửa đổi
obj2.a = 10; // OK
```

### Deep freeze:

```javascript
// Object.freeze() là shallow
const obj = {
  name: "John",
  address: {
    city: "New York",
  },
};

Object.freeze(obj);
obj.address.city = "Boston"; // Có thể sửa đổi nested object!
```

### Best Practices:

```javascript
// ✅ Dùng Object.freeze() cho:
// - Immutable data
// - Configuration objects
const config = Object.freeze({
  apiUrl: "https://api.example.com",
  timeout: 5000,
});

// ✅ Dùng Object.seal() cho:
// - Objects cần bảo vệ
// - Cho phép sửa đổi
const user = Object.seal({
  name: "John",
  age: 25,
});
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng Object.freeze() cho nested objects
const obj = {
  name: "John",
  nested: {
    value: 1,
  },
};

Object.freeze(obj);
obj.nested.value = 2; // Có thể sửa đổi nested object!

// ✅ Nên dùng deep freeze
function deepFreeze(obj) {
  Object.freeze(obj);

  Object.getOwnPropertyNames(obj).forEach((name) => {
    const value = obj[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  });
}
```
