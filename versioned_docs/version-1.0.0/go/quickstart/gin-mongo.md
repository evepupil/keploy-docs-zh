---
id: gin-mongo
title: Gin-Mongo 示例应用 (Go v1.0.0)
sidebar_label: Gin-Mongo 示例
tags:
  - hello-world
  - go
  - sdk
  - tutorial
keywords:
  - SDK
  - Docker
  - MongoDB
  - golang gin
---

# 短链接示例应用

这是一个使用 Gin 框架和 MongoDB 测试 Keploy 集成能力的短链接示例应用。

## 安装

前往[安装指南](../../server/server-installation.md)快速安装并运行 Keploy 服务。

### 设置短链接应用

```bash
git clone https://github.com/keploy/samples-go.git && cd samples-go/gin-mongo
go mod download
```

### 启动 Keploy 录制模式

```bash
export KEPLOY_MODE=record
```

### 启动 MongoDB 服务

```bash
docker container run -it -p27017:27017 mongo
```

### 运行应用

```shell
go run handler.go main.go
```

## 生成测试用例

生成测试用例只需**发起一些 API 调用**。你可以使用 [Postman](https://www.postman.com/) 或直接使用 `curl`。

### 1. 生成短链接

```bash
curl --request POST \
  --url http://localhost:8080/url \
  --header 'content-type: application/json' \
  --data '{
  "url": "https://google.com"
}'
```

这将返回生成的短链接。其中的时间戳(ts)在测试时会自动忽略，因为它每次都会不同。

```
{
  "ts": 1645540022,
  "url": "http://localhost:8080/Lhr4BWAi"
}
```

### 2. 通过短链接重定向到原网址

```bash
curl --request GET \
  --url http://localhost:8080/Lhr4BWAi
```

或者直接在浏览器访问 `http://localhost:8080/Lhr4BWAi`

你将在本地代码库中看到新生成的测试文件和模拟文件。
如果使用 Keploy 云服务，可以访问[这里](https://app.keploy.io/)查看可视化捕获的测试用例。

你应该能看到一个名为 `sample-url-shortener` 的应用，其中包含我们刚捕获的测试用例。

![Gin-Mongo测试用例](/img/Gin-Mongo-test-cases.png)

现在，让我们见证奇迹时刻！🪄💫

## 测试模式

有两种方式使用 Keploy 测试应用：

1. [单元测试文件](/docs/1.0.0/go/quickstart/gin-mongo#使用单元测试文件测试)
2. [KEPLOY_MODE环境变量](/docs/1.0.0/go/quickstart/gin-mongo#使用keploy_mode环境变量测试)

### 使用单元测试文件测试

现在我们已经捕获了测试用例，运行示例应用中已有的单元测试文件(`main_test.go`)。

如果不存在，你可以在示例应用的根目录下添加 `main_test.go` 文件。

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

自动下载并运行捕获的测试用例。现在运行测试文件：

```shell
 go test -coverpkg=./... -covermode=atomic  ./...
```

输出应该类似：

```shell
ok      test-app-url-shortener  6.557s  coverage: 80.3% of statements in ./...
```

**我们无需编写任何测试用例或 MongoDB 模拟就获得了80.3%的覆盖率。🎉 **

> **注意**：你不需要本地搭建 MongoDB 或为测试编写模拟。

**应用程序以为自己真的在连接 MongoDB 😄**

前往 Keploy 控制台的测试运行页面，获取更深入的测试运行分析。

![Gin-Mongo测试差异](/img/Gin-Mongo-test-runs.png)

### 使用 `KEPLOY_MODE` 环境变量测试

要使用 `KEPLOY_MODE` 环境变量测试，将其设置为 `test` 模式。

```
export KEPLOY_MODE="test"
```

然后直接运行应用：

```shell
go run handler.go main.go
```

Keploy 将运行所有捕获的测试用例，比较并在控制台显示结果。

> **注意**：此方法不会计算覆盖率。

## 在应用中引入一个 Bug

现在让我们故意引入一个 bug！比如在 handler.go 第96行将 `url` 改为 `urls`：

```go
    ...
    c.JSON(http.StatusOK, gin.H{
		...
		"urls": "http://localhost:8080/" + id,
	})
	...
```

运行测试文件看看 Keploy 是否能捕获这个回归问题：

` go test -coverpkg=./... -covermode=atomic ./...`

你会在输出中看到失败的测试用例。

```shell
result  {"testcase id": "fd502338-b04d-4f96-a21e-38bd81edd9ee", "passed": false}
result  {"testcase id": "e8fb1ab0-2f39-48e1-b2ab-6142bc4e9515", "passed": true}
test run completed      {"run id": "a48f2fdf-7873-4879-bc81-5d280ee169fb", "passed overall": false}
--- FAIL: TestKeploy (7.01s)
    keploy.go:77: Keploy 测试套件失败
FAIL
coverage: 80.3% of statements in ./...
FAIL    test-app-url-shortener  7.022s
FAIL
```

要深入分析问题，请访问[测试运行](http://localhost:6789/testruns)页面。

![Gin-Mongo测试差异](/img/Gin-Mongo-test-diff.png)