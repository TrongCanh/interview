# Hash Table / Bảng Băm

> Cấu trúc dữ liệu cho phép truy cập nhanh dựa trên key / Data structure for fast key-based access

---

## 📚 Khái niệm / Concept

**Hash Table** là một cấu trúc dữ liệu lưu trữ các cặp key-value, sử dụng hàm băm (hash function) để tính toán chỉ số lưu trữ. Cho phép truy cập, chèn, xóa với độ phức tạp trung bình O(1).

**A Hash Table** is a data structure that stores key-value pairs, using a hash function to compute an index. Allows access, insert, delete with average O(1) complexity.

---

## 🎯 Khi nào dùng? / When to use?

- **Dùng khi:**
  - Cần truy cập nhanh theo key O(1)
  - Cần kiểm tra sự tồn tại của phần tử
  - Cần đếm tần suất xuất hiện
  - Cần ánh xạ từ key sang value
  - Cần loại bỏ phần tử trùng

- **Không dùng khi:**
  - Cần duyệt theo thứ tự
  - Cần tìm phần tử nhỏ nhất/lớn nhất
  - Key là object phức tạp (không hashable)
  - Cần truy cập theo chỉ số

---

## 🔄 Các biến thể / Variations

### 1. Object / Đối tượng (JavaScript)

Key chỉ có thể là string hoặc symbol.

```javascript
const obj = {
  name: "John",
  age: 30,
  [Symbol("id")]: 123,
};
```

### 2. Map / Bản đồ (JavaScript)

Key có thể là bất kỳ giá trị nào.

```javascript
const map = new Map();
map.set("name", "John");
map.set(123, "number key");
map.set({ id: 1 }, "object key");
```

### 3. WeakMap / Bản đồ yếu

Key phải là object, được tự động thu gom rác.

```javascript
const weakMap = new WeakMap();
const obj = { id: 1 };
weakMap.set(obj, "data");
```

---

## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template

```javascript
// Object - chỉ key là string/symbol
const obj = {};

// Thêm / Cập nhật
obj["name"] = "John";
obj.age = 30;

// Truy cập
console.log(obj["name"]); // 'John'
console.log(obj.age); // 30

// Kiểm tra tồn tại
console.log("name" in obj); // true
console.log(obj.hasOwnProperty("age")); // true

// Xóa
delete obj.age;

// Duyệt
for (const key in obj) {
  console.log(key, obj[key]);
}

Object.keys(obj).forEach((key) => {
  console.log(key, obj[key]);
});
```

### Template nâng cao / Advanced Template

```javascript
// Map - key có thể là bất kỳ giá trị nào
const map = new Map();

// Thêm / Cập nhật
map.set("name", "John");
map.set(123, "number");
map.set({ id: 1 }, "object");

// Truy cập
console.log(map.get("name")); // 'John'

// Kiểm tra tồn tại
console.log(map.has("name")); // true

// Xóa
map.delete("age");

// Lấy kích thước
console.log(map.size);

// Xóa tất cả
map.clear();

// Duyệt
map.forEach((value, key) => {
  console.log(key, value);
});

for (const [key, value] of map.entries()) {
  console.log(key, value);
}

for (const key of map.keys()) {
  console.log(key);
}

for (const value of map.values()) {
  console.log(value);
}

// Chuyển đổi
const objFromMap = Object.fromEntries(map);
const mapFromObj = new Map(Object.entries(obj));
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1: Đếm tần suất / Count Frequency

```javascript
function countFrequency(arr) {
  const freq = new Map();

  for (const item of arr) {
    freq.set(item, (freq.get(item) || 0) + 1);
  }

  return freq;
}

// Time: O(n), Space: O(n)
```

### Ví dụ 2: Two Sum / Tổng hai số

```javascript
function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }

    seen.set(nums[i], i);
  }

  return [];
}

// Time: O(n), Space: O(n)
```

### Ví dụ 3: Group Anagrams / Nhóm Anagrams

```javascript
function groupAnagrams(strs) {
  const groups = new Map();

  for (const str of strs) {
    const key = str.split("").sort().join("");

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key).push(str);
  }

  return Array.from(groups.values());
}

// Time: O(n * k log k), Space: O(n * k)
// k là độ dài trung bình của chuỗi
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [`../problems/easy/001-two-sum.md`](../problems/easy/001-two-sum.md)
- [`../problems/easy/013-roman-to-integer.md`](../problems/easy/013-roman-to-integer.md)
- [`../problems/medium/003-longest-substring-without-repeating-characters.md`](../problems/medium/003-longest-substring-without-repeating-characters.md)
- [`../problems/medium/012-integer-to-roman.md`](../problems/medium/012-integer-to-roman.md)
- [`../problems/medium/017-letter-combinations-of-a-phone-number.md`](../problems/medium/017-letter-combinations-of-a-phone-number.md)

---

## 📊 Độ phức tạp / Complexity

| Thao tác / Operation  | Object | Map  | WeakMap      |
| --------------------- | ------ | ---- | ------------ |
| Truy cập / Access     | O(1)   | O(1) | O(1)         |
| Thêm / Insert         | O(1)   | O(1) | O(1)         |
| Xóa / Delete          | O(1)   | O(1) | O(1)         |
| Kiểm tra / Has        | O(1)   | O(1) | O(1)         |
| Duyệt / Iterate       | O(n)   | O(n) | Không hỗ trợ |
| Lấy kích thước / Size | O(n)   | O(1) | Không hỗ trợ |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Using Object with numeric keys**: Số tự động chuyển thành string
2. **Map key comparison**: Object được so sánh theo tham chiếu, không phải giá trị
3. **Hash collisions**: Khó xảy ra trong JavaScript nhưng cần hiểu
4. **WeakMap keys**: Phải là object, không thể duyệt
5. **Ordering**: Object không đảm bảo thứ tự (trừ ES6+), Map đảm bảo thứ tự chèn

---

## 💡 Tips & Tricks

- Dùng Map khi key có thể là bất kỳ giá trị nào
- Dùng Object khi chỉ cần key là string/symbol
- Dùng WeakMap cho dữ liệu tạm thời với object key
- Dùng `Map.has()` thay vì `Map.get() !== undefined`
- Dùng `Map.set()` trả về Map để chain
- Dùng `Map.size` thay vì tính thủ công

---

## 📚 Tài liệu tham khảo / References

- [MDN - Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN - WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [Hash Table - Wikipedia](https://en.wikipedia.org/wiki/Hash_table)

---

_Last updated: 2026-02-03_
