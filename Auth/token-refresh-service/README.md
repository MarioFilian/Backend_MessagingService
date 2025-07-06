# 🔄 Token Refresh Service

Microservice that securely refreshes JWT access and refresh tokens via GraphQL.  
Built with **FastAPI**, **Strawberry GraphQL**, **Redis**, and **JWT** standards.

---

## 🧪 Tech Stack

- 🐍 **Python 3.11+**
- ⚡ **FastAPI** – Lightweight, async web framework
- 🍓 **Strawberry GraphQL** – GraphQL API with Python typing
- 🗝️ **PyJWT** – JWT signing and verification
- 🧠 **Redis** – Temporary refresh token store
- 🐳 Docker-compatible
- 🧪 Planned testing with `pytest`, `httpx`

---

## 📁 Project Structure

```

token-refresh-service/
├── app/
│   ├── graphql.py         # GraphQL schema (Query & Mutation)
│   ├── main.py            # FastAPI entrypoint
│   ├── redis\_client.py    # Redis connection client
│   ├── token\_utils.py     # JWT generation and decoding
├── .env                   # Env vars for local dev (not required in production)
├── Dockerfile             # Production Docker container
├── requirements.txt       # Python dependencies
├── README.md              # This file
└── .gitignore

````

---

## ⚙️ Environment Variables

The service uses the following environment variables:

| Variable         | Description                          | Example                     |
|------------------|--------------------------------------|-----------------------------|
| `PORT`           | Port FastAPI will listen on          | `3003`                      |
| `JWT_SECRET`     | Secret key for signing JWT           | (long random hex string)    |
| `JWT_ALGORITHM`  | Algorithm used for signing           | `HS256`                     |
| `JWT_EXP_MINUTES`| Access token expiration (minutes)    | `15`                        |
| `JWT_EXP_DAYS`   | Refresh token expiration (days)      | `7`                         |
| `REDIS_HOST`     | Redis hostname                       | `localhost`                 |
| `REDIS_PORT`     | Redis port                           | `6379`                      |
| `REDIS_PASSWORD` | Redis password (optional)            | `example`                   |

---

## 🚀 Run Locally

### 1. Install dependencies

```bash
pip install -r requirements.txt
````

### 2. Run FastAPI app

```bash
uvicorn app.main:app --reload --port 3003
```

Visit GraphQL playground at:
[http://localhost:3003/graphql](http://localhost:3003/graphql)

---

## 🔄 GraphQL Usage

### Endpoint

```
POST http://localhost:3003/graphql
```

### 🎯 Example Mutation

```graphql
mutation {
  refreshToken(refreshToken: "your_valid_refresh_token") {
    accessToken
    refreshToken
  }
}
```

### ✅ Success Response

```json
{
  "data": {
    "refreshToken": {
      "accessToken": "<new-access-token>",
      "refreshToken": "<new-refresh-token>"
    }
  }
}
```

### ❌ Failure Response (e.g. expired or invalid)

```json
{
  "data": {
    "refreshToken": null
  }
}
```

---

## 🐳 Docker Support

### Build image

```bash
docker build -t token-refresh-service .
```

### Run container

```bash
docker run -d --name token-refresh-service -p 3003:3003 \
  -e PORT=3003 \
  -e JWT_SECRET=your_secret_key \
  -e JWT_ALGORITHM=HS256 \
  -e JWT_EXP_MINUTES=15 \
  -e JWT_EXP_DAYS=7 \
  -e REDIS_HOST=localhost \
  -e REDIS_PORT=6379 \
  -e REDIS_PASSWORD=example \
  token-refresh-service
```

---

## ♻️ Token Flow Logic

1. **Client** sends current refresh token.
2. **Redis** is queried to validate token existence.
3. **JWT** is decoded and validated.
4. **New access/refresh tokens** are generated.
5. Old refresh token is removed from Redis.
6. New refresh token is stored in Redis with expiration.

---

## 📦 Dependencies

```txt
fastapi
strawberry-graphql
uvicorn
python-dotenv
redis
pyjwt
```

---

## 📄 License

This project is licensed under the MIT License.
