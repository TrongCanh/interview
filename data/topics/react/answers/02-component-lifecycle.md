# 2. Component Lifecycle / Vòng đời Component

## Lifecycle methods trong class components?

### Trả lời / Answer:

**Lifecycle methods** là các phương thức đặc biệt trong class components cho phép bạn thực hiện các hành động tại các thời điểm cụ thể trong vòng đời của component.

### Các Phases / Giai đoạn:

1. **Mounting Phase / Giai đoạn gắn kết:**
   - Khi component được tạo và chèn vào DOM

2. **Updating Phase / Giai đoạn cập nhật:**
   - Khi props hoặc state thay đổi

3. **Unmounting Phase / Giai đoạn tháo gỡ:**
   - Khi component bị xóa khỏi DOM

4. **Error Handling Phase / Giai đoạn xử lý lỗi:**
   - Khi có lỗi xảy ra trong component hoặc component con

---

### Mounting Phase / Giai đoạn gắn kết

```jsx
class MyComponent extends React.Component {
  // 1. Constructor - Chạy đầu tiên
  constructor(props) {
    super(props);
    // Khởi tạo state
    this.state = { count: 0 };
    // Bind methods
    this.handleClick = this.handleClick.bind(this);
  }

  // 2. static getDerivedStateFromProps - Rất hiếm dùng
  static getDerivedStateFromProps(props, state) {
    // Trả về state mới dựa trên props
    // Hoặc trả về null để không thay đổi state
    return null;
  }

  // 3. render - Bắt buộc có
  render() {
    return <div>{this.state.count}</div>;
  }

  // 4. componentDidMount - Chạy sau khi render xong
  componentDidMount() {
    // Tốt cho: API calls, subscriptions, DOM manipulation
    console.log("Component mounted!");
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => this.setState({ data }));
  }
}
```

---

### Updating Phase / Giai đoạn cập nhật

```jsx
class MyComponent extends React.Component {
  // 1. static getDerivedStateFromProps
  static getDerivedStateFromProps(props, state) {
    // Chạy trước mỗi lần render (kể cả lần đầu)
    return null;
  }

  // 2. shouldComponentUpdate - Tối ưu hiệu suất
  shouldComponentUpdate(nextProps, nextState) {
    // Trả về true/false để quyết định có render lại không
    // Mặc định: true
    return nextProps.id !== this.props.id;
  }

  // 3. getSnapshotBeforeUpdate - Rất hiếm dùng
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Chạy ngay trước khi DOM cập nhật
    // Giá trị trả về sẽ được truyền cho componentDidUpdate
    return null;
  }

  // 4. render - Bắt buộc có

  // 5. componentDidUpdate - Chạy sau khi render xong
  componentDidUpdate(prevProps, prevState, snapshot) {
    // Tốt cho: API calls khi props thay đổi,
    // DOM manipulation sau update
    if (prevProps.id !== this.props.id) {
      this.fetchData(this.props.id);
    }
  }
}
```

---

### Unmounting Phase / Giai đoạn tháo gỡ

```jsx
class MyComponent extends React.Component {
  componentDidMount() {
    // Tạo subscription
    this.subscription = someAPI.subscribe();
    // Tạo interval
    this.intervalId = setInterval(() => {
      console.log("Tick");
    }, 1000);
  }

  // componentWillUnmount - Chạy trước khi component bị xóa
  componentWillUnmount() {
    // Quan trọng: Cleanup để tránh memory leaks
    // Hủy subscriptions
    this.subscription.unsubscribe();
    // Xóa intervals
    clearInterval(this.intervalId);
    // Hủy requests
    if (this.abortController) {
      this.abortController.abort();
    }
  }
}
```

---

### Error Handling Phase / Giai đoạn xử lý lỗi

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Chạy khi có lỗi trong component con
  static getDerivedStateFromError(error) {
    // Cập nhật state để hiển thị fallback UI
    return { hasError: true };
  }

  // Chạy khi có lỗi, nhận error và info
  componentDidCatch(error, errorInfo) {
    // Log lỗi
    console.error("Error caught:", error, errorInfo);
    // Gửi đến error tracking service
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

---

### Ví dụ thực tế / Practical Example:

```jsx
// Component hoàn chỉnh với tất cả lifecycle methods
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      error: null,
    };
    this.abortController = null;
  }

  static getDerivedStateFromProps(props, state) {
    // Cập nhật state khi props thay đổi
    if (props.userId !== state.userId) {
      return { userId: props.userId, loading: true };
    }
    return null;
  }

  componentDidMount() {
    this.fetchUser(this.props.userId);
    this.setupKeyboardShortcuts();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Chỉ render lại khi thực sự cần thiết
    return (
      nextProps.userId !== this.props.userId ||
      nextState.user !== this.state.user ||
      nextState.loading !== this.state.loading
    );
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Lưu vị trí scroll trước khi update
    if (this.state.user !== prevState.user) {
      return window.scrollY;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Khôi phục vị trí scroll
    if (snapshot !== null) {
      window.scrollTo(0, snapshot);
    }

    // Fetch user mới khi props thay đổi
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser(this.props.userId);
    }
  }

  componentWillUnmount() {
    // Cleanup
    if (this.abortController) {
      this.abortController.abort();
    }
    this.removeKeyboardShortcuts();
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    logError(error, errorInfo);
  }

  async fetchUser(userId) {
    this.abortController = new AbortController();

    try {
      const response = await fetch(`/api/users/${userId}`, {
        signal: this.abortController.signal,
      });
      const user = await response.json();
      this.setState({ user, loading: false });
    } catch (error) {
      if (error.name !== "AbortError") {
        this.setState({ error, loading: false });
      }
    }
  }

  render() {
    const { user, loading, error } = this.state;

    if (error) {
      return <ErrorDisplay error={error} />;
    }

    if (loading) {
      return <Spinner />;
    }

    return (
      <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
    );
  }
}
```

---

## Lifecycle trong functional components (useEffect)?

### Trả lời / Answer:

Trong functional components, lifecycle methods được thay thế bằng **Hooks**, đặc biệt là `useEffect`.

### Mapping giữa Class và Functional:

| Class Component            | Functional Component                       |
| -------------------------- | ------------------------------------------ |
| `componentDidMount`        | `useEffect(() => {}, [])`                  |
| `componentDidUpdate`       | `useEffect(() => {}, [deps])`              |
| `componentWillUnmount`     | `useEffect(() => { return cleanup; }, [])` |
| `shouldComponentUpdate`    | `React.memo`, `useMemo`, `useCallback`     |
| `getDerivedStateFromProps` | `useState` với derived state               |

---

### useEffect cho componentDidMount

```jsx
// Class Component
class MyComponent extends React.Component {
  componentDidMount() {
    console.log("Mounted!");
    fetch("/api/data").then((res) => res.json());
  }
}

// Functional Component
function MyComponent() {
  useEffect(() => {
    console.log("Mounted!");
    fetch("/api/data").then((res) => res.json());
  }, []); // Empty dependency array = chỉ chạy 1 lần
}
```

---

### useEffect cho componentDidUpdate

```jsx
// Class Component
class MyComponent extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser(this.props.userId);
    }
  }
}

// Functional Component
function MyComponent({ userId }) {
  useEffect(() => {
    fetchUser(userId);
  }, [userId]); // Chạy khi userId thay đổi
}
```

---

### useEffect cho componentWillUnmount

```jsx
// Class Component
class MyComponent extends React.Component {
  componentDidMount() {
    this.intervalId = setInterval(() => {}, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
}

// Functional Component
function MyComponent() {
  useEffect(() => {
    const intervalId = setInterval(() => {}, 1000);

    // Cleanup function = componentWillUnmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);
}
```

---

### Combined Effect (Mount + Update + Unmount)

```jsx
// Class Component
class MyComponent extends React.Component {
  componentDidMount() {
    this.subscribe();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.channel !== this.props.channel) {
      this.unsubscribe();
      this.subscribe();
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  subscribe() {
    this.subscription = api.subscribe(this.props.channel);
  }

  unsubscribe() {
    this.subscription?.unsubscribe();
  }
}

// Functional Component - Tất cả trong một useEffect
function MyComponent({ channel }) {
  useEffect(() => {
    // componentDidMount + componentDidUpdate
    const subscription = api.subscribe(channel);

    // componentWillUnmount
    return () => {
      subscription.unsubscribe();
    };
  }, [channel]);
}
```

---

### Ví dụ thực tế / Practical Example:

```jsx
// Real-world example: WebSocket connection
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Connect to WebSocket khi mount hoặc roomId thay đổi
    const ws = new WebSocket(`wss://chat.example.com/rooms/${roomId}`);

    // Handle incoming messages
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    // Cleanup khi unmount hoặc roomId thay đổi
    return () => {
      ws.close();
    };
  }, [roomId]);

  // Separate effect for scroll to bottom
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>{msg.text}</div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
```

---

## Khi nào nên dùng `useLayoutEffect` vs `useEffect`?

### Trả lời / Answer:

### useEffect

- **Chạy sau khi commit** (sau khi UI đã được cập nhật lên màn hình)
- **Không chặn rendering**
- **Dùng cho hầu hết các side effects**
- Tốt cho: API calls, subscriptions, logging, analytics

### useLayoutEffect

- **Chạy sau khi render nhưng trước khi commit** (trước khi UI hiển thị)
- **Chặn rendering** (blocks paint)
- **Dùng cho các effect cần đọc/ghi DOM đồng bộ**
- Tốt cho: DOM measurements, animations, scroll position

---

### So sánh chi tiết:

| Đặc điểm       | useEffect        | useLayoutEffect  |
| -------------- | ---------------- | ---------------- |
| Thời điểm chạy | Sau khi paint    | Trước khi paint  |
| Chặn rendering | Không            | Có               |
| Hiệu năng      | Tốt hơn          | Có thể ảnh hưởng |
| Use case       | Async operations | DOM measurements |
| Mặc định       | ✅               | ❌               |

---

### Ví dụ useEffect (thường dùng):

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // ✅ Dùng useEffect cho API calls
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then(setUser);
  }, [userId]);

  // ✅ Dùng useEffect cho subscriptions
  useEffect(() => {
    const subscription = api.subscribe(userId);
    return () => subscription.unsubscribe();
  }, [userId]);

  // ✅ Dùng useEffect cho logging
  useEffect(() => {
    analytics.track("page_view", { userId });
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

---

### Ví dụ useLayoutEffect (DOM measurements):

```jsx
function Tooltip({ children, position }) {
  const tooltipRef = useRef(null);
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  // ✅ Dùng useLayoutEffect khi cần đọc DOM ngay lập tức
  useLayoutEffect(() => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;

    const rect = tooltip.getBoundingClientRect();
    const { innerWidth, innerHeight } = window;

    // Điều chỉnh vị trí nếu tooltip vượt ra khỏi màn hình
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

---

### Ví dụ useLayoutEffect (Animations):

```jsx
function AnimatedModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;

    // Đọc kích thước modal trước khi hiển thị
    const { width, height } = modal.getBoundingClientRect();

    // Set initial state cho animation
    modal.style.opacity = "0";
    modal.style.transform = "scale(0.8)";

    // Trigger reflow
    modal.offsetHeight;

    // Animate
    modal.style.transition = "all 0.3s ease-out";
    modal.style.opacity = "1";
    modal.style.transform = "scale(1)";

    return () => {
      modal.style.opacity = "0";
      modal.style.transform = "scale(0.8)";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className="modal">
      <button onClick={onClose}>Close</button>
    </div>
  );
}
```

---

### Quy tắc chọn:

1. **Dùng `useEffect` mặc định:**
   - API calls
   - Subscriptions
   - Logging
   - Analytics
   - Async operations

2. **Dùng `useLayoutEffect` khi:**
   - Cần đọc DOM ngay lập tức (getBoundingClientRect, offsetHeight, v.v.)
   - Cần thay đổi DOM trước khi hiển thị
   - Cần prevent layout shifts
   - Animations cần sync với paint

3. **Lưu ý:**
   - `useLayoutEffect` có thể gây performance issues nếu lạm dụng
   - Trong SSR, `useLayoutEffect` sẽ warning (dùng `useEffect` hoặc check `useIsomorphicLayoutEffect`)

---

## `useInsertionEffect` là gì? Khi nào dùng?

### Trả lời / Answer:

**`useInsertionEffect`** là một hook đặc biệt được giới thiệu trong React 18, chủ yếu dành cho các thư viện CSS-in-JS.

### Đặc điểm:

- **Chạy trước các effect khác** (trước cả `useLayoutEffect`)
- **Chạy trong cùng phase với DOM mutation**
- **Không có quyền truy cập refs** (refs chưa được gán)
- **Được thiết kế cho CSS-in-JS libraries**

---

### Thứ tự chạy:

```
Render Phase
  ↓
Commit Phase
  ↓
useInsertionEffect ← Chạy đầu tiên
  ↓
useLayoutEffect
  ↓
Browser Paint
  ↓
useEffect
```

---

### Khi nào dùng `useInsertionEffect`?

1. **CSS-in-JS libraries:**
   - Inject styles vào DOM
   - Đảm bảo styles được áp dụng trước khi render

2. **Không dùng cho:**
   - API calls
   - Subscriptions
   - DOM measurements
   - User interactions

---

### Ví dụ thực tế / Practical Example:

```jsx
// Ví dụ: CSS-in-JS library đơn giản
import { useInsertionEffect } from "react";

// Cache styles để tránh inject trùng lặp
const styleCache = new Map();

function useStyle(css) {
  useInsertionEffect(() => {
    // Tạo style element
    const style = document.createElement("style");
    style.textContent = css;

    // Inject vào head
    document.head.appendChild(style);

    // Cleanup
    return () => {
      document.head.removeChild(style);
    };
  }, [css]);
}

// Sử dụng trong component
function Button({ variant = "primary" }) {
  const styles = {
    primary: `
      .btn-primary {
        background: blue;
        color: white;
        padding: 10px 20px;
      }
    `,
    secondary: `
      .btn-secondary {
        background: gray;
        color: white;
        padding: 10px 20px;
      }
    `,
  };

  useStyle(styles[variant]);

  return <button className={`btn-${variant}`}>Click me</button>;
}
```

---

### So sánh với các effect khác:

```jsx
function ComparisonExample() {
  const ref = useRef(null);

  // ❌ useInsertionEffect - Không có quyền truy cập refs
  useInsertionEffect(() => {
    console.log(ref.current); // undefined!
  }, []);

  // ✅ useLayoutEffect - Có quyền truy cập refs
  useLayoutEffect(() => {
    console.log(ref.current); // DOM element
  }, []);

  // ✅ useEffect - Có quyền truy cập refs
  useEffect(() => {
    console.log(ref.current); // DOM element
  }, []);

  return <div ref={ref}>Example</div>;
}
```

---

### Use case thực tế:

```jsx
// Ví dụ: Dynamic CSS variables
function useCSSVariables(variables) {
  useInsertionEffect(() => {
    const root = document.documentElement;

    // Set CSS variables
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Cleanup
    const previousValues = {};
    Object.keys(variables).forEach((key) => {
      previousValues[key] = root.style.getPropertyValue(`--${key}`);
    });

    return () => {
      Object.entries(previousValues).forEach(([key, value]) => {
        if (value) {
          root.style.setProperty(`--${key}`, value);
        } else {
          root.style.removeProperty(`--${key}`);
        }
      });
    };
  }, [variables]);
}

// Sử dụng
function ThemeProvider({ theme }) {
  useCSSVariables({
    "primary-color": theme.primary,
    "secondary-color": theme.secondary,
    "text-color": theme.text,
  });

  return <>{children}</>;
}
```

---

## Phases của component lifecycle (Mounting, Updating, Unmounting, Error Handling)?

### Trả lời / Answer:

### 1. Mounting Phase / Giai đoạn gắn kết

Khi component được tạo và chèn vào DOM lần đầu tiên.

**Class Components:**

```
constructor()
  ↓
static getDerivedStateFromProps()
  ↓
render()
  ↓
componentDidMount()
```

**Functional Components:**

```
Component function runs
  ↓
useInsertionEffect() (if any)
  ↓
useLayoutEffect() (if any)
  ↓
Browser paints
  ↓
useEffect() (if any)
```

---

### 2. Updating Phase / Giai đoạn cập nhật

Khi props hoặc state thay đổi.

**Class Components:**

```
static getDerivedStateFromProps()
  ↓
shouldComponentUpdate() (optional)
  ↓
render()
  ↓
getSnapshotBeforeUpdate() (optional)
  ↓
componentDidUpdate()
```

**Functional Components:**

```
Component function runs
  ↓
useInsertionEffect() (if dependencies changed)
  ↓
useLayoutEffect() (if dependencies changed)
  ↓
Browser paints
  ↓
useEffect() (if dependencies changed)
```

---

### 3. Unmounting Phase / Giai đoạn tháo gỡ

Khi component bị xóa khỏi DOM.

**Class Components:**

```
componentWillUnmount()
```

**Functional Components:**

```
Cleanup functions from:
  - useInsertionEffect()
  - useLayoutEffect()
  - useEffect()
```

---

### 4. Error Handling Phase / Giai đoạn xử lý lỗi

Khi có lỗi xảy ra trong rendering hoặc lifecycle methods.

**Class Components:**

```
static getDerivedStateFromError()
  ↓
componentDidCatch()
```

**Functional Components:**

```
Error Boundary (Class Component) catches error
```

---

### Diagram tổng quan:

```
┌─────────────────────────────────────────────────────────────┐
│                    MOUNTING PHASE                            │
├─────────────────────────────────────────────────────────────┤
│  constructor() → getDerivedStateFromProps() → render()     │
│  → useInsertionEffect() → useLayoutEffect() → Paint        │
│  → useEffect()                                              │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    (Props/State change)
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   UPDATING PHASE                             │
├─────────────────────────────────────────────────────────────┤
│  getDerivedStateFromProps() → shouldComponentUpdate()       │
│  → render() → getSnapshotBeforeUpdate()                     │
│  → useInsertionEffect() → useLayoutEffect() → Paint        │
│  → useEffect()                                              │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    (Component removed)
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  UNMOUNTING PHASE                           │
├─────────────────────────────────────────────────────────────┤
│  componentWillUnmount() / Cleanup functions                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    (Error occurs)
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                ERROR HANDLING PHASE                          │
├─────────────────────────────────────────────────────────────┤
│  getDerivedStateFromError() → componentDidCatch()           │
└─────────────────────────────────────────────────────────────┘
```

---

### Ví dụ thực tế / Practical Example:

```jsx
// Component đầy đủ với tất cả phases
function LifecycleDemo({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  // MOUNTING + UPDATING + UNMOUNTING
  useEffect(() => {
    // MOUNTING: Chạy lần đầu khi component mount
    console.log("Effect: Component mounted or userId changed");

    // Tạo AbortController
    abortControllerRef.current = new AbortController();

    // Fetch data
    async function fetchUser() {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          signal: abortControllerRef.current.signal,
        });
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
          setLoading(false);
        }
      }
    }

    fetchUser();

    // UNMOUNTING: Cleanup khi component unmount
    return () => {
      console.log("Effect: Component will unmount or userId will change");
      abortControllerRef.current?.abort();
    };
  }, [userId]); // UPDATING: Chạy lại khi userId thay đổi

  // MOUNTING: Setup event listener
  useEffect(() => {
    function handleVisibilityChange() {
      console.log("Visibility changed:", document.hidden);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // UNMOUNTING: Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // useLayoutEffect cho DOM measurements
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    // Chạy trước khi paint
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, [user]); // UPDATING: Chạy lại khi user thay đổi

  // ERROR HANDLING: Error boundary sẽ bắt lỗi này
  if (error) {
    throw error; // Thường dùng với Error Boundary
  }

  // MOUNTING: Render lần đầu
  // UPDATING: Re-render khi state thay đổi
  return (
    <div ref={containerRef}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>{user?.name}</h1>
          <p>
            Dimensions: {dimensions.width}x{dimensions.height}
          </p>
        </>
      )}
    </div>
  );
}

// Error Boundary wrapper
function App() {
  return (
    <ErrorBoundary>
      <LifecycleDemo userId={1} />
    </ErrorBoundary>
  );
}
```

---

### Timing Diagram:

```jsx
// Log sequence khi component mount
function TimingDemo() {
  console.log("1. Component function runs");

  useEffect(() => {
    console.log("3. useEffect runs (after paint)");
    return () => console.log("5. Cleanup runs");
  }, []);

  useLayoutEffect(() => {
    console.log("2. useLayoutEffect runs (before paint)");
    return () => console.log("4. Cleanup runs");
  }, []);

  return <div>Timing Demo</div>;
}

// Output khi mount:
// 1. Component function runs
// 2. useLayoutEffect runs (before paint)
// 3. useEffect runs (after paint)

// Output khi unmount:
// 4. Cleanup runs (useLayoutEffect)
// 5. Cleanup runs (useEffect)
```
