---
id: record-operations
title: 记录模式操作
description: Keploy 记录模式指南
sidebar_label: 记录模式
tags:
  - 操作指南
  - 记录模式
---

> 注意：测试用例默认会导出为项目目录中的文件

要将 API 调用记录为测试用例，请将环境变量 `KEPLOY_MODE` 设置为 `record`。

```shell
export KEPLOY_MODE="record"
```

就这样！🔥 当您向应用程序发起 API 调用时，新的测试用例将在 `keploy-tests` 目录中本地生成。

> > 测试目录路径 (`KEPLOY_TEST_PATH`) 是可配置的。

![记录测试和模拟](/gif/record-tc.gif "记录测试和模拟")

> > 模拟目录路径 (`KEPLOY_MOCK_PATH`) 是可配置的。