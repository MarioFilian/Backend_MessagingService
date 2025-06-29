# Etapa de compilación
FROM dart:stable AS build

WORKDIR /app

COPY pubspec.* ./
RUN dart pub get

COPY . .
RUN dart compile exe bin/profile_read_service.dart -o bin/profile_read_service

# Etapa final basada en Debian para soporte adecuado de ELF
FROM debian:bullseye-slim

# Crea carpeta de la app
WORKDIR /app

# Copia binario y entorno
COPY --from=build /app/bin/profile_read_service /app/profile_read_service
COPY --from=build /app/.env /app/.env

# Instala dependencias mínimas necesarias para ejecutar el binario
RUN apt-get update && apt-get install -y ca-certificates libstdc++6 && apt-get clean

# Expone el puerto
EXPOSE 3008

# Ejecuta el binario
CMD ["./profile_read_service"]
