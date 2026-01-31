# useActionState / useActionState

## Định nghĩa / Definition

[`useActionState`](https://react.dev/reference/react/useActionState) là một hook trong React 19 cho phép bạn quản lý state cho **form actions**. Nó cung cấp một cách đơn giản để handle form submissions với loading states, errors, và success states.

## Cú pháp / Syntax

```javascript
const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
```

## Tham số / Parameters

| Tham số        | Kiểu       | Mô tả                                                                 |
| -------------- | ---------- | --------------------------------------------------------------------- |
| `fn`           | `function` | Function action nhận `(prevState, formData)` và trả về state mới.     |
| `initialState` | Any        | Giá trị state ban đầu.                                                |
| `permalink`    | `string`   | (Optional) URL cho progressive enhancement khi JavaScript không load. |

## Giá trị trả về / Return Value

| Giá trị      | Kiểu       | Mô tả                                           |
| ------------ | ---------- | ----------------------------------------------- |
| `state`      | Any        | Giá trị state hiện tại.                         |
| `formAction` | `function` | Function action dùng cho form's `action` prop.  |
| `isPending`  | `boolean`  | `true` nếu action đang chạy, `false` nếu không. |

## Cách hoạt động / How it Works

### Form Action Lifecycle

```
Form Submit → formAction() → isPending = true
                              ↓
                          fn(prevState, formData)
                              ↓
                      ┌───────────┴───────────┐
                      ↓                       ↓
                  Success                  Error
                      ↓                       ↓
              Update State              Update State with Error
                      ↓                       ↓
              isPending = false        isPending = false
```

### Server Actions Integration

`useActionState` được thiết kế để làm việc với **React Server Actions**:

- Action có thể chạy trên server hoặc client
- State được quản lý tự động
- Progressive enhancement: form vẫn hoạt động khi JS không load

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { useActionState } from "react";

function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get("name");
      const email = formData.get("email");

      // Submit form
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        return { error: "Failed to send message" };
      }

      return { success: true, message: "Message sent!" };
    },
    { success: false, message: "" },
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Your name" required />
      <input name="email" type="email" placeholder="Your email" required />
      <textarea name="message" placeholder="Your message" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Sending..." : "Send"}
      </button>
      {state.success && <p className="success">{state.message}</p>}
      {state.error && <p className="error">{state.error}</p>}
    </form>
  );
}
```

### Ví dụ với Login Form

```jsx
import { useActionState } from "react";

function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.message || "Login failed" };
      }

      return { success: true, user: data.user };
    },
    { success: false, error: "", user: null },
  );

  return (
    <form action={formAction}>
      <h1>Login</h1>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>
      {state.error && <p className="error">{state.error}</p>}
      {state.success && <p className="success">Welcome, {state.user.name}!</p>}
    </form>
  );
}
```

### Ví dụ với Todo Form

```jsx
import { useActionState } from "react";

function AddTodoForm({ onAdd }) {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const text = formData.get("text");

      if (!text || text.trim() === "") {
        return { error: "Please enter a todo", success: false };
      }

      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim() }),
      });

      if (!response.ok) {
        return { error: "Failed to add todo", success: false };
      }

      const todo = await response.json();
      onAdd(todo);
      return { success: true, error: "" };
    },
    { success: false, error: "" },
  );

  return (
    <form action={formAction}>
      <input name="text" placeholder="Add a new todo..." />
      <button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add"}
      </button>
      {state.error && <p className="error">{state.error}</p>}
    </form>
  );
}
```

### Ví dụ với Validation

```jsx
import { useActionState } from "react";

function SignupForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

      // Client-side validation
      const errors = {};

      if (!name || name.length < 2) {
        errors.name = "Name must be at least 2 characters";
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Please enter a valid email";
      }

      if (!password || password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }

      if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }

      if (Object.keys(errors).length > 0) {
        return { errors, success: false };
      }

      // Server-side submission
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        return { errors: data.errors || {}, success: false };
      }

      return { success: true, errors: {} };
    },
    { success: false, errors: {} },
  );

  return (
    <form action={formAction}>
      <div>
        <label>Name</label>
        <input name="name" />
        {state.errors.name && (
          <span className="error">{state.errors.name}</span>
        )}
      </div>
      <div>
        <label>Email</label>
        <input name="email" type="email" />
        {state.errors.email && (
          <span className="error">{state.errors.email}</span>
        )}
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
        {state.errors.password && (
          <span className="error">{state.errors.password}</span>
        )}
      </div>
      <div>
        <label>Confirm Password</label>
        <input name="confirmPassword" type="password" />
        {state.errors.confirmPassword && (
          <span className="error">{state.errors.confirmPassword}</span>
        )}
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Creating account..." : "Sign up"}
      </button>
      {state.success && (
        <p className="success">Account created successfully!</p>
      )}
    </form>
  );
}
```

### Ví dụ với File Upload

```jsx
import { useActionState } from "react";

function FileUploadForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const file = formData.get("file");

      if (!file) {
        return { error: "Please select a file", success: false };
      }

      if (file.size > 5 * 1024 * 1024) {
        return { error: "File size must be less than 5MB", success: false };
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        return { error: "Failed to upload file", success: false };
      }

      const data = await response.json();
      return { success: true, file: data.file, error: "" };
    },
    { success: false, file: null, error: "" },
  );

  return (
    <form action={formAction}>
      <input name="file" type="file" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Uploading..." : "Upload"}
      </button>
      {state.error && <p className="error">{state.error}</p>}
      {state.success && (
        <p className="success">
          File uploaded: {state.file.name} ({state.file.size} bytes)
        </p>
      )}
    </form>
  );
}
```

### Ví dụ với Server Action

```jsx
import { useActionState } from "react";

// Server action
async function submitComment(prevState, formData) {
  "use server";

  const text = formData.get("text");
  const postId = formData.get("postId");

  // Validate
  if (!text || text.trim() === "") {
    return { error: "Comment cannot be empty", success: false };
  }

  // Save to database
  const comment = await db.comments.create({
    text: text.trim(),
    postId,
    userId: session.user.id,
  });

  return { success: true, comment, error: "" };
}

function CommentForm({ postId }) {
  const [state, formAction, isPending] = useActionState(submitComment, {
    success: false,
    error: "",
    comment: null,
  });

  return (
    <form action={formAction}>
      <input type="hidden" name="postId" value={postId} />
      <textarea name="text" placeholder="Write a comment..." />
      <button type="submit" disabled={isPending}>
        {isPending ? "Posting..." : "Post Comment"}
      </button>
      {state.error && <p className="error">{state.error}</p>}
      {state.success && <p className="success">Comment posted!</p>}
    </form>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi cần handle form submissions với loading states
- Khi cần hiển thị errors từ form submissions
- Khi cần progressive enhancement cho forms
- Khi làm việc với Server Actions
- Khi cần quản lý state cho form submissions

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi không có form submission (dùng `useState` hoặc `useReducer`)
- Khi cần complex state management (dùng state management libraries)
- Khi form không cần loading/error states
- Khi cần custom form handling logic

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `useActionState`:

1. **Code phức tạp**: Phải tự implement loading states, error handling, và form submission logic.

2. **Manual state management**: Phải quản lý state thủ công với `useState` hoặc `useReducer`.

3. **No progressive enhancement**: Form không hoạt động khi JavaScript không load.

4. **Boilerplate code**: Nhiều code lặp lại cho mỗi form.

## Vấn đề được giải quyết / Problems Solved

### 1. Simplified Form State Management

Tự động quản lý loading states, errors, và success states.

### 2. Progressive Enhancement

Form vẫn hoạt động khi JavaScript không load nhờ `permalink` parameter.

### 3. Server Actions Integration

Làm việc mượt mà với React Server Actions.

### 4. Type Safety

Tốt với TypeScript, có thể type form states.

## Ưu điểm / Advantages

1. **Simple API**: Dễ sử dụng với cú pháp đơn giản.
2. **Automatic state management**: Tự động quản lý loading/error/success states.
3. **Progressive enhancement**: Form hoạt động khi JS không load.
4. **TypeScript support**: Tốt với TypeScript.
5. **Works with Server Actions**: Kết hợp tốt với Server Actions.

## Nhược điểm / Disadvantages

1. **React 19+**: Chỉ hoạt động với React 19 trở lên.
2. **Form-specific**: Chỉ dùng được cho forms.
3. **Limited flexibility**: Không phù hợp cho complex form logic.
4. **Learning curve**: Cần hiểu về Server Actions.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm                | useActionState | useState + useEffect | Formik     | React Hook Form |
| ----------------------- | -------------- | -------------------- | ---------- | --------------- |
| Simple API              | Có             | Không                | Có         | Có              |
| Progressive Enhancement | Có             | Không                | Không      | Không           |
| Server Actions          | Có             | Không                | Không      | Không           |
| Validation              | Manual         | Manual               | Built-in   | Built-in        |
| TypeScript              | Có             | Có                   | Có         | Có              |
| Learning Curve          | Thấp           | Thấp                 | Trung bình | Trung bình      |

## Best Practices / Các thực hành tốt

1. **Dùng với Server Actions**:

   ```javascript
   const [state, formAction] = useActionState(serverAction, initialState);
   ```

2. **Hiển thị loading state**:

   ```javascript
   <button disabled={isPending}>
     {isPending ? "Submitting..." : "Submit"}
   </button>
   ```

3. **Handle errors properly**:

   ```javascript
   {
     state.error && <Error message={state.error} />;
   }
   ```

4. **Validate on both client and server**:

   ```javascript
   // Client validation
   if (!email) return { error: "Email required" };
   // Server validation in action
   ```

5. **Use permalink for progressive enhancement**:
   ```javascript
   useActionState(action, initialState, "/api/submit");
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Not Showing Loading State

```javascript
// ❌ Không có loading indicator
<button>Submit</button>

// ✅ Có loading indicator
<button disabled={isPending}>
  {isPending ? "Submitting..." : "Submit"}
</button>
```

### 2. Not Handling Errors

```javascript
// ❌ Không handle error
const [state, formAction] = useActionState(action, {});

// ✅ Handle error
const [state, formAction] = useActionState(action, { error: "" });
{
  state.error && <Error message={state.error} />;
}
```

### 3. Mutating Previous State

```javascript
// ❌ Sai - mutate state
async function action(prevState, formData) {
  prevState.error = "New error";
  return prevState;
}

// ✅ Đúng - trả về state mới
async function action(prevState, formData) {
  return { ...prevState, error: "New error" };
}
```

### 4. Not Using FormData

```javascript
// ❌ Không dùng FormData
async function action(prevState, data) {
  // data không phải FormData
}

// ✅ Dùng FormData
async function action(prevState, formData) {
  const name = formData.get("name");
}
```

## Performance Considerations / Yếu tố hiệu suất

1. **Reduced re-renders**: State được quản lý hiệu quả.

2. **Progressive enhancement**: Form hoạt động khi JS không load.

3. **Server Actions**: Có thể offload work đến server.

4. **Minimal overhead**: Hook nhẹ, không gây performance issues.

## Browser Support / Hỗ trợ trình duyệt

`useActionState` hoạt động trên tất cả trình duyệt hỗ trợ React 19+.

## Câu hỏi phỏng vấn / Interview Questions

1. `useActionState` là gì? Khi nào nên dùng?

2. `useActionState` hoạt động như thế nào?

3. `useActionState` khác gì với `useState` + `useEffect`?

4. Progressive enhancement trong `useActionState` là gì?

5. `useActionState` kết hợp với Server Actions như thế nào?

6. `permalink` parameter dùng để làm gì?

7. Làm thế nào để handle errors với `useActionState`?

8. `useActionState` có hoạt động với React 18 không?

9. Làm thế nào để hiển thị loading state?

10. `useActionState` có hoạt động với TypeScript không?

11. Làm thế nào để validate forms với `useActionState`?

12. Sự khác biệt giữa `useActionState` và Formik?

13. `useActionState` có hoạt động với SSR không?

14. Làm thế nào để test components với `useActionState`?

15. Khi nào nên dùng `useActionState` thay vì `useReducer`?

## Tài liệu tham khảo / References

- [useActionState - React Official Docs](https://react.dev/reference/react/useActionState)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [Server Actions - React Docs](https://react.dev/reference/react/use-server)

---

_Last updated: 2026-01-31_
