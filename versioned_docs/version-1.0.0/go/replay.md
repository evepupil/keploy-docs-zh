---
id: replay
title: Go语言回放测试与模拟工具 (v1.0.0)
description: Keploy中的Go语言回放测试套件。
tags:
  - 开发者指南
  - go
  - 回放指南
  - 回放测试用例
---

import ReplayTest from '../operation/test.md'

<ReplayTest/>

### 方法二 [推荐]

<details><summary>
使用单元测试文件进行测试

</summary>

import GoTest from './integration-with-go-test.md'

<GoTest/>

</details>

### 方法三

<details><summary>
在CI/CD中运行测试

</summary>

按照上述方法二操作后，Keploy将与`go-test`集成。
如果您已使用`go-test`，则无需对CI/CD流水线进行任何修改。

</details>