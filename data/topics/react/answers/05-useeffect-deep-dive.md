# 5. useEffect - Deep Dive / useEffect - Đào sâu

## Dependency array hoạt động như thế nào?

### Trả lời / Answer:

**Dependency array** là tham số thứ hai của `useEffect` dùng để kiểm soát khi effect chạy.

### Cú pháp:

```jsx
useEffect(() => {
  // Effect code
}, [dep1, dep2, dep3]); // Dependency array
```

---

### Cách hoạt động:

1. **No dependency array `[]`:**
   - Effect chạy sau mỗi render

2. **Empty dependency array `[]`:**
   - Effect chỉ chạy 1 lần khi mount
   - Tương đương `componentDidMount`

3. **With dependencies `[dep1, dep2]`:**
   - Effect chạy khi mount
   - Chạy lại khi dependency thay đổi

4. **Omit dependency array:**
   - Effect chạy sau mỗi render

---

### Ví dụ thực tế / Practical Example:

```jsx
// 1. Không có dependency array - Chạy mỗi render
function EveryRender() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect runs after every render");
  });

  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}
```

```jsx
// 2. Empty dependency array - Chỉ chạy 1 lần
function OnceOnly() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect runs only once on mount");
  }, []);

  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}
```

```jsx
// 3. Có dependencies - Chạy khi dependency thay đổi
function OnChange() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]); // Chỉ chạy khi count thay đổi

  useEffect(() => {
    console.log("Name changed:", name);
  }, [name]); // Chỉ chạy khi name thay đổi

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <input onChange={(e) => setName(e.target.value)} />
    </div>
  );
}
```

```jsx
// 4. Multiple dependencies
function MultipleDeps({ userId, postId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("Fetching data for:", userId, postId);
    fetchData(userId, postId).then(setData);
  }, [userId, postId]); // Chạy khi userId hoặc postId thay đổi

  return <div>{data}</div>;
}
```

---

### So sánh các trường hợp:

```jsx
function ComparisonDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // Chạy MỖI render (count, name, bất cứ gì render lại)
  useEffect(() => {
    console.log("1. Every render");
  });

  // Chỉ khi MOUNT
  useEffect(() => {
    console.log("2. Mount only");
  }, []);

  // Chỉ khi COUNT thay đổi
  useEffect(() => {
    console.log("3. Count changed:", count);
  }, [count]);

  // Chỉ khi NAME thay đổi
  useEffect(() => {
    console.log("4. Name changed:", name);
  }, [name]);

  // Khi COUNT hoặc NAME thay đổi
  useEffect(() => {
    console.log("5. Count or Name changed");
  }, [count, name]);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <input onChange={(e) => setName(e.target.value)} />
    </div>
  );
}
```

---

### Lỗi phổ biến: Missing dependencies:

```jsx
// ❌ Sai - Missing dependency
function BadExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(count); // Luôn là 0 (stale closure)
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []); // count không có trong dependency array
}
```

```jsx
// ✅ Đúng - Có dependency
function GoodExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + 1); // Functional update
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Không cần count vì dùng functional update
}
```

---

## Cleanup function là gì? Khi nào chạy?

### Trả lời / Answer:

**Cleanup function** là function được trả về từ `useEffect` để dọn dẹp side effects trước khi component unmount hoặc trước khi effect chạy lại.

### Cú pháp:

```jsx
useEffect(() => {
  // Setup code

  return () => {
    // Cleanup code
  };
}, [dependencies]);
```

---

### Khi nào cleanup chạy?

1. **Before unmount:**
   - Khi component bị xóa khỏi DOM

2. **Before re-run:**
   - Trước khi effect chạy lại (khi dependencies thay đổi)

3. **NOT on first run:**
   - Không chạy lần đầu khi effect setup

---

### Ví dụ thực tế / Practical Example:

```jsx
// 1. Cleanup cho interval
function IntervalExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Setup: Creating interval");
    const intervalId = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    // Cleanup khi unmount hoặc dependency thay đổi
    return () => {
      console.log("Cleanup: Clearing interval");
      clearInterval(intervalId);
    };
  }, []);

  return <div>Count: {count}</div>;
}
```

```jsx
// 2. Cleanup cho event listener
function EventListenerExample() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    console.log("Setup: Adding resize listener");
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      console.log("Cleanup: Removing resize listener");
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div>Window width: {windowWidth}</div>;
}
```

```jsx
// 3. Cleanup cho WebSocket
function WebSocketExample({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log(`Setup: Connecting to room ${roomId}`);
    const ws = new WebSocket(`wss://example.com/rooms/${roomId}`);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    // Cleanup khi roomId thay đổi hoặc unmount
    return () => {
      console.log(`Cleanup: Disconnecting from room ${roomId}`);
      ws.close();
    };
  }, [roomId]);

  return (
    <ul>
      {messages.map((msg) => (
        <li key={msg.id}>{msg.text}</li>
      ))}
    </ul>
  );
}
```

```jsx
// 4. Cleanup cho API request (AbortController)
function FetchExample({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    console.log(`Setup: Fetching user ${userId}`);
    fetch(`/api/users/${userId}`, {
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
        }
      });

    // Cleanup khi userId thay đổi hoặc unmount
    return () => {
      console.log(`Cleanup: Aborting fetch for user ${userId}`);
      abortController.abort();
    };
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}
```

---

### Thứ tự chạy cleanup:

```jsx
function CleanupOrder() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect setup:", count);

    return () => {
      console.log("Effect cleanup:", count);
    };
  }, [count]);

  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}

// Output khi click button 3 lần:
// Effect setup: 0
// Effect cleanup: 0
// Effect setup: 1
// Effect cleanup: 1
// Effect setup: 2
// Effect cleanup: 2
// Effect setup: 3
```

---

## Cách `useEffect` tương đương với các lifecycle methods?

### Trả lời / Answer:

### Mapping giữa Class và Functional:

| Class Component                              | Functional Component                       |
| -------------------------------------------- | ------------------------------------------ |
| `componentDidMount`                          | `useEffect(() => {}, [])`                  |
| `componentDidUpdate`                         | `useEffect(() => {}, [deps])`              |
| `componentWillUnmount`                       | `useEffect(() => { return cleanup; }, [])` |
| `componentDidMount` + `componentDidUpdate`   | `useEffect(() => {}, [deps])`              |
| `componentDidMount` + `componentWillUnmount` | `useEffect(() => { return cleanup; }, [])` |

---

### Ví dụ thực tế / Practical Example:

```jsx
// Class Component
class UserProfile extends React.Component {
  state = { user: null, loading: true };

  componentDidMount() {
    this.fetchUser(this.props.userId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser(this.props.userId);
    }
  }

  componentWillUnmount() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  async fetchUser(userId) {
    this.abortController = new AbortController();
    this.setState({ loading: true });

    try {
      const response = await fetch(`/api/users/${userId}`, {
        signal: this.abortController.signal,
      });
      const user = await response.json();
      this.setState({ user, loading: false });
    } catch (error) {
      if (error.name !== "AbortError") {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    const { user, loading } = this.state;
    if (loading) return <Spinner />;
    return <div>{user?.name}</div>;
  }
}
```

```jsx
// Functional Component
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // componentDidMount + componentDidUpdate
    const abortController = new AbortController();

    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`, {
          signal: abortController.signal,
        });
        const user = await response.json();
        setUser(user);
        setLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          setLoading(false);
        }
      }
    }

    fetchUser();

    // componentWillUnmount
    return () => {
      abortController.abort();
    };
  }, [userId]); // Chạy lại khi userId thay đổi

  if (loading) return <Spinner />;
  return <div>{user?.name}</div>;
}
```

---

### componentDidMount:

```jsx
// Class
class Example extends React.Component {
  componentDidMount() {
    console.log("Mounted");
    document.title = "App loaded";
  }
}

// Functional
function Example() {
  useEffect(() => {
    console.log("Mounted");
    document.title = "App loaded";
  }, []); // Empty array = chỉ chạy 1 lần
}
```

---

### componentDidUpdate:

```jsx
// Class
class Example extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.count !== this.props.count) {
      console.log("Count changed:", this.props.count);
    }
  }
}

// Functional
function Example({ count }) {
  useEffect(() => {
    console.log("Count changed:", count);
  }, [count]); // Chạy khi count thay đổi
}
```

---

### componentWillUnmount:

```jsx
// Class
class Example extends React.Component {
  componentDidMount() {
    this.intervalId = setInterval(() => {}, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
}

// Functional
function Example() {
  useEffect(() => {
    const intervalId = setInterval(() => {}, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
}
```

---

### Combined lifecycle:

```jsx
// Class
class Example extends React.Component {
  componentDidMount() {
    this.setup();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.cleanup();
      this.setup();
    }
  }

  componentWillUnmount() {
    this.cleanup();
  }

  setup() {
    console.log("Setup:", this.props.id);
  }

  cleanup() {
    console.log("Cleanup:", this.props.id);
  }
}

// Functional - Tất cả trong một useEffect
function Example({ id }) {
  useEffect(() => {
    // componentDidMount + componentDidUpdate
    console.log("Setup:", id);

    // componentWillUnmount
    return () => {
      console.log("Cleanup:", id);
    };
  }, [id]);
}
```

---

## Effect cleanup trong Strict Mode?

### Trả lời / Answer:

**Strict Mode** trong React Development chạy effect 2 lần để giúp phát hiện các vấn đề với cleanup.

### Tại sao Strict Mode chạy 2 lần?

1. **Detect cleanup issues:**
   - Kiểm tra xem cleanup có được implement đúng không
   - Phát hiện memory leaks

2. **Simulate mount-unmount-mount:**
   - Mô phỏng người dùng rời đi và quay lại
   - Đảm bảo component hoạt động đúng

---

### Thứ tự chạy trong Strict Mode:

```jsx
function StrictModeExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect setup");
    return () => {
      console.log("Effect cleanup");
    };
  }, [count]);

  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}

// Development (Strict Mode):
// Effect setup
// Effect cleanup
// Effect setup
// (component mounted)

// Khi click:
// Effect cleanup
// Effect setup
// Effect cleanup
// Effect setup

// Production:
// Effect setup
// (component mounted)

// Khi click:
// Effect cleanup
// Effect setup
```

---

### Ví dụ thực tế / Practical Example:

```jsx
// ❌ Sai - Không cleanup đúng
function BadExample() {
  useEffect(() => {
    const ws = new WebSocket("wss://example.com");
    ws.onmessage = (e) => console.log(e.data);
    // Quên cleanup!
  }, []);
}
```

```jsx
// ✅ Đúng - Có cleanup
function GoodExample() {
  useEffect(() => {
    const ws = new WebSocket("wss://example.com");
    ws.onmessage = (e) => console.log(e.data);

    return () => {
      ws.close();
    };
  }, []);
}
```

---

### Demo Strict Mode behavior:

```jsx
function StrictModeDemo() {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("1. Fetching data...");

    const controller = new AbortController();

    fetch("/api/data", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        console.log("2. Data received:", data);
        setData(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("3. Fetch error:", err);
        }
      });

    return () => {
      console.log("4. Aborting fetch");
      controller.abort();
    };
  }, []);

  return <div>{data}</div>;
}

// Development (Strict Mode) output:
// 1. Fetching data...
// 4. Aborting fetch
// 1. Fetching data...
// 2. Data received: {...}
```

---

### Best practices cho Strict Mode:

1. **Luôn cleanup side effects:**
   - Event listeners
   - Intervals
   - WebSockets
   - Subscriptions

2. **Handle abort errors:**

   ```jsx
   useEffect(() => {
     const controller = new AbortController();

     fetch(url, { signal: controller.signal }).catch((err) => {
       if (err.name !== "AbortError") {
         // Handle real errors
       }
     });

     return () => controller.abort();
   }, []);
   ```

3. **Không có side effects trong render:**

   ```jsx
   // ❌ Sai
   function Bad() {
     fetch("/api"); // Side effect in render!
     return <div>...</div>;
   }

   // ✅ Đúng
   function Good() {
     useEffect(() => {
       fetch("/api");
     }, []);
     return <div>...</div>;
   }
   ```

---

## Infinite loops trong `useEffect`? Cách tránh?

### Trả lời / Answer:

**Infinite loops** xảy ra khi effect cập nhật state, gây re-render, lại chạy effect, cập nhật state, v.v.

### Nguyên nhân phổ biến:

1. **Missing dependency:**
   - Effect dùng state/props nhưng không có trong dependency array

2. **Updating dependency:**
   - Effect cập nhật giá trị có trong dependency array

3. **Object/Array references:**
   - Object/array mới mỗi render

---

### Ví dụ thực tế / Practical Example:

```jsx
// ❌ Sai - Infinite loop
function InfiniteLoop1() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1); // Cập nhật count
  }, []); // count không có trong deps, nhưng vẫn gây loop
}
```

```jsx
// ❌ Sai - Infinite loop với dependency
function InfiniteLoop2() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1); // Cập nhật count
  }, [count]); // count trong deps → effect chạy lại → cập nhật count → loop
}
```

```jsx
// ✅ Đúng - Functional update
function CorrectExample1() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount((c) => c + 1); // Functional update
  }, []); // Không cần count trong deps
}
```

```jsx
// ❌ Sai - Object reference
function InfiniteLoop3() {
  const [config, setConfig] = useState({ enabled: true });

  useEffect(() => {
    console.log("Config changed");
  }, [config]); // config là object mới mỗi render → loop
}
```

```jsx
// ✅ Đúng - Dùng useMemo
function CorrectExample2() {
  const [enabled, setEnabled] = useState(true);

  const config = useMemo(() => ({ enabled }), [enabled]);

  useEffect(() => {
    console.log("Config changed");
  }, [config]);
}
```

---

### Các trường hợp phổ biến:

```jsx
// 1. Fetching data khi có dependency
function FetchLoop({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [userId]); // ✅ Đúng - chỉ fetch khi userId thay đổi
}
```

```jsx
// 2. Updating derived state
function DerivedState({ items }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(items.reduce((sum, item) => sum + item.price, 0));
  }, [items]); // ✅ Đúng - derived state từ props

  // Hoặc tốt hơn: tính toán trực tiếp
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items],
  );
}
```

```jsx
// 3. Object/Array trong dependency
function ObjectDependency() {
  const [filters, setFilters] = useState({});

  // ❌ Sai - filters là object mới mỗi render
  useEffect(() => {
    fetchData(filters);
  }, [filters]);

  // ✅ Đúng - Dùng useMemo
  const memoizedFilters = useMemo(() => filters, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchData(memoizedFilters);
  }, [memoizedFilters]);
}
```

```jsx
// 4. Function trong dependency
function FunctionDependency() {
  const [count, setCount] = useState(0);

  // ❌ Sai - handleClick là function mới mỗi render
  const handleClick = () => {
    console.log("Clicked");
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [handleClick]); // Loop!

  // ✅ Đúng - Dùng useCallback
  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [handleClick]);
}
```

---

### Checklist tránh infinite loops:

1. ✅ **Dependency array đầy đủ:**
   - Tất cả state/props dùng trong effect

2. ✅ **Functional update khi cần:**
   - Khi update dựa trên previous state

3. ✅ **useMemo cho objects/arrays:**
   - Khi object/array trong dependency

4. ✅ **useCallback cho functions:**
   - Khi function trong dependency

5. ✅ **Không update dependency:**
   - Effect không nên update giá trị trong deps

6. ✅ **Dùng ESLint react-hooks/exhaustive-deps:**
   - Tự động phát hiện missing dependencies

---

## `useEffect` vs `useLayoutEffect` vs `useInsertionEffect`?

### Trả lời / Answer:

### So sánh chi tiết:

| Hook                 | Thời điểm chạy | Use case                       | Chặn rendering |
| -------------------- | -------------- | ------------------------------ | -------------- |
| `useEffect`          | Sau paint      | Async operations, API calls    | Không          |
| `useLayoutEffect`    | Trước paint    | DOM measurements, sync updates | Có             |
| `useInsertionEffect` | Trước layout   | CSS-in-JS libraries            | Có             |

---

### Thứ tự chạy:

```
Component renders
  ↓
useInsertionEffect (chạy đầu tiên)
  ↓
useLayoutEffect
  ↓
Browser paints
  ↓
useEffect
```

---

### Ví dụ thực tế / Practical Example:

```jsx
// useEffect - Dùng cho async operations
function DataFetching({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Chạy sau khi UI đã hiển thị
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then(setUser);
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

```jsx
// useLayoutEffect - Dùng cho DOM measurements
function Tooltip({ children, position }) {
  const tooltipRef = useRef(null);
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  useLayoutEffect(() => {
    // Chạy trước khi paint để tránh layout shift
    const tooltip = tooltipRef.current;
    if (!tooltip) return;

    const rect = tooltip.getBoundingClientRect();
    const { innerWidth, innerHeight } = window;

    let newPosition = { ...position };

    if (rect.right > innerWidth) {
      newPosition.x = innerWidth - rect.width - 10;
    }
    if (rect.bottom > innerHeight) {
      newPosition.y = innerHeight - rect.height - 10;
    }

    setAdjustedPosition(newPosition);
  }, [position]);

  return (
    <div
      ref={tooltipRef}
      style={{
        position: "absolute",
        left: adjustedPosition.x,
        top: adjustedPosition.y,
      }}
    >
      {children}
    </div>
  );
}
```

```jsx
// useInsertionEffect - Dùng cho CSS-in-JS
function useStyle(css) {
  useInsertionEffect(() => {
    // Chạy trước tất cả effect khác
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [css]);
}

function StyledComponent() {
  useStyle(`
    .styled {
      color: red;
      font-weight: bold;
    }
  `);

  return <div className="styled">Styled text</div>;
}
```

---

### Demo timing:

```jsx
function TimingDemo() {
  const [count, setCount] = useState(0);

  useInsertionEffect(() => {
    console.log("1. useInsertionEffect");
    return () => console.log("1. Cleanup useInsertionEffect");
  }, []);

  useLayoutEffect(() => {
    console.log("2. useLayoutEffect");
    return () => console.log("2. Cleanup useLayoutEffect");
  }, []);

  useEffect(() => {
    console.log("3. useEffect");
    return () => console.log("3. Cleanup useEffect");
  }, []);

  console.log("0. Component render");

  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}

// Output:
// 0. Component render
// 1. useInsertionEffect
// 2. useLayoutEffect
// (Browser paints)
// 3. useEffect
```

---

### Khi nào dùng hook nào?

```jsx
// ✅ useEffect - Mặc định cho hầu hết các side effects
function DefaultUsage() {
  useEffect(() => {
    // API calls
    fetch('/api/data').then(...);

    // Subscriptions
    const sub = api.subscribe();
    return () => sub.unsubscribe();

    // Event listeners
    const handler = () => {};
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);

    // Logging
    analytics.track('page_view');
  }, []);
}
```

```jsx
// ✅ useLayoutEffect - Khi cần đọc DOM ngay lập tức
function DOMMeasurement() {
  const ref = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  return (
    <div ref={ref}>
      {dimensions.width}x{dimensions.height}
    </div>
  );
}
```

```jsx
// ✅ useInsertionEffect - Khi cần inject styles trước render
function CSSInjection({ css }) {
  useInsertionEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, [css]);

  return null; // Không render gì cả
}
```

---

### SSR considerations:

```jsx
// ❌ useLayoutEffect warning trong SSR
function SSRWarning() {
  useLayoutEffect(() => {
    console.log("This will warn in SSR");
  }, []);
}

// ✅ Solution: Check if browser
function SSRSafe() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  useLayoutEffect(() => {
    console.log("Safe in SSR");
  }, []);

  return <div>Content</div>;
}

// ✅ Hoặc dùng useIsomorphicLayoutEffect
import { useLayoutEffect } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function SSRSafe2() {
  useIsomorphicLayoutEffect(() => {
    console.log("Safe in SSR");
  }, []);

  return <div>Content</div>;
}
```
