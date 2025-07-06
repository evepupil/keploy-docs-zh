---
id: integration-with-go-test
title: 与 Go Test 集成 (v1.0.0)
sidebar_label: 与 Go Test 集成
---

在应用程序的 `root` 目录下添加以下 Go 单元测试文件 `main_test.go`。

```go
  package main

  import (
    "github.com/keploy/go-sdk/keploy"
    "testing"
  )

  func TestKeploy(t *testing.T) {
      keploy.SetTestMode()
      go main()
      keploy.AssertTests(t)
}
```

运行测试文件。

```shell
 go test -coverpkg=./... -covermode=atomic  ./...
```

输出应类似于：

```shell
ok      test-app-url-shortener  6.268s  coverage: 80.3% of statements in ./...
```

您将看到 Keploy 记录的测试用例和之前编写的单元测试用例（如果有）的总测试覆盖率。

> > 您可以使用此单元测试文件，无需在 CI 流水线中添加任何额外的步骤/检查。