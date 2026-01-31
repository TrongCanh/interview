# 27. TypeScript with Node.js

## Tổng quan về TypeScript with Node.js

### Mục đích của TypeScript với Node.js / Purpose

**TypeScript với Node.js** - Kết hợp TypeScript với Node.js để có type safety cho backend applications.

**Mục đích chính:**

- Type safety cho Node.js applications
- IntelliSense tốt hơn cho Node.js APIs
- Catch errors tại compile-time thay vì runtime
- Better developer experience
- Type-safe database interactions

### Khi nào cần hiểu về TypeScript với Node.js / When to Use

Hiểu về TypeScript với Node.js là cần thiết khi:

- Xây dựng Node.js applications
- Xây dựng Express APIs
- Làm việc với databases
- Xây dựng CLI tools
- Làm việc với file system

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile-time
- **IntelliSense**: IntelliSense hoạt động tốt hơn
- **Documentation**: Types là documentation tự động
- **Refactoring**: Refactor code an toàn hơn
- **Team Collaboration**: Code rõ ràng hơn cho teams

### Ưu nhược điểm / Pros & Cons

| Ưu điểm              | Nhược điểm         |
| -------------------- | ------------------ |
| - Type safety        | Cần compile step   |
| - IntelliSense       | Learning curve     |
| - Documentation      | Cần maintain types |
| - Refactoring        | Build time lâu hơn |
| - Team collaboration | Có thể verbose     |

---

## Express với TypeScript?

**Express với TypeScript** - Xây dựng type-safe Express applications.

### Mục đích / Purpose

Xây dựng type-safe Express applications.

### Khi nào dùng / When to Use

| Tình huống               | Khi nào dùng                  |
| ------------------------ | ----------------------------- |
| - Express APIs           | Khi xây dựng REST APIs        |
| - Middleware             | Khi tạo Express middleware    |
| - Routes                 | Khi define Express routes     |
| - Request/Response types | Khi handle requests/responses |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile-time
- **IntelliSense**: IntelliSense hoạt động tốt hơn
- **Route Safety**: Type-safe route definitions
- **Middleware Types**: Type-safe middleware types

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm           |
| ---------------------- | -------------------- |
| Type safety            | Cần type definitions |
| IntelliSense           | Cần @types packages  |
| Route safety           | Có thể verbose       |
| Middleware types       | Learning curve       |
| Request/Response types | Cần maintain types   |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Express với TypeScript
import express, { Request, Response } from "express";

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// Define request/response types
interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

// Define route handler
function createUser(
  req: Request<{}, {}, CreateUserRequest>,
  res: Response<CreateUserResponse>
): void {
  const user: User = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };

  users.push(user);

  res.status(201).json({ user });
}

// Setup Express app
const app = express();

app.use(express.json());

app.post("/users", createUser);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// Ví dụ thực tế: Type-safe Express API
import express, { Request, Response } from "express";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CreateProductRequest {
  name: string;
  price: number;
}

interface UpdateProductRequest {
  name?: string;
  price?: number;
}

interface ProductResponse {
  product: Product;
}

const products: Product[] = [
  { id: 1, name: "Widget A", price: 9.99 },
  { id: 2, name: "Widget B", price: 19.99 },
];

// CRUD operations
function getProducts(req: Request, res: Response<Product[]>): void {
  res.json(products);
}

function getProduct(req: Request<{ id: string }, res: Response<Product>): void {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(product);
}

function createProduct(
  req: Request<{}, {}, CreateProductRequest>,
  res: Response<ProductResponse>
): void {
  const product: Product = {
    id: products.length + 1,
    ...req.body,
  };

  products.push(product);

  res.status(201).json({ product });
}

function updateProduct(
  req: Request<{ id: string }, {}, UpdateProductRequest>,
  res: Response<ProductResponse>
): void {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const updatedProduct = { ...product, ...req.body };

  Object.assign(product, req.body);

  res.json({ product: updatedProduct });
}

function deleteProduct(
  req: Request<{ id: string }>,
  res: Response<{ success: boolean }>
): void {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  products.splice(index, 1);

  res.json({ success: true });
}

// Setup Express app
const app = express();

app.use(express.json());

app.get("/products", getProducts);
app.get("/products/:id", getProduct);
app.post("/products", createProduct);
app.put("/products/:id", updateProduct);
app.delete("/products/:id", deleteProduct);

app.listen(3000, () => {
  console.log("Server running on port 0");
});
```

### Best Practices:

```typescript
// ✅ Dùng Request/Response types cho Express
import express, { Request, Response } from "express";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

function createUser(
  req: Request<{}, {}, CreateUserRequest>,
  res: Response,
): void {
  // ...
}

// ✅ Dùng type-safe route parameters
app.get("/users/:id", (req: Request<{ id: string }>, res: Response<User>) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  res.json(user);
});

// ✅ Dùng type-safe request body
app.post(
  "/users",
  (req: Request<{}, {}, CreateUserRequest>, res: Response<User>) => {
    const user = { ...req.body, id: users.length + 1 };
    res.json(user);
  },
);

// ✅ Dùng type-safe middleware
function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// ✅ Dùng type-safe error handling
function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  console.error(err);
  res.status(500).json({ error: err.message });
}

// ❌ Không nên dùng any types cho Express
app.get("/users", (req: Request, res: Response) => {
  const users = req.body as any[]; // ❌ Type unsafe
  res.json(users);
});

// ✅ Nên dùng specific types
app.get("/users", (req: Request, res: Response) => {
  const users = req.body as User[]; // ✅ Type safe
  res.json(users);
});
```

---

## Request/Response types?

**Request/Response types** - Define types cho Express request và response.

### Mục đích / Purpose

Define types cho Express request và response.

### Khi nào dùng / When to Use

| Tình huống       | Khi nào dùng                     |
| ---------------- | -------------------------------- |
| - Request types  | Khi define request body types    |
| - Response types | Khi define response types        |
| - Query types    | Khi define query parameter types |
| - Param types    | Khi define route parameter types |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile-time
- **IntelliSense**: IntelliSense hoạt động tốt hơn
- **Documentation**: Types là documentation tự động
- **Refactoring**: Refactor code an toàn hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm          |
| ------------- | ------------------- |
| Type safety   | Cần maintain types  |
| IntelliSense  | Cần @types packages |
| Documentation | Có thể verbose      |
| Refactoring   | Learning curve      |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Request/Response types
interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserRequest {
  name: string;
  Route parameter types
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
}

interface UpdateUserResponse {
  user: User;
}

interface DeleteUserResponse {
  success: boolean;
}

// Ví dụ: Query parameter types
interface GetUsersQuery {
  page?: number;
  limit?: number;
  sort?: "name" | "email" | "-name" | "-email";
}

interface GetUsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

// Ví dụ: Route parameter types
interface GetUserParams {
  id: string;
}

interface GetUserResponse {
  user: User;
}

// Ví dụ thực tế: Type-safe Express routes
import express, { Request, Response } from "express";

// GET /users
app.get<{}, {}, GetUsersQuery, GetUsersResponse>(
  "/users",
  (req, res) => {
    const { page = 1, limit = 10, sort = "name" } = req.query;
    const users = getAllUsers(page, limit, sort);
    res.json({ users, total: users.length, page, limit });
  }
);

// GET /users/:id
app.get<{ id: string }, {}, {}, GetUserResponse>(
  "/users/:id",
  (req, res) => {
  const user = getUserById(req.params.id);
  res.json({ user });
  }
);

// POST /users
app.post<{}, {}, CreateUserRequest, CreateUserResponse>(
  "/users",
  (req, res) => {
  const user = createUser(req.body);
  res.status(201).json({ user });
  }
);

// PUT /users/:id
app.put<{ id: string }, {}, UpdateUserRequest, UpdateUserResponse>(
  "/users/:id",
  (req, res) => {
  const user = updateUser(req.params.id, req.body);
  res.json({ user });
  }
);

// DELETE /users/:id
app.delete<{ id: string }, {}, DeleteUserResponse>(
  "/users/:id",
  (req, res) => {
  const success = deleteUser(req.params.id);
  res.json({ success });
  }
);

// Ví dụ thực tế: Type-safe middleware types
import { Request, Response, NextFunction } from " express";

interface AuthRequest extends Request {
  user?: User;
}

interface AuthResponse extends Response {
  user?: User;
}

function authMiddleware(
  req: AuthRequest,
  res: AuthResponse,
  next: NextFunction
): void {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = verifyToken(token);
  if (user) {
    req.user = user;
  }
  next();
}

// Ví dụ thực tế: Type-safe error handling
interface ErrorResponse {
  error: string;
  message: string;
}

function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
): void {
  console.error(err);
  res.status(500).json({ error: err.message, message: "Internal server error" });
}
```

### Best Practices:

```typescript
// ✅ Dùng Request/Response types cho Express
interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

// ✅ Dùng type-safe route parameters
app.get("/users/:id", (req: Request<{ id: string }>, res: Response<User>) => {
  const user = getUserById(req.params.id);
  res.json(user);
});

// ✅ Dùng type-safe query parameters
app.get("/users", (req: Request<{}, {}, GetUsersQuery>, GetUsersResponse>) => {
  const { page = 1, limit = 10 } = req.query;
  const users = getPaginatedUsers(page, limit);
  res.json({ users });
});

// ✅ Dùng type-safe request body
app.post("/users", (req: Request<{}, {}, CreateUserRequest>, Response<User>) => {
  const user = createUser(req.body);
  res.status(201).json({ user });
});

// ✅ Dùng type-safe response types
app.get("/users/:id", (req: Request<{ id: string }>, Response<User>) => {
  const user = getUserById(req.params.id);
  res.json({ user });
});

// ❌ Không nên dùng any types
app.get("/users", (req: Request, res: Response) => {
  const users = req.body as any[]; // ❌ Type unsafe
  res.json(users);
});

// ✅ Nên dùng specific types
app.get("/users", (req: Request, res: Response<User[]>) => {
  const users = req.body as User[]; // ✅ Type safe
  res.json(users);
});
```

---

## Route parameter types?

**Route parameter types** - Define types cho Express route parameters.

### Mục đích / Purpose

Define types cho Express route parameters.

### Khi nào dùng / When to Use

| Tình huống       | Khi nào dùng                     |
| ---------------- | -------------------------------- |
| - Route params   | Khi define route parameter types |
| - Path params    | Khi define path parameter types  |
| - Query params   | Khi define query parameter types |
| - Dynamic routes | Khi define dynamic route types   |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile-time
- **IntelliSense**: IntelliSense hoạt động tốt hơn
- **Documentation**: Types là documentation tự động
- **Refactoring**: Refactor code an toàn hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm          |
| ------------- | ------------------- |
| Type safety   | Cần maintain types  |
| IntelliSense  | Cần @types packages |
| Documentation | Có thể verbose      |
| Refactoring   | Learning curve      |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Route parameter types
interface GetUserParams {
  id: string;
}

interface GetProductParams {
  id: string;
}

interface SearchProductsParams {
  query: string;
  page: number;
  limit: number;
}

// Ví dụ: Path parameter types
app.get<GetUserParams>("/users/:id", (req, res) => {
  const user = getUserById(req.params.id);
  res.json({ user });
});

app.get<GetProductParams>("/products/:id", (req, res) => {
  const product = getProductById(req.params.id);
  res.json({ product });
});

// Ví dụ: Query parameter types
app.get<
  {},
  {},
  SearchProductsParams,
  Response<{ products: Product[]; total: number }>
>("/products", (req, res) => {
  const { query, page = 1, limit = 10 } = req.query;
  const { products, total } = searchProducts(query, page, limit);
  res.json({ products, total });
});

// Ví dụ thực tế: Dynamic routes
interface DynamicRouteParams {
  resource: "users" | "products" | "posts";
  id?: string;
}

app.get<DynamicRouteParams>("/:resource", (req, res) => {
  const { resource, id } = req.params;

  if (resource === "users") {
    if (id) {
      const user = getUserById(id);
      res.json({ user });
    } else {
      const users = getAllUsers();
      res.json({ users });
    }
  } else if (resource === "products") {
    if (id) {
      const product = getProductById(id);
      res.json({ product });
    } else {
      const products = getAllProducts();
      res.json({ products });
    }
  } else {
    const posts = getAllPosts();
    res.json({ posts });
  }
});

// Ví dụ thực tế: Nested route parameters
interface GetCommentParams {
  userId: string;
  commentId: string;
}

app.get<GetCommentParams>("/users/:userId/comments/:commentId", (req, res) => {
  const { userId, commentId } = req.params;
  const comment = getComment(userId, commentId);
  res.json({ comment });
});

// Ví dụ thực tế: Multiple route parameters
interface GetFileParams {
  folder: string;
  filename: string;
}

app.get<GetFileParams>("/files/:folder/:filename", (req, res) => {
  const { folder, filename } = req.params;
  const content = getFileContent(folder, filename);
  res.send(content);
});
```

### Best Practices:

```typescript
// ✅ Dùng parameter types cho routes
interface GetUserParams {
  id: string;
}

app.get<GetUserParams>("/users/:id", (req, res) => {
  const user = getUserById(req.params.id);
  res.json({ user });
});

// ✅ Dùng query parameter types
interface SearchParams {
  query: string;
  page?: number;
  limit?: number;
}

app.get<{}, {}, SearchParams>("/search", (req, res) => {
  const { query, page = 1, limit = 10 } = req.query;
  const results = search(query, page, limit);
  res.json(results);
});

// ✅ Dùng nested parameter types
interface GetCommentParams {
  userId: string;
  commentId: string;
}

app.get<GetCommentParams>("/users/:userId/comments/:commentId", (req, res) => {
  const { userId, commentId } = req.params;
  const comment = getComment(userId, commentId);
  res.json({ comment });
});

// ❌ Không nên dùng string types cho numeric params
app.get("/users/:id", (req, res) => {
  const id = req.params.id; // Type là string
  const user = getUserById(parseInt(id)); // ✅ Parse string to number
  res.json({ user });
});

// ✅ Nên dùng numeric types cho numeric params
interface GetUserParams {
  id: number; // ✅ Type là number
}

app.get<GetUserParams>("/users/:id", (req, res) => {
  const user = getUserById(req.params.id); // ✅ Không cần parse
  res.json({ user });
});
```

---

## Middleware types?

**Middleware types** - Define types cho Express middleware.

### Mục đích / Purpose

Define types cho Express middleware.

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng                      |
| ---------------------- | --------------------------------- |
| - Auth middleware      | Khi tạo authentication middleware |
| - Error handling       | Khi tạo error handling middleware |
| - Logging middleware   | Khi tạo logging middleware        |
| - Request modification | Khi modify request types          |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile-time
- **IntelliSense**: IntelliSense hoạt động tốt hơn
- **Documentation**: Types là documentation tự động
- **Refactoring**: Refactor code an toàn hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm          |
| ------------- | ------------------- |
| Type safety   | Cần maintain types  |
| IntelliSense  | Cần @types packages |
| Documentation | Có thể verbose      |
| Refactoring   | Learning curve      |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Middleware types
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: User;
}

interface AuthResponse extends Response {
  user?: User;
}

// Auth middleware
function authMiddleware(
  req: AuthRequest,
  res: AuthResponse,
  next: NextFunction
): void {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = verifyToken(token);
  if (user) {
    req.user = user;
  }
  next();
}

// Error handling middleware
interface ErrorRequest extends Request {
  error?: Error;
}

interface ErrorResponse extends Response {
  error?: Error;
}

function errorHandler(
  err: Error,
  req: ErrorRequest,
  res: ErrorResponse,
  next: NextFunction
): void {
  console.error(err);
  res.status(500).json({ error: err.message });
}

// Logging middleware
interface LogRequest extends Request {
  startTime: number;
}

interface LogResponse extends Response {
  duration: number;
}

function loggingMiddleware(
  req: LogRequest,
  res: LogResponse,
  next: NextFunction
): void {
  req.startTime = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - req.startTime;
    res.json({ duration });
  });
  next();
}

// Request modification middleware
interface ModifiedRequest extends Request {
  requestId: string;
}

function requestIdMiddleware(
  req: ModifiedRequest,
  res: Response,
  next: NextFunction
): void {
  req.requestId = generateRequestId();
  next();
}

// Setup Express app with middleware
const app = express();

app.use(loggingMiddleware);
app.use(requestIdMiddleware);
app.use(authMiddleware);
app.use(errorHandler);

// Routes
app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// Ví dụ thực tế: Type-safe body parser middleware
import { Request, Response, NextFunction } from "express";

interface ParsedRequest extends Request {
  body: Record<string, unknown>;
}

function bodyParser<T>(
  req: ParsedRequest,
  res: Response,
  next: NextFunction
): void {
  let data = "";

  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    try {
      req.body = JSON.parse(data) as T;
      next();
    } catch (err) {
      res.status(400).json({ error: "Invalid JSON" });
    }
  });
}

// Usage
app.use(bodyParser<{ username: string; password: string }>("/login", (req, res) => {
  const { username, password } = req.body;
  // Process login
  res.json({ success: true });
});
```

### Best Practices:

```typescript
// ✅ Dùng middleware types
interface AuthRequest extends Request {
  user?: User;
}

function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  // ...
}

// ✅ Dùng error handling middleware
function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // ...
}

// ✅ Dùng logging middleware
function loggingMiddleware(
  req: Request,
  res: Response,
  @types/express-serve-static serve-static
  next: NextFunction
): void {
  // ...
}

// ✅ Dùng request modification middleware
interface ModifiedRequest extends Request {
  requestId: string;
}

function requestIdMiddleware(
  req: ModifiedRequest,
  res: Response,
  next: NextFunction
): void {
  req.requestId = generateRequestId();
  next();
}

// ❌ Không nên dùng any types cho middleware
function badMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const data = req.body as any; // ❌ Type unsafe
  // ...
}

// ✅ Nên dùng specific types
interface GoodRequest extends Request {
  data: { username: string; password: string };
}

function goodMiddleware(
  req: GoodRequest,
  res: Response,
  next: NextFunction
): void {
  const { username, password } = req.body; // ✅ Type safe
  // ...
}
```

---

## Database types?

**Database types** - Define types cho database interactions.

### Mục đích / Purpose

Define types cho database interactions.

### Khi nào dùng / When to Use

| Tình huống         | Khi nào dùng            |
| ------------------ | ----------------------- |
| - Database queries | Khi define query types  |
| Database models    | Khi define model types  |
| - Database results | Khi define result types |
| - Database errors  | Khi define error types  |

### Giúp ích gì / Benefits

**Lợi ích:**

- **Type Safety**: Catch errors tại compile-time
- **IntelliSense**: IntelliSense hoạt động tốt hơn
- **Documentation**: Types là documentation tự động
- **Refactoring**: Refactor code an toàn hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm          |
| ------------- | ------------------- |
| Type safety   | Cần maintain types  |
| IntelliSense  | Cần @types packages |
| Documentation | Có thể verbose      |
| Refactoring   | Learning curve      |

### Ví dụ:

```typescript
// Ví dụ cơ bản: Database model types
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Comment {
  id: number;
  userId: number;
  content: string;
  createdAt: Date;
}

// Ví dụ: Database query types
interface CreateUserQuery {
  name: string;
  email: string;
}

interface CreateProductQuery {
  name: string;
  price: number;
}

interface GetUserQuery {
  id: number;
}

// Ví dụ: Database result types
interface UserResult {
  user: User | null;
}

interface ProductResult {
  product: Product | null;
}

interface CommentResult {
  comment: Comment | null;
}

// Ví dụ thực tế: Type-safe database operations
async function getUser(id: number): Promise<UserResult> {
  const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return { user };
}

async function createUser(data: CreateUserQuery): Promise<UserResult> {
  const result = await db.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [data.name, data.email],
  );
  return { user: result.rows[0] };
}

async function updateUser(
  id: number,
  data: Partial<User>,
): Promise<UserResult> {
  const result = await db.query(
    "UPDATE users SET name = COALESCE($1, $2), email = COALESCE($1, $3) WHERE id = $4",
    [data.name, data.email, id],
  );
  return { user: result.rows[0] };
}

async function deleteUser(id: number): Promise<{ success: boolean }> {
  await db.query("DELETE FROM users WHERE id = $1", [id]);
  return { success: true };
}

// Ví dụ thực tế: Transaction types
interface Transaction<T> {
  query: string;
  params: unknown[];
}

async function executeTransaction<T>(queries: Transaction<T>[]): Promise<T[]> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const results: T[] = [];
    for (const query of queries) {
      const result = await client.query(query.query, query.params);
      results.push(result.rows[0]);
    }

    await client.query("COMMIT");
    return results;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

// Ví dụ thực tế: Type-safe repository pattern
class UserRepository {
  async findAll(): Promise<User[]> {
    const result = await db.query("SELECT * FROM users ORDER BY id");
    return result.rows;
  }

  async findById(id: number): Promise<User | null> {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0] || null;
  }

  async create(data: CreateUserQuery): Promise<User> {
    const result = await db.query(
      "INSERT INTO users (name, email) VALUES ($1, $2)",
      [data.name, data.email],
    );
    return result.rows[0];
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    const result = await db.query(
      "UPDATE users SET name = COALESCE($1, $2), email = COALESCE($1, $3) WHERE id = $4",
      [data.name, data.email, id],
    );
    return result.rows[0];
  }

  async delete(id: number): Promise<{ success: boolean }> {
    await db.query("DELETE FROM users WHERE id = $1", [id]);
    return { success: true };
  }
}
```

### Best Practices:

```typescript
// ✅ Dùng model types cho database
interface User {
  id: number;
  name: string;
  email: string;
}

// ✅ Dùng query types cho database operations
interface CreateUserQuery {
  name: string;
  email: string;
}

// ✅ Dùng result types cho database operations
interface UserResult {
  user: User | null;
}

// ✅ Dùng repository pattern cho database access
class UserRepository {
  async findAll(): Promise<User[]> {
    const result = await db.query("SELECT * FROM users ORDER BY id");
    return result.rows;
  }
}

// ✅ Dùng transaction types
interface Transaction<T> {
  query: string;
  params: unknown[];
}

async function executeTransaction<T>(queries: Transaction<T>[]): Promise<T[]> {
  // ...
}

// ❌ Không nên dùng any types cho database
async function badQuery(): Promise<any> {
  const result = await db.query("SELECT * FROM users"); // ❌ Type unsafe
  return result.rows;
}

// ✅ Nên dùng specific types
async function goodQuery(): Promise<User[]> {
  const result = await db.query<User[]>("SELECT * FROM users");
  return result.rows;
}

// ✅ Dùng type-safe repository pattern
class UserRepository {
  async findById(id: number): Promise<User | null> {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0] || null;
  }
}
```

---

## Tổng kết

### Bảng so sánh TypeScript với Node.js Features

| Feature                | Mô tả                      | Use Case                      |
| ---------------------- | -------------------------- | ----------------------------- |
| Express types          | Type-safe Express APIs     | REST APIs                     |
| Request/Response types | Type-safe request/response | API contracts                 |
| Route parameter types  | Type-safe route params     | Dynamic routes                |
| Middleware types       | Type-safe middleware       | Auth, logging, error handling |
| Database types         | Type-safe DB operations    | Models, repositories          |

### Khi nào nên dùng TypeScript với Node.js

| Tình huống       | Nên dùng                 |
| ---------------- | ------------------------ |
| Express APIs     | ✅ REST APIs             |
| Backend services | ✅ Microservices         |
| CLI tools        | ✅ Command-line tools    |
| File system      | ✅ File operations       |
| Databases        | ✅ Database applications |

### Best Practices chung cho TypeScript với Node.js

1. **Define types cho APIs**: Request/Response types cho APIs
2. **Dùng type-safe middleware**: Auth, logging, error handling
3. **Define model types**: Database models, interfaces
4. **Use repository pattern**: Repository pattern cho database access
5. **Avoid any types**: Tránh dùng any khi có thể

### Anti-patterns cần tránh

```typescript
// ❌ Dùng any types cho requests
app.post("/users", (req: Request, res: Response) => {
  const data = req.body as any; // ❌ Type unsafe
  res.json(data);
});

// ✅ Nên dùng specific types
interface CreateUserRequest {
  name: string;
  email: string;
}

app.post<{}, {}, CreateUserRequest, Response<User>>("/users", (req, res) => {
  const user = createUser(req.body); // ✅ Type safe
  res.json({ user });
});

// ❌ Dùng string types cho numeric params
app.get("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id; // Type là string
  const user = getUserById(parseInt(id)); // ✅ Parse string to number
  res.json({ user });
});

// ✅ Nên dùng numeric types cho numeric params
interface GetUserParams {
  id: number;
}

app.get<GetUserParams>("/users/:id", (req, res) => {
  const user = getUserById(req.params.id); // ✅ Không cần parse
  res.json({ user });
});

// ❌ Không validate runtime types
function badValidate(data: unknown): User {
  return data as User; // ❌ Type unsafe
}

// ✅ Nên validate runtime types
function goodValidate(data: unknown): User | null {
  if (!isUser(data)) {
    return null;
  }
  return data as User; // ✅ Validated
}
```

---

## Tài liệu tham khảo / References

- [TypeScript Handbook - Node.js](https://www.typescriptlang.org/docs/handbook/nodejs.html)
- [TypeScript Deep Dive - Node.js](https://basarat.gitbook.io/typescript/nodejs)
- [TypeScript - Express](https://www.typescriptlang.org/docs/handbook/express.html)
- [DefinitelyTyped/express](https://github.com/DefinitelyTyped/express)
- [@types/node](https://www.npmjs.com/package/@types/node)

---

_Last updated: 2026-01-30_
