# experimental_taintObjectReference / experimental_taintObjectReference

## Định nghĩa / Definition

[`experimental_taintObjectReference`](https://react.dev/reference/react/experimental_taintObjectReference) là một API experimental trong React cho phép bạn **taint object references** để ngăn chặn data bị leak đến untrusted contexts.

## Cú pháp / Syntax

```javascript
experimental_taintObjectReference(object, errorMessage);
```

## Tham số / Parameters

| Tham số        | Kiểu     | Mô tả                                                 |
| -------------- | -------- | ----------------------------------------------------- |
| `object`       | `object` | Object muốn taint.                                    |
| `errorMessage` | `string` | Error message hiển thị khi taint object được sử dụng. |

## Giá trị trả về / Return Value

Không có giá trị trả về (void).

## Cách hoạt động / How it Works

### Tainting Mechanism

Khi một object được tainted, React sẽ throw error khi object được sử dụng trong untrusted contexts:

```
taintObjectReference(data, "This data is tainted")
// data giờ đã bị taint
// Khi data được sử dụng → Error: "This data is tainted"
```

### Use Cases

Taint object references cho:

- Sensitive data (passwords, tokens)
- Data từ untrusted sources
- Data không nên leak đến client-side

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { experimental_taintObjectReference } from "react";

function ServerComponent() {
  const sensitiveData = {
    password: "secret123",
    token: "abc123",
  };

  // Taint sensitive data
  experimental_taintObjectReference(
    sensitiveData,
    "Sensitive data cannot be accessed",
  );

  // Khi data được sử dụng → Error
  return <div>{JSON.stringify(sensitiveData)}</div>;
}
```

### Ví dụ với Password Handling

```jsx
import { experimental_taintObjectReference } from "react";

function PasswordForm() {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordData = {
      password,
      timestamp: Date.now(),
    };

    // Taint password data
    experimental_taintObjectReference(
      passwordData,
      "Password data is sensitive",
    );

    // Password giờ đã bị taint
    // Không thể access trong client-side
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Ví dụ với API Token

```jsx
import { experimental_taintObjectReference } from "react";

async function ServerComponent() {
  const token = await fetchAPIToken();

  const tokenData = {
    token,
    expires: Date.now() + 3600000,
  };

  // Taint token
  experimental_taintObjectReference(tokenData, "API token is sensitive");

  return <div>Token loaded</div>;
}
```

### Ví dụ với User Data

```jsx
import { experimental_taintObjectReference } from "react";

async function UserProfile({ userId }) {
  const userData = await fetchUser(userId);

  // Taint sensitive fields
  experimental_taintObjectReference(
    {
      ssn: userData.ssn,
      creditCard: userData.creditCard,
    },
    "Sensitive PII cannot be accessed",
  );

  return (
    <div>
      <h1>{userData.name}</h1>
      <p>{userData.email}</p>
      {/* SSN và credit card đã bị taint */}
    </div>
  );
}
```

### Ví dụ với Error Boundary

```jsx
import { experimental_taintObjectReference } from "react";

function SecureComponent() {
  const sensitiveData = {
    apiKey: "secret-key",
  };

  experimental_taintObjectReference(sensitiveData, "API key is sensitive");

  return <div>{JSON.stringify(sensitiveData)}</div>;
}

function App() {
  return (
    <ErrorBoundary fallback={<TaintError />}>
      <SecureComponent />
    </ErrorBoundary>
  );
}
```

### Ví dụ với Conditional Tainting

```jsx
import { experimental_taintObjectReference } from "react";

function DataComponent({ isSensitive }) {
  const data = {
    value: "some data",
  };

  if (isSensitive) {
    experimental_taintObjectReference(data, "This data is sensitive");
  }

  return <div>{data.value}</div>;
}
```

### Ví dụ với TypeScript

```tsx
import { experimental_taintObjectReference } from "react";

interface SensitiveData {
  password: string;
  token: string;
}

function ServerComponent() {
  const data: SensitiveData = {
    password: "secret",
    token: "abc123",
  };

  experimental_taintObjectReference(data, "Sensitive data cannot be accessed");

  return <div>Data loaded</div>;
}
```

## Khi nào nên dùng / When to Use

- Khi có sensitive data cần bảo vệ
- Khi muốn prevent data leak
- Khi xử lý passwords, tokens, PII
- Khi muốn enforce security policies

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi data không sensitive
- Khi data cần được access ở client-side
- Khi không cần security enforcement

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `experimental_taintObjectReference`:

1. **Data leak**: Sensitive data có thể leak đến client-side.

2. **No enforcement**: Không có built-in security enforcement.

3. **Manual tracking**: Phải tự track sensitive data.

## Vấn đề được giải quyết / Problems Solved

### 1. Data Protection

Protect sensitive data từ untrusted access.

### 2. Security Enforcement

Enforce security policies declaratively.

### 3. Error Handling

Tự động throw error khi tainted data được access.

## Ưu điểm / Advantages

1. **Declarative security**: Security được định nghĩa declaratively.

2. **Automatic enforcement**: Tự động enforce policies.

3. **Simple API**: Dễ sử dụng.

4. **TypeScript support**: Tốt với TypeScript.

## Nhược điểm / Disadvantages

1. **Experimental**: API vẫn experimental.

2. **Limited use cases**: Chỉ dùng cho specific security scenarios.

3. **Not widely used**: Ít người biết về API này.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm       | experimental_taintObjectReference | Manual tracking | Encryption |
| -------------- | --------------------------------- | --------------- | ---------- |
| Automatic      | Có                                | Không           | Không      |
| Declarative    | Có                                | Không           | Không      |
| Error handling | Có                                | Không           | Không      |
| Learning curve | Thấp                              | Cao             | Trung bình |

## Best Practices / Các thực hành tốt

1. **Taint sensitive data**:

   ```jsx
   experimental_taintObjectReference(
     { password: "secret" },
     "Password is sensitive",
   );
   ```

2. **Meaningful error messages**:

   ```jsx
   experimental_taintObjectReference(
     data,
     "This data is sensitive and cannot be accessed",
   );
   ```

3. **Kết hợp với Error Boundary**:

   ```jsx
   <ErrorBoundary fallback={<SecurityError />}>
     <ComponentWithTaint />
   </ErrorBoundary>
   ```

4. **Type the data**:
   ```tsx
   interface SensitiveData {
     password: string;
   }
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Tainting Non-Sensitive Data

```jsx
// ❌ Không cần taint
experimental_taintObjectReference({ name: "John" }, "Name is sensitive");

// ✅ Chỉ taint sensitive data
experimental_taintObjectReference(
  { password: "secret" },
  "Password is sensitive",
);
```

### 2. Not Using Error Boundary

```jsx
// ❌ Không có Error Boundary
<ComponentWithTaint />

// ✅ Có Error Boundary
<ErrorBoundary fallback={<SecurityError />}>
  <ComponentWithTaint />
</ErrorBoundary>
```

### 3. Using in Wrong Context

```jsx
// ❌ Sai - dùng trong client component
function ClientComponent() {
  const data = { password: "secret" };
  experimental_taintObjectReference(data, "Sensitive");
  return <div>{data.password}</div>; // Error
}

// ✅ Đúng - dùng trong server component
async function ServerComponent() {
  const data = { password: "secret" };
  experimental_taintObjectReference(data, "Sensitive");
  return <div>Data loaded</div>;
}
```

### 4. Forgetting Experimental Status

```jsx
// ⚠️ Cảnh báo - experimental API
import { experimental_taintObjectReference } from "react";
// Có thể thay đổi trong tương lai
```

## Performance Considerations / Yếu tố hiệu suất

1. **Minimal overhead**: Có overhead nhỏ.

2. **Security checks**: Có cost nhỏ cho security enforcement.

3. **No runtime cost**: Không có runtime cost cho non-tainted data.

## Browser Support / Hỗ trợ trình duyệt

`experimental_taintObjectReference` hoạt động trên tất cả môi trường hỗ trợ React 19+.

## Câu hỏi phỏng vấn / Interview Questions

1. `experimental_taintObjectReference` là gì? Khi nào nên dùng?

2. `experimental_taintObjectReference` hoạt động như thế nào?

3. Taint object reference là gì?

4. `experimental_taintObjectReference` giúp với security như thế nào?

5. `experimental_taintObjectReference` có hoạt động với SSR không?

6. Làm thế nào để handle errors từ tainted objects?

7. `experimental_taintObjectReference` có hoạt động với TypeScript không?

8. Làm thế nào để test components với taint?

9. Khi nào nên taint data?

10. `experimental_taintObjectReference` khác gì với encryption?

11. `experimental_taintObjectReference` có hoạt động với React 18 không?

12. Làm thế nào `experimental_taintObjectReference` kết hợp với Error Boundary?

13. Có thể taint multiple objects không?

14. `experimental_taintObjectReference` có hoạt động với class components không?

15. Làm thế nào `experimental_taintObjectReference` giúp với data protection?

## Tài liệu tham khảo / References

- [experimental_taintObjectReference - React Official Docs](https://react.dev/reference/react/experimental_taintObjectReference)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [Security - React Docs](https://react.dev/learn/scaling-up-with-server-components)

---

_Last updated: 2026-01-31_
