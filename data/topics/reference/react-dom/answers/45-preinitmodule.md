# preinitModule / preinitModule

## Định nghĩa / Definition

[`preinitModule`](https://react.dev/reference/react-dom/preinitModule) là một API trong React-DOM cho phép bạn **preinit JavaScript modules** để cải thiện performance bằng cách fetch và parse modules sớm.

## Cú pháp / Syntax

```jsx
<link rel="modulepreload" href={url} />
```

## Tham số / Parameters

| Tham số | Kiểu     | Mô tả                        |
| ------- | -------- | ---------------------------- |
| `href`  | `string` | URL của module muốn preinit. |

## Giá trị trả về / Return Value

Không có giá trị trả về (void).

## Cách hoạt động / How it Works

### Module Preiniting

`preinitModule` fetch và parse modules sớm:

```
HTML Parse → Detect <link rel="modulepreload"> → Fetch Module → Parse & Cache → Ready for Import
```

### Browser Behavior

Browser xử lý `preinitModule` như sau:

- Parse HTML và detect `modulepreload` links
- Fetch modules sớm
- Parse và cache modules
- Khi module được import, dùng cached version

### Module Types

Có thể preinit các loại modules:

- ES modules (.mjs)
- CommonJS modules (.cjs)
- JSON modules (.json)

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
function App() {
  return (
    <html>
      <head>
        <link rel="modulepreload" href="/app.js" />
        <link rel="modulepreload" href="/vendor.js" />
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
function App({ modules }) {
  return (
    <html>
      <head>
        {modules.map((module) => (
          <link key={module.url} rel="modulepreload" href={module.url} />
        ))}
      </head>
      <body>
        <AppContent />
      </body>
    </html>
  );
}
```

### Ví dụ với Multiple Module Types

```jsx
function App() {
  return (
    <html>
      <head>
        <link rel="modulepreload" href="/app.mjs" />
        <link rel="modulepreload" href="/vendor.cjs" />
        <link rel="modulepreload" href="/config.json" />
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
        {enablePreinit && <link rel="modulepreload" href="/app.js" />}
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
function ModulePreiniter({ modules }) {
  return (
    <>
      {modules.map((module) => (
        <link key={module.url} rel="modulepreload" href={module.url} />
      ))}
    </>
  );
}

function App() {
  const modules = [{ url: "/app.js" }, { url: "/vendor.js" }];

  return (
    <html>
      <head>
        <ModulePreiniter modules={modules} />
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
interface Module {
  url: string;
}

function ModulePreiniter({ modules }: { modules: Module[] }) {
  return (
    <>
      {modules.map((module) => (
        <link key={module.url} rel="modulepreload" href={module.url} />
      ))}
    </>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi có JavaScript modules cần preinit
- Khi có vendor libraries
- Khi có large dependencies
- Khi muốn giảm initial load time
- Khi có code splitting

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi modules load nhanh
- Khi không có code splitting
- Khi preinit quá nhiều modules (overhead)
- Khi module không được sử dụng

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `preinitModule`:

1. **Slower initial load**: Modules load chậm hơn.

2. **Module fetch delay**: Module fetch delay khi import.

3. **Worse UX**: Initial load time chậm hơn.

4. **No caching**: Modules không được cached.

## Vấn đề được giải quyết / Problems Solved

### 1. Early Module Loading

Tải và parse modules sớm để giảm load time.

### 2. Module Caching

Cache modules để tránh duplicate requests.

### 3. Better UX

Cải thiện initial load time và UX.

## Ưu điểm / Advantages

1. **Faster load**: Modules load nhanh hơn.

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

| Đặc điểm        | preinitModule | preinit | lazy loading | dynamic import |
| --------------- | ------------- | ------- | ------------ | -------------- |
| Early load      | Có            | Có      | Không        | Không          |
| Parse & cache   | Có            | Không   | Không        | Không          |
| Simple API      | Có            | Có      | Có           | Không          |
| No JS needed    | Có            | Có      | Không        |
| Browser support | Tốt           | Tốt     | Tốt          | Tốt            |

## Best Practices / Các thực hành tốt

1. **Preinit critical modules**:

   ```jsx
   <link rel="modulepreload" href="/app.js" />
   <link rel="modulepreload" href="/vendor.js" />
   ```

2. **Không preinit quá nhiều**:

   ```jsx
   // Chỉ preinit modules quan trọng
   <link rel="modulepreload" href="/app.js" />
   ```

3. **Dùng với dynamic imports**:
   ```jsx
   {
     modules.map((module) => (
       <link key={module.url} rel="modulepreload" href={module.url} />
     ));
   }
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Preiniting Too Many Modules

```jsx
// ❌ Quá nhiều preinits
<link rel="modulepreload" href="/module1.js" />
<link rel="modulepreload" href="/module2.js" />
<link rel="modulepreload" href="/module3.js" />
<link rel="modulepreload" href="/module4.js" />
<link rel="modulepreload" href="/module5.js" />

// ✅ Chỉ preinit quan trọng
<link rel="modulepreload" href="/app.js" />
<link rel="modulepreload" href="/vendor.js" />
```

### 2. Preiniting Unnecessary Modules

```jsx
// ❌ Không cần preinit
<link rel="modulepreload" href="/unused.js" />
<link rel="modulepreload" href="/rarely-used.js" />

// ✅ Chỉ preinit khi cần
<link rel="modulepreload" href="/app.js" />
```

### 3. Using in Wrong Context

```jsx
// ❌ Sai - preinit trong component
function Component() {
  return (
    <div>
      <link rel="modulepreload" href="/app.js" />
    </div>
  );
}

// ✅ Đúng - preinit trong head
<html>
  <head>
    <link rel="modulepreload" href="/app.js" />
  </head>
</html>;
```

## Performance Considerations / Yếu tố hiệu suất

1. **Early loading**: Giảm module fetch time.

2. **Module caching**: Giảm duplicate requests.

3. **Minimal overhead**: Overhead nhỏ nếu dùng đúng.

4. **Network optimization**: Tối ưu network performance.

## Browser Support / Hỗ trợ trình duyệt

`preinitModule` hoạt động trên các trình duyệt hỗ trợ ES modules.

## Câu hỏi phỏng vấn / Interview Questions

1. `preinitModule` là gì? Khi nào nên dùng?

2. `preinitModule` hoạt động như thế nào?

3. Sự khác biệt giữa `preinitModule` và `preinit`?

4. `preinitModule` giúp cải thiện performance như thế nào?

5. Làm thế nào `preinitModule` hoạt động với module cache?

6. `preinitModule` có hoạt động với ES modules không?

7. `preinitModule` có hoạt động với CommonJS modules không?

8. Làm thế nào để preinit multiple modules?

9. `preinitModule` có hoạt động với SSR không?

10. `preinitModule` có hoạt động với TypeScript không?

11. Khi nào không nên dùng `preinitModule`?

12. `preinitModule` khác gì với dynamic import?

13. Làm thế nào `preinitModule` giúp với initial load time?

14. Có thể quá nhiều module preinits không?

15. `preinitModule` có hoạt động với HTTP/2 không?

## Tài liệu tham khảo / References

- [preinitModule - React Official Docs](https://react.dev/reference/react-dom/preinitModule)
- [ES Modules - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Performance - MDN](https://developer.mozilla.org/en-US/docs/Web/Performance)

---

_Last updated: 2026-01-31_
