---
id: samples-csharp
title: 示例CRUD应用(CSharp版)
sidebar_label: .Net + Postgres
description: 本示例应用展示如何结合.Net框架与Keploy平台进行开发。
tags:
  - csharp
  - quickstart
  - samples
  - examples
  - tutorial
  - postgrs
  - dotnet-framework
keyword:
  - DotNet框架
  - Postgres
  - CSharp
  - API测试生成器
  - 自动化测试用例生成
---

## 简介

🪄 探索用户认证应用的世界，了解Keploy如何无缝集成[.Net](https://dotnet.microsoft.com/en-us/)和[Postgres](https://www.postgresql.org/)。系好安全带，这将是一段有趣的旅程！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 快速开始！🎬

## 克隆用户认证示例应用 🧪

```bash
git clone https://github.com/keploy/samples-csharp.git && cd samples-csharp

# 启动数据库实例
docker-compose up
```

## 安装指南 📥

- [使用Docker容器运行Postgres并在本地运行应用](#在linuxwsl-本地运行应用)

## 在Linux/WSL本地运行应用 🐧

我们将在Linux上直接运行示例应用，但为了让事情更有趣，数据库(Redis)会在Docker中运行。准备好了吗？让我们开始派对吧！🎉

### 📼 开始录制！

启动应用前需要先运行迁移命令：

```bash
dotnet ef migrations add InitialMigration
dotnet ef database update
```

准备就绪，开始录制：

```bash
keploy record -c "dotnet run"
```

好了，魔法师！应用已经启动运行，现在让我们生成一些测试用例。魔法咒语是什么？就是发起一些API调用！可以使用Postman、Hoppscotch或经典的curl工具。

#### 生成测试用例

只需**发起一些API调用**就能生成测试用例。

**1. 创建用户**

```bash
curl -k -X POST -H "Content-Type: application/json" -d '{"name":"Sarthak Shnygle","age":23}' http://localhost:5249/api/user
```

返回响应：

```json
{
  "id": 1,
  "name": "Sarthak Shnygle",
  "age": 23
}
```

**2. 获取用户**

```bash
curl -k http://localhost:5249/api/user
```

返回OTP验证响应：

```json
[
  {
    "id": 1,
    "name": "Sarthak Shnygle",
    "age": 23
  }
]
```

给自己鼓个掌！通过这个简单的咒语，你已经创建了带模拟数据的测试用例。查看**Keploy目录**，你会在`test-1.yml`和`mocks.yml`中发现你的成果。

```yaml
version: api.keploy.io/v1beta1
kind: Http
name: test-1
spec:
  metadata: {}
  req:
    method: POST
    proto_major: 1
    proto_minor: 1
    url: http://localhost:5249/api/user
    header:
      Accept: "*/*"
      Content-Length: "37"
      Content-Type: application/json
      Host: localhost:5249
      User-Agent: curl/8.2.1
    body: '{"age":"23","name":"Sarthak Shnygle"}'
    body_type: ""
    timestamp: 2023-12-15T10:31:57.291484259Z
    host: ""
  resp:
    status_code: 201
    header:
      Content-Type: application/json; charset=utf-8
      Date: Fri, 15 Dec 2023 10:31:57 GMT
      Location: http://localhost:5249/api/User/3
      Server: Kestrel
    body: '{"id":3,"name":"Sarthak Shnygle","age":23}'
    body_type: ""
    status_message: ""
    proto_major: 0
    proto_minor: 0
    timestamp: 2023-12-15T10:31:59.566772512Z
  objects: []
  assertions:
    noise:
      body.age: []
      header.Date: []
  created: 1702636319
curl: |-
  curl --request POST \
    --url http://localhost:5249/api/user \
    --header 'Host: localhost:5249' \
    --header 'User-Agent: curl/8.2.1' \
    --header 'Accept: */*' \
    --header 'Content-Type: application/json' \
    --data '{"age":"23","name":"Sarthak Shnygle"}'
```

想验证一切是否如预期工作？

### 运行测试

是时候进行测试了 🧪

```shell
keploy test -c "dotnet run" --delay 10
```

> `--delay`参数？哦，这只是为了让你的应用在测试用例到来前有个小憩（单位：秒）。

最后建议？深入探索！尝试不同的API调用，修改`mocks.yml`中的数据库响应，或者调整`test-x.yml`中的请求或响应。再次运行测试，见证魔法发生！✨👩‍💻👨‍💻✨

### 总结 🎉

恭喜你完成这段旅程！你已经见识了Keploy的强大，锻炼了编码能力，还享受了一些乐趣！现在，继续去探索、创新和创造吧！记住，只要有合适的工具和一点乐趣，一切皆有可能。😊🚀

编程愉快！✨👩‍💻👨‍💻✨

如果仍有疑问，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>