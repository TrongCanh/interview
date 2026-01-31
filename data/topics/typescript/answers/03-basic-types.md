# 3. Basic Types

## Tổng quan về Basic Types

### Mục đích của Basic Types / Purpose

**Basic Types** là các kiểu dữ liệu cơ bản trong TypeScript bao gồm primitive types và special types.

**Mục đích chính:**

- Định nghĩa type cho variables, parameters, và return values
- Catch type errors tại compile time
- Cải thiện code documentation
- Enable better IntelliSense và refactoring

### Khi nào cần hiểu về Basic Types / When to Use

Hiểu về Basic Types là cần thiết khi:

- Khai báo variables với types
- Định nghĩa function signatures
- Làm việc với API responses
- Validate input data
- Debug type errors

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors trước runtime
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Self-documenting**: Code rõ ràng hơn
- **Safer Refactoring**: Refactor an toàn hơn
- **Early Error Detection**: Tìm lỗi sớm hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm                         |
| --------------------- | ---------------------------------- |
| Type safety           | Learning curve                     |
| Better DX             | Verbose hơn                        |
| Early error detection | Cần hiểu types                     |
| Safer refactoring     | Có thể overkill cho small projects |

---

## Các basic types trong TypeScript?

**Basic Types** - Các kiểu dữ liệu cơ bản trong TypeScript.

### Mục đích / Purpose

Basic types được dùng để:

- Định nghĩa type cho variables
- Khai báo parameter types cho functions
- Specify return types
- Type check expressions

### Khi nào dùng / When to Use

| Type                 | Khi nào dùng                                    |
| -------------------- | ----------------------------------------------- |
| `string`             | Cho text data                                   |
| `number`             | Cho numeric values                              |
| `boolean`            | Cho true/false                                  |
| `bigint`             | Cho integers lớn hơn 2^53-1                     |
| `symbol`             | Cho unique identifiers                          |
| `null` / `undefined` | Cho null/undefined values                       |
| `void`               | Cho functions không return gì                   |
| `never`              | Cho functions không bao giờ return              |
| `unknown`            | Cho values với type không biết trước            |
| `any`                | Cho values với bất kỳ type nào (không nên dùng) |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type safety**: Catch errors tại compile time
- **Better DX**: IntelliSense và autocomplete
- **Documentation**: Types đóng vai trò như documentation
- **Refactoring**: An toàn hơn khi refactor

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm     |
| --------------------- | -------------- |
| Type safety           | Verbose hơn    |
| Better DX             | Learning curve |
| Early error detection | Cần hiểu types |

### Ví dụ:

```typescript
// 1. String type
let name: string = "John";
let greeting: string = `Hello, ${name}!`;

// 2. Number type
let age: number = 30;
let price: number = 99.99;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// 3. Boolean type
let isActive: boolean = true;
let isComplete: boolean = false;

// 4. BigInt type (ES2020+)
let bigNumber: bigint = 100n;
let anotherBig: bigint = BigInt(100);

// 5. Symbol type
let sym: symbol = Symbol("description");
let uniqueId: symbol = Symbol("id");

// 6. Null và Undefined types
let nothing: null = null;
let notDefined: undefined = undefined;

// 7. Void type (cho functions không return gì)
function log(message: string): void {
  console.log(message);
}

// 8. Never type (cho functions không bao giờ return)
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}

// 9. Unknown type (type-safe any)
let value: unknown = "hello";
if (typeof value === "string") {
  console.log(value.toUpperCase()); // TypeScript biết đây là string
}

// 10. Any type (không nên dùng)
let anything: any = 123;
anything = "hello";
anything = { value: 123 };
```

### Type annotations vs Type inference:

```typescript
// Type annotations (explicit)
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Type inference (implicit)
let name = "John"; // TypeScript推断 là string
let age = 30; // TypeScript推断 là number
let isActive = true; // TypeScript推断 là boolean
```

### Best Practices:

1. **Use type inference**: Để TypeScript tự推断 types khi có thể
2. **Explicit types cho public APIs**: Khai báo types cho functions/interfaces public
3. **Avoid `any`**: Hạn chế dùng `any`, dùng `unknown` thay thế
4. **Use `never` cho unreachable code**: Dùng `never` cho functions không bao giờ return
5. **Use `void` cho side effects**: Dùng `void` cho functions chỉ có side effects

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng any quá nhiều
let value: any = getValue();

// ✅ Nên: Dùng type cụ thể hoặc unknown
let value: unknown = getValue();

// ❌ Không nên: Over-annotation
const name: string = "John";

// ✅ Nên: Để TypeScript infer
const name = "John";
```

---

## `any` vs `unknown`?

**any vs unknown** - Cả hai đều là top types nhưng `unknown` là type-safe hơn.

### Mục đích / Purpose

- **`any`**: Opt-out khỏi type checking hoàn toàn
- **`unknown`**: Type-safe alternative cho `any`

### Khi nào dùng / When to Use

| Type      | Khi nào dùng                                        |
| --------- | --------------------------------------------------- |
| `any`     | Khi cần opt-out type checking (không nên dùng)      |
| `unknown` | Khi type không biết trước nhưng vẫn cần type safety |

### Giúp ích gì / Benefits

**Lợi ích của `unknown`:**

- **Type-safe**: Yêu cầu type checking trước khi sử dụng
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Safer**: Catch errors tại compile time

**Nhược điểm của `any`:**

- **No type checking**: Mất type safety hoàn toàn
- **Runtime errors**: Errors có thể xảy ra tại runtime
- **Poor DX**: IntelliSense và autocomplete kém

### Ưu nhược điểm / Pros & Cons

| `unknown`           | `any`                       |
| ------------------- | --------------------------- |
| Type-safe           | No type checking            |
| Requires type guard | Có thể dùng bất kỳ cách nào |
| Better DX           | Poor DX                     |
| Catch errors early  | Runtime errors              |

### Ví dụ:

```typescript
// any - Không có type checking
let valueAny: any = 123;
valueAny = "hello";
valueAny = { value: 123 };

// Có thể truy cập bất kỳ property nào
console.log(valueAny.someProperty); // ✅ OK (nhưng có thể undefined tại runtime)
console.log(valueAny.someMethod()); // ✅ OK (nhưng có thể crash tại runtime)

// unknown - Có type checking
let valueUnknown: unknown = 123;
valueUnknown = "hello";
valueUnknown = { value: 123 };

// Không thể truy cập property mà không type check trước
// console.log(valueUnknown.someProperty); // ❌ Error: Object is of type 'unknown'

// Cần type guard trước khi dùng
if (typeof valueUnknown === "string") {
  console.log(valueUnknown.toUpperCase()); // ✅ OK - TypeScript biết đây là string
}

if (typeof valueUnknown === "object" && valueUnknown !== null) {
  console.log((valueUnknown as any).value); // ✅ OK - đã type check
}

// Ví dụ thực tế với unknown
function parseJSON(json: string): unknown {
  return JSON.parse(json);
}

const result = parseJSON('{"name": "John"}');

// Cần type guard trước khi dùng
if (typeof result === "object" && result !== null && "name" in result) {
  console.log((result as { name: string }).name); // ✅ OK
}

// Ví dụ với any (không nên)
function parseJSONAny(json: string): any {
  return JSON.parse(json);
}

const resultAny = parseJSONAny('{"name": "John"}');
console.log(resultAny.name); // ✅ OK (nhưng có thể undefined tại runtime)
```

### Type narrowing với unknown:

```typescript
function processValue(value: unknown) {
  // Type narrowing với typeof
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // value: string
  } else if (typeof value === "number") {
    console.log(value.toFixed(2)); // value: number
  } else if (typeof value === "boolean") {
    console.log(value ? "true" : "false"); // value: boolean
  } else if (value === null) {
    console.log("null value"); // value: null
  } else if (value === undefined) {
    console.log("undefined value"); // value: undefined
  } else if (Array.isArray(value)) {
    console.log(value.length); // value: unknown[]
  } else if (typeof value === "object") {
    console.log(Object.keys(value)); // value: object
  } else {
    console.log("unknown type");
  }
}
```

### Best Practices:

1. **Avoid `any`**: Hạn chế dùng `any` càng nhiều càng tốt
2. **Use `unknown`**: Dùng `unknown` thay cho `any` khi cần
3. **Type guards**: Luôn dùng type guards với `unknown`
4. **Explicit types**: Dùng explicit types thay vì `any`
5. **Gradual migration**: Migrate từ `any` sang `unknown` dần dần

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng any
function processData(data: any) {
  return data.value;
}

// ✅ Nên: Dùng unknown với type guard
function processData(data: unknown) {
  if (typeof data === "object" && data !== null && "value" in data) {
    return (data as { value: unknown }).value;
  }
  throw new Error("Invalid data");
}

// ❌ Không nên: Type assertion với any
const value = someValue as any;

// ✅ Nên: Type guard
if (typeof someValue === "string") {
  const value = someValue;
}
```

---

## `never` type là gì? Khi nào dùng?

**never type** - Type đại diện cho values không bao giờ xảy ra.

### Mục đích / Purpose

`never` được dùng để:

- Represent functions không bao giờ return
- Represent unreachable code paths
- Type narrowing trong conditional types
- Exhaustive checking

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng                        |
| ---------------------- | ----------------------------------- |
| Functions throw errors | Khi function luôn throw error       |
| Infinite loops         | Khi function có infinite loop       |
| Exhaustive checks      | Khi muốn ensure exhaustive checking |
| Type narrowing         | Trong conditional types             |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Exhaustive checking**: Đảm bảo tất cả cases được handle
- **Type safety**: Catch unreachable code
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Documentation**: Rõ ràng về behavior của function

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm                |
| ------------------- | ------------------------- |
| Exhaustive checking | Learning curve            |
| Type safety         | Có thể confusing          |
| Better DX           | Cần hiểu type system      |
| Documentation       | Overkill cho simple cases |

### Ví dụ:

```typescript
// 1. Function luôn throw error
function throwError(message: string): never {
  throw new Error(message);
}

// 2. Function với infinite loop
function infiniteLoop(): never {
  while (true) {
    // do something
  }
}

// 3. Exhaustive checking
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "triangle"; base: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "square":
      return shape.side * shape.side;
    case "triangle":
      return 0.5 * shape.base * shape.height;
    default:
      // TypeScript biết đây là never vì tất cả cases đã được handle
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

// 4. Type narrowing với never
function processValue(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // value: string
  } else if (typeof value === "number") {
    return value.toFixed(2); // value: number
  } else {
    // TypeScript biết value là never ở đây
    const _never: never = value;
    return _never;
  }
}

// 5. Assert function returns never
function assertNever(x: never): never {
  throw new Error(`Unexpected object: ${x}`);
}

// 6. Use case với discriminated unions
type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return 0;
    default:
      return assertNever(action); // Error nếu có action mới được thêm vào
  }
}

// 7. Function không bao giờ return (void vs never)
function logMessage(message: string): void {
  console.log(message);
  // Function này return undefined (void)
}

function alwaysThrow(): never {
  throw new Error("Always throws");
  // Function này không bao giờ return (never)
}

// 8. Type narrowing trong conditional types
type NonNullable<T> = T extends null | undefined ? never : T;

type Result = NonNullable<string | null>; // Result: string

// 9. Use case với type guards
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processUnknown(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // value: string
  } else {
    console.log("Not a string");
  }
}
```

### Exhaustive checking pattern:

```typescript
// Pattern để đảm bảo tất cả cases được handle
type Status = "pending" | "approved" | "rejected";

function getStatusColor(status: Status): string {
  switch (status) {
    case "pending":
      return "yellow";
    case "approved":
      return "green";
    case "rejected":
      return "red";
    default:
      // Nếu thêm status mới, TypeScript sẽ error ở đây
      const _exhaustiveCheck: never = status;
      return _exhaustiveCheck;
  }
}

// Nếu thêm status mới:
// type Status = 'pending' | 'approved' | 'rejected' | 'cancelled';
// TypeScript sẽ error: Type 'cancelled' is not assignable to type 'never'
```

### Best Practices:

1. **Exhaustive checking**: Dùng `never` cho exhaustive checks
2. **Throw functions**: Dùng `never` cho functions luôn throw
3. **Infinite loops**: Dùng `never` cho functions với infinite loops
4. **Type guards**: Dùng `never` trong type guards
5. **Documentation**: Dùng `never` để document behavior

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng void thay vì never cho functions luôn throw
function throwError(message: string): void {
  throw new Error(message);
}

// ✅ Nên: Dùng never
function throwError(message: string): never {
  throw new Error(message);
}

// ❌ Không nên: Không dùng exhaustive checking
function getStatusColor(status: Status): string {
  if (status === "pending") return "yellow";
  if (status === "approved") return "green";
  return "red"; // Có thể quên handle case
}

// ✅ Nên: Dùng exhaustive checking
function getStatusColor(status: Status): string {
  switch (status) {
    case "pending":
      return "yellow";
    case "approved":
      return "green";
    case "rejected":
      return "red";
    default:
      const _exhaustiveCheck: never = status;
      return _exhaustiveCheck;
  }
}
```

---

## `void` type là gì?

**void type** - Type đại diện cho absence of any type, thường dùng cho functions không return giá trị.

### Mục đích / Purpose

`void` được dùng để:

- Represent functions không return giá trị
- Indicate side effects
- Document function behavior
- Type check callback functions

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng                        |
| ---------------------- | ----------------------------------- |
| Functions không return | Khi function chỉ có side effects    |
| Callback functions     | Khi callback không cần return value |
| Event handlers         | Khi event handler không return gì   |
| Logging functions      | Khi function chỉ log                |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Documentation**: Rõ ràng về function behavior
- **Type safety**: Catch errors khi return value được dùng
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Consistency**: Đảm bảo consistent behavior

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm                             |
| ------------- | -------------------------------------- |
| Documentation | Có thể confusing với never             |
| Type safety   | Cần hiểu difference giữa void và never |
| Better DX     | Overkill cho simple cases              |

### Ví dụ:

```typescript
// 1. Function không return giá trị
function log(message: string): void {
  console.log(message);
}

// 2. Function với side effects
function updateUI(): void {
  document.getElementById("app")!.innerHTML = "Hello";
}

// 3. Event handler
function handleClick(event: MouseEvent): void {
  console.log("Clicked!", event.clientX, event.clientY);
}

// 4. Callback function
function fetchData(callback: (data: string) => void): void {
  setTimeout(() => {
    callback("Data loaded");
  }, 1000);
}

fetchData((data) => {
  console.log(data); // data: string
});

// 5. Arrow function với void
const greet = (name: string): void => {
  console.log(`Hello, ${name}!`);
};

// 6. Void trong method declarations
class Logger {
  log(message: string): void {
    console.log(message);
  }
}

// 7. Void vs undefined
function returnsUndefined(): undefined {
  return undefined;
}

function returnsVoid(): void {
  // Không return hoặc return undefined
}

const result1 = returnsUndefined(); // result1: undefined
const result2 = returnsVoid(); // result2: void (không thể assign)

// 8. Void type assertions
const value = someFunction() as void;

// 9. Void trong type definitions
type EventHandler = (event: Event) => void;

const handlers: EventHandler[] = [
  (e) => console.log(e.type),
  (e) => console.log(e.timeStamp),
];

// 10. Void trong generic types
function process<T>(value: T, callback: (value: T) => void): void {
  callback(value);
}

process(123, (num) => console.log(num.toFixed(2)));
process("hello", (str) => console.log(str.toUpperCase()));
```

### Void vs Never:

```typescript
// void - Function có thể return (nhưng không return value)
function logMessage(message: string): void {
  console.log(message);
  // Function này return undefined
}

// never - Function không bao giờ return
function throwError(message: string): never {
  throw new Error(message);
  // Function này không bao giờ return
}

// void có thể assign undefined
let voidVar: void = undefined; // ✅ OK

// never không thể assign bất kỳ giá trị nào
let neverVar: never;
// neverVar = undefined; // ❌ Error
```

### Best Practices:

1. **Use void cho side effects**: Dùng `void` cho functions chỉ có side effects
2. **Document behavior**: Dùng `void` để document function behavior
3. **Type check callbacks**: Dùng `void` cho callback functions
4. **Avoid returning values**: Không return values từ void functions
5. **Understand void vs never**: Hiểu difference giữa `void` và `never`

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Return value từ void function
function process(): void {
  return 123; // ❌ Error: Type 'number' is not assignable to type 'void'
}

// ✅ Nên: Không return hoặc return undefined
function process(): void {
  // hoặc
  return undefined;
}

// ❌ Không nên: Dùng void khi function luôn throw
function throwError(message: string): void {
  throw new Error(message);
}

// ✅ Nên: Dùng never
function throwError(message: string): never {
  throw new Error(message);
}

// ❌ Không nên: Return value được dùng từ void function
function logAndReturn(message: string): void {
  console.log(message);
}

const result = logAndReturn("hello"); // result: void (không thể dùng)
// console.log(result.toUpperCase()); // ❌ Error
```

---

## `null` và `undefined` trong TypeScript?

**null và undefined** - Hai types đại diện cho absence of value.

### Mục đích / Purpose

- **`null`**: Intentional absence of any object value
- **`undefined`**: Variable đã được declared nhưng chưa được assigned

### Khi nào dùng / When to Use

| Type                 | Khi nào dùng                                                |
| -------------------- | ----------------------------------------------------------- |
| `null`               | Khi muốn explicitly indicate no value                       |
| `undefined`          | Khi variable chưa được assigned hoặc property không tồn tại |
| `null` / `undefined` | Khi dùng strict null checks                                 |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Explicit nullability**: Rõ ràng về nullability
- **Type safety**: Catch null/undefined errors tại compile time
- **Better DX**: IntelliSense và autocomplete tốt hơn
- **Documentation**: Rõ ràng về behavior

### Ưu nhược điểm / Pros & Cons

| Ưu điểm              | Nhược điểm      |
| -------------------- | --------------- |
| Explicit nullability | Verbose hơn     |
| Type safety          | Cần null checks |
| Better DX            | Learning curve  |
| Documentation        | Có thể overkill |

### Ví dụ:

```typescript
// 1. null và undefined types
let nullValue: null = null;
let undefinedValue: undefined = undefined;

// 2. Default values
let name: string | null = null; // Có thể là null
let age: number | undefined = undefined; // Có thể là undefined

// 3. Optional parameters
function greet(name: string, greeting?: string) {
  // greeting có thể là undefined
  const message = greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
  console.log(message);
}

greet("John"); // greeting: undefined
greet("John", "Hi"); // greeting: 'Hi'

// 4. Optional properties
interface User {
  id: number;
  name: string;
  email?: string; // Có thể là undefined
}

const user1: User = { id: 1, name: "John" };
const user2: User = { id: 2, name: "Jane", email: "jane@example.com" };

// 5. Null checks với strict null checks
function getLength(str: string | null): number {
  // Cần null check trước khi dùng
  if (str === null) {
    return 0;
  }
  return str.length;
}

// 6. Nullish coalescing operator (??)
const value = null ?? "default"; // 'default'
const value2 = undefined ?? "default"; // 'default'
const value3 = "" ?? "default"; // '' (không phải null/undefined)
const value4 = 0 ?? "default"; // 0 (không phải null/undefined)

// 7. Optional chaining (?.)
interface User {
  id: number;
  name: string;
  address?: {
    street?: string;
    city?: string;
  };
}

const user: User = { id: 1, name: "John" };
const city = user.address?.city; // undefined (không throw error)

// 8. Non-null assertion operator (!)
function getElement(id: string): HTMLElement | null {
  return document.getElementById(id);
}

const element = getElement("app")!; // Assert rằng element không null

// 9. Type narrowing với null/undefined
function processValue(value: string | null | undefined) {
  if (value === null) {
    console.log("Value is null");
  } else if (value === undefined) {
    console.log("Value is undefined");
  } else {
    console.log(value.toUpperCase()); // value: string
  }
}

// 10. Default parameter values
function greet2(name: string, greeting: string = "Hello") {
  console.log(`${greeting}, ${name}!`);
}

greet2("John"); // 'Hello, John!'
greet2("John", "Hi"); // 'Hi, John!'

// 11. Nullish assignment (??=)
let value: string | null = null;
value ??= "default"; // value: 'default'

value = "hello";
value ??= "default"; // value: 'hello' (không thay đổi)

// 12. NonNullable utility type
type NonNullableString = NonNullable<string | null | undefined>; // string

// 13. Strict null checks trong tsconfig
// "strictNullChecks": true
let nullable: string | null = null;
// nullable.toUpperCase(); // ❌ Error: Object is possibly 'null'
```

### Null vs Undefined:

```typescript
// null - Intentional absence
let value1: string | null = null;
value1 = "hello"; // ✅ OK

// undefined - Variable chưa được assigned
let value2: string | undefined;
console.log(value2); // undefined

// Difference trong object
interface User {
  id: number;
  name: string;
  email: string | null; // Explicitly có thể null
  phone?: string; // Có thể undefined
}

const user: User = {
  id: 1,
  name: "John",
  email: null, // Explicitly null
  // phone không được defined (undefined)
};
```

### Best Practices:

1. **Enable strict null checks**: Luôn bật `strictNullChecks: true`
2. **Use optional chaining**: Dùng `?.` để safely access nested properties
3. **Use nullish coalescing**: Dùng `??` cho default values
4. **Explicit nullability**: Rõ ràng về nullability trong types
5. **Avoid non-null assertion**: Hạn chế dùng `!`, dùng type guards thay thế

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng non-null assertion quá nhiều
const element = document.getElementById("app")!;
element.innerHTML = "Hello"; // Có thể crash nếu element là null

// ✅ Nên: Dùng null check
const element = document.getElementById("app");
if (element) {
  element.innerHTML = "Hello";
}

// ❌ Không nên: Không handle null/undefined
function getLength(str: string | null) {
  return str.length; // ❌ Error: Object is possibly 'null'
}

// ✅ Nên: Handle null/undefined
function getLength(str: string | null) {
  return str ? str.length : 0;
}

// ❌ Không nên: Dùng || cho default values với falsy values
const count = 0;
const display = count || "N/A"; // 'N/A' (không phải ý định)

// ✅ Nên: Dùng ?? cho null/undefined
const count = 0;
const display = count ?? "N/A"; // 0
```

---

## Best Practices cho Basic Types

### 1. Use Type Inference

Để TypeScript tự推断 types khi có thể:

```typescript
// ✅ Nên
const name = "John";
const age = 30;

// ❌ Không nên
const name: string = "John";
const age: number = 30;
```

### 2. Avoid `any`

Hạn chế dùng `any`, dùng `unknown` thay thế:

```typescript
// ✅ Nên
let value: unknown = getValue();

// ❌ Không nên
let value: any = getValue();
```

### 3. Enable Strict Null Checks

Luôn bật `strictNullChecks: true`:

```json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

### 4. Use `never` for Exhaustive Checks

Dùng `never` cho exhaustive checking:

```typescript
function getStatusColor(status: Status): string {
  switch (status) {
    case "pending":
      return "yellow";
    case "approved":
      return "green";
    case "rejected":
      return "red";
    default:
      const _exhaustiveCheck: never = status;
      return _exhaustiveCheck;
  }
}
```

### 5. Use Optional Chaining và Nullish Coalescing

Dùng `?.` và `??` để safely handle null/undefined:

```typescript
const city = user.address?.city ?? "Unknown";
```

---

## Anti-patterns cần tránh

### 1. Over-using `any`

```typescript
// ❌ Không nên
let value: any = getValue();

// ✅ Nên
let value: unknown = getValue();
```

### 2. Not Handling Null/Undefined

```typescript
// ❌ Không nên
function getLength(str: string | null) {
  return str.length;
}

// ✅ Nên
function getLength(str: string | null) {
  return str ? str.length : 0;
}
```

### 3. Using `||` Instead of `??`

```typescript
// ❌ Không nên
const display = count || "N/A";

// ✅ Nên
const display = count ?? "N/A";
```

---

_References:_

- [TypeScript Basic Types](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [TypeScript Handbook - Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
