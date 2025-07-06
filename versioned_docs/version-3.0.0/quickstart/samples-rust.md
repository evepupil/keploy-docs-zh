---
id: samples-rust
title: Rust 示例应用
sidebar_label: Rust + Mongo (GraphQL)
description: 以下示例应用用于测试 Keploy 与 Rust 和 MongoDB 的集成能力。
tags:
  - Rust
  - MongoDB
  - GraphQL
keyword:
  - Rust
  - MongoDB
  - GraphQL
  - API 测试生成器
  - 自动化测试用例生成
---

## 简介

这是一个使用 Rust 和 MongoDB 测试 Keploy 集成能力的示例应用。系好安全带，这将是一段有趣的旅程！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 快速开始！🎬

## 设置应用

现在我们已经安装了 bun，接下来将设置我们的应用。

```bash
git clone https://github.com/keploy/samples-rust && cd samples-rust/gql-mongo
```

## 在 Linux/WSL 上本地运行应用 🐧

我们将使用 Docker compose 在 Docker 容器中运行 Mongo。

### 启动 MongoDB 实例

```zsh
docker compose up -d
```

### 捕获测试用例

```bash
sudo -E env PATH=$PATH keploy record -c 'cargo run'
```

#### 生成测试用例

访问 http://127.0.0.1:8000 并创建一些查询。

我们将在终端中看到以下输出：

![测试用例](/img/rust-mongo-test-case.png?raw=true)

### 运行测试用例

现在，让我们再次以测试模式运行 keploy：

```bash
sudo -E env PATH=$PATH keploy test -c 'cargo run'
```

![测试运行](/img/rust-mongo-test-run.png?raw=true)

_太棒了！！我们的测试用例通过了 🌟_

希望这对你有所帮助，如果还有任何问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>