# preinit / preinit

## Định nghĩa / Definition

[`preinit`](https://react.dev/reference/react-dom/preinit) là một API trong React-DOM cho phép bạn **preinit resources** như CSS, JavaScript modules, hoặc stylesheets để cải thiện performance bằng cách fetch và parse resources sớm.

## Cú pháp / Syntax

```jsx
<link rel="preinit" href={url} as={type} />
```

## Tham số / Parameters

| Tham số | Kiểu     | Mô tả                                             |
| ------- | -------- | ------------------------------------------------- |
| `href`  | `string` | URL của resource muốn preinit.                    |
| `as`    | `string` | (Optional) Type của resource ("style", "script"). |

## Giá trị trả về / Return Value

Không có giá trị trả về (void).

## Cách hoạt động / How it Works

### Preiniting Mechanism

`preinit` fetch và parse resources sớm:

```
HTML Parse → Detect <link rel="preinit"> → Fetch Resource → Parse & Cache → Ready for Use
```

### Resource Types

Các loại resources có thể preinit:

| Type         | Mô tả            |
| ------------ | ---------------- | ------------- |
| `style`      | CSS files        | `.css`        |
| `script`     | JavaScript files | `.js`, `.mjs` |
| `stylesheet` | Stylesheets      | `.css`        |

### Browser Behavior

Browser xử lý `preinit` như sau:

- Parse HTML và detect `preinit` links
- Fetch resources sớm
- Parse và cache resources
- Khi resource được request, dùng cached version

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
function App() {
  return (
    <html>
      <head>
        <link rel="preinit" href="/styles.css" as="style" />
        <link rel="preinit" href="/app.js" as="script" />
      </head>
      <body>
        <AppContent />
      </body>
    </html>
  );
}
```

### Ví dụ với CSS Preiniting

```jsx
function App() {
  return (
    <html>
      <head>
        <link rel="preinit" href="/main.css" as="style" />
        <link rel="preinit" href="/theme.css" as="style" />
        <link rel="preinit" href="/responsive.css" as="style" />
      </head>
      <body>
        <AppContent />
      </body>
    </html>
  );
}
```

### Ví dụ với JavaScript Modules

```jsx
function App() {
  return (
    <html>
      <head>
        <link rel="preinit" href="/app.js" as="script" />
        <link rel="preinit" href="/vendor.js" as="script" />
      </head>
      <body>
        <AppContent />
      </body>
    </html>
  );
}
```

### Ví dụ với Dynamic Preiniting

```jsx
function App({ resources }) {
  return (
    <html>
      <head>
        {resources.map((resource) => (
          <link
            key={resource.url}
            rel="preinit"
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

### Ví dụ với Conditional Preiniting

```jsx
function App({ enablePreinit }) {
  return (
    <html>
      <head>
        {enablePreinit && <link rel="preinit" href="/app.js" as="script" />}
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
function ResourcePreiniter({ resources }) {
  return (
    <>
      {resources.map((resource) => (
        <link
          key={resource.url}
          rel="preinit"
          href={resource.url}
          as={resource.type}
        />
      ))}
    </>
  );
}

function App() {
  const resources = [
    { url: "/app.js", type: "script" },
    { url: "/styles.css", type: "style" },
  ];

  return (
    <html>
      <head>
        <ResourcePreiniter resources={resources} />
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
  type: "style" | "script";
}

function ResourcePreiniter({ resources }: { resources: Resource[] }) {
  return (
    <>
      {resources.map((resource) => (
        <link
          key={resource.url}
          rel="preinit"
          href={resource.url}
          as={resource.type}
        />
      ))}
    </>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi có CSS cần load sớm
- Khi có JavaScript modules cần preinit
- Khi có stylesheets cần preinit
- Khi muốn giảm initial load time
- Khi có resources cần parse sớm

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi resources load nhanh
- Khi không cần preinit
- Khi preinit quá nhiều resources (overhead)
- Khi resource không được sử dụng

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `preinit`:

1. **Slower initial load**: Resources load chậm hơn.

2. **Parsing delay**: Resource parsing delay khi load.

3. **Worse UX**: Initial load time chậm hơn.

4. **No caching**: Resources không được cached.

## Vấn đề được giải quyết / Problems Solved

### 1. Early Resource Loading

Tải và parse resources sớm để giảm load time.

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

1. **Overhead**: Có thể có overhead nếu quá nhiều preinits.

2. **Browser support**: Không phải tất cả trình duyệt hỗ trợ.

3. **Limited control**: Không có control nhiều khi nào preinit hoàn tất.

4. **Cache invalidation**: Preinit có thể được cached quá lâu.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm        | preinit | preload | inline | lazy loading |
| --------------- | ------- | ------- | ------ | ------------ |
| Early load      | Có      | Có      | Không  | Không        |
| Parse & cache   | Có      | Không   | Không  | Không        |
| Simple API      | Có      | Có      | Không  | Không        |
| No JS needed    | Có      | Có      | Không  |
| Browser support | Tốt     | Tốt     | Tốt    | Tốt          |

## Best Practices / Các thực hành tốt

1. **Preinit critical resources**:

   ```jsx
   <link rel="preinit" href="/app.js" as="script" />
   <link rel="preinit" href="/main.css" as="style" />
   ```

2. **Dùng đúng resource type**:

   ```jsx
   <link rel="preinit" href="/app.js" as="script" />
   <link rel="preinit" href="/styles.css" as="style" />
   ```

3. **Dynamic preiniting**:
   ```jsx
   {
     resources.map((resource) => (
       <link
         key={resource.url}
         rel="preinit"
         href={resource.url}
         as={resource.type}
       />
     ));
   }
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Preiniting Too Many Resources

```jsx
// ❌ Quá nhiều preinits
<link rel="preinit" href="/resource1.js" as="script" />
<link rel="preinit" href="/resource2.js" as="script" />
<link rel="preinit" href="/resource3.js" as="script" />
<link rel="preinit" href="/resource4.js" as="script" />

// ✅ Chỉ preinit quan trọng
<link rel="preinit" href="/app.js" as="script" />
<link rel="preinit" href="/main.css" as="style" />
```

### 2. Preiniting Unnecessary Resources

```jsx
// ❌ Không cần preinit
<link rel="preinit" href="/unused.js" as="script" />
<link rel="preinit" href="/rarely-used.js" as="script" />

// ✅ Chỉ preinit khi cần
<link rel="preinit" href="/app.js" as="script" />
```

### 3. Using in Wrong Context

```jsx
// ❌ Sai - preinit trong component
function Component() {
  return (
    <div>
      <link rel="preinit" href="/app.js" as="script" />
    </div>
  );
}

// ✅ Đúng - preinit trong head
<html>
  <head>
    <link rel="preinit" href="/app.js" as="script" />
  </head>
</html>;
```

## Performance Considerations / Yếu tố hiệu suất

1. **Early loading**: Giảm resource load time.

2. **Resource caching**: Giảm duplicate requests.

3. **Minimal overhead**: Overhead nhỏ nếu dùng đúng.

4. **Network optimization**: Tối ưu network performance.

## Browser Support / Hỗ trợ trình duyệt

`preinit` hoạt động trên các trình duyệt hỗ trợ resource hints.

## Câu hỏi phỏng vấn / Interview Questions

1. `preinit` là gì? Khi nào nên dùng?

2. `preinit` hoạt động như thế nào?

3. Sự khác biệt giữa `preinit` và `preload`?

4. `preinit` giúp cải thiện performance như thế nào?

5. Làm thế nào `preinit` hoạt động với resource types?

6. `preinit` có hoạt động với SSR không?

7. Làm thế nào để preinit multiple resources?

8. `preinit` có hoạt động với TypeScript không?

9. Khi nào không nên dùng `preinit`?

10. `preinit` khác gì với `preloadModule`?

11. Làm thế nào `preinit` giúp với initial load time?

12. Có thể quá nhiều resource preinits không?

13. `preinit` có hoạt động với HTTP/2 không?

## Tài liệu tham khảo / References

- [preinit - React Official Docs](https://react.dev/reference/react-dom/preinit)
- [Resource Hints - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preinit)
- [Performance - MDN](https://developer.mozilla.org/en-US/docs/Web/Performance)

---

_Last updated: 2026-01-31_
