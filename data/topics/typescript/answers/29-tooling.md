# 29. Tooling

## Tổng quan về Tooling

### Mục đích của Tooling / Purpose

**Tooling** - Các công cụ hỗ trợ TypeScript development như TypeScript compiler, ESLint, Prettier, và build tools.

**Mục đích chính:**

- Compile TypeScript code
- Lint code để catch errors
- Format code để consistent
- Build production bundles
- Type-check code

### Khi nào cần hiểu về Tooling / When to Use

Hiểu về Tooling là cần thiết khi:

- Xây dựng TypeScript projects
- Cấu hình TypeScript compiler
- Setup linting và formatting
- Build production bundles
- Optimize build process

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile-time
- **Code Quality**: Lint và format code
- **Better DX**: Developer experience tốt hơn
- **Production Ready**: Build production bundles
- **Team Collaboration**: Code consistent

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm           |
| ------------------ | -------------------- |
| - Type safety      | Cần configure tools  |
| - Code quality     | Learning curve       |
| - Better DX        | Build time lâu hơn   |
| - Production ready | Cần maintain configs |

---

## tsconfig.json?

**tsconfig.json** - Configuration file cho TypeScript compiler.

### Mục đích / Purpose

Cấu hình TypeScript compiler options.

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                   |
| --------------------- | ------------------------------ |
| - TypeScript projects | Khi setup TypeScript projects  |
| - Compiler options    | Khi configure compiler options |
| - Path aliases        | Khi setup path aliases         |
| - Build targets       | Khi configure build targets    |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Compiler Options**: Configure TypeScript compiler
- **Path Aliases**: Setup path aliases
- **Build Targets**: Configure build targets
- **Type Checking**: Configure type checking options
- **Module Resolution**: Configure module resolution

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm          |
| ------------------ | ------------------- |
| - Compiler options | Learning curve      |
| - Path aliases     | Cần maintain config |
| - Build targets    | Có thể phức tạp     |
| - Type checking    | Debugging khó hơn   |

### Ví dụ:

```json
// Ví dụ cơ bản: tsconfig.json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "lib": ["es2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}

// Ví dụ: tsconfig.json với path aliases
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@components/*": ["./components/*"],
      "@utils/*": ["./utils/*"],
      "@types/*": ["./types/*"]
    }
  }
}

// Ví dụ: tsconfig.json với multiple targets
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "lib": ["es2020", "dom"]
  }
}

// Ví dụ thực tế: tsconfig.json cho Node.js project
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "lib": ["es2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}

// Ví dụ thực tế: tsconfig.json cho React project
{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "lib": ["es2020", "dom", "dom.iterable"],
    "jsx": "react",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}

// Ví dụ thực tế: tsconfig.json cho monorepo
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "lib": ["es2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@packages/ui/*": ["packages/ui/src/*"],
      "@packages/utils/*": ["packages/utils/src/*"],
      "@packages/types/*": ["packages/types/src/*"]
    },
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "references": [
    { "path": "./packages/ui" },
    { "path": "./packages/utils" },
    { "path": "./packages/types" }
  ],
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### Best Practices:

```json
// ✅ Dùng strict mode
{
  "compilerOptions": {
    "strict": true
  }
}

// ✅ Dùng path aliases
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@components/*": ["./components/*"]
    }
  }
}

// ✅ Dùng correct module resolution
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}

// ✅ Dùng esModuleInterop
{
  "compilerOptions": {
    "esModuleInterop": true
  }
}

// ❌ Không nên dùng noImplicitAny: false
{
  "compilerOptions": {
    "noImplicitAny": false // ❌ Avoid this
  }
}

// ✅ Nên dùng strict mode
{
  "compilerOptions": {
    "strict": true // ✅ Enables all strict checks
  }
}

// ✅ Dùng correct target cho environment
{
  "compilerOptions": {
    "target": "es2020" // ✅ For modern Node.js
  }
}

// ✅ Dùng correct module cho environment
{
  "compilerOptions": {
    "module": "commonjs" // ✅ For Node.js
  }
}
```

---

## ESLint với TypeScript?

**ESLint với TypeScript** - Lint TypeScript code với ESLint.

### Mục đích / Purpose

Lint TypeScript code để catch errors và enforce code style.

### Khi nào dùng / When to Use

| Tình huống           | Khi nào dùng                |
| -------------------- | --------------------------- |
| - Code quality       | Khi cần enforce code style  |
| - Catch errors       | Khi catch errors sớm hơn    |
| - Team collaboration | Khi enforce consistent code |
| - Pre-commit hooks   | Khi lint trước commit       |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Code Quality**: Enforce code style
- **Catch Errors**: Catch errors sớm hơn
- **Team Collaboration**: Enforce consistent code
- **Pre-commit Hooks**: Lint trước commit
- **Better DX**: Developer experience tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm              | Nhược điểm           |
| -------------------- | -------------------- |
| - Code quality       | Cần configure ESLint |
| - Catch errors       | Learning curve       |
| - Team collaboration | Có thể verbose       |
| - Pre-commit hooks   | Cần maintain config  |

### Ví dụ:

```javascript
// Ví dụ cơ bản: .eslintrc.js
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "warn",
  },
};

// Ví dụ: .eslintrc.js với React
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

// Ví dụ thực tế: .eslintrc.js với Prettier
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
  },
};

// Ví dụ thực tế: .eslintrc.js với overrides
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      files: ["*.test.ts", "*.spec.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
};

// Ví dụ thực tế: .eslintrc.js với custom rules
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    "@typescript-eslint/no-explicit-any": [
      "warn",
      {
        fixToUnknown: true,
      },
    ],
  },
};
```

### Best Practices:

```javascript
// ✅ Dùng @typescript-eslint/parser
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
};

// ✅ Dùng plugin:@typescript-eslint/recommended
module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
};

// ✅ Dùng plugin:@typescript-eslint/recommended-requiring-type-checking
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
};

// ✅ Dùng overrides cho test files
module.exports = {
  overrides: [
    {
      files: ["*.test.ts", "*.spec.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
};

// ❌ Không nên dùng @typescript-eslint/parser với wrong options
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json", // ✅ Correct
    // sourceType: "module", // ❌ Not needed with project
  },
};

// ✅ Nên dùng project option
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json", // ✅ Enables type-aware linting
  },
};

// ✅ Dùng Prettier với ESLint
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
  ],
};
```

---

## Prettier với TypeScript?

**Prettier với TypeScript** - Format TypeScript code với Prettier.

### Mục đích / Purpose

Format TypeScript code để consistent.

### Khi nào dùng / When to Use

| Tình huống           | Khi nào dùng                      |
| -------------------- | --------------------------------- |
| - Code formatting    | Khi cần consistent code style     |
| - Team collaboration | Khi enforce consistent formatting |
| - Pre-commit hooks   | Khi format trước commit           |
| - IDE integration    | Khi format on save                |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Consistent Code**: Code style consistent
- **Team Collaboration**: Enforce consistent formatting
- **Pre-commit Hooks**: Format trước commit
- **IDE Integration**: Format on save
- **Better DX**: Developer experience tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm              | Nhược điểm             |
| -------------------- | ---------------------- |
| - Consistent code    | Cần configure Prettier |
| - Team collaboration | Learning curve         |
| - Pre-commit hooks   | Cần maintain config    |
| - IDE integration    | Có thể override config |

### Ví dụ:

```json
// Ví dụ cơ bản: .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}

// Ví dụ: .prettierrc với TypeScript options
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "parser": "typescript"
}

// Ví dụ thực tế: .prettierrc với overrides
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "overrides": [
    {
      "files": ["*.json"],
      "options": {
        "tabWidth": 4
      }
    },
    {
      "files": ["*.md"],
      "options": {
        "proseWrap": "preserve"
      }
    }
  ]
}

// Ví dụ thực tế: .prettierrc với JSX options
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "jsxSingleQuote": false,
  "jsxBracketSameLine": false
}

// Ví dụ thực tế: .prettierignore
# dependencies
node_modules
package-lock.json
yarn.lock

# build
dist
build
*.min.js

# logs
*.log

# other
.env
.env.local
.env.*.local

# test coverage
coverage
.nyc_output

# IDE
.vscode
.idea
*.swp
*.swo
*~
.DS_Store
```

### Best Practices:

```json
// ✅ Dùng consistent formatting
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}

// ✅ Dùng .prettierignore
node_modules
dist
build
*.log
.env

// ✅ Dùng overrides cho different file types
{
  "overrides": [
    {
      "files": ["*.json"],
      "options": {
        "tabWidth": 4
      }
    }
  ]
}

// ✅ Dùng Prettier với ESLint
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
  ],
};

// ❌ Không nên dùng conflicting rules
module.exports = {
  rules: {
    "semi": ["error", "always"], // ❌ Conflicts with Prettier
  },
};

// ✅ Nên dùng Prettier for formatting
{
  "semi": true, // ✅ Prettier handles formatting
}

// ✅ Dùng Prettier with ESLint
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
  ],
};
```

---

## Tổng kết

### Bảng so sánh Tooling Features

| Tool          | Mô tả                      | Use Case         |
| ------------- | -------------------------- | ---------------- |
| tsconfig.json | TypeScript compiler config | Compiler options |
| ESLint        | Linting                    | Code quality     |
| Prettier      | Formatting                 | Code style       |

### Khi nào nên dùng Tooling

| Tình huống          | Nên dùng             |
| ------------------- | -------------------- |
| TypeScript projects | ✅ tsconfig.json     |
| Code quality        | ✅ ESLint            |
| Code style          | ✅ Prettier          |
| Team collaboration  | ✅ ESLint + Prettier |

### Best Practices chung cho Tooling

1. **Configure tsconfig.json**: Cấu hình TypeScript compiler
2. **Setup ESLint**: Lint code để catch errors
3. **Setup Prettier**: Format code để consistent
4. **Use pre-commit hooks**: Lint và format trước commit
5. **Maintain configs**: Cập nhật configs khi cần

### Anti-patterns cần tránh

```json
// ❌ Không dùng noImplicitAny: false
{
  "compilerOptions": {
    "noImplicitAny": false // ❌ Avoid this
  }
}

// ✅ Nên dùng strict mode
{
  "compilerOptions": {
    "strict": true // ✅ Enables all strict checks
  }
}

// ❌ Không nên dùng conflicting rules
module.exports = {
  rules: {
    "semi": ["error", "always"], // ❌ Conflicts with Prettier
  },
};

// ✅ Nên dùng Prettier for formatting
{
  "semi": true, // ✅ Prettier handles formatting
}

// ❌ Không nên skipLibCheck: true khi không cần
{
  "compilerOptions": {
    "skipLibCheck": true // ❌ Only use when necessary
  }
}

// ✅ Nên dùng skipLibCheck: true khi cần
{
  "compilerOptions": {
    "skipLibCheck": true // ✅ Use when necessary
  }
}
```

---

## Tài liệu tham khảo / References

- [TypeScript Handbook - tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- [ESLint - TypeScript](https://typescript-eslint.io/)
- [Prettier - Options](https://prettier.io/docs/en/options.html)
- [TypeScript Compiler Options](https://www.typescriptlang.org/tsconfig)

---

_Last updated: 2026-01-30_
