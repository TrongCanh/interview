# String / Chuỗi

> Cấu trúc dữ liệu lưu trữ chuỗi ký tự / Data structure for storing character sequences

---

## 📚 Khái niệm / Concept

**String** là một cấu trúc dữ liệu lưu trữ chuỗi các ký tự. Trong JavaScript, string là immutable (không thể thay đổi), mỗi thao tác tạo ra string mới.

**A String** is a data structure that stores a sequence of characters. In JavaScript, strings are immutable (cannot be changed), each operation creates a new string.

---

## 🎯 Khi nào dùng? / When to use?

- **Dùng khi:**
  - Cần lưu trữ và xử lý văn bản
  - Cần thao tác với chuỗi (cắt, nối, thay thế)
  - Cần so sánh chuỗi
  - Cần tìm kiếm chuỗi con

- **Không dùng khi:**
  - Cần thay đổi thường xuyên (dùng Array thay vì)
  - Cần lưu trữ số hoặc các kiểu khác
  - Cần truy cập ngẫu nhiên nhanh

---

## 🔄 Các biến thể / Variations

### 1. String Literal / Chuỗi literal

```javascript
const str = "Hello World";
const str2 = "Hello World";
```

### 2. String Object / Đối tượng String

```javascript
const str = new String("Hello World");
```

### 3. Template Literals / Chuỗi template

```javascript
const name = "John";
const greeting = `Hello ${name}!`;
```

---

## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template

```javascript
// Tạo chuỗi
const str = "Hello World";

// Lấy độ dài
const length = str.length;

// Truy cập ký tự
const firstChar = str[0]; // 'H'
const lastChar = str[str.length - 1]; // 'd'

// Lấy chuỗi con
const substring = str.substring(0, 5); // 'Hello'
const slice = str.slice(6); // 'World'

// Tìm kiếm
const index = str.indexOf("World"); // 6
const includes = str.includes("World"); // true

// Thay thế
const replaced = str.replace("World", "JavaScript"); // 'Hello JavaScript'

// Chuyển thành mảng
const arr = str.split(""); // ['H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd']
const arrByWord = str.split(" "); // ['Hello', 'World']

// Chuyển mảng thành chuỗi
const joined = arr.join(""); // 'Hello World'

// Chuyển chữ hoa/thường
const upper = str.toUpperCase(); // 'HELLO WORLD'
const lower = str.toLowerCase(); // 'hello world'

// Loại bỏ khoảng trắng
const trimmed = str.trim(); // 'Hello World'

// Lặp lại chuỗi
const repeated = str.repeat(3); // 'Hello WorldHello WorldHello World'
```

### Template nâng cao / Advanced Template

```javascript
// Regex - Biểu thức chính quy
const pattern = /\d+/g; // Tìm tất cả số
const found = str.match(pattern); // Mảng các kết quả
const replaced = str.replace(pattern, "X"); // Thay thế tất cả số bằng X

// Unicode
const emoji = "😀🎉";
const emojiLength = [...emoji].length; // 2 (số code points)
const byteLength = new Blob([emoji]).size; // 8 (số bytes)

// So sánh không phân biệt hoa thường
const str1 = "Hello";
const str2 = "hello";
const equals = str1.toLowerCase() === str2.toLowerCase(); // true

// Tìm tất cả vị trí
const allIndices = [];
let index = str.indexOf("o");
while (index !== -1) {
  allIndices.push(index);
  index = str.indexOf("o", index + 1);
}

// Kiểm tra palindrome chuỗi
function isPalindromeString(s) {
  const reversed = s.split("").reverse().join("");
  return s === reversed;
}

// Đảo ngược chuỗi
const reversed = str.split("").reverse().join("");
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1: Longest Common Prefix / Tiền tố chung dài nhất

```javascript
function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";

  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.substring(0, prefix.length - 1);
    }
  }

  return prefix;
}

// longestCommonPrefix(['flower', 'flow', 'flight']) = 'fl'
// Time: O(n * m), Space: O(1)
```

### Ví dụ 2: Valid Anagram / Kiểm tra anagram

```javascript
function isAnagram(s1, s2) {
  if (s1.length !== s2.length) return false;

  const count1 = {};
  const count2 = {};

  for (const char of s1) {
    count1[char] = (count1[char] || 0) + 1;
  }

  for (const char of s2) {
    count2[char] = (count2[char] || 0) + 1;
  }

  for (const char in count1) {
    if (count1[char] !== count2[char]) return false;
  }

  return true;
}

// isAnagram('listen', 'silent') = true
// Time: O(n), Space: O(1) - giả sử dụng bảng chữ cái
```

### Ví dụ 3: Roman to Integer / Chuyển số La Mã

```javascript
function romanToInt(s) {
  const roman = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const value = roman[s[i]];
    const nextValue = roman[s[i + 1]];

    if (nextValue && value < nextValue) {
      result -= value;
    } else {
      result += value;
    }
  }

  return result;
}

// romanToInt('MCMXCIV') = 1994
// Time: O(n), Space: O(1)
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [`../problems/easy/013-roman-to-integer.md`](../problems/easy/013-roman-to-integer.md)
- [`../problems/easy/014-longest-common-prefix.md`](../problems/easy/014-longest-common-prefix.md)
- [`../problems/easy/058-length-of-last-word.md`](../problems/easy/058-length-of-last-word.md)

---

## 📊 Độ phức tạp / Complexity

| Thao tác / Operation           | Time     | Space    | Mô tả / Description   |
| ------------------------------ | -------- | -------- | --------------------- |
| Truy cập ký tự / Access        | O(1)     | O(1)     | Truy cập theo chỉ số  |
| Lấy độ dài / Length            | O(1)     | O(1)     | Thuộc tính length     |
| Nối chuỗi / Concat             | O(n + m) | O(n + m) | Tạo chuỗi mới         |
| Cắt chuỗi con / Substring      | O(k)     | O(k)     | k là độ dài chuỗi con |
| Tìm kiếm / Search              | O(n)     | O(1)     | indexOf/includes      |
| Thay thế / Replace             | O(n)     | O(n)     | Tạo chuỗi mới         |
| Chuyển thành mảng / Split      | O(n)     | O(n)     | Tạo mảng mới          |
| Chuyển mảng thành chuỗi / Join | O(n)     | O(n)     | Tạo chuỗi mới         |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **String immutability**: Cố gán vào chỉ số không hoạt động
2. **Unicode handling**: `length` không phải số ký tự hiển thị
3. **Case sensitivity**: So sánh phân biệt hoa thường khi không mong muốn
4. **Off-by-one**: Lấy substring sai chỉ số
5. **Memory leak**: Tạo nhiều chuỗi tạm thời

---

## 💡 Tips & Tricks

- Dùng template literals `` ` `` cho chuỗi có biến
- Dùng `includes()` thay vì `indexOf() !== -1`
- Dùng `startsWith()` và `endsWith()` để kiểm tra tiền tố/hậu tố
- Dùng spread operator `[...str]` để chuyển thành mảng ký tự
- Dùng `str.repeat()` để lặp lại chuỗi
- Dùng `str.trim()` để loại bỏ khoảng trắng
- Dùng `str.padStart()` và `str.padEnd()` để đệm chuỗi
- Dùng `str.localeCompare()` để so sánh chuỗi có dấu
- Cẩn thận với Unicode: dùng `Array.from(str)` hoặc `[...str]`

---

## 📚 Tài liệu tham khảo / References

- [MDN - String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [JavaScript String - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

_Last updated: 2026-02-03_
