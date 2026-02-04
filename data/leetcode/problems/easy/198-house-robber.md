# 198. House Robber

## Problem Information

| Property               | Value                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| **Problem ID**         | 198                                                                                        |
| **URL**                | [https://leetcode.com/problems/house-robber/](https://leetcode.com/problems/house-robber/) |
| **Difficulty**         | Easy                                                                                       |
| **Category**           | Dynamic Programming                                                                        |
| **Tags**               | `Array`, `Dynamic Programming`                                                             |
| **Related Algorithms** | [`Dynamic Programming`](../../algorithms/dynamic-programming/dp-basics.md)                 |
| **Related Patterns**   | [`Sliding Window`](../../algorithms/patterns/sliding-window.md)                            |

---

## Original Problem

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

**Example 1:**

```
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
```

**Example 2:**

```
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.
```

**Constraints:**

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 400`

---

## Problem Analysis

### Understanding the Problem / Hiểu bài toán

**English:**
We need to find the maximum amount of money we can rob from a row of houses, with the constraint that we cannot rob two adjacent houses. This is a classic dynamic programming problem where we need to make optimal choices at each step.

**Vietnamese:**
Chúng ta cần tìm số tiền tối đa có thể lấy từ một hàng nhà, với ràng buộc là không thể lấy tiền từ hai nhà liền kề. Đây là một bài toán lập trình động cổ điển trong đó chúng ta cần đưa ra lựa chọn tối ưu ở mỗi bước.

### Thinking Process / Quy trình suy nghĩ

**English:**

1. At each house, we have two choices: rob it or skip it.
2. If we rob the current house, we cannot rob the previous house.
3. If we skip the current house, we can take the maximum from the previous houses.
4. We need to track the maximum amount we can rob up to each house.

**Vietnamese:**

1. Ở mỗi nhà, chúng ta có hai lựa chọn: lấy tiền hoặc bỏ qua.
2. Nếu chúng ta lấy tiền từ nhà hiện tại, chúng ta không thể lấy tiền từ nhà trước đó.
3. Nếu chúng ta bỏ qua nhà hiện tại, chúng ta có thể lấy tối đa từ các nhà trước đó.
4. Chúng ta cần theo dõi số tiền tối đa có thể lấy được đến mỗi nhà.

### Examples / Ví dụ

**Example 1:**

```
Input: [1, 2, 3, 1]
House 0: 1
House 1: 2
House 2: 3
House 3: 1

Analysis:
- At house 0: rob it, max = 1
- At house 1: rob house 0 or house 1, max = max(1, 2) = 2
- At house 2: rob house 0 + house 2 or house 1, max = max(1+3, 2) = 4
- At house 3: rob house 1 + house 3 or house 2, max = max(2+1, 4) = 4

Result: 4 (rob houses 0 and 2)
```

**Example 2:**

```
Input: [2, 7, 9, 3, 1]
House 0: 2
House 1: 7
House 2: 9
House 3: 3
House 4: 1

Analysis:
- At house 0: rob it, max = 2
- At house 1: rob house 0 or house 1, max = max(2, 7) = 7
- At house 2: rob house 0 + house 2 or house 1, max = max(2+9, 7) = 11
- At house 3: rob house 1 + house 3 or house 2, max = max(7+3, 11) = 11
- At house 4: rob house 2 + house 4 or house 3, max = max(11+1, 11) = 12

Result: 12 (rob houses 0, 2, and 4)
```

---

## Solutions

### Solution 1: Recursive with Memoization / Đệ quy với ghi nhớ

#### Idea / Ý tưởng

**English:**
For each house, we have two choices: rob it (and skip the previous house) or skip it (and take the maximum from the previous houses). We use recursion with memoization to avoid redundant calculations.

**Vietnamese:**
Với mỗi nhà, chúng ta có hai lựa chọn: lấy tiền (và bỏ qua nhà trước đó) hoặc bỏ qua (và lấy tối đa từ các nhà trước đó). Chúng ta sử dụng đệ quy với ghi nhớ để tránh tính toán thừa.

#### Algorithm / Thuật toán

```
1. Define a recursive function robHelper(i) that returns the maximum amount we can rob from house i to the end
2. At each house i:
   a. If we rob house i: amount = nums[i] + robHelper(i + 2)
   b. If we skip house i: amount = robHelper(i + 1)
   c. Return max(rob, skip)
3. Use memoization to store results of subproblems
4. Call robHelper(0) and return the result
```

#### Code / Mã

```javascript
/**
 * Calculate the maximum amount that can be robbed using recursion with memoization
 * Tính số tiền tối đa có thể lấy bằng đệ quy với ghi nhớ
 *
 * @param {number[]} nums - Array of money in each house / Mảng chứa số tiền trong mỗi nhà
 * @returns {number} - Maximum amount that can be robbed / Số tiền tối đa có thể lấy
 * @timecomplexity O(n) - Each subproblem is solved once / Mỗi bài toán con được giải một lần
 * @spacecomplexity O(n) - For memoization array and recursion stack / Cho mảng ghi nhớ và ngăn xếp đệ quy
 */
function rob(nums) {
  const memo = new Map();

  /**
   * Helper function to calculate max amount from house i to end
   * Hàm trợ giúp để tính số tiền tối đa từ nhà i đến cuối
   *
   * @param {number} i - Current house index / Chỉ số nhà hiện tại
   * @returns {number} - Maximum amount from house i / Số tiền tối đa từ nhà i
   */
  function robHelper(i) {
    // Base case: no more houses to rob / Trường hợp cơ bản: không còn nhà để lấy
    if (i >= nums.length) {
      return 0;
    }

    // Check if already computed / Kiểm tra nếu đã tính toán
    if (memo.has(i)) {
      return memo.get(i);
    }

    // Choice 1: Rob current house and skip next / Lựa chọn 1: Lấy nhà hiện tại và bỏ qua nhà tiếp theo
    const robCurrent = nums[i] + robHelper(i + 2);

    // Choice 2: Skip current house / Lựa chọn 2: Bỏ qua nhà hiện tại
    const skipCurrent = robHelper(i + 1);

    // Store and return the maximum / Lưu và trả về giá trị tối đa
    const result = Math.max(robCurrent, skipCurrent);
    memo.set(i, result);

    return result;
  }

  return robHelper(0);
}

// Test cases / Các trường hợp kiểm tra
console.log(rob([1, 2, 3, 1])); // Output: 4
console.log(rob([2, 7, 9, 3, 1])); // Output: 12
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(n) - Each subproblem is solved exactly once
- **Space Complexity:** O(n) - For the memoization array and recursion stack

**Vietnamese:**

- **Độ phức tạp thời gian:** O(n) - Mỗi bài toán con được giải chính xác một lần
- **Độ phức tạp không gian:** O(n) - Cho mảng ghi nhớ và ngăn xếp đệ quy

#### Pros / Ưu điểm

- Easy to understand the recursive approach
- Memoization prevents redundant calculations
- Clear demonstration of the problem structure

#### Cons / Nhược điểm

- Recursion stack can be deep for large inputs
- Uses extra space for memoization
- Can be optimized to use less space

---

### Solution 2: Dynamic Programming with Array / Lập trình động với mảng

#### Idea / Ý tưởng

**English:**
Instead of using recursion, we can use an iterative approach with a DP array. At each house, we store the maximum amount we can rob up to that house. The recurrence relation is: dp[i] = max(dp[i-1], dp[i-2] + nums[i]).

**Vietnamese:**
Thay vì sử dụng đệ quy, chúng ta có thể sử dụng phương pháp lặp với mảng DP. Ở mỗi nhà, chúng ta lưu số tiền tối đa có thể lấy được đến nhà đó. Quan hệ lặp là: dp[i] = max(dp[i-1], dp[i-2] + nums[i]).

#### Algorithm / Thuật toán

```
1. If nums is empty, return 0
2. If nums has only 1 house, return nums[0]
3. Create dp array of size n
4. dp[0] = nums[0]
5. dp[1] = max(nums[0], nums[1])
6. For i from 2 to n-1:
   a. dp[i] = max(dp[i-1], dp[i-2] + nums[i])
7. Return dp[n-1]
```

#### Code / Mã

```javascript
/**
 * Calculate the maximum amount that can be robbed using dynamic programming with array
 * Tính số tiền tối đa có thể lấy bằng lập trình động với mảng
 *
 * @param {number[]} nums - Array of money in each house / Mảng chứa số tiền trong mỗi nhà
 * @returns {number} - Maximum amount that can be robbed / Số tiền tối đa có thể lấy
 * @timecomplexity O(n) - Single pass through the array / Một lần duyệt qua mảng
 * @spacecomplexity O(n) - For the dp array / Cho mảng dp
 */
function robDP(nums) {
  const n = nums.length;

  // Edge cases / Các trường hợp đặc biệt
  if (n === 0) return 0;
  if (n === 1) return nums[0];

  // dp[i] represents the maximum amount we can rob up to house i
  // dp[i] đại diện cho số tiền tối đa có thể lấy đến nhà i
  const dp = new Array(n);

  // Base cases / Các trường hợp cơ bản
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  // Fill the dp array / Điền mảng dp
  for (let i = 2; i < n; i++) {
    // At house i, we have two choices:
    // 1. Skip house i: take dp[i-1]
    // 2. Rob house i: take dp[i-2] + nums[i]
    // Ở nhà i, chúng ta có hai lựa chọn:
    // 1. Bỏ qua nhà i: lấy dp[i-1]
    // 2. Lấy nhà i: lấy dp[i-2] + nums[i]
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[n - 1];
}

// Test cases / Các trường hợp kiểm tra
console.log(robDP([1, 2, 3, 1])); // Output: 4
console.log(robDP([2, 7, 9, 3, 1])); // Output: 12
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(n) - Single pass through the array
- **Space Complexity:** O(n) - For the dp array

**Vietnamese:**

- **Độ phức tạp thời gian:** O(n) - Một lần duyệt qua mảng
- **Độ phức tạp không gian:** O(n) - Cho mảng dp

#### Pros / Ưu điểm

- No recursion, so no stack overflow risk
- Clear and easy to understand
- Efficient time complexity

#### Cons / Nhược điểm

- Uses O(n) space for the dp array
- Can be optimized to use O(1) space

---

### Solution 3: Optimized Space DP / DP tối ưu không gian

#### Idea / Ý tưởng

**English:**
We can optimize the space complexity by noticing that we only need the previous two values (dp[i-1] and dp[i-2]) to calculate dp[i]. We can use two variables instead of an array.

**Vietnamese:**
Chúng ta có thể tối ưu hóa độ phức tạp không gian bằng cách nhận thấy rằng chúng ta chỉ cần hai giá trị trước đó (dp[i-1] và dp[i-2]) để tính dp[i]. Chúng ta có thể sử dụng hai biến thay vì một mảng.

#### Algorithm / Thuật toán

```
1. If nums is empty, return 0
2. Initialize rob1 = 0 (max if we rob the house before the previous one)
3. Initialize rob2 = 0 (max if we rob the previous house)
4. For each house in nums:
   a. temp = rob2 (store current max)
   b. rob2 = max(rob1 + current house value, rob2)
   c. rob1 = temp
5. Return rob2
```

#### Code / Mã

```javascript
/**
 * Calculate the maximum amount that can be robbed using optimized space DP
 * Tính số tiền tối đa có thể lấy bằng DP tối ưu không gian
 *
 * @param {number[]} nums - Array of money in each house / Mảng chứa số tiền trong mỗi nhà
 * @returns {number} - Maximum amount that can be robbed / Số tiền tối đa có thể lấy
 * @timecomplexity O(n) - Single pass through the array / Một lần duyệt qua mảng
 * @spacecomplexity O(1) - Only using two variables / Chỉ sử dụng hai biến
 */
function robOptimized(nums) {
  // rob1: max amount if we rob the house before the previous one
  // rob2: max amount if we rob the previous house
  // rob1: số tiền tối đa nếu chúng ta lấy nhà trước nhà trước đó
  // rob2: số tiền tối đa nếu chúng ta lấy nhà trước đó
  let rob1 = 0;
  let rob2 = 0;

  for (const num of nums) {
    // At each house, we have two choices:
    // 1. Rob current house: rob1 + num (we can't rob adjacent)
    // 2. Skip current house: rob2
    // Take the maximum of these two choices
    // Ở mỗi nhà, chúng ta có hai lựa chọn:
    // 1. Lấy nhà hiện tại: rob1 + num (không thể lấy liền kề)
    // 2. Bỏ qua nhà hiện tại: rob2
    // Lấy giá trị tối đa của hai lựa chọn này
    const temp = rob2;
    rob2 = Math.max(rob1 + num, rob2);
    rob1 = temp;
  }

  return rob2;
}

// Test cases / Các trường hợp kiểm tra
console.log(robOptimized([1, 2, 3, 1])); // Output: 4
console.log(robOptimized([2, 7, 9, 3, 1])); // Output: 12
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(n) - Single pass through the array
- **Space Complexity:** O(1) - Only using two variables

**Vietnamese:**

- **Độ phức tạp thời gian:** O(n) - Một lần duyệt qua mảng
- **Độ phức tạp không gian:** O(1) - Chỉ sử dụng hai biến

#### Pros / Ưu điểm

- Most space-efficient solution
- No recursion or array overhead
- Clean and concise code

#### Cons / Nhược điểm

- Slightly less intuitive than the DP array approach
- Requires understanding of the state transition

---

## Solution Comparison / So sánh giải pháp

| Solution                   | Time | Space | Simplicity | Efficiency |
| -------------------------- | ---- | ----- | ---------- | ---------- |
| Recursive with Memoization | O(n) | O(n)  | High       | Medium     |
| DP with Array              | O(n) | O(n)  | High       | High       |
| Optimized Space DP         | O(n) | O(1)  | Medium     | Very High  |

---

## Test Cases / Các trường hợp kiểm tra

```javascript
// Test cases for all solutions / Các trường hợp kiểm tra cho tất cả giải pháp

// Test case 1: Example 1
let nums1 = [1, 2, 3, 1];
console.log(rob(nums1)); // Expected: 4
console.log(robDP(nums1)); // Expected: 4
console.log(robOptimized(nums1)); // Expected: 4

// Test case 2: Example 2
let nums2 = [2, 7, 9, 3, 1];
console.log(rob(nums2)); // Expected: 12
console.log(robDP(nums2)); // Expected: 12
console.log(robOptimized(nums2)); // Expected: 12

// Test case 3: Single house
let nums3 = [5];
console.log(rob(nums3)); // Expected: 5
console.log(robDP(nums3)); // Expected: 5
console.log(robOptimized(nums3)); // Expected: 5

// Test case 4: Two houses
let nums4 = [2, 7];
console.log(rob(nums4)); // Expected: 7
console.log(robDP(nums4)); // Expected: 7
console.log(robOptimized(nums4)); // Expected: 7

// Test case 5: All zeros
let nums5 = [0, 0, 0, 0];
console.log(rob(nums5)); // Expected: 0
console.log(robDP(nums5)); // Expected: 0
console.log(robOptimized(nums5)); // Expected: 0

// Test case 6: Increasing values
let nums6 = [1, 2, 3, 4, 5];
console.log(rob(nums6)); // Expected: 9 (1+3+5 or 2+4)
console.log(robDP(nums6)); // Expected: 9
console.log(robOptimized(nums6)); // Expected: 9

// Test case 7: Decreasing values
let nums7 = [5, 4, 3, 2, 1];
console.log(rob(nums7)); // Expected: 9 (5+3+1 or 4+2)
console.log(robDP(nums7)); // Expected: 9
console.log(robOptimized(nums7)); // Expected: 9
```

---

## Algorithm Links / Liên kết thuật toán

- [`Dynamic Programming Basics`](../../algorithms/dynamic-programming/dp-basics.md) - Core technique used in all solutions
- [`Sliding Window`](../../algorithms/patterns/sliding-window.md) - Related pattern for maintaining state

---

## Tips and Common Pitfalls / Mẹo và các lỗi thường gặp

### Tips / Mẹo

1. **Understand the recurrence relation**: The key insight is `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`. This means at each house, we either skip it (take dp[i-1]) or rob it (take dp[i-2] + nums[i]).

2. **Space optimization**: Notice that we only need the previous two values, so we can use O(1) space instead of O(n).

3. **Handle edge cases**: Make sure to handle empty arrays and arrays with only one or two elements.

4. **Start from the end**: You can also solve this problem by iterating from the end of the array to the beginning.

### Common Pitfalls / Lỗi thường gặp

1. **Not handling edge cases**: Forgetting to handle empty arrays or arrays with less than 2 elements.

2. **Incorrect recurrence relation**: Using `dp[i] = max(dp[i-1], dp[i-2])` instead of `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`.

3. **Index out of bounds**: When accessing `dp[i-2]`, make sure i is at least 2.

4. **Confusing rob1 and rob2**: In the optimized solution, rob1 represents the max amount if we rob the house before the previous one, and rob2 represents the max amount if we rob the previous house.

5. **Not considering all houses**: Make sure to iterate through all houses in the array.

6. **Using the wrong initial values**: For the optimized solution, both rob1 and rob2 should start at 0, not at nums[0].
