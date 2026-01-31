# useRef / useRef

## Định nghĩa / Definition

[`useRef`](https://react.dev/reference/react/useRef) là một hook trong React cho phép bạn tạo một mutable ref object. Ref object có thuộc tính:

- `.current` property có thể được gán giá trị bất kỳ
- Không trigger re-render khi `.current` thay đổi
- Giữ nguyên giá trị qua các renders

## Cú pháp / Syntax

```javascript
const ref = useRef(initialValue);
```

## Tham số / Parameters

| Tham số        | Kiểu | Mô tả                             |
| -------------- | ---- | --------------------------------- |
| `initialValue` | Any  | Giá trị ban đầu cho `ref.current` |

## Giá trị trả về / Return Value

| Giá trị | Kiểu   | Mô tả                                                             |
| ------- | ------ | ----------------------------------------------------------------- |
| `ref`   | Object | Object với thuộc tính `.current` được khởi tạo với `initialValue` |

## Cách hoạt động / How it Works

### Ref Object

`useRef` trả về một object với thuộc tính `.current`:

```javascript
const ref = useRef(0);
console.log(ref.current); // 0
ref.current = 1;
console.log(ref.current); // 1
```

### No Re-render on Change

Khác với `useState`, thay đổi `ref.current` không trigger re-render:

```javascript
function Component() {
  const countRef = useRef(0);

  // Không re-render
  const handleClick = () => {
    countRef.current += 1;
    console.log(countRef.current);
  };

  return <button onClick={handleClick}>Click</button>;
}
```

### Persisting Across Renders

Ref giữ nguyên giá trị qua các renders:

```javascript
function Component() {
  const ref = useRef("initial");

  useEffect(() => {
    // ref.current giữ nguyên giá trị
    console.log(ref.current); // 'initial'
  }, []);
}
```

### DOM Refs

`useRef` thường dùng để access DOM elements:

```javascript
function Component() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </div>
  );
}
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { useRef, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  const handleClick = () => {
    // Update ref không trigger re-render
    countRef.current += 1;

    // Update state trigger re-render
    setCount(countRef.current);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <p>Ref Count: {countRef.current}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

### Ví dụ DOM Access

```jsx
function TextInputWithFocusButton() {
  const inputRef = useRef(null);

  const focusInput = () => {
    // Access DOM element
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Type here..." />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

### Ví dụ Previous Value

```jsx
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
```

### Ví dụ Timer

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Lưu interval ID vào ref
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    // Cleanup interval
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return <div>Seconds: {seconds}</div>;
}
```

### Ví dụ Scroll Position

```jsx
function ScrollBox() {
  const boxRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState({ top: 0, left: 0 });

  const handleScroll = () => {
    if (boxRef.current) {
      setScrollPosition({
        top: boxRef.current.scrollTop,
        left: boxRef.current.scrollLeft,
      });
    }
  };

  return (
    <div
      ref={boxRef}
      style={{ height: "200px", overflow: "auto" }}
      onScroll={handleScroll}
    >
      <div style={{ height: "1000px" }}>Scroll me to see position</div>
      <p>
        Top: {scrollPosition.top}, Left: {scrollPosition.left}
      </p>
    </div>
  );
}
```

### Ví dụ Animation Frame

```jsx
function AnimatedBox() {
  const boxRef = useRef(null);
  const requestRef = useRef(null);

  const animate = () => {
    if (boxRef.current) {
      boxRef.current.style.transform = `translateX(${Math.random() * 100}px)`;
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    animate();
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        width: "100px",
        height: "100px",
        background: "blue",
        transition: "transform 0.3s",
      }}
    >
      Animated Box
    </div>
  );
}
```

### Ví dụ Store Value Between Renders

```jsx
function Form() {
  const [values, setValues] = useState({ name: "", email: "" });
  const prevValuesRef = useRef(values);

  const handleChange = (field) => (e) => {
    const newValues = { ...values, [field]: e.target.value };
    setValues(newValues);
  };

  const handleSubmit = () => {
    // Sử dụng ref để access giá trị trước khi render
    console.log("Previous values:", prevValuesRef.current);
    console.log("Current values:", values);
    prevValuesRef.current = values;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={values.name}
        onChange={handleChange("name")}
        placeholder="Name"
      />
      <input
        value={values.email}
        onChange={handleChange("email")}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi cần access DOM elements trực tiếp
- Khi cần lưu trữ giá trị không trigger re-render
- Khi cần lưu trữ values qua các renders (previous values, timers, intervals)
- Khi cần lưu trữ mutable values không cần re-render
- Khi cần lưu trữ external subscriptions IDs

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi cần trigger re-render khi giá trị thay đổi (dùng `useState`)
- Khi cần lưu trữ state component (dùng `useState` hoặc `useReducer`)
- Khi cần lưu trữ data cần hiển thị trong UI

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `useRef`, bạn sẽ gặp các vấn đề sau:

1. **Không thể access DOM elements**: Không có cách nào để access DOM elements trực tiếp từ functional components.

2. **Không thể lưu trữ mutable values**: Không có cách nào để lưu trữ values không trigger re-render.

3. **Không thể lưu trữ values qua renders**: Không có cách nào để giữ nguyên values qua các renders mà không trigger re-render.

4. **Phải dùng class components**: Bạn sẽ phải dùng class components với `createRef` để access DOM elements.

## Vấn đề được giải quyết / Problems Solved

### 1. DOM Access

`useRef` cho phép access DOM elements từ functional components.

### 2. Mutable Storage Without Re-render

`useRef` cho phép lưu trữ mutable values mà không trigger re-render.

### 3. Persisting Values Across Renders

`useRef` giữ nguyên giá trị qua các renders, hữu ích cho previous values, timers, intervals.

## Ưu điểm / Advantages

1. **No re-render**: Thay đổi `ref.current` không trigger re-render.

2. **DOM access**: Dễ dàng access DOM elements.

3. **Persistent values**: Giữ nguyên giá trị qua các renders.

4. **Simple API**: API đơn giản, dễ hiểu và dùng.

## Nhược điểm / Disadvantages

1. **No re-render**: Không trigger re-render, có thể dẫn đến UI không update.

2. **Not reactive**: Không reactive như state, cần manually update UI.

3. **Overuse**: Dùng quá nhiều refs có thể làm code khó hiểu.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm                  | useRef | useState | createRef          |
| ------------------------- | ------ | -------- | ------------------ |
| Trigger re-render         | Không  | Có       | Không              |
| Persistent across renders | Có     | Không    | Không              |
| DOM access                | Có     | Không    | Có                 |
| Functional components     | Có     | Có       | Không (class only) |

## Best Practices / Các thực hành tốt

1. **Dùng ref cho DOM access**:

   ```javascript
   const inputRef = useRef(null);
   <input ref={inputRef} />;
   ```

2. **Dùng ref cho values không cần re-render**:

   ```javascript
   const timerRef = useRef(null);
   ```

3. **Cleanup refs trong useEffect**:

   ```javascript
   useEffect(() => {
     const timer = setInterval(() => {}, 1000);
     timerRef.current = timer;
     return () => clearInterval(timer);
   }, []);
   ```

4. **Avoid overuse**: Chỉ dùng ref khi thực sự cần.

## Common Pitfalls / Các lỗi thường gặp

### 1. Using Ref Instead of State

```javascript
// ❌ Sai - ref không trigger re-render
const countRef = useRef(0);
const handleClick = () => {
  countRef.current += 1;
};

// ✅ Đúng - dùng state
const [count, setCount] = useState(0);
const handleClick = () => {
  setCount((c) => c + 1);
};
```

### 2. Accessing Ref Before Mount

```javascript
// ❌ Sai - ref.current là null trước mount
const inputRef = useRef(null);
useEffect(() => {
  inputRef.current.focus(); // Error: null
}, []);

// ✅ Đúng - check null
useEffect(() => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
}, []);
```

### 3. Not Cleaning Up

```javascript
// ❌ Sai - memory leak
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  timerRef.current = timer;
}, []);

// ✅ Đúng - cleanup
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  timerRef.current = timer;
  return () => clearInterval(timer);
}, []);
```

## Performance Considerations / Yếu tố hiệu suất

1. **No re-render overhead**: Thay đổi ref không trigger re-render, tối ưu hiệu suất.

2. **DOM access**: Access DOM elements trực tiếp, không cần re-render.

## Câu hỏi phỏng vấn / Interview Questions

1. `useRef` là gì? Khi nào nên dùng?

2. Sự khác biệt giữa `useRef` và `useState`?

3. `useRef` khác với `createRef` như thế nào?

4. Use cases của `useRef`?

5. Accessing DOM elements với `useRef`?

6. `useRef` để lưu giá trị không trigger re-render?

7. `useRef` vs `useState` cho persisting values?

8. Làm thế nào để access ref.current?

9. Làm thế nào để cleanup refs?

10. Làm thế nào để lưu trữ previous value?

11. Làm thế nào để lưu trữ timer ID?

12. Làm thế nào để access DOM trong useEffect?

13. Làm thế nào để scroll to element?

14. Làm thế nào để focus input?

15. Làm thế nào để store mutable values?

## Tài liệu tham khảo / References

- [useRef - React Official Docs](https://react.dev/reference/react/useRef)
- [Referencing Values with Refs - React Official Docs](https://react.dev/learn/referencing-values-with-refs)
- [Manipulating the DOM with Refs - React Official Docs](https://react.dev/learn/manipulating-the-dom-with-refs)

---

_Last updated: 2026-01-31_
