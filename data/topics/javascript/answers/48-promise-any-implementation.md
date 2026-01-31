# 48. Implement `Promise.any` / Triển khai `Promise.any`

> Implement Promise.any from scratch / Triển khai Promise.any từ đầu

---

## Overview / Tổng quan

`Promise.any()` là một phương thức tĩnh của Promise nhận vào một mảng các promise và trả về một promise mới. Promise mới này sẽ resolved ngay khi bất kỳ promise nào trong mảng được resolved đầu tiên. Nếu tất cả các promises đều bị reject, nó sẽ reject với một AggregateError chứa tất cả các lý do reject. Đây là phương thức hữu ích khi bạn muốn lấy kết quả thành công đầu tiên từ nhiều nguồn.

`Promise.any()` is a static Promise method that takes an array of promises and returns a new promise. This new promise resolves as soon as any promise in the array resolves first. If all promises are rejected, it rejects with an AggregateError containing all rejection reasons. This is a useful method when you want to get the first successful result from multiple sources.

## Purpose / Mục đích

- Hiểu sâu về cách hoạt động của `Promise.any()`
- Biết sự khác biệt giữa `Promise.any`, `Promise.race`, và `Promise.all`
- Nắm vững các khái niệm về AggregateError
- Hiểu về handling multiple async sources với fallback

- Understand deeply how `Promise.any()` works
- Know the difference between `Promise.any`, `Promise.race`, and `Promise.all`
- Master AggregateError concepts
- Understand handling multiple async sources with fallback

## When to Use / Khi nào nên dùng

- Khi cần lấy kết quả thành công đầu tiên từ nhiều nguồn
- Khi có nhiều backup servers và muốn lấy phản hồi nhanh nhất
- Khi muốn thử nhiều cách và lấy cách thành công đầu tiên
- Khi muốn fail-fast chỉ khi tất cả đều thất bại

- When getting the first successful result from multiple sources
- When having multiple backup servers and want the fastest response
- When trying multiple approaches and taking the first successful one
- When wanting to fail-fast only when all fail

## Benefits / Lợi ích

- Lấy kết quả thành công đầu tiên nhanh nhất
- Hữu ích cho fallback mechanisms
- Chỉ fail khi tất cả promises đều thất bại
- Giảm thời gian chờ đợi khi có nhiều nguồn

- Gets the first successful result fastest
- Useful for fallback mechanisms
- Only fails when all promises fail
- Reduces waiting time when there are multiple sources

## Pros & Cons / Ưu điểm & Nhược điểm

### Pros / Ưu điểm

- Lấy kết quả thành công đầu tiên
- Hữu ích cho backup/fallback scenarios
- Chỉ reject khi tất cả đều thất bại
- Tự động bỏ qua các promises bị reject

- Gets the first successful result
- Useful for backup/fallback scenarios
- Only rejects when all fail
- Automatically skips rejected promises

### Cons / Nhược điểm

- Cần xử lý AggregateError khi tất cả thất bại
- Các promises khác vẫn chạy trong background
- Có thể khó debug khi có nhiều async operations

- Need to handle AggregateError when all fail
- Other promises still run in the background
- Can be difficult to debug with multiple async operations

## Examples / Ví dụ

### 1. Basic Promise.any implementation / Triển khai Promise.any cơ bản

```javascript
/**
 * Implement Promise.any
 * Triển khai Promise.any
 * @param {Iterable<Promise>} promises - Iterable of promises / Iterable của các promises
 * @returns {Promise} Promise that resolves with first fulfilled value or rejects with AggregateError / Promise resolve với giá trị fulfill đầu tiên hoặc reject với AggregateError
 */
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    // Convert to array if needed / Chuyển thành mảng nếu cần
    const promiseArray = Array.from(promises);
    const errors = [];
    let rejectedCount = 0;

    // Handle empty array / Xử lý mảng rỗng
    if (promiseArray.length === 0) {
      return reject(new AggregateError([], "All promises were rejected"));
    }

    // Attach handlers to all promises / Gắn handlers cho tất cả promises
    promiseArray.forEach((promise, index) => {
      // Handle non-promise values / Xử lý các giá trị không phải promise
      Promise.resolve(promise).then(
        (value) => {
          // First promise to fulfill wins / Promise đầu tiên fulfill thắng
          resolve(value);
        },
        (reason) => {
          // Collect rejection reasons / Thu thập các lý do reject
          errors[index] = reason;
          rejectedCount++;

          // Check if all promises have rejected / Kiểm tra nếu tất cả promises đã reject
          if (rejectedCount === promiseArray.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        },
      );
    });
  });
}

// Test cases / Các trường hợp kiểm thử
// First promise fulfills / Promise đầu tiên fulfill
const promise1 = new Promise((resolve) =>
  setTimeout(() => resolve("first"), 100),
);
const promise2 = new Promise((resolve) =>
  setTimeout(() => resolve("second"), 200),
);
const promise3 = new Promise((resolve) =>
  setTimeout(() => resolve("third"), 300),
);

promiseAny([promise1, promise2, promise3])
  .then((value) => console.log("Winner:", value))
  .catch((error) => console.log("Error:", error));
// Output: Winner: first

// First promise fulfills after some rejections / Promise đầu tiên fulfill sau một số rejections
const promise4 = Promise.reject(new Error("Failed 1"));
const promise5 = new Promise((resolve) =>
  setTimeout(() => resolve("Success"), 100),
);
const promise6 = Promise.reject(new Error("Failed 2"));

promiseAny([promise4, promise5, promise6])
  .then((value) => console.log("Winner:", value))
  .catch((error) => console.log("Error:", error));
// Output: Winner: Success

// All promises reject / Tất cả promises reject
const promise7 = Promise.reject(new Error("Error 1"));
const promise8 = Promise.reject(new Error("Error 2"));
const promise9 = Promise.reject(new Error("Error 3"));

promiseAny([promise7, promise8, promise9])
  .then((value) => console.log("Winner:", value))
  .catch((error) => {
    console.log("All failed:", error.message);
    console.log("Errors:", error.errors);
  });
// Output:
// All failed: All promises were rejected
// Errors: [Error: Error 1, Error: Error 2, Error: Error 3]
```

### 2. Promise.any vs Promise.race / Promise.any so với Promise.race

```javascript
const promise1 = Promise.resolve("Success 1");
const promise2 = Promise.reject(new Error("Failed"));
const promise3 = Promise.resolve("Success 2");

// Promise.race - first to settle (resolve or reject) / Đầu tiên hoàn thành
Promise.race([promise1, promise2, promise3])
  .then((result) => console.log("Race result:", result))
  .catch((error) => console.log("Race error:", error.message));
// Output: Race result: Success 1

// Promise.any - first to fulfill (ignores rejections) / Đầu tiên fulfill (bỏ qua rejections)
Promise.any([promise1, promise2, promise3])
  .then((result) => console.log("Any result:", result))
  .catch((error) => console.log("Any error:", error.message));
// Output: Any result: Success 1

// With rejections first / Với các rejections trước
const promise4 = Promise.reject(new Error("Failed 1"));
const promise5 = Promise.reject(new Error("Failed 2"));
const promise6 = Promise.resolve("Success");

// Promise.race - rejects on first rejection / Reject khi có rejection đầu tiên
Promise.race([promise4, promise5, promise6])
  .then((result) => console.log("Race result 2:", result))
  .catch((error) => console.log("Race error 2:", error.message));
// Output: Race error 2: Failed 1

// Promise.any - waits for first fulfillment / Chờ fulfillment đầu tiên
Promise.any([promise4, promise5, promise6])
  .then((result) => console.log("Any result 2:", result))
  .catch((error) => console.log("Any error 2:", error.message));
// Output: Any result 2: Success
```

### 3. Fallback pattern with Promise.any / Mẫu fallback với Promise.any

```javascript
/**
 * Fetch from multiple sources with fallback
 * Fetch từ nhiều nguồn với fallback
 * @param {Array<string>} urls - Array of URLs to try / Mảng các URLs để thử
 * @returns {Promise} Promise that resolves with first successful response / Promise resolve với phản hồi thành công đầu tiên
 */
async function fetchWithFallback(urls) {
  const fetchPromises = urls.map((url) =>
    fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }),
  );

  return promiseAny(fetchPromises);
}

// Example usage / Ví dụ sử dụng
// const sources = [
//   'https://api-primary.example.com/data',
//   'https://api-backup1.example.com/data',
//   'https://api-backup2.example.com/data'
// ];
//
// try {
//   const data = await fetchWithFallback(sources);
//   console.log('Got data:', data);
// } catch (error) {
//   console.error('All sources failed:', error.errors);
// }
```

### 4. Promise.any with non-promise values / Promise.any với giá trị không phải promise

```javascript
// Non-promise values are treated as already fulfilled promises
// Các giá trị không phải promise được coi là promises đã fulfill

const promise1 = new Promise((resolve) =>
  setTimeout(() => resolve("slow"), 100),
);
const promise2 = "immediate"; // Non-promise value / Giá trị không phải promise
const promise3 = new Promise((resolve) =>
  setTimeout(() => resolve("fast"), 50),
);

promiseAny([promise1, promise2, promise3])
  .then((value) => console.log("Winner:", value))
  .catch((error) => console.log("Error:", error));
// Output: Winner: immediate (non-promise values win immediately)
```

### 5. Empty array handling / Xử lý mảng rỗng

```javascript
// Empty array - rejects immediately with AggregateError
// Mảng rỗng - reject ngay lập tức với AggregateError

promiseAny([])
  .then((value) => console.log("Value:", value))
  .catch((error) => {
    console.log("Empty array error:", error.message);
    console.log("Errors:", error.errors);
  });
// Output:
// Empty array error: All promises were rejected
// Errors: []
```

### 6. AggregateError handling / Xử lý AggregateError

```javascript
/**
 * Handle AggregateError from Promise.any
 * Xử lý AggregateError từ Promise.any
 * @param {AggregateError} error - AggregateError to handle / AggregateError để xử lý
 */
function handleAggregateError(error) {
  if (error instanceof AggregateError) {
    console.log("All promises failed with", error.errors.length, "errors:");
    error.errors.forEach((err, index) => {
      console.log(`Error ${index + 1}:`, err.message || err);
    });
  } else {
    console.log("Unexpected error:", error);
  }
}

// Example / Ví dụ
const promises = [
  Promise.reject(new Error("Network error")),
  Promise.reject(new Error("Timeout")),
  Promise.reject(new Error("Server error")),
];

promiseAny(promises)
  .then((result) => console.log("Result:", result))
  .catch((error) => handleAggregateError(error));
// Output:
// All promises failed with 3 errors:
// Error 1: Network error
// Error 2: Timeout
// Error 3: Server error
```

### 7. Retry pattern with Promise.any / Mẫu retry với Promise.any

```javascript
/**
 * Retry operation multiple times and return first success
// Thử lại operation nhiều lần và trả về thành công đầu tiên
 * @param {Function} operation - Async function to retry / Hàm async để thử lại
 * @param {number} maxRetries - Maximum number of retries / Số lần thử lại tối đa
 * @param {number} delay - Delay between retries in ms / Độ trễ giữa các lần thử lại (ms)
 * @returns {Promise} Promise that resolves with first success / Promise resolve với thành công đầu tiên
 */
function retry(operation, maxRetries = 3, delay = 1000) {
  const retryPromises = Array.from(
    { length: maxRetries },
    (_, i) =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const result = await operation();
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, i * delay);
      }),
  );

  return promiseAny(retryPromises);
}

// Example usage / Ví dụ sử dụng
// let attemptCount = 0;
//
// const unreliableOperation = async () => {
//   attemptCount++;
//   console.log(`Attempt ${attemptCount}`);
//
//   if (attemptCount < 3) {
//     throw new Error(`Failed at attempt ${attemptCount}`);
//   }
//
//   return 'Success!';
// };
//
// retry(unreliableOperation, 5, 500)
//   .then(result => console.log('Result:', result))
//   .catch(error => console.log('All retries failed:', error.errors));
```

### 8. Performance comparison / So sánh hiệu năng

```javascript
// Test data / Dữ liệu kiểm thử
const promises = Array.from({ length: 10 }, (_, i) =>
  i === 5
    ? Promise.resolve(i) // This one will fulfill first / Cái này sẽ fulfill đầu tiên
    : Promise.reject(new Error(`Error ${i}`)),
);

// Test built-in Promise.any / Kiểm tra Promise.any tích hợp
console.time("Built-in Promise.any");
Promise.any(promises).then(() => console.timeEnd("Built-in Promise.any"));

// Test custom promiseAny / Kiểm tra promiseAny tùy chỉnh
const promisesCopy = Array.from({ length: 10 }, (_, i) =>
  i === 5 ? Promise.resolve(i) : Promise.reject(new Error(`Error ${i}`)),
);

console.time("Custom promiseAny");
promiseAny(promisesCopy).then(() => console.timeEnd("Custom promiseAny"));
```

### 9. Comparing Promise methods / So sánh các phương thức Promise

```javascript
const promise1 = Promise.resolve(1);
const promise2 = Promise.reject(new Error("Error"));
const promise3 = Promise.resolve(3);

// Promise.all - rejects on first failure / Reject khi có lỗi đầu tiên
Promise.all([promise1, promise2, promise3])
  .then((results) => console.log("All:", results))
  .catch((error) => console.log("All catch:", error.message));
// Output: All catch: Error

// Promise.allSettled - always resolves / Luôn resolve
Promise.allSettled([promise1, promise2, promise3]).then((results) =>
  console.log("AllSettled:", results),
);
// Output: AllSettled: [
//   { status: 'fulfilled', value: 1 },
//   { status: 'rejected', reason: Error: Error },
//   { status: 'fulfilled', value: 3 }
// ]

// Promise.race - first to settle / Đầu tiên hoàn thành
Promise.race([promise1, promise2, promise3])
  .then((result) => console.log("Race:", result))
  .catch((error) => console.log("Race catch:", error.message));
// Output: Race: 1

// Promise.any - first to fulfill / Đầu tiên fulfill
Promise.any([promise1, promise2, promise3])
  .then((result) => console.log("Any:", result))
  .catch((error) => console.log("Any catch:", error.message));
// Output: Any: 1
```

## Best Practices / Thực hành tốt nhất

1. **Always handle AggregateError / Luôn xử lý AggregateError**

   ```javascript
   // Good / Tốt
   try {
     const result = await Promise.any(promises);
     console.log("Success:", result);
   } catch (error) {
     if (error instanceof AggregateError) {
       console.error("All promises failed:", error.errors);
     } else {
       console.error("Unexpected error:", error);
     }
   }
   ```

2. **Use Promise.any for fallback scenarios / Sử dụng Promise.any cho các kịch bản fallback**

   ```javascript
   // Good / Tốt - Try multiple sources / Thử nhiều nguồn
   const data = await Promise.any([
     fetch(primaryUrl),
     fetch(backupUrl1),
     fetch(backupUrl2),
   ]);
   ```

3. **Be careful with empty arrays / Cẩn thận với mảng rỗng**

   ```javascript
   // Promise.any with empty array rejects immediately
   // Promise.any với mảng rỗng reject ngay lập tức
   try {
     const result = await Promise.any([]); // Always rejects / Luôn reject
   } catch (error) {
     console.log("No promises provided");
   }
   ```

4. **Consider using Promise.race for first settlement / Cân nhắc sử dụng Promise.race cho hoàn thành đầu tiên**

   ```javascript
   // Use Promise.race when you want the first result regardless of success/failure
   // Sử dụng Promise.race khi bạn muốn kết quả đầu tiên bất kể thành công/thất bại

   // Use Promise.any when you want the first successful result
   // Sử dụng Promise.any khi bạn muốn kết quả thành công đầu tiên
   ```

5. **Clean up resources after success / Dọn dẹp tài nguyên sau khi thành công**

   ```javascript
   // Good / Tốt - Use AbortController to cancel ongoing requests
   // Sử dụng AbortController để hủy các requests đang chạy
   const controller = new AbortController();

   const fetchPromises = urls.map((url) =>
     fetch(url, { signal: controller.signal }),
   );

   try {
     const result = await Promise.any(fetchPromises);
     controller.abort(); // Cancel other requests / Hủy các requests khác
     return result;
   } catch (error) {
     controller.abort();
     throw error;
   }
   ```

## Anti-patterns / Các mẫu nên tránh

### 1. Not handling AggregateError properly / Không xử lý AggregateError đúng cách

```javascript
// BAD / KHÔNG TỐT - Not checking error type / Không kiểm tra kiểu lỗi
try {
  const result = await Promise.any(promises);
  console.log(result);
} catch (error) {
  console.log("Error:", error.message); // Loses individual errors / Mất các lỗi riêng lẻ
}

// GOOD / TỐT - Handle AggregateError properly / Xử lý AggregateError đúng cách
try {
  const result = await Promise.any(promises);
  console.log(result);
} catch (error) {
  if (error instanceof AggregateError) {
    console.log("All failed with errors:", error.errors);
  } else {
    console.log("Unexpected error:", error);
  }
}
```

### 2. Forgetting that other promises continue running / Quên rằng các promise khác vẫn chạy

```javascript
// BAD / KHÔNG TỐT - Other promises continue running
// Các promise khác vẫn chạy
const promise1 = fetch(url1);
const promise2 = fetch(url2);
const promise3 = fetch(url3);

const result = await Promise.any([promise1, promise2, promise3]);
// Other fetches continue in the background / Các fetch khác vẫn chạy trong background

// BETTER / TỐT HƠN - Use AbortController to cancel / Sử dụng AbortController để hủy
const controller1 = new AbortController();
const controller2 = new AbortController();
const controller3 = new AbortController();

const promise1 = fetch(url1, { signal: controller1.signal });
const promise2 = fetch(url2, { signal: controller2.signal });
const promise3 = fetch(url3, { signal: controller3.signal });

const result = await Promise.any([promise1, promise2, promise3]);
controller1.abort();
controller2.abort();
controller3.abort();
```

### 3. Using Promise.any when Promise.all is more appropriate / Sử dụng Promise.any khi Promise.all phù hợp hơn

```javascript
// BAD / KHÔNG TỐT - Only gets one result / Chỉ lấy một kết quả
const result = await Promise.any([
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
// BAD / KHÔNG TỐT - Always rejects / Luôn reject
const result = await Promise.any([]); // Throws AggregateError / Ném AggregateError

// GOOD / TỐT - Handle empty array / Xử lý mảng rỗng
function safePromiseAny(promises) {
  const promiseArray = Array.from(promises);
  if (promiseArray.length === 0) {
    return Promise.reject(new Error("No promises provided"));
  }
  return Promise.any(promiseArray);
}
```

## References / Tài liệu tham khảo

- [MDN: Promise.any()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)
- [ECMAScript Specification: Promise.any](https://tc39.es/ecma262/#sec-promise.any)
- [JavaScript.info: Promise API](https://javascript.info/promise-api)
- [You Don't Know JS: Async & Performance](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch3.md)
