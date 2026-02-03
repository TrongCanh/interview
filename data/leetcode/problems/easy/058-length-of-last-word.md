# Length of Last Word / Độ dài của từ cuối cùng

> LeetCode 58 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 58
- **URL:** https://leetcode.com/problems/length-of-last-word/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** String
- **Tags:** String, Two Pointers
- **Thuật toán liên quan / Related Algorithms:** String, Two Pointers
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given a string `s` consisting of words and spaces, return the length of the **last** word in the string.

A word is a maximal substring consisting of non-space characters only.

**Example 1:**

```
Input: s = "Hello World"
Output: 5
Explanation: The last word is "World" with length 5.
```

**Example 2:**

```
Input: s = "   fly me   to   the moon  "
Output: 4
Explanation: The last word is "moon" with length 4.
```

**Example 3:**

```
Input: s = "luffy is still joyboy"
Output: 6
Explanation: The last word is "joyboy" with length 6.
```

**Constraints:**

- `1 <= s.length <= 10^4`
- `s` consists of only English letters and spaces `' '`.
- There will be at least one word in `s`.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Một chuỗi `s` chứa các từ và khoảng trắng
- **Output:** Độ dài của từ cuối cùng trong chuỗi
- **Ràng buộc / Constraints:**
  - Độ dài chuỗi từ 1 đến 10^4
  - Chỉ chứa chữ cái tiếng Anh và khoảng trắng
  - Luôn có ít nhất một từ trong chuỗi
- **Edge cases:**
  - Chuỗi có nhiều khoảng trắng ở cuối
  - Chuỗi có nhiều khoảng trắng giữa các từ
  - Chuỗi chỉ có một từ

### 2. Tư duy / Thinking Process

- Bước 1: Cần xác định từ cuối cùng trong chuỗi
- Bước 2: Từ cuối cùng là chuỗi ký tự không có khoảng trắng
- Bước 3: Có thể duyệt từ cuối chuỗi về đầu để tìm từ cuối cùng

### 3. Ví dụ minh họa / Examples

```
Example 1: "Hello World"
- Duyệt từ cuối: 'd', 'l', 'r', 'o', 'W' (5 ký tự) -> gặp khoảng trắng -> dừng
- Output: 5

Example 2: "   fly me   to   the moon  "
- Bỏ qua các khoảng trắng ở cuối: "   fly me   to   the moon"
- Duyệt từ cuối: 'n', 'o', 'o', 'm' (4 ký tự) -> gặp khoảng trắng -> dừng
- Output: 4
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Chuyển chuỗi thành mảng các từ bằng cách split theo khoảng trắng, sau đó trả về độ dài của từ cuối cùng.

### Thuật toán / Algorithm

1. Sử dụng `split()` để chia chuỗi thành mảng các từ
2. Lọc bỏ các chuỗi rỗng (khi có nhiều khoảng trắng liên tiếp)
3. Trả về độ dài của phần tử cuối cùng trong mảng

### Code / Implementation

```javascript
/**
 * Độ dài của từ cuối cùng - Giải pháp 1: Brute Force
 * @param {string} s - Chuỗi đầu vào
 * @return {number} - Độ dài của từ cuối cùng
 *
 * Time Complexity: O(n) - split và lọc mảng
 * Space Complexity: O(n) - tạo mảng mới
 */
function lengthOfLastWord_bruteForce(s) {
  // Chia chuỗi thành mảng các từ theo khoảng trắng
  const words = s.split(" ");

  // Lọc bỏ các chuỗi rỗng (do nhiều khoảng trắng liên tiếp)
  const nonEmptyWords = words.filter((word) => word.length > 0);

  // Trả về độ dài của từ cuối cùng
  return nonEmptyWords[nonEmptyWords.length - 1].length;
}

// Test
console.log(lengthOfLastWord_bruteForce("Hello World")); // 5
console.log(lengthOfLastWord_bruteForce("   fly me   to   the moon  ")); // 4
console.log(lengthOfLastWord_bruteForce("luffy is still joyboy")); // 6
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - split và filter mảng
- **Space Complexity:** O(n) - tạo mảng mới chứa các từ

### Ưu điểm / Pros

- Code đơn giản, dễ hiểu
- Sử dụng các built-in methods của JavaScript

### Nhược điểm / Cons

- Tốn thêm bộ nhớ để lưu mảng các từ
- Không tối ưu cho chuỗi rất lớn

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp 1 tốn bộ nhớ không cần thiết
- Điểm yếu của giải pháp 1? Tạo mảng mới chứa tất cả các từ
- Cách tiếp cận mới? Duyệt từ cuối chuỗi về đầu, chỉ đếm độ dài từ cuối cùng

### Ý tưởng / Idea

Duyệt từ cuối chuỗi về đầu, bỏ qua các khoảng trắng ở cuối, sau đó đếm số ký tự cho đến khi gặp khoảng trắng tiếp theo.

### Thuật toán / Algorithm

1. Khởi tạo con trỏ `i` tại vị trí cuối cùng của chuỗi
2. Bỏ qua các khoảng trắng ở cuối chuỗi
3. Đếm số ký tự cho đến khi gặp khoảng trắng hoặc đầu chuỗi
4. Trả về số lượng đã đếm

### Code / Implementation

```javascript
/**
 * Độ dài của từ cuối cùng - Giải pháp 2: Two Pointers (Optimized)
 * @param {string} s - Chuỗi đầu vào
 * @return {number} - Độ dài của từ cuối cùng
 *
 * Time Complexity: O(n) - duyệt chuỗi một lần
 * Space Complexity: O(1) - không dùng thêm bộ nhớ
 */
function lengthOfLastWord_twoPointers(s) {
  let i = s.length - 1;
  let length = 0;

  // Bỏ qua các khoảng trắng ở cuối chuỗi
  while (i >= 0 && s[i] === " ") {
    i--;
  }

  // Đếm số ký tự của từ cuối cùng
  while (i >= 0 && s[i] !== " ") {
    length++;
    i--;
  }

  return length;
}

// Test
console.log(lengthOfLastWord_twoPointers("Hello World")); // 5
console.log(lengthOfLastWord_twoPointers("   fly me   to   the moon  ")); // 4
console.log(lengthOfLastWord_twoPointers("luffy is still joyboy")); // 6
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt chuỗi một lần
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ

### Ưu điểm / Pros

- Không tốn thêm bộ nhớ
- Tối ưu cho chuỗi lớn
- Dừng ngay khi tìm được kết quả

### Nhược điểm / Cons

- Code phức tạp hơn một chút so với giải pháp 1

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp 2 đã tối ưu về time và space
- Có thuật toán/pattern nào phù hợp hơn? Không cần, Two Pointers là giải pháp tốt nhất

### Ý tưởng / Idea

Sử dụng Regular Expression để tìm từ cuối cùng và lấy độ dài của nó.

### Thuật toán / Algorithm

1. Sử dụng regex để match tất cả các từ (chuỗi không có khoảng trắng)
2. Lấy từ cuối cùng trong kết quả match
3. Trả về độ dài của từ đó

### Code / Implementation

```javascript
/**
 * Độ dài của từ cuối cùng - Giải pháp 3: Regex
 * @param {string} s - Chuỗi đầu vào
 * @return {number} - Độ dài của từ cuối cùng
 *
 * Time Complexity: O(n) - regex match
 * Space Complexity: O(n) - lưu kết quả match
 */
function lengthOfLastWord_regex(s) {
  // Match tất cả các từ (chuỗi không có khoảng trắng)
  const matches = s.match(/\S+/g);

  // Trả về độ dài của từ cuối cùng
  return matches[matches.length - 1].length;
}

// Test
console.log(lengthOfLastWord_regex("Hello World")); // 5
console.log(lengthOfLastWord_regex("   fly me   to   the moon  ")); // 4
console.log(lengthOfLastWord_regex("luffy is still joyboy")); // 6
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - regex match
- **Space Complexity:** O(n) - lưu kết quả match

### Ưu điểm / Pros

- Code ngắn gọn
- Sử dụng regex mạnh mẽ

### Nhược điểm / Cons

- Tốn bộ nhớ để lưu kết quả match
- Regex có thể khó hiểu với người mới

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use   |
| -------------------- | ---- | ----- | ------------------- | ---------------------------- |
| Brute Force          | O(n) | O(n)  | Dễ / Easy           | Code đơn giản, chuỗi nhỏ     |
| Two Pointers         | O(n) | O(1)  | Trung bình / Medium | Chuỗi lớn, cần tối ưu bộ nhớ |
| Regex                | O(n) | O(n)  | Trung bình / Medium | Thích regex, code ngắn gọn   |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const input1 = "Hello World";
const expected1 = 5;
console.log(`Input: "${input1}"`);
console.log(`Expected: ${expected1}`);
console.log(`Brute Force: ${lengthOfLastWord_bruteForce(input1)}`);
console.log(`Two Pointers: ${lengthOfLastWord_twoPointers(input1)}`);
console.log(`Regex: ${lengthOfLastWord_regex(input1)}`);
```

### Test Case 2: Nhiều khoảng trắng / Multiple Spaces

```javascript
const input2 = "   fly me   to   the moon  ";
const expected2 = 4;
console.log(`Input: "${input2}"`);
console.log(`Expected: ${expected2}`);
console.log(`Brute Force: ${lengthOfLastWord_bruteForce(input2)}`);
console.log(`Two Pointers: ${lengthOfLastWord_twoPointers(input2)}`);
console.log(`Regex: ${lengthOfLastWord_regex(input2)}`);
```

### Test Case 3: Một từ / Single Word

```javascript
const input3 = "luffy is still joyboy";
const expected3 = 6;
console.log(`Input: "${input3}"`);
console.log(`Expected: ${expected3}`);
console.log(`Brute Force: ${lengthOfLastWord_bruteForce(input3)}`);
console.log(`Two Pointers: ${lengthOfLastWord_twoPointers(input3)}`);
console.log(`Regex: ${lengthOfLastWord_regex(input3)}`);
```

### Test Case 4: Chỉ có một từ / Only One Word

```javascript
const input4 = "Hello";
const expected4 = 5;
console.log(`Input: "${input4}"`);
console.log(`Expected: ${expected4}`);
console.log(`Brute Force: ${lengthOfLastWord_bruteForce(input4)}`);
console.log(`Two Pointers: ${lengthOfLastWord_twoPointers(input4)}`);
console.log(`Regex: ${lengthOfLastWord_regex(input4)}`);
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **String:** [`../../algorithms/data-structures/string.md`](../../algorithms/data-structures/string.md)
- **Two Pointers:** [`../../algorithms/patterns/two-pointers.md`](../../algorithms/patterns/two-pointers.md)

---

## 💡 Tips & Tricks

1. **Two Pointers Pattern:** Khi cần tìm phần tử cuối cùng hoặc duyệt từ cuối về đầu, Two Pointers là pattern hữu ích
2. **Trim vs Bỏ qua khoảng trắng:** Có thể dùng `trim()` để bỏ khoảng trắng ở hai đầu, nhưng Two Pointers hiệu quả hơn
3. **Edge cases:** Luôn kiểm tra chuỗi rỗng hoặc chỉ có khoảng trắng

---

## 📚 Tài liệu tham khảo / References

- [LeetCode 58 - Length of Last Word](https://leetcode.com/problems/length-of-last-word/)
- [Two Pointers Pattern](https://leetcode.com/tag/two-pointers/)

---

_Last updated: 2025-02-03_
