# flushSync / flushSync

## Định nghĩa / Definition

[`flushSync`](https://react.dev/reference/react-dom/flushSync) là một API trong React-DOM cho phép bạn **force synchronous render** của updates. Nó override automatic batching của React và force DOM updates để hoàn tất ngay lập tức.

## Cú pháp / Syntax

```javascript
flushSync(callback);
```

## Tham số / Parameters

| Tham số    | Kiểu       | Mô tả                                       |
| ---------- | ---------- | ------------------------------------------- |
| `callback` | `function` | Function chứa các state updates muốn flush. |

## Giá trị trả về / Return Value

Không có giá trị trả về (void).

## Cách hoạt động / How it Works

### Forced Synchronous Render

`flushSync` force synchronous render:

```
Normal: setState → Batch → Render (async)
flushSync: setState → Force Sync Render (immediate)
```

### Override Batching

React 18+ tự động batch updates. `flushSync` override batching này:

```jsx
// Normal behavior - batched
setCount((c) => c + 1);
setName("React");
// Cả 2 updates được batch và render một lần

// With flushSync - immediate
flushSync(() => {
  setCount((c) => c + 1);
  setName("React");
});
// Mỗi update được render ngay lập tức
```

### Use Cases

`flushSync` dùng cho:

- Force DOM updates ngay lập tức
- Sync state với DOM
- Measure DOM ngay sau update
- Force re-render khi cần

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { flushSync, useState } from "react";

function Component() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // Force synchronous render
    flushSync(() => {
      setCount((c) => c + 1);
    });

    // DOM được update ngay lập tức
    console.log("DOM updated");
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

### Ví dụ với DOM Measurement

```jsx
import { flushSync, useState, useRef, useEffect } from "react";

function MeasureComponent() {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  const measure = () => {
    flushSync(() => {
      if (ref.current) {
        setHeight(ref.current.offsetHeight);
      }
    });
  };

  return (
    <div>
      <div ref={ref} style={{ height: "100px", background: "lightblue" }}>
        <button onClick={measure}>Measure Height</button>
      </div>
      <p>Height: {height}px</p>
    </div>
  );
}
```

### Ví dụ với Form Validation

```jsx
import { flushSync, useState } from "react";

function Form() {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    flushSync(() => {
      setErrors(validateForm(values));
      setTouched(validateTouched(values));
    });
  };

  return (
    <form>
      <input name="email" onChange={handleChange} />
      {errors.email && <p className="error">{errors.email}</p>}
      <button type="button" onClick={validate}>
        Validate
      </button>
    </form>
  );
}
```

### Ví dụ với Multiple Updates

```jsx
import { flushSync, useState } from "react";

function MultiUpdateComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const handleMultipleUpdates = () => {
    flushSync(() => {
      setCount((c) => c + 1);
      setName("React");
      // Cả 2 updates được render ngay lập tức
    });
  };

  return (
    <div>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <button onClick={handleMultipleUpdates}>Update Both</button>
    </div>
  );
}
```

### Ví dụ với External Library Integration

```jsx
import { flushSync } from "react";
import { measure } from "some-library";

function ExternalLibComponent() {
  const [data, setData] = useState(null);

  const updateAndMeasure = () => {
    flushSync(() => {
      setData(newData);
    });

    // Measure ngay sau sync update
    const metrics = measure();
    console.log("Metrics:", metrics);
  };

  return (
    <div>
      <button onClick={updateAndMeasure}>Update and Measure</button>
      {data && <p>{JSON.stringify(data)}</p>}
    </div>
  );
}
```

### Ví dụ với Animation Sync

```jsx
import { flushSync, useState, useRef } from "react";

function AnimatedComponent() {
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);

  const startAnimation = () => {
    flushSync(() => {
      setIsAnimating(true);
      // Force re-render để bắt đầu animation
    });

    // Animation logic
    setTimeout(() => {
      flushSync(() => {
        setIsAnimating(false);
      });
    }, 1000);
  };

  return (
    <div>
      <div ref={ref} className={`box ${isAnimating ? "animating" : ""}`}>
        Animated Box
      </div>
      <button onClick={startAnimation}>Animate</button>
    </div>
  );
}
```

### Ví dụ với TypeScript

```tsx
import { flushSync, useState } from "react";

interface State {
  count: number;
  name: string;
}

function Component() {
  const [state, setState] = useState<State>({ count: 0, name: "" });

  const updateState = () => {
    flushSync(() => {
      setState((prev) => ({
        count: prev.count + 1,
        name: "React",
      }));
    });
  };

  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Name: {state.name}</p>
      <button onClick={updateState}>Update</button>
    </div>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi cần force synchronous render
- Khi cần DOM updates ngay lập tức
- Khi cần measure DOM ngay sau update
- Khi cần sync state với DOM
- Khi làm việc với external libraries cần sync

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi không cần synchronous render
- Khi có thể dùng batching để tối ưu performance
- Khi không cần DOM measurements
- Khi có thể dùng `useLayoutEffect` thay thế

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `flushSync`:

1. **Async rendering**: Updates được batch và render async.

2. **Delayed DOM updates**: DOM không được update ngay lập tức.

3. **Race conditions**: Có thể có race conditions với DOM measurements.

4. **No sync control**: Không thể force synchronous renders.

## Vấn đề được giải quyết / Problems Solved

### 1. Forced Synchronous Render

Force synchronous render khi cần thiết.

### 2. Override Batching

Override automatic batching của React 18+.

### 3. Immediate DOM Updates

DOM updates được thực hiện ngay lập tức.

### 4. DOM Measurements

Dễ measure DOM ngay sau updates.

## Ưu điểm / Advantages

1. **Immediate updates**: DOM được update ngay lập tức.

2. **Sync control**: Có control synchronous rendering.

3. **Simple API**: Dễ sử dụng.

4. **TypeScript support**: Tốt với TypeScript.

## Nhược điểm / Disadvantages

1. **Performance impact**: Có thể impact performance nếu overused.

2. **Breaks batching**: Override automatic batching của React.

3. **Not recommended**: Thường không nên dùng trừ khi cần thiết.

4. **Debugging difficulty**: Khó debug hơn với async rendering.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm          | flushSync  | useLayoutEffect | Normal setState |
| ----------------- | ---------- | --------------- | --------------- |
| Synchronous       | Có         | Có              | Không           |
| Override batching | Có         | Có              | Không           |
| Performance       | Kém hơn    | Kém hơn         | Tốt nhất        |
| Use case          | Force sync | Force sync      | Normal updates  |

## Best Practices / Các thực hành tốt

1. **Chỉ dùng khi cần thiết**:

   ```jsx
   // Chỉ dùng khi cần synchronous render
   flushSync(() => {
     setCount((c) => c + 1);
   });
   ```

2. **Dùng `useLayoutEffect` thay thế khi có thể**:

   ```jsx
   // ✅ Tốt hơn - dùng useLayoutEffect
   useLayoutEffect(() => {
     ref.current.offsetHeight;
   }, []);

   // ❌ Chỉ dùng khi cần thiết
   flushSync(() => {
     ref.current.offsetHeight;
   });
   ```

3. **Minimize usage**:

   ```jsx
   // Chỉ flushSync khi cần thiết
   flushSync(() => {
     // Critical update cần sync
   });
   ```

4. **Type the callback**:
   ```tsx
   flushSync(() => {
     setState((prev) => ({ ...prev, value: newValue }));
   });
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Overusing flushSync

```jsx
// ❌ Sai - overuse flushSync
function Component() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    flushSync(() => {
      setCount((c) => c + 1); // Không cần sync
    });
  };
}

// ✅ Đúng - chỉ dùng khi cần thiết
function Component() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((c) => c + 1); // Batched là đủ tốt
  };
}
```

### 2. Not Understanding Batching

```jsx
// ❌ Không hiểu batching
flushSync(() => {
  setCount((c) => c + 1);
  setName("React");
});
// Tại sao không batched?

// ✅ Hiểu batching
// flushSync override batching, nhưng chỉ dùng khi cần thiết
```

### 3. Using for All Updates

```jsx
// ❌ Sai - dùng cho tất cả updates
function Component() {
  const handleClick = () => {
    flushSync(() => {
      setCount((c) => c + 1); // Không cần sync
    });
  };
}

// ✅ Đúng - chỉ dùng khi cần thiết
function Component() {
  const handleClick = () => {
    setCount((c) => c + 1); // Batched là đủ tốt
  };
}
```

### 4. Not Using with useLayoutEffect

```jsx
// ❌ Sai - không so sánh với useLayoutEffect
flushSync(() => {
  ref.current.offsetHeight;
});

// ✅ Đúng - hiểu sự khác biệt
// useLayoutEffect: Force sync sau mutations
// flushSync: Force sync ngay lập tức
```

## Performance Considerations / Yếu tố hiệu suất

1. **Performance impact**: Có thể impact performance nếu overused.

2. **Breaks batching**: Override automatic batching.

3. **Synchronous blocking**: Có thể block main thread.

4. **Use sparingly**: Chỉ dùng khi cần thiết.

## Browser Support / Hỗ trợ trình duyệt

`flushSync` hoạt động trên tất cả trình duyệt hỗ trợ React 18+.

## Câu hỏi phỏng vấn / Interview Questions

1. `flushSync` là gì? Khi nào nên dùng?

2. `flushSync` hoạt động như thế nào?

3. Sự khác biệt giữa `flushSync` và normal `setState`?

4. `flushSync` override batching như thế nào?

5. Khi nào nên dùng `flushSync` thay vì `useLayoutEffect`?

6. `flushSync` có impact performance không?

7. Làm thế nào `flushSync` giúp với DOM measurements?

8. `flushSync` có hoạt động với React 17 không?

9. Làm thế nào `flushSync` khác gì với `act`?

10. Làm thế nào để force synchronous render?

11. `flushSync` có hoạt động với SSR không?

12. Làm thế nào để debug components với `flushSync`?

13. Có thể nest `flushSync` không?

14. `flushSync` có hoạt động với TypeScript không?

15. Làm thế nào `flushSync` giúp với external libraries?

## Tài liệu tham khảo / References

- [flushSync - React Official Docs](https://react.dev/reference/react-dom/flushSync)
- [Batching - React Docs](https://react.dev/learn/queueing-a-series-of-state-updates)
- [useLayoutEffect - React Docs](https://react.dev/reference/react/useLayoutEffect)

---

_Last updated: 2026-01-31_
