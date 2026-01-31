# 14. Type Guards

## Tổng quan về Type Guards

### Mục đích của Type Guards / Purpose

**Type Guards** là các biểu thức hoặc hàm trong TypeScript giúp xác định và thu hẹp (narrow) kiểu dữ liệu của một biến tại runtime, cho phép TypeScript hiểu rõ hơn về kiểu dữ liệu trong các nhánh điều kiện.

**Mục đích chính:**

- Thu hẹp kiểu dữ liệu (type narrowing) trong các nhánh điều kiện
- Xử lý union types một cách an toàn
- Tránh type errors khi truy cập properties của các kiểu khác nhau
- Cải thiện type safety và IntelliSense trong code

### Khi nào cần hiểu về Type Guards / When to Use

Hiểu về Type Guards là cần thiết khi:

- Làm việc với union types
- Xử lý dữ liệu từ API có thể có nhiều dạng khác nhau
- Viết code cần kiểm tra kiểu tại runtime
- Xây dựng libraries hoặc utilities cần type safety cao
- Làm việc với polymorphic objects

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Tránh runtime errors do type mismatch
- **Better IntelliSense**: IDE có thể gợi ý đúng properties/methods sau khi type guard
- **Cleaner Code**: Không cần type assertions trong nhiều trường hợp
- **Runtime Validation**: Kết hợp validation runtime với compile-time type checking
- **Self-documenting**: Code rõ ràng về các trường hợp được xử lý

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm                     |
| --------------------- | ------------------------------ |
| Type safety cao       | Có thể thêm overhead runtime   |
| IntelliSense tốt hơn  | Code có thể dài hơn            |
| Tránh type assertions | Cần hiểu rõ về type system     |
| Hỗ trợ nhiều pattern  | Một số type guards có giới hạn |

---

## Type Guards là gì?

**Type Guards** là các biểu thức thực hiện runtime check giúp TypeScript thu hẹp kiểu dữ liệu của một biến trong một scope cụ thể.

### Mục đích / Purpose

Xác định kiểu dữ liệu thực tế của một biến tại runtime và thông báo cho TypeScript để có type inference chính xác hơn.

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng                                                   |
| ------------------- | -------------------------------------------------------------- |
| Union types         | Khi biến có thể là nhiều kiểu khác nhau                        |
| API responses       | Khi data có thể có nhiều dạng                                  |
| Polymorphic objects | Khi xử lý objects có chung interface nhưng khác implementation |
| Conditional logic   | Khi cần xử lý khác nhau tùy theo kiểu                          |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Narrowing**: TypeScript hiểu kiểu cụ thể sau khi check
- **No Type Assertions**: Không cần dùng `as` hoặc `<>`
- **Compile-time Safety**: Catch errors trước runtime
- **Better DX**: IntelliSense hoạt động chính xác

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                    | Nhược điểm                 |
| -------------------------- | -------------------------- |
| - Tự động type narrowing   | Runtime overhead           |
| - Không cần manual casting | Một số patterns phức tạp   |
| - TypeScript hỗ trợ tốt    | Cần hiểu rõ về type guards |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Type narrowing với type guard
function printLength(value: string | number) {
  if (typeof value === "string") {
    // TypeScript biết value là string ở đây
    console.log(value.length); // ✅ OK
    console.log(value.toUpperCase()); // ✅ OK
  } else {
    // TypeScript biết value là number ở đây
    console.log(value.toFixed(2)); // ✅ OK
  }
}

// Ví dụ thực tế: API response
type ApiResponse =
  | { success: true; data: { id: number; name: string } }
  | { success: false; error: { message: string; code: number } };

function handleResponse(response: ApiResponse) {
  if (response.success) {
    // TypeScript biết response có data
    console.log(`User: ${response.data.name}`); // ✅ OK
  } else {
    // TypeScript biết response có error
    console.log(`Error: ${response.error.message}`); // ✅ OK
  }
}

// Ví dụ với object properties
interface Circle {
  kind: "circle";
  radius: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Circle | Rectangle;

function getArea(shape: Shape): number {
  if (shape.kind === "circle") {
    // TypeScript biết shape là Circle
    return Math.PI * shape.radius * shape.radius; // ✅ OK
  } else {
    // TypeScript biết shape là Rectangle
    return shape.width * shape.height; // ✅ OK
  }
}
```

### Best Practices:

```typescript
// ✅ Dùng type guards với union types
function processValue(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}

// ✅ Dùng discriminated unions
type Result<T, E> =
  | { status: "success"; data: T }
  | { status: "error"; error: E };

function handleResult<T, E>(result: Result<T, E>) {
  if (result.status === "success") {
    return result.data;
  }
  throw new Error(String(result.error));
}

// ❌ Không nên dùng type assertions khi type guards có thể dùng
function badExample(value: string | number) {
  const str = value as string; // ❌ Không an toàn
  return str.toUpperCase();
}

// ✅ Nên dùng type guards
function goodExample(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // ✅ An toàn
  }
  return String(value);
}
```

---

## `typeof` type guard?

**`typeof` type guard** - Sử dụng toán tử `typeof` của JavaScript để kiểm tra kiểu nguyên thủy (primitive types).

### Mục đích / Purpose

Kiểm tra kiểu của các giá trị nguyên thủy như `string`, `number`, `boolean`, `symbol`, `undefined`, `function`, `object`.

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng                               |
| ------------------- | ------------------------------------------ |
| Primitive types     | Khi kiểm tra string, number, boolean, etc. |
| Union of primitives | Khi biến có thể là nhiều primitive types   |
| Function checks     | Khi cần phân biệt function và object       |
| Undefined checks    | Khi kiểm tra optional values               |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Runtime Check**: Hoạt động tại runtime như JavaScript
- **Zero Overhead**: Không có runtime cost ngoài check thông thường
- **Simple Syntax**: Cú pháp đơn giản, dễ hiểu
- **Built-in Support**: TypeScript hỗ trợ sẵn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm                                   |
| --------------------- | -------------------------------------------- |
| Đơn giản, dễ dùng     | Chỉ hoạt động với primitive types            |
| Không có overhead     | Không phân biệt được class types             |
| TypeScript hỗ trợ tốt | `typeof null` là "object" (JavaScript quirk) |

### Ví dụ:

```typescript
// Ví dụ cơ bản: typeof với primitive types
function processValue(value: string | number | boolean) {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else {
    return value ? "true" : "false";
  }
}

// Ví dụ: Kiểm tra function
function executeCallback(callback: (() => void) | undefined) {
  if (typeof callback === "function") {
    callback(); // ✅ TypeScript biết callback là function
  } else {
    console.log("No callback provided");
  }
}

// Ví dụ: Kiểm tra undefined
function greet(name?: string) {
  if (typeof name === "undefined") {
    return "Hello, stranger!";
  }
  return `Hello, ${name}!`;
}

// Ví dụ thực tế: Parse API response
type ApiValue = string | number | boolean | null;

function parseApiValue(value: ApiValue): string {
  if (value === null) {
    return "null";
  }
  if (typeof value === "string") {
    return `"${value}"`;
  }
  if (typeof value === "number") {
    return value.toString();
  }
  return value ? "true" : "false";
}

// Ví dụ với function overloading
function logMessage(message: string | (() => string)): void {
  if (typeof message === "function") {
    console.log(message()); // ✅ message là function
  } else {
    console.log(message); // ✅ message là string
  }
}
```

### Best Practices:

```typescript
// ✅ Dùng typeof cho primitive types
function isString(value: unknown): value is string {
  return typeof value === "string";
}

// ✅ Dùng typeof trong switch statement
function getType(value: string | number | boolean): string {
  switch (typeof value) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    default:
      return "unknown";
  }
}

// ✅ Kết hợp typeof với null check
function safeToString(value: string | number | null): string {
  if (value === null) {
    return "null";
  }
  if (typeof value === "string") {
    return value;
  }
  return value.toString();
}

// ❌ Không nên dùng typeof cho class types
class Dog {
  bark() {}
}

class Cat {
  meow() {}
}

function makeSound(animal: Dog | Cat) {
  // ❌ typeof luôn trả về "object" cho class instances
  if (typeof animal === "object") {
    // Không thể phân biệt Dog và Cat
  }
}

// ✅ Nên dùng instanceof cho class types
function makeSoundCorrect(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // ✅ OK
  } else {
    animal.meow(); // ✅ OK
  }
}

// ⚠️ Cẩn thận với typeof null
function checkNull(value: string | null) {
  if (typeof value === "object") {
    // ❌ value có thể là null!
    // typeof null === "object" trong JavaScript
  }
}

// ✅ Nên check null trực tiếp
function checkNullCorrect(value: string | null) {
  if (value === null) {
    return "null";
  }
  return value;
}
```

---

## `instanceof` type guard?

**`instanceof` type guard** - Sử dụng toán tử `instanceof` của JavaScript để kiểm tra xem một object có phải là instance của một class hoặc constructor function.

### Mục đích / Purpose

Kiểm tra xem một object có phải là instance của một class cụ thể hoặc có trong prototype chain của class đó.

### Khi nào dùng / When to Use

| Tình huống      | Khi nào dùng                              |
| --------------- | ----------------------------------------- |
| Class instances | Khi kiểm tra object là instance của class |
| Built-in types  | Khi kiểm tra Array, Date, RegExp, etc.    |
| Prototype chain | Khi cần check inheritance                 |
| Custom classes  | Khi làm việc với OOP patterns             |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Works with Classes**: Hỗ trợ đầy đủ class-based OOP
- **Prototype Chain**: Check cả inheritance hierarchy
- **Built-in Types**: Hỗ trợ Array, Date, RegExp, etc.
- **Runtime Safe**: Hoạt động đúng tại runtime

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm                                      |
| --------------------- | ----------------------------------------------- |
| Hoạt động với classes | Không hoạt động với interfaces                  |
| Hỗ trợ inheritance    | Không hoạt động với type aliases                |
| Runtime safe          | Chỉ hoạt động với class constructors            |
| Built-in support      | Không phân biệt được structurally typed objects |

### Ví dụ:

```typescript
// Ví dụ cơ bản: instanceof với classes
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // ✅ TypeScript biết animal là Dog
  } else {
    animal.meow(); // ✅ TypeScript biết animal là Cat
  }
}

// Ví dụ với built-in types
function processValue(value: Date | string | RegExp) {
  if (value instanceof Date) {
    return value.toISOString(); // ✅ value là Date
  } else if (value instanceof RegExp) {
    return value.source; // ✅ value là RegExp
  }
  return value.toUpperCase(); // ✅ value là string
}

// Ví dụ với inheritance
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Dog extends Animal {
  bark() {
    console.log(`${this.name} says Woof!`);
  }
}

class Cat extends Animal {
  meow() {
    console.log(`${this.name} says Meow!`);
  }
}

function interact(animal: Animal) {
  if (animal instanceof Dog) {
    animal.bark(); // ✅ TypeScript biết animal có method bark
  } else if (animal instanceof Cat) {
    animal.meow(); // ✅ TypeScript biết animal có method meow
  } else {
    console.log(`Hello, ${animal.name}`);
  }
}

// Ví dụ thực tế: Error handling
function handleError(error: Error | string | unknown) {
  if (error instanceof Error) {
    console.error(error.message); // ✅ error có property message
    console.error(error.stack); // ✅ error có property stack
  } else if (typeof error === "string") {
    console.error(error);
  } else {
    console.error("Unknown error:", error);
  }
}

// Ví dụ với Array
function processCollection(items: string[] | Set<string>) {
  if (items instanceof Array) {
    return items.join(", "); // ✅ items là Array
  } else {
    return Array.from(items).join(", "); // ✅ items là Set
  }
}
```

### Best Practices:

```typescript
// ✅ Dùng instanceof cho class types
class User {
  constructor(
    public id: number,
    public name: string,
  ) {}
}

class Admin extends User {
  permissions: string[] = [];
}

function getDisplayName(user: User | Admin): string {
  if (user instanceof Admin) {
    return `Admin: ${user.name}`; // ✅ OK
  }
  return `User: ${user.name}`;
}

// ✅ Dùng instanceof với built-in types
function formatDate(value: Date | string): string {
  if (value instanceof Date) {
    return value.toLocaleDateString(); // ✅ OK
  }
  return value;
}

// ✅ Kết hợp instanceof với type guards
function processInput(input: string | number | Date): string {
  if (typeof input === "string") {
    return input;
  }
  if (typeof input === "number") {
    return input.toString();
  }
  if (input instanceof Date) {
    return input.toISOString();
  }
  return String(input);
}

// ❌ Không nên dùng instanceof với interfaces
interface User {
  name: string;
}

class Customer implements User {
  constructor(public name: string) {}
}

function checkUser(obj: User) {
  // ❌ Interface không tồn tại tại runtime
  if (obj instanceof User) {
    // Error: 'User' only refers to a type, but is being used as a value
  }
}

// ✅ Nên dùng discriminated unions hoặc custom type guards
interface User {
  type: "user";
  name: string;
}

interface Admin {
  type: "admin";
  name: string;
  permissions: string[];
}

function checkUserType(user: User | Admin) {
  if (user.type === "admin") {
    console.log(user.permissions); // ✅ OK
  } else {
    console.log(user.name);
  }
}

// ⚠️ Cẩn thận với cross-frame issues
// instanceof có thể không hoạt động đúng khi object từ different frames/windows
function safeInstanceOf(
  obj: unknown,
  ctor: new (...args: any[]) => any,
): boolean {
  try {
    return obj instanceof ctor;
  } catch {
    return false;
  }
}
```

---

## Custom type guards (`is` keyword)?

**Custom type guards** - Các hàm do người dùng định nghĩa sử dụng `is` keyword để báo cho TypeScript biết kiểu dữ liệu của một biến sau khi check.

### Mục đích / Purpose

Tạo ra các type guards tùy chỉnh cho các trường hợp phức tạp mà `typeof` và `instanceof` không xử lý được.

### Khi nào dùng / When to Use

| Tình huống       | Khi nào dùng                      |
| ---------------- | --------------------------------- |
| Complex checks   | Khi logic check phức tạp          |
| Interface checks | Khi cần kiểm tra interface        |
| Shape validation | Khi validate object structure     |
| Reusable guards  | Khi cần dùng type guard nhiều lần |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Flexible**: Có thể implement bất kỳ logic nào
- **Reusable**: Dùng lại ở nhiều nơi
- **Type-safe**: TypeScript hiểu kết quả của guard
- **Composable**: Có thể kết hợp nhiều guards

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm                      |
| --------------------- | ------------------------------- |
| Flexible, powerful    | Runtime overhead                |
| Reusable              | Cần implement logic             |
| Type-safe             | Có thể bị sai nếu implement sai |
| Works with interfaces | Không tự động infer             |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Custom type guard với is
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

function processValue(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // ✅ TypeScript biết value là string
  } else if (isNumber(value)) {
    console.log(value.toFixed(2)); // ✅ TypeScript biết value là number
  }
}

// Ví dụ: Kiểm tra interface
interface User {
  id: number;
  name: string;
  email: string;
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    typeof obj.id === "number" &&
    "name" in obj &&
    typeof obj.name === "string" &&
    "email" in obj &&
    typeof obj.email === "string"
  );
}

function processUser(data: unknown) {
  if (isUser(data)) {
    console.log(`User: ${data.name}`); // ✅ TypeScript biết data là User
    console.log(`Email: ${data.email}`); // ✅ OK
  }
}

// Ví dụ: Kiểm tra union types
type ApiResponse =
  | { status: "success"; data: unknown }
  | { status: "error"; error: string };

function isSuccess(
  response: ApiResponse,
): response is { status: "success"; data: unknown } {
  return response.status === "success";
}

function handleResponse(response: ApiResponse) {
  if (isSuccess(response)) {
    console.log("Success:", response.data); // ✅ TypeScript biết có data
  } else {
    console.log("Error:", response.error); // ✅ TypeScript biết có error
  }
}

// Ví dụ: Kiểm tra array type
function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function processStrings(value: unknown) {
  if (isStringArray(value)) {
    console.log(value.join(", ")); // ✅ TypeScript biết là string[]
    console.log(value[0].toUpperCase()); // ✅ OK
  }
}

// Ví dụ thực tế: Shape validation
interface Circle {
  type: "circle";
  radius: number;
}

interface Rectangle {
  type: "rectangle";
  width: number;
  height: number;
}

interface Triangle {
  type: "triangle";
  base: number;
  height: number;
}

type Shape = Circle | Rectangle | Triangle;

function isCircle(shape: Shape): shape is Circle {
  return shape.type === "circle";
}

function isRectangle(shape: Shape): shape is Rectangle {
  return shape.type === "rectangle";
}

function getArea(shape: Shape): number {
  if (isCircle(shape)) {
    return Math.PI * shape.radius * shape.radius;
  }
  if (isRectangle(shape)) {
    return shape.width * shape.height;
  }
  return (shape.base * shape.height) / 2;
}

// Ví dụ: Composable type guards
function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

function isNotNullOrDefined<T>(value: T | null | undefined): value is T {
  return isNotNull(value) && isDefined(value);
}

function processOptional(value: string | null | undefined) {
  if (isNotNullOrDefined(value)) {
    console.log(value.toUpperCase()); // ✅ TypeScript biết value là string
  }
}
```

### Best Practices:

```typescript
// ✅ Đặt tên type guard theo pattern isTypeName
function isUser(obj: unknown): obj is User {
  // ...
}

function isAdmin(obj: unknown): obj is Admin {
  // ...
}

// ✅ Validate đầy đủ properties
function isProduct(obj: unknown): obj is Product {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    typeof obj.id === "string" &&
    "name" in obj &&
    typeof obj.name === "string" &&
    "price" in obj &&
    typeof obj.price === "number" &&
    obj.price >= 0
  );
}

// ✅ Dùng type guards với array methods
const items: unknown[] = [1, "hello", true, { name: "test" }];

const strings = items.filter(isString); // ✅ Result là string[]

// ✅ Dùng type guards với find
const users: unknown[] = [
  { id: 1, name: "Alice", type: "user" },
  { id: 2, name: "Bob", type: "admin" },
];

const admin = users.find(isAdmin); // ✅ admin có thể là Admin | undefined

// ✅ Tạo type guard factory
function createPropertyGuard<T extends object, K extends keyof T>(
  key: K,
  typeGuard: (value: unknown) => value is T[K],
): (obj: unknown) => obj is T & Record<K, T[K]> {
  return (obj: unknown): obj is T & Record<K, T[K]> => {
    return (
      typeof obj === "object" &&
      obj !== null &&
      key in obj &&
      typeGuard((obj as any)[key])
    );
  };
}

// ❌ Không nên dùng type guard cho simple checks
function isSimpleString(value: unknown): value is string {
  return typeof value === "string"; // ❌ Dùng typeof trực tiếp
}

// ✅ Nên dùng typeof trực tiếp cho simple cases
if (typeof value === "string") {
  // ...
}

// ❌ Không nên quên kiểm tra null/undefined
function badIsObject(obj: unknown): obj is object {
  return typeof obj === "object"; // ❌ null cũng là "object"
}

// ✅ Nên kiểm tra null
function goodIsObject(obj: unknown): obj is object {
  return typeof obj === "object" && obj !== null;
}

// ⚠️ Cẩn thận với side effects trong type guard
function isUserWithSideEffect(obj: unknown): obj is User {
  console.log("Checking user..."); // ❌ Side effect mỗi khi gọi
  return /* ... */;
}

// ✅ Type guard nên là pure functions
function isUserPure(obj: unknown): obj is User {
  return; /* ... */ // ✅ Pure function
}
```

---

## Discriminated unions type guards?

**Discriminated unions type guards** - Sử dụng một property chung (discriminator) để phân biệt các types trong union, thường kết hợp với `switch` hoặc `if` statements.

### Mục đích / Purpose

Tạo union types có thể dễ dàng phân biệt bằng một property chung, giúp type narrowing đơn giản và an toàn.

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng                         |
| ------------------- | ------------------------------------ |
| API responses       | Khi response có nhiều dạng khác nhau |
| State management    | Khi state có nhiều variants          |
| Event handling      | Khi events có nhiều types            |
| Polymorphic objects | Khi objects có shared interface      |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Exhaustive Checks**: TypeScript có thể đảm bảo tất cả cases được xử lý
- **Type Safety**: Mỗi branch có type chính xác
- **Self-documenting**: Code rõ ràng về các variants
- **No Runtime Overhead**: Discriminator là property bình thường

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                  | Nhược điểm                       |
| ------------------------ | -------------------------------- |
| - Type narrowing tự động | Cần thêm discriminator property  |
| - Exhaustive checks      | Cần careful design               |
| - Self-documenting       | Có thể verbose                   |
| - No runtime overhead    | Không phù hợp cho mọi trường hợp |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Discriminated union
type SuccessResponse = {
  status: "success";
  data: { id: number; name: string };
};

type ErrorResponse = {
  status: "error";
  error: { message: string; code: number };
};

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse) {
  if (response.status === "success") {
    console.log(response.data.name); // ✅ TypeScript biết có data
  } else {
    console.log(response.error.message); // ✅ TypeScript biết có error
  }
}

// Ví dụ với switch statement
type Shape =
  | { type: "circle"; radius: number }
  | { type: "rectangle"; width: number; height: number }
  | { type: "triangle"; base: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.type) {
    case "circle":
      return Math.PI * shape.radius * shape.radius; // ✅ shape là Circle
    case "rectangle":
      return shape.width * shape.height; // ✅ shape là Rectangle
    case "triangle":
      return (shape.base * shape.height) / 2; // ✅ shape là Triangle
  }
}

// Ví dụ: Exhaustive checks với never
function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}

function getAreaExhaustive(shape: Shape): number {
  switch (shape.type) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
    default:
      return assertNever(shape); // ✅ Lỗi compile nếu thêm type mới
  }
}

// Ví dụ thực tế: Loading states
type LoadingState = {
  status: "loading";
};

type SuccessState<T> = {
  status: "success";
  data: T;
};

type ErrorState = {
  status: "error";
  error: string;
};

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

function renderState<T>(state: AsyncState<T>): string {
  switch (state.status) {
    case "loading":
      return "Loading...";
    case "success":
      return JSON.stringify(state.data);
    case "error":
      return `Error: ${state.error}`;
  }
}

// Ví dụ: Event handling
type ClickEvent = {
  type: "click";
  x: number;
  y: number;
};

type KeyEvent = {
  type: "keydown" | "keyup";
  key: string;
  code: string;
};

type UIEvent = ClickEvent | KeyEvent;

function handleEvent(event: UIEvent) {
  switch (event.type) {
    case "click":
      console.log(`Clicked at (${event.x}, ${event.y})`);
      break;
    case "keydown":
    case "keyup":
      console.log(`Key ${event.key} (${event.code})`);
      break;
  }
}

// Ví dụ: API response với nhiều variants
type UserResponse = {
  kind: "user";
  user: { id: number; name: string; email: string };
};

type PostResponse = {
  kind: "post";
  post: { id: number; title: string; content: string };
};

type CommentResponse = {
  kind: "comment";
  comment: { id: number; text: string; authorId: number };
};

type ApiResponse = UserResponse | PostResponse | CommentResponse;

function getResponseTitle(response: ApiResponse): string {
  switch (response.kind) {
    case "user":
      return response.user.name;
    case "post":
      return response.post.title;
    case "comment":
      return response.comment.text;
  }
}
```

### Best Practices:

```typescript
// ✅ Dùng tên discriminator rõ ràng (type, kind, status, etc.)
type Result<T, E> = { status: "ok"; value: T } | { status: "error"; error: E };

// ✅ Dùng discriminated unions cho API responses
type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: { message: string; code: number } };

async function fetchData(): Promise<ApiResult<User>> {
  try {
    const response = await fetch("/api/user");
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: { message: "Failed to fetch", code: 500 },
    };
  }
}

// ✅ Dùng exhaustive checks để đảm bảo tất cả cases được xử lý
function handleResult<T>(result: ApiResult<T>): T {
  if (result.success) {
    return result.data;
  }
  throw new Error(result.error.message);
}

// ✅ Tạo helper function cho exhaustive checks
function exhaustiveCheck(value: never, message: string): never {
  throw new Error(`Unexpected value: ${value}. ${message}`);
}

function processEvent(event: Event): string {
  switch (event.type) {
    case "click":
      return `Click at ${event.x},${event.y}`;
    case "keydown":
      return `Key: ${event.key}`;
    case "keyup":
      return `Key up: ${event.key}`;
    default:
      return exhaustiveCheck(event, "Unhandled event type");
  }
}

// ✅ Dùng discriminated unions cho state management
type IdleState = { type: "idle" };
type LoadingState = { type: "loading" };
type SuccessState<T> = { type: "success"; data: T };
type ErrorState = { type: "error"; error: Error };

type State<T> = IdleState | LoadingState | SuccessState<T> | ErrorState;

function renderState<T>(state: State<T>): string {
  switch (state.type) {
    case "idle":
      return "Ready";
    case "loading":
      return "Loading...";
    case "success":
      return JSON.stringify(state.data);
    case "error":
      return `Error: ${state.error.message}`;
  }
}

// ❌ Không nên dùng discriminator không rõ ràng
type BadResponse = {
  t: "s" | "e"; // ❌ t không rõ nghĩa
  d?: unknown;
  e?: string;
};

// ✅ Nên dùng tên rõ ràng
type GoodResponse =
  | { type: "success"; data: unknown }
  | { type: "error"; error: string };

// ❌ Không nên để discriminator optional
type BadUnion =
  | { type?: "success"; data: string }
  | { type?: "error"; error: string };

// ✅ Nên để discriminator required
type GoodUnion =
  | { type: "success"; data: string }
  | { type: "error"; error: string };

// ⚠️ Cẩn thận khi thêm types mới
// Khi thêm type mới vào union, cần cập nhật tất cả switch statements
type NewEvent = ClickEvent | KeyEvent | ScrollEvent; // Thêm ScrollEvent

// Cần cập nhật hàm handleEvent để xử lý ScrollEvent
function handleAllEvents(event: NewEvent) {
  switch (event.type) {
    case "click":
    // ...
    case "keydown":
    case "keyup":
    // ...
    case "scroll":
      // ✅ Thêm case mới
      console.log(`Scrolled to ${event.scrollY}`);
  }
}
```

---

## Tổng kết

### Best Practices chung cho Type Guards

1. **Ưu tiên type guards over type assertions**: Type guards an toàn hơn vì có runtime check
2. **Dùng discriminated unions khi có thể**: Rõ ràng và dễ maintain
3. **Tạo reusable type guards**: Khi logic check phức tạp, tạo function để dùng lại
4. **Exhaustive checks**: Dùng `never` để đảm bảo tất cả cases được xử lý
5. **Kết hợp các type guards**: Có thể dùng nhiều type guards cùng nhau

### Anti-patterns cần tránh

```typescript
// ❌ Dùng type assertions thay vì type guards
function badExample(value: string | number) {
  const str = value as string; // ❌ Không an toàn
  return str.toUpperCase();
}

// ✅ Nên dùng type guards
function goodExample(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // ✅ An toàn
  }
  return String(value);
}

// ❌ Không check đầy đủ trong custom type guard
function badIsUser(obj: unknown): obj is User {
  return typeof obj === "object" && obj !== null; // ❌ Không check properties
}

// ✅ Nên validate đầy đủ
function goodIsUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "name" in obj &&
    "email" in obj
  );
}

// ❌ Quên xử lý tất cả cases trong discriminated union
function badHandleResponse(response: ApiResponse) {
  if (response.status === "success") {
    console.log(response.data);
  }
  // ❌ Quên xử lý error case
}

// ✅ Nên xử lý tất cả cases
function goodHandleResponse(response: ApiResponse) {
  if (response.status === "success") {
    console.log(response.data);
  } else {
    console.log(response.error); // ✅ Xử lý error
  }
}
```

---

## Tài liệu tham khảo / References

- [TypeScript Handbook - Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
- [TypeScript Handbook - Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
- [TypeScript Deep Dive - Type Guards](https://basarat.gitbook.io/typescript/type-system/typeguard)
- [TypeScript - Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

---

_Last updated: 2026-01-30_
