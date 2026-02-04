# Best Time to Buy and Sell Stock

> LeetCode Problem 121 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 121
- **URL:** https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array, Dynamic Programming
- **Tags:** Array, Dynamic Programming
- **Thuật toán liên quan / Related Algorithms:** Dynamic Programming, Greedy
- **Patterns liên quan / Related Patterns:** None

---

## 📄 Đề Bài Nguyên Bản / Original Problem

> You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day.
>
> You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.
>
> Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.

**Example 1:**

```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
```

**Example 2:**

```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

**Constraints:**

- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^4`

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng prices chứa giá cổ phiếu từng ngày
- **Output:** Số nguyên - lợi nhuận tối đa có thể đạt được
- **Ràng buộc / Constraints:**
  - Chỉ được mua 1 lần và bán 1 lần
  - Phải mua trước khi bán
- **Edge cases:**
  - Giá giảm dần → profit = 0
  - Mảng chỉ có 1 phần tử → profit = 0
  - Mảng tăng dần → profit = max - min

### 2. Tư duy / Thinking Process

- **Bước 1:** Cần tìm ngày mua giá thấp nhất trước ngày bán
- **Bước 2:** Với mỗi ngày bán, tính profit = giá bán - giá mua thấp nhất trước đó
- **Bước 3:** Lưu profit tối đa

### 3. Ví dụ minh họa / Examples

```
Example 1:
Input: prices = [7,1,5,3,6,4]

Day 0: price = 7, minPrice = 7, maxProfit = 0
Day 1: price = 1, minPrice = 1, maxProfit = max(0, 1-7) = 0
Day 2: price = 5, minPrice = 1, maxProfit = max(0, 5-1) = 5
Day 3: price = 3, minPrice = 1, maxProfit = max(5, 3-1) = 5
Day 4: price = 6, minPrice = 1, maxProfit = max(5, 6-1) = 5
Day 5: price = 4, minPrice = 1, maxProfit = max(5, 4-1) = 5

Giải thích:
- Mua ngày 1 (price = 1), bán ngày 4 (price = 6)
- Profit = 6 - 1 = 5
Output: 5
```

---

## 💡 Giải pháp 1: Brute Force (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Duyệt qua tất cả các cặp (mua, bán) và tìm profit tối đa.

### Thuật toán / Algorithm

1. Khởi tạo maxProfit = 0
2. Với i từ 0 đến n-2 (ngày mua):
   - Với j từ i+1 đến n-1 (ngày bán):
     - profit = prices[j] - prices[i]
     - maxProfit = max(maxProfit, profit)
3. Trả về maxProfit

### Code / Implementation

```javascript
/**
 * Best Time to Buy and Sell Stock - Brute Force Solution
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
  const n = prices.length;
  let maxProfit = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      const profit = prices[j] - prices[i];
      maxProfit = Math.max(maxProfit, profit);
    }
  }

  return maxProfit;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n²) - Duyệt qua tất cả các cặp (i, j)
- **Space Complexity:** O(1) - Không dùng thêm không gian

### Ưu điểm / Pros

- Dễ hiểu, dễ implement
- Không cần cấu trúc dữ liệu phức tạp

### Nhược điểm / Cons

- Độ phức tạp thời gian quá cao
- Không hiệu quả với mảng lớn

---

## 🚀 Giải pháp 2: One Pass (Cải tiến) / One Pass Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Brute Force quá chậm với mảng lớn
- Điểm yếu của giải pháp 1? Duyệt qua tất cả các cặp, nhiều phép tính thừa
- Cách tiếp cận mới? Duyệt 1 lần, theo dõi giá thấp nhất và profit tối đa

### Ý tưởng / Idea

Duyệt qua mảng 1 lần, theo dõi giá thấp nhất và profit tối đa. Với mỗi ngày, profit hiện tại = giá hiện tại - giá thấp nhất trước đó.

### Thuật toán / Algorithm

1. Nếu prices.length < 2, trả về 0
2. Khởi tạo minPrice = prices[0], maxProfit = 0
3. Với i từ 1 đến n-1:
   - maxProfit = max(maxProfit, prices[i] - minPrice)
   - minPrice = min(minPrice, prices[i])
4. Trả về maxProfit

### Code / Implementation

```javascript
/**
 * Best Time to Buy and Sell Stock - One Pass Solution
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit_OnePass(prices) {
  if (prices.length < 2) {
    return 0;
  }

  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    // Tính profit nếu bán ở ngày i
    maxProfit = Math.max(maxProfit, prices[i] - minPrice);

    // Cập nhật giá thấp nhất
    minPrice = Math.min(minPrice, prices[i]);
  }

  return maxProfit;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng 1 lần
- **Space Complexity:** O(1) - Chỉ dùng 2 biến

### Ưu điểm / Pros

- Độ phức tạp thời gian tối ưu O(n)
- Code ngắn gọn, dễ hiểu
- Tiết kiệm bộ nhớ

### Nhược điểm / Cons

- Không có nhược điểm đáng kể

---

## ⚡ Giải pháp 3: Kadane's Algorithm (Nâng cao) / Kadane's Algorithm

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể dùng Kadane's Algorithm
- Có thuật toán/pattern nào phù hợp hơn? Maximum subarray sum

### Ý tưởng / Idea

Biến bài toán thành tìm maximum subarray sum. Tạo mảng diff = prices[i] - prices[i-1], sau đó tìm maximum subarray sum.

### Thuật toán / Algorithm

1. Nếu prices.length < 2, trả về 0
2. Tạo mảng diff với diff[i] = prices[i] - prices[i-1]
3. Dùng Kadane's Algorithm để tìm maximum subarray sum
4. Trả về max(0, maxSubarraySum)

### Code / Implementation

```javascript
/**
 * Best Time to Buy and Sell Stock - Kadane's Algorithm
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit_Kadane(prices) {
  if (prices.length < 2) {
    return 0;
  }

  // Tạo mảng diff
  const diff = [];
  for (let i = 1; i < prices.length; i++) {
    diff.push(prices[i] - prices[i - 1]);
  }

  // Kadane's Algorithm để tìm maximum subarray sum
  let maxSum = 0;
  let currentSum = 0;

  for (let i = 0; i < diff.length; i++) {
    currentSum = Math.max(0, currentSum + diff[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng 1 lần
- **Space Complexity:** O(n) - Lưu mảng diff

### Ưu điểm / Pros

- Độ phức tạp thời gian O(n)
- Áp dụng Kadane's Algorithm nổi tiếng

### Nhược điểm / Cons

- Tốn thêm bộ nhớ cho mảng diff
- Code phức tạp hơn giải pháp 2

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time  | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ----- | ----- | ------------------- | -------------------------- |
| Brute Force          | O(n²) | O(1)  | Dễ / Easy           | Mảng nhỏ, dễ hiểu          |
| One Pass             | O(n)  | O(1)  | Trung bình / Medium | Tối ưu, nên dùng           |
| Kadane's Algorithm   | O(n)  | O(n)  | Khó / Hard          | Áp dụng Kadane's Algorithm |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const prices = [7, 1, 5, 3, 6, 4];
console.log(maxProfit(prices)); // Expected: 5
console.log(maxProfit_OnePass(prices)); // Expected: 5
console.log(maxProfit_Kadane(prices)); // Expected: 5
```

### Test Case 2: Giá giảm dần / Decreasing Prices

```javascript
const prices = [7, 6, 4, 3, 1];
console.log(maxProfit(prices)); // Expected: 0
console.log(maxProfit_OnePass(prices)); // Expected: 0
console.log(maxProfit_Kadane(prices)); // Expected: 0
```

### Test Case 3: Mảng chỉ có 1 phần tử / Single Element

```javascript
const prices = [5];
console.log(maxProfit(prices)); // Expected: 0
console.log(maxProfit_OnePass(prices)); // Expected: 0
console.log(maxProfit_Kadane(prices)); // Expected: 0
```

### Test Case 4: Giá tăng dần / Increasing Prices

```javascript
const prices = [1, 2, 3, 4, 5];
console.log(maxProfit(prices)); // Expected: 4
console.log(maxProfit_OnePass(prices)); // Expected: 4
console.log(maxProfit_Kadane(prices)); // Expected: 4
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Cấu trúc dữ liệu liên quan:**
  - [Array](../algorithms/data-structures/array.md)

- **Thuật toán liên quan:**
  - [Dynamic Programming Basics](../algorithms/dynamic-programming/dp-basics.md)
  - [Greedy](../algorithms/algorithms/greedy.md)

---

## 💬 Lời khuyên / Tips

- **One Pass Approach:**
  - Theo dõi giá thấp nhất và profit tối đa
  - Duyệt 1 lần, O(n) time, O(1) space
- **Edge Cases:**
  - Mảng rỗng hoặc chỉ có 1 phần tử → profit = 0
  - Giá giảm dần → profit = 0
- **Lỗi thường gặp:**
  - Quên kiểm tra mảng có < 2 phần tử
  - Với brute force, sai index
  - Quên max(0, profit) vì profit có thể âm

---

_Last updated: 2026-02-03_
