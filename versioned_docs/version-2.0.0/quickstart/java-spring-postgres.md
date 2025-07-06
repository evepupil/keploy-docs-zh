---
id: pet-clinic
title: 使用Keploy测试PetClinic应用
sidebar_label: PetClinic (PostgresDb)
description: 本示例应用展示如何结合Keploy为流行的Spring Boot Java应用创建测试用例和模拟数据。
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

这是一个宠物诊所应用，您可以通过与UI交互来录制测试用例和模拟数据，然后使用Keploy进行测试。

import Link from '@docusaurus/Link'

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

该项目分为前端和后端两部分，由于Keploy是后端测试平台，我们需要用Keploy启动项目后端，前端则保持正常运行。

## 前端设置

```bash
git clone https://github.com/keploy/samples-java.git
cd samples-java/spring-petclinic/spring-petclinic-angular
npm uninstall -g angular-cli @angular/cli
npm cache clean
npm install -g @angular/cli@latest
npm install --save-dev @angular/cli@latest
npm i
```

## 启动前端

```bash
npm run start
```

现在开始设置应用后端。进入后端目录开始操作：

```bash
cd samples-java/spring-petclinic/spring-petclinic-rest
```

有两种方式使用Keploy启动后端：

- [使用Keploy二进制文件](#二进制方式启动指南)
- [使用Keploy的docker镜像](#docker方式启动指南)

# 二进制方式启动指南

二进制文件前提条件：

1. Node 20.11.0 LTS
2. OpenJDK 17.0.9
3. MVN 3.6.3版本

## 后端设置

需要更新postgresql配置，修改文件：
`spring-petclinic/spring-petclinic-rest/src/main/resources/application-postgresql.properties`
将

```bash
spring.datasource.url=jdbc:postgresql://mypostgres:5432/petclinic
```

改为

```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/petclinic
```

然后构建jar包：

```bash
mvn clean install -Dmaven.test.skip=true
```

## 启动数据库

```bash
docker run -e POSTGRES_USER=petclinic -e POSTGRES_PASSWORD=petclinic -e POSTGRES_DB=petclinic -p 5432:5432 --name mypostgres postgres:15.2
```

## 使用Keploy录制测试用例

```bash
keploy record -c "java -jar target/spring-petclinic-rest-3.0.2.jar"
```

<img src="/docs/img/pet-record.png" alt="Keploy测试结果示例 Node JWT" width="100%" style={{ borderRadius: '5px' }} />

现在可以开始与UI交互，Keploy会自动在'keploy'文件夹中创建测试用例和模拟数据。

## 使用Keploy运行测试用例

```bash
keploy test -c "java -jar target/spring-petclinic-rest-3.0.2.jar" --delay 20
```

🎉 恭喜完成二进制方式操作指南！🎉

接下来我们继续介绍使用docker启动应用的指南。

# docker方式启动指南

Docker前提条件：

1. Docker Desktop 4.25.2及以上版本

这里只需更改启动应用的命令：

```bash
keploy record -c "docker compose up" --container-name javaApp --build-delay 100
```

<img src="/docs/img/pet-record.png" alt="Keploy录制Java示例" width="100%" style={{ borderRadius: '5px' }} />

## 使用Keploy运行测试用例

```bash
keploy test -c "docker compose up" --container-name javaApp --build-delay 50 --delay 20
```

命令行界面应类似这样
<img src="/docs/img/pet-test1.png" alt="Keploy测试Java示例" width="100%" style={{ borderRadius: '5px' }} />

这是录制的测试用例摘要
<img src="/docs/img/pet-test2.png" alt="Keploy测试摘要Java示例" width="100%" style={{ borderRadius: '5px' }} />

其中`delay`参数表示应用启动所需时间，之后Keploy才会开始运行测试用例。如果应用启动超过10秒，可相应调整`delay`值。
`buildDelay`参数表示镜像构建所需时间，当您直接从docker compose文件构建镜像时特别有用。

希望本指南对您有所帮助，如有其他问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>