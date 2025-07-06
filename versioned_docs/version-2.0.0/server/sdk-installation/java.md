---
id: java
title: 合并单元测试覆盖率数据
sidebar_label: Java
tags:
  - java
  - coverage
keyword:
  - MongoDB
  - Jacoco
  - Maven
  - Springboot框架
  - Postgres
  - SQL
  - Java
  - API测试生成器
  - 自动测试用例生成
  - Junit
---

import WhatAreKeployFeatures from './index.md'

<WhatAreKeployFeatures/>

## 🛠️ 语言特定要求

| 编程语言 | 前提条件  |
| :------: | :------- |
|   java   | [Jacoco 0.8.8] |

**注意**：对于Java应用程序，在运行测试子命令前，需要清理项目，删除之前生成的所有文件，并运行install命令。

```bash
mvn clean install -Dmaven.test.skip=true
```

## 使用方法

### 更新 `pom.xml` 文件

你需要在应用程序的 `pom.xml` 文件中添加以下插件：-

```xml
<build>
	<plugins>
		<!-- 你的插件会放在这里 -->
        <plugin>
            <groupId>org.jacoco</groupId>
            <artifactId>jacoco-maven-plugin</artifactId>
            <version>0.8.8</version>
            <executions>
                <!-- 准备JaCoCo代理以在测试期间跟踪覆盖率 -->
                <execution>
                    <id>prepare-agent</id>
                    <goals>
                        <goal>prepare-agent</goal>
                    </goals>
                </execution>
                <!-- 在测试运行后合并e2e和单元测试的执行数据文件 -->
                <execution>
                    <id>merge-ut-e2e</id>
                    <phase>test</phase>
                    <goals>
                        <goal>merge</goal>
                    </goals>
                    <configuration>
                        <fileSets>
                            <fileSet>
                                <directory>${project.build.directory}</directory>
                                <includes>
                                    <include>jacoco.exec</include>
                                    <include>keploy-e2e.exec</include>
                                </includes>
                            </fileSet>
                        </fileSets>
                        <!-- 合并数据的输出 -->
                        <destFile>${project.build.directory}/ut-e2e-merged.exec</destFile>
                    </configuration>
                </execution>
                <!-- 基于不同的执行数据生成报告 -->
                <!-- 生成单元测试报告 -->
                <execution>
                    <id>post-unit-test</id>
                    <phase>test</phase>
                    <goals>
                        <goal>report</goal>
                    </goals>
                    <configuration>
                        <dataFile>${project.build.directory}/jacoco.exec</dataFile>
                        <!-- 使用合并的数据文件 -->
                        <outputDirectory>${project.reporting.outputDirectory}/ut</outputDirectory>
                    </configuration>
                </execution>
                <!-- 生成组合（e2e+单元测试）测试报告 -->
                <execution>
                    <id>combined-ut-e2e</id>
                    <phase>test</phase>
                    <goals>
                        <goal>report</goal>
                    </goals>
                    <configuration>
                        <dataFile>${project.build.directory}/ut-e2e-merged.exec</dataFile>
                        <!-- 使用合并的数据文件 -->
                        <outputDirectory>${project.reporting.outputDirectory}/e2e-ut-aggregate</outputDirectory>
                    </configuration>
                </execution>
            </executions>
        </plugin>
		<!-- 你的插件会放在这里 -->
	</plugins>
</build>
```

现在，要获取组合报告以及单元测试的覆盖率报告，运行：

```bash
mvn test
```

单元测试报告的HTML文件将在target/site/ut目录中生成，组合报告将在target/site/e2e-ut-aggregate目录中生成。打开index.html以可视化报告。