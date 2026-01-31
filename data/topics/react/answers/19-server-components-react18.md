# 19. Server Components (React 18+) / Server Components (React 18+)

> Câu trả lời chi tiết về React Server Components / Detailed answers about React Server Components

---

## React Server Components là gì? / What are React Server Components?

**React Server Components (RSC)** là một tính năng mới trong React cho phép bạn render components trên server và gửi HTML đã được render xuống client. Điều này giúp giảm bundle size, cải thiện performance và tăng cường bảo mật.

**React Server Components (RSC) is a new feature in React that allows you to render components on the server and send the rendered HTML to the client. This helps reduce bundle size, improve performance, and enhance security.**

### Đặc điểm chính / Key Characteristics

| Đặc điểm / Feature  | Server Component          | Client Component     |
| ------------------- | ------------------------- | -------------------- |
| **Render location** | Server                    | Browser              |
| **Bundle size**     | Không gửi xuống client    | Gửi xuống client     |
| **Access to**       | Database, filesystem, API | Browser APIs, events |
| **State/Effects**   | Không được phép           | Được phép            |
| **Directives**      | Không cần                 | `use client`         |

---

## Client vs Server Components / Client vs Server Components

### Server Components

**Server Components** chạy trên server và có thể truy cập trực tiếp vào backend resources.

**Server Components** run on the server and can directly access backend resources.

```jsx
// Server Component (mặc định trong Next.js App Router)
// Server Component (default in Next.js App Router)

import { db } from "@/lib/db";

async function UserList() {
  // Có thể truy cập database trực tiếp
  const users = await db.user.findMany();

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```

**Đặc điểm Server Components:**

- ✅ Truy cập database, filesystem, internal APIs
- ✅ Không gửi code xuống client (giảm bundle size)
- ✅ Không thể dùng state, effects, event handlers
- ✅ Không thể dùng browser APIs (window, document, etc.)

### Client Components

**Client Components** chạy trên browser và có thể sử dụng state, effects, và browser APIs.

**Client Components** run on the browser and can use state, effects, and browser APIs.

```jsx
"use client";

import { useState } from "react";

function Counter() {
  // Có thể dùng state
  const [count, setCount] = useState(0);

  // Có thể dùng event handlers
  const handleClick = () => {
    setCount(count + 1);
  };

  // Có thể dùng browser APIs
  useEffect(() => {
    console.log("Component mounted on client");
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

export default Counter;
```

**Đặc điểm Client Components:**

- ✅ Có thể dùng state, effects, hooks
- ✅ Có thể dùng event handlers (onClick, onChange, etc.)
- ✅ Có thể dùng browser APIs
- ❌ Không thể truy cập database trực tiếp
- ❌ Code được gửi xuống client (tăng bundle size)

---

## Khi nào dùng Server Components? / When to use Server Components?

### Use Cases cho Server Components

```jsx
// 1. Fetching data từ database
// 1. Fetching data from database

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

// 2. Reading files từ filesystem
// 2. Reading files from filesystem

import fs from "fs/promises";
import path from "path";

async function MarkdownContent({ filename }) {
  const filePath = path.join(process.cwd(), "content", filename);
  const content = await fs.readFile(filePath, "utf-8");

  return (
    <article>
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}

// 3. Accessing internal APIs
// 3. Accessing internal APIs

async function WeatherWidget({ city }) {
  const response = await fetch(`http://internal-api/weather?city=${city}`);
  const weather = await response.json();

  return (
    <div>
      <h3>{city}</h3>
      <p>{weather.temperature}°C</p>
    </div>
  );
}

// 4. Components không cần interactivity
// 4. Components that don't need interactivity

function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
    </header>
  );
}
```

### Quyết định khi nào dùng Server vs Client

```jsx
// ❌ Bad - Dùng Client Component khi không cần
"use client";

function StaticContent() {
  return (
    <div>
      <h1>About Us</h1>
      <p>We are a company...</p>
    </div>
  );
}

// ✅ Good - Dùng Server Component cho nội dung tĩnh
function StaticContent() {
  return (
    <div>
      <h1>About Us</h1>
      <p>We are a company...</p>
    </div>
  );
}

// ✅ Good - Dùng Client Component khi cần interactivity
("use client");

function InteractiveButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? "Close" : "Open"}
    </button>
  );
}
```

---

## Server Components với Next.js / Server Components with Next.js

### App Router Structure

```
app/
├── layout.tsx          # Server Component (root layout)
├── page.tsx            # Server Component (home page)
├── about/
│   └── page.tsx        # Server Component
├── products/
│   ├── page.tsx        # Server Component
│   └── [id]/
│       └── page.tsx    # Server Component
└── components/
    ├── ProductCard.tsx # Server Component
    └── AddToCart.tsx  # Client Component ('use client')
```

### Ví dụ thực tế với Next.js App Router

```jsx
// app/products/page.tsx - Server Component
import { db } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import AddToCart from "@/components/AddToCart"; // Client Component

async function getProducts() {
  return await db.product.findMany({
    include: { category: true },
  });
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="products-page">
      <h1>Our Products</h1>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product}>
            {/* Client Component con */}
            <AddToCart productId={product.id} />
          </ProductCard>
        ))}
      </div>
    </div>
  );
}

// components/ProductCard.tsx - Server Component
function ProductCard({ product, children }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <p className="category">{product.category.name}</p>
      {children}
    </div>
  );
}

// components/AddToCart.tsx - Client Component
("use client");

import { useState } from "react";

function AddToCart({ productId }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    setIsAdding(true);
    await fetch("/api/cart/add", {
      method: "POST",
      body: JSON.stringify({ productId }),
    });
    setIsAdding(false);
  };

  return (
    <button onClick={handleAdd} disabled={isAdding}>
      {isAdding ? "Adding..." : "Add to Cart"}
    </button>
  );
}
```

---

## Data fetching trong Server Components / Data fetching in Server Components

### Direct Database Access

```jsx
// lib/db.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}

// app/users/page.tsx
import { db } from '@/lib/db';

export default async function UsersPage() {
  // Truy cập database trực tiếp
  const users = await db.user.findMany({
    include: {
      posts: {
        take: 5,
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <h3>Recent Posts</h3>
          <ul>
            {user.posts.map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

### Fetching External APIs

```jsx
// app/weather/page.tsx
async function getWeather(city: string) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`,
    {
      // Server-side caching
      next: { revalidate: 3600 } // Cache trong 1 giờ
    }
  );

  return response.json();
}

export default async function WeatherPage() {
  const weather = await getWeather('Hanoi');

  return (
    <div>
      <h1>Weather in {weather.location.name}</h1>
      <p>Temperature: {weather.current.temp_c}°C</p>
      <p>Condition: {weather.current.condition.text}</p>
    </div>
  );
}
```

### Streaming Data với Suspense

```jsx
// app/dashboard/page.tsx
import { Suspense } from 'react';
import UserStats from '@/components/UserStats';
import RecentActivity from '@/components/RecentActivity';
import Notifications from '@/components/Notifications';

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-section">
        <Suspense fallback={<StatsSkeleton />}>
          <UserStats />
        </Suspense>
      </div>

      <div className="activity-section">
        <Suspense fallback={<ActivitySkeleton />}>
          <RecentActivity />
        </Suspense>
      </div>

      <div className="notifications-section">
        <Suspense fallback={<NotificationsSkeleton />}>
          <Notifications />
        </Suspense>
      </div>
    </div>
  );
}

// components/UserStats.tsx
import { db } from '@/lib/db';

export default async function UserStats() {
  const [userCount, postCount, commentCount] = await Promise.all([
    db.user.count(),
    db.post.count(),
    db.comment.count()
  ]);

  return (
    <div className="stats">
      <div className="stat-card">
        <h3>Users</h3>
        <p className="value">{userCount}</p>
      </div>
      <div className="stat-card">
        <h3>Posts</h3>
        <p className="value">{postCount}</p>
      </div>
      <div className="stat-card">
        <h3>Comments</h3>
        <p className="value">{commentCount}</p>
      </div>
    </div>
  );
}
```

---

## Composition Patterns / Mẫu Composition

### Server Component chứa Client Component

```jsx
// Server Component
async function BlogPost({ postId }) {
  const post = await db.post.findUnique({
    where: { id: postId },
    include: { author: true, comments: true },
  });

  return (
    <article>
      <h1>{post.title}</h1>
      <p>By {post.author.name}</p>
      <div>{post.content}</div>

      {/* Client Component cho interactivity */}
      <LikeButton postId={post.id} />

      <CommentSection postId={post.id} comments={post.comments} />
    </article>
  );
}

// Client Component
("use client");

function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    await fetch(`/api/posts/${postId}/like`, { method: "POST" });
    setLiked(!liked);
    setLikes(likes + (liked ? -1 : 1));
  };

  return (
    <button onClick={handleLike} className={liked ? "liked" : ""}>
      ♥ {likes} likes
    </button>
  );
}
```

### Passing Server Data to Client Components

```jsx
// Server Component
async function UserProfile({ userId }) {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  // Truyền data đã fetch từ server xuống client component
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>

      {/* Client component nhận data đã được fetch */}
      <EditProfileButton
        userId={user.id}
        currentName={user.name}
        currentBio={user.bio}
      />
    </div>
  );
}

// Client Component
("use client");

function EditProfileButton({ userId, currentName, currentBio }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentName);
  const [bio, setBio] = useState(currentBio);

  const handleSave = async () => {
    await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ name, bio }),
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="edit-form">
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    );
  }

  return <button onClick={() => setIsEditing(true)}>Edit Profile</button>;
}
```

---

## Best Practices / Thực hành tốt nhất

### 1. Mặc định dùng Server Components

```jsx
// ✅ Good - Mặc định là Server Component
function Page() {
  return <div>Content</div>;
}

// ❌ Bad - Thêm 'use client' khi không cần
("use client");

function Page() {
  return <div>Content</div>;
}
```

### 2. Chuyển Client Component xuống thấp nhất có thể

```jsx
// ❌ Bad - Toàn bộ component là client
"use client";

function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then((res) => res.json())
      .then(setProduct);
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <AddToCart productId={product.id} />
    </div>
  );
}

// ✅ Good - Chỉ phần cần interactivity là client
async function ProductPage({ productId }) {
  const product = await db.product.findUnique({
    where: { id: productId },
  });

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <AddToCart productId={product.id} />
    </div>
  );
}

// components/AddToCart.tsx
("use client");

function AddToCart({ productId }) {
  const [isAdding, setIsAdding] = useState(false);
  // ... implementation
}
```

### 3. Tận dụng Server Components cho SEO

```jsx
// ✅ Good - Server Component cho SEO
export default async function BlogPostPage({ params }) {
  const post = await db.post.findUnique({
    where: { slug: params.slug },
  });

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.ogImage} />
      </Head>

      <article>
        <h1>{post.title}</h1>
        <div>{post.content}</div>
      </article>
    </>
  );
}
```

### 4. Cache data fetching

```jsx
// ✅ Good - Sử dụng caching
export default async function ProductsPage() {
  const products = await db.product.findMany({
    // Cache trong 60 giây
    cacheStrategy: { swr: 60, ttl: 60 }
  });

  return <ProductList products={products} />;
}

// Hoặc với Next.js fetch
export default async function ProductsPage() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 } // ISR - Incremental Static Regeneration
  });

  const products = await res.json();

  return <ProductList products={products} />;
}
```

---

## Common Pitfalls / Lỗi thường gặp

### 1. Dùng state/effects trong Server Component

```jsx
// ❌ Error - Không thể dùng useState trong Server Component
function BadExample() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}

// ✅ Correct - Dùng Client Component cho state
("use client");

function GoodExample() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}
```

### 2. Dùng browser APIs trong Server Component

```jsx
// ❌ Error - Không thể dùng window trong Server Component
function BadExample() {
  const width = window.innerWidth;
  return <div>Width: {width}</div>;
}

// ✅ Correct - Dùng Client Component cho browser APIs
("use client");

function GoodExample() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return <div>Width: {width}</div>;
}
```

### 3. Quên 'use client' directive

```jsx
// ❌ Error - Thiếu 'use client'
function ButtonWithHandler() {
  const handleClick = () => {
    console.log("Clicked!");
  };

  return <button onClick={handleClick}>Click me</button>;
}

// ✅ Correct - Thêm 'use client'
("use client");

function ButtonWithHandler() {
  const handleClick = () => {
    console.log("Clicked!");
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

---

## Tóm tắt / Summary

| Khái niệm / Concept  | Giải thích / Explanation                             |
| -------------------- | ---------------------------------------------------- |
| **Server Component** | Render trên server, không gửi code xuống client      |
| **Client Component** | Render trên browser, có state, effects, events       |
| **'use client'**     | Directive đánh dấu component chạy trên client        |
| **Direct DB access** | Server Components có thể truy cập database trực tiếp |
| **Streaming**        | Gửi từng phần UI khi sẵn sàng với Suspense           |
| **Zero bundle**      | Server Components không tăng bundle size client      |

---

_Updated: 2026-01-30_
