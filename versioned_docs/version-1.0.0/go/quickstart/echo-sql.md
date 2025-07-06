---
id: echo-sql
title: Go版Echo-SQL示例应用 (v1.0.0)
sidebar_label: Echo-SQL示例
tags:
  - hello-world
  - go
  - sdk
  - tutorial
keywords:
  - PostgreSQL
  - 单元测试
  - 示例应用
---

# 短链接示例应用

这是一个使用Echo框架和[PostgreSQL](https://www.postgresql.org/)测试Keploy集成能力的短链接示例应用。

## 安装

前往[安装指南](../../server/server-installation.md)快速安装并运行Keploy服务器。

### 设置短链接应用

```bash
git clone https://github.com/keploy/samples-go && cd samples-go/echo-sql
go mod download
```

### 启动Keploy记录模式

```bash
export KEPLOY_MODE=record
```

### 启动PostgreSQL实例

```bash
docker-compose up -d
```

### 运行应用

```shell
go run handler.go main.go
```

## 生成测试用例

生成测试用例只需要**发起一些API调用**。你可以使用[Postman](https://www.postman.com/)，或者简单的`curl`命令。

### 1. 生成短链接

```bash
curl --request POST \
  --url http://localhost:8082/url \
  --header 'content-type: application/json' \
  --data '{
  "url": "https://google.com"
}'
```

这将返回缩短后的URL。时间戳(ts)在测试时会自动忽略，因为它每次都会不同。

```
{
  "ts": 1645540022,
  "url": "http://localhost:8082/Lhr4BWAi"
}
```

### 2. 通过短链接跳转原始URL

```bash
curl --request GET \
  --url http://localhost:8082/Lhr4BWAi
```

或者直接在浏览器访问`http://localhost:6789/Lhr4BWAi`

现在这两个API调用都已被捕获为测试用例，可以在keploy-tests文件夹中查看。如果使用Keploy云服务，请打开[此链接](https://app.keploy.io/)。

![测试用例](/img/Echo-Sql-test-cases.png)

现在，让我们见证奇迹！🪄💫

## 测试模式

有两种方式用Keploy测试应用：

1. 单元测试文件
2. KEPLOY_MODE环境变量

### 1. 使用单元测试文件测试

现在我们已经捕获了测试用例，运行示例应用仓库中已有的单元测试文件(`main_test.go`)。

如果不存在，你可以在示例应用的根目录添加`main_test.go`文件。

```go
package main

import (
  "github.com/keploy/go-sdk/keploy"
  "os"
  "testing"
)

func TestKeploy(t *testing.T) {
  // 修改端口以便测试服务器可以并行运行
  os.Setenv("PORT", "8090")

  keploy.SetTestMode()
  go main()
  keploy.AssertTests(t)
}
```

为了自动运行捕获的测试用例，我们执行测试文件：

```shell
 go test -coverpkg=./... -covermode=atomic  ./...
```

输出应该类似：

```shell
ok   echo-psql-url-shortener 6.750s coverage: 51.1% of statements in ./...
```

**我们在没有编写任何测试用例或Postgres模拟的情况下获得了51.1%的覆盖率。🎉 **

> **注意**：你不需要在本地安装Postgres或为测试编写模拟。
> 因此无需在本地设置PostgreSQL、web-go等依赖项或为测试编写模拟。

**应用程序以为它在与真实的Postgres交互 😄**

前往Keploy终端获取更深入的测试运行情况和失败分析。

![Echo-Sql测试运行](/img/Echo-Sql-test-run.png)

### 2. 使用`KEPLOY_MODE`环境变量测试

要使用`KEPLOY_MODE`环境变量测试，将其设置为`test`模式。

```
export KEPLOY_MODE=test
```

然后直接运行应用：

```shell
go run handler.go main.go
```

Keploy将运行所有捕获的测试用例，比较并在终端显示结果。

> **注意**：使用此方法不会计算覆盖率。

## 在应用中引入一个Bug

现在让我们故意引入一个bug！比如在handler.go第39行将`url`改名为`urls`：

```go
    ...
    type successResponse struct {
      TS  int64  json:"ts"
      URL string json:"urls" //故意引入的bug
    }
	...
```

运行测试文件看看Keploy是否能捕获这个回归问题：

` go test -coverpkg=./... -covermode=atomic ./...`

你会在输出中看到失败的测试用例：

```shell
http server started on [::]:8090
test starting in 5s
starting test execution {"id": "3a772b7f-c472-4c8f-a156-af15b155f051", "total tests": 4}
testing 1 of 4 {"testcase id": "a70f20f1-85e6-4e6f-99ee-660f8666d7f2"}
testing 2 of 4 {"testcase id": "766b0484-a515-433d-a470-3675e6b742ed"}
testing 3 of 4 {"testcase id": "4978ef1f-6b64-421e-aff8-b4c426b035c6"}
testing 4 of 4 {"testcase id": "3342d931-5bef-4c9c-a042-bde3ecd4cc29"}
result {"testcase id": "3342d931-5bef-4c9c-a042-bde3ecd4cc29", "passed": false}
result {"testcase id": "766b0484-a515-433d-a470-3675e6b742ed", "passed": false}
result {"testcase id": "a70f20f1-85e6-4e6f-99ee-660f8666d7f2", "passed": true}
result {"testcase id": "4978ef1f-6b64-421e-aff8-b4c426b035c6", "passed": true}
test run completed {"run id": "3a772b7f-c472-4c8f-a156-af15b155f051", "passed overall": false}
--- FAIL: TestKeploy (5.95s)
    keploy.go:77: Keploy测试套件失败
FAIL
coverage: 51.1% of statements in ./...
FAIL echo-psql-url-shortener 7.051s
FAIL
```

在Keploy终端中，这个bug会显示如下：

![Echo-Sql测试差异](/img/Echo-Sql-test-diff.png)
![Echo-Sql测试差异2](/img/Echo-Sql-test-diff2.png)