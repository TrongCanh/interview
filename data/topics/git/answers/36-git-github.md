# 36. Git & GitHub / Git và GitHub

## Tổng quan về Git & GitHub / Git & GitHub Overview

### Mục đích / Purpose

**Git & GitHub** covers the integration between Git and GitHub - the most popular Git hosting platform. Understanding this helps you:

- Sử dụng GitHub hiệu quả với Git
- Làm việc với Pull Requests và Issues
- Tận dụng GitHub Actions cho CI/CD
- Collaborate với team trên GitHub

**Mục đích chính:**

- Hiểu GitHub features và workflows
- Sử dụng Git commands với GitHub
- Làm việc với Pull Requests
- Tận dụng GitHub Actions
- Sử dụng GitHub CLI

### Khi nào cần hiểu về Git & GitHub / When to Use

Hiểu về Git & GitHub là cần thiết khi:

- Làm việc với GitHub repositories
- Collaborate với team trên GitHub
- Setting up CI/CD với GitHub Actions
- Managing Pull Requests và Issues
- Sử dụng GitHub CLI

### Giúp ích gì / Benefits

**Lợi ích:**

- **Collaboration**: Dễ dàng collaborate với team
- **CI/CD**: Tận dụng GitHub Actions
- **Code Review**: Effective code review với PRs
- **Automation**: Automate workflows với Actions
- **Community**: Tham gia vào open source community

### Ưu nhược điểm / Pros & Cons

| Ưu điểm (Pros)                                    | Nhược điểm (Cons)                  |
| ------------------------------------------------- | ---------------------------------- |
| Free for public repos - miễn phí cho public repos | Private repos limited in free tier |
| Excellent UI - giao diện tốt                      | Learning curve - cần thời gian học |
| GitHub Actions - CI/CD tích hợp                   | Rate limits - giới hạn requests    |
| Large community - cộng đồng lớn                   | Vendor lock-in - phụ thuộc GitHub  |
| Good documentation - tài liệu tốt                 | Can be slow - có thể chậm          |

---

## GitHub features overview là gì? / What is GitHub features overview?

### Mục đích / Purpose

Hiểu GitHub features giúp bạn:

- Biết các features chính của GitHub
- Sử dụng GitHub hiệu quả hơn
- Chọn right features cho workflow của bạn

### Khi nào dùng / When to Use

Câu hỏi này thường được hỏi trong:

- Phỏng vấn về GitHub
- Khi onboarding team members
- Khi setting up GitHub repository

### Gi giúp ích gì / Benefits

- **Understanding**: Hiểu rõ GitHub capabilities
- **Efficiency**: Sử dụng GitHub hiệu quả hơn
- **Selection**: Chọn right features

### GitHub Features / Các Features Chính Của GitHub

| Feature / Tính chất | Mô tả / Description                  |
| ------------------- | ------------------------------------ |
| **Repositories**    | Lưu trữ Git repositories             |
| **Pull Requests**   | Code review và integration           |
| **Issues**          | Bug tracking và feature requests     |
| **GitHub Actions**  | CI/CD automation                     |
| **GitHub Pages**    | Static website hosting               |
| **GitHub CLI**      | Command-line interface cho GitHub    |
| **Codespaces**      | Cloud-based development environments |
| **Security**        | Security scanning và alerts          |
| **Wikis**           | Documentation                        |
| **Projects**        | Project management boards            |
| **Discussions**     | Community discussions                |
| **Packages**        | Package registry                     |
| **Gists**           | Code snippets sharing                |

### GitHub Workflow / GitHub Workflow

```
┌─────────────────────────────────────────────────────────────┐
│              GitHub Workflow                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Fork Repository (nếu cần)                               │
│     └──> git clone https://github.com/user/repo.git        │
│                                                             │
│  2. Create Branch                                            │
│     └──> git checkout -b feature/new-feature                │
│                                                             │
│  3. Make Changes & Commit                                   │
│     └──> git add . && git commit -m "Add feature"          │
│                                                             │
│  4. Push to GitHub                                          │
│     └──> git push -u origin feature/new-feature            │
│                                                             │
│  5. Create Pull Request                                     │
│     └──> GitHub UI: Create PR                               │
│                                                             │
│  6. Code Review & Discussion                                │
│     └──> Team reviews và discusses changes                   │
│                                                             │
│  7. Merge Pull Request                                      │
│     └──> GitHub UI: Merge PR                                │
│                                                             │
│  8. Update Local Repository                                 │
│     └──> git pull origin main                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Ví dụ thực tế / Practical Example

```bash
# 1. Clone repository từ GitHub
git clone https://github.com/user/repo.git
cd repo

# 2. Create và checkout branch
git checkout -b feature/new-feature

# 3. Make changes và commit
echo "New feature" > feature.txt
git add feature.txt
git commit -m "Add new feature"

# 4. Push đến GitHub
git push -u origin feature/new-feature

# 5. Tạo Pull Request trên GitHub UI
# - Mở repository trên GitHub
# - Click "Pull requests"
# - Click "New pull request"
# - Select branch: feature/new-feature
# - Click "Create pull request"
# - Add description và click "Create pull request"
```

### Common Pitfalls / Lỗi thường gặp

- **Not understanding GitHub features**: Không hiểu GitHub features
- **Ignoring GitHub UI**: Không tận dụng GitHub UI
- **Not using PRs**: Không sử dụng Pull Requests

### Best Practices / Thực hành tốt nhất

- Understand GitHub features
- Use Pull Requests cho code review
- Leverage GitHub Actions cho CI/CD
- Use GitHub CLI cho automation

---

## Pull Requests (PR) là gì? / What are Pull Requests?

### Mục đích / Purpose

Hiểu Pull Requests giúp bạn:

- Biết cách code review hiệu quả
- Collaborate với team members
- Integrate changes an toàn

### Khi nào dùng / When to Use

Pull Requests được dùng khi:

- Bạn muốn review code trước khi merge
- Bạn muốn discuss changes với team
- Bạn muốn integrate changes vào main branch

### Gi giúp ích gì / Benefits

- **Code Review**: Effective code review process
- **Discussion**: Discuss changes với team
- **Safety**: Safe integration của changes
- **History**: Clear history của changes

### Định nghĩa / Definition

**Pull Request (PR)** là một feature của GitHub cho phép bạn:

- Propose changes để merge vào repository
- Review code với team members
- Discuss changes trước khi merge
- Run CI/CD checks trước khi merge

### Pull Request Lifecycle / Pull Request Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│              Pull Request Lifecycle                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Open (Draft)                                           │
│     └──> PR được tạo, chưa ready cho review                │
│                                                             │
│  2. Open                                                    │
│     └──> PR ready cho review                               │
│     └──> CI/CD checks running                              │
│     └──> Team members review changes                       │
│                                                             │
│  3. Review in Progress                                     │
│     └──> Reviewers add comments và suggestions             │
│     └──> Author updates PR nếu cần                         │
│                                                             │
│  4. Approved                                               │
│     └──> All reviewers approved                           │
│     └──> CI/CD checks passed                               │
│                                                             │
│ 5. Merged                                                  │
│     └──> Changes merged vào target branch                 │
│     └──> PR closed                                         │
│                                                             │
│  6. Closed (without merge)                                 │
│     └──> PR closed nhưng không merged                     │
│     └──> Changes không được integrate                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Pull Request Best Practices / Best Practices

| Practice / Thực hành         | Mô tả / Description                          |
| ---------------------------- | -------------------------------------------- |
| **Descriptive Title**        | Clear, concise title                         |
| **Detailed Description**     | Explain why, not just what                   |
| **Small, Focused PRs**       | One feature hoặc bug fix per PR              |
| **Link to Issues**           | Reference related issues                     |
| **CI/CD Checks**             | Ensure all checks pass                       |
| **Code Review**              | Request review from appropriate team members |
| **Respond to Comments**      | Address all review comments                  |
| **Update Based on Feedback** | Make changes based on review                 |

### Ví dụ thực tế / Practical Example

```bash
# 1. Create branch cho feature
git checkout -b feature/user-authentication

# 2. Make changes và commit
echo "Authentication logic" > auth.js
git add auth.js
git commit -m "Add user authentication"

# 3. Push đến GitHub
git push -u origin feature/user-authentication

# 4. Tạo Pull Request trên GitHub UI
# - Mở repository
# - Click "Pull requests" → "New pull request"
# - Select branch: feature/user-authentication
# - Base: main
# - Title: "Add user authentication"
# - Description: "Implements OAuth2 authentication for user login"
# - Link to issue: "Fixes #123"
# - Click "Create pull request"

# 5. Request review
# - Add reviewers từ team
# - Assign appropriate reviewers

# 6. Respond to review comments
# - Make changes based on feedback
# - Push updates: git push
# - Respond to comments

# 7. Merge PR
# - Wait for approval
# - Wait for CI/CD checks
# - Click "Merge pull request"
```

### Common Pitfalls / Lỗi thường gặp

- **Large PRs**: PRs quá lớn, khó review
- **Poor descriptions**: Descriptions không rõ ràng
- **Not responding to comments**: Không phản hồi review comments
- **Merging without review**: Merge mà không review

### Best Practices / Thực hành tốt nhất

- Keep PRs small và focused
- Write clear descriptions
- Link to related issues
- Respond to all review comments
- Ensure CI/CD checks pass

---

## Issues trong GitHub là gì? / What are Issues in GitHub?

### Mục đích / Purpose

Hiểu GitHub Issues giúp bạn:

- Track bugs và features
- Collaborate với team trên tasks
- Manage project work effectively

### Khi nào dùng / When to Use

GitHub Issues được dùng khi:

- Bạn muốn report a bug
- Bạn muốn request a feature
- Bạn muốn track a task
- Bạn muốn discuss ideas

### Gi giúp ích gì / Benefits

- **Tracking**: Track bugs và features
- **Collaboration**: Collaborate với team
- **Prioritization**: Prioritize work
- **History**: Keep history của discussions

### Định nghĩa / Definition

**GitHub Issues** là một feature cho phép bạn:

- Report bugs
- Request features
- Track tasks
- Discuss ideas
- Assign work to team members

### Issue Types / Các Loại Issues

| Type / Loại         | Mô tả / Description           |
| ------------------- | ----------------------------- |
| **Bug Report**      | Report software bugs          |
| **Feature Request** | Request new features          |
| **Task**            | Track specific tasks          |
| **Enhancement**     | Suggest improvements          |
| **Documentation**   | Request documentation updates |
| **Question**        | Ask questions về project      |

### Issue Lifecycle / Issue Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│              Issue Lifecycle                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Open                                                   │
│     └──> Issue được tạo                                     │
│     └──> Status: Open                                      │
│                                                             │
│  2. In Progress                                            │
│     └──> Someone assigned và working on it                 │
│     └──> Label: "in progress"                              │
│                                                             │
│  3. Review                                                 │
│     └──> Work completed, cần review                        │
│     └──> Label: "review"                                   │
│                                                             │
│  4. Closed                                                 │
│     └──> Issue resolved                                    │
│     └──> Status: Closed                                    │
│                                                             │
│  5. Reopened                                               │
│     └──> Issue reopened nếu cần                             │
│     └──> Status: Open                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Issue Labels / Issue Labels

| Label / Nhãn         | Mô tả / Description              |
| -------------------- | -------------------------------- |
| **bug**              | Bug report                       |
| **enhancement**      | Feature request hoặc enhancement |
| **documentation**    | Documentation issue              |
| **good first issue** | Good cho new contributors        |
| **help wanted**      | Help needed                      |
| **question**         | Question                         |
| **wontfix**          | Won't be fixed                   |

### Ví dụ thực tế / Practical Example

```bash
# 1. Tạo Issue trên GitHub UI
# - Mở repository
# - Click "Issues" → "New issue"
# - Title: "Fix login authentication error"
# - Description:
#   "## Bug Description
#   Users unable to login with OAuth2 authentication.
#
#   ## Steps to Reproduce
#   1. Go to login page
#   2. Click 'Login with Google'
#   3. Error occurs
#
#   ## Expected Behavior
#   User should be logged in successfully
#
#   ## Actual Behavior
#   Error: 'Authentication failed'"
# - Labels: bug, high-priority
# - Assignee: @username
# - Click "Submit new issue"

# 2. Link Issue với Pull Request
# - Trong PR description, thêm: "Fixes #123"
# - GitHub sẽ tự động link PR với Issue
# - Khi PR merged, Issue sẽ tự động closed

# 3. Close Issue manually
# - Mở Issue
# - Click "Close issue"
# - Hoặc comment: "Closes #123" trong PR
```

### Common Pitfalls / Lỗi thường gặp

- **Poor descriptions**: Descriptions không rõ ràng
- **Not assigning**: Không assign issues
- **Not linking to PRs**: Không link issues với PRs
- **Not closing issues**: Không close issues sau khi resolved

### Best Practices / Thực hành tốt nhất

- Write clear, detailed descriptions
- Use appropriate labels
- Assign issues to team members
- Link issues to Pull Requests
- Close issues when resolved

---

## GitHub Actions là gì? / What is GitHub Actions?

### Mục đích / Purpose

Hiểu GitHub Actions giúp bạn:

- Automate workflows
- Setup CI/CD pipelines
- Tự động hóa repetitive tasks

### Khi nào dùng / When to Use

GitHub Actions được dùng khi:

- Bạn muốn automate CI/CD
- Bạn muốn run tests trên mỗi commit
- Bạn muốn deploy automatically
- Bạn muốn automate tasks

### Gi giúp ích gì / Benefits

- **Automation**: Automate workflows
- **CI/CD**: Easy CI/CD setup
- **Integration**: Tích hợp tốt với GitHub
- **Free Tier**: Free cho public repos

### Định nghĩa / Definition

**GitHub Actions** là một CI/CD platform tích hợp sẵn trong GitHub cho phép bạn:

- Automate build, test, và deployment
- Run workflows trên events (push, PR, schedule)
- Use pre-built actions từ marketplace
- Create custom workflows

### Workflow Structure / Workflow Structure

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
```

### Workflow Triggers / Workflow Triggers

| Trigger / Kích hoạt     | Mô tả / Description            |
| ----------------------- | ------------------------------ |
| **push**                | Trigger khi push đến branch    |
| **pull_request**        | Trigger khi tạo hoặc update PR |
| **release**             | Trigger khi tạo release        |
| **schedule**            | Trigger theo cron schedule     |
| **workflow_dispatch**   | Trigger manually từ GitHub UI  |
| **repository_dispatch** | Trigger bằng API call          |

### Ví dụ thực tế / Practical Example

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm test -- --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  build:
    needs: test
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v3

      - name: Download artifacts
        uses: actions/download-artifact@v3
        with:
          name: build

      - name: Deploy to production
        run: |
          # Deploy commands
          echo "Deploying to production..."
```

### Common Pitfalls / Lỗi thường gặp

- **Complex workflows**: Workflows quá phức tạp
- **Not caching dependencies**: Không cache dependencies
- **Not using secrets properly**: Không sử dụng secrets đúng cách
- **Slow workflows**: Workflows quá chậm

### Best Practices / Thực hành tốt nhất

- Keep workflows simple
- Use caching cho dependencies
- Use secrets cho sensitive data
- Parallelize jobs khi có thể
- Monitor workflow performance

---

## GitHub Pages là gì? / What is GitHub Pages?

### Mục đích / Purpose

Hiểu GitHub Pages giúp bạn:

- Host static websites miễn phí
- Deploy documentation
- Showcase projects

### Khi nào dùng / When to Use

GitHub Pages được dùng khi:

- Bạn muốn host static website
- Bạn muốn deploy documentation
- Bạn muốn showcase project

### Gi giúp ích gì / Benefits

- **Free**: Miễn phí cho public repos
- **Easy**: Dễ setup và deploy
- **Integration**: Tích hợp tốt với GitHub
- **Custom Domain**: Hỗ trợ custom domain

### Định nghĩa / Definition

**GitHub Pages** là một static site hosting service cho phép bạn:

- Host static websites từ GitHub repositories
- Use Jekyll hoặc other static site generators
- Deploy automatically từ gh-pages branch
- Use custom domains

### GitHub Pages Types / Các Loại GitHub Pages

| Type / Loại       | Source / Nguồn                            |
| ----------------- | ----------------------------------------- |
| **User/Org site** | `username.github.io` repository           |
| **Project site**  | `gh-pages` branch trong bất kỳ repository |
| **Docs**          | `/docs` folder trong repository           |

### Ví dụ thực tế / Practical Example

```yaml
# .github/workflows/deploy-pages.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: "./dist"

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Common Pitfalls / Lỗi thường gặp

- **Large builds**: Builds quá lớn
- **Not using caching**: Không cache dependencies
- **Custom domain issues**: Vấn đề với custom domain

### Best Practices / Thực hành tốt nhất

- Use GitHub Actions cho deployment
- Optimize build size
- Use caching cho dependencies
- Monitor deployment time

---

## GitHub CLI (`gh`) là gì? / What is GitHub CLI (`gh`)?

### Mục đích / Purpose

Hiểu GitHub CLI giúp bạn:

- Sử dụng GitHub từ command line
- Automate GitHub workflows
- Tăng productivity

### Khi nào dùng / When to Use

GitHub CLI được dùng khi:

- Bạn muốn work với GitHub từ terminal
- Bạn muốn automate GitHub tasks
- Bạn muốn tăng productivity

### Gi giúp ích gì / Benefits

- **Efficiency**: Tăng productivity
- **Automation**: Automate GitHub workflows
- **Consistency**: Consistent workflows

### Định nghĩa / Definition

**GitHub CLI (`gh`)** là một command-line tool cho phép bạn:

- Work với GitHub từ terminal
- Create và manage repositories
- Work với Pull Requests và Issues
- Automate GitHub workflows

### Common Commands / Các Lệnh Thường Dùng

| Command / Lệnh    | Mô tả / Description |
| ----------------- | ------------------- |
| `gh auth login`   | Login vào GitHub    |
| `gh repo create`  | Tạo repository      |
| `gh pr create`    | Tạo Pull Request    |
| `gh pr list`      | List Pull Requests  |
| `gh pr merge`     | Merge Pull Request  |
| `gh issue create` | Tạo Issue           |
| `gh issue list`   | List Issues         |
| `gh run list`     | List workflow runs  |

### Ví dụ thực tế / Practical Example

```bash
# 1. Login vào GitHub
gh auth login

# 2. Tạo repository
gh repo create my-project --public --source=. --remote=origin

# 3. Tạo Pull Request
gh pr create --title "Add new feature" --body "Implements feature #123"

# 4. List Pull Requests
gh pr list

# 5. Merge Pull Request
gh pr merge 123 --merge

# 6. Tạo Issue
gh issue create --title "Bug in login" --body "Users unable to login"

# 7. List Issues
gh issue list

# 8. View workflow runs
gh run list

# 9. View specific run
gh run view 123

# 10. Clone repository
gh repo clone user/repo
```

### Common Pitfalls / Lỗi thường gặp

- **Not authenticating**: Không authenticate
- **Wrong repository**: Sai repository
- **Not checking status**: Không check status

### Best Practices / Thực hành tốt nhất

- Use gh cho automation
- Authenticate properly
- Check status before operations

---

## GitHub Codespaces là gì? / What is GitHub Codespaces?

### Mục đích / Purpose

Hiểu GitHub Codespaces giúp bạn:

- Develop trong cloud
- Setup development environment nhanh
- Collaborate hiệu quả

### Khi nào dùng / When to Use

GitHub Codespaces được dùng khi:

- Bạn muốn develop trong cloud
- Bạn muốn quick setup environment
- Bạn muốn collaborate real-time

### Gi giúp ích gì / Benefits

- **Cloud Development**: Develop trong cloud
- **Quick Setup**: Quick environment setup
- **Collaboration**: Real-time collaboration
- **Consistency**: Consistent environments

### Định nghĩa / Definition

**GitHub Codespaces** là một cloud-based development environment cho phép bạn:

- Develop trong browser hoặc VS Code
- Setup environment nhanh chóng
- Collaborate real-time với team
- Use pre-configured dev containers

### Ví dụ thực tế / Practical Example

```yaml
# .devcontainer/devcontainer.json
{
  "name": "Node.js Development",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:18",

  "features":
    {
      "ghcr.io/devcontainers/features/node:1": { "version": "lts" },
      "ghcr.io/devcontainers/features/git:1": {},
    },

  "customizations":
    {
      "vscode":
        {
          "extensions": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"],
          "settings": { "editor.formatOnSave": true },
        },
    },

  "postCreateCommand": "npm install",

  "forwardPorts": [3000, 8080],
}
```

### Common Pitfalls / Lỗi thường gặp

- **Large containers**: Containers quá lớn
- **Slow startup**: Startup chậm
- **Cost issues**: Chi phí cao

### Best Practices / Thực hành tốt nhất

- Optimize container size
- Use caching
- Monitor costs

---

## GitHub Security features là gì? / What are GitHub Security features?

### Mục đích / Purpose

Hiểu GitHub Security features giúp bạn:

- Secure repositories
- Detect vulnerabilities
- Manage access control

### Khi nào dùng / When to Use

GitHub Security features được dùng khi:

- Bạn muốn secure repository
- Bạn muốn detect vulnerabilities
- Bạn muốn manage access

### Gi giúp ích gì / Benefits

- **Security**: Tăng security
- **Detection**: Detect vulnerabilities
- **Control**: Manage access control

### GitHub Security Features / Các Features Security

| Feature / Tính chất     | Mô tả / Description                 |
| ----------------------- | ----------------------------------- |
| **Dependabot**          | Automated dependency updates        |
| **Security Advisories** | Security alerts cho vulnerabilities |
| **Code Scanning**       | Detect security issues trong code   |
| **Secret Scanning**     | Detect secrets trong repository     |
| **Branch Protection**   | Protect branches                    |
| **Required Reviews**    | Require reviews trước merge         |
| **Status Checks**       | Require status checks trước merge   |

### Ví dụ thực tế / Practical Example

```yaml
# .github/workflows/security.yml
name: Security Scan

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: "0 0 * * *"

jobs:
  security:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Run security scan
        uses: securecodewarrior/github-action-add-sarif@v0.0.7
        with:
          sarif-file: "security-scan-results.sarif"

      - name: Upload SARIF file
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: "security-scan-results.sarif"
```

### Common Pitfalls / Lỗi thường gặp

- **Ignoring alerts**: Bỏ qua security alerts
- **Not updating dependencies**: Không update dependencies
- **Weak access control**: Access control yếu

### Best Practices / Thực hành tốt nhất

- Address security alerts promptly
- Keep dependencies updated
- Use strong access control
- Enable all security features

---

## 📚 Tài liệu tham khảo / References

- [GitHub Documentation](https://docs.github.com)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Security Documentation](https://docs.github.com/en/code-security)

---

**File được tạo theo format của interview-viewer / File created following interview-viewer format**
