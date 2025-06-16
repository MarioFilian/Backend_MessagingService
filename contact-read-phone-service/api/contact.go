package api

import (
    "context"
    "net/http"

    "github.com/gin-gonic/gin"
    "github.com/neo4j/neo4j-go-driver/v5/neo4j"
)

type Contact struct {
    ID    int64  `json:"id"`
    Name  string `json:"name"`
    Phone string `json:"phone"`
}

type ErrorResponse struct {
    Error string `json:"error"`
}

func GetContactByPhone(c *gin.Context, driver neo4j.DriverWithContext) {
    phone := c.Query("phone")
    if phone == "" {
        c.JSON(http.StatusBadRequest, ErrorResponse{Error: "phone query param is required"})
        return
    }

    session := driver.NewSession(context.Background(), neo4j.SessionConfig{AccessMode: neo4j.AccessModeRead})
    defer session.Close(context.Background())

    result, err := session.ExecuteRead(context.Background(), func(tx neo4j.ManagedTransaction) (interface{}, error) {
        record, err := tx.Run(context.Background(),
            "MATCH (c:Contact {phone: $phone}) RETURN id(c) as id, c.name as name, c.phone as phone LIMIT 1",
            map[string]interface{}{"phone": phone})
        if err != nil {
            return nil, err
        }
        if record.Next(context.Background()) {
            rec := record.Record()
            id, _ := rec.Get("id")
            name, _ := rec.Get("name")
            phone, _ := rec.Get("phone")

            return Contact{
                ID:    id.(int64),
                Name:  name.(string),
                Phone: phone.(string),
            }, nil
        }
        return nil, nil
    })

    if err != nil {
        c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "Database query error"})
        return
    }

    if result == nil {
        c.JSON(http.StatusNotFound, ErrorResponse{Error: "Contact not found"})
        return
    }

    c.JSON(http.StatusOK, result)
}
