import grpc
from concurrent import futures
from app import contact_pb2_grpc, contact_service_impl
import time

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    contact_pb2_grpc.add_ContactServiceServicer_to_server(contact_service_impl.ContactService(), server)
    server.add_insecure_port('[::]:3027')
    server.start()
    print("🚀 gRPC server running on port 3027")
    try:
        while True:
            time.sleep(86400)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == "__main__":
    serve()
