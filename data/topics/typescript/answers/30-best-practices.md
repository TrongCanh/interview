# 30. Best Practices

## Tổng quan về TypeScript Best Practices

### Mục đích của Best Practices / Purpose

**TypeScript Best Practices** - Các best practices để viết TypeScript code tốt hơn.

**Mục đích chính:**

- Viết type-safe code
- Maintainable codebase
- Better developer experience
- Catch errors sớm hơn
- Team collaboration tốt hơn

### Khi nào cần hiểu về Best Practices / When to Use

Hiểu về Best Practices là cần thiết khi:

- Xây dựng TypeScript projects
- Review TypeScript code
- Onboard team members
- Improve code quality
- Refactor TypeScript code

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors sớm hơn
- **Maintainability**: Code dễ maintain hơn
- **Better DX**: Developer experience tốt hơn
- **Team Collaboration**: Code rõ ràng hơn
- **Refactoring**: Refactor an toàn hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm              | Nhược điểm      |
| -------------------- | --------------- |
| - Type safety        | Learning curve  |
| - Maintainability    | Có thể verbose  |
| - Better DX          | Cần discipline  |
| - Team collaboration | Cần conventions |

---

## Type safety best practices?

**Type safety best practices** - Practices để viết type-safe code.

### Mục đích / Purpose

Viết type-safe code để catch errors sớm hơn.

### Khi nào dùng / When to Use

| Tình huống        | Khi nào dùng            |
| ----------------- | ----------------------- |
| - Type safety     | Khi cần type-safe code  |
| - Avoid any       | Khi tránh dùng any      |
| - Type guards     | Khi narrow types        |
| - Type assertions | Khi cần type assertions |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors sớm hơn
- **Better DX**: IntelliSense hoạt động tốt hơn
- **Refactoring**: Refactor an toàn hơn
- **Documentation**: Types là documentation tự động

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm              |
| --------------- | ----------------------- |
| - Type safety   | Có thể verbose          |
| - Better DX     | Learning curve          |
| - Refactoring   | Cần discipline          |
| - Documentation | Có thể over-engineering |

### Ví dụ:

```typescript
// ✅ Dùng strict mode
// tsconfig.json
{
  "compilerOptions": {
    "strict": true
  }
}

// ✅ Dùng type guards thay vì type assertions
function processValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // ✅ TypeScript biết value là string
  } else {
    console.log(value.toFixed(2)); // ✅ TypeScript biết value là number
  }
}

// ❌ Không nên dùng type assertions thay vì type guards
function badProcessValue(value: string | number) {
  const str = value as string; // ❌ Type unsafe
  console.log(str.toUpperCase());
}

// ✅ Dùng type inference khi có thể
const name = "Alice"; // ✅ TypeScript infer: string
const age = 30; // ✅ TypeScript infer: number

// ❌ Không nên dùng type annotations khi không cần
const name: string = "Alice"; // ❌ Unnecessary
const age: number = 30; // ❌ Unnecessary

// ✅ Dùng type annotations khi cần thiết
interface User {
  id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: "Alice",
}; // ✅ Explicit type

// ✅ Dùng type guards để narrow types
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}

if (isUser(data)) {
  console.log(data.name); // ✅ TypeScript biết data là User
}

// ✅ Dùng discriminated unions
type Success<T> = { status: "success"; data: T };
type Error = { status: "error"; error: string };

type Result<T> = Success<T> | Error;

function handleResult<T>(result: Result<T>) {
  if (result.status === "success") {
    console.log(result.data); // ✅ TypeScript biết result có data
  } else {
    console.log(result.error); // ✅ TypeScript biết result có error
  }
}

// ✅ Dùng utility types
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>; // ✅ Tất cả properties optional
type ReadonlyUser = Readonly<User>; // ✅ Tất cả properties readonly
type UserKeys = keyof User; // ✅ "id" | "name" | "email"
```

### Best Practices:

```typescript
// ✅ Dùng strict mode
{
  "compilerOptions": {
    "strict": true
  }
}

// ✅ Dùng type guards thay vì type assertions
function processValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // ✅ Type safe
  }
}

// ✅ Dùng type inference khi có thể
const name = "Alice"; // ✅ TypeScript infer: string

// ✅ Dùng type annotations khi cần thiết
interface User {
  id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: "Alice",
}; // ✅ Explicit type

// ✅ Dùng type guards để narrow types
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}

if (isUser(data)) {
  console.log(data.name); // ✅ Type safe
}

// ✅ Dùng discriminated unions
type Success<T> = { status: "success"; data: T };
type Error = { status: "error"; error: string };

type Result<T> = Success<T> | Error;

function handleResult<T>(result: Result<T>) {
  if (result.status === "success") {
    console.log(result.data); // ✅ Type safe
  }
}

// ❌ Không nên dùng type assertions thay vì type guards
function badProcessValue(value: string | number) {
  const str = value as string; // ❌ Type unsafe
  console.log(str.toUpperCase());
}

// ✅ Nên dùng type guards
function goodProcessValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // ✅ Type safe
  }
}

// ❌ Không nên dùng any types
const data: any = JSON.parse('{"id": 1, "name": "Alice"}'); // ❌ Type unsafe

// ✅ Nên dùng specific types
interface User {
  id: number;
  name: string;
}

const data: User = JSON.parse('{"id": 1, "name": "Alice"}'); // ✅ Type safe
```

---

## Code organization best practices?

**Code organization best practices** - Practices để tổ chức TypeScript code tốt hơn.

### Mục đích / Purpose

Tổ chức TypeScript code để dễ maintain hơn.

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng             |
| ------------------- | ------------------------ |
| - File organization | Khi organize files       |
| - Module structure  | Khi structure modules    |
| - Shared types      | Khi share types          |
| - Barrel exports    | Khi export nhiều modules |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Maintainability**: Code dễ maintain hơn
- **Reusability**: Code dễ reuse hơn
- **Team Collaboration**: Code rõ ràng hơn
- **Scalability**: Code dễ scale hơn
- **Better DX**: Developer experience tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm              | Nhược điểm              |
| -------------------- | ----------------------- |
| - Maintainability    | Learning curve          |
| - Reusability        | Cần discipline          |
| - Team collaboration | Có thể over-engineering |
| - Scalability        | Cần conventions         |

### Ví dụ:

```typescript
// ✅ Dùng barrel exports
// types/index.ts
export * from "./user";
export * from "./product";
export * from "./order";

// Sử dụng
import { User, Product, Order } from "./types";

// ✅ Dùng feature-based structure
// src/
//   features/
//     auth/
//       types.ts
//       api.ts
//       components/
//     products/
//       types.ts
//       api.ts
//       components/
//   shared/
//     types/
//     utils/
//   api/
//   components/

// ✅ Dùng domain-driven structure
// src/
//   domain/
//     user/
//       types.ts
//       repository.ts
//       service.ts
//     product/
//       types.ts
//       repository.ts
//       service.ts
//   infrastructure/
//     database/
//     api/
//   application/
//     use-cases/

// ✅ Dùng type aliases cho shared types
// shared/types.ts
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

export type ErrorResponse = {
  success: false;
  error: string;
  message: string;
};

// ✅ Dùng interfaces cho domain models
// domain/user/types.ts
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
}

// ✅ Dùng utility types cho type transformations
// shared/utils/types.ts
export type Partial<T> = {
  [K in keyof T]?: T[K];
};

export type Required<T> = {
  [K in keyof T]-?: T[K];
};

export type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

### Best Practices:

```typescript
// ✅ Dùng barrel exports
// types/index.ts
export * from "./user";
export * from "./product";

// Sử dụng
import { User, Product } from "./types";

// ✅ Dùng feature-based structure
// src/
//   features/
//     auth/
//       types.ts
//       api.ts
//     products/
//       types.ts
//       api.ts
//   shared/
//     types/
//     utils/

// ✅ Dùng domain-driven structure
// src/
//   domain/
//     user/
//       types.ts
//       repository.ts
//     product/
//       types.ts
//       repository.ts
//   infrastructure/
//     database/
//   application/
//     use-cases/

// ✅ Dùng type aliases cho shared types
export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
};

// ✅ Dùng interfaces cho domain models
export interface User {
  id: number;
  name: string;
  email: string;
}

// ✅ Dùng utility types cho type transformations
export type Partial<T> = {
  [K in keyof T]?: T[K];
};

export type Required<T> = {
  [K in keyof T]-?: T[K];
};

// ❌ Không nên dùng flat structure cho large projects
// src/
//   types.ts
//   api.ts
//   utils.ts
//   components/
//   services/

// ✅ Nên dùng feature-based structure
// src/
//   features/
//     auth/
//       types.ts
//       api.ts
//     products/
//       types.ts
//       api.ts
```

---

## Performance best practices?

**Performance best practices** - Practices để optimize TypeScript performance.

### Mục đích / Purpose

Optimize TypeScript performance để build nhanh hơn.

### Khi nào dùng / When to Use

| Tình huống           | Khi nào dùng               |
| -------------------- | -------------------------- |
| - Build time         | Khi build time chậm        |
| - Type checking      | Khi type checking chậm     |
| - Incremental builds | Khi cần incremental builds |
| - Project references | Khi cần project references |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Faster Builds**: Build nhanh hơn
- **Better DX**: Developer experience tốt hơn
- **Incremental Builds**: Build incremental
- **Type Checking**: Type checking nhanh hơn
- **Scalability**: Scale tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm              | Nhược điểm          |
| -------------------- | ------------------- |
| - Faster builds      | Cần configure       |
| - Better DX          | Learning curve      |
| - Incremental builds | Cần maintain config |
| - Type checking      | Có thể phức tạp     |

### Ví dụ:

```json
// ✅ Dùng incremental builds
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./dist/.tsbuildinfo"
  }
}

// ✅ Dùng project references
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true
  },
  "references": [
    { "path": "../packages/ui" },
    { "path": "../packages/utils" }
  ]
}

// ✅ Dùng skipLibCheck
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}

// ✅ Dùng isolatedModules
{
  "compilerOptions": {
    "isolatedModules": true
  }
}

// ✅ Dùng noUnusedLocals và noUnusedParameters
{
  "compilerOptions": {
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}

// ✅ Dùng exclude để giảm files cần type check
{
  "include": ["src/**/*"],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}

// ✅ Dùng watch mode cho development
{
  "watchOptions": {
    "watchFile": "useFsEvents",
    "watchDirectory": "useFsEvents",
    "synchronousWatchDirectory": true
  }
}
```

### Best Practices:

```json
// ✅ Dùng incremental builds
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./dist/.tsbuildinfo"
  }
}

// ✅ Dùng project references
{
  "compilerOptions": {
    "composite": true,
    "declaration": true
  },
  "references": [
    { "path": "../packages/ui" },
    { "path": "../packages/utils" }
  ]
}

// ✅ Dùng skipLibCheck
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}

// ✅ Dùng exclude để giảm files cần type check
{
  "include": ["src/**/*"],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts"
  ]
}

// ✅ Dùng watch mode cho development
{
  "watchOptions": {
    "watchFile": "useFsEvents",
    "watchDirectory": "useFsEvents"
  }
}

// ❌ Không nên include tất cả files
{
  "include": ["**/*"] // ❌ Too many files
}

// ✅ Nên include chỉ src files
{
  "include": ["src/**/*"] // ✅ Only source files
}

// ❌ Không nên disable type checking
{
  "compilerOptions": {
    "noImplicitAny": false // ❌ Disable type checking
  }
}

// ✅ Nên dùng strict mode
{
  "compilerOptions": {
    "strict": true // ✅ Enable strict mode
  }
}
```

---

## Tổng kết

### Bảng so sánh Best Practices

| Practice          | Mô tả                | Use Case             |
| ----------------- | -------------------- | -------------------- |
| Type safety       | Write type-safe code | Catch errors sớm hơn |
| Code organization | Organize code        | Dễ maintain hơn      |
| Performance       | Optimize performance | Build nhanh hơn      |

### Khi nào nên dùng Best Practices

| Tình huống         | Nên dùng                   |
| ------------------ | -------------------------- |
| Type safety        | ✅ Strict mode             |
| Code organization  | ✅ Feature-based structure |
| Performance        | ✅ Incremental builds      |
| Team collaboration | ✅ Conventions             |

### Best Practices chung

1. **Dùng strict mode**: Enable strict mode trong tsconfig.json
2. **Avoid any types**: Tránh dùng any khi có thể
3. **Use type guards**: Dùng type guards thay vì type assertions
4. **Organize code**: Organize code theo features hoặc domains
5. **Optimize performance**: Dùng incremental builds và project references

### Anti-patterns cần tránh

```typescript
// ❌ Dùng any types
const data: any = JSON.parse('{"id": 1, "name": "Alice"}'); // ❌ Type unsafe

// ✅ Nên dùng specific types
interface User {
  id: number;
  name: string;
}

const data: User = JSON.parse('{"id": 1, "name": "Alice"}'); // ✅ Type safe

// ❌ Dùng type assertions thay vì type guards
function badProcessValue(value: string | number) {
  const str = value as string; // ❌ Type unsafe
  console.log(str.toUpperCase());
}

// ✅ Nên dùng type guards
function goodProcessValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // ✅ Type safe
  }
}

// ❌ Dùng flat structure cho large projects
// src/
//   types.ts
//   api.ts
//   utils.ts

// ✅ Nên dùng feature-based structure
// src/
//   features/
//     auth/
//       types.ts
//       api.ts
//     products/
//       types.ts
//       api.ts

// ❌ Disable type checking
{
  "compilerOptions": {
    "noImplicitAny": false // ❌ Disable type checking
  }
}

// ✅ Nên dùng strict mode
{
  "compilerOptions": {
    "strict": true // ✅ Enable strict mode
  }
}
```

---

## Tài liệu tham khảo / References

- [TypeScript Handbook - Best Practices](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive - Best Practices](https://basarat.gitbook.io/typescript/intro-1/best-practices)
- [TypeScript - tsconfig](https://www.typescriptlang.org/tsconfig)
- [TypeScript - Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

---

_Last updated: 2026-01-30_
