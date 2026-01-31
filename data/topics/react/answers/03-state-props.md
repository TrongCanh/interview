# 3. State & Props / Trạng thái và Thuộc tính

## Sự khác biệt giữa state và props?

### Trả lời / Answer:

### State / Trạng thái

**State** là dữ liệu nội bộ của component, có thể thay đổi theo thời gian.

- **Được quản lý bởi component sở hữu**
- **Có thể thay đổi** (mutable)
- **Chỉ có thể thay đổi bởi component sở hữu**
- **Khi state thay đổi → component re-render**
- **Được khởi tạo trong component**

### Props / Thuộc tính

**Props** là dữ liệu được truyền từ component cha xuống component con.

- **Được truyền từ component cha**
- **Bất biến** (immutable) cho component nhận
- **Chỉ đọc** (read-only) cho component nhận\*\*
- **Khi props thay đổi → component re-render**
- **Được truyền từ bên ngoài**

---

### So sánh chi tiết:

| Đặc điểm        | State               | Props             |
| --------------- | ------------------- | ----------------- |
| Nguồn           | Nội bộ component    | Từ component cha  |
| Có thể thay đổi | Có (bằng setState)  | Không (read-only) |
| Luồng dữ liệu   | Nội bộ              | Cha → Con         |
| Tái sử dụng     | Component cụ thể    | Component chung   |
| Mutability      | Mutable             | Immutable         |
| Ví dụ           | Form input, counter | Config, callback  |

---

### Ví dụ thực tế / Practical Example:

```jsx
// State - Dữ liệu nội bộ
function Counter() {
  // State được quản lý nội bộ
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}

// Props - Dữ liệu từ bên ngoài
function Greeting({ name, age }) {
  // Props được truyền từ component cha
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old</p>
    </div>
  );
}

// Component cha truyền props
function App() {
  return (
    <div>
      <Greeting name="John" age={30} />
      <Counter />
    </div>
  );
}
```

---

### State vs Props trong cùng component:

```jsx
function UserProfile({ userId }) {
  // Props - từ component cha
  const [user, setUser] = useState(null); // State - nội bộ
  const [loading, setLoading] = useState(true); // State - nội bộ

  useEffect(() => {
    fetchUser(userId).then((data) => {
      setUser(data); // Cập nhật state
      setLoading(false);
    });
  }, [userId]); // Sử dụng props trong effect

  if (loading) return <Spinner />;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>ID: {userId}</p> {/* Sử dụng props */}
      <p>Email: {user.email}</p> {/* Sử dụng state */}
    </div>
  );
}
```

---

### Props không thể thay đổi:

```jsx
// ❌ Sai - Không thể thay đổi props
function BadComponent({ count }) {
  // Error: Cannot assign to 'count' because it is read-only
  count = count + 1;
  return <p>{count}</p>;
}

// ✅ Đúng - Sử dụng state để thay đổi
function GoodComponent({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
```

---

### Derived State từ Props:

```jsx
// ✅ Đúng - Derived state từ props
function FullName({ firstName, lastName }) {
  // Không cần state cho fullName - tính toán từ props
  const fullName = `${firstName} ${lastName}`;

  return <h1>{fullName}</h1>;
}

// ❌ Sai - Không nên copy props vào state
function BadFullName({ firstName, lastName }) {
  const [fullName, setFullName] = useState(`${firstName} ${lastName}`);

  // Khi props thay đổi, state không cập nhật!
  useEffect(() => {
    setFullName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  return <h1>{fullName}</h1>;
}
```

---

## Lifting state up là gì?

### Trả lời / Answer:

**Lifting State Up** là kỹ thuật di chuyển state từ component con lên component cha khi nhiều component cần chia sẻ state đó.

### Khi nào cần Lifting State Up?

- Nhiều component cần truy cập cùng một state
- Component con cần cập nhật state được chia sẻ
- State cần được đồng bộ giữa các component

---

### Ví dụ thực tế / Practical Example:

```jsx
// ❌ Trước khi lift state up - State bị duplicate
function TemperatureConverter() {
  return (
    <div>
      <CelsiusInput />
      <FahrenheitInput />
    </div>
  );
}

function CelsiusInput() {
  const [celsius, setCelsius] = useState("");

  return (
    <input
      value={celsius}
      onChange={(e) => setCelsius(e.target.value)}
      placeholder="Celsius"
    />
  );
}

function FahrenheitInput() {
  const [fahrenheit, setFahrenheit] = useState("");

  return (
    <input
      value={fahrenheit}
      onChange={(e) => setFahrenheit(e.target.value)}
      placeholder="Fahrenheit"
    />
  );
}
```

```jsx
// ✅ Sau khi lift state up - State được chia sẻ
function TemperatureConverter() {
  // Lift state lên component cha
  const [celsius, setCelsius] = useState("");

  // Chuyển đổi giữa Celsius và Fahrenheit
  const fahrenheit = celsius === "" ? "" : (parseFloat(celsius) * 9) / 5 + 32;

  const handleCelsiusChange = (value) => {
    setCelsius(value);
  };

  const handleFahrenheitChange = (value) => {
    setCelsius(value === "" ? "" : ((parseFloat(value) - 32) * 5) / 9);
  };

  return (
    <div>
      <CelsiusInput value={celsius} onChange={handleCelsiusChange} />
      <FahrenheitInput value={fahrenheit} onChange={handleFahrenheitChange} />
    </div>
  );
}

function CelsiusInput({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Celsius"
    />
  );
}

function FahrenheitInput({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Fahrenheit"
    />
  );
}
```

---

### Ví dụ thực tế: Todo List

```jsx
// ✅ Lifting state up cho Todo List
function TodoApp() {
  // State được lift lên component cha
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build app", completed: false },
  ]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}

function AddTodo({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}

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

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}
```

---

### Khi không nên Lifting State Up:

- State chỉ được dùng bởi một component
- Component quá sâu trong cây component (xem Context API)
- State quá phức tạp (xem state management libraries)

---

## Controlled vs Uncontrolled components?

### Trả lời / Answer:

### Controlled Components

**Controlled Components** là các component mà giá trị được kiểm soát hoàn toàn bởi React state.

- **Giá trị được lưu trong state**
- **Mỗi input change → update state → re-render**
- **Component có "single source of truth"**
- **Dùng cho form validation, dynamic forms**

### Uncontrolled Components

**Uncontrolled Components** là các component mà giá trị được quản lý bởi DOM.

- **Giá trị được lưu trong DOM**
- **Sử dụng ref để truy cập giá trị**
- **Không re-render khi input change**
- **Dùng cho form đơn giản, integrations với non-React code**

---

### So sánh chi tiết:

| Đặc điểm    | Controlled                | Uncontrolled                |
| ----------- | ------------------------- | --------------------------- |
| Giá trị lưu | State                     | DOM                         |
| Cập nhật    | onChange handler          | ref.current.value           |
| Re-render   | Có                        | Không                       |
| Validation  | Dễ                        | Khó hơn                     |
| Code        | Nhiều hơn                 | Ít hơn                      |
| Use case    | Form phức tạp, validation | Form đơn giản, integrations |

---

### Ví dụ thực tế / Practical Example:

```jsx
// Controlled Component
function ControlledForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Uncontrolled Component
function UncontrolledForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name: nameRef.current.value,
      email: emailRef.current.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} defaultValue="John" placeholder="Name" />
      <input
        ref={emailRef}
        defaultValue="john@example.com"
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

### Controlled với Validation:

```jsx
function ValidatedForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Validation
    if (!value) {
      setError("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Invalid email format");
    } else {
      setError("");
    }
  };

  return (
    <form>
      <input value={email} onChange={handleChange} placeholder="Email" />
      {error && <span style={{ color: "red" }}>{error}</span>}
      <button disabled={!!error}>Submit</button>
    </form>
  );
}
```

---

### Uncontrolled với defaultValue:

```jsx
function ProfileForm({ user }) {
  const nameRef = useRef(null);
  const bioRef = useRef(null);

  // Initialize refs with user data
  useEffect(() => {
    nameRef.current.value = user.name;
    bioRef.current.value = user.bio;
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name: nameRef.current.value,
      bio: bioRef.current.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} placeholder="Name" />
      <textarea ref={bioRef} placeholder="Bio" />
      <button type="submit">Save</button>
    </form>
  );
}
```

---

### File Input (thường dùng Uncontrolled):

```jsx
function FileUpload() {
  const fileInputRef = useRef(null);

  const handleUpload = (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    console.log("File:", file);
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" ref={fileInputRef} accept="image/*" />
      <button type="submit">Upload</button>
    </form>
  );
}
```

---

## Props drilling là gì? Cách giải quyết?

### Trả lời / Answer:

**Props Drilling** là việc truyền props qua nhiều tầng component trung gian để đến component cần sử dụng.

### Vấn đề với Props Drilling:

- Code trở nên khó bảo trì
- Component trung gian nhận props không dùng
- Khó theo dõi luồng dữ liệu
- Khó refactor khi thay đổi cấu trúc

---

### Ví dụ thực tế / Practical Example:

```jsx
// ❌ Props Drilling - Props đi qua nhiều tầng
function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <div>
      <Header theme={theme} setTheme={setTheme} />
      <Main theme={theme} setTheme={setTheme} />
      <Footer theme={theme} setTheme={setTheme} />
    </div>
  );
}

function Header({ theme, setTheme }) {
  return (
    <header>
      <Logo />
      <Nav theme={theme} setTheme={setTheme} />
    </header>
  );
}

function Nav({ theme, setTheme }) {
  return (
    <nav>
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </nav>
  );
}

function ThemeToggle({ theme, setTheme }) {
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Switch to {theme === "dark" ? "light" : "dark"}
    </button>
  );
}

// Main và Footer cũng nhận theme, setTheme nhưng không dùng
```

---

### Giải pháp 1: Context API

```jsx
// ✅ Sử dụng Context API
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
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

// App
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  );
}

// Component không cần nhận props
function Header() {
  return (
    <header>
      <Logo />
      <Nav />
    </header>
  );
}

function Nav() {
  return (
    <nav>
      <ThemeToggle />
    </nav>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Switch to {theme === "dark" ? "light" : "dark"}
    </button>
  );
}
```

---

### Giải pháp 2: Component Composition

```jsx
// ✅ Sử dụng Component Composition
function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <div>
      <Header>
        <Nav>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </Nav>
      </Header>
      <Main theme={theme} />
      <Footer theme={theme} />
    </div>
  );
}

function Header({ children }) {
  return (
    <header>
      <Logo />
      {children}
    </header>
  );
}

function Nav({ children }) {
  return <nav>{children}</nav>;
}

function ThemeToggle({ theme, setTheme }) {
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Switch to {theme === "dark" ? "light" : "dark"}
    </button>
  );
}
```

---

### Giải pháp 3: State Management Library

```jsx
// ✅ Sử dụng Zustand
import create from "zustand";

const useThemeStore = create((set) => ({
  theme: "dark",
  setTheme: (theme) => set({ theme }),
}));

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Switch to {theme === "dark" ? "light" : "dark"}
    </button>
  );
}
```

---

### Khi nào dùng giải pháp nào:

| Giải pháp      | Khi nào dùng                 | Ưu điểm             | Nhược điểm                |
| -------------- | ---------------------------- | ------------------- | ------------------------- |
| Props Drilling | Component nông, ít tầng      | Đơn giản, rõ ràng   | Không scale tốt           |
| Context API    | State toàn cục, theme, user  | Built-in, dễ dùng   | Re-render nhiều component |
| Composition    | UI components                | Flexible, type-safe | Không cho data passing    |
| State Library  | State phức tạp, nhiều action | Tối ưu hiệu năng    | Thêm dependency           |

---

## Key prop trong React là gì? Tại sao quan trọng?

### Trả lời / Answer:

**Key prop** là một đặc biệt attribute giúp React xác định các item đã thay đổi, thêm mới, hoặc bị xóa trong list.

### Tại sao Key quan trọng?

1. **Reconciliation / Đồng bộ hóa:**
   - React dùng key để so sánh Virtual DOM
   - Xác định item nào thay đổi, thêm, xóa

2. **Performance / Hiệu suất:**
   - Tránh re-render không cần thiết
   - Tối ưu việc cập nhật DOM

3. **State Preservation / Bảo toàn state:**
   - Giữ state của component khi render lại list
   - Tránh mất focus, input value

---

### Quy tắc sử dụng Key:

1. **Key phải là unique / duy nhất**
2. **Key phải stable / ổn định** (không thay đổi giữa renders)
3. **Không dùng index làm key** (trừ khi list không thay đổi)
4. **Key phải là string hoặc number**

---

### Ví dụ thực tế / Practical Example:

```jsx
// ❌ Sai - Dùng index làm key
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          <input type="checkbox" />
          <span>{todo.text}</span>
        </li>
      ))}
    </ul>
  );
}

// Vấn đề: Khi xóa item đầu tiên, tất cả input checkbox bị reset

// ✅ Đúng - Dùng ID làm key
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input type="checkbox" />
          <span>{todo.text}</span>
        </li>
      ))}
    </ul>
  );
}
```

---

### Demo vấn đề với index key:

```jsx
function KeyDemo() {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ]);

  const removeFirst = () => {
    setItems(items.slice(1));
  };

  return (
    <div>
      <button onClick={removeFirst}>Remove First</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <input type="text" defaultValue={item.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Khi xóa item đầu tiên:
// - Item 2 (index 0) giữ input của Item 1
// - Item 3 (index 1) giữ input của Item 2
// → State bị sai lệch
```

---

### Key với component có state:

```jsx
function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li>
      {isEditing ? (
        <input defaultValue={todo.text} />
      ) : (
        <span>{todo.text}</span>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}

function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        // ✅ Key ổn định giúp giữ state khi render lại
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
```

---

### Key trong nested lists:

```jsx
function NestedList() {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Category 1",
      items: [
        { id: 11, name: "Item 1.1" },
        { id: 12, name: "Item 1.2" },
      ],
    },
    {
      id: 2,
      name: "Category 2",
      items: [
        { id: 21, name: "Item 2.1" },
        { id: 22, name: "Item 2.2" },
      ],
    },
  ]);

  return (
    <div>
      {data.map((category) => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <ul>
            {category.items.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

---

### Khi nào dùng index key:

```jsx
// ✅ OK khi list không thay đổi
function StaticList() {
  const items = ["Item 1", "Item 2", "Item 3"];

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// ✅ OK khi list được sắp xếp và không có state
function SortedList({ items }) {
  const sorted = [...items].sort();

  return (
    <ul>
      {sorted.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```

---

### Key với dynamic lists:

```jsx
function DynamicTodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const moveTodo = (fromIndex, toIndex) => {
    const newTodos = [...todos];
    const [removed] = newTodos.splice(fromIndex, 1);
    newTodos.splice(toIndex, 0, removed);
    setTodos(newTodos);
  };

  return (
    <div>
      <button onClick={() => addTodo("New Todo")}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
            <button onClick={() => moveTodo(index, 0)}>Move to Top</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```
