# useEffectEvent / useEffectEvent

## Định nghĩa / Definition

[`useEffectEvent`](https://react.dev/reference/react/useEffectEvent) là một hook experimental trong React cho phép bạn tạo **non-reactive event handlers** - các event handlers không gây re-render khi dependencies thay đổi. Nó giúp giải quyết vấn đề "stale closure" trong `useEffect`.

## Cú pháp / Syntax

```javascript
const eventHandler = useEffectEvent(callback);
```

## Tham số / Parameters

| Tham số    | Kiểu       | Mô tả                                           |
| ---------- | ---------- | ----------------------------------------------- |
| `callback` | `function` | Function callback muốn tạo thành event handler. |

## Giá trị trả về / Return Value

| Giá trị        | Kiểu       | Mô tả                                                                               |
| -------------- | ---------- | ----------------------------------------------------------------------------------- |
| `eventHandler` | `function` | Event handler non-reactive, luôn có access đến giá trị mới nhất của props và state. |

## Cách hoạt động / How it Works

### Non-Reactive Event Handlers

`useEffectEvent` tạo một event handler:

- **Không reactive**: Không gây re-render khi dependencies thay đổi
- **Always fresh**: Luôn có access đến giá trị mới nhất của props và state
- **Stable reference**: Reference không thay đổi giữa các renders

### Solving Stale Closures

Vấn đề stale closure trong `useEffect`:

```javascript
// ❌ Stale closure - version luôn là giá trị cũ
useEffect(() => {
  const interval = setInterval(() => {
    console.log(version); // Stale!
  }, 1000);
  return () => clearInterval(interval);
}, [version]);
```

Giải pháp với `useEffectEvent`:

```javascript
// ✅ Fresh closure - luôn có giá trị mới nhất
const onTick = useEffectEvent(() => {
  console.log(version); // Fresh!
});

useEffect(() => {
  const interval = setInterval(() => onTick(), 1000);
  return () => clearInterval(interval);
}, []); // Không cần dependency
```

### Comparison with useCallback

| Đặc điểm     | useEffectEvent               | useCallback         |
| ------------ | ---------------------------- | ------------------- |
| Reactive     | Không                        | Có                  |
| Re-render    | Không gây                    | Có thể gây          |
| Dependencies | Không cần                    | Cần                 |
| Use case     | Event handlers trong effects | General memoization |

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { useState, useEffect, useEffectEvent } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [version, setVersion] = useState(1);

  const onTick = useEffectEvent(() => {
    console.log("Version:", version, "Count:", count);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      onTick(); // Luôn có giá trị mới nhất
    }, 1000);
    return () => clearInterval(interval);
  }, []); // Không cần dependencies

  return (
    <div>
      <p>Count: {count}</p>
      <p>Version: {version}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={() => setVersion((v) => v + 1)}>Update Version</button>
    </div>
  );
}
```

### Ví dụ với Page View Tracking

```jsx
import { useEffect, useEffectEvent } from "react";

function PageViewTracker({ userId, pageName }) {
  const trackPageView = useEffectEvent(() => {
    analytics.track("page_view", {
      userId,
      page: pageName,
      timestamp: Date.now(),
    });
  });

  useEffect(() => {
    trackPageView();
  }, []); // Không cần dependencies

  return <div>Page: {pageName}</div>;
}
```

### Ví dụ với Keyboard Shortcuts

```jsx
import { useEffect, useEffectEvent } from "react";

function KeyboardShortcuts({ onSave, onUndo, onRedo }) {
  const handleKeyDown = useEffectEvent((e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "s":
          e.preventDefault();
          onSave();
          break;
        case "z":
          e.preventDefault();
          if (e.shiftKey) {
            onRedo();
          } else {
            onUndo();
          }
          break;
      }
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []); // Không cần dependencies

  return <div>Use Ctrl+S to save, Ctrl+Z to undo</div>;
}
```

### Ví dụ với WebSocket

```jsx
import { useState, useEffect, useEffectEvent } from "react";

function ChatRoom({ roomId, userId }) {
  const [messages, setMessages] = useState([]);

  const handleMessage = useEffectEvent((event) => {
    const message = JSON.parse(event.data);
    if (message.roomId === roomId) {
      setMessages((prev) => [...prev, message]);
    }
  });

  useEffect(() => {
    const ws = new WebSocket(`wss://example.com/chat/${roomId}`);
    ws.addEventListener("message", handleMessage);
    return () => ws.close();
  }, [roomId]); // Chỉ cần roomId

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>{msg.text}</div>
      ))}
    </div>
  );
}
```

### Ví dụ với Animation

```jsx
import { useState, useEffect, useEffectEvent } from "react";

function AnimatedBox({ color, duration }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = useEffectEvent(() => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), duration);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      animate(); // Luôn có giá trị duration mới nhất
    }, duration * 2);
    return () => clearInterval(interval);
  }, []); // Không cần dependencies

  return (
    <div
      style={{
        backgroundColor: color,
        transition: `all ${duration}ms`,
        transform: isAnimating ? "scale(1.2)" : "scale(1)",
      }}
    >
      Animated Box
    </div>
  );
}
```

### Ví dụ với Scroll Tracking

```jsx
import { useEffect, useEffectEvent } from "react";

function ScrollTracker({ onScrollThreshold }) {
  const handleScroll = useEffectEvent(() => {
    const scrollPercent =
      window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (scrollPercent >= 0.9) {
      onScrollThreshold();
    }
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Không cần dependencies

  return <div>Scroll to bottom to trigger callback</div>;
}
```

### Ví dụ với Resize Observer

```jsx
import { useEffect, useEffectEvent } from "react";

function ResponsiveContainer({ onResize }) {
  const handleResize = useEffectEvent((entries) => {
    for (const entry of entries) {
      onResize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    }
  });

  useEffect(() => {
    const observer = new ResizeObserver(handleResize);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []); // Không cần dependencies

  return <div>Resize the window to see callback</div>;
}
```

## Khi nào nên dùng / When to Use

- Khi cần event handlers trong `useEffect` với dependencies thay đổi
- Khi muốn tránh stale closures trong effects
- Khi cần access đến props/state mới nhất trong intervals, timeouts, event listeners
- Khi muốn giảm số lần effect chạy (không cần dependencies)

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi không có vấn đề stale closures
- Khi có thể dùng `useCallback` với dependencies
- Khi event handler không cần access đến props/state
- Khi hook chưa stable (experimental)

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `useEffectEvent`:

1. **Stale closures**: Event handlers trong effects có thể dùng giá trị cũ.

2. **Many dependencies**: Phải thêm nhiều dependencies vào `useEffect`, gây nhiều re-runs.

3. **Complex workarounds**: Phải dùng ref hoặc các pattern phức tạp để giải quyết stale closures.

4. **Performance issues**: Nhiều effect re-runs gây performance issues.

## Vấn đề được giải quyết / Problems Solved

### 1. Stale Closures in Effects

Event handlers luôn có access đến giá trị mới nhất của props và state.

### 2. Reduced Effect Dependencies

Không cần thêm dependencies cho event handlers.

### 3. Simplified Code

Code đơn giản hơn so với các workarounds khác.

### 4. Better Performance

Ít effect re-runs hơn.

## Ưu điểm / Advantages

1. **Solves stale closures**: Luôn có giá trị mới nhất.
2. **No dependencies**: Không cần dependencies cho event handlers.
3. **Simple API**: Dễ sử dụng.
4. **Better performance**: Ít effect re-runs.
5. **TypeScript support**: Tốt với TypeScript.

## Nhược điểm / Disadvantages

1. **Experimental**: Hook vẫn experimental, có thể thay đổi.
2. **Limited use case**: Chỉ dùng được cho event handlers trong effects.
3. **Not widely known**: Ít người biết về hook này.
4. **React 19+**: Chỉ hoạt động với React 19 trở lên.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm              | useEffectEvent | useCallback | useRef         | Function in deps |
| --------------------- | -------------- | ----------- | -------------- | ---------------- |
| Solves stale closures | Có             | Không       | Có             | Không            |
| Re-render             | Không gây      | Có thể gây  | Không          | Có thể gây       |
| Complexity            | Đơn giản       | Đơn giản    | Phức tạp       | Đơn giản         |
| Use case              | Event handlers | General     | Mutable values | General          |

## Best Practices / Các thực hành tốt

1. **Dùng cho event handlers trong effects**:

   ```javascript
   const handler = useEffectEvent(() => {
     console.log(value);
   });
   useEffect(() => {
     window.addEventListener("click", handler);
   }, []);
   ```

2. **Không dùng cho general functions**:

   ```javascript
   // ❌ Không cần useEffectEvent
   const handleClick = () => console.log(value);

   // ✅ Dùng useEffectEvent cho effects
   const handler = useEffectEvent(() => console.log(value));
   useEffect(() => {
     window.addEventListener("click", handler);
   }, []);
   ```

3. **Kết hợp với useEffect**:

   ```javascript
   const handler = useEffectEvent(() => {
     // logic với giá trị mới nhất
   });
   useEffect(() => {
     // setup với handler
   }, []);
   ```

4. **Dùng cho intervals/timeouts**:
   ```javascript
   const onTick = useEffectEvent(() => {
     // logic với giá trị mới nhất
   });
   useEffect(() => {
     const interval = setInterval(onTick, 1000);
     return () => clearInterval(interval);
   }, []);
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Using Outside Effects

```javascript
// ❌ Sai - useEffectEvent chỉ dùng trong effects
const handler = useEffectEvent(() => console.log(value));
<button onClick={handler}>Click</button>;

// ✅ Đúng - dùng trong effects
const handler = useEffectEvent(() => console.log(value));
useEffect(() => {
  window.addEventListener("click", handler);
}, []);
```

### 2. Not Understanding Non-Reactive Nature

```javascript
// ❌ Sai - handler không reactive
const handler = useEffectEvent(() => console.log(value));
// value thay đổi không gây re-render

// ✅ Đúng - hiểu rằng handler không reactive
// Handler luôn có giá trị mới nhất khi được gọi
```

### 3. Using When Not Needed

```javascript
// ❌ Không cần - không có stale closure
useEffect(() => {
  console.log(value);
}, [value]);

// ✅ Dùng khi có stale closure
const handler = useEffectEvent(() => console.log(value));
useEffect(() => {
  setInterval(() => handler(), 1000);
}, []);
```

### 4. Experimental Hook Warning

```javascript
// ⚠️ Cảnh báo - hook vẫn experimental
import { useEffectEvent } from "react";
// Có thể thay đổi trong tương lai
```

## Performance Considerations / Yếu tố hiệu suất

1. **Reduced effect runs**: Ít effect re-runs hơn.

2. **No extra re-renders**: Event handlers không gây re-render.

3. **Memory overhead**: Có thể có memory overhead nhỏ.

4. **Best for intervals/timeouts**: Tối ưu cho intervals và timeouts.

## Browser Support / Hỗ trợ trình duyệt

`useEffectEvent` hoạt động trên tất cả trình duyệt hỗ trợ React 19+.

## Câu hỏi phỏng vấn / Interview Questions

1. `useEffectEvent` là gì? Khi nào nên dùng?

2. `useEffectEvent` hoạt động như thế nào?

3. Stale closure trong `useEffect` là gì? Làm thế nào để giải quyết?

4. `useEffectEvent` khác gì với `useCallback`?

5. Tại sao `useEffectEvent` không cần dependencies?

6. `useEffectEvent` có gây re-render không?

7. Khi nào nên dùng `useEffectEvent` thay vì `useCallback`?

8. `useEffectEvent` có hoạt động với React 18 không?

9. Làm thế nào để debug `useEffectEvent`?

10. `useEffectEvent` có hoạt động với SSR không?

11. Non-reactive event handler là gì?

12. Làm thế nào `useEffectEvent` giúp cải thiện performance?

13. Có thể nest `useEffectEvent` không?

14. `useEffectEvent` có hoạt động với TypeScript không?

15. Làm thế nào để test components với `useEffectEvent`?

## Tài liệu tham khảo / References

- [useEffectEvent - React Official Docs](https://react.dev/reference/react/useEffectEvent)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [You Might Not Need an Effect - React Docs](https://react.dev/learn/you-might-not-need-an-effect)

---

_Last updated: 2026-01-31_
