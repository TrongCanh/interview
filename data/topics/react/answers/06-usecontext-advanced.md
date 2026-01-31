# 6. useContext - Advanced / useContext - Đào sâu

## Context API là gì? Khi nào nên dùng?

### Trả lời / Answer:

**Context API** là cách để truyền dữ liệu qua cây component mà không cần props drilling. Nó cho phép các component ở bất kỳ tầng nào có thể truy cập vào dữ liệu chia sẻ.

### Khi nào nên dùng Context?

1. **Global state / Trạng thái toàn cục:**
   - Theme (dark/light mode)
   - User authentication
   - Language/locale
   - Application settings

2. **Avoid props drilling / Tránh props drilling:**
   - Dữ liệu cần ở nhiều tầng component
   - Component trung gian không dùng dữ liệu

3. **Cross-component communication / Giao tiếp giữa component:**
   - Component không có quan hệ cha-con
   - Component ở nhánh khác nhau

---

### Cấu trúc Context:

```jsx
// 1. Tạo Context
const MyContext = createContext(defaultValue);

// 2. Tạo Provider
function MyProvider({ children }) {
  const [value, setValue] = useState(initialValue);

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}

// 3. Sử dụng Context
function MyComponent() {
  const { value, setValue } = useContext(MyContext);
  return <div>{value}</div>;
}
```

---

### Ví dụ thực tế / Practical Example:

```jsx
// Theme Context
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

// Sử dụng
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{ background: theme === "dark" ? "#333" : "#fff" }}>
      <button onClick={toggleTheme}>
        Switch to {theme === "dark" ? "light" : "dark"}
      </button>
    </header>
  );
}

function Main() {
  const { theme } = useTheme();
  return (
    <main style={{ color: theme === "dark" ? "#fff" : "#333" }}>Content</main>
  );
}

function Footer() {
  const { theme } = useTheme();
  return (
    <footer style={{ background: theme === "dark" ? "#333" : "#fff" }}>
      Footer
    </footer>
  );
}
```

---

### Ví dụ với Authentication:

```jsx
// Auth Context
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication on mount
    checkAuth().then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const login = async (credentials) => {
    const user = await loginUser(credentials);
    setUser(user);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

// Protected Route
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  if (!user) return <Navigate to="/login" />;

  return children;
}

// Usage
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
```

---

## `useContext` vs Redux?

### Trả lời / Answer:

### So sánh chi tiết:

| Đặc điểm       | Context API              | Redux                        |
| -------------- | ------------------------ | ---------------------------- |
| Learning curve | Thấp                     | Cao                          |
| Boilerplate    | Ít                       | Nhiều                        |
| DevTools       | Không có                 | Có                           |
| Middleware     | Không có                 | Có                           |
| Performance    | Có thể kém               | Tốt hơn                      |
| Server state   | Không hỗ trợ             | Có (RTK Query)               |
| Use case       | State đơn giản, toàn cục | State phức tạp, nhiều action |

---

### Ví dụ thực tế / Practical Example:

```jsx
// Context API - Đơn giản
const CounterContext = createContext();

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

function Counter() {
  const { count, increment, decrement, reset } = useContext(CounterContext);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

```jsx
// Redux - Phức tạp hơn nhưng có nhiều tính năng
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";

// Slice
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

const { increment, decrement, reset } = counterSlice.actions;

// Store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Component
function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}

// App
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
```

---

### Khi nào dùng Context:

```jsx
// ✅ Dùng Context khi:
// 1. State đơn giản, ít action
function ThemeExample() {
  const { theme, toggleTheme } = useTheme();
  return <div className={theme}>...</div>;
}

// 2. State toàn cục, ít thay đổi
function UserExample() {
  const { user } = useAuth();
  return <div>Welcome, {user?.name}</div>;
}

// 3. UI state (theme, language, settings)
function LanguageExample() {
  const { language, setLanguage } = useLanguage();
  return <div>{translate("welcome", language)}</div>;
}
```

---

### Khi nào dùng Redux:

```jsx
// ✅ Dùng Redux khi:
// 1. State phức tạp, nhiều action
function ComplexState() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const addTodo = (text) => dispatch(addTodoAction(text));
  const toggleTodo = (id) => dispatch(toggleTodoAction(id));
  const removeTodo = (id) => dispatch(removeTodoAction(id));
  const filterTodos = (filter) => dispatch(setFilterAction(filter));
  const sortTodos = (sortBy) => dispatch(setSortAction(sortBy));

  // ... nhiều action khác
}

// 2. Cần middleware (logging, async actions)
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  middleware: [sagaMiddleware, createLogger()],
});

// 3. Cần DevTools để debug
// Redux DevTools cho phép:
// - Time travel debugging
// - Inspect state changes
// - Dispatch actions manually
// - Track performance

// 4. Server state với RTK Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

function Users() {
  const { data, isLoading } = api.useGetUsersQuery();
  const [createUser] = api.useCreateUserMutation();

  if (isLoading) return <Spinner />;

  return (
    <div>
      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={() => createUser({ name: "New User" })}>Add User</button>
    </div>
  );
}
```

---

## Performance considerations với Context?

### Trả lời / Answer:

### Vấn đề performance với Context:

1. **Unnecessary re-renders:**
   - Khi context value thay đổi, tất cả consumers re-render
   - Ngay cả khi chỉ dùng một phần của value

2. **Deep object updates:**
   - Object mới mỗi render → tất cả consumers re-render

3. **Large context:**
   - Context quá lớn → nhiều component re-render không cần thiết

---

### Giải pháp 1: Split Contexts

```jsx
// ❌ Sai - Một context lớn
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState([]);

  // Khi bất kỳ state nào thay đổi, tất cả consumers re-render
  const value = {
    user,
    setUser,
    theme,
    setTheme,
    notifications,
    setNotifications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
```

```jsx
// ✅ Đúng - Tách contexts
const UserContext = createContext();
const ThemeContext = createContext();
const NotificationContext = createContext();

function AppProvider({ children }) {
  // User context
  const userState = useState(null);

  // Theme context
  const themeState = useState("light");

  // Notification context
  const notificationState = useState([]);

  return (
    <UserContext.Provider value={userState}>
      <ThemeContext.Provider value={themeState}>
        <NotificationContext.Provider value={notificationState}>
          {children}
        </NotificationContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// Component chỉ re-render khi context mình dùng thay đổi
function UserProfile() {
  const [user] = useContext(UserContext);
  return <div>{user?.name}</div>;
}

function ThemeToggle() {
  const [theme, setTheme] = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
      {theme}
    </button>
  );
}
```

---

### Giải pháp 2: Memoize context value

```jsx
// ❌ Sai - Object mới mỗi render
function BadProvider({ children }) {
  const [user, setUser] = useState(null);

  // value là object mới mỗi render → consumers re-render
  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
```

```jsx
// ✅ Đúng - Memoize với useMemo
function GoodProvider({ children }) {
  const [user, setUser] = useState(null);

  // value chỉ thay đổi khi user thay đổi
  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
```

---

### Giải pháp 3: Selectors

```jsx
// Context với selectors
function UserContext() {
  const context = useContext(UserContextRaw);

  // Selector để chỉ lấy phần cần thiết
  const user = context.user;
  const setUser = context.setUser;

  return { user, setUser };
}

// Hoặc tạo custom hook với selector
function useUser(selector) {
  const context = useContext(UserContextRaw);
  return selector(context);
}

// Usage
function UserProfile() {
  // Chỉ re-render khi user thay đổi
  const user = useUser((ctx) => ctx.user);
  return <div>{user?.name}</div>;
}

function UserActions() {
  // Chỉ re-render khi setUser thay đổi (hiếm khi xảy ra)
  const setUser = useUser((ctx) => ctx.setUser);
  return <button onClick={() => setUser({ name: "New" })}>Update</button>;
}
```

---

### Giải pháp 4: Separate state and dispatch

```jsx
// Tách state và dispatch
const StateContext = createContext();
const DispatchContext = createContext();

function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

function useCounterState() {
  return useContext(StateContext);
}

function useCounterDispatch() {
  return useContext(DispatchContext);
}

// Component chỉ đọc state
function CounterDisplay() {
  const { count } = useCounterState();
  return <div>Count: {count}</div>;
}

// Component chỉ dispatch actions
function CounterControls() {
  const dispatch = useCounterDispatch();

  return (
    <div>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
    </div>
  );
}
```

---

### Ví dụ thực tế / Practical Example:

```jsx
// Optimized Theme Context
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // Memoize value để tránh re-render không cần thiết
  const value = useMemo(
    () => ({
      theme,
      setTheme,
      colors: themeColors[theme],
      toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

// Component chỉ dùng theme
function ThemedText({ children }) {
  const { colors } = useTheme();
  return <p style={{ color: colors.text }}>{children}</p>;
}

// Component chỉ dùng setTheme
function ThemeButton() {
  const { toggleTheme, theme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "dark" : "light"}
    </button>
  );
}

// Component dùng cả theme và setTheme
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <ThemedText>Current theme: {theme}</ThemedText>
      <ThemeButton />
    </div>
  );
}
```

---

## Context propagation optimization (splitting context)?

### Trả lời / Answer:

**Splitting Context** là kỹ thuật tách một context lớn thành nhiều context nhỏ hơn để tối ưu performance.

### Tại sao cần split?

1. **Fine-grained re-renders:**
   - Component chỉ re-render khi context mình dùng thay đổi

2. **Better separation of concerns:**
   - Mỗi context có trách nhiệm riêng

3. **Easier to test:**
   - Test từng context riêng lẻ

---

### Ví dụ thực tế / Practical Example:

```jsx
// ❌ Sai - Một context lớn
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState([]);
  const [cart, setCart] = useState([]);

  const value = {
    user,
    setUser,
    theme,
    setTheme,
    notifications,
    setNotifications,
    cart,
    setCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Khi theme thay đổi, UserProfile cũng re-render (không cần thiết)
function UserProfile() {
  const { user } = useContext(AppContext);
  return <div>{user?.name}</div>;
}
```

```jsx
// ✅ Đúng - Split contexts
// User Context
const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Theme Context
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Notification Context
const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const value = useMemo(
    () => ({ notifications, setNotifications }),
    [notifications],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

// Cart Context
const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const value = useMemo(() => ({ cart, setCart }), [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// App Provider - Combine all
function AppProvider({ children }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <NotificationProvider>
          <CartProvider>{children}</CartProvider>
        </NotificationProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

// Components chỉ re-render khi context mình dùng thay đổi
function UserProfile() {
  const { user } = useContext(UserContext);
  // Chỉ re-render khi user thay đổi
  return <div>{user?.name}</div>;
}

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  // Chỉ re-render khi theme thay đổi
  return (
    <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
      {theme}
    </button>
  );
}

function NotificationList() {
  const { notifications } = useContext(NotificationContext);
  // Chỉ re-render khi notifications thay đổi
  return (
    <ul>
      {notifications.map((n) => (
        <li key={n.id}>{n.message}</li>
      ))}
    </ul>
  );
}

function CartSummary() {
  const { cart } = useContext(CartContext);
  // Chỉ re-render khi cart thay đổi
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  return <div>Total: ${total}</div>;
}
```

---

### Split với State and Dispatch:

```jsx
// State Context - Chỉ đọc
const CounterStateContext = createContext();

// Dispatch Context - Chỉ action
const CounterDispatchContext = createContext();

function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <CounterStateContext.Provider value={state}>
      <CounterDispatchContext.Provider value={dispatch}>
        {children}
      </CounterDispatchContext.Provider>
    </CounterStateContext.Provider>
  );
}

function useCounterState() {
  return useContext(CounterStateContext);
}

function useCounterDispatch() {
  return useContext(CounterDispatchContext);
}

// Component chỉ đọc state
function CounterDisplay() {
  const { count } = useCounterState();
  return <div>Count: {count}</div>;
}

// Component chỉ dispatch actions
function CounterControls() {
  const dispatch = useCounterDispatch();
  return (
    <div>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
    </div>
  );
}
```

---

## Nested Context Providers?

### Trả lời / Answer:

**Nested Context Providers** là việc đặt nhiều providers lồng nhau để cung cấp nhiều contexts.

### Ví dụ thực tế / Practical Example:

```jsx
// Nested Providers
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <NotificationProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </Router>
          </NotificationProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

// Component có thể truy cập nhiều contexts
function Dashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { notifications } = useNotifications();

  return (
    <div className={theme}>
      <h1>
        {translate("welcome", language)}, {user?.name}!
      </h1>
      <NotificationList notifications={notifications} />
    </div>
  );
}
```

---

### Provider composition:

```jsx
// Helper để combine providers
function composeProviders(...providers) {
  return ({ children }) => {
    return providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children,
    );
  };
}

// Sử dụng
const AppProviders = composeProviders(
  AuthProvider,
  ThemeProvider,
  LanguageProvider,
  NotificationProvider,
);

function App() {
  return (
    <AppProviders>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </AppProviders>
  );
}
```

---

### Context override:

```jsx
// Provider lồng nhau có thể override context
const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="light">
      <Header />
      <Main>
        <ThemeContext.Provider value="dark">
          <DarkSection />
        </ThemeContext.Provider>
      </Main>
    </ThemeContext.Provider>
  );
}

function Header() {
  const theme = useContext(ThemeContext); // "light"
  return <header className={theme}>...</header>;
}

function DarkSection() {
  const theme = useContext(ThemeContext); // "dark"
  return <section className={theme}>...</section>;
}
```

---

## Context vs Props drilling vs State Management Libraries?

### Trả lời / Answer:

### So sánh chi tiết:

| Đặc điểm       | Props Drilling | Context API             | State Libraries (Redux, Zustand) |
| -------------- | -------------- | ----------------------- | -------------------------------- |
| Learning curve | Rất thấp       | Thấp                    | Trung bình - Cao                 |
| Boilerplate    | Không          | Ít                      | Nhiều                            |
| Performance    | Tốt nhất       | Có thể kém              | Tốt                              |
| DevTools       | Không          | Không                   | Có                               |
| Server state   | Không          | Không                   | Có (RTK Query)                   |
| Use case       | Component nông | State toàn cục đơn giản | State phức tạp                   |

---

### Ví dụ thực tế / Practical Example:

```jsx
// 1. Props Drilling - Component nông
function CounterApp() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Counter count={count} setCount={setCount} />
    </div>
  );
}

function Counter({ count, setCount }) {
  return (
    <div>
      <p>Count: {count}</p>
      <CounterDisplay count={count} />
      <CounterControls count={count} setCount={setCount} />
    </div>
  );
}

function CounterDisplay({ count }) {
  return <p>Count: {count}</p>;
}

function CounterControls({ count, setCount }) {
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
    </div>
  );
}
```

```jsx
// 2. Context API - State toàn cục đơn giản
const CounterContext = createContext();

function CounterProvider({ children }) {
  const [count, setCount] = useState(0);
  const value = useMemo(() => ({ count, setCount }), [count]);

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}

function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("useCounter must be used within CounterProvider");
  }
  return context;
}

function CounterApp() {
  return (
    <CounterProvider>
      <Counter />
    </CounterProvider>
  );
}

function Counter() {
  return (
    <div>
      <CounterDisplay />
      <CounterControls />
    </div>
  );
}

function CounterDisplay() {
  const { count } = useCounter();
  return <p>Count: {count}</p>;
}

function CounterControls() {
  const { count, setCount } = useCounter();
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
    </div>
  );
}
```

```jsx
// 3. Zustand - State phức tạp
import create from "zustand";

const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

function CounterApp() {
  return <Counter />;
}

function Counter() {
  return (
    <div>
      <CounterDisplay />
      <CounterControls />
    </div>
  );
}

function CounterDisplay() {
  const count = useCounterStore((state) => state.count);
  return <p>Count: {count}</p>;
}

function CounterControls() {
  const { increment, decrement, reset } = useCounterStore();
  return (
    <div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

---

### Quyết định khi nào dùng gì:

```jsx
// ✅ Props Drilling khi:
// 1. Component nông (1-2 tầng)
// 2. State chỉ dùng ở vài component
// 3. Không muốn thêm dependency

function SimpleForm() {
  const [value, setValue] = useState("");
  return (
    <form>
      <Input value={value} onChange={setValue} />
      <Button onClick={() => console.log(value)}>Submit</Button>
    </form>
  );
}

// ✅ Context API khi:
// 1. State toàn cục (theme, auth, language)
// 2. Component sâu (props drilling khó)
// 3. State đơn giản, ít action

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

// ✅ State Library khi:
// 1. State phức tạp, nhiều action
// 2. Cần DevTools để debug
// 3. Cần middleware (logging, async)
// 4. Server state (RTK Query)

function ComplexApp() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </Provider>
  );
}
```
