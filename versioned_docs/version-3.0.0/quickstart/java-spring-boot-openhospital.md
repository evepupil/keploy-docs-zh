---
id: openhospital
title: Keploy与OpenHospital集成
sidebar_label: OpenHospital (Mysql)
description: 本示例应用展示了如何为流行的Spring Boot Java应用使用Keploy创建测试用例和模拟。
tags:
  - java
  - spring-jpa
  - springboot
  - React
  - java框架
  - postgres
  - openhospital
  - 快速入门
  - 示例
  - 教程
keyword:
  - Jacoco
  - Maven
  - Springboot框架
  - Mysql
  - SQL
  - Java
  - 测试OpenHospital
  - Junit
  - React
---

这是一个openhospital应用，您可以通过与UI交互来录制测试用例和模拟，然后使用Keploy进行测试。

import Link from '@docusaurus/Link'

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

该项目包含三个部分 - UI、核心和API。由于Keploy是后端测试平台，我们需要使用Keploy启动项目的后端，并正常运行前端。

如果您想在Mac上尝试此快速入门设置，请使用Lima。如果您在Windows上，请使用WSL。

## 核心设置

```bash
git clone https://github.com/keploy/openhospital-core
git checkout integration-with-keploy
mvn clean install -DskipTests=true
docker compose up

```

注意：如果在设置数据库时遇到任何问题，请尝试再次运行docker compose up。第二次运行时应该不会出现问题。

## 后端设置

现在是我们设置应用后端的时候了。让我们安装Openhospital API并开始。

```bash
git clone https://github.com/keploy/openhospital-api
git checkout integration-with-keploy
mvn clean install -DskipTests=true
```

现在是时候使用Keploy CLI启动后端了：

# 二进制启动指南

二进制文件前提条件：

1. Node 20.11.0 LTS
2. OpenJDK 17.0.9
3. MVN版本3.6.3

## 使用Keploy录制测试用例

```bash
keploy record -c "java -cp "target/openhospital-api-0.1.0.jar:rsc/:static/" org.springframework.boot.loader.launch.JarLauncher"
```

<img src="/docs/img/Keploy-record-openhospital.png" alt="Keploy录制Java示例" width="100%" style={{ borderRadius: '5px' }} />

## 启动前端

```bash
git clone https://github.com/keploy/openhospital-ui
git checkout integration-with-keploy
npm install
npm start
```

注意：使用用户名`admin`和密码`admin`登录
<img src="/docs/img/openhospital-ui.png" alt="Keploy录制Java示例" width="100%" style={{ borderRadius: '5px' }} />

如果您正确遵循了所有步骤，您应该会看到与上图类似的UI。

现在您可以开始与UI交互，Keploy将自动在名为'keploy'的文件夹中创建测试用例和模拟。

## 使用Keploy运行测试用例

```bash
keploy test -c "java -cp "target/openhospital-api-0.1.0.jar:rsc/:static/" org.springframework.boot.loader.launch.JarLauncher" --delay 40

```

🎉 恭喜！您已经完成了二进制部分！🎉

您的CLI应该看起来像这样
<img src="/docs/img/Keploy-test-openhospital.png" alt="Keploy测试Java示例" width="100%" style={{ borderRadius: '5px' }} />

这是录制的测试用例摘要
<img src="/docs/img/result-openhospital.png" alt="Keploy测试摘要Java示例" width="100%" style={{ borderRadius: '5px' }} />

这里的`delay`是您的应用启动所需的时间，之后Keploy将开始运行测试用例。如果您的应用启动时间超过10秒，您可以相应地更改`delay`。
`buildDelay`是构建镜像所需的时间。当您从docker compose文件本身构建docker镜像时，这很有用。

希望这对您有所帮助，如果您还有任何问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>