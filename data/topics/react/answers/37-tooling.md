# 37. Tooling / Công cụ phát triển

> Câu trả lời chi tiết về Tooling / Detailed answers about Tooling

---

## Create React App vs Vite vs Next.js / CRA vs Vite vs Next.js

### Create React App (CRA)

**Create React App** là official tooling từ React team để tạo React applications.

**Create React App** is the official tooling from React team to create React applications.

```bash
# Tạo project với CRA
npx create-react-app my-app

# Hoặc với template
npx create-react-app my-app --template typescript
```

**Ưu điểm / Pros:**

- Zero config
- Built-in testing setup
- Official support

**Nhược điểm / Cons:**

- Chậm hơn (Webpack)
- Harder config
- Ejecting phức tạp

### Vite

**Vite** là một build tool nhanh với native ESM support, được thiết kế để thay thế CRA.

**Vite** is a fast build tool with native ESM support, designed to replace CRA.

```bash
# Tạo project với Vite
npm create vite@latest my-app -- --template react
# Hoặc với TypeScript
npm create vite@latest my-app -- --template react-ts
```

**Ưu điểm / Pros:**

- Rất nhanh (HMR)
- Native ESM support
- Easy config
- Better DX

**Nhược điểm / Cons:**

- Mới hơn CRA
- Cần thêm config cho một số features

### Next.js

**Next.js** là một React framework với SSR, SSG, ISR, và nhiều features khác.

**Next.js** is a React framework with SSR, SSG, ISR, and many other features.

```bash
# Tạo project với Next.js
npx create-next-app@latest my-app
# Hoặc với TypeScript
npx create-next-app@latest my-app --typescript
```

**Ưu điểm / Pros:**

- SSR/SSG/ISR support
- File-based routing
- API routes
- Image optimization
- Built-in optimizations

**Nhược điểm / Cons:**

- Học curve cao hơn
- More opinionated

### Comparison Table / Bảng so sánh

| Đặc điểm / Feature | CRA        | Vite      | Next.js  |
| ------------------ | ---------- | --------- | -------- |
| **Build Speed**    | Trung bình | Rất nhanh | Nhanh    |
| **HMR Speed**      | Chậm       | Rất nhanh | Nhanh    |
| **SSR Support**    | Không      | Không     | Có       |
| **Config**         | Hard       | Easy      | Moderate |
| **DX**             | Trung bình | Tốt       | Tốt      |

---

## ESLint Configuration for React / Cấu hình ESLint cho React

### Cài đặt ESLint

```bash
# Cài đặt ESLint cho React
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import
```

### ESLint Config

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier", // Nếu dùng Prettier
  ],
  rules: {
    // Custom rules
    "react/react-in-jsx-scope": "error",
    "react/prop-types": "off", // Nếu dùng TypeScript
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          ["internal", "parent", "sibling"],
          "index",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
    },
  },
};
```

### ESLint với Flat Config

```javascript
// eslint.config.js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
  ...FlatCompat({
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
    ],
    plugins: ["react", "react-hooks"],
    rules: {
      "react/react-in-jsx-scope": "error",
    },
  }),
];
```

---

## Prettier Setup / Thiết lập Prettier

### Cài đặt Prettier

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

### Prettier Config

```javascript
// .prettierrc.js
module.exports = {
  semi: true,
  trailingComma: "es5",
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  arrowParens: "always",
  endOfLine: "lf",
  bracketSpacing: true,
  jsxSingleQuote: false,
  jsxBracketSameLine: false,
};
```

### Prettier với ESLint

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended", // Thêm Prettier config
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: "es5",
      },
    ],
  },
};
```

---

## TypeScript with React / TypeScript với React

### Cài đặt TypeScript với React

```bash
# Tạo React app với TypeScript
npx create-react-app my-app --template typescript

# Hoặc với Vite
npm create vite@latest my-app -- --template react-ts

# Hoặc với Next.js
npx create-next-app@latest my-app --typescript
```

### TypeScript Config cho React

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noEmit": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "build"]
}
```

### TypeScript với Props

```typescript
// Props interface
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

function Button({ children, onClick, variant = 'primary', disabled }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// Generic component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}
```

---

## Bundlers (Webpack, Vite, esbuild) / Bundlers

### Webpack

**Webpack** là một powerful module bundler với nhiều plugins và config options.

**Webpack** is a powerful module bundler with many plugins and config options.

```javascript
// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: "style-loader",
        use: "css-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3000,
    hot: true,
  },
};
```

### Vite Config

```javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
});
```

### esbuild Config

```javascript
// esbuild.config.js
import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/index.tsx"],
    bundle: true,
    outfile: "dist/bundle.js",
    minify: true,
    sourcemap: true,
    loader: {
      ".tsx": "tsx",
    },
    define: {
      "process.env.NODE_ENV": '"production"',
    },
  })
  .catch(() => process.exit(1));
```

### Bundler Comparison / So sánh Bundlers

| Đặc điểm / Feature    | Webpack | Vite       | esbuild   |
| --------------------- | ------- | ---------- | --------- |
| **Build Speed**       | Chậm    | Nhanh      | Rất nhanh |
| **Config Complexity** | Cao     | Thấp       | Thấp      |
| **Plugin Ecosystem**  | Lớn     | Trung bình | Nhỏ       |
| **Production Ready**  | Có      | Có         | Có        |
| **HMR**               | Chậm    | Nhanh      | Không     |

---

## Tóm tắt / Summary

| Công cụ / Tool | Mục đích / Purpose            |
| -------------- | ----------------------------- |
| **CRA**        | Official React scaffolding    |
| **Vite**       | Fast dev server và build tool |
| **Next.js**    | Full-stack React framework    |
| **ESLint**     | Linting và code quality       |
| **Prettier**   | Code formatting               |
| **TypeScript** | Static typing                 |
| **Webpack**    | Module bundling               |
| **esbuild**    | Fast JavaScript bundler       |

---

## Best Practices / Thực hành tốt nhất

### 1. Sử dụng Vite cho new projects

```bash
# ✅ Good - Sử dụng Vite
npm create vite@latest my-app -- --template react-ts
```

### 2. Config ESLint với Prettier

```javascript
// ✅ Good - ESLint với Prettier
module.exports = {
  extends: ["plugin:prettier/recommended"],
};
```

### 3. TypeScript cho type safety

```typescript
// ✅ Good - TypeScript interfaces
interface Props {
  title: string;
  onClick?: () => void;
}

function Component({ title, onClick }: Props) {
  return <button onClick={onClick}>{title}</button>;
}
```

---

_Updated: 2026-01-30_
