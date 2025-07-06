---
id: postgres
title: PostgreSQL 支持
sidebar_label: PostgreSQL
---

## 简介

[Postgres 有线协议](https://www.postgresql.org/docs/current/protocol.html/)是 PostgreSQL 中用于客户端-服务器交互的通信协议，允许客户端与 PostgreSQL 数据库服务器通信以执行查询、检索结果和执行各种数据库操作。

**端口：** `postgres` 或 `pgAdmin` 实例的默认端口号为 5432。`postgres` 或 `pgAdmin` 的端口号是可配置的，可能会有所不同。

**字节序：** PostgreSQL 有线协议中的所有整数都使用大端字节序：即最高有效字节在前。

**消息类型：** PostgreSQL 有线协议使用各种消息类型来促进客户端和服务器之间的通信。这些消息包括客户端发起的类型，如用于连接启动的 `StartupMessage`、用于执行 SQL 命令的 `Query` 和用于结束会话的 `Terminate`，以及服务器响应，如用于描述结果集的 `RowDescription`、用于传输行数据的 `DataRow` 和用于表示查询完成的 `CommandComplete`。每种消息类型由一个单字节类型代码标识，后跟一个长度字段和消息特定内容。

## 工作原理

Keploy 拦截流量并充当 `sourceConnection`（客户端）和 `destConnection`（服务器）之间的中间人。因此，Keploy 作为真实客户端的**目的地**，同时作为真实**目标连接**的客户端。每当流量被拦截时，Keploy 会获取字节数据，我们需要从中确定连接使用的协议，可能是 Postgres、Mongo 等。一旦 Keploy 识别为 Postgres，Keploy 会将其发送到 Postgres 解析器。

一旦拦截，Keploy 的功能包括解析这些有线消息，这涉及从数据包中提取相关数据和元数据。解析后，提取的信息会转换为人类可读且可编辑的格式。这种格式可能更加用户友好且易于理解，方便开发人员和管理员在必要时分析和操作数据。因此，此代理充当捕获和模拟流量调用的中间人。Keploy 使用 `pgproto3` 库作为基础将这些数据存储到 Go 结构体中。

## 消息查询示例

通常，每条消息由一个标准消息头后跟特定于请求的数据组成。以下是保存数据的几个请求（前端）和响应（后端）结构体：

```go
type PostgresSpec struct {
	Metadata map[string]string `json:"metadata" yaml:"metadata"`
	PostgresRequests []Backend `json:"RequestBin,omitempty"`
	PostgresResponses []Frontend `json:"ResponseBin,omitempty"`
	ReqTimestampMock time.Time `json:"ReqTimestampMock,omitempty"`
	ResTimestampMock time.Time `json:"ResTimestampMock,omitempty"`
}
```

在上面的代码中，`Backend` 和 `Frontend` 是表示 PostgreSQL 请求和响应的结构体：

```go
// Backend 是 PG 请求包转码器
type Backend struct {
    PacketTypes   []string `json:"header,omitempty" yaml:"header,omitempty,flow"`
    Identfier     string   `json:"identifier,omitempty" yaml:"identifier,omitempty"`
    Length        uint32   `json:"length,omitempty" yaml:"length,omitempty"`
    Payload       string   `json:"payload,omitempty" yaml:"payload,omitempty"`
    Bind          pgproto3.Bind          `yaml:"-"`
    Binds         []pgproto3.Bind         `json:"bind,omitempty" yaml:"bind,omitempty"`
    // 其他字段...
}

type Frontend struct {
    PacketTypes             []string                  `json:"header,omitempty" yaml:"header,omitempty,flow"`
    Identfier               string                    `json:"identifier,omitempty" yaml:"identifier,omitempty"`
    Length                  uint32                    `json:"length,omitempty" yaml:"length,omitempty"`
    Payload                 string                    `json:"payload,omitempty" yaml:"payload,omitempty"`
    AuthenticationOk        pgproto3.AuthenticationOk        `json:"authentication_ok,omitempty" yaml:"authentication_ok,omitempty"`
    AuthenticationCleartextPassword pgproto3.AuthenticationCleartextPassword `json:"authentication_cleartext_password,omitempty" yaml:"authentication_cleartext_password,omitempty"`
    // 其他字段...
}

type StartupPacket struct {
    Length           uint32
    ProtocolVersion  uint32
}

type RegularPacket struct {
    Identifier  byte
    Length      uint32
    Payload     []byte
}
```

希望这对您有所帮助，如果您仍有任何问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>