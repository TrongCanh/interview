# 10. Async/Await

## Tổng quan về Async/Await

### Mục đích của Async/Await / Purpose

**`async/await`** là syntax sugar cho Promises, giúp viết async code trông giống sync code.

**Mục đích chính:**

- Viết async code dễ đọc hơn
- Tránh callback hell
- Error handling đơn giản hơn
- Code giống sync

### Khi nào cần hiểu về Async/Await / When to Use

Hiểu về `async/await` là cần thiết khi:

- Viết async code
- Xử lý Promises
- Error handling trong async code
- Sequential vs parallel execution

### Giúp ích gì / Benefits

**Lợi ích:**

- **Readable**: Code dễ đọc hơn Promises
- **Clean**: Code gọn hơn callbacks
- **Error handling**: Try/catch thay vì .catch()
- **Sync-like**: Code trông giống sync

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                 | Nhược điểm            |
| ----------------------- | --------------------- |
| Code dễ đọc             | Cần ES6+ support      |
| Error handling đơn giản | Learning curve        |
| Tránh callback hell     | Verbose hơn callbacks |
| Code giống sync         | Có thể gây confusion  |

---

## Async/await hoạt động như thế nào?

**`async/await`** là syntax sugar cho Promises, giúp viết async code trông giống sync code.

### Mục đích / Purpose

**`async/await`** được thiết kế để:

- Viết async code dễ đọc hơn
- Tránh callback hell
- Error handling đơn giản hơn
- Code giống sync

### Khi nào dùng / When to Use

`async/await` nên dùng khi:

- Viết async code
- Xử lý Promises
- Error handling trong async code
- Sequential vs parallel execution

### Giúp ích gì / Benefits

**Lợi ích:**

- **Readable**: Code dễ đọc hơn Promises
- **Clean**: Code gọn hơn callbacks
- **Error handling**: Try/catch thay vì .catch()
- **Sync-like**: Code trông giống sync

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                 | Nhược điểm            |
| ----------------------- | --------------------- |
| Code dễ đọc             | Cần ES6+ support      |
| Error handling đơn giản | Learning curve        |
| Tránh callback hell     | Verbose hơn callbacks |
| Code giống sync         | Có thể gây confusion  |

### Async function:

```javascript
// Async function luôn trả về Promise
async function fetchData() {
  return "Data";
}

const promise = fetchData();
console.log(promise); // Promise { <fulfilled>: 'Data' }

// Async function với Promise
async function fetchWithPromise() {
  return Promise.resolve("From Promise");
}

fetchWithPromise().then((data) => console.log(data));

// Async function với await
async function fetchWithAwait() {
  const data = await Promise.resolve("From Await");
  return data;
}

fetchWithAwait().then((data) => console.log(data));
```

### Await expression:

```javascript
// Await chờ Promise hoàn thành
async function example() {
  console.log("Start");

  const result = await new Promise((resolve) => {
    setTimeout(() => resolve("Done"), 1000);
  });

  console.log("Result:", result);
  console.log("End");
}

example();
// 'Start'
// (sau 1 giây) 'Result: Done'
// 'End'
```

### Async function trả về Promise:

```javascript
// Async function luôn trả về Promise
async function getData() {
  return "Data";
}

getData().then((data) => console.log(data));
// 'Data'

// Async function với throw
async function getError() {
  throw new Error("Error in async");
}

getError().catch((error) => console.error(error.message));
// 'Error in async'
```

### Best Practices:

```javascript
// ✅ Dùng async/await cho:
// - Async code
// - Error handling
// - Sequential/parallel execution
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng await trong non-async function
function badAwait() {
  const result = await Promise.resolve(1); // SyntaxError
}

// ✅ Nên dùng async function
async function goodAwait() {
  const result = await Promise.resolve(1); // OK
}
```

---

## Error handling với try/catch?

### Mục đích / Purpose

**Try/catch với async/await** được thiết kế để:

- Xử lý errors trong async code
- Centralized error handling
- Code dễ đọc hơn

### Khi nào dùng / When to Use

Try/catch với async/await nên dùng khi:

- Xử lý async operations
- Error handling trong async functions
- Sequential async operations

### Giúp ích gì / Benefits

**Lợi ích:**

- **Error handling**: Xử lý errors dễ dàng
- **Centralized**: Error handling ở một nơi
- **Readable**: Code dễ đọc hơn callbacks
- **Clean**: Code gọn hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm                    |
| ---------------------- | ----------------------------- |
| Error handling dễ dàng | Verbose hơn Promises          |
| Centralized            | Có thể catch quá nhiều errors |
| Readable               | Learning curve                |

### Try/catch với async/await:

```javascript
// Try/catch bắt error từ await
async function fetchData() {
  try {
    const data = await fetch("/api/data");
    const json = await data.json();
    console.log("Data:", json);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

fetchData();
```

### Multiple try/catch:

```javascript
// Nested try/catch
async function processUser() {
  try {
    const user = await fetchUser(1);
    console.log("User:", user);

    try {
      const posts = await fetchPosts(user.id);
      console.log("Posts:", posts);
    } catch (error) {
      console.error("Posts error:", error.message);
    }
  } catch (error) {
    console.error("User error:", error.message);
  }
}
```

### Finally với async:

```javascript
// Finally luôn chạy
async function fetchWithCleanup() {
  let connection;

  try {
    connection = await connectToDatabase();
    const data = await fetchData(connection);
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  } finally {
    if (connection) {
      await closeConnection(connection);
      console.log("Connection closed");
    }
  }
}
```

### Best Practices:

```javascript
// ✅ Dùng try/catch cho:
// - Async operations
// - Error handling
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên bỏ qua error handling
async function fetchData() {
  const response = await fetch("/api/data");
  const json = await response.json();
  return json;
  // Không có try/catch
}

// ✅ Nên luôn có error handling
async function fetchDataSafe() {
  try {
    const response = await fetch("/api/data");
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
```

---

## Parallel vs sequential execution?

### Mục đích / Purpose

Hiểu về **parallel vs sequential execution** giúp:

- Chọn đúng execution strategy
- Tối ưu performance
- Tránh bugs

### Khi nào dùng / When to Use

| Type       | Khi nào dùng                          |
| ---------- | ------------------------------------- |
| Sequential | Kết quả bước sau phụ thuộc bước trước |
| Parallel   | Các operations độc lập                |
| Mixed      | Một số phụ thuộc, một số độc lập      |

### Giúp ích gì / Benefits

Hiểu về execution strategies giúp:

- **Performance**: Tối ưu performance
- **Correctness**: Chọn đúng strategy
- **Efficiency**: Code hiệu quả

### Ưu nhược điểm / Pros & Cons

| Type       | Ưu điểm            | Nhược điểm           |
| ---------- | ------------------ | -------------------- |
| Sequential | Đơn giản, dễ debug | Có thể chậm hơn      |
| Parallel   | Nhanh hơn          | Có thể khó debug hơn |
| Mixed      | Flexible           | Phức tạp             |

### Sequential execution (mặc định):

```javascript
// Await theo thứ tự - sequential
async function sequential() {
  console.log("Start");

  const result1 = await delay(1000, "Result 1");
  console.log("Result 1:", result1);

  const result2 = await delay(1000, "Result 2");
  console.log("Result 2:", result2);

  const result3 = await delay(1000, "Result 3");
  console.log("Result 3:", result3);

  console.log("End");
}

function delay(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

sequential();
// 'Start'
// (sau 1 giây) 'Result 1: Result 1'
// (sau 2 giây) 'Result 2: Result 2'
// (sau 3 giây) 'Result 3: Result 3'
// 'End'
// Tổng thời gian: 3 giây
```

### Parallel execution:

```javascript
// Promise.all - parallel
async function parallel() {
  console.log("Start");

  const [result1, result2, result3] = await Promise.all([
    delay(1000, "Result 1"),
    delay(1000, "Result 2"),
    delay(1000, "Result 3"),
  ]);

  console.log("Result 1:", result1);
  console.log("Result 2:", result2);
  console.log("Result 3:", result3);
  console.log("End");
}

parallel();
// 'Start'
// (sau 1 giây) 'Result 1: Result 1'
// (sau 1 giây) 'Result 2: Result 2'
// (sau 1 giây) 'Result 3: Result 3'
// 'End'
// Tổng thời gian: 1 giây
```

### Best Practices:

```javascript
// ✅ Dùng sequential khi:
// - Kết quả bước sau phụ thuộc bước trước
async function processOrder(orderId) {
  const order = await getOrder(orderId);
  const payment = await processPayment(order);
  const shipment = await createShipment(payment);
  const notification = await sendNotification(shipment);
  return notification;
}

// ✅ Dùng parallel khi:
// - Các operations độc lập
async function fetchDashboard() {
  const [users, posts, stats] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchStats(),
  ]);
  return { users, posts, stats };
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng await cho operations độc lập
async function badParallel() {
  const result1 = await fetchUsers();
  const result2 = await fetchPosts();
  const result3 = await fetchStats();
  return { result1, result2, result3 };
}

// ✅ Nên dùng Promise.all cho operations độc lập
async function goodParallel() {
  const [result1, result2, result3] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchStats(),
  ]);
  return { result1, result2, result3 };
}
```

---

## `await` với non-promise values?

### Mục đích / Purpose

Hiểu về **await với non-promise values** giúp:

- Viết code nhất quán
- Tránh errors
- Code dễ đọc hơn

### Khi nào dùng / When to Use

Await với non-promise values nên dùng khi:

- Code nhất quán
- Async code với cả promises và values
- Dễ đọc hơn

### Giúp ích gì / Benefits

Hiểu về await với non-promise values giúp:

- **Consistent**: Code nhất quán
- **No errors**: Tránh errors
- **Readable**: Dễ đọc hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm           |
| -------------- | -------------------- |
| Code nhất quán | Có thể verbose hơn   |
| No errors      | Có thể gây confusion |
| Readable       | Learning curve       |

### Await non-promise values:

```javascript
// Await với primitive values
async function example() {
  const num = await 42;
  console.log("Number:", num); // 42

  const str = await "Hello";
  console.log("String:", str); // 'Hello'

  const bool = await true;
  console.log("Boolean:", bool); // true

  const obj = await { name: "John" };
  console.log("Object:", obj); // { name: 'John' }
}
```

### Thenable objects:

```javascript
// Await với thenable objects
const thenable = {
  then: function (resolve) {
    setTimeout(() => resolve("From thenable"), 1000);
  },
};

async function awaitThenable() {
  const result = await thenable;
  console.log("Result:", result);
  // (sau 1 giây) 'Result: From thenable'
}
```

### Best Practices:

```javascript
// ✅ Dùng await với cả promises và values
async function processData(useCache) {
  if (useCache) {
    // Trả về value trực tiếp
    return { fromCache: true, data: "Cached data" };
  }

  // Trả về Promise
  return fetch("/api/data").then((response) => ({
    fromCache: false,
    data: await response.json(),
  }));
}

// Cả 2 trường hợp đều hoạt động
async function main() {
  const cached = await processData(true);
  console.log("Cached:", cached);

  const fetched = await processData(false);
  console.log("Fetched:", fetched);
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên await khi không cần
async function badExample() {
  const value = 42;
  const result = await value; // Không cần await
  return result;
}

// ✅ Nên dùng trực tiếp khi không cần await
async function goodExample() {
  const value = 42;
  return value;
}
```

---

## Top-level await?

**Top-level await** cho phép dùng `await` ở top-level của module (không cần function).

### Mục đích / Purpose

**Top-level await** được thiết kế để:

- Dùng await ở top-level
- Module initialization
- Async module loading
- Simplified code

### Khi nào dùng / When to Use

Top-level await nên dùng khi:

- Module initialization
- Async module loading
- ES2022 features
- Type: module

### Giúp ích gì / Benefits

**Lợi ích:**

- **Simplified**: Code đơn giản hơn
- **Module initialization**: Async module loading
- **Clean**: Không cần IIFE
- **Modern**: ES2022 feature

### Ưu nhược điểm / Pros & Cons

| Ưu điểm    | Nhược điểm           |
| ---------- | -------------------- | --------------- |
| Simplified | Cần module type      | Browser support |
| Clean      | Blocking module load | Learning curve  |

### Top-level await (ES2022):

```javascript
// Trong module (.mjs hoặc type: module)
// utils.mjs
const data = await fetch("/api/data");
const json = await data.json();

export { json };

// Hoặc
export const users = await fetchUsers();
export const posts = await fetchPosts();
```

### Cần module type:

```html
<!-- HTML -->
<script type="module">
  const data = await fetch("/api/data");
  console.log(data);
</script>
```

### Best Practices:

```javascript
// ✅ Dùng top-level await cho:
// - Module initialization
// - Async module loading
// config.js (module)
export const API_URL = await fetchConfig("API_URL");
export const API_KEY = await fetchConfig("API_KEY");
export const TIMEOUT = await fetchConfig("TIMEOUT");
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không thể dùng await ở top-level trong script thường
// const data = await fetch('/api/data');  // SyntaxError

// ✅ Nên wrap trong IIFE hoặc dùng type="module"
// <script type="module">
//   const data = await fetch('/api/data');
// </script>
```

---

## Async function luôn trả về Promise?

### Mục đích / Purpose

Hiểu **async function luôn trả về Promise** giúp:

- Dự đoán behavior
- Xử lý async code
- Error handling nhất quán
- Code nhất quán

### Khi nào dùng / When to Use

Hiểu về async function behavior giúp:

- Dự đoán code behavior
- Xử lý async code
- Error handling
- Code nhất quán

### Giúp ích gì / Benefits

Hiểu về async function behavior giúp:

- **Predictable**: Dự đoán behavior
- **Consistent**: Code nhất quán
- **Error handling**: Error handling nhất quán
- **Flexible**: Có thể return Promise hoặc value

### Ưu nhược điểm / Pros & Cons

| Ưu điểm     | Nhược điểm            |
| ----------- | --------------------- | ---------------- |
| Predictable | Có thể gây confusion  | Learning curve   |
| Consistent  | Verbose hơn callbacks | Cần ES6+ support |

### Async function luôn trả về Promise:

```javascript
// Async function với return value
async function returnValue() {
  return "Value";
}

const promise = returnValue();
console.log(promise instanceof Promise); // true
promise.then((value) => console.log(value)); // 'Value'

// Async function với return Promise
async function returnPromise() {
  return Promise.resolve("From Promise");
}

const promise2 = returnPromise();
console.log(promise2 instanceof Promise); // true
promise2.then((value) => console.log(value)); // 'From Promise'

// Async function với throw
async function throwError() {
  throw new Error("Error in async");
}

const promise3 = throwError();
promise3.catch((error) => console.error(error.message)); // 'Error in async'
```

### Best Practices:

```javascript
// ✅ Async function luôn trả về Promise
async function getUser(userId) {
  // Có thể return value
  if (userId <= 0) {
    return null;
  }

  // Hoặc return Promise
  return fetch(`/api/users/${userId}`).then((response) => response.json());
}

// Dùng như Promise
getUser(1)
  .then((user) => {
    if (user) {
      console.log("User:", user);
    } else {
      console.log("User not found");
    }
  })
  .catch((error) => console.error("Error:", error.message));
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng async function khi không cần async
function syncFunction() {
  return 42;
}

// ✅ Nên dùng regular function
function syncFunction() {
  return 42;
}
```

---

## `for await...of`?

**`for await...of`** - lặp qua async iterables (ví dụ: ReadableStream, async generator).

### Mục đích / Purpose

**`for await...of`** được thiết kế để:

- Lặp qua async iterables
- Process async sequences
- Read streams
- Async generators

### Khi nào dùng / When to Use

`for await...of` nên dùng khi:

- Lặp qua async iterables
- Process async sequences
- Read streams
- Async generators

### Giúp ích gì / Benefits

**Lợi ích:**

- **Async iteration**: Lặp async data
- **Stream processing**: Process streams
- **Clean code**: Code gọn hơn callbacks
- **Sequential**: Sequential processing

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm               |
| ----------------- | ------------------------ | --------------------- |
| Async iteration   | Cần ES2018+              | Verbose hơn callbacks |
| Stream processing | Có thể chậm hơn parallel | Learning curve        |

### Basic usage:

```javascript
// Async generator
async function* asyncGenerator() {
  yield await delay(1000, "First");
  yield await delay(1000, "Second");
  yield await delay(1000, "Third");
}

function delay(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

// Lặp qua async generator
async function iterate() {
  for await (const value of asyncGenerator()) {
    console.log("Value:", value);
  }
}

iterate();
// (sau 1 giây) 'Value: First'
// (sau 2 giây) 'Value: Second'
// (sau 3 giây) 'Value: Third'
```

### Best Practices:

```javascript
// ✅ Dùng for await...of cho:
// - Async generators
// - ReadableStream
// - Async sequences
async function processStream(stream) {
  const decoder = new TextDecoder();
  let result = "";

  for await (const chunk of stream) {
    result += decoder.decode(chunk);
    console.log("Received chunk");
  }

  return result;
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng for...of cho async generators
async function badIteration() {
  const generator = asyncGenerator();
  for (const value of generator) {
    console.log(value);
  }
}

// ✅ Nên dùng for await...of
async function goodIteration() {
  const generator = asyncGenerator();
  for await (const value of generator) {
    console.log(value);
  }
}
```
