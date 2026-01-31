# 47. Implement `Promise.allSettled` / Triển khai `Promise.allSettled`

> Implement Promise.allSettled from scratch / Triển khai Promise.allSettled từ đầu

---

## Overview / Tổng quan

`Promise.allSettled()` là một phương thức tĩnh của Promise nhận vào một mảng các promise và trả về một promise mới. Promise mới này sẽ resolved khi tất cả các promise trong mảng đã hoàn thành (đã resolved hoặc rejected), bất kể kết quả là thành công hay thất bại. Kết quả trả về là một mảng các objects chứa trạng thái và giá trị/lý do của mỗi promise.

`Promise.allSettled()` is a static Promise method that takes an array of promises and returns a new promise. This new promise resolves when all promises in the array have settled (either resolved or rejected), regardless of whether they succeeded or failed. The result is an array of objects containing the status and value/reason of each promise.

## Purpose / Mục đích

- Hiểu sâu về cách hoạt động của `Promise.allSettled()`
- Biết sự khác biệt giữa `Promise.all`, `Promise.allSettled`, và `Promise.any`
- Nắm vững các khái niệm về Promise states và settlements
- Hiểu về handling multiple async operations với mixed outcomes

- Understand deeply how `Promise.allSettled()` works
- Know the difference between `Promise.all`, `Promise.allSettled`, and `Promise.any`
- Master Promise states and settlements concepts
- Understand handling multiple async operations with mixed outcomes

## When to Use / Khi nào nên dùng

- Khi cần chạy nhiều async operations song song và muốn kết quả của tất cả
- Khi muốn xử lý cả thành công và thất bại của các promises
- Khi cần biết trạng thái cuối cùng của tất cả operations
- Khi không muốn một promise thất bại làm hỏng toàn bộ operation

- When running multiple async operations in parallel and want results from all
- When wanting to handle both successes and failures of promises
- When needing to know the final state of all operations
- When not wanting one failed promise to ruin the entire operation

## Benefits / Lợi ích

- Không bị reject khi có promise thất bại
- Lấy kết quả của tất cả promises bất kể thành công hay thất bại
- Hữu ích cho batch operations với mixed outcomes
- Giúp xử lý lỗi chi tiết hơn cho từng promise

- Doesn't reject when a promise fails
- Gets results from all promises regardless of success or failure
- Useful for batch operations with mixed outcomes
- Helps handle errors more granularly for each promise

## Pros & Cons / Ưu điểm & Nhược điểm

### Pros / Ưu điểm

- Luôn resolve, không bao giờ reject
- Lấy kết quả của tất cả promises
- Xử lý lỗi chi tiết cho từng promise
- Không bị ảnh hưởng bởi các promises thất bại

- Always resolves, never rejects
- Gets results from all promises
- Handles errors granularly for each promise
- Not affected by failed promises

### Cons / Nhược điểm

- Không thể fail-fast như `Promise.all`
- Cần xử lý kết quả thủ công để phân biệt thành công/thất bại
- Có thể chờ lâu hơn nếu có promise chậm

- Cannot fail-fast like `Promise.all`
- Need to manually handle results to distinguish success/failure
- May wait longer if there's a slow promise

## Examples / Ví dụ

### 1. Basic Promise.allSettled implementation / Triển khai Promise.allSettled cơ bản

```javascript
/**
 * Implement Promise.allSettled
 * Triển khai Promise.allSettled
 * @param {Iterable<Promise>} promises - Iterable of promises / Iterable của các promises
 * @returns {Promise<Array>} Promise that resolves with array of settlement objects / Promise resolve với mảng các objects settlement
 */
function promiseAllSettled(promises) {
  return new Promise((resolve) => {
    // Convert to array if needed / Chuyển thành mảng nếu cần
    const promiseArray = Array.from(promises);
    const results = new Array(promiseArray.length);
    let completedCount = 0;

    // Handle empty array / Xử lý mảng rỗng
    if (promiseArray.length === 0) {
      return resolve([]);
    }

    // Attach handlers to all promises / Gắn handlers cho tất cả promises
    promiseArray.forEach((promise, index) => {
      // Handle non-promise values / Xử lý các giá trị không phải promise
      Promise.resolve(promise).then(
        (value) => {
          // Promise fulfilled / Promise đã fulfilled
          results[index] = {
            status: "fulfilled",
            value: value,
          };
          completedCount++;

          // Check if all promises have settled / Kiểm tra nếu tất cả promises đã hoàn thành
          if (completedCount === promiseArray.length) {
            resolve(results);
          }
        },
        (reason) => {
          // Promise rejected / Promise đã rejected
          results[index] = {
            status: "rejected",
            reason: reason,
          };
          completedCount++;

          // Check if all promises have settled / Kiểm tra nếu tất cả promises đã hoàn thành
          if (completedCount === promiseArray.length) {
            resolve(results);
          }
        },
      );
    });
  });
}

// Test cases / Các trường hợp kiểm thử
// All promises fulfill / Tất cả promises fulfill
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

promiseAllSettled([promise1, promise2, promise3]).then((results) =>
  console.log("All fulfilled:", results),
);
// Output: All fulfilled: [
//   { status: 'fulfilled', value: 1 },
//   { status: 'fulfilled', value: 2 },
//   { status: 'fulfilled', value: 3 }
// ]

// Some promises reject / Một số promises reject
const promise4 = Promise.resolve(4);
const promise5 = Promise.reject(new Error("Failed"));
const promise6 = Promise.resolve(6);

promiseAllSettled([promise4, promise5, promise6]).then((results) =>
  console.log("Mixed results:", results),
);
// Output: Mixed results: [
//   { status: 'fulfilled', value: 4 },
//   { status: 'rejected', reason: Error: Failed },
//   { status: 'fulfilled', value: 6 }
// ]
```

### 2. Promise.allSettled vs Promise.all / Promise.allSettled so với Promise.all

```javascript
const promise1 = Promise.resolve("Success 1");
const promise2 = Promise.reject(new Error("Failed"));
const promise3 = Promise.resolve("Success 3");

// Promise.all - rejects on first failure / Reject khi có lỗi đầu tiên
Promise.all([promise1, promise2, promise3])
  .then((results) => console.log("All results:", results))
  .catch((error) => console.log("All error:", error.message));
// Output: All error: Failed

// Promise.allSettled - always resolves / Luôn resolve
promiseAllSettled([promise1, promise2, promise3]).then((results) =>
  console.log("AllSettled results:", results),
);
// Output: AllSettled results: [
//   { status: 'fulfilled', value: 'Success 1' },
//   { status: 'rejected', reason: Error: Failed },
//   { status: 'fulfilled', value: 'Success 3' }
// ]
```

### 3. Processing mixed results / Xử lý kết quả hỗn hợp

```javascript
/**
 * Process mixed results from Promise.allSettled
 * Xử lý kết quả hỗn hợp từ Promise.allSettled
 * @param {Array} results - Array of settlement objects / Mảng các objects settlement
 * @returns {Object} Object with fulfilled and rejected arrays / Object chứa mảng fulfilled và rejected
 */
function processResults(results) {
  const fulfilled = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);

  const rejected = results
    .filter((result) => result.status === "rejected")
    .map((result) => result.reason);

  return { fulfilled, rejected };
}

// Example / Ví dụ
const promises = [
  Promise.resolve("Data 1"),
  Promise.reject(new Error("Error 1")),
  Promise.resolve("Data 2"),
  Promise.reject(new Error("Error 2")),
  Promise.resolve("Data 3"),
];

promiseAllSettled(promises).then((results) => {
  const { fulfilled, rejected } = processResults(results);
  console.log("Fulfilled:", fulfilled);
  console.log("Rejected:", rejected);
});
// Output:
// Fulfilled: ['Data 1', 'Data 2', 'Data 3']
// Rejected: [Error: Error 1, Error: Error 2]
```

### 4. Batch operations with error handling / Batch operations với xử lý lỗi

```javascript
/**
 * Fetch multiple URLs and return all results
 * Fetch nhiều URLs và trả về tất cả kết quả
 * @param {Array<string>} urls - Array of URLs to fetch / Mảng các URLs để fetch
 * @returns {Promise<Array>} Promise that resolves with all results / Promise resolve với tất cả kết quả
 */
async function fetchAllUrls(urls) {
  const fetchPromises = urls.map(async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      // Return error instead of throwing / Trả về lỗi thay vì throw
      return { error: error.message, url };
    }
  });

  const results = await Promise.all(fetchPromises);
  return results;
}

// Alternative using Promise.allSettled / Thay thế sử dụng Promise.allSettled
async function fetchAllUrlsWithAllSettled(urls) {
  const fetchPromises = urls.map((url) =>
    fetch(url).then((response) => response.json()),
  );

  const results = await promiseAllSettled(fetchPromises);

  return results.map((result, index) => {
    if (result.status === "fulfilled") {
      return { success: true, data: result.value, url: urls[index] };
    } else {
      return { success: false, error: result.reason.message, url: urls[index] };
    }
  });
}

// Example usage / Ví dụ sử dụng
// const urls = [
//   'https://api1.example.com/data',
//   'https://api2.example.com/data',
//   'https://api3.example.com/data'
// ];
//
// const results = await fetchAllUrlsWithAllSettled(urls);
// results.forEach(result => {
//   if (result.success) {
//     console.log(`Success for ${result.url}:`, result.data);
//   } else {
//     console.log(`Error for ${result.url}:`, result.error);
//   }
// });
```

### 5. Promise.allSettled with non-promise values / Promise.allSettled với giá trị không phải promise

```javascript
// Non-promise values are treated as already fulfilled promises
// Các giá trị không phải promise được coi là promises đã fulfilled

const promise1 = Promise.resolve("Promise 1");
const promise2 = "Non-promise value";
const promise3 = Promise.resolve("Promise 3");
const promise4 = 123;

promiseAllSettled([promise1, promise2, promise3, promise4]).then((results) =>
  console.log("Mixed types:", results),
);
// Output: Mixed types: [
//   { status: 'fulfilled', value: 'Promise 1' },
//   { status: 'fulfilled', value: 'Non-promise value' },
//   { status: 'fulfilled', value: 'Promise 3' },
//   { status: 'fulfilled', value: 123 }
// ]
```

### 6. Empty array handling / Xử lý mảng rỗng

```javascript
// Empty array - resolves immediately with empty array
// Mảng rỗng - resolve ngay lập tức với mảng rỗng

promiseAllSettled([]).then((results) => console.log("Empty results:", results));
// Output: Empty results: []
```

### 7. Async/await with Promise.allSettled / Async/await với Promise.allSettled

```javascript
/**
 * Execute multiple async operations and handle all results
 * Thực thi nhiều async operations và xử lý tất cả kết quả
 * @param {Array<Function>} operations - Array of async functions / Mảng các hàm async
 * @returns {Promise<Object>} Object with success and failure counts / Object chứa số lượng thành công và thất bại
 */
async function executeAll(operations) {
  const promises = operations.map((op) => op());
  const results = await promiseAllSettled(promises);

  const successes = results.filter((r) => r.status === "fulfilled");
  const failures = results.filter((r) => r.status === "rejected");

  return {
    total: results.length,
    successes: successes.length,
    failures: failures.length,
    results: results,
  };
}

// Example / Ví dụ
const operations = [
  () => Promise.resolve("Operation 1"),
  () => Promise.reject(new Error("Operation 2 failed")),
  () => Promise.resolve("Operation 3"),
  () => Promise.reject(new Error("Operation 4 failed")),
  () => Promise.resolve("Operation 5"),
];

const summary = await executeAll(operations);
console.log("Summary:", summary);
// Output: Summary: {
//   total: 5,
//   successes: 3,
//   failures: 2,
//   results: [...]
// }
```

### 8. Performance comparison / So sánh hiệu năng

```javascript
// Test data / Dữ liệu kiểm thử
const promises = Array.from({ length: 100 }, (_, i) =>
  i % 3 === 0 ? Promise.reject(new Error(`Error ${i}`)) : Promise.resolve(i),
);

// Test built-in Promise.allSettled / Kiểm tra Promise.allSettled tích hợp
console.time("Built-in Promise.allSettled");
Promise.allSettled(promises).then(() =>
  console.timeEnd("Built-in Promise.allSettled"),
);

// Test custom promiseAllSettled / Kiểm tra promiseAllSettled tùy chỉnh
const promisesCopy = Array.from({ length: 100 }, (_, i) =>
  i % 3 === 0 ? Promise.reject(new Error(`Error ${i}`)) : Promise.resolve(i),
);

console.time("Custom promiseAllSettled");
promiseAllSettled(promisesCopy).then(() =>
  console.timeEnd("Custom promiseAllSettled"),
);
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
  .catch((error) => console.log("Any catch:", error));
// Output: Any: 1
```

## Best Practices / Thực hành tốt nhất

1. **Use Promise.allSettled when you need all results / Sử dụng Promise.allSettled khi cần tất cả kết quả**

   ```javascript
   // Good / Tốt - Get all results including failures / Lấy tất cả kết quả bao gồm cả lỗi
   const results = await Promise.allSettled(promises);
   const successful = results.filter((r) => r.status === "fulfilled");
   const failed = results.filter((r) => r.status === "rejected");
   ```

2. **Process results to separate successes and failures / Xử lý kết quả để tách thành công và thất bại**

   ```javascript
   // Good / Tốt
   const results = await Promise.allSettled(promises);

   const successes = results
     .filter((r) => r.status === "fulfilled")
     .map((r) => r.value);

   const failures = results
     .filter((r) => r.status === "rejected")
     .map((r) => r.reason);
   ```

3. **Use Promise.all when you need all to succeed / Sử dụng Promise.all khi cần tất cả thành công**

   ```javascript
   // Good / Tốt - Fail fast if any promise fails / Fail nhanh nếu có promise thất bại
   try {
     const results = await Promise.all(promises);
     // All succeeded / Tất cả thành công
   } catch (error) {
     // At least one failed / Ít nhất một thất bại
   }
   ```

4. **Handle errors appropriately / Xử lý lỗi phù hợp**

   ```javascript
   // Good / Tốt - Log errors and continue with successes / Ghi log lỗi và tiếp tục với thành công
   const results = await Promise.allSettled(promises);

   results.forEach((result, index) => {
     if (result.status === "fulfilled") {
       console.log(`Promise ${index} succeeded:`, result.value);
     } else {
       console.error(`Promise ${index} failed:`, result.reason);
     }
   });
   ```

5. **Consider using Promise.any for first success / Cân nhắc sử dụng Promise.any cho thành công đầu tiên**
   ```javascript
   // Use Promise.any when you want the first successful result
   // Sử dụng Promise.any khi bạn muốn kết quả thành công đầu tiên
   const result = await Promise.any(promises);
   ```

## Anti-patterns / Các mẫu nên tránh

### 1. Using Promise.allSettled when Promise.all is more appropriate / Sử dụng Promise.allSettled khi Promise.all phù hợp hơn

```javascript
// BAD / KHÔNG TỐT - More complex than needed / Phức tạp hơn cần thiết
const results = await Promise.allSettled(promises);
const allSuccessful = results.every((r) => r.status === "fulfilled");
if (allSuccessful) {
  const values = results.map((r) => r.value);
  // Process values / Xử lý giá trị
}

// GOOD / TỐT - Simpler and fail-fast / Đơn giản hơn và fail nhanh
try {
  const values = await Promise.all(promises);
  // Process values / Xử lý giá trị
} catch (error) {
  // Handle error / Xử lý lỗi
}
```

### 2. Not checking status before accessing value/reason / Không kiểm tra status trước khi truy cập value/reason

```javascript
// BAD / KHÔNG TỐT - May access undefined value or reason
// Có thể truy cập value hoặc reason undefined
const results = await Promise.allSettled(promises);
results.forEach((result) => {
  console.log(result.value); // Error if rejected / Lỗi nếu rejected
  console.log(result.reason); // Error if fulfilled / Lỗi nếu fulfilled
});

// GOOD / TỐT - Check status first / Kiểm tra status trước
const results = await Promise.allSettled(promises);
results.forEach((result) => {
  if (result.status === "fulfilled") {
    console.log(result.value);
  } else {
    console.error(result.reason);
  }
});
```

### 3. Ignoring rejected promises / Bỏ qua các promises bị reject

```javascript
// BAD / KHÔNG TỐT - Silently ignoring failures / Bỏ qua lỗi một cách âm thầm
const results = await Promise.allSettled(promises);
const values = results
  .filter((r) => r.status === "fulfilled")
  .map((r) => r.value);
// Lost information about failures / Mất thông tin về các lỗi

// GOOD / TỐT - Handle failures appropriately / Xử lý lỗi phù hợp
const results = await Promise.allSettled(promises);
const values = [];
const errors = [];

results.forEach((result) => {
  if (result.status === "fulfilled") {
    values.push(result.value);
  } else {
    errors.push(result.reason);
  }
});

if (errors.length > 0) {
  console.warn("Some operations failed:", errors);
}
```

### 4. Using try/catch with Promise.allSettled unnecessarily / Sử dụng try/catch với Promise.allSettled không cần thiết

```javascript
// BAD / KHÔNG TỐT - Promise.allSettled never rejects
// Promise.allSettled không bao giờ reject
try {
  const results = await Promise.allSettled(promises);
  // Process results / Xử lý kết quả
} catch (error) {
  // This will never execute / Điều này sẽ không bao giờ thực thi
  console.error("Unexpected error:", error);
}

// GOOD / TỐT - No try/catch needed / Không cần try/catch
const results = await Promise.allSettled(promises);
// Process results / Xử lý kết quả
```

## References / Tài liệu tham khảo

- [MDN: Promise.allSettled()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
- [ECMAScript Specification: Promise.allSettled](https://tc39.es/ecma262/#sec-promise.allsettled)
- [JavaScript.info: Promise API](https://javascript.info/promise-api)
- [You Don't Know JS: Async & Performance](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch3.md)
