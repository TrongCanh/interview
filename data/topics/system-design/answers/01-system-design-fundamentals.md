# 1. System Design Fundamentals

## Tổng quan về System Design Fundamentals

### Mục đích của System Design Fundamentals / Purpose

**System Design Fundamentals** là tập hợp các khái niệm và nguyên lý nền tảng giúp thiết kế các hệ thống phân tán có khả năng mở rộng, đáng tin cậy và hiệu quả.

**Mục đích chính:**

- Hiểu cách xây dựng hệ thống có khả năng xử lý lượng người dùng và dữ liệu lớn
- Đảm bảo hệ thống hoạt động ổn định và có sẵn khi cần
- Thiết kế kiến trúc có thể mở rộng theo nhu cầu kinh doanh
- Đưa ra các quyết định kiến trúc dựa trên trade-offs phù hợp

### Khi nào cần hiểu về System Design Fundamentals / When to Use

Hiểu về System Design Fundamentals là cần thiết khi:

- Thiết kế hệ thống mới từ đầu
- Mở rộng hệ thống hiện tại để phục vụ nhiều người dùng hơn
- Xử lý các vấn đề về performance và availability
- Chuẩn bị cho các buổi phỏng vấn System Design
- Đánh giá và cải thiện kiến trúc hệ thống hiện có

### Giúp ích gì / Benefits

**Lợi ích:**

- **Better decision making**: Có thể đưa ra quyết định kiến trúc dựa trên hiểu biết sâu sắc
- **Scalability**: Xây dựng hệ thống có thể mở rộng theo nhu cầu
- **Reliability**: Đảm bảo hệ thống hoạt động ổn định
- **Cost optimization**: Tối ưu hóa chi phí infrastructure
- **Problem solving**: Có khả năng giải quyết các vấn đề phức tạp

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                        | Nhược điểm                              |
| ------------------------------ | --------------------------------------- |
| Cơ sở vững chắc cho thiết kế   | Cần thời gian để học và áp dụng         |
| Giảm rủi ro kiến trúc sai lầm  | Trade-offs phức tạp cần cân nhắc        |
| Tăng khả năng mở rộng          | Có thể over-engineering nếu áp dụng sai |
| Giải quyết vấn đề hiệu quả hơn | Cần kinh nghiệm thực tế                 |

---

## Scalability là gì? Vertical vs Horizontal scaling?

**Scalability** là khả năng của hệ thống xử lý lượng công việc tăng lên bằng cách thêm tài nguyên.

### Mục đích / Purpose

Đảm bảo hệ thống có thể phục vụ nhiều người dùng hơn hoặc xử lý nhiều dữ liệu hơn mà không bị giảm hiệu năng.

### Khi nào dùng / When to Use

| Tình huống              | Khi nào dùng                                    |
| ----------------------- | ----------------------------------------------- |
| User base tăng          | Cần scale để phục vụ nhiều người dùng hơn       |
| Data volume tăng        | Cần scale để lưu trữ và xử lý nhiều dữ liệu hơn |
| Traffic spike           | Cần scale để xử lý traffic tăng đột biến        |
| Performance degradation | Cần scale để cải thiện hiệu năng                |

### Giúp ích gì / Benefits

- **Growth support**: Hỗ trợ sự tăng trưởng của business
- **User experience**: Duy trì trải nghiệm người dùng tốt
- **Cost efficiency**: Scale theo nhu cầu, tối ưu chi phí
- **Business continuity**: Đảm bảo hệ thống luôn hoạt động

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm                    |
| ---------------------- | ----------------------------- |
| Hỗ trợ tăng trưởng     | Chi phí tăng khi scale        |
| Linh hoạt theo nhu cầu | Quản lý phức tạp hơn          |
| Cải thiện performance  | Có thể gặp vấn đề consistency |

### Vertical Scaling (Scale Up)

**Vertical scaling** là tăng tài nguyên của một máy chủ (CPU, RAM, Storage).

**Ưu điểm:**

- Đơn giản để triển khai
- Không cần thay đổi kiến trúc
- Không gặp vấn đề distributed systems

**Nhược điểm:**

- Giới hạn bởi phần cứng
- Single point of failure
- Chi phí tăng theo cấp số nhân

### Horizontal Scaling (Scale Out)

**Horizontal scaling** là thêm nhiều máy chủ vào hệ thống.

**Ưu điểm:**

- Không giới hạn về khả năng mở rộng
- Tăng availability và fault tolerance
- Chi phí có thể tuyến tính

**Nhược điểm:**

- Kiến trúc phức tạp hơn
- Cần giải quyết vấn đề distributed systems
- Cần load balancing

### Ví dụ:

```javascript
// Vertical Scaling Example
// Thay thế server nhỏ bằng server lớn hơn
// Server: 2 CPU, 4GB RAM → Server: 8 CPU, 32GB RAM

const serverConfig = {
  small: { cpu: 2, ram: "4GB" },
  large: { cpu: 8, ram: "32GB" },
};

// Horizontal Scaling Example
// Thêm nhiều server cùng cấu hình
const servers = [
  { id: 1, cpu: 2, ram: "4GB" },
  { id: 2, cpu: 2, ram: "4GB" },
  { id: 3, cpu: 2, ram: "4GB" },
  // Có thể thêm nhiều server hơn khi cần
];
```

### Best Practices:

1. **Start vertical, go horizontal**: Bắt đầu với vertical scaling, chuyển sang horizontal khi cần
2. **Stateless services**: Thiết kế services stateless để dễ dàng horizontal scale
3. **Auto-scaling**: Sử dụng auto-scaling để tự động scale theo nhu cầu
4. **Monitor metrics**: Theo dõi metrics để biết khi nào cần scale

```javascript
// ✅ Nên: Stateless service cho horizontal scaling
function handleRequest(request) {
  // Xử lý request mà không phụ thuộc vào state local
  const result = processData(request);
  return result;
}

// ❌ Không nên: Stateful service khó scale
let localCache = {};
function handleRequest(request) {
  // Phụ thuộc vào local cache, khó scale
  if (!localCache[request.id]) {
    localCache[request.id] = fetchData(request.id);
  }
  return localCache[request.id];
}
```

---

## Availability vs Reliability?

**Availability** là tỷ lệ thời gian hệ thống sẵn sàng phục vụ. **Reliability** là khả năng hệ thống hoạt động đúng chức năng trong một khoảng thời gian.

### Mục đích / Purpose

- **Availability**: Đảm bảo hệ thống có thể truy cập được
- **Reliability**: Đảm bảo hệ thống hoạt động đúng và không bị lỗi

### Khi nào dùng / When to Use

| Tình huống      | Metric quan trọng                      |
| --------------- | -------------------------------------- |
| E-commerce      | Availability (không thể mất đơn hàng)  |
| Banking         | Reliability (không thể sai số tiền)    |
| Social media    | Availability (người dùng cần truy cập) |
| Medical systems | Reliability (sai sót nguy hiểm)        |

### Giúp ích gì / Benefits

- **Availability**: Duy trì business continuity, tăng revenue
- **Reliability**: Tăng trust, giảm lỗi và hậu quả

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                         | Nhược điểm                 |
| ------------------------------- | -------------------------- |
| High availability → happy users | Chi phí cao để đạt 99.99%+ |
| High reliability → fewer errors | Trade-off với performance  |

### Ví dụ:

```javascript
// Availability: 99.9% = 8.76 giờ downtime/tháng
// Availability: 99.99% = 52.56 phút downtime/tháng
// Availability: 99.999% = 5.26 phút downtime/năm

const availabilityMetrics = {
  "99.9%": { downtime: "8.76 hours/month", cost: "low" },
  "99.99%": { downtime: "52.56 minutes/month", cost: "medium" },
  "99.999%": { downtime: "5.26 minutes/year", cost: "high" },
};

// Reliability: Mean Time Between Failures (MTBF)
const reliabilityMetrics = {
  mtbf: "Mean Time Between Failures",
  mttr: "Mean Time To Repair",
  reliability: "MTBF / (MTBF + MTTR)",
};
```

### Best Practices:

1. **Redundancy**: Sử dụng redundancy để tăng availability
2. **Failover**: Implement failover mechanisms
3. **Monitoring**: Theo dõi cả availability và reliability
4. **Graceful degradation**: Hệ thống vẫn hoạt động khi có lỗi

---

## CAP Theorem là gì?

**CAP Theorem** phát biểu rằng một hệ thống phân tán không thể đồng thời đảm bảo cả 3 thuộc tính: Consistency (tính nhất quán), Availability (tính sẵn sàng), và Partition Tolerance (khả năng chịu phân vùng). Chỉ có thể chọn 2 trong 3.

### Mục đích / Purpose

Hiểu các trade-offs khi thiết kế hệ thống phân tán và chọn chiến lược phù hợp với yêu cầu business.

### Khi nào dùng / When to Use

| Tình huống        | CAP Trade-off                           |
| ----------------- | --------------------------------------- |
| Banking system    | CP (Consistency + Partition Tolerance)  |
| Social media feed | AP (Availability + Partition Tolerance) |
| DNS system        | AP (Availability + Partition Tolerance) |
| Inventory system  | CP (Consistency + Partition Tolerance)  |

### Giúp ích gì / Benefits

- **Informed decisions**: Ra quyết định kiến trúc dựa trên trade-offs
- **Right tool selection**: Chọn công nghệ phù hợp với yêu cầu
- **Expectation management**: Hiểu giới hạn của hệ thống

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                     | Nhược điểm                   |
| --------------------------- | ---------------------------- |
| Hiểu rõ trade-offs          | Không thể có cả 3 thuộc tính |
| Giúp chọn kiến trúc phù hợp | Phải hy sinh một thuộc tính  |

### CAP Components:

```javascript
// Consistency (C)
// Tất cả nodes thấy cùng một dữ liệu tại cùng thời điểm
const consistency = {
  definition: "All nodes see the same data at the same time",
  example: "Banking - balance must be consistent across all servers",
  tradeoff: "May sacrifice availability",
};

// Availability (A)
// Mọi request đều nhận được response (success/failure)
const availability = {
  definition: "Every request receives a response",
  example: "Social media - users can always access the platform",
  tradeoff: "May sacrifice consistency",
};

// Partition Tolerance (P)
// Hệ thống vẫn hoạt động khi có sự cố network
const partitionTolerance = {
  definition: "System continues operating despite network partitions",
  example: "Distributed databases across multiple data centers",
  tradeoff: "Must sacrifice either C or A",
};

// CAP Trade-offs
const capSystems = {
  CP: "Consistency + Partition Tolerance (e.g., HBase, MongoDB)",
  AP: "Availability + Partition Tolerance (e.g., Cassandra, DynamoDB)",
  CA: "Consistency + Availability (e.g., RDBMS - not truly distributed)",
};
```

### Best Practices:

1. **Understand requirements**: Hiểu rõ yêu cầu business (C hay A quan trọng hơn)
2. **Choose appropriate database**: Chọn database phù hợp với CAP trade-off
3. **Design for partition**: Luôn thiết kế với giả định có thể có partition
4. **Eventual consistency**: Xem xét eventual consistency khi AP là ưu tiên

```javascript
// ✅ Nên: Chọn database phù hợp với yêu cầu
if (requiresStrongConsistency) {
  // Chọn CP database
  database = new HBase(); // or MongoDB with strong consistency
} else if (requiresHighAvailability) {
  // Chọn AP database
  database = new Cassandra(); // or DynamoDB
}

// ❌ Không nên: Mong đợi cả C và A trong distributed system
// Không thể có cả consistency và availability khi có partition
```

---

## Consistency models: Strong, Eventual, Causal?

**Consistency models** định nghĩa mức độ đảm bảo về tính nhất quán của dữ liệu trong hệ thống phân tán.

### Mục đích / Purpose

Định nghĩa mức độ nhất quán phù hợp với yêu cầu của ứng dụng.

### Khi nào dùng / When to Use

| Tình huống             | Consistency Model    |
| ---------------------- | -------------------- |
| Banking, Financial     | Strong Consistency   |
| Social media, Comments | Eventual Consistency |
| Collaborative editing  | Causal Consistency   |
| Shopping cart          | Eventual Consistency |

### Giúp ích gì / Benefits

- **Performance**: Eventual consistency có performance tốt hơn
- **Correctness**: Strong consistency đảm bảo tính đúng đắn
- **Flexibility**: Chọn model phù hợp với use case

### Ưu nhược điểm / Pros & Cons

| Model    | Ưu điểm               | Nhược điểm             |
| -------- | --------------------- | ---------------------- |
| Strong   | Đảm bảo tính đúng đắn | Performance thấp       |
| Eventual | Performance cao       | Có thể thấy dữ liệu cũ |
| Causal   | Balance giữa C và E   | Phức tạp hơn           |

### Ví dụ:

```javascript
// Strong Consistency
// Tất cả reads trả về giá trị mới nhất
const strongConsistency = {
  definition: "All reads return the most recent write",
  guarantee: "Linearizability",
  useCases: ["Banking", "Inventory", "Financial transactions"],
  tradeoff: "Higher latency, lower availability",
};

// Eventual Consistency
// Reads có thể trả về giá trị cũ, nhưng sẽ nhất quán sau một khoảng thời gian
const eventualConsistency = {
  definition: "All reads return the most recent write EVENTUALLY",
  guarantee: "Convergence",
  useCases: ["Social media", "DNS", "CDN"],
  tradeoff: "May read stale data, but better performance",
};

// Causal Consistency
// Các operation có quan hệ cause-effect được sắp xếp đúng
const causalConsistency = {
  definition:
    "Operations that are causally related are seen by all processes in the same order",
  guarantee: "Causal order",
  useCases: ["Collaborative editing", "Chat applications"],
  tradeoff: "More complex than eventual, better than strong",
};

// Example: Social media post
// Strong consistency: All users see the same post count immediately
// Eventual consistency: Post count may differ briefly but converges
// Causal consistency: Comments appear after the post they reference
```

### Best Practices:

1. **Choose based on requirements**: Chọn model dựa trên yêu cầu business
2. **Document trade-offs**: Ghi rõ trade-offs cho team hiểu
3. **Monitor consistency**: Theo dõi mức độ consistency trong thực tế
4. **Handle inconsistencies**: Xử lý trường hợp inconsistencies trong code

```javascript
// ✅ Nên: Xử lý eventual consistency trong code
async function getPostWithRetry(postId) {
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    const post = await database.get(postId);

    if (post && post.comments) {
      // Data available, return
      return post;
    }

    // Wait and retry for eventual consistency
    await sleep(100 * Math.pow(2, attempts));
    attempts++;
  }

  throw new Error("Post not available");
}

// ❌ Không nên: Giả định strong consistency khi dùng eventual consistency
async function getPost(postId) {
  const post = await database.get(postId);
  // Không có retry, có thể trả về incomplete data
  return post;
}
```

---

## Latency vs Throughput?

**Latency** là thời gian để xử lý một request. **Throughput** là số lượng requests có thể xử lý trong một khoảng thời gian.

### Mục đích / Purpose

- **Latency**: Đo lường thời gian phản hồi
- **Throughput**: Đo lường khả năng xử lý của hệ thống

### Khi nào dùng / When to Use

| Tình huống             | Metric quan trọng                         |
| ---------------------- | ----------------------------------------- |
| Real-time applications | Latency (gaming, video calls)             |
| Batch processing       | Throughput (data analytics)               |
| API endpoints          | Cả hai (SLA cho cả latency và throughput) |
| Streaming              | Latency (low latency required)            |

### Giúp ích gì / Benefits

- **Performance monitoring**: Theo dõi và cải thiện performance
- **SLA compliance**: Đảm bảo đáp ứng service level agreements
- **Capacity planning**: Lập kế hoạch capacity

### Ưu nhược điểm / Pros & Cons

| Metric     | Ưu điểm                         | Nhược điểm                             |
| ---------- | ------------------------------- | -------------------------------------- |
| Latency    | Đo lường trải nghiệm người dùng | Không phản ánh khả năng xử lý tổng thể |
| Throughput | Đo lường khả năng hệ thống      | Không phản ánh trải nghiệm cá nhân     |

### Ví dụ:

```javascript
// Latency: Thời gian từ khi gửi request đến khi nhận response
const latency = {
  definition: "Time taken to process a single request",
  unit: "milliseconds (ms)",
  calculation: "responseTime - requestTime",
  example: "API response time: 100ms",
};

// Throughput: Số requests xử lý được mỗi giây
const throughput = {
  definition: "Number of requests processed per unit time",
  unit: "requests per second (RPS) or QPS",
  calculation: "totalRequests / totalTime",
  example: "System can handle 10,000 RPS",
};

// Relationship between Latency and Throughput
// Little's Law: L = λW
// L = Average number of requests in system
// λ = Arrival rate (throughput)
// W = Average time in system (latency)

const littleLaw = {
  formula: "L = λW",
  meaning: "Number of requests = Throughput × Latency",
  implication: "For fixed L, improving latency improves throughput",
};

// Example calculations
const metrics = {
  latency: 50, // ms per request
  throughput: 1000, // requests per second
  // If latency increases to 100ms, throughput decreases to 500 RPS
  // If we want 2000 RPS with 50ms latency, need 4x resources
};
```

### Best Practices:

1. **Monitor both metrics**: Theo dõi cả latency và throughput
2. **Set SLAs**: Đặt service level agreements cho cả hai
3. **Optimize bottlenecks**: Tìm và tối ưu hóa bottlenecks
4. **Use caching**: Sử dụng caching để giảm latency và tăng throughput

```javascript
// ✅ Nên: Theo dõi cả latency và throughput
const metrics = {
  latency: measureLatency(),
  throughput: measureThroughput(),
  p50: percentile(50),
  p95: percentile(95),
  p99: percentile(99),
};

console.log(`Latency p95: ${metrics.p95}ms`);
console.log(`Throughput: ${metrics.throughput} RPS`);

// ❌ Không nên: Chỉ theo dõi một metric
console.log(`Latency: ${measureLatency()}ms`); // Missing throughput
```

---

## How to estimate system capacity?

**System capacity estimation** là quá trình tính toán khả năng xử lý của hệ thống dựa trên các yêu cầu business.

### Mục đích / Purpose

Đảm bảo hệ thống có khả năng phục vụ nhu cầu của business với chi phí tối ưu.

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng                  |
| --------------------- | ----------------------------- |
| Thiết kế hệ thống mới | Ước lượng capacity cần thiết  |
| Mở rộng hệ thống      | Tính toán resource cần thêm   |
| Capacity planning     | Lập kế hoạch cho tương lai    |
| Cost optimization     | Tối ưu chi phí infrastructure |

### Gihelp ích gì / Benefits

- **Right sizing**: Đúng lượng resource cần thiết
- **Cost optimization**: Tránh over-provisioning
- **Scalability planning**: Lập kế hoạch mở rộng
- **SLA compliance**: Đảm bảo đáp ứng SLA

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                     | Nhược điểm                             |
| --------------------------- | -------------------------------------- |
| Giúp lập kế hoạch chính xác | Dựa trên giả định, có thể sai          |
| Tối ưu chi phí              | Cần cập nhật khi requirements thay đổi |
| Tránh over-provisioning     | Cần经验和 domain knowledge             |

### Ví dụ:

```javascript
// Capacity Estimation Framework

// Step 1: Define requirements
const requirements = {
  dailyActiveUsers: 10_000_000, // DAU
  requestsPerUserPerDay: 10,
  peakTrafficMultiplier: 2, // Peak is 2x average
  storagePerUser: 100, // MB
  retentionPeriod: 365, // days
};

// Step 2: Calculate QPS (Queries Per Second)
function calculateQPS(requirements) {
  const dailyRequests =
    requirements.dailyActiveUsers * requirements.requestsPerUserPerDay;
  const averageQPS = dailyRequests / (24 * 3600);
  const peakQPS = averageQPS * requirements.peakTrafficMultiplier;

  return {
    averageQPS: Math.ceil(averageQPS),
    peakQPS: Math.ceil(peakQPS),
  };
}

const qps = calculateQPS(requirements);
console.log(`Average QPS: ${qps.averageQPS}`);
console.log(`Peak QPS: ${qps.peakQPS}`);
// Average QPS: 1158
// Peak QPS: 2315

// Step 3: Calculate storage requirements
function calculateStorage(requirements) {
  const dailyStorageGB =
    (requirements.dailyActiveUsers * requirements.storagePerUser) / 1024;
  const totalStorageGB = dailyStorageGB * requirements.retentionPeriod;
  const totalStorageTB = totalStorageGB / 1024;

  return {
    dailyStorageGB: dailyStorageGB.toFixed(2),
    totalStorageGB: totalStorageGB.toFixed(2),
    totalStorageTB: totalStorageTB.toFixed(2),
  };
}

const storage = calculateStorage(requirements);
console.log(`Daily storage: ${storage.dailyStorageGB} GB`);
console.log(`Total storage: ${storage.totalStorageTB} TB`);
// Daily storage: 976562.50 GB
// Total storage: 351562.50 TB

// Step 4: Calculate bandwidth requirements
function calculateBandwidth(requirements, averageResponseSizeKB) {
  const qps = calculateQPS(requirements).averageQPS;
  const bandwidthMbps = (qps * averageResponseSizeKB * 8) / 1000;
  const bandwidthGbps = bandwidthMbps / 1000;

  return {
    bandwidthMbps: bandwidthMbps.toFixed(2),
    bandwidthGbps: bandwidthGbps.toFixed(2),
  };
}

const bandwidth = calculateBandwidth(requirements, 10); // 10KB average response
console.log(`Bandwidth: ${bandwidth.bandwidthGbps} Gbps`);
// Bandwidth: 0.09 Gbps
```

### Best Practices:

1. **Break down the problem**: Chia nhỏ vấn đề thành các thành phần
2. **Use round numbers**: Sử dụng số tròn để dễ tính toán
3. **Consider peak traffic**: Luôn tính toán cho peak traffic
4. **Add safety margin**: Thêm margin cho growth và unexpected spikes
5. **Document assumptions**: Ghi rõ các giả định

```javascript
// ✅ Nên: Document assumptions và calculations
const capacityEstimation = {
  assumptions: {
    dau: 10_000_000,
    requestsPerUser: 10,
    peakMultiplier: 2,
    growthRate: 1.2, // 20% growth per year
    safetyMargin: 1.5, // 50% safety margin
  },
  calculations: {
    averageQPS: 1158,
    peakQPS: 2315,
    withGrowthAndMargin: 2315 * 1.2 * 1.5, // 4167 QPS
  },
  recommendations: {
    targetCapacity: 5000, // Round up
    servers: Math.ceil(5000 / 1000), // Assuming 1000 RPS per server
  },
};

// ❌ Không nên: Không ghi rõ assumptions
const capacity = 5000; // Magic number, không rõ nguồn gốc
```

---

## What is QPS (Queries Per Second)?

**QPS (Queries Per Second)** là số lượng queries hoặc requests mà hệ thống có thể xử lý trong một giây.

### Mục đích / Purpose

Đo lường khả năng xử lý của hệ thống và đặt target cho performance.

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng                 |
| ------------------- | ---------------------------- |
| Performance testing | Đo lường khả năng hệ thống   |
| Capacity planning   | Lập kế hoạch capacity        |
| SLA definition      | Định nghĩa service level     |
| Load testing        | Kiểm tra hệ thống under load |

### Giúp ích gì / Benefits

- **Performance baseline**: Thiết lập baseline cho performance
- **Bottleneck identification**: Tìm ra bottlenecks
- **Capacity planning**: Lập kế hoạch capacity
- **SLA monitoring**: Theo dõi service level

### Ưu nhược điểm / Pros & Cons

| Ưu điểm              | Nhược điểm                    |
| -------------------- | ----------------------------- |
| Đơn giản để đo lường | Không phản ánh latency        |
| Dễ hiểu và so sánh   | Không phản ánh resource usage |
| Standard metric      | Cần kết hợp với metrics khác  |

### Ví dụ:

```javascript
// QPS Calculation
const qpsMetrics = {
  definition: "Number of queries processed per second",
  formula: "totalQueries / totalTimeInSeconds",
  unit: "queries per second (QPS) or requests per second (RPS)",
};

// Example: Calculate QPS from logs
function calculateQPS(logs, timeWindowSeconds = 60) {
  const totalRequests = logs.length;
  const qps = totalRequests / timeWindowSeconds;

  return {
    totalRequests,
    timeWindow: timeWindowSeconds,
    qps: qps.toFixed(2),
  };
}

// Example logs (simplified)
const requestLogs = Array(60000)
  .fill(null)
  .map((_, i) => ({
    timestamp: Date.now() - (60000 - i * 1000), // Last 60 seconds
    endpoint: "/api/users",
  }));

const qpsResult = calculateQPS(requestLogs, 60);
console.log(qpsResult);
// { totalRequests: 60000, timeWindow: 60, qps: '1000.00' }

// QPS vs Latency relationship
const qpsLatencyRelationship = {
  // For single-threaded system:
  // QPS = 1000 / Latency(ms)
  // If latency is 10ms, QPS = 100
  // If latency is 1ms, QPS = 1000

  formula: "QPS = 1000 / AverageLatency(ms)",

  examples: [
    { latency: 1, qps: 1000 },
    { latency: 10, qps: 100 },
    { latency: 100, qps: 10 },
  ],
};

// QPS targets for different systems
const qpsTargets = {
  smallWebsite: { qps: 100, description: "Small blog or portfolio" },
  mediumWebsite: { qps: 1000, description: "Medium-sized web application" },
  largeWebsite: { qps: 10000, description: "Large e-commerce site" },
  veryLargeSystem: { qps: 100000, description: "Social media platform" },
  massiveSystem: { qps: 1000000, description: "Google, Facebook scale" },
};
```

### Best Practices:

1. **Measure under realistic load**: Đo lường với load thực tế
2. **Consider peak QPS**: Tính toán cho peak traffic
3. **Monitor percentiles**: Theo dõi p50, p95, p99 latency
4. **Set realistic targets**: Đặt target thực tế dựa trên requirements

```javascript
// ✅ Nên: Monitor QPS với percentiles
const qpsMonitoring = {
  currentQPS: 1000,
  targetQPS: 5000,
  headroom: 4000, // 5000 - 1000
  utilization: 0.2, // 1000 / 5000

  alertThreshold: 0.8, // Alert at 80% utilization
  isHealthy: function () {
    return this.utilization < this.alertThreshold;
  },
};

// ❌ Không nên: Chỉ theo dõi average QPS
const averageQPS = 1000; // Không biết peak, không biết latency
```

---

## How to handle system failures?

**System failure handling** là các chiến lược và kỹ thuật để đảm bảo hệ thống vẫn hoạt động khi có lỗi xảy ra.

### Mục đích / Purpose

Đảm bảo hệ thống có khả năng phục hồi từ lỗi và duy trì service continuity.

### Khi nào dùng / When to Use

| Tình huống           | Khi nào dùng                    |
| -------------------- | ------------------------------- |
| System design        | Thiết kế fault tolerance từ đầu |
| Production incidents | Xử lý lỗi khi xảy ra            |
| Disaster recovery    | Khôi phục sau disaster          |
| High availability    | Đảm bảo high availability       |

### Giúp ích gì / Benefits

- **Resilience**: Hệ thống có khả năng phục hồi
- **Availability**: Duy trì service availability
- **Data integrity**: Bảo toàn dữ liệu
- **User trust**: Tăng trust của người dùng

### Ưu nhược điểm / Pros & Cons

| Ưu điểm           | Nhược điểm              |
| ----------------- | ----------------------- |
| Tăng availability | Tăng độ phức tạp        |
| Giảm downtime     | Tăng chi phí            |
| Tăng reliability  | Cần thêm infrastructure |

### Strategies:

```javascript
// Failure Handling Strategies

// 1. Redundancy
const redundancy = {
  description: "Have multiple copies of resources",
  types: [
    "Hardware redundancy: Multiple servers",
    "Data redundancy: Replicated databases",
    "Geographic redundancy: Multiple data centers",
  ],
};

// 2. Failover
const failover = {
  description: "Automatically switch to backup system",
  types: [
    "Active-passive: Backup takes over when primary fails",
    "Active-active: All systems handle traffic",
  ],
  implementation: "Health checks + automatic switching",
};

// 3. Circuit Breaker
const circuitBreaker = {
  description: "Stop calling failing services to prevent cascading failures",
  states: [
    "Closed: Normal operation",
    "Open: Failing, stop calling",
    "Half-open: Testing if service recovered",
  ],
  benefits: [
    "Prevent cascading failures",
    "Allow service to recover",
    "Provide fallback responses",
  ],
};

// 4. Retry with Exponential Backoff
const retryStrategy = {
  description: "Retry failed requests with increasing delays",
  algorithm: "delay = baseDelay * (2 ^ attemptNumber)",
  benefits: [
    "Handle transient failures",
    "Reduce load on failing service",
    "Increase chance of success",
  ],
};

// 5. Timeout
const timeoutStrategy = {
  description: "Set timeout for all external calls",
  benefits: ["Prevent hanging requests", "Free up resources", "Fail fast"],
};

// 6. Graceful Degradation
const gracefulDegradation = {
  description: "Provide reduced functionality when system is under load",
  examples: [
    "Show cached data instead of real-time",
    "Disable non-essential features",
    "Show simplified UI",
  ],
};

// 7. Bulkhead Pattern
const bulkheadPattern = {
  description: "Isolate resources to prevent failures from spreading",
  examples: [
    "Separate thread pools for different services",
    "Rate limit per service",
    "Separate database connections",
  ],
};

// Example: Circuit Breaker Implementation
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.failureCount = 0;
    this.threshold = threshold;
    this.timeout = timeout;
    this.state = "CLOSED"; // CLOSED, OPEN, HALF_OPEN
    this.lastFailureTime = null;
  }

  async execute(fn) {
    if (this.state === "OPEN") {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = "HALF_OPEN";
      } else {
        throw new Error("Circuit breaker is OPEN");
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = "CLOSED";
  }

  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.threshold) {
      this.state = "OPEN";
    }
  }
}

// Usage
const circuitBreaker = new CircuitBreaker(5, 60000);

async function callExternalService() {
  return circuitBreaker.execute(async () => {
    // Call external service
    const response = await fetch("https://api.example.com/data");
    return response.json();
  });
}
```

### Best Practices:

1. **Design for failure**: Luôn thiết kế với giả định sẽ có lỗi
2. **Monitor everything**: Theo dõi health của toàn hệ thống
3. **Automate recovery**: Tự động hóa quy trình recovery
4. **Test failures**: Thử nghiệm các failure scenarios

```javascript
// ✅ Nên: Implement comprehensive failure handling
const serviceClient = {
  async callWithRetry(fn, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await Promise.race([
          fn(),
          this.timeout(5000), // 5 second timeout
        ]);
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await this.sleep(Math.pow(2, i) * 1000); // Exponential backoff
      }
    }
  },

  timeout(ms) {
    return new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms),
    );
  },

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};

// ❌ Không nên: Không có failure handling
async function callService() {
  const response = await fetch("https://api.example.com/data");
  return response.json();
  // No timeout, no retry, no error handling
}
```

---

## Graceful degradation strategies?

**Graceful degradation** là khả năng hệ thống cung cấp dịch vụ giảm mức độ khi có lỗi hoặc quá tải.

### Mục đích / Purpose

Đảm bảo hệ thống vẫn hoạt động ở mức độ chấp nhận được khi gặp vấn đề.

### Khi nào dùng / When to Use

| Tình huống          | Khi nào dùng                                       |
| ------------------- | -------------------------------------------------- |
| High traffic        | Giảm tính năng để phục vụ nhiều người dùng         |
| Service failure     | Sử dụng fallback khi service chính không hoạt động |
| Resource limitation | Ưu tiên các tính năng quan trọng                   |
| Maintenance         | Giảm functionality khi bảo trì                     |

### Giúp ích gì / Benefits

- **Availability**: Duy trì availability khi có vấn đề
- **User experience**: Tránh hoàn toàn mất service
- **Priority handling**: Ưu tiên các tính năng quan trọng
- **Better UX**: Người dùng vẫn có trải nghiệm tốt

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm           |
| --------------------- | -------------------- |
| Duy trì availability  | Chức năng bị hạn chế |
| Tránh complete outage | Cần thiết kế từ đầu  |
| Tăng user trust       | Phức tạp hơn         |

### Strategies:

```javascript
// Graceful Degradation Strategies

// 1. Feature Flags
const featureFlags = {
  description: "Dynamically enable/disable features",
  implementation: "Check flag before executing feature",

  example: `
    if (featureFlags.isEnabled('advanced-search')) {
      return advancedSearch(query);
    } else {
      return basicSearch(query); // Fallback
    }
  `,
};

// 2. Cached Data
const cachedDataStrategy = {
  description: "Serve cached data when real-time is unavailable",
  benefits: [
    "Still provide value to users",
    "Reduce load on backend",
    "Fast response times",
  ],

  example: `
    async function getUserData(userId) {
      try {
        return await database.getUser(userId); // Real-time
      } catch (error) {
        return await cache.getUser(userId); // Fallback to cache
      }
    }
  `,
};

// 3. Simplified UI
const simplifiedUIStrategy = {
  description: "Show simplified version of UI",
  benefits: [
    "Faster load times",
    "Less resource intensive",
    "Core functionality available",
  ],

  example: `
    if (isHighLoad()) {
      return <SimpleView />; // Minimal features
    } else {
      return <FullView />; // All features
    }
  `,
};

// 4. Queue and Process Later
const queueStrategy = {
  description: "Queue requests for later processing",
  benefits: [
    "Accept all requests",
    "Process when resources available",
    "No request loss",
  ],

  example: `
    async function processRequest(request) {
      if (isOverloaded()) {
        await queue.add(request);
        return { status: 'queued' };
      } else {
        return await processImmediately(request);
      }
    }
  `,
};

// 5. Read-Only Mode
const readOnlyMode = {
  description: "Disable writes, keep reads available",
  benefits: [
    "Users can still view data",
    "No data corruption risk",
    "Clear communication to users",
  ],

  example: `
    function handleRequest(request) {
      if (isMaintenanceMode()) {
        if (request.method === 'GET') {
          return handleRead(request);
        } else {
          return { error: 'System in read-only mode' };
        }
      }
      return handleRequest(request);
    }
  `,
};

// 6. Rate Limiting
const rateLimitingStrategy = {
  description: "Limit requests per user to protect system",
  benefits: [
    "Fair resource allocation",
    "Prevent abuse",
    "Protect system health",
  ],

  example: `
    const rateLimiter = new RateLimiter({
      windowMs: 60000,
      maxRequests: 100
    });
    
    if (rateLimiter.isExceeded(userId)) {
      return { error: 'Rate limit exceeded' };
    }
    return handleRequest(request);
  `,
};

// Example Implementation
class DegradationManager {
  constructor() {
    this.strategies = {
      cache: new CacheStrategy(),
      queue: new QueueStrategy(),
      simplified: new SimplifiedStrategy(),
    };
    this.currentLoad = 0;
    this.thresholds = {
      warning: 70,
      critical: 90,
    };
  }

  async handleRequest(request) {
    const load = this.getSystemLoad();

    if (load > this.thresholds.critical) {
      return this.handleCritical(request);
    } else if (load > this.thresholds.warning) {
      return this.handleWarning(request);
    } else {
      return this.handleNormal(request);
    }
  }

  async handleNormal(request) {
    // Full functionality
    return await this.processRequest(request);
  }

  async handleWarning(request) {
    // Use cached data when possible
    if (this.strategies.cache.has(request.key)) {
      return this.strategies.cache.get(request.key);
    }
    return await this.processRequest(request);
  }

  async handleCritical(request) {
    // Queue non-critical requests
    if (!request.isCritical) {
      await this.strategies.queue.add(request);
      return { status: "queued", message: "Request queued for processing" };
    }

    // Serve simplified response for critical requests
    return await this.strategies.simplified.process(request);
  }

  getSystemLoad() {
    return this.currentLoad;
  }
}
```

### Best Practices:

1. **Define priorities**: Xác định tính năng nào quan trọng nhất
2. **Clear communication**: Thông báo rõ cho người dùng về degraded state
3. **Monitor and auto-recover**: Theo dõi và tự động phục hồi
4. **Test degradation**: Thử nghiệm các scenarios

```javascript
// ✅ Nên: Implement graceful degradation with clear communication
class ServiceWithDegradation {
  constructor() {
    this.degradationLevel = 'normal'; // normal, degraded, critical
  }

  async getFeed(userId) {
    try {
      switch (this.degradationLevel) {
        case 'normal':
          return await this.getPersonalizedFeed(userId);
        case 'degraded':
          return await this.getCachedFeed(userId);
        case 'critical':
          return await this.getTrendingFeed(); // Global feed
      }
    } catch (error) {
      // Fallback to trending feed on any error
      return await this.getTrendingFeed();
    }
  }

  async getPersonalizedFeed(userId) {
    // Complex personalized feed
    return { items: [...], source: 'personalized' };
  }

  async getCachedFeed(userId) {
    // Cached version (may be stale)
    return { items: [...], source: 'cached', stale: true };
  }

  async getTrendingFeed() {
    // Simple global feed
    return { items: [...], source: 'trending' };
  }
}

// ❌ Không nên: No degradation, complete failure on error
async function getFeed(userId) {
  const feed = await database.getFeed(userId);
  return feed;
  // If database fails, complete outage
}
```

---

## Circuit breaker pattern?

**Circuit breaker pattern** là một design pattern giúp ngăn chặn các lỗi lan truyền trong hệ thống phân tán bằng cách ngừng gọi các service đang gặp vấn đề.

### Mục đích / Purpose

Ngăn chặn cascading failures và cho phép service có thời gian phục hồi.

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng               |
| ---------------------- | -------------------------- |
| External service calls | Gọi API bên ngoài          |
| Microservices          | Gọi giữa các microservices |
| Database connections   | Kết nối đến database       |
| Network calls          | Bất kỳ network call nào    |

### Giúp ích gì / Benefits

- **Prevent cascading failures**: Ngăn lỗi lan truyền
- **Resource conservation**: Tiết kiệm resource
- **Fast failure**: Fail nhanh thay vì chờ timeout
- **Auto-recovery**: Tự động thử lại khi service phục hồi

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                 | Nhược điểm              |
| ----------------------- | ----------------------- |
| Ngăn cascading failures | Thêm độ phức tạp        |
| Tiết kiệm resource      | Cần cấu hình thresholds |
| Tự động phục hồi        | Có thể trả về lỗi sớm   |

### Circuit Breaker States:

```javascript
// Circuit Breaker States

const circuitBreakerStates = {
  CLOSED: {
    description: "Normal operation",
    behavior: "All requests pass through",
    transition: "OPEN when failure threshold reached",
  },

  OPEN: {
    description: "Circuit is open, blocking requests",
    behavior: "All requests fail immediately",
    transition: "HALF_OPEN after timeout period",
  },

  HALF_OPEN: {
    description: "Testing if service has recovered",
    behavior: "Allow limited requests through",
    transition: "CLOSED if success, OPEN if failure",
  },
};

// Circuit Breaker Implementation
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.successThreshold = options.successThreshold || 2;
    this.timeout = options.timeout || 60000; // 1 minute

    this.failureCount = 0;
    this.successCount = 0;
    this.state = "CLOSED";
    this.nextAttempt = Date.now();
  }

  async execute(fn) {
    if (this.state === "OPEN") {
      if (Date.now() < this.nextAttempt) {
        throw new CircuitBreakerOpenError("Circuit breaker is OPEN");
      }
      this.state = "HALF_OPEN";
      this.successCount = 0;
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;

    if (this.state === "HALF_OPEN") {
      this.successCount++;
      if (this.successCount >= this.successThreshold) {
        this.state = "CLOSED";
      }
    }
  }

  onFailure() {
    this.failureCount++;

    if (this.failureCount >= this.failureThreshold) {
      this.state = "OPEN";
      this.nextAttempt = Date.now() + this.timeout;
    } else if (this.state === "HALF_OPEN") {
      this.state = "OPEN";
      this.nextAttempt = Date.now() + this.timeout;
    }
  }

  getState() {
    return {
      state: this.state,
      failureCount: this.failureCount,
      successCount: this.successCount,
      nextAttempt: new Date(this.nextAttempt),
    };
  }
}

class CircuitBreakerOpenError extends Error {
  constructor(message) {
    super(message);
    this.name = "CircuitBreakerOpenError";
  }
}

// Usage Example
const circuitBreaker = new CircuitBreaker({
  failureThreshold: 5,
  successThreshold: 2,
  timeout: 60000,
});

async function callExternalAPI() {
  return circuitBreaker.execute(async () => {
    const response = await fetch("https://api.example.com/data", {
      timeout: 5000,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  });
}

// With fallback
async function callExternalAPIWithFallback() {
  try {
    return await callExternalAPI();
  } catch (error) {
    if (error instanceof CircuitBreakerOpenError) {
      // Circuit breaker is open, use fallback
      console.log("Using fallback data");
      return getFallbackData();
    }
    throw error;
  }
}

// Advanced Circuit Breaker with Metrics
class AdvancedCircuitBreaker extends CircuitBreaker {
  constructor(options = {}) {
    super(options);
    this.metrics = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      rejectedRequests: 0,
    };
  }

  async execute(fn) {
    this.metrics.totalRequests++;

    if (this.state === "OPEN" && Date.now() < this.nextAttempt) {
      this.metrics.rejectedRequests++;
      throw new CircuitBreakerOpenError("Circuit breaker is OPEN");
    }

    try {
      const result = await fn();
      this.metrics.successfulRequests++;
      this.onSuccess();
      return result;
    } catch (error) {
      this.metrics.failedRequests++;
      this.onFailure();
      throw error;
    }
  }

  getMetrics() {
    return {
      ...this.metrics,
      state: this.state,
      failureRate:
        this.metrics.totalRequests > 0
          ? (
              (this.metrics.failedRequests / this.metrics.totalRequests) *
              100
            ).toFixed(2) + "%"
          : "0%",
    };
  }
}
```

### Best Practices:

1. **Set appropriate thresholds**: Đặt threshold phù hợp với use case
2. **Monitor metrics**: Theo dõi metrics để điều chỉnh
3. **Use with fallback**: Kết hợp với fallback strategy
4. **Test thoroughly**: Thử nghiệm các scenarios

```javascript
// ✅ Nên: Circuit breaker with fallback and monitoring
const apiClient = {
  circuitBreaker: new CircuitBreaker({
    failureThreshold: 5,
    successThreshold: 2,
    timeout: 60000,
  }),

  fallbackCache: new Map(),

  async callAPI(endpoint, options = {}) {
    try {
      const result = await this.circuitBreaker.execute(async () => {
        const response = await fetch(endpoint, {
          ...options,
          timeout: 5000,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        return response.json();
      });

      // Cache successful result
      this.fallbackCache.set(endpoint, result);
      return result;
    } catch (error) {
      if (error instanceof CircuitBreakerOpenError) {
        // Use cached fallback
        console.log("Circuit breaker open, using fallback");
        return this.fallbackCache.get(endpoint) || this.getDefaultFallback();
      }
      throw error;
    }
  },

  getDefaultFallback() {
    return { error: "Service unavailable", data: null };
  },

  getMetrics() {
    return this.circuitBreaker.getMetrics();
  },
};

// ❌ Không nên: No circuit breaker, cascading failures possible
async function callAPI(endpoint) {
  const response = await fetch(endpoint);
  return response.json();
  // If service is down, all callers will timeout
}
```

---

## References

- [System Design Primer](https://github.com/donnemartin/system-design-primer)
- [Designing Data-Intensive Applications](https://dataintensive.net/)
- [The System Design Interview](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)
