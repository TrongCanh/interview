# 32. Implement `debounce` / Triển Khai Debounce

## Tổng quan về Debounce

### Mục đích của Debounce / Purpose

**Debounce** là kỹ thuật delay execution của function cho đến khi không có new calls được thực hiện trong một khoảng thời gian.

**Mục đích chính:**

- Limit function execution rate
- Optimize performance
- Reduce unnecessary API calls
- Improve user experience

### Khi nào nên dùng / When to Use

- Khi handle user input (search, autocomplete)
- Khi handle scroll events
- Khi handle resize events
- Khi muốn limit API calls

### Giúp ích gì / Benefits

**Lợi ích:**

- **Performance**: Giảm số lượng function calls
- **API calls**: Giảm API calls
- **UX**: Better user experience
- **Efficiency**: More efficient code

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm     | Giải thích             |
| ----------- | ---------------------- |
| Performance | Giảm function calls    |
| API calls   | Giảm API calls         |
| UX          | Better user experience |
| Efficient   | More efficient code    |

**Nhược điểm (Cons):**

| Nhược điểm    | Giải thích                 |
| ------------- | -------------------------- |
| Delay         | Có delay trước khi execute |
| Complexity    | Code phức tạp hơn          |
| Not immediate | Không execute ngay lập tức |

---

## Implement `debounce`?

**Implement `debounce`** là viết function để debounce function calls.

### Mục đích / Purpose

- Tạo debounce function
- Limit function execution rate
- Handle leading/trailing edge

### Khi nào dùng / When to Use

- Khi cần debounce function
- Khi handle user input
- Khi handle scroll/resize events

### Ví dụ:

```javascript
// Method 1: Basic debounce implementation
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage
const debouncedSearch = debounce((query) => {
  console.log("Searching for:", query);
  // API call...
}, 300);

searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});

// Method 2: Debounce với immediate option (leading edge)
function debounce(func, delay, immediate = false) {
  let timeoutId;
  let result;

  const debounced = function (...args) {
    const callNow = immediate && !timeoutId;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) {
        result = func.apply(this, args);
      }
    }, delay);

    if (callNow) {
      result = func.apply(this, args);
    }

    return result;
  };

  debounced.cancel = function () {
    clearTimeout(timeoutId);
    timeoutId = null;
  };

  return debounced;
}

// Usage
const debouncedSearch = debounce(
  (query) => {
    console.log("Searching for:", query);
  },
  300,
  true,
);

// Method 3: Debounce với result return
function debounce(func, delay) {
  let timeoutId;
  let result;

  return function (...args) {
    const context = this;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      timeoutId = null;
      result = func.apply(context, args);
    }, delay);

    return result;
  };
}

// Method 4: Debounce với cancel method
function debounce(func, delay) {
  let timeoutId;

  const debounced = function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };

  debounced.cancel = function () {
    clearTimeout(timeoutId);
  };

  return debounced;
}

// Usage với cancel
const debouncedSearch = debounce(search, 300);
debouncedSearch("query");
debouncedSearch.cancel(); // Cancel pending call

// Method 5: Debounce cho async functions
function debounceAsync(func, delay) {
  let timeoutId;
  let latestArgs;

  return async function (...args) {
    latestArgs = args;
    clearTimeout(timeoutId);

    return new Promise((resolve) => {
      timeoutId = setTimeout(async () => {
        const result = await func.apply(this, latestArgs);
        resolve(result);
      }, delay);
    });
  };
}

// Usage
const debouncedFetch = debounceAsync(async (query) => {
  const response = await fetch(`/api/search?q=${query}`);
  return response.json();
}, 300);
```

### Best Practices:

```javascript
// ✅ Dùng debounce cho search input
const debouncedSearch = debounce(search, 300);
searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});

// ✅ Dùng debounce cho scroll events
const debouncedScroll = debounce(handleScroll, 100);
window.addEventListener("scroll", debouncedScroll);

// ✅ Dùng debounce cho resize events
const debouncedResize = debounce(handleResize, 200);
window.addEventListener("resize", debouncedResize);

// ✅ Dùng cancel method khi cần
const debouncedSearch = debounce(search, 300);
debouncedSearch.cancel();

// ✅ Dùng appropriate delay
// Search: 300ms
// Scroll: 100ms
// Resize: 200ms

// ❌ Tránh quá short delay (vẫn nhiều calls)
const badDebounce = debounce(search, 10); // Too short

// ❌ Tránh quá long delay (user experience bad)
const badDebounce = debounce(search, 2000); // Too long
```

---

## Test Cases

```javascript
// Test 1: Basic debounce
let callCount = 0;
const debouncedFn = debounce(() => {
  callCount++;
}, 100);

debouncedFn();
debouncedFn();
debouncedFn();

setTimeout(() => {
  console.log(callCount); // 1 (chỉ execute 1 lần sau 100ms)
}, 150);

// Test 2: Debounce với delay
let lastCallTime = 0;
const debouncedFn = debounce(() => {
  lastCallTime = Date.now();
}, 100);

const startTime = Date.now();
debouncedFn();
setTimeout(() => debouncedFn(), 50);
setTimeout(() => debouncedFn(), 100);

setTimeout(() => {
  console.log(lastCallTime - startTime); // ~200ms
}, 300);

// Test 3: Debounce cancel
let callCount = 0;
const debouncedFn = debounce(() => {
  callCount++;
}, 100);

debouncedFn();
debouncedFn.cancel(); // Cancel pending call

setTimeout(() => {
  console.log(callCount); // 0 (không execute)
}, 150);

// Test 4: Debounce với immediate
let callCount = 0;
const debouncedFn = debounce(
  () => {
    callCount++;
  },
  100,
  true,
);

debouncedFn();
console.log(callCount); // 1 (execute immediately)

debouncedFn();
debouncedFn();

setTimeout(() => {
  console.log(callCount); // 2 (execute 2 lần)
}, 150);

// Test 5: Debounce với this context
const obj = {
  value: "test",
  method: debounce(function () {
    console.log(this.value);
  }, 100),
};

obj.method(); // 'test'
```

---

## Complete Implementation

```javascript
/**
 * Debounce function execution
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @param {boolean} [immediate=false] - Execute on leading edge
 * @returns {Function} Debounced function with cancel method
 */
function debounce(func, delay, immediate = false) {
  let timeoutId;
  let result;

  const debounced = function (...args) {
    const context = this;
    const callNow = immediate && !timeoutId;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) {
        result = func.apply(context, args);
      }
    }, delay);

    if (callNow) {
      result = func.apply(context, args);
    }

    return result;
  };

  // Add cancel method
  debounced.cancel = function () {
    clearTimeout(timeoutId);
    timeoutId = null;
  };

  // Add flush method (execute immediately)
  debounced.flush = function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
      result = func.apply(this, arguments);
    }
    return result;
  };

  // Add pending method (check if pending)
  debounced.pending = function () {
    return timeoutId !== null;
  };

  return debounced;
}

// Usage examples

// Example 1: Search input
const searchInput = document.getElementById("search");
const debouncedSearch = debounce(async (query) => {
  const response = await fetch(`/api/search?q=${query}`);
  const results = await response.json();
  displayResults(results);
}, 300);

searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});

// Example 2: Scroll event
const debouncedScroll = debounce(() => {
  const scrollTop = window.scrollY;
  console.log("Scrolled to:", scrollTop);
}, 100);

window.addEventListener("scroll", debouncedScroll);

// Example 3: Resize event
const debouncedResize = debounce(() => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  console.log("Resized to:", width, "x", height);
}, 200);

window.addEventListener("resize", debouncedResize);

// Example 4: Cancel pending call
const debouncedApiCall = debounce(async (data) => {
  const response = await fetch("/api/data", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}, 300);

// Make call
debouncedApiCall({ data: "test" });

// Cancel before execute
debouncedApiCall.cancel();

// Example 5: Flush pending call
const debouncedApiCall = debounce(async (data) => {
  const response = await fetch("/api/data", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}, 300);

// Make call
debouncedApiCall({ data: "test" });

// Flush immediately
const result = await debouncedApiCall.flush();
```

---

## Use Cases

```javascript
// 1. Search/Autocomplete
const searchInput = document.getElementById("search");
const debouncedSearch = debounce(async (query) => {
  if (query.length < 2) return;
  const response = await fetch(`/api/search?q=${query}`);
  const results = await response.json();
  showSuggestions(results);
}, 300);

searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});

// 2. Infinite scroll
const debouncedScroll = debounce(async () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollTop + windowHeight >= documentHeight - 100) {
    await loadMoreItems();
  }
}, 100);

window.addEventListener("scroll", debouncedScroll);

// 3. Resize handler
const debouncedResize = debounce(() => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  updateLayout(width, height);
}, 200);

window.addEventListener("resize", debouncedResize);

// 4. Form validation
const formInput = document.getElementById("email");
const debouncedValidate = debounce(async (email) => {
  const isValid = await validateEmail(email);
  showValidationResult(isValid);
}, 500);

formInput.addEventListener("input", (e) => {
  debouncedValidate(e.target.value);
});

// 5. API rate limiting
const apiCall = debounce(async (data) => {
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
// Only last call executes after 1000ms
```

---

## Anti-patterns cần tránh

```javascript
// ❌ Không dùng debounce cho critical actions
const submitButton = document.getElementById("submit");
const debouncedSubmit = debounce(submitForm, 300);
submitButton.addEventListener("click", debouncedSubmit);
// Bad - user expects immediate action

// ✅ Dùng throttle hoặc không limit cho critical actions
submitButton.addEventListener("click", submitForm);

// ❌ Quên cancel pending calls khi component unmount
function Component() {
  const debouncedSearch = debounce(search, 300);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel(); // Cleanup
    };
  }, []);
}

// ✅ Luôn cleanup khi component unmount

// ❌ Dùng quá short delay
const badDebounce = debounce(search, 10); // Too short

// ✅ Dùng appropriate delay
const goodDebounce = debounce(search, 300);

// ❌ Dùng quá long delay
const badDebounce = debounce(search, 2000); // Too long

// ✅ Dùng appropriate delay
const goodDebounce = debounce(search, 300);
```

---

_References: [Debounce vs Throttle](https://css-tricks.com/debouncing-throttling-explained-examples/), [Lodash debounce](https://lodash.com/docs/4.17.15#debounce)_
