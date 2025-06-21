FROM golang:1.20-alpine

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o contact-read-phone-service main.go

EXPOSE 3028

CMD ["./contact-read-phone-service"]
