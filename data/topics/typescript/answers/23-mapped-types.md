# 23. Mapped Types

## Tổng quan về Mapped Types

### Mục đích của Mapped Types / Purpose

**Mapped Types** là cách để tạo mới types bằng cách mapping over properties của một existing type, tương tự như array map nhưng tại type level.

**Mục đích chính:**

- Transform types bằng cách mapping over properties
- Create generic type utilities
- Modify property modifiers (readonly, optional)
- Filter hoặc transform keys
- Build type-safe APIs

### Khi nào cần hiểu về Mapped Types / When to Use

Hiểu về Mapped Types là cần thiết khi:

- Xây dựng type utilities
- Transform types
- Create generic libraries
- Build type-safe APIs
- Implement type-level programming

### Giúp ích gì / Benefits

**Lợi ích:**

- **Transform Types**: Transform properties của types
- **Generic Utilities**: Build generic type utilities
- **Type Safety**: TypeScript kiểm tra types
- **Reusable**: Dùng lại mapped types
- **Type-level Programming**: Implement logic tại type level

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm             |
| ------------------- | ---------------------- |
| - Transform types   | Learning curve         |
| - Generic utilities | Có thể phức tạp        |
| - Type safety       | Debugging khó          |
| - Reusable          | Performance impact nhỏ |

---

## Mapped types là gì?

**Mapped Types** - Types được tạo bằng cách mapping over properties của một existing type.

### Mục đích / Purpose

Tạo mới types bằng cách mapping over properties của existing type.

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng                     |
| ------------------- | -------------------------------- |
| - Transform types   | Khi cần transform properties     |
| - Generic utilities | Khi build generic type utilities |
| - Modify modifiers  | Khi làm readonly/optional        |
| - Filter keys       | Khi filter properties            |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Transform Types**: Transform properties của types
- **Generic Utilities**: Build generic type utilities
- **Type Safety**: TypeScript kiểm tra types
- **Reusable**: Dùng lại mapped types

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm             |
| ------------------- | ---------------------- |
| - Transform types   | Learning curve         |
| - Generic utilities | Có thể phức tạp        |
| - Type safety       | Debugging khó          |
| - Reusable          | Performance impact nhỏ |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Mapped type
interface User {
  id: number;
  name: string;
  email: string;
}

type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};
// { readonly id: number; readonly name: string; readonly email: string; }

type PartialUser = {
  [K in keyof User]?: User[K];
};
// { id?: number; name?: string; email?: string; }

// Ví dụ: Mapped type với value transformation
type Stringify<T> = {
  [K in keyof T]: string;
};

type StringifiedUser = Stringify<User>;
// { id: string; name: string; email: string; }

// Ví dụ: Mapped type với key transformation
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// {
//   getId: () => number;
//   getName: () => string;
//   getEmail: () => string;
// }

// Ví dụ thực tế: Type-safe object access
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { id: 1, name: "Alice", email: "alice@example.com" };

const id = getProperty(user, "id"); // Type: number
const name = getProperty(user, "name"); // Type: string

// Ví dụ thực tế: Type-safe object update
function updateProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): T {
  return { ...obj, [key]: value };
}

const updatedUser = updateProperty(user, "name", "Bob");
// Type: { id: number; name: string; email: string; }

// Ví dụ thực tế: Type-safe object merge
function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

interface Timestamp {
  createdAt: Date;
  updatedAt: Date;
}

const merged = mergeObjects<User, Timestamp>(
  { id: 1, name: "Alice", email: "alice@example.com" },
  { createdAt: new Date(), updatedAt: new Date() },
);
// Type: User & Timestamp
```

### Best Practices:

```typescript
// ✅ Dùng mapped types để transform types
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// ✅ Dùng mapped types để create utilities
type Partial<T> = {
  [K in keyof T]?: T[K];
};

// ✅ Dùng mapped types với key transformation
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// ✅ Dùng mapped types với value transformation
type Stringify<T> = {
  [K in keyof T]: string;
};

// ❌ Không nên dùng mapped types với unconstrained generics
type BadExample<T> = {
  [K in keyof T]: T[K];
}; // ❌ K có thể không được infer

// ✅ Nên constrain generics với object
type GoodExample<T extends object> = {
  [K in keyof T]: T[K];
}; // ✅ K được infer từ keyof T
```

---

## `[K in keyof T]`?

**`[K in keyof T]`** - Cú pháp để map over tất cả keys của type `T`.

### Mục đích / Purpose

Map over tất cả keys của type `T` để tạo mới type.

### Khi nào dùng / When to Use

| Tình huống                 | Khi nào dùng                        |
| -------------------------- | ----------------------------------- |
| - Transform all properties | Khi cần transform tất cả properties |
| - Generic utilities        | Khi build generic type utilities    |
| - Modify modifiers         | Khi làm readonly/optional           |
| - Filter keys              | Khi filter properties               |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Transform All Properties**: Transform tất cả properties
- **Generic Utilities**: Build generic type utilities
- **Type Safety**: TypeScript kiểm tra types
- **Reusable**: Dùng lại mapped types

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                    | Nhược điểm             |
| -------------------------- | ---------------------- |
| - Transform all properties | Learning curve         |
| - Generic utilities        | Có thể phức tạp        |
| - Type safety              | Debugging khó          |
| - Reusable                 | Performance impact nhỏ |

### Ví dụ:

```typescript
// Ví dụ cơ bản: [K in keyof T]
interface User {
  id: number;
  name: string;
  email: string;
}

type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};
// { readonly id: number; readonly name: string; readonly email: string; }

type PartialUser = {
  [K in keyof User]?: User[K];
};
// { id?: number; name?: string; email?: string; }

// Ví dụ: Required utility
type Required<T> = {
  [K in keyof T]-?: T[K];
};

interface OptionalUser {
  id?: number;
  name?: string;
  email?: string;
}

type RequiredUser = Required<OptionalUser>;
// { id: number; name: string; email: string; }

// Ví dụ: Nullable utility
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<User>;
// { id: number | null; name: string | null; email: string | null; }

// Ví dụ thực tế: Type-safe pick
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    result[key] = obj[key];
  });
  return result;
}

const user: User = { id: 1, name: "Alice", email: "alice@example.com" };

const partial = pick(user, ["id", "name"]);
// Type: Pick<User, "id" | "name">

// Ví dụ thực tế: Type-safe omit
function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result as Omit<T, K>;
}

const partial2 = omit(user, ["email"]);
// Type: Omit<User, "email">
```

### Best Practices:

```typescript
// ✅ Dùng [K in keyof T] để transform tất cả properties
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// ✅ Dùng [K in keyof T] để create utilities
type Partial<T> = {
  [K in keyof T]?: T[K];
};

// ✅ Dùng [K in keyof T] với modifiers
type Required<T> = {
  [K in keyof T]-?: T[K];
};

// ✅ Dùng [K in keyof T] với value transformation
type Stringify<T> = {
  [K in keyof T]: string;
};

// ❌ Không nên dùng [K in keyof T] với unconstrained generics
type BadExample<T> = {
  [K in keyof T]: T[K];
}; // ❌ K có thể không được infer

// ✅ Nên constrain generics với object
type GoodExample<T extends object> = {
  [K in keyof T]: T[K];
}; // ✅ K được infer từ keyof T
```

---

## `as` clause trong mapped types?

**`as` clause** - Clause trong mapped types để transform keys.

### Mục đích / Purpose

Transform keys trong mapped types.

### Khi nào dùng / When to Use

| Tình huống              | Khi nào dùng                  |
| ----------------------- | ----------------------------- |
| - Transform keys        | Khi cần transform keys        |
| - Filter keys           | Khi filter properties         |
| - Rename keys           | Khi rename properties         |
| - Template literal keys | Khi tạo template literal keys |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Transform Keys**: Transform keys trong mapped types
- **Filter Keys**: Filter properties
- **Rename Keys**: Rename properties
- **Template Literal Keys**: Tạo template literal keys

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                 | Nhược điểm             |
| ----------------------- | ---------------------- |
| - Transform keys        | Learning curve         |
| - Filter keys           | Có thể phức tạp        |
| - Rename keys           | Debugging khó          |
| - Template literal keys | Performance impact nhỏ |

### Ví dụ:

```typescript
// Ví dụ cơ bản: as clause với capitalize
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface User {
  id: number;
  name: string;
  email: string;
}

type UserGetters = Getters<User>;
// {
//   getId: () => number;
//   getName: () => string;
//   getEmail: () => string;
// }

// Ví dụ: as clause với lowercase
type LowercaseKeys<T> = {
  [K in keyof T as Lowercase<string & K>]: T[K];
};

interface Config {
  ApiUrl: string;
  Timeout: number;
  Retries: number;
}

type LowercaseConfig = LowercaseKeys<Config>;
// {
//   apiUrl: string;
//   timeout: number;
//   retries: number;
// }

// Ví dụ: as clause với filter
type StringKeys<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type UserStringKeys = StringKeys<User>;
// { name: string; email: string; }

// Ví dụ: as clause với template literal
type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (event: T[K]) => void;
};

interface Events {
  click: MouseEvent;
  keydown: KeyboardEvent;
  keyup: KeyboardEvent;
}

type Handlers = EventHandlers<Events>;
// {
//   onClick: (event: MouseEvent) => void;
//   onKeydown: (event: KeyboardEvent) => void;
//   onKeyup: (event: KeyboardEvent) => void;
// }

// Ví dụ thực tế: Type-safe event handlers
function addEventHandler<T, K extends keyof T>(
  element: HTMLElement,
  event: K,
  handler: (event: T[K]) => void,
) {
  element.addEventListener(String(event).toLowerCase(), handler);
}

const button = document.getElementById("button") as HTMLButtonElement;
addEventHandler<Events, "click">(button, "click", (event) => {
  console.log("Clicked at:", event.clientX, event.clientY);
});

// Ví dụ thực tế: Type-safe getters/setters
type Accessors<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
} & {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

type UserAccessors = Accessors<User>;
// {
//   getId: () => number;
//   getName: () => string;
//   getEmail: () => string;
//   setId: (value: number) => void;
//   setName: (value: string) => void;
//   setEmail: (value: string) => void;
// }
```

### Best Practices:

```typescript
// ✅ Dùng as clause để transform keys
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// ✅ Dùng as clause để filter keys
type StringKeys<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

// ✅ Dùng as clause với template literal
type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (event: T[K]) => void;
};

// ✅ Dùng as clause với conditional types
type NonNullableKeys<T> = {
  [K in keyof T as null extends T[K] ? never : K]: T[K];
};

// ❌ Không nên dùng as clause quá phức tạp
type BadExample<T> = {
  [K in keyof T as T[K] extends string
    ? T[K] extends "hello"
      ? `hello_${K}`
      : `string_${K}`
    : never]: T[K];
};

// ✅ Nên chia nhỏ mapped types
type Step1<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type Step2<T> = {
  [K in keyof Step1<T> as K extends "hello" ? `hello_${K}` : K]: Step1<T>[K];
};
```

---

## Key remapping?

**Key remapping** - Transform keys trong mapped types sử dụng `as` clause.

### Mục đích / Purpose

Transform keys trong mapped types.

### Khi nào dùng / When to Use

| Tình huống              | Khi nào dùng                  |
| ----------------------- | ----------------------------- |
| - Transform keys        | Khi cần transform keys        |
| - Filter keys           | Khi filter properties         |
| - Rename keys           | Khi rename properties         |
| - Template literal keys | Khi tạo template literal keys |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Transform Keys**: Transform keys trong mapped types
- **Filter Keys**: Filter properties
- **Rename Keys**: Rename properties
- **Template Literal Keys**: Tạo template literal keys

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                 | Nhược điểm             |
| ----------------------- | ---------------------- |
| - Transform keys        | Learning curve         |
| - Filter keys           | Có thể phức tạp        |
| - Rename keys           | Debugging khó          |
| - Template literal keys | Performance impact nhỏ |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Key remapping với uppercase
type UppercaseKeys<T> = {
  [K in keyof T as Uppercase<string & K>]: T[K];
};

interface User {
  id: number;
  name: string;
  email: string;
}

type UppercaseUser = UppercaseKeys<User>;
// {
//   ID: number;
//   NAME: string;
//   EMAIL: string;
// }

// Ví dụ: Key remapping với prefix
type PrefixedKeys<T, P extends string> = {
  [K in keyof T as `${P}${Capitalize<string & K>}`]: T[K];
};

type PrefixedUser = PrefixedKeys<User, "user">;
// {
//   userId: number;
//   userName: string;
//   userEmail: string;
// }

// Ví dụ: Key remapping với suffix
type SuffixedKeys<T, S extends string> = {
  [K in keyof T as `${K}${S}`]: T[K];
};

type SuffixedUser = SuffixedKeys<User, "Prop">;
// {
//   idProp: number;
//   nameProp: string;
//   emailProp: string;
// }

// Ví dụ: Key remapping với filter
type NumberKeys<T> = {
  [K in keyof T as T[K] extends number ? K : never]: T[K];
};

type UserNumberKeys = NumberKeys<User>;
// { id: number; }

// Ví dụ thực tế: Type-safe API client
type ApiMethods<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => Promise<T[K]>;
} & {
  [K in keyof T as `set${Capitalize<string & K>}`]: (
    value: T[K],
  ) => Promise<void>;
} & {
  [K in keyof T as `delete${Capitalize<string & K>}`]: () => Promise<void>;
};

interface UserApi {
  users: User[];
  user: User;
}

type UserApiClient = ApiMethods<UserApi>;
// {
//   getUsers: () => Promise<User[]>;
//   getUser: () => Promise<User>;
//   setUsers: (value: User[]) => Promise<void>;
//   setUser: (value: User) => Promise<void>;
//   deleteUsers: () => Promise<void>;
//   deleteUser: () => Promise<void>;
// }

// Ví dụ thực tế: Type-safe form handlers
type FormHandlers<T> = {
  [K in keyof T as `handle${Capitalize<string & K>}Change`]: (
    value: T[K],
  ) => void;
};

interface FormData {
  username: string;
  email: string;
  password: string;
}

type FormDataHandlers = FormHandlers<FormData>;
// {
//   handleUsernameChange: (value: string) => void;
//   handleEmailChange: (value: string) => void;
//   handlePasswordChange: (value: string) => void;
// }
```

### Best Practices:

```typescript
// ✅ Dùng key remapping để transform keys
type UppercaseKeys<T> = {
  [K in keyof T as Uppercase<string & K>]: T[K];
};

// ✅ Dùng key remapping để filter keys
type StringKeys<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

// ✅ Dùng key remapping với prefix/suffix
type PrefixedKeys<T, P extends string> = {
  [K in keyof T as `${P}${Capitalize<string & K>}`]: T[K];
};

// ✅ Dùng key remapping với template literal
type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (event: T[K]) => void;
};

// ❌ Không nên dùng key remapping quá phức tạp
type BadExample<T> = {
  [K in keyof T as T[K] extends string
    ? T[K] extends "hello"
      ? `hello_${K}`
      : `string_${K}`
    : never]: T[K];
};

// ✅ Nên chia nhỏ mapped types
type Step1<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type Step2<T> = {
  [K in keyof Step1<T> as K extends "hello" ? `hello_${K}` : K]: Step1<T>[K];
};
```

---

## Tổng kết

### Bảng so sánh Mapped Types Features

| Feature              | Cú pháp                                               | Use Case                    |
| -------------------- | ----------------------------------------------------- | --------------------------- |
| Basic mapped type    | `[K in keyof T]`                                      | Transform tất cả properties |
| Key transformation   | `[K in keyof T as NewK]`                              | Transform keys              |
| Key filtering        | `[K in keyof T as T[K] extends U ? K : never]`        | Filter properties           |
| Value transformation | `[K in keyof T]: NewType`                             | Transform values            |
| Modifier             | `[K in keyof T]?: T[K]` hoặc `[K in keyof T]-?: T[K]` | Làm optional/required       |

### Khi nào nên dùng Mapped Types

| Tình huống        | Nên dùng                                       |
| ----------------- | ---------------------------------------------- |
| Transform types   | `[K in keyof T]`                               |
| Generic utilities | `[K in keyof T]`                               |
| Modify modifiers  | `[K in keyof T]?: T[K]`                        |
| Filter keys       | `[K in keyof T as T[K] extends U ? K : never]` |

### Best Practices chung cho Mapped Types

1. **Dùng mapped types để transform types**: Transform properties của types
2. **Dùng mapped types để create utilities**: Build generic type utilities
3. **Dùng as clause để transform keys**: Transform keys trong mapped types
4. **Dùng mapped types với conditional types**: Filter properties
5. **Type-safe property access**: Access properties type-safe

### Anti-patterns cần tránh

```typescript
// ❌ Dùng mapped types với unconstrained generics
type BadExample<T> = {
  [K in keyof T]: T[K];
}; // ❌ K có thể không được infer

// ✅ Nên constrain generics với object
type GoodExample<T extends object> = {
  [K in keyof T]: T[K];
}; // ✅ K được infer từ keyof T

// ❌ Dùng mapped types quá phức tạp
type BadExample2<T> = {
  [K in keyof T as T[K] extends string
    ? T[K] extends "hello"
      ? `hello_${K}`
      : `string_${K}`
    : never]: T[K];
};

// ✅ Nên chia nhỏ mapped types
type Step1<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type Step2<T> = {
  [K in keyof Step1<T> as K extends "hello" ? `hello_${K}` : K]: Step1<T>[K];
};

// ❌ Không nên dùng mapped types khi không cần
// ✅ Nên dùng type aliases khi không cần transform
type GoodExample = User; // Không cần mapped type
```

---

## Tài liệu tham khảo / References

- [TypeScript Handbook - Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [TypeScript Handbook - Key Remapping via as](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as)
- [TypeScript Deep Dive - Mapped Types](https://basarat.gitbook.io/typescript/type-system/mapped-types)
- [TypeScript - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

---

_Last updated: 2026-01-30_
