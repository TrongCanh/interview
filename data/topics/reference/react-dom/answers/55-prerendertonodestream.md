# prerenderToNodeStream / Prerender To Node Stream

## Định nghĩa / Definition

`prerenderToNodeStream` là một API của React-DOM Server được sử dụng để prerender một React tree thành một Node.js Readable stream. API này được sử dụng trong React 19+ để tạo static HTML với streaming cho Static Site Generation (SSG) và hỗ trợ Server Components.

`prerenderToNodeStream` is a React-DOM Server API used to prerender a React tree into a Node.js Readable stream. This API is used in React 19+ to create static HTML with streaming for Static Site Generation (SSG) and supports Server Components.

## Cú pháp / Syntax

```javascript
import { prerenderToNodeStream } from 'react-dom/server';

await prerenderToNodeStream(reactNode, options?)
```

## Tham số / Parameters

| Tham số     | Kiểu              | Mô tả                                         |
| ----------- | ----------------- | --------------------------------------------- |
| `reactNode` | ReactNode         | React node để prerender (thường là `<App />`) |
| `options`   | Object (optional) | Tùy chọn cấu hình cho rendering               |

**Options Object:**

| Thuộc tính                | Kiểu     | Mô tả                                |
| ------------------------- | -------- | ------------------------------------ |
| `bootstrapModules`        | string[] | Các script modules để bootstrap      |
| `clientReferenceManifest` | Object   | Manifest cho client references       |
| `identifierPrefix`        | string   | Prefix cho các ID được tạo bởi React |
| `onError`                 | function | Callback khi có lỗi xảy ra           |

## Giá trị trả về / Return Value

Trả về một Promise resolves thành một Node.js Readable Stream.

Returns a Promise that resolves to a Node.js Readable Stream.

## Cách hoạt động / How it Works

1. **Static Render**: React render component tree thành static HTML
2. **Streaming**: HTML được gửi theo từng phần (chunk) qua Node.js stream
3. **Server Components**: Render Server Components trên server
4. **Error Handling**: Cung cấp callback `onError` để xử lý lỗi

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```javascript
import { prerenderToNodeStream } from "react-dom/server";
import fs from "fs";
import path from "path";
import App from "./App";

async function generateStaticSite() {
  const stream = await prerenderToNodeStream(<App />);

  const distPath = path.join("dist", "index.html");
  const writeStream = fs.createWriteStream(distPath);

  writeStream.write("<!DOCTYPE html>");
  stream.pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
}

generateStaticSite();
```

### Ví dụ với Multiple Pages

```javascript
import { prerenderToNodeStream } from "react-dom/server";
import fs from "fs";
import path from "path";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

const pages = [
  { path: "index.html", component: <HomePage /> },
  { path: "about.html", component: <AboutPage /> },
  { path: "contact.html", component: <ContactPage /> },
];

async function generateStaticPages() {
  for (const page of pages) {
    const stream = await prerenderToNodeStream(page.component);
    const distPath = path.join("dist", page.path);
    const writeStream = fs.createWriteStream(distPath);

    writeStream.write("<!DOCTYPE html>");
    stream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    console.log(`Generated: ${page.path}`);
  }
}

generateStaticPages();
```

### Ví dụ với Data Fetching

```javascript
import { prerenderToNodeStream } from "react-dom/server";
import fs from "fs";
import path from "path";

async function fetchPosts() {
  const response = await fetch("https://api.example.com/posts");
  return response.json();
}

function BlogPage({ posts }) {
  return (
    <html>
      <head>
        <title>Blog</title>
      </head>
      <body>
        <h1>Blog Posts</h1>
        {posts.map((post) => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </article>
        ))}
      </body>
    </html>
  );
}

async function generateBlogPages() {
  const posts = await fetchPosts();

  // Generate index page
  const indexStream = await prerenderToNodeStream(<BlogPage posts={posts} />);
  const indexWriteStream = fs.createWriteStream("dist/blog/index.html");
  indexWriteStream.write("<!DOCTYPE html>");
  indexStream.pipe(indexWriteStream);
  await new Promise((resolve) => indexWriteStream.on("finish", resolve));

  // Generate individual post pages
  for (const post of posts) {
    const postStream = await prerenderToNodeStream(
      <html>
        <head>
          <title>{post.title}</title>
        </head>
        <body>
          <article>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </body>
      </html>,
    );
    const postWriteStream = fs.createWriteStream(`dist/blog/${post.slug}.html`);
    postWriteStream.write("<!DOCTYPE html>");
    postStream.pipe(postWriteStream);
    await new Promise((resolve) => postWriteStream.on("finish", resolve));
  }
}

generateBlogPages();
```

### Ví dụ với Server Components

```javascript
import { prerenderToNodeStream } from "react-dom/server";
import fs from "fs";
import path from "path";

// Server Component
async function UserProfile({ userId }) {
  const user = await fetchUser(userId);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

async function fetchUser(userId) {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  return response.json();
}

// Client Component
function App() {
  return (
    <html>
      <head>
        <title>User Profile</title>
      </head>
      <body>
        <UserProfile userId="1" />
      </body>
    </html>
  );
}

async function generateUserProfile() {
  const stream = await prerenderToNodeStream(<App />);
  const writeStream = fs.createWriteStream("dist/user-profile.html");

  writeStream.write("<!DOCTYPE html>");
  stream.pipe(writeStream);

  await new Promise((resolve) => writeStream.on("finish", resolve));
}

generateUserProfile();
```

### Ví dụ với Error Handling

```javascript
import { prerenderToNodeStream } from "react-dom/server";
import fs from "fs";
import path from "path";
import App from "./App";

async function generateStaticSite() {
  try {
    const stream = await prerenderToNodeStream(<App />, {
      onError(error) {
        console.error("Prerender error:", error);
      },
    });

    const distPath = path.join("dist", "index.html");
    const writeStream = fs.createWriteStream(distPath);

    writeStream.write("<!DOCTYPE html>");
    stream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    console.log("Static site generated!");
  } catch (error) {
    console.error("Error generating static site:", error);
    process.exit(1);
  }
}

generateStaticSite();
```

## Khi nào nên dùng / When to Use

- Khi cần Static Site Generation (SSG) với streaming
- Khi muốn tạo static HTML với Node.js streams
- Khi sử dụng React 19+ với Server Components
- Khi muốn tối ưu hiệu suất với streaming
- Khi deploy đến static hosting (GitHub Pages, Netlify, Vercel)

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi không sử dụng Node.js (sử dụng `prerender` hoặc `resumeAndPrerenderToNodeStream` cho Web Streams)
- Khi cần dynamic content (sử dụng `renderToPipeableStream`)
- Khi cần client-side hydration (sử dụng `renderToString`)
- Khi sử dụng React phiên bản cũ hơn 19

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

- Không thể implement Static Site Generation (SSG) với streaming trên Node.js
- Không thể prerender Server Components với streaming
- Phải sử dụng `prerender` (non-streaming) hoặc các SSR methods khác

## Vấn đề được giải quyết / Problems Solved

- **SSG with Streaming**: Giải quyết vấn đề tạo static HTML với streaming
- **Server Components**: Hỗ trợ prerender Server Components với streaming
- **Performance**: Tối ưu hiệu suất với streaming
- **Deployment**: Dễ dàng deploy đến static hosting
- **SEO**: Tốt cho SEO với static HTML

## Ưu điểm / Advantages

- Hỗ trợ Static Site Generation (SSG) với streaming
- Hỗ trợ Server Components
- Streaming giúp giảm memory usage
- Tối ưu hiệu suất với streaming
- Dễ dàng deploy đến static hosting
- Tốt cho SEO với static HTML

## Nhược điểm / Disadvantages

- Chỉ hoạt động với React 19+
- Chỉ hoạt động với Node.js
- Không hỗ trợ dynamic content
- Không hỗ trợ client-side hydration (tùy use case)
- Cần rebuild khi có content thay đổi

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm          | prerenderToNodeStream | prerender | renderToPipeableStream |
| ----------------- | --------------------- | --------- | ---------------------- |
| React Version     | 19+                   | 19+       | 18+                    |
| Platform          | Node.js               | Any       | Node.js                |
| Streaming         | Có                    | Không     | Có                     |
| SSG Support       | Có                    | Có        | Không                  |
| Server Components | Có                    | Có        | Không                  |
| Use Case          | SSG Streaming         | SSG       | Streaming SSR          |

## Best Practices / Các thực hành tốt

- Sử dụng cho Static Site Generation (SSG) với streaming
- Sử dụng với React 19+ Server Components
- Handle error cases với `onError`
- Tận dụng data fetching trong Server Components
- Use streaming cho large pages để giảm memory usage

## Common Pitfalls / Các lỗi thường gặp

- Sử dụng với React phiên bản cũ hơn 19
- Quên thêm `<!DOCTYPE html>` khi tạo full HTML page
- Không handle error cases
- Sử dụng cho dynamic content
- Không hiểu rằng prerender không hỗ trợ hydration

## Performance Considerations / Yếu tố hiệu suất

- Streaming giúp giảm memory usage
- Tối ưu hiệu suất với static content
- Không cần server runtime sau khi build
- Có thể cache prerendered content
- Tốt cho SEO với static HTML

## Browser Support / Hỗ trợ trình duyệt

- Client-side: Tất cả trình duyệt hiện đại
- Server-side: Node.js 12.0.0+ với React 19+

## Tài liệu tham khảo / References

- [React DOM Server: prerenderToNodeStream - react.dev](https://react.dev/reference/react-dom/server/prerenderToNodeStream)
- [React 19 Documentation - react.dev](https://react.dev/blog/2024/12/05/react-19)
- [Static Site Generation - Next.js](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)

## Câu hỏi phỏng vấn / Interview Questions

1. `prerenderToNodeStream` là gì và khi nào nên sử dụng?
2. Sự khác biệt giữa `prerenderToNodeStream` và `prerender`?
3. Sự khác biệt giữa `prerenderToNodeStream` và `renderToPipeableStream`?
4. Static Site Generation (SSG) là gì?
5. `prerenderToNodeStream` hoạt động như thế nào với React 19+?
6. `prerenderToNodeStream` có hỗ trợ Server Components không?
7. Làm thế nào để implement SSG với `prerenderToNodeStream`?
8. Tại sao `prerenderToNodeStream` chỉ hoạt động với Node.js?
9. Làm thế nào để handle errors khi sử dụng `prerenderToNodeStream`?
10. Streaming giúp cải thiện hiệu suất như thế nào trong SSG?
