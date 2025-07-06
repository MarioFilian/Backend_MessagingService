# 🚀 Login Service (Authentication API)

## 📄 Description

This microservice handles user login authentication, generating JWT access and refresh tokens, and securely storing refresh tokens in Redis.  
It uses **PostgreSQL** to validate users (passwords hashed with bcrypt), **Redis** to manage refresh tokens, and includes **Swagger UI** for API documentation.

---

## ⚙️ Features

- 🔐 User login with username & password  
- 🕒 JWT Access Token (short-lived, 15 minutes)  
- 🔄 JWT Refresh Token (long-lived, 7 days)  
- 💾 Refresh token storage in Redis for session management  
- 📜 Swagger UI interactive API docs  
- 🌐 CORS enabled for frontend integration  
- 🐳 Dockerized for seamless deployment  

---

## 📦 Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/MarioFilian/Backend_MessagingService.git
   cd Backend_MessagingService/Auth/login-service
   ````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root folder and configure your environment variables (see below).

4. Start the service locally:

   ```bash
   npm start
   ```

5. Access Swagger docs at:
   [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

---

## 📝 Environment Variables (`.env`)

```env
# Server
PORT=3001

# JWT
JWT_SECRET=your_super_secret_key

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_database
```

---

## 🔑 API Endpoints

### POST `/auth/login`

Authenticate a user and receive JWT tokens.

**Request Body:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**

```json
{
  "accessToken": "<jwt-access-token>",
  "refreshToken": "<jwt-refresh-token>"
}
```

**Errors:**

* `401 Unauthorized` if username/password are invalid.

---

## 🐳 Docker

Build and run the Docker container:

```bash
docker build -t login-service .
docker run -p 3001:3001 --env-file .env login-service
```

---

## 📚 Swagger Documentation

Interactive API docs available once service is running:
[http://localhost:3001/api-docs](http://localhost:3001/api-docs)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## ⚠️ Notes

* Passwords are securely hashed with bcrypt in PostgreSQL.
* JWT tokens are signed with your secret and have expiration times.
* Refresh tokens are stored in Redis to allow token revocation and session management.
* User validation and registration endpoints can be added separately.

---

✨ Thanks for using the Login Service!
Happy coding! 🚀
