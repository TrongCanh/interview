# 43. Implement `reduce` / Triển khai `reduce`

> Implement Array.prototype.reduce from scratch / Triển khai Array.prototype.reduce từ đầu

---

## Overview / Tổng quan

`reduce()` là một trong những phương thức array mạnh mẽ nhất trong JavaScript. Nó thực thi một hàm reducer trên từng phần tử của mảng, trả về một giá trị duy nhất là kết quả tích lũy. Việc triển khai `reduce` từ đầu giúp hiểu sâu hơn về cách hoạt động của phương thức này.

`reduce()` is one of the most powerful array methods in JavaScript. It executes a reducer function on each element of the array, returning a single output value as the accumulated result. Implementing `reduce` from scratch helps understand how this method works internally.

## Purpose / Mục đích

- Hiểu sâu về cách hoạt động của `reduce()`
- Biết cách xử lý các trường hợp đặc biệt như không có initialValue
- Nắm vững các tham số của callback: accumulator, currentValue, currentIndex, array

- Understand deeply how `reduce()` works
- Know how to handle special cases like missing initialValue
- Master callback parameters: accumulator, currentValue, currentIndex, array

## When to Use / Khi nào nên dùng

- Khi cần chuyển đổi mảng thành một giá trị duy nhất
- Khi cần tính toán tổng, tích, hoặc các toán tử gộp khác
- Khi cần xây dựng object hoặc map từ mảng
- Khi cần thực hiện các thao tác phức tạp không thể thực hiện với map/filter

- When converting an array to a single value
- When calculating sum, product, or other aggregation operations
- When building objects or maps from arrays
- When performing complex operations not possible with map/filter

## Benefits / Lợi ích

- `reduce` rất linh hoạt, có thể thay thế nhiều phương thức array khác
- Code ngắn gọn và declarative
- Hiệu quả cho các thao tác tích lũy dữ liệu
- Có thể xử lý các trường hợp phức tạp trong một lần duyệt

- `reduce` is very flexible, can replace many other array methods
- Concise and declarative code
- Efficient for data accumulation operations
- Can handle complex cases in a single pass

## Pros & Cons / Ưu điểm & Nhược điểm

### Pros / Ưu điểm

- Rất linh hoạt và mạnh mẽ
- Có thể thực hiện nhiều loại transformations
- Tối ưu cho các thao tác tích lũy

- Very flexible and powerful
- Can perform many types of transformations
- Optimized for accumulation operations

### Cons / Nhược điểm

- Code có thể khó đọc nếu logic quá phức tạp
- Dễ gây lỗi nếu không hiểu rõ cách hoạt động
- Không phải lúc nào cũng là lựa chọn tốt nhất cho các tác vụ đơn giản

- Code can be hard to read if logic is too complex
- Easy to introduce bugs if not understanding how it works
- Not always the best choice for simple tasks

## Examples / Ví dụ

### 1. Basic reduce implementation / Triển khai reduce cơ bản

```javascript
/**
 * Implement Array.prototype.reduce
 * Triển khai Array.prototype.reduce
 * @param {Function} callback - Function to execute on each element / Hàm thực thi trên từng phần tử
 * @param {*} initialValue - Initial value for accumulator / Giá trị ban đầu cho accumulator
 * @returns {*} The accumulated result / Kết quả tích lũy
 */
Array.prototype.myReduce = function (callback, initialValue) {
  // Check if this is null or undefined / Kiểm tra nếu this là null hoặc undefined
  if (this == null) {
    throw new TypeError("Array.prototype.reduce called on null or undefined");
  }

  // Check if callback is a function / Kiểm tra nếu callback là hàm
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const array = Object(this);
  const length = array.length >>> 0; // Convert to unsigned 32-bit integer

  // Handle empty array without initial value / Xử lý mảng rỗng không có giá trị ban đầu
  if (length === 0 && arguments.length < 2) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let accumulator;
  let startIndex = 0;

  // Set initial accumulator / Thiết lập accumulator ban đầu
  if (arguments.length >= 2) {
    accumulator = initialValue;
  } else {
    // Use first element as initial accumulator / Sử dụng phần tử đầu tiên làm accumulator ban đầu
    accumulator = array[0];
    startIndex = 1;
  }

  // Iterate through array / Duyệt qua mảng
  for (let i = startIndex; i < length; i++) {
    if (i in array) {
      // Skip sparse array elements / Bỏ qua các phần tử mảng thưa
      accumulator = callback(accumulator, array[i], i, array);
    }
  }

  return accumulator;
};

// Test cases / Các trường hợp kiểm tra
console.log([1, 2, 3, 4].myReduce((acc, val) => acc + val)); // 10
console.log([1, 2, 3, 4].myReduce((acc, val) => acc + val, 10)); // 20
console.log([1, 2, 3, 4].myReduce((acc, val) => acc * val, 1)); // 24
```

### 2. Callback parameters explained / Giải thích các tham số callback

```javascript
// Understanding callback parameters / Hiểu các tham số callback
const arr = [1, 2, 3, 4];

const result = arr.myReduce(
  (accumulator, currentValue, currentIndex, array) => {
    console.log({
      accumulator, // Accumulated value so far / Giá trị tích lũy đến nay
      currentValue, // Current element being processed / Phần tử đang được xử lý
      currentIndex, // Index of current element / Chỉ số của phần tử hiện tại
      array, // Original array / Mảng gốc
    });
    return accumulator + currentValue;
  },
  0,
);

console.log("Result:", result); // Result: 10
```

### 3. Common use cases / Các trường hợp sử dụng phổ biến

```javascript
// Sum / Tổng
const sum = [1, 2, 3, 4].myReduce((acc, val) => acc + val, 0);
console.log("Sum:", sum); // Sum: 10

// Product / Tích
const product = [1, 2, 3, 4].myReduce((acc, val) => acc * val, 1);
console.log("Product:", product); // Product: 24

// Find maximum / Tìm giá trị lớn nhất
const max = [1, 5, 3, 9, 2].myReduce(
  (acc, val) => Math.max(acc, val),
  -Infinity,
);
console.log("Max:", max); // Max: 9

// Find minimum / Tìm giá trị nhỏ nhất
const min = [1, 5, 3, 9, 2].myReduce(
  (acc, val) => Math.min(acc, val),
  Infinity,
);
console.log("Min:", min); // Min: 1

// Count occurrences / Đếm số lần xuất hiện
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const count = fruits.myReduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log("Count:", count); // Count: { apple: 3, banana: 2, orange: 1 }

// Group by object / Nhóm theo object
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 },
];
const groupedByAge = people.myReduce((acc, person) => {
  const age = person.age;
  if (!acc[age]) {
    acc[age] = [];
  }
  acc[age].push(person.name);
  return acc;
}, {});
console.log("Grouped:", groupedByAge); // Grouped: { 25: ['Alice', 'Charlie'], 30: ['Bob'] }

// Array to object / Mảng sang object
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];
const userMap = users.myReduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});
console.log("User map:", userMap); // User map: { 1: { id: 1, name: 'Alice' }, 2: { id: 2, name: 'Bob' } }
```

### 4. Implementing other array methods with reduce / Triển khai các phương thức array khác với reduce

```javascript
// Implement map using reduce / Triển khai map sử dụng reduce
Array.prototype.myMapUsingReduce = function (callback) {
  return this.myReduce((acc, val, i, arr) => {
    acc.push(callback(val, i, arr));
    return acc;
  }, []);
};

console.log([1, 2, 3].myMapUsingReduce((x) => x * 2)); // [2, 4, 6]

// Implement filter using reduce / Triển khai filter sử dụng reduce
Array.prototype.myFilterUsingReduce = function (callback) {
  return this.myReduce((acc, val, i, arr) => {
    if (callback(val, i, arr)) {
      acc.push(val);
    }
    return acc;
  }, []);
};

console.log([1, 2, 3, 4, 5].myFilterUsingReduce((x) => x % 2 === 0)); // [2, 4]

// Implement some using reduce / Triển khai some sử dụng reduce
Array.prototype.mySomeUsingReduce = function (callback) {
  return this.myReduce((acc, val, i, arr) => {
    return acc || callback(val, i, arr);
  }, false);
};

console.log([1, 2, 3].mySomeUsingReduce((x) => x > 2)); // true

// Implement every using reduce / Triển khai every sử dụng reduce
Array.prototype.myEveryUsingReduce = function (callback) {
  return this.myReduce((acc, val, i, arr) => {
    return acc && callback(val, i, arr);
  }, true);
};

console.log([1, 2, 3].myEveryUsingReduce((x) => x > 0)); // true

// Implement find using reduce / Triển khai find sử dụng reduce
Array.prototype.myFindUsingReduce = function (callback) {
  return this.myReduce((acc, val, i, arr) => {
    return acc !== undefined ? acc : callback(val, i, arr) ? val : undefined;
  }, undefined);
};

console.log([1, 2, 3, 4].myFindUsingReduce((x) => x > 2)); // 3
```

### 5. Chaining with reduce / Chaining với reduce

```javascript
// Complex transformation using reduce / Chuyển đổi phức tạp sử dụng reduce
const data = [
  { id: 1, category: "A", value: 10 },
  { id: 2, category: "B", value: 20 },
  { id: 3, category: "A", value: 30 },
  { id: 4, category: "B", value: 40 },
];

// Sum values by category / Tổng giá trị theo category
const sumByCategory = data.myReduce((acc, item) => {
  acc[item.category] = (acc[item.category] || 0) + item.value;
  return acc;
}, {});

console.log("Sum by category:", sumByCategory); // Sum by category: { A: 40, B: 60 }

// Pipeline pattern using reduce / Mẫu pipeline sử dụng reduce
const pipeline = [
  (arr) => arr.filter((x) => x > 2),
  (arr) => arr.map((x) => x * 2),
  (arr) => arr.reduce((acc, val) => acc + val, 0),
];

const result = [1, 2, 3, 4, 5].myReduce((acc, fn) => fn(acc), pipeline);
console.log("Pipeline result:", result); // Pipeline result: 24 (3*2 + 4*2 + 5*2 = 6 + 8 + 10 = 24)
```

### 6. Handling sparse arrays / Xử lý mảng thưa

```javascript
// Sparse array handling / Xử lý mảng thưa
const sparseArray = [1, , , 4, , 6]; // Holes at indices 1, 2, 4

const result = sparseArray.myReduce((acc, val, i) => {
  console.log(`Index ${i}:`, val);
  return acc + (val || 0);
}, 0);

console.log("Result:", result); // Result: 11 (1 + 4 + 6)
// Output: Index 0: 1, Index 3: 4, Index 5: 6
```

### 7. Async reduce / Reduce bất đồng bộ

```javascript
/**
 * Async reduce implementation
 * Triển khai reduce bất đồng bộ
 * @param {Function} callback - Async callback function / Hàm callback bất đồng bộ
 * @param {*} initialValue - Initial value for accumulator / Giá trị ban đầu cho accumulator
 * @returns {Promise<*>} Promise resolving to accumulated result / Promise trả về kết quả tích lũy
 */
async function asyncReduce(array, callback, initialValue) {
  let accumulator = initialValue;

  for (let i = 0; i < array.length; i++) {
    accumulator = await callback(accumulator, array[i], i, array);
  }

  return accumulator;
}

// Example: Fetch and sum data / Ví dụ: Fetch và tính tổng dữ liệu
const urls = ["/api/1", "/api/2", "/api/3"];

// Simulate fetch / Giả lập fetch
const fetchData = async (url) => ({
  url,
  data: Math.floor(Math.random() * 100),
});

const totalData = await asyncReduce(
  urls,
  async (acc, url) => {
    const response = await fetchData(url);
    return acc + response.data;
  },
  0,
);

console.log("Total data:", totalData);
```

### 8. Performance comparison / So sánh hiệu năng

```javascript
// Test data / Dữ liệu kiểm tra
const largeArray = Array.from({ length: 100000 }, (_, i) => i);

// Test built-in reduce / Kiểm tra reduce tích hợp
console.time("Built-in reduce");
const result1 = largeArray.reduce((acc, val) => acc + val, 0);
console.timeEnd("Built-in reduce");

// Test custom reduce / Kiểm tra reduce tùy chỉnh
console.time("Custom reduce");
const result2 = largeArray.myReduce((acc, val) => acc + val, 0);
console.timeEnd("Custom reduce");

// Verify results are equal / Kiểm tra kết quả bằng nhau
console.log("Results equal:", result1 === result2); // true
```

## Best Practices / Thực hành tốt nhất

1. **Always provide an initial value when possible / Luôn cung cấp giá trị ban đầu khi có thể**

   ```javascript
   // Good / Tốt
   const sum = arr.reduce((acc, val) => acc + val, 0);

   // Risky with empty arrays / Rủi ro với mảng rỗng
   const sum = arr.reduce((acc, val) => acc + val);
   ```

2. **Use meaningful variable names / Sử dụng tên biến có ý nghĩa**

   ```javascript
   // Good / Tốt
   const total = prices.reduce((sum, price) => sum + price, 0);

   // Less clear / Ít rõ ràng hơn
   const total = prices.reduce((a, b) => a + b, 0);
   ```

3. **Return the accumulator explicitly / Trả về accumulator một cách rõ ràng**

   ```javascript
   // Good / Tốt
   arr.reduce((acc, val) => {
     acc[val] = true;
     return acc;
   }, {});

   // Bad - missing return / Không tốt - thiếu return
   arr.reduce((acc, val) => {
     acc[val] = true;
   }, {});
   ```

4. **Keep the callback simple / Giữ callback đơn giản**
   - Nếu callback quá phức tạp, hãy tách thành hàm riêng
   - If callback is too complex, separate into its own function

5. **Use reduce for transformations, not just accumulation / Sử dụng reduce cho các chuyển đổi, không chỉ tích lũy**
   ```javascript
   // Building an object / Xây dựng object
   const lookup = users.reduce((acc, user) => {
     acc[user.id] = user.name;
     return acc;
   }, {});
   ```

## Anti-patterns / Các mẫu nên tránh

### 1. Mutating the accumulator directly / Thay đổi accumulator trực tiếp

```javascript
// BAD / KHÔNG TỐT
const result = arr.reduce((acc, val) => {
  acc.push(val * 2); // Mutating array passed as initial value
  return acc;
}, []);

// BETTER / TỐT HƠN
const result = arr.reduce((acc, val) => {
  return [...acc, val * 2]; // Return new array
}, []);

// OR BEST / HOẶC TỐT NHẤT - Use map for this / Sử dụng map cho việc này
const result = arr.map((val) => val * 2);
```

### 2. Using reduce when other methods are better / Sử dụng reduce khi các phương thức khác tốt hơn

```javascript
// BAD / KHÔNG TỐT - Using reduce to filter / Sử dụng reduce để filter
const filtered = arr.reduce((acc, val) => {
  if (val > 5) acc.push(val);
  return acc;
}, []);

// GOOD / TỐT - Use filter / Sử dụng filter
const filtered = arr.filter((val) => val > 5);
```

### 3. Complex logic in reduce callback / Logic phức tạp trong callback reduce

```javascript
// BAD / KHÔNG TỐT
const result = data.reduce(
  (acc, item) => {
    if (item.type === "A") {
      if (item.value > 10) {
        acc.a.push(item);
      } else {
        acc.aSmall.push(item);
      }
    } else if (item.type === "B") {
      acc.b.push(item);
    }
    return acc;
  },
  { a: [], aSmall: [], b: [] },
);

// BETTER / TỐT HƠN - Extract logic / Tách logic
function categorize(acc, item) {
  if (item.type === "A") {
    const target = item.value > 10 ? "a" : "aSmall";
    acc[target].push(item);
  } else if (item.type === "B") {
    acc.b.push(item);
  }
  return acc;
}

const result = data.reduce(categorize, { a: [], aSmall: [], b: [] });
```

### 4. Not handling empty arrays / Không xử lý mảng rỗng

```javascript
// BAD / KHÔNG TỐT - Will throw on empty array / Sẽ lỗi với mảng rỗng
const sum = arr.reduce((acc, val) => acc + val);

// GOOD / TỐT - Provide initial value / Cung cấp giá trị ban đầu
const sum = arr.reduce((acc, val) => acc + val, 0);
```

## References / Tài liệu tham khảo

- [MDN: Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [ECMAScript Specification: Array.prototype.reduce](https://tc39.es/ecma262/#sec-array.prototype.reduce)
- [JavaScript.info: Array methods](https://javascript.info/array-methods)
- [You Don't Know JS: Async & Performance](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch4.md)
