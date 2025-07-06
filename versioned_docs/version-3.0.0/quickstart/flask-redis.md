---
id: flask-redis
title: 示例图书馆应用（Flask + Redis）
sidebar_label: Flask + Redis
description: 该应用是一个使用Flask框架和Redis数据库构建的简单图书馆API，支持对图书记录进行基础的CRUD（创建、读取、更新、删除）操作。

tags:
  - flask
  - 快速入门
  - 示例
  - 教程
  - python框架
  - redis
keyword:
  - FastAPI框架
  - Flask
  - Redis
  - Python
  - API测试生成器
  - 自动化用例生成
---

## 简介

🪄 探索学生CRUD应用的世界，见证Keploy如何无缝集成Flask与Redis。系好安全带，这将是一段有趣的旅程！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 快速开始 🎬

## 克隆应用 🧪

```bash
git clone https://github.com/keploy/samples-python.git && cd samples-python/flask-redis
```

## 安装Keploy

根据操作系统选择安装方式：

我们将通过以下方式运行应用：

- [使用Docker compose：在容器中运行应用及MongoDB](#使用docker-compose-)

## 使用Docker Compose 🐳

我们将使用Docker compose在容器中运行应用及Redis数据库。

### 准备录制！🎥

捕获测试用例：

```shell
keploy record -c "docker compose up" --container-name "flask-web" --buildDelay 50
```

🔥**发起一些API请求**。可以使用Postman、Hoppscotch或curl工具。

简化URL示例：

### 生成测试用例

只需**发起API调用**即可生成测试用例：

1. **发起POST请求：**

```bash
curl -X POST http://localhost:5000/books/ \
-H "Content-Type: application/json" \
-d '{"title": "1984", "author": "George Orwell"}'
```

2. **发起GET请求：**

```bash
curl -X GET "http://localhost:5000/books/?page=1&limit=10"
```

3. **发起PUT请求：**

```bash
curl -X PUT http://localhost:5000/books/1 \
-H "Content-Type: application/json" \
-d '{"title": "1984 - Updated", "author": "George Orwell"}'
```

4. **发起DELETE请求：**

```bash
curl -X DELETE http://localhost:5000/books/1
```

完成后停止录制。此时您已在`tests`目录和`mocks.yml`中生成测试用例与模拟数据。

```yaml
version: api.keploy.io/v1beta1
kind: Redis
name: mock-0
spec:
  metadata:
    type: config
  redisrequests:
    - origin: client
      message:
        - type: string
          data: "*4\r\n$6\r\nCLIENT\r\n$7\r\nSETINFO\r\n$8\r\nLIB-NAME\r\n$8\r\nredis-py\r\n"
  redisresponses:
    - origin: server
      message:
        - type: string
          data: "+OK\r\n"
  reqtimestampmock: 2024-08-02T22:15:10.6084523Z
  restimestampmock: 2024-08-02T22:15:10.608930466Z
---
```

### **运行测试用例**

```bash
keploy test -c 'sudo docker compose up' --containerName "flask-web" --delay 10
```

可通过CLI查看测试摘要：

```bash
<=========================================>
  测试运行总览
        总测试数: 11
        通过数: 10
        失败数: 1
        总耗时: "15.13秒"

        测试集名称         总数       通过       失败       耗时

        "test-set-0"      6         6         0       "5.06秒"
        "test-set-1"      1         1         0       "5.02秒"
        "test-set-2"      4         3         1       "5.04秒"
<=========================================>
```

## 可能遇到的错误？

1. 运行应用时若端口被占用，会抛出EBPF错误

查看端口占用情况：

```bash
sudo lsof -p
```

检查指定端口（如5000）的进程：

```bash
sudo lsof -i :5000
```

终止占用端口的进程：

```bash
sudo kill -9 <PID>
```

2. ERROR: for redis 'ContainerConfig'

此错误通常由Docker Compose文件版本兼容性问题导致。

解决方案：

```bash
sudo apt-get update
sudo apt-get install docker-compose
```

检查compose文件权限：

```bash
ls -l docker-compose.yml
```

重新运行上述录制或测试命令