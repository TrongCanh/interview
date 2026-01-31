# 40. Implement `new` operator / Triển Khai New Operator

## Tổng quan về New Operator

### Mục đích của New Operator / Purpose

**New operator** là operator tạo một instance của constructor function với optional arguments.

**Mục đích chính:**

- Create object instances
- Set prototype chain
- Pass arguments to constructor
- Custom object creation

### Khi nào nên dùng / When to Use

- Khi cần implement `new` operator
- Khi muốn understand `new` behavior
- Khi muốn custom object creation

### Giúp ích gì / Benefits

**Lợi ích:**

- **Understanding**: Hiểu `new` behavior
- **Custom**: Custom object creation
- **Prototype**: Set prototype chain
- **Flexible**: Flexible object creation

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm       | Giải thích               |
| ------------- | ------------------------ |
| Understanding | Hiểu `new` behavior      |
| Custom        | Custom object creation   |
| Prototype     | Set prototype chain      |
| Flexible      | Flexible object creation |

**Nhược điểm (Cons):**

| Nhược điểm  | Giải thích            |
| ----------- | --------------------- |
| Complexity  | Code phức tạp hơn     |
| Performance | Có thể chậm hơn `new` |
| Edge cases  | Cần handle edge cases |

---

## Implement `new` operator?

**Implement `new` operator** là viết function để mimic `new` operator behavior.

### Mục đích / Purpose

- Tạo `new` operator implementation
- Create object instances
- Set prototype chain
- Handle constructor return

### Khi nào dùng / When to Use

- Khi cần `new` operator polyfill
- Khi muốn understand `new` behavior
- Khi muốn custom object creation

### Ví dụ:

```javascript
// Method 1: Basic `new` operator implementation
function myNew(Constructor, ...args) {
  // Create new object với Constructor.prototype
  const obj = Object.create(Constructor.prototype);

  // Call constructor với `this` set to obj
  const result = Constructor.apply(obj, args);

  // Return result nếu là object (constructor có thể return object)
  return typeof result === "object" ? result : obj;
}

// Usage
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, ${this.name}!`;
};

const person = myNew(Person, "John");
console.log(person.greet()); // Hello, John!
console.log(person instanceof Person); // true

// Method 2: `new` operator với constructor return object
function Person(name) {
  this.name = name;
  return this; // Return this
}

Person.prototype.greet = function () {
  return `Hello, ${this.name}!`;
};

const person = myNew(Person, "John");
console.log(person); // Person { name: 'John' }
console.log(person.greet()); // Hello, John!

// Method 3: `new` operator với null/undefined constructor
function myNew(Constructor, ...args) {
  // Handle null/undefined constructor
  if (Constructor === null || Constructor === undefined) {
    return {};
  }

  const obj = Object.create(Constructor.prototype);
  const result = Constructor.apply(obj, args);

  return typeof result === "object" ? result : obj;
}

// Method 4: `new` operator với primitive return
function NumberWrapper(value) {
  this.value = value;
  return Number(value); // Return primitive
}

const wrapper = myNew(NumberWrapper, 42);
console.log(wrapper); // 42 (primitive)
console.log(wrapper instanceof NumberWrapper); // false

// Method 5: `new` operator với arrow function
const ArrowPerson = (name) => {
  this.name = name;
};

ArrowPerson.prototype.greet = function () {
  return `Hello, ${this.name}!`;
};

const person = myNew(ArrowPerson, "John");
console.log(person.greet()); // Hello, John!
console.log(person instanceof ArrowPerson); // true
```

### Best Practices:

```javascript
// ✅ Dùng `new` operator để create instances
const instance = myNew(Constructor, arg1, arg2);

// ✅ Handle constructor return
const result = myNew(Constructor, args);

// ✅ Set prototype chain
const obj = Object.create(Constructor.prototype);

// ✅ Handle null/undefined constructor
if (Constructor === null) {
  return {};
}

// ❌ Tránh `new` operator cho functions không phải constructor
const bad = myNew(arrowFunction, args);
// Arrow functions không thể dùng với `new`

// ✅ Dùng `new` operator cho constructor functions
const good = myNew(Constructor, args);
```

---

## Test Cases

```javascript
// Test 1: Basic `new` operator
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, ${this.name}!`;
};

const person = myNew(Person, "John");
console.log(person.greet()); // Hello, John!
console.log(person instanceof Person); // true

// Test 2: `new` với constructor return object
function Person(name) {
  this.name = name;
  return this;
}

const person = myNew(Person, "John");
console.log(person); // Person { name: 'John' }
console.log(person.greet()); // Hello, John!

// Test 3: `new` với multiple arguments
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person = myNew(Person, "John", 30);
console.log(person.name); // John
console.log(person.age); // 30

// Test 4: `new` với prototype methods
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, ${this.name}!`;
};

const person = myNew(Person, "John");
console.log(person.greet()); // Hello, John!

// Test 5: `new` với null constructor
const result = myNew(null, "arg");
console.log(result); // {}

// Test 6: `new` với undefined constructor
const result = myNew(undefined, "arg");
console.log(result); // {}
```

---

## Complete Implementation

```javascript
/**
 * Implement new operator
 * @param {Function} Constructor - Constructor function
 * @param {...*} args - Arguments để pass
 * @returns {*} New instance
 */
function myNew(Constructor, ...args) {
  // Handle null/undefined constructor
  if (Constructor === null || Constructor === undefined) {
    return {};
  }

  // Handle non-constructor
  if (typeof Constructor !== "function") {
    throw new TypeError("Constructor must be a function");
  }

  // Create new object với Constructor.prototype
  const obj = Object.create(Constructor.prototype);

  // Call constructor với `this` set to obj
  const result = Constructor.apply(obj, args);

  // Return result nếu là object (constructor có thể return object)
  return typeof result === "object" ? result : obj;
}

// Usage examples

// Example 1: Basic constructor
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  return `Hello, ${this.name} (${this.age})!`;
};

const person = myNew(Person, "John", 30);
console.log(person.greet()); // Hello, John (30)!

// Example 2: Constructor return object
function User(data) {
  this.data = data;
  return this; // Return this
}

User.prototype.getData = function () {
  return this.data;
};

const user = myNew(User, { name: "John" });
console.log(user); // User { name: 'John' }
console.log(user.getData()); // { name: 'John' }

// Example 3: Constructor với prototype methods
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  return `${this.name} makes a sound`;
};

const dog = myNew(Animal, "Dog");
console.log(dog.speak()); // Dog makes a sound

// Example 4: Multiple inheritance
function Parent(name) {
  this.name = name;
}

function Child(name) {
  Parent.call(this, name);
  this.childMethod = () => `Child method`;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

const child = myNew(Child, "John");
console.log(child instanceof Child); // true
console.log(child instanceof Parent); // true

// Example 5: Constructor với default values
function Person(options = {}) {
  this.name = options.name || "Anonymous";
  this.age = options.age || 0;
}

Person.prototype.greet = function () {
  return `Hello, ${this.name} (${this.age})!`;
};

const person = myNew(Person, { name: "John", age: 30 });
console.log(person.greet()); // Hello, John (30)!
```

---

## Use Cases

```javascript
// 1. Creating instances
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  return `Hello, ${this.name} (${this.age})!`;
};

const person1 = myNew(Person, "John", 30);
const person2 = myNew(Person, "Jane", 25);

// 2. Prototype inheritance
function Parent(name) {
  this.name = name;
}

function Child(name) {
  Parent.call(this, name);
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

const child = myNew(Child, "John");
console.log(child instanceof Parent); // true

// 3. Factory pattern
function createPerson(name, age) {
  return myNew(Person, name, age);
}

const person = createPerson("John", 30);

// 4. Constructor với validation
function Person(name) {
  if (!name) {
    throw new Error("Name is required");
  }
  this.name = name;
}

try {
  const person = myNew(Person, null); // Throws error
} catch (error) {
  console.error("Error:", error.message);
}

// 5. Singleton pattern
function Singleton() {
  if (!Singleton.instance) {
    Singleton.instance = myNew(Singleton);
  }
  return Singleton.instance;
}

Singleton.prototype.method = function () {
  return "Singleton method";
};

const instance1 = Singleton();
const instance2 = Singleton();
console.log(instance1 === instance2); // true
```

---

## Anti-patterns cần tránh

```javascript
// ❌ `new` operator với arrow functions
const ArrowPerson = (name) => {
  this.name = name;
};

const bad = myNew(ArrowPerson, "John");
// Arrow functions không thể dùng với `new`

// ✅ Dùng `new` operator với constructor functions
function Person(name) {
  this.name = name;
}

const good = myNew(Person, "John");

// ❌ Quên handle null/undefined constructor
const badResult = myNew(null, "arg");
// Có thể gây errors

// ✅ Handle null/undefined constructor
if (Constructor === null) {
  return {};
}

// ❌ Không validate constructor type
const badResult = myNew("not-a-function", "arg");
// Sẽ throw TypeError

// ✅ Validate constructor type
if (typeof Constructor !== "function") {
  throw new TypeError("Constructor must be a function");
}

// ❌ Quên return correct value
function BadConstructor() {
  return "not-an-object";
}

function myNewBad(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype);
  const result = Constructor.apply(obj, args);
  return result; // Luôn trả về obj
}

// ✅ Return result nếu là object
function myNewGood(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype);
  const result = Constructor.apply(obj, args);
  return typeof result === "object" ? result : obj;
}
```

---

_References: [MDN new Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)_
