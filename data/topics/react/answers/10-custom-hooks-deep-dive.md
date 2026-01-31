# 10. Custom Hooks - Deep Dive / Custom Hooks - Đào sâu

## Custom hook là gì?

### Trả lời / Answer:

**Custom Hook** là function JavaScript bắt đầu bằng "use" và có thể gọi các hooks khác bên trong.

### Đặc điểm:

1. **Bắt đầu bằng "use":**
   - Naming convention: `useSomething`
   - Giúp React nhận biết là hook

2. **Có thể gọi hooks khác:**
   - `useState`, `useEffect`, v.v.
   - Phải tuân thủ Rules of Hooks

3. **Tái sử dụng được:**
   - Logic có thể dùng ở nhiều component
   - Giảm code duplication

4. **Isolated state:**
   - Mỗi lần gọi có state riêng
   - Không chia sẻ state giữa các lần gọi

---

### Cấu trúc cơ bản:

```jsx
function useCustomHook() {
  // Có thể gọi hooks khác
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Effect logic
  }, []);

  // Trả về giá trị/function
  return { state, setState };
}
```

---

### Ví dụ thực tế / Practical Example:

```jsx
// Custom hook đơn giản
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
}

// Sử dụng custom hook
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);

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

---

## Rules of Hooks? Tại sao quan trọng?

### Trả lời / Answer:

### Rules of Hooks:

1. **Only call hooks at the top level:**
   - Không gọi hooks trong loops, conditions, nested functions
   - Luôn gọi ở đầu component

2. **Only call hooks from React functions:**
   - Chỉ gọi trong React components hoặc custom hooks
   - Không gọi trong regular JavaScript functions

---

### Tại sao quan trọng?

1. **Hook order:**
   - React phụ thuộc vào thứ tự gọi hooks
   - Thứ tự phải giữ nguyên giữa renders

2. **State isolation:**
   - React cần biết hook nào thuộc component nào
   - Dựa vào thứ tự gọi hooks

3. **Multiple instances:**
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

### ESLint plugin:

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

## Tạo một custom hook?

### Trả lời / Answer:

### Các bước tạo custom hook:

1. **Identify reusable logic:**
   - Tìm logic lặp lại
   - Tách thành function riêng

2. **Create hook function:**
   - Bắt đầu bằng "use"
   - Gọi hooks khác bên trong

3. **Return values:**
   - Trả về state, functions, v.v.
   - Component có thể dùng

4. **Use in components:**
   - Import và gọi hook
   - Dùng giá trị trả về

---

### Ví dụ thực tế / Practical Example:

```jsx
// 1. useWindowSize - Hook theo dõi kích thước cửa sổ
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

// Sử dụng
function WindowSizeDisplay() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
}
```

```jsx
// 2. useLocalStorage - Hook đồng bộ với localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
}

// Sử dụng
function LocalStorageExample() {
  const [name, setName] = useLocalStorage("name", "");

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Hello, {name || "stranger"}!</p>
    </div>
  );
}
```

```jsx
// 3. useToggle - Hook toggle boolean
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse };
}

// Sử dụng
function ToggleExample() {
  const { value: isOn, toggle, setTrue, setFalse } = useToggle(false);

  return (
    <div>
      <p>Status: {isOn ? "ON" : "OFF"}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={setTrue}>Turn ON</button>
      <button onClick={setFalse}>Turn OFF</button>
    </div>
  );
}
```

---

## Hook composition?

### Trả lời / Answer:

**Hook composition** là việc kết hợp nhiều custom hooks để tạo hook phức tạp hơn.

### Ví dụ thực tế / Practical Example:

```jsx
// useCounter - Hook đếm
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
}

// useToggle - Hook toggle
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((v) => !v), []);

  return { value, toggle };
}

// useCounterWithToggle - Kết hợp 2 hooks
function useCounterWithToggle(initialCount = 0) {
  const counter = useCounter(initialCount);
  const toggle = useToggle(false);

  // Kết hợp logic từ 2 hooks
  const incrementIfOn = useCallback(() => {
    if (toggle.value) {
      counter.increment();
    }
  }, [toggle.value, counter.increment]);

  return {
    count: counter.count,
    increment: counter.increment,
    decrement: counter.decrement,
    reset: counter.reset,
    isOn: toggle.value,
    toggleOn: toggle.toggle,
    incrementIfOn,
  };
}

// Sử dụng
function CounterWithToggle() {
  const { count, increment, decrement, reset, isOn, toggleOn, incrementIfOn } =
    useCounterWithToggle(0);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Status: {isOn ? "ON" : "OFF"}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={incrementIfOn}>+ (if ON)</button>
      <button onClick={toggleOn}>Toggle</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

---

### Ví dụ với useFetch và useLocalStorage:

```jsx
// useFetch - Hook fetch data
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        const response = await fetch(url, {
          signal: abortController.signal,
        });
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => abortController.abort();
  }, [url]);

  return { data, loading, error };
}

// useLocalStorage - Hook đồng bộ localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
}

// useCachedFetch - Kết hợp useFetch và useLocalStorage
function useCachedFetch(url, cacheKey) {
  const [cachedData, setCachedData] = useLocalStorage(cacheKey, null);
  const { data, loading, error } = useFetch(url);

  // Cache data khi fetch thành công
  useEffect(() => {
    if (data && !loading && !error) {
      setCachedData(data);
    }
  }, [data, loading, error, setCachedData]);

  // Return cached data nếu có, hoặc data đang fetch
  return {
    data: data || cachedData,
    loading,
    error,
  };
}

// Sử dụng
function CachedDataDisplay() {
  const { data, loading, error } = useCachedFetch("/api/users", "cached-users");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Users (from {data ? "API" : "cache"})</h2>
      <ul>
        {data?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Testing custom hooks?

### Trả lời / Answer:

### Cách test custom hooks:

1. **Use @testing-library/react-hooks:**
   - Library chuyên dụng để test hooks
   - Render hook trong test environment

2. **Create test component:**
   - Component dùng hook
   - Test component behavior

3. **Use act():**
   - Wrap state updates trong act()
   - Đảm bảo React xử lý updates

---

### Ví dụ thực tế / Practical Example:

```jsx
// useCounter hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
}
```

```jsx
// Test với @testing-library/react-hooks
import { renderHook, act } from "@testing-library/react-hooks";

describe("useCounter", () => {
  it("should initialize with initial value", () => {
    const { result } = renderHook(() => useCounter(5));

    expect(result.current.count).toBe(5);
  });

  it("should increment count", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it("should decrement count", () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(9);
  });

  it("should reset count", () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useCounter(initialValue),
      { initialProps: { initialValue: 5 } },
    );

    act(() => {
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(7);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(5);
  });

  it("should update initial value on rerender", () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useCounter(initialValue),
      { initialProps: { initialValue: 5 } },
    );

    expect(result.current.count).toBe(5);

    rerender({ initialValue: 10 });

    expect(result.current.count).toBe(10);
  });
});
```

---

### Test với test component:

```jsx
// Test component dùng hook
function CounterComponent({ initialValue = 0 }) {
  const { count, increment, decrement, reset } = useCounter(initialValue);

  return (
    <div>
      <span data-testid="count">{count}</span>
      <button data-testid="increment" onClick={increment}>
        +
      </button>
      <button data-testid="decrement" onClick={decrement}>
        -
      </button>
      <button data-testid="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

// Test
import { render, screen, fireEvent } from "@testing-library/react";

describe("CounterComponent", () => {
  it("should display initial count", () => {
    render(<CounterComponent initialValue={5} />);

    expect(screen.getByTestId("count")).toHaveTextContent("5");
  });

  it("should increment count on click", () => {
    render(<CounterComponent />);

    const incrementButton = screen.getByTestId("increment");
    fireEvent.click(incrementButton);

    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  it("should decrement count on click", () => {
    render(<CounterComponent initialValue={10} />);

    const decrementButton = screen.getByTestId("decrement");
    fireEvent.click(decrementButton);

    expect(screen.getByTestId("count")).toHaveTextContent("9");
  });

  it("should reset count on click", () => {
    render(<CounterComponent initialValue={5} />);

    const incrementButton = screen.getByTestId("increment");
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    expect(screen.getByTestId("count")).toHaveTextContent("7");

    const resetButton = screen.getByTestId("reset");
    fireEvent.click(resetButton);

    expect(screen.getByTestId("count")).toHaveTextContent("5");
  });
});
```

---

## Common custom hook patterns (useFetch, useDebounce, useLocalStorage, useToggle)?

### Trả lời / Answer:

### 1. useFetch - Hook fetch data

```jsx
function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, {
          ...options,
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => abortController.abort();
  }, [url, JSON.stringify(options)]);

  const refetch = useCallback(() => {
    // Trigger refetch
  }, [url, options]);

  return { data, loading, error, refetch };
}

// Sử dụng
function UserList() {
  const { data: users, loading, error, refetch } = useFetch("/api/users");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

### 2. useDebounce - Hook debounce

```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Sử dụng
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: results } = useFetch(
    debouncedSearchTerm
      ? `/api/search?q=${encodeURIComponent(debouncedSearchTerm)}`
      : null,
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results?.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

### 3. useLocalStorage - Hook đồng bộ localStorage

```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    },
    [key, storedValue],
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

// Sử dụng
function ThemeToggle() {
  const [theme, setTheme, removeTheme] = useLocalStorage("theme", "light");

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button
        onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      >
        Toggle Theme
      </button>
      <button onClick={removeTheme}>Reset Theme</button>
    </div>
  );
}
```

---

### 4. useToggle - Hook toggle boolean

```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse };
}

// Sử dụng
function ModalExample() {
  const { value: isOpen, toggle, setFalse: close } = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modal</h2>
            <p>This is a modal</p>
            <button onClick={close}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

### 5. usePrevious - Hook lưu giá trị trước đó

```jsx
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

// Sử dụng
function ComponentWithPrevious({ userId }) {
  const [user, setUser] = useState(null);
  const prevUserId = usePrevious(userId);

  useEffect(() => {
    if (userId !== prevUserId) {
      fetchUser(userId).then(setUser);
    }
  }, [userId, prevUserId]);

  return <div>{user?.name}</div>;
}
```

---

### 6. useMediaQuery - Hook theo dõi media queries

```jsx
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

// Sử dụng
function ResponsiveComponent() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return <div>{isMobile ? <p>Mobile view</p> : <p>Desktop view</p>}</div>;
}
```

---

### 7. useClickOutside - Hook detect click bên ngoài

```jsx
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

// Sử dụng
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Dropdown</button>
      {isOpen && (
        <div className="dropdown-menu">
          <p>Option 1</p>
          <p>Option 2</p>
          <p>Option 3</p>
        </div>
      )}
    </div>
  );
}
```
