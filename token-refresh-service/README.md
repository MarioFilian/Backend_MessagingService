# 🔁 Token Refresh Service

This microservice handles JWT access token renewal via a valid refresh token.

## 🛠 Tech Stack
- FastAPI
- Redis
- gRPC (client)
- Docker

## 🧪 Run Locally

```bash
uvicorn app.main:app --reload --port 3003
