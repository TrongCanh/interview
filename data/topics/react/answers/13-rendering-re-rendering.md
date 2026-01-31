# 13. Rendering & Re-rendering / Rendering & Re-rendering

## Khi nào component re-render?

### Trả lời / Answer:

### Các nguyên nhân gây re-render:

1. **State changes:**
   - Khi `setState` được gọi
   - Khi `useReducer` dispatch action

2. **Props changes:**
   - Khi props từ component cha thay đổi
   - Khi parent re-render

3. **Context changes:**
   - Khi context value thay đổi
   - Component dùng context sẽ re-render

4. **Parent re-renders:**
   - Khi parent re-render
   - Child cũng re-render (trừ khi memoized)

5. **Force update:**
   - Khi dùng `forceUpdate` (rare)

---

### Ví dụ thực tế / Practical Example:

```jsx
// 1. State change causes re-render
function StateExample() {
  const [count, setCount] = useState(0);

  console.log("Render:", count);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}

// Output khi click:
// Render: 0
// Render: 1
// Render: 2
```

```jsx
// 2. Props change causes re-render
function PropsExample({ name }) {
  console.log("Render:", name);

  return <p>Hello, {name}!</p>;
}

function Parent() {
  const [name, setName] = useState("React");

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <PropsExample name={name} />
    </div>
  );
}

// Khi input thay đổi:
// PropsExample re-render với name mới
```

```jsx
// 3. Context change causes re-render
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedComponent() {
  const { theme } = useContext(ThemeContext);

  console.log("Render with theme:", theme);

  return <div className={theme}>Themed</div>;
}

// Khi theme thay đổi:
// ThemedComponent re-render
```

---

## React.memo là gì?

### Trả lời / Answer:

**`React.memo`** là HOC (Higher-Order Component) để memoize component, chỉ re-render khi props thay đổi.

### Cú pháp:

```jsx
const MemoizedComponent = React.memo(function MyComponent(props) {
  // Component logic
});

// Hoặc với arrow function
const MemoizedComponent = React.memo(({ prop1, prop2 }) => {
  // Component logic
});
```

---

### Ví dụ thực tế / Practical Example:

```jsx
// ❌ Không memoized - Re-render mỗi lần parent render
function Child({ name }) {
  console.log("Child rendered:", name);

  return <p>Child: {name}</p>;
}

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("React");

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <Child name={name} />
    </div>
  );
}

// Khi click button (count thay đổi):
// Child re-render (không cần thiết vì name không đổi!)
```

```jsx
// ✅ Memoized - Chỉ re-render khi props thay đổi
const Child = React.memo(function Child({ name }) {
  console.log("Child rendered:", name);

  return <p>Child: {name}</p>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("React");

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <Child name={name} />
    </div>
  );
}

// Khi click button (count thay đổi):
// Child KHÔNG re-render (name không đổi!)
```

---

### React.memo với comparison function:

```jsx
// Custom comparison function
const Child = React.memo(
  function Child({ data }) {
    console.log("Child rendered");

    return <div>{JSON.stringify(data)}</div>;
  },
  (prevProps, nextProps) => {
    // Custom comparison logic
    return prevProps.data.id === nextProps.data.id;
  },
);

// Sử dụng
function Parent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState({ id: 1, name: "React" });

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <button onClick={() => setData({ ...data, name: "Updated" })}>
        Update Data
      </button>
      <Child data={data} />
    </div>
  );
}
```

---

## `React.memo` vs `useMemo`?

### Trả lời / Answer:

### So sánh chi tiết:

| Đặc điểm   | React.memo          | useMemo                    |
| ---------- | ------------------- | -------------------------- |
| Mục đích   | Memoize component   | Memoize giá trị            |
| Tránh gì   | Component re-render | Tính toán lặp              |
| Dùng cho   | Components          | Values, objects, functions |
| Cách dùng  | HOC                 | Hook                       |
| Comparison | Props comparison    | Dependency array           |

---

### Ví dụ thực tế / Practical Example:

```jsx
// React.memo - Memoize component
const ExpensiveChild = React.memo(function ExpensiveChild({ data }) {
  console.log("ExpensiveChild rendered");

  // Expensive rendering
  const chartData = data.map((item) => ({
    x: item.timestamp,
    y: item.value,
  }));

  return <Chart data={chartData} />;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <ExpensiveChild data={data} />
    </div>
  );
}

// Khi count thay đổi:
// ExpensiveChild KHÔNG re-render (data không đổi)
```

```jsx
// useMemo - Memoize giá trị
function Parent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  // Memoize expensive calculation
  const chartData = useMemo(() => {
    return data.map((item) => ({
      x: item.timestamp,
      y: item.value,
    }));
  }, [data]);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <Chart data={chartData} />
    </div>
  );
}

// Khi count thay đổi:
// chartData KHÔNG tính toán lại (data không đổi)
```

---

### Kết hợp cả hai:

```jsx
const ExpensiveChild = React.memo(function ExpensiveChild({ chartData }) {
  console.log("ExpensiveChild rendered");

  return <Chart data={chartData} />;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  // useMemo để tránh tính toán lại
  const chartData = useMemo(() => {
    return data.map((item) => ({
      x: item.timestamp,
      y: item.value,
    }));
  }, [data]);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <ExpensiveChild chartData={chartData} />
    </div>
  );
}

// Khi count thay đổi:
// chartData không tính toán lại (useMemo)
// ExpensiveChild không re-render (React.memo)
```

---

## Shallow comparison vs Deep comparison?

### Trả lời / Answer:

### Shallow Comparison (So sánh nông):

- So sánh reference của objects/arrays
- Không so sánh nội dung
- Nhanh hơn
- Default trong React

### Deep Comparison (So sánh sâu):

- So sánh nội dung của objects/arrays
- Đệ quy qua tất cả properties
- Chậm hơn
- Cần custom comparison function

---

### Ví dụ thực tế / Practical Example:

```jsx
// Shallow comparison (default trong React.memo)
const Child = React.memo(function Child({ data }) {
  console.log("Child rendered");

  return <div>{JSON.stringify(data)}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);

  // Object mới mỗi render
  const data = { id: 1, name: "React", timestamp: Date.now() };

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <Child data={data} />
    </div>
  );
}

// Khi count thay đổi:
// data là object mới → Child re-render (shallow comparison)
```

```jsx
// Deep comparison với custom function
const Child = React.memo(
  function Child({ data }) {
    console.log("Child rendered");

    return <div>{JSON.stringify(data)}</div>;
  },
  (prevProps, nextProps) => {
    // Deep comparison - chỉ so sánh id
    return prevProps.data.id === nextProps.data.id;
  },
);

function Parent() {
  const [count, setCount] = useState(0);

  // Object mới mỗi render
  const data = { id: 1, name: "React", timestamp: Date.now() };

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <Child data={data} />
    </div>
  );
}

// Khi count thay đổi:
// data là object mới NHƯNG id không đổi → Child KHÔNG re-render
```

---

### Ví dụ với deep comparison helper:

```jsx
// Helper function cho deep comparison
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

// Sử dụng với React.memo
const Child = React.memo(
  function Child({ data }) {
    console.log("Child rendered");

    return <div>{JSON.stringify(data)}</div>;
  },
  (prevProps, nextProps) => {
    return deepEqual(prevProps.data, nextProps.data);
  },
);
```

---

## Render phases (Render, Commit)?

### Trả lời / Answer:

### Render Phases:

1. **Render Phase:**
   - React chạy component functions
   - Tạo Virtual DOM
   - Tính toán changes

2. **Commit Phase:**
   - React cập nhật Real DOM
   - Hiển thị lên màn hình
   - Chạy cleanup functions

---

### Chi tiết Render Phase:

```
1. Component function chạy
2. Hooks được gọi (useState, useEffect, v.v.)
3. Tạo React elements
4. So sánh Virtual DOM (reconciliation)
5. Xác định changes cần thiết
```

---

### Chi tiết Commit Phase:

```
1. Cập nhật Real DOM
2. Chạy useLayoutEffect
3. Browser paints
4. Chạy useEffect
```

---

### Ví dụ thực tế / Practical Example:

```jsx
function Component() {
  const [count, setCount] = useState(0);

  console.log("1. Render Phase: Component function");

  useLayoutEffect(() => {
    console.log("2. Commit Phase: useLayoutEffect (before paint)");
  }, []);

  useEffect(() => {
    console.log("3. Commit Phase: useEffect (after paint)");
  }, []);

  const handleClick = () => {
    console.log("4. State update");
    setCount((c) => c + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

// Output khi click button:
// 4. State update
// 1. Render Phase: Component function
// 2. Commit Phase: useLayoutEffect (before paint)
// (Browser paints)
// 3. Commit Phase: useEffect (after paint)
```

---

### Flow chart:

```
User Action
  ↓
setState()
  ↓
Render Phase:
  - Run component function
  - Call hooks
  - Create Virtual DOM
  - Reconcile
  ↓
Commit Phase:
  - Update Real DOM
  - Run useLayoutEffect
  - Browser paints
  - Run useEffect
  ↓
User sees updated UI
```

---

## Fiber architecture là gì?

### Trả lời / Answer:

**Fiber** là kiến trúc mới của React (từ React 16) cho phép:

1. **Incremental Rendering:**
   - Render từng phần của UI
   - Có thể pause/resume

2. **Prioritization:**
   - Ưu tiên updates quan trọng
   - User interactions có ưu tiên cao

3. **Concurrency:**
   - Render nhiều updates song song
   - Hủy bỏ renders không cần thiết

4. **Better Error Handling:**
   - Error boundaries hoạt động tốt hơn
   - Có thể recover từ errors

---

### Fiber Node Structure:

```
Fiber Node:
  - type: Component type
  - key: Component key
  - props: Component props
  - state: Component state
  - effect: Effect list
  - return: Return value
  - sibling: Next sibling
  - child: First child
  - alternate: Previous work
```

---

### Ví dụ thực tế / Practical Example:

```jsx
// Fiber cho phép incremental rendering
function LargeList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fiber có thể render từng phần
    // Thay vì đợi tất cả data load
    const loadData = async () => {
      const data = await fetchLargeData();
      setItems(data);
    };

    loadData();
  }, []);

  return (
    <div>
      {items.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
}
```

---

### Fiber với Suspense:

```jsx
// Fiber + Suspense cho data fetching
function DataDisplay() {
  const data = use(fetchData());

  return (
    <div>
      <h1>Data: {data.name}</h1>
      <p>{data.description}</p>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataDisplay />
    </Suspense>
  );
}

// Fiber:
// 1. Render fallback
// 2. Khi data sẵn sàng, fiber thay thế fallback
// 3. Không chặn main thread
```

---

## Reconciliation algorithm là gì?

### Trả lời / Answer:

**Reconciliation** là thuật toán React dùng để so sánh Virtual DOM cũ và mới, xác định changes tối thiểu.

### Các bước:

1. **Diffing:**
   - So sánh element cũ và mới
   - Tìm differences

2. **Determining Changes:**
   - Tìm elements cần thêm
   - Tìm elements cần xóa
   - Tìm elements cần update

3. **Applying Changes:**
   - Cập nhật Real DOM
   - Tối thiểu số operations

---

### Heuristics:

1. **Different types:**
   - Nếu type khác → replace toàn bộ

2. **Same type:**
   - So sánh props và children
   - Chỉ update phần thay đổi

3. **Keys:**
   - Dùng key để xác định elements
   - Reorder thay vì replace

---

### Ví dụ thực tế / Practical Example:

```jsx
// 1. Different types → Replace
function Example1({ showText }) {
  if (showText) {
    return <span>Text</span>;
  }
  return <div>Div</div>;
}

// Khi showText thay đổi:
// React sẽ replace <span> với <div> (không reuse)
```

```jsx
// 2. Same type → Update
function Example2({ count }) {
  return <div>Count: {count}</div>;
}

// Khi count thay đổi:
// React sẽ update text content của <div>
// (không tạo element mới)
```

```jsx
// 3. Keys → Reorder
function Example3({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// Khi items thay đổi:
// React sẽ reorder <li> elements
// (không destroy và recreate)
```

```jsx
// 4. Không có key → Replace
function Example4({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
}

// Khi items thay đổi:
// React sẽ replace tất cả <li> elements
// (không biết element nào là element nào)
```

---

### Reconciliation visualization:

```jsx
// Trước update
<div>
  <ul>
    <li key="1">Item 1</li>
    <li key="2">Item 2</li>
    <li key="3">Item 3</li>
  </ul>
</div>

// Sau update (remove item 2)
<div>
  <ul>
    <li key="1">Item 1</li>
    <li key="3">Item 3</li>
  </ul>
</div>

// Reconciliation:
// 1. So sánh keys: 1, 2, 3 vs 1, 3
// 2. Tìm key 2 bị xóa
// 3. Xóa <li key="2"> khỏi DOM
// 4. Giữ nguyên <li key="1"> và <li key="3">
```
