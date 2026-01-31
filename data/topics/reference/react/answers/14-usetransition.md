# useTransition / useTransition

## Định nghĩa / Definition

[`useTransition`](https://react.dev/reference/react/useTransition) là một hook trong React cho phép bạn đánh dấu một số state updates là **transitions** - các updates không khẩn cấp (non-urgent). Transitions giúp giữ UI responsive khi có các updates tốn kém tính toán hoặc mạng.

## Cú pháp / Syntax

```javascript
const [isPending, startTransition] = useTransition();
```

## Tham số / Parameters

Không có tham số.

## Giá trị trả về / Return Value

| Giá trị           | Kiểu       | Mô tả                                                                      |
| ----------------- | ---------- | -------------------------------------------------------------------------- |
| `isPending`       | `boolean`  | `true` nếu có transition đang chạy, `false` nếu không.                     |
| `startTransition` | `function` | Function dùng để đánh dấu một state update là transition (không khẩn cấp). |

## Cách hoạt động / How it Works

### Priority Levels

React chia các updates thành 2 mức độ ưu tiên:

1. **Urgent updates** (Cập nhật khẩn cấp): Click, typing, pressing - cần phản hồi ngay lập tức
2. **Transition updates** (Cập nhật không khẩn cấp): UI transitions, filtering large lists - có thể trì hoãn

### Interruptible Rendering

Khi một transition đang chạy và người dùng thực hiện một urgent update (ví dụ: typing), React sẽ:

1. Dừng rendering của transition
2. Xử lý urgent update ngay lập tức
3. Tiếp tục rendering transition từ đầu với state mới

### Concurrency

`useTransition` tận dụng **Concurrent Rendering** của React 18+ để:

- Chạy multiple renders cùng lúc
- Có thể hủy bỏ render cũ nếu có update mới
- Giữ UI responsive trong khi xử lý heavy computations

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { useState, useTransition } from "react";

function SearchFilter() {
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState("");
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;

    // Urgent update - cập nhật input ngay lập tức
    setFilter(value);

    // Transition update - có thể trì hoãn
    startTransition(() => {
      setList(filterLargeList(value));
    });
  };

  return (
    <div>
      <input value={filter} onChange={handleChange} />
      {isPending && <p>Loading...</p>}
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

function filterLargeList(filter) {
  // Giả lập filtering tốn thời gian
  const largeList = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
  }));
  return largeList.filter((item) => item.name.includes(filter));
}
```

### Ví dụ với Tab Switching

```jsx
import { useState, useTransition } from "react";

function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (tab) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  return (
    <div>
      <nav>
        <button onClick={() => handleTabChange("home")}>Home</button>
        <button onClick={() => handleTabChange("about")}>About</button>
        <button onClick={() => handleTabChange("contact")}>Contact</button>
      </nav>
      {isPending && <div className="spinner" />}
      <div className={`content ${isPending ? "loading" : ""}`}>
        {activeTab === "home" && <HomePage />}
        {activeTab === "about" && <AboutPage />}
        {activeTab === "contact" && <ContactPage />}
      </div>
    </div>
  );
}
```

### Ví dụ với Data Fetching

```jsx
import { useState, useTransition } from "react";

function ProductList() {
  const [isPending, startTransition] = useTransition();
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState([]);

  const handleCategoryChange = (newCategory) => {
    // Update UI ngay lập tức
    setCategory(newCategory);

    // Fetch data trong transition
    startTransition(async () => {
      const data = await fetchProductsByCategory(newCategory);
      setProducts(data);
    });
  };

  return (
    <div>
      <select
        value={category}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      {isPending && <p>Loading products...</p>}
      <div className={`products ${isPending ? "opacity-50" : ""}`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

### Ví dụ với Search Suggestions

```jsx
import { useState, useTransition } from "react";

function SearchWithSuggestions() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Urgent - update input ngay lập tức
    setQuery(value);

    // Transition - tính toán suggestions
    startTransition(() => {
      const results = computeSuggestions(value);
      setSuggestions(results);
    });
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      {isPending && <span className="loading">Computing...</span>}
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Ví dụ với Multiple Transitions

```jsx
import { useState, useTransition } from "react";

function Dashboard() {
  const [isPending, startTransition] = useTransition();
  const [view, setView] = useState("overview");
  const [data, setData] = useState({});

  const handleViewChange = (newView) => {
    startTransition(() => {
      setView(newView);
      setData(fetchDataForView(newView));
    });
  };

  return (
    <div>
      <Sidebar onViewChange={handleViewChange} />
      <main>
        {isPending && <LoadingIndicator />}
        <ContentView view={view} data={data} />
      </main>
    </div>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi có state updates tốn kém tính toán (filtering large lists, rendering complex charts)
- Khi cần fetch data và hiển thị UI ngay lập tức
- Khi chuyển đổi giữa các views/components nặng
- Khi có search/filter với large datasets
- Khi cần giữ UI responsive trong khi xử lý background tasks

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi update cần phản hồi ngay lập tức (click, typing, pressing)
- Khi update rất nhanh và nhẹ
- Khi không có user interaction trong khi update đang chạy
- Khi cần sequential execution (không thể interrupt)

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `useTransition`:

1. **UI bị freeze**: Heavy computations sẽ block main thread, khiến UI không responsive.

2. **Input lag**: Khi typing trong search input, mỗi keystroke sẽ trigger re-render nặng, gây lag.

3. **Bad UX**: Người dùng phải chờ đợi mỗi khi thay đổi filter hoặc tab.

4. **Không thể interrupt**: Không thể hủy bỏ render cũ khi có update mới.

## Vấn đề được giải quyết / Problems Solved

### 1. Keeping UI Responsive

Transitions cho phép React ưu tiên urgent updates (typing, clicking) hơn transition updates (filtering, rendering).

### 2. Interruptible Rendering

React có thể hủy bỏ render cũ và bắt đầu lại với state mới khi có urgent update.

### 3. Concurrent Rendering

Tận dụng Concurrent Mode của React 18 để chạy multiple renders cùng lúc.

### 4. Better UX

Người dùng thấy phản hồi ngay lập tức cho các interactions quan trọng.

## Ưu điểm / Advantages

1. **Responsive UI**: Giữ UI responsive ngay cả khi có heavy computations.
2. **Automatic prioritization**: React tự động ưu tiên urgent updates.
3. **Simple API**: Dễ sử dụng với cú pháp đơn giản.
4. **Works with Suspense**: Kết hợp tốt với Suspense để hiển thị loading states.
5. **TypeScript support**: Tốt với TypeScript.

## Nhược điểm / Disadvantages

1. **React 18+**: Chỉ hoạt động với React 18 trở lên.
2. **Learning curve**: Cần hiểu về Concurrent Rendering và priority levels.
3. **Not always necessary**: Với các updates nhẹ, có thể không cần.
4. **Debugging khó hơn**: Concurrency làm cho debugging phức tạp hơn.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm      | useTransition  | setTimeout        | Web Worker         | useDeferredValue |
| ------------- | -------------- | ----------------- | ------------------ | ---------------- |
| Priority      | Có             | Không             | Không              | Có               |
| Interruptible | Có             | Không             | Có                 | Có               |
| Main thread   | Chạy trên main | Chạy trên main    | Chạy trên worker   | Chạy trên main   |
| Complexity    | Đơn giản       | Đơn giản          | Phức tạp           | Đơn giản         |
| Use case      | UI updates     | Delayed execution | Heavy computations | Defer value      |

## Best Practices / Các thực hành tốt

1. **Dùng cho non-urgent updates**:

   ```javascript
   startTransition(() => {
     setList(filterLargeList(query));
   });
   ```

2. **Không dùng cho urgent updates**:

   ```javascript
   // ❌ Sai - input cần phản hồi ngay
   startTransition(() => {
     setInputValue(e.target.value);
   });

   // ✅ Đúng - update input ngay
   setInputValue(e.target.value);
   startTransition(() => {
     setList(filterLargeList(value));
   });
   ```

3. **Kết hợp với Suspense**:

   ```javascript
   <Suspense fallback={<Loading />}>
     {isPending ? <Loading /> : <Content />}
   </Suspense>
   ```

4. **Hiển thị loading state**:

   ```javascript
   {
     isPending && <Spinner />;
   }
   ```

5. **Dùng `useDeferredValue` cho values**:
   ```javascript
   const deferredQuery = useDeferredValue(query);
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Using for Urgent Updates

```javascript
// ❌ Sai - input cần phản hồi ngay
const handleChange = (e) => {
  startTransition(() => {
    setInputValue(e.target.value);
  });
};

// ✅ Đúng - update input ngay, defer filtering
const handleChange = (e) => {
  setInputValue(e.target.value);
  startTransition(() => {
    setList(filterLargeList(e.target.value));
  });
};
```

### 2. Not Showing Loading State

```javascript
// ❌ Không có loading indicator
startTransition(() => {
  setList(filterLargeList(query));
});

// ✅ Có loading indicator
startTransition(() => {
  setList(filterLargeList(query));
});
{
  isPending && <Loading />;
}
```

### 3. Using in Wrong React Version

```javascript
// ❌ Không hoạt động với React < 18
// useTransition chỉ có sẵn từ React 18

// ✅ Kiểm tra version
import { useTransition } from "react"; // React 18+
```

### 4. Wrapping Everything in Transition

```javascript
// ❌ Sai - không cần wrap tất cả
startTransition(() => {
  setCount(count + 1);
  setName(name + "!");
  setList(filterLargeList(query));
});

// ✅ Đúng - chỉ wrap non-urgent updates
setCount(count + 1); // urgent
startTransition(() => {
  setList(filterLargeList(query)); // non-urgent
});
```

## Performance Considerations / Yếu tố hiệu suất

1. **Reduced blocking**: Transitions không block main thread, giữ UI responsive.

2. **Time slicing**: React chia nhỏ work thành chunks, cho phép browser xử lý user input.

3. **Automatic prioritization**: React tự động ưu tiên urgent updates.

4. **Memory overhead**: Có thể có memory overhead do storing multiple render states.

5. **CPU usage**: Sử dụng CPU hiệu quả hơn với concurrent rendering.

## Browser Support / Hỗ trợ trình duyệt

`useTransition` hoạt động trên tất cả trình duyệt hỗ trợ React 18+.

## Câu hỏi phỏng vấn / Interview Questions

1. `useTransition` là gì? Khi nào nên dùng?

2. `useTransition` hoạt động như thế nào?

3. Sự khác biệt giữa urgent updates và transition updates là gì?

4. Interruptible rendering là gì? Lợi ích là gì?

5. `useTransition` khác gì với `useDeferredValue`?

6. Khi nào nên dùng `useTransition` thay vì `setTimeout`?

7. `useTransition` kết hợp với Suspense như thế nào?

8. Concurrent Rendering trong React 18 là gì?

9. Làm thế nào để hiển thị loading state với `useTransition`?

10. Tại sao không nên wrap tất cả updates trong `startTransition`?

11. `isPending` trong `useTransition` dùng để làm gì?

12. Time slicing trong React là gì?

13. Làm thế nào `useTransition` giúp cải thiện UX?

14. Có thể nest transitions không?

15. `useTransition` có hoạt động với SSR không?

## Tài liệu tham khảo / References

- [useTransition - React Official Docs](https://react.dev/reference/react/useTransition)
- [Concurrent Features - React Docs](https://react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react)
- [Transitions - React Docs](https://react.dev/learn/react-compiler#react-automatically-memoizes)

---

_Last updated: 2026-01-31_
