# 6. Microservices Architecture

## Tổng quan về Microservices Architecture

### Mục đích của Microservices Architecture / Purpose

**Microservices Architecture** là một architectural style chia nhỏ application thành nhiều small, independent services.

**Mục đích chính:**

- Tăng scalability và flexibility
- Giảm coupling giữa các components
- Enable independent deployment
- Tăng fault isolation
- Enable technology diversity

### Khi nào cần hiểu về Microservices Architecture / When to Use

Hiểu về Microservices Architecture là cần thiết khi:

- Monolith trở nên quá lớn
- Cần independent scaling
- Cần independent deployment
- Cần fault isolation
- Team sizes tăng

### Giúp ích gì / Benefits

**Lợi ích:**

- **Scalability**: Scale từng service độc lập
- **Flexibility**: Dùng technology khác nhau cho từng service
- **Independent deployment**: Deploy từng service độc lập
- **Fault isolation**: Lỗi ở một service không ảnh hưởng toàn hệ thống
- **Team autonomy**: Teams có thể làm việc độc lập

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                  | Nhược điểm                    |
| ------------------------ | ----------------------------- |
| - Independent scaling    | Distributed system complexity |
| - Independent deployment | Network latency               |
| - Fault isolation        | Data consistency challenges   |
| - Technology diversity   | Testing complexity            |
| - Team autonomy          | DevOps overhead               |

---

## Monolith vs Microservices?

**Monolith** là single deployable unit chứa toàn bộ application. **Microservices** là nhiều small services.

### Mục đích / Purpose

Chọn architecture phù hợp với project size và requirements.

### Khi nào dùng / When to Use

| Use Case                 | Monolith | Microservices |
| ------------------------ | -------- | ------------- |
| Small team               | ✅       | ❌            |
| - Simple application     | ✅       | ❌            |
| - Fast time to market    | ✅       | ❌            |
| - Large team             | Limited  | ✅            |
| - Independent scaling    | Limited  | ✅            |
| - Independent deployment | Limited  | ✅            |

### Giúp ích gì / Benefits

- **Monolith**: Đơn giản, dễ deploy, dễ debug
- **Microservices**: Scalable, flexible, fault isolated

### Ưu nhược điểm / Pros & Cons

| Feature         | Monolith | Microservices |
| --------------- | -------- | ------------- |
| Complexity      | Low      | High          |
| Deployment      | Simple   | Complex       |
| Scaling         | Limited  | Flexible      |
| Fault isolation | Poor     | Good          |
| Technology      | Single   | Multiple      |
| Debugging       | Easy     | Hard          |
| Testing         | Simple   | Complex       |

### Ví dụ:

```javascript
// Monolith Architecture
const monolithArchitecture = {
  structure: "Single application with all functionality",
  components: [
    "User module",
    "Order module",
    "Payment module",
    "Notification module",
    "Inventory module",
  ],
  database: "Single database for all modules",
  deployment: "Deploy entire application",
  scaling: "Scale entire application",

  pros: [
    "Simple to develop",
    "Easy to deploy",
    "Easy to test",
    "No network latency",
    "Simple debugging",
  ],

  cons: [
    "Hard to scale",
    "Single point of failure",
    "Technology lock-in",
    "Hard to maintain as it grows",
    "Coupled code",
  ],
};

// Microservices Architecture
const microservicesArchitecture = {
  structure: "Multiple independent services",
  services: [
    { name: "User Service", responsibility: "User management" },
    { name: "Order Service", responsibility: "Order processing" },
    { name: "Payment Service", responsibility: "Payment processing" },
    { name: "Notification Service", responsibility: "Notifications" },
    { name: "Inventory Service", responsibility: "Inventory management" },
  ],
  database: "Each service has its own database",
  deployment: "Deploy each service independently",
  scaling: "Scale each service independently",

  pros: [
    "Independent scaling",
    "Independent deployment",
    "Fault isolation",
    "Technology diversity",
    "Team autonomy",
  ],

  cons: [
    "Distributed system complexity",
    "Network latency",
    "Data consistency challenges",
    "Complex testing",
    "DevOps overhead",
  ],
};

// Monolith Example
const monolithApp = {
  // Single application with all modules
  modules: {
    user: require("./modules/user"),
    order: require("./modules/order"),
    payment: require("./modules/payment"),
    notification: require("./modules/notification"),
  },

  // Single database
  database: new Database("monolith-db"),

  // All routes in one place
  routes: {
    "/users": monolithApp.modules.user,
    "/orders": monolithApp.modules.order,
    "/payments": monolithApp.modules.payment,
    "/notifications": monolithApp.modules.notification,
  },
};

// Microservices Example
const microservices = {
  // Each service is independent
  services: {
    userService: {
      host: "user-service",
      port: 3001,
      database: "user-db",
    },
    orderService: {
      host: "order-service",
      port: 3002,
      database: "order-db",
    },
    paymentService: {
      host: "payment-service",
      port: 3003,
      database: "payment-db",
    },
    notificationService: {
      host: "notification-service",
      port: 3004,
      database: "notification-db",
    },
  },

  // API Gateway routes to appropriate service
  apiGateway: {
    "/users/*": "user-service:3001",
    "/orders/*": "order-service:3002",
    "/payments/*": "payment-service:3003",
    "/notifications/*": "notification-service:3004",
  },
};

// Monolith Code Example
class MonolithApp {
  constructor() {
    this.db = new Database("monolith-db");
  }

  async createUser(userData) {
    // All in one transaction
    await this.db.beginTransaction();
    try {
      const userId = await this.db.insert("users", userData);
      await this.db.insert("profiles", { userId, ...userData.profile });
      await this.db.insert("preferences", { userId, ...userData.preferences });
      await this.db.commitTransaction();
      return userId;
    } catch (error) {
      await this.db.rollbackTransaction();
      throw error;
    }
  }

  async createOrder(orderData) {
    // Direct database access
    await this.db.beginTransaction();
    try {
      const orderId = await this.db.insert("orders", orderData);
      await this.updateInventory(orderData.items);
      await this.processPayment(orderData.payment);
      await this.sendNotification(orderData.userId, "Order created");
      await this.db.commitTransaction();
      return orderId;
    } catch (error) {
      await this.db.rollbackTransaction();
      throw error;
    }
  }
}

// Microservices Code Example
// User Service
class UserService {
  constructor() {
    this.db = new Database("user-db");
  }

  async createUser(userData) {
    return await this.db.insert("users", userData);
  }
}

// Order Service
class OrderService {
  constructor() {
    this.db = new Database("order-db");
    this.userService = new ServiceClient("user-service");
    this.inventoryService = new ServiceClient("inventory-service");
    this.paymentService = new ServiceClient("payment-service");
    this.notificationService = new ServiceClient("notification-service");
  }

  async createOrder(orderData) {
    // Create order
    const orderId = await this.db.insert("orders", orderData);

    // Call other services
    await this.inventoryService.reserveItems(orderData.items);
    await this.paymentService.processPayment(orderData.payment);
    await this.notificationService.sendNotification(
      orderData.userId,
      "Order created",
    );

    return orderId;
  }
}

// Comparison
const comparison = {
  monolith: {
    codebase: "Single codebase",
    database: "Single database",
    deployment: "Deploy entire application",
    scaling: "Scale entire application",
    communication: "In-memory function calls",
    debugging: "Easy - single codebase",
    testing: "Simple - single application",
    team: "Single team or coordinated teams",
    bestFor: "Small teams, simple applications, fast MVP",
  },

  microservices: {
    codebase: "Multiple codebases",
    database: "Multiple databases",
    deployment: "Deploy each service independently",
    scaling: "Scale each service independently",
    communication: "HTTP/gRPC/message queue",
    debugging: "Hard - distributed tracing needed",
    testing: "Complex - integration testing",
    team: "Multiple autonomous teams",
    bestFor: "Large teams, complex applications, independent scaling needed",
  },
};

// Migration Path: Monolith to Microservices
const migrationPath = {
  step1: "Identify bounded contexts",
  step2: "Extract one service at a time",
  step3: "Use API Gateway for routing",
  step4: "Implement service communication",
  step5: "Migrate data to service database",
  step6: "Repeat for other services",
  step7: "Remove extracted code from monolith",
};
```

### Best Practices:

1. **Start with monolith**: Bắt đầu với monolith
2. **Extract when needed**: Extract services khi cần
3. **Use bounded contexts**: Dùng bounded contexts để define services
4. **Consider team size**: Cân nhắc team size

```javascript
// ✅ Nên: Bắt đầu với monolith cho small teams
const app = new MonolithApp();
// Đơn giản, dễ deploy, dễ debug

// ✅ Nên: Extract thành microservices khi cần
// Khi order service cần scale độc lập
const orderService = new OrderService();
// Có thể scale riêng biệt

// ❌ Không nên: Bắt đầu với microservices cho small projects
// Overkill cho small teams và simple applications
```

---

## Service discovery?

**Service discovery** là cơ chế cho phép services tìm và giao tiếp với nhau mà không cần hardcode addresses.

### Mục đích / Purpose

Cho phép services động discover và giao tiếp với nhau.

### Khi nào dùng / When to Use

| Tình huống                | Khi nào dùng                       |
| ------------------------- | ---------------------------------- |
| - Dynamic services        | Khi services thay đổi thường xuyên |
| - Auto-scaling            | Khi services auto-scale            |
| - Container orchestration | Khi dùng Kubernetes/Docker         |
| - Cloud environments      | Khi ở cloud environment            |

### Giúp ích gì / Benefits

- **Dynamic discovery**: Services tự động discover
- **Load balancing**: Tự động load balancing
- **Fault tolerance**: Tự động failover
- **Flexibility**: Dễ thêm/bớt services

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm         |
| ------------------- | ------------------ |
| - Dynamic discovery | Thêm complexity    |
| - Auto failover     | Cần infrastructure |
| - Load balancing    | Network overhead   |

### Ví dụ:

```javascript
// Service Discovery Strategies

// 1. Client-side Service Discovery
const clientSideDiscovery = {
  description: "Client queries service registry to find service instances",
  flow: [
    "Client → Service Registry: Get service instances",
    "Client → Service Instance: Direct call",
  ],
  pros: ["No single point of failure", "Client controls load balancing"],
  cons: ["Client complexity", "Need to implement retry logic"],
  examples: ["Eureka", "Consul", "Zookeeper"],
};

// 2. Server-side Service Discovery
const serverSideDiscovery = {
  description: "Client calls load balancer which routes to service instances",
  flow: [
    "Client → Load Balancer: Call service",
    "Load Balancer → Service Instance: Route call",
  ],
  pros: ["Simple client", "Centralized load balancing"],
  cons: ["Load balancer is single point of failure", "Additional hop"],
  examples: ["AWS ALB", "Nginx", "HAProxy"],
};

// Eureka Example (Netflix)
const Eureka = require("eureka-js-client").Eureka;

// Service Registration
const client = new Eureka({
  instance: {
    app: "order-service",
    hostName: "order-service-1",
    ipAddr: "192.168.1.100",
    statusPageUrl: "http://192.168.1.100:8080/info",
    port: {
      $: 8080,
      "@enabled": true,
    },
    dataCenterInfo: {
      "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
      name: "MyOwn",
    },
  },
  eureka: {
    serviceUrls: ["http://eureka-server:8761/eureka/"],
  },
});

client.start((error) => {
  console.log(error || "Eureka registration complete");
});

// Service Discovery via Eureka
function getServiceInstances(appName) {
  const instances = client.getInstancesByAppId(appName);
  return instances.map((instance) => ({
    host: instance.hostName,
    port: instance.port["$"],
    url: `http://${instance.hostName}:${instance.port["$"]}`,
  }));
}

// Use discovered service
const orderServiceInstances = getServiceInstances("ORDER-SERVICE");
const orderService = orderServiceInstances[0]; // or load balance
const response = await fetch(`${orderService.url}/orders`);

// Consul Example
const Consul = require("consul");

const consul = new Consul({
  host: "consul-server",
  port: 8500,
});

// Service Registration
await consul.agent.service.register({
  name: "order-service",
  address: "order-service-1",
  port: 8080,
  check: {
    http: "http://order-service-1:8080/health",
    interval: "10s",
  },
});

// Service Discovery
async function getServiceInstances(serviceName) {
  const result = await consul.health.service(serviceName);
  return result.map((entry) => ({
    host: entry.Service.Address,
    port: entry.Service.Port,
    url: `http://${entry.Service.Address}:${entry.Service.Port}`,
  }));
}

// Kubernetes Service Discovery
// Kubernetes provides built-in service discovery via DNS
const kubernetesServiceDiscovery = {
  description: "Kubernetes provides DNS-based service discovery",
  serviceName: "order-service",
  dnsName: "order-service.default.svc.cluster.local",

  usage: `
    // Services can be accessed by DNS name
    const response = await fetch('http://order-service.default.svc.cluster.local/orders');
  `,
};

// Load Balancing with Service Discovery
class ServiceClient {
  constructor(serviceName, discoveryClient) {
    this.serviceName = serviceName;
    this.discoveryClient = discoveryClient;
    this.currentIndex = 0;
  }

  async getInstances() {
    return await this.discoveryClient.getServiceInstances(this.serviceName);
  }

  async call(path, options = {}) {
    const instances = await this.getInstances();

    if (instances.length === 0) {
      throw new Error(`No instances available for ${this.serviceName}`);
    }

    // Round-robin load balancing
    const instance = instances[this.currentIndex % instances.length];
    this.currentIndex++;

    try {
      const response = await fetch(`${instance.url}${path}`, options);
      return await response.json();
    } catch (error) {
      // Retry with next instance
      console.error(`Failed to call ${instance.url}, trying next instance`);
      return await this.call(path, options);
    }
  }
}

// Usage
const serviceClient = new ServiceClient("ORDER-SERVICE", eurekaClient);
const orders = await serviceClient.call("/orders");

// Health Checks for Service Discovery
const healthCheck = {
  description: "Services must report health to service registry",

  implementation: `
    app.get('/health', (req, res) => {
      // Check database connection
      const dbHealthy = await checkDatabase();
      
      // Check external dependencies
      const externalHealthy = await checkExternalServices();
      
      if (dbHealthy && externalHealthy) {
        res.status(200).json({ status: 'UP' });
      } else {
        res.status(503).json({ status: 'DOWN', checks: { db: dbHealthy, external: externalHealthy }});
      }
    });
  `,
};
```

### Best Practices:

1. **Use built-in discovery when possible**: Dùng built-in discovery khi có thể
2. **Implement health checks**: Implement health checks
3. **Handle service unavailability**: Xử lý khi service unavailable
4. **Cache service instances**: Cache service instances

```javascript
// ✅ Nên: Sử dụng Kubernetes service discovery
// Built-in, no extra infrastructure
const response = await fetch("http://order-service/orders");

// ✅ Nên: Implement health checks
app.get("/health", async (req, res) => {
  const healthy = await checkDependencies();
  res.status(healthy ? 200 : 503).json({ status: healthy ? "UP" : "DOWN" });
});

// ❌ Không nên: Hardcode service URLs
const response = await fetch("http://192.168.1.100:8080/orders");
// Không dynamic, không failover
```

---

## API Gateway?

**API Gateway** là một entry point duy nhất cho tất cả client requests, routing đến appropriate microservices.

### Mục đích / Purpose

Cung cấp single entry point cho microservices architecture.

### Khi nào dùng / When to Use

| Tình huống               | Khi nào dùng                              |
| ------------------------ | ----------------------------------------- |
| - Multiple microservices | Khi có nhiều microservices                |
| - Cross-cutting concerns | Khi cần centralize cross-cutting concerns |
| - Security               | Khi cần centralize security               |
| - Rate limiting          | Khi cần rate limiting                     |

### Giúp ích gì / Benefits

- **Single entry point**: Single entry point cho clients
- **Cross-cutting concerns**: Centralize cross-cutting concerns
- **Security**: Centralize security
- **Load balancing**: Load balancing cho services

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm              |
| --------------------- | ----------------------- |
| - Single entry point  | Single point of failure |
| - Centralize concerns | Thêm latency            |
| - Simplify clients    | Thêm complexity         |
| - Security            | Thêm infrastructure     |

### Ví dụ:

```javascript
// API Gateway Patterns

const apiGatewayPatterns = {
  routing: {
    description: "Route requests to appropriate service",
    example: "/api/users → User Service",
  },

  composition: {
    description: "Compose multiple service responses",
    example:
      "GET /api/order/123 → Call Order Service + User Service + Payment Service",
  },

  protocolTranslation: {
    description: "Translate between protocols",
    example: "HTTP → gRPC",
  },

  transformation: {
    description: "Transform request/response",
    example: "JSON → XML",
  },
};

// API Gateway Implementation
class APIGateway {
  constructor() {
    this.routes = new Map();
    this.middleware = [];
    this.rateLimiter = new RateLimiter();
    this.auth = new AuthService();
  }

  route(path, serviceUrl) {
    this.routes.set(path, serviceUrl);
  }

  use(middleware) {
    this.middleware.push(middleware);
  }

  async handleRequest(req, res) {
    try {
      // Apply middleware
      for (const mw of this.middleware) {
        await mw(req, res);
        if (res.finished) return;
      }

      // Rate limiting
      if (!this.rateLimiter.check(req.ip)) {
        return res.status(429).json({ error: "Rate limit exceeded" });
      }

      // Authentication
      const user = await this.auth.verify(req.headers.authorization);
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      req.user = user;

      // Route to service
      const serviceUrl = this.findService(req.path);
      if (!serviceUrl) {
        return res.status(404).json({ error: "Not found" });
      }

      // Proxy to service
      const response = await this.proxy(req, serviceUrl);
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  findService(path) {
    // Simple path matching
    for (const [route, serviceUrl] of this.routes) {
      if (path.startsWith(route)) {
        return serviceUrl;
      }
    }
    return null;
  }

  async proxy(req, serviceUrl) {
    const url = serviceUrl + req.path;
    const response = await fetch(url, {
      method: req.method,
      headers: req.headers,
      body: req.body,
    });
    return {
      status: response.status,
      data: await response.json(),
    };
  }
}

// Usage
const gateway = new APIGateway();

// Define routes
gateway.route("/api/users", "http://user-service:3001");
gateway.route("/api/orders", "http://order-service:3002");
gateway.route("/api/payments", "http://payment-service:3003");
gateway.route("/api/notifications", "http://notification-service:3004");

// Add middleware
gateway.use(async (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

gateway.use(async (req, res, next) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// API Gateway Features
const apiGatewayFeatures = {
  routing: {
    description: "Route requests to appropriate microservice",
    example: "/api/users → User Service",
  },

  loadBalancing: {
    description: "Distribute load across service instances",
    example: "Round-robin, least connections",
  },

  authentication: {
    description: "Centralize authentication",
    example: "JWT verification, OAuth",
  },

  authorization: {
    description: "Centralize authorization",
    example: "Role-based access control",
  },

  rateLimiting: {
    description: "Limit requests per client",
    example: "100 requests per minute",
  },

  caching: {
    description: "Cache responses",
    example: "Cache GET requests",
  },

  requestResponseTransformation: {
    description: "Transform requests and responses",
    example: "JSON to XML, add headers",
  },

  serviceComposition: {
    description: "Combine responses from multiple services",
    example: "Order + User + Payment data",
  },

  monitoring: {
    description: "Monitor all requests",
    example: "Logging, metrics",
  },

  circuitBreaker: {
    description: "Circuit breaker for failing services",
    example: "Stop calling failing service",
  },
};

// Service Composition Example
class ComposingGateway extends APIGateway {
  async handleRequest(req, res) {
    if (req.path.startsWith("/api/orders/")) {
      // Compose response from multiple services
      const orderId = req.path.split("/")[3];

      const [order, user, payment] = await Promise.all([
        this.callService("order-service", `/orders/${orderId}`),
        this.callService("user-service", `/users/${req.user.id}`),
        this.callService("payment-service", `/payments/${orderId}`),
      ]);

      res.json({
        order,
        user: { name: user.name, email: user.email },
        payment: { status: payment.status, amount: payment.amount },
      });
    } else {
      await super.handleRequest(req, res);
    }
  }

  async callService(serviceName, path) {
    const serviceUrl = this.routes.get(`/api/${serviceName}`);
    const response = await fetch(`${serviceUrl}${path}`);
    return await response.json();
  }
}
```

### Best Practices:

1. **Centralize cross-cutting concerns**: Centralize cross-cutting concerns
2. **Use rate limiting**: Dùng rate limiting
3. **Implement caching**: Implement caching
4. **Monitor everything**: Theo dõi tất cả requests

```javascript
// ✅ Nên: API Gateway cho microservices
const gateway = new APIGateway();
gateway.route("/api/users", "http://user-service:3001");
gateway.route("/api/orders", "http://order-service:3002");

// ✅ Nên: Centralize authentication tại gateway
gateway.use(async (req, res, next) => {
  const user = await authService.verify(req.headers.authorization);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  req.user = user;
  next();
});

// ❌ Không nên: Clients gọi trực tiếp đến services
// Không có centralization, không có security
const response = await fetch("http://user-service:3001/users");
```

---

## References

- [Microservices Patterns](https://microservices.io/patterns/)
- [Building Microservices](https://www.oreilly.com/library/view/building-microservices/9781491950340/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
