---
id: samples-fastapi
title: 学生数据CRUD应用示例（FastAPI）
sidebar_label: FastAPI + Postgres
description: 以下示例应用展示了如何使用FastAPI框架和Keploy平台。
tags:
  - python
  - quickstart
  - samples
  - examples
  - tutorial
  - python-framework
  - fast-api-framework
  - postgres
keyword:
  - FastAPI框架
  - Postgres
  - SQL
  - Python
  - API测试生成器
  - 自动化用例生成
---

# 简介

🪄 深入用户CRUD应用的世界，看看Keploy如何与FastAPI和[PostgreSQL](https://www.postgresql.org/)无缝集成。系好安全带，这将是一段有趣的旅程！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 设置PostgreSQL数据库 📦

## 克隆学生数据CRUD示例应用 🧪

```bash
git clone https://github.com/keploy/samples-python.git && cd samples-python/fastapi-postgres
```

## 安装Keploy

根据您的操作系统选择安装方式：

有两种方式可以运行此示例应用：

- [使用Docker compose：在Docker容器中运行应用及Postgres](#使用docker-compose-)
- [使用Docker容器运行Postgres并在本地运行应用](#在linuxwsl上本地运行应用-)

## 使用Docker Compose 🐳

我们将使用Docker compose在Docker容器中运行应用和Postgres。

### 开始录制测试用例！ 🎥

捕获测试用例：

```shell
keploy record -c "docker compose up" --container-name "fastapi-app" --build-delay 50
```

🔥**发起一些API调用**。可以使用Postman、Hoppscotch或curl。

简化URL示例：

### 生成测试用例

只需**发起一些API调用**即可生成测试用例。

**1. 发起POST请求**

```bash
curl --location 'http://127.0.0.1:8000/students/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Eva White",
    "email": "evawhite@example.com",
    "password": "evawhite111"
    }'
```

**2. 发起GET请求**

```bash
curl --location 'http://127.0.0.1:8000/students/'
```

**3. 发起PUT请求**

```bash
curl --location --request PUT 'http://127.0.0.1:8000/students/1' \
--header 'Content-Type: application/json' \
--data-raw '    {
        "name": "John Dow",
        "email": "doe.john@example.com",
        "password": "johndoe123",
        "stream": "Arts"
    }'
```

**4. 发起GET请求**

```bash
curl --location 'http://127.0.0.1:8000/students/1'
```

**5. 发起DELETE请求**

```bash
curl --location --request DELETE 'http://127.0.0.1:8000/students/1'
```

恭喜！通过这些简单的命令，您已经生成了一个包含模拟数据的测试用例！在**Keploy目录**中，您可以看到生成的`test-1.yml`和`mocks.yml`文件。

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
    url: http://127.0.0.1:8000/students/
    header:
      Accept: "*/*"
      Host: 127.0.0.1:8000
      User-Agent: curl/7.81.0
    body: ""
    body_type: ""
    timestamp: 2023-11-06T10:42:43.046337785+05:30
  resp:
    status_code: 404
    header:
      Content-Length: "29"
      Content-Type: application/json
      Date: Mon, 06 Nov 2023 05:12:42 GMT
      Server: uvicorn
    body: '{"detail":"Data not found!!"}'
    body_type: ""
    status_message: ""
    proto_major: 0
    proto_minor: 0
    timestamp: 2023-11-06T10:42:45.959907593+05:30
  objects: []
  assertions:
    noise:
      - header.Date
  created: 1699247565
curl: |
  curl --request GET \
  --url http://127.0.0.1:8000/students/ \
  --header 'User-Agent: curl/7.81.0' \
  --header 'Accept: */*' \
  --header 'Host: 127.0.0.1:8000' \
```

`mocks.yml`文件内容示例：

```yaml
  version: api.keploy.io/v1beta2
  kind: Postgres
  name: mocks
  spec:
      metadata: {}
      postgresrequests:
          - header: [Q]
          identifier: ClientRequest
          length: 8
          query:
              string: SELECT students."ID" AS "students_ID", students."Name" AS "students_Name", students."Email" AS "students_Email", students."Hashed Password" AS "students_Hashed Password", students."Subject Stream" AS "students_Subject Stream" FROM students LIMIT 100 OFFSET 0
          msg_type: 81
          auth_type: 0
      postgresresponses:
          - header: [T, C, Z]
          identifier: ServerResponse
          length: 8
          authentication_md5_password:
              salt:
                  - 0
                  - 0
                  - 0
                  - 0
          command_complete:
              - command_tag:
                  - 83
                  - 69
                  - 76
                  - 69
                  - 67
                  - 84
                  - 32
                  - 48
          ready_for_query:
              txstatus: 84
          row_description: {fields: [{name: [115, 116, 117, 100, 101, 110, 116, 115, 95, 73, 68], table_oid: 24577, table_attribute_number: 1, data_type_oid: 23, data_type_size: 4, type_modifier: -1, format: 0}, {name: [115, 116, 117, 100, 101, 110, 116, 115, 95, 78, 97, 109, 101], table_oid: 24577, table_attribute_number: 2, data_type_oid: 1043, data_type_size: -1, type_modifier: -1, format: 0}, {name: [115, 116, 117, 100, 101, 110, 116, 115, 95, 69, 109, 97, 105, 108], table_oid: 24577, table_attribute_number: 3, data_type_oid: 1043, data_type_size: -1, type_modifier: -1, format: 0}, {name: [115, 116, 117, 100, 101, 110, 116, 115, 95, 72, 97, 115, 104, 101, 100, 32, 80, 97, 115, 115, 119, 111, 114, 100], table_oid: 24577, table_attribute_number: 4, data_type_oid: 1043, data_type_size: -1, type_modifier: -1, format: 0}, {name: [115, 116, 117, 100, 101, 110, 116, 115, 95, 83, 117, 98, 106, 101, 99, 116, 32, 83, 116, 114, 101, 97, 109], table_oid: 24577, table_attribute_number: 5, data_type_oid: 1043, data_type_size: -1, type_modifier: -1, format: 0}]}
          msg_type: 90
          auth_type: 0
      reqtimestampmock: 2023-11-06T10:42:43.063446464+05:30
      restimestampmock: 2023-11-06T10:42:43.063544657+05:30
```

想验证一切是否按预期工作？

#### 运行测试

是时候进行测试了 🧪

```shell
keploy test -c "docker compose up" --container-name "fastapi-app" --build-delay 50  --delay 10
```

> `--delay`标志？这是为了让您的应用在测试用例运行前有短暂的准备时间（以秒计）。

最后建议？深入探索！尝试不同的API调用，调整`mocks.yml`中的数据库响应，或修改`test-x.yml`中的请求或响应。再次运行测试，见证奇迹发生！✨👩‍💻👨‍💻✨

### 总结 🎉

恭喜您完成这段旅程！您已经体验了Keploy的强大功能，锻炼了编码能力，还享受了一些乐趣！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

编码愉快！ ✨👩‍💻👨‍💻✨

**\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\_\_\_\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\***

## 在Linux/WSL上本地运行应用 🐧

我们将在Linux上直接运行示例应用，但为了让事情更有趣，数据库（PostgreSQL）将在Docker中运行。准备好了吗？让我们开始派对吧！🎉

### 📼 开始录制！

准备好录制：

```bash
keploy record -c "uvicorn application.main:app --reload"
```

注意`-c`标志！这是运行应用的命令。

应用运行起来后，让我们生成一些测试用例。方法？发起一些API调用！可以使用Postman、Hoppscotch或经典的curl。

### 生成测试用例

只需**发起一些API调用**即可生成测试用例。

**1. 发起POST请求**

```bash
curl --location 'http://127.0.0.1:8000/students/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Eva White",
    "email": "evawhite@example.com",
    "password": "evawhite111"
    }'
```

**2. 发起GET请求**

```bash
curl --location 'http://127.0.0.1:8000/students/'
```

**3. 发起PUT请求**

```bash
curl --location --request PUT 'http://127.0.0.1:8000/students/1' \
--header 'Content-Type: application/json' \
--data-raw '    {
        "name": "John Dow",
        "email": "doe.john@example.com",
        "password": "johndoe123",
        "stream": "Arts"
    }'
```

**4. 发起GET请求**

```bash
curl --location 'http://127.0.0.1:8000/students/1'
```

**5. 发起DELETE请求**

```bash
curl --location --request DELETE 'http://127.0.0.1:8000/students/1'
```

恭喜！通过这些简单的命令，您已经生成了一个包含模拟数据的测试用例！在**Keploy目录**中，您可以看到生成的`test-1.yml`和`mocks.yml`文件。

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
    url: http://127.0.0.1:8000/students/
    header:
      Accept: "*/*"
      Host: 127.0.0.1:8000
      User-Agent: curl/7.81.0
    body: ""
    body_type: ""
    timestamp: 2023-11-06T10:42:43.046337785+05:30
  resp:
    status_code: 404
    header:
      Content-Length: "29"
      Content-Type: application/json
      Date: Mon, 06 Nov 2023 05:12:42 GMT
      Server: uvicorn
    body: '{"detail":"Data not found!!"}'
    body_type: ""
    status_message: ""
    proto_major: 0
    proto_minor: 0
    timestamp: 2023-11-06T10:42:45.959907593+05:30
  objects: []
  assertions:
    noise:
      - header.Date
  created: 1699247565
curl: |
  curl --request GET \
  --url http://127.0.0.1:8000/students/ \
  --header 'User-Agent: curl/7.81.0' \
  --header 'Accept: */*' \
  --header 'Host: 127.0.0.1:8000' \
```

`mocks.yml`文件内容示例：

```yaml
  version: api.keploy.io/v1beta2
  kind: Postgres
  name: mocks
  spec:
      metadata: {}
      postgresrequests:
          - header: [Q]
          identifier: ClientRequest
          length: 8
          query:
              string: SELECT students."ID" AS "students_ID", students."Name" AS "students_Name", students."Email" AS "students_Email", students."Hashed Password" AS "students_Hashed Password", students."Subject Stream" AS "students_Subject Stream" FROM students LIMIT 100 OFFSET 0
          msg_type: 81
          auth_type: 0
      postgresresponses:
          - header: [T, C, Z]
          identifier: ServerResponse
          length: 8
          authentication_md5_password:
              salt:
                  - 0
                  - 0
                  - 0
                  - 0
          command_complete:
              - command_tag:
                  - 83
                  - 69
                  - 76
                  - 69
                  - 67
                  - 84
                  - 32
                  - 48
          ready_for_query:
              txstatus: 84
          row_description: {fields: [{name: [115, 116, 117, 100, 101, 110, 116, 115, 95, 73, 68], table_oid: 24577, table_attribute_number: 1, data_type_oid: 23, data_type_size: 4, type_modifier: -1, format: 0}, {name: [115, 116, 117, 100, 101, 110, 116, 115, 95, 78, 97, 109, 101], table_oid: 24577, table_attribute_number: 2, data_type_oid: 1043, data_type_size: -1, type_modifier: -1, format: 0}, {name: [115, 116, 117, 100, 101, 110, 116, 115, 95, 69, 109, 97, 105, 108], table_oid: 24577, table_attribute_number: 3, data_type_oid: 1043, data_type_size: -1, type_modifier: -1, format: 0}, {name: [115, 116, 117, 100, 101, 110, 116, 115, 95, 72, 97, 115, 104, 101, 100, 32, 80, 97, 115, 115, 119, 111, 114, 100], table_oid: 24577, table_attribute_number: 4, data_type_oid: 1043, data_type_size: -1, type_modifier: -1, format: 0}, {name: [115, 116, 117, 100, 101, 110, 116, 115, 95, 83, 117, 98, 106, 101, 99, 116, 32, 83, 116, 114, 101, 97, 109], table_oid: 24577, table_attribute_number: 5, data_type_oid: 1043, data_type_size: -1, type_modifier: -1, format: 0}]}
          msg_type: 90
          auth_type: 0
      reqtimestampmock: 2023-11-06T10:42:43.063446464+05:30
      restimestampmock: 2023-11-06T10:42:43.063544657+05:30
```

想验证一切是否按预期工作？

#### 运行测试

是时候进行测试了 🧪

```shell
keploy test -c "uvicorn application.main:app --reload" --delay 10
```

> `--delay`标志？这是为了让您的应用在测试用例运行前有短暂的准备时间（以秒计）。

最后建议？深入探索！尝试不同的API调用，调整`mocks.yml`中的数据库响应，或修改`test-x.yml`中的请求或响应。再次运行测试，见证奇迹发生！✨👩‍💻👨‍💻✨

### 总结 🎉

恭喜您完成这段旅程！您已经体验了Keploy的强大功能，锻炼了编码能力，还享受了一些乐趣！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。 😊🚀

如果仍有疑问，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>