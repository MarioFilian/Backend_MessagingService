import os
from neo4j import GraphDatabase
from dotenv import load_dotenv

load_dotenv()

class Neo4jConnection:
    def __init__(self):
        self.driver = GraphDatabase.driver(
            os.getenv("NEO4J_URI"),
            auth=(os.getenv("NEO4J_USER"), os.getenv("NEO4J_PASSWORD"))
        )

    def close(self):
        self.driver.close()

    def get_contacts_by_name(self, name: str):
        with self.driver.session() as session:
            result = session.run(
                "MATCH (c:Contact) WHERE c.name CONTAINS $name RETURN id(c) as id, c.name as name, c.phone as phone",
                name=name
            )
            return [record.data() for record in result]
