# 21. React Server Components (RSC) - React 19 / React Server Components (RSC) - React 19

> Câu trả lời chi tiết về React Server Components trong React 19 / Detailed answers about React Server Components in React 19

---

## Server Components Architecture / Kiến trúc Server Components

### React 19 RSC là gì? / What is React 19 RSC?

**React Server Components (RSC)** trong React 19 là một kiến trúc cho phép bạn render components trên server và gửi kết quả đã được render xuống client. Điều này khác với React 18 ở chỗ React 19 đã cải thiện đáng kể về streaming, error handling, và integration với frameworks.

**React Server Components (RSC)** in React 19 is an architecture that allows you to render components on the server and send the rendered result to the client. This differs from React 18 in that React 19 has significantly improved streaming, error handling, and framework integration.

### Cách hoạt động của RSC / How RSC Works

```
┌─────────────────────────────────────────────────────────────┐
│                        Server                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Server Components                                 │   │
│  │  - Access database                                 │   │
│  │  - Read filesystem                                │   │
│  │  - Call internal APIs                              │   │
│  │  - Render to JSON/HTML                             │   │
│  └─────────────────────────────────────────────────────┘   │
│                            │                                │
│                            ▼                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  RSC Payload (JSON)                                  │   │
│  │  {                                                   │   │
│  │    "type": "element",                               │   │
│  │    "tag": "div",                                     │   │
│  │    "children": [...]                                │   │
│  │  }                                                   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Network
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        Client                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  React Runtime                                        │   │
│  │  - Receive RSC payload                               │   │
│  │  - Hydrate client components                         │   │
│  │  - Handle interactivity                              │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Client Components                                   │   │
│  │  - State, effects, event handlers                    │   │
│  │  - Browser APIs                                     │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Client vs Server Components / Client vs Server Components

### "use client" Directive

**"use client"** directive đánh dấu một component là Client Component - component sẽ được render trên browser.

**"use client"** directive marks a component as a Client Component - a component that will be rendered on the browser.

```jsx
// Server Component (default)
// Server Component (mặc định)
async function ProductList() {
  const products = await db.product.findMany();

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Client Component
("use client");

function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => setIsLiked(!isLiked)}>
        {isLiked ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
```

### Edge Cases với "use client"

```jsx
// ❌ Bad - "use client" ở cuối file
function Component() {
  return <div>Content</div>;
}
("use client"); // Sai vị trí!

// ✅ Good - "use client" ở đầu file
("use client");

function Component() {
  return <div>Content</div>;
}

// ✅ Good - "use client" trước imports
("use client");

import { useState } from "react";

function Component() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}
```

---

## Server Actions / Server Actions

### Server Actions là gì? / What are Server Actions?

**Server Actions** là một tính năng trong React 19 cho phép bạn gọi server-side functions trực tiếp từ client components mà không cần tạo API routes thủ công.

**Server Actions** is a feature in React 19 that allows you to call server-side functions directly from client components without manually creating API routes.

### Định nghĩa Server Action

```jsx
// actions/counter.ts - Server Action file
'use server';

import { revalidatePath } from 'next/cache';

export async function incrementCounter() {
  // Có thể truy cập database
  await db.counter.update({
    where: { id: 'main' },
    data: { value: { increment: 1 } }
  });

  // Revalidate cache
  revalidatePath('/');

  return { success: true, count: 100 };
}

export async function addTodo(formData: FormData) {
  const title = formData.get('title') as string;

  await db.todo.create({
    data: { title }
  });

  revalidatePath('/todos');
}
```

### Sử dụng Server Action trong Client Component

```jsx
'use client';

import { incrementCounter, addTodo } from '@/actions/counter';

function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = async () => {
    const result = await incrementCounter();
    setCount(result.count);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}

function TodoForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      await addTodo(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Add todo..." />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}
```

### Server Actions với form

```jsx
// Server Component với Server Action
import { addTodo } from '@/actions/todos';

async function TodoPage() {
  const todos = await db.todo.findMany();

  return (
    <div>
      <h1>Todos</h1>

      <form action={addTodo}>
        <input name="title" placeholder="Add todo..." required />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

// Server Action với validation
'use server';

import { z } from 'zod';

const todoSchema = z.object({
  title: z.string().min(1).max(100)
});

export async function addTodo(formData: FormData) {
  // Validate input
  const result = todoSchema.safeParse({
    title: formData.get('title')
  });

  if (!result.success) {
    return { error: result.error.flatten() };
  }

  await db.todo.create({
    data: result.data
  });

  revalidatePath('/todos');
}
```

---

## Streaming SSR / Streaming SSR

### React 19 Streaming Improvements

React 19 cải thiện đáng kể streaming SSR với các tính năng:

1. **Progressive Rendering** - Render từng phần UI khi sẵn sàng
2. **Error Boundaries for SSR** - Handle errors trong streaming
3. **Suspense for Data Fetching** - Suspend components khi chờ data

**React 19 significantly improves streaming SSR with:**

1. **Progressive Rendering** - Render UI parts as they become ready
2. **Error Boundaries for SSR** - Handle errors during streaming
3. **Suspense for Data Fetching** - Suspend components while waiting for data

### Streaming với Suspense

```jsx
// app/page.tsx
import { Suspense } from "react";
import { ProductList, Reviews, RelatedProducts } from "@/components";

export default function ProductPage({ params }) {
  return (
    <div className="product-page">
      {/* Stream từng phần */}
      <Suspense fallback={<ProductSkeleton />}>
        <ProductList productId={params.id} />
      </Suspense>

      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews productId={params.id} />
      </Suspense>

      <Suspense fallback={<RelatedSkeleton />}>
        <RelatedProducts productId={params.id} />
      </Suspense>
    </div>
  );
}
```

### Error Boundaries trong Streaming

```jsx
import { ErrorBoundary, Suspense } from "react";

function StreamingPage() {
  return (
    <div>
      <ErrorBoundary fallback={<div>Error loading header</div>}>
        <Suspense fallback={<HeaderSkeleton />}>
          <PageHeader />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div>Error loading content</div>}>
        <Suspense fallback={<ContentSkeleton />}>
          <PageContent />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div>Error loading footer</div>}>
        <Suspense fallback={<FooterSkeleton />}>
          <PageFooter />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
```

---

## Best Practices / Thực hành tốt nhất

### 1. Mặc định dùng Server Components

```jsx
// ✅ Good - Server Component cho data fetching
async function ProductPage({ params }) {
  const product = await db.product.findUnique({
    where: { id: params.id },
  });

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <AddToCartButton productId={product.id} />
    </div>
  );
}
```

### 2. Chuyển Client Component xuống thấp nhất

```jsx
// ✅ Good - Chỉ phần cần interactivity là client
"use client";

function AddToCartButton({ productId }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    setIsAdding(true);
    await addToCart(productId);
    setIsAdding(false);
  };

  return (
    <button onClick={handleAdd} disabled={isAdding}>
      {isAdding ? "Adding..." : "Add to Cart"}
    </button>
  );
}
```

### 3. Sử dụng Server Actions cho mutations

```jsx
// ✅ Good - Server Action cho form submission
'use server';

export async function updateProfile(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');

  await db.user.update({
    where: { id: session.userId },
    data: { name, email }
  });

  revalidatePath('/profile');
}

// Client Component
'use client';

function ProfileForm({ user }) {
  return (
    <form action={updateProfile}>
      <input name="name" defaultValue={user.name} />
      <input name="email" defaultValue={user.email} />
      <button type="submit">Update</button>
    </form>
  );
}
```

---

## Common Pitfalls / Lỗi thường gặp

### 1. Quên "use client" directive

```jsx
// ❌ Error - Thiếu 'use client'
function ButtonWithHandler() {
  const handleClick = () => console.log("Clicked");
  return <button onClick={handleClick}>Click</button>;
}

// ✅ Correct - Thêm 'use client'
("use client");

function ButtonWithHandler() {
  const handleClick = () => console.log("Clicked");
  return <button onClick={handleClick}>Click</button>;
}
```

### 2. Dùng Client Component khi không cần

```jsx
// ❌ Bad - Client Component cho nội dung tĩnh
"use client";

function StaticContent() {
  return <div>Static content</div>;
}

// ✅ Good - Server Component cho nội dung tĩnh
function StaticContent() {
  return <div>Static content</div>;
}
```

### 3. Truyền function qua Server Component boundary

```jsx
// ❌ Error - Không thể truyền function qua Server Component
function Parent() {
  const handleClick = () => console.log("Clicked");
  return <Child onClick={handleClick} />;
}

// ✅ Correct - Dùng event handler trong Client Component
("use client");

function Child({ onClick }) {
  return <button onClick={onClick}>Click</button>;
}
```

---

## Tóm tắt / Summary

| Khái niệm / Concept       | Giải thích / Explanation                        |
| ------------------------- | ----------------------------------------------- |
| **Server Component**      | Render trên server, không gửi code xuống client |
| **Client Component**      | Render trên browser, có state, effects, events  |
| **"use client"**          | Directive đánh dấu Client Component             |
| **Server Action**         | Gọi server-side function từ client component    |
| **Streaming SSR**         | Gửi HTML từng phần khi sẵn sàng                 |
| **Progressive Rendering** | Render UI từng phần khi data sẵn sàng           |

---

_Updated: 2026-01-30_
