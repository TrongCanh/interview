# 45. Implement `filter` / Triển khai `filter`

> Implement Array.prototype.filter from scratch / Triển khai Array.prototype.filter từ đầu

---

## Overview / Tổng quan

`filter()` là một phương thức array trong JavaScript tạo ra một mảng mới với tất cả các phần tử vượt qua bài kiểm tra được thực hiện bởi hàm được cung cấp. Việc triển khai `filter` từ đầu giúp hiểu sâu hơn về cách hoạt động của phương thức này và các khái niệm về functional programming.

`filter()` is an array method in JavaScript that creates a new array with all elements that pass the test implemented by the provided function. Implementing `filter` from scratch helps understand how this method works and concepts about functional programming.

## Purpose / Mục đích

- Hiểu sâu về cách hoạt động của `filter()`
- Biết cách xử lý các trường hợp đặc biệt như sparse arrays
- Nắm vững các tham số của callback: currentValue, index, array
- Hiểu về truthy/falsy values trong JavaScript

- Understand deeply how `filter()` works
- Know how to handle special cases like sparse arrays
- Master callback parameters: currentValue, index, array
- Understand truthy/falsy values in JavaScript

## When to Use / Khi nào nên dùng

- Khi cần lọc các phần tử dựa trên điều kiện
- Khi cần loại bỏ các giá trị null, undefined, hoặc falsy
- Khi cần tìm kiếm các phần tử thỏa mãn tiêu chí
- Khi muốn giữ nguyên mảng gốc (immutability)

- When filtering elements based on conditions
- When removing null, undefined, or falsy values
- When finding elements that meet criteria
- When wanting to keep the original array unchanged (immutability)

## Benefits / Lợi ích

- Không thay đổi mảng gốc (immutable)
- Code declarative và dễ đọc
- Dễ dàng chaining với các phương thức array khác
- Tận dụng được functional programming

- Does not modify the original array (immutable)
- Declarative and readable code
- Easy to chain with other array methods
- Leverages functional programming

## Pros & Cons / Ưu điểm & Nhược điểm

### Pros / Ưu điểm

- Immutable operation - không thay đổi mảng gốc
- Code declarative và dễ hiểu
- Dễ dàng test và debug
- Tương thích với functional programming

- Immutable operation - doesn't modify original array
- Declarative and understandable code
- Easy to test and debug
- Compatible with functional programming

### Cons / Nhược điểm

- Luôn tạo ra mảng mới, có thể tốn bộ nhớ cho mảng lớn
- Không thể thoát sớm khỏi vòng lặp (khác với for loop)
- Có thể overkill cho các tác vụ đơn giản

- Always creates a new array, can be memory-intensive for large arrays
- Cannot break out of the loop early (unlike for loop)
- Can be overkill for simple operations

## Examples / Ví dụ

### 1. Basic filter implementation / Triển khai filter cơ bản

```javascript
/**
 * Implement Array.prototype.filter
 * Triển khai Array.prototype.filter
 * @param {Function} callback - Function to test each element / Hàm kiểm tra từng phần tử
 * @param {*} thisArg - Value to use as this when executing callback / Giá trị dùng làm this khi thực thi callback
 * @returns {Array} New array with filtered elements / Mảng mới với các phần tử đã được lọc
 */
Array.prototype.myFilter = function (callback, thisArg) {
  // Check if this is null or undefined / Kiểm tra nếu this là null hoặc undefined
  if (this == null) {
    throw new TypeError("Array.prototype.filter called on null or undefined");
  }

  // Check if callback is a function / Kiểm tra nếu callback là hàm
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const array = Object(this);
  const length = array.length >>> 0; // Convert to unsigned 32-bit integer
  const result = [];
  let resultIndex = 0;

  // Iterate through array / Duyệt qua mảng
  for (let i = 0; i < length; i++) {
    if (i in array) {
      // Skip sparse array elements / Bỏ qua các phần tử mảng thưa
      // Call callback with thisArg as context / Gọi callback với thisArg làm context
      const shouldInclude = callback.call(thisArg, array[i], i, array);

      // Add to result if callback returns truthy value
      // Thêm vào kết quả nếu callback trả về giá trị truthy
      if (shouldInclude) {
        result[resultIndex++] = array[i];
      }
    }
  }

  return result;
};

// Test cases / Các trường hợp kiểm tra
console.log([1, 2, 3, 4, 5].myFilter((x) => x % 2 === 0)); // [2, 4]
console.log([1, 2, 3, 4, 5].myFilter((x) => x > 3)); // [4, 5]
console.log(["apple", "banana", "cherry"].myFilter((str) => str.length > 5)); // ['banana', 'cherry']
```

### 2. Callback parameters explained / Giải thích các tham số callback

```javascript
// Understanding callback parameters / Hiểu các tham số callback
const arr = [10, 20, 30, 40, 50];

const result = arr.myFilter((currentValue, index, array) => {
  console.log({
    currentValue, // Current element being tested / Phần tử đang được kiểm tra
    index, // Index of current element / Chỉ số của phần tử hiện tại
    array, // Original array / Mảng gốc
  });
  return currentValue > 25;
});

console.log("Result:", result); // Result: [30, 40, 50]
```

### 3. Using thisArg / Sử dụng thisArg

```javascript
// Using thisArg to provide context / Sử dụng thisArg để cung cấp context
const validator = {
  threshold: 25,
  isAboveThreshold: function (value) {
    return value > this.threshold;
  },
};

const numbers = [10, 20, 30, 40, 50];

// Using thisArg / Sử dụng thisArg
const result = numbers.myFilter(function (value) {
  return this.isAboveThreshold(value);
}, validator);

console.log("Result:", result); // Result: [30, 40, 50]

// Using arrow function (thisArg is ignored) / Sử dụng arrow function (thisArg bị bỏ qua)
const result2 = numbers.myFilter((value) => value > this.threshold, validator);
console.log("Result2:", result2); // Result2: [] (this is undefined)
```

### 4. Common use cases / Các trường hợp sử dụng phổ biến

```javascript
// Filter even numbers / Lọc số chẵn
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = numbers.myFilter((x) => x % 2 === 0);
console.log("Even numbers:", evenNumbers); // Even numbers: [2, 4, 6, 8, 10]

// Filter objects by property / Lọc objects theo thuộc tính
const users = [
  { id: 1, name: "Alice", age: 25, active: true },
  { id: 2, name: "Bob", age: 30, active: false },
  { id: 3, name: "Charlie", age: 35, active: true },
  { id: 4, name: "David", age: 40, active: false },
];
const activeUsers = users.myFilter((user) => user.active);
console.log("Active users:", activeUsers);
// Active users: [
//   { id: 1, name: 'Alice', age: 25, active: true },
//   { id: 3, name: 'Charlie', age: 35, active: true }
// ]

// Filter by age range / Lọc theo khoảng tuổi
const youngUsers = users.myFilter((user) => user.age >= 25 && user.age <= 30);
console.log("Young users:", youngUsers);
// Young users: [
//   { id: 1, name: 'Alice', age: 25, active: true },
//   { id: 2, name: 'Bob', age: 30, active: false }
// ]

// Remove falsy values / Loại bỏ giá trị falsy
const mixedValues = [0, 1, false, 2, "", 3, null, 4, undefined, 5, NaN];
const truthyValues = mixedValues.myFilter(Boolean);
console.log("Truthy values:", truthyValues); // Truthy values: [1, 2, 3, 4, 5]

// Remove null and undefined / Loại bỏ null và undefined
const values = [1, null, 2, undefined, 3, null, 4];
const cleanValues = values.myFilter((val) => val != null);
console.log("Clean values:", cleanValues); // Clean values: [1, 2, 3, 4]

// Filter unique values / Lọc các giá trị duy nhất
const duplicates = [1, 2, 2, 3, 4, 4, 5, 5, 5];
const unique = duplicates.myFilter(
  (value, index, arr) => arr.indexOf(value) === index,
);
console.log("Unique:", unique); // Unique: [1, 2, 3, 4, 5]

// Filter strings by pattern / Lọc chuỗi theo pattern
const emails = [
  "alice@example.com",
  "bob@test.org",
  "charlie@example.com",
  "invalid-email",
  "david@example.com",
];
const exampleEmails = emails.myFilter((email) =>
  email.includes("@example.com"),
);
console.log("Example emails:", exampleEmails);
// Example emails: ['alice@example.com', 'charlie@example.com', 'david@example.com']
```

### 5. Chaining filter with other methods / Chaining filter với các phương thức khác

```javascript
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 1000,
    category: "Electronics",
    inStock: true,
  },
  { id: 2, name: "Mouse", price: 20, category: "Electronics", inStock: true },
  {
    id: 3,
    name: "Keyboard",
    price: 50,
    category: "Electronics",
    inStock: false,
  },
  { id: 4, name: "Chair", price: 200, category: "Furniture", inStock: true },
  { id: 5, name: "Desk", price: 300, category: "Furniture", inStock: true },
  {
    id: 6,
    name: "Monitor",
    price: 400,
    category: "Electronics",
    inStock: false,
  },
];

// Chain: filter -> map / Chuỗi: filter -> map
const electronicsNames = products
  .myFilter((product) => product.category === "Electronics")
  .myMap((product) => product.name);

console.log("Electronics names:", electronicsNames);
// Electronics names: ['Laptop', 'Mouse', 'Keyboard', 'Monitor']

// Chain: filter -> filter -> map -> reduce / Chuỗi: filter -> filter -> map -> reduce
const totalStockElectronics = products
  .myFilter((product) => product.category === "Electronics")
  .myFilter((product) => product.inStock)
  .myMap((product) => product.price)
  .myReduce((acc, price) => acc + price, 0);

console.log("Total stock electronics:", totalStockElectronics); // Total stock electronics: 1020

// Complex filtering / Lọc phức tạp
const affordableFurniture = products
  .myFilter((product) => product.category === "Furniture")
  .myFilter((product) => product.price < 250)
  .myFilter((product) => product.inStock);

console.log("Affordable furniture:", affordableFurniture);
// Affordable furniture: [{ id: 4, name: 'Chair', price: 200, category: 'Furniture', inStock: true }]
```

### 6. Handling sparse arrays / Xử lý mảng thưa

```javascript
// Sparse array handling / Xử lý mảng thưa
const sparseArray = [1, , 3, , 5, , 7]; // Holes at indices 1, 3, 5

const result = sparseArray.myFilter((val, i) => {
  console.log(`Index ${i}:`, val);
  return val > 2;
});

console.log("Result:", result); // Result: [3, 5, 7]
// Output: Index 0: 1, Index 2: 3, Index 4: 5, Index 6: 7
// Indices 1, 3, 5 are skipped / Các chỉ số 1, 3, 5 bị bỏ qua
```

### 7. Filter vs find / Filter so với find

```javascript
const numbers = [1, 2, 3, 4, 5];

// filter - returns all matching elements / filter - trả về tất cả các phần tử khớp
const filtered = numbers.myFilter((x) => x > 3);
console.log("Filtered:", filtered); // Filtered: [4, 5]

// find - returns first matching element / find - trả về phần tử khớp đầu tiên
const found = numbers.find((x) => x > 3);
console.log("Found:", found); // Found: 4
```

### 8. Implementing filter using reduce / Triển khai filter sử dụng reduce

```javascript
// Implement filter using reduce / Triển khai filter sử dụng reduce
Array.prototype.myFilterUsingReduce = function (callback, thisArg) {
  return this.myReduce((acc, val, i, arr) => {
    if (callback.call(thisArg, val, i, arr)) {
      acc.push(val);
    }
    return acc;
  }, []);
};

// Test / Kiểm tra
console.log([1, 2, 3, 4, 5].myFilterUsingReduce((x) => x % 2 === 0)); // [2, 4]
```

### 9. Async filter / Filter bất đồng bộ

```javascript
/**
 * Async filter implementation
 * Triển khai filter bất đồng bộ
 * @param {Function} callback - Async callback function / Hàm callback bất đồng bộ
 * @param {*} thisArg - Value to use as this / Giá trị dùng làm this
 * @returns {Promise<Array>} Promise resolving to filtered array / Promise trả về mảng đã lọc
 */
async function asyncFilter(array, callback, thisArg) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    if (i in array) {
      const shouldInclude = await callback.call(thisArg, array[i], i, array);
      if (shouldInclude) {
        result.push(array[i]);
      }
    }
  }

  return result;
}

// Example: Filter users by async validation / Ví dụ: Lọc users bằng validation bất đồng bộ
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

// Simulate async validation / Giả lập validation bất đồng bộ
const isValidUser = async (user) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return user.id % 2 === 1; // Only odd IDs are valid
};

const validUsers = await asyncFilter(users, isValidUser);
console.log("Valid users:", validUsers);
// Valid users: [
//   { id: 1, name: 'Alice' },
//   { id: 3, name: 'Charlie' }
// ]
```

### 10. Performance comparison / So sánh hiệu năng

```javascript
// Test data / Dữ liệu kiểm tra
const largeArray = Array.from({ length: 100000 }, (_, i) => i);

// Test built-in filter / Kiểm tra filter tích hợp
console.time("Built-in filter");
const result1 = largeArray.filter((x) => x % 2 === 0);
console.timeEnd("Built-in filter");

// Test custom filter / Kiểm tra filter tùy chỉnh
console.time("Custom filter");
const result2 = largeArray.myFilter((x) => x % 2 === 0);
console.timeEnd("Custom filter");

// Verify results are equal / Kiểm tra kết quả bằng nhau
console.log(
  "Results equal:",
  JSON.stringify(result1) === JSON.stringify(result2),
); // true
```

## Best Practices / Thực hành tốt nhất

1. **Keep callback functions simple and focused / Giữ các hàm callback đơn giản và tập trung**

   ```javascript
   // Good / Tốt
   const evenNumbers = numbers.filter((x) => x % 2 === 0);

   // Less clear / Ít rõ ràng hơn
   const evenNumbers = numbers.filter((x) => {
     const remainder = x % 2;
     return remainder === 0;
   });
   ```

2. **Use descriptive parameter names / Sử dụng tên tham số có mô tả**

   ```javascript
   // Good / Tốt
   const activeUsers = users.filter((user) => user.active);

   // Less clear / Ít rõ ràng hơn
   const activeUsers = users.filter((u) => u.active);
   ```

3. **Consider using filter for filtering only / Chỉ sử dụng filter để lọc**

   ```javascript
   // Good / Tốt
   const evenNumbers = numbers.filter((x) => x % 2 === 0);

   // Bad / Không tốt - Use map for transformation / Sử dụng map để chuyển đổi
   const doubled = numbers.filter((x) => {
     return x * 2; // Should use map instead
   });
   ```

4. **Don't mutate the original array / Không thay đổi mảng gốc**

   ```javascript
   // filter always returns a new array / filter luôn trả về mảng mới
   const numbers = [1, 2, 3, 4, 5];
   const filtered = numbers.filter((x) => x > 2);
   console.log(numbers); // [1, 2, 3, 4, 5] - Original unchanged / Gốc không thay đổi
   console.log(filtered); // [3, 4, 5]
   ```

5. **Chain methods appropriately / Chaining các phương thức phù hợp**
   ```javascript
   // Good / Tốt - Readable chain / Chuỗi dễ đọc
   const result = users
     .filter((user) => user.active)
     .map((user) => user.name)
     .sort();
   ```

## Anti-patterns / Các mẫu nên tránh

### 1. Using filter when find is more appropriate / Sử dụng filter khi find phù hợp hơn

```javascript
// BAD / KHÔNG TỐT - Returns array when you only need one element
const user = users.filter((u) => u.id === 1)[0];

// GOOD / TỐT - Returns first matching element directly
const user = users.find((u) => u.id === 1);
```

### 2. Using filter with side effects / Sử dụng filter với tác động phụ

```javascript
// BAD / KHÔNG TỐT - Side effect in callback
users.filter((user) => {
  console.log(user); // Side effect
  return user.active;
});

// GOOD / TỐT - Use forEach for side effects
users.forEach((user) => {
  console.log(user);
});
const activeUsers = users.filter((user) => user.active);
```

### 3. Complex conditions in filter callback / Điều kiện phức tạp trong callback filter

```javascript
// BAD / KHÔNG TỐT
const filtered = users.filter((user) => {
  if (user.age < 18) {
    return false;
  } else if (user.age >= 18 && user.age < 65) {
    return user.active && user.verified;
  } else {
    return user.active;
  }
});

// BETTER / TỐT HƠN - Extract logic / Tách logic
function shouldIncludeUser(user) {
  if (user.age < 18) return false;
  if (user.age < 65) return user.active && user.verified;
  return user.active;
}

const filtered = users.filter(shouldIncludeUser);
```

### 4. Using filter for removing elements by index / Sử dụng filter để xóa phần tử theo chỉ số

```javascript
// BAD / KHÔNG TỐT - Inefficient for removing by index
const arr = [1, 2, 3, 4, 5];
const filtered = arr.filter((_, i) => i !== 2); // Remove element at index 2

// GOOD / TỐT - Use slice or splice for index-based removal
const arr = [1, 2, 3, 4, 5];
const filtered = [...arr.slice(0, 2), ...arr.slice(3)]; // Remove element at index 2
```

## References / Tài liệu tham khảo

- [MDN: Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [ECMAScript Specification: Array.prototype.filter](https://tc39.es/ecma262/#sec-array.prototype.filter)
- [JavaScript.info: Array methods](https://javascript.info/array-methods)
- [You Don't Know JS: Types & Grammar](https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch4.md)
