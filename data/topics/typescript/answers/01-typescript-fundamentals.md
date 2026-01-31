# 1. TypeScript Fundamentals

## Tổng quan về TypeScript Fundamentals

### Mục đích của TypeScript Fundamentals / Purpose

**TypeScript Fundamentals** là các khái niệm cơ bản về TypeScript - một superset của JavaScript với static typing được thêm vào.

**Mục đích chính:**

- Hiểu TypeScript là gì và tại sao nó được tạo ra
- Biết sự khác biệt giữa TypeScript và JavaScript
- Hiểu cách TypeScript được compile thành JavaScript
- Nắm vững static typing và type inference
- Có nền tảng để học các khái niệm nâng cao hơn

### Khi nào cần hiểu về TypeScript Fundamentals / When to Use

Hiểu về TypeScript Fundamentals là cần thiết khi:

- Bắt đầu học TypeScript từ đầu
- Chuẩn bị cho buổi phỏng vấn TypeScript
- Muốn chuyển từ JavaScript sang TypeScript
- Cần giải thích cho team về lợi ích của TypeScript
- Đưa ra quyết định về việc có nên dùng TypeScript trong dự án

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile-time thay vì runtime
- **Better IDE Support**: Autocomplete, IntelliSense, refactoring
- **Self-documenting**: Code rõ ràng hơn nhờ type annotations
- **Easier Refactoring**: Type system giúp refactor an toàn hơn
- **Better Collaboration**: Types giúp team hiểu code dễ hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                     | Nhược điểm                                              |
| --------------------------- | ------------------------------------------------------- |
| Catch errors early          | Learning curve cao hơn JavaScript                       |
| Better developer experience | Cần compile step                                        |
| Self-documenting code       | File size lớn hơn (nhưng có thể giảm bằng tree-shaking) |
| Safer refactoring           | Setup ban đầu phức tạp hơn                              |
| Better tooling              | Có thể over-engineering cho small projects              |

---

## TypeScript là gì? Tại sao nên dùng TypeScript?

**TypeScript** là một strongly typed programming language được xây dựng trên JavaScript, được phát triển bởi Microsoft. Nó thêm static typing và các tính năng khác lên JavaScript.

### Mục đích / Purpose

TypeScript được tạo ra để giải quyết các vấn đề của JavaScript về:

- Type safety
- Scalability
- Maintainability
- Developer experience

### Khi nào dùng / When to Use

| Tình huống               | Khi nào dùng                                     |
| ------------------------ | ------------------------------------------------ |
| Large scale applications | Khi dự án lớn và phức tạp, nhiều developer       |
| Team collaboration       | Khi nhiều người làm việc cùng nhau trên codebase |
| Long-term maintenance    | Khi dự án cần được maintain lâu dài              |
| Enterprise applications  | Khi xây dựng enterprise apps cần reliability cao |
| Full-stack development   | Khi dùng cùng language cho frontend và backend   |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Catch errors at compile time**: Tìm lỗi trước khi chạy code
- **Better IntelliSense**: IDE có thể gợi ý chính xác hơn
- **Refactoring confidence**: Refactor an toàn hơn nhờ type checking
- **Self-documenting**: Types đóng vai trò như documentation
- **Better code quality**: Force developer viết code tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                   | Nhược điểm                         |
| ------------------------- | ---------------------------------- |
| Type safety               | Learning curve                     |
| Better tooling            | Build step cần thiết               |
| Catch bugs early          | Có thể overkill cho small projects |
| Better team collaboration | Cần hiểu về types                  |

### Ví dụ:

```typescript
// TypeScript với type annotations
function greet(name: string): string {
  return `Hello, ${name}!`;
}

const message = greet("World"); // ✅ OK
// const message = greet(123); // ❌ Error: Argument of type 'number' is not assignable to parameter of type 'string'

// TypeScript với interface
interface User {
  id: number;
  name: string;
  email: string;
}

function getUserInfo(user: User): string {
  return `${user.name} (${user.email})`;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
};

console.log(getUserInfo(user)); // ✅ OK
// console.log(getUserInfo({ id: 1, name: "John" })); // ❌ Error: Property 'email' is missing
```

### Best Practices:

1. **Enable strict mode**: Luôn bật `strict: true` trong `tsconfig.json`
2. **Avoid `any`**: Hạn chế dùng `any`, dùng `unknown` thay thế
3. **Use interfaces for object shapes**: Dùng interface để định nghĩa cấu trúc object
4. **Explicit return types**: Khai báo rõ ràng return type cho các function quan trọng
5. **Use type inference**: Để TypeScript tự推断 type khi có thể, không cần khai báo quá nhiều

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng any quá nhiều
function processData(data: any): any {
  return data.value;
}

// ✅ Nên: Dùng type cụ thể hoặc generic
function processData<T extends { value: unknown }>(data: T): T["value"] {
  return data.value;
}

// ❌ Không nên: Type assertion lạm dụng
const value = someValue as string;

// ✅ Nên: Dùng type guard
if (typeof someValue === "string") {
  const value = someValue; // TypeScript biết đây là string
}
```

---

## TypeScript và JavaScript khác nhau như thế nào?

**TypeScript vs JavaScript** - TypeScript là superset của JavaScript với static typing được thêm vào.

### Mục đích / Purpose

Hiểu sự khác biệt giữa TypeScript và JavaScript để:

- Chọn đúng công cụ cho dự án
- Biết khi nào nên dùng TypeScript
- Hiểu trade-offs giữa hai ngôn ngữ

### Khi nào dùng / When to Use

| Tình huống         | TypeScript      | JavaScript           |
| ------------------ | --------------- | -------------------- |
| Small scripts      | Không cần       | Nên dùng             |
| Large apps         | Nên dùng        | Có thể khó maintain  |
| Team collaboration | Nên dùng        | Có thể gây conflicts |
| Quick prototypes   | Có thể overkill | Nên dùng             |
| Long-term projects | Nên dùng        | Có thể rủi ro        |

### Giúp ích gì / Benefits

**Lợi ích của TypeScript so với JavaScript:**

- **Static typing**: Catch errors tại compile time
- **Better IDE support**: IntelliSense, autocomplete tốt hơn
- **Refactoring**: An toàn hơn nhờ type checking
- **Documentation**: Types đóng vai trò như documentation
- **Modern features**: TypeScript hỗ trợ ES6+ features ngay cả khi target cũ hơn

### Ưu nhược điểm / Pros & Cons

| TypeScript     | JavaScript          |
| -------------- | ------------------- |
| Type safety    | Dynamic flexibility |
| Better DX      | Simpler setup       |
| Compile step   | Run directly        |
| Learning curve | Easier to learn     |

### Ví dụ:

```typescript
// JavaScript - Dynamic typing
function add(a, b) {
  return a + b;
}

console.log(add(1, 2)); // 3
console.log(add("1", "2")); // "12" - có thể không phải ý định
console.log(add({}, [])); // "[object Object]" - unexpected result

// TypeScript - Static typing
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(1, 2)); // 3 ✅
// console.log(add("1", "2")); // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'

// TypeScript với Union types
function addOrConcat(a: number | string, b: number | string): number | string {
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
  return String(a) + String(b);
}

console.log(addOrConcat(1, 2)); // 3 ✅
console.log(addOrConcat("1", "2")); // "12" ✅
```

### Best Practices:

1. **Gradual adoption**: Có thể chuyển từ JS sang TS dần dần
2. **Use JSDoc cho JS**: Nếu chưa chuyển hết, dùng JSDoc để add types
3. **Strict mode**: Bắt đầu với `strict: true` để tận dụng đầy đủ TypeScript
4. **Type checking**: Luôn chạy `tsc --noEmit` để check types

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Viết TypeScript như JavaScript (không dùng types)
function processData(data) {
  return data.map((item) => item.value);
}

// ✅ Nên: Dùng types đầy đủ
interface DataItem {
  value: string;
}

function processData(data: DataItem[]): string[] {
  return data.map((item) => item.value);
}
```

---

## TypeScript được compile như thế nào?

**TypeScript Compilation** - TypeScript compiler (tsc) chuyển TypeScript code thành JavaScript code.

### Mục đích / Purpose

Hiểu quy trình compile để:

- Debug các lỗi compile
- Configure tsconfig.json đúng cách
- Optimize build process
- Hiểu source maps và debugging

### Khi nào dùng / When to Use

Cần hiểu về compilation khi:

- Setup TypeScript project mới
- Debug build errors
- Optimize build performance
- Configure target environments

### Giúp ích gì / Benefits

**Lợi ích:**

- **Multi-target**: Compile xuống các phiên bản JS khác nhau (ES3, ES5, ES6, etc.)
- **Source maps**: Debug TypeScript code dễ dàng
- **Incremental compilation**: Build nhanh hơn với caching
- **Type checking**: Catch errors trước khi runtime

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm                         |
| ------------------- | ---------------------------------- |
| Flexible targets    | Build time cần thiết               |
| Source maps support | Cần configuration                  |
| Incremental builds  | Cần understand compilation process |
| Type checking       | Có thể complex với large projects  |

### Ví dụ:

```typescript
// TypeScript source code (src/index.ts)
interface User {
  id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
};

function greet(user: User): string {
  return `Hello, ${user.name}!`;
}

console.log(greet(user));
```

```javascript
// Compiled JavaScript (ES5 target)
var user = {
  id: 1,
  name: "John Doe",
};
function greet(user) {
  return "Hello, " + user.name + "!";
}
console.log(greet(user));
```

```javascript
// Compiled JavaScript (ES6+ target)
const user = {
  id: 1,
  name: "John Doe",
};
function greet(user) {
  return `Hello, ${user.name}!`;
}
console.log(greet(user));
```

### tsconfig.json example:

```json
{
  "compilerOptions": {
    "target": "ES2020", // Target JavaScript version
    "module": "ESNext", // Module system
    "lib": ["ES2020", "DOM"], // Libraries to include
    "outDir": "./dist", // Output directory
    "rootDir": "./src", // Root directory
    "strict": true, // Enable strict mode
    "esModuleInterop": true, // ES module interoperability
    "skipLibCheck": true, // Skip type checking of declaration files
    "forceConsistentCasingInFileNames": true,
    "sourceMap": true, // Generate source maps
    "declaration": true, // Generate .d.ts files
    "declarationMap": true, // Generate .d.ts.map files
    "incremental": true, // Enable incremental compilation
    "tsBuildInfoFile": "./dist/.tsbuildinfo"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### Best Practices:

1. **Use source maps**: Bật source maps để debug dễ dàng hơn
2. **Incremental compilation**: Dùng `incremental: true` để build nhanh hơn
3. **Appropriate target**: Chọn target phù hợp với môi trường chạy
4. **Separate build and type-check**: Dùng `tsc --noEmit` để chỉ check types
5. **Watch mode**: Dùng `tsc --watch` trong development

### Anti-patterns cần tránh:

```json
// ❌ Không nên: Không có source maps
{
  "compilerOptions": {
    "sourceMap": false
  }
}

// ✅ Nên: Bật source maps cho debugging
{
  "compilerOptions": {
    "sourceMap": true
  }
}

// ❌ Không nên: Target quá cũ khi không cần thiết
{
  "compilerOptions": {
    "target": "ES3"
  }
}

// ✅ Nên: Target phù hợp với môi trường
{
  "compilerOptions": {
    "target": "ES2020"
  }
}
```

---

## Static typing là gì? Lợi ích của nó?

**Static typing** - Kiểu dữ liệu được xác định tại compile-time thay vì runtime.

### Mục đích / Purpose

Static typing giúp:

- Catch errors sớm hơn (compile-time thay vì runtime)
- Cải thiện developer experience
- Tăng confidence khi refactor
- Tự động documentation

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                           |
| --------------------- | -------------------------------------- |
| Large codebases       | Khi dự án lớn, nhiều files             |
| Team collaboration    | Khi nhiều developer làm việc cùng nhau |
| Long-term maintenance | Khi dự án cần maintain lâu dài         |
| Critical systems      | Khi errors gây hậu quả nghiêm trọng    |
| API contracts         | Khi cần enforce contracts              |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Early error detection**: Catch errors tại compile-time
- **Better IDE support**: IntelliSense, autocomplete, refactoring tools
- **Self-documenting**: Types đóng vai trò như documentation
- **Refactoring confidence**: Rename, extract, refactor an toàn hơn
- **Code navigation**: Dễ dàng navigate qua codebase

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm                         |
| ------------------ | ---------------------------------- |
| Catch errors early | Learning curve                     |
| Better DX          | Verbose hơn                        |
| Safer refactoring  | Setup time                         |
| Self-documenting   | Có thể overkill cho small projects |

### Ví dụ:

```typescript
// Static typing trong TypeScript

// Function với parameter và return types
function calculateTotal(
  price: number,
  quantity: number,
  taxRate: number,
): number {
  return price * quantity * (1 + taxRate);
}

const total = calculateTotal(100, 2, 0.1); // ✅ OK
// const total = calculateTotal("100", 2, 0.1); // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'

// Interface cho object shapes
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

function displayProduct(product: Product): string {
  return `${product.name} - $${product.price} ${product.inStock ? "(In Stock)" : "(Out of Stock)"}`;
}

const product: Product = {
  id: 1,
  name: "Laptop",
  price: 999.99,
  inStock: true,
};

console.log(displayProduct(product)); // ✅ OK

// Type alias cho union types
type Status = "pending" | "approved" | "rejected";

interface Order {
  id: number;
  status: Status;
  total: number;
}

function updateOrderStatus(order: Order, newStatus: Status): Order {
  return { ...order, status: newStatus };
}

const order: Order = {
  id: 1,
  status: "pending",
  total: 100,
};

const updatedOrder = updateOrderStatus(order, "approved"); // ✅ OK
// const invalidOrder = updateOrderStatus(order, 'invalid'); // ❌ Error: Argument of type '"invalid"' is not assignable to parameter of type 'Status'
```

### Best Practices:

1. **Explicit types cho public APIs**: Khai báo rõ ràng types cho functions và interfaces public
2. **Use type inference**: Để TypeScript tự推断 types cho internal code
3. **Avoid `any`**: Hạn chế dùng `any`, dùng `unknown` hoặc generic types
4. **Strict mode**: Bật `strict: true` để tận dụng đầy đủ static typing
5. **Type annotations cho complex types**: Khai báo types cho objects, arrays, functions phức tạp

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Dùng any làm mất lợi ích của static typing
function processData(data: any): any {
  return data.value;
}

// ✅ Nên: Dùng type cụ thể hoặc generic
interface Data {
  value: string;
}

function processData(data: Data): string {
  return data.value;
}

// ❌ Không nên: Type assertion lạm dụng
const value = someValue as string;

// ✅ Nên: Dùng type guard
if (typeof someValue === "string") {
  const value = someValue; // TypeScript biết đây là string
}
```

---

## Type inference trong TypeScript hoạt động như thế nào?

**Type inference** - TypeScript tự động xác định type của biến/dấu hiệu dựa trên giá trị khởi tạo và cách sử dụng.

### Mục đích / Purpose

Type inference giúp:

- Giảm số lượng type annotation cần viết
- Giữ code clean và readable
- Tăng productivity
- Tự động update types khi code thay đổi

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                                 |
| --------------------- | -------------------------------------------- |
| Simple variables      | Khi type rõ ràng từ giá trị khởi tạo         |
| Function return types | Khi return type có thể推断 từ implementation |
| Local variables       | Khi type rõ ràng từ context                  |
| Array literals        | Khi elements có cùng type                    |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Less verbose**: Code ngắn gọn hơn
- **Automatic updates**: Types tự động update khi code thay đổi
- **Better DX**: Viết code nhanh hơn
- **Maintainability**: Dễ maintain hơn với ít type annotations hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm                            |
| ------------------ | ------------------------------------- |
| Less verbose       | Có thể ambiguous                      |
| Automatic updates  | Harder to understand inferred types   |
| Faster development | Debugging type errors khó hơn         |
| Cleaner code       | Có thể cần explicit types cho clarity |

### Ví dụ:

```typescript
// Type inference cơ bản

// 1. Variable declaration inference
let name = "John"; // TypeScript推断 name là string
let age = 30; // TypeScript推断 age là number
let isActive = true; // TypeScript推断 isActive là boolean

// name = 123; // ❌ Error: Type 'number' is not assignable to type 'string'

// 2. Array inference
const numbers = [1, 2, 3]; // TypeScript推断 là number[]
const strings = ["a", "b", "c"]; // TypeScript推断 là string[]
const mixed = [1, "two", true]; // TypeScript推断 là (string | number | boolean)[]

// 3. Object inference
const user = {
  id: 1,
  name: "John",
  email: "john@example.com",
}; // TypeScript推断 type là { id: number; name: string; email: string; }

// user.age = 30; // ❌ Error: Property 'age' does not exist on type...

// 4. Function return type inference
function add(a: number, b: number) {
  return a + b; // TypeScript推断 return type là number
}

// 5. Contextual typing
const numbers2 = [1, 2, 3];
numbers2.forEach((num) => {
  // TypeScript biết num là number từ context
  console.log(num.toFixed(2));
});

// 6. Best common type
const arr = [0, 1, null]; // TypeScript推断 là (number | null)[]

// 7. Widening vs Const
let x = "hello"; // x: string (widening)
const y = "hello"; // y: "hello" (const assertion)

// 8. Explicit type annotation khi cần
let z: string | number = "hello"; // Explicit union type
z = 123; // ✅ OK

// 9. Function parameter inference từ callback
function map<T, U>(array: T[], callback: (item: T) => U): U[] {
  return array.map(callback);
}

const result = map([1, 2, 3], (num) => num * 2); // TypeScript推断 result là number[]
```

### Best Practices:

1. **Let TypeScript infer khi có thể**: Đừng over-annotate types
2. **Explicit types cho public APIs**: Khai báo types cho functions/interfaces public
3. **Use `const` cho literal types**: Dùng `const` để giữ literal types
4. **Explicit types khi inference ambiguous**: Khi type không rõ ràng, khai báo explicitly
5. **Return types cho exported functions**: Khai báo return types cho functions được export

### Anti-patterns cần tránh:

```typescript
// ❌ Không nên: Over-annotation khi inference đủ rõ ràng
const name: string = "John";
const age: number = 30;
const isActive: boolean = true;

// ✅ Nên: Để TypeScript infer
const name = "John";
const age = 30;
const isActive = true;

// ❌ Không nên: Không khai báo types khi inference ambiguous
function processData(data) {
  return data.value; // TypeScript không biết type của data
}

// ✅ Nên: Khai báo types khi cần
interface Data {
  value: string;
}

function processData(data: Data) {
  return data.value;
}

// ❌ Không nên: Dùng any thay vì inference
let value: any = getValue();

// ✅ Nên: Dùng type cụ thể hoặc để TypeScript infer
const value = getValue(); // TypeScript sẽ推断 từ getValue return type
```

---

## Best Practices cho TypeScript Fundamentals

### 1. Enable Strict Mode

Luôn bật `strict: true` trong `tsconfig.json` để tận dụng đầy đủ type checking:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### 2. Avoid `any` Type

Hạn chế dùng `any`, dùng `unknown` hoặc generic types thay thế:

```typescript
// ❌ Không nên
function processData(data: any) {
  return data.value;
}

// ✅ Nên
function processData<T extends { value: unknown }>(data: T): T["value"] {
  return data.value;
}
```

### 3. Use Type Inference

Để TypeScript tự推断 types khi có thể:

```typescript
// ✅ Nên: Để TypeScript infer
const name = "John";
const age = 30;

// ❌ Không nên: Over-annotation
const name: string = "John";
const age: number = 30;
```

### 4. Explicit Types for Public APIs

Khai báo rõ ràng types cho functions và interfaces public:

```typescript
// ✅ Nên: Explicit types cho exported functions
export function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
```

### 5. Use Interfaces for Object Shapes

Dùng interfaces để định nghĩa cấu trúc objects:

```typescript
// ✅ Nên
interface User {
  id: number;
  name: string;
  email: string;
}

function displayUser(user: User): string {
  return `${user.name} (${user.email})`;
}
```

### 6. Configure tsconfig.json Properly

Configure `tsconfig.json` phù hợp với dự án:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "sourceMap": true,
    "declaration": true,
    "incremental": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## Anti-patterns cần tránh

### 1. Over-using `any`

```typescript
// ❌ Không nên
function processData(data: any): any {
  return data.value;
}

// ✅ Nên
interface Data {
  value: string;
}

function processData(data: Data): string {
  return data.value;
}
```

### 2. Type Assertion Lạm dụng

```typescript
// ❌ Không nên
const value = someValue as string;

// ✅ Nên
if (typeof someValue === "string") {
  const value = someValue;
}
```

### 3. Ignoring Type Errors

```typescript
// ❌ Không nên
// @ts-ignore
const value = someValue;

// ✅ Nên
const value = someValue as SomeType; // Hoặc fix type error
```

### 4. Not Using Strict Mode

```json
// ❌ Không nên
{
  "compilerOptions": {
    "strict": false
  }
}

// ✅ Nên
{
  "compilerOptions": {
    "strict": true
  }
}
```

---

_References:_

- [TypeScript Official Docs](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
