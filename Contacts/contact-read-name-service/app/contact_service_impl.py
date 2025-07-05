from app import contact_pb2, contact_pb2_grpc
from app.database import Neo4jConnection

class ContactService(contact_pb2_grpc.ContactServiceServicer):
    def __init__(self):
        self.db = Neo4jConnection()

    def GetContactsByName(self, request, context):
        name = request.name
        contacts = self.db.get_contacts_by_name(name)

        return contact_pb2.ContactListResponse(
            contacts=[
                contact_pb2.Contact(
                    element_id=contact['element_id'],
                    name=contact['name'],
                    phone=contact['phone']
                )
                for contact in contacts
            ]
        )
