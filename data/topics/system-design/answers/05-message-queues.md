# 5. Message Queues

## Tổng quan về Message Queues

### Mục đích của Message Queues / Purpose

**Message Queue** là một component cho phép các services giao tiếp bất đồng bộ thông qua messages.

**Mục đích chính:**

- Giải耦 (decouple) các services
- Xử lý async tasks
- Buffer messages khi consumer chậm
- Tăng reliability và fault tolerance
- Enable scalable architecture

### Khi nào cần hiểu về Message Queues / When to Use

Hiểu về Message Queues là cần thiết khi:

- Cần async processing
- Cần decouple services
- Cần handle high throughput
- Cần reliability guarantees
- Cần load leveling

### Giúp ích gì / Benefits

**Lợi ích:**

- **Decoupling**: Services không phụ thuộc trực tiếp vào nhau
- **Asynchronous**: Xử lý async, không blocking
- **Scalability**: Dễ scale producers và consumers độc lập
- **Reliability**: Messages được lưu trữ cho đến khi được consume
- **Buffering**: Buffer messages khi consumer chậm

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm           |
| ------------------- | -------------------- |
| - Decouple services | Thêm complexity      |
| - Async processing  | Debugging khó hơn    |
| - Scalability       | Eventual consistency |
| - Reliability       | Thêm infrastructure  |

---

## Khi nào nên dùng message queue?

**Message queues** nên được dùng khi cần async communication giữa services.

### Mục đích / Purpose

Xác định khi nào message queue là giải pháp phù hợp.

### Khi nào dùng / When to Use

| Tình huống           | Khi nào dùng                  |
| -------------------- | ----------------------------- |
| - Long-running tasks | Khi tasks mất nhiều thời gian |
| - High throughput    | Khi cần xử lý nhiều messages  |
| - Decoupling         | Khi muốn decouple services    |
| - Retry logic        | Khi cần retry failed tasks    |
| - Load leveling      | Khi traffic có biến động lớn  |

### Giúp ích gì / Benefits

- **Async processing**: Xử lý async, không blocking
- **Load leveling**: Smooth out traffic spikes
- **Retry**: Tự động retry failed messages
- **Decoupling**: Services độc lập

### Ưu nhược điểm / Pros & Cons

| Ưu điểm               | Nhược điểm           |
| --------------------- | -------------------- |
| - Async, non-blocking | Eventual consistency |
| - Retry tự động       | Thêm complexity      |
| - Buffer messages     | Debugging khó hơn    |
| - Decouple services   | Thêm infrastructure  |

### Ví dụ:

```javascript
// Message Queue Use Cases

const useCases = {
  emailSending: {
    description: "Send emails asynchronously",
    problem: "Sending emails can take time and may fail",
    solution: "Queue email tasks and process in background",
    example: `
      // Producer
      await queue.add('send-email', {
        to: 'user@example.com',
        subject: 'Welcome',
        body: '...'
      });
      
      // Consumer
      worker.process('send-email', async (job) => {
        await sendEmail(job.data.to, job.data.subject, job.data.body);
      });
    `,
  },

  imageProcessing: {
    description: "Process images asynchronously",
    problem: "Image processing is CPU intensive",
    solution: "Queue image processing tasks",
    example: `
      // Producer
      await queue.add('process-image', {
        imageUrl: 'https://...',
        operations: ['resize', 'compress', 'watermark']
      });
      
      // Consumer
      worker.process('process-image', async (job) => {
        const image = await downloadImage(job.data.imageUrl);
        for (const op of job.data.operations) {
          await processImage(image, op);
        }
        await uploadImage(image);
      });
    `,
  },

  dataSync: {
    description: "Sync data between systems",
    problem: "Syncing data can be slow and may fail",
    solution: "Queue sync tasks",
    example: `
      // Producer
      await queue.add('sync-data', {
        entity: 'user',
        entityId: 123,
        action: 'update'
      });
      
      // Consumer
      worker.process('sync-data', async (job) => {
        await syncToCRM(job.data.entity, job.data.entityId);
        await syncToAnalytics(job.data.entity, job.data.entityId);
      });
    `,
  },

  notifications: {
    description: "Send notifications asynchronously",
    problem: "Sending notifications can fail",
    solution: "Queue notification tasks with retry",
    example: `
      // Producer
      await queue.add('send-notification', {
        userId: 123,
        type: 'push',
        message: 'New message'
      });
      
      // Consumer
      worker.process('send-notification', async (job) => {
        await sendPushNotification(job.data.userId, job.data.message);
      }, {
        attempts: 3, // Retry 3 times
        backoff: 'exponential'
      });
    `,
  },
};

// When NOT to use Message Queue
const notUseCases = {
  synchronousOperations: {
    description: "Need immediate response",
    example: "User login verification",
  },

  lowLatency: {
    description: "Need real-time response",
    example: "Chat messages",
  },

  simpleOperations: {
    description: "Simple, fast operations",
    example: "Database queries",
  },

  directCommunication: {
    description: "Services need direct communication",
    example: "API calls that need immediate response",
  },
};

// Decision Tree
function shouldUseMessageQueue(requirements) {
  if (requirements.asyncProcessing && requirements.highThroughput) {
    return "Yes, use message queue";
  }

  if (requirements.decoupling && requirements.retryLogic) {
    return "Yes, use message queue";
  }

  if (requirements.immediateResponse || requirements.realTime) {
    return "No, use direct communication";
  }

  if (requirements.simpleOperation && requirements.lowVolume) {
    return "No, direct communication is simpler";
  }

  return "Maybe, evaluate trade-offs";
}
```

### Best Practices:

1. **Use for async tasks**: Dùng cho async tasks
2. **Set appropriate retries**: Đặt retries phù hợp
3. **Handle dead letters**: Xử lý dead letter queues
4. **Monitor queue depth**: Theo dõi queue depth

```javascript
// ✅ Nên: Sử dụng message queue cho long-running tasks
// Email sending
await emailQueue.add("send-email", {
  to: "user@example.com",
  subject: "Welcome",
  body: "...",
});

// ✅ Nên: Sử dụng message queue cho high throughput
// Image processing
await imageQueue.add("process-image", {
  imageUrl: "https://...",
  operations: ["resize", "compress"],
});

// ❌ Không nên: Sử dụng message queue cho synchronous operations
// User login - need immediate response
const result = await login(username, password);
// Should not use message queue here
```

---

## Kafka vs RabbitMQ vs SQS?

**Kafka**, **RabbitMQ**, và **SQS** là ba message queue phổ biến với các trade-offs khác nhau.

### Mục đích / Purpose

Chọn message queue phù hợp với use case.

### Khi nào dùng / When to Use

| Use Case            | Kafka | RabbitMQ | SQS     |
| ------------------- | ----- | -------- | ------- |
| High throughput     | ✅    | Limited  | ✅      |
| - Stream processing | ✅    | Limited  | ❌      |
| - Simple queue      | ❌    | ✅       | ✅      |
| - Managed service   | ❌    | ❌       | ✅      |
| - Message ordering  | ✅    | ✅       | Limited |
| - Message retention | ✅    | Limited  | Limited |
| - Low latency       | ✅    | ✅       | Limited |

### Giúp ích gì / Benefits

- **Kafka**: High throughput, stream processing, message retention
- **RabbitMQ**: Flexible, feature-rich, low latency
- **SQS**: Managed, simple, serverless

### Ưu nhược điểm / Pros & Cons

| Feature    | Kafka         | RabbitMQ    | SQS         |
| ---------- | ------------- | ----------- | ----------- |
| Throughput | Very High     | Medium      | High        |
| Latency    | Low           | Very Low    | Medium      |
| Model      | Log-based     | Queue-based | Queue-based |
| Ordering   | Per partition | Per queue   | Per queue   |
| Retention  | Configurable  | Limited     | Limited     |
| Managed    | Self-hosted   | Self-hosted | AWS managed |
| Complexity | High          | Medium      | Low         |

### Ví dụ:

```javascript
// Kafka Example
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka1:9092", "kafka2:9092"],
});

const producer = kafka.producer();

// Produce message
await producer.send({
  topic: "user-events",
  messages: [
    { key: "user123", value: JSON.stringify({ event: "signup", userId: 123 }) },
  ],
});

// Consumer
const consumer = kafka.consumer({ groupId: "my-group" });

await consumer.subscribe({ topic: "user-events", fromBeginning: true });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const event = JSON.parse(message.value.toString());
    console.log({ partition, offset: message.offset, value: event });
    // Process event
  },
});

// RabbitMQ Example
const amqp = require("amqplib");

const connection = await amqp.connect("amqp://localhost");
const channel = await connection.createChannel();

// Declare queue
await channel.assertQueue("tasks", { durable: true });

// Send message
channel.sendToQueue("tasks", Buffer.from(JSON.stringify({ task: "process" })), {
  persistent: true,
});

// Consume messages
channel.consume("tasks", (msg) => {
  const task = JSON.parse(msg.content.toString());
  console.log("Received:", task);

  // Process task
  processTask(task);

  // Acknowledge message
  channel.ack(msg);
});

// SQS Example
const AWS = require("aws-sdk");
const sqs = new AWS.SQS({ region: "us-east-1" });

// Send message
await sqs
  .sendMessage({
    QueueUrl: "https://sqs.us-east-1.amazonaws.com/123456789012/my-queue",
    MessageBody: JSON.stringify({ task: "process" }),
  })
  .promise();

// Receive message
const result = await sqs
  .receiveMessage({
    QueueUrl: "https://sqs.us-east-1.amazonaws.com/123456789012/my-queue",
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 20, // Long polling
  })
  .promise();

if (result.Messages) {
  for (const message of result.Messages) {
    const task = JSON.parse(message.Body);

    // Process task
    await processTask(task);

    // Delete message
    await sqs
      .deleteMessage({
        QueueUrl: "https://sqs.us-east-1.amazonaws.com/123456789012/my-queue",
        ReceiptHandle: message.ReceiptHandle,
      })
      .promise();
  }
}

// Comparison
const comparison = {
  kafka: {
    type: "Distributed log",
    model: "Pub/Sub with topics and partitions",
    throughput: "Very high (millions/sec)",
    latency: "Low (ms)",
    ordering: "Guaranteed per partition",
    retention: "Configurable (hours to days)",
    delivery: "At-least-once",
    useCases: [
      "Event streaming",
      "Log aggregation",
      "Real-time analytics",
      "Stream processing",
      "High throughput scenarios",
    ],
    pros: [
      "Very high throughput",
      "Message retention",
      "Distributed and scalable",
      "Stream processing support",
    ],
    cons: [
      "Complex to set up",
      "Higher latency than RabbitMQ",
      "Not managed (unless using Confluent Cloud)",
    ],
  },

  rabbitmq: {
    type: "Message broker",
    model: "Queue with exchanges",
    throughput: "Medium (thousands/sec)",
    latency: "Very low (sub-ms)",
    ordering: "Guaranteed per queue",
    retention: "Limited (until consumed)",
    delivery: "At-least-once",
    useCases: [
      "Task queues",
      "RPC patterns",
      "Work queues",
      "Low latency messaging",
      "Complex routing",
    ],
    pros: ["Low latency", "Flexible routing", "Feature-rich", "Easy to set up"],
    cons: [
      "Limited throughput",
      "Limited message retention",
      "Not managed (unless using CloudAMQP)",
    ],
  },

  sqs: {
    type: "Managed queue service",
    model: "Queue",
    throughput: "High (thousands/sec per queue)",
    latency: "Medium (10s of ms)",
    ordering: "Best effort (FIFO queues available)",
    retention: "Limited (up to 14 days)",
    delivery: "At-least-once",
    useCases: [
      "Task queues",
      "Decoupling services",
      "Serverless applications",
      "Simple messaging",
      "AWS ecosystem",
    ],
    pros: [
      "Fully managed",
      "Simple to use",
      "Serverless",
      "Integrated with AWS",
    ],
    cons: ["Higher latency", "Limited features", "AWS specific"],
  },
};

// Decision Tree
function chooseMessageQueue(requirements) {
  if (requirements.managedService && requirements.aws) {
    return "SQS";
  }

  if (requirements.highThroughput && requirements.streamProcessing) {
    return "Kafka";
  }

  if (requirements.lowLatency && requirements.complexRouting) {
    return "RabbitMQ";
  }

  if (requirements.messageRetention && requirements.replay) {
    return "Kafka";
  }

  if (requirements.simpleQueue && requirements.easySetup) {
    return "RabbitMQ";
  }

  // Default to RabbitMQ for general use cases
  return "RabbitMQ";
}
```

### Best Practices:

1. **Choose based on requirements**: Chọn dựa trên requirements
2. **Consider throughput**: Xem xét throughput requirements
3. **Think about latency**: Cân nhắc latency requirements
4. **Evaluate managed vs self-hosted**: Đánh giá managed vs self-hosted

```javascript
// ✅ Nên: Kafka cho high throughput stream processing
const kafka = new Kafka({
  brokers: ["kafka1:9092", "kafka2:9092"],
});

await producer.send({
  topic: "events",
  messages: [{ value: JSON.stringify(event) }],
});

// ✅ Nên: RabbitMQ cho low latency task queues
const channel = await connection.createChannel();
await channel.assertQueue("tasks");

channel.sendToQueue("tasks", Buffer.from(JSON.stringify(task)));

// ✅ Nên: SQS cho AWS serverless applications
await sqs
  .sendMessage({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(task),
  })
  .promise();

// ❌ Không nên: Sử dụng SQS cho low latency requirements
// SQS has higher latency than RabbitMQ
```

---

## Publisher-Subscriber pattern?

**Publisher-Subscriber (Pub/Sub)** là một pattern cho phép publishers gửi messages và subscribers nhận messages mà không biết về nhau.

### Mục đích / Purpose

Decouple publishers và subscribers, cho phép many-to-many communication.

### Khi nào dùng / When to Use

| Tình huống                  | Khi nào dùng                       |
| --------------------------- | ---------------------------------- |
| - Broadcast messages        | Khi cần broadcast messages         |
| - Decoupled services        | Khi muốn decouple services         |
| - Event-driven architecture | Khi dùng event-driven architecture |
| - Multiple consumers        | Khi có nhiều consumers             |

### Gi giúp ích gì / Benefits

- **Decoupling**: Publishers và subscribers độc lập
- **Scalability**: Dễ scale publishers và subscribers
- **Flexibility**: Dễ thêm/bớt subscribers
- **Loose coupling**: Services không phụ thuộc trực tiếp

### Ưu nhược điểm / Pros & Cons

| Ưu điểm             | Nhược điểm           |
| ------------------- | -------------------- |
| - Decouple services | Debugging khó hơn    |
| - Scalable          | Eventual consistency |
| - Flexible          | Thêm complexity      |

### Ví dụ:

```javascript
// Publisher-Subscriber Pattern

// 1. Simple Pub/Sub Implementation
class PubSub {
  constructor() {
    this.subscribers = new Map(); // topic -> Set of subscribers
  }

  subscribe(topic, subscriber) {
    if (!this.subscribers.has(topic)) {
      this.subscribers.set(topic, new Set());
    }
    this.subscribers.get(topic).add(subscriber);
  }

  unsubscribe(topic, subscriber) {
    if (this.subscribers.has(topic)) {
      this.subscribers.get(topic).delete(subscriber);
    }
  }

  publish(topic, message) {
    if (this.subscribers.has(topic)) {
      for (const subscriber of this.subscribers.get(topic)) {
        subscriber(message);
      }
    }
  }
}

// Usage
const pubsub = new PubSub();

// Subscribe to topics
pubsub.subscribe("user.created", (message) => {
  console.log("Email service:", message);
  sendWelcomeEmail(message.userId);
});

pubsub.subscribe("user.created", (message) => {
  console.log("Analytics service:", message);
  trackUserSignup(message.userId);
});

pubsub.subscribe("user.created", (message) => {
  console.log("Notification service:", message);
  sendPushNotification(message.userId, "Welcome!");
});

// Publish event
pubsub.publish("user.created", {
  userId: 123,
  email: "user@example.com",
  timestamp: new Date(),
});

// 2. RabbitMQ Pub/Sub
const amqp = require("amqplib");

const connection = await amqp.connect("amqp://localhost");
const channel = await connection.createChannel();

// Declare exchange
await channel.assertExchange("events", "fanout", { durable: false });

// Publisher
function publishEvent(event) {
  channel.publish("events", "", Buffer.from(JSON.stringify(event)));
  console.log("Published:", event);
}

// Subscriber 1
const queue1 = await channel.assertQueue("", { exclusive: true });
await channel.bindQueue(queue1.queue, "events", "");
channel.consume(queue1.queue, (msg) => {
  const event = JSON.parse(msg.content.toString());
  console.log("Subscriber 1:", event);
  channel.ack(msg);
});

// Subscriber 2
const queue2 = await channel.assertQueue("", { exclusive: true });
await channel.bindQueue(queue2.queue, "events", "");
channel.consume(queue2.queue, (msg) => {
  const event = JSON.parse(msg.content.toString());
  console.log("Subscriber 2:", event);
  channel.ack(msg);
});

// 3. Kafka Pub/Sub
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka1:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "group1" });

// Publisher
async function publishEvent(topic, event) {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(event) }],
  });
}

// Subscriber (Consumer)
await consumer.subscribe({ topic: "events", fromBeginning: false });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const event = JSON.parse(message.value.toString());
    console.log("Received:", event);
    // Process event
  },
});

// 4. AWS SNS Pub/Sub
const AWS = require("aws-sdk");
const sns = new AWS.SNS({ region: "us-east-1" });

// Publisher
async function publishEvent(topicArn, event) {
  await sns
    .publish({
      TopicArn: topicArn,
      Message: JSON.stringify(event),
    })
    .promise();
}

// Subscribe (HTTP endpoint)
async function subscribeHttp(topicArn, endpoint) {
  await sns
    .subscribe({
      Protocol: "http",
      TopicArn: topicArn,
      Endpoint: endpoint,
    })
    .promise();
}

// Subscribe (SQS queue)
async function subscribeQueue(topicArn, queueArn) {
  await sns
    .subscribe({
      Protocol: "sqs",
      TopicArn: topicArn,
      Endpoint: queueArn,
    })
    .promise();
}

// Pub/Sub vs Message Queue
const pubSubVsQueue = {
  pubSub: {
    model: "One-to-many or many-to-many",
    delivery: "All subscribers receive message",
    useCase: "Broadcast events, notifications",
    example: "User signup → Email, Analytics, Notification services",
  },

  queue: {
    model: "One-to-one (or one-to-many with competing consumers)",
    delivery: "One consumer receives message",
    useCase: "Task processing, work distribution",
    example: "Task queue → Workers process tasks",
  },
};

// Event-Driven Architecture Example
const eventBus = new PubSub();

// Publishers
function userService() {
  // User created
  eventBus.publish("user.created", { userId: 123, email: "user@example.com" });

  // User updated
  eventBus.publish("user.updated", { userId: 123, changes: { name: "John" } });

  // User deleted
  eventBus.publish("user.deleted", { userId: 123 });
}

// Subscribers
eventBus.subscribe("user.created", async (event) => {
  await emailService.sendWelcomeEmail(event.email);
});

eventBus.subscribe("user.created", async (event) => {
  await analyticsService.trackSignup(event.userId);
});

eventBus.subscribe("user.created", async (event) => {
  await notificationService.sendPush(event.userId, "Welcome!");
});

eventBus.subscribe("user.updated", async (event) => {
  await searchService.updateUserIndex(event.userId, event.changes);
});

eventBus.subscribe("user.deleted", async (event) => {
  await emailService.sendGoodbyeEmail(event.userId);
  await analyticsService.trackDeletion(event.userId);
  await searchService.removeUserIndex(event.userId);
});
```

### Best Practices:

1. **Use for events**: Dùng cho events, not commands
2. **Design for idempotency**: Thiết kế idempotent consumers
3. **Handle failures**: Xử lý failures properly
4. **Monitor message flow**: Theo dõi message flow

```javascript
// ✅ Nên: Pub/Sub cho events
eventBus.publish("user.created", { userId: 123 });

// ✅ Nên: Idempotent consumers
eventBus.subscribe("user.created", async (event) => {
  // Check if already processed
  if (await isProcessed(event.id)) {
    return;
  }

  await processEvent(event);
  await markAsProcessed(event.id);
});

// ❌ Không nên: Pub/Sub cho commands (should use queue)
eventBus.publish("send-email", { to: "user@example.com" });
// Should use message queue for commands
```

---

## Message ordering?

**Message ordering** đảm bảo messages được xử lý theo đúng thứ tự.

### Mục đích / Purpose

Đảm bảo messages được xử lý theo thứ tự chính xác.

### Khi nào dùng / When to Use

| Tình huống              | Khi nào dùng                       |
| ----------------------- | ---------------------------------- |
| - Sequential processing | Khi cần xử lý tuần tự              |
| - Event ordering        | Khi thứ tự events quan trọng       |
| - State updates         | Khi state updates phụ thuộc thứ tự |

### Giúp ích gì / Benefits

- **Correctness**: Đảm bảo tính đúng đắn
- **Predictability**: Hành vi predictable
- **Data integrity**: Bảo toàn data integrity

### Ưu nhược điểm / Pros & Cons

| Ưu điểm          | Nhược điểm      |
| ---------------- | --------------- |
| - Đảm bảo thứ tự | Giảm throughput |
| - Tính đúng đắn  | Thêm complexity |
| - Predictable    | Harder to scale |

### Ví dụ:

```javascript
// Message Ordering Strategies

// 1. Single Queue (FIFO)
// All messages in a single queue maintain order
const singleQueue = {
  description: "Use a single queue for ordered messages",
  pros: ["Simple", "Guaranteed ordering"],
  cons: ["Limited throughput", "Single consumer"],
  useCase: "Low throughput, ordered processing required",
};

// 2. Partitioned Queue
// Messages with same key go to same partition
const partitionedQueue = {
  description: "Partition by key to maintain order per key",
  pros: ["Higher throughput", "Order per partition"],
  cons: ["Need partition key", "Uneven distribution possible"],
  useCase: "High throughput, order per entity required",
};

// Kafka Partitioning Example
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka1:9092"],
});

const producer = kafka.producer();

// Messages with same key go to same partition
await producer.send({
  topic: "user-events",
  messages: [
    {
      key: "user123",
      value: JSON.stringify({
        event: "update",
        userId: 123,
        data: { name: "John" },
      }),
    },
    {
      key: "user123",
      value: JSON.stringify({
        event: "update",
        userId: 123,
        data: { email: "john@example.com" },
      }),
    },
    {
      key: "user456",
      value: JSON.stringify({
        event: "update",
        userId: 456,
        data: { name: "Jane" },
      }),
    },
  ],
});

// All events for user123 will be in the same partition and maintain order

// 3. Sequence Numbers
// Include sequence number in message
const sequenceNumbers = {
  description: "Include sequence number in message",
  pros: ["Flexible", "Can detect missing messages"],
  cons: ["Need to track sequence", "More complex"],
  useCase: "When ordering is critical but queue doesn't guarantee it",
};

// Example with sequence numbers
class OrderedProcessor {
  constructor() {
    this.pending = new Map(); // sequence -> message
    this.nextSequence = 1;
  }

  process(message) {
    const sequence = message.sequence;

    if (sequence === this.nextSequence) {
      // Process in order
      this.execute(message);
      this.nextSequence++;

      // Process any pending messages
      while (this.pending.has(this.nextSequence)) {
        const pending = this.pending.get(this.nextSequence);
        this.execute(pending);
        this.pending.delete(this.nextSequence);
        this.nextSequence++;
      }
    } else if (sequence > this.nextSequence) {
      // Buffer out-of-order message
      this.pending.set(sequence, message);
    }
    // Ignore old messages (sequence < nextSequence)
  }

  execute(message) {
    console.log("Processing:", message);
    // Execute message
  }
}

// 4. FIFO Queues (AWS SQS)
const AWS = require("aws-sdk");
const sqs = new AWS.SQS({ region: "us-east-1" });

// Create FIFO queue
await sqs
  .createQueue({
    QueueName: "my-queue.fifo",
    Attributes: {
      FifoQueue: "true",
      ContentBasedDeduplication: "true",
    },
  })
  .promise();

// Send message with deduplication and group ID
await sqs
  .sendMessage({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify({ task: "process" }),
    MessageGroupId: "group1", // Messages with same group ID maintain order
    MessageDeduplicationId: "unique-id-1",
  })
  .promise();

// 5. RabbitMQ Single Active Consumer
const amqp = require("amqplib");

const connection = await amqp.connect("amqp://localhost");
const channel = await connection.createChannel();

// Declare queue with single active consumer
await channel.assertQueue("tasks", {
  durable: true,
  arguments: {
    "x-single-active-consumer": true,
  },
});

// Only one consumer will process messages at a time, maintaining order
channel.consume("tasks", (msg) => {
  const task = JSON.parse(msg.content.toString());
  console.log("Processing:", task);

  // Process task
  processTask(task);

  channel.ack(msg);
});

// Comparison
const orderingStrategies = {
  singleQueue: {
    throughput: "Low",
    ordering: "Guaranteed",
    complexity: "Low",
    useCase: "Simple, low-volume scenarios",
  },

  partitioned: {
    throughput: "High",
    ordering: "Per partition",
    complexity: "Medium",
    useCase: "High-volume, per-entity ordering",
  },

  sequenceNumbers: {
    throughput: "High",
    ordering: "Custom",
    complexity: "High",
    useCase: "When queue doesn't support ordering",
  },

  fifoQueue: {
    throughput: "Medium",
    ordering: "Guaranteed per group",
    complexity: "Low",
    useCase: "AWS SQS FIFO queues",
  },
};
```

### Best Practices:

1. **Use partitioning for high throughput**: Dùng partitioning cho high throughput
2. **Choose appropriate strategy**: Chọn strategy phù hợp
3. **Monitor ordering**: Theo dõi ordering
4. **Handle out-of-order messages**: Xử lý out-of-order messages

```javascript
// ✅ Nên: Kafka partitioning for ordered events per entity
await producer.send({
  topic: "user-events",
  messages: [
    { key: "user123", value: JSON.stringify(event) }, // All user123 events in same partition
  ],
});

// ✅ Nên: SQS FIFO queue for guaranteed ordering
await sqs
  .sendMessage({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(task),
    MessageGroupId: "group1",
  })
  .promise();

// ❌ Không nên: Assume ordering without guarantees
// Standard queues don't guarantee ordering
await queue.send(task1);
await queue.send(task2);
await queue.send(task3);
// May not be processed in order
```

---

## References

- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [RabbitMQ Documentation](https://www.rabbitmq.com/docs)
- [AWS SQS Documentation](https://docs.aws.amazon.com/sqs/)
