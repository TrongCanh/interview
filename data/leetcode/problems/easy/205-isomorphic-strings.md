# 205. Isomorphic Strings

## Problem Information

| Property               | Value                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------ |
| **Problem ID**         | 205                                                                                                    |
| **URL**                | [https://leetcode.com/problems/isomorphic-strings/](https://leetcode.com/problems/isomorphic-strings/) |
| **Difficulty**         | Easy                                                                                                   |
| **Category**           | Hash Table, String                                                                                     |
| **Tags**               | `Hash Table`, `String`                                                                                 |
| **Related Algorithms** | [`Hash Table`](../../algorithms/data-structures/hash-table.md)                                         |
| **Related Patterns**   | [`Two Pointers`](../../algorithms/patterns/two-pointers.md)                                            |

---

## Original Problem

Given two strings `s` and `t`, determine if they are isomorphic.

Two strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t`.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

**Example 1:**

```
Input: s = "egg", t = "add"
Output: true
```

**Example 2:**

```
Input: s = "foo", t = "bar"
Output: false
```

**Example 3:**

```
Input: s = "paper", t = "title"
Output: true
```

**Constraints:**

- `1 <= s.length <= 5 * 10^4`
- `t.length == s.length`
- `s` and `t` consist of any valid ascii character.

---

## Problem Analysis

### Understanding the Problem / Hiểu bài toán

**English:**
Two strings are isomorphic if there's a one-to-one mapping between characters in s and characters in t. This means each character in s maps to exactly one character in t, and vice versa.

**Vietnamese:**
Hai chuỗi là đẳng cấu nếu có một ánh xạ một-một giữa các ký tự trong s và các ký tự trong t. Điều này có nghĩa là mỗi ký tự trong s ánh xạ đến chính xác một ký tự trong t, và ngược lại.

### Thinking Process / Quy trình suy nghĩ

**English:**

1. We need to check if there's a consistent mapping from s to t.
2. We also need to ensure no two characters in s map to the same character in t.
3. We can use two hash maps: one for s→t mapping and one for t→s mapping.
4. Or we can use arrays since ASCII characters are limited.

**Vietnamese:**

1. Chúng ta cần kiểm tra xem có ánh xạ nhất quán từ s đến t không.
2. Chúng ta cũng cần đảm bảo không có hai ký tự trong s ánh xạ đến cùng một ký tự trong t.
3. Chúng ta có thể sử dụng hai hash map: một cho ánh xạ s→t và một cho ánh xạ t→s.
4. Hoặc chúng ta có thể sử dụng mảng vì các ký tự ASCII bị giới hạn.

### Examples / Ví dụ

**Example 1:**

```
Input: s = "egg", t = "add"

Mapping:
e -> a
g -> d
g -> d (consistent)

Check reverse mapping:
a -> e
d -> g
d -> g (consistent)

Result: true
```

**Example 2:**

```
Input: s = "foo", t = "bar"

Mapping:
f -> b
o -> a
o -> r (inconsistent! 'o' maps to both 'a' and 'r')

Result: false
```

**Example 3:**

```
Input: s = "paper", t = "title"

Mapping:
p -> t
a -> i
p -> t (consistent)
e -> l
r -> e

Check reverse mapping:
t -> p
i -> a
l -> e
e -> r

Result: true
```

---

## Solutions

### Solution 1: Hash Map / Bản đồ băm

#### Idea / Ý tưởng

**English:**
We use two hash maps to track the mapping between characters in s and t. One map stores s→t mappings, and the other stores t→s mappings. We check for consistency as we iterate through the strings.

**Vietnamese:**
Chúng ta sử dụng hai hash map để theo dõi ánh xạ giữa các ký tự trong s và t. Một map lưu trữ ánh xạ s→t, và map kia lưu trữ ánh xạ t→s. Chúng ta kiểm tra tính nhất quán khi lặp qua các chuỗi.

#### Algorithm / Thuật toán

```
1. If s.length != t.length, return false
2. Create two hash maps: sToT and tToS
3. For each index i from 0 to s.length - 1:
   a. If s[i] is in sToT and sToT[s[i]] != t[i], return false
   b. If t[i] is in tToS and tToS[t[i]] != s[i], return false
   c. Set sToT[s[i]] = t[i]
   d. Set tToS[t[i]] = s[i]
4. Return true
```

#### Code / Mã

```javascript
/**
 * Check if two strings are isomorphic using hash maps
 * Kiểm tra xem hai chuỗi có đẳng cấu không bằng hash maps
 *
 * @param {string} s - First string / Chuỗi thứ nhất
 * @param {string} t - Second string / Chuỗi thứ hai
 * @returns {boolean} - True if isomorphic, false otherwise / True nếu đẳng cấu, false nếu không
 * @timecomplexity O(n) - Single pass through the strings / Một lần duyệt qua các chuỗi
 * @spacecomplexity O(1) - Hash maps have at most 256 entries (ASCII) / Hash maps có tối đa 256 mục (ASCII)
 */
function isIsomorphic(s, t) {
  // If lengths are different, they can't be isomorphic
  // Nếu độ dài khác nhau, chúng không thể đẳng cấu
  if (s.length !== t.length) {
    return false;
  }

  // Create two hash maps for bidirectional mapping
  // Tạo hai hash maps cho ánh xạ hai chiều
  const sToT = new Map();
  const tToS = new Map();

  for (let i = 0; i < s.length; i++) {
    const charS = s[i];
    const charT = t[i];

    // Check if mapping from s to t is consistent
    // Kiểm tra xem ánh xạ từ s đến t có nhất quán không
    if (sToT.has(charS)) {
      if (sToT.get(charS) !== charT) {
        return false;
      }
    } else {
      sToT.set(charS, charT);
    }

    // Check if mapping from t to s is consistent
    // Kiểm tra xem ánh xạ từ t đến s có nhất quán không
    if (tToS.has(charT)) {
      if (tToS.get(charT) !== charS) {
        return false;
      }
    } else {
      tToS.set(charT, charS);
    }
  }

  return true;
}

// Test cases / Các trường hợp kiểm tra
console.log(isIsomorphic("egg", "add")); // Output: true
console.log(isIsomorphic("foo", "bar")); // Output: false
console.log(isIsomorphic("paper", "title")); // Output: true
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(n) - We iterate through the strings once
- **Space Complexity:** O(1) - The hash maps have at most 256 entries (ASCII characters)

**Vietnamese:**

- **Độ phức tạp thời gian:** O(n) - Chúng ta lặp qua các chuỗi một lần
- **Độ phức tạp không gian:** O(1) - Hash maps có tối đa 256 mục (ký tự ASCII)

#### Pros / Ưu điểm

- Simple and straightforward
- Easy to understand
- Works for any character set

#### Cons / Nhược điểm

- Uses two hash maps
- Slightly more memory than array-based solution

---

### Solution 2: Array-based / Dựa trên mảng

#### Idea / Ý tưởng

**English:**
Since we're dealing with ASCII characters, we can use arrays instead of hash maps. This is more efficient as array access is O(1) and has less overhead than hash map operations.

**Vietnamese:**
Vì chúng ta đang xử lý các ký tự ASCII, chúng ta có thể sử dụng mảng thay vì hash map. Điều này hiệu quả hơn vì truy cập mảng là O(1) và có ít chi phí hơn các thao tác hash map.

#### Algorithm / Thuật toán

```
1. If s.length != t.length, return false
2. Create two arrays of size 256: sToT and tToS, initialized to -1
3. For each index i from 0 to s.length - 1:
   a. Get ASCII codes: codeS = s.charCodeAt(i), codeT = t.charCodeAt(i)
   b. If sToT[codeS] != -1 and sToT[codeS] != codeT, return false
   c. If tToS[codeT] != -1 and tToS[codeT] != codeS, return false
   d. Set sToT[codeS] = codeT
   e. Set tToS[codeT] = codeS
4. Return true
```

#### Code / Mã

```javascript
/**
 * Check if two strings are isomorphic using arrays
 * Kiểm tra xem hai chuỗi có đẳng cấu không bằng mảng
 *
 * @param {string} s - First string / Chuỗi thứ nhất
 * @param {string} t - Second string / Chuỗi thứ hai
 * @returns {boolean} - True if isomorphic, false otherwise / True nếu đẳng cấu, false nếu không
 * @timecomplexity O(n) - Single pass through the strings / Một lần duyệt qua các chuỗi
 * @spacecomplexity O(1) - Arrays have fixed size of 256 / Mảng có kích thước cố định là 256
 */
function isIsomorphicArray(s, t) {
  // If lengths are different, they can't be isomorphic
  // Nếu độ dài khác nhau, chúng không thể đẳng cấu
  if (s.length !== t.length) {
    return false;
  }

  // Create two arrays for bidirectional mapping (ASCII has 256 characters)
  // Tạo hai mảng cho ánh xạ hai chiều (ASCII có 256 ký tự)
  const sToT = new Array(256).fill(-1);
  const tToS = new Array(256).fill(-1);

  for (let i = 0; i < s.length; i++) {
    const codeS = s.charCodeAt(i);
    const codeT = t.charCodeAt(i);

    // Check if mapping from s to t is consistent
    // Kiểm tra xem ánh xạ từ s đến t có nhất quán không
    if (sToT[codeS] !== -1 && sToT[codeS] !== codeT) {
      return false;
    }

    // Check if mapping from t to s is consistent
    // Kiểm tra xem ánh xạ từ t đến s có nhất quán không
    if (tToS[codeT] !== -1 && tToS[codeT] !== codeS) {
      return false;
    }

    // Set the mappings / Đặt các ánh xạ
    sToT[codeS] = codeT;
    tToS[codeT] = codeS;
  }

  return true;
}

// Test cases / Các trường hợp kiểm tra
console.log(isIsomorphicArray("egg", "add")); // Output: true
console.log(isIsomorphicArray("foo", "bar")); // Output: false
console.log(isIsomorphicArray("paper", "title")); // Output: true
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(n) - We iterate through the strings once
- **Space Complexity:** O(1) - The arrays have a fixed size of 256

**Vietnamese:**

- **Độ phức tạp thời gian:** O(n) - Chúng ta lặp qua các chuỗi một lần
- **Độ phức tạp không gian:** O(1) - Các mảng có kích thước cố định là 256

#### Pros / Ưu điểm

- More efficient than hash maps
- Less memory overhead
- Faster due to direct array access

#### Cons / Nhược điểm

- Limited to ASCII characters (256 characters)
- Less flexible than hash maps

---

### Solution 3: First Occurrence Index / Chỉ số xuất hiện đầu tiên

#### Idea / Ý tưởng

**English:**
We can compare the pattern of first occurrence indices of characters in both strings. If the patterns match, the strings are isomorphic. This approach uses a single array to track the last seen position of each character.

**Vietnamese:**
Chúng ta có thể so sánh mẫu của các chỉ số xuất hiện đầu tiên của các ký tự trong cả hai chuỗi. Nếu các mẫu khớp, các chuỗi là đẳng cấu. Cách tiếp cận này sử dụng một mảng đơn để theo dõi vị trí xuất hiện lần cuối của mỗi ký tự.

#### Algorithm / Thuật toán

```
1. If s.length != t.length, return false
2. Create an array lastSeen of size 256, initialized to -1
3. For each index i from 0 to s.length - 1:
   a. Get ASCII codes: codeS = s.charCodeAt(i), codeT = t.charCodeAt(i)
   b. If lastSeen[codeS] != lastSeen[codeT], return false
   c. Set lastSeen[codeS] = lastSeen[codeT] = i
4. Return true
```

#### Code / Mã

```javascript
/**
 * Check if two strings are isomorphic using first occurrence index
 * Kiểm tra xem hai chuỗi có đẳng cấu không bằng chỉ số xuất hiện đầu tiên
 *
 * @param {string} s - First string / Chuỗi thứ nhất
 * @param {string} t - Second string / Chuỗi thứ hai
 * @returns {boolean} - True if isomorphic, false otherwise / True nếu đẳng cấu, false nếu không
 * @timecomplexity O(n) - Single pass through the strings / Một lần duyệt qua các chuỗi
 * @spacecomplexity O(1) - Array has fixed size of 256 / Mảng có kích thước cố định là 256
 */
function isIsomorphicPattern(s, t) {
  // If lengths are different, they can't be isomorphic
  // Nếu độ dài khác nhau, chúng không thể đẳng cấu
  if (s.length !== t.length) {
    return false;
  }

  // Create an array to track the last seen position of each character
  // Tạo một mảng để theo dõi vị trí xuất hiện lần cuối của mỗi ký tự
  const lastSeen = new Array(256).fill(-1);

  for (let i = 0; i < s.length; i++) {
    const codeS = s.charCodeAt(i);
    const codeT = t.charCodeAt(i);

    // Check if the pattern of first occurrences matches
    // Kiểm tra xem mẫu của các lần xuất hiện đầu tiên có khớp không
    if (lastSeen[codeS] !== lastSeen[codeT]) {
      return false;
    }

    // Update the last seen position / Cập nhật vị trí xuất hiện lần cuối
    lastSeen[codeS] = lastSeen[codeT] = i;
  }

  return true;
}

// Test cases / Các trường hợp kiểm tra
console.log(isIsomorphicPattern("egg", "add")); // Output: true
console.log(isIsomorphicPattern("foo", "bar")); // Output: false
console.log(isIsomorphicPattern("paper", "title")); // Output: true
```

#### Complexity / Độ phức tạp

**English:**

- **Time Complexity:** O(n) - We iterate through the strings once
- **Space Complexity:** O(1) - The array has a fixed size of 256

**Vietnamese:**

- **Độ phức tạp thời gian:** O(n) - Chúng ta lặp qua các chuỗi một lần
- **Độ phức tạp không gian:** O(1) - Mảng có kích thước cố định là 256

#### Pros / Ưu điểm

- Most space-efficient (single array)
- Elegant and concise
- Fast due to direct array access

#### Cons / Nhược điểm

- Less intuitive than the hash map approach
- Limited to ASCII characters

---

## Solution Comparison / So sánh giải pháp

| Solution               | Time | Space | Simplicity | Efficiency |
| ---------------------- | ---- | ----- | ---------- | ---------- |
| Hash Map               | O(n) | O(1)  | High       | Medium     |
| Array-based            | O(n) | O(1)  | High       | High       |
| First Occurrence Index | O(n) | O(1)  | Medium     | Very High  |

---

## Test Cases / Các trường hợp kiểm tra

```javascript
// Test cases for all solutions / Các trường hợp kiểm tra cho tất cả giải pháp

// Test case 1: Example 1
let s1 = "egg",
  t1 = "add";
console.log(isIsomorphic(s1, t1)); // Expected: true
console.log(isIsomorphicArray(s1, t1)); // Expected: true
console.log(isIsomorphicPattern(s1, t1)); // Expected: true

// Test case 2: Example 2
let s2 = "foo",
  t2 = "bar";
console.log(isIsomorphic(s2, t2)); // Expected: false
console.log(isIsomorphicArray(s2, t2)); // Expected: false
console.log(isIsomorphicPattern(s2, t2)); // Expected: false

// Test case 3: Example 3
let s3 = "paper",
  t3 = "title";
console.log(isIsomorphic(s3, t3)); // Expected: true
console.log(isIsomorphicArray(s3, t3)); // Expected: true
console.log(isIsomorphicPattern(s3, t3)); // Expected: true

// Test case 4: Different lengths
let s4 = "ab",
  t4 = "aa";
console.log(isIsomorphic(s4, t4)); // Expected: false
console.log(isIsomorphicArray(s4, t4)); // Expected: false
console.log(isIsomorphicPattern(s4, t4)); // Expected: false

// Test case 5: Same strings
let s5 = "abc",
  t5 = "abc";
console.log(isIsomorphic(s5, t5)); // Expected: true
console.log(isIsomorphicArray(s5, t5)); // Expected: true
console.log(isIsomorphicPattern(s5, t5)); // Expected: true

// Test case 6: Empty strings
let s6 = "",
  t6 = "";
console.log(isIsomorphic(s6, t6)); // Expected: true
console.log(isIsomorphicArray(s6, t6)); // Expected: true
console.log(isIsomorphicPattern(s6, t6)); // Expected: true

// Test case 7: Single character
let s7 = "a",
  t7 = "b";
console.log(isIsomorphic(s7, t7)); // Expected: true
console.log(isIsomorphicArray(s7, t7)); // Expected: true
console.log(isIsomorphicPattern(s7, t7)); // Expected: true

// Test case 8: Complex mapping
let s8 = "abcdefghijklmnopqrstuvwxyz",
  t8 = "bcdefghijklmnopqrstuvwxyza";
console.log(isIsomorphic(s8, t8)); // Expected: true
console.log(isIsomorphicArray(s8, t8)); // Expected: true
console.log(isIsomorphicPattern(s8, t8)); // Expected: true
```

---

## Algorithm Links / Liên kết thuật toán

- [`Hash Table`](../../algorithms/data-structures/hash-table.md) - Core data structure used in hash map solution
- [`Two Pointers`](../../algorithms/patterns/two-pointers.md) - Related pattern for string processing

---

## Tips and Common Pitfalls / Mẹo và các lỗi thường gặp

### Tips / Mẹo

1. **Bidirectional mapping**: Remember to check both s→t and t→s mappings. A character in s can only map to one character in t, and vice versa.

2. **Array vs Hash Map**: For ASCII characters, arrays are more efficient than hash maps. For Unicode characters, use hash maps.

3. **First occurrence pattern**: The first occurrence index approach is elegant - it checks if the pattern of character occurrences matches in both strings.

4. **Length check**: Always check if the strings have the same length first.

5. **Character codes**: Use `charCodeAt()` to get the ASCII code of a character for array-based solutions.

### Common Pitfalls / Lỗi thường gặp

1. **One-way mapping only**: Only checking s→t mapping and forgetting to check t→s mapping. This can lead to false positives.

2. **Not checking length**: Forgetting to check if the strings have the same length.

3. **Array index out of bounds**: When using arrays, make sure to handle the full range of ASCII characters (0-255).

4. **Incorrect initialization**: Not initializing arrays/hash maps properly can lead to incorrect results.

5. **Case sensitivity**: Remember that 'a' and 'A' are different characters.

6. **Unicode characters**: Array-based solutions only work for ASCII. For Unicode, use hash maps.

7. **Updating mappings incorrectly**: Make sure to update both mappings (s→t and t→s) consistently.

8. **Using wrong comparison**: When checking if a character has been seen before, use `has()` for hash maps and check against the initial value for arrays.
