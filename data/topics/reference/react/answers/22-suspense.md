# Suspense / Suspense

## Định nghĩa / Definition

[`Suspense`](https://react.dev/reference/react/Suspense) là một built-in component trong React cho phép bạn **hiển thị fallback UI** trong khi components con đang tải data hoặc code. Nó là một phần của Concurrent Rendering và giúp tạo loading states declarative.

## Cú pháp / Syntax

```jsx
<Suspense fallback={<Loading />}>{/* children */}</Suspense>
```

## Tham số / Parameters

| Tham số    | Kiểu | Mô tả                                  |
| ---------- | ---- | -------------------------------------- |
| `children` | Node | Các components có thể suspend.         |
| `fallback` | Node | UI hiển thị khi children đang suspend. |

## Giá trị trả về / Return Value

Trả về children khi không suspend, hoặc fallback khi children đang suspend.

## Cách hoạt động / How it Works

### Suspense Lifecycle

```
Component Render → Data Fetching → Suspend
                                    ↓
                              Show Fallback
                                    ↓
                              Data Ready
                                    ↓
                              Show Content
```

### Data Fetching with Suspense

Components có thể suspend bằng:

- Throwing a Promise khi fetching data
- Lazy loading components với `React.lazy`

### Nested Suspense

Có thể nest multiple Suspense boundaries:

```jsx
<Suspense fallback={<PageLoader />}>
  <Header />
  <Suspense fallback={<ContentLoader />}>
    <MainContent />
  </Suspense>
  <Footer />
</Suspense>
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile />
    </Suspense>
  );
}
```

### Ví dụ với Lazy Loading

```jsx
import { Suspense, lazy } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading component...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### Ví dụ với Data Fetching

```jsx
import { Suspense } from "react";

// Data fetching function có thể suspend
function useData(url) {
  const data = fetchResource(url); // Suspend nếu data chưa sẵn
  return data;
}

function UserProfile() {
  const user = useData("/api/user");
  return <div>{user.name}</div>;
}

function App() {
  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <UserProfile />
    </Suspense>
  );
}
```

### Ví dụ với Nested Suspense

```jsx
import { Suspense } from "react";

function Dashboard() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Header />
      <Suspense fallback={<ContentLoader />}>
        <MainContent />
      </Suspense>
      <Suspense fallback={<SidebarLoader />}>
        <Sidebar />
      </Suspense>
      <Footer />
    </Suspense>
  );
}
```

### Ví dụ với Error Boundary

```jsx
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <UserProfile />
      </Suspense>
    </ErrorBoundary>
  );
}
```

### Ví dụ với Multiple Components

```jsx
import { Suspense } from "react";

function Dashboard() {
  return (
    <div className="dashboard">
      <Suspense fallback={<SkeletonCard />}>
        <StatsCard />
      </Suspense>
      <Suspense fallback={<SkeletonChart />}>
        <Chart />
      </Suspense>
      <Suspense fallback={<SkeletonList />}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}
```

### Ví dụ với Route-based Code Splitting

```jsx
import { Suspense } from "react";
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

### Ví dụ với Streaming SSR

```jsx
import { Suspense } from "react";

function App() {
  return (
    <html>
      <head>
        <title>My App</title>
      </head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <AppContent />
        </Suspense>
      </body>
    </html>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi lazy load components với `React.lazy`
- Khi fetching data với Suspense-enabled libraries
- Khi muốn declarative loading states
- Khi cần streaming SSR
- Khi có multiple independent loading states

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi không có Suspense-enabled data fetching
- Khi cần manual loading state control
- Khi component không suspend
- Khi loading state cần complex logic

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng Suspense:

1. **Manual loading states**: Phải quản lý loading states thủ công.

2. **Complex code**: Code phức tạp hơn với conditional rendering.

3. **No streaming**: Không tận dụng được streaming SSR.

4. **Waterfall issues**: Data fetching có thể bị waterfall.

## Vấn đề được giải quyết / Problems Solved

### 1. Declarative Loading States

Loading states được định nghĩa declarative thay vì imperative.

### 2. Code Splitting

Lazy load components với fallback UI.

### 3. Data Fetching

Data fetching với Suspense pattern.

### 4. Streaming SSR

Server có thể stream HTML chunks.

## Ưu điểm / Advantages

1. **Declarative**: Loading states được định nghĩa declarative.

2. **Automatic**: React tự động handle loading/success/error states.

3. **Code splitting**: Dễ lazy load components.

4. **Streaming SSR**: Tận dụng streaming cho better performance.

5. **Nested boundaries**: Có thể nest multiple Suspense boundaries.

## Nhược điểm / Disadvantages

1. **Requires Suspense-enabled libraries**: Cần libraries hỗ trợ Suspense.

2. **Learning curve**: Cần hiểu về Suspense pattern.

3. **Not for all data fetching**: Chỉ hoạt động với Suspense-enabled data fetching.

4. **Error handling**: Cần Error Boundary để handle errors.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm       | Suspense   | useState | SWR   | TanStack Query |
| -------------- | ---------- | -------- | ----- | -------------- |
| Declarative    | Có         | Không    | Có    | Có             |
| Automatic      | Có         | Không    | Có    | Có             |
| Code splitting | Có         | Không    | Không | Không          |
| Streaming      | Có         | Không    | Không | Không          |
| Learning curve | Trung bình | Thấp     | Thấp  | Thấp           |

## Best Practices / Các thực hành tốt

1. **Dùng với React.lazy**:

   ```jsx
   const LazyComponent = lazy(() => import("./Component"));
   <Suspense fallback={<Loading />}>
     <LazyComponent />
   </Suspense>;
   ```

2. **Kết hợp với Error Boundary**:

   ```jsx
   <ErrorBoundary fallback={<Error />}>
     <Suspense fallback={<Loading />}>
       <Component />
     </Suspense>
   </ErrorBoundary>
   ```

3. **Nest Suspense boundaries**:

   ```jsx
   <Suspense fallback={<PageLoader />}>
     <Header />
     <Suspense fallback={<ContentLoader />}>
       <Content />
     </Suspense>
   </Suspense>
   ```

4. **Use meaningful fallbacks**:

   ```jsx
   <Suspense fallback={<Skeleton />}>
     <Content />
   </Suspense>
   ```

5. **Avoid large Suspense boundaries**:

   ```jsx
   // ❌ Bad: Quá lớn
   <Suspense fallback={<Loading />}>
     <EntireApp />
   </Suspense>

   // ✅ Good: Chia nhỏ
   <Suspense fallback={<HeaderLoader />}>
     <Header />
   </Suspense>
   <Suspense fallback={<ContentLoader />}>
     <Content />
   </Suspense>
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Not Using with Suspense-enabled Libraries

```jsx
// ❌ Không hoạt động với fetch thường
function Component() {
  const data = fetch("/api/data"); // Không suspend
  return <div>{data}</div>;
}

// ✅ Dùng với Suspense-enabled libraries
function Component() {
  const data = useSWR("/api/data", fetcher, { suspense: true });
  return <div>{data.name}</div>;
}
```

### 2. Forgetting Error Boundary

```jsx
// ❌ Không có Error Boundary
<Suspense fallback={<Loading />}>
  <Component />
</Suspense>

// ✅ Có Error Boundary
<ErrorBoundary fallback={<Error />}>
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
</ErrorBoundary>
```

### 3. Too Large Suspense Boundaries

```jsx
// ❌ Quá lớn
<Suspense fallback={<Loading />}>
  <Header />
  <Main />
  <Footer />
</Suspense>

// ✅ Chia nhỏ
<Suspense fallback={<HeaderLoader />}>
  <Header />
</Suspense>
<Suspense fallback={<MainLoader />}>
  <Main />
</Suspense>
```

### 4. Not Handling Loading States

```jsx
// ❌ Không có fallback
<Suspense>
  <Component />
</Suspense>

// ✅ Có fallback
<Suspense fallback={<Loading />}>
  <Component />
</Suspense>
```

## Performance Considerations / Yếu tố hiệu suất

1. **Streaming SSR**: Server có thể stream HTML chunks.

2. **Reduced waterfall**: Suspense giúp giảm waterfall issues.

3. **Code splitting**: Lazy load components để giảm bundle size.

4. **Optimized loading**: React tự động optimize loading states.

## Browser Support / Hỗ trợ trình duyệt

Suspense hoạt động trên tất cả trình duyệt hỗ trợ React 18+.

## Câu hỏi phỏng vấn / Interview Questions

1. Suspense là gì? Khi nào nên dùng?

2. Suspense hoạt động như thế nào?

3. Sự khác biệt giữa Suspense và manual loading states?

4. Làm thế nào Suspense hoạt động với React.lazy?

5. Suspense có hoạt động với data fetching không?

6. Làm thế nào để handle errors với Suspense?

7. Nested Suspense boundaries là gì?

8. Suspense có hoạt động với SSR không?

9. Streaming SSR với Suspense là gì?

10. Làm thế nào Suspense giúp cải thiện performance?

11. Có thể nest Suspense không?

12. Suspense có hoạt động với TypeScript không?

13. Làm thế nào để test components với Suspense?

14. Suspense có hoạt động với React 17 không?

15. Làm thế nào Suspense hoạt động với Concurrent Rendering?

## Tài liệu tham khảo / References

- [Suspense - React Official Docs](https://react.dev/reference/react/Suspense)
- [Code Splitting - React Docs](https://react.dev/learn/code-splitting)
- [Suspense for Data Fetching - React Docs](https://react.dev/learn/render-and-commit#step-5-browser-paints)
- [React 18 Documentation](https://react.dev/blog/2022/03/29/react-v18)

---

_Last updated: 2026-01-31_
