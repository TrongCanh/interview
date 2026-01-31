# 11. Classes

## Tổng quan về Classes

### Mục đích của Classes / Purpose

**Classes** - Tạo object-oriented code với TypeScript.

**Mục đích chính:**

- Define class structures
- Type-safe class properties và methods
- Implement interfaces
- Use access modifiers
- Create type-safe inheritance

### Khi nào cần hiểu về Classes / When to Use

Hiểu về Classes là cần thiết khi:

- Tạo class-based code
- Implement interfaces
- Use inheritance
- Define access modifiers
- Create type-safe OOP code

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile time
- **Access Control**: Control access đến members
- **Interface Implementation**: Type-safe interface implementation
- **Inheritance**: Type-safe inheritance
- **Better DX**: IntelliSense và autocomplete tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                  | Nhược điểm             |
| ------------------------ | ---------------------- |
| Type safety              | Verbose hơn            |
| Access control           | Learning curve         |
| Interface implementation | Cần understand classes |
| Inheritance              | Có thể overkill        |

---

## Class trong TypeScript?

**Class trong TypeScript** - Classes với type annotations và access modifiers.

### Mục đích / Purpose

Classes trong TypeScript được dùng để:

- Define class structures
- Type-safe class members
- Implement interfaces
- Use access modifiers
- Create type-safe OOP code

### Khi nào dùng / When to Use

| Tình huống               | Khi nào dùng              |
| ------------------------ | ------------------------- |
| OOP code                 | Khi cần OOP patterns      |
| Type safety              | Khi cần type-safe classes |
| Interface implementation | Khi implement interfaces  |
| Inheritance              | Khi cần inheritance       |
| Access control           | Khi cần access modifiers  |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile time
- **Access Control**: Control access đến members
- **Interface Implementation**: Type-safe interface implementation
- **Inheritance**: Type-safe inheritance
- **Better DX**: IntelliSense tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                  | Nhược điểm             |
| ------------------------ | ---------------------- |
| Type safety              | Verbose hơn            |
| Access control           | Learning curve         |
| Interface implementation | Cần understand classes |
| Inheritance              | Có thể overkill        |

### Ví dụ:

```typescript
// 1. Class cơ bản
class User {
  id: number;
  name: string;
  email: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  greet(): string {
    return `Hello, ${this.name}!`;
  }
}

const user = new User(1, "John", "john@example.com");
console.log(user.greet()); // 'Hello, John!'

// 2. Class với access modifiers
class BankAccount {
  private balance: number;
  protected accountNumber: string;
  public owner: string;

  constructor(owner: string, accountNumber: string, initialBalance: number) {
    this.owner = owner;
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
  }

  public deposit(amount: number): void {
    this.balance += amount;
  }

  public withdraw(amount: number): void {
    if (amount <= this.balance) {
      this.balance -= amount;
    }
  }

  protected getBalance(): number {
    return this.balance;
  }
}

// 3. Class với readonly modifier
class Point {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  distance(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

const point = new Point(3, 4);
// point.x = 10; // ❌ Error: Cannot assign to 'x' because it is a read-only property

// 4. Class với parameter properties
class User2 {
  constructor(
    public id: number,
    public name: string,
    public email: string,
  ) {}

  greet(): string {
    return `Hello, ${this.name}!`;
  }
}

const user2 = new User2(1, "John", "john@example.com");
console.log(user2.name); // 'John'

// 5. Class với abstract class
abstract class Animal {
  constructor(public name: string) {}

  abstract makeSound(): void;

  move(): void {
    console.log(`${this.name} is moving`);
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}

class Cat extends Animal {
  makeSound(): void {
    console.log("Meow!");
  }
}

const dog = new Dog("Buddy");
dog.makeSound(); // 'Woof!'
dog.move(); // 'Buddy is moving'

// 6. Class với implements interface
interface Printable {
  print(): void;
}

class Document implements Printable {
  constructor(public content: string) {}

  print(): void {
    console.log(this.content);
  }
}

const doc = new Document("Hello, World!");
doc.print(); // 'Hello, World!'

// 7. Class với static members
class MathUtils {
  static PI = 3.14159;

  static add(a: number, b: number): number {
    return a + b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }
}

console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.add(1, 2)); // 3
console.log(MathUtils.multiply(3, 4)); // 12

// 8. Class với getters/setters
class Temperature {
  private _celsius: number = 0;

  get celsius(): number {
    return this._celsius;
  }

  set celsius(value: number) {
    this._celsius = value;
  }

  get fahrenheit(): number {
    return (this._celsius * 9) / 5 + 32;
  }

  set fahrenheit(value: number) {
    this._celsius = ((value - 32) * 5) / 9;
  }
}

const temp = new Temperature();
temp.celsius = 25;
console.log(temp.fahrenheit); // 77

temp.fahrenheit = 100;
console.log(temp.celsius); // 37.777...

// 9. Class với generic class
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  size(): number {
    return this.items.length;
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2

// 10. Class với method overloading
class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: number | string, b: number | string): number | string {
    return typeof a === "number" && typeof b === "number" ? a + b : a + b;
  }
}

const calc = new Calculator();
console.log(calc.add(1, 2)); // 3
console.log(calc.add("hello", " world")); // 'hello world'

// 11. Class với constructor signatures
class User3 {
  id: number;
  name: string;
  email?: string;

  constructor(id: number, name: string);
  constructor(id: number, name: string, email: string);
  constructor(id: number, name: string, email?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

const user3a = new User3(1, "John");
const user3b = new User3(2, "Jane", "jane@example.com");

// 12. Class với implements multiple interfaces
interface Serializable {
  serialize(): string;
}

interface Deserializable<T> {
  deserialize(data: string): T;
}

class User4 implements Serializable, Deserializable<User4> {
  constructor(
    public id: number,
    public name: string,
    public email: string,
  ) {}

  serialize(): string {
    return JSON.stringify(this);
  }

  deserialize(data: string): User4 {
    const parsed = JSON.parse(data);
    this.id = parsed.id;
    this.name = parsed.name;
    this.email = parsed.email;
    return this;
  }
}

// 13. Class với readonly class
class ReadonlyPoint {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const readonlyPoint = new ReadonlyPoint(10, 20);
// readonlyPoint.x = 15; // ❌ Error

// 14. Class với protected members
class Vehicle {
  protected speed: number = 0;

  accelerate(amount: number): void {
    this.speed += amount;
  }

  brake(amount: number): void {
    this.speed = Math.max(0, this.speed - amount);
  }
}

class Car extends Vehicle {
  drive(): void {
    this.accelerate(10);
  }

  stop(): void {
    this.brake(10);
  }
}

const car = new Car();
car.drive();
car.stop();

// 15. Class với private members
class Secret {
  private secretCode: string = "1234";

  checkCode(code: string): boolean {
    return code === this.secretCode;
  }
}

const secret = new Secret();
console.log(secret.checkCode("1234")); // true
console.log(secret.secretCode); // ❌ Error: Property 'secretCode' is private and only accessible within class 'Secret'
```

### Best Practices:

1. **Use access modifiers**: Dùng access modifiers để control access
2. **Parameter properties**: Dùng parameter properties để simplify constructor
3. **Readonly khi phù hợp**: Dùng readonly cho immutable properties
4. **Abstract classes**: Dùng abstract classes cho base classes
5. **Interface implementation**: Implement interfaces cho type safety

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Public tất cả members
class User {
  public id: number;
  public name: string;
  public email: string;
}

// ✅ Nên: Dùng access modifiers phù hợp
class User {
  public id: number;
  public name: string;
  private email: string;
}

// ❌ Không nên: Không dùng parameter properties
class User {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

// ✅ Nên: Dùng parameter properties
class User {
  constructor(
    public id: number,
    public name: string,
  ) {}
}
```

---

## Access modifiers (`public`, `private`, `protected`)?

**Access modifiers** - Control access đến class members.

### Mục đích / Purpose

Access modifiers được dùng để:

- Control access đến class members
- Encapsulate implementation details
- Define public APIs
- Protect internal state
- Enable inheritance patterns

### Khi nào dùng / When to Use

| Modifier    | Khi nào dùng                                     |
| ----------- | ------------------------------------------------ |
| `public`    | Khi member có thể được access từ anywhere        |
| `private`   | Khi member chỉ được access trong class           |
| `protected` | Khi member được access trong class và subclasses |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Encapsulation**: Encapsulate implementation details
- **API definition**: Define clear public APIs
- **State protection**: Protect internal state
- **Inheritance support**: Enable inheritance patterns
- **Type safety**: Catch access errors tại compile time

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm                      |
| ------------------- | ------------------------------- |
| Encapsulation       | Verbose hơn                     |
| API definition      | Learning curve                  |
| State protection    | Cần understand access modifiers |
| Inheritance support | Có thể limiting                 |

### Ví dụ:

```typescript
// 1. Public modifier
class User {
  public id: number;
  public name: string;
  public email: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  greet(): string {
    return `Hello, ${this.name}!`;
  }
}

const user = new User(1, "John", "john@example.com");
console.log(user.name); // 'John'

// 2. Private modifier
class BankAccount {
  private balance: number;
  public owner: string;

  constructor(owner: string, initialBalance: number) {
    this.owner = owner;
    this.balance = initialBalance;
  }

  public deposit(amount: number): void {
    this.balance += amount;
  }

  public withdraw(amount: number): void {
    if (amount <= this.balance) {
      this.balance -= amount;
    }
  }

  private logTransaction(type: string, amount: number): void {
    console.log(`${type}: $${amount}`);
  }
}

const account = new BankAccount("John", 1000);
account.deposit(500);
// account.logTransaction('deposit', 500); // ❌ Error: Property 'logTransaction' is private

// 3. Protected modifier
class Vehicle {
  protected speed: number = 0;

  accelerate(amount: number): void {
    this.speed += amount;
  }

  brake(amount: number): void {
    this.speed = Math.max(0, this.speed - amount);
  }
}

class Car extends Vehicle {
  drive(): void {
    this.accelerate(10);
  }

  stop(): void {
    this.brake(10);
  }
}

const car = new Car();
car.drive();
// car.speed = 100; // ❌ Error: Property 'speed' is protected and only accessible within class 'Vehicle' and its subclasses

// 4. Default public modifier
class User2 {
  id: number; // public by default
  name: string; // public by default

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

// 5. Private methods
class Calculator {
  private validateNumber(value: number): boolean {
    return !isNaN(value) && isFinite(value);
  }

  public add(a: number, b: number): number | null {
    if (this.validateNumber(a) && this.validateNumber(b)) {
      return a + b;
    }
    return null;
  }
}

const calc = new Calculator();
console.log(calc.add(1, 2)); // 3
// calc.validateNumber(1); // ❌ Error: Method 'validateNumber' is private

// 6. Protected methods
class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  protected makeSound(): void {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  bark(): void {
    this.makeSound(); // ✅ OK: protected method accessible in subclass
    console.log("Woof!");
  }
}

const dog = new Dog("Buddy");
dog.bark();
// dog.makeSound(); // ❌ Error: Method 'makeSound' is protected

// 7. Public static members
class MathUtils {
  public static PI = 3.14159;

  public static add(a: number, b: number): number {
    return a + b;
  }
}

console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.add(1, 2)); // 3

// 8. Private static members
class Counter {
  private static count: number = 0;

  public static increment(): number {
    return ++Counter.count;
  }

  public static getCount(): number {
    return Counter.count;
  }
}

console.log(Counter.increment()); // 1
// Counter.count = 0; // ❌ Error: Property 'count' is private

// 9. Protected static members
class Base {
  protected static version: string = "1.0.0";
}

class Derived extends Base {
  public getVersion(): string {
    return Derived.version; // ✅ OK: protected static member accessible in subclass
  }
}

const derived = new Derived();
console.log(derived.getVersion()); // '1.0.0'
// Base.version = '2.0.0'; // ❌ Error: Property 'version' is protected

// 10. Parameter properties với access modifiers
class User3 {
  constructor(
    public id: number,
    public name: string,
    private email: string,
  ) {}

  greet(): string {
    return `Hello, ${this.name}!`;
  }
}

const user3 = new User3(1, "John", "john@example.com");
console.log(user3.name); // 'John'
// user3.email; // ❌ Error: Property 'email' is private
```

### Best Practices:

1. **Use private cho internal state**: Dùng `private` cho internal state
2. **Use protected cho inheritance**: Dùng `protected` cho members cần được access trong subclasses
3. **Use public cho APIs**: Dùng `public` cho public APIs
4. **Default to public**: Default access modifier là `public`
5. **Encapsulate logic**: Encapsulate logic trong private methods

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Public tất cả members
class User {
  public id: number;
  public name: string;
  public email: string;
  public secret: string;
}

// ✅ Nên: Dùng private cho internal members
class User {
  public id: number;
  public name: string;
  public email: string;
  private secret: string;
}

// ❌ Không nên: Private khi cần protected
class Animal {
  private makeSound(): void {
    console.log("Sound");
  }
}

class Dog extends Animal {
  bark(): void {
    this.makeSound(); // ❌ Error: Method 'makeSound' is private
  }
}

// ✅ Nên: Dùng protected khi cần inheritance
class Animal {
  protected makeSound(): void {
    console.log("Sound");
  }
}

class Dog extends Animal {
  bark(): void {
    this.makeSound(); // ✅ OK
  }
}
```

---

## Readonly modifier?

**Readonly modifier** - Properties không thể được reassigned sau khi được khởi tạo.

### Mục đích / Purpose

Readonly modifier được dùng để:

- Prevent mutations
- Ensure immutability
- Document intent
- Create immutable data structures
- Protect constant values

### Khi nào dùng / When to Use

| Tình huống     | Khi nào dùng                  |
| -------------- | ----------------------------- |
| Immutable data | Khi data không nên thay đổi   |
| Constants      | Khi value là constant         |
| Configuration  | Khi config không nên modify   |
| API responses  | Khi response không nên modify |
| Public APIs    | Khi API không nên modify      |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Immutability**: Prevent unintended mutations
- **Type safety**: Catch mutations tại compile time
- **Documentation**: Rõ ràng về intent
- **Safer code**: Giảm bugs từ mutations
- **Better DX**: IntelliSense tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm       |
| ------------- | ---------------- |
| Immutability  | Không thể modify |
| Type safety   | Verbose hơn      |
| Documentation | Learning curve   |
| Safer code    | Shallow readonly |

### Ví dụ:

```typescript
// 1. Readonly property
class Point {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  distance(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

const point = new Point(3, 4);
// point.x = 10; // ❌ Error: Cannot assign to 'x' because it is a read-only property

// 2. Readonly class
class ReadonlyPoint {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const readonlyPoint = new ReadonlyPoint(10, 20);
// readonlyPoint.x = 15; // ❌ Error

// 3. Readonly với parameter properties
class User {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public email: string
  ) {}
}

const user = new User(1, 'John', 'john@example.com');
// user.id = 2; // ❌ Error: Cannot assign to 'id' because it is a read-only property

// 4. Readonly với static members
class Config {
  static readonly API_URL = 'https://api.example.com';
  static readonly TIMEOUT = 5000;
}

console.log(Config.API_URL); // 'https://api.example.com'
// Config.API_URL = 'https://new-api.example.com'; // ❌ Error

// 5. Readonly với getters
class Temperature {
  private _celsius: number = 0;

  get celsius(): number {
    return this._celsius;
  }

  set celsius(value: number) {
    this._celsius = value;
  }

  get fahrenheit(): number {
    return (this._celsius * 9/5) + 32;
  }
}

class ReadonlyTemperature {
  private _celsius: number = 0;

  get celsius(): number {
    return this._celsius;
  }

  get readonly fahrenheit(): number {
    return (this._celsius * 9/5) + 32;
  }
}

const temp = new Temperature();
const readonlyTemp = new ReadonlyTemperature();

temp.celsius = 25;
console.log(temp.fahrenheit); // 77

readonlyTemp.celsius = 25;
console.log(readonlyTemp.fahrenheit); // 77
// readonlyTemp.fahrenheit = 100; // ❌ Error: Cannot assign to 'fahrenheit' because it is a read-only property

// 6. Readonly với implements interface
interface ReadonlyPoint {
  readonly x: number;
  readonly y: number;
}

class Point2 implements ReadonlyPoint {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

// 7. Readonly với extends
interface ReadonlyPoint2 {
  readonly x: number;
  readonly y: number;
}

interface Point3D extends ReadonlyPoint2 {
  readonly z: number;
}

class Point3 implements Point3D {
  readonly x: number;
  readonly y: number;
  readonly z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

// 8. Readonly với generic class
class Box<T> {
  constructor(public readonly value: T) {}

  getValue(): T {
    return this.value;
  }
}

const numberBox = new Box(123);
const stringBox = new Box('hello');

// numberBox.value = 456; // ❌ Error
// stringBox.value = 'world'; // ❌ Error

// 9. Readonly với method return types
class Circle {
  constructor(public readonly radius: number) {}

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  getCircumference(): number {
    return 2 * Math.PI * this.radius;
  }
}

const circle = new Circle(10);
console.log(circle.getArea()); // 314.159...
console.log(circle.getCircumference()); // 62.831...

// 10. Readonly với class expressions
const ReadonlyClass = class {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }
};

const instance = new ReadonlyClass('hello');
// instance.value = 'world'; // ❌ Error
```

### Best Practices:

1. **Use readonly cho immutable data**: Dùng `readonly` cho data không nên thay đổi
2. **Document intent**: Dùng `readonly` để document intent
3. **Shallow readonly**: Hiểu rằng `readonly` là shallow
4. **Use with interfaces**: Dùng `readonly` với interfaces
5. **Prefer const**: Dùng `const` cho variables thay vì readonly properties

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Mutate readonly properties
class Point {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(dx: number, dy: number): void {
    this.x += dx; // ❌ Error
    this.y += dy; // ❌ Error
  }
}

// ✅ Nên: Tạo new instance
class Point {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(dx: number, dy: number): Point {
    return new Point(this.x + dx, this.y + dy);
  }
}

// ❌ Không nên: Dùng readonly khi mutation cần thiết
class Counter {
  readonly count: number = 0;

  increment(): void {
    this.count++; // ❌ Error
  }
}

// ✅ Nên: Không dùng readonly khi mutation cần thiết
class Counter {
  count: number = 0;

  increment(): void {
    this.count++; // ✅ OK
  }
}
```

---

## Parameter properties?

**Parameter properties** - Shorthand cho declaring và initializing class properties trong constructor.

### Mục đích / Purpose

Parameter properties được dùng để:

- Simplify constructor code
- Declare và initialize properties trong constructor
- Reduce boilerplate
- Improve readability
- Type-safe property declarations

### Khi nào dùng / When to Use

| Tình huống                 | Khi nào dùng                             |
| -------------------------- | ---------------------------------------- |
| Constructor initialization | Khi cần declare và initialize properties |
| Reduce boilerplate         | Khi muốn reduce boilerplate              |
| Improve readability        | Khi muốn improve readability             |
| Type-safe declarations     | Khi cần type-safe property declarations  |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Simplify code**: Giảm boilerplate trong constructor
- **Better readability**: Code dễ đọc hơn
- **Type-safe**: Type-safe property declarations
- **Less duplication**: Giảm code duplication
- **Access modifiers**: Có thể dùng access modifiers

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm                          |
| ------------------ | ----------------------------------- |
| Simplify code      | Learning curve                      |
| Better readability | Verbose hơn                         |
| Type-safe          | Cần understand parameter properties |
| Less duplication   | Có thể confusing                    |

### Ví dụ:

```typescript
// 1. Parameter properties cơ bản
class User {
  constructor(
    public id: number,
    public name: string,
    public email: string
  ) {}
}

const user = new User(1, 'John', 'john@example.com');
console.log(user.name); // 'John'

// 2. Parameter properties với access modifiers
class BankAccount {
  constructor(
    public owner: string,
    private balance: number,
    protected accountNumber: string
  ) {}
}

const account = new BankAccount('John', 1000, '123456');
console.log(account.owner); // 'John'
// account.balance = 2000; // ❌ Error: Property 'balance' is private

// 3. Parameter properties với readonly
class Point {
  constructor(
    public readonly x: number,
    public readonly y: number
  ) {}
}

const point = new Point(10, 20);
// point.x = 15; // ❌ Error: Cannot assign to 'x' because it is a read-only property

// 4. Parameter properties với default values
class User2 {
  constructor(
    public id: number,
    public name: string,
    public email: string = ''
  ) {}
}

const user2a = new User2(1, 'John'); // email: ''
const user2b = new User2(2, 'Jane', 'jane@example.com'); // email: 'jane@example.com'

// 5. Parameter properties với optional parameters
class User3 {
  constructor(
    public id: number,
    public name: string,
    public email?: string
  ) {}
}

const user3a = new User3(1, 'John'); // email: undefined
const user3b = new User3(2, 'Jane', 'jane@example.com'); // email: 'jane@example.com'

// 6. Parameter properties với destructured parameters
interface Point2 {
  x: number;
  y: number;
}

class Shape {
  constructor(
    public center: Point2,
    public radius: number
  ) {}
}

const shape = new Shape({ x: 10, y: 20 }, 5);
console.log(shape.center.x); // 10

// 7. Parameter properties với generic types
class Box<T> {
  constructor(
    public value: T
  ) {}
}

const numberBox = new Box(123);
const stringBox = new Box('hello');

// 8. Parameter properties với multiple access modifiers
class User4 {
  constructor(
    public id: number,
    public name: string,
    private email: string,
    protected age: number
  ) {}
}

class AdminUser extends User4 {
  constructor(
    id: number,
    name: string,
    email: string,
    age: number,
    public role: string
  ) {
    super(id, name, email, age);
  }

  getAge(): number {
    return this.age; // ✅ OK: protected member accessible in subclass
  }
}

const admin = new AdminUser(1, 'John', 'john@example.com', 30, 'admin');
console.log(admin.getAge()); // 30
// admin.age = 31; // ❌ Error: Property 'age' is protected

// 9. Parameter properties với static properties
class Config {
  constructor(
    public static readonly API_URL: string = 'https://api.example.com',
    public static readonly TIMEOUT: number = 5000
  ) {}
}

console.log(Config.API_URL); // 'https://api.example.com'

// 10. Parameter properties với implements interface
interface UserInterface {
  id: number;
  name: string;
  email: string;
}

class User5 implements UserInterface {
  constructor(
    public id: number,
    public name: string,
    public email: string
  ) {}
}
```

### Best Practices:

1. **Use parameter properties**: Dùng parameter properties để simplify constructor
2. **Access modifiers**: Dùng access modifiers với parameter properties
3. **Readonly khi phù hợp**: Dùng `readonly` với parameter properties khi cần
4. **Default values**: Dùng default values với parameter properties
5. **Optional parameters**: Dùng optional parameters với parameter properties

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Không dùng parameter properties
class User {
  id: number;
  name: string;
  email: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

// ✅ Nên: Dùng parameter properties
class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
  ) {}
}

// ❌ Không nên: Parameter properties với logic phức tạp
class User {
  constructor(
    public id: number,
    public name: string,
    public email: string = this.validateEmail(name), // ❌ Error: Cannot access 'this' before initialization
  ) {}

  private validateEmail(email: string): string {
    return email;
  }
}

// ✅ Nên: Tách logic
class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
  ) {}
}
```

---

## Abstract classes?

**Abstract classes** - Classes không thể được instantiated, dùng làm base classes.

### Mục đích / Purpose

Abstract classes được dùng để:

- Define base classes
- Enforce implementation
- Define common interfaces
- Enable inheritance patterns
- Type-safe base classes

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng                     |
| ---------------------- | -------------------------------- |
| Base classes           | Khi cần base classes             |
| Enforce implementation | Khi cần enforce implementation   |
| Common interfaces      | Khi cần define common interfaces |
| Inheritance patterns   | Khi cần inheritance patterns     |
| Type-safe base classes | Khi cần type-safe base classes   |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Base classes**: Define base classes
- **Enforce implementation**: Enforce implementation của abstract methods
- **Common interfaces**: Define common interfaces
- **Inheritance patterns**: Enable inheritance patterns
- **Type safety**: Type-safe base classes

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm                      |
| ---------------------- | ------------------------------- |
| Base classes           | Không thể instantiate           |
| Enforce implementation | Verbose hơn                     |
| Common interfaces      | Learning curve                  |
| Inheritance patterns   | Cần understand abstract classes |

### Ví dụ:

```typescript
// 1. Abstract class cơ bản
abstract class Animal {
  constructor(public name: string) {}

  abstract makeSound(): void;

  move(): void {
    console.log(`${this.name} is moving`);
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}

class Cat extends Animal {
  makeSound(): void {
    console.log("Meow!");
  }
}

const dog = new Dog("Buddy");
dog.makeSound(); // 'Woof!'
dog.move(); // 'Buddy is moving'

// const animal = new Animal('Generic'); // ❌ Error: Cannot create an instance of an abstract class

// 2. Abstract class với multiple abstract methods
abstract class Shape {
  abstract getArea(): number;
  abstract getPerimeter(): number;

  describe(): string {
    return `Shape with area ${this.getArea()} and perimeter ${this.getPerimeter()}`;
  }
}

class Circle extends Shape {
  constructor(public radius: number) {}

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Square extends Shape {
  constructor(public side: number) {}

  getArea(): number {
    return this.side * this.side;
  }

  getPerimeter(): number {
    return 4 * this.side;
  }
}

const circle = new Circle(10);
console.log(circle.describe()); // 'Shape with area 314.159... and perimeter 62.831...'

// 3. Abstract class với abstract properties
abstract class Animal2 {
  abstract species: string;
  abstract sound: string;

  makeSound(): void {
    console.log(`${this.species} makes ${this.sound}`);
  }
}

class Dog2 extends Animal2 {
  species = "Dog";
  sound = "Woof";
}

class Cat2 extends Animal2 {
  species = "Cat";
  sound = "Meow";
}

const dog2 = new Dog2();
dog2.makeSound(); // 'Dog makes Woof'

// 4. Abstract class với concrete methods
abstract class Vehicle {
  constructor(public speed: number = 0) {}

  abstract start(): void;
  abstract stop(): void;

  accelerate(amount: number): void {
    this.speed += amount;
  }

  brake(amount: number): void {
    this.speed = Math.max(0, this.speed - amount);
  }
}

class Car extends Vehicle {
  start(): void {
    console.log("Car started");
  }

  stop(): void {
    console.log("Car stopped");
  }
}

const car = new Car();
car.start();
car.accelerate(10);
car.brake(10);
car.stop();

// 5. Abstract class với protected methods
abstract class Animal3 {
  constructor(public name: string) {}

  abstract makeSound(): void;

  protected logSound(): void {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog3 extends Animal3 {
  makeSound(): void {
    this.logSound(); // ✅ OK: protected method accessible in subclass
    console.log("Woof!");
  }
}

const dog3 = new Dog3("Buddy");
dog3.makeSound(); // 'Buddy makes a sound' then 'Woof!'

// 6. Abstract class với generic types
abstract class Repository<T> {
  abstract findById(id: number): Promise<T | null>;
  abstract findAll(): Promise<T[]>;
  abstract save(entity: T): Promise<T>;
  abstract delete(id: number): Promise<void>;
}

interface User {
  id: number;
  name: string;
  email: string;
}

class UserRepository extends Repository<User> {
  private users: User[] = [];

  async findById(id: number): Promise<User | null> {
    return this.users.find((u) => u.id === id) || null;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async save(entity: User): Promise<User> {
    this.users.push(entity);
    return entity;
  }

  async delete(id: number): Promise<void> {
    this.users = this.users.filter((u) => u.id !== id);
  }
}

// 7. Abstract class với static members
abstract class Config {
  static abstract readonly API_URL: string;
  static abstract readonly TIMEOUT: number;

  static getTimeout(): number {
    return this.TIMEOUT;
  }
}

class ProductionConfig extends Config {
  static readonly API_URL = "https://api.example.com";
  static readonly TIMEOUT = 5000;
}

console.log(ProductionConfig.getTimeout()); // 5000

// 8. Abstract class với implements interface
interface Shape2 {
  getArea(): number;
  getPerimeter(): number;
}

abstract class AbstractShape implements Shape2 {
  abstract getArea(): number;
  abstract getPerimeter(): number;

  describe(): string {
    return `Shape with area ${this.getArea()} and perimeter ${this.getPerimeter()}`;
  }
}

class Circle2 extends AbstractShape {
  constructor(public radius: number) {}

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

// 9. Abstract class với constructor signatures
abstract class UserFactory {
  constructor(public name: string) {}

  abstract create(): User;

  getName(): string {
    return this.name;
  }
}

class AdminUserFactory extends UserFactory {
  create(): User {
    return {
      id: 1,
      name: this.getName(),
      email: `${this.getName().toLowerCase()}@example.com`,
    };
  }
}

const adminFactory = new AdminUserFactory("Admin");
const adminUser = adminFactory.create();
console.log(adminUser); // { id: 1, name: 'Admin', email: 'admin@example.com' }

// 10. Abstract class với multiple inheritance levels
abstract class Animal4 {
  constructor(public name: string) {}

  abstract makeSound(): void;

  move(): void {
    console.log(`${this.name} is moving`);
  }
}

abstract class Mammal extends Animal4 {
  abstract giveBirth(): void;
}

class Dog4 extends Mammal {
  makeSound(): void {
    console.log("Woof!");
  }

  giveBirth(): void {
    console.log(`${this.name} gave birth to puppies`);
  }
}

const dog4 = new Dog4("Buddy");
dog4.makeSound(); // 'Woof!'
dog4.giveBirth(); // 'Buddy gave birth to puppies'
```

### Best Practices:

1. **Use abstract classes**: Dùng abstract classes cho base classes
2. **Enforce implementation**: Enforce implementation của abstract methods
3. **Concrete methods**: Dùng concrete methods cho shared logic
4. **Protected members**: Dùng protected members cho shared logic
5. **Document abstract classes**: Document rõ ràng về abstract classes

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Concrete methods làm abstract
abstract class Animal {
  abstract move(): void; // ❌ Error: Method 'move' has implementation but is marked abstract
}

// ✅ Nên: Chỉ abstract methods không có implementation
abstract class Animal {
  move(): void {
    console.log("Moving");
  }

  abstract makeSound(): void;
}

// ❌ Không nên: Instantiate abstract class
abstract class Animal {
  abstract makeSound(): void;
}

const animal = new Animal(); // ❌ Error: Cannot create an instance of an abstract class

// ✅ Nên: Extend abstract class
class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}

const dog = new Dog(); // ✅ OK
```

---

## Constructor signatures?

**Constructor signatures** - Define multiple constructor signatures.

### Mục đích / Purpose

Constructor signatures được dùng để:

- Define multiple constructor signatures
- Type-safe constructors
- Create flexible initialization
- Enable factory patterns
- Type-safe object creation

### Khi nào dùng / When to Use

| Tình huống              | Khi nào dùng                           |
| ----------------------- | -------------------------------------- |
| Multiple constructors   | Khi có multiple constructor signatures |
| Flexible initialization | Khi cần flexible initialization        |
| Factory patterns        | Khi cần factory patterns               |
| Type-safe creation      | Khi cần type-safe object creation      |
| Overloaded constructors | Khi cần overloaded constructors        |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Multiple signatures**: Define multiple constructor signatures
- **Type safety**: Type-safe constructors
- **Flexible initialization**: Flexible initialization
- **Factory patterns**: Enable factory patterns
- **Better DX**: IntelliSense tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                 | Nhược điểm                            |
| ----------------------- | ------------------------------------- |
| Multiple signatures     | Verbose hơn                           |
| Type safety             | Learning curve                        |
| Flexible initialization | Implementation phải compatible        |
| Factory patterns        | Cần understand constructor signatures |

### Ví dụ:

```typescript
// 1. Constructor signature cơ bản
class User {
  id: number;
  name: string;
  email?: string;

  constructor(id: number, name: string);
  constructor(id: number, name: string, email: string);
  constructor(id: number, name: string, email?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

const user1 = new User(1, "John");
const user2 = new User(2, "Jane", "jane@example.com");

// 2. Constructor signature với parameter properties
class User2 {
  constructor(
    public id: number,
    public name: string,
    public email?: string,
  ) {}
}

const user3 = new User2(1, "John");
const user4 = new User2(2, "Jane", "jane@example.com");

// 3. Constructor signature với different types
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number);
  constructor(point: { x: number; y: number });
  constructor(xOrPoint: number | { x: number; y: number }, y?: number);
  constructor(xOrPoint: number | { x: number; y: number }, y?: number) {
    if (typeof xOrPoint === "number") {
      this.x = xOrPoint;
      this.y = y!;
    } else {
      this.x = xOrPoint.x;
      this.y = xOrPoint.y;
    }
  }
}

const point1 = new Point(10, 20);
const point2 = new Point({ x: 10, y: 20 });
const point3 = new Point(10, 20); // Same as point1

// 4. Constructor signature với default values
class User3 {
  constructor(
    public id: number,
    public name: string,
    public email: string = "",
  ) {}
}

const user5 = new User3(1, "John");
const user6 = new User3(2, "Jane", "jane@example.com");

// 5. Constructor signature với generic types
class Box<T> {
  constructor(public value: T) {}
}

const numberBox = new Box(123);
const stringBox = new Box("hello");

// 6. Constructor signature với factory pattern
interface UserInterface {
  id: number;
  name: string;
  email: string;
}

class UserFactory {
  static create(name: string, email: string): UserInterface {
    return {
      id: Date.now(),
      name,
      email,
    };
  }

  static createAdmin(name: string): UserInterface {
    return {
      id: Date.now(),
      name,
      email: `${name.toLowerCase()}@admin.com`,
    };
  }
}

const user7 = UserFactory.create("John", "john@example.com");
const admin = UserFactory.createAdmin("Admin");

// 7. Constructor signature với abstract class
abstract class Animal {
  constructor(public name: string) {}

  abstract makeSound(): void;
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}

const dog = new Dog("Buddy");

// 8. Constructor signature với protected constructor
class Base {
  protected value: number;

  constructor(value: number) {
    this.value = value;
  }
}

class Derived extends Base {
  constructor(
    value: number,
    public multiplier: number,
  ) {
    super(value);
  }
}

const derived = new Derived(10, 2);
console.log(derived.value); // 10

// 9. Constructor signature with readonly properties
class Point2 {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}
}

const point4 = new Point2(10, 20);
// point4.x = 15; // ❌ Error: Cannot assign to 'x' because it is a read-only property

// 10. Constructor signature with implements interface
interface UserInterface2 {
  id: number;
  name: string;
  email: string;
}

class User4 implements UserInterface2 {
  constructor(
    public id: number,
    public name: string,
    public email: string,
  ) {}
}

const user8 = new User4(1, "John", "john@example.com");
```

### Best Practices:

1. **Use constructor overloads**: Dùng constructor overloads cho multiple signatures
2. **Implementation signature**: Implementation signature phải compatible với tất cả overloads
3. **Parameter properties**: Dùng parameter properties để simplify constructor
4. **Default values**: Dùng default values cho optional parameters
5. **Type-safe constructors**: Đảm bảo constructors type-safe

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Implementation signature không compatible với overloads
class User {
  id: number;
  name: string;
  email?: string;

  constructor(id: number, name: string);
  constructor(id: number, name: string, email: string);
  constructor(id: number, name: string, email?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

// ✅ Nên: Implementation signature phải compatible
class User {
  id: number;
  name: string;
  email?: string;

  constructor(id: number, name: string);
  constructor(id: number, name: string, email: string);
  constructor(id: number, name: string, email?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

// ❌ Không nên: Quên overload signatures
class Point {
  x: number;
  y: number;

  constructor(xOrPoint: number | { x: number; y: number }, y?: number) {
    if (typeof xOrPoint === "number") {
      this.x = xOrPoint;
      this.y = y!;
    } else {
      this.x = xOrPoint.x;
      this.y = xOrPoint.y;
    }
  }
}

// ✅ Nên: Thêm overload signatures
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number);
  constructor(point: { x: number; y: number });
  constructor(xOrPoint: number | { x: number; y: number }, y?: number) {
    if (typeof xOrPoint === "number") {
      this.x = xOrPoint;
      this.y = y!;
    } else {
      this.x = xOrPoint.x;
      this.y = xOrPoint.y;
    }
  }
}
```

---

## Best Practices cho Classes

### 1. Use Access Modifiers

Dùng access modifiers để control access:

```typescript
// ✅ Nên
class User {
  public id: number;
  public name: string;
  private email: string;
}
```

### 2. Use Parameter Properties

Dùng parameter properties để simplify constructor:

```typescript
// ✅ Nên
class User {
  constructor(
    public id: number,
    public name: string,
  ) {}
}
```

### 3. Use Readonly cho Immutable Data

Dùng `readonly` cho immutable data:

```typescript
// ✅ Nên
class Point {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}
}
```

### 4. Use Abstract Classes cho Base Classes

Dùng abstract classes cho base classes:

```typescript
// ✅ Nên
abstract class Animal {
  abstract makeSound(): void;
}
```

### 5. Use Implements cho Type Safety

Dùng `implements` cho type safety:

```typescript
// ✅ Nên
interface UserInterface {
  id: number;
  name: string;
}

class User implements UserInterface {
  constructor(
    public id: number,
    public name: string,
  ) {}
}
```

---

## Anti-patterns cần tránh

### 1. Public Tất cả Members

```typescript
// ❌ Không nên
class User {
  public id: number;
  public name: string;
  public email: string;
  public secret: string;
}

// ✅ Nên
class User {
  public id: number;
  public name: string;
  private email: string;
  private secret: string;
}
```

### 2. Không Dùng Parameter Properties

```typescript
// ❌ Không nên
class User {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

// ✅ Nên
class User {
  constructor(
    public id: number,
    public name: string,
  ) {}
}
```

---

_References:_

- [TypeScript Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [TypeScript Modifiers](https://www.typescriptlang.org/docs/handbook/2/classes.html#modifiers)
- [TypeScript Abstract Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes)
