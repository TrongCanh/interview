# useOptimistic / useOptimistic

## Định nghĩa / Definition

[`useOptimistic`](https://react.dev/reference/react/useOptimistic) là một hook trong React 19 cho phép bạn hiển thị **optimistic UI** - UI được cập nhật ngay lập tức dựa trên kết quả mong đợi của một action, trong khi chờ server phản hồi thực tế.

## Cú pháp / Syntax

```javascript
const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
```

## Tham số / Parameters

| Tham số    | Kiểu       | Mô tả                                                                                      |
| ---------- | ---------- | ------------------------------------------------------------------------------------------ |
| `state`    | Any        | Giá trị state hiện tại.                                                                    |
| `updateFn` | `function` | Function nhận `(currentState, optimisticValue)` và trả về state mới với optimistic update. |

## Giá trị trả về / Return Value

| Giá trị           | Kiểu       | Mô tả                                                                                       |
| ----------------- | ---------- | ------------------------------------------------------------------------------------------- |
| `optimisticState` | Any        | State với optimistic update đã áp dụng.                                                     |
| `addOptimistic`   | `function` | Function để thêm optimistic update. Gọi `addOptimistic(optimisticValue)` để bắt đầu update. |

## Cách hoạt động / How it Works

### Optimistic UI Pattern

Optimistic UI là pattern khi:

1. Người dùng thực hiện action (ví dụ: like, comment, add item)
2. UI cập nhật ngay lập tức với kết quả mong đợi
3. Request được gửi đến server
4. Nếu thành công: UI giữ nguyên
5. Nếu thất bại: UI revert về trạng thái trước đó

### Lifecycle

```
User Action → addOptimistic() → UI Update (optimistic)
                                    ↓
                            Send Request to Server
                                    ↓
                    ┌───────────────┴───────────────┐
                    ↓                               ↓
                Success                         Failure
                    ↓                               ↓
            Keep Optimistic State            Revert to Previous State
```

### Automatic Revert

Nếu server trả về lỗi, React sẽ tự động:

1. Revert optimistic state về giá trị trước đó
2. Hiển thị error message (nếu có)

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { useOptimistic, useState } from "react";

function LikeButton() {
  const [likes, setLikes] = useState(100);
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (state, newLike) => state + newLike,
  );

  async function handleLike() {
    addOptimisticLike(1); // Optimistic: tăng like ngay lập tức
    await sendLikeRequest(); // Gửi request đến server
    setLikes(optimisticLikes); // Update state thực tế
  }

  return <button onClick={handleLike}>❤️ {optimisticLikes} likes</button>;
}
```

### Ví dụ với Todo List

```jsx
import { useOptimistic, useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
  ]);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo],
  );

  async function addTodo(text) {
    const optimisticTodo = {
      id: Date.now(),
      text,
      completed: false,
      status: "pending", // Mark as optimistic
    };

    addOptimisticTodo(optimisticTodo); // Optimistic: thêm todo ngay

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      const newTodo = await response.json();
      setTodos([...todos, newTodo]); // Update với server data
    } catch (error) {
      console.error("Failed to add todo:", error);
      // React sẽ tự revert optimistic state
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(e.target.elements.text.value);
        }}
      >
        <input name="text" placeholder="Add todo..." />
        <button type="submit">Add</button>
      </form>
      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            {todo.status === "pending" && <span> (Saving...)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Ví dụ với Message App

```jsx
import { useOptimistic, useState } from "react";

function ChatApp() {
  const [messages, setMessages] = useState([]);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, newMessage],
  );

  async function sendMessage(text) {
    const optimisticMessage = {
      id: `temp-${Date.now()}`,
      text,
      sender: "me",
      timestamp: new Date().toISOString(),
      status: "sending",
    };

    addOptimisticMessage(optimisticMessage);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      const serverMessage = await response.json();
      setMessages([...messages, serverMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  return (
    <div>
      <div className="messages">
        {optimisticMessages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
            {msg.status === "sending" && (
              <span className="status">Sending...</span>
            )}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(e.target.elements.message.value);
        }}
      >
        <input name="message" placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

### Ví dụ với Toggle Feature

```jsx
import { useOptimistic, useState } from "react";

function FeatureToggle() {
  const [features, setFeatures] = useState({
    darkMode: false,
    notifications: true,
  });

  const [optimisticFeatures, toggleOptimisticFeature] = useOptimistic(
    features,
    (state, feature) => ({ ...state, [feature]: !state[feature] }),
  );

  async function toggleFeature(feature) {
    toggleOptimisticFeature(feature); // Optimistic: toggle ngay

    try {
      await fetch(`/api/features/${feature}`, {
        method: "PATCH",
        body: JSON.stringify({ enabled: !features[feature] }),
      });
      setFeatures(optimisticFeatures);
    } catch (error) {
      console.error("Failed to toggle feature:", error);
    }
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={optimisticFeatures.darkMode}
          onChange={() => toggleFeature("darkMode")}
        />
        Dark Mode
      </label>
      <label>
        <input
          type="checkbox"
          checked={optimisticFeatures.notifications}
          onChange={() => toggleFeature("notifications")}
        />
        Notifications
      </label>
    </div>
  );
}
```

### Ví dụ với Rating System

```jsx
import { useOptimistic, useState } from "react";

function RatingSystem({ productId }) {
  const [rating, setRating] = useState(4.5);
  const [userRating, setUserRating] = useState(null);

  const [optimisticRating, addOptimisticRating] = useOptimistic(
    rating,
    (state, newRating) => {
      // Tính toán rating mới với optimistic value
      const totalRatings = state * 100; // Giả sử 100 ratings
      const newTotal = totalRatings + newRating;
      return newTotal / 101;
    },
  );

  async function rateProduct(stars) {
    addOptimisticRating(stars); // Optimistic: update rating ngay

    try {
      await fetch(`/api/products/${productId}/rate`, {
        method: "POST",
        body: JSON.stringify({ stars }),
      });
      setUserRating(stars);
      // Fetch real rating từ server
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      setRating(data.rating);
    } catch (error) {
      console.error("Failed to rate product:", error);
    }
  }

  return (
    <div>
      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            filled={star <= Math.round(optimisticRating)}
            onClick={() => rateProduct(star)}
          />
        ))}
      </div>
      <p>{optimisticRating.toFixed(1)} out of 5</p>
    </div>
  );
}
```

### Ví dụ với Counter

```jsx
import { useOptimistic, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const [optimisticCount, addOptimisticCount] = useOptimistic(
    count,
    (state, delta) => state + delta,
  );

  async function increment() {
    addOptimisticCount(1);
    await fetch("/api/count", { method: "POST" });
    setCount(optimisticCount);
  }

  async function decrement() {
    addOptimisticCount(-1);
    await fetch("/api/count", { method: "DELETE" });
    setCount(optimisticCount);
  }

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{optimisticCount}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi có actions có thể fail nhưng thường thành công (like, comment, add item)
- Khi muốn cải thiện UX bằng cách phản hồi ngay lập tức
- Khi có server-side mutations
- Khi có network latency nhưng muốn UI responsive
- Khi có actions có thể revert nếu thất bại

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi action không thể revert (ví dụ: payment, delete)
- Khi cần xác nhận từ server trước khi update UI
- Khi action thường thất bại
- Khi cần hiển thị loading state rõ ràng

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `useOptimistic`:

1. **UX kém**: Người dùng phải chờ đợi server phản hồi trước khi thấy UI update.

2. **Code phức tạp**: Phải tự implement optimistic UI pattern với manual state management.

3. **Khó revert**: Phải tự handle revert logic khi request thất bại.

4. **Race conditions**: Phải handle các race conditions khi có nhiều requests.

## Vấn đề được giải quyết / Problems Solved

### 1. Instant Feedback

Người dùng thấy phản hồi ngay lập tức mà không cần chờ server.

### 2. Automatic Revert

React tự động revert state nếu request thất bại.

### 3. Simple API

Dễ sử dụng hơn so với manual optimistic UI implementation.

### 4. Type Safety

Tốt với TypeScript, có thể type optimistic values.

## Ưu điểm / Advantages

1. **Better UX**: Instant feedback cho người dùng.
2. **Automatic revert**: Tự động revert khi thất bại.
3. **Simple API**: Dễ sử dụng.
4. **TypeScript support**: Tốt với TypeScript.
5. **Works with Server Actions**: Kết hợp tốt với React Server Actions.

## Nhược điểm / Disadvantages

1. **React 19+**: Chỉ hoạt động với React 19 trở lên.
2. **Not for critical actions**: Không nên dùng cho actions quan trọng (payment, delete).
3. **Potential inconsistency**: UI có thể không sync với server trong thời gian ngắn.
4. **Learning curve**: Cần hiểu về optimistic UI pattern.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm         | useOptimistic | Manual Optimistic UI | SWR Optimistic | TanStack Query Optimistic |
| ---------------- | ------------- | -------------------- | -------------- | ------------------------- |
| Automatic revert | Có            | Không                | Có             | Có                        |
| Simple API       | Có            | Không                | Có             | Có                        |
| React-managed    | Có            | Không                | Có             | Có                        |
| Type Safety      | Có            | Tùy                  | Có             | Có                        |
| Use case         | General       | Custom               | Data fetching  | Data fetching             |

## Best Practices / Các thực hành tốt

1. **Dùng cho actions thường thành công**:

   ```javascript
   // Tốt cho: like, comment, add item
   addOptimisticTodo(newTodo);
   ```

2. **Không dùng cho critical actions**:

   ```javascript
   // ❌ Không dùng cho: payment, delete
   // ✅ Dùng loading state thay thế
   ```

3. **Hiển thị status cho optimistic items**:

   ```javascript
   <li>
     {todo.text}
     {todo.status === "pending" && <span>(Saving...)</span>}
   </li>
   ```

4. **Handle errors properly**:

   ```javascript
   try {
     await sendRequest();
   } catch (error) {
     // React sẽ tự revert, nhưng có thể hiển thị error message
     showError("Failed to save");
   }
   ```

5. **Kết hợp với Server Actions**:
   ```javascript
   async function handleAction(formData) {
     addOptimistic(formData);
     await serverAction(formData);
   }
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Using for Critical Actions

```javascript
// ❌ Sai - không nên dùng cho payment
addOptimisticPayment(payment);

// ✅ Đúng - dùng loading state
setIsProcessing(true);
await processPayment(payment);
setIsProcessing(false);
```

### 2. Not Showing Status

```javascript
// ❌ Không rõ trạng thái
addOptimisticTodo(todo);

// ✅ Hiển thị status
const optimisticTodo = { ...todo, status: "saving" };
addOptimisticTodo(optimisticTodo);
```

### 3. Ignoring Errors

```javascript
// ❌ Không handle error
addOptimisticTodo(todo);
await saveTodo(todo);

// ✅ Handle error
try {
  addOptimisticTodo(todo);
  await saveTodo(todo);
} catch (error) {
  // React tự revert, nhưng có thể hiển thị error
}
```

### 4. Multiple Optimistic Updates

```javascript
// ❌ Cẩn thận với multiple updates
addOptimisticTodo(todo1);
addOptimisticTodo(todo2);

// ✅ Handle properly
await Promise.all([saveTodo(todo1), saveTodo(todo2)]);
```

## Performance Considerations / Yếu tố hiệu suất

1. **Reduced perceived latency**: UI update ngay lập tức, giảm cảm giác chờ đợi.

2. **Network efficiency**: Có thể batch multiple requests.

3. **Memory overhead**: Có thể có memory overhead do storing optimistic state.

4. **Re-render cost**: Optimistic update có thể trigger re-render.

## Browser Support / Hỗ trợ trình duyệt

`useOptimistic` hoạt động trên tất cả trình duyệt hỗ trợ React 19+.

## Câu hỏi phỏng vấn / Interview Questions

1. `useOptimistic` là gì? Khi nào nên dùng?

2. `useOptimistic` hoạt động như thế nào?

3. Optimistic UI pattern là gì? Lợi ích là gì?

4. `useOptimistic` tự revert khi thất bại như thế nào?

5. Khi nào KHÔNG nên dùng `useOptimistic`?

6. Sự khác biệt giữa `useOptimistic` và manual optimistic UI?

7. `useOptimistic` có hoạt động với SSR không?

8. Làm thế nào để hiển thị status cho optimistic items?

9. `useOptimistic` có hoạt động với React 18 không?

10. Làm thế nào để handle errors với `useOptimistic`?

11. Có thể dùng `useOptimistic` cho multiple updates không?

12. `useOptimistic` kết hợp với Server Actions như thế nào?

13. Làm thế nào để debug optimistic updates?

14. `useOptimistic` có hoạt động với TypeScript không?

15. Làm thế nào để test components với `useOptimistic`?

## Tài liệu tham khảo / References

- [useOptimistic - React Official Docs](https://react.dev/reference/react/useOptimistic)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [Optimistic UI - React Docs](https://react.dev/learn/keeping-components-pure)

---

_Last updated: 2026-01-31_
