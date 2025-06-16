from pydantic import BaseModel, Field

class ContactCreate(BaseModel):
    name: str = Field(..., example="Juan Pérez")
    phone: str = Field(..., example="+593987654321")

class ContactResponse(BaseModel):
    id: int
    name: str
    phone: str
