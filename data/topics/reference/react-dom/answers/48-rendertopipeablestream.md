# renderToPipeableStream / Render To Pipeable Stream

## Định nghĩa / Definition

`renderToPipeableStream` là một API của React-DOM Server được sử dụng để render một React tree thành một Node.js Readable stream. API này được thiết kế cho Server-Side Rendering (SSR) với React 18+ và hỗ trợ Suspense, Progressive Hydration, và Streaming HTML.

`renderToPipeableStream` is a React-DOM Server API used to render a React tree into a Node.js Readable stream. This API is designed for Server-Side Rendering (SSR) with React 18+ and supports Suspense, Progressive Hydration, and Streaming HTML.

## Cú pháp / Syntax

```javascript
import { renderToPipeableStream } from 'react-dom/server';

renderToPipeableStream(reactNode, options?)
```

## Tham số / Parameters

| Tham số     | Kiểu              | Mô tả                                      |
| ----------- | ----------------- | ------------------------------------------ |
| `reactNode` | ReactNode         | React node để render (thường là `<App />`) |
| `options`   | Object (optional) | Tùy chọn cấu hình cho rendering            |

**Options Object:**

| Thuộc tính               | Kiểu     | Mô tả                                           |
| ------------------------ | -------- | ----------------------------------------------- |
| `bootstrapModules`       | string[] | Các script modules để bootstrap (cho React 18+) |
| `bootstrapScriptContent` | string   | Nội dung script inline để bootstrap             |
| `identifierPrefix`       | string   | Prefix cho các ID được tạo bởi React            |
| `namespaceURI`           | string   | Namespace URI cho SVG/MathML                    |
| `onAllReady`             | function | Callback khi tất cả HTML đã được render         |
| `onShellReady`           | function | Callback khi shell HTML ban đầu đã sẵn sàng     |
| `onError`                | function | Callback khi có lỗi xảy ra                      |

## Giá trị trả về / Return Value

Trả về một object có phương thức `pipe` để pipe stream vào một Node.js writable stream.

Returns an object with a `pipe` method to pipe the stream into a Node.js writable stream.

## Cách hoạt động / How it Works

1. **Initial Render**: React bắt đầu render component tree
2. **Streaming**: HTML được gửi đến client theo từng phần (chunk)
3. **Suspense Handling**: Khi gặp Suspense boundary, React gửi fallback HTML và tiếp tục render nội dung chờ
4. **Progressive Hydration**: Client có thể bắt đầu hydrate từng phần khi nhận được
5. **Shell Ready**: Callback `onShellReady` được gọi khi HTML shell ban đầu (bên ngoài Suspense) đã sẵn sàng
6. **All Ready**: Callback `onAllReady` được gọi khi tất cả HTML (bao gồm nội dung trong Suspense) đã được render

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```javascript
import { renderToPipeableStream } from "react-dom/server";
import express from "express";
import App from "./App";

const app = express();

app.get("/", (req, res) => {
  const { pipe } = renderToPipeableStream(<App />, {
    bootstrapModules: ["/src/main.js"],
    onShellReady() {
      // Shell HTML đã sẵn sàng, bắt đầu streaming
      res.statusCode = 200;
      res.setHeader("Content-type", "text/html");
      pipe(res);
    },
    onShellError(error) {
      // Lỗi khi render shell
      res.statusCode = 500;
      res.send("<!doctype html><p>Loading error...</p>");
    },
  });
});

app.listen(3000);
```

### Ví dụ nâng cao / Advanced Example

```javascript
import { renderToPipeableStream } from "react-dom/server";
import express from "express";
import { Suspense } from "react";
import App from "./App";
import DataComponent from "./DataComponent";

const app = express();

app.get("/", (req, res) => {
  let didError = false;
  const { pipe } = renderToPipeableStream(
    <html>
      <head>
        <title>React SSR with Streaming</title>
      </head>
      <body>
        <div id="root">
          <App />
          <Suspense fallback={<div>Loading data...</div>}>
            <DataComponent id={req.query.id} />
          </Suspense>
        </div>
      </body>
    </html>,
    {
      bootstrapModules: ["/src/main.js"],
      identifierPrefix: "react-",
      onShellReady() {
        if (!didError) {
          res.statusCode = 200;
          res.setHeader("Content-type", "text/html");
          pipe(res);
        }
      },
      onShellError(error) {
        res.statusCode = 500;
        res.send("<!doctype html><p>Something went wrong</p>");
      },
      onError(error) {
        didError = true;
        console.error(error);
      },
    },
  );
});

app.listen(3000);
```

### Ví dụ với AbortController

```javascript
import { renderToPipeableStream } from "react-dom/server";
import express from "express";
import App from "./App";

const app = express();

app.get("/", (req, res) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 5000); // Timeout sau 5 giây

  const { pipe } = renderToPipeableStream(<App />, {
    signal: controller.signal,
    onShellReady() {
      clearTimeout(timeout);
      res.statusCode = 200;
      res.setHeader("Content-type", "text/html");
      pipe(res);
    },
    onShellError(error) {
      clearTimeout(timeout);
      if (error.name === "AbortError") {
        res.statusCode = 504; // Gateway Timeout
      } else {
        res.statusCode = 500;
      }
      res.send("<!doctype html><p>Timeout or error</p>");
    },
  });
});
```

## Khi nào nên dùng / When to Use

- Khi cần Server-Side Rendering (SSR) với Node.js
- Khi muốn streaming HTML để cải thiện Time to First Byte (TTFB)
- Khi sử dụng Suspense boundary trong ứng dụng
- Khi muốn progressive hydration cho trải nghiệm người dùng tốt hơn
- Khi cần hỗ trợ React 18+ với Concurrent Features

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi không sử dụng Node.js (sử dụng `renderToString` hoặc `renderToReadableStream` cho Web Streams)
- Khi cần render static HTML hoàn toàn (sử dụng `renderToStaticMarkup`)
- Khi không cần streaming (sử dụng `renderToString`)
- Khi dùng với các framework SSR khác đã có sẵn streaming

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

- Không thể streaming HTML, client phải đợi toàn bộ HTML được render
- TTFB (Time to First Byte) cao hơn, trải nghiệm người dùng kém hơn
- Không hỗ trợ Suspense boundary trong SSR
- Không thể progressive hydration, phải đợi toàn bộ HTML load xong
- Không tận dụng được Concurrent Features của React 18+

## Vấn đề được giải quyết / Problems Solved

- **Streaming HTML**: Giải quyết vấn đề TTFB cao bằng cách gửi HTML theo từng phần
- **Suspense Support**: Hỗ trợ Suspense boundary trong SSR
- **Progressive Hydration**: Cho phép hydrate từng phần của trang
- **Better UX**: Cải thiện trải nghiệm người dùng với loading nhanh hơn
- **Error Handling**: Cung cấp cơ chế xử lý lỗi tốt hơn với `onShellError` và `onError`

## Ưu điểm / Advantages

- Streaming HTML giúp giảm TTFB
- Hỗ trợ Suspense boundary
- Progressive hydration
- Cải thiện SEO với HTML được gửi nhanh hơn
- Hỗ trợ React 18+ Concurrent Features
- Cung cấp callback để xử lý các trạng thái khác nhau
- Tương thích với Node.js streams

## Nhược điểm / Disadvantages

- Chỉ hoạt động với Node.js (không hỗ trợ Web Streams trực tiếp)
- Phức tạp hơn so với `renderToString`
- Cần cấu hình đúng để tránh memory leaks
- Yêu cầu server hỗ trợ streaming
- Không phù hợp cho static site generation

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm              | renderToPipeableStream | renderToString | renderToReadableStream  |
| --------------------- | ---------------------- | -------------- | ----------------------- |
| Platform              | Node.js                | Node.js        | Web Streams (Edge)      |
| Streaming             | Có                     | Không          | Có                      |
| Suspense Support      | Có                     | Không          | Có                      |
| Progressive Hydration | Có                     | Không          | Có                      |
| TTFB                  | Thấp                   | Cao            | Thấp                    |
| Use Case              | Node.js SSR            | Legacy SSR     | Edge/Cloudflare Workers |

## Best Practices / Các thực hành tốt

- Luôn sử dụng `onShellReady` để bắt đầu streaming
- Xử lý lỗi với `onShellError` và `onError`
- Sử dụng `AbortController` để timeout request
- Cung cấp `bootstrapModules` để client biết script cần hydrate
- Sử dụng Suspense boundary để chia nội dung thành các phần có thể stream
- Set `identifierPrefix` nếu có nhiều React app trên cùng trang
- Đảm bảo server hỗ trợ HTTP streaming

## Common Pitfalls / Các lỗi thường gặp

- Quên xử lý `onShellError` dẫn đến lỗi không được trả về client
- Không set `Content-type: text/html` header
- Sử dụng `renderToPipeableStream` trong môi trường không phải Node.js
- Quên cung cấp `bootstrapModules` dẫn đến hydrate không hoạt động
- Không handle `onError` dẫn đến silent errors
- Timeout không được xử lý đúng cách

## Performance Considerations / Yếu tố hiệu suất

- Streaming giúp giảm TTFB và First Contentful Paint (FCP)
- Progressive hydration giúp cải thiện Time to Interactive (TTI)
- Cần cân nhắc giữa streaming và caching cho static content
- Memory usage có thể cao hơn nếu không quản lý stream đúng cách
- Compression (gzip/brotli) có thể áp dụng cho stream

## Browser Support / Hỗ trợ trình duyệt

- Client-side: Tất cả trình duyệt hiện đại
- Server-side: Node.js 12.0.0+
- Streaming HTML được hỗ trợ bởi HTTP/1.1 chunked transfer encoding

## Tài liệu tham khảo / References

- [React DOM Server: renderToPipeableStream - react.dev](https://react.dev/reference/react-dom/server/renderToPipeableStream)
- [React 18: New Suspense SSR Architecture - react.dev](https://react.dev/blog/2022/03/29/react-v18#new-suspense-ssr-architecture)
- [Streaming SSR with React - react.dev](https://react.dev/docs/react-dom-server)

## Câu hỏi phỏng vấn / Interview Questions

1. `renderToPipeableStream` là gì và khi nào nên sử dụng?
2. Sự khác biệt giữa `renderToPipeableStream` và `renderToString`?
3. `onShellReady` và `onAllReady` khác nhau như thế nào?
4. Làm thế nào để xử lý timeout với `renderToPipeableStream`?
5. Suspense boundary hoạt động như thế nào với `renderToPipeableStream`?
6. Progressive hydration là gì và tại sao nó quan trọng?
7. Tại sao `renderToPipeableStream` chỉ hoạt động với Node.js?
8. Làm thế nào để debug lỗi khi sử dụng `renderToPipeableStream`?
9. `bootstrapModules` có tác dụng gì trong `renderToPipeableStream`?
10. Streaming HTML cải thiện hiệu suất như thế nào?
