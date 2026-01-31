# 25. Declaration Files

## Tổng quan về Declaration Files

### Mục đích của Declaration Files / Purpose

**Declaration Files** (`.d.ts` files) là files chứa type definitions cho JavaScript libraries, cho phép TypeScript hiểu types của code không có types.

**Mục đích chính:**

- Cung cấp type definitions cho JavaScript libraries
- Enable IntelliSense cho libraries không có types
- Type safety khi dùng third-party libraries
- Custom type definitions cho internal code
- Extend existing type definitions

### Khi nào cần hiểu về Declaration Files / When to Use

Hiểu về Declaration Files là cần thiết khi:

- Làm việc với JavaScript libraries không có types
- Tạo type definitions cho custom libraries
- Extend existing type definitions
- Xây dựng libraries với TypeScript
- Fix type definitions

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: TypeScript kiểm tra types cho JavaScript code
- **IntelliSense**: IntelliSense hoạt động cho libraries
- **Documentation**: Type definitions là documentation
- **Better DX**: Developer experience tốt hơn
- **Catch Errors**: Catch errors tại compile-time

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm                    |
| --------------- | ----------------------------- |
| - Type safety   | Cần maintain type definitions |
| - IntelliSense  | Có thể phức tạp               |
| - Documentation | Learning curve                |
| - Better DX     | Debugging khó hơn             |

---

## `.d.ts` files là gì?

**`.d.ts` files** - Files chứa type definitions cho JavaScript libraries.

### Mục đích / Purpose

Cung cấp type definitions cho JavaScript libraries.

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng                      |
| ---------------------- | --------------------------------- |
| - JavaScript libraries | Khi dùng libraries không có types |
| - Custom libraries     | Khi xây dựng custom libraries     |
| - Extend definitions   | Khi extend existing definitions   |
| - Internal code        | Khi cần types cho internal code   |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: TypeScript kiểm tra types
- **IntelliSense**: IntelliSense hoạt động
- **Documentation**: Type definitions là documentation
- **Better DX**: Developer experience tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm                    |
| --------------- | ----------------------------- |
| - Type safety   | Cần maintain type definitions |
| - IntelliSense  | Có thể phức tạp               |
| - Documentation | Learning curve                |
| - Better DX     | Debugging khó hơn             |

### Ví dụ:

```typescript
// Ví dụ cơ bản: .d.ts file
// my-library.d.ts
declare namespace MyLibrary {
  function greet(name: string): void;
  const version: string;
}

// Sử dụng
MyLibrary.greet("Alice"); // ✅ IntelliSense hoạt động
console.log(MyLibrary.version); // ✅ Type safety

// Ví dụ: .d.ts file với interfaces
// my-library.d.ts
declare namespace MyLibrary {
  interface User {
    id: number;
    name: string;
    email: string;
  }

  interface Product {
    id: number;
    name: string;
    price: number;
  }
}

// Sử dụng
const user: MyLibrary.User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

const product: MyLibrary.Product = {
  id: 1,
  name: "Widget",
  price: 9.99,
};

// Ví dụ: .d.ts file với classes
// my-library.d.ts
declare namespace MyLibrary {
  class Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
  }
}

// Sử dụng
const calc = new MyLibrary.Calculator();
console.log(calc.add(1, 2)); // ✅ Type safety

// Ví dụ thực tế: jQuery declaration
// jquery.d.ts
declare var $: JQueryStatic;

interface JQueryStatic {
  (selector: string): JQuery;
  ajax(url: string, options: JQueryAjaxOptions): JQueryXHR;
}

interface JQuery {
  html(): string;
  html(content: string): JQuery;
  on(event: string, handler: (event: Event) => void): JQuery;
}

// Sử dụng
$("#element").html("Hello"); // ✅ IntelliSense hoạt động
$.ajax("/api/data", { success: (data) => console.log(data) });

// Ví dụ thực tế: Custom library declaration
// my-utils.d.ts
declare namespace Utils {
  function formatDate(date: Date): string;
  function parseDate(dateString: string): Date;
  function debounce<T extends Function>(func: T, delay: number): T;
}

// Sử dụng
const formatted = Utils.formatDate(new Date());
const parsed = Utils.parseDate("2026-01-30");
const debounced = Utils.debounce(() => console.log("Hello"), 300);
```

### Best Practices:

```typescript
// ✅ Dùng .d.ts files cho JavaScript libraries
// my-library.d.ts
declare namespace MyLibrary {
  function greet(name: string): void;
}

// ✅ Dùng .d.ts files với interfaces
// my-library.d.ts
declare namespace MyLibrary {
  interface User {
    id: number;
    name: string;
  }
}

// ✅ Dùng .d.ts files với classes
// my-library.d.ts
declare namespace MyLibrary {
  class Calculator {
    add(a: number, b: number): number;
  }
}

// ❌ Không nên dùng .d.ts files cho TypeScript code
// ✅ Nên dùng .ts files cho TypeScript code

// ✅ Dùng @types packages thay vì .d.ts files khi có thể
// npm install @types/jquery
// import $ from "jquery";

// ✅ Dùng .d.ts files khi @types không có sẵn
// my-library.d.ts
declare namespace MyLibrary {
  function greet(name: string): void;
}
```

---

## `declare` keyword?

**`declare` keyword** - Keyword để khai báo types cho code không có type definitions.

### Mục đích / Purpose

Khai báo types cho JavaScript code.

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng                     |
| ---------------------- | -------------------------------- |
| - JavaScript libraries | Khi khai báo types cho libraries |
| - Global variables     | Khi khai báo global variables    |
| - Global functions     | Khi khai báo global functions    |
| - Extend definitions   | Khi extend existing definitions  |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: TypeScript kiểm tra types
- **IntelliSense**: IntelliSense hoạt động
- **Documentation**: Type definitions là documentation
- **Better DX**: Developer experience tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm                    |
| --------------- | ----------------------------- |
| - Type safety   | Cần maintain type definitions |
| - IntelliSense  | Có thể phức tạp               |
| - Documentation | Learning curve                |
| - Better DX     | Debugging khó hơn             |

### Ví dụ:

```typescript
// Ví dụ cơ bản: declare với function
// global.d.ts
declare function greet(name: string): void;

// Sử dụng
greet("Alice"); // ✅ TypeScript hiểu function này

// Ví dụ: declare với variable
// global.d.ts
declare var version: string;

// Sử dụng
console.log(version); // ✅ TypeScript hiểu variable này

// Ví dụ: declare với interface
// my-library.d.ts
declare namespace MyLibrary {
  interface User {
    id: number;
    name: string;
  }
}

// Sử dụng
const user: MyLibrary.User = {
  id: 1,
  name: "Alice",
};

// Ví dụ: declare với class
// my-library.d.ts
declare namespace MyLibrary {
  class Calculator {
    add(a: number, b: number): number;
  }
}

// Sử dụng
const calc = new MyLibrary.Calculator();
console.log(calc.add(1, 2));

// Ví dụ: declare với enum
// my-library.d.ts
declare namespace MyLibrary {
  enum Status {
    Active = "active",
    Inactive = "inactive",
  }
}

// Sử dụng
const status = MyLibrary.Status.Active;
console.log(status); // "active"

// Ví dụ thực tế: Global variables
// global.d.ts
declare var __VERSION__: string;
declare var __API_URL__: string;

// Sử dụng
console.log(__VERSION__); // ✅ TypeScript hiểu global variable
console.log(__API_URL__);

// Ví dụ thực tế: Extend existing definitions
// global.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    CUSTOM_VAR: string;
  }
}

// Sử dụng
const value = process.env.CUSTOM_VAR; // ✅ TypeScript hiểu custom env var
```

### Best Practices:

```typescript
// ✅ Dùng declare để khai báo types cho JavaScript libraries
// my-library.d.ts
declare namespace MyLibrary {
  function greet(name: string): void;
}

// ✅ Dùng declare để khai báo global variables
// global.d.ts
declare var __VERSION__: string;

// ✅ Dùng declare để extend existing definitions
// global.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    CUSTOM_VAR: string;
  }
}

// ✅ Dùng declare với interfaces
// my-library.d.ts
declare namespace MyLibrary {
  interface User {
    id: number;
    name: string;
  }
}

// ✅ Dùng declare với classes
// my-library.d.ts
declare namespace MyLibrary {
  class Calculator {
    add(a: number, b: number): number;
  }
}

// ❌ Không nên dùng declare cho TypeScript code
// ✅ Nên dùng .ts files cho TypeScript code

// ✅ Dùng declare với ambient modules
// my-library.d.ts
declare module "my-library" {
  export function greet(name: string): void;
}
```

---

## Ambient modules?

**Ambient modules** - Modules được khai báo với `declare module` để cung cấp type definitions cho JavaScript modules.

### Mục đích / Purpose

Cung cấp type definitions cho JavaScript modules.

### Khi nào dùng / When to Use

| Tình huống                  | Khi nào dùng                           |
| --------------------------- | -------------------------------------- |
| - JavaScript modules        | Khi khai báo types cho modules         |
| - UMD/CommonJS libraries    | Khi libraries dùng UMD/CommonJS        |
| - Extend module definitions | Khi extend existing module definitions |
| - Custom modules            | Khi xây dựng custom modules            |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: TypeScript kiểm tra types
- **IntelliSense**: IntelliSense hoạt động
- **Documentation**: Type definitions là documentation
- **Better DX**: Developer experience tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm                    |
| --------------- | ----------------------------- |
| - Type safety   | Cần maintain type definitions |
| - IntelliSense  | Có thể phức tạp               |
| - Documentation | Learning curve                |
| - Better DX     | Debugging khó hơn             |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Ambient module
// my-library.d.ts
declare module "my-library" {
  export function greet(name: string): void;
  export const version: string;
  export interface User {
    id: number;
    name: string;
  }
}

// Sử dụng
import { greet, version, User } from "my-library";

greet("Alice"); // ✅ Type safety
console.log(version); // ✅ Type safety

const user: User = {
  id: 1,
  name: "Alice",
};

// Ví dụ: Ambient module với classes
// my-library.d.ts
declare module "my-library" {
  export class Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
  }
}

// Sử dụng
import { Calculator } from "my-library";

const calc = new Calculator();
console.log(calc.add(1, 2)); // ✅ Type safety

// Ví dụ thực tế: jQuery ambient module
// jquery.d.ts
declare module "jquery" {
  export var $: JQueryStatic;
  export interface JQueryStatic {
    (selector: string): JQuery;
    ajax(url: string, options: JQueryAjaxOptions): JQueryXHR;
  }
  export interface JQuery {
    html(): string;
    html(content: string): JQuery;
  }
}

// Sử dụng
import $ from "jquery";

$("#element").html("Hello"); // ✅ Type safety
$.ajax("/api/data", { success: (data) => console.log(data) });

// Ví dụ thực tế: Extend existing module
// global.d.ts
declare module "express" {
  interface Request {
    customProperty: string;
  }
}

// Sử dụng
import { Request } from "express";

function handler(req: Request) {
  console.log(req.customProperty); // ✅ TypeScript hiểu custom property
}

// Ví dụ thực tế: Global augmentation
// global.d.ts
declare global {
  interface Window {
    myCustomProperty: string;
  }
}

// Sử dụng
window.myCustomProperty = "Hello"; // ✅ TypeScript hiểu custom property
```

### Best Practices:

```typescript
// ✅ Dùng ambient modules cho JavaScript libraries
// my-library.d.ts
declare module "my-library" {
  export function greet(name: string): void;
}

// ✅ Dùng ambient modules với export
// my-library.d.ts
declare module "my-library" {
  export function greet(name: string): void;
  export const version: string;
}

// ✅ Dùng ambient modules với interfaces
// my-library.d.ts
declare module "my-library" {
  export interface User {
    id: number;
    name: string;
  }
}

// ✅ Dùng ambient modules với classes
// my-library.d.ts
declare module "my-library" {
  export class Calculator {
    add(a: number, b: number): number;
  }
}

// ❌ Không nên dùng ambient modules cho TypeScript code
// ✅ Nên dùng .ts files cho TypeScript code

// ✅ Dùng ambient modules để extend existing definitions
// global.d.ts
declare module "express" {
  interface Request {
    customProperty: string;
  }
}

// ✅ Dùng ambient modules với global augmentation
// global.d.ts
declare global {
  interface Window {
    myCustomProperty: string;
  }
}
```

---

## `@types` packages?

**`@types` packages** - Packages trên npm chứa type definitions cho JavaScript libraries.

### Mục đích / Purpose

Cung cấp type definitions cho JavaScript libraries thông qua npm.

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                          |
| --------------------- | ------------------------------------- |
| - Popular libraries   | Khi dùng libraries có @types packages |
| - TypeScript projects | Khi làm việc với TypeScript           |
| - Type safety         | Khi cần type safety cho libraries     |
| - Better DX           | Khi muốn IntelliSense                 |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: TypeScript kiểm tra types
- **IntelliSense**: IntelliSense hoạt động
- **Community Maintained**: Community maintain type definitions
- **Easy Installation**: Dùng npm để install
- **Better DX**: Developer experience tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm                     |
| ---------------------- | ------------------------------ |
| - Type safety          | Cần install packages           |
| - IntelliSense         | Có thể outdated                |
| - Community maintained | Cần update packages            |
| - Easy installation    | Có thể không có @types package |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Install @types package
// npm install @types/jquery

// Sử dụng
import $ from "jquery";

$("#element").html("Hello"); // ✅ Type safety

// Ví dụ: Install @types/node
// npm install @types/node

// Sử dụng
import * as fs from "fs";
import * as path from "path";

const content = fs.readFileSync("file.txt", "utf8"); // ✅ Type safety
const fullPath = path.join("dir", "file.txt"); // ✅ Type safety

// Ví dụ: Install @types/lodash
// npm install @types/lodash

// Sử dụng
import _ from "lodash";

const users = _.map([1, 2, 3], (n) => n * 2); // ✅ Type safety
const sum = _.sum([1, 2, 3]); // ✅ Type safety

// Ví dụ thực tế: Install @types/express
// npm install @types/express

// Sử dụng
import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello"); // ✅ Type safety
});

// Ví dụ thực tế: Install @types/react
// npm install @types/react

// Sử dụng
import React from "react";

const App: React.FC = () => {
  return <div>Hello</div>;
};

// Ví dụ thực tế: Custom @types package
// @types/my-library
declare module "my-library" {
  export function greet(name: string): void;
}

// Publish to npm
// npm publish @types/my-library

// Install
// npm install @types/my-library

// Sử dụng
import { greet } from "my-library";

greet("Alice"); // ✅ Type safety
```

### Best Practices:

```typescript
// ✅ Install @types packages cho popular libraries
// npm install @types/jquery
// npm install @types/node
// npm install @types/lodash

// ✅ Dùng @types packages thay vì .d.ts files khi có thể
// npm install @types/jquery
// import $ from "jquery";

// ✅ Dùng @types packages với TypeScript
// tsconfig.json
{
  "compilerOptions": {
    "types": ["node", "jquery"]
  }
}

// ✅ Dùng @types packages với scoped packages
// npm install @types/babel__core

// ✅ Dùng @types packages để extend definitions
// global.d.ts
declare module "express" {
  interface Request {
    customProperty: string;
  }
}

// ❌ Không nên dùng @types packages khi không cần
// ✅ Nên dùng type annotations khi không cần @types

// ✅ Dùng @types packages cho community maintained definitions
// npm install @types/jquery
```

---

## Writing declaration files?

**Writing declaration files** - Tạo .d.ts files cho JavaScript libraries.

### Mục đích / Purpose

Tạo .d.ts files cho JavaScript libraries.

### Khi nào dùng / When to Use

| Tình huống         | Khi nào dùng                    |
| ------------------ | ------------------------------- |
| - Custom libraries | Khi xây dựng custom libraries   |
| - Missing types    | Khi library không có types      |
| - Fix definitions  | Khi fix type definitions        |
| - Internal code    | Khi cần types cho internal code |
| - Documentation    | Khi document library API        |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: TypeScript kiểm tra types
- **IntelliSense**: IntelliSense hoạt động
- **Documentation**: Type definitions là documentation
- **Better DX**: Developer experience tốt hơn
- **Community**: Chia sẻ với community

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm                    |
| --------------- | ----------------------------- |
| - Type safety   | Cần maintain type definitions |
| - IntelliSense  | Có thể phức tạp               |
| - Documentation | Learning curve                |
| - Better DX     | Debugging khó hơn             |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Writing declaration file
// my-library.d.ts
declare namespace MyLibrary {
  function greet(name: string): void;
  const version: string;
}

// Ví dụ: Declaration file với interfaces
// my-library.d.ts
declare namespace MyLibrary {
  interface User {
    id: number;
    name: string;
    email: string;
  }

  interface Product {
    id: number;
    name: string;
    price: number;
  }
}

// Ví dụ: Declaration file với classes
// my-library.d.ts
declare namespace MyLibrary {
  class Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
  }
}

// Ví dụ: Declaration file với overloads
// my-library.d.ts
declare namespace MyLibrary {
  function process(value: string): string;
  function process(value: number): number;
  function process(value: boolean): boolean;
}

// Ví dụ thực tế: Writing declaration file for library
// my-library.d.ts
declare namespace MyLibrary {
  interface Options {
    debug?: boolean;
    timeout?: number;
  }

  function init(options?: Options): void;
  function getData(): Promise<Data>;
  function setData(data: Data): void;
}

// Ví dụ thực tế: Writing declaration file with generics
// my-library.d.ts
declare namespace MyLibrary {
  interface Result<T> {
    data: T;
    error: string | null;
  }

  function fetch<T>(url: string): Promise<Result<T>>;
}

// Ví dụ thực tế: Writing declaration file with callback types
// my-library.d.ts
declare namespace MyLibrary {
  type AsyncCallback<T> = (error: Error | null, data: T) => void;

  function getData(callback: AsyncCallback<User>): void;
  function setData(data: User, callback: AsyncCallback<void>): void;
}
```

### Best Practices:

```typescript
// ✅ Dùng namespaces để organize declarations
// my-library.d.ts
declare namespace MyLibrary {
  interface User {
    /* ... */
  }
  function greet(name: string): void;
}

// ✅ Dùng interfaces cho complex types
// my-library.d.ts
declare namespace MyLibrary {
  interface Options {
    debug?: boolean;
    timeout?: number;
  }
}

// ✅ Dùng type aliases cho reusable types
// my-library.d.ts
declare namespace MyLibrary {
  type AsyncCallback<T> = (error: Error | null, data: T) => void;
}

// ✅ Dùng overloads cho functions với multiple signatures
// my-library.d.ts
declare namespace MyLibrary {
  function process(value: string): string;
  function process(value: number): number;
  function process(value: boolean): boolean;
}

// ✅ Dùng generics cho flexible types
// my-library.d.ts
declare namespace MyLibrary {
  interface Result<T> {
    data: T;
    error: string | null;
  }

  function fetch<T>(url: string): Promise<Result<T>>;
}

// ❌ Không nên dùng declare cho TypeScript code
// ✅ Nên dùng .ts files cho TypeScript code

// ✅ Dùng ambient modules cho module libraries
// my-library.d.ts
declare module "my-library" {
  export function greet(name: string): void;
}
```

---

## `moduleResolution`?

**`moduleResolution`** - Compiler option để xác định cách TypeScript resolve module imports.

### Mục đích / Purpose

Xác định cách TypeScript resolve module imports.

### Khi nào dùng / When to Use

| Tình huống              | Khi nào dùng                       |
| ----------------------- | ---------------------------------- |
| - Module resolution     | Khi cần cấu hình module resolution |
| - Custom paths          | Khi dùng custom path mappings      |
| - Node.js projects      | Khi làm việc với Node.js           |
| - Bundler configuration | Khi dùng webpack/vite              |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Flexible Resolution**: Cấu hình module resolution
- **Custom Paths**: Dùng custom path mappings
- **Better DX**: Import paths ngắn gọn hơn
- **Multiple Resolutions**: Hỗ trợ nhiều resolution strategies
- **Bundler Integration**: Tích hợp với bundlers

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm          |
| ---------------------- | ------------------- |
| - Flexible resolution  | Có thể phức tạp     |
| - Custom paths         | Cần maintain config |
| - Better DX            | Learning curve      |
| - Multiple resolutions | Debugging khó hơn   |

### Ví dụ:

```typescript
// Ví dụ cơ bản: moduleResolution trong tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}

// Ví dụ: moduleResolution với classic
{
  "compilerOptions": {
    "moduleResolution": "classic"
  }
}

// Ví dụ: moduleResolution với node16
{
  "compilerOptions": {
    "moduleResolution": "node16"
  }
}

// Ví dụ: moduleResolution với baseUrl và paths
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["/*"],
      "@components/*": ["components/*"],
      "@utils/*": ["utils/*"],
    }
  }
}

// Sử dụng
import { Button } from "@components/Button"; // ✅ Import ngắn gọn
import { formatDate } from "@utils/date"; // ✅ Import ngắn gọn

// Ví dụ thực tế: Custom paths cho monorepo
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@packages/ui/*": ["packages/ui/src/*"],
      "@packages/utils/*": ["packages/utils/src/*"],
    }
  }
}

// Sử dụng
import { Button } from "@packages/ui/Button"; // ✅ Import ngắn gọn
import { formatDate } from "@packages/utils/date"; // ✅ Import ngắn gọn

// Ví dụ thực tế: moduleResolution với Node.js
{
  "compilerOptions": {
    "moduleResolution": "node",
    "module": "commonjs",
    "target": "es2015"
  }
}

// Ví dụ thực tế: moduleResolution với bundler
{
  "compilerOptions": {
    "moduleResolution": "node",
    "module": "esnext",
    "target": "esnext"
  }
}
```

### Best Practices:

```typescript
// ✅ Dùng moduleResolution: node cho Node.js projects
{
  "compilerOptions": {
    "moduleResolution": "node",
    "module": "commonjs"
  }
}

// ✅ Dùng moduleResolution: node16 cho modern Node.js projects
{
  "compilerOptions": {
    "moduleResolution": "node16",
    "module": "esnext"
  }
}

// ✅ Dùng baseUrl và paths cho custom imports
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["/*"],
      "@components/*": ["components/*"],
    }
  }
}

// ✅ Dùng moduleResolution với bundler configuration
{
  "compilerOptions": {
    "moduleResolution": "node",
    "module": "esnext",
    "target": "esnext"
  }
}

// ❌ Không nên dùng moduleResolution: classic cho modern projects
// ✅ Nên dùng node hoặc node16 cho modern projects

// ✅ Dùng moduleResolution với paths để tổ chức imports
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@lib/*": ["lib/*"],
    }
  }
}
```

---

## Tổng kết

### Bảng so sánh Declaration Files Features

| Feature            | Mô tả                                 | Use Case                    |
| ------------------ | ------------------------------------- | --------------------------- |
| `.d.ts` files      | Files chứa type definitions           | JavaScript libraries        |
| `declare` keyword  | Khai báo types cho JS code            | Global variables, functions |
| Ambient modules    | Module type definitions               | JavaScript modules          |
| `@types` packages  | NPM packages với types                | Popular libraries           |
| `moduleResolution` | Compiler option cho module resolution | Cấu hình imports            |

### Khi nào nên dùng Declaration Files

| Tình huống           | Nên dùng             |
| -------------------- | -------------------- |
| JavaScript libraries | ✅ `.d.ts` files     |
| Popular libraries    | ✅ `@types` packages |
| Custom libraries     | ✅ `.d.ts` files     |
| TypeScript code      | ❌ `.ts` files       |
| Module libraries     | ✅ Ambient modules   |

### Best Practices chung cho Declaration Files

1. **Dùng @types packages khi có thể**: Ưu tiên @types packages
2. **Viết .d.ts files khi cần thiết**: Tạo .d.ts cho custom libraries
3. **Dùng namespaces để organize**: Organize declarations trong namespaces
4. **Dùng interfaces cho complex types**: Interfaces cho complex types
5. **Cấu hình moduleResolution đúng**: Cấu hình moduleResolution cho project

### Anti-patterns cần tránh

```typescript
// ❌ Dùng declare cho TypeScript code
declare class MyClass {
  // ...
}

// ✅ Nên dùng .ts files cho TypeScript code
class MyClass {
  // ...
}

// ❌ Dùng .d.ts files khi @types có sẵn
// my-library.d.ts
declare namespace MyLibrary {
  // ...
}

// ✅ Nên dùng @types packages
// npm install @types/my-library

// ❌ Dùng declare với wrong types
declare function greet(name: number): void; // ❌ Wrong type

// ✅ Nên dùng đúng types
declare function greet(name: string): void; // ✅ Correct type

// ❌ Không nên dùng moduleResolution: classic cho modern projects
{
  "compilerOptions": {
    "moduleResolution": "classic" // ❌
  }
}

// ✅ Nên dùng node hoặc node16
{
  "compilerOptions": {
    "moduleResolution": "node16" // ✅
  }
}
```

---

## Tài liệu tham khảo / References

- [TypeScript Handbook - Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [TypeScript Handbook - Writing Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/intro.html)
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
- [TypeScript - moduleResolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)

---

_Last updated: 2026-01-30_
