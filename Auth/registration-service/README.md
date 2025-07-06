# 📝 Registration Service · Auth Microservice

This microservice handles user registration, JWT token generation (access & refresh), and stores refresh tokens securely in Redis. It is part of a larger authentication architecture for a messaging application.

---

## 🚀 Tech Stack

- 🧬 **Java 21**
- 🌱 **Spring Boot 3.x**
- 🔐 **Spring Security**
- 🧪 **JUnit 5** + **MockMvc**
- 🧰 **Maven**
- 🧠 **Redis** (with Lettuce)
- 🐘 **PostgreSQL**
- 🔐 **JWT (JJWT)**
- 🧼 **Lombok**
- 📦 **Docker**
- 📑 **OpenAPI / Swagger 3**

---

## 📦 Features

- ✅ Register users with email & username validation
- 🔒 Hash passwords using BCrypt
- 🔐 Generate JWT access and refresh tokens
- 🧠 Store refresh tokens in Redis (7-day expiry)
- 🔁 Stateless Authentication (JWT-based)
- 🧪 Includes unit tests (`/health`, etc.)
- 📄 Swagger API docs at `/swagger-ui.html`
- 🔁 Dockerized for CI/CD & deployment

---


## 📁 Project Structure

```

Auth/
└── registration-service/
├── src/
│   ├── main/
│   │   ├── java/com/projectfinal/registrationservice/
│   │   │   ├── config/
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── entity/
│   │   │   ├── repository/
│   │   │   ├── service/
│   │   │   └── util/
│   └── test/java/com/projectfinal/registrationservice/
│       └── HealthControllerTest.java
├── Dockerfile
└── README.md

````


## 🌐 REST API Endpoints

| Method | Endpoint             | Description                       | Auth |
|--------|----------------------|-----------------------------------|------|
| GET    | `/health`            | Simple health check               | ❌ No |
| POST   | `/api/register`      | Register new users & return JWTs  | ❌ No |

### ✅ Swagger available at:
[http://localhost:3002/swagger-ui.html](http://localhost:3002/swagger-ui.html)


---

## 🛠 Environment Variables (.env)

These must be provided as environment variables or secrets:

| Key                        | Description                            |
|---------------------------|----------------------------------------|
| `APP_NAME`                | Application name                       |
| `SERVER_PORT`             | Port Spring Boot runs on               |
| `DB_HOST`                 | PostgreSQL host                        |
| `DB_PORT`                 | PostgreSQL port                        |
| `DB_NAME`                 | PostgreSQL database name               |
| `DB_USERNAME`             | PostgreSQL username                    |
| `DB_PASSWORD`             | PostgreSQL password                    |
| `HIBERNATE_DDL_AUTO`      | e.g., `update`, `create-drop`, etc.   |
| `SHOW_SQL`                | Whether to log SQL statements          |
| `HIBERNATE_DIALECT`       | e.g., `PostgreSQLDialect`             |
| `LOGGING_LEVEL_HIBERNATE_SQL` | Logging level for SQL logs         |
| `JWT_SECRET`              | Base64-encoded JWT secret              |
| `JWT_EXPIRATION_MS`       | Access token expiry (e.g. `900000`)   |
| `JWT_REFRESH_EXPIRATION_MS` | Refresh token expiry (e.g. `604800000`) |
| `CORS_ALLOWED`            | Allowed CORS origins (e.g. `*`)        |
| `HOST_REDIS`              | Redis host                             |
| `PORT_REDIS`              | Redis port                             |
| `PASS_REDIS`              | Redis password                         |

---

## 🧪 Testing

We use **JUnit + MockMvc**. Sample test:

```java
mockMvc.perform(get("/health"))
       .andExpect(status().isOk())
       .andExpect(content().string("ok"));
````

To run tests locally:

```bash
mvn test
```

### GitHub Actions (CI/CD)

* ✅ CI: Runs tests on every `push` to `development`
* 🚀 CD: Builds & deploys Docker image to EC2 if tests pass

---

## 🐳 Docker

**Dockerfile** is multi-stage and production-ready. Build and run:

```bash
docker build -t registration-service .
docker run -p 3002:3002 --env-file .env registration-service
```

---

## 📂 Project Structure

```
registration-service/
├── config/             # CORS, Redis, Security, Swagger
├── controller/         # Health & Registration
├── dto/                # Request & response models
├── entity/             # JPA entities
├── repository/         # Spring Data interfaces
├── service/            # Business logic
├── util/               # JWT helper
├── test/               # Unit tests
└── Dockerfile
```

---


## 📜 License

MIT — feel free to use it for your own messaging microservices! ✨
