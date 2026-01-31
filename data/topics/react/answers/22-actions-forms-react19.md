# 22. Actions & Forms (React 19) / Actions & Forms (React 19)

> Câu trả lời chi tiết về Actions và Forms trong React 19 / Detailed answers about Actions and Forms in React 19

---

## Server Actions là gì? / What are Server Actions?

### Định nghĩa / Definition

**Server Actions** là một tính năng trong React 19 cho phép bạn định nghĩa server-side functions có thể được gọi trực tiếp từ client components. Chúng thay thế cách truyền thống tạo API routes và fetch từ client.

**Server Actions** is a feature in React 19 that allows you to define server-side functions that can be called directly from client components. They replace the traditional approach of creating API routes and fetching from the client.

### Định nghĩa Server Action cơ bản

```jsx
// actions/todos.ts - Server Action file
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';

export async function createTodo(formData: FormData) {
  const title = formData.get('title') as string;

  if (!title || title.trim() === '') {
    return { error: 'Title is required' };
  }

  const todo = await db.todo.create({
    data: { title: title.trim() }
  });

  // Revalidate cache để cập nhật UI
  revalidatePath('/todos');

  return { success: true, todo };
}

export async function deleteTodo(todoId: string) {
  await db.todo.delete({
    where: { id: todoId }
  });

  revalidatePath('/todos');

  return { success: true };
}

export async function toggleTodo(todoId: string) {
  const todo = await db.todo.findUnique({
    where: { id: todoId }
  });

  await db.todo.update({
    where: { id: todoId },
    data: { completed: !todo?.completed }
  });

  revalidatePath('/todos');

  return { success: true };
}
```

---

## useActionState Hook

### useActionState là gì? / What is useActionState?

**`useActionState`** là một hook mới trong React 19 giúp quản lý state của form submissions, bao gồm pending state, errors, và success messages.

**`useActionState`** is a new hook in React 19 that helps manage form submission state, including pending state, errors, and success messages.

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
'use client';

import { useActionState } from 'react';
import { updateProfile } from '@/actions/profile';

function ProfileForm({ user }) {
  const [state, formAction, isPending] = useActionState(
    updateProfile,
    {
      errors: {},
      success: false,
      message: ''
    }
  );

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
          aria-describedby={state.errors.name ? 'name-error' : undefined}
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
          aria-describedby={state.errors.email ? 'email-error' : undefined}
        />
        {state.errors.email && (
          <p id="email-error" className="error">
            {state.errors.email}
          </p>
        )}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Updating...' : 'Update Profile'}
      </button>

      {state.success && (
        <p className="success">{state.message}</p>
      )}
    </form>
  );
}

// Server Action với validation
'use server';

import { z } from 'zod';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address')
});

export async function updateProfile(
  prevState: any,
  formData: FormData
) {
  const name = formData.get('name');
  const email = formData.get('email');

  // Validate
  const result = profileSchema.safeParse({ name, email });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      success: false,
      message: ''
    };
  }

  // Update database
  await db.user.update({
    where: { id: session.userId },
    data: result.data
  });

  revalidatePath('/profile');

  return {
    errors: {},
    success: true,
    message: 'Profile updated successfully!'
  };
}
```

### useActionState với optimistic updates

```jsx
"use client";

import { useActionState, useState } from "react";
import { updateTodo } from "@/actions/todos";

function TodoItem({ todo }) {
  const [optimisticTodo, setOptimisticTodo] = useState(todo);
  const [state, formAction, isPending] = useActionState(updateTodo, {
    error: null,
  });

  const handleToggle = () => {
    // Optimistic update
    setOptimisticTodo((prev) => ({
      ...prev,
      completed: !prev.completed,
    }));
  };

  return (
    <form action={formAction}>
      <input type="hidden" name="todoId" value={todo.id} />

      <input
        type="checkbox"
        name="completed"
        checked={optimisticTodo.completed}
        onChange={handleToggle}
        disabled={isPending}
      />

      <span className={optimisticTodo.completed ? "completed" : ""}>
        {todo.title}
      </span>

      {state.error && <span className="error">{state.error}</span>}
    </form>
  );
}
```

---

## useFormStatus Hook

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

### useFormStatus với complex form

```jsx
"use client";

import { useFormStatus } from "react";

function FormStatus() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending && (
        <div className="form-status">
          <div className="spinner" />
          <span>Saving changes...</span>
        </div>
      )}
    </>
  );
}

function SubmitButton({ label, loadingLabel }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={pending ? "submitting" : ""}
    >
      {pending ? loadingLabel : label}
    </button>
  );
}

function DeleteButton({ todoId }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      name="action"
      value="delete"
      disabled={pending}
      className="delete-button"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}

function TodoForm({ todo }) {
  return (
    <form action={handleTodoAction}>
      <input type="hidden" name="todoId" value={todo.id} />

      <input name="title" defaultValue={todo.title} disabled={pending} />

      <div className="form-actions">
        <SubmitButton label="Save" loadingLabel="Saving..." />
        <DeleteButton todoId={todo.id} />
      </div>

      <FormStatus />
    </form>
  );
}
```

---

## Form Handling với Actions / Form Handling with Actions

### Form Action cơ bản

```jsx
// Server Component với form action
import { createTodo } from "@/actions/todos";

async function TodoPage() {
  const todos = await db.todo.findMany();

  return (
    <div>
      <h1>Todos</h1>

      <form action={createTodo}>
        <input name="title" placeholder="Add a new todo..." required />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Form với multiple actions

```jsx
'use client';

import { useFormStatus } from 'react';

function TodoActions({ todo }) {
  const { pending } = useFormStatus();

  return (
    <div className="todo-actions">
      <button
        type="submit"
        name="action"
        value="toggle"
        disabled={pending}
      >
        {todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      </button>

      <button
        type="submit"
        name="action"
        value="delete"
        disabled={pending}
        className="delete"
      >
        Delete
      </button>
    </div>
  );
}

function TodoItem({ todo }) {
  return (
    <form action={handleTodoAction}>
      <input type="hidden" name="todoId" value={todo.id} />

      <span className={todo.completed ? 'completed' : ''}>
        {todo.title}
      </span>

      <TodoActions todo={todo} />
    </form>
  );
}

// Server Action xử lý multiple actions
'use server';

export async function handleTodoAction(formData: FormData) {
  const action = formData.get('action') as string;
  const todoId = formData.get('todoId') as string;

  switch (action) {
    case 'toggle':
      await toggleTodo(todoId);
      break;
    case 'delete':
      await deleteTodo(todoId);
      break;
    default:
      throw new Error('Invalid action');
  }

  revalidatePath('/todos');
}
```

### Form với file upload

```jsx
'use client';

import { useActionState } from 'react';
import { uploadAvatar } from '@/actions/user';

function AvatarUploadForm({ currentAvatar }) {
  const [state, formAction, isPending] = useActionState(
    uploadAvatar,
    { error: null, avatar: currentAvatar }
  );

  return (
    <form action={formAction}>
      <div className="avatar-preview">
        <img
          src={state.avatar || '/default-avatar.png'}
          alt="Avatar"
        />
      </div>

      <input
        type="file"
        name="avatar"
        accept="image/*"
        disabled={isPending}
      />

      <button type="submit" disabled={isPending}>
        {isPending ? 'Uploading...' : 'Upload Avatar'}
      </button>

      {state.error && (
        <p className="error">{state.error}</p>
      )}
    </form>
  );
}

// Server Action với file upload
'use server';

import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function uploadAvatar(
  prevState: any,
  formData: FormData
) {
  const file = formData.get('avatar') as File;

  if (!file) {
    return { error: 'Please select a file', avatar: prevState.avatar };
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    return { error: 'Please upload an image', avatar: prevState.avatar };
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return { error: 'File size must be less than 5MB', avatar: prevState.avatar };
  }

  // Save file
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name}`;
  const path = join(process.cwd(), 'public', 'uploads', filename);

  await writeFile(path, buffer);

  // Update user avatar in database
  await db.user.update({
    where: { id: session.userId },
    data: { avatar: `/uploads/${filename}` }
  });

  revalidatePath('/profile');

  return {
    error: null,
    avatar: `/uploads/${filename}`
  };
}
```

---

## Optimistic UI Updates / Cập nhật UI Optimistic

### useOptimistic Hook

**`useOptimistic`** là một hook cho phép bạn hiển thị UI đã cập nhật ngay lập tức trong khi chờ server response.

**`useOptimistic`** is a hook that allows you to show updated UI immediately while waiting for the server response.

```jsx
"use client";

import { useOptimistic, useActionState } from "react";
import { toggleTodo } from "@/actions/todos";

function TodoItem({ todo }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    [todo],
    (state, newTodo) => {
      // Tìm và update todo trong list
      return state.map((t) => (t.id === newTodo.id ? newTodo : t));
    },
  );

  const [state, formAction, isPending] = useActionState(toggleTodo, {
    error: null,
  });

  const optimisticTodo = optimisticTodos.find((t) => t.id === todo.id) || todo;

  const handleToggle = () => {
    addOptimisticTodo({
      ...todo,
      completed: !todo.completed,
    });
  };

  return (
    <form action={formAction}>
      <input type="hidden" name="todoId" value={todo.id} />

      <input
        type="checkbox"
        checked={optimisticTodo.completed}
        onChange={handleToggle}
        disabled={isPending}
      />

      <span className={optimisticTodo.completed ? "completed" : ""}>
        {todo.title}
      </span>
    </form>
  );
}
```

### Optimistic updates với list

```jsx
"use client";

import { useOptimistic, useActionState } from "react";
import { addTodo, deleteTodo } from "@/actions/todos";

function TodoList({ initialTodos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    initialTodos,
    (state, action) => {
      switch (action.type) {
        case "add":
          return [...state, action.todo];
        case "delete":
          return state.filter((t) => t.id !== action.todoId);
        default:
          return state;
      }
    },
  );

  return (
    <div>
      <TodoForm onAdd={(todo) => addOptimisticTodo({ type: "add", todo })} />

      <ul>
        {optimisticTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={(id) => addOptimisticTodo({ type: "delete", todoId: id })}
          />
        ))}
      </ul>
    </div>
  );
}
```

---

## Progressive Enhancement

### Form hoạt động không có JavaScript

React 19 Actions hỗ trợ progressive enhancement - form vẫn hoạt động ngay cả khi JavaScript bị tắt.

```jsx
// Form hoạt động cả có và không có JavaScript
import { createTodo } from "@/actions/todos";

async function TodoPage() {
  const todos = await db.todo.findMany();

  return (
    <div>
      <h1>Todos</h1>

      <form action={createTodo}>
        <input name="title" placeholder="Add a new todo..." required />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Best Practices / Thực hành tốt nhất

### 1. Validate trên server

```jsx
// ✅ Good - Validate trên server
'use server';

import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function login(formData: FormData) {
  const result = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (!result.success) {
    return { error: 'Invalid credentials' };
  }

  // ... login logic
}
```

### 2. Sử dụng revalidatePath để cập nhật UI

```jsx
// ✅ Good - Revalidate cache sau mutation
'use server';

import { revalidatePath } from 'next/cache';

export async function updateTodo(todoId: string, data: any) {
  await db.todo.update({
    where: { id: todoId },
    data
  });

  revalidatePath('/todos');
  revalidatePath(`/todos/${todoId}`);
}
```

### 3. Handle errors gracefully

```jsx
// ✅ Good - Handle errors trong useActionState
"use client";

import { useActionState } from "react";

function TodoForm() {
  const [state, formAction, isPending] = useActionState(createTodo, {
    error: null,
    success: false,
  });

  return (
    <form action={formAction}>
      <input name="title" placeholder="Add todo..." />
      <button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add"}
      </button>

      {state.error && <div className="error-alert">{state.error}</div>}

      {state.success && (
        <div className="success-alert">Todo added successfully!</div>
      )}
    </form>
  );
}
```

---

## Tóm tắt / Summary

| Khái niệm / Concept         | Giải thích / Explanation                     |
| --------------------------- | -------------------------------------------- |
| **Server Action**           | Server-side function gọi từ client component |
| **useActionState**          | Hook quản lý state của form submission       |
| **useFormStatus**           | Hook truy cập trạng thái pending của form    |
| **useOptimistic**           | Hook hiển thị UI đã cập nhật ngay lập tức    |
| **Progressive Enhancement** | Form hoạt động không cần JavaScript          |
| **revalidatePath**          | Revalidate cache sau mutation                |

---

_Updated: 2026-01-30_
