from fastapi import FastAPI
from app.schema import schema
from app.db import database
from strawberry.asgi import GraphQL

app = FastAPI()

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

graphql_app = GraphQL(schema)
app.mount("/graphql", graphql_app)
