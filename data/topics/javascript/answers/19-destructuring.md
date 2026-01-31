# 19. Destructuring

## Tổng quan về Destructuring

### Mục đích của Destructuring / Purpose

**Destructuring** là một cú pháp trong ES6 cho phép trích xuất giá trị từ arrays hoặc objects và gán chúng vào các biến riêng biệt một cách ngắn gọn và dễ đọc.

**Mục đích chính:**

- Giảm số lượng code cần viết khi trích xuất dữ liệu
- Làm code dễ đọc và dễ hiểu hơn
- Tăng tính mô tả của code (self-documenting)
- Hỗ trợ việc xử lý các cấu trúc dữ liệu phức tạp

### Khi nào nên dùng / When to Use

**Nên dùng destructuring khi:**

- Trích xuất multiple values từ array/object
- Làm việc với API responses có cấu trúc phức tạp
- Xử lý function parameters là objects
- Swap values giữa các biến
- Lặp qua arrays/objects trong loops
- Làm việc với nested data structures

**Không nên dùng khi:**

- Chỉ cần trích xuất 1 giá trị đơn giản
- Cấu trúc data quá phức tạp và khó đọc
- Performance là ưu tiên hàng đầu (trong một số trường hợp)

### Giúp ích gì / Benefits

**Lợi ích:**

- **Cleaner code**: Code ngắn gọn hơn, dễ đọc hơn
- **Less boilerplate**: Giảm code lặp lại
- **Better readability**: Rõ ràng về ý định của lập trình viên
- **Default values**: Dễ dàng set default values
- **Flexible**: Hỗ trợ nested destructuring, renaming, rest operator
- **Modern syntax**: Theo chuẩn ES6+, được hỗ trợ bởi hầu hết browsers

### Ưu nhược điểm / Pros & Cons

**Ưu điểm (Pros):**
| Ưu điểm | Giải thích |
|--------|-----------|
| Ngắn gọn | Giảm số lượng code cần viết |
| Dễ đọc | Code rõ ràng về ý định |
| Flexible | Hỗ trợ nhiều pattern destructuring |
| Default values | Dễ dàng handle missing values |
| Modern | Theo chuẩn ES6+ hiện đại |

**Nhược điểm (Cons):**
| Nhược điểm | Giải thích |
|-----------|-----------|
| Learning curve | Cần thời gian để làm quen với cú pháp |
| Nested complexity | Nested destructuring có thể khó đọc |
| Performance overhead | Có overhead nhỏ so với truy cập trực tiếp |
| Browser support | Cần polyfill cho older browsers (nhưng hiện nay hỗ trợ tốt) |

---

## Array destructuring?

**Array destructuring** - Trích giá trị từ array theo vị trí.

### Mục đích / Purpose

Trích xuất các phần tử từ array theo vị trí index và gán vào biến.

### Khi nào dùng / When to Use

- Khi cần trích xuất nhiều giá trị từ array
- Khi muốn swap values giữa 2 biến
- Khi làm việc với function trả về array
- Khi cần ignore một số giá trị trong array

### Ví dụ:

```javascript
// Destructuring array
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;

console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

// Destructuring với biến khác
const [a, b, c, d, e] = ["A", "B", "C", "D", "E"];
console.log(a); // 'A'
console.log(b); // 'B'
console.log(c); // 'C'
console.log(d); // 'D'
console.log(e); // 'E'
```

### Swap values - Use case phổ biến:

```javascript
// Swap values mà không cần temporary variable
let x = 1;
let y = 2;

[x, y] = [y, x];

console.log(x); // 2
console.log(y); // 1
```

### Skip values:

```javascript
// Skip giá trị không cần thiết
const numbers = [1, 2, 3, 4, 5];
const [first, , third, , fifth] = numbers;

console.log(first); // 1
console.log(third); // 3
console.log(fifth); // 5
```

### Nested array destructuring:

```javascript
// Destructuring nested array
const matrix = [
  [1, 2],
  [3, 4],
  [5, 6],
];

const [[first, second], [third, fourth], [fifth, sixth]] = matrix;

console.log(first); // 1
console.log(second); // 2
console.log(third); // 3
console.log(fourth); // 4
console.log(fifth); // 5
console.log(sixth); // 6
```

### Destructuring trong function parameters:

```javascript
// Destructuring trong function parameters
function sum([a, b]) {
  return a + b;
}

const numbers = [1, 2, 3];
console.log(sum(numbers)); // 3

// Destructuring với rest parameter
function sumAll(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

console.log(sumAll(1, 2, 3, 4, 5)); // 15
```

---

## Object destructuring?

**Object destructuring** - Trích properties từ object.

### Mục đích / Purpose

Trích xuất các properties từ object bằng tên property (không phải vị trí như array).

### Khi nào dùng / When to Use

- Khi cần trích xuất multiple properties từ object
- Khi làm việc với API responses, config objects
- Khi function nhận object làm parameter
- Khi muốn rename properties

### Giúp ích gì / Benefits

- Không phụ thuộc vào thứ tự properties
- Hỗ trợ renaming properties
- Có thể set default values
- Dễ dàng trích xuất nested properties

### Basic object destructuring:

```javascript
// Destructuring object
const user = {
  name: "John",
  age: 25,
  city: "New York",
  country: "USA",
};

const { name, age, city, country } = user;

console.log(name); // 'John'
console.log(age); // 25
console.log(city); // 'New York'
console.log(country); // 'USA'
```

### Renaming với destructuring:

```javascript
// Destructuring với renaming
const user = {
  firstName: "John",
  lastName: "Doe",
  age: 25,
};

const { firstName: fname, lastName: lname, age: userAge } = user;

console.log(fname); // 'John'
console.log(lname); // 'Doe'
console.log(userAge); // 25
```

**Lưu ý:** Sau khi rename, biến cũ (firstName, lastName) sẽ không tồn tại, chỉ có biến mới (fname, lname).

### Default values trong destructuring:

```javascript
// Default values
const user = {
  name: "John",
  age: 25,
};

const { name = "Anonymous", age = 0, city = "Unknown" } = user;

console.log(name); // 'John' (giá trị thực tế)
console.log(age); // 25 (giá trị thực tế)
console.log(city); // 'Unknown' (default value)
```

**Use case:** Khi làm việc với optional properties hoặc API responses có thể thiếu một số fields.

### Nested object destructuring:

```javascript
// Destructuring nested object
const data = {
  user: {
    name: "John",
    address: {
      city: "New York",
      country: "USA",
    },
  },
  timestamp: Date.now(),
};

const {
  user: {
    name,
    address: { city, country },
  },
  timestamp,
} = data;

console.log(name); // 'John'
console.log(city); // 'New York'
console.log(country); // 'USA'
console.log(timestamp); // Current date
```

---

## Nested destructuring?

### Mục đích / Purpose

Trích xuất giá trị từ các cấu trúc dữ liệu lồng nhau (nested arrays hoặc nested objects).

### Khi nào dùng / When to Use

- Khi làm việc với API responses có cấu trúc phức tạp
- Khi xử lý nested config objects
- Khi cần trích xuất deeply nested values

### Cảnh báo / Warning

Nested destructuring có thể làm code khó đọc nếu quá nhiều levels. Nên cân nhắc giữa readability và conciseness.

### Nested array destructuring:

```javascript
// Nested array destructuring
const data = [
  [1, 2, 3],
  [4, 5, 6],
];

const [[first, second], [third, fourth], ...rest] = data;

console.log(first); // 1
console.log(second); // 2
console.log(third); // 3
console.log(fourth); // 4
console.log(rest); // [5, 6]
```

### Nested object destructuring:

```javascript
// Nested object destructuring
const apiResponse = {
  data: {
    user: {
      id: 1,
      profile: {
        name: "John",
        email: "john@example.com",
      },
    },
  },
  status: 200,
};

const {
  data: {
    user: {
      id,
      profile: { name, email },
    },
  },
} = apiResponse;

console.log(id); // 1
console.log(name); // 'John'
console.log(email); // 'john@example.com'
```

### Mixed nested destructuring:

```javascript
// Kết hợp array và object destructuring
const data = {
  users: [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
  ],
  meta: {
    total: 2,
    page: 1,
  },
};

const {
  users: [{ id: firstId }, { id: secondId }],
  meta: { total },
} = data;

console.log(firstId); // 1
console.log(secondId); // 2
console.log(total); // 2
```

---

## Default values trong destructuring?

### Mục đích / Purpose

Cung cấp giá trị mặc định khi giá trị được trích xuất là `undefined` (không phải `null` hoặc các falsy values khác).

### Khi nào dùng / When to Use

- Khi làm việc với optional properties
- Khi API responses có thể thiếu một số fields
- Khi muốn đảm bảo biến luôn có giá trị

### Lưu ý quan trọng / Important Note

Default values chỉ áp dụng khi giá trị là `undefined`, không áp dụng cho `null`, `0`, `false`, `""`, `NaN`.

### Default values cho array:

```javascript
// Default values trong array destructuring
const numbers = [1];
const [first = 10, second = 20] = numbers;

console.log(first); // 1 (giá trị thực tế)
console.log(second); // 20 (default value)

// Default values với rest
const [a = 1, b = 2, ...rest] = [1, 2, 3, 4, 5];
console.log(a); // 1
console.log(b); // 2
console.log(rest); // [3, 4, 5]
```

### Default values cho object:

```javascript
// Default values trong object destructuring
const user = { name: "John" };
const { name = "Anonymous", age = 0 } = user;

console.log(name); // 'John' (giá trị thực tế)
console.log(age); // 0 (default value)

// Default values với falsy values
const config = { count: 0, active: false };
const { count = 10, active = true } = config;

console.log(count); // 0 (không dùng default vì 0 không phải undefined)
console.log(active); // false (không dùng default vì false không phải undefined)
```

### Nested default values:

```javascript
// Nested default values
const data = {
  user: {
    profile: {
      name: "John",
      // address không tồn tại
    },
  },
};

const {
  user: {
    profile: { name, address: { city = "Unknown" } = {} },
  },
} = data;

console.log(name); // 'John'
console.log(city); // 'Unknown' (default value)

// Lưu ý: cần = {} cho address object để tránh error khi address undefined
```

### Default values trong function parameters:

```javascript
// Default values trong function parameters
function createUser({
  id = Date.now(),
  name = "Anonymous",
  role = "user",
} = {}) {
  return { id, name, role };
}

const user1 = createUser({ id: 1 });
const user2 = createUser({ name: "John" });
const user3 = createUser(); // Không truyền parameter

console.log(user1); // { id: 1, name: 'Anonymous', role: 'user' }
console.log(user2); // { id: timestamp, name: 'John', role: 'user' }
console.log(user3); // { id: timestamp, name: 'Anonymous', role: 'user' }
```

---

## Rest operator trong destructuring?

### Mục đích / Purpose

Thu thập các giá trị còn lại vào một array mới (cho arrays) hoặc object mới (cho objects).

### Khi nào dùng / When to Use

- Khi cần lấy một số giá trị đầu và thu thập phần còn lại
- Khi muốn clone array/object
- Khi cần remove một số properties từ object

### Giúp ích gì / Benefits

- Flexible trong việc xử lý dữ liệu
- Hỗ trợ việc clone shallow
- Dễ dàng exclude properties

### Rest parameter trong functions:

```javascript
// Rest parameter - thu thập các tham số còn lại
function sumAll(...numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

console.log(sumAll(1, 2, 3)); // 6
console.log(sumAll(1, 2, 3, 4, 5)); // 15

// Rest với các parameters khác
function logMessage(prefix, ...messages) {
  console.log(`[${prefix}]`, ...messages);
}

logMessage("INFO", "User logged in", "ID: 123");
// [INFO] User logged in ID: 123
```

### Rest trong array destructuring:

```javascript
// Rest trong array destructuring
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;

console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

// Clone array với rest
const original = [1, 2, 3];
const copy = [...original];
console.log(copy); // [1, 2, 3]

// Concatenate arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4]
```

### Rest trong object destructuring:

```javascript
// Rest trong object destructuring
const user = {
  id: 1,
  name: "John",
  age: 25,
  city: "New York",
};

const { id, name, ...rest } = user;

console.log(id); // 1
console.log(name); // 'John'
console.log(rest); // { age: 25, city: 'New York' }

// Clone object với rest
const original = { a: 1, b: 2, c: 3 };
const copy = { ...original };
console.log(copy); // { a: 1, b: 2, c: 3 }

// Merge objects
const defaults = { theme: "light", lang: "en" };
const config = { ...defaults, theme: "dark" };
console.log(config); // { theme: 'dark', lang: 'en' }
```

### Remove properties from object:

```javascript
// Remove properties bằng destructuring với rest
const user = {
  id: 1,
  name: "John",
  password: "secret123", // Không muốn expose
  token: "abc123", // Không muốn expose
};

const { password, token, ...safeUser } = user;

console.log(safeUser); // { id: 1, name: 'John' }
console.log(password); // 'secret123' (đã tách ra)
console.log(token); // 'abc123' (đã tách ra)
```

---

## Destructuring function parameters?

### Mục đích / Purpose

Trích xuất các properties từ object/array trực tiếp trong function parameters, giúp code ngắn gọn và dễ đọc hơn.

### Khi nào dùng / When to Use

- Khi function nhận nhiều parameters
- Khi function nhận object làm parameter
- Khi muốn có default values cho parameters
- Khi làm việc với config objects

### Giúp ích gì / Benefits

- Code dễ đọc hơn (self-documenting)
- Không cần nhớ thứ tự parameters
- Dễ dàng thêm/bỏ parameters
- Hỗ trợ default values

### Destructuring trong function parameters:

```javascript
// Destructuring object trong function parameters
function greet({ name, age, city }) {
  console.log(`Hello ${name}, you are ${age} years old from ${city}`);
}

greet({
  name: "John",
  age: 25,
  city: "New York",
});
// 'Hello John, you are 25 years old from New York'

// So sánh với cách truyền thống
function greetTraditional(user) {
  console.log(
    `Hello ${user.name}, you are ${user.age} years old from ${user.city}`,
  );
}
```

### Destructuring với default values:

```javascript
// Default values trong function parameters
function createUser({
  id = Date.now(),
  name = "Anonymous",
  role = "user",
} = {}) {
  return { id, name, role };
}

const user1 = createUser({ id: 1 });
const user2 = createUser({ name: "John" });
const user3 = createUser(); // Không truyền parameter

console.log(user1); // { id: 1, name: 'Anonymous', role: 'user' }
console.log(user2); // { id: timestamp, name: 'John', role: 'user' }
console.log(user3); // { id: timestamp, name: 'Anonymous', role: 'user' }
```

**Lưu ý:** `= {}` ở cuối đảm bảo function hoạt động ngay cả khi không truyền parameter.

### Destructuring nested parameters:

```javascript
// Destructuring nested object trong function parameters
function processConfig({ api = {}, features = {} } = {}) {
  const { baseUrl = "https://api.example.com", timeout = 5000 } = api;

  const { cache = true, retry = 3 } = features;

  return { baseUrl, timeout, cache, retry };
}

const config1 = processConfig({
  api: { timeout: 10000 },
  features: { cache: false },
});

console.log(config1);
// { baseUrl: 'https://api.example.com', timeout: 10000, cache: false, retry: 3 }
```

### Renaming trong function parameters:

```javascript
// Renaming trong function parameters
function processUser({ id: userId, name: userName, email: userEmail }) {
  console.log(`Processing user ${userId}: ${userName} (${userEmail})`);
}

processUser({
  id: 1,
  name: "John",
  email: "john@example.com",
});
// 'Processing user 1: John (john@example.com)'
```

---

## Destructuring trong loops?

### Mục đích / Purpose

Trích xuất giá trị trực tiếp trong loop declarations, giúp code ngắn gọn hơn khi lặp qua arrays/objects.

### Khi nào dùng / When to Use

- Khi lặp qua array of objects
- Khi cần trích xuất multiple properties trong mỗi iteration
- Khi làm việc với Map/Map.entries()

### Destructuring trong for...of:

```javascript
// Destructuring trong for...of loop
const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Bob" },
];

for (const { id, name } of users) {
  console.log(`User ${id}: ${name}`);
}
// 'User 1: John'
// 'User 2: Jane'
// 'User 3: Bob'

// So sánh với cách truyền thống
for (const user of users) {
  console.log(`User ${user.id}: ${user.name}`);
}
```

### Destructuring Map.entries():

```javascript
// Destructuring Map.entries()
const map = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
  ["key3", "value3"],
]);

for (const [key, value] of map.entries()) {
  console.log(`${key} -> ${value}`);
}
// 'key1 -> value1'
// 'key2 -> value2'
// 'key3 -> value3'

// Hoặc destructuring trực tiếp trong for...of
for (const [key, value] of map) {
  console.log(`${key} -> ${value}`);
}
```

### Destructuring Object.entries():

```javascript
// Destructuring Object.entries()
const user = {
  name: "John",
  age: 25,
  city: "New York",
};

for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}
// 'name: John'
// 'age: 25'
// 'city: New York'
```

### Destructuring nested trong loops:

```javascript
// Destructuring nested trong loops
const data = [
  { user: { id: 1, name: "John" }, score: 95 },
  { user: { id: 2, name: "Jane" }, score: 88 },
  { user: { id: 3, name: "Bob" }, score: 92 },
];

for (const {
  user: { id, name },
  score,
} of data) {
  console.log(`${name} (ID: ${id}): ${score} points`);
}
// 'John (ID: 1): 95 points'
// 'Jane (ID: 2): 88 points'
// 'Bob (ID: 3): 92 points'
```

---

## Destructuring return values?

### Mục đích / Purpose

Trích xuất giá trị trực tiếp từ function return values mà không cần intermediate variables.

### Khi nào dùng / When to Use

- Khi function trả về object/array
- Khi muốn trích xuất một số values cụ thể từ return value
- Khi làm việc với API responses

### Destructuring return values:

```javascript
// Destructuring return values
function getUser() {
  return {
    id: 1,
    name: "John",
    age: 25,
    email: "john@example.com",
  };
}

// Chỉ lấy những giá trị cần thiết
const { id, name, age } = getUser();
console.log(id); // 1
console.log(name); // 'John'
console.log(age); // 25

// So sánh với cách truyền thống
const user = getUser();
const id2 = user.id;
const name2 = user.name;
const age2 = user.age;
```

### Destructuring với computed properties:

```javascript
// Destructuring với computed properties
function getDynamicProperty(prop) {
  const obj = {
    name: "John",
    age: 25,
    city: "New York",
  };

  const { [prop]: value } = obj;
  return value;
}

console.log(getDynamicProperty("name")); // 'John'
console.log(getDynamicProperty("age")); // 25
console.log(getDynamicProperty("city")); // 'New York'
```

### Destructuring multiple return values:

```javascript
// Function trả về array
function getMinMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)];
}

const [min, max] = getMinMax([1, 2, 3, 4, 5]);
console.log(min); // 1
console.log(max); // 5

// Function trả về object
function getStatistics(numbers) {
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
    avg: numbers.reduce((a, b) => a + b, 0) / numbers.length,
  };
}

const {
  min: minimum,
  max: maximum,
  avg: average,
} = getStatistics([1, 2, 3, 4, 5]);
console.log(minimum); // 1
console.log(maximum); // 5
console.log(average); // 3
```

---

## Ví dụ thực tế / Real-world Examples

### API response destructuring:

```javascript
// Destructuring API response
async function fetchUser(userId) {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();

  const {
    user: { id, name, email },
    status,
    meta: { timestamp },
  } = data;

  console.log(`User: ${name} (${email})`);
  console.log(`Status: ${status}`);
  console.log(`Fetched at: ${new Date(timestamp).toLocaleString()}`);

  return { id, name, email };
}

// Use case: Khi làm việc với REST API responses có cấu trúc phức tạp
// Giúp ích: Code dễ đọc, dễ maintain, chỉ lấy những dữ liệu cần thiết
```

### Config destructuring:

```javascript
// Destructuring config object
const defaultConfig = {
  api: {
    baseUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3,
  },
  features: {
    cache: true,
    logging: true,
    debug: false,
  },
  ui: {
    theme: "light",
    language: "en",
  },
};

function initializeConfig(userConfig = {}) {
  const {
    api: { baseUrl, timeout, retries },
    features: { cache, logging, debug },
    ui: { theme, language },
  } = { ...defaultConfig, ...userConfig };

  return { baseUrl, timeout, retries, cache, logging, debug, theme, language };
}

const config = initializeConfig({
  api: { timeout: 10000 },
  ui: { theme: "dark" },
});

// Use case: Khi làm việc với config objects có nhiều nested properties
// Giúp ích: Dễ dàng merge default config với user config
```

### Destructuring trong class methods:

```javascript
// Destructuring trong class methods
class User {
  constructor({ id, name, email, ...rest }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.metadata = rest;
  }

  update({ id, name, email, ...rest }) {
    if (id !== undefined) this.id = id;
    if (name !== undefined) this.name = name;
    if (email !== undefined) this.email = email;
    this.metadata = { ...this.metadata, ...rest };
  }

  print() {
    console.log(`User ${this.id}: ${this.name} (${this.email})`);
    console.log("Metadata:", this.metadata);
  }

  static fromApiResponse({ data: { user, ...rest }, status }) {
    return new User({
      ...user,
      apiStatus: status,
      ...rest,
    });
  }
}

const user = new User({
  id: 1,
  name: "John",
  email: "john@example.com",
  role: "admin",
  createdAt: "2024-01-01",
});

user.update({ name: "Jane", role: "superadmin" });
user.print();
// User 1: Jane (john@example.com)
// Metadata: { role: 'superadmin', createdAt: '2024-01-01' }

// Use case: Khi làm việc với class constructors và methods
// Giúp ích: Code ngắn gọn, dễ extend với additional properties
```

### Destructuring trong React components:

```javascript
// Destructuring trong React components
function UserProfile({ user: { id, name, email, avatar }, onEdit, onDelete }) {
  return (
    <div className="user-profile">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
      <button onClick={() => onEdit(id)}>Edit</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

// Sử dụng component
<UserProfile
  user={{
    id: 1,
    name: "John",
    email: "john@example.com",
    avatar: "https://example.com/avatar.jpg",
  }}
  onEdit={(id) => console.log("Edit user", id)}
  onDelete={(id) => console.log("Delete user", id)}
/>;

// Use case: Khi làm việc với React components
// Giúp ích: Code component ngắn gọn, rõ ràng về props cần thiết
```

### Destructuring trong Redux/State management:

```javascript
// Destructuring trong Redux selectors
const selectUserState = (state) => state.user;

const selectCurrentUser = createSelector(
  [selectUserState],
  ({ currentUser, loading, error }) => ({
    user: currentUser,
    isLoading: loading,
    hasError: !!error,
    errorMessage: error?.message,
  }),
);

// Trong component
function UserPage() {
  const { user, isLoading, hasError, errorMessage } =
    useSelector(selectCurrentUser);

  if (isLoading) return <Spinner />;
  if (hasError) return <Error message={errorMessage} />;

  return <UserProfile user={user} />;
}

// Use case: Khi làm việc với state management (Redux, Zustand, etc.)
// Giúp ích: Tách biệt logic trích xuất state, dễ test và maintain
```

---

## Tóm tắt / Summary

### Khi nào nên dùng destructuring?

| Tình huống                 | Có nên dùng? | Lý do                          |
| -------------------------- | ------------ | ------------------------------ |
| Trích xuất multiple values | ✅ Có        | Code ngắn gọn, dễ đọc          |
| Single value extraction    | ❌ Không     | Không cần thiết                |
| Nested data structures     | ✅ Có        | Nhưng hạn chế quá nhiều levels |
| Function parameters (many) | ✅ Có        | Tăng readability               |
| Performance critical code  | ⚠️ Cân nhắc  | Có overhead nhỏ                |

### Best Practices

1. **Use meaningful variable names** - Destructuring giúp code dễ đọc hơn với tên biến rõ nghĩa
2. **Don't over-nest** - Tránh quá nhiều levels nested destructuring
3. **Use default values** - Luôn cung cấp default values khi làm việc với optional data
4. **Rename when necessary** - Sử dụng renaming để tránh conflicts và tăng clarity
5. **Combine with rest** - Sử dụng rest operator để thu thập remaining values
6. **Consider readability** - Đôi khi code truyền thống dễ đọc hơn với complex destructuring

### Anti-patterns cần tránh

```javascript
// ❌ Anti-pattern: Quá nhiều levels nested
const {
  a: {
    b: {
      c: {
        d: { e },
      },
    },
  },
} = data;

// ✅ Better: Tách nhỏ ra
const { a } = data;
const { b } = a;
const { c } = b;
const { d } = c;
const { e } = d;

// ❌ Anti-pattern: Destructuring không cần thiết
const { name } = user; // Chỉ dùng 1 lần
console.log(name);

// ✅ Better: Truy cập trực tiếp
console.log(user.name);
```
