# useCallback / useCallback

## Định nghĩa / Definition

[`useCallback`](https://react.dev/reference/react/useCallback) là một hook trong React cho phép bạn memoize (cache) một function definition. Nó trả về cùng function instance giữa các renders trừ khi dependencies thay đổi, giúp tối ưu hiệu suất khi truyền functions cho child components.

## Cú pháp / Syntax

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

## Tham số / Parameters

| Tham số        | Kiểu     | Mô tả                                  |
| -------------- | -------- | -------------------------------------- |
| `callback`     | Function | Function cần memoize                   |
| `dependencies` | Array    | List các giá trị mà callback phụ thuộc |

## Giá trị trả về / Return Value

| Giá trị            | Kiểu     | Mô tả                                    |
| ------------------ | -------- | ---------------------------------------- |
| `memoizedCallback` | Function | Function instance từ lần render gần nhất |

## Cách hoạt động / How it Works

### Function Memoization

`useCallback` cache function definition và chỉ tạo function mới khi dependencies thay đổi:

```javascript
const handleClick = useCallback(() => {
  console.log("Clicked!");
}, []); // Function instance giữ nguyên
```

### Dependency Array

| Dependency Array      | Hành vi                                             |
| --------------------- | --------------------------------------------------- |
| `[]` (empty)          | Function instance giữ nguyên qua các renders        |
| `[dep1, dep2]`        | Tạo function mới khi dep1 hoặc dep2 thay đổi        |
| `undefined` (omitted) | Tạo function mới sau mỗi render (không khuyến nghị) |

### Reference Equality

`useCallback` dùng reference equality để check dependencies thay đổi:

```javascript
// ❌ Sai - function mới mỗi render
const handleClick = useCallback(() => console.log(a), [a]);

// ✅ Đúng - dùng useCallback để memoize
const handleClick = useCallback(() => console.log(a), [a]);
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { useCallback, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount((c) => c - 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

### Ví dụ với Child Component

```jsx
function Button({ onClick, children }) {
  console.log("Button rendered");
  return <button onClick={onClick}>{children}</button>;
}

function Parent() {
  const [count, setCount] = useState(0);

  // ❌ Sai - function mới mỗi render, Button re-render
  const handleClick = () => setCount((c) => c + 1);

  // ✅ Đúng - function memoized, Button không re-render
  const handleClick = useCallback(() => setCount((c) => c + 1), []);

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={handleClick}>Increment</Button>
    </div>
  );
}
```

### Ví dụ với Dependencies

```jsx
function SearchResults({ query, results }) {
  const handleClick = useCallback(
    (id) => {
      console.log("Clicked:", id, "Query:", query);
    },
    [query],
  ); // Function mới khi query thay đổi

  return (
    <ul>
      {results.map((item) => (
        <li key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}
```

### Ví dụ với Multiple Dependencies

```jsx
function Form({ onSubmit, initialValues }) {
  const [values, setValues] = useState(initialValues);

  const handleSubmit = useCallback(() => {
    onSubmit(values);
  }, [onSubmit, values]); // Function mới khi onSubmit hoặc values thay đổi

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
}
```

### Ví dụ Debounce với useCallback

```jsx
function SearchInput({ onSearch }) {
  const [query, setQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      onSearch(searchQuery);
    }, 300),
    [onSearch],
  );

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  return (
    <input value={query} onChange={handleChange} placeholder="Search..." />
  );
}

function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
```

### Ví dụ với TypeScript

```tsx
interface Props {
  onAdd: (item: string) => void;
}

function AddItem({ onAdd }: Props) {
  const [item, setItem] = useState("");

  const handleAdd = useCallback(() => {
    if (item.trim()) {
      onAdd(item);
      setItem("");
    }
  }, [item, onAdd]);

  return (
    <div>
      <input value={item} onChange={(e) => setItem(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi truyền function props cho child components được memoized với `React.memo`
- Khi function được tạo trong render body và phụ thuộc vào props/state
- Khi muốn tránh child components re-render không cần thiết
- Khi function được dùng làm dependency trong `useEffect` hoặc `useMemo`

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi function không được truyền cho child components
- Khi function không phụ thuộc vào props/state
- Khi muốn function tạo lại mỗi render
- Khi dependencies thay đổi mỗi render (không có lợi ích)

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `useCallback`, bạn sẽ gặp các vấn đề sau:

1. **Child components re-render**: Mỗi lần parent re-render, function prop thay đổi, child components re-render.

2. **Unnecessary re-renders**: Child components được memoized vẫn re-render khi function prop thay đổi.

3. **Performance issues**: Với nhiều child components, có thể dẫn đến hiệu suất kém.

## Vấn đề được giải quyết / Problems Solved

### 1. Child Component Re-renders

`useCallback` giúp tránh child components re-render khi function prop không thay đổi.

### 2. Function Reference Stability

Giữ nguyên function instance giữa các renders, giúp `React.memo` hoạt động hiệu quả.

## Ưu điểm / Advantages

1. **Performance optimization**: Giảm child components re-render.

2. **Function reference stability**: Giữ nguyên function instance giữa các renders.

3. **Simple API**: API đơn giản, dễ hiểu và dùng.

## Nhược điểm / Disadvantages

1. **Overhead**: Có một chút overhead để check dependencies.

2. **Overuse**: Dùng quá nhiều có thể làm code khó hiểu và không có lợi ích hiệu suất.

3. **Complex dependencies**: Phải hiểu rõ dependencies để tránh bugs.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm     | useCallback    | useMemo                | Inline functions |
| ------------ | -------------- | ---------------------- | ---------------- |
| Memoize      | Functions      | Values                 | Không            |
| Use case     | Event handlers | Expensive calculations | Simple cases     |
| Dependencies | Required       | Required               | Không            |

## Best Practices / Các thực hành tốt

1. **Dùng cho event handlers**:

   ```javascript
   const handleClick = useCallback(() => {
     /* logic */
   }, [dep]);
   ```

2. **Khai báo dependencies đầy đủ**:

   ```javascript
   // ❌ Sai - missing dependency
   const handleClick = useCallback(() => console.log(a), []);

   // ✅ Đúng - thêm a vào dependencies
   const handleClick = useCallback(() => console.log(a), [a]);
   ```

3. **Không dùng cho simple functions**:

   ```javascript
   // ❌ Sai - function đơn giản
   const handleClick = useCallback(() => console.log("click"), []);

   // ✅ Đúng - inline function
   <button onClick={() => console.log("click")}>Click</button>;
   ```

4. **Dùng với TypeScript để type function**:
   ```typescript
   const handleClick = useCallback((id: number) => {
     console.log(id);
   }, []);
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Missing Dependencies

```javascript
// ❌ Sai - missing dependency
const handleClick = useCallback(() => console.log(a), []);

// ✅ Đúng - thêm a vào dependencies
const handleClick = useCallback(() => console.log(a), [a]);
```

### 2. Overusing useCallback

```javascript
// ❌ Sai - function đơn giản
const handleClick = useCallback(() => console.log("click"), []);

// ✅ Đúng - inline function
<button onClick={() => console.log("click")}>Click</button>;
```

### 3. Not Understanding Reference Equality

```javascript
// ❌ Sai - object mới mỗi render
const handleClick = useCallback(() => console.log({ a, b }), [a, b]);

// ✅ Đúng - dùng useMemo cho object
const data = useMemo(() => ({ a, b }), [a, b]);
const handleClick = useCallback(() => console.log(data), [data]);
```

## Performance Considerations / Yếu tố hiệu suất

1. **Function memoization**: Cache function definition, chỉ tạo mới khi dependencies thay đổi.

2. **Child component optimization**: Giúp `React.memo` hoạt động hiệu quả.

3. **Memory overhead**: Cache functions có thể tốn bộ nhớ nếu dùng quá nhiều.

## Câu hỏi phỏng vấn / Interview Questions

1. `useCallback` là gì? Khi nào nên dùng?

2. `useCallback` hoạt động như thế nào?

3. Dependency array trong `useCallback` hoạt động như thế nào?

4. Khi nào nên dùng `useCallback` thay vì inline function?

5. Sự khác biệt giữa `useCallback` và `useMemo`?

6. Sự khác biệt giữa `useCallback` và `React.memo`?

7. Làm thế nào để memoize event handlers?

8. Làm thế nào để tránh child components re-render?

9. Reference equality trong `useCallback` là gì?

10. Làm thế nào để type `useCallback` với TypeScript?

11. Khi nào `useCallback` không có lợi ích?

12. Làm thế nào để debug `useCallback`?

13. Làm thế nào để measure performance của `useCallback`?

14. Làm thế nào để combine `useCallback` với `useMemo`?

15. Làm thế nào để handle async operations với `useCallback`?

## Tài liệu tham khảo / References

- [useCallback - React Official Docs](https://react.dev/reference/react/useCallback)
- [Memoizing Functions - React Official Docs](https://react.dev/reference/react/useCallback)
- [Referencing Values with Refs - React Official Docs](https://react.dev/learn/referencing-values-with-refs)

---

_Last updated: 2026-01-31_
