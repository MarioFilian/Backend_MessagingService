FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python -m grpc_tools.protoc -I=./proto --python_out=./app --grpc_python_out=./app ./proto/contact.proto

EXPOSE 3027

CMD ["python", "app/server.py"]
