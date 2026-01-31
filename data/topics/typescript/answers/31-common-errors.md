# 31. Common Errors

## Tổng quan về TypeScript Common Errors

### Mục đích của Common Errors / Purpose

**TypeScript Common Errors** - Các lỗi phổ biến khi làm việc với TypeScript và cách fix chúng.

**Mục đích chính:**

- Hiểu các lỗi phổ biến
- Fix errors nhanh hơn
- Debug type errors
- Improve code quality
- Better developer experience

### Khi nào cần hiểu về Common Errors / When to Use

Hiểu về Common Errors là cần thiết khi:

- Debug TypeScript errors
- Fix type errors
- Improve code quality
- Onboard team members
- Learn TypeScript

### Giúp ích gì / Benefits

**Lợi ích:**

- **Debug Faster**: Fix errors nhanh hơn
- **Better DX**: Developer experience tốt hơn
- **Code Quality**: Code chất lượng hơn
- **Team Collaboration**: Onboarding dễ hơn
- **Learning**: Học TypeScript nhanh hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm              | Nhược điểm          |
| -------------------- | ------------------- |
| - Debug faster       | Learning curve      |
| - Better DX          | Có thể nhiều errors |
| - Code quality       | Debugging khó hơn   |
| - Team collaboration | Cần experience      |

---

## Type 'X' is not assignable to type 'Y'?

**Type 'X' is not assignable to type 'Y'** - Error khi type không compatible.

### Mục đích / Purpose

Hiểu và fix type incompatibility errors.

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng               |
| ---------------------- | -------------------------- |
| - Type incompatibility | Khi types không compatible |
| Type guards            | Khi cần narrow types       |
| Type assertions        | Khi cần override types     |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Debug Faster**: Fix type errors nhanh hơn
- **Better DX**: Developer experience tốt hơn
- **Code Quality**: Code chất lượng hơn
- **Type Safety**: Type safety tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm        |
| -------------- | ----------------- |
| - Debug faster | Learning curve    |
| - Better DX    | Có thể verbose    |
| - Code quality | Debugging khó hơn |
| - Type safety  | Cần experience    |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Type 'X' is not assignable to type 'Y'
interface User {
  id: number;
  name: string;
}

interface Admin {
  id: number;
  name: string;
  role: string;
}

function processUser(user: User) {
  console.log(user.id, user.name);
}

const admin: Admin = {
  id: 1,
  name: "Alice",
  role: "admin",
};

// ❌ Error: Type 'Admin' is not assignable to type 'User'
processUser(admin);

// ✅ Fix 1: Dùng type guard
function isAdmin(user: User | Admin): user is Admin {
  return "role" in user;
}

if (isAdmin(admin)) {
  processUser(admin); // ✅ OK
}

// ✅ Fix 2: Dùng type assertion
processUser(admin as User); // ✅ OK

// ✅ Fix 3: Dùng intersection types
interface UserWithRole extends User {
  role?: string;
}

const userWithRole: UserWithRole = {
  id: 1,
  name: "Alice",
  role: "admin",
};

processUser(userWithRole); // ✅ OK

// Ví dụ thực tế: Union types
type StringOrNumber = string | number;

function processValue(value: StringOrNumber) {
  console.log(value);
}

const str: string = "hello";
const num: number = 42;

processValue(str); // ✅ OK
processValue(num); // ✅ OK

// ❌ Error: Type 'boolean' is not assignable to type 'StringOrNumber'
const bool: boolean = true;
processValue(bool);

// ✅ Fix: Dùng type guard
function isStringOrNumber(value: unknown): value is StringOrNumber {
  return typeof value === "string" || typeof value === "number";
}

if (isStringOrNumber(bool)) {
  processValue(bool); // ✅ OK
}

// Ví dụ thực tế: Generic types
function identity<T>(value: T): T {
  return value;
}

const result: string = identity("hello"); // ✅ OK
const result2: number = identity(42); // ✅ OK

// ❌ Error: Type 'string' is not assignable to type 'number'
const result3: number = identity("hello");

// ✅ Fix: Dùng correct type
const result4: string = identity("hello"); // ✅ OK
```

### Best Practices:

```typescript
// ✅ Dùng type guards để narrow types
function isAdmin(user: User | Admin): user is Admin {
  return "role" in user;
}

if (isAdmin(user)) {
  console.log(user.role); // ✅ TypeScript biết user là Admin
}

// ✅ Dùng type assertions khi cần thiết
processUser(admin as User); // ✅ OK

// ✅ Dùng intersection types cho compatible types
interface UserWithRole extends User {
  role?: string;
}

// ✅ Dùng discriminated unions
type Success<T> = { status: "success"; data: T };
type Error = { status: "error"; error: string };

type Result<T> = Success<T> | Error;

function handleResult<T>(result: Result<T>) {
  if (result.status === "success") {
    console.log(result.data); // ✅ TypeScript biết result có data
  }
}

// ❌ Không nên dùng type assertions quá nhiều
processUser(admin as User); // ❌ Type unsafe

// ✅ Nên dùng type guards
if (isAdmin(admin)) {
  processUser(admin); // ✅ Type safe
}

// ❌ Không nên dùng any để bypass type checking
processUser(admin as any); // ❌ Type unsafe

// ✅ Nên dùng specific types
processUser(admin as User); // ✅ Type safe
```

---

## Property 'X' does not exist on type 'Y'?

**Property 'X' does not exist on type 'Y'** - Error khi property không tồn tại trong type.

### Mục đích / Purpose

Hiểu và fix property access errors.

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng                        |
| ------------------- | ----------------------------------- |
| - Property access   | Khi access properties không tồn tại |
| Type definitions    | Khi define types                    |
| Optional properties | Khi dùng optional properties        |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Debug Faster**: Fix property access errors nhanh hơn
- **Better DX**: Developer experience tốt hơn
- **Code Quality**: Code chất lượng hơn
- **Type Safety**: Type safety tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm        |
| -------------- | ----------------- |
| - Debug faster | Learning curve    |
| - Better DX    | Có thể verbose    |
| - Code quality | Debugging khó hơn |
| - Type safety  | Cần experience    |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Property 'X' does not exist on type 'Y'
interface User {
  id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: "Alice",
};

// ❌ Error: Property 'email' does not exist on type 'User'
console.log(user.email);

// ✅ Fix 1: Thêm property vào interface
interface UserWithEmail extends User {
  email: string;
}

const userWithEmail: UserWithEmail = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

console.log(userWithEmail.email); // ✅ OK

// ✅ Fix 2: Dùng optional property
interface UserWithOptionalEmail extends User {
  email?: string;
}

const userWithOptionalEmail: UserWithOptionalEmail = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

console.log(userWithOptionalEmail.email); // ✅ OK

// ✅ Fix 3: Dùng type assertion
console.log((user as any).email); // ✅ OK

// Ví dụ thực tế: Dynamic property access
interface User {
  id: number;
  name: string;
}

function getProperty(user: User, key: string) {
  // ❌ Error: Property 'key' does not exist on type 'User'
  return user[key];
}

// ✅ Fix 1: Dùng keyof operator
function getPropertySafe<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

console.log(getPropertySafe(user, "id")); // ✅ OK
console.log(getPropertySafe(user, "name")); // ✅ OK

// ✅ Fix 2: Dùng index signature
interface UserWithIndex extends User {
  [key: string]: unknown;
}

const userWithIndex: UserWithIndex = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

console.log(userWithIndex.email); // ✅ OK

// Ví dụ thực tế: Optional chaining
interface User {
  id: number;
  name: string;
  address?: {
    street: string;
    city: string;
  };
}

const user: User = {
  id: 1,
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "Anytown",
  },
};

console.log(user.address?.street); // ✅ OK
console.log(user.address?.city); // ✅ OK

// Ví dụ thực tế: Nullish coalescing
interface User {
  id: number;
  name: string;
  email?: string;
}

const user: User = {
  id: 1,
  name: "Alice",
};

console.log(user.email ?? "No email"); // ✅ OK
```

### Best Practices:

```typescript
// ✅ Dùng keyof operator cho dynamic property access
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// ✅ Dùng optional chaining cho optional properties
console.log(user.address?.street); // ✅ OK

// ✅ Dùng nullish coalescing cho default values
console.log(user.email ?? "No email"); // ✅ OK

// ✅ Dùng index signature cho dynamic properties
interface UserWithIndex {
  id: number;
  name: string;
  [key: string]: unknown;
}

// ✅ Dùng optional properties
interface UserWithOptionalEmail {
  id: number;
  name: string;
  email?: string;
}

// ❌ Không nên dùng type assertions để bypass type checking
console.log((user as any).email); // ❌ Type unsafe

// ✅ Nên dùng optional chaining
console.log(user.address?.email); // ✅ Type safe

// ❌ Không nên dùng index signature khi không cần
interface UserWithIndex {
  id: number;
  name: string;
  [key: string]: unknown; // ❌ Too permissive
}

// ✅ Nên dùng specific properties
interface User {
  id: number;
  name: string;
  email?: string; // ✅ Specific property
}
```

---

## Cannot find name 'X'?

**Cannot find name 'X'** - Error khi variable hoặc function không được define.

### Mục đích / Purpose

Hiểu và fix undefined variable errors.

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                 |
| --------------------- | ---------------------------- |
| - Undefined variables | Khi dùng undefined variables |
| - Scope issues        | Khi có scope issues          |
| - Import issues       | Khi có import issues         |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Debug Faster**: Fix undefined variable errors nhanh hơn
- **Better DX**: Developer experience tốt hơn
- **Code Quality**: Code chất lượng hơn
- **Type Safety**: Type safety tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm        |
| -------------- | ----------------- |
| - Debug faster | Learning curve    |
| - Better DX    | Có thể verbose    |
| - Code quality | Debugging khó hơn |
| - Type safety  | Cần experience    |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Cannot find name 'X'
function greet(name: string) {
  // ❌ Error: Cannot find name 'message'
  console.log(message);
}

// ✅ Fix 1: Define variable
function greet(name: string) {
  const message = `Hello, ${name}!`;
  console.log(message); // ✅ OK
}

// ✅ Fix 2: Dùng parameter
function greet(name: string) {
  console.log(`Hello, ${name}!`); // ✅ OK
}

// Ví dụ thực tế: Scope issues
function processUser() {
  const user: User = {
    id: 1,
    name: "Alice",
  };

  function logUser() {
    // ❌ Error: Cannot find name 'user'
    console.log(user);
  }

  logUser();
}

// ✅ Fix: Pass user as parameter
function processUser() {
  const user: User = {
    id: 1,
    name: "Alice",
  };

  function logUser(user: User) {
    console.log(user); // ✅ OK
  }

  logUser(user);
}

// Ví dụ thực tế: Import issues
// ❌ Error: Cannot find name 'React'
import { useState } from "react";

function App() {
  const [count, setCount] = React.useState(0);
  return <div>{count}</div>;
}

// ✅ Fix: Import React
import React, { useState } from "react";

function App() {
  const [count, setCount] = React.useState(0);
  return <div>{count}</div>;
}

// Ví dụ thực tế: Type definitions
// ❌ Error: Cannot find name 'User'
function processUser(user: User) {
  console.log(user.id, user.name);
}

// ✅ Fix: Define User interface
interface User {
  id: number;
  name: string;
}

function processUser(user: User) {
  console.log(user.id, user.name); // ✅ OK
}
```

### Best Practices:

```typescript
// ✅ Define variables trước khi dùng
const message = `Hello, ${name}!`;
console.log(message); // ✅ OK

// ✅ Dùng parameters thay vì outer scope variables
function logUser(user: User) {
  console.log(user); // ✅ OK
}

// ✅ Import modules đúng cách
import React, { useState } from "react";

// ✅ Define types trước khi dùng
interface User {
  id: number;
  name: string;
}

// ❌ Không nên dùng variables trước khi define
console.log(message); // ❌ Error: Cannot find name 'message'
const message = "Hello"; // ✅ Define trước khi dùng

// ✅ Nên define variables trước khi dùng
const message = "Hello"; // ✅ Define trước khi dùng
console.log(message); // ✅ OK

// ❌ Không nên dùng functions trước khi define
logUser(user); // ❌ Error: Cannot find name 'logUser'
function logUser(user: User) {
  console.log(user);
}

// ✅ Nên define functions trước khi dùng
function logUser(user: User) {
  console.log(user);
}
logUser(user); // ✅ OK
```

---

## Argument of type 'X' is not assignable to parameter of type 'Y'?

**Argument of type 'X' is not assignable to parameter of type 'Y'** - Error khi argument type không compatible với parameter type.

### Mục đích / Purpose

Hiểu và fix function parameter type errors.

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng               |
| --------------------- | -------------------------- |
| - Function parameters | Khi types không compatible |
| - Type guards         | Khi cần narrow types       |
| Type assertions       | Khi cần override types     |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Debug Faster**: Fix function parameter errors nhanh hơn
- **Better DX**: Developer experience tốt hơn
- **Code Quality**: Code chất lượng hơn
- **Type Safety**: Type safety tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm        |
| -------------- | ----------------- |
| - Debug faster | Learning curve    |
| - Better DX    | Có thể verbose    |
| - Code quality | Debugging khó hơn |
| - Type safety  | Cần experience    |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Argument of type 'X' is not assignable to parameter of type 'Y'
interface User {
  id: number;
  name: string;
}

interface Admin {
  id: number;
  name: string;
  role: string;
}

function processUser(user: User) {
  console.log(user.id, user.name);
}

const admin: Admin = {
  id: 1,
  name: "Alice",
  role: "admin",
};

// ❌ Error: Argument of type 'Admin' is not assignable to parameter of type 'User'
processUser(admin);

// ✅ Fix 1: Dùng type guard
function isAdmin(user: User | Admin): user is Admin {
  return "role" in user;
}

if (isAdmin(admin)) {
  processUser(admin); // ✅ OK
}

// ✅ Fix 2: Dùng type assertion
processUser(admin as User); // ✅ OK

// ✅ Fix 3: Dùng intersection types
interface UserWithRole extends User {
  role?: string;
}

const userWithRole: UserWithRole = {
  id: 1,
  name: "Alice",
  role: "admin",
};

processUser(userWithRole); // ✅ OK

// Ví dụ thực tế: Generic functions
function identity<T>(value: T): T {
  return value;
}

const str: string = "hello";
const num: number = 42;

identity(str); // ✅ OK
identity(num); // ✅ OK

// ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'
identity<string>(42);

// ✅ Fix: Dùng correct type parameter
identity<number>(42); // ✅ OK

// Ví dụ thực tế: Union types
type StringOrNumber = string | number;

function processValue(value: StringOrNumber) {
  console.log(value);
}

const str: string = "hello";
const num: number = 42;

processValue(str); // ✅ OK
processValue(num); // ✅ OK

// ❌ Error: Argument of type 'boolean' is not assignable to parameter of type 'StringOrNumber'
const bool: boolean = true;
processValue(bool);

// ✅ Fix: Dùng type guard
function isStringOrNumber(value: unknown): value is StringOrNumber {
  return typeof value === "string" || typeof value === "number";
}

if (isStringOrNumber(bool)) {
  processValue(bool); // ✅ OK
}
```

### Best Practices:

```typescript
// ✅ Dùng type guards để narrow types
function isAdmin(user: User | Admin): user is Admin {
  return "role" in user;
}

if (isAdmin(user)) {
  console.log(user.role); // ✅ TypeScript biết user là Admin
}

// ✅ Dùng type assertions khi cần thiết
processUser(admin as User); // ✅ OK

// ✅ Dùng intersection types cho compatible types
interface UserWithRole extends User {
  role?: string;
}

// ✅ Dùng discriminated unions
type Success<T> = { status: "success"; data: T };
type Error = { status: "error"; error: string };

type Result<T> = Success<T> | Error;

function handleResult<T>(result: Result<T>) {
  if (result.status === "success") {
    console.log(result.data); // ✅ TypeScript biết result có data
  }
}

// ❌ Không nên dùng type assertions quá nhiều
processUser(admin as User); // ❌ Type unsafe

// ✅ Nên dùng type guards
if (isAdmin(admin)) {
  processUser(admin); // ✅ Type safe
}

// ❌ Không nên dùng any để bypass type checking
processUser(admin as any); // ❌ Type unsafe

// ✅ Nên dùng specific types
processUser(admin as User); // ✅ Type safe
```

---

## Tổng kết

### Bảng so sánh Common Errors

| Error                                                           | Mô tả                     | Fix                                   |
| --------------------------------------------------------------- | ------------------------- | ------------------------------------- |
| Type 'X' is not assignable to type 'Y'                          | Type incompatibility      | Type guards, type assertions          |
| Property 'X' does not exist on type 'Y'                         | Property access errors    | Optional properties, index signatures |
| Cannot find name 'X'                                            | Undefined variables       | Define variables, import modules      |
| Argument of type 'X' is not assignable to parameter of type 'Y' | Function parameter errors | Type guards, type assertions          |

### Khi nào nên dùng Common Errors

| Tình huống                | Nên dùng                                 |
| ------------------------- | ---------------------------------------- |
| Type incompatibility      | ✅ Type guards, type assertions          |
| Property access errors    | ✅ Optional properties, index signatures |
| Undefined variables       | ✅ Define variables, import modules      |
| Function parameter errors | ✅ Type guards, type assertions          |

### Best Practices chung cho Common Errors

1. **Dùng type guards**: Narrow types với type guards
2. **Dùng optional properties**: Dùng optional properties khi cần thiết
3. **Dùng type assertions**: Dùng type assertions khi cần thiết
4. **Define variables**: Define variables trước khi dùng
5. **Import modules**: Import modules đúng cách

### Anti-patterns cần tránh

```typescript
// ❌ Dùng type assertions quá nhiều
processUser(admin as User); // ❌ Type unsafe

// ✅ Nên dùng type guards
if (isAdmin(admin)) {
  processUser(admin); // ✅ Type safe
}

// ❌ Dùng any để bypass type checking
processUser(admin as any); // ❌ Type unsafe

// ✅ Nên dùng specific types
processUser(admin as User); // ✅ Type safe

// ❌ Dùng index signature khi không cần
interface UserWithIndex {
  id: number;
  name: string;
  [key: string]: unknown; // ❌ Too permissive
}

// ✅ Nên dùng specific properties
interface User {
  id: number;
  name: string;
  email?: string; // ✅ Specific property
}

// ❌ Dùng variables trước khi define
console.log(message); // ❌ Error: Cannot find name 'message'
const message = "Hello"; // ✅ Define trước khi dùng

// ✅ Nên define variables trước khi dùng
const message = "Hello"; // ✅ Define trước khi dùng
console.log(message); // ✅ OK
```

---

## Tài liệu tham khảo / References

- [TypeScript Handbook - Common Errors](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive - Common Errors](https://basarat.gitbook.io/typescript/intro-1/common-errors)
- [TypeScript - Error Messages](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript - Troubleshooting](https://www.typescriptlang.org/docs/handbook/intro.html)

---

_Last updated: 2026-01-30_
