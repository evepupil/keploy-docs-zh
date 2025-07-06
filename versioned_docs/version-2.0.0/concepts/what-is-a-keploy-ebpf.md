---
id: what-is-keploy-ebpf
title: 什么是Keploy eBPF
sidebar_label: Keploy eBPF
description: Keploy eBPF是一个与语言无关的库，用于捕获和重放API调用及后续网络交互。
tags:
  - explanation
  - ebpf
keywords:
  - ebpf
  - API测试
---

Keploy eBPF是一个与语言无关的库，提供以下功能的API：

1. 捕获所有网络调用，例如：

   - API请求
   - 依赖调用
   - API响应

2. 使用捕获的依赖模拟重放API请求，以识别噪声字段。
3. 重放所有捕获的测试用例，并为应用程序模拟依赖项

API调用的预期响应与实际响应的比较在Keploy服务器上进行。

Keploy eBPF在测试API时模拟外部依赖项，无需设置测试环境。这使得应用程序能够与外部依赖项隔离。

希望这对您有所帮助，如果仍有疑问，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>