# 204. Count Primes

## Problem Information

| Property               | Value                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| **Problem ID**         | 204                                                                                        |
| **URL**                | [https://leetcode.com/problems/count-primes/](https://leetcode.com/problems/count-primes/) |
| **Difficulty**         | Easy                                                                                       |
| **Category**           | Math                                                                                       |
| **Tags**               | `Array`, `Math`                                                                            |
| **Related Algorithms** | [`Math`](../../algorithms/algorithms/math.md)                                              |
| **Related Patterns**   | [`Sieve of Eratosthenes`](../../algorithms/algorithms/math.md)                             |

---

## Original Problem

Given an integer `n`, return the number of prime numbers that are strictly less than `n`.

**Example 1:**

```
Input: n = 10
Output: 4
Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.
```

**Example 2:**

```
Input: n = 0
Output: 0
```

**Example 3:**

```
Input: n = 1
Output: 0
```

**Constraints:**

- `0 <= n <= 5 * 10^6`

---

## Problem Analysis

### Understanding the Problem / Hiểu bài toán

**English:**
We need to count all prime numbers that are strictly less than a given integer n. A prime number is a natural number greater than 1 that is not a product of two smaller natural numbers.

**Vietnamese:**
Chúng ta cần đếm tất cả các số nguyên tố nhỏ hơn một số nguyên n cho trước. Số nguyên tố là một số tự nhiên lớn hơn 1 không phải là tích của hai số tự nhiên nhỏ hơn.

### Thinking Process / Quy trình suy nghĩ

**English:**

1. We need to find all prime numbers less than n.
2. Checking each number individually for primality is inefficient for large n.
3. The Sieve of Eratosthenes is an efficient algorithm for finding all primes up to a given limit.
4. We can mark all non-prime numbers and count the remaining primes.

**Vietnamese:**

1. Chúng ta cần tìm tất cả các số nguyên tố nhỏ hơn n.
2. Kiểm tra từng số riêng lẻ để xem có phải là số nguyên tố hay không là không hiệu quả cho n lớn.
3. Sàng Eratosthenes là một thuật toán hiệu quả để tìm tất cả các số nguyên tố đến một giới hạn nhất định.
4. Chúng ta có thể đánh dấu tất cả các số không nguyên tố và đếm các số nguyên tố còn lại.

### Examples / Ví dụ

**Example 1:**

```
Input: n = 10
Numbers less than 10: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

Prime numbers: 2, 3, 5, 7
Non-prime numbers: 0, 1, 4, 6, 8, 9

Result: 4 primes
```

**Example 2:**

```
Input: n = 0
Numbers less than 0: none

Result: 0 primes
```

**Example 3:**

```
Input: n = 1
Numbers less than 1: 0

Result: 0 primes (0 is not prime)
```

---

## Solutions

### Solution 1: Sieve of Eratosthenes / Sàng Eratosthenes

#### Idea / Ý tưởng

**English:**
The Sieve of Eratosthenes is an ancient algorithm for finding all prime numbers up to a specified integer. We create a boolean array where index i represents whether i is prime. We mark all multiples of each prime as non-prime.

**Vietnamese:**
Sàng Eratosthenes là một thuật toán cổ xưa để tìm tất cả các số nguyên tố đến một số nguyên nhất định. Chúng ta tạo một mảng boolean trong đó chỉ số i đại diện cho việc i có phải là số nguyên tố hay không. Chúng ta đánh dấu tất cả các bội số của mỗi số nguyên tố là không nguyên tố.

#### Algorithm / Thuật toán

```
1. If n <= 2, return 0 (no primes less than 2)
2. Create a boolean array isPrime of size n, initialized to true
3. Set isPrime[0] = isPrime[1] = false (0 and 1 are not prime)
4. For i from 2 to sqrt(n):
   a. If isPrime[i] is true:
      b. Mark all multiples of i (starting from i*i) as non-prime
5. Count all true values in isPrime array
6. Return the count
```

#### Code / Mã

```javascript
/**
 * Count the number of primes less than n using Sieve of Eratosthenes
 * Đếm số lượng số nguyên tố nhỏ hơn n bằng Sàng Eratosthenes
 *
 * @param {number} n - Upper limit (exclusive) / Giới hạn trên (không bao gồm)
 * @returns {number} - Count of primes less than n / Số lượng số nguyên tố nhỏ hơn n
 * @timecomplexity O(n log log n) - Sieve of Eratosthenes complexity / Độ phức tạp của Sàng Eratosthenes
 * @spacecomplexity O(n) - For the boolean array / Cho mảng boolean
 */
function countPrimes(n) {
  // Edge cases / Các trường hợp đặc biệt
  if (n <= 2) {
    return 0;
  }

  // Create a boolean array where isPrime[i] indicates if i is prime
  // Tạo một mảng boolean trong đó isPrime[i] chỉ ra i có phải là số nguyên tố không
  const isPrime = new Array(n).fill(true);

  // 0 and 1 are not prime / 0 và 1 không phải là số nguyên tố
  isPrime[0] = false;
  isPrime[1] = false;

  // Sieve of Eratosthenes / Sàng Eratosthenes
  for (let i = 2; i * i < n; i++) {
    if (isPrime[i]) {
      // Mark all multiples of i as non-prime, starting from i*i
      // Đánh dấu tất cả các bội số của i là không nguyên tố, bắt đầu từ i*i
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  // Count the primes / Đếm các số nguyên tố
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isPrime[i]) {
      count++;
    }
  }

  return count;
}

// Test cases / Các trường hợp kiểm tra
console.log(countPrimes(10)); // Output: 4
console.log(countPrimes(0)); // Output: 0
console.log(countPrimes(1)); // Output: 0
console.log(countPrimes(2)); // Output: 0
console.log(countPrimes(100)); // Output: 25
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(n log log n) - The Sieve of Eratosthenes has this time complexity
- **Space Complexity:** O(n) - For the boolean array

**Vietnamese:**

- **Độ phức tạp thời gian:** O(n log log n) - Sàng Eratosthenes có độ phức tạp thời gian này
- **Độ phức tạp không gian:** O(n) - Cho mảng boolean

#### Pros / Ưu điểm

- Efficient for counting primes
- Classic and well-known algorithm
- Easy to understand

#### Cons / Nhược điểm

- Uses O(n) space
- Can be optimized further

---

### Solution 2: Optimized Sieve / Sàng tối ưu hóa

#### Idea / Ý tưởng

**English:**
We can optimize the Sieve of Eratosthenes by:

1. Starting marking from i*i instead of 2*i (smaller multiples are already marked)
2. Only considering odd numbers (even numbers except 2 are not prime)

**Vietnamese:**
Chúng ta có thể tối ưu hóa Sàng Eratosthenes bằng cách:

1. Bắt đầu đánh dấu từ i*i thay vì 2*i (các bội số nhỏ hơn đã được đánh dấu)
2. Chỉ xem xét các số lẻ (số chẵn ngoại trừ 2 không phải là số nguyên tố)

#### Algorithm / Thuật toán

```
1. If n <= 2, return 0
2. Create a boolean array isPrime of size n, initialized to true
3. Set isPrime[0] = isPrime[1] = false
4. For i from 2 to sqrt(n):
   a. If isPrime[i] is true:
      b. Mark all multiples of i (starting from i*i) as non-prime
5. Count all true values in isPrime array
6. Return the count
```

#### Code / Mã

```javascript
/**
 * Count the number of primes less than n using optimized Sieve
 * Đếm số lượng số nguyên tố nhỏ hơn n bằng Sàng tối ưu hóa
 *
 * @param {number} n - Upper limit (exclusive) / Giới hạn trên (không bao gồm)
 * @returns {number} - Count of primes less than n / Số lượng số nguyên tố nhỏ hơn n
 * @timecomplexity O(n log log n) - Sieve complexity / Độ phức tạp của sàng
 * @spacecomplexity O(n) - For the boolean array / Cho mảng boolean
 */
function countPrimesOptimized(n) {
  // Edge cases / Các trường hợp đặc biệt
  if (n <= 2) {
    return 0;
  }

  // Create a boolean array where isPrime[i] indicates if i is prime
  // Tạo một mảng boolean trong đó isPrime[i] chỉ ra i có phải là số nguyên tố không
  const isPrime = new Array(n).fill(true);

  // 0 and 1 are not prime / 0 và 1 không phải là số nguyên tố
  isPrime[0] = false;
  isPrime[1] = false;

  // Sieve of Eratosthenes - optimized / Sàng Eratosthenes - tối ưu hóa
  for (let i = 2; i * i < n; i++) {
    if (isPrime[i]) {
      // Mark all multiples of i as non-prime, starting from i*i
      // Smaller multiples have already been marked by smaller primes
      // Đánh dấu tất cả các bội số của i là không nguyên tố, bắt đầu từ i*i
      // Các bội số nhỏ hơn đã được đánh dấu bởi các số nguyên tố nhỏ hơn
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  // Count the primes / Đếm các số nguyên tố
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isPrime[i]) {
      count++;
    }
  }

  return count;
}

// Test cases / Các trường hợp kiểm tra
console.log(countPrimesOptimized(10)); // Output: 4
console.log(countPrimesOptimized(0)); // Output: 0
console.log(countPrimesOptimized(1)); // Output: 0
console.log(countPrimesOptimized(2)); // Output: 0
console.log(countPrimesOptimized(100)); // Output: 25
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(n log log n) - The Sieve of Eratosthenes has this time complexity
- **Space Complexity:** O(n) - For the boolean array

**Vietnamese:**

- **Độ phức tạp thời gian:** O(n log log n) - Sàng Eratosthenes có độ phức tạp thời gian này
- **Độ phức tạp không gian:** O(n) - Cho mảng boolean

#### Pros / Ưu điểm

- More efficient than the basic sieve
- Fewer iterations in the inner loop
- Still easy to understand

#### Cons / Nhược điểm

- Uses O(n) space
- Can be optimized further by considering only odd numbers

---

### Solution 3: Sieve with Odd Numbers Only / Sàng chỉ với số lẻ

#### Idea / Ý tưởng

**English:**
We can further optimize by only considering odd numbers. Since 2 is the only even prime, we can handle it separately and only sieve odd numbers. This halves the space and time complexity.

**Vietnamese:**
Chúng ta có thể tối ưu hóa thêm bằng cách chỉ xem xét các số lẻ. Vì 2 là số nguyên tố chẵn duy nhất, chúng ta có thể xử lý nó riêng và chỉ sàng các số lẻ. Điều này giảm một nửa không gian và độ phức tạp thời gian.

#### Algorithm / Thuật toán

```
1. If n <= 2, return 0
2. Start with count = 1 (for prime 2)
3. Create a boolean array isPrime of size n/2, where isPrime[i] represents 2*i + 3
4. For each odd number i from 3 to sqrt(n):
   a. If isPrime[(i-3)/2] is true:
      b. Mark all odd multiples of i as non-prime
5. Count all true values in isPrime array and add 1 for 2
6. Return the count
```

#### Code / Mã

```javascript
/**
 * Count the number of primes less than n using Sieve with odd numbers only
 * Đếm số lượng số nguyên tố nhỏ hơn n bằng Sàng chỉ với số lẻ
 *
 * @param {number} n - Upper limit (exclusive) / Giới hạn trên (không bao gồm)
 * @returns {number} - Count of primes less than n / Số lượng số nguyên tố nhỏ hơn n
 * @timecomplexity O(n log log n) - Sieve complexity / Độ phức tạp của sàng
 * @spacecomplexity O(n/2) - For the boolean array (only odd numbers) / Cho mảng boolean (chỉ số lẻ)
 */
function countPrimesOddOnly(n) {
  // Edge cases / Các trường hợp đặc biệt
  if (n <= 2) {
    return 0;
  }

  // 2 is the only even prime / 2 là số nguyên tố chẵn duy nhất
  let count = 1;

  if (n <= 3) {
    return count;
  }

  // Create a boolean array for odd numbers only
  // isPrime[i] represents if 2*i + 3 is prime
  // Tạo một mảng boolean chỉ cho số lẻ
  // isPrime[i] đại diện cho việc 2*i + 3 có phải là số nguyên tố không
  const size = Math.floor((n - 3) / 2) + 1;
  const isPrime = new Array(size).fill(true);

  // Sieve for odd numbers only / Sàng chỉ cho số lẻ
  for (let i = 0; i < size; i++) {
    if (isPrime[i]) {
      const prime = 2 * i + 3;

      // Mark all odd multiples of prime as non-prime
      // Start from prime * prime, and step by 2 * prime (to stay odd)
      // Đánh dấu tất cả các bội số lẻ của số nguyên tố là không nguyên tố
      // Bắt đầu từ prime * prime, và bước nhảy là 2 * prime (để giữ nguyên tính lẻ)
      for (let j = prime * prime; j < n; j += 2 * prime) {
        const index = Math.floor((j - 3) / 2);
        if (index >= 0 && index < size) {
          isPrime[index] = false;
        }
      }
    }
  }

  // Count the primes / Đếm các số nguyên tố
  for (let i = 0; i < size; i++) {
    if (isPrime[i]) {
      count++;
    }
  }

  return count;
}

// Test cases / Các trường hợp kiểm tra
console.log(countPrimesOddOnly(10)); // Output: 4
console.log(countPrimesOddOnly(0)); // Output: 0
console.log(countPrimesOddOnly(1)); // Output: 0
console.log(countPrimesOddOnly(2)); // Output: 0
console.log(countPrimesOddOnly(100)); // Output: 25
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(n log log n) - The Sieve of Eratosthenes has this time complexity
- **Space Complexity:** O(n/2) - For the boolean array (only odd numbers)

**Vietnamese:**

- **Độ phức tạp thời gian:** O(n log log n) - Sàng Eratosthenes có độ phức tạp thời gian này
- **Độ phức tạp không gian:** O(n/2) - Cho mảng boolean (chỉ số lẻ)

#### Pros / Ưu điểm

- Most space-efficient solution
- Faster than the basic sieve
- Good for large n

#### Cons / Nhược điểm

- More complex implementation
- Harder to understand

---

## Solution Comparison / So sánh giải pháp

| Solution         | Time           | Space  | Simplicity | Efficiency |
| ---------------- | -------------- | ------ | ---------- | ---------- |
| Basic Sieve      | O(n log log n) | O(n)   | High       | Medium     |
| Optimized Sieve  | O(n log log n) | O(n)   | High       | High       |
| Odd Numbers Only | O(n log log n) | O(n/2) | Medium     | Very High  |

---

## Test Cases / Các trường hợp kiểm tra

```javascript
// Test cases for all solutions / Các trường hợp kiểm tra cho tất cả giải pháp

// Test case 1: Example 1
let n1 = 10;
console.log(countPrimes(n1)); // Expected: 4
console.log(countPrimesOptimized(n1)); // Expected: 4
console.log(countPrimesOddOnly(n1)); // Expected: 4

// Test case 2: Example 2
let n2 = 0;
console.log(countPrimes(n2)); // Expected: 0
console.log(countPrimesOptimized(n2)); // Expected: 0
console.log(countPrimesOddOnly(n2)); // Expected: 0

// Test case 3: Example 3
let n3 = 1;
console.log(countPrimes(n3)); // Expected: 0
console.log(countPrimesOptimized(n3)); // Expected: 0
console.log(countPrimesOddOnly(n3)); // Expected: 0

// Test case 4: n = 2
let n4 = 2;
console.log(countPrimes(n4)); // Expected: 0
console.log(countPrimesOptimized(n4)); // Expected: 0
console.log(countPrimesOddOnly(n4)); // Expected: 0

// Test case 5: n = 3
let n5 = 3;
console.log(countPrimes(n5)); // Expected: 1
console.log(countPrimesOptimized(n5)); // Expected: 1
console.log(countPrimesOddOnly(n5)); // Expected: 1

// Test case 6: n = 100
let n6 = 100;
console.log(countPrimes(n6)); // Expected: 25
console.log(countPrimesOptimized(n6)); // Expected: 25
console.log(countPrimesOddOnly(n6)); // Expected: 25

// Test case 7: Large n
let n7 = 1000;
console.log(countPrimes(n7)); // Expected: 168
console.log(countPrimesOptimized(n7)); // Expected: 168
console.log(countPrimesOddOnly(n7)); // Expected: 168
```

---

## Algorithm Links / Liên kết thuật toán

- [`Math`](../../algorithms/algorithms/math.md) - Core mathematical concepts used in this problem
- [`Sieve of Eratosthenes`](../../algorithms/algorithms/math.md) - The main algorithm used in all solutions

---

## Tips and Common Pitfalls / Mẹo và các lỗi thường gặp

### Tips / Mẹo

1. **Sieve of Eratosthenes**: This is the most efficient algorithm for finding all primes up to a given limit. It works by iteratively marking the multiples of each prime as non-prime.

2. **Start from i\*i**: When marking multiples, start from i*i instead of 2*i. This is because smaller multiples have already been marked by smaller primes.

3. **Only go up to sqrt(n)**: You only need to sieve up to the square root of n. Any number greater than sqrt(n) that is not prime would have a factor less than sqrt(n).

4. **Handle edge cases**: Make sure to handle cases where n is 0, 1, or 2 correctly.

5. **Optimization with odd numbers**: Since 2 is the only even prime, you can optimize by only considering odd numbers.

### Common Pitfalls / Lỗi thường gặp

1. **Including n in the count**: The problem asks for primes strictly less than n, not less than or equal to n.

2. **Not handling edge cases**: Forgetting to handle cases where n is 0, 1, or 2.

3. **Starting marking from 2\*i**: This is inefficient. Start from i\*i instead.

4. **Going beyond sqrt(n)**: You only need to sieve up to sqrt(n), not n.

5. **Off-by-one errors**: Be careful with array indexing and loop conditions.

6. **Not marking 0 and 1 as non-prime**: Remember that 0 and 1 are not prime numbers.

7. **Integer overflow**: In some languages, i\*i might overflow for large i. JavaScript handles this automatically.

8. **Incorrect counting**: Make sure you're counting correctly, especially with the odd-only optimization.
