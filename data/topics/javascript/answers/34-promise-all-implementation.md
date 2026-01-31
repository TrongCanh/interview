# 34. Implement `Promise.all` / Triển Khai Promise.all

## Tổng quan về Promise.all

### Mục đích của Promise.all / Purpose

**Promise.all** là method để execute multiple promises song song và trả về promise resolves khi tất cả promises hoàn thành hoặc reject khi bất kỳ promise nào reject.

**Mục đích chính:**

- Execute multiple promises parallel
- Wait cho tất cả promises hoàn thành
- Handle kết quả của multiple promises
- Optimize performance với parallel execution

### Khi nào nên dùng / When to Use

- Khi cần execute multiple independent operations
- Khi muốn wait cho tất cả operations hoàn thành
- Khi muốn optimize performance với parallel execution

### Giúp ích gì / Benefits

**Lợi ích:**

- **Parallel**: Execute promises parallel
- **Wait all**: Wait cho tất cả promises
- **Results**: Get results từ tất cả promises
- **Performance**: Better performance với parallel execution

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm     | Giải thích                     |
| ----------- | ------------------------------ |
| Parallel    | Execute promises parallel      |
| Wait all    | Wait cho tất cả promises       |
| Results     | Get results từ tất cả promises |
| Performance | Better performance             |

**Nhược điểm (Cons):**

| Nhược điểm     | Giải thích                          |
| -------------- | ----------------------------------- |
| Fail fast      | Reject khi bất kỳ promise nào fail  |
| Order          | Kết quả trả về theo order của input |
| All or nothing | Hoặc tất cả success hoặc fail       |

---

## Implement `Promise.all`?

**Implement `Promise.all`** là viết function để mimic Promise.all behavior.

### Mục đích / Purpose

- Tạo Promise.all implementation
- Handle multiple promises
- Return results khi tất cả complete

### Khi nào dùng / When to Use

- Khi cần Promise.all polyfill
- Khi muốn hiểu Promise.all behavior
- Khi muốn custom Promise.all

### Ví dụ:

```javascript
// Method 1: Basic Promise.all implementation
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an array"));
    }

    const results = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((value) => {
        results[index] = value;
        completed++;
        if (completed === promises.length) {
          resolve(results);
        }
      }, reject);
    });
  });
}

// Usage
const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

promiseAll(promises)
  .then((results) => {
    console.log("Results:", results); // [1, 2, 3]
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Method 2: Promise.all với empty array
promiseAll([]).then((results) => {
  console.log("Results:", results); // []
});

// Method 3: Promise.all với rejected promise
const promises = [
  Promise.resolve(1),
  Promise.reject(new Error("Failed")),
  Promise.resolve(3),
];

promiseAll(promises)
  .then((results) => {
    console.log("Results:", results);
  })
  .catch((error) => {
    console.error("Error:", error.message); // 'Failed'
  });

// Method 4: Promise.all với non-promise values
const promises = [1, 2, 3];

promiseAll(promises).then((results) => {
  console.log("Results:", results); // [1, 2, 3]
});

// Method 5: Promise.all với mixed values
const promises = [Promise.resolve(1), 2, Promise.resolve(3)];

promiseAll(promises).then((results) => {
  console.log("Results:", results); // [1, 2, 3]
});
```

### Best Practices:

```javascript
// ✅ Dùng Promise.all cho independent operations
const promises = [
  fetch("/api/users"),
  fetch("/api/posts"),
  fetch("/api/comments"),
];

Promise.all(promises).then(([users, posts, comments]) => {
  console.log("All data loaded");
});

// ✅ Handle errors
Promise.all(promises).catch((error) => {
  console.error("One or more promises failed:", error);
});

// ✅ Dùng Promise.all với async/await
async function fetchData() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch("/api/users"),
      fetch("/api/posts"),
      fetch("/api/comments"),
    ]);
    console.log("All data loaded");
  } catch (error) {
    console.error("Error:", error);
  }
}

// ❌ Tránh Promise.all cho dependent operations
// Dùng sequential execution thay thế
const user = await fetchUser();
const posts = await fetchPosts(user.id); // Dependent on user
```

---

## Test Cases

```javascript
// Test 1: Promise.all với resolved promises
const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

promiseAll(promises).then((results) => {
  console.log("Results:", results); // [1, 2, 3]
});

// Test 2: Promise.all với rejected promise
const promises = [
  Promise.resolve(1),
  Promise.reject(new Error("Failed")),
  Promise.resolve(3),
];

promiseAll(promises)
  .then((results) => {
    console.log("Results:", results);
  })
  .catch((error) => {
    console.error("Error:", error.message); // 'Failed'
  });

// Test 3: Promise.all với empty array
promiseAll([]).then((results) => {
  console.log("Results:", results); // []
});

// Test 4: Promise.all với non-promise values
const promises = [1, 2, 3];

promiseAll(promises).then((results) => {
  console.log("Results:", results); // [1, 2, 3]
});

// Test 5: Promise.all với mixed values
const promises = [Promise.resolve(1), 2, Promise.resolve(3)];

promiseAll(promises).then((results) => {
  console.log("Results:", results); // [1, 2, 3]
});

// Test 6: Promise.all với async functions
const promises = [
  async () => await fetch("/api/users"),
  async () => await fetch("/api/posts"),
  async () => await fetch("/api/comments"),
];

promiseAll(promises).then((results) => {
  console.log("Results:", results);
});
```

---

## Complete Implementation

```javascript
/**
 * Implement Promise.all
 * @param {Array} promises - Array of promises
 * @returns {Promise} Promise that resolves when all promises resolve
 */
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    // Validate input
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an array"));
    }

    // Handle empty array
    if (promises.length === 0) {
      return resolve([]);
    }

    const results = [];
    let completed = 0;

    // Process each promise
    promises.forEach((promise, index) => {
      // Wrap non-promise values
      Promise.resolve(promise).then(
        (value) => {
          // Store result at correct index
          results[index] = value;
          completed++;

          // Resolve when all promises complete
          if (completed === promises.length) {
            resolve(results);
          }
        },
        reject, // Reject when any promise rejects
      );
    });
  });
}

// Usage examples

// Example 1: Fetch multiple APIs
async function fetchAllData() {
  try {
    const [users, posts, comments] = await promiseAll([
      fetch("/api/users").then((r) => r.json()),
      fetch("/api/posts").then((r) => r.json()),
      fetch("/api/comments").then((r) => r.json()),
    ]);
    return { users, posts, comments };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
}

// Example 2: Parallel processing
async function processItems(items) {
  const results = await promiseAll(items.map((item) => processItem(item)));
  return results;
}

// Example 3: Batch operations
async function batchOperations(operations) {
  const results = await promiseAll(
    operations.map((op) => executeOperation(op)),
  );
  return results;
}

// Example 4: Image loading
async function loadImages(imageUrls) {
  const images = await promiseAll(imageUrls.map((url) => loadImage(url)));
  return images;
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}
```

---

## Use Cases

```javascript
// 1. Fetch multiple APIs
async function fetchAllData() {
  const [users, posts, comments] = await Promise.all([
    fetch("/api/users").then((r) => r.json()),
    fetch("/api/posts").then((r) => r.json()),
    fetch("/api/comments").then((r) => r.json()),
  ]);
  return { users, posts, comments };
}

// 2. Parallel file operations
async function readAllFiles(filePaths) {
  const contents = await Promise.all(filePaths.map((path) => readFile(path)));
  return contents;
}

// 3. Parallel database queries
async function queryAllUsers(userIds) {
  const users = await Promise.all(
    userIds.map((id) => db.query("SELECT * FROM users WHERE id = ?", [id])),
  );
  return users;
}

// 4. Batch API requests
async function batchApiRequests(requests) {
  const responses = await Promise.all(
    requests.map((req) => fetch(req.url, req.options)),
  );
  return responses;
}

// 5. Parallel image loading
async function loadAllImages(imageUrls) {
  const images = await Promise.all(imageUrls.map((url) => loadImage(url)));
  return images;
}
```

---

## Anti-patterns cần tránh

```javascript
// ❌ Không handle errors trong Promise.all
const results = await Promise.all(promises);
// Nếu bất kỳ promise nào reject, error sẽ được throw

// ✅ Dùng try/catch để handle errors
try {
  const results = await Promise.all(promises);
} catch (error) {
  console.error("Error:", error);
}

// ❌ Dùng Promise.all cho dependent operations
const user = await fetchUser();
const posts = await Promise.all([
  fetchPosts(user.id), // Dependent on user
  fetchComments(user.id), // Dependent on user
]);

// ✅ Dùng sequential execution cho dependent operations
const user = await fetchUser();
const posts = await fetchPosts(user.id);
const comments = await fetchComments(user.id);

// ❌ Dùng Promise.all với quá nhiều promises
const results = await Promise.all(thousandPromises);
// Có thể gây performance issues

// ✅ Dùng Promise.all với reasonable number of promises
const results = await Promise.all(tenPromises);
```

---

_References: [MDN Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)_
