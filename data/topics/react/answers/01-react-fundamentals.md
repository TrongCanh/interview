# 1. React Fundamentals / Cơ bản về React

## React là gì? Tại sao dùng React?

### Trả lời / Answer:

**React là gì?**

React là một thư viện JavaScript mã nguồn mở được phát triển bởi Facebook (Meta) để xây dựng giao diện người dùng (User Interfaces). React được thiết kế đặc biệt cho việc xây dựng các ứng dụng web đơn trang (Single Page Applications - SPAs) với khả năng tạo ra các component tái sử dụng.

React là một thư viện (library), không phải framework, vì nó chỉ tập trung vào lớp view (UI) của ứng dụng, không cung cấp giải pháp hoàn chỉnh cho routing, state management, HTTP requests, v.v. - những thứ này cần các thư viện bổ sung.

### Tại sao dùng React?

1. **Component-Based Architecture / Kiến trúc dựa trên Component:**
   - UI được chia nhỏ thành các component độc lập, tái sử dụng
   - Dễ bảo trì và mở rộng ứng dụng
   - Code tổ chức rõ ràng, dễ hiểu

2. **Virtual DOM / DOM ảo:**
   - Tối ưu hiệu suất rendering bằng cách so sánh Virtual DOM với Real DOM
   - Chỉ cập nhật những phần thay đổi thực tế (diffing algorithm)
   - Giảm thiểu thao tác với DOM tốn kém

3. **Declarative Programming / Lập trình khai báo:**
   - Mô tả "cái gì" cần hiển thị thay vì "làm thế nào" để hiển thị
   - Code dễ đọc, dễ debug
   - Dự đoán được kết quả

4. **Unidirectional Data Flow / Luồng dữ liệu một chiều:**
   - Dữ liệu chảy từ trên xuống (top-down)
   - Dễ theo dõi luồng dữ liệu trong ứng dụng
   - Giảm lỗi do state phức tạp

5. **Large Ecosystem & Community / Hệ sinh thái lớn:**
   - Nhiều thư viện bổ sung: React Router, Redux, React Query, v.v.
   - Cộng đồng lớn, tài liệu phong phú
   - Hỗ trợ từ Facebook và các công ty lớn

6. **JSX Syntax / Cú pháp JSX:**
   - Viết UI giống HTML trong JavaScript
   - Tăng năng suất lập trình
   - Type checking tốt với TypeScript

7. **Hooks API:**
   - Quản lý state và side effects trong functional components
   - Tái sử dụng logic qua custom hooks
   - Code ngắn gọn, dễ hiểu hơn class components

### Ví dụ thực tế / Practical Example:

```jsx
// Component đơn giản trong React
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Sử dụng component
function App() {
  return (
    <div>
      <Welcome name="React" />
      <Welcome name="JavaScript" />
      <Welcome name="World" />
    </div>
  );
}
```

---

## Virtual DOM là gì? Nó hoạt động như thế nào?

### Trả lời / Answer:

**Virtual DOM là gì?**

Virtual DOM (VDOM) là một bản sao nhẹ (lightweight copy) của Real DOM (Document Object Model) được lưu trữ trong bộ nhớ. Nó là một đối tượng JavaScript thể hiện cấu trúc của UI.

### Cách hoạt động của Virtual DOM:

1. **Initial Render / Render lần đầu:**
   - React tạo Virtual DOM dựa trên JSX
   - Tạo Real DOM từ Virtual DOM
   - Hiển thị lên trình duyệt

2. **State/Props Change / Khi state hoặc props thay đổi:**
   - React tạo một Virtual DOM mới
   - So sánh Virtual DOM mới với Virtual DOM cũ (Reconciliation)
   - Tìm ra các thay đổi (diffing algorithm)

3. **Calculate Minimum Changes / Tính toán thay đổi tối thiểu:**
   - Xác định phần nào của Real DOM cần cập nhật
   - Tạo danh sách các thay đổi cần thực hiện

4. **Update Real DOM / Cập nhật Real DOM:**
   - Chỉ cập nhật những phần đã thay đổi
   - Batch updates để tối ưu hiệu suất

### Tại sao Virtual DOM nhanh hơn?

- **DOM operations tốn kém:** Truy cập và thay đổi Real DOM là một trong những thao tác chậm nhất trong JavaScript
- **VDOM trong bộ nhớ:** So sánh các đối tượng JavaScript nhanh hơn nhiều so với thao tác DOM
- **Batching:** Gom nhiều thay đổi thành một lần cập nhật
- **Efficient Diffing:** Sử dụng thuật toán heuristic để tối ưu việc tìm thay đổi

### Ví dụ thực tế / Practical Example:

```jsx
// Virtual DOM minh họa
// Virtual DOM (đối tượng JavaScript)
const vdom1 = {
  type: "div",
  props: {
    className: "container",
    children: [
      { type: "h1", props: { children: "Hello" } },
      { type: "p", props: { children: "World" } },
    ],
  },
};

// Sau khi state thay đổi
const vdom2 = {
  type: "div",
  props: {
    className: "container",
    children: [
      { type: "h1", props: { children: "Hello Updated" } }, // Thay đổi
      { type: "p", props: { children: "World" } }, // Không đổi
    ],
  },
};

// React so sánh và chỉ cập nhật thẻ h1
// thay vì render lại cả div
```

---

## JSX là gì?

### Trả lời / Answer:

**JSX (JavaScript XML)** là một cú pháp mở rộng của JavaScript cho phép viết code giống HTML trong JavaScript. JSX không phải là HTML thực sự - nó là cú pháp đường sugar (syntactic sugar) cho `React.createElement()`.

### Đặc điểm của JSX:

1. **HTML-like Syntax / Cú pháp giống HTML:**
   - Viết UI quen thuộc như HTML
   - Dễ đọc và hiểu

2. **Compiled to JavaScript / Biên dịch thành JavaScript:**
   - Babel hoặc TypeScript biên dịch JSX thành `React.createElement()`
   - Có thể viết trực tiếp `React.createElement()` nhưng JSX tiện hơn

3. **JavaScript Expressions / Biểu thức JavaScript:**
   - Có thể nhúng JavaScript trong `{ }`
   - Sử dụng biến, function, toán tử

4. **Attribute Differences / Khác biệt về thuộc tính:**
   - `class` → `className`
   - `for` → `htmlFor`
   - `onclick` → `onClick` (camelCase)

### Ví dụ thực tế / Practical Example:

```jsx
// JSX
function App() {
  const name = "React";
  const count = 42;

  return (
    <div className="container">
      <h1>Hello, {name}!</h1>
      <p>Count: {count}</p>
      <button onClick={() => alert("Clicked!")}>Click me</button>
    </div>
  );
}

// JSX được biên dịch thành:
function App() {
  const name = "React";
  const count = 42;

  return React.createElement(
    "div",
    { className: "container" },
    React.createElement("h1", null, `Hello, ${name}!`),
    React.createElement("p", null, `Count: ${count}`),
    React.createElement(
      "button",
      { onClick: () => alert("Clicked!") },
      "Click me",
    ),
  );
}

// Fragment với JSX
function List() {
  return (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </>
  );
}

// Conditional rendering với JSX
function Greeting({ isLoggedIn }) {
  return (
    <div>{isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in</h1>}</div>
  );
}

// List rendering với JSX
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

---

## Sự khác biệt giữa React Element và React Component?

### Trả lời / Answer:

### React Element

**React Element** là đối tượng JavaScript đơn giản mô tả những gì bạn muốn hiển thị trên màn hình. Nó là đơn vị nhỏ nhất của React.

- Là object JavaScript thuần
- Bất biến (immutable)
- Tạo bằng `React.createElement()` hoặc JSX
- Không thể chứa logic
- Có thể được render trực tiếp

### React Component

**React Component** là function hoặc class nhận props và trả về React Elements.

- Có thể là function hoặc class
- Có thể chứa logic, state, lifecycle
- Tái sử dụng được
- Có thể nhận props và trả về UI
- Có thể có lifecycle methods (class) hoặc hooks (function)

### So sánh chi tiết:

| Đặc điểm     | React Element              | React Component                 |
| ------------ | -------------------------- | ------------------------------- |
| Định nghĩa   | Object JavaScript          | Function hoặc Class             |
| Có logic     | Không                      | Có                              |
| Có state     | Không                      | Có                              |
| Có lifecycle | Không                      | Có                              |
| Tái sử dụng  | Hạn chế                    | Dễ tái sử dụng                  |
| Tạo bằng     | `createElement()` hoặc JSX | Function declaration hoặc class |

### Ví dụ thực tế / Practical Example:

```jsx
// React Element - object đơn giản
const element = <h1>Hello, World!</h1>;
// Tương đương với:
const element2 = React.createElement('h1', null, 'Hello, World!');

// React Element có thể render trực tiếp
ReactDOM.render(element, document.getElementById('root'));

// React Component - function
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// React Component - class
class WelcomeClass extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

// Component trả về Element
function App() {
  return (
    <div>
      <Welcome name="React" /> {/* Component trả về Element */}
      <h1>Direct Element</h1> {/* Element trực tiếp */}
    </div>
  );
}

// Element không thể chứa logic
// ❌ Sai
const badElement = (
  <div>
    {if (condition) <span>Yes</span>} {/* Error! */}
  </div>
);

// ✅ Đúng - Component có thể chứa logic
function GoodComponent({ condition }) {
  return (
    <div>
      {condition ? <span>Yes</span> : <span>No</span>}
    </div>
  );
}
```

---

## React là library hay framework? Tại sao?

### Trả lời / Answer:

**React là một Library (thư viện), không phải Framework.**

### Tại sao React là Library?

1. **Narrow Scope / Phạm vi hẹp:**
   - Chỉ tập trung vào View layer (UI)
   - Không cung cấp routing, state management, HTTP client
   - Cần kết hợp với các thư viện khác

2. **Flexibility / Tính linh hoạt:**
   - Người dùng tự chọn các công cụ bổ sung
   - Không ép buộc kiến trúc cụ thể
   - Có thể tích hợp vào các dự án khác nhau

3. **Non-opinionated / Không áp đặt:**
   - Không quy định cách tổ chức code
   - Không có "React way" cho mọi thứ
   - Tự do chọn giải pháp

### Framework vs Library:

| Đặc điểm             | Framework                       | Library                  |
| -------------------- | ------------------------------- | ------------------------ |
| Kiến trúc            | Áp đặt kiến trúc                | Không áp đặt             |
| Phạm vi              | Toàn diện (MVC, routing, state) | Cụ thể (chỉ View)        |
| Inversion of Control | Có (framework gọi code)         | Không (code gọi library) |
| Ví dụ                | Angular, Vue, Ember             | React, jQuery, Lodash    |

### React Ecosystem / Hệ sinh thái React:

Vì React chỉ là library, cần các thư viện bổ sung:

- **Routing:** React Router
- **State Management:** Redux, Zustand, Jotai, Recoil
- **Data Fetching:** React Query, SWR, Axios
- **Form Handling:** Formik, React Hook Form
- **Styling:** CSS Modules, Styled Components, Tailwind
- **Testing:** Jest, React Testing Library
- **Build Tool:** Vite, Webpack, Next.js

### Ví dụ thực tế / Practical Example:

```jsx
// React chỉ cung cấp cách tạo UI
import React, { useState } from "react";

// Cần React Router cho routing
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Cần React Query cho data fetching
import { useQuery } from "@tanstack/react-query";

// React chỉ làm việc này:
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}

// Framework như Angular cung cấp tất cả:
// - @Component (UI)
// - @Injectable (Service)
// - @Route (Routing)
// - HttpClient (Data fetching)
// - Forms (Form handling)
// Tất cả tích hợp sẵn
```

---

## Declarative vs Imperative programming trong React?

### Trả lời / Answer:

### Imperative Programming / Lập trình mệnh lệnh

**Imperative** tập trung vào "LÀM THẾ NÀO" để thực hiện công việc. Bạn phải chỉ định từng bước chi tiết.

- Chỉ định từng bước thực hiện
- Tập trung vào cách thức (how)
- Code dài hơn, khó đọc hơn
- Dễ gặp lỗi khi logic phức tạp
- Ví dụ: Vanilla JS, jQuery

### Declarative Programming / Lập trình khai báo

**Declarative** tập trung vào "CÁI GÌ" cần thực hiện. Bạn mô tả kết quả mong muốn, không quan tâm cách thực hiện.

- Mô tả kết quả mong muốn
- Tập trung vào kết quả (what)
- Code ngắn gọn, dễ đọc
- Dễ debug và bảo trì
- Ví dụ: React, SQL, HTML

### So sánh trong React:

```jsx
// ❌ Imperative - Lập trình mệnh lệnh
function ImperativeCounter() {
  const buttonRef = useRef(null);
  const displayRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const display = displayRef.current;
    let count = 0;

    button.addEventListener("click", () => {
      count++;
      display.textContent = `Count: ${count}`;
    });

    return () =>
      button.removeEventListener("click", () => {
        count++;
        display.textContent = `Count: ${count}`;
      });
  }, []);

  return (
    <div>
      <span ref={displayRef}>Count: 0</span>
      <button ref={buttonRef}>Increment</button>
    </div>
  );
}

// ✅ Declarative - Lập trình khai báo
function DeclarativeCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
```

### Ví dụ thực tế / Practical Example:

```jsx
// Imperative - Vanilla JS
function imperativeRender() {
  const container = document.getElementById("app");
  container.innerHTML = "";

  const list = document.createElement("ul");
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.name;
    if (item.completed) {
      li.style.textDecoration = "line-through";
    }
    list.appendChild(li);
  });

  container.appendChild(list);
}

// Declarative - React
function DeclarativeList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li
          key={item.id}
          style={{ textDecoration: item.completed ? "line-through" : "none" }}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// Conditional Rendering
// Imperative
function imperativeCondition() {
  const container = document.getElementById("app");
  if (isLoggedIn) {
    container.innerHTML = "<h1>Welcome back!</h1>";
  } else {
    container.innerHTML = "<h1>Please sign in</h1>";
  }
}

// Declarative
function DeclarativeCondition({ isLoggedIn }) {
  return (
    <div>{isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in</h1>}</div>
  );
}

// List Rendering
// Imperative
function imperativeList(data) {
  const container = document.getElementById("app");
  container.innerHTML = "";

  data.forEach((item) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
    container.appendChild(div);
  });
}

// Declarative
function DeclarativeList({ data }) {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id} className="item">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Lợi ích của Declarative trong React:

1. **Predictability / Dự đoán được:**
   - State → UI mapping rõ ràng
   - Dễ hiểu code

2. **Less Code / Code ngắn hơn:**
   - Không cần quản lý DOM thủ công
   - React tự xử lý updates

3. **Easier Testing / Dễ test:**
   - Test input → output
   - Không cần test implementation details

4. **Better Abstraction / Trừu tượng hóa tốt:**
   - Tập trung vào business logic
   - Không quan tâm đến DOM manipulation
