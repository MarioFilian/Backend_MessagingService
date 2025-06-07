# Registration Service

This microservice handles user registration for the system.

## Features

- Registers new users
- Validates unique username and email
- Hashes user passwords with BCrypt
- Uses PostgreSQL for persistence
- REST API with JSON input/output

## Running locally

1. Configure PostgreSQL database and update `src/main/resources/application.properties` with your DB credentials.

2. Build and run with Maven:

```bash
./mvnw clean package
java -jar target/registration-service-0.0.1-SNAPSHOT.jar
````

The service will be available on port 3002.

## Docker

To build and run the container:

```bash
docker build -t registration-service .
docker run -p 3002:3002 registration-service
```

## API

`POST /api/register`

Request body (JSON):

```json
{
  "username": "user123",
  "password": "strongpassword",
  "email": "user@example.com"
}
```

Response:

* `200 OK` on success
* `400 Bad Request` with validation errors
* `409 Conflict` if username or email already exist
