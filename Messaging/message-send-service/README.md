# 🚀 message-send-service

Microservice for capturing and initially sending messages in a messaging architecture.

---

## 📋 Description

This service receives incoming messages and pushes them to a temporary queue (Redis/Kafka).  
It focuses on fast reception for event-driven architectures.

---

## ✨ Features

- REST API with a POST endpoint `/message/send` to send messages.
- GET endpoint `/health` to check service health status.
- Uses Redis as a temporary queue (simulated or real).
- CORS enabled.
- Default port: 3009.
- Unit tests with Jest and Supertest.
- Basic validation and error handling.

---

## ⚙️ Installation

```bash
npm install
````

---

## 🔧 Environment Variables

* `PORT`: Port where the service runs (default 3009).
* `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`: Redis connection settings.
* `JWT_SECRET`: Secret key for JWT (if used).
* Other variables as needed for configuration.

---

## 🏃‍♂️ Available Scripts

* `npm run dev`: Run the service in development mode with nodemon.
* `npm start`: Run the service in production mode.
* `npm test`: Run unit tests.

---

## 🌐 API Endpoints

### GET `/health`

Returns HTTP 200 OK with:

```json
{ "status": "ok" }
```

### POST `/message/send`

Send a message.

**Expected JSON Body:**

```json
{
  "senderId": "string",
  "recipientId": "string",
  "content": "string"
}
```

**Successful Response (200 OK):**

```json
{
  "status": "sent",
  "message": {
    "id": "string",
    "senderId": "string",
    "recipientId": "string",
    "content": "string",
    "timestamp": "string"
  }
}
```

---

## 🧪 Testing

Run tests with:

```bash
npm test
```

---

## 📂 Folder Structure

```
├── config/
│   └── redis.js        # Redis configuration
├── routes/
│   ├── health.js       # /health route
│   └── send.js         # /message/send route
├── __tests__/
│   └── send.test.js    # Unit tests
├── index.js            # Main Express app
├── jest.config.js      # Jest configuration
├── package.json
└── .gitignore
```


## 📄 License

MIT
