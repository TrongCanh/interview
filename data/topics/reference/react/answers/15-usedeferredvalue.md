# useDeferredValue / useDeferredValue

## Định nghĩa / Definition

[`useDeferredValue`](https://react.dev/reference/react/useDeferredValue) là một hook trong React cho phép bạn **defer** (trì hoãn) việc cập nhật một phần của UI. Nó tương tự như debouncing nhưng được React quản lý tự động, giúp giữ UI responsive khi có các updates tốn kém.

## Cú pháp / Syntax

```javascript
const deferredValue = useDeferredValue(value);
```

## Tham số / Parameters

| Tham số | Kiểu | Mô tả                                            |
| ------- | ---- | ------------------------------------------------ |
| `value` | Any  | Giá trị cần defer. Có thể là bất kỳ giá trị nào. |

## Giá trị trả về / Return Value

| Giá trị         | Kiểu | Mô tả                                                    |
| --------------- | ---- | -------------------------------------------------------- |
| `deferredValue` | Any  | Phiên bản deferred của value. Cùng type với input value. |

## Cách hoạt động / How it Works

### Deferring Updates

Khi `value` thay đổi, React sẽ:

1. Cập nhật UI ngay lập tức với giá trị cũ của `deferredValue`
2. Bắt đầu render mới với giá trị mới của `deferredValue` ở background
3. Nếu có urgent update xảy ra trong khi render đang chạy, React sẽ ưu tiên urgent update
4. Khi render hoàn tất, UI sẽ cập nhật với giá trị deferred mới

### Comparison with useTransition

| Đặc điểm   | useDeferredValue          | useTransition                       |
| ---------- | ------------------------- | ----------------------------------- |
| Dùng cho   | Values                    | Actions                             |
| Cú pháp    | `useDeferredValue(value)` | `startTransition(() => setState())` |
| Use case   | Defer rendering           | Defer state updates                 |
| Complexity | Đơn giản hơn              | Linh hoạt hơn                       |

### Automatic Debouncing

`useDeferredValue` hoạt động như một **smart debouncer**:

- Không cần set timeout thủ công
- React tự động quyết định khi nào cập nhật
- Có thể hủy bỏ render cũ nếu có update mới

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { useState, useDeferredValue } from "react";

function SearchResults() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const results = searchProducts(deferredQuery);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      <ResultsList results={results} />
    </div>
  );
}

function ResultsList({ results }) {
  return (
    <ul>
      {results.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

### Ví dụ với Large List Rendering

```jsx
import { useState, useDeferredValue, memo } from "react";

const ProductCard = memo(function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span>${product.price}</span>
    </div>
  );
});

function ProductCatalog() {
  const [filter, setFilter] = useState("");
  const deferredFilter = useDeferredValue(filter);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(deferredFilter.toLowerCase()),
  );

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter products..."
      />
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

### Ví dụ với Tree Rendering

```jsx
import { useState, useDeferredValue } from "react";

function FileExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredTree = filterFileTree(fileTree, deferredSearchTerm);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search files..."
      />
      <TreeView tree={filteredTree} />
    </div>
  );
}

function TreeNode({ node }) {
  return (
    <div>
      <span>{node.name}</span>
      {node.children && (
        <div style={{ marginLeft: "20px" }}>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}
```

### Ví dụ với Chart Rendering

```jsx
import { useState, useDeferredValue } from "react";

function DataVisualization() {
  const [data, setData] = useState(initialData);
  const deferredData = useDeferredValue(data);

  return (
    <div>
      <Controls onDataChange={setData} />
      <ComplexChart data={deferredData} />
    </div>
  );
}
```

### Ví dụ với Multiple Deferred Values

```jsx
import { useState, useDeferredValue } from "react";

function Dashboard() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const deferredSearch = useDeferredValue(search);
  const deferredFilter = useDeferredValue(filter);

  const results = applyFilters(searchItems(deferredSearch), deferredFilter);

  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <ResultsGrid results={results} />
    </div>
  );
}
```

### Ví dụ với Loading Indicator

```jsx
import { useState, useDeferredValue, useTransition } from "react";

function SearchWithLoading() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);

  const results = search(deferredQuery);

  const handleChange = (e) => {
    setQuery(e.target.value);
    startTransition(() => {
      // Transition sẽ tự động handle
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <LoadingSpinner />}
      <ResultsList results={results} />
    </div>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi có rendering tốn kém tính toán (large lists, complex charts, trees)
- Khi cần giữ input responsive trong khi filtering/searching
- Khi có components nặng cần render dựa trên user input
- Khi muốn tự động debouncing mà không cần set timeout
- Khi kết hợp với `React.memo` để tối ưu re-renders

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi value thay đổi rất ít hoặc nhẹ
- Khi cần update ngay lập tức (urgent updates)
- Khi component đã được tối ưu tốt với `React.memo`
- Khi value không được dùng trong rendering tốn kém

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `useDeferredValue`:

1. **Input lag**: Khi typing trong search input, mỗi keystroke sẽ trigger re-render nặng.

2. **UI freeze**: Heavy rendering sẽ block main thread.

3. **Manual debouncing**: Phải implement debouncing thủ công với `setTimeout` hoặc `lodash.debounce`.

4. **Complex code**: Debouncing thủ công làm code phức tạp hơn.

## Vấn đề được giải quyết / Problems Solved

### 1. Automatic Debouncing

React tự động defer rendering, không cần manual debouncing.

### 2. Responsive Inputs

Input values update ngay lập tức trong khi rendering deferred.

### 3. Interruptible Rendering

Có thể hủy bỏ render cũ khi có update mới.

### 4. Simple API

Dễ sử dụng hơn so với manual debouncing.

## Ưu điểm / Advantages

1. **Automatic**: React tự động quản lý khi nào cập nhật.
2. **Simple API**: Dễ sử dụng với cú pháp đơn giản.
3. **Responsive**: Giữ UI responsive.
4. **Works with React.memo**: Kết hợp tốt với memoization.
5. **TypeScript support**: Tốt với TypeScript.

## Nhược điểm / Disadvantages

1. **React 18+**: Chỉ hoạt động với React 18 trở lên.
2. **Extra render**: Có thể gây thêm một lần render.
3. **Not always necessary**: Với các updates nhẹ, có thể không cần.
4. **Learning curve**: Cần hiểu về Concurrent Rendering.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm      | useDeferredValue | useTransition | Debounce  | Throttle  |
| ------------- | ---------------- | ------------- | --------- | --------- |
| Automatic     | Có               | Có            | Không     | Không     |
| Dùng cho      | Values           | Actions       | Functions | Functions |
| Interruptible | Có               | Có            | Không     | Không     |
| Complexity    | Đơn giản         | Trung bình    | Đơn giản  | Đơn giản  |
| React-managed | Có               | Có            | Không     | Không     |

## Best Practices / Các thực hành tốt

1. **Dùng với React.memo**:

   ```javascript
   const deferredValue = useDeferredValue(value);
   <MemoizedComponent value={deferredValue} />;
   ```

2. **Dùng cho expensive rendering**:

   ```javascript
   const deferredQuery = useDeferredValue(query);
   const results = expensiveFilter(deferredQuery);
   ```

3. **Không dùng cho urgent updates**:

   ```javascript
   // ✅ Update input ngay
   <input value={inputValue} onChange={handleChange} />;

   // Defer rendering
   const deferredValue = useDeferredValue(inputValue);
   <ExpensiveComponent value={deferredValue} />;
   ```

4. **Kết hợp với useTransition**:
   ```javascript
   const [isPending, startTransition] = useTransition();
   const deferredValue = useDeferredValue(value);
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Deferring Everything

```javascript
// ❌ Sai - defer tất cả
const deferredValue = useDeferredValue(value);
const deferredAnother = useDeferredValue(another);

// ✅ Đúng - chỉ defer expensive values
const deferredValue = useDeferredValue(value);
<ExpensiveComponent value={deferredValue} />
<SimpleComponent value={another} />
```

### 2. Not Using with React.memo

```javascript
// ❌ Không tối ưu - component vẫn re-render
const deferredValue = useDeferredValue(value);
<ExpensiveComponent value={deferredValue} />;

// ✅ Đúng - dùng React.memo
const ExpensiveComponent = memo(function ({ value }) {
  // expensive rendering
});
```

### 3. Using for Simple Values

```javascript
// ❌ Không cần - value đơn giản
const deferredCount = useDeferredValue(count);

// ✅ Đúng - chỉ defer expensive values
const deferredLargeList = useDeferredValue(largeList);
```

### 4. Expecting Immediate Updates

```javascript
// ❌ Sai - deferredValue không update ngay
const deferredValue = useDeferredValue(value);
console.log(deferredValue === value); // có thể false

// ✅ Đúng - hiểu deferred behavior
// deferredValue sẽ update sau khi urgent updates hoàn tất
```

## Performance Considerations / Yếu tố hiệu suất

1. **Reduced re-renders**: Kết hợp với `React.memo` để giảm re-renders.

2. **Time slicing**: React chia nhỏ work thành chunks.

3. **Memory overhead**: Có thể có memory overhead do storing multiple render states.

4. **CPU usage**: Sử dụng CPU hiệu quả hơn với concurrent rendering.

5. **Best with expensive operations**: Tối ưu nhất với expensive filtering/rendering.

## Browser Support / Hỗ trợ trình duyệt

`useDeferredValue` hoạt động trên tất cả trình duyệt hỗ trợ React 18+.

## Câu hỏi phỏng vấn / Interview Questions

1. `useDeferredValue` là gì? Khi nào nên dùng?

2. `useDeferredValue` hoạt động như thế nào?

3. Sự khác biệt giữa `useDeferredValue` và `useTransition`?

4. `useDeferredValue` khác gì với debouncing?

5. Khi nào nên dùng `useDeferredValue` thay vì `useTransition`?

6. Tại sao nên kết hợp `useDeferredValue` với `React.memo`?

7. `useDeferredValue` có trigger re-render không?

8. Deferred value có bằng với original value không?

9. Làm thế nào `useDeferredValue` giúp cải thiện performance?

10. Có thể dùng `useDeferredValue` với SSR không?

11. `useDeferredValue` có hoạt động với React 17 không?

12. Làm thế nào để debug deferred updates?

13. Có thể nest `useDeferredValue` không?

14. `useDeferredValue` có hoạt động với class components không?

15. Khi nào nên dùng `useDeferredValue` thay vì `useMemo`?

## Tài liệu tham khảo / References

- [useDeferredValue - React Official Docs](https://react.dev/reference/react/useDeferredValue)
- [Concurrent Features - React Docs](https://react.dev/blog/2022/03/29/react-v18)
- [Optimizing Performance - React Docs](https://react.dev/learn/render-and-commit)

---

_Last updated: 2026-01-31_
