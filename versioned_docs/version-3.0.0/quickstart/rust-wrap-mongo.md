---
id: samples-rust-wrap
title: Rust 示例应用
sidebar_label: Warp + Mongo
description: 以下示例应用用于测试 Keploy 与 Warp HTTP 和 MongoDB 的集成能力。
tags:
  - Rust
  - MongoDB
keyword:
  - Rust
  - MongoDB
  - API 测试生成器
  - 自动化测试用例生成
---

## 简介

这是一个使用 Rust 和 MongoDB 测试 Keploy 集成能力的示例应用。系好安全带，这将是一段有趣的旅程！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 快速开始 🎬

## 设置应用

现在我们已经安装了 bun，接下来将设置我们的应用。

```bash
git clone https://github.com/keploy/samples-rust && cd samples-rust/CRUD-rust-mongo
```

## 在 Linux/WSL 上本地运行应用 🐧

我们将使用 Docker compose 在 Docker 容器中运行 MongoDB。

### 启动 MongoDB 实例

```zsh
docker compose up -d
```

### 捕获测试用例

```bash
sudo -E env PATH=$PATH keploy record -c 'cargo run'
```

#### 生成测试用例

1. 创建笔记

```bash
curl --location 'http://localhost:8000/api/notes/' \
--header 'Content-Type: application/json' \
--data '{
    "title": "You'\''ll learn how to build a CRUD API with FastAPI",
    "content": "Fastapi is really easy to use",
    "category": "FastAPI"
}'
```

将返回

```json
{
  "status": "success",
  "data": {
    "note": {
      "id": "6618fa20875aedcfe96e08ed",
      "title": "You'll learn how to build a CRUD API with FastAPI",
      "content": "Fastapi is really easy to use",
      "category": "FastAPI",
      "published": false,
      "createdAt": "2024-04-12T09:08:48.686Z",
      "updatedAt": "2024-04-12T09:08:48.686Z"
    }
  }
}
```

2. 获取笔记

```bash
curl --location 'http://localhost:8000/api/notes/6618fa20875aedcfe96e08ed'
```

Keploy 终端将显示如下内容：

![测试用例](../../../static/img/rust-crud-record.png?raw=true)

### 运行测试用例

现在，让我们再次以测试模式运行 Keploy：

```bash
sudo -E env PATH=$PATH keploy test -c 'cargo run'
```

_太棒了！！我们的测试用例已通过 🌟_

希望这对您有所帮助，如果仍有疑问，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>