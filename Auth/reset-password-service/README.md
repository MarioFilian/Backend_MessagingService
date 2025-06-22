# 🔐 Reset Password Service

Microservicio para reestablecer la contraseña de un usuario usando un token enviado previamente (por email, etc.).

## 🧪 Stack
- Python + FastAPI
- GraphQL (`graphene`)
- PostgreSQL (vía `asyncpg`)
- Docker ready ✅

## 🚀 Ejecutar localmente

```bash
python -m uvicorn app.main:app --reload --port 3007
````

## 🔄 Endpoint GraphQL

```
POST http://localhost:3007/graphql
```

### 📤 Ejemplo de mutation:

```graphql
mutation {
  resetPassword(input: {
    token: "ABC123XYZ987TOKEN",
    newPassword: "NewSecurePassword!"
  }) {
    success
    message
  }
}
```

## 🐳 Docker

```bash
docker build -t reset-password-service .
docker run -p 3007:3007 --env-file .env reset-password-service
```

---

## 🗃️ Notas

* Asegúrate de tener una tabla `reset_tokens` con los campos: `token`, `user_id`, `expires_at`.
* La contraseña se actualiza en la tabla `users`.
