# 38. Debugging / Debugging

> Câu trả lời chi tiết về Debugging / Detailed answers about Debugging

---

## React DevTools

### React DevTools là gì? / What is React DevTools?

**React DevTools** là một browser extension cho phép bạn inspect React component tree, props, state, và performance.

**React DevTools** is a browser extension that allows you to inspect React component tree, props, state, and performance.

### Cài đặt React DevTools

```bash
# Chrome/Edge
https://chrome.google.com/webstore/detail/fmkadmapgofadopljbjhkapigmonko

# Firefox
https://addons.mozilla.org/en-US/firefox/addon/react-devtools/

# Safari
https://github.com/facebook/react/tree/main/packages/react-devtools
```

### React DevTools Features

| Feature / Tính năng | Mô tả / Description             |
| ------------------- | ------------------------------- |
| **Components Tab**  | Inspect component tree và props |
| **Profiler Tab**    | Measure render performance      |
| **Timeline**        | Track component lifecycle       |
| **Settings**        | Config DevTools behavior        |

---

## Profiling React Apps / Profiling React Apps

### Profiler Tab trong React DevTools

**Profiler Tab** cho phép bạn measure render performance và identify bottlenecks.

**Profiler Tab** allows you to measure render performance and identify bottlenecks.

### Using Profiler Component

```jsx
import { Profiler } from "react";

function onRenderCallback(
  id, // Prop ID của Profiler
  phase, // "mount" hoặc "update"
  actualDuration, // Thời gian render thực tế
  baseDuration, // Thời gian render không có memoization
  startTime, // Khi render bắt đầu
  commitTime, // Khi render commit vào DOM
) {
  console.log(`${id} ${phase} took ${actualDuration}ms`);
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <ComponentToProfile />
    </Profiler>
  );
}
```

### Profiling với React DevTools

```jsx
// 1. Mở React DevTools
// 2. Chuyển sang tab "Profiler"
// 3. Click "Start profiling"
// 4. Tương tác với app
// 5. Click "Stop profiling"
// 6. Xem kết quả

// Profiler sẽ hiển thị:
// - Render time cho mỗi component
// - Re-render count
// - Why components re-rendered
```

---

## Common React Bugs / Lỗi React thường gặp

### Infinite Loops in useEffect

```jsx
// ❌ Bad - Infinite loop
function BadComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Dependency array rỗng -> chạy mỗi render
    setCount(count + 1);
  }); // ❌ Missing dependency array!

  return <div>Count: {count}</div>;
}

// ✅ Good - Thêm dependency
function GoodComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, [count]); // ✅ Dependency array

  return <div>Count: {count}</div>;
}
```

### Stale Closure

```jsx
// ❌ Bad - Stale closure
function BadComponent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1); // count luôn là 0
  };

  return <button onClick={handleClick}>Increment</button>;
}

// ✅ Good - Functional update
function GoodComponent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1); // ✅ Functional update
  };

  return <button onClick={handleClick}>Increment</button>;
}
```

### Key Prop Issues

```jsx
// ❌ Bad - Không có key hoặc key không stable
function BadList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        // ❌ Index làm key gây vấn đề
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
}

// ✅ Good - Sử dụng unique, stable key
function GoodList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        // ✅ ID làm key
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### Mutation trong Render

```jsx
// ❌ Bad - Mutation trong render
function BadComponent() {
  const [user, setUser] = useState({ name: "John" });

  return (
    <div>
      {/* ❌ Mutation trực tiếp */}
      <button onClick={() => (user.name = "Jane")}>Change Name</button>
      <p>{user.name}</p>
    </div>
  );
}

// ✅ Good - Sử dụng setState
function GoodComponent() {
  const [user, setUser] = useState({ name: "John" });

  return (
    <div>
      <button onClick={() => setUser({ ...user, name: "Jane" })}>
        Change Name
      </button>
      <p>{user.name}</p>
    </div>
  );
}
```

---

## Debugging Re-renders / Debugging Re-renders

### Tại sao component re-render?

**Component re-render** khi:

1. Props thay đổi
2. State thay đổi
3. Context thay đổi
4. Parent re-render

**Component re-renders when:**

1. Props change
2. State changes
3. Context changes
4. Parent re-renders

### Debug với React DevTools

```jsx
// 1. Mở React DevTools
// 2. Chọn component trong "Components" tab
// 3. Xem "why did this component re-render?"
// 4. Kiểm tra props và state

// DevTools sẽ hiển thị:
// - Props đã thay đổi
// - State đã thay đổi
// - Context đã thay đổi
// - Parent đã re-render
```

### Highlight Updates trong React DevTools

```jsx
// Enable "Highlight updates when components render"
// trong React DevTools settings

// Khi component re-render:
// - Component được highlight với màu vàng
// - Props được highlight nếu thay đổi
// - State được highlight nếu thay đổi
```

---

## Performance Debugging / Debugging Performance

### Why Did You Render (WDYR)

**Why Did You Render** là một technique để debug tại sao component re-render.

**Why Did You Render** is a technique to debug why a component re-renders.

```jsx
import { useEffect, useRef } from "react";

function useWhyDidYouRender(name, props) {
  const prevProps = useRef(props);

  useEffect(() => {
    const changedProps = Object.keys(props).filter(
      (key) => props[key] !== prevProps.current[key],
    );

    if (changedProps.length > 0) {
      console.log(`${name} re-rendered because:`, changedProps);
      console.log("Previous props:", prevProps.current);
      console.log("New props:", props);
    }

    prevProps.current = props;
  });
}

function MyComponent(props) {
  useWhyDidYouRender("MyComponent", props);

  return <div>{props.children}</div>;
}
```

### React.memo Debugging

```jsx
import { memo } from "react";

// ❌ Bad - Component re-render khi props không thay đổi
function ExpensiveComponent({ data }) {
  return <div>{/* expensive render */}</div>;
}

// ✅ Good - Sử dụng React.memo
const MemoizedComponent = memo(function ExpensiveComponent({ data }) {
  return <div>{/* expensive render */}</div>;
});

// Debug với console.log
const DebugComponent = memo(function ExpensiveComponent({ data }) {
  console.log("MemoizedComponent rendered with data:", data);
  return <div>{/* expensive render */}</div>;
});
```

---

## Console Logging Strategies / Chiến lược Console Logging

### Logging Component Mounts

```jsx
import { useEffect } from "react";

function ComponentWithLogging({ name }) {
  useEffect(() => {
    console.log(`[Mount] ${name} mounted`);

    return () => {
      console.log(`[Unmount] ${name} unmounted`);
    };
  }, [name]);

  return <div>{name}</div>;
}
```

### Logging State Changes

```jsx
import { useState, useEffect } from "react";

function ComponentWithStateLogging() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`[State Change] count changed to:`, count);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Logging with Custom Hook

```jsx
import { useEffect, useRef } from "react";

function useLogger(componentName) {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(
      `[Render] ${componentName} rendered ${renderCount.current} times`,
    );
  });

  return renderCount.current;
}

function LoggedComponent() {
  const renderCount = useLogger("LoggedComponent");

  return <div>Rendered {renderCount} times</div>;
}
```

---

## Tóm tắt / Summary

| Công cụ / Tool      | Mục đích / Purpose                   |
| ------------------- | ------------------------------------ |
| **React DevTools**  | Inspect component tree, props, state |
| **Profiler**        | Measure render performance           |
| **WDYR**            | Debug re-render causes               |
| **React.memo**      | Prevent unnecessary re-renders       |
| **Console Logging** | Track component lifecycle            |

---

## Best Practices / Thực hành tốt nhất

### 1. Sử dụng React DevTools cho debugging

```jsx
// ✅ Good - Sử dụng DevTools để inspect
// 1. Mở React DevTools
// 2. Inspect component tree
// 3. Check props và state
// 4. Use Profiler cho performance
```

### 2. Tránh infinite loops trong useEffect

```jsx
// ✅ Good - Thêm dependency array
useEffect(() => {
  fetchData();
}, [dependency]); // ✅ Dependency array
```

### 3. Sử dụng functional updates

```jsx
// ✅ Good - Functional update
setCount((prev) => prev + 1);
```

---

_Updated: 2026-01-30_
