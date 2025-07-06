---
id: record-operations
title: 使用Keploy记录模式(v1.0.0)录制API调用
description: Keploy记录模式指南 - 录制API调用
sidebar_label: 记录模式
tags:
  - 操作指南
  - 记录模式
---

> 注意：测试用例默认会以文件形式导出到项目目录中

要将API调用录制为测试用例，请将环境变量`KEPLOY_MODE`设置为`record`。

```
export KEPLOY_MODE="record"
```

就这样！🔥 当您向应用程序发起API调用时，新的测试用例将在`keploy-tests`目录中本地生成。

>> 测试目录路径(`KEPLOY_TEST_PATH`)是可配置的。

![录制测试和模拟](/gif/record-tc.gif "录制测试和模拟")

>> 模拟目录路径(`KEPLOY_MOCK_PATH`)是可配置的。