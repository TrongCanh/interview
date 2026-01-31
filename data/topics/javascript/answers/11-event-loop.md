# 11. Event Loop

## Tổng quan về Event Loop

### Mục đích của Event Loop / Purpose

**Event Loop** là cơ chế cho phép JavaScript thực thi code không blocking bằng cách quản lý việc thực thi synchronous và asynchronous operations.

**Mục đích chính:**

- Non-blocking execution
- Async operations
- Event-driven architecture
- Single-threaded execution

### Khi nào cần hiểu về Event Loop / When to Use

Hiểu về Event Loop là cần thiết khi:

- Xử lý async operations
- Hiểu performance
- Debug async code
- Event-driven programming

### Giúp ích gì / Benefits

**Lợi ích:**

- **Non-blocking**: Không blocking main thread
- **Async handling**: Xử lý async operations
- **Event-driven**: Event-driven architecture
- **Performance**: Tối ưu performance

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm                     |
| --------------- | ------------------------------ |
| Non-blocking    | Có thể khó debug               |
| Async handling  | Callback hell                  |
| Event-driven    | Learning curve                 |
| Single-threaded | Có thể chậm hơn multi-threaded |

---

## Event Loop là gì?

**Event Loop** là cơ chế cho phép JavaScript thực thi code không blocking bằng cách quản lý việc thực thi synchronous và asynchronous operations.

### Mục đích / Purpose

**Event Loop** được thiết kế để:

- Non-blocking execution
- Async operations
- Event-driven architecture
- Single-threaded execution

### Khi nào cần hiểu về Event Loop / When to Use

Event Loop nên dùng khi:

- Xử lý async operations
- Hiểu performance
- Debug async code
- Event-driven programming

### Giúp ích gì / Benefits

**Lợi ích:**

- **Non-blocking**: Không blocking main thread
- **Async handling**: Xử lý async operations
- **Event-driven**: Event-driven architecture
- **Performance**: Tối ưu performance

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm                     |
| --------------- | ------------------------------ |
| Non-blocking    | Có thể khó debug               |
| Async handling  | Callback hell                  |
| Event-driven    | Learning curve                 |
| Single-threaded | Có thể chậm hơn multi-threaded |

### Cơ chế Event Loop:

```
┌─────────────────────────────────────┐
│          Call Stack                 │
├─────────────────────────────────────┤
│          Web APIs                 │
├─────────────────────────────────────┤
│      Callback Queue (Task Queue)   │
├─────────────────────────────────────┤
│      Microtask Queue              │
├─────────────────────────────────────┤
│          Event Loop                │
└─────────────────────────────────────┘
```

### Quy trình hoạt động:

```javascript
// 1. Code synchronous chạy trong Call Stack
console.log("Start");

// 2. Async operations được đẩy vào Web APIs
setTimeout(() => {
  console.log("Timeout");
}, 0);

// 3. Code synchronous tiếp tục chạy
console.log("End");

// 4. Callbacks được đẩy vào Task Queue
Promise.resolve().then(() => {
  console.log("Promise");
});

// 5. Microtasks được đẩy vào Microtask Queue
Promise.resolve().then(() => {
  console.log("Microtask");
});

// Output:
// 'Start'
// 'End'
// 'Microtask' (chạy trước Task Queue)
// 'Promise' (chạy sau Microtasks)
```

### Best Practices:

```javascript
// ✅ Hiểu Event Loop giúp:
// - Tránh blocking code
// - Tối ưu performance
// - Debug async code

// ✅ Dùng microtasks cho:
// - Critical updates
// - DOM mutations
queueMicrotask(() => {
  updateUI();
});

// ✅ Dùng macrotasks cho:
// - Non-critical operations
setTimeout(() => {
  logData();
}, 0);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng blocking code
function blocking() {
  const start = Date.now();
  while (Date.now() - start < 5000) {
    // Blocking main thread!
  }
}

// ✅ Nên dùng async operations
async function nonBlocking() {
  await delay(5000);
}
```

---

## Call stack là gì?

**Call Stack** là nơi JavaScript theo dõi các function calls hiện tại.

### Mục đích / Purpose

**Call Stack** được thiết kế để:

- Theo dõi function calls
- Manage execution context
- Debug code
- Handle function returns

### Khi nào cần hiểu về Call Stack / When to Use

Hiểu về Call Stack là cần thiết khi:

- Debug code
- Hiểu function execution
- Debug stack overflow
- Hiểu recursion

### Giúp ích gì / Benefits

Hiểu về Call Stack giúp:

- **Debug**: Dễ dàng debug
- **Trace**: Theo dõi execution
- **Context**: Hiểu execution context
- **Overflow**: Hiểu stack overflow

### Ưu nhược điểm / Pros & Cons

| Ưu điểm          | Nhược điểm       |
| ---------------- | ---------------- |
| Debugging        | Có thể khó debug |
| Execution trace  | Verbose hơn      |
| Context tracking | Stack overflow   |

### Call Stack hoạt động:

```javascript
// Function calls được đẩy vào stack
function first() {
  console.log("First");
  second();
}

function second() {
  console.log("Second");
  third();
}

function third() {
  console.log("Third");
}

first();

// Stack khi thực thi:
// first() <- top
//   second()
//     third()
//     third() pop
//   second() pop
// first() pop
```

### Stack overflow:

```javascript
// Recursion quá sâu gây stack overflow
function recursive(n) {
  if (n === 0) return;
  return n + recursive(n - 1);
}

// recursive(10000);  // RangeError: Maximum call stack size exceeded
```

### Call Stack với async:

```javascript
// Async operations tạo stack mới
console.log("Start");

setTimeout(() => {
  console.log("Timeout callback");
  // Callback chạy trong stack mới
}, 0);

console.log("End");

// Stack 1:
// Start
// End

// Stack 2 (khi timeout callback chạy):
// Timeout callback
```

### Best Practices:

```javascript
// ✅ Dùng call stack để:
// - Debug code
// - Hiểu execution flow
// - Trace errors

// ✅ Tránh stack overflow:
// - Dùng iteration thay vì recursion sâu
function iterative(n) {
  let result = 0;
  for (let i = 1; i <= n; i++) {
    result += i;
  }
  return result;
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng recursion quá sâu
function deepRecursion(n) {
  if (n === 0) return 1;
  return n * deepRecursion(n - 1);
}

// ✅ Nên dùng iteration hoặc tail recursion
function tailRecursion(n, acc = 1) {
  if (n <= 1) return acc;
  return tailRecursion(n - 1, n * acc);
}
```

---

## Callback queue (Task queue) là gì?

**Callback Queue** (hay còn gọi là Task Queue) là nơi các callback được chờ để được thực thi sau Call Stack trống.

### Mục đích / Purpose

**Callback Queue** được thiết kế để:

- Chờ callbacks
- Execute sau Call Stack trống
- Event-driven execution
- Async operations

### Khi nào dùng / When to Use

Callback Queue được dùng khi:

- Async operations
- Event handlers
- Timer callbacks
- I/O operations

### Giúp ích gì / Benefits

**Lợi ích:**

- **Async handling**: Xử lý async operations
- **Non-blocking**: Không blocking main thread
- **Event-driven**: Event-driven architecture
- **Queue**: FIFO execution

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm                |
| -------------- | ------------------------- |
| Async handling | Callback hell             |
| Non-blocking   | Có thể chậm hơn immediate |
| Event-driven   | Learning curve            |
| FIFO execution | Không có priority         |

### Task Queue hoạt động:

```javascript
console.log("1. Script start");

setTimeout(() => {
  console.log("2. Timeout 1");
}, 1000);

setTimeout(() => {
  console.log("3. Timeout 2");
}, 500);

console.log("4. Script end");

// Task Queue sau 500ms:
// [Timeout 2 callback]

// Task Queue sau 1000ms:
// [Timeout 1 callback, Timeout 2 callback]

// Output:
// '1. Script start'
// '4. Script end'
// '3. Timeout 2'
// '2. Timeout 1'
```

### Best Practices:

```javascript
// ✅ Hiểu Task Queue giúp:
// - Debug async code
// - Hiểu execution order
// - Tối ưu performance

// ✅ Dùng setTimeout cho:
// - Non-blocking operations
// - Delayed execution
// - Async tasks
setTimeout(() => {
  updateUI();
}, 100);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng blocking code
while (Date.now() - start < 5000) {
  // Blocking main thread!
}

// ✅ Nên dùng async operations
async function nonBlocking() {
  await delay(5000);
}
```

---

## Microtask queue vs Macrotask queue?

### Microtask Queue:

- [`Promise.then()`](interview-practice/topics/javascript/answers/09-promises.md:1) / [`Promise.catch()`](interview-practice/topics/javascript/answers/09-promises.md:1)
- [`queueMicrotask()`](interview-practice/topics/javascript/answers/11-event-loop.md:1)
- [`MutationObserver`](interview-practice/topics/javascript/answers/11-event-loop.md:1)

### Macrotask Queue (Task Queue):

- [`setTimeout()`](interview-practice/topics/javascript/answers/11-event-loop.md:1)
- [`setInterval()`](interview-practice/topics/javascript/answers/11-event-loop.md:1)
- [`setImmediate()`](interview-practice/topics/javascript/answers/11-event-loop.md:1) (Node.js)
- I/O operations
- UI rendering

### Thứ tự thực thi:

```javascript
console.log("1. Script start");

Promise.resolve().then(() => {
  console.log("3. Promise 1");
});

Promise.resolve().then(() => {
  console.log("4. Promise 2");
});

setTimeout(() => {
  console.log("2. Timeout");
}, 0);

console.log("5. Script end");

// Output:
// '1. Script start'
// '5. Script end'
// '3. Promise 1' (microtask)
// '4. Promise 2' (microtask)
// '2. Timeout' (macrotask)
```

### Microtasks trong microtasks:

```javascript
console.log("Start");

Promise.resolve().then(() => {
  console.log("Promise 1");

  Promise.resolve().then(() => {
    console.log("Promise 2 (nested)");
  });
});

console.log("End");

// Output:
// 'Start'
// 'Promise 1'
// 'Promise 2 (nested)'
// 'End'
```

### Macrotasks tạo microtasks:

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout start");

  Promise.resolve().then(() => {
    console.log("Microtask from timeout");
  });

  console.log("Timeout end");
}, 0);

console.log("End");

// Output:
// 'Start'
// 'End'
// 'Timeout start'
// 'Microtask from timeout'
// 'Timeout end'
```

### Best Practices:

```javascript
// ✅ Dùng microtasks cho:
// - Critical updates
// - DOM mutations
queueMicrotask(() => {
  updateUI();
});

// ✅ Dùng macrotasks cho:
// - Non-critical operations
setTimeout(() => {
  logData();
}, 0);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên tạo quá nhiều macrotasks
for (let i = 0; i < 1000; i++) {
  setTimeout(() => console.log(i), 0);
}

// ✅ Nên dùng requestAnimationFrame cho animations
requestAnimationFrame(() => {
  updateAnimation();
});
```

---

## Thứ tự thực thi: Microtasks vs Macrotasks?

### Quy tắc:

1. Chạy tất cả synchronous code
2. Chạy tất cả microtasks
3. Chạy một macrotask
4. Lặp lại từ bước 2

### Ví dụ phức tạp:

```javascript
console.log("1. Script start");

setTimeout(() => {
  console.log("2. setTimeout 1");

  Promise.resolve().then(() => {
    console.log("3. Promise 1");
  });

  Promise.resolve().then(() => {
    console.log("4. Promise 2");
  });
}, 0);

setTimeout(() => {
  console.log("5. setTimeout 2");
}, 100);

Promise.resolve().then(() => {
  console.log("6. Promise 3");
});

console.log("7. Script end");

// Output:
// '1. Script start'
// '7. Script end'
// '3. Promise 1' (microtask)
// '4. Promise 2' (microtask)
// '2. setTimeout 1' (macrotask)
// '6. Promise 3' (microtask)
// '5. setTimeout 2' (macrotask)
```

### Best Practices:

```javascript
// ✅ Hiểu thứ tự thực thi giúp:
// - Debug async code
// - Tối ưu performance
// - Predictable behavior

// ✅ Dùng microtasks cho:
// - Critical updates
Promise.resolve().then(() => {
  updateUI();
});

// ✅ Dùng macrotasks cho:
// - Non-critical operations
setTimeout(() => {
  logData();
}, 100);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên phụ thuộc vào thứ tự thực thi không rõ
function unpredictable() {
  setTimeout(() => {
    console.log("First");
  }, Math.random() * 1000);

  setTimeout(() => {
    console.log("Second");
  }, Math.random() * 1000);
}

// ✅ Nên dùng Promise.all cho predictable order
Promise.all([doFirst(), doSecond()]).then(([first, second]) => {
  console.log("First:", first);
  console.log("Second:", second);
});
```

---

## `setTimeout`, `setImmediate`, `process.nextTick` (Node.js)?

### `setTimeout()` - Macrotask (Browser và Node.js):

```javascript
// Browser và Node.js
console.log("Start");

setTimeout(() => {
  console.log("Timeout callback");
}, 1000);

console.log("End");

// Output:
// 'Start'
// 'End'
// (sau ít nhất 4ms) 'Timeout callback'
```

### `setImmediate()` - Macrotask (Node.js):

```javascript
// Chỉ có trong Node.js
console.log("Start");

setImmediate(() => {
  console.log("Immediate callback");
});

console.log("End");

// Output (Node.js):
// 'Start'
// 'End'
// 'Immediate callback' (trong cùng event loop tick)
```

### `process.nextTick()` - Microtask (Node.js):

```javascript
// Chỉ có trong Node.js
console.log("Start");

process.nextTick(() => {
  console.log("nextTick callback");
});

console.log("End");

// Output (Node.js):
// 'Start'
// 'nextTick callback'
// 'End'
```

### So sánh trong Node.js:

```javascript
console.log("1. Start");

process.nextTick(() => {
  console.log("2. nextTick");
});

Promise.resolve().then(() => {
  console.log("4. Promise");
});

setImmediate(() => {
  console.log("3. setImmediate");
});

setTimeout(() => {
  console.log("5. setTimeout");
}, 0);

console.log("6. End");

// Output (Node.js):
// '1. Start'
// '6. End'
// '2. nextTick' (microtask cao nhất)
// '4. Promise' (microtask)
// '3. setImmediate' (macrotask)
// '5. setTimeout' (macrotask)
```

### Best Practices:

```javascript
// ✅ Dùng process.nextTick cho:
// - Critical updates
// - Before I/O
process.nextTick(() => {
  setupCritical();
});

// ✅ Dùng setImmediate cho:
// - Sau I/O
setImmediate(() => {
  processResults();
});

// ✅ Dùng setTimeout cho:
// - Delayed execution
setTimeout(() => {
  logData();
}, 1000);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng setTimeout(0) cho critical updates
setTimeout(() => {
  updateCriticalUI();
}, 0);

// ✅ Nên dùng process.nextTick
process.nextTick(() => {
  updateCriticalUI();
});
```

---

## `requestAnimationFrame`?

**`requestAnimationFrame`** - Macrotask được tối ưu cho animations, chạy trước khi browser render.

### Mục đích / Purpose

**`requestAnimationFrame`** được thiết kế để:

- Optimized cho animations
- Sync với browser rendering
- 60fps (thường)
- Dừng khi tab không active

### Khi nào dùng / When to Use

`requestAnimationFrame` nên dùng khi:

- Animations
- Smooth UI updates
- Frame-based rendering
- Performance-critical operations

### Giúp ích gì / Benefits

**Lợi ích:**

- **Optimized**: Optimized cho rendering
- **Sync with render**: Sync với browser rendering
- **60fps**: Smooth animations
- **Auto-pause**: Dừng khi tab không active

### Ưu nhược điểm / Pros & Cons

| Ưu điểm          | Nhược điểm                |
| ---------------- | ------------------------- |
| Optimized        | Không phù hợp mọi cases   |
| Sync with render | Có thể chậm hơn           |
| 60fps            | Không chính xác 60fps     |
| Auto-pause       | Browser support khác nhau |

### Basic usage:

```javascript
// Chạy trước mỗi frame
function animate() {
  console.log("Frame");
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// Output (khoảng 60 lần/giây):
// 'Frame'
// 'Frame'
// 'Frame'
// ...
```

### Ví dụ animation:

```javascript
let position = 0;

function animate() {
  position += 1;
  element.style.transform = `translateX(${position}px)`;

  if (position < 100) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);
```

### Cancel animation:

```javascript
let rafId;

function animate() {
  position += 1;
  element.style.transform = `translateX(${position}px)`;

  if (position < 100) {
    rafId = requestAnimationFrame(animate);
  }
}

rafId = requestAnimationFrame(animate);

// Cancel animation
cancelAnimationFrame(rafId);
```

### Best Practices:

```javascript
// ✅ Dùng requestAnimationFrame cho:
// - Animations
// - Smooth UI updates
// - Performance-critical operations
function animate() {
  requestAnimationFrame((timestamp) => {
    updateAnimation(timestamp);
  });
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng setTimeout cho animations
setTimeout(() => {
  updateAnimation();
}, 16); // ~60fps nhưng không sync với render

// ✅ Nên dùng requestAnimationFrame
function animate() {
  requestAnimationFrame((timestamp) => {
    updateAnimation(timestamp);
  });
}
```

---

## `requestIdleCallback`?

**`requestIdleCallback`** - Chạy callback khi browser idle (có thời gian rảnh).

### Mục đích / Purpose

**`requestIdleCallback`** được thiết kế để:

- Chạy khi browser idle
- Không block main thread
- Background tasks
- Performance optimization

### Khi nào dùng / When to Use

`requestIdleCallback` nên dùng khi:

- Background tasks
- Analytics tracking
- Preloading data
- Cleanup operations

### Giúp ích gì / Benefits

**Lợi ích:**

- **Non-blocking**: Không block main thread
- **Idle time**: Dùng idle time
- **Performance**: Tối ưu performance
- **Background**: Background tasks

### Ưu nhược điểm / Pros & Cons

| Ưu điểm      | Nhược điểm                  |
| ------------ | --------------------------- | ---------------------- |
| Non-blocking | Không được gọi ngay lập tức | Verbose hơn            |
| Idle time    | Browser support khác nhau   | Không đảm bảo thực thi |
| Performance  | Có thể chậm hơn immediate   | Learning curve         |

### Basic usage:

```javascript
// Chạy khi browser idle
requestIdleCallback((deadline) => {
  console.log("Idle callback");
  console.log("Time remaining:", deadline.timeRemaining());

  while (deadline.timeRemaining() > 0 && tasks.length > 0) {
    doTask(tasks.shift());
  }
});
```

### Options:

```javascript
// Timeout - đảm bảo callback được gọi
requestIdleCallback(
  (deadline) => {
    console.log("Idle callback");
  },
  { timeout: 2000 }, // Gọi sau 2 giây nếu không idle
);
```

### Best Practices:

```javascript
// ✅ Dùng requestIdleCallback cho:
// - Analytics tracking
// - Preloading data
// - Cleanup operations
requestIdleCallback((deadline) => {
  sendAnalytics();
});
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng requestIdleCallback cho critical tasks
requestIdleCallback((deadline) => {
  updateCriticalUI(); // Có thể không được gọi ngay
});

// ✅ Nên dùng cho:
// - Analytics
// - Preloading
// - Cleanup
requestIdleCallback((deadline) => {
  trackEvent(event);
});
```

---

## Zero-delay `setTimeout(fn, 0)`?

**`setTimeout(fn, 0)`** - Đẩy callback vào Task Queue với delay tối thiểu (không phải 0ms).

### Mục đích / Purpose

**Zero-delay `setTimeout`** được thiết kế để:

- Defer execution đến sau sync code
- Break up long-running tasks
- Ensure DOM is ready
- Yield to browser

### Khi nào dùng / When to Use

Zero-delay `setTimeout` nên dùng khi:

- Defer execution
- Break up long tasks
- Ensure DOM ready
- Yield to browser

### Giúp ích gì / Benefits

**Lợi ích:**

- **Defer execution**: Chạy sau sync code
- **Non-blocking**: Không blocking
- **Performance**: Tối ưu rendering
- **Yield**: Yield cho browser

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm                |
| --------------- | ------------------------- | --------------- |
| Defer execution | Không chính xác thời gian | Có thể gây bugs |
| Non-blocking    | Có thể chậm hơn immediate | Verbose hơn     |

### Ví dụ:

```javascript
console.log("1. Start");

setTimeout(() => {
  console.log("2. Timeout 0");
}, 0);

console.log("3. End");

// Output:
// '1. Start'
// '3. End'
// (sau ít nhất 4ms) '2. Timeout 0'
```

### So sánh với Promise:

```javascript
console.log("1. Start");

setTimeout(() => {
  console.log("2. setTimeout 0");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise.then");
});

console.log("4. End");

// Output:
// '1. Start'
// '4. End'
// '3. Promise.then' (microtask, chạy trước setTimeout)
// '2. setTimeout 0' (macrotask, chạy sau)
```

### Use cases:

```javascript
// 1. Defer execution đến sau sync code
function process() {
  // Sync code
  console.log("Sync code");

  // Defer async code
  setTimeout(() => {
    console.log("Async code");
  }, 0);
}

// 2. Break up long-running tasks
function processLargeArray(array) {
  const chunkSize = 1000;
  let index = 0;

  function processChunk() {
    const chunk = array.slice(index, index + chunkSize);
    processItems(chunk);

    index += chunkSize;

    if (index < array.length) {
      setTimeout(processChunk, 0); // Defer tiếp
    }
  }

  processChunk();
}

// 3. Ensure DOM is ready
function whenDOMReady(callback) {
  if (document.readyState === "complete") {
    callback();
  } else {
    setTimeout(() => whenDOMReady(callback), 0);
  }
}
```

### Best Practices:

```javascript
// ✅ Dùng setTimeout(0) cho:
// - Defer execution
// - Break up long tasks
// - Yield to browser
function processData() {
  console.log("Sync code");

  setTimeout(() => {
    console.log("Async code");
  }, 0);
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng setTimeout(0) cho critical updates
setTimeout(() => {
  updateCriticalUI(); // Có thể delay quá nhiều
}, 0);

// ✅ Nên dùng Promise.then cho critical updates
Promise.resolve().then(() => {
  updateCriticalUI(); // Chạy trong microtask
});
```
