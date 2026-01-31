# experimental_taintUniqueValue / experimental_taintUniqueValue

## Định nghĩa / Definition

[`experimental_taintUniqueValue`](https://react.dev/reference/react/experimental_taintUniqueValue) là một API experimental trong React cho phép bạn **taint unique values** để ngăn chặn data bị leak đến untrusted contexts.

## Cú pháp / Syntax

```javascript
experimental_taintUniqueValue(value, errorMessage);
```

## Tham số / Parameters

| Tham số        | Kiểu     | Mô tả                                                  |
| -------------- | -------- | ------------------------------------------------------ |
| `value`        | `any`    | Unique value muốn taint.                               |
| `errorMessage` | `string` | Error message hiển thị khi tainted value được sử dụng. |

## Giá trị trả về / Return Value

Không có giá trị trả về (void).

## Cách hoạt động / How it Works

### Tainting Mechanism

Khi một unique value được tainted, React sẽ throw error khi value được sử dụng trong untrusted contexts:

```
taintUniqueValue(secretValue, "This value is tainted")
// value giờ đã bị taint
// Khi value được sử dụng → Error: "This value is tainted"
```

### Use Cases

Taint unique values cho:

- Secret keys
- Unique tokens
- One-time passwords
- Sensitive identifiers

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { experimental_taintUniqueValue } from "react";

function ServerComponent() {
  const secretKey = "super-secret-key-12345";

  // Taint secret key
  experimental_taintUniqueValue(secretKey, "Secret key cannot be accessed");

  // Khi secretKey được sử dụng → Error
  return <div>{secretKey}</div>;
}
```

### Ví dụ với API Key

```jsx
import { experimental_taintUniqueValue } from "react";

async function APIClient() {
  const apiKey = await fetchAPIKey();

  // Taint API key
  experimental_taintUniqueValue(apiKey, "API key is sensitive");

  // Khi apiKey được sử dụng → Error
  return <div>API Key: {apiKey}</div>;
}
```

### Ví dụ với One-time Token

```jsx
import { experimental_taintUniqueValue } from "react";

function TokenHandler({ token }) {
  // Taint one-time token
  experimental_taintUniqueValue(token, "One-time token cannot be reused");

  const handleUse = () => {
    // Khi token được sử dụng → Error
    console.log("Using token:", token);
  };

  return (
    <div>
      <button onClick={handleUse}>Use Token</button>
    </div>
  );
}
```

### Ví dụ với Secret Value

```jsx
import { experimental_taintUniqueValue } from "react";

function SecretComponent() {
  const secretValue = "XYZ-789-ABC";

  // Taint secret value
  experimental_taintUniqueValue(secretValue, "Secret value is protected");

  return (
    <div>
      <p>Secret value loaded</p>
      {/* Khi secretValue được access → Error */}
    </div>
  );
}
```

### Ví dụ với Conditional Tainting

```jsx
import { experimental_taintUniqueValue } from "react";

function SecureComponent({ isProduction }) {
  const secretValue = "production-secret";

  // Chỉ taint trong production
  if (isProduction) {
    experimental_taintUniqueValue(
      secretValue,
      "Production secret is protected",
    );
  }

  return (
    <div>
      <p>Value: {secretValue}</p>
    </div>
  );
}
```

### Ví dụ với TypeScript

```tsx
import { experimental_taintUniqueValue } from "react";

interface TaintedValue {
  value: string;
  expires: number;
}

function SecureComponent() {
  const secret: TaintedValue = {
    value: "secret-key-123",
    expires: Date.now() + 3600000,
  };

  experimental_taintUniqueValue(secret, "Secret value is protected");

  return <div>Secret loaded</div>;
}
```

### Ví dụ với Error Handling

```jsx
import { experimental_taintUniqueValue } from "react";

function SecureDataComponent() {
  const secretToken = "abc-xyz-789";

  // Taint token
  experimental_taintUniqueValue(secretToken, "Secret token is protected");

  const handleAccess = () => {
    try {
      // Khi secretToken được sử dụng → Error
      console.log("Accessing:", secretToken);
    } catch (error) {
      console.error("Access denied:", error);
    }
  };

  return (
    <div>
      <button onClick={handleAccess}>Access Secret</button>
    </div>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi có secret keys cần bảo vệ
- Khi có one-time tokens
- Khi có sensitive unique values
- Khi muốn enforce security policies

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi value không sensitive
- Khi value cần được access ở client-side
- Khi không cần security enforcement

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `experimental_taintUniqueValue`:

1. **No protection**: Secret values không được bảo vệ.

2. **Manual tracking**: Phải tự track secret usage.

3. **No enforcement**: Không có built-in security enforcement.

## Vấn đề được giải quyết / Problems Solved

### 1. Value Protection

Protect unique sensitive values.

### 2. Security Enforcement

Enforce security policies declaratively.

### 3. Error Handling

Tự động throw error khi tainted value được access.

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

| Đặc điểm      | experimental_taintUniqueValue | experimental_taintObjectReference | Manual tracking |
| ------------- | ----------------------------- | --------------------------------- | --------------- |
| Unique values | Có                            | Không                             | Không           |
| Objects       | Không                         | Có                                | Không           |
| Automatic     | Có                            | Có                                | Không           |
| Simple API    | Có                            | Có                                | Không           |

## Best Practices / Các thực hành tốt

1. **Taint sensitive values**:

   ```jsx
   experimental_taintUniqueValue(secretKey, "Secret key is protected");
   ```

2. **Meaningful error messages**:

   ```jsx
   experimental_taintUniqueValue(token, "One-time token cannot be reused");
   ```

3. **Kết hợp với Error Boundary**:

   ```jsx
   <ErrorBoundary fallback={<SecurityError />}>
     <ComponentWithTaint />
   </ErrorBoundary>
   ```

4. **Type the value**:
   ```tsx
   const secret: string = "secret-key";
   experimental_taintUniqueValue(secret, "Protected");
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Tainting Non-Sensitive Values

```jsx
// ❌ Không cần taint
experimental_taintUniqueValue("public-data", "This data is sensitive");

// ✅ Chỉ taint sensitive values
experimental_taintUniqueValue(secretKey, "Secret key is protected");
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

### 3. Forgetting Experimental Status

```jsx
// ⚠️ Cảnh báo - experimental API
import { experimental_taintUniqueValue } from "react";
// Có thể thay đổi trong tương lai
```

### 4. Tainting Multiple Times

```jsx
// ❌ Taint nhiều lần
experimental_taintUniqueValue(secret, "Protected");
experimental_taintUniqueValue(secret, "Protected");

// ✅ Chỉ taint một lần
experimental_taintUniqueValue(secret, "Protected");
```

## Performance Considerations / Yếu tố hiệu suất

1. **Minimal overhead**: Có overhead nhỏ.

2. **Security checks**: Có cost nhỏ cho security enforcement.

3. **No runtime cost**: Không có runtime cost cho non-tainted values.

## Browser Support / Hỗ trợ trình duyệt

`experimental_taintUniqueValue` hoạt động trên tất cả môi trường hỗ trợ React 19+.

## Câu hỏi phỏng vấn / Interview Questions

1. `experimental_taintUniqueValue` là gì? Khi nào nên dùng?

2. `experimental_taintUniqueValue` hoạt động như thế nào?

3. Unique value taint là gì?

4. `experimental_taintUniqueValue` khác gì với `experimental_taintObjectReference`?

5. `experimental_taintUniqueValue` giúp với security như thế nào?

6. `experimental_taintUniqueValue` có hoạt động với React 18 không?

7. Làm thế nào để handle errors từ tainted values?

8. `experimental_taintUniqueValue` có hoạt động với SSR không?

9. `experimental_taintUniqueValue` có hoạt động với TypeScript không?

10. Làm thế nào để test components với taint?

11. Khi nào nên dùng `experimental_taintUniqueValue` thay vì `experimental_taintObjectReference`?

12. `experimental_taintUniqueValue` có hoạt động với class components không?

13. Làm thế nào `experimental_taintUniqueValue` kết hợp với Error Boundary?

14. Khi nào không nên dùng `experimental_taintUniqueValue`?

15. Làm thế nào `experimental_taintUniqueValue` giúp với data protection?

## Tài liệu tham khảo / References

- [experimental_taintUniqueValue - React Official Docs](https://react.dev/reference/react/experimental_taintUniqueValue)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [Security - React Docs](https://react.dev/learn/scaling-up-with-server-components)

---

_Last updated: 2026-01-31_
