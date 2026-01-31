# 23. Enhanced Object Literals / Object Literals Nâng Cao

## Tổng quan về Enhanced Object Literals

### Mục đích của Enhanced Object Literals / Purpose

**Enhanced Object Literals** là các tính năng ES6+ giúp viết object literals ngắn gọn và dễ đọc hơn, bao gồm computed property names, method shorthand, và property shorthand.

**Mục đích chính:**

- Giảm code boilerplate khi tạo objects
- Làm code dễ đọc hơn
- Hỗ trợ dynamic property names
- Tạo methods ngắn gọn hơn

### Khi nào nên dùng / When to Use

**Nên dùng enhanced object literals khi:**

- Tạo objects từ variables
- Tạo objects với dynamic keys
- Tạo objects với methods
- Muốn code ngắn gọn và dễ đọc

### Giúp ích gì / Benefits

**Lợi ích:**

- **Less boilerplate**: Giảm code lặp lại
- **Cleaner syntax**: Code dễ đọc hơn
- **Dynamic keys**: Hỗ trợ computed property names
- **Method shorthand**: Methods ngắn gọn hơn
- **Modern syntax**: Theo chuẩn ES6+

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**

| Ưu điểm          | Giải thích                     |
| ---------------- | ------------------------------ |
| Ngắn gọn         | Giảm code boilerplate          |
| Dễ đọc           | Code rõ ràng về ý định         |
| Dynamic keys     | Hỗ trợ computed property names |
| Method shorthand | Methods ngắn gọn hơn           |
| Modern           | Theo chuẩn ES6+                |

**Nhược điểm (Cons):**

| Nhược điểm      | Giải thích                                                  |
| --------------- | ----------------------------------------------------------- |
| Browser support | Cần polyfill cho older browsers (nhưng hiện nay hỗ trợ tốt) |

---

## Computed property names?

**Computed property names** cho phép sử dụng expressions làm property names trong object literals, được bao quanh bởi square brackets `[]`.

### Mục đích / Purpose

- Tạo dynamic property names
- Dùng variables làm property names
- Dùng expressions làm property names

### Khi nào dùng / When to Use

- Khi property name là dynamic
- Khi property name được tính từ expression
- Khi cần tạo properties dựa trên variables

### Ví dụ:

```javascript
// Computed property name với variable
const key = "name";
const obj = {
  [key]: "John",
};
console.log(obj); // { name: 'John' }

// Computed property name với expression
const prefix = "user";
const obj = {
  [prefix + "Name"]: "John",
  [prefix + "Age"]: 30,
};
console.log(obj); // { userName: 'John', userAge: 30 }

// Computed property name với template literal
const name = "John";
const obj = {
  [`user_${name}`]: "active",
};
console.log(obj); // { user_John: 'active' }

// Computed property name với function call
const getKey = () => "dynamicKey";
const obj = {
  [getKey()]: "value",
};
console.log(obj); // { dynamicKey: 'value' }

// Computed property name với Symbol
const sym = Symbol("description");
const obj = {
  [sym]: "symbol value",
};
console.log(obj[sym]); // 'symbol value'

// Multiple computed properties
const a = "first";
const b = "second";
const obj = {
  [a]: 1,
  [b]: 2,
  [a + b]: 3,
};
console.log(obj); // { first: 1, second: 2, firstsecond: 3 }

// Dynamic object creation
function createObject(key, value) {
  return {
    [key]: value,
    [`${key}Type`]: typeof value,
  };
}
console.log(createObject("age", 30)); // { age: 30, ageType: 'number' }
```

### Best Practices:

```javascript
// ✅ Dùng computed property names cho dynamic keys
const key = "dynamic";
const obj = { [key]: "value" };

// ✅ Dùng computed property names với template literals
const prefix = "user";
const obj = { [`${prefix}Name`]: "John" };

// ✅ Dùng computed property names với functions
const getKey = () => "computed";
const obj = { [getKey()]: "value" };

// ❌ Tránh computed property names cho static keys
const bad = { ["staticKey"]: "value" };

// ✅ Dùng static keys thay thế
const good = { staticKey: "value" };
```

---

## Method shorthand?

**Method shorthand** cho phép viết methods trong object literals mà không cần từ khóa `function`.

### Mục đích / Purpose

- Viết methods ngắn gọn hơn
- Code dễ đọc hơn
- Tương đương với ES5 methods

### Khi nào dùng / When to Use

- Khi viết methods trong object literals
- Khi muốn code ngắn gọn
- Khi methods không cần constructor context

### Ví dụ:

```javascript
// Method shorthand
const obj = {
  greet(name) {
    return `Hello, ${name}!`;
  },
  add(a, b) {
    return a + b;
  },
};
console.log(obj.greet("John")); // Hello, John!
console.log(obj.add(1, 2)); // 3

// ES5 (cũ)
const objOld = {
  greet: function (name) {
    return `Hello, ${name}!`;
  },
  add: function (a, b) {
    return a + b;
  },
};

// Method shorthand với this
const counter = {
  count: 0,
  increment() {
    this.count++;
    return this.count;
  },
  decrement() {
    this.count--;
    return this.count;
  },
};
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1

// Method shorthand với computed names
const methodName = "sayHello";
const obj = {
  [methodName]() {
    return "Hello!";
  },
};
console.log(obj.sayHello()); // Hello!

// Generator method shorthand
const obj = {
  *generateNumbers() {
    let i = 0;
    while (i < 3) {
      yield i++;
    }
  },
};
for (const num of obj.generateNumbers()) {
  console.log(num); // 0, 1, 2
}

// Async method shorthand
const api = {
  async fetchData(url) {
    const response = await fetch(url);
    return response.json();
  },
};
```

### Best Practices:

```javascript
// ✅ Dùng method shorthand cho object methods
const obj = {
  greet(name) {
    return `Hello, ${name}!`;
  },
};

// ✅ Dùng method shorthand với this
const counter = {
  count: 0,
  increment() {
    this.count++;
  },
};

// ✅ Dùng method shorthand cho computed names
const methodName = "dynamicMethod";
const obj = {
  [methodName]() {
    return "Hello!";
  },
};

// ❌ Tránh dùng method shorthand khi cần constructor context
// Dùng arrow functions hoặc function expressions
const bad = {
  callback: () => {
    // this không được bind như method shorthand
  },
};
```

---

## Property shorthand?

**Property shorthand** cho phép viết properties khi property name trùng với variable name.

### Mục đích / Purpose

- Giảm code khi property name trùng với variable name
- Code ngắn gọn và dễ đọc hơn

### Khi nào dùng / When to Use

- Khi property name trùng với variable name
- Khi muốn code ngắn gọn

### Ví dụ:

```javascript
// Property shorthand
const name = "John";
const age = 30;
const email = "john@example.com";

const user = {
  name,
  age,
  email,
};
console.log(user); // { name: 'John', age: 30, email: 'john@example.com' }

// ES5 (cũ)
const userOld = {
  name: name,
  age: age,
  email: email,
};

// Mixed shorthand và regular properties
const firstName = "John";
const lastName = "Doe";
const user = {
  firstName,
  lastName,
  fullName: firstName + " " + lastName,
  isActive: true,
};
console.log(user); // { firstName: 'John', lastName: 'Doe', fullName: 'John Doe', isActive: true }

// Property shorthand với destructuring
function createUser({ name, age, email }) {
  return {
    name,
    age,
    email,
    createdAt: new Date(),
  };
}
console.log(createUser({ name: "John", age: 30, email: "john@example.com" }));

// Property shorthand với function parameters
function logUser({ name, age }) {
  console.log(`User: ${name}, Age: ${age}`);
}
logUser({ name: "John", age: 30 }); // User: John, Age: 30

// Property shorthand với spread
const defaults = { theme: "light", lang: "en" };
const userSettings = { ...defaults, theme: "dark" };
console.log(userSettings); // { theme: 'dark', lang: 'en' }

// Property shorthand trong return
function getUser() {
  const name = "John";
  const age = 30;
  return { name, age };
}
console.log(getUser()); // { name: 'John', age: 30 }
```

### Best Practices:

```javascript
// ✅ Dùng property shorthand khi tên trùng với variable
const name = "John";
const obj = { name };

// ✅ Dùng property shorthand trong return
function getUser() {
  const name = "John";
  const age = 30;
  return { name, age };
}

// ✅ Dùng property shorthand với destructuring
function createUser({ name, age, email }) {
  return { name, age, email };
}

// ❌ Tránh property shorthand khi tên khác nhau
const userName = "John";
const bad = { userName }; // OK nếu muốn property name là userName
const good = { name: userName }; // Nên dùng khi muốn property name khác
```

---

## Destructuring trong object literals?

**Destructuring trong object literals** kết hợp property shorthand và destructuring để tạo objects ngắn gọn hơn.

### Mục đích / Purpose

- Tạo objects từ destructured values
- Giảm code boilerplate
- Code dễ đọc hơn

### Khi nào dùng / When to Use

- Khi tạo objects từ destructured parameters
- Khi muốn rename properties
- Khi muốn pick specific properties

### Ví dụ:

```javascript
// Destructuring với property shorthand
function createUser({ name, age, email }) {
  return { name, age, email };
}
const user = createUser({ name: "John", age: 30, email: "john@example.com" });
console.log(user); // { name: 'John', age: 30, email: 'john@example.com' }

// Destructuring với renaming
function processUser({ name: userName, age: userAge }) {
  return { userName, userAge };
}
const processed = processUser({ name: "John", age: 30 });
console.log(processed); // { userName: 'John', userAge: 30 }

// Pick specific properties
function getProfile({ name, email }) {
  return { name, email };
}
const profile = getProfile({
  name: "John",
  age: 30,
  email: "john@example.com",
});
console.log(profile); // { name: 'John', email: 'john@example.com' }

// Destructuring với default values
function createUser({ name = "Anonymous", age = 0 } = {}) {
  return { name, age };
}
console.log(createUser()); // { name: 'Anonymous', age: 0 }
console.log(createUser({ name: "John" })); // { name: 'John', age: 0 }

// Destructuring với computed properties
const key = "name";
function createObj({ [key]: value }) {
  return { [key]: value };
}
console.log(createObj({ name: "John" })); // { name: 'John' }

// Destructuring với rest
function extractMeta({ id, createdAt, ...data }) {
  return { meta: { id, createdAt }, data };
}
const result = extractMeta({
  id: 1,
  createdAt: "2024-01-01",
  name: "John",
  age: 30,
});
console.log(result);
// { meta: { id: 1, createdAt: '2024-01-01' }, data: { name: 'John', age: 30 } }
```

### Best Practices:

```javascript
// ✅ Dùng destructuring với property shorthand
function createUser({ name, age, email }) {
  return { name, age, email };
}

// ✅ Dùng destructuring với renaming
function processUser({ name: userName, age: userAge }) {
  return { userName, userAge };
}

// ✅ Dùng destructuring để pick properties
function getProfile({ name, email }) {
  return { name, email };
}

// ❌ Tránh destructuring khi không cần
function bad(obj) {
  const { name, age } = obj;
  return { name, age };
}

// ✅ Dùng destructuring trực tiếp trong parameter
function good({ name, age }) {
  return { name, age };
}
```

---

## Use Cases & Patterns

### Common Enhanced Object Literal Patterns:

```javascript
// 1. Dynamic object creation
function createDynamicObject(prefix, data) {
  return {
    [`${prefix}Id`]: data.id,
    [`${prefix}Name`]: data.name,
    [`${prefix}Value`]: data.value,
  };
}
console.log(createDynamicObject("user", { id: 1, name: "John", value: 100 }));

// 2. Redux action creators
const createAction = (type, payload) => ({ type, payload });
const increment = () => createAction("INCREMENT", 1);
const setUser = (user) => createAction("SET_USER", user);

// 3. API response mapping
function mapApiResponse({ id, name, email, created_at }) {
  return {
    id,
    name,
    email,
    createdAt: created_at,
  };
}

// 4. Configuration objects
function createConfig({ debug = false, port = 3000, host = "localhost" }) {
  return {
    debug,
    port,
    host,
    url: `http://${host}:${port}`,
  };
}

// 5. State management
function updateState(state, updates) {
  return {
    ...state,
    ...updates,
  };
}

// 6. Class-like objects
const calculator = {
  result: 0,
  add(value) {
    this.result += value;
    return this;
  },
  subtract(value) {
    this.result -= value;
    return this;
  },
  multiply(value) {
    this.result *= value;
    return this;
  },
  getResult() {
    return this.result;
  },
};
console.log(calculator.add(10).subtract(3).multiply(2).getResult()); // 14

// 7. Method chaining
const queryBuilder = {
  conditions: [],
  where(field, value) {
    this.conditions.push({ field, value });
    return this;
  },
  build() {
    return this.conditions.map((c) => `${c.field} = ${c.value}`).join(" AND ");
  },
};
console.log(queryBuilder.where("name", "John").where("age", 30).build());
// name = John AND age = 30

// 8. Namespace pattern
const Utils = {
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  truncate(str, length) {
    return str.slice(0, length) + "...";
  },
  isEmpty(value) {
    return value === null || value === undefined || value === "";
  },
};

// 9. Module pattern
const Module = (() => {
  let privateVar = 0;

  return {
    increment() {
      privateVar++;
      return privateVar;
    },
    decrement() {
      privateVar--;
      return privateVar;
    },
    getValue() {
      return privateVar;
    },
  };
})();

// 10. Factory pattern
function createUser({ name, age, role = "user" }) {
  return {
    name,
    age,
    role,
    isActive: true,
    createdAt: new Date(),
    [role === "admin" ? "permissions" : "userPermissions"]: ["read"],
  };
}
```

---

## Anti-patterns cần tránh

```javascript
// ❌ Dùng method shorthand khi cần arrow function behavior
const bad = {
  data: [1, 2, 3],
  process: function () {
    return this.data.map((x) => x * 2);
  },
};

// ✅ Dùng method shorthand khi cần this context
const good = {
  data: [1, 2, 3],
  process() {
    return this.data.map((x) => x * 2);
  },
};

// ❌ Dùng property shorthand khi tên khác nhau
const userName = "John";
const bad = { userName }; // Nếu muốn property name là 'name'

// ✅ Dùng regular property khi cần rename
const good = { name: userName };

// ❌ Quá nhiều computed properties (khó đọc)
const bad = {
  [a + b + c]: 1,
  [d + e + f]: 2,
  [g + h + i]: 3,
};

// ✅ Tách computed properties ra variables
const key1 = a + b + c;
const key2 = d + e + f;
const good = {
  [key1]: 1,
  [key2]: 2,
};
```

---

_References: [MDN Object Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer), [ES6 Object Literal Extensions](https://es6-features.org/#ObjectLiteralExtensions)_
