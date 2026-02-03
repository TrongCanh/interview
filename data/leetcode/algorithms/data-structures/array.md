# Array / Mảng

> Cấu trúc dữ liệu cơ bản và quan trọng nhất trong lập trình / The most fundamental and important data structure in programming

---

## 📚 Khái niệm / Concept

**Array** là một cấu trúc dữ liệu lưu trữ một tập hợp các phần tử cùng kiểu, được sắp xếp theo thứ tự liên tiếp trong bộ nhớ. Mỗi phần tử được truy cập thông qua chỉ số (index).

**An Array** is a data structure that stores a collection of elements of the same type, arranged sequentially in memory. Each element is accessed through an index.

---

## 🎯 Khi nào dùng? / When to use?

- **Dùng khi:**
  - Cần truy cập ngẫu nhiên (random access) nhanh O(1)
  - Biết trước số lượng phần tử
  - Cần lưu trữ dữ liệu tuần tự
  - Cần hiệu quả về không gian

- **Không dùng khi:**
  - Cần chèn/xóa thường xuyên ở giữa mảng
  - Không biết trước số lượng phần tử
  - Cần lưu trữ các kiểu dữ liệu khác nhau

---

## 🔄 Các biến thể / Variations

### 1. Static Array / Mảng tĩnh

Kích thước cố định, được cấp phát khi khai báo.

```javascript
// Trong JavaScript, mảng là động, nhưng có thể giả lập mảng tĩnh
const staticArray = new Array(5); // Mảng với 5 phần tử undefined
```

### 2. Dynamic Array / Mảng động

Kích thước có thể thay đổi, tự động mở rộng khi cần.

```javascript
const dynamicArray = [1, 2, 3];
dynamicArray.push(4); // Tự động mở rộng
```

### 3. Multidimensional Array / Mảng đa chiều

Mảng của mảng.

```javascript
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
```

---

## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template

```javascript
// Khởi tạo mảng
const arr = [1, 2, 3, 4, 5];

// Truy cập phần tử
const first = arr[0]; // O(1)
const last = arr[arr.length - 1]; // O(1)

// Thêm phần tử
arr.push(6); // Thêm cuối: O(1) trung bình
arr.unshift(0); // Thêm đầu: O(n)

// Xóa phần tử
arr.pop(); // Xóa cuối: O(1)
arr.shift(); // Xóa đầu: O(n)

// Tìm kiếm
const index = arr.indexOf(3); // O(n)
const found = arr.includes(3); // O(n)

// Duyệt mảng
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

arr.forEach((item, index) => {
  console.log(item, index);
});

// Sắp xếp
arr.sort((a, b) => a - b); // O(n log n)
```

### Template nâng cao / Advanced Template

```javascript
// Destructuring
const [first, second, ...rest] = arr;

// Spread operator
const newArr = [...arr, 6, 7];
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2];

// Map - biến đổi mảng
const doubled = arr.map((x) => x * 2); // O(n)

// Filter - lọc mảng
const evens = arr.filter((x) => x % 2 === 0); // O(n)

// Reduce - tổng hợp mảng
const sum = arr.reduce((acc, x) => acc + x, 0); // O(n)

// Find - tìm phần tử
const found = arr.find((x) => x > 3); // O(n)

// Some/Every - kiểm tra điều kiện
const hasEven = arr.some((x) => x % 2 === 0); // O(n)
const allPositive = arr.every((x) => x > 0); // O(n)

// Slice - lấy phần mảng
const subArr = arr.slice(1, 4); // O(n)

// Splice - thêm/xóa phần tử
arr.splice(2, 1, 10); // Xóa 1 phần tử tại index 2, thêm 10

// Reverse - đảo ngược
const reversed = [...arr].reverse(); // O(n)

// Sort với comparator
const objects = [{ id: 3 }, { id: 1 }, { id: 2 }];
objects.sort((a, b) => a.id - b.id);
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1: Tìm phần tử lớn nhất / Find Maximum

```javascript
function findMax(arr) {
  if (arr.length === 0) return undefined;

  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

// Time: O(n), Space: O(1)
```

### Ví dụ 2: Xóa phần tử trùng / Remove Duplicates

```javascript
function removeDuplicates(arr) {
  const seen = new Set();
  const result = [];

  for (const item of arr) {
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }

  return result;
}

// Time: O(n), Space: O(n)
```

### Ví dụ 3: Rotate mảng / Rotate Array

```javascript
function rotateArray(arr, k) {
  const n = arr.length;
  k = k % n;

  // Reverse toàn bộ
  reverse(arr, 0, n - 1);
  // Reverse phần đầu
  reverse(arr, 0, k - 1);
  // Reverse phần sau
  reverse(arr, k, n - 1);

  return arr;
}

function reverse(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}

// Time: O(n), Space: O(1)
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [`../problems/easy/001-two-sum.md`](../problems/easy/001-two-sum.md)
- [`../problems/easy/026-remove-duplicates-from-sorted-array.md`](../problems/easy/026-remove-duplicates-from-sorted-array.md)
- [`../problems/easy/027-remove-element.md`](../problems/easy/027-remove-element.md)
- [`../problems/easy/035-search-insert-position.md`](../problems/easy/035-search-insert-position.md)
- [`../problems/hard/004-median-of-two-sorted-arrays.md`](../problems/hard/004-median-of-two-sorted-arrays.md)
- [`../problems/hard/037-sudoku-solver.md`](../problems/hard/037-sudoku-solver.md)
- [`../problems/hard/041-first-missing-positive.md`](../problems/hard/041-first-missing-positive.md)
- [`../problems/hard/042-trapping-rain-water.md`](../problems/hard/042-trapping-rain-water.md)
- [`../problems/medium/011-container-with-most-water.md`](../problems/medium/011-container-with-most-water.md)
- [`../problems/medium/015-3sum.md`](../problems/medium/015-3sum.md)
- [`../problems/medium/016-3sum-closest.md`](../problems/medium/016-3sum-closest.md)

---

## 📊 Độ phức tạp / Complexity

| Thao tác / Operation | Time Complexity | Space Complexity |
| -------------------- | --------------- | ---------------- |
| Truy cập / Access    | O(1)            | O(1)             |
| Thêm cuối / Push     | O(1)            | O(1)             |
| Xóa cuối / Pop       | O(1)            | O(1)             |
| Thêm đầu / Unshift   | O(n)            | O(1)             |
| Xóa đầu / Shift      | O(n)            | O(1)             |
| Chèn giữa / Insert   | O(n)            | O(1)             |
| Xóa giữa / Delete    | O(n)            | O(1)             |
| Tìm kiếm / Search    | O(n)            | O(1)             |
| Sắp xếp / Sort       | O(n log n)      | O(1) hoặc O(n)   |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Index out of bounds**: Truy cập chỉ số ngoài phạm vi
2. **Mutating original array**: Thay đổi mảng gốc khi không mong muốn
3. **Using `for...in` for arrays**: Dùng `for...of` hoặc `forEach` thay vì
4. **Comparing arrays with `==`**: Mảng là object, không so sánh được trực tiếp
5. **Sparse arrays**: Mảng có các vị trí trống gây ra các vấn đề

---

## 💡 Tips & Tricks

- Dùng `Array.from()` hoặc spread operator `[...arr]` để copy mảng
- Dùng `arr.length` để kiểm tra mảng rỗng nhanh hơn `arr.length === 0`
- Dùng `Array.isArray()` để kiểm tra xem biến có phải mảng không
- Dùng `arr.flat()` để làm phẳng mảng đa chiều
- Dùng `arr.fill()` để điền giá trị vào mảng
- Dùng `arr.every()` và `arr.some()` để kiểm tra điều kiện nhanh hơn

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems Using This

- [001 Two Sum](../problems/easy/001-two-sum.md)
- [002 Add Two Numbers](../problems/medium/002-add-two-numbers.md)
- [003 Longest Substring Without Repeating Characters](../problems/medium/003-longest-substring-without-repeating-characters.md)
- [005 Longest Palindromic Substring](../problems/medium/005-longest-palindromic-substring.md)
- [006 Zigzag Conversion](../problems/medium/006-zigzag-conversion.md)
- [008 String to Integer (atoi)](../problems/medium/008-string-to-integer-atoi.md)
- [011 Container With Most Water](../problems/medium/011-container-with-most-water.md)
- [012 Integer to Roman](../problems/medium/012-integer-to-roman.md)
- [015 3Sum](../problems/medium/015-3sum.md)
- [016 3Sum Closest](../problems/medium/016-3sum-closest.md)
- [017 Letter Combinations of a Phone Number](../problems/medium/017-letter-combinations-of-a-phone-number.md)
- [018 4Sum](../problems/medium/018-4sum.md)
- [019 Remove Nth Node From End of List](../problems/medium/019-remove-nth-node-from-end-of-list.md)
- [020 Valid Parentheses](../problems/medium/020-valid-parentheses.md)
- [021 Merge Two Sorted Lists](../problems/medium/021-merge-two-sorted-lists.md)
- [022 Generate Parentheses](../problems/medium/022-generate-parentheses.md)
- [024 Swap Nodes in Pairs](../problems/medium/024-swap-nodes-in-pairs.md)
- [026 Remove Duplicates from Sorted Array](../problems/medium/026-remove-duplicates-from-sorted-array.md)
- [027 Remove Element](../problems/medium/027-remove-element.md)
- [028 Find the Index of the First Occurrence in a String](../problems/medium/028-find-the-index-of-the-first-occurrence-in-a-string.md)
- [029 Divide Two Integers](../problems/medium/029-divide-two-integers.md)
- [031 Next Permutation](../problems/medium/031-next-permutation.md)
- [033 Search in Rotated Sorted Array](../problems/medium/033-search-in-rotated-sorted-array.md)
- [034 Find First and Last Position of Element in Sorted Array](../problems/medium/034-find-first-and-last-position-of-element-in-sorted-array.md)
- [039 Combination Sum](../problems/medium/039-combination-sum.md)
- [040 Combination Sum II](../problems/medium/040-combination-sum-ii.md)
- [043 Multiply Strings](../problems/medium/043-multiply-strings.md)
- [045 Jump Game II](../problems/medium/045-jump-game-ii.md)
- [046 Permutations](../problems/medium/046-permutations.md)
- [047 Permutations II](../problems/medium/047-permutations-ii.md)
- [048 Rotate Image](../problems/medium/048-rotate-image.md)

---

## 📚 Tài liệu tham khảo / References

- [MDN - Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Array - Wikipedia](https://en.wikipedia.org/wiki/Array_data_structure)

---

_Last updated: 2026-02-03_
