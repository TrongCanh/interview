# Profiler / Profiler

## Định nghĩa / Definition

[`Profiler`](https://react.dev/reference/react/Profiler) là một built-in component trong React cho phép bạn **đo hiệu suất render** của components. Nó giúp identify các components gây performance issues bằng cách đo thời gian render và các operations liên quan.

## Cú pháp / Syntax

```jsx
<Profiler id="unique-id" onRender={(id, phase, actualDuration, ...) => {}}>
  {/* children */}
</Profiler>
```

## Tham số / Parameters

| Tham số    | Kiểu       | Mô tả                                                      |
| ---------- | ---------- | ---------------------------------------------------------- |
| `id`       | `string`   | Unique identifier cho Profiler instance.                   |
| `onRender` | `function` | Callback được gọi mỗi khi component trong Profiler commit. |

### onRender Callback Parameters

| Tham số          | Kiểu                    | Mô tả                                                           |
| ---------------- | ----------------------- | --------------------------------------------------------------- |
| `id`             | `string`                | ID của Profiler đã trigger callback.                            |
| `phase`          | `"mount"` \| `"update"` | "mount" nếu component vừa mount, "update" nếu re-render.        |
| `actualDuration` | `number`                | Thời gian thực tế render (ms).                                  |
| `baseDuration`   | `number`                | Thời gian render ước tính không có memoization (ms).            |
| `startTime`      | `number`                | Thời gian bắt đầu render (timestamp).                           |
| `commitTime`     | `number`                | Thời gian commit (timestamp).                                   |
| `interactions`   | `Set`                   | Set của interactions gây ra render này (chỉ trong development). |

## Giá trị trả về / Return Value

Trả về children components đã được wrapped với Profiler.

## Cách hoạt động / How it Works

### Render Phases

```
Render Start → Measure Duration → Render Complete → Commit
                                                ↓
                                          onRender Callback
```

### Profiling in Development vs Production

- **Development**: Profiler hoạt động đầy đủ với interactions tracking.
- **Production**: Profiler hoạt động nhưng interactions tracking bị disable.

### Nested Profilers

Có thể nest nhiều Profilers để đo hiệu suất của các parts khác nhau:

```jsx
<Profiler id="app">
  <Profiler id="sidebar">
    <Sidebar />
  </Profiler>
  <Profiler id="main">
    <MainContent />
  </Profiler>
</Profiler>
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { Profiler } from "react";

function App() {
  const handleRender = (id, phase, actualDuration) => {
    console.log(`${id} ${phase} took ${actualDuration}ms`);
  };

  return (
    <Profiler id="App" onRender={handleRender}>
      <Header />
      <Main />
      <Footer />
    </Profiler>
  );
}
```

### Ví dụ với Performance Tracking

```jsx
import { Profiler, useState } from "react";

function PerformanceTracker({ children }) {
  const [metrics, setMetrics] = useState([]);

  const handleRender = (id, phase, actualDuration, baseDuration) => {
    setMetrics((prev) => [
      ...prev,
      { id, phase, actualDuration, baseDuration, timestamp: Date.now() },
    ]);
  };

  return (
    <>
      <Profiler id="tracker" onRender={handleRender}>
        {children}
      </Profiler>
      <div className="metrics">
        <h3>Performance Metrics</h3>
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Phase</th>
              <th>Actual (ms)</th>
              <th>Base (ms)</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((m, i) => (
              <tr key={i}>
                <td>{m.id}</td>
                <td>{m.phase}</td>
                <td>{m.actualDuration.toFixed(2)}</td>
                <td>{m.baseDuration.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
```

### Ví dụ với List Rendering

```jsx
import { Profiler } from "react";

function LargeList({ items }) {
  const handleRender = (id, phase, actualDuration) => {
    if (actualDuration > 16) {
      console.warn(
        `${id} ${phase} took ${actualDuration.toFixed(2)}ms - Consider optimization!`,
      );
    }
  };

  return (
    <Profiler id="LargeList" onRender={handleRender}>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </Profiler>
  );
}
```

### Ví dụ với Conditional Profiling

```jsx
import { Profiler } from "react";

function ConditionalProfiler({ children, enabled = false }) {
  const handleRender = (id, phase, actualDuration) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[Profiler] ${id} ${phase}: ${actualDuration.toFixed(2)}ms`);
    }
  };

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <Profiler id="ConditionalProfiler" onRender={handleRender}>
      {children}
    </Profiler>
  );
}

// Usage
function App() {
  return (
    <ConditionalProfiler enabled={process.env.NODE_ENV === "development"}>
      <MyComponent />
    </ConditionalProfiler>
  );
}
```

### Ví dụ với Multiple Profilers

```jsx
import { Profiler } from "react";

function Dashboard() {
  const handleRender = (id, phase, actualDuration) => {
    console.log(`${id} ${phase}: ${actualDuration.toFixed(2)}ms`);
  };

  return (
    <Profiler id="Dashboard" onRender={handleRender}>
      <div className="dashboard">
        <Profiler id="Sidebar" onRender={handleRender}>
          <Sidebar />
        </Profiler>
        <Profiler id="MainContent" onRender={handleRender}>
          <MainContent />
        </Profiler>
        <Profiler id="Widgets" onRender={handleRender}>
          <Widgets />
        </Profiler>
      </div>
    </Profiler>
  );
}
```

### Ví dụ với React DevTools

```jsx
import { Profiler } from "react";

function App() {
  return (
    <Profiler
      id="App"
      onRender={(id, phase, actualDuration) => {
        // Dữ liệu sẽ hiển thị trong React DevTools Profiler tab
      }}
    >
      <Header />
      <Main />
      <Footer />
    </Profiler>
  );
}
```

### Ví dụ với Performance Optimization Detection

```jsx
import { Profiler, useMemo } from "react";

function OptimizedComponent({ data }) {
  const expensiveValue = useMemo(() => {
    console.log("Computing expensive value...");
    return data.reduce((sum, item) => sum + item.value, 0);
  }, [data]);

  const handleRender = (id, phase, actualDuration, baseDuration) => {
    const efficiency = (
      ((baseDuration - actualDuration) / baseDuration) *
      100
    ).toFixed(1);
    console.log(`${id} efficiency: ${efficiency}%`);
  };

  return (
    <Profiler id="OptimizedComponent" onRender={handleRender}>
      <div>Total: {expensiveValue}</div>
    </Profiler>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi cần debug performance issues
- Khi muốn identify slow components
- Khi muốn measure impact của optimizations
- Khi cần track render times trong development
- Khi muốn optimize large lists hoặc complex components

## Khi nào KHÔNG nên dùng / When NOT to Use

- Trong production (trừ khi cần production profiling)
- Khi không có performance issues
- Khi component rất đơn giản và nhanh
- Khi không cần detailed performance metrics

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng Profiler:

1. **Hard to identify bottlenecks**: Khó biết component nào gây performance issues.

2. **No metrics**: Không có dữ liệu về render times.

3. **Blind optimization**: Optimize mà không biết có hiệu quả không.

4. **Difficult debugging**: Khó debug performance issues.

## Vấn đề được giải quyết / Problems Solved

### 1. Performance Measurement

Đo thời gian render của components.

### 2. Identify Bottlenecks

Identify components gây performance issues.

### 3. Measure Optimization Impact

Đo hiệu quả của các optimizations.

### 4. Development Tool

Giúp debug performance issues trong development.

## Ưu điểm / Advantages

1. **Built-in**: Có sẵn trong React, không cần external libraries.

2. **Detailed metrics**: Cung cấp detailed performance metrics.

3. **Nested profiling**: Có thể nest nhiều Profilers.

4. **DevTools integration**: Tích hợp với React DevTools.

5. **Production ready**: Có thể dùng trong production.

## Nhược điểm / Disadvantages

1. **Performance overhead**: Có thể gây overhead nhỏ.

2. **Development focused**: Tốt nhất cho development.

3. **Limited info**: Chỉ đo render times, không đo network, v.v.

4. **Requires understanding**: Cần hiểu về React rendering để interpret data.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm       | Profiler | React DevTools | Chrome DevTools | Custom timing |
| -------------- | -------- | -------------- | --------------- | ------------- |
| Built-in       | Có       | Có             | Có              | Không         |
| Render metrics | Có       | Có             | Có              | Có            |
| Interactions   | Có       | Có             | Không           | Không         |
| Visual         | Không    | Có             | Có              | Không         |
| Production     | Có       | Không          | Có              | Có            |

## Best Practices / Các thực hành tốt

1. **Dùng trong development**:

   ```jsx
   <Profiler id="App" onRender={handleRender}>
     {children}
   </Profiler>
   ```

2. **Measure before optimizing**:

   ```jsx
   // Đo trước khi optimize
   const handleRender = (id, phase, actualDuration) => {
     console.log(`${id}: ${actualDuration}ms`);
   };
   ```

3. **Use unique IDs**:

   ```jsx
   <Profiler id="UserProfile" onRender={handleRender}>
     <UserProfile />
   </Profiler>
   ```

4. **Monitor slow renders**:

   ```jsx
   const handleRender = (id, phase, actualDuration) => {
     if (actualDuration > 16) {
       console.warn(`Slow render: ${id} took ${actualDuration}ms`);
     }
   };
   ```

5. **Combine with React.memo**:
   ```jsx
   const MemoizedComponent = memo(Component);
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Using in Production Without Need

```jsx
// ❌ Không cần trong production nếu không có issues
<Profiler id="App" onRender={handleRender}>
  <App />
</Profiler>;

// ✅ Chỉ dùng khi cần production profiling
if (process.env.ENABLE_PROFILING) {
  return (
    <Profiler id="App" onRender={handleRender}>
      <App />
    </Profiler>
  );
}
```

### 2. Not Removing in Production

```jsx
// ❌ Luôn luôn profiler
<Profiler id="App" onRender={handleRender}>
  <App />
</Profiler>;

// ✅ Chỉ profiler trong development
{
  process.env.NODE_ENV === "development" ? (
    <Profiler id="App" onRender={handleRender}>
      <App />
    </Profiler>
  ) : (
    <App />
  );
}
```

### 3. Ignoring Metrics

```jsx
// ❌ Không dùng metrics
<Profiler id="App" onRender={() => {}}>
  <App />
</Profiler>

// ✅ Dùng metrics
<Profiler id="App" onRender={(id, phase, actualDuration) => {
  console.log(`${id} ${phase}: ${actualDuration}ms`);
}}>
  <App />
</Profiler>
```

### 4. Over-Profiling

```jsx
// ❌ Profile tất cả
<Profiler id="every-component">
  {allComponents}
</Profiler>

// ✅ Chỉ profile components nghi ngờ
<Profiler id="SlowComponent">
  <SlowComponent />
</Profiler>
```

## Performance Considerations / Yếu tố hiệu suất

1. **Minimal overhead**: Profiler có overhead nhỏ nhưng không đáng kể.

2. **Development only**: Tốt nhất dùng trong development.

3. **Conditional profiling**: Có thể disable trong production.

4. **Impact on metrics**: Profiler có thể ảnh hưởng đến metrics nhẹ.

## Browser Support / Hỗ trợ trình duyệt

Profiler hoạt động trên tất cả trình duyệt hỗ trợ React.

## Câu hỏi phỏng vấn / Interview Questions

1. Profiler là gì? Khi nào nên dùng?

2. Profiler hoạt động như thế nào?

3. `onRender` callback nhận những tham số nào?

4. Sự khác biệt giữa "mount" và "update" phases?

5. Profiler có hoạt động trong production không?

6. Làm thế nào để identify slow components với Profiler?

7. `actualDuration` khác gì với `baseDuration`?

8. Làm thế nào để disable Profiler trong production?

9. Profiler có hoạt động với SSR không?

10. Làm thế nào Profiler giúp optimize performance?

11. Có thể nest Profilers không?

12. Profiler có hoạt động với React.memo không?

13. `interactions` parameter dùng để làm gì?

14. Làm thế nào để track render times?

15. Profiler có hoạt động với TypeScript không?

## Tài liệu tham khảo / References

- [Profiler - React Official Docs](https://react.dev/reference/react/Profiler)
- [Profiling Components - React Docs](https://react.dev/learn/react-developer-tools#profiling-components)
- [React DevTools - GitHub](https://github.com/facebook/react/tree/main/packages/react-devtools)

---

_Last updated: 2026-01-31_
