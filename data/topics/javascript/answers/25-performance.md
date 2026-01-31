# 25. Performance / Hiệu Năng

## Tổng quan về Performance

### Mục đích của Performance Optimization / Purpose

**Performance Optimization** là quá trình cải thiện tốc độ và hiệu quả của JavaScript code để ứng dụng chạy nhanh hơn và mượt mà hơn.

**Mục đích chính:**

- Giảm load time
- Cải thiện responsiveness
- Giảm memory usage
- Tăng user experience
- Giảm battery consumption (mobile)

### Khi nào nên quan tâm / When to Care

**Nên quan tâm performance khi:**

- Ứng dụng có nhiều users
- Xử lý large datasets
- Real-time applications
- Mobile applications
- Animation-heavy applications

### Giúp ích gì / Benefits

**Lợi ích:**

- **Faster load times**: Ứng dụng load nhanh hơn
- **Better UX**: Trải nghiệm người dùng tốt hơn
- **Lower costs**: Giảm server costs
- **Better SEO**: Google ưu tiên fast sites
- **More users**: Users thích fast apps

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm     | Giải thích                     |
| ----------- | ------------------------------ |
| Faster      | Ứng dụng chạy nhanh hơn        |
| Better UX   | Trải nghiệm người dùng tốt hơn |
| Lower costs | Giảm server và bandwidth costs |
| Better SEO  | Google ưu tiên fast sites      |
| More users  | Users thích fast apps          |

**Nhược điểm (Cons):**

| Nhược điểm       | Giải thích                       |
| ---------------- | -------------------------------- |
| Complexity       | Code phức tạp hơn                |
| Development time | Tốn thời gian hơn                |
| Trade-offs       | Có thể trade-off với readability |

---

## V8 engine optimization?

**V8 engine optimization** là các kỹ thuật V8 (Chrome, Node.js) dùng để optimize JavaScript code.

### Mục đích / Purpose

- Hiểu cách V8 optimize code
- Viết code V8-friendly
- Avoid deoptimizations

### Khi nào dùng / When to Use

- Khi muốn write performant code
- Khi debug performance issues
- Khi profile code

### Ví dụ:

```javascript
// Hidden classes - V8 tạo hidden classes cho objects
// Good: consistent object shape
function createUser(name, age) {
  return { name, age };
}
const user1 = createUser("John", 30);
const user2 = createUser("Jane", 25);
// V8 có thể optimize vì object shape giống nhau

// Bad: inconsistent object shape
function createUserBad(name, age) {
  const user = { name };
  if (age) {
    user.age = age;
  }
  return user;
}
// V8 phải tạo multiple hidden classes

// Inline caching - V8 cache property access
// Good: consistent property access
function getName(user) {
  return user.name;
}

// Bad: dynamic property access
function getProperty(user, prop) {
  return user[prop];
}

// Avoid deoptimizations
// Bad: delete property
const obj = { a: 1, b: 2 };
delete obj.a; // Deoptimizes object

// Good: set to undefined
obj.a = undefined;

// Bad: add property after object creation
const obj = { a: 1 };
obj.b = 2; // Changes hidden class

// Good: define all properties at creation
const obj = { a: 1, b: undefined };
```

### Best Practices:

```javascript
// ✅ Giữ object shape consistent
function createUser(name, age) {
  return { name, age };
}

// ✅ Define tất cả properties tại creation
const user = {
  name: "John",
  age: 30,
  email: undefined,
};

// ✅ Dùng consistent property access
function getName(user) {
  return user.name;
}

// ❌ Tránh delete property
delete obj.a;

// ✅ Set thành undefined thay vì delete
obj.a = undefined;

// ❌ Tránh add property sau creation
const obj = { a: 1 };
obj.b = 2;

// ✅ Define tất cả properties tại creation
const obj = { a: 1, b: undefined };
```

---

## Hidden classes?

**Hidden classes** là cơ chế V8 dùng để optimize object property access bằng cách tạo "classes" cho objects với cùng shape.

### Mục đích / Purpose

- Optimize property access
- Giảm memory usage
- Tăng performance

### Khi nào dùng / When to Use

- Khi muốn write performant code
- Khi làm việc với nhiều objects

### Ví dụ:

```javascript
// Hidden class 1
const obj1 = { a: 1 };
// Hidden class 2 (extends class 1)
obj1.b = 2;
// Hidden class 3 (extends class 2)
obj1.c = 3;

// Good: tạo objects với cùng shape
function createPoint(x, y) {
  return { x, y };
}
const p1 = createPoint(1, 2);
const p2 = createPoint(3, 4);
// Cả 2 objects có cùng hidden class

// Bad: objects với khác shapes
function createPointBad(x, y, z) {
  const point = { x, y };
  if (z !== undefined) {
    point.z = z;
  }
  return point;
}
const p1 = createPointBad(1, 2);
const p2 = createPointBad(3, 4, 5);
// p1 và p2 có khác hidden classes
```

### Best Practices:

```javascript
// ✅ Tạo objects với consistent shape
function createUser(name, age, email) {
  return { name, age, email };
}

// ✅ Define tất cả properties tại creation
const user = {
  name: "John",
  age: 30,
  email: undefined,
};

// ❌ Tránh conditional property creation
function createUser(name, age) {
  const user = { name };
  if (age) {
    user.age = age;
  }
  return user;
}

// ✅ Define tất cả properties
function createUser(name, age = undefined) {
  return { name, age };
}
```

---

## Inline caching?

**Inline caching** là kỹ thuật V8 cache kết quả của property access để tăng tốc độ truy cập.

### Mục đích / Purpose

- Cache property access
- Tăng performance
- Giảm lookup time

### Khi nào dùng / When to Use

- Khi muốn write performant code
- Khi làm việc với objects

### Ví dụ:

```javascript
// Inline caching - V8 cache property access
function getName(user) {
  return user.name;
}

const users = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
];

for (const user of users) {
  console.log(getName(user));
}
// V8 cache user.name access sau lần đầu tiên

// Bad: dynamic property access
function getProperty(user, prop) {
  return user[prop];
}

// Không thể inline cache vì prop thay đổi
for (const user of users) {
  console.log(getProperty(user, "name"));
  console.log(getProperty(user, "age"));
}
```

### Best Practices:

```javascript
// ✅ Dùng consistent property access
function getName(user) {
  return user.name;
}

// ✅ Dùng methods thay vì dynamic access
function getName(user) {
  return user.getName();
}

// ❌ Tránh dynamic property access trong hot paths
function getProperty(user, prop) {
  return user[prop];
}

// ✅ Dùng property access trực tiếp
function getName(user) {
  return user.name;
}
```

---

## Memory management?

**Memory management** là quá trình allocate và deallocate memory trong JavaScript.

### Mục đích / Purpose

- Hiểu memory allocation
- Tránh memory leaks
- Optimize memory usage

### Khi nào dùng / When to Use

- Khi làm việc với large datasets
- Khi có memory leaks
- Khi optimize performance

### Ví dụ:

```javascript
// Memory allocation
const data = new Array(1000000).fill(0);

// Memory deallocation (GC)
data = null; // GC có thể deallocate

// Memory leak - global variable
let cache = {};
function addToCache(key, value) {
  cache[key] = value;
}
// Cache không bao giờ được clear

// Fix - limit cache size
const MAX_CACHE_SIZE = 1000;
const cache = {};
function addToCache(key, value) {
  if (Object.keys(cache).length >= MAX_CACHE_SIZE) {
    cache = {}; // Clear cache
  }
  cache[key] = value;
}

// Memory leak - event listeners
function setupButton() {
  const button = document.getElementById("button");
  button.addEventListener("click", () => {
    console.log("Clicked");
  });
}
// Event listener không được remove

// Fix - remove event listener
function setupButton() {
  const button = document.getElementById("button");
  const handler = () => console.log("Clicked");
  button.addEventListener("click", handler);
  return () => button.removeEventListener("click", handler);
}

// Memory leak - closures
function createLeak() {
  const largeData = new Array(1000000).fill(0);
  return function () {
    console.log("Closure");
  };
}
// largeData được giữ trong closure

// Fix - nullify large references
function createLeakFixed() {
  const largeData = new Array(1000000).fill(0);
  return function () {
    largeData.length = 0; // Clear large array
    console.log("Closure");
  };
}
```

### Best Practices:

```javascript
// ✅ Nullify large references khi không cần
const largeData = new Array(1000000).fill(0);
// Use largeData...
largeData = null;

// ✅ Remove event listeners khi không cần
button.addEventListener("click", handler);
// Later...
button.removeEventListener("click", handler);

// ✅ Limit cache size
const cache = new Map();
const MAX_SIZE = 1000;
function setCache(key, value) {
  if (cache.size >= MAX_SIZE) {
    cache.clear();
  }
  cache.set(key, value);
}

// ❌ Tránh global variables
let globalData = [];

// ✅ Dùng module scope hoặc closures
const moduleData = [];
```

---

## Garbage collection?

**Garbage collection (GC)** là quá trình tự động deallocate memory không còn được sử dụng.

### Mục đích / Purpose

- Tự động deallocate memory
- Tránh memory leaks
- Simplify memory management

### Khi nào dùng / When to Use

- GC tự động chạy, không cần gọi thủ công
- Hiểu GC giúp write performant code

### Ví dụ:

```javascript
// GC tự động deallocate unreachable objects
function createObject() {
  const obj = { data: "value" };
  return obj;
}
const obj = createObject();
obj = null; // GC có thể deallocate obj

// GC không deallocate reachable objects
const cache = {};
function addToCache(key, value) {
  cache[key] = value;
}
// GC không deallocate cache vì nó vẫn reachable

// WeakMap/WeakSet cho GC-friendly caching
const cache = new WeakMap();
function addToCache(obj, value) {
  cache.set(obj, value);
}
// GC có thể deallocate obj khi không còn referenced

// Manual GC trigger (Node.js only)
if (global.gc) {
  global.gc();
}
```

### Best Practices:

```javascript
// ✅ Nullify references khi không cần
const largeData = new Array(1000000).fill(0);
// Use largeData...
largeData = null;

// ✅ Dùng WeakMap/WeakSet cho GC-friendly caching
const cache = new WeakMap();
cache.set(obj, value);

// ✅ Avoid unnecessary references
function processData(data) {
  // Process data...
  return result;
}
// data được deallocate sau function return

// ❌ Tránh giữ references không cần
const cache = {};
function addToCache(key, value) {
  cache[key] = value;
}
// Cache không bao giờ được clear
```

---

## Common performance pitfalls?

**Common performance pitfalls** là những lỗi thường gặp làm giảm performance.

### Mục đích / Purpose

- Tránh common mistakes
- Write performant code
- Debug performance issues

### Khi nào dùng / When to Use

- Khi review code
- Khi debug performance
- Khi write new code

### Ví dụ:

```javascript
// Pitfall 1: DOM manipulation trong loops
// Bad
for (let i = 0; i < 1000; i++) {
  document.body.innerHTML += "<div>Item</div>";
}

// Good
let html = "";
for (let i = 0; i < 1000; i++) {
  html += "<div>Item</div>";
}
document.body.innerHTML = html;

// Pitfall 2: Synchronous operations trong event handlers
// Bad
button.addEventListener("click", () => {
  for (let i = 0; i < 1000000; i++) {
    heavyOperation();
  }
});

// Good
button.addEventListener("click", async () => {
  for (let i = 0; i < 1000000; i++) {
    await heavyOperationAsync();
  }
});

// Pitfall 3: Memory leaks với closures
// Bad
function createHandler() {
  const largeData = new Array(1000000).fill(0);
  return function () {
    console.log("Clicked");
  };
}

// Good
function createHandler() {
  return function () {
    console.log("Clicked");
  };
}

// Pitfall 4: Unnecessary re-renders (React)
// Bad
function App() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveComponent data={data} />
    </div>
  );
}

// Good
function App() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveComponent data={data} />
    </div>
  );
}
// ExpensiveComponent được memoized

// Pitfall 5: Large bundle size
// Bad
import _ from "lodash";

// Good
import debounce from "lodash/debounce";
```

### Best Practices:

```javascript
// ✅ Batch DOM operations
let html = "";
for (let i = 0; i < 1000; i++) {
  html += "<div>Item</div>";
}
document.body.innerHTML = html;

// ✅ Dùng async cho heavy operations
async function process() {
  for (let i = 0; i < 1000000; i++) {
    await heavyOperationAsync();
  }
}

// ✅ Tree-shake imports
import debounce from "lodash/debounce";

// ✅ Memoize expensive operations
const memoized = memoize(expensiveOperation);

// ✅ Use requestAnimationFrame cho animations
function animate() {
  update();
  requestAnimationFrame(animate);
}
```

---

## DOM manipulation performance?

**DOM manipulation performance** là tối ưu hóa các thao tác DOM để tăng tốc độ.

### Mục đích / Purpose

- Giảm reflows và repaints
- Tăng DOM manipulation speed
- Cải thiện rendering performance

### Khi nào dùng / When to Use

- Khi làm việc với DOM
- Khi có nhiều DOM updates
- Khi optimize rendering

### Ví dụ:

```javascript
// Bad: DOM manipulation trong loop
for (let i = 0; i < 1000; i++) {
  document.body.appendChild(createElement(i));
}

// Good: DocumentFragment
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  fragment.appendChild(createElement(i));
}
document.body.appendChild(fragment);

// Bad: Multiple style changes
element.style.width = "100px";
element.style.height = "100px";
element.style.backgroundColor = "red";

// Good: Batch style changes
element.style.cssText = "width: 100px; height: 100px; background-color: red;";

// Bad: Read và write DOM interleaved
element.style.height = element.offsetHeight + 10 + "px";
element.style.width = element.offsetWidth + 10 + "px";

// Good: Batch reads và writes
const height = element.offsetHeight;
const width = element.offsetWidth;
element.style.height = height + 10 + "px";
element.style.width = width + 10 + "px";

// Use requestAnimationFrame
function updateElement() {
  requestAnimationFrame(() => {
    element.style.transform = "translateX(100px)";
  });
}

// Use event delegation
// Bad
buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

// Good
container.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    handleClick(e);
  }
});
```

### Best Practices:

```javascript
// ✅ Dùng DocumentFragment cho batch inserts
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  fragment.appendChild(createElement(i));
}
document.body.appendChild(fragment);

// ✅ Batch style changes
element.style.cssText = "width: 100px; height: 100px;";

// ✅ Batch reads và writes
const height = element.offsetHeight;
element.style.height = height + 10 + "px";

// ✅ Dùng requestAnimationFrame cho animations
requestAnimationFrame(() => {
  element.style.transform = "translateX(100px)";
});

// ✅ Dùng event delegation
container.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    handleClick(e);
  }
});
```

---

## Event delegation?

**Event delegation** là kỹ thuật attach một event listener vào parent element thay vì từng child element.

### Mục đích / Purpose

- Giảm số lượng event listeners
- Tăng performance
- Handle dynamic elements

### Khi nào dùng / When to Use

- Khi có nhiều similar elements
- Khi elements được thêm động
- Khi muốn reduce memory usage

### Ví dụ:

```javascript
// Bad: Event listener cho từng button
const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log("Button clicked:", e.target.textContent);
  });
});

// Good: Event delegation
document.body.addEventListener("click", (e) => {
  if (e.target.matches(".button")) {
    console.log("Button clicked:", e.target.textContent);
  }
});

// Dynamic elements
// Bad: phải re-attach listeners khi thêm elements
function addButton() {
  const button = document.createElement("button");
  button.textContent = "Click me";
  button.addEventListener("click", handleClick);
  document.body.appendChild(button);
}

// Good: delegation tự động handle dynamic elements
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
```

### Best Practices:

```javascript
// ✅ Dùng event delegation cho nhiều similar elements
document.body.addEventListener("click", (e) => {
  if (e.target.matches(".button")) {
    handleClick(e);
  }
});

// ✅ Dùng closest để handle nested elements
document.body.addEventListener("click", (e) => {
  const button = e.target.closest(".button");
  if (button) {
    handleClick(e);
  }
});

// ✅ Dùng delegation cho dynamic elements
container.addEventListener("click", (e) => {
  if (e.target.matches(".item")) {
    handleItemClick(e);
  }
});
```

---

## Lazy loading?

**Lazy loading** là kỹ thuật load resources chỉ khi cần.

### Mục đích / Purpose

- Giảm initial load time
- Giảm bandwidth usage
- Cải thiện initial render

### Khi nào dùng / When to Use

- Khi có large resources
- Khi resources không cần ngay lập tức
- Khi muốn improve initial load

### Ví dụ:

```javascript
// Lazy load images
<img src="placeholder.jpg" data-src="image.jpg" loading="lazy" />;

// Lazy load modules
const loadModule = async () => {
  const module = await import("./heavy-module.js");
  module.init();
};

// Lazy load components (React)
const LazyComponent = React.lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// Lazy load data
const loadData = async () => {
  const response = await fetch("/api/data");
  return response.json();
};

// Intersection Observer cho lazy loading
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

### Best Practices:

```javascript
// ✅ Dùng loading="lazy" cho images
<img src="placeholder.jpg" data-src="image.jpg" loading="lazy" />;

// ✅ Dùng dynamic imports cho modules
const module = await import("./heavy-module.js");

// ✅ Dùng React.lazy cho components
const LazyComponent = React.lazy(() => import("./HeavyComponent"));

// ✅ Dùng Intersection Observer cho custom lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadContent(entry.target);
    }
  });
});
```

---

## Use Cases & Patterns

### Common Performance Patterns:

```javascript
// 1. Debounce cho event handlers
const debouncedSearch = debounce(search, 300);
input.addEventListener("input", debouncedSearch);

// 2. Throttle cho scroll events
const throttledScroll = throttle(handleScroll, 100);
window.addEventListener("scroll", throttledScroll);

// 3. Memoization cho expensive operations
const memoizedFibonacci = memoize(fibonacci);

// 4. Virtual scrolling cho large lists
function VirtualList({ items, itemHeight, visibleCount }) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = items.slice(
    Math.floor(scrollTop / itemHeight),
    Math.floor(scrollTop / itemHeight) + visibleCount,
  );

  return (
    <div
      style={{ height: items.length * itemHeight, overflow: "auto" }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: "relative" }}>
        {visibleItems.map((item, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: (Math.floor(scrollTop / itemHeight) + i) * itemHeight,
              height: itemHeight,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. Code splitting
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));

// 6. Image optimization
<img
  src="image.webp"
  srcSet="image-320w.webp 320w, image-640w.webp 640w"
  sizes="(max-width: 640px) 320px, 640px"
  loading="lazy"
/>;

// 7. RequestAnimationFrame cho animations
function animate() {
  update();
  requestAnimationFrame(animate);
}

// 8. Web Workers cho heavy computations
const worker = new Worker("worker.js");
worker.postMessage({ data: largeData });
worker.onmessage = (e) => {
  console.log("Result:", e.data);
};
```

---

## Anti-patterns cần tránh

```javascript
// ❌ DOM manipulation trong loops
for (let i = 0; i < 1000; i++) {
  document.body.innerHTML += "<div>Item</div>";
}

// ✅ Batch DOM operations
let html = "";
for (let i = 0; i < 1000; i++) {
  html += "<div>Item</div>";
}
document.body.innerHTML = html;

// ❌ Memory leaks với closures
function createHandler() {
  const largeData = new Array(1000000).fill(0);
  return function () {
    console.log("Clicked");
  };
}

// ✅ Avoid giữ large references trong closures
function createHandler() {
  return function () {
    console.log("Clicked");
  };
}

// ❌ Unnecessary re-renders
function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveComponent />
    </div>
  );
}

// ✅ Memoize expensive components
const ExpensiveComponent = memo(function ExpensiveComponent() {
  // ...
});
```

---

_References: [MDN Performance](https://developer.mozilla.org/en-US/docs/Web/Performance), [V8 Internals](https://v8.dev/docs), [Web Performance](https://web.dev/fast/)_
