# 21. Decorators

## Tổng quan về Decorators

### Mục đích của Decorators / Purpose

**Decorators** là một tính năng cho phép thêm metadata hoặc modify behavior của classes, methods, properties, parameters. Decorators là một proposal cho JavaScript, hiện đang ở stage 3, và được TypeScript hỗ trợ với `experimentalDecorators` flag.

**Mục đích chính:**

- Thêm metadata cho classes và members
- Modify behavior của classes và methods
- Implement AOP (Aspect-Oriented Programming)
- Dependency injection
- Logging, validation, caching

### Khi nào cần hiểu về Decorators / When to Use

Hiểu về Decorators là cần thiết khi:

- Làm việc với Angular (nhiều decorators)
- Xây dựng frameworks hoặc libraries
- Implement AOP patterns
- Dependency injection
- Validation và logging

### Giúp ích gì / Benefits

**Lợi ích:**

- **Declarative**: Code declarative hơn
- **Reusable**: Dùng lại decorators ở nhiều nơi
- **Composable**: Kết hợp nhiều decorators
- **Separation of Concerns**: Tách business logic từ cross-cutting concerns
- **Framework Support**: Nhiều frameworks dùng decorators

### Ưu nhược điểm / Pros & Cons

| Ưu điểm              | Nhược điểm                        |
| -------------------- | --------------------------------- |
| - Declarative syntax | Experimental feature              |
| - Reusable           | Cần `experimentalDecorators` flag |
| - Composable         | Performance overhead              |
| - AOP support        | Learning curve                    |
| - Framework support  | Debugging khó                     |

---

## Decorators là gì?

**Decorators** - Functions được apply đến classes, methods, properties, hoặc parameters để modify behavior hoặc thêm metadata.

### Mục đích / Purpose

Modify behavior hoặc thêm metadata cho classes và members.

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng               |
| ---------------------- | -------------------------- |
| - Logging              | Khi cần log function calls |
| - Validation           | Khi validate inputs        |
| - Caching              | Khi cache results          |
| - Dependency injection | Khi inject dependencies    |
| - AOP                  | Khi implement AOP patterns |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Declarative**: Code declarative hơn
- **Reusable**: Dùng lại decorators
- **Composable**: Kết hợp decorators
- **Separation of Concerns**: Tách logic
- **Framework Support**: Nhiều frameworks dùng decorators

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm           |
| ------------- | -------------------- |
| - Declarative | Experimental feature |
| - Reusable    | Cần flag             |
| - Composable  | Performance overhead |
| - AOP support | Debugging khó        |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return `Hello, ${this.greeting}!`;
  }
}

// Ví dụ: Method decorator
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`${propertyKey} returned:`, result);
    return result;
  };
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }

  @log
  subtract(a: number, b: number): number {
    return a - b;
  }
}

const calc = new Calculator();
calc.add(1, 2); // Logs: Calling add with args: [1, 2], add returned: 3

// Ví dụ: Property decorator
function format(target: any, propertyKey: string) {
  let value: string;

  const getter = () => {
    return value.toUpperCase();
  };

  const setter = (newValue: string) => {
    value = newValue;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class User {
  @format
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const user = new User("alice");
console.log(user.name); // "ALICE"

// Ví dụ: Parameter decorator
function required(target: any, propertyKey: string, parameterIndex: number) {
  console.log(
    `Parameter at index ${parameterIndex} of ${propertyKey} is required`,
  );
}

class Person {
  greet(@required name: string) {
    console.log(`Hello, ${name}!`);
  }
}

// Ví dụ thực tế: Validation decorator
function validate(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const [data] = args;

    if (!data.name || data.name.trim() === "") {
      throw new Error("Name is required");
    }

    if (!data.email || !data.email.includes("@")) {
      throw new Error("Invalid email");
    }

    return originalMethod.apply(this, args);
  };
}

class UserService {
  @validate
  createUser(data: { name: string; email: string }) {
    console.log("Creating user:", data);
  }
}

const userService = new UserService();
userService.createUser({ name: "Alice", email: "alice@example.com" });
// userService.createUser({ name: "", email: "test" }); // Error: Name is required
```

### Best Practices:

```typescript
// ✅ Dùng decorators cho cross-cutting concerns
@log
@cache
function getData() {
  // ...
}

// ✅ Dùng decorators cho validation
@validate
function createUser(data: UserData) {
  // ...
}

// ✅ Dùng decorators cho dependency injection
class MyService {
  constructor(@inject(Database) private db: Database) {}
}

// ❌ Không nên dùng decorators cho business logic
@businessLogic
function processData(data: Data) {
  // ...
}

// ✅ Nên dùng decorators cho infrastructure concerns
@log
@transaction
function saveData(data: Data) {
  // ...
}
```

---

## Class decorators?

**Class decorators** - Decorators được apply đến class constructor.

### Mục đích / Purpose

Modify class constructor hoặc thêm metadata cho class.

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng                     |
| ---------------------- | -------------------------------- |
| - Sealing              | Khi muốn seal class              |
| - Registration         | Khi register class với framework |
| - Dependency injection | Khi inject dependencies          |
| - Metadata             | Khi thêm metadata cho class      |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Modify Constructor**: Modify class constructor
- **Add Metadata**: Thêm metadata cho class
- **Framework Integration**: Integrate với frameworks
- **Dependency Injection**: Inject dependencies

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                 | Nhược điểm           |
| ----------------------- | -------------------- |
| - Modify constructor    | Experimental feature |
| - Add metadata          | Cần flag             |
| - Framework integration | Performance overhead |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return `Hello, ${this.greeting}!`;
  }
}

// Ví dụ: Class decorator với constructor modification
function logged<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      console.log(`Creating instance of ${constructor.name}`);
    }
  };
}

@logged
class User {
  constructor(public name: string) {}
}

const user = new User("Alice"); // Logs: Creating instance of User

// Ví dụ: Class decorator với metadata
const ComponentMetadataKey = Symbol("Component");

function Component(options: { selector: string }) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    Reflect.defineMetadata(ComponentMetadataKey, options, constructor);
    return constructor;
  };
}

@Component({ selector: "app-user" })
class UserComponent {
  constructor() {
    console.log("UserComponent created");
  }
}

// Ví dụ thực tế: Singleton decorator
function singleton<T extends { new (...args: any[]): {} }>(constructor: T) {
  let instance: T;

  return class extends constructor {
    constructor(...args: any[]) {
      if (!instance) {
        instance = super(...args);
      }
      return instance;
    }
  };
}

@singleton
class Database {
  constructor() {
    console.log("Database initialized");
  }
}

const db1 = new Database(); // Logs: Database initialized
const db2 = new Database(); // No log, returns same instance
console.log(db1 === db2); // true

// Ví dụ thực tế: Mixin decorator
function Timestamped<T extends { new (...args: any[]): {} }>(Base: T) {
  return class extends Base {
    timestamp = new Date();
  };
}

@Timestamped
class User {
  constructor(public name: string) {}
}

const user = new User("Alice");
console.log(user.timestamp); // Current date
```

### Best Practices:

```typescript
// ✅ Dùng class decorators cho framework integration
@Component({ selector: "app-user" })
class UserComponent {}

// ✅ Dùng class decorators cho dependency injection
@Injectable()
class UserService {}

// ✅ Dùng class decorators cho singleton pattern
@singleton
class Database {}

// ❌ Không nên dùng class decorators cho business logic
@businessLogic
class UserProcessor {}

// ✅ Nên dùng class decorators cho infrastructure concerns
@sealed
@logged
class BaseService {}
```

---

## Method decorators?

**Method decorators** - Decorators được apply đến class methods.

### Mục đích / Purpose

Modify method behavior hoặc thêm metadata cho method.

### Khi nào dùng / When to Use

| Tình huống              | Khi nào dùng                       |
| ----------------------- | ---------------------------------- |
| - Logging               | Khi log method calls               |
| - Validation            | Khi validate method inputs         |
| - Caching               | Khi cache method results           |
| - Debouncing/Throttling | Khi debounce/throttle method calls |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Modify Behavior**: Modify method behavior
- **Add Metadata**: Thêm metadata cho method
- **Cross-cutting Concerns**: Tách cross-cutting concerns
- **Reusable**: Dùng lại decorators

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                  | Nhược điểm           |
| ------------------------ | -------------------- |
| - Modify behavior        | Experimental feature |
| - Add metadata           | Cần flag             |
| - Cross-cutting concerns | Performance overhead |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Method decorator
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`${propertyKey} returned:`, result);
    return result;
  };
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(1, 2); // Logs: Calling add with args: [1, 2], add returned: 3

// Ví dụ: Method decorator với caching
function cache(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;
  const cache = new Map();

  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log(`Cache hit for ${propertyKey}`);
      return cache.get(key);
    }

    const result = originalMethod.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

class MathService {
  @cache
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}

const math = new MathService();
console.log(math.fibonacci(10)); // Calculates and caches
console.log(math.fibonacci(10)); // Returns from cache

// Ví dụ: Method decorator với debouncing
function debounce(delay: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    let timeout: NodeJS.Timeout;

    descriptor.value = function (...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        originalMethod.apply(this, args);
      }, delay);
    };
  };
}

class SearchService {
  @debounce(300)
  search(query: string) {
    console.log("Searching:", query);
  }
}

const search = new SearchService();
search.search("hello"); // Debounced
search.search("hello world"); // Debounced, previous call cancelled

// Ví dụ thực tế: Validation decorator
function validate(schema: any) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const [data] = args;
      const { error } = schema.validate(data);

      if (error) {
        throw new Error(`Validation failed: ${error.message}`);
      }

      return originalMethod.apply(this, args);
    };
  };
}

class UserService {
  @validate(userSchema)
  createUser(data: UserData) {
    console.log("Creating user:", data);
  }
}

// Ví dụ thực tế: Transaction decorator
function transaction(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const transaction = await db.beginTransaction();
    try {
      const result = await originalMethod.apply(this, args);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
}

class OrderService {
  @transaction
  async createOrder(orderData: OrderData) {
    // Create order logic
  }
}
```

### Best Practices:

```typescript
// ✅ Dùng method decorators cho logging
@log
function getData() {
  // ...
}

// ✅ Dùng method decorators cho caching
@cache
function expensiveCalculation() {
  // ...
}

// ✅ Dùng method decorators cho debouncing/throttling
@debounce(300)
function handleInput() {
  // ...
}

// ❌ Không nên dùng method decorators cho business logic
@businessLogic
function processData() {
  // ...
}

// ✅ Nên dùng method decorators cho infrastructure concerns
@validate
@transaction
function saveData() {
  // ...
}
```

---

## Property decorators?

**Property decorators** - Decorators được apply đến class properties.

### Mục đích / Purpose

Modify property behavior hoặc thêm metadata cho property.

### Khi nào dùng / When to Use

| Tình huống   | Khi nào dùng                   |
| ------------ | ------------------------------ |
| - Validation | Khi validate property values   |
| - Formatting | Khi format property values     |
| - Read-only  | Khi làm property read-only     |
| - Metadata   | Khi thêm metadata cho property |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Modify Behavior**: Modify property behavior
- **Add Metadata**: Thêm metadata cho property
- **Validation**: Validate property values
- **Formatting**: Format property values

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm           |
| ----------------- | -------------------- |
| - Modify behavior | Experimental feature |
| - Add metadata    | Cần flag             |
| - Validation      | Performance overhead |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Property decorator
function readonly(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    writable: false,
  });
}

class User {
  @readonly
  id: number;

  constructor(
    id: number,
    public name: string,
  ) {
    this.id = id;
  }
}

const user = new User(1, "Alice");
user.id = 2; // Error: Cannot assign to 'id' because it is read-only

// Ví dụ: Property decorator với formatting
function format(target: any, propertyKey: string) {
  let value: string;

  const getter = () => {
    return value.toUpperCase();
  };

  const setter = (newValue: string) => {
    value = newValue;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class Person {
  @format
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const person = new Person("alice");
console.log(person.name); // "ALICE"

// Ví dụ: Property decorator với validation
function validateEmail(target: any, propertyKey: string) {
  let value: string;

  const getter = () => value;

  const setter = (newValue: string) => {
    if (!newValue.includes("@")) {
      throw new Error("Invalid email format");
    }
    value = newValue;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class Contact {
  @validateEmail
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

const contact = new Contact("alice@example.com"); // OK
// const contact2 = new Contact("invalid"); // Error: Invalid email format

// Ví dụ thực tế: Required decorator
function required(target: any, propertyKey: string) {
  const requiredFields = Reflect.getMetadata("requiredFields", target) || [];
  requiredFields.push(propertyKey);
  Reflect.defineMetadata("requiredFields", requiredFields, target);
}

class UserForm {
  @required
  username: string;

  @required
  email: string;

  @required
  password: string;
}

// Ví dụ thực tế: MaxLength decorator
function maxLength(max: number) {
  return function (target: any, propertyKey: string) {
    let value: string;

    const getter = () => value;

    const setter = (newValue: string) => {
      if (newValue.length > max) {
        throw new Error(`Maximum length is ${max}`);
      }
      value = newValue;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

class UserProfile {
  @maxLength(50)
  username: string;

  @maxLength(255)
  bio: string;
}
```

### Best Practices:

```typescript
// ✅ Dùng property decorators cho validation
@required
@maxLength(50)
username: string;

// ✅ Dùng property decorators cho formatting
@uppercase
name: string;

// ✅ Dùng property decorators cho read-only
@readonly
id: number;

// ❌ Không nên dùng property decorators cho business logic
@businessLogic
data: string;

// ✅ Nên dùng property decorators cho infrastructure concerns
@required
@email
email: string;
```

---

## Parameter decorators?

**Parameter decorators** - Decorators được apply đến function parameters.

### Mục đích / Purpose

Modify parameter behavior hoặc thêm metadata cho parameter.

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng                    |
| ---------------------- | ------------------------------- |
| - Validation           | Khi validate parameter values   |
| - Dependency injection | Khi inject dependencies         |
| - Logging              | Khi log parameter values        |
| - Metadata             | Khi thêm metadata cho parameter |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Modify Behavior**: Modify parameter behavior
- **Add Metadata**: Thêm metadata cho parameter
- **Validation**: Validate parameter values
- **Dependency Injection**: Inject dependencies

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm           |
| ---------------------- | -------------------- |
| - Modify behavior      | Experimental feature |
| - Add metadata         | Cần flag             |
| - Validation           | Performance overhead |
| - Dependency injection | Complex              |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Parameter decorator
function required(target: any, propertyKey: string, parameterIndex: number) {
  console.log(
    `Parameter at index ${parameterIndex} of ${propertyKey} is required`,
  );
}

class Person {
  greet(@required name: string) {
    console.log(`Hello, ${name}!`);
  }
}

// Ví dụ: Parameter decorator với validation
function validateEmail(
  target: any,
  propertyKey: string,
  parameterIndex: number,
) {
  const existingRequiredParameters =
    Reflect.getMetadata("validateEmail", target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(
    "validateEmail",
    existingRequiredParameters,
    target,
    propertyKey,
  );
}

class UserService {
  createUser(@validateEmail email: string, name: string) {
    console.log(`Creating user: ${name} (${email})`);
  }
}

// Ví dụ: Parameter decorator với dependency injection
function inject(token: string) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    Reflect.defineMetadata(
      `inject_${parameterIndex}`,
      token,
      target,
      propertyKey,
    );
  };
}

class Database {
  constructor() {
    console.log("Database initialized");
  }
}

class UserService {
  constructor(@inject("database") private db: Database) {}

  getUsers() {
    return this.db.query("SELECT * FROM users");
  }
}

// Ví dụ thực tế: Required parameter decorator
function required(target: any, propertyKey: string, parameterIndex: number) {
  const requiredParameters =
    Reflect.getMetadata("required", target, propertyKey) || [];
  requiredParameters.push(parameterIndex);
  Reflect.defineMetadata("required", requiredParameters, target, propertyKey);
}

class ValidationService {
  validate(@required value: string, @required pattern: RegExp) {
    if (!value) {
      throw new Error("Value is required");
    }
    if (!pattern.test(value)) {
      throw new Error("Value does not match pattern");
    }
  }
}

// Ví dụ thực tế: Log parameter decorator
function log(target: any, propertyKey: string, parameterIndex: number) {
  const existingLogParameters =
    Reflect.getMetadata("log", target, propertyKey) || [];
  existingLogParameters.push(parameterIndex);
  Reflect.defineMetadata("log", existingLogParameters, target, propertyKey);
}

class Logger {
  log(@log message: string, level: string = "info") {
    console.log(`[${level.toUpperCase()}] ${message}`);
  }
}
```

### Best Practices:

```typescript
// ✅ Dùng parameter decorators cho validation
@required
@minLength(6)
password: string;

// ✅ Dùng parameter decorators cho dependency injection
constructor(@inject(Database) private db: Database) {}

// ✅ Dùng parameter decorators cho logging
@log
message: string;

// ❌ Không nên dùng parameter decorators cho business logic
@businessLogic
data: string;

// ✅ Nên dùng parameter decorators cho infrastructure concerns
@required
@email
email: string;
```

---

## Decorator factories?

**Decorator factories** - Functions trả về decorator functions, cho phép decorators nhận parameters.

### Mục đích / Purpose

Tạo decorators có thể nhận parameters.

### Khi nào dùng / When to Use

| Tình huống                | Khi nào dùng                                    |
| ------------------------- | ----------------------------------------------- |
| - Configurable decorators | Khi decorator cần parameters                    |
| - Reusable decorators     | Khi dùng decorator với different configs        |
| - Dynamic decorators      | Khi decorator behavior phụ thuộc vào parameters |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Configurable**: Decorators có thể nhận parameters
- **Reusable**: Dùng lại decorator với different configs
- **Dynamic**: Decorator behavior phụ thuộc vào parameters
- **Flexible**: Hỗ trợ nhiều use cases |

### Ưu nhược điểm / Pros & Cons

| Ưu điểm        | Nhược điểm           |
| -------------- | -------------------- |
| - Configurable | Experimental feature |
| - Reusable     | Cần flag             |
| - Dynamic      | Performance overhead |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Decorator factory
function log(prefix: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(`[${prefix}] Calling ${propertyKey}`);
      const result = originalMethod.apply(this, args);
      console.log(`[${prefix}] ${propertyKey} returned:`, result);
      return result;
    };
  };
}

class Calculator {
  @log("CALC")
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(1, 2); // Logs: [CALC] Calling add, [CALC] add returned: 3

// Ví dụ: Decorator factory với caching
function cache(ttl: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    const cache = new Map<string, { value: any; timestamp: number }>();

    descriptor.value = function (...args: any[]) {
      const key = JSON.stringify(args);
      const cached = cache.get(key);

      if (cached && Date.now() - cached.timestamp < ttl) {
        console.log(`Cache hit for ${propertyKey}`);
        return cached.value;
      }

      const result = originalMethod.apply(this, args);
      cache.set(key, { value: result, timestamp: Date.now() });
      return result;
    };
  };
}

class ApiService {
  @cache(60000) // 1 minute TTL
  async getUsers(): Promise<User[]> {
    const response = await fetch("/api/users");
    return response.json();
  }
}

// Ví dụ: Decorator factory với validation
function validate(schema: any) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const [data] = args;
      const { error } = schema.validate(data);

      if (error) {
        throw new Error(`Validation failed: ${error.message}`);
      }

      return originalMethod.apply(this, args);
    };
  };
}

class UserService {
  @validate(userCreateSchema)
  createUser(data: UserData) {
    console.log("Creating user:", data);
  }

  @validate(userUpdateSchema)
  updateUser(id: number, data: UpdateUserData) {
    console.log("Updating user:", id, data);
  }
}

// Ví dụ thực tế: Debounce decorator factory
function debounce(delay: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    let timeout: NodeJS.Timeout;

    descriptor.value = function (...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        originalMethod.apply(this, args);
      }, delay);
    };
  };
}

class SearchService {
  @debounce(300)
  search(query: string) {
    console.log("Searching:", query);
  }
}

// Ví dụ thực tế: Throttle decorator factory
function throttle(interval: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    let lastCall = 0;

    descriptor.value = function (...args: any[]) {
      const now = Date.now();

      if (now - lastCall >= interval) {
        lastCall = now;
        return originalMethod.apply(this, args);
      }
    };
  };
}

class ScrollService {
  @throttle(100)
  handleScroll(event: Event) {
    console.log("Scrolling:", event);
  }
}
```

### Best Practices:

```typescript
// ✅ Dùng decorator factories cho configurable decorators
@log("API")
async function getData() {
  // ...
}

// ✅ Dùng decorator factories cho validation
@validate(userSchema)
function createUser(data: UserData) {
  // ...
}

// ✅ Dùng decorator factories cho debouncing/throttling
@debounce(300)
function handleInput() {
  // ...
}

// ❌ Không nên dùng decorator factories cho business logic
@businessLogic(config)
function processData(data: Data) {
  // ...
}

// ✅ Nên dùng decorator factories cho infrastructure concerns
@cache(60000)
@log("API")
async function fetchData() {
  // ...
}
```

---

## Decorator metadata?

**Decorator metadata** - Thêm metadata vào classes và members sử dụng `reflect-metadata`.

### Mục đích / Purpose

Thêm metadata vào classes và members để sử dụng sau này.

### Khi nào dùng / When to Use

| Tình huống              | Khi nào dùng                 |
| ----------------------- | ---------------------------- |
| - Framework integration | Khi integrate với frameworks |
| - Dependency injection  | Khi implement DI containers  |
| - Validation            | Khi implement validation     |
| - Documentation         | Khi thêm documentation       |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Add Metadata**: Thêm metadata cho classes/members
- **Framework Integration**: Integrate với frameworks
- **Dependency Injection**: Implement DI containers
- **Validation**: Implement validation

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                 | Nhược điểm             |
| ----------------------- | ---------------------- |
| - Add metadata          | Cần `reflect-metadata` |
| - Framework integration | Experimental feature   |
| - Dependency injection  | Performance overhead   |
| - Validation            | Debugging khó          |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Decorator metadata
import "reflect-metadata";

const ComponentMetadataKey = Symbol("Component");

function Component(options: { selector: string }) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    Reflect.defineMetadata(ComponentMetadataKey, options, constructor);
    return constructor;
  };
}

@Component({ selector: "app-user" })
class UserComponent {
  constructor() {
    console.log("UserComponent created");
  }
}

// Lấy metadata
const metadata = Reflect.getMetadata(ComponentMetadataKey, UserComponent);
console.log(metadata); // { selector: "app-user" }

// Ví dụ: Method metadata
const LogMetadataKey = Symbol("Log");

function log(options: { level: string }) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    Reflect.defineMetadata(LogMetadataKey, options, target, propertyKey);
  };
}

class ApiService {
  @log({ level: "info" })
  async getUsers() {
    const response = await fetch("/api/users");
    return response.json();
  }
}

// Lấy metadata
const logMetadata = Reflect.getMetadata(
  LogMetadataKey,
  ApiService.prototype,
  "getUsers",
);
console.log(logMetadata); // { level: "info" }

// Ví dụ thực tế: Dependency injection với metadata
const InjectMetadataKey = Symbol("Inject");

function inject(token: string) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    const existingInjects =
      Reflect.getMetadata(InjectMetadataKey, target, propertyKey) || [];
    existingInjects.push({ index: parameterIndex, token });
    Reflect.defineMetadata(
      InjectMetadataKey,
      existingInjects,
      target,
      propertyKey,
    );
  };
}

class Database {
  constructor() {
    console.log("Database initialized");
  }
}

class UserService {
  constructor(@inject("database") private db: Database) {}

  getUsers() {
    return this.db.query("SELECT * FROM users");
  }
}

// Ví dụ thực tế: Validation metadata
const ValidateMetadataKey = Symbol("Validate");

function validate(schema: any) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    Reflect.defineMetadata(ValidateMetadataKey, schema, target, propertyKey);
  };
}

class UserForm {
  @validate(userSchema)
  username: string;

  @validate(emailSchema)
  email: string;
}

// Lấy validation metadata
const usernameSchema = Reflect.getMetadata(
  ValidateMetadataKey,
  UserForm.prototype,
  "username",
);
const emailSchema = Reflect.getMetadata(
  ValidateMetadataKey,
  UserForm.prototype,
  "email",
);
```

### Best Practices:

```typescript
// ✅ Dùng decorator metadata cho framework integration
@Component({ selector: "app-user" })
class UserComponent {}

// ✅ Dùng decorator metadata cho dependency injection
@Injectable()
class UserService {}

// ✅ Dùng decorator metadata cho validation
@validate(userSchema)
username: string;

// ❌ Không nên dùng decorator metadata cho business logic
@businessLogic(config)
data: string;

// ✅ Nên dùng decorator metadata cho infrastructure concerns
@route("/api/users")
@authenticate
async function getUsers() {
  // ...
}
```

---

## `experimentalDecorators`?

**`experimentalDecorators`** - Compiler flag cần thiết để sử dụng decorators trong TypeScript.

### Mục đích / Purpose

Enable decorators support trong TypeScript.

### Khi nào dùng / When to Use

| Tình huống   | Khi nào dùng                      |
| ------------ | --------------------------------- |
| - Decorators | Khi dùng decorators               |
| - Angular    | Khi dùng Angular                  |
| - NestJS     | Khi dùng NestJS                   |
| - Frameworks | Khi dùng frameworks có decorators |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Enable Decorators**: Enable decorators support
- **Framework Support**: Hỗ trợ các frameworks
- **AOP**: Hỗ trợ AOP patterns
- **Metadata**: Hỗ trợ decorator metadata

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm           |
| ------------------- | -------------------- |
| - Enable decorators | Experimental feature |
| - Framework support | Không phải là chuẩn  |
| - AOP support       | Performance overhead |

### Ví dụ:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}

// Ví dụ: Dùng decorators với experimentalDecorators
function log(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey}`);
    return originalMethod.apply(this, args);
  };
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

// Ví dụ: Angular với decorators
import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-user",
  template: "<div>{{ name }}</div>",
})
export class UserComponent {
  @Input() name: string;
  @Output() nameChange = new EventEmitter<string>();
}

// Ví dụ: NestJS với decorators
import { Controller, Get, Post, Body } from "@nestjs/common";

@Controller("users")
export class UsersController {
  @Get()
  findAll() {
    return "This action returns all users";
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }
}
```

### Best Practices:

```typescript
// ✅ Enable experimentalDecorators trong tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}

// ✅ Dùng decorators với frameworks
@Component({ selector: "app-user" })
class UserComponent {}

// ✅ Dùng decorators cho AOP patterns
@log
@cache
async function getData() {
  // ...
}

// ❌ Không nên dùng decorators khi không cần
// ✅ Nên dùng regular functions/methods khi không cần decorators
function processData(data: Data) {
  // ...
}
```

---

## Tổng kết

### Bảng so sánh Decorator Types

| Decorator Type | Target              | Parameters                              | Use Case                     |
| -------------- | ------------------- | --------------------------------------- | ---------------------------- |
| Class          | Constructor         | `(constructor: Function)`               | Modify class, add metadata   |
| Method         | Method descriptor   | `(target, propertyKey, descriptor)`     | Logging, caching, validation |
| Property       | Property descriptor | `(target, propertyKey)`                 | Validation, formatting       |
| Parameter      | Parameter index     | `(target, propertyKey, parameterIndex)` | DI, validation               |

### Khi nào nên dùng Decorators

| Tình huống             | Nên dùng             |
| ---------------------- | -------------------- |
| Framework integration  | ✅ Decorators        |
| AOP patterns           | ✅ Decorators        |
| Cross-cutting concerns | ✅ Decorators        |
| Legacy code            | ❌ Regular functions |
| Simple business logic  | ❌ Regular functions |

### Best Practices chung cho Decorators

1. **Dùng cho cross-cutting concerns**: Logging, validation, caching
2. **Decorator factories cho configurable decorators**: Dùng factories khi cần parameters
3. **Metadata cho framework integration**: Dùng metadata với frameworks
4. **Enable experimentalDecorators**: Enable flag trong tsconfig.json
5. **Tránh business logic**: Không dùng decorators cho business logic

### Anti-patterns cần tránh

```typescript
// ❌ Dùng decorators cho business logic
@businessLogic
function processData(data: Data) {
  // ...
}

// ✅ Nên dùng decorators cho infrastructure concerns
@log
@validate
function saveData(data: Data) {
  // ...
}

// ❌ Quên enable experimentalDecorators
// tsconfig.json
{
  "compilerOptions": {
    // "experimentalDecorators": true // ❌ Quên enable
  }
}

// ✅ Nên enable experimentalDecorators
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

---

## Tài liệu tham khảo / References

- [TypeScript Handbook - Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [TypeScript Handbook - Decorator Metadata](https://www.typescriptlang.org/docs/handbook/decorators.html#metadata)
- [TC39 - Decorators Proposal](https://github.com/tc39/proposal-decorators)
- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)

---

_Last updated: 2026-01-30_
