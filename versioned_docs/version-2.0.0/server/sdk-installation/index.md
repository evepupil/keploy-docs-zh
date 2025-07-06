---
id: index
title: 前置要求 🛠️
tags:
  - 覆盖率
keyword:
  - 覆盖率
  - 单元测试
  - 代码覆盖率
  - Golang
  - Go Test
  - java
  - jacoco
  - node
  - npm
  - nyc
  - python
  - coveragepy
---

要获取覆盖率报告，首先确保满足所有要求，然后像往常一样使用您的应用程序命令运行Keploy测试：

```bash
keploy test -c "your_application_command"
```

该命令成功执行后，将在keploy/reports的test-run文件夹中生成覆盖率报告。

```sh
keploy
├── reports
│   └── test-run-0
│       ├── coverage.yaml
│       └── test-set-0-report.yaml
└── test-set-0
    ├── mocks.yaml
    └── tests
        ├── test-1.yaml
        └── test-2.yaml
```