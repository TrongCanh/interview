# preload / preload

## Định nghĩa / Definition

[`preload`](https://react.dev/reference/react-dom/preload) là một API trong React-DOM cho phép bạn **preload resources** để cải thiện performance bằng cách tải resources sớm.

## Cú pháp / Syntax

```jsx
<link rel="preload" href={url} as={type} />
```

## Tham số / Parameters

| Tham số | Kiểu     | Mô tả                                                              |
| ------- | -------- | ------------------------------------------------------------------ |
| `href`  | `string` | URL của resource muốn preload.                                     |
| `as`    | `string` | (Optional) Type của resource ("style", "script", "font", "image"). |

## Giá trị trả về / Return Value

Không có giá trị trả về (void).

## Cách hoạt động / How it Works

### Preloading Mechanism

`preload` tải resources sớm:

```
HTML Parse → Detect <link rel="preload"> → Fetch Resource → Cache Result → Ready for Use
```

### Resource Types

Các loại resources có thể preload:

| Type     | Mô tả            | Ví dụ        |
| -------- | ---------------- | ------------ |
| `style`  | CSS files        | `style.css`  |
| `script` | JavaScript files | `app.js`     |
| `font`   | Font files       | `font.woff2` |
| `image`  | Image files      | `image.png`  |

### Browser Behavior

Browser xử lý `preload` như sau:

- Parse HTML và detect `preload` links
- Fetch resources sớm
- Cache resources
- Khi resource được request, sử dụng cached version

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
function App() {
  return (
    <html>
      <head>
        <link rel="preload" href="/styles.css" as="style" />
        <link rel="preload" href="/app.js" as="script" />
      </head>
      <body>
        <AppContent />
      </body>
    </html>
  );
}
```

### Ví dụ với Image Preloading

```jsx
function App() {
  return (
    <html>
      <head>
        <link rel="preload" href="/hero-image.jpg" as="image" />
        <link rel="preload" href="/thumbnail.jpg" as="image" />
      </head>
      <body>
        <AppContent />
      </body>
    </html>
  );
}
```

### Ví dụ với Font Preloading

```jsx
function App() {
  return (
    <html>
      <head>
        <link
          rel="preload"
          href="/fonts/regular.woff2"
          as="font"
          type="font/woff2"
          crossorigin
        />
        <link
          rel="preload"
          href="/fonts/bold.woff2"
          as="font"
          type="font/woff2"
          crossorigin
        />
      </head>
      <body>
        <AppContent />
      </body>
    </html>
  );
}
```

### Ví dụ với Script Preloading

```jsx
function App() {
  return (
    <html>
      <head>
        <link rel="preload" href="/main.js" as="script" />
        <link rel="preload" href="/vendor.js" as="script" />
      </head>
      <body>
        <AppContent />
      </body>
    </html>
  );
}
```

### Ví dụ với Dynamic Preloading

```jsx
function App({ resources }) {
  return (
    <html>
      <head>
        {resources.map((resource) => (
          <link
            key={resource.url}
            rel="preload"
            href={resource.url}
            as={resource.type}
          />
        ))}
      </head>
      <body>
        <AppContent />
      </body>
    </html>
  );
}
```

### Ví dụ với Conditional Preloading

```jsx
function App({ enablePreload }) {
  return (
    <html>
      <head>
        {enablePreload && <link rel="preload" href="/app.js" as="script" />}
      </head>
      <body>
        <AppContent />
      </body>
    </html>
  );
}
```

### Ví dụ với Crossorigin

```jsx
function App() {
  return (
    <html>
      <head>
        <link
          rel="preload"
          href="/app.js"
          as="script"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <AppContent />
      </body>
    </html>
  );
}
```

### Ví dụ với TypeScript

```tsx
interface Resource {
  url: string;
  type: "style" | "script" | "font" | "image";
}

function PreloadLinks({ resources }: { resources: Resource[] }) {
  return (
    <>
      {resources.map((resource) => (
        <link
          key={resource.url}
          rel="preload"
          href={resource.url}
          as={resource.type}
        />
      ))}
    </>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi có critical resources cần load sớm
- Khi có fonts cần preload
- Khi có images cần hiển thị ngay lập tức
- Khi có JavaScript files cần load sớm
- Khi muốn giảm initial load time

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi resources load nhanh
- Khi không cần preload
- Khi preload quá nhiều resources (overhead)
- Khi resource không được sử dụng

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `preload`:

1. **Slower initial load**: Resources load chậm hơn.

2. **FOUC (Flash of Unstyled Content)**: Content có thể flash trước khi styles load.

3. **Delayed rendering**: Rendering bị delay chờ resources load.

4. **Worse UX**: Initial load time chậm hơn.

## Vấn đề được giải quyết / Problems Solved

### 1. Early Resource Loading

Tải resources sớm để giảm load time.

### 2. Resource Caching

Cache resources để tránh duplicate requests.

### 3. Better UX

Cải thiện initial load time và UX.

## Ưu điểm / Advantages

1. **Faster load**: Resources load nhanh hơn.

2. **Simple API**: Dễ sử dụng.

3. **Browser optimization**: Browser tự động optimize.

4. **No JavaScript**: Không cần JavaScript code.

5. **TypeScript support**: Tốt với TypeScript.

## Nhược điểm / Disadvantages

1. **Overhead**: Có thể có overhead nếu quá nhiều preloads.

2. **Browser support**: Không phải tất cả trình duyệt hỗ trợ.

3. **Limited control**: Không có control nhiều khi nào preload hoàn tất.

4. **Cache invalidation**: Preload có thể được cached quá lâu.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm        | preload | prefetch | lazy loading | Service Worker |
| --------------- | ------- | -------- | ------------ | -------------- |
| Early load      | Có      | Có       | Có           | Không          |
| Resource types  | Có      | Không    | Có           | Không          |
| Simple API      | Có      | Có       | Không        | Không          |
| No JS needed    | Có      | Không    | Không        |
| Browser support | Tốt     | Tốt      | Tốt          | Tốt            |

## Best Practices / Các thực hành tốt

1. **Preload critical resources**:

   ```jsx
   <link rel="preload" href="/app.js" as="script" />
   <link rel="preload" href="/main.css" as="style" />
   ```

2. **Dùng đúng resource type**:

   ```jsx
   <link rel="preload" href="/font.woff2" as="font" type="font/woff2" />
   ```

3. **Dynamic preloading**:
   ```jsx
   {
     resources.map((resource) => (
       <link
         key={resource.url}
         rel="preload"
         href={resource.url}
         as={resource.type}
       />
     ));
   }
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Preloading Too Many Resources

```jsx
// ❌ Quá nhiều preloads
<link rel="preload" href="/resource1.js" />
<link rel="preload" href="/resource2.js" />
<link rel="preload" href="/resource3.js" />
<link rel="preload" href="/resource4.js" />
<link rel="preload" href="/resource5.js" />

// ✅ Chỉ preload quan trọng
<link rel="preload" href="/app.js" as="script" />
<link rel="preload" href="/main.css" as="style" />
```

### 2. Preloading Unnecessary Resources

```jsx
// ❌ Không cần preload
<link rel="preload" href="/unused.js" />
<link rel="preload" href="/rarely-used.js" />

// ✅ Chỉ preload khi cần
<link rel="preload" href="/app.js" as="script" />
```

### 3. Wrong Resource Type

```jsx
// ❌ Sai - sai resource type
<link rel="preload" href="/app.js" as="image" />

// ✅ Đúng - đúng resource type
<link rel="preload" href="/app.js" as="script" />
```

### 4. Using in Wrong Context

```jsx
// ❌ Sai - preload trong component
function Component() {
  return (
    <div>
      <link rel="preload" href="/app.js" as="script" />
    </div>
  );
}

// ✅ Đúng - preload trong head
<html>
  <head>
    <link rel="preload" href="/app.js" as="script" />
  </head>
</html>;
```

## Performance Considerations / Yếu tố hiệu suất

1. **Early loading**: Giảm initial load time.

2. **Resource caching**: Giảm duplicate requests.

3. **Minimal overhead**: Overhead nhỏ nếu dùng đúng.

4. **Network optimization**: Tối ưu network performance.

## Browser Support / Hỗ trợ trình duyệt

`preload` hoạt động trên tất cả trình duyệt hiện đại.

## Câu hỏi phỏng vấn / Interview Questions

1. `preload` là gì? Khi nào nên dùng?

2. `preload` hoạt động như thế nào?

3. Sự khác biệt giữa `preload` và `prefetch`?

4. `preload` khác gì với `lazy loading`?

5. `preload` giúp cải thiện performance như thế nào?

6. Làm thế nào `preload` hoạt động với resource types?

7. `preload` có hoạt động với HTTPS không?

8. Làm thế nào để preload multiple resources?

9. `preload` có hoạt động với SSR không?

10. `preload` có hoạt động với TypeScript không?

11. Khi nào không nên dùng `preload`?

12. `preload` khác gì với Service Worker?

13. Làm thế nào `preload` giúp với initial load time?

14. Có thể quá nhiều preloads không?

15. `preload` có hoạt động với HTTP/2 không?

## Tài liệu tham khảo / References

- [preload - React Official Docs](https://react.dev/reference/react-dom/preload)
- [Resource Hints - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload)
- [Performance - MDN](https://developer.mozilla.org/en-US/docs/Web/Performance)

---

_Last updated: 2026-01-31_
