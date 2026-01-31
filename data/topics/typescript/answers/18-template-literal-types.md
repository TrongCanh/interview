# 18. Template Literal Types

## Tổng quan về Template Literal Types

### Mục đích của Template Literal Types / Purpose

**Template Literal Types** là types được tạo từ string literal types và template literal syntax (backticks), cho phép string manipulation và concatenation tại type level.

**Mục đích chính:**

- Tạo types từ string literals
- String manipulation tại type level
- Tạo event handler types
- Tạo API endpoint types
- Build type-safe string-based APIs

### Khi nào cần hiểu về Template Literal Types / When to Use

Hiểu về Template Literal Types là cần thiết khi:

- Xây dựng type-safe APIs dựa trên strings
- Tạo event handler types
- Xử lý CSS class names
- Xây dựng routing types
- Tạo configuration types

### Giúp ích gì / Benefits

**Lợi ích:**

- **String Manipulation**: Manipulate strings tại type level
- **Type-safe Strings**: TypeScript kiểm tra string literals
- **Expressive**: Express string relationships
- **Built-in**: TypeScript hỗ trợ tốt

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm             |
| --------------------- | ---------------------- |
| - String manipulation | Learning curve         |
| - Type-safe strings   | Có thể phức tạp        |
| - Expressive          | Debugging khó          |
| - Built-in            | Performance impact nhỏ |

---

## Template literal types là gì?

**Template Literal Types** - Types được tạo từ string literal types và template literal syntax, cho phép string concatenation và manipulation tại type level.

### Mục đích / Purpose

Tạo types từ string literals và template literal syntax, cho phép string manipulation tại type level.

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng                |
| ---------------------- | --------------------------- |
| - String concatenation | Khi cần concatenate strings |
| - Event handlers       | Khi tạo event handler types |
| - API endpoints        | Khi tạo API endpoint types  |
| - CSS classes          | Khi tạo CSS class types     |

### Giúp ích gì / Benefits

**Lợi ích:**

- **String Concatenation**: Concatenate strings tại type level
- **Type-safe**: TypeScript kiểm tra string literals
- **Expressive**: Express string relationships
- **Built-in**: TypeScript hỗ trợ tốt

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm             |
| ---------------------- | ---------------------- |
| - String concatenation | Learning curve         |
| - Type-safe            | Có thể phức tạp        |
| - Expressive           | Debugging khó          |
| - Built-in             | Performance impact nhỏ |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Template literal types
type Greeting = "Hello" | "Hi";
type Name = "Alice" | "Bob";

type GreetingMessage = `${Greeting}, ${Name}!`;
// "Hello, Alice!" | "Hello, Bob!" | "Hi, Alice!" | "Hi, Bob!"

function greet(message: GreetingMessage) {
  console.log(message);
}

// ✅ OK
greet("Hello, Alice!");
greet("Hi, Bob!");

// ❌ Error: Argument of type '"Hello, Charlie!"' is not assignable
// greet("Hello, Charlie!");

// Ví dụ: Event handler types
type Event = "click" | "keydown" | "keyup";

type EventHandler = `on${Capitalize<Event>}`;
// "onClick" | "onKeydown" | "onKeyup"

interface EventHandlers {
  onClick: (event: MouseEvent) => void;
  onKeydown: (event: KeyboardEvent) => void;
  onKeyup: (event: KeyboardEvent) => void;
}

function addEventHandler<K extends EventHandler>(
  element: HTMLElement,
  event: K,
  handler: EventHandlers[K],
) {
  element.addEventListener(event.toLowerCase(), handler);
}

// Ví dụ: API endpoint types
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type Resource = "users" | "posts" | "comments";

type ApiEndpoint = `${HttpMethod} /api/${Resource}`;
// "GET /api/users" | "GET /api/posts" | "GET /api/comments" |
// "POST /api/users" | "POST /api/posts" | "POST /api/comments" |
// "PUT /api/users" | "PUT /api/posts" | "PUT /api/comments" |
// "DELETE /api/users" | "DELETE /api/posts" | "DELETE /api/comments"

function callApi(endpoint: ApiEndpoint): Promise<Response> {
  const [method, url] = endpoint.split(" ");
  return fetch(url, { method });
}

// ✅ OK
callApi("GET /api/users");
callApi("POST /api/posts");

// ❌ Error: Argument of type '"GET /api/products"' is not assignable
// callApi("GET /api/products");

// Ví dụ: CSS class types
type Color = "red" | "green" | "blue";
type Size = "small" | "medium" | "large";
type Variant = "primary" | "secondary" | "tertiary";

type ButtonClass = `btn-${Color}-${Size}-${Variant}`;
// "btn-red-small-primary" | "btn-red-small-secondary" | ... (27 combinations)

function setButtonClass(element: HTMLButtonElement, className: ButtonClass) {
  element.className = className;
}

// ✅ OK
setButtonClass(button, "btn-red-small-primary");

// ❌ Error: Argument of type '"btn-red-large"' is not assignable
// setButtonClass(button, "btn-red-large");

// Ví dụ: String literal types với numbers
type Width = 100 | 200 | 300;
type Height = 100 | 200 | 300;

type SizeString = `${Width}x${Height}`;
// "100x100" | "100x200" | "100x300" | "200x100" | ... (9 combinations)

function setSize(element: HTMLElement, size: SizeString) {
  const [width, height] = size.split("x");
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
}

// ✅ OK
setSize(element, "200x300");

// ❌ Error: Argument of type '"400x400"' is not assignable
// setSize(element, "400x400");
```

### Best Practices:

```typescript
// ✅ Dùng template literal types để tạo string types
type Greeting = `Hello, ${string}!`;

// ✅ Dùng template literal types với event handlers
type EventHandler = `on${Capitalize<Event>}`;

// ✅ Dùng template literal types với API endpoints
type ApiEndpoint = `${HttpMethod} /api/${Resource}`;

// ✅ Dùng template literal types với CSS classes
type ButtonClass = `btn-${Color}-${Size}`;

// ❌ Không nên dùng template literal types quá phức tạp
type BadExample<T> = `prefix_${T extends string ? T : never}_suffix`;

// ✅ Nên dùng conditional types với template literal types
type GoodExample<T extends string> = `prefix_${T}_suffix`;

// ✅ Dùng template literal types với conditional types
type IsPrefix<T extends string, P extends string> = T extends `${P}${string}`
  ? true
  : false;
```

---

## String manipulation types?

**String manipulation types** - Các built-in types để manipulate strings tại type level: `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`.

### Mục đích / Purpose

Manipulate strings tại type level: chuyển đổi case, capitalize, uncapitalize.

### Khi nào dùng / When to Use

| Tình huống        | Khi nào dùng                 |
| ----------------- | ---------------------------- |
| - Case conversion | Khi cần convert case         |
| - Capitalize      | Khi cần capitalize strings   |
| - Uncapitalize    | Khi cần uncapitalize strings |
| - Event handlers  | Khi tạo event handler names  |

### Giúp ích gì / Benefits

**Lợi ích:**

- **String Manipulation**: Manipulate strings tại type level
- **Type-safe**: TypeScript kiểm tra string literals
- **Built-in**: TypeScript hỗ trợ tốt
- **Expressive**: Express string relationships

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm             |
| --------------------- | ---------------------- |
| - String manipulation | Learning curve         |
| - Type-safe           | Có thể phức tạp        |
| - Built-in            | Debugging khó          |
| - Expressive          | Performance impact nhỏ |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Uppercase
type Greeting = "hello" | "hi";
type UppercaseGreeting = Uppercase<Greeting>;
// "HELLO" | "HI"

function shout(message: UppercaseGreeting) {
  console.log(message);
}

// ✅ OK
shout("HELLO");
shout("HI");

// ❌ Error: Argument of type '"hello"' is not assignable
// shout("hello");

// Ví dụ: Lowercase
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type LowercaseMethod = Lowercase<HttpMethod>;
// "get" | "post" | "put" | "delete"

function makeRequest(method: LowercaseMethod, url: string) {
  return fetch(url, { method });
}

// ✅ OK
makeRequest("get", "/api/users");
makeRequest("post", "/api/users");

// ❌ Error: Argument of type '"GET"' is not assignable
// makeRequest("GET", "/api/users");

// Ví dụ: Capitalize
type Event = "click" | "keydown" | "keyup";
type EventHandler = `on${Capitalize<Event>}`;
// "onClick" | "onKeydown" | "onKeyup"

interface Handlers {
  onClick: (event: MouseEvent) => void;
  onKeydown: (event: KeyboardEvent) => void;
  onKeyup: (event: KeyboardEvent) => void;
}

function addHandler<K extends EventHandler>(
  element: HTMLElement,
  event: K,
  handler: Handlers[K],
) {
  element.addEventListener(event.toLowerCase(), handler);
}

// Ví dụ: Uncapitalize
type PascalCase = "HelloWorld" | "FooBar";
type CamelCase = Uncapitalize<PascalCase>;
// "helloWorld" | "fooBar"

function formatName(name: CamelCase) {
  console.log(name);
}

// ✅ OK
formatName("helloWorld");
formatName("fooBar");

// ❌ Error: Argument of type '"HelloWorld"' is not assignable
// formatName("HelloWorld");

// Ví dụ thực tế: CSS class names
type Color = "red" | "green" | "blue";
type Size = "small" | "medium" | "large";

type ButtonClass = `btn-${Capitalize<Color>}-${Capitalize<Size>}`;
// "btn-Red-Small" | "btn-Red-Medium" | "btn-Red-Large" |
// "btn-Green-Small" | "btn-Green-Medium" | "btn-Green-Large" |
// "btn-Blue-Small" | "btn-Blue-Medium" | "btn-Blue-Large"

function setButtonClass(element: HTMLButtonElement, className: ButtonClass) {
  element.className = className;
}

// ✅ OK
setButtonClass(button, "btn-Red-Small");
setButtonClass(button, "btn-Green-Large");

// ❌ Error: Argument of type '"btn-red-small"' is not assignable
// setButtonClass(button, "btn-red-small");

// Ví dụ: Getter/setter types
interface User {
  id: number;
  name: string;
  email: string;
}

type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

type UserGetters = Getters<User>;
// {
//   getId: () => number;
//   getName: () => string;
//   getEmail: () => string;
// }

type UserSetters = Setters<User>;
// {
//   setId: (value: number) => void;
//   setName: (value: string) => void;
//   setEmail: (value: string) => void;
// }

// Ví dụ: String manipulation với conditional types
type RemovePrefix<
  T extends string,
  P extends string,
> = T extends `${P}${infer R}` ? R : T;

type Test1 = RemovePrefix<"hello world", "hello ">; // "world"

type RemoveSuffix<
  T extends string,
  S extends string,
> = T extends `${infer R}${S}` ? R : T;

type Test2 = RemoveSuffix<"hello world", " world">; // "hello"
```

### Best Practices:

```typescript
// ✅ Dùng Uppercase để convert strings
type UppercaseString = Uppercase<"hello">; // "HELLO"

// ✅ Dùng Lowercase để convert strings
type LowercaseString = Lowercase<"HELLO">; // "hello"

// ✅ Dùng Capitalize để capitalize strings
type CapitalizedString = Capitalize<"hello">; // "Hello"

// ✅ Dùng Uncapitalize để uncapitalize strings
type UncapitalizedString = Uncapitalize<"Hello">; // "hello"

// ✅ Dùng string manipulation với template literal types
type EventHandler = `on${Capitalize<Event>}`;

// ✅ Dùng string manipulation với mapped types
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// ❌ Không nên dùng string manipulation khi không cần
type BadExample = Uppercase<string>; // ❌ Không có nghĩa

// ✅ Nên dùng với literal types
type GoodExample = Uppercase<"hello" | "world">; // "HELLO" | "WORLD"
```

---

## `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`?

**`Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`** - Các built-in types để manipulate strings tại type level.

### Mục đích / Purpose

Manipulate strings tại type level: chuyển đổi case, capitalize, uncapitalize.

### Khi nào dùng / When to Use

| Tình huống     | Khi nào dùng                      |
| -------------- | --------------------------------- |
| - Uppercase    | Khi cần convert sang uppercase    |
| - Lowercase    | Khi cần convert sang lowercase    |
| - Capitalize   | Khi cần capitalize first letter   |
| - Uncapitalize | Khi cần uncapitalize first letter |

### Giúp ích gì / Benefits

**Lợi ích:**

- **String Manipulation**: Manipulate strings tại type level
- **Type-safe**: TypeScript kiểm tra string literals
- **Built-in**: TypeScript hỗ trợ tốt
- **Expressive**: Express string relationships

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm             |
| --------------------- | ---------------------- |
| - String manipulation | Learning curve         |
| - Type-safe           | Có thể phức tạp        |
| - Built-in            | Debugging khó          |
| - Expressive          | Performance impact nhỏ |

### Ví dụ:

```typescript
// Uppercase
type Greeting = "hello" | "hi";
type UppercaseGreeting = Uppercase<Greeting>;
// "HELLO" | "HI"

// Lowercase
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type LowercaseMethod = Lowercase<HttpMethod>;
// "get" | "post" | "put" | "delete"

// Capitalize
type Event = "click" | "keydown" | "keyup";
type EventHandler = `on${Capitalize<Event>}`;
// "onClick" | "onKeydown" | "onKeyup"

// Uncapitalize
type PascalCase = "HelloWorld" | "FooBar";
type CamelCase = Uncapitalize<PascalCase>;
// "helloWorld" | "fooBar"

// Ví dụ thực tế: CSS class names
type Color = "red" | "green" | "blue";
type Size = "small" | "medium" | "large";

type ButtonClass = `btn-${Capitalize<Color>}-${Capitalize<Size>}`;
// "btn-Red-Small" | "btn-Red-Medium" | "btn-Red-Large" |
// "btn-Green-Small" | "btn-Green-Medium" | "btn-Green-Large" |
// "btn-Blue-Small" | "btn-Blue-Medium" | "btn-Blue-Large"

// Ví dụ: Getter/setter types
interface User {
  id: number;
  name: string;
  email: string;
}

type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

type UserGetters = Getters<User>;
// {
//   getId: () => number;
//   getName: () => string;
//   getEmail: () => string;
// }

type UserSetters = Setters<User>;
// {
//   setId: (value: number) => void;
//   setName: (value: string) => void;
//   setEmail: (value: string) => void;
// }
```

### Best Practices:

```typescript
// ✅ Dùng Uppercase để convert strings
type UppercaseString = Uppercase<"hello">; // "HELLO"

// ✅ Dùng Lowercase để convert strings
type LowercaseString = Lowercase<"HELLO">; // "hello"

// ✅ Dùng Capitalize để capitalize strings
type CapitalizedString = Capitalize<"hello">; // "Hello"

// ✅ Dùng Uncapitalize để uncapitalize strings
type UncapitalizedString = Uncapitalize<"Hello">; // "hello"

// ✅ Dùng string manipulation với template literal types
type EventHandler = `on${Capitalize<Event>}`;

// ✅ Dùng string manipulation với mapped types
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// ❌ Không nên dùng string manipulation khi không cần
type BadExample = Uppercase<string>; // ❌ Không có nghĩa

// ✅ Nên dùng với literal types
type GoodExample = Uppercase<"hello" | "world">; // "HELLO" | "WORLD"
```

---

## Use cases thực tế?

**Use cases thực tế** - Các trường hợp sử dụng template literal types trong thực tế.

### Mục đích / Purpose

Hiểu các use cases thực tế của template literal types.

### Khi nào dùng / When to Use

| Tình huống       | Khi nào dùng                |
| ---------------- | --------------------------- |
| - Event handlers | Khi tạo event handler types |
| - API endpoints  | Khi tạo API endpoint types  |
| - CSS classes    | Khi tạo CSS class types     |
| - Routing        | Khi tạo routing types       |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type-safe APIs**: APIs type-safe
- **Expressive**: Express relationships
- **Maintainable**: Dễ maintain
- **Built-in**: TypeScript hỗ trợ tốt

### Ưu nhược điểm / Pros & Cons

| Ưu điểm          | Nhược điểm             |
| ---------------- | ---------------------- |
| - Type-safe APIs | Learning curve         |
| - Expressive     | Có thể phức tạp        |
| - Maintainable   | Debugging khó          |
| - Built-in       | Performance impact nhỏ |

### Ví dụ:

```typescript
// Use case 1: Event handlers
type Event = "click" | "keydown" | "keyup" | "submit" | "change";

type EventHandler = `on${Capitalize<Event>}`;

interface EventHandlers {
  onClick: (event: MouseEvent) => void;
  onKeydown: (event: KeyboardEvent) => void;
  onKeyup: (event: KeyboardEvent) => void;
  onSubmit: (event: SubmitEvent) => void;
  onChange: (event: Event) => void;
}

function addEventHandler<K extends EventHandler>(
  element: HTMLElement | HTMLFormElement,
  event: K,
  handler: EventHandlers[K],
) {
  element.addEventListener(event.toLowerCase(), handler);
}

// Use case 2: API endpoints
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type Resource = "users" | "posts" | "comments" | "products";

type ApiEndpoint = `${HttpMethod} /api/${Resource}`;
type ApiEndpointWithId = `${HttpMethod} /api/${Resource}/:id`;

interface ApiEndpoints {
  "GET /api/users": () => Promise<User[]>;
  "GET /api/users/:id": (id: number) => Promise<User>;
  "POST /api/users": (data: CreateUserDto) => Promise<User>;
  "PUT /api/users/:id": (id: number, data: UpdateUserDto) => Promise<User>;
  "DELETE /api/users/:id": (id: number) => Promise<void>;
}

function callApi<E extends keyof ApiEndpoints>(
  endpoint: E,
  ...args: Parameters<ApiEndpoints[E]>
): ReturnType<ApiEndpoints[E]> {
  // Implementation
  return null as any;
}

// Use case 3: CSS classes
type Color = "red" | "green" | "blue" | "yellow";
type Size = "small" | "medium" | "large" | "extra-large";
type Variant = "primary" | "secondary" | "tertiary" | "danger";

type ButtonClass = `btn-${Color}-${Size}-${Variant}`;
type ButtonClassSimple = `btn-${Color}`;
type ButtonClassWithVariant = `btn-${Color}-${Variant}`;

function setButtonClass(element: HTMLButtonElement, className: ButtonClass) {
  element.className = className;
}

// Use case 4: Routing
type Route = "home" | "about" | "contact" | "products" | "product-detail";
type RouteWithParams = `${Route}/:id`;

type Routes = {
  home: "/";
  about: "/about";
  contact: "/contact";
  products: "/products";
  "product-detail": "/products/:id";
};

type RoutePath = Routes[keyof Routes];

function navigate(route: RoutePath, params?: Record<string, string>) {
  let path = route;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value);
    });
  }
  window.history.pushState({}, "", path);
}

// Use case 5: Form validation
type FieldName = "username" | "email" | "password" | "confirmPassword";

type ValidationError = `${FieldName} is required` | `${FieldName} is invalid`;

interface FormErrors {
  username?: ValidationError;
  email?: ValidationError;
  password?: ValidationError;
  confirmPassword?: ValidationError;
}

function validateForm(formData: Record<FieldName, string>): FormErrors {
  const errors: FormErrors = {};

  if (!formData.username) {
    errors.username = "username is required";
  }

  if (!formData.email) {
    errors.email = "email is required";
  } else if (!formData.email.includes("@")) {
    errors.email = "email is invalid";
  }

  return errors;
}

// Use case 6: Internationalization
type Language = "en" | "vi" | "ja" | "ko";

type TranslationKey = "greeting" | "farewell" | "thank_you" | "error";

type Translation = `${Language}_${TranslationKey}`;

interface Translations {
  en_greeting: "Hello";
  en_farewell: "Goodbye";
  en_thank_you: "Thank you";
  en_error: "Error";
  vi_greeting: "Xin chào";
  vi_farewell: "Tạm biệt";
  vi_thank_you: "Cảm ơn";
  vi_error: "Lỗi";
}

function translate<K extends Translation>(
  lang: Language,
  key: K,
): Translations[`${Language}_${K}`] {
  const translationKey = `${lang}_${key}` as const;
  return translations[translationKey];
}
```

### Best Practices:

```typescript
// ✅ Dùng template literal types cho event handlers
type EventHandler = `on${Capitalize<Event>}`;

// ✅ Dùng template literal types cho API endpoints
type ApiEndpoint = `${HttpMethod} /api/${Resource}`;

// ✅ Dùng template literal types cho CSS classes
type ButtonClass = `btn-${Color}-${Size}`;

// ✅ Dùng template literal types cho routing
type RoutePath = Routes[keyof Routes];

// ✅ Dùng template literal types cho form validation
type ValidationError = `${FieldName} is required`;

// ✅ Dùng template literal types cho internationalization
type Translation = `${Language}_${TranslationKey}`;

// ❌ Không nên dùng template literal types quá phức tạp
type BadExample<T> = `prefix_${T extends string ? T : never}_suffix`;

// ✅ Nên dùng conditional types với template literal types
type GoodExample<T extends string> = `prefix_${T}_suffix`;
```

---

## Tổng kết

### Bảng so sánh String Manipulation Types

| Type              | Mục đích                  | Ví dụ                               |
| ----------------- | ------------------------- | ----------------------------------- |
| `Uppercase<T>`    | Convert sang uppercase    | `Uppercase<"hello">` → `"HELLO"`    |
| `Lowercase<T>`    | Convert sang lowercase    | `Lowercase<"HELLO">` → `"hello"`    |
| `Capitalize<T>`   | Capitalize first letter   | `Capitalize<"hello">` → `"Hello"`   |
| `Uncapitalize<T>` | Uncapitalize first letter | `Uncapitalize<"Hello">` → `"hello"` |

### Best Practices chung cho Template Literal Types

1. **Đơn giản hóa**: Giữ template literal types đơn giản khi có thể
2. **Kết hợp**: Kết hợp với conditional types và mapped types
3. **Document**: Comment complex template literal types
4. **Test**: Test types với unit tests
5. **Debug**: Dùng `type` assertions để debug

### Anti-patterns cần tránh

```typescript
// ❌ Template literal types quá phức tạp
type BadExample<T> = `prefix_${T extends string ? T : never}_suffix`;

// ✅ Nên dùng conditional types
type GoodExample<T extends string> = `prefix_${T}_suffix`;

// ❌ Không dùng template literal types với non-literal types
type BadExample2 = Uppercase<string>; // ❌ Không có nghĩa

// ✅ Nên dùng với literal types
type GoodExample2 = Uppercase<"hello" | "world">; // "HELLO" | "WORLD"

// ❌ Không validate runtime
function badSetClass(element: HTMLElement, className: string) {
  element.className = className;
}

// ✅ Nên dùng template literal types
function goodSetClass(element: HTMLElement, className: ButtonClass) {
  element.className = className;
}
```

---

## Tài liệu tham khảo / References

- [TypeScript Handbook - Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
- [TypeScript Handbook - String Manipulation Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#string-manipulation-with-template-literal-types)
- [TypeScript Deep Dive - Template Literal Types](https://basarat.gitbook.io/typescript/type-system/template-literal-types)
- [TypeScript - Mapped Types with Template Literal Keys](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as)

---

_Last updated: 2026-01-30_
