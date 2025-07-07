# 🐍 Base image: lightweight Python 3.11
FROM python:3.11-slim

# 📁 Set working directory
WORKDIR /app

# 🧪 Install system dependencies for grpcio-tools
RUN apt-get update && apt-get install -y --no-install-recommends build-essential gcc && rm -rf /var/lib/apt/lists/*

# 📄 Copy only requirements first for caching
COPY requirements.txt .

# 📦 Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# 📁 Copy the rest of the application code
COPY . .

# 🛠 Compile .proto files to generate gRPC code
RUN python -m grpc_tools.protoc -I=./proto --python_out=./app --grpc_python_out=./app ./proto/contact.proto

# 🔥 Expose gRPC port
EXPOSE 3027

# 🚀 Run the gRPC server
CMD ["python", "app/server.py"]
