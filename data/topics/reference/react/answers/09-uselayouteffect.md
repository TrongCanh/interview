# useLayoutEffect / useLayoutEffect

## Định nghĩa / Definition

[`useLayoutEffect`](https://react.dev/reference/react/useLayoutEffect) là một hook trong React cho phép bạn thực hiện side effects **đồng bộ** sau tất cả DOM mutations nhưng trước khi browser paints. Nó tương tự như `useEffect` nhưng chạy ở một phase khác của React render lifecycle.

## Cú pháp / Syntax

```javascript
useLayoutEffect(setup, dependencies?)
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

### Effect Phases

| Phase         | useLayoutEffect         | useEffect                        |
| ------------- | ----------------------- | -------------------------------- |
| Chạy sau      | DOM mutations           | DOM paint                        |
| Chặn painting | Có                      | Không                            |
| Dùng cho      | Synchronous DOM updates | Side effects không chặn painting |

### Timing Diagram

```
Render Phase
    ↓
DOM Mutations
    ↓
useLayoutEffect runs (synchronous, blocks painting)
    ↓
useEffect runs (asynchronous, doesn't block painting)
    ↓
Browser Paint
```

### Cleanup Function

Cleanup function được gọi:

- Khi component unmount
- Trước khi effect chạy lại (khi dependencies thay đổi)

```javascript
useLayoutEffect(() => {
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

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { useLayoutEffect, useState } from "react";

function Component() {
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    // Chạy đồng bộ sau DOM mutations
    const element = document.getElementById("my-element");
    if (element) {
      setHeight(element.offsetHeight);
    }
  }, []);

  return <div id="my-element">Content</div>;
}
```

### Ví dụ DOM Measurements

```jsx
function MeasureBox() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    if (boxRef.current) {
      // Đọc DOM dimensions sau mutations
      setDimensions({
        width: boxRef.current.offsetWidth,
        height: boxRef.current.offsetHeight,
      });
    }
  }, []);

  return (
    <div
      ref={boxRef}
      style={{ width: "100px", height: "100px", background: "blue" }}
    >
      Width: {dimensions.width}, Height: {dimensions.height}
    </div>
  );
}
```

### Ví dụ Scroll Position

```jsx
function ScrollTracker() {
  const [scrollPos, setScrollPos] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setScrollPos({
        top: containerRef.current.scrollTop,
        left: containerRef.current.scrollLeft,
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: "200px", overflow: "auto" }}
      onScroll={() => {
        if (containerRef.current) {
          setScrollPos({
            top: containerRef.current.scrollTop,
            left: containerRef.current.scrollLeft,
          });
        }
      }}
    >
      <div style={{ height: "1000px" }}>Scroll me</div>
      <p>
        Top: {scrollPos.top}, Left: {scrollPos.left}
      </p>
    </div>
  );
}
```

### Ví dụ Animation Setup

```jsx
function AnimatedComponent() {
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    if (boxRef.current) {
      // Setup animation sau DOM mutations
      boxRef.current.style.transform = "translateX(0)";
      boxRef.current.style.transition = "transform 0.3s";
    }
  }, []);

  const handleClick = () => {
    if (boxRef.current) {
      boxRef.current.style.transform = `translateX(${Math.random() * 100}px)`;
    }
  };

  return (
    <div
      ref={boxRef}
      style={{
        width: "100px",
        height: "100px",
        background: "blue",
      }}
    >
      <button onClick={handleClick}>Animate</button>
    </div>
  );
}
```

### Ví dụ Focus Management

```jsx
function AutoFocusInput({ shouldFocus }) {
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    if (shouldFocus && inputRef.current) {
      // Focus input sau DOM mutations
      inputRef.current.focus();
    }
  }, [shouldFocus]);

  return <input ref={inputRef} type="text" />;
}
```

### Ví dụ Resize Observer

```jsx
function ResizableBox() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    if (boxRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      });

      observer.observe(boxRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div
      ref={boxRef}
      style={{ width: "200px", height: "200px", background: "blue" }}
    >
      Width: {size.width}, Height: {size.height}
    </div>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi cần đọc DOM measurements ngay sau mutations
- Khi cần thực hiện synchronous DOM updates
- Khi cần scroll positions hoặc element dimensions
- Khi cần focus elements ngay sau render
- Khi cần setup animations sau DOM mutations
- Khi cần avoid visual flash từ async updates

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi effect không phụ thuộc vào DOM measurements
- Khi effect tốn kém và có thể block painting
- Khi side effect không cần synchronous execution
- Khi effect có thể gây layout thrashing

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `useLayoutEffect`, bạn sẽ gặp các vấn đề sau:

1. **Visual flash**: Với `useEffect`, DOM updates có thể gây visual flash vì effect chạy sau paint.

2. **Incorrect measurements**: Đọc DOM dimensions trong `useEffect` có thể trả về sai vì effect chạy sau paint.

3. **Race conditions**: Với async updates, có thể có race conditions giữa render và effect.

## Vấn đề được giải quyết / Problems Solved

### 1. Synchronous DOM Updates

`useLayoutEffect` cho phép thực hiện synchronous DOM updates sau mutations nhưng trước paint.

### 2. Accurate DOM Measurements

Đọc DOM measurements ngay sau mutations đảm bảo giá trị chính xác.

### 3. Avoid Visual Flash

Thực hiện DOM updates trước paint tránh visual flash.

## Ưu điểm / Advantages

1. **Synchronous execution**: Chạy đồng bộ sau DOM mutations.

2. **Accurate measurements**: Đọc DOM measurements chính xác.

3. **No visual flash**: Tránh visual flash từ async updates.

## Nhược điểm / Disadvantages

1. **Blocks painting**: Chặn browser painting, có thể ảnh hưởng hiệu suất.

2. **Performance impact**: Có thể gây layout thrashing nếu dùng không careful.

3. **Limited use cases**: Chỉ dùng cho specific cases cần synchronous DOM updates.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm        | useLayoutEffect         | useEffect    | useInsertionEffect |
| --------------- | ----------------------- | ------------ | ------------------ |
| Chạy sau        | DOM mutations           | DOM paint    | DOM mutations      |
| Chặn painting   | Có                      | Không        | Có                 |
| Dùng cho        | Synchronous DOM updates | Side effects | CSS-in-JS          |
| Browser support | Có                      | Có           | Có                 |

## Best Practices / Các thực hành tốt

1. **Chỉ dùng khi cần synchronous DOM updates**:

   ```javascript
   useLayoutEffect(() => {
     // DOM measurements
   }, []);
   ```

2. **Khai báo dependencies đầy đủ**:

   ```javascript
   useLayoutEffect(() => {
     console.log(count);
   }, [count]);
   ```

3. **Cleanup resources**:
   ```javascript
   useLayoutEffect(() => {
     const observer = new ResizeObserver(callback);
     return () => observer.disconnect();
   }, []);
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Blocking Painting

```javascript
// ❌ Sai - expensive operation blocks painting
useLayoutEffect(() => {
  for (let i = 0; i < 1000000; i++) {
    // Expensive operation
  }
}, []);

// ✅ Đúng - dùng useEffect cho expensive operations
useEffect(() => {
  for (let i = 0; i < 1000000; i++) {
    // Expensive operation
  }
}, []);
```

### 2. Layout Thrashing

```javascript
// ❌ Sai - nhiều DOM reads và writes
useLayoutEffect(() => {
  element.style.width = "100px";
  const width = element.offsetWidth;
  element.style.height = "100px";
  const height = element.offsetHeight;
}, []);

// ✅ Đúng - batch DOM reads và writes
useLayoutEffect(() => {
  element.style.width = "100px";
  element.style.height = "100px";
  const { offsetWidth, offsetHeight } = element;
}, []);
```

## Performance Considerations / Yếu tố hiệu suất

1. **Blocks painting**: Chặn browser painting, có thể ảnh hưởng hiệu suất.

2. **Layout thrashing**: Nhiều DOM reads và writes có thể gây layout thrashing.

3. **Use sparingly**: Chỉ dùng khi thực sự cần synchronous DOM updates.

## Câu hỏi phỏng vấn / Interview Questions

1. `useLayoutEffect` là gì? Khi nào nên dùng?

2. Sự khác biệt giữa `useLayoutEffect` và `useEffect`?

3. Sự khác biệt giữa `useLayoutEffect` và `useInsertionEffect`?

4. Khi nào nên dùng `useLayoutEffect` thay vì `useEffect`?

5. `useLayoutEffect` chặn painting không?

6. Làm thế nào để đọc DOM measurements với `useLayoutEffect`?

7. Làm thế nào để focus elements với `useLayoutEffect`?

8. Làm thế nào để setup animations với `useLayoutEffect`?

9. Layout thrashing là gì? Làm thế nào để tránh?

10. Làm thế nào để cleanup trong `useLayoutEffect`?

11. Performance considerations với `useLayoutEffect`?

12. Làm thế nào để debug `useLayoutEffect`?

13. Làm thế nào để measure scroll positions?

14. Làm thế nào để handle resize với `useLayoutEffect`?

15. Làm thế nào để avoid visual flash?

## Tài liệu tham khảo / References

- [useLayoutEffect - React Official Docs](https://react.dev/reference/react/useLayoutEffect)
- [Synchronizing with Effects - React Official Docs](https://react.dev/learn/synchronizing-with-effects)
- [You Might Not Need an Effect - React Official Docs](https://react.dev/learn/you-might-not-need-an-effect)

---

_Last updated: 2026-01-31_
