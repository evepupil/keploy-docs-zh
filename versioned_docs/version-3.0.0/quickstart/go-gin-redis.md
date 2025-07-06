---
id: samples-redis
title: 用户认证应用示例（Golang）
sidebar_label: Gin + Redis
description: 以下示例应用展示了如何使用Gin框架和Keploy平台。
tags:
  - go
  - quickstart
  - samples
  - examples
  - tutorial
  - redis
  - gin-framework
keyword:
  - Gin框架
  - Redis
  - Golang
  - API测试生成器
  - 自动化测试用例生成
---

## 简介

🪄 深入用户认证应用的世界，看看Keploy如何与Gin和Redis无缝集成。系好安全带，这将是一段有趣的旅程！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 开始吧！🎬

## 克隆示例用户认证应用 🧪

```bash
git clone https://github.com/keploy/samples-go.git && cd samples-go/gin-redis
go mod download
```

## 安装 📥

有两种方式可以运行此示例应用。

- [使用Docker compose：在Docker容器中运行应用及Postgres](#使用docker-compose-)
- [使用Docker容器运行Postgres并在本地运行应用](#在linuxwsl上本地运行应用-)

## 使用Docker Compose 🐳

我们将使用Docker compose在Docker容器中运行应用及Postgres。

### 灯光，摄像，开始录制！🎥

#### 设置Redis数据库 📦

使用`docker-compose`文件启动Redis实例：

```bash
docker compose up redis
```

现在，我们将创建应用的Docker镜像：

```bash
docker build -t gin-app:1.0 .
```

### 捕获测试用例

```shell
keploy record -c "docker run -p 3001:3001 --network <networkName> --name ginRedisApp gin-app:1.0"
```

🔥**发起一些API调用**。Postman、Hoppscotch甚至curl——任你选择！

让我们简化URL：

#### 1. 请求OTP

```bash
curl --location 'localhost:3001/api/getVerificationCode?email=something@gmail.com&username=shivamsourav'
```

这将返回OTP响应：

```
{
  "status": "true",
  "message": "OTP Generated successfully",
  "otp": "5486"
}
```

**2. 验证OTP**

```bash
curl --location 'localhost:3001/api/verifyCode' \
--header 'Content-Type: application/json' \
--data-raw '{
    "otp":2121,
    "email":"something@gmail.com"
}'
```

这将返回OTP验证响应：

```bash
{
  "status": "true",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6ImdtYWlsLmNvbSIsImV4cCI6MTY5ODc1ODIyNn0.eVrNACUY93g-5tu8fxb2BEOs1wn2iCe8wVpUYU6OLSE",
  "username": "shivamsourav",
  "message": "OTP authenticated successfully"
}
```

🎉 哇哦！通过简单的API调用，你已经创建了一个带有模拟的测试用例！进入Keploy目录，查看新生成的`test-1.yml`和`mocks.yml`

```yaml
version: api.keploy.io/v1beta2
kind: Http
name: test-1
spec:
  metadata: {}
  req:
    method: GET
    proto_major: 1
    proto_minor: 1
    url: http://localhost:3001/api/getVerificationCode?email=something@gmail.com&username=shivamsourav
    url_params:
      email: something@gmail.com
      username: shivamsourav
    header:
      Accept: "*/*"
      Accept-Encoding: gzip, deflate, br
      Connection: keep-alive
      Host: localhost:3001
      Postman-Token: 2db91281-a5bf-49e0-be0d-c6293c833910
      User-Agent: PostmanRuntime/7.33.0
    body: ""
    body_type: ""
  resp:
    status_code: 200
    header:
      Content-Length: "69"
      Content-Type: application/json; charset=utf-8
      Date: Tue, 31 Oct 2023 09:17:00 GMT
    body: '{"status":"true","message":"OTP Generated successfully","otp":"5486"}'
    body_type: ""
    status_message: ""
    proto_major: 0
    proto_minor: 0
  objects: []
  assertions:
    noise:
      - body.otp
      - header.Date
  created: 1698743822
curl: |
  curl --request GET \
  --url http://localhost:3001/api/getVerificationCode?email=something@gmail.com&username=shivamsourav \
  --header 'Host: localhost:3001' \
  --header 'Accept-Encoding: gzip, deflate, br' \
  --header 'Connection: keep-alive' \
  --header 'User-Agent: PostmanRuntime/7.33.0' \
  --header 'Accept: */*' \
  --header 'Postman-Token: 2db91281-a5bf-49e0-be0d-c6293c833910' \
```

这是生成的`mocks.yml`示例：

```yaml
  version: api.keploy.io/v1beta2
  kind: Generic
  name: mocks
  spec:
      metadata: {}
      genericrequests:
          - origin: client
          message:
              - type: string
              data: "*1\r\n$4\r\nping\r\n"
      genericresponses:
          - origin: server
          message:
              - type: string
              data: "+PONG\r\n"
  ---
  version: api.keploy.io/v1beta2
  kind: Generic
  name: mocks
  spec:
      metadata: {}
      genericrequests:
          - origin: client
          message:
              - type: string
              data: "*5\r\n$3\r\nset\r\n$19\r\nsomething@gmail.com\r\n$38\r\n{\"otp\":5486,\"username\":\"shivamsourav\"}\r\n$2\r\nex\r\n$5\r\n14400\r\n"
      genericresponses:
          - origin: server
          message:
              - type: string
              data: "+OK\r\n"
  ---
  version: api.keploy.io/v1beta2
  kind: Generic
  name: mocks
  spec:
      metadata: {}
      genericrequests:
          - origin: client
          message:
              - type: string
              data: "*2\r\n$3\r\nget\r\n$19\r\nsomething@gmail.com\r\n"
      genericresponses:
          - origin: server
          message:
              - type: string
              data: "$38\r\n{\"otp\":5486,\"username\":\"shivamsourav\"}\r\n"
```

想看看一切是否如预期般工作吗？

### 运行测试

是时候进行测试了 🧪

```shell
keploy test -c "sudo docker run -p 3001:3001 --rm --network <networkName> --name ginRedisApp gin-app:1.0" --delay 10
```

> `--delay`标志？哦，这只是让你的应用在测试用例到来之前稍作休息（以秒为单位）。

最后想法？深入探索！尝试不同的API调用，调整`mocks.yml`中的数据库响应，或者修改`test-x.yml`中的请求或响应。再次运行测试，看看魔法如何展开！✨👩‍💻👨‍💻✨

### 总结 🎉

恭喜你完成这段旅程！你已经见识了Keploy的强大，锻炼了编码肌肉，还玩得很开心！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

编码愉快！✨👩‍💻👨‍💻✨

**\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\_\_\_\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\***

## 在Linux/WSL上本地运行应用 🐧

我们将在Linux上直接运行示例应用，但为了让事情更有趣，我们将让数据库（Redis）在Docker上运行。准备好了吗？让我们开始派对吧！🎉

### 📼 开始录制 - 录制时间！

使用docker-compose启动Redis数据库：

```bash
docker compose up redis
```

我们将创建应用的二进制文件：

```bash
go build -o gin-redis
```

准备，设置，开始录制！方法如下：

```bash
sudo -E PATH=$PATH keploy record -c "./gin-redis"
```

好了，魔术师！应用已经启动并运行，让我们编织一些测试用例。咒语是什么？发起一些API调用！Postman、Hoppscotch或经典的curl——选择你的魔法棒。

#### 生成测试用例

要生成测试用例，我们只需要**发起一些API调用**。

**1. 请求OTP**

```bash
curl --location 'localhost:3001/api/getVerificationCode?email=something@gmail.com&username=shivamsourav'
```

这将返回OTP响应：

```json
{
  "status": "true",
  "message": "OTP Generated successfully",
  "otp": "5486"
}
```

**2. 验证OTP**

```bash
curl --location 'localhost:3001/api/verifyCode' \
--header 'Content-Type: application/json' \
--data-raw '{
    "otp":2121,
    "email":"something@gmail.com"
}'

```

这将返回OTP验证响应：

```json
{
  "status": "true",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6ImdtYWlsLmNvbSIsImV4cCI6MTY5ODc1ODIyNn0.eVrNACUY93g-5tu8fxb2BEOs1wn2iCe8wVpUYU6OLSE",
  "username": "shivamsourav",
  "message": "OTP authenticated successfully"
}
```

给自己一个鼓励！通过这个简单的咒语，你已经召唤出了一个带有模拟的测试用例！探索**Keploy目录**，你会在`test-1.yml`和`mocks.yml`中发现你的杰作。

```yaml
version: api.keploy.io/v1beta2
kind: Http
name: test-1
spec:
  metadata: {}
  req:
    method: GET
    proto_major: 1
    proto_minor: 1
    url: http://localhost:3001/api/getVerificationCode?email=something@gmail.com&username=shivamsourav
    url_params:
      email: something@gmail.com
      username: shivamsourav
    header:
      Accept: "*/*"
      Accept-Encoding: gzip, deflate, br
      Connection: keep-alive
      Host: localhost:3001
      Postman-Token: 2db91281-a5bf-49e0-be0d-c6293c833910
      User-Agent: PostmanRuntime/7.33.0
    body: ""
    body_type: ""
  resp:
    status_code: 200
    header:
      Content-Length: "69"
      Content-Type: application/json; charset=utf-8
      Date: Tue, 31 Oct 2023 09:17:00 GMT
    body: '{"status":"true","message":"OTP Generated successfully","otp":"5486"}'
    body_type: ""
    status_message: ""
    proto_major: 0
    proto_minor: 0
  objects: []
  assertions:
    noise:
      - body.otp
      - header.Date
  created: 1698743822
curl: |
  curl --request GET \
  --url http://localhost:3001/api/getVerificationCode?email=something@gmail.com&username=shivamsourav \
  --header 'Host: localhost:3001' \
  --header 'Accept-Encoding: gzip, deflate, br' \
  --header 'Connection: keep-alive' \
  --header 'User-Agent: PostmanRuntime/7.33.0' \
  --header 'Accept: */*' \
  --header 'Postman-Token: 2db91281-a5bf-49e0-be0d-c6293c833910' \
```

这是生成的`mocks.yml`示例：

```yaml
  version: api.keploy.io/v1beta2
  kind: Generic
  name: mocks
  spec:
      metadata: {}
      genericrequests:
          - origin: client
          message:
              - type: string
              data: "*1\r\n$4\r\nping\r\n"
      genericresponses:
          - origin: server
          message:
              - type: string
              data: "+PONG\r\n"
  ---
  version: api.keploy.io/v1beta2
  kind: Generic
  name: mocks
  spec:
      metadata: {}
      genericrequests:
          - origin: client
          message:
              - type: string
              data: "*5\r\n$3\r\nset\r\n$19\r\nsomething@gmail.com\r\n$38\r\n{\"otp\":5486,\"username\":\"shivamsourav\"}\r\n$2\r\nex\r\n$5\r\n14400\r\n"
      genericresponses:
          - origin: server
          message:
              - type: string
              data: "+OK\r\n"
  ---
  version: api.keploy.io/v1beta2
  kind: Generic
  name: mocks
  spec:
      metadata: {}
      genericrequests:
          - origin: client
          message:
              - type: string
              data: "*2\r\n$3\r\nget\r\n$19\r\nsomething@gmail.com\r\n"
      genericresponses:
          - origin: server
          message:
              - type: string
              data: "$38\r\n{\"otp\":5486,\"username\":\"shivamsourav\"}\r\n"
```

想看看一切是否如预期般工作吗？

### 运行测试

是时候进行测试了 🧪

```shell
sudo -E keploy test -c "./gin-redis" --delay 10
```

> `--delay`标志？哦，这只是让你的应用在测试用例到来之前稍作休息（以秒为单位）。

最后想法？深入探索！尝试不同的API调用，调整`mocks.yml`中的数据库响应，或者修改`test-x.yml`中的请求或响应。再次运行测试，看看魔法如何展开！✨👩‍💻👨‍💻✨

### 总结 🎉

恭喜你完成这段旅程！你已经见识了Keploy的强大，锻炼了编码肌肉，还玩得很开心！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。 😊🚀

希望这对你有所帮助，如果还有任何问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>