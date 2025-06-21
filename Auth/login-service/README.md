# 🚀 Registration Service (Login API)

## 📄 Description

This microservice handles user login authentication, generating JWT access and refresh tokens, and storing refresh tokens securely in Redis.
It uses **PostgreSQL** to validate users (to be implemented), **Redis** to store refresh tokens, and includes **Swagger** for API documentation.

---

## ⚙️ Features

* User login with username & password
* JWT Access Token (short-lived)
* JWT Refresh Token (long-lived)
* Token storage in Redis
* Swagger UI documentation
* CORS enabled for frontend apps
* Dockerized for easy deployment

---

## 📦 Installation

1. Clone this repo:

   ```bash
   git clone https://github.com/MarioFilian/Backend_MessagingService.git
   cd Backend_MessagingService/registration-service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file with the required environment variables (see below).

4. Run the app locally:

   ```bash
   npm start
   ```

5. Access Swagger UI for API docs:
   [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

---

## 📝 Environment Variables (`.env`)

```env
# Server port
PORT=3001

# JWT Secret Key (use a strong secret)
JWT_SECRET=your_jwt_secret_here

# Redis connection
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# PostgreSQL connection (planned)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=your_database
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
```

---

## 🔑 API Endpoints

### POST `/api/login`

Authenticate user and generate tokens.

**Request body example:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Successful response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🐳 Docker

Build and run the Docker container:

```bash
docker build -t registration-service .
docker run -p 3001:3001 --env-file .env registration-service
```

---

## 📚 Swagger Documentation

Once the app is running, visit:
`http://localhost:3001/api-docs`

To explore and test the API interactively.

---

## 🤝 Contributing

Feel free to open issues or submit pull requests.

---

## ⚠️ Notes

* User validation against PostgreSQL is a TODO.
* Tokens are signed with JWT\_SECRET; keep it secure.
* Refresh tokens are stored in Redis to allow revocation and session management.
