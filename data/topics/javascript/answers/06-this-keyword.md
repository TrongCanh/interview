# 6. `this` Keyword

## Tổng quan về `this`

### Mục đích của `this` / Purpose

**`this`** trong JavaScript là một keyword tham chiếu đến object hiện tại đang thực thi function.

**Mục đích chính:**

- Truy cập object context
- Method binding
- Constructor functions
- Event handlers

### Khi nào cần hiểu về `this` / When to Use

Hiểu về `this` là cần thiết khi:

- Viết methods trong objects
- Xử lý event handlers
- Tạo constructor functions
- Dùng `call`, `apply`, `bind`

### Giúp ích gì / Benefits

**Lợi ích:**

- **Context access**: Truy cập object context
- **Method binding**: Bind methods đến objects
- **Flexibility**: Dynamic context binding
- **OOP**: Hỗ trợ OOP patterns

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm                    |
| --------------- | ----------------------------- |
| Dynamic context | Confusing cho beginners       |
| Method binding  | Arrow function lexical `this` |
| Flexible        | Lost binding trong callbacks  |

---

## `this` trong JavaScript hoạt động như thế nào?

**`this`** trong JavaScript là một keyword tham chiếu đến object hiện tại đang thực thi function. Giá trị của `this` được xác định tại thời điểm function được gọi (runtime), không phải khi được định nghĩa.

### Mục đích / Purpose

**`this`** được thiết kế để:

- Truy cập object context
- Bind methods đến objects
- Xử lý constructor functions
- Dynamic context binding

### Khi nào dùng / When to Use

`this` nên dùng khi:

- Viết object methods
- Tạo constructor functions
- Xử lý event handlers
- Dùng `call`, `apply`, `bind`

### Giúp ích gì / Benefits

**Lợi ích:**

- **Context access**: Truy cập object context
- **Method binding**: Bind methods đến objects
- **Dynamic binding**: Context thay đổi theo cách gọi
- **OOP support**: Hỗ trợ OOP patterns

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm                    |
| --------------- | ----------------------------- |
| Dynamic context | Confusing cho beginners       |
| Method binding  | Arrow function lexical `this` |
| Flexible        | Lost binding trong callbacks  |

### Quy tắc xác định `this`:

```javascript
// 1. Default binding - global object (non-strict mode)
function showThis() {
  console.log(this);
}
showThis(); // window (browser) / global (Node.js)

// Strict mode - undefined
("use strict");
function showThisStrict() {
  console.log(this);
}
showThisStrict(); // undefined

// 2. Implicit binding - object trước dấu chấm
const obj = {
  name: "John",
  greet: function () {
    console.log(this.name); // 'John'
  },
};
obj.greet(); // this = obj

// 3. Explicit binding - call, apply, bind
function greet() {
  console.log(this.name);
}
const person = { name: "Jane" };
greet.call(person); // 'Jane'
greet.apply(person); // 'Jane'
const boundGreet = greet.bind(person);
boundGreet(); // 'Jane'

// 4. new binding - instance mới
function Person(name) {
  this.name = name;
}
const john = new Person("John"); // this = new instance

// 5. Arrow function - lexical this
const obj2 = {
  name: "Bob",
  greet: () => {
    console.log(this.name); // undefined (this từ scope cha)
  },
};
obj2.greet();
```

### Best Practices:

```javascript
// ✅ Dùng arrow functions khi cần lexical this
const obj = {
  name: "John",
  init: function () {
    setTimeout(() => {
      console.log(this.name); // 'John'
    }, 1000);
  },
};

// ✅ Dùng bind khi cần explicit binding
const handler = function () {
  console.log(this.name);
}.bind({ name: "John" });
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng arrow function cho object methods
const obj = {
  name: "John",
  greet: () => {
    console.log(this.name); // undefined
  },
};

// ✅ Nên dùng regular function hoặc method shorthand
const obj2 = {
  name: "Jane",
  greet() {
    console.log(this.name); // 'Jane'
  },
};
```

---

## `this` trong different contexts (global, function, method, constructor, arrow)?

### Mục đích / Purpose

Hiểu về `this` trong các contexts khác nhau giúp:

- Tránh bugs liên quan đến `this`
- Chọn đúng function type
- Debug `this`-related issues

### Khi nào gặp vấn đề / When to Use

Vấn đề `this` xuất hiện khi:

- Dùng arrow functions cho methods
- Method reference mất binding
- Event handlers với `this`

### Giúp ích gì / Benefits

Hiểu về contexts giúp:

- **Avoid bugs**: Tránh `this`-related bugs
- **Choose right tools**: Chọn đúng function type
- **Debug**: Dễ dàng debug `this` issues

### Ưu nhược điểm / Pros & Cons

| Context        | Ưu điểm         | Nhược điểm                    |
| -------------- | --------------- | ----------------------------- |
| Global         | Simple          | Không useful trong production |
| Function       | Flexible        | Có thể là global/undefined    |
| Method         | Correct context | Mất binding khi reference     |
| Constructor    | New instance    | Phải dùng `new`               |
| Arrow function | Lexical this    | Không có dynamic binding      |

### 1. Global Context

```javascript
// Global scope
console.log(this); // window (browser) / global (Node.js)

// Global function
function test() {
  console.log(this); // window (non-strict) / undefined (strict)
}
test();

// Arrow function trong global scope
const arrowTest = () => {
  console.log(this); // window (lexical từ global)
};
arrowTest();
```

### 2. Function Context

```javascript
// Regular function
function regularFunction() {
  console.log(this);
}

// Non-strict mode
regularFunction(); // window

// Strict mode
("use strict");
regularFunction(); // undefined

// Nested function
const obj = {
  name: "John",

  outer: function () {
    console.log(this.name); // 'John' (this = obj)

    function inner() {
      console.log(this.name); // undefined (non-strict: window)
    }
    inner();
  },
};
obj.outer();
```

### 3. Method Context

```javascript
// Object method
const person = {
  name: "John",
  age: 25,

  greet: function () {
    console.log(`Hello, I'm ${this.name}`); // this = person
  },

  getAge: function () {
    return this.age;
  },
};

person.greet(); // 'Hello, I'm John'
person.getAge(); // 25

// Method shorthand (ES6)
const person2 = {
  name: "Jane",
  greet() {
    console.log(this.name); // this = person2
  },
};
person2.greet(); // 'Jane'

// Method reference - mất this binding
const greet = person.greet;
greet(); // undefined (this không còn là person)
```

### 4. Constructor Context

```javascript
// Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;

  this.greet = function () {
    console.log(`Hello, I'm ${this.name}`);
  };
}

const john = new Person("John", 25);
john.greet(); // 'Hello, I'm John'

// Class (ES6)
class PersonClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
}

const jane = new PersonClass("Jane", 30);
jane.greet(); // 'Hello, Jane'
```

### 5. Arrow Function Context

```javascript
// Arrow function - lexical this
const obj = {
  name: "John",

  regularMethod: function () {
    console.log(this.name); // 'John'

    const arrowFunc = () => {
      console.log(this.name); // 'John' (lexical từ obj)
    };
    arrowFunc();
  },

  arrowMethod: () => {
    console.log(this.name); // undefined (lexical từ global)
  },
};

obj.regularMethod(); // 'John', 'John'
obj.arrowMethod(); // undefined

// Arrow function trong callback
const person = {
  name: "Jane",

  init: function () {
    setTimeout(() => {
      console.log(this.name); // 'Jane' (lexical từ person)
    }, 1000);
  },
};

person.init(); // 'Jane' (sau 1 giây)
```

### Best Practices:

```javascript
// ✅ Dùng arrow functions trong methods khi cần lexical this
const obj = {
  name: "John",
  init: function () {
    setTimeout(() => {
      console.log(this.name); // 'John'
    }, 1000);
  },
};

// ✅ Dùng method shorthand cho object methods
const obj2 = {
  name: "Jane",
  greet() {
    console.log(this.name); // 'Jane'
  },
};
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng arrow function cho object methods
const obj = {
  name: "John",
  greet: () => {
    console.log(this.name); // undefined
  },
};

// ✅ Nên dùng method shorthand
const obj2 = {
  name: "Jane",
  greet() {
    console.log(this.name); // 'Jane'
  },
};
```

---

## `call()`, `apply()`, `bind()` khác nhau như thế nào?

### Mục đích / Purpose

**`call()`, `apply()`, `bind()`** được thiết kế để:

- Explicit binding của `this`
- Mượn methods từ objects
- Partial application
- Function borrowing

### Khi nào dùng / When to Use

| Method    | Khi nào dùng                       |
| --------- | ---------------------------------- |
| `call()`  | Execute ngay, truyền args riêng lẻ |
| `apply()` | Execute ngay, truyền args mảng     |
| `bind()`  | Tạo function mới với this cố định  |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Explicit binding**: Rõ ràng `this` binding
- **Function borrowing**: Mượn methods
- **Partial application**: Gán một số parameters
- **Flexibility**: Flexible function binding

### Ưu nhược điểm / Pros & Cons

| Method    | Ưu điểm           | Nhược điểm           |
| --------- | ----------------- | -------------------- |
| `call()`  | Execute ngay      | Truyền args riêng lẻ |
| `apply()` | Execute ngay      | Truyền args mảng     |
| `bind()`  | Reusable function | Không execute ngay   |

### Bảng so sánh:

| Method    | Syntax                                 | Arguments       | Return           | Execute immediately? |
| --------- | -------------------------------------- | --------------- | ---------------- | -------------------- |
| `call()`  | `fn.call(thisArg, arg1, arg2, ...)`    | Truyền riêng lẻ | Kết quả function | ✅ Yes               |
| `apply()` | `fn.apply(thisArg, [arg1, arg2, ...])` | Truyền mảng     | Kết quả function | ✅ Yes               |
| `bind()`  | `fn.bind(thisArg, arg1, arg2, ...)`    | Truyền riêng lẻ | New function     | ❌ No                |

### `call()` - Thực thi function ngay lập tức:

```javascript
// Syntax: function.call(thisArg, arg1, arg2, ...)

function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "John" };

greet.call(person, "Hello", "!"); // 'Hello, John!'

// Ví dụ thực tế
function introduce(age) {
  console.log(`I'm ${this.name}, ${age} years old.`);
}

introduce.call({ name: "Jane" }, 25); // "I'm Jane, 25 years old."

// Mượn method từ object khác
const person1 = { name: "John" };
const person2 = { name: "Jane" };

function showName() {
  console.log(this.name);
}

showName.call(person1); // 'John'
showName.call(person2); // 'Jane'
```

### `apply()` - Thực thi function với mảng arguments:

```javascript
// Syntax: function.apply(thisArg, [arg1, arg2, ...])

function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "John" };

greet.apply(person, ["Hello", "!"]); // 'Hello, John!'

// Ví dụ thực tế - Math.max với mảng
const numbers = [1, 5, 3, 9, 2];
const max = Math.max.apply(null, numbers); // 9

// Tương đương:
const max2 = Math.max(...numbers); // 9 (spread operator)

// Spread arguments
function sum(a, b, c) {
  return a + b + c;
}

const args = [1, 2, 3];
console.log(sum.apply(null, args)); // 6
console.log(sum(...args)); // 6
```

### `bind()` - Tạo function mới với this cố định:

```javascript
// Syntax: function.bind(thisArg, arg1, arg2, ...)

function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "John" };

const greetJohn = greet.bind(person, "Hello");
greetJohn("!"); // 'Hello, John!'

// Ví dụ thực tế - giữ this trong callback
const obj = {
  name: "Jane",

  init: function () {
    const button = document.getElementById("myButton");

    // ❌ Không giữ this
    // button.addEventListener('click', this.handleClick);

    // ✅ Giữ this với bind
    button.addEventListener("click", this.handleClick.bind(this));
  },

  handleClick: function () {
    console.log(this.name); // 'Jane'
  },
};

obj.init();

// Partial application
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
console.log(double(5)); // 10
console.log(double(10)); // 20
```

### Best Practices:

```javascript
// ✅ Dùng call khi cần execute ngay với explicit this
function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}
greet.call({ name: "John" }, "Hello");

// ✅ Dùng apply khi có mảng arguments
const max = Math.max.apply(null, [1, 5, 3, 9, 2]);

// ✅ Dùng bind khi cần reusable function với this cố định
const boundFn = originalFn.bind(context);
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng apply khi có spread operator
const max = Math.max.apply(null, numbers);

// ✅ Nên dùng spread operator
const max = Math.max(...numbers);

// ❌ Không nên bind khi chỉ cần execute một lần
fn.bind(context)();
// ✅ Nên dùng call
fn.call(context);
```

---

## Arrow function và `this`?

**Arrow function** không có `this` riêng, nó kế thừa `this` từ scope cha (lexical scoping).

### Mục đích / Purpose

**Arrow function với `this`** được thiết kế để:

- Lexical `this` binding
- Giữ `this` từ outer scope
- Dùng trong callbacks

### Khi nào dùng / When to Use

Arrow functions nên dùng khi:

- Cần lexical `this`
- Callback trong methods
- Không cần dynamic `this`

### Giúp ích gì / Benefits

**Lợi ích:**

- **Lexical this**: `this` từ scope cha
- **No binding loss**: Không mất binding
- **Concise**: Cú pháp ngắn gọn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm                  |
| --------------- | --------------------------- |
| Lexical `this`  | Không có dynamic binding    |
| No binding loss | Không thể dùng `new`        |
| Concise syntax  | Không có `arguments` object |

### Arrow function không có `this`:

```javascript
// Arrow function không có this riêng
const arrow = () => {
  console.log(this);
};

// Regular function có this riêng
function regular() {
  console.log(this);
}

// Trong global scope
arrow(); // window (lexical từ global)
regular(); // window (non-strict) / undefined (strict)
```

### Lexical `this` trong arrow function:

```javascript
// Arrow function kế thừa this từ scope cha
const obj = {
  name: "John",

  regularMethod: function () {
    console.log(this.name); // 'John' (this = obj)

    // Arrow function trong method
    const arrowFunc = () => {
      console.log(this.name); // 'John' (lexical từ obj)
    };
    arrowFunc();
  },

  arrowMethod: () => {
    console.log(this.name); // undefined (lexical từ global)
  },
};

obj.regularMethod(); // 'John', 'John'
obj.arrowMethod(); // undefined
```

### Arrow function trong callbacks:

```javascript
// ✅ Arrow function giữ this từ outer scope
const person = {
  name: "John",

  init: function () {
    setTimeout(() => {
      console.log(this.name); // 'John' (lexical từ person)
    }, 1000);
  },
};

person.init(); // 'John' (sau 1 giây)

// ❌ Regular function mất this
const person2 = {
  name: "Jane",

  init: function () {
    setTimeout(function () {
      console.log(this.name); // undefined (this = window)
    }, 1000);
  },
};

person2.init(); // undefined
```

### Arrow function không thể dùng với `new`:

```javascript
// Arrow function không thể dùng làm constructor
const Person = (name) => {
  this.name = name;
};

// new Person('John');  // TypeError: Person is not a constructor

// Regular function có thể dùng new
function PersonRegular(name) {
  this.name = name;
}

const john = new PersonRegular("John");
console.log(john.name); // 'John'
```

### Best Practices:

```javascript
// ✅ Dùng arrow functions cho:
// - Callbacks trong methods
// - Khi cần lexical this
const obj = {
  name: "John",
  init: function () {
    setTimeout(() => {
      console.log(this.name); // 'John'
    }, 1000);
  },
};

// ✅ Dùng regular functions cho:
// - Object methods
// - Constructor functions
// - Khi cần dynamic this
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng arrow function cho object methods
const obj = {
  name: "John",
  greet: () => {
    console.log(this.name); // undefined
  },
};

// ✅ Nên dùng regular function hoặc method shorthand
const obj2 = {
  name: "Jane",
  greet() {
    console.log(this.name); // 'Jane'
  },
};
```

---

## Explicit binding vs Implicit binding?

**Explicit binding** - `this` được xác định rõ ràng bằng `call()`, `apply()`, hoặc `bind()`.
**Implicit binding** - `this` được xác định bởi object đứng trước dấu chấm khi gọi function.

### Mục đích / Purpose

Hiểu sự khác biệt giúp:

- Chọn đúng binding type
- Tránh bugs liên quan đến `this`
- Debug `this`-related issues

### Khi nào dùng / When to Use

| Type             | Khi nào dùng                  |
| ---------------- | ----------------------------- |
| Implicit binding | Object methods, dot notation  |
| Explicit binding | `call()`, `apply()`, `bind()` |

### Giúp ích gì / Benefits

Hiểu về binding types giúp:

- **Choose right**: Chọn đúng binding type
- **Avoid bugs**: Tránh `this` bugs
- **Debug**: Dễ dàng debug issues

### Ưu nhược điểm / Pros & Cons

| Type             | Ưu điểm           | Nhược điểm                |
| ---------------- | ----------------- | ------------------------- |
| Implicit binding | Simple, clean     | Mất binding khi reference |
| Explicit binding | Rõ ràng, flexible | Verbose hơn               |

### Implicit Binding:

```javascript
// Implicit binding
const person = {
  name: "John",
  greet: function () {
    console.log(this.name); // this = person
  },
};

person.greet(); // 'John' (implicit binding)

// Nested objects
const obj = {
  name: "Outer",
  inner: {
    name: "Inner",
    greet: function () {
      console.log(this.name); // this = obj.inner
    },
  },
};

obj.inner.greet(); // 'Inner'

// Method reference - mất implicit binding
const greet = person.greet;
greet(); // undefined (this không còn là person)
```

### Explicit Binding:

```javascript
// Explicit binding với call
function greet() {
  console.log(this.name);
}

const person = { name: "John" };
greet.call(person); // 'John' (explicit binding)

// Explicit binding với apply
greet.apply(person); // 'John'

// Explicit binding với bind
const greetPerson = greet.bind(person);
greetPerson(); // 'John'
```

### So sánh:

```javascript
const person = { name: "John" };

function showName() {
  console.log(this.name);
}

// Implicit binding
const obj = {
  name: "Jane",
  showName: showName,
};
obj.showName(); // 'Jane' (implicit)

// Explicit binding
showName.call(person); // 'John' (explicit)
showName.apply(person); // 'John'
showName.bind(person)(); // 'John'

// Explicit override implicit
const obj2 = {
  name: "Bob",
  showName: function () {
    console.log(this.name);
  },
};

obj2.showName.call(person); // 'John' (explicit override implicit)
```

### Best Practices:

```javascript
// ✅ Dùng implicit binding cho object methods
const obj = {
  name: "John",
  greet() {
    console.log(this.name); // 'John'
  },
};

// ✅ Dùng explicit binding khi cần override
obj.greet.call({ name: "Jane" }); // 'Jane'
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng explicit binding khi implicit đủ
obj.method.call(obj);

// ✅ Nên dùng implicit binding
obj.method();
```

---

## `new` binding?

**`new` binding** - khi function được gọi với `new` operator, `this` được gán cho object mới được tạo.

### Mục đích / Purpose

**`new` binding** được thiết kế để:

- Tạo object mới
- Bind `this` đến instance mới
- Prototype inheritance
- Constructor pattern

### Khi nào dùng / When to Use

`new` binding nên dùng khi:

- Tạo objects từ constructor
- Implement OOP patterns
- Class instantiation

### Giúp ích gì / Benefits

**Lợi ích:**

- **New instance**: Tạo object mới
- **Prototype inheritance**: Kế thừa prototype
- **Constructor pattern**: Hỗ trợ OOP

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm                          |
| --------------------- | ----------------------------------- |
| New instance          | Phải dùng `new` keyword             |
| Prototype inheritance | Verbose hơn                         |
| Constructor pattern   | Không dùng được với arrow functions |

### Constructor function với `new`:

```javascript
// Constructor function
function Person(name, age) {
  // this = new object (được tạo bởi new)
  this.name = name;
  this.age = age;

  this.greet = function () {
    console.log(`Hello, I'm ${this.name}`);
  };

  // return this (ngầm định)
}

// Tạo instance với new
const john = new Person("John", 25);
console.log(john.name); // 'John'
john.greet(); // 'Hello, I'm John'

// Không có new - this = global (non-strict)
const jane = Person("Jane", 30);
console.log(jane); // undefined
console.log(window.name); // 'Jane' (global bị污染)
```

### Quy trình `new` binding:

```javascript
// Khi gọi new Constructor():
// 1. Tạo object mới
// 2. Gán prototype của object mới là Constructor.prototype
// 3. Gán this cho object mới
// 4. Thực thi Constructor với this mới
// 5. Trả về object mới (hoặc object được return)

function Person(name) {
  // 1. const this = {}
  // 2. this.__proto__ = Person.prototype
  // 3. this.name = name
  this.name = name;
  // 4. return this
}

const person = new Person("John");
```

### `new` binding với `return`:

```javascript
// Return primitive - bị bỏ qua
function Person(name) {
  this.name = name;
  return 42; // Bỏ qua
}

const person1 = new Person("John");
console.log(person1); // Person { name: 'John' }

// Return object - được dùng thay thế
function Person2(name) {
  this.name = name;
  return { custom: "object" }; // Được dùng
}

const person2 = new Person2("John");
console.log(person2); // { custom: 'object' }
```

### `new` binding với arrow function:

```javascript
// Arrow function không thể dùng với new
const Person = (name) => {
  this.name = name;
};

// new Person('John');  // TypeError: Person is not a constructor

// Regular function có thể dùng new
function PersonRegular(name) {
  this.name = name;
}

const john = new PersonRegular("John");
console.log(john); // PersonRegular { name: 'John' }
```

### Quy tắc ưu tiên `this`:

```javascript
// Quy tắc ưu tiên (từ cao đến thấp):
// 1. new binding
// 2. explicit binding (call/apply/bind)
// 3. implicit binding
// 4. default binding

function showName() {
  console.log(this.name);
}

const obj1 = { name: "Object 1" };
const obj2 = { name: "Object 2" };

// 1. new binding - cao nhất
const Bound = showName.bind(obj1);
new Bound(); // undefined (new override bind)

// 2. explicit binding
showName.call(obj2); // 'Object 2'

// 3. implicit binding
obj1.showName = showName;
obj1.showName(); // 'Object 1'

// 4. default binding
showName(); // undefined (strict) / window.name (non-strict)
```

### Best Practices:

```javascript
// ✅ Dùng new cho constructor functions
function Person(name) {
  this.name = name;
}
const john = new Person("John");

// ✅ Dùng class với new
class PersonClass {
  constructor(name) {
    this.name = name;
  }
}
const jane = new PersonClass("Jane");
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên gọi constructor mà không có new
const person = Person("John"); // this = global

// ✅ Nên dùng new
const person = new Person("John");
```

---

## Default binding?

**Default binding** - khi không có quy tắc nào áp dụng, `this` mặc định là global object (non-strict mode) hoặc `undefined` (strict mode).

### Mục đích / Purpose

Hiểu về **default binding** giúp:

- Tránh unexpected behavior
- Hiểu strict mode behavior
- Debug `this`-related issues

### Khi nào gặp vấn đề / When to Use

Default binding xuất hiện khi:

- Function không được gọi với object
- Non-strict mode
- Nested functions

### Giúp ích gì / Benefits

Hiểu về default binding giúp:

- **Avoid bugs**: Tránh unexpected behavior
- **Understand strict mode**: Hiểu strict mode
- **Debug**: Dễ dàng debug issues

### Ưu nhược điểm / Pros & Cons

| Mode       | Ưu điểm          | Nhược điểm           |
| ---------- | ---------------- | -------------------- |
| Non-strict | this = global    | Có thể gây bugs      |
| Strict     | this = undefined | Phải xử lý undefined |

### Default binding trong non-strict mode:

```javascript
// Non-strict mode
function showThis() {
  console.log(this);
}

showThis(); // window (browser) / global (Node.js)

// Nested function
function outer() {
  console.log(this); // window

  function inner() {
    console.log(this); // window
  }
  inner();
}

outer();
```

### Default binding trong strict mode:

```javascript
// Strict mode
"use strict";

function showThis() {
  console.log(this);
}

showThis(); // undefined

// Nested function
function outer() {
  console.log(this); // undefined

  function inner() {
    console.log(this); // undefined
  }
  inner();
}

outer();
```

### Default binding với implicit binding bị mất:

```javascript
const obj = {
  name: "John",

  outer: function () {
    console.log(this.name); // 'John' (implicit)

    function inner() {
      console.log(this.name); // undefined (default binding)
    }
    inner();
  },
};

obj.outer();
```

### Giải quyết với arrow function:

```javascript
const obj = {
  name: "John",

  outer: function () {
    console.log(this.name); // 'John'

    // Arrow function - lexical this
    const inner = () => {
      console.log(this.name); // 'John' (lexical từ outer)
    };
    inner();
  },
};

obj.outer();
```

### Giải quyết với bind:

```javascript
const obj = {
  name: "John",

  outer: function () {
    console.log(this.name); // 'John'

    function inner() {
      console.log(this.name); // 'John' (explicit binding)
    }

    inner.bind(this)();
  },
};

obj.outer();
```

### Best Practices:

```javascript
// ✅ Dùng arrow function để giữ this
const obj = {
  name: "John",
  outer: function () {
    const inner = () => {
      console.log(this.name); // 'John'
    };
    inner();
  },
};

// ✅ Dùng bind khi cần
const obj2 = {
  name: "Jane",
  outer: function () {
    const inner = function () {
      console.log(this.name); // 'Jane'
    };
    inner.bind(this)();
  },
};
```

### Anti-patterns cần tránh:

```javascript
// ❌ Không nên dùng non-strict mode
function showThis() {
  console.log(this); // window (có thể gây bugs)
}

// ✅ Nên dùng strict mode
("use strict");
function showThis() {
  console.log(this); // undefined
}
```
