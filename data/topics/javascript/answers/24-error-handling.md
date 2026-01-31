# 24. Error Handling / Xử Lý Lỗi

## Tổng quan về Error Handling

### Mục đích của Error Handling / Purpose

**Error Handling** là quá trình phát hiện, xử lý và recover từ errors trong JavaScript để ứng dụng không bị crash và có thể tiếp tục hoạt động.

**Mục đích chính:**

- Prevent application crashes
- Provide meaningful error messages
- Graceful degradation
- Debugging và logging
- User experience tốt hơn

### Khi nào nên dùng / When to Use

**Nên dùng error handling khi:**

- Code có thể throw errors
- Làm việc với external APIs
- Xử lý user input
- File I/O operations
- Network requests

### Giúp ích gì / Benefits

**Lợi ích:**

- **Stability**: Ứng dụng không bị crash
- **Debugging**: Dễ dàng tìm và fix bugs
- **UX**: Trải nghiệm người dùng tốt hơn
- **Maintainability**: Code dễ bảo trì hơn
- **Reliability**: Ứng dụng tin cậy hơn

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm           | Giải thích                        |
| ----------------- | --------------------------------- |
| Prevent crashes   | Ứng dụng không bị crash           |
| Better UX         | Hiển thị thông báo lỗi có ý nghĩa |
| Debugging         | Dễ dàng tìm và fix bugs           |
| Graceful recovery | Có thể recover từ errors          |
| Logging           | Ghi log errors để phân tích       |

**Nhược điểm (Cons):**

| Nhược điểm       | Giải thích                |
| ---------------- | ------------------------- |
| Complexity       | Thêm độ phức tạp cho code |
| Performance      | Có overhead nhỏ           |
| Over-engineering | Có thể over-handle errors |

---

## `try/catch/finally`?

**`try/catch/finally`** là cú pháp để handle synchronous errors trong JavaScript.

### Mục đích / Purpose

- Catch và handle synchronous errors
- Execute cleanup code trong `finally`
- Graceful error handling

### Khi nào dùng / When to Use

- Khi code có thể throw errors
- Khi cần cleanup resources
- Khi muốn graceful error handling

### Ví dụ:

```javascript
// Basic try/catch
try {
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  console.error("Error occurred:", error.message);
}

// try/catch/finally
let resource;
try {
  resource = acquireResource();
  const result = processResource(resource);
  console.log(result);
} catch (error) {
  console.error("Error:", error.message);
} finally {
  if (resource) {
    releaseResource(resource);
  }
}

// Catching specific errors
try {
  JSON.parse(invalidJson);
} catch (error) {
  if (error instanceof SyntaxError) {
    console.error("Invalid JSON:", error.message);
  } else {
    console.error("Other error:", error.message);
  }
}

// Rethrowing errors
try {
  const result = riskyOperation();
} catch (error) {
  console.error("Error occurred:", error.message);
  throw error; // Rethrow to let caller handle
}

// Nested try/catch
try {
  try {
    const result = riskyOperation();
  } catch (error) {
    console.error("Inner error:", error.message);
    throw new Error("Wrapped error: " + error.message);
  }
} catch (error) {
  console.error("Outer error:", error.message);
}
```

### Best Practices:

```javascript
// ✅ Dùng try/catch cho code có thể throw errors
try {
  const data = JSON.parse(jsonString);
} catch (error) {
  console.error("Invalid JSON:", error.message);
}

// ✅ Dùng finally cho cleanup
let connection;
try {
  connection = await connect();
  await process(connection);
} catch (error) {
  console.error("Error:", error.message);
} finally {
  if (connection) {
    await connection.close();
  }
}

// ✅ Rethrow với additional context
try {
  await apiCall();
} catch (error) {
  console.error("API call failed:", error.message);
  throw new Error(`Failed to fetch data: ${error.message}`);
}

// ❌ Tránh catch-all mà không log
try {
  riskyOperation();
} catch (error) {
  // Silent catch - bad!
}

// ✅ Luôn log hoặc handle error
try {
  riskyOperation();
} catch (error) {
  console.error("Error:", error);
  // hoặc handle error appropriately
}
```

---

## Custom Error classes?

**Custom Error classes** cho phép tạo error types riêng để handle errors cụ thể.

### Mục đích / Purpose

- Tạo error types cụ thể
- Better error handling với instanceof
- Add additional context to errors

### Khi nào dùng / When to Use

- Khi cần handle errors khác nhau theo cách khác
- Khi muốn add context vào errors
- Khi có nhiều error types trong ứng dụng

### Ví dụ:

```javascript
// Custom Error class
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

// Custom Error với additional properties
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

// Custom Error với code
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

// Sử dụng custom errors
function validateEmail(email) {
  if (!email.includes("@")) {
    throw new ValidationError("Invalid email format", "email");
  }
}

try {
  validateEmail("invalid-email");
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`Validation error on field ${error.field}: ${error.message}`);
  } else {
    console.error("Unknown error:", error.message);
  }
}

// Error hierarchy
class AppError extends Error {
  constructor(message) {
    super(message);
    this.name = "AppError";
  }
}

class NetworkError extends AppError {
  constructor(message, url) {
    super(message);
    this.name = "NetworkError";
    this.url = url;
  }
}

class DatabaseError extends AppError {
  constructor(message, query) {
    super(message);
    this.name = "DatabaseError";
    this.query = query;
  }
}

// Handle errors by type
try {
  await fetchData();
} catch (error) {
  if (error instanceof NetworkError) {
    console.error("Network issue:", error.url);
  } else if (error instanceof DatabaseError) {
    console.error("Database issue:", error.query);
  } else if (error instanceof AppError) {
    console.error("App error:", error.message);
  } else {
    console.error("Unknown error:", error);
  }
}
```

### Best Practices:

```javascript
// ✅ Tạo custom error classes cho errors cụ thể
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

// ✅ Dùng instanceof để handle errors khác nhau
if (error instanceof ValidationError) {
  // Handle validation error
} else if (error instanceof ApiError) {
  // Handle API error
}

// ✅ Add context vào custom errors
class DatabaseError extends Error {
  constructor(message, query) {
    super(message);
    this.name = "DatabaseError";
    this.query = query;
  }
}

// ❌ Tránh throw generic Error khi có custom error type
throw new Error("Validation failed"); // Bad

// ✅ Dùng custom error type
throw new ValidationError("Invalid email", "email"); // Good
```

---

## Global error handlers?

**Global error handlers** cho phép catch errors ở global level thay vì在每个地方 try/catch.

### Mục đích / Purpose

- Catch uncaught errors
- Log errors centrally
- Prevent application crashes
- User-friendly error messages

### Khi nào dùng / When to Use

- Khi muốn catch tất cả uncaught errors
- Khi muốn centralized error logging
- Khi muốn prevent crashes

### Ví dụ:

```javascript
// Global error handler (browser)
window.onerror = function (message, source, lineno, colno, error) {
  console.error("Global error:", message);
  console.error("Source:", source);
  console.error("Line:", lineno);
  console.error("Error:", error);
  // Log to error tracking service
  return true; // Prevent default error handling
};

// Unhandled promise rejection handler (browser)
window.onunhandledrejection = function (event) {
  console.error("Unhandled promise rejection:", event.reason);
  // Log to error tracking service
  event.preventDefault(); // Prevent default handling
};

// Global error handler (Node.js)
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  // Log error, cleanup, then exit
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled rejection:", reason);
  // Log error
});

// React Error Boundary (class component)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // Log to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Sử dụng Error Boundary
<ErrorBoundary>
  <App />
</ErrorBoundary>;
```

### Best Practices:

```javascript
// ✅ Dùng global error handlers cho logging
window.onerror = function (message, source, lineno, colno, error) {
  logErrorToService({
    message,
    source,
    lineno,
    stack: error?.stack,
  });
};

// ✅ Dùng unhandledrejection cho promises
window.onunhandledrejection = function (event) {
  logErrorToService({
    reason: event.reason,
    type: "unhandledRejection",
  });
};

// ✅ Dùng Error Boundary trong React
<ErrorBoundary>
  <App />
</ErrorBoundary>;

// ❌ Tránh silent errors trong global handlers
window.onerror = function () {
  return true; // Silent - bad!
};

// ✅ Luôn log errors
window.onerror = function (message, source, lineno, colno, error) {
  logError(message, error);
  return true;
};
```

---

## `throw` statement?

**`throw` statement** cho phép throw custom errors để signal rằng có lỗi xảy ra.

### Mục đích / Purpose

- Signal errors
- Throw custom errors
- Control flow với errors

### Khi nào dùng / When to Use

- Khi detect invalid conditions
- Khi muốn signal errors
- Khi validate input

### Ví dụ:

```javascript
// Throw Error object
throw new Error("Something went wrong");

// Throw custom error
throw new ValidationError("Invalid input", "email");

// Throw primitive values (not recommended)
throw "Error message";
throw 404;
throw { message: "Error" };

// Throw in validation
function validateAge(age) {
  if (typeof age !== "number") {
    throw new TypeError("Age must be a number");
  }
  if (age < 0) {
    throw new RangeError("Age must be positive");
  }
  if (age > 120) {
    throw new RangeError("Age must be realistic");
  }
}

// Throw in API calls
async function fetchUser(id) {
  if (!id) {
    throw new Error("User ID is required");
  }
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new ApiError("Failed to fetch user", response.status);
  }
  return response.json();
}

// Throw in async functions
async function processData(data) {
  if (!data) {
    throw new Error("Data is required");
  }
  // Process data...
}
```

### Best Practices:

```javascript
// ✅ Dùng Error object hoặc custom errors
throw new Error("Something went wrong");
throw new ValidationError("Invalid input", "email");

// ✅ Dùng throw để signal errors
function validate(input) {
  if (!input) {
    throw new Error("Input is required");
  }
}

// ✅ Throw meaningful error messages
throw new Error("Failed to connect to database at localhost:5432");

// ❌ Tránh throw primitive values
throw "Error message"; // Bad
throw new Error("Error message"); // Good

// ❌ Tránh throw generic Error khi có custom error type
throw new Error("Validation failed"); // Bad
throw new ValidationError("Invalid email", "email"); // Good
```

---

## `Error` object?

**`Error` object** là built-in object đại diện cho errors trong JavaScript.

### Mục đích / Purpose

- Represent errors
- Provide error information
- Stack trace tracking

### Khi nào dùng / When to Use

- Khi tạo errors
- Khi catch errors
- Khi log errors

### Ví dụ:

```javascript
// Create Error object
const error = new Error("Something went wrong");
console.log(error.message); // 'Something went wrong'
console.error(error); // Full error with stack trace

// Error properties
const error = new Error("Error message");
console.log(error.name); // 'Error'
console.log(error.message); // 'Error message'
console.log(error.stack); // Stack trace

// Built-in error types
// SyntaxError
try {
  eval("invalid syntax");
} catch (error) {
  console.error(error instanceof SyntaxError); // true
}

// TypeError
try {
  null.toString();
} catch (error) {
  console.error(error instanceof TypeError); // true
}

// ReferenceError
try {
  console.log(undefinedVariable);
} catch (error) {
  console.error(error instanceof ReferenceError); // true
}

// RangeError
try {
  new Array(-1);
} catch (error) {
  console.error(error instanceof RangeError); // true
}

// URIError
try {
  decodeURIComponent("%");
} catch (error) {
  console.error(error instanceof URIError); // true
}
```

### Best Practices:

```javascript
// ✅ Dùng Error object để throw errors
throw new Error("Something went wrong");

// ✅ Dùng built-in error types khi phù hợp
throw new TypeError("Expected a number");
throw new RangeError("Value out of range");

// ✅ Log error object để có stack trace
try {
  riskyOperation();
} catch (error) {
  console.error(error); // Logs stack trace
}

// ✅ Check error type với instanceof
if (error instanceof TypeError) {
  // Handle type error
}
```

---

## Error propagation?

**Error propagation** là quá trình errors được throw và propagate lên call stack cho đến khi được catch.

### Mục đích / Purpose

- Allow errors to propagate
- Handle errors at appropriate level
- Centralized error handling

### Khi nào dùng / When to Use

- Khi muốn handle errors ở higher level
- Khi muốn centralized error handling
- Khi không muốn handle errors locally

### Ví dụ:

```javascript
// Error propagation
function level3() {
  throw new Error("Error in level3");
}

function level2() {
  level3(); // Error propagates here
}

function level1() {
  try {
    level2(); // Error propagates here
  } catch (error) {
    console.error("Caught in level1:", error.message);
  }
}

level1(); // Caught in level1: Error in level3

// Async error propagation
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

async function processUser(id) {
  const user = await fetchUser(id); // Error propagates
  console.log(user);
}

async function main() {
  try {
    await processUser(1); // Catch error here
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Promise error propagation
function fetchUser(id) {
  return fetch(`/api/users/${id}`).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
}

fetchUser(1)
  .then((user) => console.log(user))
  .catch((error) => console.error("Error:", error.message));
```

### Best Practices:

```javascript
// ✅ Let errors propagate đến appropriate handler
function processData(data) {
  if (!data) {
    throw new Error("Data is required");
  }
  // Process data...
}

async function main() {
  try {
    await processData(data);
  } catch (error) {
    // Handle error at appropriate level
    console.error("Error:", error.message);
  }
}

// ✅ Rethrow với additional context khi cần
try {
  await apiCall();
} catch (error) {
  console.error("API call failed:", error.message);
  throw new Error(`Failed to fetch data: ${error.message}`);
}

// ❌ Tránh catch và silent errors
try {
  riskyOperation();
} catch (error) {
  // Silent - bad!
}

// ✅ Log hoặc handle error
try {
  riskyOperation();
} catch (error) {
  console.error("Error:", error);
  throw error; // Rethrow
}
```

---

## Synchronous vs Asynchronous errors?

**Synchronous errors** xảy ra ngay lập tức khi code được thực thi, còn **Asynchronous errors** xảy ra trong async operations.

### Sự khác biệt:

| Đặc điểm    | Synchronous Errors       | Asynchronous Errors                          |
| ----------- | ------------------------ | -------------------------------------------- |
| Timing      | Ngay lập tức             | Sau async operation                          |
| Catching    | try/catch                | try/catch trong async function hoặc .catch() |
| Propagation | Propagate qua call stack | Propagate qua promise chain                  |

### Ví dụ:

```javascript
// Synchronous error
function syncError() {
  throw new Error("Synchronous error");
}

try {
  syncError(); // Caught here
} catch (error) {
  console.error("Caught sync error:", error.message);
}

// Asynchronous error (callback)
function asyncError(callback) {
  setTimeout(() => {
    callback(new Error("Async error"));
  }, 100);
}

asyncError((error) => {
  if (error) {
    console.error("Caught async error:", error.message);
  }
});

// Asynchronous error (promise)
function promiseError() {
  return Promise.reject(new Error("Promise error"));
}

promiseError().catch((error) => {
  console.error("Caught promise error:", error.message);
});

// Asynchronous error (async/await)
async function asyncAwaitError() {
  throw new Error("Async/await error");
}

async function main() {
  try {
    await asyncAwaitError();
  } catch (error) {
    console.error("Caught async/await error:", error.message);
  }
}

// Error in event listener
button.addEventListener("click", () => {
  try {
    riskyOperation();
  } catch (error) {
    console.error("Error in event listener:", error.message);
  }
});
```

### Best Practices:

```javascript
// ✅ Dùng try/catch cho synchronous errors
try {
  const result = riskyOperation();
} catch (error) {
  console.error("Error:", error.message);
}

// ✅ Dùng try/catch trong async functions cho async errors
async function fetchData() {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

// ✅ Dùng .catch() cho promises
fetch(url)
  .then((response) => response.json())
  .catch((error) => console.error("Error:", error.message));

// ✅ Dùng try/catch trong event listeners
button.addEventListener("click", () => {
  try {
    riskyOperation();
  } catch (error) {
    console.error("Error:", error.message);
  }
});

// ❌ Tránh try/catch cho async operations không được await
try {
  fetch(url); // Error not caught!
} catch (error) {
  console.error("Error:", error.message);
}

// ✅ Dùng await hoặc .catch()
try {
  await fetch(url);
} catch (error) {
  console.error("Error:", error.message);
}
```

---

## Unhandled promise rejections?

**Unhandled promise rejections** là errors trong promises không được catch, có thể gây ứng dụng crash.

### Mục đích / Purpose

- Catch unhandled promise errors
- Prevent application crashes
- Log errors for debugging

### Khi nào dùng / When to Use

- Khi muốn catch tất cả unhandled promise errors
- Khi muốn prevent crashes
- Khi muốn centralized error logging

### Ví dụ:

```javascript
// Unhandled promise rejection
Promise.reject(new Error("Unhandled rejection"));
// Warning: Unhandled promise rejection

// Handle with .catch()
Promise.reject(new Error("Handled rejection")).catch((error) => {
  console.error("Caught:", error.message);
});

// Handle with async/await try/catch
async function main() {
  try {
    await Promise.reject(new Error("Handled rejection"));
  } catch (error) {
    console.error("Caught:", error.message);
  }
}

// Global handler for unhandled rejections (browser)
window.onunhandledrejection = function (event) {
  console.error("Unhandled rejection:", event.reason);
  // Log to error tracking service
  event.preventDefault();
};

// Global handler for unhandled rejections (Node.js)
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled rejection:", reason);
  // Log error
});

// Handle all promises
Promise.all([fetch("/api/users"), fetch("/api/posts")]).catch((error) => {
  console.error("One of the requests failed:", error.message);
});
```

### Best Practices:

```javascript
// ✅ Luôn catch promise errors
Promise.reject(new Error("Error")).catch((error) =>
  console.error("Caught:", error.message),
);

// ✅ Dùng try/catch với async/await
async function fetchData() {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

// ✅ Dùng global handler cho unhandled rejections
window.onunhandledrejection = function (event) {
  logError(event.reason);
  event.preventDefault();
};

// ❌ Tránh unhandled rejections
Promise.reject(new Error("Error")); // Bad

// ✅ Luôn handle promises
Promise.reject(new Error("Error")).catch((error) => handle(error)); // Good
```

---

## Use Cases & Patterns

### Common Error Handling Patterns:

```javascript
// 1. Validation error pattern
function validate(input) {
  const errors = [];
  if (!input.email) {
    errors.push(new ValidationError("Email is required", "email"));
  }
  if (!input.password) {
    errors.push(new ValidationError("Password is required", "password"));
  }
  if (errors.length > 0) {
    throw new ValidationErrorAggregate(errors);
  }
}

// 2. Retry pattern
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

// 3. Circuit breaker pattern
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.threshold = threshold;
    this.timeout = timeout;
    this.failures = 0;
    this.state = "closed";
    this.nextAttempt = 0;
  }

  async execute(fn) {
    if (this.state === "open") {
      if (Date.now() < this.nextAttempt) {
        throw new Error("Circuit breaker is open");
      }
      this.state = "half-open";
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failures = 0;
    this.state = "closed";
  }

  onFailure() {
    this.failures++;
    if (this.failures >= this.threshold) {
      this.state = "open";
      this.nextAttempt = Date.now() + this.timeout;
    }
  }
}

// 4. Error boundary pattern (React)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

// 5. Result/Either pattern (functional error handling)
function Result(value, error = null) {
  return { value, error, isSuccess: !error };
}

function divide(a, b) {
  if (b === 0) {
    return Result(null, new Error("Division by zero"));
  }
  return Result(a / b);
}

const result = divide(10, 0);
if (result.isSuccess) {
  console.log("Result:", result.value);
} else {
  console.error("Error:", result.error.message);
}

// 6. Async error wrapper
function asyncHandler(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

// Express usage
app.get(
  "/users",
  asyncHandler(async (req, res) => {
    const users = await fetchUsers();
    res.json(users);
  }),
);
```

---

## Anti-patterns cần tránh

```javascript
// ❌ Silent catch
try {
  riskyOperation();
} catch (error) {
  // Silent - bad!
}

// ✅ Luôn log hoặc handle error
try {
  riskyOperation();
} catch (error) {
  console.error("Error:", error);
  // hoặc handle error appropriately
}

// ❌ Catch-all và throw generic error
try {
  await apiCall();
} catch (error) {
  throw new Error("Something went wrong");
}

// ✅ Preserve original error
try {
  await apiCall();
} catch (error) {
  console.error("API call failed:", error.message);
  throw new Error(`Failed to fetch data: ${error.message}`);
}

// ❌ Throw primitive values
throw "Error message";

// ✅ Throw Error object
throw new Error("Error message");

// ❌ Quên catch async errors
fetch(url); // Error not caught!

// ✅ Luôn catch async errors
fetch(url)
  .then((response) => response.json())
  .catch((error) => console.error("Error:", error.message));
```

---

_References: [MDN Error Handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling), [Error Handling Best Practices](https://www.joyent.com/node-js/production/design/errors)_
