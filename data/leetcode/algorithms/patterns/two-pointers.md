# Two Pointers / Hai con trỏ

> Kỹ thuật sử dụng hai con trỏ để duyệt qua mảng/chuỗi / Technique using two pointers to traverse array/string

---

## 📚 Khái niệm / Concept

**Two Pointers** là một kỹ thuật thuật toán sử dụng hai con trỏ (pointers) để duyệt qua cấu trúc dữ liệu như mảng hoặc chuỗi. Hai con trỏ thường di chuyển theo các hướng khác nhau để giải quyết bài toán.

**Two Pointers** is an algorithmic technique that uses two pointers to traverse data structures like arrays or strings. Two pointers often move in different directions to solve problems.

### Các loại Two Pointers / Types of Two Pointers

1. **Con trỏ trái-phải (Left-Right Pointers):** Hai con trỏ bắt đầu từ hai đầu mảng, di chuyển về phía nhau
2. **Con trỏ nhanh-chậm (Fast-Slow Pointers):** Hai con trỏ với tốc độ khác nhau, thường dùng để tìm cycle hoặc vị trí giữa
3. **Con trỏ đầu-cuối (Head-Tail Pointers):** Một con trỏ ở đầu, một ở cuối, thường dùng cho Linked List

---

## 🎯 Khi nào dùng? / When to use?

- **Dùng khi:**
  - Cần tìm cặp phần tử thỏa mãn
  - Cần tìm subarray hoặc substring
  - Cần tìm vị trí giữa
  - Mảng đã được sắp xếp
  - Cần kiểm tra cycle trong Linked List

- **Không dùng khi:**
  - Mảng không được sắp xếp
  - Cần duyệt tuần tự qua từng phần tử
  - Bài toán không có cấu trúc tuyến tính

---

## 🔄 Các biến thể / Variations

### 1. Left-Right Pointers / Con trỏ trái-phải

Dùng để tìm cặp phần tử có tổng bằng target, hoặc kiểm tra palindrome.

```javascript
function twoSum(nums, target) {
  let left = 0,
    right = nums.length - 1;

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

  return null;
}

// Time: O(n), Space: O(1)
```

### 2. Fast-Slow Pointers / Con trỏ nhanh-chậm

Dùng để tìm vị trí giữa của Linked List hoặc detect cycle.

```javascript
function findMiddle(head) {
  let slow = head,
    fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return slow; // Cycle detected
    }
  }

  return slow; // Middle node
}

// Time: O(n), Space: O(1)
```

### 3. Sliding Window / Cửa sổ trượt

Dùng hai con trỏ để tạo cửa sổ trượt trên mảng/chuỗi.

```javascript
function maxSubarraySum(nums, k) {
  let maxSum = 0,
    windowSum = 0;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    windowSum += nums[right];

    if (right - left + 1 > k) {
      windowSum -= nums[left];
      left++;
    }

    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

// Time: O(n), Space: O(1)
```

---

## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template

```javascript
/**
 * Two Pointers - Basic Template
 * @param {Array} arr - Input array
 * @return {*} - Result based on problem
 */
function twoPointersTemplate(arr) {
  let left = 0,
    right = arr.length - 1;

  while (left < right) {
    // Process based on pointers
    // ...

    // Move pointers
    left++;
    right--;
  }

  return result;
}
```

### Template nâng cao / Advanced Template

```javascript
/**
 * Two Pointers - Advanced Template with custom comparison
 * @param {Array} arr - Input array
 * @param {Function} shouldMove - Custom move function
 * @return {*} - Result based on problem
 */
function twoPointersAdvanced(arr, shouldMove) {
  let left = 0,
    right = arr.length - 1;

  while (left < right) {
    // Check condition
    if (shouldMove(arr, left, right)) {
      left++;
    } else {
      right--;
    }
  }

  return result;
}
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1: Two Sum / Tổng hai số

**Mô tả:** Tìm hai số có tổng bằng target.

**Code:**

```javascript
function twoSum(nums, target) {
  let left = 0,
    right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) {
      return [nums[left], nums[right]];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}

// twoSum([2,7,11,15], 9) = [2,7]
// Time: O(n), Space: O(1)
```

### Ví dụ 2: Container With Most Water / Nước mưa

**Mô tả:** Tính lượng nước mưa có thể thu.

**Code:**

```javascript
function maxArea(height) {
  let left = 0,
    right = height.length - 1;
  let maxArea = 0;
  let leftMax = 0,
    rightMax = 0;

  while (left < right) {
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);

    const area = Math.min(leftMax, rightMax) * (right - left);
    maxArea = Math.max(maxArea, area);

    left++;
    right--;
  }

  return maxArea;
}

// maxArea([1,8,6,2,5,4,8,3,7]) = 49
// Time: O(n), Space: O(1)
```

### Ví dụ 3: Remove Nth Node From End / Xóa nút thứ n từ cuối

**Mô tả:** Xóa nút thứ n từ cuối Linked List.

**Code:**

```javascript
function removeNthFromEnd(head, n) {
  let dummy = new ListNode(0);
  dummy.next = head;

  let fast = dummy,
    slow = dummy;

  // Move fast n steps ahead
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }

  // Move both until fast reaches end
  while (fast.next) {
    slow = slow.next;
    fast = fast.next;
  }

  // Remove the node after slow
  slow.next = slow.next.next;

  return dummy.next;
}

// Time: O(n), Space: O(1)
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [`../problems/easy/011-container-with-most-water.md`](../problems/easy/011-container-with-most-water.md)
- [`../problems/hard/042-trapping-rain-water.md`](../problems/hard/042-trapping-rain-water.md)
- [`../problems/medium/015-3sum.md`](../problems/medium/015-3sum.md)
- [`../problems/medium/016-3sum-closest.md`](../problems/medium/016-3sum-closest.md)

---

## 📊 Độ phức tạp / Complexity

| Loại / Type    | Time | Space | Mô tả / Description    |
| -------------- | ---- | ----- | ---------------------- |
| Left-Right     | O(n) | O(1)  | Tìm cặp, palindrome    |
| Fast-Slow      | O(n) | O(1)  | Tìm giữa, detect cycle |
| Sliding Window | O(n) | O(1)  | Subarray, substring    |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Quên cập nhật cả hai con trỏ:** Chỉ cập nhật một con trỏ
2. **Sai điều kiện dừng:** left < right vs left <= right
3. **Integer overflow:** left + right có thể overflow
4. **Quên edge cases:** Mảng rỗng, 1 phần tử
5. **Sai hướng di chuyển:** Tăng thay vì giảm

---

## 💡 Tips & Tricks

- Luôn kiểm tra edge cases
- Vẽ hình để visualize movement của con trỏ
- Sử dụng while thay vì for khi cần điều kiện phức tạp
- Tên biến rõ ràng: left/right, slow/fast
- Kiểm tra điều kiện trước khi di chuyển con trỏ

---

## 📚 Tài liệu tham khảo / References

- [Two Pointers - Wikipedia](https://en.wikipedia.org/wiki/Two-pointer_technique)
- [Two Pointers - LeetCode](https://leetcode.com/tag/two-pointers/)
- [Two Pointers - GeeksforGeeks](https://www.geeksforgeeks.org/two-pointer-technique/)

---

_Last updated: 2026-02-03_
