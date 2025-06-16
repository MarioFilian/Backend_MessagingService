# 📞 Contact Create Service

Microservicio en Python (FastAPI) para crear contactos en una base de datos **Neo4j**. Forma parte de un sistema distribuido basado en microservicios, este específicamente permite la creación de nodos tipo `Contact`.

## 🚀 Tecnologías

- Python 3.10+
- FastAPI
- Neo4j
- Uvicorn
- python-dotenv
- CORS habilitado
- Documentación Swagger incluida

---

## ⚙️ Variables de entorno

Crea un archivo `.env` con la siguiente configuración:

```env
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=example
````

---

## 📦 Instalación

```bash
# Clona el repositorio
git clone https://github.com/MarioFilian/Backend_MessagingService.git
cd Backend_MessagingService/contact-create-service

# Crea un entorno virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instala dependencias
pip install -r requirements.txt
```

---

## ▶️ Ejecutar localmente

```bash
uvicorn app.main:app --host 0.0.0.0 --port 3025 --reload
```

---

## 🧪 Probar con Swagger

Abre tu navegador en:

```
http://localhost:3025/docs
```

Verás una interfaz Swagger donde puedes probar la creación de contactos.

---

## 📝 Ejemplo de solicitud

POST `/contacts`

```json
{
  "name": "María López",
  "phone": "+593912345678"
}
```

Respuesta:

```json
{
  "id": 123,
  "name": "María López",
  "phone": "+593912345678"
}
```

---

## 🐳 Docker

Construir la imagen:

```bash
docker build -t contact-create-service .
```

Ejecutar:

```bash
docker run -p 3025:3025 --env-file .env contact-create-service
```

---

## 📂 Estructura del Proyecto

```
contact-create-service/
├── app/
│   ├── main.py         # Entrypoint FastAPI
│   ├── database.py     # Conexión a Neo4j
│   └── schemas.py      # Modelos Pydantic
├── .env
├── Dockerfile
├── .gitignore
├── requirements.txt
└── README.md
```

---

## 🧠 Recomendaciones

* Asegúrate de que el servicio de Neo4j esté en ejecución antes de lanzar este microservicio.
* Usa el panel de administración de Neo4j ([http://localhost:7474](http://localhost:7474)) para consultar los nodos creados.

---

## 👤 Autor

Desarrollado por [Mario Filian](https://github.com/MarioFilian) como parte de un sistema de microservicios distribuidos.

