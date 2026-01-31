# 8. Monitoring & Observability

## Tổng quan về Monitoring & Observability

### Mục đích của Monitoring & Observability / Purpose

**Monitoring & Observability** là các practices để hiểu và monitor health, performance, và behavior của hệ thống.

**Mục đích chính:**

- Detect issues trước khi chúng ảnh hưởng users
- Understand system behavior
- Debug problems nhanh hơn
- Optimize performance
- Ensure SLA compliance

### Khi nào cần hiểu về Monitoring & Observability / When to Use

Hiểu về Monitoring & Observability là cần thiết khi:

- Thiết kế hệ thống mới
- Debug production issues
- Optimize performance
- Đảm bảo SLA
- Cần visibility vào system behavior

### Giúp ích gì / Benefits

**Lợi ích:**

- **Early detection**: Detect issues sớm
- **Faster debugging**: Debug nhanh hơn
- **Performance optimization**: Optimize performance
- **SLA compliance**: Đảm bảo SLA
- **Data-driven decisions**: Quyết định dựa trên data

### Ưu nhược điểm / Pros & Cons

| Ưu điểm                | Nhược điểm           |
| ---------------------- | -------------------- |
| - Detect issues sớm    | Thêm infrastructure  |
| - Debug nhanh hơn      | Performance overhead |
| - Optimize performance | Cần expertise        |
| - Đảm bảo SLA          | Data volume lớn      |

---

## Monitoring vs Observability?

**Monitoring** là tracking metrics và alerts. **Observability** là khả năng understand system behavior từ external outputs.

### Mục đích / Purpose

- **Monitoring**: Track metrics và alert khi thresholds exceeded
- **Observability**: Understand system behavior và debug issues

### Khi nào dùng / When to Use

| Tình huống             | Khi nào dùng  |
| ---------------------- | ------------- |
| - Alerting             | Monitoring    |
| - Debugging            | Observability |
| - Performance analysis | Observability |
| - SLA tracking         | Monitoring    |

### Giúp ích gì / Benefits

- **Monitoring**: Alert khi có issues
- **Observability**: Understand và debug issues

### Ưu nhược điểm / Pros & Cons

| Feature          | Monitoring | Observability         |
| ---------------- | ---------- | --------------------- |
| Focus            | Metrics    | Logs, Metrics, Traces |
| Purpose          | Alert      | Understand            |
| - Known issues   | ✅         | ✅                    |
| - Unknown issues | ❌         | ✅                    |

### Ví dụ:

```javascript
// Monitoring vs Observability

const monitoring = {
  definition: "Tracking metrics and alerting on thresholds",
  focus: "Known metrics and thresholds",
  components: ["Metrics collection", "Dashboards", "Alerts"],
  examples: ["CPU usage > 80%", "Response time > 500ms", "Error rate > 1%"],
};

const observability = {
  definition: "Ability to understand system behavior from external outputs",
  focus: "Understanding system state and behavior",
  pillars: ["Metrics (numbers)", "Logs (text)", "Traces (request flow)"],
  examples: [
    "Why is this request slow?",
    "What happened before this error?",
    "How did this request flow through the system?",
  ],
};

// The Three Pillars of Observability
const threePillars = {
  metrics: {
    definition: "Numerical measurements over time",
    examples: [
      "CPU usage",
      "Memory usage",
      "Request rate",
      "Error rate",
      "Response time",
    ],
    useCases: ["Alerting", "Trend analysis", "Capacity planning"],
  },

  logs: {
    definition: "Discrete events with context",
    examples: ["Application logs", "Access logs", "Error logs"],
    useCases: ["Debugging", "Auditing", "Compliance"],
  },

  traces: {
    definition: "Request flow through distributed systems",
    examples: [
      "Distributed tracing",
      "Request timeline",
      "Service dependencies",
    ],
    useCases: [
      "Performance analysis",
      "Root cause analysis",
      "Service dependency mapping",
    ],
  },
};

// Metrics Collection
class MetricsCollector {
  constructor() {
    this.counters = new Map();
    this.gauges = new Map();
    this.histograms = new Map();
  }

  increment(name, value = 1, tags = {}) {
    const key = this.getKey(name, tags);
    this.counters.set(key, (this.counters.get(key) || 0) + value);
  }

  set(name, value, tags = {}) {
    const key = this.getKey(name, tags);
    this.gauges.set(key, value);
  }

  observe(name, value, tags = {}) {
    const key = this.getKey(name, tags);
    if (!this.histograms.has(key)) {
      this.histograms.set(key, []);
    }
    this.histograms.get(key).push(value);
  }

  getKey(name, tags) {
    const tagString = Object.entries(tags)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join(",");
    return `${name}{${tagString}}`;
  }

  getMetrics() {
    return {
      counters: Object.fromEntries(this.counters),
      gauges: Object.fromEntries(this.gauges),
      histograms: Object.fromEntries(
        Array.from(this.histograms.entries()).map(([key, values]) => [
          key,
          {
            count: values.length,
            sum: values.reduce((a, b) => a + b, 0),
            avg: values.reduce((a, b) => a + b, 0) / values.length,
            min: Math.min(...values),
            max: Math.max(...values),
            p50: this.percentile(values, 50),
            p95: this.percentile(values, 95),
            p99: this.percentile(values, 99),
          },
        ]),
      ),
    };
  }

  percentile(values, p) {
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil((p / 100) * sorted.length) - 1;
    return sorted[Math.max(0, index)];
  }
}

// Usage
const metrics = new MetricsCollector();

// Counters (monotonically increasing)
metrics.increment("http.requests.total", 1, { method: "GET", status: 200 });
metrics.increment("http.requests.total", 1, { method: "POST", status: 201 });
metrics.increment("errors.total", 1, { type: "database" });

// Gauges (can go up and down)
metrics.set("system.cpu.usage", 75.5, { host: "server1" });
metrics.set("system.memory.usage", 60.2, { host: "server1" });
metrics.set("active.connections", 150);

// Histograms (distribution of values)
metrics.observe("http.request.duration", 45, { endpoint: "/api/users" });
metrics.observe("http.request.duration", 52, { endpoint: "/api/users" });
metrics.observe("http.request.duration", 120, { endpoint: "/api/users" });
metrics.observe("http.request.duration", 38, { endpoint: "/api/users" });

// Get all metrics
const allMetrics = metrics.getMetrics();
console.log(allMetrics);

// Logging
class Logger {
  constructor(options = {}) {
    this.level = options.level || "info";
    this.format = options.format || "json";
    this.outputs = options.outputs || [console];
  }

  log(level, message, context = {}) {
    if (!this.shouldLog(level)) {
      return;
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...context,
    };

    const formatted = this.formatLog(logEntry);

    for (const output of this.outputs) {
      output.log(formatted);
    }
  }

  shouldLog(level) {
    const levels = ["debug", "info", "warn", "error"];
    return levels.indexOf(level) >= levels.indexOf(this.level);
  }

  formatLog(entry) {
    if (this.format === "json") {
      return JSON.stringify(entry);
    }
    return `[${entry.timestamp}] ${entry.level}: ${entry.message}`;
  }

  debug(message, context) {
    this.log("debug", message, context);
  }

  info(message, context) {
    this.log("info", message, context);
  }

  warn(message, context) {
    this.log("warn", message, context);
  }

  error(message, context) {
    this.log("error", message, context);
  }
}

// Usage
const logger = new Logger({ level: "info", format: "json" });

logger.info("User logged in", { userId: "123", ip: "192.168.1.1" });
logger.warn("High memory usage", { usage: "90%" });
logger.error("Database connection failed", { error: "Connection timeout" });

// Structured logging with correlation IDs
function withCorrelationId(req, res, next) {
  const correlationId = req.headers["x-correlation-id"] || generateId();
  req.correlationId = correlationId;
  res.setHeader("x-correlation-id", correlationId);
  next();
}

app.use(withCorrelationId);

app.get("/api/users", (req, res) => {
  logger.info("Fetching users", {
    correlationId: req.correlationId,
    userId: req.user?.id,
  });
  // ...
});

// Distributed Tracing
class Tracer {
  constructor(serviceName) {
    this.serviceName = serviceName;
    this.spans = [];
    this.currentSpan = null;
  }

  startSpan(name, parentSpan = null) {
    const span = {
      traceId: parentSpan?.traceId || generateId(),
      spanId: generateId(),
      parentSpanId: parentSpan?.spanId,
      name,
      serviceName: this.serviceName,
      startTime: Date.now(),
      tags: {},
      logs: [],
    };

    this.spans.push(span);
    this.currentSpan = span;

    return span;
  }

  endSpan(span) {
    span.endTime = Date.now();
    span.duration = span.endTime - span.startTime;
    this.currentSpan = null;
  }

  tagSpan(span, key, value) {
    span.tags[key] = value;
  }

  logSpan(span, message, context = {}) {
    span.logs.push({
      timestamp: Date.now(),
      message,
      ...context,
    });
  }

  getTrace(traceId) {
    return this.spans.filter((s) => s.traceId === traceId);
  }
}

// Usage
const tracer = new Tracer("user-service");

app.get("/api/users/:id", async (req, res) => {
  const parentSpan = tracer.startSpan("http.request");
  tracer.tagSpan(parentSpan, "http.method", "GET");
  tracer.tagSpan(parentSpan, "http.url", `/api/users/${req.params.id}`);

  try {
    const dbSpan = tracer.startSpan("database.query", parentSpan);
    tracer.tagSpan(dbSpan, "db.statement", "SELECT * FROM users WHERE id = ?");

    const user = await db.query("SELECT * FROM users WHERE id = ?", [
      req.params.id,
    ]);

    tracer.endSpan(dbSpan);

    res.json(user);
    tracer.tagSpan(parentSpan, "http.status_code", 200);
  } catch (error) {
    tracer.tagSpan(parentSpan, "error", true);
    tracer.tagSpan(parentSpan, "error.message", error.message);
    res.status(500).json({ error: "Internal server error" });
  }

  tracer.endSpan(parentSpan);
});

// Alerting
class AlertManager {
  constructor(notifiers) {
    this.notifiers = notifiers;
    this.alerts = new Map();
  }

  checkAlert(metricName, value, threshold, operator = ">", context = {}) {
    const shouldAlert = this.evaluate(value, threshold, operator);

    if (shouldAlert && !this.alerts.has(metricName)) {
      // Trigger alert
      this.triggerAlert(metricName, value, threshold, context);
      this.alerts.set(metricName, Date.now());
    } else if (!shouldAlert && this.alerts.has(metricName)) {
      // Clear alert
      this.clearAlert(metricName);
      this.alerts.delete(metricName);
    }
  }

  evaluate(value, threshold, operator) {
    switch (operator) {
      case ">":
        return value > threshold;
      case "<":
        return value < threshold;
      case ">=":
        return value >= threshold;
      case "<=":
        return value <= threshold;
      case "==":
        return value === threshold;
      default:
        return false;
    }
  }

  triggerAlert(metricName, value, threshold, context) {
    const alert = {
      metricName,
      value,
      threshold,
      context,
      timestamp: new Date(),
      severity: this.getSeverity(value, threshold),
    };

    for (const notifier of this.notifiers) {
      notifier.notify(alert);
    }
  }

  clearAlert(metricName) {
    for (const notifier of this.notifiers) {
      notifier.clear(metricName);
    }
  }

  getSeverity(value, threshold) {
    const ratio = value / threshold;
    if (ratio >= 2) return "critical";
    if (ratio >= 1.5) return "warning";
    return "info";
  }
}

// Notifiers
class SlackNotifier {
  constructor(webhookUrl) {
    this.webhookUrl = webhookUrl;
  }

  async notify(alert) {
    const message =
      `🚨 Alert: ${alert.metricName}\n` +
      `Value: ${alert.value}\n` +
      `Threshold: ${alert.threshold}\n` +
      `Severity: ${alert.severity}\n` +
      `Context: ${JSON.stringify(alert.context)}`;

    await fetch(this.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: message }),
    });
  }

  async clear(metricName) {
    const message = `✅ Alert cleared: ${metricName}`;
    await fetch(this.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: message }),
    });
  }
}

class EmailNotifier {
  constructor(smtpConfig) {
    this.smtpConfig = smtpConfig;
  }

  async notify(alert) {
    const subject = `[${alert.severity.toUpperCase()}] Alert: ${alert.metricName}`;
    const body = `Value: ${alert.value}\nThreshold: ${alert.threshold}\nContext: ${JSON.stringify(alert.context)}`;

    await sendEmail(this.smtpConfig, subject, body);
  }
}

// Usage
const alertManager = new AlertManager([
  new SlackNotifier(process.env.SLACK_WEBHOOK),
  new EmailNotifier(process.env.SMTP_CONFIG),
]);

// Check metrics and trigger alerts
setInterval(() => {
  const metrics = collector.getMetrics();

  // Check CPU usage
  const cpuUsage = metrics.gauges["system.cpu.usage{host=server1}"];
  alertManager.checkAlert("cpu.usage", cpuUsage, 80, ">", { host: "server1" });

  // Check error rate
  const errorRate = metrics.counters["errors.total{type=database}"];
  alertManager.checkAlert("error.rate", errorRate, 10, ">", {
    type: "database",
  });

  // Check response time
  const responseTime =
    metrics.histograms["http.request.duration{endpoint=/api/users}"];
  alertManager.checkAlert("response.time.p95", responseTime.p95, 500, ">", {
    endpoint: "/api/users",
  });
}, 60000); // Check every minute
```

### Best Practices:

1. **Use all three pillars**: Dùng cả 3 pillars (metrics, logs, traces)
2. **Structured logging**: Dùng structured logging
3. **Correlation IDs**: Dùng correlation IDs
4. **Meaningful alerts**: Dùng meaningful alerts

```javascript
// ✅ Nên: Use structured logging with correlation IDs
logger.info("User action", { correlationId, userId, action });

// ✅ Nên: Use distributed tracing
const span = tracer.startSpan("database.query");
// ... do work
tracer.endSpan(span);

// ✅ Nên: Set meaningful alert thresholds
alertManager.checkAlert("cpu.usage", cpuUsage, 80, ">", { host });

// ❌ Không nên: Log unstructured messages
console.log("User logged in");
// No context, hard to query

// ❌ Không nên: Alert on every metric
// Too many alerts = alert fatigue
```

---

## SLA, SLO, SLI?

**SLA** (Service Level Agreement) là agreement với customers về service levels.

**SLO** (Service Level Objective) là internal target cho service levels.

**SLI** (Service Level Indicator) là metric để measure service level.

### Mục đích / Purpose

Define và measure service quality.

### Khi nào dùng / When to Use

| Tình huống            | Khi nào dùng |
| --------------------- | ------------ |
| - Customer agreements | SLA          |
| - Internal targets    | SLO          |
| - Metrics             | SLI          |

### Giúp ích gì / Benefits

- **Clear expectations**: Rõ ràng về expectations
- **Measurable**: Có thể measure
- **Accountability**: Accountability

### Ưu nhược điểm / Pros & Cons

| Feature     | SLA                | SLO             | SLI      |
| ----------- | ------------------ | --------------- | -------- |
| Purpose     | Customer agreement | Internal target | Metric   |
| Audience    | External           | Internal        | Internal |
| Consequence | Penalties          | N/A             | N/A      |

### Ví dụ:

```javascript
// SLA, SLO, SLI Definitions

const definitions = {
  sla: {
    definition: 'Service Level Agreement - Commitment to customers',
    example: '99.9% uptime guaranteed',
    consequence: 'Penalty if not met'
  },

  slo: {
    definition: 'Service Level Objective - Internal target',
    example: '99.95% uptime target',
    purpose: 'Internal goal to meet SLA'
  },

  sli: {
    definition: 'Service Level Indicator - Metric to measure',
    examples: [
      'Uptime percentage',
      'Response time',
      'Error rate',
      'Throughput'
    ]
  }
};

// SLI Examples
const slis = {
  availability: {
    name: 'Availability',
    description: 'Percentage of time service is available',
    formula: '(total_time - downtime) / total_time * 100',
    target: '99.9%'
  },

  latency: {
    name: 'Latency',
    description: 'Time to respond to requests',
    formula: 'Percentile of response times',
    target: 'p95 < 500ms'
  },

  errorRate: {
    name: 'Error Rate',
    description: 'Percentage of requests that fail',
    formula: 'error_count / total_count * 100',
    target: '< 0.1%'
  },

  throughput: {
    name: 'Throughput',
    description: 'Requests per second',
    formula: 'total_requests / time_period',
    target: '> 1000 RPS'
  }
};

// SLO Implementation
class SLOTracker {
  constructor(sloConfig) {
    this.slos = new Map();

    for (const [name, config] of Object.entries(sloConfig)) {
      this.slos.set(name, {
        ...config,
        measurements: [],
        windowSize: config.windowSize || 3600000, // 1 hour
        alertThreshold: config.alertThreshold || 0.9 // Alert at 90% of SLO
      });
    }
  }

  recordMeasurement(sliName, value, timestamp = Date.now()) {
    const slo = this.slos.get(sliName);

    if (!slo) {
      throw new Error(`Unknown SLO: ${sliName}`);
    }

    slo.measurements.push({ value, timestamp });

    // Remove old measurements outside window
    const cutoff = timestamp - slo.windowSize;
    slo.measurements = slo.measurements.filter(m => m.timestamp > cutoff);
  }

  calculateSLO(sliName) {
    const slo = this.slos.get(sliName);

    if (slo.measurements.length === 0) {
      return null;
    }

    switch (slo.type) {
      case 'availability':
        return this.calculateAvailability(slo);
      case 'latency':
        return this.calculateLatency(slo);
      case 'errorRate':
        return this.calculateErrorRate(slo);
      default:
        throw new Error(`Unknown SLO type: ${slo.type}`);
    }
  }

  calculateAvailability(slo) {
    const total = slo.measurements.length;
    const available = slo.measurements.filter(m => m.value === true).length;
    return (available / total) * 100;
  }

  calculateLatency(slo) {
    const sorted = [...slo.measurements].sort((a, b) => a.value - b.value);
    const index = Math.ceil(slo.targetPercentile / 100 * sorted.length) - 1;
    return sorted[Math.max(0, index)].value;
  }

  calculateErrorRate(slo) {
    const total = slo.measurements.length;
    const errors = slo.measurements.filter(m => m.value === true).length;
    return (errors / total) * 100;
  }

  checkAlert(sliName) {
    const slo = this.slos.get(sliName);
    const currentValue = this.calculateSLO(sliName);

    if (!currentValue) {
      return { alert: false };
    }

    const isBreaching = this.isBreaching(slo, currentValue);
    const isNearBreaching = this.isNearBreaching(slo, currentValue);

    return {
      alert: isBreaching || isNearBreaching,
      severity: isBreaching ? 'critical' : 'warning',
      currentValue,
      target: slo.target,
      remaining: slo.target - currentValue
    };
  }

  isBreaching(slo, currentValue) {
    switch (slo.type) {
      case 'availability':
      case 'errorRate':
        return currentValue < slo.target;
      case 'latency':
        return currentValue > slo.target;
      default:
        return false;
    }
  }

  isNearBreaching(slo, currentValue) {
    const threshold = slo.target * slo.alertThreshold;
    return this.isBreaching({ ...slo, target: threshold }, currentValue);
  }
}

// Usage
const sloTracker = new SLOTracker({
  availability: {
    type: 'availability',
    target: 99.9,
    windowSize: 3600000, // 1 hour
    alertThreshold: 0.95 // Alert at 95% of target
  },

  latency: {
    type: 'latency',
    target: 500, // 500ms
    targetPercentile: 95,
    windowSize: 300000, // 5 minutes
    alertThreshold: 0.9
  },

  errorRate: {
    type: 'errorRate',
    target: 0.1, // 0.1%
    windowSize: 60000, // 1 minute
    alertThreshold: 0.8
  }
});

// Record measurements
setInterval(() => {
  // Check availability
  const isAvailable = await checkServiceHealth();
  sloTracker.recordMeasurement('availability', isAvailable);

  // Record latency
  const latency = await measureLatency();
  sloTracker.recordMeasurement('latency', latency);

  // Record errors
  const isError = response.status >= 500;
  sloTracker.recordMeasurement('errorRate', isError);

}, 1000); // Every second

// Check SLOs and alert
setInterval(() => {
  for (const sliName of sloTracker.slos.keys()) {
    const status = sloTracker.checkAlert(sliName);

    if (status.alert) {
      alertManager.triggerAlert({
        type: 'SLO_BREACH',
        sli: sliName,
        severity: status.severity,
        current: status.currentValue,
        target: status.target,
        remaining: status.remaining
      });
    }
  }
}, 60000); // Every minute

// Error Budget
class ErrorBudget {
  constructor(slo) {
    this.slo = slo; // e.g., 99.9% availability
    this.period = 30 * 24 * 3600 * 1000; // 30 days in ms
    this.errors = 0;
    this.totalRequests = 0;
  }

  recordRequest(isError) {
    this.totalRequests++;
    if (isError) {
      this.errors++;
    }
  }

  getErrorBudget() {
    const allowedErrors = (1 - this.slo / 100) * this.totalRequests;
    const remainingBudget = allowedErrors - this.errors;

    return {
      totalRequests: this.totalRequests,
      errors: this.errors,
      allowedErrors,
      remainingBudget,
      budgetPercentage: (remainingBudget / allowedErrors) * 100,
      isExhausted: remainingBudget <= 0
    };
  }

  reset() {
    this.errors = 0;
    this.totalRequests = 0;
  }
}

// Usage
const errorBudget = new ErrorBudget(99.9);

app.use((req, res, next) => {
  res.on('finish', () => {
    const isError = res.status >= 500;
    errorBudget.recordRequest(isError);
  });
  next();
});

// Check error budget
setInterval(() => {
  const budget = errorBudget.getErrorBudget();

  if (budget.isExhausted) {
    alertManager.triggerAlert({
      type: 'ERROR_BUDGET_EXHAUSTED',
      severity: 'critical',
      budget
    });

    // Consider stopping deployments or reducing traffic
  } else if (budget.budgetPercentage < 20) {
    alertManager.triggerAlert({
      type: 'ERROR_BUDGET_LOW',
      severity: 'warning',
      budget
    });
  }
}, 60000);
```

### Best Practices:

1. **Set realistic SLOs**: Đặt SLOs thực tế
2. **Track error budget**: Theo dõi error budget
3. **Alert appropriately**: Alert appropriately
4. **Review regularly**: Review regularly

```javascript
// ✅ Nên: Set realistic SLOs based on historical data
const slo = calculateSLOFromHistoricalData(historicalMetrics);

// ✅ Nên: Track error budget
const budget = errorBudget.getErrorBudget();
if (budget.isExhausted) {
  // Stop deployments
}

// ✅ Nên: Alert when approaching SLO breach
if (isNearBreaching(currentSLO, targetSLO)) {
  alertManager.triggerAlert({ severity: "warning" });
}

// ❌ Không nên: Set unrealistic SLOs
const slo = { availability: 100 }; // Impossible to achieve
```

---

## References

- [Google SRE Book](https://sre.google/sre-book/table-of-contents/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
