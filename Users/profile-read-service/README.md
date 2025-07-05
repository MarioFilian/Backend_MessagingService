# 🧑‍💻 profile-read-service

Servicio REST en Dart con Shelf para recuperar datos de perfil de usuario por ID de forma segura y sencilla.

## 📦 Tecnologías

- Dart >=3.0
- Shelf (framework HTTP)
- PostgreSQL
- Dotenv (variables de entorno)
- Docker (opcional)

---

## 🚀 Endpoints

### `POST /forgot-password`

Solicita un token de reseteo de contraseña.

**Body (JSON):**
```json
{
  "email": "usuario@example.com"
}
````

**Response:**

```json
{
  "message": "Token generated",
  "token": "abc123..."
}
```

### `GET /profile/:id`

Consulta el perfil del usuario por ID (no implementado en esta versión, pendiente).

---

## ⚙️ Variables de Entorno

Define en un archivo `.env`:

```
DB_HOST=localhost
DB_PORT=5435
DB_NAME=registrationdb
DB_USER=postgres
DB_PASSWORD=example
```

---

## 🛠️ Instalación y Ejecución

### 🔹 Local

```bash
dart pub get
dart run
```

### 🔹 Docker

```bash
docker build -t profile-read-service .
docker run -p 3008:3008 --env-file .env profile-read-service
```

---

## 📁 Estructura

```
profile-read-service/
├── bin/
│   └── profile_read_service.dart
├── .env
├── .gitignore
├── Dockerfile
├── pubspec.yaml
├── pubspec.lock
```

---

## 🧪 Probar

```bash
curl -X POST http://localhost:3008/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@example.com"}'
```

---

## 🧠 Notas

* Requiere una tabla `users` y `reset_tokens` en PostgreSQL.
* Solo usuarios habilitados (`enabled = true`) podrán generar un token.
* El token expira en 1 hora desde su creación.

---

## 🧾 Licencia

MIT

