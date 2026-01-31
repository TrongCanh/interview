# 14. Performance Optimization / Tối ưu hóa hiệu suất

## Code splitting?

### Trả lời / Answer:

**Code splitting** là kỹ thuật chia code thành nhiều phần nhỏ, load theo nhu cầu.

### Lợi ích:

1. **Faster initial load:**
   - Chỉ load code cần thiết
   - Giảm initial bundle size

2. **Better caching:**
   - Mỗi chunk có thể cache riêng
   - User không cần download lại

3. **On-demand loading:**
   - Load code khi cần
   - Giảm bandwidth

---

### Ví dụ thực tế / Practical Example:

```jsx
// ❌ Không code splitting - Load tất cả cùng lúc
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Profile from "./Profile";

function App() {
  const [route, setRoute] = useState("dashboard");

  return (
    <div>
      <nav>
        <button onClick={() => setRoute("dashboard")}>Dashboard</button>
        <button onClick={() => setRoute("settings")}>Settings</button>
        <button onClick={() => setRoute("profile")}>Profile</button>
      </nav>
      {route === "dashboard" && <Dashboard />}
      {route === "settings" && <Settings />}
      {route === "profile" && <Profile />}
    </div>
  );
}
```

```jsx
// ✅ Code splitting với React.lazy
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./Dashboard"));
const Settings = lazy(() => import("./Settings"));
const Profile = lazy(() => import("./Profile"));

function App() {
  const [route, setRoute] = useState("dashboard");

  return (
    <div>
      <nav>
        <button onClick={() => setRoute("dashboard")}>Dashboard</button>
        <button onClick={() => setRoute("settings")}>Settings</button>
        <button onClick={() => setRoute("profile")}>Profile</button>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        {route === "dashboard" && <Dashboard />}
        {route === "settings" && <Settings />}
        {route === "profile" && <Profile />}
      </Suspense>
    </div>
  );
}
```

---

### Code splitting với named exports:

```jsx
// Dashboard.js
export const Dashboard = () => <div>Dashboard</div>;
export const DashboardSettings = () => <div>Settings</div>;

// App.js
const Dashboard = lazy(() =>
  import("./Dashboard").then((module) => ({
    default: module.Dashboard,
  })),
);

const DashboardSettings = lazy(() =>
  import("./Dashboard").then((module) => ({
    default: module.DashboardSettings,
  })),
);
```

---

## Lazy loading components?

### Trả lời / Answer:

**Lazy loading** là kỹ thuật load component chỉ khi cần thiết, dùng `React.lazy`.

### Cú pháp:

```jsx
const LazyComponent = React.lazy(() => import("./Component"));
```

---

### Ví dụ thực tế / Practical Example:

```jsx
import { lazy, Suspense } from "react";

// Lazy load components
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const Contact = lazy(() => import("./Contact"));

function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      <nav>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("about")}>About</button>
        <button onClick={() => setPage("contact")}>Contact</button>
      </nav>

      <Suspense fallback={<div>Loading page...</div>}>
        {page === "home" && <Home />}
        {page === "about" && <About />}
        {page === "contact" && <Contact />}
      </Suspense>
    </div>
  );
}
```

---

### Lazy loading với error boundary:

```jsx
import { lazy, Suspense } from "react";

const LazyComponent = lazy(() => import("./Component"));

function ErrorFallback({ error }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <LazyComponent />
      </ErrorBoundary>
    </Suspense>
  );
}
```

---

### Lazy loading với preload:

```jsx
import { lazy } from "react";

// Lazy load
const LazyComponent = lazy(() => import("./Component"));

// Preload khi cần
function preloadComponent() {
  import("./Component"); // Trigger webpack to preload
}

function App() {
  return (
    <div>
      <button onClick={preloadComponent}>Preload Component</button>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```

---

## Virtualization (react-window)?

### Trả lời / Answer:

**Virtualization** là kỹ thuật chỉ render những items visible trên màn hình, tối ưu cho large lists.

### Khi nào dùng:

- List có hàng ngàn items
- Render tất cả gây performance issues
- User chỉ scroll và xem một phần

---

### Ví dụ thực tế / Practical Example:

```jsx
import { FixedSizeList as List } from "react-window";

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>Item {items[index].name}</div>
  );

  return (
    <List height={600} itemCount={items.length} itemSize={50} width={800}>
      {Row}
    </List>
  );
}

// Sử dụng
function App() {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
  }));

  return (
    <div>
      <h2>10,000 Items</h2>
      <VirtualizedList items={items} />
    </div>
  );
}
```

---

### Variable size items:

```jsx
import { VariableSizeList as List } from "react-window";

function VariableSizeList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>{items[index].text}</div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={(index) => items[index].height}
      width={800}
    >
      {Row}
    </List>
  );
}
```

---

### Virtualization với react-window:

```jsx
import { FixedSizeGrid as Grid } from "react-window";

function VirtualizedGrid({ items }) {
  const Cell = ({ columnIndex, rowIndex, style }) => (
    <div style={style}>Item {rowIndex * 10 + columnIndex}</div>
  );

  return (
    <Grid
      columnCount={10}
      columnWidth={100}
      height={600}
      rowCount={items.length / 10}
      rowHeight={50}
      width={1000}
    >
      {Cell}
    </Grid>
  );
}
```

---

## Memoization strategies?

### Trả lời / Answer:

**Memoization** là kỹ thuật lưu kết quả tính toán để tránh tính toán lại.

### Các loại memoization:

1. **React.memo:**
   - Memoize component
   - Chỉ re-render khi props thay đổi

2. **useMemo:**
   - Memoize giá trị
   - Chỉ tính toán lại khi dependencies thay đổi

3. **useCallback:**
   - Memoize function
   - Chỉ tạo function mới khi dependencies thay đổi

---

### Ví dụ thực tế / Practical Example:

```jsx
// 1. React.memo - Memoize component
const ExpensiveChild = React.memo(function ExpensiveChild({ data }) {
  console.log("ExpensiveChild rendered");

  // Expensive rendering
  const chartData = useMemo(() => {
    return data.map((item) => ({
      x: item.timestamp,
      y: item.value,
    }));
  }, [data]);

  return <Chart data={chartData} />;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

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
// 2. useMemo - Memoize giá trị
function FilteredList({ items, filter }) {
  // Memoize expensive filter
  const filteredItems = useMemo(() => {
    console.log("Filtering...");
    return items.filter((item) => item.category === filter);
  }, [items, filter]);

  return (
    <ul>
      {filteredItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

function Parent() {
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      <FilteredList items={items} filter={filter} />
    </div>
  );
}

// Khi count thay đổi:
// filteredItems KHÔNG tính toán lại (items và filter không đổi)
```

```jsx
// 3. useCallback - Memoize function
function Parent() {
  const [count, setCount] = useState(0);

  // Memoize function
  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div>
      <button onClick={handleClick}>Count: {count}</button>
    </div>
  );
}
```

---

### Memoization với multiple strategies:

```jsx
function OptimizedList({ items, filter, sortBy }) {
  // Memoize filter
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (filter === "all") return true;
      return item.category === filter;
    });
  }, [items, filter]);

  // Memoize sort
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.price - b.price;
      return 0;
    });
  }, [filteredItems, sortBy]);

  // Memoize render function
  const renderItem = useCallback(
    (item) => (
      <li key={item.id}>
        <span>{item.name}</span>
        <span>${item.price}</span>
      </li>
    ),
    [],
  );

  return <ul>{sortedItems.map(renderItem)}</ul>;
}
```

---

## Profiling React apps?

### Trả lời / Answer:

**Profiling** là quá trình đo và phân tích performance của React app.

### Các công cụ:

1. **React DevTools Profiler:**
   - Tích hợp trong React DevTools
   - Visual flame graph

2. **Chrome DevTools Performance:**
   - Measure rendering time
   - Identify bottlenecks

3. **Lighthouse:**
   - Performance audit
   - Best practices recommendations

---

### Ví dụ thực tế / Practical Example:

```jsx
// Sử dụng React DevTools Profiler
import { Profiler } from "react";

function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
) {
  console.log("Component:", id);
  console.log("Phase:", phase);
  console.log("Duration:", actualDuration);
  console.log("Base duration:", baseDuration);

  if (actualDuration > baseDuration * 2) {
    console.warn("Component took too long to render!");
  }
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <MyComponent />
    </Profiler>
  );
}
```

---

### Profiling với multiple components:

```jsx
function ProfiledApp() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <div>
        <Profiler id="Header" onRender={onRenderCallback}>
          <Header />
        </Profiler>
        <Profiler id="Content" onRender={onRenderCallback}>
          <Content />
        </Profiler>
        <Profiler id="Footer" onRender={onRenderCallback}>
          <Footer />
        </Profiler>
      </div>
    </Profiler>
  );
}
```

---

### Profiling với React DevTools:

1. Mở React DevTools
2. Chọn tab "Profiler"
3. Click "Record"
4. Thực hiện actions
5. Click "Stop"
6. Xem flame graph

---

## React DevTools Profiler?

### Trả lời / Answer:

**React DevTools Profiler** là công cụ tích hợp trong React DevTools để profile performance.

### Các tính năng:

1. **Flame Graph:**
   - Visual representation của renders
   - Xem component nào tốn thời gian

2. **Ranked:**
   - Sắp xếp components theo render time
   - Xem components tốn nhiều thời gian nhất

3. **Timeline:**
   - Timeline của renders
   - Xem khi nào renders xảy ra

4. **Interactions:**
   - Track user interactions
   - Xem performance của từng action

---

### Ví dụ thực tế / Practical Example:

```jsx
import { Profiler } from "react";

function ComponentWithProfiler() {
  return (
    <Profiler id="Component" onRender={onRenderCallback}>
      <div>
        <h1>Component</h1>
        <p>Content</p>
      </div>
    </Profiler>
  );
}

function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
  interactions,
) {
  console.log(`${id} ${phase}:`, {
    duration: actualDuration,
    base: baseDuration,
    interactions: interactions.map((i) => i.id),
  });
}
```

---

### Profiling với interactions:

```jsx
import { Profiler, unstable_traceInteraction as traceInteraction } from "react";

function Button({ onClick, children }) {
  const handleClick = (event) => {
    traceInteraction("button-click", async () => {
      await onClick(event);
    });
  };

  return <button onClick={handleClick}>{children}</button>;
}

function App() {
  const [count, setCount] = useState(0);

  const handleClick = async () => {
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 100));
    setCount((c) => c + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={handleClick}>Increment</Button>
    </div>
  );
}
```

---

## List rendering optimization (keys, virtualization)?

### Trả lời / Answer:

### Keys Optimization:

1. **Use stable keys:**
   - Dùng ID thay vì index
   - Keys không thay đổi giữa renders

2. **Avoid index as key:**
   - Khi list có thể thay đổi thứ tự
   - Gây state loss và performance issues

---

### Ví dụ thực tế / Practical Example:

```jsx
// ❌ Sai - Dùng index làm key
function BadList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <input type="text" defaultValue={item.name} />
        </li>
      ))}
    </ul>
  );
}

// Khi xóa item đầu tiên:
// Input của item 2 giữ giá trị của item 1 (state loss!)
```

```jsx
// ✅ Đúng - Dùng ID làm key
function GoodList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <input type="text" defaultValue={item.name} />
        </li>
      ))}
    </ul>
  );
}

// Khi xóa item đầu tiên:
// Input của item 2 giữ đúng giá trị (không state loss)
```

---

### Virtualization với keys:

```jsx
import { FixedSizeList as List } from "react-window";

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  );

  return (
    <List height={600} itemCount={items.length} itemSize={50} width={800}>
      {Row}
    </List>
  );
}

// Chỉ render items visible
// Tối ưu cho lists lớn
```

---

### Optimized list rendering:

```jsx
function OptimizedList({ items }) {
  // Memoize item component
  const ListItem = React.memo(function ListItem({ item }) {
    return (
      <li>
        <span>{item.name}</span>
        <span>{item.price}</span>
      </li>
    );
  });

  return (
    <ul>
      {items.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

// ListItem chỉ re-render khi item của nó thay đổi
```

---

### Optimized list với filtering:

```jsx
function FilteredList({ items, filter }) {
  // Memoize filter
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (filter === "all") return true;
      return item.category === filter;
    });
  }, [items, filter]);

  // Memoize item component
  const ListItem = React.memo(function ListItem({ item }) {
    return <li>{item.name}</li>;
  });

  return (
    <ul>
      {filteredItems.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

// Filter chỉ tính toán lại khi items hoặc filter thay đổi
// ListItem chỉ re-render khi item của nó thay đổi
```
