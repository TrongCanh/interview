# captureOwnerStack / captureOwnerStack

## Định nghĩa / Definition

[`captureOwnerStack`](https://react.dev/reference/react/captureOwnerStack) là một API trong React cho phép bạn **capture owner stack** của components để debug và trace component hierarchy.

## Cú pháp / Syntax

```javascript
const stack = captureOwnerStack();
```

## Tham số / Parameters

Không có tham số.

## Giá trị trả về / Return Value

| Giá trị | Kiểu    | Mô tả                                              |
| ------- | ------- | -------------------------------------------------- |
| `stack` | `Array` | Array của owner objects mô tả component hierarchy. |

## Cách hoạt động / How it Works

### Owner Stack

Owner stack mô tả component hierarchy:

```
App
  └── Header
  └── Main
       └── Sidebar
       └── Content
```

### Capture Timing

Stack được capture tại thời điểm gọi:

```jsx
const stack = captureOwnerStack();
// Stack mô tả component hierarchy tại thời điểm này
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { captureOwnerStack } from "react";

function DebugComponent() {
  const stack = captureOwnerStack();

  console.log("Owner stack:", stack);

  return (
    <div>
      <h1>Component Hierarchy</h1>
      <pre>{JSON.stringify(stack, null, 2)}</pre>
    </div>
  );
}
```

### Ví dụ với Error Tracking

```jsx
import { captureOwnerStack } from "react";

function ErrorBoundary({ children }) {
  const handleError = (error, errorInfo) => {
    const stack = captureOwnerStack();

    console.error("Error:", error);
    console.error("Component stack:", stack);

    // Send error với stack đến logging service
    logError({
      error,
      stack,
      componentStack: errorInfo.componentStack,
    });
  };

  return <ErrorBoundary onError={handleError}>{children}</ErrorBoundary>;
}
```

### Ví dụ với Performance Debugging

```jsx
import { captureOwnerStack, Profiler } from "react";

function PerformanceDebugger({ children }) {
  const handleRender = (
    id,
    phase,
    actualDuration,
    startTime,
    commitTime,
    interactions,
  ) => {
    const stack = captureOwnerStack();

    console.log(`Render ${id} took ${actualDuration}ms`);
    console.log("Owner stack:", stack);

    // Track slow renders với component hierarchy
    if (actualDuration > 16) {
      logSlowRender({
        component: id,
        duration: actualDuration,
        stack,
      });
    }
  };

  return (
    <Profiler id="App" onRender={handleRender}>
      {children}
    </Profiler>
  );
}
```

### Ví dụ với Component Inspector

```jsx
import { captureOwnerStack, useState } from "react";

function ComponentInspector({ children }) {
  const [stack, setStack] = useState(null);

  const inspect = () => {
    const currentStack = captureOwnerStack();
    setStack(currentStack);
  };

  return (
    <div>
      <button onClick={inspect}>Inspect Component Hierarchy</button>
      {stack && (
        <div className="inspector">
          <h3>Component Hierarchy</h3>
          <pre>{JSON.stringify(stack, null, 2)}</pre>
        </div>
      )}
      {children}
    </div>
  );
}
```

### Ví dụ với DevTools Integration

```jsx
import { captureOwnerStack } from "react";

function DevToolsPanel() {
  const capture = () => {
    const stack = captureOwnerStack();

    // Send stack đến React DevTools
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__.send("component-stack", stack);
    }
  };

  return (
    <div className="devtools-panel">
      <button onClick={capture}>Capture Component Stack</button>
    </div>
  );
}
```

### Ví dụ với TypeScript

```tsx
import { captureOwnerStack } from "react";

interface Owner {
  displayName: string;
  type: string;
}

function ComponentDebugger() {
  const stack = captureOwnerStack() as Owner[];

  return (
    <div>
      <h1>Component Stack</h1>
      <ul>
        {stack.map((owner, index) => (
          <li key={index}>
            {owner.displayName} ({owner.type})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi cần debug component hierarchy
- Khi cần trace component ownership
- Khi cần track rendering flow
- Khi debug complex component trees

## Khi nào KHÔNG nên dùng / When NOT to Use

- Trong production (chỉ dùng cho debugging)
- Khi component hierarchy đơn giản
- Khi không cần debugging

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `captureOwnerStack`:

1. **Harder debugging**: Khó debug component hierarchy.

2. **No trace**: Không thể trace component ownership.

3. **Limited visibility**: Không có visibility vào component tree.

## Vấn đề được giải quyết / Problems Solved

### 1. Component Hierarchy Debugging

Debug component hierarchy dễ dàng hơn.

### 2. Owner Tracing

Trace component ownership trong component tree.

### 3. Error Context

Cung cấp context cho errors với component hierarchy.

## Ưu điểm / Advantages

1. **Debugging support**: Giúp debugging.

2. **Hierarchy trace**: Trace component ownership.

3. **Simple API**: Dễ sử dụng.

4. **TypeScript support**: Tốt với TypeScript.

## Nhược điểm / Disadvantages

1. **Development only**: Chỉ dùng cho debugging.

2. **Performance overhead**: Có overhead nhỏ.

3. **Limited use cases**: Chỉ dùng cho debugging.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm             | captureOwnerStack | Profiler | React DevTools |
| -------------------- | ----------------- | -------- | -------------- |
| Hierarchy trace      | Có                | Có       | Có             |
| Debugging            | Có                | Có       | Có             |
| Performance tracking | Không             | Có       | Có             |
| Simple API           | Có                | Có       | Không          |

## Best Practices / Các thực hành tốt

1. **Dùng cho debugging**:

   ```jsx
   const stack = captureOwnerStack();
   console.log("Component stack:", stack);
   ```

2. **Kết hợp với Error Boundary**:

   ```jsx
   const handleError = (error) => {
     const stack = captureOwnerStack();
     logError({ error, stack });
   };
   ```

3. **Type the result**:
   ```tsx
   const stack = captureOwnerStack() as Owner[];
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Using in Production

```jsx
// ❌ Không nên dùng trong production
const stack = captureOwnerStack();

// ✅ Chỉ dùng trong development
if (process.env.NODE_ENV === "development") {
  const stack = captureOwnerStack();
}
```

### 2. Not Understanding Stack

```jsx
// ❌ Không hiểu stack structure
const stack = captureOwnerStack();
console.log(stack); // Array của objects

// ✅ Hiểu stack structure
const stack = captureOwnerStack();
stack.forEach((owner) => {
  console.log(owner.displayName, owner.type);
});
```

### 3. Over-capturing

```jsx
// ❌ Capture quá nhiều lần
useEffect(() => {
  const stack = captureOwnerStack();
  console.log(stack);
}); // Mỗi render

// ✅ Chỉ capture khi cần
const handleDebug = () => {
  const stack = captureOwnerStack();
  console.log(stack);
};
```

## Performance Considerations / Yếu tố hiệu suất

1. **Development overhead**: Có overhead nhỏ trong development.

2. **No production cost**: Không có cost trong production.

3. **Minimal impact**: Impact nhỏ đến performance.

## Browser Support / Hỗ trợ trình duyệt

`captureOwnerStack` hoạt động trên tất cả trình duyệt hỗ trợ React 19+.

## Câu hỏi phỏng vấn / Interview Questions

1. `captureOwnerStack` là gì? Khi nào nên dùng?

2. `captureOwnerStack` hoạt động như thế nào?

3. `captureOwnerStack` trả về gì?

4. Làm thế nào `captureOwnerStack` giúp debugging?

5. `captureOwnerStack` có hoạt động với React 18 không?

6. Làm thế nào để trace component hierarchy?

7. `captureOwnerStack` có hoạt động với SSR không?

8. `captureOwnerStack` có hoạt động với TypeScript không?

9. Làm thế nào để debug với `captureOwnerStack`?

10. Có thể capture stack multiple times không?

11. `captureOwnerStack` khác gì với Profiler?

12. Làm thế nào `captureOwnerStack` kết hợp với Error Boundary?

13. Khi nào không nên dùng `captureOwnerStack`?

14. `captureOwnerStack` có hoạt động với class components không?

15. Làm thế nào `captureOwnerStack` giúp với error tracking?

## Tài liệu tham khảo / References

- [captureOwnerStack - React Official Docs](https://react.dev/reference/react/captureOwnerStack)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [Profiling - React Docs](https://react.dev/learn/react-developer-tools#profiling-components)

---

_Last updated: 2026-01-31_
