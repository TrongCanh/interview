# 44. Implement `map` / Triển khai `map`

> Implement Array.prototype.map from scratch / Triển khai Array.prototype.map từ đầu

---

## Overview / Tổng quan

`map()` là một phương thức array phổ biến trong JavaScript, tạo ra một mảng mới với kết quả của việc gọi một hàm được cung cấp trên mỗi phần tử của mảng gốc. Việc triển khai `map` từ đầu giúp hiểu sâu hơn về cách hoạt động của phương thức này và các khái niệm như immutability và functional programming.

`map()` is a popular array method in JavaScript that creates a new array populated with the results of calling a provided function on every element in the calling array. Implementing `map` from scratch helps understand how this method works and concepts like immutability and functional programming.

## Purpose / Mục đích

- Hiểu sâu về cách hoạt động của `map()`
- Biết cách xử lý các trường hợp đặc biệt như sparse arrays
- Nắm vững các tham số của callback: currentValue, index, array
- Hiểu về immutability và functional programming

- Understand deeply how `map()` works
- Know how to handle special cases like sparse arrays
- Master callback parameters: currentValue, index, array
- Understand immutability and functional programming

## When to Use / Khi nào nên dùng

- Khi cần chuyển đổi từng phần tử của mảng sang một giá trị mới
- Khi cần tạo một mảng mới từ mảng hiện có
- Khi muốn giữ nguyên mảng gốc (immutability)
- Khi cần thực hiện transformation trên dữ liệu

- When converting each element of an array to a new value
- When creating a new array from an existing one
- When wanting to keep the original array unchanged (immutability)
- When performing data transformation

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
- Có thể overkill cho các thao tác đơn giản

- Always creates a new array, can be memory-intensive for large arrays
- Cannot break out of the loop early (unlike for loop)
- Can be overkill for simple operations

## Examples / Ví dụ

### 1. Basic map implementation / Triển khai map cơ bản

```javascript
/**
 * Implement Array.prototype.map
 * Triển khai Array.prototype.map
 * @param {Function} callback - Function to execute on each element / Hàm thực thi trên từng phần tử
 * @param {*} thisArg - Value to use as this when executing callback / Giá trị dùng làm this khi thực thi callback
 * @returns {Array} New array with mapped values / Mảng mới với các giá trị đã được map
 */
Array.prototype.myMap = function (callback, thisArg) {
  // Check if this is null or undefined / Kiểm tra nếu this là null hoặc undefined
  if (this == null) {
    throw new TypeError("Array.prototype.map called on null or undefined");
  }

  // Check if callback is a function / Kiểm tra nếu callback là hàm
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const array = Object(this);
  const length = array.length >>> 0; // Convert to unsigned 32-bit integer
  const result = new Array(length);

  // Iterate through array / Duyệt qua mảng
  for (let i = 0; i < length; i++) {
    if (i in array) {
      // Skip sparse array elements / Bỏ qua các phần tử mảng thưa
      // Call callback with thisArg as context / Gọi callback với thisArg làm context
      result[i] = callback.call(thisArg, array[i], i, array);
    }
  }

  return result;
};

// Test cases / Các trường hợp kiểm tra
console.log([1, 2, 3, 4].myMap((x) => x * 2)); // [2, 4, 6, 8]
console.log(["hello", "world"].myMap((str) => str.toUpperCase())); // ['HELLO', 'WORLD']
console.log([1, 2, 3].myMap((x, i) => x + i)); // [1, 3, 5]
```

### 2. Callback parameters explained / Giải thích các tham số callback

```javascript
// Understanding callback parameters / Hiểu các tham số callback
const arr = [10, 20, 30, 40];

const result = arr.myMap((currentValue, index, array) => {
  console.log({
    currentValue, // Current element being processed / Phần tử đang được xử lý
    index, // Index of current element / Chỉ số của phần tử hiện tại
    array, // Original array / Mảng gốc
  });
  return currentValue * 2;
});

console.log("Result:", result); // Result: [20, 40, 60, 80]
```

### 3. Using thisArg / Sử dụng thisArg

```javascript
// Using thisArg to provide context / Sử dụng thisArg để cung cấp context
const multiplier = {
  factor: 3,
  multiply: function (value) {
    return value * this.factor;
  },
};

const numbers = [1, 2, 3, 4];

// Using thisArg / Sử dụng thisArg
const result = numbers.myMap(function (value) {
  return this.multiply(value);
}, multiplier);

console.log("Result:", result); // Result: [3, 6, 9, 12]

// Using arrow function (thisArg is ignored) / Sử dụng arrow function (thisArg bị bỏ qua)
const result2 = numbers.myMap((value) => value * this.factor, multiplier);
console.log("Result2:", result2); // Result2: [NaN, NaN, NaN, NaN] (this is undefined)
```

### 4. Common use cases / Các trường hợp sử dụng phổ biến

```javascript
// Transform numbers / Chuyển đổi số
const numbers = [1, 2, 3, 4];
const doubled = numbers.myMap((x) => x * 2);
console.log("Doubled:", doubled); // Doubled: [2, 4, 6, 8]

// Transform strings / Chuyển đổi chuỗi
const names = ["alice", "bob", "charlie"];
const capitalized = names.myMap(
  (name) => name.charAt(0).toUpperCase() + name.slice(1),
);
console.log("Capitalized:", capitalized); // Capitalized: ['Alice', 'Bob', 'Charlie']

// Extract properties from objects / Trích xuất thuộc tính từ objects
const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];
const userNames = users.myMap((user) => user.name);
console.log("User names:", userNames); // User names: ['Alice', 'Bob', 'Charlie']

// Create new objects from array / Tạo object mới từ mảng
const products = [
  { id: 1, price: 10, quantity: 2 },
  { id: 2, price: 20, quantity: 1 },
];
const withTotal = products.myMap((product) => ({
  ...product,
  total: product.price * product.quantity,
}));
console.log("With total:", withTotal);
// With total: [
//   { id: 1, price: 10, quantity: 2, total: 20 },
//   { id: 2, price: 20, quantity: 1, total: 20 }
// ]

// Convert array to different types / Chuyển đổi mảng sang các kiểu khác
const strings = ["1", "2", "3", "4"];
const numbersFromStrings = strings.myMap(Number);
console.log("Numbers:", numbersFromStrings); // Numbers: [1, 2, 3, 4]

const objects = [{ value: 1 }, { value: 2 }, { value: 3 }];
const values = objects.myMap((obj) => obj.value);
console.log("Values:", values); // Values: [1, 2, 3]
```

### 5. Chaining map with other methods / Chaining map với các phương thức khác

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Chain: filter -> map -> reduce / Chuỗi: filter -> map -> reduce
const sumOfEvenDoubled = numbers
  .myFilter((x) => x % 2 === 0)
  .myMap((x) => x * 2)
  .myReduce((acc, val) => acc + val, 0);

console.log("Sum of even doubled:", sumOfEvenDoubled); // Sum of even doubled: 60
// (2 + 4 + 6 + 8 + 10) * 2 = 30 * 2 = 60

// Chain: map -> filter -> map / Chuỗi: map -> filter -> map
const result = numbers
  .myMap((x) => x * x)
  .myFilter((x) => x > 25)
  .myMap((x) => Math.sqrt(x));

console.log("Result:", result); // Result: [6, 7, 8, 9, 10]
```

### 6. Handling sparse arrays / Xử lý mảng thưa

```javascript
// Sparse array handling / Xử lý mảng thưa
const sparseArray = [1, , , 4, , 6]; // Holes at indices 1, 2, 4

const result = sparseArray.myMap((val, i) => {
  console.log(`Index ${i}:`, val);
  return val ? val * 2 : val;
});

console.log("Result:", result); // Result: [2, empty × 2, 8, empty × 1, 12]
// Output: Index 0: 1, Index 3: 4, Index 5: 6
// Indices 1, 2, 4 are skipped / Các chỉ số 1, 2, 4 bị bỏ qua
```

### 7. Map vs forEach / Map so với forEach

```javascript
const numbers = [1, 2, 3, 4];

// forEach - doesn't return a new array / forEach - không trả về mảng mới
const forEachResult = numbers.forEach((x) => x * 2);
console.log("forEach result:", forEachResult); // undefined

// map - returns a new array / map - trả về mảng mới
const mapResult = numbers.myMap((x) => x * 2);
console.log("map result:", mapResult); // [2, 4, 6, 8]

// Original array is unchanged / Mảng gốc không thay đổi
console.log("Original:", numbers); // Original: [1, 2, 3, 4]
```

### 8. Implementing map using reduce / Triển khai map sử dụng reduce

```javascript
// Implement map using reduce / Triển khai map sử dụng reduce
Array.prototype.myMapUsingReduce = function (callback, thisArg) {
  return this.myReduce((acc, val, i, arr) => {
    acc.push(callback.call(thisArg, val, i, arr));
    return acc;
  }, []);
};

// Test / Kiểm tra
console.log([1, 2, 3].myMapUsingReduce((x) => x * 2)); // [2, 4, 6]
```

### 9. Async map / Map bất đồng bộ

```javascript
/**
 * Async map implementation
 * Triển khai map bất đồng bộ
 * @param {Function} callback - Async callback function / Hàm callback bất đồng bộ
 * @param {*} thisArg - Value to use as this / Giá trị dùng làm this
 * @returns {Promise<Array>} Promise resolving to mapped array / Promise trả về mảng đã map
 */
async function asyncMap(array, callback, thisArg) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    if (i in array) {
      result[i] = await callback.call(thisArg, array[i], i, array);
    }
  }

  return result;
}

// Example: Fetch data for each ID / Ví dụ: Fetch dữ liệu cho từng ID
const ids = [1, 2, 3, 4];

// Simulate fetch / Giả lập fetch
const fetchUser = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return { id, name: `User ${id}` };
};

const users = await asyncMap(ids, fetchUser);
console.log("Users:", users);
// Users: [
//   { id: 1, name: 'User 1' },
//   { id: 2, name: 'User 2' },
//   { id: 3, name: 'User 3' },
//   { id: 4, name: 'User 4' }
// ]
```

### 10. Performance comparison / So sánh hiệu năng

```javascript
// Test data / Dữ liệu kiểm tra
const largeArray = Array.from({ length: 100000 }, (_, i) => i);

// Test built-in map / Kiểm tra map tích hợp
console.time("Built-in map");
const result1 = largeArray.map((x) => x * 2);
console.timeEnd("Built-in map");

// Test custom map / Kiểm tra map tùy chỉnh
console.time("Custom map");
const result2 = largeArray.myMap((x) => x * 2);
console.timeEnd("Custom map");

// Verify results are equal / Kiểm tra kết quả bằng nhau
console.log(
  "Results equal:",
  JSON.stringify(result1) === JSON.stringify(result2),
); // true
```

## Best Practices / Thực hành tốt nhất

1. **Keep callback functions pure / Giữ các hàm callback thuần túy**

   ```javascript
   // Good / Tốt - Pure function / Hàm thuần túy
   const doubled = numbers.map((x) => x * 2);

   // Bad / Không tốt - Side effect / Tác động phụ
   const doubled = numbers.map((x) => {
     console.log(x); // Side effect
     return x * 2;
   });
   ```

2. **Use descriptive parameter names / Sử dụng tên tham số có mô tả**

   ```javascript
   // Good / Tốt
   const names = users.map((user) => user.name);

   // Less clear / Ít rõ ràng hơn
   const names = users.map((u) => u.name);
   ```

3. **Consider using map for transformations only / Chỉ sử dụng map cho các chuyển đổi**

   ```javascript
   // Good / Tốt
   const doubled = numbers.map((x) => x * 2);

   // Bad / Không tốt - Use forEach instead / Sử dụng forEach thay thế
   numbers.map((x) => {
     console.log(x);
   });
   ```

4. **Don't mutate the original array / Không thay đổi mảng gốc**

   ```javascript
   // Bad / KHÔNG TỐT
   const objects = [{ a: 1 }, { a: 2 }];
   objects.map((obj) => (obj.a = 10)); // Mutates original objects

   // Good / TỐT
   const objects = [{ a: 1 }, { a: 2 }];
   const newObjects = objects.map((obj) => ({ ...obj, a: 10 })); // Creates new objects
   ```

5. **Chain methods appropriately / Chaining các phương thức phù hợp**
   ```javascript
   // Good / Tốt - Readable chain / Chuỗi dễ đọc
   const result = numbers
     .filter((x) => x > 5)
     .map((x) => x * 2)
     .reduce((acc, val) => acc + val, 0);
   ```

## Anti-patterns / Các mẫu nên tránh

### 1. Using map when forEach is more appropriate / Sử dụng map khi forEach phù hợp hơn

```javascript
// BAD / KHÔNG TỐT
users.map((user) => {
  saveToDatabase(user); // Not using the returned array
});

// GOOD / TỐT
users.forEach((user) => {
  saveToDatabase(user);
});
```

### 2. Mutating objects in map / Thay đổi objects trong map

```javascript
// BAD / KHÔNG TỐT
const users = [{ name: "Alice", age: 25 }];
const modified = users.map((user) => {
  user.age = 26; // Mutating original object
  return user;
});
console.log(users[0].age); // 26 - Original was mutated!

// GOOD / TỐT
const users = [{ name: "Alice", age: 25 }];
const modified = users.map((user) => ({
  ...user,
  age: 26, // Creating new object
}));
console.log(users[0].age); // 25 - Original unchanged
```

### 3. Using map for filtering / Sử dụng map để filter

```javascript
// BAD / KHÔNG TỐT
const evenNumbers = numbers
  .map((x) => {
    if (x % 2 === 0) {
      return x;
    }
    return undefined;
  })
  .filter((x) => x !== undefined);

// GOOD / TỐT - Use filter / Sử dụng filter
const evenNumbers = numbers.filter((x) => x % 2 === 0);
```

### 4. Complex logic in map callback / Logic phức tạp trong callback map

```javascript
// BAD / KHÔNG TỐT
const result = users.map((user) => {
  if (user.age < 18) {
    return { ...user, category: "minor", canVote: false };
  } else if (user.age >= 18 && user.age < 65) {
    return { ...user, category: "adult", canVote: true };
  } else {
    return { ...user, category: "senior", canVote: true };
  }
});

// BETTER / TỐT HƠN - Extract logic / Tách logic
function categorizeUser(user) {
  if (user.age < 18) {
    return { ...user, category: "minor", canVote: false };
  } else if (user.age < 65) {
    return { ...user, category: "adult", canVote: true };
  }
  return { ...user, category: "senior", canVote: true };
}

const result = users.map(categorizeUser);
```

## References / Tài liệu tham khảo

- [MDN: Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [ECMAScript Specification: Array.prototype.map](https://tc39.es/ecma262/#sec-array.prototype.map)
- [JavaScript.info: Array methods](https://javascript.info/array-methods)
- [You Don't Know JS: Types & Grammar](https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch4.md)
