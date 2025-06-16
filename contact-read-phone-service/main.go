package main

import (
    "context"
    "contact-read-phone-service/api"
    "contact-read-phone-service/db"
    "log"
    "os"

    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
    _ "contact-read-phone-service/docs"

    ginSwagger "github.com/swaggo/gin-swagger"
    swaggerFiles "github.com/swaggo/files"
)


// @title Contact Read Phone Service API
// @version 1.0
// @description API to read contacts by phone number from Neo4j
// @host localhost:3028
// @BasePath /
func main() {
    err := godotenv.Load()
    if err != nil {
        log.Println("No .env file found")
    }

    port := os.Getenv("PORT")
    if port == "" {
        port = "3028"
    }

    driver, err := db.InitDriver()
    if err != nil {
        log.Fatalf("Failed to connect to Neo4j: %v", err)
    }
    // defer close only on program exit
    defer func() {
        if err := driver.Close(context.Background()); err != nil {
            log.Printf("Error closing Neo4j driver: %v", err)
        }
    }()

    r := gin.Default()

    // Pass driver to handler using closure
    r.GET("/contacts/phone", func(c *gin.Context) {
        api.GetContactByPhone(c, driver)
    })

    // Swagger
    r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

    log.Printf("Starting server on port %s...", port)
    err = r.Run(":" + port)
    if err != nil {
        log.Fatalf("Failed to start server: %v", err)
    }
}
