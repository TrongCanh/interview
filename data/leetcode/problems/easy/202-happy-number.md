# 202. Happy Number

## Problem Information

| Property               | Value                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| **Problem ID**         | 202                                                                                        |
| **URL**                | [https://leetcode.com/problems/happy-number/](https://leetcode.com/problems/happy-number/) |
| **Difficulty**         | Easy                                                                                       |
| **Category**           | Hash Table, Math                                                                           |
| **Tags**               | `Hash Table`, `Math`, `Two Pointers`                                                       |
| **Related Algorithms** | [`Math`](../../algorithms/algorithms/math.md)                                              |
| **Related Patterns**   | [`Two Pointers`](../../algorithms/patterns/two-pointers.md)                                |

---

## Original Problem

Write an algorithm to determine if a number `n` is happy.

A happy number is a number defined by the following process:

- Starting with any positive integer, replace the number by the sum of the squares of its digits.
- Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
- Those numbers for which this process ends in 1 are happy.

Return `true` if `n` is a happy number, and `false` if not.

**Example 1:**

```
Input: n = 19
Output: true
Explanation:
1² + 9² = 82
8² + 2² = 68
6² + 8² = 100
1² + 0² + 0² = 1
```

**Example 2:**

```
Input: n = 2
Output: false
```

**Constraints:**

- `1 <= n <= 2^31 - 1`

---

## Problem Analysis

### Understanding the Problem / Hiểu bài toán

**English:**
We need to determine if a number is "happy" by repeatedly replacing it with the sum of the squares of its digits. If we eventually reach 1, the number is happy. If we enter a cycle that doesn't include 1, the number is not happy.

**Vietnamese:**
Chúng ta cần xác định xem một số có phải là "hạnh phúc" hay không bằng cách liên tục thay thế nó bằng tổng bình phương các chữ số của nó. Nếu chúng ta cuối cùng đạt được 1, số đó là hạnh phúc. Nếu chúng ta đi vào một vòng lặp không bao gồm 1, số đó không hạnh phúc.

### Thinking Process / Quy trình suy nghĩ

**English:**

1. We need to repeatedly calculate the sum of squares of digits.
2. If we reach 1, return true.
3. If we see a number we've seen before (cycle detection), return false.
4. We can use a hash set to detect cycles, or use Floyd's cycle detection algorithm.

**Vietnamese:**

1. Chúng ta cần liên tục tính tổng bình phương các chữ số.
2. Nếu chúng ta đạt được 1, trả về true.
3. Nếu chúng ta thấy một số đã gặp trước đó (phát hiện vòng lặp), trả về false.
4. Chúng ta có thể sử dụng hash set để phát hiện vòng lặp, hoặc sử dụng thuật toán phát hiện vòng lặp Floyd.

### Examples / Ví dụ

**Example 1 (Happy Number):**

```
Input: 19
Step 1: 1² + 9² = 1 + 81 = 82
Step 2: 8² + 2² = 64 + 4 = 68
Step 3: 6² + 8² = 36 + 64 = 100
Step 4: 1² + 0² + 0² = 1 + 0 + 0 = 1

Result: true (reached 1)
```

**Example 2 (Not Happy Number):**

```
Input: 2
Step 1: 2² = 4
Step 2: 4² = 16
Step 3: 1² + 6² = 1 + 36 = 37
Step 4: 3² + 7² = 9 + 49 = 58
Step 5: 5² + 8² = 25 + 64 = 89
Step 6: 8² + 9² = 64 + 81 = 145
Step 7: 1² + 4² + 5² = 1 + 16 + 25 = 42
Step 8: 4² + 2² = 16 + 4 = 20
Step 9: 2² + 0² = 4 + 0 = 4 (cycle detected!)

Result: false (entered cycle 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4)
```

---

## Solutions

### Solution 1: Hash Set with Cycle Detection / Hash Set với phát hiện vòng lặp

#### Idea / Ý tưởng

**English:**
We use a hash set to keep track of all numbers we've seen. If we encounter a number that's already in the set, we've found a cycle and the number is not happy. If we reach 1, the number is happy.

**Vietnamese:**
Chúng ta sử dụng hash set để theo dõi tất cả các số đã gặp. Nếu chúng ta gặp một số đã có trong set, chúng ta đã tìm thấy một vòng lặp và số đó không hạnh phúc. Nếu chúng ta đạt được 1, số đó là hạnh phúc.

#### Algorithm / Thuật toán

```
1. Create an empty set to store seen numbers
2. While n is not 1 and n is not in the set:
   a. Add n to the set
   b. Calculate the sum of squares of digits of n
   c. Set n to this sum
3. Return true if n is 1, false otherwise
```

#### Code / Mã

```javascript
/**
 * Calculate the sum of squares of digits / Tính tổng bình phương các chữ số
 *
 * @param {number} n - The input number / Số đầu vào
 * @returns {number} - Sum of squares of digits / Tổng bình phương các chữ số
 */
function sumOfSquares(n) {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
}

/**
 * Check if a number is happy using hash set for cycle detection
 * Kiểm tra xem một số có hạnh phúc không bằng hash set để phát hiện vòng lặp
 *
 * @param {number} n - The input number / Số đầu vào
 * @returns {boolean} - True if happy, false otherwise / True nếu hạnh phúc, false nếu không
 * @timecomplexity O(log n) - Each iteration reduces the number / Mỗi lần lặp giảm số
 * @spacecomplexity O(log n) - For the hash set / Cho hash set
 */
function isHappy(n) {
  const seen = new Set();

  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = sumOfSquares(n);
  }

  return n === 1;
}

// Test cases / Các trường hợp kiểm tra
console.log(isHappy(19)); // Output: true
console.log(isHappy(2)); // Output: false
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(log n) - Each iteration reduces the number of digits
- **Space Complexity:** O(log n) - For the hash set storing seen numbers

**Vietnamese:**

- **Độ phức tạp thời gian:** O(log n) - Mỗi lần lặp giảm số lượng chữ số
- **Độ phức tạp không gian:** O(log n) - Cho hash set lưu trữ các số đã thấy

#### Pros / Ưu điểm

- Simple and straightforward implementation
- Easy to understand
- Works correctly for all cases

#### Cons / Nhược điểm

- Uses extra space for the hash set
- Not the most space-efficient solution

---

### Solution 2: Floyd's Cycle Detection Algorithm / Thuật toán phát hiện vòng lặp Floyd

#### Idea / Ý tưởng

**English:**
We can use Floyd's cycle detection algorithm (also known as the tortoise and hare algorithm) to detect cycles without using extra space. We use two pointers: slow moves one step at a time, fast moves two steps at a time. If they meet, there's a cycle.

**Vietnamese:**
Chúng ta có thể sử dụng thuật toán phát hiện vòng lặp Floyd (còn được gọi là thuật toán rùa và thỏ) để phát hiện vòng lặp mà không cần thêm không gian. Chúng ta sử dụng hai con trỏ: slow di chuyển một bước mỗi lần, fast di chuyển hai bước mỗi lần. Nếu chúng gặp nhau, có một vòng lặp.

#### Algorithm / Thuật toán

```
1. Define a helper function to calculate sum of squares of digits
2. Initialize slow = n, fast = sumOfSquares(n)
3. While fast !== 1 and slow !== fast:
   a. slow = sumOfSquares(slow) (move one step)
   b. fast = sumOfSquares(sumOfSquares(fast)) (move two steps)
4. Return true if fast === 1, false otherwise
```

#### Code / Mã

```javascript
/**
 * Calculate the sum of squares of digits / Tính tổng bình phương các chữ số
 *
 * @param {number} n - The input number / Số đầu vào
 * @returns {number} - Sum of squares of digits / Tổng bình phương các chữ số
 */
function sumOfSquares(n) {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
}

/**
 * Check if a number is happy using Floyd's cycle detection algorithm
 * Kiểm tra xem một số có hạnh phúc không bằng thuật toán phát hiện vòng lặp Floyd
 *
 * @param {number} n - The input number / Số đầu vào
 * @returns {boolean} - True if happy, false otherwise / True nếu hạnh phúc, false nếu không
 * @timecomplexity O(log n) - Each iteration reduces the number / Mỗi lần lặp giảm số
 * @spacecomplexity O(1) - Only using two pointers / Chỉ sử dụng hai con trỏ
 */
function isHappyFloyd(n) {
  let slow = n;
  let fast = sumOfSquares(n);

  while (fast !== 1 && slow !== fast) {
    // Slow moves one step / Slow di chuyển một bước
    slow = sumOfSquares(slow);

    // Fast moves two steps / Fast di chuyển hai bước
    fast = sumOfSquares(sumOfSquares(fast));
  }

  return fast === 1;
}

// Test cases / Các trường hợp kiểm tra
console.log(isHappyFloyd(19)); // Output: true
console.log(isHappyFloyd(2)); // Output: false
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(log n) - Each iteration reduces the number of digits
- **Space Complexity:** O(1) - Only using two pointers

**Vietnamese:**

- **Độ phức tạp thời gian:** O(log n) - Mỗi lần lặp giảm số lượng chữ số
- **Độ phức tạp không gian:** O(1) - Chỉ sử dụng hai con trỏ

#### Pros / Ưu điểm

- No extra space required
- Efficient cycle detection
- Classic algorithm for cycle detection

#### Cons / Nhược điểm

- Slightly more complex to understand
- Requires understanding of Floyd's algorithm

---

### Solution 3: Mathematical Approach (Using Known Cycles) / Tiếp cận toán học (Sử dụng các vòng lặp đã biết)

#### Idea / Ý tưởng

**English:**
Mathematical analysis shows that unhappy numbers always end up in the cycle: 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4. We can use this knowledge to simplify our cycle detection.

**Vietnamese:**
Phân tích toán học cho thấy các số không hạnh phúc luôn kết thúc trong vòng lặp: 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4. Chúng ta có thể sử dụng kiến thức này để đơn giản hóa việc phát hiện vòng lặp.

#### Algorithm / Thuật toán

```
1. Define a helper function to calculate sum of squares of digits
2. While n is not 1 and n is not 4:
   a. Set n to sumOfSquares(n)
3. Return true if n is 1, false otherwise
```

#### Code / Mã

```javascript
/**
 * Calculate the sum of squares of digits / Tính tổng bình phương các chữ số
 *
 * @param {number} n - The input number / Số đầu vào
 * @returns {number} - Sum of squares of digits / Tổng bình phương các chữ số
 */
function sumOfSquares(n) {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
}

/**
 * Check if a number is happy using mathematical approach
 * Kiểm tra xem một số có hạnh phúc không bằng tiếp cận toán học
 *
 * @param {number} n - The input number / Số đầu vào
 * @returns {boolean} - True if happy, false otherwise / True nếu hạnh phúc, false nếu không
 * @timecomplexity O(log n) - Each iteration reduces the number / Mỗi lần lặp giảm số
 * @spacecomplexity O(1) - No extra space / Không cần thêm không gian
 */
function isHappyMath(n) {
  // All unhappy numbers end up in the cycle: 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4
  // Tất cả các số không hạnh phúc đều kết thúc trong vòng lặp: 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4
  while (n !== 1 && n !== 4) {
    n = sumOfSquares(n);
  }

  return n === 1;
}

// Test cases / Các trường hợp kiểm tra
console.log(isHappyMath(19)); // Output: true
console.log(isHappyMath(2)); // Output: false
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(log n) - Each iteration reduces the number of digits
- **Space Complexity:** O(1) - No extra space required

**Vietnamese:**

- **Độ phức tạp thời gian:** O(log n) - Mỗi lần lặp giảm số lượng chữ số
- **Độ phức tạp không gian:** O(1) - Không cần thêm không gian

#### Pros / Ưu điểm

- Most space-efficient solution
- Simple implementation
- Fastest in practice due to early cycle detection

#### Cons / Nhược điểm

- Relies on mathematical knowledge of the cycle
- Not generalizable to other cycle detection problems
- Requires understanding of why 4 is the key number

---

## Solution Comparison / So sánh giải pháp

| Solution          | Time     | Space    | Simplicity | Efficiency |
| ----------------- | -------- | -------- | ---------- | ---------- |
| Hash Set          | O(log n) | O(log n) | High       | Medium     |
| Floyd's Algorithm | O(log n) | O(1)     | Medium     | High       |
| Mathematical      | O(log n) | O(1)     | High       | Very High  |

---

## Test Cases / Các trường hợp kiểm tra

```javascript
// Test cases for all solutions / Các trường hợp kiểm tra cho tất cả giải pháp

// Test case 1: Example 1 - Happy number
let n1 = 19;
console.log(isHappy(n1)); // Expected: true
console.log(isHappyFloyd(n1)); // Expected: true
console.log(isHappyMath(n1)); // Expected: true

// Test case 2: Example 2 - Not happy number
let n2 = 2;
console.log(isHappy(n2)); // Expected: false
console.log(isHappyFloyd(n2)); // Expected: false
console.log(isHappyMath(n2)); // Expected: false

// Test case 3: Single digit happy number
let n3 = 1;
console.log(isHappy(n3)); // Expected: true
console.log(isHappyFloyd(n3)); // Expected: true
console.log(isHappyMath(n3)); // Expected: true

// Test case 4: Single digit not happy number
let n4 = 4;
console.log(isHappy(n4)); // Expected: false
console.log(isHappyFloyd(n4)); // Expected: false
console.log(isHappyMath(n4)); // Expected: false

// Test case 5: Large happy number
let n5 = 100;
console.log(isHappy(n5)); // Expected: true
console.log(isHappyFloyd(n5)); // Expected: true
console.log(isHappyMath(n5)); // Expected: true

// Test case 6: Edge case - 7 is happy
let n6 = 7;
console.log(isHappy(n6)); // Expected: true
console.log(isHappyFloyd(n6)); // Expected: true
console.log(isHappyMath(n6)); // Expected: true

// Test case 7: Edge case - 3 is not happy
let n7 = 3;
console.log(isHappy(n7)); // Expected: false
console.log(isHappyFloyd(n7)); // Expected: false
console.log(isHappyMath(n7)); // Expected: false
```

---

## Algorithm Links / Liên kết thuật toán

- [`Math`](../../algorithms/algorithms/math.md) - Core technique for digit manipulation
- [`Two Pointers`](../../algorithms/patterns/two-pointers.md) - Used in Floyd's cycle detection algorithm

---

## Tips and Common Pitfalls / Mẹo và các lỗi thường gặp

### Tips / Mẹo

1. **Understanding the cycle**: All unhappy numbers eventually enter the cycle 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4. This is why checking for 4 works in the mathematical approach.

2. **Floyd's algorithm**: This is a classic cycle detection algorithm that uses two pointers moving at different speeds. If there's a cycle, they will eventually meet.

3. **Sum of squares helper**: Extracting the digit calculation into a helper function makes the code cleaner and easier to understand.

4. **Early termination**: In the mathematical approach, we can terminate as soon as we see 4, since we know all unhappy numbers eventually reach 4.

### Common Pitfalls / Lỗi thường gặp

1. **Infinite loop**: Without proper cycle detection, the algorithm can run forever for unhappy numbers.

2. **Incorrect digit extraction**: Make sure to use `n % 10` to get the last digit and `Math.floor(n / 10)` to remove the last digit.

3. **Not handling edge cases**: Make sure to handle the case where n is already 1.

4. **Wrong cycle detection**: In Floyd's algorithm, make sure fast moves two steps (sumOfSquares(sumOfSquares(fast))) and slow moves one step.

5. **Using the wrong condition**: In the mathematical approach, check for both 1 and 4, not just 1.

6. **Integer overflow**: For very large numbers, the sum of squares might overflow in some languages, but JavaScript handles this automatically.

7. **Not understanding why 4 is special**: The number 4 is part of the cycle that all unhappy numbers eventually enter. This is why checking for 4 works.
