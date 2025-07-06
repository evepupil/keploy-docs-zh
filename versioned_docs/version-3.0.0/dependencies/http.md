---
id: http
title: HTTP支持
sidebar_label: HTTP
---

## 简介

HTTP（超文本传输协议）`Wire Protocol` 指的是客户端（如网页浏览器）与服务器之间通过互联网传输数据的底层通信机制。它定义了消息的格式和传输方式，包括语义规则、状态码、头部信息及其他相关方面。

**端口：** HTTP通常使用端口`80进行非安全`连接（HTTP），端口`443进行安全连接`（HTTPS）。这些是默认端口，但技术上HTTP服务器可以配置为监听任何端口。

**字节序：** HTTP工作在`TCP/IP协议栈`的应用层，这一层无需考虑字节序问题。但如果涉及加密（如HTTPS），加密算法可能有特定的字节序要求，但这在比HTTP更低的层级处理。

**消息类型：** 在HTTP中，主要有两种消息类型：

1. _HTTP请求消息_：这些消息由客户端发送至服务器，用于请求资源或执行操作。它们包含请求方法（如GET、POST）、请求URL、头部信息（如Accept、User-Agent），以及可选的请求体（如POST方法）。示例：

```bash
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
```

2. _HTTP响应消息_：这些消息由服务器发送至客户端，作为对请求的响应。它们包含状态行（表示请求结果，如状态码200表示成功）、头部信息（提供响应的元数据，如Content-Type、Content-Length），以及可选的响应体（包含请求的资源或数据）。示例：

```yaml
HTTP/1.1 200 OK
Date: Fri, 24 May 2024 12:00:00 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 1234
Server: Apache
```

## 工作原理

HTTP解析器主要分为两部分：`编码`和`解码`。编码函数用于Keploy的记录模式，此时需要处理用户流量并将其存储为模拟数据；而解码函数用于测试模式，此时需要将模拟数据与请求匹配，从中解码信息并写回给用户。

在记录模式下，编码函数会接收到初始请求，该请求被写入目标连接。解析器会检查请求是否为分块传输，如果是，则持续从客户端连接读取请求并写入目标连接。

接下来，解析器会检查请求是否包含Expect头部。Expect头部在客户端发送非常大的请求时使用，用于询问服务器是否准备好接收如此大的请求。如果服务器准备好，则会返回`"100-continue"`响应。我们通过将请求写入目标连接并读取其响应来检查这一点。我们开始读取响应，并在此情况下也处理分块传输。最后，Keploy解析请求和响应，将其存储为模拟数据。

希望这能帮助你理解。如果仍有疑问，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>