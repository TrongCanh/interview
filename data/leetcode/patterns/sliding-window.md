# Sliding Window Pattern / Pattern Cửa sổ trượt

> Giải thích và ví dụ về pattern Sliding Window / Sliding window pattern explanation and examples

---

## 📚 Khái niệm / Concept

**Sliding Window** là kỹ thuật duyệt một "cửa sổ" con của mảng/string với kích thước cố định hoặc thay đổi.

---

## 🎯 Khi nào dùng? / When to use?

- Tìm subarray/substring thỏa điều kiện
- Tính tổng/maximum/minimum của subarray
- Tìm longest/shortest substring với điều kiện
- Tìm số subarray thỏa điều kiện

---

## 🔄 Các biến thể / Variations

### 1. Fixed Size Window (Cửa sổ kích thước cố định)

- Kích thước cửa sổ là K
- Dùng cho: maximum sum subarray of size K

### 2. Dynamic Size Window (Cửa sổ kích thước thay đổi)

- Kích thước cửa sổ thay đổi theo điều kiện
- Dùng cho: longest substring without repeating characters

---

## 💡 Code Template / Mẫu Code

### Fixed Size Window

```javascript
function slidingWindowFixed(arr, k) {
  let windowSum = 0;
  let maxSum = 0;

  // Tính cửa sổ đầu tiên
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;

  // Trượt cửa sổ
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
```

### Dynamic Size Window

```javascript
function slidingWindowDynamic(s) {
  let left = 0;
  let maxLen = 0;
  const window = new Map();

  for (let right = 0; right < s.length; right++) {
    // Thêm phần tử mới vào cửa sổ
    window.set(s[right], (window.get(s[right]) || 0) + 1);

    // Thu hẹp cửa sổ nếu cần
    while (condition) {
      window.set(s[left], window.get(s[left]) - 1);
      if (window.get(s[left]) === 0) {
        window.delete(s[left]);
      }
      left++;
    }

    // Cập nhật kết quả
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

---

## 📝 Ví dụ bài toán / Example Problems

### 1. Maximum Sum Subarray of Size K

**URL:** https://leetcode.com/problems/maximum-sum-subarray-of-size-k/

**Approach:** Fixed size window, trượt cửa sổ qua mảng

```javascript
function maxSumSubarray(arr, k) {
  if (arr.length < k) return 0;

  let windowSum = 0;
  let maxSum = 0;

  // Tính cửa sổ đầu tiên
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;

  // Trượt cửa sổ
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
```

### 2. Longest Substring Without Repeating Characters

**URL:** https://leetcode.com/problems/longest-substring-without-repeating-characters/

**Approach:** Dynamic window, dùng hash map để theo dõi ký tự

```javascript
function lengthOfLongestSubstring(s) {
  let left = 0;
  let maxLen = 0;
  const charIndex = new Map();

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // Nếu ký tự đã trong cửa sổ, thu hẹp
    if (charIndex.has(char) && charIndex.get(char) >= left) {
      left = charIndex.get(char) + 1;
    }

    charIndex.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

### 3. Minimum Size Subarray Sum

**URL:** https://leetcode.com/problems/minimum-size-subarray-sum/

**Approach:** Dynamic window, thu hẹp khi sum >= target

```javascript
function minSubArrayLen(target, nums) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}
```

### 4. Longest Substring with At Most K Distinct Characters

**URL:** https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/

**Approach:** Dynamic window, dùng map để đếm ký tự

```javascript
function lengthOfLongestSubstringKDistinct(s, k) {
  if (k === 0) return 0;

  let left = 0;
  let maxLen = 0;
  const charCount = new Map();

  for (let right = 0; right < s.length; right++) {
    charCount.set(s[right], (charCount.get(s[right]) || 0) + 1);

    // Thu hẹp cửa sổ nếu quá K ký tự khác nhau
    while (charCount.size > k) {
      charCount.set(s[left], charCount.get(s[left]) - 1);
      if (charCount.get(s[left]) === 0) {
        charCount.delete(s[left]);
      }
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

---

## 🎯 Practice Problems / Bài tập

1. Maximum Sum Subarray of Size K (Easy)
2. Longest Substring Without Repeating Characters (Medium)
3. Minimum Size Subarray Sum (Medium)
4. Longest Substring with At Most K Distinct Characters (Medium)
5. Subarray Product Less Than K (Medium)
6. Minimum Window Substring (Hard)

---

## ⚠️ Common Pitfalls / Lỗi thường gặp

1. Quên cập nhật cửa sổ khi thêm phần tử mới
2. Sai điều kiện thu hẹp cửa sổ
3. Không xử lý edge cases (k = 0, mảng rỗng)
4. Quên reset map/set khi cần

---

## 📊 Complexity / Độ phức tạp

- **Time:** O(n) - mỗi phần tử được duyệt tối đa 2 lần
- **Space:** O(k) - k = kích thước cửa sổ hoặc số ký tự khác nhau

---

## 💡 Tips / Mẹo

1. Luôn xác định loại cửa sổ (fixed hay dynamic)
2. Vẽ cửa sổ trên giấy để hình dung
3. Xác định điều kiện để thu hẹp/mở rộng cửa sổ
4. Cập nhật kết quả sau mỗi bước

---

_Last updated: 2026-01-30_
