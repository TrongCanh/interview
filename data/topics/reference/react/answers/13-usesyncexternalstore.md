# useSyncExternalStore / useSyncExternalStore

## Định nghĩa / Definition

[`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore) là một hook trong React cho phép bạn **đọc và subscribe đến external store** mà không cần React state. Nó được thiết kế để tích hợp với các state management libraries không phải React (như Redux, Zustand, MobX, v.v.).

## Cú pháp / Syntax

```javascript
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```

## Tham số / Parameters

| Tham số             | Kiểu                | Mô tả                                                 |
| ------------------- | ------------------- | ----------------------------------------------------- |
| `subscribe`         | Function            | Function nhận callback và trả về unsubscribe function |
| `getSnapshot`       | Function            | Function trả về snapshot hiện tại của store           |
| `getServerSnapshot` | Function (optional) | Function trả về snapshot server-side (cho SSR)        |

## Giá trị trả về / Return Value

| Giá trị    | Kiểu | Mô tả                                |
| ---------- | ---- | ------------------------------------ |
| `snapshot` | Any  | Snapshot hiện tại của external store |

## Cách hoạt động / How it Works

### Subscription Pattern

`useSyncExternalStore` subscribe đến external store và re-render khi store thay đổi:

```javascript
const snapshot = useSyncExternalStore(
  // Subscribe function
  (callback) => {
    const unsubscribe = store.subscribe(callback);
    return unsubscribe;
  },
  // Get snapshot function
  () => store.getSnapshot(),
);
```

### Server-Side Rendering (SSR)

Với SSR, `getServerSnapshot` được dùng để lấy snapshot server-side:

```javascript
const snapshot = useSyncExternalStore(
  (callback) => store.subscribe(callback),
  () => store.getSnapshot(),
  () => store.getServerSnapshot(), // SSR
);
```

### Re-render Trigger

Component re-render khi external store thay đổi.

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { useSyncExternalStore } from "react";

// External store (ví dụ: Redux)
const store = {
  subscribe: (listener) => {
    const unsubscribe = reduxStore.subscribe(listener);
    return unsubscribe;
  },
  getSnapshot: () => reduxStore.getState(),
  getServerSnapshot: () => reduxStore.getState(), // SSR
};

function Counter() {
  const snapshot = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  return <div>Count: {snapshot.count}</div>;
}
```

### Ví dụ với Zustand

```jsx
import { useSyncExternalStore } from "react";
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

function Counter() {
  const snapshot = useSyncExternalStore(useStore);

  return (
    <div>
      <p>Count: {snapshot.count}</p>
      <button onClick={snapshot.increment}>+</button>
      <button onClick={snapshot.decrement}>-</button>
    </div>
  );
}
```

### Ví dụ với Redux

```jsx
import { useSyncExternalStore } from "react";
import { useSelector } from "react-redux";

// Custom hook với useSyncExternalStore
function useReduxStore(selector) {
  return useSyncExternalStore(
    (callback) => store.subscribe(callback),
    () => selector(store.getState()),
    () => selector(store.getState()), // SSR
  );
}

function Counter() {
  const count = useReduxStore((state) => state.counter);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => store.dispatch({ type: "INCREMENT" })}>+</button>
    </div>
  );
}
```

### Ví dụ với Browser API

```jsx
import { useSyncExternalStore } from "react";

function useMediaQuery(query) {
  return useSyncExternalStore(
    (callback) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", callback);
      return () => mediaQueryList.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
  );
}

function ResponsiveComponent() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return <div>{isMobile ? "Mobile" : "Desktop"}</div>;
}
```

### Ví dụ với TypeScript

```tsx
import { useSyncExternalStore } from "react";

interface Store {
  subscribe: (callback: (state: State) => void) => () => void;
  getSnapshot: () => State;
  getServerSnapshot?: () => State;
}

interface State {
  count: number;
}

function useCustomStore<T>(store: Store) {
  return useSyncExternalStore<T>(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
}

function Counter() {
  const store = {
    subscribe: (callback) => {
      const unsubscribe = externalStore.subscribe(callback);
      return unsubscribe;
    },
    getSnapshot: () => externalStore.getState(),
    getServerSnapshot: () => externalStore.getState(),
  };

  const snapshot = useCustomStore<{ count: number }>(store);

  return <div>Count: {snapshot.count}</div>;
}
```

### Ví dụ với Multiple Stores

```jsx
import { useSyncExternalStore } from "react";

function useMultipleStores() {
  const userSnapshot = useSyncExternalStore(
    userStore.subscribe,
    userStore.getSnapshot,
  );
  const cartSnapshot = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
  );

  return (
    <div>
      <p>User: {userSnapshot.name}</p>
      <p>Cart Items: {cartSnapshot.items.length}</p>
    </div>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi dùng state management libraries không phải React (Redux, Zustand, MobX, v.v.)
- Khi cần subscribe đến external stores
- Khi cần read-only access đến external state
- Khi dùng Server-Side Rendering (SSR)
- Khi cần integrate với các external systems

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi có thể dùng React state (`useState`, `useReducer`)
- Khi store là React-based
- Khi không cần subscription đến external store
- Khi component không cần read store state

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `useSyncExternalStore`, bạn sẽ gặp các vấn đề sau:

1. **Không thể sync với external stores**: Không có cách nào để subscribe đến external stores và re-render khi store thay đổi.

2. **SSR hydration mismatches**: Với SSR, không có cách nào để sync server và client state.

3. **Manual subscriptions**: Phải tự quản lý subscriptions và cleanup, code phức tạp hơn.

## Vấn đề được giải quyết / Problems Solved

### 1. External Store Integration

`useSyncExternalStore` cho phép integrate với external state management libraries một cách chuẩn.

### 2. Automatic Subscription Management

Tự động subscribe và unsubscribe khi component mount/unmount.

### 3. SSR Support

Hỗ trợ Server-Side Rendering với `getServerSnapshot`.

## Ưu điểm / Advantages

1. **External store integration**: Dễ dàng integrate với Redux, Zustand, MobX, v.v.

2. **Automatic cleanup**: Tự động unsubscribe khi component unmount.

3. **SSR support**: Hỗ trợ Server-Side Rendering.

4. **TypeScript support**: Tốt với TypeScript.

## Nhược điểm / Disadvantages

1. **Complex API**: API phức tạp hơn `useState` hoặc `useReducer`.

2. **External dependency**: Phụ thuộc vào external store implementation.

3. **Limited use cases**: Chỉ hữu ích khi dùng external stores.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm          | useSyncExternalStore | useState | Redux useSelector |
| ----------------- | -------------------- | -------- | ----------------- | ---------- |
| External store    | Có                   | Không    | Có                | Có         |
| SSR support       | Có                   | Có       | Có                | Có         |
| Automatic cleanup | Có                   | Có       | Không             | Có         |
| API complexity    | Phức tạp             | Đơn giản | Trung bình        | Trung bình |

## Best Practices / Các thực hành tốt

1. **Dùng với external store libraries**:

   ```javascript
   const snapshot = useSyncExternalStore(
     store.subscribe,
     store.getSnapshot,
     store.getServerSnapshot,
   );
   ```

2. **Cleanup subscriptions**:

   ```javascript
   useSyncExternalStore(
     (callback) => {
       const unsubscribe = store.subscribe(callback);
       return unsubscribe;
     },
     () => store.getSnapshot(),
   );
   ```

3. **Dùng TypeScript để type store**:
   ```typescript
   interface Store {
     subscribe: (callback: (state: State) => void) => () => void;
     getSnapshot: () => State;
   }
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Not Implementing getServerSnapshot

```javascript
// ❌ Sai - không có getServerSnapshot cho SSR
const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot);

// ✅ Đúng - thêm getServerSnapshot
const snapshot = useSyncExternalStore(
  store.subscribe,
  store.getSnapshot,
  store.getServerSnapshot,
);
```

### 2. Not Cleaning Up

```javascript
// ❌ Sai - memory leak
useSyncExternalStore(
  (callback) => store.subscribe(callback),
  () => store.getSnapshot(),
);

// ✅ Đúng - cleanup tự động
// useSyncExternalStore tự động unsubscribe khi component unmount
```

## Performance Considerations / Yếu tố hiệu suất

1. **Subscription overhead**: Có overhead để subscribe/unsubscribe.

2. **Re-render on change**: Component re-render khi store thay đổi.

## Câu hỏi phỏng vấn / Interview Questions

1. `useSyncExternalStore` là gì? Khi nào nên dùng?

2. `useSyncExternalStore` hoạt động như thế nào?

3. Khi nào nên dùng `useSyncExternalStore` thay vì `useSelector`?

4. Làm thế nào để integrate với Redux?

5. Làm thế nào để integrate với Zustand?

6. `getServerSnapshot` là gì? Khi nào cần?

7. Làm thế nào để subscribe đến external store?

8. Làm thế nào để cleanup subscriptions?

9. Làm thế nào để type `useSyncExternalStore` với TypeScript?

10. SSR support trong `useSyncExternalStore` hoạt động như thế nào?

11. Performance considerations với `useSyncExternalStore`?

12. Làm thế nào để debug `useSyncExternalStore`?

13. Làm thế nào để handle store changes?

14. Làm thế nào để avoid re-renders?

15. Làm thế nào để combine multiple stores?

## Tài liệu tham khảo / References

- [useSyncExternalStore - React Official Docs](https://react.dev/reference/react/useSyncExternalStore)
- [Integrating with External Systems - React Official Docs](https://react.dev/learn/scaling-up-with-reducer-and-context)

---

_Last updated: 2026-01-31_
