# Longest Palindromic Substring / Chuỗi Palindrome Dài Nhất

> LeetCode Problem 5 - Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 5
- **URL:** https://leetcode.com/problems/longest-palindromic-substring/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** String, Dynamic Programming, Two Pointers
- **Tags:** string, dynamic-programming, two-pointers
- **Thuật toán liên quan / Related Algorithms:** String, Recursion
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Given a string `s`, return the longest palindromic substring in `s`.

**Example 1:**

```
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
```

**Example 2:**

```
Input: s = "cbbd"
Output: "bb"
```

**Constraints:**

- `1 <= s.length <= 1000`
- `s` consist of only digits and English letters.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Một chuỗi s có độ dài từ 1 đến 1000, chỉ chứa chữ cái và số.
- **Output:** Chuỗi con palindrome dài nhất trong s.
- **Ràng buộc / Constraints:**
  - Độ dài chuỗi: 1 đến 1000
  - Chỉ chứa chữ cái và số
- **Edge cases:**
  - Chuỗi có độ dài 1: trả về chính chuỗi đó
  - Tất cả ký tự giống nhau: trả về toàn bộ chuỗi
  - Không có palindrome dài hơn 1: trả về ký tự đầu tiên

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu khái niệm Palindrome
  - Palindrome là chuỗi đọc từ trái sang phải giống như từ phải sang trái
  - Ví dụ: "aba", "abba", "a", "aa"

- **Bước 2:** Tư duy Brute Force
  - Kiểm tra tất cả các substring có thể
  - Với mỗi substring, kiểm tra xem có phải palindrome không
  - Lưu substring palindrome dài nhất
  - Vấn đề: O(n³) - quá chậm với n = 1000

- **Bước 3:** Tư duy Expand Around Center
  - Mỗi palindrome có một "tâm" (center)
  - Với chuỗi độ dài lẻ: tâm là một ký tự (ví dụ: "aba", tâm là 'b')
  - Với chuỗi độ dài chẵn: tâm là giữa hai ký tự (ví dụ: "abba", tâm là giữa 'b' và 'b')
  - Từ mỗi tâm, mở rộng ra hai bên cho đến khi không còn palindrome
  - Có 2n-1 tâm có thể (n tâm lẻ + n-1 tâm chẵn)

- **Bước 4:** Tư duy Dynamic Programming
  - dp[i][j] = true nếu s[i:j] là palindrome
  - dp[i][j] = (s[i] == s[j]) && (j - i < 3 || dp[i+1][j-1])
  - j - i < 3 xử lý trường hợp cơ bản: độ dài 1, 2, 3

### 3. Ví dụ minh họa / Examples

```
Example 1: s = "babad"
Các tâm có thể:
- Tâm lẻ tại index 0 ('b'): mở rộng → "b" (độ dài 1)
- Tâm lẻ tại index 1 ('a'): mở rộng → "a" → "bab" → "x" (không còn) → "bab" (độ dài 3)
- Tâm lẻ tại index 2 ('b'): mở rộng → "b" → "aba" → "x" (không còn) → "aba" (độ dài 3)
- Tâm lẻ tại index 3 ('a'): mở rộng → "a" (độ dài 1)
- Tâm lẻ tại index 4 ('d'): mở rộng → "d" (độ dài 1)
- Tâm chẵn giữa (0,1): 'b' != 'a' → "" (độ dài 0)
- Tâm chẵn giữa (1,2): 'a' != 'b' → "" (độ dài 0)
- Tâm chẵn giữa (2,3): 'b' != 'a' → "" (độ dài 0)
- Tâm chẵn giữa (3,4): 'a' != 'd' → "" (độ dài 0)
Kết quả: "bab" hoặc "aba" (độ dài 3)

Example 2: s = "cbbd"
Các tâm có thể:
- Tâm chẵn giữa (1,2): 'b' == 'b' → "bb" → mở rộng: 'c' != 'd' → "bb" (độ dài 2)
Kết quả: "bb" (độ dài 2)
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Kiểm tra tất cả các substring có thể, với mỗi substring kiểm tra xem có phải palindrome không.

### Thuật toán / Algorithm

1. Khởi tạo longest = ""
2. Với mỗi vị trí i từ 0 đến n-1:
   a. Với mỗi vị trí j từ i+1 đến n:
   b. Nếu substring s[i:j] là palindrome và độ dài > longest: - Cập nhật longest = s[i:j]
3. Trả về longest

### Code / Implementation

```javascript
/**
 * @param {string} s
 * @return {string}
 */
function solution1_bruteForce(s) {
  const n = s.length;
  let longest = "";

  // Kiểm tra tất cả các substring
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j <= n; j++) {
      const substring = s.slice(i, j);

      // Kiểm tra xem substring có phải palindrome không
      if (isPalindrome(substring) && substring.length > longest.length) {
        longest = substring;
      }
    }
  }

  return longest;
}

/**
 * Kiểm tra xem chuỗi có phải palindrome không
 * @param {string} str
 * @return {boolean}
 */
function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n³) - O(n²) để duyệt tất cả substring, O(n) để kiểm tra palindrome
- **Space Complexity:** O(1) - không tính không gian cho kết quả

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Code dễ đọc
- Không cần tư duy phức tạp

### Nhược điểm / Cons

- Quá chậm với chuỗi dài
- Time Limit Exceeded trên LeetCode
- Không tối ưu

---

## 🚀 Giải pháp 2: Expand Around Center (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- **Tại sao cần cải tiến?** Giải pháp Brute Force quá chậm O(n³), không chấp nhận được với n = 1000.
- **Điểm yếu của giải pháp 1?** Kiểm tra lại các substring đã xem xét nhiều lần.
- **Cách tiếp cận mới?** Sử dụng kỹ thuật Expand Around Center - mở rộng từ tâm của palindrome.

### Ý tưởng / Idea

Mỗi palindrome có một tâm. Từ mỗi tâm, mở rộng ra hai bên cho đến khi không còn palindrome. Có 2n-1 tâm có thể (n tâm lẻ + n-1 tâm chẵn).

### Thuật toán / Algorithm

1. Khởi tạo longest = ""
2. Với mỗi vị trí i từ 0 đến n-1:
   a. Mở rộng từ tâm lẻ tại i: getPalindrome(s, i, i)
   b. Mở rộng từ tâm chẵn giữa i và i+1: getPalindrome(s, i, i+1)
   c. Cập nhật longest nếu palindrome tìm được dài hơn
3. Trả về longest

### Code / Implementation

```javascript
/**
 * @param {string} s
 * @return {string}
 */
function solution2_expandAroundCenter(s) {
  const n = s.length;
  let longest = "";

  // Mở rộng từ mỗi tâm có thể
  for (let i = 0; i < n; i++) {
    // Tâm lẻ: palindrome có độ dài lẻ (ví dụ: "aba")
    const oddPalindrome = expandAroundCenter(s, i, i);

    // Tâm chẵn: palindrome có độ dài chẵn (ví dụ: "abba")
    const evenPalindrome = expandAroundCenter(s, i, i + 1);

    // Cập nhật longest
    if (oddPalindrome.length > longest.length) {
      longest = oddPalindrome;
    }
    if (evenPalindrome.length > longest.length) {
      longest = evenPalindrome;
    }
  }

  return longest;
}

/**
 * Mở rộng từ tâm và trả về palindrome dài nhất
 * @param {string} s - Chuỗi đầu vào
 * @param {number} left - Vị trí trái
 * @param {number} right - Vị trí phải
 * @return {string} - Palindrome dài nhất từ tâm này
 */
function expandAroundCenter(s, left, right) {
  const n = s.length;

  // Mở rộng ra hai bên khi còn palindrome
  while (left >= 0 && right < n && s[left] === s[right]) {
    left--;
    right++;
  }

  // Trả về substring palindrome (left và right đã đi quá 1 bước)
  return s.slice(left + 1, right);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) - có 2n-1 tâm, mỗi tâm mở rộng tối đa n lần
- **Space Complexity:** O(1) - không tính không gian cho kết quả

### Ưu điểm / Pros

- Tối ưu về thời gian
- Chấp nhận được trên LeetCode
- Code gọn và dễ hiểu

### Nhược điểm / Cons

- Tư duy phức tạp hơn Brute Force
- Cần hiểu kỹ thuật Expand Around Center

---

## ⚡ Giải pháp 3: Dynamic Programming (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- **Có thể cải thiện thêm không?** Về mặt độ phức tạp thời gian, giải pháp 2 đã tối ưu O(n²). Tuy nhiên, Dynamic Programming là một cách tiếp cận khác.
- **Có thuật toán/pattern nào phù hợp hơn?** Dynamic Programming là pattern quan trọng cho các bài toán palindrome.

### Ý tưởng / Idea

Sử dụng DP để lưu kết quả: dp[i][j] = true nếu s[i:j] là palindrome. Công thức: dp[i][j] = (s[i] == s[j]) && (j - i < 3 || dp[i+1][j-1]).

### Thuật toán / Algorithm

1. Khởi tạo dp là mảng 2D n x n với giá trị false
2. Khởi tạo start = 0, maxLen = 1
3. Với mỗi độ dài len từ 1 đến n:
   a. Với mỗi vị trí i từ 0 đến n-len:
   b. j = i + len - 1
   c. dp[i][j] = (s[i] == s[j]) && (len < 4 || dp[i+1][j-1])
   d. Nếu dp[i][j] và len > maxLen: cập nhật start = i, maxLen = len
4. Trả về s.slice(start, start + maxLen)

### Code / Implementation

```javascript
/**
 * @param {string} s
 * @return {string}
 */
function solution3_dynamicProgramming(s) {
  const n = s.length;

  // dp[i][j] = true nếu s[i:j] là palindrome
  const dp = Array.from({ length: n }, () => Array(n).fill(false));

  let start = 0;
  let maxLen = 1;

  // Tất cả substring độ dài 1 đều là palindrome
  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }

  // Kiểm tra substring độ dài 2
  for (let i = 0; i < n - 1; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      start = i;
      maxLen = 2;
    }
  }

  // Kiểm tra substring độ dài >= 3
  for (let len = 3; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;

      // dp[i][j] = true nếu:
      // 1. s[i] == s[j]
      // 2. substring bên trong (i+1, j-1) là palindrome
      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;

        // Cập nhật kết quả
        if (len > maxLen) {
          start = i;
          maxLen = len;
        }
      }
    }
  }

  return s.slice(start, start + maxLen);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) - duyệt tất cả các substring
- **Space Complexity:** O(n²) - cho mảng dp 2D

### Ưu điểm / Pros

- Tư duy DP rất quan trọng cho các bài toán tương tự
- Code rõ ràng, dễ hiểu
- Có thể mở rộng cho các bài toán phức tạp hơn

### Nhược điểm / Cons

- Tốn nhiều không gian O(n²)
- Không tối ưu hơn giải pháp 2 về mặt thời gian
- Code dài hơn

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time  | Space | Độ khó / Difficulty | Khi nào dùng / When to use     |
| -------------------- | ----- | ----- | ------------------- | ------------------------------ |
| Brute Force          | O(n³) | O(1)  | Dễ / Easy           | Chuỗi ngắn, cần nhanh          |
| Expand Around Center | O(n²) | O(1)  | Trung bình / Medium | Tối ưu thời gian và không gian |
| Dynamic Programming  | O(n²) | O(n²) | Khó / Hard          | Học DP, bài toán mở rộng       |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const s = "babad";
console.log(solution1_bruteForce(s)); // Expected: "bab" hoặc "aba"
console.log(solution2_expandAroundCenter(s)); // Expected: "bab" hoặc "aba"
console.log(solution3_dynamicProgramming(s)); // Expected: "bab" hoặc "aba"
```

### Test Case 2: Palindrome chẵn

```javascript
const s = "cbbd";
console.log(solution1_bruteForce(s)); // Expected: "bb"
console.log(solution2_expandAroundCenter(s)); // Expected: "bb"
console.log(solution3_dynamicProgramming(s)); // Expected: "bb"
```

### Test Case 3: Chuỗi dài 1

```javascript
const s = "a";
console.log(solution1_bruteForce(s)); // Expected: "a"
console.log(solution2_expandAroundCenter(s)); // Expected: "a"
console.log(solution3_dynamicProgramming(s)); // Expected: "a"
```

### Test Case 4: Tất cả ký tự giống nhau

```javascript
const s = "aaaaa";
console.log(solution1_bruteForce(s)); // Expected: "aaaaa"
console.log(solution2_expandAroundCenter(s)); // Expected: "aaaaa"
console.log(solution3_dynamicProgramming(s)); // Expected: "aaaaa"
```

### Test Case 5: Không có palindrome dài

```javascript
const s = "abcde";
console.log(solution2_expandAroundCenter(s)); // Expected: "a" hoặc bất kỳ ký tự nào
```

---

## 📚 Tài liệu tham khảo / References

- [Two Pointers](../../algorithms/patterns/two-pointers.md)
- [String](../../algorithms/data-structures/string.md)
- [Recursion](../../algorithms/algorithms/recursion.md)
- [LeetCode Discuss](https://leetcode.com/problems/longest-palindromic-substring/discuss/)
- [Video giải thích - NeetCode](https://www.youtube.com/watch?v=XYQecbcd6_c)

---

## 💬 Lời khuyên / Tips

- **Tip 1:** Expand Around Center là kỹ thuật quan trọng cho các bài toán palindrome
- **Tip 2:** Luôn nhớ có 2n-1 tâm (n tâm lẻ + n-1 tâm chẵn)
- **Tip 3:** Dynamic Programming là pattern quan trọng, hãy học kỹ
- **Lỗi thường gặp:** Quên xử lý trường hợp palindrome độ dài chẵn (tâm giữa hai ký tự)

---

_Last updated: 2026-02-03_
