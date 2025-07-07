# 👷 Stage 1: Build
FROM golang:1.20-alpine AS builder

WORKDIR /app

# ⬇️ Copia y descarga las dependencias
COPY go.mod go.sum ./
RUN go mod download

# 📁 Copia el resto del código
COPY . .

# 🏗️ Compila el binario
RUN go build -o contact-read-phone-service main.go

# 🪣 Stage 2: Minimal runtime
FROM alpine:3.18

# 🛡️ Certificados (para llamadas HTTPS si las hubiera)
RUN apk --no-cache add ca-certificates

# 📁 Copia el binario desde el builder
WORKDIR /app
COPY --from=builder /app/contact-read-phone-service .

# 📡 Expone el puerto gRPC/HTTP del servicio
EXPOSE 3028

# 🚀 Ejecuta el binario
CMD ["./contact-read-phone-service"]
