# 9. useRef - Advanced / useRef - Đào sâu

## `useRef` khác với `createRef` như thế nào?

### Trả lời / Answer:

### `useRef`:

- **Hook cho functional components**
- **Giữ giá trị qua các re-renders**
- **Giữ cùng reference giữa renders**
- **Có thể dùng để lưu bất kỳ giá trị mutable**

### `createRef`:

- **Dùng trong class components**
- **Tạo reference mới mỗi render**
- **Không giữ giá trị giữa renders trong functional components**

---

### So sánh:

| Đặc điểm    | useRef                | createRef             |
| ----------- | --------------------- | --------------------- |
| Dùng trong  | Functional components | Class components      |
| Giữ giá trị | Có, qua renders       | Không, mới mỗi render |
| Mutable     | Có                    | Có                    |
| Hook        | Có                    | Không                 |

---

### Ví dụ thực tế / Practical Example:

```jsx
// useRef trong functional component
function FunctionalComponent() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus</button>
    </div>
  );
}
```

```jsx
// createRef trong class component
class ClassComponent extends React.Component {
  inputRef = React.createRef();

  handleClick = () => {
    this.inputRef.current.focus();
  };

  render() {
    return (
      <div>
        <input ref={this.inputRef} />
        <button onClick={this.handleClick}>Focus</button>
      </div>
    );
  }
}
```

---

### Ví dụ sai với createRef trong functional component:

```jsx
// ❌ Sai - createRef tạo reference mới mỗi render
function BadComponent() {
  const inputRef = React.createRef(); // Mỗi render = ref mới!

  const handleClick = () => {
    console.log(inputRef.current); // Luôn là null!
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus</button>
    </div>
  );
}

// ✅ Đúng - useRef giữ reference qua renders
function GoodComponent() {
  const inputRef = useRef(null); // Giữ reference qua renders

  const handleClick = () => {
    console.log(inputRef.current); // Đúng giá trị!
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus</button>
    </div>
  );
}
```

---

## Use cases của `useRef`?

### Trả lời / Answer:

### 1. Accessing DOM elements

```jsx
function InputWithFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus khi mount
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} defaultValue="Auto-focused" />;
}
```

---

### 2. Storing previous values

```jsx
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
```

---

### 3. Storing mutable values without re-render

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

---

### 4. Storing values across renders

```jsx
function ComponentWithCallback() {
  const [count, setCount] = useState(0);
  const renderCountRef = useRef(0);

  renderCountRef.current += 1;

  return (
    <div>
      <p>Count: {count}</p>
      <p>Rendered: {renderCountRef.current} times</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
```

---

### 5. Accessing child component methods

```jsx
const ChildComponent = React.forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    focus: () => {
      console.log("Child focused");
    },
    getValue: () => {
      return "Child value";
    },
  }));

  return <div>Child Component</div>;
});

function ParentComponent() {
  const childRef = useRef(null);

  const handleFocus = () => {
    childRef.current?.focus();
  };

  const handleGetValue = () => {
    console.log(childRef.current?.getValue());
  };

  return (
    <div>
      <ChildComponent ref={childRef} />
      <button onClick={handleFocus}>Focus Child</button>
      <button onClick={handleGetValue}>Get Value</button>
    </div>
  );
}
```

---

## Accessing DOM elements?

### Trả lời / Answer:

**useRef** được dùng để truy cập trực tiếp vào DOM elements.

### Ví dụ thực tế / Practical Example:

```jsx
function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input khi component mount
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} placeholder="I'm auto-focused" />;
}
```

---

### Scroll to element:

```jsx
function ScrollToElement() {
  const targetRef = useRef(null);

  const scrollToTarget = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <button onClick={scrollToTarget}>Scroll to Target</button>
      <div style={{ height: "1000px" }}>Scroll down...</div>
      <div ref={targetRef} style={{ background: "yellow" }}>
        Target Element
      </div>
    </div>
  );
}
```

---

### Get element dimensions:

```jsx
function ElementDimensions() {
  const elementRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (elementRef.current) {
      const { width, height } = elementRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  return (
    <div>
      <div
        ref={elementRef}
        style={{ width: "200px", height: "100px", background: "lightblue" }}
      >
        Measured Element
      </div>
      <p>Width: {dimensions.width}px</p>
      <p>Height: {dimensions.height}px</p>
    </div>
  );
}
```

---

### Canvas access:

```jsx
function CanvasDrawing() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Draw something
    ctx.fillStyle = "red";
    ctx.fillRect(10, 10, 100, 100);
  }, []);

  return <canvas ref={canvasRef} width={200} height={200} />;
}
```

---

### Video player controls:

```jsx
function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <video ref={videoRef} width="400" controls src="video.mp4" />
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
}
```

---

## `useRef` để lưu giá trị không trigger re-render?

### Trả lời / Answer:

**useRef** lưu giá trị mutable không trigger re-render, khác với `useState`.

### So sánh:

| Đặc điểm            | useRef                | useState          |
| ------------------- | --------------------- | ----------------- |
| Mutable             | Có                    | Không             |
| Trigger re-render   | Không                 | Có                |
| Giá trị qua renders | Có                    | Có                |
| Update              | `ref.current = value` | `setValue(value)` |

---

### Ví dụ thực tế / Practical Example:

```jsx
// ❌ Sai - useState trigger re-render mỗi lần
function BadCounter() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  // renderCount update trigger re-render → infinite loop!
  setRenderCount((rc) => rc + 1);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Rendered: {renderCount} times</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
```

```jsx
// ✅ Đúng - useRef không trigger re-render
function GoodCounter() {
  const [count, setCount] = useState(0);
  const renderCountRef = useRef(0);

  // renderCountRef update KHÔNG trigger re-render
  renderCountRef.current += 1;

  return (
    <div>
      <p>Count: {count}</p>
      <p>Rendered: {renderCountRef.current} times</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
```

---

### Ví dụ với interval:

```jsx
function IntervalCounter() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    // Lưu interval ID trong ref
    intervalRef.current = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
  };

  const stop = () => {
    // Clear interval từ ref
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    return () => {
      // Cleanup khi unmount
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

---

### Ví dụ với async operation:

```jsx
function AsyncOperation() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);

  const fetchData = async () => {
    // Tạo AbortController mới
    abortControllerRef.current = new AbortController();

    setLoading(true);

    try {
      const response = await fetch("/api/data", {
        signal: abortControllerRef.current.signal,
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Fetch error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const cancelFetch = () => {
    // Abort request
    abortControllerRef.current?.abort();
  };

  useEffect(() => {
    return () => {
      // Cleanup khi unmount
      abortControllerRef.current?.abort();
    };
  }, []);

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
      </button>
      <button onClick={cancelFetch} disabled={!loading}>
        Cancel
      </button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
```

---

## `useRef` vs `useState` cho persisting values?

### Trả lời / Answer:

### Khi nào dùng `useRef`:

1. **Không cần re-render khi giá trị thay đổi**
2. **Cần truy cập giá trị trong callback**
3. **Lưu DOM references**
4. **Lưu interval/timeout IDs**

### Khi nào dùng `useState`:

1. **Cần re-render khi giá trị thay đổi**
2. **Giá trị hiển thị trong UI**
3. **Cần track giá trị qua renders**

---

### Ví dụ thực tế / Practical Example:

```jsx
// useState - Re-render khi giá trị thay đổi
function StateExample() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}

// useRef - KHÔNG re-render khi giá trị thay đổi
function RefExample() {
  const countRef = useRef(0);

  const increment = () => {
    countRef.current += 1;
    console.log("Count:", countRef.current);
    // UI không update!
  };

  return (
    <div>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

---

### Ví dụ với latest value in callback:

```jsx
function LatestValueInCallback() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  // Cập nhật ref khi count thay đổi
  useEffect(() => {
    countRef.current = count;
  }, [count]);

  const handleClick = () => {
    // Luôn có giá trị mới nhất
    console.log("Latest count:", countRef.current);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={handleClick}>Log Latest</button>
    </div>
  );
}
```

---

### Ví dụ với debounce:

```jsx
function DebouncedInput() {
  const [value, setValue] = useState("");
  const timeoutRef = useRef(null);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Clear timeout trước đó
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set timeout mới
    timeoutRef.current = setTimeout(() => {
      console.log("Debounced value:", newValue);
      // Gọi API với debounced value
    }, 500);
  };

  useEffect(() => {
    // Cleanup khi unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Type something..."
    />
  );
}
```

---

### Ví dụ với previous props:

```jsx
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

function ComponentWithPrevious({ userId }) {
  const [user, setUser] = useState(null);
  const prevUserId = usePrevious(userId);

  useEffect(() => {
    // Chỉ fetch khi userId thay đổi
    if (userId !== prevUserId) {
      fetchUser(userId).then(setUser);
    }
  }, [userId, prevUserId]);

  return <div>{user?.name}</div>;
}
```

---

### Ví dụ với tracking renders:

```jsx
function RenderTracker() {
  const [count, setCount] = useState(0);
  const renderCountRef = useRef(0);

  // Update ref mỗi render (không trigger re-render)
  renderCountRef.current += 1;

  return (
    <div>
      <p>State count: {count}</p>
      <p>Render count: {renderCountRef.current}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
```

---

### Ví dụ với storing instance variables:

```jsx
class ClassComponent extends React.Component {
  intervalId = null;

  componentDidMount() {
    this.intervalId = setInterval(() => {
      console.log("Tick");
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return <div>Class Component</div>;
  }
}

// Functional component equivalent với useRef
function FunctionalComponent() {
  const intervalIdRef = useRef(null);

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      console.log("Tick");
    }, 1000);

    return () => clearInterval(intervalIdRef.current);
  }, []);

  return <div>Functional Component</div>;
}
```
