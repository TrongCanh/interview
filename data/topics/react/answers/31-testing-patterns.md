# 31. Testing Patterns / Mẫu Testing

> Câu trả lời chi tiết về Testing Patterns / Detailed answers about Testing Patterns

---

## Testing User Behavior vs Implementation / Testing User Behavior vs Implementation

### Testing User Behavior

**Testing User Behavior** tập trung vào cách người dùng tương tác với application, không phải implementation details.

**Testing User Behavior** focuses on how users interact with the application, not implementation details.

```jsx
// ❌ Bad - Testing implementation details
test('renders a div with class "counter"', () => {
  render(<Counter />);
  const div = document.querySelector(".counter");
  expect(div).toBeInTheDocument();
});

test("calls increment function when button is clicked", () => {
  const increment = jest.fn();
  render(<Counter onIncrement={increment} />);
  fireEvent.click(screen.getByText("+"));
  expect(increment).toHaveBeenCalled();
});

// ✅ Good - Testing user behavior
test("displays the current count", () => {
  render(<Counter />);
  expect(screen.getByText("Count: 0")).toBeInTheDocument();
});

test("user can increment the count", async () => {
  render(<Counter />);
  await userEvent.click(screen.getByRole("button", { name: "Increment" }));
  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});
```

---

## Mocking in React Tests / Mocking trong React Tests

### Mocking Functions

```jsx
// Mocking function với jest.fn()
test('calls onClick when button is clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  await userEvent.click(screen.getByRole('button'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});

// Mocking function với implementation
test('calls onClick with correct arguments', () => {
  const handleClick = jest.fn((e) => e.preventDefault());
  render(<Button onClick={handleClick}>Click me</Button>);

  await userEvent.click(screen.getByRole('button'));

  expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
});
```

### Mocking Modules

```jsx
// Mocking API module
jest.mock("./api", () => ({
  fetchUsers: jest.fn(() =>
    Promise.resolve([
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ]),
  ),
}));

test("displays users from API", async () => {
  render(<UserList />);

  await waitFor(() => {
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });
});
```

### Mocking React Hooks

```jsx
// Mocking custom hook
jest.mock("./useAuth", () => ({
  useAuth: jest.fn(() => ({
    isAuthenticated: true,
    user: { name: "John" },
  })),
}));

test("renders user info when authenticated", () => {
  render(<UserProfile />);

  expect(screen.getByText("John")).toBeInTheDocument();
});
```

---

## Testing Async Operations / Testing Operations Bất đồng bộ

### Testing with waitFor

```jsx
import { render, screen, waitFor } from "@testing-library/react";

test("displays data after fetching", async () => {
  render(<UserList />);

  // Đợi element xuất hiện
  await waitFor(() => {
    expect(screen.getByText("John")).toBeInTheDocument();
  });
});
```

### Testing with findBy

```jsx
test("finds element asynchronously", async () => {
  render(<UserList />);

  // findBy tự động đợi element xuất hiện
  const userElement = await screen.findByText("John");
  expect(userElement).toBeInTheDocument();
});
```

### Testing with waitForElementToBeRemoved

```jsx
test("removes loading indicator after data loads", async () => {
  render(<UserList />);

  // Đợi loading element được remove
  await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

  expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
});
```

### Testing Promises

```jsx
test("resolves with correct data", async () => {
  const result = await fetchData();

  expect(result).toEqual({ name: "John" });
});

test("rejects with error", async () => {
  await expect(fetchData()).rejects.toThrow("Network error");
});
```

---

## Testing Context Providers / Testing Context Providers

### Testing với Custom Provider Wrapper

```jsx
// Helper function để render với provider
function renderWithProviders(ui, { providerProps = {} } = {}) {
  return render(
    <ThemeProvider value={providerProps.theme || "light"}>
      <AuthProvider value={providerProps.auth || { isAuthenticated: true }}>
        {ui}
      </AuthProvider>
    </ThemeProvider>,
  );
}

test("renders with light theme", () => {
  renderWithProviders(<Component />, { theme: "light" });

  expect(screen.getByTestId("app")).toHaveClass("light-theme");
});

test("renders with dark theme", () => {
  renderWithProviders(<Component />, { theme: "dark" });

  expect(screen.getByTestId("app")).toHaveClass("dark-theme");
});
```

### Testing Context Values

```jsx
import { renderHook, act } from '@testing-library/react-hooks';

test('provides correct context values', () => {
  const { result } = renderHook(() => useContext(AuthContext), {
    wrapper: ({ children }) => (
      <AuthProvider value={{ isAuthenticated: true, user: { name: 'John' }}>
        {children}
      </AuthProvider>
    )
  });

  expect(result.current.isAuthenticated).toBe(true);
  expect(result.current.user.name).toBe('John');
});
```

---

## Testing Custom Hooks / Testing Custom Hooks

### Testing với renderHook

```jsx
import { renderHook, act, waitFor } from "@testing-library/react-hooks";

describe("useCounter", () => {
  it("should initialize with default value", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it("should increment count", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it("should handle async operations", async () => {
    const { result } = renderHook(() => useAsyncCounter());

    act(() => {
      result.current.incrementAsync();
    });

    await waitFor(() => {
      expect(result.current.count).toBe(1);
    });
  });
});
```

### Testing Hook Dependencies

```jsx
describe("useFetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch data when URL changes", async () => {
    const mockData = { name: "John" };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    const { result, rerender } = renderHook(({ url }) => useFetch(url), {
      initialProps: { url: "/api/user" },
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });

    // Rerender với URL mới
    const newMockData = { name: "Jane" };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(newMockData),
      }),
    );

    rerender({ url: "/api/user/2" });

    await waitFor(() => {
      expect(result.current.data).toEqual(newMockData);
    });
  });
});
```

---

## Snapshot Testing - Pros/Cons / Snapshot Testing - Ưu/Nhược điểm

### Snapshot Testing là gì? / What is Snapshot Testing?

**Snapshot Testing** là một technique để capture output của component và so sánh với snapshot đã lưu.

**Snapshot Testing** is a technique to capture component output and compare with saved snapshot.

### Basic Snapshot Test

```jsx
import { render } from "@testing-library/react";

test("matches snapshot", () => {
  const { asFragment } = render(<UserProfile user={{ name: "John" }} />);
  expect(asFragment()).toMatchSnapshot();
});
```

### Inline Snapshots

```jsx
test("matches inline snapshot", () => {
  const { asFragment } = render(<UserProfile user={{ name: "John" }} />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <div>
      <h1>John</h1>
    </div>
  `);
});
```

### Pros of Snapshot Testing / Ưu điểm

- **Quick to write** - Viết nhanh
- **Catches unintended changes** - Phát hiện các thay đổi không mong muốn
- **Good for regression testing** - Tốt cho regression testing

### Cons of Snapshot Testing / Nhược điểm

- **False positives** - Có thể báo lỗi khi chỉ là style change
- **Don't test behavior** - Không test behavior
- **Maintenance overhead** - Cần update snapshots thường xuyên

```jsx
// ❌ Bad - Rely too much on snapshots
test("component matches snapshot", () => {
  render(<ComplexComponent />);
  expect(asFragment()).toMatchSnapshot();
});

// ✅ Good - Combine with behavior tests
test("component renders correctly and user can interact", async () => {
  render(<ComplexComponent />);

  // Test behavior
  expect(screen.getByText("Title")).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "Submit" }));
  expect(screen.getByText("Success!")).toBeInTheDocument();

  // Optional: snapshot
  expect(asFragment()).toMatchSnapshot();
});
```

---

## Tóm tắt / Summary

| Pattern / Mẫu             | Mục đích / Purpose       |
| ------------------------- | ------------------------ |
| **User Behavior Testing** | Test cách user tương tác |
| **Mocking**               | Isolate dependencies     |
| **Async Testing**         | Test async operations    |
| **Context Testing**       | Test context providers   |
| **Hook Testing**          | Test custom hooks        |
| **Snapshot Testing**      | Catch unintended changes |

---

## Best Practices / Thực hành tốt nhất

### 1. Test user behavior, not implementation

```jsx
// ✅ Good - Test user behavior
test("user can submit form", async () => {
  render(<LoginForm />);
  await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
  await userEvent.click(screen.getByRole("button", { name: "Login" }));
  expect(screen.getByText("Success!")).toBeInTheDocument();
});
```

### 2. Mock external dependencies

```jsx
// ✅ Good - Mock API calls
jest.mock("./api", () => ({
  fetchUsers: jest.fn(() => Promise.resolve(mockUsers)),
}));
```

### 3. Use waitFor cho async operations

```jsx
// ✅ Good - Use waitFor cho async
test("displays data after loading", async () => {
  render(<UserList />);
  await waitFor(() => {
    expect(screen.getByText("John")).toBeInTheDocument();
  });
});
```

---

_Updated: 2026-01-30_
