# resumeAndPrerenderToNodeStream / Resume And Prerender To Node Stream

## Định nghĩa / Definition

`resumeAndPrerenderToNodeStream` là một API của React-DOM Server được sử dụng để resume rendering của một React component tree đã được render trước đó và prerender lại thành một Node.js Readable stream. API này được sử dụng trong React 19+ để hỗ trợ Incremental Static Regeneration (ISR) với prerendering và streaming.

`resumeAndPrerenderToNodeStream` is a React-DOM Server API used to resume rendering of a React component tree that was previously rendered and prerender it again into a Node.js Readable stream. This API is used in React 19+ to support Incremental Static Regeneration (ISR) with prerendering and streaming.

## Cú pháp / Syntax

```javascript
import { resumeAndPrerenderToNodeStream } from 'react-dom/server';

await resumeAndPrerenderToNodeStream(reactNode, options?)
```

## Tham số / Parameters

| Tham số     | Kiểu              | Mô tả                             |
| ----------- | ----------------- | --------------------------------- |
| `reactNode` | ReactNode         | React node để resume và prerender |
| `options`   | Object (optional) | Tùy chọn cấu hình cho rendering   |

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

1. **Resume Rendering**: React tiếp tục rendering từ điểm đã dừng
2. **State Preservation**: Giữ lại state từ render trước đó
3. **Prerender**: Prerender lại thành static HTML
4. **Streaming**: HTML được gửi theo từng phần (chunk) qua Node.js stream
5. **Incremental Update**: Chỉ update các phần cần thiết
6. **Error Handling**: Cung cấp callback `onError` để xử lý lỗi

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```javascript
import { resumeAndPrerenderToNodeStream } from "react-dom/server";
import fs from "fs";
import path from "path";
import App from "./App";

// Resume và prerender App với streaming
async function generateStaticSite() {
  const stream = await resumeAndPrerenderToNodeStream(<App />);

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

### Ví dụ với ISR (Incremental Static Regeneration)

```javascript
import { resumeAndPrerenderToNodeStream } from "react-dom/server";
import { prerenderToNodeStream } from "react-dom/server";
import fs from "fs";
import path from "path";
import App from "./App";

// Cache để lưu prerendered content
const cache = new Map();

// Prerender initial static HTML
async function initialPrerender() {
  const stream = await prerenderToNodeStream(<App />);
  const distPath = path.join("dist", "index.html");
  const writeStream = fs.createWriteStream(distPath);

  writeStream.write("<!DOCTYPE html>");
  stream.pipe(writeStream);

  await new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });

  cache.set("index", {
    timestamp: Date.now(),
    revalidateAfter: Date.now() + 60000, // 60 seconds
  });
}

// Resume và prerender cho revalidation với streaming
async function revalidate() {
  const cached = cache.get("index");

  if (cached && cached.timestamp < cached.revalidateAfter) {
    // Skip revalidation if not expired
    return;
  }

  const stream = await resumeAndPrerenderToNodeStream(<App />);
  const distPath = path.join("dist", "index.html");
  const writeStream = fs.createWriteStream(distPath);

  writeStream.write("<!DOCTYPE html>");
  stream.pipe(writeStream);

  await new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });

  cache.set("index", {
    timestamp: Date.now(),
    revalidateAfter: Date.now() + 60000,
  });
}

initialPrerender();
setInterval(revalidate, 60000); // Revalidate mỗi 60 giây
```

### Ví dụ với Next.js-style ISR

```javascript
import { resumeAndPrerenderToNodeStream } from "react-dom/server";
import { prerenderToNodeStream } from "react-dom/server";
import fs from "fs";
import path from "path";

const revalidateCache = new Map();

async function getStaticProps() {
  const data = await fetchData();

  return {
    props: { data },
    revalidate: 60, // Revalidate every 60 seconds
  };
}

async function fetchData() {
  const response = await fetch("https://api.example.com/data");
  return response.json();
}

export default function Page({ data }) {
  return <div>{data.content}</div>;
}

// Prerender page
async function initialPrerender(id) {
  const { props } = await getStaticProps();
  const stream = await prerenderToNodeStream(<Page {...props} />);

  revalidateCache.set(id, {
    timestamp: Date.now(),
    revalidateAfter: Date.now() + 60 * 1000,
  });

  const distPath = path.join("dist", `${id}.html`);
  const writeStream = fs.createWriteStream(distPath);

  writeStream.write("<!DOCTYPE html>");
  stream.pipe(writeStream);

  await new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
}

// Resume và prerender cho revalidation
async function revalidatePage(id) {
  const cached = revalidateCache.get(id);

  if (cached && cached.timestamp < cached.revalidateAfter) {
    return;
  }

  const { props } = await getStaticProps();
  const stream = await resumeAndPrerenderToNodeStream(<Page {...props} />);

  revalidateCache.set(id, {
    timestamp: Date.now(),
    revalidateAfter: Date.now() + 60 * 1000,
  });

  const distPath = path.join("dist", `${id}.html`);
  const writeStream = fs.createWriteStream(distPath);

  writeStream.write("<!DOCTYPE html>");
  stream.pipe(writeStream);

  await new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
}
```

### Ví dụ với Multiple Pages

```javascript
import { resumeAndPrerenderToNodeStream } from "react-dom/server";
import { prerenderToNodeStream } from "react-dom/server";
import fs from "fs";
import path from "path";

const revalidateCache = new Map();

const pages = [
  { id: "home", component: <HomePage /> },
  { id: "about", component: <AboutPage /> },
  { id: "contact", component: <ContactPage /> },
];

// Initial prerender
async function initialPrerender() {
  for (const page of pages) {
    const stream = await prerenderToNodeStream(page.component);
    revalidateCache.set(page.id, {
      timestamp: Date.now(),
      revalidateAfter: Date.now() + 60000,
    });

    const distPath = path.join("dist", `${page.id}.html`);
    const writeStream = fs.createWriteStream(distPath);

    writeStream.write("<!DOCTYPE html>");
    stream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });
  }
}

// Revalidate pages
async function revalidatePages() {
  for (const page of pages) {
    const cached = revalidateCache.get(page.id);

    if (cached && cached.timestamp < cached.revalidateAfter) {
      continue; // Skip if not expired
    }

    const stream = await resumeAndPrerenderToNodeStream(page.component);
    revalidateCache.set(page.id, {
      timestamp: Date.now(),
      revalidateAfter: Date.now() + 60000,
    });

    const distPath = path.join("dist", `${page.id}.html`);
    const writeStream = fs.createWriteStream(distPath);

    writeStream.write("<!DOCTYPE html>");
    stream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });
  }
}

initialPrerender();
setInterval(revalidatePages, 60000);
```

### Ví dụ với Error Handling

```javascript
import { resumeAndPrerenderToNodeStream } from "react-dom/server";
import fs from "fs";
import path from "path";
import App from "./App";

const cache = new Map();

async function revalidate() {
  try {
    const cached = cache.get("index");

    if (cached && cached.timestamp < cached.revalidateAfter) {
      return;
    }

    const stream = await resumeAndPrerenderToNodeStream(<App />, {
      onError(error) {
        console.error("Resume and prerender error:", error);
      },
    });

    cache.set("index", {
      timestamp: Date.now(),
      revalidateAfter: Date.now() + 60000,
    });

    const distPath = path.join("dist", "index.html");
    const writeStream = fs.createWriteStream(distPath);

    writeStream.write("<!DOCTYPE html>");
    stream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    // Keep cached content if revalidation fails
  }
}
```

## Khi nào nên dùng / When to Use

- Khi cần Incremental Static Regeneration (ISR) với prerendering và streaming
- Khi cần Resume rendering pattern với prerendering và streaming
- Khi muốn update static content mà không cần full re-render
- Khi sử dụng React 19+ với Server Components
- Khi cần hybrid rendering (static + dynamic) với streaming
- Khi muốn streaming HTML với resume và prerender capability

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi không sử dụng Node.js (sử dụng `resumeAndPrerender` hoặc `resume` cho Web Streams)
- Khi cần full SSR (sử dụng `renderToPipeableStream`)
- Khi không có previous render để resume
- Khi sử dụng React phiên bản cũ hơn 19

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

- Không thể implement Incremental Static Regeneration (ISR) với prerendering và streaming
- Không thể resume rendering từ previous state với prerendering và streaming
- Phải re-render toàn bộ page khi có update
- Không thể hybrid rendering (static + dynamic) với streaming

## Vấn đề được giải quyết / Problems Solved

- **ISR with Prerender and Streaming**: Giải quyết vấn đề ISR với prerendering và streaming
- **Resume Pattern**: Hỗ trợ resume rendering từ previous state
- **Incremental Update**: Chỉ update các phần cần thiết thay vì full re-render
- **Hybrid Rendering**: Hỗ trợ kết hợp static và dynamic content với streaming
- **Performance**: Cải thiện hiệu suất với incremental updates và streaming

## Ưu điểm / Advantages

- Hỗ trợ Incremental Static Regeneration (ISR) với prerendering và streaming
- Resume rendering từ previous state
- Streaming giúp giảm memory usage
- Chỉ update các phần cần thiết
- Hybrid rendering support
- Tốt cho React 19+ Server Components
- Cải thiện hiệu suất với incremental updates

## Nhược điểm / Disadvantages

- Chỉ hoạt động với React 19+
- Chỉ hoạt động với Node.js
- Phức tạp hơn so với các SSR methods khác
- Yêu cầu quản lý state từ previous render
- Không phù hợp cho use cases cần full SSR

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm             | resumeAndPrerenderToNodeStream | resumeAndPrerender | resumeToPipeableStream |
| -------------------- | ------------------------------ | ------------------ | ---------------------- |
| React Version        | 19+                            | 19+                | 19+                    |
| Platform             | Node.js                        | Any                | Node.js                |
| Streaming            | Có                             | Không              | Có                     |
| ISR Support          | Có                             | Có                 | Có                     |
| Resume from Previous | Có                             | Có                 | Có                     |
| Prerender            | Có                             | Có                 | Không                  |
| Incremental Update   | Có                             | Có                 | Có                     |

## Best Practices / Các thực hành tốt

- Sử dụng cho ISR patterns với prerendering và streaming
- Kết hợp với `prerenderToNodeStream` cho initial static content
- Sử dụng với React 19+ Server Components
- Cache previous render state
- Handle error cases với `onError`
- Set appropriate revalidate intervals

## Common Pitfalls / Các lỗi thường gặp

- Sử dụng với React phiên bản cũ hơn 19
- Quên cache previous render state
- Không handle error cases
- Không hiểu rằng resume cần previous render
- Sử dụng cho use cases cần full SSR
- Quên thêm `<!DOCTYPE html>` khi tạo full HTML page

## Performance Considerations / Yếu tố hiệu suất

- Cải thiện hiệu suất với incremental updates
- Streaming giúp giảm memory usage
- Giảm server load bằng cách chỉ update các phần cần thiết
- Tốt cho ISR với revalidate intervals
- Cần quản lý memory cho cached state

## Browser Support / Hỗ trợ trình duyệt

- Client-side: Tất cả trình duyệt hiện đại
- Server-side: Node.js 12.0.0+ với React 19+

## Tài liệu tham khảo / References

- [React DOM Server: resumeAndPrerenderToNodeStream - react.dev](https://react.dev/reference/react-dom/server/resumeAndPrerenderToNodeStream)
- [React 19 Documentation - react.dev](https://react.dev/blog/2024/12/05/react-19)
- [Incremental Static Regeneration - Next.js](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)

## Câu hỏi phỏng vấn / Interview Questions

1. `resumeAndPrerenderToNodeStream` là gì và khi nào nên sử dụng?
2. Sự khác biệt giữa `resumeAndPrerenderToNodeStream` và `resumeAndPrerender`?
3. Sự khác biệt giữa `resumeAndPrerenderToNodeStream` và `resumeToPipeableStream`?
4. Incremental Static Regeneration (ISR) là gì?
5. `resumeAndPrerenderToNodeStream` hoạt động như thế nào với React 19+?
6. Resume rendering pattern là gì?
7. Làm thế nào để implement ISR với `resumeAndPrerenderToNodeStream`?
8. Tại sao `resumeAndPrerenderToNodeStream` chỉ hoạt động với Node.js?
9. Làm thế nào để handle errors khi sử dụng `resumeAndPrerenderToNodeStream`?
10. Hybrid rendering là gì và `resumeAndPrerenderToNodeStream` hỗ trợ nó như thế nào?
