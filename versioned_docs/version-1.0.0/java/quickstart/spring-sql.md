---
id: spring-sql
title: 使用Postgres DB的Spring应用示例 (v1.0.0)
sidebar_label: Spring-SQL示例
tags:
  - spring-jpa
  - java
  - sdk
  - tutorial
---

# 员工管理应用示例

这是一个使用SpringBoot和[PostgreSQL](https://www.postgresql.org/)测试Keploy集成能力的员工管理示例应用。

### 前置条件

- Java 8+

## 安装

前往[安装指南](../../server/server-installation.md)快速安装并运行Keploy服务器。

## 构建配置

1. 在maven中心[查找最新版本](https://search.maven.org/artifact/io.keploy/keploy-sdk)，并将_keploy-sdk_作为依赖添加到你的`pom.xml`中：

        <dependency>
          <groupId>io.keploy</groupId>
          <artifactId>keploy-sdk</artifactId>
          <version>1.0.13</version>          <!--  使用最新版本 -->
        </dependency>

同步依赖或添加到_build.gradle_：

    compile 'io.keploy:keploy-sdk:1.0.13'

2. 安装Keploy Jar

- 从[这里](https://search.maven.org/artifact/io.keploy/keploy-sdk/1.2.6/jar)下载最新jar（例如：1.2.6），用于模拟外部/内部依赖调用，如数据库查询、GMaps、S3等。

  - 将jar添加到`main`目录

    - **复制** `-javaagent:`前缀及上述下载的Keploy jar的绝对类路径

      （例如：`-javaagent:/Users/jhon/project/src/main/agent-1.2.5.jar`）

      可以通过以下3种方式设置：

      1.  {'<'}details{'>'}{'<'}summary{'>'}
          使用Intellij
          {'<'}/summary{'>'}

          进入`Edit Configuration`-> `add VM options` -> 粘贴

              -javaagent:/Users/jhon/project/src/main/agent-1.2.5.jar

          点击`OK`。
          {'<'}/details{'>'}

      2.  {'<'}details{'>'}{'<'}summary{'>'}
          使用命令行
          {'<'}/summary{'>'}

          ```
            export JAVA_OPTS="$JAVA_OPTS -javaagent:/Users/jhon/project/src/main/agent-1.2.5.jar"
          ```

          {'<'}/details{'>'}

      3.  {'<'}details{'>'}{'<'}summary{'>'}
          通过Tomcat服务器运行
          {'<'}/summary{'>'}

          export CATALINA_OPTS="$CATALINA_OPTS -javaagent:/Users/jhon/project/src/main/agent-1.2.5.jar"

      {'<'}/details{'>'}

## 设置员工管理示例应用

```bash
git clone https://github.com/keploy/samples-java && cd samples-java/employee-manager
```

### 为员工管理应用启动PostgreSQL数据库

```bash
docker-compose up -d
```

### Maven清理安装

```shell
mvn clean install -D maven.test.skip=true
```

### 设置KEPLOY_MODE为record

- 要记录测试用例，使用`KEPLOY_MODE`环境变量并将其设置为`record`模式。

## 生成测试用例

要生成测试用例，我们只需要**进行一些API调用**。你可以使用[Postman](https://www.postman.com/)或简单的`curl`

### 1. 创建员工条目

```bash
curl --location --request POST 'http://localhost:6789/api/employees' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Myke",
    "lastName": "Tyson",
    "email": "mt@gmail.com",
    "timestamp":1
}'
```

这将返回响应或一个条目。时间戳在测试时会自动忽略，因为它总是不同的。

```
{
    "id": 1,
    "firstName": "Myke",
    "lastName": "Tyson",
    "email": "mt@gmail.com",
    "timestamp": 1661493301
}
```

### 2. 获取记录的员工信息

```bash
curl --location --request GET 'http://localhost:6789/api/employees/1'
```

或通过浏览器查询`http://localhost:6789/api/employees/1`

现在，这些API调用都被捕获为**可编辑**的测试用例，并写入`test/e2e/keploy-tests`文件夹。Keploy目录还会有一个`mocks`文件夹。

![testcases](/img/test-case-Java.png "记录的测试用例和模拟")

现在，让我们见证魔法！🪄💫

## 测试模式

有两种方法可以使用Keploy测试应用程序。

1. 单元测试文件
2. 不使用单元测试文件

### **使用单元测试文件测试**

- 设置`KEPLOY_MODE = test`（默认为"off"）

_注意：你需要在测试配置文件中再次设置`javaagent`，如下所示。_

![run_configuration](/img/Run_Configuration.png "运行配置")

- 现在我们已经捕获了测试用例，运行示例应用仓库中已存在的单元测试文件（`SampleJavaApplication_Test.java`）。

- 如果不存在，你可以在示例应用的测试模块中创建并添加以下代码到`SampleJavaApplication_Test.java`。

```java
   @Test
   public void TestKeploy() throws InterruptedException {

       CountDownLatch countDownLatch = HaltThread.getInstance().getCountDownLatch();
       Mode.setTestMode();

       new Thread(() -> {
           <你的应用类>.main(new String[]{""});
           countDownLatch.countDown();
       }).start();

       countDownLatch.await();
       assertTrue(AssertKTests.result(), "Keploy测试结果");
   }
```

- **使用IDE：** _(对于本地用例，我们更喜欢通过IDE运行测试)_

  1. 运行你的应用程序。
  2. 你也可以使用覆盖率运行应用程序，查看测试覆盖率。

- **使用CLI**

  1. 将maven-surefire-plugin添加到你的`pom.xml`中。在`<argLine > </ argLine >`中，**不要**添加jacoco代理，如果你不需要覆盖率报告。

  {'<'}details{'>'}{'<'}summary{'>'}
  添加插件
  {'<'}/summary{'>'}

        ```xml
          <plugin>
             <groupId>org.apache.maven.plugins</groupId>
             <artifactId>maven-surefire-plugin</artifactId>
             <version>2.22.2</version>
             <configuration>

          <!-- <skipTests>true</skipTests> -->
             <argLine>
                <!---javaagent:<你的完整代理jar路径>.jar-->
                -javaagent:${settings.localRepository}/org/jacoco/org.jacoco.agent/0.8.7/org.jacoco.agent-0.8.7-runtime.jar=destfile=target/jacoco.exec
             </argLine>

                 <systemPropertyVariables>
                     <jacoco-agent.destfile>target/jacoco.exec
                     </jacoco-agent.destfile>
                 </systemPropertyVariables>
             </configuration>
          </plugin>
         ```

  {'<'}/details{'>'}

  2. 如果你需要覆盖率报告，还需将Jacoco插件添加到_pom.xml_中。

  {'<'}details{'>'}{'<'}summary{'>'}
  添加插件
  {'<'}/summary{'>'}

       ```xml
         <plugin>
             <groupId>org.jacoco</groupId>
             <artifactId>jacoco-maven-plugin</artifactId>
             <version>0.8.5</version>
             <executions>
                  <execution>
                      <id>prepare-agent</id>
                      <goals>
                        <goal>prepare-agent</goal>
                      </goals>
                  </execution>
                  <execution>
                      <id>report</id>
                        <phase>prepare-package</phase>
                        <goals>
                             <goal>report</goal>
                        </goals>
                  </execution>
                  <execution>
                       <id>post-unit-test</id>
                         <phase>test</phase>
                         <goals>
                             <goal>report</goal>
                         </goals>
                         <configuration>
                             <!-- 设置包含执行数据的文件路径。 -->

                             <dataFile>target/jacoco.exec</dataFile>
                             <!-- 设置代码覆盖率报告的输出目录。 -->
                             <outputDirectory>target/my-reports</outputDirectory>
                         </configuration>
                  </execution>
             </executions>
         </plugin>
       ```

  {'<'}/details{'>'}

  3.  使用命令运行测试：`mvn test`。

它将在目标文件夹中创建.html文件作为测试报告！！

**_我们无需编写任何测试用例就获得了53%的覆盖率。🎉_**

前往Keploy控制台的TestRuns页面，深入了解哪些测试用例运行了，哪些失败了。

![testruns](https://i.imgur.com/tg6OT0n.png "摘要")

**或**

### **不使用单元测试文件测试**

要使用`KEPLOY_MODE`环境变量测试，将其设置为`test`模式。

```
export KEPLOY_MODE=test
```

现在只需通过ide或使用命令运行应用程序：

```shell
java -javaagent:<你的完整代理jar路径>.jar -jar <你的完整应用jar路径>.jar
```

Keploy将运行所有捕获的测试用例，比较并在控制台显示结果。

{'<'}details{'>'}
{'<'}summary{'>'}
控制台日志结果
{'<'}/summary{'>'}

```shell
10b3ddd5-42fa-48e7-b98a-b47257272e39 总测试数: 2
2022-08-26 14:13:08.993  INFO 11560 --- [       Thread-4] io.keploy.service.GrpcService            : 测试第1个测试用例，共2个，测试用例ID: [ae4a6c91-712a-4566-bf0d-97d708f94b2d]
2022-08-26 14:13:08.994  INFO 11560 --- [       Thread-4] io.keploy.service.GrpcService            : 测试第2个测试用例，共2个，测试用例ID: [4843e03e-76a8-4194-99cb-f62740978d15]
2022-08-26 14:13:09.061  INFO 11560 --- [nio-8080-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : 初始化Spring DispatcherServlet 'dispatcherServlet'
2022-08-26 14:13:09.061  INFO 11560 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : 初始化Servlet 'dispatcherServlet'
2022-08-26 14:13:09.062  INFO 11560 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : 初始化完成，耗时1毫秒
Hibernate: insert into employees (email, first_name, last_name, timestamp) values (?, ?, ?, ?)
2022-08-26 14:13:09.247  INFO 11560 --- [pool-3-thread-1] io.keploy.service.GrpcService            : 结果 : 测试用例ID: [ae4a6c91-712a-4566-bf0d-97d708f94b2d]  通过: true
Hibernate: select employee0_.id as id1_0_0_, employee0_.email as email2_0_0_, employee0_.first_name as first_na3_0_0_, employee0_.last_name as last_nam4_0_0_, employee0_.timestamp as timestam5_0_0_ from employees employee0_ where employee0_.id=?
2022-08-26 14:13:09.291  INFO 11560 --- [pool-3-thread-1] io.keploy.service.GrpcService            : 结果 : 测试用例ID: [4843e03e-76a8-4194-99cb-f62740978d15]  通过: true
2022-08-26 14:13:09.388  INFO 11560 --- [       Thread-4] io.keploy.service.GrpcService            : 测试运行完成，运行ID [1e81233d-e3be-4a4a-afda-a800902ad965]
2022-08-26 14:13:09.388  INFO 11560 --- [       Thread-4] io.keploy.service.GrpcService            : || 整体通过: TRUE ||
2022-08-26 14:13:19.408  INFO 11560 --- [ionShutdownHook] j.LocalContainerEntityManagerFactoryBean : 关闭JPA EntityManagerFactory，持久化单元 'default'
2022-08-26 14:13:19.410  INFO 11560 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - 开始关闭...
2022-08-26 14:13:19.414  INFO 11560 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - 关闭完成。
```

{'<'}/details{'>'}

![testruns](/img/TestrunsSuccess.png "最近的测试运行")

## 让我们在应用中引入一个Bug

现在让我们引入一个bug！尝试在控制器`./EmployeeController.java`的第35行更改一些内容，比如添加一些额外的头信息：

```java
return ResponseEntity.ok().header("MyNewHeader","abc").body(employee);
```

让我们运行测试文件，看看Keploy是否能捕获引入的回归问题。

```shell
mvn test
```

你会在输出中注意到失败的测试用例。

```shell
2022-08-26 13:10:10.289 TRACE 70155 --- [nio-8080-exec-2] o.h.type.descriptor.sql.BasicBinder      : 绑定参数 [1] 为 [BIGINT] - [1]
2022-08-26 13:10:10.307  INFO 70155 --- [pool-3-thread-1] io.keploy.service.GrpcService            : 结果 : 测试用例ID: [d42a3724-2c78-4f42-8dc6-d25a9b611c7c]  通过: false
2022-08-26 13:10:10.312  INFO 70155 --- [       Thread-1] io.keploy.service.GrpcService            : 测试运行完成，运行ID [fcb61332-1025-463f-854e-6f406bce870d]
2022-08-26 13:10:10.312  INFO 70155 --- [       Thread-1] io.keploy.service.GrpcService            : || 整体通过: FALSE ||
```

要深入分析问题，请前往[测试运行](http://localhost:6789/testruns)

![testruns](/img/IntroduceBugJava.png "最近的测试运行")