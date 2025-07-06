---
id: samples-fastapi-twilio
title: 短信发送示例应用 (FastAPI-Twilio)
sidebar_label: FastAPI + Twilio (HTTP)
description: 本示例应用展示了如何将FastAPI框架与Twilio短信服务及Keploy平台结合使用。
tags:
  - python
  - quickstart
  - samples
  - examples
  - tutorial
  - python-framework
  - fast-api-framework
  - postgres
  - sms
  - twilio
keyword:
  - FastAPI框架
  - Twilio
  - 短信服务
  - Python
  - API测试生成器
  - 自动化用例生成
---

# 简介

🪄 探索短信发送应用的世界，了解Keploy如何与FastAPI和Twilio无缝集成。系好安全带，这将是一段有趣的旅程！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 快速开始 🎬

## 设置Twilio账户 💬

登录Twilio控制台获取凭证。获得`Twilio账户SID、认证令牌和电话号码`后，在`.env`文件中更新您的凭证。

## 克隆示例应用 🧪

```bash
git clone https://github.com/keploy/samples-python.git && cd samples-python/fastapi-twilio
```

## 安装Keploy

根据您的操作系统选择安装方式：

有两种方式可以运行此示例应用：

- [使用Docker运行应用](#使用docker-compose-)
- [在Linux/WSL本地运行应用](#在linuxwsl本地运行应用-)

## 使用Docker Compose 🐳

我们将使用Docker compose来运行应用及MongoDB容器。

### 开始录制！🎥

创建应用镜像：

```bash
docker build -t fastapi-twilio:1.0 .
```

录制测试用例：

```shell
keploy record -c "docker run -p 8000:8000 --name fastapi-twilio fastapi-twilio:1.0"
```

🔥**发起一些API调用**。可以使用Postman、Hoppscotch或curl。

简化URL示例：

### 生成测试用例

只需**发起API调用**即可生成测试用例。

**发起POST请求**

1. 将下方占位符`YOUR_REGISTERED_PERSONAL_PHONE_NUMBER`替换为您在Twilio绑定的个人手机号：

     ```bash
     curl --location 'http://127.0.0.1:8000/send-sms/' \
     --header 'Content-Type: application/json' \
     --data '{
         "Body": "Test, testtt, testttttttssss :)",
         "To": "YOUR_REGISTERED_PERSONAL_PHONE_NUMBER",
     }'
     ```

2. 将下方占位符`SOME_WRONG_PHONE_NUMBER`替换为任意错误号码：

     ```bash
     curl --location 'http://127.0.0.1:8000/send-sms/' \
     --header 'Content-Type: application/json' \
     --data '{
         "Body": "Test, testtt, testttttttssss :)",
         "To": "SOME_WRONG_PHONE_NUMBER",
     }'
     ```

恭喜！您已成功生成包含mock的测试用例。在`Keploy目录`中查看生成的`test-1.yml`和`mocks.yml`。

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
    url: http://127.0.0.1:8000/send-sms/
    header:
      Accept: "*/*"
      Accept-Encoding: gzip, deflate, br
      Connection: keep-alive
      Content-Length: "75"
      Content-Type: application/json
      Host: 127.0.0.1:8000
      Postman-Token: c871b715-7aae-46b6-8e0d-1341aa426624
      User-Agent: PostmanRuntime/7.34.0
    body: |-
      {
          "Body": "Test, testtt, testttttttssss :)",
          "To": "+91700004379"
      }
    body_type: ""
    timestamp: 2023-11-14T14:56:25.800517709+05:30
  resp:
    status_code: 200
    header:
      Content-Length: "73"
      Content-Type: application/json
      Date: Tue, 14 Nov 2023 09:26:25 GMT
      Server: uvicorn
    body: '{"message":"Failed to send SMS. Please check the provided phone number."}'
    body_type: ""
    status_message: ""
    proto_major: 0
    proto_minor: 0
    timestamp: 2023-11-14T14:56:32.013566624+05:30
  objects: []
  assertions:
    noise:
      header.Date: []
  created: 1699953992
curl: |-
  curl --request POST \
  --url http://127.0.0.1:8000/send-sms/ \
  --header 'User-Agent: PostmanRuntime/7.34.0' \
  --header 'Accept: */*' \
  --header 'Postman-Token: c871b715-7aae-46b6-8e0d-1341aa426624' \
  --header 'Host: 127.0.0.1:8000' \
  --header 'Accept-Encoding: gzip, deflate, br' \
  --header 'Connection: keep-alive' \
  --header 'Content-Type: application/json' \
  --data '{
      "Body": "Test, testtt, testttttttssss :)",
      "To": "+91700004379"
  }'
```

生成的`mocks.yml`示例：

```yaml
version: api.keploy.io/v1beta1
kind: Http
name: mocks
spec:
  metadata:
    name: Http
    operation: POST
    type: HTTP_CLIENT
  req:
    method: POST
    proto_major: 1
    proto_minor: 1
    url: /2010-04-01/Accounts/AC19413687d9ce28c80cda944730f8b286/Messages.json
    header:
      Accept: "*/*"
      Accept-Encoding: gzip, deflate
      Authorization: Basic QUMxOTQxMzY4N2Q5Y2UyOGM4MGNkYTk0NDczMGY4YjI4NjpjMTc0MDc5YzU2NTA0N2FmYWJmNDk5MWI2ZGQ1MmFiYg==
      Connection: keep-alive
      Content-Length: "81"
      Content-Type: application/x-www-form-urlencoded
      User-Agent: python-requests/2.31.0
    body: Body=Test%2C+testtt%2C+testttttttssss+%3A%29&From=%2B16413324066&To=%2B9170000437
    body_type: ""
    timestamp: 0001-01-01T00:00:00Z
  resp:
    status_code: 400
    header:
      Access-Control-Allow-Credentials: "true"
      Access-Control-Allow-Headers: Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, Idempotency-Key
      Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS
      Access-Control-Allow-Origin: "*"
      Access-Control-Expose-Headers: ETag
      Connection: keep-alive
      Content-Length: 335,335
      Content-Type: application/json
      Date: Tue, 14 Nov 2023 09:27:21 GMT
      Twilio-Concurrent-Requests: "1"
      Twilio-Request-Duration: "0.080"
      Twilio-Request-Id: RQb54d7f05d29e83bc89889cc136bcd99d
      X-Api-Domain: api.twilio.com
      X-Home-Region: us1
      X-Powered-By: AT-5000
      X-Shenanigans: none
    body: '{"code": 21608, "message": "The number +917000XXXX is unverified. Trial accounts cannot send messages to unverified numbers; verify +917000XXXX at twilio.com/user/account/phone-numbers/verified, or purchase a Twilio number to send messages to unverified numbers", "more_info": "https://www.twilio.com/docs/errors/21608", "status": 400}'
    body_type: ""
    status_message: ""
    proto_major: 0
    proto_minor: 0
    timestamp: 0001-01-01T00:00:00Z
  objects: []
  created: 1699954041
  reqTimestampMock: 2023-11-14T14:57:20.914415283+05:30
  resTimestampMock: 2023-11-14T14:57:21.298027703+05:30
```

### 运行测试

测试时间到 🧪

```shell
keploy test -c "docker run -p 8000:8000 --name fastapi-twilio fastapi-twilio:1.0" --delay 10
```

> `--delay`参数是为应用预留的启动时间（秒）。

尝试修改`mocks.yml`中的Twilio响应，或调整`test-x.yml`中的请求/响应，重新运行测试见证神奇效果！✨👩‍💻👨‍💻✨

### 总结 🎉

恭喜完成！您已体验Keploy的强大功能，展示了编码技巧并享受了乐趣！继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

编码愉快！✨👩‍💻👨‍💻✨

**\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\_\_\_\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\***

## 在Linux/WSL本地运行应用 🐧

直接在Linux系统上运行示例应用。准备开始吧！🎉

### 开始录制

安装Python虚拟环境：

```bash
pip3 install virtualenv
```

创建并激活虚拟环境：

```bash
python3 -m virtualenv venv && source venv/bin/activate
```

安装依赖：

```bash
pip3 install -r requirements.txt
```

开始录制：

```bash
keploy record -c "uvicorn application.main:app --reload"
```

注意`-c`参数是运行应用的命令。

### 生成测试用例

发起API调用来生成测试用例。

**发起POST请求**

1. 替换下方占位符为Twilio绑定的手机号：

     ```bash
     curl --location 'http://127.0.0.1:8000/send-sms/' \
     --header 'Content-Type: application/json' \
     --data '{
         "Body": "Test, testtt, testttttttssss :)",
         "To": "YOUR_REGISTERED_PERSONAL_PHONE_NUMBER",
     }'
     ```

2. 替换为错误号码：

     ```bash
     curl --location 'http://127.0.0.1:8000/send-sms/' \
     --header 'Content-Type: application/json' \
     --data '{
         "Body": "Test, testtt, testttttttssss :)",
         "To": "SOME_WRONG_PHONE_NUMBER",
     }'
     ```

### 运行测试

```shell
keploy test -c "uvicorn application.main:app --reload" --delay 10
```

> `--delay`参数是应用启动等待时间。

尝试修改测试文件并重新运行，体验Keploy的强大功能！✨👩‍💻👨‍💻✨

### 总结 🎉

恭喜完成！您已掌握Keploy的核心功能，现在可以继续探索更多可能性。😊🚀

如有疑问，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>