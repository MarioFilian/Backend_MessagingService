# 🔁 Token Refresh Service

This microservice handles JWT access token renewal via a valid refresh token.

## 🛠 Tech Stack
- FastAPI
- Redis
- gRPC (client)
- Docker

## 🧪 Run Locally

```bash

python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 3003
