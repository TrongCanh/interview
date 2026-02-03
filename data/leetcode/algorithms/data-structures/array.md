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

## 📚 Tài liệu tham khảo / References

- [MDN - Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Array - Wikipedia](https://en.wikipedia.org/wiki/Array_data_structure)

---

_Last updated: 2026-02-03_
