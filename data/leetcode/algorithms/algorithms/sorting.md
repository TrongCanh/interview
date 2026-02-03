# Sorting / Sắp xếp

> Thuật toán Sorting - Giải thích chi tiết / Sorting Algorithms - Detailed Explanation

---

## 📚 Khái niệm / Concept

**Sorting** là quá trình sắp xếp các phần tử của một mảng hoặc danh sách theo một thứ tự cụ thể (tăng dần hoặc giảm dần). Đây là một trong những bài toán cơ bản và quan trọng nhất trong khoa học máy tính.

### Các khái niệm cơ bản / Basic Concepts

- **Stable (Ổn định):** Giữ nguyên thứ tự tương đối của các phần tử bằng nhau
- **In-place (Tại chỗ):** Không dùng thêm bộ nhớ đáng kể (O(1) hoặc O(log n))
- **Adaptive (Thích ứng):** Tận dụng thứ tự có sẵn của dữ liệu
- **Time Complexity:** Độ phức tạp về thời gian (O(n log n), O(n^2), v.v.)
- **Space Complexity:** Độ phức tạp về bộ nhớ (O(1), O(n), v.v.)

---

## 🎯 Khi nào dùng? / When to use?

- **Cần sắp xếp dữ liệu để tìm kiếm nhanh hơn**
- **Cần hiển thị dữ liệu theo thứ tự**
- **Cần chuẩn bị dữ liệu cho các thuật toán khác**
- **Cần loại bỏ trùng lặp (sau khi sắp xếp)**

---

## 🔄 Các thuật toán Sorting / Sorting Algorithms

### Bubble Sort (Sắp xếp nổi bọt)

Duyệt qua mảng nhiều lần, hoán đổi các phần tử liền kề nếu sai thứ tự.

### Selection Sort (Sắp xếp chọn)

Tìm phần tử nhỏ nhất trong mảng chưa sắp xếp và đưa vào vị trí đúng.

### Insertion Sort (Sắp xếp chèn)

Chèn mỗi phần tử vào vị trí đúng trong mảng đã sắp xếp.

### Merge Sort (Sắp xếp trộn)

Chia mảng thành hai phần, sắp xếp từng phần, sau đó gộp lại.

### Quick Sort (Sắp xếp nhanh)

Chọn một phần tử làm pivot, chia mảng thành hai phần (nhỏ hơn và lớn hơn pivot), sau đó đệ quy sắp xếp từng phần.

### Heap Sort (Sắp xếp đống)

Xây dựng max heap từ mảng, sau đó extract max liên tục.

### Counting Sort (Sắp xếp đếm)

Đếm số lần xuất hiện của mỗi phần tử, sau đó tái tạo mảng đã sắp xếp.

### Radix Sort (Sắp xếp theo cơ số)

Sắp xếp theo từng chữ số (hoặc bit), từ chữ số thấp nhất đến cao nhất.

---

## 💡 Code Template / Mẫu Code

### Bubble Sort

```javascript
/**
 * Bubble Sort - Sắp xếp nổi bọt
 * @param {number[]} arr - Mảng cần sắp xếp
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 * Stable: Yes
 * In-place: Yes
 */
function bubbleSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Hoán đổi
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}

// Test
console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]
```

### Selection Sort

```javascript
/**
 * Selection Sort - Sắp xếp chọn
 * @param {number[]} arr - Mảng cần sắp xếp
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 * Stable: No
 * In-place: Yes
 */
function selectionSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Hoán đổi phần tử nhỏ nhất với phần tử hiện tại
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }

  return arr;
}

// Test
console.log(selectionSort([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]
```

### Insertion Sort

```javascript
/**
 * Insertion Sort - Sắp xếp chèn
 * @param {number[]} arr - Mảng cần sắp xếp
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 * Stable: Yes
 * In-place: Yes
 * Adaptive: Yes (tốt cho mảng gần sắp xếp)
 */
function insertionSort(arr) {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    // Di chuyển các phần tử lớn hơn key sang phải
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
  }

  return arr;
}

// Test
console.log(insertionSort([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]
```

### Merge Sort

```javascript
/**
 * Merge Sort - Sắp xếp trộn
 * @param {number[]} arr - Mảng cần sắp xếp
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 * Stable: Yes
 * In-place: No
 */
function mergeSort(arr) {
  // Base case: mảng có 0 hoặc 1 phần tử
  if (arr.length <= 1) {
    return arr;
  }

  // Chia mảng thành hai phần
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // Đệ quy sắp xếp từng phần
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  // Gộp hai mảng đã sắp xếp
  return merge(sortedLeft, sortedRight);
}

/**
 * Gộp hai mảng đã sắp xếp - Merge two sorted arrays
 * @param {number[]} left - Mảng trái đã sắp xếp
 * @param {number[]} right - Mảng phải đã sắp xếp
 * @return {number[]} - Mảng đã gộp
 */
function merge(left, right) {
  const result = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // Thêm các phần tử còn lại
  return [...result, ...left.slice(i), ...right.slice(j)];
}

// Test
console.log(mergeSort([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]
```

### Quick Sort

```javascript
/**
 * Quick Sort - Sắp xếp nhanh
 * @param {number[]} arr - Mảng cần sắp xếp
 *
 * Time Complexity: O(n log n) trung bình, O(n^2) xấu nhất
 * Space Complexity: O(log n) cho stack
 * Stable: No
 * In-place: Yes
 */
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Partition và lấy index của pivot
    const pivotIndex = partition(arr, low, high);

    // Đệ quy sắp xếp hai phần
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }

  return arr;
}

/**
 * Partition - Chia mảng dựa trên pivot
 * @param {number[]} arr - Mảng
 * @param {number} low - Index bắt đầu
 * @param {number} high - Index kết thúc
 * @return {number} - Index của pivot sau khi partition
 */
function partition(arr, low, high) {
  // Chọn phần tử cuối cùng làm pivot
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Đưa pivot vào vị trí đúng
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

  return i + 1;
}

// Test
console.log(quickSort([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]
```

### Heap Sort

```javascript
/**
 * Heap Sort - Sắp xếp đống
 * @param {number[]} arr - Mảng cần sắp xếp
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 * Stable: No
 * In-place: Yes
 */
function heapSort(arr) {
  const n = arr.length;

  // Xây dựng max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract max từ heap liên tục
  for (let i = n - 1; i > 0; i--) {
    // Di chuyển root (max) đến cuối
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // Heapify lại
    heapify(arr, i, 0);
  }

  return arr;
}

/**
 * Heapify - Duy trì heap property
 * @param {number[]} arr - Mảng
 * @param {number} n - Kích thước heap
 * @param {number} i - Index cần heapify
 */
function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

// Test
console.log(heapSort([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1 / Example 1: Sắp xếp mảng số nguyên

**Mô tả:** Sắp xếp một mảng số nguyên tăng dần.

**Code:**

```javascript
/**
 * Sắp xếp mảng số nguyên - Sort Integer Array
 * @param {number[]} arr - Mảng số nguyên
 * @return {number[]} - Mảng đã sắp xếp
 */
function sortArray(arr) {
  // Sử dụng Merge Sort cho O(n log n)
  return mergeSort(arr);
}

// Test
console.log(sortArray([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]
console.log(sortArray([5, 2, 8, 1, 9])); // [1, 2, 5, 8, 9]
```

### Ví dụ 2 / Example 2: Sắp xếp mảng object

**Mô tả:** Sắp xếp mảng object dựa trên thuộc tính.

**Code:**

```javascript
/**
 * Sắp xếp mảng object - Sort Object Array
 * @param {Object[]} arr - Mảng object
 * @param {string} key - Thuộc tính để sắp xếp
 * @return {Object[]} - Mảng đã sắp xếp
 */
function sortObjects(arr, key) {
  return arr.sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
}

// Test
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 20 },
];
console.log(sortObjects(people, "age"));
// [{ name: 'Charlie', age: 20 }, { name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }]
```

### Ví dụ 3 / Example 3: Sắp xếp chuỗi

**Mô tả:** Sắp xếp một mảng chuỗi theo thứ tự bảng chữ cái.

**Code:**

```javascript
/**
 * Sắp xếp chuỗi - Sort String Array
 * @param {string[]} arr - Mảng chuỗi
 * @return {string[]} - Mảng đã sắp xếp
 */
function sortStrings(arr) {
  return arr.sort((a, b) => a.localeCompare(b));
}

// Test
console.log(sortStrings(["banana", "apple", "cherry"])); // ['apple', 'banana', 'cherry']
console.log(sortStrings(["Zebra", "Apple", "Mango"])); // ['Apple', 'Mango', 'Zebra']
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [`../problems/medium/015-3sum.md`](../problems/medium/015-3sum.md)
- [`../problems/medium/016-3sum-closest.md`](../problems/medium/016-3sum-closest.md)
- [`../problems/hard/041-first-missing-positive.md`](../problems/hard/041-first-missing-positive.md)

- [Sort an Array](https://leetcode.com/problems/sort-an-array/)
- [Sort Colors](https://leetcode.com/problems/sort-colors/)
- [Valid Anagram](https://leetcode.com/problems/valid-anagram/)
- [Group Anagrams](https://leetcode.com/problems/group-anagrams/)
- [Largest Number](https://leetcode.com/problems/largest-number/)

---

## 📊 So sánh Các Thuật toán / Algorithm Comparison

| Thuật toán / Algorithm | Time (Trung bình) | Time (Xấu nhất) | Space    | Stable | Adaptive | Khi nào dùng / When to use |
| ---------------------- | ----------------- | --------------- | -------- | ------ | -------- | -------------------------- |
| Bubble Sort            | O(n^2)            | O(n^2)          | O(1)     | Yes    | Yes      | Mảng nhỏ, demo             |
| Selection Sort         | O(n^2)            | O(n^2)          | O(1)     | No     | No       | Mảng nhỏ, ít swap          |
| Insertion Sort         | O(n^2)            | O(n^2)          | O(1)     | Yes    | Yes      | Mảng gần sắp xếp           |
| Merge Sort             | O(n log n)        | O(n log n)      | O(n)     | Yes    | No       | Mảng lớn, cần stable       |
| Quick Sort             | O(n log n)        | O(n^2)          | O(log n) | No     | No       | Mảng lớn, trung bình       |
| Heap Sort              | O(n log n)        | O(n log n)      | O(1)     | No     | No       | Mảng lớn, in-place         |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Quên base case:** Trong Merge Sort và Quick Sort, cần base case khi mảng có 0 hoặc 1 phần tử
2. **Sai comparator:** Khi dùng `sort()`, comparator phải trả về -1, 0, hoặc 1
3. **Quên stable:** Một số thuật toán không stable, có thể thay đổi thứ tự tương đối
4. **Chọn pivot xấu:** Trong Quick Sort, pivot xấu có thể dẫn đến O(n^2)
5. **Không xử lý mảng rỗng:** Luôn kiểm tra edge cases

---

## 💡 Tips & Tricks

1. **Merge Sort cho stable:** Nếu cần stable sort, dùng Merge Sort
2. **Quick Sort cho trung bình:** Quick Sort thường nhanh hơn trong thực tế
3. **Insertion Sort cho gần sắp xếp:** Nếu mảng gần sắp xếp, Insertion Sort rất nhanh
4. **Counting Sort cho số nguyên nhỏ:** Nếu phạm vi giá trị nhỏ, Counting Sort là O(n)
5. **Built-in sort:** Trong JavaScript, `arr.sort()` thường đủ tốt cho hầu hết trường hợp

---

## 📚 Tài liệu tham khảo / References

- [Sorting Algorithm - Wikipedia](https://en.wikipedia.org/wiki/Sorting_algorithm)
- [Merge Sort - Wikipedia](https://en.wikipedia.org/wiki/Merge_sort)
- [Quick Sort - Wikipedia](https://en.wikipedia.org/wiki/Quicksort)
- [Heap Sort - Wikipedia](https://en.wikipedia.org/wiki/Heapsort)

---

_Last updated: 2025-02-03_
