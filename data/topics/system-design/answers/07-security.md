# 7. Security & Authentication

## Tổng quan về Security & Authentication

### Mục đích của Security & Authentication / Purpose

**Security & Authentication** là các practices và mechanisms để bảo vệ hệ thống và data khỏi unauthorized access.

**Mục đích chính:**

- Bảo vệ data và systems
- Đảm bảo chỉ authorized users có thể access
- Bảo vệ chống lại attacks
- Đảm bảo compliance với regulations
- Tăng trust của users

### Khi nào cần hiểu về Security & Authentication / When to Use

Hiểu về Security & Authentication là cần thiết khi:

- Thiết kế hệ thống mới
- Xử lý sensitive data
- Cần compliance (GDPR, HIPAA, etc.)
- Xử lý payments
- Bảo vệ user accounts

### Giúp ích gì / Benefits

**Lợi ích:**

- **Data protection**: Bảo vệ data
- **User trust**: Tăng trust của users
- **Compliance**: Đảm bảo compliance
- **Risk reduction**: Giảm rủi ro
- **Business continuity**: Đảm bảo business continuity

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm               |
| ------------- | ------------------------ |
| - Bảo vệ data | Thêm complexity          |
| - Tăng trust  | Performance overhead     |
| - Compliance  | Cần expertise            |
| - Giảm rủi ro | Trade-offs với usability |

---

## Authentication vs Authorization?

**Authentication** là xác định identity của user. **Authorization** là xác định quyền của user.

### Mục đích / Purpose

- **Authentication**: Xác định user là ai
- **Authorization**: Xác định user có thể làm gì

### Khi nào dùng / When to Use

| Tình huống        | Khi nào dùng   |
| ----------------- | -------------- |
| - Login           | Authentication |
| - Access control  | Authorization  |
| - API access      | Cả hai         |
| - Resource access | Authorization  |

### Giúp ích gì / Benefits

- **Authentication**: Đảm bảo chỉ authorized users có thể access
- **Authorization**: Đảm bảo users chỉ có thể access những gì được phép

### Ưu nhược điểm / Pros & Cons

| Feature      | Authentication    | Authorization     |
| ------------ | ----------------- | ----------------- |
| Purpose      | Who are you?      | What can you do?  |
| Example      | Username/password | Role-based access |
| Verification | Credentials       | Permissions       |
| Timing       | First             | After auth        |

### Ví dụ:

```javascript
// Authentication vs Authorization

const authentication = {
  definition: "Verifying the identity of a user or system",
  question: "Who are you?",
  methods: [
    "Username/Password",
    "Multi-factor Authentication (MFA)",
    "OAuth 2.0",
    "OpenID Connect",
    "SAML",
    "JWT",
    "API Keys",
    "Certificates",
  ],
  examples: [
    "User login with username and password",
    "API call with Bearer token",
    "SSH login with private key",
  ],
};

const authorization = {
  definition: "Determining what a user is allowed to do",
  question: "What can you do?",
  models: [
    "Role-Based Access Control (RBAC)",
    "Attribute-Based Access Control (ABAC)",
    "Access Control Lists (ACL)",
    "Policy-Based Access Control (PBAC)",
  ],
  examples: [
    "Admin can delete users, regular user cannot",
    "User can only access their own data",
    "Guest can only read, not write",
  ],
};

// Authentication Implementation
class AuthenticationService {
  constructor() {
    this.users = new Map();
    this.sessions = new Map();
  }

  register(username, password) {
    if (this.users.has(username)) {
      throw new Error("User already exists");
    }

    const hashedPassword = this.hashPassword(password);
    this.users.set(username, {
      username,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return { success: true };
  }

  async login(username, password) {
    const user = this.users.get(username);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await this.verifyPassword(password, user.password);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    // Create session
    const token = this.generateToken(user);
    this.sessions.set(token, {
      userId: user.username,
      createdAt: new Date(),
    });

    return { token };
  }

  async verifyToken(token) {
    const session = this.sessions.get(token);

    if (!session) {
      throw new Error("Invalid token");
    }

    return { userId: session.userId };
  }

  logout(token) {
    this.sessions.delete(token);
  }

  hashPassword(password) {
    const crypto = require("crypto");
    return crypto.createHash("sha256").update(password).digest("hex");
  }

  async verifyPassword(password, hash) {
    const crypto = require("crypto");
    const computedHash = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
    return computedHash === hash;
  }

  generateToken(user) {
    const crypto = require("crypto");
    return crypto.randomBytes(32).toString("hex");
  }
}

// Authorization Implementation
class AuthorizationService {
  constructor() {
    this.roles = new Map();
    this.permissions = new Map();
    this.userRoles = new Map();
  }

  defineRole(roleName, permissions) {
    this.roles.set(roleName, permissions);
  }

  assignRole(userId, roleName) {
    if (!this.userRoles.has(userId)) {
      this.userRoles.set(userId, new Set());
    }
    this.userRoles.get(userId).add(roleName);
  }

  hasPermission(userId, permission) {
    const userRoles = this.userRoles.get(userId);

    if (!userRoles || userRoles.size === 0) {
      return false;
    }

    for (const role of userRoles) {
      const rolePermissions = this.roles.get(role);
      if (rolePermissions && rolePermissions.includes(permission)) {
        return true;
      }
    }

    return false;
  }

  checkPermission(userId, permission) {
    if (!this.hasPermission(userId, permission)) {
      throw new Error("Access denied");
    }
  }
}

// Usage
const authService = new AuthenticationService();
const authzService = new AuthorizationService();

// Register and login
await authService.register("john", "password123");
const { token } = await authService.login("john", "password123");

// Define roles and permissions
authzService.defineRole("admin", [
  "users.create",
  "users.read",
  "users.update",
  "users.delete",
]);
authzService.defineRole("user", ["users.read"]);

// Assign role
authzService.assignRole("john", "user");

// Verify token and check permission
const { userId } = await authService.verifyToken(token);

// Check authorization
if (authzService.hasPermission(userId, "users.read")) {
  console.log("User can read users");
}

if (authzService.hasPermission(userId, "users.delete")) {
  console.log("User can delete users");
} else {
  console.log("User cannot delete users");
}

// Middleware for Express
function authenticate(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { userId } = authService.verifyToken(token);
    req.user = { userId };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

function authorize(permission) {
  return (req, res, next) => {
    if (!authzService.hasPermission(req.user.userId, permission)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}

// Usage in Express
app.get("/api/users", authenticate, authorize("users.read"), (req, res) => {
  // User is authenticated and has permission
  res.json({ users: [] });
});

app.delete(
  "/api/users/:id",
  authenticate,
  authorize("users.delete"),
  (req, res) => {
    // User is authenticated and has permission
    res.json({ success: true });
  },
);
```

### Best Practices:

1. **Separate auth and authz**: Tách biệt authentication và authorization
2. **Use standard protocols**: Dùng standard protocols (OAuth 2.0, JWT)
3. **Implement RBAC**: Implement Role-Based Access Control
4. **Audit access**: Audit access

```javascript
// ✅ Nên: Separate authentication and authorization
app.get("/api/users", authenticate, authorize("users.read"), handler);

// ✅ Nên: Use JWT for stateless authentication
const token = jwt.sign({ userId }, secret, { expiresIn: "1h" });

// ✅ Nên: Implement RBAC
authzService.defineRole("admin", ["users.create", "users.delete"]);

// ❌ Không nên: Mix authentication and authorization
app.get("/api/users", (req, res) => {
  if (req.headers.authorization === "secret") {
    res.json({ users: [] });
  }
  // No separation, no proper auth
});
```

---

## OAuth 2.0 flow?

**OAuth 2.0** là authorization framework cho phép third-party applications access user data.

### Mục đích / Purpose

Cho phép applications access resources thay vì user credentials.

### Khi nào dùng / When to Use

| Tình huống           | Khi nào dùng                      |
| -------------------- | --------------------------------- |
| - Third-party access | Khi cần third-party access        |
| - Social login       | Khi cần social login              |
| - API access         | Khi cần API access                |
| - Mobile apps        | Khi cần mobile app authentication |

### Giúp ích gì / Benefits

- **No password sharing**: Không cần chia sẻ password
- **Limited access**: Limited access với scopes
- **Revocable**: Có thể revoke access
- **Standard**: Standard protocol

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                  | Nhược điểm         |
| ------------------------ | ------------------ |
| - Không chia sẻ password | Phức tạp           |
| - Limited access         | Cần infrastructure |
| - Revocable              | Learning curve     |
| - Standard               | Multiple flows     |

### Ví dụ:

```javascript
// OAuth 2.0 Flows

const oauthFlows = {
  authorizationCode: {
    description: "User authorizes app, receives code, exchanges for token",
    useCase: "Server-side applications",
    steps: [
      "1. Redirect user to authorization endpoint",
      "2. User grants permission",
      "3. Redirect back with authorization code",
      "4. Exchange code for access token",
    ],
  },

  implicit: {
    description: "Access token returned directly in URL",
    useCase: "Client-side applications (deprecated)",
    steps: [
      "1. Redirect user to authorization endpoint",
      "2. User grants permission",
      "3. Redirect back with access token in URL",
    ],
  },

  password: {
    description: "Exchange username/password for access token",
    useCase: "First-party apps, trusted clients",
    steps: [
      "1. Send username/password to token endpoint",
      "2. Receive access token",
    ],
  },

  clientCredentials: {
    description: "Exchange client credentials for access token",
    useCase: "Service-to-service authentication",
    steps: [
      "1. Send client ID/secret to token endpoint",
      "2. Receive access token",
    ],
  },

  deviceCode: {
    description: "User authorizes on separate device",
    useCase: "Devices without browser (TV, IoT)",
    steps: [
      "1. Request device code",
      "2. Show code to user",
      "3. User enters code on browser",
      "4. Poll for token",
    ],
  },

  refreshToken: {
    description: "Exchange refresh token for new access token",
    useCase: "Long-lived sessions",
    steps: [
      "1. Send refresh token to token endpoint",
      "2. Receive new access token",
    ],
  },
};

// Authorization Code Flow Implementation
class OAuth2Client {
  constructor(config) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.redirectUri = config.redirectUri;
    this.authUrl = config.authUrl;
    this.tokenUrl = config.tokenUrl;
    this.scopes = config.scopes || [];
  }

  getAuthorizationUrl(state) {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.scopes.join(" "),
      state: state,
    });

    return `${this.authUrl}?${params}`;
  }

  async exchangeCodeForToken(code) {
    const response = await fetch(this.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: this.redirectUri,
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }),
    });

    return await response.json();
  }

  async refreshAccessToken(refreshToken) {
    const response = await fetch(this.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }),
    });

    return await response.json();
  }
}

// Usage
const oauthClient = new OAuth2Client({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  redirectUri: "https://your-app.com/callback",
  authUrl: "https://provider.com/oauth/authorize",
  tokenUrl: "https://provider.com/oauth/token",
  scopes: ["read", "write"],
});

// Step 1: Redirect user to authorization URL
const state = crypto.randomBytes(16).toString("hex");
const authUrl = oauthClient.getAuthorizationUrl(state);

// Express route
app.get("/login", (req, res) => {
  res.redirect(authUrl);
});

// Step 2: Handle callback
app.get("/callback", async (req, res) => {
  const { code, state: returnedState } = req.query;

  // Verify state to prevent CSRF
  if (returnedState !== req.session.state) {
    return res.status(400).json({ error: "Invalid state" });
  }

  // Exchange code for token
  const tokens = await oauthClient.exchangeCodeForToken(code);

  // Save tokens
  req.session.accessToken = tokens.access_token;
  req.session.refreshToken = tokens.refresh_token;

  res.redirect("/dashboard");
});

// Step 3: Use access token
app.get("/api/data", async (req, res) => {
  const response = await fetch("https://api.provider.com/data", {
    headers: {
      Authorization: `Bearer ${req.session.accessToken}`,
    },
  });

  const data = await response.json();
  res.json(data);
});

// Step 4: Refresh access token when expired
app.get("/refresh", async (req, res) => {
  const tokens = await oauthClient.refreshAccessToken(req.session.refreshToken);

  req.session.accessToken = tokens.access_token;
  req.session.refreshToken = tokens.refresh_token;

  res.json({ success: true });
});

// Client Credentials Flow (Service-to-Service)
class ServiceAccount {
  constructor(config) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.tokenUrl = config.tokenUrl;
    this.accessToken = null;
    this.expiresAt = null;
  }

  async getAccessToken() {
    // Return cached token if still valid
    if (this.accessToken && this.expiresAt > Date.now()) {
      return this.accessToken;
    }

    // Request new token
    const response = await fetch(this.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }),
    });

    const tokens = await response.json();

    this.accessToken = tokens.access_token;
    this.expiresAt = Date.now() + tokens.expires_in * 1000;

    return this.accessToken;
  }
}

// Usage
const serviceAccount = new ServiceAccount({
  clientId: "service-client-id",
  clientSecret: "service-client-secret",
  tokenUrl: "https://provider.com/oauth/token",
});

// Make API call with service account
const accessToken = await serviceAccount.getAccessToken();
const response = await fetch("https://api.provider.com/data", {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```

### Best Practices:

1. **Use PKCE for mobile apps**: Dùng PKCE cho mobile apps
2. **Validate state**: Validate state parameter
3. **Use HTTPS**: Luôn dùng HTTPS
4. **Store tokens securely**: Lưu trữ tokens securely

```javascript
// ✅ Nên: Use Authorization Code flow with PKCE for mobile apps
const codeVerifier = generateCodeVerifier();
const codeChallenge = generateCodeChallenge(codeVerifier);

const authUrl = oauthClient.getAuthorizationUrl({
  code_challenge: codeChallenge,
  code_challenge_method: "S256",
});

// ✅ Nên: Validate state parameter
app.get("/callback", (req, res) => {
  if (req.query.state !== req.session.state) {
    return res.status(400).json({ error: "Invalid state" });
  }
  // Process callback
});

// ✅ Nên: Use Client Credentials for service-to-service
const token = await serviceAccount.getAccessToken();

// ❌ Không nên: Store tokens in localStorage
localStorage.setItem("accessToken", token);
// Vulnerable to XSS
```

---

## JWT vs Session-based auth?

**JWT (JSON Web Token)** là stateless authentication. **Session-based auth** là stateful authentication.

### Mục đích / Purpose

Chọn authentication mechanism phù hợp với use case.

### Khi nào dùng / When to Use

| Use Case                | JWT     | Session |
| ----------------------- | ------- | ------- |
| - Stateless             | ✅      | ❌      |
| - Mobile apps           | ✅      | Limited |
| - Microservices         | ✅      | Limited |
| - Easy revocation       | ❌      | ✅      |
| - Simple implementation | Limited | ✅      |

### Giúp ích gì / Benefits

- **JWT**: Stateless, scalable, cross-domain
- **Session**: Easy revocation, simple

### Ưu nhược điểm / Pros & Cons

| Feature        | JWT       | Session           |
| -------------- | --------- | ----------------- |
| State          | Stateless | Stateful          |
| Scalability    | High      | Limited           |
| - Revocation   | Difficult | Easy              |
| - Size         | Larger    | Smaller (just ID) |
| - Cross-domain | Yes       | No                |

### Ví dụ:

```javascript
// JWT Authentication
const jwt = require("jsonwebtoken");

class JWTAuthService {
  constructor(secret) {
    this.secret = secret;
  }

  generateToken(payload, options = {}) {
    return jwt.sign(payload, this.secret, {
      expiresIn: options.expiresIn || "1h",
      issuer: options.issuer,
      audience: options.audience,
    });
  }

  verifyToken(token) {
    return jwt.verify(token, this.secret);
  }

  decodeToken(token) {
    return jwt.decode(token);
  }
}

// Usage
const jwtAuth = new JWTAuthService(process.env.JWT_SECRET);

// Generate token
const token = jwtAuth.generateToken(
  {
    userId: "123",
    email: "user@example.com",
    role: "user",
  },
  {
    expiresIn: "1h",
  },
);

// Verify token
const payload = jwtAuth.verifyToken(token);
console.log(payload);
// { userId: '123', email: 'user@example.com', role: 'user', iat: ..., exp: ... }

// Session-based Authentication
class SessionAuthService {
  constructor(sessionStore) {
    this.sessionStore = sessionStore;
  }

  async createSession(userId, data = {}) {
    const sessionId = generateSessionId();
    const session = {
      id: sessionId,
      userId,
      data,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 3600000), // 1 hour
    };

    await this.sessionStore.set(sessionId, session);
    return sessionId;
  }

  async getSession(sessionId) {
    const session = await this.sessionStore.get(sessionId);

    if (!session) {
      throw new Error("Invalid session");
    }

    if (session.expiresAt < new Date()) {
      await this.sessionStore.delete(sessionId);
      throw new Error("Session expired");
    }

    return session;
  }

  async deleteSession(sessionId) {
    await this.sessionStore.delete(sessionId);
  }

  async updateSession(sessionId, data) {
    const session = await this.getSession(sessionId);
    session.data = { ...session.data, ...data };
    await this.sessionStore.set(sessionId, session);
  }
}

// Usage
const sessionAuth = new SessionAuthService(sessionStore);

// Create session
const sessionId = await sessionAuth.createSession("123", {
  email: "user@example.com",
  role: "user",
});

// Get session
const session = await sessionAuth.getSession(sessionId);
console.log(session);
// { id: '...', userId: '123', data: { email: '...', role: '...' }, ... }

// Delete session (logout)
await sessionAuth.deleteSession(sessionId);

// Comparison
const comparison = {
  jwt: {
    type: "Stateless",
    storage: "Client-side (token)",
    validation: "Signature verification",
    revocation: "Difficult (need blacklist)",
    size: "Larger (contains payload)",
    crossDomain: "Yes",
    scalability: "High (no server state)",
    useCases: [
      "Mobile apps",
      "Microservices",
      "Cross-domain authentication",
      "API authentication",
    ],
    pros: ["Stateless", "Scalable", "Cross-domain", "No server storage needed"],
    cons: [
      "Cannot revoke easily",
      "Larger size",
      "Vulnerable if secret leaked",
    ],
  },

  session: {
    type: "Stateful",
    storage: "Server-side (session store)",
    validation: "Session lookup",
    revocation: "Easy (delete session)",
    size: "Smaller (just session ID)",
    crossDomain: "No (needs session sharing)",
    scalability: "Limited (needs session store)",
    useCases: [
      "Web applications",
      "Traditional monoliths",
      "When easy revocation is needed",
    ],
    pros: [
      "Easy to revoke",
      "Smaller size",
      "Simple",
      "Can store server-side data",
    ],
    cons: [
      "Requires server storage",
      "Not cross-domain",
      "Scalability concerns",
    ],
  },
};

// JWT Middleware
function jwtAuthMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = jwtAuth.verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// Session Middleware
function sessionAuthMiddleware(req, res, next) {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  sessionAuth
    .getSession(sessionId)
    .then((session) => {
      req.user = session;
      next();
    })
    .catch((error) => {
      return res.status(401).json({ error: "Unauthorized" });
    });
}
```

### Best Practices:

1. **Use JWT for stateless**: Dùng JWT cho stateless scenarios
2. **Use sessions for web apps**: Dùng sessions cho web apps
3. **Secure JWT properly**: Bảo vệ JWT properly
4. **Implement token refresh**: Implement token refresh

```javascript
// ✅ Nên: Use JWT for microservices
const token = jwt.sign({ userId }, secret);
// Stateless, scalable

// ✅ Nên: Use sessions for web apps with easy revocation
const sessionId = await sessionAuth.createSession(userId);
// Can easily revoke by deleting session

// ✅ Nên: Implement token refresh for JWT
const accessToken = jwt.sign({ userId }, secret, { expiresIn: "15m" });
const refreshToken = jwt.sign({ userId }, refreshSecret, { expiresIn: "7d" });

// ❌ Không nên: Store sensitive data in JWT
const token = jwt.sign({ userId, password }, secret);
// Password is visible in token!
```

---

## API security best practices?

**API security best practices** là các practices để bảo vệ APIs khỏi attacks.

### Mục đích / Purpose

Bảo vệ APIs khỏi unauthorized access và attacks.

### Khi nào dùng / When to Use

| Tình huống           | Khi nào dùng |
| -------------------- | ------------ |
| - Public APIs        | Luôn luôn    |
| - Private APIs       | Luôn luôn    |
| - Third-party access | Luôn luôn    |

### Giúp ích gì / Benefits

- **Protection**: Bảo vệ APIs
- **Compliance**: Đảm bảo compliance
- **Trust**: Tăng trust
- **Risk reduction**: Giảm rủi ro

### Ưu nhược điểm / Pros & Cons

| Ưu điểm       | Nhược điểm           |
| ------------- | -------------------- |
| - Bảo vệ APIs | Thêm complexity      |
| - Giảm rủi ro | Performance overhead |
| - Compliance  | Cần expertise        |

### Ví dụ:

```javascript
// API Security Best Practices

const apiSecurity = {
  authentication: {
    description: "Verify identity of caller",
    implementation: "JWT, OAuth 2.0, API keys",
    example: "Authorization: Bearer <token>",
  },

  authorization: {
    description: "Verify permissions of caller",
    implementation: "RBAC, ABAC",
    example: "Check if user has permission to access resource",
  },

  rateLimiting: {
    description: "Limit requests per client",
    implementation: "Rate limit by IP, user, API key",
    example: "100 requests per minute per user",
  },

  inputValidation: {
    description: "Validate and sanitize all inputs",
    implementation: "Schema validation, sanitization",
    example: "Validate email format, sanitize HTML",
  },

  outputEncoding: {
    description: "Encode output to prevent XSS",
    implementation: "HTML encoding, JSON encoding",
    example: "Encode <script> as <script>",
  },

  https: {
    description: "Use HTTPS for all API calls",
    implementation: "TLS certificate",
    example: "https://api.example.com",
  },

  cors: {
    description: "Configure CORS properly",
    implementation: "Allow only trusted origins",
    example: "Access-Control-Allow-Origin: https://trusted.com",
  },

  securityHeaders: {
    description: "Set security headers",
    implementation: "CSP, X-Frame-Options, etc.",
    example: "Content-Security-Policy: default-src 'self'",
  },

  logging: {
    description: "Log all API calls",
    implementation: "Structured logging",
    example: "Log request, response, errors",
  },

  errorHandling: {
    description: "Return generic error messages",
    implementation: "Don't expose sensitive info",
    example: 'Return "Invalid credentials" not "User not found"',
  },
};

// Implementation
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");

const app = express();

// Security headers
app.use(helmet());

// HTTPS redirect (in production)
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      return res.redirect(`https://${req.header("host")}${req.url}`);
    }
    next();
  });
}

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGINS);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: "Too many requests, please try again later",
});

app.use("/api/", apiLimiter);

// Authentication middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// Authorization middleware
function authorize(permission) {
  return (req, res, next) => {
    if (!hasPermission(req.user, permission)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}

// Input validation
const userValidation = [
  body("email").isEmail().normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .matches(/^(?=.*[A-Z])(?=.*[0-9])/),
  body("name").trim().isLength({ min: 2, max: 50 }),
];

// API route with security
app.post("/api/users", authenticate, userValidation, async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Create user
  try {
    const user = await createUser(req.body);
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    // Generic error message
    res.status(500).json({ error: "Internal server error" });
    // Log actual error
    logger.error("Error creating user:", error);
  }
});

// Secure API endpoint
app.get(
  "/api/users/:id",
  authenticate,
  authorize("users.read"),
  async (req, res) => {
    try {
      // User can only access their own data (unless admin)
      if (req.user.role !== "admin" && req.user.userId !== req.params.id) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const user = await getUser(req.params.id);
      res.json({ id: user.id, email: user.email, name: user.name });
    } catch (error) {
      if (error.code === "USER_NOT_FOUND") {
        return res.status(404).json({ error: "Not found" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration,
      userId: req.user?.userId,
      ip: req.ip,
    });
  });

  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err);

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  res.status(500).json({ error: "Internal server error" });
});
```

### Best Practices:

1. **Always use HTTPS**: Luôn dùng HTTPS
2. **Validate all inputs**: Validate tất cả inputs
3. **Implement rate limiting**: Implement rate limiting
4. **Use security headers**: Dùng security headers

```javascript
// ✅ Nên: Use HTTPS, rate limiting, input validation
app.use(helmet());
app.use(rateLimit({ max: 100, windowMs: 60000 }));
app.post("/api/users", validateInput, handler);

// ✅ Nên: Use authentication and authorization
app.get("/api/users", authenticate, authorize("users.read"), handler);

// ✅ Nên: Log all API calls
app.use(loggingMiddleware);

// ❌ Không nên: Expose sensitive information in errors
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message, stack: err.stack });
  // Exposes sensitive information!
});
```

---

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OAuth 2.0 RFC](https://tools.ietf.org/html/rfc6749)
- [JWT.io](https://jwt.io/)
