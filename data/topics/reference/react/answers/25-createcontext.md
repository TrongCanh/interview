# createContext / createContext

## Định nghĩa / Definition

[`createContext`](https://react.dev/reference/react/createContext) là một API trong React cho phép bạn tạo **Context object** để chia sẻ data giữa components mà không cần truyền props qua từng level (prop drilling).

## Cú pháp / Syntax

```javascript
const MyContext = createContext(defaultValue);
```

## Tham số / Parameters

| Tham số        | Kiểu | Mô tả                                                        |
| -------------- | ---- | ------------------------------------------------------------ |
| `defaultValue` | Any  | Giá trị mặc định khi không có Provider trong component tree. |

## Giá trị trả về / Return Value

Trả về một Context object với các properties:

- `Provider`: Component để wrap components cần access context.
- `Consumer`: Component để consume context (ít dùng với hooks).

## Cách hoạt động / How it Works

### Context Provider

Provider wrap components và cung cấp value:

```jsx
<MyContext.Provider value={/* value */}>
  {/* components */}
</MyContext.Provider>
```

### Context Consumer

Components consume context với `useContext` hook:

```jsx
const value = useContext(MyContext);
```

### Context Propagation

Context value propagate xuống tất cả components trong Provider tree:

```
Provider
  ├── Component A (has access)
  ├── Component B (has access)
  └── Component C
       ├── Component D (has access)
       └── Component E (has access)
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { createContext, useContext } from "react";

// Create context
const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Header />
      <Main />
      <Footer />
    </ThemeContext.Provider>
  );
}

function Header() {
  const theme = useContext(ThemeContext);
  return <header className={theme}>Header</header>;
}

function Main() {
  const theme = useContext(ThemeContext);
  return <main className={theme}>Main</main>;
}

function Footer() {
  const theme = useContext(ThemeContext);
  return <footer className={theme}>Footer</footer>;
}
```

### Ví dụ với Object Value

```jsx
import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState({
    name: "John",
    email: "john@example.com",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <UserProfile />
      <UserSettings />
    </UserContext.Provider>
  );
}

function UserProfile() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

function UserSettings() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <input
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
    </div>
  );
}
```

### Ví dụ với Multiple Contexts

```jsx
import { createContext, useContext } from "react";

const ThemeContext = createContext("light");
const UserContext = createContext(null);
const LanguageContext = createContext("en");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <UserContext.Provider value={{ name: "John" }}>
        <LanguageContext.Provider value="vi">
          <Dashboard />
        </LanguageContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

function Dashboard() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const language = useContext(LanguageContext);

  return (
    <div className={theme}>
      <h1>Hello, {user.name}!</h1>
      <p>Language: {language}</p>
    </div>
  );
}
```

### Ví dụ với Default Value

```jsx
import { createContext, useContext } from "react";

// Context với default value
const ConfigContext = createContext({
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
});

function App() {
  // Không có Provider, dùng default value
  return <ApiCall />;
}

function ApiCall() {
  const config = useContext(ConfigContext);
  console.log(config); // { apiUrl: "https://api.example.com", timeout: 5000, retries: 3 }
  return <div>API URL: {config.apiUrl}</div>;
}
```

### Ví dụ với Custom Hook

```jsx
import { createContext, useContext } from "react";

const ThemeContext = createContext(null);

// Custom hook
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Component />
    </ThemeContext.Provider>
  );
}

function Component() {
  const theme = useTheme();
  return <div className={theme}>Content</div>;
}
```

### Ví dụ với Context Update

```jsx
import { createContext, useContext, useState } from "react";

const CounterContext = createContext(null);

function CounterProvider({ children }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(0);

  return (
    <CounterContext.Provider value={{ count, increment, decrement, reset }}>
      {children}
    </CounterContext.Provider>
  );
}

function CounterDisplay() {
  const { count, increment, decrement, reset } = useContext(CounterContext);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

function App() {
  return (
    <CounterProvider>
      <CounterDisplay />
    </CounterProvider>
  );
}
```

### Ví dụ với TypeScript

```tsx
import { createContext, useContext } from "react";

interface User {
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
```

## Khi nào nên dùng / When to Use

- Khi cần chia sẻ data giữa nhiều components
- Khi muốn tránh prop drilling
- Khi cần global state (theme, user, language)
- Khi có data cần access ở nhiều levels

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi data chỉ cần ở một component
- Khi data thay đổi thường xuyên và cần complex state management
- Khi muốn keep components decoupled

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng Context:

1. **Prop drilling**: Phải truyền props qua nhiều levels.

2. **Code duplication**: Cùng logic được lặp lại ở nhiều components.

3. **Harder maintenance**: Thay đổi data structure ảnh hưởng nhiều components.

## Vấn đề được giải quyết / Problems Solved

### 1. Prop Drilling

Không cần truyền props qua từng level.

### 2. Global State

Dễ chia sẻ global state như theme, user.

### 3. Code Reusability

Components dễ reuse hơn vì không phụ thuộc vào props chain.

## Ưu điểm / Advantages

1. **Avoid prop drilling**: Không cần truyền props qua nhiều levels.

2. **Global state**: Dễ chia sẻ data.

3. **Simple API**: Dễ sử dụng.

4. **TypeScript support**: Tốt với TypeScript.

## Nhược điểm / Disadvantages

1. **Re-render**: Context change gây re-render cho tất cả consumers.

2. **Harder to debug**: Context flow khó debug hơn.

3. **Not for complex state**: Không phù hợp cho complex state management.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm      | Context          | Redux          | Zustand        | Props  |
| ------------- | ---------------- | -------------- | -------------- | ------ |
| Prop drilling | Không            | Không          | Không          | Có     |
| Global state  | Có               | Có             | Có             | Không  |
| Re-render     | Tất cả consumers | Chỉ subscribed | Chỉ subscribed | Tất cả |
| Complexity    | Thấp             | Trung bình     | Thấp           | Thấp   |

## Best Practices / Các thực hành tốt

1. **Tạo custom hooks**:

   ```jsx
   function useTheme() {
     const context = useContext(ThemeContext);
     if (!context) {
       throw new Error("useTheme must be used within ThemeProvider");
     }
     return context;
   }
   ```

2. **Split contexts by domain**:

   ```jsx
   const ThemeContext = createContext();
   const UserContext = createContext();
   const LanguageContext = createContext();
   ```

3. **Memoize context value**:

   ```jsx
   const value = useMemo(() => ({ user, setUser }), [user, setUser]);
   ```

4. **Use default values wisely**:
   ```jsx
   const ConfigContext = createContext(defaultConfig);
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Not Using Provider

```jsx
// ❌ Không có Provider
function Component() {
  const value = useContext(MyContext); // null hoặc default
  return <div>{value}</div>;
}

// ✅ Đúng - có Provider
<MyContext.Provider value="value">
  <Component />
</MyContext.Provider>;
```

### 2. Mutable Context Value

```jsx
// ❌ Sai - mutate value
const value = { count: 0 };
<MyContext.Provider value={value}>
  <Component />
</MyContext.Provider>;

// ✅ Đúng - immutable
const value = useMemo(() => ({ count: 0 }), []);
<MyContext.Provider value={value}>
  <Component />
</MyContext.Provider>;
```

### 3. Too Large Context

```jsx
// ❌ Quá lớn
const AppContext = createContext({ user, theme, language, config, ... });

// ✅ Chia nhỏ
const UserContext = createContext(user);
const ThemeContext = createContext(theme);
const LanguageContext = createContext(language);
```

### 4. Context in Render Body

```jsx
// ❌ Sai - tạo context trong render
function Component() {
  const Context = createContext();
  return (
    <Context.Provider value="value">
      <Child />
    </Context.Provider>
  );
}

// ✅ Đúng - tạo context ngoài render
const Context = createContext();
function Component() {
  return (
    <Context.Provider value="value">
      <Child />
    </Context.Provider>
  );
}
```

## Performance Considerations / Yếu tố hiệu suất

1. **Re-render all consumers**: Context change gây re-render cho tất cả consumers.

2. **Memoize value**: Dùng `useMemo` để tránh unnecessary re-renders.

3. **Split contexts**: Chia nhỏ contexts để tránh unnecessary re-renders.

## Browser Support / Hỗ trợ trình duyệt

Context hoạt động trên tất cả trình duyệt hỗ trợ React.

## Câu hỏi phỏng vấn / Interview Questions

1. `createContext` là gì? Khi nào nên dùng?

2. `createContext` hoạt động như thế nào?

3. Sự khác biệt giữa Context và props?

4. Làm thế nào để tránh prop drilling với Context?

5. Default value trong `createContext` dùng để làm gì?

6. Làm thế nào để update context value?

7. Context có gây re-render không?

8. Làm thế nào để optimize context performance?

9. Có thể nest Context Providers không?

10. `createContext` có hoạt động với SSR không?

11. Làm thế nào để tạo custom hook cho context?

12. Context có hoạt động với TypeScript không?

13. Làm thế nào để debug context?

14. Khi nào nên dùng Context thay vì Redux?

15. Làm thế nào để test components với context?

## Tài liệu tham khảo / References

- [createContext - React Official Docs](https://react.dev/reference/react/createContext)
- [Context - React Docs](https://react.dev/learn/passing-data-deeply-with-context)
- [useContext - React Docs](https://react.dev/reference/react/useContext)

---

_Last updated: 2026-01-31_
