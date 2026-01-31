# preconnect / preconnect

## Định nghĩa / Definition

[`preconnect`](https://react.dev/reference/react-dom/preconnect) là một API trong React-DOM cho phép bạn **preconnect đến một origin** để cải thiện performance bằng cách thiết lập kết nối sớm.

## Cú pháp / Syntax

```jsx
<link rel="preconnect" href={url} />
```

## Tham số / Parameters

| Tham số       | Kiểu     | Mô tả                                   |
| ------------- | -------- | --------------------------------------- |
| `href`        | `string` | URL của origin muốn preconnect.         |
| `crossorigin` | `string` | (Optional) CORS setting cho preconnect. |

## Giá trị trả về / Return Value

Không có giá trị trả về (void).

## Cách hoạt động / How it Works

### Preconnection Mechanism

`preconnect` thiết lập kết nối sớm với origin:

```
HTML Parse → Detect <link rel="preconnect"> → Early TCP Connection → Faster Resource Load
```

### Browser Behavior

Browser xử lý `preconnect` như sau:

- Parse HTML và detect `preconnect` links
- Bắt đầu TCP connections sớm
- Cache DNS lookups
- Kết nối đến origin trước khi resource được request

### Multiple Origins

Có thể preconnect đến multiple origins:

```jsx
<>
  <link rel="preconnect" href="https://api.example.com" />
  <link rel="preconnect" href="https://cdn.example.com" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
</>
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
function App() {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://api.example.com" />
        <link rel="preconnect" href="https://cdn.example.com" />
      </head>
      <body>
        <AppContent />
      </body>
    </html>
  );
}
```

### Ví dụ với Dynamic Preconnect

```jsx
function App({ apiUrls }) {
  return (
    <html>
      <head>
        {apiUrls.map((url) => (
          <link key={url} rel="preconnect" href={url} />
        ))}
      </head>
      <body>
        <AppContent />
      </body>
    </html>
  );
}
```

### Ví dụ với CDN

```jsx
function App() {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <AppContent />
      </body>
    </html>
  );
}
```

### Ví dụ với CORS

```jsx
function App() {
  return (
    <html>
      <head>
        <link
          rel="preconnect"
          href="https://api.example.com"
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

### Ví dụ với React Component

```jsx
function PreconnectLinks({ urls }) {
  return (
    <>
      {urls.map((url) => (
        <link key={url} rel="preconnect" href={url} />
      ))}
    </>
  );
}

function App() {
  const apiUrls = ["https://api.example.com", "https://cdn.example.com"];

  return (
    <html>
      <head>
        <PreconnectLinks urls={apiUrls} />
      </head>
      <body>
        <AppContent />
      </body>
    </html>
  );
}
```

### Ví dụ với Conditional Preconnect

```jsx
function App({ enablePreconnect }) {
  return (
    <html>
      <head>
        {enablePreconnect && (
          <link rel="preconnect" href="https://api.example.com" />
        )}
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
interface PreconnectProps {
  urls: string[];
}

function PreconnectLinks({ urls }: PreconnectProps) {
  return (
    <>
      {urls.map((url) => (
        <link key={url} rel="preconnect" href={url} />
      ))}
    </>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi có API requests cần thiết lập kết nối sớm
- Khi có CDN resources
- Khi có external fonts
- Khi muốn giảm initial load time
- Khi có multiple origins cần preconnect

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi resources load nhanh
- Khi không có network latency
- Khi preconnect quá nhiều origins (overhead)
- Khi origin không cần thiết lập kết nối

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `preconnect`:

1. **Slower initial load**: Resources load chậm hơn.

2. **DNS lookup delay**: DNS lookup delay khi load resources.

3. **TCP connection delay**: TCP connection delay khi load resources.

4. **Worse UX**: Initial load time chậm hơn.

## Vấn đề được giải quyết / Problems Solved

### 1. Early Connection

Thiết lập kết nối sớm để giảm load time.

### 2. DNS Caching

Cache DNS lookups để giảm DNS resolution time.

### 3. TCP Connection

Bắt đầu TCP connections sớm.

### 4. Better UX

Cải thiện initial load time và UX.

## Ưu điểm / Advantages

1. **Faster load**: Resources load nhanh hơn.

2. **Simple API**: Dễ sử dụng.

3. **Browser optimization**: Browser tự động optimize.

4. **No JavaScript**: Không cần JavaScript code.

5. **TypeScript support**: Tốt với TypeScript.

## Nhược điểm / Disadvantages

1. **Overhead**: Có thể có overhead nếu quá nhiều preconnects.

2. **Browser support**: Không phải tất cả trình duyệt hỗ trợ.

3. **Limited control**: Không có control nhiều khi nào preconnect hoàn tất.

4. **Cache invalidation**: Preconnect có thể được cached quá lâu.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm         | preconnect | prefetchDNS | Service Worker |
| ---------------- | ---------- | ----------- | -------------- |
| Early connection | Có         | Có          | Có             |
| DNS caching      | Có         | Có          | Không          |
| Simple API       | Có         | Có          | Không          |
| No JS needed     | Có         | Có          | Không          |
| Browser support  | Tốt        | Tốt         | Tốt            |

## Best Practices / Các thực hành tốt

1. **Preconnect critical origins**:

   ```jsx
   <link rel="preconnect" href="https://api.example.com" />
   <link rel="preconnect" href="https://cdn.example.com" />
   ```

2. **Không preconnect quá nhiều**:

   ```jsx
   // Chỉ preconnect origins quan trọng
   <link rel="preconnect" href="https://api.example.com" />
   ```

3. **Dùng với crossorigin**:

   ```jsx
   <link
     rel="preconnect"
     href="https://api.example.com"
     crossOrigin="anonymous"
   />
   ```

4. **Dynamic preconnect**:
   ```jsx
   {
     urls.map((url) => <link key={url} rel="preconnect" href={url} />);
   }
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Preconnecting Too Many Origins

```jsx
// ❌ Quá nhiều preconnects
<link rel="preconnect" href="https://api1.com" />
<link rel="preconnect" href="https://api2.com" />
<link rel="preconnect" href="https://api3.com" />
<link rel="preconnect" href="https://api4.com" />
<link rel="preconnect" href="https://api5.com" />

// ✅ Chỉ preconnect quan trọng
<link rel="preconnect" href="https://api.example.com" />
<link rel="preconnect" href="https://cdn.example.com" />
```

### 2. Preconnecting Unnecessary Origins

```jsx
// ❌ Không cần preconnect
<link rel="preconnect" href="https://static.example.com" />
<link rel="preconnect" href="https://unused.example.com" />

// ✅ Chỉ preconnect khi cần
<link rel="preconnect" href="https://api.example.com" />
```

### 3. Forgetting crossorigin

```jsx
// ❌ Không có crossorigin khi cần
<link rel="preconnect" href="https://api.example.com" />

// ✅ Có crossorigin khi cần
<link
  rel="preconnect"
  href="https://api.example.com"
  crossOrigin="anonymous"
/>
```

### 4. Using in Wrong Context

```jsx
// ❌ Sai - preconnect trong component
function Component() {
  return (
    <div>
      <link rel="preconnect" href="https://api.example.com" />
    </div>
  );
}

// ✅ Đúng - preconnect trong head
<html>
  <head>
    <link rel="preconnect" href="https://api.example.com" />
  </head>
</html>;
```

## Performance Considerations / Yếu tố hiệu suất

1. **Early connections**: Giảm connection setup time.

2. **DNS caching**: Giảm DNS resolution time.

3. **TCP reuse**: Reuse TCP connections.

4. **Minimal overhead**: Overhead nhỏ nếu dùng đúng.

## Browser Support / Hỗ trợ trình duyệt

`preconnect` hoạt động trên tất cả trình duyệt hiện đại.

## Câu hỏi phỏng vấn / Interview Questions

1. `preconnect` là gì? Khi nào nên dùng?

2. `preconnect` hoạt động như thế nào?

3. Sự khác biệt giữa `preconnect` và `prefetchDNS`?

4. `preconnect` giúp cải thiện performance như thế nào?

5. Làm thế nào `preconnect` hoạt động với DNS?

6. `preconnect` có hoạt động với HTTPS không?

7. Làm thế nào để preconnect multiple origins?

8. `preconnect` có hoạt động với SSR không?

9. `preconnect` có hoạt động với TypeScript không?

10. Làm thế nào để preconnect với CORS?

11. Khi nào không nên dùng `preconnect`?

12. `preconnect` khác gì với Service Worker?

13. Làm thế nào `preconnect` giúp với initial load time?

14. Có thể quá nhiều preconnects không?

15. `preconnect` có hoạt động với HTTP/2 không?

## Tài liệu tham khảo / References

- [preconnect - React Official Docs](https://react.dev/reference/react-dom/preconnect)
- [Resource Hints - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preconnect)
- [Performance - MDN](https://developer.mozilla.org/en-US/docs/Web/Performance/)

---

_Last updated: 2026-01-31_
