# useDebugValue / useDebugValue

## Định nghĩa / Definition

[`useDebugValue`](https://react.dev/reference/react/useDebugValue) là một hook trong React cho phép bạn **hiển thị label tùy chỉnh** cho custom hooks trong React DevTools. Nó giúp debug custom hooks dễ dàng hơn bằng cách hiển thị thông tin hữu ích.

## Cú pháp / Syntax

```javascript
useDebugValue(value, formatter?)
```

## Tham số / Parameters

| Tham số     | Kiểu                | Mô tả                                      |
| ----------- | ------------------- | ------------------------------------------ |
| `value`     | Any                 | Giá trị cần hiển thị trong DevTools        |
| `formatter` | Function (optional) | Function nhận value và trả về label string |

## Giá trị trả về / Return Value

Không có giá trị trả về.

## Cách hoạt động / How it Works

### Debug Label Display

`useDebugValue` hiển thị label trong React DevTools khi inspect custom hook:

```javascript
function useCustomHook() {
  const [value, setValue] = useState(0);

  useDebugValue(value, (val) => `Count: ${val}`);

  return [value, setValue];
}
```

### Formatter Function

Formatter function cho phép tùy chỉnh label hiển thị:

```javascript
useDebugValue(value, (val) => {
  // Custom formatting logic
  if (typeof val === "object") {
    return `Object: ${JSON.stringify(val)}`;
  }
  return `Value: ${val}`;
});
```

### DevTools Integration

Label chỉ hiển thị trong React DevTools, không ảnh hưởng đến production build:

```javascript
// Development mode
useDebugValue(value, formatter);

// Production mode
// useDebugValue không có effect
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { useState, useDebugValue } from "react";

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  useDebugValue(count, (c) => `Count: ${c}`);

  return [count, setCount];
}

function Counter() {
  const [count, setCount] = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
    </div>
  );
}
```

### Ví dụ với Object State

```jsx
function useUserProfile(initialUser) {
  const [user, setUser] = useState(initialUser);

  useDebugValue(user, (u) => {
    if (u) {
      return `User: ${u.name} (${u.email})`;
    }
    return "No user";
  });

  return [user, setUser];
}

function UserProfile() {
  const [user, setUser] = useUserProfile(null);

  return (
    <div>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      ) : (
        <button
          onClick={() => setUser({ name: "John", email: "john@example.com" })}
        >
          Login
        </button>
      )}
    </div>
  );
}
```

### Ví dụ với Complex Data

```jsx
function useDataFetcher(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useDebugValue({ data, loading, error }, (val) => {
    const status = val.loading ? "Loading" : val.error ? "Error" : "Success";
    return `Data Fetcher: ${status} (${val.data?.length || 0} items)`;
  });

  // Fetch logic...
  return { data, loading, error };
}
```

### Ví dụ với TypeScript

```tsx
import { useState, useDebugValue } from "react";

interface User {
  name: string;
  email: string;
}

function useUserState(initialUser: User | null) {
  const [user, setUser] = useState<User | null>(initialUser);

  useDebugValue(user, (u: User | null) => {
    return u ? `User: ${u.name}` : "No user";
  });

  return [user, setUser];
}
```

### Ví dụ với Multiple Debug Values

```jsx
function useComplexHook() {
  const [state1, setState1] = useState(0);
  const [state2, setState2] = useState("");
  const [state3, setState3] = useState(false);

  useDebugValue(state1, (s) => `State1: ${s}`);
  useDebugValue(state2, (s) => `State2: ${s}`);
  useDebugValue(state3, (s) => `State3: ${s}`);

  return { state1, setState1, state2, setState2, state3, setState3 };
}
```

## Khi nào nên dùng / When to Use

- Khi tạo custom hooks cần debug
- Khi hook có state hoặc data phức tạp
- Khi cần hiển thị thông tin hữu ích trong DevTools
- Khi cần debug hook behavior
- Khi hook có nhiều internal states

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi hook đơn giản và không cần debug
- Khi hook không có state hoặc data cần hiển thị
- Trong production builds (không có DevTools)

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `useDebugValue`, bạn sẽ gặp các vấn đề sau:

1. **Khó debug custom hooks**: Không có cách nào để hiển thị thông tin hữu ích trong DevTools.

2. **Không biết hook state**: Không thể dễ dàng xem hook state trong DevTools.

3. **Debug time-consuming**: Phải dùng console.log hoặc debugger để debug hook behavior.

## Vấn đề được giải quyết / Problems Solved

### 1. Custom Hook Debugging

`useDebugValue` giúp debug custom hooks dễ dàng hơn bằng cách hiển thị label trong React DevTools.

### 2. State Visibility

Giúp hiển thị hook state trong DevTools, dễ dàng inspect và debug.

## Ưu điểm / Advantages

1. **Easy debugging**: Giúp debug custom hooks dễ dàng hơn.

2. **DevTools integration**: Tích hợp tốt với React DevTools.

3. **Custom formatting**: Có thể tùy chỉnh label hiển thị.

4. **No production impact**: Không có effect trong production builds.

## Nhược điểm / Disadvantages

1. **DevTools only**: Chỉ hoạt động trong DevTools, không có effect trong production.

2. **Limited use**: Chỉ hữu ích cho debugging, không có giá trị trong production.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm             | useDebugValue | console.log | Debugger |
| -------------------- | ------------- | ----------- | -------- |
| DevTools integration | Có            | Không       | Có       |
| Production impact    | Không         | Có          | Có       |
| Custom formatting    | Có            | Không       | Có       |

## Best Practices / Các thực hành tốt

1. **Dùng cho custom hooks**:

   ```javascript
   function useCustomHook() {
     const [value, setValue] = useState(0);
     useDebugValue(value, (v) => `Value: ${v}`);
     return [value, setValue];
   }
   ```

2. **Dùng formatter để tùy chỉnh label**:

   ```javascript
   useDebugValue(value, (val) => {
     // Custom formatting logic
     return `Formatted: ${val}`;
   });
   ```

3. **Hiển thị thông tin hữu ích**:
   ```javascript
   useDebugValue({ data, loading, error }, (val) => {
     return `Status: ${val.loading ? "Loading" : val.error ? "Error" : "Success"}`;
   });
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Using in Production

```javascript
// ❌ Không cần thiết - không có effect trong production
useDebugValue(value, formatter);

// ✅ Đúng - chỉ dùng trong development
if (process.env.NODE_ENV === "development") {
  useDebugValue(value, formatter);
}
```

### 2. Overusing

```javascript
// ❌ Sai - quá nhiều debug values
useDebugValue(value1, formatter1);
useDebugValue(value2, formatter2);
useDebugValue(value3, formatter3);

// ✅ Đúng - chỉ dùng khi cần thiết
useDebugValue({ value1, value2, value3 }, (val) => {
  // Combined formatting
});
```

## Performance Considerations / Yếu tố hiệu suất

1. **No production overhead**: Không có effect trong production builds.

2. **Minimal overhead**: Có rất ít overhead trong development mode.

## Câu hỏi phỏng vấn / Interview Questions

1. `useDebugValue` là gì? Khi nào nên dùng?

2. `useDebugValue` hoạt động như thế nào?

3. Formatter function trong `useDebugValue` là gì?

4. Làm thế nào để debug custom hooks?

5. `useDebugValue` có effect trong production không?

6. Làm thế nào để hiển thị thông tin hữu ích trong DevTools?

7. Làm thế nào để tùy chỉnh label hiển thị?

8. Làm thế nào để debug hook state?

9. Làm thế nào để combine nhiều debug values?

10. Làm thế nào để debug complex hooks?

## Tài liệu tham khảo / References

- [useDebugValue - React Official Docs](https://react.dev/reference/react/useDebugValue)
- [React DevTools](https://react.dev/learn/react-developer-tools)

---

_Last updated: 2026-01-31_
