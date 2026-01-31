# 2. Variables & Hoisting

## Tổng quan về Variables trong JavaScript

### Mục đích của Variables / Purpose

**Variables** là containers để lưu trữ data values trong JavaScript.

**Mục đích chính:**

- Lưu trữ và truy xuất dữ liệu
- Reuse values trong code
- Manage state
- Pass data giữa functions

### Khi nào cần hiểu về Variables / When to Use

Hiểu về variables là cần thiết khi:

- Viết bất kỳ code JavaScript nào
- Debug variable-related issues
- Optimize memory usage
- Implement state management

### Giúp ích gì / Benefits

**Lợi ích:**

- **Data storage**: Lưu trữ data hiệu quả
- **Reusability**: Reuse values trong code
- **State management**: Manage application state
- **Flexibility**: Support different data types

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm                         |
| ---------------------- | ---------------------------------- |
| Flexible data storage  | Memory leaks nếu không quản lý tốt |
| Dynamic typing         | Type errors ở runtime              |
| Easy to use            | Scope confusion với `var`          |
| Support all data types | Hoisting behavior unexpected       |

---

## Sự khác biệt giữa `var`, `let`, và `const` là gì?

**Sự khác biệt giữa `var`, `let`, và `const`** là mỗi keyword được thiết kế cho các use cases khác nhau để khai báo biến trong JavaScript.

### Mục đích / Purpose

Mỗi keyword được thiết kế cho các use cases khác nhau:

- `var`: Legacy, function-scoped variables
- `let`: Block-scoped, reassignable variables
- `const`: Block-scoped, immutable references

### Khi nào dùng / When to Use

| Keyword | Khi nào dùng                                            |
| ------- | ------------------------------------------------------- |
| `var`   | Legacy code, không nên dùng trong new code              |
| `let`   | Biến cần thay đổi giá trị (loop counters, accumulators) |
| `const` | Biến không đổi (constants, configuration, API URLs)     |

### Giúp ích gì / Benefits

**Lợi ích:**

- **`const`**: Immutability, code an toàn hơn
- **`let`**: Block scope, tránh hoisting issues
- **`var`**: Legacy support (nhưng không nên dùng)

### Ưu nhược điểm / Pros & Cons

| Keyword | Ưu điểm                   | Nhược điểm                                        |
| ------- | ------------------------- | ------------------------------------------------- |
| `var`   | Legacy support            | Function scope, hoisting issues, global pollution |
| `let`   | Block scope, TDZ          | Không redeclaration                               |
| `const` | Immutability, block scope | Không reassignment                                |

### Bảng so sánh tổng quan:

| Đặc điểm               | `var`                            | `let`       | `const`     |
| ---------------------- | -------------------------------- | ----------- | ----------- |
| Scope                  | Function scope                   | Block scope | Block scope |
| Hoisting               | Có (initialized với `undefined`) | Có (TDZ)    | Có (TDZ)    |
| Re-declare             | ✅ Có                            | ❌ Không    | ❌ Không    |
| Re-assign              | ✅ Có                            | ✅ Có       | ❌ Không    |
| Global object property | ✅ Có                            | ❌ Không    | ❌ Không    |
| Temporal Dead Zone     | ❌ Không                         | ✅ Có       | ✅ Có       |

### Ví dụ:

```javascript
// var - Function scope, hoisting
console.log(x); // undefined (không lỗi)
var x = 5;
console.log(x); // 5

// let - Block scope, TDZ
// console.log(z);  // ReferenceError: Cannot access 'z' before initialization
let z = 5;
console.log(z); // 5

// const - Block scope, immutable
const c = 5;
console.log(c); // 5
// c = 10;  // TypeError: Assignment to constant variable

// Object và Array vẫn có thể thay đổi nội dung
const obj = { name: "John" };
obj.name = "Jane"; // OK
obj.age = 25; // OK
// obj = {};         // TypeError
```

### Best Practices:

```javascript
// ✅ Dùng const mặc định
const API_URL = "https://api.example.com";
const MAX_RETRIES = 3;

// ✅ Dùng let khi cần reassign
let count = 0;
count++;

// ✅ Không dùng var
// var oldStyle = 'avoid';

// ✅ Dùng let cho loop
for (let i = 0; i < 10; i++) {
  // i được reassign mỗi iteration
}

// ✅ Dùng const cho destructuring
const { name, age } = user;
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng var trong modern code
var counter = 0;
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3
}

// ✅ Nên dùng let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2
}

// ❌ Không nên dùng const cho biến cần thay đổi
const count = 0;
count++; // TypeError

// ✅ Nên dùng let
let count = 0;
count++;
```

---

## Scope của `var`, `let`, `const`?

**Scope** xác định nơi biến có thể truy cập được trong code.

### Mục đích / Purpose

**Scope** được thiết kế để:

- Encapsulation: Giới hạn access
- Avoid naming conflicts
- Memory management
- Code organization

### Khi nào dùng / When to Use

| Scope type     | Khi nào dùng                    |
| -------------- | ------------------------------- |
| Function scope | Legacy code với `var`           |
| Block scope    | Modern code với `let`/`const`   |
| Global scope   | Constants, utilities (cẩn thận) |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Encapsulation**: Giới hạn access, tránh conflicts
- **Memory management**: Variables được cleanup khi scope kết thúc
- **Code safety**: Tránh accidental modifications
- **Predictability**: Biến chỉ truy cập được trong scope

### Ưu nhược điểm / Pros & Cons

| Scope type     | Ưu điểm             | Nhược điểm                       |
| -------------- | ------------------- | -------------------------------- |
| Function scope | Legacy support      | Dễ gây conflicts                 |
| Block scope    | Safe, predictable   | Không support trong old browsers |
| Global scope   | Accessible anywhere | Naming conflicts, pollution      |

### Ví dụ:

```javascript
// Function Scope với var
function testVar() {
  var x = 10;
  if (true) {
    var y = 20; // Vẫn truy cập được ngoài if
  }
  console.log(y); // 20 - OK
}

// Block Scope với let, const
function testLetConst() {
  let x = 10;
  const y = 20;
  if (true) {
    let a = 30; // Chỉ trong if block
    const b = 40; // Chỉ trong if block
  }
  // console.log(a);  // ReferenceError
  // console.log(b);  // ReferenceError
}
```

### Best Practices:

```javascript
// ✅ Dùng block scope với let/const
function processData(items) {
  let sum = 0;
  const multiplier = 2;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    sum += item * multiplier;
  }

  return sum;
}

// ❌ Tránh function scope với var
function badProcess(items) {
  var sum = 0;
  var multiplier = 2;

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    sum += item * multiplier;
  }

  return sum;
}
```

---

## Temporal Dead Zone (TDZ) là gì?

**Temporal Dead Zone (TDZ)** là khoảng thời gian từ khi biến được khai báo cho đến khi được khởi tạo, trong đó biến không thể truy cập được.

### Mục đích / Purpose

**TDZ** được thiết kế để:

- Truy cập biến trước khi khởi tạo
- Catch errors sớm
- Đảm bảo code predictability
- Tránh unexpected behavior

### Khi nào gặp tình huống này / When to Use

TDZ áp dụng tự động với `let` và `const`:

- Từ đầu block đến dòng khai báo
- Không thể truy cập biến trong TDZ

### Giúp ích gì / Benefits

**Lợi ích:**

- **Early error detection**: Catch errors trước khi chạy
- **Predictability**: Biến chỉ truy cập được sau khi khởi tạo
- **Code safety**: Tránh accidental use of uninitialized variables
- **Debugging**: Dễ dàng tìm lỗi

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm                              |
| --------------------- | --------------------------------------- |
| Early error detection | Có thể gây confusion cho beginners      |
| Predictable behavior  | Không như `var` (hoisted với undefined) |
| Code safety           | Cần hiểu về hoisting                    |

### Ví dụ:

```javascript
// TDZ với let
{
  // TDZ cho x - không thể truy cập
  // console.log(x);  // ReferenceError: Cannot access 'x' before initialization
  let x = 5; // TDZ kết thúc tại đây
  console.log(x); // 5 - OK
}

// TDZ với const
{
  // TDZ cho y
  // console.log(y);  // ReferenceError
  const y = 10; // TDZ kết thúc
  console.log(y); // 10 - OK
}

// var không có TDZ
{
  console.log(z); // undefined (không ReferenceError)
  var z = 15;
  console.log(z); // 15
}
```

### Best Practices:

```javascript
// ✅ Khai báo biến trước khi dùng
function process() {
  let result;
  let error;

  try {
    result = calculate();
  } catch (e) {
    error = e;
  }

  if (error) {
    handleError(error);
  } else {
    processResult(result);
  }
}

// ❌ Tránh dùng biến trước khi khai báo
function badProcess() {
  // console.log(result);  // ReferenceError trong TDZ
  let result = calculate();
}
```

---

## `var` có vấn đề gì với hoisting?

**Hoisting với `var`** đưa khai báo lên đầu scope và khởi tạo với `undefined`, có thể gây unexpected behavior.

### Mục đích / Purpose

Hiểu về hoisting với `var` giúp:

- Tránh unexpected behavior
- Debug hoisting-related issues
- Write predictable code
- Migrate từ `var` sang `let`/`const`

### Khi nào gặp vấn đề / When to Use

Vấn đề với `var` hoisting xuất hiện khi:

- Truy cập biến trước khi khai báo
- Dùng `var` trong loops
- Gặp unexpected `undefined` values

### Giúp ích gì / Benefits

Hiểu về vấn đề giúp:

- **Avoid bugs**: Tránh hoisting-related bugs
- **Better code**: Write predictable code
- **Migration**: Migrate sang `let`/`const`
- **Debugging**: Dễ dàng tìm và fix lỗi

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                                   | Nhược điểm                 |
| ----------------------------------------- | -------------------------- |
| Hoisting cho phép dùng trước khi khai báo | Dễ gây unexpected behavior |
| Legacy support                            | Function scope gây issues  |
| Predictable với function declarations     | `undefined` thay vì error  |

### Ví dụ:

```javascript
// Vấn đề với var hoisting
console.log(x); // undefined - không lỗi
var x = 5;
console.log(x); // 5

// Loop với var - vấn đề
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 (thay vì 0, 1, 2)

// Giải pháp với let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2
```

### Best Practices:

```javascript
// ✅ Khai báo biến ở đầu scope
function good() {
  let result;
  let error;

  try {
    result = calculate();
  } catch (e) {
    error = e;
  }

  if (error) {
    handleError(error);
  } else {
    processResult(result);
  }
}

// ✅ Dùng let/const thay vì var
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

// ✅ Khai báo function trước khi dùng
function calculate() {
  return 42;
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Dùng var trong loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}

// ❌ Truy cập biến trước khi khai báo
console.log(myVar); // undefined
var myVar = 10;

// ✅ Dùng let trong loops
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

---

## Block scope vs Function scope?

**Block scope vs Function scope** - Function scope (var) truy cập được trong toàn bộ function, Block scope (let/const) chỉ trong block.

### Mục đích / Purpose

Hiểu về scope types giúp:

- Write predictable code
- Avoid naming conflicts
- Manage variable lifecycle
- Choose appropriate variable declarations

### Khi nào dùng / When to Use

| Scope type     | Khi nào dùng                  |
| -------------- | ----------------------------- |
| Function scope | Legacy code với `var`         |
| Block scope    | Modern code với `let`/`const` |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Block scope**: Safe, predictable, no conflicts
- **Function scope**: Legacy support
- **Predictability**: Biến chỉ truy cập được trong scope

### Ưu nhược điểm / Pros & Cons

| Scope type     | Ưu điểm           | Nhược điểm                       |
| -------------- | ----------------- | -------------------------------- |
| Function scope | Legacy support    | Dễ gây conflicts                 |
| Block scope    | Safe, predictable | Không support trong old browsers |

### Ví dụ:

```javascript
// Function Scope với var
function testFunctionScope() {
  var x = 10;
  if (true) {
    var y = 20; // Function scope, không phải block scope
  }
  console.log(y); // 20 - truy cập được từ bất kỳ đâu trong function
}

// Block Scope với let, const
function testBlockScope() {
  let x = 10;
  const y = 20;
  if (true) {
    let a = 30; // Block scope - chỉ trong if block
    console.log(a); // 30 - OK
  }
  // console.log(a);  // ReferenceError - không truy cập được ngoài block
}
```

### Best Practices:

```javascript
// ✅ Dùng block scope với let/const
function processItems(items) {
  let total = 0;
  const multiplier = 2;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    total += item * multiplier;
  }

  return total;
}

// ✅ Dùng IIFE tạo function scope cho var (legacy)
(function () {
  var data = "private";
  console.log(data);
})();
```

### Anti-patterns cần tránh:

```javascript
// ❌ Dùng var trong nested blocks
function badScope() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 - có thể truy cập từ ngoài if
}

// ✅ Dùng let/const trong block scope
function goodScope() {
  if (true) {
    let x = 10;
  }
  // console.log(x);  // ReferenceError - không truy cập được
}
```

---

## Global scope pollution với `var`?

**Global scope pollution** - khi dùng `var` trong global scope, biến trở thành property của global object, gây ra xung đột tên.

### Mục đích / Purpose

Hiểu về global scope pollution giúp:

- Avoid naming conflicts
- Write modular code
- Prevent bugs from global variables
- Use modules effectively

### Khi nào gặp vấn đề / When to Use

Vấn đề global scope pollution xuất hiện khi:

- Dùng `var` trong global scope
- Multiple scripts chạy cùng nhau
- Không sử dụng modules

### Giúp ích gì / Benefits

Hiểu về vấn đề giúp:

- **Avoid conflicts**: Tránh naming conflicts
- **Modular code**: Write modular code
- **Prevent bugs**: Tránh bugs từ global variables
- **Best practices**: Sử dụng modules

### Ưu nhược điểm / Pros & Cons

| Approach         | Ưu điểm      | Nhược điểm                  |
| ---------------- | ------------ | --------------------------- |
| Global variables | Easy access  | Naming conflicts, pollution |
| Modules          | Encapsulated | Cần build tools             |
| IIFE             | No pollution | Verbose                     |

### Ví dụ:

```javascript
// Global scope pollution với var
var globalVar = "polluted";
console.log(window.globalVar); // 'polluted'

// let và const không gây pollution
let globalLet = "not polluted";
const globalConst = "not polluted";
console.log(window.globalLet); // undefined
console.log(window.globalConst); // undefined
```

### Best Practices:

```javascript
// ✅ Dùng const cho constants
const CONFIG = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};

// ✅ Dùng ES6 modules
// config.js
export const config = {
  apiUrl: "https://api.example.com",
};

// main.js
import { config } from "./config.js";
```

### Anti-patterns cần tránh:

```javascript
// ❌ Dùng var trong global scope
var API_KEY = "xxx";
var apiUrl = "https://api.example.com";

// ❌ Ghi đ accidentally
API_KEY = "yyy";

// ✅ Dùng const
const API_KEY = "xxx";
const API_URL = "https://api.example.com";

// ✅ Dùng modules
export const config = {
  apiKey: "xxx",
  apiUrl: "https://api.example.com",
};
```

---

## Redeclaration và reassignment?

**Redeclaration và reassignment** - khai báo lại và gán lại giá trị cho biến.

### Mục đích / Purpose

Hiểu về redeclaration và reassignment giúp:

- Write predictable code
- Avoid syntax errors
- Choose appropriate variable declarations
- Debug variable-related issues

### Khi nào dùng / When to Use

| Operation     | Khi nào dùng                      |
| ------------- | --------------------------------- |
| Redeclaration | Không nên dùng (trừ `var` legacy) |
| Reassignment  | Khi cần thay đổi giá trị (`let`)  |
| Immutability  | Khi giá trị không đổi (`const`)   |

### Giúp ích gì / Benefits

Hiểu về redeclaration và reassignment giúp:

- **Avoid errors**: Tránh syntax errors
- **Predictable code**: Code dễ dự đoán
- **Best practices**: Sử dụng `const` mặc định
- **Debugging**: Dễ dàng tìm và fix lỗi

### Ưu nhược điểm / Pros & Cons

| Operation     | Ưu điểm                  | Nhược điểm           |
| ------------- | ------------------------ | -------------------- |
| Redeclaration | Legacy support với `var` | Dễ gây confusion     |
| Reassignment  | Flexible với `let`       | Không có với `const` |
| Immutability  | Safe với `const`         | Không thể thay đổi   |

### Ví dụ:

```javascript
// var - cho phép redeclaration
var a = 1;
var a = 2; // OK - không lỗi
console.log(a); // 2

// let - không cho phép redeclaration
let b = 1;
// let b = 2;  // SyntaxError: Identifier 'b' has already been declared

// const - không cho phép redeclaration
const c = 1;
// const c = 2;  // SyntaxError: Identifier 'c' has already been declared

// const - không cho phép reassignment
const d = 1;
// d = 2;  // TypeError: Assignment to constant variable

// let - cho phép reassignment
let e = 1;
e = 2; // OK
console.log(e); // 2
```

### Best Practices:

```javascript
// ✅ Dùng const mặc định
const API_URL = "https://api.example.com";
const MAX_RETRIES = 3;

// ✅ Dùng let khi cần reassign
let count = 0;
count++;

// ✅ Object.freeze() để bảo vệ const object
const config = Object.freeze({
  apiUrl: "https://api.example.com",
  timeout: 5000,
});
```

### Anti-patterns cần tránh:

```javascript
// ❌ Redeclaration với var
var counter = 0;
var counter = 0; // Dễ gây nhầm lẫn

// ❌ Reassignment với const
const MAX_COUNT = 100;
MAX_COUNT = 200; // TypeError

// ✅ Dùng let cho reassignment
let count = 0;
count++;
```

---

## Khi nào nên dùng `let` và khi nào nên dùng `const`?

**Khi nào dùng `let` và khi nào nên dùng `const`** - chọn đúng variable declaration giúp write predictable và safe code.

### Mục đích / Purpose

Chọn đúng variable declaration giúp:

- Write predictable code
- Avoid bugs
- Optimize performance
- Follow best practices

### Khi nào dùng / When to Use

| Keyword | Khi nào dùng                       |
| ------- | ---------------------------------- |
| `const` | Mặc định cho mọi giá trị không đổi |
| `let`   | Khi cần thay đổi giá trị           |
| `var`   | Không nên dùng (trừ legacy code)   |

### Giúp ích gì / Benefits

**Lợi ích:**

- **`const`**: Immutability, code an toàn hơn
- **`let`**: Flexibility khi cần thay đổi
- **Predictability**: Code dễ đọc và maintain

### Ưu nhược điểm / Pros & Cons

| Keyword | Ưu điểm            | Nhược điểm              |
| ------- | ------------------ | ----------------------- |
| `const` | Immutability, safe | Không thể reassign      |
| `let`   | Flexible           | Có thể thay đổi bất ngờ |

### Ví dụ:

```javascript
// ✅ const - cho giá trị không đổi
const API_URL = "https://api.example.com";
const MAX_RETRIES = 3;

// ✅ let - cho biến thay đổi
let count = 0;
count++;

// ✅ const object - modify content
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};
config.timeout = 3000; // OK
```

### Best Practices:

```javascript
// ✅ Dùng const mặc định
const CONFIG = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};

// ✅ Dùng let khi cần reassign
let count = 0;
for (let i = 0; i < 10; i++) {
  count += i;
}

// ✅ Dùng let cho conditional reassignment
let result;
if (condition) {
  result = calculateA();
} else {
  result = calculateB();
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Dùng const cho biến thay đổi
const count = 0;
count++; // TypeError

// ❌ Dùng let cho constant
let API_URL = "https://api.example.com";
API_URL = "https://api2.example.com"; // Không nên thay đổi

// ✅ Dùng const cho constants
const API_URL = "https://api.example.com";

// ✅ Dùng let cho biến thay đổi
let count = 0;
count++;
```
