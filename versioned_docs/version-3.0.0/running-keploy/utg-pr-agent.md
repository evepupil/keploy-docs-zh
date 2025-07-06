---
id: utg-pr-agent
title: Keploy PR智能助手
sidebar_label: PR智能助手
description: 本文档记录Keploy单元测试生成器PR智能助手的使用场景
tags:
  - utg
  - 单元测试生成器
  - 单元测试生成器PR智能助手
  - 生成单元测试
  - 单元测试
keywords:
  - 单元测试生成器
  - 单元测试
  - 文档
  - 测试用例
  - AI测试
  - Gemini
  - OpenAI
---

> **通过智能化的自动单元测试生成彻底改变代码审查流程，确保每个PR都具备全面的测试覆盖率。**

Keploy的**PR智能助手**是一款革命性的GitHub应用，它能无缝集成到您的拉取请求工作流中，自动为每次代码变更生成高质量的单元测试。通过将智能测试生成直接嵌入GitHub PR流程，该工具消除了手动测试负担，确保优质代码与全面测试**在生产环境前**就已同步就绪。

## **快速设置指南**

按照以下步骤在GitHub仓库启用Keploy PR智能助手：

### 第一步：安装Keploy GitHub应用

- 访问[Github应用市场](https://github.com/marketplace/keploy)

<img src="https://res.cloudinary.com/dfhtr1rwo/image/upload/v1748777663/keploy-marketplace_lwiaoz.png" width="100%" />

点击**添加**。

选择：

- 指定要启用PR智能助手的**特定仓库**，或
- 选择**所有仓库**以在整个GitHub组织中启用该功能
- 授权应用完成安装
  <!-- 此处将添加仓库配置的小截图 -->
  <img src="https://res.cloudinary.com/dqwbkjfuh/image/upload/v1747914670/Screenshot_2025-05-22_at_2.50.17_PM_okdxc8.png" width="100%" />

### 第二步：提交代码变更并创建拉取请求

应用安装完成后：

- 在仓库中进行任意代码修改
- 推送变更并照常**创建拉取请求(PR)**
- **Keploy PR智能助手**将自动检测变更并在PR中留下评论
  <!-- 此处将添加Keploy PR智能助手在代码中评论的图片 -->
  <img src="https://res.cloudinary.com/dqwbkjfuh/image/upload/v1747914669/Screenshot_2025-05-22_at_3.21.05_PM_uzeewc.png" width="100%" />

### 第三步：触发单元测试生成

在Keploy的PR评论中：

- 点击链接
- 您将被重定向至Keploy服务，单元测试生成流程随即启动
- PR智能助手利用代码语义和LLM的强大能力来理解您的代码变更，生成有意义的单元测试
  <!-- 此处将添加API服务器生成测试用例的截图 -->
  <img src="https://res.cloudinary.com/dqwbkjfuh/image/upload/v1747914670/Screenshot_2025-05-22_at_3.23.40_PM_emluya.png" width="100%" />

### 第四步：查看生成的测试和摘要

流程完成后：

- 点击**"返回PR"**
- PR评论将更新包含：
  - 为本次变更生成的所有**单元测试文件**
  - 以**清晰表格形式**呈现的**测试摘要**，包括： - 文件名 - 测试用例数量 - 覆盖率详情 - 处理的边界情况（如有）
    <!-- 此处将添加包含测试摘要表格的评论截图 -->
    <img src="https://res.cloudinary.com/dqwbkjfuh/image/upload/v1747914671/Screenshot_2025-05-22_at_3.30.35_PM_mubqr5.png" width="100%" />
    您可以审查、修改或直接合并PR，完全确信您的变更已通过充分测试。
    有了Keploy PR智能助手，测试不再是瓶颈——它已内置于您的工作流中。

## **立即开始体验**

准备好将您的拉取请求工作流从潜在的质量瓶颈转变为质量放大器了吗？立即安装Keploy PR智能助手，体验协同开发的未来。

### **后续步骤：**

1. **10秒内安装PR智能助手**
2. **创建测试PR**查看实际效果
3. **在下一个代码审查周期**中体验变革

_提升您的开发工作流。让每个拉取请求都成为质量检查点。_

import GetSupport from '../concepts/support.md'

<GetSupport/>