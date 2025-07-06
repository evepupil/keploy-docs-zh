---
id: samples-gin
title: URL短链应用示例(Golang)
sidebar_label: Gin + Mongo
description: 本示例应用展示如何将gin框架与Keploy平台结合使用。
tags:
  - go
  - quickstart
  - samples
  - examples
  - tutorial
  - mongodb
  - gin-framework
keyword:
  - Gin框架
  - MongoDB模拟
  - Golang
  - API测试生成器
  - 自动化测试用例生成
---

## 简介

🪄 深入URL短链器的世界，见证Keploy如何与Gin和MongoDB无缝集成。系好安全带，这将是一段有趣的旅程！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 克隆示例URL短链应用 🧪

```bash
git clone https://github.com/keploy/samples-go.git && cd samples-go/gin-mongo
go mod download
```

## 安装 📥

有两种方式可以运行此示例应用：

- [使用Docker compose：在Docker容器中运行应用及MongoDB](#使用docker-compose-)
- [使用Docker容器运行MongoDB并在本地运行应用](#在linuxwsl本地运行应用-)

## 使用Docker Compose 🐳

我们将使用Docker compose在Docker容器中运行应用和MongoDB。

### 准备，开始，录制！🎥

启动应用和MongoDB实例并开始Keploy录制。注意两个关键参数：
`-c`：运行应用的命令（如`docker compose up`）。

`--container-name`：`docker-compose.yml`中用于流量拦截的容器名称。

```bash
keploy record -c "docker compose up" --container-name "ginMongoApp"
```

看到如下日志？完美！👌

   <img src="/docs/img/code-snippets/keploy-record-docker.png" alt="Keploy录制测试用例" width="100%" />

🔥 挑战时间！生成一些测试用例。怎么做？只需**发起一些API调用**。可以使用Postman、Hoppscotch或curl！

让我们来缩短URL：

#### 生成短链

```bash
curl --request POST \
  --url http://localhost:8080/url \
  --header 'content-type: application/json' \
  --data '{
  "url": "https://google.com"
}'
```

返回结果示例：

```json
{
  "ts": 1645540022,
  "url": "http://localhost:8080/Lhr4BWAi"
}
```

🎉 哇哦！通过简单的API调用，你已经创建了包含模拟数据的测试用例！查看Keploy目录，会发现新生成的`test-1.yml`和`mocks.yml`。

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
    url: http://localhost:8080/url
    header:
      Accept: "*/*"
      Content-Length: "33"
      Content-Type: application/json
      Host: localhost:8080
      User-Agent: curl/7.77.0
    body: |-
      {
        "url": "https://google.com"
      }
    body_type: ""
  resp:
    status_code: 200
    header:
      Content-Length: "65"
      Content-Type: application/json; charset=utf-8
      Date: Sun, 01 Oct 2023 15:15:47 GMT
    body: '{"ts":1696173347979970488,"url":"http://localhost:8080/Lhr4BWAi"}'
    body_type: ""
    status_message: ""
    proto_major: 0
    proto_minor: 0
  objects: []
  assertions:
    noise:
      - header.Date
  created: 1696173352
```

生成的**mock.yml**示例如下：

```yaml
version: api.keploy.io/v1beta2
kind: Mongo
name: mocks
spec:
  metadata:
    operation: '{ OpMsg flags: 0, sections: [{ SectionSingle msg: {"update":"url-shortener","ordered":true,"writeConcern":{"w":"majority"},"lsid":{"id":{"$binary":{"base64":"eRaUQwDxR2qw3Jcbpn0Gfw==","subType":"04"}}},"$db":"keploy"} }, { SectionSingle identifier: updates , msgs: [ {"q":{"_id":"Lhr4BWAi"},"u":{"$set":{"_id":"Lhr4BWAi","created":{"$date":{"$numberLong":"1696173347975"}},"updated":{"$date":{"$numberLong":"1696173347975"}},"url":"https://google.com"}},"upsert":true} ] }], checksum: 0 }'
  requests:
    - header:
        length: 301
        requestId: 11
        responseTo: 0
        Opcode: 2013
      message:
        flagBits: 0
        sections:
          - '{ SectionSingle msg: {"update":"url-shortener","ordered":true,"writeConcern":{"w":"majority"},"lsid":{"id":{"$binary":{"base64":"eRaUQwDxR2qw3Jcbpn0Gfw==","subType":"04"}}},"$db":"keploy"} }'
          - '{ SectionSingle identifier: updates , msgs: [ {"q":{"_id":"Lhr4BWAi"},"u":{"$set":{"_id":"Lhr4BWAi","created":{"$date":{"$numberLong":"1696173347975"}},"updated":{"$date":{"$numberLong":"1696173347975"}},"url":"https://google.com"}},"upsert":true} ] }'
        checksum: 0
      read_delay: 41060962050
  responses:
    - header:
        length: 60
        requestId: 14
        responseTo: 11
        Opcode: 2013
      message:
        flagBits: 0
        sections:
          - '{ SectionSingle msg: {"n":{"$numberInt":"1"},"nModified":{"$numberInt":"1"},"ok":{"$numberDouble":"1.0"}} }'
        checksum: 0
      read_delay: 2506709
  created: 1696173347
```

_继续发起更多API调用！_
跟随短链重定向：

#### 通过短链跳转原始URL

```bash
curl --request GET \  --url http://localhost:8080/Lhr4BWAi
```

或者直接在浏览器输入`http://localhost:8080/Lhr4BWAi`。

发现项目中新增的测试和模拟文件了吗？击掌庆祝！🙌

<img src="/docs/img/code-snippets/gin-mongo-test-sample.png" alt="Gin MongoDB测试用例和模拟示例" width="100%" style={{ borderRadius: '5px' }}/>

想验证一切是否如预期工作？

### 运行测试 🏃‍♀️

测试时间到 🧪

```bash
keploy test -c "docker compose up" --container-name "ginMongoApp" --delay 10
```

> `--delay`参数？这是为了让你的应用在测试前有缓冲时间（单位：秒）。

测试结果应该如下所示：

<img src="/docs/img/code-snippets/url-shortner-test-result.png" alt="Gin MongoDB测试结果示例" width="100%" style={{ borderRadius: '5px' }}/>

注意到ts（时间戳）有差异了吗？时间总是这样！🕰️

别担心，只需将这些易变字段（如这里的**ts**）添加到**噪声参数**中即可**跳过这些断言**。

> 专业建议：在`test-x.yaml`中添加`body.ts`到noise。

<img src="/docs/img/code-snippets/noise-addition.png" alt="为Gin MongoDB测试用例添加噪声" width="70%" style={{ borderRadius: '5px' }}/>

再次运行`keploy record`命令，见证所有测试通过的时刻！🌟

最后建议？深入探索！尝试不同的API调用，调整`mocks.yml`中的数据库响应，或修改`test-x.yml`中的请求/响应。重新运行测试，看奇迹发生！✨👩‍💻👨‍💻✨

### 总结 🎉

恭喜完成这段旅程！你已经见识了Keploy的强大，锻炼了编码能力，还享受了乐趣！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

编码愉快！✨👩‍💻👨‍💻✨

---

## 在Linux/WSL本地运行应用 🐧

我们将在Linux上直接运行示例应用，但为了让事情更有趣，数据库（MongoDB）会在Docker中运行。准备好了吗？派对开始！🎉

如果在Windows上使用WSL，请用以下命令在用户主目录启动wsl：

```bash
wsl ~
```

首先，将`main.go`文件**第21行**的MongoDB URL更新为`localhost:27017`。

<img src="/docs/img/code-snippets/gin-mongo-linux-cmd.png" alt="Linux修改Gin MongoDB" width="100%" style={{ borderRadius: '5px' }}/>

### 🍃 启动MongoDB

用以下命令启动Mongo容器：

```bash
docker compose up mongo
```

### 📼 开始录制！

准备好录制：

```bash
keploy record -c "go run main.go handler.go"
```

注意`-c`参数！这是运行应用的命令。无论是`go run main.go handler.go`还是二进制路径如`./test-app-url-shortener`都可以。
如果看到类似下面的日志，说明一切正常：

   <img src="/docs/img/code-snippets/keploy-record-docker.png" alt="Keploy录制测试用例" width="100%" />
  
应用运行正常后，让我们创建测试用例。发起一些API调用！可以使用Postman、Hoppscotch或curl。

#### 生成短链

✨ 施展URL魔法：

```bash
curl --request POST \
  --url http://localhost:8080/url \
  --header 'content-type: application/json' \
  --data '{
  "url": "https://google.com"
}'
```

短链生成结果：

```json
{
  "ts": 1645540022,
  "url": "http://localhost:8080/Lhr4BWAi"
}
```

给自己点个赞！通过这个简单的命令，你已经创建了包含模拟数据的测试用例！查看**Keploy目录**，会发现`test-1.yml`和`mocks.yml`。

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
    url: http://localhost:8080/url
    header:
      Accept: "*/*"
      Content-Length: "33"
      Content-Type: application/json
      Host: localhost:8080
      User-Agent: curl/7.77.0
    body: |-
      {
        "url": "https://google.com"
      }
    body_type: ""
  resp:
    status_code: 200
    header:
      Content-Length: "65"
      Content-Type: application/json; charset=utf-8
      Date: Sun, 01 Oct 2023 15:15:47 GMT
    body: '{"ts":1696173347979970488,"url":"http://localhost:8080/Lhr4BWAi"}'
    body_type: ""
    status_message: ""
    proto_major: 0
    proto_minor: 0
  objects: []
  assertions:
    noise:
      - header.Date
  created: 1696173352
```

生成的**mock.yml**示例如下：

```yaml
version: api.keploy.io/v1beta2
kind: Mongo
name: mocks
spec:
  metadata:
    operation: '{ OpMsg flags: 0, sections: [{ SectionSingle msg: {"update":"url-shortener","ordered":true,"writeConcern":{"w":"majority"},"lsid":{"id":{"$binary":{"base64":"eRaUQwDxR2qw3Jcbpn0Gfw==","subType":"04"}}},"$db":"keploy"} }, { SectionSingle identifier: updates , msgs: [ {"q":{"_id":"Lhr4BWAi"},"u":{"$set":{"_id":"Lhr4BWAi","created":{"$date":{"$numberLong":"1696173347975"}},"updated":{"$date":{"$numberLong":"1696173347975"}},"url":"https://google.com"}},"upsert":true} ] }], checksum: 0 }'
  requests:
    - header:
        length: 301
        requestId: 11
        responseTo: 0
        Opcode: 2013
      message:
        flagBits: 0
        sections:
          - '{ SectionSingle msg: {"update":"url-shortener","ordered":true,"writeConcern":{"w":"majority"},"lsid":{"id":{"$binary":{"base64":"eRaUQwDxR2qw3Jcbpn0Gfw==","subType":"04"}}},"$db":"keploy"} }'
          - '{ SectionSingle identifier: updates , msgs: [ {"q":{"_id":"Lhr4BWAi"},"u":{"$set":{"_id":"Lhr4BWAi","created":{"$date":{"$numberLong":"1696173347975"}},"updated":{"$date":{"$numberLong":"1696173347975"}},"url":"https://google.com"}},"upsert":true} ] }'
        checksum: 0
      read_delay: 41060962050
  responses:
    - header:
        length: 60
        requestId: 14
        responseTo: 11
        Opcode: 2013
      message:
        flagBits: 0
        sections:
          - '{ SectionSingle msg: {"n":{"$numberInt":"1"},"nModified":{"$numberInt":"1"},"ok":{"$numberDouble":"1.0"}} }'
        checksum: 0
      read_delay: 2506709
  created: 1696173347
```

_继续发起更多API调用！_
跟随短链重定向：

#### 通过短链跳转原始URL

```bash
curl --request GET \  --url http://localhost:8080/Lhr4BWAi
```

或者直接在浏览器输入`http://localhost:8080/Lhr4BWAi`。

发现项目中新增的测试和模拟文件了吗？击掌庆祝！🙌

<img src="/docs/img/code-snippets/gin-mongo-test-sample.png" alt="Gin MongoDB测试用例和模拟示例" width="100%" style={{ borderRadius: '5px' }}/>

想验证一切是否如预期工作？

### 🏃‍♀️ 运行测试

测试时间到 🧪

```bash
keploy test -c "docker compose up" --container-name "ginMongoApp" --delay 10
```

> `--delay`参数？这是为了让你的应用在测试前有缓冲时间（单位：秒）。

测试结果应该如下所示：

<img src="/docs/img/code-snippets/url-shortner-test-result.png" alt="Gin MongoDB测试结果示例" width="100%" style={{ borderRadius: '5px' }}/>

注意到ts（时间戳）有差异了吗？时间总是这样！🕰️

别担心，只需将这些易变字段（如这里的**ts**）添加到**噪声参数**中即可**跳过这些断言**。

> 专业建议：在`test-x.yaml`中添加`body.ts`到noise。

<img src="/docs/img/code-snippets/noise-addition.png" alt="为Gin MongoDB测试用例添加噪声" width="70%" style={{ borderRadius: '5px' }}/>

再次运行`keploy test`命令，见证所有测试通过的时刻！🌟

最后建议？深入探索！尝试不同的API调用，调整`mocks.yml`中的数据库响应，或修改`test-x.yml`中的请求/响应。重新运行测试，看奇迹发生！✨👩‍💻👨‍💻✨

### 🎉 总结

恭喜完成这段旅程！你已经见识了Keploy的强大，锻炼了编码能力，还享受了乐趣！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

如有任何问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>