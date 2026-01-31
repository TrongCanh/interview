# 36. Scalability / Khả năng mở rộng

> Câu trả lời chi tiết về Scalability / Detailed answers about Scalability

---

## Folder Structure for Large Apps / Cấu trúc Folder cho Apps lớn

### Feature-based Organization / Tổ chức theo Feature

**Feature-based organization** nhóm components theo business features thay vì technical concerns.

**Feature-based organization** groups components by business features instead of technical concerns.

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ForgotPassword.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useLogin.ts
│   │   ├── api/
│   │   │   └── authApi.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── index.ts
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── types/
│   └── users/
│       ├── components/
│       ├── hooks/
│       └── api/
├── shared/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   └── useDebounce.ts
│   └── utils/
│       ├── date.ts
│       └── string.ts
├── layouts/
│   ├── MainLayout.tsx
│   └── AuthLayout.tsx
└── App.tsx
```

### Type-based Organization / Tổ chức theo Type

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   └── forms/
│       ├── FormField.tsx
│       └── Select.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useFetch.ts
│   └── useLocalStorage.ts
├── services/
│   ├── api.ts
│   └── auth.ts
├── store/
│   ├── index.ts
│   ├── slices/
│   └── selectors/
├── types/
│   ├── api.types.ts
│   └── app.types.ts
└── utils/
    ├── date.ts
    └── validation.ts
```

---

## Feature-based Organization / Tổ chức theo Feature

### Feature Module Structure

```typescript
// features/auth/index.ts
export { LoginForm } from './components/LoginForm';
export { RegisterForm } from './components/RegisterForm';
export { useAuth } from './hooks/useAuth';
export { login, register, logout } from './api/authApi';

// features/auth/components/LoginForm.tsx
import { useAuth } from '../hooks/useAuth';
import { login } from '../api/authApi';

function LoginForm() {
  const { setUser } = useAuth();
  // ... implementation
}

// features/auth/hooks/useAuth.ts
import { createContext, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
```

---

## Shared Components Library / Thư viện Components chia sẻ

### Creating Shared Components

```typescript
// shared/components/Button/Button.tsx
import { forwardRef, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`btn btn-${variant} btn-${size}`}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? <span className="spinner" /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Shared Components Index

```typescript
// shared/components/index.ts
export { Button } from "./Button";
export { Input } from "./Input";
export { Modal } from "./Modal";
export { Card } from "./Card";
export { Badge } from "./Badge";
export { Avatar } from "./Avatar";
```

### Using Shared Components

```typescript
// features/dashboard/Dashboard.tsx
import { Button, Card, Badge } from '@/shared/components';

function Dashboard() {
  return (
    <div>
      <Card>
        <h2>Statistics</h2>
        <Badge variant="success">Active</Badge>
        <Button variant="primary">View Details</Button>
      </Card>
    </div>
  );
}
```

---

## Micro-frontends with React / Micro-frontends với React

### Module Federation

**Module Federation** là một technique cho phép multiple React applications được build và deploy độc lập, sau đó compose tại runtime.

**Module Federation** is a technique that allows multiple React applications to be built and deployed independently, then composed at runtime.

```javascript
// webpack.config.js - Module Federation config
const ModuleFederationPlugin = require("@module-federation/webpack-plugin");

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./Dashboard": "./src/Dashboard",
        "./Header": "./src/Header",
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
      },
    }),
  ],
};
```

### Loading Remote Modules

```typescript
// Loading remote module
import { lazy, Suspense } from 'react';

const RemoteDashboard = lazy(() => import('dashboard/Dashboard'));
const RemoteHeader = lazy(() => import('dashboard/Header'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading header...</div>}>
        <RemoteHeader />
      </Suspense>

      <Suspense fallback={<div>Loading dashboard...</div>}>
        <RemoteDashboard />
      </Suspense>
    </div>
  );
}
```

### Micro-frontends Benefits / Lợi ích

| Lợi ích / Benefit          | Giải thích / Explanation                |
| -------------------------- | --------------------------------------- |
| **Independent Deployment** | Mỗi team có thể deploy độc lập          |
| **Technology Agnostic**    | Mỗi app có thể dùng framework khác nhau |
| **Scalable Teams**         | Teams có thể làm việc song song         |
| **Isolated Failures**      | Lỗi ở một app không ảnh hưởng app khác  |

---

## Monorepo Setup for React Apps / Thiết lập Monorepo cho React Apps

### Monorepo với Turborepo

```bash
# Cài đặt Turborepo
npm install -g turbo

# Khởi tạo monorepo
npx create-turbo@latest my-monorepo
```

```
my-monorepo/
├── apps/
│   ├── web/
│   │   ├── package.json
│   │   └── src/
│   ├── admin/
│   │   ├── package.json
│   │   └── src/
│   └── mobile/
│       ├── package.json
│       └── src/
├── packages/
│   ├── ui/
│   │   ├── package.json
│   │   └── src/
│   ├── shared/
│   │   ├── package.json
│   │   └── src/
│   └── utils/
│       ├── package.json
│       └── src/
├── turbo.json
└── package.json
```

### turbo.json Config

```json
{
  "pipeline": {
    "web": {
      "dependsOn": ["ui", "shared", "utils"]
    },
    "admin": {
      "dependsOn": ["ui", "shared", "utils"]
    },
    "mobile": {
      "dependsOn": ["ui", "shared", "utils"]
    },
    "ui": {
      "outputs": ["dist/**", "*.css"]
    }
  }
}
```

### Monorepo với Nx

```bash
# Cài đặt Nx
npx create-nx-workspace@latest my-workspace
```

```
my-workspace/
├── apps/
│   ├── web/
│   ├── admin/
│   └── mobile/
├── libs/
│   ├── ui/
│   ├── shared/
│   └── utils/
├── nx.json
└── package.json
```

---

## Tóm tắt / Summary

| Khái niệm / Concept   | Giải thích / Explanation          |
| --------------------- | --------------------------------- |
| **Feature-based Org** | Tổ chức theo business features    |
| **Type-based Org**    | Tổ chức theo technical types      |
| **Shared Components** | Components tái sử dụng xuyên apps |
| **Micro-frontends**   | Multiple apps compose tại runtime |
| **Module Federation** | Independent build và deploy       |
| **Monorepo**          | Multiple apps trong một repo      |

---

## Best Practices / Thực hành tốt nhất

### 1. Feature-based organization cho lớn apps

```
// ✅ Good - Feature-based structure
src/
├── features/
│   ├── auth/
│   ├── dashboard/
│   └── users/
└── shared/
    ├── components/
    └── utils/
```

### 2. Shared components cho tái sử dụng

```typescript
// ✅ Good - Shared components
// shared/components/Button.tsx
export const Button = ({ variant, children }) => {
  return <button className={`btn btn-${variant}`}>{children}</button>;
};
```

### 3. Monorepo cho multiple apps

```json
// ✅ Good - Monorepo với Turborepo
{
  "pipeline": {
    "web": { "dependsOn": ["ui", "shared"] },
    "admin": { "dependsOn": ["ui", "shared"] }
  }
}
```

---

_Updated: 2026-01-30_
