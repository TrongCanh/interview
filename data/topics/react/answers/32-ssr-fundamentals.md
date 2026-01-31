# 32. SSR Fundamentals / SSR Cơ bản

> Câu trả lời chi tiết về SSR Fundamentals / Detailed answers about SSR Fundamentals

---

## CSR vs SSR vs SSG vs ISR / CSR vs SSR vs SSG vs ISR

### Client-Side Rendering (CSR)

**CSR** - Client-Side Rendering: HTML được render trên browser bằng JavaScript.

**CSR** - Client-Side Rendering: HTML is rendered on the browser by JavaScript.

```
Browser Request → Server sends blank HTML + JS bundle →
JS executes → Data fetched → Content rendered
```

```jsx
// CSR Example (Create React App)
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return <div>{data.content}</div>;
}
```

**Ưu điểm / Pros:**

- Interactive ngay lập tức
- Easy deployment (static hosting)
- Good cho dynamic applications

**Nhược điểm / Cons:**

- TTFB (Time to First Byte) nhanh nhưng FCP (First Contentful Paint) chậm
- SEO kém hơn
- JavaScript nặng

### Server-Side Rendering (SSR)

**SSR** - Server-Side Rendering: HTML được render trên server và gửi xuống client.

**SSR** - Server-Side Rendering: HTML is rendered on the server and sent to the client.

```
Browser Request → Server renders HTML →
HTML sent to client → JS hydrates → Interactive
```

```jsx
// SSR Example (Next.js getServerSideProps)
export async function getServerSideProps() {
  const data = await fetch("/api/data").then((res) => res.json());

  return { props: { data } };
}

function Page({ data }) {
  return <div>{data.content}</div>;
}
```

**Ưu điểm / Pros:**

- FCP nhanh hơn
- SEO tốt hơn
- Better cho content-heavy sites

**Nhược điểm / Cons:**

- TTFB chậm hơn
- Server load cao hơn
- Hydration có thể gây layout shifts

### Static Site Generation (SSG)

**SSG** - Static Site Generation: HTML được generate tại build time.

**SSG** - Static Site Generation: HTML is generated at build time.

```
Build time → HTML generated → Static files served → Fast delivery
```

```jsx
// SSG Example (Next.js getStaticProps)
export async function getStaticProps() {
  const data = await fetch("/api/data").then((res) => res.json());

  return { props: { data } };
}

function Page({ data }) {
  return <div>{data.content}</div>;
}
```

**Ưu điểm / Pros:**

- Tốc độ nhanh nhất
- CDN friendly
- SEO tốt nhất
- Server load thấp nhất

**Nhược điểm / Cons:**

- Không dynamic content
- Build time dài cho nhiều pages
- Cần rebuild khi content thay đổi

### Incremental Static Regeneration (ISR)

**ISR** - Incremental Static Regeneration: Kết hợp SSG và SSR - static pages được regenerate khi cần.

**ISR** - Incremental Static Regeneration: Combines SSG and SSR - static pages are regenerated when needed.

```
Build time → Static HTML generated →
Request → Check cache → Serve static or regenerate → Cache updated
```

```jsx
// ISR Example (Next.js getStaticProps with revalidate)
export async function getStaticProps() {
  const data = await fetch("/api/data").then((res) => res.json());

  return {
    props: { data },
    revalidate: 60, // Revalidate every 60 seconds
  };
}
```

**Ưu điểm / Pros:**

- Fast như SSG
- Dynamic như SSR
- Good cho content thay đổi thường xuyên

**Nhược điểm / Cons:**

- Cần server cho revalidation
- Cache management phức tạp hơn

---

## Hydration là gì? / What is Hydration?

### Định nghĩa / Definition

**Hydration** là quá trình React "đánh thức" (wakes up) static HTML và thêm interactivity.

**Hydration** is the process of React "waking up" static HTML and adding interactivity.

```jsx
// Hydration process
// 1. Server sends HTML
<div id="root">
  <h1>Hello World</h1>
</div>

// 2. Client JS loads
<script src="bundle.js"></script>

// 3. React hydrates
React.hydrateRoot(
  document.getElementById('root'),
  <App />
);
```

### Hydration Issues / Vấn đề Hydration

```jsx
// ❌ Bad - Hydration mismatch
function App() {
  // Date khác nhau giữa server và client
  const date = new Date();

  return <div>{date.toString()}</div>;
}

// ✅ Good - Sử dụng server-only data
function App({ serverDate }) {
  const [clientDate, setClientDate] = useState(null);

  useEffect(() => {
    setClientDate(new Date());
  }, []);

  return (
    <div>
      <p>Server: {serverDate}</p>
      <p>Client: {clientDate}</p>
    </div>
  );
}
```

---

## Server-side Rendering với React / Server-side Rendering với React

### Basic SSR với Express

```jsx
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

const app = express();

app.get("*", (req, res) => {
  const appHtml = renderToString(<App />);

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR App</title>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000);
```

### SSR với Data Fetching

```jsx
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

const app = express();

app.get("/", async (req, res) => {
  // Fetch data trên server
  const data = await fetch("https://api.example.com/data").then((res) =>
    res.json(),
  );

  // Render với data
  const appHtml = renderToString(<App data={data} />);

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR App</title>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script>
          window.__INITIAL_DATA__ = ${JSON.stringify(data)};
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000);
```

### Client-side Hydration

```jsx
// Client entry point
import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";

// Lấy initial data từ server
const initialData = window.__INITIAL_DATA__;

// Hydrate app với initial data
hydrateRoot(document.getElementById("root"), <App initialData={initialData} />);
```

---

## Next.js SSR Basics / Next.js SSR Cơ bản

### Pages Router SSR

```jsx
// pages/index.js - SSR with getServerSideProps
export async function getServerSideProps() {
  // Fetch data trên server
  const posts = await fetch("https://api.example.com/posts").then((res) =>
    res.json(),
  );

  return {
    props: { posts },
  };
}

function HomePage({ posts }) {
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
```

### App Router SSR

```jsx
// app/page.tsx - Server Component
async function HomePage() {
  // Fetch data trực tiếp trong Server Component
  const posts = await fetch("https://api.example.com/posts").then((res) =>
    res.json(),
  );

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
```

---

## SEO Considerations / Xem xét SEO

### SEO Benefits của SSR

**SSR** cung cấp nhiều lợi ích cho SEO:

- **Faster First Contentful Paint** - Content hiển thị nhanh hơn
- **Crawlable content** - Search engines có thể crawl content
- **Meta tags** - Server có thể generate dynamic meta tags
- **Social sharing** - Open Graph tags được render đúng

```jsx
// Dynamic meta tags với SSR
export async function getServerSideProps() {
  const post = await fetch(`/api/posts/${id}`).then((res) => res.json());

  return {
    props: { post },
    // Generate meta tags
    head: {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        image: post.ogImage,
      },
    },
  };
}

function PostPage({ post }) {
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

### SEO Checklist cho SSR

```jsx
// ✅ Good - Complete SEO với SSR
export async function getServerSideProps() {
  const page = await fetch("/api/page").then((res) => res.json());

  return {
    props: { page },
    head: {
      title: page.title,
      description: page.description,
      canonical: `https://example.com${page.slug}`,
      openGraph: {
        title: page.title,
        description: page.description,
        image: page.ogImage,
        url: `https://example.com${page.slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: page.title,
        description: page.description,
        image: page.ogImage,
      },
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: page.title,
        description: page.description,
        image: page.ogImage,
        author: {
          "@type": "Person",
          name: page.author.name,
        },
      },
    },
  };
}
```

---

## Tóm tắt / Summary

| Rendering / Render | Mô tả / Description     | Use Case                      |
| ------------------ | ----------------------- | ----------------------------- |
| **CSR**            | Render trên browser     | Interactive apps, dashboards  |
| **SSR**            | Render trên server      | Content-heavy, SEO-critical   |
| **SSG**            | Generate tại build time | Static sites, blogs           |
| **ISR**            | Revalidate khi cần      | Content thay đổi thường xuyên |

---

## Best Practices / Thực hành tốt nhất

### 1. Chọn đúng rendering strategy

```jsx
// ✅ Good - Chọn SSR cho SEO-critical pages
// Blog posts, product pages
export async function getServerSideProps() {
  return { props: { data: await fetchData() } };
}

// ✅ Good - Chọn SSG cho static content
// About page, contact page
export async function getStaticProps() {
  return { props: { data: await fetchData() } };
}
```

### 2. Handle hydration mismatches

```jsx
// ✅ Good - Sử dụng useEffect cho client-only data
function Component({ serverData }) {
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    setClientDate(new Date());
  }, []);

  return (
    <div>
      <p>Server: {serverData}</p>
      <p>Client: {clientData}</p>
    </div>
  );
}
```

### 3. Optimize cho SEO

```jsx
// ✅ Good - Dynamic meta tags
export async function getServerSideProps() {
  const post = await fetchPost();

  return {
    props: { post },
    head: {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        image: post.ogImage,
      },
    },
  };
}
```

---

_Updated: 2026-01-30_
