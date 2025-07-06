---
id: supported-frameworks
title: Golang 支持框架 (v1.0.0)
description: Golang 支持框架
tags:
  - go
  - developer-guide
keywords:
  - Elasticsearch
  - Redis
  - gRPC
---

## 支持的路由器

### Chi

<details>
<summary>集成方式</summary>

```go
r := chi.NewRouter()
r.Use(kchi.ChiMiddlewareV5(k))
```

</details>
<details>
<summary>示例</summary>

```go
import(
  "github.com/keploy/go-sdk/integrations/kchi"
	"github.com/keploy/go-sdk/keploy"
	"github.com/go-chi/chi"
)

func main(){
    r := chi.NewRouter()
    port := "8080"
    k := keploy.New(keploy.Config{
            App: keploy.AppConfig{
                Name: "my_app",
                Port: port,
            },
            Server: keploy.ServerConfig{
                URL: "http://localhost:6789/api",
            },
            })
    r.Use(kchi.ChiMiddlewareV5(k))
    http.ListenAndServe(":" + port, r)
}
```

</details>

### Gin

<details>
<summary>集成方式</summary>

```go
r:=gin.New()
kgin.GinV1(k, r)
```

</details>
<details>
<summary>示例</summary>

```go
import(
  "github.com/keploy/go-sdk/integrations/kgin/v1"
	"github.com/keploy/go-sdk/keploy"
)

func main(){
	r:=gin.New()
	port := "8080"
	k := keploy.New(keploy.Config{
	  App: keploy.AppConfig{
	      Name: "my_app",
	      Port: port,
	  },
	  Server: keploy.ServerConfig{
	      URL: "http://localhost:6789/api",
	  },
	})
	kgin.GinV1(k, r)
	r.Run(":" + port)
}
```

</details>

### Echo

<details>
<summary>集成方式</summary>

```go
import(
  "github.com/keploy/go-sdk/integrations/kecho/v4"
	"github.com/keploy/go-sdk/keploy"
	"github.com/labstack/echo/v4"
)

func main(){
    e := echo.New()
    port := "8080"
    k := keploy.New(keploy.Config{
      App: keploy.AppConfig{
          Name: "my-app",
          Port: port,
      },
      Server: keploy.ServerConfig{
          URL: "http://localhost:6789/api",
      },
    })
    e.Use(kecho.EchoMiddlewareV4(k))
    e.Start(":" + port)
}
```

</details>

### WebGo

<details>
<summary>WebGo V4 集成</summary>

```go
router := webgo.NewRouter(cfg, getRoutes())
router.Use(kwebgo.WebgoMiddlewareV4(k))
router.Start()
```

</details>

<details>
<summary>WebGo V6 集成</summary>

```go
router := webgo.NewRouter(cfg, getRoutes())
router.Use(kwebgo.WebgoMiddlewareV6(k))
router.Start()
```

</details>

<details>
<summary>示例</summary>

```go
import(
  "github.com/keploy/go-sdk/integrations/kwebgo/v4"
	"github.com/keploy/go-sdk/keploy"
	"github.com/bnkamalesh/webgo/v4"
)

func main(){
    port := "8080"
    k := keploy.New(keploy.Config{
      App: keploy.AppConfig{
          Name: "my-app",
          Port: port,
      },
      Server: keploy.ServerConfig{
          URL: "http://localhost:6789/api",
      },
    })
    router := webgo.NewRouter(&webgo.Config{
		Host:         "",
		Port:         port,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 60 * time.Second,
	}, []*webgo.Route{})
    router.Use(kwebgo.WebgoMiddlewareV4(k))
    router.Start()
}
```

</details>

### Gorilla/Mux

<details>
<summary>集成方式</summary>

```go
r := mux.NewRouter()
r.Use(kmux.MuxMiddleware(k))
```

</details>

<details>
<summary>示例</summary>

```go
import(
  "github.com/keploy/go-sdk/integrations/kmux"
	"github.com/keploy/go-sdk/keploy"
	"github.com/gorilla/mux"
  "net/http"
)

func main(){
    r := mux.NewRouter()
    port := "8080"
    k := keploy.New(keploy.Config{
      App: keploy.AppConfig{
          Name: "my-app",
          Port: port,
      },
      Server: keploy.ServerConfig{
          URL: "http://localhost:6789/api",
      },
    })
    r.Use(kmux.MuxMiddleware(k))
    http.ListenAndServe(":"+port, r)
}
```

</details>

## 支持的数据库

### MongoDB

<details>
<summary>集成方式</summary>

```go
import("github.com/keploy/go-sdk/integrations/kmongo")

db  := client.Database("testDB")
col := kmongo.NewCollection(db.Collection("Demo-Collection"))
```

支持以下操作：

- FindOne - mongo.SingleResult 的 Err 和 Decode 方法
- Find - mongo.cursor 的 Next, TryNext, Err, Close, All 和 Decode 方法
- InsertOne
- InsertMany
- UpdateOne
- UpdateMany
- DeleteOne
- DeleteMany
- CountDocuments
- Distinct
- Aggregate - mongo.cursor 的 Next, TryNext, Err, Close, All 和 Decode 方法

</details>

### DynamoDB

<details>
<summary>集成方式</summary>

```go
import("github.com/keploy/go-sdk/integrations/kddb")

client := kddb.NewDynamoDB(dynamodb.New(sess))
```

支持以下操作：

- QueryWithContext
- GetItemWithContext
- PutItemWithContext

</details>

### SQL 驱动

<details>
<summary>集成方式</summary>

Keploy 实现了大部分 SQL 驱动接口，用于模拟从 API 处理程序调用的 SQL 查询输出。

由于 Keploy 使用请求上下文来模拟 SQL 查询输出，因此应从 API 处理程序调用具有请求上下文作为参数的 SQL 方法。

#### v1

此版本记录输出并将其作为二进制存储在导出的 yaml 文件中

#### v2

此版本以可读/可编辑格式记录和存储在导出的 yaml 文件中的输出。
示例：

```yaml
version: api.keploy.io/v1beta1
kind: SQL
name: Sample-App # 来自 keploy 配置的 App_Id 或来自 mock.Config 的模拟名称
spec:
  metadata:
    name: SQL
    operation: QueryContext.Close
    type: SQL_DB
  type: table
  table:
    cols:
      - name: id
        type: int64
        precision: 0
        scale: 0
      - name: uuid
        type: "[]uint8"
        precision: 0
        scale: 0
      - name: name
        type: string
        precision: 0
        scale: 0
    rows:
      - "[`3` | `[50 101 101]` | `qwertt2` | ]"
  int: 0
  error:
    - nil
    - nil
```

以下是 postgres 驱动程序和二进制编码输出的示例 -

```go
    import (
        "github.com/keploy/go-sdk/integrations/ksql/v1" // SQL 查询的输出以二进制编码存储在导出的 yaml 文件中
        "github.com/lib/pq"
    )
    func main(){
        // 将 keploy sql 驱动注册到 database/sql 包。
        driver := ksql.Driver{Driver: pq.Driver{}}
		sql.Register("keploy", &driver)

        pSQL_URI := fmt.Sprintf("host=%s user=%s dbname=%s sslmode=disable password=%s port=%s", "localhost", "postgres", "Book_Keeper", "8789", "5432")
        // keploy 驱动将使用 dataSourceName 字符串参数在内部打开连接
        db, err := sql.Open("keploy", pSQL_URI)
        if err!=nil{
            log.Fatal(err)
        } else {
            fmt.Println("Successfully connected to postgres")
        }
        defer db.Close

        r:=gin.New()
        kgin.GinV1(kApp, r)
        r.GET("/gin/:color/*type", func(c *gin.Context) {
            // PingContext 的 ctx 参数应为请求上下文。
            err = db.PingContext(r.Context())
            if err!=nil{
                log.Fatal(err)
            }
            id := 47
            result, err := db.ExecContext(r.Context(), "UPDATE balances SET balance = balance + 10 WHERE user_id = ?", id)
            if err != nil {
                log.Fatal(err)
            }
        }))
    }
```

> 它与 gORM 兼容。要与 gORM 集成，请将 gorm.Config 的 DisableAutomaticPing 设置为 true。同时将请求上下文作为参数传递给方法。
> 使用 GCP-Postgres 驱动的 gORM 示例：

```go
    import (
		gcppostgres "github.com/GoogleCloudPlatform/cloudsql-proxy/proxy/dialers/postgres"
        "github.com/keploy/go-sdk/integrations/ksql/v1" // SQL 查询的输出以二进制编码存储在导出的 yaml 文件中
        "gorm.io/driver/postgres"
	    "gorm.io/gorm"
    )
    type Person struct {
        gorm.Model
        Name  string
        Email string `gorm:"typevarchar(100);unique_index"`
        Books []Book
    }
    type Book struct {
        gorm.Model
        Title      string
        Author     string
        CallNumber int64 `gorm:"unique_index"`
        PersonID   int
    }
    func main(){
        // 将 keploy sql 驱动注册到 database/sql 包。
        driver := ksql.Driver{Driver: gcppostgres.Driver{}}
        sql.Register("keploy", &driver)

        pSQL_URI := fmt.Sprintf("host=%s user=%s dbname=%s sslmode=disable password=%s", GCPHost, "postgres", "Book_Keeper", "8789", "5432")

        // 将 DisableAutomaticPing 设置为 true。
        pSQL_DB, err :=  gorm.Open( postgres.New(postgres.Config{
                DriverName: "keploy",
                DSN: pSQL_URI
            }), &gorm.Config{
                DisableAutomaticPing: true
        }
        pSQL_DB.AutoMigrate(&Person{})
        pSQL_DB.AutoMigrate(&Book{})
        r:=gin.New()
        kgin.GinV1(kApp, r)
        r.GET("/gin/:color/*type", func(c *gin.Context) {
            // 在查询之前将 *gorm.DB 的上下文设置为 http 处理程序函数的请求上下文。
            pSQL_DB = pSQL_DB.WithContext(c.Request.Context())
            // Find
            var (
                people []Book
            )
            x := pSQL_DB.Find(&people)
        }))
    }
```

<!-- 它与 gORM 兼容。 -->
</details>

<!--
<details>
<summary>示例</summary>

```go
    pSQL_URI := fmt.Sprintf("host=%s user=%s dbname=%s sslmode=disable password=%s port=%s", "localhost", "postgres", "Book_Keeper", "8789", "5432")
    // 将 DisableAutomaticPing 设置为 true，以捕获和重放存储在请求上下文中的查询输出。
    pSQL_DB, err :=  gorm.Open(postgres.New(postgres.Config{DriverName: "keploy", DSN: pSQL_URI}), &gorm.Config{ DisableAutomaticPing: true })
    if err!=nil{
        log.Fatal(err)
    } else {
	fmt.Println("Successfully connected to postgres")
    }
    r:=gin.New()
    kgin.GinV1(kApp, r)
    r.GET("/gin/:color/*type", func(c *gin.Context) {
        // 在查询之前将 *gorm.DB 的上下文设置为 http 处理程序函数的请求上下文。
        pSQL_DB = pSQL_DB.WithContext(r.Context())
	// Find
	var (
		people []Book
	)
	x := pSQL_DB.Find(&people)
    }))
```
</details> -->

### Elasticsearch

<details>
<summary>集成方式</summary>

elastic-search 客户端使用 http 客户端执行 CRUD 操作。
`elasticsearch.config` 中有一个 Transport 字段，允许您完全替换包使用的默认 HTTP 客户端。
因此，我们使用 `khttp` 作为拦截器并将其分配给 Transport 字段。

以下是使用 keploy 的 http 拦截器创建 elastic search 客户端的示例 -

```go
import (
	"net/http"
	"github.com/elastic/go-elasticsearch/v8"
	"github.com/keploy/go-sdk/integrations/khttpclient"
)

func ConnectWithElasticsearch(ctx context.Context) *elasticsearch.Client {
	// 将 http 与 keploy 集成
	interceptor := khttpclient.NewInterceptor(http.DefaultTransport)
	newClient, err := elasticsearch.NewClient(elasticsearch.Config{
		Addresses: []string{
			"http://localhost:9200",
		},
		// 使用 khttp 作为自定义 http 客户端
		Transport: interceptor,
	})
	if err != nil {
		panic(err)
	}
	return newClient
}


```

> 批量索引等繁重操作所需的时间取决于运行 keploy 的机器的配置。

</details>

### Redis

<details>
<summary>集成方式</summary>

```go
import(
    "context"
	"time"
	"github.com/go-redis/redis/v8"
    "github.com/keploy/go-sdk/integrations/kredis"
)

type redisCache struct {
	host    string
	db      int
	expires time.Duration
}

func (cache *redisCache) getClient() redis.UniversalClient {
	client := redis.NewClient(&redis.Options{
		Addr:     cache.host,
		Password: "",
		DB:       cache.db,
	})
	return kredis.NewRedisClient(client)
}
```

支持以下操作：

- Get
- Set
- Del

</details>

## 支持的客户端

### net/http

<details>
<summary>集成方式</summary>

```go
interceptor := khttpclient.NewInterceptor(http.DefaultTransport)
client := http.Client{
    Transport: interceptor,
}
```

</details>

<details>
<summary>示例</summary>

```go
import("github.com/keploy/go-sdk/integrations/khttpclient")

func main(){
	// 初始化一个 gorilla mux
	r := mux.NewRouter()
	// keploy 配置
	port := "8080"
	kApp := keploy.New(keploy.Config{
		App: keploy.AppConfig{
			Name: "Mux-Demo-app",
			Port: port,
		},
		Server: keploy.ServerConfig{
			URL: "http://localhost:6789/api",
		},
	})
	// 配置 mux 以与 keploy 集成
	kmux.Mux(kApp, r)
	// 使用 keploy 的拦截器配置 http 客户端
	interceptor := khttpclient.NewInterceptor(http.DefaultTransport)
	client := http.Client{
		Transport: interceptor,
	}

	r.HandleFunc("/mux/httpGet",func (w http.ResponseWriter, r *http.Request)  {
		// SetContext 应在 http.Client 的 Get 或 Post 或 Head 或 PostForm 方法之前在 http 处理程序中调用一次。
        // 将请求的上下文作为参数传递。
		interceptor.SetContext(r.Context())
		// 向外部 http 服务发出 Get、Post 等请求
		resp, err := client.Get("https://example.com/getDocs")
		if err != nil {
			log.Fatal(err)
		}
		defer resp.Body.Close()
		body, err := io.ReadAll(resp.Body)
		fmt.Println("BODY : ", body)
	})

	r.HandleFunc("/mux/httpDo", func(w http.ResponseWriter, r *http.Request){
		putBody, _ := json.Marshal(map[string]interface{}{
		    "name":  "Ash",
		    "age": 21,
		    "city": "Palet town",
		})
		PutBody := bytes.NewBuffer(putBody)
		// 在调用 http.Client.Do 方法之前使用处理程序请求的上下文或 SetContext
		req,err := http.NewRequestWithContext(r.Context(), http.MethodPut, "https://example.com/updateDocs", PutBody)
		req.Header.Set("Content-Type", "application/json; charset=utf-8")
		if err!=nil{
		    log.Fatal(err)
		}
		resp,err := cl.Do(req)
		if err!=nil{
		    log.Fatal(err)
		}
		defer resp.Body.Close()
		body, err := io.ReadAll(resp.Body)
		if err!=nil{
		    log.Fatal(err)
		}
		fmt.Println(" response Body: ", string(body))

	})

	// gcp compute API 集成
	client, err := google.DefaultClient(context.TODO(), compute.ComputeScope)
	if err != nil {
		fmt.Println(err)
	}
	// 将 keploy 拦截器添加到 gcp httpClient
	intercept := khttpclient.NewInterceptor(client.Transport)
	client.Transport = intercept

	r.HandleFunc("/mux/gcpDo", func(w http.ResponseWriter, r *http.Request){
		computeService, err := compute.NewService(r.Context(), option.WithHTTPClient(client), option.WithCredentialsFile("/Users/abc/auth.json"))
		zoneListCall := computeService.Zones.List(project)
		zoneList, err := zoneListCall.Do()
	})
}
```

> 确保将请求上下文传递给所有外部请求，如 http 请求、数据库调用等。

</details>

### gRPC

<details>
<summary>集成方式</summary>

可以通过注册 keploy 的 gRPC 客户端拦截器（称为 go-sdk/integrations/kgrpc 包的 WithClientUnaryInterceptor）来模拟来自 API 处理程序的外部 gRPC 调用的输出。

```go
conn, err := grpc.Dial(address, grpc.WithInsecure(), kgrpc.WithClientUnaryInterceptor(k))
```

</details>

<details>

<summary>示例</summary>

```go
import(
	"github.com/keploy/go-sdk/integrations/kgrpc"
	"github.com/keploy/go-sdk/keploy"
)

func main() {
	port := "8080"
	k := keploy.New(keploy.Config{
	  App: keploy.AppConfig{
		  Name: "my-app",
		  Port: port,
	  },
	  Server: keploy.ServerConfig{
		  URL: "http://localhost:6789/api",
	  },
	})

	// 创建 gRPC 客户端连接
	conn, err := grpc.Dial(address, grpc.WithInsecure(), kgrpc.WithClientUnaryInterceptor(k))
}
```

> 目前尚不支持流式传输。

</details>