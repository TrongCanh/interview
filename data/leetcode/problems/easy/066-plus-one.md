# Plus One / Cộng một

> LeetCode 66 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 66
- **URL:** https://leetcode.com/problems/plus-one/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array, Math
- **Tags:** Array, Math
- **Thuật toán liên quan / Related Algorithms:** Array, Math
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

You are given a **large integer** represented as an integer array `digits`, where each `digits[i]` is the `ith` digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading `0`'s.

Increment the large integer by one and return the resulting array of digits.

**Example 1:**

```
Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 123 + 1 = 124.
Thus, the result should be [1,2,4].
```

**Example 2:**

```
Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
Incrementing by one gives 4321 + 1 = 4322.
Thus, the result should be [4,3,2,2].
```

**Example 3:**

```
Input: digits = [9]
Output: [1,0]
Explanation: The array represents the integer 9.
Incrementing by one gives 9 + 1 = 10.
Thus, the result should be [1,0].
```

**Constraints:**

- `1 <= digits.length <= 100`
- `0 <= digits[i] <= 9`
- `digits` does not contain any leading `0`'s.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng các chữ số đại diện cho một số nguyên lớn
- **Output:** Mảng các chữ số sau khi cộng thêm 1
- **Ràng buộc / Constraints:**
  - Độ dài mảng từ 1 đến 100
  - Mỗi chữ số từ 0 đến 9
  - Không có số 0 ở đầu
- **Edge cases:**
  - Số có nhiều chữ số 9 liên tiếp: [9,9,9] -> [1,0,0,0]
  - Chỉ có một chữ số 9: [9] -> [1,0]
  - Số không có chữ số 9 ở cuối: [1,2,3] -> [1,2,4]

### 2. Tư duy / Thinking Process

- Bước 1: Cộng 1 vào chữ số cuối cùng
- Bước 2: Nếu chữ số sau khi cộng nhỏ hơn 10, trả về kết quả
- Bước 3: Nếu chữ số bằng 10, đặt lại thành 0 và tiếp tục với chữ số trước đó
- Bước 4: Nếu tất cả chữ số đều là 9, thêm chữ số 1 vào đầu mảng

### 3. Ví dụ minh họa / Examples

```
Example 1: [1,2,3]
- Cộng 1 vào chữ số cuối: 3 + 1 = 4 (không cần carry)
- Output: [1,2,4]

Example 2: [9,9,9]
- Cộng 1 vào chữ số cuối: 9 + 1 = 10 -> 0, carry = 1
- Cộng carry vào chữ số trước: 9 + 1 = 10 -> 0, carry = 1
- Cộng carry vào chữ số trước: 9 + 1 = 10 -> 0, carry = 1
- Hết mảng, thêm carry vào đầu: [1,0,0,0]
- Output: [1,0,0,0]
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Chuyển mảng thành số nguyên, cộng 1, sau đó chuyển lại thành mảng các chữ số.

### Thuật toán / Algorithm

1. Chuyển mảng thành chuỗi
2. Chuyển chuỗi thành số nguyên
3. Cộng 1 vào số nguyên
4. Chuyển kết quả lại thành mảng các chữ số

### Code / Implementation

```javascript
/**
 * Plus One - Giải pháp 1: Chuyển đổi số nguyên (Brute Force)
 * @param {number[]} digits - Mảng chữ số đầu vào
 * @return {number[]} - Mảng chữ số sau khi cộng 1
 *
 * Time Complexity: O(n) - chuyển đổi và duyệt mảng
 * Space Complexity: O(n) - tạo mảng mới
 *
 * Lưu ý: Giải pháp này không hoạt động với số rất lớn
 */
function plusOne_bruteForce(digits) {
  // Chuyển mảng thành số nguyên
  const num = parseInt(digits.join(""));

  // Cộng 1
  const result = num + 1;

  // Chuyển lại thành mảng các chữ số
  return result.toString().split("").map(Number);
}

// Test
console.log(plusOne_bruteForce([1, 2, 3])); // [1,2,4]
console.log(plusOne_bruteForce([4, 3, 2, 1])); // [4,3,2,2]
console.log(plusOne_bruteForce([9])); // [1,0]
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - chuyển đổi và duyệt mảng
- **Space Complexity:** O(n) - tạo mảng mới

### Ưu điểm / Pros

- Code đơn giản, dễ hiểu
- Dễ implement

### Nhược điểm / Cons

- **Không hoạt động với số rất lớn** (tràn số nguyên)
- Không tối ưu cho các bài toán về số lớn

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp 1 không hoạt động với số rất lớn
- Điểm yếu của giải pháp 1? Chuyển đổi sang số nguyên có thể gây tràn
- Cách tiếp cận mới? Duyệt từ cuối mảng về đầu, xử lý carry

### Ý tưởng / Idea

Duyệt từ cuối mảng về đầu, cộng 1 vào chữ số cuối cùng. Nếu chữ số bằng 10, đặt lại thành 0 và tiếp tục với chữ số trước đó. Nếu hết mảng mà vẫn còn carry, thêm 1 vào đầu mảng.

### Thuật toán / Algorithm

1. Khởi tạo carry = 1 (số cần cộng)
2. Duyệt từ cuối mảng về đầu
3. Cộng carry vào chữ số hiện tại
4. Nếu chữ số bằng 10, đặt lại thành 0 và giữ carry = 1
5. Ngược lại, đặt carry = 0
6. Nếu sau khi duyệt hết mảng mà carry vẫn bằng 1, thêm 1 vào đầu mảng
7. Trả về kết quả

### Code / Implementation

```javascript
/**
 * Plus One - Giải pháp 2: Duyệt từ cuối (Optimized)
 * @param {number[]} digits - Mảng chữ số đầu vào
 * @return {number[]} - Mảng chữ số sau khi cộng 1
 *
 * Time Complexity: O(n) - duyệt mảng một lần
 * Space Complexity: O(1) hoặc O(n) - O(1) nếu không cần thêm phần tử, O(n) nếu cần thêm
 */
function plusOne_optimized(digits) {
  let carry = 1;

  // Duyệt từ cuối mảng về đầu
  for (let i = digits.length - 1; i >= 0; i--) {
    const sum = digits[i] + carry;

    if (sum === 10) {
      digits[i] = 0;
      carry = 1;
    } else {
      digits[i] = sum;
      carry = 0;
      break; // Không còn carry, có thể dừng
    }
  }

  // Nếu vẫn còn carry sau khi duyệt hết mảng
  if (carry === 1) {
    digits.unshift(1);
  }

  return digits;
}

// Test
console.log(plusOne_optimized([1, 2, 3])); // [1,2,4]
console.log(plusOne_optimized([4, 3, 2, 1])); // [4,3,2,2]
console.log(plusOne_optimized([9])); // [1,0]
console.log(plusOne_optimized([9, 9, 9])); // [1,0,0,0]
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt mảng một lần
- **Space Complexity:** O(1) hoặc O(n) - O(1) nếu không cần thêm phần tử, O(n) nếu cần thêm

### Ưu điểm / Pros

- Hoạt động với số rất lớn
- Không cần chuyển đổi sang số nguyên
- Có thể dừng sớm nếu không còn carry

### Nhược điểm / Cons

- Code phức tạp hơn một chút so với giải pháp 1

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Giải pháp 2 đã tối ưu về time và space
- Có thuật toán/pattern nào phù hợp hơn? Không cần, giải pháp 2 là tốt nhất

### Ý tưởng / Idea

Tối ưu hóa giải pháp 2 bằng cách chỉ xử lý các chữ số 9 và dừng ngay khi gặp chữ số khác 9.

### Thuật toán / Algorithm

1. Duyệt từ cuối mảng về đầu
2. Nếu chữ số bằng 9, đặt lại thành 0
3. Nếu chữ số khác 9, tăng lên 1 và trả về kết quả
4. Nếu tất cả chữ số đều là 9, thêm 1 vào đầu mảng

### Code / Implementation

```javascript
/**
 * Plus One - Giải pháp 3: Chỉ xử lý chữ số 9 (Advanced)
 * @param {number[]} digits - Mảng chữ số đầu vào
 * @return {number[]} - Mảng chữ số sau khi cộng 1
 *
 * Time Complexity: O(n) - duyệt mảng một lần
 * Space Complexity: O(1) hoặc O(n) - O(1) nếu không cần thêm phần tử, O(n) nếu cần thêm
 */
function plusOne_advanced(digits) {
  // Duyệt từ cuối mảng về đầu
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }

  // Nếu tất cả chữ số đều là 9, thêm 1 vào đầu mảng
  digits.unshift(1);
  return digits;
}

// Test
console.log(plusOne_advanced([1, 2, 3])); // [1,2,4]
console.log(plusOne_advanced([4, 3, 2, 1])); // [4,3,2,2]
console.log(plusOne_advanced([9])); // [1,0]
console.log(plusOne_advanced([9, 9, 9])); // [1,0,0,0]
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - duyệt mảng một lần
- **Space Complexity:** O(1) hoặc O(n) - O(1) nếu không cần thêm phần tử, O(n) nếu cần thêm

### Ưu điểm / Pros

- Code ngắn gọn và sạch
- Hoạt động với số rất lớn
- Dừng ngay khi gặp chữ số khác 9

### Nhược điểm / Cons

- Cần hiểu rõ logic xử lý carry

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time | Space     | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ---- | --------- | ------------------- | -------------------------- |
| Brute Force          | O(n) | O(n)      | Dễ / Easy           | Số nhỏ, demo nhanh         |
| Optimized (Carry)    | O(n) | O(1)/O(n) | Trung bình / Medium | Số lớn, cần tối ưu         |
| Advanced (9s only)   | O(n) | O(1)/O(n) | Trung bình / Medium | Code ngắn gọn, tối ưu      |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const input1 = [1, 2, 3];
const expected1 = [1, 2, 4];
console.log(`Input: ${JSON.stringify(input1)}`);
console.log(`Expected: ${JSON.stringify(expected1)}`);
console.log(`Optimized: ${JSON.stringify(plusOne_optimized(input1))}`);
console.log(`Advanced: ${JSON.stringify(plusOne_advanced(input1))}`);
```

### Test Case 2: Một chữ số 9 / Single 9

```javascript
const input2 = [9];
const expected2 = [1, 0];
console.log(`Input: ${JSON.stringify(input2)}`);
console.log(`Expected: ${JSON.stringify(expected2)}`);
console.log(`Optimized: ${JSON.stringify(plusOne_optimized(input2))}`);
console.log(`Advanced: ${JSON.stringify(plusOne_advanced(input2))}`);
```

### Test Case 3: Nhiều chữ số 9 / Multiple 9s

```javascript
const input3 = [9, 9, 9];
const expected3 = [1, 0, 0, 0];
console.log(`Input: ${JSON.stringify(input3)}`);
console.log(`Expected: ${JSON.stringify(expected3)}`);
console.log(`Optimized: ${JSON.stringify(plusOne_optimized(input3))}`);
console.log(`Advanced: ${JSON.stringify(plusOne_advanced(input3))}`);
```

### Test Case 4: Không có chữ số 9 ở cuối / No 9 at end

```javascript
const input4 = [4, 3, 2, 1];
const expected4 = [4, 3, 2, 2];
console.log(`Input: ${JSON.stringify(input4)}`);
console.log(`Expected: ${JSON.stringify(expected4)}`);
console.log(`Optimized: ${JSON.stringify(plusOne_optimized(input4))}`);
console.log(`Advanced: ${JSON.stringify(plusOne_advanced(input4))}`);
```

### Test Case 5: Số rất lớn / Very Large Number

```javascript
const input5 = Array(50).fill(9); // 50 chữ số 9
const expected5 = [1, ...Array(50).fill(0)];
console.log(`Input: ${input5.length} chữ số 9`);
console.log(`Expected: ${expected5.length} chữ số (1 + 50 số 0)`);
console.log(`Optimized: ${JSON.stringify(plusOne_optimized([...input5]))}`);
console.log(`Advanced: ${JSON.stringify(plusOne_advanced([...input5]))}`);
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Array:** [`../../algorithms/data-structures/array.md`](../../algorithms/data-structures/array.md)
- **Math:** [`../../algorithms/algorithms/math.md`](../../algorithms/algorithms/math.md)

---

## 💡 Tips & Tricks

1. **Xử lý Carry:** Khi cộng số, luôn nhớ xử lý carry (số dư khi cộng vượt quá 9)
2. **Duyệt từ cuối:** Khi cộng số, duyệt từ cuối mảng về đầu là cách tự nhiên nhất
3. **Số rất lớn:** Với bài toán về số lớn, tránh chuyển đổi sang số nguyên vì có thể gây tràn
4. **unshift vs push:** Khi thêm phần tử vào đầu mảng, dùng `unshift()` nhưng lưu ý O(n) time complexity

---

## 📚 Tài liệu tham khảo / References

- [LeetCode 66 - Plus One](https://leetcode.com/problems/plus-one/)
- [Array Methods - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

---

_Last updated: 2025-02-03_
