---
id: cloud-installation
title: Keploy Cloud 安装指南
sidebar_label: 安装指南 🛠️
tags:
  - 说明文档
  - 功能指南
  - keploy cloud
  - 安装
keywords:
  - keploy cloud
  - 安装
  - API密钥
---

## 介绍 📘

#### 欢迎使用 Keploy Cloud 指南！

本指南将为您提供关于 Keploy Cloud 的注册流程、功能特性及使用方法的详细信息。

#### 申请 Keploy Cloud 账户

请填写[申请表](https://forms.gle/jGBbyRyh9H7AKXZX6)申请 Keploy Cloud 账户。我们的团队将在审核后尽快与您联系。

#### 开始使用 Keploy Cloud

账户开通后，您可以立即体验 Keploy Cloud 的核心功能：

- **时间冻结** ❄️：允许在每次测试运行时将时间回滚至测试用例录制时刻，确保时间敏感对象不会过期或改变，使测试结果保持一致性。

- **AI驱动测试生成** 🧠：自动发现API边界条件并生成测试用例，覆盖更多代码路径，提升测试覆盖率。

- **测试去重** 📊：自动检测重复/冗余测试，特别适用于从生产环境录制大量场景时保留唯一性测试。

- **控制台面板** 📈：提供可视化错误追踪功能，支持团队报告共享。

- **异步流程支持** ⏱：V2版本有效捕获和回放异步任务，同时支持自定义断言行为。

- **模拟注册表** 📂：通过云存储管理大型模拟文件，避免大文件提交至Git仓库，优化存储性能与开发流程。

开始使用前，您需要安装 Keploy Cloud 代理并完成账户认证。

import PlatformRequirements from '../concepts/platform-requirements.md'

<PlatformRequirements/>

## 安装指南 🛠️

按以下步骤安装并验证 Keploy Cloud 代理：

```bash
curl --silent -O -L https://keploy.io/ent/install.sh && source install.sh
```

出现提示时输入**API密钥**，如密钥遗失请联系组织管理员重新生成。

验证通过后，即可开始使用 Keploy Cloud 进行测试录制。

### 获取帮助

如有疑问或需要技术支持，您可以通过支持门户、Slack或发送邮件至hello[at]keploy.io联系我们的支持团队。