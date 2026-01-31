# 26. Advanced Routing / Routing nâng cao

> Câu trả lời chi tiết về Advanced Routing với React Router / Detailed answers about Advanced Routing with React Router

---

## Code Splitting with React Router / Code Splitting với React Router

### Lazy Loading Routes

**Code Splitting** cho phép bạn chia bundle thành các phần nhỏ hơn và chỉ tải khi cần thiết, giúp giảm initial load time.

**Code Splitting** allows you to split the bundle into smaller chunks and load only when needed, reducing initial load time.

```jsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));

// Loading component
function PageLoader() {
  return <div className="page-loader">Loading page...</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### Named Exports với Lazy Loading

```jsx
// pages/Dashboard.js - Component có named export
export const Dashboard = () => {
  /* ... */
};

// Lazy load named export
const Dashboard = lazy(() =>
  import("./pages/Dashboard").then((module) => ({
    default: module.Dashboard,
  })),
);

// Hoặc sử dụng dynamic import
const Dashboard = lazy(() =>
  import("./pages/Dashboard").then((m) => ({ default: m.Dashboard })),
);
```

### Code Splitting với Error Boundary

```jsx
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const LazyComponent = lazy(() => import("./HeavyComponent"));

function RouteWithErrorBoundary() {
  return (
    <ErrorBoundary fallback={<div>Failed to load component</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
```

---

## Route Guards / Bảo vệ Routes

### Authentication Guard

**Route Guards** cho phép bạn kiểm soát quyền truy cập vào routes dựa trên authentication status.

**Route Guards** allow you to control access to routes based on authentication status.

```jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth";

function AuthGuard({ redirectTo = "/login" }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}

// Sử dụng AuthGuard
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<AuthGuard />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

### Role-based Guard

```jsx
function RoleGuard({ allowedRoles, children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

// Sử dụng RoleGuard
<Route
  path="/admin"
  element={
    <RoleGuard allowedRoles={["admin"]}>
      <AdminPanel />
    </RoleGuard>
  }
/>;
```

### Permission-based Guard

```jsx
function PermissionGuard({ requiredPermissions, children }) {
  const { user } = useAuth();

  const hasPermission = requiredPermissions.every((permission) =>
    user.permissions.includes(permission),
  );

  if (!hasPermission) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}

// Sử dụng PermissionGuard
<Route
  path="/users/create"
  element={
    <PermissionGuard requiredPermissions={["users:create"]}>
      <CreateUser />
    </PermissionGuard>
  }
/>;
```

---

## Lazy Loading Routes / Lazy Loading Routes

### Dynamic Route Loading

```jsx
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Route config
const routes = [
  {
    path: "/",
    component: lazy(() => import("./pages/Home")),
  },
  {
    path: "/about",
    component: lazy(() => import("./pages/About")),
  },
  {
    path: "/dashboard",
    component: lazy(() => import("./pages/Dashboard")),
    guard: AuthGuard,
  },
];

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route, index) => {
          const Component = route.component;
          const Guard = route.guard;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                Guard ? (
                  <Guard>
                    <Component />
                  </Guard>
                ) : (
                  <Component />
                )
              }
            />
          );
        })}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
```

---

## Custom Scroll Behavior / Scroll tùy chỉnh

### Scroll to Top on Route Change

```jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Sử dụng trong App
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>{/* Routes */}</Routes>
    </BrowserRouter>
  );
}
```

### Custom Scroll Restoration

```jsx
function ScrollRestoration() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Scroll to hash nếu có
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Scroll to top nếu không có hash
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
```

### Smooth Scroll with Navigation

```jsx
import { Link } from "react-router-dom";

function SmoothLink({ to, children, ...props }) {
  const handleClick = (e) => {
    e.preventDefault();

    // Smooth scroll
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Navigate sau khi scroll
    setTimeout(() => {
      window.location.href = to;
    }, 300);
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
```

---

## Transition Animations / Animations chuyển đổi

### Page Transition với Framer Motion

```jsx
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

function PageWrapper({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Sử dụng
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
```

### Slide Transitions

```jsx
function SlideTransition({ children }) {
  const location = useLocation();

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        key={location.pathname}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

---

## Data Routers (React Router 6.4+) / Data Routers

### Loader Functions

**Loaders** cho phép bạn fetch data trước khi render component.

**Loaders** allow you to fetch data before rendering the component.

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Loader function
async function userLoader({ params }) {
  const response = await fetch(`/api/users/${params.userId}`);
  if (!response.ok) {
    throw new Response("Not Found", { status: 404 });
  }
  return response.json();
}

// Component sử dụng data từ loader
function UserDetail() {
  const user = useLoaderData();

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Router config
const router = createBrowserRouter([
  {
    path: "/users/:userId",
    element: <UserDetail />,
    loader: userLoader,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
```

### Action Functions

**Actions** cho phép bạn handle form submissions và mutations.

**Actions** allow you to handle form submissions and mutations.

```jsx
// Action function
async function createUserAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Response("Failed to create user", { status: 400 });
  }

  return response.json();
}

// Form sử dụng action
function CreateUser() {
  const actionData = useActionData();
  const navigation = useNavigation();

  return (
    <form method="post">
      <input name="name" required />
      <input name="email" type="email" required />
      <button type="submit" disabled={navigation.state === "submitting"}>
        {navigation.state === "submitting" ? "Creating..." : "Create User"}
      </button>

      {actionData?.error && <div className="error">{actionData.error}</div>}
    </form>
  );
}

// Router config
const router = createBrowserRouter([
  {
    path: "/users/new",
    element: <CreateUser />,
    action: createUserAction,
  },
]);
```

### Error Handling với Data Routers

```jsx
// Error Boundary component
function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>{error.message || "Unknown error"}</p>
    </div>
  );
}

// Router config với error handling
const router = createBrowserRouter([
  {
    path: "/users/:userId",
    element: <UserDetail />,
    loader: userLoader,
    errorElement: <ErrorBoundary />,
  },
]);
```

---

## Tóm tắt / Summary

| Khái niệm / Concept    | Giải thích / Explanation             |
| ---------------------- | ------------------------------------ |
| **Code Splitting**     | Chia bundle thành các phần nhỏ hơn   |
| **Route Guards**       | Kiểm soát quyền truy cập routes      |
| **Lazy Loading**       | Load components khi cần thiết        |
| **Scroll Restoration** | Quản lý scroll khi đổi route         |
| **Page Transitions**   | Animations khi chuyển trang          |
| **Data Routers**       | Loaders và Actions cho data fetching |

---

## Best Practices / Thực hành tốt nhất

### 1. Code split routes lớn

```jsx
// ✅ Good - Lazy load routes nặng
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
```

### 2. Sử dụng route guards

```jsx
// ✅ Good - Bảo vệ routes cần authentication
<Route element={<AuthGuard />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>
```

### 3. Handle errors properly

```jsx
// ✅ Good - Error boundary cho data routers
<Route
  path="/users/:id"
  element={<UserDetail />}
  loader={userLoader}
  errorElement={<ErrorBoundary />}
/>
```

---

_Updated: 2026-01-30_
