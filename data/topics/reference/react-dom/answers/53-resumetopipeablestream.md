# resumeToPipeableStream / Resume To Pipeable Stream

## Định nghĩa / Definition

`resumeToPipeableStream` là một API của React-DOM Server được sử dụng để resume rendering của một React component tree đã được render trước đó và trả về một Node.js Readable stream. API này được sử dụng trong React 19+ để hỗ trợ Incremental Static Regeneration (ISR) với streaming.

`resumeToPipeableStream` is a React-DOM Server API used to resume rendering of a React component tree that was previously rendered and returns a Node.js Readable stream. This API is used in React 19+ to support Incremental Static Regeneration (ISR) with streaming.

## Cú pháp / Syntax

```javascript
import { resumeToPipeableStream } from 'react-dom/server';

resumeToPipeableStream(reactNode, options?)
```

## Tham số / Parameters

| Tham số     | Kiểu              | Mô tả                           |
| ----------- | ----------------- | ------------------------------- |
| `reactNode` | ReactNode         | React node để resume rendering  |
| `options`   | Object (optional) | Tùy chọn cấu hình cho rendering |

**Options Object:**

| Thuộc tính                | Kiểu     | Mô tả                           |
| ------------------------- | -------- | ------------------------------- |
| `bootstrapModules`        | string[] | Các script modules để bootstrap |
| `clientReferenceManifest` | Object   | Manifest cho client references  |
| `nonce`                   | string   | Nonce cho CSP                   |
| `onError`                 | function | Callback khi có lỗi xảy ra      |

## Giá trị trả về / Return Value

Trả về một object có phương thức `pipe` để pipe stream vào một Node.js writable stream.

Returns an object with a `pipe` method to pipe the stream into a Node.js writable stream.

## Cách hoạt động / How it Works

1. **Resume Rendering**: React tiếp tục rendering từ điểm đã dừng
2. **State Preservation**: Giữ lại state từ render trước đó
3. **Streaming**: HTML được gửi đến client theo từng phần (chunk)
4. **Incremental Update**: Chỉ update các phần cần thiết
5. **Error Handling**: Cung cấp callback `onError` để xử lý lỗi

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```javascript
import { resumeToPipeableStream } from "react-dom/server";
import express from "express";
import App from "./App";

const app = express();

app.get("/", async (req, res) => {
  const { pipe } = await resumeToPipeableStream(<App />, {
    bootstrapModules: ["/src/main.js"],
  });

  res.setHeader("Content-Type", "text/html");
  pipe(res);
});

app.listen(3000);
```

### Ví dụ với ISR (Incremental Static Regeneration)

```javascript
import { resumeToPipeableStream } from "react-dom/server";
import { prerender } from "react-dom/server";
import express from "express";
import App from "./App";

const app = express();

// Cache để lưu prerendered content
const cache = new Map();

// Prerender initial static HTML
app.get("/prerender", async (req, res) => {
  const html = await prerender(<App />);
  cache.set("index", html);
  res.send(html);
});

// Resume rendering với streaming
app.get("/resume", async (req, res) => {
  const { pipe } = await resumeToPipeableStream(<App />, {
    bootstrapModules: ["/src/main.js"],
    onError(error) {
      console.error("Resume error:", error);
    },
  });

  res.setHeader("Content-Type", "text/html");
  pipe(res);
});

app.listen(3000);
```

### Ví dụ với Next.js-style ISR

```javascript
import { resumeToPipeableStream } from "react-dom/server";
import { prerender } from "react-dom/server";
import express from "express";
import App from "./App";

const app = express();
const revalidateCache = new Map();

// Prerender page
app.get("/api/prerender/:id", async (req, res) => {
  const html = await prerender(<App id={req.params.id} />);
  revalidateCache.set(req.params.id, {
    html,
    timestamp: Date.now(),
    revalidateAfter: Date.now() + 60000, // 60 seconds
  });
  res.send(html);
});

// Resume rendering với streaming
app.get("/:id", async (req, res) => {
  const cached = revalidateCache.get(req.params.id);

  if (cached && cached.timestamp < cached.revalidateAfter) {
    // Return cached content
    res.send(cached.html);
  } else {
    // Resume rendering
    const { pipe } = await resumeToPipeableStream(<App id={req.params.id} />, {
      bootstrapModules: ["/src/main.js"],
    });

    res.setHeader("Content-Type", "text/html");
    pipe(res);
  }
});

app.listen(3000);
```

### Ví dụ với Error Handling

```javascript
import { resumeToPipeableStream } from "react-dom/server";
import express from "express";
import App from "./App";

const app = express();

app.get("/", async (req, res) => {
  try {
    const { pipe } = await resumeToPipeableStream(<App />, {
      bootstrapModules: ["/src/main.js"],
      onError(error) {
        console.error("Resume error:", error);
        // Không throw error để stream tiếp tục
      },
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    pipe(res);
  } catch (error) {
    console.error("Fatal error:", error);
    res.statusCode = 500;
    res.send("<!doctype html><p>Something went wrong</p>");
  }
});

app.listen(3000);
```

### Ví dụ với AbortController

```javascript
import { resumeToPipeableStream } from "react-dom/server";
import express from "express";
import App from "./App";

const app = express();

app.get("/", async (req, res) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 5000); // Timeout sau 5 giây

  try {
    const { pipe } = await resumeToPipeableStream(<App />, {
      signal: controller.signal,
      bootstrapModules: ["/src/main.js"],
      onError(error) {
        console.error("Resume error:", error);
      },
    });

    clearTimeout(timeout);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    pipe(res);
  } catch (error) {
    clearTimeout(timeout);
    if (error.name === "AbortError") {
      res.statusCode = 504; // Gateway Timeout
    } else {
      res.statusCode = 500;
    }
    res.send("<!doctype html><p>Timeout or error</p>");
  }
});

app.listen(3000);
```

## Khi nào nên dùng / When to Use

- Khi cần Incremental Static Regeneration (ISR) với streaming
- Khi cần Resume rendering pattern với Node.js
- Khi muốn update static content mà không cần full re-render
- Khi sử dụng React 19+ với Server Components
- Khi cần hybrid rendering (static + dynamic) với streaming
- Khi muốn streaming HTML với resume capability

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi không sử dụng Node.js (sử dụng `resume` hoặc `resumeAndPrerenderToNodeStream` cho Web Streams)
- Khi cần full SSR (sử dụng `renderToPipeableStream`)
- Khi không có previous render để resume
- Khi sử dụng React phiên bản cũ hơn 19

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

- Không thể implement Incremental Static Regeneration (ISR) với streaming
- Không thể resume rendering từ previous state với streaming
- Phải re-render toàn bộ page khi có update
- Không thể hybrid rendering (static + dynamic) với streaming

## Vấn đề được giải quyết / Problems Solved

- **ISR with Streaming**: Giải quyết vấn đề ISR với streaming HTML
- **Resume Pattern**: Hỗ trợ resume rendering từ previous state
- **Incremental Update**: Chỉ update các phần cần thiết thay vì full re-render
- **Hybrid Rendering**: Hỗ trợ kết hợp static và dynamic content với streaming
- **Performance**: Cải thiện hiệu suất với incremental updates và streaming

## Ưu điểm / Advantages

- Hỗ trợ Incremental Static Regeneration (ISR) với streaming
- Resume rendering từ previous state
- Streaming HTML giúp giảm TTFB
- Chỉ update các phần cần thiết
- Hybrid rendering support
- Tốt cho React 19+ Server Components
- Cải thiện hiệu suất với incremental updates

## Nhược điểm / Disadvantages

- Chỉ hoạt động với React 19+
- Chỉ hoạt động với Node.js (không hỗ trợ Web Streams)
- Phức tạp hơn so với các SSR methods khác
- Yêu cầu quản lý state từ previous render
- Không phù hợp cho use cases cần full SSR

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm             | resumeToPipeableStream | resume | renderToPipeableStream |
| -------------------- | ---------------------- | ------ | ---------------------- |
| React Version        | 19+                    | 19+    | 18+                    |
| Platform             | Node.js                | Any    | Node.js                |
| Streaming            | Có                     | Tùy    | Có                     |
| ISR Support          | Có                     | Có     | Không                  |
| Resume from Previous | Có                     | Có     | Không                  |
| Incremental Update   | Có                     | Có     | Không                  |

## Best Practices / Các thực hành tốt

- Sử dụng cho ISR patterns với streaming
- Kết hợp với `prerender` cho static content
- Sử dụng với React 19+ Server Components
- Cache previous render state
- Handle error cases với `onError`
- Sử dụng `AbortController` cho timeout handling

## Common Pitfalls / Các lỗi thường gặp

- Sử dụng với React phiên bản cũ hơn 19
- Quên cache previous render state
- Không handle error cases
- Không hiểu rằng resume cần previous render
- Sử dụng cho use cases cần full SSR
- Quên set `Content-Type: text/html` header

## Performance Considerations / Yếu tố hiệu suất

- Cải thiện hiệu suất với incremental updates
- Streaming giúp giảm TTFB
- Giảm server load bằng cách chỉ update các phần cần thiết
- Tốt cho ISR với revalidate intervals
- Cần quản lý memory cho cached state

## Browser Support / Hỗ trợ trình duyệt

- Client-side: Tất cả trình duyệt hiện đại
- Server-side: Node.js 12.0.0+ với React 19+

## Tài liệu tham khảo / References

- [React DOM Server: resumeToPipeableStream - react.dev](https://react.dev/reference/react-dom/server/resumeToPipeableStream)
- [React 19 Documentation - react.dev](https://react.dev/blog/2024/12/05/react-19)
- [Incremental Static Regeneration - Next.js](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)

## Câu hỏi phỏng vấn / Interview Questions

1. `resumeToPipeableStream` là gì và khi nào nên sử dụng?
2. Sự khác biệt giữa `resumeToPipeableStream` và `resume`?
3. Sự khác biệt giữa `resumeToPipeableStream` và `renderToPipeableStream`?
4. Incremental Static Regeneration (ISR) là gì?
5. `resumeToPipeableStream` hoạt động như thế nào với React 19+?
6. Resume rendering pattern là gì?
7. Làm thế nào để implement ISR với `resumeToPipeableStream`?
8. Tại sao `resumeToPipeableStream` chỉ hoạt động với Node.js?
9. Làm thế nào để handle errors khi sử dụng `resumeToPipeableStream`?
10. Hybrid rendering là gì và `resumeToPipeableStream` hỗ trợ nó như thế nào?
