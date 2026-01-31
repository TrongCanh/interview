# prerender / Prerender

## Định nghĩa / Definition

`prerender` là một API của React-DOM Server được sử dụng để prerender một React tree thành static HTML. API này được sử dụng trong React 19+ để tạo static HTML cho Static Site Generation (SSG) và hỗ trợ Server Components.

`prerender` is a React-DOM Server API used to prerender a React tree into static HTML. This API is used in React 19+ to create static HTML for Static Site Generation (SSG) and supports Server Components.

## Cú pháp / Syntax

```javascript
import { prerender } from 'react-dom/server';

await prerender(reactNode, options?)
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

## Giá trị trả về / Return Value

Trả về một Promise resolves thành một chuỗi HTML string.

Returns a Promise that resolves to an HTML string.

## Cách hoạt động / How it Works

1. **Static Render**: React render component tree thành static HTML
2. **Server Components**: Render Server Components trên server
3. **No Hydration Data**: Không tạo data cho client-side hydration (tùy theo use case)
4. **Complete Output**: Trả về toàn bộ HTML string khi render hoàn tất

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```javascript
import { prerender } from "react-dom/server";
import App from "./App";

const html = await prerender(<App />);

console.log(html);
// Output: <html>...</html>
```

### Ví dụ với Static Site Generation (SSG)

```javascript
import { prerender } from "react-dom/server";
import fs from "fs";
import path from "path";
import App from "./App";

async function generateStaticSite() {
  // Prerender app
  const html = await prerender(<App />);

  // Save to file system
  const distPath = path.join("dist", "index.html");
  fs.writeFileSync(distPath, `<!DOCTYPE html>${html}`);

  console.log("Static site generated!");
}

generateStaticSite();
```

### Ví dụ với Multiple Pages

```javascript
import { prerender } from "react-dom/server";
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
    const html = await prerender(page.component);
    const distPath = path.join("dist", page.path);
    fs.writeFileSync(distPath, `<!DOCTYPE html>${html}`);
    console.log(`Generated: ${page.path}`);
  }
}

generateStaticPages();
```

### Ví dụ với Data Fetching

```javascript
import { prerender } from "react-dom/server";
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
  const indexHtml = await prerender(<BlogPage posts={posts} />);
  fs.writeFileSync("dist/blog/index.html", `<!DOCTYPE html>${indexHtml}`);

  // Generate individual post pages
  for (const post of posts) {
    const postHtml = await prerender(
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
    fs.writeFileSync(
      `dist/blog/${post.slug}.html`,
      `<!DOCTYPE html>${postHtml}`,
    );
  }
}

generateBlogPages();
```

### Ví dụ với Server Components

```javascript
import { prerender } from "react-dom/server";
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
  const html = await prerender(<App />);
  fs.writeFileSync("dist/user-profile.html", `<!DOCTYPE html>${html}`);
}

generateUserProfile();
```

### Ví dụ với Error Handling

```javascript
import { prerender } from "react-dom/server";
import fs from "fs";
import path from "path";
import App from "./App";

async function generateStaticSite() {
  try {
    const html = await prerender(<App />);
    const distPath = path.join("dist", "index.html");
    fs.writeFileSync(distPath, `<!DOCTYPE html>${html}`);
    console.log("Static site generated!");
  } catch (error) {
    console.error("Error generating static site:", error);
    process.exit(1);
  }
}

generateStaticSite();
```

## Khi nào nên dùng / When to Use

- Khi cần Static Site Generation (SSG)
- Khi muốn tạo static HTML cho deployment
- Khi sử dụng React 19+ với Server Components
- Khi không cần client-side hydration
- Khi muốn tối ưu hiệu suất với static content
- Khi deploy đến static hosting (GitHub Pages, Netlify, Vercel)

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi cần dynamic content (sử dụng `renderToPipeableStream` hoặc `renderToReadableStream`)
- Khi cần client-side hydration (sử dụng `renderToString`)
- Khi sử dụng React phiên bản cũ hơn 19
- Khi cần streaming

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

- Không thể implement Static Site Generation (SSG) với React 19+
- Không thể prerender Server Components
- Phải sử dụng các SSR methods khác cho static content
- Không thể tận dụng React 19+ Server Components cho static sites

## Vấn đề được giải quyết / Problems Solved

- **Static Site Generation**: Giải quyết vấn đề tạo static HTML với React 19+
- **Server Components**: Hỗ trợ prerender Server Components
- **Performance**: Tối ưu hiệu suất với static content
- **Deployment**: Dễ dàng deploy đến static hosting
- **SEO**: Tốt cho SEO với static HTML

## Ưu điểm / Advantages

- Hỗ trợ Static Site Generation (SSG)
- Hỗ trợ Server Components
- Tối ưu hiệu suất với static content
- Dễ dàng deploy đến static hosting
- Tốt cho SEO
- Không cần server runtime sau khi build

## Nhược điểm / Disadvantages

- Chỉ hoạt động với React 19+
- Không hỗ trợ dynamic content
- Không hỗ trợ client-side hydration (tùy use case)
- Không hỗ trợ streaming
- Cần rebuild khi có content thay đổi

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm          | prerender       | renderToString | renderToStaticMarkup |
| ----------------- | --------------- | -------------- | -------------------- |
| React Version     | 19+             | Any            | Any                  |
| SSG Support       | Có              | Không          | Có                   |
| Server Components | Có              | Không          | Không                |
| Hydration Support | Tùy             | Có             | Không                |
| Streaming         | Không           | Không          | Không                |
| Use Case          | SSG (React 19+) | SSR            | Static HTML          |

## Best Practices / Các thực hành tốt

- Sử dụng cho Static Site Generation (SSG)
- Kết hợp với `resume` cho ISR
- Sử dụng với React 19+ Server Components
- Cache prerendered content
- Handle error cases
- Tận dụng data fetching trong Server Components

## Common Pitfalls / Các lỗi thường gặp

- Sử dụng với React phiên bản cũ hơn 19
- Quên thêm `<!DOCTYPE html>` khi tạo full HTML page
- Không handle error cases
- Sử dụng cho dynamic content
- Không hiểu rằng prerender không hỗ trợ streaming

## Performance Considerations / Yếu tố hiệu suất

- Tối ưu hiệu suất với static content
- Không cần server runtime sau khi build
- Có thể cache prerendered content
- Tốt cho SEO với static HTML
- Build time có thể lâu cho large sites

## Browser Support / Hỗ trợ trình duyệt

- Client-side: Tất cả trình duyệt hiện đại
- Server-side: React 19+

## Tài liệu tham khảo / References

- [React DOM Server: prerender - react.dev](https://react.dev/reference/react-dom/server/prerender)
- [React 19 Documentation - react.dev](https://react.dev/blog/2024/12/05/react-19)
- [Static Site Generation - Next.js](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)

## Câu hỏi phỏng vấn / Interview Questions

1. `prerender` là gì và khi nào nên sử dụng?
2. Sự khác biệt giữa `prerender` và `renderToString`?
3. Sự khác biệt giữa `prerender` và `renderToStaticMarkup`?
4. Static Site Generation (SSG) là gì?
5. `prerender` hoạt động như thế nào với React 19+?
6. `prerender` có hỗ trợ Server Components không?
7. Làm thế nào để implement SSG với `prerender`?
8. Tại sao `prerender` chỉ hoạt động với React 19+?
9. Làm thế nào để handle errors khi sử dụng `prerender`?
10. ISR (Incremental Static Regeneration) là gì và làm thế nào để implement nó?
