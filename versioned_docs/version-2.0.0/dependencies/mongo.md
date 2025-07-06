---
id: mongo
title: MongoDB 支持
sidebar_label: MongoDB 支持
---

## 简介

MongoDB 有线协议是一种基于简单套接字的请求-响应式协议。客户端通过常规 TCP/IP 套接字与数据库服务器通信。客户端应使用常规 TCP/IP 套接字连接数据库。

**端口：** `mongod` 和 `mongos` 实例的默认端口号为 27017。`mongod` 和 `mongos` 的端口号可配置，可能有所不同。

**字节序：** MongoDB 有线协议中的所有整数均采用小端字节序：即最低有效字节优先。

**消息类型：** MongoDB 使用 `OP_MSG` 操作码处理客户端请求和数据库响应。旧版 MongoDB 中使用的几种消息格式已被弃用，改用 `OP_MSG`。

更多信息请查看 mongodb-wire-protocol/#standard-message-header 部分。

## 工作原理

当应用程序向 MongoDB 发送请求时，这些请求/响应以"有线消息"的形式存在，即底层数据包。这些有线消息在到达实际 MongoDB 实例前会被 Keploy 代理拦截。

拦截后，代理的功能包括解析这些有线消息，即从数据包中提取相关数据和元数据。解析完成后，提取的信息会被转换为人类可读且可编辑的格式。这种格式更加用户友好且易于理解，便于开发人员和管理员在必要时分析和操作数据。因此，该代理作为中间件捕获并模拟流量调用。

系统设计支持 `MongoDB 版本 => 5.1.X` 的有线消息，这是应用程序与 MongoDB 服务器间使用的特定通信协议版本。该版本规定了双方交换有线消息的具体结构和规则。

## 消息查询示例

通常，每条消息由标准消息头后跟特定请求数据组成。标准消息头结构如下：

```go
struct MsgHeader {
    int32 messageLength;  // 消息总长度（包含本字段）
    int32 requestID;  // 本消息标识符
    int32 responseTo;  // 原始请求的 requestID（用于数据库响应）
    int32 opCode;  // 消息类型
}
```

`OP_MSG` 是一种可扩展的消息格式，用于在网络上编码客户端请求和服务器响应。
`OP_MSG` 格式如下：

```shell
OP_MSG {
    MsgHeader header;   // 标准消息头
    uint32 flagBits;    // 消息标志位
    Sections[] sections;    // 数据段
    optional<uint32> checksum;  // 可选的 CRC-32C 校验和
}
```

**注意事项**

- MongoDB 5.1 移除了对 `OP_QUERY` 查询操作和 `OP_QUERY` 命令的支持。作为例外，连接握手过程中仍支持使用 `OP_QUERY` 运行 `hello` 和 `isMaster` 命令。

- 在 4.2 版本中，MongoDB 移除了已弃用的内部协议 `OP_COMMAND` 和 `OP_COMMANDREPLY`。

希望这些信息对您有所帮助，如仍有疑问，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>