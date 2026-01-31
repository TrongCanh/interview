# hydrateRoot / hydrateRoot

## Định nghĩa / Definition

[`hydrateRoot`](https://react.dev/reference/react-dom/client/hydrateRoot) là một API trong React-DOM Client cho phép bạn **hydrate** SSR-rendered HTML để làm cho React interactive. Nó tương đương với `createRoot` nhưng dành cho Server-Side Rendering (SSR).

## Cú pháp / Syntax

```javascript
const root = hydrateRoot(containerNode, options?);
```

## Tham số / Parameters

| Tham số         | Kiểu      | Mô tả                               |
| --------------- | --------- | ----------------------------------- |
| `containerNode` | `Element` | DOM element chứa SSR-rendered HTML. |
| `options`       | `object`  | (Optional) Cấu hình cho hydration.  |

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

| Method      | Mô tả  | Return Value                      |
| ----------- | ------ | --------------------------------- |
| `render()`  | `void` | Hydrate React tree vào container. |
| `unmount()` | `void` | Unmount React tree từ container.  |

## Cách hoạt động / How it Works

### Hydration Process

`hydrateRoot` hydrate SSR-rendered HTML:

```
SSR HTML → hydrateRoot() → Attach Event Listeners → Make Interactive
```

### Comparison with createRoot

| Đặc điểm        | hydrateRoot   | createRoot       |
| --------------- | ------------- | ---------------- |
| Purpose         | SSR Hydration | Client Rendering |
| Initial Render  | Interactive   | Static           |
| Event Listeners | Có            | Không            |
| Use Case        | SSR Apps      | CSR Apps         |
| React Version   | React 18+     | React 18+        |

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { hydrateRoot } from "react-dom/client";

function App({ initialHTML }) {
  const root = hydrateRoot(document.getElementById("root"));

  root.render(<App />);
}
```

### Ví dụ với Options

```jsx
import { hydrateRoot } from "react-dom/client";

function App() {
  const root = hydrateRoot(document.getElementById("root"), {
    identifierPrefix: "my-app",
    onRecoverableError: (error, errorInfo) => {
      console.error("Recoverable error:", error);
    },
  });

  root.render(<App />);
}
```

### Ví dụ với Error Handling

```jsx
import { hydrateRoot } from "react-dom/client";

function App() {
  const root = hydrateRoot(document.getElementById("root"), {
    onRecoverableError: (error, errorInfo) => {
      console.error("Recoverable error:", error);
    },
    onUncaughtError: (error, errorInfo) => {
      console.error("Uncaught error:", error);
    },
  });

  root.render(<App />);
}
```

### Ví dụ với Multiple Roots

```jsx
import { hydrateRoot } from "react-dom/client";

function App() {
  const root1 = hydrateRoot(document.getElementById("root1"), {
    identifierPrefix: "app1",
  });
  const root2 = hydrateRoot(document.getElementById("root2"), {
    identifierPrefix: "app2",
  });

  root1.render(<App1 />);
  root2.render(<App2 />);
}
```

### Ví dụ với TypeScript

```tsx
import { hydrateRoot } from "react-dom/client";

interface HydrateRootOptions {
  identifierPrefix?: string;
  onRecoverableError?: (error: Error, errorInfo: any) => void;
  onUncaughtError?: (error: Error, errorInfo: any) => void;
}

function App() {
  const root = hydrateRoot(document.getElementById("root"), {
    identifierPrefix: "my-app",
    onRecoverableError: (error, errorInfo) => {
      console.error("Recoverable error:", error);
    },
  });

  root.render(<App />);
}
```

### Ví dụ với Cleanup

```jsx
import { hydrateRoot } from "react-dom/client";

function App() {
  const root = hydrateRoot(document.getElementById("root"));

  const handleUnmount = () => {
    root.unmount();
  };

  return (
    <div>
      <button onClick={handleUnmount}>Unmount</button>
      <div id="root"></div>
    </div>
  );
}
```

### Ví dụ với Concurrent Features

```jsx
import { hydrateRoot } from "react-dom/client";

function App() {
  const root = hydrateRoot(document.getElementById("root"), {
    // Enable concurrent features
  });

  root.render(<App />);
}
```

## Khi nào nên dùng / When to Use

- Khi làm việc với Server-Side Rendering (SSR)
- Khi cần hydrate SSR-rendered HTML
- Khi muốn interactive client-side app
- Khi có React 18+ trở lên

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi dùng Client-Side Rendering (CSR)
- Khi không có SSR-rendered HTML
- Khi dùng React < 18 (dùng `createRoot` thay thế)
- Khi không cần hydration

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `hydrateRoot`:

1. **No hydration**: SSR-rendered HTML không được hydrate.

2. **No interactivity**: App không interactive.

3. **Poor UX**: Initial load chậm hơn.

4. **Manual event attachment**: Phải tự attach event listeners.

## Vấn đề được giải quyết / Problems Solved

### 1. Hydration

Hydrate SSR-rendered HTML để làm interactive.

### 2. Event Listeners

Tự động attach event listeners.

### 3. Error Handling

Built-in error handling cho hydration errors.

### 4. Concurrent Features

Hỗ trợ concurrent rendering trong React 18+.

## Ưu điểm / Advantages

1. **Interactive SSR**: SSR với interactive client.

2. **Fast TTI**: Time to Interactive nhanh hơn.

3. **Simple API**: Dễ sử dụng.

4. **Error handling**: Built-in error recovery.

5. **Concurrent features**: Hỗ trợ concurrent rendering.

## Nhược điểm / Disadvantages

1. **SSR required**: Chỉ dùng được với SSR apps.

2. **Complex setup**: Cần SSR infrastructure.

3. **Debugging**: Hydration errors có thể khó debug.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm        | hydrateRoot   | createRoot       | ReactDOM.render |
| --------------- | ------------- | ---------------- | --------------- |
| Purpose         | SSR Hydration | Client Rendering |
| Initial Render  | Interactive   | Static           |
| Event Listeners | Có            | Không            |
| Use Case        | SSR Apps      | CSR Apps         | CSR Apps        |
| React Version   | React 18+     | React 18+        |

## Best Practices / Các thực hành tốt

1. **Dùng với SSR framework**:

   ```jsx
   const root = hydrateRoot(document.getElementById("root"));
   root.render(<App />);
   ```

2. **Handle errors properly**:

   ```jsx
   const root = hydrateRoot(document.getElementById("root"), {
     onRecoverableError: (error) => {
       console.error("Error:", error);
     },
   });
   ```

3. **Dùng unique prefixes**:

   ```jsx
   const root = hydrateRoot(document.getElementById("root"), {
     identifierPrefix: "my-app",
   });
   ```

4. **Cleanup khi cần**:

   ```jsx
   const root = hydrateRoot(document.getElementById("root"));
   root.render(<App />);

   // Cleanup
   return () => {
     root.unmount();
   };
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Using with createRoot

```jsx
// ❌ Sai - dùng createRoot cho SSR app
import { createRoot } from "react-dom/client";

function App() {
  const root = createRoot(document.getElementById("root"));
  root.render(<App />);
}

// ✅ Đúng - dùng hydrateRoot cho SSR app
import { hydrateRoot } from "react-dom/client";

function App() {
  const root = hydrateRoot(document.getElementById("root"));
  root.render(<App />);
}
```

### 2. Not Handling Errors

```jsx
// ❌ Không có error handling
const root = hydrateRoot(document.getElementById("root"));
root.render(<App />);

// ✅ Đúng - có error handling
const root = hydrateRoot(document.getElementById("root"), {
  onRecoverableError: (error) => {
    console.error("Error:", error);
  },
});
root.render(<App />);
```

### 3. Forgetting Cleanup

```jsx
// ❌ Không cleanup
const root = hydrateRoot(document.getElementById("root"));
root.render(<App />);

// ✅ Đúng - cleanup khi cần
const root = hydrateRoot(document.getElementById("root"));
root.render(<App />);

// Cleanup
return () => {
  root.unmount();
};
```

### 4. Wrong React Version

```jsx
// ❌ Không hoạt động với React < 18
// hydrateRoot chỉ có sẵn từ React 18+

// ✅ Kiểm tra version
import { version } from "react";
const [major] = version.split(".")[0];
if (parseInt(major) < 18) {
  console.warn("hydrateRoot requires React 18+");
}
```

## Performance Considerations / Yếu tố hiệu suất

1. **Fast TTI**: Time to Interactive nhanh hơn.

2. **Event listeners**: Tự động attach listeners.

3. **Error recovery**: Built-in error recovery.

4. **Minimal overhead**: API nhẹ và hiệu quả.

## Browser Support / Hỗ trợ trình duyệt

`hydrateRoot` hoạt động trên tất cả trình duyệt hỗ trợ React 18+.

## Câu hỏi phỏng vấn / Interview Questions

1. `hydrateRoot` là gì? Khi nào nên dùng?

2. `hydrateRoot` hoạt động như thế nào?

3. Sự khác biệt giữa `hydrateRoot` và `createRoot`?

4. `hydrateRoot` khác gì với `hydrate`?

5. Làm thế nào `hydrateRoot` giúp với SSR?

6. `hydrateRoot` có hoạt động với React 18 không?

7. Làm thế nào `hydrateRoot` giúp với TTI?

8. Làm thế nào để handle hydration errors?

9. `hydrateRoot` có hoạt động với TypeScript không?

10. Làm thế nào `hydrateRoot` khác gì với `ReactDOM.render`?

11. Làm thế nào để cleanup root?

12. `hydrateRoot` có hỗ trợ concurrent features không?

13. Khi nào nên dùng `hydrateRoot` thay vì `createRoot`?

14. Làm thế nào `hydrateRoot` giúp với debugging?

15. Có thể có multiple roots không?

16. `hydrateRoot` có hoạt động với class components không?

17. Làm thế nào `hydrateRoot` giúp với event listeners?

18. Làm thế nào `hydrateRoot` khác gì với `render`?

19. `hydrateRoot` có hoạt động với streaming SSR không?

20. Làm thế nào `hydrateRoot` khác gì với `unmount`?

21. Khi nào không nên dùng `hydrateRoot`?

22. `hydrateRoot` có hoạt động với HTTP/2 không?

23. Làm thế nào `hydrateRoot` giúp với performance?

24. `hydrateRoot` có hoạt động với React 17 không?

25. Làm thế nào `hydrateRoot` giúp với error recovery?

## Tài liệu tham khảo / References

- [hydrateRoot - React Official Docs](https://react.dev/reference/react-dom/client/hydrateRoot)
- [React 18 Documentation](https://react.dev/blog/2022/03/29/react-v18)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [SSR - React Docs](https://react.dev/reference/react-dom/server)

---

_Last updated: 2026-01-31_
