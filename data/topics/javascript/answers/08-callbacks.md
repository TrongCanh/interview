# 8. Callbacks

## Tổng quan về Callbacks

### Mục đích của Callbacks / Purpose

**Callback** là một function được truyền vào một function khác làm parameter và được thực thi sau khi function đó hoàn thành.

**Mục đích chính:**

- Asynchronous operations
- Event handling
- Function composition
- Higher-order functions

### Khi nào cần hiểu về Callbacks / When to Use

Hiểu về callbacks là cần thiết khi:

- Xử lý async operations
- Event handlers
- Higher-order functions
- Function composition

### Giúp ích gì / Benefits

**Lợi ích:**

- **Async handling**: Xử lý async operations
- **Event handling**: Handle events
- **Composition**: Kết hợp functions
- **Flexibility**: Flexible programming

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm           |
| -------------- | -------------------- |
| Async handling | Callback hell        |
| Event handling | Debugging khó hơn    |
| Composition    | Inversion of Control |

---

## Callback là gì?

**Callback** là một function được truyền vào một function khác làm parameter và được thực thi sau khi function đó hoàn thành.

### Mục đích / Purpose

**Callback** được thiết kế để:

- Xử lý async operations
- Event handling
- Function composition
- Higher-order functions

### Khi nào dùng / When to Use

Callbacks nên dùng khi:

- Async operations
- Event handlers
- Higher-order functions
- Function composition

### Giúp ích gì / Benefits

**Lợi ích:**

- **Async handling**: Xử lý async operations
- **Event handling**: Handle events
- **Composition**: Kết hợp functions
- **Flexibility**: Flexible programming

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm           |
| -------------- | -------------------- |
| Async handling | Callback hell        |
| Event handling | Debugging khó hơn    |
| Composition    | Inversion of Control |

### Ví dụ cơ bản:

```javascript
// Function nhận callback
function greet(name, callback) {
  console.log(`Hello, ${name}!`);
  callback();
}

// Sử dụng callback
greet("John", function () {
  console.log("Callback executed!");
});
// 'Hello, John!'
// 'Callback executed!'
```

### Best Practices:

```javascript
// ✅ Dùng callbacks cho:
// - Async operations
// - Event handlers
function fetchData(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(null, data))
    .catch((error) => callback(error));
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên lồng quá nhiều callbacks
getData((data1) => {
  process(data1, (data2) => {
    save(data2, (data3) => {
      // Callback hell
    });
  });
});

// ✅ Nên dùng Promises hoặc async/await
async function processData() {
  const data1 = await getData();
  const data2 = await process(data1);
  const data3 = await save(data2);
}
```

---

## Callback hell là gì?

**Callback hell** (hay còn gọi là "pyramid of doom") là tình trạng code lồng nhau nhiều cấp, khó đọc và maintain.

### Mục đích / Purpose

Hiểu về **callback hell** giúp:

- Tránh callback hell
- Write readable code
- Use better patterns

### Khi nào gặp vấn đề / When to Use

Callback hell xuất hiện khi:

- Nhiều nested callbacks
- Async operations lồng nhau
- Code khó đọc

### Giúp ích gì / Benefits

Hiểu về callback hell giúp:

- **Avoid**: Tránh callback hell
- **Readable**: Code dễ đọc hơn
- **Maintainable**: Dễ maintain hơn

### Ưu nhược điểm / Pros & Cons

| Giải pháp       | Ưu điểm         | Nhược điểm      |
| --------------- | --------------- | --------------- |
| Named functions | Code dễ đọc hơn | Nhiều functions |
| Promises        | Code gọn hơn    | Learning curve  |
| Async/Await     | Code giống sync | Cần ES6+        |

### Ví dụ callback hell:

```javascript
// ❌ Callback hell
getUser(1, function (user) {
  console.log("User:", user);

  getPosts(user.id, function (posts) {
    console.log("Posts:", posts);

    getComments(posts[0].id, function (comments) {
      console.log("Comments:", comments);

      // Lồng thêm...
      getSomethingElse(function (data) {
        getAnotherThing(function (moreData) {
          // Và tiếp tục...
        });
      });
    });
  });
});
```

### Giải pháp:

```javascript
// ✅ Giải pháp 1: Named functions
function handleUser(user) {
  console.log("User:", user);
  getPosts(user.id, handlePosts);
}

function handlePosts(posts) {
  console.log("Posts:", posts);
  getComments(posts[0].id, handleComments);
}

function handleComments(comments) {
  console.log("Comments:", comments);
}

getUser(1, handleUser);

// ✅ Giải pháp 2: Promises
getUserPromise(1)
  .then((user) => {
    console.log("User:", user);
    return getPostsPromise(user.id);
  })
  .then((posts) => {
    console.log("Posts:", posts);
    return getCommentsPromise(posts[0].id);
  })
  .then((comments) => {
    console.log("Comments:", comments);
  });

// ✅ Giải pháp 3: Async/Await
async function fetchUserData() {
  const user = await getUserPromise(1);
  console.log("User:", user);

  const posts = await getPostsPromise(user.id);
  console.log("Posts:", posts);

  const comments = await getCommentsPromise(posts[0].id);
  console.log("Comments:", comments);
}
```

### Best Practices:

```javascript
// ✅ Dùng Promises thay vì callbacks
fetchUser(1)
  .then((user) => getPosts(user.id))
  .then((posts) => getComments(posts[0].id));

// ✅ Dùng async/await thay vì callbacks
async function fetchData() {
  const user = await fetchUser(1);
  const posts = await fetchPosts(user.id);
  const comments = await fetchComments(posts[0].id);
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên lồng quá nhiều callbacks
getData((data1) => {
  process(data1, (data2) => {
    save(data2, (data3) => {
      // Callback hell
    });
  });
});

// ✅ Nên dùng Promises hoặc async/await
async function processData() {
  const data1 = await getData();
  const data2 = await process(data1);
  const data3 = await save(data2);
}
```

---

## Inversion of Control?

**Inversion of Control (IoC)** là khi bạn chuyển quyền điều khiển luồng thực thi từ code của bạn sang một function hoặc library khác.

### Mục đích / Purpose

**IoC** được thiết kế để:

- Decouple code
- Library điều khiển luồng
- Flexible programming
- Testable code

### Khi nào dùng / When to Use

IoC nên dùng khi:

- Dùng libraries/frameworks
- Cần flexible code
- Testable code

### Giúp ích gì / Benefits

**Lợi ích:**

- **Decoupled**: Code decoupled
- **Flexible**: Flexible programming
- **Testable**: Dễ test
- **Library control**: Library điều khiển

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm       |
| -------------- | ---------------- |
| Decoupled code | Có thể khó debug |
| Flexible       | Learning curve   |
| Testable       | Verbose hơn      |

### Ví dụ cơ bản:

```javascript
// ❌ Không có IoC - bạn điều khiển luồng
function processFile() {
  const file = readFile("data.txt");
  const content = parseFile(file);
  const result = transform(content);
  saveFile(result);
}

// ✅ Có IoC - library điều khiển luồng
function processFileWithCallback(callback) {
  const file = readFile("data.txt");
  const content = parseFile(file);
  const result = transform(content);
  callback(result); // Library gọi callback khi xong
}
```

### Best Practices:

```javascript
// ✅ Dùng IoC khi:
// - Dùng libraries/frameworks
// - Cần flexible code
function fetchData(url, successCallback, errorCallback) {
  fetch(url)
    .then((response) => response.json())
    .then(successCallback)
    .catch(errorCallback);
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên không hiểu IoC
function riskyFunction(callback) {
  // Callback có thể không bao giờ được gọi
  // hoặc được gọi nhiều lần
  if (someCondition) {
    callback();
  }
}

// ✅ Nên đảm bảo callback được gọi
function safeFunction(callback) {
  try {
    const result = doWork();
    callback(null, result);
  } catch (error) {
    callback(error, null);
  }
}
```

---

## Error-first callback pattern?

**Error-first callback** là convention trong Node.js, callback nhận error làm parameter đầu tiên.

### Mục đích / Purpose

**Error-first callback** được thiết kế để:

- Xử lý errors
- Convention thống nhất
- Node.js pattern
- Async error handling

### Khi nào dùng / When to Use

Error-first callbacks nên dùng khi:

- Node.js APIs
- Async operations
- Error handling

### Giúp ích gì / Benefits

**Lợi ích:**

- **Consistent**: Convention thống nhất
- **Error handling**: Xử lý errors
- **Node.js pattern**: Node.js standard
- **Predictable**: Dự đoán được

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm              |
| --------------- | ----------------------- |
| Consistent      | Verbose hơn             |
| Error handling  | Callback hell           |
| Node.js pattern | Không phù hợp mọi cases |

### Pattern:

```javascript
// Error-first callback: callback(error, result)
function fetchData(url, callback) {
  setTimeout(() => {
    if (url === "/api/error") {
      // Error - parameter đầu tiên
      callback(new Error("Not found"), null);
    } else {
      // Success - error là null
      callback(null, { id: 1, name: "John" });
    }
  }, 1000);
}

// Sử dụng error-first callback
fetchData("/api/user", function (error, data) {
  if (error) {
    console.error("Error:", error.message);
    return;
  }

  console.log("Data:", data);
});
```

### Best Practices:

```javascript
// ✅ Dùng error-first callbacks cho:
// - Node.js APIs
// - Async operations
function readFile(path, callback) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên bỏ qua error parameter
function fetchData(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(null, data));
  // Không có catch
}

// ✅ Nên handle errors
function fetchData(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null));
}
```

---

## Sync vs Async callbacks?

### Mục đích / Purpose

Hiểu sự khác biệt giữa sync và async callbacks giúp:

- Chọn đúng callback type
- Tránh blocking code
- Write efficient code

### Khi nào dùng / When to Use

| Type           | Khi nào dùng                           |
| -------------- | -------------------------------------- |
| Sync callback  | Operation nhanh, không blocking        |
| Async callback | Operation mất thời gian (I/O, network) |

### Giúp ích gì / Benefits

Hiểu về sync vs async giúp:

- **Choose right**: Chọn đúng callback type
- **Efficient**: Code hiệu quả
- **Non-blocking**: Không blocking main thread

### Ưu nhược điểm / Pros & Cons

| Type           | Ưu điểm           | Nhược điểm           |
| -------------- | ----------------- | -------------------- |
| Sync callback  | Simple, immediate | Blocking main thread |
| Async callback | Non-blocking      | Callback hell        |

### Synchronous Callbacks:

```javascript
// Sync callback - được gọi ngay lập tức
function processArray(array, callback) {
  const result = [];

  for (const item of array) {
    result.push(callback(item));
  }

  return result;
}

// Sync callback - blocking
const numbers = [1, 2, 3, 4, 5];
const doubled = processArray(numbers, (num) => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

### Asynchronous Callbacks:

```javascript
// Async callback - được gọi sau một thời gian
function fetchData(url, callback) {
  setTimeout(() => {
    callback({ id: 1, name: "John" });
  }, 1000);
}

console.log("Start fetching");
fetchData("/api/user", function (data) {
  console.log("Data received:", data);
});
console.log("Continue execution");

// Output:
// 'Start fetching'
// 'Continue execution'
// (sau 1 giây) 'Data received: { id: 1, name: 'John' }'
```

### Best Practices:

```javascript
// ✅ Dùng sync callbacks khi:
// - Operation nhanh, không blocking
numbers.map((num) => num * 2);

// ✅ Dùng async callbacks khi:
// - Operation mất thời gian (I/O, network)
fetchData("/api/data", callback);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng async trong sync operations
function processArrayAsync(array, callback) {
  array.forEach((item) => {
    setTimeout(() => {
      callback(item);
    }, 0);
  });
}

// ✅ Nên dùng Promise hoặc async/await thay thế
async function processArrayBetter(array) {
  for (const item of array) {
    await new Promise((resolve) => {
      setTimeout(() => {
        callback(item);
        resolve();
      }, 0);
    });
  }
}
```
