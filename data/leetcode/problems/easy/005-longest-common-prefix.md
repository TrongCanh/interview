# Longest Common Prefix

> LeetCode Problem 14 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 14
- **URL:** https://leetcode.com/problems/longest-common-prefix/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** String
- **Tags:** String, Trie
- **Thuật toán liên quan / Related Algorithms:** String
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Write a function to find the longest common prefix string amongst an array of strings.
>
> If there is no common prefix, return an empty string `""`.

**Example 1:**

```
Input: strs = ["flower","flow","flight"]
Output: "fl"
```

**Example 2:**

```
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
```

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng các chuỗi `strs`
- **Output:** Chuỗi tiền tố chung dài nhất
- **Ràng buộc / Constraints:**
  - `1 <= strs.length <= 200`
  - `0 <= strs[i].length <= 200`
  - `strs[i]` chỉ chứa các chữ cái tiếng Anh viết thường
- **Edge cases:**
  - Mảng rỗng
  - Chỉ có 1 chuỗi
  - Không có tiền tố chung
  - Một chuỗi rỗng trong mảng

### 2. Tư duy / Thinking Process

- **Bước 1:** Tìm chuỗi ngắn nhất (đây là giới hạn trên của tiền tố chung)
- **Bước 2:** Duyệt qua từng ký tự của chuỗi ngắn nhất
- **Bước 3:** Kiểm tra xem tất cả các chuỗi khác có cùng ký tự tại vị trí đó không

### 3. Ví dụ minh họa / Examples

```
Example 1: strs = ["flower","flow","flight"]
Chuỗi ngắn nhất: "flow" (độ dài 4)

Duyệt qua từng vị trí:
- Vị trí 0: f, f, f → giống nhau → prefix = "f"
- Vị trí 1: l, l, l → giống nhau → prefix = "fl"
- Vị trí 2: o, o, i → KHÁC nhau → dừng

Output: "fl"
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

So sánh từng ký tự của chuỗi đầu tiên với tất cả các chuỗi khác tại cùng vị trí.

### Thuật toán / Algorithm

1. Nếu mảng rỗng, trả về ""
2. Lấy chuỗi đầu tiên làm chuỗi tham chiếu
3. Duyệt qua từng ký tự của chuỗi tham chiếu:
   - Kiểm tra xem tất cả các chuỗi khác có cùng ký tự tại vị trí đó không
   - Nếu có, thêm vào kết quả
   - Nếu không, dừng và trả về kết quả hiện tại

### Code / Implementation

```javascript
/**
 * Longest Common Prefix - Horizontal Scanning
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix_horizontal(strs) {
  if (strs.length === 0) return "";

  const firstStr = strs[0];

  for (let i = 0; i < firstStr.length; i++) {
    const char = firstStr[i];

    for (let j = 1; j < strs.length; j++) {
      if (i >= strs[j].length || strs[j][i] !== char) {
        return firstStr.substring(0, i);
      }
    }
  }

  return firstStr;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(S) - S là tổng số ký tự trong tất cả chuỗi
- **Space Complexity:** O(1) - Không dùng thêm không gian

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Tìm được kết quả ngay khi có sự khác biệt

### Nhược điểm / Cons

- Trong trường hợp xấu nhất, phải so sánh tất cả các ký tự

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp cơ bản đã khá tốt
- Điểm yếu của giải pháp 1? Trong trường hợp xấu nhất, phải so sánh nhiều lần
- Cách tiếp cận mới? Dùng Vertical Scanning hoặc Divide and Conquer

### Ý tưởng / Idea

Dùng Vertical Scanning: so sánh từng cột (vị trí ký tự) thay vì từng hàng (chuỗi).

### Code / Implementation

```javascript
/**
 * Longest Common Prefix - Vertical Scanning
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix_vertical(strs) {
  if (strs.length === 0) return "";

  for (let i = 0; i < strs[0].length; i++) {
    const char = strs[0][i];

    for (let j = 1; j < strs.length; j++) {
      if (i === strs[j].length || strs[j][i] !== char) {
        return strs[0].substring(0, i);
      }
    }
  }

  return strs[0];
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(S) - S là tổng số ký tự trong tất cả chuỗi
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Tương tự Horizontal Scanning
- Có thể tốt hơn trong một số trường hợp

### Nhược điểm / Cons

- Không có cải thiện đáng kể về độ phức tạp

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có, dùng Divide and Conquer hoặc Binary Search
- Có thuật toán/pattern nào phù hợp hơn? Divide and Conquer, Binary Search

### Ý tưởng / Idea

Dùng Divide and Conquer: chia mảng thành 2 phần, tìm LCP của mỗi phần, sau đó merge kết quả.

### Code / Implementation

```javascript
/**
 * Longest Common Prefix - Divide and Conquer
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix_divide(strs) {
  if (strs.length === 0) return "";

  const commonPrefix = (left, right) => {
    const minLen = Math.min(left.length, right.length);
    for (let i = 0; i < minLen; i++) {
      if (left[i] !== right[i]) {
        return left.substring(0, i);
      }
    }
    return left.substring(0, minLen);
  };

  const divide = (l, r) => {
    if (l === r) return strs[l];

    const mid = Math.floor((l + r) / 2);
    const leftLCP = divide(l, mid);
    const rightLCP = divide(mid + 1, r);

    return commonPrefix(leftLCP, rightLCP);
  };

  return divide(0, strs.length - 1);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(S \* log m) - S là tổng số ký tự, m là số chuỗi
- **Space Complexity:** O(m \* log m) - Cho stack đệ quy

### Ưu điểm / Pros

- Có thể tốt hơn với mảng lớn
- Áp dụng được parallel processing

### Nhược điểm / Cons

- Phức tạp hơn
- Tốn thêm không gian cho stack đệ quy

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time          | Space         | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ------------- | ------------- | ------------------- | -------------------------- |
| Horizontal Scanning  | O(S)          | O(1)          | Dễ / Easy           | Mảng nhỏ, code đơn giản    |
| Vertical Scanning    | O(S)          | O(1)          | Dễ / Easy           | Chuỗi có độ dài tương đồng |
| Divide and Conquer   | O(S \* log m) | O(m \* log m) | Trung bình / Medium | Mảng lớn, cần tối ưu       |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
console.log(longestCommonPrefix_horizontal(["flower", "flow", "flight"])); // "fl"
console.log(longestCommonPrefix_vertical(["flower", "flow", "flight"])); // "fl"
console.log(longestCommonPrefix_divide(["flower", "flow", "flight"])); // "fl"
```

### Test Case 2: Không có tiền tố chung / No common prefix

```javascript
console.log(longestCommonPrefix_horizontal(["dog", "racecar", "car"])); // ""
console.log(longestCommonPrefix_vertical(["dog", "racecar", "car"])); // ""
console.log(longestCommonPrefix_divide(["dog", "racecar", "car"])); // ""
```

### Test Case 3: Một chuỗi / Single string

```javascript
console.log(longestCommonPrefix_horizontal(["hello"])); // "hello"
console.log(longestCommonPrefix_vertical(["hello"])); // "hello"
console.log(longestCommonPrefix_divide(["hello"])); // "hello"
```

### Test Case 4: Chuỗi rỗng trong mảng / Empty string in array

```javascript
console.log(longestCommonPrefix_horizontal(["", "abc", "def"])); // ""
console.log(longestCommonPrefix_vertical(["", "abc", "def"])); // ""
console.log(longestCommonPrefix_divide(["", "abc", "def"])); // ""
```

### Test Case 5: Tất cả chuỗi giống nhau / All strings same

```javascript
console.log(longestCommonPrefix_horizontal(["abc", "abc", "abc"])); // "abc"
console.log(longestCommonPrefix_vertical(["abc", "abc", "abc"])); // "abc"
console.log(longestCommonPrefix_divide(["abc", "abc", "abc"])); // "abc"
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **String:** [`../algorithms/data-structures/string.md`](../algorithms/data-structures/string.md)

---

## Tài liệu tham khảo / References

- [LeetCode - Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/)
- [Divide and Conquer - Wikipedia](https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm)

---

_Last updated: 2026-02-03_
