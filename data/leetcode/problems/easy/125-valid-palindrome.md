# Valid Palindrome

> LeetCode Problem 125 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 125
- **URL:** https://leetcode.com/problems/valid-palindrome/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** String, Two Pointers
- **Tags:** String, Two Pointers
- **Thuật toán liên quan / Related Algorithms:** String, Two Pointers
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.
>
> Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

**Example 1:**

```
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
```

**Example 2:**

```
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
```

**Example 3:**

```
Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
```

**Constraints:**

- `1 <= s.length <= 2 * 10^5`
- `s` consists only of printable ASCII characters.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Chuỗi s
- **Output:** Boolean - true nếu s là palindrome sau khi xử lý, false nếu không
- **Ràng buộc / Constraints:**
  - Chỉ xét alphanumeric characters (chữ cái và số)
  - Không phân biệt chữ hoa/thường
- **Edge cases:**
  - Chuỗi rỗng → true
  - Chuỗi chỉ có ký tự không alphanumeric → true
  - Chuỗi có khoảng trắng và ký tự đặc biệt

### 2. Tư duy / Thinking Process

- **Bước 1:** Xóa ký tự không alphanumeric và chuyển sang lowercase
- **Bước 2:** So sánh chuỗi với chuỗi đảo ngược
- **Bước 3:** Hoặc dùng Two Pointers để so sánh từ hai đầu

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: s = "A man, a plan, a canal: Panama"

Xử lý:
1. Chuyển sang lowercase: "a man, a plan, a canal: panama"
2. Xóa ký tự không alphanumeric: "amanaplanacanalpanama"
3. So sánh với đảo ngược: "amanaplanacanalpanama" === "amanaplanacanalpanama" ✓

Output: true
```

```
Example 2:
Input: s = "race a car"

Xử lý:
1. Chuyển sang lowercase: "race a car"
2. Xóa ký tự không alphanumeric: "raceacar"
3. So sánh với đảo ngược: "raceacar" !== "racaecar" ✗

Output: false
```

---

## 💡 Giải pháp 1: Reverse String (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Xóa ký tự không alphanumeric, chuyển sang lowercase, sau đó so sánh chuỗi với chuỗi đảo ngược.

### Thuật toán / Algorithm

1. Tạo cleanString bằng cách:
   - Chuyển s sang lowercase
   - Lọc chỉ alphanumeric characters
2. Tạo reversedString = cleanString đảo ngược
3. Trả về cleanString === reversedString

### Code / Implementation

```javascript
/**
 * Valid Palindrome - Reverse String Solution
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  // Xóa ký tự không alphanumeric và chuyển sang lowercase
  const cleanString = s.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Tạo chuỗi đảo ngược
  const reversedString = cleanString.split("").reverse().join("");

  // So sánh
  return cleanString === reversedString;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua chuỗi để làm sạch và đảo ngược
- **Space Complexity:** O(n) - Lưu cleanString và reversedString

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Code ngắn gọn

### Nhược điểm / Cons

- Tốn thêm bộ nhớ cho reversedString
- Tạo 2 chuỗi mới

---

## 🚀 Giải pháp 2: Two Pointers (Cải tiến) / Two Pointers Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp 1 tốn nhiều bộ nhớ
- Điểm yếu của giải pháp 1? Tạo reversedString, tốn O(n) space
- Cách tiếp cận mới? Dùng Two Pointers để so sánh trực tiếp

### Ý tưởng / Idea

Dùng 2 pointers: left từ đầu, right từ cuối. Di chuyển về phía nhau và so sánh từng cặp ký tự.

### Thuật toán / Algorithm

1. Khởi tạo left = 0, right = s.length - 1
2. Trong khi left < right:
   - Tìm ký tự alphanumeric tiếp theo từ trái
   - Tìm ký tự alphanumeric tiếp theo từ phải
   - Nếu left >= right, break
   - So sánh s[left].toLowerCase() và s[right].toLowerCase()
   - Nếu khác nhau, trả về false
   - left++, right--
3. Trả về true

### Code / Implementation

```javascript
/**
 * Valid Palindrome - Two Pointers Solution
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome_TwoPointers(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Tìm ký tự alphanumeric tiếp theo từ trái
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }

    // Tìm ký tự alphanumeric tiếp theo từ phải
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }

    // So sánh
    if (left < right) {
      if (s[left].toLowerCase() !== s[right].toLowerCase()) {
        return false;
      }
      left++;
      right--;
    }
  }

  return true;
}

/**
 * Kiểm tra ký tự có phải alphanumeric không
 * @param {string} c
 * @return {boolean}
 */
function isAlphanumeric(c) {
  return /^[a-z0-9]$/i.test(c);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Mỗi ký tự được duyệt tối đa 1 lần
- **Space Complexity:** O(1) - Chỉ dùng 2 pointers

### Ưu điểm / Pros

- Độ phức tạp thời gian O(n)
- Tiết kiệm bộ nhớ O(1)
- Không tạo chuỗi mới

### Nhược điểm / Cons

- Code phức tạp hơn một chút
- Cần hàm phụ trợ isAlphanumeric()

---

## ⚡ Giải pháp 3: Regex + Reverse (Nâng cao) / Regex + Reverse Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể tối ưu regex
- Có thuật toán/pattern nào phù hợp hơn? Dùng regex để làm sạch chuỗi

### Ý tưởng / Idea

Dùng regex để xóa ký tự không alphanumeric và chuyển sang lowercase, sau đó so sánh với đảo ngược.

### Thuật toán / Algorithm

1. Tạo cleanString = s.toLowerCase().replace(/[^a-z0-9]/g, '')
2. Tạo reversedString = [...cleanString].reverse().join('')
3. Trả về cleanString === reversedString

### Code / Implementation

```javascript
/**
 * Valid Palindrome - Regex + Reverse Solution
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome_Regex(s) {
  // Xóa ký tự không alphanumeric và chuyển sang lowercase
  const cleanString = s.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Tạo chuỗi đảo ngược dùng spread operator
  const reversedString = [...cleanString].reverse().join("");

  // So sánh
  return cleanString === reversedString;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua chuỗi để làm sạch và đảo ngược
- **Space Complexity:** O(n) - Lưu cleanString và reversedString

### Ưu điểm / Pros

- Code ngắn gọn
- Dùng spread operator thay vì split/join

### Nhược điểm / Cons

- Tốn thêm bộ nhớ cho reversedString
- Tạo 2 chuỗi mới

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---- | ----- | ------------------- | -------------------------- |
| Reverse String       | O(n) | O(n)  | Dễ / Easy           | Code ngắn, dễ hiểu         |
| Two Pointers         | O(n) | O(1)  | Trung bình / Medium | Tiết kiệm bộ nhớ, nên dùng |
| Regex + Reverse      | O(n) | O(n)  | Dễ / Easy           | Code ngắn gọn              |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const s = "A man, a plan, a canal: Panama";
console.log(isPalindrome(s)); // Expected: true
console.log(isPalindrome_TwoPointers(s)); // Expected: true
console.log(isPalindrome_Regex(s)); // Expected: true
```

### Test Case 2: Không phải palindrome / Not Palindrome

```javascript
const s = "race a car";
console.log(isPalindrome(s)); // Expected: false
console.log(isPalindrome_TwoPointers(s)); // Expected: false
console.log(isPalindrome_Regex(s)); // Expected: false
```

### Test Case 3: Chuỗi rỗng / Empty String

```javascript
const s = " ";
console.log(isPalindrome(s)); // Expected: true
console.log(isPalindrome_TwoPointers(s)); // Expected: true
console.log(isPalindrome_Regex(s)); // Expected: true
```

### Test Case 4: Có số và chữ cái / With Numbers

```javascript
const s = "0P";
console.log(isPalindrome(s)); // Expected: false
console.log(isPalindrome_TwoPointers(s)); // Expected: false
console.log(isPalindrome_Regex(s)); // Expected: false
```

### Test Case 5: Chỉ có ký tự đặc biệt / Only Special Characters

```javascript
const s = ".,!@#";
console.log(isPalindrome(s)); // Expected: true
console.log(isPalindrome_TwoPointers(s)); // Expected: true
console.log(isPalindrome_Regex(s)); // Expected: true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Cấu trúc dữ liệu liên quan:**
  - [String](../algorithms/data-structures/string.md)

- **Thuật toán liên quan:**
  - [Two Pointers](../algorithms/patterns/two-pointers.md)

---

## 💬 Lời khuyên / Tips

- **Two Pointers Approach:**
  - Tiết kiệm bộ nhớ O(1)
  - Không tạo chuỗi mới
- **Regex:**
  - `/[^a-z0-9]/g` để xóa ký tự không alphanumeric
  - `/i` flag để không phân biệt hoa thường
- **Lỗi thường gặp:**
  - Quên chuyển sang lowercase
  - Quên xóa ký tự không alphanumeric
  - Với two pointers, quên xử lý trường hợp left >= right
  - Sai regex pattern

---

_Last updated: 2026-02-03_
