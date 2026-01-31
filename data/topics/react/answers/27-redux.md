# 27. Redux / Redux

> Câu trả lời chi tiết về Redux / Detailed answers about Redux

---

## Redux Principles / Nguyên tắc Redux

### Three Core Principles / Ba nguyên tắc cốt lõi

Redux dựa trên 3 nguyên tắc chính:

**Redux is based on 3 main principles:**

1. **Single Source of Truth** - State của toàn bộ ứng dụng được lưu trữ trong một object tree duy nhất trong một store.

2. **State is Read-Only** - Cách duy nhất để thay đổi state là dispatch một action, một object mô tả những gì đã xảy ra.

3. **Changes are Made with Pure Functions** - Để chỉ định state thay đổi như thế nào, bạn viết pure reducers.

```jsx
// 1. Single Source of Truth
const store = createStore(rootReducer);

// 2. State is Read-Only
// ❌ Không được mutate state trực tiếp
store.state.count = 5; // WRONG!

// ✅ Phải dispatch action
store.dispatch({ type: "INCREMENT" });

// 3. Pure Reducers
function counterReducer(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}
```

---

## Actions, Reducers, Store

### Actions

**Actions** là plain JavaScript objects đại diện cho một ý định thay đổi state. Chúng phải có một `type` property.

**Actions** are plain JavaScript objects that represent an intention to change state. They must have a `type` property.

```jsx
// Action creators
function increment() {
  return { type: "INCREMENT" };
}

function decrement() {
  return { type: "DECREMENT" };
}

// Action với payload
function addTodo(text) {
  return {
    type: "ADD_TODO",
    payload: {
      id: Date.now(),
      text,
      completed: false,
    },
  };
}

function toggleTodo(id) {
  return {
    type: "TOGGLE_TODO",
    payload: { id },
  };
}

// Action creator với parameters
function setUser(user) {
  return {
    type: "SET_USER",
    payload: user,
  };
}

// Dispatch actions
store.dispatch(increment());
store.dispatch(addTodo("Learn Redux"));
store.dispatch(toggleTodo(1));
```

### Reducers

**Reducers** là pure functions nhận vào state và action, và trả về state mới.

**Reducers** are pure functions that take state and action, and return new state.

```jsx
// Basic reducer
function counterReducer(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "SET_VALUE":
      return action.payload;
    default:
      return state;
  }
}

// Complex reducer với object state
const initialState = {
  todos: [],
  filter: "all",
};

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
}
```

### Store

**Store** là object kết hợp actions và reducers. Nó giữ state của ứng dụng và cung cấp các methods để truy cập, dispatch actions, và subscribe changes.

**Store** is the object that brings actions and reducers together. It holds the application state and provides methods to access, dispatch actions, and subscribe to changes.

```jsx
import { createStore } from "redux";
import rootReducer from "./reducers";

// Tạo store
const store = createStore(rootReducer);

// Truy cập state
console.log(store.getState());

// Dispatch action
store.dispatch({ type: "INCREMENT" });

// Subscribe changes
const unsubscribe = store.subscribe(() => {
  console.log("State changed:", store.getState());
});

// Unsubscribe
unsubscribe();
```

---

## Redux Toolkit

### Redux Toolkit là gì? / What is Redux Toolkit?

**Redux Toolkit** là official recommended way để viết Redux logic. Nó cung cấp utilities để đơn giản hóa Redux development.

**Redux Toolkit** is the official recommended way to write Redux logic. It provides utilities to simplify Redux development.

### Cài đặt Redux Toolkit

```bash
npm install @reduxjs/toolkit react-redux
```

### Create Slice với createSlice

```jsx
import { createSlice } from "@reduxjs/toolkit";

// Tạo slice
const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit cho phép mutate state trực tiếp
      // (nhưng thực tế là immer xử lý immutable updates)
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Export actions và reducer
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

### Create Store với configureStore

```jsx
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import todosReducer from "./todosSlice";
import userReducer from "./userSlice";

// Tạo store
const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    user: userReducer,
  },
});

export default store;
```

### Redux Toolkit với Thunks

```jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get("/api/todos");
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (text) => {
  const response = await axios.post("/api/todos", { text });
  return response.data;
});

// Slice với async thunks
const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    toggleTodo: (state, action) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    // Handle fetchTodos
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handle addTodo
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  },
});

export const { toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
```

---

## Thunks vs Sagas

### Redux Thunks

**Thunks** là middleware cho phép bạn viết action creators trả về một function thay vì action object. Function này nhận `dispatch` và `getState` làm arguments.

**Thunks** are middleware that allow you to write action creators that return a function instead of an action object. This function receives `dispatch` and `getState` as arguments.

```jsx
import { createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk với createAsyncThunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const user = await response.json();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Manual thunk
const fetchUserById = (userId) => {
  return async (dispatch, getState) => {
    dispatch({ type: "FETCH_USER_START" });

    try {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();

      dispatch({ type: "FETCH_USER_SUCCESS", payload: user });
    } catch (error) {
      dispatch({ type: "FETCH_USER_ERROR", payload: error.message });
    }
  };
};
```

### Redux Saga

**Sagas** sử dụng ES6 generators để quản lý side effects. Chúng cung cấp cách xử lý async operations mạnh mẽ hơn.

**Sagas** use ES6 generators to manage side effects. They provide a more powerful way to handle async operations.

```jsx
import { takeEvery, put, call } from "redux-saga/effects";

// Worker saga
function* fetchUser(action) {
  try {
    const user = yield call(fetch, `/api/users/${action.payload}`);
    yield put({ type: "FETCH_USER_SUCCESS", payload: user });
  } catch (error) {
    yield put({ type: "FETCH_USER_ERROR", payload: error.message });
  }
}

// Watcher saga
function* watchFetchUser() {
  yield takeEvery("FETCH_USER_REQUEST", fetchUser);
}

// Root saga
function* rootSaga() {
  yield all([watchFetchUser(), watchCreateUser(), watchDeleteUser()]);
}
```

### Thunks vs Sagas Comparison

| Đặc điểm / Feature | Thunks                  | Sagas                                    |
| ------------------ | ----------------------- | ---------------------------------------- |
| **Complexity**     | Đơn giản hơn            | Phức tạp hơn                             |
| **Learning Curve** | Thấp                    | Cao                                      |
| **Testability**    | Dễ test                 | Dễ test                                  |
| **Async Flow**     | Basic                   | Advanced (cancellation, race conditions) |
| **Use Case**       | Simple async operations | Complex async flows                      |

---

## Redux DevTools

### Cài đặt Redux DevTools

```jsx
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: rootReducer,
  // Redux DevTools tự động được enable trong development
  devTools: process.env.NODE_ENV !== "production",
});
```

### Sử dụng Redux DevTools

Redux DevTools cho phép bạn:

- Inspect state và actions
- Time-travel debugging
- Commit state snapshots
- Replay actions

**Redux DevTools allows you to:**

- Inspect state and actions
- Time-travel debugging
- Commit state snapshots
- Replay actions

```jsx
// Dispatch actions và xem trong DevTools
store.dispatch(increment());
store.dispatch(addTodo("Learn Redux"));
store.dispatch(toggleTodo(1));

// Mở Redux DevTools trong browser để xem state và actions
```

---

## Normalized State Shape

### Tại sao cần normalized state?

**Normalized state** giúp tránh data duplication và làm việc với data dễ hơn, đặc biệt với nested data.

**Normalized state** helps avoid data duplication and makes working with data easier, especially with nested data.

```jsx
// ❌ Bad - Nested state
const state = {
  users: [
    {
      id: 1,
      name: 'John',
      posts: [
        { id: 1, title: 'Post 1', comments: [...] },
        { id: 2, title: 'Post 2', comments: [...] }
      ]
    }
  ]
};

// ✅ Good - Normalized state
const state = {
  users: {
    byId: {
      1: { id: 1, name: 'John', postIds: [1, 2] }
    },
    allIds: [1]
  },
  posts: {
    byId: {
      1: { id: 1, title: 'Post 1', userId: 1, commentIds: [1, 2] },
      2: { id: 2, title: 'Post 2', userId: 1, commentIds: [3, 4] }
    },
    allIds: [1, 2]
  },
  comments: {
    byId: {
      1: { id: 1, text: 'Comment 1', postId: 1 },
      2: { id: 2, text: 'Comment 2', postId: 1 }
    },
    allIds: [1, 2]
  }
};
```

### Selectors cho Normalized State

```jsx
// Selectors
export const selectUserById = (state, userId) => state.users.byId[userId];

export const selectPostsByUserId = (state, userId) => {
  const user = state.users.byId[userId];
  if (!user) return [];

  return user.postIds.map((postId) => state.posts.byId[postId]);
};

export const selectCommentsByPostId = (state, postId) => {
  const post = state.posts.byId[postId];
  if (!post) return [];

  return post.commentIds.map((commentId) => state.comments.byId[commentId]);
};

// Memoized selectors với reselect
import { createSelector } from "@reduxjs/toolkit";

export const selectUserPosts = createSelector(
  [selectUserById, (state) => state.posts.byId],
  (user, postsById) => {
    if (!user) return [];
    return user.postIds.map((id) => postsById[id]);
  },
);
```

---

## Tóm tắt / Summary

| Khái niệm / Concept        | Giải thích / Explanation                |
| -------------------------- | --------------------------------------- |
| **Single Source of Truth** | State được lưu trong một store duy nhất |
| **Actions**                | Objects mô tả ý định thay đổi state     |
| **Reducers**               | Pure functions xử lý state changes      |
| **Store**                  | Object kết hợp actions và reducers      |
| **Redux Toolkit**          | Official tools cho Redux development    |
| **Thunks**                 | Middleware cho async actions            |
| **Sagas**                  | Advanced async flow với generators      |
| **Normalized State**       | State structure tránh duplication       |

---

## Best Practices / Thực hành tốt nhất

### 1. Sử dụng Redux Toolkit

```jsx
// ✅ Good - Sử dụng Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});
```

### 2. Tạo selectors

```jsx
// ✅ Good - Tạo selectors
export const selectTodos = (state) => state.todos.items;
export const selectCompletedTodos = createSelector([selectTodos], (todos) =>
  todos.filter((t) => t.completed),
);
```

### 3. Handle async với createAsyncThunk

```jsx
// ✅ Good - Sử dụng createAsyncThunk
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("/api/todos");
  return response.json();
});
```

---

_Updated: 2026-01-30_
