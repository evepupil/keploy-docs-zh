---
id: samples-django
title: 用户数据CRUD应用示例（Django）
sidebar_label: Django + Postgres
description: 以下示例应用展示了如何使用Django框架和Keploy平台。
tags:
  - python
  - quickstart
  - samples
  - examples
  - tutorial
  - python-framework
  - postgres
keyword:
  - Django框架
  - Postgres
  - SQL
  - Python
  - API测试生成器
  - 自动化用例生成
---

# 简介

🪄 进入用户CRUD应用的世界，看看Keploy如何与Django和[PostgreSQL](https://www.postgresql.org/)无缝集成。系好安全带，这将是一段有趣的旅程！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 开始使用！🎬

## 克隆用户数据CRUD示例应用 🧪

```bash
git clone https://github.com/keploy/samples-python.git && cd samples-python/django-postgres/django_postgres
```

## 安装Keploy

根据您的操作系统选择安装方式：

有两种方式可以运行此示例应用：

- [使用Docker compose：在Docker容器中运行应用和Postgres](#使用docker-compose-)
- [使用Docker容器运行Postgres并在本地运行应用](#在linuxwsl上本地运行应用-)

## 使用Docker Compose 🐳

我们将使用Docker compose在Docker容器中运行应用和Postgres。

### 开始录制！🎥

#### 启动Postgres实例

使用`docker-compose`文件启动Postgres实例：

```bash
docker compose up -d postgres
```

修改`django_postgres/settings.py`文件中的数据库配置为：

```python
DATABASES = {
  'default': {
      'ENGINE': 'django.db.backends.postgresql',
      'NAME': 'usersdb',
      'USER': 'postgres',
      'PASSWORD': 'postgres',
      'HOST': 'mypostgres',
      'PORT': '5432',
  }
}
```

构建应用镜像：

```bash
docker build -t django-app:1.0 .
```

捕获测试用例：

```shell
keploy record -c "docker run -p 8000:8000 --name djangoApp --network keploy-network django-app:1.0"
```

🔥**发起一些API调用**。可以使用Postman、Hoppscotch或curl。

让我们简化URL：

### 生成测试用例

要生成测试用例，我们只需要**发起一些API调用**。

**1. 发起POST请求**

```bash
curl --location 'http://127.0.0.1:8000/user/' \
--header 'Content-Type: application/json' \
--data-raw '    {
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "password": "smith567",
      "website": "www.janesmith.com"
  }'
```

**2. 发起GET请求**

```bash
curl --location 'http://127.0.0.1:8000/user/'
```

**3. 发起PUT请求**

```bash
curl --location --request PUT 'http://127.0.0.1:8000/user/<USER_ID>' \
--header 'Content-Type: application/json' \
--data-raw '    {
      "name": "Jane Smith",
      "email": "smith.jane@example.com",
      "password": "smith567",
      "website": "www.smithjane.com"
  }'
```

**4. 发起GET请求**

```bash
curl --location 'http://127.0.0.1:8000/user/<USER_ID>'
```

**5. 发起DELETE请求**

```bash
 curl --location --request DELETE 'http://127.0.0.1:8000/user/<USER_ID>'
```

恭喜！通过这些简单的操作，您已经生成了一个包含模拟数据的测试用例！查看**Keploy目录**，您会发现`test-1.yml`和`mocks.yml`中的成果。

```yaml
version: api.keploy.io/v1beta2
kind: Http
name: test-1
spec:
  metadata: {}
  req:
    method: GET
    proto_major: 1
    proto_minor: 1
    url: http://127.0.0.1:8000/user/
    header:
      Accept: "*/*"
      Host: 127.0.0.1:8000
      User-Agent: curl/7.81.0
    body: ""
    body_type: ""
    timestamp: 2023-11-05T12:49:22.444698436+05:30
  resp:
    status_code: 200
    header:
      Allow: POST, OPTIONS, GET
      Content-Length: "31"
      Content-Type: application/json
      Cross-Origin-Opener-Policy: same-origin
      Date: Sun, 05 Nov 2023 07:19:22 GMT
      Referrer-Policy: same-origin
      Server: WSGIServer/0.2 CPython/3.10.12
      Vary: Accept, Cookie
      X-Content-Type-Options: nosniff
      X-Frame-Options: DENY
    body: '{"message": "No Users Found!!"}'
    body_type: ""
    status_message: ""
    proto_major: 0
    proto_minor: 0
    timestamp: 2023-11-05T12:49:24.85684599+05:30
  objects: []
  assertions:
    noise:
      - header.Date
      - header.Allow
      - header.Vary
  created: 1699168764
curl: |
  curl --request GET \
  --url http://127.0.0.1:8000/user/ \
  --header 'User-Agent: curl/7.81.0' \
  --header 'Accept: */*' \
  --header 'Host: 127.0.0.1:8000' \
```

生成的`mocks.yml`示例如下：

```yaml
  version: api.keploy.io/v1beta2
  kind: Postgres
  name: mocks
  spec:
      metadata: {}
      postgresrequests:
          - header: [Q]
          identifier: ClientRequest
          length: 8
          query:
              string: SELECT "application_user"."id", "application_user"."name", "application_user"."email", "application_user"."password", "application_user"."website" FROM "application_user"
          msg_type: 81
          auth_type: 0
      postgresresponses:
          - header: [T, C, Z]
          identifier: ServerResponse
          length: 8
          authentication_md5_password:
              salt:
                  - 0
                  - 0
                  - 0
                  - 0
          command_complete:
              - command_tag:
                  - 83
                  - 69
                  - 76
                  - 69
                  - 67
                  - 84
                  - 32
                  - 48
          ready_for_query:
              txstatus: 73
          row_description: {fields: [{name: [105, 100], table_oid: 24705, table_attribute_number: 1, data_type_oid: 2950, data_type_size: 16, type_modifier: -1, format: 0}, {name: [110, 97, 109, 101], table_oid: 24705, table_attribute_number: 2, data_type_oid: 1043, data_type_size: -1, type_modifier: 54, format: 0}, {name: [101, 109, 97, 105, 108], table_oid: 24705, table_attribute_number: 3, data_type_oid: 1043, data_type_size: -1, type_modifier: 258, format: 0}, {name: [112, 97, 115, 115, 119, 111, 114, 100], table_oid: 24705, table_attribute_number: 4, data_type_oid: 1043, data_type_size: -1, type_modifier: 54, format: 0}, {name: [119, 101, 98, 115, 105, 116, 101], table_oid: 24705, table_attribute_number: 5, data_type_oid: 1043, data_type_size: -1, type_modifier: 54, format: 0}]}
          msg_type: 90
          auth_type: 0
      reqtimestampmock: 2023-11-05T12:49:22.471612071+05:30
      restimestampmock: 2023-11-05T12:49:22.47169658+05:30
```

想看看一切是否如预期运行吗？

#### 运行测试

是时候进行测试了 🧪

```shell
keploy test -c "docker run -p 8000:8000 --rm --network keploy-network --name djangoApp django-app:1.0" --delay 10
```

> `--delay`标志？这是为了让您的应用在测试用例运行前有短暂的休息时间（以秒为单位）。

最后建议？深入探索！尝试不同的API调用，调整`mocks.yml`中的数据库响应，或修改`test-x.yml`中的请求或响应。再次运行测试，见证奇迹发生！✨👩‍💻👨‍💻✨

### 总结 🎉

恭喜您完成这段旅程！您已经体验了Keploy的强大功能，锻炼了编码能力，还享受了一些乐趣！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

编码愉快！✨👩‍💻👨‍💻✨

**\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\_\_\_\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***\*\*\***

## 在Linux/WSL上本地运行应用 🐧

我们将在Linux上直接运行示例应用，但为了让事情更有趣，我们将让数据库（PostgreSQL）运行在Docker中。准备好了吗？让我们开始派对吧！🎉

### 📼 开始录制！

使用docker-compose文件启动Postgres实例：

```bash
docker compose up -d postgres
```

现在让我们启动应用：

```bash
# 设置虚拟环境：
python3 -m virtualenv venv
source venv/bin/activate

# 安装依赖：
pip3 install -r requirements.txt

# 在数据库中创建所需的表：
python3 manage.py makemigrations
python3 manage.py migrate
```

准备就绪，开始录制：

```bash
sudo -E PATH=$PATH keploy record -c "python3 manage.py runserver"
```

注意`-c`标志！这是运行应用的命令。

应用已经启动，让我们生成一些测试用例。方法？发起一些API调用！可以使用Postman、Hoppscotch或经典的curl。

### 生成测试用例

要生成测试用例，我们只需要**发起一些API调用**。

**1. 发起POST请求**

```bash
curl --location 'http://127.0.0.1:8000/user/' \
--header 'Content-Type: application/json' \
--data-raw '    {
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "password": "smith567",
      "website": "www.janesmith.com"
  }'
```

**2. 发起GET请求**

```bash
curl --location 'http://127.0.0.1:8000/user/'
```

**3. 发起PUT请求**

```bash
curl --location --request PUT 'http://127.0.0.1:8000/user/<USER_ID>' \
--header 'Content-Type: application/json' \
--data-raw '    {
      "name": "Jane Smith",
      "email": "smith.jane@example.com",
      "password": "smith567",
      "website": "www.smithjane.com"
  }'
```

**4. 发起GET请求**

```bash
curl --location 'http://127.0.0.1:8000/user/<USER_ID>'
```

**5. 发起DELETE请求**

```bash
 curl --location --request DELETE 'http://127.0.0.1:8000/user/<USER_ID>'
```

恭喜！通过这些简单的操作，您已经生成了一个包含模拟数据的测试用例！查看**Keploy目录**，您会发现`test-1.yml`和`mocks.yml`中的成果。

```yaml
version: api.keploy.io/v1beta2
kind: Http
name: test-1
spec:
  metadata: {}
  req:
    method: GET
    proto_major: 1
    proto_minor: 1
    url: http://127.0.0.1:8000/user/
    header:
      Accept: "*/*"
      Host: 127.0.0.1:8000
      User-Agent: curl/7.81.0
    body: ""
    body_type: ""
    timestamp: 2023-11-05T12:49:22.444698436+05:30
  resp:
    status_code: 200
    header:
      Allow: POST, OPTIONS, GET
      Content-Length: "31"
      Content-Type: application/json
      Cross-Origin-Opener-Policy: same-origin
      Date: Sun, 05 Nov 2023 07:19:22 GMT
      Referrer-Policy: same-origin
      Server: WSGIServer/0.2 CPython/3.10.12
      Vary: Accept, Cookie
      X-Content-Type-Options: nosniff
      X-Frame-Options: DENY
    body: '{"message": "No Users Found!!"}'
    body_type: ""
    status_message: ""
    proto_major: 0
    proto_minor: 0
    timestamp: 2023-11-05T12:49:24.85684599+05:30
  objects: []
  assertions:
    noise:
      - header.Date
      - header.Allow
      - header.Vary
  created: 1699168764
curl: |
  curl --request GET \
  --url http://127.0.0.1:8000/user/ \
  --header 'User-Agent: curl/7.81.0' \
  --header 'Accept: */*' \
  --header 'Host: 127.0.0.1:8000' \
```

生成的`mocks.yml`示例如下：

```yaml
  version: api.keploy.io/v1beta2
  kind: Postgres
  name: mocks
  spec:
      metadata: {}
      postgresrequests:
          - header: [Q]
          identifier: ClientRequest
          length: 8
          query:
              string: SELECT "application_user"."id", "application_user"."name", "application_user"."email", "application_user"."password", "application_user"."website" FROM "application_user"
          msg_type: 81
          auth_type: 0
      postgresresponses:
          - header: [T, C, Z]
          identifier: ServerResponse
          length: 8
          authentication_md5_password:
              salt:
                  - 0
                  - 0
                  - 0
                  - 0
          command_complete:
              - command_tag:
                  - 83
                  - 69
                  - 76
                  - 69
                  - 67
                  - 84
                  - 32
                  - 48
          ready_for_query:
              txstatus: 73
          row_description: {fields: [{name: [105, 100], table_oid: 24705, table_attribute_number: 1, data_type_oid: 2950, data_type_size: 16, type_modifier: -1, format: 0}, {name: [110, 97, 109, 101], table_oid: 24705, table_attribute_number: 2, data_type_oid: 1043, data_type_size: -1, type_modifier: 54, format: 0}, {name: [101, 109, 97, 105, 108], table_oid: 24705, table_attribute_number: 3, data_type_oid: 1043, data_type_size: -1, type_modifier: 258, format: 0}, {name: [112, 97, 115, 115, 119, 111, 114, 100], table_oid: 24705, table_attribute_number: 4, data_type_oid: 1043, data_type_size: -1, type_modifier: 54, format: 0}, {name: [119, 101, 98, 115, 105, 116, 101], table_oid: 24705, table_attribute_number: 5, data_type_oid: 1043, data_type_size: -1, type_modifier: 54, format: 0}]}
          msg_type: 90
          auth_type: 0
      reqtimestampmock: 2023-11-05T12:49:22.471612071+05:30
      restimestampmock: 2023-11-05T12:49:22.47169658+05:30
```

想看看一切是否如预期运行吗？

#### 运行测试

是时候进行测试了 🧪

```shell
sudo -E PATH=$PATH keploy test -c "python3 manage.py runserver" --delay 10
```

> `--delay`标志？这是为了让您的应用在测试用例运行前有短暂的休息时间（以秒为单位）。

最后建议？深入探索！尝试不同的API调用，调整`mocks.yml`中的数据库响应，或修改`test-x.yml`中的请求或响应。再次运行测试，见证奇迹发生！✨👩‍💻👨‍💻✨

### 总结 🎉

恭喜您完成这段旅程！您已经体验了Keploy的强大功能，锻炼了编码能力，还享受了一些乐趣！现在，继续探索、创新和创造吧！记住，有了合适的工具和一点乐趣，一切皆有可能。😊🚀

如果仍有疑问，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>