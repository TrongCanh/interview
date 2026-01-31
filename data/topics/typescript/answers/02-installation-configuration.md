# 2. Installation & Configuration

## Tổng quan về Installation & Configuration

### Mục đích của Installation & Configuration / Purpose

**Installation & Configuration** là quá trình cài đặt TypeScript và cấu hình `tsconfig.json` để TypeScript compiler hoạt động đúng theo nhu cầu dự án.

**Mục đích chính:**

- Cài đặt TypeScript compiler và tools
- Cấu hình TypeScript theo yêu cầu dự án
- Optimize build performance
- Enable/disable các tính năng TypeScript
- Configure target environments

### Khi nào cần hiểu về Installation & Configuration / When to Use

Hiểu về Installation & Configuration là cần thiết khi:

- Bắt đầu một dự án TypeScript mới
- Migrate từ JavaScript sang TypeScript
- Configure TypeScript cho các môi trường khác nhau (Node.js, Browser, etc.)
- Optimize build performance
- Debug các lỗi compile

### Giúp ích gì / Benefits

**Lợi ích:**

- **Correct setup**: Đảm bảo TypeScript được cấu hình đúng
- **Better performance**: Optimize build và type checking
- **Type safety**: Enable/disable strict mode và các tính năng khác
- **Cross-platform support**: Compile xuống các phiên bản JS khác nhau
- **Team consistency**: Đảm bảo toàn team dùng cùng cấu hình

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                  | Nhược điểm                            |
| ------------------------ | ------------------------------------- |
| Flexible configuration   | Nhiều options có thể overwhelming     |
| Performance optimization | Cần thời gian để hiểu và configure    |
| Cross-platform support   | Configuration errors có thể khó debug |
| Team consistency         | Cần maintain config files             |

---

## Cách cài đặt TypeScript?

**TypeScript Installation** - Cài đặt TypeScript compiler và tools thông qua npm, yarn, hoặc pnpm.

### Mục đích / Purpose

Cài đặt TypeScript để:

- Biên dịch TypeScript code thành JavaScript
- Sử dụng TypeScript compiler (tsc)
- Có TypeScript language server cho IDE
- Sử dụng các TypeScript tools khác

### Khi nào dùng / When to Use

| Tình huống    | Cách cài đặt                               |
| ------------- | ------------------------------------------ |
| Local project | `npm install --save-dev typescript`        |
| Global usage  | `npm install -g typescript`                |
| Monorepo      | `npm install -w <workspace> -D typescript` |
| CI/CD         | Cài đặt trong build process                |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Easy installation**: Cài đặt đơn giản qua npm
- **Version control**: Lock version trong package.json
- **Multiple versions**: Có thể có nhiều versions trong monorepo
- **Global vs local**: Lựa chọn cài đặt global hoặc local

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm        |
| ----------------- | ----------------- |
| Simple via npm    | Cần Node.js       |
| Version control   | Node_modules size |
| Multiple versions | Update management |
| Global available  | Version conflicts |

### Ví dụ:

```bash
# 1. Cài đặt TypeScript locally (recommended)
npm install --save-dev typescript

# 2. Cài đặt TypeScript globally
npm install -g typescript

# 3. Cài đặt TypeScript với yarn
yarn add --dev typescript

# 4. Cài đặt TypeScript với pnpm
pnpm add -D typescript

# 5. Kiểm tra version
npx tsc --version
# hoặc
tsc --version

# 6. Biên dịch file TypeScript
npx tsc index.ts

# 7. Biên dịch với watch mode
npx tsc --watch

# 8. Biên dịch với tsconfig.json
npx tsc
```

### package.json example:

```json
{
  "name": "my-typescript-project",
  "version": "1.0.0",
  "devDependencies": {
    "typescript": "^5.3.0"
  },
  "scripts": {
    "build": "tsc",
    "build:watch": "tsc --watch",
    "type-check": "tsc --noEmit"
  }
}
```

### Best Practices:

1. **Install locally**: Luôn cài đặt TypeScript locally thay vì globally
2. **Use npx**: Dùng `npx tsc` thay vì `tsc` global
3. **Lock version**: Lock TypeScript version trong package.json
4. **Use scripts**: Định nghĩa scripts trong package.json cho common commands
5. **Check version**: Luôn kiểm tra version trước khi cài đặt

### Anti-patterns cần tránh:

```bash
# ❌ Không nên: Cài đặt global TypeScript
npm install -g typescript

# ✅ Nên: Cài đặt local TypeScript
npm install --save-dev typescript

# ❌ Không nên: Dùng tsc global
tsc index.ts

# ✅ Nên: Dùng npx
npx tsc index.ts
```

---

## `tsconfig.json` là gì? Các cấu hình quan trọng?

**tsconfig.json** - File cấu hình cho TypeScript compiler, định nghĩa cách TypeScript được biên dịch.

### Mục đích / Purpose

`tsconfig.json` được dùng để:

- Configure TypeScript compiler options
- Define file inclusions/exclusions
- Set target JavaScript version
- Enable/disable TypeScript features
- Configure module system

### Khi nào dùng / When to Use

| Tình huống         | Khi nào dùng             |
| ------------------ | ------------------------ |
| TypeScript project | Luôn cần                 |
| Build process      | Khi compile TypeScript   |
| IDE configuration  | Khi cần IDE hiểu config  |
| CI/CD              | Khi build trong pipeline |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Centralized config**: Tất cả config trong một file
- **Team consistency**: Toàn team dùng cùng config
- **IDE support**: IDE đọc config để provide features
- **Build automation**: Config dùng trong build process
- **Type checking**: Configure strict mode và options

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm                        |
| ------------------ | --------------------------------- |
| Centralized config | Nhiều options có thể overwhelming |
| Team consistency   | Cần hiểu các options              |
| IDE integration    | Config errors có thể khó debug    |
| Flexible           | Over-configuration có thể xảy ra  |

### Ví dụ:

```json
{
  "compilerOptions": {
    // Target JavaScript version
    "target": "ES2020",

    // Module system
    "module": "ESNext",

    // Libraries to include
    "lib": ["ES2020", "DOM", "DOM.Iterable"],

    // Output directory
    "outDir": "./dist",

    // Root directory
    "rootDir": "./src",

    // Source maps for debugging
    "sourceMap": true,

    // Strict mode (enables all strict options)
    "strict": true,

    // Additional strict options
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,

    // Module resolution
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,

    // Declaration files
    "declaration": true,
    "declarationMap": true,

    // Incremental compilation
    "incremental": true,
    "tsBuildInfoFile": "./dist/.tsbuildinfo",

    // Other options
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    // JSX support (for React)
    "jsx": "react-jsx"
  },

  // Files to include
  "include": ["src/**/*"],

  // Files to exclude
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"],

  // References (for project references)
  "references": [{ "path": "./packages/shared" }, { "path": "./packages/app" }]
}
```

### Các cấu hình quan trọng:

| Option             | Mô tả                                    |
| ------------------ | ---------------------------------------- |
| `target`           | Phiên bản JavaScript để compile xuống    |
| `module`           | Hệ thống module (CommonJS, ESNext, etc.) |
| `lib`              | Các libraries có sẵn trong compilation   |
| `strict`           | Bật tất cả strict type checking options  |
| `outDir`           | Thư mục output cho compiled files        |
| `rootDir`          | Thư mục gốc cho source files             |
| `moduleResolution` | Chiến lược giải quyết module             |
| `esModuleInterop`  | Enable ES module interoperability        |
| `sourceMap`        | Generate source maps cho debugging       |
| `declaration`      | Generate .d.ts declaration files         |

### Best Practices:

1. **Use strict mode**: Luôn bật `strict: true`
2. **Source maps**: Bật `sourceMap: true` cho debugging
3. **Incremental compilation**: Dùng `incremental: true` để build nhanh hơn
4. **Exclude node_modules**: Luôn exclude node_modules
5. **Use extends**: Dùng `extends` để share config giữa projects

### Anti-patterns cần tránh:

```json
// ❌ Không nên: Không có strict mode
{
  "compilerOptions": {
    "strict": false
  }
}

// ✅ Nên: Bật strict mode
{
  "compilerOptions": {
    "strict": true
  }
}

// ❌ Không nên: Không exclude node_modules
{
  "exclude": []
}

// ✅ Nên: Exclude node_modules và dist
{
  "exclude": ["node_modules", "dist"]
}
```

---

## `target`, `module`, `lib` trong tsconfig?

**target, module, lib** - Các cấu hình quan trọng trong `tsconfig.json` để control cách TypeScript được biên dịch.

### Mục đích / Purpose

- **target**: Phiên bản JavaScript để compile xuống
- **module**: Hệ thống module được sử dụng
- **lib**: Các libraries có sẵn trong compilation

### Khi nào dùng / When to Use

| Option   | Khi nào dùng                                               |
| -------- | ---------------------------------------------------------- |
| `target` | Khi cần support các browsers/environments cũ hơn           |
| `module` | Khi dùng module systems khác nhau (CommonJS, ESNext, etc.) |
| `lib`    | Khi cần include/exclude các built-in libraries             |

### Giả ích gì / Benefits

**Lợi ích:**

- **Cross-platform support**: Compile xuống các versions khác nhau
- **Module flexibility**: Hỗ trợ nhiều module systems
- **Library control**: Control哪些 built-in APIs có sẵn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm          | Nhược điểm                     |
| ---------------- | ------------------------------ |
| Flexible targets | Cần hiểu các versions          |
| Module support   | Module conflicts có thể xảy ra |
| Library control  | Lib errors có thể xảy ra       |

### Ví dụ:

```json
{
  "compilerOptions": {
    // Target options
    "target": "ES2020", // ES3, ES5, ES6/ES2015, ES2016, ES2017, ES2018, ES2019, ES2020, ES2021, ES2022, ESNext

    // Module options
    "module": "ESNext", // CommonJS, AMD, System, UMD, ES6/ES2015, ES2020, ESNext, None

    // Lib options
    "lib": ["ES2020", "DOM", "DOM.Iterable", "WebWorker"]
  }
}
```

### Target options:

| Target           | Mô tả             | Use case                       |
| ---------------- | ----------------- | ------------------------------ |
| `ES3`            | JavaScript ES3    | Very old browsers (IE6-8)      |
| `ES5`            | JavaScript ES5    | Old browsers (IE9+)            |
| `ES6` / `ES2015` | JavaScript ES6    | Modern browsers with polyfills |
| `ES2020`         | JavaScript ES2020 | Modern browsers, Node.js 14+   |
| `ESNext`         | Latest JavaScript | Latest browsers/environments   |

### Module options:

| Module     | Mô tả                          | Use case                            |
| ---------- | ------------------------------ | ----------------------------------- |
| `CommonJS` | Node.js style modules          | Node.js applications                |
| `ESNext`   | ES modules                     | Modern browsers, bundlers           |
| `AMD`      | Asynchronous Module Definition | RequireJS                           |
| `UMD`      | Universal Module Definition    | Libraries for multiple environments |
| `System`   | SystemJS                       | SystemJS loader                     |

### Lib options:

| Lib                          | Mô tả                               |
| ---------------------------- | ----------------------------------- |
| `ES5`, `ES6`, `ES2015`, etc. | JavaScript features từ các versions |
| `DOM`                        | Browser DOM APIs                    |
| `DOM.Iterable`               | Iterable DOM APIs                   |
| `WebWorker`                  | Web Worker APIs                     |
| `ScriptHost`                 | Windows Script Host APIs            |
| `ESNext.AsyncIterable`       | Async iterable APIs                 |

### Best Practices:

1. **Target appropriate version**: Chọn target phù hợp với môi trường chạy
2. **Use ESNext for bundlers**: Dùng `module: "ESNext"` khi dùng bundlers
3. **Use CommonJS for Node.js**: Dùng `module: "CommonJS"` cho Node.js apps
4. **Specify lib explicitly**: Khai báo `lib` thay vì dùng default
5. **Match target and lib**: Đảm bảo `lib` tương thích với `target`

### Anti-patterns cần tránh:

```json
// ❌ Không nên: Target quá cũ khi không cần
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

// ❌ Không nên: Không khai báo lib
{
  "compilerOptions": {
    "lib": []
  }
}

// ✅ Nên: Khai báo lib rõ ràng
{
  "compilerOptions": {
    "lib": ["ES2020", "DOM"]
  }
}
```

---

## `strict` mode là gì? Tại sao nên dùng?

**Strict Mode** - Một tập hợp các type checking options được bật để đảm bảo type safety cao hơn.

### Mục đích / Purpose

Strict mode được dùng để:

- Enable tất cả strict type checking options
- Catch nhiều errors hơn tại compile time
- Force developer viết code an toàn hơn
- Tăng type safety của dự án

### Khi nào dùng / When to Use

| Tình huống        | Khi nào dùng              |
| ----------------- | ------------------------- |
| New projects      | Luôn nên dùng             |
| Migrating from JS | Bật dần dần               |
| Large codebases   | Có thể cần migration time |
| Team projects     | Nên dùng để consistency   |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Better type safety**: Catch nhiều errors hơn
- **Safer code**: Force developer viết code tốt hơn
- **Early error detection**: Tìm lỗi sớm hơn
- **Better DX**: IntelliSense tốt hơn với strict types

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm                       |
| ------------------ | -------------------------------- |
| Better type safety | Learning curve cao hơn           |
| Catch more errors  | Cần thời gian để fix errors      |
| Safer code         | Có thể verbose hơn               |
| Better DX          | Migration time cho existing code |

### Strict mode bao gồm các options:

```json
{
  "compilerOptions": {
    "strict": true, // Bật tất cả các options dưới đây

    // Các strict options:
    "noImplicitAny": true, // Error khi inferred type là any
    "strictNullChecks": true, // Strict null checking
    "strictFunctionTypes": true, // Strict function type checking
    "strictBindCallApply": true, // Strict bind, call, apply methods
    "strictPropertyInitialization": true, // Check class properties được initialized
    "noImplicitThis": true, // Error khi this có type any
    "alwaysStrict": true // Parse trong strict mode
  }
}
```

### Ví dụ:

```typescript
// noImplicitAny
// ❌ Error: Parameter 'x' implicitly has an 'any' type
function greet(x) {
  return `Hello, ${x}!`;
}

// ✅ OK với explicit type
function greet(x: string) {
  return `Hello, ${x}!`;
}

// strictNullChecks
// ❌ Error: Object is possibly 'null'
function getLength(str: string | null) {
  return str.length;
}

// ✅ OK với null check
function getLength(str: string | null) {
  return str ? str.length : 0;
}

// strictPropertyInitialization
// ❌ Error: Property 'name' has no initializer and is not definitely assigned
class User {
  name: string;
}

// ✅ OK với initializer hoặc trong constructor
class User {
  name: string = "";
  // hoặc
  constructor(name: string) {
    this.name = name;
  }
}

// noImplicitThis
// ❌ Error: 'this' implicitly has type 'any'
function handleClick() {
  console.log(this.value);
}

// ✅ OK với explicit this type
function handleClick(this: { value: string }) {
  console.log(this.value);
}
```

### Best Practices:

1. **Enable strict mode**: Luôn bật `strict: true` cho new projects
2. **Gradual migration**: Migrate existing code dần dần
3. **Fix errors systematically**: Fix errors theo priority
4. **Use type guards**: Dùng type guards để handle nullable types
5. **Document types**: Document types phức tạp

### Anti-patterns cần tránh:

```json
// ❌ Không nên: Tắt strict mode
{
  "compilerOptions": {
    "strict": false
  }
}

// ✅ Nên: Bật strict mode
{
  "compilerOptions": {
    "strict": true
  }
}

// ❌ Không nên: Dùng type assertion để bypass strict mode
const value = someValue as string;

// ✅ Nên: Dùng type guard
if (typeof someValue === 'string') {
  const value = someValue;
}
```

---

## `outDir`, `rootDir`, `include`, `exclude`?

**File Organization Options** - Các options để control file structure và compilation.

### Mục đích / Purpose

- **outDir**: Thư mục output cho compiled files
- **rootDir**: Thư mục gốc cho source files
- **include**: Files/patterns để include trong compilation
- **exclude**: Files/patterns để exclude khỏi compilation

### Khi nào dùng / When to Use

| Option    | Khi nào dùng                            |
| --------- | --------------------------------------- |
| `outDir`  | Khi muốn compiled files ở thư mục riêng |
| `rootDir` | Khi muốn cấu trúc output giống source   |
| `include` | Khi muốn chỉ định files để compile      |
| `exclude` | Khi muốn exclude files khỏi compilation |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Clean structure**: Giữ source và output riêng biệt
- **Selective compilation**: Chỉ compile files cần thiết
- **Performance**: Exclude không cần compile để tăng tốc
- **Consistent structure**: Giữ cấu trúc output nhất quán

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm                        |
| --------------------- | --------------------------------- |
| Clean structure       | Cần configure đúng                |
| Selective compilation | Config errors có thể xảy ra       |
| Better performance    | Cần hiểu patterns                 |
| Consistent output     | Có thể complex với large projects |

### Ví dụ:

```json
{
  "compilerOptions": {
    // Output directory
    "outDir": "./dist",

    // Root directory
    "rootDir": "./src",

    // Other options
    "declaration": true,
    "declarationDir": "./dist/types"
  },

  // Include patterns
  "include": ["src/**/*", "types/**/*"],

  // Exclude patterns
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.spec.ts",
    "**/*.stories.ts",
    "**/*.mock.ts"
  ]
}
```

### File structure example:

```
project/
├── src/
│   ├── index.ts
│   ├── utils/
│   │   └── helpers.ts
│   └── components/
│       └── Button.tsx
├── dist/
│   ├── index.js
│   ├── index.d.ts
│   ├── utils/
│   │   └── helpers.js
│   │   └── helpers.d.ts
│   └── components/
│       └── Button.js
│       └── Button.d.ts
├── tsconfig.json
└── package.json
```

### Include/Exclude patterns:

| Pattern        | Mô tả                                 |
| -------------- | ------------------------------------- |
| `**/*`         | Tất cả files trong tất cả directories |
| `src/**/*`     | Tất cả files trong src directory      |
| `**/*.ts`      | Tất cả .ts files                      |
| `**/*.test.ts` | Tất cả test files                     |
| `node_modules` | node_modules directory                |
| `dist`         | dist directory                        |

### Best Practices:

1. **Separate source and output**: Dùng `outDir` để tách source và output
2. **Use rootDir**: Dùng `rootDir` để giữ cấu trúc output nhất quán
3. **Exclude node_modules**: Luôn exclude node_modules
4. **Exclude test files**: Exclude test files khỏi production build
5. **Use glob patterns**: Dùng glob patterns để include/exclude files

### Anti-patterns cần tránh:

```json
// ❌ Không nên: Không exclude node_modules
{
  "exclude": []
}

// ✅ Nên: Exclude node_modules và dist
{
  "exclude": ["node_modules", "dist"]
}

// ❌ Không nên: Compile test files vào production
{
  "include": ["src/**/*", "**/*.test.ts"]
}

// ✅ Nên: Exclude test files
{
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

---

## Best Practices cho Installation & Configuration

### 1. Use Local Installation

Luôn cài đặt TypeScript locally thay vì globally:

```bash
# ✅ Nên
npm install --save-dev typescript

# ❌ Không nên
npm install -g typescript
```

### 2. Enable Strict Mode

Luôn bật `strict: true` trong `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### 3. Use Source Maps

Bật source maps cho debugging:

```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

### 4. Use Incremental Compilation

Dùng incremental compilation để build nhanh hơn:

```json
{
  "compilerOptions": {
    "incremental": true
  }
}
```

### 5. Exclude Unnecessary Files

Exclude node_modules và test files:

```json
{
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"]
}
```

### 6. Use Appropriate Target

Chọn target phù hợp với môi trường:

```json
{
  "compilerOptions": {
    "target": "ES2020"
  }
}
```

---

## Anti-patterns cần tránh

### 1. Global TypeScript Installation

```bash
# ❌ Không nên
npm install -g typescript

# ✅ Nên
npm install --save-dev typescript
```

### 2. Disabling Strict Mode

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

### 3. Not Excluding node_modules

```json
// ❌ Không nên
{
  "exclude": []
}

// ✅ Nên
{
  "exclude": ["node_modules", "dist"]
}
```

---

_References:_

- [TypeScript Compiler Options](https://www.typescriptlang.org/tsconfig)
- [TypeScript tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
