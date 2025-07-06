---
id: why-keploy
title: 为什么选择Keploy？(v1.0.0)
sidebar_label: 为什么选择Keploy？
tags:
  - 说明
---

Keploy是一个开源的测试用例和数据模拟生成平台。以下是您应该使用Keploy的4个主要原因。

### 1. 依赖模拟

Keploy会记录精确的API调用，包括依赖数据。因此，如果您仍在为任何外部服务（如数据库、第三方供应商如stripe、twilio、razorpay、云服务等）编写数据模拟，Keploy将自动为这些服务创建模拟。

### 2. 自动断言

Keploy会自动比较实际和预期测试用例响应的所有属性，并将任何差异提醒给您。

### 3. 详细的测试报告

Keploy将在几分钟内用数千个测试用例测试应用程序的新版本，并生成即时报告和警报，确保您不会遗漏任何内容！

### 4. 简单的CI/CD集成

Keploy与原生测试库（如go-test、junit）有原生集成。代码覆盖率将通过现有测试用例加上Keploy记录的测试用例进行报告，并且不需要对CI/CD流水线进行任何更改即可集成。

![Keploy的与众不同之处](/img/difference.png)