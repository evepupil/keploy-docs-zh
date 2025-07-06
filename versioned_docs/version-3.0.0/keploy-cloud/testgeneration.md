---
id: auto-test-generation
title: 自动化测试生成 🚀
sidebar_label: 测试生成 🚀
tags:
  - 自动化测试生成
  - OpenAPI
  - 测试自动化
  - OpenAI
keywords:
  - 自动化测试生成
  - Keploy
  - OpenAPI
  - 测试自动化
---

自动化测试生成通过基于提供的OpenAPI Schema文件自动生成测试用例，简化了测试流程。

## 使用方法 🛠️

Keploy可以借助应用程序的模式文件自动生成测试：

```bash
keploy generate-tests -c "<appCmd>" -s "<schemaFilePath>"
```

## 示例

以[employee-manager](https://github.com/keploy/samples-java/tree/main/employee-manager)应用程序为例。首先我们需要为应用创建`schema.json`文件，内容如下：

```json
{
  "openapi": "3.0.3",
  "info": {
    "title": "Employee API",
    "description": "CRUD API for managing employees",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://localhost:8080/api/"
    }
  ],
  "paths": {
    "/employees": {
      "get": {
        "summary": "Get all employees",
        "operationId": "getEmployees",
        "responses": {
          "200": {
            "description": "List of employees",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Employee"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request parameters",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Create a new employee",
        "operationId": "createEmployee",
        "requestBody": {
          "description": "Employee object to be created",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeRequestBody"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Created employee",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeResponse"
                }
              }
            },
            "links": {
              "getCreatedEmployee": {
                "description": "The `GET /employees/{id}` endpoint for the newly created employee",
                "operationId": "getEmployeeById",
                "parameters": {
                  "id": "$response.body#/id"
                }
              }
            }
          },
          "400": {
            "description": "Invalid request body or parameters",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/employees/{id}": {
      "get": {
        "summary": "Get an employee by ID",
        "operationId": "getEmployeeById",
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "ID of the employee to retrieve"
          }
        ],
        "responses": {
          "200": {
            "description": "Employee with the specified ID",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeResponse"
                }
              }
            },
            "links": {
              "updateEmployee": {
                "description": "The `PUT /employees/{id}` endpoint to update the employee",
                "operationId": "updateEmployeeById",
                "parameters": {
                  "id": "$response.body#/id"
                }
              },
              "deleteEmployee": {
                "description": "The `DELETE /employees/{id}` endpoint to delete the employee",
                "operationId": "deleteEmployeeById",
                "parameters": {
                  "id": "$response.body#/id"
                }
              }
            }
          },
          "400": {
            "description": "Invalid request parameters",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          },
          "404": {
            "description": "Employee with the specified ID not found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "put": {
        "summary": "Update an employee by ID",
        "operationId": "updateEmployeeById",
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "ID of the employee to update"
          }
        ],
        "requestBody": {
          "description": "Employee object with updated information",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeRequestBody"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Updated employee",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeResponse"
                }
              }
            },
            "links": {
              "getUpdatedEmployee": {
                "description": "The `GET /employees/{id}` endpoint for the updated employee",
                "operationId": "getEmployeeById",
                "parameters": {
                  "id": "$response.body#/id"
                }
              },
              "deleteEmployee": {
                "description": "The `DELETE /employees/{id}` endpoint to delete the employee",
                "operationId": "deleteEmployeeById",
                "parameters": {
                  "id": "$response.body#/id"
                }
              }
            }
          },
          "400": {
            "description": "Invalid request body or parameters",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          },
          "404": {
            "description": "Employee with the specified ID not found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "delete": {
        "summary": "Delete an employee by ID",
        "operationId": "deleteEmployeeById",
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "ID of the employee to delete"
          }
        ],
        "responses": {
          "200": {
            "description": "Employee deleted successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "deleted": {
                      "type": "boolean"
                    }
                  }
                }
              }
            },
            "links": {
              "createEmployee": {
                "description": "The POST /employees endpoint for creating a new employee with the request body containing employee details.",
                "operationId": "createEmployee",
                "requestBody": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/EmployeeRequestBody"
                      }
                    }
                  }
                }
              },
              "getEmployees": {
                "description": "The `GET /employees` endpoint for all employees",
                "operationId": "getEmployees"
              }
            }
          },
          "400": {
            "description": "Invalid request parameters",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          },
          "404": {
            "description": "Employee with the specified ID not found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Employee": {
        "type": "object",
        "properties": {
          "firstName": {
            "type": "string",
            "pattern": "[A-Za-z0-9_]"
          },
          "lastName": {
            "type": "string",
            "pattern": "[A-Za-z0-9_]"
          },
          "email": {
            "type": "string",
            "pattern": "[A-Za-z0-9_]"
          }
        },
        "required": ["firstName", "lastName", "email"]
      },
      "EmployeeRequestBody": {
        "type": "object",
        "properties": {
          "firstName": {
            "type": "string",
            "pattern": "[A-Za-z0-9_]"
          },
          "lastName": {
            "type": "string",
            "pattern": "[A-Za-z0-9_]"
          },
          "email": {
            "type": "string",
            "pattern": "[A-Za-z0-9_]"
          }
        },
        "required": ["firstName", "lastName", "email"]
      },
      "EmployeeResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "firstName": {
            "type": "string",
            "pattern": "[A-Za-z0-9_]"
          },
          "lastName": {
            "type": "string",
            "pattern": "[A-Za-z0-9_]"
          },
          "email": {
            "type": "string",
            "pattern": "[A-Za-z0-9_]"
          }
        }
      },
      "Error": {
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "message": {
            "type": "string"
          }
        }
      }
    }
  }
}
```

### 启动数据库实例

通过docker启动postgres数据库实例：

```sh
docker-compose up -d postgres
```

## 生成测试用例

现在我们有了模式文件，需要创建jar文件（因为我们使用的是Java示例应用）：

```sh
mvn clean install -DskipTests
```

jar文件准备就绪后，让我们用keploy启动应用程序：

```sh
keploy generate-tests -c "java -jar <JAR_FILE_PATH>" -s "schema.json"
```

我们将得到类似输出：

<img width="881" alt="image" src="https://github.com/keploy/docs/assets/53110238/2586dd57-dee8-46dd-9886-08ad729685c1"/>