# Presence Connect Service

Marks a user as online in the presence database using MongoDB and Socket.IO.

## 🧪 Usage

1. **Start MongoDB** (local or container).
2. **Start the service**:

```bash
npm install
npm start
````

3. **WebSocket Event**:

   * Endpoint: `ws://localhost:3010`
   * Event: `user-online`
   * Payload:

     ```json
     {
       "userId": "1"
     }
     ```

## 🐳 Docker

```bash
docker build -t presence-connect-service .
docker run -p 3010:3010 --env-file .env presence-connect-service
```
