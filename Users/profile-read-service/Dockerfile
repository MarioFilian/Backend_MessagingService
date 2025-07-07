# Etapa de compilación
FROM dart:stable AS build

WORKDIR /app

COPY pubspec.* ./
RUN dart pub get

COPY . .
RUN dart compile exe bin/profile_read_service.dart -o bin/profile_read_service

# Etapa final basada en Debian para soporte adecuado de ELF
FROM debian:bullseye-slim

WORKDIR /app

# Copia el binario (el .env no se copia, se pasa como -e desde afuera)
COPY --from=build /app/bin/profile_read_service /app/profile_read_service

# Instala dependencias mínimas
RUN apt-get update && apt-get install -y ca-certificates libstdc++6 && apt-get clean

EXPOSE 3008

CMD ["./profile_read_service"]
