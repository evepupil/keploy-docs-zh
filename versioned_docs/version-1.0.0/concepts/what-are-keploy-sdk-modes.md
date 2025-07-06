---
id: what-are-keploy-sdk-modes
title: 理解 Keploy SDK 模式 (v1.0.0)
sidebar_label: Keploy SDK 模式
description: Keploy SDK 有三种模式 - 关闭、录制和测试模式。它是一个特定语言的库，用于捕获和重放 API 调用及后续的网络交互。本页解释了 SDK 的不同模式。
tags:
  - 说明
  - sdk
keywords:
  - SDK
---

### SDK 模式

Keploy SDK 模式可以通过设置 `KEPLOY_MODE` 环境变量来切换。共有 3 种 Keploy SDK 模式：

1. **关闭模式** : 在此模式下，Keploy SDK 将关闭 Keploy 平台提供的所有功能。

```
export KEPLOY_MODE="off"
```

2. **录制模式** :
   - 记录请求、响应及所有外部调用，并发送至 Keploy 服务器。
   - Keploy 服务器去重后，会再次运行 API 请求以识别噪声字段。
   - 将噪声字段发送至 Keploy 服务器，与测试用例一并保存。

```
export KEPLOY_MODE="record"
```

3. **测试模式** :
   - 从 Keploy 服务器获取应用的测试用例。
   - 使用测试用例中的相同请求负载调用 API。
   - 根据测试用例中存储的数据模拟外部调用。
   - 验证响应并将结果上传至 Keploy 服务器。

```
export KEPLOY_MODE="test"
```