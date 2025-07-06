---
id: api-testing-cicd
title: GitHub CI/CD 的 API 测试设置
sidebar_label: CI/CD 集成
description: 了解如何将 Keploy 的 AI 驱动 API 测试无缝集成到 GitHub Actions 实现持续测试。
tags:
  - API 测试
  - 测试自动化
  - AI 测试
  - CI 测试
  - 插件
  - CI 流水线
keywords:
  - 修复失败测试
  - CI 测试
  - CI/CD
  - GitHub
---

Keploy 让您在 GitHub 的 CI/CD 流水线中运行 API 测试变得极其简单。以下是分步指南，助您几分钟内完成设置！

## 步骤 1：从 Keploy 仪表板获取测试命令

1. 访问 [app.keploy.io](https://app.keploy.io)
2. 点击侧边栏中的 **Test Suite**

![测试套件页面](https://keploy-devrel.s3.us-west-2.amazonaws.com/testsuite-apitesting.png)

3. 您会看到“原生运行测试套件”选项

![原生运行按钮](https://keploy-devrel.s3.us-west-2.amazonaws.com/apitestsuites.png)

4. **复制命令**  
   ![复制命令](https://keploy-devrel.s3.us-west-2.amazonaws.com/apitesting-ci-cmd.png)

## 步骤 2：设置 GitHub Actions 工作流

在您的 `.github/workflows/ci.yml` 文件中添加以下步骤：

### 安装 Keploy CLI

```yaml
- name: Install Keploy CLI
  run: |
    curl --silent -L https://keploy.io/ent/install.sh | bash
```

### 运行 Keploy API 测试

在此处粘贴从仪表板复制的命令：

```yaml
- name: Run Keploy Test Suite
  run: |
    export KEPLOY_API_KEY=${{ secrets.KEPLOY_API_KEY }}
    keploy test-suite --app=03d24177-315c-4ee1-a3ac-64ed0ab38567 --base-path http://localhost:8080/books --cloud
```

### ⚠️ **注意**

别忘了将您的 `KEPLOY_API_KEY` 添加为 GitHub 密钥！
**前往仓库 → Settings → Security → Actions → _New Repository Secret_**

将 `--app` 和 `--base-path` 替换为 Keploy 仪表板中的实际值。

## 输出示例：实时测试执行日志

集成后，GitHub Actions 控制台中成功运行的示例如下：

```sh
🐰 Keploy: 运行测试套件	{"name": "Create and update one book verify other is unaffected via list"}
🐰 Keploy: 运行测试用例	{"name": "Create Book A"}
🐰 Keploy: 步骤通过	{"step": "Create Book A"}
...

+------------------------------------------+--------+-------+
| 测试用例                                | 状态   | 运行次数  |
+------------------------------------------+--------+-------+
| 仅含标题创建图书                        | 通过   |     1 |
| 使用无效进度创建图书                    | 通过   |     1 |
| 通过超大ID删除图书                      | 通过   |     1 |
| 通过无效ID格式更新图书                  | 通过   |     1 |
| ...                                      | ...    |  ...  |
+------------------------------------------+--------+-------+

测试套件执行摘要
总套件数:     122
通过套件数:    122
失败套件数:      0
```

## 大功告成！

仅需几行 YAML 代码，您就将 **AI 驱动的 API 测试自动化** 集成到了 GitHub CI 流水线中。现在每个 PR 或部署都将通过 Keploy 的智能测试引擎自动验证。

import GetSupport from '../concepts/support.md'

<GetSupport/>