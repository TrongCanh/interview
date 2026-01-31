# useState / useState

## Định nghĩa / Definition

[`useState`](https://react.dev/reference/react/useState) là một hook trong React cho phép bạn thêm state vào functional components. State là dữ liệu có thể thay đổi theo thời gian và khi state thay đổi, component sẽ re-render để hiển thị giá trị mới.

## Cú pháp / Syntax

```javascript
const [state, setState] = useState(initialState);
```

## Tham số / Parameters

| Tham số        | Kiểu | Mô tả                                                                                                               |
| -------------- | ---- | ------------------------------------------------------------------------------------------------------------------- |
| `initialState` | Any  | Giá trị ban đầu của state. Có thể là giá trị bất kỳ hoặc một function trả về giá trị ban đầu (lazy initialization). |

## Giá trị trả về / Return Value

Trả về một array với 2 phần tử:

| Giá trị    | Kiểu     | Mô tả                                                                                   |
| ---------- | -------- | --------------------------------------------------------------------------------------- |
| `state`    | Any      | Giá trị hiện tại của state. Trả về giá trị ban đầu trong lần render đầu tiên.           |
| `setState` | Function | Function dùng để cập nhật state. Khi gọi, component sẽ re-render với giá trị state mới. |

## Cách hoạt động / How it Works

### Batching (React 18+)

Trong React 18, các state updates được **batched** (gom nhóm) tự động để tối ưu hiệu suất. Khi có nhiều state updates trong cùng một event handler hoặc effect, React sẽ gom chúng lại và chỉ re-render một lần.

```javascript
function handleClick() {
  setCount((c) => c + 1); // Chưa re-render
  setName("React"); // Chưa re-render
  // React gom cả 2 updates và re-render một lần
}
```

### Functional Updates

Khi state mới phụ thuộc vào state cũ, bạn nên dùng **functional update**:

```javascript
// ❌ Sai - có thể bị stale closure
setCount(count + 1);

// ✅ Đúng - luôn dùng giá trị mới nhất
setCount((prevCount) => prevCount + 1);
```

### Lazy Initialization

Nếu giá trị ban đầu tốn kém tính toán, dùng lazy initialization:

```javascript
// ❌ Sai - tính toán mỗi lần render
const [state, setState] = useState(expensiveComputation());

// ✅ Đúng - chỉ tính toán một lần
const [state, setState] = useState(() => expensiveComputation());
```

### Object và Array Updates

State trong React là **immutable** - bạn phải tạo object/array mới thay vì mutate:

```javascript
// ❌ Sai - mutate state
state.name = "React";
setState(state);

// ✅ Đúng - tạo object mới
setState({ ...state, name: "React" });

// ❌ Sai - mutate array
state.push("new item");
setState(state);

// ✅ Đúng - tạo array mới
setState([...state, "new item"]);
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### Ví dụ với Object State

```jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: "John",
    age: 30,
    email: "john@example.com",
  });

  const updateName = (newName) => {
    setUser((prev) => ({ ...prev, name: newName }));
  };

  const updateAge = (newAge) => {
    setUser((prev) => ({ ...prev, age: newAge }));
  };

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
      <button onClick={() => updateName("Jane")}>Change Name</button>
      <button onClick={() => updateAge(25)}>Change Age</button>
    </div>
  );
}
```

### Ví dụ với Array State

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build apps" },
  ]);

  const addTodo = (text) => {
    setTodos((prev) => [...prev, { id: Date.now(), text }]);
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)),
    );
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
            <button onClick={() => updateTodo(todo.id, "Updated")}>
              Update
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => addTodo("New todo")}>Add Todo</button>
    </div>
  );
}
```

### Ví dụ với Lazy Initialization

```jsx
function ExpensiveComponent() {
  // Chỉ tính toán một lần khi component mount
  const [data, setData] = useState(() => {
    console.log("Expensive computation running...");
    return Array.from({ length: 10000 }, (_, i) => i * i);
  });

  return <div>Count: {data.length}</div>;
}
```

### Ví dụ với Multiple State

```jsx
function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi component cần lưu trữ dữ liệu có thể thay đổi theo thời gian
- Khi component cần re-render khi dữ liệu thay đổi
- Khi cần lưu trữ form input values
- Khi cần lưu trữ UI state (modal open/close, active tab, v.v.)
- Khi cần lưu trữ data fetched từ API

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi dữ liệu không thay đổi (dùng prop hoặc constant)
- Khi cần chia sẻ state giữa nhiều components (dùng Context hoặc state management library)
- Khi cần lưu trữ dữ liệu không liên quan đến UI (dùng useRef hoặc external store)
- Khi cần lưu trữ data cần persist qua reload (dùng localStorage hoặc database)

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `useState`, bạn sẽ gặp các vấn đề sau:

1. **Không thể lưu trữ state trong functional components**: Functional components không có instance variables như class components, nên không có cách nào để lưu trữ state giữa các renders.

2. **Không thể re-render khi dữ liệu thay đổi**: Component sẽ không biết khi nào cần cập nhật UI.

3. **Phải dùng class components**: Bạn sẽ phải quay lại dùng class components với `this.state` và lifecycle methods, code dài hơn và khó đọc hơn.

4. **Không có batching tự động**: Mỗi state update sẽ trigger re-render riêng, dẫn đến hiệu suất kém.

## Vấn đề được giải quyết / Problems Solved

### 1. State trong Functional Components

Trước React 16.8, chỉ có class components có thể có state. `useState` cho phép functional components có state, làm code ngắn gọn hơn và dễ đọc hơn.

### 2. Batching Tự động

React 18 tự động batch các state updates để tối ưu hiệu suất, giảm số lần re-render không cần thiết.

### 3. Lazy Initialization

Giúp tránh tính toán tốn kém mỗi lần render, chỉ tính toán một lần khi component mount.

### 4. Functional Updates

Giảm lỗi do stale closures, đảm bảo luôn dùng giá trị state mới nhất khi update.

## Ưu điểm / Advantages

1. **Đơn giản và dễ dùng**: Cú pháp đơn giản, dễ hiểu cho người mới bắt đầu.

2. **Functional updates**: Giảm lỗi do stale closures.

3. **Lazy initialization**: Tối ưu hiệu suất với expensive initial values.

4. **Batching tự động**: React 18 tự động batch updates để tối ưu hiệu suất.

5. **TypeScript support**: Tốt với TypeScript, có thể type state values.

6. **Không cần this**: Không cần dùng `this.state` như class components.

## Nhược điểm / Disadvantages

1. **Không chia sẻ được giữa components**: State chỉ local trong component, cần Context hoặc state management library để chia sẻ.

2. **Re-render toàn bộ component**: Khi state thay đổi, component và tất cả children sẽ re-render (trừ khi dùng React.memo).

3. **Async updates**: State updates là async, có thể dẫn đến lỗi nếu không hiểu rõ.

4. **Khó quản lý state phức tạp**: Với state phức tạp, code có thể trở nên rối rắm.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm          | useState       | useReducer     | useRef                      | Context       |
| ----------------- | -------------- | -------------- | --------------------------- | ------------- |
| Độ phức tạp       | Đơn giản       | Phức tạp       | Đơn giản                    | Trung bình    |
| State phức tạp    | Không tốt      | Tốt            | Không tốt                   | Trung bình    |
| Chia sẻ state     | Không          | Không          | Không                       | Có            |
| Trigger re-render | Có             | Có             | Không                       | Có            |
| Dùng cho          | State đơn giản | State phức tạp | Lưu giá trị không re-render | Chia sẻ state |

## Best Practices / Các thực hành tốt

1. **Dùng functional updates khi state mới phụ thuộc state cũ**:

   ```javascript
   setCount((prev) => prev + 1);
   ```

2. **Dùng lazy initialization cho expensive values**:

   ```javascript
   useState(() => expensiveComputation());
   ```

3. **Giữ state đơn giản và chia nhỏ nếu cần**:

   ```javascript
   // Tốt hơn là dùng một object lớn
   const [name, setName] = useState("");
   const [age, setAge] = useState(0);
   ```

4. **Không mutate state trực tiếp**:

   ```javascript
   // ❌ Sai
   state.name = "React";
   // ✅ Đúng
   setState({ ...state, name: "React" });
   ```

5. **Dùng TypeScript để type state**:
   ```typescript
   const [count, setCount] = useState<number>(0);
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Mutating State Directly

```javascript
// ❌ Sai
state.push("new item");
setState(state);

// ✅ Đúng
setState([...state, "new item"]);
```

### 2. Using Stale State in Updates

```javascript
// ❌ Sai - có thể dùng giá trị cũ
setCount(count + 1);
setCount(count + 1);

// ✅ Đúng - luôn dùng giá trị mới nhất
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

### 3. Calling setState in Render

```javascript
// ❌ Sai - infinite loop
const [count, setCount] = useState(0);
setCount(count + 1);

// ✅ Đúng - chỉ gọi trong event handler hoặc effect
useEffect(() => {
  setCount(1);
}, []);
```

### 4. Not Handling Asynchronous Updates

```javascript
// ❌ Sai - count có thể cũ
const handleClick = () => {
  setCount(count + 1);
  console.log(count); // có thể in ra giá trị cũ
};

// ✅ Đúng - dùng functional update hoặc useEffect
const handleClick = () => {
  setCount((prev) => {
    const newCount = prev + 1;
    console.log(newCount); // luôn in ra giá trị mới
    return newCount;
  });
};
```

## Performance Considerations / Yếu tố hiệu suất

1. **Batching**: React 18 tự động batch state updates trong event handlers và effects để giảm số lần re-render.

2. **Lazy initialization**: Chỉ tính toán expensive initial values một lần khi component mount.

3. **Re-render**: Mỗi state update sẽ trigger re-render của component và children. Dùng `React.memo` để tránh re-render không cần thiết.

4. **Object/Array updates**: Tạo object/array mới có thể tốn kém với large data. Dùng `useImmer` hoặc libraries khác để đơn giản hóa immutable updates.

## Câu hỏi phỏng vấn / Interview Questions

1. `useState` là gì? Khi nào nên dùng?

2. `useState` hoạt động như thế nào bên trong (batching, re-render)?

3. Functional updates trong `useState` là gì? Khi nào cần?

4. Lazy initialization là gì? Khi nào dùng?

5. Batching trong React 18 (Automatic Batching) là gì?

6. Tại sao `setState` không cập nhật state ngay lập tức?

7. Object và Array updates trong React (immutability) là gì?

8. Sự khác biệt giữa `useState` và `useReducer`?

9. Khi nào nên dùng nhiều `useState` thay vì một object?

10. Làm thế nào để update object state mà không mutate?

11. Làm thế nào để update array state mà không mutate?

12. Stale closure là gì? Làm thế nào để tránh?

13. Khi nào nên dùng lazy initialization?

14. `useState` có trigger re-render không?

15. Làm thế nào để reset state về giá trị ban đầu?

## Tài liệu tham khảo / References

- [useState - React Official Docs](https://react.dev/reference/react/useState)
- [Managing State - React Official Docs](https://react.dev/learn/state-a-components-memory)
- [Updating Objects in State - React Official Docs](https://react.dev/learn/updating-objects-in-state)
- [Updating Arrays in State - React Official Docs](https://react.dev/learn/updating-arrays-in-state)

---

_Last updated: 2026-01-31_
