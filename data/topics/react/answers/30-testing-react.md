# 30. Testing React / Testing React

> Câu trả lời chi tiết về Testing React / Detailed answers about Testing React

---

## Jest vs Vitest / Jest vs Vitest

### Jest là gì? / What is Jest?

**Jest** là một JavaScript testing framework được phát triển bởi Facebook. Nó cung cấp everything cần thiết để test JavaScript applications.

**Jest** is a JavaScript testing framework developed by Facebook. It provides everything needed to test JavaScript applications.

### Vitest là gì? / What is Vitest?

**Vitest** là một blazing fast unit test framework với native ESM support, được thiết kế để thay thế Jest trong Vite projects.

**Vitest** is a blazing fast unit test framework with native ESM support, designed to replace Jest in Vite projects.

### So sánh / Comparison

| Đặc điểm / Feature   | Jest         | Vitest       |
| -------------------- | ------------ | ------------ |
| **Speed**            | Trung bình   | Rất nhanh    |
| **ESM Support**      | Cần config   | Native       |
| **Config**           | Phức tạp hơn | Đơn giản hơn |
| **Watch Mode**       | Chậm hơn     | Nhanh hơn    |
| **Vite Integration** | Cần plugin   | Native       |
| **Mocking**          | Built-in     | Built-in     |

### Cài đặt Jest

```bash
# Với Create React App
npx create-react-app my-app --template cra-template

# Hoặc cài đặt thủ công
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Cài đặt Vitest

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### Config Jest

```javascript
// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/main.tsx",
    "!src/vite-env.d.ts",
  ],
};
```

### Config Vitest

```javascript
// vitest.config.js
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
```

---

## React Testing Library

### React Testing Library là gì? / What is React Testing Library?

**React Testing Library** là một set của helpers giúp bạn test React components theo cách người dùng tương tác với chúng.

**React Testing Library** is a set of helpers that help you test React components in the way users interact with them.

### Cài đặt React Testing Library

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Basic Usage / Cơ bản

```jsx
// Counter.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter", () => {
  it("renders initial count as 0", () => {
    render(<Counter />);

    // Tìm element bằng text
    const countElement = screen.getByText("Count: 0");
    expect(countElement).toBeInTheDocument();
  });

  it("increments count when + button is clicked", () => {
    render(<Counter />);

    // Tìm button bằng text
    const incrementButton = screen.getByText("+");

    // Click button
    fireEvent.click(incrementButton);

    // Kiểm tra count đã tăng
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  it("decrements count when - button is clicked", () => {
    render(<Counter />);

    const decrementButton = screen.getByText("-");
    fireEvent.click(decrementButton);

    expect(screen.getByText("Count: -1")).toBeInTheDocument();
  });
});
```

### Queries / Truy vấn

```jsx
import { render, screen } from "@testing-library/react";

describe("Queries", () => {
  it("gets by text", () => {
    render(<div>Hello World</div>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("gets by role", () => {
    render(<button>Submit</button>);
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("gets by label text", () => {
    render(
      <label>
        Email
        <input type="email" />
      </label>,
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("gets by placeholder", () => {
    render(<input placeholder="Search..." />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("gets by test id (not recommended)", () => {
    render(<div data-testid="custom-element">Content</div>);
    expect(screen.getByTestId("custom-element")).toBeInTheDocument();
  });
});
```

### User Interactions / Tương tác người dùng

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("User Interactions", () => {
  it("types in input", async () => {
    render(<input placeholder="Type here..." />);
    const input = screen.getByPlaceholderText("Type here...");

    // Sử dụng userEvent thay vì fireEvent
    await userEvent.type(input, "Hello World");

    expect(input).toHaveValue("Hello World");
  });

  it("clicks button", async () => {
    const handleClick = jest.fn();
    render(<button onClick={handleClick}>Click me</button>);

    const button = screen.getByRole("button", { name: "Click me" });
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("selects from dropdown", async () => {
    render(
      <select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </select>,
    );

    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "2");

    expect(select).toHaveValue("2");
  });
});
```

---

## Testing Hooks / Testing Hooks

### Testing với React Hooks Testing Library

```bash
npm install --save-dev @testing-library/react-hooks
```

```jsx
// useCounter.test.js
import { renderHook, act } from "@testing-library/react-hooks";
import useCounter from "./useCounter";

describe("useCounter", () => {
  it("should initialize with default value", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });

  it("should increment count", () => {
    const { result } = renderHook(() => useCounter());

    // Wrap state updates với act
    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it("should decrement count", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });

  it("should reset count", () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(0);
  });
});
```

### Testing async hooks

```jsx
// useFetch.test.js
import { renderHook, waitFor } from "@testing-library/react-hooks";
import useFetch from "./useFetch";

describe("useFetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch data successfully", async () => {
    const mockData = { name: "John" };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    const { result } = renderHook(() => useFetch("/api/user"));

    // Đợi data được fetch
    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle error", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      }),
    );

    const { result } = renderHook(() => useFetch("/api/user"));

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    expect(result.current.loading).toBe(false);
  });
});
```

---

## Integration Testing / Testing tích hợp

### Testing Component với Context

```jsx
// AuthContext.test.js
import { render, screen } from "@testing-library/react";
import AuthProvider, { useAuth } from "./AuthContext";
import Login from "./Login";

// Helper function
function renderWithProviders(ui) {
  return render(<AuthProvider>{ui}</AuthProvider>);
}

describe("Login with AuthContext", () => {
  it("should login user", async () => {
    renderWithProviders(<Login />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password");
    await userEvent.click(submitButton);

    // Kiểm tra user đã được login
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

### Testing với Router

```jsx
// Navigation.test.js
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./Navigation";

describe("Navigation", () => {
  it("renders navigation links", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("navigates to different routes", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <Navigation />
        <Routes>
          <Route path="/about" element={<div>About Page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("About Page")).toBeInTheDocument();
  });
});
```

---

## E2E Testing (Cypress, Playwright) / E2E Testing

### Cypress là gì? / What is Cypress?

**Cypress** là một end-to-end testing framework cho web applications. Nó chạy trực tiếp trong browser và mô phỏng user interactions.

**Cypress** is an end-to-end testing framework for web applications. It runs directly in the browser and simulates user interactions.

### Cài đặt Cypress

```bash
npm install --save-dev cypress
npx cypress open
```

### Cypress Test Example

```javascript
// cypress/e2e/login.cy.js
describe("Login Flow", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should login with valid credentials", () => {
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();

    // Kiểm tra đã navigate đến dashboard
    cy.url().should("include", "/dashboard");
    cy.contains("Welcome").should("be.visible");
  });

  it("should show error with invalid credentials", () => {
    cy.get('input[name="email"]').type("invalid@example.com");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();

    // Kiểm tra error message
    cy.contains("Invalid credentials").should("be.visible");
  });
});
```

### Playwright là gì? / What is Playwright?

**Playwright** là một end-to-end testing framework được phát triển bởi Microsoft. Nó hỗ trợ multiple browsers và có tính năng powerful.

**Playwright** is an end-to-end testing framework developed by Microsoft. It supports multiple browsers and has powerful features.

### Cài đặt Playwright

```bash
npm install --save-dev @playwright/test
npx playwright install
```

### Playwright Test Example

```javascript
// tests/login.spec.js
import { test, expect } from "@playwright/test";

test.describe("Login Flow", () => {
  test("should login with valid credentials", async ({ page }) => {
    await page.goto("/login");

    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password");
    await page.click('button[type="submit"]');

    // Kiểm tra URL
    await expect(page).toHaveURL(/.*dashboard/);

    // Kiểm tra content
    await expect(page.locator("text=Welcome")).toBeVisible();
  });

  test("should show error with invalid credentials", async ({ page }) => {
    await page.goto("/login");

    await page.fill('input[name="email"]', "invalid@example.com");
    await page.fill('input[name="password"]', "wrongpassword");
    await page.click('button[type="submit"]');

    // Kiểm tra error message
    await expect(page.locator("text=Invalid credentials")).toBeVisible();
  });
});
```

---

## Testing Library Philosophy / Triết lý Testing Library

### Testing User Behavior vs Implementation

**Testing Library Philosophy** khuyến nghị testing user behavior thay vì implementation details.

**Testing Library Philosophy** recommends testing user behavior instead of implementation details.

```jsx
// ❌ Bad - Testing implementation details
test('renders a div with class "counter"', () => {
  render(<Counter />);
  const div = document.querySelector(".counter");
  expect(div).toBeInTheDocument();
});

// ✅ Good - Testing user behavior
test("displays the current count", () => {
  render(<Counter />);
  expect(screen.getByText("Count: 0")).toBeInTheDocument();
});
```

### The more your tests resemble the way your software is used, the more confidence they can give you.

**Quan trọng:** Tests càng giống cách người dùng sử dụng software, càng có giá trị.

```jsx
// ✅ Good - Test như user
test("user can add a todo", async () => {
  render(<TodoApp />);

  const input = screen.getByPlaceholderText("Add a todo...");
  const button = screen.getByRole("button", { name: "Add" });

  await userEvent.type(input, "Buy groceries");
  await userEvent.click(button);

  expect(screen.getByText("Buy groceries")).toBeInTheDocument();
});
```

---

## Tóm tắt / Summary

| Công cụ / Tool                   | Mục đích / Purpose               |
| -------------------------------- | -------------------------------- |
| **Jest**                         | Testing framework cho JavaScript |
| **Vitest**                       | Fast testing framework cho Vite  |
| **React Testing Library**        | Test React components            |
| **@testing-library/react-hooks** | Test custom hooks                |
| **Cypress**                      | E2E testing framework            |
| **Playwright**                   | E2E testing framework            |

---

## Best Practices / Thực hành tốt nhất

### 1. Test user behavior

```jsx
// ✅ Good - Test user behavior
test("user can submit form", async () => {
  render(<LoginForm />);
  await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
  await userEvent.click(screen.getByRole("button", { name: "Submit" }));
  expect(screen.getByText("Success!")).toBeInTheDocument();
});
```

### 2. Sử dụng getByRole thay vì getByTestId

```jsx
// ❌ Bad - getByTestId
expect(screen.getByTestId("submit-button")).toBeInTheDocument();

// ✅ Good - getByRole
expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
```

### 3. Use userEvent thay vì fireEvent

```jsx
// ❌ Bad - fireEvent
fireEvent.click(button);

// ✅ Good - userEvent
await userEvent.click(button);
```

---

_Updated: 2026-01-30_
