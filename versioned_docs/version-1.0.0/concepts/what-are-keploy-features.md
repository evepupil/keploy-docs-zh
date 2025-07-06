---
id: what-are-keploy-features
title: 了解 Keploy 功能特性 (v1.0.0)
sidebar_label: Keploy 功能
description: 了解 Keploy 的核心功能，包括自动模拟应用程序依赖项、安全写入重放、精确噪声检测和统计数据去重。
tags:
  - 说明
keywords:
  - 测试用例
  - 数据转储
---

### 1. 将任意来源的 API 调用转换为测试用例

Keploy 会捕获应用程序处理的所有 API 调用及后续网络流量。您可以使用任何现有的 API 管理工具（如 [Postman](https://www.postman.com/)、[Curl](https://curl.se/)）来生成测试用例。

<img src="/docs/img/record-api.gif?raw=true" width="80%" alt="API 工具"/>

### 2. 自动模拟数据变更

Keploy 能自动为 **所有 CRUD 操作** [模拟](/concepts/general-glossary.md#1-api-data-mocking) 网络/外部依赖项的正确响应。

不再需要为数据库、内部服务或第三方服务（如 twilio、shopify 或 stripe）准备数据转储、桩代码或模拟对象。

<img src="/docs/img/mock-dependencies.png?raw=true" width="50%" alt="模拟应用程序依赖项"/>

请查看 [Go、Java 和 Node](https://keploy.io/#integrations) 中当前支持的依赖项列表。

Keploy 可以通过从本地或其他环境捕获数据，安全地重放写入或变更操作，而无需 API 链式调用。

<img src="/docs/gif/record-replay.gif?raw=true" width="80%" alt="API 工具"/>

应用程序中也 **不需要** 保证 [幂等性](/concepts/general-glossary.md#2-idempotency)。写入操作后的多次读取也能自动复现。

### 3. 精确的噪声检测

Keploy 能准确识别响应中的 [噪声字段](/concepts/general-glossary.md#3-noisy-field)（如时间戳、随机值），确保生成高质量的测试。

当应用程序处理 API 请求时，Keploy 会使用捕获的依赖项模拟重新运行该 API 请求。

[//]: # '<img src="/docs/img/noise-filtration.png?raw=true" alt="Keploy 噪声过滤"/>'

Keploy 会比较 API 请求的响应是否一致。如果 API 响应的任何字段不同，它们将被标记为随机/非确定性字段。

### 4. 原生互操作性

Keploy 与主流测试库（如 `go-test`、`jUnit`、`jest`）具有 [原生集成](/concepts/general-glossary.md#4-interoperability) 能力。
代码覆盖率报告将包含现有测试用例和 Keploy 记录的测试用例，并能轻松集成到现有 CI 流水线中。

<img src="/docs/gif/replay-tc.gif?raw=true" alt="Keploy 与测试库的集成"/>

### 5. 便捷的新库集成框架

Keploy 提供检测/集成框架，只需约 100 行代码即可轻松添加新的库/驱动程序。
请查看 [贡献指南](versioned_docs\version-1.0.0\devtools\sdk-contrib-guide.md)。