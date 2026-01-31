# 20. New Hooks in React 18+ / Hooks mới trong React 18+

> Câu trả lời chi tiết về các hooks mới trong React 18+ / Detailed answers about new hooks in React 18+

---

## useId - Unique IDs

### useId là gì? / What is useId?

**`useId`** là một hook được giới thiệu trong React 18 để tạo ra unique IDs. Nó đặc biệt hữu ích cho accessibility, ví dụ như kết nối label với input.

**`useId`** is a hook introduced in React 18 to generate unique IDs. It's particularly useful for accessibility, such as connecting labels to inputs.

### Cơ bản / Basic Usage

```jsx
import { useId } from "react";

function PasswordInput() {
  const passwordHintId = useId();
  const passwordInputId = useId();

  return (
    <>
      <label htmlFor={passwordInputId}>Password</label>
      <input
        id={passwordInputId}
        type="password"
        aria-describedby={passwordHintId}
      />
      <p id={passwordHintId}>Use at least 8 characters</p>
    </>
  );
}
```

### Multiple IDs trong cùng component

```jsx
import { useId } from "react";

function FormField({ label, type, hint }) {
  // useId trả về unique ID cho mỗi lần gọi
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        aria-describedby={hintId}
        aria-invalid={!!error}
      />
      {hint && (
        <p id={hintId} className="hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="error">
          {error}
        </p>
      )}
    </div>
  );
}
```

### useId với Server Components

```jsx
// Server Component
import { useId } from "react";

function CheckboxGroup({ options, name }) {
  const groupId = useId();

  return (
    <fieldset>
      <legend>Choose options</legend>
      {options.map((option, index) => {
        const id = `${groupId}-${index}`;
        return (
          <div key={option.value}>
            <input id={id} type="checkbox" name={name} value={option.value} />
            <label htmlFor={id}>{option.label}</label>
          </div>
        );
      })}
    </fieldset>
  );
}
```

### Stability across renders

```jsx
import { useId } from "react";

function Component() {
  // ID này sẽ giữ nguyên qua các lần render
  const id = useId();

  console.log("ID:", id); // Cùng ID mỗi lần render

  return <div id={id}>Content</div>;
}
```

### Best Practices

```jsx
// ✅ Good - Dùng useId cho accessibility
function AccessibleInput({ label, error }) {
  const id = useId();
  const errorId = useId();

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && <span id={errorId}>{error}</span>}
    </>
  );
}

// ❌ Bad - Dùng useId cho key
function BadExample({ items }) {
  const id = useId();

  return (
    <ul>
      {items.map((item) => (
        // Không nên dùng useId cho key!
        <li key={`${id}-${item.id}}`}>{item.name}</li>
      ))}
    </ul>
  );
}

// ✅ Good - Dùng item.id cho key
function GoodExample({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

---

## useTransition - Non-urgent Updates

### useTransition là gì? / What is useTransition?

**`useTransition`** cho phép bạn đánh dấu một số state updates là "transitions" - nghĩa là chúng không cần thiết lập tức thì. React sẽ ưu tiên các updates quan trọng hơn trước.

**`useTransition`** allows you to mark some state updates as "transitions" - meaning they don't need immediate attention. React will prioritize more important updates first.

### Cơ bản / Basic Usage

```jsx
import { useState, useTransition } from "react";

function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState("about");

  function selectTab(nextTab) {
    // Đánh dấu update này là transition
    startTransition(() => {
      setTab(nextTab);
    });
  }

  return (
    <>
      <TabButton isActive={tab === "about"} onClick={() => selectTab("about")}>
        About
      </TabButton>
      <TabButton isActive={tab === "posts"} onClick={() => selectTab("posts")}>
        Posts (slow)
      </TabButton>
      <TabButton
        isActive={tab === "contact"}
        onClick={() => selectTab("contact")}
      >
        Contact
      </TabButton>

      <hr />

      {isPending && <span className="spinner">Loading...</span>}

      {tab === "about" && <AboutTab />}
      {tab === "posts" && <PostsTab />}
      {tab === "contact" && <ContactTab />}
    </>
  );
}
```

### useTransition với heavy computations

```jsx
import { useState, useTransition } from "react";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;

    // Update input ngay lập tức (urgent)
    setQuery(value);

    // Update kết quả tìm kiếm sau (non-urgent)
    startTransition(() => {
      const filtered = heavySearch(value);
      setResults(filtered);
    });
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />

      {isPending && <div className="loading">Searching...</div>}

      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### useTransition với data fetching

```jsx
import { useState, useTransition } from "react";

function ProductList() {
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleCategoryChange = async (newCategory) => {
    setCategory(newCategory); // Update ngay

    startTransition(async () => {
      const response = await fetch(`/api/products?category=${newCategory}`);
      const data = await response.json();
      setProducts(data);
    });
  };

  return (
    <div>
      <select
        value={category}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>

      {isPending && <div className="loading">Loading products...</div>}

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

### isPending cho UI feedback

```jsx
import { useTransition } from "react";

function ButtonWithTransition({ onClick, children, ...props }) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      onClick();
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={isPending ? "loading" : ""}
      {...props}
    >
      {isPending ? (
        <>
          <span className="spinner" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
```

---

## useDeferredValue - Deferred Updates

### useDeferredValue là gì? / What is useDeferredValue?

**`useDeferredValue`** cho phép bạn trì hoãn việc update một phần của UI khi có state update quan trọng hơn. Nó tương tự như debouncing nhưng được React quản lý trực tiếp.

**`useDeferredValue`** allows you to defer updating a part of the UI when there are more important state updates. It's similar to debouncing but managed directly by React.

### Cơ bản / Basic Usage

```jsx
import { useState, useDeferredValue } from "react";

function Typeahead() {
  const [text, setText] = useState("");
  // Trì hoãn update của list kết quả
  const deferredText = useDeferredValue(text);

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <SearchResults query={deferredText} />
    </>
  );
}
```

### useDeferredValue với heavy list rendering

```jsx
import { useState, useDeferredValue, useMemo } from "react";

function LargeList() {
  const [filter, setFilter] = useState("");
  const deferredFilter = useDeferredValue(filter);

  // Filter và render list nặng
  const filteredItems = useMemo(() => {
    return largeDataset.filter((item) =>
      item.name.toLowerCase().includes(deferredFilter.toLowerCase()),
    );
  }, [deferredFilter]);

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter items..."
      />

      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### useDeferredValue vs useTransition

```jsx
// useTransition - Khi bạn CONTROL state update
function WithTransition() {
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setFilter(value); // Update ngay

    startTransition(() => {
      // Update deferred state
      setDeferredFilter(value);
    });
  };

  return (
    <>
      <input value={filter} onChange={handleChange} />
      {isPending && <div>Loading...</div>}
      <Results query={deferredFilter} />
    </>
  );
}

// useDeferredValue - Khi bạn RECEIVE state từ props
function WithDeferredValue({ query }) {
  const deferredQuery = useDeferredValue(query);

  return <Results query={deferredQuery} />;
}
```

### useDeferredValue với search

```jsx
import { useState, useDeferredValue } from "react";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearchTerm = useDeferredValue(searchTerm);

  return (
    <div className="search-page">
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          autoFocus
        />
        {searchTerm !== deferredSearchTerm && (
          <span className="searching-indicator">Searching...</span>
        )}
      </div>

      <div className="search-results">
        <SearchResults query={deferredSearchTerm} />
      </div>
    </div>
  );
}

function SearchResults({ query }) {
  // Heavy computation chỉ chạy khi deferredQuery thay đổi
  const results = useMemo(() => {
    return performHeavySearch(query);
  }, [query]);

  if (!query) {
    return <div>Enter a search term</div>;
  }

  return (
    <ul>
      {results.map((result) => (
        <li key={result.id}>
          <h3>{result.title}</h3>
          <p>{result.snippet}</p>
        </li>
      ))}
    </ul>
  );
}
```

---

## useSyncExternalStore - External Subscriptions

### useSyncExternalStore là gì? / What is useSyncExternalStore?

**`useSyncExternalStore`** là một hook được thiết kế để subscribe và đọc từ external data sources như browser storage, media queries, hoặc các state management libraries không phải React.

**`useSyncExternalStore`** is a hook designed to subscribe and read from external data sources like browser storage, media queries, or non-React state management libraries.

### Cơ bản / Basic Usage

```jsx
import { useSyncExternalStore } from "react";

function subscribe(callback) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

function OnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);

  return (
    <div className={isOnline ? "online" : "offline"}>
      {isOnline ? "✓ Online" : "✗ Offline"}
    </div>
  );
}
```

### useSyncExternalStore với localStorage

```jsx
import { useSyncExternalStore } from "react";

function subscribeToLocalStorage(key, callback) {
  const handler = (e) => {
    if (e.key === key || e.key === null) {
      callback();
    }
  };

  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

function getFromLocalStorage(key, initialValue) {
  return () => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  };
}

function useLocalStorage(key, initialValue) {
  const store = useSyncExternalStore(
    (callback) => subscribeToLocalStorage(key, callback),
    getFromLocalStorage(key, initialValue),
  );

  const setStore = (value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("storage"));
  };

  return [store, setStore];
}

// Usage
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Current theme: {theme}
    </button>
  );
}
```

### useSyncExternalStore với Media Query

```jsx
import { useSyncExternalStore } from "react";

function useMediaQuery(query) {
  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const subscribe = (callback) => {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", callback);
    return () => {
      mediaQuery.removeEventListener("change", callback);
    };
  };

  return useSyncExternalStore(subscribe, getSnapshot);
}

// Usage
function ResponsiveComponent() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return <div>{isMobile ? <MobileNavigation /> : <DesktopNavigation />}</div>;
}
```

### useSyncExternalStore với Redux

```jsx
import { useSyncExternalStore } from "react";
import { store } from "./store";

function useSelector(selector) {
  const getSnapshot = () => selector(store.getState());

  const subscribe = (callback) => {
    const unsubscribe = store.subscribe(callback);
    return unsubscribe;
  };

  return useSyncExternalStore(subscribe, getSnapshot);
}

// Usage
function Counter() {
  const count = useSelector((state) => state.counter);

  return <div>Count: {count}</div>;
}
```

---

## useInsertionEffect - CSS-in-JS

### useInsertionEffect là gì? / What is useInsertionEffect?

**`useInsertionEffect`** là một hook được thiết kế cho CSS-in-JS libraries. Nó chạy trước các DOM mutations, cho phép inject styles trước khi layout được tính toán.

**`useInsertionEffect`** is a hook designed for CSS-in-JS libraries. It runs before DOM mutations, allowing style injection before layout is calculated.

### Cơ bản / Basic Usage

```jsx
import { useInsertionEffect } from "react";

function useCSS(css) {
  useInsertionEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [css]);
}

function StyledComponent() {
  useCSS(`
    .styled-box {
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      padding: 20px;
      border-radius: 8px;
    }
  `);

  return <div className="styled-box">Styled content</div>;
}
```

### useInsertionEffect với dynamic styles

```jsx
import { useInsertionEffect } from "react";

function useDynamicStyles(styles) {
  useInsertionEffect(() => {
    const styleElement = document.createElement("style");

    const css = Object.entries(styles)
      .map(([selector, rules]) => {
        const ruleString = Object.entries(rules)
          .map(([prop, value]) => `${prop}: ${value};`)
          .join(" ");
        return `${selector} { ${ruleString} }`;
      })
      .join("\n");

    styleElement.textContent = css;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [styles]);
}

function DynamicStyledBox({ color, size }) {
  useDynamicStyles({
    ".dynamic-box": {
      backgroundColor: color,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "8px",
    },
  });

  return <div className="dynamic-box">Dynamic styled box</div>;
}
```

### useInsertionEffect vs useEffect

```jsx
// useInsertionEffect - Chạy TRƯỚC DOM mutations
function WithInsertionEffect({ color }) {
  useInsertionEffect(() => {
    console.log("useInsertionEffect - before DOM");
    const style = document.createElement("style");
    style.textContent = `.box { background: ${color}; }`;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [color]);

  return <div className="box">Content</div>;
}

// useEffect - Chạy SAU DOM mutations
function WithEffect({ color }) {
  useEffect(() => {
    console.log("useEffect - after DOM");
    const style = document.createElement("style");
    style.textContent = `.box { background: ${color}; }`;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [color]);

  return <div className="box">Content</div>;
}
```

### Custom CSS-in-JS hook

```jsx
import { useInsertionEffect } from "react";

function createCSSInJSHook(prefix = "css") {
  let counter = 0;

  return function css(strings, ...values) {
    const className = `${prefix}-${counter++}`;

    const css = strings.reduce((acc, string, i) => {
      return acc + string + (values[i] || "");
    }, "");

    useInsertionEffect(() => {
      const style = document.createElement("style");
      style.textContent = `.${className} { ${css} }`;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }, [css]);

    return className;
  };
}

const styled = createCSSInJSHook();

// Usage
function StyledButton() {
  const buttonClass = styled`
    background: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;

  return <button className={buttonClass}>Click me</button>;
}
```

---

## Tóm tắt so sánh / Comparison Summary

| Hook                     | Mục đích / Purpose          | Use Case                              |
| ------------------------ | --------------------------- | ------------------------------------- |
| **useId**                | Tạo unique IDs              | Accessibility, label-input connection |
| **useTransition**        | Đánh dấu non-urgent updates | Heavy computations, slow rendering    |
| **useDeferredValue**     | Trì hoãn value updates      | Search, filtering large lists         |
| **useSyncExternalStore** | Subscribe external sources  | Browser APIs, external state          |
| **useInsertionEffect**   | Inject CSS trước DOM        | CSS-in-JS libraries                   |

---

## Best Practices / Thực hành tốt nhất

### 1. useId cho accessibility

```jsx
// ✅ Good
function FormField({ label, error }) {
  const id = useId();
  const errorId = useId();

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-invalid={!!error} aria-describedby={errorId} />
      {error && <span id={errorId}>{error}</span>}
    </>
  );
}
```

### 2. useTransition cho heavy updates

```jsx
// ✅ Good
function SearchComponent() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value); // Update ngay
    startTransition(() => {
      performHeavySearch(e.target.value); // Update sau
    });
  };

  return <input value={query} onChange={handleChange} />;
}
```

### 3. useDeferredValue cho derived state

```jsx
// ✅ Good
function FilteredList({ filter }) {
  const deferredFilter = useDeferredValue(filter);
  const filtered = useMemo(() => heavyFilter(deferredFilter), [deferredFilter]);

  return <List items={filtered} />;
}
```

---

_Updated: 2026-01-30_
