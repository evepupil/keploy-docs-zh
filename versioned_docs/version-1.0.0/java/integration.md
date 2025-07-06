---
id: integration
title: Java集成指南 (v1.0.0)
description: 为您的应用添加Keploy Java SDK
tags:
  - 开发者指南
  - java
---

{'<'}details{'>'}{'<'}summary{'>'}
前置条件

{'<'}/summary{'>'}

- Java 1.8+
- [Maven](https://maven.apache.org/)
- [Docker](https://www.docker.com/)

{'<'}/details{'>'}

## 构建配置

1. 在[Maven中央仓库](https://search.maven.org/artifact/io.keploy/keploy-sdk)查找最新版Keploy Java SDK，并将_keploy-sdk_添加为`pom.xml`依赖项：

        {'<'}dependency{'>'}
          {'<'}groupId{'>'}io.keploy{'<'}/groupId{'>'}
          {'<'}artifactId{'>'}keploy-sdk{'<'}/artifactId{'>'}
          {'<'}version{'>'}1.0.13{'<'}/version{'>'}          {'<'}!--  使用最新版本 --{'>'}
        {'<'}/dependency{'>'}

同步依赖或添加到_build.gradle_:

    compile 'io.keploy:keploy-sdk:1.0.13'

2. 安装Keploy Jar包

   - 从[此处](https://search.maven.org/artifact/io.keploy/keploy-sdk/1.2.6/jar)下载最新jar包(例如：1.2.6)，用于模拟外部/内部依赖调用，如数据库查询、谷歌地图、S3等..

     - 将jar包放入`main`目录

       - 添加`-javaagent:`前缀并指定下载的Keploy jar包的绝对路径

         (例如：`-javaagent:/Users/jhon/project/src/main/agent-1.2.5.jar`)

         可通过三种方式设置：

         1. {'<'}details{'>'}{'<'}summary{'>'}
            使用Intellij
            {'<'}/summary{'>'}

            进入`编辑配置`-{'>'} `添加VM选项` -{'>'} 粘贴`-javaagent:/Users/jhon/project/src/main/agent-1.2.5.jar` -{'>'} `确定`。
            {'<'}/details{'>'}

         2. {'<'}details{'>'}{'<'}summary{'>'}
            使用命令行
            {'<'}/summary{'>'}

            ```
              export JAVA_OPTS="$JAVA_OPTS -javaagent:/Users/jhon/project/src/main/agent-1.2.5.jar"
            ```

            {'<'}/details{'>'}

         3. {'<'}details{'>'}{'<'}summary{'>'}
            通过Tomcat服务器运行
            {'<'}/summary{'>'}

            ```
                 export CATALINA_OPTS="$CATALINA_OPTS -javaagent:/Users/jhon/project/src/main/agent-1.2.5.jar"
            ```

         {'<'}/details{'>'}

## 支持的框架

- **基于Spring的应用**

  - 在主类的`@SpringBootApplication`下方添加`@Import(KeployMiddleware.class)`。

    ```java
      ...
      import io.keploy.servlet.KeployMiddleware;
      ...

     @SpringBootApplication
     @Import(KeployMiddleware.class)
     public class SamplesJavaApplication {
       public static void main(String[] args) {
          ...
      }
     }
    ```

- **Java EE应用**

  - 在**web.xml**文件中所有其他filter和servlet之前添加以下filter配置。

    ```xml
      {'<'}filter{'>'}
          {'<'}filter-name{'>'}middleware{'<'}/filter-name{'>'}
          {'<'}filter-class{'>'}io.keploy.servlet.KeployMiddleware{'<'}/filter-class{'>'}
      {'<'}/filter{'>'}

      {'<'}filter-mapping{'>'}
          {'<'}filter-name{'>'}middleware{'<'}/filter-name{'>'}
          {'<'}url-pattern{'>'}/*{'<'}/url-pattern{'>'}
      {'<'}/filter-mapping{'>'}
    ```

- **环境变量配置** (可选)

  - `APP_NAME` (默认值 APP_NAME = myApp)
  - `APP_PORT` (默认值 APP_PORT = 6789)
  - `KEPLOY_URL` (默认值 KEPLOY_URL = http://localhost:6789/api)
  - `KEPLOY_MODE` (默认值 KEPLOY_MODE = record/test)
  - `KTESTS_PATH` (默认使用应用的test目录)
  - `DENOISE` (默认值 DENOISE = false)
    **注意：** 启用降噪功能将过滤测试用例中的噪声字段。