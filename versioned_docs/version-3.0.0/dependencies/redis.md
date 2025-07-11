---
id: redis
title: Redis支持
sidebar_label: Redis支持
---

## 简介

Redis有线协议是一种简单的基于文本的协议，用于通过TCP/IP套接字与Redis服务器通信。它遵循请求-响应模型，客户端向服务器发送命令，服务器返回响应。

**端口：** `Redis`服务器的默认端口是6379。

**字节序：** Redis使用小端字节序，特别是在其二进制协议格式中，如RDB（Redis数据库）和AOF（仅追加文件）持久化格式。

**消息类型：** Redis命令以批量字符串数组的形式从客户端发送到服务器。这被称为RESP（REdis序列化协议）格式。每个命令由一个字符串列表表示，其中第一个字符串是命令名称，后面跟着其参数。

更多信息，请查看Redis文档中的Redis序列化协议规范。

## 工作原理

### 记录模式

在记录模式下，使用encode函数。其主要职责是处理传入的用户流量并将这些数据存储在模拟文件中。对于Redis，该函数首先读取传入调用的前5个字节以确定调用类型。

Redis命令通过特定的初始字符来区分，如`'+', '-', ':', '$', '*', '_', '#', ',', '(', '!', '=', '%', '~', '>'`。

记录模式的过程从`RecordOutgoing`函数开始，该函数首先读取客户端的初始请求。然后使用encodeRedis函数对该请求进行编码。此函数记录请求，将其写入目标服务器，并处理响应。响应被读取、写回客户端并存储在模拟文件中。如果在到达流结束之前还有剩余的响应，这些响应也会发送给客户端并存储。

### 测试模式

在测试模式下，激活decode函数。其作用是将传入的请求与预先录制的模拟数据进行匹配，解码必要的信息并将其写回用户。

测试模式的过程从`MockOutgoing`函数开始，该函数读取客户端的初始请求。然后使用`decodeRedis`函数对请求进行解码。此函数读取请求流，尝试使用模糊匹配算法将请求与现有的模拟数据进行匹配，并获取相应的响应。如果找到匹配项，则将响应解码并写回客户端。

希望这对您有所帮助，如果您还有任何问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>