# 9. Generics

## Tổng quan về Generics

### Mục đích của Generics / Purpose

**Generics** - Tạo reusable components, functions, và types có thể làm việc với nhiều types khác nhau.

**Mục đích chính:**

- Create reusable components
- Type-safe generic programming
- Avoid code duplication
- Maintain type flexibility
- Enable better DX với IntelliSense

### Khi nào cần hiểu về Generics / When to Use

Hiểu về Generics là cần thiết khi:

- Tạo reusable functions
- Xây dựng generic components
- Làm việc với collections
- Type-safe generic programming
- Create flexible APIs

### Giúp ích gì / Benefits

**Lợi ích:**

- **Reusability**: Code có thể reuse với nhiều types
- **Type Safety**: Maintain type safety với generics
- **Flexibility**: Flexible với type parameters
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Less duplication**: Giảm code duplication

### Ưu nhược điểm / Pros & Cons

| Ưu điểm          | Nhược điểm                       |
| ---------------- | -------------------------------- |
| Reusability      | Learning curve cao hơn           |
| Type safety      | Verbose hơn                      |
| Flexibility      | Cần understand generics          |
| Less duplication | Có thể overkill cho simple cases |

---

## Generics là gì? Tại sao cần?

**Generics** - Variables cho types cho phép tạo reusable components.

### Mục đích / Purpose

Generics được dùng để:

- Create reusable functions
- Type-safe generic programming
- Avoid code duplication
- Maintain type flexibility

### Khi nào dùng / When to Use

| Tình huống         | Khi nào dùng                                 |
| ------------------ | -------------------------------------------- |
| Reusable functions | Khi function có thể làm việc với nhiều types |
| Generic components | Khi component có thể render nhiều types      |
| Collections        | Khi làm việc với collections                 |
| Type-safe APIs     | Khi cần type-safe APIs                       |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Reusability**: Code có thể reuse với nhiều types
- **Type Safety**: Maintain type safety
- **Flexibility**: Flexible với type parameters
- **Better DX**: IntelliSense tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm     | Nhược điểm              |
| ----------- | ----------------------- |
| Reusability | Learning curve          |
| Type safety | Verbose hơn             |
| Flexibility | Cần understand generics |

### Ví dụ:

```typescript
// 1. Generic function cơ bản
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(123); // 123
const str = identity<string>("hello"); // 'hello'

// 2. Generic function với type inference
function identity<T>(arg: T): T {
  return arg;
}

const num = identity(123); // TypeScript推断 T là number
const str = identity("hello"); // TypeScript推断 T là string

// 3. Generic function với multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p1 = pair(1, "hello"); // [number, string]
const p2 = pair("hello", true); // [string, boolean]

// 4. Generic interface
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 123 };
const stringBox: Box<string> = { value: "hello" };

// 5. Generic class
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
const num = numberStack.pop(); // number | undefined

// 6. Generic type alias
type Nullable<T> = T | null;

const nullableString: Nullable<string> = null;
const nullableNumber: Nullable<number> = 123;

// 7. Generic function với array
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNum = firstElement([1, 2, 3]); // number | undefined
const firstStr = firstElement(["a", "b", "c"]); // string | undefined

// 8. Generic function với object
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "John", age: 30 };
const name = getProperty(user, "name"); // string
const age = getProperty(user, "age"); // number

// 9. Generic function với Promise
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}

interface User {
  id: number;
  name: string;
}

const user = await fetchData<User>("/api/user"); // User

// 10. Generic function với conditional types
function process<T>(value: T): T extends string ? string : number {
  return typeof value === "string" ? value.toUpperCase() : Number(value);
}

const strResult = process("hello"); // string
const numResult = process(123); // number
```

### Best Practices:

1. **Use meaningful type parameter names**: Dùng meaningful names cho type parameters
2. **Type inference**: Để TypeScript tự推断 type parameters khi có thể
3. **Generic constraints**: Dùng generic constraints khi cần
4. **Default type parameters**: Dùng default type parameters khi phù hợp
5. **Document generics**: Document rõ ràng về generic types

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng T quá nhiều
function process<T>(value: T): T {
  return value;
}

// ✅ Nên: Dùng meaningful names
function process<TValue>(value: TValue): TValue {
  return value;
}

// ❌ Không nên: Over-specify type parameters
const num = identity<number>(123);

// ✅ Nên: Để TypeScript infer
const num = identity(123);
```

---

## Generic functions?

**Generic functions** - Functions với type parameters.

### Mục đích / Purpose

Generic functions được dùng để:

- Create reusable functions
- Type-safe generic programming
- Avoid code duplication
- Maintain type flexibility

### Khi nào dùng / When to Use

| Tình huống         | Khi nào dùng                                 |
| ------------------ | -------------------------------------------- |
| Reusable functions | Khi function có thể làm việc với nhiều types |
| Type-safe APIs     | Khi cần type-safe APIs                       |
| Collections        | Khi làm việc với collections                 |
| Utility functions  | Khi cần utility functions                    |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Reusability**: Code có thể reuse với nhiều types
- **Type Safety**: Maintain type safety
- **Flexibility**: Flexible với type parameters
- **Better DX**: IntelliSense tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm     | Nhược điểm              |
| ----------- | ----------------------- |
| Reusability | Learning curve          |
| Type safety | Verbose hơn             |
| Flexibility | Cần understand generics |

### Ví dụ:

```typescript
// 1. Generic function cơ bản
function identity<T>(arg: T): T {
  return arg;
}

// 2. Generic function với type inference
function identity<T>(arg: T): T {
  return arg;
}

const num = identity(123); // T inferred là number
const str = identity("hello"); // T inferred là string

// 3. Generic function với multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p = pair(1, "hello"); // [number, string]

// 4. Generic function với array
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const first = firstElement([1, 2, 3]); // number | undefined

// 5. Generic function với object
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "John", age: 30 };
const name = getProperty(user, "name"); // string

// 6. Generic function với Promise
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}

// 7. Generic function với conditional types
function process<T>(value: T): T extends string ? string : number {
  return typeof value === "string" ? value.toUpperCase() : Number(value);
}

// 8. Generic function với mapped types
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    result[key] = obj[key];
  });
  return result;
}

// 9. Generic function với utility types
function partial<T>(obj: T): Partial<T> {
  const result = {} as Partial<T>;
  Object.keys(obj).forEach((key) => {
    result[key as keyof T] = obj[key as keyof T];
  });
  return result;
}

// 10. Generic function với default type parameters
function createArray<T = number>(length: number, fill: T): T[] {
  return Array(length).fill(fill);
}

const nums = createArray(5, 0); // number[]
const strs = createArray(5, "hello"); // string[]
```

### Best Practices:

1. **Type inference**: Để TypeScript tự推断 type parameters khi có thể
2. **Meaningful names**: Dùng meaningful names cho type parameters
3. **Generic constraints**: Dùng generic constraints khi cần
4. **Default type parameters**: Dùng default type parameters khi phù hợp
5. **Document generics**: Document rõ ràng về generic functions

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Over-specify type parameters
const num = identity<number>(123);

// ✅ Nên: Để TypeScript infer
const num = identity(123);

// ❌ Không nên: Dùng T quá nhiều
function process<T>(value: T): T {
  return value;
}

// ✅ Nên: Dùng meaningful names
function process<TValue>(value: TValue): TValue {
  return value;
}
```

---

## Generic interfaces?

**Generic interfaces** - Interfaces với type parameters.

### Mục đích / Purpose

Generic interfaces được dùng để:

- Create reusable interfaces
- Type-safe generic components
- Define generic data structures
- Create flexible APIs

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng                                  |
| ------------------- | --------------------------------------------- |
| Reusable interfaces | Khi interface có thể làm việc với nhiều types |
| Generic components  | Khi component có thể render nhiều types       |
| Data structures     | Khi cần generic data structures               |
| Type-safe APIs      | Khi cần type-safe APIs                        |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Reusability**: Code có thể reuse với nhiều types
- **Type Safety**: Maintain type safety
- **Flexibility**: Flexible với type parameters
- **Better DX**: IntelliSense tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm     | Nhược điểm              |
| ----------- | ----------------------- |
| Reusability | Learning curve          |
| Type safety | Verbose hơn             |
| Flexibility | Cần understand generics |

### Ví dụ:

```typescript
// 1. Generic interface cơ bản
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 123 };
const stringBox: Box<string> = { value: "hello" };

// 2. Generic interface với multiple type parameters
interface Pair<T, U> {
  first: T;
  second: U;
}

const p1: Pair<number, string> = { first: 1, second: "hello" };
const p2: Pair<string, boolean> = { first: "hello", second: true };

// 3. Generic interface với methods
interface Stack<T> {
  push(item: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
}

class NumberStack implements Stack<number> {
  private items: number[] = [];

  push(item: number): void {
    this.items.push(item);
  }

  pop(): number | undefined {
    return this.items.pop();
  }

  peek(): number | undefined {
    return this.items[this.items.length - 1];
  }
}

// 4. Generic interface với constraints
interface Lengthwise<T extends { length: number }> {
  length: number;
}

function getLength<T extends Lengthwise<T>>(item: T): number {
  return item.length;
}

getLength("hello"); // 5
getLength([1, 2, 3]); // 3

// 5. Generic interface với default type parameters
interface Box<T = string> {
  value: T;
}

const defaultBox: Box = { value: "hello" }; // T inferred là string
const numberBox: Box<number> = { value: 123 };

// 6. Generic interface với conditional types
interface Processor<T> {
  process(value: T): T extends string ? string : number;
}

const stringProcessor: Processor<string> = {
  process(value) {
    return value.toUpperCase();
  },
};

// 7. Generic interface với utility types
interface PartialUser {
  id?: number;
  name?: string;
  email?: string;
}

type User = {
  id: number;
  name: string;
  email: string;
};

const partialUser: PartialUser = { id: 1 };

// 8. Generic interface với mapped types
interface ReadonlyBox<T> {
  readonly value: T;
}

const readonlyBox: ReadonlyBox<number> = { value: 123 };
// readonlyBox.value = 456; // ❌ Error

// 9. Generic interface with index signatures
interface Dictionary<T> {
  [key: string]: T;
}

const dict: Dictionary<number> = {
  one: 1,
  two: 2,
  three: 3,
};

// 10. Generic interface với recursive types
interface TreeNode<T> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}

const tree: TreeNode<number> = {
  value: 1,
  left: { value: 2 },
  right: { value: 3 },
};
```

### Best Practices:

1. **Meaningful names**: Dùng meaningful names cho type parameters
2. **Generic constraints**: Dùng generic constraints khi cần
3. **Default type parameters**: Dùng default type parameters khi phù hợp
4. **Document generics**: Document rõ ràng về generic interfaces
5. **Use with classes**: Dùng generic interfaces với classes

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng T quá nhiều
interface Box<T> {
  value: T;
}

// ✅ Nên: Dùng meaningful names
interface Box<TValue> {
  value: TValue;
}

// ❌ Không nên: Over-specify type parameters
const box: Box<number> = { value: 123 };

// ✅ Nên: Để TypeScript infer khi có thể
const box: Box = { value: 123 };
```

---

## Generic classes?

**Generic classes** - Classes với type parameters.

### Mục đích / Purpose

Generic classes được dùng để:

- Create reusable classes
- Type-safe generic components
- Define generic data structures
- Create flexible APIs

### Khi nào dùng / When to Use

| Tình huống         | Khi nào dùng                              |
| ------------------ | ----------------------------------------- |
| Reusable classes   | Khi class có thể làm việc với nhiều types |
| Generic components | Khi component có thể render nhiều types   |
| Data structures    | Khi cần generic data structures           |
| Type-safe APIs     | Khi cần type-safe APIs                    |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Reusability**: Code có thể reuse với nhiều types
- **Type Safety**: Maintain type safety
- **Flexibility**: Flexible với type parameters
- **Better DX**: IntelliSense tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm     | Nhược điểm              |
| ----------- | ----------------------- |
| Reusability | Learning curve          |
| Type safety | Verbose hơn             |
| Flexibility | Cần understand generics |

### Ví dụ:

```typescript
// 1. Generic class cơ bản
class Box<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const numberBox = new Box<number>(123);
const stringBox = new Box<string>("hello");

// 2. Generic class với multiple type parameters
class Pair<T, U> {
  constructor(
    public first: T,
    public second: U,
  ) {}

  swap(): Pair<U, T> {
    return new Pair(this.second, this.first);
  }
}

const p = new Pair(1, "hello");
const swapped = p.swap(); // Pair<string, number>

// 3. Generic class với methods
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

// 4. Generic class với constraints
class NumberBox<T extends number> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }
}

const intBox = new NumberBox<number>(123);
// const strBox = new NumberBox<string>('hello'); // ❌ Error

// 5. Generic class với static methods
class Factory<T> {
  static create(value: T): T {
    return value;
  }
}

const num = Factory.create<number>(123);
const str = Factory.create<string>("hello");

// 6. Generic class với inheritance
class Animal {
  constructor(public name: string) {}
}

class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}

class Cat extends Animal {
  meow() {
    console.log("Meow!");
  }
}

// 7. Generic class với generic methods
class Container<T> {
  constructor(private value: T) {}

  map<U>(fn: (value: T) => U): Container<U> {
    return new Container(fn(this.value));
  }

  flatMap<U>(fn: (value: T) => Container<U>): Container<U> {
    return fn(this.value);
  }
}

const container = new Container(123);
const mapped = container.map((n) => n * 2); // Container<number>

// 8. Generic class với default type parameters
class Box<T = string> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }
}

const defaultBox = new Box("hello"); // T inferred là string
const numberBox = new Box<number>(123);

// 9. Generic class với index signatures
class Dictionary<T> {
  private items: { [key: string]: T } = {};

  set(key: string, value: T): void {
    this.items[key] = value;
  }

  get(key: string): T | undefined {
    return this.items[key];
  }

  has(key: string): boolean {
    return key in this.items;
  }
}

const dict = new Dictionary<number>();
dict.set("one", 1);
dict.set("two", 2);

// 10. Generic class với recursive types
class TreeNode<T> {
  constructor(
    public value: T,
    public left?: TreeNode<T>,
    public right?: TreeNode<T>,
  ) {}

  traverse(fn: (value: T) => void): void {
    fn(this.value);
    this.left?.traverse(fn);
    this.right?.traverse(fn);
  }
}

const tree = new TreeNode(1, new TreeNode(2), new TreeNode(3));

tree.traverse((value) => console.log(value));
```

### Best Practices:

1. **Meaningful names**: Dùng meaningful names cho type parameters
2. **Generic constraints**: Dùng generic constraints khi cần
3. **Default type parameters**: Dùng default type parameters khi phù hợp
4. **Document generics**: Document rõ ràng về generic classes
5. **Use with interfaces**: Dùng generic interfaces với classes

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng T quá nhiều
class Box<T> {
  constructor(private value: T) {}
}

// ✅ Nên: Dùng meaningful names
class Box<TValue> {
  constructor(private value: TValue) {}
}

// ❌ Không nên: Over-specify type parameters
const box = new Box<number>(123);

// ✅ Nên: Để TypeScript infer khi có thể
const box = new Box(123);
```

---

## Generic constraints?

**Generic constraints** - Giới hạn type parameters với `extends` keyword.

### Mục đích / Purpose

Generic constraints được dùng để:

- Giới hạn type parameters
- Type-safe generic programming
- Ensure type compatibility
- Enable better IntelliSense

### Khi nào dùng / When to Use

| Tình huống       | Khi nào dùng                                 |
| ---------------- | -------------------------------------------- |
| Type constraints | Khi cần giới hạn type parameters             |
| Type-safe APIs   | Khi cần type-safe APIs                       |
| Property access  | Khi cần access properties của type parameter |
| Method calls     | Khi cần call methods của type parameter      |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Giới hạn type parameters
- **Better DX**: IntelliSense tốt hơn với constraints
- **Type compatibility**: Đảm bảo type compatibility
- **Error messages**: Error messages rõ ràng hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm                 |
| ------------------ | -------------------------- |
| Type safety        | Verbose hơn                |
| Better DX          | Learning curve             |
| Type compatibility | Cần understand constraints |
| Better errors      | Có thể limiting            |

### Ví dụ:

```typescript
// 1. Generic constraint với extends
interface Lengthwise {
  length: number;
}

function getLength<T extends Lengthwise>(arg: T): number {
  return arg.length;
}

getLength("hello"); // 5
getLength([1, 2, 3]); // 3
// getLength(123); // ❌ Error: Type 'number' does not satisfy the constraint 'Lengthwise'

// 2. Generic constraint với keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "John", age: 30 };
const name = getProperty(user, "name"); // string
const age = getProperty(user, "age"); // number
// const invalid = getProperty(user, 'invalid'); // ❌ Error

// 3. Generic constraint với interface
interface Printable {
  print(): void;
}

function printItem<T extends Printable>(item: T): void {
  item.print();
}

class Document implements Printable {
  print() {
    console.log("Printing document");
  }
}

printItem(new Document()); // ✅ OK
// printItem(123); // ❌ Error

// 4. Generic constraint với class
class Animal {
  constructor(public name: string) {}
}

function getName<T extends Animal>(animal: T): string {
  return animal.name;
}

class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}

getName(new Dog("Buddy")); // ✅ OK
// getName(123); // ❌ Error

// 5. Generic constraint với multiple constraints
interface Lengthwise {
  length: number;
}

interface Iterable {
  [Symbol.iterator](): Iterator;
}

function process<T extends Lengthwise & Iterable>(item: T): number {
  return item.length;
}

// 6. Generic constraint với union types
interface Shape {
  area(): number;
}

function getArea<T extends Shape>(shape: T): number {
  return shape.area();
}

class Circle implements Shape {
  constructor(public radius: number) {}
  area() {
    return Math.PI * this.radius * this.radius;
  }
}

getArea(new Circle(10)); // ✅ OK

// 7. Generic constraint với conditional types
function process<T extends string | number>(value: T): string {
  return typeof value === "string" ? value.toUpperCase() : String(value);
}

process("hello"); // ✅ OK
process(123); // ✅ OK
// process(true); // ❌ Error

// 8. Generic constraint với default type parameters
interface Box<T extends string | number = string> {
  value: T;
}

const defaultBox: Box = { value: "hello" }; // T inferred là string
const numberBox: Box<number> = { value: 123 }; // ✅ OK

// 9. Generic constraint với utility types
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    result[key] = obj[key];
  });
  return result;
}

const user = { name: "John", age: 30, email: "john@example.com" };
const partial = pick(user, ["name", "age"]); // { name: string; age: number }

// 10. Generic constraint with mapped types
interface ReadonlyBox<T extends { value: unknown }> {
  readonly value: T["value"];
}

const readonlyBox: ReadonlyBox<{ value: number }> = { value: 123 };
// readonlyBox.value = 456; // ❌ Error
```

### Best Practices:

1. **Use constraints khi cần**: Dùng generic constraints khi cần
2. **Specific constraints**: Dùng specific constraints thay vì quá generic
3. **Document constraints**: Document rõ ràng về constraints
4. **Type inference**: Để TypeScript tự推断 type parameters khi có thể
5. **Avoid overly broad constraints**: Tránh constraints quá rộng

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng quá generic constraints
function process<T extends any>(value: T): T {
  return value;
}

// ✅ Nên: Dùng specific constraints
function process<T extends string | number>(value: T): T {
  return value;
}

// ❌ Không nên: Không dùng constraints khi cần
function getProperty<T>(obj: T, key: keyof T): T[keyof T] {
  return obj[key]; // ❌ Error
}

// ✅ Nên: Dùng constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

---

## `extends` keyword trong generics?

**`extends` keyword** - Dùng để định nghĩa generic constraints.

### Mục đích / Purpose

`extends` keyword được dùng để:

- Định nghĩa generic constraints
- Giới hạn type parameters
- Ensure type compatibility
- Enable better IntelliSense

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng                      |
| ------------------- | --------------------------------- |
| Generic constraints | Khi cần giới hạn type parameters  |
| Type compatibility  | Khi cần ensure type compatibility |
| Property access     | Khi cần access properties         |
| Method calls        | Khi cần call methods              |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Giới hạn type parameters
- **Better DX**: IntelliSense tốt hơn
- **Type compatibility**: Đảm bảo type compatibility
- **Error messages**: Error messages rõ ràng hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm             |
| ------------------ | ---------------------- |
| Type safety        | Verbose hơn            |
| Better DX          | Learning curve         |
| Type compatibility | Có thể limiting        |
| Better errors      | Cần understand extends |

### Ví dụ:

```typescript
// 1. Extends với interface
interface Lengthwise {
  length: number;
}

function getLength<T extends Lengthwise>(arg: T): number {
  return arg.length;
}

// 2. Extends với keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// 3. Extends với class
class Animal {
  constructor(public name: string) {}
}

function getName<T extends Animal>(animal: T): string {
  return animal.name;
}

// 4. Extends với union types
function process<T extends string | number>(value: T): string {
  return typeof value === "string" ? value.toUpperCase() : String(value);
}

// 5. Extends với conditional types
function isString<T>(value: T): value is T extends string ? string : never {
  return typeof value === "string";
}

// 6. Extends với mapped types
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// 7. Extends với utility types
type NonNullable<T> = T extends null | undefined ? never : T;

// 8. Extends với recursive types
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// 9. Extends với template literal types
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<"click">; // 'onClick'

// 10. Extends với infer
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

### Best Practices:

1. **Use extends khi cần**: Dùng `extends` khi cần constraints
2. **Specific constraints**: Dùng specific constraints thay vì quá generic
3. **Document constraints**: Document rõ ràng về constraints
4. **Type inference**: Để TypeScript tự推断 type parameters khi có thể
5. **Avoid overly broad constraints**: Tránh constraints quá rộng

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng quá generic constraints
function process<T extends any>(value: T): T {
  return value;
}

// ✅ Nên: Dùng specific constraints
function process<T extends string | number>(value: T): T {
  return value;
}

// ❌ Không nên: Không dùng constraints khi cần
function getProperty<T>(obj: T, key: keyof T): T[keyof T] {
  return obj[key]; // ❌ Error
}

// ✅ Nên: Dùng constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

---

## Type parameters với defaults?

**Type parameters với defaults** - Default values cho type parameters.

### Mục đích / Purpose

Type parameters với defaults được dùng để:

- Provide default types
- Simplify generic usage
- Create flexible APIs
- Reduce verbosity

### Khi nào dùng / When to Use

| Tình huống       | Khi nào dùng                    |
| ---------------- | ------------------------------- |
| Default types    | Khi có default type phù hợp     |
| Simplify usage   | Khi muốn simplify generic usage |
| Flexible APIs    | Khi cần flexible APIs           |
| Reduce verbosity | Khi muốn reduce verbosity       |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Default types**: Provide default types
- **Simplify usage**: Simplify generic usage
- **Flexible APIs**: Create flexible APIs
- **Less verbose**: Reduce verbosity

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm              |
| -------------- | ----------------------- |
| Default types  | Có thể limiting         |
| Simplify usage | Learning curve          |
| Flexible APIs  | Cần understand defaults |
| Less verbose   | Có thể confusing        |

### Ví dụ:

```typescript
// 1. Type parameter với default cơ bản
interface Box<T = string> {
  value: T;
}

const defaultBox: Box = { value: "hello" }; // T inferred là string
const numberBox: Box<number> = { value: 123 };

// 2. Function với default type parameter
function identity<T = string>(arg: T): T {
  return arg;
}

const defaultResult = identity("hello"); // T inferred là string
const numberResult = identity<number>(123); // T là number

// 3. Class với default type parameter
class Stack<T = number> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

const defaultStack = new Stack(); // T inferred là number
const stringStack = new Stack<string>(); // T là string

// 4. Type alias với default type parameter
type Nullable<T = string> = T | null;

const defaultNullable: Nullable = null; // T inferred là string
const numberNullable: Nullable<number> = null; // T là number

// 5. Multiple type parameters với defaults
interface Pair<T = string, U = number> {
  first: T;
  second: U;
}

const defaultPair: Pair = { first: "hello", second: 123 };
const customPair: Pair<boolean, string> = { first: true, second: "hello" };

// 6. Generic function với default type parameter
function createArray<T = number>(length: number, fill: T): T[] {
  return Array(length).fill(fill);
}

const defaultArray = createArray(5, 0); // number[]
const stringArray = createArray<string>(5, "hello"); // string[]

// 7. Generic interface với default type parameter và constraints
interface Box<T extends string | number = string> {
  value: T;
}

const defaultBox: Box = { value: "hello" }; // T inferred là string
const numberBox: Box<number> = { value: 123 }; // ✅ OK

// 8. Type parameter với default trong mapped types
interface Box<T = string> {
  value: T;
}

type Boxes<T = string> = {
  [K in string]: Box<T>;
};

// 9. Type parameter với default trong conditional types
type NonNullable<T = string> = T extends null | undefined ? never : T;

type Result1 = NonNullable<string>; // string
type Result2 = NonNullable<string | null>; // string
type Result3 = NonNullable<string | null | undefined>; // never

// 10. Type parameter với default trong utility types
type Partial<T = { id: number; name: string }> = {
  [K in keyof T]?: T[K];
};

type DefaultPartial = Partial; // { id?: number; name?: string }
type CustomPartial = Partial<{ email: string }>; // { email?: string }
```

### Best Practices:

1. **Use defaults khi phù hợp**: Dùng default type parameters khi có default phù hợp
2. **Document defaults**: Document rõ ràng về default types
3. **Meaningful defaults**: Dùng meaningful default types
4. **Override khi cần**: Cho phép override defaults khi cần
5. **Consistent defaults**: Giữ consistent defaults trong project

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng defaults không phù hợp
interface Box<T = any> {
  value: T;
}

// ✅ Nên: Dùng meaningful defaults
interface Box<T = string> {
  value: T;
}

// ❌ Không nên: Dùng defaults khi không cần
function process<T = string>(value: T): T {
  return value;
}

// ✅ Nên: Dùng defaults khi có default phù hợp
function process<T = string>(value: T): T {
  return value;
}
```

---

## Best Practices cho Generics

### 1. Use Meaningful Type Parameter Names

Dùng meaningful names cho type parameters:

```typescript
// ✅ Nên
function identity<TValue>(value: TValue): TValue {
  return value;
}
```

### 2. Use Type Inference

Để TypeScript tự推断 type parameters khi có thể:

```typescript
// ✅ Nên
const num = identity(123);
```

### 3. Use Generic Constraints khi Cần

Dùng generic constraints khi cần:

```typescript
// ✅ Nên
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}
```

### 4. Use Default Type Parameters

Dùng default type parameters khi phù hợp:

```typescript
// ✅ Nên
interface Box<T = string> {
  value: T;
}
```

### 5. Document Generics

Document rõ ràng về generic types:

```typescript
// ✅ Nên
/**
 * Identity function that returns the input value
 * @typeparam TValue - The type of the value
 */
function identity<TValue>(value: TValue): TValue {
  return value;
}
```

---

## Anti-patterns cần tránh

### 1. Using Too Generic Type Parameters

```typescript
// ❌ Không nên
function process<T>(value: T): T {
  return value;
}

// ✅ Nên
function process<TValue>(value: TValue): TValue {
  return value;
}
```

### 2. Over-specifying Type Parameters

```typescript
// ❌ Không nên
const num = identity<number>(123);

// ✅ Nên
const num = identity(123);
```

### 3. Not Using Constraints khi Cần

```typescript
// ❌ Không nên
function getProperty<T>(obj: T, key: keyof T): T[keyof T] {
  return obj[key];
}

// ✅ Nên
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

---

_References:_

- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [TypeScript Generic Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
