---
id: api-test-generator
title: Keploy API测试生成器
sidebar_label: API测试生成器
description: 本文档记录Keploy API测试生成器的使用场景
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

# Keploy API测试代理

Keploy的**API测试代理**允许您从真实API使用数据（如`cURL`命令、OpenAPI模式或PRD/BRD文档）自动生成API测试用例和模拟数据——由大语言模型驱动。

> 🚀 零代码设置。粘贴真实请求。几分钟内获得测试用例、模拟数据和脆弱测试检测。

## 功能特性

- 从以下内容自动生成测试用例和模拟数据：
  - `cURL`命令
  - OpenAPI/Swagger模式
  - API文档、PRD/BRD片段
- 通过5次验证迭代检测**脆弱测试用例**
- 允许完全控制**编辑、删除**或**重命名**测试套件和断言

# 快速开始

本指南将引导您使用Keploy生成、编辑、运行和管理自动化API测试——以**PetClinic**应用为例进行演示。

## 步骤1：登录并访问测试面板

1. 访问 [https://app.keploy.io](https://app.keploy.io)
2. 使用您的凭据登录。
3. 在侧边栏中导航至**API测试**部分。
4. 点击**生成API测试**  
   → 这将打开测试生成流程：  
   [https://app.keploy.io/api-testing/generate](https://app.keploy.io/api-testing/generate)

![API测试](/img/api-testing-generate.png)

## 步骤2：添加API信息

我们将使用**PetClinic**应用进行演示。

### 步骤A：本地运行PetClinic

```bash
git clone https://github.com/keploy/samples-java.git
cd samples-java
git checkout atg
cd spring-petclinic/spring-petclinic-rest
```

**启动PostgreSQL容器**

```bash
docker run --name postgres-petclinic -e POSTGRES_PASSWORD=petclinic -e POSTGRES_DB=petclinic -p 5432:5432 -d postgres:17
```

**构建并运行应用**

```bash
mvn clean -DskipTests install
java -jar target/spring-petclinic-rest-3.0.2.jar
```

### 使用ngrok暴露应用

```bash
ngrok http http://localhost:9966
```

复制生成的ngrok URL（例如 https://95777-115-245-249-101.ngrok-free.app）

您的实时基础URL将是：

```bash
https://<your-ngrok-url>/petclinic/api
```

### 步骤B：设置前提条件

**CURL命令（必需）：**
为端点粘贴至少3-5个有效的curl请求。

```bash
# 测试1：获取所有所有者
curl -X GET "http://localhost:9966/petclinic/api/owners" \
  -H "Accept: application/json, text/plain, */*" \
  -H "Accept-Encoding: gzip, deflate" \
  -H "Accept-Language: en-US,en;q=0.9" \
  -H "Connection: keep-alive" \
  -H "Host: localhost:9966" \
  -H "Origin: http://localhost:4200" \
  -H "Referer: http://localhost:4200/"

# 测试2：OPTIONS请求
curl -X OPTIONS "http://localhost:9966/petclinic/api/owners" \
  -H "Accept: */*" \
  -H "Access-Control-Request-Headers: content-type" \
  -H "Access-Control-Request-Method: POST" \
  -H "Content-Length: 0"

# 测试3：POST新增所有者
curl -X POST "http://localhost:9966/petclinic/api/owners" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/plain, */*" \
  -d '{"id":null,"firstName":"Abimanyu","lastName":"Singh","address":"Berlin","city":"Berlin","telephone":"8882110959"}'

# 测试4：再次获取所有所有者
curl -X GET "http://localhost:9966/petclinic/api/owners" \
  -H "Accept: application/json, text/plain, */*"

# 测试5：按姓氏搜索所有者
curl -X GET "http://localhost:9966/petclinic/api/owners?lastName=Sin" \
  -H "Accept: application/json, text/plain, */*"

# 测试6：搜索不存在的所有者
curl -X GET "http://localhost:9966/petclinic/api/owners?lastName=asdf" \
  -H "Accept: application/json, text/plain, */*"
```

**OpenAPI模式（可选但推荐）：**
以YAML或JSON格式添加您的Swagger/OpenAPI规范。

```bash
openapi: 3.0.1
info:
  title: Spring PetClinic
  description: Spring PetClinic Sample Application.
  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0
  version: '1.0'

servers:
  - url: http://localhost:9966/petclinic/api

tags:
  - name: failing
    description: Endpoint which always returns an error.
  - name: owner
    description: Endpoints related to pet owners.
  - name: user
    description: Endpoints related to users.
  - name: pet
    description: Endpoints related to pets.
  - name: vet
    description: Endpoints related to vets.
  - name: visit
    description: Endpoints related to vet visits.
  - name: pettypes
    description: Endpoints related to pet types.
  - name: specialty
    description: Endpoints related to vet specialties.

paths:
  /oops:
    get:
      tags: [failing]
      operationId: failingRequest
      summary: Always fails
      description: Produces sample error response.
      responses:
        200:
          description: Never returned.
          headers:
            ETag:
              description: An ID for this version of the response.
              schema: {type: string}
          content:
            text/plain:
              schema: {type: string}
        304:
          description: Not modified.
          headers:
            ETag:
              description: An ID for this version of the response.
              schema: {type: string}
        400:
          description: Bad request.
          content:
            application/json:
              schema: {$ref: '#/components/schemas/RestError'}

  /owners:
    post:
      tags: [owner]
      operationId: addOwner
      summary: Adds a pet owner
      description: Records the details of a new pet owner.
      requestBody:
        description: The pet owner
        content:
          application/json:
            schema: {$ref: '#/components/schemas/OwnerFields'}
        required: true
      responses:
        201:
          description: The pet owner was successfully added.
          content:
            application/json:
              schema: {$ref: '#/components/schemas/Owner'}
        400:
          description: Bad request.
          content:
            application/json:
              schema: {$ref: '#/components/schemas/RestError'}
        500:
          description: Server error.
          content:
            application/json:
              schema: {$ref: '#/components/schemas/RestError'}

    get:
      tags: [owner]
      operationId: listOwners
      summary: Lists pet owners
      description: Returns an array of pet owners.
      parameters:
        - name: lastName
          in: query
          description: Last name.
          required: false
          schema:
            type: string
            example: Davis
      responses:
        200:
          description: Owner details found and returned.
          headers:
            ETag:
              description: An ID for this version of the response.
              schema: {type: string}
          content:
            application/json:
              schema:
                type: array
                items: {$ref: '#/components/schemas/Owner'}
        304:
          description: Not modified.
          headers:
            ETag:
              description: An ID for this version of the response.
              schema: {type: string}
        500:
          description: Server error.
          content:
            application/json:
              schema: {$ref: '#/components/schemas/RestError'}

  /owners/{ownerId}:
    get:
      tags: [owner]
      operationId: getOwner
      summary: Get a pet owner by ID
      description: Returns the pet owner or a 404 error.
      parameters:
        - name: ownerId
          in: path
          description: The ID of the pet owner.
          required: true
          schema:
            type: integer
            format: int32
            minimum: 0
            example: 1
      responses:
        200:
          description: Owner details found and returned.
          headers:
            ETag:
              description: An ID for this version of the response.
              schema: {type: string}
          content:
            application/json:
              schema: {$ref: '#/components/schemas/Owner'}
        304:
          description: Not modified.
          headers:
            ETag:
              description: An ID for this version of the response.
              schema: {type: string}
        400:
          description: Bad request.
          content:
            application/json:
              schema: {$ref: '#/components/schemas/RestError'}
        404:
          description: Owner not found.
          content:
            application/json:
              schema: {$ref: '#/components/schemas/RestError'}
        500:
          description: Server error.
          content:
            application/json:
              schema: {$ref: '#/components/schemas/RestError'}

    put:
      tags: [owner]
      operationId: updateOwner
      summary: Update a pet owner's details
      description: Updates the pet owner record with the specified details.
      parameters:
        - name: ownerId
          in: path
          description: The ID of the pet owner.
          required: true
          schema:
            type: integer
            format: int32
            minimum: 0
            example: 1
      requestBody:
        description: The pet owner details to use for the update.
        content:
          application/json:
            schema: {$ref: '#/components/schemas/OwnerFields'}
        required: true
      responses:
        200:
          description: Update successful.
          content:
            application/json:
              schema: {$ref: '#/components/schemas/Owner'}
        400:
          description: Bad request.
          content:
            application/json:
              schema: {$ref: '#/components/schemas/RestError'}
        404:
          description: Owner not found.
          content:
            application/json:
              schema: {$ref: '#/components/schemas/RestError'}
        500:
          description: Server error.
          content:
            application/json:
              schema: {$ref: '#/components/schemas/RestError'}

    delete:
      tags: [owner]
      operationId: deleteOwner
      summary: Delete an owner by ID
      description: Returns the owner or a 404 error.
      parameters:
        - name: ownerId
          in: path
          description: The ID of the owner.
          required: true
          schema:
            type: integer
            format: int32
            minimum: 0
            example: 1
      responses:
        200:
          description: Owner details found and returned.
          headers:
            ETag:
              description: An ID for this version of the response.
              schema: {type: string}
          content:
            application/json:
              schema: {$ref: '#/components/schemas/Owner'}
        304:
          description: Not modified.
          headers:
            ETag:
              description: An ID for this version of the response.
              schema: {type: string}
        400:
          description: Bad request.
          content:
            application/json:
              schema: {$ref: '#/components/schemas/RestError'}
        404:
          description: Owner not found.
          content:
            application/json:
              schema: {$ref: '#/components/schemas/RestError'}
        500:
          description: Server error.
          content:
            application/json:
              schema: {$ref: '#/components/schemas/RestError'}

  /owners/{ownerId}/pets:
    post:
      tags: [pet]
      operationId: addPetToOwner
      summary: Adds a pet to an owner
      description: Records the details of a new pet.
      parameters:
        - name: ownerId
          in: path
          description: The ID of the pet owner.
          required: true
          schema:
            type: integer
            format: int32
            minimum: 0
            example: 1
      requestBody:
        description: The details of the new pet.
        content:
          application/json:
            schema: {$ref: '#/components/schemas/PetFields'}
        required: true
      responses:
        201:
          description: The pet was successfully added.
          content:
            application/json:
              schema: {$ref: '#/components/schemas/Pet'}
        400:
          description: Bad request.
          content:
            application/json:
              schema: {$ref: '#/components/schemas/RestError'}
        404:
          description: Pet not found.
          content:
            application/json:
              schema: {$ref: '#/components/schemas/RestError'}
        500:
          description: Server error.
          content:
            application/json:
              schema: {$ref: '#/components/schemas/RestError'}

  # [Additional endpoints would follow the same pattern...]

components:
  schemas:
    RestError:
      title: REST Error
      description: The schema for all error responses.
      type: object
      properties:
        status:
          title: Status
          description: The HTTP status code.
          type: integer
          format: int32
          example: 400
          readOnly: true
        error:
          title: Error
          description: The short error message.
          type: string
          example: Bad Request
          readOnly: true
        path:
          title: Path
          description: The path of the URL for this request.
          type: string
          format: uri
          example: '/api/owners'
          readOnly: true
        timestamp:
          title: Timestamp
          description: The time the error occurred.
          type: string
          format: date-time
          example: '2019-08-21T21:41:46.158+0000'
          readOnly: true
        message:
          title: Message
          description: The long error message.
          type: string
          example: 'Request failed schema validation'
          readOnly: true
        schemaValidationErrors:
          title: Schema validation errors
          description: Validation errors against the OpenAPI schema.
          type: array
          items: {$ref: '#/components/schemas/ValidationMessage'}
        trace:
          title: Trace
          description: The stacktrace for this error.
          type: string
          example: 'com.atlassian.oai.validator.springmvc.InvalidRequestException: ...'
          readOnly: true
      required:
        - status
        - error
        - path
        - timestamp
        - message
        - schemaValidationErrors

    ValidationMessage:
      title: Validation message
      description: Messages describing a validation error.
      type: object
      properties:
        message:
          title: Message
          description: The validation message.
          type: string
          example: "[Path '/lastName'] Instance type (null) does not match any allowed primitive type (allowed: [\"string\"])"
          readOnly: true
      required: [message]
      additionalProperties: true

    # [Additional schemas would follow...]
```

**附加资源（可选）：**

- API文档
- 代码片段
- PRD/BRD文档

## 步骤3：点击"生成测试"

Keploy将使用提供的输入自动生成测试套件。
![API测试](/img/api-generate-it.png)

- 点击"生成测试"按钮。Keploy将：
- 分析您的API端点
- 创建正向和负向测试用例
- 生成模拟数据
- 验证测试稳定性

示例测试套件：https://957f-115-245-249-101.ngrok-free.app/petclinic/api

示例测试用例：

- ✅ Vet_Update_ChangeSpecialties_Successful
- ✅ Pet_UpdateOwnersPet_BirthDateOnly
- ✅ Vet_List_All
- ❌ Visit_AddToPet_DescriptionTooLong_400
- ❌ Pet_UpdateOwnersPet_InvalidData_400

![API测试](/img/test-suites.png)

每个测试将包含：

- 端点
- 请求体
- 请求头
- 断言

## 步骤4：示例测试用例结构

测试名称：Create PetType for Visit Test LD
请求：

```bash
POST /pettypes
Content-Type: application/json
{
  "name": "VisitPetTypeLD"
}
断言
类型：status_code
期望值：200
```

## 步骤5：编辑测试用例和断言

您可以通过UI编辑测试请求详情和断言。

```bash
名称：Create PetType for VisitUpdateDescTooLong
 方法：POST
 URL路径：/petclinic/api/pettypes
 请求头：Content-Type: application/json
 请求体：
{
  "name": "CatForVisitUpdateDescTooLong"
}
```

您还可以切换到"断言"标签页进行修改或添加：

```bash
类型：status_code
期望值：200
```

![编辑测试](/img/test-edit.png)

## 步骤6：运行测试并生成报告

重新输入基础URL。

```bash
 https://95777-115-245-249-101.ngrok-free.app
```

点击"运行测试"触发测试执行。

查看测试结果并下载报告用于QA或CI流水线。

## 步骤7：管理测试套件

在仪表板中，您可以：

**完全删除测试套件。**
![编辑测试](/img/delete-suite.png)

**删除套件中的单个测试用例。**
![编辑测试](/img/delete-individual.png)

## 获取准确结果的技巧

- 始终粘贴至少3-5个有效的cURL命令
- 确保您的实时URL处于活动状态且可响应
- 使用OpenAPI模式以获得更好的请求/响应建模
- 尽可能包含类似生产环境的真实输入

## 常见问题(FAQs)

**1. Keploy可以生成哪些类型的API测试？**
Keploy自动创建：

- **功能测试**：CRUD操作、端点验证
- **边界测试**：无效负载、错误响应
- **性能测试**：响应时间基准
- **安全测试**：输入净化、认证验证
- **依赖测试**：模拟外部服务调用

**2. Keploy如何处理API测试中的认证？**
Keploy支持：

- **认证类型**：JWT、OAuth2、API密钥、基础认证
- **自动续订**：令牌刷新流程
- **测试隔离**：每个测试独立的认证上下文
- **安全性**：从不存储原始凭据（使用环境变量）

**3. Keploy支持哪些协议和格式？**
| 协议 | 格式 | 特性 |
|----------|---------|----------|
| HTTP/HTTPS | JSON, XML | 完全支持 |
| gRPC | Protocol Buffers | 代码生成 |
| WebSockets | JSON, Binary | 会话测试 |
| GraphQL | Query/Mutation | 模式验证 |

**4. 对有状态API的测试生成如何工作？**
Keploy通过以下方式处理有状态工作流：

1. 记录会话cookies/headers
2. 检测调用间的数据依赖
3. 生成清理拆除序列
4. 创建隔离的测试上下文

**示例订单流程：**

```text
POST /cart → GET /cart → POST /checkout → GET /order/{id}
```