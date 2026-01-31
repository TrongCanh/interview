# 34. Component Architecture / Kiến trúc Component

> Câu trả lời chi tiết về Component Architecture / Detailed answers about Component Architecture

---

## Container vs Presentational Components / Container vs Presentational

### Container Components

**Container Components** (còn gọi là Smart Components) chịu trách nhiệm về data fetching và state management.

**Container Components** (also called Smart Components) are responsible for data fetching and state management.

```jsx
// Container Component
import { useState, useEffect } from "react";

function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  return <UserList users={users} loading={loading} />;
}

export default UserListContainer;
```

### Presentational Components

**Presentational Components** (còn gọi là Dumb Components) chỉ nhận props và render UI.

**Presentational Components** (also called Dumb Components) only receive props and render UI.

```jsx
// Presentational Component
function UserList({ users, loading }) {
  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id} className="user-item">
          <span className="user-name">{user.name}</span>
          <span className="user-email">{user.email}</span>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
```

### Benefits of Separation / Lợi ích của sự tách biệt

| Lợi ích / Benefit          | Giải thích / Explanation                 |
| -------------------------- | ---------------------------------------- |
| **Reusability**            | Presentational components dễ tái sử dụng |
| **Testability**            | Presentational components dễ test hơn    |
| **Separation of Concerns** | Logic và UI được tách biệt rõ ràng       |
| **Maintainability**        | Dễ maintain và modify                    |

---

## Smart vs Dumb Components / Smart vs Dumb

### Smart Components

**Smart Components** có state, effects, hoặc data fetching logic.

**Smart Components** have state, effects, or data fetching logic.

```jsx
// Smart Component
import { useState, useEffect } from "react";

function SmartTodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "completed":
        return todo.completed;
      case "active":
        return !todo.completed;
      default:
        return true;
    }
  });

  return (
    <div>
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <TodoList todos={filteredTodos} />
    </div>
  );
}
```

### Dumb Components

**Dumb Components** chỉ nhận props và render UI, không có state hoặc effects.

**Dumb Components** only receive props and render UI, no state or effects.

```jsx
// Dumb Component
function TodoList({ todos }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <input type="checkbox" checked={todo.completed} readOnly />
          <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
        </li>
      ))}
    </ul>
  );
}

function FilterBar({ filter, onFilterChange }) {
  return (
    <div className="filter-bar">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => onFilterChange("all")}
      >
        All
      </button>
      <button
        className={filter === "active" ? "active" : ""}
        onClick={() => onFilterChange("active")}
      >
        Active
      </button>
      <button
        className={filter === "completed" ? "active" : ""}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </button>
    </div>
  );
}
```

---

## Compound Components / Components lồng

### Compound Components là gì? / What are Compound Components?

**Compound Components** là một pattern cho phép bạn tạo components hoạt động cùng nhau để chia sẻ state và logic.

**Compound Components** is a pattern that allows you to create components that work together to share state and logic.

### Ví dụ cơ bản / Basic Example

```jsx
import { createContext, useContext, useState } from "react";

const TabsContext = createContext();

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ children, value }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      className={`tab ${isActive ? "active" : ""}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  return <div className="tab-panels">{children}</div>;
}

function TabPanel({ children, value }) {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== value) return null;

  return <div className="tab-panel">{children}</div>;
}

// Sử dụng
function App() {
  return (
    <Tabs defaultTab="tab1">
      <TabList>
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
        <Tab value="tab3">Tab 3</Tab>
      </TabList>

      <TabPanels>
        <TabPanel value="tab1">Content 1</TabPanel>
        <TabPanel value="tab2">Content 2</TabPanel>
        <TabPanel value="tab3">Content 3</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
```

### Compound Components với TypeScript

```tsx
import { createContext, useContext, ReactNode } from "react";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

function Tabs({
  children,
  defaultTab,
}: {
  children: ReactNode;
  defaultTab: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

function Tab({ children, value }: { children: ReactNode; value: string }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tab must be used within Tabs");

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      className={`tab ${isActive ? "active" : ""}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}
```

---

## Render Props / Render Props

### Render Props là gì? / What are Render Props?

**Render Props** là một technique để chia sẻ code giữa components bằng cách truyền một function như prop trả về React element.

**Render Props** is a technique for sharing code between components by passing a function as a prop that returns a React element.

### Ví dụ cơ bản / Basic Example

```jsx
function Mouse({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div onMouseMove={handleMouseMove} style={{ height: "100vh" }}>
      {render(position)}
    </div>
  );
}

// Sử dụng
function App() {
  return (
    <Mouse
      render={({ x, y }) => (
        <div>
          <p>
            Mouse position: {x}, {y}
          </p>
        </div>
      )}
    />
  );
}
```

### Render Props với children

```jsx
function Mouse({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div onMouseMove={handleMouseMove} style={{ height: "100vh" }}>
      {children(position)}
    </div>
  );
}

// Sử dụng
function App() {
  return (
    <Mouse>
      {({ x, y }) => (
        <div>
          <p>
            Mouse position: {x}, {y}
          </p>
        </div>
      )}
    </Mouse>
  );
}
```

---

## Higher-Order Components (HOC) / Components cấp cao

### HOC là gì? / What are HOCs?

**Higher-Order Components** là một function nhận vào một component và trả về một component mới với enhanced functionality.

**Higher-Order Components** is a function that takes a component and returns a new component with enhanced functionality.

### Ví dụ cơ bản / Basic Example

```jsx
// HOC cho loading state
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div className="loading">Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
}

// Sử dụng HOC
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

const UserListWithLoading = withLoading(UserList);
```

### HOC với authentication

```jsx
function withAuth(WrappedComponent) {
  return function WithAuthComponent(props) {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <WrappedComponent {...props} user={user} />;
  };
}

// Sử dụng HOC
function Dashboard({ user }) {
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      {/* Dashboard content */}
    </div>
  );
}

const ProtectedDashboard = withAuth(Dashboard);
```

### HOC Composition

```jsx
// Compose multiple HOCs
function compose(...hocs) {
  return (Component) => hocs.reduceRight((acc, hoc) => hoc(acc), Component);
}

// Sử dụng
const EnhancedComponent = compose(withAuth, withLoading, withData)(Dashboard);
```

---

## Custom Hooks vs HOCs / Custom Hooks vs HOCs

### Custom Hooks (Recommended)

**Custom Hooks** thường được khuyến nghị hơn HOCs vì:

- Dễ đọc và hiểu hơn
- Không gây "wrapper hell"
- Dễ test hơn
- Flexible hơn

**Custom Hooks** are generally recommended over HOCs because:

- Easier to read and understand
- Don't cause "wrapper hell"
- Easier to test
- More flexible

```jsx
// ✅ Good - Custom Hook
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth().then((result) => {
      setIsAuthenticated(result.authenticated);
      setUser(result.user);
    });
  }, []);

  return { isAuthenticated, user };
}

function Dashboard() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  return <div>Welcome, {user.name}!</div>;
}
```

### HOC (Legacy)

```jsx
// ❌ Bad - HOC gây wrapper hell
export default withAuth(withLoading(withData(Dashboard)));
```

---

## Tóm tắt / Summary

| Pattern / Mẫu                   | Mục đích / Purpose                |
| ------------------------------- | --------------------------------- |
| **Container vs Presentational** | Tách biệt logic và UI             |
| **Smart vs Dumb**               | Components có/không có state      |
| **Compound Components**         | Components hoạt động cùng nhau    |
| **Render Props**                | Chia sẻ code qua function props   |
| **HOC**                         | Enhance component functionality   |
| **Custom Hooks**                | Reusable logic (được khuyến nghị) |

---

## Best Practices / Thực hành tốt nhất

### 1. Ưu tiên Presentational Components

```jsx
// ✅ Good - Presentational component dễ tái sử dụng
function Button({ children, onClick, variant }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

### 2. Sử dụng Compound Components cho UI

```jsx
// ✅ Good - Compound components cho UI
<Tabs>
  <TabList>
    <Tab value="1">Tab 1</Tab>
    <Tab value="2">Tab 2</Tab>
  </TabList>
  <TabPanels>
    <TabPanel value="1">Content 1</TabPanel>
    <TabPanel value="2">Content 2</TabPanel>
  </TabPanels>
</Tabs>
```

### 3. Ưu tiên Custom Hooks

```jsx
// ✅ Good - Custom hooks thay vì HOCs
function useAuth() {
  const [user, setUser] = useState(null);
  // ... logic
  return { user };
}

function Component() {
  const { user } = useAuth();
  return <div>{user.name}</div>;
}
```

---

_Updated: 2026-01-30_
