---
id: test-operations
title: 测试模式操作指南
description: Keploy 测试模式使用指南
sidebar_label: 测试
tags:
  - 操作指南
  - 测试
  - 回放测试
---

运行 KTests 和 KMocks 可采用以下任一方法：

### 方法一

<details><summary>
设置环境变量 `KEPLOY_MODE`

</summary>

```shell
export KEPLOY_MODE="test"
```

运行应用程序后，测试报告摘要将显示在 Keploy 服务器日志中，详细测试报告会生成在 Keploy 服务器运行目录下。

![测试报告摘要](/gif/replay-tc.gif)

</details>