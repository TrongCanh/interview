# Two Pointers / Hai con trỏ

> Pattern sử dụng hai con trỏ để duyệt qua cấu trúc dữ liệu / Pattern using two pointers to traverse data structures

---

## 📚 Khái niệm / Concept

**Two Pointers** là một kỹ thuật sử dụng hai con trỏ để duyệt qua mảng hoặc danh sách liên kết. Hai con trỏ có thể di chuyển cùng hoặc ngược chiều, giúp giải quyết các bài toán một cách hiệu quả.

**Two Pointers** is a technique using two pointers to traverse arrays or linked lists. The pointers can move in same or opposite directions, helping solve problems efficiently.

---

## 🎯 Khi nào dùng? / When to use?

- **Dùng khi:**
  - Cần tìm cặp phần tử thỏa mãn điều kiện
  - Cần đảo ngược mảng
  - Cần hợp nhất hai mảng đã sắp xếp
  - Cần xóa phần tử trùng
  - Cần tìm subarray hoặc substring
  - Mảng đã được sắp xếp

- **Không dùng khi:**
  - Cần duyệt qua nhiều mảng khác nhau
  - Cần backtrack
  - Cần duyệt theo thứ tự phức tạp

---

## 🔄 Các biến thể / Variations

### 1. Same Direction Pointers / Con trỏ cùng chiều

Hai con trỏ di chuyển cùng chiều, thường một nhanh hơn.

```javascript
let slow = 0;
let fast = 0;

while (fast < arr.length) {
  // slow di chuyển chậm hơn
  // fast di chuyển nhanh hơn
}
```

### 2. Opposite Direction Pointers / Con trỏ ngược chiều

Hai con trỏ từ hai đầu di chuyển vào giữa.

```javascript
let left = 0;
let right = arr.length - 1;

while (left < right) {
  // left di chuyển từ trái sang phải
  // right di chuyển từ phải sang trái
}
```

### 3. Fast and Slow Pointers / Con trỏ nhanh và chậm

Một con trỏ di chuyển nhanh hơn con trỏ kia, dùng để phát hiện cycle.

```javascript
let slow = head;
let fast = head;

while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
}
```

---

## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template (Opposite Direction)

```javascript
function twoPointersOpposite(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];

    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++; // Tăng sum
    } else {
      right--; // Giảm sum
    }
  }

  return [-1, -1]; // Không tìm thấy
}
```

### Template nâng cao / Advanced Template (Same Direction)

```javascript
function twoPointersSameDirection(arr) {
  let slow = 0;
  let fast = 0;

  while (fast < arr.length) {
    // Xử lý với slow pointer
    if (condition) {
      slow++;
    }
    fast++;
  }

  return slow;
}
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1: Two Sum (Sorted Array) / Tổng hai số

```javascript
function twoSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}

// Time: O(n), Space: O(1)
```

### Ví dụ 2: Remove Duplicates from Sorted Array

```javascript
function removeDuplicates(nums) {
  let write = 0;

  for (let read = 1; read < nums.length; read++) {
    if (nums[read] !== nums[write]) {
      write++;
      nums[write] = nums[read];
    }
  }

  return write + 1;
}

// Time: O(n), Space: O(1)
```

### Ví dụ 3: Palindrome Check / Kiểm tra palindrome

```javascript
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

// Time: O(n), Space: O(1)
```

### Ví dụ 4: Container With Most Water

```javascript
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    const area = width * minHeight;

    maxArea = Math.max(maxArea, area);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}

// Time: O(n), Space: O(1)
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [`../problems/easy/009-palindrome-number.md`](../problems/easy/009-palindrome-number.md)
- [`../problems/easy/026-remove-duplicates-from-sorted-array.md`](../problems/easy/026-remove-duplicates-from-sorted-array.md)
- [`../problems/easy/027-remove-element.md`](../problems/easy/027-remove-element.md)

---

## 📊 Độ phức tạp / Complexity

| Loại / Type        | Time | Space | Mô tả / Description    |
| ------------------ | ---- | ----- | ---------------------- |
| Opposite Direction | O(n) | O(1)  | Hai con trỏ từ hai đầu |
| Same Direction     | O(n) | O(1)  | Hai con trỏ cùng chiều |
| Fast & Slow        | O(n) | O(1)  | Một nhanh một chậm     |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Infinite loop**: Không cập nhật con trỏ đúng cách
2. **Off-by-one**: Điều kiện dừng sai
3. **Pointer collision**: Không xử lý khi hai con trỏ gặp nhau
4. **Wrong direction**: Di chuyển con trỏ ngược chiều
5. **Missing edge cases**: Không xử lý mảng rỗng hoặc 1 phần tử

---

## 💡 Tips & Tricks

- Luôn kiểm tra điều kiện dừng (left < right, left <= right, etc.)
- Vẽ hình để visualize movement của hai con trỏ
- Dùng slow/fast pointers để phát hiện cycle
- Dùng opposite direction cho bài toán sorted array
- Dùng same direction cho bài toán subarray/substring
- Cẩn thận với index out of bounds

---

## 📚 Tài liệu tham khảo / References

- [Two Pointers - LeetCode](https://leetcode.com/tag/two-pointers/)
- [Two Pointers Technique](https://www.geeksforgeeks.org/two-pointers-technique/)

---

_Last updated: 2026-02-03_
