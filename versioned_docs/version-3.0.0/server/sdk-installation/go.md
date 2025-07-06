---
id: go
title: 合并单元测试覆盖率数据
sidebar_label: Go
tags:
  - go
  - coverage
keyword:
  - 覆盖率
  - Echo框架
  - Gorilla/Mux框架
  - Gin框架
  - Postgres
  - SQL
  - Golang
  - API测试生成器
  - 自动测试用例生成
  - Go测试
---

import WhatAreKeployFeatures from './index.md'

<WhatAreKeployFeatures/>

## 🛠️ 语言特定要求

| 编程语言       | 前提条件                                                                                                                                                                                                                                                       |
| :------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|       go       | 1. 应用程序应实现优雅关闭功能，在收到`SIGTERM`或`SIGINT`信号时停止API服务器。参考[附录](#graceful-shutdown)获取优雅关闭函数的基础实现。<br/> 2. go二进制文件需要使用`-cover`标志编译。 |

## 优雅关闭

应用程序必须能够优雅关闭。在Golang中，优雅关闭函数实现如下：

```go
func GracefulShutdown() {
	stopper := make(chan os.Signal, 1)
	// 监听中断和SIGTERM信号
	signal.Notify(stopper, os.Interrupt, os.Kill, syscall.SIGKILL, syscall.SIGTERM)
	go func() {
		select {
		case <-stopper:
			os.Exit(0)
		}
	}()
}

func main() {

	port := "8080"

	r := gin.Default()

	r.GET("/:param", getURL)
	r.POST("/url", putURL)
	// 必须在main()启动API服务器前调用
	GracefulShutdown()

	r.Run()
}
```

## 使用方法

使用keploy测试覆盖率时，必须使用`-cover`标志编译二进制文件：

```go
go build -cover
```

获取单元测试覆盖率数据：

```go
go test -cover ./... -args -test.gocoverdir="单元测试覆盖率文件路径"
```

合并单元测试与Keploy提供的覆盖率数据：

```go
go tool covdata textfmt -i="单元测试覆盖率文件路径","./coverage-reports" -o combined-coverage.txt
```

获取合并后覆盖率数据的相关信息：

```go
go tool cover -func combined-coverage.txt
```