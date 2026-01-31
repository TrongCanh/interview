# act / act

## Định nghĩa / Definition

[`act`](https://react.dev/reference/react/act) là một API trong React cho phép bạn **wrap updates** trong tests để đảm bảo các updates được xử lý trước khi assertions. Nó giúp viết tests reliable hơn.

## Cú pháp / Syntax

```javascript
act(() => {
  // code thực hiện updates
});
```

Hoặc với async:

```javascript
await act(async () => {
  // async code
});
```

## Tham số / Parameters

| Tham số    | Kiểu       | Mô tả                                |
| ---------- | ---------- | ------------------------------------ |
| `callback` | `function` | Function chứa các updates muốn wrap. |

## Giá trị trả về / Return Value

Trả về Promise resolve khi tất cả updates được xử lý.

## Cách hoạt động / How it Works

### Flush Updates

`act` đảm bảo tất cả React updates được **flushed** trước khi assertions chạy:

```
act(() => {
  // Trigger updates
  fireEvent.click(button);
});
// Tất cả updates được flush
// Bây giờ có thể assertions
expect(screen.getByText("Clicked")).toBeInTheDocument();
```

### Async Updates

Với async updates, dùng `await act()`:

```javascript
await act(async () => {
  await user.click();
});
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}

test("increments count", () => {
  render(<Counter />);

  act(() => {
    fireEvent.click(screen.getByText("Increment"));
  });

  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});
```

### Ví dụ với Async Updates

```jsx
import { render, screen, act } from "@testing-library/react";

function AsyncCounter() {
  const [count, setCount] = useState(0);

  const incrementAsync = async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    setCount((c) => c + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementAsync}>Increment</button>
    </div>
  );
}

test("increments count asynchronously", async () => {
  render(<AsyncCounter />);

  await act(async () => {
    await screen.getByText("Increment").click();
  });

  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});
```

### Ví dụ với Form

```jsx
import { render, screen, act } from "@testing-library/react";

function ContactForm() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return <div>Thank you, {name}!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

test("submits form", () => {
  render(<ContactForm />);

  act(() => {
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John" },
    });
    fireEvent.click(screen.getByText("Submit"));
  });

  expect(screen.getByText("Thank you, John!")).toBeInTheDocument();
});
```

### Ví dụ với useEffect

```jsx
import { render, screen, act } from "@testing-library/react";

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return <div>Data: {data}</div>;
}

test("fetches and displays data", async () => {
  render(<DataFetcher />);

  await act(async () => {
    // Chờ cho useEffect chạy
    await new Promise((resolve) => setTimeout(resolve, 100));
  });

  expect(screen.getByText(/Data:/)).toBeInTheDocument();
});
```

### Ví dụ với Multiple Updates

```jsx
import { render, screen, act } from "@testing-library/react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
    </div>
  );
}

test("handles multiple updates", () => {
  render(<Counter />);

  act(() => {
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("-"));
  });

  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});
```

### Ví dụ với userEvent

```jsx
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function InputForm() {
  const [value, setValue] = useState("");

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <p>Value: {value}</p>
    </div>
  );
}

test("types into input", async () => {
  render(<InputForm />);
  const input = screen.getByRole("textbox");

  await act(async () => {
    await userEvent.type(input, "Hello");
  });

  expect(screen.getByText("Value: Hello")).toBeInTheDocument();
});
```

## Khi nào nên dùng / When to Use

- Khi viết tests cho React components
- Khi cần đảm bảo updates được flush trước khi assertions
- Khi testing async operations
- Khi testing form submissions
- Khi testing user interactions

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi không testing React components
- Khi không có state updates
- Khi testing library tự động wrap với `act`

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `act`:

1. **Flaky tests**: Tests có thể fail vì updates chưa được flush.

2. **Race conditions**: Assertions có thể chạy trước khi updates hoàn tất.

3. **Hard to debug**: Khó biết tại sao tests fail.

## Vấn đề được giải quyết / Problems Solved

### 1. Reliable Tests

Đảm bảo updates được flush trước khi assertions.

### 2. Async Handling

Xử lý async operations trong tests.

### 3. State Updates

Đảm bảo state updates được apply trước khi assertions.

## Ưu điểm / Advantages

1. **Reliable tests**: Tests reliable hơn.

2. **Automatic flushing**: Tự động flush updates.

3. **Async support**: Hỗ trợ async operations.

4. **Simple API**: Dễ sử dụng.

## Nhược điểm / Disadvantages

1. **Extra wrapping**: Phải wrap code với `act`.

2. **Learning curve**: Cần hiểu về React rendering.

3. **Not always needed**: Một số testing libraries tự động wrap.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm      | act    | waitFor | findBy |
| ------------- | ------ | ------- | ------ |
| Manual wrap   | Có     | Không   | Không  |
| Reliable      | Có     | Có      | Có     |
| Async support | Có     | Có      | Có     |
| Control       | Đầy đủ | Có      | Có     |

## Best Practices / Các thực hành tốt

1. **Dùng với userEvent**:

   ```jsx
   await act(async () => {
     await userEvent.click(button);
   });
   ```

2. **Wrap all updates**:

   ```jsx
   act(() => {
     fireEvent.click(button);
     fireEvent.change(input, { target: { value: "test" } });
   });
   ```

3. **Dùng await cho async**:

   ```jsx
   await act(async () => {
     await asyncOperation();
   });
   ```

4. **Testing Library hỗ trợ**:
   ```jsx
   // RTL tự động wrap với act
   render(<Component />);
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Not Wrapping Updates

```jsx
// ❌ Sai - không wrap với act
fireEvent.click(button);
expect(screen.getByText("Clicked")).toBeInTheDocument();

// ✅ Đúng - wrap với act
act(() => {
  fireEvent.click(button);
});
expect(screen.getByText("Clicked")).toBeInTheDocument();
```

### 2. Not Using await for Async

```jsx
// ❌ Sai - không await
act(async () => {
  await asyncOperation();
});
expect(screen.getByText("Done")).toBeInTheDocument();

// ✅ Đúng - có await
await act(async () => {
  await asyncOperation();
});
expect(screen.getByText("Done")).toBeInTheDocument();
```

### 3. Double Wrapping

```jsx
// ❌ Sai - double wrap
act(() => {
  act(() => {
    fireEvent.click(button);
  });
});

// ✅ Đúng - chỉ wrap một lần
act(() => {
  fireEvent.click(button);
});
```

### 4. Forgetting act with RTL

```jsx
// ❌ Không cần - RTL tự động wrap
act(() => {
  render(<Component />);
});

// ✅ Đúng - RTL tự động wrap
render(<Component />);
```

## Performance Considerations / Yếu tố hiệu suất

1. **Minimal overhead**: Có overhead nhỏ.

2. **Test reliability**: Tăng reliability của tests.

3. **Flushing efficiency**: Flush updates hiệu quả.

## Browser Support / Hỗ trợ trình duyệt

`act` hoạt động trên tất cả môi trường testing (Node.js, browsers).

## Câu hỏi phỏng vấn / Interview Questions

1. `act` là gì? Khi nào nên dùng?

2. `act` hoạt động như thế nào?

3. Tại sao cần dùng `act` trong tests?

4. Sự khác biệt giữa `act` và `await act`?

5. `act` có hoạt động với async operations không?

6. Làm thế nào `act` giúp viết reliable tests?

7. `act` có hoạt động với userEvent không?

8. `act` có hoạt động với SSR không?

9. Làm thế nào để test async operations với `act`?

10. `act` có hoạt động với TypeScript không?

11. Làm thế nào để debug tests với `act`?

12. Testing Library có tự động wrap với `act` không?

13. Có thể nest `act` không?

14. Khi nào không cần dùng `act`?

15. Làm thế nào `act` giúp với form testing?

## Tài liệu tham khảo / References

- [act - React Official Docs](https://react.dev/reference/react/act)
- [Testing Library - React Docs](https://react.dev/learn/testing)
- [Testing Library React - GitHub](https://github.com/testing-library/react-testing-library)

---

_Last updated: 2026-01-31_
