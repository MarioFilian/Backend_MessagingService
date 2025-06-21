# Contact Update Service

A microservice built with Spring Boot to update contact information stored in Neo4j.

---

## Features

- REST API to update contact details by ID
- Integration with Neo4j graph database
- Runs on port `3029` by default
- Dockerized for easy deployment

---

## Requirements

- Java 17+ (or compatible)
- Maven 3.6+
- Neo4j running locally or remotely (default URI: `bolt://localhost:7687`)
- Docker (optional, for containerization)

---

## Configuration

The service reads configuration from:

- `application.properties` (default configs)
- `.env` file (for environment-specific variables, **not committed**)

Example `.env`:

```env
SPRING_NEO4J_URI=bolt://localhost:7687
SPRING_NEO4J_AUTH_USERNAME=neo4j
SPRING_NEO4J_AUTH_PASSWORD=example
SERVER_PORT=3029
````

---

## Running Locally

1. Make sure Neo4j is running and accessible.
2. Build the project with Maven:

```bash
./mvnw clean package
```

3. Run the application:

```bash
java -jar target/contact-update-service-0.0.1-SNAPSHOT.jar
```

4. The service will be available at:

```
http://localhost:3029
```

---

## API

### Update Contact

* **Endpoint:** `PUT /contacts/{id}`
* **Request Body:**

```json
{
  "name": "New Name",
  "phone": "+123456789"
}
```

* **Response:**

```json
{
  "id": "contact-id",
  "name": "New Name",
  "phone": "+123456789"
}
```

---

## Docker

To build and run the Docker container:

```bash
docker build -t contact-update-service .
docker run -p 3029:3029 contact-update-service
```

---

## License

MIT License

