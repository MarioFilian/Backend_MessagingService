import strawberry
from typing import Optional
from app.token_utils import generate_access_token, decode_token, generate_refresh_token
from app.redis_client import r
import jwt

@strawberry.type
class Query:
    hello: str = "Token Refresh Service"

@strawberry.type
class Tokens:
    access_token: str
    refresh_token: str

@strawberry.type
class Mutation:
    @strawberry.mutation
    def refresh_token(self, refresh_token: str) -> Optional[Tokens]:
        # Paso 1: Verificar si existe en Redis
        username = r.get(refresh_token)
        if not username:
            return None

        # Paso 2: Verificar firma del JWT
        try:
            decoded = decode_token(refresh_token)
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None

        # Paso 3: Generar nuevos tokens
        payload = {"username": decoded["username"], "role": decoded.get("role", "user")}
        new_access_token = generate_access_token(payload)
        new_refresh_token = generate_refresh_token(payload)

        # Paso 4: Actualizar Redis
        r.delete(refresh_token)
        r.set(new_refresh_token, username, ex=604800)  # 7 días

        return Tokens(access_token=new_access_token, refresh_token=new_refresh_token)

schema = strawberry.Schema(query=Query, mutation=Mutation)
