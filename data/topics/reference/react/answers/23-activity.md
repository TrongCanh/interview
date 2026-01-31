# Activity / Activity

## Định nghĩa / Definition

[`Activity`](https://react.dev/reference/react/Activity) là một experimental component trong React cho phép bạn **track activity status** của components. Nó giúp monitor khi một component đang active, inactive, hoặc transitioning giữa các states.

## Cú pháp / Syntax

```jsx
<Activity>
  {(status) => (
    // Render dựa trên status
  )}
</Activity>
```

## Tham số / Parameters

| Tham số    | Kiểu       | Mô tả                                        |
| ---------- | ---------- | -------------------------------------------- |
| `children` | `function` | Function nhận `status` và trả về React node. |

## Giá trị trả về / Return Value

Trả về result của children function.

## Cách hoạt động / How it Works

### Activity Statuses

Activity có thể có các status sau:

| Status          | Mô tả                                  |
| --------------- | -------------------------------------- |
| `active`        | Component đang active và visible.      |
| `inactive`      | Component không active hoặc hidden.    |
| `transitioning` | Component đang chuyển đổi giữa states. |

### Lifecycle

```
Component Mount → active → inactive → transitioning → active
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { Activity } from "react";

function MyComponent() {
  return (
    <Activity>
      {(status) => (
        <div>
          Status: {status}
          {status === "active" && <p>Component is active</p>}
          {status === "inactive" && <p>Component is inactive</p>}
        </div>
      )}
    </Activity>
  );
}
```

### Ví dụ với Lazy Loading

```jsx
import { Activity, lazy, Suspense } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  return (
    <Activity>
      {(status) => (
        <Suspense fallback={<div>Loading...</div>}>
          {status === "active" && <LazyComponent />}
          {status === "transitioning" && <div>Transitioning...</div>}
        </Suspense>
      )}
    </Activity>
  );
}
```

### Ví dụ với Tab Switching

```jsx
import { Activity, useState } from "react";

function TabContainer() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div>
      <nav>
        <button onClick={() => setActiveTab("home")}>Home</button>
        <button onClick={() => setActiveTab("about")}>About</button>
        <button onClick={() => setActiveTab("contact")}>Contact</button>
      </nav>
      <Activity>
        {(status) => (
          <div className={`content ${status}`}>
            {activeTab === "home" && <HomePage />}
            {activeTab === "about" && <AboutPage />}
            {activeTab === "contact" && <ContactPage />}
          </div>
        )}
      </Activity>
    </div>
  );
}
```

### Ví dụ với Animation

```jsx
import { Activity } from "react";

function AnimatedComponent() {
  return (
    <Activity>
      {(status) => (
        <div className={`box ${status}`}>
          {status === "active" && "Active"}
          {status === "inactive" && "Inactive"}
          {status === "transitioning" && "Transitioning"}
        </div>
      )}
    </Activity>
  );
}
```

### Ví dụ với Route Tracking

```jsx
import { Activity } from "react";

function RouteTracker() {
  return (
    <Activity>
      {(status) => (
        <div>
          <h1>Current Status: {status}</h1>
          {status === "active" && <ActiveContent />}
          {status === "transitioning" && <TransitionIndicator />}
        </div>
      )}
    </Activity>
  );
}
```

### Ví dụ với Performance Monitoring

```jsx
import { Activity, useEffect } from "react";

function PerformanceMonitor() {
  return (
    <Activity>
      {(status) => {
        useEffect(() => {
          if (status === "active") {
            console.log("Component became active");
            // Start performance tracking
          } else if (status === "inactive") {
            console.log("Component became inactive");
            // Stop performance tracking
          }
        }, [status]);

        return <div>Status: {status}</div>;
      }}
    </Activity>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi cần track activity status của components
- Khi cần react to component visibility changes
- Khi cần optimize rendering dựa trên activity
- Khi cần monitor component lifecycle

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi không cần track activity
- Khi component luôn active
- Khi hook vẫn experimental

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng Activity:

1. **Manual tracking**: Phải tự implement activity tracking.

2. **Complex code**: Code phức tạp hơn để track visibility.

3. **No built-in status**: Không có built-in status tracking.

## Vấn đề được giải quyết / Problems Solved

### 1. Activity Tracking

Track khi component active/inactive.

### 2. Visibility Monitoring

Monitor visibility của components.

### 3. Performance Optimization

Optimize rendering dựa trên activity status.

## Ưu điểm / Advantages

1. **Built-in tracking**: Có sẵn activity tracking.

2. **Declarative**: Dùng declarative pattern.

3. **Performance**: Giúp optimize rendering.

## Nhược điểm / Disadvantages

1. **Experimental**: Hook vẫn experimental.

2. **Limited use cases**: Chỉ dùng cho specific scenarios.

3. **Not widely used**: Ít người biết về hook này.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm    | Activity | Intersection Observer | onVisibilityChange |
| ----------- | -------- | --------------------- | ------------------ |
| Built-in    | Có       | Không                 | Không              |
| React-aware | Có       | Không                 | Có                 |
| Simple API  | Có       | Không                 | Có                 |
| Performance | Tốt      | Tốt                   | Tốt                |

## Best Practices / Các thực hành tốt

1. **Dùng để track status**:

   ```jsx
   <Activity>{(status) => <div>{status}</div>}</Activity>
   ```

2. **Optimize rendering**:

   ```jsx
   <Activity>
     {(status) => status === "active" && <ExpensiveComponent />}
   </Activity>
   ```

3. **Monitor lifecycle**:
   ```jsx
   <Activity>
     {(status) => {
       useEffect(() => {
         if (status === "active") {
           // Start monitoring
         }
       }, [status]);
       return <div />;
     }}
   </Activity>
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Using When Not Needed

```jsx
// ❌ Không cần Activity
<Activity>
  {(status) => <div>Always active</div>}
</Activity>

// ✅ Đúng - chỉ cần div
<div>Always active</div>
```

### 2. Ignoring Status

```jsx
// ❌ Không dùng status
<Activity>
  {() => <div>Content</div>}
</Activity>

// ✅ Đúng - dùng status
<Activity>
  {(status) => <div>Status: {status}</div>}
</Activity>
```

## Performance Considerations / Yếu tố hiệu suất

1. **Optimized rendering**: Giúp optimize rendering dựa trên status.

2. **Minimal overhead**: Có overhead nhỏ.

## Browser Support / Hỗ trợ trình duyệt

Activity hoạt động trên tất cả trình duyệt hỗ trợ React 19+.

## Câu hỏi phỏng vấn / Interview Questions

1. Activity là gì? Khi nào nên dùng?

2. Activity hoạt động như thế nào?

3. Những status nào Activity có thể có?

4. Làm thế nào Activity giúp optimize performance?

5. Activity có hoạt động với SSR không?

6. Làm thế nào để track activity status?

7. Activity có hoạt động với React 18 không?

8. Làm thế nào để test components với Activity?

9. Activity có hoạt động với TypeScript không?

## Tài liệu tham khảo / References

- [Activity - React Official Docs](https://react.dev/reference/react/Activity)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)

---

_Last updated: 2026-01-31_
