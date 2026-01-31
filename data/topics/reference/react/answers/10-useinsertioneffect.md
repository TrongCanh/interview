# useInsertionEffect / useInsertionEffect

## Định nghĩa / Definition

[`useInsertionEffect`](https://react.dev/reference/react/useInsertionEffect) là một hook trong React cho phép bạn thực hiện side effects **trước khi DOM mutations**. Nó được thiết kế đặc biệt cho CSS-in-JS libraries cần inject styles trước khi React applies các changes khác.

## Cú pháp / Syntax

```javascript
useInsertionEffect(setup, dependencies?)
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

| Phase         | useInsertionEffect | useLayoutEffect         | useEffect    |
| ------------- | ------------------ | ----------------------- | ------------ |
| Chạy trước    | DOM mutations      | DOM mutations           | DOM paint    |
| Chặn painting | Có                 | Có                      | Không        |
| Dùng cho      | CSS-in-JS          | Synchronous DOM updates | Side effects |

### Timing Diagram

```
Render Phase
    ↓
useInsertionEffect runs (before DOM mutations)
    ↓
React applies DOM mutations
    ↓
useLayoutEffect runs (after DOM mutations, before paint)
    ↓
useEffect runs (after paint)
    ↓
Browser Paint
```

### Cleanup Function

Cleanup function được gọi:

- Khi component unmount
- Trước khi effect chạy lại (khi dependencies thay đổi)

```javascript
useInsertionEffect(() => {
  // Setup
  const style = document.createElement("style");
  document.head.appendChild(style);

  // Cleanup
  return () => {
    document.head.removeChild(style);
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
import { useInsertionEffect } from "react";

function Component() {
  useInsertionEffect(() => {
    // Chạy trước DOM mutations
    console.log("Insertion effect running");
  }, []);

  return <div>Content</div>;
}
```

### Ví dụ CSS-in-JS

```jsx
function StyledComponent({ color }) {
  useInsertionEffect(() => {
    // Inject style trước DOM mutations
    const style = document.createElement("style");
    style.textContent = `
      .styled-component {
        color: ${color};
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [color]);

  return <div className="styled-component">Styled content</div>;
}
```

### Ví dụ Dynamic Class Injection

```jsx
function DynamicClassComponent({ className }) {
  useInsertionEffect(() => {
    // Inject class styles trước DOM mutations
    const style = document.createElement("style");
    style.textContent = `
      .${className} {
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [className]);

  return <div className={className}>Content</div>;
}
```

### Ví dụ Animation Setup

```jsx
function AnimatedComponent() {
  useInsertionEffect(() => {
    // Setup animation keyframes trước DOM mutations
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .fade-in {
        animation: fadeIn 0.3s ease-in;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <div className="fade-in">Animated content</div>;
}
```

### Ví dụ Font Loading

```jsx
function FontLoader({ fontUrl }) {
  useInsertionEffect(() => {
    // Load font trước DOM mutations
    const style = document.createElement("style");
    style.textContent = `
      @font-face {
        font-family: 'CustomFont';
        src: url('${fontUrl}');
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [fontUrl]);

  return <div style={{ fontFamily: "CustomFont" }}>Content</div>;
}
```

### Ví dụ với TypeScript

```tsx
import { useInsertionEffect } from "react";

interface Props {
  color: string;
}

function StyledComponent({ color }: Props) {
  useInsertionEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .styled-component {
        color: ${color};
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [color]);

  return <div className="styled-component">Styled content</div>;
}
```

## Khi nào nên dùng / When to Use

- Khi dùng CSS-in-JS libraries (styled-components, emotion, v.v.)
- Khi cần inject styles trước DOM mutations
- Khi cần setup animation keyframes
- Khi cần load fonts hoặc resources
- Khi cần inject dynamic classes hoặc styles

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi effect không phụ thuộc vào DOM mutations
- Khi effect chỉ cần đọc DOM measurements (dùng `useLayoutEffect`)
- Khi side effect không cần chạy trước DOM mutations
- Khi dùng standard CSS hoặc CSS modules

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `useInsertionEffect`, bạn sẽ gặp các vấn đề sau:

1. **Style flash**: Với CSS-in-JS, styles có thể không được áp dụng đúng lúc, dẫn đến visual flash.

2. **Incorrect timing**: Effects chạy sau DOM mutations có thể không inject styles đúng lúc.

3. **Race conditions**: Với async updates, có thể có race conditions giữa render và style injection.

## Vấn đề được giải quyết / Problems Solved

### 1. CSS-in-JS Support

`useInsertionEffect` cho phép CSS-in-JS libraries inject styles trước DOM mutations.

### 2. Resource Loading

Giúp load fonts và resources trước component renders.

## Ưu điểm / Advantages

1. **Runs before DOM mutations**: Chạy trước React applies DOM changes.

2. **CSS-in-JS support**: Được thiết kế đặc biệt cho CSS-in-JS libraries.

3. **No visual flash**: Tránh visual flash từ late style injection.

## Nhược điểm / Disadvantages

1. **Limited use cases**: Chỉ hữu ích cho CSS-in-JS và specific scenarios.

2. **Blocks mutations**: Chặn DOM mutations cho đến khi effect hoàn thành.

3. **Not widely used**: Hầu hết developers không cần dùng hook này.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm      | useInsertionEffect | useLayoutEffect         | useEffect    |
| ------------- | ------------------ | ----------------------- | ------------ |
| Chạy trước    | DOM mutations      | DOM mutations           | DOM paint    |
| Chặn painting | Có                 | Có                      | Không        |
| Dùng cho      | CSS-in-JS          | Synchronous DOM updates | Side effects |

## Best Practices / Các thực hành tốt

1. **Dùng cho CSS-in-JS libraries**:

   ```javascript
   useInsertionEffect(() => {
     // Inject styles
   }, [styles]);
   ```

2. **Cleanup resources**:

   ```javascript
   useInsertionEffect(() => {
     const style = document.createElement("style");
     document.head.appendChild(style);
     return () => document.head.removeChild(style);
   }, []);
   ```

3. **Khai báo dependencies đầy đủ**:
   ```javascript
   useInsertionEffect(() => {
     console.log(color);
   }, [color]);
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Using for DOM Measurements

```javascript
// ❌ Sai - không đúng lúc để đo DOM
useInsertionEffect(() => {
  const height = element.offsetHeight; // Có thể là 0
}, []);

// ✅ Đúng - dùng useLayoutEffect
useLayoutEffect(() => {
  const height = element.offsetHeight;
}, []);
```

### 2. Not Cleaning Up

```javascript
// ❌ Sai - memory leak
useInsertionEffect(() => {
  const style = document.createElement("style");
  document.head.appendChild(style);
}, []);

// ✅ Đúng - cleanup
useInsertionEffect(() => {
  const style = document.createElement("style");
  document.head.appendChild(style);
  return () => document.head.removeChild(style);
}, []);
```

## Performance Considerations / Yếu tố hiệu suất

1. **Blocks mutations**: Chặn DOM mutations cho đến khi effect hoàn thành.

2. **CSS-in-JS overhead**: Có thể có overhead với nhiều style injections.

## Câu hỏi phỏng vấn / Interview Questions

1. `useInsertionEffect` là gì? Khi nào nên dùng?

2. Sự khác biệt giữa `useInsertionEffect`, `useLayoutEffect`, và `useEffect`?

3. Khi nào nên dùng `useInsertionEffect` thay vì `useEffect`?

4. `useInsertionEffect` hỗ trợ CSS-in-JS như thế nào?

5. Làm thế nào để inject styles với `useInsertionEffect`?

6. Làm thế nào để load fonts với `useInsertionEffect`?

7. Làm thế nào để cleanup trong `useInsertionEffect`?

8. Performance considerations với `useInsertionEffect`?

9. Làm thế nào để debug `useInsertionEffect`?

10. Làm thế nào để setup animation keyframes?

## Tài liệu tham khảo / References

- [useInsertionEffect - React Official Docs](https://react.dev/reference/react/useInsertionEffect)
- [Synchronizing with Effects - React Official Docs](https://react.dev/learn/synchronizing-with-effects)
- [You Might Not Need an Effect - React Official Docs](https://react.dev/learn/you-might-not-need-an-effect)

---

_Last updated: 2026-01-31_
