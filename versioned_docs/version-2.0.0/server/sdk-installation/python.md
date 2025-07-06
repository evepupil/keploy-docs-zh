---
id: python
title: 合并单元测试覆盖率数据
sidebar_label: Python
tags:
  - python
  - coverage
keyword:
  - Pytest框架
  - Flask框架
  - 覆盖率
  - MongoDb
  - Python
  - API测试生成器
  - 自动化测试用例生成
  - Pytest
---

import WhatAreKeployFeatures from './index.md'

<WhatAreKeployFeatures/>

| 编程语言 | 前提条件                                                                 |
| :------: | :----------------------------------------------------------------------- |
|  python  | [Python 3及以上版本](https://www.python.org/downloads/) <br/> coverage.py |

## 使用方法

获取单元测试的覆盖率数据：

```sh
coverage run --data-file=.coverage.unit test_program.py
```

此处，test_program.py是您要运行的单元测试程序，--data-file设置为.coverage.unit是因为默认情况下，原始覆盖率数据会写入.coverage文件（该文件存放Keploy测试的覆盖率数据），为避免覆盖，我们通过data-file标志指定新文件。

> 注意：如果在运行coverage库时遇到任何问题，可以参考官方文档。

### 合并并获取报告

要合并单元测试和Keploy API测试的覆盖率，可以使用以下命令：

```bash
coverage combine
```

请确保在开始新的测试运行前执行此命令，以避免生成多个覆盖率文件。

最后，要生成测试运行的覆盖率报告，可以执行：

```bash
coverage report
```

如果需要以html格式获取覆盖率报告，可以运行：

```bash
coverage html
```