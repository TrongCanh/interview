# 2. Load Balancing

## Tổng quan về Load Balancing

### Mục đích của Load Balancing / Purpose

**Load Balancing** là quá trình phân phối incoming network traffic đến nhiều servers để đảm bảo không có server nào bị quá tải.

**Mục đích chính:**

- Phân phối traffic đều đến các servers
- Tăng availability và reliability
- Tăng scalability bằng cách thêm servers
- Đảm bảo seamless user experience
- Ngăn chặn single point of failure

### Khi nào cần hiểu về Load Balancing / When to Use

Hiểu về Load Balancing là cần thiết khi:

- Thiết kế hệ thống có nhiều servers
- Xử lý traffic lớn
- Đảm bảo high availability
- Triển khai microservices
- Cần horizontal scaling

### Giúp ích gì / Benefits

**Lợi ích:**

- **Scalability**: Dễ dàng thêm servers khi traffic tăng
- **Redundancy**: Có backup servers khi một server fail
- **Efficiency**: Tối ưu resource utilization
- **Flexibility**: Có thể thêm/bớt servers dynamically
- **Security**: Ẩn backend servers khỏi internet

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm                |
| ----------------- | ------------------------- |
| Tăng availability | Thêm độ phức tạp          |
| Dễ scale          | Cần quản lý nhiều servers |
| Tăng reliability  | Chi phí tăng              |
| Failover tự động  | Cần monitoring            |

---

## Load balancer là gì?

**Load balancer** là một thiết bị hoặc phần mềm đóng vai trò trung gian, phân phối incoming traffic đến nhiều backend servers.

### Mục đích / Purpose

Phân phối traffic đều và hiệu quả đến các backend servers.

### Khi nào dùng / When to Use

| Tình huống        | Khi nào dùng                 |
| ----------------- | ---------------------------- |
| Multiple servers  | Khi có nhiều backend servers |
| High traffic      | Khi traffic lớn              |
| High availability | Khi cần high availability    |
| SSL termination   | Khi cần offload SSL          |

### Giúp ích gì / Benefits

- **Traffic distribution**: Phân phối traffic đều
- **Health checks**: Kiểm tra health của servers
- **SSL offloading**: Xử lý SSL/TLS
- **Session persistence**: Duy trì session cho user
- **Security**: Ẩn backend servers

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                    | Nhược điểm                  |
| -------------------------- | --------------------------- |
| Phân phối traffic hiệu quả | Có thể trở thành bottleneck |
| Health checks tự động      | Thêm một điểm failure       |
| - SSL offloading           | Cần cấu hình phức tạp       |

### Ví dụ:

```javascript
// Load Balancer Architecture
const loadBalancerArchitecture = {
  client: "Client sends requests",
  loadBalancer: "Load balancer receives and distributes",
  servers: ["Server 1", "Server 2", "Server 3", "Server N"],
};

// Simple Load Balancer Implementation (Round Robin)
class LoadBalancer {
  constructor(servers) {
    this.servers = servers;
    this.currentIndex = 0;
  }

  getNextServer() {
    const server = this.servers[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.servers.length;
    return server;
  }

  async handleRequest(request) {
    const server = this.getNextServer();
    console.log(`Routing to ${server}`);
    return await this.sendRequest(server, request);
  }

  async sendRequest(server, request) {
    // Simulate sending request to server
    return { server, status: "success", data: "response" };
  }
}

// Usage
const servers = [
  "server1.example.com",
  "server2.example.com",
  "server3.example.com",
];
const lb = new LoadBalancer(servers);

// Requests will be distributed round-robin
lb.handleRequest({ url: "/api/users" }); // server1
lb.handleRequest({ url: "/api/users" }); // server2
lb.handleRequest({ url: "/api/users" }); // server3
lb.handleRequest({ url: "/api/users" }); // server1 (back to start)
```

### Best Practices:

1. **Health checks**: Implement health checks
2. **Multiple algorithms**: Chọn algorithm phù hợp
3. **Monitoring**: Theo dõi load balancer performance
4. **Redundancy**: Sử dụng redundant load balancers

```javascript
// ✅ Nên: Load balancer với health checks
class LoadBalancerWithHealthChecks {
  constructor(servers) {
    this.servers = servers.map((server) => ({
      ...server,
      healthy: true,
      lastCheck: Date.now(),
    }));
    this.currentIndex = 0;
  }

  async getNextServer() {
    const healthyServers = this.servers.filter((s) => s.healthy);

    if (healthyServers.length === 0) {
      throw new Error("No healthy servers available");
    }

    const server = healthyServers[this.currentIndex % healthyServers.length];
    this.currentIndex++;
    return server;
  }

  async handleRequest(request) {
    try {
      const server = await this.getNextServer();
      const response = await this.sendRequest(server, request);

      // Mark server as healthy
      server.healthy = true;
      return response;
    } catch (error) {
      // Mark server as unhealthy
      server.healthy = false;
      throw error;
    }
  }

  async sendRequest(server, request) {
    // Implement actual request sending
    return { server: server.url, status: "success" };
  }

  async healthCheck() {
    for (const server of this.servers) {
      try {
        await this.checkServerHealth(server);
        server.healthy = true;
      } catch (error) {
        server.healthy = false;
      }
    }
  }
}

// ❌ Không nên: Load balancer không có health checks
class SimpleLoadBalancer {
  constructor(servers) {
    this.servers = servers;
    this.currentIndex = 0;
  }

  getNextServer() {
    const server = this.servers[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.servers.length;
    return server;
    // Không kiểm tra server còn hoạt động không
  }
}
```

---

## Load Balancing Algorithms

### Round Robin

**Round Robin** phân phối requests theo thứ tự tuần tự đến từng server.

```javascript
// Round Robin Algorithm
class RoundRobinBalancer {
  constructor(servers) {
    this.servers = servers;
    this.currentIndex = 0;
  }

  getNextServer() {
    const server = this.servers[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.servers.length;
    return server;
  }
}

// Example
const roundRobin = new RoundRobinBalancer(["s1", "s2", "s3"]);
roundRobin.getNextServer(); // s1
roundRobin.getNextServer(); // s2
roundRobin.getNextServer(); // s3
roundRobin.getNextServer(); // s1
```

### Least Connections

**Least Connections** phân phối request đến server có ít active connections nhất.

```javascript
// Least Connections Algorithm
class LeastConnectionsBalancer {
  constructor(servers) {
    this.servers = servers.map((server) => ({
      url: server,
      connections: 0,
    }));
  }

  getNextServer() {
    // Find server with minimum connections
    return this.servers.reduce((min, server) =>
      server.connections < min.connections ? server : min,
    );
  }

  acquireServer(server) {
    server.connections++;
  }

  releaseServer(server) {
    server.connections--;
  }

  async handleRequest(request) {
    const server = this.getNextServer();
    this.acquireServer(server);

    try {
      const response = await this.sendRequest(server, request);
      return response;
    } finally {
      this.releaseServer(server);
    }
  }
}
```

### IP Hash

**IP Hash** phân phối request dựa trên hash của client IP để đảm bảo cùng một client luôn đến cùng server.

```javascript
// IP Hash Algorithm
class IPHashBalancer {
  constructor(servers) {
    this.servers = servers;
  }

  hash(ip) {
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < ip.length; i++) {
      hash = (hash << 5) - hash + ip.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  getNextServer(clientIP) {
    const hash = this.hash(clientIP);
    const index = hash % this.servers.length;
    return this.servers[index];
  }

  async handleRequest(request, clientIP) {
    const server = this.getNextServer(clientIP);
    return await this.sendRequest(server, request);
  }
}

// Example: Same client IP always routes to same server
const ipHash = new IPHashBalancer(["s1", "s2", "s3"]);
ipHash.getNextServer("192.168.1.1"); // Always returns same server
ipHash.getNextServer("192.168.1.1"); // Same server
ipHash.getNextServer("192.168.1.2"); // May be different server
```

### Weighted Round Robin

**Weighted Round Robin** phân phối requests dựa trên weight của mỗi server (server mạnh hơn nhận nhiều requests hơn).

```javascript
// Weighted Round Robin Algorithm
class WeightedRoundRobinBalancer {
  constructor(servers) {
    this.servers = servers.map((server) => ({
      url: server.url,
      weight: server.weight || 1,
      currentWeight: 0,
    }));
  }

  getNextServer() {
    let selectedServer = this.servers[0];
    let maxCurrentWeight = -Infinity;

    // Add weight to current weight of all servers
    for (const server of this.servers) {
      server.currentWeight += server.weight;
      if (server.currentWeight > maxCurrentWeight) {
        maxCurrentWeight = server.currentWeight;
        selectedServer = server;
      }
    }

    // Subtract total weight from selected server
    const totalWeight = this.servers.reduce((sum, s) => sum + s.weight, 0);
    selectedServer.currentWeight -= totalWeight;

    return selectedServer.url;
  }
}

// Example: Server with weight 3 gets 3x more requests
const weightedRR = new WeightedRoundRobinBalancer([
  { url: "s1", weight: 1 },
  { url: "s2", weight: 3 }, // s2 gets 3x more requests
]);
```

### Comparison:

```javascript
// Load Balancing Algorithms Comparison
const algorithms = {
  roundRobin: {
    description: "Distribute requests sequentially",
    pros: ["Simple", "Fair distribution", "No state needed"],
    cons: ["Ignores server load", "Ignores server capacity"],
    useCase: "Servers with similar capacity",
  },

  leastConnections: {
    description: "Route to server with least connections",
    pros: ["Considers server load", "Better for varying request times"],
    cons: ["Requires tracking connections", "More complex"],
    useCase: "Requests with varying processing times",
  },

  ipHash: {
    description: "Route based on client IP hash",
    pros: ["Session persistence", "Same client to same server"],
    cons: ["Uneven distribution", "Not good for dynamic IPs"],
    useCase: "When session persistence is needed",
  },

  weightedRoundRobin: {
    description: "Distribute based on server weights",
    pros: ["Considers server capacity", "Flexible"],
    cons: ["Requires weight configuration", "Manual tuning"],
    useCase: "Servers with different capacities",
  },
};
```

### Best Practices:

1. **Choose based on use case**: Chọn algorithm phù hợp với use case
2. **Monitor distribution**: Theo dõi distribution của requests
3. **Adjust weights**: Điều chỉnh weights khi cần
4. **Test under load**: Thử nghiệm dưới load thực tế

```javascript
// ✅ Nên: Chọn algorithm phù hợp với use case
function createLoadBalancer(servers, algorithm, options = {}) {
  switch (algorithm) {
    case "roundRobin":
      return new RoundRobinBalancer(servers);
    case "leastConnections":
      return new LeastConnectionsBalancer(servers);
    case "ipHash":
      return new IPHashBalancer(servers);
    case "weighted":
      return new WeightedRoundRobinBalancer(servers, options.weights);
    default:
      throw new Error(`Unknown algorithm: ${algorithm}`);
  }
}

// Use appropriate algorithm for each scenario
const webServers = createLoadBalancer(
  ["web1", "web2", "web3"],
  "leastConnections", // Good for web servers with varying request times
);

const apiServers = createLoadBalancer(
  [
    { url: "api1", weight: 2 },
    { url: "api2", weight: 1 },
  ],
  "weighted", // Good when servers have different capacities
);

// ❌ Không nên: Sử dụng cùng algorithm cho mọi trường hợp
const lb = new RoundRobinBalancer(servers); // Không phù hợp cho mọi use case
```

---

## L4 vs L7 Load Balancer?

**L4 Load Balancer** hoạt động ở Transport layer (TCP/UDP), dựa trên IP và port để phân phối traffic.

**L7 Load Balancer** hoạt động ở Application layer (HTTP), dựa trên content của request để phân phối.

### Mục đích / Purpose

- **L4**: Phân phối nhanh dựa trên IP/port
- **L7**: Phân phối thông minh dựa trên HTTP content

### Khi nào dùng / When to Use

| Tình huống                     | Load Balancer |
| ------------------------------ | ------------- |
| High performance needed        | L4 (faster)   |
| Content-based routing          | L7 (smarter)  |
| SSL termination                | L7            |
| - Protocol-independent routing | L4            |
| - URL-based routing            | L7            |

### Giúp ích gì / Benefits

- **L4**: Nhanh hơn, ít resource, protocol-independent
- **L7**: Thông minh hơn, có thể routing dựa trên content, SSL termination

### Ưu nhược điểm / Pros & Cons

| Type | Ưu điểm              | Nhược điểm                 |
| ---- | -------------------- | -------------------------- |
| L4   | Nhanh, ít resource   | Không hiểu HTTP content    |
| L7   | Thông minh, flexible | Chậm hơn, tốn resource hơn |

### Ví dụ:

```javascript
// L4 Load Balancer (Transport Layer)
const l4LoadBalancer = {
  layer: "Layer 4 (Transport)",
  protocols: ["TCP", "UDP"],
  routing: "Based on IP address and port",
  decision: {
    source: "Source IP",
    destination: "Destination IP",
    port: "Port number",
  },

  example: `
    Client (192.168.1.1:54321) → Load Balancer
    Load Balancer routes based on:
    - Source IP: 192.168.1.1
    - Destination Port: 443 (HTTPS)
    → Routes to Server 1
  `,

  pros: [
    "Fast (less processing)",
    "Protocol independent",
    "Less resource intensive",
  ],
  cons: [
    "Cannot inspect HTTP content",
    "Cannot do content-based routing",
    "Limited to IP/port routing",
  ],
  useCases: [
    "Database load balancing",
    "Mail servers",
    "High-performance requirements",
  ],
};

// L7 Load Balancer (Application Layer)
const l7LoadBalancer = {
  layer: "Layer 7 (Application)",
  protocols: ["HTTP", "HTTPS", "gRPC"],
  routing: "Based on HTTP content",
  decision: {
    url: "Request URL path",
    headers: "HTTP headers",
    cookies: "Session cookies",
    method: "HTTP method (GET, POST, etc.)",
  },

  example: `
    Client → Load Balancer
    Load Balancer inspects request:
    - URL: /api/users → Routes to User Service
    - URL: /api/orders → Routes to Order Service
    - Header: X-Version=v1 → Routes to v1 service
  `,

  pros: [
    "Content-aware routing",
    "SSL/TLS termination",
    "URL-based routing",
    "Session persistence",
  ],
  cons: [
    "Slower (more processing)",
    "More resource intensive",
    "Protocol-specific",
  ],
  useCases: ["Microservices", "API gateways", "Web applications"],
};

// L7 Routing Example
class L7LoadBalancer {
  constructor(routes) {
    this.routes = routes;
  }

  route(request) {
    const { method, url, headers } = request;

    // Match route based on URL
    for (const route of this.routes) {
      if (this.matchRoute(route, request)) {
        console.log(`Routing ${method} ${url} to ${route.service}`);
        return route.service;
      }
    }

    return this.defaultRoute(request);
  }

  matchRoute(route, request) {
    if (route.method && route.method !== request.method) {
      return false;
    }

    if (route.path && !request.url.startsWith(route.path)) {
      return false;
    }

    if (route.headers) {
      for (const [key, value] of Object.entries(route.headers)) {
        if (request.headers[key] !== value) {
          return false;
        }
      }
    }

    return true;
  }

  defaultRoute(request) {
    console.log(`No route matched, using default`);
    return "default-service";
  }
}

// Usage
const l7LB = new L7LoadBalancer([
  { path: "/api/users", service: "user-service" },
  { path: "/api/orders", service: "order-service" },
  { path: "/api/products", service: "product-service" },
  { method: "GET", path: "/static", service: "cdn-service" },
]);

l7LB.route({ method: "GET", url: "/api/users/123", headers: {} });
// Routes to user-service

l7LB.route({ method: "POST", url: "/api/orders", headers: {} });
// Routes to order-service
```

### Best Practices:

1. **Use L4 for performance**: Sử dụng L4 khi cần performance cao
2. **Use L7 for intelligence**: Sử dụng L7 khi cần routing thông minh
3. **Combine both**: Kết hợp cả L4 và L7 khi cần
4. **Consider SSL termination**: Xem xét L7 cho SSL termination

```javascript
// ✅ Nên: Kết hợp L4 và L7 khi cần
class HybridLoadBalancer {
  constructor() {
    this.l4Balancer = new L4Balancer(["lb1", "lb2"]);
    this.l7Balancer = new L7Balancer(routes);
  }

  async handleRequest(request) {
    // First, route to L7 load balancer using L4
    const l7LB = await this.l4Balancer.getNextServer();

    // Then, L7 load balancer routes based on content
    const backend = this.l7Balancer.route(request);

    return await this.sendRequest(backend, request);
  }
}

// ❌ Không nên: Sử dụng L7 khi chỉ cần L4
// Nếu chỉ cần phân phối dựa trên IP/port, dùng L4 cho performance
```

---

## Health check mechanisms?

**Health checks** là các mechanism để kiểm tra trạng thái của backend servers và loại bỏ servers không hoạt động khỏi rotation.

### Mục đích / Purpose

Đảm bảo chỉ healthy servers nhận traffic.

### Khi nào dùng / When to Use

| Tình huống        | Khi nào dùng                        |
| ----------------- | ----------------------------------- |
| Load balancing    | Luôn cần health checks              |
| Service discovery | Để biết services nào available      |
| - Auto-scaling    | Để scale down unhealthy instances   |
| - Rolling updates | Để verify new instances are healthy |

### Giúp ích gì / Benefits

- **High availability**: Tăng availability bằng cách loại bỏ unhealthy servers
- **Automatic failover**: Tự động failover khi server fail
- **Graceful degradation**: Graceful degradation khi servers fail
- **Self-healing**: Hệ thống tự phục hồi

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                        | Nhược điểm                    |
| ------------------------------ | ----------------------------- |
| Tự động loại unhealthy servers | Thêm overhead                 |
| - Tăng availability            | Cần cấu hình thresholds       |
| - Self-healing                 | False positives có thể xảy ra |

### Health Check Types:

```javascript
// Health Check Types
const healthCheckTypes = {
  tcp: {
    description: "Check if TCP port is open",
    implementation: "Attempt TCP connection",
    pros: ["Simple", "Fast", "Protocol independent"],
    cons: [
      "Does not check service health",
      "Port may be open but service broken",
    ],
  },

  http: {
    description: "Make HTTP request to health endpoint",
    implementation: "GET /health or /healthz",
    pros: ["Checks service health", "Can return detailed status"],
    cons: ["Slower than TCP", "Requires HTTP endpoint"],
  },

  https: {
    description: "Make HTTPS request to health endpoint",
    implementation: "GET /health over HTTPS",
    pros: ["Secure", "Checks SSL certificate"],
    cons: ["Slower than HTTP", "More complex"],
  },

  command: {
    description: "Execute command on server",
    implementation: "Run health check script",
    pros: ["Flexible", "Can check anything"],
    cons: ["Requires agent on server", "Security concerns"],
  },
};

// Health Check Implementation
class HealthChecker {
  constructor(servers, options = {}) {
    this.servers = servers;
    this.healthyServers = new Set(servers);
    this.unhealthyThreshold = options.unhealthyThreshold || 3;
    this.healthyThreshold = options.healthyThreshold || 2;
    this.checkInterval = options.checkInterval || 10000; // 10 seconds
    this.failureCounts = new Map();
    this.successCounts = new Map();
  }

  async checkServer(server) {
    try {
      // TCP health check
      await this.tcpCheck(server.host, server.port);

      // HTTP health check
      await this.httpCheck(`http://${server.host}:${server.port}/health`);

      return true;
    } catch (error) {
      return false;
    }
  }

  async tcpCheck(host, port, timeout = 5000) {
    // Simulate TCP connection check
    return new Promise((resolve, reject) => {
      const socket = require("net").createConnection({ host, port, timeout });

      socket.on("connect", () => {
        socket.destroy();
        resolve();
      });

      socket.on("error", reject);
      socket.on("timeout", () => {
        socket.destroy();
        reject(new Error("Connection timeout"));
      });
    });
  }

  async httpCheck(url, timeout = 5000) {
    const response = await fetch(url, {
      method: "GET",
      timeout: timeout,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== "healthy") {
      throw new Error("Service unhealthy");
    }
  }

  async runHealthCheck() {
    for (const server of this.servers) {
      const isHealthy = await this.checkServer(server);
      this.updateServerHealth(server, isHealthy);
    }
  }

  updateServerHealth(server, isHealthy) {
    const serverId = `${server.host}:${server.port}`;

    if (isHealthy) {
      this.successCounts.set(
        serverId,
        (this.successCounts.get(serverId) || 0) + 1,
      );
      this.failureCounts.set(serverId, 0);

      // Mark as healthy after threshold
      if (this.successCounts.get(serverId) >= this.healthyThreshold) {
        if (!this.healthyServers.has(server)) {
          console.log(`${serverId} is now healthy`);
          this.healthyServers.add(server);
        }
      }
    } else {
      this.failureCounts.set(
        serverId,
        (this.failureCounts.get(serverId) || 0) + 1,
      );
      this.successCounts.set(serverId, 0);

      // Mark as unhealthy after threshold
      if (this.failureCounts.get(serverId) >= this.unhealthyThreshold) {
        if (this.healthyServers.has(server)) {
          console.log(`${serverId} is now unhealthy`);
          this.healthyServers.delete(server);
        }
      }
    }
  }

  getHealthyServers() {
    return Array.from(this.healthyServers);
  }

  start() {
    this.interval = setInterval(() => {
      this.runHealthCheck();
    }, this.checkInterval);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

// Health Check Response Format
const healthResponse = {
  status: "healthy",
  timestamp: "2024-01-01T00:00:00Z",
  checks: {
    database: "ok",
    cache: "ok",
    externalAPI: "degraded",
  },
  version: "1.0.0",
};
```

### Best Practices:

1. **Use appropriate check type**: Chọn type phù hợp
2. **Set appropriate thresholds**: Đặt thresholds phù hợp
3. **Check multiple aspects**: Kiểm tra nhiều yếu tố
4. **Don't overload servers**: Đừng health check quá thường xuyên

```javascript
// ✅ Nên: Health check với thresholds và multiple checks
const healthChecker = new HealthChecker(servers, {
  unhealthyThreshold: 3, // Mark unhealthy after 3 failures
  healthyThreshold: 2, // Mark healthy after 2 successes
  checkInterval: 10000, // Check every 10 seconds
});

healthChecker.start();

// Health endpoint returns detailed status
app.get("/health", async (req, res) => {
  const checks = {
    database: await checkDatabase(),
    cache: await checkCache(),
    redis: await checkRedis(),
  };

  const allHealthy = Object.values(checks).every((c) => c === "ok");

  res.json({
    status: allHealthy ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    checks,
    version: process.env.APP_VERSION,
  });
});

// ❌ Không nên: Health check quá đơn giản hoặc quá thường xuyên
app.get("/health", (req, res) => {
  res.json({ status: "ok" }); // Không check anything
});

// Check every 100ms - too frequent, will overload servers
const checker = new HealthChecker(servers, {
  checkInterval: 100,
});
```

---

## Session persistence / Sticky sessions?

**Session persistence (sticky sessions)** là kỹ thuật đảm bảo tất cả requests từ cùng một client luôn được route đến cùng một server.

### Mục đích / Purpose

Giữ session state trên server cho cùng một user.

### Khi nào dùng / When to Use

| Tình huống              | Khi nào dùng                    |
| ----------------------- | ------------------------------- |
| Session state on server | Khi lưu session trên server     |
| - WebSockets            | Khi dùng WebSockets             |
| - In-memory cache       | Khi dùng in-memory cache        |
| - Stateful applications | Khi application không stateless |

### Giúp ích gì / Benefits

- **Session continuity**: Giữ session continuity
- **Simple implementation**: Đơn giản hơn distributed session
- **Performance**: Có thể nhanh hơn

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                         | Nhược điểm                 |
| ------------------------------- | -------------------------- |
| Đơn giản để implement           | Server failure mất session |
| - Performance tốt               | Không scale tốt            |
| - Không cần distributed session | Load imbalance             |

### Ví dụ:

```javascript
// Session Persistence Implementation
class StickySessionLoadBalancer {
  constructor(servers) {
    this.servers = servers;
    this.clientToServerMap = new Map();
  }

  getServerForClient(clientId) {
    // Check if client has existing session
    if (this.clientToServerMap.has(clientId)) {
      const server = this.clientToServerMap.get(clientId);

      // Verify server is still healthy
      if (this.isServerHealthy(server)) {
        return server;
      } else {
        // Server unhealthy, remove mapping
        this.clientToServerMap.delete(clientId);
      }
    }

    // Assign new server
    const server = this.assignServer(clientId);
    return server;
  }

  assignServer(clientId) {
    // Simple round robin for new clients
    const server =
      this.servers[Math.floor(Math.random() * this.servers.length)];
    this.clientToServerMap.set(clientId, server);
    return server;
  }

  isServerHealthy(server) {
    // Implement health check
    return true;
  }

  async handleRequest(request, clientId) {
    const server = this.getServerForClient(clientId);
    console.log(`Client ${clientId} → Server ${server}`);
    return await this.sendRequest(server, request);
  }
}

// Cookie-based Session Persistence
class CookieBasedStickySession {
  constructor(servers) {
    this.servers = servers;
    this.cookieName = "SERVERID";
  }

  getServerFromRequest(request) {
    const cookie = this.parseCookie(request.headers.cookie);
    const serverId = cookie[this.cookieName];

    if (serverId) {
      return this.servers.find((s) => s.id === serverId);
    }

    return null;
  }

  assignServer(request) {
    const server =
      this.servers[Math.floor(Math.random() * this.servers.length)];
    return server;
  }

  async handleRequest(request, response) {
    let server = this.getServerFromRequest(request);

    if (!server) {
      server = this.assignServer(request);
      // Set cookie for future requests
      response.setHeader(
        "Set-Cookie",
        `${this.cookieName}=${server.id}; Path=/`,
      );
    }

    return await this.sendRequest(server, request);
  }

  parseCookie(cookieHeader) {
    const cookies = {};
    if (cookieHeader) {
      cookieHeader.split(";").forEach((cookie) => {
        const [name, value] = cookie.trim().split("=");
        cookies[name] = value;
      });
    }
    return cookies;
  }
}

// IP Hash Session Persistence
class IPHashStickySession {
  constructor(servers) {
    this.servers = servers;
  }

  hash(ip) {
    let hash = 0;
    for (let i = 0; i < ip.length; i++) {
      hash = (hash << 5) - hash + ip.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  getServerForClient(clientIP) {
    const hash = this.hash(clientIP);
    const index = hash % this.servers.length;
    return this.servers[index];
  }

  async handleRequest(request, clientIP) {
    const server = this.getServerForClient(clientIP);
    return await this.sendRequest(server, request);
  }
}
```

### Best Practices:

1. **Use stateless when possible**: Dùng stateless khi có thể
2. **Use distributed session**: Dùng distributed session để scale tốt hơn
3. **Handle server failure**: Xử lý khi server fail
4. **Consider TTL**: Xem xét TTL cho session mappings

```javascript
// ✅ Nên: Stateless với distributed session (Redis)
// No sticky sessions needed
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  }),
);

// Load balancer can use any algorithm
const lb = new LoadBalancer(servers);

// ❌ Không nên: Sticky sessions với session state on server
// Server failure = lost sessions
const stickyLB = new StickySessionLoadBalancer(servers);
// If server1 fails, all users on server1 lose their sessions
```

---

## References

- [NGINX Load Balancing](https://www.nginx.com/resources/glossary/load-balancing/)
- [HAProxy Documentation](https://www.haproxy.org/#docs)
- [AWS Load Balancing](https://aws.amazon.com/elasticloadbalancing/)
