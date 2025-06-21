from fastapi import FastAPI, Request
from ariadne.asgi import GraphQL
from schema import schema
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Contact Delete Service")

graphql_app = GraphQL(schema, debug=True)

@app.api_route("/graphql", methods=["GET", "POST"])
async def graphql_server(request: Request):
    return await graphql_app.handle_request(request)
