# Add Binary / Cộng nhị phân

> LeetCode 67 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 67
- **URL:** https://leetcode.com/problems/add-binary/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** String, Math, Bit Manipulation
- **Tags:** String, Math, Bit Manipulation
- **Thuật toán liên quan / Related Algorithms:** String, Math
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given two binary strings `a` and `b`, return **their sum** as a binary string.

**Example 1:**

```
Input: a = "11", b = "1"
Output: "100"
Explanation: 11 (binary) + 1 (binary) = 100 (binary)
```

**Example 2:**

```
Input: a = "1010", b = "1011"
Output: "10101"
Explanation: 1010 (binary) + 1011 (binary) = 10101 (binary)
```

**Constraints:**

- `1 <= a.length, b.length <= 10^4`
- `a` and `b` consist only of `'0'` or `'1'` characters.
- Each string does not contain leading zeros except for the zero itself.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Hai chuỗi nhị phân `a` và `b`
- **Output:** Chuỗi nhị phân là tổng của `a` và `b`
- **Ràng buộc / Constraints:**
  - Độ dài mỗi chuỗi từ 1 đến 10^4
  - Chỉ chứa ký tự '0' hoặc '1'
  - Không có số 0 ở đầu (trừ chính số 0)
- **Edge cases:**
  - Hai chuỗi có độ dài khác nhau
  - Tổng có carry ở cuối: "1" + "1" = "10"
  - Chuỗi chỉ có "0": "0" + "0" = "0"

### 2. Tư duy / Thinking Process

- Bước 1: Cộng hai số nhị phân từ phải sang trái (tương tự cộng số thập phân)
- Bước 2: Xử lý carry khi tổng >= 2
- Bước 3: Nếu hai chuỗi có độ dài khác nhau, thêm số 0 vào chuỗi ngắn hơn
- Bước 4: Sau khi cộng hết, nếu còn carry, thêm vào kết quả

### 3. Ví dụ minh họa / Examples

```
Example 1: "11" + "1"
- Chuẩn hóa: "11" + "01"
- Cộng từ phải sang trái:
  - 1 + 1 = 10 -> viết 0, carry = 1
  - 1 + 0 + 1 = 10 -> viết 0, carry = 1
- Hết chuỗi, còn carry = 1 -> viết 1
- Kết quả: "100"

Example 2: "1010" + "1011"
- Cộng từ phải sang trái:
  - 0 + 1 = 1 -> viết 1, carry = 0
  - 1 + 1 = 10 -> viết 0, carry = 1
  - 0 + 0 + 1 = 1 -> viết 1, carry = 0
  - 1 + 1 = 10 -> viết 0, carry = 1
- Hết chuỗi, còn carry = 1 -> viết 1
- Kết quả: "10101"
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Chuyển hai chuỗi nhị phân thành số thập phân, cộng chúng, sau đó chuyển kết quả lại thành chuỗi nhị phân.

### Thuật toán / Algorithm

1. Chuyển chuỗi nhị phân `a` thành số thập phân
2. Chuyển chuỗi nhị phân `b` thành số thập phân
3. Cộng hai số thập phân
4. Chuyển kết quả thành chuỗi nhị phân

### Code / Implementation

```javascript
/**
 * Add Binary - Giải pháp 1: Chuyển đổi thập phân (Brute Force)
 * @param {string} a - Chuỗi nhị phân thứ nhất
 * @param {string} b - Chuỗi nhị phân thứ hai
 * @return {string} - Chuỗi nhị phân là tổng của a và b
 *
 * Time Complexity: O(n) - chuyển đổi và cộng
 * Space Complexity: O(n) - tạo chuỗi mới
 *
 * Lưu ý: Giải pháp này không hoạt động với số rất lớn
 */
function addBinary_bruteForce(a, b) {
  // Chuyển chuỗi nhị phân thành số thập phân
  const numA = parseInt(a, 2);
  const numB = parseInt(b, 2);

  // Cộng hai số
  const sum = numA + numB;

  // Chuyển kết quả thành chuỗi nhị phân
  return sum.toString(2);
}

// Test
console.log(addBinary_bruteForce("11", "1")); // "100"
console.log(addBinary_bruteForce("1010", "1011")); // "10101"
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - chuyển đổi và cộng
- **Space Complexity:** O(n) - tạo chuỗi mới

### Ưu điểm / Pros

- Code rất đơn giản
- Sử dụng built-in functions của JavaScript

### Nhược điểm / Cons

- **Không hoạt động với số rất lớn** (tràn số nguyên)
- Không tối ưu cho các bài toán về số lớn

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp 1 không hoạt động với số rất lớn
- Điểm yếu của giải pháp 1? Chuyển đổi sang số thập phân có thể gây tràn
- Cách tiếp cận mới? Duyệt từ phải sang trái, cộng từng bit với carry

### Ý tưởng / Idea

Duyệt từ phải sang trái của hai chuỗi, cộng từng bit với carry. Nếu tổng >= 2, viết tổng - 2 và set carry = 1. Ngược lại, viết tổng và set carry = 0.

### Thuật toán / Algorithm

1. Khởi tạo carry = 0, result = ""
2. Duyệt từ phải sang trái của cả hai chuỗi
3. Lấy bit hiện tại của mỗi chuỗi (hoặc 0 nếu đã hết chuỗi)
4. Tính tổng = bitA + bitB + carry
5. Nếu tổng >= 2, thêm (tổng - 2) vào đầu result, carry = 1
6. Ngược lại, thêm tổng vào đầu result, carry = 0
7. Sau khi duyệt hết, nếu còn carry, thêm vào đầu result
8. Trả về result

### Code / Implementation

```javascript
/**
 * Add Binary - Giải pháp 2: Duyệt từ phải sang trái (Optimized)
 * @param {string} a - Chuỗi nhị phân thứ nhất
 * @param {string} b - Chuỗi nhị phân thứ hai
 * @return {string} - Chuỗi nhị phân là tổng của a và b
 *
 * Time Complexity: O(max(n, m)) - n và m là độ dài của a và b
 * Space Complexity: O(max(n, m)) - kết quả có thể dài hơn một chút
 */
function addBinary_optimized(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  let result = "";

  while (i >= 0 || j >= 0 || carry > 0) {
    // Lấy bit hiện tại của mỗi chuỗi (hoặc 0 nếu đã hết)
    const bitA = i >= 0 ? parseInt(a[i]) : 0;
    const bitB = j >= 0 ? parseInt(b[j]) : 0;

    // Tính tổng
    const sum = bitA + bitB + carry;

    // Xử lý carry và kết quả
    if (sum >= 2) {
      result = sum - 2 + result;
      carry = 1;
    } else {
      result = sum + result;
      carry = 0;
    }

    i--;
    j--;
  }

  return result;
}

// Test
console.log(addBinary_optimized("11", "1")); // "100"
console.log(addBinary_optimized("1010", "1011")); // "10101"
console.log(addBinary_optimized("0", "0")); // "0"
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(max(n, m)) - n và m là độ dài của a và b
- **Space Complexity:** O(max(n, m)) - kết quả có thể dài hơn một chút

### Ưu điểm / Pros

- Hoạt động với số rất lớn
- Không cần chuyển đổi sang số thập phân
- Xử lý được hai chuỗi có độ dài khác nhau

### Nhược điểm / Cons

- Code phức tạp hơn một chút so với giải pháp 1

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp 2 đã tối ưu về time và space
- Có thuật toán/pattern nào phù hợp hơn? Bit Manipulation có thể được sử dụng

### Ý tưởng / Idea

Sử dụng Bit Manipulation để cộng hai số nhị phân. Sử dụng XOR để tính tổng không có carry, AND để tính carry, sau đó dịch trái carry và lặp lại cho đến khi carry = 0.

### Thuật toán / Algorithm

1. Chuyển chuỗi nhị phân thành số nguyên (BigInt để tránh tràn)
2. Sử dụng XOR để tính tổng không có carry
3. Sử dụng AND và dịch trái để tính carry
4. Lặp lại cho đến khi carry = 0
5. Chuyển kết quả thành chuỗi nhị phân

### Code / Implementation

```javascript
/**
 * Add Binary - Giải pháp 3: Bit Manipulation (Advanced)
 * @param {string} a - Chuỗi nhị phân thứ nhất
 * @param {string} b - Chuỗi nhị phân thứ hai
 * @return {string} - Chuỗi nhị phân là tổng của a và b
 *
 * Time Complexity: O(log(max(a, b))) - số lần lặp phụ thuộc vào số bit của carry
 * Space Complexity: O(n) - kết quả
 */
function addBinary_bitManipulation(a, b) {
  // Chuyển chuỗi nhị phân thành BigInt để tránh tràn
  let numA = BigInt("0b" + a);
  let numB = BigInt("0b" + b);

  // Sử dụng Bit Manipulation để cộng
  while (numB !== 0n) {
    const carry = (numA & numB) << 1n; // AND và dịch trái để tính carry
    numA = numA ^ numB; // XOR để tính tổng không có carry
    numB = carry;
  }

  // Chuyển kết quả thành chuỗi nhị phân
  return numA.toString(2);
}

// Test
console.log(addBinary_bitManipulation("11", "1")); // "100"
console.log(addBinary_bitManipulation("1010", "1011")); // "10101"
console.log(addBinary_bitManipulation("0", "0")); // "0"
console.log(addBinary_bitManipulation("1111111111111111111111111111111", "1")); // "10000000000000000000000000000000"
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log(max(a, b))) - số lần lặp phụ thuộc vào số bit của carry
- **Space Complexity:** O(n) - kết quả

### Ưu điểm / Pros

- Hoạt động với số rất lớn (sử dụng BigInt)
- Sử dụng Bit Manipulation - kỹ thuật quan trọng trong lập trình
- Code ngắn gọn

### Nhược điểm / Cons

- Cần hiểu về Bit Manipulation
- Chuyển đổi sang BigInt có thể tốn bộ nhớ

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution     | Time             | Space       | Độ khó / Difficulty | Khi nào dùng / When to use       |
| ------------------------ | ---------------- | ----------- | ------------------- | -------------------------------- |
| Brute Force              | O(n)             | O(n)        | Dễ / Easy           | Số nhỏ, demo nhanh               |
| Optimized (Two Pointers) | O(max(n,m))      | O(max(n,m)) | Trung bình / Medium | Số lớn, cần tối ưu               |
| Bit Manipulation         | O(log(max(a,b))) | O(n)        | Khó / Hard          | Học Bit Manipulation, số rất lớn |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const input1a = "11";
const input1b = "1";
const expected1 = "100";
console.log(`Input: ${input1a} + ${input1b}`);
console.log(`Expected: ${expected1}`);
console.log(`Optimized: ${addBinary_optimized(input1a, input1b)}`);
console.log(`Bit Manipulation: ${addBinary_bitManipulation(input1a, input1b)}`);
```

### Test Case 2: Chuỗi dài hơn / Longer Strings

```javascript
const input2a = "1010";
const input2b = "1011";
const expected2 = "10101";
console.log(`Input: ${input2a} + ${input2b}`);
console.log(`Expected: ${expected2}`);
console.log(`Optimized: ${addBinary_optimized(input2a, input2b)}`);
console.log(`Bit Manipulation: ${addBinary_bitManipulation(input2a, input2b)}`);
```

### Test Case 3: Hai số 0 / Two Zeros

```javascript
const input3a = "0";
const input3b = "0";
const expected3 = "0";
console.log(`Input: ${input3a} + ${input3b}`);
console.log(`Expected: ${expected3}`);
console.log(`Optimized: ${addBinary_optimized(input3a, input3b)}`);
console.log(`Bit Manipulation: ${addBinary_bitManipulation(input3a, input3b)}`);
```

### Test Case 4: Số rất lớn / Very Large Number

```javascript
const input4a = "1111111111111111111111111111111";
const input4b = "1";
const expected4 = "10000000000000000000000000000000";
console.log(`Input: ${input4a} + ${input4b}`);
console.log(`Expected: ${expected4}`);
console.log(`Optimized: ${addBinary_optimized(input4a, input4b)}`);
console.log(`Bit Manipulation: ${addBinary_bitManipulation(input4a, input4b)}`);
```

### Test Case 5: Độ dài khác nhau / Different Lengths

```javascript
const input5a = "1";
const input5b = "111";
const expected5 = "1000";
console.log(`Input: ${input5a} + ${input5b}`);
console.log(`Expected: ${expected5}`);
console.log(`Optimized: ${addBinary_optimized(input5a, input5b)}`);
console.log(`Bit Manipulation: ${addBinary_bitManipulation(input5a, input5b)}`);
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **String:** [`../../algorithms/data-structures/string.md`](../../algorithms/data-structures/string.md)
- **Math:** [`../../algorithms/algorithms/math.md`](../../algorithms/algorithms/math.md)
- **Two Pointers:** [`../../algorithms/patterns/two-pointers.md`](../../algorithms/patterns/two-pointers.md)

---

## 💡 Tips & Tricks

1. **Bit Manipulation:** XOR (^) để tính tổng không có carry, AND (&) và dịch trái (<<) để tính carry
2. **BigInt:** Khi làm việc với số rất lớn trong JavaScript, sử dụng BigInt thay vì Number
3. **Duyệt từ phải sang trái:** Khi cộng số, luôn duyệt từ phải sang trái (từ bit thấp nhất đến bit cao nhất)
4. **Xử lý carry:** Luôn nhớ xử lý carry khi tổng >= 2 (hệ nhị phân)

---

## 📚 Tài liệu tham khảo / References

- [LeetCode 67 - Add Binary](https://leetcode.com/problems/add-binary/)
- [Bitwise Operators - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)
- [BigInt - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

---

_Last updated: 2025-02-03_
