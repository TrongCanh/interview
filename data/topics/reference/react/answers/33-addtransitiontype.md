# addTransitionType / addTransitionType

## Định nghĩa / Definition

[`addTransitionType`](https://react.dev/reference/react/addTransitionType) là một API trong React cho phép bạn **đăng ký custom transition types** để phân loại và track các transitions khác nhau.

## Cú pháp / Syntax

```javascript
addTransitionType(typeName, callback);
```

## Tham số / Parameters

| Tham số    | Kiểu       | Mô tả                                           |
| ---------- | ---------- | ----------------------------------------------- |
| `typeName` | `string`   | Tên của transition type.                        |
| `callback` | `function` | Function trả về transition type hoặc undefined. |

## Giá trị trả về / Return Value

Không có giá trị trả về (void).

## Cách hoạt động / How it Works

### Transition Types

Transition types cho phép bạn phân loại các transitions:

```jsx
// Đăng ký transition type
addTransitionType("tab-switch", () => "tab");

// Dùng transition type
startTransition(() => {
  // Transition sẽ được gán type "tab-switch"
});
```

### Type Detection

React tự động detect transition type dựa trên callback:

```
addTransitionType("custom", () => "custom");
// Khi transition chạy, type sẽ là "custom"
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { addTransitionType, startTransition } from "react";

// Đăng ký transition types
addTransitionType("tab-switch", () => "tab");
addTransitionType("page-nav", () => "page");

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
      </nav>
      <div className="content">
        {activeTab === "home" && <HomePage />}
        {activeTab === "about" && <AboutPage />}
      </div>
    </div>
  );
}
```

### Ví dụ với Multiple Types

```jsx
import { addTransitionType, startTransition } from "react";

// Đăng ký các transition types
addTransitionType("filter", () => "filter");
addTransitionType("sort", () => "sort");
addTransitionType("pagination", () => "pagination");

function ProductList() {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("name");
  const [page, setPage] = useState(1);

  const handleFilterChange = (value) => {
    startTransition(() => {
      setFilter(value);
    });
  };

  const handleSortChange = (value) => {
    startTransition(() => {
      setSort(value);
    });
  };

  const handlePageChange = (value) => {
    startTransition(() => {
      setPage(value);
    });
  };

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => handleFilterChange(e.target.value)}
      />
      <select value={sort} onChange={(e) => handleSortChange(e.target.value)}>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
      <button onClick={() => handlePageChange(page + 1)}>Next</button>
    </div>
  );
}
```

### Ví dụ với Profiling

```jsx
import { addTransitionType, Profiler } from "react";

// Đăng ký transition types
addTransitionType("expensive", () => "expensive");
addTransitionType("cheap", () => "cheap");

function App() {
  const handleRender = (
    id,
    phase,
    actualDuration,
    startTime,
    commitTime,
    interactions,
  ) => {
    interactions.forEach((interaction) => {
      console.log(`Transition type: ${interaction.name}`);
      console.log(`Duration: ${commitTime - startTime}ms`);
    });
  };

  return (
    <Profiler id="App" onRender={handleRender}>
      <Content />
    </Profiler>
  );
}
```

### Ví dụ với Custom Tracking

```jsx
import { addTransitionType, startTransition, useEffect } from "react";

// Đăng ký transition types
addTransitionType("search", () => "search");
addTransitionType("navigation", () => "nav");

function App() {
  const [transitions, setTransitions] = useState([]);

  const trackTransition = (type) => {
    setTransitions((prev) => [...prev, { type, timestamp: Date.now() }]);
  };

  useEffect(() => {
    // Track tất cả transitions
    const observer = new PerformanceObserver((list) => {
      list.forEach((entry) => {
        if (entry.transitionType) {
          trackTransition(entry.transitionType);
        }
      });
    });
    observer.observe({ entryTypes: ["measure"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <TransitionHistory transitions={transitions} />
      <Content />
    </div>
  );
}
```

### Ví dụ với Error Tracking

```jsx
import { addTransitionType, startTransition } from "react";

// Đăng ký transition types
addTransitionType("critical", () => "critical");
addTransitionType("non-critical", () => "non-critical");

function App() {
  const [errors, setErrors] = useState([]);

  const handleTransitionError = (type) => {
    return (error) => {
      if (type === "critical") {
        console.error("Critical transition error:", error);
        setErrors((prev) => [...prev, { type, error }]);
      }
    };
  };

  return (
    <div>
      <ErrorList errors={errors} />
      <Content onError={handleTransitionError} />
    </div>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi muốn phân loại transitions
- Khi muốn track các transitions khác nhau
- Khi cần debug transition behavior
- Khi muốn optimize specific transition types

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi không cần phân loại transitions
- Khi không cần tracking
- Khi transitions đơn giản

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `addTransitionType`:

1. **No type classification**: Không thể phân loại transitions.

2. **Harder debugging**: Khó debug transition behavior.

3. **No tracking**: Không thể track specific transitions.

## Vấn đề được giải quyết / Problems Solved

### 1. Transition Classification

Phân loại các transitions khác nhau.

### 2. Debugging

Giúp debug transition behavior.

### 3. Performance Tracking

Track performance của specific transition types.

## Ưu điểm / Advantages

1. **Type classification**: Phân loại transitions.

2. **Debugging support**: Giúp debugging.

3. **Performance tracking**: Track performance.

4. **Simple API**: Dễ sử dụng.

## Nhược điểm / Disadvantages

1. **React 19+**: Chỉ hoạt động với React 19 trở lên.

2. **Manual registration**: Phải đăng ký types thủ công.

3. **Limited use cases**: Chỉ dùng cho specific scenarios.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm             | addTransitionType | Manual tracking | Profiler |
| -------------------- | ----------------- | --------------- | -------- |
| Type classification  | Có                | Có              | Có       |
| Debugging            | Có                | Có              | Có       |
| Performance tracking | Có                | Có              | Có       |
| Simple API           | Có                | Không           | Có       |

## Best Practices / Các thực hành tốt

1. **Đăng ký types sớm**:

   ```jsx
   addTransitionType("tab-switch", () => "tab");
   addTransitionType("page-nav", () => "page");
   ```

2. **Dùng meaningful names**:

   ```jsx
   addTransitionType("search", () => "search");
   addTransitionType("filter", () => "filter");
   ```

3. **Kết hợp với Profiler**:
   ```jsx
   <Profiler onRender={handleRender}>
     <Content />
   </Profiler>
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Not Registering Types

```jsx
// ❌ Không đăng ký types
startTransition(() => {
  // Không có type
});

// ✅ Đúng - đăng ký types
addTransitionType("custom", () => "custom");
startTransition(() => {
  // Có type "custom"
});
```

### 2. Using in Wrong React Version

```jsx
// ❌ Không hoạt động với React < 19
// addTransitionType chỉ có sẵn từ React 19

// ✅ Kiểm tra version
import { addTransitionType } from "react"; // React 19+
```

### 3. Not Meaningful Names

```jsx
// ❌ Không meaningful
addTransitionType("type1", () => "type1");

// ✅ Đúng - meaningful names
addTransitionType("tab-switch", () => "tab");
```

## Performance Considerations / Yếu tố hiệu suất

1. **Minimal overhead**: Có overhead nhỏ.

2. **Tracking efficiency**: Giúp optimize performance.

3. **Debugging cost**: Có cost nhỏ cho debugging.

## Browser Support / Hỗ trợ trình duyệt

`addTransitionType` hoạt động trên tất cả trình duyệt hỗ trợ React 19+.

## Câu hỏi phỏng vấn / Interview Questions

1. `addTransitionType` là gì? Khi nào nên dùng?

2. `addTransitionType` hoạt động như thế nào?

3. Làm thế nào để đăng ký transition types?

4. `addTransitionType` giúp debugging như thế nào?

5. `addTransitionType` có hoạt động với React 18 không?

6. Làm thế nào để track transitions?

7. `addTransitionType` có hoạt động với SSR không?

8. `addTransitionType` có hoạt động với TypeScript không?

9. Làm thế nào để test components với `addTransitionType`?

10. Có thể đăng ký multiple transition types không?

11. `addTransitionType` khác gì với Profiler?

12. Làm thế nào `addTransitionType` kết hợp với `startTransition`?

13. Khi nào không nên dùng `addTransitionType`?

14. `addTransitionType` có hoạt động với class components không?

15. Làm thế nào `addTransitionType` giúp với performance tracking?

## Tài liệu tham khảo / References

- [addTransitionType - React Official Docs](https://react.dev/reference/react/addTransitionType)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [Transitions - React Docs](https://react.dev/learn/react-compiler#react-automatically-memoizes)

---

_Last updated: 2026-01-31_
