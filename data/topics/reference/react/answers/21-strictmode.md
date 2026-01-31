# StrictMode / StrictMode

## Định nghĩa / Definition

[`StrictMode`](https://react.dev/reference/react/StrictMode) là một built-in component trong React giúp **phát hiện các vấn đề tiềm ẩn** trong application. Nó chỉ hoạt động trong development và không ảnh hưởng đến production build.

## Cú pháp / Syntax

```jsx
<StrictMode>{/* children */}</StrictMode>
```

## Tham số / Parameters

| Tham số    | Kiểu | Mô tả                                          |
| ---------- | ---- | ---------------------------------------------- |
| `children` | Node | Các components con muốn wrap trong StrictMode. |

## Giá trị trả về / Return Value

Trả về children components đã được wrapped với StrictMode checks.

## Cách hoạt động / How it Works

### Development Only

StrictMode chỉ hoạt động trong development:

- **Development**: Kích hoạt các checks và warnings
- **Production**: Không có effect, không render anything

### Double Invoking

StrictMode **double invokes** các functions để detect side effects:

```jsx
function MyComponent() {
  console.log("render"); // In ra 2 lần trong development
  return <div>Hello</div>;
}
```

### Checks Performed

1. **Identifying unsafe lifecycles**: Detect các lifecycle methods không an toàn.
2. **Warning about legacy string ref API**: Cảnh báo về string refs.
3. **Warning about deprecated findDOMNode**: Cảnh báo về `findDOMNode`.
4. **Detecting unexpected side effects**: Double invoke để detect side effects.
5. **Detecting legacy context API**: Cảnh báo về legacy context.
6. **Detecting unsafe refs**: Cảnh báo về unsafe ref usage.

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { StrictMode } from "react";

function App() {
  return (
    <StrictMode>
      <Header />
      <Main />
      <Footer />
    </StrictMode>
  );
}
```

### Ví dụ với Side Effect Detection

```jsx
import { StrictMode, useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  // ❌ Bad: Side effect trong render body
  console.log("Side effect in render!"); // In ra 2 lần

  // ✅ Good: Side effect trong useEffect
  useEffect(() => {
    console.log("Effect runs once");
  }, []);

  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}

function App() {
  return (
    <StrictMode>
      <Counter />
    </StrictMode>
  );
}
```

### Ví dụ với Cleanup Functions

```jsx
import { StrictMode, useEffect } from "react";

function SubscriptionComponent() {
  useEffect(() => {
    const subscription = subscribe();

    // Cleanup function được gọi 2 lần trong development
    return () => {
      subscription.unsubscribe();
      console.log("Cleanup called");
    };
  }, []);

  return <div>Subscription Component</div>;
}

function App() {
  return (
    <StrictMode>
      <SubscriptionComponent />
    </StrictMode>
  );
}
```

### Ví dụ với Class Components

```jsx
import { StrictMode, Component } from "react";

class MyComponent extends Component {
  // ❌ Unsafe: componentWillMount
  componentWillMount() {
    console.log("componentWillMount is unsafe!");
  }

  // ✅ Safe: componentDidMount
  componentDidMount() {
    console.log("componentDidMount is safe");
  }

  render() {
    return <div>Class Component</div>;
  }
}

function App() {
  return (
    <StrictMode>
      <MyComponent />
    </StrictMode>
  );
}
```

### Ví dụ với Refs

```jsx
import { StrictMode, useRef, useEffect } from "react";

function RefComponent() {
  const ref = useRef(null);

  useEffect(() => {
    // ✅ Safe: Access ref trong effect
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return <input ref={ref} />;
}

function App() {
  return (
    <StrictMode>
      <RefComponent />
    </StrictMode>
  );
}
```

### Ví dụ với Context

```jsx
import { StrictMode, createContext, useContext } from "react";

const ThemeContext = createContext("light");

function ThemedComponent() {
  const theme = useContext(ThemeContext);
  return <div>Theme: {theme}</div>;
}

function App() {
  return (
    <StrictMode>
      <ThemeContext.Provider value="dark">
        <ThemedComponent />
      </ThemeContext.Provider>
    </StrictMode>
  );
}
```

### Ví dụ với Multiple StrictModes

```jsx
import { StrictMode } from "react";

function App() {
  return (
    <StrictMode>
      <Header />
      <StrictMode>
        <Main />
      </StrictMode>
      <Footer />
    </StrictMode>
  );
}
```

## Khi nào nên dùng / When to Use

- Trong development để detect issues
- Khi muốn phát hiện side effects trong render
- Khi muốn migrate từ legacy APIs
- Khi muốn ensure code quality
- Khi muốn detect unsafe patterns

## Khi nào KHÔNG nên dùng / When NOT to Use

- Trong production (không có effect)
- Khi không muốn double invocation
- Khi component có intentional side effects
- Khi performance là critical concern

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng StrictMode:

1. **Hidden bugs**: Side effects trong render không được detect.

2. **Legacy APIs**: Không có warnings về deprecated APIs.

3. **Unsafe patterns**: Không detect unsafe lifecycle methods.

4. **Harder migration**: Khó hơn khi migrate từ React 17 sang 18+.

## Vấn đề được giải quyết / Problems Solved

### 1. Side Effect Detection

Double invoking giúp detect side effects trong render.

### 2. Legacy API Warnings

Cảnh báo về deprecated và unsafe APIs.

### 3. Future-Proofing

Giúp code tương thích với các phiên bản React tương lai.

### 4. Better Code Quality

Giúp viết code an toàn và tốt hơn.

## Ưu điểm / Advantages

1. **Development only**: Không ảnh hưởng production.

2. **Automatic checks**: Tự động detect issues.

3. **No runtime cost**: Không có performance impact trong production.

4. **Future-proof**: Giúp chuẩn bị cho các tính năng mới.

5. **Easy to use**: Dễ sử dụng, chỉ cần wrap components.

## Nhược điểm / Disadvantages

1. **Double invocation**: Có thể gây confusion với side effects.

2. **Console noise**: Nhiều warnings trong console.

3. **Not production**: Không hoạt động trong production.

4. **Learning curve**: Cần hiểu về side effects và React patterns.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm              | StrictMode | ESLint | TypeScript |
| --------------------- | ---------- | ------ | ---------- |
| Side effect detection | Có         | Không  | Không      |
| Legacy API warnings   | Có         | Có     | Không      |
| Runtime checks        | Có         | Không  | Có         |
| Compile-time checks   | Không      | Có     | Có         |
| Development only      | Có         | Không  | Không      |

## Best Practices / Các thực hành tốt

1. **Luôn dùng trong development**:

   ```jsx
   <StrictMode>
     <App />
   </StrictMode>
   ```

2. **Fix warnings ngay**:

   ```jsx
   // Fix warnings khi thấy trong console
   ```

3. **Avoid side effects in render**:

   ```jsx
   // ❌ Bad
   function Component() {
     console.log("side effect");
     return <div />;
   }

   // ✅ Good
   function Component() {
     useEffect(() => {
       console.log("side effect");
     }, []);
     return <div />;
   }
   ```

4. **Use cleanup functions**:

   ```jsx
   useEffect(() => {
     const sub = subscribe();
     return () => sub.unsubscribe();
   }, []);
   ```

5. **Migrate from legacy APIs**:
   ```jsx
   // Migrate từ componentWillMount sang componentDidMount
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Side Effects in Render

```jsx
// ❌ Bad: Side effect trong render
function Component() {
  console.log("render"); // In ra 2 lần
  return <div />;
}

// ✅ Good: Side effect trong useEffect
function Component() {
  useEffect(() => {
    console.log("effect"); // Chạy 1 lần
  }, []);
  return <div />;
}
```

### 2. Ignoring Warnings

```jsx
// ❌ Ignoring warnings
// Warning: componentWillMount is deprecated

// ✅ Fix warnings
// Migrate sang componentDidMount hoặc useEffect
```

### 3. Confusion with Double Invocation

```jsx
// ❌ Confused về double invocation
function Component() {
  console.log("render"); // Tại sao in ra 2 lần?
  return <div />;
}

// ✅ Hiểu rằng đó là feature
// StrictMode double invoke để detect side effects
```

### 4. Using in Production

```jsx
// ❌ Không cần trong production
<StrictMode>
  <App />
</StrictMode>;

// ✅ Chỉ dùng trong development
if (process.env.NODE_ENV === "development") {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}
```

## Performance Considerations / Yếu tố hiệu suất

1. **No production impact**: StrictMode không có effect trong production.

2. **Development overhead**: Double invocation có thể gây overhead nhẹ trong development.

3. **No runtime cost**: Không có performance cost trong production.

4. **Better long-term performance**: Giúp detect và fix performance issues sớm.

## Browser Support / Hỗ trợ trình duyệt

StrictMode hoạt động trên tất cả trình duyệt hỗ trợ React.

## Câu hỏi phỏng vấn / Interview Questions

1. StrictMode là gì? Khi nào nên dùng?

2. StrictMode hoạt động như thế nào?

3. Tại sao StrictMode double invoke components?

4. StrictMode có hoạt động trong production không?

5. Những checks nào StrictMode thực hiện?

6. Làm thế nào StrictMode giúp phát hiện side effects?

7. Sự khác biệt giữa development và production với StrictMode?

8. Làm thế nào để fix warnings từ StrictMode?

9. StrictMode có impact performance không?

10. Có thể nest StrictModes không?

11. StrictMode có hoạt động với SSR không?

12. Làm thế nào StrictMode giúp migration?

13. Legacy APIs nào StrictMode cảnh báo?

14. Làm thế nào để disable StrictMode?

15. StrictMode có hoạt động với TypeScript không?

## Tài liệu tham khảo / References

- [StrictMode - React Official Docs](https://react.dev/reference/react/StrictMode)
- [Strict Mode - React Docs](https://react.dev/reference/react/StrictMode)
- [React 18 Documentation](https://react.dev/blog/2022/03/29/react-v18)

---

_Last updated: 2026-01-31_
