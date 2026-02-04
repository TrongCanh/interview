# 191. Number of 1 Bits

## Problem Information

| Property               | Value                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| **Problem ID**         | 191                                                                                                |
| **URL**                | [https://leetcode.com/problems/number-of-1-bits/](https://leetcode.com/problems/number-of-1-bits/) |
| **Difficulty**         | Easy                                                                                               |
| **Category**           | Bit Manipulation                                                                                   |
| **Tags**               | `Bit Manipulation`                                                                                 |
| **Related Algorithms** | [`Bit Manipulation`](../../algorithms/algorithms/bit-manipulation.md)                              |
| **Related Patterns**   | [`Two Pointers`](../../algorithms/patterns/two-pointers.md)                                        |

---

## Original Problem

Write a function that takes the binary representation of an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).

**Note:**

- Note that in some languages, such as Java, there is no unsigned integer type. In this case, the input will be given as a signed integer type. It should not affect your implementation, as the integer's internal binary representation is the same, whether it is signed or unsigned.
- In Java, the compiler represents the signed integers using 2's complement notation. Therefore, in Example 3, the input represents the signed integer `-3`.

**Example 1:**

```
Input: n = 00000000000000000000000000001011
Output: 3
Explanation: The input binary string 00000000000000000000000000001011 has a total of three '1' bits.
```

**Example 2:**

```
Input: n = 00000000000000000000000010000000
Output: 1
Explanation: The input binary string 00000000000000000000000010000000 has a total of one '1' bit.
```

**Example 3:**

```
Input: n = 11111111111111111111111111111101
Output: 31
Explanation: The input binary string 11111111111111111111111111111101 has a total of thirty one '1' bits.
```

**Constraints:**

- The input must be a binary string of length 32.

---

## Problem Analysis

### Understanding the Problem / Hiểu bài toán

**English:**
We need to count the number of '1' bits in the binary representation of a 32-bit unsigned integer. This is also known as the Hamming weight or population count.

**Vietnamese:**
Chúng ta cần đếm số lượng bit '1' trong biểu diễn nhị phân của một số nguyên không dấu 32-bit. Điều này còn được gọi là trọng số Hamming hoặc population count.

### Thinking Process / Quy trình suy nghĩ

**English:**

1. We need to examine each bit of the 32-bit integer.
2. For each bit, check if it's a '1' or '0'.
3. Count how many '1' bits we find.
4. Return the total count.

**Vietnamese:**

1. Chúng ta cần kiểm tra từng bit của số nguyên 32-bit.
2. Với mỗi bit, kiểm tra xem nó là '1' hay '0'.
3. Đếm số lượng bit '1' chúng ta tìm thấy.
4. Trả về tổng số đếm được.

### Examples / Ví dụ

**Example 1:**

```
Input:  00000000000000000000000000001011 (11 in decimal)
Output: 3

Explanation:
- Bit 0: 1
- Bit 1: 1
- Bit 2: 0
- Bit 3: 1
- All other bits: 0
Total: 3 ones
```

**Example 2:**

```
Input:  00000000000000000000000010000000 (128 in decimal)
Output: 1

Explanation:
- Only bit 7 is set to 1
Total: 1 one
```

**Example 3:**

```
Input:  11111111111111111111111111111101 (4294967293 in unsigned, -3 in signed)
Output: 31

Explanation:
- All bits are 1 except bit 1
Total: 31 ones
```

---

## Solutions

### Solution 1: Bit Manipulation - Loop and Shift / Thao tác bit - Vòng lặp và dịch chuyển

#### Idea / Ý tưởng

**English:**
Iterate through all 32 bits of the integer. For each bit, check if it's set to 1 using a bitwise AND operation with a mask, then count the number of set bits.

**Vietnamese:**
Lặp qua tất cả 32 bit của số nguyên. Với mỗi bit, kiểm tra xem nó có được đặt thành 1 hay không bằng cách sử dụng phép AND bit với một mặt nạ, sau đó đếm số lượng bit được đặt.

#### Algorithm / Thuật toán

```
1. Initialize count = 0
2. For i from 0 to 31:
   a. Extract the i-th bit using (n >> i) & 1
   b. If the bit is 1, increment count
3. Return count
```

#### Code / Mã

```javascript
/**
 * Count the number of 1 bits in a 32-bit unsigned integer using loop and shift
 * Đếm số lượng bit 1 trong số nguyên không dấu 32-bit bằng vòng lặp và dịch chuyển
 *
 * @param {number} n - The input 32-bit unsigned integer / Số nguyên không dấu 32-bit đầu vào
 * @returns {number} - The number of 1 bits / Số lượng bit 1
 * @timecomplexity O(1) - Fixed 32 iterations / 32 lần lặp cố định
 * @spacecomplexity O(1) - Only using a few variables / Chỉ sử dụng một vài biến
 */
function hammingWeight(n) {
  let count = 0;

  for (let i = 0; i < 32; i++) {
    // Extract the i-th bit / Trích xuất bit thứ i
    const bit = (n >>> i) & 1;

    // If bit is 1, increment count / Nếu bit là 1, tăng đếm
    if (bit === 1) {
      count++;
    }
  }

  return count;
}

// Test cases / Các trường hợp kiểm tra
console.log(hammingWeight(11)); // Output: 3
console.log(hammingWeight(128)); // Output: 1
console.log(hammingWeight(4294967293)); // Output: 31
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(1) - We always iterate exactly 32 times
- **Space Complexity:** O(1) - Only using a constant amount of extra space

**Vietnamese:**

- **Độ phức tạp thời gian:** O(1) - Chúng ta luôn lặp chính xác 32 lần
- **Độ phức tạp không gian:** O(1) - Chỉ sử dụng lượng không gian phụ không đổi

#### Pros / Ưu điểm

- Simple and straightforward implementation
- Easy to understand
- Works correctly for all 32-bit unsigned integers

#### Cons / Nhược điểm

- Always iterates 32 times even if the number has fewer set bits
- Can be optimized further

---

### Solution 2: Brian Kernighan's Algorithm / Thuật toán Brian Kernighan

#### Idea / Ý tưởng

**English:**
Brian Kernighan's algorithm is an optimization that only iterates as many times as there are set bits in the number. The key insight is that `n & (n - 1)` removes the rightmost set bit from n.

**Vietnamese:**
Thuật toán Brian Kernighan là một tối ưu hóa chỉ lặp nhiều lần bằng số lượng bit được đặt trong số. Sự hiểu biết chính là `n & (n - 1)` loại bỏ bit được đặt ngoài cùng bên phải khỏi n.

#### Algorithm / Thuật toán

```
1. Initialize count = 0
2. While n is not 0:
   a. n = n & (n - 1)  // This removes the rightmost set bit
   b. Increment count
3. Return count
```

#### Code / Mã

```javascript
/**
 * Count the number of 1 bits using Brian Kernighan's algorithm
 * Đếm số lượng bit 1 bằng thuật toán Brian Kernighan
 *
 * @param {number} n - The input 32-bit unsigned integer / Số nguyên không dấu 32-bit đầu vào
 * @returns {number} - The number of 1 bits / Số lượng bit 1
 * @timecomplexity O(k) where k is the number of set bits / O(k) với k là số lượng bit được đặt
 * @spacecomplexity O(1) - Only using a few variables / Chỉ sử dụng một vài biến
 */
function hammingWeightKernighan(n) {
  let count = 0;

  // Keep removing the rightmost set bit until n becomes 0
  // Tiếp tục loại bỏ bit được đặt ngoài cùng bên phải cho đến khi n bằng 0
  while (n !== 0) {
    // Remove the rightmost set bit / Loại bỏ bit được đặt ngoài cùng bên phải
    n = n & (n - 1);
    count++;
  }

  return count;
}

// Test cases / Các trường hợp kiểm tra
console.log(hammingWeightKernighan(11)); // Output: 3
console.log(hammingWeightKernighan(128)); // Output: 1
console.log(hammingWeightKernighan(4294967293)); // Output: 31
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(k) where k is the number of set bits in n - We only iterate for each set bit
- **Space Complexity:** O(1) - Only using a constant amount of extra space

**Vietnamese:**

- **Độ phức tạp thời gian:** O(k) với k là số lượng bit được đặt trong n - Chúng ta chỉ lặp cho mỗi bit được đặt
- **Độ phức tạp không gian:** O(1) - Chỉ sử dụng lượng không gian phụ không đổi

#### Pros / Ưu điểm

- Most efficient solution - only iterates for each set bit
- Optimal for sparse numbers (numbers with few set bits)
- Elegant and concise

#### Cons / Nhược điểm

- Less intuitive than the simple loop approach
- Still O(32) in the worst case (all bits set)

---

### Solution 3: Lookup Table / Bảng tra cứu

#### Idea / Ý tưởng

**English:**
We can pre-compute the number of set bits for all possible 8-bit values (0-255) and store them in a lookup table. Then, we can break the 32-bit number into four 8-bit chunks and look up the count for each chunk.

**Vietnamese:**
Chúng ta có thể tính toán trước số lượng bit được đặt cho tất cả các giá trị 8-bit có thể (0-255) và lưu trữ chúng trong một bảng tra cứu. Sau đó, chúng ta có thể chia số 32-bit thành bốn phần 8-bit và tra cứu số đếm cho mỗi phần.

#### Algorithm / Thuật toán

```
1. Pre-compute a lookup table for all 8-bit values (0-255)
2. Break the 32-bit number into four 8-bit chunks
3. Look up the count for each chunk from the table
4. Sum the counts and return
```

#### Code / Mã

```javascript
/**
 * Pre-computed lookup table for 8-bit values
 * Bảng tra cứu tính toán trước cho các giá trị 8-bit
 */
const BIT_COUNTS = [
  0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3,
  3, 4, 3, 4, 4, 5, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4,
  3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4,
  4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4, 3, 4, 4, 5,
  3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 1, 2,
  2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5,
  4, 5, 5, 6, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5,
  5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
  3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5,
  5, 6, 5, 6, 6, 7, 4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8,
];

/**
 * Count the number of 1 bits using a lookup table
 * Đếm số lượng bit 1 bằng bảng tra cứu
 *
 * @param {number} n - The input 32-bit unsigned integer / Số nguyên không dấu 32-bit đầu vào
 * @returns {number} - The number of 1 bits / Số lượng bit 1
 * @timecomplexity O(1) - Constant time with 4 lookups / Thời gian không đổi với 4 lần tra cứu
 * @spacecomplexity O(1) - Fixed lookup table / Bảng tra cứu cố định
 */
function hammingWeightLookup(n) {
  // Mask to extract 8 bits at a time / Mặt nạ để trích xuất 8 bit một lần
  const MASK = 0xff;

  // Extract four 8-bit chunks and look up their counts
  // Trích xuất bốn phần 8-bit và tra cứu số đếm của chúng
  const count =
    BIT_COUNTS[n & MASK] +
    BIT_COUNTS[(n >>> 8) & MASK] +
    BIT_COUNTS[(n >>> 16) & MASK] +
    BIT_COUNTS[(n >>> 24) & MASK];

  return count;
}

// Test cases / Các trường hợp kiểm tra
console.log(hammingWeightLookup(11)); // Output: 3
console.log(hammingWeightLookup(128)); // Output: 1
console.log(hammingWeightLookup(4294967293)); // Output: 31
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(1) - Constant time with exactly 4 table lookups
- **Space Complexity:** O(1) - The lookup table has a fixed size of 256 entries

**Vietnamese:**

- **Độ phức tạp thời gian:** O(1) - Thời gian không đổi với chính xác 4 lần tra cứu bảng
- **Độ phức tạp không gian:** O(1) - Bảng tra cứu có kích thước cố định là 256 mục

#### Pros / Ưu điểm

- Very fast - only 4 table lookups
- Consistent performance regardless of the number of set bits
- Can be easily extended to larger bit widths

#### Cons / Nhược điểm

- Requires additional space for the lookup table
- More complex to implement
- Pre-computation overhead (though this is done once)

---

## Solution Comparison / So sánh giải pháp

| Solution          | Time | Space | Simplicity | Efficiency |
| ----------------- | ---- | ----- | ---------- | ---------- |
| Loop and Shift    | O(1) | O(1)  | High       | Medium     |
| Brian Kernighan's | O(k) | O(1)  | Medium     | High       |
| Lookup Table      | O(1) | O(1)  | Low        | Very High  |

---

## Test Cases / Các trường hợp kiểm tra

```javascript
// Test cases for all solutions / Các trường hợp kiểm tra cho tất cả giải pháp

// Test case 1: Example 1
let n1 = 11; // Binary: 00000000000000000000000000001011
console.log(hammingWeight(n1)); // Expected: 3
console.log(hammingWeightKernighan(n1)); // Expected: 3
console.log(hammingWeightLookup(n1)); // Expected: 3

// Test case 2: Example 2
let n2 = 128; // Binary: 00000000000000000000000010000000
console.log(hammingWeight(n2)); // Expected: 1
console.log(hammingWeightKernighan(n2)); // Expected: 1
console.log(hammingWeightLookup(n2)); // Expected: 1

// Test case 3: Example 3
let n3 = 4294967293; // Binary: 11111111111111111111111111111101
console.log(hammingWeight(n3)); // Expected: 31
console.log(hammingWeightKernighan(n3)); // Expected: 31
console.log(hammingWeightLookup(n3)); // Expected: 31

// Test case 4: All zeros
let n4 = 0; // Binary: 00000000000000000000000000000000
console.log(hammingWeight(n4)); // Expected: 0
console.log(hammingWeightKernighan(n4)); // Expected: 0
console.log(hammingWeightLookup(n4)); // Expected: 0

// Test case 5: All ones
let n5 = 4294967295; // Binary: 11111111111111111111111111111111
console.log(hammingWeight(n5)); // Expected: 32
console.log(hammingWeightKernighan(n5)); // Expected: 32
console.log(hammingWeightLookup(n5)); // Expected: 32

// Test case 6: Single bit set
let n6 = 1; // Binary: 00000000000000000000000000000001
console.log(hammingWeight(n6)); // Expected: 1
console.log(hammingWeightKernighan(n6)); // Expected: 1
console.log(hammingWeightLookup(n6)); // Expected: 1
```

---

## Algorithm Links / Liên kết thuật toán

- [`Bit Manipulation`](../../algorithms/algorithms/bit-manipulation.md) - Core technique used in all solutions
- [`Two Pointers`](../../algorithms/patterns/two-pointers.md) - Related pattern for processing pairs

---

## Tips and Common Pitfalls / Mẹo và các lỗi thường gặp

### Tips / Mẹo

1. **Use unsigned right shift (`>>>`)**: In JavaScript, the right shift operator (`>>`) is arithmetic and preserves the sign bit. Use `>>>` for unsigned right shift.

2. **Brian Kernighan's trick**: The expression `n & (n - 1)` removes the rightmost set bit. This is a powerful optimization.

3. **Lookup table optimization**: For performance-critical code, pre-computing a lookup table can significantly speed up bit counting operations.

### Common Pitfalls / Lỗi thường gặp

1. **Using signed right shift**: Using `>>` instead of `>>>` can cause issues with negative numbers.

2. **Not handling 32-bit overflow**: JavaScript numbers are 64-bit floating point, so you need to ensure the input is treated as a 32-bit unsigned integer.

3. **Off-by-one errors**: Make sure you're iterating from 0 to 31 (32 bits total).

4. **Incorrect bit extraction**: Remember that `(n >> i) & 1` extracts the i-th bit, not the (i+1)-th bit.

5. **Infinite loop with Brian Kernighan's**: Make sure the loop condition is `n !== 0` (not `n > 0`) to handle the case where n is a large unsigned integer.

6. **Lookup table size**: Make sure the lookup table covers all possible 8-bit values (0-255).
