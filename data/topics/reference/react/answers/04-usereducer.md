# useReducer / useReducer

## Định nghĩa / Definition

[`useReducer`](https://react.dev/reference/react/useReducer) là một hook trong React cho phép bạn quản lý state phức tạp bằng reducer pattern. Nó là một alternative cho `useState` khi state logic phức tạp và phụ thuộc vào previous state.

## Cú pháp / Syntax

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

## Tham số / Parameters

| Tham số      | Kiểu                | Mô tả                                                 |
| ------------ | ------------------- | ----------------------------------------------------- |
| `reducer`    | Function            | Function nhận `(state, action)` và trả về `nextState` |
| `initialArg` | Any                 | Giá trị ban đầu của state                             |
| `init`       | Function (optional) | Function để lazy initialize state từ `initialArg`     |

## Giá trị trả về / Return Value

Trả về một array với 2 phần tử:

| Giá trị    | Kiểu     | Mô tả                                             |
| ---------- | -------- | ------------------------------------------------- |
| `state`    | Any      | Giá trị hiện tại của state                        |
| `dispatch` | Function | Function dùng để dispatch actions để update state |

## Cách hoạt động / How it Works

### Reducer Pattern

Reducer là một pure function nhận state và action, trả về state mới:

```javascript
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}
```

### Dispatch Function

`dispatch` function nhận một action object và gọi reducer với state hiện tại:

```javascript
dispatch({ type: "INCREMENT" });
dispatch({ type: "SET_VALUE", payload: 10 });
```

### Lazy Initialization

Giống `useState`, có thể lazy initialize state:

```javascript
const [state, dispatch] = useReducer(reducer, initialCount, (count) => ({
  count: count * 2,
}));
```

### State Immutability

Reducer phải trả về state mới, không mutate state cũ:

```javascript
// ❌ Sai
function reducer(state, action) {
  state.count += 1;
  return state;
}

// ✅ Đúng
function reducer(state, action) {
  return { ...state, count: state.count + 1 };
}
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { useReducer } from "react";

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
}
```

### Ví dụ Todo List

```jsx
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "CLEAR_COMPLETED":
      return state.filter((todo) => !todo.completed);
    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch({ type: "ADD_TODO", payload: text });
      setText("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                dispatch({ type: "TOGGLE_TODO", payload: todo.id })
              }
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() =>
                dispatch({ type: "DELETE_TODO", payload: todo.id })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}>
        Clear Completed
      </button>
    </div>
  );
}
```

### Ví dụ Form State

```jsx
function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return { name: "", email: "", password: "" };
    default:
      return state;
  }
}

function LoginForm() {
  const [form, dispatch] = useReducer(formReducer, {
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (field) => (e) => {
    dispatch({ type: "SET_FIELD", field, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit:", form);
    dispatch({ type: "RESET" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.name}
        onChange={handleChange("name")}
        placeholder="Name"
      />
      <input
        value={form.email}
        onChange={handleChange("email")}
        placeholder="Email"
      />
      <input
        value={form.password}
        onChange={handleChange("password")}
        type="password"
        placeholder="Password"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Ví dụ với Context

```jsx
import { createContext, useContext, useReducer } from "react";

const CounterContext = createContext();

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

function useCounter() {
  return useContext(CounterContext);
}

function Counter() {
  const { state, dispatch } = useCounter();

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
    </div>
  );
}
```

### Ví dụ với TypeScript

```tsx
interface State {
  count: number;
}

type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET_VALUE"; payload: number };

function counterReducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "SET_VALUE":
      return { count: action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer<State, Action>(counterReducer, {
    count: 0,
  });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "SET_VALUE", payload: 0 })}>
        Reset
      </button>
    </div>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi state logic phức tạp và phụ thuộc vào previous state
- Khi có nhiều sub-values của state liên quan đến nhau
- Khi state updates dựa trên actions thay vì trực tiếp set values
- Khi cần predictability và testability (reducer là pure function)
- Khi muốn migrate từ Redux hoặc dùng Redux-like pattern

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi state đơn giản và không phụ thuộc vào previous state (dùng `useState`)
- Khi chỉ có một hoặc vài state values không liên quan
- Khi cần update state trực tiếp mà không qua actions

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `useReducer`, bạn sẽ gặp các vấn đề sau:

1. **State logic phức tạp**: Với `useState`, state updates logic có thể trở nên rối rắm và khó maintain.

2. **Không có predictability**: `useState` không có pattern rõ ràng để quản lý state updates.

3. **Khó test**: `useState` logic khó test hơn reducer functions.

4. **Không có action pattern**: Không có cách nào để chuẩn hóa state updates.

## Vấn đề được giải quyết / Problems Solved

### 1. Complex State Logic

`useReducer` giúp tổ chức state logic phức tạp vào reducer function, làm code dễ đọc và maintain hơn.

### 2. Predictable State Updates

Reducer pattern cho phép state updates predictable và dễ test vì reducer là pure function.

### 3. Action Pattern

Dispatch action pattern giúp chuẩn hóa state updates, dễ debug và trace.

### 4. Redux-like Pattern

`useReducer` cho phép dùng Redux-like pattern mà không cần external library.

## Ưu điểm / Advantages

1. **Predictable state updates**: Reducer là pure function, dễ test và debug.

2. **Action pattern**: Chuẩn hóa state updates qua actions.

3. **Complex state logic**: Giúp tổ chức state logic phức tạp.

4. **Testability**: Reducer functions dễ test vì là pure functions.

5. **Context integration**: Dễ dàng tích hợp với Context để chia sẻ state.

## Nhược điểm / Disadvantages

1. **Boilerplate code**: Cần viết reducer function và action types, code dài hơn.

2. **Learning curve**: Cần hiểu reducer pattern và action types.

3. **Overkill cho simple state**: Không phù hợp cho state đơn giản.

4. **Less intuitive**: Khó hiểu hơn `useState` cho người mới bắt đầu.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm       | useReducer | useState   | Redux    | Zustand  |
| -------------- | ---------- | ---------- | -------- | -------- |
| Độ phức tạp    | Trung bình | Đơn giản   | Phức tạp | Đơn giản |
| Predictable    | Có         | Không      | Có       | Có       |
| Testability    | Tốt        | Trung bình | Tốt      | Tốt      |
| Learning curve | Trung bình | Thấp       | Cao      | Thấp     |
| Boilerplate    | Trung bình | Thấp       | Cao      | Thấp     |
| Global state   | Không      | Không      | Có       | Có       |

## Best Practices / Các thực hành tốt

1. **Giữ reducer pure**:

   ```javascript
   // ✅ Đúng - pure function
   function reducer(state, action) {
     return { ...state, count: state.count + 1 };
   }
   ```

2. **Dùng action types constants**:

   ```javascript
   const ACTIONS = {
     INCREMENT: "INCREMENT",
     DECREMENT: "DECREMENT",
   };
   ```

3. **Tách biệt reducers theo mục đích**:

   ```javascript
   // Tốt hơn là một reducer lớn
   const counterReducer = (state, action) => {
     /* ... */
   };
   const todoReducer = (state, action) => {
     /* ... */
   };
   ```

4. **Dùng TypeScript để type state và actions**:

   ```typescript
   type Action = { type: "INCREMENT" } | { type: "DECREMENT" };
   ```

5. **Dùng combineReducers cho nhiều reducers**:
   ```javascript
   function combineReducers(reducers) {
     return (state, action) => {
       return Object.keys(reducers).reduce((nextState, key) => {
         nextState[key] = reducers[key](state[key], action);
         return nextState;
       }, {});
     };
   }
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Mutating State

```javascript
// ❌ Sai
function reducer(state, action) {
  state.count += 1;
  return state;
}

// ✅ Đúng
function reducer(state, action) {
  return { ...state, count: state.count + 1 };
}
```

### 2. Not Returning Default State

```javascript
// ❌ Sai
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
  }
}

// ✅ Đúng
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    default:
      return state;
  }
}
```

### 3. Complex Reducer Logic

```javascript
// ❌ Sai - reducer quá phức tạp
function reducer(state, action) {
  switch (action.type) {
    case "COMPLEX_ACTION":
      // 100 lines of logic
      return newState;
  }
}

// ✅ Đúng - tách logic thành helper functions
function handleComplexAction(state, action) {
  // helper logic
}

function reducer(state, action) {
  switch (action.type) {
    case "COMPLEX_ACTION":
      return handleComplexAction(state, action);
  }
}
```

## Performance Considerations / Yếu tố hiệu suất

1. **Reducer là pure function**: Không có side effects, dễ optimize.

2. **Dispatch batching**: React batches dispatch calls để tối ưu hiệu suất.

3. **Context integration**: Dùng `useReducer` với Context giúp giảm re-render.

## Câu hỏi phỏng vấn / Interview Questions

1. `useReducer` là gì? Khi nào nên dùng?

2. Khi nào nên dùng `useReducer` thay vì `useState`?

3. Reducer function hoạt động như thế nào?

4. Dispatch function hoạt động như thế nào?

5. Lazy initialization trong `useReducer` là gì?

6. State immutability trong reducer là gì?

7. Làm thế nào để combine nhiều reducers?

8. Sự khác biệt giữa `useReducer` và Redux?

9. Làm thế nào để test reducer functions?

10. Làm thế nào để type reducer với TypeScript?

11. Làm thế nào để integrate `useReducer` với Context?

12. Action pattern là gì? Tại sao quan trọng?

13. Làm thế nào để handle async actions với `useReducer`?

14. Làm thế nào để debug reducer?

15. Làm thế nào để optimize reducer performance?

## Tài liệu tham khảo / References

- [useReducer - React Official Docs](https://react.dev/reference/react/useReducer)
- [Extracting State Logic into a Reducer - React Official Docs](https://react.dev/learn/extracting-state-logic-into-a-reducer)
- [Scaling Up with Reducer and Context - React Official Docs](https://react.dev/learn/scaling-up-with-reducer-and-context)

---

_Last updated: 2026-01-31_
