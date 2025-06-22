# Forgot Password Service

Microservicio REST para solicitar tokens de reseteo de contraseña.

---

## Características

- Implementado en Dart usando Shelf.
- Conexión a PostgreSQL para validar usuarios.
- Configuración mediante archivo `.env`.
- Genera un token aleatorio si el email existe y el usuario está habilitado.

---

## Requisitos

- Dart SDK >= 3.0
- PostgreSQL corriendo y accesible
- Archivo `.env` con configuración de la base de datos

---

## Configuración

Crea un archivo `.env` en la raíz del proyecto con los siguientes valores:

```

DB\_HOST=localhost
DB\_PORT=5435
DB\_NAME=registrationdb
DB\_USER=postgres
DB\_PASSWORD=example

````

---

## Ejecución local

1. Instala dependencias:

```bash
dart pub get
````

2. Ejecuta el servicio:

```bash
dart run
```

3. El servidor escuchará en `http://localhost:3005`.

---

## Endpoint principal

### POST `/forgot-password`

**Request JSON**

```json
{
  "email": "usuario@example.com"
}
```

**Respuestas**

* `200 OK`

```json
{
  "message": "Token generated",
  "token": "TOKEN_GENERADO"
}
```

* `400 Bad Request`

```json
{
  "error": "Email is required"
}
```

* `404 Not Found`

```json
{
  "error": "Email not found"
}
```

* `403 Forbidden`

```json
{
  "error": "User is disabled"
}
```

---

## Docker

Para construir y correr con Docker:

```bash
docker build -t forgot-password-service .
docker run -p 3005:3005 --env-file .env forgot-password-service
```

---

## Mejoras futuras

* Guardar tokens en base de datos con expiración.
* Endpoint para validar y usar tokens.
* Envío de correo electrónico con token.

