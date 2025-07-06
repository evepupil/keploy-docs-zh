---
id: samples-sse
title: 实时应用示例（Svelte）
sidebar_label: SSE + Svelte + MongoDB
description: 以下示例应用测试Keploy与SSE等实时订阅功能的集成能力
tags:
  - go
  - 快速入门
  - 示例
  - 教程
  - svelte
  - SSE
keyword:
  - Svelte
  - 服务器发送事件
  - MongoDB模拟
  - API测试生成器
  - 自动化测试用例生成
---

## 简介

🪄 深入实时订阅的世界，看看Keploy如何与SSE和MongoDB无缝集成。系好安全带，这将是一段有趣的旅程！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 安装 📥

运行此示例应用的方式。

- [使用MongoDB的Docker容器并在本地运行应用](#installation-setup)

## 安装设置

#### 服务端

```bash
git clone https://github.com/keploy/samples-go.git && cd samples-go/sse-svelte
go mod download
```

### 启动MongoDB实例

使用docker-compose文件启动mongodb实例：

```bash
# 启动Postgres
docker-compose up mongo
```

### 构建应用二进制文件

现在，我们将创建应用的二进制文件：

```bash
go build -cover
```

准备好应用二进制文件后，我们将使用keploy启动应用以开始捕获测试用例。

## 捕获测试用例

```bash
sudo -E keploy record "./sse-mongo"
```

### 启动UI

我们将从使用Svelte.js编写的UI中捕获测试：

```bash
cd svelte-app && npm install && npm run dev
```

现在点击`GetTime`按钮触发事件。我们会注意到keploy将捕获这些调用：
![测试用例](https://github.com/keploy/samples-go/raw/main/sse-svelte/img/testcase.png?raw=true)

## 运行测试用例

现在让我们运行测试模式：

```shell
keploy test -c "./sse-mongo" --delay 10 --goCoverage
```

输出应如下所示：
![测试运行](https://github.com/keploy/samples-go/raw/main/sse-svelte/img/testrun.png?raw=true)

因此，无需设置像Postgres这样的假数据库/API或为它们编写模拟。Keploy会自动模拟它们，**应用以为它在与MongoDb对话😄**。仅需几次点击，我们就能够获得Go后端应用42%的代码覆盖率。