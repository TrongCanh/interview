# Fragment / Fragment

## Định nghĩa / Definition

[`Fragment`](https://react.dev/reference/react/Fragment) (hay viết tắt là `<>...</>`) là một built-in component trong React cho phép bạn nhóm nhiều elements lại với nhau mà không cần tạo một DOM node wrapper.

## Cú pháp / Syntax

```jsx
// Full syntax
<Fragment>
  {/* children */}
</Fragment>

// Short syntax (shorthand)
<>
  {/* children */}
</>
```

## Tham số / Parameters

| Tham số    | Kiểu | Mô tả                                                            |
| ---------- | ---- | ---------------------------------------------------------------- |
| `children` | Node | Các elements con muốn nhóm lại. Có thể là bất kỳ React node nào. |

## Giá trị trả về / Return Value

Trả về một React Fragment object, khi render sẽ không tạo ra DOM node nào.

## Cách hoạt động / How it Works

### No DOM Node

Fragment không tạo ra DOM node:

```jsx
// Với Fragment
<>
  <h1>Title</h1>
  <p>Content</p>
</>

// Render thành:
<h1>Title</h1>
<p>Content</p>

// Không có wrapper element
```

### Comparison with Wrapper Element

```jsx
// ❌ Với wrapper div
<div>
  <h1>Title</h1>
  <p>Content</p>
</div>
// Render thành:
<div>
  <h1>Title</h1>
  <p>Content</p>
</div>

// ✅ Với Fragment
<>
  <h1>Title</h1>
  <p>Content</p>
</>
// Render thành:
<h1>Title</h1>
<p>Content</p>
```

### Key Prop

Fragment có thể nhận `key` prop khi render lists:

```jsx
{
  items.map((item) => (
    <Fragment key={item.id}>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
    </Fragment>
  ));
}
```

## Ví dụ thực tế / Practical Examples

### Ví dụ cơ bản / Basic Example

```jsx
function App() {
  return (
    <>
      <header>Header</header>
      <main>Main Content</main>
      <footer>Footer</footer>
    </>
  );
}
```

### Ví dụ với Table Rows

```jsx
function Table() {
  return (
    <table>
      <tbody>
        <tr>
          <td>John</td>
          <td>Doe</td>
        </tr>
        <tr>
          <td>Jane</td>
          <td>Smith</td>
        </tr>
      </tbody>
    </table>
  );
}

// Với Fragment cho mỗi row
function TableWithFragment() {
  const rows = [
    { firstName: "John", lastName: "Doe" },
    { firstName: "Jane", lastName: "Smith" },
  ];

  return (
    <table>
      <tbody>
        {rows.map((row, index) => (
          <Fragment key={index}>
            <tr>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}
```

### Ví dụ với List Rendering

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <Fragment key={todo.id}>
          <li>
            <input type="checkbox" checked={todo.completed} />
            <span>{todo.text}</span>
          </li>
        </Fragment>
      ))}
    </ul>
  );
}
```

### Ví dụ với Conditional Rendering

```jsx
function ConditionalComponent({ showHeader, showFooter }) {
  return (
    <>
      {showHeader && <header>Header</header>}
      <main>Main Content</main>
      {showFooter && <footer>Footer</footer>}
    </>
  );
}
```

### Ví dụ với Multiple Elements

```jsx
function Card({ title, content, footer }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        <p>{content}</p>
      </div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// Hoặc dùng Fragment cho header
function CardWithFragment({ title, subtitle, content }) {
  return (
    <div className="card">
      <div className="card-header">
        <>
          <h2>{title}</h2>
          {subtitle && <p className="subtitle">{subtitle}</p>}
        </>
      </div>
      <div className="card-body">
        <p>{content}</p>
      </div>
    </div>
  );
}
```

### Ví dụ với Key Prop

```jsx
function FormFields() {
  const fields = [
    { id: 1, label: "Name", type: "text" },
    { id: 2, label: "Email", type: "email" },
    { id: 3, label: "Password", type: "password" },
  ];

  return (
    <form>
      {fields.map((field) => (
        <Fragment key={field.id}>
          <label>{field.label}</label>
          <input type={field.type} />
        </Fragment>
      ))}
    </form>
  );
}
```

### Ví dụ với CSS Grid

```jsx
function GridItem({ item }) {
  return (
    <>
      <div className="grid-item-image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="grid-item-content">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </>
  );
}
```

## Khi nào nên dùng / When to Use

- Khi cần trả về multiple elements từ component
- Khi không muốn tạo wrapper DOM node
- Khi cần render multiple elements trong list với key
- Khi cần nhóm elements cho CSS Grid/Flexbox layouts
- Khi cần return multiple elements từ map

## Khi nào KHÔNG nên dùng / When NOT to Use

- Khi chỉ có một element con (không cần Fragment)
- Khi cần wrapper element cho styling
- Khi cần wrapper element cho event handlers
- Khi cần wrapper element cho refs

## Nếu không sử dụng thì có khó khăn gì? / Difficulties Without It

Nếu không dùng Fragment:

1. **Invalid JSX**: JSX không cho phép return multiple elements mà không có wrapper.

2. **Extra DOM nodes**: Phải dùng wrapper div hoặc span, tạo ra DOM nodes không cần thiết.

3. **Broken layouts**: Extra wrapper có thể break CSS layouts (flexbox, grid).

4. **Invalid HTML**: Một số elements (như `tr`, `li`) không thể có div làm con.

## Vấn đề được giải quyết / Problems Solved

### 1. Return Multiple Elements

Component có thể return multiple elements mà không cần wrapper.

### 2. Clean DOM

Không tạo ra extra DOM nodes không cần thiết.

### 3. Valid HTML Structure

Giúp maintain valid HTML structure trong các contexts đặc biệt (tables, lists).

### 4. Better Styling

Không bị ảnh hưởng bởi extra wrapper elements.

## Ưu điểm / Advantages

1. **No extra DOM nodes**: Không tạo ra DOM nodes không cần thiết.
2. **Clean JSX**: Code gọn gàng hơn.
3. **Valid HTML**: Giúp maintain valid HTML structure.
4. **Better performance**: Ít DOM nodes hơn.
5. **Shorthand syntax**: Cú pháp `<>...</>` ngắn gọn.

## Nhược điểm / Disadvantages

1. **No props support**: Shorthand syntax `<>...</>` không hỗ trợ props.
2. **Limited use cases**: Chỉ dùng được khi không cần wrapper element.
3. **Debugging**: Có thể khó debug hơn so với wrapper elements.

## So sánh với các giải pháp khác / Comparison with Alternatives

| Đặc điểm         | Fragment  | Wrapper Div | Array     |
| ---------------- | --------- | ----------- | --------- |
| Creates DOM node | Không     | Có          | Không     |
| Styling          | Không thể | Có thể      | Không thể |
| Key prop         | Có        | Có          | Có thể    |
| Readability      | Tốt       | Trung bình  | Kém       |
| Performance      | Tốt       | Kém hơn     | Tốt       |

## Best Practices / Các thực hành tốt

1. **Dùng shorthand syntax khi không cần props**:

   ```jsx
   // ✅ Tốt
   <>
     <h1>Title</h1>
     <p>Content</p>
   </>
   ```

2. **Dùng full syntax khi cần key**:

   ```jsx
   // ✅ Tốt
   {
     items.map((item) => (
       <Fragment key={item.id}>
         <h2>{item.title}</h2>
         <p>{item.description}</p>
       </Fragment>
     ));
   }
   ```

3. **Không dùng khi chỉ có một element**:

   ```jsx
   // ❌ Không cần
   <>
     <div>Content</div>
   </>

   // ✅ Đúng
   <div>Content</div>
   ```

4. **Dùng cho table rows**:
   ```jsx
   // ✅ Tốt cho tables
   {
     rows.map((row) => (
       <Fragment key={row.id}>
         <td>{row.name}</td>
         <td>{row.value}</td>
       </Fragment>
     ));
   }
   ```

## Common Pitfalls / Các lỗi thường gặp

### 1. Using Shorthand with Props

```jsx
// ❌ Sai - shorthand không hỗ trợ props
<>
  <Child />
</>

// ✅ Đúng - dùng full syntax
<Fragment>
  <Child />
</Fragment>
```

### 2. Using When Not Needed

```jsx
// ❌ Không cần Fragment
<>
  <div>Content</div>
</>

// ✅ Đúng - chỉ trả về div
<div>Content</div>
```

### 3. Forgetting Key in Lists

```jsx
// ❌ Sai - thiếu key
{
  items.map((item) => (
    <>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
    </>
  ));
}

// ✅ Đúng - có key
{
  items.map((item) => (
    <Fragment key={item.id}>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
    </Fragment>
  ));
}
```

### 4. Using for Styling

```jsx
// ❌ Không thể style Fragment
<>
  <h1>Title</h1>
  <p>Content</p>
</>

// ✅ Đúng - dùng wrapper div
<div className="container">
  <h1>Title</h1>
  <p>Content</p>
</div>
```

## Performance Considerations / Yếu tố hiệu suất

1. **Fewer DOM nodes**: Ít DOM nodes hơn so với wrapper elements.

2. **No re-render overhead**: Fragment không gây re-render overhead.

3. **Better layout performance**: Không có extra nodes ảnh hưởng layout.

4. **Memory efficient**: Ít memory usage hơn.

## Browser Support / Hỗ trợ trình duyệt

Fragment hoạt động trên tất cả trình duyệt hỗ trợ React.

## Câu hỏi phỏng vấn / Interview Questions

1. Fragment là gì? Khi nào nên dùng?

2. Fragment hoạt động như thế nào?

3. Sự khác biệt giữa Fragment và wrapper div?

4. Tại sao không nên dùng wrapper div?

5. Khi nào nên dùng shorthand syntax `<>...</>`?

6. Fragment có tạo DOM node không?

7. Làm thế nào để dùng key với Fragment?

8. Fragment có hỗ trợ props không?

9. Khi nào KHÔNG nên dùng Fragment?

10. Fragment có hoạt động với SSR không?

11. Làm thế nào Fragment giúp cải thiện performance?

12. Có thể nest Fragments không?

13. Fragment có hoạt động với TypeScript không?

14. Làm thế nào để debug components với Fragment?

15. Fragment có hoạt động với React 16.2 không?

## Tài liệu tham khảo / References

- [Fragment - React Official Docs](https://react.dev/reference/react/Fragment)
- [Fragments - React Docs](https://react.dev/learn/rendering-lists#rendering-several-elements-at-once)
- [JSX - React Docs](https://react.dev/learn/writing-markup-with-jsx)

---

_Last updated: 2026-01-31_
