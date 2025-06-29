# Etapa de compilación
FROM dart:stable AS build

WORKDIR /app

COPY pubspec.* ./
RUN dart pub get

COPY . .
RUN dart compile exe bin/forgot_password_service.dart -o bin/forgot_password_service

# Etapa final basada en Debian para soporte adecuado de ELF
FROM debian:bullseye-slim

# Crea carpeta de la app
WORKDIR /app

# Copia binario y entorno
COPY --from=build /app/bin/forgot_password_service /app/forgot_password_service
COPY --from=build /app/.env /app/.env

# Instala dependencias mínimas necesarias para ejecutar el binario
RUN apt-get update && apt-get install -y ca-certificates libstdc++6 && apt-get clean

# Expone el puerto
EXPOSE 3005

# Ejecuta el binario
CMD ["./forgot_password_service"]
