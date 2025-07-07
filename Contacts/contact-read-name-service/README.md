# 📞 contact-read-name-service

A blazing-fast ⚡ microservice to **read contacts by name** using **gRPC**, powered by **Python (grpcio)** and connected to a **Neo4j** graph database 🧠.

---

## 🚀 Features

✅ Built with **Python gRPC**
✅ Seamless integration with **Neo4j**
✅ Fetch contact data by name via gRPC
✅ Fully containerized with Docker 🐳
✅ Scalable and modular structure
✅ Dev-friendly with full documentation and examples

---

## 📦 Technologies Used

* Python 🐍
* gRPC 🛰️
* Neo4j 🧬
* Docker 🐳
* Protobuf 💬
* `grpcio-tools`, `python-dotenv`, `neo4j`

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/MarioFilian/Backend_MessagingService.git
cd Backend_MessagingService/contact-read-name-service
```

### 2. Create a virtual environment

```bash
python -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=example
```

---

## 💬 gRPC Proto Definition

Your gRPC service is defined in `proto/contact.proto`.
To generate the Python bindings:

```bash
python -m grpc_tools.protoc -I ./proto --python_out=./app --grpc_python_out=./app ./proto/contact.proto
```

This will create:

* `app/contact_pb2.py`
* `app/contact_pb2_grpc.py`

---

## ▶️ Run the gRPC Server

The microservice runs as a **pure gRPC server**, not FastAPI:

```bash
python app/server.py
```

You should see:

```
🚀 gRPC server running on port 3027
```

---

## 🧪 Test the gRPC Endpoint (grpcurl)

Install [`grpcurl`](https://github.com/fullstorydev/grpcurl) and run:

```bash
grpcurl -plaintext -d '{ "name": "Juan" }' localhost:3027 contact.ContactService/GetContactsByName
```

---

## 🔥 Example Response

```json
{
  "contacts": [
    {
      "name": "Juan Pérez",
      "phone": "+593987654321"
    }
  ]
}
```

---

## 🧪 Test with Postman (gRPC Mode)

1. Open Postman → New → **gRPC Request**
2. Set server: `localhost:3027`
3. Import `proto/contact.proto`
4. Call method: `contact.ContactService/GetContactsByName`
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

## 📂 Folder Structure

```
contact-read-name-service/
├── app/
│   ├── contact_service_impl.py    # Service logic
│   ├── contact_pb2.py             # Generated proto (message types)
│   ├── contact_pb2_grpc.py        # Generated proto (service interface)
│   ├── database.py                # Neo4j connection logic
│   └── server.py                  # gRPC server entrypoint
│
├── proto/
│   └── contact.proto              # Proto definition file
│
├── .env
├── Dockerfile
├── requirements.txt
└── README.md
```