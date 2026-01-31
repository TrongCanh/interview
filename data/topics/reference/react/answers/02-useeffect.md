# useEffect / useEffect

## Định nghĩa / Definition

[`useEffect`](https://react.dev/reference/react/useEffect) là một hook trong React cho phép bạn thực hiện side effects trong functional components. Side effects là các hành động không liên quan trực tiếp đến việc render UI, ví dụ: data fetching, subscriptions, DOM manipulation, logging, v.v.

## Cú pháp / Syntax

```javascript
useEffect(setup, dependencies?)
```

## Tham số / Parameters

| Tham số        | Kiểu             | Mô tả                                                                              |
| -------------- | ---------------- | ---------------------------------------------------------------------------------- |
| `setup`        | Function         | Function chứa logic side effect. Return một cleanup function (optional).           |
| `dependencies` | Array (optional) | List các giá trị mà effect phụ thuộc. Effect chỉ chạy lại khi có giá trị thay đổi. |

## Giá trị trả về / Return Value

| Giá trị   | Kiểu                | Mô tả                                                                   |
| --------- | ------------------- | ----------------------------------------------------------------------- |
| `cleanup` | Function (optional) | Function được gọi khi component unmount hoặc trước khi effect chạy lại. |

## Cách hoạt động / How it Works

### Effect Lifecycle

1. **Mount**: Effect chạy sau khi component render ra màn hình (được commit vào DOM).

2. **Update**: Effect chạy lại khi dependencies thay đổi.

3. **Unmount**: Cleanup function được gọi khi component bị xóa khỏi DOM.

### Cleanup Function

Cleanup function được gọi:

- Khi component unmount
- Trước khi effect chạy lại (khi dependencies thay đổi)

```javascript
useEffect(() => {
  // Setup
  const subscription = subscribe();

  // Cleanup
  return () => {
    subscription.unsubscribe();
  };
}, [dependency]);
```

### Dependency Array

| Dependency Array      | Hành vi                                       |
| --------------------- | --------------------------------------------- |
| `[]` (empty)          | Chạy một lần khi mount, cleanup khi unmount   |
| `[dep1, dep2]`        | Chạy khi mount và khi dep1 hoặc dep2 thay đổi |
| `undefined` (omitted) | Chạy sau mỗi render (không khuyến nghị)       |

### Effect Phases

1. **Render Phase**: React tính toán UI cần hiển thị
2. **Commit Phase**: React cập nhật DOM
3. **Passive Effects Phase**: `useEffect` chạy sau commit (không chặn browser painting)

### Strict Mode Behavior

Trong development mode với `<StrictMode>`:

- Effect chạy 2 lần khi mount (để phát hiện cleanup issues)
- Cleanup được gọi giữa 2 runs

```javascript
// Strict Mode (development only)
// Run 1: setup
// Cleanup 1
// Run 2: setup
// Cleanup 2 (on unmount)
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Setup: tạo interval
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup: xóa interval
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array

  return <div>Current time: {time.toLocaleTimeString()}</div>;
}
```

### Ví dụ Data Fetching

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();

        if (!cancelled) {
          setUser(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    // Cleanup: cancel fetch nếu component unmount
    return () => {
      cancelled = true;
    };
  }, [userId]); // Re-fetch khi userId thay đổi

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>Name: {user?.name}</div>;
}
```

### Ví dụ DOM Manipulation

```jsx
function Tooltip({ children, content }) {
  const tooltipRef = useRef(null);

  useEffect(() => {
    const tooltip = tooltipRef.current;

    // Setup: thêm event listeners
    const handleMouseEnter = () => {
      tooltip.style.display = "block";
    };
    const handleMouseLeave = () => {
      tooltip.style.display = "none";
    };

    const parent = tooltip.parentElement;
    parent.addEventListener("mouseenter", handleMouseEnter);
    parent.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup: xóa event listeners
    return () => {
      parent.removeEventListener("mouseenter", handleMouseEnter);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {children}
      <div ref={tooltipRef} style={{ display: "none" }}>
        {content}
      </div>
    </>
  );
}
```

### Ví dụ với Multiple Dependencies

```jsx
function SearchResults({ query, filters }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(
        `/api/search?q=${query}&filters=${JSON.stringify(filters)}`,
      );
      const data = await response.json();
      setResults(data);
    };

    fetchResults();
  }, [query, filters]); // Chạy lại khi query hoặc filters thay đổi

  return (
    <ul>
      {results.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
```

### Ví dụ Window Resize Listener

```jsx
function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      Width: {size.width}, Height: {size.height}
    </div>
  );
}
```

### Ví dụ Document Title Update

```jsx
function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;

    // Cleanup: reset title khi component unmount
    return () => {
      document.title = "My App";
    };
  }, [title]);

  return <h1>{title}</h1>;
}
```

## Khi nào nên dùng / When to Use

- Khi cần data fetching từ API
- Khi cần setup subscriptions (WebSocket, event listeners)
- Khi cần manipulate DOM trực tiếp
- Khi cần update document title
- Khi cần setup timers (setTimeout, setInterval)
- Khi cần log analytics
- Khi cần sync với external systems

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi logic chỉ phụ thuộc vào props hoặc state (dùng trong render)
- Khi cần tính toán giá trị dựa trên state (dùng `useMemo`)
- Khi cần memoize function (dùng `useCallback`)
- Khi cần effect chạy đồng bộ sau DOM mutations (dùng `useLayoutEffect`)
- Khi cần effect chạy trước DOM mutations cho CSS-in-JS (dùng `useInsertionEffect`)

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `useEffect`, bạn sẽ gặp các vấn đề sau:

1. **Không thể thực hiện side effects trong functional components**: Functional components chỉ render UI, không có lifecycle methods để thực hiện side effects.

2. **Không thể cleanup resources**: Không có cách nào để cleanup subscriptions, timers, event listeners khi component unmount, dẫn đến memory leaks.

3. **Không thể fetch data**: Không có cách nào để fetch data khi component mount hoặc khi props thay đổi.

4. **Phải dùng class components**: Bạn sẽ phải dùng class components với lifecycle methods (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`).

## Vấn đề được giải quyết / Problems Solved

### 1. Side Effects trong Functional Components

`useEffect` cho phép functional components thực hiện side effects mà không cần dùng class components và lifecycle methods.

### 2. Cleanup Tự động

Cleanup function được gọi tự động khi component unmount hoặc trước khi effect chạy lại, tránh memory leaks.

### 3. Dependency Array

Giúp kiểm soát khi nào effect chạy lại, tránh chạy effect không cần thiết.

### 4. Separation of Concerns

Tách biệt logic side effects khỏi render logic, làm code dễ đọc và dễ maintain hơn.

## Ưu điểm / Advantages

1. **Đơn giản hóa side effects**: Một API đơn giản để xử lý tất cả side effects.

2. **Cleanup tự động**: Cleanup function được gọi tự động, tránh memory leaks.

3. **Dependency array**: Giúp kiểm soát khi nào effect chạy lại.

4. **Declarative**: Mô tả "cái gì" cần làm thay vì "làm thế nào" để làm.

5. **TypeScript support**: Tốt với TypeScript, có thể type dependencies.

## Nhược điểm / Disadvantages

1. **Async nature**: Effect chạy sau render, có thể gây UI flash nếu không careful.

2. **Infinite loops**: Sai dependency array có thể gây infinite loops.

3. **Complex cleanup**: Với nhiều effects, cleanup logic có thể trở nên phức tạp.

4. **Not suitable for synchronous DOM updates**: Không phù hợp cho DOM updates cần chạy đồng bộ sau mutations.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm      | useEffect       | useLayoutEffect         | useInsertionEffect | Class Lifecycle |
| ------------- | --------------- | ----------------------- | ------------------ | --------------- |
| Chạy sau      | Render & Commit | Render & Commit         | Render             | Render          |
| Chặn painting | Không           | Có                      | Có                 | Có              |
| Dùng cho      | Side effects    | Synchronous DOM updates | CSS-in-JS          | Side effects    |
| Cleanup       | Có              | Có                      | Có                 | Có              |

## Best Practices / Các thực hành tốt

1. **Luôn khai báo dependencies đầy đủ**:

   ```javascript
   useEffect(() => {
     console.log(count);
   }, [count]); // ❌ Không bỏ qua count
   ```

2. **Dùng cleanup function để tránh memory leaks**:

   ```javascript
   useEffect(() => {
     const subscription = subscribe();
     return () => subscription.unsubscribe();
   }, []);
   ```

3. **Tách biệt effects theo mục đích**:

   ```javascript
   // Tốt hơn là một effect lớn
   useEffect(() => {
     /* data fetching */
   }, [id]);
   useEffect(() => {
     /* analytics */
   }, [user]);
   ```

4. **Dùng ESLint plugin react-hooks/exhaustive-deps** để phát hiện missing dependencies.

5. **Avoid running effect sau mỗi render**:

   ```javascript
   // ❌ Sai - chạy sau mỗi render
   useEffect(() => {
     /* logic */
   });

   // ✅ Đúng - chỉ chạy khi dependencies thay đổi
   useEffect(() => {
     /* logic */
   }, [dep1, dep2]);
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Infinite Loop

```javascript
// ❌ Sai - infinite loop
const [count, setCount] = useState(0);
useEffect(() => {
  setCount(count + 1);
}, [count]);

// ✅ Đúng - dùng functional update
useEffect(() => {
  setCount((c) => c + 1);
}, []);
```

### 2. Missing Dependencies

```javascript
// ❌ Sai - missing dependency
useEffect(() => {
  console.log(count);
}, []);

// ✅ Đúng - thêm count vào dependencies
useEffect(() => {
  console.log(count);
}, [count]);
```

### 3. Not Cleaning Up

```javascript
// ❌ Sai - memory leak
useEffect(() => {
  window.addEventListener("resize", handleResize);
}, []);

// ✅ Đúng - cleanup
useEffect(() => {
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
```

### 4. Race Conditions in Data Fetching

```javascript
// ❌ Sai - race condition
useEffect(() => {
  fetch(`/api/users/${userId}`)
    .then((res) => res.json())
    .then((data) => setUser(data));
}, [userId]);

// ✅ Đúng - dùng cancellation flag
useEffect(() => {
  let cancelled = false;

  fetch(`/api/users/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      if (!cancelled) setUser(data);
    });

  return () => {
    cancelled = true;
  };
}, [userId]);
```

## Performance Considerations / Yếu tố hiệu suất

1. **Effect chạy sau render**: Không chặn browser painting, tốt cho UX.

2. **Dependency array**: Giảm số lần effect chạy lại, tối ưu hiệu suất.

3. **Cleanup**: Giúp tránh memory leaks và unnecessary computations.

4. **Multiple effects**: Tách biệt effects giúp React tối ưu chạy effect không cần thiết.

## Câu hỏi phỏng vấn / Interview Questions

1. `useEffect` là gì? Khi nào nên dùng?

2. Dependency array hoạt động như thế nào?

3. Cleanup function là gì? Khi nào chạy?

4. Cách `useEffect` tương đương với các lifecycle methods?

5. Effect cleanup trong Strict Mode?

6. Infinite loops trong `useEffect`? Cách tránh?

7. `useEffect` vs `useLayoutEffect` vs `useInsertionEffect`?

8. Khi nào nên dùng empty dependency array?

9. Làm thế nào để fetch data với `useEffect`?

10. Làm thế nào để tránh race conditions trong data fetching?

11. Làm thế nào để cleanup event listeners?

12. Làm thế nào để update document title?

13. Tại sao `useEffect` chạy sau render?

14. Làm thế nào để debug useEffect?

15. Sự khác biệt giữa `useEffect` và `useCallback`?

## Tài liệu tham khảo / References

- [useEffect - React Official Docs](https://react.dev/reference/react/useEffect)
- [Synchronizing with Effects - React Official Docs](https://react.dev/learn/synchronizing-with-effects)
- [You Might Not Need an Effect - React Official Docs](https://react.dev/learn/you-might-not-need-an-effect)
- [Removing Effect Dependencies - React Official Docs](https://react.dev/learn/removing-effect-dependencies)
- [Reusing Logic with Custom Hooks - React Official Docs](https://react.dev/learn/reusing-logic-with-custom-hooks)

---

_Last updated: 2026-01-31_
