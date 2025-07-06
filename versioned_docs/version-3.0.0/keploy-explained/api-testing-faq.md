---
id: api-testing-faq
title: API 测试 – 常见问题解答
sidebar_label: 常见问题
description: 关于使用 Keploy 进行 API 测试的最常见问题解答。
tags:
  - 说明
  - 常见问题
---

# 有问题？我们有答案！🚀

关于使用 Keploy 进行 API 测试的一切疑问——简洁明了，不绕弯子。

### 1. Keploy 能生成哪些类型的 API 测试？

Keploy 自动创建：

- **功能测试：** CRUD 操作、端点验证
- **边界情况测试：** 无效负载、错误响应
- **性能测试：** 响应时间检查
- **安全测试：** 输入清理、认证验证
- **依赖测试：** 模拟外部服务调用

### 2. Keploy 如何处理 API 测试中的认证？

Keploy 支持：

- **认证类型：** JWT、OAuth2、API 密钥、基础认证
- **自动续期：** 令牌刷新流程
- **测试隔离：** 每个测试独立的认证上下文
- **安全性：** 不存储原始凭证——使用环境变量

### 3. Keploy 支持哪些协议和格式？

| 协议       | 格式              | 特性               |
| ---------- | ----------------- | ------------------ |
| HTTP/HTTPS | JSON, XML         | 完全支持           |
| gRPC       | Protocol Buffers  | 代码生成           |
| WebSockets | JSON, 二进制      | 会话测试           |
| GraphQL    | 查询/变更         | 模式验证           |

### 4. 对有状态 API 的测试生成是如何工作的？

Keploy 通过以下方式处理有状态工作流：

1. 记录会话 cookies/headers
2. 检测调用间的数据依赖
3. 生成清理步骤（teardown）
4. 创建隔离的测试上下文

**示例：**  
`POST /cart → GET /cart → POST /checkout → GET /order/{id}`

希望这些能帮到你，如果还有其他问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>