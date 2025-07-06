---
id: replay
title: Java回放测试与模拟工具 (v1.0.0)
description: Keploy中的Java回放测试套件。
tags:
  - 开发者指南
  - go
  - 回放指南
  - 回放测试用例
---

import ReplayTest from '../operation/test.md'

<ReplayTest/>

### 方法二 [推荐]

<details><summary>
使用单元测试文件进行测试

</summary>

import JUnit from './integration-with-junit.md'

<JUnit/>

</details>

### 方法三

<details><summary>
使用Surgefire获取测试覆盖率

</summary>

要获取测试覆盖率，在方法二的基础上，请遵循以下步骤：

- 在_pom.xml_中添加maven-surefire-plugin插件：

```xml
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>2.22.2</version>
                <configuration>

            <!-- <skipTests>true</skipTests> -->

                    <systemPropertyVariables>
                        <jacoco-agent.destfile>target/jacoco.exec
                        </jacoco-agent.destfile>
                    </systemPropertyVariables>
                </configuration>
            </plugin>
```

- 在_pom.xml_中添加Jacoco插件：

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
                           <!-- 设置包含执行数据文件的路径 -->

                           <dataFile>target/jacoco.exec</dataFile>
                           <!-- 设置代码覆盖率报告的输出目录 -->
                           <outputDirectory>target/my-reports</outputDirectory>
                       </configuration>
                   </execution>
               </executions>
           </plugin>
```

- 使用命令运行测试：`mvn test`。

</details>

### 方法四

<details><summary>
在CI/CD中运行测试

</summary>

按照上述方法二操作后，Keploy将与`junit`集成。
如果您的CI/CD流水线中已有`junit`，则无需进行任何更改。

</details>