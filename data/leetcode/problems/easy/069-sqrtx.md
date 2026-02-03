# Sqrt(x) / Căn bậc hai

> LeetCode 69 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 69
- **URL:** https://leetcode.com/problems/sqrtx/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Math, Binary Search
- **Tags:** Math, Binary Search
- **Thuật toán liên quan / Related Algorithms:** Math, Binary Search
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given a non-negative integer `x`, return the square root of `x` rounded down to the nearest integer.

The returned integer should be non-negative as well.

You must not use any built-in exponent function or operator.

**Example 1:**

```
Input: x = 4
Output: 2
Explanation: The square root of 4 is 2, so we return 2.
```

**Example 2:**

```
Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.
```

**Constraints:**

- `0 <= x <= 2^31 - 1`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Một số nguyên không âm `x`
- **Output:** Căn bậc hai của `x`, làm tròn xuống số nguyên gần nhất
- **Ràng buộc / Constraints:**
  - `x` từ 0 đến 2^31 - 1
  - Không được dùng hàm hoặc toán tử mũ có sẵn
- **Edge cases:**
  - x = 0 → 0
  - x = 1 → 1
  - x không phải là số chính phương (ví dụ: 8 → 2)

### 2. Tư duy / Thinking Process

- Bước 1: Tìm số nguyên `n` lớn nhất sao cho `n * n <= x`
- Bước 2: Có thể dùng Linear Search: kiểm tra từ 0 đến x
- Bước 3: Tối ưu hơn với Binary Search vì dãy số đã được sắp xếp
- Bước 4: Có thể dùng Newton's Method để hội tụ nhanh hơn

### 3. Ví dụ minh họa / Examples

```
Example 1: x = 4
- Tìm n lớn nhất sao cho n * n <= 4
- 0 * 0 = 0 <= 4 ✓
- 1 * 1 = 1 <= 4 ✓
- 2 * 2 = 4 <= 4 ✓
- 3 * 3 = 9 > 4 ✗
- Kết quả: 2

Example 2: x = 8
- Tìm n lớn nhất sao cho n * n <= 8
- 0 * 0 = 0 <= 8 ✓
- 1 * 1 = 1 <= 8 ✓
- 2 * 2 = 4 <= 8 ✓
- 3 * 3 = 9 > 8 ✗
- Kết quả: 2
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Dùng Linear Search: kiểm tra từng số từ 0 đến x, tìm số lớn nhất sao cho `n * n <= x`.

### Thuật toán / Algorithm

1. Duyệt từ 0 đến x
2. Kiểm tra nếu `n * n <= x`, lưu `n` làm kết quả
3. Nếu `n * n > x`, dừng và trả về kết quả

### Code / Implementation

```javascript
/**
 * Sqrt(x) - Giải pháp 1: Linear Search (Brute Force)
 * @param {number} x - Số nguyên không âm
 * @return {number} - Căn bậc hai làm tròn xuống
 *
 * Time Complexity: O(sqrt(x)) - duyệt từ 0 đến sqrt(x)
 * Space Complexity: O(1) - không dùng thêm bộ nhớ
 */
function mySqrt_bruteForce(x) {
  if (x === 0 || x === 1) {
    return x;
  }

  let result = 0;
  for (let i = 1; i <= x; i++) {
    if (i * i <= x) {
      result = i;
    } else {
      break;
    }
  }

  return result;
}

// Test
console.log(mySqrt_bruteForce(4)); // 2
console.log(mySqrt_bruteForce(8)); // 2
console.log(mySqrt_bruteForce(0)); // 0
console.log(mySqrt_bruteForce(1)); // 1
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(sqrt(x)) - duyệt từ 0 đến sqrt(x)
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ

### Ưu điểm / Pros

- Code đơn giản, dễ hiểu
- Dễ implement

### Nhược điểm / Cons

- Chậm với số lớn (x = 2^31 - 1)
- Không tối ưu

---

## 🚀 Giải pháp 2: Optimized (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp 1 quá chậm với số lớn
- Điểm yếu của giải pháp 1? Duyệt từng số, không tận dụng tính chất đã sắp xếp
- Cách tiếp cận mới? Sử dụng Binary Search vì dãy số đã được sắp xếp

### Ý tưởng / Idea

Sử dụng Binary Search để tìm số nguyên `n` lớn nhất sao cho `n * n <= x`. Binary Search giảm thời gian từ O(sqrt(x)) xuống O(log(x)).

### Thuật toán / Algorithm

1. Khởi tạo `left = 0`, `right = x`, `result = 0`
2. Trong khi `left <= right`:
   - Tính `mid = Math.floor((left + right) / 2)`
   - Nếu `mid * mid <= x`, cập nhật `result = mid`, `left = mid + 1`
   - Ngược lại, `right = mid - 1`
3. Trả về `result`

### Code / Implementation

```javascript
/**
 * Sqrt(x) - Giải pháp 2: Binary Search (Optimized)
 * @param {number} x - Số nguyên không âm
 * @return {number} - Căn bậc hai làm tròn xuống
 *
 * Time Complexity: O(log(x)) - binary search
 * Space Complexity: O(1) - không dùng thêm bộ nhớ
 */
function mySqrt_binarySearch(x) {
  if (x === 0 || x === 1) {
    return x;
  }

  let left = 1;
  let right = Math.floor(x / 2); // Căn bậc hai không thể lớn hơn x/2 khi x > 1
  let result = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const square = mid * mid;

    if (square === x) {
      return mid;
    } else if (square < x) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}

// Test
console.log(mySqrt_binarySearch(4)); // 2
console.log(mySqrt_binarySearch(8)); // 2
console.log(mySqrt_binarySearch(0)); // 0
console.log(mySqrt_binarySearch(1)); // 1
console.log(mySqrt_binarySearch(2147395599)); // 46339
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log(x)) - binary search
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ

### Ưu điểm / Pros

- Rất nhanh với số lớn
- Tối ưu về thời gian
- Dễ hiểu

### Nhược điểm / Cons

- Cần hiểu về Binary Search
- Code phức tạp hơn một chút

---

## ⚡ Giải pháp 3: Advanced (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Newton's Method hội tụ nhanh hơn Binary Search
- Có thuật toán/pattern nào phù hợp hơn? Newton's Method là phương pháp số học để tìm nghiệm

### Ý tưởng / Idea

Sử dụng Newton's Method (hay còn gọi là Newton-Raphson Method) để tìm căn bậc hai. Phương pháp này sử dụng công thức lặp:

```
x_{n+1} = (x_n + x / x_n) / 2
```

Phương pháp hội tụ rất nhanh đến kết quả.

### Thuật toán / Algorithm

1. Nếu `x === 0`, trả về 0
2. Khởi tạo `guess = x`
3. Lặp lại cho đến khi hội tụ:
   - Tính `newGuess = Math.floor((guess + Math.floor(x / guess)) / 2)`
   - Nếu `newGuess >= guess`, trả về `guess`
   - Cập nhật `guess = newGuess`

### Code / Implementation

```javascript
/**
 * Sqrt(x) - Giải pháp 3: Newton's Method (Advanced)
 * @param {number} x - Số nguyên không âm
 * @return {number} - Căn bậc hai làm tròn xuống
 *
 * Time Complexity: O(log(log(x))) - hội tụ rất nhanh
 * Space Complexity: O(1) - không dùng thêm bộ nhớ
 */
function mySqrt_newton(x) {
  if (x === 0) {
    return 0;
  }

  let guess = x;

  while (true) {
    const newGuess = Math.floor((guess + Math.floor(x / guess)) / 2);

    if (newGuess >= guess) {
      return guess;
    }

    guess = newGuess;
  }
}

// Test
console.log(mySqrt_newton(4)); // 2
console.log(mySqrt_newton(8)); // 2
console.log(mySqrt_newton(0)); // 0
console.log(mySqrt_newton(1)); // 1
console.log(mySqrt_newton(2147395599)); // 46339
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(log(log(x))) - hội tụ rất nhanh
- **Space Complexity:** O(1) - không dùng thêm bộ nhớ

### Ưu điểm / Pros

- Hội tụ rất nhanh (nhanh hơn Binary Search)
- Phương pháp số học quan trọng
- Code ngắn gọn

### Nhược điểm / Cons

- Cần hiểu về Newton's Method
- Khó hiểu hơn Binary Search

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time           | Space | Độ khó / Difficulty | Khi nào dùng / When to use          |
| -------------------- | -------------- | ----- | ------------------- | ----------------------------------- |
| Linear Search        | O(sqrt(x))     | O(1)  | Dễ / Easy           | Số nhỏ, demo nhanh                  |
| Binary Search        | O(log(x))      | O(1)  | Trung bình / Medium | Số lớn, cần tối ưu                  |
| Newton's Method      | O(log(log(x))) | O(1)  | Khó / Hard          | Học phương pháp số học, tối ưu nhất |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const input1 = 4;
const expected1 = 2;
console.log(`Input: ${input1}`);
console.log(`Expected: ${expected1}`);
console.log(`Brute Force: ${mySqrt_bruteForce(input1)}`);
console.log(`Binary Search: ${mySqrt_binarySearch(input1)}`);
console.log(`Newton's Method: ${mySqrt_newton(input1)}`);
```

### Test Case 2: Không phải số chính phương / Not Perfect Square

```javascript
const input2 = 8;
const expected2 = 2;
console.log(`Input: ${input2}`);
console.log(`Expected: ${expected2}`);
console.log(`Brute Force: ${mySqrt_bruteForce(input2)}`);
console.log(`Binary Search: ${mySqrt_binarySearch(input2)}`);
console.log(`Newton's Method: ${mySqrt_newton(input2)}`);
```

### Test Case 3: Số 0 / Zero

```javascript
const input3 = 0;
const expected3 = 0;
console.log(`Input: ${input3}`);
console.log(`Expected: ${expected3}`);
console.log(`Brute Force: ${mySqrt_bruteForce(input3)}`);
console.log(`Binary Search: ${mySqrt_binarySearch(input3)}`);
console.log(`Newton's Method: ${mySqrt_newton(input3)}`);
```

### Test Case 4: Số 1 / One

```javascript
const input4 = 1;
const expected4 = 1;
console.log(`Input: ${input4}`);
console.log(`Expected: ${expected4}`);
console.log(`Brute Force: ${mySqrt_bruteForce(input4)}`);
console.log(`Binary Search: ${mySqrt_binarySearch(input4)}`);
console.log(`Newton's Method: ${mySqrt_newton(input4)}`);
```

### Test Case 5: Số lớn / Large Number

```javascript
const input5 = 2147395599;
const expected5 = 46339;
console.log(`Input: ${input5}`);
console.log(`Expected: ${expected5}`);
console.log(`Brute Force: ${mySqrt_bruteForce(input5)}`); // Chậm
console.log(`Binary Search: ${mySqrt_binarySearch(input5)}`);
console.log(`Newton's Method: ${mySqrt_newton(input5)}`);
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Math:** [`../../algorithms/algorithms/math.md`](../../algorithms/algorithms/math.md)
- **Binary Search:** [`../../algorithms/algorithms/binary-search.md`](../../algorithms/algorithms/binary-search.md)

---

## 💡 Tips & Tricks

1. **Binary Search:** Khi tìm kiếm trong dãy số đã sắp xếp, Binary Search luôn là lựa chọn tốt
2. **Newton's Method:** Phương pháp hội tụ rất nhanh, hữu ích cho các bài toán tìm nghiệm
3. **Edge Cases:** Luôn kiểm tra x = 0 và x = 1 vì chúng là trường hợp đặc biệt
4. **Overflow:** Khi tính `mid * mid`, có thể gây overflow với số rất lớn (trong các ngôn ngữ khác)

---

## 📚 Tài liệu tham khảo / References

- [LeetCode 69 - Sqrt(x)](https://leetcode.com/problems/sqrtx/)
- [Newton's Method - Wikipedia](https://en.wikipedia.org/wiki/Newton%27s_method)
- [Binary Search - Wikipedia](https://en.wikipedia.org/wiki/Binary_search_algorithm)

---

_Last updated: 2025-02-03_
