# 📝 Registration Service

Backend service for user registration, credential management, and initial JWT token generation. Built with Spring Boot and PostgreSQL.

---

## 🚀 Features

* ✅ User registration with validation
* 🔒 Secure password hashing
* 🎟️ JWT token generation upon registration
* 🌐 Dynamic CORS configuration
* 📖 Swagger/OpenAPI documentation
* 🔐 Basic Spring Security configuration with public and protected endpoints

---

## 🛠️ Technologies

* Java 17+
* Spring Boot 3.x
* Spring Security
* Spring Data JPA
* PostgreSQL
* JWT (JSON Web Tokens)
* Maven
* Swagger (OpenAPI)

---

## ⚙️ Environment Variables (`.env`)

You must set the following variables to run the application correctly:

| Variable                      | Description                                            | Example                                                                                    |
| ----------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `APP_NAME`                    | Name of the app/service                                | registration-service                                                                       |
| `SERVER_PORT`                 | Backend listening port                                 | 3002                                                                                       |
| `DB_URL`                      | PostgreSQL connection URL                              | jdbc\:postgresql://localhost:5432/registrationdb                                           |
| `DB_USERNAME`                 | PostgreSQL database username                           | postgres                                                                                   |
| `DB_PASSWORD`                 | PostgreSQL database password                           | example                                                                                    |
| `HIBERNATE_DDL_AUTO`          | Hibernate schema generation strategy (validate/update) | update                                                                                     |
| `SHOW_SQL`                    | Show SQL queries in console (`true` or `false`)        | true                                                                                       |
| `HIBERNATE_DIALECT`           | Hibernate dialect class for PostgreSQL                 | org.hibernate.dialect.PostgreSQLDialect                                                    |
| `LOGGING_LEVEL_HIBERNATE_SQL` | Log level for Hibernate SQL statements                 | DEBUG                                                                                      |
| `JWT_SECRET`                  | Secret key for signing JWT tokens                      | your\_jwt\_secret\_here                                                                    |
| `JWT_EXPIRATION_MS`           | JWT token expiration time in milliseconds              | 3600000                                                                                    |
| `CORS_ALLOWED`                | Allowed CORS origins (comma-separated)                 | [http://localhost:3000,http://localhost:3002](http://localhost:3000,http://localhost:3002) |

---

## 💻 Local Setup

1. Clone the repo:

```bash
git clone https://github.com/your_username/registration-service.git
cd registration-service
```

2. Create a `.env` file with the variables listed above.

3. Build without tests:

```bash
mvn clean install -DskipTests
```

4. Run the service:

```bash
mvn spring-boot:run
```

Service will start on the configured `SERVER_PORT`.

---

## 📬 API Usage

### Register User

* **Endpoint:** `POST /api/register`
* **Sample JSON payload:**

```json
{
  "username": "mario123",
  "password": "P@ssw0rd123",
  "email": "mario@example.com",
  "firstName": "Mario",
  "lastName": "Perez",
  "role": "USER"
}
```

* **Response:**
  A JWT token string

---

## 📚 Swagger Documentation

Access API docs at:

```
http://localhost:{SERVER_PORT}/swagger-ui/index.html
```

---

## 🌐 CORS Configuration

Allowed origins are configured dynamically through `CORS_ALLOWED` environment variable. Use comma-separated URLs.

---

## 🔒 Security

* Registration endpoint is public.
* Other endpoints require JWT authentication.
* Stateless session management.

---

## 🧪 Testing

* Use Postman or similar tool.
* Send POST request to `/api/register` with JSON payload.
* Receive JWT token for authenticated requests.

---

## 🐳 Docker & Deployment

Build Docker image:

```bash
docker build -t your_dockerhub_username/registration-service:latest .
```

Run Docker container:

```bash
docker run -d -p 3002:3002 --env-file .env your_dockerhub_username/registration-service:latest
```

---

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome! Please open issues or PRs.

---

## 📄 License

MIT License (or your license)
