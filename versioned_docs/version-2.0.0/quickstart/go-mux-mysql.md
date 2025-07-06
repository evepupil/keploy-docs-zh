---
id: samples-mysql
title: Mux MySQL 示例应用
sidebar_label: Mux + MySQL
description: 以下示例应用展示了如何使用 Mux 框架和 Keploy 平台。
tags:
  - go
  - 快速入门
  - 示例
  - 教程
  - mysql
  - sql
  - mux框架
keyword:
  - Mux 框架
  - MySQL
  - Golang
  - API 测试生成器
  - 自动化测试用例生成
---

## 简介

这是一个使用 [Mux](https://github.com/gorilla/mux) 和 MySQL 测试 Keploy 集成能力的 URL 缩短器示例应用。系好安全带，这将是一段有趣的旅程！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 开始吧！🎬

## 克隆示例 URL 缩短器应用 🧪

```bash
git clone https://github.com/keploy/samples-go.git && cd samples-go/mux-mysql
go mod download
```

## 安装 Keploy

有两种方式可以运行此示例应用。

- [使用 Docker compose：在 Docker 容器中运行应用及 MySQL](#使用-docker-compose-)
- [使用 Docker 容器运行 MySQL 并在本地运行应用](#在-linuxwsl-上本地运行应用-)

## 使用 Docker Compose 🐳

我们将使用 Docker compose 在 Docker 容器中运行应用及 MySQL。

### 启动 MySQL 实例

```bash
docker run -p 3306:3306 --rm --name mysql --network keploy-network -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:latest
```

#### 创建 Docker 卷

```bash
docker volume create --driver local --opt type=debugfs --opt device=debugfs debugfs
```

### 捕获测试用例

现在，我们将创建应用的 Docker 镜像：

```zsh
docker build -t url-short .
```

准备好 Docker 镜像文件后，此命令将开始使用 eBPF 记录 API 调用：

```shell
keploy record -c "docker run -p 8080:8080 --name urlshort --rm --network keploy-network url-short:latest"
```

使用 Postman 或 cURL 命令发起 API 调用。Keploy 将捕获这些调用以生成包含测试用例和数据模拟的测试套件。

### 生成测试用例

要生成测试用例，我们只需发起一些 API 调用。您可以使用 [Postman](https://www.postman.com/) 或简单的 `curl`。

#### 生成短链接

```bash
curl --request POST \
  --url http://localhost:8080/create \
  --header 'content-type: application/json' \
  --data '{
  "link": "https://github.com"
}'
```

这将返回短链接。时间戳（ts）在测试时会自动被忽略，因为它总是不同的。

```bash
{
  "message":"Converted",
  "link":"http://localhost:8080/links/1",
  "status":true
}
```

#### 访问所有短链接

```bash
curl --request GET http://localhost:8080/all
```

现在，这两个 API 调用已被捕获为**可编辑**的测试用例，并写入 `keploy/tests` 文件夹。keploy 目录还会有一个包含所有 MySQL 操作输出的 `mocks` 文件。文件夹结构如下所示：

![测试用例](/img/mux-mysql-keploy-record.png)

现在，让我们见证奇迹！✨💫

想看看一切是否如预期般工作吗？

### 运行测试用例

现在让我们运行测试模式（在 echo-sql 目录中，而不是 Keploy 目录）。

```shell
keploy test -c "docker run -p 8080:8080 --name urlshort --rm --network keploy-network url-short:latest" --delay 10
```

输出应如下所示：

![测试运行](/img/mux-mysql-keploy-tests.png)

因此，无需设置虚假数据库/API MySQL 或为其编写模拟。Keploy 会自动模拟它们，**应用以为它在与 MySQL 对话 😄**

### 总结 🎉

恭喜您完成这段旅程！您已经见识了 Keploy 的强大，锻炼了编码能力，还享受了一些乐趣！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

编码愉快！✨👩‍💻👨‍💻✨

**\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\_\_\_\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\***

## 在 Linux/WSL 上本地运行应用 🐧

我们将在 Linux 上直接运行示例应用，但为了让事情更有趣一点，我们将让数据库（MySQL）在 Docker 上运行。准备好了吗？让我们开始派对吧！🎉

> 要为您的应用在 Docker 上使用 Keploy 建立网络，请按照以下步骤操作。
> 如果您使用 docker-compose 网络，请将下面的 keploy-network 替换为您的应用的 `docker_compose_network_name`。

### 启动 MySQL 实例

```zsh
docker run -p 3306:3306 --rm --name mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:latest
```

现在，我们将创建应用的二进制文件：

```zsh
export ConnectionString="root:my-secret-pw@tcp(localhost:3306)/mysql"

go build -o main
```

### 捕获测试用例

```zsh
sudo -E PATH=$PATH keploy record -c "./main"
```

![测试用例](https://github.com/heyyakash/samples-go/assets/85030597/2b4f3c04-4631-4f9a-b317-7fdb6db87879)

### 生成测试用例

要生成测试用例，我们只需发起一些 API 调用。您可以使用 Postman、Hoppscotch 或简单的 curl。

#### 生成短链接

```bash
curl --request POST \
  --url http://localhost:8080/create \
  --header 'content-type: application/json' \
  --data '{
  "link": "https://google.com"
}'
```

这将返回短链接。

```json
{
  "message": "Converted",
  "link": "http://localhost:8080/links/1",
  "status": true
}
```

#### 从短链接重定向到原始链接

```zsh
curl -request GET localhost:8080/links/1
```

现在，让我们见证奇迹！🪄💫

现在，这两个 API 调用已被捕获为测试用例，并应在 Keploy CLI 上可见。您应该会看到一个名为 keploy 的文件夹，其中包含我们刚刚捕获的测试用例和创建的数据模拟。

### 运行捕获的测试用例

现在我们已经捕获了测试用例，运行测试文件。

```zsh
sudo -E PATH=$PATH keploy test -c "./main" --delay 10
```

因此，无需在本地设置 MySQL、web-go 等依赖项或为测试编写模拟。

应用以为它在与 MySQL 对话 😄

我们将得到类似以下的输出：
![测试运行](https://github.com/heyyakash/samples-go/assets/85030597/472cab5e-9687-4fc5-bd57-3c52f56feedf)

### 总结 🎉

恭喜您完成这段旅程！您已经见识了 Keploy 的强大，锻炼了编码能力，还享受了一些乐趣！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

希望这对您有所帮助，如果您仍有任何问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>