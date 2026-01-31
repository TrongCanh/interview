# cacheSignal / cacheSignal

## Định nghĩa / Definition

[`cacheSignal`](https://react.dev/reference/react/cacheSignal) là một API trong React cho phép bạn tạo **signals** để control cache invalidation. Nó giúp invalidate cache entries khi cần thiết.

## Cú pháp / Syntax

```javascript
const signal = cacheSignal();
```

## Tham số / Parameters

Không có tham số.

## Giá trị trả về / Return Value

| Giá trị  | Kiểu     | Mô tả                                         |
| -------- | -------- | --------------------------------------------- |
| `signal` | `object` | Signal object với method để invalidate cache. |

## Cách hoạt động / How it Works

### Signal Methods

Signal object có các methods:

| Method         | Mô tả                   |
| -------------- | ----------------------- |
| `invalidate()` | Invalidate cache entry. |
| `dispose()`    | Dispose signal.         |

### Cache Invalidation

Khi `invalidate()` được gọi, cache entry liên quan sẽ bị invalidated:

```
cache(fn)(args) → Cache result
signal.invalidate() → Invalidate cache
cache(fn)(args) → Execute fn again (cache miss)
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { cache, cacheSignal } from "react";

const fetchUser = cache(async (userId, signal) => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

function UserProfile({ userId }) {
  const user = use(fetchUser(userId));

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={() => invalidateUserCache(userId)}>Refresh</button>
    </div>
  );
}
```

### Ví dụ với Manual Invalidation

```jsx
import { cache, cacheSignal } from "react";

const fetchProducts = cache(async (category, signal) => {
  const response = await fetch(`/api/products?category=${category}`);
  return response.json();
});

function ProductList({ category }) {
  const products = use(fetchProducts(category));
  const [signal] = useState(() => cacheSignal());

  const handleRefresh = () => {
    signal.invalidate();
  };

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}
```

### Ví dụ với Multiple Signals

```jsx
import { cache, cacheSignal } from "react";

const fetchUser = cache(async (userId, signal) => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

const fetchPosts = cache(async (userId, signal) => {
  const response = await fetch(`/api/posts?userId=${userId}`);
  return response.json();
});

function Dashboard({ userId }) {
  const user = use(fetchUser(userId));
  const posts = use(fetchPosts(userId));

  const userSignal = cacheSignal();
  const postsSignal = cacheSignal();

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={() => userSignal.invalidate()}>Refresh User</button>
      <button onClick={() => postsSignal.invalidate()}>Refresh Posts</button>
      <PostList posts={posts} />
    </div>
  );
}
```

### Ví dụ với Auto Invalidation

```jsx
import { cache, cacheSignal, useEffect } from "react";

const fetchUser = cache(async (userId, signal) => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

function UserProfile({ userId }) {
  const user = use(fetchUser(userId));
  const [signal] = useState(() => cacheSignal());

  useEffect(() => {
    // Auto invalidate sau 5 phút
    const interval = setInterval(
      () => {
        signal.invalidate();
      },
      5 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, [signal]);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### Ví dụ với TypeScript

```tsx
import { cache, cacheSignal } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const fetchUser = cache(async (userId: number, signal: any): Promise<User> => {
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

- Khi cần control cache invalidation
- Khi muốn invalidate cache entries thủ công
- Khi có auto refresh requirements
- Khi cần manual cache control

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi không cần cache invalidation
- Khi cache tự động invalidate
- Khi không cần manual control

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `cacheSignal`:

1. **No invalidation control**: Không thể invalidate cache entries thủ công.

2. **Stale data**: Cache có thể trả về stale data.

3. **Manual refresh**: Phải implement manual refresh logic.

## Vấn đề được giải quyết / Problems Solved

### 1. Cache Invalidation

Control cache invalidation thủ công.

### 2. Manual Refresh

Dễ implement manual refresh logic.

### 3. Auto Invalidation

Có thể implement auto invalidation với timers.

## Ưu điểm / Advantages

1. **Simple API**: Dễ sử dụng.

2. **Manual control**: Có thể invalidate cache thủ công.

3. **Auto refresh**: Có thể implement auto invalidation.

4. **TypeScript support**: Tốt với TypeScript.

## Nhược điểm / Disadvantages

1. **React 19+**: Chỉ hoạt động với React 19 trở lên.

2. **Manual management**: Phải quản lý signals thủ công.

3. **No auto invalidation**: Không có built-in auto invalidation.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm            | cacheSignal | SWR  | TanStack Query |
| ------------------- | ----------- | ---- | -------------- |
| Manual invalidation | Có          | Có   | Có             |
| Auto invalidation   | Có thể      | Có   | Có             |
| Simple API          | Có          | Có   | Có             |
| Learning curve      | Thấp        | Thấp | Thấp           |

## Best Practices / Các thực hành tốt

1. **Dùng với cache**:

   ```jsx
   const fetchUser = cache(async (userId, signal) => {
     return fetch(`/api/users/${userId}`);
   });
   ```

2. **Implement auto refresh**:

   ```jsx
   useEffect(() => {
     const interval = setInterval(() => {
       signal.invalidate();
     }, 60000);
     return () => clearInterval(interval);
   }, [signal]);
   ```

3. **Type the signal**:
   ```tsx
   const fetchUser = cache(async (userId: number, signal: any) => {
     return fetch(`/api/users/${userId}`);
   });
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Not Using Signal

```jsx
// ❌ Không dùng signal
const fetchUser = cache(async (userId) => {
  return fetch(`/api/users/${userId}`);
});

// ✅ Đúng - dùng signal
const fetchUser = cache(async (userId, signal) => {
  return fetch(`/api/users/${userId}`);
});
```

### 2. Forgetting Invalidation

```jsx
// ❌ Không invalidate cache
<button onClick={handleClick}>Refresh</button>

// ✅ Đúng - invalidate cache
<button onClick={() => signal.invalidate()}>Refresh</button>
```

### 3. Using in Wrong React Version

```jsx
// ❌ Không hoạt động với React < 19
// cacheSignal chỉ có sẵn từ React 19

// ✅ Kiểm tra version
import { cacheSignal } from "react"; // React 19+
```

## Performance Considerations / Yếu tố hiệu suất

1. **Cache efficiency**: Giảm requests không cần thiết.

2. **Memory overhead**: Có memory overhead cho cache.

3. **Invalidation cost**: Invalidation có cost nhỏ.

## Browser Support / Hỗ trợ trình duyệt

`cacheSignal` hoạt động trên tất cả trình duyệt hỗ trợ React 19+.

## Câu hỏi phỏng vấn / Interview Questions

1. `cacheSignal` là gì? Khi nào nên dùng?

2. `cacheSignal` hoạt động như thế nào?

3. Làm thế nào để invalidate cache với `cacheSignal`?

4. `cacheSignal` có những methods nào?

5. `cacheSignal` giúp với stale data như thế nào?

6. `cacheSignal` có hoạt động với React 18 không?

7. Làm thế nào để implement auto refresh với `cacheSignal`?

8. `cacheSignal` có hoạt động với SSR không?

9. `cacheSignal` có hoạt động với TypeScript không?

10. Làm thế nào để test components với `cacheSignal`?

11. Có thể tạo multiple signals không?

12. `cacheSignal` khác gì với manual cache invalidation?

13. Làm thế nào `cacheSignal` kết hợp với `cache`?

14. Khi nào không nên dùng `cacheSignal`?

15. `cacheSignal` có hoạt động với class components không?

## Tài liệu tham khảo / References

- [cacheSignal - React Official Docs](https://react.dev/reference/react/cacheSignal)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [cache - React Docs](https://react.dev/reference/react/cache)

---

_Last updated: 2026-01-31_
