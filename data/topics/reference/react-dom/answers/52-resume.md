# resume / Resume

## Định nghĩa / Definition

`resume` là một API của React-DOM Server được sử dụng để resume rendering của một React component tree đã được render trước đó. API này được sử dụng trong React 19+ để hỗ trợ Incremental Static Regeneration (ISR) và Resume rendering pattern.

`resume` is a React-DOM Server API used to resume rendering of a React component tree that was previously rendered. This API is used in React 19+ to support Incremental Static Regeneration (ISR) and Resume rendering pattern.

## Cú pháp / Syntax

```javascript
import { resume } from 'react-dom/server';

resume(reactNode, options?)
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

## Giá trị trả về / Return Value

Trả về một Promise resolves thành một stream hoặc HTML string tùy theo use case.

Returns a Promise that resolves to a stream or HTML string depending on the use case.

## Cách hoạt động / How it Works

1. **Resume Rendering**: React tiếp tục rendering từ điểm đã dừng
2. **State Preservation**: Giữ lại state từ render trước đó
3. **Incremental Update**: Chỉ update các phần cần thiết
4. **Streaming Support**: Có thể streaming HTML incremental

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```javascript
import { resume } from "react-dom/server";
import App from "./App";

// Resume rendering của App
const stream = await resume(<App />);
```

### Ví dụ với ISR (Incremental Static Regeneration)

```javascript
import { resume } from "react-dom/server";
import { prerender } from "react-dom/server";
import App from "./App";

// Prerender initial static HTML
const staticHtml = await prerender(<App />);

// Save static HTML to file system
fs.writeFileSync("dist/index.html", staticHtml);

// Sau đó, resume rendering để update dynamic content
const dynamicStream = await resume(<App />);
```

### Ví dụ với Resume Pattern

```javascript
import { resume } from "react-dom/server";
import { Suspense } from "react";
import App from "./App";
import DynamicContent from "./DynamicContent";

function ResumeApp() {
  return (
    <html>
      <head>
        <title>Resume Rendering</title>
      </head>
      <body>
        <div id="root">
          <App />
          <Suspense fallback={<div>Loading dynamic content...</div>}>
            <DynamicContent />
          </Suspense>
        </div>
      </body>
    </html>
  );
}

// Resume rendering
const stream = await resume(<ResumeApp />);
```

### Ví dụ với Next.js-style ISR

```javascript
import { resume } from "react-dom/server";
import App from "./App";

export async function getStaticProps() {
  // Fetch data
  const data = await fetchData();

  return {
    props: { data },
    revalidate: 60, // Revalidate every 60 seconds
  };
}

export default function Page({ data }) {
  return <App data={data} />;
}

// Resume rendering cho revalidation
export async function revalidatePage() {
  const stream = await resume(<Page data={await fetchData()} />);
  return stream;
}
```

### Ví dụ với Streaming Resume

```javascript
import { resume } from "react-dom/server";
import express from "express";
import App from "./App";

const app = express();

app.get("/", async (req, res) => {
  const stream = await resume(<App />, {
    bootstrapModules: ["/src/main.js"],
  });

  res.setHeader("Content-Type", "text/html");
  stream.pipe(res);
});

app.listen(3000);
```

## Khi nào nên dùng / When to Use

- Khi cần Incremental Static Regeneration (ISR)
- Khi cần Resume rendering pattern
- Khi muốn update static content mà không cần full re-render
- Khi sử dụng React 19+ với Server Components
- Khi cần hybrid rendering (static + dynamic)

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi cần full SSR (sử dụng `renderToPipeableStream` hoặc `renderToReadableStream`)
- Khi không có previous render để resume
- Khi sử dụng React phiên bản cũ hơn 19
- Khi cần static HTML hoàn toàn (sử dụng `prerender`)

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

- Không thể implement Incremental Static Regeneration (ISR)
- Không thể resume rendering từ previous state
- Phải re-render toàn bộ page khi có update
- Không thể hybrid rendering (static + dynamic)

## Vấn đề được giải quyết / Problems Solved

- **ISR**: Giải quyết vấn đề Incremental Static Regeneration
- **Resume Pattern**: Hỗ trợ resume rendering từ previous state
- **Incremental Update**: Chỉ update các phần cần thiết thay vì full re-render
- **Hybrid Rendering**: Hỗ trợ kết hợp static và dynamic content
- **Performance**: Cải thiện hiệu suất với incremental updates

## Ưu điểm / Advantages

- Hỗ trợ Incremental Static Regeneration (ISR)
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

| Đặc điểm             | resume      | prerender   | renderToPipeableStream |
| -------------------- | ----------- | ----------- | ---------------------- |
| React Version        | 19+         | 19+         | 18+                    |
| ISR Support          | Có          | Không       | Không                  |
| Resume from Previous | Có          | Không       | Không                  |
| Incremental Update   | Có          | Không       | Không                  |
| Use Case             | ISR, Resume | Static HTML | Full SSR               |

## Best Practices / Các thực hành tốt

- Sử dụng cho ISR patterns
- Kết hợp với `prerender` cho static content
- Sử dụng với React 19+ Server Components
- Cache previous render state
- Handle error cases khi resume fails

## Common Pitfalls / Các lỗi thường gặp

- Sử dụng với React phiên bản cũ hơn 19
- Quên cache previous render state
- Không handle error cases
- Không hiểu rằng resume cần previous render
- Sử dụng cho use cases cần full SSR

## Performance Considerations / Yếu tố hiệu suất

- Cải thiện hiệu suất với incremental updates
- Giảm server load bằng cách chỉ update các phần cần thiết
- Tốt cho ISR với revalidate intervals
- Cần quản lý memory cho cached state

## Browser Support / Hỗ trợ trình duyệt

- Client-side: Tất cả trình duyệt hiện đại
- Server-side: React 19+

## Tài liệu tham khảo / References

- [React DOM Server: resume - react.dev](https://react.dev/reference/react-dom/server/resume)
- [React 19 Documentation - react.dev](https://react.dev/blog/2024/12/05/react-19)
- [Incremental Static Regeneration - Next.js](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)

## Câu hỏi phỏng vấn / Interview Questions

1. `resume` là gì và khi nào nên sử dụng?
2. Sự khác biệt giữa `resume` và `prerender`?
3. Incremental Static Regeneration (ISR) là gì?
4. `resume` hoạt động như thế nào với React 19+?
5. Resume rendering pattern là gì?
6. Làm thế nào để implement ISR với `resume`?
7. `resume` có hỗ trợ streaming không?
8. Tại sao `resume` chỉ hoạt động với React 19+?
9. Làm thế nào để cache previous render state?
10. Hybrid rendering là gì và `resume` hỗ trợ nó như thế nào?
