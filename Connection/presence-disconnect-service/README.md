# 📴 Presence Disconnect Service

This service marks a user as **offline** using REST and WebSocket.

## 🔧 Features

- REST API: `POST /presence/disconnect`
- WebSocket event: `disconnect-user`
- MongoDB connection (Mongo Atlas or Docker)

## 🚀 Usage

### 1. Install dependencies

```bash
npm install
````

### 2. Set environment

`.env`:

```
PORT=3011
MONGO_URI=mongodb://root:example@localhost:27058/presence-db
```

### 3. Run the service

```bash
npm start
```

## 🧪 Example request

### REST (Postman)

```
POST http://localhost:3011/presence/disconnect
Body: { "userId": "123" }
```

### WebSocket

* Connect to `ws://localhost:3011`
* Send event `disconnect-user` with payload `"123"`

