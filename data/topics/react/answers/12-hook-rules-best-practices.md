# 12. Hook Rules & Best Practices / Quy tắc Hooks & Thực hành tốt nhất

## Rules of Hooks chi tiết?

### Trả lời / Answer:

### 2 Quy tắc cơ bản của Hooks:

1. **Only Call Hooks at the Top Level:**
   - Không gọi hooks trong loops, conditions, nested functions
   - Luôn gọi ở đầu component

2. **Only Call Hooks from React Functions:**
   - Chỉ gọi trong React components hoặc custom hooks
   - Không gọi trong regular JavaScript functions

---

### Tại sao quan trọng?

1. **Hook Order:**
   - React phụ thuộc vào thứ tự gọi hooks
   - Thứ tự phải giữ nguyên giữa renders

2. **State Isolation:**
   - React cần biết hook nào thuộc component nào
   - Dựa vào thứ tự gọi hooks

3. **Multiple Instances:**
   - Component có thể có nhiều instances
   - Mỗi instance cần state riêng

---

### Ví dụ sai:

```jsx
// ❌ Sai - Hook trong condition
function BadComponent({ shouldShow }) {
  if (shouldShow) {
    const [count, setCount] = useState(0); // Error!
  }

  return <div>...</div>;
}
```

```jsx
// ❌ Sai - Hook trong loop
function BadComponent({ items }) {
  items.forEach((item) => {
    const [value, setValue] = useState(item); // Error!
  });

  return <div>...</div>;
}
```

```jsx
// ❌ Sai - Hook trong nested function
function BadComponent() {
  const handleClick = () => {
    const [count, setCount] = useState(0); // Error!
  };

  return <button onClick={handleClick}>Click</button>;
}
```

```jsx
// ❌ Sai - Hook sau return
function BadComponent() {
  return <div>...</div>;

  const [count, setCount] = useState(0); // Error!
}
```

---

### Ví dụ đúng:

```jsx
// ✅ Đúng - Hooks ở top level
function GoodComponent({ shouldShow }) {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((c) => c + 1);
  };

  if (!shouldShow) {
    return null;
  }

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

---

### Ví dụ với conditional logic:

```jsx
// ❌ Sai - Hook trong condition
function BadComponent({ condition }) {
  if (condition) {
    const [value, setValue] = useState(0);
  }

  return <div>...</div>;
}

// ✅ Đúng - Hook luôn chạy, conditional logic trong hook
function GoodComponent({ condition }) {
  const [value, setValue] = useState(condition ? 1 : 0);

  return <div>...</div>;
}

// ✅ Hoặc dùng early return sau hooks
function GoodComponent({ condition }) {
  const [value, setValue] = useState(0);

  if (!condition) {
    return null;
  }

  return <div>...</div>;
}
```

---

## ESLint plugin `react-hooks/rules-of-hooks`?

### Trả lời / Answer:

**ESLint plugin `react-hooks/rules-of-hooks`** là plugin tự động phát hiện vi phạm Rules of Hooks.

### Cài đặt:

```json
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

---

### Các lỗi phát hiện:

1. **react-hooks/rules-of-hooks:**
   - Hooks trong conditions
   - Hooks trong loops
   - Hooks trong nested functions
   - Hooks sau return

2. **react-hooks/exhaustive-deps:**
   - Missing dependencies trong useEffect/useCallback/useMemo
   - Extra dependencies
   - Incorrect dependencies

---

### Ví dụ thực tế / Practical Example:

```jsx
// ❌ ESLint sẽ báo lỗi
function BadComponent({ condition }) {
  if (condition) {
    const [count, setCount] = useState(0); // ESLint: React Hook "useState" is called conditionally
  }

  return <div>...</div>;
}

// ✅ ESLint sẽ không báo lỗi
function GoodComponent({ condition }) {
  const [count, setCount] = useState(0);

  if (!condition) {
    return null;
  }

  return <div>...</div>;
}
```

---

### Ví dụ với exhaustive-deps:

```jsx
// ❌ ESLint sẽ báo lỗi
function BadComponent({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []); // ESLint: React Hook useEffect has a missing dependency: 'userId'

  return <div>{user?.name}</div>;
}

// ✅ ESLint sẽ không báo lỗi
function GoodComponent({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // ✅ userId có trong deps

  return <div>{user?.name}</div>;
}
```

---

## Conditional hooks - tại sao không nên?

### Trả lời / Answer:

**Conditional hooks** là việc gọi hooks dựa trên điều kiện, vi phạm Rules of Hooks.

### Tại sao không nên?

1. **Breaks hook order:**
   - React phụ thuộc vào thứ tự gọi hooks
   - Conditional calls làm thứ tự thay đổi

2. **State leaks:**
   - Hooks không được cleanup đúng cách
   - Có thể gây memory leaks

3. **Unpredictable behavior:**
   - Component hoạt động không nhất quán
   - Khó debug

---

### Ví dụ sai:

```jsx
// ❌ Sai - Conditional hooks
function BadComponent({ isAdmin }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  if (isAdmin) {
    const [adminSettings, setAdminSettings] = useState({}); // Error!
  }

  return <div>...</div>;
}
```

---

### Giải pháp:

```jsx
// ✅ Đúng - Hooks luôn chạy
function GoodComponent({ isAdmin }) {
  const [user, setUser] = useState(null);
  const [adminSettings, setAdminSettings] = useState({});

  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchAdminSettings().then(setAdminSettings);
    }
  }, [isAdmin]);

  return <div>...</div>;
}
```

---

### Ví dụ với custom hook:

```jsx
// ❌ Sai - Conditional hook call
function BadComponent({ useFeature }) {
  if (useFeature) {
    const data = useCustomFeature(); // Error!
  }

  return <div>...</div>;
}

// ✅ Đúng - Hook logic bên trong
function GoodComponent({ useFeature }) {
  const data = useCustomFeature({ enabled: useFeature });

  return <div>...</div>;
}

// Custom hook
function useCustomFeature({ enabled }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (enabled) {
      fetchData().then(setData);
    }
  }, [enabled]);

  return data;
}
```

---

## Hooks trong loops - tại sao không nên?

### Trả lời / Answer:

**Hooks trong loops** vi phạm Rules of Hooks vì làm thứ tự hooks không ổn định.

### Tại sao không nên?

1. **Unpredictable hook order:**
   - Số lượng hooks thay đổi mỗi render
   - React không biết hook nào thuộc component nào

2. **State corruption:**
   - Hooks có thể lấy state sai
   - Component hoạt động không đúng

3. **Performance issues:**
   - Tạo quá nhiều hooks không cần thiết
   - Memory leaks

---

### Ví dụ sai:

```jsx
// ❌ Sai - Hooks trong loop
function BadComponent({ items }) {
  const [values, setValues] = useState([]);

  items.forEach((item, index) => {
    const [value, setValue] = useState(item); // Error!
  });

  return <div>...</div>;
}
```

---

### Giải pháp:

```jsx
// ✅ Đúng - Sử dụng object/array state
function GoodComponent({ items }) {
  const [values, setValues] = useState(
    items.map((item) => ({ value: item, editing: false })),
  );

  const handleValueChange = (index, newValue) => {
    setValues((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, value: newValue } : item,
      ),
    );
  };

  const handleToggleEdit = (index) => {
    setValues((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, editing: !item.editing } : item,
      ),
    );
  };

  return (
    <div>
      {values.map((item, index) => (
        <div key={index}>
          {item.editing ? (
            <input
              value={item.value}
              onChange={(e) => handleValueChange(index, e.target.value)}
            />
          ) : (
            <span>{item.value}</span>
          )}
          <button onClick={() => handleToggleEdit(index)}>
            {item.editing ? "Save" : "Edit"}
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

### Ví dụ với dynamic inputs:

```jsx
// ✅ Đúng - Dynamic inputs với object state
function DynamicInputs({ initialValues }) {
  const [inputs, setInputs] = useState(initialValues);

  const handleChange = (index, value) => {
    setInputs((prev) =>
      prev.map((input, i) => (i === index ? { ...input, value } : input)),
    );
  };

  const handleAdd = () => {
    setInputs((prev) => [...prev, { value: "" }]);
  };

  const handleRemove = (index) => {
    setInputs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      {inputs.map((input, index) => (
        <div key={index}>
          <input
            value={input.value}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          <button onClick={() => handleRemove(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAdd}>Add Input</button>
    </div>
  );
}
```

---

## Custom hooks naming conventions?

### Trả lời / Answer:

**Naming conventions** cho custom hooks giúp dễ nhận biết là hook.

### Quy tắc:

1. **Bắt đầu bằng "use":**
   - `useCounter`, `useFetch`, `useLocalStorage`
   - Giúp React và devtools nhận biết

2. **CamelCase:**
   - `useWindowSize`, `useMediaQuery`
   - Phù hợp với JavaScript conventions

3. **Descriptive names:**
   - Mô tả rõ ràng chức năng
   - Dễ hiểu khi đọc

---

### Ví dụ thực tế / Practical Example:

```jsx
// ✅ Đúng - Naming conventions tốt
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => c - 1), []);

  return { count, increment, decrement };
}

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setStoredValue = useCallback(
    (newValue) => {
      try {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error(error);
      }
    },
    [key],
  );

  return [value, setStoredValue];
}
```

---

### Ví dụ sai:

```jsx
// ❌ Sai - Không bắt đầu bằng "use"
function counter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  return { count, setCount };
}

// ❌ Sai - Không phải camelCase
function Use_Fetch(url) {
  const [data, setData] = useState(null);
  // ...
}

// ❌ Sai - Không mô tả rõ chức năng
function useThing(url) {
  const [data, setData] = useState(null);
  // ...
}
```

---

## Common hook anti-patterns?

### Trả lời / Answer:

### 1. Missing dependencies

```jsx
// ❌ Sai - Missing dependency
function BadComponent({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []); // userId missing!

  return <div>{user?.name}</div>;
}

// ✅ Đúng - Có đầy đủ dependencies
function GoodComponent({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

---

### 2. Mutating state directly

```jsx
// ❌ Sai - Mutate state trực tiếp
function BadComponent() {
  const [items, setItems] = useState([1, 2, 3]);

  const addItem = (item) => {
    items.push(item); // Mutate!
    setItems(items);
  };

  return <div>...</div>;
}

// ✅ Đúng - Tạo array mới
function GoodComponent() {
  const [items, setItems] = useState([1, 2, 3]);

  const addItem = (item) => {
    setItems((prev) => [...prev, item]);
  };

  return <div>...</div>;
}
```

---

### 3. Using old state in setState

```jsx
// ❌ Sai - Dùng state cũ
function BadComponent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1); // Dùng state cũ
    setCount(count + 1); // Cả 2 calls dùng cùng giá trị
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}

// ✅ Đúng - Functional update
function GoodComponent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((c) => c + 1); // Functional update
    setCount((c) => c + 1); // Mỗi call nhận giá trị mới nhất
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

---

### 4. useEffect without dependency array

```jsx
// ❌ Sai - Không có dependency array
function BadComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect runs on every render!");
    setCount(count + 1); // Infinite loop!
  });

  return <div>Count: {count}</div>;
}

// ✅ Đúng - Có dependency array
function GoodComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect runs only once on mount");
  }, []);

  return <div>Count: {count}</div>;
}
```

---

### 5. Creating functions in render

```jsx
// ❌ Sai - Function mới mỗi render
function BadComponent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // Function mới mỗi render
    setCount(count + 1);
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}

// ✅ Đúng - Memoize function
function GoodComponent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

---

### 6. Not cleaning up effects

```jsx
// ❌ Sai - Không cleanup
function BadComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    // Quên cleanup!
  }, []);

  return <div>Count: {count}</div>;
}

// ✅ Đúng - Có cleanup
function GoodComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <div>Count: {count}</div>;
}
```

---

### 7. Using useEffect for side effects in render

```jsx
// ❌ Sai - Side effect trong render
function BadComponent() {
  const [data, setData] = useState(null);

  fetch("/api/data").then(setData); // Side effect trong render!

  return <div>{data}</div>;
}

// ✅ Đúng - Side effect trong useEffect
function GoodComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/data").then(setData);
  }, []);

  return <div>{data}</div>;
}
```

---

### 8. Overusing useMemo/useCallback

```jsx
// ❌ Sai - Memoize quá nhiều
function BadComponent({ a, b, c, d, e }) {
  const sum = useMemo(() => a + b, [a, b]); // Không cần memoize
  const product = useMemo(() => c * d, [c, d]); // Không cần memoize
  const result = useMemo(() => sum + e, [sum, e]); // Không cần memoize

  return <div>{result}</div>;
}

// ✅ Đúng - Chỉ memoize khi cần
function GoodComponent({ a, b, c, d, e }) {
  const sum = a + b;
  const product = c * d;
  const result = sum + e;

  return <div>{result}</div>;
}

// ✅ Hoặc memoize expensive calculation
function GoodComponent({ items, filter }) {
  const filteredItems = useMemo(() => {
    return items.filter((item) => item.category === filter);
  }, [items, filter]); // ✅ Memoize expensive filter

  return <div>{filteredItems.length} items</div>;
}
```

---

### 9. Using useState for derived state

```jsx
// ❌ Sai - Derived state trong useState
function BadComponent({ items }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(items.reduce((sum, item) => sum + item.price, 0));
  }, [items]);

  return <div>Total: {total}</div>;
}

// ✅ Đúng - Derived state tính toán trực tiếp
function GoodComponent({ items }) {
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items],
  );

  return <div>Total: {total}</div>;
}
```

---

### 10. Not handling errors in async operations

```jsx
// ❌ Sai - Không xử lý lỗi
function BadComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then(setData);
    // Quên xử lý lỗi!
  }, []);

  return <div>{data}</div>;
}

// ✅ Đúng - Có xử lý lỗi
function GoodComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then(setData)
      .catch(setError);
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  return <div>{data}</div>;
}
```
