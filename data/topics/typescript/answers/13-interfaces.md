# 13. Interfaces

## Tổng quan về Interfaces

### Mục đích của Interfaces / Purpose

**Interfaces** - Định nghĩa contracts cho objects, classes, và functions trong TypeScript.

**Mục đích chính:**

- Define contracts cho objects
- Type-safe object shapes
- Enforce implementation
- Enable polymorphism
- Document API contracts

### Khi nào cần hiểu về Interfaces / When to Use

Hiểu về Interfaces là cần thiết khi:

- Định nghĩa object shapes
- Type-safe function parameters
- Enforce class implementations
- Define API contracts
- Enable polymorphism

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile time
- **Contracts**: Define clear contracts
- **Enforcement**: Enforce implementation
- **Polymorphism**: Enable polymorphism
- **Better DX**: IntelliSense và autocomplete tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm      | Nhược điểm                |
| ------------ | ------------------------- |
| Type safety  | Verbose hơn               |
| Contracts    | Learning curve            |
| Enforcement  | Cần understand interfaces |
| Polymorphism | Có thể overkill           |

---

## Interface là gì?

**Interface** - Định nghĩa contract cho objects, classes, và functions.

### Mục đích / Purpose

Interface được dùng để:

- Định nghĩa object shapes
- Type-safe function parameters
- Enforce class implementations
- Define API contracts
- Enable polymorphism

### Khi nào dùng / When to Use

| Tình huống           | Khi nào dùng                      |
| -------------------- | --------------------------------- |
| Object shapes        | Khi cần định nghĩa object shapes  |
| Function parameters  | Khi cần type-safe parameters      |
| Class implementation | Khi enforce class implementations |
| API contracts        | Khi define API contracts          |
| Polymorphism         | Khi cần polymorphism              |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile time
- **Contracts**: Define clear contracts
- **Enforcement**: Enforce implementation
- **Polymorphism**: Enable polymorphism
- **Better DX**: IntelliSense và autocomplete tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm      | Nhược điểm                |
| ------------ | ------------------------- |
| Type safety  | Verbose hơn               |
| Contracts    | Learning curve            |
| Enforcement  | Cần understand interfaces |
| Polymorphism | Có thể overkill           |

### Ví dụ:

```typescript
// 1. Interface cơ bản
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John",
  email: "john@example.com",
};

// 2. Interface với optional properties
interface User2 {
  id: number;
  name: string;
  email?: string;
  age?: number;
}

const user2: User2 = {
  id: 1,
  name: "John",
  // email và age không cần
};

// 3. Interface với readonly properties
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};

// config.apiUrl = 'new-url'; // ❌ Error

// 4. Interface với methods
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}

const calc: Calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
  multiply(a, b) {
    return a * b;
  },
  divide(a, b) {
    return a / b;
  },
};

console.log(calc.add(1, 2)); // 3

// 5. Interface với index signatures
interface Dictionary {
  [key: string]: string;
}

const dict: Dictionary = {
  name: "John",
  age: "30",
  email: "john@example.com",
};

// 6. Interface với function types
interface Processor {
  process(value: string): string;
  process(value: number): number;
}

const stringProcessor: Processor = {
  process(value) {
    return value.toUpperCase();
  },
};

const numberProcessor: Processor = {
  process(value) {
    return value.toFixed(2);
  },
};

// 7. Interface với generic types
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 123 };
const stringBox: Box<string> = { value: "hello" };

// 8. Interface với extends
interface Animal {
  name: string;
  makeSound(): void;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

interface Cat extends Animal {
  color: string;
  meow(): void;
}

const dog: Dog = {
  name: "Buddy",
  breed: "Golden Retriever",
  bark() {
    console.log("Woof!");
  },
  makeSound() {
    console.log("Buddy makes a sound");
  },
};

// 9. Interface với implements
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

// 10. Interface với call signatures
interface Adder {
  (a: number, b: number): number;
}

const adder: Adder = (a, b) => a + b;

// 11. Interface với newable types
interface UserFactory {
  new (name: string, email: string): User;
}

const userFactory: UserFactory = {
  new(name, email) {
    return { id: Date.now(), name, email };
  },
};

// 12. Interface với array types
interface UserList {
  users: User[];
  count: number;
}

const userList: UserList = {
  users: [
    { id: 1, name: "John", email: "john@example.com" },
    { id: 2, name: "Jane", email: "jane@example.com" },
  ],
  count: 2,
};

// 13. Interface với union types
interface Status {
  status: "pending" | "approved" | "rejected";
}

const pendingStatus: Status = { status: "pending" };
const approvedStatus: Status = { status: "approved" };

// 14. Interface với tuple types
interface Point {
  coordinates: [number, number];
}

const point: Point = {
  coordinates: [10, 20],
};

// 15. Interface với nested interfaces
interface Address {
  street: string;
  city: string;
  country: string;
}

interface User3 {
  id: number;
  name: string;
  address: Address;
}

const user3: User3 = {
  id: 1,
  name: "John",
  address: {
    street: "123 Main St",
    city: "New York",
    country: "USA",
  },
};
```

### Best Practices:

1. **Use interfaces cho object shapes**: Dùng interfaces để định nghĩa object shapes
2. **Optional properties**: Dùng optional properties (`?`) cho properties có thể không tồn tại
3. **Readonly properties**: Dùng readonly properties cho immutable data
4. **Method signatures**: Dùng method signatures để định nghĩa function types
5. **Generic interfaces**: Dùng generic interfaces cho flexibility

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng type alias thay vì interface cho object shapes
type User = {
  id: number;
  name: string;
  email: string;
};

// ✅ Nên: Dùng interface cho object shapes
interface User {
  id: number;
  name: string;
  email: string;
}

// ❌ Không nên: Không dùng optional khi property luôn cần
interface User2 {
  id: number;
  name: string;
  email?: string; // Không nên nếu email luôn cần
}

// ✅ Nên: Dùng optional khi property có thể không tồn tại
interface User2 {
  id: number;
  name: string;
  email?: string;
}
```

---

## Interface vs Type alias?

**Interface vs Type alias** - So sánh giữa interface và type alias.

### Mục đích / Purpose

Interface và type alias được dùng để:

- Định nghĩa types
- Type-safe code
- Create reusable types
- Document API contracts

### Khi nào dùng / When to Use

| Tình huống          | Interface    | Type alias     |
| ------------------- | ------------ | -------------- |
| Object shapes       | ✅ Nên dùng  | ❌ Không nên   |
| Function types      | ✅ Nên dùng  | ✅ Có thể dùng |
| Union types         | ❌ Không nên | ✅ Nên dùng    |
| Tuple types         | ❌ Không nên | ✅ Nên dùng    |
| Extending           | ✅ Nên dùng  | ✅ Có thể dùng |
| Merging             | ✅ Nên dùng  | ❌ Không thể   |
| Computed properties | ❌ Không thể | ✅ Nên dùng    |

### Giúp ích gì / Benefits

**Interface:**

- **Extending**: Có thể extend interfaces
- **Merging**: Interface declarations được merge
- **Class implementation**: Classes có thể implement interfaces
- **Better error messages**: Error messages rõ ràng hơn

**Type alias:**

- **Union types**: Dùng cho union types
- **Tuple types**: Dùng cho tuple types
- **Computed properties**: Dùng cho computed properties
- **More flexible**: Flexible hơn interfaces

### Ưu nhược điểm / Pros & Cons

| Interface            | Type alias                   |
| -------------------- | ---------------------------- | ------------------------------------ |
| Extending            | Không thể extend             |
| Merging              | Không thể merge              |
| Class implementation | Classes implement interfaces | Classes không implement type aliases |
| Better errors        | Error messages kém hơn       | Flexible hơn                         |

### Ví dụ:

```typescript
// 1. Interface vs Type alias cho object shapes
// Interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Type alias (không nên cho object shapes)
type User = {
  id: number;
  name: string;
  email: string;
};

// 2. Interface vs Type alias cho function types
// Interface
interface Adder {
  (a: number, b: number): number;
}

// Type alias
type Adder = (a: number, b: number) => number;

// Cả hai đều OK

// 3. Interface vs Type alias cho extending
// Interface
interface Animal {
  name: string;
  makeSound(): void;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

// Type alias (không thể extend)
type Animal = {
  name: string;
  makeSound(): void;
};

// type Dog = Animal & { breed: string; bark(): void }; // Có thể dùng intersection

// 4. Interface merging
interface User {
  id: number;
  name: string;
}

interface User {
  email: string;
}

// User interface được merge thành:
// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

const user: User = {
  id: 1,
  name: 'John',
  email: 'john@example.com'
};

// Type alias không thể merge
type User2 = {
  id: number;
  name: string;
};

type User2 = {
  email: string;
};

// Error: Duplicate identifier 'User2'

// 5. Interface vs Type alias cho computed properties
// Type alias
type EventHandlers = {
  [K in `on${Capitalize<string & K}`]: (event: Event) => void;
};

// Interface không thể dùng computed properties
// interface EventHandlers { ... } // ❌ Error

// 6. Interface vs Type alias cho generic types
// Interface
interface Box<T> {
  value: T;
}

// Type alias
type Box2<T> = {
  value: T;
};

// Cả hai đều OK

// 7. Interface vs Type alias cho class implementation
// Interface
interface Printable {
  print(): void;
}

class Document implements Printable {
  print(): void {
    console.log('Printing...');
  }
}

// Type alias không thể dùng cho class implementation
// type Printable = { print(): void }; // ❌ Error: Classes không thể implement type aliases

// 8. Interface vs Type alias cho tuple types
// Interface không thể dùng cho tuple types
// interface Point = { coordinates: [number, number] }; // ❌ Error: Index signature only allows string properties

// Type alias
type Point = {
  coordinates: [number, number];
};

const point: Point = {
  coordinates: [10, 20]
};

// 9. Interface vs Type alias cho union types
// Interface không thể dùng cho union types
// type Status = 'pending' | 'approved' | 'rejected'; // ❌ Error: Interface không thể dùng literal types

// Type alias
type Status = 'pending' | 'approved' | 'rejected';

const status: Status = 'approved';

// 10. Interface vs Type alias cho mapped types
// Interface
interface ReadonlyUser {
  readonly [K in keyof User]: User[K];
}

// Type alias
type ReadonlyUser2 = {
  readonly [K in keyof User]: User[K];
};

// Cả hai đều OK
```

### Best Practices:

1. **Use interface cho object shapes**: Dùng interface cho object shapes
2. **Use type alias cho union/tuple**: Dùng type alias cho union và tuple types
3. **Use interface khi cần extending**: Dùng interface khi cần extend
4. **Use type alias cho computed properties**: Dùng type alias cho computed properties
5. **Use interface cho class implementation**: Dùng interface cho class implementation

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng type alias cho object shapes
type User = {
  id: number;
  name: string;
  email: string;
};

// ✅ Nên: Dùng interface cho object shapes
interface User {
  id: number;
  name: string;
  email: string;
}

// ❌ Không nên: Dùng interface cho union/tuple types
interface Status = 'pending' | 'approved' | 'rejected'; // ❌ Error
interface Point = { coordinates: [number, number] }; // ❌ Error

// ✅ Nên: Dùng type alias cho union/tuple types
type Status = 'pending' | 'approved' | 'rejected';
type Point = {
  coordinates: [number, number];
};
```

---

## Extending interfaces?

**Extending interfaces** - Tạo mới interfaces từ existing interfaces.

### Mục đích / Purpose

Extending interfaces được dùng để:

- Tạo mới interfaces từ existing interfaces
- Reuse existing definitions
- Create interface hierarchies
- Extend functionality
- Type-safe extension

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                  |
| --------------------- | ----------------------------- |
| Extend interfaces     | Khi cần extend interfaces     |
| Add functionality     | Khi cần add functionality     |
| Create hierarchies    | Khi cần interface hierarchies |
| Specialize interfaces | Khi cần specialize interfaces |
| Override methods      | Khi cần override methods      |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Reuse**: Reuse existing interface definitions
- **Hierarchies**: Create interface hierarchies
- **Specialization**: Specialize interfaces
- **Type safety**: Type-safe extension
- **Better DX**: IntelliSense tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm               |
| -------------- | ------------------------ |
| Reuse          | Verbose hơn              |
| Hierarchies    | Learning curve           |
| Specialization | Cần understand extending |
| Type safety    | Có thể over-engineering  |

### Ví dụ:

```typescript
// 1. Extending interface cơ bản
interface Animal {
  name: string;
  makeSound(): void;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

interface Cat extends Animal {
  color: string;
  meow(): void;
}

const dog: Dog = {
  name: 'Buddy',
  breed: 'Golden Retriever',
  bark() { console.log('Woof!'); },
  makeSound() { console.log('Buddy makes a sound'); }
};

// 2. Extending với multiple interfaces
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

interface Duck extends Animal, Flyable, Swimmable {
  quack(): void;
}

const duck: Duck = {
  name: 'Daffy',
  quack() { console.log('Quack!'); },
  fly() { console.log('Flying!'); },
  swim() { console.log('Swimming!'); },
  makeSound() { console.log('Daffy makes a sound'); }
};

// 3. Extending với method overriding
interface Shape {
  getArea(): number;
  describe(): string;
}

interface Circle extends Shape {
  radius: number;

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  describe(): string {
    return `Circle with radius ${this.radius}`;
  }
}

interface Square extends Shape {
  side: number;

  getArea(): number {
    return this.side * this.side;
  }

  describe(): string {
    return `Square with side ${this.side}`;
  }
}

// 4. Extending với additional properties
interface User {
  id: number;
  name: string;
}

interface AdminUser extends User {
  role: 'admin';
  permissions: string[];
}

const adminUser: AdminUser = {
  id: 1,
  name: 'John',
  role: 'admin',
  permissions: ['read', 'write', 'delete']
};

// 5. Extending với generic interfaces
interface Box<T> {
  value: T;
}

interface NumberBox extends Box<number> {
  double(): number;
}

const numberBox: NumberBox = {
  value: 10,
  double() {
    return this.value * 2;
  }
};

// 6. Extending với method overloading
interface Processor {
  process(value: string): string;
  process(value: number): number;
}

interface StringProcessor extends Processor {
  process(value: string): string;
  toUpperCase(): string;
}

interface NumberProcessor extends Processor {
  process(value: number): number;
  toFixed(): string;
}

const stringProcessor: StringProcessor = {
  process(value) {
    return value.toUpperCase();
  },
  toUpperCase() {
    return 'ABC';
  }
};

const numberProcessor: NumberProcessor = {
  process(value) {
    return value.toFixed(2);
  },
  toFixed() {
    return '123.00';
  }
};

// 7. Extending với readonly properties
interface ReadonlyUser {
  readonly id: number;
  readonly name: string;
}

interface MutableUser extends ReadonlyUser {
  email: string;
}

const mutableUser: MutableUser = {
  id: 1,
  name: 'John',
  email: 'john@example.com'
};

// 8. Extending với computed properties
interface EventHandlers {
  [K in `on${Capitalize<string & K}`]: (event: Event) => void;
}

interface ExtendedEventHandlers extends EventHandlers {
  once<K in keyof EventHandlers>(event: EventHandlers[K]): void;
}

const handlers: ExtendedEventHandlers = {
  onClick(event: MouseEvent) {
    console.log('Clicked');
  },
  onKeydown(event: KeyboardEvent) {
    console.log('Key pressed');
  },
  once(handlers) {
    console.log('Once');
  }
};

// 9. Extending với call signatures
interface Adder {
  (a: number, b: number): number;
}

interface Multiplier extends Adder {
  multiply(a: number, b: number): number;
}

const multiplier: Multiplier = {
  add(a, b) { return a + b; },
  multiply(a, b) { return a * b; }
};

// 10. Extending với generic constraints
interface Comparable<T> {
  compare(other: T): number;
}

interface NumberComparable extends Comparable<number> {
  isGreaterThan(other: number): boolean;
}

const numberComparable: NumberComparable = {
  compare(other) {
    return this - other;
  },
  isGreaterThan(other) {
    return this > other;
  }
};
```

### Best Practices:

1. **Extend interfaces**: Dùng extends để tạo interface hierarchies
2. **Override methods**: Override methods để customize behavior
3. **Add functionality**: Dùng extends để add functionality
4. **Specialize interfaces**: Dùng extends để specialize interfaces
5. **Maintain LSP**: Maintain Liskov Substitution Principle

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Không call super method khi overriding
interface Animal {
  name: string;
  makeSound(): void;
}

interface Dog extends Animal {
  makeSound(): void {
    // Không call super.makeSound()
    console.log('Woof!');
  }
}

// ✅ Nên: Call super method khi cần
interface Dog extends Animal {
  makeSound(): void {
    super.makeSound(); // Call base class method
    console.log('Woof!');
  }
}

// ❌ Không nên: Change return type khi overriding
interface Shape {
  getArea(): number;
}

interface Circle extends Shape {
  radius: number;

  getArea(): string { // ❌ Error: Return type is incompatible
    return 'Area';
  }
}

// ✅ Nên: Maintain return type hoặc dùng compatible type
interface Circle extends Shape {
  radius: number;

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}
```

---

## Implementing interfaces?

**Implementing interfaces** - Classes implement interfaces để enforce contracts.

### Mục đích / Purpose

Implementing interfaces được dùng để:

- Enforce interface contracts
- Type-safe class implementations
- Enable polymorphism
- Define clear contracts
- Type-safe API definitions

### Khi nào dùng / When to Use

| Tình huống               | Khi nào dùng                            |
| ------------------------ | --------------------------------------- |
| Enforce contracts        | Khi cần enforce interface contracts     |
| Type-safe implementation | Khi cần type-safe class implementations |
| Polymorphism             | Khi cần polymorphism                    |
| API definitions          | Khi define API contracts                |
| Multiple interfaces      | Khi class implement multiple interfaces |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Enforcement**: Enforce interface contracts
- **Type safety**: Type-safe class implementations
- **Polymorphism**: Enable polymorphism
- **Clear contracts**: Define clear contracts
- **Better DX**: IntelliSense tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm                |
| --------------- | ------------------------- |
| Enforcement     | Verbose hơn               |
| Type safety     | Learning curve            |
| Polymorphism    | Cần understand implements |
| Clear contracts | Có thể overkill           |

### Ví dụ:

```typescript
// 1. Implementing interface cơ bản
interface Printable {
  print(): void;
}

class Document implements Printable {
  constructor(public content: string) {}

  print(): void {
    console.log(this.content);
  }
}

const doc = new Document('Hello, World!');
doc.print(); // 'Hello, World!'

// 2. Implementing multiple interfaces
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

class Duck implements Flyable, Swimmable {
  name: string;

  fly(): void {
    console.log(`${this.name} is flying`);
  }

  swim(): void {
    console.log(`${this.name} is swimming`);
  }
}

const duck = new Duck('Daffy');
duck.fly(); // 'Daffy is flying'
duck.swim(); // 'Daffy is swimming'

// 3. Implementing interface với method signatures
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}

class BasicCalculator implements Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
  multiply(a, b) { return a * b; }
  divide(a, b) { return a / b; }
}

const calc = new BasicCalculator();
console.log(calc.add(1, 2)); // 3

// 4. Implementing interface với properties
interface User {
  id: number;
  name: string;
  email: string;
}

class AdminUser implements User {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

const adminUser = new AdminUser();
adminUser.id = 1;
adminUser.name = 'John';
adminUser.email = 'john@example.com';
adminUser.role = 'admin';
adminUser.permissions = ['read', 'write'];

// 5. Implementing interface với methods
interface Animal {
  name: string;
  makeSound(): void;
}

class Dog implements Animal {
  constructor(public name: string) {}

  makeSound(): void {
    console.log('Woof!');
  }
}

class Cat implements Animal {
  constructor(public name: string) {}

  makeSound(): void {
    console.log('Meow!');
  }
}

const dog = new Dog('Buddy');
const cat = new Cat('Whiskers');
dog.makeSound(); // 'Woof!'
cat.makeSound(); // 'Meow!'

// 6. Implementing interface với generic interfaces
interface Box<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

class NumberBox implements Box<number> {
  private _value: number = 0;

  getValue(): number {
    return this._value;
  }

  setValue(value: number): void {
    this._value = value;
  }
}

const numberBox = new NumberBox();
numberBox.setValue(10);
console.log(numberBox.getValue()); // 10

// 7. Implementing interface với readonly properties
interface ReadonlyPoint {
  readonly x: number;
  readonly y: number;
}

class Point implements ReadonlyPoint {
  constructor(public x: number, public y: number) {}

  distance(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

const point = new Point(3, 4);
console.log(point.distance()); // 5

// 8. Implementing interface with call signatures
interface Adder {
  (a: number, b: number): number;
}

class Multiplier implements Adder {
  (a: number, b: number): number;

  multiply(a: number, b: number): number {
    return a * b;
  }
}

const multiplier = new Multiplier();
console.log(multiplier(2, 3)); // 6

// 9. Implementing interface với index signatures
interface Dictionary {
  [key: string]: string;
}

class StringDictionary implements Dictionary {
  private items: { [key: string]: string } = {};

  set(key: string, value: string): void {
    this.items[key] = value;
  }

  get(key: string): string | undefined {
    return this.items[key];
  }

  has(key: string): boolean {
    return key in this.items;
  }
}

const dict = new StringDictionary();
dict.set('name', 'John');
console.log(dict.get('name')); // 'John'

// 10. Implementing interface with extends
interface Animal2 {
  name: string;
  makeSound(): void;
}

class Dog2 implements Animal2 {
  constructor(public name: string) {}

  makeSound(): void {
    console.log('Woof!');
  }
}

class Cat2 extends Animal2 implements Animal2 {
  constructor(public name: string) {}

  makeSound(): void {
    console.log('Meow!');
  }
}

const dog2 = new Dog2('Buddy');
const cat2 = new Cat2('Whiskers');
dog2.makeSound(); // 'Woof!'
cat2.makeSound(); // 'Meow!'

// 11. Implementing interface với newable types
interface UserFactory {
  new (name: string, email: string): User;
}

interface User {
  id: number;
  name: string;
  email: string;
}

class UserFactoryImpl implements UserFactory {
  new(name: string, email: string): User {
    return {
      id: Date.now(),
      name,
      email
    };
  }
}

const userFactory = new UserFactoryImpl();
const user4 = userFactory.new('John', 'john@example.com');
console.log(user4); // { id: ..., name: 'John', email: 'john@example.com' }

// 12. Implementing interface với generic constraints
interface Comparable<T> {
  compare(other: T): number;
}

class Number implements Comparable<number> {
  constructor(public value: number) {}

  compare(other: number): number {
    return this.value - other;
  }
}

const num1 = new Number(10);
const num2 = new Number(20);
console.log(num1.compare(num2)); // -10

// 13. Implementing interface với multiple inheritance levels
interface Shape2 {
  getArea(): number;
}

interface Drawable {
  draw(): void;
}

class Circle2 implements Shape2, Drawable {
  constructor(public radius: number) {}

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  draw(): void {
    console.log(`Drawing circle with radius ${this.radius}`);
  }
}

const circle2 = new Circle2(10);
circle2.getArea(); // 314.159...
circle2.draw(); // 'Drawing circle with radius 10'

// 14. Implementing interface with static methods
interface MathUtils {
  static PI: number;
  add(a: number, b: number): number;
  multiply(a: number, b: number): number;
}

class MathUtilsImpl implements MathUtils {
  static PI = 3.14159;

  static add(a: number, b: number): number {
    return a + b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }
}

console.log(MathUtilsImpl.PI); // 3.14159
console.log(MathUtilsImpl.add(1, 2)); // 3
console.log(MathUtilsImpl.multiply(3, 4)); // 12

// 15. Implementing interface with getters/setters
interface TemperatureSensor {
  getTemperature(): number;
  setTemperature(value: number): void;
}

class DigitalThermometer implements TemperatureSensor {
  private _temperature: number = 20;

  getTemperature(): number {
    return this._temperature;
  }

  setTemperature(value: number): void {
    this._temperature = value;
  }
}

const thermometer = new DigitalThermometer();
thermometer.setTemperature(25);
console.log(thermometer.getTemperature()); // 25
```

### Best Practices:

1. **Implement interfaces**: Implement interfaces để enforce contracts
2. **Multiple interfaces**: Implement multiple interfaces khi cần
3. **Type-safe implementation**: Đảm bảo implementation type-safe
4. **Method signatures**: Implement tất cả method signatures
5. **Property signatures**: Implement tất cả property signatures

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Không implement tất cả methods
interface Printable {
  print(): void;
  display(): void;
}

class Document implements Printable {
  constructor(public content: string) {}

  print(): void {
    console.log(this.content);
  }
  // Quên implement display()
}

// ✅ Nên: Implement tất cả methods
class Document implements Printable {
  constructor(public content: string) {}

  print(): void {
    console.log(this.content);
  }

  display(): void {
    console.log(`Displaying: ${this.content}`);
  }
}

// ❌ Không nên: Change method signatures
interface Calculator2 {
  add(a: number, b: number): number;
}

class Calculator2 implements Calculator2 {
  add(a, b): string {
    // ❌ Error: Return type is incompatible
    return `${a} + ${b}`;
  }
}

// ✅ Nên: Maintain method signatures
class Calculator2 implements Calculator2 {
  add(a: number, b: number): number {
    return a + b;
  }
}

// ❌ Không nên: Không implement property signatures
interface User5 {
  id: number;
  name: string;
  email: string;
}

class AdminUser2 implements User5 {
  id: number;
  name: string;
  // Quên implement email
  role: string;
  permissions: string[];
}

// ✅ Nên: Implement tất cả property signatures
class AdminUser2 implements User5 {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}
```

---

## Merging interfaces?

**Merging interfaces** - Multiple interface declarations được merge thành một.

### Mục đích / Purpose

Merging interfaces được dùng để:

- Extend interfaces declaratively
- Add properties đến existing interfaces
- Split interface definitions
- Augment external types
- Create modular interfaces

### Khi nào dùng / When to Use

| Tình huống         | Khi nào dùng                            |
| ------------------ | --------------------------------------- |
| Extend interfaces  | Khi cần extend interfaces declaratively |
| Add properties     | Khi cần add properties                  |
| Split definitions  | Khi cần split interface definitions     |
| Augment types      | Khi cần augment external types          |
| Modular interfaces | Khi cần modular interfaces              |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Declarative**: Declarative extension
- **Modular**: Split interface definitions
- **Augmentation**: Augment external types
- **Flexible**: Flexible interface definitions
- **Better DX**: IntelliSense tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm      | Nhược điểm             |
| ------------ | ---------------------- |
| Declarative  | Verbose hơn            |
| Modular      | Learning curve         |
| Augmentation | Có thể confusing       |
| Flexible     | Cần understand merging |

### Ví dụ:

```typescript
// 1. Interface merging cơ bản
interface User {
  id: number;
  name: string;
}

interface User {
  email: string;
}

// User interface được merge thành:
// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

const user: User = {
  id: 1,
  name: 'John',
  email: 'john@example.com'
};

// 2. Interface merging với methods
interface Calculator {
  add(a: number, b: number): number;
}

interface Calculator {
  subtract(a: number, b: number): number;
}

// Calculator interface được merge thành:
// interface Calculator {
//   add(a: number, b: number): number;
//   subtract(a: number, b: number): number;
// }

const calc: Calculator = {
  add(a, b) { return a + b; },
  subtract(a, b) { return a - b; }
};

// 3. Interface merging với generic interfaces
interface Box<T> {
  value: T;
}

interface Box<T> {
  getValue(): T;
}

// Box interface được merge thành:
// interface Box<T> {
//   value: T;
//   getValue(): T;
// }

class NumberBox implements Box<number> {
  private _value: number = 0;

  getValue(): number {
    return this._value;
  }

  setValue(value: number): void {
    this._value = value;
  }
}

// 4. Interface merging với extends
interface Animal {
  name: string;
}

interface Animal {
  makeSound(): void;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

// Dog interface được merge thành:
// interface Dog extends Animal {
//   name: string;
//   makeSound(): void;
//   breed: string;
//   bark(): void;
// }

// 5. Interface merging với call signatures
interface Adder {
  (a: number, b: number): number;
}

interface Adder {
  multiply(a: number, b: number): number;
}

// Adder interface được merge thành:
// interface Adder {
//   (a: number, b: number): number;
//   multiply(a: number, b: number): number;
// }

// 6. Interface merging với index signatures
interface Dictionary {
  [key: string]: string;
}

interface Dictionary {
  [key: number]: string;
}

// Dictionary interface được merge thành:
// interface Dictionary {
//   [key: string]: string;
//   [key: number]: string;
// }

// 7. Interface merging với properties và methods
interface User2 {
  id: number;
  name: string;
}

interface User2 {
  email: string;
}

interface User2 {
  greet(): string;
}

// User2 interface được merge thành:
// interface User2 {
//   id: number;
//   name: string;
//   email: string;
//   greet(): string;
// }

// 8. Interface merging với readonly properties
interface Point2 {
  readonly x: number;
}

interface Point2 {
  readonly y: number;
}

// Point2 interface được merge thành:
// interface Point2 {
//   readonly x: number;
//   readonly y: number;
// }

// 9. Interface merging với computed properties
interface EventHandlers2 {
  [K in `on${Capitalize<string & K}`]: (event: Event) => void;
}

interface EventHandlers2 {
  once<K in keyof EventHandlers2>(handler: EventHandlers2[K]): void;
}

// EventHandlers2 interface được merge thành:
// interface EventHandlers2 {
//   [K in `on${Capitalize<string & K}`]: (event: Event) => void;
//   once<K in keyof EventHandlers2>(handler: EventHandlers2[K]): void;
// }

// 10. Interface merging với generic types
interface Box2<T> {
  value: T;
}

interface Box2<T> {
  getValue(): T;
  setValue(value: T): void;
}

// Box2 interface được merge thành:
// interface Box2<T> {
//   value: T;
//   getValue(): T;
//   setValue(value: T): void;
// }
```

### Best Practices:

1. **Use interface merging**: Dùng interface merging để extend interfaces declaratively
2. **Split definitions**: Split interface definitions khi cần modular code
3. **Augment types**: Dùng interface merging để augment external types
4. **Consistent naming**: Giữ consistent naming conventions
5. **Document merging**: Document rõ ràng về interface merging

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Conflict property types
interface User {
  id: number;
  name: string;
}

interface User {
  name: number; // ❌ Error: Property 'name' of type 'string' is not assignable to type 'number'
}

// ✅ Nên: Giữ consistent property types
interface User {
  id: number;
  name: string;
}

interface User {
  email: string;
}

// ❌ Không nên: Conflict method signatures
interface Calculator {
  add(a: number, b: number): number;
}

interface Calculator {
  add(a: number, b: number): string; // ❌ Error: Duplicate identifier 'add'
}

// ✅ Nên: Dùng unique method names hoặc overloads
interface Calculator {
  add(a: number, b: number): number;
  addAll(...numbers: number[]): number;
}

// ❌ Không nên: Overwrite methods
interface User3 {
  greet(): string;
}

interface User3 {
  greet(): void { // ❌ Error: Return type is incompatible
    console.log('Hello');
  }
}

// ✅ Nên: Maintain compatible signatures
interface User3 {
  greet(): string;
  greetWithPrefix(prefix: string): string;
}
```

---

## Best Practices cho Interfaces

### 1. Use Interfaces cho Object Shapes

Dùng interfaces để định nghĩa object shapes:

```typescript
// ✅ Nên
interface User {
  id: number;
  name: string;
  email: string;
}
```

### 2. Use Interface Extension

Dùng extends để tạo interface hierarchies:

```typescript
// ✅ Nên
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}
```

### 3. Implement Interfaces

Implement interfaces để enforce contracts:

```typescript
// ✅ Nên
interface Printable {
  print(): void;
}

class Document implements Printable {
  print(): void {
    console.log(this.content);
  }
}
```

### 4. Use Interface Merging

Dùng interface merging để extend interfaces:

```typescript
// ✅ Nên
interface User {
  id: number;
  name: string;
}

interface User {
  email: string;
}
```

### 5. Use Generic Interfaces

Dùng generic interfaces cho flexibility:

```typescript
// ✅ Nên
interface Box<T> {
  value: T;
}
```

---

## Anti-patterns cần tránh

### 1. Using Type Alias cho Object Shapes

```typescript
// ❌ Không nên
type User = {
  id: number;
  name: string;
  không nên dùng type alias cho object shapes
};

// ✅ Nên
interface User {
  id: number;
  name: string;
  email: string;
}
```

### 2. Not Implementing All Interface Members

```typescript
// ❌ Không nên
interface Printable {
  print(): void;
  display(): void;
}

class Document implements Printable {
  print(): void {
    console.log(this.content);
  }
  // display() không được implement
}

// ✅ Nên
interface Printable {
  print(): void;
  display(): void;
}

class Document implements Printable {
  print(): void {
    console.log(this.content);
  }

  display(): void {
    console.log(`Displaying: ${this.content}`);
  }
}
```

### 3. Conflicting Interface Merges

```typescript
// ❌ Không nên
interface User {
  id: number;
  name: string;
}

interface User {
  name: number; // Conflict type
}
```

---

_References:_

- [TypeScript Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html#interfaces)
- [TypeScript Interface vs Type Alias](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)
- [TypeScript Extending Interfaces](https://www.typescriptlang.org/docs/handbook/2/interfaces.html#extending-interfaces)
