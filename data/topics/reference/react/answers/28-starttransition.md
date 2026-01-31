# startTransition / startTransition

## Định nghĩa / Definition

[`startTransition`](https://react.dev/reference/react/startTransition) là một API trong React cho phép bạn đánh dấu một số state updates là **transitions** - các updates không khẩn cấp. Nó là phiên bản imperative của `useTransition` hook.

## Cú pháp / Syntax

```javascript
startTransition(callback);
```

## Tham số / Parameters

| Tham số    | Kiểu       | Mô tả                                                     |
| ---------- | ---------- | --------------------------------------------------------- |
| `callback` | `function` | Function chứa các state updates muốn mark là transitions. |

## Giá trị trả về / Return Value

Không có giá trị trả về (void).

## Cách hoạt động / How it Works

### Priority Levels

React chia các updates thành 2 mức độ ưu tiên:

1. **Urgent updates** (Cập nhật khẩn cấp): Click, typing, pressing - cần phản hồi ngay lập tức
2. **Transition updates** (Cập nhật không khẩn cấp): UI transitions, filtering large lists - có thể trì hoãn

### Comparison with useTransition

| Đặc điểm  | startTransition             | useTransition                                          |
| --------- | --------------------------- | ------------------------------------------------------ |
| Type      | Function                    | Hook                                                   |
| Use case  | Event handlers              | Components                                             |
| isPending | Không có                    | Có                                                     |
| Syntax    | `startTransition(() => {})` | `const [isPending, startTransition] = useTransition()` |

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { startTransition, useState } from "react";

function SearchFilter() {
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
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Ví dụ với Tab Switching

```jsx
import { startTransition, useState } from "react";

function TabContainer() {
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
      <div className="content">
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
import { startTransition, useState } from "react";

function ProductList() {
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
      <div className="products">
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
import { startTransition, useState } from "react";

function SearchWithSuggestions() {
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

### Ví dụ với Multiple Updates

```jsx
import { startTransition, useState } from "react";

function Dashboard() {
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
        <ContentView view={view} data={data} />
      </main>
    </div>
  );
}
```

### Ví dụ với Form Submission

```jsx
import { startTransition, useState } from "react";

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    startTransition(async () => {
      await submitForm(formData);
      setSubmitted(true);
    });
  };

  if (submitted) {
    return <div>Thank you!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
      />
      <input
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <textarea
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        placeholder="Message"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi có state updates tốn kém tính toán
- Khi cần fetch data và hiển thị UI ngay lập tức
- Khi chuyển đổi giữa các views/components nặng
- Khi có search/filter với large datasets
- Khi muốn giữ UI responsive trong khi xử lý background tasks

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi update cần phản hồi ngay lập tức (click, typing, pressing)
- Khi update rất nhanh và nhẹ
- Khi không có user interaction trong khi update đang chạy
- Khi cần sequential execution (không thể interrupt)

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `startTransition`:

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

Tận dụng Concurrent Mode của React 18+ để chạy multiple renders cùng lúc.

### 4. Better UX

Người dùng thấy phản hồi ngay lập tức cho các interactions quan trọng.

## Ưu điểm / Advantages

1. **Responsive UI**: Giữ UI responsive ngay cả khi có heavy computations.

2. **Automatic prioritization**: React tự động ưu tiên urgent updates.

3. **Simple API**: Dễ sử dụng với cú pháp đơn giản.

4. **Works with Suspense**: Kết hợp tốt với Suspense để hiển thị loading states.

5. **Imperative**: Dùng được trong event handlers.

## Nhược điểm / Disadvantages

1. **React 18+**: Chỉ hoạt động với React 18 trở lên.

2. **No isPending**: Không có `isPending` flag như `useTransition`.

3. **Learning curve**: Cần hiểu về Concurrent Rendering và priority levels.

4. **Not always necessary**: Với các updates nhẹ, có thể không cần.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm      | startTransition | useTransition  | setTimeout        | useDeferredValue |
| ------------- | --------------- | -------------- | ----------------- | ---------------- |
| Priority      | Có              | Có             | Không             | Có               |
| Interruptible | Có              | Có             | Không             | Có               |
| isPending     | Không           | Có             | Không             | Không            |
| Main thread   | Chạy trên main  | Chạy trên main | Chạy trên main    | Chạy trên main   |
| Complexity    | Đơn giản        | Đơn giản       | Đơn giản          | Đơn giản         |
| Use case      | Event handlers  | Components     | Delayed execution | Defer value      |

## Best Practices / Các thực hành tốt

1. **Dùng cho non-urgent updates**:

   ```jsx
   startTransition(() => {
     setList(filterLargeList(query));
   });
   ```

2. **Không dùng cho urgent updates**:

   ```jsx
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

   ```jsx
   <Suspense fallback={<Loading />}>
     {isPending ? <Loading /> : <Content />}
   </Suspense>
   ```

4. **Dùng `useTransition` khi cần isPending**:
   ```jsx
   // Khi cần isPending flag
   const [isPending, startTransition] = useTransition();
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Using for Urgent Updates

```jsx
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

### 2. Wrapping Everything

```jsx
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

### 3. Not Understanding Concurrent Rendering

```jsx
// ❌ Không hiểu về concurrent rendering
startTransition(() => {
  // Expecting sequential execution
});

// ✅ Đúng - hiểu rằng có thể interrupt
startTransition(() => {
  // Có thể interrupt nếu có urgent update
});
```

### 4. Using in Wrong React Version

```jsx
// ❌ Không hoạt động với React < 18
// startTransition chỉ có sẵn từ React 18

// ✅ Kiểm tra version
import { startTransition } from "react"; // React 18+
```

## Performance Considerations / Yếu tố hiệu suất

1. **Reduced blocking**: Transitions không block main thread, giữ UI responsive.

2. **Time slicing**: React chia nhỏ work thành chunks, cho phép browser xử lý user input.

3. **Automatic prioritization**: React tự động ưu tiên urgent updates.

4. **Memory overhead**: Có thể có memory overhead do storing multiple render states.

## Browser Support / Hỗ trợ trình duyệt

`startTransition` hoạt động trên tất cả trình duyệt hỗ trợ React 18+.

## Câu hỏi phỏng vấn / Interview Questions

1. `startTransition` là gì? Khi nào nên dùng?

2. `startTransition` hoạt động như thế nào?

3. Sự khác biệt giữa `startTransition` và `useTransition`?

4. Urgent updates và transition updates khác nhau như thế nào?

5. `startTransition` có `isPending` không?

6. Làm thế nào `startTransition` giúp cải thiện UX?

7. `startTransition` khác gì với `setTimeout`?

8. `startTransition` có hoạt động với SSR không?

9. Làm thế nào để hiển thị loading state với `startTransition`?

10. Khi nào nên dùng `startTransition` thay vì `useTransition`?

11. `startTransition` có hoạt động với React 17 không?

12. Làm thế nào để debug transitions?

13. Có thể nest `startTransition` không?

14. `startTransition` có hoạt động với TypeScript không?

15. Làm thế nào `startTransition` kết hợp với Suspense?

## Tài liệu tham khảo / References

- [startTransition - React Official Docs](https://react.dev/reference/react/startTransition)
- [Concurrent Features - React Docs](https://react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react)
- [Transitions - React Docs](https://react.dev/learn/react-compiler#react-automatically-memoizes)

---

_Last updated: 2026-01-31_
