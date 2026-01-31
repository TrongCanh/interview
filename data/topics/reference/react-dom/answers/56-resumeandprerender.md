# resumeAndPrerender / Resume And Prerender

## Định nghĩa / Definition

`resumeAndPrerender` là một API của React-DOM Server được sử dụng để resume rendering của một React component tree đã được render trước đó và prerender lại thành static HTML. API này được sử dụng trong React 19+ để hỗ trợ Incremental Static Regeneration (ISR) với prerendering.

`resumeAndPrerender` is a React-DOM Server API used to resume rendering of a React component tree that was previously rendered and prerender it again into static HTML. This API is used in React 19+ to support Incremental Static Regeneration (ISR) with prerendering.

## Cú pháp / Syntax

```javascript
import { resumeAndPrerender } from 'react-dom/server';

await resumeAndPrerender(reactNode, options?)
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

## Giá trị trả về / Return Value

Trả về một Promise resolves thành một chuỗi HTML string.

Returns a Promise that resolves to an HTML string.

## Cách hoạt động / How it Works

1. **Resume Rendering**: React tiếp tục rendering từ điểm đã dừng
2. **State Preservation**: Giữ lại state từ render trước đó
3. **Prerender**: Prerender lại thành static HTML
4. **Incremental Update**: Chỉ update các phần cần thiết
5. **Complete Output**: Trả về toàn bộ HTML string khi render hoàn tất

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```javascript
import { resumeAndPrerender } from "react-dom/server";
import App from "./App";

// Resume và prerender App
const html = await resumeAndPrerender(<App />);

console.log(html);
// Output: <html>...</html>
```

### Ví dụ với ISR (Incremental Static Regeneration)

```javascript
import { resumeAndPrerender } from "react-dom/server";
import { prerender } from "react-dom/server";
import fs from "fs";
import path from "path";
import App from "./App";

// Cache để lưu prerendered content
const cache = new Map();

// Prerender initial static HTML
async function initialPrerender() {
  const html = await prerender(<App />);
  cache.set("index", {
    html,
    timestamp: Date.now(),
    revalidateAfter: Date.now() + 60000, // 60 seconds
  });

  const distPath = path.join("dist", "index.html");
  fs.writeFileSync(distPath, `<!DOCTYPE html>${html}`);
}

// Resume và prerender cho revalidation
async function revalidate() {
  const cached = cache.get("index");

  if (cached && cached.timestamp < cached.revalidateAfter) {
    // Return cached content
    return cached.html;
  }

  // Resume và prerender
  const html = await resumeAndPrerender(<App />);

  cache.set("index", {
    html,
    timestamp: Date.now(),
    revalidateAfter: Date.now() + 60000,
  });

  const distPath = path.join("dist", "index.html");
  fs.writeFileSync(distPath, `<!DOCTYPE html>${html}`);

  return html;
}

initialPrerender();
setInterval(revalidate, 60000); // Revalidate mỗi 60 giây
```

### Ví dụ với Next.js-style ISR

```javascript
import { resumeAndPrerender } from "react-dom/server";
import { prerender } from "react-dom/server";
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
  const { props, revalidate } = await getStaticProps();
  const html = await prerender(<Page {...props} />);

  revalidateCache.set(id, {
    html,
    timestamp: Date.now(),
    revalidateAfter: Date.now() + revalidate * 1000,
  });

  const distPath = path.join("dist", `${id}.html`);
  fs.writeFileSync(distPath, `<!DOCTYPE html>${html}`);
}

// Resume và prerender cho revalidation
async function revalidatePage(id) {
  const cached = revalidateCache.get(id);

  if (cached && cached.timestamp < cached.revalidateAfter) {
    return cached.html;
  }

  const { props, revalidate } = await getStaticProps();
  const html = await resumeAndPrerender(<Page {...props} />);

  revalidateCache.set(id, {
    html,
    timestamp: Date.now(),
    revalidateAfter: Date.now() + revalidate * 1000,
  });

  const distPath = path.join("dist", `${id}.html`);
  fs.writeFileSync(distPath, `<!DOCTYPE html>${html}`);

  return html;
}
```

### Ví dụ với Multiple Pages

```javascript
import { resumeAndPrerender } from "react-dom/server";
import { prerender } from "react-dom/server";
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
    const html = await prerender(page.component);
    revalidateCache.set(page.id, {
      html,
      timestamp: Date.now(),
      revalidateAfter: Date.now() + 60000,
    });

    const distPath = path.join("dist", `${page.id}.html`);
    fs.writeFileSync(distPath, `<!DOCTYPE html>${html}`);
  }
}

// Revalidate pages
async function revalidatePages() {
  for (const page of pages) {
    const cached = revalidateCache.get(page.id);

    if (cached && cached.timestamp < cached.revalidateAfter) {
      continue; // Skip if not expired
    }

    const html = await resumeAndPrerender(page.component);
    revalidateCache.set(page.id, {
      html,
      timestamp: Date.now(),
      revalidateAfter: Date.now() + 60000,
    });

    const distPath = path.join("dist", `${page.id}.html`);
    fs.writeFileSync(distPath, `<!DOCTYPE html>${html}`);
  }
}

initialPrerender();
setInterval(revalidatePages, 60000);
```

### Ví dụ với Error Handling

```javascript
import { resumeAndPrerender } from "react-dom/server";
import { prerender } from "react-dom/server";
import fs from "fs";
import path from "path";
import App from "./App";

const cache = new Map();

async function revalidate() {
  try {
    const cached = cache.get("index");

    if (cached && cached.timestamp < cached.revalidateAfter) {
      return cached.html;
    }

    const html = await resumeAndPrerender(<App />);

    cache.set("index", {
      html,
      timestamp: Date.now(),
      revalidateAfter: Date.now() + 60000,
    });

    const distPath = path.join("dist", "index.html");
    fs.writeFileSync(distPath, `<!DOCTYPE html>${html}`);

    return html;
  } catch (error) {
    console.error("Revalidation error:", error);
    // Return cached content if available
    const cached = cache.get("index");
    if (cached) {
      return cached.html;
    }
    throw error;
  }
}
```

## Khi nào nên dùng / When to Use

- Khi cần Incremental Static Regeneration (ISR) với prerendering
- Khi cần Resume rendering pattern với prerendering
- Khi muốn update static content mà không cần full re-render
- Khi sử dụng React 19+ với Server Components
- Khi cần hybrid rendering (static + dynamic)

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi cần full SSR (sử dụng `renderToPipeableStream` hoặc `renderToReadableStream`)
- Khi không có previous render để resume
- Khi sử dụng React phiên bản cũ hơn 19
- Khi cần static HTML hoàn toàn (sử dụng `prerender`)

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

- Không thể implement Incremental Static Regeneration (ISR) với prerendering
- Không thể resume rendering từ previous state với prerendering
- Phải re-render toàn bộ page khi có update
- Không thể hybrid rendering (static + dynamic)

## Vấn đề được giải quyết / Problems Solved

- **ISR with Prerender**: Giải quyết vấn đề ISR với prerendering
- **Resume Pattern**: Hỗ trợ resume rendering từ previous state
- **Incremental Update**: Chỉ update các phần cần thiết thay vì full re-render
- **Hybrid Rendering**: Hỗ trợ kết hợp static và dynamic content
- **Performance**: Cải thiện hiệu suất với incremental updates

## Ưu điểm / Advantages

- Hỗ trợ Incremental Static Regeneration (ISR) với prerendering
- Resume rendering từ previous state
- Chỉ update các phần cần thiết
- Hybrid rendering support
- Tốt cho React 19+ Server Components
- Cải thiện hiệu suất với incremental updates

## Nhược điểm / Disadvantages

- Chỉ hoạt động với React 19+
- Phức tạp hơn so với các SSR methods khác
- Yêu cầu quản lý state từ previous render
- Không phù hợp cho use cases cần full SSR

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm             | resumeAndPrerender | resume | prerender |
| -------------------- | ------------------ | ------ | --------- |
| React Version        | 19+                | 19+    | 19+       |
| ISR Support          | Có                 | Có     | Không     |
| Resume from Previous | Có                 | Có     | Không     |
| Prerender            | Có                 | Tùy    | Có        |
| Incremental Update   | Có                 | Có     | Không     |
| Use Case             | ISR + Prerender    | ISR    | SSG       |

## Best Practices / Các thực hành tốt

- Sử dụng cho ISR patterns với prerendering
- Kết hợp với `prerender` cho initial static content
- Sử dụng với React 19+ Server Components
- Cache previous render state
- Handle error cases khi resume fails
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
- Giảm server load bằng cách chỉ update các phần cần thiết
- Tốt cho ISR với revalidate intervals
- Cần quản lý memory cho cached state
- Build time có thể lâu cho large sites

## Browser Support / Hỗ trợ trình duyệt

- Client-side: Tất cả trình duyệt hiện đại
- Server-side: React 19+

## Tài liệu tham khảo / References

- [React DOM Server: resumeAndPrerender - react.dev](https://react.dev/reference/react-dom/server/resumeAndPrerender)
- [React 19 Documentation - react.dev](https://react.dev/blog/2024/12/05/react-19)
- [Incremental Static Regeneration - Next.js](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)

## Câu hỏi phỏng vấn / Interview Questions

1. `resumeAndPrerender` là gì và khi nào nên sử dụng?
2. Sự khác biệt giữa `resumeAndPrerender` và `resume`?
3. Sự khác biệt giữa `resumeAndPrerender` và `prerender`?
4. Incremental Static Regeneration (ISR) là gì?
5. `resumeAndPrerender` hoạt động như thế nào với React 19+?
6. Resume rendering pattern là gì?
7. Làm thế nào để implement ISR với `resumeAndPrerender`?
8. Tại sao `resumeAndPrerender` chỉ hoạt động với React 19+?
9. Làm thế nào để cache previous render state?
10. Hybrid rendering là gì và `resumeAndPrerender` hỗ trợ nó như thế nào?
