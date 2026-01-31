# 42. Flatten Nested Array / Làm phẳng mảng lồng nhau

> Flatten nested array / Làm phẳng mảng lồng nhau

---

## Overview / Tổng quan

Flatten nested array là kỹ thuật chuyển đổi một mảng có nhiều cấp độ lồng nhau thành một mảng một chiều duy nhất. Đây là một bài toán phổ biến trong JavaScript với nhiều cách giải quyết khác nhau, từ đơn giản đến phức tạp.

Flatten nested array is the technique of converting a multi-dimensional nested array into a single flat array. This is a common problem in JavaScript with various solutions ranging from simple to complex.

## Purpose / Mục đích

- Chuyển đổi cấu trúc dữ liệu lồng nhau thành mảng một chiều để dễ xử lý
- Chuẩn hóa dữ liệu trước khi thực hiện các thao tác như map, filter, reduce
- Giúp đơn giản hóa logic khi làm việc với dữ liệu phức tạp

- Convert nested data structures to a flat array for easier processing
- Normalize data before performing operations like map, filter, reduce
- Simplify logic when working with complex data

## When to Use / Khi nào nên dùng

- Khi cần làm việc với dữ liệu có cấu trúc lồng nhau nhưng muốn xử lý như mảng phẳng
- Khi chuẩn bị dữ liệu cho các thuật toán yêu cầu mảng một chiều
- Khi cần tìm kiếm hoặc lọc trong mảng đa chiều

- When working with nested data structures but want to process as a flat array
- When preparing data for algorithms that require a single-dimensional array
- When searching or filtering within multi-dimensional arrays

## Benefits / Lợi ích

- Đơn giản hóa logic xử lý dữ liệu
- Giảm độ phức tạp của các thao tác mảng
- Tăng khả năng đọc và bảo trì code
- Tương thích với nhiều hàm array method

- Simplifies data processing logic
- Reduces complexity of array operations
- Improves code readability and maintainability
- Compatible with many array methods

## Pros & Cons / Ưu điểm & Nhược điểm

### Pros / Ưu điểm

- Dễ dàng thao tác với dữ liệu sau khi làm phẳng
- Tận dụng được các array method tích hợp sẵn
- Code ngắn gọn và dễ hiểu

- Easy to manipulate data after flattening
- Leverage built-in array methods
- Concise and readable code

### Cons / Nhược điểm

- Có thể mất thông tin về cấu trúc gốc
- Với mảng rất lớn, việc làm phẳng có thể tốn bộ nhớ
- Một số phương pháp đệ quy có thể gây stack overflow

- Can lose information about original structure
- Flattening large arrays may consume memory
- Some recursive methods may cause stack overflow

## Examples / Ví dụ

### 1. Basic flatten with Array.prototype.flat() / Flatten cơ bản với flat()

```javascript
// Flatten one level / Làm phẳng một cấp
const arr1 = [1, [2, 3], [4, 5]];
const flat1 = arr1.flat();
console.log(flat1); // [1, 2, 3, 4, 5]

// Flatten two levels / Làm phẳng hai cấp
const arr2 = [1, [2, [3, 4]], [5, [6]]];
const flat2 = arr2.flat(2);
console.log(flat2); // [1, 2, 3, 4, 5, 6]

// Flatten all levels / Làm phẳng tất cả các cấp
const arr3 = [1, [2, [3, [4, [5]]]]];
const flat3 = arr3.flat(Infinity);
console.log(flat3); // [1, 2, 3, 4, 5]
```

### 2. Recursive flatten implementation / Implement flatten đệ quy

```javascript
/**
 * Flatten nested array recursively
 * Làm phẳng mảng lồng nhau bằng đệ quy
 * @param {Array} arr - Array to flatten / Mảng cần làm phẳng
 * @returns {Array} Flattened array / Mảng đã làm phẳng
 */
function flatten(arr) {
  const result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      // Recursively flatten nested arrays
      // Đệ quy làm phẳng các mảng lồng
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

// Test cases / Các trường hợp kiểm tra
console.log(flatten([1, [2, 3], [4, [5, 6]]])); // [1, 2, 3, 4, 5, 6]
console.log(flatten([1, [2, [3, [4, [5]]]]])); // [1, 2, 3, 4, 5]
console.log(flatten([[[[1]]], 2, [3, [4, [5]]]])); // [1, 2, 3, 4, 5]
```

### 3. Flatten with depth parameter / Flatten với tham số độ sâu

```javascript
/**
 * Flatten nested array with depth control
 * Làm phẳng mảng lồng nhau với kiểm soát độ sâu
 * @param {Array} arr - Array to flatten / Mảng cần làm phẳng
 * @param {number} depth - Maximum depth to flatten / Độ sâu tối đa để làm phẳng
 * @returns {Array} Flattened array / Mảng đã làm phẳng
 */
function flattenWithDepth(arr, depth = 1) {
  const result = [];

  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flattenWithDepth(item, depth - 1));
    } else {
      result.push(item);
    }
  }

  return result;
}

// Test cases / Các trường hợp kiểm tra
const arr = [1, [2, [3, [4, [5]]]]];
console.log(flattenWithDepth(arr, 1)); // [1, 2, [3, [4, [5]]]]
console.log(flattenWithDepth(arr, 2)); // [1, 2, 3, [4, [5]]]
console.log(flattenWithDepth(arr, 3)); // [1, 2, 3, 4, [5]]
console.log(flattenWithDepth(arr, Infinity)); // [1, 2, 3, 4, 5]
```

### 4. Flatten using reduce / Flatten sử dụng reduce

```javascript
/**
 * Flatten array using reduce
 * Làm phẳng mảng sử dụng reduce
 * @param {Array} arr - Array to flatten / Mảng cần làm phẳng
 * @returns {Array} Flattened array / Mảng đã làm phẳng
 */
function flattenReduce(arr) {
  return arr.reduce((acc, item) => {
    if (Array.isArray(item)) {
      return acc.concat(flattenReduce(item));
    }
    return acc.concat(item);
  }, []);
}

// Test cases / Các trường hợp kiểm tra
console.log(flattenReduce([1, [2, 3], [4, [5, 6]]])); // [1, 2, 3, 4, 5, 6]
```

### 5. Flatten using stack (iterative) / Flatten sử dụng stack (lặp)

```javascript
/**
 * Flatten array iteratively using stack
 * Làm phẳng mảng lặp sử dụng stack
 * @param {Array} arr - Array to flatten / Mảng cần làm phẳng
 * @returns {Array} Flattened array / Mảng đã làm phẳng
 */
function flattenIterative(arr) {
  const stack = [...arr];
  const result = [];

  while (stack.length) {
    const item = stack.pop();

    if (Array.isArray(item)) {
      // Push items from array to stack in reverse order
      // Đẩy các phần tử từ mảng vào stack theo thứ tự ngược
      stack.push(...item);
    } else {
      result.push(item);
    }
  }

  // Reverse to maintain original order
  // Đảo ngược để giữ nguyên thứ tự gốc
  return result.reverse();
}

// Test cases / Các trường hợp kiểm tra
console.log(flattenIterative([1, [2, 3], [4, [5, 6]]])); // [1, 2, 3, 4, 5, 6]
```

### 6. Flatten with generator / Flatten với generator

```javascript
/**
 * Flatten array using generator
 * Làm phẳng mảng sử dụng generator
 * @param {Array} arr - Array to flatten / Mảng cần làm phẳng
 * @returns {Generator} Generator yielding flattened items / Generator trả về các phần tử đã làm phẳng
 */
function* flattenGenerator(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flattenGenerator(item);
    } else {
      yield item;
    }
  }
}

// Usage / Cách sử dụng
const arr = [1, [2, [3, [4, [5]]]]];
const flattened = [...flattenGenerator(arr)];
console.log(flattened); // [1, 2, 3, 4, 5]

// Or use with for...of / Hoặc sử dụng với for...of
for (const item of flattenGenerator(arr)) {
  console.log(item); // 1, 2, 3, 4, 5
}
```

### 7. Flatten with type checking / Flatten với kiểm tra kiểu

```javascript
/**
 * Flatten array with type checking (only flatten arrays)
 * Làm phẳng mảng với kiểm tra kiểu (chỉ làm phẳng array)
 * @param {Array} arr - Array to flatten / Mảng cần làm phẳng
 * @returns {Array} Flattened array / Mảng đã làm phẳng
 */
function flattenWithTypes(arr) {
  const result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenWithTypes(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

// Test with mixed types / Kiểm tra với các kiểu dữ liệu hỗn hợp
const mixedArr = [1, "hello", [2, [3, { a: 4 }]], [null, [undefined, [true]]]];
console.log(flattenWithTypes(mixedArr));
// [1, 'hello', 2, 3, { a: 4 }, null, undefined, true]
```

### 8. Performance comparison / So sánh hiệu năng

```javascript
// Test data / Dữ liệu kiểm tra
const testArr = Array.from({ length: 1000 }, (_, i) =>
  i % 10 === 0 ? [i, [i + 1, [i + 2]]] : i,
);

// Test flat() method / Kiểm tra phương thức flat()
console.time("flat()");
const result1 = testArr.flat(Infinity);
console.timeEnd("flat()");

// Test recursive / Kiểm tra đệ quy
console.time("recursive");
const result2 = flatten(testArr);
console.timeEnd("recursive");

// Test iterative / Kiểm tra lặp
console.time("iterative");
const result3 = flattenIterative(testArr);
console.timeEnd("iterative");

// Verify all results are the same / Kiểm tra tất cả kết quả giống nhau
console.log(
  JSON.stringify(result1) === JSON.stringify(result2) &&
    JSON.stringify(result2) === JSON.stringify(result3),
); // true
```

## Best Practices / Thực hành tốt nhất

1. **Use built-in flat() when possible / Sử dụng flat() tích hợp khi có thể**
   - `flat()` được tối ưu hóa bởi engine JavaScript
   - `flat()` is optimized by JavaScript engines

2. **Specify depth explicitly / Chỉ định độ sâu rõ ràng**

   ```javascript
   arr.flat(2); // Better than arr.flat() for predictable behavior
   ```

3. **Handle edge cases / Xử lý các trường hợp đặc biệt**
   - Mảng rỗng (empty arrays)
   - Mảng chứa undefined/null
   - Mảng rất sâu

4. **Consider performance for large arrays / Cân nhắc hiệu năng cho mảng lớn**
   - Sử dụng phương pháp lặp thay vì đệ quy cho mảng lớn
   - Use iterative methods instead of recursive for large arrays

5. **Preserve order when needed / Giữ nguyên thứ tự khi cần thiết**
   - Các phương pháp stack cần đảo ngược kết quả
   - Stack methods need to reverse results

## Anti-patterns / Các mẫu nên tránh

### 1. Using toString() and split() / Sử dụng toString() và split()

```javascript
// BAD / KHÔNG TỐT
function flattenBad(arr) {
  return arr.toString().split(",").map(Number);
}

// This fails for non-numeric values and loses type information
// Điều này thất bại với các giá trị không phải số và mất thông tin kiểu
flattenBad([1, "2", [3, [4]]]); // [1, 2, 3, 4] - '2' becomes 2
```

### 2. Using JSON.stringify() and parse() / Sử dụng JSON.stringify() và parse()

```javascript
// BAD / KHÔNG TỐT
function flattenBad2(arr) {
  return JSON.parse(
    JSON.stringify(arr)
      .replace(/\[/g, "")
      .replace(/\]/g, "")
      .split(",")
      .filter(Boolean)
      .map((v) => (isNaN(v) ? v : Number(v))),
  );
}

// Very inefficient and unreliable
// Rất không hiệu quả và không đáng tin cậy
```

### 3. Deep recursion without limit / Đệ quy sâu mà không giới hạn

```javascript
// BAD / KHÔNG TỐT - May cause stack overflow / Có thể gây stack overflow
function flattenBad3(arr) {
  return arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenBad3(val)) : acc.concat(val),
    [],
  );
}

// For very deep arrays, this will fail
// Với mảng rất sâu, điều này sẽ thất bại
```

## References / Tài liệu tham khảo

- [MDN: Array.prototype.flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
- [MDN: Array.prototype.flatMap()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
- [JavaScript.info: Array methods](https://javascript.info/array-methods)
- [You Don't Know JS: Types & Grammar](https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch4.md)
