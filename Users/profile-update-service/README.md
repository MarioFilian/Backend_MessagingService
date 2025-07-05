# 📡 profile-update-service

Microservicio para **actualizar datos del perfil de usuario** en una aplicación de mensajería. Utiliza **WebSocket (STOMP o crudo)** para enviar y recibir eventos en tiempo real.

---

## 🚀 Tecnologías

- Java 17
- Spring Boot 3+
- WebSocket + STOMP o WebSocket crudo
- PostgreSQL
- Docker
- Lombok

---

## ⚙️ Variables de entorno (.env)

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=profiledb
DB_USER=postgres
DB_PASSWORD=example
````

---

## ⚙️ Configuración (`application.properties`)

```properties
spring.application.name=profile-update-service
spring.datasource.url=jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/${DB_NAME:profiledb}
spring.datasource.username=${DB_USER:postgres}
spring.datasource.password=${DB_PASSWORD:example}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=3009
```

---

## 🐳 Docker

```Dockerfile
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY target/profile-update-service-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### 🧪 Build & Run

```bash
./mvnw clean package -DskipTests
docker build -t profile-update-service .
docker run --env-file .env -p 3009:3009 profile-update-service
```

---

## 🔌 Endpoint WebSocket

### URL

```
ws://localhost:3009/ws-profile-update
```

### Ejemplo (Postman / WebSocket client)

* **Protocolo:** Raw WebSocket
* **Método:** `SEND`

```json
{
  "id": 1,
  "firstName": "Mario",
  "lastName": "Bros",
  "email": "mario@newmail.com"
}
```

> Respuesta esperada:

```
✅ Profile update received: {...}
```

---

## 🧪 Alternativa con STOMP (si usas @MessageMapping)

* **Endpoint STOMP:** `/ws-profile-update`
* **Mensaje a enviar a:** `/app/update-profile`
* **Suscribirse a:** `/topic/profile-updates`

---

## 🛠️ Endpoints Backend

| Acción           | Tipo      | Ruta                 |
| ---------------- | --------- | -------------------- |
| WebSocket Update | WebSocket | `/ws-profile-update` |

---

## 🧑‍💻 Autor

Desarrollado como parte del sistema de microservicios para una app de mensajería en tiempo real.

```