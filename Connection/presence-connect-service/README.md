# 📡 Presence Connect Service

**Presence Connect Service** is a lightweight microservice built with Node.js and Express that marks a user as "online" in a MongoDB database. It is part of a real-time user presence system for a messaging application.

## 🚀 Features

- Marks users as connected (online)
- Automatically inserts or updates user presence using MongoDB `upsert`
- JSON and CORS support
- Ready for WebSocket (Socket.IO) integration
- Environment-configurable and Docker-ready

---

## 📁 Project Structure

```

presence-connect-service/
├── db/                  # MongoDB connection handler
│   └── mongo.js
├── models/              # Mongoose schemas
│   └── Presence.js
├── .env                 # Environment variables
├── .gitignore
├── Dockerfile
├── index.js             # App entry point
├── package.json
├── package-lock.json
└── README.md

````

---

## ⚙️ Environment Variables

Create a `.env` file in the project root with the following values:

```env
PORT=3010
MONGO_HOST=localhost
MONGO_PORT=27058
MONGO_DB=presence-connect-service
MONGO_USER=root
MONGO_PASS=example
MONGO_AUTH_DB=admin
````

---

## 💻 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/presence-connect-service.git
cd presence-connect-service
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the service

```bash
npm start
```

The service will be running at:
📍 `http://localhost:3010`

---

## 📨 REST API

### `POST /presence/connect`

Marks a user as online using `upsert` logic.

#### Request Body

```json
{
  "userId": 1,
  "username": "alberto"
}
```

#### Response

```json
{
  "message": "User marked as online (upsert)"
}
```

#### Possible Errors

| Code | Description                      |
| ---- | -------------------------------- |
| 400  | Missing `userId` or `username`   |
| 500  | Internal MongoDB or server error |

---

## 🩺 Healthcheck

### `GET /health`

Basic health check to confirm the service is running.

```bash
curl http://localhost:3010/health
```

#### Response

```json
{
  "status": "ok",
  "service": "presence-connect-service"
}
```

---

## 🐳 Docker Usage

### 1. Build the image

```bash
docker build -t presence-connect-service .
```

### 2. Run the container

```bash
docker run --env-file .env -p 3010:3010 presence-connect-service
```

---

## 🔌 WebSocket Integration (Coming Soon)

This service is ready to be extended using **Socket.IO** with support for real-time events like:

* `user-online`
* `user-disconnect`

---

## 🧪 Testing (Coming Soon)

Planned test coverage:

* Unit tests with Jest
* Integration tests with MongoDB mock
* CI/CD via GitHub Actions

---

## 🛡️ Security

* All sensitive data is handled via environment variables (`.env`)
* MongoDB authentication and port configuration required

---

## 🧰 Built With

* Node.js
* Express.js
* MongoDB + Mongoose
* Docker
* dotenv

