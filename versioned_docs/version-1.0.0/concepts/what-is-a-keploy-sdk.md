---
id: what-is-keploy-sdk
title: 什么是 Keploy SDK (v1.0.0)
sidebar_label: Keploy SDK
description: Keploy SDK 是一个特定语言的库，用于捕获和重放 API 调用及后续的网络交互。
tags:
  - explanation
  - sdk
keywords:
  - SDK
  - 测试 API
---

Keploy SDK 是一个特定语言的库，提供以下功能的 API：

1. 捕获所有网络调用，例如：

   - API 请求
   - 依赖调用
   - API 响应

2. 使用捕获的依赖模拟重放 API 请求，以识别噪声字段。
3. 重放所有捕获的测试用例，并为应用程序模拟依赖项

API 调用的预期响应与实际响应的比较发生在 [Keploy 服务器](/docs/1.0.0/go/installation)。

Keploy SDK 在测试 API 时模拟外部依赖项，无需设置测试环境。
这使得应用程序能够与外部依赖项隔离。