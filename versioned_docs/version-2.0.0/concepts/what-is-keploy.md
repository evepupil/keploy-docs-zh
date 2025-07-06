---
id: what-is-keploy
title: 什么是Keploy？
sidebar_label: Keploy简介
description: Keploy是一个开源的后端测试工具包，能够通过用户流量快速生成测试用例和模拟对象，速度远超单元测试。
tags:
  - 说明
  - 简介
  - 特性
  - 什么是keploy
keywords:
  - Junit
  - PyTest
  - GoTest
  - Jest
  - 后端测试
  - 开源
  - API测试
  - AI生成测试
---

Keploy通过记录应用程序网络调用，创建带有**内置模拟对象**或桩的**后端API测试**，不仅使测试过程比单元测试更快，而且极其高效。

<img src="/docs/gif/record-tc.gif" alt="测试用例生成器" width="80%" height="150" />

Keploy作为应用程序中的代理，捕获并重放所有来自任何源头的网络交互。

### 第一步：将独特网络交互记录为测试用例

当您以记录模式启动应用程序时，Keploy会将API调用捕获为测试用例。

此时，应用程序服务的所有独特网络交互都会作为测试用例存储在Keploy服务器中。

<div style={{backgroundColor:'white', padding:'10px', display:'inline-block', borderRadius:'8px'}}>
  <img src="/docs/gif/how-keploy-works.gif" alt="测试用例生成器" />
</div>

### 第二步：重放测试用例

假设您开发了新版本应用程序(v2)。要在本地测试，启动Keploy的测试模式来重放之前记录的所有API调用/测试用例。

当应用程序启动时：

- Keploy会以5秒延迟（可配置的应用程序构建时间）下载所有之前记录的测试用例/API调用
- 当应用程序尝试与任何依赖项（如数据库、路由器、供应商服务）通信时，Keploy会拦截并提供之前记录的依赖响应

> **注意：** _这里您不需要搭建测试环境。🙅🏻‍♀️_

- Keploy会将API响应与之前捕获的响应进行比较，并在Keploy控制台生成测试报告

您可以在本地使用Keploy测试，也可以将其与流行的测试框架和现有CI流水线集成。

> **注意：** 您可以从任何已设置完整基础设施依赖的环境生成测试用例。建议首先在低流量环境中使用此功能生成测试。目前针对高流量环境所需的去重功能仍处于实验阶段。

希望这些信息对您有所帮助，如果仍有疑问，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>