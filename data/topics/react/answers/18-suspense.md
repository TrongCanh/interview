# 18. Suspense / Suspense

> Câu trả lời chi tiết về React Suspense / Detailed answers about React Suspense

---

## Suspense là gì? / What is Suspense?

**Suspense** là một component trong React cho phép bạn khai báo loading state (trạng thái chờ) khi component con đang chờ dữ liệu hoặc resource. Nó giúp bạn tạo ra trải nghiệm người dùng mượt mà hơn bằng cách hiển thị UI loading thay vì blank screen.

**Suspense is a React component that allows you to declare loading states when child components are waiting for data or resources. It helps create a smoother user experience by showing loading UI instead of blank screens.**

### Cách hoạt động / How it works

```jsx
// Cơ bản / Basic
import { Suspense } from "react";

function UserProfile({ userId }) {
  return (
    <Suspense fallback={<div>Loading user data...</div>}>
      <UserDetails userId={userId} />
      <UserPosts userId={userId} />
    </Suspense>
  );
}
```

**Flow hoạt động:**

1. React render component con
2. Nếu component con throw một Promise, React sẽ catch nó
3. React hiển thị `fallback` thay vì component con
4. Khi Promise resolve, React render lại component con với dữ liệu

---

## Suspense với lazy loading / Suspense with lazy loading

### React.lazy()

`React.lazy()` cho phép bạn lazy load components - chỉ tải code khi cần thiết. Kết hợp với Suspense để hiển thị loading state.

**`React.lazy()` allows you to lazy load components - only load code when needed. Combine with Suspense to show loading state.**

```jsx
import { Suspense, lazy } from "react";

// Lazy load component
const HeavyComponent = lazy(() => import("./HeavyComponent"));
const ChartComponent = lazy(() => import("./ChartComponent"));

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <Suspense fallback={<div>Loading chart...</div>}>
        <ChartComponent />
      </Suspense>

      <Suspense fallback={<div>Loading heavy component...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}
```

### Code splitting với React.lazy()

```jsx
// routes.jsx
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  );
}
```

### Named exports với lazy loading

```jsx
// Component có named export
// MyComponent.js
export const MyComponent = () => {
  /* ... */
};

// Cách lazy load
const MyComponent = lazy(() =>
  import("./MyComponent").then((module) => ({ default: module.MyComponent })),
);
```

---

## Suspense với data fetching / Suspense for data fetching

### Tại sao cần Suspense cho data fetching?

**Why Suspense for data fetching?**

- Tránh callback hell / Avoid callback hell
- Loại bỏ loading state thủ công / Eliminate manual loading states
- Code dễ đọc hơn / More readable code
- Tận dụng Concurrent Rendering / Leverage Concurrent Rendering

### Ví dụ với React Query / Example with React Query

```jsx
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";

// Data fetching component
function UserList() {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    suspense: true, // Enable Suspense mode
  });

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Parent component
function App() {
  return (
    <Suspense fallback={<div>Loading users...</div>}>
      <UserList />
    </Suspense>
  );
}
```

### Ví dụ với Relay / Example with Relay

```jsx
import { Suspense } from "react";
import { useLazyLoadQuery, graphql } from "react-relay";

const UserQuery = graphql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      name
      email
    }
  }
`;

function UserProfile({ userId }) {
  const user = useLazyLoadQuery(UserQuery, { id: userId });

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

function App({ userId }) {
  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <UserProfile userId={userId} />
    </Suspense>
  );
}
```

### Custom data fetching với Suspense

```jsx
// Tạo resource wrapper
function createResource(promise) {
  let status = "pending";
  let result;
  let error;

  const suspender = promise.then(
    (data) => {
      status = "success";
      result = data;
    },
    (err) => {
      status = "error";
      error = err;
    },
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      }
      if (status === "error") {
        throw error;
      }
      return result;
    },
  };
}

// Custom hook
function useFetch(url) {
  const [resource, setResource] = useState(() =>
    createResource(fetch(url).then((res) => res.json())),
  );

  return resource.read();
}

// Component sử dụng
function UserList() {
  const users = useFetch("/api/users");

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## Suspense boundaries / Giới hạn Suspense

### Nested Suspense

```jsx
function App() {
  return (
    <div>
      <h1>My App</h1>

      {/* Outer Suspense */}
      <Suspense fallback={<div>Loading main content...</div>}>
        <Sidebar />

        {/* Inner Suspense */}
        <Suspense fallback={<div>Loading posts...</div>}>
          <PostList />
        </Suspense>

        {/* Another Suspense boundary */}
        <Suspense fallback={<div>Loading comments...</div>}>
          <CommentSection />
        </Suspense>
      </Suspense>
    </div>
  );
}
```

### Khi nào nên tạo Suspense boundary mới?

**When to create new Suspense boundary?**

1. **Component độc lập** - Component có thể load độc lập
2. **UI loading khác nhau** - Cần hiển thị loading UI khác nhau
3. **Tối ưu UX** - Hiển thị phần nội dung đã load trước
4. **Error handling** - Handle error cho từng phần riêng biệt

```jsx
// Good practice - Multiple Suspense boundaries
function Dashboard() {
  return (
    <div className="dashboard">
      {/* Header load nhanh nhất */}
      <Suspense fallback={<HeaderSkeleton />}>
        <DashboardHeader />
      </Suspense>

      {/* Stats có thể load riêng */}
      <Suspense fallback={<StatsSkeleton />}>
        <StatsCards />
      </Suspense>

      {/* Chart nặng nhất */}
      <Suspense fallback={<ChartSkeleton />}>
        <MainChart />
      </Suspense>

      {/* Recent activity */}
      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}
```

---

## Fallback UI patterns / Mẫu Fallback UI

### Skeleton Loading

```jsx
function UserListSkeleton() {
  return (
    <div className="user-list">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="user-item skeleton">
          <div className="avatar skeleton-box" />
          <div className="info">
            <div className="name skeleton-box" />
            <div className="email skeleton-box" />
          </div>
        </div>
      ))}
    </div>
  );
}

function UserList() {
  const users = useFetch("/api/users");

  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.id} className="user-item">
          <img src={user.avatar} alt={user.name} />
          <div className="info">
            <div className="name">{user.name}</div>
            <div className="email">{user.email}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<UserListSkeleton />}>
      <UserList />
    </Suspense>
  );
}
```

### Progressive Loading

```jsx
function PostPage({ postId }) {
  return (
    <article>
      {/* Hiển thị post trước */}
      <Suspense fallback={<PostSkeleton />}>
        <PostContent postId={postId} />
      </Suspense>

      {/* Sau đó load comments */}
      <Suspense fallback={<div>Loading comments...</div>}>
        <CommentsSection postId={postId} />
      </Suspense>

      {/* Cuối cùng load related posts */}
      <Suspense fallback={<div>Loading related posts...</div>}>
        <RelatedPosts postId={postId} />
      </Suspense>
    </article>
  );
}
```

### Inline Loading

```jsx
function InlineSuspenseExample() {
  return (
    <div>
      <h2>Products</h2>

      <Suspense
        fallback={
          <div className="inline-loading">
            <span className="spinner"></span>
            Loading products...
          </div>
        }
      >
        <ProductList />
      </Suspense>
    </div>
  );
}
```

---

## Error boundaries với Suspense / Error boundaries with Suspense

### Kết hợp Error Boundary và Suspense

```jsx
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-fallback">
      <h2>Something went wrong!</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function UserProfile({ userId }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset state hoặc refetch data
      }}
    >
      <Suspense fallback={<div>Loading profile...</div>}>
        <ProfileContent userId={userId} />
      </Suspense>
    </ErrorBoundary>
  );
}
```

### Nested Error Boundaries với Suspense

```jsx
function Dashboard() {
  return (
    <div className="dashboard">
      {/* Error boundary cho toàn bộ dashboard */}
      <ErrorBoundary FallbackComponent={DashboardError}>
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function DashboardContent() {
  return (
    <>
      <ErrorBoundary FallbackComponent={StatsError}>
        <Suspense fallback={<StatsSkeleton />}>
          <StatsSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ChartError}>
        <Suspense fallback={<ChartSkeleton />}>
          <ChartSection />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
```

---

## Best Practices / Thực hành tốt nhất

### 1. Granular Suspense boundaries

```jsx
// ❌ Bad - Quá lớn
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Sidebar />
      <MainContent />
      <Footer />
    </Suspense>
  );
}

// ✅ Good - Granular
function App() {
  return (
    <>
      <Header />
      <div className="content">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Suspense fallback={<ContentSkeleton />}>
          <MainContent />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
```

### 2. Meaningful fallbacks

```jsx
// ❌ Bad - Generic fallback
<Suspense fallback={<div>Loading...</div>}>
  <UserProfile />
</Suspense>

// ✅ Good - Specific, informative fallback
<Suspense fallback={
  <div className="profile-loading">
    <div className="avatar-skeleton" />
    <div className="name-skeleton" />
    <div className="bio-skeleton" />
  </div>
}>
  <UserProfile />
</Suspense>
```

### 3. Handle errors properly

```jsx
function DataSection({ dataSource }) {
  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => (
        <div className="error">
          Failed to load {dataSource}.
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}
    >
      <Suspense fallback={<LoadingState name={dataSource} />}>
        <DataComponent source={dataSource} />
      </Suspense>
    </ErrorBoundary>
  );
}
```

### 4. Avoid Suspense waterfall

```jsx
// ❌ Bad - Waterfall effect
function BadExample() {
  return (
    <Suspense fallback={<div>Loading A...</div>}>
      <ComponentA>
        <Suspense fallback={<div>Loading B...</div>}>
          <ComponentB>
            <Suspense fallback={<div>Loading C...</div>}>
              <ComponentC />
            </Suspense>
          </ComponentB>
        </Suspense>
      </ComponentA>
    </Suspense>
  );
}

// ✅ Good - Parallel loading
function GoodExample() {
  return (
    <>
      <Suspense fallback={<div>Loading A...</div>}>
        <ComponentA />
      </Suspense>
      <Suspense fallback={<div>Loading B...</div>}>
        <ComponentB />
      </Suspense>
      <Suspense fallback={<div>Loading C...</div>}>
        <ComponentC />
      </Suspense>
    </>
  );
}
```

---

## Common Pitfalls / Lỗi thường gặp

### 1. Quên wrap lazy components

```jsx
// ❌ Error - Lazy component không có Suspense
const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  return <LazyComponent />; // Lỗi!
}

// ✅ Correct
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### 2. Suspense trong conditional render

```jsx
// ❌ Bad - Suspense trong conditional
function BadExample({ show }) {
  if (!show) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}

// ✅ Good - Luôn render Suspense
function GoodExample({ show }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {show && <Component />}
    </Suspense>
  );
}
```

### 3. Không handle errors

```jsx
// ❌ Bad - Không có error boundary
function BadExample() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComponentThatMightFail />
    </Suspense>
  );
}

// ✅ Good - Có error boundary
function GoodExample() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<div>Loading...</div>}>
        <ComponentThatMightFail />
      </Suspense>
    </ErrorBoundary>
  );
}
```

---

## Tóm tắt / Summary

| Khái niệm / Concept   | Giải thích / Explanation                                  |
| --------------------- | --------------------------------------------------------- |
| **Suspense**          | Component cho phép khai báo loading state khi chờ dữ liệu |
| **React.lazy()**      | Lazy load components để giảm bundle size                  |
| **Fallback**          | UI hiển thị khi component đang load                       |
| **Suspense Boundary** | Vùng bao quanh component để handle loading                |
| **Error Boundary**    | Handle errors khi data fetching thất bại                  |
| **Waterfall**         | Hiệu ứng xấu khi các component load tuần tự               |

---

_Updated: 2026-01-30_
