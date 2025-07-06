---
id: test-run-reports
title: 什么是API测试？
sidebar_label: 测试报告生成
description: 本节文档介绍API测试的概念及其必要性
tags:
  - API测试
  - API模拟
  - 生成测试用例
  - 测试自动化
keywords:
  - api测试
  - api模拟
  - 自动化测试
  - 人工智能测试
  - keploy
  - Gemini
  - OpenAI
---

# 🧪 Keploy 测试运行报告

通过详细的测试执行、结果和创建者报告，轻松追踪和管理API测试运行结果。

## 🔍 搜索测试运行报告

使用搜索栏按报告ID、创建者邮箱或状态筛选报告。

### 📋 测试报告摘要

- 报告ID
- 创建时间
- 创建者
- 总测试数
- 通过数
- 失败数
- 状态

## 🧩 测试套件

为每个API端点管理和微调测试套件。可编辑请求输入、响应预期和断言类型。

### ✏️ 可编辑测试用例

每个测试用例可修改以下内容：

- 更改**请求负载**、请求头或查询参数
- 编辑或更新**预期响应体**
- 选择或修改**断言类型**

### 🧪 支持的断言类型

| 断言类型         | 描述                                                     |
| ---------------- | -------------------------------------------------------- |
| `statusCode`     | 断言HTTP状态码符合预期（如200、404）                     |
| `bodyContains`   | 检查响应体是否包含特定文本或键值                         |
| `jsonEquals`     | 验证JSON响应的深度相等性                                 |
| `headerMatch`    | 断言特定响应头的存在或值                                 |
| `schemaValidation` | 根据OpenAPI/JSON schema进行验证（如可用）               |
| `custom`         | 用户自定义脚本或匹配规则                                 |

#### ➕ 测试用例结构示例 (YAML)

```yaml
- testName: 获取所有用户
  method: GET
  endpoint: /users
  expectedStatus: 200
  assertions:
    - type: statusCode
    - type: bodyContains
      value: "username"
    - type: jsonEquals
      expected:
        - id: 1
          username: john_doe
```

### 🧱 编辑测试步骤

轻松自定义单个测试步骤，模拟真实API使用场景，验证应用在不同条件下的行为。

#### 🔧 请求详情

为每个测试用例更新请求配置：

- **名称:**  
  `创建对象 P024 无效JSON`

- **方法:**  
  `POST`

- **URL路径:**  
  `/objects`

- **请求头:**

  | 键           | 值                |
  | ------------ | ----------------- |
  | Content-Type | application/json |

  可**添加请求头**（如Authorization、Custom-Token等）。

- **请求体:**

  ````json
  {
    "name": "AUT测试对象 P024",
    "data": {
      "key": "value"
  }
  }```
  ````

### 💾 操作

- ✅ **保存更改** — 应用对测试步骤的编辑并更新套件。
- ❌ **取消** — 放弃未保存的修改，恢复到最后保存状态。