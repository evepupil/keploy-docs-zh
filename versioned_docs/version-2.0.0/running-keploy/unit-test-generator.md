---
id: unit-test-generator
title: Keploy 单元测试生成器
sidebar_label: 单元测试生成器
description: 本文档记录 Keploy 单元测试生成器的使用场景
tags:
  - utg
  - 单元测试生成器
  - 生成单元测试
  - 单元测试
keywords:
  - 单元测试生成器
  - 单元测试
  - 测试用例
  - 文档
  - AI测试
  - Gemini
  - OpenAI
---

Keploy 基于 Meta LLM 研究论文实现的单元测试生成器(ut-gen)是首个能理解代码语义并生成有意义单元测试的工具，旨在：

- **自动化单元测试生成(UTG):** 快速生成全面的单元测试，减少冗余的手动工作。
- **提升边缘场景覆盖:** 扩展并改进测试范围，覆盖更多手动测试常遗漏的复杂场景。
- **提高测试覆盖率:** 随着代码库增长，确保全面覆盖变得可行。

## 使用方式

```bash
keploy gen [flag]
```

## 前置条件

需要配置以下任意一种AI模型的`API KEY`：

- **OpenAI的[GPT-4o](https://platform.openai.com/) [推荐]**
- 通过[litellm](https://github.com/BerriAI/litellm?tab=readme-ov-file#quick-start-proxy---cli)接入的其他LLM
- [Azure OpenAI](https://azure.microsoft.com/en-in/products/ai-services/openai-service)服务

设置环境变量`API_KEY`：

```bash
export API_KEY=xxxx
```

## 在Javascript/TypeScript项目中使用

确保覆盖率报告为cobertura格式，需在`package.json`中添加：

```json
"jest": {
      "coverageReporters": ["text", "cobertura"],
    }
```

若存在`jest.config.js`则添加：

```js
module.exports = {
  coverageReporters: ["text", "cobertura"],
};
```

### 生成单元测试

为控制成本，可以针对单个源文件及其对应测试文件生成测试：

```bash
keploy gen --source-file-path="<源文件路径>" \
    --test-file-path="<对应测试文件路径>" \
    --test-command="npm test" \
    --coverage-report-path="<覆盖率报告路径>"
```

对整个应用生成测试时，用`--test-dir`替代`--test-file-path`。

> ⚠️ 警告：使用`--test-dir`会为应用中所有文件生成单元测试。根据代码库规模，此过程可能需要20分钟至1小时，并产生LLM使用费用。

#### 示例

以[express-mongoose](https://github.com/keploy/samples-typescript/tree/main/express-mongoose)示例项目为例，其测试文件为`test/routes.test.js`。

在`package.json`中添加：

```json
  "jest": {
    "collectCoverage": true,
    "coverageReporters": ["text", "cobertura"],
    "coverageDirectory": "./coverage"
  }
```

运行Keploy UTG命令：

```bash
keploy gen \
  --source-file-path="./src/routes/routes.js" \
  --test-file-path="./test/routes.test.js" \
  --test-command="npm test" \
  --coverage-report-path="./coverage/cobertura-coverage.xml"
```

输出结果：

<img src="/docs/img/express-mongoose-utg.png" alt="Keploy为express-mongoose生成的AI单元测试覆盖率" width="100%" style={{ borderRadius: '5px' }}/>

_成功！生成的测试用例实现了58%的覆盖率🌟_

## 在Golang项目中使用

安装以下工具确保生成Cobertura格式报告：

```bash
go install github.com/axw/gocov/gocov@v1.1.0
go install github.com/AlekSi/gocov-xml@v1.1.0
```

### 生成单元测试

安装依赖后执行：

```bash
keploy gen --source-file-path="<源文件路径>" \
  --test-file-path="<对应测试文件路径>" \
  --test-command="go test -v ./... -coverprofile=coverage.out && gocov convert coverage.out | gocov-xml > coverage.xml" \
  --coverage-report-path="<覆盖率报告路径>"
```

对整个应用生成测试时，用`--test-dir`替代`--test-file-path`。

> ⚠️ 警告：使用`--test-dir`会为应用中所有文件生成单元测试。根据代码库规模，此过程可能需要20分钟至1小时，并产生LLM使用费用。

#### 示例

以[mux-sql](https://github.com/keploy/samples-go/tree/main/mux-sql/)项目为例，为`app.go`生成测试：

```bash
keploy gen --source-file-path="app.go" \
  --test-file-path="app_test.go" \
  --test-command="go test -v ./... -coverprofile=coverage.out && gocov convert coverage.out | gocov-xml > coverage.xml" \
  --coverage-report-path="./coverage.xml"
```

输出结果：

<img src="/docs/img/mux-sql-utg.png" alt="Keploy为mux-sql生成的AI单元测试覆盖率" width="100%" style={{ borderRadius: '5px' }}/>

_成功！仅2次迭代就实现了71%的覆盖率🌟_

## 常见问题(FAQs)

1. **Keploy单元测试生成器是什么？**<br/>
   - 通过代码语义分析自动创建单元测试，提升测试覆盖率和可靠性。
2. **会向云端发送私有数据吗？**<br/>
   - 仅在使用UT gen功能时，源代码和单元测试代码会发送至您使用的LLM。支持通过litellm接入私有LLM。
3. **如何提升测试覆盖率？**<br/>
   - 提供零代码测试平台，无需深厚编码知识即可扩展测试覆盖。
4. **成本效益如何？**<br/>
   - 通过自动化重复测试任务优化成本。
5. **如何生成覆盖率报告？**<br/>
   - 生成Cobertura格式报告，直观展示测试效果。
6. **能处理大型代码库吗？**<br/>
   - 支持高效处理大型代码库，处理时间取决于项目复杂度。