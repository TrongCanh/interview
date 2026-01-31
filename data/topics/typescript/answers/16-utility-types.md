# 16. Utility Types

## Tổng quan về Utility Types

### Mục đích của Utility Types / Purpose

**Utility Types** là các built-in types trong TypeScript giúp transform và manipulate types một cách dễ dàng, tránh việc phải viết lại các type definitions phức tạp.

**Mục đích chính:**

- Transform types một cách declarative
- Reuse type logic
- Tránh code duplication
- Tạo derived types từ base types

### Khi nào cần hiểu về Utility Types / When to Use

Hiểu về Utility Types là cần thiết khi:

- Làm việc với forms và partial updates
- Xử lý API responses và requests
- Tạo immutable data structures
- Implement generic patterns
- Xử lý configuration objects

### Giúp ích gì / Benefits

**Lợi ích:**

- **Less Code**: Không cần viết manual type transformations
- **Type Safety**: TypeScript đảm bảo correctness
- **Reusability**: Dùng lại trong nhiều contexts
- **Maintainability**: Dễ maintain khi base types thay đổi

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                       | Nhược điểm                                      |
| ----------------------------- | ----------------------------------------------- |
| - Built-in, không cần cài đặt | Có thể phức tạp khi combine nhiều utility types |
| - Type-safe                   | Learning curve                                  |
| - Reusable                    | Một số utilities có giới hạn                    |
| - Well-documented             | Performance impact nhỏ khi compile              |

---

## `Partial<T>`?

**`Partial<T>`** - Utility type làm cho tất cả properties của type `T` thành optional.

### Mục đích / Purpose

Tạo một type mới với tất cả properties của `T` đều là optional, hữu ích cho partial updates.

### Khi nào dùng / When to Use

| Tình huống      | Khi nào dùng                     |
| --------------- | -------------------------------- |
| Partial updates | Khi update chỉ một số properties |
| Form inputs     | Khi form có optional fields      |
| API requests    | Khi gửi partial data             |
| Configuration   | Khi config có optional values    |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Partial Updates**: Update chỉ một số properties
- **Form Handling**: Dễ xử lý forms với optional fields
- **API Requests**: Gửi partial data
- **Type Safety**: TypeScript vẫn kiểm tra types

### Ưu nhược điểm / Pros & Cons

| Ưu điểm     | Nhược điểm                                    |
| ----------- | --------------------------------------------- |
| - Dễ dùng   | Không recursive với nested objects            |
| - Type-safe | Cần combine với các utilities khác cho nested |
| - Built-in  | Không validate required fields                |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Partial với object
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type PartialUser = Partial<User>;
// Tương đương với:
// interface PartialUser {
//   id?: number;
//   name?: string;
//   email?: string;
//   age?: number;
// }

function updateUser(id: number, updates: Partial<User>): User {
  // ... update logic
  return { id, ...updates } as User;
}

// Ví dụ thực tế: Update user
const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 30,
};

const updatedUser = updateUser(1, { age: 31, email: "new@example.com" });
// ✅ Chỉ update age và email

// Ví dụ: Form handling
interface UserForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function validateForm(formData: Partial<UserForm>): boolean {
  // Validate chỉ các fields được submit
  return formData.email !== undefined && formData.email.includes("@");
}

// Ví dụ: API request
interface CreateProductRequest {
  name: string;
  price: number;
  description: string;
  category: string;
}

function createProduct(data: Partial<CreateProductRequest>): Promise<Product> {
  // Gửi partial data
  return fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

// Ví dụ: Nested Partial (cần custom utility)
interface Config {
  database: {
    host: string;
    port: number;
    credentials: {
      username: string;
      password: string;
    };
  };
  api: {
    baseUrl: string;
    timeout: number;
  };
}

// Partial chỉ làm shallow optional
type PartialConfig = Partial<Config>;
// database?, api? là optional
// nhưng database.host vẫn required

// DeepPartial utility cho nested objects
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DeepPartialConfig = DeepPartial<Config>;
// Tất cả properties ở mọi level đều optional
```

### Best Practices:

```typescript
// ✅ Dùng Partial cho partial updates
function updateEntity<T extends { id: number }>(
  id: number,
  updates: Partial<T>,
): T {
  return { id, ...updates } as T;
}

// ✅ Dùng Partial cho form handling
function handleFormSubmit(formData: Partial<FormValues>) {
  // Validate và submit
}

// ✅ Kết hợp Partial với Required
function makeAllRequired<T>(obj: Partial<T>): Required<T> {
  // Validate và return complete object
  return obj as Required<T>;
}

// ❌ Không nên dùng Partial khi cần validation
function badUpdate(id: number, updates: Partial<User>) {
  // ❌ Không validate required fields
  return { id, ...updates };
}

// ✅ Nên validate trước khi dùng
function goodUpdate(id: number, updates: Partial<User>): User {
  const user = getUser(id);
  const validated = validateUpdates(updates);
  return { ...user, ...validated };
}

// ✅ Dùng DeepPartial cho nested objects
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

function updateConfig(updates: DeepPartial<Config>): Config {
  // Merge updates với config hiện tại
}

// ✅ Dùng Partial với generics
function patch<T>(entity: T, updates: Partial<T>): T {
  return { ...entity, ...updates };
}

const user = { id: 1, name: "Alice", email: "alice@example.com" };
const patched = patch(user, { name: "Bob" }); // ✅
```

---

## `Required<T>`?

**`Required<T>`** - Utility type làm cho tất cả properties của type `T` thành required (bỏ đi optional).

### Mục đích / Purpose

Tạo một type mới với tất cả properties của `T` đều là required, opposite của `Partial`.

### Khi nào dùng / When to Use

| Tình huống       | Khi nào dùng                    |
| ---------------- | ------------------------------- |
| Validation       | Khi cần validate tất cả fields  |
| API responses    | Khi response phải đầy đủ        |
| Configuration    | Khi config phải hoàn chỉnh      |
| Type constraints | Khi cần enforce required fields |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Enforce Completeness**: Đảm bảo tất cả fields có giá trị
- **Type Safety**: TypeScript báo lỗi nếu thiếu fields
- **Validation Helper**: Dùng cho runtime validation
- **Opposite of Partial**: Reverse Partial transformation

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm                                    |
| ---------------------- | --------------------------------------------- |
| - Enforce completeness | Không recursive với nested objects            |
| - Type-safe            | Cần combine với các utilities khác cho nested |
| - Built-in             | Runtime validation vẫn cần                    |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Required với object
interface User {
  id: number;
  name?: string;
  email?: string;
  age?: number;
}

type RequiredUser = Required<User>;
// Tương đương với:
// interface RequiredUser {
//   id: number;
//   name: string;
//   email: string;
//   age: number;
// }

function createUser(data: Required<User>): User {
  // Tất cả fields phải có giá trị
  return data;
}

// ✅ OK
createUser({
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 30,
});

// ❌ Error: Property 'name' is missing
// createUser({
//   id: 1,
//   email: "alice@example.com",
// });

// Ví dụ thực tế: Validation
interface FormData {
  username?: string;
  email?: string;
  password?: string;
}

function validateForm(formData: FormData): Required<FormData> | null {
  if (!formData.username || !formData.email || !formData.password) {
    return null;
  }
  return formData as Required<FormData>;
}

// Ví dụ: API response
interface ApiResponse {
  data?: unknown;
  error?: string;
  status?: number;
}

function handleResponse(response: ApiResponse) {
  if (response.status === 200 && response.data) {
    const requiredResponse = response as Required<
      Pick<ApiResponse, "data" | "status">
    >;
    console.log(requiredResponse.data);
  }
}

// Ví dụ: Configuration
interface AppConfig {
  apiUrl?: string;
  timeout?: number;
  retries?: number;
}

function loadConfig(): Required<AppConfig> {
  const config: AppConfig = {
    apiUrl: process.env.API_URL,
    timeout: Number(process.env.TIMEOUT),
    retries: Number(process.env.RETRIES),
  };

  return {
    apiUrl: config.apiUrl ?? "https://default.api.com",
    timeout: config.timeout ?? 5000,
    retries: config.retries ?? 3,
  };
}

// Ví dụ: Kết hợp với Partial
function makeRequired<T>(obj: Partial<T>): Required<T> {
  // Validate và return complete object
  const result = {} as Required<T>;
  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = obj[key]!;
    }
  }
  return result;
}
```

### Best Practices:

```typescript
// ✅ Dùng Required cho validation
function validateUser(data: Partial<User>): Required<User> | null {
  if (!data.id || !data.name) {
    return null;
  }
  return data as Required<User>;
}

// ✅ Dùng Required cho default values
function withDefaults<T extends object>(
  obj: Partial<T>,
  defaults: Required<T>,
): Required<T> {
  return { ...defaults, ...obj };
}

// ✅ Dùng Required với Pick
type RequiredFields = Required<Pick<User, "id" | "name">>;
// Chỉ id và name là required

// ❌ Không nên dùng Required khi không validate
function badCreate(data: Partial<User>): User {
  return data as Required<User>; // ❌ Không validate
}

// ✅ Nên validate trước khi cast
function goodCreate(data: Partial<User>): User {
  const required = validateUser(data);
  if (!required) {
    throw new Error("Invalid user data");
  }
  return required;
}

// ✅ Dùng Required với generics
function ensureComplete<T>(
  obj: Partial<T>,
  defaults: Required<T>,
): Required<T> {
  return { ...defaults, ...obj };
}

// ✅ Dùng RequiredDeep cho nested objects
type RequiredDeep<T> = {
  [P in keyof T]-?: T[P] extends object ? RequiredDeep<T[P]> : T[P];
};

interface Config {
  database?: {
    host?: string;
    port?: number;
  };
}

type RequiredConfig = RequiredDeep<Config>;
// Tất cả properties ở mọi level đều required
```

---

## `Readonly<T>`?

**`Readonly<T>`** - Utility type làm cho tất cả properties của type `T` thành readonly.

### Mục đích / Purpose

Tạo một type mới với tất cả properties của `T` đều là readonly, không thể reassign.

### Khi nào dùng / When to Use

| Tình huống     | Khi nào dùng                  |
| -------------- | ----------------------------- |
| Immutable data | Khi cần immutable objects     |
| Constants      | Khi định nghĩa constants      |
| Props          | Khi props không nên mutate    |
| Configuration  | Khi config không nên thay đổi |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Immutability**: Ngăn chặn accidental mutations
- **Type Safety**: TypeScript báo lỗi khi reassign
- **Functional Programming**: Hỗ trợ functional patterns
- **Predictability**: Code dễ predict hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm              | Nhược điểm                                       |
| -------------------- | ------------------------------------------------ |
| - Prevent mutations  | Không runtime enforcement                        |
| - Type-safe          | Shallow readonly (nested objects có thể mutate)  |
| - Built-in           | Cần combine với utilities khác cho deep readonly |
| - Good for constants | Có thể verbose                                   |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Readonly với object
interface User {
  id: number;
  name: string;
  email: string;
}

type ReadonlyUser = Readonly<User>;
// Tương đương với:
// interface ReadonlyUser {
//   readonly id: number;
//   readonly name: string;
//   readonly email: string;
// }

const user: Readonly<User> = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

// ✅ OK - Đọc properties
console.log(user.name);

// ❌ Error: Cannot assign to 'name' because it is a read-only property
// user.name = "Bob";

// Ví dụ thực tế: Constants
const CONFIG: Readonly<{
  apiUrl: string;
  timeout: number;
  retries: number;
}> = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
};

// ❌ Error: Cannot assign to 'apiUrl'
// CONFIG.apiUrl = "https://new.api.com";

// Ví dụ: Props trong React
interface ComponentProps {
  title: string;
  count: number;
}

function Component(props: Readonly<ComponentProps>) {
  // Props không thể mutate
  return <div>{props.title}: {props.count}</div>;
}

// Ví dụ: Array readonly
const numbers: Readonly<number[]> = [1, 2, 3];

// ✅ OK - Đọc elements
console.log(numbers[0]);

// ❌ Error: Cannot assign to '0'
// numbers[0] = 4;

// ❌ Error: Property 'push' does not exist
// numbers.push(4);

// Ví dụ: Shallow vs Deep readonly
interface Config {
  database: {
    host: string;
    port: number;
  };
}

const config: Readonly<Config> = {
  database: {
    host: "localhost",
    port: 5432,
  },
};

// ❌ Error: Cannot assign to 'database'
// config.database = { host: "new", port: 3306 };

// ✅ Nhưng nested object vẫn có thể mutate
// config.database.host = "new"; // ❌ TypeScript không bắt được
// Cần dùng DeepReadonly utility

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type ReadonlyConfig = DeepReadonly<Config>;
// Tất cả properties ở mọi level đều readonly
```

### Best Practices:

```typescript
// ✅ Dùng Readonly cho constants
const CONSTANTS = {
  API_URL: "https://api.example.com",
  TIMEOUT: 5000,
} as const; // ✅ as const cũng làm readonly

// ✅ Dùng Readonly cho props
function Component(props: Readonly<Props>) {
  // Props không thể mutate
}

// ✅ Dùng Readonly cho return types
function getConfig(): Readonly<Config> {
  return {
    /* ... */
  };
}

// ✅ Dùng Readonly với ReadonlyArray
const items: ReadonlyArray<string> = ["a", "b", "c"];
// Hoặc
const items2: readonly string[] = ["a", "b", "c"];

// ❌ Không nên dùng Readonly khi cần mutability
function badUpdate(user: Readonly<User>) {
  user.name = "Bob"; // ❌ Error
}

// ✅ Nên tạo copy khi cần mutate
function goodUpdate(user: Readonly<User>): User {
  return { ...user, name: "Bob" };
}

// ✅ Dùng DeepReadonly cho nested objects
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

const config: DeepReadonly<Config> = {
  database: {
    host: "localhost",
    port: 5432,
  },
};

// ❌ Error: Cannot assign to 'host'
// config.database.host = "new";

// ✅ Dùng Readonly với generics
function freeze<T>(obj: T): Readonly<T> {
  return Object.freeze(obj);
}

const frozenUser = freeze({ id: 1, name: "Alice" });
// frozenUser.name = "Bob"; // ❌ TypeScript + runtime error
```

---

## `Record<K, T>`?

**`Record<K, T>`** - Utility type tạo một object type với keys là type `K` và values là type `T`.

### Mục đích / Purpose

Tạo một object type với keys từ union type `K` và values là type `T`.

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng              |
| ------------------- | ------------------------- |
| Dictionary          | Khi tạo dictionary/map    |
| Lookup tables       | Khi tạo lookup tables     |
| - Enum-like objects | Khi tạo enum-like objects |
| - Configuration     | Khi config với known keys |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type-safe Keys**: TypeScript kiểm tra keys
- **Type-safe Values**: TypeScript kiểm tra values
- **Flexible**: Keys có thể là string, number, symbol
- **Built-in**: Không cần custom type

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                    | Nhược điểm                               |
| -------------------------- | ---------------------------------------- |
| - Type-safe keys và values | Keys phải là string, number, hoặc symbol |
| - Flexible                 | Không hỗ trợ nested types trực tiếp      |
| - Built-in                 | Không validate runtime keys              |
| - Good for dictionaries    | Có thể verbose cho complex types         |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Record với string keys
type UserRoles = Record<string, string>;

const roles: UserRoles = {
  admin: "Administrator",
  user: "Regular User",
  guest: "Guest",
};

// Ví dụ: Record với union type keys
type Role = "admin" | "user" | "guest";

type RolePermissions = Record<Role, string[]>;

const permissions: RolePermissions = {
  admin: ["create", "read", "update", "delete"],
  user: ["read", "update"],
  guest: ["read"],
};

// ✅ TypeScript kiểm tra keys
console.log(permissions.admin); // ✅ OK
// console.log(permissions.superadmin); // ❌ Error: Property 'superadmin' does not exist

// Ví dụ thực tế: Lookup table
type StatusCode = 200 | 201 | 400 | 401 | 404 | 500;

type StatusMessages = Record<StatusCode, string>;

const statusMessages: StatusMessages = {
  200: "OK",
  201: "Created",
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not Found",
  500: "Internal Server Error",
};

function getStatusMessage(code: StatusCode): string {
  return statusMessages[code];
}

// Ví dụ: Configuration
type ConfigKey = "apiUrl" | "timeout" | "retries";

type Config = Record<ConfigKey, string | number>;

const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
};

// Ví dụ: Enum-like object
type Direction = "Up" | "Down" | "Left" | "Right";

type DirectionVector = Record<Direction, { x: number; y: number }>;

const vectors: DirectionVector = {
  Up: { x: 0, y: -1 },
  Down: { x: 0, y: 1 },
  Left: { x: -1, y: 0 },
  Right: { x: 1, y: 0 },
};

// Ví dụ: Generic Record
function createLookup<T, K extends string>(
  items: T[],
  keyFn: (item: T) => K,
): Record<K, T> {
  return items.reduce(
    (acc, item) => {
      acc[keyFn(item)] = item;
      return acc;
    },
    {} as Record<K, T>,
  );
}

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const userLookup = createLookup(users, (user) => `user_${user.id}`);
// Type: Record<"user_1" | "user_2", { id: number; name: string }>
```

### Best Practices:

```typescript
// ✅ Dùng Record cho dictionaries
type Dictionary<T> = Record<string, T>;

const userDict: Dictionary<User> = {
  user1: { id: 1, name: "Alice" },
  user2: { id: 2, name: "Bob" },
};

// ✅ Dùng Record với union type keys
type Theme = "light" | "dark" | "auto";

type ThemeConfig = Record<Theme, { colors: string[]; fonts: string[] }>;

const themes: ThemeConfig = {
  light: { colors: ["#fff", "#000"], fonts: ["Arial"] },
  dark: { colors: ["#000", "#fff"], fonts: ["Arial"] },
  auto: { colors: ["#fff", "#000"], fonts: ["Arial"] },
};

// ✅ Dùng Record cho lookup tables
type ErrorCode = "E001" | "E002" | "E003";

type ErrorMessages = Record<ErrorCode, string>;

const errorMessages: ErrorMessages = {
  E001: "Invalid input",
  E002: "Network error",
  E003: "Server error",
};

// ❌ Không nên dùng Record khi keys không known
// const badDict: Record<string, User> = {}; // ❌ Keys không type-safe

// ✅ Nên dùng specific keys khi có thể
type UserId = "user_1" | "user_2" | "user_3";
type UserMap = Record<UserId, User>;

// ✅ Dùng Record với generics
function groupBy<T, K extends string>(
  items: T[],
  keyFn: (item: T) => K,
): Record<K, T[]> {
  return items.reduce(
    (acc, item) => {
      const key = keyFn(item);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<K, T[]>,
  );
}

// ✅ Dùng Record với Partial
type PartialConfig = Partial<Record<ConfigKey, string | number>>;

const partialConfig: PartialConfig = {
  apiUrl: "https://api.example.com",
  // timeout và retries optional
};
```

---

## `Pick<T, K>`?

**`Pick<T, K>`** - Utility type chọn một số properties `K` từ type `T`.

### Mục đích / Purpose

Tạo một type mới chỉ bao gồm các properties được chọn từ type `T`.

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng                      |
| ---------------------- | --------------------------------- |
| - Subset of properties | Khi cần subset của properties     |
| - API responses        | Khi response chỉ có một số fields |
| - Form data            | Khi form chỉ cần một số fields    |
| - Type narrowing       | Khi narrow type                   |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Select Properties**: Chọn chỉ properties cần thiết
- **Type-safe**: TypeScript kiểm tra properties tồn tại
- **Reusability**: Dùng lại base type
- **Clean Types**: Tạo focused types

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                      | Nhược điểm                           |
| ---------------------------- | ------------------------------------ |
| - Select specific properties | Không recursive với nested objects   |
| - Type-safe                  | Cần list tất cả properties cần thiết |
| - Built-in                   | Có thể verbose cho nhiều properties  |
| - Reusable                   | Không support wildcards              |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Pick với object
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  address: string;
}

type UserBasicInfo = Pick<User, "id" | "name" | "email">;
// Tương đương với:
// interface UserBasicInfo {
//   id: number;
//   name: string;
//   email: string;
// }

function getUserBasicInfo(user: User): UserBasicInfo {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

// Ví dụ thực tế: API response
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

type ProductListItem = Pick<Product, "id" | "name" | "price">;

function getProductList(): ProductListItem[] {
  // API chỉ trả về id, name, price
  return [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
  ];
}

// Ví dụ: Form data
interface UserForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

type LoginForm = Pick<UserForm, "username" | "password">;

function login(data: LoginForm): void {
  // Xử lý login với username và password
}

// Ví dụ: Kết hợp với generics
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    result[key] = obj[key];
  });
  return result;
}

const user = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 30,
};

const basicInfo = pick(user, ["id", "name"]);
// Type: Pick<{ id: number; name: string; email: string; age: number; }, "id" | "name">

// Ví dụ: Nested Pick (cần custom utility)
interface Config {
  database: {
    host: string;
    port: number;
    credentials: {
      username: string;
      password: string;
    };
  };
  api: {
    baseUrl: string;
    timeout: number;
  };
}

type DatabaseConfig = Pick<Config, "database">;
// { database: { host: string; port: number; credentials: {...} } }
```

### Best Practices:

```typescript
// ✅ Dùng Pick để subset properties
type PublicUser = Pick<User, "id" | "name">;
type PrivateUser = Pick<User, "id" | "email">;

// ✅ Dùng Pick cho API responses
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

type ProductSummary = Pick<Product, "id" | "name" | "price">;
type ProductDetail = Pick<Product, "id" | "name" | "description" | "price">;

// ✅ Kết hợp Pick với Partial
type PartialUpdate<T, K extends keyof T> = Partial<Pick<T, K>>;

function updateUser(
  id: number,
  updates: PartialUpdate<User, "name" | "email">,
) {
  // Chỉ update name hoặc email
}

// ✅ Dùng Pick với generics
function selectFields<T, K extends keyof T>(obj: T, fields: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  fields.forEach((field) => {
    result[field] = obj[field];
  });
  return result;
}

// ❌ Không nên dùng Pick khi cần nhiều properties
type BadSubset = Pick<User, "id" | "name" | "email" | "age" | "address">;
// ❌ Quasi giống với User

// ✅ Nên dùng Omit khi cần loại bỏ ít properties
type GoodSubset = Omit<User, "createdAt" | "updatedAt">;

// ✅ Dùng Pick với keyof
type AllKeys = Pick<User, keyof User>;
// Tương đương với User

// ✅ Dùng Pick với conditional types
type StringKeys<T> = Pick<
  T,
  { [K in keyof T]: T[K] extends string ? K : never }[keyof T]
>;

type UserStrings = StringKeys<User>;
// { name: string; email: string; address: string }
```

---

## `Omit<T, K>`?

**`Omit<T, K>`** - Utility type loại bỏ một số properties `K` từ type `T`.

### Mục đích / Purpose

Tạo một type mới không bao gồm các properties được loại bỏ từ type `T`.

### Khi nào dùng / When to Use

| Tình huống           | Khi nào dùng                            |
| -------------------- | --------------------------------------- |
| - Exclude properties | Khi cần loại bỏ một số properties       |
| - API requests       | Khi request không nên gửi một số fields |
| - Sensitive data     | Khi loại bỏ sensitive fields            |
| - Clean types        | Khi tạo clean types                     |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Exclude Properties**: Loại bỏ properties không cần thiết
- **Type-safe**: TypeScript kiểm tra properties tồn tại
- **Cleaner Types**: Tạo types sạch hơn
- **Security**: Loại bỏ sensitive data

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                       | Nhược điểm                             |
| ----------------------------- | -------------------------------------- |
| - Exclude specific properties | Không recursive với nested objects     |
| - Type-safe                   | Cần list tất cả properties cần loại bỏ |
| - Built-in                    | Có thể verbose cho nhiều properties    |
| - Good for security           | Không support wildcards                |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Omit với object
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

type PublicUser = Omit<User, "password" | "createdAt" | "updatedAt">;
// Tương đương với:
// interface PublicUser {
//   id: number;
//   name: string;
//   email: string;
// }

function getPublicUser(user: User): PublicUser {
  const { password, createdAt, updatedAt, ...publicUser } = user;
  return publicUser;
}

// Ví dụ thực tế: API request
interface CreateProductRequest {
  id?: number; // Không nên gửi id khi tạo
  name: string;
  description: string;
  price: number;
  createdAt?: Date; // Không nên gửi createdAt
  updatedAt?: Date; // Không nên gửi updatedAt
}

type CreateProductDto = Omit<
  CreateProductRequest,
  "id" | "createdAt" | "updatedAt"
>;

function createProduct(data: CreateProductDto): Promise<Product> {
  return fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

// Ví dụ: Form data
interface UserForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type LoginData = Omit<UserForm, "confirmPassword">;

function login(data: LoginData): void {
  // Xử lý login
}

// Ví dụ: Kết hợp với Partial
type UpdateUserDto = Partial<Omit<User, "id" | "password">>;

function updateUser(id: number, updates: UpdateUserDto): User {
  // Update user với optional fields (trừ id và password)
  return { id, ...updates } as User;
}

// Ví dụ: Nested Omit (cần custom utility)
interface Config {
  database: {
    host: string;
    port: number;
    credentials: {
      username: string;
      password: string;
    };
  };
  api: {
    baseUrl: string;
    timeout: number;
  };
}

type ConfigWithoutCredentials = Omit<Config, "database">;
// { api: { baseUrl: string; timeout: number } }
```

### Best Practices:

```typescript
// ✅ Dùng Omit để loại bỏ sensitive data
type PublicUser = Omit<User, "password" | "token">;
type AdminUser = Omit<User, "password">;

// ✅ Dùng Omit cho API requests
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

type CreateProductDto = Omit<Product, "id" | "createdAt" | "updatedAt">;
type UpdateProductDto = Partial<
  Omit<Product, "id" | "createdAt" | "updatedAt">
>;

// ✅ Kết hợp Omit với Pick
type UserSummary = Omit<User, "password" | "email">;

// ✅ Dùng Omit với generics
function excludeFields<T, K extends keyof T>(obj: T, fields: K[]): Omit<T, K> {
  const result = { ...obj };
  fields.forEach((field) => {
    delete result[field];
  });
  return result as Omit<T, K>;
}

const user = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  password: "secret",
};

const publicUser = excludeFields(user, ["password", "email"]);
// Type: Omit<User, "password" | "email">

// ❌ Không nên dùng Omit khi cần loại bỏ nhiều properties
type BadSubset = Omit<
  User,
  "password" | "token" | "createdAt" | "updatedAt" | "deletedAt"
>;
// ❌ Dùng Pick thay thế

// ✅ Nên dùng Pick khi cần ít properties
type GoodSubset = Pick<User, "id" | "name" | "email">;

// ✅ Dùng Omit với conditional types
type NonStringKeys<T> = Omit<
  T,
  { [K in keyof T]: T[K] extends string ? K : never }[keyof T]
>;

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type UserNonStrings = NonStringKeys<User>;
// { id: number; age: number }

// ✅ Dùng Omit để tạo variant types
type UserWithoutId = Omit<User, "id">;
type UserWithoutSensitive = Omit<User, "password" | "token">;
```

---

## `Exclude<T, U>`?

**`Exclude<T, U>`** - Utility type loại bỏ các types trong `U` từ union type `T`.

### Mục đích / Purpose

Tạo một type mới từ union type `T` bằng cách loại bỏ các types trong `U`.

### Khi nào dùng / When to Use

| Tình huống              | Khi nào dùng                   |
| ----------------------- | ------------------------------ |
| - Filter union types    | Khi cần filter union types     |
| - Remove specific types | Khi cần loại bỏ specific types |
| - Conditional types     | Khi dùng với conditional types |
| - Type constraints      | Khi cần type constraints       |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Filter Union Types**: Loại bỏ types từ union
- **Type-safe**: TypeScript kiểm tra types
- **Built-in**: Không cần custom implementation
- **Flexible**: Dùng với nhiều type patterns

### Ưu nhược điểm / Pros & Cons

| Ưu điểm              | Nhược điểm                        |
| -------------------- | --------------------------------- |
| - Filter union types | Chỉ hoạt động với union types     |
| - Type-safe          | Không recursive                   |
| - Built-in           | Có thể phức tạp với complex types |
| - Flexible           | Learning curve                    |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Exclude với union types
type Primitive = string | number | boolean | null | undefined;

type NonNullablePrimitive = Exclude<Primitive, null | undefined>;
// Tương đương với: string | number | boolean

function processPrimitive(value: NonNullablePrimitive) {
  // Value không thể là null hoặc undefined
}

// Ví dụ thực tế: Event types
type Event = MouseEvent | KeyboardEvent | TouchEvent;

type MouseEventOnly = Exclude<Event, KeyboardEvent | TouchEvent>;
// Tương đương với: MouseEvent

function handleMouseEvent(event: MouseEventOnly) {
  console.log(`Mouse at (${event.clientX}, ${event.clientY})`);
}

// Ví dụ: Filter string types
type AllTypes = string | number | boolean | string[] | number[];

type NonStringTypes = Exclude<AllTypes, string | string[]>;
// Tương đương với: number | boolean | number[]

// Ví dụ: Kết hợp với conditional types
type NonFunctionProperties<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionObject<T> = Pick<T, NonFunctionProperties<T>>;

interface User {
  id: number;
  name: string;
  email: string;
  greet(): void;
}

type UserData = NonFunctionObject<User>;
// { id: number; name: string; email: string }

// Ví dụ: Exclude với literal types
type Direction = "up" | "down" | "left" | "right";

type HorizontalDirection = Exclude<Direction, "up" | "down">;
// Tương đương với: "left" | "right"

function moveHorizontal(direction: HorizontalDirection) {
  console.log(`Moving ${direction}`);
}

// Ví dụ: Exclude với generics
function filterType<T, U>(value: T): value is Exclude<T, U> {
  // Type guard implementation
  return true;
}

// Ví dụ: Exclude với keyof
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

type NonDateKeys = Exclude<keyof User, "createdAt">;
// "id" | "name" | "email"
```

### Best Practices:

```typescript
// ✅ Dùng Exclude để filter union types
type NonNullable<T> = Exclude<T, null | undefined>;

// ✅ Dùng Exclude cho event handling
type MouseEvent = Exclude<Event, KeyboardEvent | TouchEvent>;

// ✅ Dùng Exclude với literal types
type Status = "pending" | "success" | "error" | "loading";

type FinalStatus = Exclude<Status, "pending" | "loading">;
// "success" | "error"

// ✅ Kết hợp Exclude với Extract
type StringOrNumber = string | number | boolean;
type OnlyStrings = Extract<StringOrNumber, string>;
type NotStrings = Exclude<StringOrNumber, string>;

// ✅ Dùng Exclude với conditional types
type NonNullableKeys<T> = {
  [K in keyof T]: null extends T[K] ? never : K;
}[keyof T];

type NullableKeys<T> = {
  [K in keyof T]: null extends T[K] ? K : never;
}[keyof T];

// ✅ Dùng Exclude với keyof
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type PublicUserKeys = Exclude<keyof User, "password">;
// "id" | "name" | "email"

// ❌ Không nên dùng Exclude với non-union types
type BadExample = Exclude<string, number>;
// string (vì number không trong string)

// ✅ Nên dùng Exclude với union types
type GoodExample = Exclude<string | number, number>;
// string

// ✅ Dùng Exclude để tạo variant types
type NonErrorResult<T> = Exclude<Result<T>, Error>;
type SuccessResult<T> = Exclude<Result<T>, { error: string }>;
```

---

## `Extract<T, U>`?

**`Extract<T, U>`** - Utility type chỉ giữ lại các types trong `T` mà có thể assign cho `U`.

### Mục đích / Purpose

Tạo một type mới từ union type `T` bằng cách chỉ giữ lại các types compatible với `U`.

### Khi nào dùng / When to Use

| Tình huống               | Khi nào dùng                   |
| ------------------------ | ------------------------------ |
| - Extract specific types | Khi cần extract specific types |
| - Filter union types     | Khi filter union types         |
| - Type constraints       | Khi cần type constraints       |
| - Conditional types      | Khi dùng với conditional types |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Extract Types**: Chỉ giữ lại types cần thiết
- **Type-safe**: TypeScript kiểm tra types
- **Built-in**: Không cần custom implementation
- **Flexible**: Dùng với nhiều type patterns |

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                  | Nhược điểm                        |
| ------------------------ | --------------------------------- |
| - Extract specific types | Chỉ hoạt động với union types     |
| - Type-safe              | Không recursive                   |
| - Built-in               | Có thể phức tạp với complex types |
| - Flexible               | Learning curve                    |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Extract với union types
type AllTypes = string | number | boolean | string[] | number[];

type StringTypes = Extract<AllTypes, string | string[]>;
// Tương đương với: string | string[]

function processStringType(value: StringTypes) {
  // Value là string hoặc string[]
}

// Ví dụ thực tế: Event types
type Event = MouseEvent | KeyboardEvent | TouchEvent;

type PointerEvent = Extract<Event, MouseEvent | TouchEvent>;
// Tương đương với: MouseEvent | TouchEvent

function handlePointerEvent(event: PointerEvent) {
  if (event instanceof MouseEvent) {
    console.log(`Mouse at (${event.clientX}, ${event.clientY})`);
  } else {
    console.log(
      `Touch at (${event.touches[0].clientX}, ${event.touches[0].clientY})`,
    );
  }
}

// Ví dụ: Extract literal types
type Direction = "up" | "down" | "left" | "right";

type VerticalDirection = Extract<Direction, "up" | "down">;
// Tương đương với: "up" | "down"

function moveVertical(direction: VerticalDirection) {
  console.log(`Moving ${direction}`);
}

// Ví dụ: Extract với generics
function isStringType<T>(value: T): value is Extract<T, string> {
  return typeof value === "string";
}

// Ví dụ: Extract với keyof
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type StringKeys = Extract<keyof User, "name" | "email">;
// "name" | "email"

// Ví dụ: Extract với conditional types
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

interface User {
  id: number;
  name: string;
  greet(): void;
  update(): void;
}

type UserMethods = Extract<keyof User, FunctionKeys<User>>;
// "greet" | "update"
```

### Best Practices:

```typescript
// ✅ Dùng Extract để extract specific types
type StringOrArray = string | number | string[] | number[];
type StringTypes = Extract<StringOrArray, string | string[]>;

// ✅ Dùng Extract cho event handling
type PointerEvent = Extract<Event, MouseEvent | TouchEvent>;

// ✅ Dùng Extract với literal types
type Status = "pending" | "success" | "error" | "loading";
type InProgressStatus = Extract<Status, "pending" | "loading">;
// "pending" | "loading"

// ✅ Kết hợp Extract với Exclude
type AllTypes = string | number | boolean | null | undefined;
type NonNullableTypes = Exclude<AllTypes, null | undefined>;
type NullableTypes = Extract<AllTypes, null | undefined>;

// ✅ Dùng Extract với conditional types
type FunctionProperties<T> = Extract<
  keyof T,
  {
    [K in keyof T]: T[K] extends Function ? K : never;
  }[keyof T]
>;

// ✅ Dùng Extract với keyof
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

type StringProperties = Extract<keyof User, "name" | "email">;
// "name" | "email"

// ❌ Không nên dùng Extract khi không có matching types
type BadExample = Extract<string, number>;
// never (vì string không assign được cho number)

// ✅ Nên dùng Extract khi có matching types
type GoodExample = Extract<string | number, number>;
// number

// ✅ Dùng Extract để create variant types
type ErrorResult<T> = Extract<Result<T>, { error: string }>;
type SuccessResult<T> = Extract<Result<T>, { data: T }>;
```

---

## `NonNullable<T>`?

**`NonNullable<T>`** - Utility type loại bỏ `null` và `undefined` từ type `T`.

### Mục đích / Purpose

Tạo một type mới không bao gồm `null` và `undefined`.

### Khi nào dùng / When to Use

| Tình huống              | Khi nào dùng                             |
| ----------------------- | ---------------------------------------- |
| - Remove null/undefined | Khi cần loại bỏ null/undefined           |
| - Type guards           | Sau khi validate null/undefined          |
| - API responses         | Khi response không null/undefined        |
| - Function returns      | Khi function không trả về null/undefined |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Remove Null/Undefined**: Loại bỏ null và undefined
- **Type-safe**: TypeScript kiểm tra types
- **Built-in**: Không cần custom implementation
- **Simple**: Dễ dùng và hiểu |

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                 | Nhược điểm                         |
| ----------------------- | ---------------------------------- |
| - Remove null/undefined | Không recursive với nested objects |
| - Type-safe             | Runtime validation vẫn cần         |
| - Built-in              | Shallow only                       |
| - Simple                | Không validate runtime             |

### Ví dụ:

```typescript
// Ví dụ cơ bản: NonNullable với union types
type MaybeString = string | null | undefined;

type DefiniteString = NonNullable<MaybeString>;
// Tương đương với: string

function processString(value: DefiniteString) {
  // Value không thể là null hoặc undefined
  console.log(value.toUpperCase());
}

// Ví dụ thực tế: Type guard
function isDefined<T>(value: T | null | undefined): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

function processValue(value: string | null | undefined) {
  if (isDefined(value)) {
    // TypeScript biết value là string
    console.log(value.toUpperCase());
  }
}

// Ví dụ: API response
type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};

function getSuccessData<T>(response: ApiResponse<T>): NonNullable<T> | null {
  if (response.data !== null) {
    return response.data as NonNullable<T>;
  }
  return null;
}

// Ví dụ: Function parameters
function greet(name: NonNullable<string | undefined>): string {
  return `Hello, ${name}!`;
}

// ✅ OK
greet("Alice");

// ❌ Error: Argument of type 'undefined' is not assignable
// greet(undefined);

// Ví dụ: Kết hợp với Partial
interface User {
  id: number;
  name?: string;
  email?: string;
}

type RequiredUser = {
  [K in keyof User]: NonNullable<User[K]>;
};
// { id: number; name: string; email: string }

// Ví dụ: Array filtering
const items: (string | null | undefined)[] = ["a", null, "b", undefined, "c"];

const definedItems = items.filter(
  (item): item is NonNullable<typeof item> => item != null,
);
// Type: string[]
```

### Best Practices:

```typescript
// ✅ Dùng NonNullable để loại bỏ null/undefined
type DefiniteString = NonNullable<string | null | undefined>;

// ✅ Dùng NonNullable với type guards
function isNotNull<T>(value: T | null): value is NonNullable<T> {
  return value !== null;
}

function isNotUndefined<T>(value: T | undefined): value is NonNullable<T> {
  return value !== undefined;
}

function isNotNullOrUndefined<T>(
  value: T | null | undefined,
): value is NonNullable<T> {
  return value != null;
}

// ✅ Dùng NonNullable với array filtering
const items: (string | null)[] = ["a", null, "b", null, "c"];

const nonNullItems = items.filter(
  (item): item is NonNullable<typeof item> => item !== null,
);
// Type: string[]

// ✅ Dùng NonNullable với mapped types
type RequiredFields<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

interface User {
  id: number;
  name?: string;
  email?: string;
}

type CompleteUser = RequiredFields<User>;
// { id: number; name: string; email: string }

// ❌ Không nên dùng NonNullable khi chưa validate
function badExample(value: string | null) {
  const str = value as NonNullable<string | null>;
  console.log(str.toUpperCase()); // ❌ Runtime error nếu value là null
}

// ✅ Nên validate trước khi dùng
function goodExample(value: string | null) {
  if (value !== null) {
    console.log(value.toUpperCase()); // ✅ TypeScript tự narrow
  }
}

// ✅ Dùng NonNullable với generics
function ensureDefined<T>(
  value: T | null | undefined,
  message: string,
): NonNullable<T> {
  if (value == null) {
    throw new Error(message);
  }
  return value;
}

// ✅ Dùng NonNullable với conditional types
type NonNullableKeys<T> = {
  [K in keyof T]: null extends T[K] ? never : K;
}[keyof T];
```

---

## `ReturnType<T>`?

**`ReturnType<T>`** - Utility type lấy return type của function type `T`.

### Mục đích / Purpose

Extract return type từ một function type.

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                     |
| --------------------- | -------------------------------- |
| - Extract return type | Khi cần return type của function |
| - Type inference      | Khi infer return type            |
| - Generic functions   | Khi làm việc với generics        |
| - API wrappers        | Khi wrap API functions           |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Extract Return Type**: Lấy return type từ function
- **Type-safe**: TypeScript kiểm tra types
- **Built-in**: Không cần custom implementation
- **Reusable**: Dùng lại function types |

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm                          |
| --------------------- | ----------------------------------- |
| - Extract return type | Chỉ hoạt động với function types    |
| - Type-safe           | Không work với overloaded functions |
| - Built-in            | Learning curve                      |
| - Reusable            | Complex với generics                |

### Ví dụ:

```typescript
// Ví dụ cơ bản: ReturnType với function
function getUser(): User {
  return { id: 1, name: "Alice" };
}

type UserReturnType = ReturnType<typeof getUser>;
// Tương đương với: User

function processUser(user: UserReturnType) {
  console.log(user.name);
}

// Ví dụ thực tế: API wrapper
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

type FetchUserReturn = ReturnType<typeof fetchUser>;
// Promise<User>

// Ví dụ: Arrow function
const getUserById = (id: number): User => ({
  id,
  name: "Alice",
});

type GetUserByIdReturn = ReturnType<typeof getUserById>;
// User

// Ví dụ: Generic function
function identity<T>(value: T): T {
  return value;
}

type IdentityReturn = ReturnType<typeof identity<string>>;
// string

// Ví dụ: Function type
type GetUser = (id: number) => User;

type GetUserReturn = ReturnType<GetUser>;
// User

// Ví dụ: Async function
async function fetchData(): Promise<{ data: string }> {
  return { data: "hello" };
}

type FetchDataReturn = Awaited<ReturnType<typeof fetchData>>;
// { data: string }

// Ví dụ: Method type
class UserService {
  getUser(id: number): User {
    return { id, name: "Alice" };
  }
}

type GetUserMethodReturn = ReturnType<UserService["getUser"]>;
// User
```

### Best Practices:

```typescript
// ✅ Dùng ReturnType để extract return type
type UserReturn = ReturnType<typeof getUser>;

// ✅ Dùng ReturnType với async functions
type AsyncUserReturn = Awaited<ReturnType<typeof fetchUser>>;

// ✅ Dùng ReturnType với generic functions
type IdentityReturn<T> = ReturnType<typeof identity<T>>;

// ✅ Dùng ReturnType với method types
type MethodReturn = ReturnType<SomeClass["methodName"]>;

// ✅ Dùng ReturnType để create wrapper types
type ApiFunction = (...args: any[]) => Promise<any>;
type ApiReturn<T extends ApiFunction> = Awaited<ReturnType<T>>;

// ✅ Dùng ReturnType với conditional types
type AsyncReturnType<T extends (...args: any[]) => any> = Awaited<
  ReturnType<T>
>;

// ❌ Không nên dùng ReturnType với non-function types
type BadExample = ReturnType<string>;
// Error: Type 'string' does not satisfy the constraint '(...args: any) => any'

// ✅ Nên dùng ReturnType với function types
type GoodExample = ReturnType<() => string>;

// ✅ Dùng ReturnType để infer types
function wrapApi<T extends (...args: any[]) => Promise<any>>(
  fn: T,
): (...args: Parameters<T>) => Promise<ApiReturn<T>> {
  return fn;
}

// ✅ Dùng ReturnType với overloads (cần cẩn thận)
// ReturnType chỉ lấy return type của signature cuối cùng
```

---

## `Parameters<T>`?

**`Parameters<T>`** - Utility type lấy parameter types của function type `T` dưới dạng tuple.

### Mục đích / Purpose

Extract parameter types từ một function type.

### Khi nào dùng / When to Use

| Tình huống           | Khi nào dùng                         |
| -------------------- | ------------------------------------ |
| - Extract parameters | Khi cần parameter types của function |
| - Type inference     | Khi infer parameter types            |
| - Generic functions  | Khi làm việc với generics            |
| - API wrappers       | Khi wrap API functions               |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Extract Parameters**: Lấy parameter types từ function
- **Type-safe**: TypeScript kiểm tra types
- **Built-in**: Không cần custom implementation
- **Reusable**: Dùng lại function types |

### Ưu nhược điểm / Pros & Cons

| Ưu điểm              | Nhược điểm                          |
| -------------------- | ----------------------------------- |
| - Extract parameters | Chỉ hoạt động với function types    |
| - Type-safe          | Không work với overloaded functions |
| - Built-in           | Learning curve                      |
| - Reusable           | Complex với generics                |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Parameters với function
function getUser(id: number, includeDetails: boolean): User {
  return { id, name: "Alice" };
}

type GetUserParams = Parameters<typeof getUser>;
// Tương đương với: [number, boolean]

function callGetUser(args: GetUserParams): User {
  return getUser(...args);
}

// Ví dụ thực tế: API wrapper
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

type FetchUserParams = Parameters<typeof fetchUser>;
// [number]

// Ví dụ: Arrow function
const getUserById = (id: number, name: string): User => ({
  id,
  name,
});

type GetUserByIdParams = Parameters<typeof getUserById>;
// [number, string]

// Ví dụ: Generic function
function identity<T>(value: T): T {
  return value;
}

type IdentityParams<T> = Parameters<typeof identity<T>>;
// [T]

// Ví dụ: Function type
type GetUser = (id: number, includeDetails: boolean) => User;

type GetUserParameters = Parameters<GetUser>;
// [number, boolean]

// Ví dụ: Method type
class UserService {
  getUser(id: number, includeDetails: boolean): User {
    return { id, name: "Alice" };
  }
}

type GetUserMethodParams = Parameters<UserService["getUser"]>;
// [number, boolean]

// Ví dụ: Async function
async function fetchData(url: string, options: RequestInit): Promise<Response> {
  return fetch(url, options);
}

type FetchDataParams = Parameters<typeof fetchData>;
// [string, RequestInit]
```

### Best Practices:

```typescript
// ✅ Dùng Parameters để extract parameter types
type UserParams = Parameters<typeof getUser>;

// ✅ Dùng Parameters để create wrapper functions
function wrapFunction<T extends (...args: any[]) => any>(
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> {
  return fn;
}

// ✅ Dùng Parameters với generic functions
type IdentityParams<T> = Parameters<typeof identity<T>>;

// ✅ Dùng Parameters với method types
type MethodParams = Parameters<SomeClass["methodName"]>;

// ✅ Dùng Parameters để create typed APIs
type ApiMethod = (...args: any[]) => Promise<any>;

function createApi<T extends ApiMethod>(method: T) {
  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    return method(...args);
  };
}

// ✅ Dùng Parameters với conditional types
type FirstParameter<T extends (...args: any[]) => any> = Parameters<T>[0];

type SecondParameter<T extends (...args: any[]) => any> = Parameters<T>[1];

// ❌ Không nên dùng Parameters với non-function types
type BadExample = Parameters<string>;
// Error: Type 'string' does not satisfy the constraint '(...args: any) => any'

// ✅ Nên dùng Parameters với function types
type GoodExample = Parameters<(id: number) => User>;

// ✅ Dùng Parameters để infer types
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

// ✅ Dùng Parameters với overloads (cần cẩn thận)
// Parameters chỉ lấy parameters của signature cuối cùng
```

---

## Tổng kết

### Bảng so sánh Utility Types

| Utility Type     | Mục đích                               | Ví dụ                                                                |
| ---------------- | -------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------- |
| `Partial<T>`     | Làm tất cả properties thành optional   | `Partial<User>` → `{ id?: number; name?: string; }`                  |
| `Required<T>`    | Làm tất cả properties thành required   | `Required<User>` → `{ id: number; name: string; }`                   |
| `Readonly<T>`    | Làm tất cả properties thành readonly   | `Readonly<User>` → `{ readonly id: number; readonly name: string; }` |
| `Record<K, T>`   | Tạo object type với keys K và values T | `Record<"a"                                                          | "b", number>`→`{ a: number; b: number; }` |
| `Pick<T, K>`     | Chọn properties K từ T                 | `Pick<User, "id"                                                     | "name">`→`{ id: number; name: string; }`  |
| `Omit<T, K>`     | Loại bỏ properties K từ T              | `Omit<User, "password">` → `{ id: number; name: string; }`           |
| `Exclude<T, U>`  | Loại bỏ types U từ union T             | `Exclude<string \| number, number>` → `string`                       |
| `Extract<T, U>`  | Giữ lại types trong T compatible với U | `Extract<string \| number, string>` → `string`                       |
| `NonNullable<T>` | Loại bỏ null và undefined từ T         | `NonNullable<string \| null>` → `string`                             |
| `ReturnType<T>`  | Lấy return type của function T         | `ReturnType<() => string>` → `string`                                |
| `Parameters<T>`  | Lấy parameter types của function T     | `Parameters<(id: number) => User>` → `[number]`                      |

### Best Practices chung cho Utility Types

1. **Ưu tiên built-in utilities**: TypeScript có nhiều built-in utilities, dùng chúng thay vì custom
2. **Kết hợp utilities**: Có thể combine nhiều utilities để tạo complex types
3. **Dùng generics**: Utility types hoạt động tốt với generics
4. **Type safety**: Luôn validate runtime khi cần thiết
5. **Documentation**: Comment complex type transformations

### Anti-patterns cần tránh

```typescript
// ❌ Dùng type assertions thay vì utility types
const user = data as User; // ❌

// ✅ Nên dùng utility types với validation
const user = validateUser(data); // ✅

// ❌ Lặp lại type definitions
interface PublicUser {
  id: number;
  name: string;
  email: string;
}

// ✅ Nên dùng utility types
type PublicUser = Pick<User, "id" | "name" | "email">;

// ❌ Không validate runtime
function badUpdate(id: number, updates: Partial<User>) {
  return { id, ...updates };
}

// ✅ Nên validate trước
function goodUpdate(id: number, updates: Partial<User>): User {
  const validated = validateUpdates(updates);
  return { id, ...validated };
}
```

---

## Tài liệu tham khảo / References

- [TypeScript Handbook - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [TypeScript Deep Dive - Utility Types](https://basarat.gitbook.io/typescript/type-system/utility-types)
- [TypeScript - Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)

---

_Last updated: 2026-01-30_
