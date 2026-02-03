# Math / Toán học

> Các kỹ thuật toán học cơ bản cho bài toán LeetCode / Basic mathematical techniques for LeetCode problems

---

## 📚 Khái niệm / Concept

**Math** trong lập trình bao gồm các kỹ thuật toán học cơ bản để giải quyết các bài toán liên quan đến số học, chuỗi số, tính toán, và logic.

**Math** in programming includes basic mathematical techniques to solve problems related to numbers, digit manipulation, calculations, and logic.

---

## 🎯 Khi nào dùng? / When to use?

- **Dùng khi:**
  - Cần thao tác với các chữ số của số
  - Cần tính toán modulo, lũy thừa, căn bậc
  - Cần kiểm tra số nguyên tố, ước số
  - Cần xử lý số âm, số dương
  - Cần tính GCD, LCM
  - Cần xử lý overflow

- **Không dùng khi:**
  - Bài toán chỉ liên quan đến cấu trúc dữ liệu
  - Cần tìm kiếm hoặc sắp xếp phức tạp
  - Bài toán liên quan đến đồ thị

---

## 🔄 Các biến thể / Variations

### 1. Digit Manipulation / Thao tác chữ số

Lấy từng chữ số của số để xử lý.

```javascript
// Lấy chữ số cuối
const lastDigit = num % 10;

// Lấy chữ số đầu
const firstDigit = parseInt(num.toString()[0]);

// Đảo ngược số
let reversed = 0;
while (num > 0) {
  reversed = reversed * 10 + (num % 10);
  num = Math.floor(num / 10);
}
```

### 2. Modulo Arithmetic / Toán học modulo

Sử dụng toán tử modulo để xử lý vòng lặp.

```javascript
// Kiểm tra chẵn lẻ
const isEven = num % 2 === 0;

// Xử lý vòng lặp (ví dụ: 0, 1, 2, ..., n-1, n, 0, 1, ...)
const next = (num + 1) % n;
```

### 3. Exponentiation / Lũy thừa

Tính lũy thừa nhanh.

```javascript
// Lũy thừa cơ bản
const power = Math.pow(base, exp);

// Lũy thừa nhanh (Binary Exponentiation)
function fastPow(base, exp) {
  if (exp === 0) return 1;
  if (exp === 1) return base;

  const half = fastPow(base, Math.floor(exp / 2));
  if (exp % 2 === 0) {
    return half * half;
  } else {
    return half * half * base;
  }
}
```

---

## 💡 Code Template / Mẫu Code

### Template cơ bản / Basic Template

```javascript
// Kiểm tra số nguyên tố
function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }

  return true;
}

// Tính GCD (Ước số chung lớn nhất)
function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

// Tính LCM (Bội số chung nhỏ nhất)
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

// Kiểm tra palindrome số
function isPalindromeNumber(n) {
  if (n < 0) return false;

  let original = n;
  let reversed = 0;

  while (n > 0) {
    reversed = reversed * 10 + (n % 10);
    n = Math.floor(n / 10);
  }

  return original === reversed;
}
```

### Template nâng cao / Advanced Template

```javascript
// Đảo ngược số (xử lý overflow)
function reverseInteger(x) {
  const INT_MAX = 2147483647; // 2^31 - 1
  const INT_MIN = -2147483648; // -2^31

  let reversed = 0;
  let num = x;

  while (num !== 0) {
    const digit = num % 10;
    num = Math.trunc(num / 10);

    // Kiểm tra overflow trước khi nhân
    if (
      reversed > INT_MAX / 10 ||
      (reversed === Math.floor(INT_MAX / 10) && digit > 7)
    ) {
      return 0;
    }

    reversed = reversed * 10 + digit;
  }

  return reversed;
}

// Tính căn bậc 2 (Binary Search)
function sqrt(x) {
  if (x < 2) return x;

  let left = 1;
  let right = Math.floor(x / 2);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const square = mid * mid;

    if (square === x) {
      return mid;
    } else if (square < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return right;
}
```

---

## 📝 Ví dụ minh họa / Examples

### Ví dụ 1: Đảo ngược số / Reverse Integer

```javascript
function reverseNumber(x) {
  let reversed = 0;
  let num = x;

  while (num !== 0) {
    reversed = reversed * 10 + (num % 10);
    num = Math.trunc(num / 10);
  }

  return reversed;
}

// reverseNumber(123) = 321
// Time: O(log n), Space: O(1)
```

### Ví dụ 2: Kiểm tra số nguyên tố / Prime Check

```javascript
function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }

  return true;
}

// isPrime(17) = true
// isPrime(18) = false
// Time: O(√n), Space: O(1)
```

### Ví dụ 3: Tính Fibonacci / Fibonacci

```javascript
function fibonacci(n) {
  if (n <= 1) return n;

  let a = 0,
    b = 1;

  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }

  return b;
}

// fibonacci(10) = 55
// Time: O(n), Space: O(1)
```

---

## 🎯 Bài toán LeetCode sử dụng / LeetCode Problems using this

- [`../problems/easy/007-reverse-integer.md`](../problems/easy/007-reverse-integer.md)
- [`../problems/easy/069-sqrtx.md`](../problems/easy/069-sqrtx.md)
- [`../problems/easy/066-plus-one.md`](../problems/easy/066-plus-one.md)
- [`../problems/easy/067-add-binary.md`](../problems/easy/067-add-binary.md)

---

## 📊 Độ phức tạp / Complexity

| Thao tác / Operation | Time             | Space | Mô tả / Description |
| -------------------- | ---------------- | ----- | ------------------- |
| Digit manipulation   | O(log n)         | O(1)  | Số chữ số của n     |
| Modulo               | O(1)             | O(1)  | Toán tử modulo      |
| Exponentiation       | O(log n)         | O(1)  | Lũy thừa nhanh      |
| Prime check          | O(√n)            | O(1)  | Kiểm tra nguyên tố  |
| GCD/LCM              | O(log(min(a,b))) | O(1)  | Ước/bội số          |

---

## ⚠️ Lỗi thường gặp / Common Pitfalls

1. **Integer overflow**: Không kiểm tra khi nhân/cộng số lớn
2. **Negative numbers**: Không xử lý đúng với số âm
3. **Floating point**: Dùng float thay vì integer
4. **Modulo with negative**: Kết quả modulo có thể âm
5. **Off-by-one**: Đếm sai số lần lặp

---

## 💡 Tips & Tricks

- Dùng `Math.trunc()` thay vì `Math.floor()` cho số âm
- Dùng `Math.abs()` để lấy giá trị tuyệt đối
- Dùng `Math.pow()` hoặc `**` cho lũy thừa
- Dùng `%` để lấy chữ số cuối
- Dùng `/` và `Math.floor()` để loại bỏ chữ số cuối
- Kiểm tra overflow trước khi thực hiện phép tính
- Dùng `Number.isInteger()` để kiểm tra số nguyên

---

## 📚 Tài liệu tham khảo / References

- [Math Object - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
- [Number Theory - Wikipedia](https://en.wikipedia.org/wiki/Number_theory)

---

_Last updated: 2026-02-03_
