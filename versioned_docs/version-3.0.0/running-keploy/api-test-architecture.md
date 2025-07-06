---
id: api-test-architecture
title: 幕后揭秘
sidebar_label: 幕后揭秘
description: Keploy如何将您的API规范和请求即时转化为边界用例测试。
tags:
  - API测试
  - 架构
  - OpenAPI
  - curl
---

# 🛠️ API测试架构

通过Keploy，从API规范到真实的生产级测试用例——**瞬间完成！**  
以下是我们的底层架构工作原理。

![Keploy API测试架构](https://res.cloudinary.com/dfhtr1rwo/image/upload/v1748784682/keploy-api-arch_i3hjco.png)

> _从Schema到cURL请求，自动生成边界用例测试、通过/失败追踪及详细差异报告。_

## 📋 开始前的准备条件

Keploy的API测试支持**任意语言开发的应用程序**。  
为了生成最有价值且精确的测试用例，您需要：

### 1. 上传OpenAPI规范（Swagger）

_为什么？_  
这为Keploy提供了API端点的详细路线图，使测试生成更智能精准。

### 2. 导入cURL命令

_为什么？_  
真实的cURL请求能展示API的实际使用场景，覆盖正向、负向及边界用例。

### 3. 确保应用可公开访问（推荐Ngrok）

_为什么？_  
Keploy需要与实时API端点交互来生成验证测试。即使本地应用，Ngrok等工具也能轻松实现。

## ⚡ Keploy如何将输入转化为API测试

- 上传OpenAPI规范、API文档及cURL请求
- Keploy自动分析生成边界测试用例，覆盖正向/负向/中性场景
- 自动执行测试并显示差异报告，即时发现问题
- 结果一目了然：通过项、失败项及待修复项

立即体验：[app.keploy.io](https://app.keploy.io)

仍有疑问？[联系团队](mailto:support@keploy.io)