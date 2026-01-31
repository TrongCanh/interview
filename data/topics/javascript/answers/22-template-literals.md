# 22. Template Literals / Template Literals

## Tổng quan về Template Literals

### Mục đích của Template Literals / Purpose

**Template Literals** là string literals cho phép embedded expressions, multi-line strings, và string interpolation bằng cách sử dụng backticks (`` ` ``) thay vì quotes (`'` hoặc `"`).

**Mục đích chính:**

- String interpolation - nhúng expressions vào string
- Multi-line strings - viết string nhiều dòng dễ dàng hơn
- Tagged template literals - xử lý string với custom logic
- Escape sequences ít cần thiết hơn

### Khi nào nên dùng / When to Use

**Nên dùng template literals khi:**

- Cần nhúng variables hoặc expressions vào string
- Cần viết multi-line strings
- Cần tạo HTML templates
- Cần custom string processing với tagged templates
- Muốn code dễ đọc hơn khi concatenating strings

### Giúp ích gì / Benefits

**Lợi ích:**

- **Cleaner syntax**: Ngắn gọn hơn string concatenation
- **Multi-line support**: Không cần `\n` cho newlines
- **Expression interpolation**: Dễ nhúng expressions
- **Tagged templates**: Custom string processing
- **Readability**: Code dễ đọc hơn

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm          | Giải thích                         |
| ---------------- | ---------------------------------- |
| Ngắn gọn         | Ít code hơn so với concatenation   |
| Multi-line       | Hỗ trợ multi-line strings tự nhiên |
| Interpolation    | Dễ nhúng expressions               |
| Tagged templates | Custom processing linh hoạt        |
| Readable         | Code dễ đọc và dễ hiểu             |

**Nhược điểm (Cons):**

| Nhược điểm         | Giải thích                                                  |
| ------------------ | ----------------------------------------------------------- |
| Backtick conflicts | Cần escape khi string có backtick                           |
| Browser support    | Cần polyfill cho older browsers (nhưng hiện nay hỗ trợ tốt) |

---

## Template literals là gì?

**Template literals** là string literals được bao quanh bởi backticks (`` ` ``) thay vì quotes, cho phép embedded expressions bằng `${expression}`.

### Ví dụ:

```javascript
// Template literal cơ bản
const name = "John";
const greeting = `Hello, ${name}!`;
console.log(greeting); // Hello, John!

// String concatenation (cũ)
const greetingOld = "Hello, " + name + "!";

// Multi-line string
const message = `Hello,
Welcome to JavaScript!
Enjoy learning.`;
console.log(message);
// Hello,
// Welcome to JavaScript!
// Enjoy learning.

// Embedded expressions
const a = 10;
const b = 20;
const sum = `The sum of ${a} and ${b} is ${a + b}`;
console.log(sum); // The sum of 10 and 20 is 20

// Embedded function calls
const user = { name: "John", age: 30 };
const info = `User: ${user.name}, Age: ${user.age}`;
console.log(info); // User: John, Age: 30
```

---

## String interpolation?

**String interpolation** là khả năng nhúng expressions vào trong template literals bằng cú pháp `${expression}`.

### Mục đích / Purpose

- Nhúng variables, expressions, function calls vào string
- Tạo dynamic strings một cách dễ dàng
- Tránh việc concatenation phức tạp

### Khi nào dùng / When to Use

- Khi cần nhúng variables vào string
- Khi cần nhúng kết quả của expressions
- Khi cần tạo dynamic strings

### Ví dụ:

```javascript
// Variable interpolation
const name = "John";
const age = 30;
const message = `My name is ${name} and I'm ${age} years old.`;
console.log(message); // My name is John and I'm 30 years old.

// Expression interpolation
const price = 100;
const tax = 0.1;
const total = `Total: $${price + price * tax}`;
console.log(total); // Total: $110

// Function call interpolation
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const greeting = `Hello, ${capitalize("john")}!`;
console.log(greeting); // Hello, John!

// Object property interpolation
const user = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
};
const profile = `
  Name: ${user.firstName} ${user.lastName}
  Email: ${user.email}
`;
console.log(profile);

// Conditional interpolation
const isLoggedIn = true;
const status = `Status: ${isLoggedIn ? "Logged in" : "Guest"}`;
console.log(status); // Status: Logged in

// Array method interpolation
const items = ["apple", "banana", "orange"];
const list = `Items: ${items.join(", ")}`;
console.log(list); // Items: apple, banana, orange

// Math expression interpolation
const radius = 5;
const area = `Area of circle with radius ${radius}: ${Math.PI * radius * radius}`;
console.log(area); // Area of circle with radius 5: 78.53981633974483
```

### Best Practices:

```javascript
// ✅ Dùng template literals cho string interpolation
const message = `Hello, ${name}!`;

// ✅ Dùng expressions phức tạp trong ${}
const total = `Total: $${price * (1 + taxRate)}`;

// ✅ Dùng conditional expressions
const status = `Status: ${isLoggedIn ? "Active" : "Inactive"}`;

// ❌ Tránh quá nhiều nested expressions (khó đọc)
const bad = `Result: ${a + b * (c / d)}`;

// ✅ Tách phức tạp ra biến
const intermediate = b * (c / d);
const good = `Result: ${a + intermediate}`;
```

---

## Tagged template literals?

**Tagged template literals** là một advanced feature cho phép bạn parse template literals với một function (tag function).

### Mục đích / Purpose

- Custom string processing
- HTML escaping
- Localization/internationalization
- DSL (Domain Specific Language) creation
- Styled components (React styled-components)

### Khi nào dùng / When to Use

- Khi cần custom string processing
- Khi muốn escape HTML để tránh XSS
- Khi tạo DSL hoặc template engines
- Khi làm việc với styled components

### Ví dụ:

```javascript
// Tagged template cơ bản
function tag(strings, ...values) {
  console.log(strings);  // Array of string parts
  console.log(values);   // Array of interpolated values
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] || '');
  }, '');
}

const name = 'John';
const age = 30;
const result = tag`Name: ${name}, Age: ${age}`;
// strings: ['Name: ', ', Age: ', '']
// values: ['John', 30]

// HTML escaping tag
function html(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] || '';
    const escaped = String(value)
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/"/g, '"')
      .replace(/'/g, ''');
    return result + str + escaped;
  }, '');
}

const userInput = '<script>alert("XSS")</script>';
const safeHtml = html`<div>${userInput}</div>`;
console.log(safeHtml); // <div><script>alert("XSS")</script></div>

// Upper case tag
function upper(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? String(values[i]).toUpperCase() : '');
  }, '');
}

const message = upper`Hello ${name}, you are ${age} years old`;
console.log(message); // Hello JOHN, you are 30 years old

// Currency formatting tag
function currency(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i];
    const formatted = typeof value === 'number'
      ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      : value;
    return result + str + (formatted || '');
  }, '');
}

const price = 1234.56;
const formatted = currency`Price: ${price}`;
console.log(formatted); // Price: $1,234.56

// Styled components (React concept)
function styled(Component) {
  return function(strings, ...values) {
    const styles = strings.reduce((result, str, i) => {
      return result + str + (values[i] || '');
    }, '');
    return function(props) {
      return <Component style={styles} {...props} />;
    };
  };
}

const Button = styled('button')`
  background: blue;
  color: white;
  padding: 10px;
`;
```

### Best Practices:

```javascript
// ✅ Dùng tagged templates cho HTML escaping
const safeHtml = html`<div>${userInput}</div>`;

// ✅ Dùng tagged templates cho formatting
const formatted = currency`Price: ${price}`;

// ✅ Dùng tagged templates cho localization
const message = i18n`Hello ${name}, welcome!`;

// ❌ Tránh tagged templates khi không cần custom processing
// Dùng template literals thường thay thế
const simple = `Hello ${name}`;
```

---

## Multi-line strings?

**Multi-line strings** trong template literals cho phép viết string trên nhiều dòng mà không cần dùng `\n` hoặc string concatenation.

### Mục đích / Purpose

- Viết multi-line strings dễ dàng hơn
- Tạo HTML templates
- Viết SQL queries
- Tạo formatted text

### Khi nào dùng / When to Use

- Khi cần viết HTML templates
- Khi cần viết SQL queries
- Khi cần formatted text
- Khi cần multi-line messages

### Ví dụ:

```javascript
// Multi-line string cơ bản
const message = `Hello,
Welcome to JavaScript!
Enjoy learning.`;
console.log(message);
// Hello,
// Welcome to JavaScript!
// Enjoy learning.

// HTML template
const html = `
  <div class="container">
    <h1>Welcome</h1>
    <p>This is a multi-line HTML template.</p>
  </div>
`;

// SQL query
const query = `
  SELECT
    id,
    name,
    email
  FROM users
  WHERE active = true
  ORDER BY created_at DESC
`;

// Formatted email
const email = `
  Dear ${name},

  Thank you for your purchase!

  Order Details:
  - Item: ${item}
  - Price: $${price}
  - Quantity: ${quantity}

  Total: $${total}

  Best regards,
  The Team
`;

// Code template
const code = `
  function ${functionName}(${params}) {
    ${body}
  }
`;

// JSON template (formatted)
const json = `
{
  "name": "${name}",
  "age": ${age},
  "email": "${email}"
}
`;

// Indented multi-line string (trim)
const trimLines = (strings, ...values) => {
  const result = strings.reduce(
    (acc, str, i) => acc + str + (values[i] || ""),
    "",
  );
  return result.replace(/^\n/, "").replace(/(\n\s+)+\n/g, "\n");
};

const indented = trimLines`
  Line 1
    Line 2 (indented)
  Line 3
`;
```

### Best Practices:

```javascript
// ✅ Dùng multi-line strings cho HTML templates
const html = `
  <div class="container">
    <h1>Title</h1>
  </div>
`;

// ✅ Dùng multi-line strings cho SQL queries
const query = `
  SELECT * FROM users
  WHERE active = true
`;

// ✅ Dùng multi-line strings cho formatted text
const message = `
  Hello ${name},
  Welcome to our platform!
`;

// ❌ Tránh quá nhiều indentation (có thể gây unwanted whitespace)
// Dùng trim function hoặc template literal libraries
```

---

## Raw strings?

**Raw strings** trong template literals có thể truy cập thông qua `String.raw` tag, cho phép giữ nguyên escape sequences.

### Mục đích / Purpose

- Giữ nguyên escape sequences
- Làm việc với Windows file paths
- Regex patterns
- Avoid escaping backslashes

### Khi nào dùng / When to Use

- Khi cần làm việc với file paths (đặc biệt Windows)
- Khi viết regex patterns
- Khi muốn giữ nguyên escape sequences

### Ví dụ:

```javascript
// String.raw cho raw strings
const path = String.raw`C:\Users\John\Documents\file.txt`;
console.log(path); // C:\Users\John\Documents\file.txt

// Regular string (cần escape)
const normalPath = "C:\\Users\\John\\Documents\\file.txt";
console.log(normalPath); // C:\Users\John\Documents\file.txt

// Regex pattern
const pattern = String.raw`\d{3}-\d{3}-\d{4}`;
console.log(pattern); // \d{3}-\d{3}-\d{4}

// Regex với String.raw
const regex = new RegExp(String.raw`\b\w+\b`, "g");
const text = "Hello world!";
console.log(text.match(regex)); // ['Hello', 'world']

// Unicode escape sequences
const unicode = String.raw`\u0048\u0065\u006C\u006C\u006F`;
console.log(unicode); // \u0048\u0065\u006C\u006C\u006F (không được decode)

// Custom raw string tag
function raw(strings, ...values) {
  return strings.raw.reduce((result, str, i) => {
    return result + str + (values[i] || "");
  }, "");
}

const rawString = raw`Line 1\nLine 2`;
console.log(rawString); // Line 1\nLine 2 (không có newline thực tế)
```

---

## Use Cases & Patterns

### Common Template Literal Use Cases:

```javascript
// 1. HTML templates
const renderUser = (user) => `
  <div class="user-card">
    <img src="${user.avatar}" alt="${user.name}">
    <h2>${user.name}</h2>
    <p>${user.email}</p>
  </div>
`;

// 2. SQL queries
const findUser = (id) => `
  SELECT * FROM users
  WHERE id = ${id}
  LIMIT 1
`;

// 3. URL construction
const buildUrl = (baseUrl, path, params) => {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  return `${baseUrl}/${path}?${queryString}`;
};

// 4. Logging with context
const log = (level, message, context) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`, context);
};

// 5. Email templates
const sendEmail = (to, subject, data) => {
  const body = `
    Dear ${data.name},

    ${data.message}

    Best regards,
    ${data.sender}
  `;
  // send email...
};

// 6. CSS-in-JS (styled components concept)
const styled = (tag, strings, ...values) => {
  const className = `styled-${Math.random().toString(36).substr(2, 9)}`;
  const styles = strings.reduce(
    (acc, str, i) => acc + str + (values[i] || ""),
    "",
  );
  const style = document.createElement("style");
  style.textContent = `.${className} { ${styles} }`;
  document.head.appendChild(style);
  return (props) => {
    const el = document.createElement(tag);
    el.className = className;
    el.textContent = props.children;
    return el;
  };
};

const Button = styled("button")`
  background: blue;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
`;

// 7. Internationalization
const i18n = (strings, ...values) => {
  const key = strings.join("").trim();
  // lookup translation...
  return (
    translations[key] ||
    strings.reduce((acc, str, i) => acc + str + (values[i] || ""), "")
  );
};

// 8. Markdown generation
const markdown = (data) => `
# ${data.title}

${data.description}

## Features
${data.features.map((f) => `- ${f}`).join("\n")}
`;
```

---

## Anti-patterns cần tránh

```javascript
// ❌ Dùng template literals cho static strings (không cần)
const static = `Hello World`;

// ✅ Dùng quotes thường cho static strings
const static = "Hello World";

// ❌ Quá nhiều nested expressions (khó đọc)
const bad = `Result: ${a + b * (c / d) - (e ? f : g)}`;

// ✅ Tách phức tạp ra biến
const intermediate = b * (c / d);
const result = a + intermediate - (e ? f : g);
const good = `Result: ${result}`;

// ❌ Quên escape backticks trong template literals
const bad = `This contains a backtick: `; // Syntax error

// ✅ Escape backticks
const good = `This contains a backtick: \``;

// ❌ Dùng template literals cho regex (có thể gây issues)
const bad = new RegExp(`\d{3}-\d{3}-\d{4}`);

// ✅ Dùng String.raw hoặc escape đúng
const good = new RegExp(String.raw`\d{3}-\d{3}-\d{4}`);
// hoặc
const good = new RegExp(`\\d{3}-\\d{3}-\\d{4}`);
```

---

_References: [MDN Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), [ES6 Template Strings](https://es6-features.org/#StringInterpolation)_
