# lazy / lazy

## Định nghĩa / Definition

[`lazy`](https://react.dev/reference/react/lazy) là một API trong React cho phép bạn **lazy load components** - chỉ load component khi cần thiết. Nó giúp giảm initial bundle size và improve performance.

## Cú pháp / Syntax

```javascript
const LazyComponent = lazy(() => import("./Component"));
```

## Tham số / Parameters

| Tham số    | Kiểu       | Mô tả                                                 |
| ---------- | ---------- | ----------------------------------------------------- |
| `importFn` | `function` | Function trả về Promise resolve với component module. |

## Giá trị trả về / Return Value

Trả về một React component có thể suspend khi loading.

## Cách hoạt động / How it Works

### Dynamic Import

`lazy` dùng **dynamic import** để load component:

```javascript
// Static import - load ngay
import Component from "./Component";

// Lazy import - load khi cần
const LazyComponent = lazy(() => import("./Component"));
```

### Code Splitting

`lazy` tạo **code splitting** - chia bundle thành các chunks nhỏ:

```
main.js (initial bundle)
  ├── chunk-home.js
  ├── chunk-about.js
  └── chunk-contact.js
```

### Suspense Integration

`lazy` components phải được wrap trong `Suspense`:

```jsx
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { lazy, Suspense } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### Ví dụ với Route-based Code Splitting

```jsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  );
}
```

### Ví dụ với Conditional Loading

```jsx
import { lazy, Suspense, useState } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

function App() {
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <div>
      <button onClick={() => setShowHeavy(true)}>Load Heavy Component</button>
      {showHeavy && (
        <Suspense fallback={<div>Loading heavy component...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
}
```

### Ví dụ với Named Exports

```jsx
import { lazy, Suspense } from "react";

// Component có named export
const LazyComponent = lazy(() =>
  import("./components").then((module) => ({
    default: module.NamedComponent,
  })),
);

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}
```

### Ví dụ với Error Boundary

```jsx
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
```

### Ví dụ với Multiple Lazy Components

```jsx
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./Dashboard"));
const Settings = lazy(() => import("./Settings"));
const Profile = lazy(() => import("./Profile"));

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <nav>
        <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>
        <button onClick={() => setActiveTab("settings")}>Settings</button>
        <button onClick={() => setActiveTab("profile")}>Profile</button>
      </nav>
      {activeTab === "dashboard" && <Dashboard />}
      {activeTab === "settings" && <Settings />}
      {activeTab === "profile" && <Profile />}
    </Suspense>
  );
}
```

### Ví dụ với Preloading

```jsx
import { lazy, Suspense, useEffect } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  // Preload component khi user hover
  const handleMouseEnter = () => {
    import("./LazyComponent");
  };

  return (
    <Suspense fallback={<Loading />}>
      <div onMouseEnter={handleMouseEnter}>
        <LazyComponent />
      </div>
    </Suspense>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi có large components không cần ngay lập tức
- Khi muốn code splitting cho routes
- Khi muốn reduce initial bundle size
- Khi có components load on demand

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi component nhỏ và cần ngay lập tức
- Khi không cần code splitting
- Khi component luôn được render

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `lazy`:

1. **Larger initial bundle**: Tất cả components được load ngay.

2. **Slower initial load**: Initial load time lâu hơn.

3. **No code splitting**: Không tận dụng được code splitting benefits.

## Vấn đề được giải quyết / Problems Solved

### 1. Code Splitting

Tự động chia bundle thành các chunks.

### 2. Reduced Initial Bundle

Giảm initial bundle size bằng lazy loading.

### 3. Better Performance

Improve initial load time và performance.

## Ưu điểm / Advantages

1. **Automatic code splitting**: Tự động tạo code chunks.

2. **Reduced bundle size**: Giảm initial bundle size.

3. **Better UX**: Faster initial load.

4. **Simple API**: Dễ sử dụng.

## Nhược điểm / Disadvantages

1. **Loading state**: Cần loading state cho lazy components.

2. **Network latency**: Có delay khi load component.

3. **Debugging**: Khó debug hơn với lazy loading.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm         | lazy | Webpack dynamic import | Manual import |
| ---------------- | ---- | ---------------------- | ------------- |
| Automatic        | Có   | Có                     | Không         |
| Suspense support | Có   | Không                  | Không         |
| Simple API       | Có   | Có                     | Không         |
| Code splitting   | Có   | Có                     | Có            |

## Best Practices / Các thực hành tốt

1. **Dùng với Suspense**:

   ```jsx
   <Suspense fallback={<Loading />}>
     <LazyComponent />
   </Suspense>
   ```

2. **Kết hợp với Error Boundary**:

   ```jsx
   <ErrorBoundary fallback={<Error />}>
     <Suspense fallback={<Loading />}>
       <LazyComponent />
     </Suspense>
   </ErrorBoundary>
   ```

3. **Group related components**:

   ```jsx
   // Lazy load các components cùng chunk
   const Dashboard = lazy(() => import("./Dashboard"));
   const DashboardSettings = lazy(() => import("./Dashboard"));
   ```

4. **Meaningful loading states**:
   ```jsx
   <Suspense fallback={<Skeleton />}>
     <LazyComponent />
   </Suspense>
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Not Using with Suspense

```jsx
// ❌ Sai - không có Suspense
<LazyComponent />

// ✅ Đúng - có Suspense
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

### 2. Lazy Loading Small Components

```jsx
// ❌ Không cần lazy cho component nhỏ
const SmallComponent = lazy(() => import("./Small"));

// ✅ Chỉ lazy cho large components
const LargeComponent = lazy(() => import("./Large"));
```

### 3. Not Handling Errors

```jsx
// ❌ Không có Error Boundary
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>

// ✅ Có Error Boundary
<ErrorBoundary fallback={<Error />}>
  <Suspense fallback={<Loading />}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>
```

### 4. Static Import with Lazy

```jsx
// ❌ Sai - static import
import Component from "./Component";
const Lazy = lazy(() => Promise.resolve({ default: Component }));

// ✅ Đúng - dynamic import
const Lazy = lazy(() => import("./Component"));
```

## Performance Considerations / Yếu tố hiệu suất

1. **Reduced initial bundle**: Giảm initial bundle size.

2. **Lazy loading**: Components load khi cần.

3. **Network overhead**: Có network overhead khi load chunks.

4. **Caching**: Chunks được cached sau khi load lần đầu.

## Browser Support / Hỗ trợ trình duyệt

`lazy` hoạt động trên tất cả trình duyệt hỗ trợ React.

## Câu hỏi phỏng vấn / Interview Questions

1. `lazy` là gì? Khi nào nên dùng?

2. `lazy` hoạt động như thế nào?

3. Sự khác biệt giữa static import và lazy import?

4. Tại sao cần dùng `Suspense` với `lazy`?

5. `lazy` giúp cải thiện performance như thế nào?

6. Code splitting là gì?

7. `lazy` có hoạt động với SSR không?

8. Làm thế nào để handle errors với lazy components?

9. `lazy` có hoạt động với TypeScript không?

10. Làm thế nào để preload lazy components?

11. Có thể lazy load named exports không?

12. `lazy` có hoạt động với React 17 không?

13. Làm thế nào để debug lazy components?

14. Khi nào không nên dùng `lazy`?

15. Làm thế nào `lazy` giúp với bundle size?

## Tài liệu tham khảo / References

- [lazy - React Official Docs](https://react.dev/reference/react/lazy)
- [Code Splitting - React Docs](https://react.dev/learn/code-splitting)
- [Suspense - React Docs](https://react.dev/reference/react/Suspense)

---

_Last updated: 2026-01-31_
