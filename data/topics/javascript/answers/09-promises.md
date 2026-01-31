# 9. Promises

## Tổng quan về Promises

### Mục đích của Promises / Purpose

**Promise** là một object đại diện cho eventual completion (hoặc failure) của một asynchronous operation và giá trị kết quả của nó.

**Mục đích chính:**

- Xử lý async operations
- Avoid callback hell
- Chain async operations
- Error handling

### Khi nào cần hiểu về Promises / When to Use

Hiểu về Promises là cần thiết khi:

- Xử lý async operations
- Chain multiple async operations
- Error handling trong async code
- Avoid callback hell

### Giúp ích gì / Benefits

**Lợi ích:**

- **Async handling**: Xử lý async operations
- **Chainable**: Có thể chain operations
- **Error handling**: Centralized error handling
- **Readable**: Code dễ đọc hơn callbacks

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm            |
| -------------- | --------------------- |
| Chainable      | Có thể khó debug      |
| Error handling | Learning curve        |
| Avoid hell     | Verbose hơn callbacks |
| Async handling | Memory overhead       |

---

## Promise là gì? Các trạng thái của Promise?

**Promise** là một object đại diện cho eventual completion (hoặc failure) của một asynchronous operation và giá trị kết quả của nó.

### Mục đích / Purpose

**Promise** được thiết kế để:

- Đại diện async operations
- Handle success/failure
- Chain operations
- Error handling

### Khi nào dùng / When to Use

Promises nên dùng khi:

- Async operations
- Chain multiple operations
- Error handling
- Avoid callback hell

### Giúp ích gì / Benefits

**Lợi ích:**

- **Async handling**: Xử lý async operations
- **Chainable**: Có thể chain operations
- **Error handling**: Centralized error handling
- **Readable**: Code dễ đọc hơn callbacks

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm            |
| -------------- | --------------------- |
| Chainable      | Có thể khó debug      |
| Error handling | Learning curve        |
| Avoid hell     | Verbose hơn callbacks |
| Async handling | Memory overhead       |

### Ba trạng thái của Promise:

```javascript
// 1. Pending - Chưa hoàn thành, đang xử lý
const pendingPromise = new Promise((resolve, reject) => {
  // Async operation đang chạy
  console.log("Pending...");
});

console.log(pendingPromise); // Promise { <pending> }

// 2. Fulfilled (Resolved) - Hoàn thành thành công
const fulfilledPromise = new Promise((resolve, reject) => {
  resolve("Success!");
});

console.log(fulfilledPromise); // Promise { <fulfilled>: 'Success!' }

// 3. Rejected - Hoàn thành thất bại
const rejectedPromise = new Promise((resolve, reject) => {
  reject(new Error("Failed!"));
});

console.log(rejectedPromise); // Promise { <rejected>: Error: Failed! }
```

### Ví dụ cơ bản:

```javascript
// Tạo Promise
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;

      if (success) {
        resolve({ id: 1, name: "John" });
      } else {
        reject(new Error("Failed to fetch data"));
      }
    }, 1000);
  });
}

// Sử dụng Promise
fetchData()
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
```

### Best Practices:

```javascript
// ✅ Dùng Promises cho:
// - Async operations
// - Chain multiple operations
// - Error handling
fetchData()
  .then((data) => processData(data))
  .then((processed) => saveData(processed))
  .catch((error) => handleError(error));
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên tạo Promise mà không wrap async operation
const badPromise = new Promise((resolve) => {
  resolve(42);
});

// ✅ Nên wrap async operations
const goodPromise = new Promise((resolve) => {
  setTimeout(() => resolve(42), 1000);
});
```

---

## Promise states: Pending, Fulfilled, Rejected?

### Mục đích / Purpose

Hiểu về **Promise states** giúp:

- Debug async code
- Hiểu Promise lifecycle
- Handle errors properly

### Khi nào gặp vấn đề / When to Use

Vấn đề Promise states xuất hiện khi:

- Debugging async code
- Promise không resolve/reject
- Understanding Promise lifecycle

### Giúp ích gì / Benefits

Hiểu về states giúp:

- **Debug**: Dễ dàng debug
- **Understand lifecycle**: Hiểu Promise lifecycle
- **Error handling**: Xử lý errors properly

### Ưu nhược điểm / Pros & Cons

| State     | Ưu điểm         | Nhược điểm               |
| --------- | --------------- | ------------------------ |
| Pending   | Async operation | Không biết kết quả       |
| Fulfilled | Success         | Không thể thay đổi state |
| Rejected  | Error           | Phải handle error        |

### Pending State:

```javascript
// Promise đang chờ kết quả
const pendingPromise = new Promise((resolve, reject) => {
  console.log("Operation started...");
  // resolve hoặc reject chưa được gọi
});

console.log("State:", pendingPromise);
// 'State: Promise { <pending> }'
```

### Fulfilled State:

```javascript
// Promise hoàn thành thành công
const fulfilledPromise = new Promise((resolve) => {
  resolve("Operation completed successfully");
});

fulfilledPromise.then((result) => {
  console.log("Result:", result);
});

console.log("State:", fulfilledPromise);
// 'State: Promise { <fulfilled>: 'Operation completed successfully' }'
```

### Rejected State:

```javascript
// Promise hoàn thành thất bại
const rejectedPromise = new Promise((_, reject) => {
  reject(new Error("Operation failed"));
});

rejectedPromise.catch((error) => {
  console.error("Error:", error.message);
});

console.log("State:", rejectedPromise);
// 'State: Promise { <rejected>: Error: Operation failed }'
```

### Best Practices:

```javascript
// ✅ Luôn resolve hoặc reject Promise
function fetchData() {
  return new Promise((resolve, reject) => {
    if (success) {
      resolve(data);
    } else {
      reject(error);
    }
  });
}

// ✅ Dùng then/catch để handle states
fetchData()
  .then((data) => console.log("Success:", data))
  .catch((error) => console.error("Error:", error));
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên để Promise pending mãi mãi
const hangingPromise = new Promise(() => {
  // Không resolve/reject
});

// ✅ Nên luôn resolve hoặc reject
const resolvedPromise = new Promise((resolve) => {
  resolve(result);
});
```

---

## `Promise.all()` vs `Promise.race()` vs `Promise.allSettled()`?

### Mục đích / Purpose

Các **Promise methods** này được thiết kế để:

- Handle multiple Promises
- Parallel execution
- Different waiting strategies

### Khi nào dùng / When to Use

| Method                 | Khi nào dùng                   |
| ---------------------- | ------------------------------ |
| `Promise.all()`        | Tất cả phải fulfilled          |
| `Promise.race()`       | Promise đầu tiên hoàn thành    |
| `Promise.allSettled()` | Chờ tất cả hoàn thành (bất kể) |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Parallel execution**: Chạy Promises song song
- **Different strategies**: Các chiến lược khác nhau
- **Error handling**: Flexible error handling
- **Efficiency**: Tối ưu performance

### Ưu nhược điểm / Pros & Cons

| Method                 | Ưu điểm           | Nhược điểm                       |
| ---------------------- | ----------------- | -------------------------------- |
| `Promise.all()`        | Tất cả thành công | Một rejected thì tất cả rejected |
| `Promise.race()`       | Nhanh nhất        | Không quan tâm tất cả            |
| `Promise.allSettled()` | Tất cả hoàn thành | Verbose kết quả                  |

### `Promise.all()` - Tất cả promises phải fulfilled:

```javascript
// Tất cả thành công
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log("All fulfilled:", results);
    // [1, 2, 3] - theo thứ tự truyền vào
  })
  .catch((error) => {
    console.error("One rejected:", error);
  });

// Một promise rejected - tất cả rejected
const p1 = Promise.resolve(1);
const p2 = Promise.reject(new Error("Failed"));
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .then((results) => {
    console.log("All fulfilled:", results);
  })
  .catch((error) => {
    console.error("Rejected:", error.message);
    // 'Failed'
  });
```

### `Promise.race()` - Promise đầu tiên hoàn thành:

```javascript
// Promise nhanh nhất fulfilled
const promise1 = new Promise((resolve) => {
  setTimeout(() => resolve("First"), 1000);
});

const promise2 = new Promise((resolve) => {
  setTimeout(() => resolve("Second"), 500);
});

const promise3 = new Promise((resolve) => {
  setTimeout(() => resolve("Third"), 2000);
});

Promise.race([promise1, promise2, promise3]).then((result) => {
  console.log("Winner:", result);
  // 'Second' (promise2 nhanh nhất)
});
```

### `Promise.allSettled()` - Chờ tất cả hoàn thành:

```javascript
// Tất cả fulfilled
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.reject(new Error("Failed"));

Promise.allSettled([promise1, promise2, promise3]).then((results) => {
  console.log("All settled:", results);
  // [
  //   { status: 'fulfilled', value: 1 },
  //   { status: 'fulfilled', value: 2 },
  //   { status: 'rejected', reason: Error: Failed }
  // ]
});
```

### Best Practices:

```javascript
// ✅ Dùng Promise.all khi:
// - Tất cả Promises phải thành công
Promise.all([fetchUser(), fetchPosts(), fetchComments()]).then(
  ([user, posts, comments]) => {
    console.log("All data:", { user, posts, comments });
  },
);

// ✅ Dùng Promise.race khi:
// - Chờ Promise đầu tiên
Promise.race([fetchFromAPI1(), fetchFromAPI2()]).then((result) => {
  console.log("First result:", result);
});

// ✅ Dùng Promise.allSettled khi:
// - Chờ tất cả hoàn thành (bất kể)
Promise.allSettled([fetchUser(), fetchPosts(), fetchComments()]).then(
  (results) => {
    const successful = results.filter((r) => r.status === "fulfilled");
    const failed = results.filter((r) => r.status === "rejected");
    console.log("Successful:", successful.length);
    console.log("Failed:", failed.length);
  },
);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng Promise.all khi không cần tất cả thành công
Promise.all([fetchUser(), fetchPosts(), fetchComments()]).catch((error) => {
  // Một failed thì tất cả failed
});

// ✅ Nên dùng Promise.allSettled khi muốn tất cả hoàn thành
Promise.allSettled([fetchUser(), fetchPosts(), fetchComments()]).then(
  (results) => {
    // Xử lý từng kết quả
  },
);
```

---

## `Promise.any()`?

**`Promise.any()`** - Chờ promise đầu tiên fulfilled, chỉ reject khi tất cả promises rejected.

### Mục đích / Purpose

**`Promise.any()`** được thiết kế để:

- Chờ promise đầu tiên fulfilled
- Fallback pattern
- Multiple sources
- Error aggregation

### Khi nào dùng / When to Use

`Promise.any()` nên dùng khi:

- Fallback URLs
- Multiple sources
- Chờ success đầu tiên
- Aggregate errors

### Giúp ích gì / Benefits

**Lợi ích:**

- **First success**: Chờ success đầu tiên
- **Fallback**: Multiple sources
- **Error aggregation**: Tất cả errors
- **Resilience**: Tăng độ tin cậy

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm                       |
| ------------- | -------------------------------- | ---------------------- |
| First success | AggregateError nếu tất cả failed | Verbose error handling |

### Ví dụ:

```javascript
// Promise đầu tiên fulfilled
const promise1 = new Promise((resolve) => {
  setTimeout(() => resolve("First"), 1000);
});

const promise2 = new Promise((resolve) => {
  setTimeout(() => resolve("Second"), 500);
});

const promise3 = new Promise((resolve) => {
  setTimeout(() => resolve("Third"), 2000);
});

Promise.any([promise1, promise2, promise3])
  .then((result) => {
    console.log("First fulfilled:", result);
    // 'Second'
  })
  .catch((error) => {
    console.error("All rejected:", error);
    // AggregateError: All promises were rejected
  });
```

### Best Practices:

```javascript
// ✅ Dùng Promise.any cho:
// - Fallback URLs
// - Multiple sources
Promise.any([
  fetch("https://api1.example.com/data"),
  fetch("https://api2.example.com/data"),
  fetch("https://api3.example.com/data"),
])
  .then((response) => {
    console.log("Response:", response);
  })
  .catch((error) => {
    console.error("All URLs failed:", error);
  });
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng Promise.any khi cần tất cả results
Promise.any([fetch1(), fetch2(), fetch3()]).then((firstResult) => {
  // Chỉ có result đầu tiên
});

// ✅ Nên dùng Promise.all khi cần tất cả results
Promise.all([fetch1(), fetch2(), fetch3()]).then(([r1, r2, r3]) => {
  // Có tất cả results
});
```

---

## Chain promises và error handling?

### Mục đích / Purpose

**Chaining promises** và **error handling** được thiết kế để:

- Chain async operations
- Centralized error handling
- Sequential execution
- Clean code

### Khi nào dùng / When to Use

Chaining và error handling nên dùng khi:

- Sequential async operations
- Error handling
- Clean code structure
- Avoid callback hell

### Giúp ích gì / Benefits

**Lợi ích:**

- **Sequential**: Chạy operations theo thứ tự
- **Error handling**: Centralized error handling
- **Readable**: Code dễ đọc
- **Clean**: Clean code structure

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm               |
| -------------- | ------------------------ |
| Sequential     | Có thể chậm hơn parallel |
| Error handling | Có thể khó debug         |
| Readable       | Verbose hơn callbacks    |

### Chaining promises với `.then()`:

```javascript
// Sequential chaining
fetchUser(1)
  .then((user) => {
    console.log("User:", user);
    return fetchPosts(user.id);
  })
  .then((posts) => {
    console.log("Posts:", posts);
    return fetchComments(posts[0].id);
  })
  .then((comments) => {
    console.log("Comments:", comments);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
```

### Error handling:

```javascript
// Catch error ở bất kỳ đâu trong chain
fetchData()
  .then((data) => {
    console.log("Data:", data);
    return processData(data);
  })
  .then((processed) => {
    console.log("Processed:", processed);
    return saveData(processed);
  })
  .catch((error) => {
    console.error("Error in chain:", error.message);
  });
```

### `.finally()` - Luôn thực thi:

```javascript
// Finally luôn chạy dù success hay error
fetchData()
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  })
  .finally(() => {
    console.log("Cleanup");
    hideLoadingSpinner();
  });
```

### Best Practices:

```javascript
// ✅ Dùng chaining cho:
// - Sequential async operations
fetchUser(1)
  .then((user) => fetchPosts(user.id))
  .then((posts) => fetchComments(posts[0].id))
  .then((comments) => renderComments(comments))
  .catch((error) => handleError(error));

// ✅ Dùng finally cho cleanup
fetchData()
  .then((data) => processData(data))
  .catch((error) => handleError(error))
  .finally(() => {
    hideLoading();
  });
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên bỏ qua error handling
fetchUser(1)
  .then((user) => fetchPosts(user.id))
  .then((posts) => fetchComments(posts[0].id));
// Không có catch - error không được handle

// ✅ Nên luôn có error handling
fetchUser(1)
  .then((user) => fetchPosts(user.id))
  .then((posts) => fetchComments(posts[0].id))
  .catch((error) => handleError(error));
```

---

## `then()`, `catch()`, `finally()`?

### Mục đích / Purpose

Các **Promise methods** này được thiết kế để:

- Handle results
- Handle errors
- Cleanup code
- Chain operations

### Khi nào dùng / When to Use

| Method       | Khi nào dùng            |
| ------------ | ----------------------- |
| `.then()`    | Xử lý fulfilled results |
| `.catch()`   | Xử lý errors            |
| `.finally()` | Luôn thực thi (cleanup) |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Result handling**: Xử lý fulfilled
- **Error handling**: Xử lý errors
- **Cleanup**: Luôn thực thi
- **Chainable**: Có thể chain

### Ưu nhược điểm / Pros & Cons

| Method       | Ưu điểm       | Nhược điểm           |
| ------------ | ------------- | -------------------- |
| `.then()`    | Xử lý kết quả | Không handle errors  |
| `.catch()`   | Xử lý errors  | Không handle results |
| `.finally()` | Luôn thực thi | Không nhận parameter |

### `.then()` - Xử lý kết quả fulfilled:

```javascript
// Xử lý fulfilled
Promise.resolve("Success").then((value) => {
  console.log("Fulfilled:", value);
});

// Xử lý rejected với onRejected
Promise.reject(new Error("Failed")).then(
  (value) => console.log("Fulfilled:", value),
  (error) => console.error("Rejected:", error.message),
);
```

### `.catch()` - Xử lý error:

```javascript
// Catch error
Promise.reject(new Error("Something went wrong")).catch((error) => {
  console.error("Caught:", error.message);
});

// Catch ở cuối chain
fetchUser(1)
  .then((user) => fetchPosts(user.id))
  .then((posts) => fetchComments(posts[0].id))
  .then((comments) => console.log("Comments:", comments))
  .catch((error) => {
    console.error("Error:", error.message);
  });
```

### `.finally()` - Luôn thực thi:

```javascript
// Luôn chạy
Promise.resolve("Success")
  .then((value) => console.log("Value:", value))
  .finally(() => {
    console.log("Finally executed");
  });

// Finally không nhận parameter
Promise.resolve(1).finally((value) => {
  console.log("Finally value:", value);
  // 'Finally value: undefined'
});
```

### Best Practices:

```javascript
// ✅ Dùng then cho results
fetchData().then((data) => console.log("Data:", data));

// ✅ Dùng catch cho errors
fetchData().catch((error) => console.error("Error:", error));

// ✅ Dùng finally cho cleanup
fetchData()
  .then((data) => console.log("Data:", data))
  .catch((error) => console.error("Error:", error))
  .finally(() => hideLoading());
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng finally để thay đổi giá trị
Promise.resolve(1)
  .finally(() => 2)
  .then((value) => console.log("Value:", value));
// 'Value: 1' (không phải 2)

// ✅ Nên dùng then để thay đổi giá trị
Promise.resolve(1)
  .then((value) => value + 1)
  .then((value) => console.log("Value:", value));
// 'Value: 2'
```

---

## Error propagation trong promises?

### Mục đích / Purpose

Hiểu về **error propagation** giúp:

- Handle errors properly
- Debug async code
- Chain errors
- Error recovery

### Khi nào gặp vấn đề / When to Use

Vấn đề error propagation xuất hiện khi:

- Debugging async code
- Errors không được handle
- Error recovery
- Chain errors

### Giúp ích gì / Benefits

Hiểu về error propagation giúp:

- **Handle errors**: Xử lý errors properly
- **Debug**: Dễ dàng debug
- **Chain**: Chain errors
- **Recovery**: Error recovery

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm           |
| --------------- | -------------------- |
| Proper handling | Có thể verbose       |
| Debugging       | Có thể khó debug     |
| Error recovery  | Có thể gây confusion |

### Error propagates xuống chain:

```javascript
// Error propagates đến catch gần nhất
Promise.resolve()
  .then(() => {
    throw new Error("Error in then");
  })
  .then(() => {
    console.log("This will not execute");
  })
  .catch((error) => {
    console.error("Caught:", error.message);
  });
```

### Catch và re-throw:

```javascript
// Catch, xử lý, rồi re-throw
Promise.resolve()
  .then(() => {
    throw new Error("Original error");
  })
  .catch((error) => {
    console.error("Caught:", error.message);
    throw new Error("Wrapped error: " + error.message);
  })
  .catch((error) => {
    console.error("Final catch:", error.message);
  });
```

### Multiple error handlers:

```javascript
// Catch cụ thể cho từng step
fetchUser(1)
  .then((user) => {
    if (!user) {
      throw new Error("User not found");
    }
    return fetchPosts(user.id);
  })
  .catch((error) => {
    // Xử lý error từ fetchUser hoặc fetchPosts
    if (error.message.includes("User not found")) {
      return { posts: [] }; // Fallback
    }
    throw error; // Re-throw nếu không xử lý được
  })
  .then((posts) => {
    console.log("Posts:", posts);
  })
  .catch((error) => {
    console.error("Final error handler:", error.message);
  });
```

### Best Practices:

```javascript
// ✅ Dùng catch để handle errors
fetchData()
  .then((data) => processData(data))
  .catch((error) => handleError(error));

// ✅ Dùng re-throw khi cần error handler khác
fetchData()
  .then((data) => processData(data))
  .catch((error) => {
    logError(error);
    throw error; // Re-throw
  });
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên bỏ qua errors
fetchData()
  .then((data) => processData(data))
  .then((processed) => saveData(processed));
// Không có catch

// ✅ Nên luôn có error handling
fetchData()
  .then((data) => processData(data))
  .then((processed) => saveData(processed))
  .catch((error) => handleError(error));
```

---

## Creating promises: `Promise.resolve()`, `Promise.reject()`?

### Mục đích / Purpose

**Promise.resolve()** và **Promise.reject()** được thiết kế để:

- Tạo resolved promises
- Tạo rejected promises
- Convert values sang promises
- Error handling

### Khi nào dùng / When to Use

| Method              | Khi nào dùng            |
| ------------------- | ----------------------- |
| `Promise.resolve()` | Trả về resolved Promise |
| `Promise.reject()`  | Trả về rejected Promise |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Quick creation**: Tạo promises nhanh
- **Convert values**: Convert values sang promises
- **Error handling**: Tạo rejected promises
- **Consistent**: Consistent API

### Ưu nhược điểm / Pros & Cons

| Method              | Ưu điểm        | Nhược điểm             |
| ------------------- | -------------- | ---------------------- |
| `Promise.resolve()` | Quick creation | Có thể không cần thiết |
| `Promise.reject()`  | Error handling | Verbose hơn throw      |

### `Promise.resolve()` - Tạo fulfilled promise:

```javascript
// Resolve với value
const resolved = Promise.resolve("Success");
console.log(resolved); // Promise { <fulfilled>: 'Success' }

// Resolve với object
const user = Promise.resolve({ id: 1, name: "John" });
user.then((data) => console.log(data));

// Resolve với thenable
const thenable = {
  then: function (resolve) {
    resolve("From thenable");
  },
};

const promise = Promise.resolve(thenable);
promise.then((value) => console.log(value));
```

### `Promise.reject()` - Tạo rejected promise:

```javascript
// Reject với error
const rejected = Promise.reject(new Error("Failed"));
console.log(rejected); // Promise { <rejected>: Error: Failed }

// Reject với value
const rejected2 = Promise.reject("Error message");
rejected2.catch((error) => console.error(error));
```

### Best Practices:

```javascript
// ✅ Dùng Promise.resolve cho:
// - Conditional promises
// - Return values as promises
function getData(shouldFetch) {
  if (shouldFetch) {
    return fetchData(); // Trả về promise
  } else {
    return Promise.resolve(null); // Trả về resolved promise
  }
}

// ✅ Dùng Promise.reject cho:
// - Early rejection
// - Validation errors
function validateUser(user) {
  if (!user.name) {
    return Promise.reject(new Error("Name is required"));
  }
  return Promise.resolve(user);
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng Promise.resolve cho async operations
const bad = Promise.resolve(fetchData());
// fetchData() vẫn async, nhưng Promise.resolve không đợi

// ✅ Nên dùng Promise constructor cho async operations
const good = new Promise((resolve) => {
  fetchData().then(resolve);
});
```

---

## Promise constructor?

### Mục đích / Purpose

**Promise constructor** được thiết kế để:

- Wrap async operations
- Create custom promises
- Handle resolve/reject
- Error handling

### Khi nào dùng / When to Use

Promise constructor nên dùng khi:

- Wrap callback APIs
- Create custom promises
- Handle async operations
- Error handling

### Giúp ích gì / Benefits

**Lợi ích:**

- **Wrap APIs**: Wrap callback APIs
- **Custom**: Custom logic
- **Error handling**: Proper error handling
- **Control**: Full control

### Ưu nhược điểm / Pros & Cons

| Ưu điểm      | Nhược điểm           |
| ------------ | -------------------- | ----------------------- |
| Wrap APIs    | Verbose hơn Promises | Có thể có bugs          |
| Custom logic | Flexible             | Error handling phức tạp |

### Tạo promise với constructor:

```javascript
// Syntax: new Promise(executor)
// executor: function(resolve, reject) { ... }

const promise = new Promise((resolve, reject) => {
  // Async operation
  setTimeout(() => {
    const success = true;

    if (success) {
      resolve("Operation completed");
    } else {
      reject(new Error("Operation failed"));
    }
  }, 1000);
});

promise
  .then((result) => console.log("Success:", result))
  .catch((error) => console.error("Error:", error.message));
```

### Ví dụ thực tế:

```javascript
// Wrap callback API
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

readFilePromise("data.txt")
  .then((content) => console.log("Content:", content))
  .catch((error) => console.error("Error:", error.message));
```

### Best Practices:

```javascript
// ✅ Dùng Promise constructor cho:
// - Wrap callback APIs
function fetchPromise(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          reject(new Error(`HTTP ${response.status}`));
        } else {
          response.json().then(resolve);
        }
      })
      .catch(reject);
  });
}

// ✅ Luôn resolve hoặc reject
const promise = new Promise((resolve, reject) => {
  try {
    const result = doWork();
    resolve(result);
  } catch (error) {
    reject(error);
  }
});
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên để Promise pending mãi mãi
const hanging = new Promise(() => {
  // Không resolve/reject
});

// ✅ Nên luôn resolve hoặc reject
const resolved = new Promise((resolve) => {
  resolve(result);
});
```
