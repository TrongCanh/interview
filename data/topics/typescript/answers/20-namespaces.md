# 20. Namespaces

## Tổng quan về Namespaces

### Mục đích của Namespaces / Purpose

**Namespaces** là cách để tổ chức code thành các scopes riêng biệt, giúp tránh name conflicts và organize code. Namespaces là một tính năng cũ của TypeScript, được thay thế bởi ES Modules trong các dự án hiện đại.

**Mục đích chính:**

- Tổ chức code thành scopes riêng biệt
- Tránh name conflicts
- Organize related code
- Legacy TypeScript code
- DTS files cho libraries

### Khi nào cần hiểu về Namespaces / When to Use

Hiểu về Namespaces là cần thiết khi:

- Làm việc với legacy TypeScript code
- Xây dựng declaration files (.d.ts)
- Làm việc với các libraries cũ
- Organize code trong single-file projects
- Xây dựng type definitions

### Giúp ích gì / Benefits

**Lợi ích:**

- **Scope Isolation**: Isolate code trong namespaces
- **Name Collision Avoidance**: Tránh name conflicts
- **Code Organization**: Organize related code
- **Legacy Support**: Hỗ trợ legacy code
- **Declaration Files**: Dùng trong .d.ts files

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm                  |
| ---------------------- | --------------------------- |
| - Scope isolation      | Không phải là chuẩn ES6     |
| - Avoid name conflicts | Không hỗ trợ tree shaking   |
| - Code organization    | Cần build tools             |
| - Legacy support       | Learning curve              |
| - Declaration files    | Phức tạp với large projects |

---

## Namespaces là gì?

**Namespaces** - Cách để tổ chức code thành các scopes riêng biệt, sử dụng `namespace` keyword.

### Mục đích / Purpose

Tạo scopes riêng biệt để tổ chức code và tránh name conflicts.

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng                       |
| ---------------------- | ---------------------------------- |
| - Legacy code          | Khi làm việc với legacy TypeScript |
| - Declaration files    | Khi viết .d.ts files               |
| - Single-file projects | Khi tổ chức code trong một file    |
| - Name conflicts       | Khi cần tránh name conflicts       |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Scope Isolation**: Isolate code trong namespaces
- **Name Collision Avoidance**: Tránh name conflicts
- **Code Organization**: Organize related code
- **Legacy Support**: Hỗ trợ legacy code

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm                |
| ---------------------- | ------------------------- |
| - Scope isolation      | Không phải là chuẩn ES6   |
| - Avoid name conflicts | Không hỗ trợ tree shaking |
| - Code organization    | Cần build tools           |
| - Legacy support       | Learning curve            |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Namespace
namespace Utils {
  export function add(a: number, b: number): number {
    return a + b;
  }

  export function subtract(a: number, b: number): number {
    return a - b;
  }

  export const PI = 3.14159;

  // Private function (không export)
  function privateHelper(): void {
    console.log("Private helper");
  }
}

// Sử dụng namespace
console.log(Utils.add(1, 2)); // 3
console.log(Utils.subtract(5, 3)); // 2
console.log(Utils.PI); // 3.14159

// Ví dụ: Nested namespaces
namespace App {
  export namespace Models {
    export interface User {
      id: number;
      name: string;
    }

    export interface Product {
      id: number;
      name: string;
      price: number;
    }
  }

  export namespace Services {
    export class UserService {
      async getUsers(): Promise<App.Models.User[]> {
        return [];
      }
    }

    export class ProductService {
      async getProducts(): Promise<App.Models.Product[]> {
        return [];
      }
    }
  }
}

// Sử dụng nested namespaces
const userService = new App.Services.UserService();
const productService = new App.Services.ProductService();

// Ví dụ: Namespace aliases
import Models = App.Models;
import Services = App.Services;

const user: Models.User = { id: 1, name: "Alice" };
const service = new Services.UserService();

// Ví dụ: Namespace với classes
namespace Math {
  export class Calculator {
    add(a: number, b: number): number {
      return a + b;
    }

    subtract(a: number, b: number): number {
      return a - b;
    }
  }
}

const calc = new Math.Calculator();
console.log(calc.add(1, 2));

// Ví dụ: Namespace với enums
namespace Status {
  export enum Code {
    Success = 200,
    NotFound = 404,
    Error = 500,
  }
}

console.log(Status.Code.Success); // 200

// Ví dụ: Namespace với interfaces
namespace Shapes {
  export interface Shape {
    area(): number;
  }

  export class Circle implements Shape {
    constructor(private radius: number) {}

    area(): number {
      return Math.PI * this.radius * this.radius;
    }
  }

  export class Rectangle implements Shape {
    constructor(
      private width: number,
      private height: number,
    ) {}

    area(): number {
      return this.width * this.height;
    }
  }
}

const circle = new Shapes.Circle(5);
console.log(circle.area()); // 78.5398...
```

### Best Practices:

```typescript
// ✅ Dùng namespaces cho legacy code
namespace LegacyCode {
  export function oldFunction(): void {
    // ...
  }
}

// ✅ Dùng namespaces cho declaration files
// library.d.ts
declare namespace Library {
  export interface Options {
    debug?: boolean;
  }

  export function init(options?: Options): void;
}

// ✅ Dùng nested namespaces để organize code
namespace App {
  export namespace Models {
    /* ... */
  }
  export namespace Services {
    /* ... */
  }
  export namespace Utils {
    /* ... */
  }
}

// ❌ Không nên dùng namespaces cho modern TypeScript code
// ✅ Nên dùng ES Modules
// utils.ts
export function add(a: number, b: number): number {
  return a + b;
}

// main.ts
import { add } from "./utils";

// ❌ Không nên dùng namespaces khi có ES Modules
// ✅ Nên dùng ES Modules cho modern projects
```

---

## `namespace` keyword?

**`namespace` keyword** - Keyword để tạo namespace trong TypeScript.

### Mục đích / Purpose

Tạo namespace để tổ chức code và tránh name conflicts.

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng                       |
| ---------------------- | ---------------------------------- |
| - Legacy code          | Khi làm việc với legacy TypeScript |
| - Declaration files    | Khi viết .d.ts files               |
| - Single-file projects | Khi tổ chức code trong một file    |
| - Name conflicts       | Khi cần tránh name conflicts       |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Scope Isolation**: Isolate code trong namespaces
- **Name Collision Avoidance**: Tránh name conflicts
- **Code Organization**: Organize related code
- **Legacy Support**: Hỗ trợ legacy code

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm                |
| ---------------------- | ------------------------- |
| - Scope isolation      | Không phải là chuẩn ES6   |
| - Avoid name conflicts | Không hỗ trợ tree shaking |
| - Code organization    | Cần build tools           |
| - Legacy support       | Learning curve            |

### Ví dụ:

```typescript
// Ví dụ cơ bản: namespace keyword
namespace MathUtils {
  export function add(a: number, b: number): number {
    return a + b;
  }

  export function subtract(a: number, b: number): number {
    return a - b;
  }
}

// Sử dụng
console.log(MathUtils.add(1, 2));

// Ví dụ: Namespace với export
namespace API {
  export interface User {
    id: number;
    name: string;
  }

  export interface Response<T> {
    data: T;
    error: string | null;
  }

  export async function getUsers(): Promise<Response<User[]>> {
    const response = await fetch("/api/users");
    return response.json();
  }
}

// Sử dụng
const users = await API.getUsers();

// Ví dụ: Namespace với default exports (không hỗ trợ)
// Namespaces không hỗ trợ default exports
namespace Example {
  // ❌ Error: A namespace cannot have a default export
  // export default function defaultFunction() { }

  // ✅ Nên dùng named exports
  export function namedFunction() {}
}

// Ví dụ: Namespace với types
namespace Types {
  export interface User {
    id: number;
    name: string;
  }

  export type UserRole = "admin" | "user" | "guest";

  export enum Status {
    Active = "active",
    Inactive = "inactive",
  }
}

// Sử dụng
const user: Types.User = { id: 1, name: "Alice" };
const role: Types.UserRole = "admin";
const status = Types.Status.Active;

// Ví dụ: Namespace với modules (không khuyến khích)
// Không nên mix namespaces và modules
// utils.ts
namespace Utils {
  export function helper(): void {
    console.log("Helper");
  }
}

export { Utils };

// main.ts
import { Utils } from "./utils";
Utils.helper();
```

### Best Practices:

```typescript
// ✅ Dùng namespace keyword cho declaration files
// library.d.ts
declare namespace Library {
  export interface Options {
    debug?: boolean;
  }

  export function init(options?: Options): void;
}

// ✅ Dùng namespace keyword cho legacy code
namespace Legacy {
  export function oldFunction(): void {
    // ...
  }
}

// ✅ Dùng namespace với nested organization
namespace App {
  export namespace Models {
    /* ... */
  }
  export namespace Services {
    /* ... */
  }
}

// ❌ Không nên dùng namespace với modules
// utils.ts
namespace Utils {
  export function helper(): void {}
}

export { Utils };

// ✅ Nên dùng modules thay vì namespaces
// utils.ts
export function helper(): void {}

// main.ts
import { helper } from "./utils";
```

---

## Multi-file namespaces?

**Multi-file namespaces** - Namespaces có thể span across multiple files, sử dụng `/// <reference>` directives.

### Mục đích / Purpose

Organize namespaces across multiple files.

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng                       |
| ------------------- | ---------------------------------- |
| - Legacy code       | Khi làm việc với legacy TypeScript |
| - Large namespaces  | Khi namespace quá lớn cho một file |
| - Declaration files | Khi viết .d.ts files               |

### Giúp ích gì / Benefits

**Lợi ích:**

- **File Organization**: Organize code across files
- **Large Namespaces**: Hỗ trợ large namespaces
- **Legacy Support**: Hỗ trợ legacy code
- **Declaration Files**: Dùng trong .d.ts files

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm                     |
| ------------------- | ------------------------------ |
| - File organization | Cần /// <reference> directives |
| - Large namespaces  | Phức tạp                       |
| - Legacy support    | Không phải là chuẩn ES6        |
| - Declaration files | Learning curve                 |

### Ví dụ:

```typescript
// file1.ts
namespace App {
  export interface User {
    id: number;
    name: string;
  }
}

// file2.ts
/// <reference path="file1.ts" />

namespace App {
  export function getUser(id: number): User {
    return { id, name: "Alice" };
  }
}

// file3.ts
/// <reference path="file1.ts" />
/// <reference path="file2.ts" />

namespace App {
  export function printUser(user: User): void {
    console.log(user.name);
  }
}

// main.ts
/// <reference path="file1.ts" />
/// <reference path="file2.ts" />
/// <reference path="file3.ts" />

const user = App.getUser(1);
App.printUser(user);

// Ví dụ thực tế: Declaration files

// library.d.ts
declare namespace Library {
  export interface Options {
    debug?: boolean;
    timeout?: number;
  }

  export function init(options?: Options): void;

  export namespace Utils {
    export function formatDate(date: Date): string;
    export function parseDate(dateString: string): Date;
  }

  export namespace Types {
    export interface User {
      id: number;
      name: string;
    }

    export interface Product {
      id: number;
      name: string;
      price: number;
    }
  }
}

// Ví dụ: Multi-file namespace với classes

// models.ts
namespace App.Models {
  export class User {
    constructor(
      public id: number,
      public name: string,
    ) {}
  }

  export class Product {
    constructor(
      public id: number,
      public name: string,
      public price: number,
    ) {}
  }
}

// services.ts
/// <reference path="models.ts" />

namespace App.Services {
  export class UserService {
    async getUsers(): Promise<App.Models.User[]> {
      return [];
    }
  }

  export class ProductService {
    async getProducts(): Promise<App.Models.Product[]> {
      return [];
    }
  }
}

// main.ts
/// <reference path="models.ts" />
/// <reference path="services.ts" />

const userService = new App.Services.UserService();
const productService = new App.Services.ProductService();
```

### Best Practices:

```typescript
// ✅ Dùng /// <reference> cho multi-file namespaces
// file1.ts
namespace App {
  export interface User {
    /* ... */
  }
}

// file2.ts
/// <reference path="file1.ts" />

namespace App {
  export function getUser(): User {
    /* ... */
  }
}

// ✅ Dùng multi-file namespaces cho declaration files
// types.d.ts
declare namespace Library {
  export interface Options {
    /* ... */
  }
}

// utils.d.ts
/// <reference path="types.d.ts" />

declare namespace Library {
  export namespace Utils {
    export function helper(): void;
  }
}

// ❌ Không nên dùng multi-file namespaces cho modern TypeScript
// ✅ Nên dùng ES Modules
// models.ts
export interface User {
  /* ... */
}

// services.ts
import { User } from "./models";

export class UserService {
  async getUsers(): Promise<User[]> {
    /* ... */
  }
}

// ✅ Nên dùng ES Modules cho modern projects
```

---

## Namespace vs Modules?

**Namespace vs Modules** - So sánh giữa namespaces và ES Modules.

### Mục đích / Purpose

Hiểu sự khác nhau giữa namespaces và ES Modules.

### Khi nào dùng / When to Use

| Tình huống   | Khi nào dùng                   |
| ------------ | ------------------------------ |
| - Namespaces | Legacy code, declaration files |
| - Modules    | Modern TypeScript projects     |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Flexibility**: Lựa chọn cách tổ chức code phù hợp
- **Modern vs Legacy**: Hỗ trợ cả modern và legacy code
- **Type Safety**: TypeScript hỗ trợ cả hai
- **Best Practices**: Chọn cách phù hợp với project

### Ưu nhược điểm / Pros & Cons

| Type      | Ưu điểm                           | Nhược điểm                          |
| --------- | --------------------------------- | ----------------------------------- |
| Namespace | Legacy support, declaration files | Không chuẩn ES6, không tree shaking |
| Modules   | Chuẩn ES6, tree shaking           | Cần build tools                     |

### Ví dụ:

```typescript
// Namespace example
namespace Math {
  export function add(a: number, b: number): number {
    return a + b;
  }

  export function subtract(a: number, b: number): number {
    return a - b;
  }
}

// Sử dụng namespace
console.log(Math.add(1, 2));

// Module example
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

// main.ts
import { add, subtract } from "./math";

// Sử dụng module
console.log(add(1, 2));

// So sánh: Namespace vs Module

// Namespace
namespace App {
  export namespace Models {
    export interface User {
      id: number;
      name: string;
    }
  }

  export namespace Services {
    export class UserService {
      async getUsers(): Promise<App.Models.User[]> {
        return [];
      }
    }
  }
}

// Module
// models.ts
export interface User {
  id: number;
  name: string;
}

// services.ts
import type { User } from "./models";

export class UserService {
  async getUsers(): Promise<User[]> {
    return [];
  }
}

// So sánh: Declaration files

// Namespace (library.d.ts)
declare namespace Library {
  export interface Options {
    debug?: boolean;
  }

  export function init(options?: Options): void;
}

// Module (library.d.ts)
export interface Options {
  debug?: boolean;
}

export function init(options?: Options): void;

// So sánh: Tree shaking

// Namespace (không tree shaking)
namespace Utils {
  export function usedFunction(): void {
    console.log("Used");
  }

  export function unusedFunction(): void {
    console.log("Unused");
  }
}

Utils.usedFunction();
// unusedFunction vẫn được bundle (không tree shaking)

// Module (có tree shaking)
// utils.ts
export function usedFunction(): void {
  console.log("Used");
}

export function unusedFunction(): void {
  console.log("Unused");
}

// main.ts
import { usedFunction } from "./utils";
usedFunction();
// unusedFunction được loại bỏ (tree shaking)
```

### Best Practices:

```typescript
// ✅ Dùng modules cho modern TypeScript projects
// utils.ts
export function add(a: number, b: number): number {
  return a + b;
}

// main.ts
import { add } from "./utils";

// ✅ Dùng namespaces cho legacy code
namespace Legacy {
  export function oldFunction(): void {
    // ...
  }
}

// ✅ Dùng namespaces cho declaration files
// library.d.ts
declare namespace Library {
  export interface Options {
    debug?: boolean;
  }
}

// ❌ Không nên dùng namespaces cho modern projects
// ✅ Nên dùng modules

// ❌ Không nên mix namespaces và modules
// utils.ts
namespace Utils {
  export function helper(): void {}
}

export { Utils };

// ✅ Nên dùng modules thuần túy
// utils.ts
export function helper(): void {}
```

---

## Tổng kết

### Bảng so sánh Namespace vs Modules

| Feature           | Namespace           | ES Modules         |
| ----------------- | ------------------- | ------------------ |
| Syntax            | `namespace X { }`   | `export`, `import` |
| Scope             | Namespace scope     | File scope         |
| Tree shaking      | Không hỗ trợ        | Hỗ trợ             |
| Standard          | TypeScript-specific | Chuẩn ES6          |
| Declaration files | Phổ biến            | Ít dùng hơn        |
| Legacy support    | Có                  | Không              |
| Modern projects   | Không khuyến khích  | Khuyến khích       |

### Khi nào nên dùng Namespaces

| Tình huống                | Nên dùng      |
| ------------------------- | ------------- |
| Legacy TypeScript code    | ✅ Namespaces |
| Declaration files (.d.ts) | ✅ Namespaces |
| Single-file projects      | ✅ Namespaces |
| Name conflicts            | ✅ Namespaces |

### Khi nào nên dùng Modules

| Tình huống                 | Nên dùng   |
| -------------------------- | ---------- |
| Modern TypeScript projects | ✅ Modules |
| React/Vue/Angular apps     | ✅ Modules |
| Node.js projects           | ✅ Modules |
| - Tree shaking cần thiết   | ✅ Modules |

### Best Practices chung cho Namespaces

1. **Chỉ dùng cho legacy code**: Namespaces chủ yếu cho legacy code
2. **Dùng cho declaration files**: Namespaces phổ biến trong .d.ts files
3. **Tránh mix với modules**: Không nên mix namespaces và modules
4. **Ưu tiên modules cho modern projects**: Dùng ES Modules cho modern projects
5. **Organize nested namespaces**: Dùng nested namespaces để organize code

### Anti-patterns cần tránh

```typescript
// ❌ Dùng namespaces cho modern TypeScript projects
namespace Utils {
  export function add(a: number, b: number): number {
    return a + b;
  }
}

// ✅ Nên dùng modules
// utils.ts
export function add(a: number, b: number): number {
  return a + b;
}

// ❌ Mix namespaces và modules
// utils.ts
namespace Utils {
  export function helper(): void {}
}

export { Utils };

// ✅ Nên dùng modules thuần túy
// utils.ts
export function helper(): void {}

// ❌ Dùng /// <reference> trong modern projects
/// <reference path="file1.ts" />

// ✅ Nên dùng imports
import { something } from "./file1";
```

---

## Tài liệu tham khảo / References

- [TypeScript Handbook - Namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html)
- [TypeScript Handbook - Namespaces and Modules](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html)
- [TypeScript Deep Dive - Namespaces](https://basarat.gitbook.io/typescript/project/namespaces)
- [TypeScript - Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

_Last updated: 2026-01-30_
