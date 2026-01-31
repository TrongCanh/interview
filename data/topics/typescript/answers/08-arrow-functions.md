# 8. Arrow Functions

## Tổng quan về Arrow Functions

### Mục đích của Arrow Functions / Purpose

**Arrow Functions** - Cú pháp ngắn gọn cho functions trong TypeScript, với lexical `this`.

**Mục đích chính:**

- Cú pháp ngắn gọn hơn cho functions
- Lexical `this` binding
- Type-safe function expressions
- Better readability cho callbacks
- Consistent với ES6+ standards

### Khi nào cần hiểu về Arrow Functions / When to Use

Hiểu về Arrow Functions là cần thiết khi:

- Viết callbacks
- Làm việc với array methods
- Xử lý event handlers
- Type-safe function expressions
- Làm việc với `this` context

### Giúp ích gì / Benefits

**Lợi ích:**

- **Concise syntax**: Cú pháp ngắn gọn hơn
- **Lexical `this`**: `this` được inherit từ outer scope
- **Type safety**: TypeScript có thể infer types tốt hơn
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Consistent**: Consistent với ES6+ standards

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm                     |
| -------------- | ------------------------------ |
| Concise syntax | Không có `arguments` object    |
| Lexical `this` | Không thể dùng làm constructor |
| Type safety    | Learning curve                 |
| Better DX      | Có thể confusing cho beginners |

---

## Arrow function types?

**Arrow function types** - Định nghĩa types cho arrow functions.

### Mục đích / Purpose

Arrow function types được dùng để:

- Định nghĩa types cho arrow functions
- Type check function expressions
- Enable better IntelliSense
- Create type-safe callbacks

### Khi nào dùng / When to Use

| Tình huống      | Khi nào dùng  |
| --------------- | ------------- |
| Arrow functions | Luôn nên dùng |
| Callbacks       | Luôn nên dùng |
| Array methods   | Luôn nên dùng |
| Event handlers  | Luôn nên dùng |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile time
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Documentation**: Rõ ràng về function signature
- **Safer Refactoring**: Refactor an toàn hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm           |
| ----------------- | -------------------- |
| Type safety       | Verbose hơn          |
| Better DX         | Learning curve       |
| Documentation     | Cần understand types |
| Safer refactoring | Có thể overkill      |

### Ví dụ:

```typescript
// 1. Arrow function với parameter types
const greet = (name: string): string => {
  return `Hello, ${name}!`;
};

// 2. Arrow function với return type inference
const add = (a: number, b: number) => a + b; // TypeScript推断 return type là number

// 3. Arrow function với object parameter
interface User {
  id: number;
  name: string;
  email: string;
}

const displayUser = (user: User): string => {
  return `${user.name} (${user.email})`;
};

// 4. Arrow function với array methods
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((n) => n * 2); // TypeScript推断 n là number
const filtered = numbers.filter((n) => n > 2); // TypeScript推断 n là number

// 5. Arrow function với union types
const processValue = (value: string | number): string => {
  return typeof value === "string" ? value : String(value);
};

// 6. Arrow function với optional parameters
const greetUser = (name: string, greeting?: string): string => {
  return `${greeting || "Hello"}, ${name}!`;
};

// 7. Arrow function với default parameters
const greetUserDefault = (name: string, greeting: string = "Hello"): string => {
  return `${greeting}, ${name}!`;
};

// 8. Arrow function với rest parameters
const sumAll = (...numbers: number[]): number => {
  return numbers.reduce((acc, n) => acc + n, 0);
};

// 9. Arrow function với destructured parameters
interface Point {
  x: number;
  y: number;
}

const distance = ({ x, y }: Point): number => {
  return Math.sqrt(x * x + y * y);
};

// 10. Arrow function với generic types
const firstElement = <T>(arr: T[]): T | undefined => {
  return arr[0];
};

// 11. Arrow function với callback types
const fetchData = (callback: (data: string) => void): void => {
  setTimeout(() => {
    callback("Data loaded");
  }, 1000);
};

// 12. Arrow function với event handler types
const handleClick = (event: MouseEvent): void => {
  console.log("Clicked at", event.clientX, event.clientY);
};

// 13. Arrow function với Promise
const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};

// 14. Arrow function với function type alias
type AddFunction = (a: number, b: number) => number;

const add: AddFunction = (a, b) => a + b;

// 15. Arrow function với this type
interface Button {
  text: string;
  onClick: (this: Button) => void;
}

const button: Button = {
  text: "Click me",
  onClick(this: Button) {
    console.log(`Button "${this.text}" clicked`);
  },
};
```

### Best Practices:

1. **Type inference**: Để TypeScript tự推断 return types khi có thể
2. **Explicit types cho public APIs**: Khai báo types cho arrow functions public
3. **Use arrow functions cho callbacks**: Dùng arrow functions cho callbacks để tránh `this` issues
4. **Consistent syntax**: Giữ consistent syntax trong project
5. **Avoid arrow functions cho methods**: Tránh dùng arrow functions cho class methods

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng arrow function cho class methods
class Counter {
  count = 0;

  increment = () => {
    this.count++;
  };
}

// ✅ Nên: Dùng regular method
class Counter {
  count = 0;

  increment() {
    this.count++;
  }
}

// ❌ Không nên: Over-annotation
const add = (a: number, b: number): number => a + b;

// ✅ Nên: Để TypeScript infer
const add = (a: number, b: number) => a + b;
```

---

## Function type expressions?

**Function type expressions** - Định nghĩa function types với cú pháp `(params) => return`.

### Mục đích / Purpose

Function type expressions được dùng để:

- Định nghĩa function types
- Type check function expressions
- Create reusable function types
- Enable better IntelliSense

### Khi nào dùng / When to Use

| Tình huống     | Khi nào dùng                      |
| -------------- | --------------------------------- |
| Function types | Khi cần định nghĩa function types |
| Callback types | Khi cần callback types            |
| API types      | Khi cần API types                 |
| Type aliases   | Khi cần reusable types            |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Reusable Types**: Types có thể reuse
- **Type Safety**: Catch errors tại compile time
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Documentation**: Rõ ràng về function signatures

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm           |
| -------------- | -------------------- |
| Reusable types | Verbose hơn          |
| Type safety    | Learning curve       |
| Better DX      | Cần understand types |
| Documentation  | Có thể overkill      |

### Ví dụ:

```typescript
// 1. Function type expression cơ bản
type AddFunction = (a: number, b: number) => number;

const add: AddFunction = (a, b) => a + b;

// 2. Function type expression với void
type LogFunction = (message: string) => void;

const log: LogFunction = (message) => {
  console.log(message);
};

// 3. Function type expression với object parameter
interface User {
  id: number;
  name: string;
  email: string;
}

type UserFunction = (user: User) => string;

const displayUser: UserFunction = (user) => {
  return `${user.name} (${user.email})`;
};

// 4. Function type expression với array parameter
type SumFunction = (numbers: number[]) => number;

const sum: SumFunction = (numbers) => {
  return numbers.reduce((acc, n) => acc + n, 0);
};

// 5. Function type expression với generic types
type FirstElementFunction<T> = (arr: T[]) => T | undefined;

const firstElement: FirstElementFunction<number> = (arr) => {
  return arr[0];
};

// 6. Function type expression với union return types
type GetValueFunction = () => string | number;

const getValue: GetValueFunction = () => {
  return Math.random() > 0.5 ? "hello" : 123;
};

// 7. Function type expression với Promise
type FetchUserFunction = (id: number) => Promise<User>;

const fetchUser: FetchUserFunction = async (id) => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};

// 8. Function type expression với callback
type FetchDataFunction = (callback: (data: string) => void) => void;

const fetchData: FetchDataFunction = (callback) => {
  setTimeout(() => {
    callback("Data loaded");
  }, 1000);
};

// 9. Function type expression với event handler
type ClickHandlerFunction = (event: MouseEvent) => void;

const handleClick: ClickHandlerFunction = (event) => {
  console.log("Clicked at", event.clientX, event.clientY);
};

// 10. Function type expression với overloaded signatures
type ProcessFunction = {
  (value: string): string;
  (value: number): number;
};

const process: ProcessFunction = (value: string | number): string | number => {
  return value;
};

// 11. Function type expression với this type
type ButtonClickHandler = (this: Button) => void;

interface Button {
  text: string;
  onClick: ButtonClickHandler;
}

const button: Button = {
  text: "Click me",
  onClick(this: Button) {
    console.log(`Button "${this.text}" clicked`);
  },
};

// 12. Function type expression với optional parameters
type GreetFunction = (name: string, greeting?: string) => string;

const greet: GreetFunction = (name, greeting) => {
  return `${greeting || "Hello"}, ${name}!`;
};

// 13. Function type expression với rest parameters
type SumAllFunction = (...numbers: number[]) => number;

const sumAll: SumAllFunction = (...numbers) => {
  return numbers.reduce((acc, n) => acc + n, 0);
};

// 14. Function type expression với destructured parameters
interface Point {
  x: number;
  y: number;
}

type DistanceFunction = ({ x, y }: Point) => number;

const distance: DistanceFunction = ({ x, y }) => {
  return Math.sqrt(x * x + y * y);
};

// 15. Function type expression với conditional types
type ProcessFunction<T> = (value: T) => T extends string ? string : number;

const processString: ProcessFunction<string> = (value) => {
  return value.toUpperCase();
};

const processNumber: ProcessFunction<number> = (value) => {
  return value.toFixed(2);
};
```

### Best Practices:

1. **Use type aliases**: Dùng type aliases cho reusable function types
2. **Explicit types cho public APIs**: Khai báo types cho function types public
3. **Generic types**: Dùng generic types cho flexible function types
4. **Consistent naming**: Giữ consistent naming conventions
5. **Document types**: Document rõ ràng về function types

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Inline function types quá nhiều
function process(callback: (data: string) => void) {
  // implementation
}

// ✅ Nên: Dùng type alias
type CallbackFunction = (data: string) => void;

function process(callback: CallbackFunction) {
  // implementation
}

// ❌ Không nên: Dùng any cho function types
type AnyFunction = (data: any) => any;

// ✅ Nên: Dùng specific types hoặc generic types
type CallbackFunction<T> = (data: T) => void;
```

---

## Call signatures?

**Call signatures** - Định nghĩa function types trong object types.

### Mục đích / Purpose

Call signatures được dùng để:

- Định nghĩa function types trong objects
- Type check callable objects
- Create callable interfaces
- Enable better IntelliSense

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                        |
| --------------------- | ----------------------------------- |
| Callable objects      | Khi object có thể được gọi          |
| Function-like objects | Khi object có behavior như function |
| Overloaded objects    | Khi object có multiple signatures   |
| Type-safe callable    | Khi cần type-safe callable objects  |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Callable objects**: Support callable objects
- **Type safety**: Catch errors tại compile time
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Overloaded signatures**: Hỗ trợ multiple signatures

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm                     |
| --------------------- | ------------------------------ |
| Callable objects      | Verbose hơn                    |
| Type safety           | Learning curve                 |
| Better DX             | Cần understand call signatures |
| Overloaded signatures | Có thể complex                 |

### Ví dụ:

```typescript
// 1. Call signature cơ bản
interface Adder {
  (a: number, b: number): number;
}

const add: Adder = (a, b) => a + b;

// 2. Call signature với properties
interface Counter {
  (value: number): void;
  count: number;
}

const counter: Counter = (value) => {
  counter.count += value;
};
counter.count = 0;

// 3. Call signature với method
interface Calculator {
  (a: number, b: number): number;
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calculator: Calculator = (a, b) => a + b;
calculator.add = (a, b) => a + b;
calculator.subtract = (a, b) => a - b;

// 4. Call signature với generic types
interface FirstElement<T> {
  (arr: T[]): T | undefined;
}

const firstElement: FirstElement<number> = (arr) => arr[0];

// 5. Call signature với overloaded signatures
interface Process {
  (value: string): string;
  (value: number): number;
}

const process: Process = (value: string | number): string | number => {
  return value;
};

// 6. Call signature với this type
interface Button {
  (event: MouseEvent): void;
  text: string;
}

const button: Button = (event) => {
  console.log(`Button "${button.text}" clicked`);
};
button.text = "Click me";

// 7. Call signature với constructor
interface UserConstructor {
  new (name: string, email: string): User;
}

const createUser: UserConstructor = class {
  constructor(
    public name: string,
    public email: string,
  ) {}
};

// 8. Call signature với array index
interface StringArray {
  (index: number): string;
  length: number;
}

const strings: StringArray = (index) => ["a", "b", "c"][index];
strings.length = 3;

// 9. Call signature với Promise
interface FetchUser {
  (id: number): Promise<User>;
}

const fetchUser: FetchUser = async (id) => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};

// 10. Call signature với event emitter
interface EventEmitter {
  (event: string, listener: (data: any) => void): void;
  on(event: string, listener: (data: any) => void): void;
  emit(event: string, data: any): void;
}

const emitter: EventEmitter = (event, listener) => {
  emitter.on(event, listener);
};
emitter.on = (event, listener) => {
  // implementation
};
emitter.emit = (event, data) => {
  // implementation
};

// 11. Call signature với generic methods
interface Mapper<T, U> {
  (fn: (item: T) => U): U[];
  map<U2>(fn: (item: T) => U2): U2[];
}

const mapper: Mapper<number, string> = (fn) => [1, 2, 3].map(fn);
mapper.map = (fn) => [1, 2, 3].map(fn);

// 12. Call signature với conditional types
interface Processor<T> {
  (value: T): T extends string ? string : number;
}

const stringProcessor: Processor<string> = (value) => value.toUpperCase();
const numberProcessor: Processor<number> = (value) => value.toFixed(2);

// 13. Call signature với union types
interface ValueProcessor {
  (value: string | number): string;
}

const processValue: ValueProcessor = (value) => {
  return typeof value === "string" ? value : String(value);
};

// 14. Call signature với optional parameters
interface Greeter {
  (name: string, greeting?: string): string;
}

const greet: Greeter = (name, greeting) => {
  return `${greeting || "Hello"}, ${name}!`;
};

// 15. Call signature với rest parameters
interface Summer {
  (...numbers: number[]): number;
}

const sumAll: Summer = (...numbers) => {
  return numbers.reduce((acc, n) => acc + n, 0);
};
```

### Best Practices:

1. **Use call signatures**: Dùng call signatures cho callable objects
2. **Combine với properties**: Combine call signatures với properties
3. **Generic types**: Dùng generic types cho flexible call signatures
4. **Document behavior**: Document rõ ràng về callable behavior
5. **Consistent naming**: Giữ consistent naming conventions

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng function type khi call signature phù hợp hơn
type AddFunction = (a: number, b: number) => number;

// ✅ Nên: Dùng call signature cho callable objects
interface Adder {
  (a: number, b: number): number;
}

// ❌ Không nên: Không document callable behavior
interface Callable {
  (value: number): void;
}

// ✅ Nên: Document rõ ràng về callable behavior
interface Callable {
  /** Process the value */
  (value: number): void;
}
```

---

## Overload signatures?

**Overload signatures** - Định nghĩa multiple function signatures cho cùng một function.

### Mục đích / Purpose

Overload signatures được dùng để:

- Định nghĩa multiple function signatures
- Type check different parameter types
- Create flexible APIs
- Enable better IntelliSense

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                               |
| --------------------- | ------------------------------------------ |
| Multiple signatures   | Khi function có multiple signatures        |
| Flexible APIs         | Khi cần flexible APIs                      |
| Type-safe overloading | Khi cần type-safe overloading              |
| Different behaviors   | Khi behavior phụ thuộc vào parameter types |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Multiple signatures**: Hỗ trợ multiple function signatures
- **Type safety**: Catch errors tại compile time
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Flexible APIs**: Create flexible APIs

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm                 |
| ------------------- | -------------------------- |
| Multiple signatures | Verbose hơn                |
| Type safety         | Learning curve             |
| Better DX           | Cần understand overloading |
| Flexible APIs       | Có thể complex             |

### Ví dụ:

```typescript
// 1. Overload signatures cơ bản
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
  return value;
}

// 2. Overload signatures với optional parameters
function greet(name: string): string;
function greet(name: string, greeting: string): string;
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}!`;
}

// 3. Overload signatures với object types
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  side: number;
}

function getArea(shape: Circle): number;
function getArea(shape: Square): number;
function getArea(shape: Circle | Square): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "square":
      return shape.side * shape.side;
  }
}

// 4. Overload signatures với array types
function firstElement(arr: string[]): string | undefined;
function firstElement(arr: number[]): number | undefined;
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 5. Overload signatures với generic types
function firstElement<T>(arr: T[]): T | undefined;
function firstElement<T>(arr: T[], index: number): T | undefined;
function firstElement<T>(arr: T[], index?: number): T | undefined {
  return index !== undefined ? arr[index] : arr[0];
}

// 6. Overload signatures với return types
function getValue(): string;
function getValue(): number;
function getValue(): string | number {
  return Math.random() > 0.5 ? "hello" : 123;
}

// 7. Overload signatures với callback types
function fetchData(callback: (data: string) => void): void;
function fetchData(callback: (data: string) => void, timeout: number): void;
function fetchData(
  callback: (data: string) => void,
  timeout: number = 5000,
): void {
  setTimeout(() => {
    callback("Data loaded");
  }, timeout);
}

// 8. Overload signatures với event handlers
function addEventListener(
  event: "click",
  listener: (e: MouseEvent) => void,
): void;
function addEventListener(
  event: "keydown",
  listener: (e: KeyboardEvent) => void,
): void;
function addEventListener(event: string, listener: (e: Event) => void): void {
  // implementation
}

// 9. Overload signatures với Promise types
function fetchUser(id: number): Promise<User>;
function fetchUser(
  id: number,
  includeDetails: boolean,
): Promise<User & { details: string }>;
function fetchUser(
  id: number,
  includeDetails: boolean = false,
): Promise<User | (User & { details: string })> {
  const response = await fetch(`/api/users/${id}`);
  const user = await response.json();
  return includeDetails ? { ...user, details: "User details" } : user;
}

// 10. Overload signatures với constructor
interface User {
  id: number;
  name: string;
}

class UserFactory {
  constructor(name: string, email: string);
  constructor(id: number);
  constructor(nameOrId: string | number, email?: string) {
    if (typeof nameOrId === "string") {
      this.name = nameOrId;
      this.email = email || "";
    } else {
      this.id = nameOrId;
    }
  }

  id?: number;
  name?: string;
  email?: string;
}

// 11. Overload signatures với generic constraints
function process<T extends string>(value: T): string;
function process<T extends number>(value: T): number;
function process<T extends string | number>(value: T): string | number {
  return typeof value === "string" ? value.toUpperCase() : value.toFixed(2);
}

// 12. Overload signatures với conditional types
function process<T>(value: T): T extends string ? string : number;
function process<T>(value: T): T extends string ? string : number {
  return typeof value === "string" ? value.toUpperCase() : Number(value);
}

// 13. Overload signatures với union types
function process(value: string): string;
function process(value: number): number;
function process(value: boolean): boolean;
function process(value: string | number | boolean): string | number | boolean {
  return value;
}

// 14. Overload signatures với tuple types
function getPoint(x: number, y: number): [number, number];
function getPoint(point: [number, number]): [number, number];
function getPoint(
  xOrPoint: number | [number, number],
  y?: number,
): [number, number] {
  if (Array.isArray(xOrPoint)) {
    return xOrPoint;
  }
  return [xOrPoint, y!];
}

// 15. Overload signatures với discriminated unions
interface Success {
  status: "success";
  data: string;
}

interface Error {
  status: "error";
  message: string;
}

function handleResponse(response: Success): void;
function handleResponse(response: Error): void;
function handleResponse(response: Success | Error): void {
  if (response.status === "success") {
    console.log(response.data);
  } else {
    console.error(response.message);
  }
}
```

### Best Practices:

1. **Use overload signatures**: Dùng overload signatures cho multiple signatures
2. **Implementation signature**: Implementation signature phải compatible với tất cả overload signatures
3. **Order overloads**: Đặt specific overloads trước generic overloads
4. **Document overloads**: Document rõ ràng về từng overload
5. **Type-safe implementation**: Đảm bảo implementation type-safe

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Implementation signature không compatible với overloads
function process(value: string): string;
function process(value: number): number;
function process(value: any): any {
  return value;
}

// ✅ Nên: Implementation signature phải compatible với tất cả overloads
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
  return value;
}

// ❌ Không nên: Quên overload signatures
function process(value: string | number): string | number {
  return value;
}

// ✅ Nên: Thêm overload signatures
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
  return value;
}
```

---

## Best Practices cho Arrow Functions

### 1. Use Arrow Functions cho Callbacks

Dùng arrow functions cho callbacks để tránh `this` issues:

```typescript
// ✅ Nên
const handleClick = (event: MouseEvent) => {
  console.log("Clicked");
};
```

### 2. Avoid Arrow Functions cho Class Methods

Tránh dùng arrow functions cho class methods:

```typescript
// ❌ Không nên
class Counter {
  count = 0;

  increment = () => {
    this.count++;
  };
}

// ✅ Nên
class Counter {
  count = 0;

  increment() {
    this.count++;
  }
}
```

### 3. Use Type Inference

Để TypeScript tự推断 types khi có thể:

```typescript
// ✅ Nên
const add = (a: number, b: number) => a + b;
```

### 4. Use Type Aliases cho Reusable Function Types

Dùng type aliases cho reusable function types:

```typescript
// ✅ Nên
type CallbackFunction = (data: string) => void;

function process(callback: CallbackFunction) {
  // implementation
}
```

### 5. Use Overload Signatures cho Multiple Signatures

Dùng overload signatures cho multiple signatures:

```typescript
// ✅ Nên
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
  return value;
}
```

---

## Anti-patterns cần tránh

### 1. Using Arrow Functions cho Class Methods

```typescript
// ❌ Không nên
class Counter {
  count = 0;

  increment = () => {
    this.count++;
  };
}

// ✅ Nên
class Counter {
  count = 0;

  increment() {
    this.count++;
  }
}
```

### 2. Not Handling This Context

```typescript
// ❌ Không nên
const button = {
  text: "Click me",
  onClick: function () {
    console.log(`Button "${this.text}" clicked`); // ❌ Error
  },
};

// ✅ Nên
const button = {
  text: "Click me",
  onClick: function (this: Button) {
    console.log(`Button "${this.text}" clicked`);
  },
};
```

### 3. Over-annotation

```typescript
// ❌ Không nên
const add = (a: number, b: number): number => a + b;

// ✅ Nên
const add = (a: number, b: number) => a + b;
```

---

_References:_

- [TypeScript Arrow Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html#arrow-functions)
- [TypeScript Function Types](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-types)
