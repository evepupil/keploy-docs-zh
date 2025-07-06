---
id: samples-nodejs
title: NodeJS 示例应用
sidebar_label: NodeJS - Express + Mongoose
description: 以下示例应用展示了如何使用 NodeJS 框架和 Keploy 平台。
tags:
  - javascript
  - quickstart
  - samples
  - examples
  - tutorial
keyword:
  - NodeJS 框架
  - MongoDB
  - NodeJS
  - API 测试生成器
  - 自动化测试用例生成
---

## 简介

一个简单的 CRUD 示例应用，展示 Keploy 如何无缝集成 Express 和 MongoDB。系好安全带，这将是一段有趣的旅程！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 开始使用！🎬

克隆仓库并进入 express-mongoose 文件夹

```bash
git clone https://github.com/keploy/samples-typescript && cd samples-typescript/express-mongoose

# 安装依赖
npm install
```

## 安装 📥

根据你的操作系统选择安装方式：
有两种方式可以运行此示例应用。

- [使用 Docker compose：在 Docker 容器中运行应用和 MongoDB](#使用-docker-compose-)
- [使用 Docker 容器运行 MongoDB 并在本地运行应用](#在-linuxwsl-上本地运行应用-)

## 使用 Docker Compose 🐳

我们将使用 Docker compose 在 Docker 容器中运行应用和 MongoDB。

### 准备，开始录制！🎥

启动应用和 MongoDB 实例并开始 Keploy 录制。注意两个关键标志：
`-c`：运行应用的命令（例如 `docker compose up`）。

`--container-name`：`docker-compose.yml` 中用于流量拦截的容器名称。

```bash
keploy record -c "docker compose up" --container-name "nodeMongoApp" --build-delay 50
```

🔥 挑战时间！生成一些测试用例。怎么做？只需**发起一些 API 调用**。可以使用 Postman、Hoppscotch 或 curl - 任你选择！

#### 生成测试用例

使用 [Postman](https://postman.com) 或 cURL 命令发起 API 调用。Keploy 将捕获这些调用来生成包含测试用例和数据模拟的测试套件。

```bash
curl --request POST \
--url http://localhost:8000/students \
 --header 'content-type: application/json' \
 --data '{
  "name":"John Do",
  "email":"john@xyiz.com",
  "phone":"0123456799"
  }'
```

你会看到如下响应：

```
学生注册成功！
```

🎉 太棒了！通过一个简单的 API 调用，你已经创建了一个带有模拟数据的测试用例！查看 Keploy 目录，你会发现新生成的 `test-1.yml` 和 `mocks.yml`。

_继续发起更多 API 调用来生成更多测试用例！_
按照以下步骤...或发起更多 API 调用

```bash
curl --request GET \
--url http://localhost:8080/students
```

或者直接在浏览器中访问 `http://localhost:8000/students`。

你注意到项目库中新增的测试和模拟文件了吗？太棒了！👏

### 运行测试

是时候进行测试了 🧪

```bash
keploy test -c "docker compose up" --container-name "nodeMongoApp" --build-delay 50 --delay 10
```

> `--delay` 标志？这是为了让你的应用在测试用例运行前有短暂的准备时间（以秒为单位）。

你的测试结果应该看起来像这样：

<img src="/docs/img/testrun-node-fail.png" alt="示例 Keploy 测试结果 Node MongoDB" width="100%" style={{ borderRadius: '5px' }} />

别担心，只需将易变字段（如这里的 **ts**）添加到 **噪声参数** 中即可**跳过这些断言**。

<img src="/docs/img/testrun-node-pass.png" alt="示例 Keploy 测试结果 Node MongoDB" width="100%" style={{ borderRadius: '5px' }} />

### 总结 🎉

恭喜你完成了这段旅程！你已经见识了 Keploy 的强大功能，锻炼了编码能力，还享受了一些乐趣！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

编码愉快！✨👩‍💻👨‍💻✨

**\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\_\_\_\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\***

## 在 Linux/WSL 上本地运行应用 🐧

我们将在 Linux 上直接运行示例应用，但为了让事情更有趣，我们会将数据库（MongoDB）运行在 Docker 中。准备好了吗？让我们开始吧！🎉

如果你在 Windows 上使用 WSL，请使用以下命令在用户主目录中启动 WSL：

```bash
wsl ~
```

首先，更新 **`db/connection.js`** 第 4 行的 MongoDB URL，将 `mongodb://mongoDb:27017/keploy` 改为 `mongodb://127.0.0.1:27017/keploy`。

#### 🍃 启动 MongoDB

我们将运行一个需要现有 Docker 网络的 mongo 容器。运行以下命令创建所需的 Docker 网络：

```bash
docker network create keploy-network
```

现在，启动你的 mongo 容器：

```bash
docker compose up mongo
```

### 📼 开始录制！

准备好，开始录制！命令如下：

```bash
sudo -E env PATH=$PATH keploy record -c 'node src/app.js'
```

注意 `-c` 标志！这是运行应用的命令。

好了，魔法师！应用已经启动，让我们生成一些测试用例。方法？发起一些 API 调用！可以使用 Postman、Hoppscotch 或经典的 curl - 选择你的工具。

#### 生成测试用例

使用 [Postman](https://postman.com) 或 cURL 命令发起 API 调用。Keploy 将捕获这些调用来生成包含测试用例和数据模拟的测试套件。

```bash
curl --request POST \
--url http://localhost:8000/students \
--header 'content-type: application/json' \
--data '{
  "name":"John Do",
  "email":"john@xyiz.com",
  "phone":"0123456799"
  }'
```

你会看到如下响应：

```
学生注册成功！
```

🎉 太棒了！给自己鼓个掌！通过这个简单的操作，你已经生成了一个带有模拟数据的测试用例！查看 **Keploy 目录**，你会发现生成的 `test-1.yml` 和 `mocks.yml`。

<img src="/docs/img/testcase-node.png" alt="示例 Keploy 测试结果 Node MongoDB" width="100%" style={{ borderRadius: '5px' }} />

现在，真正的乐趣开始了。继续生成更多测试用例！

🚀 按照以下步骤...！

```bash
curl --request GET \  --url http://localhost:8080/students
```

或者直接在浏览器中访问 `http://localhost:8000/students`。

你注意到项目库中新增的测试和模拟文件了吗？太棒了！👏

### 运行测试 🏁

准备好测试你的魔法了吗？

```bash
sudo -E env PATH=$PATH keploy test -c "node src/app.js" --delay 10
```

别担心，只需将易变字段（如这里的 **ts**）添加到 **噪声参数** 中即可**跳过这些断言**。

<img src="/docs/img/testrun-node-pass.png" alt="示例 Keploy 测试结果 Node MongoDB" width="100%" style={{ borderRadius: '5px' }} />

### 总结 🎉

恭喜你完成了这段旅程！你已经见识了 Keploy 的强大功能，锻炼了编码能力，还享受了一些乐趣！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

如果还有任何问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>