# useImperativeHandle / useImperativeHandle

## Định nghĩa / Definition

[`useImperativeHandle`](https://react.dev/reference/react/useImperativeHandle) là một hook trong React cho phép bạn **tùy chỉnh ref object** mà parent component nhận khi dùng `forwardRef`. Nó cho phép bạn expose các methods hoặc properties cụ thể thay vì expose toàn bộ component ref.

## Cú pháp / Syntax

```javascript
useImperativeHandle(ref, createHandle, dependencies?)
```

## Tham số / Parameters

| Tham số        | Kiểu             | Mô tả                                                       |
| -------------- | ---------------- | ----------------------------------------------------------- |
| `ref`          | Object           | Ref object nhận từ parent component (tạo bằng `forwardRef`) |
| `createHandle` | Function         | Function trả về handle object cần expose                    |
| `dependencies` | Array (optional) | List các giá trị mà handle phụ thuộc                        |

## Giá trị trả về / Return Value

Không có giá trị trả về.

## Cách hoạt động / How it Works

### forwardRef Pattern

`useImperativeHandle` phải được dùng với `forwardRef`:

```javascript
const MyInput = forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        /* focus logic */
      },
      reset: () => {
        /* reset logic */
      },
    }),
    [],
  );

  return <input />;
});
```

### Handle Object

`createHandle` function trả về object với các methods cần expose:

```javascript
createHandle: () => ({
  focus: () => {
    /* focus logic */
  },
  reset: () => {
    /* reset logic */
  },
});
```

### Dependency Array

| Dependency Array | Hành vi                                       |
| ---------------- | --------------------------------------------- |
| `[]` (empty)     | Handle object giữ nguyên qua các renders      |
| `[dep1, dep2]`   | Handle object mới khi dep1 hoặc dep2 thay đổi |

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { forwardRef, useImperativeHandle } from "react";

const MyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
      reset: () => {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      },
    }),
    [],
  );

  return <input ref={inputRef} {...props} />;
});

function Parent() {
  const inputRef = useRef(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
```

### Ví dụ với TypeScript

```tsx
import { forwardRef, useImperativeHandle } from "react";

interface MyInputHandle {
  focus: () => void;
  reset: () => void;
}

const MyInput = forwardRef<HTMLInputElement, MyInputHandle>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      reset: () => {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      },
    }),
    [],
  );

  return <input ref={inputRef} {...props} />;
});

function Parent() {
  const inputRef = useRef<MyInputHandle>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
```

### Ví dụ Modal Component

```jsx
const Modal = forwardRef((props, ref) => {
  const modalRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        if (modalRef.current) {
          modalRef.current.style.display = "flex";
        }
      },
      close: () => {
        if (modalRef.current) {
          modalRef.current.style.display = "none";
        }
      },
    }),
    [],
  );

  return (
    <div
      ref={modalRef}
      style={{
        display: "none",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
      }}
    >
      {props.children}
    </div>
  );
});

function App() {
  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current?.open();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal ref={modalRef}>
        <p>Modal content</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}
```

### Ví dụ Scrollable Component

```jsx
const ScrollableBox = forwardRef((props, ref) => {
  const boxRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      scrollToTop: () => {
        if (boxRef.current) {
          boxRef.current.scrollTop = 0;
        }
      },
      scrollToBottom: () => {
        if (boxRef.current) {
          boxRef.current.scrollTop = boxRef.current.scrollHeight;
        }
      },
      getScrollPosition: () => {
        if (boxRef.current) {
          return {
            top: boxRef.current.scrollTop,
            left: boxRef.current.scrollLeft,
          };
        }
        return null;
      },
    }),
    [],
  );

  return (
    <div ref={boxRef} style={{ height: "200px", overflow: "auto" }}>
      {props.children}
    </div>
  );
});
```

### Ví dụ Video Player

```jsx
const VideoPlayer = forwardRef((props, ref) => {
  const videoRef = useRef(null);

  useImperativeHandle(ref, () => ({
    play: () => {
      videoRef.current?.play();
    },
    pause: () => {
      videoRef.current?.pause();
    },
    seek: (time: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time;
      }
    },
    getCurrentTime: () => {
      return videoRef.current?.currentTime || 0;
    }
  }), []);

  return <video ref={videoRef} {...props} />;
});
```

## Khi nào nên dùng / When to Use

- Khi cần expose methods hoặc properties cho parent component
- Khi cần trigger component methods từ parent
- Khi cần access child component DOM elements hoặc internal state
- Khi tạo reusable components cần imperative APIs
- Khi cần control component behavior từ parent

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi component chỉ cần props và không cần imperative control
- Khi có thể dùng declarative patterns thay vì imperative
- Khi component không cần expose internal methods

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng `useImperativeHandle`, bạn sẽ gặp các vấn đề sau:

1. **Không thể expose methods**: Không có cách nào để expose component methods cho parent.

2. **Không thể control child component**: Parent không thể trigger child component methods.

3. **Phải dùng ref trực tiếp**: Parent phải access child component DOM elements hoặc internal state trực tiếp.

## Vấn đề được giải quyết / Problems Solved

### 1. Exposing Component Methods

`useImperativeHandle` cho phép expose component methods cho parent component một cách controlled.

### 2. Controlled APIs

Giúp tạo components với imperative APIs mà vẫn giữ React declarative patterns.

## Ưu điểm / Advantages

1. **Controlled exposure**: Tùy chỉnh methods hoặc properties cần expose.

2. **TypeScript support**: Tốt với TypeScript, có thể type handle object.

3. **Encapsulation**: Giữ nguyên component encapsulation trong khi expose methods.

## Nhược điểm / Disadvantages

1. **Imperative pattern**: Dùng imperative patterns có thể làm code khó hiểu.

2. **Coupling**: Tạo coupling giữa parent và child components.

3. **Overuse**: Dùng quá nhiều có thể làm code khó maintain.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm       | useImperativeHandle | useRef | Props |
| -------------- | ------------------- | ------ | ----- |
| Expose methods | Có                  | Không  | Có    |
| Type safety    | Có                  | Không  | Có    |
| Encapsulation  | Có                  | Không  | Không |

## Best Practices / Các thực hành tốt

1. **Dùng với forwardRef**:

   ```javascript
   const MyComponent = forwardRef((props, ref) => {
     useImperativeHandle(
       ref,
       () => ({
         /* handle */
       }),
       [],
     );
     return <div />;
   });
   ```

2. **Expose minimal API**:

   ```javascript
   useImperativeHandle(
     ref,
     () => ({
       // Chỉ expose methods cần thiết
       focus: () => {
         /* logic */
       },
     }),
     [],
   );
   ```

3. **Dùng TypeScript để type handle**:
   ```typescript
   interface MyComponentHandle {
     focus: () => void;
   }
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Not Using with forwardRef

```javascript
// ❌ Sai - không dùng forwardRef
function MyComponent({ ref }) {
  useImperativeHandle(
    ref,
    () => ({
      /* handle */
    }),
    [],
  );
  return <div />;
}

// ✅ Đúng - dùng forwardRef
const MyComponent = forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      /* handle */
    }),
    [],
  );
  return <div />;
});
```

### 2. Exposing Too Much

```javascript
// ❌ Sai - expose quá nhiều methods
useImperativeHandle(
  ref,
  () => ({
    // 100 methods
  }),
  [],
);

// ✅ Đúng - chỉ expose methods cần thiết
useImperativeHandle(
  ref,
  () => ({
    focus: () => {
      /* logic */
    },
  }),
  [],
);
```

## Performance Considerations / Yếu tố hiệu suất

1. **Minimal overhead**: Có rất ít overhead.

2. **Handle object caching**: Handle object được cache khi dependencies không thay đổi.

## Câu hỏi phỏng vấn / Interview Questions

1. `useImperativeHandle` là gì? Khi nào nên dùng?

2. `useImperativeHandle` hoạt động như thế nào?

3. Tại sao phải dùng `forwardRef` với `useImperativeHandle`?

4. Làm thế nào để expose methods cho parent component?

5. Làm thế nào để type `useImperativeHandle` với TypeScript?

6. Làm thế nào để access child component methods?

7. Làm thế nào để control child component từ parent?

8. Sự khác biệt giữa `useImperativeHandle` và `useRef`?

9. Làm thế nào để expose minimal API?

10. Làm thế nào để debug `useImperativeHandle`?

## Tài liệu tham khảo / References

- [useImperativeHandle - React Official Docs](https://react.dev/reference/react/useImperativeHandle)
- [Manipulating the DOM with Refs - React Official Docs](https://react.dev/learn/manipulating-the-dom-with-refs)

---

_Last updated: 2026-01-31_
