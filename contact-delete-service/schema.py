from ariadne import MutationType, make_executable_schema, gql
from database import driver
from fastapi import HTTPException

type_defs = gql("""
    type Contact {
        element_id: ID!
        name: String!
        phone: String!
    }

    type Mutation {
        deleteContact(element_id: ID!): Contact
    }

    type Query {
        _empty: String
    }
""")

mutation = MutationType()

@mutation.field("deleteContact")
def resolve_delete_contact(_, info, element_id):
    with driver.session() as session:
        record = session.run(
            "MATCH (c:Contact {id: $element_id}) RETURN c.id AS element_id, c.name AS name, c.phone AS phone",
            element_id=element_id
        ).single()

        if not record:
            raise HTTPException(status_code=404, detail="Contact not found")

        session.run("MATCH (c:Contact {id: $element_id}) DELETE c", element_id=element_id)

        return {
            "element_id": record["element_id"],
            "name": record["name"],
            "phone": record["phone"]
        }

schema = make_executable_schema(type_defs, mutation)
