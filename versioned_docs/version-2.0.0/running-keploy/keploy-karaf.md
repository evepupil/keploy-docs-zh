---
id: keploy-karaf-example
title: 在Apache Karaf中设置Keploy Agent进行本地开发
sidebar_label: Keploy Karaf示例
description: 本节文档介绍如何在Karaf中运行keploy
tags:
  - keploy
  - keploy karaf
keywords:
  - keploy
  - 文档
  - 运行指南
---

## 步骤1：下载所需JAR文件和Keploy版本

### 前提条件

- Linux内核版本 **5.15或更高**
- 已测试的发行版：
  - **Fedora 40+**
  - **Ubuntu 22.04+**
  - **Debian 12+**
- 已测试JDK 1.8至17和[Karaf 4.3.x](https://karaf.apache.org/download.html)

### 安装Keploy二进制文件

使用Keploy的一键安装脚本下载并安装最新版Keploy二进制文件：

```bash
curl --silent -O -L https://keploy.io/ent/install.sh && source install.sh
```

### 下载所需JAR文件

使用`wget`下载必要的JAR文件：

- [io.keploy.agent-2.0.1.jar](https://keploy-enterprise.s3.us-west-2.amazonaws.com/agent-jars/io.keploy.agent-2.0.1.jar)
- [org.jacoco.agent-0.8.12-runtime.jar](https://keploy-enterprise.s3.us-west-2.amazonaws.com/agent-jars/org.jacoco.agent-0.8.12-runtime.jar)

运行以下命令下载文件：

```bash
wget https://keploy-enterprise.s3.us-west-2.amazonaws.com/agent-jars/io.keploy.agent-2.0.1.jar
wget https://keploy-enterprise.s3.us-west-2.amazonaws.com/agent-jars/org.jacoco.agent-0.8.12-runtime.jar
```

## 步骤2：配置Apache Karaf

### 在`setenv`文件中更新Linux的`JAVA_OPTS`：

1. 进入Apache Karaf安装目录的`bin`文件夹
2. 打开`setenv`文件进行编辑
3. 在`JAVA_OPTS`部分添加下载的agent路径。例如：

   ```bash
   export JAVA_OPTS="-javaagent:/path/to/io.keploy.agent-2.0.1.jar"
   export JAVA_OPTS="$JAVA_OPTS -javaagent:/path/to/org.jacoco.agent-0.8.12-runtime.jar=address=*,port=36320,destfile=jacoco-it.exec,output=tcpserver"
   ```

请将占位值替换为实际路径和密钥。

## 步骤3：设置环境变量

1. 导出用户在[Keploy用户仪表盘](https://app.keploy.io/users)中获取的API密钥（Keploy运行必需），在当前终端会话中运行：

   ```bash
   export KEPLOY_API_KEY="<KEPLOY_API_KEY>"
   ```

   如果API密钥不同，请替换`KEPLOY_API_KEY`值为实际密钥。

2. 导出应用路径指向包含Java类的目标文件夹：

   ```bash
   export KEPLOY_APP_UNDER_TEST_PATH="/Users/path/to/karaf-sample/user-service"
   ```

   请将`KEPLOY_APP_UNDER_TEST_PATH`值替换为应用目标文件夹的绝对路径（存放Java编译后的类文件）。

## 步骤4：录制测试用例

1. 启动karaf环境
   ```
     bin/karaf
   ```
2. 使用以下命令录制测试用例：

   ```bash
   keploy record --base-path="http://localhost:8181"
   ```

3. 对应用端点发起一系列API调用
4. 完成API调用后，在运行Keploy二进制文件的会话中按`Ctrl+C`停止录制

## 步骤5：或导入Postman集合

1. 确保已准备好应用的Postman集合
2. 运行以下命令将Postman集合导入为Keploy测试：

   ```bash
   keploy import postman --path="/path/to/YourPostmanCollection.json"
   ```

   请将`/path/to/YourPostmanCollection.json`替换为Postman集合的实际路径

## 步骤6：运行Keploy测试

1. 使用以下命令运行导入的测试：

   ```bash
   keploy test --base-path="http://localhost:8181"
   ```

此命令假设Karaf应用运行在本地的8181端口。

测试运行后，将在项目根目录生成`coverage.xml`文件。该文件包含测试覆盖率报告，可用于进一步分析或集成到CI/CD流程中。