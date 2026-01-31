# 4. useState - Advanced / useState - Đào sâu

## `useState` hoạt động như thế nào bên trong (batching, re-render)?

### Trả lời / Answer:

### Cách useState hoạt động:

1. **Initialization / Khởi tạo:**
   - Khi component mount lần đầu, `useState(initialValue)` chạy
   - React lưu giá trị trong fiber node của component
   - Giá trị được lưu theo thứ tự gọi hooks

2. **State Update / Cập nhật state:**
   - Khi `setState(newValue)` được gọi
   - React đánh dấu component cần re-render
   - Queue update để batch nếu có thể

3. **Re-render / Render lại:**
   - React chạy component function lại
   - Lấy giá trị state mới từ queue
   - So sánh Virtual DOM với bản trước
   - Cập nhật DOM nếu cần

---

### Batching / Gom nhóm updates:

**Batching** là kỹ thuật gom nhiều state updates thành một re-render duy nhất.

#### React 17 (Legacy Batching):

```jsx
// ❌ React 17: Chỉ batch trong event handlers
function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const handleClick = () => {
    // Batched - chỉ 1 re-render
    setCount(1);
    setName("React");
  };

  const fetchData = () => {
    fetch("/api").then(() => {
      // ❌ Not batched - 2 re-renders
      setCount(1);
      setName("React");
    });
  };

  return <button onClick={handleClick}>Click</button>;
}
```

#### React 18 (Automatic Batching):

```jsx
// ✅ React 18: Tự động batch mọi nơi
function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const handleClick = () => {
    // Batched - 1 re-render
    setCount(1);
    setName("React");
  };

  const fetchData = () => {
    fetch("/api").then(() => {
      // ✅ Batched - 1 re-render
      setCount(1);
      setName("React");
    });
  };

  const handleClickAsync = async () => {
    // ✅ Batched - 1 re-render
    await someAsync();
    setCount(1);
    setName("React");
  };

  return <button onClick={handleClick}>Click</button>;
}
```

---

### Opt-out of Batching:

```jsx
import { flushSync } from "react-dom";

function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const handleClick = () => {
    // Force synchronous update
    flushSync(() => {
      setCount((c) => c + 1);
    });
    // Re-render happens here

    flushSync(() => {
      setName("React");
    });
    // Re-render happens here
  };

  return <button onClick={handleClick}>Click</button>;
}
```

---

### Ví dụ thực tế / Practical Example:

```jsx
// Demo batching behavior
function BatchingDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);

  console.log("Render:", { count, text, items: items.length });

  const handleClick = () => {
    console.log("Before updates");
    setCount(1);
    setText("Updated");
    setItems([1, 2, 3]);
    console.log("After updates - no render yet");
  };

  // Output:
  // Render: { count: 0, text: '', items: 0 }
  // Before updates
  // After updates - no render yet
  // Render: { count: 1, text: 'Updated', items: 3 }

  return (
    <div>
      <p>Count: {count}</p>
      <p>Text: {text}</p>
      <p>Items: {items.length}</p>
      <button onClick={handleClick}>Update All</button>
    </div>
  );
}
```

---

## Functional updates trong `useState`? Khi nào cần?

### Trả lời / Answer:

**Functional updates** là cách cập nhật state bằng cách truyền một function vào `setState` thay vì giá trị trực tiếp.

### Cú pháp:

```jsx
// Direct update
setState(newValue);

// Functional update
setState((prevState) => newValue);
```

---

### Khi nào cần Functional Updates?

1. **New state dựa trên previous state**
2. **Nhiều updates liên tiếp**
3. **Tránh stale closure**

---

### Ví dụ thực tế / Practical Example:

```jsx
// ❌ Sai - Direct update với stale closure
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // Cả 3 calls đều dùng count = 0
    setCount(count + 1); // 0 + 1 = 1
    setCount(count + 1); // 0 + 1 = 1
    setCount(count + 1); // 0 + 1 = 1
    // Kết quả: count = 1 (không phải 3)
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

```jsx
// ✅ Đúng - Functional update
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // Mỗi call nhận giá trị mới nhất
    setCount((prev) => prev + 1); // 0 + 1 = 1
    setCount((prev) => prev + 1); // 1 + 1 = 2
    setCount((prev) => prev + 1); // 2 + 1 = 3
    // Kết quả: count = 3
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

---

### Ví dụ với Object state:

```jsx
function Form() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: 0,
  });

  // ❌ Sai - Direct update
  const updateAgeBad = () => {
    setUser({ ...user, age: user.age + 1 });
    setUser({ ...user, age: user.age + 1 }); // user.age vẫn là 0
  };

  // ✅ Đúng - Functional update
  const updateAgeGood = () => {
    setUser((prev) => ({ ...prev, age: prev.age + 1 }));
    setUser((prev) => ({ ...prev, age: prev.age + 1 }));
  };

  return (
    <div>
      <input
        value={user.name}
        onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
      />
      <p>Age: {user.age}</p>
      <button onClick={updateAgeGood}>Increment Age</button>
    </div>
  );
}
```

---

### Ví dụ với Array state:

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);

  // ✅ Functional update cho array
  const addTodo = (text) => {
    setTodos((prev) => [...prev, { id: Date.now(), text }]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <button onClick={() => addTodo("New Todo")}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### Ví dụ với stale closure:

```jsx
function StaleClosureDemo() {
  const [count, setCount] = useState(0);

  // Closure được tạo khi component mount
  const increment = () => {
    setCount(count + 1); // count luôn là 0
  };

  // Functional update không bị stale closure
  const incrementCorrect = () => {
    setCount((prev) => prev + 1);
  };

  // Hoặc dùng useCallback để refresh closure
  const incrementWithCallback = useCallback(() => {
    setCount((c) => c + 1);
  }, []); // Không có dependencies

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Bad Increment</button>
      <button onClick={incrementCorrect}>Good Increment</button>
    </div>
  );
}
```

---

## Lazy initialization là gì? Khi nào dùng?

### Trả lời / Answer:

**Lazy initialization** là kỹ thuật trì hoãn việc tính toán giá trị ban đầu của state cho đến khi component mount lần đầu.

### Cú pháp:

```jsx
// Normal initialization - tính toán mỗi lần render
const [state, setState] = useState(expensiveFunction());

// Lazy initialization - chỉ tính toán 1 lần
const [state, setState] = useState(() => expensiveFunction());
```

---

### Khi nào dùng Lazy Initialization?

1. **Expensive computation / Tính toán tốn kém**
2. **Initial state từ localStorage**
3. **Initial state từ complex object**
4. **Initial state từ API (rare)**

---

### Ví dụ thực tế / Practical Example:

```jsx
// ❌ Sai - Tính toán mỗi lần render
function ExpensiveComponent() {
  // expensiveFunction() chạy mỗi lần render
  const [data, setData] = useState(calculateExpensiveData());

  return <div>{data}</div>;
}

// ✅ Đúng - Chỉ chạy 1 lần
function ExpensiveComponent() {
  // expensiveFunction() chỉ chạy khi mount
  const [data, setData] = useState(() => calculateExpensiveData());

  return <div>{data}</div>;
}
```

---

### Ví dụ với localStorage:

```jsx
// ❌ Sai - Đọc localStorage mỗi lần render
function ThemeToggle() {
  // localStorage.getItem() chạy mỗi render
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  return (
    <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
      {theme}
    </button>
  );
}

// ✅ Đúng - Chỉ đọc 1 lần
function ThemeToggle() {
  // localStorage.getItem() chỉ chạy 1 lần
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
      {theme}
    </button>
  );
}
```

---

### Ví dụ với complex object:

```jsx
function FormWithDefaults() {
  const [formData, setFormData] = useState(() => {
    // Chỉ chạy 1 lần khi mount
    const saved = localStorage.getItem("formData");
    if (saved) {
      return JSON.parse(saved);
    }

    // Default values
    return {
      name: "",
      email: "",
      age: 0,
      preferences: {
        notifications: true,
        theme: "light",
        language: "en",
      },
      address: {
        street: "",
        city: "",
        country: "",
      },
    };
  });

  return <div>{/* form fields */}</div>;
}
```

---

### Ví dụ với expensive calculation:

```jsx
function Fibonacci() {
  const [n, setN] = useState(10);

  // ❌ Sai - Tính toán Fibonacci mỗi render
  const [fib, setFib] = useState(calculateFibonacci(10));

  // ✅ Đúng - Lazy initialization
  const [fib, setFib] = useState(() => calculateFibonacci(10));

  const updateN = (newN) => {
    setN(newN);
    setFib(() => calculateFibonacci(newN));
  };

  return (
    <div>
      <input
        type="number"
        value={n}
        onChange={(e) => updateN(parseInt(e.target.value))}
      />
      <p>
        Fibonacci({n}) = {fib}
      </p>
    </div>
  );
}

function calculateFibonacci(n) {
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}
```

---

## Batching trong React 18 (Automatic Batching)?

### Trả lời / Answer:

**Automatic Batching** trong React 18 là tính năng tự động gom nhóm tất cả state updates vào một re-render, bất kể chúng được gọi ở đâu.

### React 17 vs React 18:

| Câu lệnh      | React 17       | React 18   |
| ------------- | -------------- | ---------- |
| Event handler | ✅ Batched     | ✅ Batched |
| setTimeout    | ❌ Not batched | ✅ Batched |
| Promise       | ❌ Not batched | ✅ Batched |
| Native event  | ❌ Not batched | ✅ Batched |

---

### Ví dụ thực tế / Practical Example:

```jsx
// React 17 behavior
function Counter17() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    // Batched - 1 re-render
    setCount((c) => c + 1);
    setFlag((f) => !f);
  }

  function fetchData() {
    fetchSomething().then(() => {
      // ❌ Not batched - 2 re-renders
      setCount((c) => c + 1);
      setFlag((f) => !f);
    });
  }

  return <button onClick={handleClick}>Click</button>;
}
```

```jsx
// React 18 behavior
function Counter18() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    // ✅ Batched - 1 re-render
    setCount((c) => c + 1);
    setFlag((f) => !f);
  }

  function fetchData() {
    fetchSomething().then(() => {
      // ✅ Batched - 1 re-render
      setCount((c) => c + 1);
      setFlag((f) => !f);
    });
  }

  function setTimeoutExample() {
    setTimeout(() => {
      // ✅ Batched - 1 re-render
      setCount((c) => c + 1);
      setFlag((f) => !f);
    }, 1000);
  }

  return <button onClick={handleClick}>Click</button>;
}
```

---

### Demo với console logs:

```jsx
function BatchingDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  console.log("Render:", { count, name });

  const handleClick = () => {
    console.log("Before updates");
    setCount(1);
    setName("React");
    console.log("After updates (before render)");
  };

  const handleAsync = async () => {
    console.log("Before async updates");
    await Promise.resolve();
    setCount(2);
    setName("React 18");
    console.log("After async updates (before render)");
  };

  return (
    <div>
      <button onClick={handleClick}>Sync Updates</button>
      <button onClick={handleAsync}>Async Updates</button>
    </div>
  );
}

// Output:
// Render: { count: 0, name: '' }
// Before updates
// After updates (before render)
// Render: { count: 1, name: 'React' }
// Before async updates
// After async updates (before render)
// Render: { count: 2, name: 'React 18' }
```

---

### Opt-out với flushSync:

```jsx
import { flushSync } from "react-dom";

function ForceSync() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const handleClick = () => {
    // Force synchronous update
    flushSync(() => {
      setCount((c) => c + 1);
    });
    // Render happens here

    console.log("After first render:", count); // 1

    flushSync(() => {
      setName("React");
    });
    // Render happens here

    console.log("After second render:", name); // 'React'
  };

  return <button onClick={handleClick}>Click</button>;
}
```

---

## Tại sao `setState` không cập nhật state ngay lập tức?

### Trả lời / Answer:

`setState` không cập nhật state ngay lập tức vì:

1. **Asynchronous / Bất đồng bộ:**
   - React batch updates để tối ưu hiệu suất
   - Updates được queue và xử lý sau

2. **Performance / Hiệu suất:**
   - Gom nhiều updates thành một re-render
   - Tránh re-render không cần thiết

3. **Consistency / Tính nhất quán:**
   - Đảm bảo state updates được xử lý đúng thứ tự
   - Tránh race conditions

---

### Ví dụ thực tế / Practical Example:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("Before setState:", count); // 0

    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);

    console.log("After setState:", count); // Vẫn là 0!
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

---

### Giải pháp: Functional update:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("Before setState:", count); // 0

    setCount((prev) => {
      console.log("First update, prev:", prev); // 0
      return prev + 1;
    });

    setCount((prev) => {
      console.log("Second update, prev:", prev); // 1
      return prev + 1;
    });

    setCount((prev) => {
      console.log("Third update, prev:", prev); // 2
      return prev + 1;
    });

    console.log("After setState:", count); // Vẫn là 0
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}

// Output:
// Before setState: 0
// After setState: 0
// First update, prev: 0
// Second update, prev: 1
// Third update, prev: 2
// Render: { count: 3 }
```

---

### Đọc state sau khi update:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // ❌ Sai - count không cập nhật ngay
    setCount(count + 1);
    console.log("New count:", count); // Vẫn là 0
  };

  const handleClickCorrect = () => {
    // ✅ Đúng - Dùng useEffect
    setCount((c) => c + 1);
  };

  // Chạy sau khi state đã cập nhật
  useEffect(() => {
    console.log("Count changed to:", count);
  }, [count]);

  return <button onClick={handleClickCorrect}>Count: {count}</button>;
}
```

---

### Multiple state updates:

```jsx
function MultiState() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);

  const handleMultipleUpdates = () => {
    // Tất cả updates được batched
    setCount(1);
    setName("React");
    setItems([1, 2, 3]);

    // Không thể đọc state mới ở đây
    console.log(count); // 0
    console.log(name); // ''
    console.log(items.length); // 0
  };

  // Dùng useEffect để đọc state mới
  useEffect(() => {
    console.log("State updated:", { count, name, items });
  }, [count, name, items]);

  return <button onClick={handleMultipleUpdates}>Update</button>;
}
```

---

## Object và Array updates trong React (immutability)?

### Trả lời / Answer:

React yêu cầu **immutability** (bất biến) khi cập nhật state. Không được mutate state trực tiếp.

### Quy tắc:

1. **Object:**
   - Không mutate object trực tiếp
   - Tạo object mới với spread operator
   - Hoặc dùng `Object.assign()`

2. **Array:**
   - Không mutate array trực tiếp
   - Tạo array mới với spread operator
   - Dùng array methods không mutate (map, filter, reduce)

---

### Object Updates:

```jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: "John",
    age: 30,
    email: "john@example.com",
  });

  // ❌ Sai - Mutate trực tiếp
  const updateNameBad = () => {
    user.name = "Jane"; // Không re-render!
    setUser(user);
  };

  // ✅ Đúng - Spread operator
  const updateNameGood = () => {
    setUser((prev) => ({
      ...prev,
      name: "Jane",
    }));
  };

  // ✅ Đúng - Object.assign
  const updateAge = () => {
    setUser((prev) => Object.assign({}, prev, { age: 31 }));
  };

  // ✅ Đúng - Nested object
  const updateNested = () => {
    setUser((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        city: "New York",
      },
    }));
  };

  return <div>{user.name}</div>;
}
```

---

### Array Updates:

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build app" },
  ]);

  // ❌ Sai - Mutate array
  const addTodoBad = () => {
    todos.push({ id: 3, text: "New todo" });
    setTodos(todos);
  };

  // ✅ Đúng - Spread operator
  const addTodoGood = (text) => {
    setTodos((prev) => [...prev, { id: Date.now(), text }]);
  };

  // ✅ Đúng - Filter (remove)
  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // ✅ Đúng - Map (update)
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // ✅ Đúng - Reduce (complex update)
  const updateTodo = (id, newText) => {
    setTodos((prev) =>
      prev.reduce((acc, todo) => {
        if (todo.id === id) {
          return [...acc, { ...todo, text: newText }];
        }
        return [...acc, todo];
      }, []),
    );
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

---

### Ví dụ thực tế / Practical Example:

```jsx
function ShoppingCart() {
  const [cart, setCart] = useState({
    items: [],
    total: 0,
    discount: 0,
  });

  // Add item
  const addItem = (product) => {
    setCart((prev) => {
      const existingItem = prev.items.find((item) => item.id === product.id);

      if (existingItem) {
        // Update quantity
        return {
          ...prev,
          items: prev.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
          total: prev.total + product.price,
        };
      } else {
        // Add new item
        return {
          ...prev,
          items: [...prev.items, { ...product, quantity: 1 }],
          total: prev.total + product.price,
        };
      }
    });
  };

  // Remove item
  const removeItem = (id) => {
    setCart((prev) => {
      const item = prev.items.find((item) => item.id === id);
      return {
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
        total: prev.total - item.price * item.quantity,
      };
    });
  };

  // Update quantity
  const updateQuantity = (id, quantity) => {
    setCart((prev) => {
      const item = prev.items.find((item) => item.id === id);
      const oldTotal = item.price * item.quantity;
      const newTotal = item.price * quantity;

      return {
        ...prev,
        items: prev.items.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        ),
        total: prev.total - oldTotal + newTotal,
      };
    });
  };

  // Apply discount
  const applyDiscount = (code) => {
    setCart((prev) => ({
      ...prev,
      discount: code === "SAVE10" ? 0.1 : 0,
    }));
  };

  const finalTotal = cart.total * (1 - cart.discount);

  return (
    <div>
      <h2>Cart Total: ${finalTotal.toFixed(2)}</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} - $
            {(item.price * item.quantity).toFixed(2)}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### Helper functions cho immutability:

```jsx
// Helper: Update nested object
function updateNestedObject(obj, path, value) {
  const keys = path.split(".");
  const newObject = { ...obj };

  let current = newObject;
  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = { ...current[keys[i]] };
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;

  return newObject;
}

// Usage
function Form() {
  const [data, setData] = useState({
    user: {
      profile: {
        name: "",
        email: "",
      },
    },
  });

  const updateEmail = (email) => {
    setData((prev) => updateNestedObject(prev, "user.profile.email", email));
  };

  return <input onChange={(e) => updateEmail(e.target.value)} />;
}

// Helper: Update array item
function updateArrayItem(array, index, newValue) {
  return [...array.slice(0, index), newValue, ...array.slice(index + 1)];
}

// Helper: Insert array item
function insertArrayItem(array, index, newItem) {
  return [...array.slice(0, index), newItem, ...array.slice(index)];
}

// Helper: Remove array item
function removeArrayItem(array, index) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}
```
