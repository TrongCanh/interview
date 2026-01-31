# 25. Routing (React Router) / Routing (React Router)

> Câu trả lời chi tiết về Routing với React Router / Detailed answers about Routing with React Router

---

## Client-side Routing là gì? / What is Client-side Routing?

### Định nghĩa / Definition

**Client-side Routing** là kỹ thuật quản lý navigation trong Single Page Application (SPA) bằng cách thay đổi URL và render components tương ứng mà không cần reload trang. React Router là thư viện phổ biến nhất để implement client-side routing trong React.

**Client-side Routing** is a technique for managing navigation in Single Page Applications (SPAs) by changing the URL and rendering corresponding components without reloading the page. React Router is the most popular library for implementing client-side routing in React.

### Cách hoạt động / How it works

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser URL Bar                         │
│                  https://app.com/users/123                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   React Router                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  BrowserRouter                                      │   │
│  │  - Listens to URL changes                          │   │
│  │  - Matches routes                                   │   │
│  │  - Renders matching component                        │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    React App                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  UserDetail Component                               │   │
│  │  - Fetches user data                               │   │
│  │  - Renders user information                         │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Basic Setup / Cài đặt cơ bản

### Cài đặt React Router

```bash
# React Router v6
npm install react-router-dom

# hoặc
yarn add react-router-dom
```

### Basic Router Setup

```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Navigation với Link

```jsx
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
```

---

## Route Hooks / Hooks cho Routes

### useParams - Lấy route parameters

```jsx
import { useParams } from "react-router-dom";

function UserDetail() {
  // Lấy params từ URL: /users/:userId
  const { userId } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then(setUser);
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Route definition
<Route path="/users/:userId" element={<UserDetail />} />;
```

### useLocation - Lấy thông tin location

```jsx
import { useLocation } from "react-router-dom";

function CurrentPath() {
  const location = useLocation();

  return (
    <div>
      <p>Current path: {location.pathname}</p>
      <p>Search params: {location.search}</p>
      <p>Hash: {location.hash}</p>
    </div>
  );
}

// Lấy query params
function SearchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  return <div>Searching for: {query}</div>;
}
```

### useNavigate - Programmatic navigation

```jsx
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const success = await login(credentials);

    if (success) {
      // Navigate sau khi login thành công
      navigate("/dashboard");
    }
  };

  const handleGoBack = () => {
    // Quay lại trang trước
    navigate(-1);
  };

  const handleGoForward = () => {
    // Đi tới trang tiếp theo
    navigate(1);
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Form fields */}
      <button type="submit">Login</button>
      <button type="button" onClick={handleGoBack}>
        Back
      </button>
    </form>
  );
}
```

---

## Protected Routes / Routes được bảo vệ

### Protected Route Component

```jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth";

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect về login nếu chưa authenticated
    return <Navigate to="/login" replace />;
  }

  // Render child routes
  return <Outlet />;
}

// Sử dụng ProtectedRoute
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

### Role-based Protected Routes

```jsx
function RoleProtectedRoute({ allowedRoles }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

// Sử dụng
<Route element={<RoleProtectedRoute allowedRoles={["admin", "moderator"]} />}>
  <Route path="/admin" element={<AdminPanel />} />
  <Route path="/moderation" element={<ModerationPanel />} />
</Route>;
```

---

## Nested Routes / Routes lồng nhau

### Basic Nested Routes

```jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="users" element={<Users />}>
            <Route path=":userId" element={<UserDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div>
      <Navigation />
      {/* Outlet render child routes */}
      <Outlet />
      <Footer />
    </div>
  );
}
```

### Nested Routes với Outlet

```jsx
import { Outlet, Link } from "react-router-dom";

function UsersPage() {
  return (
    <div className="users-page">
      <aside className="users-sidebar">
        <h2>Users</h2>
        <ul>
          <li>
            <Link to="/users/1">User 1</Link>
          </li>
          <li>
            <Link to="/users/2">User 2</Link>
          </li>
          <li>
            <Link to="/users/3">User 3</Link>
          </li>
        </ul>
      </aside>

      <main className="users-content">
        {/* Outlet render UserDetail hoặc UserList */}
        <Outlet />
      </main>
    </div>
  );
}

// Routes
<Route path="users" element={<UsersPage />}>
  <Route index element={<UserList />} />
  <Route path=":userId" element={<UserDetail />} />
</Route>;
```

---

## Route Parameters / Parameters của Route

### Dynamic Routes

```jsx
// Route với parameter
<Route path="/products/:productId" element={<ProductDetail />} />;

// Lấy parameter
function ProductDetail() {
  const { productId } = useParams();

  // productId là giá trị từ URL
  // /products/123 -> productId = "123"

  return <div>Product ID: {productId}</div>;
}
```

### Multiple Parameters

```jsx
// Route với nhiều parameters
<Route path="/users/:userId/posts/:postId" element={<PostDetail />} />;

function PostDetail() {
  const { userId, postId } = useParams();

  return (
    <div>
      <p>User ID: {userId}</p>
      <p>Post ID: {postId}</p>
    </div>
  );
}
```

### Optional Parameters

```jsx
// Optional parameter với ?
<Route path="/users/:userId?" element={<UserPage />} />;

function UserPage() {
  const { userId } = useParams();

  // /users -> userId = undefined
  // /users/123 -> userId = "123"

  if (userId) {
    return <UserDetail userId={userId} />;
  }

  return <UserList />;
}
```

---

## Query Parameters / Query Parameters

### Reading Query Parameters

```jsx
import { useSearchParams } from "react-router-dom";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Lấy query params
  const query = searchParams.get("q");
  const page = searchParams.get("page") || "1";
  const category = searchParams.get("category");

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      <p>Page: {page}</p>
      {category && <p>Category: {category}</p>}
    </div>
  );
}
```

### Updating Query Parameters

```jsx
function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Update query params
    setSearchParams({
      q: formData.get("query"),
      category: formData.get("category"),
    });
  };

  const clearFilters = () => {
    // Xóa tất cả query params
    setSearchParams({});
  };

  return (
    <form onSubmit={handleSearch}>
      <input name="query" placeholder="Search..." />
      <select name="category">
        <option value="">All categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      <button type="submit">Search</button>
      <button type="button" onClick={clearFilters}>
        Clear
      </button>
    </form>
  );
}
```

---

## Programmatic Navigation / Navigation theo lập trình

### useNavigate Hook

```jsx
import { useNavigate } from "react-router-dom";

function NavigationExamples() {
  const navigate = useNavigate();

  // Navigate đến path cụ thể
  const goToHome = () => navigate("/");

  // Navigate với state
  const goToProfile = () => {
    navigate("/profile", {
      state: { from: "dashboard" },
    });
  };

  // Navigate với query params
  const goToSearch = () => {
    navigate("/search?q=react&page=1");
  };

  // Replace current history entry
  const replaceCurrent = () => {
    navigate("/new-path", { replace: true });
  };

  // Navigate back/forward
  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);

  return (
    <div>
      <button onClick={goToHome}>Go Home</button>
      <button onClick={goToProfile}>Go to Profile</button>
      <button onClick={goToSearch}>Search</button>
      <button onClick={goBack}>Back</button>
    </div>
  );
}
```

### Navigation với Link

```jsx
import { Link } from "react-router-dom";

function NavigationLinks() {
  return (
    <nav>
      {/* Basic link */}
      <Link to="/">Home</Link>

      {/* Link với query params */}
      <Link to="/search?q=react">Search React</Link>

      {/* Link với hash */}
      <Link to="/about#team">Team</Link>

      {/* Link với state */}
      <Link to="/profile" state={{ from: "navigation" }}>
        Profile
      </Link>

      {/* Replace current URL */}
      <Link to="/new-page" replace>
        Replace
      </Link>
    </nav>
  );
}
```

---

## Tóm tắt / Summary

| Hook / Component    | Mục đích / Purpose                      |
| ------------------- | --------------------------------------- |
| **BrowserRouter**   | Provider cho client-side routing        |
| **Routes, Route**   | Định nghĩa routes                       |
| **Link**            | Navigation component                    |
| **useParams**       | Lấy route parameters                    |
| **useLocation**     | Lấy thông tin location hiện tại         |
| **useNavigate**     | Programmatic navigation                 |
| **useSearchParams** | Lấy và update query params              |
| **Outlet**          | Render child routes trong nested routes |

---

## Best Practices / Thực hành tốt nhất

### 1. Sử dụng Link thay vì anchor tags

```jsx
// ❌ Bad - Sử dụng anchor tag
<a href="/about">About</a>

// ✅ Good - Sử dụng Link
<Link to="/about">About</Link>
```

### 2. Protected routes với Outlet

```jsx
// ✅ Good - Protected route với Outlet
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/settings" element={<Settings />} />
</Route>
```

### 3. Lazy load routes

```jsx
// ✅ Good - Lazy load routes
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

---

_Updated: 2026-01-30_
