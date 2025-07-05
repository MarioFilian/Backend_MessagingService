# 🗑️ Contact Delete Service

This microservice allows deleting a contact from the Neo4j database using a GraphQL mutation.

- 🚀 Built with [FastAPI](https://fastapi.tiangolo.com/) and [Ariadne](https://ariadnegraphql.org/)
- 🧠 Connects to [Neo4j](https://neo4j.com/)
- 🔌 GraphQL endpoint at `/graphql`
- 🐳 Docker support
- ✅ Tested locally

---

## 📦 Requirements

- Python 3.10+
- Neo4j running (local or remote)
- (Optional) Docker

---

## 🔧 Setup (Local)

```bash
# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload --port 3030
````

---

## 🌐 GraphQL Playground

After running, open:

```
http://localhost:3030/graphql
```

---

## 🔐 .env file

Create a `.env` file:

```env
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=example
```

---

## ❓ Example Mutation

```graphql
mutation DeleteContact {
  deleteContact(element_id: "4:7e0f3d32-5394-456f-9642-7728da5d5766:0") {
    element_id
    name
    phone
  }
}
```

---

## 🐳 Run with Docker

Build and run:

```bash
docker build -t contact-delete-service .
docker run -p 3030:3030 --env-file .env contact-delete-service
```

---

## 📁 Project Structure

```
📁contact-delete-service
├── .env                  # Neo4j credentials
├── database.py           # Neo4j connection and deletion logic
├── Dockerfile            # Docker setup
├── main.py               # FastAPI app with Ariadne
├── README.md             # This file 😄
├── requirements.txt      # Python dependencies
├── schema.py             # GraphQL schema + resolvers
└── .gitignore            # Ignore virtualenv, __pycache__, etc
```

---

## 🤝 License

MIT License. Free to use and modify.

