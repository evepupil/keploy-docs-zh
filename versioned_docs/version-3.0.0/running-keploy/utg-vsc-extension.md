---
id: utg-vscode-extension
title: Keploy的VS Code扩展
sidebar_label: VS Code扩展
description: 本文档介绍Keploy基于AI的单元测试VS Code扩展的使用场景
tags:
  - utg
  - 单元测试生成器
  - 单元测试生成器PR代理
  - 生成单元测试
  - 单元测试
keywords:
  - 单元测试生成器
  - 单元测试
  - 测试用例
  - 文档
  - AI测试
  - Gemini
  - OpenAI
---

> **将您的IDE转变为测试利器。一键生成全面、智能的单元测试——全球50万+开发者的共同选择。**

**Keploy单元测试生成器VS Code扩展**通过将无缝的AI驱动测试生成直接带入您最爱的IDE，彻底改变了开发者的测试方式。无论您是在构建新功能、调试复杂问题还是重构遗留代码，都能在不离开开发环境的情况下立即生成生产就绪的单元测试。

## **为何50万+开发者选择Keploy**

### **即时提升生产力**

- **一键生成**：数秒内将任何函数转换为完整的测试套件
- **零上下文切换**：无需打开外部工具，保持IDE工作流
- **智能分析**：AI理解代码业务逻辑并生成相关测试场景

### **企业级质量**

- **LLM驱动智能**：采用GPT-4o和先进语言模型提供卓越测试质量
- **框架无关**：完美兼容Jest、Mocha、JUnit、pytest等主流框架
- **生产就绪**：生成的测试遵循行业最佳实践和项目规范

## **简单三步生成测试**

### 1. 安装扩展

您可以通过以下任一方式安装Keploy扩展：

**方法1：通过VS Code应用市场**

- 打开VS Code的**扩展**选项卡
- 搜索**"Keploy"**
- 点击**安装**

<!-- vs code扩展搜索截图 -->
<img src="https://res.cloudinary.com/dqwbkjfuh/image/upload/v1747914670/Screenshot_2025-05-22_at_4.50.03_PM_o97dfi.png" width="100%" />

**方法2：直接链接/VS Code应用市场**

- 访问[VS Code应用市场](https://marketplace.visualstudio.com/items?itemName=Keploy.keployio)
- 点击**安装**并按提示在VS Code中打开

<!-- vs code应用市场截图 -->
<img src="https://res.cloudinary.com/dqwbkjfuh/image/upload/v1747914670/Screenshot_2025-05-22_at_4.51.22_PM_qytvhv.png" width="100%" />

### 2. 一键生成单元测试

安装扩展后：

1. 在VS Code的**活动栏**(左侧边栏)找到**Keploy图标**
2. 点击**Keploy图标**打开扩展界面
3. 您将看到标有**"生成单元测试"**的简单界面
4. 点击按钮——搞定！
   <!-- 设计素材图片 -->
   <img src="https://res.cloudinary.com/dqwbkjfuh/image/upload/v1747915233/Group_33518_1_usvh0v.png" width="100%" />

Keploy将分析代码库并自动生成所有相关单元测试文件，涵盖：

- 核心逻辑
- 边界情况
- 异常条件
- 以及其他场景——全部包含有意义的断言和清晰的测试结构

## 生成后会发生什么？

点击**生成单元测试**后，Keploy将：

- 通过代码语义解析和理解源代码
- 在现有代码旁创建相关测试文件(根据配置在测试目录或源码旁)
- 提供完整的测试覆盖率，几乎无需样板代码

<!-- 设计素材图片 -->
<img src="https://res.cloudinary.com/dqwbkjfuh/image/upload/v1747915360/Frame_3_vuizpr.png" width="100%" />

所有测试都具备：

- 可读性
- 可维护性
- 可直接用您偏好的测试运行器(如Jest、Mocha等)运行

## **智能输出管理**

### **智能目录结构**

生成的测试按最佳实践组织：

```
your-project/
├── src/
│   └── utils/
│       └── calculator.js
└── tests/
    └── utils/
        └── calculator.test.js
```

## **立即开始**

别让测试拖慢您的开发速度。使用Keploy的AI驱动VS Code扩展，全面的测试覆盖率只需一键。

### **快速入门：**

1. **[从VS Code应用市场安装 →](https://marketplace.visualstudio.com/items?itemName=Keploy.keployio)**
2. **打开您喜爱的项目**并选择函数
3. **点击"生成单元测试"**体验神奇
4. **见证测试覆盖率飙升**同时保持开发速度

_改造您的IDE。提升代码质量。加入50万+开发者，用Keploy构建更好的软件。_

import GetSupport from '../concepts/support.md'

<GetSupport/>