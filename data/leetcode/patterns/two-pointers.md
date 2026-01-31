# Two Pointers Pattern / Pattern Hai Con Trỏ

> Giải thích và ví dụ về pattern Two Pointers / Two Pointers pattern explanation and examples

---

## 📚 Khái niệm / Concept

**Two Pointers** là kỹ thuật sử dụng 2 con trỏ để duyệt mảng hoặc linked list từ 2 hướng khác nhau.

---

## 🎯 Khi nào dùng? / When to use?

- Mảng đã sắp xếp
- Tìm cặp phần tử thỏa điều kiện
- Xóa phần tử trùng lặp
- Tìm palindrome
- Container problems

---

## 🔄 Các biến thể / Variations

### 1. Opposite Direction (Hai chiều)

- Một con trỏ bắt đầu từ đầu, một từ cuối
- Dùng cho sorted arrays, palindrome

### 2. Same Direction (Cùng chiều)

- Cả hai con trỏ đi cùng hướng
- Dùng cho sliding window, fast/slow pointers

---

## 💡 Code Template / Mẫu Code

### Opposite Direction

```javascript
function twoPointersOpposite(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // Logic xử lý
    if (condition) {
      left++;
    } else {
      right--;
    }
  }
}
```

### Same Direction

```javascript
function twoPointersSame(arr) {
  let slow = 0;
  let fast = 0;

  while (fast < arr.length) {
    // Logic xử lý
    if (condition) {
      slow++;
    }
    fast++;
  }
}
```

---

## 📝 Ví dụ bài toán / Example Problems

### 1. Two Sum II - Input Array Is Sorted

**URL:** https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/

**Approach:** Dùng 2 con trỏ từ hai đầu, di chuyển dựa trên tổng

```javascript
function twoSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
}
```

### 2. Valid Palindrome

**URL:** https://leetcode.com/problems/valid-palindrome/

**Approach:** Dùng 2 con trỏ từ hai đầu, bỏ qua non-alphanumeric

```javascript
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    while (left < right && !isAlphaNumeric(s[left])) left++;
    while (left < right && !isAlphaNumeric(s[right])) right--;

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

function isAlphaNumeric(c) {
  return /[a-z0-9]/i.test(c);
}
```

### 3. Container With Most Water

**URL:** https://leetcode.com/problems/container-with-most-water/

**Approach:** Dùng 2 con trỏ, di chuyển con trỏ có chiều cao nhỏ hơn

```javascript
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let max = 0;

  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    max = Math.max(max, width * h);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return max;
}
```

### 4. Remove Duplicates from Sorted Array

**URL:** https://leetcode.com/problems/remove-duplicates-from-sorted-array/

**Approach:** Fast pointer duyệt, slow pointer ghi kết quả

```javascript
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let slow = 0;

  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }

  return slow + 1;
}
```

---

## 🎯 Practice Problems / Bài tập

1. Two Sum II - Input Array Is Sorted (Easy)
2. Valid Palindrome (Easy)
3. Remove Duplicates from Sorted Array (Easy)
4. Container With Most Water (Medium)
5. 3Sum (Medium)
6. Trapping Rain Water (Hard)

---

## ⚠️ Common Pitfalls / Lỗi thường gặp

1. Quên cập nhật cả hai con trỏ
2. Sai điều kiện dừng vòng lặp
3. Không xử lý edge cases (mảng rỗng, 1 phần tử)
4. Sai so sánh (case-sensitive, type coercion)

---

## 📊 Complexity / Độ phức tạp

- **Time:** O(n) - duyệt mảng 1 lần
- **Space:** O(1) - không dùng thêm bộ nhớ

---

_Last updated: 2026-01-30_
