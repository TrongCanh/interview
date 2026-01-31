# useFormStatus / useFormStatus

## Định nghĩa / Definition

[`useFormStatus`](https://react.dev/reference/react-dom/hooks/useFormStatus) là một hook trong React-DOM cho phép bạn **đọc status form submission** từ form action gần nhất.

## Cú pháp / Syntax

```javascript
const { pending, data, method, action } = useFormStatus();
```

## Giá trị trả về / Return Value

| Giá trị   | Kiểu       | Mô tả                                               |
| --------- | ---------- | --------------------------------------------------- |
| `pending` | `boolean`  | `true` nếu form đang submitting, `false` nếu không. |
| `data`    | `FormData` | Data từ form action gần nhất.                       |
| `method`  | `string`   | HTTP method từ form action ("GET", "POST", v.v.).   |
| `action`  | `string`   | Action URL từ form action.                          |

## Cách hoạt động / How it Works

### Form Status Tracking

Hook theo dõi status của form action gần nhất:

```
Form Submit → pending = true → Action Complete → pending = false
```

### Nested Forms

Hook chỉ theo dõi form action gần nhất:

```jsx
<Form>
  <form action={action1}>{/* Form 1 */}</form>
  <form action={action2}>{/* Form 2 */}</form>
</Form>
// useFormStatus chỉ theo dõi form action gần nhất
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { useFormStatus } from "react-dom";

function FormComponent() {
  const { pending } = useFormStatus();

  return (
    <form action="/api/submit" method="POST">
      <input name="name" required />
      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
```

### Ví dụ với Status Display

```jsx
import { useFormStatus } from "react-dom";

function StatusDisplay() {
  const { pending, data, method, action } = useFormStatus();

  return (
    <div>
      <p>Method: {method}</p>
      <p>Action: {action}</p>
      <p>Pending: {pending ? "Yes" : "No"}</p>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

function Form() {
  return (
    <form action="/api/submit" method="POST">
      <input name="message" />
      <button type="submit">Send</button>
      <StatusDisplay />
    </form>
  );
}
```

### Ví dụ với Multiple Forms

```jsx
import { useFormStatus } from "react-dom";

function MultiFormPage() {
  const { pending: form1Pending } = useFormStatus();
  const { pending: form2Pending } = useFormStatus();

  return (
    <div>
      <form action="/api/form1" method="POST">
        <input name="field1" />
        <button type="submit" disabled={form1Pending}>
          {form1Pending ? "Submitting..." : "Submit Form 1"}
        </button>
      </form>
      <form action="/api/form2" method="POST">
        <input name="field2" />
        <button type="submit" disabled={form2Pending}>
          {form2Pending ? "Submitting..." : "Submit Form 2"}
        </button>
      </form>
    </div>
  );
}
```

### Ví dụ với Progress Indicator

```jsx
import { useFormStatus } from "react-dom";

function ProgressBar() {
  const { pending } = useFormStatus();

  return (
    <div className="progress-container">
      <div className={`progress-bar ${pending ? "active" : ""}`}>
        <div
          className="progress-fill"
          style={{ width: pending ? "100%" : "0%" }}
        ></div>
      </div>
      <p>{pending ? "Submitting..." : "Ready"}</p>
    </div>
  );
}

function Form() {
  return (
    <form action="/api/submit" method="POST">
      <input name="data" />
      <button type="submit">Submit</button>
      <ProgressBar />
    </form>
  );
}
```

### Ví dụ với Error Handling

```jsx
import { useFormStatus } from "react-dom";

function FormWithError() {
  const { pending, data } = useFormStatus();

  return (
    <form action="/api/submit" method="POST">
      <input name="name" required />
      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
      {data && data.error && <div className="error">Error: {data.error}</div>}
    </form>
  );
}
```

### Ví dụ với Success Message

```jsx
import { useFormStatus } from "react-dom";

function SuccessMessage() {
  const { pending, data } = useFormStatus();

  if (pending) {
    return <div>Submitting...</div>;
  }

  if (data && data.success) {
    return <div className="success">Form submitted successfully!</div>;
  }

  return null;
}

function Form() {
  return (
    <form action="/api/submit" method="POST">
      <input name="message" />
      <button type="submit">Send</button>
      <SuccessMessage />
    </form>
  );
}
```

### Ví dụ với TypeScript

```tsx
import { useFormStatus } from "react-dom";

function FormComponent() {
  const { pending, data, method, action } = useFormStatus();

  return (
    <form action="/api/submit" method="POST">
      <input name="name" required />
      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi cần hiển thị status form submission
- Khi cần disable submit button trong khi submitting
- Khi cần hiển thị progress indicator
- Khi làm việc với Server Actions

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi không có form submissions
- Khi không cần track form status
- Khi không dùng Server Actions

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `useFormStatus`:

1. **Manual status tracking**: Phải tự track form status.

2. **No pending state**: Không có built-in pending state.

3. **Complex code**: Code phức tạp hơn để handle form status.

## Vấn đề được giải quyết / Problems Solved

### 1. Form Status Tracking

Tự động track form submission status.

### 2. Pending State

Cung cấp pending state cho form submissions.

### 3. Data Access

Dễ access form data sau submission.

## Ưu điểm / Advantages

1. **Simple API**: Dễ sử dụng.

2. **Automatic tracking**: Tự động track form status.

3. **Server Actions**: Hoạt động tốt với Server Actions.

4. **TypeScript support**: Tốt với TypeScript.

## Nhược điểm / Disadvantages

1. **React 19+**: Chỉ hoạt động với React 19 trở lên.

2. **Nested forms**: Chỉ theo dõi form action gần nhất.

3. **Server Actions required**: Cần dùng với Server Actions.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm       | useFormStatus | useActionState | Manual state |
| -------------- | ------------- | -------------- | ------------ |
| Automatic      | Có            | Có             | Không        |
| Pending state  | Có            | Có             | Không        |
| Data access    | Có            | Có             | Không        |
| Simple API     | Có            | Có             | Không        |
| Server Actions | Có            | Có             | Không        |

## Best Practices / Các thực hành tốt

1. **Dùng để disable submit button**:

   ```jsx
   const { pending } = useFormStatus();
   <button disabled={pending}>Submit</button>;
   ```

2. **Hiển thị progress indicator**:

   ```jsx
   const { pending } = useFormStatus();
   {
     pending && <Spinner />;
   }
   ```

3. **Kết hợp với Server Actions**:

   ```jsx
   async function submitAction(prevState, formData) {
     return submitForm(formData);
   }
   ```

4. **Type the result**:
   ```tsx
   const { pending, data } = useFormStatus();
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Using Outside Form

```jsx
// ❌ Sai - dùng ngoài form
function Component() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>Submit</button>;
}

// ✅ Đúng - dùng trong form
function Component() {
  const { pending } = useFormStatus();
  return (
    <form action="/api/submit">
      <button disabled={pending}>Submit</button>
    </form>
  );
}
```

### 2. Not Using with Server Actions

```jsx
// ❌ Không hoạt động với client-side forms
function Component() {
  const { pending } = useFormStatus();
  return (
    <form onSubmit={handleSubmit}>
      <button disabled={pending}>Submit</button>
    </form>
  );
}

// ✅ Đúng - dùng với Server Actions
function Component() {
  const { pending } = useFormStatus();
  return (
    <form action="/api/submit" method="POST">
      <button disabled={pending}>Submit</button>
    </form>
  );
}
```

### 3. Using in Wrong React Version

```jsx
// ❌ Không hoạt động với React < 19
// useFormStatus chỉ có sẵn từ React 19

// ✅ Kiểm tra version
import { useFormStatus } from "react-dom"; // React 19+
```

## Performance Considerations / Yếu tố hiệu suất

1. **Minimal overhead**: Có overhead nhỏ.

2. **No re-renders**: Hook không gây unnecessary re-renders.

3. **Optimized tracking**: Form status được track hiệu quả.

## Browser Support / Hỗ trợ trình duyệt

`useFormStatus` hoạt động trên tất cả trình duyệt hỗ trợ React 19+.

## Câu hỏi phỏng vấn / Interview Questions

1. `useFormStatus` là gì? Khi nào nên dùng?

2. `useFormStatus` hoạt động như thế nào?

3. `useFormStatus` trả về những gì?

4. `useFormStatus` hoạt động với nested forms không?

5. Làm thế nào `useFormStatus` giúp với form submissions?

6. `useFormStatus` có hoạt động với React 18 không?

7. Làm thế nào để hiển thị pending state?

8. `useFormStatus` có hoạt động với SSR không?

9. `useFormStatus` có hoạt động với TypeScript không?

10. Làm thế nào để test components với `useFormStatus`?

11. `useFormStatus` khác gì với `useActionState`?

12. Làm thế nào `useFormStatus` kết hợp với Server Actions?

13. Khi nào không nên dùng `useFormStatus`?

14. `useFormStatus` có hoạt động với class components không?

15. Làm thế nào `useFormStatus` giúp với UX?

## Tài liệu tham khảo / References

- [useFormStatus - React Official Docs](https://react.dev/reference/react-dom/hooks/useFormStatus)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [Actions - React Docs](https://react.dev/reference/react/useActionState)

---

_Last updated: 2026-01-31_
