---
id: samples-echo
title: Echo SQL 示例应用
sidebar_label: Echo + Postgres
description: 以下示例应用展示了如何使用 Echo 框架和 Keploy 平台。
tags:
  - go
  - quickstart
  - samples
  - examples
  - tutorial
  - postgres
keyword:
  - Echo 框架
  - Postgres
  - SQL
  - Golang
  - API 测试生成器
  - 自动化测试用例生成
---

## 简介

这是一个使用 Echo 和 [PostgreSQL](https://www.postgresql.org/) 测试 Keploy 集成能力的 URL 缩短器示例应用。系好安全带，这将是一段有趣的旅程！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 开始吧！🎬

## 克隆示例 URL 缩短器应用 🧪

```bash
git clone https://github.com/keploy/samples-go.git && cd samples-go/echo-sql
go mod download
```

## 安装 Keploy

根据您的操作系统，选择您的冒险方式：

有两种方式可以运行此示例应用。

- [使用 Docker compose：在 Docker 容器中运行应用及 Postgres](#使用-docker-compose-)
- [使用 Docker 容器运行 Postgres 并在本地运行应用](#在-linuxwsl-本地运行应用-)

## 使用 Docker Compose 🐳

我们将使用 Docker compose 在 Docker 容器中运行应用及 Postgres。

### 准备、开始、录制！🎥

#### 启动 Postgres 实例

使用 docker-compose 文件启动 postgres 实例：

```bash
# 启动 Postgres
docker compose up
```

#### 创建 Docker 卷

```bash
docker volume create --driver local --opt type=debugfs --opt device=debugfs debugfs
```

### 捕获测试用例

现在，我们将创建应用的二进制文件：

```zsh
docker build -t echo-app:1.0 .
```

准备好二进制文件后，此命令将开始使用 ebpf 录制 API 调用：

```shell
keploy record -c "docker run -p 8082:8082 --name echoSqlApp --network keploy-network echo-app:1.0"
```

使用 Hoppscotch、Postman 或 cURL 命令进行 API 调用。Keploy 将捕获这些调用以生成包含测试用例和数据模拟的测试套件。

#### 生成测试用例

要生成测试用例，我们只需进行一些 API 调用。您可以使用 [Postman](https://www.postman.com/) 或简单的 `curl` 命令。

```bash
curl --request POST \
  --url http://localhost:8082/url \
  --header 'content-type: application/json' \
  --data '{
  "url": "https://github.com
}'
```

这将返回缩短后的 URL。时间戳（ts）在测试期间会自动忽略，因为它总是不同。

```json
{
  "ts": 1647802058801841100,
  "url": "http://localhost:8082/GuwHCgoQ"
}
```

#### 从缩短的 URL 重定向到原始 URL

##### 1. 使用 Curl 命令

```bash
curl --request GET \
  --url http://localhost:8082/GuwHCgoQ
```

2. 或通过浏览器访问 `http://localhost:8082/GuwHCgoQ`

现在，这些 API 调用已被捕获为**可编辑**的测试用例并写入 `keploy/tests` 文件夹。keploy 目录还将包含 `mocks` 文件，其中包含所有 postgres 操作的输出。文件夹结构如下：

![测试用例](/img/testcase-echo.png?raw=true)

现在，让我们见证奇迹！✨💫

想看看一切是否如预期般工作吗？

### 运行测试用例

现在我们已经捕获了测试用例，我们将在 `test-*.yaml` 文件中的噪声字段添加 `ts`。

**1. 在第 32 行，我们将在 "`header.data`" 下添加 "`- body.ts`"。**

现在让我们运行测试模式（在 echo-sql 目录中，而不是 Keploy 目录）。

```shell
keploy test -c "docker run -p 8082:8082 --name echoSqlApp --network keploy-network echo-app:1.0" --delay 10
```

输出应如下所示：

![测试运行](/img/testrun-echo.png?raw=true)

因此，无需设置假的数据库/API（如 Postgres）或为它们编写模拟。Keploy 会自动模拟它们，**应用以为它在与 Postgres 对话 😄**

### 总结 🎉

恭喜您完成这段旅程！您已经见识了 Keploy 的强大功能，锻炼了编码能力，还享受了一些乐趣！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

编码愉快！✨👩‍💻👨‍💻✨

**\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\_\_\_\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\***

## 在 Linux/WSL 本地运行应用 🐧

我们将在 Linux 上直接运行示例应用，但为了让事情更有趣，我们将让数据库（Postgres）在 Docker 上运行。准备好了吗？让我们开始派对吧！🎉

使用 docker-compose 文件启动 Postgres 实例：

```shell
docker-compose up -d
```

> **由于我们使用 Docker 运行应用，我们需要更新 `main.go` 第 28 行的 `postgres` 主机，将主机更新为 `localhost`。**

现在，我们将创建应用的二进制文件：

```go
go build -cover
```

### 捕获测试用例

```shell
sudo -E PATH=$PATH keploy record -c "./echo-psql-url-shortener"
```

![测试用例](/img/testcase-echo.png?raw=true)

#### 生成测试用例

要生成测试用例，我们只需进行一些 API 调用。您可以使用 Postman、Hoppscotch 或简单的 curl 命令。

```bash
curl --request POST \
  --url http://localhost:8082/url \
  --header 'content-type: application/json' \
  --data '{
  "url": "https://google.com"
}'
```

这将返回缩短后的 URL。

```json
{
  "ts": 1645540022,
  "url": "http://localhost:8082/Lhr4BWAi"
}
```

#### 从缩短的 URL 重定向到原始 URL

```zsh
curl --request GET \ --url http://localhost:8082/Lhr4BWAi
```

或通过浏览器访问 `http://localhost:8082/Lhr4BWAi`

现在，让我们见证魔法！🪄💫

现在，这些 API 调用已被捕获为测试用例，并应在 Keploy CLI 上可见。您应该会看到一个名为 keploy 的文件夹，其中包含我们刚刚捕获的测试用例和创建的数据模拟。

### 运行捕获的测试用例

现在我们已经捕获了测试用例，运行测试文件。

```shell
sudo -E PATH=$PATH keploy record -c "./echo-psql-url-shortener" --delay 10
```

因此，无需在本地设置依赖项（如 mongoDB、web-go）或为测试编写模拟。

应用以为它在与 mongoDB 对话 😄

我们将得到类似以下的输出：
![测试运行](/img/testrun-echo.png?raw=true)

### 总结 🎉

恭喜您完成这段旅程！您已经见识了 Keploy 的强大功能，锻炼了编码能力，还享受了一些乐趣！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

希望这对您有所帮助，如果您仍有任何问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>