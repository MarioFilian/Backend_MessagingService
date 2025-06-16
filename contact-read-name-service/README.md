# 📞 contact-read-name-service

A blazing-fast ⚡ microservice to **read contacts by name** using **gRPC**, powered by **Python + grpcio** and connected to a **Neo4j** graph database 🧠.

---

## 🚀 Features

✅ Built with **Python gRPC**  
✅ Seamless integration with **Neo4j**  
✅ Fetch contact data by name  
✅ Fully containerized with Docker 🐳  
✅ Scalable and modular structure  
✅ Dev-friendly with examples and docs  

---

## 📦 Technologies Used

- Python 🐍
- gRPC 🛰️
- Neo4j 🧬
- Docker 🐳
- Protobuf 💬

---

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/MarioFilian/Backend_MessagingService.git
cd Backend_MessagingService/contact-read-name-service
````

### 2. Create virtual environment

```bash
python -m venv .venv
source .venv/bin/activate  # Or .venv\Scripts\activate on Windows
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=example
```

---

## 🧠 Proto Definition

Your gRPC interface is defined in `proto/contact.proto`.
You can regenerate the Python bindings using:

```bash
python -m grpc_tools.protoc -I ./proto --python_out=./app --grpc_python_out=./app ./proto/contact.proto
```

---

## ▶️ Run the Service

```bash
uvicorn app.main:app --host 0.0.0.0 --port 3027
```

Or use the gRPC server directly:

```bash
python app/server.py
```

---

## 🧪 Testing with grpcurl (CLI)

```bash
grpcurl -plaintext -d '{ "name": "Juan" }' localhost:3027 contact.ContactService/GetContactsByName
```

---

## 🔥 Example Response

```json
{
  "contacts": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "phone": "+593987654321"
    }
  ]
}
```

---

## 🧪 Testing with Postman (gRPC Beta)

1. Open Postman → New → gRPC Request
2. Set server to `localhost:3027`
3. Import `proto/contact.proto`
4. Call method `contact.ContactService/GetContactsByName`
5. Use payload:

   ```json
   {
     "name": "Juan"
   }
   ```

---

## 🐳 Docker

### Build the image

```bash
docker build -t contact-read-name-service .
```

### Run the container

```bash
docker run -d -p 3027:3027 --env-file .env contact-read-name-service
```

---

## 📁 Folder Structure

```
contact-read-name-service/
│
├── app/
│   ├── server.py         # gRPC server
│   ├── database.py       # Neo4j connection
│   └── proto             # Generated proto files
│
├── proto/
│   └── contact.proto     # gRPC definition
│
├── .env
├── Dockerfile
├── requirements.txt
└── README.md
```

---

## 💬 Contact

If you find any bugs 🐛 or have questions 💡, feel free to open an [issue](https://github.com/your-user/contact-read-name-service/issues) or reach out.

---

### 📣 Made with 💙 for Neo4j and Microservice lovers!

