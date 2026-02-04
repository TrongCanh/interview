# Technical Knowledge / Kiến thức kỹ thuật

> Câu trả lời mẫu cho câu hỏi kiến thức kỹ thuật / Sample answers for technical knowledge questions

---

## 📋 Programming Languages / Ngôn ngữ lập trình

### JavaScript

| Question                                   | Answer                                                                                                                                                                                                                                                                                     |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| What is your experience with JavaScript?   | I have 4 years of experience with JavaScript. I'm comfortable with ES6+ features like arrow functions, destructuring, and async/await. I've built several applications using vanilla JavaScript and frameworks like React.                                                                 |
| Explain the difference between == and ===. | The difference between == and === is that == performs type coercion while === checks for both value and type without coercion. For example, "5" == "5" is true, but "5" === "5" is also true. However, "5" == 5 is true, but "5" === 5 is false because 5 is a number and "5" is a string. |
| What is a closure in JavaScript?           | A closure is a function that has access to variables from its outer scope even after the outer function has returned. Closures are commonly used for data privacy and creating function factories.                                                                                         |

### Python

| Question                               | Answer                                                                                                                                                                                             |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| What is your experience with Python?   | I have 2 years of experience with Python. I've used Python for backend development, data analysis, and automation scripts. I'm familiar with Django and Flask frameworks.                          |
| What are the key features of Python?   | Python is known for its simple and readable syntax. It has a large standard library and supports multiple programming paradigms including object-oriented, functional, and procedural programming. |
| Explain list comprehensions in Python. | List comprehensions provide a concise way to create lists in Python. For example, `[x**2 for x in range(10)]` creates a list of squares. They're more readable and often faster than using loops.  |

---

## 📋 Frameworks & Libraries / Framework & Thư viện

### React

| Question                            | Answer                                                                                                                                                                                                                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| What is your experience with React? | I have 3 years of experience with React. I've built single-page applications, component libraries, and have experience with React hooks for state management. I'm also familiar with Redux and Context API.                                                                    |
| Explain the virtual DOM.            | The virtual DOM is a lightweight JavaScript representation of the actual DOM. When state changes in a React application, React updates the virtual DOM first, then efficiently updates the real DOM. This approach improves performance by minimizing direct DOM manipulation. |
| What are React hooks?               | React hooks are functions that let you use state and other React features without writing a class. Common hooks include useState for state management, useEffect for side effects, and useContext for sharing state across components.                                         |

### Node.js

| Question                              | Answer                                                                                                                                                                                                                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| What is your experience with Node.js? | I have 3 years of experience with Node.js for backend development. I've built RESTful APIs, real-time applications using WebSocket, and microservices using Express.                                                                                          |
| Explain the event loop in Node.js.    | The event loop is a mechanism that allows Node.js to perform non-blocking I/O operations. It uses a single thread to handle multiple concurrent operations by offloading tasks to the system kernel. This makes Node.js efficient for I/O-bound applications. |

---

## 📋 Database / Cơ sở dữ liệu

### SQL

| Question                                         | Answer                                                                                                                                                                                                     |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| What is your experience with SQL databases?      | I have experience with PostgreSQL and MySQL. I'm comfortable writing complex queries, designing database schemas, and optimizing performance using indexes and query analysis.                             |
| Explain the difference between WHERE and HAVING. | WHERE filters individual rows before grouping, while HAVING filters groups after the GROUP BY clause. For example, you use WHERE to filter rows and HAVING to filter groups based on aggregate conditions. |
| What is a primary key?                           | A primary key is a column or set of columns that uniquely identifies each row in a table. It ensures data integrity and enables efficient data retrieval through indexing.                                 |

### NoSQL

| Question                                      | Answer                                                                                                                                                                                                                                       |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| What is your experience with NoSQL databases? | I have experience with MongoDB and Redis. I've used MongoDB for flexible schema design and Redis for caching and session management.                                                                                                         |
| When would you use NoSQL over SQL?            | I would use NoSQL when the data structure is flexible or evolving, when high write throughput is required, or when the application needs horizontal scalability. NoSQL databases are better suited for unstructured or semi-structured data. |

---

## 📋 DevOps & Cloud / DevOps & Cloud

### Docker

| Question                                  | Answer                                                                                                                                                                                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| What is your experience with Docker?      | I have 2 years of experience with Docker. I use Docker for containerizing applications, creating consistent development environments, and simplifying deployment. I'm familiar with Docker Compose for multi-container applications. |
| Explain the benefits of containerization. | Containerization provides consistency across development, testing, and production environments. It simplifies dependency management, improves resource utilization, and enables faster deployment and scaling.                       |

### AWS

| Question                         | Answer                                                                                                                                                                                                                                                                       |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| What AWS services have you used? | I've used EC2 for computing, S3 for storage, RDS for databases, and Lambda for serverless functions. I'm also familiar with CloudWatch for monitoring and IAM for security management.                                                                                       |
| Explain serverless architecture. | Serverless architecture allows developers to build and run applications without managing servers. The cloud provider handles infrastructure scaling, and developers only pay for actual compute resources used. This reduces operational overhead and enables rapid scaling. |

---

## 💡 Tips for Answering / Mẹo trả lời

### Technical Questions / Câu hỏi kỹ thuật

1. **Think Aloud** (Nói to suy nghĩ):
   - Share your thought process
   - Explain your reasoning
   - Ask for clarification if needed

2. **Be Honest** (Trung thực):
   - Don't claim expertise you don't have
   - It's okay to say "I'm not sure"
   - Offer to find out

3. **Use Examples** (Sử dụng ví dụ):
   - Provide concrete examples
   - Use real-world scenarios
   - Make it relatable

4. **Show Depth** (Thể hiện chiều sâu):
   - Don't just mention buzzwords
   - Explain concepts clearly
   - Demonstrate understanding

### Common Mistakes to Avoid / Lỗi thường gặp cần tránh

1. **Memorized Answers** (Câu trả lời học thuộc lòng):
   - Don't memorize responses
   - Understand the concepts
   - Explain in your own words

2. **Too Brief** (Quá ngắn):
   - Provide enough detail
   - Give context
   - Explain your reasoning

3. **Not Admitting What You Don't Know** (Không thừa nhận những gì bạn không biết):
   - It's okay to not know everything
   - Offer to learn
   - Show curiosity

### Daily Practice / Thực hành hàng ngày

- [ ] Explain one technical concept
- [ ] Describe a project you worked on
- [ ] Practice explaining a technology
- [ ] Review technical documentation
- [ ] Teach someone a concept

---

**Cập nhật lần cuối: 2025-02-04**
