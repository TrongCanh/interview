# Binary Search Pattern / Pattern Tìm kiếm nhị phân

> Giải thích và ví dụ về pattern Binary Search / Binary search pattern explanation and examples

---

## 📚 Khái niệm / Concept

**Binary Search** là thuật toán tìm kiếm trên mảng đã sắp xếp bằng cách chia đôi không gian tìm kiếm.

---

## 🎯 Khi nào dùng? / When to use?

- Mảng đã sắp xếp (sorted)
- Tìm một phần tử trong mảng lớn
- Tìm vị trí chèn phần tử
- Tìm min/max trong mảng có tính chất đặc biệt

---

## 💡 Code Template / Mẫu Code

### Standard Binary Search

```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1; // Not found
}
```

### Binary Search with Recursion

```javascript
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) return mid;
  if (arr[mid] < target)
    return binarySearchRecursive(arr, target, mid + 1, right);
  return binarySearchRecursive(arr, target, left, mid - 1);
}
```

### Find First Position (Lower Bound)

```javascript
function findFirst(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}
```

### Find Last Position (Upper Bound)

```javascript
function findLast(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left - 1;
}
```

---

## 📝 Ví dụ bài toán / Example Problems

### 1. Binary Search

**URL:** https://leetcode.com/problems/binary-search/

**Approach:** Standard binary search

```javascript
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
```

### 2. Search in Rotated Sorted Array

**URL:** https://leetcode.com/problems/search-in-rotated-sorted-array/

**Approach:** Tìm phần tử pivot, sau đó binary search

```javascript
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;

    // Kiểm tra nửa nào đã sắp xếp
    if (nums[left] <= nums[mid]) {
      // Nửa trái đã sắp xếp
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Nửa phải đã sắp xếp
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}
```

### 3. Find First and Last Position of Element

**URL:** https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/

**Approach:** Binary search 2 lần để tìm first và last

```javascript
function searchRange(nums, target) {
  return [findFirst(nums, target), findLast(nums, target)];
}

function findFirst(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      result = mid;
      right = mid - 1; // Tiếp tục tìm bên trái
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}

function findLast(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      result = mid;
      left = mid + 1; // Tiếp tục tìm bên phải
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}
```

### 4. Search a 2D Matrix

**URL:** https://leetcode.com/problems/search-a-2d-matrix/

**Approach:** Coi như 1D array đã sắp xếp

```javascript
function searchMatrix(matrix, target) {
  if (!matrix.length || !matrix[0].length) return false;

  const rows = matrix.length;
  const cols = matrix[0].length;
  let left = 0;
  let right = rows * cols - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = matrix[Math.floor(mid / cols)][mid % cols];

    if (midValue === target) return true;
    if (midValue < target) left = mid + 1;
    else right = mid - 1;
  }

  return false;
}
```

---

## 🎯 Practice Problems / Bài tập

1. Binary Search (Easy)
2. Search Insert Position (Easy)
3. Sqrt(x) (Easy)
4. Search in Rotated Sorted Array (Medium)
5. Find First and Last Position (Medium)
6. Search a 2D Matrix (Medium)
7. Find Minimum in Rotated Sorted Array (Medium)
8. Median of Two Sorted Arrays (Hard)

---

## ⚠️ Common Pitfalls / Lỗi thường gặp

1. Sai điều kiện vòng lặp (left <= right vs left < right)
2. Lỗi overflow khi tính mid: `(left + right) / 2` → `left + Math.floor((right - left) / 2)`
3. Quên xử lý edge cases (mảng rỗng, 1 phần tử)
4. Sai điều kiện update left/right

---

## 📊 Complexity / Độ phức tạp

- **Time:** O(log n) - chia đôi không gian tìm kiếm
- **Space:** O(1) - không dùng thêm bộ nhớ (O(log n) nếu dùng đệ quy)

---

## 💡 Tips / Mẹo

1. Luôn kiểm tra mảng đã sắp xếp chưa
2. Vẽ mảng và đánh dấu left, mid, right
3. Cẩn thận với điều kiện dừng vòng lặp
4. Test với edge cases (empty, 1 element, target not found)

---

## 🔄 Variations / Biến thể

| Biến thể / Variation | Mô tả / Description        |
| -------------------- | -------------------------- |
| Lower Bound          | Vị trí đầu tiên >= target  |
| Upper Bound          | Vị trí đầu tiên > target   |
| Rotated Array        | Mảng đã xoay               |
| 2D Matrix            | Tìm trong ma trận 2D       |
| Infinite Array       | Mảng không biết kích thước |

---

_Last updated: 2026-01-30_
