---
id: what-is-keploy
title: 什么是Keploy？(v1.0.0)
sidebar_label: 什么是Keploy？
description: Keploy是面向开发者的端到端测试工具包，能够通过API调用生成测试用例。
tags:
  - 说明文档
keywords:
  - Junit
---

Keploy是面向开发者的功能测试工具包。
它通过记录真实的API调用，**为API生成端到端测试用例(KTests)**，同时创建**模拟对象或桩代码(KMocks)**。

KTests可以作为模拟对象被消费者导入，反之亦然。

![测试用例生成](/gif/record-tc.gif)

将KTests与单元测试库(如Go-Test、JUnit等)合并，可**追踪综合测试覆盖率**。

KMocks既可以在现有测试中引用，也能在任何场景使用(包括各类测试框架)。
KMocks还可作为服务端的测试用例。