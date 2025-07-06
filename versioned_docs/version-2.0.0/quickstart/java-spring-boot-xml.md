---
id: java-spring-boot-xml
title: 使用Spring-Boot和XML构建的REST API示例
sidebar_label: XML API应用
description: 本CRUD应用演示了使用Spring Boot提供XML响应的REST API端点。
tags:
  - java
  - spring-boot
  - xml
  - quickstart
  - samples
  - examples
  - tutorial
  - restful-api
keyword:
  - XML
  - Maven
  - Springboot框架
  - REST API
  - Java
  - API测试生成器
  - 自动化测试用例生成
  - JAXB
---

## 简介

🌟 探索使用[Spring-Boot](https://github.com/spring-projects/spring-boot)创建返回XML格式的REST API。了解通过JAXB实现XML序列化的便捷性。让我们立即开始吧！🚀

## 先决条件 🛠️

- 安装Java 17并设置JAVA_HOME环境变量
- 安装[Maven](https://maven.apache.org/install.html)
- 安装[Docker](https://docs.docker.com/engine/install/)（可选）

## 快速开始 🎬

### 克隆并构建应用

```bash
git clone https://github.com/keploy/samples-java.git
cd spring-boot-xml/naive-spring-boot
mvn clean install
```

### 运行应用

启动Spring Boot应用：

```bash
mvn spring-boot:run
```

> **注意**：Windows用户使用相同命令。

## API端点 📡

### 获取用户数据(XML)

- **端点**: `GET /api/user`

使用`curl`请求：

```bash
curl -X GET -H \"Accept: application/xml\" http://localhost:8080/api/user
```

- **端点**: `GET /api/users`

使用`curl`请求：

```bash
curl -X GET http://localhost:8080/api/users -H "Accept: application/xml"
```

- **端点**: `GET /api/people`

使用`curl`请求：

```bash
curl -X GET http://localhost:8080/api/people -H "Accept: application/xml"
```

### XML响应示例

```xml
<User>
    <name>John Doe</name>
    <age>30</age>
    <phone>0101233333</phone>
</User>
```

## 集成Keploy 📥

轻松使用Keploy的测试生成能力：

### 安装Keploy

```bash
 curl --silent -O -L https://keploy.io/install.sh && source install.sh
```

或

### 安装云版本 -

```bash
  curl --silent -O -L https://keploy.io/ent/install.sh && source install.sh
```

### 记录测试用例

```bash
keploy record -c "java -jar target/XML-0.0.1-SNAPSHOT.jar"
```

开始记录交互：

```bash
keploy record -c "java -jar target/XML-0.0.1-SNAPSHOT.jar"
```

然后使用`curl`或您喜欢的API测试工具调用API。

### 运行生成的测试

执行记录的测试：

```bash
keploy test -c "java -jar target/XML-0.0.1-SNAPSHOT.jar" --delay 10
```

在`Keploy/reports`中查看生成的测试报告。

## 处理失败测试 ⚠️

如果遇到由于变量或无关数据（如时间戳或动态生成字段）导致的测试失败，可以将其添加到`keploy.yml`的全局噪声配置中：

**示例：**

<img width="694" alt="Screenshot 2025-03-11 at 12 07 04 AM" src="https://github.com/user-attachments/assets/92dc6480-73f9-435c-a3b8-c918b2acc7a1" />

```yaml
globalNoise:
  global:
    header.Date: []
    body:
      # 要忽略某些字段值，将正则模式传递给相应的数组值
      UserList: []
```

更新`keploy.yml`后重新运行测试，问题应得到解决。

<img width="711" alt="Screenshot 2025-03-11 at 12 07 19 AM" src="https://github.com/user-attachments/assets/bed57c1e-e7a9-4cbd-80d6-f69a2024ba60" />

## 依赖项 📚

- Spring Boot
- Spring Web
- JAXB (XML序列化)

## 总结 🎉

太棒了！您已成功完成使用Spring Boot和Keploy创建和测试XML API的全过程。继续探索、实验和创新吧！如有任何疑问，我们随时为您提供帮助！

import GetSupport from '../concepts/support.md'

<GetSupport/>