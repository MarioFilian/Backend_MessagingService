# 🔐 Reset Password Service

Microservice to securely reset a user's password using a previously issued token (typically sent via email). Built with **Python**, **FastAPI**, and **GraphQL**, using **PostgreSQL** for persistence.

---

## 🧪 Tech Stack

- 🐍 **Python 3.11+**  
- ⚡ **FastAPI** (ASGI server)  
- 🍓 **Strawberry** (GraphQL framework)  
- 🐘 **PostgreSQL** (async via `asyncpg`)  
- 🔐 **Passlib** (`bcrypt` hashing)  
- 🐳 Docker-compatible containerization  
- 🧪 Tests planned (pytest + httpx)  

---

## 📁 Project Structure

```

reset-password-service/
├── app/
│   ├── db.py           # Database connection & config
│   ├── main.py         # FastAPI app entrypoint
│   ├── models.py       # SQLAlchemy table definitions
│   ├── schema.py       # GraphQL schema, queries & mutations
├── .env                # Environment variables
├── Dockerfile          # Docker image definition
├── requirements.txt    # Python dependencies
├── .gitignore
└── README.md           # Project documentation

````

---

## 📦 Requirements

* Running PostgreSQL instance accessible by this service  
* `.env` file with separate DB variables, example:

```env
DB_USER=postgres
DB_PASSWORD=example
DB_HOST=18.209.127.195
DB_PORT=5432
DB_NAME=registrationdb
````

Your app uses these variables to build the connection string internally:

```python
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
```

---

## 🚀 Run Locally

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the server with hot reload:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 3007
```

Access GraphQL playground at:
👉 [http://localhost:3007/graphql](http://localhost:3007/graphql)

---

## 🔄 GraphQL Endpoint

```
POST http://localhost:3007/graphql
```

### 📤 Example Mutation

```graphql
mutation {
  resetPassword(token: "ABC123XYZ987TOKEN", newPassword: "NewSecurePassword!")
}
```

### ✅ Possible Responses

* `"Password updated successfully"`
* `"Invalid token"`
* `"Token expired"`
* `"User not found"`

---

## 🐳 Docker Support

### Build the Docker image

```bash
docker build -t reset-password-service .
```

### Run the container

```bash
docker run -d \
  -p 3007:3007 \
  --env-file .env \
  --name reset-password-service \
  reset-password-service
```

---

## 🗃️ Database Schema Notes

Ensure your PostgreSQL database contains the following tables:

### `reset_tokens`

| Column       | Type       | Description                        |
| ------------ | ---------- | ---------------------------------- |
| `token`      | `string`   | Primary key, unique reset token    |
| `user_id`    | `string`   | Foreign key referencing `users.id` |
| `expires_at` | `datetime` | UTC timestamp when token expires   |

### `users`

| Column     | Type     | Description                       |
| ---------- | -------- | --------------------------------- |
| `id`       | `string` | Primary key, unique user ID       |
| `username` | `string` | User’s username                   |
| `email`    | `string` | User’s email                      |
| `password` | `string` | Hashed password (bcrypt)          |
| `enabled`  | `bool`   | Flag indicating if user is active |

---

## 🧪 Testing

> Unit and integration tests will be added soon, using [`pytest`](https://pytest.org/) and [`httpx`](https://www.python-httpx.org/).

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
