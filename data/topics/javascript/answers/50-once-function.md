# 50. Implement `once` function / Triển khai hàm `once`

> Implement a function that only runs once / Triển khai hàm chỉ chạy một lần

---

## Overview / Tổng quan

`once` là một higher-order function nhận vào một function và trả về một function mới chỉ có thể thực thi một lần duy nhất. Các lần gọi sau sẽ trả về kết quả của lần gọi đầu tiên. Đây là pattern hữu ích cho initialization, event handlers, và các operations chỉ cần thực thi một lần.

`once` is a higher-order function that takes a function and returns a new function that can only execute once. Subsequent calls will return the result of the first call. This is a useful pattern for initialization, event handlers, and operations that only need to execute once.

## Purpose / Mục đích

- Hiểu sâu về cách hoạt động của `once` pattern
- Biết cách implement một function chỉ chạy một lần
- Nắm vững các khái niệm về closures và state management
- Hiểu về use cases cho once pattern

- Understand deeply how `once` pattern works
- Know how to implement a function that runs only once
- Master closures and state management concepts
- Understand use cases for once pattern

## When to Use / Khi nào nên dùng

- Khi cần initialization chỉ chạy một lần
- Khi muốn đảm bảo function không được gọi nhiều lần
- Khi cần cache kết quả của expensive operation
- Khi muốn prevent multiple event handlers execution

- When needing initialization that runs only once
- When wanting to ensure function is not called multiple times
- When needing to cache result of expensive operation
- When wanting to prevent multiple event handlers execution

## Benefits / Lợi ích

- Đảm bảo function chỉ chạy một lần
- Cache kết quả cho các lần gọi sau
- Giảm overhead cho các expensive operations
- Hữu ích cho initialization và setup

- Ensures function runs only once
- Caches result for subsequent calls
- Reduces overhead for expensive operations
- Useful for initialization and setup

## Pros & Cons / Ưu điểm & Nhược điểm

### Pros / Ưu điểm

- Đơn giản và dễ hiểu
- Tự động cache kết quả
- Giảm overhead cho các expensive operations
- Hữu ích cho nhiều use cases

- Simple and easy to understand
- Automatically caches result
- Reduces overhead for expensive operations
- Useful for many use cases

### Cons / Nhược điểm

- Không thể reset function
- Có thể gây confusion nếu không rõ behavior
- Không phù hợp cho các functions cần state thay đổi
- Có thể khó debug nếu không hiểu pattern

- Cannot reset the function
- Can cause confusion if behavior is not clear
- Not suitable for functions that need changing state
- Can be difficult to debug if pattern is not understood

## Examples / Ví dụ

### 1. Basic once implementation / Triển khai once cơ bản

```javascript
/**
 * Create a function that can only be executed once
 * Tạo một function chỉ có thể thực thi một lần
 * @param {Function} func - Function to wrap / Hàm cần wrap
 * @returns {Function} Function that executes only once / Function chỉ thực thi một lần
 */
function once(func) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = func.apply(this, args);
    }
    return result;
  };
}

// Example usage / Ví dụ sử dụng
const initialize = once(() => {
  console.log("Initializing...");
  return "Initialized";
});

console.log(initialize()); // Initializing... / Initialized
console.log(initialize()); // Initialized (no second log)
console.log(initialize()); // Initialized (no second log)
```

### 2. Once with error handling / Once với xử lý lỗi

```javascript
/**
 * Create a once function with error handling
 * Tạo hàm once với xử lý lỗi
 * @param {Function} func - Function to wrap / Hàm cần wrap
 * @returns {Function} Function that executes only once / Function chỉ thực thi một lần
 */
function onceWithErrorHandling(func) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      try {
        result = func.apply(this, args);
      } catch (error) {
        // Reset on error to allow retry / Reset khi có lỗi để cho phép thử lại
        called = false;
        throw error;
      }
    }
    return result;
  };
}

// Example / Ví dụ
let attemptCount = 0;

const riskyOperation = onceWithErrorHandling(() => {
  attemptCount++;
  console.log(`Attempt ${attemptCount}`);

  if (attemptCount < 3) {
    throw new Error("Operation failed");
  }

  return "Success";
});

try {
  riskyOperation();
} catch (error) {
  console.log("Error:", error.message);
}

try {
  riskyOperation();
} catch (error) {
  console.log("Error:", error.message);
}

const result = riskyOperation();
console.log("Result:", result);
// Output:
// Attempt 1
// Error: Operation failed
// Attempt 2
// Error: Operation failed
// Attempt 3
// Result: Success
```

### 3. Once with reset capability / Once với khả năng reset

```javascript
/**
 * Create a once function with reset capability
 * Tạo hàm once với khả năng reset
 * @param {Function} func - Function to wrap / Hàm cần wrap
 * @returns {Object} Object with once function and reset method / Object chứa hàm once và phương thức reset
 */
function onceWithReset(func) {
  let called = false;
  let result;

  const onceFunc = function (...args) {
    if (!called) {
      called = true;
      result = func.apply(this, args);
    }
    return result;
  };

  // Reset the function / Reset function
  onceFunc.reset = function () {
    called = false;
    result = undefined;
  };

  return onceFunc;
}

// Example usage / Ví dụ sử dụng
const setup = onceWithReset(() => {
  console.log("Setting up...");
  return "Setup complete";
});

console.log(setup()); // Setting up... / Setup complete
console.log(setup()); // Setup complete

// Reset and call again / Reset và gọi lại
setup.reset();
console.log(setup()); // Setting up... / Setup complete
```

### 4. Once for async functions / Once cho các hàm async

```javascript
/**
 * Create a once function for async functions
 * Tạo hàm once cho các hàm async
 * @param {Function} func - Async function to wrap / Hàm async cần wrap
 * @returns {Function} Async function that executes only once / Hàm async chỉ thực thi một lần
 */
function onceAsync(func) {
  let called = false;
  let resultPromise;

  return async function (...args) {
    if (!called) {
      called = true;
      resultPromise = func.apply(this, args);
    }
    return resultPromise;
  };
}

// Example usage / Ví dụ sử dụng
const fetchData = onceAsync(async () => {
  console.log("Fetching data...");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { data: "Sample data" };
});

const data1 = await fetchData(); // Fetching data...
const data2 = await fetchData(); // Returns cached result
console.log("Data 1:", data1);
console.log("Data 2:", data2);
```

### 5. Once for event handlers / Once cho event handlers

```javascript
/**
 * Create an event listener that only fires once
 * Tạo một event listener chỉ kích hoạt một lần
 * @param {HTMLElement} element - Element to attach listener to / Element để gắn listener
 * @param {string} event - Event name / Tên event
 * @param {Function} handler - Event handler / Event handler
 */
function addOnceListener(element, event, handler) {
  const onceHandler = once((e) => {
    handler(e);
    element.removeEventListener(event, onceHandler);
  });

  element.addEventListener(event, onceHandler);
}

// Example usage / Ví dụ sử dụng
const button = document.getElementById("myButton");

addOnceListener(button, "click", () => {
  console.log("Button clicked (only once)");
});

// Button click will only log once / Click button sẽ chỉ log một lần
```

### 6. Once for initialization / Once cho initialization

```javascript
/**
 * Initialize application only once
 * Khởi tạo application chỉ một lần
 */
const initializeApp = once(() => {
  console.log("Initializing application...");

  // Setup various components / Thiết lập các component khác nhau
  const config = loadConfig();
  const database = connectDatabase();
  const cache = setupCache();

  return {
    config,
    database,
    cache,
    initialized: true,
  };
});

// Multiple calls to initializeApp will only execute once
// Nhiều lần gọi initializeApp sẽ chỉ thực thi một lần
function handleRequest() {
  const app = initializeApp();
  // Use app components / Sử dụng các component của app
  return processData(app);
}
```

### 7. Once with validation / Once với validation

```javascript
/**
 * Create a once function with validation
 * Tạo hàm once với validation
 * @param {Function} func - Function to wrap / Hàm cần wrap
 * @param {Function} validator - Validation function / Hàm validation
 * @returns {Function} Function that executes only once if valid / Function chỉ thực thi một lần nếu hợp lệ
 */
function onceWithValidation(func, validator) {
  let called = false;
  let result;

  return function (...args) {
    if (!called && validator(...args)) {
      called = true;
      result = func.apply(this, args);
    }
    return result;
  };
}

// Example usage / Ví dụ sử dụng
const processPayment = onceWithValidation(
  (amount) => {
    console.log(`Processing payment of $${amount}`);
    return `Payment of $${amount} processed`;
  },
  (amount) => amount > 0 && amount <= 10000, // Validation
);

console.log(processPayment(100)); // Processing payment of $100 / Payment of $100 processed
console.log(processPayment(200)); // Payment of $100 processed (cached)
console.log(processPayment(-50)); // Payment of $100 processed (invalid, returns cached)
```

### 8. Once with multiple returns / Once với nhiều trả về

```javascript
/**
 * Create a once function that returns different values for first and subsequent calls
 * Tạo hàm once trả về các giá trị khác nhau cho lần gọi đầu tiên và các lần sau
 * @param {Function} func - Function to wrap / Hàm cần wrap
 * @param {*} fallbackValue - Value to return for subsequent calls / Giá trị trả về cho các lần gọi sau
 * @returns {Function} Function that executes only once / Function chỉ thực thi một lần
 */
function onceWithFallback(func, fallbackValue) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = func.apply(this, args);
      return result;
    }
    return fallbackValue;
  };
}

// Example usage / Ví dụ sử dụng
const sendMessage = onceWithFallback(() => {
  console.log("Sending message...");
  return "Message sent";
}, "Already sent");

console.log(sendMessage()); // Sending message... / Message sent
console.log(sendMessage()); // Already sent
console.log(sendMessage()); // Already sent
```

### 9. Once for memoization / Once cho memoization

```javascript
/**
 * Create a memoized function that computes once per unique arguments
 * Tạo hàm memoized tính toán một lần cho mỗi tham số duy nhất
 * @param {Function} func - Function to memoize / Hàm cần memoize
 * @returns {Function} Memoized function / Hàm đã memoize
 */
function oncePerArgs(func) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (!cache.has(key)) {
      cache.set(key, func.apply(this, args));
    }

    return cache.get(key);
  };
}

// Example usage / Ví dụ sử dụng
const expensiveCalculation = oncePerArgs((n) => {
  console.log(`Calculating for ${n}...`);
  return n * n;
});

console.log(expensiveCalculation(5)); // Calculating for 5... / 25
console.log(expensiveCalculation(5)); // 25 (cached)
console.log(expensiveCalculation(10)); // Calculating for 10... / 100
console.log(expensiveCalculation(10)); // 100 (cached)
```

### 10. Performance comparison / So sánh hiệu năng

```javascript
// Test data / Dữ liệu kiểm thử
let normalCount = 0;
let onceCount = 0;

const normalFunc = () => {
  normalCount++;
  return "Result";
};

const onceFunc = once(() => {
  onceCount++;
  return "Result";
});

// Call 1000 times / Gọi 1000 lần
for (let i = 0; i < 1000; i++) {
  normalFunc();
  onceFunc();
}

console.log("Normal function calls:", normalCount); // 1000
console.log("Once function calls:", onceCount); // 1

// Once is much more efficient for repeated calls
// Once hiệu quả hơn nhiều cho các lần gọi lặp lại
```

## Best Practices / Thực hành tốt nhất

1. **Use once for expensive one-time operations / Sử dụng once cho các operations tốn kém một lần**

   ```javascript
   // Good / Tốt
   const initialize = once(() => {
     // Expensive initialization / Khởi tạo tốn kém
     setupDatabase();
     loadConfig();
     initializeCache();
   });
   ```

2. **Consider reset capability for testing / Cân nhắc khả năng reset cho testing**

   ```javascript
   // Good / Tốt - Allow reset for testing / Cho phép reset cho testing
   const setup = onceWithReset(() => {
     // Setup logic / Logic thiết lập
   });

   // In tests / Trong tests
   setup();
   // ... test ...
   setup.reset();
   ```

3. **Use onceAsync for async operations / Sử dụng onceAsync cho các operations async**

   ```javascript
   // Good / Tốt
   const fetchConfig = onceAsync(async () => {
     const response = await fetch("/api/config");
     return response.json();
   });
   ```

4. **Document once behavior clearly / Ghi rõ hành vi của once**

   ```javascript
   // Good / Tốt - Document the behavior / Ghi lại hành vi
   /**
    * Initialize the application. This function can only be called once.
    * Subsequent calls will return the cached result.
    * Khởi tạo application. Hàm này chỉ có thể gọi một lần.
    * Các lần gọi sau sẽ trả về kết quả đã cache.
    */
   const initialize = once(() => {
     // Initialization logic / Logic khởi tạo
   });
   ```

5. **Use native addEventListener with { once: true } for events / Sử dụng addEventListener native với { once: true } cho events**

   ```javascript
   // Good / Tốt - Use native once option / Sử dụng tùy chọn once native
   button.addEventListener(
     "click",
     () => {
       console.log("Clicked once");
     },
     { once: true },
   );

   // Instead of custom once / Thay vì once tùy chỉnh
   const handler = once(() => {
     console.log("Clicked once");
   });
   button.addEventListener("click", handler);
   ```

## Anti-patterns / Các mẫu nên tránh

### 1. Using once for functions that need to run multiple times / Sử dụng once cho các functions cần chạy nhiều lần

```javascript
// BAD / KHÔNG TỐT - Counter should run multiple times
// Counter nên chạy nhiều lần
const increment = once(() => {
  counter++;
});

increment();
increment(); // Won't increment / Không tăng

// GOOD / TỐT - Use normal function for multiple executions
// Sử dụng function bình thường cho nhiều lần thực thi
const increment = () => {
  counter++;
};
```

### 2. Not handling errors in once functions / Không xử lý lỗi trong các hàm once

```javascript
// BAD / KHÔNG TỐT - Errors prevent retry / Lỗi ngăn chặn thử lại
const riskyOnce = once(() => {
  if (Math.random() < 0.5) {
    throw new Error("Failed");
  }
  return "Success";
});

try {
  riskyOnce();
} catch (error) {
  console.log("Error:", error);
}

// Subsequent calls return undefined / Các lần gọi sau trả về undefined
console.log(riskyOnce()); // undefined

// GOOD / TỐT - Handle errors appropriately / Xử lý lỗi phù hợp
const riskyOnce = onceWithErrorHandling(() => {
  if (Math.random() < 0.5) {
    throw new Error("Failed");
  }
  return "Success";
});
```

### 3. Using once for stateful operations / Sử dụng once cho các operations có state

```javascript
// BAD / KHÔNG TỐT - Stateful operation should run multiple times
// Operation có state nên chạy nhiều lần
const updateTimestamp = once(() => {
  return Date.now();
});

console.log(updateTimestamp()); // Current time
console.log(updateTimestamp()); // Same time (cached)

// GOOD / TỐT - Use normal function for stateful operations
// Sử dụng function bình thường cho các operations có state
const updateTimestamp = () => {
  return Date.now();
};
```

### 4. Not documenting once behavior / Không ghi lại hành vi của once

```javascript
// BAD / KHÔNG TỐT - Unclear behavior / Hành vi không rõ ràng
const setup = once(() => {
  // Setup logic
});

// User might not know it only runs once
// Người dùng có thể không biết nó chỉ chạy một lần

// GOOD / TỐT - Document the behavior / Ghi lại hành vi
/**
 * Setup the application. Can only be called once.
 * Thiết lập application. Chỉ có thể gọi một lần.
 */
const setup = once(() => {
  // Setup logic
});
```

## References / Tài liệu tham khảo

- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [JavaScript Design Patterns: Once Pattern](https://www.patternsjs.org/patterns/once.html)
- [You Don't Know JS: Scope & Closures](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch5.md)
- [Lodash: \_.once](https://lodash.com/docs/4.17.15#once)
