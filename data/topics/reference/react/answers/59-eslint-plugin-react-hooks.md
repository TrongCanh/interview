# ESLint Plugin: React Hooks / ESLint Plugin: React Hooks

## Định nghĩa / Definition

[`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) là một ESLint plugin giúp **enforce Rules of Hooks** và phát hiện các lỗi thường gặp khi dùng React Hooks.

## Cú pháp / Syntax

Không có cú pháp trực tiếp. Plugin hoạt động như một ESLint plugin.

## Cách hoạt động / How it Works

### Rules Enforcement

Plugin enforce các rules:

| Rule                            | Mô tả                                        |
| ------------------------------- | -------------------------------------------- |
| `rules-of-hooks`                | Enforce Rules of Hooks.                      |
| `exhaustive-deps`               | Warn khi dependencies bị thiếu hoặc thừa.    |
| `no-array-index-key`            | Warn khi dùng index làm key trong arrays.    |
| `no-dangerously-set-inner-html` | Warn khi dùng `dangerouslySetInnerHTML`.     |
| `no-deps`                       | Warn khi dependencies sai.                   |
| `no-duplicate-hooks`            | Warn khi hooks bị gọi nhiều lần.             |
| `no-exhaustive-deps`            | Warn khi dependencies không exhaustive.      |
| `no-hooks-in-conditionals`      | Warn khi hooks được dùng trong conditionals. |
| `no-inner-declarations`         | Warn khi có inner declarations.              |
| `no-invalid-hook-call`          | Warn khi hooks được gọi sai.                 |
| `no-misplaced-boolean`          | Warn khi boolean expressions sai.            |
| `no-unstable-nested-components` | Warn khi unstable nested components.         |
| `no-unsafe-classnames`          | Warn khi classnames không an toàn.           |
| `no-unused-state`               | Warn khi state không được dùng.              |
| `prefer-exhaustive-deps`        | Warn nên dùng exhaustive deps.               |
| `prefer-read-only-state`        | Warn nên dùng read-only state.               |

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```javascript
// .eslintrc.js
module.exports = {
  plugins: ["react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
  },
};
```

### Ví dụ với Exhaustive Dependencies

```jsx
// ❌ Sai - thiếu dependencies
function Component({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []); // Thiếu userId
}

// ✅ Đúng - có tất cả dependencies
function Component({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Có userId
}
```

### Ví dụ với Duplicate Hooks

```jsx
// ❌ Sai - hook được gọi nhiều lần
function Component() {
  const [count, setCount] = useState(0);

  if (condition) {
    useState(0); // Hook trong conditional
  }

  return <div>{count}</div>;
}

// ✅ Đúng - hooks ở top level
function Component() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  return <div>{count}</div>;
}
```

### Ví dụ với No Array Index Key

```jsx
// ❌ Sai - dùng index làm key
function List({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
}

// ✅ Đúng - dùng unique key
function List({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### Ví dụ với Unused State

```jsx
// ❌ Sai - state không được dùng
function Component() {
  const [unused, setUnused] = useState(0);

  return <div>Hello</div>;
}

// ✅ Đúng - dùng state hoặc xóa
function Component() {
  const [count, setCount] = useState(0);

  return <div>{count}</div>;
}
```

### Ví dụ với Prefer Read-Only State

```jsx
// ❌ Sai - mutate state
function Component() {
  const [user, setUser] = useState({ name: "John" });

  const updateName = (newName) => {
    setUser((prev) => {
      prev.name = newName; // Mutate
      return prev;
    });
  };
}

// ✅ Đúng - return new object
function Component() {
  const [user, setUser] = useState({ name: "John" });

  const updateName = (newName) => {
    setUser((prev) => ({
      ...prev,
      name: newName,
    }));
  };
}
```

### Ví dụ với Configuration

```javascript
// .eslintrc.js
module.exports = {
  plugins: ["react-hooks"],
  rules: {
    // Enforce Rules of Hooks
    "react-hooks/rules-of-hooks": "error",

    // Exhaustive dependencies
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks: ["useCustomHook"],
      },
    ],

    // No unsafe classnames
    "react-hooks/no-unsafe-classnames": "error",

    // Prefer read-only state
    "react-hooks/prefer-read-only-state": "warn",
  },
};
```

## Khi nào nên dùng / When to Use

- Khi dùng React Hooks
- Khi muốn enforce Rules of Hooks
- Khi muốn phát hiện common mistakes
- Khi làm việc với team
- Khi muốn maintain code quality

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi không dùng React Hooks
- Khi dùng class components
- Khi không cần linting

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng ESLint Plugin: React Hooks:

1. **No enforcement**: Không có enforcement cho Rules of Hooks.

2. **Common mistakes**: Có thể mắc các errors thường gặp.

3. **Code quality**: Code quality có thể kém hơn.

## Vấn đề được giải quyết / Problems Solved

### 1. Rules Enforcement

Enforce Rules of Hooks tự động.

### 2. Error Detection

Phát hiện các errors thường gặp với hooks.

### 3. Code Quality

Giúp maintain code quality.

## Ưu điểm / Advantages

1. **Automatic enforcement**: Tự động enforce rules.

2. **Error detection**: Phát hiện errors sớm.

3. **Code quality**: Giúp maintain code quality.

4. **Customizable**: Có thể configure rules.

## Nhược điểm / Disadvantages

1. **Configuration**: Cần configuration.

2. **Learning curve**: Cần hiểu về rules.

3. **False positives**: Có thể có false positives.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm          | ESLint Plugin | TypeScript   | React Compiler |
| ----------------- | ------------- | ------------ | -------------- |
| Runtime           | Có            | Có           | Không          |
| Build-time        | Không         | Có           | Có             |
| Hooks enforcement | Có            | Không        | Có             |
| Performance       | Không impact  | Không impact | Impact         |

## Best Practices / Các thực hành tốt

1. **Enable all rules**:

   ```javascript
   module.exports = {
     plugins: ["react-hooks"],
     rules: {
       "react-hooks/rules-of-hooks": "error",
     },
   };
   ```

2. **Fix warnings**:

   ```jsx
   // Fix exhaustive-deps warnings
   useEffect(() => {
     // code
   }, [dep1, dep2]); // Tất cả dependencies
   ```

3. **Custom configuration**:

   ```javascript
   module.exports = {
     plugins: ["react-hooks"],
     rules: {
       "react-hooks/exhaustive-deps": [
         "warn",
         {
           additionalHooks: ["useCustomHook"],
         },
       ],
     },
   };
   ```

4. **Use with TypeScript**:
   ```tsx
   // TypeScript + ESLint React Hooks
   // Cả 2 tools hoạt động tốt với nhau
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Ignoring Warnings

```jsx
// ❌ Ignoring warnings
useEffect(() => {
  // code
}, [dep]); // Thiếu dependencies

// ✅ Fix warnings
useEffect(() => {
  // code
}, [dep1, dep2]); // Tất cả dependencies
```

### 2. Using Hooks in Conditionals

```jsx
// ❌ Sai - hooks trong conditionals
function Component() {
  if (condition) {
    const [state, setState] = useState(0);
  }
  return <div />;
}

// ✅ Đúng - hooks ở top level
function Component() {
  const [state, setState] = useState(0);
  return <div />;
}
```

### 3. Not Configuring Plugin

```javascript
// ❌ Không có plugin
module.exports = {
  rules: {},
};

// ✅ Đúng - có plugin
module.exports = {
  plugins: ["react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
  },
};
```

### 4. Mutating State

```jsx
// ❌ Sai - mutate state
function Component() {
  const [user, setUser] = useState({ name: "John" });
  const update = () => {
    user.name = "Jane"; // Mutate
    setUser(user);
  };
}

// ✅ Đúng - return new object
function Component() {
  const [user, setUser] = useState({ name: "John" });
  const update = () => {
    setUser((prev) => ({ ...prev, name: "Jane" }));
  };
}
```

## Performance Considerations / Yếu tố hiệu suất

1. **Build-time**: Linting tại build time.

2. **No runtime cost**: Không có runtime cost.

3. **Development tool**: Chỉ dùng trong development.

## Browser Support / Hỗ trợ trình duyệt

ESLint Plugin: React Hooks hoạt động trên tất cả môi trường (Node.js, browsers).

## Câu hỏi phỏng vấn / Interview Questions

1. ESLint Plugin: React Hooks là gì? Khi nào nên dùng?

2. ESLint Plugin: React Hooks hoạt động như thế nào?

3. Rules of Hooks là gì?

4. Làm thế nào để configure ESLint Plugin: React Hooks?

5. `exhaustive-deps` rule làm gì?

6. `no-array-index-key` rule làm gì?

7. `no-duplicate-hooks` rule làm gì?

8. Làm thế nào ESLint Plugin: React Hooks giúp với code quality?

9. ESLint Plugin: React Hooks có hoạt động với TypeScript không?

10. Làm thế nào để fix `exhaustive-deps` warnings?

11. ESLint Plugin: React Hooks có hoạt động với React Compiler không?

12. Làm thế nào để disable một rule?

13. `prefer-read-only-state` rule làm gì?

14. Làm thế nào ESLint Plugin: React Hooks phát hiện common mistakes?

15. ESLint Plugin: React Hooks có hoạt động với SSR không?

## Tài liệu tham khảo / References

- [ESLint Plugin: React Hooks - npm](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [Rules of Hooks - React Docs](https://react.dev/warnings/invalid-hook-call-warning)
- [ESLint Configuration - ESLint Docs](https://eslint.org/docs/latest/use/configuration/)

---

_Last updated: 2026-01-31_
