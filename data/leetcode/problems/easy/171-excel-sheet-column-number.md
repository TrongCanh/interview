# Excel Sheet Column Number

> LeetCode Problem 171 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 171
- **URL:** https://leetcode.com/problems/excel-sheet-column-number/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** String, Math
- **Tags:** String, Math
- **Thuật toán liên quan / Related Algorithms:** String, Math
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> Given a string `columnTitle` that represents the column title as appears in an Excel sheet, return its corresponding column number.
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
Input: columnTitle = "A"
Output: 1
```

**Example 2:**

```
Input: columnTitle = "AB"
Output: 28
```

**Example 3:**

```
Input: columnTitle = "ZY"
Output: 701
```

**Constraints:**

- `1 <= columnTitle.length <= 7`
- `columnTitle` consists only of uppercase English letters.
- `columnTitle` is in the range ["A", "Z", "AA", "AZ", "AAA", ..., "FXSHRXW"].

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Chuỗi columnTitle (chữ hoa A-Z)
- **Output:** Số nguyên - số cột Excel tương ứng
- **Ràng buộc / Constraints:**
  - A = 1, B = 2, ..., Z = 26
  - AA = 27, AB = 28, ...
- **Edge cases:**
  - columnTitle = "A" → 1
  - columnTitle = "Z" → 26
  - columnTitle = "AA" → 27
  - columnTitle = "FXSHRXW" → rất lớn

### 2. Tư duy / Thinking Process

- **Bước 1:** Excel sử dụng 26 chữ cái (A-Z)
- **Bước 2:** Có thể coi như hệ cơ số 26
- **Bước 3:** Duyệt từ trái sang phải, nhân 26 với kết quả của các vị trí

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: columnTitle = "A"

Giải thích:
- 'A' là chữ cái thứ 1 → 1
Output: 1
```

```
Example 2:
Input: columnTitle = "AB"

Giải thích:
- 'B' là chữ cái thứ 2 → 2
- 'A' là chữ cái thứ 1 → 1
- Tổng = 2*26^1 + 1 = 28
Output: 28
```

```
Example 3:
Input: columnTitle = "ZY"

Giải thích:
- 'Y' là chữ cái thứ 25 → 25
- 'Z' là chữ cái thứ 26 → 26
- Tổng = 25*26^1 + 26 = 701
Output: 701
```

---

## 💡 Giải pháp 1: Iterative (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Duyệt từ trái sang phải, nhân 26 với kết quả của các vị trí. Tương tự như chuyển từ hệ cơ số 26 sang hệ cơ số 10.

### Thuật toán / Algorithm

1. Khởi tạo result = 0
2. Duyệt từ trái sang phải (từ cuối về đầu):
   - result = result \* 26 + (columnTitle[i].charCodeAt(0) - 64)
3. Trả về result

### Code / Implementation

```javascript
/**
 * Excel Sheet Column Number - Iterative Solution
 * @param {string} columnTitle
 * @return {number}
 */
function titleToNumber(columnTitle) {
  let result = 0;

  for (let i = 0; i < columnTitle.length; i++) {
    // 'A' có ASCII 65, 'A' - 1 = 64
    result = result * 26 + (columnTitle.charCodeAt(i) - 64);
  }

  return result;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua từng ký tự
- **Space Complexity:** O(1) - Chỉ dùng 1 biến

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Code ngắn gọn
- Độ phức tạp bộ nhớ O(1)

### Nhược điểm / Cons

- Không có nhược điểm đáng kể

---

## 🚀 Giải pháp 2: Recursive (Cải tiến) / Recursive Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Có thể dùng đệ quy
- Điểm yếu của giải pháp 1? Không có điểm yếu
- Cách tiếp cận mới? Dùng đệ quy thay vì vòng lặp

### Ý tưởng / Idea

Dùng đệ quy để xử lý từng ký tự. Tính giá trị của ký tự hiện tại, sau đó đệ quy xử lý phần còn lại.

### Thuật toán / Algorithm

1. Định nghĩa hàm helper(index):
   - Nếu index < 0, trả về 0
   - Trả về helper(index - 1) \* 26 + (columnTitle[index].charCodeAt(0) - 64)
2. Trả về helper(columnTitle.length - 1)

### Code / Implementation

```javascript
/**
 * Excel Sheet Column Number - Recursive Solution
 * @param {string} columnTitle
 * @return {number}
 */
function titleToNumber_Recursive(columnTitle) {
  function helper(index) {
    if (index < 0) {
      return 0;
    }

    return helper(index - 1) * 26 + (columnTitle.charCodeAt(index) - 64);
  }

  return helper(columnTitle.length - 1);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Đệ quy n lần
- **Space Complexity:** O(n) - Stack đệ quy có độ sâu n

### Ưu điểm / Pros

- Code ngắn gọn
- Tận dụng tính chất đệ quy

### Nhược điểm / Cons

- Dùng đệ quy, có thể gây stack overflow với chuỗi rất dài

---

## ⚡ Giải pháp 3: Reduce (Nâng cao) / Reduce Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng reduce
- Có thuật toán/pattern nào phù hợp hơn? Dùng Array.reduce()

### Ý tưởng / Idea

Dùng Array.reduce() để tích lũy kết quả qua từng ký tự.

### Thuật toán / Algorithm

1. Trả về columnTitle.split('').reduce((acc, char) => {
   acc \* 26 + (char.charCodeAt(0) - 64)
   }, 0)

### Code / Implementation

```javascript
/**
 * Excel Sheet Column Number - Reduce Solution
 * @param {string} columnTitle
 * @return {number}
 */
function titleToNumber_Reduce(columnTitle) {
  return columnTitle.split("").reduce((acc, char) => {
    return acc * 26 + (char.charCodeAt(0) - 64);
  }, 0);
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua từng ký tự
- **Space Complexity:** O(1) - Chỉ dùng 1 biến

### Ưu điểm / Pros

- Code cực kỳ ngắn gọn
- Functional programming style

### Nhược điểm / Cons

- Tốn bộ nhớ cho split() và mảng tạm
- Khó hiểu hơn cho người mới

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space | Độ khó / Difficulty | Khi nào dùng / When to use       |
| -------------------- | ---- | ----- | ------------------- | -------------------------------- |
| Iterative            | O(n) | O(1)  | Dễ / Easy           | Code dễ hiểu, nên dùng           |
| Recursive            | O(n) | O(n)  | Trung bình / Medium | Code ngắn gọn                    |
| Reduce               | O(n) | O(n)  | Khó / Hard          | Functional style, code ngắn nhất |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const columnTitle = "A";
console.log(titleToNumber(columnTitle)); // Expected: 1
console.log(titleToNumber_Recursive(columnTitle)); // Expected: 1
console.log(titleToNumber_Reduce(columnTitle)); // Expected: 1
```

### Test Case 2: 2 chữ cái / Two Letters

```javascript
const columnTitle = "AB";
console.log(titleToNumber(columnTitle)); // Expected: 28
console.log(titleToNumber_Recursive(columnTitle)); // Expected: 28
```

### Test Case 3: Z / Z

```javascript
const columnTitle = "Z";
console.log(titleToNumber(columnTitle)); // Expected: 26
console.log(titleToNumber_Recursive(columnTitle)); // Expected: 26
```

### Test Case 4: AA / AA

```javascript
const columnTitle = "AA";
console.log(titleToNumber(columnTitle)); // Expected: 27
console.log(titleToNumber_Recursive(columnTitle)); // Expected: 27
```

### Test Case 5: Chuỗi dài / Long String

```javascript
const columnTitle = "FXSHRXW";
console.log(titleToNumber(columnTitle)); // Expected: 2147483647
console.log(titleToNumber_Recursive(columnTitle)); // Expected: 2147483647
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Cấu trúc dữ liệu liên quan:**
  - [String](../algorithms/data-structures/string.md)

- **Thuật toán liên quan:**
  - [Math](../algorithms/algorithms/math.md)

- **Bài toán liên quan:**
  - [Excel Sheet Column Title (Problem 168)](./168-excel-sheet-column-title.md)

---

## 💬 Lời khuyên / Tips

- **Excel Column System:**
  - A = 1, B = 2, ..., Z = 26
  - AA = 27, AB = 28, ...
  - Hệ cơ số 26
- **Algorithm:**
  - Duyệt từ trái sang phải (hoặc từ phải sang trái)
  - Nhân 26 với kết quả và cộng giá trị ký tự mới
  - 'A' có ASCII 65, 'A' - 1 = 64
- **Lỗi thường gặp:**
  - Quên xử lý trường hợp chuỗi rỗng
  - Sai ASCII code ('A' = 65, không phải 64)
  - Với đệ quy, quên base case (index < 0)

---

_Last updated: 2026-02-03_
