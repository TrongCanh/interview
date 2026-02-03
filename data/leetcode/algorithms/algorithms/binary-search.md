# Binary Search / Tìm kiếm nhị phân

> Thuật toán tìm kiếm hiệu quả trên mảng đã sắp xếp / Efficient search algorithm on sorted arrays

---

## 📚 Khái niệm / Concept

**Binary Search** là một thuật toán tìm kiếm hoạt động trên mảng đã được sắp xếp. Thuật toán chia mảng thành hai phần và loại bỏ một nửa mỗi lần lặp, giảm độ phức tạp từ O(n) xuống O(log n).

**Binary Search** is a search algorithm that works on sorted arrays. It divides the array into two halves and eliminates one half each iteration, reducing complexity from O(n) to O(log n).

---

## 🎯 Khi nào dùng? / When to use?

- **Dùng khi:**
  - Mảng đã được sắp xếp
  - Cần tìm kiếm nhanh O(log n)
  - Cần tìm vị trí chèn
  - Cần tìm phần tử gần nhất
  - Cần tìm giới hạn trên/dưới

- **Không dùng khi:**
  - Mảng chưa được sắp xếp
  - Cần tìm kiếm nhiều lần trên mảng động
  - Cần tìm tất cả phần tử khớp
  - Mảng nhỏ (linear search có thể nhanh hơn)

---

## 🔄 Các biến thể / Variations

### 1. Standard Binary Search / Tìm kiếm nhị phân chuẩn

Tìm phần tử chính xác trong mảng đã sắp xếp.

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

  return -1;
}
```

### 2. Lower Bound / Giới hạn dưới

Tìm vị trí chèn nhỏ nhất để giữ mảng đã sắp xếp.

```javascript
function lowerBound(arr, target) {
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

### 3. Upper Bound / Giới hạn trên

Tìm vị trí chèn lớn nhất để giữ mảng đã sắp xếp.

```javascript
function upperBound(arr, target) {
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

  return left;
}
```

---

## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template

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

  return -1; // Không tìm thấy
}
```

### Template nâng cao / Advanced Template (Recursive)

```javascript
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  } else {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
}
```

### Template tối ưu / Optimized Template

```javascript
function binarySearchOptimized(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = (left + right) >> 1; // Bit shift thay vì Math.floor

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1: Tìm phần tử / Find Element

```javascript
function findElement(arr, target) {
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

  return -1;
}

// findElement([1, 3, 5, 7, 9], 5) = 2
// Time: O(log n), Space: O(1)
```

### Ví dụ 2: Search Insert Position

```javascript
function searchInsert(nums, target) {
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

  return left;
}

// searchInsert([1, 3, 5, 6], 2) = 1
// Time: O(log n), Space: O(1)
```

### Ví dụ 3: First Bad Version

```javascript
function firstBadVersion(n) {
  let left = 1;
  let right = n;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (isBadVersion(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

// Time: O(log n), Space: O(1)
```

### Ví dụ 4: Sqrt(x)

```javascript
function mySqrt(x) {
  if (x < 2) return x;

  let left = 1;
  let right = Math.floor(x / 2);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const square = mid * mid;

    if (square === x) {
      return mid;
    } else if (square < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return right;
}

// mySqrt(8) = 2
// Time: O(log n), Space: O(1)
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [`../problems/easy/035-search-insert-position.md`](../problems/easy/035-search-insert-position.md)
- [`../problems/hard/004-median-of-two-sorted-arrays.md`](../problems/hard/004-median-of-two-sorted-arrays.md)

---

## 📊 Độ phức tạp / Complexity

| Loại / Type       | Time     | Space    | Mô tả / Description |
| ----------------- | -------- | -------- | ------------------- |
| Iterative         | O(log n) | O(1)     | Dùng vòng lặp       |
| Recursive         | O(log n) | O(log n) | Dùng đệ quy         |
| Lower/Upper Bound | O(log n) | O(1)     | Tìm vị trí chèn     |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Integer overflow**: `(left + right) / 2` có thể overflow với số lớn
2. **Infinite loop**: Không cập nhật left/right đúng cách
3. **Off-by-one**: Điều kiện dừng sai (<= vs <)
4. **Wrong mid calculation**: Dùng `Math.ceil` thay vì `Math.floor`
5. **Unsorted array**: Binary search chỉ hoạt động với mảng đã sắp xếp

---

## 💡 Tips & Tricks

- Dùng `left + (right - left) / 2` để tránh overflow
- Dùng `(left + right) >> 1` để tối ưu tính mid
- Dùng `left < right` cho lower/upper bound
- Dùng `left <= right` cho tìm kiếm chính xác
- Vẽ hình để visualize phạm vi tìm kiếm
- Kiểm tra edge cases: mảng rỗng, 1 phần tử

---

## 📚 Tài liệu tham khảo / References

- [Binary Search - Wikipedia](https://en.wikipedia.org/wiki/Binary_search_algorithm)
- [Binary Search - LeetCode](https://leetcode.com/tag/binary-search/)

---

_Last updated: 2026-02-03_
