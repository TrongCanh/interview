# createPortal / createPortal

## Định nghĩa / Definition

[`createPortal`](https://react.dev/reference/react-dom/createPortal) là một API trong React-DOM cho phép bạn **render một component vào một DOM node khác** với parent component. Portal rất hữu ích cho modals, tooltips, dropdowns, và các UI elements cần render outside component hierarchy.

## Cú pháp / Syntax

```javascript
const portal = createPortal(children, containerNode, key?);
```

## Tham số / Parameters

| Tham số         | Kiểu                 | Mô tả                                    |
| --------------- | -------------------- | ---------------------------------------- |
| `children`      | `ReactNode`          | React element(s) muốn render vào portal. |
| `containerNode` | `Element`            | DOM element nơi children sẽ được render. |
| `key`           | `string` \| `number` | (Optional) Unique key cho portal.        |

## Giá trị trả về / Return Value

| Giá trị  | Kiểu          | Mô tả                                      |
| -------- | ------------- | ------------------------------------------ |
| `portal` | `ReactPortal` | Portal object với method để remove portal. |

## Cách hoạt động / How it Works

### Portal Rendering

Portal render children vào một DOM node khác với parent component:

```
Component Tree:
  App
    └── Modal
        └── createPortal
            └── ModalContent

DOM Tree:
  <div id="root">
    <div id="modal-container"> ← Portal renders here
      <div class="modal-content"> ← Content rendered here
      </div>
    </div>
  </div>
```

### Event Bubbling

Events từ portal content sẽ bubble lên đến container node:

```
Portal Content (click) → Container Node → Document
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { createPortal } from "react-dom";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const portal = createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">{children}</div>
    </div>,
    document.body,
  );

  return portal;
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1>Modal Content</h1>
        <p>This is rendered in a portal!</p>
      </Modal>
    </div>
  );
}
```

### Ví dụ với Tooltip

```jsx
import { createPortal } from "react-dom";

function Tooltip({ children, text }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const portal = createPortal(
    <div className="tooltip" style={{ left: position.x, top: position.y }}>
      {text}
    </div>,
    document.body,
  );

  return (
    <div onMouseMove={handleMouseMove}>
      {children}
      {portal}
    </div>
  );
}

function App() {
  return (
    <div>
      <Tooltip text="This is a tooltip!">Hover over me</Tooltip>
    </div>
  );
}
```

### Ví dụ với Dropdown

```jsx
import { createPortal, useState, useRef, useEffect } from "react";

function Dropdown({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const portal = createPortal(
    <div ref={dropdownRef} className="dropdown-menu">
      {isOpen && (
        <ul>
          {options.map((option) => (
            <li key={option.value} onClick={() => onSelect(option.value)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>,
    document.body,
  );

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Dropdown</button>
      {portal}
    </div>
  );
}
```

### Ví dụ với Notification

```jsx
import { createPortal, useEffect } from "react";

function Notification({ message, duration = 3000 }) {
  useEffect(() => {
    const portal = createPortal(
      <div className="notification">{message}</div>,
      document.body,
    );

    setTimeout(() => {
      portal.remove();
    }, duration);
  }, [message, duration]);

  return null;
}

function App() {
  const [notification, setNotification] = useState(null);

  return (
    <div>
      <button onClick={() => setNotification("Hello!")}>
        Show Notification
      </button>
      {notification && <Notification message={notification} />}
    </div>
  );
}
```

### Ví dụ với Multiple Portals

```jsx
import { createPortal } from "react-dom";

function App() {
  const modalPortal = createPortal(
    <div className="modal">Modal Content</div>,
    document.getElementById("modal-container"),
  );

  const tooltipPortal = createPortal(
    <div className="tooltip">Tooltip Content</div>,
    document.body,
  );

  return (
    <div>
      <div id="modal-container"></div>
      {modalPortal}
      {tooltipPortal}
    </div>
  );
}
```

### Ví dụ với Z-Index Management

```jsx
import { createPortal } from "react-dom";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const portal = createPortal(
    <div className="modal-overlay" style={{ zIndex: 9999 }} onClick={onClose}>
      <div className="modal-content" style={{ zIndex: 10000 }}>
        {children}
      </div>
    </div>,
    document.body,
  );

  return portal;
}
```

### Ví dụ với Animation

```jsx
import { createPortal, useEffect, useState } from "react";

function AnimatedModal({ isOpen, onClose, children }) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const portal = createPortal(
    <div className={`modal-overlay ${isAnimating ? "animating" : ""}`}>
      <div className={`modal-content ${isAnimating ? "entering" : ""}`}>
        {children}
      </div>
    </div>,
    document.body,
  );

  return portal;
}
```

## Khi nào nên dùng / When to Use

- Khi cần render components outside parent hierarchy
- Khi làm việc với modals, tooltips, dropdowns
- Khi cần escape overflow/clip của parent container
- Khi cần render vào fixed position elements
- Khi cần z-index management

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi component hierarchy đơn giản
- Khi không cần render outside parent
- Khi có thể render trực tiếp trong parent

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `createPortal`:

1. **Hierarchy constraints**: Không thể render outside parent component.

2. **Overflow/clip issues**: Components bị clip bởi parent container.

3. **Z-index issues**: Khó manage z-index cho overlays.

4. **Complex workarounds**: Phải dùng các workarounds phức tạp.

## Vấn đề được giải quyết / Problems Solved

### 1. Render Outside Hierarchy

Render components vào bất kỳ DOM node.

### 2. Escape Overflow/Clip

Không bị ảnh hưởng bởi parent's overflow/clip.

### 3. Z-Index Management

Dễ manage z-index cho overlays.

### 4. Simple API

Dễ sử dụng với cú pháp đơn giản.

## Ưu điểm / Advantages

1. **Flexible rendering**: Render vào bất kỳ DOM node.

2. **Event bubbling**: Events vẫn bubble đúng.

3. **Simple API**: Dễ sử dụng.

4. **TypeScript support**: Tốt với TypeScript.

5. **Cleanup**: Dễ cleanup với `portal.remove()`.

## Nhược điểm / Disadvantages

1. **Complex debugging**: Khó debug hơn với components render trực tiếp.

2. **Event handling**: Events bubble đến container, có thể gây confusion.

3. **Memory overhead**: Có memory overhead cho portal nodes.

4. **SSR considerations**: Cần special handling cho SSR.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm          | createPortal | render props | Conditional rendering |
| ----------------- | ------------ | ------------ | --------------------- |
| Outside hierarchy | Có           | Không        | Không                 |
| Event bubbling    | Có           | Không        | Có                    |
| Simple API        | Có           | Không        | Có                    |
| Z-index control   | Có           | Không        | Không                 |

## Best Practices / Các thực hành tốt

1. **Cleanup portals**:

   ```jsx
   const portal = createPortal(children, container);
   return portal;

   // Cleanup khi component unmount
   useEffect(() => {
     return () => portal.remove();
   }, []);
   ```

2. **Use unique keys**:

   ```jsx
   createPortal(children, container, "unique-key");
   ```

3. **Manage z-index**:

   ```jsx
   <div style={{ zIndex: 9999 }}>{portal}</div>
   ```

4. **Handle events properly**:
   ```jsx
   // Events bubble đến container
   const portal = createPortal(
     <div onClick={handleClick}>{/* content */}</div>,
     container,
   );
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Not Cleaning Up

```jsx
// ❌ Sai - không cleanup
function Modal() {
  const portal = createPortal(children, container);
  return portal;
}

// ✅ Đúng - cleanup
function Modal() {
  const portal = createPortal(children, container);
  useEffect(() => {
    return () => portal.remove();
  }, []);
  return portal;
}
```

### 2. Forgetting Event Bubbling

```jsx
// ❌ Sai - không hiểu event bubbling
function Modal({ onClose }) {
  const portal = createPortal(
    <div onClick={onClose}>{/* onClick sẽ bubble đến container */}</div>,
    container,
  );
}

// ✅ Đúng - hiểu event bubbling
function Modal({ onClose }) {
  const portal = createPortal(
    <div onClick={onClose}>{/* onClick sẽ bubble đến container */}</div>,
    container,
  );
}
```

### 3. Using Wrong Container

```jsx
// ❌ Sai - container không tồn tại
const portal = createPortal(children, document.getElementById("non-existent"));

// ✅ Đúng - kiểm tra container
const container = document.getElementById("modal-container");
if (container) {
  const portal = createPortal(children, container);
}
```

### 4. Ignoring Z-Index

```jsx
// ❌ Không manage z-index
const portal = createPortal(
  <div className="modal">{/* Có bị cover bởi other elements */}</div>,
  container,
);

// ✅ Đúng - manage z-index
const portal = createPortal(
  <div className="modal" style={{ zIndex: 9999 }}>
    {/* Hiển thị trên tất cả elements */}
  </div>,
  container,
);
```

## Performance Considerations / Yếu tố hiệu suất

1. **Minimal overhead**: Có overhead nhỏ cho portal nodes.

2. **Event bubbling**: Events bubble như bình thường.

3. **Memory usage**: Có memory overhead cho portal nodes.

4. **Cleanup importance**: Quan trọng cleanup để tránh memory leaks.

## Browser Support / Hỗ trợ trình duyệt

`createPortal` hoạt động trên tất cả trình duyệt hỗ trợ React.

## Câu hỏi phỏng vấn / Interview Questions

1. `createPortal` là gì? Khi nào nên dùng?

2. `createPortal` hoạt động như thế nào?

3. Portal khác gì với render props?

4. Events từ portal hoạt động như thế nào?

5. Làm thế nào để cleanup portal?

6. `createPortal` có hoạt động với SSR không?

7. Làm thế nào `createPortal` giúp với z-index management?

8. `createPortal` có hoạt động với TypeScript không?

9. Làm thế nào để test components với portals?

10. Khi nào nên dùng `createPortal` thay vì render props?

11. `createPortal` có hoạt động với React 18 không?

12. Làm thế nào `createPortal` giải quyết overflow issues?

13. Làm thế nào để manage multiple portals?

14. `createPortal` có hoạt động với class components không?

15. Làm thế nào `createPortal` giúp với modal implementations?

## Tài liệu tham khảo / References

- [createPortal - React Official Docs](https://react.dev/reference/react-dom/createPortal)
- [Portals - React Docs](https://react.dev/learn/rendering-elements-in-portals)
- [React-DOM - React Docs](https://react.dev/reference/react-dom)

---

_Last updated: 2026-01-31_
