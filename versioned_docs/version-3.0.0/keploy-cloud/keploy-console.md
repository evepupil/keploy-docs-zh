---
id: keploy-console
title: Keploy 控制台 📘
sidebar_label: Keploy 控制台 🛠️
tags:
  - 说明文档
  - 功能指南
  - keploy 控制台
  - 安装指南
keywords:
  - keploy 控制台
  - 安装指南
  - API密钥
---

### 前提条件 📝

确保已[安装 keploy 企业版](/docs/keploy-cloud/cloud-installation/#installation-%EF%B8%8F)。

### 本地运行测试 ⌛️

在启动控制台前，请先在本地运行测试用例。

```bash
keploy test -c "<运行应用的命令>"
```

<img src="/docs/img/keploy-cloud/console-test-run.png?raw=true" alt="Keploy 测试运行"/>

让我们看看哪些测试失败了并进行修复。

### 启动 Keploy 控制台 📈

- 要基于测试结果可视化并编辑测试用例，请启动控制台。
  <br/>
  ```bash
  keploy console
  ```
    <br/>
    <img src="/docs/img/keploy-cloud/keploy-console-cmd.png?raw=true" alt="Keploy 控制台"/>

<br/>

- 在 [keploy 云平台](https://app.keploy.io) 上选择您的应用，并导航至 **最新** 的测试报告。

    <br/>
    <img src="/docs/img/keploy-cloud/test-reports.png?raw=true" alt="Keploy UI 控制台"/>

- 选择 **最新** 的测试报告进行编辑。

## 测试报告操作 🛠️

使用 keploy 控制台在本地编辑测试用例。

- 🎧 标记噪声字段
- 📝 更新预期测试结果
- 🚫 忽略测试
- ♻️ 重新录制测试套件
- 🗑️ 删除测试报告

<img src="/docs/img/keploy-cloud/test-operations.png?raw=true" alt="Keploy 测试菜单对话框"/>

> ✍️ 注意：只能通过编辑最新的测试报告来进行更改。

### 添加/移除噪声字段

噪声字段在测试用例运行时会被忽略断言。例如，`Date` 和 `Content-Length` 是两个可能随每次请求变化的头部字段。我们可以将这些字段标记为噪声。

<img src="/docs/img/keploy-cloud/noise.png?raw=true" alt="噪声"/>

您将在本地的测试用例文件中看到更改，新的噪声字段会被添加到测试用例的 noise 参数下。

<img src="/docs/img/keploy-cloud/denoise.png?raw=true" alt="去噪"/>

### 标准化测试报告或测试用例

同样，如果测试用例的结果是新的预期响应，我们可以标准化整个测试报告或特定的测试用例。这将更新本地测试用例的预期结果。

## 需要帮助？

如果您有任何问题或需要协助，我们的支持团队随时为您服务。您可以通过我们的支持门户、Slack 或发送邮件联系我们。