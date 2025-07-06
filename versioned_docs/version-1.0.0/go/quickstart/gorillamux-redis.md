---
id: gorillamux-redis
title: Gorilla/Mux-Redis 联系人管理示例 (v1.0.0)
sidebar_label: Gorilla/Mux-Redis 示例
tags:
  - hello-world
  - go
  - sdk
  - tutorial
keywords:
  - SDK
  - MUX
  - Postman
  - Redis
---

# 联系人管理示例应用

这是一个使用 [Gorilla Mux](https://pkg.go.dev/github.com/gorilla/mux) 和 Redis 测试 Keploy 集成能力的示例联系人管理应用。

## 安装设置

> 注意：测试用例默认会导出为本地仓库中的文件

您可以参考[安装指南](https://docs.keploy.io/docs/server/server-installation)在您的机器上安装 Keploy。

### 先决条件

1. 安装 Redis

### 设置联系人管理应用

```bash
git clone https://github.com/keploy/samples-go && cd samples-go/gorillamux-redis
```

### 启动 Redis

```bash
redis-server
```

### 启动 Keploy 记录模式并运行应用

```
export KEPLOY_MODE=record && go run main.go
```

### 使用 Gitpod 跳过上述步骤

在 Gitpod 中打开

## 生成测试用例

要生成测试用例，我们只需要进行一些 API 调用。您可以使用 [Postman](https://www.postman.com/)，或者简单的 `curl` 命令。

### 存储联系人详情

```bash
curl --request POST \
 --url http://localhost:8080/data/1 \
 --header 'content-type: application/json' \
 --data '{
 "name":"John Doe",
 "email":"johndoe@example.com"
}'
```

这将返回插入的数据。

```
{
    "name":"John Doe",
    "email":"johndoe@example.com"
}
```

此外，您可以在端点中使用任何数字 ID 来插入数据。这里我们使用了 1。

### 使用 ID 获取存储的数据

1. 使用 Curl 命令

```bash
curl --request GET \
 --url http://localhost:8080/data/1

```

2. 或者通过浏览器访问 `http://localhost:8080/data/1'

![Gorilla-Mux-测试捕获](/img/GorillaMux-Redis.png)

现在，这两个 API 调用都被捕获为**可编辑**的测试用例，并写入 `keploy/tests` 文件夹。keploy 目录还会有一个 `mocks` 文件夹，其中包含所有 Redis 操作的输出。文件夹结构如下：

```
.
├── README.md
├── main.go
├── go.mod
├── go.sum
├── keploy
│   ├── tests
│       ├── test-1.yaml
│       ├── test-2.yaml
│   └── mocks
│       ├── mock-1.yaml
│       └── mock-2.yaml


```

测试文件应如下所示，格式对于 **_http 测试_** 和 **_mocks_** 都是通用的。

```yaml
version: api.keploy.io/v1beta2
kind: Http
name: test-1
spec:
  metadata: {}
  req:
    method: POST
    proto_major: 1
    proto_minor: 1
    url: /data/1
    header:
      Accept: "*/*"
      Content-Length: "54"
      Content-Type: application/json
      User-Agent: curl/7.81.0
    body: |-
      {
       "name":"John Doe",
       "email":"johndoe@example.com"
      }
    body_type: utf-8
  resp:
    status_code: 200
    header:
      Content-Type: application/json
    body: |
      {"name":"John Doe","email":"johndoe@example.com"}
    body_type: utf-8
    status_message: ""
    proto_major: 1
    proto_minor: 1
  objects:
    - type: error
      data: H4sIAAAAAAAA/wEAAP//AAAAAAAAAAA=
  mocks:
    - mock-1-0
  assertions:
    noise: []
  created: 1675929915
```

现在，让我们见证奇迹！✨💫

## 测试模式

现在我们已经捕获了测试用例，运行测试文件（在 gomux-redis 目录中，而不是 Keploy 目录）。

```shell
 go test -coverpkg=./... -covermode=atomic  ./...
```

输出应如下所示：

```shell
ok  	sample-app	5.032s	coverage: 71.4% of statements in ./...
```

> **我们无需编写任何端到端测试用例或 Redis 的模拟，就获得了 71.4% 的覆盖率！**

因此，无需设置像 Redis 这样的虚假数据库/API 或为其编写模拟。Keploy 会自动模拟它们，**应用程序以为它在与 Redis 对话 😄**

前往 `Keploy 控制台` 获取更深入的测试用例运行情况和失败原因。

<details>
<summary>𝗞𝗲𝗽𝗹𝗼𝘆 控制台洞察</summary>

```shell
 <=========================================>
  TESTRUN STARTED with id: "635ffdba-1382-48fd-8c81-8e6eebf95f29"
	For App: "my-app"
	Total tests: 2
 <=========================================>

Testrun passed for testcase with id: "test-2"

--------------------------------------------------------------------

Testrun passed for testcase with id: "test-1"

--------------------------------------------------------------------


 <=========================================>
  TESTRUN SUMMARY. For testrun with id: "635ffdba-1382-48fd-8c81-8e6eebf95f29"
	Total tests: 2
	Total test passed: 2
	Total test failed: 0
 <=========================================>


```

</details>

---

### 进行代码更改

现在尝试更改一些内容，比如注释掉 `main.go` 中的第 115 和 116 行，并取消注释第 119 行，然后再次运行 ` go test -coverpkg=./... -covermode=atomic ./...`

```shell
starting test execution	{"id": "5ae0c256-f54d-4126-a794-5d5f50d3db76", "total tests": 2}
testing 1 of 2	{"testcase id": "test-1"}
testing 2 of 2	{"testcase id": "test-2"}
result	{"testcase id": "test-2", "passed": true}
result	{"testcase id": "test-1", "passed": false}
test run completed	{"run id": "5ae0c256-f54d-4126-a794-5d5f50d3db76", "passed overall": false}
--- FAIL: TestKeploy (5.02s)
    keploy.go:75: Keploy test suite failed
FAIL
	sample-app	coverage: 70.8% of statements in ./...
FAIL	sample-app	5.027s
FAIL


```

要深入分析问题，您可以查看 keploy 日志。

<details>
<summary>𝗞𝗲𝗽𝗹𝗼𝘆 日志</summary>

```shell
 <=========================================>
  TESTRUN STARTED with id: "5ae0c256-f54d-4126-a794-5d5f50d3db76"
	For App: "my-app"
	Total tests: 2
 <=========================================>

Testrun passed for testcase with id: "test-2"

--------------------------------------------------------------------

Testrun failed for testcase with id: "test-1"
Test Result:
	Input Http Request: models.HttpReq{
  Method:     "POST",
  ProtoMajor: 1,
  ProtoMinor: 1,
  URL:        "/data/1",
  URLParams:  map[string]string{},
  Header:     http.Header{
    "Accept": []string{
      "*/*",
    },
    "Content-Length": []string{
      "54",
    },
    "Content-Type": []string{
      "application/json",
    },
    "User-Agent": []string{
      "curl/7.81.0",
    },
  },
  Body:   "{\n \"name\":\"John Doe\",\n \"email\":\"johndoe@example.com\"\n}",
  Binary: "",
  Form:   []models.FormData(nil),
}

	Expected Response: models.HttpResp{
  StatusCode: 200,
  Header:     http.Header{
    "Content-Type": []string{
      "application/json",
    },
  },
  Body:          "{\"name\":\"John Doe\",\"email\":\"johndoe@example.com\"}\n",
  StatusMessage: "",
  ProtoMajor:    0,
  ProtoMinor:    0,
  Binary:        "",
}

	Actual Response: models.HttpResp{
  StatusCode:    200,
  Header:        http.Header{},
  Body:          "Record saved",
  StatusMessage: "",
  ProtoMajor:    0,
  ProtoMinor:    0,
  Binary:        "",
}

DIFF:
	 Response Headers: {
		"Content-Type": {
			Expected value: "[application/json]"
			Actual value: "[]"
		}
	}
	Response body: {
{
			Expected value: "{\"name\":\"John Doe\",\"email\":\"johndoe@example.com\"}\n"
			Actual value: "Record saved"
		}
--------------------------------------------------------------------


 <=========================================>
  TESTRUN SUMMARY. For testrun with id: "5ae0c256-f54d-4126-a794-5d5f50d3db76"
	Total tests: 2
	Total test passed: 1
	Total test failed: 1
 <=========================================>

```

这就是 Keploy 终端中显示的 bug：

![GorillaMux-Redis-test-diff](/img/GorillaMux-Redis-test-diff.png)
![GorillaMux-Redis-test-diff2](/img/GorillaMux-Redis-test-diff2.png)

</details>