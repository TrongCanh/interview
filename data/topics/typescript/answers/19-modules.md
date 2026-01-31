# 19. Modules

## Tổng quan về Modules

### Mục đích của Modules / Purpose

**Modules** trong TypeScript là cách để tổ chức code thành các file riêng biệt, cho phép import/export giữa các files, giúp code dễ maintain và reuse.

**Mục đích chính:**

- Tổ chức code thành các modules
- Import/export giữa các files
- Code reuse và maintainability
- Encapsulation và scope isolation
- Dependency management

### Khi nào cần hiểu về Modules / When to Use

Hiểu về Modules là cần thiết khi:

- Xây dựng applications lớn
- Tổ chức code thành nhiều files
- Reuse code giữa các modules
- Xây dựng libraries
- Làm việc với third-party packages

### Giúp ích gì / Benefits

**Lợi ích:**

- **Code Organization**: Tổ chức code rõ ràng
- **Reusability**: Reuse code dễ dàng
- **Maintainability**: Dễ maintain và scale
- **Type Safety**: TypeScript kiểm tra types giữa modules
- **Tree Shaking**: Optimize bundle size

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm             |
| ------------------- | ---------------------- |
| - Code organization | Learning curve         |
| - Reusability       | Cần build tools        |
| - Maintainability   | Circular dependencies  |
| - Type safety       | Performance overhead   |
| - Tree shaking      | Complex configurations |

---

## ES Modules trong TypeScript?

**ES Modules** - Hệ thống module chuẩn của ECMAScript, sử dụng `import` và `export` keywords.

### Mục đích / Purpose

Sử dụng ES Modules để tổ chức code thành các modules có thể import/export.

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                    |
| --------------------- | ------------------------------- |
| - Modern applications | Khi build modern apps           |
| - TypeScript projects | Khi dùng TypeScript             |
| - Libraries           | Khi xây dựng libraries          |
| - Node.js             | Khi dùng Node.js với ES modules |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Standard**: Chuẩn ECMAScript
- **Type-safe**: TypeScript hỗ trợ tốt
- **Tree shaking**: Optimize bundle size
- **Async loading**: Load modules async
- **Dynamic imports**: Import modules động

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm            |
| --------------- | --------------------- |
| - Standard      | Cần build tools       |
| - Type-safe     | Browser support       |
| - Tree shaking  | Learning curve        |
| - Async loading | Circular dependencies |

### Ví dụ:

```typescript
// math.ts - Export các functions
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  return a / b;
}

// Export default
export default function power(base: number, exponent: number): number {
  return Math.pow(base, exponent);
}

// Export type
export type Operation = (a: number, b: number) => number;

// Export interface
export interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

// Export constant
export const PI = 3.14159;

// Export enum
export enum OperationType {
  Add = "ADD",
  Subtract = "SUBTRACT",
  Multiply = "MULTIPLY",
  Divide = "DIVIDE",
}

// main.ts - Import từ math.ts
import power, {
  add,
  subtract,
  multiply,
  divide,
  type Operation,
  type Calculator,
  PI,
  OperationType,
} from "./math";

// Import default
// import power from "./math";

// Import tất cả
// import * as math from "./math";

// Sử dụng imports
console.log(add(1, 2)); // 3
console.log(subtract(5, 3)); // 2
console.log(multiply(2, 3)); // 6
console.log(divide(10, 2)); // 5
console.log(power(2, 3)); // 8
console.log(PI); // 3.14159
console.log(OperationType.Add); // "ADD"

// Type alias
const myOperation: Operation = (a, b) => a + b;

// Interface
const calc: Calculator = {
  add,
  subtract,
  multiply,
  divide,
};

// Re-export
// utils.ts
export { add, subtract, multiply, divide } from "./math";
export { power as default } from "./math";

// Re-export type
export type { Calculator } from "./math";

// Aggregate export
// index.ts
export * from "./math";
export * from "./utils";
export { default as power } from "./math";
```

### Best Practices:

```typescript
// ✅ Dùng named exports cho utilities
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

// ✅ Dùng default exports cho main functionality
export default class Calculator {
  // ...
}

// ✅ Dùng type-only imports khi chỉ cần types
import type { User } from "./types";

// ✅ Dùng dynamic imports cho lazy loading
const module = await import("./module");

// ✅ Dùng barrel files (index.ts) để aggregate exports
// index.ts
export * from "./math";
export * from "./utils";

// ❌ Không nên dùng default exports cho utilities
// export default function add(a: number, b: number): number {
//   return a + b;
// }

// ✅ Nên dùng named exports cho utilities
export function add(a: number, b: number): number {
  return a + b;
}
```

---

## `import`, `export`?

**`import`, `export`** - Keywords để import và export modules trong TypeScript.

### Mục đích / Purpose

Import và export code giữa các modules.

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng                           |
| ------------------- | -------------------------------------- |
| - Import            | Khi cần dùng code từ module khác       |
| - Export            | Khi muốn chia sẻ code với modules khác |
| - Re-export         | Khi muốn export từ module khác         |
| - Type-only imports | Khi chỉ cần types                      |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Code Sharing**: Chia sẻ code giữa modules
- **Type Safety**: TypeScript kiểm tra types
- **Tree Shaking**: Optimize bundle size
- **Encapsulation**: Isolate code trong modules

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm             |
| --------------- | ---------------------- |
| - Code sharing  | Circular dependencies  |
| - Type safety   | Learning curve         |
| - Tree shaking  | Performance overhead   |
| - Encapsulation | Complex configurations |

### Ví dụ:

```typescript
// Export examples

// Named exports
export const PI = 3.14159;

export function add(a: number, b: number): number {
  return a + b;
}

export class Calculator {
  // ...
}

export interface User {
  id: number;
  name: string;
}

export type Operation = (a: number, b: number) => number;

export enum OperationType {
  Add = "ADD",
  Subtract = "SUBTRACT",
}

// Default export
export default class DefaultCalculator {
  // ...
}

// Export as
export { add as sum, subtract as difference };

// Re-export
export { add, subtract } from "./math";

// Re-export as
export { add as sum } from "./math";

// Export from (re-export all)
export * from "./math";

// Import examples

// Named imports
import { add, subtract, PI } from "./math";

// Default import
import Calculator from "./calculator";

// Import all
import * as math from "./math";

// Import as
import { add as sum } from "./math";

// Type-only import
import type { User } from "./types";

// Type-only named import
import { type User, type Operation } from "./math";

// Dynamic import
const mathModule = await import("./math");

// Import with side effects
import "./styles.css";

// Ví dụ thực tế: API module
// api.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch("/api/users");
  return response.json();
}

export async function getUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

export async function createUser(data: CreateUserDto): Promise<User> {
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateUser(
  id: number,
  data: UpdateUserDto,
): Promise<User> {
  const response = await fetch(`/api/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteUser(id: number): Promise<void> {
  await fetch(`/api/users/${id}`, { method: "DELETE" });
}

// users.ts
import type { User, CreateUserDto, UpdateUserDto } from "./api";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "./api";

export class UserService {
  async getAll(): Promise<User[]> {
    return getUsers();
  }

  async getById(id: number): Promise<User> {
    return getUser(id);
  }

  async create(data: CreateUserDto): Promise<User> {
    return createUser(data);
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    return updateUser(id, data);
  }

  async delete(id: number): Promise<void> {
    deleteUser(id);
  }
}
```

### Best Practices:

```typescript
// ✅ Dùng named exports cho utilities
export function add(a: number, b: number): number {
  return a + b;
}

// ✅ Dùng default exports cho main functionality
export default class Calculator {
  // ...
}

// ✅ Dùng type-only imports khi chỉ cần types
import type { User } from "./types";

// ✅ Dùng import as để tránh name conflicts
import { add as mathAdd } from "./math";

// ✅ Dùng re-export để aggregate exports
export * from "./math";
export * from "./utils";

// ❌ Không nên dùng import * khi chỉ cần một số exports
// import * as math from "./math";
// console.log(math.add(1, 2));

// ✅ Nên dùng named imports
// import { add } from "./math";
// console.log(add(1, 2));

// ❌ Không nên dùng default exports cho utilities
// export default function add(a: number, b: number): number {
//   return a + b;
// }

// ✅ Nên dùng named exports cho utilities
export function add(a: number, b: number): number {
  return a + b;
}
```

---

## Default exports vs named exports?

**Default exports vs named exports** - Hai cách export trong ES Modules.

### Mục đích / Purpose

Hiểu sự khác nhau giữa default exports và named exports.

### Khi nào dùng / When to Use

| Tình huống        | Khi nào dùng                     |
| ----------------- | -------------------------------- |
| - Default exports | Khi module có main functionality |
| - Named exports   | Khi module có nhiều exports      |
| - Mix             | Khi cần cả hai                   |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Flexibility**: Lựa chọn cách export phù hợp
- **Readability**: Code rõ ràng hơn
- **Tree Shaking**: Optimize bundle size
- **Type Safety**: TypeScript hỗ trợ tốt

### Ưu nhược điểm / Pros & Cons

| Export Type | Ưu điểm                     | Nhược điểm                |
| ----------- | --------------------------- | ------------------------- |
| Default     | Dùng như main functionality | Chỉ có một default export |
| Named       | Multiple exports            | Cần biết tên exports      |
| Mix         | Flexibility                 | Có thể confusing          |

### Ví dụ:

```typescript
// Default exports

// calculator.ts
export default class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }
}

// main.ts
import Calculator from "./calculator";

const calc = new Calculator();
console.log(calc.add(1, 2));

// Named exports

// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export const PI = 3.14159;

// main.ts
import { add, subtract, PI } from "./math";

console.log(add(1, 2));
console.log(PI);

// Mix default và named exports

// utils.ts
export default function main(): void {
  console.log("Main function");
}

export function helper1(): void {
  console.log("Helper 1");
}

export function helper2(): void {
  console.log("Helper 2");
}

// main.ts
import main, { helper1, helper2 } from "./utils";

main();
helper1();
helper2();

// Ví dụ thực tế: Component library

// Button.tsx (React component)
export default function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

// App.tsx
import Button, { type ButtonProps } from "./Button";

function App() {
  return <Button onClick={() => console.log("Clicked")}>Click me</Button>;
}

// Ví dụ thực tế: API module

// api.ts
export interface User {
  id: number;
  name: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch("/api/users");
  return response.json();
}

export async function createUser(data: CreateUserDto): Promise<User> {
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}

export default {
  getUsers,
  createUser,
};

// main.ts
import api, { type User, type CreateUserDto } from "./api";

async function main() {
  const users = await api.getUsers();
  console.log(users);

  const newUser: CreateUserDto = { name: "Alice", email: "alice@example.com" };
  const user = await api.createUser(newUser);
  console.log(user);
}
```

### Best Practices:

```typescript
// ✅ Dùng default exports cho main functionality
export default class Calculator {
  // ...
}

// ✅ Dùng named exports cho utilities
export function add(a: number, b: number): number {
  return a + b;
}

// ✅ Dùng named exports cho types
export interface User {
  id: number;
  name: string;
}

// ✅ Dùng mix default và named exports cho components
export default function Button({ children }: ButtonProps) {
  return <button>{children}</button>;
}

export type ButtonProps = {
  children: React.ReactNode;
};

// ❌ Không nên dùng default exports cho utilities
// export default function add(a: number, b: number): number {
//   return a + b;
// }

// ✅ Nên dùng named exports cho utilities
export function add(a: number, b: number): number {
  return a + b;
}

// ❌ Không nên dùng nhiều default exports trong một module
// export default function add(a: number, b: number): number { ... }
// export default function subtract(a: number, b: number): number { ... }

// ✅ Nên dùng named exports cho nhiều functions
export function add(a: number, b: number): number { ... }
export function subtract(a: number, b: number): number { ... }
```

---

## Re-exports?

**Re-exports** - Export lại exports từ các modules khác.

### Mục đích / Purpose

Aggregate exports từ nhiều modules thành một module.

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng          |
| --------------------- | --------------------- |
| - Barrel files        | Khi aggregate exports |
| - Public API          | Khi expose public API |
| - Module organization | Khi organize modules  |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Aggregation**: Aggregate exports từ nhiều modules
- **Clean Imports**: Imports rõ ràng hơn
- **Public API**: Expose public API
- **Module Organization**: Organize modules tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm                       |
| --------------- | -------------------------------- |
| - Aggregation   | Có thể gây circular dependencies |
| - Clean imports | Performance overhead             |
| - Public API    | Debugging khó                    |
| - Organization  | Complex configurations           |

### Ví dụ:

```typescript
// math/add.ts
export function add(a: number, b: number): number {
  return a + b;
}

// math/subtract.ts
export function subtract(a: number, b: number): number {
  return a - b;
}

// math/multiply.ts
export function multiply(a: number, b: number): number {
  return a * b;
}

// math/divide.ts
export function divide(a: number, b: number): number {
  return a / b;
}

// math/index.ts - Barrel file
export { add } from "./add";
export { subtract } from "./subtract";
export { multiply } from "./multiply";
export { divide } from "./divide";

// Hoặc export all
// export * from "./add";
// export * from "./subtract";
// export * from "./multiply";
// export * from "./divide";

// main.ts
import { add, subtract, multiply, divide } from "./math";

console.log(add(1, 2));
console.log(subtract(5, 3));

// Re-export with renaming
// utils/index.ts
export { add as sum } from "./math/add";
export { subtract as difference } from "./math/subtract";

// Re-export default as named
// api/index.ts
export { default as getUsers } from "./getUsers";
export { default as createUser } from "./createUser";

// Re-export type
// types/index.ts
export type { User } from "./user";
export type { Product } from "./product";

// Ví dụ thực tế: Library public API

// src/components/Button.tsx
export default function Button({ children }: ButtonProps) {
  return <button>{children}</button>;
}

export type ButtonProps = {
  children: React.ReactNode;
};

// src/components/Input.tsx
export default function Input({ value, onChange }: InputProps) {
  return <input value={value} onChange={onChange} />;
}

export type InputProps = {
  value: string;
  onChange: (value: string) => void;
}

// src/components/index.ts
export { default as Button, type ButtonProps } from "./Button";
export { default as Input, type InputProps } from "./Input";

// src/index.ts - Main entry point
export * from "./components";
export * from "./api";
export * from "./utils";

// Ví dụ thực tế: API module

// api/users.ts
export async function getUsers(): Promise<User[]> {
  const response = await fetch("/api/users");
  return response.json();
}

export async function getUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// api/products.ts
export async function getProducts(): Promise<Product[]> {
  const response = await fetch("/api/products");
  return response.json();
}

export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`/api/products/${id}`);
  return response.json();
}

// api/index.ts
export * from "./users";
export * from "./products";

// main.ts
import { getUsers, getProducts } from "./api";
```

### Best Practices:

```typescript
// ✅ Dùng barrel files (index.ts) để aggregate exports
// math/index.ts
export { add } from "./add";
export { subtract } from "./subtract";

// ✅ Dùng re-export với renaming
export { add as sum } from "./math/add";

// ✅ Dùng re-export default as named
export { default as getUsers } from "./getUsers";

// ✅ Dùng re-export type
export type { User } from "./types";

// ✅ Dùng main entry point để aggregate tất cả exports
// src/index.ts
export * from "./components";
export * from "./api";

// ❌ Không nên re-export quá nhiều levels
// ❌ index.ts re-export từ another index.ts

// ✅ Nên giữ re-export structure đơn giản
// ✅ index.ts re-export từ concrete modules
```

---

## Dynamic imports?

**Dynamic imports** - Import modules động tại runtime, trả về Promise.

### Mục đích / Purpose

Load modules động tại runtime, cho phép lazy loading và code splitting.

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                   |
| --------------------- | ------------------------------ |
| - Lazy loading        | Khi load modules khi cần       |
| - Code splitting      | Khi split code thành chunks    |
| - Conditional imports | Khi import dựa trên conditions |
| - Performance         | Khi optimize initial load      |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Lazy Loading**: Load modules khi cần
- **Code Splitting**: Split code thành chunks
- **Performance**: Optimize initial load
- **Conditional Loading**: Load dựa trên conditions

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm               |
| --------------------- | ------------------------ |
| - Lazy loading        | Runtime overhead         |
| - Code splitting      | Complex error handling   |
| - Performance         | TypeScript types khó hơn |
| - Conditional loading | Debugging khó            |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Dynamic import
async function loadMath() {
  const math = await import("./math");
  console.log(math.add(1, 2));
}

// Ví dụ: Conditional imports
async function loadModule(condition: boolean) {
  if (condition) {
    const module = await import("./module1");
    module.doSomething();
  } else {
    const module = await import("./module2");
    module.doSomethingElse();
  }
}

// Ví dụ: Lazy loading components (React)
import React, { Suspense, lazy } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// Ví dụ: Code splitting với webpack
async function loadFeature() {
  const { feature } = await import(/* webpackChunkName: "feature" */ "./feature");
  feature();
}

// Ví dụ thực tế: Route-based code splitting
import React, { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  );
}

// Ví dụ thực tế: Lazy loading with error handling
async function loadModuleSafely(moduleName: string) {
  try {
    const module = await import(`./modules/${moduleName}`);
    return module;
  } catch (error) {
    console.error(`Failed to load module ${moduleName}:`, error);
    throw error;
  }
}

// Ví dụ thực tế: Dynamic imports with types
type MathModule = {
  add: (a: number, b: number) => number;
  subtract: (a: number, b: number) => number;
};

async function loadMath(): Promise<MathModule> {
  const math = await import("./math");
  return math as MathModule;
}

// Ví dụ thực tế: Prefetching
function prefetchModule() {
  // Prefetch module để cache
  import("./module");
}

// Prefetch khi user hover vào button
button.addEventListener("mouseenter", prefetchModule);

// Ví dụ thực tế: Dynamic imports với environment variables
async function loadApi() {
  const apiModule = process.env.API_TYPE === "rest"
    ? await import("./api/rest")
    : await import("./api/graphql");

  return apiModule.default;
}

// Ví dụ thực tế: Dynamic imports với fallback
async function loadModuleWithFallback(moduleName: string) {
  try {
    const module = await import(`./modules/${moduleName}`);
    return module;
  } catch (error) {
    console.warn(`Failed to load ${moduleName}, loading fallback`);
    return await import("./modules/fallback");
  }
}
```

### Best Practices:

```typescript
// ✅ Dùng dynamic imports cho lazy loading
const LazyComponent = lazy(() => import("./LazyComponent"));

// ✅ Dùng dynamic imports cho code splitting
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

// ✅ Dùng error handling với dynamic imports
try {
  const module = await import("./module");
} catch (error) {
  console.error("Failed to load module:", error);
}

// ✅ Dùng Suspense với lazy components
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>

// ✅ Dùng type assertions với dynamic imports
type MathModule = {
  add: (a: number, b: number) => number;
};

const math = (await import("./math")) as MathModule;

// ❌ Không nên dùng dynamic imports cho critical code
// ✅ Nên dùng static imports cho critical code
import { criticalFunction } from "./critical";

// ❌ Không nên dùng dynamic imports quá nhiều
// ✅ Nên balance giữa static và dynamic imports
```

---

## Type-only imports?

**Type-only imports** - Import chỉ types, không import code runtime.

### Mục đích / Purpose

Import chỉ types, không import code runtime, giúp tree shaking và giảm bundle size.

### Khi nào dùng / When to Use

| Tình huống              | Khi nào dùng                    |
| ----------------------- | ------------------------------- |
| - Type-only imports     | Khi chỉ cần types               |
| - Circular dependencies | Khi tránh circular dependencies |
| - Tree shaking          | Khi optimize bundle size        |
| - Type annotations      | Khi chỉ dùng types              |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Tree Shaking**: Optimize bundle size
- **Avoid Circular Dependencies**: Tránh circular dependencies
- **Type Safety**: TypeScript kiểm tra types
- **Clean Imports**: Imports rõ ràng hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                       | Nhược điểm      |
| ----------------------------- | --------------- |
| - Tree shaking                | Learning curve  |
| - Avoid circular dependencies | Syntax mới      |
| - Type safety                 | Browser support |
| - Clean imports               | Debugging khó   |

### Ví dụ:

```typescript
// types.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}

// main.ts - Type-only import
import type { User, Product } from "./types";

function processUser(user: User) {
  console.log(user.name);
}

function processProduct(product: Product) {
  console.log(product.name);
}

// Ví dụ: Type-only import với named imports
import type { User } from "./types";

// Ví dụ: Type-only import với default import
import type Calculator from "./calculator";

// Ví dụ: Type-only import với mixed imports
import Calculator, { type User, type Product } from "./types";

// Ví dụ: Type-only re-export
// index.ts
export type { User, Product } from "./types";

// Ví dụ thực tế: Circular dependencies

// user.ts
import type { Post } from "./post";

export interface User {
  id: number;
  name: string;
  posts?: Post[];
}

// post.ts
import type { User } from "./user";

export interface Post {
  id: number;
  title: string;
  author: User;
}

// Ví dụ thực tế: Component props types

// Button.tsx
export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({ children, onClick, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

// App.tsx
import Button, { type ButtonProps } from "./Button";

function App() {
  const handleClick = () => console.log("Clicked");

  const props: ButtonProps = {
    children: "Click me",
    onClick: handleClick,
  };

  return <Button {...props} />;
}

// Ví dụ thực tế: API response types

// api.ts
export type ApiResponse<T> = {
  data: T;
  error: string | null;
};

export type User = {
  id: number;
  name: string;
  email: string;
};

export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
};

export async function getUsers(): Promise<ApiResponse<User[]>> {
  const response = await fetch("/api/users");
  return response.json();
}

// main.ts
import type { User, CreateUserDto, ApiResponse } from "./api";
import { getUsers, createUser } from "./api";

async function main() {
  const response: ApiResponse<User[]> = await getUsers();
  console.log(response.data);
}
```

### Best Practices:

```typescript
// ✅ Dùng type-only imports khi chỉ cần types
import type { User, Product } from "./types";

// ✅ Dùng type-only imports để tránh circular dependencies
// user.ts
import type { Post } from "./post";

// post.ts
import type { User } from "./user";

// ✅ Dùng type-only imports với default exports
import type Calculator from "./calculator";

// ✅ Dùng type-only imports với named imports
import { type User, type Product } from "./types";

// ✅ Dùng type-only re-exports
export type { User, Product } from "./types";

// ❌ Không nên dùng type-only imports khi cần runtime code
// import type { add } from "./math";
// console.log(add(1, 2)); // ❌ Error: add is not defined

// ✅ Nên dùng regular imports khi cần runtime code
import { add } from "./math";
console.log(add(1, 2));
```

---

## Tổng kết

### Bảng so sánh Import/Export

| Type             | Cú pháp                          | Use Case                  |
| ---------------- | -------------------------------- | ------------------------- |
| Named export     | `export const x = 1`             | Export nhiều values       |
| Default export   | `export default class {}`        | Export main functionality |
| Named import     | `import { x } from "./mod"`      | Import specific exports   |
| Default import   | `import X from "./mod"`          | Import default export     |
| Import all       | `import * as X from "./mod"`     | Import tất cả exports     |
| Re-export        | `export { x } from "./mod"`      | Export lại từ module khác |
| Type-only import | `import type { X } from "./mod"` | Import chỉ types          |
| Dynamic import   | `await import("./mod")`          | Load modules động         |

### Best Practices chung cho Modules

1. **Named exports cho utilities**: Dùng named exports cho utilities
2. **Default exports cho main functionality**: Dùng default exports cho main functionality
3. **Barrel files**: Dùng barrel files (index.ts) để aggregate exports
4. **Type-only imports**: Dùng type-only imports khi chỉ cần types
5. **Dynamic imports**: Dùng dynamic imports cho lazy loading

### Anti-patterns cần tránh

```typescript
// ❌ Dùng default exports cho utilities
export default function add(a: number, b: number): number {
  return a + b;
}

// ✅ Nên dùng named exports
export function add(a: number, b: number): number {
  return a + b;
}

// ❌ Dùng import * khi chỉ cần một số exports
import * as math from "./math";
console.log(math.add(1, 2));

// ✅ Nên dùng named imports
import { add } from "./math";
console.log(add(1, 2));

// ❌ Dùng type-only imports khi cần runtime code
import type { add } from "./math";
console.log(add(1, 2)); // ❌ Error

// ✅ Nên dùng regular imports
import { add } from "./math";
console.log(add(1, 2));
```

---

## Tài liệu tham khảo / References

- [TypeScript Handbook - Modules](https://www.typescriptlang.org/docs/handbook/modules.html)
- [TypeScript Handbook - Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
- [MDN - JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [TypeScript Deep Dive - Modules](https://basarat.gitbook.io/typescript/project/modules)

---

_Last updated: 2026-01-30_
