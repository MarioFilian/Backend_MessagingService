from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import ContactCreate, ContactResponse
from app.database import Neo4jConnection

app = FastAPI(
    title="Contact Create Service",
    description="Microservicio para crear contactos en Neo4j",
    version="1.0.0"
)

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, usa dominios específicos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

neo4j = Neo4jConnection()

@app.post("/contacts", response_model=ContactResponse, summary="Crear un nuevo contacto")
def create_contact(contact: ContactCreate):
    result = neo4j.create_contact(contact.name, contact.phone)
    return {
        "element_id": result["element_id"],
        "name": result["name"],
        "phone": result["phone"]
    }

@app.on_event("shutdown")
def shutdown_event():
    neo4j.close()
