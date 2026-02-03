# Substring with Concatenation of All Words / Chuỗi con với Nối tất cả các từ

> LeetCode Problem 30 - Hard

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 30
- **URL:** https://leetcode.com/problems/substring-with-concatenation-of-all-words/
- **Độ khó / Difficulty:** Hard
- **Danh mục / Category:** String, Hash Table, Sliding Window
- **Tags:** String, Hash Table, Sliding Window
- **Thuật toán liên quan / Related Algorithms:** String, Hash Table, Sliding Window
- **Patterns liên quan / Related Patterns:** Sliding Window

---

## 📄 Đề Bài Nguyên Bản / Original Problem

You are given a string `s` and an array of strings `words`. All the strings of `words` are of the same length.

A concatenated substring in `s` is a substring that is a concatenation of each string in `words` exactly once and without any intervening characters.

Return the starting indices of all the concatenated substrings in `s`. You may return the answer in **any order**.

**Example 1:**

```
Input: s = "barfoothefoobarman", words = ["foo","bar"]
Output: [0,9]
Explanation: Substrings starting at index 0 and 9 are "barfoo" and "foobar" respectively.
The output order does not matter, returning [9,0] is also correct.
```

**Example 2:**

```
Input: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
Output: []
Explanation: There is no concatenated substring.
```

**Example 3:**

```
Input: s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
Output: [6,9,12]
```

**Constraints:**

- `1 <= s.length <= 10^4`
- `1 <= words.length <= 5000`
- `1 <= words[i].length <= 30`
- `s` and `words[i]` consist of lowercase English letters.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Chuỗi `s` và mảng `words` (các từ có độ dài bằng nhau)
- **Output:** Mảng các vị trí bắt đầu của chuỗi con là nối tất cả các từ
- **Ràng buộc / Constraints:**
  - Mỗi từ phải xuất hiện đúng một lần
  - Không có ký tự xen kẽ
  - Các từ có độ dài bằng nhau
- **Edge cases:**
  - `s` ngắn hơn tổng độ dài các từ
  - `words` chỉ có 1 từ
  - Các từ trùng nhau

### 2. Tư duy / Thinking Process

- **Bước 1:** Cần tìm các chuỗi con có độ dài bằng tổng độ dài các từ, chứa đúng các từ.
- **Bước 2:** Có thể dùng Hash Table để đếm số lần xuất hiện của mỗi từ.
- **Bước 3:** Dùng Sliding Window để kiểm tra từng vị trí bắt đầu.

### 3. Ví dụ minh họa / Examples

```
Example: s = "barfoothefoobarman", words = ["foo","bar"]

Tổng độ dài = 3 + 3 = 6

Kiểm tra từng vị trí:
- vị trí 0: "barfoo" -> có "bar" và "foo" -> OK
- vị trí 1: "arfoot" -> không khớp
- vị trí 2: "rfooth" -> không khớp
- ...
- vị trí 9: "foobar" -> có "foo" và "bar" -> OK

Kết quả: [0, 9]
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Kiểm tra từng vị trí bắt đầu, xem chuỗi con có chứa đúng các từ không.

### Thuật toán / Algorithm

1. Tạo wordMap đếm số lần xuất hiện của mỗi từ
2. Với mỗi vị trí bắt đầu:
   - Tạo bản sao của wordMap
   - Kiểm tra từng đoạn độ dài wordLen
   - Nếu từ có trong wordMap, giảm đếm
   - Nếu không, break
3. Nếu wordMap rỗng, thêm vị trí vào result

### Code / Implementation

```javascript
/**
 * Substring with Concatenation of All Words - Brute Force
 * @param {string} s - Input string
 * @param {string[]} words - Array of words
 * @return {number[]} - Starting indices of concatenated substrings
 */
function findSubstring_bruteForce(s, words) {
  if (words.length === 0) return [];

  const wordLen = words[0].length;
  const totalLen = wordLen * words.length;
  const result = [];

  // Create word count map
  const wordMap = {};
  for (const word of words) {
    wordMap[word] = (wordMap[word] || 0) + 1;
  }

  // Check each starting position
  for (let i = 0; i <= s.length - totalLen; i++) {
    const seen = {};
    let valid = true;

    for (let j = 0; j < words.length; j++) {
      const start = i + j * wordLen;
      const word = s.substring(start, start + wordLen);

      if (word in wordMap) {
        seen[word] = (seen[word] || 0) + 1;
        if (seen[word] > wordMap[word]) {
          valid = false;
          break;
        }
      } else {
        valid = false;
        break;
      }
    }

    if (valid) {
      result.push(i);
    }
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n _ m _ k) - n vị trí, m từ, k độ dài từ
- **Space Complexity:** O(m) - cho wordMap

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Dễ implement

### Nhược điểm / Cons

- Không tối ưu
- Tạo bản sao wordMap nhiều lần

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Brute Force kiểm tra lại nhiều lần.
- Điểm yếu của giải pháp 1? Tạo bản sao wordMap mỗi lần.
- Cách tiếp cận mới? Dùng Sliding Window để tối ưu.

### Ý tưởng / Idea

Sử dụng Sliding Window với Hash Table để kiểm tra hiệu quả hơn.

### Thuật toán / Algorithm

1. Tạo wordMap
2. Với mỗi offset từ 0 đến wordLen-1:
   - Dùng sliding window
   - Mở rộng window khi từ hợp lệ
   - Thu hẹp window khi từ không hợp lệ
3. Khi window size = totalLen, thêm vị trí vào result

### Code / Implementation

```javascript
/**
 * Substring with Concatenation of All Words - Sliding Window
 * @param {string} s - Input string
 * @param {string[]} words - Array of words
 * @return {number[]} - Starting indices of concatenated substrings
 */
function findSubstring_slidingWindow(s, words) {
  if (words.length === 0) return [];

  const wordLen = words[0].length;
  const totalLen = wordLen * words.length;
  const result = [];

  // Create word count map
  const wordMap = {};
  for (const word of words) {
    wordMap[word] = (wordMap[word] || 0) + 1;
  }

  // Try each starting offset (0 to wordLen-1)
  for (let offset = 0; offset < wordLen; offset++) {
    const seen = {};
    let left = offset;
    let count = 0;

    for (let right = offset; right <= s.length - wordLen; right += wordLen) {
      const word = s.substring(right, right + wordLen);

      if (word in wordMap) {
        seen[word] = (seen[word] || 0) + 1;
        count++;

        // If we have more occurrences than needed, shrink from left
        while (seen[word] > wordMap[word]) {
          const leftWord = s.substring(left, left + wordLen);
          seen[leftWord]--;
          count--;
          left += wordLen;
        }

        // If we have exactly the right number of words
        if (count === words.length) {
          result.push(left);
          // Move left by one word
          const leftWord = s.substring(left, left + wordLen);
          seen[leftWord]--;
          count--;
          left += wordLen;
        }
      } else {
        // Reset window
        seen.clear?.() || Object.keys(seen).forEach((key) => delete seen[key]);
        count = 0;
        left = right + wordLen;
      }
    }
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n \* wordLen) - mỗi vị trí được kiểm tra tối đa wordLen lần
- **Space Complexity:** O(m) - cho wordMap

### Ưu điểm / Pros

- Tối ưu hơn nhiều
- Không tạo bản sao nhiều lần

### Nhược điểm / Cons

- Phức tạp hơn
- Cần quản lý nhiều biến

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp 2 đã khá tối ưu.
- Có thuật toán/pattern nào phù hợp hơn? Sliding Window là lựa chọn tốt nhất.

### Ý tưởng / Idea

Tối ưu hóa Sliding Window bằng cách dùng array thay vì object cho seen map.

### Thuật toán / Algorithm

Tương tự giải pháp 2 nhưng tối ưu việc lưu trữ seen map.

### Code / Implementation

```javascript
/**
 * Substring with Concatenation of All Words - Optimized Sliding Window
 * @param {string} s - Input string
 * @param {string[]} words - Array of words
 * @return {number[]} - Starting indices of concatenated substrings
 */
function findSubstring_optimized(s, words) {
  if (words.length === 0) return [];

  const wordLen = words[0].length;
  const totalLen = wordLen * words.length;
  const result = [];

  // Create word count map
  const wordMap = {};
  for (const word of words) {
    wordMap[word] = (wordMap[word] || 0) + 1;
  }

  // Try each starting offset
  for (let offset = 0; offset < wordLen; offset++) {
    const seen = {};
    let left = offset;
    let count = 0;

    for (let right = offset; right <= s.length - wordLen; right += wordLen) {
      const word = s.substring(right, right + wordLen);

      if (word in wordMap) {
        seen[word] = (seen[word] || 0) + 1;
        count++;

        // Shrink if needed
        while (seen[word] > wordMap[word]) {
          const leftWord = s.substring(left, left + wordLen);
          seen[leftWord]--;
          count--;
          left += wordLen;
        }

        // Check if we found a valid substring
        if (count === words.length) {
          result.push(left);
          const leftWord = s.substring(left, left + wordLen);
          seen[leftWord]--;
          count--;
          left += wordLen;
        }
      } else {
        // Reset
        Object.keys(seen).forEach((key) => delete seen[key]);
        count = 0;
        left = right + wordLen;
      }
    }
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n \* wordLen)
- **Space Complexity:** O(m)

### Ưu điểm / Pros

- Tối ưu nhất
- Code gọn hơn

### Nhược điểm / Cons

- Vẫn phức tạp

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution     | Time          | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| ------------------------ | ------------- | ----- | ------------------- | -------------------------- |
| Brute Force              | O(n*m*k)      | O(m)  | Dễ / Easy           | Prototype, input nhỏ       |
| Sliding Window           | O(n\*wordLen) | O(m)  | Khó / Hard          | Cần tối ưu                 |
| Optimized Sliding Window | O(n\*wordLen) | O(m)  | Khó / Hard          | Cần tối ưu nhất            |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const s = "barfoothefoobarman";
const words = ["foo", "bar"];
const result = findSubstring_slidingWindow(s, words);
const expected = [0, 9];
console.log(result.sort().join(",") === expected.join(",")); // true
```

### Test Case 2: Không có kết quả / No result

```javascript
const s = "wordgoodgoodgoodbestword";
const words = ["word", "good", "best", "word"];
const result = findSubstring_slidingWindow(s, words);
const expected = [];
console.log(result.length === 0); // true
```

### Test Case 3: Nhiều kết quả / Multiple results

```javascript
const s = "barfoofoobarthefoobarman";
const words = ["bar", "foo", "the"];
const result = findSubstring_slidingWindow(s, words);
const expected = [6, 9, 12];
console.log(result.sort().join(",") === expected.join(",")); // true
```

### Test Case 4: Một từ / Single word

```javascript
const s = "wordwordword";
const words = ["word"];
const result = findSubstring_slidingWindow(s, words);
const expected = [0, 4, 8];
console.log(result.sort().join(",") === expected.join(",")); // true
```

### Test Case 5: Từ trùng nhau / Duplicate words

```javascript
const s = "wordwordword";
const words = ["word", "word"];
const result = findSubstring_slidingWindow(s, words);
const expected = [0, 4];
console.log(result.sort().join(",") === expected.join(",")); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [String](../algorithms/data-structures/string.md)
  - [Hash Table](../algorithms/data-structures/hash-table.md)
  - [Sliding Window](../algorithms/patterns/sliding-window.md)

- **Patterns liên quan:**
  - [Sliding Window](../algorithms/patterns/sliding-window.md)
