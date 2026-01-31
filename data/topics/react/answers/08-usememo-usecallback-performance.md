# 8. useMemo & useCallback - Performance / useMemo & useCallback - Hiệu suất

## `useMemo` là gì? Khi nào nên dùng?

### Trả lời / Answer:

**`useMemo`** là hook để memoize giá trị tính toán, chỉ tính toán lại khi dependencies thay đổi.

### Cú pháp:

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

---

### Khi nào nên dùng `useMemo`?

1. **Expensive calculations / Tính toán tốn kém:**
   - Filter/sort large arrays
   - Complex math operations
   - Data transformations

2. **Reference equality / So sánh tham chiếu:**
   - Khi giá trị được dùng trong dependency array
   - Khi giá trị được truyền xuống component con

3. **Prevent unnecessary re-renders:**
   - Tránh tạo object/array mới mỗi render

---

### Ví dụ thực tế / Practical Example:

```jsx
// ❌ Sai - Tính toán mỗi render
function ExpensiveComponent({ items, filter }) {
  // Filter chạy mỗi render, kể cả khi items và filter không đổi
  const filteredItems = items.filter((item) => item.category === filter);

  return (
    <ul>
      {filteredItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

```jsx
// ✅ Đúng - Memoize với useMemo
function ExpensiveComponent({ items, filter }) {
  // Filter chỉ chạy lại khi items hoặc filter thay đổi
  const filteredItems = useMemo(
    () => items.filter((item) => item.category === filter),
    [items, filter],
  );

  return (
    <ul>
      {filteredItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

---

### Ví dụ với complex calculation:

```jsx
function FibonacciCalculator({ n }) {
  // Fibonacci tốn CPU - nên memoize
  const fib = useMemo(() => {
    function fibonacci(num) {
      if (num <= 1) return num;
      return fibonacci(num - 1) + fibonacci(num - 2);
    }

    return fibonacci(n);
  }, [n]);

  return (
    <div>
      Fibonacci({n}) = {fib}
    </div>
  );
}
```

---

### Ví dụ với sorting:

```jsx
function SortedList({ items, sortBy }) {
  // Sorting tốn kém với large arrays
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.price - b.price;
      return 0;
    });
  }, [items, sortBy]);

  return (
    <ul>
      {sortedItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

---

## `useCallback` là gì? Tại sao cần nó?

### Trả lời / Answer:

**`useCallback`** là hook để memoize function, chỉ tạo function mới khi dependencies thay đổi.

### Cú pháp:

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

---

### Tại sao cần `useCallback`?

1. **Prevent unnecessary re-renders:**
   - Tránh tạo function mới mỗi render
   - Component con dùng `React.memo` sẽ không re-render

2. **Dependency arrays:**
   - Function được dùng trong dependency array của `useEffect`

3. **Reference equality:**
   - Khi function được truyền xuống component con

---

### Ví dụ thực tế / Practical Example:

```jsx
// ❌ Sai - Function mới mỗi render
function Parent() {
  const [count, setCount] = useState(0);

  // handleClick là function mới mỗi render
  const handleClick = () => {
    setCount((c) => c + 1);
  };

  return <Child onClick={handleClick} />;
}

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click me</button>;
});

// Child re-render mỗi lần Parent render (không cần thiết)
```

```jsx
// ✅ Đúng - Memoize với useCallback
function Parent() {
  const [count, setCount] = useState(0);

  // handleClick chỉ tạo mới khi dependencies thay đổi
  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []); // Không có dependencies = function không bao giờ thay đổi

  return <Child onClick={handleClick} />;
}

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click me</button>;
});

// Child chỉ re-render khi onClick thay đổi (không bao giờ trong trường hợp này)
```

---

### Ví dụ với dependencies:

```jsx
function Parent({ userId }) {
  const [count, setCount] = useState(0);

  // Function mới mỗi khi count thay đổi
  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, [count]);

  // Function mới mỗi khi userId thay đổi
  const fetchUser = useCallback(async () => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }, [userId]);

  return (
    <div>
      <Child onClick={handleClick} />
      <UserFetcher fetchUser={fetchUser} />
    </div>
  );
}
```

---

### Ví dụ với useEffect:

```jsx
function Component({ userId }) {
  const [data, setData] = useState(null);

  // ❌ Sai - Function mới mỗi render
  const fetchData = async () => {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    fetchData(); // fetchData thay đổi mỗi render → effect chạy lại
  }, [fetchData]);

  // ✅ Đúng - Memoize function
  const fetchData = useCallback(async () => {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    setData(data);
  }, [userId]); // Chỉ thay đổi khi userId thay đổi

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Effect chỉ chạy lại khi fetchData thay đổi
}
```

---

## Trade-offs của memoization?

### Trả lời / Answer:

### Ưu điểm:

1. **Performance improvement:**
   - Tránh tính toán tốn kém
   - Tránh re-render không cần thiết

2. **Predictable behavior:**
   - Giá trị chỉ thay đổi khi dependencies thay đổi

---

### Nhược điểm:

1. **Memory overhead:**
   - Lưu trữ giá trị memoized
   - Có thể gây memory leak nếu lạm dụng

2. **Code complexity:**
   - Thêm dependency arrays
   - Khó debug hơn

3. **Premature optimization:**
   - Không phải lúc nào cũng cần
   - Có thể làm chậm hơn trong một số trường hợp

---

### Khi nào KHÔNG nên memoize:

```jsx
// ❌ Không cần memoize - tính toán đơn giản
function SimpleComponent({ a, b }) {
  const sum = useMemo(() => a + b, [a, b]);
  return <div>{sum}</div>;
}

// ✅ Tính toán trực tiếp - nhanh hơn
function SimpleComponent({ a, b }) {
  const sum = a + b;
  return <div>{sum}</div>;
}
```

```jsx
// ❌ Không cần memoize - function đơn giản
function SimpleComponent({ onClick }) {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return <button onClick={handleClick}>Click</button>;
}

// ✅ Function trực tiếp - đơn giản hơn
function SimpleComponent({ onClick }) {
  return <button onClick={onClick}>Click</button>;
}
```

---

### Ví dụ trade-offs:

```jsx
// Memoize expensive calculation
function ExpensiveList({ items, filter }) {
  // ✅ Đúng - Filter tốn kém
  const filteredItems = useMemo(
    () => items.filter((item) => item.category === filter),
    [items, filter],
  );

  return (
    <ul>
      {filteredItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// Don't memoize simple calculation
function SimpleList({ items }) {
  // ❌ Sai - Map đơn giản, không cần memoize
  const listItems = useMemo(
    () => items.map((item) => <li key={item.id}>{item.name}</li>),
    [items],
  );

  return <ul>{listItems}</ul>;

  // ✅ Đúng - Map trực tiếp
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

---

## `useMemo` vs `React.memo`?

### Trả lời / Answer:

### So sánh chi tiết:

| Đặc điểm         | useMemo                    | React.memo        |
| ---------------- | -------------------------- | ----------------- |
| Mục đích         | Memoize giá trị            | Memoize component |
| Tránh gì         | Tính toán lặp              | Re-render         |
| Dùng cho         | Values, objects, functions | Components        |
| Cách dùng        | Hook                       | HOC               |
| Dependency array | Có                         | Props comparison  |

---

### `useMemo` - Memoize giá trị:

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // Memoize object
  const config = useMemo(
    () => ({
      count,
      name,
      timestamp: Date.now(),
    }),
    [count, name],
  );

  return <Child config={config} />;
}
```

---

### `React.memo` - Memoize component:

```jsx
const Child = React.memo(({ config }) => {
  console.log("Child rendered");
  return <div>{JSON.stringify(config)}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // ❌ Object mới mỗi render → Child re-render
  const config = {
    count,
    name,
    timestamp: Date.now(),
  };

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <input onChange={(e) => setName(e.target.value)} />
      <Child config={config} />
    </div>
  );
}
```

```jsx
// ✅ Kết hợp useMemo và React.memo
const Child = React.memo(({ config }) => {
  console.log("Child rendered");
  return <div>{JSON.stringify(config)}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // Memoize object → Child không re-render khi name thay đổi
  const config = useMemo(
    () => ({
      count,
      name,
      timestamp: Date.now(),
    }),
    [count, name],
  );

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <input onChange={(e) => setName(e.target.value)} />
      <Child config={config} />
    </div>
  );
}
```

---

### Ví dụ thực tế / Practical Example:

```jsx
// Component con với React.memo
const ExpensiveChild = React.memo(({ data, onUpdate }) => {
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
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");

  // Memoize filtered data
  const filteredData = useMemo(() => {
    if (filter === "all") return data;
    return data.filter((item) => item.category === filter);
  }, [data, filter]);

  // Memoize update function
  const handleUpdate = useCallback((id, newValue) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, value: newValue } : item,
      ),
    );
  }, []);

  return (
    <div>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
      </select>
      <ExpensiveChild data={filteredData} onUpdate={handleUpdate} />
    </div>
  );
}
```

---

## Dependency array trong `useMemo`/`useCallback`?

### Trả lời / Answer:

**Dependency array** là tham số thứ hai của `useMemo` và `useCallback`, dùng để xác định khi nào giá trị/function cần tính toán lại.

### Quy tắc:

1. **Include all dependencies:**
   - Tất cả giá trị dùng trong callback/function

2. **ESLint rule:**
   - `react-hooks/exhaustive-deps` giúp phát hiện missing dependencies

3. **Stale closures:**
   - Missing dependencies → stale closures

---

### Ví dụ thực tế / Practical Example:

```jsx
// ❌ Sai - Missing dependency
function Component({ userId }) {
  const [data, setData] = useState(null);

  // userId không có trong deps → stale closure
  const fetchData = useCallback(async () => {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    setData(data);
  }, []); // userId missing!

  useEffect(() => {
    fetchData();
  }, [fetchData]);
}
```

```jsx
// ✅ Đúng - Có đầy đủ dependencies
function Component({ userId }) {
  const [data, setData] = useState(null);

  // userId có trong deps → function cập nhật khi userId thay đổi
  const fetchData = useCallback(async () => {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    setData(data);
  }, [userId]); // ✅ userId included

  useEffect(() => {
    fetchData();
  }, [fetchData]);
}
```

---

### Ví dụ với multiple dependencies:

```jsx
function SearchComponent({ query, filters, sortBy }) {
  const [items, setItems] = useState([]);

  // ✅ Đúng - Tất cả dependencies
  const filteredItems = useMemo(() => {
    let result = items;

    // Filter by query
    if (query) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    // Filter by category
    if (filters.category) {
      result = result.filter((item) => item.category === filters.category);
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.price - b.price;
      return 0;
    });

    return result;
  }, [items, query, filters, sortBy]); // ✅ All dependencies

  return <List items={filteredItems} />;
}
```

---

### Ví dụ với object dependencies:

```jsx
function Component({ config }) {
  // ❌ Sai - Object reference thay đổi mỗi render
  const memoizedValue = useMemo(() => {
    return calculateSomething(config);
  }, [config]); // config là object mới mỗi render → memoization không hoạt động

  // ✅ Đúng - Dùng specific properties
  const memoizedValue = useMemo(() => {
    return calculateSomething(config);
  }, [config.id, config.value]); // Chỉ memoize khi id hoặc value thay đổi

  // ✅ Hoặc dùng JSON.stringify
  const memoizedValue = useMemo(() => {
    return calculateSomething(config);
  }, [JSON.stringify(config)]);
}
```

---

## Reference equality và memoization?

### Trả lời / Answer:

**Reference equality** là việc so sánh tham chiếu (address) thay vì giá trị.

### Tại sao quan trọng?

1. **React.memo:**
   - So sánh props bằng reference equality
   - Object/function mới → re-render

2. **Dependency arrays:**
   - So sánh dependencies bằng reference equality
   - Object/function mới → effect chạy lại

3. **useMemo/useCallback:**
   - Dùng reference equality để quyết định có memoize không

---

### Ví dụ thực tế / Practical Example:

```jsx
// Object reference equality
function Parent() {
  const [count, setCount] = useState(0);

  // ❌ Object mới mỗi render
  const config = { count };

  // ✅ Object được memoize
  const config = useMemo(() => ({ count }), [count]);

  return <Child config={config} />;
}

const Child = React.memo(({ config }) => {
  console.log("Child rendered");
  return <div>{config.count}</div>;
});

// Với object mới mỗi render:
// Child re-render mỗi lần Parent render

// Với object được memoize:
// Child chỉ re-render khi count thay đổi
```

---

### Array reference equality:

```jsx
function Parent() {
  const [items, setItems] = useState([1, 2, 3]);

  // ❌ Array mới mỗi render (map tạo array mới)
  const doubledItems = items.map((item) => item * 2);

  // ✅ Array được memoize
  const doubledItems = useMemo(() => items.map((item) => item * 2), [items]);

  return <Child items={doubledItems} />;
}

const Child = React.memo(({ items }) => {
  console.log("Child rendered");
  return <div>{items.join(", ")}</div>;
});
```

---

### Function reference equality:

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // ❌ Function mới mỗi render
  const handleClick = () => {
    setCount((c) => c + 1);
  };

  // ✅ Function được memoize
  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return <Child onClick={handleClick} />;
}

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click me</button>;
});
```

---

### Ví dụ thực tế - Shopping cart:

```jsx
function ShoppingCart({ items, promoCode }) {
  // ✅ Memoize calculations
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const discount = useMemo(() => {
    if (!promoCode) return 0;
    const discounts = { SAVE10: 0.1, SAVE20: 0.2 };
    return discounts[promoCode] || 0;
  }, [promoCode]);

  const tax = useMemo(
    () => subtotal * (1 - discount) * 0.1,
    [subtotal, discount],
  );

  const total = useMemo(
    () => subtotal * (1 - discount) + tax,
    [subtotal, discount, tax],
  );

  // ✅ Memoize callbacks
  const updateQuantity = useCallback((id, quantity) => {
    // Update logic
  }, []);

  const removeItem = useCallback((id) => {
    // Remove logic
  }, []);

  return (
    <div>
      <CartItems
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
      <CartSummary
        subtotal={subtotal}
        discount={discount}
        tax={tax}
        total={total}
      />
    </div>
  );
}

const CartItems = React.memo(({ items, onUpdateQuantity, onRemove }) => {
  return (
    <ul>
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
});

const CartItem = React.memo(({ item, onUpdateQuantity, onRemove }) => {
  return (
    <li>
      <span>{item.name}</span>
      <input
        type="number"
        value={item.quantity}
        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
      />
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </li>
  );
});

const CartSummary = React.memo(({ subtotal, discount, tax, total }) => {
  return (
    <div>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Discount: -${(subtotal * discount).toFixed(2)}</p>
      <p>Tax: ${tax.toFixed(2)}</p>
      <p>
        <strong>Total: ${total.toFixed(2)}</strong>
      </p>
    </div>
  );
});
```
