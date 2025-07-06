# 🔐 Forgot Password Service

A **RESTful microservice** built with **Dart** and **Shelf** designed to handle password reset requests by generating secure reset tokens. This service connects to a **PostgreSQL** database to validate users and manage reset tokens securely.

---

## 🚀 Key Features

* **Built with Dart & Shelf:** Lightweight, fast, and scalable server architecture.
* **PostgreSQL Integration:** Validates user existence and status before issuing tokens.
* **Environment-based Configuration:** Secure and flexible using `.env` file.
* **Secure Token Generation:** Creates cryptographically strong, random tokens with expiration.
* **Modular and Clean Code:** Designed with maintainability and extensibility in mind.
* **Docker Ready:** Easy containerization for deployment anywhere.

---

## 🛠️ Prerequisites

Make sure you have the following installed and configured:

* [Dart SDK](https://dart.dev/get-dart) (version 3.0 or higher)
* Running and accessible **PostgreSQL** database
* Docker (optional, for containerization)
* `.env` file with your environment variables configured

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory of the project to configure your environment variables:

```env
# PostgreSQL configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_secure_password

# JWT configuration
JWT_SECRET=586E3272357538782F413F4428472B4B6250655368566B597033733676397924
JWT_EXPIRATION_MS=900000           # 15 minutes in milliseconds
JWT_REFRESH_EXPIRATION_MS=604800000 # 7 days in milliseconds

# Optional: CORS settings, Redis info, etc. can be added here if expanded
```

> **Tip:** Keep your `.env` file secure and never commit it to public repositories.

---

## 📦 Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/MarioFilian/Backend_MessagingService.git
cd Backend_MessagingService/Auth/forgot-password-service
```

2. **Install dependencies**

```bash
dart pub get
```

3. **Run the application locally**

```bash
dart run bin/main.dart
```

4. **Access the service**

The server will start on:

```
http://localhost:3005
```

---

## 📡 API Endpoints

### POST `/forgot-password`

Trigger a password reset token generation for a given user email.

#### Request Body (JSON):

```json
{
  "email": "user@example.com"
}
```

#### Possible Responses:

| Status Code     | Description                  | Response Example                                         |
| --------------- | ---------------------------- | -------------------------------------------------------- |
| 200 OK          | Token generated successfully | `{ "message": "Token generated", "token": "ABC123XYZ" }` |
| 400 Bad Request | Missing or invalid email     | `{ "error": "Email is required" }`                       |
| 404 Not Found   | Email does not exist         | `{ "error": "Email not found" }`                         |
| 403 Forbidden   | User account disabled        | `{ "error": "User is disabled" }`                        |

---

## 🐳 Docker Deployment

Easily build and run the service inside a Docker container for consistent deployment:

```bash
# Build the Docker image
docker build -t forgot-password-service .

# Run the container exposing port 3005
docker run -p 3005:3005 --env-file .env forgot-password-service
```

> The service will then be accessible at `http://localhost:3005`

---

## 📈 Architecture & Design

This microservice follows **clean architecture** principles ensuring:

* **Separation of concerns:** Clear division between configuration, domain logic, data access, and routing layers.
* **Maintainability:** Modular codebase for easy updates and scaling.
* **Testability:** Each module can be tested independently (future work).
* **Security:** Token generation uses cryptographically secure random values.

---

## 🔮 Future Enhancements

* Implement **token validation** endpoint to verify reset tokens.
* Add **email integration** (SMTP, SendGrid, etc.) to send reset tokens automatically.
* Store tokens with **automatic expiration** and cleanup jobs.
* Add **unit and integration tests** for all layers.
* Add **rate limiting** and **logging/monitoring** for production readiness.
* Support **refresh token** flow if applicable.

---

## 🤝 Contributing & Support

Contributions are always welcome! If you want to suggest features, report bugs, or improve documentation, please open an issue or submit a pull request.

For questions or support, feel free to reach out or open a discussion.

---

## 📚 References & Resources

* [Dart Programming Language](https://dart.dev)
* [Shelf Web Server](https://pub.dev/packages/shelf)
* [PostgreSQL Database](https://www.postgresql.org/)
* [Docker Documentation](https://docs.docker.com/)
* [JWT Best Practices](https://auth0.com/docs/tokens/json-web-tokens)

---

Thank you for using the **Forgot Password Service**! 🔐💙

