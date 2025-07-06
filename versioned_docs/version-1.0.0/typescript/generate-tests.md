---
id: generate-tests
title: 使用Mock创建端到端测试 (v1.0.0)
description: 了解如何生成端到端测试（含Mock）
tags:
  - 开发者指南
  - typescript
---

## 配置

在应用的.env文件中添加以下内容。

```
export KEPLOY_TEST_CASE_PATH="./example"    # 如果未提供KEPLOY_TEST_CASE_PATH，则会创建一个名为keploy-tests的文件夹，其中包含mocks文件夹。如果提供了KEPLOY_MOCK_PATH，则mock将生成在该路径下。
export KEPLOY_MOCK_PATH="./exampleMockPath"
```

**注意：** 要启用`测试导出`功能，请在[keploy-server](https://github.com/keploy/keploy)仓库的.env文件中添加`export ENABLE_TEST_EXPORT=true`。启用后，包含测试用例的yaml文件将生成在用户指定的目录中。同样，mock也将生成在yaml文件中。

```shell
export ENABLE_TEST_EXPORT=true
```

**注意：** 如果启用了测试导出功能，则记录的测试用例将不会在UI中显示。