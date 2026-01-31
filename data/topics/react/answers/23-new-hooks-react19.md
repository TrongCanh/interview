# 23. New Hooks in React 19 / Hooks mới trong React 19

> Câu trả lời chi tiết về các hooks mới trong React 19 / Detailed answers about new hooks in React 19

---

## use Hook - Reading Resources

### use là gì? / What is use?

**`use`** là một hook mới trong React 19 cho phép bạn đọc từ resources như Promises và Context trong cả Server và Client Components. Nó là một API thống nhất để đọc từ bất kỳ resource nào.

**`use`** is a new hook in React 19 that allows you to read from resources like Promises and Context in both Server and Client Components. It's a unified API for reading from any resource.

### use với Promises

```jsx
import { use, Suspense } from 'react';

// Server Component
async function fetchUser(userId: string) {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}

function UserPage({ params }) {
  // Truyền Promise vào use
  const user = use(fetchUser(params.id));

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Với Suspense
function UserPageWithSuspense({ params }) {
  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <UserContent params={params} />
    </Suspense>
  );
}

function UserContent({ params }) {
  const user = use(fetchUser(params.id));

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### use với Context

```jsx
import { createContext, useContext, use } from "react";

// Tạo Context
const ThemeContext = createContext("light");
const UserContext = createContext(null);

// Server Component
function DashboardPage() {
  // Dùng use để đọc Context
  const theme = use(ThemeContext);
  const user = use(UserContext);

  return (
    <div className={`dashboard ${theme}`}>
      <h1>Welcome, {user?.name}!</h1>
    </div>
  );
}

// Client Component
("use client");

function ThemeToggle() {
  const theme = use(ThemeContext);
  const setTheme = use(ThemeDispatchContext);

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
}
```

### use với multiple resources

```jsx
import { use, Suspense } from 'react';

async function fetchUser(userId: string) {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}

async function fetchPosts(userId: string) {
  const response = await fetch(`/api/users/${userId}/posts`);
  return response.json();
}

function UserProfile({ userId }) {
  // Đọc multiple resources cùng lúc
  const user = use(fetchUser(userId));
  const posts = use(fetchPosts(userId));

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>

      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

function Page({ params }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile userId={params.id} />
    </Suspense>
  );
}
```

### use với conditional rendering

```jsx
import { use, Suspense } from "react";

function UserPage({ params, showPosts }) {
  const user = use(fetchUser(params.id));

  return (
    <div>
      <h1>{user.name}</h1>

      {/* Conditional use với Suspense */}
      {showPosts && (
        <Suspense fallback={<div>Loading posts...</div>}>
          <UserPosts userId={params.id} />
        </Suspense>
      )}
    </div>
  );
}

function UserPosts({ userId }) {
  const posts = use(fetchPosts(userId));

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

---

## useOptimistic - Optimistic Updates

### useOptimistic là gì? / What is useOptimistic?

**`useOptimistic`** là một hook cho phép bạn hiển thị UI đã cập nhật ngay lập tức trong khi chờ server response. Nó đặc biệt hữu ích cho các operations như like, unlike, add to cart, v.v.

**`useOptimistic`** is a hook that allows you to show updated UI immediately while waiting for the server response. It's particularly useful for operations like like, unlike, add to cart, etc.

### Cơ bản / Basic Usage

```jsx
"use client";

import { useOptimistic } from "react";
import { toggleLike } from "@/actions/posts";

function LikeButton({ postId, initialLiked }) {
  const [optimisticLiked, addOptimisticLike] = useOptimistic(
    initialLiked,
    (state, newLikedState) => newLikedState,
  );

  const handleClick = async () => {
    // Optimistic update
    addOptimisticLike(!optimisticLiked);

    // Server action
    await toggleLike(postId);
  };

  return (
    <button onClick={handleClick} className={optimisticLiked ? "liked" : ""}>
      {optimisticLiked ? "❤️ Liked" : "🤍 Like"}
    </button>
  );
}
```

### useOptimistic với counter

```jsx
"use client";

import { useOptimistic } from "react";
import { incrementCounter } from "@/actions/counter";

function Counter({ initialValue }) {
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    initialValue,
    (state, action) => state + action,
  );

  const handleIncrement = async () => {
    addOptimisticCount(1);
    await incrementCounter();
  };

  const handleDecrement = async () => {
    addOptimisticCount(-1);
    await decrementCounter();
  };

  return (
    <div>
      <p>Count: {optimisticCount}</p>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
    </div>
  );
}
```

### useOptimistic với list operations

```jsx
'use client';

import { useOptimistic } from 'react';
import { addTodo, deleteTodo, toggleTodo } from '@/actions/todos';

function TodoList({ initialTodos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    initialTodos,
    (state, action) => {
      switch (action.type) {
        case 'add':
          return [...state, action.todo];
        case 'delete':
          return state.filter(t => t.id !== action.todoId);
        case 'toggle':
          return state.map(t =>
            t.id === action.todoId
              ? { ...t, completed: !t.completed }
              : t
          );
        default:
          return state;
      }
    }
  );

  const handleAdd = async (title: string) => {
    const newTodo = {
      id: Date.now().toString(),
      title,
      completed: false
    };
    addOptimisticTodo({ type: 'add', todo: newTodo });
    await addTodo(title);
  };

  const handleDelete = async (todoId: string) => {
    addOptimisticTodo({ type: 'delete', todoId });
    await deleteTodo(todoId);
  };

  const handleToggle = async (todoId: string) => {
    addOptimisticTodo({ type: 'toggle', todoId });
    await toggleTodo(todoId);
  };

  return (
    <div>
      <TodoForm onAdd={handleAdd} />

      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            <span className={todo.completed ? 'completed' : ''}>
              {todo.title}
            </span>
            <button onClick={() => handleDelete(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### useOptimistic với form

```jsx
'use client';

import { useOptimistic, useActionState } from 'react';
import { updateProfile } from '@/actions/profile';

function ProfileForm({ user }) {
  const [optimisticUser, setOptimisticUser] = useOptimistic(
    user,
    (state, action) => ({ ...state, ...action })
  );

  const [state, formAction, isPending] = useActionState(
    updateProfile,
    { error: null }
  );

  const handleChange = (field: string, value: string) => {
    setOptimisticUser({ [field]: value });
  };

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={optimisticUser.name}
          onChange={(e) => handleChange('name', e.target.value)}
          disabled={isPending}
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={optimisticUser.email}
          onChange={(e) => handleChange('email', e.target.value)}
          disabled={isPending}
        />
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Changes'}
      </button>

      {state.error && <p className="error">{state.error}</p>}
    </form>
  );
}
```

---

## useActionState - Form State Management

### useActionState là gì? / What is useActionState?

**`useActionState`** là một hook trong React 19 giúp quản lý state của form submissions, bao gồm pending state, errors, và success messages.

**`useActionState`** is a hook in React 19 that helps manage form submission state, including pending state, errors, and success messages.

### Cơ bản / Basic Usage

```jsx
"use client";

import { useActionState } from "react";
import { createTodo } from "@/actions/todos";

function TodoForm() {
  const [state, formAction, isPending] = useActionState(createTodo, {
    error: null,
    todo: null,
  });

  return (
    <form action={formAction}>
      <input
        name="title"
        type="text"
        placeholder="Add a new todo..."
        disabled={isPending}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add Todo"}
      </button>

      {state.error && <p className="error">{state.error}</p>}

      {state.todo && <p className="success">Todo added: {state.todo.title}</p>}
    </form>
  );
}
```

### useActionState với validation

```jsx
"use client";

import { useActionState } from "react";
import { updateProfile } from "@/actions/profile";

function ProfileForm({ user }) {
  const [state, formAction, isPending] = useActionState(updateProfile, {
    errors: {},
    success: false,
    message: "",
  });

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={user.name}
          aria-invalid={!!state.errors.name}
          aria-describedby={state.errors.name ? "name-error" : undefined}
        />
        {state.errors.name && (
          <p id="name-error" className="error">
            {state.errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={user.email}
          aria-invalid={!!state.errors.email}
          aria-describedby={state.errors.email ? "email-error" : undefined}
        />
        {state.errors.email && (
          <p id="email-error" className="error">
            {state.errors.email}
          </p>
        )}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Updating..." : "Update Profile"}
      </button>

      {state.success && <p className="success">{state.message}</p>}
    </form>
  );
}
```

### useActionState với multiple states

```jsx
"use client";

import { useActionState } from "react";
import { handleFormSubmit } from "@/actions/form";

function ComplexForm() {
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    step: 1,
    errors: {},
    data: {},
    success: false,
  });

  return (
    <form action={formAction}>
      {state.step === 1 && (
        <Step1 errors={state.errors} data={state.data} isPending={isPending} />
      )}

      {state.step === 2 && (
        <Step2 errors={state.errors} data={state.data} isPending={isPending} />
      )}

      {state.success && <SuccessMessage data={state.data} />}
    </form>
  );
}
```

---

## useFormStatus - Form Status

### useFormStatus là gì? / What is useFormStatus?

**`useFormStatus`** là một hook cho phép các components bên trong một form truy cập vào trạng thái pending của form submission.

**`useFormStatus`** is a hook that allows components inside a form to access the pending state of the form submission.

### Cơ bản / Basic Usage

```jsx
"use client";

import { useFormStatus } from "react";

function SubmitButton({ children, pendingText = "Submitting..." }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? pendingText : children}
    </button>
  );
}

function ContactForm() {
  return (
    <form action={submitContactForm}>
      <input name="name" placeholder="Your name" required />
      <input name="email" type="email" placeholder="Your email" required />
      <textarea name="message" placeholder="Your message" required />

      <SubmitButton pendingText="Sending message...">Send Message</SubmitButton>
    </form>
  );
}
```

### useFormStatus với multiple buttons

```jsx
"use client";

import { useFormStatus } from "react";

function PrimaryButton({ children }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="primary-button">
      {pending ? "Processing..." : children}
    </button>
  );
}

function SecondaryButton({ children, value }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      name="action"
      value={value}
      disabled={pending}
      className="secondary-button"
    >
      {pending ? "Processing..." : children}
    </button>
  );
}

function TodoItem({ todo }) {
  return (
    <form action={handleTodoAction}>
      <input type="hidden" name="todoId" value={todo.id} />

      <span>{todo.title}</span>

      <div className="actions">
        <SecondaryButton value="toggle">
          {todo.completed ? "Mark incomplete" : "Mark complete"}
        </SecondaryButton>

        <SecondaryButton value="delete" className="danger">
          Delete
        </SecondaryButton>
      </div>
    </form>
  );
}
```

---

## Tóm tắt so sánh / Comparison Summary

| Hook               | Mục đích / Purpose                   | Use Case                         |
| ------------------ | ------------------------------------ | -------------------------------- |
| **use**            | Đọc từ resources (Promises, Context) | Server Components, data fetching |
| **useOptimistic**  | Hiển thị UI đã cập nhật ngay lập tức | Like, unlike, add to cart        |
| **useActionState** | Quản lý state form submission        | Form validation, error handling  |
| **useFormStatus**  | Truy cập trạng thái pending của form | Disable buttons, show loading    |

---

## Best Practices / Thực hành tốt nhất

### 1. use với Suspense

```jsx
// ✅ Good - Dùng use với Suspense
function Page({ params }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile userId={params.id} />
    </Suspense>
  );
}

function UserProfile({ userId }) {
  const user = use(fetchUser(userId));
  return <div>{user.name}</div>;
}
```

### 2. useOptimistic với rollback

```jsx
// ✅ Good - Xử lý lỗi với useOptimistic
function LikeButton({ postId, initialLiked }) {
  const [optimisticLiked, addOptimisticLike] = useOptimistic(
    initialLiked,
    (state, newLikedState) => newLikedState,
  );

  const handleClick = async () => {
    const newLikedState = !optimisticLiked;
    addOptimisticLike(newLikedState);

    try {
      await toggleLike(postId);
    } catch (error) {
      // Rollback nếu lỗi
      addOptimisticLike(optimisticLiked);
    }
  };

  return <button onClick={handleClick}>{optimisticLiked ? "❤️" : "🤍"}</button>;
}
```

### 3. useActionState với proper error handling

```jsx
// ✅ Good - Handle errors trong useActionState
function Form() {
  const [state, formAction, isPending] = useActionState(submitForm, {
    errors: {},
    success: false,
  });

  return (
    <form action={formAction}>
      {Object.entries(state.errors).map(([field, error]) => (
        <p key={field} className="error">
          {error}
        </p>
      ))}

      {state.success && <p className="success">Success!</p>}
    </form>
  );
}
```

---

_Updated: 2026-01-30_
