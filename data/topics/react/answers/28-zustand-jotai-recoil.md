# 28. Zustand / Jotai / Recoil / Zustand / Jotai / Recoil

> Câu trả lời chi tiết về các alternatives cho Redux / Detailed answers about Redux alternatives

---

## Alternatives to Redux / Các alternatives cho Redux

### Khi nào nên dùng library nhỏ hơn? / When to use smaller libraries?

**Smaller state management libraries** thường phù hợp cho các ứng dụng nhỏ đến trung bình, nơi Redux có thể là overkill.

**Smaller state management libraries** are often suitable for small to medium applications where Redux might be overkill.

| Library / Thư viện | Bundle Size / Kích thước | Learning Curve / Độ khó |
| ------------------ | ------------------------ | ----------------------- |
| **Redux**          | ~10KB                    | Cao                     |
| **Zustand**        | ~1KB                     | Thấp                    |
| **Jotai**          | ~3KB                     | Thấp                    |
| **Recoil**         | ~20KB                    | Trung bình              |

---

## Zustand - Simplicity & Performance

### Zustand là gì? / What is Zustand?

**Zustand** là một state management library nhỏ, nhanh và đơn giản. Nó không cần Provider, actions, hoặc reducers.

**Zustand** is a small, fast, and simple state management library. It doesn't require Provider, actions, or reducers.

### Cài đặt Zustand

```bash
npm install zustand
```

### Basic Usage / Cơ bản

```jsx
import { create } from "zustand";

// Tạo store
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// Sử dụng trong component
function Counter() {
  const { count, increment, decrement, reset } = useStore();

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

### Async Actions / Actions bất đồng bộ

```jsx
import { create } from "zustand";

const useStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });

    try {
      const response = await fetch("/api/users");
      const users = await response.json();
      set({ users, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addUser: async (userData) => {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    const user = await response.json();

    set((state) => ({ users: [...state.users, user] }));
  },
}));

function UserList() {
  const { users, loading, error, fetchUsers } = useStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Selectors

```jsx
// Tạo selector
const useStore = create((set, get) => ({
  todos: [],
  filter: "all",

  setFilter: (filter) => set({ filter }),
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, completed: false }],
    })),

  // Selector computed
  getFilteredTodos: () => {
    const { todos, filter } = get();
    switch (filter) {
      case "completed":
        return todos.filter((t) => t.completed);
      case "active":
        return todos.filter((t) => !t.completed);
      default:
        return todos;
    }
  },
}));

// Sử dụng selector
function TodoList() {
  const filteredTodos = useStore((state) => state.getFilteredTodos());
  const { setFilter } = useStore();

  return (
    <div>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("active")}>Active</button>
      <button onClick={() => setFilter("completed")}>Completed</button>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Slices

```jsx
// Tạo slices cho better organization
import { create } from "zustand";

// Counter slice
const createCounterSlice = (set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
});

// User slice
const createUserSlice = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
});

// Kết hợp slices
const useStore = create((...args) => ({
  ...createCounterSlice(...args),
  ...createUserSlice(...args),
}));

// Hoặc sử dụng middleware
import { devtools, persist } from "zustand/middleware";

const useStore = create(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
      }),
      { name: "app-storage" },
    ),
  ),
);
```

---

## Jotai - Atomic State

### Jotai là gì? / What is Jotai?

**Jotai** là một primitive và flexible state management library dựa trên atomic state model. Nó lấy cảm hứng từ Recoil nhưng đơn giản hơn.

**Jotai** is a primitive and flexible state management library based on atomic state model. It's inspired by Recoil but simpler.

### Cài đặt Jotai

```bash
npm install jotai
```

### Basic Usage / Cơ bản

```jsx
import { atom, useAtom } from "jotai";

// Tạo atom (atomic state)
const countAtom = atom(0);

function Counter() {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
```

### Derived Atoms

```jsx
import { atom, useAtom } from "jotai";

// Base atoms
const firstNameAtom = atom("John");
const lastNameAtom = atom("Doe");

// Derived atom
const fullNameAtom = atom(
  (get) => `${get(firstNameAtom)} ${get(lastNameAtom)}`,
);

function UserProfile() {
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const [fullName] = useAtom(fullNameAtom);

  return (
    <div>
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First name"
      />
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last name"
      />
      <p>Full name: {fullName}</p>
    </div>
  );
}
```

### Async Atoms

```jsx
import { atom, useAtom } from "jotai";

// Async atom
const usersAtom = atom(async () => {
  const response = await fetch("/api/users");
  return response.json();
});

// Async atom với loading state
const usersAsyncAtom = atom(async (get) => {
  const response = await fetch("/api/users");
  return response.json();
});

// Loading state
const usersLoadingAtom = atom(false);

// Async atom với loading
const fetchUsersAtom = atom(async (get, set) => {
  set(usersLoadingAtom, true);
  try {
    const response = await fetch("/api/users");
    const users = await response.json();
    set(usersAtom, users);
  } finally {
    set(usersLoadingAtom, false);
  }
});

function UserList() {
  const [users] = useAtom(usersAtom);
  const [loading] = useAtom(usersLoadingAtom);
  const [, fetchUsers] = useAtom(fetchUsersAtom);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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

### Write-only Atoms

```jsx
import { atom, useAtom } from "jotai";

// Read-only atom
const countAtom = atom(0);

// Write-only atom
const incrementAtom = atom(
  null, // read function (null = read-only)
  (get, set) => {
    set(countAtom, get(countAtom) + 1);
  },
);

// Read-write derived atom
const doubleCountAtom = atom(
  (get) => get(countAtom) * 2,
  (get, set, newValue) => {
    set(countAtom, newValue / 2);
  },
);

function Counter() {
  const [count] = useAtom(countAtom);
  const [, increment] = useAtom(incrementAtom);
  const [doubleCount, setDoubleCount] = useAtom(doubleCountAtom);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={() => setDoubleCount(10)}>Set Double to 10</button>
    </div>
  );
}
```

---

## Recoil - Facebook's Solution

### Recoil là gì? / What is Recoil?

**Recoil** là một state management library được phát triển bởi Facebook. Nó cung cấp một cách quản lý state với atoms và selectors.

**Recoil** is a state management library developed by Facebook. It provides a way to manage state with atoms and selectors.

### Cài đặt Recoil

```bash
npm install recoil
```

### Basic Usage / Cơ bản

```jsx
import { atom, useRecoilState, RecoilRoot } from "recoil";

// Tạo atom
const countState = atom({
  key: "countState", // unique ID
  default: 0,
});

function Counter() {
  const [count, setCount] = useRecoilState(countState);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}

// Wrap app với RecoilRoot
function App() {
  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  );
}
```

### Selectors

```jsx
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

// Atoms
const firstNameState = atom({
  key: "firstNameState",
  default: "John",
});

const lastNameState = atom({
  key: "lastNameState",
  default: "Doe",
});

// Selector
const fullNameState = selector({
  key: "fullNameState",
  get: ({ get }) => {
    const firstName = get(firstNameState);
    const lastName = get(lastNameState);
    return `${firstName} ${lastName}`;
  },
});

function UserProfile() {
  const [firstName, setFirstName] = useRecoilState(firstNameState);
  const [lastName, setLastName] = useRecoilState(lastNameState);
  const fullName = useRecoilValue(fullNameState);

  return (
    <div>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <p>Full name: {fullName}</p>
    </div>
  );
}
```

### Async Selectors

```jsx
import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";

// Async selector
const usersQuery = selector({
  key: "usersQuery",
  get: async () => {
    const response = await fetch("/api/users");
    return response.json();
  },
});

// Async selector với params
const userQuery = selectorFamily({
  key: "userQuery",
  get: (userId) => async () => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  },
});

function UserList() {
  const users = useRecoilValue(usersQuery);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

function UserDetail({ userId }) {
  const user = useRecoilValue(userQuery(userId));

  return <div>{user.name}</div>;
}
```

### Effects

```jsx
import { atom, useRecoilState, useEffect } from "recoil";

const countState = atom({
  key: "countState",
  default: 0,
  effects: [
    ({ onSet }) => {
      // Run khi atom thay đổi
      onSet((newValue, oldValue) => {
        console.log("Count changed:", oldValue, "->", newValue);
      });
    },
  ],
});

function Counter() {
  const [count, setCount] = useRecoilState(countState);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

---

## Context API vs State Libraries

### Khi nào dùng Context API?

**Context API** phù hợp cho:

- Simple state sharing
- Theme, language, user authentication
- Small to medium applications

**Context API** is suitable for:

- Simple state sharing
- Theme, language, user authentication
- Small to medium applications

```jsx
// Context API example
const ThemeContext = createContext("light");

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      className={`btn ${theme}`}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      Toggle Theme
    </button>
  );
}
```

### Khi nào dùng State Libraries?

**State Libraries** phù hợp cho:

- Complex state management
- Multiple components cần access cùng state
- Need for time-travel debugging
- Performance optimization

**State Libraries** are suitable for:

- Complex state management
- Multiple components need to access same state
- Need for time-travel debugging
- Performance optimization

---

## Tóm tắt / Summary

| Library / Thư viện | Đặc điểm / Features                            |
| ------------------ | ---------------------------------------------- |
| **Zustand**        | Đơn giản, không cần Provider, nhanh            |
| **Jotai**          | Atomic state, derived atoms, flexible          |
| **Recoil**         | Atoms, selectors, Facebook's solution          |
| **Context API**    | Built-in, đơn giản, phù hợp cho state đơn giản |

---

## Best Practices / Thực hành tốt nhất

### 1. Zustand cho đơn giản

```jsx
// ✅ Good - Zustand cho state đơn giản
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

### 2. Jotai cho derived state

```jsx
// ✅ Good - Jotai cho derived state
const countAtom = atom(0);
const doubleCountAtom = atom((get) => get(countAtom) * 2);
```

### 3. Recoil cho async data

```jsx
// ✅ Good - Recoil cho async selectors
const usersQuery = selector({
  key: "usersQuery",
  get: async () => {
    const response = await fetch("/api/users");
    return response.json();
  },
});
```

---

_Updated: 2026-01-30_
