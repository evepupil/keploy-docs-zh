---
id: review-and-improve-ai-generated-tests
title: 审查与优化AI生成的API测试
sidebar_label: 审查与优化测试
description: 学习如何检查、编辑、自修复和增强Keploy的AI生成API测试套件，以实现最大覆盖率和可靠性。
---

使用Keploy的AI引擎生成初始测试套件后，下一步是审查、优化和强化这些测试，以确保它们在API演进过程中保持可信赖性。

## 打开测试审查工作区

前往Keploy控制台 → API测试生成 › 测试套件
根据所选应用，您可以查看该应用的测试套件

## 按状态、方法和端点筛选

使用左侧**测试套件**面板中的**筛选选项**栏，将大型套件精确筛选至所需内容：

| **筛选标签**  | **功能说明**                                                                           |
| --------------- | ------------------------------------------------------------------------------------------ |
| **状态码** | 输入`2`列出所有2xx状态码，`30`筛选重定向，或精确代码如`404`。               |
| **HTTP方法** | 切换以隔离`GET`、`POST`、`PUT`、`DELETE`等方法。                         |
| **端点**    | 输入路径片段（如`/orders`、`/auth`）即时缩小匹配范围。 |

可**组合使用这些筛选器**与搜索栏——例如仅查看`/employees`路径上失败的`DELETE`调用——轻松处理大型测试套件。

## 编辑测试步骤——请求与断言

Keploy允许您通过单一模态窗口优化**请求定义**和**断言**：

1. 点击任意步骤卡上的✏️**编辑**图标。
2. 模态窗口将显示两个标签页：

### 📨 请求详情

- 更改HTTP方法（`GET`、`POST`等）
- 更新URL路径
- 通过`＋添加请求头`增删请求头
- 编辑请求体（JSON、表单数据等）

### ✅ 断言

- 使用`＋添加断言`追加新检查项
- 选择断言类型：
  - 状态码
  - 请求头完全匹配/包含
  - Body JSONPath
  - 正则表达式
  - 数值比较`>`/`<`等
- 即时修改比较器或期望值

### 保存与回滚

点击**保存更改**——所有编辑均受版本控制，可随时回滚。

## 📚 断言类型与示例

Keploy原生支持九种断言类型。  
按需组合使用——以下所有示例可共存于同一测试步骤的`assertions:`数组中。

| **类型**              | **验证内容**                                     | **YAML片段**                                                                                           | **通过示例**                                                          |
| --------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **状态码**       | 响应码完全匹配指定数值。                  | `yaml<br>- type: status_code<br>  comparator: equal<br>  expected: 201<br>`                                | `POST /users`返回**201 Created**                                        |
| **状态码类别** | 响应码属于某类别（2xx、3xx等）。       | `yaml<br>- type: status_code_class<br>  comparator: equal<br>  expected: 2xx<br>`                          | `PATCH /users/42` → **204 No Content**                                       |
| **状态码包含**    | 响应码位于白名单中。          | `yaml<br>- type: status_code_in<br>  expected: [200, 201, 202]<br>`                                        | 上传API可能返回**202 Accepted**表示异步处理中          |
| **JSON全等**        | **完整**JSON体完全匹配（顺序无关）。 | `yaml<br>- type: json_equal<br>  expected:<br>    id: 42<br>    status: "shipped"<br>`                     | 仓库服务返回`{ "status": "shipped", "id": 42 }`                |
| **JSON包含**     | 响应体**包含**特定字段/值子集。           | `yaml<br>- type: json_contains<br>  expected:<br>    status: "error"<br>    message: "invalid token"<br>`  | 认证服务返回的长错误负载中**包含**这两个字段 |
| **请求头包含**   | 特定请求头**包含**子字符串。              | `yaml<br>- type: header_contains<br>  field: content-type<br>  expected: json<br>`                         | `content-type: application/**json**; charset=utf-8`                          |
| **请求头全等**      | 请求头值完全匹配（不区分大小写）。       | `yaml<br>- type: header_equal<br>  field: cache-control<br>  expected: "no-store"<br>`                     | `cache-control: No-Store`（大小写无关）                              |
| **请求头存在**     | 请求头键存在（忽略值）。                 | `yaml<br>- type: header_exists<br>  field: x-request-id<br>`                                               | 反向代理注入`x-request-id: 4b087…`                                 |
| **请求头匹配**    | 请求头值匹配**正则**模式。              | `yaml<br>- type: header_matches<br>  field: set-cookie<br>  pattern: "sessionId=.*; Path=/; HttpOnly"<br>` | `set-cookie: sessionId=abc123; Path=/; HttpOnly; SameSite=Lax`               |

> **技巧**  
> 在单次请求中组合多个断言，同时验证状态码、请求头**和**响应体。每个断言独立评估，失败时能精确定位问题点。

## 编辑与管理测试套件

在测试套件列表中，悬停任意行可显示︙（更多选项）菜单：

**︙菜单**：悬停任意套件行显示选项：

- **添加测试套件**——创建新套件并赋予清晰描述性标题。
- **选择测试套件**——选择现有套件用于运行或修改。
- **编辑测试套件**——更新套件名称、描述或包含的测试。
- **删除测试套件**——永久移除不再需要的套件。

所有更改即时保存并记录。
⚠️ 删除操作不可逆。可通过Git历史记录或备份恢复。