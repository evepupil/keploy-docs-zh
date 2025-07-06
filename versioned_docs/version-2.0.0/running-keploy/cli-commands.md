---
id: cli-commands
title: Keploy CLI 命令
sidebar_label: CLI 命令
description: 本文档记录 Keploy CLI 命令的使用场景
tags:
  - cli 命令
keywords:
  - cli
  - 文档
  - 命令
---

### 使用方式

```bash
keploy [command] [flags]
```

所有命令均可使用 `--help, -h` 标志查看可用选项及其用途。

## 模式与标志

以下是常用标志的使用示例：

| 模式        | 可用标志                                                                                                                                                                                                                                                                                                                          |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `record`    | `-c, --command`, `--config-path`, `--containerName`, `-d, --delay`, `-n, --networkName`, `--passThroughPorts`, `-p, --path`, `--proxyport`, `--debug`                                                                                                                                                                                    |
| `test`      | `--apiTimeout`, `-c, --command`, `--config-path`, `--containerName`, `-d, --delay`, `--mongoPassword`, `-n, --net, --networkName`, `--passThroughPorts`, `-p, --path`, `--proxyport`, `-t, --testsets`, `--debug`, `-g, --generateTestReport`, `--removeUnusedMocks`, `--coverage`, `--goCoverage`, `--ignoreOrdering`, `--skip-preview` |
| `gen`       | `--sourceFilePath`, `--testFilePath`,`--coverageReportPath`,`--testCommand`,`--coverageFormat`,`--expectedCoverage`,`--maxIterations`,`--testDir`,`--llmBaseUrl`,`--model`,`--llmApiVersion`                                                                                                                                             |
| `normailze` | `-p, --path`, `--test-run`, `--tests`                                                                                                                                                                                                                                                                                                    |
| `rerecord`  | `--test-sets`, `-t`                                                                                                                                                                                                                                                                                                                      |
| `config`    | `--generate`,`-p, --path`                                                                                                                                                                                                                                                                                                                |

## [record](#record)

`record` 模式用于记录 API 调用生成的测试用例。记录的测试用例和生成的模拟数据会保存在当前工作目录的 `keploy` 文件夹中。

<b> 用法： </b>

```bash
keploy record [flags]
```

<b> 可用标志： </b>

- `-c, --command string` - 启动用户应用的命令。

  ```bash
  keploy record --command "node src/app.js"
  ```

  上述命令中，`node src/app.js` 是启动用户应用的命令。

- `--config-path string` - Keploy 配置文件路径。默认为当前目录。

  ```bash
  keploy record -c "node src/app.js" --config-path "./config-dir/"
  ```

  上述命令中，`config-dir` 是存放 Keploy 配置文件 `keploy.yaml` 的目录。

- `--container-name string` - 用户应用运行的 Docker 容器名称。

  ```bash
  keploy record -c "docker compose up" --container-name "my-app-container"
  ```

- `-d, --delay uint` - 启动用户应用前的延迟秒数。默认为 5 秒。

  ```bash
  keploy record -c "node src/app.js" -d 10
  ```

- `- n, --network-name string` - 用户应用运行的 Docker 网络名称。

  ```bash
  keploy record -c "docker compose up" --container-name "my-app-container" -n "my-app-network"
  ```

- `--pass-through-ports uints` - 需要直连实际依赖项而忽略模拟的出口调用端口。默认为空。
- `-p, --path string` - 保存测试用例和模拟数据的本地目录路径。

  ```bash
  keploy record -c "node src/app.js" -p "./tests"
  ```

  上述命令中，`tests` 是存储测试用例和模拟数据的目录。

- `--proxy-port uint32` - Keploy 代理运行的端口号。默认为 16789。

  ```bash
  keploy record -c "node src/app.js" --proxy-port 8080
  ```

- `--debug` - 启用调试模式记录测试用例。

  ```bash
  keploy record -c "node src/app.js" --debug
  ```

- `rerecord` - 重新记录指定测试集

  ```bash
  keploy record -c "node src/app.js" --rerecord "test-set-0"
  ```

## [test](#test)

`test` 模式用于运行记录的测试用例并执行断言。测试完成后会生成详细报告，并以 yaml 格式保存在当前工作目录的 `keploy/reports` 文件夹中。

<b> 用法： </b>

```bash
keploy test [flags]
```

<b> 可用标志： </b>

- `--api-timeout uint` - 调用用户应用的超时秒数。默认为 5 秒。

  ```bash
  keploy test -c "node src/app.js" --api-timeout 10
  ```

- `-c, --command string` - 启动用户应用的命令。

  ```bash
  keploy test -c "node src/app.js"
  ```

  上述命令中，`node src/app.js` 是启动用户应用的命令。

- `--config-path string` - Keploy 配置文件路径。默认为当前目录。

  ```bash
  keploy test -c "node src/app.js" --config-path "./config-dir/"
  ```

  上述命令中，`config-dir` 是存放 Keploy 配置文件 `keploy.yaml` 的目录。

- `--container-name string` - 用户应用运行的 Docker 容器名称。

  ```bash
  keploy test -c "docker compose up" --container-name "my-app-container"
  ```

- `-d, --delay uint` - 启动用户应用前的延迟秒数。默认为 5 秒。

  ```bash
  keploy test -c "node src/app.js" --delay 10
  ```

- `--mongo-password string` - 模拟 MongoDB 连接的认证密码。默认为 "default123"。

  ```bash
  keploy test -c "node src/app.js" --mongo-password "my-password"
  ```

- `- n, --network-name string` - 用户应用运行的 Docker 网络名称。

  ```bash
  keploy test -c "docker compose up" --container-name "my-app-container" -n "my-app-network" -d 9
  ```

- `--pass-through-ports uints` - 需要直连实际依赖项而忽略模拟的出口调用端口。默认为空。

- `-p, --path string` - 存储测试用例和模拟数据的本地目录路径。

  ```bash
  keploy test -c "node src/app.js" -d 10 --path "./tests"
  ```

  上述命令中，`tests` 是存储测试用例和模拟数据的目录。

- `--proxy-port uint32` - Keploy 代理运行的端口号。默认为 16789。

  ```bash
  keploy test -c "node src/app.js" --proxy-port 8080
  ```

- `-t, --test-sets strings` - 指定要执行的测试集。默认为所有测试集。

  ```bash
  keploy test -c "node src/app.js" -t "test-set-1,test-set-3" --delay 10
  ```

- `--debug` - 启用调试模式执行测试用例。

  ```bash
  keploy test -c "node src/app.js" --delay 10 --debug
  ```

- `-g, --generate-test-report` - 是否生成测试报告。默认为 true。

  ```bash
  keploy test -c "node src/app.js" --delay 10 -g=false
  ```

- `--remove-unused-mocks` - 是否移除模拟文件中未使用的模拟数据。默认为 false。

  ```bash
  keploy test -c "node src/app.js" --delay 10 --remove-unused-mocks
  ```

- `--ignore-ordering` - 是否忽略响应数组中元素的顺序。默认为 true。

  ```bash
  keploy test -c "node src/app.js" --delay 10 --ignore-ordering
  ```

- `--skip-coverage` - 跳过测试用例运行时的代码覆盖率计算

- `--skip-preview` - 跳过逐行代码覆盖率预览，仅显示总覆盖率。

  ```bash
  keploy test -c "node src/app.js" --delay 10 --skip-preview
  ```

- `--jacoco-agent-path` - 仅适用于 Java 项目的测试覆盖率。可通过提供路径覆盖 jacoco agent jar

## [gen](#gen)

`gen` 命令允许用户使用 LLM 模型生成单元测试。

<b> 用法： </b>

```bash
keploy gen [flags]
```

<b> 可用标志： </b>

- `sourceFilePath` - 需要生成测试的源文件路径。

- `testFilePath` - 生成测试的保存路径。

- `coverageReportPath` - 覆盖率报告的生成路径。

- `testCommand` - 执行测试并生成覆盖率报告的命令。

- `coverageFormat` - 覆盖率报告类型，默认为 "cobertura" 格式。

- `expectedCoverage` - 期望的覆盖率百分比，默认为 100%。

- `maxIterations` - 优化测试的最大迭代次数（默认为 5）。

- `testDir` - 测试文件的写入目录。

- `llmBaseUrl` - LLM 的基础 URL。

- `model` - 指定使用的 AI 模型，默认为 "gpt-4o" 模型。

- `llmApiVersion` - LLM 的 API 版本（如有）。

## [normalize](#normalize)

`normalize` 命令允许用户根据最新测试运行的响应修改测试用例的响应。当应用程序代码变更或有意修改导致 API 响应变化时，此功能非常有用。

<b> 用法： </b>

```bash
keploy normalize [flags]
```

<b> 可用标志： </b>

- `-p, --path string` - 存储测试用例和模拟数据的本地目录路径。

  ```bash
  keploy normalize -p "./tests"
  ```

  上述命令中，`tests` 是存储测试用例和模拟数据的目录。

- `--test-run string` - 默认使用最新测试运行进行标准化，如需指定特定测试运行可使用此标志。

  ```bash
  keploy normalize -p "./tests" --test-run "test-run-10"
  ```

- `--tests string` - 默认对所有测试用例进行标准化，如需仅标准化特定测试用例可使用此标志

  ```bash
  keploy normalize -p "./tests" --test-run "test-run-10" --tests "test-set-1:test-case-1 test-case-2,test-set-2:test-case-1 test-case-2"
  ```

## [rerecord](#rerecord)

`rerecord` 命令允许用户基于现有测试用例重新记录指定测试集的测试用例/模拟数据

<b> 用法： </b>

```bash
keploy rerecord -c "node src/app.js" -t "test-set-0"
```

## [templatize](#templatize)

`templatize` 命令允许用户对测试用例请求中可能变化的重要字段进行模板化处理。

<b> 用法： </b>

```bash
keploy templatize [flags]
```

## [config](#config)

`config` 命令用于生成 Keploy 配置文件 `keploy.yaml`。生成的配置文件位于当前工作目录。

<b> 用法： </b>

```bash
keploy config [flags]
```

<b> 可用标志： </b>

- `--generate` - 生成新的 Keploy 配置文件。

  ```bash
  keploy config --generate
  ```

- `-p, --path string` - 存储配置文件的本地目录路径。默认为当前目录。

  ```bash
  keploy config --generate --path "./config-dir/"
  ```

  上述命令中，`config-dir` 是存储配置文件的目录。

## [example](#example)

`example` 命令展示 Keploy 在不同场景下的使用示例，包括 Golang、Node.js、Java 和 Docker 应用程序。

<b> 用法： </b>

```bash
keploy example [flags]
```

<b> 可用标志： </b>

- `--customSetup` - 显示针对自定义设置的命令。