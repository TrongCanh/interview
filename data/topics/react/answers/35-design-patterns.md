# 35. Design Patterns / Mẫu Design

> Câu trả lời chi tiết về Design Patterns / Detailed answers about Design Patterns

---

## Provider Pattern / Mẫu Provider

### Provider Pattern là gì? / What is Provider Pattern?

**Provider Pattern** là một technique để chia sẻ state và functions xuyên qua component tree mà không cần props drilling.

**Provider Pattern** is a technique to share state and functions across component tree without props drilling.

### Cơ bản với Context API

```jsx
import { createContext, useContext, useState } from "react";

// Tạo Context
const ThemeContext = createContext();

// Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook
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
    <header className={theme}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
}
```

### Provider với Multiple Values

```jsx
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState([]);

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

function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
```

---

## Observer Pattern / Mẫu Observer

### Observer Pattern là gì? / What is Observer Pattern?

**Observer Pattern** là một behavioral pattern cho phép objects subscribe và nhận notifications khi state thay đổi.

**Observer Pattern** is a behavioral pattern that allows objects to subscribe and receive notifications when state changes.

### Observer với Custom Hook

```jsx
import { useState, useEffect } from "react";

function createObservable(initialValue) {
  const subscribers = new Set();
  let value = initialValue;

  const subscribe = (callback) => {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  };

  const notify = () => {
    subscribers.forEach((callback) => callback(value));
  };

  const setValue = (newValue) => {
    value = newValue;
    notify();
  };

  return {
    subscribe,
    setValue,
    getValue: () => value,
  };
}

// Custom hook để subscribe
function useObservable(observable) {
  const [value, setValue] = useState(observable.getValue());

  useEffect(() => {
    const unsubscribe = observable.subscribe(setValue);
    return unsubscribe;
  }, [observable]);

  return value;
}

// Sử dụng
const userObservable = createObservable(null);

function App() {
  const user = useObservable(userObservable);

  const handleLogin = (userData) => {
    userObservable.setValue(userData);
  };

  return (
    <div>
      {user ? <Dashboard user={user} /> : <Login onLogin={handleLogin} />}
    </div>
  );
}
```

---

## Factory Pattern / Mẫu Factory

### Factory Pattern là gì? / What is Factory Pattern?

**Factory Pattern** là một creational pattern cho phép bạn tạo objects mà không cần specify exact class của object.

**Factory Pattern** is a creational pattern that allows you to create objects without specifying the exact class of the object.

### Component Factory

```jsx
// Component Factory
function createButton(type) {
  switch (type) {
    case "primary":
      return PrimaryButton;
    case "secondary":
      return SecondaryButton;
    case "danger":
      return DangerButton;
    default:
      return DefaultButton;
  }
}

// Sử dụng
function Button({ type, ...props }) {
  const ButtonComponent = createButton(type);
  return <ButtonComponent {...props} />;
}

// Hoặc với object mapping
const buttonComponents = {
  primary: PrimaryButton,
  secondary: SecondaryButton,
  danger: DangerButton,
};

function Button({ type, ...props }) {
  const ButtonComponent = buttonComponents[type] || DefaultButton;
  return <ButtonComponent {...props} />;
}
```

### Hook Factory

```jsx
// Hook Factory
function createUseFetch(baseURL) {
  return function useFetch(endpoint) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetch(`${baseURL}${endpoint}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, [endpoint]);

    return { data, loading, error };
  };
}

// Sử dụng
const useUserFetch = createUseFetch("/api/users");
const usePostFetch = createUseFetch("/api/posts");

function UserList() {
  const { data: users, loading } = useUserFetch("/list");

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## Singleton Pattern (Anti-pattern) / Mẫu Singleton (Anti-pattern)

### Singleton là gì? / What is Singleton?

**Singleton** là một pattern đảm bảo một class chỉ có một instance duy nhất. Tuy nhiên, trong React, Singleton thường là anti-pattern.

**Singleton** is a pattern that ensures a class has only one instance. However, in React, Singleton is often an anti-pattern.

### Tại sao Singleton là Anti-pattern trong React?

**Why Singleton is Anti-pattern in React?**

1. **Breaks React's rendering model** - React dựa trên immutable state
2. **Testing difficulties** - Hard to test với shared state
3. **Server-side rendering issues** - Singleton shared giữa requests

```jsx
// ❌ Bad - Singleton trong React
class Store {
  static instance = null;

  static getInstance() {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  constructor() {
    if (Store.instance) {
      throw new Error("Use getInstance()");
    }
    this.state = {};
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }
}

// Sử dụng
const store = Store.getInstance();
```

### Thay vì Singleton, dùng Context/Hooks

```jsx
// ✅ Good - Sử dụng Context/Hooks
const StoreContext = createContext();

function StoreProvider({ children }) {
  const [state, setState] = useState({});

  return (
    <StoreContext.Provider value={{ state, setState }}>
      {children}
    </StoreContext.Provider>
  );
}

function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
}
```

---

## Composition vs Inheritance / Composition vs Inheritance

### Composition (Được khuyến nghị)

**Composition** là technique xây dựng complex components bằng cách kết hợp các components đơn giản hơn.

**Composition** is a technique of building complex components by combining simpler components.

```jsx
// ✅ Good - Composition
function Card({ children, title, footer }) {
  return (
    <div className="card">
      {title && <div className="card-header">{title}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

function UserCard({ user }) {
  return (
    <Card title={user.name} footer={<UserActions user={user} />}>
      <p>{user.email}</p>
      <p>{user.bio}</p>
    </Card>
  );
}

function UserActions({ user }) {
  return (
    <div className="actions">
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}
```

### Inheritance (Không khuyến nghị)

**Inheritance** trong React thường không được khuyến nghị vì nó gây coupling và khó maintain.

**Inheritance** in React is generally not recommended because it causes coupling and is hard to maintain.

```jsx
// ❌ Bad - Inheritance
class BaseButton extends React.Component {
  render() {
    return (
      <button className="btn" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

class PrimaryButton extends BaseButton {
  render() {
    return (
      <button className="btn btn-primary" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}
```

---

## Liskov Substitution Principle in React / Nguyên tắc Liskov trong React

### LSP là gì? / What is LSP?

**Liskov Substitution Principle** là một principle của SOLID stating that objects of a superclass should be replaceable with objects of a subclass.

**Liskov Substitution Principle** is a SOLID principle stating that objects of a superclass should be replaceable with objects of a subclass.

### LSP trong React Components

```jsx
// ✅ Good - Components tuân thủ LSP
function Button({ variant, ...props }) {
  const baseProps = {
    className: `btn btn-${variant}`,
    ...props,
  };

  return <button {...baseProps}>{props.children}</button>;
}

// Mọi variant của Button có thể thay thế nhau
function App() {
  return (
    <div>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
    </div>
  );
}
```

### LSP với Props Interface

```tsx
interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

// Tất cả button components tuân thủ cùng interface
function PrimaryButton(props: ButtonProps) {
  return <button className="btn btn-primary" {...props} />;
}

function SecondaryButton(props: ButtonProps) {
  return <button className="btn btn-secondary" {...props} />;
}
```

---

## Tóm tắt / Summary

| Pattern / Mẫu         | Mục đích / Purpose                    | Khuyến nghị / Recommended |
| --------------------- | ------------------------------------- | ------------------------- |
| **Provider Pattern**  | Chia sẻ state qua component tree      | ✅ Yes                    |
| **Observer Pattern**  | Subscribe và nhận notifications       | ✅ Yes                    |
| **Factory Pattern**   | Tạo objects mà không cần class cụ thể | ✅ Yes                    |
| **Singleton Pattern** | Đảm bảo một instance duy nhất         | ❌ No (Anti-pattern)      |
| **Composition**       | Kết hợp components đơn giản           | ✅ Yes                    |
| **Inheritance**       | Kế thừa từ base class                 | ❌ No                     |
| **LSP**               | Subclasses có thể thay thế parent     | ✅ Yes                    |

---

## Best Practices / Thực hành tốt nhất

### 1. Sử dụng Provider Pattern cho state sharing

```jsx
// ✅ Good - Provider pattern
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### 2. Ưu tiên Composition thay vì Inheritance

```jsx
// ✅ Good - Composition
function Card({ children, title }) {
  return (
    <div className="card">
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
}
```

### 3. Tránh Singleton trong React

```jsx
// ✅ Good - Sử dụng Context thay vì Singleton
const StoreContext = createContext();

function StoreProvider({ children }) {
  const [state, setState] = useState({});
  return (
    <StoreContext.Provider value={{ state, setState }}>
      {children}
    </StoreContext.Provider>
  );
}
```

---

_Updated: 2026-01-30_
