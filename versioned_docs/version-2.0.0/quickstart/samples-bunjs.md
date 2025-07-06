---
id: samples-bunjs
title: BunJS 示例应用
sidebar_label: BunJS + Mongo
description: 以下示例应用展示了如何使用 BunJS 框架和 Keploy 平台。
tags:
  - javascript
  - quickstart
  - samples
  - examples
  - tutorial
  - bun-js-framework
  - mongodb
keyword:
  - BunJS 框架
  - MongoDB
  - BunJS
  - API 测试生成器
  - 自动化测试用例生成
  - javascript
  - typescript
---

# 简介

这是一个使用 Bun.js 和 MongoDB 测试 Keploy 集成能力的示例应用。

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 开始使用！🎬

## 克隆用户数据 CRUD 示例应用 🧪

```bash
git clone https://github.com/keploy/samples-typescript && cd samples-typescript/bun-mongo

# 首先安装 bun，然后使用以下命令安装依赖：

bun install
```

## 安装 Keploy

根据您的操作系统选择安装方式：

有两种方式可以运行此示例应用。

- [使用 Docker 容器运行 Postgres 并在本地运行应用](#在-linuxwsl-上本地运行应用)

## 在 Linux/WSL 上本地运行应用 🐧

我们将在 Linux 上直接运行示例应用，但为了让事情更有趣，我们将把数据库（MongoDB）放在 Docker 中运行。准备好了吗？让我们开始吧！🎉

### 📼 开始录制 - 记录时间！

安装依赖。注意：直接使用此命令而不安装 bun 可能会报错，如 `zsh: command not found: bun`

```bash
bun install
```

此命令将创建一个名为 `keploy-network` 的新 docker 网络：

```bash
docker network create keploy-network
```

使用 docker-compose 文件启动 Postgres 实例：

```bash
docker-compose up -d mongo
```

准备就绪，开始录制！方法如下：

```bash
sudo -E env PATH=$PATH Keploy record -c 'bun run supabun.ts'
```

注意 `-c` 标志！这是运行应用的命令。

好了，魔术师！应用已经启动并运行，让我们生成一些测试用例。方法是什么？发送一些 API 请求！可以使用 Postman、Hoppscotch 或经典的 curl。

### 生成测试用例

要生成测试用例，我们只需要**发送一些 API 请求**。

**1. 发送 POST 请求**

```bash
curl --request POST localhost:4200/save

```

**2. 发送 GET 请求**

```bash
curl --request GET localhost:4200/fetch
```

给自己一个鼓励！通过这个简单的操作，您已经生成了一个带有模拟数据的测试用例！查看 **Keploy 目录**，您会在 `test-1.yml` 和 `mocks.yml` 中找到您的工作成果。

````yaml
version: api.keploy.io/v1beta1
kind: Http
name: test-1
spec:
  metadata: {}
  req:
    method: POST
    proto_major: 1
    proto_minor: 1
    url: http://localhost:4200/save
    header:
      Accept: "*/*"
      Host: localhost:4200
      User-Agent: curl/8.2.1
    body: ""
    timestamp: 2024-02-24T11:16:49.156825536Z
  resp:
    status_code: 200
    header:
      Access-Control-Allow-Credentials: "true"
      Access-Control-Allow-Headers: "*"
      Access-Control-Allow-Methods: POST
      Access-Control-Allow-Origin: "*"
      Access-Control-Exposed-Headers: "*"
      Content-Length: "16"
      Content-Type: application/json;charset=utf-8
      Date: Sat, 24 Feb 2024 11:16:49 GMT
      Vary: "*"
    body: '{"success":true}'
    status_message: OK
    proto_major: 0
    proto_minor: 0
    timestamp: 2024-02-24T11:16:51.280382177Z
  objects: []
  assertions:
    noise:
      header.Date: []
  created: 1708773411
curl: |
  curl --request POST \
    --url http://localhost:4200/save \
    --header 'User-Agent: curl/8.2.1' \
    --header 'Accept: */*' \
    --header 'Host: localhost:4200' \


```yaml
---
version: api.keploy.io/v1beta1
kind: Mongo
name: mock-0
spec:
    metadata:
        operation: '{ OpQuery flags: [], fullCollectionName: admin.$cmd, numberToSkip: 0, numberToReturn: -1, query: {"ismaster": {"$numberInt":"1"},"helloOk": true,"client": {"driver": {"name": "nodejs|Mongoose","version": "5.9.1|7.6.8"},"platform": "Bun v1.0.29, LE","os": {"name": "linux","architecture": "x64","version": "6.5.0-17-generic","type": "Linux"}},"compression": ["none"]}, returnFieldsSelector:  }'
        type: config
    requests:
        - header:
            length: 298
            requestId: 1
            responseTo: 0
            Opcode: 2004
          message:
            flags: 0
            collection_name: admin.$cmd
            number_to_skip: 0
            number_to_return: -1
            query: '{"ismaster":{"$numberInt":"1"},"helloOk":true,"client":{"driver":{"name":"nodejs|Mongoose","version":"5.9.1|7.6.8"},"platform":"Bun v1.0.29, LE","os":{"name":"linux","architecture":"x64","version":"6.5.0-17-generic","type":"Linux"}},"compression":["none"]}'
            return_fields_selector: ""
    responses:
        - header:
            length: 329
            requestId: 3
            responseTo: 1
            Opcode: 1
          message:
            response_flags: 8
            cursor_id: 0
            starting_from: 0
            number_returned: 1
            documents:
                - '{"helloOk":true,"ismaster":true,"topologyVersion":{"processId":{"$oid":"65d9cff2df019fd437739fbf"},"counter":{"$numberLong":"0"}},"maxBsonObjectSize":{"$numberInt":"16777216"},"maxMessageSizeBytes":{"$numberInt":"48000000"},"maxWriteBatchSize":{"$numberInt":"100000"},"localTime":{"$date":{"$numberLong":"1708773364196"}},"logicalSessionTimeoutMinutes":{"$numberInt":"30"},"connectionId":{"$numberInt":"1"},"minWireVersion":{"$numberInt":"0"},"maxWireVersion":{"$numberInt":"21"},"readOnly":false,"ok":{"$numberDouble":"1.0"}}'
          read_delay: 623599
    created: 1708773364
    reqTimestampMock: 2024-02-24T11:16:04.196109922Z
    resTimestampMock: 2024-02-24T11:16:04.197231354Z
---
version: api.keploy.io/v1beta1
kind: Mongo
name: mock-1
spec:
    metadata:
        operation: '{ OpMsg flags: 0, sections: [{ SectionSingle msg: {"create":"animals","lsid":{"id":{"$binary":{"base64":"zOPs0UhFTzaDZlU+iad5xg==","subType":"04"}}},"$db":"keploy"} }], checksum: 0 }'
    requests:
        - header:
            length: 98
            requestId: 3
            responseTo: 0
            Opcode: 2013
          message:
            flagBits: 0
            sections:
                - '{ SectionSingle msg: {"create":"animals","lsid":{"id":{"$binary":{"base64":"zOPs0UhFTzaDZlU+iad5xg==","subType":"04"}}},"$db":"keploy"} }'
            checksum: 0
          read_delay: 6520498
    responses:
        - header:
            length: 38
            requestId: 5
            responseTo: 3
            Opcode: 2013
          message:
            flagBits: 0
            sections:
                - '{ SectionSingle msg: {"ok":{"$numberDouble":"1.0"}} }'
            checksum: 0
          read_delay: 602253
    created: 1708773364
    reqTimestampMock: 2024-02-24T11:16:04.254900776Z
    resTimestampMock: 2024-02-24T11:16:04.25581579Z
---
version: api.keploy.io/v1beta1
kind: Mongo
name: mock-2
spec:
    metadata:
        operation: '{ OpMsg flags: 65536, sections: [{ SectionSingle msg: {"hello":{"$numberInt":"1"},"maxAwaitTimeMS":{"$numberInt":"10000"},"topologyVersion":{"processId":{"$oid":"65d9cff2df019fd437739fbf"},"counter":{"$numberLong":"0"}},"$db":"admin"} }], checksum: 0 }'
        type: config
    requests:
        - header:
            length: 134
            requestId: 4
            responseTo: 0
            Opcode: 2013
          message:
            flagBits: 65536
            sections:
                - '{ SectionSingle msg: {"hello":{"$numberInt":"1"},"maxAwaitTimeMS":{"$numberInt":"10000"},"topologyVersion":{"processId":{"$oid":"65d9cff2df019fd437739fbf"},"counter":{"$numberLong":"0"}},"$db":"admin"} }'
            checksum: 0
          read_delay: 531789033
    responses:
        - header:
            length: 313
            requestId: 6
            responseTo: 4
            Opcode: 2013
          message:
            flagBits: 2
            sections:
                - '{ SectionSingle msg: {"isWritablePrimary":true,"topologyVersion":{"processId":{"$oid":"65d9cff2df019fd437739fbf"},"counter":{"$numberLong":"0"}},"maxBsonObjectSize":{"$numberInt":"16777216"},"maxMessageSizeBytes":{"$numberInt":"48000000"},"maxWriteBatchSize":{"$numberInt":"100000"},"localTime":{"$date":{"$numberLong":"1708773374735"}},"logicalSessionTimeoutMinutes":{"$numberInt":"30"},"connectionId":{"$numberInt":"1"},"minWireVersion":{"$numberInt":"0"},"maxWireVersion":{"$numberInt":"21"},"readOnly":false,"ok":{"$numberDouble":"1.0"}} }'
            checksum: 0
          read_delay: 10006875186
    created: 1708773374
    reqTimestampMock: 2024-02-24T11:16:04.728966188Z
    resTimestampMock: 2024-02-24T11:16:14.736354258Z
---
version: api.keploy.io/v1beta1
kind: Mongo
name: mock-3
spec:
    metadata:
        operation: '{ OpMsg flags: 0, sections: [{ SectionSingle msg: {"ismaster":{"$numberInt":"1"},"$db":"admin"} }], checksum: 0 }'
        type: config
    requests:
        - header:
            length: 55
            requestId: 6
            responseTo: 0
            Opcode: 2013
          message:
            flagBits: 0
            sections:
                - '{ SectionSingle msg: {"ismaster":{"$numberInt":"1"},"$db":"admin"} }'
            checksum: 0
          read_delay: 10013801234
    responses:
        - header:
            length: 304
            requestId: 9
            responseTo: 6
            Opcode: 2013
          message:
            flagBits: 0
            sections:
                - '{ SectionSingle msg: {"ismaster":true,"topologyVersion":{"processId":{"$oid":"65d9cff2df019fd437739fbf"},"counter":{"$numberLong":"0"}},"maxBsonObjectSize":{"$numberInt":"16777216"},"maxMessageSizeBytes":{"$numberInt":"48000000"},"maxWriteBatchSize":{"$numberInt":"100000"},"localTime":{"$date":{"$numberLong":"1708773384750"}},"logicalSessionTimeoutMinutes":{"$numberInt":"30"},"connectionId":{"$numberInt":"3"},"minWireVersion":{"$numberInt":"0"},"maxWireVersion":{"$numberInt":"21"},"readOnly":false,"ok":{"$numberDouble":"1.0"}} }'
            checksum: 0
          read_delay: 361888
    created: 1708773384
    reqTimestampMock: 2024-02-24T11:16:24.750477084Z
    resTimestampMock: 2024-02-24T11:16:24.751206134Z
---
version: api.keploy.io/v1beta1
kind: Mongo
name: mock-4
spec:
    metadata:
        operation: '{ OpMsg flags: 0, sections: [{ SectionSingle msg: {"insert":"animals","documents":[{"name":"Cow","sound":"Moo","_id":{"$oid":"65d9d02107882a00d23b5ac0"},"__v":{"$numberInt":"0"}}],"ordered":true,"lsid":{"id":{"$binary":{"base64":"zOPs0UhFTzaDZlU+iad5xg==","subType":"04"}}},"$db":"keploy"} }], checksum: 0 }'
    requests:
        - header:
            length: 187
            requestId: 9
            responseTo: 0
            Opcode: 2013
          message:
            flagBits: 0
            sections:
                - '{ SectionSingle msg: {"insert":"animals","documents":[{"name":"Cow","sound":"Moo","_id":{"$oid":"65d9d02107882a00d23b5ac0"},"__v":{"$numberInt":"0"}}],"ordered":true,"lsid":{"id":{"$binary":{"base64":"zOPs0UhFTzaDZlU+iad5xg==","subType":"04"}}},"$db":"keploy"} }'
            checksum: 0
          read_delay: 44940206029
    responses:
        - header:
            length: 45
            requestId: 14
            responseTo: 9
            Opcode: 2013
          message:
            flagBits: 0
            sections:
                - '{ SectionSingle msg: {"n":{"$numberInt":"1"},"ok":{"$numberDouble":"1.0"}} }'
            checksum: 0
          read_delay: 4726351
    created: 1708773409
    reqTimestampMock: 2024-02-24T11:16:49.196056727Z
    resTimestampMock: 2024-02-24T11:16:49.201252579Z
---
version: api.keploy.io/v1beta1
kind: Mongo
name: mock-5
spec:
    metadata:
        operation: '{ OpMsg flags: 0, sections: [{ SectionSingle msg: {"find":"animals","filter":{"name":"Cow"},"limit":{"$numberInt":"1"},"singleBatch":true,"batchSize":{"$numberInt":"1"},"lsid":{"id":{"$binary":{"base64":"zOPs0UhFTzaDZlU+iad5xg==","subType":"04"}}},"$db":"keploy"} }], checksum: 0 }'
    requests:
        - header:
            length: 163
            requestId: 11
            responseTo: 0
            Opcode: 2013
          message:
            flagBits: 0
            sections:
                - '{ SectionSingle msg: {"find":"animals","filter":{"name":"Cow"},"limit":{"$numberInt":"1"},"singleBatch":true,"batchSize":{"$numberInt":"1"},"lsid":{"id":{"$binary":{"base64":"zOPs0UhFTzaDZlU+iad5xg==","subType":"04"}}},"$db":"keploy"} }'
            checksum: 0
          read_delay: 8924817543
    responses:
        - header:
            length: 166
            requestId: 17
            responseTo: 11
            Opcode: 2013
          message:
            flagBits: 0
            sections:
                - '{ SectionSingle msg: {"cursor":{"firstBatch":[{"_id":{"$oid":"65d9cd7b1052611b2d2aaf42"},"name":"Cow","sound":"Moo","__v":{"$numberInt":"0"}}],"id":{"$numberLong":"0"},"ns":"keploy.animals"},"ok":{"$numberDouble":"1.0"}} }'
            checksum: 0
          read_delay: 574025
    created: 1708773418
    reqTimestampMock: 2024-02-24T11:16:58.126078397Z
    resTimestampMock: 2024-02-24T11:16:58.127001556Z

````

想看看一切是否按预期工作吗？

#### 运行测试

是时候进行测试了 🧪

```shell
sudo -E env PATH=$PATH keploy test -c 'bun run supabun.ts'
```

> `--delay` 标志？哦，这只是让您的应用在测试用例运行前稍作休息（以秒为单位）。

最后有什么想法？深入探索！尝试不同的 API 调用，在 `mocks.yml` 中调整数据库响应，或者在 `test-x.yml` 中修改请求或响应。再次运行测试，看看会发生什么！✨👩‍💻👨‍💻✨

### 总结 🎉

恭喜您完成了这段旅程！您已经见识了 Keploy 的强大功能，锻炼了编码能力，还玩得开心！现在，继续探索、创新和创造吧！记住，只要有合适的工具和一点乐趣，一切皆有可能。😊🚀

希望这对您有所帮助，如果还有任何问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>