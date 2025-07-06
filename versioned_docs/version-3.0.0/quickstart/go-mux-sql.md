---
id: samples-mux
title: 示例产品目录应用（Golang）
sidebar_label: Mux + Postgres
description: 以下示例应用展示了如何使用Mux框架和Keploy平台。
tags:
  - go
  - quickstart
  - samples
  - examples
  - tutorial
  - postgres
  - mux-framework
keyword:
  - Mux框架
  - Postgres
  - SQL
  - Golang
  - API测试生成器
  - 自动测试用例生成
---

## 简介

🪄 深入产品目录的世界，看看Keploy如何与[Mux](https://github.com/gorilla/mux)和[Postgres](https://www.postgresql.org/)无缝集成。系好安全带，这将是一段有趣的旅程！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 开始吧！🎬

## 克隆示例产品目录应用🧪

```bash
git clone https://github.com/keploy/samples-go.git && cd samples-go/mux-sql
go mod download
```

## 安装 📥

有两种方式可以运行此示例应用。

- [使用Docker compose：在Docker容器中运行应用和Postgres](#使用-docker-compose-)
- [使用Docker容器运行Postgres并在本地运行应用](#在-linuxwsl-上本地运行应用-)

## 使用Docker Compose 🐳

我们将使用Docker compose在Docker容器中运行应用和Postgres。

### 准备，开始，录制！🎥

启动应用和Postgres实例，并使用Keploy。注意两个关键标志：
`-c`：运行应用的命令（例如`docker compose up`）。

`--container-name`：`docker-compose.yml`中用于流量拦截的容器名称。

#### 捕获测试用例

```bash
keploy record -c "docker compose up" --container-name "muxSqlApp" --build-delay 50
```

🔥 挑战时间！生成一些测试用例。怎么做？只需**发起一些API调用**。Postman、Hoppscotch或curl——任你选择！

#### 生成测试用例

```bash
curl --request POST \
--url http://localhost:8010/product \
--header 'content-type: application/json' \
--data '{
  "name":"Bubbles",
  "price": 123
}'
```

以下是你会看到的内容：

```json
{
  "id": 1,
  "name": "Bubbles",
  "price": 123
}
```

🎉 哇哦！通过一个简单的API调用，你已经创建了一个带有模拟的测试用例！进入Keploy目录，查看新生成的`test-1.yml`和`mocks.yml`。

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
    url: http://localhost:8010/product
    header:
      Accept: "*/*"
      Content-Length: "46"
      Content-Type: application/json
      Host: localhost:8010
      User-Agent: curl/8.1.2
    body: |-
      {
          "name":"Bubbles",
          "price": 123
          }
    body_type: ""
  resp:
    status_code: 201
    header:
      Content-Length: "37"
      Content-Type: application/json
      Date: Mon, 09 Oct 2023 06:51:16 GMT
    body: '{"id":4,"name":"Bubbles","price":123}'
    body_type: ""
    status_message: ""
    proto_major: 0
    proto_minor: 0
  objects: []
  assertions:
    noise:
      - header.Date
  created: 1696834280
```

`mocks.yml`的生成内容如下：

```yaml
version: api.keploy.io/v1beta2
kind: Postgres
name: mocks
spec:
  metadata: {}
  postgresrequests:
    - origin: client
      message:
        - type: binary
          data: AAAAZgADAABleHRyYV9mbG9hdF9kaWdpdHMAMgB1c2VyAHBvc3RncmVzAGRhdGFiYXNlAHBvc3RncmVzAGNsaWVudF9lbmNvZGluZwBVVEY4AGRhdGVzdHlsZQBJU08sIE1EWQAA
  postgresresponses:
    - origin: server
      message:
        - type: binary
          data: UgAAAAwAAAAF0ykSRQ==
---
version: api.keploy.io/v1beta2
kind: Postgres
name: mocks
spec:
  metadata: {}
  postgresrequests:
    - origin: client
      message:
        - type: binary
          data: cAAAAChtZDU3ZmY0ZTZhZGEzMThlZDJiYWM5ODQyY2YwNmEyODE2MwA=
  postgresresponses:
    - origin: server
      message:
        - type: binary
          data: UgAAAAgAAAAAUwAAABZhcHBsaWNhdGlvbl9uYW1lAABTAAAAGWNsaWVudF9lbmNvZGluZwBVVEY4AFMAAAAXRGF0ZVN0eWxlAElTTywgTURZAFMAAAAZaW50ZWdlcl9kYXRldGltZXMAb24AUwAAABtJbnRlcnZhbFN0eWxlAHBvc3RncmVzAFMAAAAUaXNfc3VwZXJ1c2VyAG9uAFMAAAAZc2VydmVyX2VuY29kaW5nAFVURjgAUwAAADFzZXJ2ZXJfdmVyc2lvbgAxMC41IChEZWJpYW4gMTAuNS0yLnBnZGc5MCsxKQBTAAAAI3Nlc3Npb25fYXV0aG9yaXphdGlvbgBwb3N0Z3JlcwBTAAAAI3N0YW5kYXJkX2NvbmZvcm1pbmdfc3RyaW5ncwBvbgBTAAAAEVRpbWVab25lAFVUQwBLAAAADAAAAB6JC1lnWgAAAAVJ
---
version: api.keploy.io/v1beta2
kind: Postgres
name: mocks
spec:
  metadata: {}
  postgresrequests:
    - origin: client
      message:
        - type: binary
          data: UAAAAEUASU5TRVJUIElOVE8gcHJvZHVjdHMobmFtZSwgcHJpY2UpIFZBTFVFUygkMSwgJDIpIFJFVFVSTklORyBpZAAAAEQAAAAGUwBTAAAABA==
  postgresresponses:
    - origin: server
      message:
        - type: binary
          data: MQAAAAR0AAAADgACAAAAGQAABqRUAAAAGwABaWQAAABAAgABAAAAFwAE/////wAAWgAAAAVJ
```

#### 从目录获取产品

```bash
curl --request GET \  --url http://localhost:8010/products
```

或者直接在浏览器中输入`http://localhost:8010/products`。随你选择！

发现项目中新的测试和模拟文件了吗？击掌庆祝！🙌

### 运行测试

是时候进行测试了 🧪

```bash
keploy test -c "docker compose up" --container-name "muxSqlApp" --build-delay 50 --delay 10
```

> `--delay`标志？哦，这只是让你的应用在测试用例到来之前稍作休息（以秒为单位）。

最后思考？深入探索！尝试不同的API调用，调整`mocks.yml`中的数据库响应，或者修改`test-x.yml`中的请求或响应。再次运行测试，看看魔法如何展开！✨👩‍💻👨‍💻✨

### 总结 🎉

恭喜你完成这段旅程！你已经见识了Keploy的强大，锻炼了编码能力，还玩得很开心！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

编码愉快！✨👩‍💻👨‍💻✨

**\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\_\_\_\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\***

## 在Linux/WSL上本地运行应用 🐧

我们将在Linux上直接运行示例应用，但为了让事情更有趣，数据库（Postgres）将在Docker上运行。准备好了吗？让我们开始派对吧！🎉

首先，更新**main.go**第10行的postgres主机，将主机改为`localhost`。

#### 🍃 启动PostgresDB

让我们启动Postgres容器。一个简单的命令即可：

```bash
docker compose up postgres
```

### 📼 开始录制！

准备，开始，录制！方法如下：

```bash
sudo -E env PATH=$PATH keploy record -c "go run main.go app.go"
```

注意`-c`标志！这是运行应用的命令。无论是使用`go run main.go app.go`还是二进制路径如`./test-app-product-catelog`，由你决定。

好了，魔法师！应用已经启动并运行，让我们创建一些测试用例。咒语是什么？发起一些API调用！Postman、Hoppscotch或经典的curl——选择你的魔杖。

#### 生成测试用例

✨ 一点URL魔法：

```bash
curl --request POST \
--url http://localhost:8010/product \
--header 'content-type: application/json' \
--data '{
  "name":"Bubbles",
  "price": 123
  }'
```

然后……瞧！一个产品条目出现了：

```json
{
  "id": 1,
  "name": "Bubbles",
  "price": 123
}
```

给自己一个鼓励！通过这个简单的咒语，你已经创建了一个带有模拟的测试用例！探索**Keploy目录**，你会在`test-1.yml`和`mocks.yml`中发现你的成果。

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
    url: http://localhost:8010/product
    header:
      Accept: "*/*"
      Content-Length: "46"
      Content-Type: application/json
      Host: localhost:8010
      User-Agent: curl/8.1.2
    body: |-
      {
          "name":"Bubbles",
          "price": 123
          }
    body_type: ""
  resp:
    status_code: 201
    header:
      Content-Length: "37"
      Content-Type: application/json
      Date: Mon, 09 Oct 2023 06:51:16 GMT
    body: '{"id":4,"name":"Bubbles","price":123}'
    body_type: ""
    status_message: ""
    proto_major: 0
    proto_minor: 0
  objects: []
  assertions:
    noise:
      - header.Date
  created: 1696834280
```

`mocks.yml`的生成内容如下：

```yaml
version: api.keploy.io/v1beta2
kind: Postgres
name: mocks
spec:
  metadata: {}
  postgresrequests:
    - origin: client
      message:
        - type: binary
          data: AAAAZgADAABleHRyYV9mbG9hdF9kaWdpdHMAMgB1c2VyAHBvc3RncmVzAGRhdGFiYXNlAHBvc3RncmVzAGNsaWVudF9lbmNvZGluZwBVVEY4AGRhdGVzdHlsZQBJU08sIE1EWQAA
  postgresresponses:
    - origin: server
      message:
        - type: binary
          data: UgAAAAwAAAAF0ykSRQ==
---
version: api.keploy.io/v1beta2
kind: Postgres
name: mocks
spec:
  metadata: {}
  postgresrequests:
    - origin: client
      message:
        - type: binary
          data: cAAAAChtZDU3ZmY0ZTZhZGEzMThlZDJiYWM5ODQyY2YwNmEyODE2MwA=
  postgresresponses:
    - origin: server
      message:
        - type: binary
          data: UgAAAAgAAAAAUwAAABZhcHBsaWNhdGlvbl9uYW1lAABTAAAAGWNsaWVudF9lbmNvZGluZwBVVEY4AFMAAAAXRGF0ZVN0eWxlAElTTywgTURZAFMAAAAZaW50ZWdlcl9kYXRldGltZXMAb24AUwAAABtJbnRlcnZhbFN0eWxlAHBvc3RncmVzAFMAAAAUaXNfc3VwZXJ1c2VyAG9uAFMAAAAZc2VydmVyX2VuY29kaW5nAFVURjgAUwAAADFzZXJ2ZXJfdmVyc2lvbgAxMC41IChEZWJpYW4gMTAuNS0yLnBnZGc5MCsxKQBTAAAAI3Nlc3Npb25fYXV0aG9yaXphdGlvbgBwb3N0Z3JlcwBTAAAAI3N0YW5kYXJkX2NvbmZvcm1pbmdfc3RyaW5ncwBvbgBTAAAAEVRpbWVab25lAFVUQwBLAAAADAAAAB6JC1lnWgAAAAVJ
---
version: api.keploy.io/v1beta2
kind: Postgres
name: mocks
spec:
  metadata: {}
  postgresrequests:
    - origin: client
      message:
        - type: binary
          data: UAAAAEUASU5TRVJUIElOVE8gcHJvZHVjdHMobmFtZSwgcHJpY2UpIFZBTFVFUygkMSwgJDIpIFJFVFVSTklORyBpZAAAAEQAAAAGUwBTAAAABA==
  postgresresponses:
    - origin: server
      message:
        - type: binary
          data: MQAAAAR0AAAADgACAAAAGQAABqRUAAAAGwABaWQAAABAAgABAAAAFwAE/////wAAWgAAAAVJ
```

现在，真正的乐趣开始了。让我们施展更多咒语！

#### 从目录获取产品

🚀 沿着URL之路前进……！

```bash
curl --request GET \  --url http://localhost:8010/products
```

或者直接在浏览器中访问`http://localhost:8010/products`。

你发现项目库中新的测试和模拟卷轴了吗？太棒了！👏

<img src="/docs/img/mux-sql-test-cases.png" alt="Mux SQL的示例Keploy测试用例和模拟" width="100%" style={{ borderRadius: '5px' }}/>

### 运行测试 🏁

准备好测试你的咒语了吗？

```bash
sudo -E env PATH=$PATH keploy test -c "go run main.go app.go" --delay 10
```

最后思考？深入探索！尝试不同的API调用，调整`mocks.yml`中的数据库响应，或者修改`test-x.yml`中的请求或响应。再次运行测试，看看魔法如何展开！✨👩‍💻👨‍💻✨

### 总结 🎉

恭喜你完成这段旅程！你已经见识了Keploy的强大，锻炼了编码能力，还玩得很开心！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

希望这对你有所帮助，如果还有任何问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>