---
id: how-keploy-works
title: Keploy 工作原理 (v1.0.0)
sidebar_label: Keploy 工作原理
tags:
  - 技术解析
---

Keploy 作为中间件集成到您的应用中，用于捕获和重放来自任何源的所有网络交互。

### 第一步：将独特网络交互记录为测试用例

当您以记录模式启动应用时，Keploy 会捕获 API 调用并生成测试用例。

```bash
export KEPLOY_MODE="record"
```

此时，当应用处理 API 请求时，所有独特的网络交互都会作为测试用例存储在 Keploy 服务器中。

![工作原理](/gif/how-keploy-works.gif)

### 第二步：重放测试用例

假设您开发了新版本应用(v2)。要进行本地测试，请将 Keploy SDK 模式设置为测试模式后启动应用，以重放所有记录的 API 调用/测试用例。

```bash
export KEPLOY_MODE="test"
```

应用启动后：

- Keploy 将在 5 秒延迟（可配置的应用构建时间）后下载所有先前记录的测试用例/API 调用
- 当应用尝试与数据库、路由器或第三方服务等依赖项通信时，Keploy 会拦截请求并提供先前记录的依赖项响应

> **注意：** 此处无需搭建测试环境 🙅🏻‍♀️

- Keploy 会将 API 响应与先前捕获的响应进行对比，并在 Keploy 控制台生成测试报告

您可以在本地使用 Keploy 测试，也可以将其集成到主流测试框架或现有 CI 流水线中。

> **注意：** 您可以从已配置完整基础设施依赖的任何环境生成测试用例。建议首先在低流量环境中生成测试用例。针对高流量环境的去重功能目前处于实验阶段。

![工作原理](/gif/record-replay.gif)