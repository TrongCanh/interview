# 37. GitLab / GitLab Platform

## Tổng quan chủ đề / Topic Overview

### Mục đích / Purpose

Hiểu về GitLab - nền tảng Git hosting với tích hợp CI/CD, project management, và DevOps.

### Khi nào cần hiểu / When to Understand

- Khi làm việc với GitLab trong dự án
- Khi so sánh giữa GitHub và GitLab
- Khi thiết lập CI/CD pipeline

### Giá trị gì / Benefits

- Tận dụng các tính năng mạnh mẽ của GitLab
- Thiết lập CI/CD hiệu quả
- Quản lý project và team tốt hơn

---

## Câu hỏi 1: GitLab là gì và nó khác gì so với GitHub?

### Mục đích / Purpose

Hiểu về GitLab và sự khác biệt so với GitHub.

### Khi nào dùng / When to Use

Khi chọn nền tảng Git hosting cho dự án.

### Giá trị gì / Benefits

- Chọn được nền tảng phù hợp với nhu cầu
- Hiểu ưu nhược điểm của mỗi nền tảng

### Định nghĩa / Definition

GitLab là nền tảng Git hosting open-source với tích hợp CI/CD, project management, và DevOps. Khác với GitHub, GitLab cung cấp CI/CD tích hợp sẵn và có thể self-host.

### Ví dụ / Examples

```bash
# GitLab features:
# - Git repository hosting
# - Integrated CI/CD (GitLab CI)
# - Project management (issues, milestones, boards)
# - Container registry
# - Package registry
# - Security scanning
# - Self-hosted option (GitLab CE/EE)

# GitHub vs GitLab:
# GitHub:
# - Largest Git hosting platform
# - GitHub Actions (CI/CD)
# - GitHub Marketplace
# - GitHub Pages
# - SaaS only (GitHub Enterprise Server available)

# GitLab:
# - Open-source with self-hosted option
# - Integrated CI/CD (no extra setup)
# - Built-in project management
# - Container registry included
# - More comprehensive DevOps features
```

### Best Practices

- Chọn GitLab nếu cần self-hosting và CI/CD tích hợp
- Chọn GitHub nếu cần largest community và marketplace
- Cả hai đều tốt cho open-source projects

### Anti-patterns

- Chọn nền tảng mà không hiểu nhu cầu của team
- Bỏ qua CI/CD capability khi lựa chọn

---

## Câu hỏi 2: GitLab CI/CD là gì và cách hoạt động?

### Mục đích / Purpose

Hiểu về GitLab CI/CD - hệ thống continuous integration/delivery tích hợp.

### Khi nào dùng / When to Use

Khi cần thiết lập automated testing và deployment.

### Giá trị gì / Benefits

- Tự động hóa build, test, deploy
- Tăng tốc độ phát triển
- Giảm lỗi trong production

### Định nghĩa / Definition

GitLab CI/CD là hệ thống CI/CD tích hợp sẵn trong GitLab, sử dụng file `.gitlab-ci.yml` để định nghĩa pipeline jobs.

### Ví dụ / Examples

```yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - deploy

variables:
  NODE_VERSION: "18"

# Build stage
build:
  stage: build
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour

# Test stage
test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm test
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'

# Deploy stage
deploy:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - ssh-add <(echo "$SSH_PRIVATE_KEY")
    - ssh -o StrictHostKeyChecking=no user@server "cd /var/www/app && git pull && npm install && npm run build"
  only:
    - main
  when: manual
```

### Best Practices

- Sử dụng cache để tăng tốc độ build
- Chia nhỏ jobs để chạy song song
- Dùng artifacts để chia sẻ kết quả giữa stages
- Sử dụng variables cho sensitive data

### Anti-patterns

- Hardcode credentials trong pipeline
- Chạy tất cả jobs sequentially
- Không sử dụng cache

---

## Câu hỏi 3: GitLab Runner là gì và cách cài đặt?

### Mục đích / Purpose

Hiểu về GitLab Runner - executor cho CI/CD jobs.

### Khi nào dùng / When to Use

Khi cần custom executor hoặc self-hosted runners.

### Giá trị gì / Benefits

- Tùy chỉnh môi trường build
- Tăng tốc độ build với local runners
- Giảm chi phí với self-hosted runners

### Định nghĩa / Definition

GitLab Runner là application thực thi CI/CD jobs, có thể chạy trên server riêng hoặc dùng GitLab shared runners.

### Ví dụ / Examples

```bash
# Cài GitLab Runner trên Linux
# 1. Download binary
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh | sudo bash
sudo apt-get install gitlab-runner

# 2. Register runner
sudo gitlab-runner register

# 3. Nhập thông tin:
# - GitLab instance URL: https://gitlab.com
# - Registration token: từ Settings > CI/CD > Runners
# - Runner description: my-runner
# - Tags: docker, node
# - Executor: docker

# 4. Cấu hình runner
sudo nano /etc/gitlab-runner/config.toml

# 5. Start runner
sudo gitlab-runner start

# 6. Kiểm tra status
sudo gitlab-runner status

# Docker executor example:
concurrent = 4
check_interval = 0

[runners.docker]
  tls_verify = false
  image = "docker:latest"
  privileged = false
  disable_entrypoint_overwrite = false
  oom_kill_disable = false
  disable_cache = false
  volumes = ["/cache"]
  shm_size = 0

[runners.cache]
  [runners.cache.s3]
  [runners.cache.gcs]
```

### Best Practices

- Sử dụng shared runners cho small projects
- Sử dụng self-hosted runners cho large projects
- Cấu hình tags để phân loại runners
- Sử dụng cache để tăng tốc độ

### Anti-patterns

- Sử dụng shared runners cho sensitive data
- Không bảo vệ runners với proper security
- Chạy quá nhiều jobs trên một runner

---

## Câu hỏi 4: GitLab Issues và Merge Requests là gì?

### Mục đích / Purpose

Hiểu về GitLab Issues và Merge Requests - công cụ collaboration.

### Khi nào dùng / When to Use

Khi cần quản lý tasks và review code.

### Giá trị gì / Benefits

- Quản lý tasks hiệu quả
- Review code dễ dàng
- Track progress của project

### Định nghĩa / Definition

- **Issues**: Task tracking với labels, milestones, assignees
- **Merge Requests (MRs)**: Code review và merge workflow (tương tự Pull Requests trên GitHub)

### Ví dụ / Examples

```bash
# Tạo issue qua GitLab UI:
# 1. Vào Project > Issues
# 2. Click "New issue"
# 3. Điền title, description
# 4. Gán labels, milestones, assignees
# 5. Click "Create issue"

# Tạo merge request:
# 1. Push branch lên GitLab
git push -u origin feature/new-feature

# 2. Vào Project > Merge Requests
# 3. Click "New merge request"
# 4. Chọn source và target branch
# 5. Điền title, description
# 6. Gán reviewers
# 7. Click "Create merge request"

# Link issue với merge request:
# Trong description của MR, dùng:
# Closes #123  # Tự động close issue khi merge
# Fixes #456
# Related to #789

# GitLab CLI (glab):
glab issue create --title "Fix bug" --description "Description"
glab mr create --source feature --target main --title "Feature"
```

### Best Practices

- Sử dụng templates cho issues và MRs
- Link MRs với issues
- Sử dụng labels để phân loại
- Set milestones cho tracking
- Request review trước khi merge

### Anti-patterns

- Merge mà không review
- Không link MR với issue
- Tạo quá nhiều labels không cần thiết

---

## Câu hỏi 5: GitLab Pages là gì?

### Mục đích / Purpose

Hiểu về GitLab Pages - static site hosting.

### Khi nào dùng / When to Use

Khi cần host static websites, documentation, blogs.

### Giá trị gì / Benefits

- Free static site hosting
- Tích hợp với GitLab CI/CD
- Custom domain support

### Định nghĩa / Definition

GitLab Pages là service hosting static websites từ GitLab repositories, tích hợp với CI/CD.

### Ví dụ / Examples

```yaml
# .gitlab-ci.yml cho GitLab Pages
image: node:18

pages:
  stage: deploy
  cache:
    paths:
      - node_modules/
  script:
    - npm ci
    - npm run build
    - mv dist public
  artifacts:
    paths:
      - public
  only:
    - main

# Jekyll site
image: ruby:3.2

pages:
  stage: deploy
  script:
    - gem install bundler
    - bundle install
    - bundle exec jekyll build -d public
  artifacts:
    paths:
      - public
  only:
    - main

# Hugo site
image: hugo:latest

pages:
  stage: deploy
  script:
    - hugo
  artifacts:
    paths:
      - public
  only:
    - main
```

### Best Practices

- Sử dụng `only` để deploy từ branch chính
- Cache dependencies để tăng tốc độ
- Test build trước khi deploy

### Anti-patterns

- Deploy từ branch không ổn định
- Không test build locally

---

## Câu hỏi 6: GitLab Container Registry là gì?

### Mục đích / Purpose

Hiểu về GitLab Container Registry - Docker image registry.

### Khi nào dùng / When to Use

Khi cần store và share Docker images.

### Giá trị gì / Benefits

- Private registry included
- Tích hợp với CI/CD
- Easy to use

### Định nghĩa / Definition

GitLab Container Registry là Docker registry tích hợp, cho phép store và share Docker images.

### Ví dụ / Examples

```yaml
# .gitlab-ci.yml cho Docker build và push
image: docker:latest

services:
  - docker:dind

variables:
  CONTAINER_IMAGE: registry.gitlab.com/$CI_PROJECT_PATH
  CONTAINER_TAG: $CI_COMMIT_SHORT_SHA

build:
  stage: build
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $CONTAINER_IMAGE:$CONTAINER_TAG .
    - docker tag $CONTAINER_IMAGE:$CONTAINER_TAG $CONTAINER_IMAGE:latest
    - docker push $CONTAINER_IMAGE:$CONTAINER_TAG
    - docker push $CONTAINER_IMAGE:latest
  only:
    - main

# Pull và run image
docker pull registry.gitlab.com/user/project:latest
docker run -p 80:80 registry.gitlab.com/user/project:latest

# GitLab CLI
glab auth login
glab container-image list
glab container-image delete <image-id>
```

### Best Practices

- Sử dụng semantic tags (v1.0.0, latest)
- Cleanup old images để tiết kiệm storage
- Sử dụng CI variables cho credentials

### Anti-patterns

- Hardcode credentials
- Không cleanup old images
- Push images không test

---

## Câu hỏi 7: GitLab Security Scanning là gì?

### Mục đích / Purpose

Hiểu về GitLab Security Scanning - automated security analysis.

### Khi nào dùng / When to Use

Khi cần scan vulnerabilities trong code và dependencies.

### Giá trị gì / Benefits

- Tìm vulnerabilities sớm
- Tự động security checks
- Tích hợp với CI/CD

### Định nghĩa / Definition

GitLab Security Scanning là bộ công cụ security analysis tích hợp, bao gồm SAST, DAST, dependency scanning, container scanning.

### Ví dụ / Examples

```yaml
# .gitlab-ci.yml với security scanning
include:
  - template: Security/SAST.gitlab-ci.yml
  - template: Security/Secret-Detection.gitlab-ci.yml
  - template: Security/Dependency-Scanning.gitlab-ci.yml
  - template: Security/Container-Scanning.gitlab-ci.yml

# Custom SAST
sast:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm audit
  allow_failure: true

# Secret detection
secrets:
  stage: test
  image: gitleaks/gitleaks:latest
  script:
    - gitleaks detect --source . --verbose --report-format json --report-path gl-secret-detection-report.json
  artifacts:
    reports:
      secret_detection: gl-secret-detection-report.json
  allow_failure: true
```

### Best Practices

- Enable tất cả security scanners
- Review security reports
- Fix high/critical vulnerabilities
- Sử dụng allow_failure cho non-critical scans

### Anti-patterns

- Bỏ qua security warnings
- Không review security reports
- Disable security scans

---

## Câu hỏi 8: GitLab Groups và Namespaces là gì?

### Mục đích / Purpose

Hiểu về GitLab Groups và Namespaces - tổ chức projects.

### Khi nào dùng / When to Use

Khi quản lý nhiều projects hoặc teams.

### Giá trị gì / Benefits

- Tổ chức projects hiệu quả
- Quản lý permissions dễ dàng
- Share resources giữa projects

### Định nghĩa / Definition

- **Groups**: Tổ chức projects và subgroups, quản lý permissions
- **Namespaces**: Đường dẫn cho projects (group/project)

### Ví dụ / Examples

```bash
# GitLab CLI (glab)
# Tạo group
glab group create --name "my-group" --visibility public

# Tạo subgroup
glab group create --name "backend" --parent "my-group"

# Tạo project trong group
glab repo create --group "my-group/backend" --name "api"

# Set permissions
# Trong GitLab UI:
# Group > Settings > Members
# - Owner: Full access
# - Maintainer: Manage projects
# - Developer: Push code
# - Reporter: View code
# - Guest: Minimal access

# Project trong group:
# URL: https://gitlab.com/my-group/backend/api
# Clone: git clone https://gitlab.com/my-group/backend/api.git
```

### Best Practices

- Sử dụng groups để tổ chức projects
- Set permissions phù hợp với role
- Sử dụng subgroups cho large organizations

### Anti-patterns

- Tạo quá nhiều levels của subgroups
- Set permissions quá rộng
- Không tổ chức projects theo logical structure

---

## Câu hỏi 9: GitLab Webhooks là gì?

### Mục đích / Purpose

Hiểu về GitLab Webhooks - trigger external services.

### Khi nào dùng / When to Use

Khi cần integrate GitLab với external services.

### Giá trị gì / Benefits

- Automate workflows
- Integrate với external tools
- Trigger custom actions

### Định nghĩa / Definition

GitLab Webhooks là HTTP callbacks gửi đến external URL khi events xảy ra trong GitLab.

### Ví dụ / Examples

```bash
# Tạo webhook qua GitLab UI:
# 1. Project > Settings > Webhooks
# 2. Nhấn "Add webhook"
# 3. Nhập URL: https://example.com/webhook
# 4. Chọn triggers:
#    - Push events
#    - Merge request events
#    - Issue events
# 5. Chọn events cụ thể
# 6. Add secret token để verify
# 7. Click "Add webhook"

# Webhook payload example:
{
  "object_kind": "push",
  "event_name": "push",
  "before": "abc123",
  "after": "def456",
  "ref": "refs/heads/main",
  "user": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "project": {
    "name": "my-project",
    "url": "https://gitlab.com/user/my-project"
  },
  "commits": [...]
}

# Handle webhook (Node.js):
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-gitlab-token'];
  if (signature !== process.env.WEBHOOK_SECRET) {
    return res.status(401).send('Invalid signature');
  }

  const event = req.body.object_kind;
  if (event === 'push') {
    // Handle push event
  }

  res.status(200).send('OK');
});
```

### Best Practices

- Sử dụng secret token để verify webhooks
- Handle webhook errors gracefully
- Log webhook events cho debugging

### Anti-patterns

- Không verify webhook signature
- Không handle errors
- Expose sensitive data trong webhooks

---

## Câu hỏi 10: GitLab API là gì?

### Mục đích / Purpose

Hiểu về GitLab API - programmatic access to GitLab.

### Khi nào dùng / When to Use

Khi cần automate GitLab operations.

### Giá trị gì / Benefits

- Automate workflows
- Integrate với custom tools
- Script GitLab operations

### Định nghĩa / Definition

GitLab API là RESTful API cho phép truy cập và thao tác với GitLab resources.

### Ví dụ / Examples

```bash
# GitLab API endpoints
# Base URL: https://gitlab.com/api/v4

# Authentication
curl --header "PRIVATE-TOKEN: <your-token>" "https://gitlab.com/api/v4/projects"

# List projects
curl --header "PRIVATE-TOKEN: <your-token>" \
  "https://gitlab.com/api/v4/projects?membership=true"

# Get project details
curl --header "PRIVATE-TOKEN: <your-token>" \
  "https://gitlab.com/api/v4/projects/:id"

# Create issue
curl --request POST --header "PRIVATE-TOKEN: <your-token>" \
  --header "Content-Type: application/json" \
  --data '{"title":"New issue","description":"Description"}' \
  "https://gitlab.com/api/v4/projects/:id/issues"

# Create merge request
curl --request POST --header "PRIVATE-TOKEN: <your-token>" \
  --header "Content-Type: application/json" \
  --data '{"source_branch":"feature","target_branch":"main","title":"Feature"}' \
  "https://gitlab.com/api/v4/projects/:id/merge_requests"

# Node.js example
const axios = require('axios');

const gitlab = axios.create({
  baseURL: 'https://gitlab.com/api/v4',
  headers: { 'PRIVATE-TOKEN': process.env.GITLAB_TOKEN }
});

async function createIssue(projectId, title, description) {
  const response = await gitlab.post(`/projects/${projectId}/issues`, {
    title,
    description
  });
  return response.data;
}

// Python example
import gitlab

gl = gitlab.Gitlab('https://gitlab.com', private_token='your-token')

project = gl.projects.get('user/project')
issue = project.issues.create({'title': 'New issue', 'description': 'Description'})
```

### Best Practices

- Sử dụng Personal Access Tokens (PAT) thay vì password
- Set proper scopes cho tokens
- Use rate limiting để tránh bị blocked
- Cache API responses khi cần

### Anti-patterns

- Hardcode tokens trong code
- Không handle rate limiting
- Bỏ qua error handling

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. GitLab là Git hosting platform với CI/CD tích hợp
2. GitLab CI/CD sử dụng `.gitlab-ci.yml` để định nghĩa pipeline
3. GitLab Runner thực thi CI/CD jobs
4. Issues và MRs là công cụ collaboration chính
5. GitLab Pages host static websites
6. Container Registry store Docker images
7. Security scanning tự động detect vulnerabilities
8. Groups tổ chức projects và quản lý permissions
9. Webhooks trigger external services
10. API cho phép programmatic access

### Commands Reference / Tham khảo lệnh

```bash
# GitLab Runner
sudo gitlab-runner register
sudo gitlab-runner start
sudo gitlab-runner stop
sudo gitlab-runner status
sudo gitlab-runner verify
sudo gitlab-runner unregister

# GitLab CLI (glab)
glab auth login
glab issue create
glab issue list
glab mr create
glab mr list
glab repo clone
glab repo create
glab group create
glab ci view
glab ci trace

# Docker với GitLab Registry
docker login registry.gitlab.com
docker build -t registry.gitlab.com/user/project:latest .
docker push registry.gitlab.com/user/project:latest
docker pull registry.gitlab.com/user/project:latest

# GitLab API
curl --header "PRIVATE-TOKEN: <token>" "https://gitlab.com/api/v4/projects"
curl --request POST --header "PRIVATE-TOKEN: <token>" \
  --header "Content-Type: application/json" \
  --data '{"title":"Issue"}' \
  "https://gitlab.com/api/v4/projects/:id/issues"
```

### Best Practices / Thực hành tốt

1. Sử dụng GitLab CI/CD cho automation
2. Configure runners phù hợp với project needs
3. Link MRs với issues
4. Enable security scanning
5. Sử dụng groups để tổ chức projects
6. Set proper permissions
7. Use webhooks để integrate với external tools
8. Use API để automate operations
9. Sử dụng variables cho sensitive data
10. Review security reports thường xuyên
