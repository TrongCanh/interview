# Git Security / Git Security

> Hướng dẫn chi tiết về bảo mật trong Git / Comprehensive guide to security in Git

---

## Topic Overview / Tổng quan chủ đề

### Mục đích / Purpose

Hiểu cách bảo mật repository và commits trong Git.

Understand how to secure repository and commits in Git.

### Khi nào cần hiểu / When to understand

- Khi cần bảo mật code và secrets
- Khi muốn verify commits
- Khi quản lý access control
- Khi cần enforce security policies

- When needing to protect code and secrets
- When wanting to verify commits
- When managing access control
- When needing to enforce security policies

### Giá trị gì / Benefits

- Bảo mật sensitive data
- Verify integrity của commits
- Quản lý access control
- Enforce security policies
- Tránh security breaches

- Protect sensitive data
- Verify commit integrity
- Manage access control
- Enforce security policies
- Avoid security breaches

### Ưu nhược điểm / Pros and Cons

**Ưu điểm / Pros:**

- Commit signing có sẵn trong Git
- Git hooks enforce policies
- Access control granular
- Transparent audit trail

**Nhược điểm / Cons:**

- Phức tạp để setup
- Signing cần key management
- Hooks có thể bị bypass
- Không end-to-end encryption

**Pros:**

- Commit signing built into Git
- Git hooks enforce policies
- Granular access control
- Transparent audit trail

**Cons:**

- Complex to set up
- Signing needs key management
- Hooks can be bypassed
- No end-to-end encryption

---

## Questions & Answers / Câu hỏi và Trả lời

### Q1: Signing commits với GPG là gì? / What is signing commits with GPG?

#### Mục đích / Purpose

Hiểu cách ký commits với GPG để verify integrity.

Understand how to sign commits with GPG to verify integrity.

#### Khi nào dùng / When to use

Khi cần bảo mật commits hoặc verify author.

When needing to protect commits or verify author.

#### Giá trị gì / Benefits

- Verify commit integrity
- Xác thực author
- Bảo mật code
- Audit trail rõ ràng

- Verify commit integrity
- Confirm actual author
- Protect code
- Clear audit trail

#### Định nghĩa / Definition

GPG (GNU Privacy Guard) là công cụ cryptography để ký và verify commits:

```bash
git commit -S -m "message"
git tag -s -m "tag-name"
```

Lệnh này:

- `-S`: Ký commit với GPG key
- `-s`: Ký tag với GPG key

GPG (GNU Privacy Guard) is cryptography tool to sign and verify commits:

```bash
git commit -S -m "message"
git tag -s -m "tag-name"
```

This command:

- `-S`: Sign commit with GPG key
- `-s`: Sign tag with GPG key

#### Ví dụ / Examples

**Ký commit:**

```bash
# Ký commit
git commit -S -m "feat: add user authentication"

# Output
gpg: Signature made ...
[master abc1234] 1 file changed, 8 insertions(+), 0 deletions(-)
create mode 100644 .git/objects/abc1234...
```

**Ký tag:**

```bash
# Ký tag release
git tag -s v1.0.0 -m "Release v1.0.0"

# Verify signature
git verify-tag v1.0.0
```

**Xem signature:**

```bash
# Xem signature của commit
git show --show-signature abc1234

# Xem tất cả signatures
git log --show-signature
```

#### Best Practices

1. **Cài đặt GPG** trước khi ký
2. **Dùng key riêng cho Git**
3. **Bảo mật private key**
4. **Verify signatures** thường xuyên
5. **Document signing process** trong team

6. **Install GPG** before signing
7. **Use separate key for Git**
8. **Protect private key**
9. **Verify signatures** regularly
10. **Document signing process** in team

#### Anti-patterns

- ❌ Không bảo mật private key
- ❌ Dùng key đã bị compromise
- ❌ Không verify signatures
- ❌ Ký mọi commit mà không cần
- ❌ Document signing process

- ❌ Don't protect private key
- ❌ Use compromised key
- ❌ Don't verify signatures
- ❌ Sign every commit without need
- ❌ Don't document signing process

---

### Q2: `git commit -S` làm gì? / What does `git commit -S` do?

#### Mục đích / Purpose

Hiểu cách ký commit với GPG.

Understand how to sign commit with GPG.

#### Khi nào dùng / When to use

Khi cần ký commit với GPG.

When needing to sign commit with GPG.

#### Giá trị gì / Benefits

- Bảo mật commit integrity
- Verify author
- Audit trail

- Protect commit integrity
- Verify author
- Audit trail

#### Định nghĩa / Definition

`git commit -S` ký commit với GPG key mặc định:

```bash
git commit -S -m "message"
```

Lệnh này sử dụng GPG key được cấu hình trong `user.signingkey`.

`git commit -S` signs commit with default GPG key:

```bash
git commit -S -m "message"
```

This command uses GPG key configured in `user.signingkey`.

#### Ví dụ / Examples

**Ký commit với key mặc định:**

```bash
# Ký commit
git commit -S -m "feat: add user authentication"

# Xem key đang dùng
git config user.signingkey
# ABCDEF0123456789ABCDEF0123456789
```

**Ký commit với key cụ thể:**

```bash
# Ký với key cụ thể
git commit -S -u KEY_ID -m "feat: add user authentication"
```

**Ký với tag:**

```bash
# Ký tag
git tag -s v1.0.0 -m "Release v1.0.0"
```

#### Best Practices

1. **Cấu hình signing key** trong Git config
2. **Dùng key riêng cho Git signing**
3. **Bảo mật private key**
4. **Verify signatures** sau khi ký
5. **Document signing workflow**

6. **Configure signing key** in Git config
7. **Use separate key for Git signing**
8. **Protect private key**
9. **Verify signatures** after signing
10. **Document signing workflow**

#### Anti-patterns

- ❌ Không cấu hình signing key
- ❌ Dùng key đã bị compromise
- ❌ Không verify signatures
- ❌ Ký commit mà không cần thiết

- ❌ Don't configure signing key
- ❌ Use compromised key
- ❌ Don't verify signatures
- ❌ Sign commits unnecessarily

---

### Q3: `git tag -s` làm gì? / What does `git tag -s` do?

#### Mục đích / Purpose

Hiểu cách ký tag với GPG.

Understand how to sign tag with GPG.

#### Khi nào dùng / When to use

Khi cần ký release tag.

When needing to sign release tag.

#### Giá trị gì / Benefits

- Bảo mật release
- Verify integrity
- Build trust

- Protect release
- Verify integrity
- Build trust

#### Định nghĩa / Definition

`git tag -s` ký tag với GPG key:

```bash
git tag -s -m "tag-name"
```

`git tag -s` signs tag with GPG key:

```bash
git tag -s -m "tag-name"
```

#### Ví dụ / Examples

**Ký tag release:**

```bash
# Ký tag
git tag -s v1.0.0 -m "Release v1.0.0"

# Verify signature
git verify-tag v1.0.0

# Xem tag với signature
git show v1.0.0
```

**Ký annotated tag:**

```bash
# Ký annotated tag
git tag -s -a v1.0.0 -m "Release v1.0.0" -m "Release version 1.0.0"
```

**Ký lightweight tag:**

```bash
# Lightweight tag không thể ký
git tag v1.0.0

# Annotated tag có thể ký
git tag -s v1.0.0
```

#### Best Practices

1. **Ký release tags** để bảo mật
2. **Dùng annotated tags** cho signed tags
3. **Verify signatures** trước khi release
4. **Document signing process**
5. **Ghi rõ tag versions**

6. **Sign release tags** to protect
7. **Use annotated tags** for signed tags
8. **Verify signatures** before releasing
9. **Document signing process**
10. **Clearly mark tag versions**

#### Anti-patterns

- ❌ Không ký release tags
- ❌ Dùng lightweight tags cho signed tags
- ❌ Không verify signatures
- ❌ Tag versions mơ hồ

- ❌ Don't sign release tags
- ❌ Use lightweight tags for signed tags
- ❌ Don't verify signatures
- ❌ Vague tag versions

---

### Q4: Cách verify signatures? / How to verify signatures?

#### Mục đích / Purpose

Biết cách verify GPG signatures của commits và tags.

Know how to verify GPG signatures of commits and tags.

#### Khi nào dùng / When to use

Khi cần verify integrity của commits hoặc tags.

When needing to verify integrity of commits or tags.

#### Giá trị gì / Benefits

- Xác thực author
- Phát hiện commits giả
- Bảo mật repository

- Confirm actual author
- Detect fake commits
- Protect repository

#### Định nghĩa / Definition

`git verify` và `git verify-tag` verify GPG signatures:

```bash
git verify <commit-hash>
git verify-tag <tag-name>
```

Lệnh này kiểm tra signature với GPG key công khai.

`git verify` and `git verify-tag` verify GPG signatures:

```bash
git verify <commit-hash>
git verify-tag <tag-name>
```

This command checks signature with public GPG key.

#### Ví dụ / Examples

**Verify commit signature:**

```bash
# Verify commit
git verify abc1234

# Output
gpg: Signature made ...
gpg: Good signature from "John Doe <john@example.com>"
```

**Verify tag signature:**

```bash
# Verify tag
git verify-tag v1.0.0

# Output
gpg: Signature made ...
gpg: Good signature from "John Doe <john@example.com>"
```

**Verify tất cả signatures trong log:**

```bash
# Xem signatures trong log
git log --show-signature

# Verify từng commit
git verify $(git rev-list HEAD)
```

**Verify với key cụ thể:**

```bash
# Verify với key cụ thể
git verify --keyring /path/to/keyring abc1234
```

#### Best Practices

1. **Verify signatures** sau khi clone
2. **Kiểm tra keyring** trước khi verify
3. **Xem signature status** trong git log
4. **Document verification process**
5. **Cảnh báo về signatures không hợp lệ**

6. **Verify signatures** after cloning
7. **Check keyring** before verifying
8. **View signature status** in git log
9. **Document verification process**
10. **Alert on invalid signatures**

#### Anti-patterns

- ❌ Không verify signatures
- ❌ Không kiểm tra keyring
- ❌ Bỏ qua signatures không hợp lệ
- ❌ Không document verification process
- ❌ Verify mà không hiểu kết quả

- ❌ Don't verify signatures
- ❌ Don't check keyring
- ❌ Ignore invalid signatures
- ❌ Don't document verification process
- ❌ Verify without understanding results

---

### Q5: Secrets trong repositories là vấn đề gì? / What is the problem with secrets in repositories?

#### Mục đích / Purpose

Hiểu rủi ro của có secrets trong Git repository.

Understand risks of having secrets in Git repository.

#### Khi nào dùng / When to use

Luôn luôn cần tránh commit secrets.

Always need to avoid committing secrets.

#### Giá trị gì / Benefits

- Bảo mật credentials và API keys
- Tránh security breaches
- Giữ repository sạch sẽ
- Giảm rủi ro

- Protect credentials and API keys
- Avoid security breaches
- Keep repository clean
- Reduce security risk

#### Định nghĩa / Definition

Secrets là sensitive data như:

- API keys (AWS, Google, etc.)
- Database passwords
- SSH keys
- OAuth tokens
- Environment variables
- Certificates

Secrets are sensitive data like:

- API keys (AWS, Google, etc.)
- Database passwords
- SSH keys
- OAuth tokens
- Environment variables
- Certificates

#### Ví dụ / Examples

**Secrets không nên commit:**

```bash
# ❌ API keys
git add config/aws-keys.json
git commit -m "Add AWS keys"

# ❌ Database passwords
git add .env
git commit -m "Add database config"

# ❌ SSH keys
git add .ssh/id_rsa
git commit -m "Add SSH key"

# ❌ OAuth tokens
git add config/tokens.json
git commit -m "Add auth tokens"
```

**Secrets đã commit (giả định):**

```bash
# .env file trong repository
DATABASE_URL=postgresql://user:pass@localhost/db
API_KEY=sk-1234567890abcdef
AWS_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE

# Git history chứa secrets
git log
```

**Git leak consequences:**

```bash
# API key bị lộ
# Attacker có thể truy cập AWS resources
# Chi phí có thể tăng vọt
# Data có thể bị xóa hoặc sửa đổi
```

#### Best Practices

1. **Sử dụng .gitignore** cho secrets
2. **Dùng environment variables** thay vì hardcode
3. **Sử dụng secret management tools**
4. **Rotate keys thường xuyên**
5. **Kiểm tra history** trước khi push

6. **Use .gitignore** for secrets
7. **Use environment variables** instead of hardcoding
8. **Use secret management tools**
9. **Rotate keys frequently**
10. **Check history** before pushing

#### Anti-patterns

- ❌ Commit API keys
- ❌ Commit passwords
- ❌ Commit SSH keys
- ❌ Không dùng .gitignore cho secrets
- ❌ Không rotate keys
- ❌ Không kiểm tra history trước khi push

- ❌ Commit API keys
- ❌ Commit passwords
- ❌ Don't use .gitignore for secrets
- ❌ Don't rotate keys
- ❌ Don't check history before pushing

---

### Q6: `git-secrets` tool là gì? / What is `git-secrets` tool?

#### Mục đích / Purpose

Hiểu cách sử dụng git-secrets để phát hiện và ngăn secrets.

Understand how to use git-secrets to detect and prevent secrets.

#### Khi nào dùng / When to use

Khi muốn tự động hóa việc phát hiện secrets.

When wanting to automate secret detection and prevention.

#### Giá trị gì / Benefits

- Tự động phát hiện secrets
- Ngăn commit secrets
- Quét lịch sử
- Tích hợp với Git hooks

- Auto-detect secrets
- Prevent secret commits
- Scan history
- Integrate with Git hooks

#### Định nghĩa / Definition

`git-secrets` là tool để phát hiện và ngăn secrets:

```bash
# Cài đặt
npm install -g git-secrets

# Quét repository
git secrets --scan

# Xem patterns
git secrets --list
```

`git-secrets` is tool to detect and prevent secrets:

```bash
# Install
npm install -g git-secrets

# Scan repository
git secrets --scan

# View patterns
git secrets --list
```

#### Ví dụ / Examples

**Cài đặt git-secrets:**

```bash
# Cài đặt
npm install -g git-secrets

# Quét repository
git secrets --scan

# Output
[ERROR] Detected AWS secret in config/production.json
[ERROR] Detected API key in src/api.js
[ERROR] Detected database password in .env
```

**Git hook để ngăn secrets:**

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Quét với git-secrets
git secrets --scan

# Nếu phát hiện secret
if [ $? -ne 0 ]; then
    echo "❌ Secrets detected! Commit aborted."
    exit 1
fi

exit 0
```

**Patterns git-secrets:**

```bash
# Xem patterns
git secrets --list

# Kết quả
aws_access_key_id
aws_secret_access_key
db_password
api_key
private_key
```

**Custom patterns:**

```bash
# Thêm custom patterns
git secrets --add 'my_api_key'
```

#### Best Practices

1. **Cài đặt git-secrets** trong team
2. **Quét thường xuyên** repository
3. **Dùng Git hooks** để enforce
4. **Cấu hình patterns** phù hợp
5. **Rotate keys** nếu bị lộ

6. **Install git-secrets** in team
7. **Scan repository regularly**
8. **Use Git hooks** to enforce
9. **Configure patterns** appropriately
10. **Rotate keys** if leaked

#### Anti-patterns

- ❌ Không cài đặt git-secrets
- ❌ Quét một lần rồi quên
- ❌ Không dùng Git hooks
- ❌ Patterns quá rộng hoặc quá hẹp
- ❌ Không rotate keys sau khi lộ

- ❌ Don't install git-secrets
- ❌ Scan once then forget
- ❌ Don't use Git hooks
- ❌ Patterns too broad or too narrow
- ❌ Don't rotate keys after leak

---

### Q7: `.gitignore` cho sensitive files? / `.gitignore` for sensitive files?

#### Mục đích / Purpose

Hiểu cách dùng .gitignore để bảo mật sensitive files.

Understand how to use .gitignore to protect sensitive files.

#### Khi nào dùng / When to use

Khi có sensitive files không nên track.

When having sensitive files that shouldn't be tracked.

#### Giá trị gì / Benefits

- Bảo mật sensitive data
- Giảm repository size
- Tránh commit secrets
- Giữ local config riêng biệt

- Protect sensitive data
- Reduce repository size
- Avoid committing secrets
- Keep local config separate

#### Định nghĩa / Definition

`.gitignore` file quy định các files và patterns Git nên ignore:

```gitignore
# .gitignore

# Environment files
.env
.env.local
.env.*.local

# Secrets files
secrets/
*.pem
*.key
*.p12

# IDE files
.vscode/
.idea/
*.swp

# Build artifacts
dist/
build/
*.log
```

`.gitignore` file specifies files and patterns Git should ignore:

```gitignore
# .gitignore

# Environment files
.env
.env.local
.env.*.local

# Secrets files
secrets/
*.pem
*.key
*.p12

# IDE files
.vscode/
.idea/
*.swp

# Build artifacts
dist/
build/
*.log
```

#### Ví dụ / Examples

**.gitignore cho secrets:**

```gitignore
# Environment files
.env
.env.local
.env.*.local

# Secrets
secrets/
*.pem
*.key
*.p12
config/production.json
config/staging.json

# API keys
aws-keys.json
google-credentials.json

# Certificates
*.crt
*.pem
*.key
```

**Local config riêng biệt:**

```bash
# Tạo local config
cp config/local.example.js config/local.js

# Thêm vào .gitignore
echo "config/local.js" >> .gitignore
```

#### Best Practices

1. **Thêm .gitignore** ngay khi khởi tạo project
2. **Dùng patterns cụ thể** thay vì wildcard
3. **Giữ .gitignore** trong version control
4. **Document patterns** trong README
5. **Review .gitignore** thường xuyên

6. **Add .gitignore** when initializing project
7. **Use specific patterns** instead of wildcards
8. **Keep .gitignore** in version control
9. **Document patterns** in README
10. **Review .gitignore** regularly

#### Anti-patterns

- ❌ Không có .gitignore
- ❌ Dùng wildcard quá nhiều
- ❌ Quên .gitignore khi khởi tạo
- ❌ Không document patterns
- ❌ Commit .gitignore

- ❌ No .gitignore
- ❌ Use too many wildcards
- ❌ Forget .gitignore when initializing
- ❌ Don't document patterns
- ❌ Commit .gitignore

---

### Q8: Access control trong Git? / Access control in Git?

#### Mục đích / Purpose

Hiểu cách quản lý access control trong Git.

Understand how to manage access control in Git.

#### Khi nào dùng / When to use

Khi cần quản lý ai có thể push, merge, hoặc write.

When needing to control who can push, merge, or write.

#### Giá trị gì / Benefits

- Bảo mật main branch
- Quản lý permissions
- Enforce code review
- Kiểm soát changes

- Protect main branch
- Manage permissions
- Enforce code review
- Control changes

#### Định nghĩa / Definition

Access control trong Git có thể thực hiện bằng:

1. **Protected branches**: Branches yêu cầu review
2. **Branch permissions**: Quy định ai có thể push
3. **Pull request workflows**: PRs cần approval
4. **Server-side hooks**: Enforce policies trên server

Access control in Git can be implemented by:

1. **Protected branches**: Branches requiring review
2. **Branch permissions**: Control who can push
3. **Pull request workflows**: PRs requiring approval
4. **Server-side hooks**: Enforce policies on server

#### Ví dụ / Examples

**Protected branches trên GitHub:**

```bash
# Protect main branch
gh api protect main \
  --require-linear-history \
  --require-approving-reviews \
  --restrict-pushes \
  --enforce-admins
```

**Protected branches trên GitLab:**

```bash
# Protect main branch
gitlab-api protect-branch main --push-access-level maintainer --merge-access-level maintainer
```

**Branch permissions:**

```bash
# GitHub branch protection
gh api protect main \
  --allowed-users "user1,user2" \
  --restrict-pushes
```

**Server-side hook để enforce:**

```bash
#!/bin/bash
# .git/hooks/pre-receive

# Chỉ cho phép maintainer
while read oldrev newrev refname; do
    # Kiểm tra user
    author=$(git log -1 --pretty=%an $newrev)

    if [ "$author" != "maintainer" ]; then
        echo "Only maintainer can push to $refname"
        exit 1
    fi
done
```

#### Best Practices

1. **Bảo mật main branch**
2. **Yêu cầu PR cho changes**
3. **Cấu hình branch permissions**
4. **Sử dụng server-side hooks**
5. **Review access thường xuyên**

6. **Protect main branch**
7. **Require PRs for changes**
8. **Configure branch permissions**
9. **Use server-side hooks**
10. **Review access regularly**

#### Anti-patterns

- ❌ Không bảo mật main branch
- ❌ Cho phép direct push
- ❌ Permissions quá rộng
- ❌ Không review access
- ❌ Bypass hooks với --no-verify

- ❌ Don't protect main branch
- ❌ Allow direct push
- ❌ Permissions too broad
- ❌ Don't review access
- ❌ Bypass hooks with --no-verify

---

## Summary / Tóm tắt

### Key Takeaways / Điểm chính

1. **GPG signing** ký commits và tags để verify integrity
2. **`git commit -S` và `git tag -s`** ký với GPG key
3. **Verify signatures** với `git verify` và `git verify-tag`
4. **Secrets** là vấn đề lớn - dùng .gitignore và environment variables
5. **`git-secrets`** phát hiện và ngăn secrets tự động
6. **.gitignore** bảo mật sensitive files khỏi Git
7. **Access control** bảo mật main branch và quản lý permissions

8. **GPG signing** signs commits and tags to verify integrity
9. **`git commit -S` and `git tag -s`** sign with GPG key
10. **Verify signatures** with `git verify` and `git verify-tag`
11. **Secrets** are major problem - use .gitignore and environment variables
12. **`git-secrets`** detects and prevents secrets automatically
13. **.gitignore** protects sensitive files from Git
14. **Access control** protects main branch and manages permissions

### Commands Reference / Tham khảo lệnh

```bash
# Cấu hình signing
git config --global user.signingkey <key-id>

# Ký commit
git commit -S -m "message"
git commit -S -u KEY_ID -m "message"

# Ký tag
git tag -s -m "tag-name"
git tag -s -a -m "tag-name" -m "message"

# Verify signatures
git verify <commit-hash>
git verify-tag <tag-name>
git log --show-signature

# Git secrets
git secrets --scan
git secrets --list
git secrets --add 'pattern'

# Access control
gh api protect main --restrict-pushes
gitlab-api protect-branch main --push-access-level maintainer
```

### Best Practices / Thực hành tốt nhất

1. **Bảo mật private key** và sử dụng key riêng cho Git signing
2. **Dùng .gitignore** cho tất cả sensitive files
3. **Cài đặt git-secrets** và sử dụng Git hooks
4. **Bảo mật main branch** và yêu cầu PR
5. **Quét repository thường xuyên** để phát hiện secrets
6. **Rotate keys** thường xuyên và nếu bị lộ
7. **Document security policies** rõ ràng

8. **Protect private key** and use separate key for Git signing
9. **Use .gitignore** for all sensitive files
10. **Install git-secrets** and use Git hooks
11. **Protect main branch** and require PRs
12. **Scan repository regularly** to detect secrets
13. **Rotate keys frequently** and if leaked
14. **Document security policies** clearly
