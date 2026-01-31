# 46. Implement `Promise.race` / Triển khai `Promise.race`

> Implement Promise.race from scratch / Triển khai Promise.race từ đầu

---

## Overview / Tổng quan

`Promise.race()` là một phương thức tĩnh của Promise nhận vào một mảng các promise và trả về một promise mới. Promise mới này sẽ resolved hoặc rejected ngay khi bất kỳ promise nào trong mảng được resolved hoặc rejected đầu tiên. Việc triển khai `Promise.race` từ đầu giúp hiểu sâu hơn về cách hoạt động của Promise và race conditions.

`Promise.race()` is a static Promise method that takes an array of promises and returns a new promise. This new promise resolves or rejects as soon as any promise in the array resolves or rejects first. Implementing `Promise.race` from scratch helps understand how Promises work and race conditions.

## Purpose / Mục đích

- Hiểu sâu về cách hoạt động của `Promise.race()`
- Biết cách xử lý race conditions
- Nắm vững các khái niệm về Promise states và transitions
- Hiểu về async/await và Promise chaining

- Understand deeply how `Promise.race()` works
- Know how to handle race conditions
- Master Promise states and transitions concepts
- Understand async/await and Promise chaining

## When to Use / Khi nào nên dùng

- Khi cần lấy kết quả từ nguồn nhanh nhất
- Khi muốn timeout một async operation
- Khi muốn thử nhiều nguồn và lấy kết quả đầu tiên
- Khi cần xử lý race conditions

- When getting results from the fastest source
- When wanting to timeout an async operation
- When trying multiple sources and taking the first result
- When handling race conditions

## Benefits / Lợi ích

- Cho phép xử lý nhiều async operations song song
- Lấy kết quả nhanh nhất từ nhiều nguồn
- Hữu ích cho timeout và fallback mechanisms
- Giảm thời gian chờ đợi tổng thể

- Allows handling multiple async operations in parallel
- Gets the fastest result from multiple sources
- Useful for timeout and fallback mechanisms
- Reduces overall waiting time

## Pros & Cons / Ưu điểm & Nhược điểm

### Pros / Ưu điểm

- Lấy kết quả nhanh nhất từ nhiều nguồn
- Hữu ích cho timeout operations
- Có thể kết hợp với fallback logic

- Gets the fastest result from multiple sources
- Useful for timeout operations
- Can be combined with fallback logic

### Cons / Nhược điểm

- Chỉ trả về kết quả của promise đầu tiên hoàn thành
- Các promise khác vẫn chạy trong background
- Có thể khó debug khi có nhiều async operations

- Only returns the result of the first completed promise
- Other promises still run in the background
- Can be difficult to debug with multiple async operations

## Examples / Ví dụ

### 1. Basic Promise.race implementation / Triển khai Promise.race cơ bản

```javascript
/**
 * Implement Promise.race
 * Triển khai Promise.race
 * @param {Iterable<Promise>} promises - Iterable of promises / Iterable của các promises
 * @returns {Promise} Promise that resolves/rejects with the first settled promise / Promise resolve/reject với promise đầu tiên hoàn thành
 */
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    // Handle empty iterable / Xử lý iterable rỗng
    if (promises.length === 0) {
      return; // Promise stays pending forever / Promise giữ pending mãi mãi
    }

    // Convert to array if needed / Chuyển thành mảng nếu cần
    const promiseArray = Array.from(promises);

    // Attach handlers to all promises / Gắn handlers cho tất cả promises
    promiseArray.forEach((promise, index) => {
      // Handle non-promise values / Xử lý các giá trị không phải promise
      Promise.resolve(promise).then(
        (value) => {
          // First promise to resolve wins / Promise đầu tiên resolve thắng
          resolve(value);
        },
        (reason) => {
          // First promise to reject wins / Promise đầu tiên reject thắng
          reject(reason);
        },
      );
    });
  });
}

// Test cases / Các trường hợp kiểm thử
// First promise resolves first / Promise đầu tiên resolve trước
const promise1 = new Promise((resolve) =>
  setTimeout(() => resolve("first"), 100),
);
const promise2 = new Promise((resolve) =>
  setTimeout(() => resolve("second"), 200),
);
const promise3 = new Promise((resolve) =>
  setTimeout(() => resolve("third"), 300),
);

promiseRace([promise1, promise2, promise3])
  .then((value) => console.log("Winner:", value))
  .catch((error) => console.log("Error:", error));
// Output: Winner: first

// First promise rejects first / Promise đầu tiên reject trước
const promise4 = new Promise((_, reject) =>
  setTimeout(() => reject("error"), 100),
);
const promise5 = new Promise((resolve) =>
  setTimeout(() => resolve("success"), 200),
);

promiseRace([promise4, promise5])
  .then((value) => console.log("Winner:", value))
  .catch((error) => console.log("Error:", error));
// Output: Error: error
```

### 2. Timeout with Promise.race / Timeout với Promise.race

```javascript
/**
 * Create a timeout promise
 * Tạo promise timeout
 * @param {number} ms - Timeout in milliseconds / Timeout tính bằng mili-giây
 * @returns {Promise} Promise that rejects after timeout / Promise reject sau timeout
 */
function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
  });
}

/**
 * Fetch with timeout
 * Fetch với timeout
 * @param {string} url - URL to fetch / URL để fetch
 * @param {number} timeoutMs - Timeout in milliseconds / Timeout tính bằng mili-giây
 * @returns {Promise} Promise that resolves with fetch result or rejects on timeout / Promise resolve với kết quả fetch hoặc reject khi timeout
 */
function fetchWithTimeout(url, timeoutMs) {
  return promiseRace([fetch(url), timeout(timeoutMs)]);
}

// Example usage / Ví dụ sử dụng
// fetchWithTimeout('https://api.example.com/data', 5000)
//   .then(response => response.json())
//   .then(data => console.log('Data:', data))
//   .catch(error => {
//     if (error.message.includes('Timeout')) {
//       console.log('Request timed out');
//     } else {
//       console.log('Fetch error:', error);
//     }
//   });
```

### 3. Racing multiple sources / Đua nhiều nguồn

```javascript
/**
 * Fetch from multiple sources and return the first successful result
 * Fetch từ nhiều nguồn và trả về kết quả thành công đầu tiên
 * @param {Array<string>} urls - Array of URLs / Mảng các URLs
 * @returns {Promise} Promise that resolves with first successful response / Promise resolve với phản hồi thành công đầu tiên
 */
function fetchFromAny(urls) {
  const fetchPromises = urls.map((url) =>
    fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }),
  );

  return promiseRace(fetchPromises);
}

// Example / Ví dụ
// const sources = [
//   'https://api1.example.com/data',
//   'https://api2.example.com/data',
//   'https://api3.example.com/data'
// ];
//
// fetchFromAny(sources)
//   .then(data => console.log('First successful response:', data))
//   .catch(error => console.log('All sources failed:', error));
```

### 4. Promise.race with non-promise values / Promise.race với giá trị không phải promise

```javascript
// Non-promise values are treated as already resolved promises
// Các giá trị không phải promise được coi là promises đã resolve

const promise1 = new Promise((resolve) =>
  setTimeout(() => resolve("slow"), 100),
);
const promise2 = "immediate"; // Non-promise value / Giá trị không phải promise
const promise3 = new Promise((resolve) =>
  setTimeout(() => resolve("fast"), 50),
);

promiseRace([promise1, promise2, promise3])
  .then((value) => console.log("Winner:", value))
  .catch((error) => console.log("Error:", error));
// Output: Winner: immediate (non-promise values win immediately)
```

### 5. Empty array handling / Xử lý mảng rỗng

```javascript
// Empty array - promise never settles
// Mảng rỗng - promise không bao giờ hoàn thành

const emptyPromise = promiseRace([]);
console.log("Empty promise state:", emptyPromise); // Promise {<pending>}

// This promise will never resolve or reject
// Promise này sẽ không bao giờ resolve hay reject
```

### 6. Promise.race vs Promise.all / Promise.race so với Promise.all

```javascript
const promise1 = new Promise((resolve) =>
  setTimeout(() => resolve("first"), 100),
);
const promise2 = new Promise((resolve) =>
  setTimeout(() => resolve("second"), 200),
);
const promise3 = new Promise((resolve) =>
  setTimeout(() => resolve("third"), 300),
);

// Promise.race - returns first result / Trả về kết quả đầu tiên
console.time("Promise.race");
promiseRace([promise1, promise2, promise3]).then((value) => {
  console.timeEnd("Promise.race");
  console.log("Race result:", value); // ~100ms
});

// Promise.all - returns all results / Trả về tất cả kết quả
console.time("Promise.all");
Promise.all([promise1, promise2, promise3]).then((values) => {
  console.timeEnd("Promise.all");
  console.log("All results:", values); // ~300ms
});
```

### 7. Cancellation with Promise.race / Hủy bỏ với Promise.race

```javascript
/**
 * Create a cancellable promise
 * Tạo promise có thể hủy bỏ
 * @param {Function} executor - Promise executor function / Hàm executor của promise
 * @returns {Object} Object with promise and cancel function / Object chứa promise và hàm hủy
 */
function makeCancellable(executor) {
  let cancel;

  const cancelPromise = new Promise((_, reject) => {
    cancel = () => reject(new Error("Cancelled"));
  });

  const promise = promiseRace([new Promise(executor), cancelPromise]);

  return { promise, cancel };
}

// Example usage / Ví dụ sử dụng
const { promise, cancel } = makeCancellable((resolve) => {
  setTimeout(() => resolve("Operation completed"), 5000);
});

promise
  .then((result) => console.log("Result:", result))
  .catch((error) => console.log("Error:", error.message));

// Cancel after 1 second / Hủy sau 1 giây
setTimeout(() => cancel(), 1000);
// Output: Error: Cancelled
```

### 8. Promise.race with error handling / Promise.race với xử lý lỗi

```javascript
/**
 * Promise.race with error recovery
 * Promise.race với khôi phục lỗi
 * @param {Array<Promise>} promises - Array of promises / Mảng các promises
 * @param {Function} onError - Error handler function / Hàm xử lý lỗi
 * @returns {Promise} Promise that resolves with first result / Promise resolve với kết quả đầu tiên
 */
function promiseRaceWithErrorHandling(promises, onError) {
  const handledPromises = promises.map((promise) =>
    Promise.resolve(promise).catch((error) => {
      onError(error);
      // Return a never-resolving promise to allow others to win
      // Trả về promise không bao giờ resolve để cho phép các promise khác thắng
      return new Promise(() => {});
    }),
  );

  return promiseRace(handledPromises);
}

// Example / Ví dụ
const promise1 = Promise.reject(new Error("Failed 1"));
const promise2 = new Promise((resolve) =>
  setTimeout(() => resolve("Success 2"), 100),
);
const promise3 = new Promise((resolve) =>
  setTimeout(() => resolve("Success 3"), 200),
);

promiseRaceWithErrorHandling([promise1, promise2, promise3], (error) =>
  console.log("Error:", error.message),
).then((result) => console.log("Winner:", result));
// Output:
// Error: Failed 1
// Winner: Success 2
```

### 9. Performance comparison / So sánh hiệu năng

```javascript
// Test data / Dữ liệu kiểm thử
const promises = Array.from(
  { length: 10 },
  (_, i) =>
    new Promise((resolve) =>
      setTimeout(() => resolve(i), Math.random() * 1000),
    ),
);

// Test built-in Promise.race / Kiểm tra Promise.race tích hợp
console.time("Built-in Promise.race");
Promise.race(promises).then(() => console.timeEnd("Built-in Promise.race"));

// Test custom promiseRace / Kiểm tra promiseRace tùy chỉnh
const promisesCopy = Array.from(
  { length: 10 },
  (_, i) =>
    new Promise((resolve) =>
      setTimeout(() => resolve(i), Math.random() * 1000),
    ),
);

console.time("Custom promiseRace");
promiseRace(promisesCopy).then(() => console.timeEnd("Custom promiseRace"));
```

## Best Practices / Thực hành tốt nhất

1. **Always handle rejections in Promise.race / Luôn xử lý rejections trong Promise.race**

   ```javascript
   // Good / Tốt
   promiseRace([promise1, promise2])
     .then((result) => console.log(result))
     .catch((error) => console.error(error));

   // Bad / Không tốt - No error handling / Không xử lý lỗi
   promiseRace([promise1, promise2]).then((result) => console.log(result));
   ```

2. **Use Promise.race for timeouts / Sử dụng Promise.race cho timeouts**

   ```javascript
   // Good / Tốt
   const result = await promiseRace([fetchData(), timeout(5000)]);
   ```

3. **Be careful with empty arrays / Cẩn thận với mảng rỗng**

   ```javascript
   // Promise.race with empty array never settles
   // Promise.race với mảng rỗng không bao giờ hoàn thành
   const result = await promiseRace([]); // Never resolves / Không bao giờ resolve
   ```

4. **Consider using Promise.any for "first success" / Cân nhắc sử dụng Promise.any cho "thành công đầu tiên"**

   ```javascript
   // Promise.race - first to settle (resolve or reject)
   // Promise.any - first to resolve (ignores rejections)

   // Use Promise.race when you want the first result regardless of success/failure
   // Sử dụng Promise.race khi bạn muốn kết quả đầu tiên bất kể thành công/thất bại

   // Use Promise.any when you want the first successful result
   // Sử dụng Promise.any khi bạn muốn kết quả thành công đầu tiên
   ```

5. **Clean up resources after race completes / Dọn dẹp tài nguyên sau khi race hoàn thành**

   ```javascript
   // Good / Tốt - Use AbortController / Sử dụng AbortController
   const controller = new AbortController();

   const fetchPromise = fetch(url, { signal: controller.signal });

   try {
     const result = await promiseRace([fetchPromise, timeout(5000)]);
     return result;
   } finally {
     controller.abort(); // Cancel ongoing fetch / Hủy fetch đang chạy
   }
   ```

## Anti-patterns / Các mẫu nên tránh

### 1. Not handling rejections / Không xử lý rejections

```javascript
// BAD / KHÔNG TỐT - Unhandled rejection / Rejection không được xử lý
promiseRace([promise1, promise2]).then((result) => console.log(result));

// GOOD / TỐT - Handle errors / Xử lý lỗi
promiseRace([promise1, promise2])
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

### 2. Forgetting that other promises continue running / Quên rằng các promise khác vẫn chạy

```javascript
// BAD / KHÔNG TỐT - Other promises continue running
// Các promise khác vẫn chạy
const promise1 = fetch(url1);
const promise2 = fetch(url2);

const result = await promiseRace([promise1, promise2]);
// promise2 (if slower) continues running in the background
// promise2 (nếu chậm hơn) vẫn chạy trong background

// BETTER / TỐT HƠN - Use AbortController to cancel / Sử dụng AbortController để hủy
const controller1 = new AbortController();
const controller2 = new AbortController();

const promise1 = fetch(url1, { signal: controller1.signal });
const promise2 = fetch(url2, { signal: controller2.signal });

const result = await promiseRace([promise1, promise2]);
controller1.abort();
controller2.abort();
```

### 3. Using Promise.race when Promise.all is more appropriate / Sử dụng Promise.race khi Promise.all phù hợp hơn

```javascript
// BAD / KHÔNG TỐT - Only gets first result / Chỉ lấy kết quả đầu tiên
const results = await promiseRace([
  fetchUser(id1),
  fetchUser(id2),
  fetchUser(id3),
]);
// Only gets one user / Chỉ lấy một user

// GOOD / TỐT - Gets all results / Lấy tất cả kết quả
const results = await Promise.all([
  fetchUser(id1),
  fetchUser(id2),
  fetchUser(id3),
]);
// Gets all users / Lấy tất cả users
```

### 4. Not handling empty arrays / Không xử lý mảng rỗng

```javascript
// BAD / KHÔNG TỐT - Promise never settles / Promise không bao giờ hoàn thành
const result = await promiseRace([]); // Hangs forever / Treo mãi mãi

// GOOD / TỐT - Handle empty array / Xử lý mảng rỗng
function safePromiseRace(promises) {
  if (promises.length === 0) {
    return Promise.reject(new Error("No promises provided"));
  }
  return promiseRace(promises);
}
```

## References / Tài liệu tham khảo

- [MDN: Promise.race()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)
- [ECMAScript Specification: Promise.race](https://tc39.es/ecma262/#sec-promise.race)
- [JavaScript.info: Promise API](https://javascript.info/promise-api)
- [You Don't Know JS: Async & Performance](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch3.md)
