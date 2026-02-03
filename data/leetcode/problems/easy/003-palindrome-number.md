# Palindrome Number

> LeetCode Problem 9 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 9
- **URL:** https://leetcode.com/problems/palindrome-number/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Math
- **Tags:** Math, Two Pointers
- **Thuật toán liên quan / Related Algorithms:** None
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given an integer `x`, return `true` if `x` is a **palindrome**, and `false` otherwise.
>
> **Follow up:** Could you solve it without converting the integer to a string?

**Example 1:**

```
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
```

**Example 2:**

```
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
```

**Example 3:**

```
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
```

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Số nguyên `x`
- **Output:** `true` nếu là palindrome, `false` nếu không
- **Ràng buộc / Constraints:**
  - `-2^31 <= x <= 2^31 - 1`
  - Số âm không phải là palindrome (vì có dấu `-`)
  - Số kết thúc bằng 0 (trừ chính số 0) không phải là palindrome
- **Edge cases:**
  - Số âm
  - Số 0
  - Số kết thúc bằng 0
  - Số có 1 chữ số

### 2. Tư duy / Thinking Process

- **Bước 1:** Kiểm tra các trường hợp đặc biệt (số âm, kết thúc bằng 0)
- **Bước 2:** Đảo ngược số và so sánh với số gốc
- **Bước 3:** Hoặc dùng Two Pointers so sánh từ 2 đầu

### 3. Ví dụ minh họa / Examples

```
Example 1: x = 121
- 121 đọc từ trái sang phải: 1-2-1
- 121 đọc từ phải sang trái: 1-2-1
- Giống nhau → true

Example 2: x = -121
- Số âm → false (dấu - không thể ở cuối)

Example 3: x = 10
- Đảo ngược: 01 → 1
- 1 ≠ 10 → false
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Chuyển số thành chuỗi, đảo chuỗi, sau đó so sánh với chuỗi gốc.

### Thuật toán / Algorithm

1. Chuyển số thành chuỗi
2. Đảo ngược chuỗi
3. So sánh chuỗi gốc với chuỗi đã đảo
4. Trả về kết quả

### Code / Implementation

```javascript
/**
 * Palindrome Number - String Solution
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome_string(x) {
  if (x < 0) return false;

  const str = x.toString();
  const reversed = str.split("").reverse().join("");

  return str === reversed;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log n) - Số chữ số của x
- **Space Complexity:** O(log n) - Lưu trữ chuỗi

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Tận dụng các hàm built-in của JavaScript

### Nhược điểm / Cons

- Tốn thêm không gian cho chuỗi
- Không đáp ứng follow-up (không dùng chuỗi)

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Follow-up yêu cầu không dùng chuỗi
- Điểm yếu của giải pháp 1? Tốn không gian cho chuỗi
- Cách tiếp cận mới? Dùng toán học để đảo ngược một nửa số

### Ý tưởng / Idea

Đảo ngược một nửa số và so sánh với nửa còn lại. Điều này tránh việc tràn số và tối ưu hiệu năng.

### Thuật toán / Algorithm

1. Kiểm tra trường hợp đặc biệt:
   - Số âm → false
   - Số kết thúc bằng 0 (trừ 0) → false
2. Đảo ngược một nửa số:
   - Lặp khi `x > reversedNum`
   - Lấy chữ số cuối của x, thêm vào reversedNum
3. So sánh:
   - Nếu số chữ số chẵn: `x === reversedNum`
   - Nếu số chữ số lẻ: `x === Math.floor(reversedNum / 10)`

### Code / Implementation

```javascript
/**
 * Palindrome Number - Mathematical Solution (Half Reverse)
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome_math(x) {
  // Trường hợp đặc biệt
  if (x < 0) return false;
  if (x !== 0 && x % 10 === 0) return false;

  let reversedNum = 0;

  // Đảo ngược một nửa số
  while (x > reversedNum) {
    reversedNum = reversedNum * 10 + (x % 10);
    x = Math.floor(x / 10);
  }

  // So sánh nửa số còn lại với nửa đã đảo
  // Số chữ số chẵn: x === reversedNum
  // Số chữ số lẻ: x === Math.floor(reversedNum / 10)
  return x === reversedNum || x === Math.floor(reversedNum / 10);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log n) - Số chữ số của x
- **Space Complexity:** O(1) - Không dùng thêm không gian

### Ưu điểm / Pros

- Không dùng chuỗi (đáp ứng follow-up)
- Không tốn thêm không gian
- Tránh tràn số (chỉ đảo một nửa)

### Nhược điểm / Cons

- Cần hiểu về toán học đảo ngược số
- Logic hơi phức tạp hơn

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp Half Reverse đã là tối ưu
- Có thuật toán/pattern nào phù hợp hơn? Không có

### Ý tưởng / Idea

Giải pháp Half Reverse là tối ưu nhất. Tuy nhiên, có thể tối ưu code bằng cách:

- Dùng `Math.trunc()` thay vì `Math.floor()`
- Gộp điều kiện kiểm tra

### Code / Implementation

```javascript
/**
 * Palindrome Number - Optimized Mathematical Solution
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome_optimized(x) {
  // Số âm hoặc số kết thúc bằng 0 (trừ 0) không phải palindrome
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

  let reversed = 0;

  // Đảo ngược một nửa số
  while (x > reversed) {
    reversed = reversed * 10 + (x % 10);
    x = Math.trunc(x / 10);
  }

  // x có số chữ số bằng hoặc ít hơn reversed
  // Nếu số chữ số lẻ, chữ số giữa không ảnh hưởng
  return x === reversed || x === Math.trunc(reversed / 10);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log n)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code gọn hơn
- Hiệu quả nhất về cả thời gian và không gian
- Đáp ứng follow-up

### Nhược điểm / Cons

- Cần hiểu rõ về thuật toán

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution   | Time     | Space    | Độ khó / Difficulty | Khi nào dùng / When to use           |
| ---------------------- | -------- | -------- | ------------------- | ------------------------------------ |
| String                 | O(log n) | O(log n) | Dễ / Easy           | Code nhanh, không quan tâm follow-up |
| Half Reverse           | O(log n) | O(1)     | Trung bình / Medium | Cần đáp ứng follow-up                |
| Optimized Half Reverse | O(log n) | O(1)     | Trung bình / Medium | Cần tối ưu hiệu năng                 |

---

## 🧪 Test Cases

### Test Case 1: Palindrome cơ bản / Basic palindrome

```javascript
console.log(isPalindrome_string(121)); // true
console.log(isPalindrome_math(121)); // true
console.log(isPalindrome_optimized(121)); // true
```

### Test Case 2: Số âm / Negative number

```javascript
console.log(isPalindrome_string(-121)); // false
console.log(isPalindrome_math(-121)); // false
console.log(isPalindrome_optimized(-121)); // false
```

### Test Case 3: Số kết thúc bằng 0 / Number ending with 0

```javascript
console.log(isPalindrome_string(10)); // false
console.log(isPalindrome_math(10)); // false
console.log(isPalindrome_optimized(10)); // false
```

### Test Case 4: Số 0 / Zero

```javascript
console.log(isPalindrome_string(0)); // true
console.log(isPalindrome_math(0)); // true
console.log(isPalindrome_optimized(0)); // true
```

### Test Case 5: Số có 1 chữ số / Single digit

```javascript
console.log(isPalindrome_string(5)); // true
console.log(isPalindrome_math(5)); // true
console.log(isPalindrome_optimized(5)); // true
```

### Test Case 6: Số chữ số lẻ / Odd number of digits

```javascript
console.log(isPalindrome_string(12321)); // true
console.log(isPalindrome_math(12321)); // true
console.log(isPalindrome_optimized(12321)); // true
```

### Test Case 7: Số chữ số chẵn / Even number of digits

```javascript
console.log(isPalindrome_string(1221)); // true
console.log(isPalindrome_math(1221)); // true
console.log(isPalindrome_optimized(1221)); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Two Pointers:** [`../algorithms/patterns/two-pointers.md`](../algorithms/patterns/two-pointers.md)

---

## 📚 Tài liệu tham khảo / References

- [LeetCode - Palindrome Number](https://leetcode.com/problems/palindrome-number/)
- [Palindrome - Wikipedia](https://en.wikipedia.org/wiki/Palindrome)

---

_Last updated: 2026-02-03_
