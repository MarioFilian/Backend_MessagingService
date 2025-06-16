# 📞 Contact Read Phone Service

A microservice to **read contacts by phone number** from a Neo4j database.  
Built with **Go**, **Gin**, **Neo4j Go Driver**, and documented with **Swagger**.

---

## 🚀 Features

- REST API endpoint to get contact details by phone number
- Connects and queries Neo4j graph database
- Swagger UI for API documentation and testing
- Environment variables support with `.env`
- CORS enabled for cross-origin requests

---

## 🛠️ Prerequisites

- [Go](https://golang.org/dl/) >= 1.20
- [Neo4j](https://neo4j.com/download/)
- [Docker](https://www.docker.com/get-started) (optional, for containerization)

---

## ⚙️ Setup

1. **Clone this repository**

```bash
git clone <repo-url>
cd contact-read-phone-service
````

2. **Create `.env` file** (copy from `.env.example` if provided)

```env
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=example
PORT=3028
```

3. **Install dependencies**

```bash
go mod download
```

4. **Generate Swagger docs**

*(Only needed if you modify API annotations)*

```bash
swag init -g main.go
```

---

## 🏃 Running the service

* **Run locally**

```bash
go run main.go
```

* **Build and run binary**

```bash
go build -o contact-read-phone-service main.go
./contact-read-phone-service
```

* **Using Docker**

Build the Docker image:

```bash
docker build -t contact-read-phone-service .
```

Run the container:

```bash
docker run -p 3028:3028 --env-file .env contact-read-phone-service
```

---

## 📡 API Usage

* Swagger UI (interactive docs):
  [http://localhost:3028/swagger/index.html](http://localhost:3028/swagger/index.html)

* Example GET request to get contact by phone:

```
GET http://localhost:3028/contacts/phone?phone=+593987654321
GET http://localhost:3028/contacts/phone?phone=%2B593987654321
```

Sample response:

```json
{
  "id": 123,
  "name": "John Doe",
  "phone": "+59398765432"
}
```

---

## 🧪 Testing with Postman

* Import this simple GET request:

```
GET http://localhost:3028/contacts/phone?phone=<PHONE_NUMBER>
```

* Replace `<PHONE_NUMBER>` with the phone number you want to search.

---

## 📁 Project structure

```
├── api/
│   └── contact.go           # API handlers
├── db/
│   └── neo4j.go             # Neo4j driver setup
├── docs/
│   ├── docs.go              # Swagger docs initialization
│   ├── swagger.json         # Generated Swagger spec
│   └── swagger.yaml         # Generated Swagger spec
├── .env                     # Environment variables
├── .gitignore
├── Dockerfile               # Docker config
├── go.mod                   # Go modules config
├── go.sum
├── main.go                  # Entry point
└── README.md
```

---

## 🔧 Environment Variables

| Variable         | Description            | Example                 |
| ---------------- | ---------------------- | ----------------------- |
| `NEO4J_URI`      | Neo4j Bolt URI         | `bolt://localhost:7687` |
| `NEO4J_USER`     | Neo4j Username         | `neo4j`                 |
| `NEO4J_PASSWORD` | Neo4j Password         | `example`               |
| `PORT`           | Service listening port | `3028`                  |

---

## 📝 Notes

* Make sure Neo4j is running and accessible with the credentials you specify.
* Ensure phone numbers are stored consistently in the Neo4j database for accurate querying.
* Swagger docs regenerate with `swag init -g main.go`.

---

## 🎉 Contributing

Feel free to open issues or submit pull requests!

---

## 🦾 License

MIT License

---

*Enjoy building with Go & Neo4j!* 🚀
