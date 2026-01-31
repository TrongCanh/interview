# 7. Function Types

## Tổng quan về Function Types

### Mục đích của Function Types / Purpose

**Function Types** là cách để định nghĩa types cho functions trong TypeScript.

**Mục đích chính:**

- Định nghĩa parameter types
- Định nghĩa return types
- Type check function calls
- Enable better IntelliSense và refactoring
- Ensure type safety với functions

### Khi nào cần hiểu về Function Types / When to Use

Hiểu về Function Types là cần thiết khi:

- Định nghĩa function signatures
- Type check function calls
- Work với callbacks
- Create higher-order functions
- Type check event handlers

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile time
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Self-documenting**: Code rõ ràng hơn
- **Safer Refactoring**: Refactor an toàn hơn
- **Better Error Messages**: Error messages rõ ràng hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm           |
| ----------------- | -------------------- |
| Type safety       | Verbose hơn          |
| Better DX         | Learning curve       |
| Self-documenting  | Cần understand types |
| Safer refactoring | Có thể overkill      |

---

## Function type annotations?

**Function type annotations** - Định nghĩa types cho parameters và return values.

### Mục đích / Purpose

Function type annotations được dùng để:

- Định nghĩa parameter types
- Định nghĩa return types
- Type check function calls
- Enable better IntelliSense

### Khi nào dùng / When to Use

| Tình huống         | Khi nào dùng               |
| ------------------ | -------------------------- |
| Public functions   | Luôn nên dùng              |
| API functions      | Luôn nên dùng              |
| Callbacks          | Luôn nên dùng              |
| Internal functions | Có thể để TypeScript infer |

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
// 1. Function với parameter types
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// 2. Function với return type
function add(a: number, b: number): number {
  return a + b;
}

// 3. Function với multiple parameters
function calculateTotal(price: number, quantity: number, tax: number): number {
  return price * quantity * (1 + tax);
}

// 4. Function với object parameter
interface User {
  id: number;
  name: string;
  email: string;
}

function displayUser(user: User): string {
  return `${user.name} (${user.email})`;
}

// 5. Function với array parameter
function sum(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

// 6. Function với union type parameter
function processValue(value: string | number): string {
  return typeof value === "string" ? value : String(value);
}

// 7. Function với optional parameter
function greetUser(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}!`;
}

// 8. Function với default parameter
function greetUserDefault(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

// 9. Function với rest parameter
function sumAll(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

// 10. Function với destructured parameter
interface Point {
  x: number;
  y: number;
}

function distance({ x, y }: Point): number {
  return Math.sqrt(x * x + y * y);
}

// 11. Function với tuple parameter
type Coordinate = [number, number];

function getDistance([x, y]: Coordinate): number {
  return Math.sqrt(x * x + y * y);
}

// 12. Function với this type
function greet(this: { name: string }): string {
  return `Hello, ${this.name}!`;
}

const user = { name: "John", greet };
console.log(user.greet());

// 13. Function với generic type
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNum = firstElement([1, 2, 3]); // number | undefined
const firstStr = firstElement(["a", "b", "c"]); // string | undefined

// 14. Function với conditional return type
function process<T>(value: T): T extends string ? string : number {
  return typeof value === "string" ? value.toUpperCase() : Number(value);
}

// 15. Function với overloaded signatures
function processValue(value: string): string;
function processValue(value: number): number;
function processValue(value: string | number): string | number {
  return value;
}
```

### Best Practices:

1. **Explicit types cho public APIs**: Khai báo types cho functions public
2. **Type inference cho internal functions**: Để TypeScript infer types cho internal functions
3. **Return type annotations**: Khai báo return types cho functions quan trọng
4. **Parameter types**: Luôn khai báo parameter types
5. **Consistent naming**: Giữ consistent naming conventions

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Không khai báo types cho public functions
function greet(name) {
  return `Hello, ${name}!`;
}

// ✅ Nên: Khai báo types cho public functions
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// ❌ Không nên: Dùng any cho parameters
function process(data: any) {
  return data.value;
}

// ✅ Nên: Dùng specific types hoặc generic
function process<T extends { value: unknown }>(data: T): T["value"] {
  return data.value;
}
```

---

## Parameter types?

**Parameter types** - Định nghĩa types cho function parameters.

### Mục đích / Purpose

Parameter types được dùng để:

- Định nghĩa types cho parameters
- Type check function calls
- Enable better IntelliSense
- Catch errors tại compile time

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng  |
| ------------------- | ------------- |
| Function parameters | Luôn nên dùng |
| Callback parameters | Luôn nên dùng |
| Event handlers      | Luôn nên dùng |
| API parameters      | Luôn nên dùng |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile time
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Documentation**: Rõ ràng về parameter types
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
// 1. Basic parameter types
function greet(name: string): string {
  return `Hello, ${name}!`;
}

function add(a: number, b: number): number {
  return a + b;
}

// 2. Object parameter types
interface User {
  id: number;
  name: string;
  email: string;
}

function displayUser(user: User): string {
  return `${user.name} (${user.email})`;
}

// 3. Array parameter types
function sum(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

// 4. Union type parameters
function processValue(value: string | number): string {
  return typeof value === "string" ? value : String(value);
}

// 5. Optional parameters
function greetUser(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}!`;
}

// 6. Default parameters
function greetUserDefault(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

// 7. Rest parameters
function sumAll(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

// 8. Destructured parameters
interface Point {
  x: number;
  y: number;
}

function distance({ x, y }: Point): number {
  return Math.sqrt(x * x + y * y);
}

// 9. Tuple parameters
type Coordinate = [number, number];

function getDistance([x, y]: Coordinate): number {
  return Math.sqrt(x * x + y * y);
}

// 10. Generic parameters
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 11. Function type parameters
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

// 12. Callback parameters
function fetchData(callback: (data: string) => void): void {
  setTimeout(() => {
    callback("Data loaded");
  }, 1000);
}

// 13. Event handler parameters
function handleClick(event: MouseEvent): void {
  console.log("Clicked at", event.clientX, event.clientY);
}

// 14. Promise parameters
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// 15. Overloaded parameters
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
  return value;
}
```

### Best Practices:

1. **Explicit parameter types**: Luôn khai báo parameter types
2. **Use interfaces cho objects**: Dùng interfaces cho object parameters
3. **Optional vs default**: Hiểu difference giữa optional và default parameters
4. **Rest parameters**: Dùng rest parameters cho variable arguments
5. **Destructuring**: Dùng destructuring cho complex parameters

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Không khai báo parameter types
function greet(name) {
  return `Hello, ${name}!`;
}

// ✅ Nên: Khai báo parameter types
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// ❌ Không nên: Dùng any cho parameters
function process(data: any) {
  return data.value;
}

// ✅ Nên: Dùng specific types hoặc generic
function process<T extends { value: unknown }>(data: T): T["value"] {
  return data.value;
}
```

---

## Return type annotations?

**Return type annotations** - Định nghĩa type cho function return value.

### Mục đích / Purpose

Return type annotations được dùng để:

- Định nghĩa return types
- Type check function returns
- Enable better IntelliSense
- Document function behavior

### Khi nào dùng / When to Use

| Tình huống         | Khi nào dùng               |
| ------------------ | -------------------------- |
| Public functions   | Luôn nên dùng              |
| API functions      | Luôn nên dùng              |
| Complex functions  | Luôn nên dùng              |
| Internal functions | Có thể để TypeScript infer |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile time
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Documentation**: Rõ ràng về return type
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
// 1. Basic return types
function greet(name: string): string {
  return `Hello, ${name}!`;
}

function add(a: number, b: number): number {
  return a + b;
}

// 2. Void return type
function log(message: string): void {
  console.log(message);
}

// 3. Never return type
function throwError(message: string): never {
  throw new Error(message);
}

// 4. Union return types
function getValue(): string | number {
  return Math.random() > 0.5 ? "hello" : 123;
}

// 5. Array return types
function getNumbers(): number[] {
  return [1, 2, 3, 4, 5];
}

// 6. Object return types
function getUser(): User {
  return { id: 1, name: "John", email: "john@example.com" };
}

// 7. Promise return types
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// 8. Generic return types
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 9. Conditional return types
function process<T>(value: T): T extends string ? string : number {
  return typeof value === "string" ? value.toUpperCase() : Number(value);
}

// 10. Function return types
function createAdder(a: number): (b: number) => number {
  return (b) => a + b;
}

// 11. Tuple return types
function getPoint(): [number, number] {
  return [10, 20];
}

// 12. Optional return types
function findUser(id: number): User | undefined {
  const users: User[] = [{ id: 1, name: "John", email: "john@example.com" }];
  return users.find((u) => u.id === id);
}

// 13. Null return types
function getUserEmail(id: number): string | null {
  const user = findUser(id);
  return user?.email ?? null;
}

// 14. Async return types
async function fetchData(): Promise<{ data: string; error: string | null }> {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: "", error: String(error) };
  }
}

// 15. Overloaded return types
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
  return value;
}
```

### Best Practices:

1. **Explicit return types cho public APIs**: Khai báo return types cho functions public
2. **Type inference cho internal functions**: Để TypeScript infer return types cho internal functions
3. **Void cho side effects**: Dùng `void` cho functions chỉ có side effects
4. **Never cho unreachable**: Dùng `never` cho functions không bao giờ return
5. **Promise cho async**: Dùng `Promise<T>` cho async functions

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Không khai báo return types cho public functions
function add(a: number, b: number) {
  return a + b;
}

// ✅ Nên: Khai báo return types cho public functions
function add(a: number, b: number): number {
  return a + b;
}

// ❌ Không nên: Dùng any cho return types
function process(): any {
  return { value: 123 };
}

// ✅ Nên: Dùng specific types
function process(): { value: number } {
  return { value: 123 };
}
```

---

## Optional parameters?

**Optional parameters** - Parameters có thể được omit khi gọi function.

### Mục đích / Purpose

Optional parameters được dùng để:

- Make parameters optional
- Provide default behavior
- Create flexible APIs
- Support multiple use cases

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng                             |
| ---------------------- | ---------------------------------------- |
| Optional arguments     | Khi parameter có thể không được cung cấp |
| Default behavior       | Khi có default behavior                  |
| Flexible APIs          | Khi cần flexible APIs                    |
| Backward compatibility | Khi cần backward compatibility           |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Flexibility**: Parameters có thể được omit
- **Default behavior**: Có thể provide default behavior
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Backward compatibility**: Dễ dàng maintain backward compatibility

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm           |
| ---------------------- | -------------------- |
| Flexibility            | Cần handle undefined |
| Default behavior       | Verbose hơn          |
| Better DX              | Learning curve       |
| Backward compatibility | Có thể confusing     |

### Ví dụ:

```typescript
// 1. Optional parameter với ?
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}!`;
}

greet("John"); // 'Hello, John!'
greet("John", "Hi"); // 'Hi, John!'

// 2. Multiple optional parameters
function createUser(name: string, email?: string, age?: number): User {
  return {
    id: Date.now(),
    name,
    email: email || "",
    age: age || 0,
  };
}

createUser("John"); // { id: ..., name: 'John', email: '', age: 0 }
createUser("John", "john@example.com"); // { id: ..., name: 'John', email: 'john@example.com', age: 0 }
createUser("John", "john@example.com", 30); // { id: ..., name: 'John', email: 'john@example.com', age: 30 }

// 3. Optional parameter với null check
function getLength(str: string | null): number {
  return str ? str.length : 0;
}

// 4. Optional parameter với default value
function greetUser(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

greetUser("John"); // 'Hello, John!'
greetUser("John", "Hi"); // 'Hi, John!'

// 5. Optional parameter trong object destructuring
interface Options {
  timeout?: number;
  retries?: number;
  verbose?: boolean;
}

function fetchWithTimeout(url: string, options?: Options): Promise<Response> {
  const { timeout = 5000, retries = 3, verbose = false } = options || {};
  // implementation
  return fetch(url);
}

// 6. Optional parameter với callback
function fetchData(callback?: (data: string) => void): void {
  setTimeout(() => {
    const data = "Data loaded";
    if (callback) {
      callback(data);
    }
  }, 1000);
}

fetchData(); // No callback
fetchData((data) => console.log(data)); // With callback

// 7. Optional parameter trong class methods
class Logger {
  log(message: string, level?: "info" | "warn" | "error"): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level || "info"}] ${message}`);
  }
}

const logger = new Logger();
logger.log("Hello"); // [2024-01-01T00:00:00.000Z] [info] Hello
logger.log("Warning", "warn"); // [2024-01-01T00:00:00.000Z] [warn] Warning

// 8. Optional parameter với generic types
function firstElement<T>(arr: T[], index?: number): T | undefined {
  return index !== undefined ? arr[index] : arr[0];
}

firstElement([1, 2, 3]); // 1
firstElement([1, 2, 3], 1); // 2

// 9. Optional parameter với overloaded functions
function process(value: string): string;
function process(value: string, options?: { uppercase: boolean }): string;
function process(value: string, options?: { uppercase: boolean }): string {
  return options?.uppercase ? value.toUpperCase() : value;
}

process("hello"); // 'hello'
process("hello", { uppercase: true }); // 'HELLO'

// 10. Optional parameter với type guards
function processValue(
  value: string | number,
  options?: { asString: boolean },
): string {
  if (options?.asString) {
    return String(value);
  }
  return typeof value === "string" ? value : String(value);
}

processValue(123); // '123'
processValue(123, { asString: true }); // '123'
```

### Best Practices:

1. **Optional parameters**: Dùng optional parameters khi có thể
2. **Default values**: Dùng default values thay vì optional khi phù hợp
3. **Handle undefined**: Luôn handle undefined khi dùng optional parameters
4. **Document behavior**: Document rõ ràng về optional parameter behavior
5. **Consistent ordering**: Đặt optional parameters sau required parameters

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Không handle undefined
function greet(name: string, greeting?: string): string {
  return `${greeting.toUpperCase()}, ${name}!`; // ❌ Error: Object is possibly 'undefined'
}

// ✅ Nên: Handle undefined
function greet(name: string, greeting?: string): string {
  return `${(greeting || "Hello").toUpperCase()}, ${name}!`;
}

// ❌ Không nên: Dùng optional khi default value phù hợp hơn
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}!`;
}

// ✅ Nên: Dùng default value
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}
```

---

## Default parameters?

**Default parameters** - Parameters với default values.

### Mục đích / Purpose

Default parameters được dùng để:

- Provide default values
- Simplify function calls
- Create flexible APIs
- Handle missing arguments

### Khi nào dùng / When to Use

| Tình huống     | Khi nào dùng                       |
| -------------- | ---------------------------------- |
| Default values | Khi có default value cho parameter |
| Simplify calls | Khi muốn simplify function calls   |
| Flexible APIs  | Khi cần flexible APIs              |
| Common cases   | Khi có common use case             |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Default values**: Provide default values
- **Simplify calls**: Simplify function calls
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Flexible APIs**: Create flexible APIs

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm                      |
| -------------- | ------------------------------- |
| Default values | Cần choose appropriate defaults |
| Simplify calls | Verbose hơn                     |
| Better DX      | Learning curve                  |
| Flexible APIs  | Có thể confusing                |

### Ví dụ:

```typescript
// 1. Default parameter cơ bản
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

greet("John"); // 'Hello, John!'
greet("John", "Hi"); // 'Hi, John!'

// 2. Default parameter với number
function calculateTotal(
  price: number,
  quantity: number = 1,
  tax: number = 0.1,
): number {
  return price * quantity * (1 + tax);
}

calculateTotal(100); // 110
calculateTotal(100, 2); // 220
calculateTotal(100, 2, 0.2); // 240

// 3. Default parameter với object
interface Options {
  timeout?: number;
  retries?: number;
  verbose?: boolean;
}

function fetchWithTimeout(
  url: string,
  options: Options = {},
): Promise<Response> {
  const { timeout = 5000, retries = 3, verbose = false } = options;
  // implementation
  return fetch(url);
}

// 4. Default parameter với array
function sum(numbers: number[] = []): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

sum(); // 0
sum([1, 2, 3]); // 6

// 5. Default parameter với function
function log(
  message: string,
  logger: (msg: string) => void = console.log,
): void {
  logger(message);
}

log("Hello"); // Logs to console
log("Hello", (msg) => console.error(msg)); // Logs to console.error

// 6. Default parameter với generic types
function firstElement<T>(arr: T[] = [], index: number = 0): T | undefined {
  return arr[index];
}

firstElement(); // undefined
firstElement([1, 2, 3]); // 1
firstElement([1, 2, 3], 1); // 2

// 7. Default parameter với nullish coalescing
function getValue(value: string | null, defaultValue: string = ""): string {
  return value ?? defaultValue;
}

getValue("hello"); // 'hello'
getValue(null); // ''

// 8. Default parameter trong class methods
class Calculator {
  add(a: number, b: number = 0): number {
    return a + b;
  }

  multiply(a: number, b: number = 1): number {
    return a * b;
  }
}

const calc = new Calculator();
calc.add(5); // 5
calc.add(5, 3); // 8
calc.multiply(5); // 5
calc.multiply(5, 3); // 15

// 9. Default parameter với destructuring
interface Point {
  x?: number;
  y?: number;
}

function distance(point: Point = {}): number {
  const { x = 0, y = 0 } = point;
  return Math.sqrt(x * x + y * y);
}

distance(); // 0
distance({ x: 3, y: 4 }); // 5

// 10. Default parameter với callback
function fetchData(
  callback: (data: string) => void = (data) => console.log(data),
): void {
  setTimeout(() => {
    callback("Data loaded");
  }, 1000);
}

fetchData(); // Logs to console
fetchData((data) => console.error(data)); // Logs to console.error
```

### Best Practices:

1. **Default parameters**: Dùng default parameters khi có default value
2. **Meaningful defaults**: Dùng meaningful default values
3. **Document defaults**: Document rõ ràng về default values
4. **Consistent ordering**: Đặt default parameters sau required parameters
5. **Avoid side effects**: Tránh side effects trong default values

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng optional khi default value phù hợp hơn
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}!`;
}

// ✅ Nên: Dùng default value
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

// ❌ Không nên: Dùng side effects trong default values
let counter = 0;
function increment(value: number = counter++): number {
  return value;
}

increment(); // 0
increment(); // 1 (side effect)

// ✅ Nên: Tránh side effects trong default values
function increment(value: number = 0): number {
  return value + 1;
}
```

---

## Best Practices cho Function Types

### 1. Explicit Types cho Public APIs

Khai báo types cho functions public:

```typescript
// ✅ Nên
export function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

### 2. Type Inference cho Internal Functions

Để TypeScript infer types cho internal functions:

```typescript
// ✅ Nên
function internalProcess(data) {
  return data.value;
}
```

### 3. Return Type Annotations cho Quan Trọng Functions

Khai báo return types cho functions quan trọng:

```typescript
// ✅ Nên
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}
```

### 4. Handle Undefined cho Optional Parameters

Handle undefined khi dùng optional parameters:

```typescript
// ✅ Nên
function greet(name: string, greeting?: string): string {
  return `${(greeting || "Hello").toUpperCase()}, ${name}!`;
}
```

### 5. Use Default Values khi Phù Hợp

Dùng default values thay vì optional khi phù hợp:

```typescript
// ✅ Nên
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}
```

---

## Anti-patterns cần tránh

### 1. Not Declaring Parameter Types

```typescript
// ❌ Không nên
function greet(name) {
  return `Hello, ${name}!`;
}

// ✅ Nên
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

### 2. Using Any cho Return Types

```typescript
// ❌ Không nên
function process(): any {
  return { value: 123 };
}

// ✅ Nên
function process(): { value: number } {
  return { value: 123 };
}
```

### 3. Not Handling Undefined

```typescript
// ❌ Không nên
function greet(name: string, greeting?: string): string {
  return `${greeting.toUpperCase()}, ${name}!`;
}

// ✅ Nên
function greet(name: string, greeting?: string): string {
  return `${(greeting || "Hello").toUpperCase()}, ${name}!`;
}
```

---

_References:_

- [TypeScript Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- [TypeScript Function Types](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-types)
