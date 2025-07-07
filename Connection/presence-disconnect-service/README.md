# 📴 Presence Disconnect Service

A microservice to mark users as **offline** in the presence system. It provides a REST API endpoint and connects to MongoDB with fully configurable connection parameters via environment variables.

---

## 🚀 Features

* REST API: `POST /presence/disconnect`
* MongoDB connection with configurable host, port, database, user, password, and authSource
* Clean error handling and validations
* Docker-ready, with environment variable configuration
* Simple, lightweight, and scalable

---

## 📦 Prerequisites

* Node.js 20+
* MongoDB instance (local, Docker, Atlas, etc.)
* Docker (optional, for containerization)

---

## ⚙️ Configuration

Create a `.env` file with the following variables:

```env
PORT=3011

MONGO_HOST=localhost
MONGO_PORT=27058
MONGO_DB=presence-connect-service
MONGO_USER=root
MONGO_PASS=example
MONGO_AUTH_DB=admin
```

---

## 🛠️ Installation & Running

1. Install dependencies:

```bash
npm install
```

2. Run the service locally:

```bash
npm start
```

3. The server will run at: `http://localhost:${PORT}` (default 3011)

---

## 🔗 MongoDB Connection Logic

The service constructs the MongoDB URI internally based on the variables:

```
mongodb://<user>:<pass>@<host>:<port>/<db>?authSource=<authDb>
```

This way you keep secrets out of the URI string and make the connection flexible.

---

## 📖 API Usage

### Endpoint: Mark user as offline

```
POST /presence/disconnect
Content-Type: application/json
```

### Request Body:

```json
{
  "userId": "123",              // Required, user ID as string or number
  "disconnectedAt": "2025-07-07T15:00:00Z"  // Optional ISO8601 timestamp
}
```

### Example with `curl`:

```bash
curl -X POST http://localhost:3011/presence/disconnect \
  -H "Content-Type: application/json" \
  -d '{"userId": "123", "disconnectedAt": "2025-07-07T15:00:00Z"}'
```

### Successful Response:

```json
{
  "message": "✅ User marked as offline",
  "data": {
    "_id": "64f1234567890abcdef12345",
    "userId": 123,
    "username": "user123",
    "status": "offline",
    "connectedAt": "2025-07-07T14:50:00Z",
    "disconnectedAt": "2025-07-07T15:00:00Z",
    "__v": 0
  }
}
```

### Errors:

* **400** — Invalid or missing `userId`
* **404** — User with given `userId` not found
* **500** — Server error updating presence

---

## 🐳 Docker Usage

Build and run with:

```bash
docker build -t presence-disconnect-service .
docker run -p 3011:3011 --env-file .env presence-disconnect-service
```

---

## 📁 Project Structure

```
presence-disconnect-service/
├── config/
│   └── db.js             # MongoDB connection logic
├── models/
│   └── Presence.js       # Mongoose schema/model
├── .env                  # Environment variables
├── Dockerfile            # Docker image instructions
├── index.js              # Express server & routes
├── package.json
├── package-lock.json
└── README.md
```
