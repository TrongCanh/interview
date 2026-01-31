# 16. Error Boundaries / Error Boundaries

## Error Boundary là gì?

### Trả lời / Answer:

**Error Boundary** là component React bắt lỗi trong component tree, hiển thị fallback UI thay vì crash toàn app.

### Đặc điểm:

1. **Catch errors:**
   - Bắt errors trong rendering
   - Bắt errors trong lifecycle methods
   - Bắt errors trong constructors

2. **Fallback UI:**
   - Hiển thị UI thay vì crash
   - Có thể hiển thị error message

3. **Component tree scope:**
   - Chỉ bắt errors trong component con
   - Không bắt errors trong chính nó

4. **Class component only:**
   - Chỉ có thể implement với class components
   - Functional components cần wrapper

---

### Ví dụ thực tế / Practical Example:

```jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state khi có lỗi
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log lỗi
    console.error("Error caught:", error, errorInfo);

    // Gửi đến error tracking service
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message || "Unknown error"}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Sử dụng Error Boundary
function App() {
  return (
    <ErrorBoundary>
      <Header />
      <Main />
      <Footer />
    </ErrorBoundary>
  );
}

function ProblematicComponent() {
  // Component có lỗi
  throw new Error("Something went wrong!");
}

function Main() {
  return (
    <div>
      <ProblematicComponent />
    </div>
  );
}
```

---

## Implement error boundary?

### Trả lời / Answer:

### Các lifecycle methods:

1. **static getDerivedStateFromError(error):**
   - Chạy khi có lỗi
   - Trả về state mới
   - Dùng để update state

2. **componentDidCatch(error, errorInfo):**
   - Chạy sau getDerivedStateFromError
   - Dùng để log lỗi
   - Side effects (API calls, v.v.)

---

### Ví dụ thực tế / Practical Example:

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state khi có lỗi
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log chi tiết lỗi
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);

    // Cập nhật error info
    this.setState({
      errorInfo,
    });

    // Gửi đến error tracking service
    if (window.Sentry) {
      window.Sentry.captureException(error, {
        extra: errorInfo,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Oops! Something went wrong.</h1>
          <p>{this.state.error?.message}</p>
          <details>
            <summary>Error Details</summary>
            <pre>{JSON.stringify(this.state.errorInfo, null, 2)}</pre>
          </details>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Sử dụng
function App() {
  return (
    <ErrorBoundary>
      <Header />
      <Content />
      <Footer />
    </ErrorBoundary>
  );
}
```

---

### Error Boundary với retry:

```jsx
class ErrorBoundaryWithRetry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ retryCount: this.state.retryCount + 1 });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, retryCount: 0 });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Error occurred</h1>
          <p>{this.state.error?.message}</p>
          <p>Retry attempts: {this.state.retryCount}</p>
          <button onClick={this.handleRetry}>Retry</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Sử dụng
function App() {
  return (
    <ErrorBoundaryWithRetry>
      <ProblematicComponent />
    </ErrorBoundaryWithRetry>
  );
}
```

---

## Limitations?

### Trả lời / Answer:

### Các giới hạn của Error Boundaries:

1. **Không bắt errors trong:**
   - Event handlers (onClick, onChange)
   - Async code (setTimeout, promises)
   - Server-side rendering
   - Error boundaries chính nó

2. **Chỉ class components:**
   - Functional components không có componentDidCatch
   - Cần wrapper class component

3. **Chỉ catch errors trong rendering:**
   - Không catch errors trong event handlers
   - Không catch errors trong async operations

---

### Ví dụ thực tế / Practical Example:

```jsx
// ❌ Error Boundary KHÔNG bắt lỗi này
function ComponentWithEventHandler() {
  const handleClick = () => {
    // Error trong event handler - KHÔNG được catch
    throw new Error("Error in event handler");
  };

  return <button onClick={handleClick}>Click me</button>;
}

function App() {
  return (
    <ErrorBoundary>
      <ComponentWithEventHandler />
    </ErrorBoundary>
  );
}

// ❌ Error Boundary KHÔNG bắt lỗi này
function ComponentWithAsync() {
  useEffect(() => {
    // Error trong async code - KHÔNG được catch
    fetch("/api/data")
      .then((res) => res.json())
      .catch((err) => {
        throw new Error("Error in async code");
      });
  }, []);

  return <div>Component</div>;
}

function App() {
  return (
    <ErrorBoundary>
      <ComponentWithAsync />
    </ErrorBoundary>
  );
}
```

```jsx
// ✅ Dùng try-catch cho async errors
function ComponentWithAsyncHandling() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return <div>{data}</div>;
}
```

```jsx
// ✅ Dùng try-catch cho event handlers
function ComponentWithEventHandling() {
  const [error, setError] = useState(null);

  const handleClick = () => {
    try {
      // Code có thể throw error
      throw new Error("Error in event handler");
    } catch (err) {
      setError(err);
    }
  };

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

---

### Error Boundary trong Server-Side Rendering:

```jsx
// ❌ Error Boundary KHÔNG hoạt động trong SSR
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.log("Error caught:", error);

    // Gửi đến error tracking service
    if (typeof window !== "undefined" && window.Sentry) {
      window.Sentry.captureException(error, {
        extra: errorInfo,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong</div>;
    }

    return this.props.children;
  }
}

// ✅ Dùng isBrowser check
function isBrowser() {
  return typeof window !== "undefined" && window.document !== undefined;
}

function ClientOnlyErrorBoundary({ children, fallback }) {
  if (!isBrowser()) {
    // SSR: render children trực tiếp
    return children;
  }

  // CSR: dùng Error Boundary
  return <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>;
}

// Sử dụng
function App() {
  return (
    <ClientOnlyErrorBoundary fallback={<div>Loading...</div>}>
      <Header />
      <Content />
      <Footer />
    </ClientOnlyErrorBoundary>
  );
}
```

---

## Error boundaries vs try-catch?

### Trả lời / Answer:

### So sánh chi tiết:

| Đặc điểm      | Error Boundary         | try-catch                  |
| ------------- | ---------------------- | -------------------------- |
| Bắt errors    | Rendering, lifecycle   | Event handlers, async code |
| Scope         | Component tree         | Code block                 |
| Use case      | Component-level errors | Code-level errors          |
| Fallback      | UI fallback            | Error handling             |
| React feature | Có                     | Không                      |

---

### Ví dụ thực tế / Practical Example:

```jsx
// Error Boundary - Bắt rendering errors
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <div>Error: {this.state.error?.message}</div>;
    }
    return this.props.children;
  }
}

function ComponentWithRenderError({ shouldError }) {
  if (shouldError) {
    // Error trong rendering - Error Boundary sẽ catch
    throw new Error("Render error");
  }

  return <div>Component rendered successfully</div>;
}

// Sử dụng
function App() {
  return (
    <ErrorBoundary>
      <ComponentWithRenderError shouldError={true} />
    </ErrorBoundary>
  );
}
```

```jsx
// try-catch - Bắt async errors
function ComponentWithAsyncError() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Async operation có thể throw error
        const response = await fetch("/api/data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        // try-catch bắt error
        setError(err);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return <div>{data}</div>;
}

// Sử dụng
function App() {
  return (
    <ErrorBoundary>
      <ComponentWithAsyncError />
    </ErrorBoundary>
  );
}
```

---

### Kết hợp cả hai:

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <div>Error: {this.state.error?.message}</div>;
    }
    return this.props.children;
  }
}

function ComponentWithBothErrors() {
  const [asyncError, setAsyncError] = useState(null);

  const handleAsyncClick = async () => {
    try {
      // Async error - try-catch
      await fetch("/api/data");
    } catch (err) {
      setAsyncError(err);
    }
  };

  const handleRenderClick = () => {
    // Render error - Error Boundary
    throw new Error("Render error");
  };

  return (
    <div>
      {asyncError && <div className="error">Async: {asyncError.message}</div>}
      <button onClick={handleRenderClick}>Trigger Render Error</button>
      <button onClick={handleAsyncClick}>Trigger Async Error</button>
    </div>
  );
}

// Sử dụng
function App() {
  return (
    <ErrorBoundary>
      <ComponentWithBothErrors />
    </ErrorBoundary>
  );
}
```

---

## Fallback UI patterns?

### Trả lời / Answer:

### Các patterns:

1. **Simple fallback:**
   - Hiển thị error message đơn giản
   - Có nút retry

2. **Detailed fallback:**
   - Hiển thị error details
   - Stack trace, error info

3. **Recovery fallback:**
   - Cho phép user recover
   - Nút retry, reset, v.v.

4. **Graceful degradation:**
   - Hiển thị partial UI
   - App vẫn hoạt động với tính năng giới hạn

---

### Ví dụ thực tế / Practical Example:

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h1>Oops! Something went wrong.</h1>
          <div className="error-content">
            <p>{this.state.error?.message || "Unknown error"}</p>
            {this.state.error?.stack && (
              <details>
                <summary>Stack Trace</summary>
                <pre>{this.state.error.stack}</pre>
              </details>
            )}
          </div>
          <div className="error-actions">
            <button onClick={() => window.location.reload()}>
              Reload Page
            </button>
            <button onClick={() => window.history.back()}>Go Back</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Sử dụng
function App() {
  return (
    <ErrorBoundary>
      <Header />
      <Main />
      <Footer />
    </ErrorBoundary>
  );
}
```

---

### Fallback với recovery:

```jsx
class ErrorBoundaryWithRecovery extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h1>Something went wrong</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={this.handleReset}>Try Again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Sử dụng
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/data").then(setData);
  }, []);

  return (
    <ErrorBoundaryWithRecovery>
      {data ? <Content data={data} /> : <Spinner />}
    </ErrorBoundaryWithRecovery>
  );
}
```

---

### Fallback với graceful degradation:

```jsx
class ErrorBoundaryWithGracefulDegradation extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h1>Partial Error</h1>
          <p>Some features are unavailable</p>
          <p>Error: {this.state.error?.message}</p>
          <div className="partial-ui">
            <p>Basic features still work</p>
            <button onClick={() => window.location.reload()}>Reload</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Sử dụng
function App() {
  return (
    <ErrorBoundaryWithGracefulDegradation>
      <Header />
      <Main />
      <Footer />
    </ErrorBoundaryWithGracefulDegradation>
  );
}
```

---

## Error logging integration?

### Trả lời / Answer:

### Các services error logging:

1. **Sentry:**
   - Error tracking phổ biến
   - Source maps, stack traces
   - User context

2. **LogRocket:**
   - Error tracking với UX insights
   - Breadcrumbs, session replay

3. **Bugsnag:**
   - Error tracking đơn giản
   - Real-time notifications

---

### Ví dụ thực tế / Practical Example:

```jsx
class ErrorBoundaryWithLogging extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log chi tiết lỗi
    console.error("Error:", error);
    console.error("Component Stack:", errorInfo.componentStack);
    console.error("Error Boundary Stack:", errorInfo.errorBoundary);

    // Gửi đến Sentry
    if (typeof window !== "undefined" && window.Sentry) {
      window.Sentry.withScope((scope) => {
        scope.setExtra("errorInfo", errorInfo);
        scope.captureException(error);
      });
    }

    // Gửi đến LogRocket
    if (typeof window !== "undefined" && window.logRocket) {
      window.logRocket.captureException(error, {
        extra: {
          errorInfo,
          user: { id: "user-123", name: "John Doe" },
        },
      });
    }

    // Gửi đến Bugsnag
    if (typeof window !== "undefined" && window.bugsnag) {
      window.bugsnag.notify(error, {
        severity: "error",
        metaData: { errorInfo },
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h1>Something went wrong</h1>
          <p>We've been notified about this issue.</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Sử dụng
function App() {
  return (
    <ErrorBoundaryWithLogging>
      <Header />
      <Main />
      <Footer />
    </ErrorBoundaryWithLogging>
  );
}
```

---

### Error logging với user context:

```jsx
class ErrorBoundaryWithUserContext extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Lấy user context
    const user = this.props.user;

    // Log với user context
    console.error("Error for user:", user.id, user.email, error);

    // Gửi đến Sentry với user
    if (typeof window !== "undefined" && window.Sentry) {
      window.Sentry.withScope((scope) => {
        scope.setUser({
          id: user.id,
          email: user.email,
          username: user.name,
        });
        scope.captureException(error);
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h1>Something went wrong</h1>
          <p>We're working on fixing this issue.</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Sử dụng
function App() {
  const [user, setUser] = useState({
    id: 1,
    name: "John",
    email: "john@example.com",
  });

  return (
    <ErrorBoundaryWithUserContext user={user}>
      <Header user={user} />
      <Main />
      <Footer />
    </ErrorBoundaryWithUserContext>
  );
}
```
