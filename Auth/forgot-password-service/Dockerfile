# Etapa 1: Build
FROM dart:stable AS build

WORKDIR /app

# Copia archivos de dependencias
COPY pubspec.* ./
RUN dart pub get

# Copia todo el código fuente
COPY . .

# Compila el archivo principal
RUN dart compile exe bin/main.dart -o bin/main

# Etapa 2: Runtime
FROM debian:bullseye-slim

WORKDIR /app

# Copia el binario compilado
COPY --from=build /app/bin/main /app/main

# Instala dependencias necesarias
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libstdc++6 \
  && apt-get clean

# Expone puerto
EXPOSE 3005

# Ejecuta el binario
CMD ["./main"]
