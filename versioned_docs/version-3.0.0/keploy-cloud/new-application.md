---
id: application-settings
title: 在Keploy Cloud中添加新应用
sidebar_label: 添加应用 📝
tags:
  - 说明
  - 功能指南
  - keploy cloud
  - 添加应用
  - 新应用
  - 安装
keywords:
  - keploy cloud
  - 安装
  - API密钥
---

### 启动Keploy代理

在添加新应用或执行记录-回放操作前，请确保keploy代理正在运行。您可以通过以下命令启动代理：

```bash
keploy agent-start
```

现在代理已运行，让我们在Keploy Cloud中添加一个新应用。

### 步骤1：创建新应用

要将新应用添加到Keploy Cloud，您需要登录[Keploy控制台](https://app.keploy.io)并进入_新建应用_页面。

### 步骤2：添加应用设置工作流

现在让我们添加设置工作流。输入您的应用名称和应用设置工作流脚本。例如在上方截图中，您可以看到[Go示例应用](/docs/quickstart/samples-gin/)的设置工作流脚本。

<img src="/docs/img/keploy-cloud/keploy-cloud-new-app.png" alt="添加Keploy应用"/>.

### 步骤3：编辑Keploy配置

最后，编辑默认的[Keploy配置文件](/docs/running-keploy/configuration-file/)，点击_保存_按钮将应用添加到Keploy Cloud。

### 需要帮助？

如果您有任何问题或需要协助，我们的支持团队随时为您服务。您可以通过支持门户、Slack或发送邮件联系我们。