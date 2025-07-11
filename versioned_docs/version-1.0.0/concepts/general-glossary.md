---
id: general-glossary
title: 简易用户术语表 (v1.0.0)
sidebar_label: 术语表
description: 本术语表简化复杂术语，帮助初学者快速掌握核心概念。
tags:
  - 解释
keywords:
  - API
---

### 1. **API数据模拟**

API模拟是对真实API的仿真，通常在生产环境API未就绪时使用。当服务器尚未准备好导致无法发送API请求时，您可以模拟部分响应数据。后续发起请求时，系统将返回这些模拟数据。

### 2. **幂等性**

当API在频繁发送相同请求时，成功请求的结果始终保持不变，则该API具有幂等性。

### 3. **噪声字段**

噪声字段指每次请求时值会变化的随机数据。

例如时间戳属性：该值并非手动输入而是自动记录请求时间，因此每次调用时都会不同。

### 4. **互操作性**

互操作性指数据在不同平台间传输时，仍能保持其原始（原生）格式行为。通过用优化代码替代文件依赖来实现相同结果。

### 5. **去重算法**

去重是一种数据压缩技术，通过识别并消除相同数据的冗余副本实现。该过程采用哈希函数或相似性分析来比对数据块，使得存储系统仅保留每个唯一数据段的一个实例，从而优化存储效率并减少冗余。