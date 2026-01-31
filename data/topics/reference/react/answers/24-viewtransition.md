# ViewTransition / ViewTransition

## Định nghĩa / Definition

[`ViewTransition`](https://react.dev/reference/react/ViewTransition) là một experimental component trong React cho phép bạn tạo **smooth view transitions** khi chuyển đổi giữa các views hoặc components. Nó tận dụng View Transitions API của trình duyệt để tạo animations mượt mà.

## Cú pháp / Syntax

```jsx
<ViewTransition>{/* children */}</ViewTransition>
```

## Tham số / Parameters

| Tham số    | Kiểu | Mô tả                                    |
| ---------- | ---- | ---------------------------------------- |
| `children` | Node | Các elements muốn apply view transition. |

## Giá trị trả về / Return Value

Trả về children với view transition effects applied.

## Cách hoạt động / How it Works

### Browser View Transitions API

`ViewTransition` tận dụng **View Transitions API** của trình duyệt:

- Tạo snapshots của old và new views
- Animate giữa snapshots
- Automatic cleanup

### Transition Lifecycle

```
Start Transition → Capture Old View → Capture New View → Animate → Complete
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
import { ViewTransition } from "react";

function App() {
  const [view, setView] = useState("home");

  return (
    <ViewTransition>
      {view === "home" && <HomePage />}
      {view === "about" && <AboutPage />}
      <button onClick={() => setView(view === "home" ? "about" : "home")}>
        Switch View
      </button>
    </ViewTransition>
  );
}
```

### Ví dụ với Navigation

```jsx
import { ViewTransition } from "react";

function Navigation() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <ViewTransition>
      <nav>
        <button onClick={() => setCurrentPage("home")}>Home</button>
        <button onClick={() => setCurrentPage("about")}>About</button>
        <button onClick={() => setCurrentPage("contact")}>Contact</button>
      </nav>
      <main>
        {currentPage === "home" && <HomePage />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "contact" && <ContactPage />}
      </main>
    </ViewTransition>
  );
}
```

### Ví dụ với CSS Animations

```jsx
import { ViewTransition } from "react";

function AnimatedView() {
  const [show, setShow] = useState(false);

  return (
    <ViewTransition>
      <div>
        <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>
        {show && (
          <div className="animated-content">
            This content will animate in/out
          </div>
        )}
      </div>
    </ViewTransition>
  );
}
```

### Ví dụ với Image Gallery

```jsx
import { ViewTransition } from "react";

function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
  ];

  return (
    <ViewTransition>
      <div className="gallery">
        <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} />
        <div className="controls">
          <button
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentIndex((i) => Math.min(images.length - 1, i + 1))
            }
            disabled={currentIndex === images.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </ViewTransition>
  );
}
```

### Ví dụ với Modal

```jsx
import { ViewTransition } from "react";

function Modal({ isOpen, onClose, children }) {
  return (
    <ViewTransition>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {children}
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      )}
    </ViewTransition>
  );
}
```

### Ví dụ với Tab Switching

```jsx
import { ViewTransition } from "react";

function TabContainer() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <ViewTransition>
      <div className="tabs">
        <button
          className={activeTab === "tab1" ? "active" : ""}
          onClick={() => setActiveTab("tab1")}
        >
          Tab 1
        </button>
        <button
          className={activeTab === "tab2" ? "active" : ""}
          onClick={() => setActiveTab("tab2")}
        >
          Tab 2
        </button>
        <button
          className={activeTab === "tab3" ? "active" : ""}
          onClick={() => setActiveTab("tab3")}
        >
          Tab 3
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "tab1" && <Tab1Content />}
        {activeTab === "tab2" && <Tab2Content />}
        {activeTab === "tab3" && <Tab3Content />}
      </div>
    </ViewTransition>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi cần smooth transitions giữa views
- Khi muốn tạo animations cho view changes
- Khi cần page transitions trong SPA
- Khi muốn improve UX với animations

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi không cần animations
- Khi browser không hỗ trợ View Transitions API
- Khi cần custom animation libraries

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng ViewTransition:

1. **Manual animations**: Phải tự implement animations với CSS hoặc libraries.

2. **Complex code**: Code phức tạp hơn để handle transitions.

3. **No browser optimization**: Không tận dụng được browser's native transitions.

## Vấn đề được giải quyết / Problems Solved

### 1. Smooth Transitions

Tạo smooth transitions giữa views.

### 2. Browser Native

Tận dụng browser's native View Transitions API.

### 3. Simple API

Dễ sử dụng với cú pháp đơn giản.

## Ưu điểm / Advantages

1. **Browser native**: Tận dụng browser's native API.

2. **Smooth animations**: Tạo smooth transitions.

3. **Simple API**: Dễ sử dụng.

4. **Performance**: Browser-optimized animations.

## Nhược điểm / Disadvantages

1. **Browser support**: Không phải tất cả trình duyệt hỗ trợ.

2. **Experimental**: Component vẫn experimental.

3. **Limited control**: Ít control hơn so với custom animations.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm        | ViewTransition | Framer Motion | CSS Transitions |
| --------------- | -------------- | ------------- | --------------- |
| Browser native  | Có             | Không         | Có              |
| Simple API      | Có             | Có            | Có              |
| Performance     | Tốt            | Tốt           | Tốt             |
| Browser support | Hạn chế        | Tốt           | Tốt             |
| Flexibility     | Trung bình     | Tốt           | Trung bình      |

## Best Practices / Các thực hành tốt

1. **Dùng cho view transitions**:

   ```jsx
   <ViewTransition>
     {currentView === "home" && <Home />}
     {currentView === "about" && <About />}
   </ViewTransition>
   ```

2. **Kết hợp với CSS**:

   ```jsx
   ::view-transition-old(root) {
     animation: fade-out 0.3s ease-out;
   }
   ::view-transition-new(root) {
     animation: fade-in 0.3s ease-in;
   }
   ```

3. **Handle browser support**:
   ```jsx
   if ("startViewTransition" in document) {
     return <ViewTransition>{children}</ViewTransition>;
   }
   return <>{children}</>;
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Not Checking Browser Support

```jsx
// ❌ Không check browser support
<ViewTransition>
  <Content />
</ViewTransition>;

// ✅ Check browser support
if ("startViewTransition" in document) {
  return (
    <ViewTransition>
      <Content />
    </ViewTransition>
  );
}
return <Content />;
```

### 2. Using When Not Needed

```jsx
// ❌ Không cần ViewTransition
<ViewTransition>
  <div>Static content</div>
</ViewTransition>

// ✅ Đúng - chỉ cần div
<div>Static content</div>
```

## Performance Considerations / Yếu tố hiệu suất

1. **Browser optimized**: Animations được browser optimize.

2. **GPU accelerated**: Sử dụng GPU cho animations.

3. **Minimal overhead**: Có overhead nhỏ.

## Browser Support / Hỗ trợ trình duyệt

ViewTransition hoạt động trên các trình duyệt hỗ trợ View Transitions API:

- Chrome 111+
- Edge 111+
- Safari (partial support)

## Câu hỏi phỏng vấn / Interview Questions

1. ViewTransition là gì? Khi nào nên dùng?

2. ViewTransition hoạt động như thế nào?

3. View Transitions API là gì?

4. Làm thế nào ViewTransition tạo smooth transitions?

5. ViewTransition có hoạt động với SSR không?

6. Làm thế nào để handle browser support?

7. ViewTransition có hoạt động với React 18 không?

8. Làm thế nào để test components với ViewTransition?

9. ViewTransition có hoạt động với TypeScript không?

10. Sự khác biệt giữa ViewTransition và CSS transitions?

## Tài liệu tham khảo / References

- [ViewTransition - React Official Docs](https://react.dev/reference/react/ViewTransition)
- [View Transitions API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)

---

_Last updated: 2026-01-31_
