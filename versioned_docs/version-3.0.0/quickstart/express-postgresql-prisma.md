---
id: express-postgresql-prisma
title: Express + PostgreSQL + Prisma 示例应用
sidebar_label: Express + PostgreSQL + Prisma
description: 以下示例应用展示了如何使用 Express 框架、PostgreSQL 数据库、Prisma ORM 以及 Keploy 平台。
tags:
  - javascript
  - quickstart
  - samples
  - examples
  - tutorial
  - nodejs
keyword:
  - Express 框架
  - PostgreSQL
  - Prisma ORM
  - API 测试生成器
  - 自动化测试用例生成
---

## 简介

这是一个任务管理示例应用，展示了 Keploy 如何无缝集成 Express、[PostgreSQL](https://www.postgresql.org/) 和 Prisma ORM。系好安全带，这将是一段有趣的旅程！🎢

import InstallationGuide from '../concepts/installation.md'

<InstallationGuide/>

## 开始使用！🎬

### 先决条件

确保已安装以下组件：

- Docker
- Node.js 和 npm
- Keploy CLI

克隆仓库并进入 express-postgresql-prisma 文件夹

```bash
git clone https://github.com/keploy/samples-typescript.git
cd samples-typescript/express-postgresql-prisma
```

### 在 Linux/WSL 本地运行应用

#### 安装依赖

```bash
npm install
```

#### 设置环境变量：

```bash
cp .env.example .env
```

#### 启动 PostgreSQL 容器

```bash
docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```

> 注意：PostgreSQL 密码为 `mysecretpassword`

#### 更新 `.env` 文件中的 PostgreSQL 连接字符串：

```bash
PORT=3000
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"
```

#### 迁移数据库：

```bash
npm run generate
npm run migrate init
```

```bash
root@Linus:~/samples-typescript/express-postgresql-prisma# npm run migrate init

> task-manager@1.0.0 migrate
> prisma migrate dev --name init

Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "postgres", schema "public" at "localhost:5432"

Applying migration `20240730015533_initial_migration`
Applying migration `20240731010434_due_date_type_change_to_string`

The following migration(s) have been applied:

migrations/
  └─ 20240730015533_initial_migration/
    └─ migration.sql
  └─ 20240731010434_due_date_type_change_to_string/
    └─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client (v5.17.0) to ./node_modules/@prisma/clie
nt in 50ms


┌─────────────────────────────────────────────────────────┐
│  Update available 5.17.0 -> 5.19.0                      │
│  Run the following to update                            │
│    npm i --save-dev prisma@latest                       │
│    npm i @prisma/client@latest                          │
└─────────────────────────────────────────────────────────┘
```

#### 启动应用：

```bash
npm run dev
```

```bash
Server is listening at PORT 3000

    Server: http://localhost:3000
    API Docs: http://localhost:3000/api/docs
```

> 注意：应用将运行在 `http://localhost:3000`。

现在我们将演示如何利用 Keploy 为应用自动生成测试用例，并使用 Keploy 测试应用。

#### 生成测试用例

> 注意：首先使用 `npm run build` 构建应用

```bash
keploy record -c "npm start"
```

```bash
root@Linus:~/samples-typescript/express-postgresql-prisma# keploy record -c "npm start"
🐰 Keploy: 2024-08-28T09:48:30+05:30    INFO    config file not found; proceeding with flags only

       ▓██▓▄
    ▓▓▓▓██▓█▓▄
     ████████▓▒
          ▀▓▓███▄      ▄▄   ▄               ▌
         ▄▌▌▓▓████▄    ██ ▓█▀  ▄▌▀▄  ▓▓▌▄   ▓█  ▄▌▓▓▌▄ ▌▌   ▓
       ▓█████████▌▓▓   ██▓█▄  ▓█▄▓▓ ▐█▌  ██ ▓█  █▌  ██  █▌ █▓
      ▓▓▓▓▀▀▀▀▓▓▓▓▓▓▌  ██  █▓  ▓▌▄▄ ▐█▓▄▓█▀ █▓█ ▀█▄▄█▀   █▓█
       ▓▌                           ▐█▌                   █▌
        ▓

version: 2.3.0-beta14

🐰 Keploy: 2024-08-28T09:48:30+05:30    INFO    Generated config file based on the flags that are used
🐰 Keploy: 2024-08-28T09:48:32+05:30    INFO    keploy initialized and probes added to the kernel.
🐰 Keploy: 2024-08-28T09:48:32+05:30    INFO    Keploy has taken control of the DNS resolution mechanism, your application may misbehave if you have provided wrong domain name in your application code.
🐰 Keploy: 2024-08-28T09:48:32+05:30    INFO    Proxy started at port:16789
🐰 Keploy: 2024-08-28T09:48:32+05:30    INFO    starting TCP DNS server at addr :26789
🐰 Keploy: 2024-08-28T09:48:32+05:30    INFO    starting UDP DNS server at addr :26789

> task-manager@1.0.0 start
> node dist/index.js

Server is listening at PORT 3000

    Server: http://localhost:3000
    API Docs: http://localhost:3000/api/docs
```

以上命令将开始记录对应用的 API 调用，并在 `testcases/` 目录中生成测试用例。

> 💡 您可以使用 Postman 或其他 API 测试工具测试 API 调用。此外，应用将在 `http://localhost:3000/api/docs` 上运行 swagger UI 以可视化 API 调用。

### 使用 Docker Compose 运行应用 🐳

我们将使用 Docker compose 运行应用以及 Docker 容器中的 PostreSql。

灯光、相机、开始录制！🎥
启动应用和 mongoDB 实例与 Keploy。注意两个关键标志：-c：运行应用的命令（例如 docker compose up）。

--container-name：docker-compose.yml 中用于流量拦截的容器名称。

```bash
keploy record -c "docker compose up" --container-name "express-postgresql-prisma-app" --build-delay 50
```

**🔥 挑战时间！** 生成一些测试用例。怎么做？只需进行一些 API 调用。可以使用 Postman、Hoppscotch 甚至 curl - 随您选择！

### 与应用交互

使用 [Postman](https://www.postman.com/) 或 [cURL](https://curl.se/) 命令进行 API 调用。Keploy 将捕获这些调用以生成包含测试用例和数据模拟的测试套件。

### API 路由

#### 添加任务

- **URL:** `/api/v1/task/add`
- **方法:** `POST`
- **描述:** 添加新任务。
- **请求体:**
  ```json
  {
    "author": "John Doe",
    "title": "Complete the report",
    "description": "Complete the quarterly report by end of the week",
    "dueDate": "2024-08-01",
    "status": "Pending",
    "priority": 3
  }
  ```

使用 `curl`

```bash
curl -X 'POST' \
  'http://localhost:3000/api/v1/task/add' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "author": "John Doe",
  "title": "Complete the report",
  "description": "Complete the quarterly report by end of the week",
  "dueDate": "2024-08-01",
  "status": "Pending",
  "priority": 3
}'
```

#### 查看所有任务

使用 `curl`

```bash
curl -X 'GET' \
  'http://localhost:3000/api/v1/task/view' \
  -H 'accept: application/json'
```

#### 按 ID 查看任务

- **URL:** `/api/v1/task/view/:id`
- **方法:** `GET`
- **描述:** 按 ID 检索特定任务。
- **请求参数:** `id` (任务 ID)

使用 `curl`

```bash
curl -X 'GET' \
  'http://localhost:3000/api/v1/task/view/1' \
  -H 'accept: application/json'
```

#### 更改任务优先级

- **URL:** `/api/v1/task/change-priority/:id`
- **方法:** `PUT`
- **描述:** 更新特定任务的优先级。
- **请求参数:** `id` (任务 ID)
- **请求体:**
  ```json
  {
    "priority": 3
  }
  ```

使用 `curl`

```bash
curl -X 'PUT' \
  'http://localhost:3000/api/v1/task/change-priority/1' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "priority": 3
}'
```

#### 更新任务

- **URL:** `/api/v1/task/update/:id`
- **方法:** `PUT`
- **描述:** 更新特定任务的详细信息。
- **请求参数:** `id` (任务 ID)
- **请求体:**
  ```json
  {
    "author": "John Doe",
    "title": "Complete the report",
    "description": "Complete the quarterly report by end of the week",
    "dueDate": "2024-08-01",
    "status": "Pending",
    "priority": 3
  }
  ```

使用 `curl`

```bash
curl -X 'PUT' \
  'http://localhost:3000/api/v1/task/update/2' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "author": "John Doe",
  "title": "Complete the report",
  "description": "Complete the quarterly report by end of the week",
  "dueDate": "2024-08-01",
  "status": "Pending",
  "priority": 3
}'
```

#### 删除任务

- **URL:** `/api/v1/task/delete/:id`
- **方法:** `DELETE`
- **描述:** 删除特定任务。
- **请求参数:** `id` (任务 ID)

使用 `curl`

```bash
curl -X 'DELETE' \
  'http://localhost:3000/api/v1/task/delete/1' \
  -H 'accept: application/json'
```

> 🐰 测试数据和配置：记录交互后，将创建一个包含记录的测试数据的 `keploy` 文件夹。此外，将创建一个 `keploy.yml` 文件作为配置文件。

### 使用 Keploy 测试应用

#### 在 Linux/WSL 上

```bash
keploy test -c "npm start"
```

#### 在 Docker Compose 上 🐳

```bash
keploy test -c "docker compose up" --container-name "nodeMongoApp" --build-delay 50 --delay 10
```

> **--delay** 标志？哦，这只是给您的应用一点喘息时间（以秒为单位），然后测试用例才会开始。

Keploy 将重放记录的交互并根据预期结果验证响应。

```bash
Node.js v22.7.0
🐰 Keploy: 2024-08-28T10:14:14+05:30    WARN    To enable storing mocks in cloud please use disableMockUpload flag/configuration

 <=========================================>
  COMPLETE TESTRUN SUMMARY.
        Total tests: 7
        Total test passed: 7
        Total test failed: 0
        Total time taken: "5.66 s"

        Test Suite Name         Total Test      Passed          Failed          Time Taken

        "test-set-0"            7               7               0               "5.66 s"
<=========================================>

🐰 Keploy: 2024-08-28T10:14:14+05:30    INFO    calculating coverage for the test run and inserting it into the report
🐰 Keploy: 2024-08-28T10:14:14+05:30    INFO    [Total Coverage Percentage:  86.16%]
🐰 Keploy: 2024-08-28T10:14:14+05:30    INFO    stopping Keploy {"reason": "replay completed successfully"}
🐰 Keploy: 2024-08-28T10:14:14+05:30    INFO    proxy stopped...
🐰 Keploy: 2024-08-28T10:14:17+05:30    INFO    eBPF resources released successfully...
```

瞧！🎉 您已成功使用 Keploy 测试了应用。Keploy 还会为测试套件生成覆盖率报告。