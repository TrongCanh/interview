# Shortest Word Distance / Khoảng Cách Từ Ngắn Nhất

> LeetCode Problem 243 - Easy

---

## 📌 Thông tin Bài toán / Problem Information

- **Problem ID:** 243
- **URL:** https://leetcode.com/problems/shortest-word-distance/
- **Độ khó / Difficulty:** Easy
- **Danh mục / Category:** Array, String
- **Tags:** Array, String
- **Thuật toán liên quan / Related Algorithms:** Array, Two Pointers
- **Patterns liên quan / Related Patterns:** Two Pointers

---

## 📄 Đề Bài Nguyên Bản / Original Problem

Given an array of strings `wordsDict` and two different strings `word1` and `word2`, return the **shortest distance** between these two words in the list.

The distance between two words is the **absolute difference** between their indices in the array.

**Example 1:**

```
Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "coding", word2 = "practice"
Output: 3
Explanation: "coding" is at index 3 and "practice" is at index 0. The distance is |3 - 0| = 3.
```

**Example 2:**

```
Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "coding"
Output: 1
```

**Constraints:**

- `1 <= wordsDict.length <= 3 * 10^4`
- `1 <= wordsDict[i].length <= 10`
- `wordsDict[i]` consists of lowercase English letters.
- `word1` and `word2` are non-empty strings.
- `word1` and `word2` are different.
- Both `word1` and `word2` are present in `wordsDict`.

---

## 🧠 Phân tích Đề Bài / Problem Analysis

### 1. Hiểu đề bài / Understanding the Problem

- **Input:** Mảng chuỗi `wordsDict`, và hai chuỗi `word1`, `word2`
- **Output:** Khoảng cách ngắn nhất giữa `word1` và `word2` trong mảng
- **Ràng buộc / Constraints:**
  - Độ dài mảng: 1 ≤ wordsDict.length ≤ 3 × 10^4
  - Độ dài mỗi từ: 1 ≤ wordsDict[i].length ≤ 10
  - Chỉ chứa chữ cái tiếng Anh viết thường
  - `word1` và `word2` khác nhau và đều tồn tại trong mảng
- **Edge cases:**
  - `word1` và `word2` xuất hiện nhiều lần trong mảng
  - `word1` và `word2` đứng cạnh nhau

### 2. Tư duy / Thinking Process

- **Bước 1:** Hiểu yêu cầu - cần tìm khoảng cách nhỏ nhất giữa hai từ trong mảng
- **Bước 2:** Xác định cách tiếp cận - có thể dùng Two Pointers để lưu chỉ số gần nhất
- **Bước 3:** Lên kế hoạch giải pháp - One Pass (O(n) time, O(1) space)

### 3. Ví dụ minh họa / Examples

```
Example 1: wordsDict = ["practice", "makes", "perfect", "coding", "makes"]
             word1 = "coding", word2 = "practice"

i=0: "practice" == word2 → index2 = 0, distance = |null - 0| = ∞
i=1: "makes" != word1, word2
i=2: "perfect" != word1, word2
i=3: "coding" == word1 → index1 = 3, distance = |3 - 0| = 3
i=4: "makes" != word1, word2

Kết quả: distance = 3

Example 2: wordsDict = ["practice", "makes", "perfect", "coding", "makes"]
             word1 = "makes", word2 = "coding"

i=0: "practice" != word1, word2
i=1: "makes" == word1 → index1 = 1, distance = |1 - null| = ∞
i=2: "perfect" != word1, word2
i=3: "coding" == word2 → index2 = 3, distance = |3 - 1| = 2
i=4: "makes" == word1 → index1 = 4, distance = min(2, |4 - 3|) = 1

Kết quả: distance = 1
```

---

## 💡 Giải pháp 1: Brute Force - Two Pass (Cơ bản nhất) / Basic Solution

### Ý tưởng / Idea

Tìm tất cả chỉ số của `word1` và `word2`, sau đó tính khoảng cách nhỏ nhất giữa chúng.

### Thuật toán / Algorithm

1. Tìm tất cả chỉ số của `word1` trong `wordsDict`, lưu vào `indices1`
2. Tìm tất cả chỉ số của `word2` trong `wordsDict`, lưu vào `indices2`
3. Tính khoảng cách nhỏ nhất giữa bất kỳ chỉ số nào trong `indices1` và `indices2`
4. Trả về khoảng cách nhỏ nhất

### Code / Implementation

```javascript
/**
 * Shortest Word Distance - Two Pass Solution
 * @param {string[]} wordsDict - Mảng các từ
 * @param {string} word1 - Từ thứ nhất
 * @param {string} word2 - Từ thứ hai
 * @return {number} - Khoảng cách ngắn nhất giữa word1 và word2
 */
function shortestDistance_bruteForce(wordsDict, word1, word2) {
  // Tìm tất cả chỉ số của word1
  const indices1 = [];
  const indices2 = [];

  for (let i = 0; i < wordsDict.length; i++) {
    if (wordsDict[i] === word1) {
      indices1.push(i);
    } else if (wordsDict[i] === word2) {
      indices2.push(i);
    }
  }

  // Tính khoảng cách nhỏ nhất
  let minDistance = Infinity;

  for (const i1 of indices1) {
    for (const i2 of indices2) {
      const distance = Math.abs(i1 - i2);
      minDistance = Math.min(minDistance, distance);
    }
  }

  return minDistance;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n × m) - n là độ dài mảng, m là số lần xuất hiện của word1/word2
- **Space Complexity:** O(n) - Lưu trữ tất cả chỉ số

### Ưu điểm / Pros

- Đơn giản, dễ hiểu
- Code rõ ràng

### Nhược điểm / Cons

- Độ phức tạp thời gian không tối ưu
- Tốn O(n) bộ nhớ

---

## 🚀 Giải pháp 2: Optimized - One Pass (Cải tiến) / Optimized Solution

### Phân tích cải tiến / Improvement Analysis

- Tại sao cần cải tiến? Giải pháp Brute Force có độ phức tạp O(n × m)
- Điểm yếu của giải pháp 1? Tốn nhiều thời gian và bộ nhớ
- Cách tiếp cận mới? Dùng One Pass với Two Pointers

### Ý tưởng / Idea

Duyệt qua mảng một lần, lưu chỉ số gần nhất của `word1` và `word2`. Khi tìm thấy một trong hai từ, tính khoảng cách và cập nhật chỉ số.

### Thuật toán / Algorithm

1. Khởi tạo `index1 = -1`, `index2 = -1`, `minDistance = Infinity`
2. Duyệt qua mảng với chỉ số `i`:
   - Nếu `wordsDict[i] === word1`:
     - Cập nhật `index1 = i`
     - Nếu `index2 !== -1`, tính `distance = |index1 - index2|`, cập nhật `minDistance`
   - Nếu `wordsDict[i] === word2`:
     - Cập nhật `index2 = i`
     - Nếu `index1 !== -1`, tính `distance = |index1 - index2|`, cập nhật `minDistance`
3. Trả về `minDistance`

### Code / Implementation

```javascript
/**
 * Shortest Word Distance - One Pass Solution
 * @param {string[]} wordsDict - Mảng các từ
 * @param {string} word1 - Từ thứ nhất
 * @param {string} word2 - Từ thứ hai
 * @return {number} - Khoảng cách ngắn nhất giữa word1 và word2
 */
function shortestDistance_optimized(wordsDict, word1, word2) {
  let index1 = -1;
  let index2 = -1;
  let minDistance = Infinity;

  for (let i = 0; i < wordsDict.length; i++) {
    if (wordsDict[i] === word1) {
      index1 = i;
      if (index2 !== -1) {
        minDistance = Math.min(minDistance, Math.abs(index1 - index2));
      }
    } else if (wordsDict[i] === word2) {
      index2 = i;
      if (index1 !== -1) {
        minDistance = Math.min(minDistance, Math.abs(index1 - index2));
      }
    }
  }

  return minDistance;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n) - Duyệt qua mảng một lần
- **Space Complexity:** O(1) - Chỉ dùng vài biến tạm

### Ưu điểm / Pros

- Độ phức tạp thời gian tối ưu O(n)
- Space complexity tối ưu O(1)
- Code ngắn gọn

### Nhược điểm / Cons

- Cần hiểu về Two Pointers pattern
- Code hơi dài hơn một chút

---

## ⚡ Giải pháp 3: Advanced - Simplified One Pass (Nâng cao) / Advanced Solution

### Phân tích nâng cao / Advanced Analysis

- Có thể cải thiện thêm không? Có thể viết code ngắn gọn hơn
- Có thuật toán/pattern nào phù hợp hơn? Tương tự giải pháp Optimized

### Ý tưởng / Idea

Tương tự giải pháp Optimized, nhưng viết code ngắn gọn hơn.

### Thuật toán / Algorithm

Tương tự giải pháp Optimized.

### Code / Implementation

```javascript
/**
 * Shortest Word Distance - Simplified One Pass Solution
 * @param {string[]} wordsDict - Mảng các từ
 * @param {string} word1 - Từ thứ nhất
 * @param {string} word2 - Từ thứ hai
 * @return {number} - Khoảng cách ngắn nhất giữa word1 và word2
 */
function shortestDistance_advanced(wordsDict, word1, word2) {
  let i1 = -1,
    i2 = -1,
    minDist = Infinity;

  wordsDict.forEach((word, i) => {
    if (word === word1) {
      i1 = i;
      if (i2 !== -1) minDist = Math.min(minDist, i1 - i2);
    } else if (word === word2) {
      i2 = i;
      if (i1 !== -1) minDist = Math.min(minDist, i2 - i1);
    }
  });

  return minDist;
}
```

### Độ phức tạp / Complexity

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)

### Ưu điểm / Pros

- Code rất ngắn gọn
- Độ phức tạp tối ưu
- Sử dụng forEach

### Nhược điểm / Cons

- Tương tự giải pháp Optimized

---

## 📊 So sánh Các Giải pháp / Solution Comparison

| Giải pháp / Solution | Time   | Space | Độ khó / Difficulty | Khi nào dùng / When to use |
| -------------------- | ------ | ----- | ------------------- | -------------------------- |
| Two Pass             | O(n×m) | O(n)  | Dễ / Easy           | Code đơn giản, dễ hiểu     |
| One Pass             | O(n)   | O(1)  | Trung bình / Medium | Cần tối ưu time/space      |
| Simplified One Pass  | O(n)   | O(1)  | Trung bình / Medium | Code ngắn gọn              |

---

## 🧪 Test Cases

### Test Case 1: Cơ bản / Basic

```javascript
const wordsDict = ["practice", "makes", "perfect", "coding", "makes"];
const word1 = "coding";
const word2 = "practice";
const expected = 3;
const result = shortestDistance_bruteForce(wordsDict, word1, word2);
console.log(result === expected); // true
```

### Test Case 2: Khoảng cách 1 / Distance 1

```javascript
const wordsDict = ["practice", "makes", "perfect", "coding", "makes"];
const word1 = "makes";
const word2 = "coding";
const expected = 1;
const result = shortestDistance_bruteForce(wordsDict, word1, word2);
console.log(result === expected); // true
```

### Test Case 3: Từ xuất hiện nhiều lần / Multiple Occurrences

```javascript
const wordsDict = ["a", "b", "c", "a", "b", "c"];
const word1 = "a";
const word2 = "c";
const expected = 1;
const result = shortestDistance_bruteForce(wordsDict, word1, word2);
console.log(result === expected); // true
```

### Test Case 4: Từ ở đầu và cuối / Words at Ends

```javascript
const wordsDict = ["a", "b", "c", "d", "e"];
const word1 = "a";
const word2 = "e";
const expected = 4;
const result = shortestDistance_bruteForce(wordsDict, word1, word2);
console.log(result === expected); // true
```

### Test Case 5: Mảng 2 phần tử / Two Elements

```javascript
const wordsDict = ["hello", "world"];
const word1 = "hello";
const word2 = "world";
const expected = 1;
const result = shortestDistance_bruteForce(wordsDict, word1, word2);
console.log(result === expected); // true
```

### Test Case 6: Khoảng cách 0 / Distance 0 (không thể theo constraints)

```javascript
// Theo constraints, word1 và word2 phải khác nhau
// nên không thể có khoảng cách 0
const wordsDict = ["a", "b", "c"];
const word1 = "a";
const word2 = "b";
const expected = 1;
const result = shortestDistance_bruteForce(wordsDict, word1, word2);
console.log(result === expected); // true
```

---

## 🔗 Liên kết Thuật toán / Algorithm Links

- **Thuật toán liên quan:**
  - [Array](../algorithms/data-structures/array.md)
  - [String](../algorithms/data-structures/string.md)

- **Patterns liên quan:**
  - [Two Pointers](../algorithms/patterns/two-pointers.md)

---

## 💡 Học hỏi & Lưu ý / Learning Points & Notes

1. **Two Pointers Pattern:**
   - Rất hữu ích cho các bài toán tìm khoảng cách
   - Lưu chỉ số gần nhất của hai từ
   - Tính khoảng cách mỗi khi tìm thấy một trong hai từ

2. **One Pass vs Two Pass:**
   - One Pass: duyệt mảng một lần, tối ưu O(n)
   - Two Pass: duyệt mảng hai lần, không tối ưu

3. **Math.abs() trong JavaScript:**
   - Trả về giá trị tuyệt đối
   - `Math.abs(-5) = 5`
   - `Math.abs(5) = 5`

4. **Math.min() trong JavaScript:**
   - Trả về giá trị nhỏ nhất
   - `Math.min(1, 2, 3) = 1`

5. **Edge Cases:**
   - Từ xuất hiện nhiều lần: cần tính khoảng cách với mỗi lần xuất hiện
   - Từ ở đầu và cuối: khoảng cách lớn nhất

6. **Lưu ý về ràng buộc:**
   - word1 và word2 khác nhau
   - Cả hai đều tồn tại trong mảng
   - Không cần kiểm tra trường hợp không tồn tại

---

_Last updated: 2025-02-04_
