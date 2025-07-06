# ✅ Validate Token Service

Microservice built with **PHP 8.2** and **Symfony** that validates access and refresh tokens using **JWT (JSON Web Tokens)**.  
Exposes two secure REST endpoints to verify token integrity and expiration.

---

## 🧪 Tech Stack

- 🐘 **PHP 8.2**
- ⚙️ **Symfony 6**
- 🔐 **firebase/php-jwt** – JWT validation
- 🚀 **Apache** (mod_rewrite enabled)
- 🐳 Docker-ready deployment

---

## 📁 Project Structure

```

validate-service/
├── bin/                    # Symfony CLI
├── config/                 # Symfony configuration (routes, cache, services)
├── public/                 # Web root (Apache DocumentRoot)
├── src/                   #
│   ├── Controller/         # REST Controllers
│   └── Service/            # Token validation service
├── .env                    # Environment variables (e.g. JWT\_SECRET)
├── composer.json           # PHP dependencies
├── Dockerfile              # Docker setup
└── README.md               # You're here

````

---

## 🔐 Endpoints

| Method | Path               | Description                      |
|--------|--------------------|----------------------------------|
| POST   | `/validate/access` | Validates an **access token**    |
| POST   | `/validate/refresh`| Validates a **refresh token**    |

---

## 🔄 Example Requests

### 🔍 Validate Access Token

**POST** `/validate/access`

**Body:**
```json
{
  "accessToken": "your_jwt_token_here"
}
````

**Response:**

```json
{
  "valid": true
}
```

---

### 🔁 Validate Refresh Token

**POST** `/validate/refresh`

**Body:**

```json
{
  "refreshToken": "your_refresh_token_here"
}
```

**Response:**

```json
{
  "valid": false
}
```

---

## ⚙️ Environment Variables

Required in `.env` or passed via Docker/CI/CD:

| Variable     | Description                  |
| ------------ | ---------------------------- |
| `JWT_SECRET` | Secret key for verifying JWT |

Example `.env`:

```env
JWT_SECRET=586E3272357538782F413F4428472B4B6250655368566B597033733676397924
```

---

## 🐳 Docker

### Build the Docker image

```bash
docker build -t validate-token-service .
```

### Run the container

```bash
docker run -d \
  -p 3004:80 \
  -e JWT_SECRET=your_secret \
  --name validate-token-service \
  validate-token-service
```

Then access it at:
📍 `http://localhost:3004/validate/access`
📍 `http://localhost:3004/validate/refresh`

---

## ♻️ Token Validation Logic

The service performs the following steps:

1. Receives the token in a POST request.
2. Attempts to decode it using `firebase/php-jwt` and the configured `JWT_SECRET`.
3. If the token is valid and not expired, returns `{"valid": true}`.
4. Otherwise, returns `{"valid": false}`.

The logic resides in `src/Service/TokenValidationService.php`.

---

## 📄 License

Licensed under the MIT License.

