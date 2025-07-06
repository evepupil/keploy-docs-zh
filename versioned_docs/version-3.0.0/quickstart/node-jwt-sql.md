---
id: samples-node-jwt
title: NodeJS - JWT 示例应用
sidebar_label: NodeJS - JWT + Postgres
description: 以下示例应用展示了如何将 NodeJS 框架与 JWT 和 Keploy 平台结合使用。
tags:
  - javascript
  - quickstart
  - samples
  - examples
  - tutorial
keyword:
  - NodeJS 框架
  - Postgres
  - NodeJS
  - API 测试生成器
  - 自动化测试用例生成
---

## 简介

这是一个使用 Node、JWT 和 Postgres 构建的简单 CRUD 示例应用，用于测试 Keploy。系好安全带，这将是一段有趣的旅程！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 开始使用！🎬

## 设置应用

克隆仓库并进入 express-mongo 文件夹

```bash
git clone https://github.com/keploy/samples-typescript && cd samples-typescript/node-jwt

# 安装依赖
npm install
```

## 安装 📥

根据您的操作系统，选择安装方式：
有两种方式可以运行此示例应用。

- [使用 Postgres 的 Docker 容器并在本地运行应用](#在-linuxwsl-上本地运行应用-)
- [使用 Docker compose：在 Docker 容器中运行应用和 Postgres](#使用-docker-compose-)

## 在 Linux/WSL 上本地运行应用 🐧

我们将在 Linux 上直接运行示例应用，但为了让事情更有趣，我们将把数据库（postgres）放在 Docker 上运行。准备好了吗？让我们开始派对吧！🎉

如果您在 Windows 上使用 WSL，请使用以下命令在用户主目录中启动 WSL：

```bash
wsl ~
```

### 启动 Postgres 实例

```zsh
docker-compose up -d
```

## 捕获测试用例

```bash
sudo -E env PATH=$PATH keploy record -c 'node app.js'
```

### 生成测试用例

使用 [Postman](https://postman.com) 或 cURL 命令发起 API 调用。Keploy 将捕获这些调用以生成包含测试用例和数据模拟的测试套件。

1. 创建用户

```bash
curl --location 'http://localhost:8080/api/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username":"user",
    "email":"user@keploy.io",
    "password":"1234"
}'
```

我们将得到输出：

```json
{"message": "User was registered successfully!"}
```

我们将在终端中看到以下输出

<img src="/docs/img/jwt-record.png" alt="Node JWT 示例 Keploy 测试结果" width="100%" style={{ borderRadius: '5px' }} />

让我们继续为不同的端点创建更多测试用例！

2. 创建管理员用户

```bash
curl --location 'http://localhost:8080/api/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username":"admin",
    "email":"admin@keploy.io",
    "password":"1234",
    "role":["admin"]
}'
```

我们将得到输出：

```json
{"message": "User was registered successfully!"}
```

3. 用户登录

```bash
curl --location 'http://localhost:8080/api/auth/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username":"user",
    "email":"user@keploy.io",
    "password":"1234"
}'
```

用户登录后，我们将获得访问令牌：

```json
{
  "id": 1,
  "username": "user",
  "email": "user@keploy.io",
  "roles": ["ROLE_USER"],
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEzNzY0ODY1LCJleHAiOjE3MTM3NjUwNDV9.5LSU1A1jxIbIQFS6Tq26ENNWZBinFt2cJQZ7swpipbc"
}
```

4. 访问用户内容

```sh
curl --location 'http://localhost:8080/api/test/all'
```

我们将得到：

```
Public Content
```

5. 访问用户内容

```sh
curl --location 'http://localhost:8080/api/test/user' \
--header 'x-access-token: <TOKEN>'
```

我们将得到

```
User Content
```

## 运行测试用例

```bash
sudo -E env PATH=$PATH keploy test -c 'npm run app.js' --delay 10
```

由于令牌会过期，当我们在测试模式下使用时，新的令牌会重新生成，我们的测试用例将失败。为了确保测试用例不失败，我们需要使用 [timeFreezing](https://keploy.io/docs/keploy-cloud/time-freezing/)。
由于令牌会过期，当我们在测试模式下使用时，新的令牌会重新生成，我们的测试用例将失败。为了确保测试用例不失败，我们需要使用 [timeFreezing](https://keploy.io/docs/keploy-cloud/time-freezing/)。

<img src="/docs/img/jwt-test-fail.png" alt="Node JWT 示例 Keploy 测试结果" width="100%" style={{ borderRadius: '5px' }} />

但对于此应用，令牌过期时间为 10 分钟，因此让我们在 10 分钟内测试应用。让我们在 `test-3.yml` 的第 45 行 `header.Date` 下添加 `Etag` 和 `accessToken` 作为噪声。文件将如下所示：-
但对于此应用，令牌过期时间为 10 分钟，因此让我们在 10 分钟内测试应用。让我们在 `test-3.yml` 的第 45 行 `header.Date` 下添加 `Etag` 和 `accessToken` 作为噪声。文件将如下所示：-

```
        noise:
        |   - header.Date
        |   - header.Etag
        |   - body.accessToken
```

现在，让我们再次在测试模式下运行 keploy：-

<img src="/docs/img/jwt-test-pass.png" alt="Node JWT 示例 Keploy 测试结果" width="100%" style={{ borderRadius: '5px' }} />

### 总结 🎉

恭喜您完成这段旅程！您已经见识了 Keploy 的强大功能，锻炼了编码能力，还享受了一些乐趣！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

祝您编码愉快！✨👩‍💻👨‍💻✨

**\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\_\_\_\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\***

---

## 使用 Docker Compose 🐳

我们将使用 Docker compose 在 Docker 容器中运行应用和 Postgres。

由于我们使用 docker 设置了示例应用，我们需要在 `config/db.config.js` 的第 2 行将 postgres 主机从 `localhost` 更新为 `postgres`。

## 捕获测试用例

我们将使用 docker-compose 在记录模式下运行 keploy 以启动我们的应用：-

```bash
keploy record -c "docker-compose up" --container-name "jwtSqlApp"
```

#### 生成测试用例

使用 [Postman](https://postman.com) 或 cURL 命令发起 API 调用。Keploy 将捕获这些调用以生成包含测试用例和数据模拟的测试套件。

1. 创建用户

```bash
curl --location 'http://localhost:8080/api/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username":"user",
    "email":"user@keploy.io",
    "password":"1234"
}'
```

我们将得到输出：

```json
{"message": "User was registered successfully!"}
```

我们将在终端中看到以下输出

<img src="/docs/img/jwt-record.png" alt="Node JWT 示例 Keploy 测试结果" width="100%" style={{ borderRadius: '5px' }} />

让我们继续为不同的端点创建更多测试用例！

2. 创建管理员用户

```bash
curl --location 'http://localhost:8080/api/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username":"admin",
    "email":"admin@keploy.io",
    "password":"1234",
    "role":["admin"]
}'
```

我们将得到输出：

```json
{"message": "User was registered successfully!"}
```

3. 用户登录

```bash
curl --location 'http://localhost:8080/api/auth/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username":"user",
    "email":"user@keploy.io",
    "password":"1234"
}'
```

用户登录后，我们将获得访问令牌：

```json
{
  "id": 1,
  "username": "user",
  "email": "user@keploy.io",
  "roles": ["ROLE_USER"],
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEzNzY0ODY1LCJleHAiOjE3MTM3NjUwNDV9.5LSU1A1jxIbIQFS6Tq26ENNWZBinFt2cJQZ7swpipbc"
}
```

4. 访问用户内容

```sh
curl --location 'http://localhost:8080/api/test/all'
```

我们将得到：

```
Public Content
```

5. 访问用户内容

```sh
curl --location 'http://localhost:8080/api/test/user' \
--header 'x-access-token: <TOKEN>'
```

我们将得到

```
User Content
```

## 运行测试用例

```bash
keploy test -c 'sudo docker-compose up'  --container-name "jwtSqlApp" --delay 10
```

由于令牌会过期，当我们在测试模式下使用时，新的令牌会重新生成，我们的测试用例将失败。为了确保测试用例不失败，我们需要使用 [timeFreezing](https://keploy.io/docs/keploy-cloud/time-freezing/)。

<img src="/docs/img/jwt-test-fail.png" alt="Node JWT 示例 Keploy 测试结果" width="100%" style={{ borderRadius: '5px' }} />

但对于此应用，令牌过期时间为 10 分钟，因此让我们在 10 分钟内测试应用。让我们在 `test-3.yml` 的第 45 行 `header.Date` 下添加 `Etag` 和 `accessToken` 作为噪声。文件将如下所示：-

```
        noise:
        |   - header.Date
        |   - header.Etag
        |   - body.accessToken
```

现在，让我们再次在测试模式下运行 keploy：-

<img src="/docs/img/jwt-test-pass.png" alt="Node JWT 示例 Keploy 测试结果" width="100%" style={{ borderRadius: '5px' }} />

### 总结 🎉

恭喜您完成这段旅程！您已经见识了 Keploy 的强大功能，锻炼了编码能力，还享受了一些乐趣！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

希望这对您有所帮助，如果您还有任何问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>

**\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\_\_\_\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\***