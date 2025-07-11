---
id: unit-testing-faq
title: 常见问题解答
sidebar_label: 常见问题
tags:
  - explanation
  - faq
---

# 有问题？我们有答案！🚀

关于使用Keploy进行单元测试的一切疑问——直击要点，不绕弯子。

### 1. 什么是Keploy的单元测试生成器（UTG）？

Keploy的UTG基于代码语义自动创建单元测试，提升测试覆盖率和可靠性。

### 2. Keploy会为了生成测试将您的私有数据发送到云端服务器吗？

不会，Keploy不会将用户代码发送到远程系统，除非使用单元测试生成功能。当使用UT生成功能时，仅源代码和单元测试代码会被发送到您使用的大型语言模型（LLM）。默认情况下，Keploy使用litellm来支持多种LLM后端。是的，如果您的组织拥有自己的LLM（私有模型），您可以将其与Keploy一起使用。这确保了数据不会被发送到任何外部系统。

### 3. Keploy如何帮助提高单元测试覆盖率？

通过提供零代码的自动化测试平台，Keploy使开发者无需大量编码知识即可扩展单元测试覆盖率。这种集成增强了测试报告，最终提升对产品质量的信心。

### 4. Keploy对自动化单元测试来说具有成本效益吗？

是的，Keploy通过自动化重复测试任务和提高整体测试效率来优化成本。

### 5. Keploy如何生成覆盖率报告？

Keploy生成详细的Cobertura格式报告，提供测试有效性和代码质量的深入分析。

### 6. Keploy能高效处理大型代码库吗？

是的，Keploy设计用于高效处理大型代码库，尽管处理时间可能因项目规模和复杂度而异。

### 7. 我应该选择哪种方法来生成单元测试？

- **PR代理**：最适合使用拉取请求工作流并希望自动生成测试的团队
- **VS Code扩展**：适合偏好IDE集成的独立开发者

### 8. 使用这两种方法需要API密钥吗？

API密钥主要针对命令行方法需要。PR代理和VS Code扩展根据您的设置可能有不同的认证机制。

希望这些解答对您有帮助，如果还有其他问题，请联系我们。

import GetSupport from '../concepts/support.md'

<GetSupport/>