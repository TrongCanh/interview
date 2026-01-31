# renderToStaticMarkup / Render To Static Markup

## Định nghĩa / Definition

`renderToStaticMarkup` là một API của React-DOM Server được sử dụng để render một React tree thành một chuỗi HTML static. API này tương tự như `renderToString` nhưng không tạo ra các thuộc tính React nội bộ (như `data-reactroot`), giúp giảm kích thước HTML và phù hợp cho việc tạo static HTML không cần hydration.

`renderToStaticMarkup` is a React-DOM Server API used to render a React tree into a static HTML string. This API is similar to `renderToString` but doesn't create React internal attributes (like `data-reactroot`), reducing HTML size and is suitable for generating static HTML that doesn't need hydration.

## Cú pháp / Syntax

```javascript
import { renderToStaticMarkup } from "react-dom/server";

renderToStaticMarkup(reactNode);
```

## Tham số / Parameters

| Tham số     | Kiểu      | Mô tả                                      |
| ----------- | --------- | ------------------------------------------ |
| `reactNode` | ReactNode | React node để render (thường là `<App />`) |

## Giá trị trả về / Return Value

Trả về một chuỗi HTML string.

Returns an HTML string.

## Cách hoạt động / How it Works

1. **Render**: React render component tree thành HTML
2. **Static Output**: Tạo HTML mà không có các thuộc tính React nội bộ
3. **No Hydration**: Không tạo ra data để client-side hydration
4. **Clean HTML**: Output HTML sạch, không có `data-react-*` attributes

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```javascript
import { renderToStaticMarkup } from "react-dom/server";
import App from "./App";

const html = renderToStaticMarkup(<App />);

console.log(html);
// Output: <div><h1>Hello World</h1></div>
// (không có data-reactroot attribute)
```

### Ví dụ với Email Template

```javascript
import { renderToStaticMarkup } from "react-dom/server";

function EmailTemplate({ name, message }) {
  return (
    <html>
      <body>
        <div style={{ fontFamily: "Arial, sans-serif" }}>
          <h1>Xin chào, {name}!</h1>
          <p>{message}</p>
          <a href="https://example.com/unsubscribe">Unsubscribe</a>
        </div>
      </body>
    </html>
  );
}

const emailHtml = renderToStaticMarkup(
  <EmailTemplate name="John Doe" message="Cảm ơn bạn đã đăng ký!" />,
);

// Sử dụng emailHtml để gửi email
```

### Ví dụ với RSS Feed

```javascript
import { renderToStaticMarkup } from "react-dom/server";

function RSSFeed({ items }) {
  return (
    <rss version="2.0">
      <channel>
        <title>My Blog</title>
        <link>https://example.com</link>
        {items.map((item) => (
          <item key={item.id}>
            <title>{item.title}</title>
            <link>{item.url}</link>
            <description>{item.description}</description>
            <pubDate>{item.date}</pubDate>
          </item>
        ))}
      </channel>
    </rss>
  );
}

const rssXml = renderToStaticMarkup(
  <RSSFeed
    items={[
      {
        id: 1,
        title: "Post 1",
        url: "/post-1",
        description: "...",
        date: "2024-01-01",
      },
      {
        id: 2,
        title: "Post 2",
        url: "/post-2",
        description: "...",
        date: "2024-01-02",
      },
    ]}
  />,
);
```

### Ví dụ với Static Site Generation

```javascript
import { renderToStaticMarkup } from "react-dom/server";
import fs from "fs";
import path from "path";
import Post from "./Post";

function generateStaticPages(posts) {
  posts.forEach((post) => {
    const html = renderToStaticMarkup(
      <html>
        <head>
          <title>{post.title}</title>
          <meta name="description" content={post.excerpt} />
        </head>
        <body>
          <Post content={post.content} />
        </body>
      </html>,
    );

    const filePath = path.join("dist", `${post.slug}.html`);
    fs.writeFileSync(filePath, `<!DOCTYPE html>${html}`);
  });
}

generateStaticPages([
  { slug: "hello-world", title: "Hello World", excerpt: "...", content: "..." },
  {
    slug: "my-second-post",
    title: "My Second Post",
    excerpt: "...",
    content: "...",
  },
]);
```

### Ví dụ với Static Component

```javascript
import { renderToStaticMarkup } from "react-dom/server";

function Footer() {
  return (
    <footer>
      <p>&copy; 2024 My Company. All rights reserved.</p>
      <nav>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </nav>
    </footer>
  );
}

const footerHtml = renderToStaticMarkup(<Footer />);

// Sử dụng trong template engine khác (như EJS, Pug)
app.get("/", (req, res) => {
  res.render("index", { footer: footerHtml });
});
```

## Khi nào nên dùng / When to Use

- Khi tạo static HTML không cần client-side hydration
- Khi tạo email templates
- Khi tạo RSS feeds hoặc XML
- Khi tạo static pages cho Static Site Generation (SSG)
- Khi muốn giảm kích thước HTML output
- Khi sử dụng React chỉ để render HTML, không cần interactivity
- Khi tích hợp React với các template engine khác

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi cần client-side hydration (sử dụng `renderToString` thay thế)
- Khi cần Suspense support
- Khi cần streaming
- Khi cần Progressive Hydration
- Khi cần React 18+ Concurrent Features

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

- Không thể tạo static HTML sạch mà không có React attributes
- Phải sử dụng `renderToString` và xóa thủ công các React attributes
- Kích thước HTML lớn hơn do các React attributes không cần thiết
- Không phù hợp cho các use case cần static HTML thuần túy

## Vấn đề được giải quyết / Problems Solved

- **Static HTML**: Giải quyết vấn đề tạo static HTML không cần hydration
- **Clean Output**: Loại bỏ các React attributes không cần thiết
- **Smaller Size**: Giảm kích thước HTML output
- **Non-Interactive Use Cases**: Hỗ trợ các use case không cần client-side interactivity
- **Template Integration**: Dễ dàng tích hợp với các template engine khác

## Ưu điểm / Advantages

- HTML output sạch, không có React attributes
- Kích thước HTML nhỏ hơn
- Phù hợp cho static content
- Hỗ trợ email templates, RSS feeds, XML
- Dễ tích hợp với các template engine khác
- Tốt cho Static Site Generation

## Nhược điểm / Disadvantages

- Không hỗ trợ client-side hydration
- Không hỗ trợ Suspense
- Không hỗ trợ streaming
- Không hỗ trợ React 18+ Concurrent Features
- Không thể có interactivity sau khi render

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm          | renderToStaticMarkup | renderToString | renderToPipeableStream |
| ----------------- | -------------------- | -------------- | ---------------------- |
| Hydration Support | Không                | Có             | Có                     |
| React Attributes  | Không                | Có             | Có                     |
| Streaming         | Không                | Không          | Có                     |
| Suspense Support  | Không                | Không          | Có                     |
| Use Case          | Static HTML          | SSR            | Streaming SSR          |

## Best Practices / Các thực hành tốt

- Sử dụng cho static content không cần interactivity
- Kết hợp với `<!DOCTYPE html>` khi tạo full HTML page
- Sử dụng cho email templates để đảm bảo tương thích với email clients
- Sử dụng cho RSS feeds và XML generation
- Tận dụng React components để tạo reusable templates

## Common Pitfalls / Các lỗi thường gặp

- Sử dụng cho pages cần client-side interactivity
- Quên thêm `<!DOCTYPE html>` khi tạo full HTML page
- Sử dụng với components cần hydration (như hooks, event handlers)
- Không hiểu rằng output không thể hydrate sau này

## Performance Considerations / Yếu tố hiệu suất

- Kích thước HTML nhỏ hơn do không có React attributes
- Tốt cho static content vì không cần hydration overhead
- Có thể cache kết quả cho static content
- Không có overhead của client-side hydration

## Browser Support / Hỗ trợ trình duyệt

- Client-side: Không áp dụng (server-side only)
- Output HTML tương thích với tất cả trình duyệt

## Tài liệu tham khảo / References

- [React DOM Server: renderToStaticMarkup - react.dev](https://react.dev/reference/react-dom/server/renderToStaticMarkup)
- [React 18: New Suspense SSR Architecture - react.dev](https://react.dev/blog/2022/03/29/react-v18#new-suspense-ssr-architecture)
- [Streaming SSR with React - react.dev](https://react.dev/docs/react-dom-server)

## Câu hỏi phỏng vấn / Interview Questions

1. `renderToStaticMarkup` là gì và khi nào nên sử dụng?
2. Sự khác biệt giữa `renderToStaticMarkup` và `renderToString`?
3. Tại sao `renderToStaticMarkup` không tạo ra React attributes?
4. Khi nào nên sử dụng `renderToStaticMarkup` thay vì `renderToString`?
5. `renderToStaticMarkup` có hỗ trợ hydration không?
6. Use cases phù hợp cho `renderToStaticMarkup` là gì?
7. Làm thế nào để tạo email templates với React?
8. `renderToStaticMarkup` có hỗ trợ Suspense không?
9. Tại sao kích thước HTML output của `renderToStaticMarkup` nhỏ hơn?
10. Làm thế nào để tích hợp `renderToStaticMarkup` với các template engine khác?
