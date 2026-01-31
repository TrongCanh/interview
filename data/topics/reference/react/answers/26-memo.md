# memo / memo

## Định nghĩa / Definition

[`memo`](https://react.dev/reference/react/memo) là một higher-order component (HOC) trong React cho phép bạn **memoize** một component để tránh re-render khi props không thay đổi.

## Cú pháp / Syntax

```javascript
const MemoizedComponent = memo(Component, arePropsEqual?);
```

## Tham số / Parameters

| Tham số         | Kiểu       | Mô tả                                           |
| --------------- | ---------- | ----------------------------------------------- |
| `Component`     | `function` | Component muốn memoize.                         |
| `arePropsEqual` | `function` | (Optional) Function để custom comparison logic. |

### arePropsEqual Parameters

| Tham số     | Kiểu     | Mô tả                     |
| ----------- | -------- | ------------------------- |
| `prevProps` | `object` | Props từ render trước.    |
| `nextProps` | `object` | Props từ render hiện tại. |

### arePropsEqual Return Value

| Giá trị | Mô tả                                 |
| ------- | ------------------------------------- |
| `true`  | Props bằng nhau, không cần re-render. |
| `false` | Props khác nhau, cần re-render.       |

## Giá trị trả về / Return Value

Trả về một memoized version của component.

## Cách hoạt động / How it Works

### Shallow Comparison

Mặc định, `memo` dùng **shallow comparison** để kiểm tra props:

```javascript
// Mặc định
memo(Component);

// Tương đương với
memo(Component, (prevProps, nextProps) => {
  return shallowEqual(prevProps, nextProps);
});
```

### Re-render Prevention

Component chỉ re-render khi:

- Props thay đổi (shallow comparison trả về `false`)
- State thay đổi trong component
- Context thay đổi

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { memo } from "react";

const ExpensiveComponent = memo(function ExpensiveComponent({ value }) {
  console.log("ExpensiveComponent rendered");
  // Expensive computation
  const result = heavyComputation(value);
  return <div>Result: {result}</div>;
});

function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(100);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <ExpensiveComponent value={value} />
    </div>
  );
}
```

### Ví dụ với Object Props

```jsx
import { memo, useState } from "react";

const UserProfile = memo(function UserProfile({ user }) {
  console.log("UserProfile rendered");
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
});

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({
    name: "John",
    email: "john@example.com",
  });

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <UserProfile user={user} />
    </div>
  );
}
```

### Ví dụ với Custom Comparison

```jsx
import { memo } from "react";

const ProductCard = memo(
  function ProductCard({ product }) {
    console.log("ProductCard rendered");
    return (
      <div>
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison: chỉ compare id
    return prevProps.product.id === nextProps.product.id;
  },
);
```

### Ví dụ với Function Props

```jsx
import { memo, useCallback, useState } from "react";

const Button = memo(function Button({ onClick, children }) {
  console.log("Button rendered");
  return <button onClick={onClick}>{children}</button>;
});

function App() {
  const [count, setCount] = useState(0);

  // Dùng useCallback để giữ function reference stable
  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={handleClick}>Increment</Button>
    </div>
  );
}
```

### Ví dụ với List Rendering

```jsx
import { memo } from "react";

const TodoItem = memo(function TodoItem({ todo, onToggle, onDelete }) {
  console.log(`TodoItem ${todo.id} rendered`);
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
});

function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
```

### Ví dụ với TypeScript

```tsx
import { memo } from "react";

interface Props {
  title: string;
  description: string;
}

const Card = memo(function Card({ title, description }: Props) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
});
```

## Khi nào nên dùng / When to Use

- Khi component re-render thường xuyên với cùng props
- Khi component có expensive rendering logic
- Khi component được render nhiều lần trong list
- Khi muốn optimize performance

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi component re-render ít
- Khi props thay đổi thường xuyên
- Khi component có internal state thay đổi thường xuyên
- Khi muốn re-render mỗi lần parent render

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `memo`:

1. **Unnecessary re-renders**: Components re-render ngay cả khi props không thay đổi.

2. **Poor performance**: Expensive components chạy lại không cần thiết.

3. **Wasted computation**: Computations lặp lại khi không cần.

## Vấn đề được giải quyết / Problems Solved

### 1. Unnecessary Re-renders

Tránh re-render khi props không thay đổi.

### 2. Performance Optimization

Optimize performance cho expensive components.

### 3. List Rendering

Optimize rendering của lists với nhiều items.

## Ưu điểm / Advantages

1. **Simple API**: Dễ sử dụng.

2. **Automatic optimization**: Tự động prevent unnecessary re-renders.

3. **Custom comparison**: Có thể custom comparison logic.

4. **TypeScript support**: Tốt với TypeScript.

## Nhược điểm / Disadvantages

1. **Shallow comparison**: Chỉ shallow compare props.

2. **Extra memory**: Có memory overhead cho memoization.

3. **Not always beneficial**: Có thể không giúp trong một số cases.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm              | memo  | PureComponent | React.memo | useMemo |
| --------------------- | ----- | ------------- | ---------- | ------- |
| Functional components | Có    | Không         | Có         | N/A     |
| Class components      | Không | Có            | Không      | N/A     |
| Shallow compare       | Có    | Có            | Có         | N/A     |
| Custom compare        | Có    | Không         | Có         | N/A     |

## Best Practices / Các thực hành tốt

1. **Dùng cho expensive components**:

   ```jsx
   const ExpensiveComponent = memo(Component);
   ```

2. **Dùng với useCallback**:

   ```jsx
   const handleClick = useCallback(() => {}, []);
   <MemoizedComponent onClick={handleClick} />;
   ```

3. **Custom comparison khi cần**:

   ```jsx
   memo(Component, (prev, next) => prev.id === next.id);
   ```

4. **Không dùng cho tất cả components**:

   ```jsx
   // ❌ Không cần memo cho simple components
   const SimpleComponent = memo(() => <div>Hello</div>);

   // ✅ Chỉ memo khi cần
   const ExpensiveComponent = memo(ExpensiveComponent);
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Not Using with useCallback

```jsx
// ❌ Sai - function props thay đổi mỗi render
<MemoizedComponent onClick={() => console.log("click")} />;

// ✅ Đúng - dùng useCallback
const handleClick = useCallback(() => console.log("click"), []);
<MemoizedComponent onClick={handleClick} />;
```

### 2. Mutating Props

```jsx
// ❌ Sai - mutate props
<MemoizedComponent data={data} />
// Sau đó mutate data

// ✅ Đúng - tạo object mới
<MemoizedComponent data={{ ...data }} />
```

### 3. Memoizing Everything

```jsx
// ❌ Không cần memo tất cả
const SimpleComponent = memo(() => <div>Hello</div>);
const AnotherSimple = memo(() => <span>World</span>);

// ✅ Chỉ memo khi cần
const ExpensiveComponent = memo(ExpensiveComponent);
```

### 4. Forgetting Key in Lists

```jsx
// ❌ Thiếu key
{
  items.map((item) => <MemoizedItem item={item} />);
}

// ✅ Có key
{
  items.map((item) => <MemoizedItem key={item.id} item={item} />);
}
```

## Performance Considerations / Yếu tố hiệu suất

1. **Reduced re-renders**: Giảm số lần re-render không cần thiết.

2. **Memory overhead**: Có memory overhead cho memoization.

3. **Comparison cost**: Shallow comparison có cost nhỏ.

4. **Best for expensive components**: Tốt nhất cho expensive components.

## Browser Support / Hỗ trợ trình duyệt

`memo` hoạt động trên tất cả trình duyệt hỗ trợ React.

## Câu hỏi phỏng vấn / Interview Questions

1. `memo` là gì? Khi nào nên dùng?

2. `memo` hoạt động như thế nào?

3. Sự khác biệt giữa `memo` và `PureComponent`?

4. `memo` có shallow compare hay deep compare?

5. Làm thế nào để custom comparison logic trong `memo`?

6. `memo` có prevent re-render khi state thay đổi không?

7. Tại sao cần dùng `useCallback` với `memo`?

8. `memo` có hoạt động với SSR không?

9. Làm thế nào `memo` giúp cải thiện performance?

10. Có nên memo tất cả components không?

11. `memo` có hoạt động với TypeScript không?

12. Làm thế nào để debug memoized components?

13. `memo` có hoạt động với class components không?

14. Khi nào `memo` không giúp improve performance?

15. Làm thế nào để test memoized components?

## Tài liệu tham khảo / References

- [memo - React Official Docs](https://react.dev/reference/react/memo)
- [Optimizing Performance - React Docs](https://react.dev/learn/render-and-commit#react-updates-the-dom)

---

_Last updated: 2026-01-31_
