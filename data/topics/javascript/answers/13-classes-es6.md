# 13. Classes (ES6+)

## Tổng quan về Classes (ES6+)

### Mục đích của Classes (ES6+) / Purpose

**Class** trong JavaScript (ES6+) là syntactic sugar cho constructor functions và prototype-based inheritance.

**Mục đích chính:**

- Object-oriented programming
- Code organization
- Inheritance
- Encapsulation
- Modern JavaScript

### Khi nào cần hiểu về Classes / When to Use

Hiểu về Classes là cần thiết khi:

- OOP programming
- Code organization
- Inheritance
- Modern JavaScript development
- Framework/library development

### Giúp ích gì / Benefits

**Lợi ích:**

- **OOP**: Object-oriented programming
- **Organization**: Code tổ chức
- **Inheritance**: Kế thừa dễ dàng hơn
- **Encapsulation**: Private members
- **Modern**: Modern JavaScript syntax

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm                     |
| ------------- | ------------------------------ | ------------------------ |
| OOP           | Code tổ chức                   | Verbose hơn functions    |
| Organization  | Dễ maintain                    | Learning curve           |
| Inheritance   | Dễ kế thừa                     | Prototype chain phức tạp |
| Encapsulation | Private members                | Verbose hơn closures     |
| Modern syntax | Cần transpile cho old browsers | Learning curve           |

---

## Class trong JS thực chất là gì?

**Class** trong JavaScript (ES6+) thực chất là syntactic sugar cho constructor functions và prototype-based inheritance.

### Mục đích / Purpose

**Class** được thiết kế để:

- Simplify OOP syntax
- Prototype-based inheritance
- Code organization
- Modern JavaScript

### Khi nào dùng / When to Use

Classes nên dùng khi:

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
| Modern syntax | Cần transpile cho old browsers | Không support trong IE11 |
| Consistent    | Consistent syntax              | Prototype chain phức tạp |

### Class là syntactic sugar:

```javascript
// Class syntax
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, ${this.name}`);
  }
}

// Tương đương với constructor function
function PersonConstructor(name) {
  this.name = name;
}

PersonConstructor.prototype.greet = function () {
  console.log(`Hello, ${this.name}`);
};

// Cả 2 tạo ra cùng kết quả
const person1 = new Person("John");
const person2 = new PersonConstructor("Jane");

person1.greet(); // 'Hello, John'
person2.greet(); // 'Hello, Jane'
```

### Class prototype:

```javascript
// Class tạo prototype
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, ${this.name}`);
  }
}

console.log(Person.prototype);
// { constructor: Person, greet: [Function] }

const john = new Person("John");
console.log(john.__proto__ === Person.prototype); // true
```

### Class không hoisted:

```javascript
// Class không hoisted
// const p = new Person();  // ReferenceError

class Person {
  constructor(name) {
    this.name = name;
  }
}

const p = new Person("John"); // OK
```

### Best Practices:

```javascript
// ✅ Dùng classes cho:
// - OOP programming
// - Code organization
// - Inheritance
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, ${this.name}`);
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

## Constructor method?

**Constructor** là method đặc biệt được gọi khi tạo instance mới với `new`.

### Mục đích / Purpose

**Constructor** được thiết kế để:

- Khởi tạo instance
- Gán properties
- Setup prototype
- Return instance

### Khi nào dùng / When to Use

Constructor nên dùng khi:

- Tạo objects
- Initialize properties
- Setup inheritance
- OOP patterns

### Giúp ích gì / Benefits

**Lợi ích:**

- **Instance creation**: Tạo object mới
- **Initialization**: Khởi tạo properties
- **Inheritance**: Setup prototype
- **Return**: Return instance

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm |
| ----------------- | ---------- | --------------------------- |
| Instance creation | Flexible   | Phải dùng `new` keyword     |
| Initialization    | Tự động    | Verbose hơn object literals |
| Inheritance       | Dễ kế thừa | Prototype chain phức tạp    |

### Constructor method:

```javascript
// Constructor được gọi với new
class Person {
  constructor(name, age) {
    // this được gán cho instance mới
    this.name = name;
    this.age = age;

    // Methods được gán cho prototype
    this.greet = function () {
      console.log(`Hello, I'm ${this.name}, ${this.age} years old`);
    };
  }

  // return this (ngầm định)
}

const john = new Person("John", 25);
john.greet(); // 'Hello, I'm John, 25 years old'
```

### Default constructor:

```javascript
// Nếu không có constructor, default được tạo
class Empty {}

const empty = new Empty();
console.log(empty); // Empty {}
```

### Constructor với inheritance:

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

### Constructor return value:

```javascript
// Constructor có thể trả về object khác
class Person {
  constructor(name) {
    this.name = name;
    // Trả về object khác
    return { custom: true };
  }
}

const person = new Person("John");
console.log(person); // { custom: true, name: 'John' }
console.log(person instanceof Person); // false!
```

### Best Practices:

```javascript
// ✅ Dùng constructor để:
// - Khởi tạo properties
// - Gán this
// - Return this (ngầm định)
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên trả về object khác trong constructor
class Person {
  constructor(name) {
    this.name = name;
    return { custom: true }; // instance không phải Person!
  }
}

// ✅ Nên luôn return this hoặc không return
class Person {
  constructor(name) {
    this.name = name;
    // return this (ngầm định)
}
```

---

## Static methods và properties?

**Static** methods và properties thuộc về class, không phải instance.

### Mục đích / Purpose

**Static** được thiết kế để:

- Utility functions
- Class-level constants
- Factory methods
- Class configuration
- Shared behavior

### Khi nào dùng / When to Use

Static nên dùng khi:

- Utility functions
- Factory methods
- Class configuration
- Shared behavior

### Giúp ích gì / Benefits

**Lợi ích:**

- **Utility**: Utility functions
- **Factory**: Create instances
- **Config**: Class configuration
- **Shared**: Shared behavior

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm   |
| ----------------- | ------------ | -------------------------------- |
| Utility functions | Dễ reuse     | Không thể truy cập instance data |
| Factory methods   | Flexible     | Không thể truy cập instance data |
| Shared behavior   | Code gọn hơn | Không type safety                |

### Static methods:

```javascript
class MathHelper {
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static divide(a, b) {
    return a / b;
  }
}

console.log(MathHelper.add(5, 3)); // 8
console.log(MathHelper.multiply(4, 3)); // 12
console.log(MathHelper.divide(10, 2)); // 5
```

### Static properties:

```javascript
class Config {
  static API_URL = "https://api.example.com";
  static TIMEOUT = 5000;
  static VERSION = "1.0.0";

  static getConfig() {
    return {
      url: Config.API_URL,
      timeout: Config.TIMEOUT,
      version: Config.VERSION,
    };
  }
}

console.log(Config.getConfig());
// { url: 'https://api.example.com', timeout: 5000, version: '1.0.0' }
```

### Factory methods:

```javascript
class User {
  static fromJSON(json) {
    const data = JSON.parse(json);
    return new User(data.id, data.name);
  }

  static async fetch(id) {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    return new User(data.id, data.name);
  }
}

const user1 = User.fromJSON('{"id":1,"name":"John"}');
const user2 = await User.fetch(2);
const user3 = new User(3, "Jane");
```

### Best Practices:

```javascript
// ✅ Dùng static cho:
// - Utility functions
// - Factory methods
// - Class configuration
class Config {
  static getConfig() {
    return {
      url: Config.API_URL,
      timeout: Config.TIMEOUT,
      version: Config.VERSION,
    };
  }
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng static để truy cập instance data
class Bad {
  constructor(name) {
    this.name = name;
  }

  static getName() {
    return this.name; // Không truy cập instance data!
  }
}

const bad = new Bad("John");
console.log(bad.getName()); // undefined (không phải instance)

// ✅ Nên dùng instance methods cho instance data
class Good {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name; // Truy cập đúng instance data
  }
}

const good = new Good("John");
console.log(good.getName()); // 'John'
```

---

## Private fields (`#`)?

**Private fields** (ES2022) - Properties chỉ truy cập được trong class.

### Mục đích / Purpose

**Private fields** được thiết kế để:

- Encapsulation
- Data hiding
- Prevent external access
- Type safety

### Khi nào dùng / When to Use

Private fields nên dùng khi:

- Encapsulation
- Data hiding
- Type safety
- Prevent modifications

### Giúp ích gì / Benefits

**Lợi ích:**

- **Encapsulation**: Private data
- **Hiding**: Prevent external access
- **Safety**: Type safety
- **Clean code**: Code gọn hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm              |
| ------------- | ----------------------- | --------------------------- |
| Encapsulation | Private data            | Verbose hơn closures        |
| Hiding        | Prevent external access | Không có trong old browsers |
| Safety        | Compile-time checking   | Learning curve              |

### Private fields syntax:

```javascript
// Private field với #
class BankAccount {
  #balance; // Private field

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount > this.#balance) {
      throw new Error("Insufficient funds");
    }
    this.#balance -= amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log(account.getBalance()); // 1300

// Không thể truy cập từ bên ngoài
// console.log(account.#balance);  // SyntaxError
```

### Private methods:

```javascript
class Counter {
  #count = 0;

  #increment() {
    this.#count++;
  }

  increment() {
    this.#increment();
  }

  getCount() {
    return this.#count;
  }
}

const counter = new Counter();
counter.increment();
counter.increment();
console.log(counter.getCount()); // 2

// Không thể gọi private method từ bên ngoài
// counter.#increment();  // SyntaxError
```

### Private static fields:

```javascript
class Config {
  static #API_KEY = "secret-key";

  static getApiKey() {
    return this.#API_KEY;
  }
}

console.log(Config.getApiKey()); // 'secret-key'
// console.log(Config.#API_KEY);  // SyntaxError
```

### Ví dụ thực tế:

```javascript
// Class với private fields
class User {
  #id;
  #name;
  #email;

  constructor(id, name, email) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
  }

  getPublicInfo() {
    return {
      name: this.#name,
      email: this.#email,
    };
  }

  validateEmail() {
    return this.#email.includes("@");
  }
}

const user = new User(1, "John", "john@example.com");
console.log(user.getPublicInfo()); // { name: 'John', email: 'john@example.com' }
console.log(user.validateEmail()); // true

// Private fields không thể truy cập
// console.log(user.#email);  // SyntaxError
```

### Best Practices:

```javascript
// ✅ Dùng private fields cho:
// - Encapsulation
// - Data hiding
// - Type safety
class User {
  #id;
  #name;

  constructor(id, name) {
    this.#id = id;
    this.#name = name;
  }
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng _ convention cho private
class Bad {
  constructor(name) {
    this._name = name; // Convention, không thực sự private
  }
}

// ✅ Nên dùng # cho true private
class Good {
  constructor(name) {
    this.#name = name; // Thực sự private
  }
}
```

---

## Getters và Setters?

**Getters và Setters** - Special methods để truy cập và gán giá trị cho properties.

### Mục đích / Purpose

**Getters và Setters** được thiết kế để:

- Computed properties
- Validation
- Encapsulation
- Lazy computation

### Khi nào dùng / When to Use

Getters/Setters nên dùng khi:

- Computed properties
- Validation trước khi set
- Encapsulation
- Lazy computation

### Giúp ích gì / Benefits

**Lợi ích:**

- **Computed**: Computed properties
- **Validation**: Validate trước khi set
- **Encapsulation**: Hide implementation
- **Lazy computation**: Lazy evaluation

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm                       |
| ------------------- | -------------------------------- | ------------------------- |
| Computed properties | Dynamic values                   | Verbose hơn direct access |
| Validation          | Prevent invalid data             | Có thể verbose hơn        |
| Encapsulation       | Hide implementation              | Learning curve            |
| Lazy computation    | Có thể chậm hơn eager evaluation |

### Getters và Setters:

```javascript
class Person {
  #name; // Private field

  constructor(name) {
    this.#name = name;
  }

  // Getter
  get name() {
    return this.#name.toUpperCase();
  }

  // Setter
  set name(newName) {
    if (typeof newName !== "string") {
      throw new Error("Name must be a string");
    }
    this.#name = newName.trim();
  }
}

const person = new Person("john");
console.log(person.name); // 'JOHN' (getter)
person.name = "jane";
console.log(person.name); // 'JANE' (setter)
```

### Computed properties:

```javascript
class Rectangle {
  #width;
  #height;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
  }

  get area() {
    return this.#width * this.#height;
  }

  get perimeter() {
    return 2 * (this.#width + this.#height);
  }
}

const rect = new Rectangle(5, 3);
console.log(rect.area()); // 15
console.log(rect.perimeter()); // 16
```

### Validation với setters:

```javascript
class Temperature {
  #celsius;

  constructor(celsius) {
    this.#celsius = celsius;
  }

  get celsius() {
    return this.#celsius;
  }

  set celsius(value) {
    if (value < -273.15) {
      throw new Error("Temperature below absolute zero");
    }
    this.#celsius = value;
  }

  get fahrenheit() {
    return (this.#celsius * 9) / 5 + 32;
  }

  set fahrenheit(value) {
    this.#celsius = ((value - 32) * 5) / 9;
  }
}

const temp = new Temperature(0);
console.log(temp.celsius); // 0
console.log(temp.fahrenheit()); // 32
temp.fahrenheit = 100;
console.log(temp.celsius); // 37.78
```

### Static getters/setters:

```javascript
class Config {
  static #apiKey = "secret";

  static get apiKey() {
    return this.#apiKey;
  }

  static set apiKey(value) {
    if (value.length < 10) {
      throw new Error("API key too short");
    }
    this.#apiKey = value;
  }
}

console.log(Config.apiKey); // 'secret'
Config.apiKey = "new-key"; // OK
```

### Best Practices:

```javascript
// ✅ Dùng getters/setters cho:
// - Computed properties
// - Validation
// - Encapsulation
class Person {
  #name;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name.toUpperCase();
  }

  set name(newName) {
    if (typeof newName !== "string") {
      throw new Error("Name must be a string");
    }
    this.#name = newName.trim();
  }
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng getters/setters cho side effects
class Bad {
  #count = 0;

  get count() {
    console.log(this.#count++); // Side effect!
    return this.#count;
  }
}

// ✅ Nên dùng methods thay vì getters/setters
class Good {
  #count = 0;

  increment() {
    this.#count++;
  }

  getCount() {
    return this.#count;
  }
}
```

---

## Class fields?

**Class fields** - Properties được khai báo ở top-level của class body (ES2022).

### Mục đích / Purpose

**Class fields** được thiết kế để:

- Khai báo properties
- Initial values
- Computed properties
- Private/public separation

### Khi nào dùng / When to Use

Class fields nên dùng khi:

- Khai báo properties
- Initial values
- Computed properties
- Default values

### Giúp ích gì / Benefits

**Lợi ích:**

- **Declaration**: Khai báo properties
- **Initialization**: Initial values
- **Computed**: Computed properties
- **Separation**: Private/public separation

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm          |
| -------------- | ------------------- | ------------------------------ |
| Declaration    | Khai báo properties | Verbose hơn constructor        |
| Initialization | Default values      | Có thể gây bugs nếu không đúng |
| Computed       | Dynamic values      | Có thể chậm hơn direct access  |
| Separation     | Clear separation    | Learning curve                 |

### Class fields syntax:

```javascript
// Class fields (ES2022)
class Person {
  // Class fields (ES2022)
  id = 1;
  name = "John";
  age = 25;
  createdAt = new Date();

  constructor(name) {
    // Có thể override trong constructor
    this.name = name;
  }
}

const person = new Person("Jane");
console.log(person.id); // 1
console.log(person.name); // 'Jane'
console.log(person.age); // 25
console.log(person.createdAt); // Current date
```

### Private class fields:

```javascript
class Counter {
  #count = 0; // Private field

  increment() {
    this.#count++;
  }

  getCount() {
    return this.#count;
  }
}

const counter = new Counter();
counter.increment();
console.log(counter.getCount()); // 1
```

### Static class fields:

```javascript
class Config {
  static API_URL = "https://api.example.com";
  static TIMEOUT = 5000;
  static VERSION = "1.0.0";
}
```

### Class fields với initializers:

```javascript
// Field với initializer
class Person {
  // Field với initializer
  id = Math.random();
  name = "Anonymous";
  createdAt = new Date();

  constructor(name) {
    // Có thể override trong constructor
    if (name) {
      this.name = name;
    }
  }
}

const person1 = new Person();
console.log(person1.name); // 'Anonymous'
console.log(person1.createdAt); // Random date

const person2 = new Person("John");
console.log(person2.name); // 'John'
console.log(person2.createdAt); // Different date
```

### Best Practices:

```javascript
// ✅ Dùng class fields cho:
// - Khai báo properties
// - Initial values
// - Default values
class Person {
  id = 1;
  name = "Anonymous";
  age = 0;
  createdAt = new Date();
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng class fields với side effects
class Bad {
  #count = 0;

  increment() {
    this.#count++;
    console.log(this.#count++); // Side effect!
  }
}

// ✅ Nên dùng methods thay vì fields
class Good {
  #count = 0;

  increment() {
    this.#count++;
  }

  getCount() {
    return this.#count;
  }
}
```

---

## `extends` keyword?

**`extends`** - Tạo class con kế thừa từ class cha.

### Mục đích / Purpose

**`extends`** được thiết kế để:

- Tạo inheritance
- Code reuse
- Override methods
- Prototype chain

### Khi nào dùng / When to Use

`extends` nên dùng khi:

- Inheritance
- Code reuse
- Override methods
- Prototype chain

### Giúp ích gì / Benefits

**Lợi ích:**

- **Inheritance**: Kế thừa dễ dàng
- **Code reuse**: Reuse logic
- **Override**: Override methods
- **Prototype chain**: Clean inheritance

### Ưu nhược điểm / Pros & Cons

| Ưu điểm          | Nhược điểm          |
| ---------------- | ------------------- | ------------------------ |
| Inheritance      | Dễ kế thừa          | Prototype chain phức tạp |
| Code reuse       | Flexible            | Có thể gây confusion     |
| Override methods | Powerful            | Có thể gây bugs          |
| Prototype chain  | Verbose hơn classes | Không type safety        |

### Basic inheritance:

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

### Multiple inheritance:

```javascript
// Multiple inheritance (prototype chain)
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(`${this.name} is eating`);
  }
}

class Mammal extends Animal {
  constructor(name) {
    super(name);
  }

  giveBirth() {
    console.log(`${this.name} is giving birth`);
  }
}

class Dog extends Mammal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  bark() {
    console.log("Woof!");
  }
}

const dog = new Dog("Rex", "Labrador");
dog.eat(); // 'Rex is eating'
dog.giveBirth(); // 'Rex is giving birth'
dog.bark(); // 'Woof!'
```

### Best Practices:

```javascript
// ✅ Dùng extends cho:
// - Inheritance
// - Code reuse
// - Override methods
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

## `super` keyword?

**`super`** - Truy cập parent class trong subclass.

### Mục đích / Purpose

**`super`** được thiết kế để:

- Gọi parent constructor
- Gọi parent methods
- Access parent properties

### Khi nào dùng / When to Use

`super` nên dùng khi:

- Gọi parent constructor
- Override methods
- Access parent properties
- Inheritance

### Giúp ích gì / Benefits

**Lợi ích:**

- **Parent access**: Truy cập parent
- **Method calls**: Gọi parent methods
- **Inheritance**: Kế thừa dễ dàng

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm |
| ------------- | ---------- | --------------- |
| Parent access | Flexible   | Có thể gây bugs |
| Method calls  | Powerful   | Có thể gây bugs |

### `super` trong constructor:

```javascript
// Gọi constructor của parent
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

### `super` trong methods:

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

### `super` với static methods:

```javascript
class Parent {
  static method() {
    console.log("Parent static method");
  }
}

class Child extends Parent {
  static childMethod() {
    super.method(); // Gọi static method của parent
    console.log("Child method");
  }
}

Child.childMethod(); // 'Parent static method'
// 'Child method'
```

### Best Practices:

```javascript
// ✅ Dùng super cho:
// - Gọi parent constructor
// - Override methods
// - Access parent properties
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
