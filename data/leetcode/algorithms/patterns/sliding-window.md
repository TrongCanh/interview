# Sliding Window / Cửa sổ trượt

> Pattern Sliding Window - Giải thích chi tiết / Sliding Window Pattern - Detailed Explanation

---

## 📚 Khái niệm / Concept

**Sliding Window** (Cửa sổ trượt) là một kỹ thuật trong đó chúng ta duyệt qua một mảng hoặc chuỗi bằng cách duy trì một "window" (cửa sổ) có kích thước cố định hoặc thay đổi. Window trượt qua mảng để giải quyết bài toán liên quan đến một tập hợp con liên tiếp.

### Các khái niệm cơ bản / Basic Concepts

- **Window (Cửa sổ):** Một tập hợp con liên tiếp của mảng hoặc chuỗi
- **Window Size (Kích thước cửa sổ):** Số lượng phần tử trong window
- **Fixed Size Window (Cửa sổ kích thước cố định):** Window có kích thước không đổi
- **Variable Size Window (Cửa sổ kích thước biến đổi):** Window có kích thước thay đổi dựa trên điều kiện
- **Left Pointer (Con trỏ trái):** Vị trí bắt đầu của window
- **Right Pointer (Con trỏ phải):** Vị trí kết thúc của window

### Ví dụ thực tế / Real-world Examples

- **Maximum Sum Subarray of Size K:** Tìm tổng lớn nhất của mảng con có kích thước k
- **Longest Substring Without Repeating Characters:** Tìm chuỗi con dài nhất không có ký tự trùng
- **Longest Subarray with Sum <= K:** Tìm mảng con dài nhất có tổng <= k
- **Anagram Search:** Tìm tất cả các anagram của một chuỗi trong một chuỗi khác

---

## 🎯 Khi nào dùng? / When to use?

- **Bài toán liên quan đến mảng con hoặc chuỗi con**
- **Cần duyệt qua mảng một lần**
- **Cần tối ưu hiệu năng bằng cách tránh tính lại**
- **Bài toán có ràng buộc về kích thước hoặc tổng**

---

## 🔄 Các biến thể / Variations

### Fixed Size Window (Cửa sổ kích thước cố định)

Window có kích thước không đổi, trượt qua mảng.

### Variable Size Window (Cửa sổ kích thước biến đổi)

Window có kích thước thay đổi dựa trên điều kiện.

### Two Pointers Window

Sử dụng hai con trỏ để duy trì window.

---

## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template

```javascript
/**
 * Template Sliding Window cơ bản - Basic Sliding Window Template
 * @param {number[]} arr - Mảng đầu vào
 * @param {number} k - Kích thước window
 * @return {*} - Kết quả
 */
function slidingWindowBasic(arr, k) {
  const n = arr.length;

  // Khởi tạo kết quả
  let result = null;

  // Tính kết quả cho window đầu tiên
  for (let i = 0; i < k; i++) {
    // Tính kết quả cho window [0, k)
    // ...
  }

  // Trượt window qua mảng
  for (let i = k; i < n; i++) {
    // Loại bỏ phần tử cũ (arr[i - k])
    // Thêm phần tử mới (arr[i])
    // Cập nhật kết quả
    // ...
  }

  return result;
}
```

### Template nâng cao / Advanced Template

```javascript
/**
 * Template Sliding Window nâng cao - Advanced Sliding Window Template
 * Bao gồm variable size window và optimization
 * @param {number[]} arr - Mảng đầu vào
 * @return {*} - Kết quả
 */
function slidingWindowAdvanced(arr) {
  const n = arr.length;

  // Khởi tạo con trỏ
  let left = 0;
  let right = 0;

  // Khởi tạo kết quả
  let result = null;
  let currentSum = 0;

  // Trượt window qua mảng
  while (right < n) {
    // Thêm phần tử mới vào window
    currentSum += arr[right];

    // Kiểm tra điều kiện để điều chỉnh window
    while (conditionToShrinkWindow(currentSum, left, right)) {
      // Loại bỏ phần tử từ bên trái
      currentSum -= arr[left];
      left++;
    }

    // Cập nhật kết quả
    result = updateResult(result, currentSum, left, right);

    // Di chuyển con trỏ phải
    right++;
  }

  return result;
}
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1 / Example 1: Maximum Sum Subarray of Size K

**Mô tả:** Tìm tổng lớn nhất của mảng con có kích thước k.

**Code:**

```javascript
/**
 * Maximum Sum Subarray of Size K - Tổng lớn nhất của mảng con kích thước k
 * @param {number[]} arr - Mảng số nguyên
 * @param {number} k - Kích thước window
 * @return {number} - Tổng lớn nhất
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function maxSumSubarraySizeK(arr, k) {
  const n = arr.length;

  if (n < k) {
    return 0;
  }

  // Tính tổng cho window đầu tiên
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  let maxSum = windowSum;

  // Trượt window qua mảng
  for (let i = k; i < n; i++) {
    // Loại bỏ phần tử cũ, thêm phần tử mới
    windowSum += arr[i] - arr[i - k];

    // Cập nhật tổng lớn nhất
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

// Test
console.log(maxSumSubarraySizeK([2, 1, 5, 1, 3, 2], 3)); // 8 (5 + 1 + 2)
console.log(maxSumSubarraySizeK([2, 3, 4, 1, 5], 2)); // 7 (3 + 4)
```

### Ví dụ 2 / Example 2: Longest Substring Without Repeating Characters

**Mô tả:** Tìm chuỗi con dài nhất không có ký tự trùng.

**Code:**

```javascript
/**
 * Longest Substring Without Repeating Characters - Chuỗi con dài nhất không trùng
 * @param {string} s - Chuỗi đầu vào
 * @return {number} - Độ dài chuỗi con dài nhất
 *
 * Time Complexity: O(n)
 * Space Complexity: O(min(m, n)) - m là số ký tự khác nhau
 */
function lengthOfLongestSubstring(s) {
  const n = s.length;

  // Sử dụng Set để lưu các ký tự trong window hiện tại
  const charSet = new Set();

  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < n; right++) {
    // Nếu ký tự đã có trong window, thu hẹp window từ bên trái
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }

    // Thêm ký tự mới vào window
    charSet.add(s[right]);

    // Cập nhật độ dài lớn nhất
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

// Test
console.log(lengthOfLongestSubstring("abcabcbb")); // 3 ("abc")
console.log(lengthOfLongestSubstring("bbbbb")); // 1 ("b")
console.log(lengthOfLongestSubstring("pwwkew")); // 3 ("wke")
```

### Ví dụ 3 / Example 3: Longest Subarray with Sum <= K

**Mô tả:** Tìm mảng con dài nhất có tổng <= k.

**Code:**

```javascript
/**
 * Longest Subarray with Sum <= K - Mảng con dài nhất tổng <= k
 * @param {number[]} arr - Mảng số nguyên dương
 * @param {number} k - Tổng tối đa
 * @return {number} - Độ dài mảng con dài nhất
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function longestSubarraySumK(arr, k) {
  const n = arr.length;

  let left = 0;
  let right = 0;
  let currentSum = 0;
  let maxLength = 0;

  while (right < n) {
    // Thêm phần tử mới vào window
    currentSum += arr[right];

    // Thu hẹp window từ bên trái nếu tổng > k
    while (left <= right && currentSum > k) {
      currentSum -= arr[left];
      left++;
    }

    // Cập nhật độ dài lớn nhất
    if (currentSum <= k) {
      maxLength = Math.max(maxLength, right - left + 1);
    }

    // Di chuyển con trỏ phải
    right++;
  }

  return maxLength;
}

// Test
console.log(longestSubarraySumK([1, 2, 3, 4, 5], 11)); // 5 (1 + 2 + 3 + 4 - 5 = 5)
console.log(longestSubarraySumK([1, 2, 3], 4)); // 2 (1 + 2 = 3 <= 4)
```

### Ví dụ 4 / Example 4: Find All Anagrams in a String

**Mô tả:** Tìm tất cả các vị trí bắt đầu của anagram của p trong s.

**Code:**

```javascript
/**
 * Find All Anagrams - Tìm tất cả anagram
 * @param {string} s - Chuỗi cần tìm
 * @param {string} p - Chuỗi pattern
 * @return {number[]} - Các vị trí bắt đầu của anagram
 *
 * Time Complexity: O(n * m) - n là độ dài s, m là độ dài p
 * Space Complexity: O(1) hoặc O(m) - tùy implementation
 */
function findAnagrams(s, p) {
  const n = s.length;
  const m = p.length;

  if (m > n) {
    return [];
  }

  // Đếm ký tự trong p
  const pCount = {};
  for (const char of p) {
    pCount[char] = (pCount[char] || 0) + 1;
  }

  let required = m; // Số ký tự cần match
  const result = [];

  // Duyệt qua s với window kích thước m
  for (let i = 0; i < n; i++) {
    // Thêm ký tự mới vào window
    const char = s[i];
    if (char in pCount) {
      if (pCount[char] > 0) {
        required--;
      }
      pCount[char]--;
    }

    // Khi window đạt kích thước m
    if (i >= m - 1) {
      // Kiểm tra xem có match không
      if (required === 0) {
        result.push(i - m + 1);
      }

      // Loại bỏ ký tự cũ
      const oldChar = s[i - m + 1];
      if (oldChar in pCount) {
        if (pCount[oldChar] >= 0) {
          required++;
        }
        pCount[oldChar]++;
      }
    }
  }

  return result;
}

// Test
console.log(findAnagrams("cbaebabacd", "abc")); // [0, 6]
console.log(findAnagrams("abab", "ab")); // [0, 1, 2]
```

### Ví dụ 5 / Example 5: Minimum Size Subarray Sum >= Target

**Mô tả:** Tìm mảng con ngắn nhất có tổng >= target.

**Code:**

```javascript
/**
 * Minimum Size Subarray Sum >= Target - Mảng con ngắn nhất tổng >= target
 * @param {number[]} arr - Mảng số nguyên dương
 * @param {number} target - Tổng mục tiêu
 * @return {number} - Độ dài mảng con ngắn nhất
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function minSubarrayLength(arr, target) {
  const n = arr.length;

  let left = 0;
  let right = 0;
  let currentSum = 0;
  let minLength = Infinity;

  while (right < n) {
    // Thêm phần tử mới vào window
    currentSum += arr[right];

    // Thu hẹp window từ bên trái khi tổng >= target
    while (left <= right && currentSum >= target) {
      // Cập nhật độ dài ngắn nhất
      minLength = Math.min(minLength, right - left + 1);

      // Loại bỏ phần tử từ bên trái
      currentSum -= arr[left];
      left++;
    }

    // Di chuyển con trỏ phải
    right++;
  }

  return minLength === Infinity ? 0 : minLength;
}

// Test
console.log(minSubarrayLength([2, 3, 1, 2, 4, 3], 7)); // 2 (4 + 3 = 7)
console.log(minSubarrayLength([1, 1, 1, 1, 1, 1, 1], 11)); // 11
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/)
- [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)
- [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/)
- [Longest Subarray with Sum at Most K](https://leetcode.com/problems/longest-subarray-with-sum-at-most-k/)

---

## 📊 So sánh với các kỹ thuật khác / Comparison with Other Techniques

| Kỹ thuật / Technique | Ưu điểm / Pros  | Nhược điểm / Cons              | Khi nào dùng / When to use |
| -------------------- | --------------- | ------------------------------ | -------------------------- |
| Sliding Window       | Tối ưu, O(n)    | Không áp dụng cho mọi bài toán | Mảng con, chuỗi con        |
| Two Pointers         | Đơn giản        | Không tối ưu cho mọi bài toán  | Mảng đã sắp xếp            |
| Brute Force          | Đơn giản        | Rất chậm                       | Mảng nhỏ, demo             |
| Dynamic Programming  | Tối ưu toàn cục | Khó implement                  | Bài toán phức tạp          |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Quên cập nhật window:** Khi trượt window, phải loại bỏ phần tử cũ và thêm phần tử mới
2. **Sai điều kiện thu hẹp:** Điều kiện để thu hẹp window phải đúng
3. **Không xử lý edge case:** Luôn kiểm tra edge cases như mảng rỗng
4. **Sai kích thước window:** Kích thước window phải đúng với bài toán
5. **Không tối ưu việc tính lại:** Sử dụng biến để lưu kết quả hiện tại, tránh tính lại

---

## 💡 Tips & Tricks

1. **Two Pointers:** Sử dụng hai con trỏ (left và right) để duy trì window
2. **Shrink Condition:** Xác định rõ ràng điều kiện để thu hẹp window
3. **Optimization:** Sử dụng biến để lưu kết quả hiện tại, tránh tính lại
4. **Edge Cases:** Luôn kiểm tra edge cases như mảng rỗng, k = 0
5. **Fixed vs Variable:** Xác định rõ ràng kích thước window là cố định hay biến đổi

---

## 📚 Tài liệu tham khảo / References

- [Sliding Window - GeeksforGeeks](https://www.geeksforgeeks.org/window-sliding-technique/)
- [Sliding Window - LeetCode](https://leetcode.com/tag/sliding-window/)

---

_Last updated: 2025-02-03_
