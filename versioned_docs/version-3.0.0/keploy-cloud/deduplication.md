---
id: deduplication
title: 去除重复测试 🧹
sidebar_label: 去除重复测试 🧹
tags:
  - 说明
  - 功能指南
  - 测试去重
keywords:
  - 去重
  - keploy云服务
  - 重复测试
  - python
  - java
  - nodejs
  - node
  - 测试用例
---

## 为什么需要去重？ ❄️

在开发或维护软件时，测试套件规模增长是常见现象。这往往会导致冗余，因为许多测试用例覆盖了相同的功能或场景。此时就需要测试去重功能发挥作用。

它通过移除冗余测试用例来简化测试流程，从而节省时间和资源，同时保留那些能为应用整体覆盖率增加价值的测试用例。

## 使用方法 🛠️

要检测重复测试，只需运行以下命令：

```bash
keploy dedup -c "<运行应用的命令>" -t="<要运行的测试集>"
```

### 对于Node应用

**1. 前置条件**

安装`keploy/sdk`和`nyc`包：-

```bash
npm i @keploy/sdk nyc@15.0.0
```

在主应用js文件(index.js/server.js/app.js/main.js)顶部添加：-

```bash
const kmiddleware = require('@keploy/sdk/dist/v2/dedup/middleware.js')

app.use(kmiddleware())
```

**2. 运行去重**

```
keploy dedup -c "<运行应用的命令>" --delay 10 -t="<要运行的测试集>"
```

#### 示例

我们使用[expresss-mongoose](https://github.com/keploy/samples-typescript/tree/main/express-mongoose)应用来测试去重功能。在`src/app.js`文件中已导入并初始化`@keploy/sdk`包后，运行去重命令：-

```bash
keploy dedup -c "node src/app.js" -t "test-set-1"
```

<img width="1060" alt="image" src="https://github.com/keploy/docs/assets/53110238/641ded9d-c75f-4861-aafd-bc0f2bbeda7f" />

搞定！Keploy现在将检测重复测试。

### 对于Java应用

**1. 前置条件**

在pom.xml中添加最新keploy-sdk：-

```xml
<dependency>
    <groupId>io.keploy</groupId>
    <artifactId>keploy-sdk</artifactId>
    <version>0.0.1-SNAPSHOT</version>
</dependency>
```

添加keploy-sdk后，在主类中导入：-

```java
import io.keploy.servlet.KeployMiddleware;

@Import(KeployMiddleware.class)
public class SamplesJavaApplication {
    public static void main(String[] args) {
        SpringApplication.run(SamplesJavaApplication.class, args);
    }
}
```

**2. 运行去重**

通过以下命令创建Jar文件：-

```bash
mvn clean install -DskipTests
```

准备好jar文件后，运行以下命令：-

```bash
keploy dedup -c "java -javaagent:<JacocoAgent路径>=address=*,port=36320,destfile=jacoco-it.exec,output=tcpserver -jar <JAR文件路径>"  --delay 10 -t="test-set-0"
```

搞定！Keploy现在将检测重复测试。

### 对于Python应用

去重功能仅在测试模式下工作，记录测试时无需特殊操作。

**1. 前置条件**

安装最新keploy-sdk：-

```bash
pip install keploy coverage requests fastapi
```

在主应用文件中添加以下内容（根据框架选择相应中间件）：

1. FastAPI -

```py
# 现有导入
from keploy import FastApiCoverageMiddleware

app.add_middleware(FastApiCoverageMiddleware)
# 现有函数
```

2. Flask -

```py
# 现有导入
from keploy import FlaskCoverageMiddleware

app.wsgi_app = FlaskCoverageMiddleware(app.wsgi_app)

# 现有函数
```

3. Django - 打开`settings.py`并将中间件类添加到**MIDDLEWARE**列表：

```py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'keploy.DjangoCoverageMiddleware',  # 在此添加keploy中间件
],

# 其他设置
```

**2. 运行去重**

使用要检查重复的测试集运行keploy：

```sh
keploy dedup -c "<运行Python应用的命令>" --delay "<应用启动所需时间>"
```

#### 示例

我们使用[flask-mongo](https://github.com/keploy/samples-python/tree/main/flask-mongo)应用测试去重功能。在`app.py`文件中已导入并初始化`keploy`包（按上述Flask方式操作）后，运行去重命令：-

```bash
keploy dedup -c "python3 app.py" -t "test-set-1"
```

<img width="1111" alt="image" src="https://github.com/user-attachments/assets/03638c80-ae11-492f-9b4e-bce92d15a04e"/>

## 移除重复测试

可通过以下命令简单移除重复测试：

```bash
keploy dedup --rm
```