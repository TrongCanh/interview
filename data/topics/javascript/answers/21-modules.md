# 21. Modules / Modules

## Tổng quan về Modules

### Mục đích của Modules / Purpose

**JavaScript Modules** là một cơ chế để tổ chức code thành các file riêng biệt, cho phép export và import các functions, objects, hoặc primitives giữa các files.

**Mục đích chính:**

- Tách biệt code thành các modules có trách nhiệm riêng
- Tái sử dụng code giữa các files/projects
- Tránh global namespace pollution
- Quản lý dependencies rõ ràng
- Hỗ trợ tree-shaking (loại bỏ code không dùng)

### Khi nào nên dùng / When to Use

**Nên dùng modules khi:**

- Phát triển ứng dụng lớn với nhiều files
- Cần chia nhỏ code thành các phần có trách nhiệm riêng
- Muốn tái sử dụng code giữa các projects
- Cần quản lý dependencies rõ ràng
- Làm việc với modern JavaScript frameworks (React, Vue, Angular)

### Giúp ích gì / Benefits

**Lợi ích:**

- **Encapsulation**: Giữ code private trong module
- **Reusability**: Dễ dàng tái sử dụng code
- **Maintainability**: Code dễ bảo trì và debug
- **Tree-shaking**: Loại bỏ code không dùng trong build process
- **Explicit dependencies**: Dependencies được khai báo rõ ràng
- **Namespace isolation**: Tránh conflicts với global scope

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm          | Giải thích                                 |
| ---------------- | ------------------------------------------ |
| Encapsulation    | Code được đóng gói, tránh global pollution |
| Reusability      | Dễ dàng tái sử dụng giữa các projects      |
| Explicit imports | Dependencies được khai báo rõ ràng         |
| Tree-shaking     | Loại bỏ code không dùng, giảm bundle size  |
| Async loading    | Modules có thể được load async             |
| Static analysis  | Dễ dàng phân tích code statically          |

**Nhược điểm (Cons):**

| Nhược điểm      | Giải thích                                   |
| --------------- | -------------------------------------------- |
| Browser support | Cần polyfill hoặc bundler cho older browsers |
| Complexity      | Thêm một lớp abstraction                     |
| Build step      | Cần build tools (Webpack, Vite, etc.)        |
| Learning curve  | Cần hiểu về import/export syntax             |

---

## ES Modules vs CommonJS?

**ES Modules (ESM)** và **CommonJS** là hai hệ thống module khác nhau:

| Đặc điểm     | ES Modules (ESM)  | CommonJS                     |
| ------------ | ----------------- | ---------------------------- |
| Syntax       | `import`/`export` | `require()`/`module.exports` |
| Loading      | Async, static     | Sync                         |
| Tree-shaking | Supported         | Limited                      |
| Environment  | Browser & Node.js | Node.js                      |
| Hoisting     | Yes               | No                           |

### Ví dụ:

```javascript
// ES Modules (ESM)
// utils.js
export const add = (a, b) => a + b;
export default function multiply(a, b) {
  return a * b;
}

// main.js
import multiply, { add } from "./utils.js";

// CommonJS
// utils.js
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
module.exports = { add, multiply };

// main.js
const { add, multiply } = require("./utils");
```

---

## `import`, `export`?

**`import`** và **`export`** là cú pháp của ES Modules để import và export code giữa các modules.

### Mục đích / Purpose

- Import code từ các modules khác
- Export code để sử dụng ở các modules khác
- Tạo public API cho module

### Khi nào dùng / When to Use

- Khi cần sử dụng code từ một module khác
- Khi muốn chia sẻ code với các modules khác

### Ví dụ:

```javascript
// Named exports
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const PI = 3.14159;

// Named imports
import { add, subtract, PI } from './math.js';

// Import với alias
import { add as sum, subtract as diff } from './math.js';

// Import tất cả named exports
import * as math from './math.js';
console.log(math.add(1, 2));

// Default export
// calculator.js
export default class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
}

// Default import
import Calculator from './calculator.js';
const calc = new Calculator();

// Mixed exports
// utils.js
export const helper = () => {};
export default function main() {}

// Mixed imports
import main, { helper } from './utils.js';

// Side-effect import (chạy module, không import gì)
import './styles.css';
```

### Best Practices:

```javascript
// ✅ Dùng named exports cho utilities
export const formatDate = (date) => {};
export const parseDate = (str) => {};

// ✅ Dùng default export cho main component/class
export default class UserService {}

// ✅ Group imports ở đầu file
import React from "react";
import { useState, useEffect } from "react";
import { formatDate } from "./utils";
import UserService from "./services/UserService";

// ✅ Sử dụng alias khi tên bị conflict
import { formatDate as formatJsDate } from "./date-utils";
import { formatDate as formatMomentDate } from "./moment-utils";

// ❌ Tránh export default với named exports trong cùng file
// export default function main() {}
// export const helper = () => {}
```

---

## Default exports vs named exports?

**Default exports** và **Named exports** là hai cách để export từ module.

### Sự khác biệt:

| Đặc điểm    | Default Export                 | Named Export |
| ----------- | ------------------------------ | ------------ |
| Số lượng    | 1 per module                   | Unlimited    |
| Import      | Không cần `{}`                 | Cần `{}`     |
| Naming      | Tên do người import quyết định | Tên cố định  |
| IDE support | Ít rõ ràng hơn                 | Rõ ràng hơn  |

### Ví dụ:

```javascript
// Default export
// Button.js
export default function Button({ children }) {
  return <button>{children}</button>;
}

// Import default export
import Button from './Button';
import MyButton from './Button'; // Có thể đặt tên khác

// Named exports
// utils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// Import named exports
import { add, subtract } from './utils';
import { add as sum } from './utils'; // Alias

// Mixed
// module.js
export default function main() {}
export const helper = () => {};

// Import mixed
import main, { helper } from './module';
```

### Best Practices:

```javascript
// ✅ Dùng default export cho: components, classes, main functions
export default function Button({ children }) {}
export default class UserService {}

// ✅ Dùng named exports cho: utilities, constants, helper functions
export const API_URL = 'https://api.example.com';
export const formatDate = (date) => {};
export const parseDate = (str) => {};

// ✅ Dùng named exports khi export nhiều items liên quan
export const RED = '#ff0000';
export const GREEN = '#00ff00';
export const BLUE = '#0000ff';

// ❌ Tránh default export cho utilities
// export default {
//   add,
//   subtract,
//   multiply
// }
```

---

## Re-exports?

**Re-exports** cho phép export lại code từ một module khác.

### Mục đích / Purpose

- Tạo barrel files (index files) để tổ chức imports
- Export lại các modules từ thư mục
- Tạo public API rõ ràng cho package

### Khi nào dùng / When to Use

- Khi muốn tổ chức imports từ nhiều files
- Khi muốn tạo index file cho thư mục
- Khi muốn re-export từ third-party packages

### Ví dụ:

```javascript
// Re-export named exports
// utils/index.js
export { add, subtract } from "./math.js";
export { formatDate, parseDate } from "./date.js";

// Re-export default export
// components/index.js
export { default as Button } from "./Button.js";
export { default as Input } from "./Input.js";
export { default as Select } from "./Select.js";

// Re-export tất cả
// utils/index.js
export * from "./math.js";
export * from "./date.js";

// Re-export default export với tên mới
export { default as Calculator } from "./Calculator.js";

// Sử dụng
import { add, formatDate } from "./utils";
import { Button, Input } from "./components";
```

### Best Practices:

```javascript
// ✅ Dùng re-exports để tạo barrel files
// components/index.js
export { default as Button } from "./Button";
export { default as Input } from "./Input";
export { default as Select } from "./Select";

// ✅ Import từ barrel file thay vì từng file
import { Button, Input } from "./components";

// ❌ Tránh re-export tất cả từ nhiều files (có thể gây conflicts)
// export * from './math';
// export * from './date';

// ✅ Dùng named re-exports để tránh conflicts
export { add as mathAdd } from "./math";
export { add as dateAdd } from "./date";
```

---

## Dynamic imports (`import()`)?

**Dynamic imports** cho phép load modules động tại runtime, trả về một Promise.

### Mục đích / Purpose

- Code splitting - chia code thành các chunks
- Lazy loading - load code khi cần
- Conditional loading - load module dựa trên điều kiện
- Improve initial load performance

### Khi nào dùng / When to Use

- Khi muốn load module chỉ khi cần
- Khi muốn giảm initial bundle size
- Khi có conditional module loading
- Khi làm việc với route-based code splitting

### Ví dụ:

```javascript
// Dynamic import
const module = await import("./math.js");
console.log(module.add(1, 2));

// Dynamic import với named exports
const { add, subtract } = await import("./math.js");

// Dynamic import với default export
const Calculator = (await import("./Calculator.js")).default;
const calc = new Calculator();

// Conditional import
if (process.env.NODE_ENV === "development") {
  const devTools = await import("./dev-tools.js");
  devTools.init();
}

// Lazy loading component (React)
const LazyComponent = React.lazy(() => import("./HeavyComponent"));

// Dynamic import trong function
async function loadModule(moduleName) {
  const module = await import(`./modules/${moduleName}.js`);
  return module.default;
}

// Error handling với dynamic import
try {
  const module = await import("./non-existent.js");
} catch (error) {
  console.error("Module not found:", error);
}

// Dynamic import với multiple modules
const [math, date] = await Promise.all([
  import("./math.js"),
  import("./date.js"),
]);
```

### Best Practices:

```javascript
// ✅ Dùng dynamic import cho code splitting
const LazyComponent = React.lazy(() => import("./HeavyComponent"));

// ✅ Dùng try/catch với dynamic import
try {
  const module = await import("./module.js");
} catch (error) {
  console.error("Failed to load module:", error);
}

// ✅ Dùng dynamic import cho conditional loading
if (shouldLoadFeature) {
  const feature = await import("./feature.js");
}

// ❌ Tránh dynamic import cho critical path code
// Sử dụng static import thay thế
import { criticalFunction } from "./critical.js";
```

---

## Module namespace?

**Module namespace** là object chứa tất cả exports từ một module khi dùng `import * as`.

### Mục đích / Purpose

- Import tất cả exports từ một module
- Tạo namespace để tránh naming conflicts
- Dùng khi cần nhiều exports từ cùng module

### Khi nào dùng / When to Use

- Khi cần nhiều exports từ một module
- Khi muốn tạo namespace rõ ràng
- Khi muốn tránh naming conflicts

### Ví dụ:

```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => a / b;

// Import namespace
import * as math from "./math.js";

console.log(math.add(1, 2));
console.log(math.subtract(5, 3));
console.log(math.multiply(2, 4));
console.log(math.divide(10, 2));

// Namespace với default export
// module.js
export default function main() {}
export const helper = () => {};

import * as module from "./module.js";
console.log(module.default); // Default export
console.log(module.helper); // Named export
```

### Best Practices:

```javascript
// ✅ Dùng namespace khi cần nhiều exports
import * as math from "./math.js";

// ✅ Dùng namespace để tránh conflicts
import * as dateUtils from "./date-utils.js";
import * as stringUtils from "./string-utils.js";

// ❌ Tránh namespace khi chỉ cần 1-2 exports
// Dùng named imports thay thế
import { add, subtract } from "./math.js";
```

---

## `import.meta`?

**`import.meta`** là một object chứa metadata về module hiện tại.

### Mục đích / Purpose

- Lấy URL của module hiện tại
- Lấy thông tin về module
- Dùng trong build tools và bundlers

### Khi nào dùng / When to Use

- Khi cần URL của module hiện tại
- Khi làm việc với relative paths
- Khi cần thông tin module metadata

### Ví dụ:

```javascript
// Lấy URL của module hiện tại
console.log(import.meta.url);
// file:///path/to/module.js

// Lấy base URL
const baseUrl = new URL(".", import.meta.url);

// Load resources relative to module
const response = await fetch(new URL("./data.json", import.meta.url));

// Check environment (được set bởi bundler)
if (import.meta.env?.PROD) {
  console.log("Production mode");
}

// Hot Module Replacement (Vite)
if (import.meta.hot) {
  import.meta.hot.accept();
}

// Sử dụng import.meta để resolve paths
const workerUrl = new URL("./worker.js", import.meta.url);
const worker = new Worker(workerUrl);
```

---

## Use Cases & Patterns

### Common Module Patterns:

```javascript
// 1. Barrel pattern (index.js)
// components/index.js
export { default as Button } from "./Button";
export { default as Input } from "./Input";
export { default as Select } from "./Select";

// 2. Singleton pattern
// singleton.js
let instance = null;

export default class Singleton {
  constructor() {
    if (instance) return instance;
    instance = this;
  }
}

// 3. Utility module
// utils.js
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const truncate = (str, length) => str.slice(0, length) + "...";

// 4. API module
// api.js
const BASE_URL = "https://api.example.com";

export async function fetchUser(id) {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  return response.json();
}

// 5. Constants module
// constants.js
export const API_URL = "https://api.example.com";
export const MAX_RETRIES = 3;
export const TIMEOUT = 5000;

// 6. Type checking module
// types.js
export const isString = (value) => typeof value === "string";
export const isNumber = (value) => typeof value === "number";
export const isArray = Array.isArray;

// 7. Lazy loading
const loadFeature = async () => {
  const feature = await import("./heavy-feature.js");
  return feature.default;
};
```

---

## Anti-patterns cần tránh

```javascript
// ❌ Circular dependencies
// a.js
import { b } from "./b.js";
export const a = 1;

// b.js
import { a } from "./a.js";
export const b = 2;

// ❌ Default export với object (thường nên dùng named exports)
// utils.js
export default {
  add,
  subtract,
  multiply,
};

// ✅ Nên dùng named exports
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// ❌ Import tất cả khi chỉ cần một vài exports
import * as utils from "./utils.js";
console.log(utils.add(1, 2));

// ✅ Nên import named
import { add } from "./utils.js";
console.log(add(1, 2));

// ❌ Side effects trong import
// utils.js
console.log("Module loaded!"); // Side effect

// ✅ Tách side effects ra
// utils.js
export const init = () => console.log("Module initialized!");
```

---

_References: [MDN JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), [ES Modules in Depth](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)_
