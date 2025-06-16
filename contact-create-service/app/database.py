import os
from neo4j import GraphDatabase
from dotenv import load_dotenv

load_dotenv()

class Neo4jConnection:
    def __init__(self):
        self.uri = os.getenv("NEO4J_URI")
        self.user = os.getenv("NEO4J_USER")
        self.password = os.getenv("NEO4J_PASSWORD")
        self.driver = GraphDatabase.driver(self.uri, auth=(self.user, self.password))

    def close(self):
        self.driver.close()

    def create_contact(self, name: str, phone: str):
        with self.driver.session() as session:
            query = (
                "CREATE (c:Contact {name: $name, phone: $phone}) "
                "RETURN elementId(c) as element_id, c.name as name, c.phone as phone"
            )
            result = session.run(query, name=name, phone=phone)
            return result.single()
