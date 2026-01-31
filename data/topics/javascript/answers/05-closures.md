# 5. Closures

## Tổng quan về Closures

### Mục đích của Closures / Purpose

**Closure** là một function kết hợp với lexical environment của nó, cho phép function truy cập các biến từ scope bên ngoài ngay cả khi function bên ngoài đã thực thi xong.

**Mục đích chính:**

- Tạo private variables
- Data encapsulation
- Function factories
- State management

### Khi nào cần hiểu về Closures / When to Use

Hiểu về closures là cần thiết khi:

- Tạo private variables
- Implement module pattern
- Xử lý event handlers
- Debug memory leaks

### Giúp ích gì / Benefits

**Lợi ích:**

- **Data privacy**: Tạo private variables
- **Encapsulation**: Hide implementation details
- **State management**: Maintain state
- **Function factories**: Create functions with presets

### Ưu nhược điểm / Pros & Cons

| Ưu điểm            | Nhược điểm                         |
| ------------------ | ---------------------------------- |
| Data privacy       | Memory leaks nếu không quản lý tốt |
| Encapsulation      | Debugging khó hơn                  |
| State management   | Performance overhead               |
| Function factories | Có thể gây confusion               |

---

## Closure là gì? Giải thích với ví dụ.

**Closure** là một function kết hợp với lexical environment của nó. Closure cho phép function truy cập các biến từ scope bên ngoài ngay cả khi function bên ngoài đã thực thi xong.

### Mục đích / Purpose

**Closure** được thiết kế để:

- Truy cập variables từ outer scope
- Giữ state giữa function calls
- Tạo private variables
- Implement data encapsulation

### Khi nào dùng / When to Use

Closures nên dùng khi:

- Cần truy cập outer variables
- Tạo private data
- Implement factories
- Manage state

### Giúp ích gì / Benefits

**Lợi ích:**

- **Lexical access**: Truy cập outer variables
- **State retention**: Giữ state giữa calls
- **Data privacy**: Tạo private variables
- **Flexibility**: Flexible programming pattern

### Ưu nhược điểm / Pros & Cons

| Ưu điểm              | Nhược điểm             |
| -------------------- | ---------------------- |
| Truy cập outer scope | Memory overhead        |
| Giữ state            | Có thể gây memory leak |
| Data privacy         | Debugging khó hơn      |

### Ví dụ:

```javascript
// Closure: inner function có thể truy cập biến của outer function
function outerFunction(outerVariable) {
  // Lexical environment: { outerVariable }

  return function innerFunction(innerVariable) {
    // Closure - truy cập outerVariable từ outer scope
    console.log(`Outer: ${outerVariable}, Inner: ${innerVariable}`);
  };
}

const myClosure = outerFunction("Hello");
myClosure("World"); // 'Outer: Hello, Inner: World'

// outerVariable vẫn được giữ trong memory
// mặc dù outerFunction đã thực thi xong
```

### Ví dụ cơ bản:

```javascript
// 1. Closure đơn giản
function createCounter() {
  let count = 0; // Private variable

  return {
    increment: function () {
      count++;
      console.log(count);
    },
    decrement: function () {
      count--;
      console.log(count);
    },
    getCount: function () {
      return count;
    },
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
console.log(counter.getCount()); // 1

// count không thể truy cập từ bên ngoài
// console.log(count);  // ReferenceError
```

### Best Practices:

```javascript
// ✅ Dùng closures cho:
// - Private variables
// - Data encapsulation
// - State management
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private

  return {
    deposit: function (amount) {
      balance += amount;
      console.log(`Deposited: ${amount}, Balance: ${balance}`);
    },
    withdraw: function (amount) {
      if (amount > balance) {
        console.log("Insufficient funds");
        return;
      }
      balance -= amount;
      console.log(`Withdrew: ${amount}, Balance: ${balance}`);
    },
    getBalance: function () {
      return balance;
    },
  };
}
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên tạo closures không cần thiết
function badClosure() {
  const largeData = new Array(1000000).fill("data");

  return function () {
    console.log("Handler called");
    // largeData không được dùng nhưng vẫn được giữ trong memory
  };
}

// ✅ Nên cleanup khi không cần dùng
function goodClosure() {
  const largeData = new Array(1000000).fill("data");

  const handler = function () {
    console.log("Handler called");
  };

  // Cleanup
  largeData = null;
  return handler;
}
```

---

## Use cases của closures?

**Use cases của closures** - Closures được dùng trong nhiều patterns như data privacy, function factories, memoization.

### Mục đích / Purpose

**Closures** được thiết kế cho các use cases:

- Data privacy / encapsulation
- Function factories
- Memoization
- State management

### Khi nào dùng / When to Use

| Use case           | Khi nào dùng                     |
| ------------------ | -------------------------------- |
| Data privacy       | Cần private variables            |
| Function factories | Tạo functions với presets        |
| Memoization        | Cache kết quả tính toán          |
| State management   | Quản lý state trong applications |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Data privacy**: Tạo private variables
- **Reusability**: Reuse logic
- **Performance**: Cache với memoization
- **State management**: Maintain state

### Ưu nhược điểm / Pros & Cons

| Use case           | Ưu điểm           | Nhược điểm           |
| ------------------ | ----------------- | -------------------- |
| Data privacy       | Private variables | Verbose hơn          |
| Function factories | Reusable          | Có thể gây confusion |
| Memoization        | Performance       | Memory usage         |
| State management   | Maintain state    | Debugging khó hơn    |

### Ví dụ:

```javascript
// 1. Data Privacy / Encapsulation
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private

  return {
    deposit: function (amount) {
      balance += amount;
    },
    withdraw: function (amount) {
      if (amount > balance) {
        console.log("Insufficient funds");
        return;
      }
      balance -= amount;
    },
    getBalance: function () {
      return balance;
    },
  };
}

// 2. Function Factories
function createGreeter(greeting) {
  return function (name) {
    console.log(`${greeting}, ${name}!`);
  };
}

const sayHello = createGreeter("Hello");
const sayGoodbye = createGreeter("Goodbye");

// 3. Memoization
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
```

### Best Practices:

```javascript
// ✅ Dùng closures cho:
// - Data privacy
// - Function factories
// - Memoization
// - State management

// ✅ Memoization cho expensive functions
const memoizedFib = memoize(fibonacci);
console.log(memoizedFib(100)); // Tức thì!
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng closures cho tasks đơn giản
// Có thể dùng regular function thay vì closures

// ✅ Nên dùng closures khi:
// - Cần private variables
// - Cần state retention
// - Cần data encapsulation
```

---

## Memory leak liên quan đến closures?

**Memory leak với closures** - Closures có thể giữ references lớn trong memory, gây memory leak.

### Mục đích / Purpose

Hiểu về memory leak với closures giúp:

- Tránh memory leaks
- Optimize memory usage
- Debug memory issues
- Write efficient code

### Khi nào gặp vấn đề / When to Use

Memory leak với closures xuất hiện khi:

- Closures giữ large references
- Event handlers không được cleanup
- Long-lived closures với large data

### Giúp ích gì / Benefits

Hiểu về vấn đề giúp:

- **Avoid leaks**: Tránh memory leaks
- **Optimize**: Optimize memory usage
- **Debug**: Debug memory issues
- **Performance**: Improve performance

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm        |
| --------------- | ----------------- |
| Hiểu sâu        | Debugging khó hơn |
| Avoid leaks     | Cần cleanup code  |
| Optimize memory | Verbose hơn       |

### Ví dụ:

```javascript
// ❌ Memory leak - giữ reference lớn
function createHandler() {
  const largeData = new Array(1000000).fill("data");

  return function () {
    console.log("Handler called");
    // largeData không được dùng nhưng vẫn được giữ trong memory
  };
}

const handler = createHandler();
// largeData vẫn tồn tại trong memory
// ngay cả khi không cần dùng nữa
```

### Giải pháp tránh memory leak:

```javascript
// 1. Gán null khi không cần dùng
let handler;
function createHandler() {
  const largeData = new Array(1000000).fill("data");

  handler = function () {
    console.log("Handler called");
  };

  // largeData không được dùng, có thể gán null
  largeData = null;
}

// 2. Dùng WeakMap/WeakSet
const handlers = new WeakMap();

function createHandler(element) {
  const data = {
    /* large data */
  };
  handlers.set(element, data);

  element.onclick = function () {
    const handlerData = handlers.get(element);
    // Dùng handlerData
  };
}

// Khi element bị xóa, data cũng được GC thu hồi
```

### Best Practices:

```javascript
// ✅ Cleanup khi không cần dùng
function setupButton(buttonId) {
  const button = document.getElementById(buttonId);

  function handleClick() {
    console.log("Clicked");
  }

  button.addEventListener("click", handleClick);

  // Return cleanup function
  return function () {
    button.removeEventListener("click", handleClick);
  };
}

const cleanup = setupButton("myButton");
// Khi không cần nữa:
cleanup();
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên giữ large references trong closures
function badHandler() {
  const largeData = fetchLargeData();

  return function () {
    console.log("Handler called");
    // largeData được giữ trong closure
  };
}

// ✅ Nên cleanup khi không cần dùng
function goodHandler() {
  const largeData = fetchLargeData();

  const handler = function () {
    console.log("Handler called");
  };

  // Cleanup
  largeData = null;
  return handler;
}
```

---

## Closure trong loops?

**Closure trong loops** - Khi dùng closures trong loops với `var`, tất cả closures tham chiếu đến cùng biến, gây unexpected behavior.

### Mục đích / Purpose

Hiểu về closure trong loops giúp:

- Tránh unexpected behavior
- Chọn đúng variable declaration
- Debug loop-related issues

### Khi nào gặp vấn đề / When to Use

Vấn đề closure trong loops xuất hiện khi:

- Dùng `var` trong loops
- Tạo closures trong loops
- Dùng setTimeout/setInterval trong loops

### Giúp ích gì / Benefits

Hiểu về vấn đề giúp:

- **Avoid bugs**: Tránh unexpected behavior
- **Choose right tools**: Chọn `let` thay vì `var`
- **Debug**: Dễ dàng debug loop issues

### Ưu nhược điểm / Pros & Cons

| Giải pháp      | Ưu điểm         | Nhược điểm                       |
| -------------- | --------------- | -------------------------------- |
| Dùng `let`     | Block scope     | Không support trong old browsers |
| Dùng IIFE      | Works với `var` | Verbose hơn                      |
| Dùng `forEach` | Clean syntax    | Không break/continue dễ          |

### Ví dụ:

```javascript
// ❌ Vấn đề với var
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 3, 3, 3 (thay vì 0, 1, 2)
  }, 1000);
}

// ✅ Giải pháp 1: dùng let
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 0, 1, 2
  }, 1000);
}

// ✅ Giải pháp 2: IIFE
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j); // 0, 1, 2
    }, 1000);
  })(i);
}
```

### Best Practices:

```javascript
// ✅ Dùng let trong loops
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 0, 1, 2
  }, 1000);
}

// ✅ Dùng forEach
[0, 1, 2].forEach(function (i) {
  setTimeout(function () {
    console.log(i); // 0, 1, 2
  }, 1000);
});
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng var trong loops với closures
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // Tất cả hiển thị 3
  }, 1000);
}

// ✅ Nên dùng let
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 0, 1, 2
  }, 1000);
}
```

---

## Module pattern với closures?

**Module pattern với closures** - Sử dụng closures để tạo private members và expose public API.

### Mục đích / Purpose

**Module pattern** được thiết kế để:

- Tạo private members
- Expose public API
- Encapsulation
- Namespace

### Khi nào dùng / When to Use

Module pattern nên dùng khi:

- Cần private members
- Expose public API
- Legacy code (trước ES6)
- Không dùng ES6 modules

### Giúp ích gì / Benefits

**Lợi ích:**

- **Data privacy**: Private members
- **Public API**: Expose public methods
- **Encapsulation**: Hide implementation
- **Namespace**: Avoid global pollution

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm           |
| --------------- | -------------------- |
| Private members | Verbose hơn          |
| Public API      | ES6 modules thay thế |
| Encapsulation   | Khó debug hơn        |

### Ví dụ:

```javascript
// Basic Module Pattern
const Module = (function () {
  // Private variables
  let privateVar = "I am private";

  // Private function
  function privateFunction() {
    console.log("Private function called");
  }

  // Public API
  return {
    publicVar: "I am public",

    publicMethod: function () {
      console.log("Public method called");
      privateFunction();
      console.log(privateVar);
    },

    getPrivateVar: function () {
      return privateVar;
    },
  };
})();

// Usage
console.log(Module.publicVar); // 'I am public'
Module.publicMethod(); // 'Public method called'
console.log(Module.getPrivateVar()); // 'I am private'
```

### Best Practices:

```javascript
// ✅ Dùng module pattern khi:
// - Cần private members
// - Không dùng ES6 modules
// - Legacy code

// ✅ Revealing Module Pattern
const Calculator = (function () {
  // Private
  let result = 0;

  function add(a, b) {
    result = a + b;
  }

  // Reveal public API
  return {
    add,
    getResult: function () {
      return result;
    },
  };
})();
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng module pattern khi có ES6 modules
// module.js
const Module = (function () {
  // ...
})();

// ✅ Nên dùng ES6 modules
// module.js
export function add(a, b) {
  return a + b;
}

// main.js
import { add } from "./module.js";
```

---

## Private variables với closures?

**Private variables với closures** - Sử dụng closures để tạo private variables không thể truy cập từ bên ngoài.

### Mục đích / Purpose

**Private variables với closures** được thiết kế để:

- Tạo private data
- Encapsulation
- Data hiding
- Control access

### Khi nào dùng / When to Use

Private variables với closures nên dùng khi:

- Cần private data
- Không dùng ES6 classes
- Legacy code
- Cần data encapsulation

### Giúp ích gì / Benefits

**Lợi ích:**

- **Data privacy**: Private variables
- **Encapsulation**: Hide implementation
- **Control access**: Control data access
- **Flexibility**: Flexible pattern

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm                     |
| ----------------- | ------------------------------ |
| Private variables | Verbose hơn                    |
| Encapsulation     | Khó debug hơn                  |
| Control access    | ES2022 private fields thay thế |

### Ví dụ:

```javascript
// Private variables với closures
function Person(name) {
  // Private variables
  let _name = name;
  let _age = 0;

  // Public methods
  return {
    getName: function () {
      return _name;
    },

    setName: function (newName) {
      _name = newName;
    },

    getAge: function () {
      return _age;
    },

    setAge: function (newAge) {
      if (newAge >= 0) {
        _age = newAge;
      }
    },

    introduce: function () {
      console.log(`Hi, I'm ${_name} and I'm ${_age} years old.`);
    },
  };
}

const john = new Person("John");
john.introduce(); // 'Hi, I'm John and I'm 0 years old.'

// Private variables không thể truy cập
// console.log(john._name);  // undefined
```

### Class với private fields (ES2022):

```javascript
// ES2022 private fields (#)
class Person {
  #name; // Private field
  #age; // Private field

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  getName() {
    return this.#name;
  }

  introduce() {
    console.log(`Hi, I'm ${this.#name} and I'm ${this.#age} years old.`);
  }
}

const jane = new Person("Jane", 30);
jane.introduce(); // 'Hi, I'm Jane and I'm 30 years old.'

// Private fields không thể truy cập từ bên ngoài
// console.log(jane.#name);  // SyntaxError
```

### Best Practices:

```javascript
// ✅ Dùng closures cho private variables khi:
// - Cần support browser cũ
// - Không dùng class
// - Cần dynamic private members

// ✅ Dùng ES2022 private fields khi:
// - Support browser mới
// - Dùng class
// - Cần compile-time checking
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng _ convention cho private variables
// Không thực sự private, chỉ convention

// ✅ Nên dùng ES2022 private fields
class Person {
  #name; // Thực sự private

  constructor(name) {
    this.#name = name;
  }
}
```
