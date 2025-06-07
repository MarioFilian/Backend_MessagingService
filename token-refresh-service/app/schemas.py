from pydantic import BaseModel

class TokenRequest(BaseModel):
    refresh_token: str

class TokenResponse(BaseModel):
    access_token: str
