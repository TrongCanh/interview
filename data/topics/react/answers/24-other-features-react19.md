# 24. Other React 19 Features / Các tính năng khác trong React 19

> Câu trả lời chi tiết về các tính năng khác trong React 19 / Detailed answers about other features in React 19

---

## Asset Loading / Tải tài nguyên

### Asset Preloading

React 19 cung cấp các API mới để preload assets như images, fonts, và stylesheets.

**React 19 provides new APIs for preloading assets like images, fonts, and stylesheets.**

```jsx
// Preload image
function ImageWithPreload({ src, alt }) {
  return (
    <>
      <link rel="preload" as="image" href={src} />
      <img src={src} alt={alt} />
    </>
  );
}

// Preload font
function FontPreloader() {
  return (
    <link
      rel="preload"
      as="font"
      href="/fonts/inter.woff2"
      type="font/woff2"
      crossOrigin="anonymous"
    />
  );
}

// Preload stylesheet
function StylePreloader({ href }) {
  return <link rel="preload" as="style" href={href} />;
}
```

### Image Component với loading states

```jsx
"use client";

import { useState } from "react";

function OptimizedImage({ src, alt, placeholder }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  return (
    <div className="image-container">
      {isLoading && <div className="skeleton">{placeholder}</div>}

      {isError && <div className="error-placeholder">Image failed to load</div>}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setIsError(true);
        }}
        style={{ display: isLoading ? "none" : "block" }}
      />
    </div>
  );
}
```

### Preload với Server Components

```jsx
// Server Component
async function ProductPage({ params }) {
  const product = await db.product.findUnique({
    where: { id: params.id },
  });

  return (
    <div>
      {/* Preload images */}
      <link rel="preload" as="image" href={product.image} />
      <link rel="preload" as="image" href={product.thumbnail} />

      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}
```

---

## Document Metadata / Metadata tài liệu

### Metadata API

React 19 cung cấp API mới để quản lý document metadata như title, meta tags, Open Graph tags.

**React 19 provides a new API for managing document metadata like title, meta tags, Open Graph tags.**

```jsx
// Server Component với metadata
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Page Title',
  description: 'Page description for SEO',
  openGraph: {
    title: 'My Page Title',
    description: 'Page description for SEO',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Page Title',
    description: 'Page description for SEO',
    images: ['/twitter-image.png'],
  },
};

export default function Page() {
  return <div>Page content</div>;
}
```

### Dynamic Metadata

```jsx
// Dynamic metadata với generateMetadata
import { Metadata } from 'next';

type Props = {
  params: { id: string }
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const product = await db.product.findUnique({
    where: { id: params.id }
  });

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await db.product.findUnique({
    where: { id: params.id }
  });

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}
```

### Metadata với Client Components

```jsx
"use client";

import { useEffect } from "react";

function UpdateMetadata({ title, description }) {
  useEffect(() => {
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;
  }, [title, description]);

  return null;
}

function Page() {
  return (
    <>
      <UpdateMetadata title="Page Title" description="Page description" />
      <div>Page content</div>
    </>
  );
}
```

---

## Improved Error Handling / Xử lý lỗi cải tiến

### Error Boundaries với Server Components

React 19 cải thiện error handling cho Server Components với Error Boundaries tốt hơn.

**React 19 improves error handling for Server Components with better Error Boundaries.**

```jsx
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-fallback">
      <h2>Something went wrong!</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function ProductPage({ params }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ProductContent params={params} />
    </ErrorBoundary>
  );
}

async function ProductContent({ params }) {
  const product = await db.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}
```

### Error Boundary với Suspense

```jsx
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

function DashboardPage() {
  return (
    <div>
      <ErrorBoundary FallbackComponent={HeaderError}>
        <Suspense fallback={<HeaderSkeleton />}>
          <DashboardHeader />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ContentError}>
        <Suspense fallback={<ContentSkeleton />}>
          <DashboardContent />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={FooterError}>
        <Suspense fallback={<FooterSkeleton />}>
          <DashboardFooter />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
```

### Error Handling với Server Actions

```jsx
'use server';

import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function login(formData: FormData) {
  const result = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (!result.success) {
    return {
      error: 'Invalid input',
      details: result.error.flatten().fieldErrors
    };
  }

  try {
    const user = await authenticate(result.data);
    return { success: true, user };
  } catch (error) {
    return { error: 'Authentication failed' };
  }
}

// Client Component
'use client';

import { useActionState } from 'react';

function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    login,
    { error: null, details: {}, success: false }
  );

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          aria-invalid={!!state.details.email}
        />
        {state.details.email && (
          <p className="error">{state.details.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          aria-invalid={!!state.details.password}
        />
        {state.details.password && (
          <p className="error">{state.details.password}</p>
        )}
      </div>

      {state.error && (
        <p className="error">{state.error}</p>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

---

## Custom Element Support / Hỗ trợ Custom Elements

React 19 cải thiện hỗ trợ cho Web Components và Custom Elements.

**React 19 improves support for Web Components and Custom Elements.**

```jsx
// Sử dụng Web Component
function MyComponent() {
  return (
    <div>
      <my-custom-element
        myProp="value"
        onMyEvent={handleEvent}
      >
        Slot content
      </my-custom-element>
    </div>
  );
}

// Custom Element với React
function CustomElementWrapper({ children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    // Custom element initialization
    if (element && 'init' in element) {
      (element as any).init();
    }
  }, []);

  return (
    <my-element ref={ref} {...props}>
      {children}
    </my-element>
  );
}
```

### Custom Element với TypeScript

```tsx
// Định nghĩa custom element types
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "my-custom-element": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        myProp?: string;
        onMyEvent?: (event: CustomEvent) => void;
      };
    }
  }
}

function MyComponent() {
  const handleEvent = (event: CustomEvent) => {
    console.log("Custom event:", event.detail);
  };

  return <my-custom-element myProp="value" onMyEvent={handleEvent} />;
}
```

---

## Ref Cleanup / Dọn dẹp Refs

React 19 cung cấp cơ chế cleanup cho refs tốt hơn.

**React 19 provides better ref cleanup mechanism.**

```jsx
'use client';

import { useRef, useEffect } from 'react';

function ComponentWithRefCleanup() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (element) {
      // Setup
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          console.log('Element visible:', entry.isIntersecting);
        });
      });

      observer.observe(element);

      // Cleanup
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return <div ref={ref}>Content</div>;
}

// Ref cleanup với callback ref
function ComponentWithCallbackRef() {
  const cleanupRef = (element: HTMLDivElement | null) => {
    if (element) {
      const handler = () => console.log('Clicked');
      element.addEventListener('click', handler);

      // Cleanup function
      return () => {
        element.removeEventListener('click', handler);
      };
    }
  };

  return <div ref={cleanupRef}>Click me</div>;
}
```

---

## Server Component Transitions

### useTransition trong Server Components

```jsx
'use client';

import { useTransition } from 'react';

function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('about');

  const selectTab = (nextTab: string) => {
    startTransition(() => {
      setTab(nextTab);
    });
  };

  return (
    <>
      <TabButton
        isActive={tab === 'about'}
        onClick={() => selectTab('about')}
      >
        About
      </TabButton>
      <TabButton
        isActive={tab === 'posts'}
        onClick={() => selectTab('posts')}
      >
        Posts
      </TabButton>

      {isPending && <div className="loading">Loading...</div>}

      <Suspense fallback={<div>Loading content...</div>}>
        {tab === 'about' && <AboutTab />}
        {tab === 'posts' && <PostsTab />}
      </Suspense>
    </>
  );
}
```

---

## Tóm tắt / Summary

| Tính năng / Feature    | Mô tả / Description                   |
| ---------------------- | ------------------------------------- |
| **Asset Loading**      | Preload images, fonts, stylesheets    |
| **Document Metadata**  | Quản lý title, meta tags, Open Graph  |
| **Error Handling**     | Improved Error Boundaries             |
| **Custom Elements**    | Hỗ trợ tốt hơn cho Web Components     |
| **Ref Cleanup**        | Cleanup function cho refs             |
| **Server Transitions** | useTransition trong Server Components |

---

## Best Practices / Thực hành tốt nhất

### 1. Preload critical assets

```jsx
// ✅ Good - Preload critical images
function ProductPage({ product }) {
  return (
    <>
      <link rel="preload" as="image" href={product.image} />
      <img src={product.image} alt={product.name} />
    </>
  );
}
```

### 2. Proper error boundaries

```jsx
// ✅ Good - Error boundaries cho từng section
function Page() {
  return (
    <>
      <ErrorBoundary fallback={<HeaderError />}>
        <Header />
      </ErrorBoundary>

      <ErrorBoundary fallback={<ContentError />}>
        <Content />
      </ErrorBoundary>
    </>
  );
}
```

### 3. Cleanup refs properly

```jsx
// ✅ Good - Cleanup refs
function Component() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(/* ... */);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return <div ref={ref} />;
}
```

---

_Updated: 2026-01-30_
