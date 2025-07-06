---
id: sanic-mongo
title: 示例电影管理应用（Sanic + Mongo）
sidebar_label: Sanic + Mongo
description: 该应用是一个简单的电影管理API，使用Python的Sanic框架构建，MongoDB作为数据存储。支持对电影记录进行基础的CRUD（创建、读取、更新、删除）操作。

tags:
  - python
  - quickstart
  - samples
  - examples
  - tutorial
  - python-framework
  - sanic
  - postgres
  - sms
  - Mongo
keyword:
  - FastAPI框架
  - MongoDB
  - Sanic
  - Python
  - API测试生成器
  - 自动化用例生成
---

## 简介

该应用是一个简单的电影管理API，使用Python的Sanic框架构建，MongoDB作为数据存储。支持对电影记录进行基础的CRUD（创建、读取、更新、删除）操作。

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

# 快速开始！🎬

## 克隆应用 🧪

```bash
git clone https://github.com/keploy/samples-python.git && cd samples-python/sanic-mongo
```

## 下载requirements.txt文件并设置数据库

进入应用目录并运行：

```shell
pip3 install -r requirements.txt
```

打开新终端窗口，通过docker设置MongoDB：

```shell
sudo docker network create keploy-network
```

```shell
docker run -p 27017:27017 -d --rm --name mongoDB --net keploy-network mongo
```

## 灯光、摄影、录制！🎥

捕获测试用例：

```shell
keploy record -c "python3 server.py"
```

终端将显示如下内容：

<img src="/docs/img/sanic-mongo-record.png" alt="Sanic Mongo录制示例" width="100%" style={{ borderRadius: '5px' }} />

🔥**发起一些API调用**。可以使用Postman、Hoppscotch或curl工具。

## 生成测试用例

只需**发起API调用**即可生成测试用例：

1. **发起POST请求**：

```bash
  curl -X "POST" "http://127.0.0.1:8000/add_movie" \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json; charset=utf-8' \
    -d '{
        "name": "Whiplash"
    }'
```

2. **发起GET请求**：

```bash
  curl -X "GET" "http://127.0.0.1:8000/movies" \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json; charset=utf-8'
```

3. **发起DELETE请求**：

```bash
  curl -X "DELETE" "http://127.0.0.1:8000/movies" \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json; charset=utf-8'
```

录制完成后停止即可。此时已在`tests`目录和`mocks.yml`中生成测试用例。以下是模拟数据的示例：

```yaml
version: api.keploy.io/v1beta1
kind: Mongo
name: mock-0
spec:
  metadata:
    operation: '{ OpQuery flags: [], fullCollectionName: admin.$cmd, numberToSkip: 0, numberToReturn: -1, query: {"ismaster": {"$numberInt":"1"},"helloOk": true,"client": {"driver": {"name": "PyMongo|Motor","version": "4.6.3|3.4.0"},"os": {"type": "Linux","name": "Linux","architecture": "x86_64","version": "5.15.146.1-microsoft-standard-WSL2"},"platform": "CPython 3.10.12.final.0|asyncio"}}, returnFieldsSelector:  }'
    type: config
  requests:
    - header:
        length: 303
        requestId: 1804289383
        responseTo: 0
        Opcode: 2004
      message:
        flags: 0
        collection_name: admin.$cmd
        number_to_skip: 0
        number_to_return: -1
        query: '{"ismaster":{"$numberInt":"1"},"helloOk":true,"client":{"driver":{"name":"PyMongo|Motor","version":"4.6.3|3.4.0"},"os":{"type":"Linux","name":"Linux","architecture":"x86_64","version":"5.15.146.1-microsoft-standard-WSL2"},"platform":"CPython 3.10.12.final.0|asyncio"}}'
        return_fields_selector: ""
  responses:
    - header:
        length: 329
        requestId: 13
        responseTo: 1804289383
        Opcode: 1
      message:
        response_flags: 8
        cursor_id: 0
        starting_from: 0
        number_returned: 1
        documents:
          - '{"helloOk":true,"ismaster":true,"topologyVersion":{"processId":{"$oid":"667b1d2066b0c1d16885b016"},"counter":{"$numberLong":"0"}},"maxBsonObjectSize":{"$numberInt":"16777216"},"maxMessageSizeBytes":{"$numberInt":"48000000"},"maxWriteBatchSize":{"$numberInt":"100000"},"localTime":{"$date":{"$numberLong":"1719344783026"}},"logicalSessionTimeoutMinutes":{"$numberInt":"30"},"connectionId":{"$numberInt":"4"},"minWireVersion":{"$numberInt":"0"},"maxWireVersion":{"$numberInt":"21"},"readOnly":false,"ok":{"$numberDouble":"1.0"}}'
      read_delay: 560917
  created: 1719344783
  reqTimestampMock: 2024-06-26T01:16:23.025984506+05:30
  resTimestampMock: 2024-06-26T01:16:23.026710262+05:30
```

## **开始测试 🧪**:

```bash
 keploy test -c "python server.py"
```

终端输出示例如下：

<img src="/docs/img/sanic-mongo-test.png" alt="Sanic Mongo测试示例" width="100%" style={{ borderRadius: '5px' }} />

您可以尝试不同的API调用，修改mocks.yml中的数据库响应，或调整test-x.yml中的请求/响应参数，然后重新运行测试观察变化。