# Excel Sheet Column Title

> LeetCode Problem 168 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 168
- **URL:** https://leetcode.com/problems/excel-sheet-column-title/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** String, Math
- **Tags:** String, Math
- **Thuật toán liên quan / Related Algorithms:** String, Math
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given an integer `columnNumber`, return its corresponding column title as it appears in an Excel sheet.
>
> For example:
>
> ```
> A -> 1
> B -> 2
> C -> 3
> ...
> Z -> 26
> AA -> 27
> AB -> 28
> ...
> ```

**Example 1:**

```
Input: columnNumber = 1
Output: "A"
```

**Example 2:**

```
Input: columnNumber = 28
Output: "AB"
```

**Example 3:**

```
Input: columnNumber = 701
Output: "ZY"
```

**Constraints:**

- `1 <= columnNumber <= 2^31 - 1`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Số nguyên columnNumber
- **Output:** Chuỗi - tiêu đề cột Excel tương ứng
- **Ràng buộc / Constraints:**
  - A = 1, B = 2, ..., Z = 26
  - AA = 27, AB = 28, ...
- **Edge cases:**
  - columnNumber = 1 → "A"
  - columnNumber = 26 → "Z"
  - columnNumber = 27 → "AA"
  - columnNumber = 701 → "ZY"

### 2. Tư duy / Thinking Process

- **Bước 1:** Excel sử dụng 26 chữ cái (A-Z)
- **Bước 2:** Có thể coi như hệ cơ số 26
- **Bước 3:** Chia columnNumber cho 26 để tìm chữ cái, tiếp tục với phần dư

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: columnNumber = 1

Giải thích:
- 1 / 26 = 0 dư 1 → chữ cái thứ 1 là 'A'
Output: "A"
```

```
Example 2:
Input: columnNumber = 28

Giải thích:
- 28 / 26 = 1 dư 2
- 2 / 26 = 0 dư 2 → chữ cái thứ 2 là 'B'
Output: "AB"
```

```
Example 3:
Input: columnNumber = 701

Giải thích:
- 701 / 26 = 26 dư 25
- 26 / 26 = 1 dư 25 → chữ cái thứ 26 là 'Z'
- 25 / 26 = 0 dư 25 → chữ cái thứ 25 là 'Y'
Output: "ZY"
```

---

## 💡 Giải pháp 1: Iterative (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Chia columnNumber cho 26 liên tục để tìm từng chữ cái. Phần dư cho biết vị trí chữ cái trong bảng chữ cái.

### Thuật toán / Algorithm

1. Tạo result = ""
2. Trong khi columnNumber > 0:
   - columnNumber-- (để xử lý từ cuối về đầu)
   - remainder = columnNumber % 26
   - Nếu remainder === 0:
     - result = String.fromCharCode(65 + 25) + result (chữ 'Z')
   - Nếu không:
     - result = String.fromCharCode(65 + remainder - 1) + result
3. Trả về result

### Code / Implementation

```javascript
/**
 * Excel Sheet Column Title - Iterative Solution
 * @param {number} columnNumber
 * @return {string}
 */
function convertToTitle(columnNumber) {
  let result = "";

  while (columnNumber > 0) {
    columnNumber--;
    const remainder = columnNumber % 26;

    if (remainder === 0) {
      // Chữ cái 'Z' (ASCII 90)
      result = String.fromCharCode(90) + result;
    } else {
      // Chữ cái từ 'A' đến 'Y' (ASCII 65 đến 89)
      result = String.fromCharCode(65 + remainder - 1) + result;
    }

    columnNumber = Math.floor(columnNumber / 26);
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log n) - Chia cho 26 mỗi vòng lặp
- **Space Complexity:** O(log n) - Lưu result string

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Không cần cấu trúc dữ liệu phức tạp

### Nhược điểm / Cons

- Không có nhược điểm đáng kể

---

## 🚀 Giải pháp 2: Recursive (Cải tiến) / Recursive Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Có thể dùng đệ quy
- Điểm yếu của giải pháp 1? Không có điểm yếu
- Cách tiếp cận mới? Dùng đệ quy thay vì vòng lặp

### Ý tưởng / Idea

Dùng đệ quy để xử lý từng chữ cái. Tìm chữ cái hiện tại, sau đó đệ quy xử lý phần còn lại.

### Thuật toán / Algorithm

1. Định nghĩa hàm helper(n):
   - Nếu n === 0, trả về ""
   - remainder = n % 26
   - Nếu remainder === 0:
     - Trả về helper(n/26 - 1) + 'Z'
   - Nếu không:
     - Trả về helper(n/26) + String.fromCharCode(64 + remainder)
2. Trả về helper(columnNumber)

### Code / Implementation

```javascript
/**
 * Excel Sheet Column Title - Recursive Solution
 * @param {number} columnNumber
 * @return {string}
 */
function convertToTitle_Recursive(columnNumber) {
  function helper(n) {
    if (n === 0) {
      return "";
    }

    const remainder = n % 26;

    if (remainder === 0) {
      return helper(Math.floor(n / 26) - 1) + "Z";
    } else {
      return helper(Math.floor(n / 26)) + String.fromCharCode(64 + remainder);
    }
  }

  return helper(columnNumber);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log n) - Đệ quy chia cho 26 mỗi lần
- **Space Complexity:** O(log n) - Stack đệ quy + result string

### Ưu điểm / Pros

- Code ngắn gọn
- Tận dụng tính chất đệ quy

### Nhược điểm / Cons

- Dùng đệ quy, có thể gây stack overflow với columnNumber rất lớn

---

## ⚡ Giải pháp 3: Math (Nâng cao) / Math Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng toán học
- Có thuật toán/pattern nào phù hợp hơn? Dùng công thức trực tiếp

### Ý tưởng / Idea

Dùng công thức toán học để tính trực tiếp. columnNumber = a*26^2 + b*26 + c.

### Thuật toán / Algorithm

1. Nếu columnNumber === 0, trả về ""
2. Tạo result = ""
3. Trong khi columnNumber > 0:
   - columnNumber--
   - remainder = columnNumber % 26
   - result = String.fromCharCode(65 + remainder - 1) + result
   - columnNumber = Math.floor(columnNumber / 26)
4. Trả về result

### Code / Implementation

```javascript
/**
 * Excel Sheet Column Title - Math Solution
 * @param {number} columnNumber
 * @return {string}
 */
function convertToTitle_Math(columnNumber) {
  if (columnNumber === 0) {
    return "";
  }

  let result = "";

  while (columnNumber > 0) {
    columnNumber--;
    const remainder = columnNumber % 26;
    result = String.fromCharCode(65 + remainder - 1) + result;
    columnNumber = Math.floor(columnNumber / 26);
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log n) - Chia cho 26 mỗi vòng lặp
- **Space Complexity:** O(log n) - Lưu result string

### Ưu điểm / Pros

- Code ngắn gọn
- Không có nhược điểm đáng kể

### Nhược điểm / Cons

- Không có nhược điểm đáng kể

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time     | Space    | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | -------- | -------- | ------------------- | -------------------------- |
| Iterative            | O(log n) | O(log n) | Dễ / Easy           | Code dễ hiểu, nên dùng     |
| Recursive            | O(log n) | O(log n) | Trung bình / Medium | Code ngắn gọn              |
| Math                 | O(log n) | O(log n) | Dễ / Easy           | Tối ưu, code ngắn          |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const columnNumber = 1;
console.log(convertToTitle(columnNumber)); // Expected: "A"
console.log(convertToTitle_Recursive(columnNumber)); // Expected: "A"
console.log(convertToTitle_Math(columnNumber)); // Expected: "A"
```

### Test Case 2: 2 chữ cái / Two Letters

```javascript
const columnNumber = 28;
console.log(convertToTitle(columnNumber)); // Expected: "AB"
console.log(convertToTitle_Recursive(columnNumber)); // Expected: "AB"
```

### Test Case 3: Z / Z

```javascript
const columnNumber = 26;
console.log(convertToTitle(columnNumber)); // Expected: "Z"
console.log(convertToTitle_Recursive(columnNumber)); // Expected: "Z"
```

### Test Case 4: AA / AA

```javascript
const columnNumber = 27;
console.log(convertToTitle(columnNumber)); // Expected: "AA"
console.log(convertToTitle_Recursive(columnNumber)); // Expected: "AA"
```

### Test Case 5: Số lớn / Large Number

```javascript
const columnNumber = 701;
console.log(convertToTitle(columnNumber)); // Expected: "ZY"
console.log(convertToTitle_Recursive(columnNumber)); // Expected: "ZY"
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Cấu trúc dữ liệu liên quan:**
  - [String](../algorithms/data-structures/string.md)

- **Thuật toán liên quan:**
  - [Math](../algorithms/algorithms/math.md)

- **Bài toán liên quan:**
  - [Excel Sheet Column Number (Problem 171)](./171-excel-sheet-column-number.md)

---

## 💬 Lời khuyên / Tips

- **Excel Column System:**
  - A = 1, B = 2, ..., Z = 26
  - AA = 27, AB = 28, ...
  - Hệ cơ số 26
- **Algorithm:**
  - Chia cho 26 để tìm chữ cái
  - Phần dư cho biết vị trí trong bảng chữ cái
  - 'A' có ASCII 65, 'Z' có ASCII 90
- **Lỗi thường gặp:**
  - Quên xử lý trường hợp remainder === 0 (chữ 'Z')
  - Sai ASCII code ('A' = 65, không phải 64)
  - Quên chia columnNumber cho 26 sau khi xử lý

---

_Last updated: 2026-02-03_
