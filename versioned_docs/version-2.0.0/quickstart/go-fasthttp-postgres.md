---
id: samples-fasthttp
title: 示例CRUD应用（Golang）
sidebar_label: FastHttp + Postgres
description: 以下示例应用展示了如何使用FastHttp框架和Keploy平台。
tags:
  - go
  - quickstart
  - samples
  - examples
  - tutorial
  - postgres
  - fasthttp
keyword:
  - FastHttp框架
  - Postgres模拟
  - Golang
  - API测试生成器
  - 自动化测试用例生成
---

## 简介

🪄 深入CRUD应用的世界，看看Keploy如何与[FastHttp](https://github.com/valyala/fasthttp)和[Postgres](https://www.postgresql.org/)无缝集成。系好安全带，这将是一段有趣的旅程！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 克隆示例CRUD应用 🧪

```bash
git clone https://github.com/keploy/samples-go.git && cd samples-go/fasthttp-postgres
go mod download
```

## 安装 📥

有两种方式可以运行此示例应用。

- [使用Docker compose：在Docker容器中运行应用及Postgres](#使用docker-compose-)
- [使用Docker容器运行Postgres并在本地运行应用](#在linuxwsl上本地运行应用-)

## 使用Docker Compose 🐳

我们将使用Docker Compose在Docker容器中运行应用及Postgres。

### 准备，开始，录制！🎥

用Keploy启动应用和Postgres实例。注意两个关键标志：
`-c`：运行应用的命令（如`docker compose up`）。

`--container-name`：`docker-compose.yml`中用于流量拦截的容器名称。

```bash
keploy record -c "docker compose up" --container-name "fasthttpPostgresApp"
```

看到类似这样的日志了吗？完美！👌
![测试用例](https://github.com/keploy/samples-go/raw/main/fasthttp-postgres/img/testcases.png)

🔥 挑战时间！生成一些测试用例。怎么做？只需**发起一些API调用**。Postman、Hoppscotch甚至curl——任你选择！

让我们创建一些用户和书籍：

#### POST请求

```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"Author Name"}' http://localhost:8080/authors
curl -X POST -H "Content-Type: application/json" -d '{"title":"Book Title","author_id":1}' http://localhost:8080/books
```

#### GET请求

```bash
curl -i http://localhost:8080/books
```

🎉 哇哦！通过简单的API调用，你已经创建了带有模拟的测试用例！查看Keploy目录，欣赏新生成的`test-1.yml`和`mocks.yml`。

以下是你会看到的内容示例：

```yaml
version: api.keploy.io/v1beta1
kind: Http
name: test-1
spec:
  metadata: {}
  req:
    method: POST
    proto_major: 1
    proto_minor: 1
    url: http://localhost:8080/authors
    header:
      Accept: "*/*"
      Content-Length: "22"
      Content-Type: application/json
      Host: localhost:8080
      User-Agent: curl/7.88.1
    body: '{"name":"Author Name"}'
    timestamp: 2024-06-24T13:05:47.732915734+05:30
  resp:
    status_code: 201
    header:
      Content-Length: "0"
      Date: Mon, 24 Jun 2024 07:35:47 GMT
      Server: Server
    body: ""
    status_message: Created
    proto_major: 0
    proto_minor: 0
    timestamp: 2024-06-24T13:05:49.810554677+05:30
  objects: []
  assertions:
    noise:
      header.Date: []
  created: 1719214549
curl: |-
  curl --request POST \
    --url http://localhost:8080/authors \
    --header 'Host: localhost:8080' \
    --header 'User-Agent: curl/7.88.1' \
    --header 'Accept: */*' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Author Name"}'
```

生成的**mock.yml**会像这样：

```yaml
version: api.keploy.io/v1beta1
kind: Postgres
name: mock-0
spec:
  metadata:
    type: config
  postgresrequests:
    - identifier: StartupRequest
      length: 96
      payload: AAAAYAADAAB1c2VyAHBvc3RncmVzAGNsaWVudF9lbmNvZGluZwBVVEY4AGV4dHJhX2Zsb2F0X2RpZ2l0cwAyAGRhdGFiYXNlAGRiAGRhdGVzdHlsZQBJU08sIE1EWQAA
      startup_message:
        protocolversion: 196608
        parameters:
          client_encoding: UTF8
          database: db
          datestyle: ISO, MDY
          extra_float_digits: "2"
          user: postgres
      auth_type: 0
  postgresresponses:
    - header: [R]
      identifier: ServerResponse
      length: 96
      authentication_md5_password:
        salt: [200, 42, 157, 175]
      msg_type: 82
      auth_type: 5
  reqtimestampmock: 2024-06-24T13:05:47.736932812+05:30
  restimestampmock: 2024-06-24T13:05:47.74668502+05:30
connectionId: "0"
```

_是时候施展更多API魔法了！_

#### 获取所有书籍

```bash
curl -i http://localhost:8080/books
```

或者直接在浏览器中输入`http://localhost:8080/books`。随你选择！

在项目中看到新的测试和模拟文件了吗？击掌庆祝！🙌

### 运行测试 🏃‍♀️

是时候进行测试了 🧪

```bash
keploy test -c "docker compose up" --container-name "fasthttpPostgresApp" --delay 10
```

> `--delay`标志？哦，那只是给应用一点喘息时间（以秒为单位），然后测试用例才会开始。

你的结果应该像这样：

![测试运行](https://github.com/keploy/samples-go/raw/main/fasthttp-postgres/img/testrun.png)

注意到ts（时间戳）显示了一些差异吗？是的，时间就是这样！🕰️

最后有什么想法？深入探索！尝试不同的API调用，调整`mocks.yml`中的数据库响应，或者修改`test-x.yml`中的请求或响应。再次运行测试，看看魔法如何展开！✨👩‍💻👨‍💻✨

### 总结 🎉

恭喜你完成了这段旅程！你已经见识了Keploy的力量，锻炼了编码能力，还玩得很开心！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

编码快乐！✨👩‍💻👨‍💻✨

---

## 在Linux/WSL上本地运行应用 🐧

我们将在Linux上直接运行示例应用，但为了让事情更有趣，我们将让数据库（Postgres）在Docker上运行。准备好了吗？让我们开始派对吧！🎉

如果你在Windows上使用WSL，请使用以下命令在用户主目录中启动WSL：

```bash
wsl ~
```

首先，将Postgres URL更新为`localhost:5432`，修改`main.go`文件的**第21行**。

### 🍃 启动Postgres

让我们启动Postgres容器。一个简单的命令即可：

```bash
docker compose up postgres
```

### 📼 录制时间！

准备，开始，录制！方法如下：

```bash
go build -cover
keploy record -c "./app"

```

注意`-c`标志！这是运行应用的命令。无论是使用`go run main.go`还是二进制路径如`./app`，都由你决定。
如果你看到类似以下的日志，说明你走对了路：

![测试用例](https://github.com/keploy/samples-go/raw/main/fasthttp-postgres/img/testcases.png)

好了！应用已经启动并运行，让我们创建一些测试用例。发起一些API调用！Postman、Hoppscotch，

或者经典的curl——任你选择！

是时候创建一些用户和书籍了：

#### POST请求

```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"Author Name"}' http://localhost:8080/authors
curl -X POST -H "Content-Type: application/json" -d '{"title":"Book Title","author_id":1}' http://localhost:8080/books
```

#### GET请求

```bash
curl -i http://localhost:8080/books
```

🎉 看看你做了什么！通过几个简单的API调用，你已经创建了带有模拟的测试用例！查看Keploy目录，欣赏新生成的`test-1.yml`和`mocks.yml`。

### 🏃‍♀️ 运行测试！

是时候进行测试了：

```bash
keploy test -c "./app" --delay 5
```

> 那个`--delay`标志？只是让应用在测试用例开始前稍作休息（以秒为单位）。

当一切结束时，你的测试结果应该像这样：

![测试运行](https://github.com/keploy/samples-go/raw/main/fasthttp-postgres/img/testrun.png)

最后有什么想法？深入探索！尝试不同的API调用，调整`mocks.yml`中的数据库响应，或者修改`test-x.yml`中的请求或响应。再次运行测试，看看魔法如何展开！✨👩‍💻👨‍💻✨

### 总结 🎉

恭喜你完成了这段旅程！你已经见识了Keploy的力量，锻炼了编码能力，还玩得很开心！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

编码快乐！✨👩‍💻👨‍💻✨

希望这对你有所帮助，如果还有任何问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>