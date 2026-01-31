# 33. Implement `throttle` / Triển Khai Throttle

## Tổng quan về Throttle

### Mục đích của Throttle / Purpose

**Throttle** là kỹ thuật limit execution rate của function bằng cách execute function tại most một lần trong mỗi khoảng thời gian.

**Mục đích chính:**

- Limit function execution rate
- Optimize performance
- Reduce unnecessary calls
- Improve user experience

### Khi nào nên dùng / When to Use

- Khi handle scroll events
- Khi handle resize events
- Khi handle mousemove events
- Khi muốn limit execution rate

### Giúp ích gì / Benefits

**Lợi ích:**

- **Performance**: Giảm function calls
- **Consistent**: Execute đều đặn
- **UX**: Better user experience
- **Efficient**: More efficient code

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm     | Giải thích             |
| ----------- | ---------------------- |
| Performance | Giảm function calls    |
| Consistent  | Execute đều đặn        |
| UX          | Better user experience |
| Efficient   | More efficient code    |

**Nhược điểm (Cons):**

| Nhược điểm    | Giải thích                 |
| ------------- | -------------------------- |
| Delay         | Có thể có delay            |
| Complexity    | Code phức tạp hơn          |
| Not all calls | Không execute tất cả calls |

---

## Implement `throttle`?

**Implement `throttle`** là viết function để throttle function calls.

### Mục đích / Purpose

- Tạo throttle function
- Limit function execution rate
- Handle leading/trailing edge

### Khi nào dùng / When to Use

- Khi cần throttle function
- Khi handle scroll/resize events
- Khi handle mousemove events

### Ví dụ:

```javascript
// Method 1: Basic throttle implementation
function throttle(func, limit) {
  let inThrottle;

  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Usage
const throttledScroll = throttle(() => {
  console.log("Scrolled");
}, 100);

window.addEventListener("scroll", throttledScroll);

// Method 2: Throttle với trailing edge
function throttle(func, limit) {
  let lastFunc;
  let lastRan;

  return function (...args) {
    const context = this;

    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan),
      );
    }
  };
}

// Method 3: Throttle với leading và trailing options
function throttle(func, limit, { leading = true, trailing = true } = {}) {
  let timeoutId;
  let lastArgs;
  let lastThis;
  let lastCallTime = 0;

  const throttled = function (...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;

    // Execute immediately if leading enabled và first call
    if (leading && timeSinceLastCall >= limit) {
      func.apply(this, args);
      lastCallTime = now;
      return;
    }

    // Schedule trailing call
    lastArgs = args;
    lastThis = this;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (trailing) {
        func.apply(lastThis, lastArgs);
      }
      lastCallTime = Date.now();
    }, limit - timeSinceLastCall);
  };

  // Add cancel method
  throttled.cancel = function () {
    clearTimeout(timeoutId);
  };

  // Add flush method
  throttled.flush = function () {
    clearTimeout(timeoutId);
    if (trailing) {
      func.apply(lastThis, lastArgs);
    }
  };

  return throttled;
}

// Method 4: Throttle cho async functions
function throttleAsync(func, limit) {
  let inThrottle = false;
  let lastArgs;

  return async function (...args) {
    lastArgs = args;

    if (!inThrottle) {
      inThrottle = true;
      await func.apply(this, args);
      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          func.apply(this, lastArgs);
          lastArgs = null;
        }
      }, limit);
    }
  };
}

// Usage
const throttledFetch = throttleAsync(async (data) => {
  const response = await fetch("/api/data", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}, 1000);
```

### Best Practices:

```javascript
// ✅ Dùng throttle cho scroll events
const throttledScroll = throttle(handleScroll, 100);
window.addEventListener("scroll", throttledScroll);

// ✅ Dùng throttle cho resize events
const throttledResize = throttle(handleResize, 200);
window.addEventListener("resize", throttledResize);

// ✅ Dùng throttle cho mousemove events
const throttledMouseMove = throttle(handleMouseMove, 50);
element.addEventListener("mousemove", throttledMouseMove);

// ✅ Dùng appropriate limit
// Scroll: 100ms
// Resize: 200ms
// Mousemove: 50ms

// ✅ Dùng cancel method khi cần
const throttledFn = throttle(fn, 100);
throttledFn.cancel();

// ❌ Tránh quá short limit (vẫn nhiều calls)
const badThrottle = throttle(fn, 10); // Too short

// ❌ Tránh quá long limit (khó thấy changes)
const badThrottle = throttle(fn, 2000); // Too long
```

---

## Test Cases

```javascript
// Test 1: Basic throttle
let callCount = 0;
const throttledFn = throttle(() => {
  callCount++;
}, 100);

// Make multiple calls
throttledFn();
throttledFn();
throttledFn();

setTimeout(() => {
  console.log(callCount); // 1 (execute 1 lần trong 100ms)
}, 50);

setTimeout(() => {
  console.log(callCount); // 2 (execute lần nữa sau 100ms)
}, 150);

// Test 2: Throttle với trailing edge
let callCount = 0;
const throttledFn = throttle(() => {
  callCount++;
}, 100);

throttledFn();
setTimeout(() => throttledFn(), 50);
setTimeout(() => throttledFn(), 150);

setTimeout(() => {
  console.log(callCount); // 2 (execute 2 lần)
}, 200);

// Test 3: Throttle cancel
let callCount = 0;
const throttledFn = throttle(() => {
  callCount++;
}, 100);

throttledFn();
throttledFn.cancel(); // Cancel pending call

setTimeout(() => {
  console.log(callCount); // 1 (execute 1 lần)
}, 150);

// Test 4: Throttle với this context
const obj = {
  value: "test",
  method: throttle(function () {
    console.log(this.value);
  }, 100),
};

obj.method(); // 'test'

// Test 5: Throttle với async function
let callCount = 0;
const throttledFn = throttleAsync(async () => {
  callCount++;
  await new Promise((resolve) => setTimeout(resolve, 10));
}, 100);

throttledFn();
throttledFn();
throttledFn();

setTimeout(() => {
  console.log(callCount); // 1 (execute 1 lần)
}, 50);
```

---

## Complete Implementation

```javascript
/**
 * Throttle function execution
 * @param {Function} func - Function to throttle
 * @param {number} limit - Minimum time between executions in milliseconds
 * @param {Object} [options={}] - Throttle options
 * @param {boolean} [options.leading=true] - Execute on leading edge
 * @param {boolean} [options.trailing=true] - Execute on trailing edge
 * @returns {Function} Throttled function with cancel/flush methods
 */
function throttle(func, limit, options = {}) {
  const { leading = true, trailing = true } = options;

  let timeoutId;
  let lastArgs;
  let lastThis;
  let lastCallTime = 0;

  const throttled = function (...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;

    // Execute immediately if leading enabled và first call
    if (leading && timeSinceLastCall >= limit) {
      func.apply(this, args);
      lastCallTime = now;
      return;
    }

    // Schedule trailing call
    lastArgs = args;
    lastThis = this;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (trailing) {
        func.apply(lastThis, lastArgs);
      }
      lastCallTime = Date.now();
    }, limit - timeSinceLastCall);
  };

  // Add cancel method
  throttled.cancel = function () {
    clearTimeout(timeoutId);
  };

  // Add flush method (execute immediately)
  throttled.flush = function () {
    clearTimeout(timeoutId);
    if (trailing) {
      func.apply(lastThis, lastArgs);
    }
  };

  // Add pending method (check if pending)
  throttled.pending = function () {
    return timeoutId !== null;
  };

  return throttled;
}

// Usage examples

// Example 1: Scroll event
const throttledScroll = throttle(() => {
  const scrollTop = window.scrollY;
  console.log("Scrolled to:", scrollTop);
}, 100);

window.addEventListener("scroll", throttledScroll);

// Example 2: Resize event
const throttledResize = throttle(() => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  console.log("Resized to:", width, "x", height);
}, 200);

window.addEventListener("resize", throttledResize);

// Example 3: Mousemove event
const throttledMouseMove = throttle((e) => {
  const x = e.clientX;
  const y = e.clientY;
  console.log("Mouse moved to:", x, y);
}, 50);

element.addEventListener("mousemove", throttledMouseMove);

// Example 4: Throttle với no trailing
const throttledScroll = throttle(
  () => {
    console.log("Scrolled");
  },
  100,
  { trailing: false },
);

window.addEventListener("scroll", throttledScroll);

// Example 5: Throttle với no leading
const throttledScroll = throttle(
  () => {
    console.log("Scrolled");
  },
  100,
  { leading: false },
);

window.addEventListener("scroll", throttledScroll);

// Example 6: Cancel pending call
const throttledApiCall = throttle(async (data) => {
  const response = await fetch("/api/data", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}, 1000);

// Make call
throttledApiCall({ data: "test" });

// Cancel before execute
throttledApiCall.cancel();

// Example 7: Flush pending call
const throttledApiCall = throttle(async (data) => {
  const response = await fetch("/api/data", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}, 1000);

// Make call
throttledApiCall({ data: "test" });

// Flush immediately
const result = await throttledApiCall.flush();
```

---

## Use Cases

```javascript
// 1: Scroll event handler
const throttledScroll = throttle(() => {
  const scrollTop = window.scrollY;
  updateActiveSection(scrollTop);
}, 100);

window.addEventListener("scroll", throttledScroll);

// 2: Resize event handler
const throttledResize = throttle(() => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  updateLayout(width, height);
}, 200);

window.addEventListener("resize", throttledResize);

// 3: Mousemove event handler
const throttledMouseMove = throttle((e) => {
  const x = e.clientX;
  const y = e.clientY;
  updateCursorPosition(x, y);
}, 50);

element.addEventListener("mousemove", throttledMouseMove);

// 4: API rate limiting
const apiCall = throttle(async (data) => {
  const response = await fetch("/api/data", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}, 1000);

// Make multiple calls
apiCall({ data: "test1" });
apiCall({ data: "test2" });
apiCall({ data: "test3" });
// Executes every 1000ms

// 5: Game loop
const throttledUpdate = throttle(() => {
  updateGame();
}, 16); // ~60fps

requestAnimationFrame(throttledUpdate);

// 6: Progress indicator
const throttledProgress = throttle((progress) => {
  updateProgressBar(progress);
}, 100);

// Update progress frequently
for (let i = 0; i <= 100; i++) {
  throttledProgress(i);
}
```

---

## Anti-patterns cần tránh

```javascript
// ❌ Không dùng throttle cho critical actions
const submitButton = document.getElementById("submit");
const throttledSubmit = throttle(submitForm, 300);
submitButton.addEventListener("click", throttledSubmit);
// Bad - user expects immediate action

// ✅ Dùng debounce hoặc không limit cho critical actions
submitButton.addEventListener("click", submitForm);

// ❌ Quên cancel pending calls khi component unmount
function Component() {
  const throttledScroll = throttle(handleScroll, 100);

  useEffect(() => {
    return () => {
      throttledScroll.cancel(); // Cleanup
    };
  }, []);
}

// ✅ Luôn cleanup khi component unmount

// ❌ Dùng quá short limit
const badThrottle = throttle(fn, 10); // Too short

// ✅ Dùng appropriate limit
const goodThrottle = throttle(fn, 100);

// ❌ Dùng quá long limit
const badThrottle = throttle(fn, 2000); // Too long

// ✅ Dùng appropriate limit
const goodThrottle = throttle(fn, 100);
```

---

## Throttle vs Debounce

```javascript
// Throttle: Execute at most once per X ms
const throttledFn = throttle(fn, 100);
// Calls: 0ms, 50ms, 150ms, 200ms
// Executes: 0ms, 150ms, 200ms (every ~100ms)

// Debounce: Execute only after X ms of no calls
const debouncedFn = debounce(fn, 100);
// Calls: 0ms, 50ms, 150ms, 200ms
// Executes: 300ms (after 100ms of no calls)

// When to use throttle:
// - Scroll events (want consistent updates)
// - Resize events (want consistent updates)
// - Mousemove events (want consistent updates)

// When to use debounce:
// - Search input (wait for user to finish typing)
// - Autocomplete (wait for user to finish typing)
// - Form validation (wait for user to finish typing)
```

---

_References: [Debounce vs Throttle](https://css-tricks.com/debouncing-throttling-explained-examples/), [Lodash throttle](https://lodash.com/docs/4.17.15#throttle)_
