# 12. Inheritance

## Tổng quan về Inheritance

### Mục đích của Inheritance / Purpose

**Inheritance** - Tạo class hierarchies với TypeScript.

**Mục đích chính:**

- Create class hierarchies
- Reuse code
- Implement polymorphism
- Type-safe inheritance
- Extend existing classes

### Khi nào cần hiểu về Inheritance / When to Use

Hiểu về Inheritance là cần thiết khi:

- Tạo class hierarchies
- Reuse code giữa classes
- Implement polymorphism
- Extend existing classes
- Create type-safe inheritance

### Giúp ích gì / Benefits

**Lợi ích:**

- **Code reuse**: Reuse code giữa classes
- **Polymorphism**: Implement polymorphism
- **Type safety**: Type-safe inheritance
- **Extensibility**: Extend existing classes
- **Better DX**: IntelliSense tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm                 |
| ------------- | -------------------------- |
| Code reuse    | Verbose hơn                |
| Polymorphism  | Learning curve             |
| Type safety   | Cần understand inheritance |
| Extensibility | Có thể over-engineering    |

---

## `extends` keyword?

**extends keyword** - Tạo subclass từ base class.

### Mục đích / Purpose

`extends` keyword được dùng để:

- Tạo subclass từ base class
- Inherit members từ base class
- Override methods
- Implement polymorphism
- Create class hierarchies

### Khi nào dùng / When to Use

| Tình huống        | Khi nào dùng                   |
| ----------------- | ------------------------------ |
| Subclass creation | Khi tạo subclass từ base class |
| Inheritance       | Khi cần inherit members        |
| Method overriding | Khi cần override methods       |
| Polymorphism      | Khi implement polymorphism     |
| Class hierarchies | Khi tạo class hierarchies      |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Code reuse**: Reuse code từ base class
- **Inheritance**: Inherit members từ base class
- **Polymorphism**: Implement polymorphism
- **Type safety**: Type-safe inheritance
- **Extensibility**: Extend existing classes

### Ưu nhược điểm / Pros & Cons

| Ưu điểm      | Nhược điểm              |
| ------------ | ----------------------- |
| Code reuse   | Verbose hơn             |
| Inheritance  | Learning curve          |
| Polymorphism | Cần understand extends  |
| Type safety  | Có thể over-engineering |

### Ví dụ:

```typescript
// 1. Extends cơ bản
class Animal {
  constructor(public name: string) {}

  makeSound(): void {
    console.log(`${this.name} makes a sound`);
  }

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

const cat = new Cat("Whiskers");
cat.makeSound(); // 'Meow!'

// 2. Extends với constructor
class Vehicle {
  constructor(public speed: number = 0) {}

  accelerate(amount: number): void {
    this.speed += amount;
  }

  brake(amount: number): void {
    this.speed = Math.max(0, this.speed - amount);
  }
}

class Car extends Vehicle {
  constructor(
    speed: number,
    public brand: string,
    public model: string,
  ) {
    super(speed);
  }

  drive(): void {
    this.accelerate(10);
  }
}

const car = new Car(0, "Toyota", "Camry");
car.drive();
console.log(car.speed); // 10

// 3. Extends với method overriding
class Shape {
  constructor(public color: string) {}

  getArea(): number {
    return 0;
  }

  describe(): string {
    return `A ${this.color} shape with area ${this.getArea()}`;
  }
}

class Circle extends Shape {
  constructor(
    color: string,
    public radius: number,
  ) {
    super(color);
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Square extends Shape {
  constructor(
    color: string,
    public side: number,
  ) {
    super(color);
  }

  getArea(): number {
    return this.side * this.side;
  }
}

const circle = new Circle("red", 10);
console.log(circle.describe()); // 'A red shape with area 314.159...'

const square = new Square("blue", 5);
console.log(square.describe()); // 'A blue shape with area 25'

// 4. Extends với protected members
class Animal2 {
  constructor(public name: string) {}

  protected sleep(): void {
    console.log(`${this.name} is sleeping`);
  }
}

class Dog2 extends Animal2 {
  makeSound(): void {
    console.log("Woof!");
  }

  nap(): void {
    this.sleep(); // ✅ OK: protected member accessible in subclass
  }
}

const dog2 = new Dog2("Buddy");
dog2.nap(); // 'Buddy is sleeping'
// dog2.sleep(); // ❌ Error: Method 'sleep' is protected

// 5. Extends với abstract base class
abstract class Animal3 {
  constructor(public name: string) {}

  abstract makeSound(): void;

  move(): void {
    console.log(`${this.name} is moving`);
  }
}

class Dog3 extends Animal3 {
  makeSound(): void {
    console.log("Woof!");
  }
}

class Cat3 extends Animal3 {
  makeSound(): void {
    console.log("Meow!");
  }
}

const dog3 = new Dog3("Buddy");
dog3.makeSound(); // 'Woof!'
dog3.move(); // 'Buddy is moving'

// 6. Extends với implements interface
interface Drawable {
  draw(): void;
}

interface Movable {
  move(x: number, y: number): void;
}

class Shape2 implements Drawable, Movable {
  constructor(
    public x: number,
    public y: number,
  ) {}

  draw(): void {
    console.log(`Drawing shape at (${this.x}, ${this.y})`);
  }

  move(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}

class Circle2 extends Shape2 {
  constructor(
    x: number,
    y: number,
    public radius: number,
  ) {
    super(x, y);
  }

  draw(): void {
    console.log(
      `Drawing circle at (${this.x}, ${this.y}) with radius ${this.radius}`,
    );
  }
}

const circle2 = new Circle2(10, 20, 5);
circle2.draw(); // 'Drawing circle at (10, 20) with radius 5'

// 7. Extends với generic types
class Box<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }
}

class NumberBox extends Box<number> {
  constructor(value: number) {
    super(value);
  }

  double(): number {
    return this.value * 2;
  }
}

const numberBox = new NumberBox(10);
console.log(numberBox.double()); // 20

// 8. Extends với multiple inheritance levels
abstract class Animal4 {
  constructor(public name: string) {}

  abstract makeSound(): void;
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

// 9. Extends với static members
class BaseClass {
  static version: string = "1.0.0";

  static getVersion(): string {
    return this.version;
  }
}

class DerivedClass extends BaseClass {
  static version: string = "2.0.0";

  static getVersion(): string {
    return super.getVersion() + " (derived)";
  }
}

console.log(DerivedClass.getVersion()); // '1.0.0 (derived)'

// 10. Extends với getters/setters
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
}

class KelvinTemperature extends Temperature {
  get kelvin(): number {
    return this._celsius + 273.15;
  }

  set kelvin(value: number) {
    this._celsius = value - 273.15;
  }
}

const temp = new KelvinTemperature();
temp.celsius = 25;
console.log(temp.kelvin); // 298.15
temp.kelvin = 300;
console.log(temp.celsius); // 26.85
```

### Best Practices:

1. **Use extends cho inheritance**: Dùng `extends` cho inheritance
2. **Override methods**: Override methods để customize behavior
3. **Use super()**: Dùng `super()` để call base class constructor
4. **Protected members**: Dùng `protected` cho members cần được access trong subclasses
5. **Abstract base classes**: Dùng abstract base classes cho hierarchies

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Không call super()
class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  constructor(
    name: string,
    public breed: string,
  ) {
    this.name = name; // ❌ Error: 'this' cannot be referenced before super()
  }
}

// ✅ Nên: Call super() trước dùng this
class Dog extends Animal {
  constructor(
    name: string,
    public breed: string,
  ) {
    super(name);
  }
}

// ❌ Không nên: Override làm mất base class functionality
class Animal {
  makeSound(): void {
    console.log("Sound");
  }
}

class Dog extends Animal {
  makeSound(): void {
    // Không call super.makeSound()
    console.log("Woof!");
  }
}

// ✅ Nên: Call super method khi cần
class Dog extends Animal {
  makeSound(): void {
    super.makeSound(); // Call base method
    console.log("Woof!");
  }
}
```

---

## `super` keyword?

**super keyword** - Call base class constructor hoặc methods.

### Mục đích / Purpose

`super` keyword được dùng để:

- Call base class constructor
- Call base class methods
- Access base class members
- Override methods
- Maintain inheritance chain

### Khi nào dùng / When to Use

| Tình huống        | Khi nào dùng                    |
| ----------------- | ------------------------------- |
| Constructor calls | Khi call base class constructor |
| Method calls      | Khi call base class methods     |
| Member access     | Khi access base class members   |
| Method overriding | Khi override methods            |
| Inheritance chain | Khi maintain inheritance chain  |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Base class access**: Access base class members
- **Constructor calls**: Call base class constructor
- **Method calls**: Call base class methods
- **Inheritance chain**: Maintain inheritance chain
- **Type safety**: Type-safe base class access

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm           |
| ----------------- | -------------------- |
| Base class access | Verbose hơn          |
| Constructor calls | Learning curve       |
| Method calls      | Cần understand super |
| Inheritance chain | Có thể confusing     |

### Ví dụ:

```typescript
// 1. Super trong constructor
class Animal {
  constructor(public name: string) {}

  makeSound(): void {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(
    name: string,
    public breed: string,
  ) {
    super(name); // Call base class constructor
  }

  makeSound(): void {
    super.makeSound(); // Call base class method
    console.log("Woof!");
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
dog.makeSound(); // 'Buddy makes a sound' then 'Woof!'

// 2. Super với method overriding
class Vehicle {
  constructor(public speed: number = 0) {}

  accelerate(amount: number): void {
    this.speed += amount;
  }

  brake(amount: number): void {
    this.speed = Math.max(0, this.speed - amount);
  }
}

class Car extends Vehicle {
  constructor(
    speed: number,
    public brand: string,
  ) {
    super(speed);
  }

  accelerate(amount: number): void {
    super.accelerate(amount); // Call base class method
    console.log(`${this.brand} accelerating`);
  }
}

const car = new Car(0, "Toyota");
car.accelerate(10);
console.log(car.speed); // 10

// 3. Super với property access
class Base {
  protected value: string;

  constructor(value: string) {
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
}

class Derived extends Base {
  constructor(value: string) {
    super(value);
  }

  getUpperCaseValue(): string {
    return super.getValue().toUpperCase(); // Access base class method
  }
}

const derived = new Derived("hello");
console.log(derived.getUpperCaseValue()); // 'HELLO'

// 4. Super với multiple inheritance levels
abstract class Animal2 {
  constructor(public name: string) {}

  abstract makeSound(): void;

  move(): void {
    console.log(`${this.name} is moving`);
  }
}

class Mammal extends Animal2 {
  constructor(name: string) {
    super(name);
  }

  abstract giveBirth(): void;
}

class Dog2 extends Mammal {
  constructor(
    name: string,
    public breed: string,
  ) {
    super(name);
  }

  makeSound(): void {
    super.makeSound(); // Call base class method
    console.log("Woof!");
  }

  giveBirth(): void {
    console.log(`${this.name} gave birth to puppies`);
  }
}

const dog2 = new Dog2("Buddy", "Golden Retriever");
dog2.makeSound(); // 'Buddy is moving' then 'Buddy makes a sound' then 'Woof!'

// 5. Super với static methods
class BaseClass {
  static version: string = "1.0.0";

  static getVersion(): string {
    return this.version;
  }
}

class DerivedClass extends BaseClass {
  static version: string = "2.0.0";

  static getFullVersion(): string {
    return super.getVersion() + " (derived)";
  }
}

console.log(DerivedClass.getFullVersion()); // '1.0.0 (derived)'

// 6. Super với getters/setters
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
}

class KelvinTemperature extends Temperature {
  get kelvin(): number {
    return this._celsius + 273.15;
  }

  set kelvin(value: number) {
    this._celsius = value - 273.15;
  }

  get fahrenheit(): number {
    return super.fahrenheit(); // Call base class getter
  }
}

const temp = new KelvinTemperature();
temp.celsius = 25;
console.log(temp.kelvin); // 298.15
console.log(temp.fahrenheit); // 77

// 7. Super với protected members
class Animal3 {
  constructor(public name: string) {}

  protected sleep(): void {
    console.log(`${this.name} is sleeping`);
  }
}

class Dog3 extends Animal3 {
  makeSound(): void {
    console.log("Woof!");
  }

  nap(): void {
    super.sleep(); // Call protected base class method
  }
}

const dog3 = new Dog3("Buddy");
dog3.nap(); // 'Buddy is sleeping'

// 8. Super với abstract methods
abstract class Animal4 {
  constructor(public name: string) {}

  abstract makeSound(): void;

  move(): void {
    console.log(`${this.name} is moving`);
  }
}

class Dog4 extends Animal4 {
  makeSound(): void {
    super.move(); // Call base class method
    console.log("Woof!");
  }
}

const dog4 = new Dog4("Buddy");
dog4.makeSound(); // 'Buddy is moving' then 'Woof!'

// 9. Super với implements interface
interface Drawable {
  draw(): void;
}

interface Movable {
  move(x: number, y: number): void;
}

class Shape2 implements Drawable, Movable {
  constructor(
    public x: number,
    public y: number,
  ) {}

  draw(): void {
    console.log(`Drawing shape at (${this.x}, ${this.y})`);
  }

  move(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}

class Circle2 extends Shape2 {
  constructor(
    x: number,
    y: number,
    public radius: number,
  ) {
    super(x, y);
  }

  draw(): void {
    super.draw(); // Call base class method
    console.log(`Drawing circle with radius ${this.radius}`);
  }
}

const circle2 = new Circle2(10, 20, 5);
circle2.draw(); // 'Drawing shape at (10, 20)' then 'Drawing circle with radius 5'

// 10. Super với generic types
class Box<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }
}

class NumberBox extends Box<number> {
  constructor(value: number) {
    super(value);
  }

  double(): number {
    return super.getValue() * 2; // Call base class method
  }
}

const numberBox = new NumberBox(10);
console.log(numberBox.double()); // 20
```

### Best Practices:

1. **Call super() trong constructor**: Luôn call `super()` trước dùng `this`
2. **Use super cho method calls**: Dùng `super` để call base class methods
3. **Override methods**: Override methods để customize behavior
4. **Maintain inheritance chain**: Maintain inheritance chain với `super`
5. **Type-safe access**: Type-safe access đến base class members

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng this trước super()
class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  constructor(
    name: string,
    public breed: string,
  ) {
    this.name = name; // ❌ Error: 'this' cannot be referenced before super()
  }
}

// ✅ Nên: Call super() trước dùng this
class Dog extends Animal {
  constructor(
    name: string,
    public breed: string,
  ) {
    super(name);
  }
}

// ❌ Không nên: Không call super method
class Animal {
  makeSound(): void {
    console.log("Sound");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}

// ✅ Nên: Call super method khi cần
class Dog extends Animal {
  makeSound(): void {
    super.makeSound();
    console.log("Woof!");
  }
}
```

---

## Method overriding?

**Method overriding** - Override methods từ base class.

### Mục đích / Purpose

Method overriding được dùng để:

- Customize behavior từ base class
- Implement polymorphism
- Extend functionality
- Override base class methods
- Type-safe overriding

### Khi nào dùng / When to Use

| Tình huống           | Khi nào dùng                             |
| -------------------- | ---------------------------------------- |
| Customize behavior   | Khi cần customize behavior từ base class |
| Polymorphism         | Khi implement polymorphism               |
| Extend functionality | Khi cần extend functionality             |
| Override methods     | Khi cần override base class methods      |
| Type-safe overriding | Khi cần type-safe overriding             |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Customize behavior**: Customize behavior từ base class
- **Polymorphism**: Implement polymorphism
- **Extend functionality**: Extend functionality từ base class
- **Type safety**: Type-safe overriding
- **Better DX**: IntelliSense tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm              | Nhược điểm                |
| -------------------- | ------------------------- |
| Customize behavior   | Verbose hơn               |
| Polymorphism         | Learning curve            |
| Extend functionality | Cần understand overriding |
| Type safety          | Có thể confusing          |

### Ví dụ:

```typescript
// 1. Method overriding cơ bản
class Animal {
  constructor(public name: string) {}

  makeSound(): void {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  makeSound(): void {
    super.makeSound(); // Call base class method
    console.log("Woof!");
  }
}

const dog = new Dog("Buddy");
dog.makeSound(); // 'Buddy makes a sound' then 'Woof!'

// 2. Method overriding với different return types
class Shape {
  constructor(public color: string) {}

  getArea(): number {
    return 0;
  }

  describe(): string {
    return `A ${this.color} shape`;
  }
}

class Circle extends Shape {
  constructor(
    color: string,
    public radius: number,
  ) {
    super(color);
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  describe(): string {
    return `${super.describe()} with radius ${this.radius}`;
  }
}

const circle = new Circle("red", 10);
console.log(circle.describe()); // 'A red shape with radius 10'

// 3. Method overriding với additional parameters
class Vehicle {
  constructor(public speed: number = 0) {}

  accelerate(amount: number): void {
    this.speed += amount;
  }

  brake(amount: number): void {
    this.speed = Math.max(0, this.speed - amount);
  }
}

class Car extends Vehicle {
  constructor(
    speed: number,
    public brand: string,
  ) {
    super(speed);
  }

  accelerate(amount: number, turbo: boolean = false): void {
    if (turbo) {
      this.speed += amount * 2;
    } else {
      super.accelerate(amount);
    }
  }
}

const car = new Car(0, "Toyota");
car.accelerate(10, true);
console.log(car.speed); // 20

// 4. Method overriding với protected methods
class Animal2 {
  constructor(public name: string) {}

  protected sleep(): void {
    console.log(`${this.name} is sleeping`);
  }

  wakeUp(): void {
    console.log(`${this.name} woke up`);
  }
}

class Dog2 extends Animal2 {
  makeSound(): void {
    console.log("Woof!");
  }

  nap(): void {
    super.sleep(); // Call protected base class method
    console.log("Dog is napping");
  }
}

const dog2 = new Dog2("Buddy");
dog2.nap(); // 'Buddy is sleeping' then 'Dog is napping'

// 5. Method overriding với abstract methods
abstract class Animal3 {
  constructor(public name: string) {}

  abstract makeSound(): void;

  move(): void {
    console.log(`${this.name} is moving`);
  }
}

class Dog3 extends Animal3 {
  makeSound(): void {
    super.move(); // Call base class method
    console.log("Woof!");
  }
}

const dog3 = new Dog3("Buddy");
dog3.makeSound(); // 'Buddy is moving' then 'Woof!'

// 6. Method overriding với getters/setters
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
}

class KelvinTemperature extends Temperature {
  get kelvin(): number {
    return this._celsius + 273.15;
  }

  set kelvin(value: number) {
    this._celsius = value - 273.15;
  }

  get fahrenheit(): number {
    return super.fahrenheit() + " (Kelvin)";
  }
}

const temp = new KelvinTemperature();
temp.celsius = 25;
console.log(temp.fahrenheit); // '77 (Kelvin)'

// 7. Method overriding với static methods
class BaseClass {
  static version: string = "1.0.0";

  static getVersion(): string {
    return this.version;
  }
}

class DerivedClass extends BaseClass {
  static version: string = "2.0.0";

  static getVersion(): string {
    return super.getVersion() + " (derived)";
  }
}

console.log(DerivedClass.getVersion()); // '1.0.0 (derived)'

// 8. Method overriding với generic types
class Box<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }
}

class NumberBox extends Box<number> {
  constructor(value: number) {
    super(value);
  }

  getValue(): string {
    return super.getValue().toString();
  }
}

const numberBox = new NumberBox(10);
console.log(numberBox.getValue()); // '10'

// 9. Method overriding với implements interface
interface Drawable {
  draw(): void;
}

class Shape2 implements Drawable {
  constructor(
    public x: number,
    public y: number,
  ) {}

  draw(): void {
    console.log(`Drawing shape at (${this.x}, ${this.y})`);
  }
}

class Circle2 extends Shape2 {
  constructor(
    x: number,
    y: number,
    public radius: number,
  ) {
    super(x, y);
  }

  draw(): void {
    super.draw(); // Call base class method
    console.log(`Drawing circle with radius ${this.radius}`);
  }
}

const circle2 = new Circle2(10, 20, 5);
circle2.draw(); // 'Drawing shape at (10, 20)' then 'Drawing circle with radius 5'

// 10. Method overriding với multiple inheritance levels
abstract class Animal4 {
  constructor(public name: string) {}

  abstract makeSound(): void;

  move(): void {
    console.log(`${this.name} is moving`);
  }
}

class Mammal extends Animal4 {
  constructor(name: string) {
    super(name);
  }

  abstract giveBirth(): void;
}

class Dog4 extends Mammal {
  constructor(
    name: string,
    public breed: string,
  ) {
    super(name);
  }

  makeSound(): void {
    super.move(); // Call base class method
    console.log("Woof!");
  }

  giveBirth(): void {
    console.log(`${this.name} gave birth to puppies`);
  }
}

const dog4 = new Dog4("Buddy", "Golden Retriever");
dog4.makeSound(); // 'Buddy is moving' then 'Woof!'
```

### Best Practices:

1. **Override methods**: Override methods để customize behavior
2. **Call super methods**: Dùng `super` để call base class methods
3. **Maintain LSP**: Maintain Liskov Substitution Principle
4. **Type-safe overriding**: Đảm bảo overriding type-safe
5. **Document overrides**: Document rõ ràng về method overriding

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Không call super method
class Animal {
  makeSound(): void {
    console.log("Sound");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}

// ✅ Nên: Call super method khi cần
class Dog extends Animal {
  makeSound(): void {
    super.makeSound();
    console.log("Woof!");
  }
}

// ❌ Không nên: Change return type khi overriding
class Animal {
  makeSound(): string {
    return "Sound";
  }
}

class Dog extends Animal {
  makeSound(): void {
    // ❌ Error: Return type is incompatible
    console.log("Woof!");
  }
}

// ✅ Nên: Maintain return type hoặc dùng compatible return type
class Dog extends Animal {
  makeSound(): string {
    return super.makeSound() + " Woof!";
  }
}
```

---

## Polymorphism trong TypeScript?

**Polymorphism** - Same interface, different implementations.

### Mục đích / Purpose

Polymorphism được dùng để:

- Implement same interface khác nhau
- Type-safe polymorphism
- Flexible code
- Runtime polymorphism
- Compile-time polymorphism

### Khi nào dùng / When to Use

| Tình huống                | Khi nào dùng                                |
| ------------------------- | ------------------------------------------- |
| Same interface            | Khi cần same interface khác implementations |
| Type-safe polymorphism    | Khi cần type-safe polymorphism              |
| Flexible code             | Khi cần flexible code                       |
| Runtime polymorphism      | Khi cần runtime polymorphism                |
| Compile-time polymorphism | Khi cần compile-time polymorphism           |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Flexible code**: Code flexible với polymorphism
- **Type safety**: Type-safe polymorphism
- **Extensibility**: Dễ dàng extend
- **Maintainability**: Dễ maintain hơn
- **Better DX**: IntelliSense tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm                  |
| --------------- | --------------------------- |
| Flexible code   | Verbose hơn                 |
| Type safety     | Learning curve              |
| Extensibility   | Cần understand polymorphism |
| Maintainability | Có thể over-engineering     |

### Ví dụ:

```typescript
// 1. Polymorphism với interface
interface Shape {
  getArea(): number;
  getPerimeter(): number;
}

class Circle implements Shape {
  constructor(public radius: number) {}

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Square implements Shape {
  constructor(public side: number) {}

  getArea(): number {
    return this.side * this.side;
  }

  getPerimeter(): number {
    return 4 * this.side;
  }
}

function calculateTotalArea(shapes: Shape[]): number {
  return shapes.reduce((total, shape) => total + shape.getArea(), 0);
}

const shapes: Shape[] = [new Circle(10), new Square(5)];

console.log(calculateTotalArea(shapes)); // 314.159... + 25 = 339.159...

// 2. Polymorphism với abstract class
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

function makeAnimalSound(animal: Animal): void {
  animal.makeSound();
}

const animals: Animal[] = [new Dog("Buddy"), new Cat("Whiskers")];

animals.forEach((animal) => makeAnimalSound(animal));

// 3. Polymorphism với method overriding
class Vehicle {
  constructor(public speed: number = 0) {}

  accelerate(amount: number): void {
    this.speed += amount;
  }

  brake(amount: number): void {
    this.speed = Math.max(0, this.speed - amount);
  }
}

class Car extends Vehicle {
  constructor(
    speed: number,
    public brand: string,
  ) {
    super(speed);
  }

  accelerate(amount: number): void {
    super.accelerate(amount);
    console.log(`${this.brand} accelerating`);
  }
}

class Bike extends Vehicle {
  constructor(
    speed: number,
    public type: string,
  ) {
    super(speed);
  }

  accelerate(amount: number): void {
    super.accelerate(amount);
    console.log(`Bike ${this.type} accelerating`);
  }
}

function accelerateVehicle(vehicle: Vehicle, amount: number): void {
  vehicle.accelerate(amount);
}

const vehicles: Vehicle[] = [new Car(0, "Toyota"), new Bike(0, "Mountain")];

vehicles.forEach((vehicle) => accelerateVehicle(vehicle, 10));

// 4. Polymorphism với generic types
interface Repository<T> {
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: number): Promise<void>;
}

class UserRepository implements Repository<User> {
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

class ProductRepository implements Repository<Product> {
  private products: Product[] = [];

  async findById(id: number): Promise<Product | null> {
    return this.products.find((p) => p.id === id) || null;
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async save(entity: Product): Promise<Product> {
    this.products.push(entity);
    return entity;
  }

  async delete(id: number): Promise<void> {
    this.products = this.products.filter((p) => p.id !== id);
  }
}

async function findEntity<T>(
  repo: Repository<T>,
  id: number,
): Promise<T | null> {
  return repo.findById(id);
}

const userRepo = new UserRepository();
const productRepo = new ProductRepository();

const user = await findEntity(userRepo, 1);
const product = await findEntity(productRepo, 1);

// 5. Polymorphism với function overloads
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
  return value;
}

const str = process("hello"); // 'hello'
const num = process(123); // 123

// 6. Polymorphism với union types
type Shape2 = Circle | Square;

function getArea(shape: Shape2): number {
  if (shape instanceof Circle) {
    return Math.PI * shape.radius * shape.radius;
  } else {
    return shape.side * shape.side;
  }
}

class Circle {
  constructor(public radius: number) {}
}

class Square {
  constructor(public side: number) {}
}

const shape2: Shape2 = new Circle(10);
console.log(getArea(shape2)); // 314.159...

// 7. Polymorphism với discriminated unions
type Event =
  | { type: "click"; x: number; y: number }
  | { type: "keydown"; key: string }
  | { type: "scroll"; scrollTop: number };

function handleEvent(event: Event): void {
  switch (event.type) {
    case "click":
      console.log(`Clicked at (${event.x}, ${event.y})`);
      break;
    case "keydown":
      console.log(`Key pressed: ${event.key}`);
      break;
    case "scroll":
      console.log(`Scrolled to ${event.scrollTop}`);
      break;
  }
}

handleEvent({ type: "click", x: 100, y: 200 });
handleEvent({ type: "keydown", key: "Enter" });
handleEvent({ type: "scroll", scrollTop: 500 });

// 8. Polymorphism với implements multiple interfaces
interface Drawable {
  draw(): void;
}

interface Movable {
  move(x: number, y: number): void;
}

interface Resizable {
  resize(width: number, height: number): void;
}

class Shape3 implements Drawable, Movable, Resizable {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
  ) {}

  draw(): void {
    console.log(`Drawing shape at (${this.x}, ${this.y})`);
  }

  move(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }
}

const shape3 = new Shape3(10, 20, 30, 40);
shape3.draw();
shape3.move(50, 60);
shape3.resize(70, 80);

// 9. Polymorphism với method chaining
class Calculator {
  protected result: number = 0;

  add(value: number): this {
    this.result += value;
    return this;
  }

  subtract(value: number): this {
    this.result -= value;
    return this;
  }

  getResult(): number {
    return this.result;
  }
}

class ScientificCalculator extends Calculator {
  multiply(value: number): this {
    this.result *= value;
    return this;
  }

  divide(value: number): this {
    this.result /= value;
    return this;
  }
}

const calc = new ScientificCalculator();
calc.add(10).subtract(5).multiply(2).divide(4);
console.log(calc.getResult()); // 12.5

// 10. Polymorphism với runtime type checking
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function processValue(value: unknown): string {
  if (isString(value)) {
    return value.toUpperCase();
  } else if (isNumber(value)) {
    return value.toFixed(2);
  }
  return "Unknown";
}

console.log(processValue("hello")); // 'HELLO'
console.log(processValue(123)); // '123.00'
console.log(processValue(true)); // 'Unknown'
```

### Best Practices:

1. **Use interfaces cho polymorphism**: Dùng interfaces cho polymorphism
2. **Implement LSP**: Maintain Liskov Substitution Principle
3. **Type-safe polymorphism**: Đảm bảo polymorphism type-safe
4. **Use abstract classes**: Dùng abstract classes cho base classes
5. **Runtime type checking**: Dùng type guards cho runtime polymorphism

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Không implement interface đúng cách
interface Shape {
  getArea(): number;
}

class Circle implements Shape {
  getArea(): string {
    // ❌ Error: Return type is incompatible
    return "Area";
  }
}

// ✅ Nên: Implement interface đúng cách
class Circle implements Shape {
  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

// ❌ Không nên: Violate LSP
class Animal {
  makeSound(): void {
    console.log("Sound");
  }
}

class Dog extends Animal {
  makeSound(): void {
    throw new Error("Cannot make sound"); // ❌ Violates LSP
  }
}

// ✅ Nên: Maintain LSP
class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}
```

---

## Implements interfaces?

**Implements interfaces** - Implement interfaces trong classes.

### Mục đích / Purpose

Implements interfaces được dùng để:

- Enforce interface contracts
- Type-safe interface implementation
- Define class contracts
- Enable polymorphism
- Type-safe class hierarchies

### Khi nào dùng / When to Use

| Tình huống               | Khi nào dùng                        |
| ------------------------ | ----------------------------------- |
| Interface contracts      | Khi cần enforce interface contracts |
| Type-safe implementation | Khi cần type-safe implementation    |
| Class contracts          | Khi define class contracts          |
| Polymorphism             | Khi cần polymorphism                |
| Type-safe hierarchies    | Khi cần type-safe class hierarchies |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Enforce contracts**: Enforce interface contracts
- **Type safety**: Type-safe interface implementation
- **Class contracts**: Define clear class contracts
- **Polymorphism**: Enable polymorphism
- **Better DX**: IntelliSense tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm                |
| ----------------- | ------------------------- |
| Enforce contracts | Verbose hơn               |
| Type safety       | Learning curve            |
| Class contracts   | Cần understand implements |
| Polymorphism      | Có thể overkill           |

### Ví dụ:

```typescript
// 1. Implements interface cơ bản
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

// 2. Implements multiple interfaces
interface Drawable {
  draw(): void;
}

interface Movable {
  move(x: number, y: number): void;
}

class Shape4 implements Drawable, Movable {
  constructor(public x: number, public y: number) {}

  draw(): void {
    console.log(`Drawing shape at (${this.x}, ${this.y})`);
  }

  move(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}

const shape4 = new Shape4(10, 20);
shape4.draw();
shape4.move(30, 40);

// 3. Implements với extends
interface Animal5 {
  name: string;
  makeSound(): void;
}

abstract class Animal6 implements Animal5 {
  constructor(public name: string) {}

  abstract makeSound(): void;
}

class Dog5 extends Animal6 {
  makeSound(): void {
    console.log('Woof!');
  }
}

const dog5 = new Dog5('Buddy');
console.log(dog5.name); // 'Buddy'
dog5.makeSound(); // 'Woof!'

// 4. Implements với generic interfaces
interface Repository<T> {
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: number): Promise<void>;
}

interface User {
  id: number;
  name: string;
  email: string;
}

class UserRepository2 implements Repository<User> {
  private users: User[] = [];

  async findById(id: number): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async save(entity: User): Promise<User> {
    this.users.push(entity);
    return entity;
  }

  async delete(id: number): Promise<void> {
    this.users = this.users.filter(u => u.id !== id);
  }
}

// 5. Implements với abstract methods
interface Shape3 {
  getArea(): number;
  getPerimeter(): number;
}

abstract class AbstractShape implements Shape3 {
  abstract getArea(): number;
  abstract getPerimeter(): number;

  describe(): string {
    return `Shape with area ${this.getArea()} and perimeter ${this.getPerimeter()}`;
  }
}

class Circle3 extends AbstractShape {
  constructor(public radius: number) {}

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

const circle3 = new Circle3(10);
console.log(circle3.describe()); // 'Shape with area 314.159... and perimeter 62.831...'

// 6. Implements với getters/setters
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

// 7. Implements với static members
interface Config {
  static readonly API_URL: string;
  static readonly TIMEOUT: number;
}

class ProductionConfig implements Config {
  static readonly API_URL = 'https://api.example.com';
  static readonly TIMEOUT = 5000;
}

console.log(ProductionConfig.API_URL); // 'https://api.example.com'

// 8. Implements với method overloads
interface Calculator2 {
  add(a: number, b: number): number;
  multiply(a: number, b: number): number;
}

class ScientificCalculator2 implements Calculator2 {
  add(a: number, b: number): number {
    return a + b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    return a / b;
  }
}

const calc2 = new ScientificCalculator2();
console.log(calc2.add(1, 2)); // 3
console.log(calc2.multiply(3, 4)); // 12
console.log(calc2.divide(10, 2)); // 5

// 9. Implements với generic classes
interface Box2<T> {
  getValue(): T;
  setValue(value: T): void;
}

class NumberBox2 implements Box2<number> {
  private value: number = 0;

  getValue(): number {
    return this.value;
  }

  setValue(value: number): void {
    this.value = value;
  }

  double(): number {
    return this.value * 2;
  }
}

const numberBox2 = new NumberBox2();
numberBox2.setValue(10);
console.log(numberBox2.getValue()); // 10
console.log(numberBox2.double()); // 20

// 10. Implements với conditional types
type Event2 = { type: 'click'; x: number; y: number }
            | { type: 'keydown'; key: string }
            | { type: 'scroll'; scrollTop: number };

interface EventHandler {
  handle(event: Event2): void;
}

class ClickHandler implements EventHandler {
  handle(event: Event2): void {
    switch (event.type) {
      case 'click':
        console.log(`Clicked at (${event.x}, ${event.y})`);
        break;
      case 'keydown':
        console.log(`Key pressed: ${event.key}`);
        break;
      case 'scroll':
        console.log(`Scrolled to ${event.scrollTop}`);
        break;
    }
  }
}

const clickHandler = new ClickHandler();
clickHandler.handle({ type: 'click', x: 100, y: 200 });
```

### Best Practices:

1. **Implement interfaces**: Implement interfaces để enforce contracts
2. **Type-safe implementation**: Đảm bảo implementation type-safe
3. **Multiple interfaces**: Implement multiple interfaces khi cần
4. **Generic interfaces**: Dùng generic interfaces cho flexibility
5. **Document implements**: Document rõ ràng về interface implementation

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Không implement interface đúng cách
interface Shape {
  getArea(): number;
}

class Circle implements Shape {
  getArea(): string {
    // ❌ Error: Return type is incompatible
    return "Area";
  }
}

// ✅ Nên: Implement interface đúng cách
class Circle implements Shape {
  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

// ❌ Không nên: Quên implement interface methods
interface Shape2 {
  getArea(): number;
  getPerimeter(): number;
}

class Square implements Shape2 {
  getArea(): number {
    return this.side * this.side;
  }
  // Quên implement getPerimeter
}

// ✅ Nên: Implement tất cả interface methods
class Square implements Shape2 {
  getArea(): number {
    return this.side * this.side;
  }

  getPerimeter(): number {
    return 4 * this.side;
  }
}
```

---

## Best Practices cho Inheritance

### 1. Use extends cho Inheritance

Dùng `extends` cho inheritance:

```typescript
// ✅ Nên
class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}
```

### 2. Call super() trong Constructor

Luôn call `super()` trước dùng `this`:

```typescript
// ✅ Nên
class Dog extends Animal {
  constructor(
    name: string,
    public breed: string,
  ) {
    super(name);
  }
}
```

### 3. Override Methods để Customize Behavior

Override methods để customize behavior:

```typescript
// ✅ Nên
class Car extends Vehicle {
  accelerate(amount: number): void {
    super.accelerate(amount);
    console.log("Car accelerating");
  }
}
```

### 4. Implement Interfaces cho Type Safety

Implement interfaces cho type safety:

```typescript
// ✅ Nên
interface Shape {
  getArea(): number;
}

class Circle implements Shape {
  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}
```

### 5. Maintain Liskov Substitution Principle

Maintain LSP:

```typescript
// ✅ Nên
class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}
```

---

## Anti-patterns cần tránh

### 1. Không Call super() trong Constructor

```typescript
// ❌ Không nên
class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  constructor(
    name: string,
    public breed: string,
  ) {
    this.name = name; // ❌ Error
  }
}

// ✅ Nên
class Dog extends Animal {
  constructor(
    name: string,
    public breed: string,
  ) {
    super(name);
  }
}
```

---

_References:_

- [TypeScript Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [TypeScript Inheritance](https://www.typescriptlang.org/docs/handbook/2/classes.html#inheritance)
- [TypeScript Extends](https://www.typescriptlang.org/docs/handbook/2/classes.html#extends-clauses)
