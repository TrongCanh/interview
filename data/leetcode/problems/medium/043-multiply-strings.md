# Multiply Strings / Nhân Chuỗi Số

> LeetCode Problem 43 - Medium

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 43
- **URL:** https://leetcode.com/problems/multiply-strings/
- **Độ khó / Difficulty:** Medium
- **Danh mục / Category:** String, Math
- **Tags:** String, Math, Simulation
- **Thuật toán liên quan / Related Algorithms:** Math, String
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Copy nguyên văn từ LeetCode

Given two non-negative integers `num1` and `num2` represented as strings, return the product of `num1` and `num2`, also represented as a string.

**Note:** You must not use any built-in BigInteger library or convert the inputs to integer directly.

**Example 1:**

```
Input: num1 = "2", num2 = "3"
Output: "6"
```

**Example 2:**

```
Input: num1 = "123", num2 = "456"
Output: "56088"
```

**Constraints:**

- `1 <= num1.length, num2.length <= 200`
- `num1` and `num2` consist of digits only.
- Both `num1` and `num2` do not contain any leading zero, except the number `0` itself.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Hai chuỗi đại diện cho số nguyên không âm
- **Output:** Chuỗi đại diện cho tích của hai số
- **Ràng buộc / Constraints:**
  - Độ dài chuỗi: 1 ≤ num1.length, num2.length ≤ 200
  - Chỉ chứa chữ số
  - Không có leading zero (trừ số 0)
  - Không được dùng BigInteger hoặc convert trực tiếp sang integer
- **Edge cases:**
  - Một trong hai chuỗi là "0"
  - Chuỗi có độ dài khác nhau
  - Kết quả có nhiều leading zeros

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần nhân hai số được biểu diễn dưới dạng chuỗi
- **Bước 2:** Nhận thấy có thể mô phỏng phép nhân tay (grade-school multiplication)
- **Bước 3:** Xác định cách lưu trữ kết quả trung gian và cộng chúng lại

### 3. Ví dụ minh họa / Examples

```
Example 1: num1 = "2", num2 = "3"
- 2 × 3 = 6
- Output: "6"

Example 2: num1 = "123", num2 = "456"
- 123 × 456 = 56088
- Output: "56088"
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Mô phỏng phép nhân tay: nhân từng chữ số của num2 với num1, sau đó cộng các kết quả lại.

### Thuật toán / Algorithm

1. Reverse cả hai chuỗi để dễ xử lý
2. Nhân từng chữ số của num2 với num1:
   - Nhân từng chữ số, cộng với carry
   - Lưu kết quả vào mảng
   - Thêm số 0 tương ứng vào cuối mảng
3. Cộng tất cả các kết quả trung gian
4. Reverse kết quả và loại bỏ leading zeros

### Code / Implementation

```javascript
function multiply_bruteForce(num1, num2) {
  // Nếu một trong hai là "0", kết quả là "0"
  if (num1 === "0" || num2 === "0") {
    return "0";
  }

  // Reverse cả hai chuỗi để dễ xử lý
  const n1 = num1.split("").reverse();
  const n2 = num2.split("").reverse();
  const results = [];

  // Nhân từng chữ số của num2 với num1
  for (let i = 0; i < n2.length; i++) {
    const digit2 = parseInt(n2[i]);
    const product = [];
    let carry = 0;

    // Thêm i số 0 vào đầu (sau khi reverse sẽ là cuối)
    for (let j = 0; j < i; j++) {
      product.push(0);
    }

    // Nhân từng chữ số của num1
    for (let j = 0; j < n1.length; j++) {
      const digit1 = parseInt(n1[j]);
      const mul = digit1 * digit2 + carry;
      product.push(mul % 10);
      carry = Math.floor(mul / 10);
    }

    // Thêm carry còn lại
    while (carry > 0) {
      product.push(carry % 10);
      carry = Math.floor(carry / 10);
    }

    results.push(product);
  }

  // Cộng tất cả các kết quả
  let sum = results[0];
  for (let i = 1; i < results.length; i++) {
    sum = addArrays(sum, results[i]);
  }

  // Reverse và loại bỏ leading zeros
  let result = sum.reverse().join("");
  result = result.replace(/^0+/, "") || "0";

  return result;
}

function addArrays(arr1, arr2) {
  const result = [];
  let carry = 0;
  let i = 0;

  while (i < arr1.length || i < arr2.length || carry > 0) {
    const digit1 = i < arr1.length ? arr1[i] : 0;
    const digit2 = i < arr2.length ? arr2[i] : 0;
    const sum = digit1 + digit2 + carry;
    result.push(sum % 10);
    carry = Math.floor(sum / 10);
    i++;
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n × m × (n + m)) - n, m là độ dài hai chuỗi
- **Space Complexity:** O(n × m) - lưu trữ kết quả trung gian

### Ưu điểm / Pros

- Dễ hiểu và implement
- Mô phỏng đúng cách nhân tay

### Nhược điểm / Cons

- Cần nhiều mảng trung gian
- Phải implement hàm cộng mảng riêng

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Có thể tối ưu bằng cách tính trực tiếp vị trí của từng chữ số kết quả
- Điểm yếu của giải pháp 1? Cần nhiều mảng trung gian và hàm cộng
- Cách tiếp cận mới? Dùng mảng kết quả trực tiếp, tính vị trí của từng chữ số

### Ý tưởng / Idea

Sử dụng mảng kết quả trực tiếp:

1. Tạo mảng kết quả có độ dài n + m (tối đa)
2. Nhân từng cặp chữ số, cộng vào vị trí tương ứng trong mảng kết quả
3. Xử lý carry
4. Loại bỏ leading zeros

### Thuật toán / Algorithm

1. Nếu một trong hai là "0", trả về "0"
2. Tạo mảng result có độ dài n + m
3. Duyệt từng chữ số của num1 (từ cuối):
   - Duyệt từng chữ số của num2 (từ cuối):
     - Tính tích của hai chữ số
     - Cộng vào vị trí tương ứng trong result
     - Xử lý carry
4. Reverse kết quả và loại bỏ leading zeros

### Code / Implementation

```javascript
function multiply_optimized(num1, num2) {
  // Nếu một trong hai là "0", kết quả là "0"
  if (num1 === "0" || num2 === "0") {
    return "0";
  }

  const n = num1.length;
  const m = num2.length;
  const result = new Array(n + m).fill(0);

  // Duyệt từ cuối chuỗi
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      const digit1 = parseInt(num1[i]);
      const digit2 = parseInt(num2[j]);

      // Vị trí của chữ số kết quả
      const pos1 = i + j;
      const pos2 = i + j + 1;

      // Tính tích và cộng với giá trị hiện tại
      const product = digit1 * digit2 + result[pos2];

      // Cập nhật giá trị tại pos2 và carry sang pos1
      result[pos2] = product % 10;
      result[pos1] += Math.floor(product / 10);
    }
  }

  // Loại bỏ leading zeros
  let resultStr = result.join("").replace(/^0+/, "");

  return resultStr || "0";
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n × m) - n, m là độ dài hai chuỗi
- **Space Complexity:** O(n + m) - mảng kết quả

### Ưu điểm / Pros

- Không cần mảng trung gian
- Không cần hàm cộng riêng
- Tối ưu về thời gian và bộ nhớ
- Đáp ứng yêu cầu bài toán

### Nhược điểm / Cons

- Logic tính vị trí cần hiểu rõ
- Cần xử lý carry cẩn thận

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp 2 đã là tối ưu
- Có thuật toán/pattern nào phù hợp hơn? Đây là thuật toán chuẩn cho bài toán này

### Ý tưởng / Idea

Giải pháp 2 đã là tối ưu. Tuy nhiên, có thể cải thiện code readability bằng cách tách logic thành các helper functions và thêm comments chi tiết.

### Thuật toán / Algorithm

Giống giải pháp 2 nhưng với code structure tốt hơn.

### Code / Implementation

```javascript
function multiply_advanced(num1, num2) {
  // Validate input
  if (!isValidInput(num1) || !isValidInput(num2)) {
    return "0";
  }

  // Edge case: một trong hai là "0"
  if (num1 === "0" || num2 === "0") {
    return "0";
  }

  const n = num1.length;
  const m = num2.length;
  const result = initializeResultArray(n + m);

  // Nhân từng cặp chữ số
  multiplyDigits(num1, num2, result);

  // Chuyển mảng kết quả thành chuỗi
  return formatResult(result);
}

/**
 * Kiểm tra input có hợp lệ không
 * @param {string} num - chuỗi số
 * @returns {boolean}
 */
function isValidInput(num) {
  return num && num.length > 0 && /^\d+$/.test(num);
}

/**
 * Khởi tạo mảng kết quả
 * @param {number} length - độ dài mảng
 * @returns {number[]}
 */
function initializeResultArray(length) {
  return new Array(length).fill(0);
}

/**
 * Nhân từng cặp chữ số và cập nhật mảng kết quả
 * @param {string} num1 - chuỗi số thứ nhất
 * @param {string} num2 - chuỗi số thứ hai
 * @param {number[]} result - mảng kết quả
 */
function multiplyDigits(num1, num2, result) {
  const n = num1.length;
  const m = num2.length;

  // Duyệt từ cuối chuỗi (từ chữ số có giá trị nhỏ nhất)
  for (let i = n - 1; i >= 0; i--) {
    const digit1 = getDigitValue(num1, i);

    for (let j = m - 1; j >= 0; j--) {
      const digit2 = getDigitValue(num2, j);

      // Tính vị trí của chữ số kết quả
      const positions = calculateResultPositions(i, j);

      // Cập nhật kết quả
      updateResult(result, positions, digit1, digit2);
    }
  }
}

/**
 * Lấy giá trị của chữ số tại vị trí
 * @param {string} num - chuỗi số
 * @param {number} index - vị trí
 * @returns {number}
 */
function getDigitValue(num, index) {
  return parseInt(num[index]);
}

/**
 * Tính vị trí của chữ số kết quả
 * @param {number} i - vị trí trong num1
 * @param {number} j - vị trí trong num2
 * @returns {object} - {pos1, pos2}
 */
function calculateResultPositions(i, j) {
  return {
    pos1: i + j, // Vị trí carry
    pos2: i + j + 1, // Vị trí chữ số
  };
}

/**
 * Cập nhật mảng kết quả
 * @param {number[]} result - mảng kết quả
 * @param {object} positions - vị trí {pos1, pos2}
 * @param {number} digit1 - chữ số thứ nhất
 * @param {number} digit2 - chữ số thứ hai
 */
function updateResult(result, positions, digit1, digit2) {
  const { pos1, pos2 } = positions;

  // Tính tích và cộng với giá trị hiện tại
  const product = digit1 * digit2 + result[pos2];

  // Cập nhật giá trị tại pos2 (chữ số)
  result[pos2] = product % 10;

  // Cộng carry vào pos1
  result[pos1] += Math.floor(product / 10);
}

/**
 * Format kết quả thành chuỗi
 * @param {number[]} result - mảng kết quả
 * @returns {string}
 */
function formatResult(result) {
  // Loại bỏ leading zeros
  let resultStr = result.join("").replace(/^0+/, "");

  // Nếu kết quả rỗng (tất cả là 0), trả về "0"
  return resultStr || "0";
}

/**
 * Hàm wrapper để dễ test
 * @param {string} num1 - chuỗi số thứ nhất
 * @param {string} num2 - chuỗi số thứ hai
 * @returns {string} - kết quả phép nhân
 */
function multiplyStrings(num1, num2) {
  return multiply_advanced(num1, num2);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n × m)
- **Space Complexity:** O(n + m)

### Ưu điểm / Pros

- Code rất dễ đọc và maintain
- Có JSDoc comments chi tiết
- Validate input
- Dễ test từng function riêng biệt
- Tối ưu về hiệu năng

### Nhược điểm / Cons

- Code dài hơn một chút
- Có nhiều function cần quản lý

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time         | Space  | Độ khó / Difficulty | Khi nào dùng / When to use      |
| -------------------- | ------------ | ------ | ------------------- | ------------------------------- |
| Brute Force          | O(n×m×(n+m)) | O(n×m) | Dễ / Easy           | Học tập, input nhỏ              |
| Optimized            | O(n×m)       | O(n+m) | Trung bình / Medium | Production, cần tối ưu          |
| Advanced             | O(n×m)       | O(n+m) | Trung bình / Medium | Production, cần maintainability |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
console.log(multiply_advanced("2", "3")); // Expected: "6"
console.log(multiply_advanced("123", "456")); // Expected: "56088"
console.log(multiply_advanced("0", "123")); // Expected: "0"
```

### Test Case 2: Edge case

```javascript
// Một trong hai là "0"
console.log(multiply_advanced("0", "0")); // Expected: "0"
console.log(multiply_advanced("123", "0")); // Expected: "0"

// Chuỗi có độ dài khác nhau
console.log(multiply_advanced("9", "99")); // Expected: "891"
console.log(multiply_advanced("99", "9")); // Expected: "891"

// Số lớn
console.log(multiply_advanced("123456789", "987654321")); // Expected: "121932631112635269"
```

### Test Case 3: Phức tạp / Complex

```javascript
// Chuỗi có độ dài tối đa
console.log(multiply_advanced("12345678901234567890", "98765432109876543210"));
// Expected: "1219326311370217952237463801111263526900"

// Kết quả có nhiều leading zeros
console.log(multiply_advanced("100", "100")); // Expected: "10000"

// Số có nhiều chữ số 9
console.log(multiply_advanced("999", "999")); // Expected: "998001"
```

---

## 📚 Tài liệu tham khảo / References

- [String](../../algorithms/data-structures/string.md)
- [Math](../../algorithms/algorithms/math.md)
- [LeetCode Discuss](https://leetcode.com/problems/multiply-strings/discuss/)

---

## 💬 Lời khuyên / Tips

- **Tip 1:** Luôn kiểm tra edge case khi một trong hai là "0"
- **Tip 2:** Vị trí của chữ số kết quả: pos1 = i + j (carry), pos2 = i + j + 1 (chữ số)
- **Tip 3:** Dùng mảng kết quả trực tiếp thay vì nhiều mảng trung gian
- **Tip 4:** Loại bỏ leading zeros trước khi trả về kết quả
- **Lỗi thường gặp và cách tránh:**
  - Quên kiểm tra edge case "0"
  - Sai vị trí khi tính kết quả
  - Quên xử lý carry
  - Không loại bỏ leading zeros
  - Dùng parseInt() để convert toàn bộ chuỗi (không được phép theo đề bài)

---

_Last updated: 2026-02-03_
