# 190. Reverse Bits

## Problem Information

| Property               | Value                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| **Problem ID**         | 190                                                                                        |
| **URL**                | [https://leetcode.com/problems/reverse-bits/](https://leetcode.com/problems/reverse-bits/) |
| **Difficulty**         | Easy                                                                                       |
| **Category**           | Bit Manipulation                                                                           |
| **Tags**               | `Bit Manipulation`                                                                         |
| **Related Algorithms** | [`Bit Manipulation`](../../algorithms/algorithms/bit-manipulation.md)                      |
| **Related Patterns**   | [`Two Pointers`](../../algorithms/patterns/two-pointers.md)                                |

---

## Original Problem

Reverse bits of a given 32 bits unsigned integer.

**Note:**

- Note that in some languages, such as Java, there is no unsigned integer type. In this case, both input and output will be given as a signed integer type. They should not affect your implementation, as the integer's internal binary representation is the same, whether it is signed or unsigned.
- In Java, the compiler represents the signed integers using 2's complement notation. Therefore, in Example 2, the input represents the signed integer `-3` and the output represents the signed integer `-1073741825`.

**Example 1:**

```
Input: n = 00000010100101000001111010011100
Output:    964176192 (00111001011110000010100101000000)
Explanation: The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, so return 964176192 which its binary representation is 00111001011110000010100101000000.
```

**Example 2:**

```
Input: n = 11111111111111111111111111111101
Output:   3221225471 (10111111111111111111111111111111)
Explanation: The input binary string 11111111111111111111111111111101 represents the unsigned integer 4294967293, so return 3221225471 which its binary representation is 10111111111111111111111111111111.
```

**Constraints:**

- The input must be a binary string of length 32.

---

## Problem Analysis

### Understanding the Problem / Hiểu bài toán

**English:**
We need to reverse the bits of a 32-bit unsigned integer. This means the first bit becomes the last bit, the second bit becomes the second-to-last bit, and so on.

**Vietnamese:**
Chúng ta cần đảo ngược các bit của một số nguyên không dấu 32-bit. Điều này có nghĩa là bit đầu tiên sẽ trở thành bit cuối cùng, bit thứ hai sẽ trở thành bit gần cuối cùng, v.v.

### Thinking Process / Quy trình suy nghĩ

**English:**

1. We need to extract each bit from the input number and place it in the reversed position.
2. Since we're dealing with 32 bits, we can iterate from bit 0 to bit 31.
3. For each bit, we need to:
   - Extract the bit from the input
   - Place it in the correct position in the result

**Vietnamese:**

1. Chúng ta cần trích xuất từng bit từ số đầu vào và đặt nó vào vị trí đã đảo ngược.
2. Vì chúng ta đang xử lý 32 bit, chúng ta có thể lặp từ bit 0 đến bit 31.
3. Với mỗi bit, chúng ta cần:
   - Trích xuất bit từ đầu vào
   - Đặt nó vào vị trí đúng trong kết quả

### Examples / Ví dụ

**Example 1:**

```
Input:  00000010100101000001111010011100 (43261596)
Output: 00111001011110000010100101000000 (964176192)

Bit reversal:
Position 0 (LSB) -> Position 31 (MSB)
Position 1 -> Position 30
...
Position 31 (MSB) -> Position 0 (LSB)
```

**Example 2:**

```
Input:  11111111111111111111111111111101 (4294967293)
Output: 10111111111111111111111111111111 (3221225471)
```

---

## Solutions

### Solution 1: Bit Manipulation with Shifting / Thao tác bit với dịch chuyển

#### Idea / Ý tưởng

**English:**
Iterate through each bit of the input number from right to left (LSB to MSB), extract each bit, and place it in the reversed position in the result.

**Vietnamese:**
Lặp qua từng bit của số đầu vào từ phải sang trái (LSB đến MSB), trích xuất từng bit và đặt nó vào vị trí đã đảo ngược trong kết quả.

#### Algorithm / Thuật toán

```
1. Initialize result = 0
2. For i from 0 to 31:
   a. Extract the i-th bit from n using (n >> i) & 1
   b. Place this bit at position (31 - i) in result
   c. result = result | (extractedBit << (31 - i))
3. Return result
```

#### Code / Mã

```javascript
/**
 * Reverse bits of a 32-bit unsigned integer using bit manipulation
 * Đảo ngược các bit của số nguyên không dấu 32-bit
 *
 * @param {number} n - The input 32-bit unsigned integer / Số nguyên không dấu 32-bit đầu vào
 * @returns {number} - The reversed 32-bit unsigned integer / Số nguyên không dấu 32-bit đã đảo ngược
 * @timecomplexity O(1) - Fixed 32 iterations / 32 lần lặp cố định
 * @spacecomplexity O(1) - Only using a few variables / Chỉ sử dụng một vài biến
 */
function reverseBits(n) {
  let result = 0;

  for (let i = 0; i < 32; i++) {
    // Extract the i-th bit from n / Trích xuất bit thứ i từ n
    const bit = (n >> i) & 1;

    // Place the bit at the reversed position / Đặt bit vào vị trí đã đảo ngược
    result = result | (bit << (31 - i));
  }

  // Convert to unsigned 32-bit integer / Chuyển đổi thành số nguyên không dấu 32-bit
  return result >>> 0;
}

// Test cases / Các trường hợp kiểm tra
console.log(reverseBits(43261596)); // Output: 964176192
console.log(reverseBits(4294967293)); // Output: 3221225471
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

- Requires 32 iterations (though this is constant time)
- Can be optimized further

---

### Solution 2: Optimized Bit Manipulation / Thao tác bit tối ưu hóa

#### Idea / Ý tưởng

**English:**
Instead of iterating through all 32 bits, we can build the result by shifting the result left and adding the least significant bit of n, then shifting n right. This is more efficient as we don't need to calculate the reversed position.

**Vietnamese:**
Thay vì lặp qua tất cả 32 bit, chúng ta có thể xây dựng kết quả bằng cách dịch kết quả sang trái và thêm bit ít quan trọng nhất của n, sau đó dịch n sang phải. Cách này hiệu quả hơn vì chúng ta không cần tính vị trí đã đảo ngược.

#### Algorithm / Thuật toán

```
1. Initialize result = 0
2. For i from 0 to 31:
   a. Shift result left by 1: result = result << 1
   b. Add the LSB of n to result: result = result | (n & 1)
   c. Shift n right by 1: n = n >> 1
3. Return result
```

#### Code / Mã

```javascript
/**
 * Reverse bits of a 32-bit unsigned integer using optimized bit manipulation
 * Đảo ngược các bit của số nguyên không dấu 32-bit bằng thao tác bit tối ưu hóa
 *
 * @param {number} n - The input 32-bit unsigned integer / Số nguyên không dấu 32-bit đầu vào
 * @returns {number} - The reversed 32-bit unsigned integer / Số nguyên không dấu 32-bit đã đảo ngược
 * @timecomplexity O(1) - Fixed 32 iterations / 32 lần lặp cố định
 * @spacecomplexity O(1) - Only using a few variables / Chỉ sử dụng một vài biến
 */
function reverseBitsOptimized(n) {
  let result = 0;

  for (let i = 0; i < 32; i++) {
    // Shift result left to make room for the next bit
    // Dịch kết quả sang trái để tạo không gian cho bit tiếp theo
    result = result << 1;

    // Add the LSB of n to result
    // Thêm LSB của n vào kết quả
    result = result | (n & 1);

    // Shift n right to process the next bit
    // Dịch n sang phải để xử lý bit tiếp theo
    n = n >>> 1;
  }

  return result >>> 0;
}

// Test cases / Các trường hợp kiểm tra
console.log(reverseBitsOptimized(43261596)); // Output: 964176192
console.log(reverseBitsOptimized(4294967293)); // Output: 3221225471
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(1) - We always iterate exactly 32 times
- **Space Complexity:** O(1) - Only using a constant amount of extra space

**Vietnamese:**

- **Độ phức tạp thời gian:** O(1) - Chúng ta luôn lặp chính xác 32 lần
- **Độ phức tạp không gian:** O(1) - Chỉ sử dụng lượng không gian phụ không đổi

#### Pros / Ưu điểm

- More efficient than the first solution
- Simpler bit operations
- No need to calculate reversed positions

#### Cons / Nhược điểm

- Still requires 32 iterations
- Less intuitive than the first solution for beginners

---

### Solution 3: Divide and Conquer (Byte Swapping) / Chia để trị (Hoán đổi byte)

#### Idea / Ý tưởng

**English:**
We can reverse bits using a divide and conquer approach. First reverse the order of bytes, then reverse the order of nibbles (4 bits), then reverse the order of bit pairs, and finally reverse individual bits. This can be done using bit masks and shifts.

**Vietnamese:**
Chúng ta có thể đảo ngược bit bằng cách tiếp cận chia để trị. Đầu tiên đảo ngược thứ tự của các byte, sau đó đảo ngược thứ tự của các nibble (4 bit), sau đó đảo ngược thứ tự của các cặp bit, và cuối cùng đảo ngược từng bit riêng lẻ. Điều này có thể được thực hiện bằng cách sử dụng mặt nạ bit và dịch chuyển.

#### Algorithm / Thuật toán

```
1. Swap the two halves of the 32-bit number
2. Swap each half into two quarters
3. Swap each quarter into two eighths
4. Swap each eighth into two sixteenths
5. Swap each sixteenth into two thirty-seconds
```

#### Code / Mã

```javascript
/**
 * Reverse bits of a 32-bit unsigned integer using divide and conquer
 * Đảo ngược các bit của số nguyên không dấu 32-bit bằng chia để trị
 *
 * @param {number} n - The input 32-bit unsigned integer / Số nguyên không dấu 32-bit đầu vào
 * @returns {number} - The reversed 32-bit unsigned integer / Số nguyên không dấu 32-bit đã đảo ngược
 * @timecomplexity O(1) - Constant time operations / Các thao tác thời gian không đổi
 * @spacecomplexity O(1) - Only using a few variables / Chỉ sử dụng một vài biến
 */
function reverseBitsDivideConquer(n) {
  // Swap the two 16-bit halves / Hoán đổi hai nửa 16-bit
  n = (n >>> 16) | (n << 16);

  // Swap the two 8-bit halves of each 16-bit half / Hoán đổi hai nửa 8-bit của mỗi nửa 16-bit
  n = ((n & 0xff00ff00) >>> 8) | ((n & 0x00ff00ff) << 8);

  // Swap the two 4-bit halves of each 8-bit half / Hoán đổi hai nửa 4-bit của mỗi nửa 8-bit
  n = ((n & 0xf0f0f0f0) >>> 4) | ((n & 0x0f0f0f0f) << 4);

  // Swap the two 2-bit halves of each 4-bit half / Hoán đổi hai nửa 2-bit của mỗi nửa 4-bit
  n = ((n & 0xcccccccc) >>> 2) | ((n & 0x33333333) << 2);

  // Swap the two 1-bit halves of each 2-bit half / Hoán đổi hai nửa 1-bit của mỗi nửa 2-bit
  n = ((n & 0xaaaaaaaa) >>> 1) | ((n & 0x55555555) << 1);

  return n >>> 0;
}

// Test cases / Các trường hợp kiểm tra
console.log(reverseBitsDivideConquer(43261596)); // Output: 964176192
console.log(reverseBitsDivideConquer(4294967293)); // Output: 3221225471
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(1) - Constant time with no loops
- **Space Complexity:** O(1) - Only using a constant amount of extra space

**Vietnamese:**

- **Độ phức tạp thời gian:** O(1) - Thời gian không đổi không có vòng lặp
- **Độ phức tạp không gian:** O(1) - Chỉ sử dụng lượng không gian phụ không đổi

#### Pros / Ưu điểm

- Most efficient solution with no loops
- Constant time operations
- Can be parallelized in hardware

#### Cons / Nhược điểm

- More complex to understand
- Harder to implement correctly
- Bit masks can be confusing

---

## Solution Comparison / So sánh giải pháp

| Solution                       | Time | Space | Simplicity | Efficiency |
| ------------------------------ | ---- | ----- | ---------- | ---------- |
| Bit Manipulation with Shifting | O(1) | O(1)  | High       | Medium     |
| Optimized Bit Manipulation     | O(1) | O(1)  | Medium     | High       |
| Divide and Conquer             | O(1) | O(1)  | Low        | Very High  |

---

## Test Cases / Các trường hợp kiểm tra

```javascript
// Test cases for all solutions / Các trường hợp kiểm tra cho tất cả giải pháp

// Test case 1: Example 1
let n1 = 43261596; // Binary: 00000010100101000001111010011100
console.log(reverseBits(n1)); // Expected: 964176192
console.log(reverseBitsOptimized(n1)); // Expected: 964176192
console.log(reverseBitsDivideConquer(n1)); // Expected: 964176192

// Test case 2: Example 2
let n2 = 4294967293; // Binary: 11111111111111111111111111111101
console.log(reverseBits(n2)); // Expected: 3221225471
console.log(reverseBitsOptimized(n2)); // Expected: 3221225471
console.log(reverseBitsDivideConquer(n2)); // Expected: 3221225471

// Test case 3: All zeros
let n3 = 0; // Binary: 00000000000000000000000000000000
console.log(reverseBits(n3)); // Expected: 0
console.log(reverseBitsOptimized(n3)); // Expected: 0
console.log(reverseBitsDivideConquer(n3)); // Expected: 0

// Test case 4: All ones (except last bit)
let n4 = 2147483647; // Binary: 01111111111111111111111111111111
console.log(reverseBits(n4)); // Expected: 4294967294
console.log(reverseBitsOptimized(n4)); // Expected: 4294967294
console.log(reverseBitsDivideConquer(n4)); // Expected: 4294967294

// Test case 5: Single bit set at position 0
let n5 = 1; // Binary: 00000000000000000000000000000001
console.log(reverseBits(n5)); // Expected: 2147483648
console.log(reverseBitsOptimized(n5)); // Expected: 2147483648
console.log(reverseBitsDivideConquer(n5)); // Expected: 2147483648
```

---

## Algorithm Links / Liên kết thuật toán

- [`Bit Manipulation`](../../algorithms/algorithms/bit-manipulation.md) - Core technique used in all solutions
- [`Two Pointers`](../../algorithms/patterns/two-pointers.md) - Related pattern for processing pairs

---

## Tips and Common Pitfalls / Mẹo và các lỗi thường gặp

### Tips / Mẹo

1. **Use unsigned right shift (`>>>`)**: In JavaScript, the right shift operator (`>>`) is arithmetic and preserves the sign bit. Use `>>>` for unsigned right shift.

2. **Convert to unsigned**: After reversing bits, use `>>> 0` to convert the result to an unsigned 32-bit integer.

3. **Bit masks**: Use hexadecimal notation for bit masks as they're more readable (e.g., `0xFF00FF00` instead of `4278255360`).

### Common Pitfalls / Lỗi thường gặp

1. **Using signed right shift**: Using `>>` instead of `>>>` can cause issues with the sign bit.

2. **Not handling 32-bit overflow**: JavaScript numbers are 64-bit floating point, so you need to ensure the result is treated as a 32-bit unsigned integer.

3. **Off-by-one errors**: Make sure you're iterating from 0 to 31 (32 bits total).

4. **Incorrect bit extraction**: Remember that `(n >> i) & 1` extracts the i-th bit, not the (i+1)-th bit.

5. **Forgetting to convert result**: After reversing, use `result >>> 0` to ensure it's treated as an unsigned 32-bit integer.
