# React Compiler / React Compiler

## Định nghĩa / Definition

[`React Compiler`](https://react.dev/learn/react-compiler) là một **build-time optimizer** tự động tối ưu hóa components của bạn. Nó hoạt động như một plugin cho bundlers (Vite, Webpack, Next.js) và tự động áp dụng các optimizations như `useMemo`, `useCallback`, và `React.memo`.

## Cú pháp / Syntax

Không có cú pháp trực tiếp. React Compiler hoạt động như một plugin trong build process.

## Cách hoạt động / How it Works

### Automatic Optimizations

React Compiler tự động áp dụng các optimizations:

| Optimization    | Mô tả                           |
| --------------- | ------------------------------- |
| `useMemo`       | Tự động memoize computed values |
| `useCallback`   | Tự động memoize functions       |
| `React.memo`    | Tự động memoize components      |
| `useTransition` | Tự động mark transitions        |

### Build Process

```
Source Code → React Compiler → Optimized Code → Bundle
```

### No Code Changes

Bạn **không cần thay đổi code** - React Compiler tự động optimize:

```jsx
// Source code - không cần useMemo
function Component({ items }) {
  const filtered = items.filter((item) => item.active);
  return <List items={filtered} />;
}

// React Compiler tự động optimize thành:
function Component({ items }) {
  const filtered = useMemo(() => items.filter((item) => item.active), [items]);
  return <List items={filtered} />;
}
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
// Không cần useMemo - React Compiler tự động optimize
function ExpensiveComponent({ data }) {
  const sorted = data.sort((a, b) => a.id - b.id);
  const filtered = sorted.filter((item) => item.active);
  const result = filtered.map((item) => item.value * 2);

  return <div>{result.join(", ")}</div>;
}
```

### Ví dụ với Component Memoization

```jsx
// Không cần React.memo - React Compiler tự động optimize
function ProductCard({ product }) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
}

function ProductList({ products }) {
  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Ví dụ với Function Memoization

```jsx
// Không cần useCallback - React Compiler tự động optimize
function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((c) => c + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

function ChildComponent({ onClick }) {
  return <button onClick={onClick}>Click me</button>;
}
```

### Ví dụ với Context Optimization

```jsx
// React Compiler tự động optimize context consumers
function ThemedComponent() {
  const theme = useContext(ThemeContext);

  return (
    <div className={theme}>
      <h1>Themed Component</h1>
    </div>
  );
}
```

### Ví dụ với List Rendering

```jsx
// React Compiler tự động optimize list rendering
function TodoList({ todos }) {
  const activeTodos = todos.filter((todo) => todo.completed === false);

  return (
    <ul>
      {activeTodos.map((todo) => (
        <li key={todo.id}>
          <input type="checkbox" checked={todo.completed} />
          <span>{todo.text}</span>
        </li>
      ))}
    </ul>
  );
}
```

### Ví dụ với Conditional Rendering

```jsx
// React Compiler tự động optimize conditional rendering
function ConditionalComponent({ show, data }) {
  return (
    <div>
      {show && <Header />}
      {data && <Content data={data} />}
      {show && <Footer />}
    </div>
  );
}
```

### Ví dụ với Vite Configuration

```javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // React Compiler plugin
          "babel-plugin-react-compiler",
        ],
      },
    }),
  ],
});
```

### Ví dụ với Next.js Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // React Compiler tự động được enable trong Next.js 15+
};

module.exports = nextConfig;
```

## Khi nào nên dùng / When to Use

- Khi muốn tối ưu performance mà không cần manual optimizations
- Khi codebase lớn với nhiều components
- Khi muốn giảm boilerplate code (`useMemo`, `useCallback`)
- Khi dùng React 18+ hoặc React 19+
- Khi muốn automatic optimizations

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi cần manual control optimizations
- Khi code có side effects không thể auto-optimize
- Khi dùng React < 18
- Khi muốn debug optimization issues

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng React Compiler:

1. **Manual optimizations**: Phải tự viết `useMemo`, `useCallback`, `React.memo`.

2. **Boilerplate code**: Nhiều code lặp lại cho optimizations.

3. **Performance issues**: Có thể miss optimizations hoặc optimize sai.

4. **Maintenance overhead**: Phải maintain optimizations thủ công.

## Vấn đề được giải quyết / Problems Solved

### 1. Automatic Optimizations

Tự động áp dụng `useMemo`, `useCallback`, `React.memo`.

### 2. Reduced Boilerplate

Không cần viết manual optimization code.

### 3. Better Performance

Tối ưu performance với automatic optimizations.

### 4. Build-time Analysis

Analyze code tại build time và apply optimizations.

## Ưu điểm / Advantages

1. **Automatic**: Tự động optimize code.

2. **No code changes**: Không cần thay đổi code.

3. **Better performance**: Tối ưu performance.

4. **Reduced boilerplate**: Giảm code lặp lại.

5. **Build-time**: Optimizations được áp dụng tại build time.

## Nhược điểm / Disadvantages

1. **React 18+**: Chỉ hoạt động với React 18 trở lên.

2. **Build tool requirement**: Cần build tool hỗ trợ (Vite 5+, Webpack 5+).

3. **Debugging**: Khó debug khi compiler tự động optimize code.

4. **Limited control**: Không có manual control over optimizations.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm        | React Compiler | Manual optimizations | useMemo/useCallback |
| --------------- | -------------- | -------------------- | ------------------- |
| Automatic       | Có             | Không                | Không               |
| No code changes | Có             | Không                | Không               |
| Build-time      | Có             | Không                | Không               |
| Runtime         | Có             | Có                   | Có                  |
| Control         | Ít             | Đầy đủ               | Đầy đủ              |

## Best Practices / Các thực hành tốt

1. **Enable trong build config**:

   ```javascript
   // vite.config.js
   export default defineConfig({
     plugins: [react({ babel: { plugins: ["babel-plugin-react-compiler"] } }],
   });
   ```

2. **Không cần manual optimizations**:

   ```jsx
   // ❌ Không cần
   const value = useMemo(() => expensiveComputation(data), [data]);

   // ✅ React Compiler tự động optimize
   const value = expensiveComputation(data);
   ```

3. **Test với và không có compiler**:

   ```jsx
   // Test cả 2 cases để đảm bảo behavior giống nhau
   ```

4. **Review compiler output**:

   ```javascript
   // Kiểm tra optimized code
   ```

5. **Dùng với TypeScript**:
   ```tsx
   // React Compiler hoạt động tốt với TypeScript
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Manual Optimizations

```jsx
// ❌ Không cần - React Compiler tự động optimize
const value = useMemo(() => compute(data), [data]);

// ✅ Đúng - để compiler optimize
const value = compute(data);
```

### 2. Wrong Build Configuration

```javascript
// ❌ Sai - không có plugin
export default defineConfig({
  plugins: [react()],
});

// ✅ Đúng - có React Compiler plugin
export default defineConfig({
  plugins: [react({ babel: { plugins: ["babel-plugin-react-compiler"] } }],
});
```

### 3. Not Checking Compatibility

```javascript
// ❌ Không check version
// React Compiler cần React 18+

// ✅ Kiểm tra version
import { version } from "react";
const [major] = version.split(".")[0];
if (parseInt(major) < 18) {
  console.warn("React Compiler requires React 18+");
}
```

### 4. Ignoring Build Warnings

```javascript
// ❌ Ignoring warnings
// React Compiler có thể generate warnings

// ✅ Review và fix warnings
// Check build output và fix issues
```

## Performance Considerations / Yếu tố hiệu suất

1. **Build-time optimization**: Optimizations được áp dụng tại build time.

2. **Runtime performance**: Tối ưu runtime performance.

3. **Bundle size**: Có thể giảm bundle size.

4. **Memory usage**: Tối ưu memory usage.

## Browser Support / Hỗ trợ trình duyệt

React Compiler hoạt động trên tất cả trình duyệt hỗ trợ React 18+.

## Câu hỏi phỏng vấn / Interview Questions

1. React Compiler là gì? Khi nào nên dùng?

2. React Compiler hoạt động như thế nào?

3. React Compiler tự động optimize những gì?

4. Sự khác biệt giữa React Compiler và manual optimizations?

5. React Compiler có cần code changes không?

6. React Compiler hoạt động với React 17 không?

7. Làm thế nào để enable React Compiler trong Vite?

8. Làm thế nào React Compiler giúp cải thiện performance?

9. React Compiler có hoạt động với TypeScript không?

10. React Compiler có hoạt động với SSR không?

11. Làm thế nào để test với React Compiler?

12. React Compiler có những limitations nào?

13. Làm thế nào để debug React Compiler output?

14. React Compiler khác gì với Babel?

15. Làm thế nào React Compiler tối ưu `useMemo` và `useCallback`?

## Tài liệu tham khảo / References

- [React Compiler - React Official Docs](https://react.dev/learn/react-compiler)
- [React 18 Documentation](https://react.dev/blog/2022/03/29/react-v18)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [Vite Plugin React - GitHub](https://github.com/vitejs/vite-plugin-react)

---

_Last updated: 2026-01-31_
