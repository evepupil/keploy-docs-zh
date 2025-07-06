---
id: what-are-keploy-features
title: Keploy 功能特性
sidebar_label: Keploy 功能特性
description: Keploy 平台能自动模拟应用依赖项并安全回放写入操作，具备精确的噪声检测和统计去重能力。
tags:
  - 功能说明
  - Keploy 特性
  - 功能
  - 记录回放测试
  - 模拟变异
keywords:
  - 测试用例
  - 数据转储
  - Keploy 特性
  - 功能
  - 记录回放测试
  - 模拟变异
---

## 核心特性

Keploy 设计用于多样化场景，以下是使其在测试平台中脱颖而出的关键特性：

## 🧩 CI/CD 中的组合测试覆盖率：

#### 在任意环境运行带模拟的测试

Keploy 与单元测试库（如 `go-test`、`jUnit`、`jest`、`pyTest`）具有[原生集成](/concepts/general-glossary.md#4-interoperability），可提供组合测试覆盖率，并能轻松集成到现有 CI 流水线中。

<img src="/docs/gif/replay-tc.gif?raw=true" alt="Keploy 与测试库集成" width="80%"/>

支持在**本地 CLI**、**CI 流水线**或**Kubernetes 集群**中运行带模拟的测试，真正实现随处测试！🌍

## 📽️ 支持复杂 API 流程

#### 轻松记录复杂 API 流程并回放为测试桩

Keploy 能无缝记录分布式 API 流程，并将其作为模拟桩回放，犹如为测试配备时间机器！⏳

它会记录应用处理的所有 API 调用及后续网络流量。您可以使用 [Postman](https://www.postman.com/) 或 [Curl](https://curl.se/) 等工具生成测试用例。

Keploy 自动为**所有 CRUD 操作**[模拟](/concepts/general-glossary.md#1-api-data-mocking)网络/外部依赖的正确响应。

<img src="/docs/gif/record-replay.gif?raw=true" width="80%" alt="API 工具"/>

记录后，您可在本地或 CI 环境中回放带变异/写入调用的流程，无需连接外部服务。

从此不再需要为数据库、内部服务或第三方服务（如 twilio、shopify、stripe）准备数据转储或模拟桩。💡

<img src="/docs/img/mock-dependencies.png?raw=true" width="50%" alt="模拟应用依赖" style={{backgroundColor: '#EDEDED'}}/>

应用中也**无需**[幂等性](/concepts/general-glossary.md#2-idempotency)保证，写入后的多次读取操作可自动复现。🔄

## ♻️ 多用途模拟桩

#### 复用模拟桩测试服务端

Keploy 生成的依赖模拟桩也可作为服务端测试用例，适用于混沌测试、端到端测试、集成测试、API 及回归测试等场景。🌟

## 🌐 无代码 EBPF 插桩

#### 网络层集成实现轻量化

Keploy 使用 EBPF 技术实现无代码、语言无关的轻量级集成。🍲

## 🔍 精确噪声检测

#### 消除断言中的随机字段

Keploy 能准确识别响应中的[噪声字段](/concepts/general-glossary.md#3-noisy-field)（如时间戳、随机值），确保测试高质量。

当应用响应 API 时，Keploy 会用捕获的依赖模拟重新运行该请求。

它会标记 API 响应中的差异字段为随机/噪声字段。🧐✅

如有其他问题，欢迎联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>