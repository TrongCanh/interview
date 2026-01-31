# 33. Advanced SSR / SSR Nâng cao

> Câu trả lời chi tiết về Advanced SSR / Detailed answers about Advanced SSR

---

## Streaming SSR / Streaming SSR

### Streaming SSR là gì? / What is Streaming SSR?

**Streaming SSR** cho phép server gửi HTML từng phần xuống client khi từng phần được render, thay vì đợi toàn bộ page hoàn tất.

**Streaming SSR** allows server to send HTML parts to client as they are rendered, instead of waiting for the entire page to complete.

### Streaming với React Suspense

```jsx
import { Suspense } from "react";

function StreamingPage() {
  return (
    <html>
      <head>
        <title>Streaming SSR</title>
      </head>
      <body>
        {/* Header render nhanh nhất */}
        <Suspense fallback={<HeaderSkeleton />}>
          <PageHeader />
        </Suspense>

        {/* Main content render sau */}
        <Suspense fallback={<ContentSkeleton />}>
          <MainContent />
        </Suspense>

        {/* Footer render cuối cùng */}
        <Suspense fallback={<FooterSkeleton />}>
          <PageFooter />
        </Suspense>
      </body>
    </html>
  );
}
```

### Server-side Streaming với Node.js

```jsx
import { renderToPipeableStream } from "react-dom/server";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  // Tạo stream
  const stream = renderToPipeableStream(<App />);

  // Set headers cho streaming
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");

  // Pipe stream đến response
  stream.pipe(res);
});

app.listen(3000);
```

### Streaming với Next.js

```jsx
// app/page.tsx - Streaming với Suspense
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading header...</div>}>
        <Header />
      </Suspense>

      <Suspense fallback={<div>Loading content...</div>}>
        <Content />
      </Suspense>

      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}
```

---

## Suspense on the Server / Suspense trên Server

### Server-side Suspense

**Server-side Suspense** cho phép bạn suspend rendering khi data chưa sẵn sàng.

**Server-side Suspense** allows you to suspend rendering when data is not ready.

```jsx
import { Suspense } from "react";

async function fetchUser(userId) {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}

function UserPage({ params }) {
  return (
    <div>
      {/* Suspend khi data chưa sẵn sàng */}
      <Suspense fallback={<div>Loading user...</div>}>
        <UserContent userId={params.id} />
      </Suspense>
    </div>
  );
}

async function UserContent({ userId }) {
  // Data fetch được suspend
  const user = await fetchUser(userId);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### Nested Suspense Boundaries

```jsx
function DashboardPage() {
  return (
    <div className="dashboard">
      {/* Outer Suspense */}
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}

function DashboardContent() {
  return (
    <>
      {/* Inner Suspense cho stats */}
      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>

      {/* Inner Suspense cho chart */}
      <Suspense fallback={<ChartSkeleton />}>
        <ChartSection />
      </Suspense>

      {/* Inner Suspense cho activity */}
      <Suspense fallback={<ActivitySkeleton />}>
        <ActivitySection />
      </Suspense>
    </>
  );
}
```

---

## Data Fetching Strategies / Chiến lược Data Fetching

### Parallel Data Fetching

```jsx
// Fetch data song song
async function fetchPageData() {
  const [user, posts, comments] = await Promise.all([
    fetch("/api/user").then((res) => res.json()),
    fetch("/api/posts").then((res) => res.json()),
    fetch("/api/comments").then((res) => res.json()),
  ]);

  return { user, posts, comments };
}

// Server Component với parallel fetching
async function Page() {
  const { user, posts, comments } = await fetchPageData();

  return (
    <div>
      <UserProfile user={user} />
      <PostList posts={posts} />
      <CommentList comments={comments} />
    </div>
  );
}
```

### Sequential Data Fetching

```jsx
// Fetch data tuần tự
async function fetchPageData() {
  // Fetch user trước
  const user = await fetch("/api/user").then((res) => res.json());

  // Sau đó fetch posts của user
  const posts = await fetch(`/api/users/${user.id}/posts`).then((res) =>
    res.json(),
  );

  // Cuối cùng fetch comments của posts
  const comments = await Promise.all(
    posts.map((post) =>
      fetch(`/api/posts/${post.id}/comments`).then((res) => res.json()),
    ),
  );

  return { user, posts, comments };
}
```

### Waterfall Prevention

```jsx
// ❌ Bad - Waterfall effect
async function BadPage() {
  const user = await fetchUser();
  const posts = await fetchPosts(user.id);
  const comments = await fetchComments(posts.map((p) => p.id));

  return <PageContent user={user} posts={posts} comments={comments} />;
}

// ✅ Good - Parallel fetching
async function GoodPage() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments(),
  ]);

  return <PageContent user={user} posts={posts} comments={comments} />;
}
```

---

## Caching Strategies / Chiến lược Caching

### HTTP Caching

```jsx
// Server-side caching với HTTP headers
export async function getServerSideProps() {
  const data = await fetchData();

  return {
    props: { data },
    headers: {
      // Cache trong 60 giây
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      // ETag cho validation
      ETag: generateETag(data),
    },
  };
}
```

### CDN Caching

```jsx
// CDN-friendly caching
export async function getStaticProps() {
  const data = await fetchData();

  return {
    props: { data },
    // Revalidate mỗi 5 phút
    revalidate: 300,
  };
}

// Hoặc với Next.js App Router
export const revalidate = 300; // 5 minutes

async function Page() {
  const data = await fetchData();
  return <div>{data.content}</div>;
}
```

### Redis Caching

```jsx
import { createClient } from "redis";

const redis = createClient();

async function getCachedData(key, fetchFn) {
  // Thử lấy từ cache
  const cached = await redis.get(key);

  if (cached) {
    return JSON.parse(cached);
  }

  // Nếu không có trong cache, fetch data
  const data = await fetchFn();

  // Lưu vào cache
  await redis.set(key, JSON.stringify(data), {
    EX: 300, // Expire sau 5 phút
  });

  return data;
}

// Sử dụng trong server component
async function Page() {
  const data = await getCachedData("page-data", fetchData);

  return <div>{data.content}</div>;
}
```

---

## Error Handling in SSR / Xử lý Lỗi trong SSR

### Error Boundaries trong SSR

```jsx
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }) {
  return (
    <div className="error-fallback">
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
    </div>
  );
}

function Page() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<div>Loading...</div>}>
        <PageContent />
      </Suspense>
    </ErrorBoundary>
  );
}
```

### Try-Catch trong Server Components

```jsx
async function ServerComponent({ id }) {
  try {
    const data = await fetchData(id);
    return <div>{data.content}</div>;
  } catch (error) {
    // Handle error
    return (
      <div className="error">
        <h1>Error loading data</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
```

### Error Pages

```jsx
// pages/404.js
export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">Go Home</a>
    </div>
  );
}

// pages/500.js
export default function ServerError() {
  return (
    <div className="server-error">
      <h1>500 - Server Error</h1>
      <p>Something went wrong on our end.</p>
      <a href="/">Go Home</a>
    </div>
  );
}

// pages/_error.js - Global error handler
export default function Error({ statusCode, title }) {
  return (
    <div className="error-page">
      <h1>{statusCode || 'Error'}</h1>
      <p>{title || 'Something went wrong'}</p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
```

---

## Performance Optimization for SSR / Tối ưu Performance cho SSR

### Code Splitting

```jsx
import { lazy, Suspense } from "react";

// Lazy load components
const HeavyComponent = lazy(() => import("./HeavyComponent"));
const AnotherHeavy = lazy(() => import("./AnotherHeavy"));

function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <AnotherHeavy />
      </Suspense>
    </div>
  );
}
```

### Inline Critical CSS

```jsx
// Inline critical CSS cho faster FCP
export async function getServerSideProps() {
  const criticalCSS = await getCriticalCSS();

  return {
    props: {},
    head: {
      style: [
        {
          css: criticalCSS,
          id: "critical-css",
        },
      ],
    },
  };
}
```

### Preload Critical Resources

```jsx
// Preload critical resources
export async function getServerSideProps() {
  return {
    props: {},
    head: {
      links: [
        {
          rel: "preload",
          href: "/fonts/main.woff2",
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/images/hero.jpg",
          as: "image",
        },
      ],
    },
  };
}
```

---

## Tóm tắt / Summary

| Khái niệm / Concept     | Giải thích / Explanation                 |
| ----------------------- | ---------------------------------------- |
| **Streaming SSR**       | Gửi HTML từng phần khi render            |
| **Server Suspense**     | Suspend rendering khi data chưa sẵn sàng |
| **Parallel Fetching**   | Fetch data song song                     |
| **Sequential Fetching** | Fetch data tuần tự                       |
| **HTTP Caching**        | Cache với HTTP headers                   |
| **CDN Caching**         | Cache static assets                      |
| **Error Boundaries**    | Handle errors trong SSR                  |

---

## Best Practices / Thực hành tốt nhất

### 1. Sử dụng streaming cho better UX

```jsx
// ✅ Good - Streaming với Suspense
<Suspense fallback={<div>Loading...</div>}>
  <Content />
</Suspense>
```

### 2. Cache data hiệu quả

```jsx
// ✅ Good - Cache với HTTP headers
return {
  props: { data },
  headers: {
    "Cache-Control": "public, s-maxage=60",
  },
};
```

### 3. Handle errors gracefully

```jsx
// ✅ Good - Error boundary trong SSR
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <Suspense fallback={<div>Loading...</div>}>
    <Content />
  </Suspense>
</ErrorBoundary>
```

---

_Updated: 2026-01-30_
