# Longest Substring Without Repeating Characters / Chuỗi Con Dài Nhất Không Có Ký Trùng

> LeetCode Problem 3 - Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 3
- **URL:** https://leetcode.com/problems/longest-substring-without-repeating-characters/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** String, Hash Table, Sliding Window
- **Tags:** string, hash-table, sliding-window
- **Thuật toán liên quan / Related Algorithms:** Hash Table, String
- **Patterns liên quan / Related Patterns:** Sliding Window

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Given a string `s`, find the length of the **longest** substring without repeating characters.

**Example 1:**

```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

**Example 2:**

```
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

**Example 3:**

```
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

**Constraints:**

- `0 <= s.length <= 5 * 10^4`
- `s` consists of English letters, digits, symbols and spaces.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Một chuỗi s có thể chứa các ký tự chữ cái, số, ký tự đặc biệt và khoảng trắng.
- **Output:** Độ dài của chuỗi con dài nhất không có ký tự nào lặp lại.
- **Ràng buộc / Constraints:**
  - Độ dài chuỗi: 0 đến 50,000
  - Chuỗi có thể chứa bất kỳ ký tự ASCII nào
- **Edge cases:**
  - Chuỗi rỗng: trả về 0
  - Chuỗi có tất cả ký tự giống nhau: trả về 1
  - Chuỗi không có ký tự trùng: trả về độ dài chuỗi

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu khái niệm "substring" vs "subsequence"
  - Substring: chuỗi con liên tiếp (ví dụ: "abc" trong "abcabcbb")
  - Subsequence: chuỗi con không nhất thiết liên tiếp (ví dụ: "ace" trong "abcde")
  - Bài toán yêu cầu substring, không phải subsequence

- **Bước 2:** Tư duy Brute Force
  - Kiểm tra tất cả các substring có thể
  - Với mỗi substring, kiểm tra xem có ký tự trùng không
  - Lưu độ dài của substring dài nhất không có ký tự trùng
  - Vấn đề: O(n³) - quá chậm với n = 50,000

- **Bước 3:** Tư duy Sliding Window
  - Dùng hai con trỏ left và right để định nghĩa window
  - Window [left, right] chứa substring hiện tại
  - Dùng hash table để lưu vị trí của từng ký tự
  - Khi gặp ký tự trùng, di chuyển left đến sau vị trí xuất hiện trước đó
  - Cập nhật độ dài tối đa

### 3. Ví dụ minh họa / Examples

```
Example 1: s = "abcabcbb"
Step by step:
- left=0, right=0: 'a' chưa có trong window, thêm vào, maxLen=1
- left=0, right=1: 'b' chưa có, thêm vào, maxLen=2
- left=0, right=2: 'c' chưa có, thêm vào, maxLen=3
- left=0, right=3: 'a' đã có tại index 0, di chuyển left=1, maxLen=3
- left=1, right=4: 'b' đã có tại index 1, di chuyển left=2, maxLen=3
- left=2, right=5: 'c' đã có tại index 2, di chuyển left=3, maxLen=3
- left=3, right=6: 'b' đã có tại index 4, di chuyển left=5, maxLen=3
- left=5, right=7: 'b' đã có tại index 6, di chuyển left=7, maxLen=3
Kết quả: 3

Example 2: s = "bbbbb"
- Tất cả ký tự đều là 'b', nên maxLen luôn = 1
Kết quả: 1

Example 3: s = "pwwkew"
- left=0, right=0: 'p' chưa có, maxLen=1
- left=0, right=1: 'w' chưa có, maxLen=2
- left=0, right=2: 'w' đã có tại index 1, left=2, maxLen=2
- left=2, right=3: 'k' chưa có, maxLen=2
- left=2, right=4: 'e' chưa có, maxLen=3
- left=2, right=5: 'w' đã có tại index 2, left=3, maxLen=3
Kết quả: 3
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Kiểm tra tất cả các substring có thể, với mỗi substring kiểm tra xem có ký tự trùng không.

### Thuật toán / Algorithm

1. Khởi tạo maxLen = 0
2. Với mỗi vị trí i từ 0 đến n-1:
   a. Với mỗi vị trí j từ i+1 đến n:
   b. Kiểm tra substring s[i:j] có ký tự trùng không
   c. Nếu không, cập nhật maxLen = max(maxLen, j-i)
3. Trả về maxLen

### Code / Implementation

```javascript
/**
 * @param {string} s
 * @return {number}
 */
function solution1_bruteForce(s) {
  const n = s.length;
  let maxLen = 0;

  // Kiểm tra tất cả các substring
  for (let i = 0; i < n; i++) {
    const seen = new Set();

    for (let j = i; j < n; j++) {
      const char = s[j];

      // Nếu ký tự đã xuất hiện trong substring hiện tại
      if (seen.has(char)) {
        break; // Dừng kiểm tra substring này
      }

      // Thêm ký tự vào set
      seen.add(char);

      // Cập nhật độ dài tối đa
      maxLen = Math.max(maxLen, j - i + 1);
    }
  }

  return maxLen;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) - với n là độ dài chuỗi
- **Space Complexity:** O(min(m, n)) - trong đó m là kích thước của bảng ký tự (128 cho ASCII)

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Code dễ đọc
- Không cần tư duy phức tạp

### Nhược điểm / Cons

- Quá chậm với chuỗi dài (n = 50,000)
- Time Limit Exceeded trên LeetCode
- Không tối ưu

---

## 🚀 Giải pháp 2: Sliding Window with Hash Map (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- **Tại sao cần cải tiến?** Giải pháp Brute Force quá chậm O(n²), không chấp nhận được với n = 50,000.
- **Điểm yếu của giải pháp 1?** Kiểm tra lại các ký tự đã xem xét nhiều lần.
- **Cách tiếp cận mới?** Sử dụng Sliding Window với Hash Map để theo dõi vị trí của từng ký tự, chỉ duyệt qua chuỗi một lần.

### Ý tưởng / Idea

Dùng hai con trỏ left và right để định nghĩa một window. Window này chứa substring hiện tại không có ký tự trùng. Dùng hash map để lưu vị trí cuối cùng của từng ký tự. Khi gặp ký tự trùng, di chuyển left đến sau vị trí xuất hiện trước đó của ký tự đó.

### Thuật toán / Algorithm

1. Khởi tạo left = 0, maxLen = 0
2. Khởi tạo charIndexMap = {} để lưu vị trí của từng ký tự
3. Duyệt right từ 0 đến n-1:
   a. Nếu s[right] đã trong map và vị trí >= left:
   - Di chuyển left = charIndexMap[s[right]] + 1
     b. Cập nhật charIndexMap[s[right]] = right
     c. Cập nhật maxLen = max(maxLen, right - left + 1)
4. Trả về maxLen

### Code / Implementation

```javascript
/**
 * @param {string} s
 * @return {number}
 */
function solution2_slidingWindow(s) {
  const n = s.length;
  let maxLen = 0;
  let left = 0;

  // Map lưu vị trí cuối cùng của từng ký tự
  const charIndexMap = {};

  for (let right = 0; right < n; right++) {
    const char = s[right];

    // Nếu ký tự đã xuất hiện trong window hiện tại
    if (char in charIndexMap && charIndexMap[char] >= left) {
      // Di chuyển left đến sau vị trí xuất hiện trước đó
      left = charIndexMap[char] + 1;
    }

    // Cập nhật vị trí của ký tự hiện tại
    charIndexMap[char] = right;

    // Cập nhật độ dài tối đa
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - mỗi ký tự được duyệt tối đa 2 lần (bởi left và right)
- **Space Complexity:** O(min(m, n)) - trong đó m là kích thước của bảng ký tự

### Ưu điểm / Pros

- Tối ưu về thời gian
- Chỉ duyệt qua chuỗi một lần
- Chấp nhận được trên LeetCode

### Nhược điểm / Cons

- Cần thêm không gian cho hash map
- Tư duy phức tạp hơn Brute Force

---

## ⚡ Giải pháp 3: Sliding Window with Set (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- **Có thể cải thiện thêm không?** Về mặt độ phức tạp, giải pháp 2 đã tối ưu. Tuy nhiên, có thể dùng Set thay vì Map để code gọn hơn.
- **Có thuật toán/pattern nào phù hợp hơn?** Sử dụng Set để theo dõi các ký tự trong window hiện tại.

### Ý tưởng / Idea

Dùng Set để lưu các ký tự trong window hiện tại. Khi gặp ký tự đã có trong Set, di chuyển left và xóa các ký tự khỏi Set cho đến khi không còn trùng.

### Thuật toán / Algorithm

1. Khởi tạo left = 0, maxLen = 0
2. Khởi tạo charSet = new Set()
3. Duyệt right từ 0 đến n-1:
   a. Trong khi s[right] đã trong charSet:
   - Xóa s[left] khỏi charSet
   - left++
     b. Thêm s[right] vào charSet
     c. Cập nhật maxLen = max(maxLen, right - left + 1)
4. Trả về maxLen

### Code / Implementation

```javascript
/**
 * @param {string} s
 * @return {number}
 */
function solution3_slidingWindowSet(s) {
  const n = s.length;
  let maxLen = 0;
  let left = 0;

  // Set lưu các ký tự trong window hiện tại
  const charSet = new Set();

  for (let right = 0; right < n; right++) {
    const char = s[right];

    // Nếu ký tự đã có trong window, thu hẹp window từ bên trái
    while (charSet.has(char)) {
      charSet.delete(s[left]);
      left++;
    }

    // Thêm ký tự mới vào window
    charSet.add(char);

    // Cập nhật độ dài tối đa
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - mỗi ký tự được thêm và xóa khỏi Set tối đa một lần
- **Space Complexity:** O(min(m, n)) - trong đó m là kích thước của bảng ký tự

### Ưu điểm / Pros

- Code gọn và dễ hiểu
- Không cần lưu vị trí của từng ký tự
- Hiệu suất tương đương giải pháp 2

### Nhược điểm / Cons

- Trong trường hợp xấu nhất (tất cả ký tự giống nhau), while loop chạy nhiều lần
- Tuy nhiên, tổng số lần chạy while loop không quá n, nên vẫn O(n)

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time  | Space       | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ----- | ----------- | ------------------- | -------------------------- |
| Brute Force          | O(n²) | O(min(m,n)) | Dễ / Easy           | Chuỗi ngắn, cần nhanh      |
| Sliding Window Map   | O(n)  | O(min(m,n)) | Trung bình / Medium | Tối ưu thời gian           |
| Sliding Window Set   | O(n)  | O(min(m,n)) | Trung bình / Medium | Code gọn, dễ hiểu          |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const s = "abcabcbb";
console.log(solution1_bruteForce(s)); // Expected: 3
console.log(solution2_slidingWindow(s)); // Expected: 3
console.log(solution3_slidingWindowSet(s)); // Expected: 3
```

### Test Case 2: Tất cả ký tự giống nhau

```javascript
const s = "bbbbb";
console.log(solution1_bruteForce(s)); // Expected: 1
console.log(solution2_slidingWindow(s)); // Expected: 1
console.log(solution3_slidingWindowSet(s)); // Expected: 1
```

### Test Case 3: Không có ký tự trùng

```javascript
const s = "pwwkew";
console.log(solution1_bruteForce(s)); // Expected: 3
console.log(solution2_slidingWindow(s)); // Expected: 3
console.log(solution3_slidingWindowSet(s)); // Expected: 3
```

### Test Case 4: Chuỗi rỗng

```javascript
const s = "";
console.log(solution1_bruteForce(s)); // Expected: 0
console.log(solution2_slidingWindow(s)); // Expected: 0
console.log(solution3_slidingWindowSet(s)); // Expected: 0
```

### Test Case 5: Chuỗi dài không có trùng

```javascript
const s = "abcdefghijklmnopqrstuvwxyz";
console.log(solution2_slidingWindow(s)); // Expected: 26
```

---

## 📚 Tài liệu tham khảo / References

- [Sliding Window Pattern](../../algorithms/patterns/sliding-window.md)
- [Hash Table](../../algorithms/data-structures/hash-table.md)
- [String](../../algorithms/data-structures/string.md)
- [LeetCode Discuss](https://leetcode.com/problems/longest-substring-without-repeating-characters/discuss/)
- [Video giải thích - NeetCode](https://www.youtube.com/watch?v=wiGpQwVHdE0)

---

## 💬 Lời khuyên / Tips

- **Tip 1:** Luôn nhớ kiểm tra điều kiện `charIndexMap[char] >= left` để đảm bảo ký tự trùng nằm trong window hiện tại
- **Tip 2:** Sử dụng Map khi cần biết vị trí chính xác, dùng Set khi chỉ cần biết sự tồn tại
- **Tip 3:** Sliding Window là pattern quan trọng cho các bài toán về substring/subarray
- **Lỗi thường gặp:** Quên cập nhật left khi gặp ký tự trùng, dẫn đến tính toán sai độ dài window

---

_Last updated: 2026-02-03_
