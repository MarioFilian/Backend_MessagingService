# 📞 Contact Create Service

Microservice built with **Python** and **FastAPI** to create `Contact` nodes in a **Neo4j** graph database.
Part of a distributed microservices system, this service handles contact creation and exposes a RESTful API with automatic Swagger documentation.

---

## 🚀 Technologies

* Python 3.10+
* FastAPI (async web framework)
* Neo4j (Graph Database)
* Uvicorn (ASGI server)
* python-dotenv (environment variable management)
* CORS enabled
* OpenAPI / Swagger UI documentation

---

## ⚙️ Environment Variables

Create a `.env` file in the project root with the following:

```env
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=example
```

* Adjust the connection URI, username, and password according to your Neo4j instance.

---

## 📦 Installation

```bash
# Clone repo
git clone https://github.com/MarioFilian/Backend_MessagingService.git
cd Backend_MessagingService/contact-create-service

# Create and activate Python virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

---

## ▶️ Running Locally

```bash
uvicorn app.main:app --host 0.0.0.0 --port 3025 --reload
```

* Access API docs at: [http://localhost:3025/docs](http://localhost:3025/docs)

---

## 🧪 API Usage Example

### POST `/contacts`

Request Body:

```json
{
  "name": "María López",
  "phone": "+593912345678"
}
```

Response:

```json
{
  "element_id": "01234567-89ab-cdef-0123-456789abcdef",
  "name": "María López",
  "phone": "+593912345678"
}
```

---

## 🐳 Docker

Build Docker image:

```bash
docker build -t contact-create-service .
```

Run Docker container:

```bash
docker run -p 3025:3025 --env-file .env contact-create-service
```

---

## 📂 Project Structure

```
contact-create-service/
├── app/
│   ├── main.py          # FastAPI application entrypoint
│   ├── database.py      # Neo4j connection & queries
│   └── schemas.py       # Pydantic request/response models
├── .env                 # Environment variables
├── Dockerfile           # Docker image definition
├── requirements.txt     # Python dependencies
├── .gitignore
└── README.md
```

---

## ⚙️ Code Highlights

### `app/database.py`

* Handles Neo4j connection with authentication from `.env`
* `create_contact(name, phone)` creates a `Contact` node and returns its internal Neo4j element ID plus properties

### `app/main.py`

* FastAPI app with CORS enabled
* `/contacts` POST endpoint to create new contacts
* Graceful shutdown closes Neo4j driver connection

### `app/schemas.py`

* Pydantic models for request validation and response serialization

---

## 🧠 Recommendations

* Make sure Neo4j server is running and accessible via `NEO4J_URI`.
* Use Neo4j Browser (usually at [http://localhost:7474](http://localhost:7474)) to verify nodes and run Cypher queries.
* For production, restrict CORS origins to trusted domains instead of `"*"`.

---

## 👤 Author

Developed by [Mario Filian](https://github.com/MarioFilian) as part of a microservices architecture for a messaging system.
