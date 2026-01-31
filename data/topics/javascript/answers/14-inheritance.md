# 14. Inheritance

## Tổng quan về Inheritance

### Mục đích của Inheritance / Purpose

**Inheritance** là cơ chế cho phép class con kế thừa properties và methods từ class cha.

**Mục đích chính:**

- Code reuse
- Hierarchical organization
- Polymorphism
- OOP patterns

### Khi nào cần hiểu về Inheritance / When to Use

Hiểu về Inheritance là cần thiết khi:

- OOP programming
- Code reuse
- Class hierarchy
- Framework/library development

### Giúp ích gì / Benefits

**Lợi ích:**

- **Code reuse**: Reuse code
- **Organization**: Hierarchical organization
- **Polymorphism**: Override behavior
- **OOP**: Object-oriented programming

### Ưu nhược điểm / Pros & Cons

| Ưu điểm      | Nhược điểm            |
| ------------ | --------------------- | ------------------------ |
| Code reuse   | Flexible              | Prototype chain phức tạp |
| Organization | Dễ maintain           | Có thể gây confusion     |
| Polymorphism | Powerful              | Có thể gây bugs          |
| OOP          | Verbose hơn functions | Learning curve           |

---

## Prototype-based inheritance?

**Prototype-based inheritance** - JavaScript sử dụng prototype chain để implement inheritance.

### Mục đích / Purpose

**Prototype-based inheritance** được thiết kế để:

- Inheritance trong JavaScript
- Code reuse
- Dynamic behavior
- OOP patterns

### Khi nào dùng / When to Use

Prototype-based inheritance nên dùng khi:

- Implement inheritance
- Code reuse
- Dynamic behavior
- OOP patterns

### Giúp ích gì / Benefits

**Lợi ích:**

- **Inheritance**: Kế thừa dễ dàng
- **Code reuse**: Reuse code
- **Dynamic**: Dynamic behavior
- **OOP**: Object-oriented programming

### Ưu nhược điểm / Pros & Cons

| Ưu điểm     | Nhược điểm          |
| ----------- | ------------------- | ------------------------ |
| Inheritance | Dễ kế thừa          | Prototype chain phức tạp |
| Code reuse  | Flexible            | Có thể gây confusion     |
| Dynamic     | Dynamic behavior    | Có thể gây bugs          |
| OOP         | Verbose hơn classes | Learning curve           |

### Prototype-based inheritance:

```javascript
// Tạo object với prototype
const animal = {
  speak() {
    console.log(`${this.name} makes a sound`);
  },
};

const dog = Object.create(animal);
dog.name = "Rex";
dog.breed = "Labrador";

// Method từ prototype
dog.speak(); // 'Rex makes a sound'

// Own property
console.log(dog.breed); // 'Labrador'
```

### Prototype chain:

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

// Lookup chain
child.childMethod(); // 'Child method'
child.parentMethod(); // 'Parent method'
child.grandMethod(); // 'Grand method'
```

### Best Practices:

```javascript
// ✅ Dùng prototype-based inheritance cho:
// - Simple objects
// - Dynamic behavior
const animal = {
  speak() {
    console.log(`${this.name} makes a sound`);
  },
};

const dog = Object.create(animal);
dog.name = "Rex";
dog.speak();
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên thay đổi prototype của built-in objects
Array.prototype.customMethod = function () {
  console.log("Custom method");
};

// ✅ Nên dùng Object.create
const customArray = Object.create(Array.prototype);
```

---

## Class-based inheritance (ES6+)?

**Class-based inheritance** - ES6 classes cung cấp syntax dễ đọc hơn cho prototype-based inheritance.

### Mục đích / Purpose

**Class-based inheritance** được thiết kế để:

- Simplify OOP syntax
- Prototype-based inheritance
- Code organization
- Modern JavaScript

### Khi nào dùng / When to Use

Class-based inheritance nên dùng khi:

- OOP programming
- Code organization
- Inheritance
- Modern JavaScript development

### Giúp ích gì / Benefits

**Lợi ích:**

- **Simplified**: Code ngắn gọn hơn
- **Familiar**: Quen thuộc với OOP
- **Modern**: Modern JavaScript syntax
- **Consistent**: Consistent syntax

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm                     |
| ------------- | ------------------------------ | ------------------------ |
| Simplified    | Code ngắn gọn hơn              | Verbose hơn functions    |
| Familiar      | Quen thuộc với OOP             | Learning curve           |
| Modern syntax | Cần transpile cho old browsers | Prototype chain phức tạp |
| Consistent    | Consistent syntax              | Learning curve           |

### Class-based inheritance:

```javascript
// Parent class
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

// Child class extends parent
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  bark() {
    console.log("Woof!");
  }
}

const dog = new Dog("Rex", "Labrador");
dog.speak(); // 'Rex makes a sound'
dog.bark(); // 'Woof!'
```

### Overriding methods:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  // Override method
  speak() {
    console.log(`Woof! (${this.name})`); // Override
  }
}

const dog = new Dog("Rex", "Labrador");
dog.speak(); // 'Woof! (Rex)'
```

### Best Practices:

```javascript
// ✅ Dùng class-based inheritance cho:
// - OOP programming
// - Code organization
// - Inheritance
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  bark() {
    console.log("Woof!");
  }
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng class cho simple utilities
// class Utility { ... }

// ✅ Nên dùng regular functions
function utility() { ... }
```

---

## `extends` và `super`?

**`extends`** - Tạo class con kế thừa từ class cha.
**`super`** - Truy cập parent class trong subclass.

### Mục đích / Purpose

**`extends` và `super`** được thiết kế để:

- Tạo inheritance
- Gọi parent constructor
- Gọi parent methods
- Access parent properties

### Khi nào dùng / When to Use

`extends` và `super` nên dùng khi:

- Tạo inheritance
- Gọi parent constructor
- Override methods
- Access parent properties

### Giúp ích gì / Benefits

**Lợi ích:**

- **Inheritance**: Kế thừa dễ dàng
- **Parent access**: Truy cập parent
- **Method calls**: Gọi parent methods
- **Override**: Override behavior

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm |
| ------------- | ---------- | ------------------------ |
| Inheritance   | Dễ kế thừa | Prototype chain phức tạp |
| Parent access | Flexible   | Có thể gây bugs          |
| Method calls  | Powerful   | Có thể gây bugs          |
| Override      | Powerful   | Có thể gây bugs          |

### `extends` - Tạo inheritance:

```javascript
// Parent class
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

// Child class extends parent
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  bark() {
    console.log("Woof!");
  }
}

const dog = new Dog("Rex", "Labrador");
dog.speak(); // 'Rex makes a sound'
dog.bark(); // 'Woof!'
```

### `super` - Gọi parent constructor:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    // Phải gọi super() trước khi dùng this
    super(name);
    this.breed = breed;
  }
}

const dog = new Dog("Rex", "Labrador");
console.log(dog.name); // 'Rex'
console.log(dog.breed); // 'Labrador'
```

### `super` - Gọi parent methods:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  bark() {
    console.log("Woof!");
  }

  // Gọi method của parent
  parentSpeak() {
    super.speak();
    console.log("Woof!");
  }
}
```

### Best Practices:

```javascript
// ✅ Dùng extends và super cho:
// - Inheritance
// - Gọi parent constructor
// - Override methods
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng super khi không có parent
class Orphan extends Object {
  constructor() {
    super(); // ReferenceError
  }
}

// ✅ Nên dùng super khi có parent
class Child extends Parent {
  constructor() {
    super();
  }
}
```

---

## Method overriding?

**Method overriding** - Child class có thể override method của parent class.

### Mục đích / Purpose

**Method overriding** được thiết kế để:

- Override behavior
- Customize parent behavior
- Polymorphism
- OOP patterns

### Khi nào dùng / When to Use

Method overriding nên dùng khi:

- Override behavior
- Customize parent behavior
- Polymorphism
- OOP patterns

### Giúp ích gì / Benefits

**Lợi ích:**

- **Override**: Override behavior
- **Customize**: Customize parent behavior
- **Polymorphism**: Polymorphism
- **OOP**: Object-oriented programming

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm            |
| ----------------- | --------------------- | -------------------- |
| Override behavior | Powerful              | Có thể gây bugs      |
| Customize         | Flexible              | Có thể gây confusion |
| Polymorphism      | Powerful              | Có thể gây bugs      |
| OOP               | Verbose hơn functions | Learning curve       |

### Method overriding:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  // Override method
  speak() {
    console.log(`Woof! (${this.name})`); // Override
  }
}

const dog = new Dog("Rex", "Labrador");
dog.speak(); // 'Woof! (Rex)'
```

### Gọi parent method trong override:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  // Override method với super
  speak() {
    super.speak(); // Gọi parent method
    console.log(`Woof! (${this.name})`); // Override
  }
}

const dog = new Dog("Rex", "Labrador");
dog.speak(); // 'Rex makes a sound'
// 'Woof! (Rex)'
```

### Best Practices:

```javascript
// ✅ Dùng method overriding cho:
// - Override behavior
// - Customize parent behavior
class Dog extends Animal {
  speak() {
    super.speak();
    console.log(`Woof! (${this.name})`);
  }
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên override method mà không gọi super
class Bad extends Animal {
  speak() {
    // Không gọi super.speak()
    console.log(`${this.name} makes a sound`);
  }
}

// ✅ Nên gọi super khi override
class Good extends Animal {
  speak() {
    super.speak();
    console.log(`${this.name} makes a sound`); // Override
  }
}
```

---

## Multiple inheritance?

JavaScript không hỗ trợ multiple inheritance trực tiếp, nhưng có thể đạt được thông qua mixins hoặc composition.

### Mục đích / Purpose

**Multiple inheritance** được thiết kế để:

- Kế thừa từ nhiều sources
- Code reuse
- Composition
- Mixin patterns

### Khi nào dùng / When to Use

Multiple inheritance nên dùng khi:

- Kế thừa từ nhiều sources
- Code reuse
- Composition
- Mixin patterns

### Giúp ích gì / Benefits

**Lợi ích:**

- **Multiple sources**: Kế thừa từ nhiều sources
- **Code reuse**: Reuse code
- **Composition**: Flexible composition
- **Mixins**: Mixin patterns

### Ưu nhược điểm / Pros & Cons

| Ưu điểm          | Nhược điểm |
| ---------------- | ---------- | -------------------- |
| Multiple sources | Flexible   | Verbose hơn          |
| Code reuse       | Reuse code | Có thể gây confusion |
| Composition      | Flexible   | Có thể gây bugs      |
| Mixins           | Powerful   | Có thể gây bugs      |

### Mixin pattern:

```javascript
// Mixin - reusable behavior
const flyable = {
  fly() {
    console.log(`${this.name} is flying`);
  },
};

const swimmable = {
  swim() {
    console.log(`${this.name} is swimming`);
  },
};

// Object.assign để mix
const duck = Object.assign({}, { name: "Duck" }, flyable, swimmable);

duck.fly(); // 'Duck is flying'
duck.swim(); // 'Duck is swimming'
```

### Mixin với classes:

```javascript
// Mixin function
function Flyable(Base) {
  return class extends Base {
    fly() {
      console.log(`${this.name} is flying`);
    }
  };
}

// Apply mixin
class Duck extends Flyable(Animal) {
  constructor(name) {
    super(name);
  }
}

const duck = new Duck("Duck");
duck.fly(); // 'Duck is flying'
```

### Composition:

```javascript
// Composition - compose behavior
class Flyer {
  fly() {
    console.log("Flying");
  }
}

class Swimmer {
  swim() {
    console.log("Swimming");
  }
}

class Duck {
  constructor(name) {
    this.name = name;
    this.flyer = new Flyer();
    this.swimmer = new Swimmer();
  }

  fly() {
    this.flyer.fly();
  }

  swim() {
    this.swimmer.swim();
  }
}

const duck = new Duck("Duck");
duck.fly(); // 'Flying'
duck.swim(); // 'Swimming'
```

### Best Practices:

```javascript
// ✅ Dùng mixins cho:
// - Reusable behavior
// - Code reuse
const flyable = {
  fly() {
    console.log(`${this.name} is flying`);
  },
};

const duck = Object.assign({}, { name: "Duck" }, flyable);
duck.fly();
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng extends cho multiple inheritance
class Duck extends Animal, Flyer {
  // SyntaxError
}

// ✅ Nên dùng mixins hoặc composition
const duck = Object.assign({}, { name: "Duck" }, flyable, swimmable);
```

---

## `instanceof` operator?

**`instanceof`** - Kiểm tra object có phải instance của class không.

### Mục đích / Purpose

**`instanceof`** được thiết kế để:

- Kiểm tra type
- Type checking
- Debugging
- Type safety

### Khi nào dùng / When to Use

`instanceof` nên dùng khi:

- Kiểm tra type
- Type checking
- Debugging
- Type safety

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type checking**: Kiểm tra type
- **Debugging**: Dễ dàng debug
- **Safety**: Type safety
- **Clear**: Code rõ ràng

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm   |
| ------------- | ------------ | ------------------------------- |
| Type checking | Dễ debug     | Không hoạt động với cross-frame |
| Debugging     | Rõ ràng      | Có thể gây confusion            |
| Safety        | Type safety  | Verbose hơn typeof              |
| Clear         | Code rõ ràng | Learning curve                  |

### Basic usage:

```javascript
// Kiểm tra instance
class Animal {}
class Dog extends Animal {}

const dog = new Dog();

console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true
console.log(dog instanceof Object); // true
```

### With built-in types:

```javascript
// Built-in types
const arr = [1, 2, 3];
const obj = { name: "John" };
const str = "Hello";
const num = 42;

console.log(arr instanceof Array); // true
console.log(obj instanceof Object); // true
console.log(str instanceof String); // false (primitive)
console.log(num instanceof Number); // false (primitive)

// Với objects
console.log(new String("Hello") instanceof String); // true
console.log(new Number(42) instanceof Number); // true
```

### Best Practices:

```javascript
// ✅ Dùng instanceof cho:
// - Type checking
// - Debugging
// - Type safety
if (obj instanceof Dog) {
  obj.bark();
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng instanceof với primitives
const str = "Hello";
console.log(str instanceof String); // false

// ✅ Nên dùng typeof cho primitives
console.log(typeof str === "string"); // true
```

---

## `Object.getPrototypeOf()`?

**`Object.getPrototypeOf()`** - Lấy prototype của object.

### Mục đích / Purpose

**`Object.getPrototypeOf()`** được thiết kế để:

- Lấy prototype
- Debugging
- Inspect prototype chain
- Understand inheritance

### Khi nào dùng / When to Use

`Object.getPrototypeOf()` nên dùng khi:

- Lấy prototype
- Debugging
- Inspect prototype chain
- Understand inheritance

### Giúp ích gì / Benefits

**Lợi ích:**

- **Get prototype**: Lấy prototype
- **Debugging**: Dễ dàng debug
- **Inspect**: Inspect prototype chain
- **Understand**: Hiểu inheritance

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm       |
| ------------- | ---------------- | --------------------- |
| Get prototype | Dễ debug         | Verbose hơn **proto** |
| Debugging     | Rõ ràng          | Learning curve        |
| Inspect       | Inspect chain    | Có thể gây confusion  |
| Understand    | Hiểu inheritance | Verbose hơn           |

### Basic usage:

```javascript
// Lấy prototype
const obj = { name: "John" };
const proto = Object.getPrototypeOf(obj);

console.log(proto === Object.prototype); // true
```

### With classes:

```javascript
// Lấy prototype của class
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}

const dog = new Dog("Rex", "Labrador");

console.log(Object.getPrototypeOf(dog) === Dog.prototype); // true
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // true
```

### With built-in types:

```javascript
// Built-in types
const arr = [1, 2, 3];
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true

const obj = { name: "John" };
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
```

### Best Practices:

```javascript
// ✅ Dùng Object.getPrototypeOf() cho:
// - Lấy prototype
// - Debugging
// - Inspect prototype chain
const proto = Object.getPrototypeOf(obj);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng __proto__
const proto = obj.__proto__;

// ✅ Nên dùng Object.getPrototypeOf()
const proto = Object.getPrototypeOf(obj);
```

---

## `Object.setPrototypeOf()`?

**`Object.setPrototypeOf()`** - Set prototype của object.

### Mục đích / Purpose

**`Object.setPrototypeOf()`** được thiết kế để:

- Set prototype
- Change prototype
- Dynamic inheritance
- Runtime inheritance

### Khi nào dùng / When to Use

`Object.setPrototypeOf()` nên dùng khi:

- Set prototype
- Change prototype
- Dynamic inheritance
- Runtime inheritance

### Giúp ích gì / Benefits

**Lợi ích:**

- **Set prototype**: Set prototype
- **Change**: Change prototype
- **Dynamic**: Dynamic inheritance
- **Runtime**: Runtime inheritance

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm          |
| ------------- | ------------------- | ------------------ |
| Set prototype | Flexible            | Performance impact |
| Change        | Dynamic             | Có thể gây bugs    |
| Dynamic       | Runtime inheritance | Verbose hơn        |
| Runtime       | Flexible            | Learning curve     |

### Basic usage:

```javascript
// Set prototype
const animal = {
  speak() {
    console.log(`${this.name} makes a sound`);
  },
};

const dog = { name: "Rex" };

Object.setPrototypeOf(dog, animal);
dog.speak(); // 'Rex makes a sound'
```

### Change prototype:

```javascript
// Change prototype
const proto1 = {
  method1() {
    console.log("Method 1");
  },
};

const proto2 = {
  method2() {
    console.log("Method 2");
  },
};

const obj = { name: "Object" };

Object.setPrototypeOf(obj, proto1);
obj.method1(); // 'Method 1'

Object.setPrototypeOf(obj, proto2);
obj.method2(); // 'Method 2'
```

### Best Practices:

```javascript
// ✅ Dùng Object.setPrototypeOf() cho:
// - Set prototype
// - Change prototype
// - Dynamic inheritance
const animal = {
  speak() {
    console.log(`${this.name} makes a sound`);
  },
};

const dog = { name: "Rex" };
Object.setPrototypeOf(dog, animal);
dog.speak();
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng Object.setPrototypeOf() trong hot code paths
for (let i = 0; i < 10000; i++) {
  Object.setPrototypeOf(obj, proto); // Performance impact!
}

// ✅ Nên dùng Object.create() thay vì set prototype sau
const obj = Object.create(proto);
```
