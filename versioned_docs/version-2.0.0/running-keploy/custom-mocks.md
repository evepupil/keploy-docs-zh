---
id: custom-mocks
title: 向Keploy Mock文件添加自定义Mock
sidebar_label: 自定义HTTP Mocks
description: 本文档介绍如何在Keploy测试用例中使用自定义HTTP mocks
tags:
  - mocks
  - 自定义mocks
  - 手动编写mocks
  - 测试用mock
keywords:
  - mocks
  - 自定义mocks
  - 手动编写mocks
  - 测试用mock
---

如果您无法运行依赖服务并希望模拟它，keploy支持添加手动编写的mocks。

向Keploy mock文件添加mock时，必须确保所有字段都准确填写，并且**时间戳与mock对应测试用例的请求和响应时间戳对齐**。
本文档提供了模式和相关指南来帮助您完成此过程。

## Mocks模式

```yaml
- version: api.keploy.io/v1beta1
  kind: Http
  name: <mock名称>
  spec:
      request:
          method: <HTTP方法>
          proto_major: 1
          proto_minor: 1
          url: <请求URL>
          header: <请求头>
          body: <请求体>
          timestamp: <请求时间戳>
      response:
          status_code: <响应状态码>
          header: <响应头>
          body: <响应体>
          timestamp: <响应时间戳>
___
```

### 字段说明

- `version`: `api.keploy.io/v1beta1`
- `kind`: 由于自定义mocks是HTTP mocks，类型为`Http`。
- `name`: mock名称必须**唯一**。
- `request`: 请求详情。
  - `method`: HTTP方法（如GET、POST）。
  - `url`: 请求URL。
  - `header`: 请求头数组。
  - `body`: 请求体。
  - `timestamp`: 请求时间戳，必须与关联测试用例中的请求时间戳匹配。
- `response`: 响应详情。
  - `status_code`: 响应的HTTP状态码。
  - `header`: 响应头。
  - `body`: 响应体。
  - `timestamp`: 响应时间戳，必须与关联测试用例中的响应时间戳匹配。

## 添加Mock的指南

1. **确保名称唯一**：每个mock必须具有唯一的`name`以避免冲突。
2. **匹配时间戳**：请求和响应部分中的`timestamp`字段必须在关联测试用例的时间戳范围内。这确保mock准确链接到测试用例执行的正确点。
3. **提供准确详情**：确保方法、URL、头和体准确反映您要模拟的请求和响应。

## 示例

```yaml
---
version: api.keploy.io/v1beta1
kind: Http
name: mock-n
spec:
  req:
    method: POST
    proto_major: 1
    proto_minor: 1
    url: http://localhost:9966/petclinic/api/owners
    header:
      Accept: application/json, text/plain, */*
      Accept-Encoding: gzip, deflate, br
      Accept-Language: en-GB,en-US;q=0.9,en;q=0.8
      Connection: keep-alive
      Content-Length: "128"
      Content-Type: application/json
      Host: localhost:9966
      Origin: http://localhost:4200
      Referer: http://localhost:4200/
      Sec-Ch-Ua: '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"'
      Sec-Ch-Ua-Mobile: ?0
      Sec-Ch-Ua-Platform: '"macOS"'
      Sec-Fetch-Dest: empty
      Sec-Fetch-Mode: cors
      Sec-Fetch-Site: same-site
      User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36
    body: '{"id":null,"firstName":"Bugs","lastName":"Bunny","address":"Rabbit Hole","city":"California","telephone":"9911229933"}'
    timestamp: 2024-02-19T13:14:27.885643357Z

  resp:
    status_code: 201
    header:
      Access-Control-Allow-Origin: "*"
      Access-Control-Expose-Headers: errors, content-type
      Cache-Control: no-cache, no-store, max-age=0, must-revalidate
      Connection: keep-alive
      Content-Type: application/json
      Date: Mon, 19 Feb 2024 13:14:28 GMT
      Expires: "0"
      Keep-Alive: timeout=60
      Location: /api/owners/1
      Pragma: no-cache
      Vary: Origin,Access-Control-Request-Method,Access-Control-Request-Headers
      X-Content-Type-Options: nosniff
      X-Frame-Options: DENY
      X-Xss-Protection: "0"
    body: '{"firstName":"Jhon","lastName":"Doe","address":"Rabbit Hole","city":"California","telephone":"9911229933","id":1,"pets":[]}'
    timestamp: 2024-02-19T13:14:28.145240844Z
---
```