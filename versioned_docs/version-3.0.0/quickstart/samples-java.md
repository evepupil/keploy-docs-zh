---
id: samples-java
title: Java 示例应用
sidebar_label: 员工管理系统 (PostgresDb)
description: 以下示例应用展示了如何使用 Java 框架和 Keploy 平台。
tags:
  - java
  - spring-jpa
  - quickstart
  - samples
  - java-framework
  - postgres
  - examples
  - tutorial
keyword:
  - Jacoco
  - Maven
  - Springboot 框架
  - Postgres
  - SQL
  - Java
  - API 测试生成器
  - 自动化测试用例生成
  - Junit
---

# 员工管理系统示例应用

这是一个使用 **SpringBoot** 和 **PostgreSQL** 测试 Keploy 集成能力的示例应用。

> **macOS 用户**请使用 docker compose 运行此应用。

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 设置员工管理系统应用

### 应用前提条件

- Java 1.8+ 或 {'<'}17 ☕
- Maven 🛠️

克隆仓库并安装依赖：

```bash
git clone https://github.com/keploy/samples-java && cd samples-java/employee-manager
mvn clean install -Dmaven.test.skip=true
```

你可以通过两种方式使用 Keploy 启动后端：

- [使用 Keploy 二进制文件](#使用二进制文件启动指南)
- [使用 Keploy Docker 镜像](#使用-docker-启动指南)

## 使用二进制文件启动指南

### 设置后端

需要更新 PostgreSQL 配置，修改文件：
`employee-manager/src/main/resources/application-postgresql.properties`
将

```bash
spring.datasource.url=jdbc:postgresql://postgres:5432/keploy-test/
```

改为

```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/keploy-test/
```

然后构建 jar 文件：

```bash
mvn clean install -Dmaven.test.skip=true
```

### 启动 Postgres 数据库 🐳

```bash
docker run -e POSTGRES_USER=keploy-user -e POSTGRES_PASSWORD=keploy -e POSTGRES_DB=postgres -p 5432:5432 --name postgres postgres:15.2
```

注意：如果你不在 docker 用户组中，可能需要使用 sudo。

### 捕获测试用例 🎬

```bash
keploy record -c "java -jar target/springbootapp-0.0.1-SNAPSHOT.jar"
```

![测试用例](/img/keploy-record-docker-employee-app.png)

现在让我们运行一些测试来捕获更多场景：

#### 生成测试用例 📝

只需**发起一些 API 调用**即可生成测试用例。可以使用 [Postman](https://www.postman.com/) 或简单的 `curl` 命令。

1. 创建员工记录 📥

```bash
curl --location --request POST 'http://localhost:8080/api/employees' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Myke",
    "lastName": "Tyson",
    "email": "mt@gmail.com",
    "timestamp":1
}'
```

这将返回响应或创建的记录。时间戳字段在测试时会自动忽略，因为它总是不同的。

```bash
{
    "id": 1,
    "firstName": "Myke",
    "lastName": "Tyson",
    "email": "mt@gmail.com",
    "timestamp": 1661493301
}
```

2. 获取员工信息

```bash
curl --location --request GET 'http://localhost:8080/api/employees/1'
```

或通过浏览器访问 `http://localhost:8080/api/employees/1`

这些 API 调用会被捕获为**可编辑的**测试用例，并写入 `keploy/test` 文件夹。Keploy 目录还会生成 `mock.yml` 文件。

现在，让我们见证奇迹！ 🪄💫

### 运行测试用例

首先关闭数据库，验证 Keploy 的魔法是否真的能模拟数据库。再也不用担心数据库了！ 🎉

```bash
docker-compose down
```

现在以测试模式运行 Keploy：

```bash
keploy test -c "java -jar target/springbootapp-0.0.1-SNAPSHOT.jar" --delay 10
```

这将在 `keploy/reports` 文件夹中生成测试报告。你会看到类似输出：

````shell
🐰 Keploy: 2025-04-17T13:30:11+05:30    INFO    starting test for of    {"test case": "[test-1]", "test set": "[test-set-0]"}
2025-04-17 13:30:11.410  INFO 28035 --- [nio-8080-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet 'dispatcherServlet'
2025-04-17 13:30:11.410  INFO 28035 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2025-04-17 13:30:11.410  INFO 28035 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 0 ms
Testrun failed for testcase with id: "test-1"

--------------------------------------------------------------------

+-------------------------------------------------------------------------------------------------------------+
|                                                DIFFS TEST-1                                                 |
+-------------------------------------------------------------------------------------------------------------+
|                     EXPECT HEADER                    |                   ACTUAL HEADER                      |
| -----------------------------------------------------+----------------------------------------------------- |
|                                                      |                                                      |
|                                                                                                             |
|                      EXPECT BODY                     |                    ACTUAL BODY                       |
| -----------------------------------------------------+----------------------------------------------------- |
|   {                                                  | {                                                    |
|    "timestamp": "1744871332" ,                       |  "timestamp": "1744876811" ,                         |
|   lastName:Tyson                                     | lastName:Tyson                                       |
|    }                                                 |  }                                                   |
|                                                      |                                                      |
|                                                                                                             |
+-------------------------------------------------------------------------------------------------------------+
🐰 Keploy: 2025-04-17T13:30:11+05:30    INFO    result  {"testcase id": "[test-1]", "testset id": "[test-set-0]", "passed": "[false]"}
🐰 Keploy: 2025-04-17T13:30:11+05:30    INFO    starting test for of    {"test case": "[test-2]", "test set": "[test-set-0]"}
Testrun passed for testcase with id: "test-2"

--------------------------------------------------------------------

🐰 Keploy: 2025-04-17T13:30:11+05:30    INFO    result  {"testcase id": "[test-2]", "testset id": "[test-set-0]", "passed": "[true]"}

 <=========================================>
  TESTRUN SUMMARY. For test-set: "test-set-0"
        Total tests: 2
        Total test passed: 1
        Total test failed: 1
        Time Taken: "10.37 s"
 <=========================================>
<=========================================>```
````

注意到 `timestamp` 字段的差异了吗？时间总是这样捉摸不定！ 🕰️

别担心，只需将这些易变字段（如这里的 **ts**）添加到 **noise 参数**中**跳过这些断言**。

> 专业建议：在 `keploy.yml` 中添加 `body.timestamp` 到 noise 配置。

<img src="/docs/img/test-noise-employee-app.png" alt="为 Java Postgres 员工管理系统应用添加测试噪声" width="70%" style={{ borderRadius: '5px' }}/>

再次运行 `keploy test` 命令，见证所有测试都通过的奇迹！ 🌟

最后建议？深入探索！尝试不同的 API 调用，修改 `mocks.yml` 中的数据库响应，或者调整 `test-x.yml` 中的请求或响应。重新运行测试，看魔法如何展现！ ✨👩‍💻👨‍💻✨

接下来我们介绍使用 Docker 启动应用的指南。

## 使用 Docker 启动指南

Docker 前提条件：

1. Docker Desktop 4.25.2 或更高版本，或已安装 docker cli

这里我们只需要更改启动应用的命令。

### 捕获测试用例 🎬

```bash
keploy record -c "docker compose up" --container-name javaApp --build-delay 100
```

<img src="/docs/img/Keploy-record-docker-compose-employee-app.png" alt="Java 示例 Keploy 记录" width="100%" style={{ borderRadius: '5px' }} />

现在运行一些测试来捕获更多场景：

#### 生成测试用例 📝

只需**发起一些 API 调用**即可生成测试用例。可以使用 [Postman](https://www.postman.com/) 或简单的 `curl` 命令。

1. 创建员工记录 📥

```bash
curl --location --request POST 'http://localhost:8080/api/employees' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Myke",
    "lastName": "Tyson",
    "email": "mt@gmail.com",
    "timestamp":1
}'
```

这将返回响应或创建的记录。时间戳字段在测试时会自动忽略。

```bash
{
    "id": 1,
    "firstName": "Myke",
    "lastName": "Tyson",
    "email": "mt@gmail.com",
    "timestamp": 1661493301
}
```

2. 获取员工信息

```bash
curl --location --request GET 'http://localhost:8080/api/employees/1'
```

或通过浏览器访问 `http://localhost:8080/api/employees/1`

这些 API 调用会被捕获为**可编辑的**测试用例。

### 使用 Keploy 运行测试用例

```bash
keploy test -c "docker compose up" --container-name javaApp --build-delay 50 --delay 20
```

你的 CLI 应该会显示类似内容：
<img src="/docs/img/keploy-test-docker-compose-command.png" alt="Java 示例 Keploy 测试" width="100%" style={{ borderRadius: '5px' }} />

这是记录的测试用例摘要：
<img src="/docs/img/Keploy-test-docker-compose-employee-app.png" alt="Java 示例 Keploy 测试摘要" width="100%" style={{ borderRadius: '5px' }} />

这里的 `delay` 是你的应用启动所需时间，之后 Keploy 才会开始运行测试用例。如果你的应用启动时间超过 10 秒，可以相应调整 `delay` 参数。
`buildDelay` 是构建 Docker 镜像所需时间。当你直接从 docker compose 文件构建镜像时，这个参数很有用。

### 🎉 总结

恭喜你完成这段旅程！你已经见识了 Keploy 的强大功能，锻炼了编码能力，还收获了不少乐趣！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。 😊🚀

## 🚀 想在 CI/CD 中尝试 Keploy 吗？

我们为你准备好了 😎  
以下是 GitHub Actions 的设置指南：  
👉 [Keploy + GitHub CI/CD 指南](https://keploy.io/docs/ci-cd/github)

如果还有其他问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>