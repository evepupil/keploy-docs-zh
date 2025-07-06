---
id: sample-rust-crud-mongo
title: 使用MongoDB的Rust CRUD REST API
sidebar_label: Rust + MongoDB (REST)
description: 一个示例CRUD REST API应用程序，用于测试Keploy与Rust和MongoDB的集成能力。
tags:
  - Rust
  - MongoDB
  - REST API
keyword:
  - Rust
  - MongoDB
  - API测试生成器
  - 自动测试用例生成
  - CRUD
  - REST
---

## 简介

这是一个示例CRUD REST API应用程序，展示Keploy与Rust和MongoDB的集成能力。让我们开始吧！🚀

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 快速开始 🎬

### 设置应用

现在我们已经安装了Keploy，让我们来设置应用程序。

```bash
git clone https://github.com/keploy/samples-rust
cd samples-rust/CRUD-rust-mongo
```

## 在Linux/WSL上本地运行应用 🐧

我们将使用Docker compose在Docker容器中运行Mongo。

### 启动MongoDB实例

在终端中打开根目录路径，然后执行以下命令：

```bash
docker-compose up -d
```

### 运行应用

```bash
cargo r -r
```

应用将在8000端口运行。

#### 捕获测试用例

在同一终端执行以下命令：

```bash
keploy record -c 'cargo r -r'
```

输出如下：
![RecordRun](/img/rust-mongo-rest-test-run.png?raw=true)

### 生成测试用例

打开Postman或任何其他工具，或使用Postman VSCode扩展。点击导入图标（如下所示）：

![TestRun](/img/rust-mongo-postman-collection-import-button.png?raw=true)

导入名为`Note App.postman_collection.json`的文件。

之后，Postman将显示类似窗口：

![TestRun](/img/rust-mongo-rest-postman-collection.png?raw=true)

使用可用数据点击Create Note请求，您将在终端中看到以下输出：

```bash
🐰 Keploy: 2024-08-27T21:06:57+05:30 t 8INFO
🟠 Keploy已为用户应用程序捕获测试用例。   {"path": "/root/samples-rust/CRUD-rust-mongo/keploy/test-set-3/tests", "testcase name": "test-1"}
```

![TestRun](/img/rust-mongo-rest-postman-create-success.png?raw=true)

然后，创建一个GET all请求，您将在终端中看到以下输出：

```bash
🐰 Keploy: 2024-08-27T21:13:41+05:30    INFO    🟠 Keploy已为用户应用程序捕获测试用例。   {"path": "/root/samples-rust/CRUD-rust-mongo/keploy/test-set-3/tests", "testcase name": "test-3"}
```

![Test-case](/img/rust-mongo-rest-postman-get-all-success.png?raw=true)

我们执行了两个请求，一个是创建笔记，一个是获取所有笔记。这些请求被Keploy捕获为测试用例。

### 运行测试用例

现在，让我们在测试模式下启动keploy来运行我们的测试用例：

```bash
keploy test -c 'cargo r -r'
```

我们在终端中得到以下输出 -

![TestRun](/img/rust-mongo-rest-test-run-2.png?raw=true)
_太棒了！！我们的测试用例通过了 🌟_