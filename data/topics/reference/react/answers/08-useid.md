# useId / useId

## Định nghĩa / Definition

[`useId`](https://react.dev/reference/react/useId) là một hook trong React cho phép bạn tạo unique IDs ổn định cho accessibility attributes (như `htmlFor`, `aria-describedby`). Nó đảm bảo IDs unique và nhất quán giữa server và client renders.

## Cú pháp / Syntax

```javascript
const id = useId();
```

## Tham số / Parameters

Không có tham số.

## Giá trị trả về / Return Value

| Giá trị | Kiểu   | Mô tả                               |
| ------- | ------ | ----------------------------------- |
| `id`    | String | Unique ID string được tạo bởi React |

## Cách hoạt động / How it Works

### Unique ID Generation

`useId` tạo unique ID cho mỗi component instance:

```javascript
function Component() {
  const id = useId(); // ':r1:', ':r2:', etc.
  return <input id={id} />;
}
```

### Server-Side Rendering (SSR)

Với SSR, `useId` đảm bảo IDs nhất quán giữa server và client:

```javascript
// Server render: id = ':r1:'
// Client hydration: id = ':r1:'
// IDs khớp nhau
```

### ID Prefix

React sử dụng prefix để tránh conflicts:

```javascript
// Format: ':r{number}:'
// ':r1:', ':r2:', ':r3:', etc.
```

### Multiple useId Calls

Mỗi lần gọi `useId` trong cùng component trả về cùng ID:

```javascript
function Component() {
  const id = useId();
  const sameId = useId(); // Cùng giá trị với id
  return <div>{id === sameId}</div>; // true
}
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { useId } from "react";

function TextInput({ label }) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" />
    </div>
  );
}

function Form() {
  return (
    <form>
      <TextInput label="Name" />
      <TextInput label="Email" />
      <TextInput label="Password" />
    </form>
  );
}
```

### Ví dụ với Accessibility

```jsx
function ErrorTooltip({ error }) {
  const id = useId();

  return (
    <div>
      <input aria-invalid={error ? "true" : "false"} aria-describedby={id} />
      {error && (
        <div id={id} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
```

### Ví dụ với Multiple Components

```jsx
function Checkbox({ label, checked, onChange }) {
  const id = useId();

  return (
    <div>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function Form() {
  return (
    <div>
      <Checkbox label="Option 1" />
      <Checkbox label="Option 2" />
      <Checkbox label="Option 3" />
    </div>
  );
}
```

### Ví dụ với Dynamic Content

```jsx
function AccordionItem({ title, children }) {
  const id = useId();
  const contentId = `${id}-content`;

  return (
    <div>
      <button aria-expanded="false" aria-controls={contentId}>
        {title}
      </button>
      <div id={contentId} role="region">
        {children}
      </div>
    </div>
  );
}
```

### Ví dụ với TypeScript

```tsx
import { useId } from "react";

function TextInput({ label }: { label: string }) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" />
    </div>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi cần unique IDs cho accessibility attributes (`htmlFor`, `aria-describedby`, `aria-controls`)
- Khi cần unique IDs cho form elements
- Khi dùng SSR (Server-Side Rendering)
- Khi cần IDs nhất quán giữa server và client renders
- Khi cần IDs cho dynamic content

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi không cần accessibility attributes
- Khi có thể dùng static IDs
- Khi component không render nhiều lần

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `useId`, bạn sẽ gặp các vấn đề sau:

1. **ID conflicts**: IDs có thể trùng nhau giữa các component instances.

2. **SSR hydration mismatches**: Với SSR, IDs có thể không khớp giữa server và client, dẫn đến hydration errors.

3. **Manual ID management**: Phải tự tạo và quản lý IDs, code phức tạp hơn.

4. **Accessibility issues**: Không có unique IDs, accessibility bị ảnh hưởng.

## Vấn đề được giải quyết / Problems Solved

### 1. Unique ID Generation

`useId` tự động tạo unique IDs cho mỗi component instance, tránh conflicts.

### 2. SSR Hydration

Với SSR, `useId` đảm bảo IDs nhất quán giữa server và client renders, tránh hydration errors.

### 3. Accessibility Support

Giúp tạo accessible forms và UI components với unique IDs.

## Ưu điểm / Advantages

1. **Unique IDs**: Tự động tạo unique IDs, tránh conflicts.

2. **SSR support**: Hoạt động tốt với Server-Side Rendering.

3. **Simple API**: API đơn giản, dễ hiểu và dùng.

4. **Accessibility**: Giúp tạo accessible UI components.

## Nhược điểm / Disadvantages

1. **Limited control**: Không thể tùy chỉnh ID format hoặc prefix.

2. **Read-only**: ID là read-only, không thể thay đổi.

3. **Not suitable for all cases**: Không phù hợp khi cần dynamic IDs hoặc custom ID formats.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm      | useId | Manual IDs     | UUID  |
| ------------- | ----- | -------------- | ----- |
| Unique        | Có    | Không (rủi ro) | Có    |
| SSR support   | Có    | Không          | Có    |
| Simple        | Có    | Không          | Có    |
| Predictable   | Có    | Không          | Không |
| Custom format | Không | Có             | Có    |

## Best Practices / Các thực hành tốt

1. **Dùng cho accessibility attributes**:

   ```javascript
   const id = useId();
   <label htmlFor={id}>{label}</label>
   <input id={id} />
   ```

2. **Dùng với aria attributes**:

   ```javascript
   const id = useId();
   <input aria-describedby={id} />
   <div id={id} role="alert">{error}</div>
   ```

3. **Dùng cho dynamic content**:
   ```javascript
   const id = useId();
   const contentId = `${id}-content`;
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Multiple useId Calls

```javascript
// ❌ Không cần thiết - cùng giá trị
const id1 = useId();
const id2 = useId(); // Cùng giá trị với id1

// ✅ Đúng - chỉ gọi một lần
const id = useId();
```

### 2. Not Using for Accessibility

```javascript
// ❌ Sai - không dùng useId
<label htmlFor="my-id">Label</label>
<input id="my-id" />

// ✅ Đúng - dùng useId
const id = useId();
<label htmlFor={id}>Label</label>
<input id={id} />
```

## Performance Considerations / Yếu tố hiệu suất

1. **Minimal overhead**: `useId` có rất ít overhead.

2. **No re-render**: Không trigger re-render.

## Câu hỏi phỏng vấn / Interview Questions

1. `useId` là gì? Khi nào nên dùng?

2. `useId` hoạt động như thế nào?

3. Tại sao `useId` quan trọng cho accessibility?

4. `useId` hỗ trợ SSR như thế nào?

5. Làm thế nào để dùng `useId` với `htmlFor`?

6. Làm thế nào để dùng `useId` với `aria-describedby`?

7. Làm thế nào để tạo unique IDs cho dynamic content?

8. Sự khác biệt giữa `useId` và manual IDs?

9. Làm thế nào để type `useId` với TypeScript?

10. Làm thế nào để debug `useId`?

## Tài liệu tham khảo / References

- [useId - React Official Docs](https://react.dev/reference/react/useId)
- [Accessibility - React Official Docs](https://react.dev/learn/accessibility)

---

_Last updated: 2026-01-31_
