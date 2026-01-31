# prefetchDNS / prefetchDNS

## Định nghĩa / Definition

[`prefetchDNS`](https://react.dev/reference/react-dom/prefetchDNS) là một API trong React-DOM cho phép bạn **prefetch DNS lookups** cho các origins để cải thiện performance bằng cách giải quyết DNS sớm.

## Cú pháp / Syntax

```jsx
<link rel="dns-prefetch" href={url} />
```

## Tham số / Parameters

| Tham số | Kiểu     | Mô tả                             |
| ------- | -------- | --------------------------------- |
| `href`  | `string` | URL của origin muốn prefetch DNS. |

## Giá trị trả về / Return Value

Không có giá trị trả về (void).

## Cách hoạt động / How it Works

### DNS Prefetching

`prefetchDNS` prefetch DNS lookups sớm:

```
HTML Parse → Detect <link rel="dns-prefetch"> → DNS Lookup → Cache DNS Result → Faster Resource Load
```

### Browser Behavior

Browser xử lý `prefetchDNS` như sau:

- Parse HTML và detect `dns-prefetch` links
- Bắt đầu DNS lookups sớm
- Cache DNS results
- Khi resource được request, DNS đã được resolved

### Multiple Origins

Có thể prefetch DNS cho multiple origins:

```jsx
<>
  <link rel="dns-prefetch" href="https://api.example.com" />
  <link rel="dns-prefetch" href="https://cdn.example.com" />
  <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
</>
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
function App() {
  return (
    <html>
      <head>
        <link rel="dns-prefetch" href="https://api.example.com" />
        <link rel="dns-prefetch" href="https://cdn.example.com" />
      </head>
      <body>
        <AppContent />
      </body>
    </html>
  );
}
```

### Ví dụ với Dynamic Prefetch

```jsx
function App({ origins }) {
  return (
    <html>
      <head>
        {origins.map((url) => (
          <link key={url} rel="dns-prefetch" href={url} />
        ))}
      </head>
      <body>
        <AppContent />
      </body>
    </html>
  );
}
```

### Ví dụ với API Endpoints

```jsx
function App() {
  const apiEndpoints = [
    "https://api.example.com",
    "https://cdn.example.com",
    "https://analytics.example.com",
  ];

  return (
    <html>
      <head>
        {apiEndpoints.map((url) => (
          <link key={url} rel="dns-prefetch" href={url} />
        ))}
      </head>
      <body>
        <AppContent />
      </body>
    </html>
  );
}
```

### Ví dụ với Fonts

```jsx
function App() {
  return (
    <html>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body>
        <AppContent />
      </body>
    </html>
  );
}
```

### Ví dụ với Conditional Prefetch

```jsx
function App({ enablePrefetch }) {
  return (
    <html>
      <head>
        {enablePrefetch && (
          <link rel="dns-prefetch" href="https://api.example.com" />
        )}
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
function DnsPrefetchLinks({ urls }) {
  return (
    <>
      {urls.map((url) => (
        <link key={url} rel="dns-prefetch" href={url} />
      ))}
    </>
  );
}

function App() {
  const apiUrls = ["https://api.example.com", "https://cdn.example.com"];

  return (
    <html>
      <head>
        <DnsPrefetchLinks urls={apiUrls} />
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
interface DnsPrefetchProps {
  urls: string[];
}

function DnsPrefetchLinks({ urls }: DnsPrefetchProps) {
  return (
    <>
      {urls.map((url) => (
        <link key={url} rel="dns-prefetch" href={url} />
      ))}
    </>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi có API requests cần DNS resolution nhanh
- Khi có CDN resources
- Khi có external fonts
- Khi muốn giảm DNS lookup time
- Khi có multiple origins cần prefetch

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi DNS resolution rất nhanh
- Khi không có network latency
- Khi prefetch quá nhiều origins (overhead)
- Khi origin không cần DNS prefetch

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `prefetchDNS`:

1. **Slower DNS resolution**: DNS lookup chậm hơn.

2. **Delayed resource loading**: Resources load chậm hơn.

3. **Worse UX**: Initial load time chậm hơn.

## Vấn đề được giải quyết / Problems Solved

### 1. Early DNS Resolution

Giải quyết DNS sớm để giảm load time.

### 2. DNS Caching

Cache DNS results để giảm DNS resolution time.

### 3. Better UX

Cải thiện initial load time và UX.

## Ưu điểm / Advantages

1. **Faster DNS**: DNS resolution nhanh hơn.

2. **Simple API**: Dễ sử dụng.

3. **Browser optimization**: Browser tự động optimize.

4. **No JavaScript**: Không cần JavaScript code.

5. **TypeScript support**: Tốt với TypeScript.

## Nhược điểm / Disadvantages

1. **Overhead**: Có thể có overhead nếu quá nhiều prefetches.

2. **Browser support**: Không phải tất cả trình duyệt hỗ trợ.

3. **Limited control**: Không có control nhiều khi nào prefetch hoàn tất.

4. **Cache invalidation**: Prefetched DNS có thể được cached quá lâu.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm         | prefetchDNS | preconnect | Service Worker |
| ---------------- | ----------- | ---------- | -------------- |
| DNS resolution   | Có          | Không      | Không          |
| Connection setup | Không       | Có         | Không          |
| Simple API       | Có          | Có         | Không          |
| No JS needed     | Có          | Có         | Không          |
| Browser support  | Tốt         | Tốt        | Tốt            |

## Best Practices / Các thực hành tốt

1. **Prefetch critical origins**:

   ```jsx
   <link rel="dns-prefetch" href="https://api.example.com" />
   <link rel="dns-prefetch" href="https://cdn.example.com" />
   ```

2. **Không prefetch quá nhiều**:

   ```jsx
   // Chỉ prefetch origins quan trọng
   <link rel="dns-prefetch" href="https://api.example.com" />
   ```

3. **Kết hợp với preconnect**:

   ```jsx
   <link rel="dns-prefetch" href="https://api.example.com" />
   <link rel="preconnect" href="https://api.example.com" />
   ```

4. **Dynamic prefetch**:
   ```jsx
   {
     urls.map((url) => <link key={url} rel="dns-prefetch" href={url} />);
   }
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Prefetching Too Many Origins

```jsx
// ❌ Quá nhiều prefetches
<link rel="dns-prefetch" href="https://api1.com" />
<link rel="dns-prefetch" href="https://api2.com" />
<link rel="dns-prefetch" href="https://api3.com" />
<link rel="dns-prefetch" href="https://api4.com" />
<link rel="dns-prefetch" href="https://api5.com" />

// ✅ Chỉ prefetch quan trọng
<link rel="dns-prefetch" href="https://api.example.com" />
<link rel="dns-prefetch" href="https://cdn.example.com" />
```

### 2. Prefetching Unnecessary Origins

```jsx
// ❌ Không cần prefetch
<link rel="dns-prefetch" href="https://static.example.com" />
<link rel="dns-prefetch" href="https://unused.example.com" />

// ✅ Chỉ prefetch khi cần
<link rel="dns-prefetch" href="https://api.example.com" />
```

### 3. Using in Wrong Context

```jsx
// ❌ Sai - prefetch trong component
function Component() {
  return (
    <div>
      <link rel="dns-prefetch" href="https://api.example.com" />
    </div>
  );
}

// ✅ Đúng - prefetch trong head
<html>
  <head>
    <link rel="dns-prefetch" href="https://api.example.com" />
  </head>
</html>;
```

## Performance Considerations / Yếu tố hiệu suất

1. **DNS caching**: Giảm DNS resolution time.

2. **Early resolution**: Giải quyết DNS sớm.

3. **Minimal overhead**: Overhead nhỏ nếu dùng đúng.

4. **Network optimization**: Tối ưu network performance.

## Browser Support / Hỗ trợ trình duyệt

`prefetchDNS` hoạt động trên tất cả trình duyệt hiện đại.

## Câu hỏi phỏng vấn / Interview Questions

1. `prefetchDNS` là gì? Khi nào nên dùng?

2. `prefetchDNS` hoạt động như thế nào?

3. Sự khác biệt giữa `prefetchDNS` và `preconnect`?

4. `prefetchDNS` giúp cải thiện performance như thế nào?

5. Làm thế nào `prefetchDNS` hoạt động với DNS?

6. `prefetchDNS` có hoạt động với HTTPS không?

7. Làm thế nào để prefetch DNS cho multiple origins?

8. `prefetchDNS` có hoạt động với SSR không?

9. `prefetchDNS` có hoạt động với TypeScript không?

10. Làm thế nào `prefetchDNS` khác gì với Service Worker?

11. Khi nào không nên dùng `prefetchDNS`?

12. `prefetchDNS` có hoạt động với HTTP/2 không?

13. Làm thế nào `prefetchDNS` giúp với initial load time?

14. Có thể quá nhiều DNS prefetches không?

15. `prefetchDNS` có hoạt động với IPv6 không?

## Tài liệu tham khảo / References

- [prefetchDNS - React Official Docs](https://react.dev/reference/react-dom/prefetchDNS)
- [Resource Hints - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/dns-prefetch)
- [Performance - MDN](https://developer.mozilla.org/en-US/docs/Web/Performance)

---

_Last updated: 2026-01-31_
