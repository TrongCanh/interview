# 27. DOM Manipulation / Thao Tác DOM

## Tổng quan về DOM Manipulation

### Mục đích của DOM Manipulation / Purpose

**DOM Manipulation** là việc thay đổi cấu trúc, style, và content của HTML documents thông qua JavaScript.

**Mục đích chính:**

- Tạo dynamic content
- Update UI dựa trên user actions
- Create interactive applications
- Modify page content dynamically

### Khi nào nên dùng / When to Use

- Khi cần dynamic content
- Khi cần update UI
- Khi cần interactive features
- Khi cần modify page content

### Giúp ích gì / Benefits

**Lợi ích:**

- **Dynamic**: Tạo dynamic content
- **Interactive**: Interactive applications
- **Responsive**: Responsive UI
- **User-friendly**: Better user experience

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm       | Giải thích               |
| ------------- | ------------------------ |
| Dynamic       | Tạo dynamic content      |
| Interactive   | Interactive applications |
| Flexible      | Flexible UI updates      |
| User-friendly | Better user experience   |

**Nhược điểm (Cons):**

| Nhược điểm    | Giải thích                    |
| ------------- | ----------------------------- |
| Performance   | Có thể gây performance issues |
| Complexity    | Code có thể phức tạp          |
| Cross-browser | Khác biệt giữa browsers       |

---

## DOM tree là gì?

**DOM tree** là tree structure đại diện cho HTML document, nơi mỗi element, attribute, và text node là một node trong tree.

### Mục đích / Purpose

- Represent HTML structure
- Provide access to elements
- Enable manipulation

### Khi nào dùng / When to Use

- Khi cần understand DOM structure
- Khi traverse DOM
- Khi manipulate DOM

### Ví dụ:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Tree</title>
  </head>
  <body>
    <div id="container">
      <h1>Hello</h1>
      <p>Paragraph</p>
    </div>
  </body>
</html>
```

```javascript
// DOM tree structure:
// Document
//   ├── html
//   │   ├── head
//   │   │   └── title
//   │   └── body
//   │       └── div#container
//   │           ├── h1
//   │           └── p

// Traversing DOM tree
const container = document.getElementById("container");
console.log(container.parentNode); // body
console.log(container.childNodes); // [h1, p]
console.log(container.firstChild); // h1
console.log(container.lastChild); // p
```

### Best Practices:

```javascript
// ✅ Dùng DOM traversal methods
const parent = element.parentNode;
const children = element.childNodes;

// ✅ Dùng childElements thay vì childNodes để bỏ qua text nodes
const elements = element.children;

// ✅ Dùng nextElementSibling thay vì nextSibling
const next = element.nextElementSibling;

// ❌ Traversing DOM tree có thể chậm
// Cache elements khi có thể
const container = document.getElementById("container");
```

---

## Selecting elements?

**Selecting elements** là việc tìm và lấy reference đến DOM elements.

### Mục đích / Purpose

- Get reference to elements
- Manipulate elements
- Access element properties

### Khi nào dùng / When to Use

- Khi cần manipulate elements
- Khi cần access element properties
- Khi cần add event listeners

### Ví dụ:

```javascript
// getElementById - trả về single element
const container = document.getElementById("container");
console.log(container); // <div id="container">...</div>

// getElementsByClassName - trả về HTMLCollection (live)
const buttons = document.getElementsByClassName("button");
console.log(buttons); // HTMLCollection

// getElementsByTagName - trả về HTMLCollection (live)
const divs = document.getElementsByTagName("div");
console.log(divs); // HTMLCollection

// querySelector - trả về first matching element
const firstButton = document.querySelector(".button");
console.log(firstButton); // <button class="button">...</button>

// querySelectorAll - trả về NodeList (static)
const allButtons = document.querySelectorAll(".button");
console.log(allButtons); // NodeList

// Performance comparison
// getElementById - fastest
const byId = document.getElementById("container");

// getElementsByClassName - fast, returns live collection
const byClass = document.getElementsByClassName("button");

// querySelector - slower than getElementById
const byQuery = document.querySelector("#container");

// querySelectorAll - slower than getElementsByClassName
const byQueryAll = document.querySelectorAll(".button");

// Selecting from element
const container = document.getElementById("container");
const buttons = container.querySelectorAll(".button");
```

### Best Practices:

```javascript
// ✅ Dùng getElementById khi biết ID
const container = document.getElementById("container");

// ✅ Dùng querySelector cho complex selectors
const button = document.querySelector(".container .button");

// ✅ Dùng querySelectorAll cho multiple elements
const buttons = document.querySelectorAll(".button");

// ✅ Cache elements khi dùng nhiều lần
const container = document.getElementById("container");
// Use container multiple times...

// ❌ Tránh querySelector khi có thể dùng getElementById
// document.querySelector('#container') - slower
// document.getElementById('container') - faster

// ❌ Tránh querySelectorAll khi không cần
// document.querySelectorAll('.button')[0] - inefficient
// document.querySelector('.button') - better
```

---

## Creating elements?

**Creating elements** là việc tạo mới DOM elements.

### Mục đích / Purpose

- Tạo mới elements
- Add elements vào DOM
- Dynamic content

### Khi nào dùng / When to Use

- Khi cần tạo dynamic content
- Khi cần add elements vào DOM
- Khi cần modify DOM structure

### Ví dụ:

```javascript
// createElement - tạo mới element
const div = document.createElement("div");
div.textContent = "Hello";
document.body.appendChild(div);

// createTextNode - tạo text node
const text = document.createTextNode("Hello");
document.body.appendChild(text);

// createDocumentFragment - tạo fragment (performance)
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const div = document.createElement("div");
  div.textContent = `Item ${i}`;
  fragment.appendChild(div);
}
document.body.appendChild(fragment);

// Tạo element với attributes
const img = document.createElement("img");
img.src = "image.jpg";
img.alt = "Image";
img.className = "image";
document.body.appendChild(img);

// Tạo element với styles
const div = document.createElement("div");
div.style.width = "100px";
div.style.height = "100px";
div.style.backgroundColor = "red";
document.body.appendChild(div);

// Tạo nested elements
const container = document.createElement("div");
container.className = "container";

const heading = document.createElement("h1");
heading.textContent = "Title";
container.appendChild(heading);

const paragraph = document.createElement("p");
paragraph.textContent = "Content";
container.appendChild(paragraph);

document.body.appendChild(container);
```

### Best Practices:

```javascript
// ✅ Dùng DocumentFragment cho batch inserts
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  fragment.appendChild(createElement(i));
}
document.body.appendChild(fragment);

// ✅ Dùng createElement thay vì innerHTML khi có thể
const div = document.createElement("div");
div.textContent = "Content";

// ❌ Tránh innerHTML cho user input (XSS risk)
element.innerHTML = userInput; // Dangerous

// ✅ Dùng textContent hoặc createElement
element.textContent = userInput; // Safe
```

---

## Modifying elements?

**Modifying elements** là việc thay đổi content, attributes, và styles của elements.

### Mục đích / Purpose

- Update element content
- Change element attributes
- Modify element styles

### Khi nào dùng / When to Use

- Khi cần update UI
- Khi cần change content
- Khi cần modify styles

### Ví dụ:

```javascript
// textContent - set/get text content (safe)
const element = document.getElementById("element");
element.textContent = "Hello";
console.log(element.textContent); // 'Hello'

// innerHTML - set/get HTML content (XSS risk)
element.innerHTML = "<strong>Hello</strong>";
console.log(element.innerHTML); // '<strong>Hello</strong>'

// innerText - similar to textContent but respects CSS
element.innerText = "Hello";

// Attributes
// getAttribute
const src = img.getAttribute("src");

// setAttribute
img.setAttribute("src", "image.jpg");
img.setAttribute("alt", "Image");

// removeAttribute
img.removeAttribute("alt");

// Direct property access (faster)
img.src = "image.jpg";
img.alt = "Image";

// className
element.className = "class1 class2";

// classList (modern)
element.classList.add("class1");
element.classList.remove("class2");
element.classList.toggle("class3");
element.classList.contains("class1"); // true

// id
element.id = "my-id";

// style
element.style.color = "red";
element.style.backgroundColor = "blue";
element.style.fontSize = "16px";

// data attributes
element.dataset.userId = "123";
console.log(element.dataset.userId); // '123'

// value (form elements)
input.value = "Hello";
console.log(input.value); // 'Hello'

// checked (checkbox)
checkbox.checked = true;
console.log(checkbox.checked); // true

// disabled
button.disabled = true;
```

### Best Practices:

```javascript
// ✅ Dùng textContent thay vì innerHTML khi có thể
element.textContent = "Content"; // Safe

// ❌ Tránh innerHTML cho user input (XSS risk)
element.innerHTML = userInput; // Dangerous

// ✅ Dùng classList thay vì className
element.classList.add("class1");
element.classList.remove("class2");

// ✅ Dùng dataset cho data attributes
element.dataset.userId = "123";

// ✅ Batch style changes
element.style.cssText = "color: red; background: blue;";

// ❌ Tránh multiple style changes (reflow)
element.style.width = "100px";
element.style.height = "100px";
element.style.backgroundColor = "red";
```

---

## Adding/removing elements?

**Adding/removing elements** là việc thêm hoặc xóa elements khỏi DOM.

### Mục đích / Purpose

- Add elements vào DOM
- Remove elements khỏi DOM
- Modify DOM structure

### Khi nào dùng / When to Use

- Khi cần add dynamic content
- Khi cần remove elements
- Khi cần modify DOM structure

### Ví dụ:

```javascript
// appendChild - thêm element vào cuối parent
const parent = document.getElementById("parent");
const child = document.createElement("div");
parent.appendChild(child);

// insertBefore - thêm element trước reference node
const reference = document.getElementById("reference");
const newElement = document.createElement("div");
parent.insertBefore(newElement, reference);

// insertAdjacentHTML - thêm HTML tại vị trí tương đối
element.insertAdjacentHTML("beforebegin", "<div>Before</div>");
element.insertAdjacentHTML("afterbegin", "<div>After start</div>");
element.insertAdjacentHTML("beforeend", "<div>Before end</div>");
element.insertAdjacentHTML("afterend", "<div>After</div>");

// insertAdjacentElement - thêm element tại vị trí tương đối
const newElement = document.createElement("div");
element.insertAdjacentElement("beforebegin", newElement);

// prepend - thêm element vào đầu parent
parent.prepend(newElement);

// append - thêm element vào cuối parent
parent.append(newElement);

// before - thêm element trước element
element.before(newElement);

// after - thêm element sau element
element.after(newElement);

// replaceWith - thay thế element
element.replaceWith(newElement);

// removeChild - xóa element
parent.removeChild(child);

// remove - xóa chính element
element.remove();

// replaceChild - thay thế element
parent.replaceChild(newElement, oldElement);

// Clone element
const cloned = element.cloneNode(true); // true = clone with children
const shallowClone = element.cloneNode(false); // false = shallow clone
```

### Best Practices:

```javascript
// ✅ Dùng DocumentFragment cho batch inserts
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  fragment.appendChild(createElement(i));
}
document.body.appendChild(fragment);

// ✅ Dùng insertAdjacentHTML cho HTML strings
element.insertAdjacentHTML("beforeend", "<div>Content</div>");

// ✅ Dùng remove() thay vì removeChild()
element.remove();

// ❌ Tránh DOM manipulation trong loops
for (let i = 0; i < 1000; i++) {
  document.body.appendChild(createElement(i));
}

// ✅ Batch operations
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  fragment.appendChild(createElement(i));
}
document.body.appendChild(fragment);
```

---

## Event listeners?

**Event listeners** là cách để handle user interactions và events trên DOM elements.

### Mục đích / Purpose

- Handle user interactions
- Respond to events
- Create interactive applications

### Khi nào dùng / When to Use

- Khi cần handle user actions
- Khi cần respond to events
- Khi cần interactive features

### Ví dụ:

```javascript
// addEventListener - add event listener
const button = document.getElementById("button");
button.addEventListener("click", (event) => {
  console.log("Button clicked!");
  console.log(event.target); // element được click
});

// Event object
button.addEventListener("click", (event) => {
  console.log(event.type); // 'click'
  console.log(event.target); // element được click
  console.log(event.currentTarget); // element có event listener
  console.log(event.clientX, event.clientY); // mouse position
});

// Remove event listener
const handler = (event) => {
  console.log("Clicked!");
};
button.addEventListener("click", handler);
button.removeEventListener("click", handler);

// Event options
button.addEventListener("click", handler, {
  once: true, // chỉ execute một lần
  passive: true, // improve performance cho scroll events
  capture: true, // capture phase thay vì bubble phase
});

// Common events
// Click
element.addEventListener("click", handler);

// Double click
element.addEventListener("dblclick", handler);

// Mouse events
element.addEventListener("mousedown", handler);
element.addEventListener("mouseup", handler);
element.addEventListener("mousemove", handler);
element.addEventListener("mouseenter", handler);
element.addEventListener("mouseleave", handler);

// Keyboard events
element.addEventListener("keydown", handler);
element.addEventListener("keyup", handler);
element.addEventListener("keypress", handler);

// Form events
form.addEventListener("submit", handler);
input.addEventListener("input", handler);
input.addEventListener("change", handler);
input.addEventListener("focus", handler);
input.addEventListener("blur", handler);

// Window events
window.addEventListener("load", handler);
window.addEventListener("resize", handler);
window.addEventListener("scroll", handler);
```

### Best Practices:

```javascript
// ✅ Dùng addEventListener thay vì inline handlers
button.addEventListener("click", handler);

// ❌ Tránh inline handlers
<button onclick="handler()">Click</button>;

// ✅ Dùng passive option cho scroll/touch events
window.addEventListener("scroll", handler, { passive: true });

// ✅ Remove event listeners khi không cần
button.removeEventListener("click", handler);

// ✅ Dùng event delegation cho nhiều elements
container.addEventListener("click", (e) => {
  if (e.target.matches(".button")) {
    handleClick(e);
  }
});
```

---

## Event bubbling vs Capturing?

**Event bubbling** và **Event capturing** là hai phases của event propagation trong DOM.

### Mục đích / Purpose

- Hiểu event propagation
- Control event flow
- Handle events ở appropriate level

### Khi nào dùng / When to Use

- Khi cần understand event flow
- Khi cần stop propagation
- Khi handle events ở parent

### Ví dụ:

```html
<div id="outer">
  <div id="middle">
    <div id="inner">Click me</div>
  </div>
</div>
```

```javascript
// Event bubbling (default) - từ inner ra outer
inner.addEventListener("click", (e) => {
  console.log("Inner clicked");
});
middle.addEventListener("click", (e) => {
  console.log("Middle clicked");
});
outer.addEventListener("click", (e) => {
  console.log("Outer clicked");
});
// Output khi click inner:
// Inner clicked
// Middle clicked
// Outer clicked

// Event capturing - từ outer vào inner
inner.addEventListener(
  "click",
  (e) => {
    console.log("Inner clicked");
  },
  { capture: true },
);
middle.addEventListener(
  "click",
  (e) => {
    console.log("Middle clicked");
  },
  { capture: true },
);
outer.addEventListener(
  "click",
  (e) => {
    console.log("Outer clicked");
  },
  { capture: true },
);
// Output khi click inner:
// Outer clicked
// Middle clicked
// Inner clicked

// stopPropagation - dừng event propagation
inner.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("Inner clicked");
});
middle.addEventListener("click", (e) => {
  console.log("Middle clicked"); // Không execute
});
// Output khi click inner:
// Inner clicked

// stopImmediatePropagation - dừng tất cả listeners
inner.addEventListener("click", (e) => {
  e.stopImmediatePropagation();
  console.log("First listener");
});
inner.addEventListener("click", (e) => {
  console.log("Second listener"); // Không execute
});
// Output khi click inner:
// First listener

// target vs currentTarget
container.addEventListener("click", (e) => {
  console.log(e.target); // element được click
  console.log(e.currentTarget); // container
});
```

### Best Practices:

```javascript
// ✅ Dùng event delegation (bubbling)
container.addEventListener("click", (e) => {
  if (e.target.matches(".button")) {
    handleClick(e);
  }
});

// ✅ Dùng stopPropagation khi cần
inner.addEventListener("click", (e) => {
  e.stopPropagation();
  handleInnerClick();
});

// ✅ Hiểu difference giữa target và currentTarget
container.addEventListener("click", (e) => {
  console.log(e.target); // element được click
  console.log(e.currentTarget); // container
});

// ❌ Tránh stopPropagation quá nhiều (khó debug)
// Chỉ dùng khi thực sự cần
```

---

## Event delegation?

**Event delegation** là kỹ thuật attach một event listener vào parent element thay vì từng child element.

### Mục đích / Purpose

- Giảm số lượng event listeners
- Handle dynamic elements
- Improve performance
- Reduce memory usage

### Khi nào dùng / When to Use

- Khi có nhiều similar elements
- Khi elements được thêm động
- Khi muốn reduce memory usage

### Ví dụ:

```javascript
// Bad - event listener cho từng button
const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log("Button clicked:", e.target.textContent);
  });
});

// Good - event delegation
document.body.addEventListener("click", (e) => {
  if (e.target.matches(".button")) {
    console.log("Button clicked:", e.target.textContent);
  }
});

// Dynamic elements
// Bad - phải re-attach listeners
function addButton() {
  const button = document.createElement("button");
  button.textContent = "Click me";
  button.addEventListener("click", handleClick);
  document.body.appendChild(button);
}

// Good - delegation tự động handle
document.body.addEventListener("click", (e) => {
  if (e.target.matches(".button")) {
    handleClick(e);
  }
});

function addButton() {
  const button = document.createElement("button");
  button.textContent = "Click me";
  document.body.appendChild(button);
}

// Dùng closest cho nested elements
document.body.addEventListener("click", (e) => {
  const button = e.target.closest(".button");
  if (button) {
    handleClick(e);
  }
});

// Event delegation với data attributes
document.body.addEventListener("click", (e) => {
  const button = e.target.closest("[data-action]");
  if (button) {
    const action = button.dataset.action;
    handleAction(action);
  }
});
```

### Best Practices:

```javascript
// ✅ Dùng event delegation cho nhiều similar elements
container.addEventListener("click", (e) => {
  if (e.target.matches(".button")) {
    handleClick(e);
  }
});

// ✅ Dùng closest cho nested elements
container.addEventListener("click", (e) => {
  const button = e.target.closest(".button");
  if (button) {
    handleClick(e);
  }
});

// ✅ Dùng data attributes cho actions
<button data-action="delete">Delete</button>;

document.body.addEventListener("click", (e) => {
  const button = e.target.closest("[data-action]");
  if (button) {
    handleAction(button.dataset.action);
  }
});

// ❌ Tránh event listener cho từng element khi có nhiều elements
buttons.forEach((button) => {
  button.addEventListener("click", handler);
});
```

---

## Use Cases & Patterns

### Common DOM Manipulation Patterns:

```javascript
// 1. Dynamic list rendering
function renderList(items) {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    fragment.appendChild(li);
  });
  list.appendChild(fragment);
}

// 2. Form validation
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const errors = validateForm();
  if (errors.length > 0) {
    showErrors(errors);
  } else {
    submitForm();
  }
});

// 3. Modal implementation
function openModal(content) {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      ${content}
    </div>
  `;
  document.body.appendChild(modal);
}

// 4. Infinite scroll
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadMoreItems();
  }
});

// 5. Drag and drop
element.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const element = document.getElementById(id);
  dropZone.appendChild(element);
});

// 6. Debounced search
const debouncedSearch = debounce(search, 300);
searchInput.addEventListener("input", debouncedSearch);

// 7. Lazy loading images
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll("img[data-src]").forEach((img) => {
  observer.observe(img);
});
```

---

## Anti-patterns cần tránh

```javascript
// ❌ DOM manipulation trong loops
for (let i = 0; i < 1000; i++) {
  document.body.appendChild(createElement(i));
}

// ✅ Batch operations với DocumentFragment
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  fragment.appendChild(createElement(i));
}
document.body.appendChild(fragment);

// ❌ innerHTML cho user input (XSS risk)
element.innerHTML = userInput;

// ✅ Dùng textContent hoặc createElement
element.textContent = userInput;

// ❌ Event listener cho từng element
buttons.forEach((button) => {
  button.addEventListener("click", handler);
});

// ✅ Event delegation
container.addEventListener("click", (e) => {
  if (e.target.matches(".button")) {
    handler(e);
  }
});

// ❌ Query trong loops
for (let i = 0; i < 100; i++) {
  const element = document.querySelector(".element");
  element.textContent = i;
}

// ✅ Cache elements
const element = document.querySelector(".element");
for (let i = 0; i < 100; i++) {
  element.textContent = i;
}
```

---

_References: [MDN DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), [DOM Manipulation Best Practices](https://www.smashingmagazine.com/2012/05/efficient-javascript-event-handling/)_
