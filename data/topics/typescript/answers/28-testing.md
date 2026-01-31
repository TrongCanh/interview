# 28. Testing

## Tổng quan về Testing với TypeScript

### Mục đích của Testing với TypeScript / Purpose

**Testing với TypeScript** - Viết tests với type safety để catch errors sớm hơn.

**Mục đích chính:**

- Type safety cho test code
- Catch errors tại compile-time
- Better test documentation
- Refactor tests an toàn hơn
- Better developer experience

### Khi nào cần hiểu về Testing với TypeScript / When to Use

Hiểu về Testing với TypeScript là cần thiết khi:

- Xây dựng TypeScript applications
- Viết unit tests
- Viết integration tests
- Làm việc với testing frameworks
- Test type-safe code

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile-time
- **IntelliSense**: IntelliSense hoạt động tốt hơn
- **Documentation**: Types là documentation tự động
- **Refactoring**: Refactor tests an toàn hơn
- **Better DX**: Developer experience tốt hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm              |
| --------------- | ----------------------- |
| - Type safety   | Cần maintain types      |
| - IntelliSense  | Learning curve          |
| - Documentation | Có thể verbose          |
| - Refactoring   | Có thể over-engineering |

---

## Jest với TypeScript?

**Jest với TypeScript** - Viết tests với Jest và TypeScript.

### Mục đích / Purpose

Viết type-safe tests với Jest.

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng               |
| ------------------- | -------------------------- |
| - Unit tests        | Khi viết unit tests        |
| - Integration tests | Khi viết integration tests |
| - Snapshot tests    | Khi viết snapshot tests    |
| - Mock types        | Khi mock functions         |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile-time
- **IntelliSense**: IntelliSense hoạt động tốt hơn
- **Documentation**: Types là documentation tự động
- **Refactoring**: Refactor tests an toàn hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm              |
| --------------- | ----------------------- |
| - Type safety   | Cần ts-jest             |
| - IntelliSense  | Learning curve          |
| - Documentation | Có thể verbose          |
| - Refactoring   | Có thể over-engineering |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Jest với TypeScript
import { sum, subtract } from "./math";

describe("Math functions", () => {
  test("sum adds two numbers", () => {
    const result: number = sum(1, 2);
    expect(result).toBe(3);
  });

  test("subtract subtracts two numbers", () => {
    const result: number = subtract(5, 3);
    expect(result).toBe(2);
  });
});

// Ví dụ: Jest với types
interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): User {
  return {
    id,
    name: "Alice",
    email: "alice@example.com",
  };
}

describe("getUser", () => {
  test("returns user with correct id", () => {
    const user: User = getUser(1);
    expect(user.id).toBe(1);
    expect(user.name).toBe("Alice");
    expect(user.email).toBe("alice@example.com");
  });
});

// Ví dụ thực tế: Jest với async functions
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

describe("fetchUser", () => {
  test("fetches user from API", async () => {
    const user: User = await fetchUser(1);
    expect(user.id).toBe(1);
    expect(user.name).toBeDefined();
    expect(user.email).toBeDefined();
  });
});

// Ví dụ thực tế: Jest với mocks
interface ApiService {
  getUser(id: number): Promise<User>;
}

class MockApiService implements ApiService {
  getUser(id: number): Promise<User> {
    return Promise.resolve({
      id,
      name: "Alice",
      email: "alice@example.com",
    });
  }
}

describe("MockApiService", () => {
  test("returns mock user", async () => {
    const service: ApiService = new MockApiService();
    const user: User = await service.getUser(1);
    expect(user.id).toBe(1);
    expect(user.name).toBe("Alice");
  });
});

// Ví dụ thực tế: Jest with snapshot tests
function renderUser(user: User): string {
  return `<div>${user.name} (${user.email})</div>`;
}

describe("renderUser", () => {
  test("renders user correctly", () => {
    const user: User = {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
    };

    const html: string = renderUser(user);
    expect(html).toMatchSnapshot();
  });
});
```

### Best Practices:

```typescript
// ✅ Dùng types cho test values
const result: number = sum(1, 2);
expect(result).toBe(3);

// ✅ Dùng interfaces cho test data
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

// ✅ Dùng type-safe mocks
interface ApiService {
  getUser(id: number): Promise<User>;
}

class MockApiService implements ApiService {
  getUser(id: number): Promise<User> {
    return Promise.resolve({ id, name: "Alice", email: "alice@example.com" });
  }
}

// ✅ Dùng type-safe async tests
test("fetches user from API", async () => {
  const user: User = await fetchUser(1);
  expect(user.id).toBe(1);
});

// ❌ Không nên dùng any trong tests
const result = sum(1, 2) as any; // ❌ Type unsafe
expect(result).toBe(3);

// ✅ Nên dùng specific types
const result: number = sum(1, 2); // ✅ Type safe
expect(result).toBe(3);
```

---

## Mock types?

**Mock types** - Define types cho mocks trong tests.

### Mục đích / Purpose

Define types cho mocks trong tests.

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng          |
| ------------------- | --------------------- |
| - Mock functions    | Khi mock functions    |
| - Mock classes      | Khi mock classes      |
| - Mock APIs         | Khi mock APIs         |
| - Mock dependencies | Khi mock dependencies |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile-time
- **IntelliSense**: IntelliSense hoạt động tốt hơn
- **Documentation**: Types là documentation tự động
- **Refactoring**: Refactor mocks an toàn hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm              |
| --------------- | ----------------------- |
| - Type safety   | Cần maintain types      |
| - IntelliSense  | Learning curve          |
| - Documentation | Có thể verbose          |
| - Refactoring   | Có thể over-engineering |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Mock function types
interface UserService {
  getUser(id: number): Promise<User>;
  createUser(data: CreateUserRequest): Promise<User>;
  updateUser(id: number, data: UpdateUserRequest): Promise<User>;
  deleteUser(id: number): Promise<void>;
}

const mockUserService: jest.Mocked<UserService> = {
  getUser: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

// Ví dụ: Mock class types
class Database {
  async query(sql: string, params: unknown[]): Promise<unknown[]> {
    // Implementation
    return [];
  }
}

const mockDatabase = new Database() as jest.Mocked<Database>;

// Ví dụ: Mock API types
interface ApiClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: unknown): Promise<T>;
  put<T>(url: string, data: unknown): Promise<T>;
  delete<T>(url: string): Promise<void>;
}

const mockApiClient: jest.Mocked<ApiClient> = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

// Ví dụ thực tế: Mock service with types
interface AuthService {
  login(username: string, password: string): Promise<string>;
  logout(token: string): Promise<void>;
  verify(token: string): Promise<User>;
}

const mockAuthService: jest.Mocked<AuthService> = {
  login: jest.fn(),
  logout: jest.fn(),
  verify: jest.fn(),
};

describe("AuthService", () => {
  beforeEach(() => {
    mockAuthService.login.mockClear();
    mockAuthService.logout.mockClear();
    mockAuthService.verify.mockClear();
  });

  test("login returns token", async () => {
    mockAuthService.login.mockResolvedValue("token123");

    const token: string = await mockAuthService.login("alice", "password");
    expect(token).toBe("token123");
    expect(mockAuthService.login).toHaveBeenCalledWith("alice", "password");
  });

  test("verify returns user", async () => {
    const user: User = {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
    };

    mockAuthService.verify.mockResolvedValue(user);

    const result: User = await mockAuthService.verify("token123");
    expect(result).toEqual(user);
    expect(mockAuthService.verify).toHaveBeenCalledWith("token123");
  });
});

// Ví dụ thực tế: Mock with partial implementation
interface EmailService {
  send(to: string, subject: string, body: string): Promise<void>;
}

const mockEmailService: jest.Mocked<EmailService> = {
  send: jest.fn().mockImplementation(async (to, subject, body) => {
    console.log(`Sending email to ${to}: ${subject}`);
  }),
};

describe("EmailService", () => {
  test("sends email", async () => {
    await mockEmailService.send(
      "alice@example.com",
      "Welcome",
      "Welcome to our service!",
    );

    expect(mockEmailService.send).toHaveBeenCalledWith(
      "alice@example.com",
      "Welcome",
      "Welcome to our service!",
    );
  });
});
```

### Best Practices:

```typescript
// ✅ Dùng jest.Mocked cho mock types
const mockUserService: jest.Mocked<UserService> = {
  getUser: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

// ✅ Dùng jest.MockedClass cho mock classes
const mockDatabase = new Database() as jest.Mocked<Database>;

// ✅ Dùng jest.MockedFunction cho mock functions
const mockGetUser = jest.fn<Promise<User>, [number]>();

// ✅ Dùng mockImplementation cho partial implementation
const mockEmailService: jest.Mocked<EmailService> = {
  send: jest.fn().mockImplementation(async (to, subject, body) => {
    console.log(`Sending email to ${to}: ${subject}`);
  }),
};

// ✅ Dùng mockResolvedValue cho async mocks
mockUserService.getUser.mockResolvedValue({
  id: 1,
  name: "Alice",
  email: "alice@example.com",
});

// ❌ Không nên dùng any trong mocks
const mockService = {
  getUser: jest.fn() as any, // ❌ Type unsafe
};

// ✅ Nên dùng specific types
const mockUserService: jest.Mocked<UserService> = {
  getUser: jest.fn(), // ✅ Type safe
};
```

---

## Test utilities?

**Test utilities** - Reusable utilities cho tests.

### Mục đích / Purpose

Create reusable utilities cho tests.

### Khi nào dùng / When to Use

| Tình huống       | Khi nào dùng            |
| ---------------- | ----------------------- |
| - Test helpers   | Khi cần test helpers    |
| - Test fixtures  | Khi cần test fixtures   |
| - Test factories | Khi cần test factories  |
| - Test matchers  | Khi cần custom matchers |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Reusability**: Dùng lại utilities
- **Type Safety**: Catch errors tại compile-time
- **IntelliSense**: IntelliSense hoạt động tốt hơn
- **Documentation**: Types là documentation tự động

### Ưu nhược điểm / Pros & Cons

| Ưu điểm         | Nhược điểm              |
| --------------- | ----------------------- |
| - Reusability   | Cần maintain utilities  |
| - Type safety   | Learning curve          |
| - IntelliSense  | Có thể verbose          |
| - Documentation | Có thể over-engineering |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Test factory
interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(overrides: Partial<User> = {}): User {
  return {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    ...overrides,
  };
}

describe("User", () => {
  test("creates user with default values", () => {
    const user: User = createUser();
    expect(user.id).toBe(1);
    expect(user.name).toBe("Alice");
    expect(user.email).toBe("alice@example.com");
  });

  test("creates user with overrides", () => {
    const user: User = createUser({ name: "Bob", email: "bob@example.com" });
    expect(user.id).toBe(1);
    expect(user.name).toBe("Bob");
    expect(user.email).toBe("bob@example.com");
  });
});

// Ví dụ: Test fixture
interface TestContext {
  user: User;
  token: string;
}

function createTestContext(): TestContext {
  return {
    user: createUser(),
    token: "token123",
  };
}

describe("AuthService", () => {
  let context: TestContext;

  beforeEach(() => {
    context = createTestContext();
  });

  test("verifies token", async () => {
    const user: User = await verifyToken(context.token);
    expect(user).toEqual(context.user);
  });
});

// Ví dụ thực tế: Test helper functions
function assertUser(user: User, expected: Partial<User>): void {
  Object.entries(expected).forEach(([key, value]) => {
    expect(user[key as keyof User]).toBe(value);
  });
}

describe("assertUser", () => {
  test("asserts user properties", () => {
    const user: User = {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
    };

    assertUser(user, { id: 1, name: "Alice" });
  });
});

// Ví dụ thực tế: Custom matcher
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidUser(): R;
    }
  }
}

expect.extend({
  toBeValidUser(received: unknown) {
    const pass = typeof received === "object" && received !== null;

    if (pass) {
      return {
        message: () => `expected ${received} not to be a valid user`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid user`,
        pass: false,
      };
    }
  },
});

describe("Custom matcher", () => {
  test("validates user", () => {
    const user: User = {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
    };

    expect(user).toBeValidUser();
  });
});
```

### Best Practices:

```typescript
// ✅ Dùng test factories cho reusable test data
function createUser(overrides: Partial<User> = {}): User {
  return {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    ...overrides,
  };
}

// ✅ Dùng test fixtures cho test context
interface TestContext {
  user: User;
  token: string;
}

function createTestContext(): TestContext {
  return {
    user: createUser(),
    token: "token123",
  };
}

// ✅ Dùng test helpers cho common assertions
function assertUser(user: User, expected: Partial<User>): void {
  Object.entries(expected).forEach(([key, value]) => {
    expect(user[key as keyof User]).toBe(value);
  });
}

// ✅ Dùng custom matchers cho domain-specific assertions
expect.extend({
  toBeValidUser(received: unknown) {
    const pass = typeof received === "object" && received !== null;

    if (pass) {
      return {
        message: () => `expected ${received} not to be a valid user`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid user`,
        pass: false,
      };
    }
  },
});

// ❌ Không nên dùng any trong test utilities
function badCreateUser(overrides: any = {}): any {
  return {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    ...overrides,
  };
}

// ✅ Nên dùng specific types
function goodCreateUser(overrides: Partial<User> = {}): User {
  return {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    ...overrides,
  };
}
```

---

## Tổng kết

### Bảng so sánh Testing Features

| Feature             | Mô tả                   | Use Case               |
| ------------------- | ----------------------- | ---------------------- |
| Jest với TypeScript | Type-safe tests         | Unit tests             |
| Mock types          | Type-safe mocks         | Mock functions/classes |
| Test utilities      | Reusable test utilities | Test helpers, fixtures |

### Khi nào nên dùng Testing với TypeScript

| Tình huống        | Nên dùng      |
| ----------------- | ------------- |
| Unit tests        | ✅ TypeScript |
| Integration tests | ✅ TypeScript |
| Mock types        | ✅ TypeScript |
| Test utilities    | ✅ TypeScript |

### Best Practices chung cho Testing với TypeScript

1. **Define types cho tests**: Luôn define types cho test values
2. **Dùng mock types**: Dùng type-safe mocks
3. **Create test utilities**: Dùng reusable test utilities
4. **Avoid any types**: Tránh dùng any trong tests
5. **Use type-safe assertions**: Dùng type-safe assertions

### Anti-patterns cần tránh

```typescript
// ❌ Dùng any trong tests
const result = sum(1, 2) as any; // ❌ Type unsafe
expect(result).toBe(3);

// ✅ Nên dùng specific types
const result: number = sum(1, 2); // ✅ Type safe
expect(result).toBe(3);

// ❌ Dùng any trong mocks
const mockService = {
  getUser: jest.fn() as any, // ❌ Type unsafe
};

// ✅ Nên dùng specific types
const mockUserService: jest.Mocked<UserService> = {
  getUser: jest.fn(), // ✅ Type safe
};

// ❌ Quên types trong test utilities
function badCreateUser(overrides: any = {}): any {
  return {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    ...overrides,
  };
}

// ✅ Nên dùng specific types
function goodCreateUser(overrides: Partial<User> = {}): User {
  return {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    ...overrides,
  };
}
```

---

## Tài liệu tham khảo / References

- [Jest - TypeScript](https://jestjs.io/docs/getting-started#using-typescript)
- [ts-jest](https://kulshekhar.github.io/ts-jest/)
- [Testing Library - TypeScript](https://testing-library.com/docs/typescript-testing)
- [TypeScript Handbook - Testing](https://www.typescriptlang.org/docs/handbook/intro.html)

---

_Last updated: 2026-01-30_
