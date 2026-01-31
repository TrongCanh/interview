# renderToReadableStream / Render To Readable Stream

## Định nghĩa / Definition

`renderToReadableStream` là một API của React-DOM Server được sử dụng để render một React tree thành một Web Readable Stream. API này được thiết kế cho Server-Side Rendering (SSR) trong môi trường Edge Runtime (như Cloudflare Workers, Deno, Vercel Edge) và hỗ trợ Suspense, Progressive Hydration, và Streaming HTML.

`renderToReadableStream` is a React-DOM Server API used to render a React tree into a Web Readable Stream. This API is designed for Server-Side Rendering (SSR) in Edge Runtime environments (like Cloudflare Workers, Deno, Vercel Edge) and supports Suspense, Progressive Hydration, and Streaming HTML.

## Cú pháp / Syntax

```javascript
import { renderToReadableStream } from 'react-dom/server';

await renderToReadableStream(reactNode, options?)
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
| `onError`                | function | Callback khi có lỗi xảy ra                      |

## Giá trị trả về / Return Value

Trả về một Promise resolves thành một Web Readable Stream.

Returns a Promise that resolves to a Web Readable Stream.

## Cách hoạt động / How it Works

1. **Initial Render**: React bắt đầu render component tree
2. **Streaming**: HTML được gửi đến client theo từng phần (chunk) qua Web Stream API
3. **Suspense Handling**: Khi gặp Suspense boundary, React gửi fallback HTML và tiếp tục render nội dung chờ
4. **Progressive Hydration**: Client có thể bắt đầu hydrate từng phần khi nhận được
5. **Edge Runtime**: Tương thích với Edge Runtime (Cloudflare Workers, Deno, Vercel Edge)
6. **Error Handling**: Cung cấp callback `onError` để xử lý lỗi

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```javascript
import { renderToReadableStream } from "react-dom/server";
import App from "./App";

export default {
  async fetch(request) {
    const stream = await renderToReadableStream(<App />, {
      bootstrapModules: ["/src/main.js"],
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
};
```

### Ví dụ với Cloudflare Workers

```javascript
import { renderToReadableStream } from "react-dom/server";
import { Suspense } from "react";
import App from "./App";
import DataComponent from "./DataComponent";

export default {
  async fetch(request) {
    const stream = await renderToReadableStream(
      <html>
        <head>
          <title>React SSR with Edge Streaming</title>
        </head>
        <body>
          <div id="root">
            <App />
            <Suspense fallback={<div>Loading data...</div>}>
              <DataComponent id={new URL(request.url).searchParams.get("id")} />
            </Suspense>
          </div>
        </body>
      </html>,
      {
        bootstrapModules: ["/src/main.js"],
        identifierPrefix: "react-",
        onError(error) {
          console.error("Rendering error:", error);
        },
      },
    );

    return new Response(stream, {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "public, max-age=60, s-maxage=300",
      },
    });
  },
};
```

### Ví dụ với Deno

```javascript
import { renderToReadableStream } from "https://esm.sh/react-dom/server";
import App from "./App.tsx";

Deno.serve(async (req) => {
  const stream = await renderToReadableStream(<App />, {
    bootstrapModules: ["/src/main.js"],
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
});
```

### Ví dụ với Vercel Edge Middleware

```javascript
import { renderToReadableStream } from "react-dom/server";
import App from "./App";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const stream = await renderToReadableStream(<App />, {
    bootstrapModules: ["/src/main.js"],
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
```

### Ví dụ với Error Handling

```javascript
import { renderToReadableStream } from "react-dom/server";
import App from "./App";

export default {
  async fetch(request) {
    try {
      const stream = await renderToReadableStream(<App />, {
        bootstrapModules: ["/src/main.js"],
        onError(error) {
          // Log lỗi nhưng không throw để stream tiếp tục
          console.error("Stream error:", error);
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/html",
        },
      });
    } catch (error) {
      // Fallback nếu có lỗi nghiêm trọng
      return new Response("<!doctype html><p>Something went wrong</p>", {
        status: 500,
        headers: {
          "Content-Type": "text/html",
        },
      });
    }
  },
};
```

## Khi nào nên dùng / When to Use

- Khi cần Server-Side Rendering (SSR) trong Edge Runtime
- Khi sử dụng Cloudflare Workers, Deno, Vercel Edge, hoặc môi trường Edge khác
- Khi muốn streaming HTML để cải thiện Time to First Byte (TTFB)
- Khi sử dụng Suspense boundary trong ứng dụng
- Khi muốn progressive hydration cho trải nghiệm người dùng tốt hơn
- Khi cần hỗ trợ React 18+ với Concurrent Features

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi sử dụng Node.js server (sử dụng `renderToPipeableStream` thay thế)
- Khi cần render static HTML hoàn toàn (sử dụng `renderToStaticMarkup`)
- Khi không cần streaming
- Khi môi trường không hỗ trợ Web Streams API

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

- Không thể SSR trong Edge Runtime với React
- Không thể streaming HTML trong Edge environment
- TTFB (Time to First Byte) cao hơn, trải nghiệm người dùng kém hơn
- Không hỗ trợ Suspense boundary trong SSR trên Edge
- Không thể progressive hydration trong Edge environment
- Không tận dụng được Concurrent Features của React 18+ trên Edge

## Vấn đề được giải quyết / Problems Solved

- **Edge SSR**: Giải quyết vấn đề SSR trong Edge Runtime
- **Streaming HTML**: Giải quyết vấn đề TTFB cao bằng cách gửi HTML theo từng phần
- **Suspense Support**: Hỗ trợ Suspense boundary trong SSR
- **Progressive Hydration**: Cho phép hydrate từng phần của trang
- **Better UX**: Cải thiện trải nghiệm người dùng với loading nhanh hơn
- **Edge Performance**: Tận dụng tính năng low-latency của Edge Runtime

## Ưu điểm / Advantages

- Hỗ trợ Edge Runtime (Cloudflare Workers, Deno, Vercel Edge)
- Streaming HTML giúp giảm TTFB
- Hỗ trợ Suspense boundary
- Progressive hydration
- Cải thiện SEO với HTML được gửi nhanh hơn
- Hỗ trợ React 18+ Concurrent Features
- Tương thích với Web Streams API
- Low latency nhờ Edge deployment

## Nhược điểm / Disadvantages

- Chỉ hoạt động với Web Streams API (không hỗ trợ Node.js streams)
- Phức tạp hơn so với `renderToString`
- Yêu cầu Edge Runtime support
- Một số Edge platform có giới hạn về runtime
- Không phù hợp cho static site generation
- Debugging có thể khó hơn do môi trường Edge

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm              | renderToReadableStream | renderToPipeableStream | renderToString |
| --------------------- | ---------------------- | ---------------------- | -------------- |
| Platform              | Edge Runtime           | Node.js                | Node.js        |
| Streaming             | Có                     | Có                     | Không          |
| Suspense Support      | Có                     | Có                     | Không          |
| Progressive Hydration | Có                     | Có                     | Không          |
| TTFB                  | Thấp                   | Thấp                   | Cao            |
| Use Case              | Edge SSR               | Node.js SSR            | Legacy SSR     |

## Best Practices / Các thực hành tốt

- Luôn set `Content-Type: text/html` header
- Xử lý lỗi với `onError` callback
- Sử dụng `bootstrapModules` để client biết script cần hydrate
- Sử dụng Suspense boundary để chia nội dung thành các phần có thể stream
- Set `identifierPrefix` nếu có nhiều React app trên cùng trang
- Thêm caching headers khi phù hợp
- Handle timeout và error cases

## Common Pitfalls / Các lỗi thường gặp

- Quên set `Content-Type: text/html` header
- Sử dụng `renderToReadableStream` trong môi trường Node.js (dùng `renderToPipeableStream`)
- Không handle error dẫn đến silent failures
- Quên cung cấp `bootstrapModules` dẫn đến hydrate không hoạt động
- Không xử lý timeout trong Edge environment
- Quên rằng stream trả về là Promise

## Performance Considerations / Yếu tố hiệu suất

- Streaming giúp giảm TTFB và First Contentful Paint (FCP)
- Progressive hydration giúp cải thiện Time to Interactive (TTI)
- Edge deployment giúp giảm latency nhờ server gần user hơn
- Cần cân nhắc giữa streaming và caching cho static content
- Memory usage có thể cao hơn nếu không quản lý stream đúng cách

## Browser Support / Hỗ trợ trình duyệt

- Client-side: Tất cả trình duyệt hiện đại hỗ trợ Web Streams API
- Server-side: Edge Runtime (Cloudflare Workers, Deno, Vercel Edge, etc.)
- Streaming HTML được hỗ trợ bởi HTTP/1.1 chunked transfer encoding và HTTP/2

## Tài liệu tham khảo / References

- [React DOM Server: renderToReadableStream - react.dev](https://react.dev/reference/react-dom/server/renderToReadableStream)
- [React 18: New Suspense SSR Architecture - react.dev](https://react.dev/blog/2022/03/29/react-v18#new-suspense-ssr-architecture)
- [Streaming SSR with React - react.dev](https://react.dev/docs/react-dom-server)
- [Web Streams API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)

## Câu hỏi phỏng vấn / Interview Questions

1. `renderToReadableStream` là gì và khi nào nên sử dụng?
2. Sự khác biệt giữa `renderToReadableStream` và `renderToPipeableStream`?
3. Tại sao `renderToReadableStream` được thiết kế cho Edge Runtime?
4. Suspense boundary hoạt động như thế nào với `renderToReadableStream`?
5. Edge Runtime có lợi ích gì so với Node.js cho SSR?
6. Làm thế nào để xử lý lỗi khi sử dụng `renderToReadableStream`?
7. Progressive hydration là gì và tại sao nó quan trọng?
8. `bootstrapModules` có tác dụng gì trong `renderToReadableStream`?
9. Streaming HTML cải thiện hiệu suất như thế nào?
10. Làm thế nào để debug SSR trong Edge Runtime?
