# use / use

## Định nghĩa / Definition

[`use`](https://react.dev/reference/react/use) là một API trong React cho phép bạn **đọc resources** như Promises hoặc Contexts trong components. Nó hỗ trợ cả Client và Server Components.

## Cú pháp / Syntax

```javascript
const value = use(resource);
```

## Tham số / Parameters

| Tham số    | Kiểu                   | Mô tả                                     |
| ---------- | ---------------------- | ----------------------------------------- |
| `resource` | `Promise` \| `Context` | Resource muốn đọc (Promise hoặc Context). |

## Giá trị trả về / Return Value

| Giá trị | Kiểu  | Mô tả                                                     |
| ------- | ----- | --------------------------------------------------------- |
| `value` | `any` | Giá trị của resource (Promise result hoặc Context value). |

## Cách hoạt động / How it Works

### Reading Promises

Khi đọc một Promise, component sẽ **suspend** cho đến khi Promise resolve:

```jsx
const data = use(fetchData());
// Component suspend cho đến khi fetchData() resolve
```

### Reading Contexts

Khi đọc một Context, component sẽ đọc giá trị hiện tại:

```jsx
const theme = use(ThemeContext);
// Tương đương với useContext(ThemeContext)
```

### Comparison with useContext

| Đặc điểm          | use | useContext |
| ----------------- | --- | ---------- |
| Supports Promises | Có  | Không      |
| Supports Contexts | Có  | Có         |
| Suspense support  | Có  | Không      |
| Server Components | Có  | Có         |

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { use, Suspense } from "react";

function UserProfile() {
  const user = use(fetchUser());
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <UserProfile />
    </Suspense>
  );
}
```

### Ví dụ với Multiple Promises

```jsx
import { use, Suspense } from "react";

function Dashboard() {
  const user = use(fetchUser());
  const posts = use(fetchPosts());
  const stats = use(fetchStats());

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <Stats data={stats} />
      <PostList posts={posts} />
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <Dashboard />
    </Suspense>
  );
}
```

### Ví dụ với Context

```jsx
import { use, createContext } from "react";

const ThemeContext = createContext("light");

function ThemedComponent() {
  const theme = use(ThemeContext);
  return <div className={theme}>Themed content</div>;
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedComponent />
    </ThemeContext.Provider>
  );
}
```

### Ví dụ với Conditional Resources

```jsx
import { use, Suspense, useState } from "react";

function DataViewer({ userId }) {
  const user = use(userId ? fetchUser(userId) : Promise.resolve(null));

  if (!user) {
    return <div>No user selected</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <div>
      <button onClick={() => setSelectedUserId(1)}>User 1</button>
      <button onClick={() => setSelectedUserId(2)}>User 2</button>
      <Suspense fallback={<div>Loading...</div>}>
        <DataViewer userId={selectedUserId} />
      </Suspense>
    </div>
  );
}
```

### Ví dụ với Server Components

```jsx
// Server Component
import { use } from "react";

async function UserProfile({ userId }) {
  const user = use(fetchUser(userId));

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### Ví dụ với Error Handling

```jsx
import { use, Suspense, ErrorBoundary } from "react";

function UserProfile() {
  const user = use(fetchUser());
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<div>Loading user...</div>}>
        <UserProfile />
      </Suspense>
    </ErrorBoundary>
  );
}
```

### Ví dụ với TypeScript

```tsx
import { use } from "react";

interface User {
  name: string;
  email: string;
}

function UserProfile({ userId }: { userId: number }) {
  const user = use<User>(fetchUser(userId));

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi muốn read Promises trong components
- Khi muốn read Contexts trong Server Components
- Khi muốn suspense data fetching
- Khi muốn đơn giản hóa data reading logic

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi không cần suspend (dùng `await` hoặc `then`)
- Khi dùng Client Components với Context (dùng `useContext`)
- Khi không cần Suspense pattern

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `use`:

1. **Manual async handling**: Phải tự handle Promises với `await` hoặc `then`.

2. **No Suspense support**: Không tận dụng được Suspense pattern.

3. **Server Components limitation**: Không thể dễ dàng read Contexts trong Server Components.

## Vấn đề được giải quyết / Problems Solved

### 1. Simplified Async Reading

Đọc Promises đơn giản hơn với `use`.

### 2. Suspense Support

Tự động suspend khi Promise chưa resolve.

### 3. Server Components

Dễ read Contexts trong Server Components.

### 4. Unified API

Một API cho cả Promises và Contexts.

## Ưu điểm / Advantages

1. **Simple API**: Dễ sử dụng với cú pháp đơn giản.

2. **Suspense support**: Tự động suspend khi cần.

3. **Works with Server Components**: Hỗ trợ Server Components.

4. **Unified**: Một API cho cả Promises và Contexts.

5. **TypeScript support**: Tốt với TypeScript.

## Nhược điểm / Disadvantages

1. **React 19+**: Chỉ hoạt động với React 19 trở lên.

2. **Requires Suspense**: Phải wrap trong Suspense.

3. **Limited control**: Ít control hơn so với manual async handling.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm          | use | useContext | await/then |
| ----------------- | --- | ---------- | ---------- |
| Promises          | Có  | Không      | Có         |
| Contexts          | Có  | Có         | Không      |
| Suspense          | Có  | Không      | Không      |
| Server Components | Có  | Có         | Không      |
| Simple API        | Có  | Có         | Không      |

## Best Practices / Các thực hành tốt

1. **Dùng với Suspense**:

   ```jsx
   <Suspense fallback={<Loading />}>
     <ComponentWithUse />
   </Suspense>
   ```

2. **Kết hợp với Error Boundary**:

   ```jsx
   <ErrorBoundary fallback={<Error />}>
     <Suspense fallback={<Loading />}>
       <ComponentWithUse />
     </Suspense>
   </ErrorBoundary>
   ```

3. **Dùng cho Server Components**:

   ```jsx
   async function ServerComponent() {
     const data = use(fetchData());
     return <div>{data}</div>;
   }
   ```

4. **Type the resource**:
   ```tsx
   const user = use<User>(fetchUser());
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Not Using with Suspense

```jsx
// ❌ Sai - không có Suspense
function Component() {
  const data = use(fetchData());
  return <div>{data}</div>;
}

// ✅ Đúng - có Suspense
<Suspense fallback={<Loading />}>
  <Component />
</Suspense>;
```

### 2. Using in Wrong React Version

```jsx
// ❌ Không hoạt động với React < 19
// use chỉ có sẵn từ React 19

// ✅ Kiểm tra version
import { use } from "react"; // React 19+
```

### 3. Not Handling Errors

```jsx
// ❌ Không có Error Boundary
<Suspense fallback={<Loading />}>
  <ComponentWithUse />
</Suspense>

// ✅ Có Error Boundary
<ErrorBoundary fallback={<Error />}>
  <Suspense fallback={<Loading />}>
    <ComponentWithUse />
  </Suspense>
</ErrorBoundary>
```

### 4. Using useContext in Server Components

```jsx
// ❌ Không nên dùng useContext trong Server Components
import { useContext } from "react";
const theme = useContext(ThemeContext);

// ✅ Dùng use trong Server Components
import { use } from "react";
const theme = use(ThemeContext);
```

## Performance Considerations / Yếu tố hiệu suất

1. **Suspense optimization**: Tự động optimize với Suspense.

2. **Server Components**: Tối ưu cho Server Components.

3. **Minimal overhead**: Có overhead nhỏ.

## Browser Support / Hỗ trợ trình duyệt

`use` hoạt động trên tất cả trình duyệt hỗ trợ React 19+.

## Câu hỏi phỏng vấn / Interview Questions

1. `use` là gì? Khi nào nên dùng?

2. `use` hoạt động như thế nào?

3. Sự khác biệt giữa `use` và `useContext`?

4. `use` có hỗ trợ Promises không?

5. `use` có hoạt động với Server Components không?

6. Tại sao cần dùng `Suspense` với `use`?

7. `use` có hoạt động với React 18 không?

8. Làm thế nào để handle errors với `use`?

9. `use` có hoạt động với TypeScript không?

10. Làm thế nào `use` giúp đơn giản hóa async data reading?

11. Có thể dùng `use` với multiple resources không?

12. `use` có hoạt động với SSR không?

13. Làm thế nào để test components với `use`?

14. Khi nào nên dùng `use` thay vì `useContext`?

15. `use` có hoạt động với class components không?

## Tài liệu tham khảo / References

- [use - React Official Docs](https://react.dev/reference/react/use)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [Suspense - React Docs](https://react.dev/reference/react/Suspense)

---

_Last updated: 2026-01-31_
