---
id: generate-api-tests-using-ai
title: 使用AI生成API测试
sidebar_label: 生成API测试
description: 学习如何使用Keploy的API测试生成器，通过OpenAPI、curl、Postman或流量数据，利用AI生成高质量的API测试套件。
---

本指南将帮助您通过提供结构化输入（如OpenAPI规范、curl命令、Postman集合或实时端点），使用Keploy基于AI的测试引擎生成自动化API测试。

> 👉 如果您希望通过浏览器与Web应用交互来记录API流程，请遵循此指南：通过Chrome扩展记录API测试

## 快速开始

- 访问 [Keploy控制台](https://app.keploy.io/api-testing/generate)
- 上传您的API输入（模式、集合或curl命令）
- 👊 点击**生成测试**，Keploy将解析您的输入，调用API，并生成带有基于响应的断言的已验证测试流程。
- 如果检测到私有端点，请按照代理设置提示操作
- 查看并编辑生成的测试

## ⚠️ 私有端点API警告

如果您的API不可公开访问，Keploy在尝试访问这些端点时将显示警告。**解决方法**是在本地安装Keploy Agent代理。

### Keploy Agent安装指南

| 平台      | 步骤                                                                                                                                                                                                                                                                      |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **macOS** | - [下载](https://keploy-enterprise.s3.us-west-2.amazonaws.com/releases/latest/Keploy+Agent.dmg) <br /><br /> - 打开`.dmg`文件并正常安装应用。 <br /><br /> - 安装后启动Keploy Agent。 <br />                                                                               |
| **Linux** | - 在终端中运行以下命令： <br /><br /> `curl --silent -O -L https://keploy.io/ent/install.sh` <br /><br /> `chmod +x ./install.sh` <br /><br /> `source ./install.sh` <br /><br /> - 使用以下命令验证安装： `keploy-agent` <br />                                          |
| **Windows** | - [下载](https://keploy-enterprise.s3.us-west-2.amazonaws.com/releases/latest/keploy-agent-windows_amd64.zip)并运行 <br /><br /> `cd $env:USERPROFILE/Downloads` <br /><br /> `tar -xvf '.\keploy-agent-windows_amd64.zip'` <br /><br /> `.\keploy-agent.exe` <br /> |

> ✅ 安装并运行后，返回Keploy控制台并点击**生成API测试**。代理将安全地代理您的本地API以允许生成测试。

## 最佳实践以获得最佳测试输出

| 输入类型               | 建议                                                              |
| --------------------- | ----------------------------------------------------------------- |
| OpenAPI规范/Swagger文档 | 使用OpenAPI v3，最好也包含链接                                     |
| Postman集合           | 导出Postman集合并将JSON复制到Keploy控制台                          |
| `curl`命令            | 提供3-4个有效的（2xx）curl命令及其响应                              |
| 仅实时端点            | 确保提供有效且可测试的API基础URL                                   |

### 有效与无效URL示例

使用**API基础路径**，而非主页或静态资源，以生成测试流程。

| URL示例                              |     | 优劣原因                                     |
| ------------------------------------ | --- | -------------------------------------------- |
| `https://api.example.com`            | ✅  | API子域名 — 通用且可测试                     |
| `https://example.com/api`            | ✅  | API路径 — 适用于多个端点                     |
| `https://example.com/api/v2`         | ✅  | 版本化API路由                                |
| `https://example.com/v2/orders`      | ✅  | 特定API组 — 稳定路径                         |
| `https://example.com`                | ❌  | 主页 — 非API                                 |
| `https://example.com/index.html`     | ❌  | 静态文件 — 对API测试无用                     |
| `https://api.example.com/orders/126789` | ❌  | 过于具体 — 单一对象，不通用                  |

> ⚠️ 避免使用指向静态资源或深层嵌套对象的URL。

## Keploy生成的内容

每个生成的测试将包含：

- ✅ API请求 + 实际响应
- ✅ 对状态、正文和头部的断言
- ✅ 多步骤流程生成（如POST → GET → DELETE）
- ✅ 自动测试去重
- ✅ 环境可重用性（用于暂存、QA或CI）
- ✅ 可标记、可编辑且可从仪表板共享

[//]: # "## 后续步骤"
[//]: #
[//]: # "- 👉 [运行生成的测试](/docs/running-keploy/run-ai-generated-api-tests)"
[//]: # "- 🔁 [API变更的自愈](/docs/running-keploy/self-healing-ai-api-tests)"
[//]: # "- 🧹 [审查、清理和改进测试流程](/docs/running-keploy/review-and-improve-ai-generated-tests)"
[//]: # "- 🤝 [与团队共享测试和测试报告](/docs/running-keploy/share-tests)"
[//]: # "- 🚀 [将测试集成到CI/CD流水线中](/docs/running-keploy/ci-cd-ai-gen-api-tests)"