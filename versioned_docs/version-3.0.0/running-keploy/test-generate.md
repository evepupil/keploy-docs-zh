---
id: test-generate
title: 什么是API测试？
sidebar_label: 生成测试用例
description: 本节文档介绍API测试的概念及其必要性
tags:
  - API测试
  - API模拟
  - 生成测试用例
  - 测试自动化
keywords:
  - api测试
  - api模拟
  - 自动化测试
  - 人工智能测试
  - keploy
  - Gemini
  - OpenAI
---

# 🧪 基于AI的API测试套件生成

Keploy允许您利用AI，基于实时请求、API模式和支持文档，自动为应用程序生成**全面的API测试套件**。

## 🚀 4步创建API测试

### 1️⃣ 创建新应用

首先为您的应用程序创建一个新的测试项目：

- 点击**"创建新应用"**
- 为它命名（建议与您的应用/模块名称匹配）
- 可选添加描述信息

### 2️⃣ 输入URL或端点

提供您想要测试的基础URL或特定API端点：

这有助于Keploy识别API请求的发送目标，并启动基于上下文的测试生成。

### 3️⃣ 添加测试输入

#### 🔐 认证信息（可选）

如果您的API需要认证，请确保：

- 在请求头中添加API密钥或Bearer令牌
- 或者通过下方的测试输入包含认证流程

#### 📎 粘贴cURL片段 _(推荐3–5条)_

添加代表真实用户流程的有效`curl`命令。这些命令将帮助AI推断请求类型、负载和预期结果。

```bash
curl -X POST https://your-api.com/login -d 'username=john&password=secret'

curl -X GET https://your-api.com/users

curl -X PUT https://your-api.com/users/1 -d 'username=john&role=admin'
```

### 📄 Swagger/OpenAPI模式

以**YAML**或**JSON**格式粘贴您的OpenAPI（Swagger）规范。  
此模式提供了端点行为的契约，支持基于模式的精确测试生成。

### 4️⃣ 上传辅助资源（可选但很有价值）

通过上传以下文档提高测试准确性：

- 🧾 **API文档**（Postman集合、Swagger文件）
- 💻 **代码片段**
- 📄 **产品需求文档/业务需求文档**
- 🗂 **功能简介或需求文档**

这些资源有助于Keploy更好地理解每个端点的预期逻辑和行为。