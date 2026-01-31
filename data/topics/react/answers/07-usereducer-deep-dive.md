# 7. useReducer - Deep Dive / useReducer - Đào sâu

## Khi nào nên dùng `useReducer` thay vì `useState`?

### Trả lời / Answer:

### Quy tắc chung:

1. **Dùng `useState` khi:**
   - State đơn giản (primitive values)
   - State updates độc lập
   - Ít state logic phức tạp

2. **Dùng `useReducer` khi:**
   - State phức tạp (objects, arrays)
   - State updates phụ thuộc vào state trước đó
   - Nhiều action types
   - Cần test business logic riêng biệt

---

### So sánh chi tiết:

| Đặc điểm       | useState       | useReducer    |
| -------------- | -------------- | ------------- |
| State đơn giản | ✅ Tốt         | ⚠️ Overkill   |
| State phức tạp | ❌ Khó quản lý | ✅ Tốt        |
| Test logic     | ❌ Khó         | ✅ Dễ         |
| Predictability | ❌ Có thể khó  | ✅ Dễ dự đoán |
| Boilerplate    | Ít             | Nhiều         |

---

### Ví dụ thực tế / Practical Example:

```jsx
// ❌ useState - State phức tạp
function TodoListBad() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTodo = (text) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const setFilterAll = () => setFilter("all");
  const setFilterActive = () => setFilter("active");
  const setFilterCompleted = () => setFilter("completed");

  // ... nhiều setter functions
}
```

```jsx
// ✅ useReducer - State phức tạp
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

function TodoListGood() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: "all",
    loading: false,
    error: null,
  });

  const addTodo = (text) => dispatch({ type: "ADD_TODO", payload: text });
  const toggleTodo = (id) => dispatch({ type: "TOGGLE_TODO", payload: id });
  const removeTodo = (id) => dispatch({ type: "REMOVE_TODO", payload: id });
  const setFilter = (filter) =>
    dispatch({ type: "SET_FILTER", payload: filter });
  const setLoading = (loading) =>
    dispatch({ type: "SET_LOADING", payload: loading });
  const setError = (error) => dispatch({ type: "SET_ERROR", payload: error });

  // Logic rõ ràng hơn
}
```

---

### Ví dụ với nhiều related state:

```jsx
// Form state với useState
function FormBad() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await submitForm(values);
    } catch (error) {
      setErrors(error);
    } finally {
      setSubmitting(false);
    }
  };
}
```

```jsx
// Form state với useReducer
function formReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: action.error },
      };

    case "BLUR":
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true },
      };

    case "SUBMIT_START":
      return { ...state, submitting: true };

    case "SUBMIT_SUCCESS":
      return {
        ...state,
        submitting: false,
        values: {},
        errors: {},
        touched: {},
      };

    case "SUBMIT_ERROR":
      return { ...state, submitting: false, errors: action.errors };

    default:
      return state;
  }
}

function FormGood() {
  const [state, dispatch] = useReducer(formReducer, {
    values: {},
    errors: {},
    touched: {},
    submitting: false,
  });

  const handleChange = (field, value) => {
    const error = validate(field, value);
    dispatch({ type: "CHANGE", field, value, error });
  };

  const handleBlur = (field) => {
    dispatch({ type: "BLUR", field });
  };

  const handleSubmit = async () => {
    dispatch({ type: "SUBMIT_START" });
    try {
      await submitForm(state.values);
      dispatch({ type: "SUBMIT_SUCCESS" });
    } catch (error) {
      dispatch({ type: "SUBMIT_ERROR", errors: error });
    }
  };
}
```

---

## Cấu trúc của reducer?

### Trả lời / Answer:

### Cấu trúc cơ bản:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "ACTION_TYPE_1":
      return { ...state /* new state */ };

    case "ACTION_TYPE_2":
      return { ...state /* new state */ };

    default:
      return state;
  }
}
```

---

### Các thành phần:

1. **State:**
   - Trạng thái hiện tại
   - Có thể là bất kỳ giá trị nào (object, array, primitive)

2. **Action:**
   - Object với `type` (bắt buộc)
   - Có thể có `payload` (tùy chọn)

3. **Return:**
   - Phải trả về state mới
   - Không mutate state cũ (immutability)

---

### Ví dụ thực tế / Practical Example:

```jsx
// Counter reducer
function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };

    case "DECREMENT":
      return { count: state.count - 1 };

    case "INCREMENT_BY":
      return { count: state.count + action.payload };

    case "RESET":
      return { count: 0 };

    default:
      return state;
  }
}

// Usage
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "INCREMENT_BY", payload: 10 })}>
        +10
      </button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
}
```

---

### Action creators:

```jsx
// Action creators giúp tạo action dễ hơn
const counterActions = {
  increment: () => ({ type: "INCREMENT" }),
  decrement: () => ({ type: "DECREMENT" }),
  incrementBy: (amount) => ({ type: "INCREMENT_BY", payload: amount }),
  reset: () => ({ type: "RESET" }),
};

// Usage
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch(counterActions.increment())}>+</button>
      <button onClick={() => dispatch(counterActions.decrement())}>-</button>
      <button onClick={() => dispatch(counterActions.incrementBy(10))}>
        +10
      </button>
      <button onClick={() => dispatch(counterActions.reset())}>Reset</button>
    </div>
  );
}
```

---

### Reducer với initial state:

```jsx
// Initial state
const initialState = {
  todos: [],
  filter: "all",
  loading: false,
  error: null,
};

// Reducer
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

// Usage with initial state
function TodoList() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // ...
}
```

---

### Reducer với lazy initialization:

```jsx
// Lazy initialization - chỉ chạy 1 lần
function init(initialCount) {
  return { count: initialCount };
}

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    default:
      return state;
  }
}

// Usage
function Counter({ initialCount = 0 }) {
  const [state, dispatch] = useReducer(counterReducer, initialCount, init);

  return <p>Count: {state.count}</p>;
}
```

---

## `useReducer` với Context?

### Trả lời / Answer:

**useReducer với Context** là pattern phổ biến để quản lý global state mà không cần Redux.

### Cấu trúc:

```jsx
// 1. Tạo Context
const StateContext = createContext();
const DispatchContext = createContext();

// 2. Tạo Provider
function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// 3. Tạo custom hooks
function useState() {
  return useContext(StateContext);
}

function useDispatch() {
  return useContext(DispatchContext);
}
```

---

### Ví dụ thực tế / Practical Example:

```jsx
// Counter Context với useReducer
const CounterStateContext = createContext();
const CounterDispatchContext = createContext();

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

function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <CounterStateContext.Provider value={state}>
      <CounterDispatchContext.Provider value={dispatch}>
        {children}
      </CounterDispatchContext.Provider>
    </CounterStateContext.Provider>
  );
}

function useCounterState() {
  const context = useContext(CounterStateContext);
  if (!context) {
    throw new Error("useCounterState must be used within CounterProvider");
  }
  return context;
}

function useCounterDispatch() {
  const context = useContext(CounterDispatchContext);
  if (!context) {
    throw new Error("useCounterDispatch must be used within CounterProvider");
  }
  return context;
}

// Usage
function App() {
  return (
    <CounterProvider>
      <CounterDisplay />
      <CounterControls />
    </CounterProvider>
  );
}

function CounterDisplay() {
  const { count } = useCounterState();
  return <p>Count: {count}</p>;
}

function CounterControls() {
  const dispatch = useCounterDispatch();

  return (
    <div>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
}
```

---

### Todo List với useReducer + Context:

```jsx
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();

const initialState = {
  todos: [],
  filter: "all",
  loading: false,
  error: null,
};

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error("useTodoState must be used within TodoProvider");
  }
  return context;
}

function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error("useTodoDispatch must be used within TodoProvider");
  }
  return context;
}

// Usage
function App() {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
}

function TodoList() {
  const { todos, filter } = useTodoState();
  const dispatch = useTodoDispatch();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div>
      <TodoFilter />
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <AddTodo />
    </div>
  );
}

function TodoItem({ todo }) {
  const dispatch = useTodoDispatch();

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}
      />
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.text}
      </span>
      <button
        onClick={() => dispatch({ type: "REMOVE_TODO", payload: todo.id })}
      >
        Remove
      </button>
    </li>
  );
}

function TodoFilter() {
  const { filter } = useTodoState();
  const dispatch = useTodoDispatch();

  return (
    <div>
      <button
        onClick={() => dispatch({ type: "SET_FILTER", payload: "all" })}
        disabled={filter === "all"}
      >
        All
      </button>
      <button
        onClick={() => dispatch({ type: "SET_FILTER", payload: "active" })}
        disabled={filter === "active"}
      >
        Active
      </button>
      <button
        onClick={() => dispatch({ type: "SET_FILTER", payload: "completed" })}
        disabled={filter === "completed"}
      >
        Completed
      </button>
    </div>
  );
}

function AddTodo() {
  const [text, setText] = useState("");
  const dispatch = useTodoDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({ type: "ADD_TODO", payload: text });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}
```

---

## Reducer composition?

### Trả lời / Answer:

**Reducer composition** là kỹ thuật chia nhỏ reducer thành các reducer nhỏ hơn, sau đó combine lại.

### Cấu trúc:

```jsx
// Reducer nhỏ
function todosReducer(state, action) {
  // ...
}

function filterReducer(state, action) {
  // ...
}

// Combine reducers
function rootReducer(state, action) {
  return {
    todos: todosReducer(state.todos, action),
    filter: filterReducer(state.filter, action),
  };
}
```

---

### Ví dụ thực tế / Practical Example:

```jsx
// Todos reducer
function todosReducer(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];

    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );

    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload);

    default:
      return state;
  }
}

// Filter reducer
function filterReducer(state = "all", action) {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
}

// Loading reducer
function loadingReducer(state = false, action) {
  switch (action.type) {
    case "SET_LOADING":
      return action.payload;
    default:
      return state;
  }
}

// Error reducer
function errorReducer(state = null, action) {
  switch (action.type) {
    case "SET_ERROR":
      return action.payload;
    case "CLEAR_ERROR":
      return null;
    default:
      return state;
  }
}

// Combine reducers
function rootReducer(state, action) {
  return {
    todos: todosReducer(state.todos, action),
    filter: filterReducer(state.filter, action),
    loading: loadingReducer(state.loading, action),
    error: errorReducer(state.error, action),
  };
}

// Usage
function TodoApp() {
  const [state, dispatch] = useReducer(rootReducer, {
    todos: [],
    filter: "all",
    loading: false,
    error: null,
  });

  // ...
}
```

---

### Helper function để combine reducers:

```jsx
function combineReducers(reducers) {
  return (state = {}, action) => {
    const newState = {};
    let hasChanged = false;

    for (const key in reducers) {
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);

      newState[key] = nextStateForKey;

      if (nextStateForKey !== previousStateForKey) {
        hasChanged = true;
      }
    }

    return hasChanged ? newState : state;
  };
}

// Usage
const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
  loading: loadingReducer,
  error: errorReducer,
});
```

---

## Middleware pattern với `useReducer`?

### Trả lời / Answer:

**Middleware pattern** với `useReducer` cho phép thêm logic trước/nhau khi dispatch action.

### Cấu trúc:

```jsx
function withMiddleware(reducer, middlewares) {
  return (state, action) => {
    // Chạy middlewares
    middlewares.forEach((middleware) => {
      middleware(action, state);
    });

    // Chạy reducer
    return reducer(state, action);
  };
}
```

---

### Ví dụ thực tế / Practical Example:

```jsx
// Logger middleware
function loggerMiddleware(action, state) {
  console.log("Action:", action);
  console.log("Previous state:", state);
}

// Analytics middleware
function analyticsMiddleware(action, state) {
  if (action.type === "ADD_TODO") {
    analytics.track("todo_added", {
      text: action.payload,
    });
  }
}

// Error handling middleware
function errorHandlingMiddleware(action, state) {
  if (action.type === "SET_ERROR") {
    Sentry.captureException(action.payload);
  }
}

// Wrap reducer with middleware
function createEnhancedReducer(reducer, middlewares = []) {
  return (state, action) => {
    // Chạy middlewares trước
    middlewares.forEach((middleware) => {
      try {
        middleware(action, state);
      } catch (error) {
        console.error("Middleware error:", error);
      }
    });

    // Chạy reducer
    return reducer(state, action);
  };
}

// Usage
const enhancedReducer = createEnhancedReducer(todoReducer, [
  loggerMiddleware,
  analyticsMiddleware,
  errorHandlingMiddleware,
]);

function TodoApp() {
  const [state, dispatch] = useReducer(enhancedReducer, initialState);

  // ...
}
```

---

### Async middleware:

```jsx
// Async middleware wrapper
function createAsyncMiddleware(dispatch) {
  return async (action, state) => {
    if (!action.async) {
      return; // Chỉ xử lý async actions
    }

    const { type, payload } = action;

    try {
      dispatch({ type: `${type}_START` });

      const result = await payload();

      dispatch({ type: `${type}_SUCCESS`, payload: result });
    } catch (error) {
      dispatch({ type: `${type}_ERROR`, payload: error });
    }
  };
}

// Usage
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const asyncDispatch = (action) => {
    if (action.async) {
      createAsyncMiddleware(dispatch)(action, state);
    } else {
      dispatch(action);
    }
  };

  const fetchTodos = async () => {
    asyncDispatch({
      type: "FETCH_TODOS",
      async: true,
      payload: async () => {
        const response = await fetch("/api/todos");
        return response.json();
      },
    });
  };

  // ...
}
```

---

## Complex state management với `useReducer`?

### Trả lời / Answer:

### Ví dụ thực tế / Practical Example:

```jsx
// Shopping cart với complex state
const initialState = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  discount: 0,
  promoCode: null,
  loading: false,
  error: null,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      let newItems;
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems, state.discount),
      };
    }

    case "UPDATE_QUANTITY": {
      const newItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item,
      );

      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems, state.discount),
      };
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload);

      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems, state.discount),
      };
    }

    case "APPLY_PROMO": {
      const discount = validatePromoCode(action.payload);
      return {
        ...state,
        promoCode: action.payload,
        discount: discount,
        ...calculateTotals(state.items, discount),
      };
    }

    case "REMOVE_PROMO": {
      return {
        ...state,
        promoCode: null,
        discount: 0,
        ...calculateTotals(state.items, 0),
      };
    }

    case "CLEAR_CART": {
      return {
        ...initialState,
        promoCode: null,
        discount: 0,
      };
    }

    case "CHECKOUT_START": {
      return { ...state, loading: true, error: null };
    }

    case "CHECKOUT_SUCCESS": {
      return {
        ...initialState,
        promoCode: null,
        discount: 0,
      };
    }

    case "CHECKOUT_ERROR": {
      return { ...state, loading: false, error: action.payload };
    }

    default:
      return state;
  }
}

function calculateTotals(items, discount) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const discountAmount = subtotal * discount;
  const afterDiscount = subtotal - discountAmount;
  const tax = afterDiscount * 0.1; // 10% tax
  const shipping = afterDiscount > 100 ? 0 : 10;
  const total = afterDiscount + tax + shipping;

  return {
    subtotal,
    discountAmount,
    tax,
    shipping,
    total,
  };
}

function validatePromoCode(code) {
  const promoCodes = {
    SAVE10: 0.1,
    SAVE20: 0.2,
    SUMMER: 0.15,
  };

  return promoCodes[code] || 0;
}

// Usage
function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch({ type: "REMOVE_ITEM", payload: id });
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const applyPromo = (code) => {
    dispatch({ type: "APPLY_PROMO", payload: code });
  };

  const removePromo = () => {
    dispatch({ type: "REMOVE_PROMO" });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const checkout = async () => {
    dispatch({ type: "CHECKOUT_START" });

    try {
      await api.checkout({
        items: state.items,
        promoCode: state.promoCode,
      });
      dispatch({ type: "CHECKOUT_SUCCESS" });
    } catch (error) {
      dispatch({ type: "CHECKOUT_ERROR", payload: error.message });
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>

      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {state.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </ul>

          <CartSummary state={state} />

          <PromoCodeInput onApply={applyPromo} onRemove={removePromo} />

          <button onClick={checkout} disabled={state.loading}>
            {state.loading
              ? "Processing..."
              : `Checkout $${state.total.toFixed(2)}`}
          </button>
        </>
      )}

      {state.error && <p className="error">{state.error}</p>}
    </div>
  );
}

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <li>
      <span>{item.name}</span>
      <span>${item.price.toFixed(2)}</span>
      <input
        type="number"
        min="0"
        value={item.quantity}
        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
      />
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </li>
  );
}

function CartSummary({ state }) {
  return (
    <div>
      <p>Subtotal: ${state.subtotal.toFixed(2)}</p>
      {state.discount > 0 && (
        <p>Discount: -${state.discountAmount.toFixed(2)}</p>
      )}
      <p>Tax: ${state.tax.toFixed(2)}</p>
      <p>Shipping: ${state.shipping.toFixed(2)}</p>
      <p>
        <strong>Total: ${state.total.toFixed(2)}</strong>
      </p>
    </div>
  );
}

function PromoCodeInput({ onApply, onRemove }) {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply(code);
    setCode("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Promo code"
      />
      <button type="submit">Apply</button>
      <button type="button" onClick={onRemove}>
        Remove
      </button>
    </form>
  );
}
```
