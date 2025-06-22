import strawberry
from passlib.hash import bcrypt
from datetime import datetime, timezone
from app.db import database
from app.models import users, reset_tokens

@strawberry.type
class Mutation:
    @strawberry.mutation
    async def reset_password(self, token: str, new_password: str) -> str:
        query_token = reset_tokens.select().where(reset_tokens.c.token == token)
        token_row = await database.fetch_one(query_token)
        if not token_row:
            return "Invalid token"

        if token_row["expires_at"] < datetime.now(timezone.utc):
            return "Token expired"

        query_user = users.select().where(users.c.id == token_row["user_id"])
        user_row = await database.fetch_one(query_user)
        if not user_row:
            return "User not found"

        hashed_password = bcrypt.hash(new_password)

        query_update = (
            users.update()
            .where(users.c.id == user_row["id"])
            .values(password=hashed_password)
        )
        await database.execute(query_update)

        query_delete = reset_tokens.delete().where(reset_tokens.c.token == token)
        await database.execute(query_delete)

        return "Password updated successfully"

@strawberry.type
class Query:
    message: str = "Reset Password Service is alive"

schema = strawberry.Schema(query=Query, mutation=Mutation)
