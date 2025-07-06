---
id: self-healing-ai-api-tests
title: 自修复API测试
sidebar_label: 自修复API测试
description: 使用Keploy AI自动更新失败的API测试用例。
tags:
  - API测试
  - 测试自动化
  - AI测试
  - 自修复
  - 不稳定测试修复
keywords:
  - 修复失败测试
  - 修复测试用例
  - keploy ai测试
---

Keploy可以通过内置的AI引擎自动修复失败的测试用例。这在以下场景特别有用：

- API响应发生细微变化（例如新增字段、格式变更）
- 断言差异较小
- 需要批量修复大量测试而无需逐个编辑

### 🔧 如何使用自修复功能

1. **进入测试报告**

   - 导航至显示失败测试的测试报告页面。

2. **点击失败的测试**

   - 打开需要修复的具体失败测试用例。

3. **点击"Fix with AI"**

   - 这将触发Keploy AI根据当前API响应更新断言。

4. _(可选)_ **添加上下文**

   - 可以提供提示或预期结果，帮助AI更精准地进行修复。

5. _(可选)_ **批量修复**

   - 在**测试套件**页面，选择多个套件并点击**"Fix with AI"**，即可一次性修复所有测试。

6. **等待AI修复**

   - 该过程可能需要几秒钟完成。

7. **查看更新后的测试**
   - 重新访问**测试套件**页面查看修复后的测试。

### ✅ 最佳实践

- 在重大后端变更后使用AI修复功能
- 检查更新后的断言以确保正确性
- 结合测试去重功能保持测试套件整洁

[//]: # "更多内容可查阅[测试报告](/docs/running-keploy/review-and-improve-ai-generated-tests)或[运行测试](/docs/running-keploy/run-ai-generated-api-tests)。"