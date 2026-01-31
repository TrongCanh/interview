# useContext / useContext

## Định nghĩa / Definition

[`useContext`](https://react.dev/reference/react/useContext) là một hook trong React cho phép bạn đọc và subscribe đến context values từ component tree. Context là một cách để truyền data qua component tree mà không cần truyền props thủ công qua mỗi level (props drilling).

## Cú pháp / Syntax

```javascript
const value = useContext(Context);
```

## Tham số / Parameters

| Tham số   | Kiểu           | Mô tả                                          |
| --------- | -------------- | ---------------------------------------------- |
| `Context` | Context Object | Context object được tạo bằng `createContext()` |

## Giá trị trả về / Return Value

| Giá trị | Kiểu | Mô tả                                                                                                              |
| ------- | ---- | ------------------------------------------------------------------------------------------------------------------ |
| `value` | Any  | Giá trị context hiện tại cho context này. Giá trị được trả về từ `Context.Provider` gần nhất trong component tree. |

## Cách hoạt động / How it Works

### Context Provider Pattern

Context được tạo bằng `createContext()` và cung cấp giá trị thông qua `Context.Provider`:

```javascript
const MyContext = createContext(defaultValue);

function App() {
  return (
    <MyContext.Provider value={/* some value */}>
      <ChildComponent />
    </MyContext.Provider>
  );
}
```

### Context Consumer Pattern

`useContext` đọc giá trị từ `Context.Provider` gần nhất trong component tree:

```javascript
function ChildComponent() {
  const value = useContext(MyContext);
  return <div>{value}</div>;
}
```

### Context Propagation

Context values được truyền xuống component tree:

1. Component cung cấp value qua `Provider`
2. Tất cả components con có thể đọc value bằng `useContext`
3. Khi Provider value thay đổi, tất cả components dùng `useContext` sẽ re-render

### Default Value

Nếu không có `Provider` trong component tree, `useContext` trả về default value được truyền cho `createContext()`:

```javascript
const MyContext = createContext("default value");

// Không có Provider
function Component() {
  const value = useContext(MyContext); // 'default value'
}
```

### Multiple Contexts

Bạn có thể dùng nhiều contexts trong cùng component:

```javascript
const ThemeContext = createContext("light");
const UserContext = createContext(null);

function Component() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);

  return (
    <div>
      Theme: {theme}, User: {user?.name}
    </div>
  );
}
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext("light");

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme === "light" ? "#fff" : "#333" }}>
      I'm styled by context!
    </button>
  );
}
```

### Ví dụ User Authentication

```jsx
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

function LoginPage() {
  const { login } = useAuth();

  const handleLogin = () => {
    login({ name: "John", email: "john@example.com" });
  };

  return <button onClick={handleLogin}>Login</button>;
}

function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) return <div>Please login</div>;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Ví dụ Multiple Contexts

```jsx
const ThemeContext = createContext("light");
const LanguageContext = createContext("en");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <LanguageContext.Provider value="vi">
        <Content />
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}

function Content() {
  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);

  return (
    <div style={{ background: theme === "dark" ? "#333" : "#fff" }}>
      <p>Language: {language}</p>
      <p>Theme: {theme}</p>
    </div>
  );
}
```

### Ví dụ Dynamic Context Value

```jsx
const CountContext = createContext(0);

function CounterProvider({ children }) {
  const [count, setCount] = useState(0);

  const value = {
    count,
    increment: () => setCount((c) => c + 1),
    decrement: () => setCount((c) => c - 1),
    reset: () => setCount(0),
  };

  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
}

function Counter() {
  const { count, increment, decrement, reset } = useContext(CountContext);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Ví dụ Context với TypeScript

```tsx
interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  const value: AuthContextType = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}
```

## Khi nào nên dùng / When to Use

- Khi cần chia sẻ data giữa nhiều components mà không muốn truyền props thủ công
- Khi cần chia sẻ global state (theme, language, user authentication)
- Khi cần tránh props drilling
- Khi cần chia sẻ functions giữa components (login/logout, theme toggle)
- Khi cần chia sẻ configuration data

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi data chỉ cần ở một component (dùng local state với `useState`)
- Khi data thay đổi thường xuyên và không cần re-render nhiều components (dùng `useState` hoặc `useReducer`)
- Khi data cần được update thường xuyên bởi nhiều components (dùng state management library như Redux, Zustand)
- Khi component tree sâu và chỉ vài components cần data (có thể dùng props drilling hoặc composition)

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `useContext`, bạn sẽ gặp các vấn đề sau:

1. **Props Drilling**: Phải truyền props qua nhiều levels của component tree, làm code rối rắm và khó maintain.

2. **Code Duplication**: Phải viết cùng logic ở nhiều components.

3. **Hard to Refactor**: Khi thay đổi data structure, phải update nhiều components.

4. **Global State Management**: Không có cách nào để chia sẻ global state mà không dùng external libraries.

## Vấn đề được giải quyết / Problems Solved

### 1. Props Drilling

`useContext` giải quyết vấn đề props drilling bằng cách cho phép components đọc data trực tiếp từ context thay vì truyền props qua nhiều levels.

### 2. Global State Sharing

Context cho phép chia sẻ global state (theme, language, user) giữa nhiều components mà không cần external state management libraries.

### 3. Code Reusability

Custom hooks dựa trên context giúp tái sử dụng logic context:

```javascript
function useAuth() {
  return useContext(AuthContext);
}
```

## Ưu điểm / Advantages

1. **Tránh props drilling**: Không cần truyền props qua nhiều levels.

2. **Global state sharing**: Dễ dàng chia sẻ data giữa nhiều components.

3. **Custom hooks**: Có thể tạo custom hooks để tái sử dụng context logic.

4. **TypeScript support**: Tốt với TypeScript, có thể type context values.

5. **Simple API**: API đơn giản, dễ hiểu và dùng.

## Nhược điểm / Disadvantages

1. **Performance issues**: Khi context value thay đổi, tất cả components dùng context sẽ re-render.

2. **Coupling**: Components phụ thuộc vào context, khó test và reuse.

3. **Debugging khó**: Khó theo dõi nguồn của context value.

4. **Overuse**: Dùng quá nhiều contexts có thể làm code khó hiểu.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm       | useContext | Redux    | Zustand  | Props Drilling |
| -------------- | ---------- | -------- | -------- | -------------- |
| Độ phức tạp    | Đơn giản   | Phức tạp | Đơn giản | Đơn giản       |
| Performance    | Tốt        | Tốt      | Rất tốt  | Kém            |
| Global state   | Có         | Có       | Có       | Không          |
| Learning curve | Thấp       | Cao      | Thấp     | Thấp           |
| DevTools       | Có         | Có       | Có       | Không          |
| Middleware     | Không      | Có       | Có       | Không          |

## Best Practices / Các thực hành tốt

1. **Tạo custom hooks cho context**:

   ```javascript
   function useAuth() {
     return useContext(AuthContext);
   }
   ```

2. **Tách biệt contexts theo mục đích**:

   ```javascript
   // Tốt hơn là một context lớn
   const ThemeContext = createContext();
   const AuthContext = createContext();
   const LanguageContext = createContext();
   ```

3. **Dùng TypeScript để type context**:

   ```typescript
   interface AuthContextType {
     user: User | null;
     login: (user: User) => void;
   }
   const AuthContext = createContext<AuthContextType>({...});
   ```

4. **Avoid context value changes không cần thiết**:

   ```javascript
   // ❌ Sai - tạo object mới mỗi render
   <Context.Provider value={{ user, login, logout }}>

   // ✅ Đúng - dùng useMemo
   <Context.Provider value={useMemo(() => ({ user, login, logout }), [user, login, logout])}>
   ```

5. **Dùng default values hợp lý**:
   ```javascript
   const ThemeContext = createContext("light"); // Default value
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Performance Issues

```javascript
// ❌ Sai - tất cả consumers re-render khi bất kỳ value thay đổi
<Context.Provider value={{ user, theme, settings }}>

// ✅ Đúng - tách biệt contexts
<ThemeProvider value={theme}>
  <UserProvider value={user}>
    <SettingsProvider value={settings}>
      {children}
    </SettingsProvider>
  </UserProvider>
</ThemeProvider>
```

### 2. Creating New Object Every Render

```javascript
// ❌ Sai - tạo object mới mỗi render
<Context.Provider value={{ count, setCount }}>

// ✅ Đúng - dùng useMemo
const value = useMemo(() => ({ count, setCount }), [count, setCount]);
<Context.Provider value={value}>
```

### 3. Using Context in Conditional Rendering

```javascript
// ❌ Sai - context không hoạt động trong conditional
{
  condition && (
    <Context.Provider value={value}>
      <Child />
    </Context.Provider>
  );
}

// ✅ Đúng - luôn render Provider
<Context.Provider value={value}>{condition && <Child />}</Context.Provider>;
```

## Performance Considerations / Yếu tố hiệu suất

1. **Re-render on value change**: Tất cả components dùng context sẽ re-render khi value thay đổi.

2. **Split contexts**: Tách biệt contexts theo mục đích để giảm số components re-render.

3. **Memoize context value**: Dùng `useMemo` để tránh tạo object mới mỗi render.

4. **Avoid unnecessary updates**: Chỉ update context value khi thực sự cần.

## Câu hỏi phỏng vấn / Interview Questions

1. `useContext` là gì? Khi nào nên dùng?

2. `useContext` hoạt động như thế nào?

3. Props drilling là gì? `useContext` giải quyết như thế nào?

4. Khi nào nên dùng Context thay vì Redux?

5. Performance considerations với Context?

6. Làm thế nào để tạo custom hook cho Context?

7. Làm thế nào để type Context với TypeScript?

8. Làm thế nào để tránh re-render không cần thiết với Context?

9. Làm thế nào để dùng multiple contexts?

10. Default value trong Context là gì?

11. Làm thế nào để update Context value?

12. Sự khác biệt giữa `useContext` và Redux?

13. Làm thế nào để test components dùng Context?

14. Làm thế nào để debug Context?

15. Khi nào nên tách biệt contexts?

## Tài liệu tham khảo / References

- [useContext - React Official Docs](https://react.dev/reference/react/useContext)
- [Passing Data Deeply with Context - React Official Docs](https://react.dev/learn/passing-data-deeply-with-context)
- [Scaling Up with Reducer and Context - React Official Docs](https://react.dev/learn/scaling-up-with-reducer-and-context)
- [Context - React Official Docs](https://react.dev/reference/react/createContext)

---

_Last updated: 2026-01-31_
