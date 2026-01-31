# 11. Additional Hooks / Các Hooks bổ sung

## `useId` là gì? Khi nào dùng?

### Trả lời / Answer:

**`useId`** là hook tạo unique ID ổn định giữa các renders, hữu ích cho accessibility.

### Đặc điểm:

1. **Unique ID:**
   - Tạo ID duy nhất cho mỗi lần gọi
   - Giữ nguyên giữa renders

2. **Stable:**
   - ID không thay đổi khi component re-render
   - Khác với `Date.now()` hoặc `Math.random()`

3. **Server-side rendering:**
   - Hoạt động tốt với SSR
   - Tránh mismatch giữa server và client

---

### Ví dụ thực tế / Practical Example:

```jsx
// ❌ Sai - ID thay đổi mỗi render
function BadForm() {
  const [items, setItems] = useState(["Item 1", "Item 2"]);

  return (
    <form>
      {items.map((item, index) => (
        <div key={index}>
          <label htmlFor={`item-${Date.now()}`}>{item}</label>
          <input id={`item-${Date.now()}`} type="text" />
        </div>
      ))}
    </form>
  );
}

// ✅ Đúng - ID ổn định với useId
function GoodForm() {
  const id = useId();
  const [items, setItems] = useState(["Item 1", "Item 2"]);

  return (
    <form>
      {items.map((item, index) => (
        <div key={index}>
          <label htmlFor={`${id}-${index}`}>{item}</label>
          <input id={`${id}-${index}`} type="text" />
        </div>
      ))}
    </form>
  );
}
```

---

### Ví dụ với multiple inputs:

```jsx
function LoginForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form>
      <div>
        <label htmlFor={`${id}-email`}>Email</label>
        <input
          id={`${id}-email`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor={`${id}-password`}>Password</label>
        <input
          id={`${id}-password`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
```

---

### Ví dụ với radio buttons:

```jsx
function RadioGroup({ name, options, value, onChange }) {
  const id = useId();

  return (
    <div>
      {options.map((option) => (
        <div key={option.value}>
          <input
            id={`${id}-${option.value}`}
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <label htmlFor={`${id}-${option.value}`}>{option.label}</label>
        </div>
      ))}
    </div>
  );
}

// Sử dụng
function ColorPicker() {
  const [color, setColor] = useState("red");

  const colors = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" },
  ];

  return (
    <div>
      <h3>Choose a color</h3>
      <RadioGroup
        name="color"
        options={colors}
        value={color}
        onChange={setColor}
      />
      <p>Selected: {color}</p>
    </div>
  );
}
```

---

## `useTransition` là gì? Use cases?

### Trả lời / Answer:

**`useTransition`** là hook để đánh dấu updates là "non-urgent", cho phép React ưu tiên urgent updates.

### Đặc điểm:

1. **Non-urgent updates:**
   - Updates không cần hiển thị ngay lập tức
   - React có thể hoãn lại

2. **Keep UI responsive:**
   - Urgent updates (typing, clicking) được ưu tiên
   - Non-urgent updates (filtering, sorting) được hoãn

3. **isPending flag:**
   - Biết khi transition đang chạy
   - Hiển thị loading state

---

### Cú pháp:

```jsx
const [isPending, startTransition] = useTransition();

startTransition(() => {
  // Non-urgent update
  setFilter(newFilter);
});
```

---

### Ví dụ thực tế / Practical Example:

```jsx
function SearchExample() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    // Urgent update - hiển thị ngay lập tức
    setQuery(e.target.value);

    // Non-urgent update - có thể hoãn
    startTransition(() => {
      // Expensive operation
      const filtered = largeData.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase()),
      );
      setResults(filtered);
    });
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      {isPending && <p>Searching...</p>}
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

### Ví dụ với filtering large list:

```jsx
function ProductList() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const handleFilterChange = (newFilter) => {
    // Update filter ngay lập tức
    setFilter(newFilter);

    // Filter products trong transition
    startTransition(() => {
      const filtered = products.filter((product) => {
        if (newFilter === "all") return true;
        return product.category === newFilter;
      });
      setFilteredProducts(filtered);
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => handleFilterChange("all")}>All</button>
        <button onClick={() => handleFilterChange("electronics")}>
          Electronics
        </button>
        <button onClick={() => handleFilterChange("clothing")}>Clothing</button>
      </div>
      {isPending && <p>Filtering...</p>}
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## `useDeferredValue` là gì? Khi nào dùng?

### Trả lời / Answer:

**`useDeferredValue`** là hook để hoãn việc update một giá trị, giữ giá trị cũ cho đến khi urgent updates hoàn thành.

### Đặc điểm:

1. **Defer updates:**
   - Giữ giá trị cũ trong một thời gian
   - Cho phép urgent updates hoàn thành trước

2. **Similar to debouncing:**
   - Nhưng được React quản lý
   - Tự động hủy bỏ khi không cần

3. **Use with useTransition:**
   - Thường dùng cùng với useTransition
   - Tối ưu cho non-urgent updates

---

### Cú pháp:

```jsx
const deferredValue = useDeferredValue(value);
```

---

### Ví dụ thực tế / Practical Example:

```jsx
function SearchWithDefer() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Defer query update
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    // Chỉ search khi deferredQuery thay đổi
    if (deferredQuery) {
      search(deferredQuery).then(setResults);
    }
  }, [deferredQuery]);

  const handleChange = (e) => {
    // Update query ngay lập tức (urgent)
    setQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

### Ví dụ với filtering:

```jsx
function FilteredList() {
  const [filter, setFilter] = useState("");
  const [items, setItems] = useState([]);

  // Defer filter update
  const deferredFilter = useDeferredValue(filter);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(deferredFilter.toLowerCase()),
    );
  }, [items, deferredFilter]);

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter..."
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## `useSyncExternalStore` là gì? Khi nào dùng?

### Trả lời / Answer:

**`useSyncExternalStore`** là hook để subscribe vào external store và sync với React state.

### Đặc điểm:

1. **External stores:**
   - Stores không được quản lý bởi React
   - Ví dụ: Redux, Zustand, browser APIs

2. **Sync with React:**
   - Subscribe và unsubscribe tự động
   - Trigger re-render khi store thay đổi

3. **SSR compatible:**
   - Hoạt động tốt với server-side rendering

---

### Cú pháp:

```jsx
const snapshot = useSyncExternalStore(
  subscribe,
  getSnapshot,
  getServerSnapshot,
);
```

---

### Ví dụ thực tế / Practical Example:

```jsx
// Subscribe vào browser API
function OnlineStatus() {
  const isOnline = useSyncExternalStore(
    // subscribe
    (callback) => {
      window.addEventListener("online", callback);
      window.addEventListener("offline", callback);
      return () => {
        window.removeEventListener("online", callback);
        window.removeEventListener("offline", callback);
      };
    },
    // getSnapshot
    () => navigator.onLine,
    // getServerSnapshot (optional)
    () => true, // Assume online on server
  );

  return <div>Status: {isOnline ? "Online" : "Offline"}</div>;
}
```

---

### Ví dụ với external store:

```jsx
// Simple external store
let store = { count: 0 };
const listeners = new Set();

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return store;
}

function increment() {
  store = { count: store.count + 1 };
  listeners.forEach((listener) => listener());
}

// React component
function Counter() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot);

  return (
    <div>
      <p>Count: {snapshot.count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

---

### Ví dụ với localStorage:

```jsx
function useLocalStorageSync(key, initialValue) {
  const snapshot = useSyncExternalStore(
    // subscribe
    (callback) => {
      const handler = (e) => {
        if (e.key === key) {
          callback();
        }
      };
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    },
    // getSnapshot
    () => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        return initialValue;
      }
    },
    // getServerSnapshot
    () => initialValue,
  );

  return snapshot;
}

// Sử dụng
function ThemeToggle() {
  const theme = useLocalStorageSync("theme", "light");

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button
        onClick={() => {
          const newTheme = theme === "light" ? "dark" : "light";
          window.localStorage.setItem("theme", JSON.stringify(newTheme));
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}
```

---

## `useImperativeHandle` là gì? Khi nào dùng?

### Trả lời / Answer:

**`useImperativeHandle`** là hook để tùy chỉnh instance value được expose bằng ref cho component cha.

### Đặc điểm:

1. **Expose methods:**
   - Component con có thể expose methods
   - Component cha có thể gọi trực tiếp

2. **Forward ref:**
   - Dùng cùng với `forwardRef`
   - Tùy chỉnh giá trị ref

3. **Control exposure:**
   - Chỉ expose methods cần thiết
   - Giữ component encapsulated

---

### Cú pháp:

```jsx
useImperativeHandle(ref, createHandle, [deps]);
```

---

### Ví dụ thực tế / Practical Example:

```jsx
// Custom input component
const CustomInput = React.forwardRef((props, ref) => {
  const inputRef = useRef(null);

  // Expose methods cho component cha
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    blur: () => {
      inputRef.current?.blur();
    },
    getValue: () => {
      return inputRef.current?.value;
    },
    setValue: (value) => {
      if (inputRef.current) {
        inputRef.current.value = value;
      }
    },
  }));

  return <input ref={inputRef} {...props} />;
});

// Sử dụng
function ParentComponent() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleGetValue = () => {
    console.log(inputRef.current?.getValue());
  };

  return (
    <div>
      <CustomInput ref={inputRef} defaultValue="Hello" />
      <button onClick={handleFocus}>Focus Input</button>
      <button onClick={handleGetValue}>Get Value</button>
    </div>
  );
}
```

---

### Ví dụ với modal:

```jsx
const Modal = React.forwardRef(({ isOpen, onClose, children }, ref) => {
  const modalRef = useRef(null);

  // Expose methods
  useImperativeHandle(ref, () => ({
    open: () => {
      if (modalRef.current) {
        modalRef.current.showModal();
      }
    },
    close: () => {
      if (modalRef.current) {
        modalRef.current.close();
      }
    },
  }));

  if (!isOpen) return null;

  return (
    <dialog ref={modalRef}>
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </dialog>
  );
});

// Sử dụng
function App() {
  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current?.open();
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal ref={modalRef} isOpen={true}>
        <h2>Modal Content</h2>
        <p>This is a modal</p>
      </Modal>
    </div>
  );
}
```

---

### Ví dụ với video player:

```jsx
const VideoPlayer = React.forwardRef(({ src }, ref) => {
  const videoRef = useRef(null);

  // Expose video methods
  useImperativeHandle(ref, () => ({
    play: () => {
      videoRef.current?.play();
    },
    pause: () => {
      videoRef.current?.pause();
    },
    seek: (time) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time;
      }
    },
    getCurrentTime: () => {
      return videoRef.current?.currentTime || 0;
    },
  }));

  return <video ref={videoRef} src={src} controls />;
});

// Sử dụng
function VideoApp() {
  const playerRef = useRef(null);

  const handlePlay = () => {
    playerRef.current?.play();
  };

  const handlePause = () => {
    playerRef.current?.pause();
  };

  const handleSeek = () => {
    playerRef.current?.seek(10); // Seek to 10 seconds
  };

  return (
    <div>
      <VideoPlayer ref={playerRef} src="video.mp4" />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleSeek}>Seek to 10s</button>
    </div>
  );
}
```

---

## `useDebugValue` là gì? Khi nào dùng?

### Trả lời / Answer:

**`useDebugValue`** là hook để hiển thị label cho custom hooks trong React DevTools.

### Đặc điểm:

1. **DevTools integration:**
   - Hiển thị giá trị trong React DevTools
   - Giúp debug custom hooks

2. **Lazy formatting:**
   - Format function chỉ chạy khi DevTools mở
   - Không ảnh hưởng performance

3. **Optional:**
   - Không bắt buộc phải dùng
   - Chỉ hữu ích khi debug

---

### Cú pháp:

```jsx
useDebugValue(value, formatFn);
```

---

### Ví dụ thực tế / Practical Example:

```jsx
// Custom hook với useDebugValue
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  }, [friendID]);

  // Hiển thị label trong DevTools
  useDebugValue(
    isOnline ? "Online" : "Offline",
    (status) => `FriendStatus: ${status}`,
  );

  return isOnline;
}

// Trong React DevTools:
// useFriendStatus
//   FriendStatus: Online
```

---

### Ví dụ với useFetch:

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url, {
          signal: abortController.signal,
        });
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => abortController.abort();
  }, [url]);

  // Debug value trong DevTools
  useDebugValue({ data, loading, error }, ({ data, loading, error }) => {
    if (loading) return "Loading...";
    if (error) return `Error: ${error.message}`;
    if (data) return `Data: ${JSON.stringify(data)}`;
    return "Idle";
  });

  return { data, loading, error };
}

// Trong React DevTools:
// useFetch
//   Loading...
```

---

### Ví dụ với useLocalStorage:

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useDebugValue(value, (val) => `LocalStorage[${key}]: ${JSON.stringify(val)}`);

  const setStoredValue = useCallback(
    (newValue) => {
      try {
        const valueToStore =
          newValue instanceof Function ? newValue(value) : newValue;
        setValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    },
    [key, value],
  );

  return [value, setStoredValue];
}

// Trong React DevTools:
// useLocalStorage
//   LocalStorage[theme]: "dark"
```
