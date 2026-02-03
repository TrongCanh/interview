# 38. Git CI/CD Integration / Tích hợp CI/CD với Git

## Tổng quan chủ đề / Topic Overview

### Mục đích / Purpose

Hiểu cách tích hợp Git với CI/CD pipelines để tự động hóa build, test, và deploy.

### Khi nào cần hiểu / When to Understand

- Khi thiết lập CI/CD pipeline
- Khi cần tự động hóa deployment
- Khi chuẩn bị cho DevOps roles

### Giá trị gì / Benefits

- Tự động hóa development workflow
- Giảm lỗi trong production
- Tăng tốc độ release

---

## Câu hỏi 1: CI/CD là gì và nó liên quan đến Git như thế nào?

### Mục đích / Purpose

Hiểu về CI/CD và mối liên hệ với Git.

### Khi nào dùng / When to Use

Khi cần hiểu DevOps workflow.

### Giá trị gì / Benefits

- Hiểu pipeline automation
- Thiết lập CI/CD hiệu quả
- Tăng chất lượng code

### Định nghĩa / Definition

- **CI (Continuous Integration)**: Tự động build và test mỗi khi có commit
- **CD (Continuous Deployment/Delivery)**: Tự động deploy sau khi test pass
- Git trigger CI/CD khi có push hoặc merge

### Ví dụ / Examples

```yaml
# Git trigger CI/CD workflow:
# 1. Developer push code
git push origin feature-branch

# 2. Git webhook trigger CI server
# 3. CI server pull code
# 4. Build and test
# 5. Deploy nếu pass

# GitHub Actions example
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
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
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Test
        run: npm test
```

### Best Practices

- Trigger CI/CD cho mỗi push
- Sử dụng branches để test trước khi merge
- Deploy từ protected branches

### Anti-patterns

- Bỏ qua CI/CD tests
- Deploy từ unstable branches
- Không monitor CI/CD failures

---

## Câu hỏi 2: GitHub Actions là gì?

### Mục đích / Purpose

Hiểu về GitHub Actions - CI/CD platform của GitHub.

### Khi nào dùng / When to Use

Khi dùng GitHub và cần CI/CD.

### Giá trị gì / Benefits

- CI/CD tích hợp sẵn
- Marketplace với nhiều actions
- Easy to use

### Định nghĩa / Definition

GitHub Actions là CI/CD platform tích hợp trong GitHub, sử dụng workflows định nghĩa trong `.github/workflows/`.

### Ví dụ / Examples

```yaml
# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
        env:
          CI: true

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
          name: dist
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
          name: dist
          path: dist/
      - name: Deploy to AWS S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --acl public-read --follow-symlinks --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: "us-east-1"
          SOURCE_DIR: "dist"
```

### Best Practices

- Sử dụng matrix để test trên multiple versions
- Cache dependencies để tăng tốc
- Sửze secrets cho sensitive data
- Deploy chỉ từ protected branches

### Anti-patterns

- Hardcode secrets trong workflows
- Không cache dependencies
- Deploy từ feature branches

---

## Câu hỏi 3: GitLab CI/CD là gì?

### Mục đích / Purpose

Hiểu về GitLab CI/CD - CI/CD platform của GitLab.

### Khi nào dùng / When to Use

Khi dùng GitLab và cần CI/CD.

### Giá trị gì / Benefits

- CI/CD tích hợp sẵn
- Không cần setup riêng
- Integrated with GitLab features

### Định nghĩa / Definition

GitLab CI/CD là CI/CD platform tích hợp trong GitLab, sử dụng `.gitlab-ci.yml` để định nghĩa pipeline.

### Ví dụ / Examples

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"
  AWS_REGION: "us-east-1"

# Cache configuration
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/

# Test stage
test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm test
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

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
  only:
    - main
    - develop

# Deploy to staging
deploy_staging:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - ssh-add <(echo "$SSH_PRIVATE_KEY")
    - ssh -o StrictHostKeyChecking=no user@staging.example.com "cd /var/www/app && git pull && npm install && npm run build"
  environment:
    name: staging
    url: https://staging.example.com
  only:
    - develop

# Deploy to production
deploy_production:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - ssh-add <(echo "$SSH_PRIVATE_KEY")
    - ssh -o StrictHostKeyChecking=no user@production.example.com "cd /var/www/app && git pull && npm install && npm run build"
  environment:
    name: production
    url: https://example.com
  when: manual
  only:
    - main
```

### Best Practices

- Sử dụng stages để tổ chức pipeline
- Cache dependencies để tăng tốc
- Sử dụng environments cho staging/production
- Deploy production với manual approval

### Anti-patterns

- Deploy production tự động
- Không cache dependencies
- Không sửze environments

---

## Câu hỏi 4: Jenkins với Git là gì?

### Mục đích / Purpose

Hiểu cách tích hợp Jenkins với Git cho CI/CD.

### Khi nào dùng / When to Use

Khi dùng Jenkins làm CI/CD server.

### Giá trị gì / Benefits

- Flexible CI/CD platform
- Tích hợp với nhiều tools
- Self-hosted option

### Định nghĩa / Definition

Jenkins là CI/CD server tự host, có thể tích hợp với Git repositories để trigger builds.

### Ví dụ / Examples

```groovy
// Jenkinsfile
pipeline {
    agent any

    environment {
        NODE_VERSION = '18'
        AWS_S3_BUCKET = credentials('aws-s3-bucket')
    }

    triggers {
        pollSCM('H/5 * * * *')  // Poll every 5 minutes
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh """
                    nvm install ${NODE_VERSION}
                    nvm use ${NODE_VERSION}
                    npm ci
                """
            }
        }

        stage('Test') {
            steps {
                sh """
                    nvm use ${NODE_VERSION}
                    npm test
                """
            }
        }

        stage('Build') {
            steps {
                sh """
                    nvm use ${NODE_VERSION}
                    npm run build
                """
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh """
                    aws s3 sync dist/ s3://${AWS_S3_BUCKET}/ --delete
                """
            }
        }
    }

    post {
        always {
            junit 'test-results/**/*.xml'
            publishHTML([
                reportDir: 'coverage',
                reportFiles: 'index.html',
                reportName: 'Coverage Report'
            ])
        }
        success {
            emailext(
                subject: "Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Build successful!",
                to: "${env.CHANGE_AUTHOR_EMAIL}"
            )
        }
        failure {
            emailext(
                subject: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Build failed!",
                to: "${env.CHANGE_AUTHOR_EMAIL}"
            )
        }
    }
}

// Webhook trigger
// Trong GitHub/GitLab, thêm webhook URL:
// http://jenkins.example.com/github-webhook/
```

### Best Practices

- Sử dụng Jenkinsfile trong repository
- Configure webhooks thay vì polling
- Sửze credentials store cho sensitive data
- Configure notifications cho build failures

### Anti-patterns

- Polling thay vì webhooks
- Hardcode credentials trong Jenkinsfile
- Không configure notifications

---

## Câu hỏi 5: CircleCI với Git là gì?

### Mục đích / Purpose

Hiểu cách tích hợp CircleCI với Git cho CI/CD.

### Khi nào dùng / When to Use

Khi dùng CircleCI làm CI/CD platform.

### Giá trị gì / Benefits

- Fast CI/CD platform
- Easy configuration
- Good Docker support

### Định nghĩa / Definition

CircleCI là CI/CD platform cloud-based, sử dụng `.circleci/config.yml` để định nghĩa pipeline.

### Ví dụ / Examples

```yaml
# .circleci/config.yml
version: 2.1

orbs:
  node: circleci/node@5.0.0
  aws-s3: circleci/aws-s3@3.0.0

executors:
  node-executor:
    docker:
      - image: cimg/node:18.12
    working_directory: ~/project

jobs:
  test:
    executor: node-executor
    steps:
      - checkout
      - node/install-packages
      - run:
          name: Run tests
          command: npm test
      - store_test_results:
          path: test-results
      - store_artifacts:
          path: coverage
          destination: coverage

  build:
    executor: node-executor
    steps:
      - checkout
      - node/install-packages
      - run:
          name: Build
          command: npm run build
      - persist_to_workspace:
          root: ~/project
          paths:
            - dist

  deploy-staging:
    executor: node-executor
    steps:
      - attach_workspace:
          at: ~/project
      - aws-s3/sync:
          from: dist
          to: s3://staging-bucket
          overwrite: true
      - run:
          name: Invalidate cache
          command: |
            aws cloudfront create-invalidation \
              --distribution-id $CLOUDFRONT_STAGING_ID \
              --paths "/*"

  deploy-production:
    executor: node-executor
    steps:
      - attach_workspace:
          at: ~/project
      - aws-s3/sync:
          from: dist
          to: s3://production-bucket
          overwrite: true
      - run:
          name: Invalidate cache
          command: |
            aws cloudfront create-invalidation \
              --distribution-id $CLOUDFRONT_PRODUCTION_ID \
              --paths "/*"

workflows:
  version: 2
  test-and-build:
    jobs:
      - test
      - build:
          requires:
            - test
      - deploy-staging:
          requires:
            - build
          filters:
            branches:
              only: develop
      - deploy-production:
          requires:
            - build
          filters:
            branches:
              only: main
```

### Best Practices

- Sử dụng orbs để tái sử dụng config
- Use workspaces để chia sẻ artifacts
- Configure branch filters cho jobs
- Sửze contexts cho shared environment variables

### Anti-patterns

- Không sửze workspaces
- Hardcode environment variables
- Deploy từ tất cả branches

---

## Câu hỏi 6: Git Hooks trong CI/CD là gì?

### Mục đích / Purpose

Hiểu cách sử dụng Git hooks để tích hợp với CI/CD.

### Khi nào dùng / When to Use

Khi cần validate code trước khi push hoặc commit.

### Giá trị gì / Benefits

- Catch errors sớm
- Enforce coding standards
- Validate commit messages

### Định nghĩa / Definition

Git hooks là scripts chạy trước hoặc sau Git events, có thể dùng để trigger CI/CD hoặc validate code.

### Ví dụ / Examples

```bash
# Pre-commit hook - Run linter
#!/bin/bash
# .git/hooks/pre-commit

echo "Running linter..."
npm run lint
if [ $? -ne 0 ]; then
  echo "Linting failed. Please fix errors before committing."
  exit 1
fi

echo "Running tests..."
npm test
if [ $? -ne 0 ]; then
  echo "Tests failed. Please fix errors before committing."
  exit 1
fi

# Pre-push hook - Trigger CI
#!/bin/bash
# .git/hooks/pre-push

echo "Triggering CI pipeline..."
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"branch": "$(git symbolic-ref --short HEAD)"}' \
  https://ci.example.com/trigger

# Commit-msg hook - Validate commit message
#!/bin/bash
# .git/hooks/commit-msg

commit_regex='^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}'
if ! grep -qE "$commit_regex" "$1"; then
  echo "Invalid commit message format."
  echo "Expected format: type(scope): description"
  echo "Types: feat, fix, docs, style, refactor, test, chore"
  exit 1
fi

# Husky - Git hooks made easy
# package.json
{
  "scripts": {
    "prepare": "husky install",
    "lint": "eslint .",
    "test": "jest"
  },
  "devDependencies": {
    "husky": "^8.0.0"
  }
}

# Install and setup
npm install husky --save-dev
npm run prepare

# Add hooks
npx husky add .husky/pre-commit "npm test"
npx husky add .husky/pre-commit "npm run lint"
npx husky add .husky/commit-msg "npx commitlint --edit $1"
```

### Best Practices

- Sửze Husky để quản lý hooks
- Validate commit messages
- Run linters và tests trước khi commit
- Document hooks trong README

### Anti-patterns

- Bỏ qua hooks bằng `--no-verify`
- Hooks quá chậm
- Không document hooks

---

## Câu hỏi 7: Branch Protection trong CI/CD là gì?

### Mục đích / Purpose

Hiểu về branch protection rules để enforce CI/CD checks.

### Khi nào dùng / When to Use

Khi cần bảo vệ main branch và enforce quality.

### Giá trị gì / Benefits

- Enforce code quality
- Prevent broken code in main
- Require reviews before merge

### Định nghĩa / Definition

Branch protection là rules ngăn cản direct push và yêu cầu checks pass trước khi merge.

### Ví dụ / Examples

```yaml
# GitHub branch protection rules
# Settings > Branches > Add rule
# - Branch name pattern: main
# - Require pull request reviews before merging
#   - Require approvals: 2
#   - Dismiss stale reviews
# - Require status checks to pass before merging
#   - Require branches to be up to date
#   - Select checks: CI/CD, Tests, Lint
# - Require conversation resolution
# - Require signed commits
# - Include administrators
# - Allow force pushes: Disable

# GitLab protected branches
# Settings > Repository > Protected branches
# - Branch: main
# - Allowed to merge: Maintainers
# - Allowed to push: No one
# - Required status checks:
#   - pipeline:success
#   - code-quality:success

# Azure DevOps branch policies
# Repos > Branches > Branch policies
# - Require a minimum number of reviewers: 2
# - Check for linked work items
# - Check for comment resolution
# - Limit merge types: Squash merge only
# - Build validation: Require build to pass
```

### Best Practices

- Protect main và develop branches
- Require reviews before merge
- Require CI/CD checks to pass
- Limit who can bypass rules
- Require signed commits

### Anti-patterns

- Bypass protection rules
- Not requiring reviews
- Not requiring CI/CD checks

---

## Câu hỏi 8: Semantic Versioning trong CI/CD là gì?

### Mục đích / Purpose

Hiểu cách sử dụng semantic versioning trong CI/CD.

### Khi nào dùng / When to Use

Khi cần automate version bumping và releases.

### Giá trị gì / Benefits

- Consistent versioning
- Automated releases
- Clear changelog

### Định nghĩa / Definition

Semantic versioning (SemVer) là versioning scheme: MAJOR.MINOR.PATCH (1.0.0)

### Ví dụ / Examples

```yaml
# GitHub Actions - Semantic Release
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

# package.json
{
  "name": "my-package",
  "version": "1.0.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/user/repo.git"
  },
  "release": {
    "branches": ["main"],
    "plugins": [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      "@semantic-release/changelog",
      "@semantic-release/npm",
      "@semantic-release/github"
    ]
  }
}

# Conventional Commits trigger version bump
# feat: Add new feature -> MINOR version bump (1.1.0)
# fix: Fix bug -> PATCH version bump (1.0.1)
# feat!: Breaking change -> MAJOR version bump (2.0.0)
# docs, chore, style -> No version bump
```

### Best Practices

- Sửze conventional commits
- Configure semantic release
- Generate changelog automatically
- Use git tags for releases

### Anti-patterns

- Manual version bumping
- Not following SemVer
- Not generating changelog

---

## Câu hỏi 9: Rollback trong CI/CD là gì?

### Mục đích / Purpose

Hiểu cách rollback deployment khi có vấn đề.

### Khi nào dùng / When to Use

Khi cần khôi phục từ failed deployment.

### Giá trị gì / Benefits

- Quick recovery from failures
- Minimize downtime
- Maintain stability

### Định nghĩa / Definition

Rollback là quá trình khôi phục về phiên bản trước đó khi deployment có vấn đề.

### Ví dụ / Examples

```yaml
# GitHub Actions - Rollback
name: Rollback

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Version to rollback to'
        required: true

jobs:
  rollback:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          ref: ${{ github.event.inputs.version }}
      - name: Deploy previous version
        run: |
          npm ci
          npm run build
          aws s3 sync dist/ s3://$AWS_S3_BUCKET/ --delete

# GitLab CI/CD - Rollback
rollback:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - ssh-add <(echo "$SSH_PRIVATE_KEY")
    - ssh user@server "cd /var/www/app && git checkout $PREVIOUS_VERSION && npm install && npm run build"
  when: manual
  only:
    - main

# Docker rollback
docker ps  # Find container ID
docker stop <container-id>
docker run -d --name app:1.0.0 myapp:1.0.0

# Kubernetes rollback
kubectl rollout undo deployment/my-app
kubectl rollout history deployment/my-app
kubectl rollout undo deployment/my-app --to-revision=2
```

### Best Practices

- Keep previous versions available
- Use blue-green deployment
- Monitor after rollback
- Document rollback procedures

### Anti-patterns

- Not testing rollback
- Not keeping previous versions
- Not monitoring after rollback

---

## Câu hỏi 10: Environment Variables trong CI/CD là gì?

### Mục đích / Purpose

Hiểu cách sử dụng environment variables trong CI/CD.

### Khi nào dùng / When to Use

Khi cần configure environment-specific settings.

### Giá trị gì / Benefits

- Secure credential management
- Environment-specific configuration
- Flexible deployment

### Định nghĩa / Definition

Environment variables là key-value pairs dùng để store configuration và secrets.

### Ví dụ / Examples

```yaml
# GitHub Actions - Environment variables
name: CI

env:
  NODE_ENV: test
  API_URL: https://api.example.com

jobs:
  test:
    runs-on: ubuntu-latest
    env:
      DATABASE_URL: postgresql://localhost/test
    steps:
      - uses: actions/checkout@v3
      - name: Use environment variables
        run: |
          echo "NODE_ENV: $NODE_ENV"
          echo "API_URL: $API_URL"
          echo "DATABASE_URL: $DATABASE_URL"
        env:
          SECRET_KEY: ${{ secrets.SECRET_KEY }}

# GitLab CI/CD - Environment variables
variables:
  NODE_ENV: test
  API_URL: https://api.example.com

test:
  variables:
    DATABASE_URL: postgresql://localhost/test
  script:
    - echo "NODE_ENV: $NODE_ENV"
    - echo "API_URL: $API_URL"
    - echo "DATABASE_URL: $DATABASE_URL"
    - echo "SECRET_KEY: $SECRET_KEY"

# Using secrets
# GitHub: Settings > Secrets and variables > Actions
# GitLab: Settings > CI/CD > Variables

# .env.example
NODE_ENV=development
API_URL=https://api.example.com
DATABASE_URL=postgresql://localhost/mydb

# .env (gitignored)
NODE_ENV=development
API_URL=https://api.example.com
DATABASE_URL=postgresql://localhost/mydb
SECRET_KEY=your-secret-key
```

### Best Practices

- Store secrets in CI/CD secrets store
- Use .env.example for documentation
- Never commit .env files
- Use environment-specific variables

### Anti-patterns

- Committing secrets to repository
- Hardcoding credentials
- Not using environment variables

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. CI/CD tự động hóa build, test, deploy
2. GitHub Actions, GitLab CI/CD, Jenkins, CircleCI là popular CI/CD platforms
3. Git hooks validate code trước khi push
4. Branch protection enforce quality checks
5. Semantic versioning automate releases
6. Rollback recover from failures
7. Environment variables secure configuration

### Commands Reference / Tham khảo lệnh

```bash
# Git hooks
git config core.hooksPath .git/hooks
chmod +x .git/hooks/pre-commit
git commit --no-verify  # Bypass hooks

# Husky
npm install husky --save-dev
npx husky install
npx husky add .husky/pre-commit "npm test"

# Semantic release
npx semantic-release

# Docker rollback
docker ps
docker stop <container-id>
docker run -d myapp:1.0.0

# Kubernetes rollback
kubectl rollout undo deployment/my-app
kubectl rollout history deployment/my-app

# GitHub CLI
gh workflow list
gh workflow run <workflow-name>
gh secret list

# GitLab CLI
glab ci view
glab ci trace <pipeline-id>
```

### Best Practices / Thực hành tốt

1. Trigger CI/CD cho mỗi push
2. Test trên multiple environments
3. Protect main branches
4. Require reviews before merge
5. Use semantic versioning
6. Keep previous versions for rollback
7. Store secrets securely
8. Monitor CI/CD failures
9. Document CI/CD processes
10. Use blue-green deployment
