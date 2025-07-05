package db

import (
    "context"
    "fmt"
    "os"
    "sync"
    "time"

    "github.com/neo4j/neo4j-go-driver/v5/neo4j"
    "github.com/joho/godotenv"
)

var driver neo4j.DriverWithContext
var once sync.Once

func InitDriver() (neo4j.DriverWithContext, error) {
    var err error
    once.Do(func() {
        err = godotenv.Load()
        if err != nil {
            fmt.Println("Warning: No .env file loaded")
        }
        uri := os.Getenv("NEO4J_URI")
        user := os.Getenv("NEO4J_USER")
        password := os.Getenv("NEO4J_PASSWORD")

        driver, err = neo4j.NewDriverWithContext(uri, neo4j.BasicAuth(user, password, ""))
    })
    return driver, err
}

func CloseDriver() error {
    if driver != nil {
        ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
        defer cancel()
        return driver.Close(ctx)
    }
    return nil
}
