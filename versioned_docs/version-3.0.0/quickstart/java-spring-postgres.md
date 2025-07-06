---
id: pet-clinic
title: Keploy与PetClinic集成
sidebar_label: PetClinic (PostgresDb)
description: 本示例应用展示了如何为流行的Spring Boot Java应用使用Keploy创建测试用例和模拟数据。
tags:
  - java
  - spring-jpa
  - springboot
  - java框架
  - postgres
  - petclinic
  - 快速入门
  - 示例
  - 教程
keyword:
  - Jacoco
  - Maven
  - Springboot框架
  - Postgres
  - SQL
  - Java
  - 测试PetClinic
  - Junit
---

这是一个宠物诊所应用，您可以通过与UI交互来记录测试用例和模拟数据，然后使用Keploy进行测试。

import Link from '@docusaurus/Link'

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

该项目分为前端和后端两部分，由于Keploy是后端测试平台，我们需要使用Keploy启动项目的后端部分，并正常运行前端。

## 前端设置

### 前端先决条件：

1. Node版本16.x及以上

```bash
git clone https://github.com/keploy/samples-java.git
cd samples-java/spring-petclinic/spring-petclinic-angular
npm i --legacy-peer-deps
```

## 启动前端

```bash
npm run start
```

现在开始设置应用的后端。让我们进入后端目录开始操作。

```bash
cd samples-java/spring-petclinic/spring-petclinic-rest
```

您可以通过两种方式使用Keploy启动后端：

- [使用Keploy二进制文件](#instructions-for-starting-using-binary)
- [使用Keploy的Docker镜像](#instructions-for-starting-using-docker)

# 使用API后端二进制文件启动指南

API后端二进制文件先决条件：

1. OpenJDK 17+
2. MVN版本3.6+

## 后端设置

您需要更新postgresql属性，前往
`spring-petclinic/spring-petclinic-rest/src/main/resources/application-postgresql.properties`
将

```bash
spring.datasource.url=jdbc:postgresql://mypostgres:5432/petclinic
```

修改为

```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/petclinic
```

然后使用以下命令构建jar：

```bash
mvn clean install -Dmaven.test.skip=true
```

## 启动数据库

```bash
docker run -e POSTGRES_USER=petclinic -e POSTGRES_PASSWORD=petclinic -e POSTGRES_DB=petclinic -p 5432:5432 --name mypostgres postgres:15.2
```

## 使用Keploy记录测试用例

```bash
keploy record -c "java -jar target/spring-petclinic-rest-3.0.2.jar"
```

<img src="/docs/img/pet-record.png" alt="Sample Keploy Test Result Node JWT" width="100%" style={{ borderRadius: '5px' }} />

现在您可以开始与UI交互，Keploy会自动在名为'keploy'的文件夹中创建测试用例和模拟数据。

## 使用Keploy运行测试用例

```bash
keploy test -c "java -jar target/spring-petclinic-rest-3.0.2.jar" --delay 20
```

🎉 恭喜！您已完成二进制文件部分！🎉

接下来我们继续介绍使用Docker启动应用的指南。

# 使用Docker启动指南

Docker先决条件：

1. Docker Desktop 4.25.2及以上

这里我们只需要更改启动应用的命令。

```bash
keploy record -c "docker compose up" --container-name javaApp --build-delay 100
```

<img src="/docs/img/pet-record.png" alt="Sample Keploy Record Java" width="100%" style={{ borderRadius: '5px' }} />

## 使用Keploy运行测试用例

```bash
keploy test -c "docker compose up" --container-name javaApp --build-delay 50 --delay 20
```

您的CLI应该会显示类似这样的内容
<img src="/docs/img/pet-test1.png" alt="Sample Keploy Test Java" width="100%" style={{ borderRadius: '5px' }} />

这是记录的测试用例摘要
<img src="/docs/img/pet-test2.png" alt="Sample Keploy Test Summary Java" width="100%" style={{ borderRadius: '5px' }} />

这里的`delay`是应用启动所需的时间，之后Keploy将开始运行测试用例。如果您的应用启动时间超过10秒，可以相应调整`delay`。
`buildDelay`是构建镜像所需的时间。当您直接从docker compose文件构建Docker镜像时，这很有用。

希望这对您有所帮助，如果仍有疑问，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>