# createRoot / createRoot

## Định nghĩa / Definition

[`createRoot`](https://react.dev/reference/react-dom/client/createRoot) là một API trong React-DOM Client cho phép bạn **tạo root container** để render React application vào một DOM element.

## Cú pháp / Syntax

```javascript
const root = createRoot(containerNode, options?);
```

## Tham số / Parameters

| Tham số         | Kiểu      | Mô tả                             |
| --------------- | --------- | --------------------------------- |
| `containerNode` | `Element` | DOM element muốn mount React app. |
| `options`       | `object`  | (Optional) Cấu hình cho root.     |

### Options Parameters

| Option               | Kiểu       | Mô tả                                |
| -------------------- | ---------- | ------------------------------------ |
| `identifierPrefix`   | `string`   | Prefix cho unique identifiers (SSR). |
| `onRecoverableError` | `function` | Callback khi có recoverable error.   |
| `onUncaughtError`    | `function` | Callback khi có uncaught error.      |

## Giá trị trả về / Return Value

| Giá trị | Kiểu   | Mô tả                              |
| ------- | ------ | ---------------------------------- |
| `root`  | `Root` | Root object với methods để render. |

### Root Methods

| Method      | Mô tả  | Return Value                |
| ----------- | ------ | --------------------------- |
| `render()`  | `void` | Render React tree vào root. |
| `unmount()` | `void` | Unmount React tree từ root. |

## Cách hoạt động / How it Works

### Root Creation

`createRoot` tạo root container để render React app:

```jsx
// Tạo root
const root = createRoot(document.getElementById("root"));

// Render app
root.render(<App />);
```

### Rendering Process

```
createRoot → render() → React Tree → DOM Updates
```

### Concurrent Rendering

React 18+ hỗ trợ concurrent rendering với `createRoot`:

```jsx
const root = createRoot(container, {
  // Enable concurrent features
  onRecoverableError: (error, errorInfo) => {
    console.error("Recoverable error:", error);
  },
});

root.render(<App />);
```

### Hydration

SSR hydration với `hydrateRoot`:

```jsx
const root = hydrateRoot(document, preloadedHTML);
root.render(<App />);
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { createRoot } from "react-dom/client";

function App() {
  return <h1>Hello, React!</h1>;
}

// Mount app
const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

### Ví dụ với Options

```jsx
import { createRoot } from "react-dom/client";

function App() {
  return <h1>Hello, React!</h1>;
}

// Tạo root với options
const root = createRoot(document.getElementById("root"), {
  identifierPrefix: "my-app",
  onRecoverableError: (error, errorInfo) => {
    console.error("Error:", error);
  },
});

root.render(<App />);
```

### Ví dụ với Concurrent Rendering

```jsx
import { createRoot } from "react-dom/client";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}

const root = createRoot(document.getElementById("root"), {
  // Concurrent features enabled
});

root.render(<App />);
```

### Ví dụ với Error Handling

```jsx
import { createRoot } from "react-dom/client";

function App() {
  return <h1>Hello, React!</h1>;
}

const root = createRoot(document.getElementById("root"), {
  onUncaughtError: (error, errorInfo) => {
    console.error("Uncaught error:", error);
  },
  onRecoverableError: (error, errorInfo) => {
    console.error("Recoverable error:", error);
  },
});

root.render(<App />);
```

### Ví dụ với TypeScript

```tsx
import { createRoot } from "react-dom/client";

interface AppProps {
  title: string;
}

function App({ title }: AppProps) {
  return <h1>{title}</h1>;
}

const root = createRoot(document.getElementById("root"));
root.render(<App title="React App" />);
```

### Ví dụ với Multiple Roots

```jsx
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div>
      <div id="root1"></div>
      <div id="root2"></div>
    </div>
  );
}

const root1 = createRoot(document.getElementById("root1"));
const root2 = createRoot(document.getElementById("root2"));

root1.render(<App1 />);
root2.render(<App2 />);
```

### Ví dụ với Cleanup

```jsx
import { createRoot } from "react-dom/client";

function App() {
  return <h1>Hello, React!</h1>;
}

// Tạo và cleanup root
const root = createRoot(document.getElementById("root"));
root.render(<App />);

// Cleanup khi component unmount
return () => {
  root.unmount();
};
```

### Ví dụ với Server-Side Rendering

```jsx
// Server component
function App() {
  return <h1>Hello from Server!</h1>;
}

// Client-side hydration
const root = hydrateRoot(document, preloadedHTML);
root.render(<App />);
```

## Khi nào nên dùng / When to Use

- Khi render React application vào browser
- Khi cần concurrent rendering
- Khi cần error handling
- Khi làm việc với Server-Side Rendering
- Khi cần hydration

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi dùng React < 18 (dùng `ReactDOM.render` thay thế)
- Khi không cần concurrent rendering
- Khi không cần error handling
- Khi không cần hydration

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `createRoot`:

1. **No concurrent rendering**: Không có concurrent features.

2. **No error handling**: Không có built-in error handling.

3. **No hydration**: Không có hydration support.

4. **Legacy API**: Phải dùng `ReactDOM.render`.

## Vấn đề được giải quyết / Problems Solved

### 1. Concurrent Rendering

Hỗ trợ concurrent rendering trong React 18+.

### 2. Error Handling

Built-in error handling cho React applications.

### 3. Hydration

Hỗ trợ SSR hydration với `hydrateRoot`.

### 4. Modern API

Sử dụng modern API thay vì legacy `ReactDOM.render`.

## Ưu điểm / Advantages

1. **Concurrent rendering**: Hỗ trợ concurrent features.

2. **Error handling**: Built-in error handling.

3. **Hydration support**: Hỗ trợ SSR hydration.

4. **Modern API**: Modern API thay vì legacy.

5. **TypeScript support**: Tốt với TypeScript.

6. **Simple API**: Dễ sử dụng.

## Nhược điểm / Disadvantages

1. **React 18+**: Chỉ hoạt động với React 18 trở lên.

2. **Browser support**: Chỉ hoạt động trên browsers.

3. **No concurrent mode**: Không có concurrent mode trong React 17.

4. **Legacy API**: `ReactDOM.render` vẫn có sẵn cho backward compatibility.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm       | createRoot | ReactDOM.render | hydrateRoot |
| -------------- | ---------- | --------------- | ----------- | --- |
| Concurrent     | Có         | Không           | Có          |
| Error handling | Có         | Không           | Có          |
| Hydration      | Có         | Không           | Có          |
| Modern API     | Có         | Không           | Không       |
| TypeScript     | Có         | Có              | Có          |
| Simple API     | Có         | Có              | Có          |
| Legacy API     | Không      | Có              | Có          | Có  |

## Best Practices / Các thực hành tốt

1. **Dùng cho new apps**:

   ```jsx
   // ✅ Đúng - dùng createRoot cho React 18+
   const root = createRoot(document.getElementById("root"));
   root.render(<App />);
   ```

2. **Dùng error callbacks**:

   ```jsx
   const root = createRoot(document.getElementById("root"), {
     onUncaughtError: (error) => {
       console.error("Error:", error);
     },
     onRecoverableError: (error) => {
       console.error("Recoverable:", error);
     },
   });
   ```

3. **Cleanup root khi cần**:

   ```jsx
   const root = createRoot(document.getElementById("root"));
   root.render(<App />);

   // Cleanup khi không cần
   return () => {
     root.unmount();
   };
   ```

4. **Dùng hydrateRoot cho SSR**:

   ```jsx
   const root = hydrateRoot(document, preloadedHTML);
   root.render(<App />);
   ```

5. **TypeScript với createRoot**:
   ```tsx
   const root = createRoot(document.getElementById("root"));
   root.render(<App title="React App" />);
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Using ReactDOM.render

```jsx
// ❌ Sai - dùng legacy API
import { render } from "react-dom";
render(<App />, document.getElementById("root"));

// ✅ Đúng - dùng createRoot
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

### 2. Not Cleaning Up

```jsx
// ❌ Sai - không cleanup
const root = createRoot(document.getElementById("root"));
root.render(<App />);

// ✅ Đúng - cleanup khi cần
const root = createRoot(document.getElementById("root"));
root.render(<App />);
return () => {
  root.unmount();
};
```

### 3. Forgetting Options

```jsx
// ❌ Sai - không dùng options
const root = createRoot(document.getElementById("root"));

// ✅ Đúng - dùng options khi cần
const root = createRoot(document.getElementById("root"), {
  identifierPrefix: "my-app",
});
root.render(<App />);
```

### 4. Using in Wrong React Version

```jsx
// ❌ Không hoạt động với React < 18
import { createRoot } from "react-dom/client";

// ✅ Kiểm tra version
import { version } from "react";
const [major] = version.split(".")[0];
if (parseInt(major) < 18) {
  console.warn("createRoot requires React 18+");
}
```

### 5. Multiple Roots on Same Container

```jsx
// ❌ Sai - nhiều roots trên cùng container
const root1 = createRoot(document.getElementById("root"));
const root2 = createRoot(document.getElementById("root"));
root1.render(<App1 />);
root2.render(<App2 />);

// ✅ Đúng - chỉ một root
const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

## Performance Considerations / Yếu tố hiệu suất

1. **Concurrent rendering**: Tối ưu performance với concurrent features.

2. **Error handling**: Built-in error handling có overhead nhỏ.

3. **Minimal overhead**: API nhẹ và hiệu quả.

4. **Batching**: Automatic batching cho updates.

## Browser Support / Hỗ trợ trình duyệt

`createRoot` hoạt động trên tất cả trình duyệt hỗ trợ React 18+.

## Câu hỏi phỏng vấn / Interview Questions

1. `createRoot` là gì? Khi nào nên dùng?

2. `createRoot` hoạt động như thế nào?

3. Sự khác biệt giữa `createRoot` và `ReactDOM.render`?

4. `createRoot` hỗ trợ concurrent rendering không?

5. `hydrateRoot` khác gì với `createRoot`?

6. Làm thế nào `createRoot` giúp với error handling?

7. `createRoot` có hoạt động với React 17 không?

8. Làm thế nào để cleanup root?

9. `createRoot` có hoạt động với SSR không?

10. Làm thế nào `createRoot` giúp với concurrent rendering?

11. `createRoot` có hoạt động với TypeScript không?

12. Làm thế nào để test components với `createRoot`?

13. Có thể có multiple roots không?

14. `createRoot` khác gì với `hydrateRoot`?

15. Làm thế nào `createRoot` giúp với hydration?

16. Khi nào nên dùng `createRoot` thay vì `ReactDOM.render`?

17. `createRoot` có những options nào?

18. Làm thế nào `createRoot` giúp với performance?

19. `createRoot` có hoạt động với class components không?

20. Làm thế nào `createRoot` khác gì với `render`?

21. `createRoot` có hoạt động với React 19 không?

22. Làm thế nào `createRoot` giúp với server-side rendering?

23. Khi nào không nên dùng `createRoot`?

24. `createRoot` có hoạt động với React 16 không?

25. Làm thế nào `createRoot` giúp với error recovery?

26. Làm thế nào `createRoot` giúp với debugging?

27. Làm thế nào `createRoot` khác gì với `unmount`?

28. `createRoot` có hoạt động với Next.js không?

29. Làm thế nào `createRoot` giúp với streaming SSR?

30. Làm thế nào `createRoot` khác gì với `hydrateRoot`?

## Tài liệu tham khảo / References

- [createRoot - React Official Docs](https://react.dev/reference/react-dom/client/createRoot)
- [hydrateRoot - React Official Docs](https://react.dev/reference/react-dom/client/hydrateRoot)
- [ReactDOM - React Official Docs](https://react.dev/reference/react-dom)
- [React 18 Documentation](https://react.dev/blog/2022/03/29/react-v18)
- [Concurrent Rendering - React Docs](https://react.dev/blog/2022/03/29/react-v18)

---

_Last updated: 2026-01-31_
