# Contact Read Phone Service

REST API in Go with Gin to get contacts by phone from Neo4j.

## Setup

1. Clone repo
2. Create `.env` with Neo4j credentials and PORT
3. Run `go mod tidy` to install dependencies
4. Generate Swagger docs: `swag init -g main.go`
5. Run app: `go run main.go`

## Endpoints

- GET `/contacts/phone?phone=1234567890` — Get contact by phone

## Swagger UI

Available at `http://localhost:3028/swagger/index.html`

## Docker

Build and run:

```bash
docker build -t contact-read-phone-service .
docker run -p 3028:3028 contact-read-phone-service
````
