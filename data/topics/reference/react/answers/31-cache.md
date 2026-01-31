# cache / cache

## Định nghĩa / Definition

[`cache`](https://react.dev/reference/react/cache) là một API trong React cho phép bạn **cache async operations** để tránh duplicate requests và improve performance.

## Cú pháp / Syntax

```javascript
const cachedFn = cache(asyncFunction);
```

## Tham số / Parameters

| Tham số         | Kiểu       | Mô tả                      |
| --------------- | ---------- | -------------------------- |
| `asyncFunction` | `function` | Async function muốn cache. |

## Giá trị trả về / Return Value

Trả về một cached version của async function.

## Cách hoạt động / How it Works

### Caching Mechanism

`cache` lưu kết quả của async function và trả về cached result cho các calls tương tự:

```
cache(fn)(args) → Execute fn → Cache result → Return result
cache(fn)(args) → Return cached result (skip execution)
```

### Cache Key

Cache key được tạo từ function arguments:

```javascript
const cachedFetch = cache(fetch);
cachedFetch("/api/data"); // Execute and cache
cachedFetch("/api/data"); // Return cached result
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { cache } from "react";

const fetchData = cache(async (url) => {
  const response = await fetch(url);
  return response.json();
});

function UserProfile({ userId }) {
  const user = use(fetchData(`/api/users/${userId}`));
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### Ví dụ với Multiple Calls

```jsx
import { cache } from "react";

const fetchProducts = cache(async (category) => {
  const response = await fetch(`/api/products?category=${category}`);
  return response.json();
});

function ProductList({ category }) {
  const products = use(fetchProducts(category));
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

// Multiple components với cùng category sẽ dùng cached result
function App() {
  return (
    <div>
      <ProductList category="electronics" />
      <ProductList category="electronics" />
    </div>
  );
}
```

### Ví dụ với Cache Invalidation

```jsx
import { cache } from "react";

const fetchUser = cache(async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

function UserProfile({ userId }) {
  const user = use(fetchUser(userId));
  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={() => invalidateCache(userId)}>Refresh</button>
    </div>
  );
}
```

### Ví dụ với Multiple Functions

```jsx
import { cache } from "react";

const fetchUser = cache(async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

const fetchPosts = cache(async (userId) => {
  const response = await fetch(`/api/posts?userId=${userId}`);
  return response.json();
});

function Dashboard({ userId }) {
  const user = use(fetchUser(userId));
  const posts = use(fetchPosts(userId));

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <PostList posts={posts} />
    </div>
  );
}
```

### Ví dụ với Error Handling

```jsx
import { cache } from "react";

const fetchWithCache = cache(async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
});

function DataComponent({ url }) {
  const data = use(fetchWithCache(url));
  return <div>{JSON.stringify(data)}</div>;
}
```

### Ví dụ với TypeScript

```tsx
import { cache } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const fetchUser = cache(async (userId: number): Promise<User> => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

function UserProfile({ userId }: { userId: number }) {
  const user = use(fetchUser(userId));
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi có async operations tốn kém
- Khi muốn avoid duplicate requests
- Khi có multiple components cần cùng data
- Khi muốn improve performance
- Khi làm việc với data fetching

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi data thay đổi thường xuyên
- Khi cần fresh data mỗi lần
- Khi operations không tốn kém

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `cache`:

1. **Duplicate requests**: Cùng operation có thể execute nhiều lần.

2. **Poor performance**: Async operations tốn kém chạy lặp lại.

3. **Network overhead**: Nhiều network requests không cần thiết.

## Vấn đề được giải quyết / Problems Solved

### 1. Avoid Duplicate Requests

Cache kết quả để tránh duplicate requests.

### 2. Improve Performance

Tối ưu performance bằng cách tránh repeat operations.

### 3. Simple API

Dễ cache async operations với cú pháp đơn giản.

## Ưu điểm / Advantages

1. **Simple API**: Dễ sử dụng.

2. **Automatic caching**: Tự động cache kết quả.

3. **Performance**: Tối ưu performance.

4. **TypeScript support**: Tốt với TypeScript.

## Nhược điểm / Disadvantages

1. **React 19+**: Chỉ hoạt động với React 19 trở lên.

2. **Stale data**: Có thể trả về stale data.

3. **No invalidation**: Không có built-in invalidation mechanism.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm       | cache | SWR  | TanStack Query | Manual |
| -------------- | ----- | ---- | -------------- | ------ |
| Automatic      | Có    | Có   | Có             | Không  |
| Simple API     | Có    | Có   | Có             | Không  |
| Invalidation   | Không | Có   | Có             | Có     |
| Learning curve | Thấp  | Thấp | Thấp           | Cao    |

## Best Practices / Các thực hành tốt

1. **Dùng cho expensive operations**:

   ```jsx
   const expensiveFetch = cache(async (url) => {
     return fetch(url).then((r) => r.json());
   });
   ```

2. **Kết hợp với Suspense**:

   ```jsx
   <Suspense fallback={<Loading />}>
     <ComponentWithCache />
   </Suspense>
   ```

3. **Handle errors properly**:

   ```jsx
   const cachedFetch = cache(async (url) => {
     try {
       return await fetch(url);
     } catch (error) {
       throw error;
     }
   });
   ```

4. **Type the function**:
   ```tsx
   const fetchUser = cache(async (id: number): Promise<User> => {
     return fetch(`/api/users/${id}`);
   });
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Caching Everything

```jsx
// ❌ Không cần cache tất cả
const simpleFetch = cache(fetch);

// ✅ Chỉ cache expensive operations
const expensiveFetch = cache(async (url) => {
  return await expensiveOperation(url);
});
```

### 2. Not Handling Stale Data

```jsx
// ❌ Không handle stale data
const cachedFetch = cache(fetch);

// ✅ Implement invalidation
const cachedFetch = cache(fetch);
function invalidate(url) {
  // Invalidate cache cho url
}
```

### 3. Using in Wrong React Version

```jsx
// ❌ Không hoạt động với React < 19
// cache chỉ có sẵn từ React 19

// ✅ Kiểm tra version
import { cache } from "react"; // React 19+
```

### 4. Not Understanding Cache Key

```jsx
// ❌ Không hiểu cache key
const fetchUser = cache(async (id) => {
  return fetch(`/api/users/${id}`);
});
// Cache key dựa trên id

// ✅ Hiểu cache key
// Cache key được tạo từ function arguments
```

## Performance Considerations / Yếu tố hiệu suất

1. **Reduced requests**: Giảm số requests không cần thiết.

2. **Memory usage**: Có memory overhead cho cache.

3. **Cache hit rate**: Tốt nhất cho operations được gọi nhiều lần.

## Browser Support / Hỗ trợ trình duyệt

`cache` hoạt động trên tất cả trình duyệt hỗ trợ React 19+.

## Câu hỏi phỏng vấn / Interview Questions

1. `cache` là gì? Khi nào nên dùng?

2. `cache` hoạt động như thế nào?

3. Cache key được tạo như thế nào?

4. `cache` giúp improve performance như thế nào?

5. `cache` có hoạt động với React 18 không?

6. Làm thế nào để invalidate cache?

7. `cache` có hoạt động với SSR không?

8. `cache` có hoạt động với TypeScript không?

9. Làm thế nào để test components với `cache`?

10. Khi nào không nên dùng `cache`?

11. `cache` khác gì với SWR?

12. `cache` có hoạt động với async functions không?

13. Làm thế nào `cache` giúp với duplicate requests?

14. Có thể nest `cache` không?

15. `cache` có hoạt động với class components không?

## Tài liệu tham khảo / References

- [cache - React Official Docs](https://react.dev/reference/react/cache)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [Suspense - React Docs](https://react.dev/reference/react/Suspense)

---

_Last updated: 2026-01-31_
