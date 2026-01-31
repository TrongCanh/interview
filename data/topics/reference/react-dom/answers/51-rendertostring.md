# renderToString / Render To String

## Định nghĩa / Definition

`renderToString` là một API của React-DOM Server được sử dụng để render một React tree thành một chuỗi HTML. API này là phương thức truyền thống cho Server-Side Rendering (SSR) và tạo ra HTML có các thuộc tính React nội bộ để hỗ trợ client-side hydration.

`renderToString` is a React-DOM Server API used to render a React tree into an HTML string. This API is the traditional method for Server-Side Rendering (SSR) and generates HTML with React internal attributes to support client-side hydration.

## Cú pháp / Syntax

```javascript
import { renderToString } from "react-dom/server";

renderToString(reactNode);
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
2. **React Attributes**: Tạo các thuộc tính React nội bộ (`data-reactroot`, `data-reactid`) để tracking
3. **Hydration Data**: Chuẩn bị data để client-side hydration
4. **Complete Output**: Trả về toàn bộ HTML string khi render hoàn tất

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```javascript
import { renderToString } from "react-dom/server";
import App from "./App";

const html = renderToString(<App />);

console.log(html);
// Output: <div data-reactroot=""><h1>Hello World</h1></div>
```

### Ví dụ với Express Server

```javascript
import express from "express";
import { renderToString } from "react-dom/server";
import App from "./App";

const app = express();

app.get("/", (req, res) => {
  const appHtml = renderToString(<App />);

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR</title>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/client.js"></script>
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(3000);
```

### Ví dụ với Client-Side Hydration

```javascript
// server.js
import express from "express";
import { renderToString } from "react-dom/server";
import App from "./App";

const app = express();

app.get("/", (req, res) => {
  const appHtml = renderToString(<App />);

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR with Hydration</title>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/client.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000);

// client.js
import { hydrateRoot } from "react-dom/client";
import App from "./App";

hydrateRoot(document.getElementById("root"), <App />);
```

### Ví dụ với Data Passing

```javascript
import express from "express";
import { renderToString } from "react-dom/server";
import App from "./App";

const app = express();

app.get("/user/:id", async (req, res) => {
  // Fetch data từ database
  const userData = await fetchUserData(req.params.id);

  const appHtml = renderToString(<App user={userData} />);

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>User Profile</title>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script>
          window.__INITIAL_DATA__ = ${JSON.stringify(userData)};
        </script>
        <script src="/client.js"></script>
      </body>
    </html>
  `);
});

// client.js
import { hydrateRoot } from "react-dom/client";
import App from "./App";

const initialData = window.__INITIAL_DATA__;
hydrateRoot(document.getElementById("root"), <App user={initialData} />);
```

### Ví dụ với Error Handling

```javascript
import express from "express";
import { renderToString } from "react-dom/server";
import App from "./App";

const app = express();

app.get("/", (req, res) => {
  try {
    const appHtml = renderToString(<App />);

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>React SSR</title>
        </head>
        <body>
          <div id="root">${appHtml}</div>
          <script src="/client.js"></script>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("SSR Error:", error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
        </head>
        <body>
          <h1>Something went wrong</h1>
          <script src="/client.js"></script>
        </body>
      </html>
    `);
  }
});

app.listen(3000);
```

## Khi nào nên dùng / When to Use

- Khi cần Server-Side Rendering (SSR) cơ bản
- Khi muốn SEO tốt hơn với HTML được render trên server
- Khi muốn cải thiện Time to First Byte (TTFB) so với CSR
- Khi cần client-side hydration
- Khi không cần streaming hoặc Suspense support
- Khi muốn một giải pháp SSR đơn giản và dễ hiểu

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi cần streaming (sử dụng `renderToPipeableStream` hoặc `renderToReadableStream`)
- Khi cần Suspense support
- Khi cần Progressive Hydration
- Khi muốn static HTML không cần hydration (sử dụng `renderToStaticMarkup`)
- Khi sử dụng Edge Runtime (sử dụng `renderToReadableStream`)

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

- Không thể SSR cơ bản với React
- Phải sử dụng Client-Side Rendering (CSR) dẫn đến SEO kém hơn
- TTFB cao hơn do client phải download và execute JS trước khi render
- Không thể hydrate server-rendered HTML

## Vấn đề được giải quyết / Problems Solved

- **Basic SSR**: Giải quyết vấn đề SSR cơ bản với React
- **SEO**: Cải thiện SEO với HTML được render trên server
- **TTFB**: Cải thiện Time to First Byte so với CSR
- **Hydration**: Hỗ trợ client-side hydration để thêm interactivity
- **Simple Solution**: Cung cấp giải pháp SSR đơn giản và dễ hiểu

## Ưu điểm / Advantages

- Đơn giản và dễ hiểu
- Hỗ trợ client-side hydration
- Cải thiện SEO so với CSR
- Tốt hơn TTFB so với CSR
- Tương thích với nhiều framework SSR

## Nhược điểm / Disadvantages

- Không hỗ trợ streaming
- Không hỗ trợ Suspense
- Không hỗ trợ Progressive Hydration
- Không hỗ trợ React 18+ Concurrent Features
- TTFB cao hơn so với streaming SSR
- Server phải đợi toàn bộ HTML được render trước khi gửi

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm              | renderToString | renderToStaticMarkup | renderToPipeableStream |
| --------------------- | -------------- | -------------------- | ---------------------- |
| Hydration Support     | Có             | Không                | Có                     |
| Streaming             | Không          | Không                | Có                     |
| Suspense Support      | Không          | Không                | Có                     |
| Progressive Hydration | Không          | Không                | Có                     |
| React Attributes      | Có             | Không                | Có                     |
| TTFB                  | Trung bình     | Trung bình           | Thấp                   |
| Use Case              | Basic SSR      | Static HTML          | Streaming SSR          |

## Best Practices / Các thực hành tốt

- Sử dụng cho các use case SSR cơ bản
- Kết hợp với `hydrateRoot` để hydrate trên client
- Pass initial data qua `window.__INITIAL_DATA__` hoặc inline script
- Handle error cases với try-catch
- Cân nhắc upgrade sang streaming SSR (`renderToPipeableStream`) cho React 18+

## Common Pitfalls / Các lỗi thường gặp

- Quên hydrate trên client dẫn đến duplicate rendering
- Không handle error cases
- Pass data không đúng cách giữa server và client
- Sử dụng khi cần streaming hoặc Suspense
- Không hiểu rằng `renderToString` không hỗ trợ Suspense

## Performance Considerations / Yếu tố hiệu suất

- TTFB tốt hơn CSR nhưng kém hơn streaming SSR
- Server phải đợi toàn bộ HTML render xong trước khi gửi
- Client-side hydration có thể gây layout shift nếu không đúng
- Memory usage có thể cao cho large component trees
- Cần cân nhắc caching cho static content

## Browser Support / Hỗ trợ trình duyệt

- Client-side: Tất cả trình duyệt hiện đại
- Server-side: Node.js 12.0.0+

## Tài liệu tham khảo / References

- [React DOM Server: renderToString - react.dev](https://react.dev/reference/react-dom/server/renderToString)
- [React 18: New Suspense SSR Architecture - react.dev](https://react.dev/blog/2022/03/29/react-v18#new-suspense-ssr-architecture)
- [Streaming SSR with React - react.dev](https://react.dev/docs/react-dom-server)

## Câu hỏi phỏng vấn / Interview Questions

1. `renderToString` là gì và khi nào nên sử dụng?
2. Sự khác biệt giữa `renderToString` và `renderToStaticMarkup`?
3. Sự khác biệt giữa `renderToString` và `renderToPipeableStream`?
4. `renderToString` có hỗ trợ hydration không?
5. Tại sao `renderToString` không hỗ trợ Suspense?
6. Làm thế nào để hydrate server-rendered HTML?
7. Làm thế nào để pass data từ server sang client trong SSR?
8. Tại sao `renderToString` có TTFB cao hơn streaming SSR?
9. Làm thế nào để handle errors khi sử dụng `renderToString`?
10. Khi nào nên upgrade từ `renderToString` sang `renderToPipeableStream`?
