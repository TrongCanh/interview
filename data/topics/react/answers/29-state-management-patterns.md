# 29. State Management Patterns / Mẫu State Management

> Câu trả lời chi tiết về các mẫu State Management / Detailed answers about State Management Patterns

---

## Compound Components Pattern / Mẫu Compound Components

### Compound Components là gì? / What are Compound Components?

**Compound Components** là một pattern cho phép bạn tạo components hoạt động cùng nhau để chia sẻ state và logic một cách linh hoạt.

**Compound Components** is a pattern that allows you to create components that work together to share state and logic in a flexible way.

### Ví dụ cơ bản / Basic Example

```jsx
// Compound Components cho Tabs
import { createContext, useContext } from "react";

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

## Control Props Pattern / Mẫu Control Props

### Control Props là gì? / What are Control Props?

**Control Props** là một pattern cho phép bạn control một component từ bên ngoài bằng cách truyền giá trị và callback.

**Control Props** is a pattern that allows you to control a component from outside by passing values and callbacks.

### Ví dụ cơ bản / Basic Example

```jsx
function Toggle({ on = false, onChange }) {
  // Nếu onChange được cung cấp, component là controlled
  // Nếu không, component là uncontrolled
  const [internalOn, setInternalOn] = useState(on);

  const isControlled = onChange !== undefined;
  const isOn = isControlled ? on : internalOn;

  const handleToggle = () => {
    const newValue = !isOn;

    if (isControlled) {
      onChange(newValue);
    } else {
      setInternalOn(newValue);
    }
  };

  return <button onClick={handleToggle}>{isOn ? "ON" : "OFF"}</button>;
}

// Uncontrolled component
function UncontrolledExample() {
  return <Toggle />;
}

// Controlled component
function ControlledExample() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <Toggle on={isOn} onChange={setIsOn} />
      <p>Toggle is: {isOn ? "ON" : "OFF"}</p>
    </div>
  );
}
```

### Control Props với Input

```jsx
function TextInput({ value, onChange, defaultValue }) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || "");

  const inputValue = isControlled ? value : internalValue;

  const handleChange = (e) => {
    const newValue = e.target.value;

    if (isControlled) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return <input type="text" value={inputValue} onChange={handleChange} />;
}

// Sử dụng
function FormExample() {
  const [name, setName] = useState("");

  return (
    <form>
      <TextInput value={name} onChange={setName} />
      <p>Name: {name}</p>
    </form>
  );
}
```

---

## State Reducer Pattern / Mẫu State Reducer

### State Reducer là gì? / What is State Reducer?

**State Reducer** pattern sử dụng `useReducer` hook để quản lý complex state với nhiều transitions.

**State Reducer** pattern uses `useReducer` hook to manage complex state with multiple transitions.

### Ví dụ cơ bản / Basic Example

```jsx
function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "SET_VALUE":
      return { count: action.payload };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
}
```

### Complex State với Reducer

```jsx
const initialState = {
  todos: [],
  filter: "all",
  loading: false,
  error: null,
};

function todosReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, todos: action.payload };

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  const filteredTodos = useMemo(() => {
    switch (state.filter) {
      case "completed":
        return state.todos.filter((t) => t.completed);
      case "active":
        return state.todos.filter((t) => !t.completed);
      default:
        return state.todos;
    }
  }, [state.todos, state.filter]);

  return (
    <div>
      <TodoForm
        onAdd={(todo) => dispatch({ type: "ADD_TODO", payload: todo })}
      />

      <FilterBar
        filter={state.filter}
        onFilterChange={(filter) =>
          dispatch({ type: "SET_FILTER", payload: filter })
        }
      />

      {state.loading && <div>Loading...</div>}
      {state.error && <div>Error: {state.error}</div>}

      <TodoList
        todos={filteredTodos}
        onToggle={(id) => dispatch({ type: "TOGGLE_TODO", payload: { id } })}
        onDelete={(id) => dispatch({ type: "DELETE_TODO", payload: { id } })}
      />
    </div>
  );
}
```

---

## Render Props Pattern / Mẫu Render Props

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

  return <div onMouseMove={handleMouseMove}>{render(position)}</div>;
}

// Sử dụng
function App() {
  return (
    <Mouse
      render={({ x, y }) => (
        <div>
          Mouse position: {x}, {y}
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

  return <div onMouseMove={handleMouseMove}>{children(position)}</div>;
}

// Sử dụng
function App() {
  return (
    <Mouse>
      {({ x, y }) => (
        <div>
          Mouse position: {x}, {y}
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
      return <div>Loading...</div>;
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

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      });
  }, []);

  return <UserListWithLoading users={users} isLoading={isLoading} />;
}
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

### HOC vs Custom Hooks

```jsx
// HOC approach
function withData(WrappedComponent) {
  return function WithDataComponent(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchData()
        .then(setData)
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    return <WrappedComponent {...props} data={data} />;
  };
}

// Custom Hook approach
function useData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

// Sử dụng custom hook (được khuyến nghị)
function Component() {
  const { data, loading } = useData();

  if (loading) return <div>Loading...</div>;

  return <div>{data}</div>;
}
```

---

## Custom Hooks vs HOCs

### Khi nào dùng Custom Hooks?

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
// ❌ Bad - HOC gây wrapper hell
export default withAuth(withLoading(withData(UserList)));

// ✅ Good - Custom hooks
function UserList() {
  const { user } = useAuth();
  const { data, loading } = useData();

  if (!user) return <Navigate to="/login" />;
  if (loading) return <div>Loading...</div>;

  return <ul>{/* render data */}</ul>;
}
```

---

## Tóm tắt / Summary

| Pattern / Mẫu           | Mục đích / Purpose                           |
| ----------------------- | -------------------------------------------- |
| **Compound Components** | Components hoạt động cùng nhau chia sẻ state |
| **Control Props**       | Control component từ bên ngoài               |
| **State Reducer**       | Quản lý complex state với useReducer         |
| **Render Props**        | Chia sẻ code qua function props              |
| **HOC**                 | Enhance component functionality              |
| **Custom Hooks**        | Reusable logic (được khuyến nghị)            |

---

## Best Practices / Thực hành tốt nhất

### 1. Ưu tiên Custom Hooks

```jsx
// ✅ Good - Sử dụng custom hooks
function Component() {
  const { data, loading } = useData();
  return loading ? <Loader /> : <DataView data={data} />;
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

### 3. Control Props cho flexibility

```jsx
// ✅ Good - Control props cho flexibility
function Toggle({ on, onChange }) {
  return <button onClick={() => onChange?.(!on)}>{on ? "ON" : "OFF"}</button>;
}
```

---

_Updated: 2026-01-30_
