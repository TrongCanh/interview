# 17. Concurrent Mode / Chế độ Đồng thời

## Concurrent Rendering là gì?

### Trả lời / Answer:

**Concurrent Rendering** là tính năng trong React 18 cho phép React chuẩn bị nhiều state updates cùng lúc, ưu tiên urgent updates.

### Đặc điểm:

1. **Interruptible rendering:**
   - React có thể ngừng render không cần thiết
   - Ưu tiên user interactions

2. **Priority-based rendering:**
   - Urgent updates được ưu tiên
   - Non-urgent updates có thể hoãn

3. **Better UX:**
   - UI phản hồi nhanh hơn
   - Không bị block bởi heavy computations

---

### Ví dụ thực tế / Practical Example:

```jsx
function ConcurrentExample() {
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [items, setItems] = useState([]);
  const [isPending, startTransition] = useTransition();

  // Urgent update - user interaction
  const handleClick = () => {
    setCount((c) => c + 1);
  };

  // Non-urgent update - expensive filtering
  const handleFilterChange = (e) => {
    setFilter(e.target.value);

    // Sử dụng startTransition để đánh dấu là non-urgent
    startTransition(() => {
      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase()),
      );
      setItems(filtered);
    });
  };

  return (
    <div>
      <button onClick={handleClick}>
        Count: {count}
        {isPending && <span> (Filtering...)</span>}
      </button>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter items..."
      />
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

### Concurrent rendering với heavy computation:

```jsx
function HeavyComputation() {
  const [data, setData] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    // Urgent update
    setData(null);
  };

  const handleCompute = () => {
    // Non-urgent update - expensive computation
    startTransition(() => {
      const result = performHeavyComputation();
      setData(result);
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Clear</button>
      <button onClick={handleCompute}>
        Compute
        {isPending && <span> (Computing...)</span>}
      </button>
      {data && <div>Result: {JSON.stringify(data)}</div>}
    </div>
  );
}

function performHeavyComputation() {
  // Simulate heavy computation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(i);
  }
  return result;
}
```

---

## Automatic Batching là gì?

### Trả lời / Answer:

**Automatic Batching** là tính năng trong React 18 tự động gom nhóm nhiều state updates thành một re-render.

### React 17 vs React 18:

| Câu lệnh       | React 17    | React 18 |
| -------------- | ----------- | -------- |
| Event handlers | Batched     | Batched  |
| setTimeout     | Not batched | Batched  |
| Promise.then   | Not batched | Batched  |
| Async/await    | Not batched | Batched  |

---

### Ví dụ thực tế / Practical Example:

```jsx
// React 17 behavior (Legacy Batching)
function React17Example() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const handleClick = () => {
    // Batched - chỉ 1 re-render
    setCount((c) => c + 1);
    setName("React 17");
  };

  const fetchData = () => {
    fetch("/api/data").then(() => {
      // Not batched - 2 re-renders
      setCount((c) => c + 1);
      setName("Data loaded");
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Click</button>
      <button onClick={fetchData}>Fetch</button>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
    </div>
  );
}
```

```jsx
// React 18 behavior (Automatic Batching)
function React18Example() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const handleClick = () => {
    // Batched - chỉ 1 re-render
    setCount((c) => c + 1);
    setName("React 18");
  };

  const fetchData = () => {
    fetch("/api/data").then(() => {
      // Batched - chỉ 1 re-render
      setCount((c) => c + 1);
      setName("Data loaded");
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Click</button>
      <button onClick={fetchData}>Fetch</button>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
    </div>
  );
}
```

---

### Automatic batching với multiple updates:

```jsx
function MultipleUpdates() {
  const [state1, setState1] = useState(0);
  const [state2, setState2] = useState(0);
  const [state3, setState3] = useState(0);

  const handleClick = () => {
    // Tất cả updates được batched - chỉ 1 re-render
    setState1((s1) => s1 + 1);
    setState2((s2) => s2 + 1);
    setState3((s3) => s3 + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>Update All</button>
      <p>State 1: {state1}</p>
      <p>State 2: {state2}</p>
      <p>State 3: {state3}</p>
    </div>
  );
}
```

---

### Opt-out của Automatic Batching:

```jsx
import { flushSync } from "react-dom";

function OptOutExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const handleClick = () => {
    // Force synchronous updates - không batched
    flushSync(() => {
      setCount((c) => c + 1);
      setName("Updated");
    });
    // Re-render happens here

    console.log("Count:", count); // Vẫn là 0
    console.log("Name:", name); // Vẫn là ''
  };

  return (
    <div>
      <button onClick={handleClick}>Update (Not Batched)</button>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
    </div>
  );
}
```

---

## Transitions API (`startTransition`)?

### Trả lời / Answer:

**Transitions API** là API để đánh dấu updates là "non-urgent", cho phép React ưu tiên urgent updates.

### Cú pháp:

```jsx
const [isPending, startTransition] = useTransition();

startTransition(() => {
  // Non-urgent updates
});
```

---

### Ví dụ thực tế / Practical Example:

```jsx
function TransitionExample() {
  const [filter, setFilter] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);

    // Non-urgent update - expensive filtering
    startTransition(() => {
      const filtered = expensiveFilter(results, e.target.value);
      setResults(filtered);
    });
  };

  const handleClear = () => {
    // Urgent update
    setResults([]);
    setFilter("");
  };

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search..."
      />
      <button onClick={handleClear}>Clear</button>
      {isPending && <span> (Filtering...)</span>}
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

function expensiveFilter(items, query) {
  // Simulate expensive filtering
  return items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );
}
```

---

### Transitions với multiple updates:

```jsx
function MultipleTransitions() {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("name");
  const [items, setItems] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);

    startTransition(() => {
      // Non-urgent updates
      const filtered = filterItems(items, e.target.value);
      setItems(filtered);
    });
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);

    startTransition(() => {
      // Non-urgent updates
      const sorted = sortItems(items, e.target.value);
      setItems(sorted);
    });
  };

  const handleAdd = () => {
    // Urgent update
    const newItem = { id: Date.now(), name: `Item ${items.length + 1}` };
    setItems([...items, newItem]);
  };

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter..."
      />
      <select value={sort} onChange={handleSortChange}>
        <option value="name">Name</option>
        <option value="date">Date</option>
      </select>
      <button onClick={handleAdd}>Add Item</button>
      {isPending && <span> (Updating...)</span>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## `useTransition` hook?

### Trả lời / Answer:

**`useTransition`** là hook để tạo transitions và track pending state.

### Cú pháp:

```jsx
const [isPending, startTransition] = useTransition();
```

---

### Ví dụ thực tế / Practical Example:

```jsx
function UseTransitionExample() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setQuery(e.target.value);

    startTransition(() => {
      // Non-urgent update - expensive search
      search(e.target.value).then(setResults);
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
      {isPending && <div className="loading">Searching...</div>}
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

async function search(query) {
  // Simulate expensive search
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { id: 1, name: `${query} Result 1` },
    { id: 2, name: `${query} Result 2` },
  ];
}
```

---

### useTransition với error handling:

```jsx
function UseTransitionWithError() {
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleAction = async () => {
    startTransition(async () => {
      try {
        // Non-urgent async operation
        const result = await expensiveOperation();
        console.log("Result:", result);
      } catch (err) {
        setError(err);
      }
    });
  };

  return (
    <div>
      <button onClick={handleAction}>
        Perform Action
        {isPending && <span> (Processing...)</span>}
      </button>
      {error && <div className="error">Error: {error.message}</div>}
    </div>
  );
}

async function expensiveOperation() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { success: true };
}
```

---

## `useDeferredValue` hook?

### Trả lời / Answer:

**`useDeferredValue`** là hook để hoãn việc update một giá trị, giữ giá trị cũ cho đến khi urgent updates hoàn thành.

### Cú pháp:

```jsx
const deferredValue = useDeferredValue(value);
```

---

### Ví dụ thực tế / Practical Example:

```jsx
function UseDeferredValueExample() {
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

async function search(query) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [
    { id: 1, name: `${query} Result 1` },
    { id: 2, name: `${query} Result 2` },
  ];
}
```

---

### useDeferredValue với filtering:

```jsx
function DeferredFilter() {
  const [filter, setFilter] = useState("");
  const [items, setItems] = useState([]);

  // Defer filter update
  const deferredFilter = useDeferredValue(filter);

  useEffect(() => {
    // Chỉ filter khi deferredFilter thay đổi
    if (deferredFilter) {
      const filtered = items.filter((item) => item.category === deferredFilter);
      setItems(filtered);
    }
  }, [deferredFilter, items]);

  const handleFilterChange = (e) => {
    // Update filter ngay lập tức (urgent)
    setFilter(e.target.value);
  };

  const handleAdd = () => {
    // Urgent update
    const newItem = { id: Date.now(), name: "New Item", category: "misc" };
    setItems([...items, newItem]);
  };

  return (
    <div>
      <select value={filter} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="misc">Misc</option>
      </select>
      <button onClick={handleAdd}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} ({item.category})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Suspense for data fetching?

### Trả lời / Answer:

**Suspense** là component cho phép hiển thị fallback UI trong khi component đang loading data.

### Cú pháp:

```jsx
<Suspense fallback={<Loading />}>
  <DataComponent />
</Suspense>
```

---

### Ví dụ thực tế / Practical Example:

```jsx
import { Suspense } from "react";

// Component fetch data với Suspense
function DataComponent() {
  const data = use(fetchData());

  return (
    <div>
      <h1>Data: {data.name}</h1>
      <p>{data.description}</p>
    </div>
  );
}

// Resource để fetch data
function fetchData() {
  // Simulate async data fetching
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "React 18",
        description: "Concurrent rendering and Suspense",
      });
    }, 1000);
  });
}

// Sử dụng Suspense
function App() {
  return (
    <Suspense fallback={<div>Loading data...</div>}>
      <DataComponent />
    </Suspense>
  );
}
```

---

### Suspense với multiple components:

```jsx
import { Suspense } from "react";

function UserProfile({ userId }) {
  const user = use(fetchUser(userId));

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

function UserPosts({ userId }) {
  const posts = use(fetchPosts(userId));

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

function fetchUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: "John Doe", email: "john@example.com" });
    }, 500);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Post 1", userId },
        { id: 2, title: "Post 2", userId },
        { id: 3, title: "Post 3", userId },
      ]);
    }, 1000);
  });
}

// Sử dụng Suspense
function App() {
  const [userId, setUserId] = useState(1);

  return (
    <div>
      <button onClick={() => setUserId(userId + 1)}>
        Switch User (Current: {userId})
      </button>
      <Suspense fallback={<div>Loading user...</div>}>
        <UserProfile userId={userId} />
      </Suspense>
      <Suspense fallback={<div>Loading posts...</div>}>
        <UserPosts userId={userId} />
      </Suspense>
    </div>
  );
}
```

---

### Suspense với error boundaries:

```jsx
import { Suspense } from "react";

function ErrorBoundary({ children, fallback }) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Suspense fallback={fallback}>
      <ErrorBoundary>
        {hasError ? (
          <div className="error">
            <h2>Something went wrong</h2>
            <p>{error?.message}</p>
            <button onClick={() => setHasError(false)}>Try Again</button>
          </div>
        ) : (
          children
        )}
      </ErrorBoundary>
    </Suspense>
  );
}

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Sử dụng
function App() {
  return (
    <ErrorBoundary fallback={<div>Error loading...</div>}>
      <Suspense fallback={<div>Loading data...</div>}>
        <DataComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
```
